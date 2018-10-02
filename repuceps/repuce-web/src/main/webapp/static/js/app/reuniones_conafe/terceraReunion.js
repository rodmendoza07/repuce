define([ "dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojo/_base/json","dijit/form/Button","dijit/Dialog","dijit/form/FilteringSelect",
         "app/util/constants","dojo/_base/xhr","dijit/form/ValidationTextBox","dojo/store/Memory",
         "dojox/widget/Standby","dojo/dom","dojox/form/CheckedMultiSelect","dijit/form/RadioButton",
         "app/reuniones_conafe/reuniones_conafe"],

   	function(registry,array,utils,json,Button,Dialog,FilteringSelect,
			 constants,xhr,ValidationTextBox,Memory,Standby,dom,
			 CheckedMultiSelect,RadioButton,reuniones){

		var terceraReunionObj = new Object();
		var apoyoConafeStore = {};
		var apoyoFederalStore = {};
		var apoyoEstatalStore = {};
		var apoyoNecesidadStore = {};
		var apoyosPlanTrabajo = {};
		var apoyosDiagCierre = {};
		var idReunion = null;
		
		function init(actividades,cApec,ReunionObj, storeCcts){
			terceraReunionObj = !ReunionObj?{}:ReunionObj;
			idReunion = !ReunionObj.reunion?constants.TERCERA_REUNION:terceraReunionObj.reunion.cReunion;

			_findApoyosPorTipo(constants.APOYO_CONAFE);
			_findApoyosPorTipo(constants.APOYO_FEDERAL);
			_findApoyosPorTipo(constants.APOYO_ESTATAL);
			_findApoyosPorTipo(constants.APOYO_NECESIDAD);

			utils.asistenciaReunion(idReunion,'Integrantes',terceraReunionObj.integrantesR3,storeCcts);
			utils.asistenciaReunion(idReunion,'Instructores',terceraReunionObj.instructoresR3,storeCcts);

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
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listCriteriosDesercion/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]" , descripcionLarga:""}];
				for(var j in data){
					store.push({ 
						id:data[j].cDesercion,
						name:data[j].descripCorta,
						descripcionLarga:data[j].descripDesercion
					});
				}
				apoyosDiagCierre = new Memory({data:store});
		    });
			
			_apoyos(array.indexOf(actividades,3)!=-1);
			_planDTrabajo(array.indexOf(actividades,4)!=-1);
			_diagnostico(array.indexOf(actividades,9)!=-1);
			_evaluacion(array.indexOf(actividades,10)!=-1);
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
							objSelect = terceraReunionObj.apoyosConafe?terceraReunionObj.apoyosConafe:[];
						}else if(listPanelesAPoyo[i].id=="apoyoF"){
							objSelect = terceraReunionObj.apoyosFederales?terceraReunionObj.apoyosFederales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoEM"){
							objSelect = terceraReunionObj.apoyosEstatales?terceraReunionObj.apoyosEstatales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoN"){
							objSelect = terceraReunionObj.necesidadesEspeciales?terceraReunionObj.necesidadesEspeciales:[];
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
			var idGrid = 'gridApoyo' + pestaniaDestino.tpoList;
			var idPanelSecundario = 'Apoyo' + pestaniaDestino.tpoList;
			var layoutApoyo = [[{name:'cApoyo',field:'cApoyo',hidden:true},
		                        {name:'Apoyos recibidos',width:'370px',styles:'text-align: left;',field:'apoyoRecibido'},
		                        {name:'Econ\u00F3mico',width:'150px',styles:'text-align: center;',field:'economico'},
		                        {name:'Cantidad 2\u00AA reuni\u00F3n',width:'170px',styles:'text-align: center;',field:'cantidad_desc_Segunda'},
		                        {name:'Cantidad',width:'170px',styles:'text-align: center;',field:'cantidad_desc'},
		                        {name:'Cantidad',field:'cantidad',hidden:true},
		                        {name:'Cantidad',field:'cantidadSegunda',hidden:true},
		                        {name:'Descripcion',field:'descripcion',hidden:true},
		                        {name:'Otros',field:'otros',hidden:true},
		                        {name:'Reunion',field:'reunion',hidden:true}]];
			for(var i in listApoyos){
				var valorCant = !listApoyos[i].apoyo.beneficiariosr3?noAplica:listApoyos[i].beneficiariosr3;
				var descCant = !listApoyos[i].apoyo.otroTipoBeneficiarios?'':listApoyos[i].apoyo.otroTipoBeneficiarios;
				var apoyo = {
					cApoyo : listApoyos[i].apoyo.cApoyo,
				    apoyoRecibido : !listApoyos[i].descripOtro?listApoyos[i].apoyo.descripCorta:listApoyos[i].apoyo.descripCorta +': '+ listApoyos[i].descripOtro,
				    economico : !listApoyos[i].apoyo.economico?noAplica:listApoyos[i].montor3,
				    cantidad_desc : !listApoyos[i].apoyo.beneficiariosr3?noAplica:!listApoyos[i].beneficiariosr3?'':!descCant?listApoyos[i].beneficiariosr3:descCant +': '+ listApoyos[i].beneficiariosr3,
				    cantidad : !listApoyos[i].apoyo.beneficiariosr3?noAplica:listApoyos[i].beneficiariosr3,
				    cantidad_desc_Segunda:!listApoyos[i].apoyo.beneficiarios?noAplica:!listApoyos[i].beneficiariosr2?noAplica:!descCant?listApoyos[i].beneficiariosr2:descCant +': '+ listApoyos[i].beneficiariosr2,
				    cantidadSegunda:!listApoyos[i].apoyo.beneficiarios?noAplica:listApoyos[i].beneficiariosr2,
				    descripcion: descCant,
				    otros : listApoyos[i].descripOtro,
				    reunion : listApoyos[i].cReunion
				};
				apoyosEncontrados.push(apoyo);
			}

			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
			utils.crearGrid(idPanelSecundario,layoutApoyo,'cApoyo',apoyosEncontrados,idGrid);
			
			//Aquí se mostraran los botones para agregar, editar y eliminar
			//pero dependiendo del tipo de apoyo se mostraran uno o varios.
			if(pestaniaDestino.tpoList==constants.APOYO_ESTATAL){
				_agregarFilaGrid(pestaniaDestino.tpoList,idPanelSecundario,idGrid);
			}
			
			utils.createTag('input','edit'+idPanelSecundario,idPanelSecundario);
			new Button({
				label:'Editar',
				onClick:function(){
					var grid = registry.byId(idGrid);
					var items = grid.selection.getSelected();
					if(items.length==1){
						dojo.forEach(items, function(selectedItem){
							if(selectedItem !== null){
								var itemToEdit={
									//Crea un arreglo con toda la información del elemento seleccionado
									//en el grid para poder editar la información.
									cApoyo : grid.store.getValue(selectedItem,'cApoyo'),
									apoyoRecibido : grid.store.getValue(selectedItem,'apoyoRecibido'),
									economico : grid.store.getValue(selectedItem,'economico'),
									cantidad : grid.store.getValue(selectedItem,'cantidad'),
									cantidadSegunda : grid.store.getValue(selectedItem,'cantidadSegunda'),
									descripcion : grid.store.getValue(selectedItem,'descripcion'),
									reunion : grid.store.getValue(selectedItem,'reunion'),
									otros : grid.store.getValue(selectedItem,'otros')
								};
								_pop_up(idGrid,pestaniaDestino.tpoList,itemToEdit);
							}
						}); 
			         }else{
			        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
			         }
				}
			},'edit'+idPanelSecundario);
			
			if(pestaniaDestino.tpoList==constants.APOYO_ESTATAL){
				utils.eliminarFilaGrid(idGrid,idPanelSecundario,constants.TERCERA_REUNION,true);
			}
		}
		
		function _planDTrabajo(crearPlan){
			var id="plnTrabajo";
			var idGrid = 'gridPlanTrabajo';
			var idPanelSecundario = "planTrabajoPane";
			var accionesEncontradas=new Array();
			var planTrabajoObj=terceraReunionObj.planTrabajo?terceraReunionObj.planTrabajo:[];
			var layoutPlnTrabajo = [[{name:'cApoyo',field:'cApoyo',hidden:true},
			                         {name:'Apoyo', width:'580px',styles:'text-align: left;',field:'apoyoRecibido'},
			                         {name:'Cumplimiento', width:'300px',styles:'text-align: left;',field:'accion'},
			                         {name:'idAccion',field:'idAccion',hidden:true},
			                         {name:'Reunion',field:'reunion',hidden:true},
			                         {name:'idRespuesta',field:'idRespuesta',hidden:true},
			                         {name:'tipoRespuesta',field:'tipoRespuesta',hidden:true},
			                         {name:'Otros',field:'otros',hidden:true}]];
			if(crearPlan){
				if(!registry.byId(id)){
					for(var i in planTrabajoObj){
						var accion = {
							    cApoyo : planTrabajoObj[i].accion.cTipoAccion,		
							    apoyoRecibido : !planTrabajoObj[i].nomOtra?planTrabajoObj[i].accion.descripCortar3:planTrabajoObj[i].accion.brigadaEsp? planTrabajoObj[i].accion.descripCortar3 +" Especifique cu\u00E1l: "+ planTrabajoObj[i].nomOtra:planTrabajoObj[i].accion.descripCortar3 +": "+ planTrabajoObj[i].nomOtra,
							    accion : !planTrabajoObj[i].numVecesr3?planTrabajoObj[i].respuestaR3:planTrabajoObj[i].numVecesr3,
							    idAccion : planTrabajoObj[i].cAccion,
							    reunion : planTrabajoObj[i].cReunion,
							    tipoRespuesta : planTrabajoObj[i].accion.cTipoRespuesta,
							    idRespuesta : planTrabajoObj[i].cRespuestar3,
							    otros : planTrabajoObj[i].nomOtra
							};
						accionesEncontradas.push(accion);
					}
					
					utils.crearPanel(id,"Plan de trabajo",idPanelSecundario);
					//Crear tabla con la formación de BD.
					utils.crearGrid(idPanelSecundario,layoutPlnTrabajo,'idAccion',accionesEncontradas,idGrid);
					//Sección para los botones.
					_agregarFilaGrid(constants.PLAN_TRABAJO,idPanelSecundario,idGrid);
					
					utils.createTag('input','edit'+id,idPanelSecundario);
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId(idGrid);
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
										_pop_up(idGrid,constants.PLAN_TRABAJO,itemToEdit);
									}
								}); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'edit'+id);
					
					utils.eliminarFilaGrid(idGrid,idPanelSecundario,constants.TERCERA_REUNION,true);
					utils.pestaniaSelect(id);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
		
		function _diagnostico(crearDiag){
			var id = "diagPestania";
			var idPanelSecundario = "diagPane";
			var idGrid = 'gridDiagnostico';
			var diagnosticoObj=terceraReunionObj.diagnosticoCierre?terceraReunionObj.diagnosticoCierre:[];
			var diagEncontrados=new Array();
			var layoutDiag = [[ {name:'cDesercion',field:'cDesercion',hidden:true},
								{name:'Deserci\u00F3n', width:'580px',styles:'text-align: left;',field:'pregunta'},
								{name:'Cantidad', width:'300px',styles:'text-align: left;',field:'cantidad'},
								{name:'Reunion',field:'reunion',hidden:true}]];
			if(crearDiag){
				if(!registry.byId(id)){
					for(var i in diagnosticoObj){
						var diag = {
								cDesercion : diagnosticoObj[i].cDesercion,
								pregunta : diagnosticoObj[i].preguntaLarga,
								cantidad : diagnosticoObj[i].cantidad,
								reunion : diagnosticoObj[i].cReunion
							};
						diagEncontrados.push(diag);
					}
					
					utils.crearPanel(id,"Diagn\u00F3stico de cierre",idPanelSecundario);
					//Crear tabla con la formación de BD.
					utils.crearGrid(idPanelSecundario,layoutDiag,'cDesercion',diagEncontrados,idGrid);
					//Sección para los botones.
					_agregarFilaGrid(constants.DIAGNOSTICO,idPanelSecundario,idGrid);
					
					utils.createTag('input','edit'+id,idPanelSecundario);
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId(idGrid);
							var items = grid.selection.getSelected();
							if(items.length==1){
								dojo.forEach(items, function(selectedItem){
									if(selectedItem !== null){
										var itemToEdit={
											//Crea un arreglo con toda la información del elemento seleccionado
											//en el grid para poder editar la información.
											cDesercion : grid.store.getValue(selectedItem,'cDesercion'),
											pregunta : grid.store.getValue(selectedItem,'pregunta'),
											cantidad : grid.store.getValue(selectedItem,'cantidad'),
											reunion : grid.store.getValue(selectedItem,'reunion')
										};
										_pop_up(idGrid,constants.DIAGNOSTICO,itemToEdit);
									}
								}); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'edit'+id);
					
					utils.eliminarFilaGrid(idGrid,idPanelSecundario,constants.TERCERA_REUNION,true);
					utils.pestaniaSelect(id);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
		
		function _evaluacion(crearEvaluacion){
			var id = "evaluacionPestania";
			var idPanelSecundario = "evaluacionPane";
			var evaluacionObj=terceraReunionObj.encuestaSatisfaccion?terceraReunionObj.encuestaSatisfaccion:[];
			var tablaHTML = '<table border="0" align="left" width= "900px" cellspacing="10">';
			if(crearEvaluacion){
				if(!registry.byId(id)){
					//Se crea el bloque para poder almacenar la tlaba HTML
					utils.crearPanel(id,"Actividades de cierre",idPanelSecundario);
					
					for(var i in evaluacionObj){
						tablaHTML = tablaHTML + '<tr>'+
													'<td width= "600px"><p>'+ utils.dividirString(evaluacionObj[i].nombreActividad,180) +'</p></td>'+
													'<td width= "500px">';
						var respuestas = evaluacionObj[i].respuestas;
						for(var j in respuestas){
							tablaHTML = tablaHTML + '<input id="pregunta_'+ i +'_resp_'+ j +'"/><label for="pregunta_'+ i +'_resp_'+ j +'">'+ respuestas[j].nomRespuesta +'</label><br/>';
						}						
						tablaHTML = tablaHTML + '</td>'+
											'</tr>';
					}	
					dom.byId(idPanelSecundario).innerHTML = tablaHTML + '</table>';

					for(var i in evaluacionObj){
						var respuestas = evaluacionObj[i].respuestas;
						for(var j in respuestas){
							var respuestaSelect = false;							
							if(evaluacionObj[i].cRespuesta==respuestas[j].cRespuesta){
								respuestaSelect = true;
							}
							new RadioButton({
								checked: respuestaSelect,
								value: respuestas[j].cRespuesta,
								name: 'pregunta_'+ i,
								id: 'pregunta_'+ i +'_resp_'+ j
							},'pregunta_'+ i +'_resp_'+ j);
						}
					}
					utils.pestaniaSelect(id);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}

		function _pop_up(idGridSelect,tpoApoyo,itemToEdit){
			var idVentana = 'popup_TerceraReunion';
			var textoApoyo = '* Apoyo: ';
			var exitenBrigadas  = false;
			var esPlanTrabajo = false;
			var esDiagCierre = false;
			var tituloVentana = "";
			var noAPlica = "N/A";
			var edit = false;
			
			if(!itemToEdit){
				itemToEdit={
					cApoyo : -1,
					cDesercion : - 1,
					apoyoRecibido : '',
					economico : '',
					cantidad : '',
					cantidadSegunda : '',
					descripcion : '',
					reunion : '',
					otros : '',
					accion : '',
					pregunta : '',
					idAccion : -1,
					tipoRespuesta : 0,
					idRespuesta : -1
				};
			}else{
				edit=true;
			}
			
			//Titulo de la ventana
			if(tpoApoyo==constants.APOYO_CONAFE){
				tituloVentana="Apoyo CONAFE";
			}else if(tpoApoyo==constants.APOYO_FEDERAL){
				tituloVentana="Apoyo federal";
			}else if(tpoApoyo==constants.APOYO_ESTATAL){
				tituloVentana="Apoyo estatal o municipal";
			}else if(tpoApoyo==constants.APOYO_NECESIDAD){
				tituloVentana="Necesidades educativas especiales";
			}else if(tpoApoyo==constants.PLAN_TRABAJO){
				tituloVentana="Plan de trabajo";
				esPlanTrabajo=true;
			}else{
				tituloVentana="Diagn\u00F3stico de cierre";
				esDiagCierre=true;
				textoApoyo='* Deserci\u00F3n: ';
			}
			
			var tablaHTML = '<table border="0">'+
								'<tr>'+
									'<td align="right"><div id="divLBLApoyo" ><label>'+ textoApoyo +'</label></td>'+
									'<td><div id="divInputApoyo"><input id="cmbApoyo"/></td>'+
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
			}else if(esDiagCierre){
				tablaHTML = tablaHTML + '<tr>'+
											'<td align="right"><div id="divLBLCantidad"><label>* Cantidad: </label></div></td>'+
											'<td><div id="divInputCantidad"><input id="txtCantidad"/></div></td>'+
										'</tr>';
			}else{
				tablaHTML = tablaHTML + '<tr>'+
											'<td align="right"><div id="divLBLEconomico"><label>* Econ\u00F3mico: </label></div></td>'+
											'<td><div id="divInputEconomico"><input id="txtEconomico"/></div></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><div id="divLBLCantidadSegunda"></div></td>'+
											'<td><div id="divInputCantidadSegunda"><input id="txtCantidadSegunda"/></div></td>'+
										'</tr>'+
										'<tr>'+
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
			
			//Se definen los widget's
			var cmbApoyo = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
		    },"cmbApoyo");
			
			var txtEconomico = new ValidationTextBox({
				value : itemToEdit.economico,
				maxLength:"6",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtEconomico');
			
			var txtCantidad = new ValidationTextBox({
				value : itemToEdit.cantidad,
				maxLength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtCantidad');
			
			var txtCantidadSegunda = new ValidationTextBox({
				value : itemToEdit.cantidadSegunda,
				maxLength:"4",
				readOnly : true,
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtCantidadSegunda');
			
			var txtEspecifique = new ValidationTextBox({
				value : itemToEdit.otros,
				maxLength : 150,
				placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
	            style : "width:500px;"
			}, 'txtEspecifique');
			
			if(esPlanTrabajo){
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

			//En esta parte se carga el store del combo principal.
			if(tpoApoyo==constants.APOYO_CONAFE){
				registry.byId('cmbApoyo').set('store',apoyoConafeStore);
			}else if(tpoApoyo==constants.APOYO_FEDERAL){
				registry.byId('cmbApoyo').set('store',apoyoFederalStore);
			}else if(tpoApoyo==constants.APOYO_ESTATAL){
				registry.byId('cmbApoyo').set('store',apoyoEstatalStore);
			}else if(tpoApoyo==constants.APOYO_NECESIDAD){
				registry.byId('cmbApoyo').set('store',apoyoNecesidadStore);
			}else if(tpoApoyo==constants.PLAN_TRABAJO){
				registry.byId('cmbApoyo').set('store',apoyosPlanTrabajo);
			}else{
				registry.byId('cmbApoyo').set('store',apoyosDiagCierre);
			}
			
			cmbApoyo.set('onChange',function(){
				if(!esPlanTrabajo && !esDiagCierre){
					//Cuando se trata de un apoyo estatal en esta sección se podrá 
					//agregar nuevos elementos, así que quedaran habilitados el 
					//combo de apoyos y el campo de texto para la parte de otros.
					utils.ocultarSeccionHTML("Economico",cmbApoyo.item.hayMonto,true);
					utils.ocultarSeccionHTML("Cantidad",cmbApoyo.item.hayBeneficiarios,true);

					if(!edit || itemToEdit.reunion==constants.TERCERA_REUNION){
						utils.ocultarSeccionHTML("CantidadSegunda",false,true);
					}else{
						utils.ocultarSeccionHTML("CantidadSegunda",cmbApoyo.item.hayBeneficiariosr2,true);
					}
					utils.ocultarSeccionHTML("Especifique",cmbApoyo.item.hayOtros,true);
					if(tpoApoyo!=constants.APOYO_ESTATAL){
						registry.byId('txtEspecifique').set('readOnly',true);
					}
					
					if(cmbApoyo.item.hayBeneficiarios){
	        			//Aquí se cambia el texto del label, dependiendo 
	        			//de que tipo de beneficiario es.
	        			dom.byId('divLBLCantidad').innerHTML='<label>* \u00BF'+ cmbApoyo.item.descCant +'?: </label>';
	        			dom.byId('divLBLCantidadSegunda').innerHTML='<label>\u00BF'+ cmbApoyo.item.descCant +'?: </label>';
	        		}
				}else if(esPlanTrabajo){
					utils.findAccionesXTipo(cmbApoyo.item.id,itemToEdit.idAccion,'cmbAccion',idReunion);
				}else if(esDiagCierre){
					registry.byId('txtCantidad').set('required',true);
				}
	        });
			
			if(itemToEdit.reunion==constants.PRIMERA_REUNION || itemToEdit.reunion==constants.SEGUNDA_REUNION){
				registry.byId('txtEspecifique').set('readOnly',true);
			}

			if(esDiagCierre){
				registry.byId('cmbApoyo').set('value',itemToEdit.cDesercion);
			}else{
				registry.byId('cmbApoyo').set('value',itemToEdit.cApoyo);	
			}

			if(!edit){registry.byId('cmbApoyo').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyo').get('value')==-1){
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridGenerico = registry.byId(idGridSelect);
					try{
						if(edit){
							var index = gridGenerico.selection.selectedIndex;
							var item = gridGenerico.getItem(index);
							if(!esPlanTrabajo && !esDiagCierre){
								gridGenerico.store.setValue(item,'apoyoRecibido',!txtEspecifique.get('value')?cmbApoyo.get('displayedValue'):cmbApoyo.get('displayedValue') +': '+ txtEspecifique.get('value'));
								gridGenerico.store.setValue(item,'economico',!txtEconomico.get('value')?noAPlica:txtEconomico.get('value'));
								gridGenerico.store.setValue(item,'cantidad_desc',!txtCantidad.get('value')?noAPlica:cmbApoyo.item.descCant!='Cu\u00E1ntos'?cmbApoyo.item.descCant +': '+ txtCantidad.get('value'):txtCantidad.get('value'));
								gridGenerico.store.setValue(item,'cantidad',!txtCantidad.get('value')?noAPlica:txtCantidad.get('value'));
								gridGenerico.store.setValue(item,'descripcion',itemToEdit.descripcion);
								gridGenerico.store.setValue(item,'reunion',itemToEdit.reunion);
								gridGenerico.store.setValue(item,'otros',txtEspecifique.get('value'));
							}else if(esPlanTrabajo){
								if(registry.byId('cmbAccion').get('value')==-1 || (registry.byId('txtEspecifique').get('value')=='' && registry.byId('cmbResMultiple').get('value')==-1)){
									utils.cstmAlert('Favor de registrar los datos requeridos');
									return false;
								}
								gridGenerico.store.setValue(item,'apoyoRecibido',!txtEspecifique.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +' Especifique cu\u00E1l: '+ txtEspecifique.get('value'):cmbAccion.get('displayedValue') +': '+ txtEspecifique.get('value'));
								gridGenerico.store.setValue(item,'accion',!txtResSimple.get('value')?cmbResMultiple.get('displayedValue'):txtResSimple.get('value'));
								gridGenerico.store.setValue(item,'reunion',itemToEdit.reunion);
								gridGenerico.store.setValue(item,'tipoRespuesta',!txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2);
								gridGenerico.store.setValue(item,'idRespuesta',!txtResSimple.get('value')?cmbResMultiple.get('value'):0);
								gridGenerico.store.setValue(item,'otros',txtEspecifique.get('value'));
							}else if(esDiagCierre){
								gridGenerico.store.setValue(item,'pregunta',cmbApoyo.item.descripcionLarga);
								gridGenerico.store.setValue(item,'cantidad',txtCantidad.get('value'));
								gridGenerico.store.setValue(item,'reunion',itemToEdit.reunion);
							}
							gridGenerico.update();
						}else{
							try{
								var myNewItem = null;
								if(!esPlanTrabajo && !esDiagCierre){
									myNewItem = {
										cApoyo : cmbApoyo.get('value'),
										apoyoRecibido : !txtEspecifique.get('value')?cmbApoyo.get('displayedValue'):cmbApoyo.get('displayedValue') +': '+ txtEspecifique.get('value'),
										economico : !txtEconomico.get('value')?noAPlica:txtEconomico.get('value'),
										cantidad_desc : !txtCantidad.get('value')?noAPlica:cmbApoyo.item.descCant!='Cu\u00E1ntos'?cmbApoyo.item.descCant +': '+ txtCantidad.get('value'):txtCantidad.get('value'),
										cantidad : !txtCantidad.get('value')?'':txtCantidad.get('value'),
										cantidad_desc_Segunda : 'N/A',
										cantidadSegunda : 0,
										descripcion : cmbApoyo.item.descCant,
										reunion : constants.TERCERA_REUNION,
										otros : txtEspecifique.get('value')
									};
								}else if(esPlanTrabajo){
									if(registry.byId('cmbAccion').get('value')==-1 || (registry.byId('txtEspecifique').get('value')=='' && registry.byId('cmbResMultiple').get('value')==-1)){
										utils.cstmAlert('Favor de registrar los datos requeridos');
										return false;
									}
									myNewItem = {
										cApoyo : cmbApoyo.get('value'),
										apoyoRecibido : !txtEspecifique.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +' Especifique cu\u00E1l: '+ txtEspecifique.get('value'):cmbAccion.get('displayedValue') +': '+ txtEspecifique.get('value'),
										accion : !txtResSimple.get('value')?cmbResMultiple.get('displayedValue'):txtResSimple.get('value'),
										idAccion : cmbAccion.get('value'),
										tipoRespuesta : !txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2,
										idRespuesta : !txtResSimple.get('value')?cmbResMultiple.get('value'):0,
										reunion : constants.TERCERA_REUNION,
										otros : txtEspecifique.get('value')
									};
								}else if(esDiagCierre){
									myNewItem = {
										cDesercion : cmbApoyo.get('value'),
										pregunta : cmbApoyo.item.descripcionLarga,
										cantidad : txtCantidad.get('value'),
										reunion : constants.TERCERA_REUNION,
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

		function _agregarFilaGrid(tpoApoyo,embedded,nombreGrid){
			//La función crea un botón para poder agregar
			//una fila al grid seleccionado.
			utils.createTag('input','add'+embedded,embedded);
			new Button({
				id : 'add'+embedded,
				label:'Agregar',
				onClick: function(){
					_pop_up(nombreGrid,tpoApoyo);
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
				var store=[{id:"-1",name:"[Seleccione]",descCant:null,hayMonto:false,hayEspecie:false,hayBeneficiariosr2:false,hayBeneficiarios:false,hayOtros:false}];
				for(var j in data){				
					store.push({ 
						id:data[j].cApoyo,
						name:data[j].descripCorta,
						descCant:!data[j].otroTipoBeneficiarios?'Cu\u00E1ntos':data[j].otroTipoBeneficiarios,
						hayMonto:data[j].economico,
						hayEspecie:data[j].especie,
						hayBeneficiariosr2:data[j].beneficiarios,
						hayBeneficiarios:data[j].beneficiariosr3,
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
				montor3 : gridApoyo.store.getValue(item,
						'economico')=="N/A"?null:gridApoyo.store.getValue(item,
						'economico'),				
				beneficiariosr3 : gridApoyo.store.getValue(
						item, 'cantidad')=="N/A"?null:gridApoyo.store.getValue(item,
						'cantidad'),
						descripOtro:gridApoyo.store.getValue(
								item, 'otros'),
				cReunion:gridApoyo.store.getValue(item,
				'reunion')			
					    
				};
				apoyosTipoArray.push(ApoyoTipo);
				
			}
			
			return apoyosTipoArray;
		}



		function saveTerceraReunion(cApec, storeCcts){
			var standby = new Standby({
				target : "dialogCaptiraDGConafe"
			});
			document.body.appendChild(standby.domNode);
			standby.startup();

			var form = registry.byId('registraActaReunion');
			if(form.validate()==false) {
				return false;
			}

			var apec = {
				cApec : cApec
			};

			var evaluacionObj=terceraReunionObj.encuestaSatisfaccion?terceraReunionObj.encuestaSatisfaccion:[];
			var existeReunion = terceraReunionObj.reunion?true:false;
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
			
			var hayApoyos = false;
			var hayPlanTrab = false;
			var hayDesercion = false;
			var hayEncuestaSatis = false;
			
			var seccionesRegistradasArray = registry.byId('selectSeccion').get('value');
			// Carga los apoyos conafes seleccionados
			for ( var i in seccionesRegistradasArray) {
				if (seccionesRegistradasArray[i] == constants.SECCION_APOYOS_R3) {
					hayApoyos = true;
				}
				if (seccionesRegistradasArray[i] == constants.SECCION_PLAN_TRABAJO_R3) {
					hayPlanTrab = true;
				}
				
				if (seccionesRegistradasArray[i] == constants.SECCION_DIAG_DESERCION) {
					hayDesercion = true;
				}
				
				if (seccionesRegistradasArray[i] == constants.SECCION_ENCUESTA_SATISFACCION) {
					hayEncuestaSatis = true;
				}
			}
			
			var apoyosConafe = new Array();
			var apoyosFederales = new Array();
			var apoyosEstatales = new Array();
			var necEsp = new Array();
			var planTrabajo = new Array();
			var diagCierre = new Array();
			
			
			//Validar que por lo menos haya seleccionado un registro de la lista.
			if(!hayApoyos && !hayPlanTrab && !hayDesercion && !hayEncuestaSatis){
				utils.cstmAlert("Deber\u00E1 seleccionar por lo menos un rubro, para continuar <br> con el registro de la tercera reuni\u00F3n.");
				return false;
			}
			
			if (hayApoyos == true) {
				// Carga los apoyos conafes

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

				
				var gridTrabajo = registry.byId('gridPlanTrabajo');

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

					var numVecesR3=null;
					var respuesta=null;
					
					if(gridTrabajo.store.getValue(item,
					'tipoRespuesta')==2){
						
						numVecesR3=gridTrabajo.store.getValue(item,
						'accion');
						if(numVecesR3!=null){
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
						numVecesr3 : numVecesR3,
						cRespuestar3:respuesta,
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


			var desercionArray = new Array();
			if (hayDesercion) {
				var hayCriteriosDesercion = false;

				
				var gridDesercion = registry.byId('gridDiagnostico');

				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridDesercion.rowCount; i++) {

					var item = gridDesercion.getItem(i);
					// Genera un nuevo objeto de la desercion de cada
					// renglon del grid.
					if (gridDesercion.store.getValue(item, 'pregunta') == null
							|| gridDesercion.store.getValue(item, 'pregunta') == ""
							) {

						utils
								.cstmAlert("Una o m\u00e1s criterios de deserci\u00F3n no cuentan con la informaci\u00F3n requerida");
						return false;
					}

					
					var critDesercion = {
						cDesercion : gridDesercion.store.getValue(item,
								'cDesercion'),											
						cantidad : gridDesercion.store.getValue(item,
						'cantidad')						
					};

					desercionArray.push(critDesercion);
					hayCriteriosDesercion = true;
				}

				if (hayCriteriosDesercion == false) {

					utils
							.cstmAlert("Debe indicar algun criterio de deserci\u00F3n.");
					return false;
				}

			}
			
			var encuestaSatifArray= new Array();
			if(hayEncuestaSatis){
				var hayencuestaResuelta=false;

				for(var iPregunta in evaluacionObj){
					
					var respuestas = evaluacionObj[iPregunta].respuestas;
					
					for(var j in respuestas){
						var idREspuesta= 'pregunta_'+ iPregunta +'_resp_'+ j;
						var respuestaSelecionadaValue = registry.byId(idREspuesta).get(
						'value');
						var respuestaSelecionada = registry.byId(idREspuesta).get(
						'checked');
						if(respuestaSelecionada!=false){
							
							var respuestaEncuesta={
									cMedicionSatisfaccion:evaluacionObj[iPregunta].cMedicionSatisfaccion,
									cRespuesta:respuestaSelecionadaValue
							};
							encuestaSatifArray.push(respuestaEncuesta);
							hayencuestaResuelta=true;
							break;
						}						
						
					}
				}
				
				if (hayencuestaResuelta == false) {

					utils
							.cstmAlert("Debe responder al menos una de las preguntas de la encuesta de satisfacci\u00F3n.");
					return false;
				}

			}
			
			var integrantesR3 = new Array();
			integrantesR3 = utils.integrantesAsistieron(terceraReunionObj.integrantesR3?terceraReunionObj.integrantesR3:[],constants.TERCERA_REUNION);				
			if(integrantesR3.length==0){
				return false;
			}
			
			var instructoresR3 = new Array();
			instructoresR3 = utils.instructoresAsistieron(terceraReunionObj.instructoresR3?terceraReunionObj.instructoresR3:[],constants.TERCERA_REUNION,'gridInstructores'+constants.TERCERA_REUNION);
			if(instructoresR3.length==0){
				return false;
			}
			
			var terceraReunion = {
				apec : apec,
				reunion : apecReunion,
				apoyosConafe : apoyosConafe,
				apoyosFederales : apoyosFederales,
				apoyosEstatales : apoyosEstatales,
				necesidadesEspeciales : necEsp,
				planTrabajo : planTrabajo,
				diagnosticoCierre : desercionArray,
				encuestaSatisfaccion : encuestaSatifArray,
				integrantesR3 : integrantesR3,
				instructoresR3 : instructoresR3
			};
			
				var urlJson = dojo.config.app.urlBase + 'terceraReunion/save';

				xhr
						.post(
								{
									url : urlJson,
									postData : json.toJson(terceraReunion),
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
													.cstmAlert('La informaci\u00F3n de su reunion de cierre se registr\u00F3 correctamente.');

											reuniones
													.refresh(
															terceraReunionObj.apec.idEntidadfed,
															terceraReunionObj.apec.idMunicipio,
															terceraReunionObj.apec.idLocalidad,
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
			saveTerceraReunion : saveTerceraReunion
		};
	});