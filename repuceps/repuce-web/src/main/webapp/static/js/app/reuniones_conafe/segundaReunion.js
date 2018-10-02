define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojo/_base/json","dijit/form/Button","dijit/Dialog","dijit/form/FilteringSelect",
         "app/util/constants","dojo/_base/xhr","dijit/form/ValidationTextBox","dojo/store/Memory",
         "dojox/widget/Standby","dojo/dom","app/reuniones_conafe/reuniones_conafe"],
         
	function(ContentPane,registry,array,utils,json,Button,Dialog,FilteringSelect,
			 constants,xhr,ValidationTextBox,Memory,Standby,dom,reuniones){

		var segundaReunionObj = new Object();
		var apoyoConafeStore = {};
		var apoyoFederalStore = {};
		var apoyoEstatalStore = {};
		var apoyoNecesidadStore = {};
		var apoyosPlanTrabajo = {};
		var idReunion = null;

		function init(actividades,cApec,ReunionObj, storeCcts){
			segundaReunionObj = !ReunionObj?{}:ReunionObj;
			idReunion = !ReunionObj.reunion?constants.SEGUNDA_REUNION:segundaReunionObj.reunion.cReunion;
			
			_apoyos(array.indexOf(actividades,7)!=-1);
			_planDTrabajo(array.indexOf(actividades,8)!=-1);
			
			_findApoyosPorTipo(constants.APOYO_CONAFE);
			_findApoyosPorTipo(constants.APOYO_FEDERAL);
			_findApoyosPorTipo(constants.APOYO_ESTATAL);
			_findApoyosPorTipo(constants.APOYO_NECESIDAD);
			
			utils.asistenciaReunion(idReunion,'Integrantes',segundaReunionObj.integrantesR2,storeCcts);
			utils.asistenciaReunion(idReunion,'Instructores',segundaReunionObj.instructoresR2,storeCcts);
			
			//Busca tipos de acciones, que vendrían siendo 
			//los apoyos del plan de trabajo.
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listTipoAcciones/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];				
				for(var j in data){
					store.push({ 
						id:data[j].cTipoAccion,
						name:data[j].nomTipoAccion,
					});
				}
				apoyosPlanTrabajo = new Memory({data:store});
		    });
		}
		
		function _apoyos(crearApoyos){
			//La función dependiendo del tipo de apoyo que existe, extrae la información 
			//del objeto y la manda a _crearListaApoyos en donde se mostrara en tablas.
			var listPanelesAPoyo= new Array({title:"Apoyos CONAFE",     tpoList:1,id:"apoyoC"},
											{title:"Apoyos federales",  tpoList:2,id:"apoyoF"},
											{title:"Apoyos est. o mun.",tpoList:3,id:"apoyoEM"},
											{title:"Necesidades educativas especiales",tpoList:4,id:"apoyoN"});
			for(var i in listPanelesAPoyo){
				if(crearApoyos){
					if(!registry.byId(listPanelesAPoyo[i].id)){
						var objSelect = null;
						if(listPanelesAPoyo[i].id=="apoyoC"){
							objSelect = segundaReunionObj.apoyosConafe?segundaReunionObj.apoyosConafe:[];
						}else if(listPanelesAPoyo[i].id=="apoyoF"){
							objSelect = segundaReunionObj.apoyosFederales?segundaReunionObj.apoyosFederales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoEM"){
							objSelect = segundaReunionObj.apoyosEstatales?segundaReunionObj.apoyosEstatales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoN"){
							objSelect = segundaReunionObj.necesidadesEspeciales?segundaReunionObj.necesidadesEspeciales:[];
						}
						_crearListaApoyos(listPanelesAPoyo[i],objSelect);
						utils.pestaniaSelect(listPanelesAPoyo[0].id);
					}
				}else{
					utils.cerrarPestania(listPanelesAPoyo[i].id);
				}
			}
		}
		
		function _crearListaApoyos(pestaniaDestino,listApoyos){
			var apoyosEncontrados=new Array();
			var noAplica = "N/A";
			var idPanelSecundario = 'Apoyo' + pestaniaDestino.tpoList;
			var layoutApoyo = [[{name:'columna1',field:'id',hidden:true},
		                        {name:'columna2',field:'cApoyo',hidden:true},
		                        {name:'Apoyos recibidos', width:'690px',styles:'text-align: left;',field:'apoyoRecibido'},
		                        {name:'Econ\u00F3mico',field:'economico',hidden:true},
		                        {name:'Especie',field:'especie',hidden:true},
		                        {name:'\u00BFCantidad?', width:'170px',styles:'text-align: center;',field:'cantidad_desc'},
		                        {name:'cantidad',field:'cantidad',hidden:true},
		                        {name:'Descripcion',field:'descripcion',hidden:true},
		                        {name:'Otros',field:'otros',hidden:true}]];
			
			for(var i in listApoyos){
				var valorCant = !listApoyos[i].apoyo.beneficiarios?noAplica:listApoyos[i].beneficiariosr2;
				var descCant = !listApoyos[i].apoyo.beneficiarios?'':listApoyos[i].apoyo.otroTipoBeneficiarios;
				var apoyo = {
				    id:i,
				    cApoyo : listApoyos[i].apoyo.cApoyo,
				    apoyoRecibido : !listApoyos[i].descripOtro?listApoyos[i].apoyo.descripCorta:listApoyos[i].apoyo.descripCorta +': '+ listApoyos[i].descripOtro,
				    cantidad_desc : !descCant?valorCant:descCant +': '+ valorCant,
				    cantidad : valorCant,
				    descripcion: descCant,
				    otros : listApoyos[i].descripOtro
				};
				apoyosEncontrados.push(apoyo);
			}
			
			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
			//Crear tabla con la formación de BD.
			utils.crearGrid(idPanelSecundario,layoutApoyo,'cApoyo',apoyosEncontrados,'grid'+idPanelSecundario);
			
			//Sección para los botones.
			_agregarFilaGrid(pestaniaDestino.tpoList,idPanelSecundario);
			
			utils.createTag('input','edit'+idPanelSecundario,idPanelSecundario);
			new Button({
				label:'Editar',
				onClick:function(){
					var grid = registry.byId('grid'+idPanelSecundario);
					var items = grid.selection.getSelected();
					if(items.length==1){
						dojo.forEach(items, function(selectedItem){
							if(selectedItem !== null){
								var itemToEdit={
									//Crea un arreglo con toda la información del elemento seleccionado
									//en el grid para poder editar la información.
									cApoyo : grid.store.getValue(selectedItem,'cApoyo'),
									apoyoRecibido : grid.store.getValue(selectedItem,'apoyoRecibido'),
									cantidad : grid.store.getValue(selectedItem,'cantidad'),
									descripcion : grid.store.getValue(selectedItem,'descripcion'),
									otros : grid.store.getValue(selectedItem,'otros')
								};
								_popupApoyos(pestaniaDestino.tpoList,itemToEdit);
							}
						}); 
			         }else{
			        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
			         }
				}
			},'edit'+idPanelSecundario);
			
			utils.eliminarFilaGrid('grid'+idPanelSecundario,idPanelSecundario,0,false);
		}

		function _planDTrabajo(crearPlan){
			var id="plnTrabajo";
			var idPlanTrabajo=5;
			var idPanelSecundario = "planTrabajoPane";
			var accionesEncontradas=new Array();
			var planTrabajoObj=segundaReunionObj.planTrabajo?segundaReunionObj.planTrabajo:[];
			var layoutPlnTrabajo = [[{name:'columna1',field:'id',hidden:true},
			                         {name:'columna2',field:'cApoyo',hidden:true},
			                         {name:'Apoyo', width:'580px',styles:'text-align: left;',field:'apoyoRecibido'},
			                         {name:'Cumplimiento', width:'300px',styles:'text-align: left;',field:'accion'},
			                         {name:'idAccion',field:'idAccion',hidden:true},
			                         {name:'Reunion',field:'reunion',hidden:true},
			                         {name:'tipoRespuesta',field:'tipoRespuesta',hidden:true},
			                         {name:'idRespuesta',field:'idRespuesta',hidden:true},
			                         {name:'Otros',field:'otros',hidden:true}]];
			if(crearPlan){
				if(!registry.byId(id)){
					for(var i in planTrabajoObj){
						var accion = {
							    id:i,
							    cApoyo : planTrabajoObj[i].accion.cTipoAccion,		
							    apoyoRecibido : !planTrabajoObj[i].nomOtra?planTrabajoObj[i].accion.descripCortar2:planTrabajoObj[i].accion.brigadaEsp? planTrabajoObj[i].accion.descripCortar2 +" Especifique cu\u00E1l: "+ planTrabajoObj[i].nomOtra:planTrabajoObj[i].accion.descripCortar2 +": "+ planTrabajoObj[i].nomOtra,
							    accion : !planTrabajoObj[i].numVecesr2?planTrabajoObj[i].respuestaR2:planTrabajoObj[i].numVecesr2,
							    idAccion : planTrabajoObj[i].cAccion,
							    reunion : planTrabajoObj[i].cReunion,
							    tipoRespuesta : planTrabajoObj[i].accion.cTipoRespuesta,
							    idRespuesta : planTrabajoObj[i].cRespuestar2,
							    otros : planTrabajoObj[i].nomOtra
							};
						accionesEncontradas.push(accion);
					}
						
					utils.crearPanel(id,"Plan de trabajo",idPanelSecundario);
					//Crear tabla con la formación de BD.
					utils.crearGrid(idPanelSecundario,layoutPlnTrabajo,'idAccion',accionesEncontradas,'gridApoyo'+idPlanTrabajo);
					//Sección para los botones.
					_agregarFilaGrid(idPlanTrabajo,idPanelSecundario);
					
					utils.createTag('input','edit'+id,idPanelSecundario);
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId('gridApoyo'+idPlanTrabajo);
							var items = grid.selection.getSelected();
							if(items.length==1){
								dojo.forEach(items, function(selectedItem){
									if(selectedItem !== null){
										var itemToEdit={
											//Crea un arreglo con toda la información del elemento seleccionado
											//en el grid para poder editar la información.
											cApoyo : grid.store.getValue(selectedItem,'cApoyo'),
											apoyoRecibido : grid.store.getValue(selectedItem,'apoyoRecibido'),
											accion : grid.store.getValue(selectedItem,'accion'),
											idAccion : grid.store.getValue(selectedItem,'idAccion'),
											reunion : grid.store.getValue(selectedItem,'reunion'),
											tipoRespuesta : grid.store.getValue(selectedItem,'tipoRespuesta'),
											idRespuesta : grid.store.getValue(selectedItem,'idRespuesta'),
											otros : grid.store.getValue(selectedItem,'otros')
										};
										_popupApoyos(idPlanTrabajo,itemToEdit);
									}
								}); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'edit'+id);
					
					utils.eliminarFilaGrid('gridApoyo'+idPlanTrabajo,idPanelSecundario,constants.SEGUNDA_REUNION,true);
					utils.pestaniaSelect(id);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}

		function _popupApoyos(tpoApoyo,itemToEdit){
			var idVentana = 'popup_SegundaReunion';
			var tituloVentana = "Plan de trabajo";
			var noAPlica = "N/A";
			var esPlanTrabajo = false;
			var exitenBrigadas = false;
			var edit = false;
			
			//Titulo de la ventana
			if(tpoApoyo==constants.APOYO_CONAFE){
				tituloVentana="Apoyo CONAFE";
			}else if(tpoApoyo==constants.APOYO_FEDERAL){
				tituloVentana="Apoyo federal";
			}else if(tpoApoyo==constants.APOYO_ESTATAL){
				tituloVentana="Apoyo estatal o municipal";
			}else if(tpoApoyo==constants.APOYO_NECESIDAD){
				tituloVentana="Necesidades educativas especiales";
			}else{
				esPlanTrabajo = true;
			}
			//Creamos la tabla con los elementos que tendrá el Pop UP.
			var tablaHTML = '<table border="0">'+
								'<tr>'+
									'<td align="right"><label>* Apoyo: </label></td>'+
									'<td><input id="cmbApoyo"/></td>'+
								'</tr>';
			if(esPlanTrabajo){
				tablaHTML = tablaHTML + '<tr>'+
											'<td align="right"><label>* Actividad: </label></td>'+
											'<td><input id="cmbAccion"/></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><div id="divLBLResMultiple"><label>* Respuesta: </label></div></td>'+
											'<td><div id="divInputResMultiple"><input id="cmbResMultiple"/></div></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><div id="divLBLResSimple" style="display:none;"><label>* Respuesta: </label></div></td>'+
											'<td><div id="divInputResSimple" style="display:none;"><input id="txtResSimple"/></div></td>'+
										'</tr>';
			}else{
				tablaHTML = tablaHTML + '<tr>'+
											'<td align="right"><div id="divLBLCantidad"></div></td>'+
											'<td><div id="divInputCantidad"><input id="txtCantidad"/></div></td>'+
										'</tr>';
			}
			tablaHTML = tablaHTML + '<tr>'+
										'<td align="right"><div id="divLBLEspecifique" style="display:none;"><label>* Especifique: </label></div></td>'+
										'<td><div id="divInputEspecifique" style="display:none;"><input id="txtEspecifique"/></div></td>'+
									'</tr>'+
									'<tr>'+
										'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
									'</tr>'+
								'</table>';
			var dDetail =new Dialog({
				id : idVentana,
				title : tituloVentana,
				content : tablaHTML
			});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
			if(!itemToEdit){
				itemToEdit={
					cApoyo: -1,
					apoyoRecibido : '',
					cantidad : '',
					descripcion : '',
					otros : '',
					accion : '',
					idAccion : -1,
					reunion : '',
					tipoRespuesta : 0,
					idRespuesta : -1 
				};
			}else{
				edit=true;
			}
			
			//Se definen los widget's
			var cmbApoyo = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
		        required : true,
		    },"cmbApoyo");

			if(!esPlanTrabajo){
				var txtCantidad = new ValidationTextBox({
					value : itemToEdit.cantidad,
					maxLength:"4",
					regExp : constants.NUMBER_VALID_NOT_ZERO
				}, 'txtCantidad');
			}else{
				var txtResSimple = new ValidationTextBox({
					value : itemToEdit.accion,
					maxLength:"4",
					regExp : constants.NUMBER_VALID_NOT_ZERO
				}, 'txtResSimple');
				
				var cmbResMultiple = new FilteringSelect({
					searchAttr: "name",
					required : false,
					value : itemToEdit.idRespuesta,  
					store : new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
		        },"cmbResMultiple");
				
				var cmbAccion = new FilteringSelect({
					readOnly : edit,
					store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
					value : itemToEdit.idAccion,
		            required : false,
					searchAttr: "name",
					onChange : function(){
						//Si el tipo de respuesta es de opción múltiple, en ese caso se mostrara un campo de 
						//texto para ingresar la información, de lo contrario se buscara las opciones del combo en BD.
		            	if(cmbAccion.item.tpoRespuesta!=2){
		            		utils.findTipoRespuesta(cmbAccion.item.tpoRespuesta,itemToEdit.idRespuesta,'cmbResMultiple');
		            		utils.ocultarSeccionHTML("ResMultiple",true,false);
		            		utils.ocultarSeccionHTML("ResSimple",false,true);
		            	}else{
		            		utils.ocultarSeccionHTML("ResMultiple",false,false);
		            		utils.ocultarSeccionHTML("ResSimple",true,true);
		            	}
		            	
		            	if(cmbAccion.item.hayOtros || cmbAccion.item.hayBrigada){
		            		if(cmbAccion.item.hayBrigada){
		            			exitenBrigadas = true;
		            			dom.byId('divLBLEspecifique').innerHTML='<label>* Especifique cu\u00E1l: </label>';
		            		}else{
		            			exitenBrigadas = false;
		            		}
		            		utils.ocultarSeccionHTML("Especifique",true,true);
		            	}else{
		            		utils.ocultarSeccionHTML("Especifique",false,true);
		            	}
			        }
		        },"cmbAccion");
			}
			
			var txtEspecifique = new ValidationTextBox({
				value : itemToEdit.otros,
				maxLength : 150,
				placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
	            style : "width:500px;"
			}, 'txtEspecifique');

			if(itemToEdit.reunion==constants.PRIMERA_REUNION){
				registry.byId('txtEspecifique').set('readOnly',true);
			}
			
			//En esta parte se carga el store del combo principal.
			if(tpoApoyo==constants.APOYO_CONAFE){
				registry.byId('cmbApoyo').set('store',apoyoConafeStore);
			}else if(tpoApoyo==constants.APOYO_FEDERAL){
				registry.byId('cmbApoyo').set('store',apoyoFederalStore);
			}else if(tpoApoyo==constants.APOYO_ESTATAL){
				registry.byId('cmbApoyo').set('store',apoyoEstatalStore);
			}else if(tpoApoyo==constants.APOYO_NECESIDAD){
				registry.byId('cmbApoyo').set('store',apoyoNecesidadStore);
			}else{
				registry.byId('cmbApoyo').set('store',apoyosPlanTrabajo);
			}
			
			cmbApoyo.set('onChange',function(){
	        	if(!esPlanTrabajo){
	        		utils.ocultarSeccionHTML("Cantidad",cmbApoyo.item.hayBeneficiarios,true);
	        		utils.ocultarSeccionHTML("Especifique",cmbApoyo.item.hayOtros,true);
	        		utils.ocultarSeccionHTML("Especifique",cmbApoyo.item.hayOtros,true);
	        		if(cmbApoyo.item.hayBeneficiarios){
	        			//Aquí se cambia el texto del label, dependiendo 
	        			//de que tipo de beneficiario es.
	        			dom.byId('divLBLCantidad').innerHTML='<label>* \u00BF'+ cmbApoyo.item.descCant +'?: </label>';
	        		}
	        	}else{
	        		utils.findAccionesXTipo(cmbApoyo.item.id,itemToEdit.idAccion,'cmbAccion',idReunion);
	        	}
	        });
			registry.byId('cmbApoyo').set('value',itemToEdit.cApoyo);

			if(!edit){registry.byId('cmbApoyo').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyo').get('value')==-1){
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridGenerico = registry.byId('gridApoyo'+tpoApoyo);
					try{
						if(edit){
							var index = gridGenerico.selection.selectedIndex;
							var item = gridGenerico.getItem(index);
							if(!esPlanTrabajo){
								gridGenerico.store.setValue(item, 'apoyoRecibido',!txtEspecifique.get('value')?cmbApoyo.get('displayedValue'):cmbApoyo.get('displayedValue') +': '+ txtEspecifique.get('value'));
								gridGenerico.store.setValue(item, 'cantidad_desc',!txtCantidad.get('value')?noAPlica:cmbApoyo.item.descCant!='Cu\u00E1ntos'?cmbApoyo.item.descCant +': '+ txtCantidad.get('value'):txtCantidad.get('value'));		
								gridGenerico.store.setValue(item, 'cantidad',!txtCantidad.get('value')?noAPlica:txtCantidad.get('value'));
								gridGenerico.store.setValue(item, 'descripcion',itemToEdit.descripcion);
								gridGenerico.store.setValue(item, 'otros',txtEspecifique.get('value'));
							}else{
								if(registry.byId('cmbAccion').get('value')==-1 || (registry.byId('txtEspecifique').get('value')=='' && registry.byId('cmbResMultiple').get('value')==-1)){
									utils.cstmAlert('Favor de registrar los datos requeridos');
									return false;
								}
								gridGenerico.store.setValue(item, 'apoyoRecibido',!txtEspecifique.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +' Especifique cu\u00E1l: '+ txtEspecifique.get('value'):cmbAccion.get('displayedValue') +': '+ txtEspecifique.get('value'));
								gridGenerico.store.setValue(item, 'accion',!txtResSimple.get('value')?cmbResMultiple.get('displayedValue'):txtResSimple.get('value'));
								gridGenerico.store.setValue(item, 'reunion',itemToEdit.reunion);
								gridGenerico.store.setValue(item, 'tipoRespuesta',!txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2);
								gridGenerico.store.setValue(item, 'idRespuesta',!txtResSimple.get('value')?cmbResMultiple.get('value'):0);
								gridGenerico.store.setValue(item, 'otros',txtEspecifique.get('value'));
							}
							gridGenerico.update();
						}else{
							try {
								var myNewItem = null;
								if(!esPlanTrabajo){
									myNewItem = {
										id: gridGenerico.rowCount + 1,
										cApoyo : cmbApoyo.get('value'),
										apoyoRecibido : !txtEspecifique.get('value')?cmbApoyo.get('displayedValue'):cmbApoyo.get('displayedValue') +': '+ txtEspecifique.get('value'),
										cantidad_desc : !txtCantidad.get('value')?noAPlica:cmbApoyo.item.descCant!='Cu\u00E1ntos'?cmbApoyo.item.descCant +': '+ txtCantidad.get('value'):txtCantidad.get('value'),
										cantidad : !txtCantidad.get('value')?'':txtCantidad.get('value'),
										descripcion : cmbApoyo.item.descCant,
										otros : txtEspecifique.get('value')
									};
								}else{
									if(registry.byId('cmbAccion').get('value')==-1 || (registry.byId('txtEspecifique').get('value')=='' && registry.byId('cmbResMultiple').get('value')==-1)){
										utils.cstmAlert('Favor de registrar los datos requeridos');
										return false;
									}
									myNewItem = {
										id: gridGenerico.rowCount + 1,
										cApoyo : cmbApoyo.get('value'),
										apoyoRecibido : !txtEspecifique.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +' Especifique cu\u00E1l: '+ txtEspecifique.get('value'):cmbAccion.get('displayedValue') +': '+ txtEspecifique.get('value'),
										accion : !txtResSimple.get('value')?cmbResMultiple.get('displayedValue'):txtResSimple.get('value'),
										idAccion : cmbAccion.get('value'),
										reunion : constants.SEGUNDA_REUNION,
										tipoRespuesta : !txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2,
										idRespuesta :  !txtResSimple.get('value')?cmbResMultiple.get('value'):0,
										otros : txtEspecifique.get('value')
									};
								}
								gridGenerico.store.newItem(myNewItem);
							} catch (e) {
								utils.cstmAlert("El registro ya se encuentra en la tabla.");
								return false;
							}
						}
					    registry.byId(idVentana).destroyRecursive(false);
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}

		function _agregarFilaGrid(tpoApoyo,embedded){
			//La función crea un botón para poder agregar
			//una fila al grid seleccionado.
			utils.createTag('input','add'+embedded,embedded);
			new Button({
				id : 'add'+embedded,
				label:'Agregar',
				onClick: function(){
					_popupApoyos(tpoApoyo);
		        }
			},'add'+embedded);
		}
		
		function _findApoyosPorTipo(tpoApoyo){
			//La siguiente funcion regresa una lista de todos los
			//apoyos, dependiendo de la opcion seleccionada, ya sean: 
			//apoyos conafe, federales, estatales y de necesidad.
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo/'+ tpoApoyo+'/'+idReunion,
				sync: false,
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1",name:"[Seleccione]",descCant:null,hayMonto:false,hayEspecie:false,hayBeneficiarios:false,hayOtros:false}];
				for(var j in data){				
					store.push({ 
						id:data[j].cApoyo,
						name:data[j].descripCorta,
						descCant:!data[j].otroTipoBeneficiarios?'Cu\u00E1ntos':data[j].otroTipoBeneficiarios,
						hayMonto:data[j].economico,
						hayEspecie:data[j].especie,
						hayBeneficiarios:data[j].beneficiarios,
						hayOtros:data[j].otraDescripcion
					});
				}
				//Y son asignados al Store correspondiente.
				if(tpoApoyo==constants.APOYO_CONAFE){
					apoyoConafeStore = new Memory({data:store});
				}else if(tpoApoyo==constants.APOYO_FEDERAL){
					apoyoFederalStore = new Memory({data:store});
				}else if(tpoApoyo==constants.APOYO_ESTATAL){
					apoyoEstatalStore = new Memory({data:store});
				}else if(tpoApoyo==constants.APOYO_NECESIDAD){
					apoyoNecesidadStore = new Memory({data:store});
				}
		    });
		}
		
			//funcion que construye las listas de apoyos y necesidades especiales
			function _construyeApoyosNecesidades(gridApoyo) {
				
				var apoyosTipoArray = new Array();

				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridApoyo.rowCount; i++) {

					var item = gridApoyo.getItem(i);
					// Genera un nuevo objeto de apoyo conafe de cada
					// renglon del grid.
					if (gridApoyo.store.getValue(item,
							'apoyoRecibido') == null
							|| gridApoyo.store.getValue(item,
									'apoyoRecibido') == "") {						
						return null;
					}

					var ApoyoTipo = {
							cApoyo : gridApoyo.store.getValue(item,
							'cApoyo'),
					montor2 : gridApoyo.store.getValue(item,
							'economico')=="N/A"?null:gridApoyo.store.getValue(item,
							'economico'),
					especier2 : gridApoyo.store.getValue(item,
							'especie')=="N/A"?null:gridApoyo.store.getValue(item,
							'especie'),
					beneficiariosr2 : gridApoyo.store.getValue(
							item, 'cantidad')=="N/A"?null:gridApoyo.store.getValue(item,
							'cantidad'),
							descripOtro:gridApoyo.store.getValue(
									item, 'otros')
						    
					};
					apoyosTipoArray.push(ApoyoTipo);
					
				}

				
				return apoyosTipoArray;
			}


			function saveSegundaReunion(cApec, storeCcts) {

				var standby = new Standby({
					target : "dialogCaptiraDGConafe"
				});
				document.body.appendChild(standby.domNode);
				standby.startup();

				var form = registry.byId('registraActaReunion');

				if (form.validate() == false) {
					return false;
				}

				var apec = {
					cApec : cApec
				};

				var existeReunion = segundaReunionObj.reunion ? true : false;
				var apecReunion = null;
				if (existeReunion == true) {
					apecReunion = cApec;
				}

				var apecReunion = {
					fchReunion : registry.byId('fchRegistro').get('value'),
					horaIni : registry.byId('horaInicio').get('value'),
					horaFin : registry.byId('horaFinal').get('value'),
					observaciones : registry.byId('observaciones').get('value'),
					cApec : apecReunion
				};
				if (Date.parse('01/01/2011 '
						+ registry.byId('horaInicio').get('value')) > Date
						.parse('01/01/2011 '
								+ registry.byId('horaFinal').get('value'))) {

					utils
							.cstmAlert("La hora final de su reuni\u00F3n es incorrecta, favor de verificar");
					return false;
				}

				var seccionesRegistradasArray = registry.byId('selectSeccion')
						.get('value');
				var hayApoyos = false;
				var hayPlanTrab = false;

				// Carga los apoyos conafes seleccionados
				for ( var i in seccionesRegistradasArray) {
					if (seccionesRegistradasArray[i] == constants.SECCION_APOYOS_R2) {
						hayApoyos = true;
					}

					if (seccionesRegistradasArray[i] == constants.SECCION_PLAN_TRABAJO_R2) {
						hayPlanTrab = true;

					}

				}

				var apoyosConafe = new Array();
				var apoyosFederales = new Array();
				var apoyosEstatales = new Array();
				var necEsp = new Array();

				// Validar que por lo menos haya seleccionado un registro de la
				// lista.
				if (!hayApoyos && !hayPlanTrab) {
					utils
							.cstmAlert("Deber\u00E1 seleccionar por lo menos un rubro, para continuar <br> con el registro de la segunda reuni\u00F3n.");
					return false;
				}

				if (hayApoyos == true) {
					// Carga los apoyos conafes seleccionados

					var cuentaConApoyos=false;
					var gridApoyoConafe = registry.byId('gridApoyo1');
					apoyosConafe=_construyeApoyosNecesidades(gridApoyoConafe,"CONAFE");
					if(apoyosConafe!=null){
						if(apoyosConafe.length!=0)
							cuentaConApoyos=true;
					}
					else{
						utils
						.cstmAlert("Uno o m\u00e1s apoyos de CONAFE no cuentan con la informaci\u00F3n requerida");
						return false;
					}
					
					
					// Carga los apoyos federales seleccionados

					var gridApoyoFederal = registry.byId('gridApoyo2');
										
					apoyosFederales=_construyeApoyosNecesidades(gridApoyoFederal,"Federales");
					if(apoyosFederales!=null){
						if(apoyosFederales.length!=0)
							cuentaConApoyos=true;
					}
					else{
						utils
						.cstmAlert("Uno o m\u00e1s apoyos de federales no cuentan con la informaci\u00F3n requerida");
						return false;
					}
					

					var gridApoyoEstatal = registry.byId('gridApoyo3');
					
					apoyosEstatales=_construyeApoyosNecesidades(gridApoyoEstatal,"estatal");
					if(apoyosEstatales!=null){
						if(apoyosEstatales.length!=0)
							cuentaConApoyos=true;
					}
					else{
						utils
						.cstmAlert("Uno o m\u00e1s apoyos de estatales no cuentan con la informaci\u00F3n requerida");
						return false;
					}
									
					var gridNecEsp = registry.byId('gridApoyo4');

					necEsp=_construyeApoyosNecesidades(gridNecEsp,"necesidades especiales");
					if(necEsp!=null){
						if(necEsp.length!=0)
							cuentaConApoyos=true;
					}
					else{
						utils
						.cstmAlert("Una o m\u00e1s necesidades educativas especiales no cuentan con la informaci\u00F3n requerida");
						return false;
					}
					
					if (cuentaConApoyos==false) {

						utils.cstmAlert("Debe indicar alguno de los apoyos y/o necesidades educativas especiales");
						return false;
					}
				}
				var planTrabajo = new Array();
				if (hayPlanTrab) {
					var hayPlanTrabajo = false;

					
					var gridTrabajo = registry.byId('gridApoyo5');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridTrabajo.rowCount; i++) {

						var item = gridTrabajo.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridTrabajo.store.getValue(item, 'apoyoRecibido') == null
								|| gridTrabajo.store.getValue(item, 'apoyoRecibido') == ""
								) {

							utils
									.cstmAlert("Una o m\u00e1s acciones del plan de trabajo no cuentan con la informaci\u00F3n requerida");
							return false;
						}

						var numVecesR2=null;
						var respuesta=null;
						
						if(gridTrabajo.store.getValue(item,
						'tipoRespuesta')==2){
							
							numVecesR2=gridTrabajo.store.getValue(item,
							'accion');
							if(numVecesR2!=null){
								respuesta=5;	
							}
							else
								respuesta=null;
							
						}
						else{
							respuesta=gridTrabajo.store.getValue(item,
							'idRespuesta');
						}																		
						
							
						
						var accionPT = {
							cAccion : gridTrabajo.store.getValue(item,
									'idAccion'),
							cReunion : gridTrabajo.store.getValue(item,
									'reunion'),
							numVecesr2 : numVecesR2,
							cRespuestar2:respuesta,
							nomOtra : gridTrabajo.store.getValue(item,
							'otros')
							

						};

						planTrabajo.push(accionPT);
						hayPlanTrabajo = true;
					}

					if (hayPlanTrabajo == false) {

						utils
								.cstmAlert("Debe indicar alguna acci\u00F3n y/o apoyo para el plan de trabajo");
						return false;
					}

				}
				
				var integrantesR2 = new Array();
				integrantesR2 = utils.integrantesAsistieron(segundaReunionObj.integrantesR2?segundaReunionObj.integrantesR2:[],constants.SEGUNDA_REUNION);				
				if(integrantesR2.length==0){
					return false;
				}
				
				var instructoresR2 = new Array();
				instructoresR2 = utils.instructoresAsistieron(segundaReunionObj.instructoresR2?segundaReunionObj.instructoresR2:[],constants.SEGUNDA_REUNION,'gridInstructores'+constants.SEGUNDA_REUNION);
				if(instructoresR2.length==0){
					return false;
				}
				
				var segundaReunion = {
					apec : apec,
					reunion : apecReunion,
					apoyosConafe : apoyosConafe,
					apoyosFederales : apoyosFederales,
					apoyosEstatales : apoyosEstatales,
					necesidadesEspeciales : necEsp,
					planTrabajo : planTrabajo,
					integrantesR2 : integrantesR2,
					instructoresR2 : instructoresR2
				};
				
				var urlJson = dojo.config.app.urlBase + 'segundaReunion/save';

				xhr
						.post(
								{
									url : urlJson,
									postData : json.toJson(segundaReunion),
									headers : {
										"Content-Type" : "application/json; charset=UTF-8"
									},
									handleAs : 'json',
									handle : function(response) {
										if (response == 'SyntaxError: syntax error') {
											window.location.reload();
										} else if (response != 1) {
											utils
													.cstmAlert('Ocurri\u00F3 un error al registrar la informaci\u00F3n de su APEC.');
											standby.hide();
										} else {
											utils
													.cstmAlert('La informaci\u00F3n de su reunion intermedia se registr\u00F3 correctamente.');

											reuniones
													.refresh(
															segundaReunionObj.apec.idEntidadfed,
															segundaReunionObj.apec.idMunicipio,
															segundaReunionObj.apec.idLocalidad,
															storeCcts);
											standby.hide();
										}

										registry.byId('dialogCaptiraDGConafe')
												.destroyRecursive(false);

									}
								}).progress(standby.show());

			}

			return {
				init : init,
				saveSegundaReunion : saveSegundaReunion
			};
		});