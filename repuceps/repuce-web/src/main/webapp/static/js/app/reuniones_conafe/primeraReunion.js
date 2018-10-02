define(["dijit/registry","dojo/_base/array","app/util/jsUtils","dojo/store/Memory",
        	"dojo/dom","dijit/form/ValidationTextBox","dijit/form/FilteringSelect",
        	"app/util/constants","dijit/form/Button","dojo/_base/xhr","dojox/widget/Standby",
        	"dijit/Dialog","dojox/form/CheckedMultiSelect","dijit/form/CheckBox",
        	"dojo/_base/json","app/reuniones_conafe/reuniones_conafe"],
	         
	function(registry,array,utils,Memory,dom,ValidationTextBox,FilteringSelect,constants,
			Button,xhr,Standby,Dialog,CheckedMultiSelect,CheckBox,json,reuniones){

		var primeraReunionObj = new Object();
		var opciones = null;
		var ckmsApoyo = new Array();
		var idReunion = null;
	
		//Variables para guardar los catálogos.
		var necesidadesStore = {};
		var situacionesIndigenasStore = {};
		var lenguasIndigenasStore = {};
		var apoyosPlanTrabajo = {};
		
		function init(actividades,cApec,ReunionObj, storeCcts){
			//Se busca la clave de cada uno de los registros
			//para mostrar la pestaña correspondiente.
			primeraReunionObj = !ReunionObj?{}:ReunionObj;
			idReunion = !ReunionObj.reunion?2:primeraReunionObj.reunion.cReunion;

			_apoyos(array.indexOf(actividades,1)!=-1);
			_diagnostico(array.indexOf(actividades,2)!=-1);
			_inclusionSocial(array.indexOf(actividades,5)!=-1);
			_planDTrabajo(array.indexOf(actividades,6)!=-1);

			utils.asistenciaReunion(idReunion,'Integrantes',primeraReunionObj.integrantesR1,storeCcts);
			utils.asistenciaReunion(idReunion,'Instructores',primeraReunionObj.instructoresR1,storeCcts);

			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listNecesidadesEspeciales/'+idReunion,
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{name:"[Seleccione]",id:"-1"}];
				for(var i in data){
					store.push({name:data[i].descripCorta,id:data[i].cApoyo});
				}
				necesidadesStore = new Memory({data:store});
		    });

			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listPolacionIndigena/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{name:"[Seleccione]",id:"-1"}];
				for(var i in data){
					store.push({name:data[i].descripCorta,id:data[i].cPoblacionIndigena});
			     }
				situacionesIndigenasStore = new Memory({data:store});
			});
		
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listLenguasIndigenas/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{name:"[Seleccione]",id:"-1"}];
				for(var i in data){
					store.push({name:data[i].nomLengua,id:data[i].cLengua});
			     }
				lenguasIndigenasStore = new Memory({data:store});
			});
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listTipoAccionesSinApoyo/',
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
			var listPanelesAPoyo= new Array({title:"Apoyos CONAFE",     tpoList:1,id:"apoyoC"},
											{title:"Apoyos federales",  tpoList:2,id:"apoyoF"},
											{title:"Apoyos est. o mun.",tpoList:3,id:"apoyoEM"});
			//Se recorre la lista de los apoyos, se busca el 
			//correspondiente y se envía la información a la 
			//función para mostrarla en pantalla.
			for(var i in listPanelesAPoyo){
				if(crearApoyos){
					if(!registry.byId(listPanelesAPoyo[i].id)){
						var objSelect = null;
						if(listPanelesAPoyo[i].id=="apoyoC"){
							objSelect = primeraReunionObj.apoyosConafe?primeraReunionObj.apoyosConafe:[];
						}else if(listPanelesAPoyo[i].id=="apoyoF"){
							objSelect = primeraReunionObj.apoyosFederales?primeraReunionObj.apoyosFederales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoEM"){
							objSelect = primeraReunionObj.apoyosEstatales?primeraReunionObj.apoyosEstatales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoN"){
							objSelect = primeraReunionObj.necesidadesEspeciales?primeraReunionObj.necesidadesEspeciales:[];
						}
						_crearListaApoyos(listPanelesAPoyo[i],objSelect);
						utils.pestaniaSelect(listPanelesAPoyo[0].id);
					}
				}else{
					utils.cerrarPestania(listPanelesAPoyo[i].id);
				}
			}
		}

		function _diagnostico(crearDiag){
			var id="diagnostico";
			var idPanelSecundario="diagnosticoPanel";
			if(crearDiag){
				if(!registry.byId(id)){
					//Se crea el panel principal, que contendrá toda la
					//sección de diagnóstico, que incluye la parte de
					//salud, producción y alfabetización.
					utils.crearPanel(id,'Diagn\u00f3stico comunitario',idPanelSecundario);
					
					//Aquí se encuentra toda la sección de salud.
					var diagSaludObj=primeraReunionObj.diagnostico?primeraReunionObj.diagnostico:[];
					var ckmsSalud = new Array();
					var listSalud= new Array({title:"\u00BFProblemas de salud m\u00E1s frecuentes en la comunidad?",tpoList:1,id:"problemas"},
											 {title:"\u00BFA d\u00F3nde o con qui\u00E9n acuden cuando se " +
											 		"enferma alg\u00FAn miembro de la familia?",tpoList:2,id:"soluciones"});
					
					//Crea un bloque dentro de la pestana y a su vez crea una tabla en ese bloque.
					utils.createTag('div','seccionSalud',idPanelSecundario);
					dom.byId('seccionSalud').innerHTML='<table border="0">'+
															'<tr><span class="sub" align="left">Salud</span></tr>'+
															'<tr><td id="espacioSalud"></td></tr>'+
														'</table>';
					for(var i in listSalud){
						//Crea un bloque para los textos principales de la lista de opciones.
						utils.createTag('div','tituloProblema'+listSalud[i].tpoList,'espacioSalud');
		        		dom.byId('tituloProblema'+listSalud[i].tpoList).innerHTML='<p>'+listSalud[i].title+'</p>';
		        		//Crea la lista de opciones.
		        		utils.createTag('div','listProblemas'+listSalud[i].tpoList,'espacioSalud');
		        		var cms=new CheckedMultiSelect({
		        			id:'listProblemas'+listSalud[i].tpoList,
		        	        multiple:true
		        	     },'listProblemas'+listSalud[i].tpoList);
		        		ckmsSalud.push(cms);
	        			//Se crea el segundo bloque que contendrá al campo te texto que permanecerá oculto.
	        			_crearCampoTextoOculto(listSalud[i].id,'espacioSalud',"Especifique: ",constants.TEXT_FALTA_INFORMACION,false,false);
		        		//Se llenan los check con la información del objeto.
		        		opciones=new Array();
		        		for(var j in diagSaludObj){
		                	if(diagSaludObj[j].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_SALUD){
		                		if(diagSaludObj[j].diagnostico.cSubtipoDiagnostico == listSalud[i].tpoList){
		                			var opSaludMarcado = false;
		                			if(diagSaludObj[j].cApec!=null){
		                				opSaludMarcado = true;
		                			}
		                			opciones.push({
		                        		label: diagSaludObj[j].diagnostico.descripCorta,
		                        		value: diagSaludObj[j].diagnostico.cDiagnosticoCom,
		                        		otros: diagSaludObj[j].diagnostico.otraDescripcion,
		                        		selected:opSaludMarcado
		                        	});
		                			//Si una de las opciones es otros se carga la descripción 
		                			//en el campo de texto.
		                        	if(diagSaludObj[j].diagnostico.otraDescripcion){
		                        		registry.byId('input'+listSalud[i].id).set('value',diagSaludObj[j].descripOtro);
		                        	}
		                    	}
		                	}
		                }
						//Se cargan todas las opciones en los check's
		                registry.byId('listProblemas'+listSalud[i].tpoList).addOption(opciones);
		                _mostrarTxt(registry.byId('listProblemas'+listSalud[i].tpoList),document.getElementById('tab'+listSalud[i].id),registry.byId('input'+listSalud[i].id));
					}
					//Se genera el evento para que cuando selecionen una casilla
					//muestre o no el campo de texto, dependiendo de la opción marcada.
	                ckmsSalud[0].on('click', function(){
						_mostrarTxt(registry.byId('listProblemas'+listSalud[0].tpoList),document.getElementById('tab'+listSalud[0].id),registry.byId('input'+listSalud[0].id));
					});
	
	                //Aquí se encuentra toda la sección de producción.
	                var diagProdObj=primeraReunionObj.diagnostico?primeraReunionObj.diagnostico:[];
					
	                //Se crea un bloque para agregar la tabla.				
					utils.createTag('div','seccionProduccion',idPanelSecundario);
					dom.byId('seccionProduccion').innerHTML='<br>'+
															'<table border="0">'+
																'<tr><span class="sub" align="left">Producci\u00f3n</span></tr>'+
																'<tr><br><td id="espacioCheck"></td></tr>'+
																'<tr><br><td id="espacioText"></td></tr>'+
															'</table>';
					for(var i in diagProdObj){
						if(diagProdObj[i].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_PRODUCCION){
							//Se saca de la lista los valores de tipo producción
							var label = diagProdObj[i].diagnostico.descripCorta;
							var value = diagProdObj[i].poblacionAfectada;
							var produccionMarcada = false;
							if(!diagProdObj[i].diagnostico.poblacionAfectada){
								//Se crea el espacio para poder contener el chek y se 
								//marcara en caso de que este ligado a una APEC.
								dom.byId('espacioCheck').innerHTML='<input id="checkBoxProd"/><label>'+' '+ label +'</label>';
								if(diagProdObj[i].cApec!=null){
									produccionMarcada = true;
								}
								new CheckBox({
									id:"checkBoxProd",
							        checked: produccionMarcada,
							    },"checkBoxProd");
							}else{
								//Se crea el campo de texto.
								_crearCampoTextoOculto("Produccion","espacioText",label+": ",constants.TEXT_SOLO_NUMEROS,true,true);							
								registry.byId('inputProduccion').set('value',value);
							}
						}
					}
					
					//Sección de alfabetización
					var line = 0;
					var diagAlfbObj=primeraReunionObj.diagnostico?primeraReunionObj.diagnostico:[];
					//Se crea un bloque para agregar la tabla.
					utils.createTag('div','seccionAlfabetizacion',idPanelSecundario);
					dom.byId('seccionAlfabetizacion').innerHTML='<br>'+
																'<table border="0">'+
																	'<tr><span class="sub" align="left">Alfabetizaci\u00F3n</span></tr>'+
																	'<tr><td id="td0"/></tr>'+
																	'<tr><td id="td1"/></tr>'+
																'</table>';
					for(var i in diagAlfbObj){
						if(diagAlfbObj[i].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_INEA){
							//Se saca de la lista los valores de tipo alfabetización.
							var label = diagAlfbObj[i].diagnostico.descripCorta;
							var value = diagAlfbObj[i].poblacionAfectada;
							var idDiag = diagAlfbObj[i].tipoDiagnostico + diagAlfbObj[i].diagnostico.cDiagnosticoCom;
							_crearCampoTextoOculto(idDiag,"td"+line,label+": ",constants.TEXT_SOLO_NUMEROS,true,true);
							registry.byId('input'+ idDiag).set('value',value);
							line+=1;
						}
					}
				}
			}else{
				utils.cerrarPestania(id);
			}
		}

		function _inclusionSocial(crearNP){
			var id="inclS";
			if(crearNP){
				if(!registry.byId(id)){
					var necesidadesObj=primeraReunionObj.necesidadesEspeciales?primeraReunionObj.necesidadesEspeciales:[];
					var situacionIndigenaObj=primeraReunionObj.pobIndigena?primeraReunionObj.pobIndigena:[];
					var necesidades=new Array();
					var situacionesIndigenas=new Array();
					var layoutNecesidad = [[{name:'id',field:'id',hidden:true},
					                        {name:'cApoyo',field:'cApoyo',hidden:true},
					                        {name:'Necesidad',width:'315px',styles:'text-align: left;',field:'necesidad'},
					                        {name:'\u00BFCu\u00E1ntos?',width:'80px',styles:'text-align: center;',field:'cuantos'}]];
					
					var layoutPoblacion = [[{name:'id',field:'id',hidden:true},
					                        {name:'idSituacion',field:'idSituacion',hidden:true},
					                        {name:'Situaci\u00F3n de ni\u00F1os ind\u00EDgenas',field:'situacion',width:'215px',styles:'text-align: left;'},
					                        {name:'\u00BFCu\u00E1ntos?',field:'cuantos',width:'80px',styles:'text-align: center;'},
					                        {name:'idLengua',field:'idLengua',hidden:true},
					                        {name:'Lengua',field:'lengua',width:'100px',styles:'text-align: center;'}]];
					
					utils.crearPanel(id,"Inclusi\u00F3n social",'inclusionPane');
					dom.byId('inclusionPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
											'<tr>'+
												'<td width= "450px"><span class="sub" align="left">Detecci\u00F3n de necesidades educativas especiales</span></td>'+
												'<td width= "450px"><span class="sub" align="left">Poblaci\u00F3n ind\u00EDgena</span></td>'+
											'<tr>'+
												'<td id="gridISL" align="center"></td>'+
												'<td id="gridISR" align="center"></td>'+
											'</tr>'+
											'<tr>'+
												'<td><div id="buttonsL" align="center"></td>'+
												'<td><div id="buttonsR" align="center"></td>'+
											'</tr>'+
										  '</table>';
					
					//Sección de necesidades educativas.
					for(var i in necesidadesObj){
						var necesidad = {
						    id:i,
						    cApoyo:necesidadesObj[i].apoyo.cApoyo,
						    necesidad:necesidadesObj[i].apoyo.descripCorta,
						    cuantos:necesidadesObj[i].beneficiariosr1
						};
						necesidades.push(necesidad);
					}
					
					utils.crearGrid('gridISL',layoutNecesidad,'cApoyo',necesidades,'gridNecesidad');
					
					_agregarFilaGrid('Necesidad','buttonsL');
					utils.createTag('input','editNecesidad','buttonsL');
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId('gridNecesidad');
							var items = grid.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){
					                	var itemToEdit={
					                			cApoyo: grid.store.getValue(selectedItem,'cApoyo'),
					                			necesidad: grid.store.getValue(selectedItem,'necesidad'),
					                			cuantos: grid.store.getValue(selectedItem,'cuantos'),
										    };
					                	_popupNecesidad(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editNecesidad');
					utils.eliminarFilaGrid('gridNecesidad','buttonsL',0,false);

					//Sección de población indígena.
					for(var j in situacionIndigenaObj){
						var situacionIndigena = {
						    id:j,
						    idSituacion:situacionIndigenaObj[j].cPoblacionIndigena,
						    situacion:situacionIndigenaObj[j].poblacionIndigena,
						    cuantos:situacionIndigenaObj[j].poblacionAfectada,
						    idLengua:situacionIndigenaObj[j].cLengua,
						    lengua:situacionIndigenaObj[j].lengua
						};
						situacionesIndigenas.push(situacionIndigena);
					}
					
					utils.crearGrid('gridISR',layoutPoblacion,'idSituacion',situacionesIndigenas,'gridSituaciones');
					
					_agregarFilaGrid('Situacion','buttonsR');
					utils.createTag('input','editSituacion','buttonsR');
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId('gridSituaciones');
							var items = grid.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEdit={
					                			idSituacion : grid.store.getValue(selectedItem,'idSituacion'),
					    					    situacion : grid.store.getValue(selectedItem,'situacion'),
					    					    cuantos : grid.store.getValue(selectedItem,'cuantos'),
					    					    idLengua : grid.store.getValue(selectedItem,'idLengua'),
					    					    lengua : grid.store.getValue(selectedItem,'lengua')
										    };
					                	_popupPoblacion(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editSituacion');
					utils.eliminarFilaGrid('gridSituaciones','buttonsR',0,false);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
	
		function _planDTrabajo(crearPlan){
			var id = "plnTrabajo";
			var idGrid = "gridAccion";
			if(crearPlan){
				if(!registry.byId(id)){
					opciones = new Array();
					var acciones=new Array();
					var accionesObj=primeraReunionObj.planTrabajo?primeraReunionObj.planTrabajo:[];
					//Creamos el layout con el nombre de las columnas de la tabla y sus propiedades.
					var layoutAcciones = [[{name:'columna1',field:'id',hidden:true},
					                       	{name:'idTpoAccion',field:'idTpoAccion',hidden:true},
					                        {name:'idAccion',field:'idAccion',hidden:true},
					                        {name:'Nombre',width:'272px',styles:'text-align: left;',field:'nombre'},
					                        {name:'N\u00FAmero de \u000A veces',width:'120px',styles:'text-align: center;',field:'numVeces'},
					                        {name:'Otros',styles:'text-align: center;',field:'otros',hidden:true},]];
					//Se crea un bloque para agregar la estructura de la tabla.
					utils.crearPanel("plnTrabajo","Plan de trabajo",'planTrabajoPane');
					dom.byId('planTrabajoPane').innerHTML='<table border="0" width= "900px" cellspacing="10">'+
												'<tr>'+
													'<td><span align="left" class="sub" align="left">Apoyo a figuras educativas</span></td>'+
													'<td><span align="left" class="sub" align="left">Acciones</span></td>'+
												'</tr>'+
												'<tr>'+
													'<td width= "450px" valign="top"><input id="cmsPlanT"/></td>'+
													'<td width= "450px"><div id="gridPT"/></td>'+
												'</tr>'+
												'<tr>'+
													'<td id="nada"></td>'+
													'<td id="buttonsAcc" align="center"></td>'+
												'</tr>'+
										   '</table>';
					//En esta parte solo se revisara las acciones de tipo uno, 
					//que corresponden a los apoyos.
					for (var i in accionesObj){
						if(accionesObj[i].accion.cTipo==constants.PLAN_TRABAJO_APOYO){
							
							var apoyoPlanTMarcado=false;
							if(accionesObj[i].cApec!=null){
								apoyoPlanTMarcado=true;
							}
							//Llenamos el arreglo con la información para el check.
							opciones.push({
								label: utils.dividirString(accionesObj[i].accion.descripCortar1,50),
								value : accionesObj[i].accion.cAccion,
								selected : apoyoPlanTMarcado
							});
						}else if(accionesObj[i].accion.cTipo==constants.PLAN_TRABAJO_ACCION){
							//En esta parte solo se revisara las acciones de tipo uno, 
							//que corresponden a las acciones.
							var accion = {
							    id : i,
							    idTpoAccion : accionesObj[i].accion.cTipoAccion,
							    idAccion : accionesObj[i].accion.cAccion,
							    nombre : !accionesObj[i].nomOtra?accionesObj[i].accion.descripCortar1:accionesObj[i].accion.brigadaEsp?accionesObj[i].accion.descripCortar1 +' Especifique cu\u00E1l: '+ accionesObj[i].nomOtra:accionesObj[i].accion.descripCortar1 +': '+ accionesObj[i].nomOtra,
							    numVeces : accionesObj[i].numVecesr1,
							    otros : accionesObj[i].nomOtra
							};
							acciones.push(accion);
						}
					}
					//Se crea el widget del check multiselección
					//y se le agregan las opciones encontradas.
					var ckmsPT=new CheckedMultiSelect({
						id:'cmsPlanT',
				        multiple:true
				     },'cmsPlanT');
					ckmsPT.addOption(opciones);
					//En esta parte se crean los grid con la información
					utils.crearGrid('gridPT',layoutAcciones,'idAccion',acciones,idGrid);
					//Sección para los botones.
					_agregarFilaGrid('Accion','buttonsAcc');

					utils.createTag('input','editAccion','buttonsAcc');
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId(idGrid);
							var items = grid.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEdit={
					                			idTpoAccion : grid.store.getValue(selectedItem,'idTpoAccion'),
					                			idAccion : grid.store.getValue(selectedItem,'idAccion'),
					                			nombre : grid.store.getValue(selectedItem,'nombre'),
					                			numVeces : grid.store.getValue(selectedItem,'numVeces'),
					                			otros : grid.store.getValue(selectedItem,'otros'),
										    };
					                	_popupAccion(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editAccion');
	
					utils.eliminarFilaGrid('gridAccion','buttonsAcc',0,false);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
	
		function _crearListaApoyos(pestaniaDestino,listApoyos){
			var idPanelSecundario='Apoyo' + pestaniaDestino.tpoList;
			opciones = new Array();
			//Crea la pestaña y el primer bloque.
			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario); 
			//Crea un segundo bloque donde contendrá la lista de check's.
			utils.createTag('div','selectApoyo' + pestaniaDestino.tpoList,idPanelSecundario);
			var cms=new CheckedMultiSelect({
				id:'selectApoyo' + pestaniaDestino.tpoList,
		        multiple:true
		     },'selectApoyo' + pestaniaDestino.tpoList);
			ckmsApoyo.push(cms);
			//Se crea el segundo bloque que contendrá al campo te texto que permanecerá oculto.
			_crearCampoTextoOculto(pestaniaDestino.id+'Otro',idPanelSecundario,'Especifique: ',constants.TEXT_FALTA_INFORMACION,false,false);
			//Se crea campo para apoyo federal a familias.
			_crearCampoTextoOculto(pestaniaDestino.id+'Bnf',idPanelSecundario,'N\u00FAmero de familias beneficiadas: ',constants.TEXT_SOLO_NUMEROS,false,true);
			//Recorre la lista de apoyos y los guarda en un arreglo
	        for(var i in listApoyos){
	    		var apoyoMarcado = false;
				if(listApoyos[i].cApec!=null){
					apoyoMarcado = true;
				}
	        	opciones.push({
	        		label: listApoyos[i].apoyo.descripCorta,
	        		value: listApoyos[i].apoyo.cApoyo,
	        		otros: listApoyos[i].apoyo.otraDescripcion,
	        		selected:apoyoMarcado
	        	});
	        	//Si una de las opciones es otros se carga la descripción en el campo de texto.
	        	if(listApoyos[i].apoyo.otraDescripcion){
	        		registry.byId('input' + pestaniaDestino.id + 'Otro').set('value',listApoyos[i].descripOtro);
	        		registry.byId('input' + pestaniaDestino.id + 'Bnf').set('value',listApoyos[i].beneficiariosr1);
	        	}
	        }
	        
	        //Se cargan todas las opciones en los check's
	        registry.byId('selectApoyo' + pestaniaDestino.tpoList).addOption(opciones);
	        _mostrarTxt(registry.byId('selectApoyo' + pestaniaDestino.tpoList),document.getElementById('tab' + pestaniaDestino.id + 'Otro'),registry.byId('input' + pestaniaDestino.id + 'Otro'));
	        if(pestaniaDestino.tpoList==2){
	        	_mostrarTxt(registry.byId('selectApoyo' + pestaniaDestino.tpoList),document.getElementById('tab' + pestaniaDestino.id + 'Bnf'),registry.byId('input' + pestaniaDestino.id + 'Bnf'));
	        }
	        for(var j in ckmsApoyo){
	        	//Se genera el evento para que cuando selecionen una casilla, muestre o no el campo de texto, dependiendo de la opción marcada.
	            ckmsApoyo[j].on('click', function() {
	            	_mostrarTxt(registry.byId('selectApoyo' + pestaniaDestino.tpoList),document.getElementById('tab' + pestaniaDestino.id + 'Otro'),registry.byId('input' + pestaniaDestino.id + 'Otro'));
	            	if(pestaniaDestino.tpoList==2){
	                	_mostrarTxt(registry.byId('selectApoyo' + pestaniaDestino.tpoList),document.getElementById('tab' + pestaniaDestino.id + 'Bnf'),registry.byId('input' + pestaniaDestino.id + 'Bnf'));
	                }
	            });
	        }
		}

		function _mostrarTxt(lstCMS,tabContainer,txtSelect){
			//Recorre la lista de check's para encontrar la opción de otros y revisar si 
			//esta seleccionada o no, y ver si muestra o no la caja de texto.
			var data = lstCMS.getOptions();
			for(var i=0;i<data.length;i++){
				if(data[i].otros==true && data[i].selected==true){
					//Se marca la ele campo de texto como requerido.
					tabContainer.style.display = 'block';
					txtSelect.set("required",true); 
				}else if(data[i].otros==true && data[i].selected==false){
					//Se oculta el bloque completo, donde se encuentra montado el campo de texto.
					tabContainer.style.display = 'none';
					txtSelect.set("required",false);
				}
			}
		}

		function _crearCampoTextoOculto(id,embedded,textoLabel,mensaje,visible,numerico){
			//Crea un  campo te texto con una etiqueta al inicio.
			var hideDiv="none";
			if(visible){hideDiv="block";} //Define si se mostrara o no el bloque de elementos.
			utils.createTag('div','tab' + id,embedded);
			dom.byId('tab' + id).innerHTML='<br/><label>'+ textoLabel+'</label><input id="input'+id+'"/>';
			document.getElementById('tab' + id).style.display=hideDiv;
			if(numerico){
				new ValidationTextBox({
		            promptMessage:mensaje,
		            trim:true,
		            maxLength:"4",
		  	        regExp : constants.NUMBER_VALID_NOT_ZERO
				},'input' + id);
			}else{
				new ValidationTextBox({
		            promptMessage:mensaje,
		            trim:true,
		            maxlength:150,
		            placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
		            style : "width:500px;"
				},'input' + id);
			}
		}

		function _agregarFilaGrid(nombreGrid,embedded){
			//La función crea un botón para poder agregar
			//una fila al grid seleccionado.
			utils.createTag('input','add'+nombreGrid,embedded);
			new Button({
				id : 'add'+nombreGrid,
				label:'Agregar',
				onClick: function(){
					if(nombreGrid=="Necesidad"){
						_popupNecesidad();
					}else if(nombreGrid=="Situacion"){
						_popupPoblacion();
					}else if(nombreGrid=="Accion"){
						_popupAccion();
					}
		        }
			},'add'+nombreGrid);
		}

		function _popupNecesidad(itemToEdit){
			//Ventana emergente para la tabla de 
			//necesidades educativas especiales
			var edit=false;
			if(!itemToEdit){
				itemToEdit= {
						cApoyo : 0,
						necesidad : '',
						cuantos : '',
					};
			}else{
				edit=true;
			}
	
			var idVentana='popUPNecesidad';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Necesidad educativa especial", 
					content:'<table border="0" width= "300px">'+
								'<tr>'+
									'<td align="right"><label>* Necesidad: </label></td>'+
									'<td><input id="cmbNecesidad"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*\u00BFCu\u00E1ntos?: </label></td>'+
									'<td><input id="txtNumNececidad"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
			//Se definen todos los widgets que se van a 
			//requerir para mostrar la ventana emergente.
			var cmbNecesidad = new FilteringSelect({
				value: itemToEdit.cApoyo,
				store: necesidadesStore,
				readOnly : edit,
	            searchAttr: "name",
	        },"cmbNecesidad");
	
			var txtNumNececidad=new ValidationTextBox({
				value:itemToEdit.cuantos,
				required: true,
				maxLength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtNumNececidad');
	
			if(!edit){registry.byId('cmbNecesidad').set('value',-1);}
			
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbNecesidad').get('value')==-1){
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridNecesidad = registry.byId('gridNecesidad');
					try{
						try {
							if(edit){
								var index = gridNecesidad.selection.selectedIndex;
								var item = gridNecesidad.getItem(index);
								gridNecesidad.store.setValue(item, 'cuantos',txtNumNececidad.get('value'));
								gridNecesidad.update();
							}else{
								var myNewItem = {
									id: gridNecesidad.rowCount + 1,
									cApoyo : cmbNecesidad.get('value'),
									necesidad :cmbNecesidad.get('displayedValue'),
									cuantos : txtNumNececidad.get('value'),
								};
								gridNecesidad.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}

		function _popupPoblacion(itemToEdit){
			//Ventana emergente para la tabla de 
			//población indígena
			var edit=false;
			if(!itemToEdit){
				itemToEdit= {
					idSituacion: 0,
					situacion: '',
					cuantos : '',
					idLengua : 0,
					lengua : '',
				};
			}else{
				edit=true;
			}
	
			var idVentana='popUPSituacionP';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Comunicaci\u00F3n oral", 
					content:'<table border="0" width= "500px">'+
								'<tr>'+
									'<td align="right"><label>* Situaci\u00F3n de ni\u00F1os ind\u00EDgenas: </label></td>'+
									'<td><input id="cmbSituacion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*\u00BFCu\u00E1ntos?: </label></td>'+
									'<td><input id="txtNumSituaciones"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*\u00BFQu\u00E9 lengua habla?: </label></td>'+
									'<td><input id="cmbLengua"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
	
			var cmbsituacion = new FilteringSelect({
				readOnly : edit,
				value : itemToEdit.idSituacion,
				store : situacionesIndigenasStore,
	            searchAttr: "name",
	        },"cmbSituacion");
	
			var txtNumSituaciones = new ValidationTextBox({
				value:itemToEdit.cuantos,
				required: true,
				maxLength: "4",
	 	        regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtNumSituaciones');
	
			var cmbLenguas = new FilteringSelect({
				value: itemToEdit.idLengua,
				store: lenguasIndigenasStore,
	            searchAttr: "name",
	        },"cmbLengua");
			
			if(!edit){
				registry.byId('cmbSituacion').set('value',-1);
				registry.byId('cmbLengua').set('value',-1);
			}
			
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbSituacion').get('value')==-1 || registry.byId('cmbLengua').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridSituacionP = registry.byId('gridSituaciones');
					try{
						try {
							if(edit){
								var index = gridSituacionP.selection.selectedIndex;
								var item = gridSituacionP.getItem(index);
								gridSituacionP.store.setValue(item, 'situacion',cmbsituacion.get('displayedValue'));
								gridSituacionP.store.setValue(item, 'cuantos',txtNumSituaciones.get('value'));
								gridSituacionP.store.setValue(item, 'idLengua',cmbLenguas.get('value'));
								gridSituacionP.store.setValue(item, 'lengua',cmbLenguas.get('displayedValue'));
								gridSituacionP.update();
							}else{
								var myNewItem = {
									id : gridSituacionP.rowCount + 1,
									idSituacion : cmbsituacion.get('value'),
									situacion : cmbsituacion.get('displayedValue'),
									cuantos : txtNumSituaciones.get('value'),
									idLengua : cmbLenguas.get('value'),
									lengua : cmbLenguas.get('displayedValue')
								};
								gridSituacionP.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}

		function _popupAccion(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			var exitenBrigadas = false;
			if(!itemToEdit){
				itemToEdit= {
					idTpoAccion : -1,
					idAccion : -1,
					nombre : '',
					numVeces : '',
					otros : ''
				};
			}else{			
				edit=true;
			}
			
			var idVentana='popUPAcciones';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Acci\u00F3n programada", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td align="right"><label>* Apoyo: </label></td>'+
									'<td><input id="cmbApoyo"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Acci\u00F3n programada: </label></td>'+
									'<td><input id="cmbAccion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* \u00BFCu\u00E1ntas veces se ejecutar\u00E1 en el ciclo escolar?: </label></td>'+
									'<td><input id="txtNumAccion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><div id="lblOtraAccion" style="display:none;"></div></td>'+
									'<td><div id="divOtraAccion" style="display:none;"><input id="txtOtraAccion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
			var cmbAccion = new FilteringSelect({
				readOnly : edit,
				store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
				value: itemToEdit.idAccion,
	            searchAttr: "name",
	            onChange: function(){
	            	if(cmbAccion.item.hayOtros || cmbAccion.item.hayBrigada){
	            		if(cmbAccion.item.hayBrigada){
	            			exitenBrigadas = true;
	            			dom.byId('lblOtraAccion').innerHTML='<label>* Especifique cu\u00E1l: </label>';
	            		}else{
	            			exitenBrigadas = false;
	            			dom.byId('lblOtraAccion').innerHTML='<label>* Especifique: </label>';
	            		}
	            		document.getElementById('lblOtraAccion').style.display='block';
	    				document.getElementById('divOtraAccion').style.display='block';
	    	    		registry.byId("txtOtraAccion").set("required", true);
	    	    	}else{
	    				document.getElementById('lblOtraAccion').style.display='none';
	    				document.getElementById('divOtraAccion').style.display='none';
	    				registry.byId("txtOtraAccion").set("required", false);
	    	    	}
	            }
	        },"cmbAccion");
			
			var cmbApoyo = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store: apoyosPlanTrabajo,
		        required : true,
		        onChange: function(){
		        	utils.findAccionesXTipo(cmbApoyo.item.id,itemToEdit.idAccion,'cmbAccion',idReunion);
		        }
		    },"cmbApoyo");

			var txtNumAccion = new ValidationTextBox({
				value : itemToEdit.numVeces,
				required : true,
				maxLength :"4",
	 	        regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtNumAccion');
			
			var txtOtro = new ValidationTextBox({
				id : 'txtOtraAccion',
				value : itemToEdit.otros,
				maxLength : "150",
				placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
	            style : "width:500px;"
			},'txtOtraAccion');
			
			registry.byId('cmbApoyo').set('value',itemToEdit.idTpoAccion);
			if(!edit){registry.byId('cmbApoyo').set('value',-1);}
			
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyo').get('value')==-1 || registry.byId('cmbAccion').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridAccion = registry.byId('gridAccion');
					try{
						try {
							if(edit){		
								var index = gridAccion.selection.selectedIndex;
								var item = gridAccion.getItem(index);
								gridAccion.store.setValue(item, 'nombre',!txtOtro.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +" Especifique cu\u00E1l: "+ txtOtro.get('value'):cmbAccion.get('displayedValue') +": "+ txtOtro.get('value'));
								gridAccion.store.setValue(item, 'numVeces',txtNumAccion.get('value'));
								gridAccion.store.setValue(item, 'otros',txtOtro.get('value'));
								gridAccion.update();
							}
							else{
								var myNewItem = {
									id : gridAccion.rowCount + 1,
									idTpoAccion : cmbApoyo.get('value'),
									idAccion : cmbAccion.get('value'),
									nombre : !txtOtro.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +" Especifique cu\u00E1l: "+ txtOtro.get('value'):cmbAccion.get('displayedValue') +": "+ txtOtro.get('value'),
									numVeces : txtNumAccion.get('value'),
									otros : txtOtro.get('value')
								};
								gridAccion.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}

			function _localizarRegistroOtroApoyo(listaApoyos, idApoyo,
					nombreCampo) {
				var otraDescip = null;
				for ( var w in listaApoyos) {

					if (listaApoyos[w].apoyo.cApoyo == idApoyo) {
						if (listaApoyos[w].apoyo.otraDescripcion == true) {
							otraDescip = registry.byId(nombreCampo)
									.get('value');
							break;
						}
					}
				}
				return otraDescip;
			}

			function _localizarRegistroOtroDiagnostico(listaDiagnostico,
					idDiagnostico, nombreCampo) {
				var otraDescip = null;
				for ( var w in listaDiagnostico) {

					if (listaDiagnostico[w].diagnostico.cDiagnosticoCom == idDiagnostico) {
						if (listaDiagnostico[w].diagnostico.otraDescripcion == true) {
							otraDescip = registry.byId(nombreCampo)
									.get('value');
							break;
						}
					}
				}
				return otraDescip;
			}

			function _construyeApoyosNecesidades(apoyosArray,
					listApoyosReunion, txtOtraDescip, hayFamBeneficiadas) {
				var apoyosSeleccionados = new Array();

				// Carga los apoyos seleccionados
				for ( var i in apoyosArray) {
					var otraDescip = null;
					var hayOtraDescrip = false;
					var famBeneficiadas=null;
					otraDescip = _localizarRegistroOtroApoyo(listApoyosReunion,
							apoyosArray[i], txtOtraDescip);
					
					if(hayFamBeneficiadas && otraDescip!=null){						
						famBeneficiadas= registry.byId('inputapoyoFBnf')
						.get('value');
					}
					
					apoyosSeleccionados.push({
						cApoyo : apoyosArray[i],
						descripOtro : otraDescip,
						beneficiariosr1:famBeneficiadas
					});
				}
				//console.log(apoyosSeleccionados);
				return apoyosSeleccionados;
			}

			//recupera las opciones de salud (enfermedades y clinicas)
			function _construyeOpcionesSalud(arrayDiagnostico,
					listDiagnosticoPrimeraReunion, campoOtroTxt) {

				var diagnosticoCom = new Array();

				for ( var i in arrayDiagnostico) {
					var otraDescip = null;
					var hayOtraDescrip = false;
					otraDescip = _localizarRegistroOtroDiagnostico(
							listDiagnosticoPrimeraReunion, arrayDiagnostico[i],
							campoOtroTxt);

					diagnosticoCom.push({
						cDiagnosticoCom : arrayDiagnostico[i],
						descripOtro : otraDescip,
						diagnostico : {
							cTipoDiagnosticoCom : constants.C_DIAG_SALUD
						}

					});

				}
				return diagnosticoCom;
			}



			
			
			// Se manda a actualizar la informacion capturada
			function savePrimeraReunion(cApec, storeCcts) {

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

				var existeReunion = primeraReunionObj.reunion ? true : false;
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
				var hayDiagComunitario = false;				
				var hayPobInd = false;
				var hayPlanTrab = false;

				// Carga los apoyos conafes seleccionados
				for ( var i in seccionesRegistradasArray) {
					if (seccionesRegistradasArray[i] == constants.SECCION_APOYOS) {
						hayApoyos = true;
					}

					if (seccionesRegistradasArray[i] == constants.SECCION_DIAG_COMUNITARIO) {
						hayDiagComunitario  = true;

					}
					if (seccionesRegistradasArray[i] == constants.SECCION_POB_IND) {
						hayPobInd = true;

					}
					if (seccionesRegistradasArray[i] == constants.SECCION_PLAN_TRABAJO) {
						hayPlanTrab = true;

					}

				}
				
				var apoyosConafe = new Array();
				var apoyosFederales = new Array();
				var apoyosEstatales = new Array();
				var diagnosticoCom = new Array();
				
				//Validar que por lo menos haya seleccionado un registro de la lista.
				if(!hayApoyos && !hayDiagComunitario && 
						!hayPobInd && !hayPlanTrab){
					utils.cstmAlert("Deber\u00E1 seleccionar por lo menos un rubro, para continuar <br> con el registro de la primera reuni\u00F3n.");
					return false;
				}

				if (hayApoyos == true) {
					// Carga los apoyos conafes seleccionados

					var apoyoConafeArray = registry.byId('selectApoyo1').get(
							'value');
					
					apoyosConafe = _construyeApoyosNecesidades(
							apoyoConafeArray, primeraReunionObj.apoyosConafe,
							'inputapoyoCOtro',false);

				
					// Carga los apoyos federales seleccionados
				
					var apoyoFederalesArray = registry.byId('selectApoyo2')
							.get('value');
					
					apoyosFederales = _construyeApoyosNecesidades(
							apoyoFederalesArray,
							primeraReunionObj.apoyosFederales, 'inputapoyoFOtro',true);

				
					if(apoyosFederales.length!=0){
						for(var j in apoyosFederales){
							if(apoyosFederales[j].beneficiariosr1!=null){
								if(apoyosFederales[j].beneficiariosr1<=0){
									utils.cstmAlert("El  n\u00FAmero de familias beneficiadas debe ser mayor a cero");
									return false;
								}
							}
						}
					}
				

					// Carga los apoyos estatales seleccionados
					var apoyosEstatalesArray = registry.byId('selectApoyo3')
					.get('value');

					apoyosEstatales = _construyeApoyosNecesidades(
							apoyosEstatalesArray,
							primeraReunionObj.apoyosEstatales, 'inputapoyoEMOtro',false);
					
					if (apoyoConafeArray.length == 0
							&& apoyosFederales.length == 0
							&& apoyosEstatales.length == 0) {

						utils.cstmAlert("Debe indicar alguno de los apoyos");
						return false;
					}
				}

				if (hayDiagComunitario) {
					var hayOpcionesSalud = false;
					var diagnosticoSaludArray = registry.byId('listProblemas1')
							.get('value');
					var diagSalud1 = new Array();

					diagSalud1 = _construyeOpcionesSalud(diagnosticoSaludArray,
							primeraReunionObj.diagnostico, 'inputproblemas');

					if (diagSalud1.length != 0) {
						for ( var j in diagSalud1) {
							diagnosticoCom.push(diagSalud1[j]);
							hayOpcionesSalud = true;
							;
						}

					}

					var diagnosticoCCSaludArray = registry.byId(
							'listProblemas2').get('value');

					var diagSalud2 = new Array();

					diagSalud2 = _construyeOpcionesSalud(
							diagnosticoCCSaludArray,
							primeraReunionObj.diagnostico, 'inputsoluciones');

					if (diagSalud2.length != 0) {
						for ( var j in diagSalud2) {
							diagnosticoCom.push(diagSalud2[j]);
							hayOpcionesSalud = true;
							;
						}

					}
					
					
					
					var hayOpcionesProd = false;

					var diagProdObj = primeraReunionObj.diagnostico ? primeraReunionObj.diagnostico
								: [];
					for ( var i in diagProdObj) {
						if (diagProdObj[i].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_PRODUCCION) {

							var idConceptoProd = diagProdObj[i].diagnostico.cDiagnosticoCom;

							if (!diagProdObj[i].diagnostico.poblacionAfectada) {
								var prodcg = registry.byId('checkBoxProd').get(
											'value');
									if (prodcg != false) {
										diagnosticoCom.push({
											cDiagnosticoCom : idConceptoProd,
											diagnostico : {
												cTipoDiagnosticoCom : constants.C_DIAG_PRODUCCION
											}
										});
										hayOpcionesProd = true;
									}

								} else {
									var prodTxt = registry.byId('inputProduccion')
											.get('value');
									if (prodTxt.length != 0) {
										diagnosticoCom.push({
											cDiagnosticoCom : idConceptoProd,
											diagnostico : {
												cTipoDiagnosticoCom : constants.C_DIAG_PRODUCCION
											},
											poblacionAfectada : prodTxt
										});
										hayOpcionesProd = true;
									}

								}
							}
						}
					
					
					var hayOpcionesINEA = false;
					var diagAlfbObj = primeraReunionObj.diagnostico ? primeraReunionObj.diagnostico
								: [];
					for ( var i in diagAlfbObj) {
						if (diagAlfbObj[i].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_INEA) {

							var idConceptoTxt = 'input'
									+ (diagAlfbObj[i].tipoDiagnostico ? diagAlfbObj[i].tipoDiagnostico
											: '')
									+ diagAlfbObj[i].diagnostico.cDiagnosticoCom;

							var cantidadTxt = registry.byId(idConceptoTxt).get(
									'value');

							if (cantidadTxt != null && cantidadTxt.length != 0) {
								diagnosticoCom
										.push({
											cDiagnosticoCom : diagAlfbObj[i].diagnostico.cDiagnosticoCom,
											diagnostico : {
												cTipoDiagnosticoCom : constants.C_DIAG_INEA
											},
											poblacionAfectada : cantidadTxt
										});
								hayOpcionesINEA = true;
							}

						}

					}


					if (hayOpcionesSalud == false && hayOpcionesProd==false && hayOpcionesINEA==false) {

						utils
								.cstmAlert("Debe indicar alguno de los rubros de diagn\u00F3stico comunitario");
						return false;
					}


				}





				var necEsp = new Array();
				var pobIndigena = new Array();
				if (hayPobInd) {
					var hayDatosIncSocial = false;
					var gridNecesidades = registry.byId('gridNecesidad');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridNecesidades.rowCount; i++) {

						var item = gridNecesidades.getItem(i);
						// Genera un nuevo objeto de necesidad especial de cada
						// renglon del grid.
						if (gridNecesidades.store.getValue(item, 'necesidad') == null
								|| gridNecesidades.store.getValue(item,
										'necesidad') == ""
								|| gridNecesidades.store.getValue(item,
										'cuantos') == null
								|| gridNecesidades.store.getValue(item,
										'cuantos') == "") {
							utils
									.cstmAlert("Una o m\u00e1s necesidades especiales no cuentan con la informaci\u00F3n requerida");
							return false;
						}

						var neceEspItem = {
							cApoyo : gridNecesidades.store.getValue(item,
									'cApoyo'),
							beneficiariosr1 : gridNecesidades.store.getValue(
									item, 'cuantos')
						};

						necEsp.push(neceEspItem);
						hayDatosIncSocial = true;
					}

					var gridPobIndigena = registry.byId('gridSituaciones');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridPobIndigena.rowCount; i++) {

						var item = gridPobIndigena.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridPobIndigena.store.getValue(item, 'situacion') == null
								|| gridPobIndigena.store.getValue(item,
										'situacion') == ""
								|| gridPobIndigena.store.getValue(item,
										'cuantos') == null
								|| gridPobIndigena.store.getValue(item,
										'cuantos') == ""
								|| gridPobIndigena.store.getValue(item,
										'lengua') == null
								|| gridPobIndigena.store.getValue(item,
										'lengua') == "") {

							utils
									.cstmAlert("Un o m\u00e1s registros de poblaci\u00F3n indigena no cuentan con la informaci\u00F3n requerida");
							return false;
						}

						var pobIndItem = {
							cPoblacionIndigena : gridPobIndigena.store
									.getValue(item, 'idSituacion'),
							poblacionAfectada : gridPobIndigena.store.getValue(
									item, 'cuantos'),
							cLengua : gridPobIndigena.store.getValue(item,
									'idLengua')

						};

						pobIndigena.push(pobIndItem);
						hayDatosIncSocial = true;
					}

					if (hayDatosIncSocial == false) {

						utils
								.cstmAlert("Debe indicar alguno de los rubros de inclusi\u00F3n social");
						return false;
					}

				}

				var planTrabajo = new Array();
				if (hayPlanTrab) {
					var hayPlanTrabajo = false;

					var apoyoPermanenciaArray = registry.byId('cmsPlanT').get(
							'value');

					// Carga los apoyos conafes seleccionados
					for ( var i in apoyoPermanenciaArray) {

						var apoyoPermanencia = {
							cAccion : apoyoPermanenciaArray[i],

						};

						planTrabajo.push(apoyoPermanencia);
						hayPlanTrabajo = true;

					}

					var gridTrabajo = registry.byId('gridAccion');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridTrabajo.rowCount; i++) {

						var item = gridTrabajo.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridTrabajo.store.getValue(item, 'nombre') == null
								|| gridTrabajo.store.getValue(item, 'nombre') == ""
								|| gridTrabajo.store.getValue(item, 'numVeces') == null
								|| gridTrabajo.store.getValue(item, 'numVeces') == "") {

							utils
									.cstmAlert("Una o m\u00e1s acciones del plan de trabajo no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						
												
						var accionPT = {
							cAccion : gridTrabajo.store.getValue(item,
									'idAccion'),
							numVecesr1 : gridTrabajo.store.getValue(item,
									'numVeces'),
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
				
				var integrantesR1 = new Array();
				integrantesR1 = utils.integrantesAsistieron(primeraReunionObj.integrantesR1?primeraReunionObj.integrantesR1:[],constants.PRIMERA_REUNION);				
				if(integrantesR1.length==0){
					return false;
				}
				
				var instructoresR1 = new Array();
				instructoresR1 = utils.instructoresAsistieron(primeraReunionObj.instructoresR1?primeraReunionObj.instructoresR1:[],constants.PRIMERA_REUNION,'gridInstructores'+constants.PRIMERA_REUNION);
				if(instructoresR1.length==0){
					return false;
				}

				var primeraReunion = {
					apec : apec,
					reunion : apecReunion,
					apoyosConafe : apoyosConafe,
					apoyosFederales : apoyosFederales,
					apoyosEstatales : apoyosEstatales,
					diagnostico : diagnosticoCom,
					necesidadesEspeciales : necEsp,
					pobIndigena : pobIndigena,
					planTrabajo : planTrabajo,
					integrantesR1 : integrantesR1,
					instructoresR1 : instructoresR1
				};
				
				var urlJson = dojo.config.app.urlBase + 'primeraReunion/save';

				xhr
						.post(
								{
									url : urlJson,
									postData : json.toJson(primeraReunion),
									headers : {
										"Content-Type" : "application/json; charset=UTF-8"
									},
									handleAs : 'json',
									handle : function(response) {
										if (response == 'SyntaxError: syntax error') {
											window.location.reload();
										} else if (response != 1) {
											utils
													.cstmAlert('Ocurri\u00F3 un error al registrar la informaci\u00F3n de su reuni\u00F3n para la elaboraci\u00F3n del diagn\u00F3stico.');
											standby.hide();
										} else {
											utils
													.cstmAlert('La informaci\u00F3n de su reuni\u00F3n para la elaboraci\u00F3n del diagn\u00F3stico se registr\u00F3 correctamente.');

											reuniones
													.refresh(
															primeraReunionObj.apec.idEntidadfed,
															primeraReunionObj.apec.idMunicipio,
															primeraReunionObj.apec.idLocalidad,
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
				savePrimeraReunion : savePrimeraReunion
			};
		});