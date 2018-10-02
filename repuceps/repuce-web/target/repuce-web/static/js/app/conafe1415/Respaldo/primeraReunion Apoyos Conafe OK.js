define(["dijit/registry","dojo/_base/array","app/util/jsUtils","dojo/store/Memory",
        	"dojo/dom","dijit/form/ValidationTextBox","dijit/form/FilteringSelect",
        	"app/util/constants","dijit/form/Button","dojo/_base/xhr","dojox/widget/Standby",
        	"dijit/Dialog","dojox/form/CheckedMultiSelect","dijit/form/CheckBox",
        	"dojo/_base/json","app/conafe1415/reuniones_conafe"],
	         
	function(registry,array,utils,Memory,dom,ValidationTextBox,FilteringSelect,constants,
			Button,xhr,Standby,Dialog,CheckedMultiSelect,CheckBox,json,reuniones){

		var primeraReunionObj = new Object();
		var opciones = null;
		var ckmsApoyo = new Array();
		var idReunion = null;
	
		//Variables para guardar los cat�logos.
		var necesidadesStore = {};
		var situacionesIndigenasStore = {};
		var lenguasIndigenasStore = {};
		var apoyosPlanTrabajo = {};
		var BullyingTipoStore ={};
		var NeeStore ={};
		var FederalesStore={};
		var EstatalStore={};
		
		
		function init(actividades,cApec,ReunionObj, storeCcts){
			//Se busca la clave de cada uno de los registros
			//para mostrar la pesta�a correspondiente.
			primeraReunionObj = !ReunionObj?{}:ReunionObj;
			idReunion = !ReunionObj.reunion?2:primeraReunionObj.reunion.cReunion;
			var idtpoAccion =constants.APOYO_FEDERAL;
			var idtpoEstatal=constants.APOYO_ESTATAL;

			_apoyos(array.indexOf(actividades,1)!=-1);
			_diagnostico(array.indexOf(actividades,2)!=-1);
			_inclusionSocial(array.indexOf(actividades,5)!=-1);
			_planDTrabajo(array.indexOf(actividades,6)!=-1);

			utils.asistenciaReunion(idReunion,'Integrantes',primeraReunionObj.integrantesR1,storeCcts);
			utils.asistenciaReunion(idReunion,'Instructores',primeraReunionObj.instructoresR1,storeCcts);
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listTipoBullying/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];				
				for(var j in data){
					store.push({ 
						id:data[j].cCoTipoBullying,
						name:data[j].nomTipoBullying,
					});
				}
				BullyingTipoStore = new Memory({data:store});
		    });
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listNee/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{name:"[Seleccione]",id:"-1"}];
				for(var j in data){
					store.push({ 
						id:data[j].cNee,
						name:data[j].nomNee,
					});
				}
				NeeStore = new Memory({data:store});
			});
			

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
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo/'+ idtpoAccion+'/'+idReunion,
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];				
				for(var j in data){
					store.push({ 
						id:data[j].cApoyo,
						name:data[j].descripCorta,
					});
				}
				FederalesStore = new Memory({data:store});
		    });
			
			//EstatalStore
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo/'+ idtpoEstatal+'/'+idReunion,
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];				
				for(var j in data){
					store.push({ 
						id:data[j].cApoyo,
						name:data[j].descripCorta,
					});
				}
				EstatalStore = new Memory({data:store});
		    });
	    }
		
		
		function _apoyos(crearApoyos){
			var listPanelesAPoyo= new Array({title:"Apoyos CONAFE-2",     tpoList:1,id:"apoyoC"},
											{title:"Apoyos federales",  tpoList:2,id:"apoyoF"},
											{title:"Apoyos est. o mun.",tpoList:3,id:"apoyoE"}
											);
			//Se recorre la lista de los apoyos, se busca el 
			//correspondiente y se env�a la informaci�n a la 
			//funci�n para mostrarla en pantalla.
			for(var i in listPanelesAPoyo){
				if(crearApoyos){
					if(!registry.byId(listPanelesAPoyo[i].id)){
						var objSelect = null;
						if(listPanelesAPoyo[i].id=="apoyoF"){
							objSelect = primeraReunionObj.apoyosFederales?primeraReunionObj.apoyosFederales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoF"){
							objSelect = primeraReunionObj.apoyosFederales?primeraReunionObj.apoyosFederales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoE"){
							objSelect = primeraReunionObj.apoyosEstatales?primeraReunionObj.apoyosEstatales:[];
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
					//Se crea el panel principal, que contendr� toda la
					//secci�n de diagn�stico, que incluye la parte de
					//salud, producci�n y alfabetizaci�n.
					utils.crearPanel(id,'Diagn\u00f3stico comunitario',idPanelSecundario);
					
					//Aqu� se encuentra toda la secci�n de salud.
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
	        			//Se crea el segundo bloque que contendr� al campo te texto que permanecer� oculto.
	        			_crearCampoTextoOculto(listSalud[i].id,'espacioSalud',"Especifique: ",constants.TEXT_FALTA_INFORMACION,false,false);
		        		//Se llenan los check con la informaci�n del objeto.
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
		                			//Si una de las opciones es otros se carga la descripci�n 
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
					//muestre o no el campo de texto, dependiendo de la opci�n marcada.
	                ckmsSalud[0].on('click', function(){
						_mostrarTxt(registry.byId('listProblemas'+listSalud[0].tpoList),document.getElementById('tab'+listSalud[0].id),registry.byId('input'+listSalud[0].id));
					});
	
	                //Aqu� se encuentra toda la secci�n de producci�n.
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
							//Se saca de la lista los valores de tipo producci�n
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
					
					//Secci�n de alfabetizaci�n
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
							//Se saca de la lista los valores de tipo alfabetizaci�n.
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

			var listPanelesNP= new Array({title:"Inclusi\u00F3n social", tpoList:1,id:"inclS"},
										 {title:"bullying",  tpoList:2,id:"bullying"});
			//Se recorre la lista de los apoyos, se busca el 
			//correspondiente y se env�a la informaci�n a la 
			//funci�n para mostrarla en pantalla.
			for(var i in listPanelesNP){
				if(crearNP){
					if(!registry.byId(listPanelesNP[i].id)){
						var objSelect = null;
						var Panel = null;
						if(listPanelesNP[i].id=="inclS"){
							objSelect =primeraReunionObj.inclusion?primeraReunionObj.inclusion:[];						
							Panel ='inclusionPane';
						}else if(listPanelesNP[i].id=="bullying"){
							objSelect = primeraReunionObj.bullying?primeraReunionObj.bullying:[];
							Panel ='bullyingPane';
						}
						_crearListaNP(listPanelesNP[i],objSelect,Panel);
						utils.pestaniaSelect(listPanelesNP[0].id);
					}
				}else{
					utils.cerrarPestania(listPanelesNP[i].id);
				}
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
							//Llenamos el arreglo con la informaci�n para el check.
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
					//Se crea el widget del check multiselecci�n
					//y se le agregan las opciones encontradas.
					var ckmsPT=new CheckedMultiSelect({
						id:'cmsPlanT',
				        multiple:true
				     },'cmsPlanT');
					ckmsPT.addOption(opciones);
					//En esta parte se crean los grid con la informaci�n
					utils.crearGrid('gridPT',layoutAcciones,'idAccion',acciones,idGrid);
					//Secci�n para los botones.
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
	
			
			// VBLAKE SE INSERTA CODIGO TIPO LISTA IGUAL A 2 PARA ADEACUARSE A TIPO LISTA IGUAN A 1
			if(pestaniaDestino.tpoList==1){
				var idGrid = "gridConafe";
				var listApoyosC = primeraReunionObj.apoyosConafe?primeraReunionObj.apoyosConafe:[];	
				var apoyosConafe=new Array();
				var idPanelSecundario = "ApoyoPaneConafe";
				
				
			    var layoutApoyo = [[{name:'columna1',field:'id',hidden:true},
				                        {name:'cApoyo',field:'cApoyo',hidden:true},
				                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
				                        {name:'\u00BFCu\u00e1l?',field:'cual',width:'80px',styles:'text-align: center;'},
				                        {name:'Cantidad',field:'cantidad',width:'80px',styles:'text-align: center;'},
				                        {name:'N\u00famero de beneficiarios',field:'beneficiarios',width:'80px',styles:'text-align: center;'},
				                        {name:'Se gestion\u00e1',width:'272px',styles:'text-align: left;',field:'gestion'}]];
			    

				utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
				
				dom.byId('ApoyoPaneConafe').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
					'<td width= "450px"><span class="sub" align="left">Apoyos de programas Conafe recibidos o por gestionar </span></td>'+
				'<tr>'+
					'<td id="gridAc" align="center"></td>'+
				'</tr>'+
				'<tr>'+
					'<td><div id="buttonAc" align="center"></td>'+
				'</tr>'+
			    '</table>';
				
			    for(var i in listApoyosC){
					var apoyoCo = {
					    id:i,
					    cApoyo : listApoyosC[i].cApoyo,
					    apoyo:listApoyosC[i].descripCorta,
					    cual:listApoyosC[i].descripOtro,
					    cantidad : listApoyosC[i].montor2,
					    beneficiarios : listApoyosC[i].montor2,
					    gestion : listApoyosC[i].especier2
					};
					apoyosConafe.push(apoyoCo);
				}
			    utils.crearGrid('gridAc',layoutApoyo,'cApoyo',apoyosConafe,idGrid);
			  //Secci�n para los botones.
				_agregarFilaGrid('Conafe','buttonAc');
				utils.createTag('input','editapoyosConafe','buttonAc');
				new Button({
					label:'Editar',
					onClick:function(){
						var grid = registry.byId(idGrid);
						var items = grid.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){	
				                	var itemToEdit={
				                			cApoyo :grid.store.getValue(selectedItem,'cApoyo'),
				           				    apoyo:grid.store.getValue(selectedItem,'apoyo'),
				           				    cual:grid.store.getValue(selectedItem,'cual'),
				           				    cantidad:grid.store.getValue(selectedItem,'cantidad'),
				           				    beneficiarios :grid.store.getValue(selectedItem,'beneficiarios'),
				           				    gestion :grid.store.getValue(selectedItem,'gestion'),
				                			};
				                	_popupConafe(itemToEdit);
								}
							}); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
				},'editapoyosConafe');			
				utils.eliminarFilaGrid(idGrid,'buttonAc',0,false);
				}
			
			
			else if(pestaniaDestino.tpoList==2){
				var idGrid = "gridFederal";
				var listApoyosF = primeraReunionObj.apoyosFederales?primeraReunionObj.apoyosFederales:[];	
				var apoyosFederales=new Array();
				var idPanelSecundario = "ApoyoPane";
				
				
			    var layoutApoyo = [[{name:'columna1',field:'id',hidden:true},
				                        {name:'cApoyo',field:'cApoyo',hidden:true},
				                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
				                        {name:'\u00BFCu\u00e1l?',field:'cual',width:'80px',styles:'text-align: center;'},
				                        {name:'N\u00famero de beneficiarios',field:'beneficiarios',width:'80px',styles:'text-align: center;'},
				                        {name:'Se gestion\u00e1',width:'272px',styles:'text-align: left;',field:'gestion'}]];
			    

				utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
				
				dom.byId('ApoyoPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
					'<td width= "450px"><span class="sub" align="left">Apoyos de programas federales recibidos o por gestionar </span></td>'+
				'<tr>'+
					'<td id="gridAf" align="center"></td>'+
				'</tr>'+
				'<tr>'+
					'<td><div id="buttonAf" align="center"></td>'+
				'</tr>'+
			    '</table>';
				
			    for(var i in listApoyosF){
					var apoyo = {
					    id:i,
					    cApoyo : listApoyosF[i].cApoyo,
					    apoyo:listApoyosF[i].descripCorta,
					    cual:listApoyosF[i].descripOtro,
					    beneficiarios : listApoyosF[i].montor2,
					    gestion : listApoyosF[i].especier2
					};
					apoyosFederales.push(apoyo);
				}
			    utils.crearGrid('gridAf',layoutApoyo,'cApoyo',apoyosFederales,idGrid);
			  //Secci�n para los botones.
				_agregarFilaGrid('Federal','buttonAf');
				utils.createTag('input','editapoyosFederales','buttonAf');
				new Button({
					label:'Editar',
					onClick:function(){
						var grid = registry.byId(idGrid);
						var items = grid.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){	
				                	var itemToEdit={
				                			cApoyo :grid.store.getValue(selectedItem,'cApoyo'),
				           				    apoyo:grid.store.getValue(selectedItem,'apoyo'),
				           				    cual:grid.store.getValue(selectedItem,'cual'),
				           				    beneficiarios :grid.store.getValue(selectedItem,'beneficiarios'),
				           				    gestion :grid.store.getValue(selectedItem,'gestion'),
				                			};
				                	_popupFederal(itemToEdit);
								}
							}); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
				},'editapoyosFederales');			
				utils.eliminarFilaGrid(idGrid,'buttonAf',0,false);
				}
			else if(pestaniaDestino.tpoList==3){
			var idGrid = "gridEstatal";
			var listApoyosE = primeraReunionObj.apoyosEstatales?primeraReunionObj.apoyosEstatales:[];	
			var apoyosEstatales=new Array();
			var idPanelSecundario = "apoyosEstatales";
			
			
		    var layoutApoyoE = [[{name:'columna1',field:'id',hidden:true},
			                        {name:'cApoyo',field:'cApoyo',hidden:true},
			                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
			                        {name:'Especifique',field:'especifique',width:'80px',styles:'text-align: center;'},
			                        {name:'Se gestionar\u00e1',width:'272px',styles:'text-align: left;',field:'gestion'}]];
		    

			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
			
			dom.byId('apoyosEstatales').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
			'<tr>'+
				'<td width= "450px"><span class="sub" align="left">Apoyos de Estatales recibidos o por gestionar </span></td>'+
			'<tr>'+
				'<td id="gridAe" align="center"></td>'+
			'</tr>'+
			'<tr>'+
				'<td><div id="buttonAe" align="center"></td>'+
			'</tr>'+
		    '</table>';
			
		    for(var i in listApoyosE){
				var apoyoE = {
				    id:i,
				    cApoyo : listApoyosE[i].cApoyo,
				    apoyo:listApoyosE[i].descripCorta,
				    especifique : listApoyosE[i].descripOtro,
				    gestion : listApoyosE[i].especier2
				};
				apoyosEstatales.push(apoyoE);
			}
		    utils.crearGrid('gridAe',layoutApoyoE,'cApoyo',apoyosEstatales,idGrid);
		  //Secci�n para los botones.
			_agregarFilaGrid('Estatal','buttonAe');
			utils.createTag('input','editapoyosEstatales','buttonAe');
			new Button({
				label:'Editar',
				onClick:function(){
					var grid = registry.byId(idGrid);
					var items = grid.selection.getSelected();
					if(items.length==1){
			             dojo.forEach(items, function(selectedItem){
			                 if(selectedItem !== null){	
			                	var itemToEdit={
			                			cApoyo :grid.store.getValue(selectedItem,'cApoyo'),
			           				    apoyo:grid.store.getValue(selectedItem,'apoyo'),
			           				    especifique :grid.store.getValue(selectedItem,'especifique'),
			           				    gestion :grid.store.getValue(selectedItem,'gestion'),
			                			};
			                	_popupEstatal(itemToEdit);
							}
						}); 
			         }else{
			        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
			         }
				}
			},'editapoyosEstatales');			
			utils.eliminarFilaGrid(idGrid,'buttonAe',0,false);
			}
		}
		
		
		function _crearListaNP(pestaniaDestino,listPN,PanelPN){
			var idGrid = "gridBullying";
			//Crea la pesta�a y el primer bloque.
			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,PanelPN); 
			if(pestaniaDestino.id =="bullying"){
				objSelect = primeraReunionObj.bullying?primeraReunionObj.bullying:[];
				var bullying=new Array();
				dom.byId('bullyingPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
					'<td width= "450px"><span class="sub" align="left">Casos de acoso escolar (bullying) presentados en la escuela</span></td>'+
				'<tr>'+
					'<td id="gridBl" align="center"></td>'+
				'</tr>'+
				'<tr>'+
					'<td><div id="buttonB" align="center"></td>'+
				'</tr>'+
			  '</table>';
				var layoutBullying = [[{name:'columna1',field:'id',hidden:true},
				                       	{name:'idTpoBullying',field:'idTpoBullying',hidden:true},
				                       	{name:'nomTipoBullying',field:'nomTipoBullying',hidden:true},
				                        {name:'idBullying',field:'idBullying',hidden:true},
				                        {name:'Nombre',width:'272px',styles:'text-align: left;',field:'nombre'},
				                        {name:'N\u00famero de casos',field:'cuantos',width:'80px',styles:'text-align: center;'},
				                        {name:'Acci\u00f3n o apoyo',width:'272px',styles:'text-align: left;',field:'numveces'}]];
				
				for(var j in objSelect){
					var situacionBullying = {
					    id:j,
					    idTpoBullying:objSelect[j].cCoTipoBullying,
					    nomTipoBullying:objSelect[j].nomTipoBullying,
					    idBullying:objSelect[j].cCoBullying,
					    nombre:objSelect[j].descripCortar1,
					    cuantos:objSelect[j].cuantos,
					    numveces:objSelect[j].numvecesr1,
					};
					bullying.push(situacionBullying);
				}
				utils.crearGrid('gridBl',layoutBullying,'idBullying',bullying,idGrid);
				//Secci�n para los botones.
				_agregarFilaGrid('Bullying','buttonB');
				utils.createTag('input','editBullying','buttonB');
				new Button({
					label:'Editar',
					onClick:function(){
						var grid = registry.byId(idGrid);
						var items = grid.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){	
				                	var itemToEdit={
				                			idTpoBullying:grid.store.getValue(selectedItem,'idTpoBullying'),
				                			nomTipoBullying:grid.store.getValue(selectedItem,'nomTipoBullying'),
				                			idBullying : grid.store.getValue(selectedItem,'idBullying'),
				                			nombre : grid.store.getValue(selectedItem,'nombre'),
				                			cuantos : grid.store.getValue(selectedItem,'cuantos'),
				                			numveces : grid.store.getValue(selectedItem,'numveces')
									    };
				                	_popupBullying(itemToEdit);
				                 }
				             }); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
				},'editBullying');
				utils.eliminarFilaGrid(idGrid,'buttonB',0,false);
				
				
			}
			if(pestaniaDestino.id=="inclS"){
				var necesidadesObj=primeraReunionObj.necesidadesEspeciales?primeraReunionObj.necesidadesEspeciales:[];
				var situacionIndigenaObj=primeraReunionObj.pobIndigena?primeraReunionObj.pobIndigena:[];
				var necesidades=new Array();
				var situacionesIndigenas=new Array();
				var layoutNecesidad = [[{name:'id',field:'id',hidden:true},
					                        {name:'cApoyo',field:'cApoyo',hidden:true},
					                        {name:'Necesidad',width:'315px',styles:'text-align: left;',field:'necesidad'},
					                        {name:'idTipoNecesidad',field:'cNee',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee',width:'215px',styles:'text-align: left;'},
					                        {name:'N\u00famero de Ni\u00f1os',width:'80px',styles:'text-align: center;',field:'cuantos'},
					                        {name:'Apoyos por gestionar',field:'gestion',width:'215px',styles:'text-align: left;'},
					                        {name:'idTipoNecesidad',field:'cNee1',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee1',width:'215px',styles:'text-align: left;'},
					                        {name:'N\u00famero de Ni\u00f1os',width:'80px',styles:'text-align: center;',field:'cuantos1'},
					                        {name:'Apoyos por gestionar',field:'gestion1',width:'215px',styles:'text-align: left;'}]];
					
				
				var layoutPoblacion = [[{name:'id',field:'id',hidden:true},
				                        {name:'idSituacion',field:'idSituacion',hidden:true},
				                        {name:'Situaci\u00F3n de ni\u00F1os ind\u00EDgenas',field:'situacion',width:'215px',styles:'text-align: left;'},
				                        {name:'\u00BFCu\u00E1ntos?',field:'cuantos',width:'80px',styles:'text-align: center;'},
				                        {name:'idLengua',field:'idLengua',hidden:true},
				                        {name:'Lengua',field:'lengua',width:'100px',styles:'text-align: center;'}]];
				
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
				
				//Secci�n de necesidades educativas.
									for(var i in necesidadesObj){
						var necesidad = {
						    id:i,
						    cApoyo:necesidadesObj[i].cApoyo,
						    necesidad:necesidadesObj[i].descripLarga,
						    cNee:necesidadesObj[i].cNee,
						    nomNee:necesidadesObj[i].nomNee,
						    cuantos:necesidadesObj[i].cuantos,
						    gestion:necesidadesObj[i].gestionar, 
						    cNee1:necesidadesObj[i].cNee1,
						    nomNee1:necesidadesObj[i].nomNee1,
						    cuantos1:necesidadesObj[i].cuantos1,
						    gestion1:necesidadesObj[i].gestionar1
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
					                			cNee:grid.store.getValue(selectedItem,'cNee'),
					                			nomNee:grid.store.getValue(selectedItem,'nomNee'),
					                			cuantos: grid.store.getValue(selectedItem,'cuantos'),
					                			gestion: grid.store. getValue(selectedItem,'gestion'),
					                			cNee1:grid.store.getValue(selectedItem,'cNee1'),
					                			nomNee1:grid.store.getValue(selectedItem,'nomNee1'),
					                			cuantos1: grid.store.getValue(selectedItem,'cuantos1'),
					                			gestion1: grid.store. getValue(selectedItem,'gestion1'),
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

				//Secci�n de poblaci�n ind�gena.
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
		}
		
		
		function _mostrarTxt(lstCMS,tabContainer,txtSelect){
			//Recorre la lista de check's para encontrar la opci�n de otros y revisar si 
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
			//La funci�n crea un bot�n para poder agregar
			//una fila al grid seleccionado.
			utils.createTag('input','add'+nombreGrid,embedded);
			new Button({
				id : 'add'+nombreGrid,
				label:'Agregar',
				onClick: function(){
					if(nombreGrid=="Federal"){
						_popupFederal();
					}else if(nombreGrid=="Conafe"){
						_popupConafe();
					}
					else if(nombreGrid=="Estatal"){
						_popupEstatal();
					}else if(nombreGrid=="Apoyo"){
						_popupApoyos();
					}else if(nombreGrid=="Necesidad"){
						_popupNecesidad();
					}else if(nombreGrid=="Situacion"){
						_popupPoblacion();
					}else if(nombreGrid=="Bullying"){
						_popupBullying();
					}else if(nombreGrid=="Accion"){
						_popupAccion();
					}
					
		        }
			},'add'+nombreGrid);
		}
		function _popupApoyos(tpoApoyo,itemToEdit){
			var idVentana = 'popup_PrimeraReunion';
			var tituloVentana = "Plan de trabajo";
			var noAPlica = "N/A";
			var esPlanTrabajo = false;
			var exitenBrigadas = false;
			var edit = false;
			
			//Titulo de la ventana
			 if(tpoApoyo==constants.APOYO_FEDERAL){
				tituloVentana="Apoyo federal";
			}else if(tpoApoyo==constants.APOYO_NECESIDAD){
				tituloVentana="Necesidades educativas especiales";
			}else{
				esPlanTrabajo = true;
			}
			//Creamos la tabla con los elementos que tendr� el Pop UP.
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
						//Si el tipo de respuesta es de opci�n m�ltiple, en ese caso se mostrara un campo de 
						//texto para ingresar la informaci�n, de lo contrario se buscara las opciones del combo en BD.
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
	        			//Aqu� se cambia el texto del label, dependiendo 
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
		
		function _popupConafe(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					cApoyo: -1,
					apoyo:'',
					cual:'',
					cantidad:'',
					beneficiarios : '',
					gestion : '',
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPConafe';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Apoyos Conafe actuales y por gestionar", 
					content:'<table border="0" width= "900px">'+
								
								'<tr>'+
									'<td align="right"><label>* Apoyos Conafe: </label></td>'+
									'<td><input id="cmbApoyosc"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><div id="lblCual" style="display:none;"></div></td>'+
									'<td><div id="divCual" style="display:none;"><input id="txtCual"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Cantidad: </label></td>'+
									'<td><input id="txtCantidad"/></td>'+
							    '</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de beneficiarios: </label></td>'+
									'<td><input id="txtBenefi"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Se gestionar\u00e1: </label></td>'+
									'<td><input id="cmbGestion"/></td>'+
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
			
			var stateStore = new Memory({
		        data: [
		            {name:"Si", id:"Si"},
		            {name:"No", id:"No"}
		        ]
		    });
			
			
			var cmbApoyosc = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        value: itemToEdit.cApoyo,
		        store: FederalesStore,
		        required : true,
		        onChange: function(){
	            	if(cmbApoyosc.item.id==22) {
	            		dom.byId('lblCual').innerHTML='<label>* \u00BFCu\u00e1l?: </label>';
	            		document.getElementById('lblCual').style.display='block';
	    				document.getElementById('divCual').style.display='block';
	    	    		registry.byId("txtCual").set("required", true);
	    	    	}else{
	    				document.getElementById('lblCual').style.display='none';
	    				document.getElementById('divCual').style.display='none';
	    				registry.byId("txtCual").set("required", false);
	    	    	}
	            }
		        //
		     
		    },"cmbApoyosc");
			
			if(edit){
			if(itemToEdit.cApoyo=="22") {
        		dom.byId('lblCual').innerHTML='<label>* \u00BFCu\u00e1l?: </label>';
        		document.getElementById('lblCual').style.display='block';
				document.getElementById('divCual').style.display='block';
	    	}else{
				document.getElementById('lblCual').style.display='none';
				document.getElementById('divCual').style.display='none';
	    	}
		    }
			var txtCual = new ValidationTextBox({
				id :'txtCual',
				value : itemToEdit.cual,
				maxLength : "150",
				placeHolder : "Nota: especifique otro tipo de apoyo Conafe.",
	            style : "width:500px;"
			},'txtCual');
			
			var txtCantidad = new ValidationTextBox({
				value: itemToEdit.cantidad,
				require:true,
				maxlength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtCantidad');
			
			var txtBenefi = new ValidationTextBox({
				value: itemToEdit.beneficiarios,
				require:true,
				maxlength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtBenefi');
			
			var cmbGestion = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.gestion,
		        required : true
		     
		    },"cmbGestion");
			
			
			

			
			registry.byId('cmbApoyosc').set('value',itemToEdit.cApoyo);
			if(!edit){registry.byId('cmbApoyosc').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyosc').get('value')==-1 || registry.byId('cmbGestion').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridConafe = registry.byId('gridConafe');
					try{
						try {
							if(edit){		
								var index = gridConafe.selection.selectedIndex;
								var item = gridConafe.getItem(index);
								gridConafe.store.setValue(item, 'apoyo',cmbApoyosc.get('displayedValue'));
								gridConafe.store.setValue(item, 'cual',txtCual.get('value'));
								gridConafe.store.setValue(item, 'cantidad',txtCantidad.get('value'));
								gridConafe.store.setValue(item, 'beneficiarios',txtBenefi.get('value'));
								gridConafe.store.setValue(item, 'gestion',cmbGestion.get('displayedValue'));
								gridConafe.update();
							}
							else{
								var myNewItem = {
									id : gridConafe.rowCount + 1,
									cApoyo : cmbApoyosc.get('value'),
									apoyo : cmbApoyosc.get('displayedValue'),
									cual : txtCual.get('value'),
									cantidad : txtCantidad.get('value'),
									beneficiarios: txtBenefi.get('value'),
									gestion : cmbGestion.get('value')
								};
								gridConafe.store.newItem(myNewItem);
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
		function _popupFederal(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					cApoyo: -1,
					apoyo:'',
					cual:'',
					beneficiarios : '',
					gestion : '',
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPFederal';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Apoyos Federales actuales y por gestionar", 
					content:'<table border="0" width= "900px">'+
								
								'<tr>'+
									'<td align="right"><label>* Apoyos Federales: </label></td>'+
									'<td><input id="cmbApoyosf"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><div id="lblCual" style="display:none;"></div></td>'+
									'<td><div id="divCual" style="display:none;"><input id="txtCual"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de beneficiarios: </label></td>'+
									'<td><input id="txtBenefi"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Se gestionar\u00e1: </label></td>'+
									'<td><input id="cmbGestion"/></td>'+
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
			
			var stateStore = new Memory({
		        data: [
		            {name:"Si", id:"Si"},
		            {name:"No", id:"No"}
		        ]
		    });
			
			
			var cmbApoyosf = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        value: itemToEdit.cApoyo,
		        store: FederalesStore,
		        required : true,
		        onChange: function(){
	            	if(cmbApoyosf.item.id==22) {
	            		dom.byId('lblCual').innerHTML='<label>* \u00BFCu\u00e1l?: </label>';
	            		document.getElementById('lblCual').style.display='block';
	    				document.getElementById('divCual').style.display='block';
	    	    		registry.byId("txtCual").set("required", true);
	    	    	}else{
	    				document.getElementById('lblCual').style.display='none';
	    				document.getElementById('divCual').style.display='none';
	    				registry.byId("txtCual").set("required", false);
	    	    	}
	            }
		        //
		     
		    },"cmbApoyosf");
			
			if(edit){
			if(itemToEdit.cApoyo=="22") {
        		dom.byId('lblCual').innerHTML='<label>* \u00BFCu\u00e1l?: </label>';
        		document.getElementById('lblCual').style.display='block';
				document.getElementById('divCual').style.display='block';
	    	}else{
				document.getElementById('lblCual').style.display='none';
				document.getElementById('divCual').style.display='none';
	    	}
		    }
			var txtCual = new ValidationTextBox({
				id :'txtCual',
				value : itemToEdit.cual,
				maxLength : "150",
				placeHolder : "Nota: especifique otro tipo de apoyo Federal.",
	            style : "width:500px;"
			},'txtCual');
			
			
			
			var txtBenefi = new ValidationTextBox({
				value: itemToEdit.beneficiarios,
				require:true,
				maxlength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtBenefi');
			
			var cmbGestion = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.gestion,
		        required : true
		     
		    },"cmbGestion");
			
			
			

			
			registry.byId('cmbApoyosf').set('value',itemToEdit.cApoyo);
			if(!edit){registry.byId('cmbApoyosf').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyosf').get('value')==-1 || registry.byId('cmbGestion').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridFederal = registry.byId('gridFederal');
					try{
						try {
							if(edit){		
								var index = gridFederal.selection.selectedIndex;
								var item = gridFederal.getItem(index);
								gridFederal.store.setValue(item, 'apoyo',cmbApoyosf.get('displayedValue'));
								gridFederal.store.setValue(item, 'cual',txtCual.get('value'));
								gridFederal.store.setValue(item, 'beneficiarios',txtBenefi.get('value'));
								gridFederal.store.setValue(item, 'gestion',cmbGestion.get('displayedValue'));
								gridFederal.update();
							}
							else{
								var myNewItem = {
									id : gridFederal.rowCount + 1,
									cApoyo : cmbApoyosf.get('value'),
									apoyo : cmbApoyosf.get('displayedValue'),
									cual : txtCual.get('value'),
									beneficiarios: txtBenefi.get('value'),
									gestion : cmbGestion.get('value')
								};
								gridFederal.store.newItem(myNewItem);
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
		function _popupEstatal(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					cApoyo: -1,
					apoyo:'',
					especifique : '',
					gestion : '',
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPEstatal';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Apoyos Estatales actuales y por gestionar", 
					content:'<table border="0" width= "900px">'+
								
								'<tr>'+
									'<td align="right"><label>* Apoyos Estatales: </label></td>'+
									'<td><input id="cmbApoyosE"/></td>'+
								'</tr>'+
								'<tr>'+
								'<td align="right"><div id="lblOtraAccion" style="display:none;"></div></td>'+
								'<td><div id="divOtraAccion" style="display:none;"><input id="txtOtraAccion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Se gestionar\u00e1: </label></td>'+
									'<td><input id="cmbGestionar"/></td>'+
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
			
			var stateStore = new Memory({
		        data: [
		            {name:"Si", id:"Si"},
		            {name:"No", id:"No"}
		        ]
		    });
			
			
			var cmbApoyosE = new FilteringSelect({
				readOnly : edit,
				store: EstatalStore,
				value: itemToEdit.cApoyo,
	            searchAttr: "name",
	            onChange: function(){
	            	if(cmbApoyosE.item.name== "Otros" ){
	            		dom.byId('lblOtraAccion').innerHTML='<label>* Especifique: </label>';
	            		document.getElementById('lblOtraAccion').style.display='block';
	    				document.getElementById('divOtraAccion').style.display='block';
	    	    		registry.byId("txtOtraAccion").set("required", true);
	    	    	}else{
	    				document.getElementById('lblOtraAccion').style.display='none';
	    				document.getElementById('divOtraAccion').style.display='none';
	    				registry.byId("txtOtraAccion").set("required", false);
	    	    	}
	            }
	        },"cmbApoyosE");
			
			if(edit){
				if(itemToEdit.apoyo== "Otros") {
					dom.byId('lblOtraAccion').innerHTML='<label>* Especifique: </label>';
            		document.getElementById('lblOtraAccion').style.display='block';
    				document.getElementById('divOtraAccion').style.display='block';
		    	}else{
		    		document.getElementById('lblOtraAccion').style.display='none';
    				document.getElementById('divOtraAccion').style.display='none';
		    	}
			    }
			
			var txtOtraAccion = new ValidationTextBox({
				id : 'txtOtraAccion',
				value : itemToEdit.especifique,
				maxLength : "150",
				placeHolder : "Nota: especifique otro tipo de apoyo estatal.",
	            style : "width:500px;"
			},'txtOtraAccion');
			
			var cmbGestionar = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.gestion,
		        required : true
		     
		    },"cmbGestionar");
			
			registry.byId('cmbApoyosE').set('value',itemToEdit.cApoyo);
			if(!edit){registry.byId('cmbApoyosE').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyosE').get('value')==-1 || registry.byId('cmbGestionar').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridEstatal = registry.byId('gridEstatal');
					try{
						try {
							if(edit){		
								var index = gridEstatal.selection.selectedIndex;
								var item = gridEstatal.getItem(index);
								gridEstatal.store.setValue(item, 'apoyo',cmbApoyosE.get('displayedValue'));
								gridEstatal.store.setValue(item, 'especifique',txtOtraAccion.get('value'));
								gridEstatal.store.setValue(item, 'gestion',cmbGestionar.get('displayedValue'));
								gridEstatal.update();
							}
							else{
								var myNewItem = {
									id : gridEstatal.rowCount + 1,
									cApoyo : cmbApoyosE.get('value'),
									apoyo : cmbApoyosE.get('displayedValue'),
									especifique: txtOtraAccion.get('value'),
									gestion : cmbGestionar.get('value')
								};
								gridEstatal.store.newItem(myNewItem);
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


		function _popupNecesidad(itemToEdit){
			//Ventana emergente para la tabla de 
			//necesidades educativas especiales
			var edit=false;
			if(!itemToEdit){
				itemToEdit= {
						cApoyo : 0,
						necesidad : '',
						cNee:-1,
						nomNee:'',
						gestion:'',
						cuantos : '',
						cNee1:1,
						nomNee1:'',
						gestion1:'',
						cuantos1: '',
					};
			}else{
				edit=true;
			}
	
			var idVentana='popUPNecesidad';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Necesidad educativa especial", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td align="right"><label>* Necesidad: </label></td>'+
									'<td><input id="cmbNecesidad"/></td>'+	
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*Tipo de necesidad: </label></td>'+
									'<td><input id="cmbTipoNecesidad"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*\u00BFCu\u00E1ntos?: </label></td>'+
									'<td><input id="txtNumNecesidad"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*Apoyos por gestionar: </label></td>'+
									'<td><input id="txtGestion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>Tipo de necesidad: </label></td>'+
									'<td><input id="cmbTipoNecesidad1"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>\u00BFCu\u00E1ntos?: </label></td>'+
									'<td><input id="txtNumNecesidad1"/></td>'+
								'</tr>'+
							    '<tr>'+
									'<td align="right"><label>Apoyos por gestionar: </label></td>'+
									'<td><input id="txtGestion1"/></td>'+
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
			
			
			var cmbTipoNecesidad = new FilteringSelect({
				value: itemToEdit.cNee,
				store: NeeStore,
				readOnly : edit,
				required: true,
	            searchAttr: "name",
	        },"cmbTipoNecesidad");
			
		
		
	
			var txtNumNecesidad=new ValidationTextBox({
				value:itemToEdit.cuantos,
				required: true,
				maxLength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtNumNecesidad');
			
			
			
			
			var txtGestion = new ValidationTextBox({
				id:'txtGestion',
				value: itemToEdit.gestion,
				maxLength : "150",
				required: true,
				placeHolder : "Nota: agregar los apoyos a gestionar separados por una coma.",
	        },"txtGestion");
			
			var cmbTipoNecesidad1 = new FilteringSelect({
				value: itemToEdit.cNee1,
				store: NeeStore,
				readOnly : edit,
	            searchAttr: "name",
	        },"cmbTipoNecesidad1");
			
			var txtNumNecesidad1=new ValidationTextBox({
				value:itemToEdit.cuantos1,
				maxLength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtNumNecesidad1');
			
			var txtGestion1 = new ValidationTextBox({
				id:'txtGestion1',
				value: itemToEdit.gestion,
				maxLength : "150",
				placeHolder : "Nota: agregar los apoyos a gestionar separados por una coma.",
	        },"txtGestion1");
			
	
			
			if(!edit){
				registry.byId('cmbNecesidad').set('value',-1);
				registry.byId('cmbTipoNecesidad').set('value',-1);
			}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbNecesidad').get('value')==-1 || registry.byId('cmbTipoNecesidad').get('value')==-1){ 
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					
					if (!form.validate() || registry.byId('cmbTipoNecesidad1').get('value')== registry.byId('cmbTipoNecesidad').get('value')){ 
						utils.cstmAlert('Favor de registrar Tipos de necesidades diferentes');
						return false;
					}
					
					var gridNecesidad = registry.byId('gridNecesidad');
					try{
						try {
							if(edit){
								var index = gridNecesidad.selection.selectedIndex;
								var item = gridNecesidad.getItem(index);
								gridNecesidad.store.setValue(item, 'necesidad', cmbTipoNecesidad.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'nomNee', cmbTipoNecesidad.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'cuantos',txtNumNecesidad.get('value'));
								gridNecesidad.store.setValue(item, 'gestion',txtGestion.get('value'));
								gridNecesidad.store.setValue(item, 'nomNee1', cmbTipoNecesidad1.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'cuantos1',txtNumNecesidad1.get('value'));
								gridNecesidad.store.setValue(item, 'gestion1',txtGestion1.get('value'));
								gridNecesidad.update();
							}else{
								var myNewItem = {
									id: gridNecesidad.rowCount + 1,
									cApoyo : cmbNecesidad.get('value'),
									necesidad :cmbNecesidad.get('displayedValue'),
									cNee : cmbTipoNecesidad.get('value'),
									nomNee : cmbTipoNecesidad.get('displayedValue'),
									cuantos : txtNumNecesidad.get('value'),
									gestion: txtGestion.get('value'),
									cNee1 : cmbTipoNecesidad1.get('value'),
									nomNee1 : cmbTipoNecesidad1.get('displayedValue'),
									cuantos1 : txtNumNecesidad1.get('value'),
									gestion1: txtGestion1.get('value'),
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
		
		

		function _popupBullying(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					idTpoBullying : -1,
					nomTipoBullying:'',
					idBullying : -1,
					nombre : '',
					cuantos : '',
					numveces:''
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPBullying';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Casos de acoso escolar", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td align="right"><label>* Tipo: </label></td>'+
									'<td><input id="cmbTipoAcoso"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Caso de bullying: </label></td>'+
									'<td><input id="cmbAcoso"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de casos: </label></td>'+
									'<td><input id="txtNumACaso"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Acci\u00f3n o apoyo: </label></td>'+
									'<td><input id="txtNumAccion"/></td>'+
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
			
			
			
			
			var cmbTipoAcoso = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store: BullyingTipoStore,
		        required : true,
		        onChange: function(){
		        	utils.findBullyingXTipo(cmbTipoAcoso.item.id,itemToEdit.idBullying,'cmbAcoso',idReunion);
		        }
		    },"cmbTipoAcoso");
			
			var cmbAcoso = new FilteringSelect({
				readOnly : edit,
				store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
				value:itemToEdit.idBullying,
	            searchAttr: "name"  
	        },"cmbAcoso");
			
			
			var txtNumACaso = new ValidationTextBox({
				value: itemToEdit.cuantos,
				require:true,
				maxlength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtNumACaso');

			var txtNumAccion = new ValidationTextBox({
				value : itemToEdit.numveces,
				required : true,
				maxLength :"150",
				placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
	            style : "width:500px;"
			},'txtNumAccion');
			
			registry.byId('cmbTipoAcoso').set('value',itemToEdit.idTpoBullying);
			if(!edit){registry.byId('cmbTipoAcoso').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbTipoAcoso').get('value')==-1 || registry.byId('cmbAcoso').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridBullying = registry.byId('gridBullying');
					try{
						try {
							if(edit){		
								var index = gridBullying.selection.selectedIndex;
								var item = gridBullying.getItem(index);
								gridBullying.store.setValue(item, 'nombre',cmbAcoso.get('displayedValue'));
								gridBullying.store.setValue(item, 'cuantos',txtNumACaso.get('value'));
								gridBullying.store.setValue(item, 'numveces',txtNumAccion.get('value'));
								gridBullying.update();
							}
							else{
								var myNewItem = {
									id : gridBullying.rowCount + 1,
									idTpoBullying: cmbTipoAcoso.get('value'),
									nomTipoBullying:cmbTipoAcoso.get('displayedValue'),
									idBullying : cmbAcoso.get('value'),
									nombre : cmbAcoso.get('displayedValue'),
									cuantos: txtNumACaso.get('value'),
									numveces : txtNumAccion.get('value')
								};
								gridBullying.store.newItem(myNewItem);
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
			//poblaci�n ind�gena
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
				var hayBullying = false;

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
						hayBullying =true;
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
				

					// Carga los apoyos estatales seleccionados
				
				}

				
				
				
// apoyos federales
				var apoyosFederales = new Array();
				if (hayApoyos) {
					var hayFederal = false;
					var gridApoyos = registry.byId('gridFederal');

					// Obtiene la informaci�n del Grid
					for ( var i = 0; i < gridApoyos.rowCount; i++) {

						var item = gridApoyos.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridApoyos.store.getValue(item, 'apoyo') == null
								|| gridApoyos.store.getValue(item, 'apoyo') == ""
								|| gridApoyos.store.getValue(item,'beneficiarios')== null
								|| gridApoyos.store.getValue(item,'beneficiarios')==""
								|| gridApoyos.store.getValue(item, 'gestion') == null
								|| gridApoyos.store.getValue(item, 'gestion') == "") {

							utils
									.cstmAlert("Uno o m\u00e1s apoyos federales no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						
												
						var apoyo = {
							cApoyo: gridApoyos.store.getValue(item,
												'cApoyo'),
							descripOtro : gridApoyos.store.getValue(item,'cual'),
							montor2 : gridApoyos.store.getValue(item,
									'beneficiarios'),
							especier2 : gridApoyos.store.getValue(item,
									'gestion')
						};
						apoyosFederales.push(apoyo);
						hayFederal = true;
					}

					if (hayFederal == false) {

						utils.cstmAlert("Debe indicar alg\u00fan apoyo federal");
						return false;
					}
				}	
				
				
//
				
				var apoyosEstatales = new Array();
				if (hayApoyos) {
					var hayEstatal = false;
					var gridApoyos = registry.byId('gridEstatal');

					// Obtiene la informaci�n del Grid
					for ( var i = 0; i < gridApoyos.rowCount; i++) {

						var item = gridApoyos.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridApoyos.store.getValue(item, 'apoyo') == null
								|| gridApoyos.store.getValue(item, 'apoyo') == ""
								|| gridApoyos.store.getValue(item, 'gestion') == null
								|| gridApoyos.store.getValue(item, 'gestion') == "") {

							utils
									.cstmAlert("Uno o m\u00e1s apoyos estatales no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						
												
						var estatal= {
							cApoyo: gridApoyos.store.getValue(item,'cApoyo'),
							descripOtro : gridApoyos.store.getValue(item,'especifique'),
							especier2 : gridApoyos.store.getValue(item,'gestion')
						};
						apoyosEstatales.push(estatal);
						hayEstatal = true;
					}

					if (hayEstatal == false) {
						utils.cstmAlert("Debe indicar alg\u00fan apoyo estatal");
						return false;
					}
				}	
				
				
				
	//
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

					// Obtiene la informaci�n del Grid
					for ( var i = 0; i < gridNecesidades.rowCount; i++) {

						var item = gridNecesidades.getItem(i);
						// Genera un nuevo objeto de necesidad especial de cada
						// renglon del grid.
						if (gridNecesidades.store.getValue(item, 'necesidad') == null
								|| gridNecesidades.store.getValue(item,
										'necesidad') == ""
								|| gridNecesidades.store.getValue(item, 
										'nomNee') == null
								|| gridNecesidades.store.getValue(item,
										'nomNee') == ""
								|| gridNecesidades.store.getValue(item,
										'cuantos') == null
								|| gridNecesidades.store.getValue(item,
										'cuantos') == ""
								|| gridNecesidades.store.getValue(item,
										'gestion') == null
								|| gridNecesidades.store.getValue(item,
										'gestion') == "") {
							utils
									.cstmAlert("Una o m\u00e1s necesidades especiales no cuentan con la informaci\u00F3n requerida");
							return false;
						}

						var neceEspItem = {
							cApoyo : gridNecesidades.store.getValue(item,
									'cApoyo'),
							cNee : gridNecesidades.store.getValue(
									item, 'cNee'),
							cuantos : gridNecesidades.store.getValue(
									item, 'cuantos'),
							gestionar : gridNecesidades.store.getValue(
									item, 'gestion'),
							cNee1 : gridNecesidades.store.getValue(
									item, 'cNee1'),
							cuantos1 : gridNecesidades.store.getValue(
									item, 'cuantos1'),
							gestionar1 : gridNecesidades.store.getValue(
									item, 'gestion1'),
						};

						necEsp.push(neceEspItem);
						hayDatosIncSocial = true;
					}

					var gridPobIndigena = registry.byId('gridSituaciones');

					// Obtiene la informaci�n del Grid
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
					//bullying
					var bullying = new Array();
					var gridAcoso = registry.byId('gridBullying');

					// Obtiene la informaci�n del Grid
					for ( var i = 0; i < gridAcoso.rowCount; i++) {

						var item = gridAcoso.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridAcoso.store.getValue(item, 'nombre') == null
								|| gridAcoso.store.getValue(item, 'nombre') == ""
								|| gridAcoso.store.getValue(item,'cuantos')== null
								|| gridAcoso.store.getValue(item,'cuantos')==""
								|| gridAcoso.store.getValue(item, 'numveces') == null
								|| gridAcoso.store.getValue(item, 'numveces') == "") {

							utils
									.cstmAlert("Una o m\u00e1s casos de bullying no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						
												
						var acoso = {
						    cCoTipoBullying: gridAcoso.store.getValue(item,
												'idTpoBullying'),
							cCoBullying : gridAcoso.store.getValue(item,
									'idBullying'),
							cuantos : gridAcoso.store.getValue(item,
									'cuantos'),
							numvecesr1 : gridAcoso.store.getValue(item,
									'numveces')
						};
						bullying.push(acoso);
						hayDatosIncSocial = true;
						
					}
					//

					if (hayDatosIncSocial == false) {

						utils
								.cstmAlert("Debe indicar alguno de los rubros de inclusi\u00F3n social");
						return false;
					}

				}
				
//	Bullying
				
			

		
//				
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

					// Obtiene la informaci�n del Grid
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
					bullying:bullying,
					planTrabajo : planTrabajo,
					integrantesR1 : integrantesR1,
					instructoresR1 : instructoresR1
				};
				
				console.log(json.toJson(primeraReunion));
				//console.log(json.toJson(primeraReunion.Bullying));
				
				
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