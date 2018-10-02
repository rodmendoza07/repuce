define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/form/CheckedMultiSelect","app/util/jsUtils","dojo/_base/xhr","dojo/_base/json",
         "dijit/form/ValidationTextBox","dojo/on","dijit/form/RadioButton","dijit/form/Textarea",
         "dojo/dom", "dojo/data/ItemFileWriteStore", "dijit/form/FilteringSelect",
         "dijit/form/CheckBox", "dojox/grid/EnhancedGrid", "dijit/form/Button", "app/util/constants",  "dijit/form/Form",
         "dojo/_base/xhr", "dojo/DeferredList", "dojox/widget/Standby","dojo/data/ItemFileWriteStore",
         "dojox/form/MultiComboBox","dojox/grid/DataGrid","app/ciclo2014-15/reuniones","dojo/_base/lang",
         "dijit/form/CheckBox", "app/util/constants","dijit/Dialog","dojo/store/Memory",
         "dojox/grid/cells/dijit", "dojox/grid/_CheckBoxSelector",
         "dijit/form/HorizontalSlider", "dijit/form/HorizontalRuleLabels", "dojo/query"], 
function( ContentPane,registry,array,utils,CheckedMultiSelect,jsUtils,xhr,json,ValidationTextBox,
		on,RadioButton,Textarea,dom, ItemFileWriteStore, FilteringSelect,
		CheckBox, EnhancedGrid, Button, constants, Form, xhr, DeferredList, Standby, ItemFileWriteStore,
		MultiComboBox,DataGrid,reuniones,lang, CheckBox, constants, Dialog, Memory,gridCellsDijit, _CheckBoxSelector,
		HorizontalSlider,HorizontalRuleLabels, query){
	
	var segundaAsambleaObj= new Object();
		
	listDetalleG = new Array();
	listDetalleG = [];
	actividadesFun();
	listTemasG = new Array();
	categoriasA = new Array(); 
	var maxIndexEstimulosm = 0;
	
	var listPestanias= new Array(	
			{title:"Programas Federales",	tpoPrograma:1,id:"progFedPane", funcion:"funFederal",idDB:41},
			{title:"Programas Estatales",	tpoPrograma:2,id:"progEstPane", funcion:"funEstatal",idDB:41},
			{title:"Programas Municipales",	tpoPrograma:3,id:"progLocPane", funcion:"funMunicipal",idDB:41},
			{title:"Programas OSC",			tpoPrograma:4,id:"proyOSCPane", funcion:"funOSC",idDB:41},
			{title:"Recursos",				tpoPrograma:5,id:"recursosPane", funcion:"showRecursos",idDB:42},
			{title:"Acciones",				tpoPrograma:6,id:"accionPane", funcion:"funAccion",idDB:43},
			{title:"Normalidad m\u00ednima",tpoPrograma:7,id:"normalidadPane", funcion:"funNormal",idDB:44},			
			{title:"Evaluaciones",			tpoPrograma:8,id:"evaluacionPane", funcion:"funEvaluacion",idDB:45},
			{title:"Compromisos",			tpoPrograma:9,id:"compromisoPane", funcion:"funCompromiso",idDB:45},
			{title:"Comit\u00E9s",			tpoPrograma:10,id:"comitePane", funcion:"funComite",idDB:46},
			{title:"Contraloria Social",    tpoPrograma:18,id:"contraPane", funcion:"funContraloria",idDB:46},
			{title:"Eventos",				tpoPrograma:11,id:"eventoPane", funcion:"funEvento",idDB:47},
			{title:"Estimulos y reconocimientos",	tpoPrograma:12,id:"estimuloPane", funcion:"funEstimulo",idDB:48},
			{title:"Asuntos y acuerdos",	tpoPrograma:13,id:"asuntoPane", funcion:"funAsunto",idDB:53},
			{title:"Consejos Estatales",	tpoPrograma:14,id:"preguntasEstatalPane", funcion:"funPreguntasEstatal",idDB:50},
			{title:"Consejos Municipales",	tpoPrograma:15,id:"preguntasMunicipalPane", funcion:"funPreguntasMunicipal",idDB:50},
			{title:"Actividades",	tpoPrograma:16,id:"activPane", funcion:"funActividades",idDB:49},
			{title:"Asociaci\u00f3n de Padres de Familia",	tpoPrograma:17,id:"recursos2Pane", funcion:"funRecursos2",idDB:52}
		);
	
	function init(actividades,cCct,ReunionObj,infCctPar){
		//
		segundaAsambleaObj=ReunionObj;
		gActividades=actividades;
		infCctNivel=infCctPar;
		
		categoriasA = [];
		
		
		
		temasFun();
		calidadPresidenteFun();
		categoriasFun();
		objetivosFun();
//		detalleCategoriafun();
	
		
		
		
		if(gActividades.length>0){
			  _pestanias();			  
		  }
		  else{
			  for(var i in listPestanias )
			   {
	   			     if(registry.byId(listPestanias[i].id)){
	   			    	 if(array.indexOf(gActividades,listPestanias[i].idDB)==-1){
	   						registry.byId('pestanias').closeChild(registry.byId(listPestanias[i].id));
	   			    	 }
	   			    }	 	   			     
			   }
		  }
		
		tDetalle = segundaAsambleaObj.detalleSeguimiento?segundaAsambleaObj.detalleSeguimiento:[];
		tDetalle4 = [];

		
		for(var i in tDetalle){
			if(tDetalle[i].cSesion!=4){
				tDetalle[i].avance = '';
			}
		}
		
		for(var i in tDetalle){
			if(tDetalle[i].cSesion==4){
				tDetalle4.push(tDetalle[i]);
			}
		}
		
		if(tDetalle4.length <= 0)
		{
			tDetalle4 = tDetalle;
		}
		
		
		despliegaFederales(array.indexOf(gActividades,41)!=-1);
		despliegaEstatales(array.indexOf(gActividades,41)!=-1);
		despliegaMunicipales(array.indexOf(gActividades,41)!=-1);
		despliegaOsc(array.indexOf(gActividades,41)!=-1);
		despliegaRecursos(array.indexOf(gActividades,42)!=-1);
		despliegaAcciones(array.indexOf(gActividades,43)!=-1);
		despliegaNormalidad(array.indexOf(gActividades,44)!=-1);
		despliegaEvaluacion(array.indexOf(gActividades,45)!=-1);
		despliegaCompromisos(array.indexOf(gActividades,45)!=-1);
		despliegaComites(array.indexOf(gActividades,46)!=-1);
		despliegaContraloria(array.indexOf(gActividades,46)!=-1);
		despliegaEventos(array.indexOf(gActividades,47)!=-1);
		despliegaEstimulos(array.indexOf(gActividades,48)!=-1);
		despliegaAsuntos(array.indexOf(gActividades,53)!=-1);
		despliegaCategorias(array.indexOf(gActividades,49)!=-1);
		despliegaPreguntasEstatales(array.indexOf(gActividades,50)!=-1);
		despliegaPreguntasMunicipales(array.indexOf(gActividades,50)!=-1);
		despliegaRecursos2(array.indexOf(gActividades,52)!=-1);

		
		
		detalleCategoriafun();	
	}
	
	
	var federalesStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listProgramas/1',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
           for ( var i in data) {
                 federalesStore.push({
                        nomPrograma : data[i].nomPrograma,
                        objetivo : data[i].objetivo,
                        cPrograma : data[i].cPrograma,
                        tpoPrograma : data[i].tpoPrograma
                    });
           }           
        });
    
    var estatalesStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listProgramas/2',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
           for ( var i in data) {
                 estatalesStore.push({
                        nomPrograma : data[i].nomPrograma,
                        objetivo : data[i].objetivo,
                        cPrograma : data[i].cPrograma,
                        tpoPrograma : data[i].tpoPrograma
                    });
           }           
        });
    
    var municipalesStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listProgramas/3',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
           for ( var i in data) {
                 municipalesStore.push({
                        nomPrograma : data[i].nomPrograma,
                        objetivo : data[i].objetivo,
                        cPrograma : data[i].cPrograma,
                        tpoPrograma : data[i].tpoPrograma
                    });
           }           
        });
    
    var oscStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listProgramas/4',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
           for ( var i in data) {
                 oscStore.push({
                        nomPrograma : data[i].nomPrograma,
                        objetivo : data[i].objetivo,
                        cPrograma : data[i].cPrograma,
                        tpoPrograma : data[i].tpoPrograma
                    });
           }           
        });

    var objsStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listObjetivos/',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
           for ( var i in data) {
                 objsStore.push({
                	 	cObjetivo : data[i].cObjetivo,
                	 	tpoPrograma : data[i].tpoPrograma,
                	 	descripObjetivo : data[i].descripObjetivo
                    });
           }           
        });    
    
    
    var eventosStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listEventos/',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
           for ( var i in data) {
                 eventosStore.push({
                	   cEvento : data[i].cEvento,
                	 nomEvento : data[i].nomEvento
                    });
           }           
        });  
	
	var gradosStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listGrados/',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
        	console.log(data);
        	gradosStore = data.items;
        });
    

    var opcionesStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listOpciones/',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
        	console.log(data);
        	opcionesStore = data;
        }); 
    
    var estimulosStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listEstimulos/',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
           for ( var i in data) {
                 estimulosStore.push({
                       cEstimulo : data[i].cEstimulo,
                     nomEstimulo : data[i].nomEstimulo
                    });
           }           
        }); 
    

	function detalleCategoriafun(){
		categoriasRegistradosNuevo = segundaAsambleaObj.categoriasSegundaAsamblea?segundaAsambleaObj.categoriasSegundaAsamblea:[];
		
		categoriasRegistrados=[];
		

		for (var i in categoriasRegistradosNuevo ){
		if(categoriasRegistradosNuevo[i].cSesion==4){
			categoriasRegistrados.push(categoriasRegistradosNuevo[i]);
		}
		}
		
		if(categoriasRegistrados.length>0)
		{}
	    else{
		categoriasRegistrados=categoriasRegistradosNuevo;
	    }
		
		
		for(var i=0;i<categoriasA.length;i++){
			detalleCategoria = new Array();
			for(var j=0;j<categoriasRegistrados.length;j++){
				
				if(categoriasRegistrados[j].ceActividad == categoriasA[i].idCategoria){
					items = {idObjetivo : categoriasRegistrados[j].idobj,
							 cSesion:categoriasRegistrados[j].cSesion,
            				 meta : categoriasRegistrados[j].meta,
            				 cumplio : categoriasRegistrados[j].cumplio,
            				 fuente:categoriasRegistrados[j].fuente,
            				 monto1:categoriasRegistrados[j].monto1,
                    		 montoStr1:categoriasRegistrados[j].montoStr1,
                    		 monto2:categoriasRegistrados[j].monto2,
                    		 montoStr2:categoriasRegistrados[j].montoStr2
            				 };
					
					detalleCategoria.push(items);
				}
			}
			categoriasA[i].nomActividad = detalleCategoria;
		}
	}
	
	function categoriasFun(){
		categoriasRegistradosNuevo = segundaAsambleaObj.categoriasSegundaAsamblea?segundaAsambleaObj.categoriasSegundaAsamblea:[];

		categoriasRegistrados=[];
		

		for (var i in categoriasRegistradosNuevo ){
		if(categoriasRegistradosNuevo[i].cSesion==4){
			categoriasRegistrados.push(categoriasRegistradosNuevo[i]);
		}
		}
		
		if(categoriasRegistrados.length>0)
		{}
	    else{
		categoriasRegistrados=categoriasRegistradosNuevo;
	    }
		
		for(var i=0;i<categoriasRegistrados.length;i++){
			listaCategorias = categoriasRegistrados[i];

			catObject = {cPrograma:     	categoriasA.length+1,
					     cSesion:listaCategorias.cSesion,
						 idCategoria:   	listaCategorias.ceActividad,
						 nomCategoria:     	listaCategorias.categoria,
						 nomOtraCategoria: listaCategorias.nomOtraCategoria,
                		 objetivo: listaCategorias.actividad,
                		 meta: listaCategorias.meta,
                		 monto1:listaCategorias.monto1,
                		 montoStr1:listaCategorias.montoStr1,
                		 monto2:listaCategorias.monto2,
                		 montoStr2:listaCategorias.montoStr2,
                		 fuente:listaCategorias.fuente,
                		 cumplio:listaCategorias.cumplio
                	
						     };
			
				existeCategoria=0;
				
				for(var j=0;j<categoriasA.length;j++){
					if(categoriasA[j].idCategoria == catObject.idCategoria){
						existeCategoria=1;
						break;
					}
				}
				
				if(existeCategoria==0){
					categoriasA.push( catObject );	
				}    				
		}
	}

    
	function _pestanias(){			   
		   for(var i in listPestanias )
		   {
				 if(registry.byId(listPestanias[i].id)){
					 if(array.indexOf(gActividades,listPestanias[i].idDB)==-1){
						registry.byId('pestanias').closeChild(registry.byId(listPestanias[i].id));
					 }	
				 }
				if(array.indexOf(gActividades,listPestanias[i].idDB)!=-1){
					if(!registry.byId(listPestanias[i].id)){
						   registry.byId('pestanias').addChild(new ContentPane({
					           persist:false,
					           tabStrip:true,
					           title:listPestanias[i].title,
					           id:listPestanias[i].id
					       }));
					}
				}
			}
		}

function despliegaFederales(crea){
		
		if (crea){
			if(!registry.byId(id)){
				if(!registry.byId('1Grid')){
					layout = [[	  { name: 'cPrograma', 					field: 'cPrograma', 		width: '5px',	hidden:true},				                  	  
					           	  { name: 'cSesion', 					field: 'cSesion', 			width: '50px',	hidden:true},
				    		      { name: 'Programa', 					field: 'idPrograma',  		width:'180px',	hidden:true},
				    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', 	hidden:true},
				    		      { name: 'Metas y objetivos', 			field: 'objetivos', 		width: '160px', hidden:true},					    		      					    		      
				    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
				    		      { name: 'Metas Otros', 				field: 'meta', 				width: '160px', hidden:true},
				    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'180px'},					    		      					    		      
				    		      { name: 'Recibido', 						field: 'monto', 			width: '70px'},
				    		      { name: 'Recibido(Letra)', 				field: 'montoStr', 			width: '200px'},
				    		      { name: 'Ejercido', 						field: 'recibido', 			width: '70px'},
				    		      { name: 'Ejercido(Letra)', 				field: 'recibidoStr', 			width: '200px'},
				    		      { name: 'seguimiento', 				field: 'seguimiento', 		width: '160px'},
				    		      { name: 'avance', 					field: 'avance', 			width: '160px'},
				    		      { name: 'Ejercido', 					field: 'ejercido', 			width: '160px', hidden:true},
				    		      { name: 'Ejercido(Letra)',			field: 'ejercidoStr', 		width: '160px', hidden:true}
				    		      
				    		]];
								
				tablaGrid1=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
								'<td width= "450px"><span class="sub" align="left"></span></td>'+								
							'<tr>'+
							'	<td><input id="1Grid"/></td>'+
							'</tr>'+
							'<tr>' +
								'<td>'+
								    '<input id="a_1_1Grid"/>'+
									'<input id="e_1Grid"/>'+				
								'</td>'+								
							'</tr>'+
							'</table>';
				
				dom.byId('progFedPane').innerHTML=tablaGrid1;
				
				progFedSeg = segundaAsambleaObj.federalSeguimiento?segundaAsambleaObj.federalSeguimiento:[];
				
				var dataFedSeg = {
					      identifier: "idPrograma",
					      items: progFedSeg
			    };
							
				new DataGrid({
			        id: '1Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '1Grid').startup();    	   		    	    			
		  								  				
				//Store de federales para seguimiento
				storeFedSeg = new ItemFileWriteStore({data: dataFedSeg});				    
				registry.byId('1Grid').setStore(storeFedSeg);
						
				var fedNvoGrid = registry.byId('1Grid');
		        
		        for ( var i = 0; i < fedNvoGrid.rowCount; i++) {
		               var item = fedNvoGrid.getItem(i);
		               var objetivosSel = [];
		               for(var j in tDetalle){
		                      if(tDetalle[j].idPrograma == item.idPrograma ){
		                             objetivos = {
		                                          idObjetivo : tDetalle[j].idObjetivo,                                                                                     
		                                          meta :                     tDetalle[j].meta
		                                   };
		                             objetivosSel.push(objetivos);
		                      }
		               }                   
		               fedNvoGrid.store.setValue(item, 'objetivos', objetivos);
		        }
				
		    	new Button({
					label : " Informe final ",
					id:'e_1Grid',
					onClick : function() {	
						var index = registry.byId('1Grid').selection.selectedIndex;
						
						if(index!=-1){
							var item = registry.byId('1Grid').getItem(index);
						}else{
			            	 utils.cstmAlert('Debe seleccionar un Programa Federal.');
			            	 return;
			            }

						if( registry.byId('1Grid').store.getValue(item, 'cSesion') == null){
	            			
							var itemToEdit={selectedItem:index,
	                    			cPrograma: registry.byId('1Grid').store.getValue(item, 'cPrograma'), 
	                    			idPrograma: registry.byId('1Grid').store.getValue(item, 'idPrograma'), 
	                    			nomPrograma: registry.byId('1Grid').store.getValue(item, 'nomPrograma'),
	                    			nomOtroPrograma: registry.byId('1Grid').store.getValue(item,'nomOtroPrograma'),
	                    			objetivosSel: item.objetivos,
	                    			objetivo: registry.byId('1Grid').store.getValue(item, 'objetivo'),
	                    			meta: registry.byId('1Grid').store.getValue(item, 'meta'),
	                    			monto: registry.byId('1Grid').store.getValue(item, 'monto'),
	                    			montoStr: registry.byId('1Grid').store.getValue(item, 'montoStr'),
	                    			ejercido : registry.byId('1Grid').store.getValue(item, 'recibido'),
		                            ejercidoTxt : registry.byId('1Grid').store.getValue(item, 'recibidoStr'),
		                            seguimiento : registry.byId('1Grid').store.getValue(item, 'seguimiento'),
		                            avance : registry.byId('1Grid').store.getValue(item, 'avance')
	                    			};    
							
							funFederal(itemToEdit);
						} else
						{
							var cSesion = registry.byId('1Grid').store.getValue(item, 'cSesion');
							var cPrograma = registry.byId('1Grid').store.getValue(item, 'idPrograma');                 	                  
		                    var seguimiento = registry.byId('1Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('1Grid').store.getValue(item, 'avance');
		                    var recibido = registry.byId('1Grid').store.getValue(item, 'monto');
		                    var recibidoTxt = registry.byId('1Grid').store.getValue(item, 'montoStr');
		                    var ejercido = registry.byId('1Grid').store.getValue(item, 'recibido');
		                    var ejercidoTxt = registry.byId('1Grid').store.getValue(item, 'recibidoStr');
		                                 			 
	            			
							var itemToEdit={selectedItem:index,
									cSesion: cSesion,
			            			cPrograma: cPrograma,
			            			seguimiento: seguimiento,
			            			avance: avance,
			            			recibido: recibido,
			            			recibidoTxt: recibidoTxt,
			            			ejercido: ejercido,
			            			ejercidoTxt: ejercidoTxt
			            			};
							
							seguimientoFederal(itemToEdit,1);
						}		            	
					}
				}, 'e_1Grid');
		    	    	
		    	new Button({
					label : " Agregar ",
					id:'a_1_1Grid',
					onClick : function() {					
						//seguimientoFederal(null,1);
						funFederal();
					}
				}, 'a_1_1Grid');
		    	
//		    	new Button({
//					label : " Eliminar",
//					id: 'd_1_1Grid',
//					onClick : function() {
//						eliminaRow(registry.byId('1_1Grid'));
//					}
//				}, 'd_1_1Grid');
//		    	
		}
		}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}

	function despliegaEstatales(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('2Grid')){
					layout = [[	  { name: 'cPrograma', 					field: 'cPrograma', 		width: '5px',	hidden:true},
					           	  { name: 'cSesion', 					field: 'cSesion', 			width: '50px',	hidden:true},
				    		      { name: 'Programa', 					field: 'idPrograma',  		width:'180px',	hidden:true},
				    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', 	hidden:true},
				    		      { name: 'Metas y objetivos', 			field: 'objetivos', 		width: '160px', hidden:true},					    		      					    		      
				    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
				    		      { name: 'Metas Otros', 				field: 'meta', 				width: '160px', hidden:true},
				    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'180px'},					    		      					    		      
				    		      { name: 'Recibido', 						field: 'monto', 			width: '70px'},
				    		      { name: 'Recibido(Letra)', 				field: 'montoStr', 			width: '200px'},
				    		      { name: 'Ejercido', 						field: 'recibido', 			width: '70px'},
				    		      { name: 'Ejercido(Letra)', 				field: 'recibidoStr', 			width: '200px'},
				    		      { name: 'seguimiento', 				field: 'seguimiento', 		width: '160px'},
				    		      { name: 'avance', 					field: 'avance', 			width: '160px'},
				    		]];
						
				tablaGrid1=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
								
								'<td width= "450px"><span class="sub" align="left"></span></td>'+
							'<tr>'+
							'	<td><input id="2Grid"/></td>'+							
							'</tr>'+
							'<tr>' +
								'<td>'+
									'<input id="a_2_1Grid"/>'+
									'<input id="e_2Grid"/>'+
								'</td>'+
							'</tr>'+
							'</table>';
				
				dom.byId('progEstPane').innerHTML=tablaGrid1;
				
				progEstSeg = segundaAsambleaObj.estatalSeguimiento?segundaAsambleaObj.estatalSeguimiento:[];
				
				var dataEstSeg = {
					      identifier: "idPrograma",
					      items: progEstSeg
			    };
							
				new DataGrid({
			        id: '2Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '2Grid').startup();    	   		    	    			
		  									    	
				//Store de federales para seguimiento
				storeEstSeg = new ItemFileWriteStore({data: dataEstSeg});				    
				registry.byId('2Grid').setStore(storeEstSeg);
								
				var gridEstatal = registry.byId('2Grid');
				
				for ( var i = 0; i < gridEstatal.rowCount; i++) {
					var item = gridEstatal.getItem(i);
					idPrograma= gridEstatal.store.getValue(item,'idPrograma');
					for(var j in tDetalle){
						if(tDetalle[j].idPrograma == idPrograma){		         	
							gridEstatal.store.setValue(item, 'meta', tDetalle[j].meta);
							gridEstatal.store.setValue(item, 'objetivo', tDetalle[j].objetivo);	
							break;
						}
			         }
				}
				
				new Button({
					label : " Informe final ",
					id:'e_2Grid',
					onClick : function() {		
						var index = registry.byId('2Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('2Grid').getItem(index);
		                    var cPrograma = registry.byId('2Grid').store.getValue(item, 'idPrograma');
		                    var seguimiento = registry.byId('2Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('2Grid').store.getValue(item, 'avance');
		                    var monto = registry.byId('2Grid').store.getValue(item, 'monto');
		                    var objetivoPrograma= registry.byId('2Grid').store.getValue(item, 'objetivo');
	            			var meta= registry.byId('2Grid').store.getValue(item, 'meta');
	            			var nomOtroPrograma= registry.byId('2Grid').store.getValue(item,'nomOtroPrograma');
		                    var montoStr = registry.byId('2Grid').store.getValue(item, 'montoStr');
		                    var montoEjercido = registry.byId('2Grid').store.getValue(item, 'recibido');
		                    var montoEjercidoStr = registry.byId('2Grid').store.getValue(item, 'recibidoStr');
		                    
						}else{
			            	 utils.cstmAlert('Debe seleccionar un Programa Estatal.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance,
		            			monto: monto,
		            			meta:meta,
		            			objetivo:objetivoPrograma,
		            			nomOtroPrograma:nomOtroPrograma,
		            			montoStr: montoStr,
		            			montoEjercido: montoEjercido,
		            			montoEjercidoStr: montoEjercidoStr
		            			};
					
						seguimientoEstatalMunicipalOSC(2,itemToEdit,1);
					}							
				}, 'e_2Grid');
		    	
		    	
		    	new Button({
					label : " Agregar ",
					id:'a_2_1Grid',
					onClick : function() {					
						seguimientoEstatalMunicipalOSC(2, null, 1);
				}}, 'a_2_1Grid');
		    			    	
//		    	new Button({
//					label : " Eliminar",
//					id: 'd_2_1Grid',
//					onClick : function() {			
//						eliminaRow(registry.byId('2_1Grid'));
//					}
//				}, 'd_2_1Grid');
		    	        	
				}
			}
		}	
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
		
	}

	function despliegaMunicipales(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('3Grid')){
					layout = [[	  { name: 'cPrograma', 					field: 'cPrograma', 		width: '5px',	hidden:true},
					           	  { name: 'cSesion', 					field: 'cSesion', 			width: '50px',	hidden:true},
				    		      { name: 'Programa', 					field: 'idPrograma',  		width:'180px',	hidden:true},
				    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', 	hidden:true},
				    		      { name: 'Metas y objetivos', 			field: 'objetivos', 		width: '160px', hidden:true},					    		      					    		      
				    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
				    		      { name: 'Metas Otros', 				field: 'meta', 				width: '160px', hidden:true},
				    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'180px'},					    		      					    		      
				    		      { name: 'Monto', 						field: 'monto', 			width: '70px'},
				    		      { name: 'Monto(Letra)', 				field: 'montoStr', 			width: '200px'},
				    		      { name: 'Ejercido', 					field: 'recibido', 	width: '70px'},
				    		      { name: 'Ejercido(Letra)', 			field: 'recibidoStr', 	width: '200px'},
				    		      { name: 'seguimiento', 				field: 'seguimiento', 		width: '160px', hidden:true},
				    		      { name: 'avance', 					field: 'avance', 			width: '160px', hidden:true}
				    		]];
				
				tablaGrid1=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
								
								'<td width= "450px"><span class="sub" align="left"></span></td>'+
							'<tr>'+
							'	<td><input id="3Grid"/></td>'+
							'</tr>'+
							'<tr>' +
								'<td>'+
									'<input id="a_3_1Grid"/>'+
									'<input id="e_3Grid"/>'+
								'</td>'+
							'</tr>'+
							'</table>';
				
				dom.byId('progLocPane').innerHTML=tablaGrid1;

				progMunSeg = segundaAsambleaObj.municipalSeguimiento?segundaAsambleaObj.municipalSeguimiento:[];
						
				var dataMunSeg = {
					      identifier: "idPrograma",
					      items: progMunSeg
			    };
							
				new DataGrid({
			        id: '3Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '3Grid').startup();    	   		    	    			
		  									    	
				//Store de federales para seguimiento
				storeMunSeg = new ItemFileWriteStore({data: dataMunSeg});				    
				registry.byId('3Grid').setStore(storeMunSeg);
										
				
				var gridMun = registry.byId('3Grid');
				
				for ( var i = 0; i < gridMun.rowCount; i++) {
					var item = gridMun.getItem(i);
					idPrograma= gridMun.store.getValue(item,'idPrograma');
					for(var j in tDetalle){
						if(tDetalle[j].idPrograma == idPrograma){		         	
							gridMun.store.setValue(item, 'meta', tDetalle[j].meta);
							gridMun.store.setValue(item, 'objetivo', tDetalle[j].objetivo);	
							break;
						}
			         }
				}
				
		    	new Button({
					label : " Informe final ",
					id:'e_3Grid',
					onClick : function() {	
						var index = registry.byId('3Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('3Grid').getItem(index);
		                    var cPrograma = registry.byId('3Grid').store.getValue(item, 'idPrograma');
		                    var seguimiento = registry.byId('3Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('3Grid').store.getValue(item, 'avance');
		                    var monto = registry.byId('3Grid').store.getValue(item, 'monto');
		                    var objetivoPrograma= registry.byId('3Grid').store.getValue(item, 'objetivo');
	            			var meta= registry.byId('3Grid').store.getValue(item, 'meta');
	            			var nomOtroPrograma= registry.byId('3Grid').store.getValue(item,'nomOtroPrograma');
		                    var montoStr = registry.byId('3Grid').store.getValue(item, 'montoStr');
		                    var montoEjercido = registry.byId('3Grid').store.getValue(item, 'recibido');
		                    var montoEjercidoStr = registry.byId('3Grid').store.getValue(item, 'recibidoStr');

						}else{
			           	     utils.cstmAlert('Debe seleccionar un Programa Municipal.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance,
		            			monto: monto,
		            			meta:meta,
		            			objetivo:objetivoPrograma,
		            			nomOtroPrograma:nomOtroPrograma,
		            			montoStr: montoStr,
	            				montoEjercido: montoEjercido,
		            			montoEjercidoStr: montoEjercidoStr
		            			};
						
						seguimientoEstatalMunicipalOSC(3,itemToEdit,1);
					}							
				}, 'e_3Grid');
		    	    	
		    	new Button({
					label : " Agregar ",
					id:'a_3_1Grid',
					onClick : function() {					
						seguimientoEstatalMunicipalOSC(3,null,1);
					}
				}, 'a_3_1Grid');
		    		    	
//		    	new Button({
//					label : " Eliminar",
//					id: 'd_3_1Grid',
//					onClick : function() {
//						eliminaRow(registry.byId('3_1Grid'));
//					}
//				}, 'd_3_1Grid');
		    			        	
	}	
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}

	function despliegaOsc(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('4Grid')){
					layout = [[	  { name: 'cPrograma', 					field: 'cPrograma', 		width: '5px',	hidden:true},
					           	  { name: 'cSesion', 					field: 'cSesion', 			width: '50px',	hidden:true},
				    		      { name: 'Programa', 					field: 'idPrograma',  		width:'180px',	hidden:true},
				    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', 	hidden:true},
				    		      { name: 'Metas y objetivos', 			field: 'objetivos', 		width: '160px', hidden:true},					    		      					    		      
				    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
				    		      { name: 'Metas Otros', 				field: 'meta', 				width: '160px', hidden:true},
				    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'180px'},					    		      					    		      
				    		      { name: 'Monto', 						field: 'monto', 			width: '70px'},
				    		      { name: 'Monto(Letra)', 				field: 'montoStr', 			width: '200px'},
				    		      { name: 'Ejercido', 					field: 'recibido', 	width: '70px'},
				    		      { name: 'Ejercido(Letra)', 			field: 'recibidoStr', 	width: '200px'},
				    		      { name: 'seguimiento', 				field: 'seguimiento', 		width: '160px', hidden:true},
				    		      { name: 'avance', 					field: 'avance', 			width: '160px', hidden:true}
				    		]];
				
				tablaGrid1=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
								
								'<td width= "450px"><span class="sub" align="left"></span></td>'+
							'<tr>'+
							'	<td><input id="4Grid"/></td>'+
							'</tr>'+
							'<tr>' +
								'<td>'+
								    '<input id="a_4_1Grid"/>'+
									'<input id="e_4Grid"/>'+
								'</td>'+
							'</tr>'+
							'</table>';
				
				dom.byId('proyOSCPane').innerHTML=tablaGrid1;

				progOscSeg = segundaAsambleaObj.oscSeguimiento?segundaAsambleaObj.oscSeguimiento:[];
				
				var dataOscSeg = {
					      identifier: "idPrograma",
					      items: progOscSeg
			    };
							
				new DataGrid({
			        id: '4Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '4Grid').startup();    	   		    	    			
		  					
				//Store de federales para seguimiento
				storeOscSeg = new ItemFileWriteStore({data: dataOscSeg});				    
				registry.byId('4Grid').setStore(storeOscSeg);
					
				var gridOsc = registry.byId('4Grid');
				
				for ( var i = 0; i < gridOsc.rowCount; i++) {
					var item = gridOsc.getItem(i);
					idPrograma= gridOsc.store.getValue(item,'idPrograma');
					for(var j in tDetalle){
						if(tDetalle[j].idPrograma == idPrograma){		         	
							gridOsc.store.setValue(item, 'meta', tDetalle[j].meta);
							gridOsc.store.setValue(item, 'objetivo', tDetalle[j].objetivo);	
							break;
						}
			         }
				}
				
				
		    	new Button({
					label : " Informe final ",
					id:'e_4Grid',
					onClick : function() {	
						var index = registry.byId('4Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('4Grid').getItem(index);
		                    var cPrograma = registry.byId('4Grid').store.getValue(item, 'idPrograma');
		                    var seguimiento = registry.byId('4Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('4Grid').store.getValue(item, 'avance');
		                    var monto = registry.byId('4Grid').store.getValue(item, 'monto');
		                    var objetivoPrograma= registry.byId('4Grid').store.getValue(item, 'objetivo');
	            			var meta= registry.byId('4Grid').store.getValue(item, 'meta');
	            			var nomOtroPrograma= registry.byId('4Grid').store.getValue(item,'nomOtroPrograma');
		                    var montoStr = registry.byId('4Grid').store.getValue(item, 'montoStr');
		                    var montoEjercido = registry.byId('4Grid').store.getValue(item, 'recibido');
		                    var montoEjercidoStr = registry.byId('4Grid').store.getValue(item, 'recibidoStr');

						}else{
			            	 utils.cstmAlert('Debe seleccionar un Programa OSC.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance,
		            			monto: monto,
		            			meta:meta,
		            			objetivo:objetivoPrograma,
		            			nomOtroPrograma:nomOtroPrograma,
		            			montoStr: montoStr,
		            			montoEjercido: montoEjercido,
		            			montoEjercidoStr: montoEjercidoStr
		            			};
						
						seguimientoEstatalMunicipalOSC(4,itemToEdit,1);
					}							
				}, 'e_4Grid');
		    	    	
		    	new Button({
					label : " Agregar ",
					id:'a_4_1Grid',
					onClick : function() {					
						seguimientoEstatalMunicipalOSC(4,null,1);
					}
				}, 'a_4_1Grid');
		    		    	
//		    	new Button({
//					label : " Eliminar",
//					id: 'd_4_1Grid',
//					onClick : function() {					
//						eliminaRow(registry.byId('4_1Grid'));
//					}
//				}, 'd_4_1Grid');		    		        	
				}	
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}

	function despliegaRecursos(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('rGrid')){
    	layout0 = [[	  { name: 'idRecurso', field: 'cParticipacion', width: '5px',hidden:true},
		    		  { name: 'Formas de participaci\u00f3n', field: 'descripcion',  width:'310px'},
		    		  { name: 'En el caso de programas federales', field: 'rprogramaFederales',  width:'123px'},
		    		  { name: 'En el caso de programas estatales', field: 'rprogramaEstatales',  width:'129px'},
		    		  { name: 'En el caso de programas municipales', field: 'rprogramaMunicipales',  width:'133px'},
		    		  { name: 'En el caso de programas OSC', field: 'rprogramaOsc',  width:'125px'},
		    		  { name: 'En el caso de programas federales', field: 'tprogramaFederales',  width:'123px',hidden:true},
		    		  { name: 'En el caso de programas estatales', field: 'tprogramaEstatales',  width:'129px',hidden:true},
		    		  { name: 'En el caso de programas municipales', field: 'tprogramaMunicipales',  width:'133px',hidden:true},
		    		  { name: 'En el caso de programas OSC', field: 'tprogramaOsc',  width:'125px',hidden:true}
		         ]];
		
    	layout = [[	  { name: 'idRecurso', field: 'cParticipacion', width: '5px',hidden:true},
		    		  { name: 'Formas de participaci\u00f3n', field: 'descripcion',  width:'310px'},
		    		  { name: 'Toma decisiones y administra los recursos conjuntamente con el director del plantel', field: 'rprogramaFederales',  width:'123px'},
		    		  { name: 'S\u00f3lo recibe informaci\u00f3n por parte del director del plantel acerca de los recursos que le asignan a la escuela, pero no interviene en su administraci\u00f3n y seguimiento.', field: 'rprogramaEstatales',  width:'129px'},
		    		  { name: 'El CEPS  tiene conocimiento acerca de los recursos que le asignan al plantel', field: 'rprogramaMunicipales',  width:'133px'},
		    		  { name: 'Recibe la escuela recursos de programas', field: 'rprogramaOsc',  width:'125px'},
		    		  { name: 'En el caso de programas federales', field: 'tprogramaFederales',  width:'123px',hidden:true},
		    		  { name: 'En el caso de programas estatales', field: 'tprogramaEstatales',  width:'129px',hidden:true},
		    		  { name: 'En el caso de programas municipales', field: 'tprogramaMunicipales',  width:'133px',hidden:true},
		    		  { name: 'En el caso de programas OSC', field: 'tprogramaOsc',  width:'125px',hidden:true}
		         ]];
    	
//		var data = {
//			      identifier: "idRecurso",
//			      items: []
//			    };
//		
//		var items= new Array(	{id: 1, forma:"a)	Toma decisiones y administra los recursos conjuntamente con el director del plantel", federales:'SI', estatales:'NO', municipales:'NO', osc:'SI' },
//								{id: 2, forma:"b)	S\u00f3lo recibe informaci\u00f3n por parte del director del plantel acerca de los recursos que le asignan a la escuela, pero no interviene en su administraci\u00f3n y seguimiento.", federales:'NO', estatales:'SI', municipales:'SI', osc:'NO' },
//								{id: 3, forma:"c)	No tiene conocimiento acerca de los recursos que le asignan al plantel.", federales:'NO', estatales:'SI', municipales:'NO', osc:'SI' },
//								{id: 4, forma:"d)	La escuela no recibe recursos de programas", federales:'SI', estatales:'NO', municipales:'NO', osc:'SI' }								
//							 );
//		
//		var data = {
//				identifier:"id",
//				items: items
//		};
		
    	var itemsTmp= new Array(	{cParticipacion: 1, descripcion:"En el caso de programas federales", federales:'SI', estatales:'NO', municipales:'NO', osc:'SI' },
				{cParticipacion: 2, descripcion:"En el caso de programas estatales", federales:'NO', estatales:'SI', municipales:'SI', osc:'NO' },
				{cParticipacion: 3, descripcion:"En el caso de programas municipales", federales:'NO', estatales:'SI', municipales:'NO', osc:'SI' },
				{cParticipacion: 4, descripcion:"En el caso de programas OSC", federales:'SI', estatales:'NO', municipales:'NO', osc:'SI' }								
			 );
    			
		progRec = segundaAsambleaObj.programaRecursos?segundaAsambleaObj.programaRecursos:[];
		
		for(var i in progRec){
			progRec[i].descripcion = progRec[i].cParticipacion==1?"En el caso de programas federales":progRec[i].cParticipacion==2?"En el caso de programas estatales":progRec[i].cParticipacion==3?"En el caso de programas municipales":progRec[i].cParticipacion==4?"En el caso de programas OSC":"";
			progRec[i].rprogramaFederales = progRec[i].tprogramaFederales==1?"SI":progRec[i].tprogramaFederales==2?"NO":"";
			progRec[i].rprogramaEstatales = progRec[i].tprogramaEstatales==1?"SI":progRec[i].tprogramaEstatales==2?"NO":"";
			progRec[i].rprogramaMunicipales = progRec[i].tprogramaMunicipales==1?"SI":progRec[i].tprogramaMunicipales==2?"NO":"";
			progRec[i].rprogramaOsc = progRec[i].tprogramaOsc==1?"SI":progRec[i].tprogramaOsc==2?"NO":"";
		}
		
		var dataRec = {
			      identifier: "cParticipacion",
			      items: progRec
	    };
		
		var jsonStore = new ItemFileWriteStore({data: dataRec});
			
		tablaGrid1=	'<table border="0" align="left" width= "900px">'+
					'<tr>' +
						'<td width= "450px"><span class="sub" align="left">\u00BFC\u00f3mo participa el Consejo Escolar en el manejo de los recursos econ\u00f3micos y materiales que recibe la escuela por parte de los programas educativos?</span></td>'+
					'<tr>'+
					'	<td><input id="rGrid"/></td>'+
					'</tr>'+
					'<tr>' +
						'<td>'+
							'<input id="e_rGrid"/>'+
						'</td>'+
					'</tr>'+
					'</table>';
		
		dom.byId('recursosPane').innerHTML=tablaGrid1;
		
		new DataGrid({
	        id: 'rGrid',
	        structure: layout,
	        store:jsonStore,
	        rowSelector: '10px',
	        height: '280px',
			width: '450px'
        }, 'rGrid').startup();    	   		    	    			
  							    	
    	new Button({
			label : " Editar participaci\u00f3n",
			id:'e_rGrid',
			onClick : function() {	
				var index = registry.byId('rGrid').selection.selectedIndex;    											
				if(index!=-1){												
					var item = registry.byId('rGrid').getItem(index);
									
					var itemToEdit={selectedItem:index,
							cParticipacion: registry.byId('rGrid').store.getValue(item, 'cParticipacion'),
							descripcion: registry.byId('rGrid').store.getValue(item, 'descripcion'),
							tprogramaFederales: registry.byId('rGrid').store.getValue(item, 'tprogramaFederales'),
							tprogramaEstatales: registry.byId('rGrid').store.getValue(item, 'tprogramaEstatales'),
							tprogramaMunicipales: registry.byId('rGrid').store.getValue(item, 'tprogramaMunicipales'),
							tprogramaOsc: registry.byId('rGrid').store.getValue(item, 'tprogramaOsc'),
							rprogramaFederales: registry.byId('rGrid').store.getValue(item, 'rprogramaFederales'),
							rprogramaEstatales: registry.byId('rGrid').store.getValue(item, 'rprogramaEstatales'),
							rprogramaMunicipales: registry.byId('rGrid').store.getValue(item, 'rprogramaMunicipales'),
							rprogramaOsc: registry.byId('rGrid').store.getValue(item, 'rprogramaOsc')
	                    			
	                    			};    	                    	
                	editaParticipacionRecurso(itemToEdit);
                  
				} else{
	            	 utils.cstmAlert(
						'Debe seleccionar solo un registro.');
	             }					
			}
		}, 'e_rGrid');
    	    	    	
	}	
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}
	function despliegaAcciones(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('5Grid')){
    	layout = [[	  { name: 'indAccion', field: 'idAccion', width: '5px',hidden:true},
	    		      { name: 'Acci\u00F3n para coadyuvar con el cumplimiento de la planeaci\u00F3n anual', field: 'accion',  width:'205px'},
	    		      { name: 'Acci\u00F3n para coadyuvar con el cumplimiento de las recomendaciones del consejo t\u00E9cnico', field: 'recomendacion',  width:'350px'},
	    		      { name: 'tipo de accion en seguimiento', field: 'avanceAccion',  width:'350px',hidden:true},
	    		      { name: 'tipo de recomendacion en seguimiento', field: 'avanceRecomendacion',  width:'350px',hidden:true}
    		      ]];
		
		tablaGrid1=	'<table border="0" align="left" width= "900px">'+
					'<tr>' +
						'<td width= "450px"><span class="sub" align="left"></span></td>'+
					'<tr>'+
					'	<td><input id="5Grid"/></td>'+
					'</tr>'+
					'<tr>' +
						'<td>'+
							'<input id="e_5Grid"/>'+
						'</td>'+
					'</tr>'+
					'</table>';
		
		dom.byId('accionPane').innerHTML=tablaGrid1;

		progAccSeg4 = segundaAsambleaObj.acciones?segundaAsambleaObj.acciones:[];
		
		progAccSeg = [];
		
		for(var i in progAccSeg4){
			if(progAccSeg4[i].cSesion==4){
				progAccSeg.push(progAccSeg4[i]);
			}
		}
		
		if(progAccSeg.length <= 0)
		{
			progAccSeg = progAccSeg4;
		}
		
		var dataAccSeg = {
			      identifier: "idAccion",
			      items: progAccSeg
	    };
			
		new DataGrid({
	        id: '5Grid',
	        structure: layout,
	        rowSelector: '10px',
	        height: '300px',
			width: '450px'
        }, '5Grid').startup();    	   		    	    			
  		
		//Store de federales para seguimiento
		storeAccSeg = new ItemFileWriteStore({data: dataAccSeg});				    
		registry.byId('5Grid').setStore(storeAccSeg);
				
    	new Button({
			label : " Editar acci&#243;n",
			id:'e_5Grid',
			onClick : function() {	
			var index = registry.byId('5Grid').selection.selectedIndex;    											
			if(index!=-1){												
				var item = registry.byId('5Grid').getItem(index);
						
				var itemToEdit={selectedItem:index,
						idAccion: registry.byId('5Grid').store.getValue(item, 'idAccion'),
						accion: registry.byId('5Grid').store.getValue(item, 'accion'),
						recomendacion: registry.byId('5Grid').store.getValue(item, 'recomendacion'),
						avanceAccion: registry.byId('5Grid').store.getValue(item, 'avanceAccion'),
						avanceRecomendacion: registry.byId('5Grid').store.getValue(item, 'avanceRecomendacion')
                    			
                    			};    	                    					              
			} else{
            	 utils.cstmAlert('Debe seleccionar solo un registro.');
            	 return;
             }	
			seguimientoAccion(itemToEdit);
		}
	}, 'e_5Grid');
    	    	    	
	}		
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}

	function despliegaNormalidad(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('nGrid')){
	    	layout = [[	  { name: 'idNormalidad', field: 'cNormalidad', width: '5px',hidden:true},
			    		  { name: 'NORMALIDAD M\u00cdNIMA QUE SE DEBE CUMPLIR EN EL CENTRO ESCOLAR', field: 'descripcion',  width:'310px'},
			    		  { name: 'EVALUACI\u00D3N FINAL', field: 'opcionNunca',  width:'310px'},
			    		  { name: 'NUNCA', field: 'opcionNunca',  width:'123px',hidden:true},
			    		  { name: 'CASI NUNCA', field: 'opcionCasiNunca',  width:'129px',hidden:true},
			    		  { name: 'CASI SIEMPRE', field: 'opcionCasiSiempre',  width:'133px',hidden:true},
			    		  { name: 'SIEMPRE', field: 'opcionSiempre',  width:'125px',hidden:true}
			         ]];
				
			var items= new Array(	{id: 1, normalidad:"Nuestra escuela brinda el servicio educativo durante todos los d\u00edas establecidos en el calendario escolar.", nunca:'SI', casiNunca:'NO', casiSiempre:'NO', siempre:'NO' },
									{id: 2, normalidad:"Todos los grupos tienen maestros todos los d\u00edas del ciclo escolar.", nunca:'NO', casiNunca:'NO', casiSiempre:'NO', siempre:'SI' },
									{id: 3, normalidad:"Todos los maestros inician puntualmente sus actividades.", nunca:'NO', casiNunca:'NO', casiSiempre:'SI', siempre:'NO' },
									{id: 4, normalidad:"Todos los alumnos asisten puntualmente a todas las clases.", nunca:'SI', casiNunca:'NO', casiSiempre:'NO', siempre:'NO' },
									{id: 5, normalidad:"Todos los materiales est\u00e1n a disposici\u00f3n de cada estudiante y se usan sistem\u00e1ticamente.", nunca:'NO', casiNunca:'NO', casiSiempre:'SI', siempre:'NO' },
									{id: 6, normalidad:"Todo el tiempo escolar se ocupa fundamentalmente en actividades de aprendizaje.", nunca:'NO', casiNunca:'NO', casiSiempre:'NO', siempre:'SI' },
									{id: 7, normalidad:"Las actividades en las aulas logran que todos los alumnos participen activamente en el trabajo de la clase.", nunca:'NO', casiNunca:'NO', casiSiempre:'NO', siempre:'NO' },
									{id: 8, normalidad:"Todos los alumnos consolidan su dominio de la lectura, la escritura y las matem\u00e1ticas de acuerdo con su grado educativo.", nunca:'NO', casiNunca:'NO', casiSiempre:'SI', siempre:'NO' }
								 );
						
			tablaGrid1=	'<table border="0" align="left" width= "900px">'+
						'<tr><td>'+ 
						   '	<p> <b>\u00BFSe cumpli\u00f3 con el calendario escolar presentado en la primera sesi\u00f3n por el director de la escuela o quien ejerce la funci\u00f3n directiva?</b></p>'+
						   '	<input id="pregunta3a"/><label for="pregunta3a">S\u00ed </label>'+ 
						   '	<br/><input id="pregunta3b"/><label for="pregunta3b">No. Solicite al director escolar o quien ejerce la funci\u00f3n directiva que d\u00e9 a conocer el tema y proceda a su evaluaci\u00f3n. </label>'+
						'</td></tr>'+
						'	<td><input id="nGrid"/></td>'+
						'</tr>'+
						'<tr>' +
							'<td>'+
								'<input id="e_nGrid"/>'+
							'</td>'+
						'</tr>'+
						'</table>';
			  
			   
			   
			dom.byId('normalidadPane').innerHTML=tablaGrid1;
			
progNormal4 = segundaAsambleaObj.normalidad?segundaAsambleaObj.normalidad:[];
			
			for(var i in progNormal4){
				progNormal4[i].opcionNunca = progNormal4[i].opcionNunca; //?"SI":progNormal[i].opcionNunca==2?"NO":"";
//				progNormal[i].opcionCasiNunca = progNormal[i].opcionCasiNunca==1?"SI":progNormal[i].opcionCasiNunca==2?"NO":"";
//				progNormal[i].opcionCasiSiempre = progNormal[i].opcionCasiSiempre==1?"SI":progNormal[i].opcionCasiSiempre==2?"NO":"";
//				progNormal[i].opcionSiempre = progNormal[i].opcionSiempre==1?"SI":progNormal[i].opcionSiempre==2?"NO":"";
			}
			
			progNormal = [];
			
			for(var i in progNormal4){
				if(progNormal4[i].cSesion==4){
					progNormal.push(progNormal4[i]);
				}
			}
			
			if(progNormal.length <= 0)
			{
				progNormal = progNormal4;
			}
			
			var dataNormalidad = {
				      identifier: "cNormalidad",
				      items: progNormal
		    };
			
			new DataGrid({
		        id: 'nGrid',
		        structure: layout,
		        rowSelector: '10px',
		        height: '280px',
				width: '450px'
	        }, 'nGrid').startup();    	   		    	    			
	  		
			//Store de federales para seguimiento
			storeNormalidad = new ItemFileWriteStore({data: dataNormalidad});				    
			registry.byId('nGrid').setStore(storeNormalidad);
			
			 var pregunta3a= new RadioButton({
		           checked:segundaAsambleaObj.preguntas2==null?true: segundaAsambleaObj.preguntas2.respuesta3==1 ? true:false,
		           value: "1",
		           name: "pregunta3",
		           id:"pregunta3a"
		       }, "pregunta3a");
			   
			  var pregunta3b=new RadioButton({
		           checked:segundaAsambleaObj.preguntas2==null?false: segundaAsambleaObj.preguntas2.respuesta3==2 ? true:false,
		           value: "2",
		           name: "pregunta3",
		           id:"pregunta3b"
		       }, "pregunta3b");
			
			
	    	new Button({
				label : " Editar normalidad",
				id:'e_nGrid',
				onClick : function() {		
					
					var index = registry.byId('nGrid').selection.selectedIndex;    											
					
		        	if(index!=-1){
						var item = registry.byId('nGrid').getItem(index);
					}else{
		            	 utils.cstmAlert('Debe seleccionar solo un registro.');
		            	 return;
		            } 
					
					                                                                             
		              if(index!=-1){
		                     var item = registry.byId('nGrid').getItem(index);
		                     var itemToEdit={selectedItem:index,
		                    		 descripcion: registry.byId('nGrid').store.getValue(item, 'descripcion'), 	                    		 		
		                    		 opcionNunca: registry.byId('nGrid').store.getValue(item, 'opcionNunca')
//		                    		 opcionCasiNunca: registry.byId('nGrid').store.getValue(item, 'opcionCasiNunca'),
//		                    		 opcionCasiSiempre: registry.byId('nGrid').store.getValue(item, 'opcionCasiSiempre'),
//		                    		 opcionSiempre: registry.byId('nGrid').store.getValue(item, 'opcionSiempre'),
		                     				};
		              }	  
					editarNormalidad(itemToEdit);
				}
			}, 'e_nGrid');
	    	    	    	
		}	
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}

	function editarNormalidad(itemToEdit){
		var edit=false;
	    if(!itemToEdit){
		   itemToEdit={descripcion: "",opcionNunca: "",opcionCasiNunca:'',opcionCasiSiempre:'',opcionSiempre:''};
	    }else{
		   edit=true;
	    }
		var title ='Normalidad';
    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
    	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    jsUtils.createTag('div','prCnt','dcDetail');
		    
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
								   '<tr><td>'+
								   '	<b>*Normalidad: </b><div id="normalidad" /><br/>'+
								   '</td></tr>'+
	    						   '<tr><td>'+
				    			   '	<b>*Cumplimiento de la normalidad: </b><div id="labelSlider" /><br/>'+
				    			   '</td></tr>'+					    			   
				    			   '<tr><td><div id="vertSlider"/>'+
				    			   '</td></tr>'+
				    			   '<tr><td><div id="vertLSlider"/>'+
				    			   '</td></tr>'+
				    			   '<tr><td  height="30">'+
				    			   '</td></tr>'+
				    			   '<tr style="display:none"><td><div id="prSelect"/>'+
				    			   '</td></tr>'+
				    			   '</table>'; 
	    	    
	    //---------------------------------- Datos	        
	    var data=[{name:"[Seleccione]",	id:"0"},
	              {name:"Nunca",	id:"1"},
	              {name:"Casi Nunca",	id:"2"},
	              {name:"Casi Siempre",	id:"3"},
	              {name:"Siempre",	id:"4"}];
    		    	   
	    var pStore = new Memory({
	        data: data
	    });
	    	    
	    idSeleccion = 0;
	    if(edit){
	    	idSeleccion = itemToEdit.opcionNunca=="SI"?1:
	    		          itemToEdit.opcionCasiNunca=="SI"?2:
	    		          itemToEdit.opcionCasiSiempre=="SI"?3:
	    		          itemToEdit.opcionSiempre=="SI"?4:0;
	    }
	    //---------------------------------- Dojo
	    
	    var vertLSlider = new HorizontalRuleLabels({
			container: "topDecoration",
			labelStyle: "font-style: italic; font-size: 0.75em",
			labels: ["0","1","2","3","4","5","6","7","8","9","10"],
			style: "width: 360px;margin:0px 0px 0px 20px;"
		}, "vertLSlider");
	    	    
	    var valorRule = itemToEdit.opcionNunca==null?0:itemToEdit.opcionNunca;	    	    
	    
	    vertSlider = new HorizontalSlider({
	    	  container: "topDecoration",
	    	  minimum: 0,
	    	  maximum: 10,
	    	  value: valorRule,
	    	  count: 10,
	    	  discreteValues: 11,	    	  
	    	  style: "height: 5px;width: 400px;",
	    	  onChange: function(){
	    		  valorRule = vertSlider.get("value");
	    		  registry.byId('labelSlider').set('value',valorRule);
	    	  }
	    	}, "vertSlider");

	    var labelSlider = new ValidationTextBox({	           	            
	           trim:"true",
	           readOnly:true,
	           uppercase: true,
	           value: valorRule,
	           maxLength:"50",
	           style:"width:50px"
	        }, 'labelSlider');
	    
		// Update label right away
		//updateHorizontalLabel();
		
        // Start up the widget
        vertSlider.startup();

	    var prSelect = new FilteringSelect({
           id: 'prSelect',
           value:idSeleccion,
           store: pStore,
           //readOnly:true,
           searchAttr: 'name'
        }, 'prSelect');
		    		   		   
	    var normalidad = new ValidationTextBox({
           promptMessage:"Normalidad",
           value:itemToEdit.descripcion, 
           trim:"true",
           readOnly:true,
           uppercase: true,
           maxLength:"250",
           style:"width:480px"
        }, 'normalidad');
		   					  	    				
	    //------------------------------------
	    jsUtils.createTag('div','prBtnAceptar','dcDetail');
		   			    
	    new Button({
    				label : " Aceptar ",
    				onClick : function() {
    					
    					var grid; 
//    					nunca="NO";
//    					casiNunca="NO";
//    					casiSiempre="NO";
//    					siempre="NO";
//    					if( registry.byId("prSelect").get('value') == 1 ){
//    						nunca = "SI";
//    					} else if( registry.byId("prSelect").get('value') == 2 ){
//    						casiNunca = "SI";
//    					} else if( registry.byId("prSelect").get('value') == 3 ){
//    						casiSiempre = "SI";
//    					} else if( registry.byId("prSelect").get('value') == 4 ){
//    						siempre = "SI";
//    					}
    					
    				    var grid = registry.byId('nGrid');
    				    var index = grid.selection.selectedIndex;
    				    var item = grid.getItem(index);
    					try{								
    						grid.store.setValue(item, 'opcionNunca', vertSlider.get("value"));    						
//    						grid.store.setValue(item, 'opcionCasiNunca', casiNunca);
//    						grid.store.setValue(item, 'opcionCasiSiempre', casiSiempre);
//    						grid.store.setValue(item, 'opcionSiempre', siempre);
    						registry.byId('dDetail').destroyRecursive(false);
    					} catch(e){
    							utils.cstmAlert('Ocurrio un error al Editar');
    							console.log(e);
    					};	
    			   } 
		},'prBtnAceptar');
    	
	}

	function despliegaEvaluacion(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('myDataGrid')){
        tablaGrid1='<table border="0" align="left" width= "900px">'+
                         '<tr>' +
                                   '<td width= "450px"><span class="sub" align="left">'+infCctNivel.nomNivel+'</span></td>'+
                         '<tr>'+
                         '   <td><table id="myDataGrid" dojoType="dojox.grid.DataGrid" style="width:600px; height:300px;">'+
                       '<thead>'+
                       '<tr><th  colspan="2">Porcentaje de estudiantes con promedio entre 5 y 6</th>'+
                       '<th  colspan="2">Porcentaje de estudiantes con promedio entre 7 y 8</th>'+
                       '<th  colspan="2">Porcentaje de estudiantes con promedio entre 9 y 10</th>'+
                       '</tr>'+
                       '<tr><th field="56eva" width="33%">En la primera evaluaci\u00F3n del ciclo escolar</th>'+
                           '<th field="56meta" width="33%">Meta de cierre del ciclo escolar</th>'+
                           '<th field="78eva" width="33%">En la primera evaluaci\u00F3n del ciclo escolar</th>'+
                           '<th field="78meta" width="33%">Meta de cierre del ciclo escolar</th>'+
                           '<th field="90eva" width="33%">En la primera evaluaci\u00F3n del ciclo escolar</th>'+
                           '<th field="90meta" width="33%">Meta de cierre del ciclo escolar</th>'+            
                       '</tr>'+
                       '</thead>'+
                       '</table></td>'+
                         '</tr>'+
                         '<tr>' +
                                   '<td>'+
                                          '<input id="e_evaGrid"/>'+
                                   '</td>'+
                         '</tr>'+
                         '</table>';      
                             
        dom.byId('evaluacionPane').innerHTML=tablaGrid1;                            
       
        regEvaluacion4 = segundaAsambleaObj.evaluacion?segundaAsambleaObj.evaluacion:[];
        
        regEvaluacion = [];
		
		for(var i in regEvaluacion4){
			if(regEvaluacion4[i].cSesion==4){
				regEvaluacion.push(regEvaluacion4[i]);
			}
		}
		
		if(regEvaluacion.length <= 0)
		{
			regEvaluacion = regEvaluacion4;
		}
		
        var items= [];
        
        for(var i in gradosStore){
        	if( gradosStore[i].cNivel  == infCctNivel.cNivel){
        		for(var j in regEvaluacion){
        			
        			if( gradosStore[i].cGrado == regEvaluacion[j].cGrado){
        				items.push( {idGrado:gradosStore[i].cGrado,grado:gradosStore[i].nomNivel, eva1:regEvaluacion[j].eva1, meta1:regEvaluacion[j].meta1, eva2:regEvaluacion[j].eva2, meta2:regEvaluacion[j].meta2,eva3:regEvaluacion[j].eva3, meta3:regEvaluacion[j].meta3 } );
        				break;
        			}
        		}
        		if(regEvaluacion.length==0)
        			{
        			items.push( {idGrado:gradosStore[i].cGrado,grado:gradosStore[i].nomNivel, eva1:0, meta1:0, eva2:0, meta2:0,eva3:0, meta3:0} );
        			}
        	//	items.push( {grado:gradosStore[i].nomNivel, eva1:regEvaluacion[i].eva1, meta1:regEvaluacion[i].meta1, eva2:regEvaluacion[i].eva2, meta2:regEvaluacion[i].meta2,eva3:regEvaluacion[i].eva3, meta3:regEvaluacion[i].meta3 } );	
        	//	items.push( {idGrado:gradosStore[i].cGrado,grado:gradosStore[i].nomNivel, eva1:0, meta1:0, eva2:0, meta2:0,eva3:0, meta3:0} );
        	}        	
        }
        
//        var items= new Array(	{grado: 1, eva1:10, meta1:50, eva2:10, meta2:50,eva3:10, meta3:50, },
//                                {grado: 2, eva1:10, meta1:50, eva2:10, meta2:50,eva3:10, meta3:50, },
//                                {grado: 3, eva1:10, meta1:50, eva2:10, meta2:50,eva3:10, meta3:50, },
//                                {grado: 4, eva1:10, meta1:50, eva2:10, meta2:50,eva3:10, meta3:50, },
//                                {grado: 5, eva1:10, meta1:50, eva2:10, meta2:50,eva3:10, meta3:50, },
//                                {grado: 6, eva1:10, meta1:50, eva2:10, meta2:50,eva3:10, meta3:50, }
//        );
        
        var data = {
              identifier:"grado",
              items: items
        };
        
        var jsonStore = new ItemFileWriteStore({data: data});
        
        new DataGrid({                 
            query: { id: "*" },
            structure: [
                [
                 			 { name: "id del grado", field: "idGrado", width: "84px", rowSpan: 2,hidden:true },
                             { name: "Nivel / Grado", field: "grado", width: "84px", rowSpan: 2 },
                             { name: "En la primera evaluaci\u00f3n del ciclo escolar", field: "eva1", width: "136px" },                              
                             { name: "Meta de cierre del ciclo escolar", field: "meta1", width: "107px" },
                             { name: "En la primera evaluaci\u00f3n del ciclo escolar", field: "eva2", width: "136px" },                              
                             { name: "Meta de cierre del ciclo escolar", field: "meta2", width: "107px" },
                             { name: "En la primera evaluaci\u00f3n del ciclo escolar", field: "eva3", width: "136px" },                              
                             { name: "Meta de cierre del ciclo escolar", field: "meta3", width: "107px" }
                             ],[
                             { name: "Porcentaje de estudiantes con promedio entre 5 y 6", width: "243px", colSpan: 2 },
                             { name: "Porcentaje de estudiantes con promedio entre 7 y 8", width: "243px", colSpan: 2 },
                             { name: "Porcentaje de estudiantes con promedio entre 9 y 10",width: "243px", colSpan: 2 }
                ]
            ]
        }, "myDataGrid").startup();  
  
		var grid = registry.byId('myDataGrid');
		grid.setStore(jsonStore);      
		  
		new Button({
	        label : " Editar grado",
	        id:'e_evaGrid',
	        onClick : function() {                                	              
	        	
	        	var index = registry.byId('myDataGrid').selection.selectedIndex;    											
				
	        	if(index!=-1){
					var item = registry.byId('myDataGrid').getItem(index);
				}else{
	            	 utils.cstmAlert('Debe seleccionar solo un registro.');
	            	 return;
	            } 
	        	
	        	                                                                             
	              if(index!=-1){
	                     var item = registry.byId('myDataGrid').getItem(index);
	                     var itemToEdit={selectedItem:index,
	                    		 		 grado: registry.byId('myDataGrid').store.getValue(item, 'grado'), 
	                    		 		eva1: registry.byId('myDataGrid').store.getValue(item, 'eva1'),
	                    		 		meta1: registry.byId('myDataGrid').store.getValue(item, 'meta1'),
	                    		 		eva2: registry.byId('myDataGrid').store.getValue(item, 'eva2'),
	                    		 		meta2: registry.byId('myDataGrid').store.getValue(item, 'meta2'),
	                    		 		eva3: registry.byId('myDataGrid').store.getValue(item, 'eva3'),
	                    		 		meta3: registry.byId('myDataGrid').store.getValue(item, 'meta3')
	                     				};
	              }	              
	              funEvaluacion(itemToEdit);                                          
            }                          
        }, 'e_evaGrid');
            
	}	
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}
	
	function despliegaCompromisos(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('cGrid')){
		layout = [[	  { name: 'idCompromiso', field: 'idCompromiso', width: '5px',hidden:true},
		           	  { name: 'cSesion', field: 'cSesion', width: '5px',hidden:true},
		           	  { name: 'idConsecutivo', field: 'idConsecutivo', width: '5px',hidden:true},
	    		      { name: 'COMPROMISO DEL CONSEJO ESCOLAR DE PARTICIPACI\u00d3N SOCIAL', field: 'compromiso',  width:'525px'},
		              { name: 'ACI\u00d3N1', field: 'accion1',  width:'25px',hidden:true},
		              { name: 'ACI\u00d3N2', field: 'accion2',  width:'25px',hidden:true},
		              { name: 'Cumplimiento del compromiso', field: 'cumplimiento',  width:'125px'},
		              { name: 'nomOtroCompromiso', field: 'nomOtroCompromiso',width:'5px',	hidden:true}
	    		 ]];
	
	tmpCompromiso4 = segundaAsambleaObj.compromiso?segundaAsambleaObj.compromiso:[];
		
	tmpCompromiso = [];
	
	for(var i in tmpCompromiso4){
		if(tmpCompromiso4[i].cSesion==4){
			tmpCompromiso4[i].cumplimiento = tmpCompromiso4[i].cumplimiento==1?"SI":"NO";
			tmpCompromiso.push(tmpCompromiso4[i]);
		}
	}
	
	if(tmpCompromiso.length <= 0)
	{
		tmpCompromiso = tmpCompromiso4;
	}
	
	var dataJsonStoreCompromiso = {
		identifier: 'idCompromiso',
		items: tmpCompromiso
	};

	maxIndexCompromiso = tmpCompromiso.length;
	
		tablaGrid1=	'<table border="0" align="left" width= "900px">'+
					'<tr>'+
					'	<td><input id="cGrid"/></td>'+
					'</tr>'+
					'<tr>' +
						'<td>'+
							'<input id="a_cGrid"/>'+
							'<input id="e_cGrid"/>'+
							'<input id="d_cGrid"/>'+
						'</td>'+
					'</tr>'+
					'</table>';
		
		dom.byId('compromisoPane').innerHTML=tablaGrid1;
		
		new DataGrid({
	        id: 'cGrid',
	        structure: layout,
	        rowSelector: '10px',
	        height: '300px',
			width: '450px'
	        }, 'cGrid').startup();    	   		    	    			
	
      jsonStoreCompromiso = new ItemFileWriteStore({data: dataJsonStoreCompromiso});
    	
		registry.byId('cGrid').setStore(jsonStoreCompromiso);
		
		
		new Button({
			label : " Agregar ",
			id:'a_cGrid',
			onClick : function() {					
				compromisoAccion();
			}
		}, 'a_cGrid');
    	
    	new Button({
			label : " Informe final ",
			id:'e_cGrid',
			onClick : function() {	
				var index = registry.byId('cGrid').selection.selectedIndex;    											
				if(index!=-1){												
					var item = registry.byId('cGrid').getItem(index);                	                  
				} else{
	            	 utils.cstmAlert(
						'Debe seleccionar solo un registro.');
	             }	
				
            	var itemToEdit={selectedItem:index,
            			idCompromiso: registry.byId('cGrid').store.getValue(item, 'idCompromiso'),
            			idConsecutivo: registry.byId('cGrid').store.getValue(item, 'idConsecutivo'),
            			accion1: registry.byId('cGrid').store.getValue(item, 'accion1'),
            			accion2: registry.byId('cGrid').store.getValue(item, 'accion2'),
            			nomOtroCompromiso: registry.byId('cGrid').store.getValue(item, 'nomOtroCompromiso'),            			
            			cumplimiento: registry.byId('cGrid').store.getValue(item, 'cumplimiento')=="SI"?1:2
            			};    	                    	
            	    	                    					
				compromisoAccion(itemToEdit);
			}
		}, 'e_cGrid');
    	
    	new Button({
			label : " Eliminar",
			id: 'd_cGrid',	
			onClick : function() {
				eliminaRow(registry.byId('cGrid'));
			}
		}, 'd_cGrid');
		
	}
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}

	function despliegaComites(crea){
		
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('7_1Grid')){
					layout = [[	  { name: 'idConsecutivo', field: 'ceComites', width: '5px', hidden:true},
					           	{ name: 'cSesion', field: 'cSesion', width: '5px',hidden:true},
			                  	  { name: 'idComite', field: 'idComite', width: '5px',hidden:true},
				    		      { name: 'Comit\u00E9', field: 'nomComite',  width:'150px'},
				    		      { name: 'nomOtroComite', field: 'nomOtroComite',width:'150px',hidden:true},
				    		      { name: 'Integrantes', field: 'numIntegrantes',  width:'150px'},
				    		      { name: 'Nombre del presidente del comit\u00E9 en el consejo escolar de participaci\u00F3n social', field: 'nomPresidente',  width:'300px',hidden:true},
				    		      { name: 'idCalidad', field: 'idCalidad',  width:'1px',hidden:true},
				    		      { name: 'Calidad del presidente del comit\u00E9 en el consejo escolar de participaci\u00F3n social', field: 'nomcalidad',  width:'100px',hidden:true},
				    		      { name: 'idAcuerdo', field: 'idAcuerdo', width: '1px',hidden:true},
				    		      { name: 'Acuerdo del comit\u00E9', field: 'acuerdo', width: '300px'},
				    		      { name: 'accion 1', field: 'accion1', width: '1px',hidden:true},
				    		      { name: 'accion 2', field: 'accion2', width: '1px',hidden:true},
				    		      { name: 'accion 3', field: 'accion3', width: '1px',hidden:true},
				    		      { name: 'accion 4', field: 'accion4', width: '1px',hidden:true},
				    		      { name: 'accion 5', field: 'accion5', width: '1px',hidden:true},
				    		      { name: 'Cumplio Plan de Actividades', field: 'actividadComite1', width: '200px',hidden:true}
				    		     
				    		      ]];
				
				tablaGrid1=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
				//				'<td width= "450px"><span class="sub" align="left">Seguimiento</span></td>'+
								'<td width= "450px"><span class="sub" align="left"></span></td>'+
							'<tr>'+
				//			'	<td><input id="7Grid"/></td>'+
							'	<td><input id="7_1Grid"/></td>'+
							'</tr>'+
							'<tr>' +
					//			'<td>'+
				//					'<input id="e_7Grid"/>'+
				//				'</td>'+
								'<td>'+
									'<input id="a_7_1Grid"/>'+
									'<input id="e_7_1Grid"/>'+
					//				'<input id="d_7_1Grid"/>'+
					//				'<input id="s_7_1Grid"/>'+
								'</td>'+
							'</tr>'+
							'</table>';
				
				dom.byId('comitePane').innerHTML=tablaGrid1;
				
				
				progComNuevoNuevo = segundaAsambleaObj.comiteSeguimiento?segundaAsambleaObj.comiteSeguimiento:[];
//				progComSeg = segundaAsambleaObj.comiteActual?segundaAsambleaObj.comiteActual:[];
				
				progComNuevo =[];
				

				for (var i in progComNuevoNuevo ){
				if(progComNuevoNuevo[i].cSesion==4){
					progComNuevo.push(progComNuevoNuevo[i]);
				}
				}
				
				if(progComNuevo.length>0)
				{}
			    else{
			    	progComNuevo=progComNuevoNuevo;
			    }
				

//				
//				var dataComSeg = {
//					      identifier: "idComite",
//					      items: progComSeg
//			    };
				
				var dataComAct = {
					      identifier: "idComite",
					      items: progComNuevo
			    };
				
//				new DataGrid({
//			        id: '7Grid',
//			        structure: layout,
//			        rowSelector: '10px',
//			        height: '300px',
//					width: '450px'
//			        }, '7Grid').startup();    	   		    	    			
		  					
				new DataGrid({
			        id: '7_1Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
			        }, '7_1Grid').startup();

				//Store de federales para seguimiento
//				storeComSeg = new ItemFileWriteStore({data: dataComSeg});				    
//				registry.byId('7Grid').setStore(storeComSeg);
//				
				//Store de federales nuevos
				storeComNuevo = new ItemFileWriteStore({data: dataComAct});				    
				registry.byId('7_1Grid').setStore(storeComNuevo);
				
				maxIndexComites = dataComAct.items.length;
				
//		    	new Button({
//					label : " Seguimiento a comit\u00e9s ",
//					id:'e_7Grid',
//					onClick : function() {	
//						var index = registry.byId('7Grid').selection.selectedIndex;    											
//						if(index!=-1){
//							var item = registry.byId('7Grid').getItem(index);
//						}else{
//			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
//			            	 return;
//			            }
//						
//						var itemToEdit={selectedItem:index,
//		            			ceComites: registry.byId('7Grid').store.getValue(item, 'ceComites'), 
//		            			idComite: registry.byId('7Grid').store.getValue(item, 'idComite'),
//		            			nomComite: registry.byId('7Grid').store.getValue(item, 'nomComite'),
//		            			nomOtroComite: registry.byId('7Grid').store.getValue(item, 'nomOtroComite'),
//		            			accion1: registry.byId('7Grid').store.getValue(item, 'accion1'),
//		            			actividadComite1: registry.byId('7Grid').store.getValue(item, 'actividadComite1'),
//		            			accion2: registry.byId('7Grid').store.getValue(item, 'accion2'),
//		            			accion3: registry.byId('7Grid').store.getValue(item, 'accion3'),
//		            			accion4: registry.byId('7Grid').store.getValue(item, 'accion4'),
//		            			accion5: registry.byId('7Grid').store.getValue(item, 'accion5')
//		            			
//								};
//									
//						seguimientoComite(itemToEdit,1);
//					}			
//				}, 'e_7Grid');
		    	    	
		    	new Button({
					label : " Agregar ",
					id:'a_7_1Grid',
					onClick : function() {					
						funComite();
					}
				}, 'a_7_1Grid');
		    	
		    	new Button({
					label : " Informe Final ",
					id:'e_7_1Grid',
					onClick : function() {					
						var index = registry.byId('7_1Grid').selection.selectedIndex;    											
						if(index!=-1){												
							var item = registry.byId('7_1Grid').getItem(index);
		                	var itemToEdit={selectedItem:index,
		                			ceComites: registry.byId('7_1Grid').store.getValue(item, 'ceComites'), 
		                			idComite: registry.byId('7_1Grid').store.getValue(item, 'idComite'),
		                			cSesion: registry.byId('7_1Grid').store.getValue(item, 'cSesion'),
		                			nomComite: registry.byId('7_1Grid').store.getValue(item, 'nomComite'),
		                			noIntegrantes: registry.byId('7_1Grid').store.getValue(item, 'numIntegrantes'),
		                			nombrePresidente: registry.byId('7_1Grid').store.getValue(item, 'nomPresidente'),
		                			idCalidad: registry.byId('7_1Grid').store.getValue(item, 'idCalidad'),
		                			calidadPresidente: registry.byId('7_1Grid').store.getValue(item, 'nomCalidad'),
		                			idAcuerdo: registry.byId('7_1Grid').store.getValue(item, 'idAcuerdo'),
		                			acuerdoComite: registry.byId('7_1Grid').store.getValue(item, 'acuerdo'),
		                			nomOtroComite: registry.byId('7_1Grid').store.getValue(item, 'nomOtroComite'),
		                			accion1: registry.byId('7_1Grid').store.getValue(item, 'accion1'),
		                			actividadComite1: registry.byId('7_1Grid').store.getValue(item, 'actividadComite1'),
			            			accion2: registry.byId('7_1Grid').store.getValue(item, 'accion2'),
			            			accion3: registry.byId('7_1Grid').store.getValue(item, 'accion3'),
			            			accion4: registry.byId('7_1Grid').store.getValue(item, 'accion4'),
			            			accion5: registry.byId('7_1Grid').store.getValue(item, 'accion5')
			            			
		                			};    	                    	
		                	funComite(itemToEdit);
		                  
						}else{
			            	 utils.cstmAlert(
								'Debe seleccionar solo un registro.');
			             }		
					}			
				}, 'e_7_1Grid');
		    	
//		    	new Button({
//					label : " Eliminar",
//					id: 'd_7_1Grid',	
//					onClick : function() {					
//						eliminaRow(registry.byId('7_1Grid'));
//					}
//				}, 'd_7_1Grid');
		    
//		    	new Button({
//					label : " Seguimiento a comit\u00e9s ",
//					id:'s_7_1Grid',
//					onClick : function() {	
//						var index = registry.byId('7_1Grid').selection.selectedIndex;    											
//						if(index!=-1){
//							var item = registry.byId('7_1Grid').getItem(index);
//						}else{
//			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
//			            	 return;
//			            }
//						
//						var itemToEdit={selectedItem:index,
//		            			ceComites: registry.byId('7_1Grid').store.getValue(item, 'ceComites'), 
//		            			idComite: registry.byId('7_1Grid').store.getValue(item, 'idComite'),
//		            			nomComite: registry.byId('7_1Grid').store.getValue(item, 'nomComite'),
//		            			nomOtroComite: registry.byId('7_1Grid').store.getValue(item, 'nomOtroComite'),
//		            			accion1: registry.byId('7_1Grid').store.getValue(item, 'accion1'),
//		            			actividadComite1: registry.byId('7_1Grid').store.getValue(item, 'actividadComite1'),
//		            			accion2: registry.byId('7_1Grid').store.getValue(item, 'accion2'),
//		            			actividadComite2: registry.byId('7_1Grid').store.getValue(item, 'actividadComite2'),
//		            			accion3: registry.byId('7_1Grid').store.getValue(item, 'accion3'),
//		            			actividadComite3: registry.byId('7_1Grid').store.getValue(item, 'actividadComite3'),
//		            			accion4: registry.byId('7_1Grid').store.getValue(item, 'accion4'),
//		            			actividadComite4: registry.byId('7_1Grid').store.getValue(item, 'actividadComite4'),
//		            			accion5: registry.byId('7_1Grid').store.getValue(item, 'accion5'),
//		            			actividadComite5: registry.byId('7_1Grid').store.getValue(item, 'actividadComite5')};
//									
//						seguimientoComite(itemToEdit,2);
//					}			
//				}, 's_7_1Grid');    	
	}
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
		
	}

	function despliegaEventos(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('evGrid')){
    	layout = [[	    { name: 'idConsecutivo', field: 'idConsecutivo', width: '5px',hidden:true},
	    	           	  { name: 'idEvento', field: 'cEvento', width: '5px',hidden:true},
	    	           	{ name: 'cSesion', field: 'cSesion', width: '5px',hidden:true},
		    		      { name: 'EVENTOS A REALIZAR', field: 'nomEvento',  width:'405px'},
		    		      { name: 'Cumplio Evento', field: 'cumplioEvento', width: '50px',hidden:true},
		    		      { name: 'idFuente', field: 'fuenteRecursos', width: '5px',hidden:true},
		    		      { name: 'nombreOtroEvento', field: 'nomOtroEvento', width: '5px',hidden:true},
		    		      { name: 'fuenteRecursos', field: 'idFuente', width: '5px',hidden:true},
		    		      { name: 'nombreOtraFuente', field: 'nomOtroFr', width: '5px',hidden:true},
		    		      { name: 'Monto Recibido',	field: 'montoR',width: '70px'},
		    		      { name: 'Monto Recibido(Letra)',field: 'montoStrR',width: '200px',hidden:true},
		    		      { name: 'Monto Gastado',field: 'montoG',width: '70px'},
		    		      { name: 'Monto Gastado(Letra)',field: 'montoStrG',width: '200px',hidden:true}
		    		      
		    		    
    		      ]];
    	
		
		tablaGrid1=	'<table border="0" align="left" width= "900px">'+
					'<tr>' +
						'<td width= "450px"><span class="sub" align="left"></span></td>'+
					'<tr>'+
					'	<td><input id="evGrid"/></td>'+
					'</tr>'+
					'<tr>' +
					'<td>'+
						'<input id="a_evGrid"/>'+
						'<input id="e_evGrid"/>'+
						'<input id="d_evGrid"/>'+
					'</td>'+
					'</tr>'+
					'</table>';
		
		dom.byId('eventoPane').innerHTML=tablaGrid1;
		
		progEventosNuevo = segundaAsambleaObj.eventos?segundaAsambleaObj.eventos:[];
		progEventos=[];
		
		
    	for(var i in progEventosNuevo)
		{
		if(progEventosNuevo[i].cSesion==4){
			progEventos.push(progEventosNuevo[i]);
		}
		}
	if(progEventos.length>0)
		{}
	else{
		progEventos=progEventosNuevo;
	}
		
		
		var dataEvento = {
			      identifier: "cEvento",
			      items: progEventos
	    };
		
		maxIndexEventos = progEventos.length;
		new DataGrid({
	        id: 'evGrid',
	        structure: layout,
	        rowSelector: '10px',
	        height: '300px',
			width: '450px'
	        }, 'evGrid').startup();    	   		    	    			
  				
		storeEvento = new ItemFileWriteStore({data: dataEvento});				    
		registry.byId('evGrid').setStore(storeEvento);
				
		new Button({
			label : " Agregar ",
			id:'a_evGrid',
			onClick : function() {					
				eventos();
			}
		}, 'a_evGrid');
    	
    	new Button({
			label : " Informe Final ",
			id:'e_evGrid',
			onClick : function() {					
				var index = registry.byId('evGrid').selection.selectedIndex;    											
				if(index!=-1){												
					var item = registry.byId('evGrid').getItem(index);
					
                	var itemToEdit={selectedItem:index,
	                    			idConsecutivo: registry.byId('evGrid').store.getValue(item, 'idConsecutivo'),
	                    			cEvento: registry.byId('evGrid').store.getValue(item, 'cEvento'),
	                    			cSesion: registry.byId('evGrid').store.getValue(item, 'cSesion'),
	                    			cumplioEvento: registry.byId('evGrid').store.getValue(item, 'cumplioEvento'),
	                    			fuenteRecursos: registry.byId('evGrid').store.getValue(item, 'fuenteRecursos'),
	                    			nomOtroEvento: registry.byId('evGrid').store.getValue(item, 'nomOtroEvento'),
	                    			nomOtroFr: registry.byId('evGrid').store.getValue(item, 'nomOtroFr'),
	                    			montoR: registry.byId('evGrid').store.getValue(item, 'montoR'),
		                			montoStrR: registry.byId('evGrid').store.getValue(item, 'montoStrR'),
		                			montoG: registry.byId('evGrid').store.getValue(item, 'montoG'),
		                			montoStrG: registry.byId('evGrid').store.getValue(item, 'montoStrG')
		                
	                    			
	                    			};    	                    	
                	eventos(itemToEdit);
                  
				} else{
	            	 utils.cstmAlert(
						'Debe seleccionar solo un registro.');
	             }					
			}
		}, 'e_evGrid');
    	
    	new Button({
			label : " Eliminar",
			id: 'd_evGrid',	
			onClick : function() {
				eliminaRow(registry.byId('evGrid'));
			}
		}, 'd_evGrid');
    	    	    	
	}	
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}
	
	function despliegaEstimulos(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('eGrid')){
    	layout = [[	  { name: 'idConsecutivo', field: 'idConsecutivo', width: '5px',hidden:true},
    	           	  { name: 'cSesion', field: 'cSesion', width: '5px',hidden:true},
    	           	  { name: 'cEstimulo', field: 'cEstimulo',  width:'1px',hidden:true},
	    		      { name: 'Est\u00edmulo y reconocimiento que se otorga', field: 'tipoEstimulo',  width:'200px'},
	    		      { name: 'nombreOtroEstimulo', field: 'nomOtroEstimulo', width: '5px',hidden:true},
	    		      { name: 'candidato', field: 'candidato',  width:'1px',hidden:true},
	    		      { name: 'Candidatos a recibir estimulos y/o reconocimientos ', field: 'tipoCandidato',  width:'200px'},
	    		      { name: 'Nombre del maestro, directivo o trabajador adscrito al centro escolar a quien se otorga est\u00edmulo  o reconocimiento', field: 'nomCandidato',  width:'100px',hidden:true},
	    		      { name: 'Exposici\u00f3n de motivos y justificaci\u00f3n de porqu\u00e9 se le otorga el est\u00edmulo y reconocimiento', field: 'motivos',  width:'100px',hidden:true},
	    		      { name: 'Fecha de entrega', field: 'fecha',  width:'100px'},
	    		      { name: 'Se llevo acabo el estimulo', field: 'llevoAcabo',  width:'100px',hidden:true}
    		      ]];
		
    	tmpEstimuloNuevo = segundaAsambleaObj.estimulos?segundaAsambleaObj.estimulos:[];
    	tmpEstimulo=[];	

    	for(var i in tmpEstimuloNuevo)
    		{
    		if(tmpEstimuloNuevo[i].cSesion==4){
    			tmpEstimulo.push(tmpEstimuloNuevo[i]);
    		}
    		}
    	if(tmpEstimulo.length>0)
    		{}
    	else{
    		tmpEstimulo=tmpEstimuloNuevo;
    	}
    	
		//for (var i in arreglo ){
		//if(arreglo[i].cSesion=4){
		// nuevoArreglo.push(arreglo[i]);
		//}
		//}
    	
    	
    	
			var dataJsonStoreEstimulos = {
				identifier: 'idConsecutivo',
				items: tmpEstimulo
			};

			maxIndexEstimulos = tmpEstimulo.length;
			
			
		
		tablaGrid1=	'<table border="0" align="left" width= "900px">'+
					'<tr>' +
						'<td width= "450px"><span class="sub" align="left"></span></td>'+
					'<tr>'+
					'	<td><input id="eGrid"/></td>'+
					'</tr>'+
					'<tr>' +
					'<td>'+
						'<input id="a_eGrid"/>'+
						'<input id="e_eGrid"/>'+
//						'<input id="d_eGrid"/>'+
					'</td>'+
					'</tr>'+
					'</table>';
		
		dom.byId('estimuloPane').innerHTML=tablaGrid1;
		
		new DataGrid({
	        id: 'eGrid',
	        structure: layout,
	        rowSelector: '10px',
	        height: '300px',
			width: '450px'
	        }, 'eGrid').startup();    	   		    	    			
  			
		jsonStoreEstimulos = new ItemFileWriteStore({data: dataJsonStoreEstimulos});
    	
		registry.byId('eGrid').setStore(jsonStoreEstimulos);
		
		new Button({
			label : " Agregar ",
			id:'a_eGrid',
			onClick : function() {					
				estimulos();
			}
		}, 'a_eGrid');
    	
    	new Button({
			label : " Informe Final ",
			id:'e_eGrid',
			onClick : function() {	
				var index = registry.byId('eGrid').selection.selectedIndex;    											
				if(index!=-1){												
					var item = registry.byId('eGrid').getItem(index);
                	var itemToEdit={selectedItem:index,
		                			idConsecutivo: registry.byId('eGrid').store.getValue(item, 'idConsecutivo'),     	                    			
		                  			cSesion: registry.byId('eGrid').store.getValue(item, 'cSesion'),
		                  			cEstimulo: registry.byId('eGrid').store.getValue(item, 'cEstimulo'),
                                    tipoEstimulo: registry.byId('eGrid').store.getValue(item, 'tipoEstimulo'),
		                			candidato: registry.byId('eGrid').store.getValue(item, 'candidato'),
		                			tipoCandidato: registry.byId('eGrid').store.getValue(item, 'tipoCandidato'),
		                			nomCandidato:registry.byId('eGrid').store.getValue(item, 'nomCandidato'),
					    		    motivos:  registry.byId('eGrid').store.getValue(item, 'motivos'),
					    		    fecha:  registry.byId('eGrid').store.getValue(item, 'fecha'),
					    		    llevoAcabo:  registry.byId('eGrid').store.getValue(item, 'llevoAcabo'),
					    		    nomOtroEstimulo: registry.byId('eGrid').store.getValue(item, 'nomOtroEstimulo')

                					};    	                    	
                	estimulos(itemToEdit);
                  
				} else{
	            	 utils.cstmAlert(
						'Debe seleccionar solo un registro.');
	             }					
			}
		}, 'e_eGrid');
    	
//    	new Button({
//			label : " Eliminar",
//			id: 'd_eGrid',	
//			onClick : function() {
//				eliminaRow(registry.byId('eGrid'));
//			}
//		}, 'd_eGrid');
    	    	    	
	}		
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}

	function despliegaAsuntos(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('9Grid')){
		layout = [[	  { name: 'cscAsunto', field: 'cscAsunto', width: '5px',hidden:true},
		    		      { name: 'Asuntos generales', field: 'asunto',  width:'300px'},
		    		      { name: 'Acuerdos aprobados', field: 'acuerdo',  width:'300px'}
		    		      ]];
		
		tablaGrid1=	'<table border="0" align="left" width= "900px">'+
	  	'<tr>' +
	  	'	<td><input id="9Grid"/></td>'+
	  	'</tr>'+
	  	'<tr>' +
   	   	'<td><input id="a_9Grid"/>'+
	   	   	'<input id="e_9Grid"/>'+
	   	   	'<input id="d_9Grid"/></td>'+
   	   	'</tr>'+
   	   	'</table>';
		
		dom.byId('asuntoPane').innerHTML=tablaGrid1;
		
		progAsuSeg = segundaAsambleaObj.asunto?segundaAsambleaObj.asunto:[];
		var dataAsuSeg = {
			      identifier: "cscAsunto",
			      items: progAsuSeg
	    };
		
		new DataGrid({
	        id: '9Grid',
	        structure: layout,
	        rowSelector: '10px',
	        height: '300px',
			width: '450px'
	        }, '9Grid').startup();
		
		maxIndexAsuntos = progAsuSeg.length;
		
		//Store de federales para seguimiento
		storeAsuSeg = new ItemFileWriteStore({data: dataAsuSeg});				    
		registry.byId('9Grid').setStore(storeAsuSeg);
		
	    new Button({
			label : " Agregar ",
			id:'a_9Grid',	
			onClick : function() {					
				funAsunto ();
			}
		}, 'a_9Grid');
    	
		new Button({
			label : " Editar ",
			id:'e_9Grid',	
			onClick : function() {	
				var index = registry.byId('9Grid').selection.selectedIndex;    											
				if(index!=-1){												
					var item = registry.byId('9Grid').getItem(index);
                	var itemToEdit={selectedItem:index,
	                    			cPrograma: registry.byId('9Grid').store.getValue(item, 'cscAsunto'),     	                    			
	                    			strAsuntos: registry.byId('9Grid').store.getValue(item, 'asunto'),
	                    			strAcuerdos: registry.byId('9Grid').store.getValue(item, 'acuerdo')    	                    			
                					};    	                    	
                	funAsunto(itemToEdit);
                  
				} else{
	            	 utils.cstmAlert(
						'Debe seleccionar solo un registro.');
	             }					
			}
		}, 'e_9Grid');
    	
    	new Button({
			label : " Eliminar",
			id: 'd_9Grid',	
			onClick : function() {
				eliminaRow(registry.byId('9Grid'));
			}
		}, 'd_9Grid');    	
	}
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}	
	
	function despliegaCategorias(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('10Grid')){
					layout = [[	  { name: 'cPrograma', 		field: 'cPrograma', width: '5px', hidden:true},
					           	 { name: 'cSesion', 		field: 'cSesion', width: '5px',hidden:true},
				                  	  { name: 'idCategoria', 	field: 'idCategoria', width: '5px',hidden:true},
					    		      { name: 'Categor\u00EDa', field: 'nomCategoria',  width:'150px'},
					    		      { name: 'nomOtroCategoria',field: 'nomOtroCategoria',width:'5px',hidden:true},
					    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
					    		      { name: 'Metas', 				field: 'meta', 				width: '160px', hidden:true},
					    		      { name: 'Actividad', 		field: 'nomActividad',  width:'150px',hidden:true},
					    		      { name: 'Fuente', 		field: 'fuente',  width:'150px',hidden:true},
					    		      { name: 'Cumplio meta', 						field: 'cumplio', 			width: '70px',hidden:true},
					    		      { name: 'Monto Recibido', 						field: 'monto1', 			width: '70px',hidden:true},
					    		      { name: 'Monto(Letra)1', 				field: 'montoStr1', 			width: '220px',hidden:true},
					    		      { name: 'Monto Gastado', 						field: 'monto2', 			width: '70px',hidden:true},
					    		      { name: 'Monto(Letra)2', 				field: 'montoStr2', 			width: '220px',hidden:true}
					    		      
					    		]];
					
					tablaGrid10=	'<table border="0" align="left" width= "900px">'+
        		  	'<tr>' +
        		  	'	<td><input id="10Grid"/></td>'+
        		  	'</tr>'+
        		  	'<tr>' +
        	   	   	'<td><input id="a_10Grid"/>'+
        		   	   	'<input id="e_10Grid"/>'+
        		   	   	'<input id="d_10Grid"/></td>'+
        	   	   	'</tr>'+
        	   	   	'</table>';
    		    	//if(array.indexOf(gActividades,26)!=-1){
        	    		
    	    		dom.byId('activPane').innerHTML=tablaGrid10;
        	    	
    	    	
    	    		
    	    		new DataGrid({
    			        id: '10Grid',
    			        structure: layout,
    			        rowSelector: '10px',
    			        height: '300px',
    					width: '850px'
    			        }, '10Grid').startup();
    	    		
    	    		
    	    		var dataJsonStoreCategoria = {
    						identifier: 'cPrograma',
    						items: categoriasA
    					};
    	    		
    	    		maxIndexActividades = categoriasA.length;
    	   			
    				
    	    		
    	    		//Se crea el store de los asuntos
    				jsonStoreCategorias = new ItemFileWriteStore({data: dataJsonStoreCategoria});
    	   				    	
    	    		registry.byId('10Grid').setStore(jsonStoreCategorias);
    	    		
    	    		
    			    new Button({
    					label : " Agregar ",
    					id:'a_10Grid',	
    					onClick : function() {					
    						funActividad();
    					}
    				}, 'a_10Grid');
    		    	
    		    	new Button({
    					label : " Informe Final ",
    					id:'e_10Grid',
    					onClick : function() {	
    						var index = registry.byId('10Grid').selection.selectedIndex;    											
    						if(index!=-1){	    							
    							var item = registry.byId('10Grid').getItem(index);
    	                    	var itemToEdit={selectedItem:index,
    	                    			cPrograma: registry.byId('10Grid').store.getValue(item, 'cPrograma'),
    	                    			cSesion: registry.byId('10Grid').store.getValue(item, 'cSesion'),
    	                    			idCategoria: registry.byId('10Grid').store.getValue(item, 'idCategoria'),
    	                    			nomCategoria: registry.byId('10Grid').store.getValue(item, 'nomCategoria'),
    	                    			nomOtraCategoria: registry.byId('10Grid').store.getValue(item, 'nomOtraCategoria'),
    	                    			nomActividad: item.nomActividad,
    	                    			objetivo: registry.byId('10Grid').store.getValue(item, 'objetivo'),
    	                    			meta: registry.byId('10Grid').store.getValue(item, 'meta'),
    	                    			fuente: registry.byId('10Grid').store.getValue(item, 'fuente'),
    	                    			cumplio: registry.byId('10Grid').store.getValue(item, 'cumplio'),
    			            			monto1: registry.byId('10Grid').store.getValue(item, 'monto1'),
    			            			montoStr1: registry.byId('10Grid').store.getValue(item, 'montoStr1'),
    			            			monto2: registry.byId('10Grid').store.getValue(item, 'monto2'),
    			            			montoStr2: registry.byId('10Grid').store.getValue(item, 'montoStr2')
    			            			
    	                    	};    	                    	
    	                    		funActividad(itemToEdit,8);
    	                      
    						}else{
    			            	 utils.cstmAlert(
    								'Debe seleccionar solo un registro.');
    			             }					
    					}
    				}, 'e_10Grid');
    		    	
    		    	new Button({
    					label : " Eliminar",
    					id: 'd_10Grid',	
    					onClick : function() {					
    						registry.byId('10Grid').removeSelectedRows();
    						registry.byId('10Grid').store.save();
    					}
    				}, 'd_10Grid');
        	    			}
        	    		//}
    		    
			}
			else{
				   if(registry.byId(id)){
					   registry.byId('pestanias').closeChild(registry.byId(id));
				   }   
				}
		}
	
	}
	
	  function funActividad ( itemToEdit ){
	    	var edit=false;
		    if(!itemToEdit){
			   itemToEdit={cPrograma: 0,idCategoria:0,nomPrograma:'',monto1:'', montoStr1:'',monto2:'', montoStr2:'', nomActividad:[]};
		    }else{
			   edit=true;
		    }
		   
		   var fuenteStore = new Memory({
		          data: listFuenteActividad
		   });
		   
		    //----------------------------Diseño de la ventana
	    	var title = 'Actividades adicionales para beneficio del centro escolar';
	    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	    	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
	    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
		    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
		    jsUtils.createTag('div','prCnt','dcDetail');
		    
		    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "850px" >'+
					    			   '<tr><td>'+
					    			   '	<b>*Categor\u00EDa: </b><div id="prSelect" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr>' +
					    			   '<tr id="otro3Visible" style="display:none"><td>'+
					    			   '	<b>*Otro Categoria:</div> </b><div id="nomOtroCategoria"/><br/>'+
					    			   '</td></tr>'+
					    			   '<tr id="otro1Visible">' +
					    			   '	<td><b>*Actividad: </b><div id="strActividad" /><br/></td>'+
					    			   '</tr>'+
					    			   '<tr id="otro2Visible">' +
					    			   '	<td><b>*Meta: </b><div id="strMeta" /><br/></td>'+
					    			   '</tr>'+
					    			   '<tr id="otroCumplio">' +
					    			   '	<td><b>*Cumplio: </b><div id="prCumplio" /><br/></td>'+
					    			   '</tr>'+
					    			   '</tr>'+
					    			   '<tr id="otro4Visible">' +
					    			   '	<td><b>*Fuente: </b><div id="prFuente" /><br/></td>'+
					    			   '</tr>'+
					    			   '	<td><input id="GridDtA"/></td>'+
					    			   '</tr>'+
					    			   '<tr id="trMonto"><td> '+
 					    			   '	 <b>*Monto Recibido</b><br/>'+
 					    			   'N\u00FAmero:<input id="strmonto1"/> Letra:<input id="strmontoStr1"/><br/>'+
 					    			   '</td></tr>'+
 					    			  '<tr id="trMonto2"><td> '+
					    			   '	 <b>*Monto Gastado</b><br/>'+
					    			   'N\u00FAmero:<input id="strmonto2"/> Letra:<input id="strmontoStr2"/><br/>'+
					    			   '</td></tr>'+
					    			   '</table>';
		    
		    var layoutDt = [[	{ name: 'No.', field:'idActividad', width: '20px'},        			          		            			          		    
			          		    { name: 'Selecci\u00F3n de Actividad',	
			          				    field:'idSeleccion',
			          				    width: "120px",        			          				   
			          				    type: dojox.grid.cells.Bool,
			          				    editable: true, hidden:true},
			          				    
			          			{ name: 'Actividad', field: 'actividad', width: '200px'},        			          				
			          			{ name: 'Meta para el presente ciclo escolar', field: 'meta', 
			          					editable: true, 
			          					required: true,
			          					width: '250px', 
			          					maxlength: 250,
			          				    type: gridCellsDijit._Widget,
			          				    widgetClass: ValidationTextBox, 
			          				    widgetProps: {uppercase:'true', maxlength: 250} 
			          			},
			          			{ name: 'Cumplio meta', field: 'cumplio', 
		          					editable: true, 
		          					width: '100px', 
		          					type: dojox.grid.cells.ComboBox,
		          	                options: ["Si","No"] 
		          			    },
		          			    { name: 'Monto Recibido', field: 'monto1', 
		          					editable: true, 
		          					width: '100px', 
		          					type: gridCellsDijit._Widget,
		          				    widgetClass: ValidationTextBox, 
		          				    widgetProps: {uppercase:'true', maxlength: 250}
		          	                 
		          			    },
		          			  { name: 'Monto Recibido Letra ', field: '_item', 
		          					width: '100px', 
		          					formatter: function (item,rowIndex,cell){
		          						var store=cell.grid.store;
		          						var valor=store.getValue(item,'monto1')==null?0:store.getValue(item,'monto1');
		          						
		          						return valor==0?'': jsUtils.covertirNumLetras(valor.toString());
		          					}
		          	                 
		          			    },
		          			  { name: 'Monto Ejercido', field: 'monto2', 
		          					editable: true, 
		          					width: '100px', 
		          					type: gridCellsDijit._Widget,
		          				    widgetClass: ValidationTextBox, 
		          				    widgetProps: {uppercase:'true', maxlength: 250}
		          	                 
		          			    },
		          			  { name: 'Monto Ejercido Letra ', field: '_item', 
		          					width: '100px', 
		          					formatter: function (item,rowIndex,cell){
		          						var store=cell.grid.store;
		          						var valor=store.getValue(item,'monto2')==null?0:store.getValue(item,'monto2');
		          						
		          						return valor==0?'': jsUtils.covertirNumLetras(valor.toString());
		          					}
		          	                 
		          			    },
			          			{ name: 'Fuente de recursos prevista', field: 'fuente', 
		          					editable: true, 
		          					width: '200px', 
		          					type: dojox.grid.cells.ComboBox,
		          	                options: ["Donaciones a la escuela de personas f\u00edsicas o morales","Recursos recabados por rifas o eventos organizados por la escuela","Asociaci\u00f3n de Padres de Familia","Aportaciones extraordinarias de los padres de familia","Otro"] 
		          			    },
		          			
			          			
			          		]];
			          		
	        new DataGrid({
	          		id: 'GridDtA',
	          		structure: layoutDt,
	          		autoHeight: true,
	          		rowSelector: '30px'}
	          	   ,'GridDtA').startup();

	       
	        var dataDtA = {
	          		identifier: "idActividad",
	          		items: []
	          	};
			    
	        var n = 0;
	        
	        if(edit==true){			        				        
		        for(var objActividad in listDetalleG){
		        	if(itemToEdit.idCategoria>=11){
		        		dom.byId('otro1Visible').style.display='block';
	        			dom.byId('otro2Visible').style.display='block';
	        			dom.byId('otro3Visible').style.display='block';
	        			dom.byId('otro4Visible').style.display='block';
	        			dom.byId('otroCumplio').style.display='block';
	        			dom.byId('trMonto').style.display='block';
	        			dom.byId('trMonto2').style.display='block';
	        			//registry.byId('strObjetivo').set ('required',true);
	        			//registry.byId('strMeta').set ('required',true);
	        			registry.byId('GridDtA').set("style","display:none");
		        	} else {			
		        		dom.byId('otro1Visible').style.display='none';
	        			dom.byId('otro2Visible').style.display='none';
	        			dom.byId('otro3Visible').style.display='none';
	        			dom.byId('otro4Visible').style.display='none';
	        			dom.byId('trMonto').style.display='none';
	        			dom.byId('trMonto2').style.display='none';
	        			dom.byId('otroCumplio').style.display='none';
				        if(listDetalleG[objActividad].idProg == itemToEdit.idCategoria ){
	        			var tmpMeta = "";
	        			var tmpSeleccion = false;
	        			var tmpMonto1 = "";
	        			var tmpMontoStr1 = "";
	        			var tmpMonto2 = "";
	        			var tmpMontoStr2 = "";
	        			
	        			if(itemToEdit.nomActividad==null){
	        				for(var idI in categoriasRegistrados){
	        					if(categoriasRegistrados[idI].ceActividad = itemToEdit.idCategoria){
									if(categoriasRegistrados[idI].idobj == listDetalleG[objActividad].id){
									tmpSeleccion = true;
									tmpMeta=categoriasRegistrados[idI].meta;	
									tmpMonto1=categoriasRegistrados[idI].monto1==null?0:categoriasRegistrados[idI].monto1;
									tmpMontoStr1=categoriasRegistrados[idI].montoStr1==null?"":categoriasRegistrados[idI].montoStr1;
									tmpMonto2=categoriasRegistrados[idI].monto2==null?0:categoriasRegistrados[idI].monto2;
									tmpMontoStr2=categoriasRegistrados[idI].montoStr2==null?"":categoriasRegistrados[idI].montoStr2;
									}			        						
	        					}
	        				}
	        			}else{
						for(var idObjActividad in itemToEdit.nomActividad){
																
							if(itemToEdit.nomActividad[idObjActividad].idObjetivo == listDetalleG[objActividad].id){
								tmpSeleccion = true;
								tmpMeta=itemToEdit.nomActividad[idObjActividad].meta;
							    tmpMonto1=itemToEdit.nomActividad[idObjActividad].monto1==null?0:itemToEdit.nomActividad[idObjActividad].monto1;
								tmpMontoStr1=itemToEdit.nomActividad[idObjActividad].montoStr1==null?"":itemToEdit.nomActividad[idObjActividad].montoStr1;
								tmpMonto2=itemToEdit.nomActividad[idObjActividad].monto2==null?0:itemToEdit.nomActividad[idObjActividad].monto2;
								tmpMontoStr2=itemToEdit.nomActividad[idObjActividad].montoStr2==null?"":itemToEdit.nomActividad[idObjActividad].montoStr2;
								}
							
							}
				        }
						
	        			var arregloObjetivos1 = {
					        	                  	id:+n,
					        	                  	idActividad: listDetalleG[objActividad].id,
				    					        	idSeleccion : tmpSeleccion	,
				    					        	actividad : listDetalleG[objActividad].name,
				    					        	meta:tmpMeta,
				    					        	monto1:tmpMonto1,
				    					        	montoStr1:tmpMontoStr1,
				    					        	monto2:tmpMonto2,
				    					        	montoStr2:tmpMontoStr2
								   				};			        						        			
					        
	        			dataDtA.items.push(arregloObjetivos1);    					         
	        		}
	        	} 
	        }
	        }else {
	        	dom.byId('otro1Visible').style.display='none';
  			dom.byId('otro2Visible').style.display='none';
  			dom.byId('otro3Visible').style.display='none';
  			dom.byId('otro4Visible').style.display='none';
  			dom.byId('trMonto').style.display='none';
  			dom.byId('trMonto2').style.display='none';
  			dom.byId('otroCumplio').style.display='none';
  			
	        }
	        
	        if(edit==true)
	        {
	        	
	        	for ( var i = 0; i < dataDtA.items.length; i++) {

	        		 for(var j =0;j<itemToEdit.nomActividad.length;j++ ){
						
						if(dataDtA.items[i].idActividad==itemToEdit.nomActividad[j].idObjetivo)
							{
							if(itemToEdit.nomActividad[j].fuente == 1){
								dataDtA.items[i].fuente = "Donaciones a la escuela de personas f\u00edsicas o morales";
								
							} else if( itemToEdit.nomActividad[j].fuente == 2){
								dataDtA.items[i].fuente= "Recursos recabados por rifas o eventos organizados por la escuela";
								
							} else if( itemToEdit.nomActividad[j].fuente == 3){
								dataDtA.items[i].fuente= "Asociaci\u00f3n de Padres de Familia";
								
							}
							else if( itemToEdit.nomActividad[j].fuente == 4){
								dataDtA.items[i].fuente= "Aportaciones extraordinarias de los padres de familia";
								
							}
							else if( itemToEdit.nomActividad[j].fuente == 5){
								dataDtA.items[i].fuente= "Otro";
								
							}
							
							if( itemToEdit.nomActividad[j].cumplio == 1){
								dataDtA.items[i].cumplio= "Si";
								
							}
							else if( itemToEdit.nomActividad[j].cumplio == 2){
								dataDtA.items[i].cumplio= "No";
								
							}

						}
	        		 }
	        	}
	        }
	        
	        var newStoreDtA = new ItemFileWriteStore({data: dataDtA});
	        
	        registry.byId('GridDtA').setStore(newStoreDtA);
	        
		    //---------------------------------- Datos
		        
		    var data=[{name:"[Seleccione]",	id:"0"}];
		     data.push({name:"Aulas y bibliotecas",id:1});
		     data.push({name:"Servicio el\u00e9ctrico",id:2});
		     data.push({name:"Drenaje",id:3});
		     data.push({name:"Plaza c\u00edvica",id:4});
			 data.push({name:"Instalaciones hidrosanitarias",id:5});
			 data.push({name:"Herrer\u00eda",id:6});
			 data.push({name:"Techos",id:7});
			 data.push({name:"Barda perimetral",id:8});
			 data.push({name:"Instalaciones f\u00edsicas y mobiliario",id:9});
			 data.push({name:"\u00c1reas verdes",id:10});
			 data.push({name:"Otro",id:11});
			 data.push({name:"Otro",id:12});
			 data.push({name:"Otro",id:13});
      	
			  var dataF=[{name:"[Seleccione]",	id:"0"}];
			     dataF.push({name:"Donaciones a la escuela de personas f\u00edsicas o morales",id:1});
			     dataF.push({name:"Recursos recabados por rifas o eventos organizados por la escuela",id:2});
			     dataF.push({name:"Asociaci\u00f3n de Padres de Familia",id:3});
			     dataF.push({name:"Aportaciones extraordinarias de los padres de familia",id:4});
   			 dataF.push({name:"Otro",id:5});
   			 
   		  var dataC=[{name:"[Seleccione]",	id:"0"}];
		     dataC.push({name:"Si",id:1});
		     dataC.push({name:"No",id:2});
		     
		   
		     
   		


		    var pStore = new Memory({
		        data: data
		    });
		    var pFStore = new Memory({
		        data: dataF
		    });
		    
		    
		    var pCStore = new Memory({
		        data: dataC
		    });
		    //---------------------------------- Dojo
		    
		    var strActividad = new ValidationTextBox({
 		           promptMessage:"Actividad de la categoria",
 		           value:itemToEdit.objetivo, 
 		           trim:"true",  
 		           uppercase: true,
 		           maxLength:"250",
 		           style:"display:block; width:280px"
 		        }, 'strActividad');
  			   
   			var strMeta = new ValidationTextBox({
 		           promptMessage:"Meta de la escuela",
 		           value:itemToEdit.meta, 
 		           trim:"true",
 		           uppercase: true,
 		           maxLength:"250",
 		           style:"display:block; width:280px"
 		        }, 'strMeta');
		    
		    var nomOtroCategoria = new ValidationTextBox({
		           promptMessage:"Nombre de Otro Categoria",
		           value:itemToEdit.nomOtraCategoria, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           style:"display:block; width:280px"
		        }, 'nomOtroCategoria');
		    
		    new FilteringSelect({
	           id: 'prSelect',
	           value:itemToEdit.idCategoria,
	           store: pStore,
	           readOnly:edit,
	           searchAttr: 'name'
	        }, 'prSelect').on ('change', function(){     		    	   	    		    	  		    		  	    		   

      	    var gridAct = registry.byId('10Grid');
	        	for ( var i = 0; i < gridAct.rowCount; i++) {

	 				var item = gridAct.getItem(i);
	 				
	 				if( gridAct.store.getValue(item,'idCategoria') == registry.byId("prSelect").get('value')){
	 					registry.byId('prSelect').set ('value',0);
	 					utils.cstmAlert("Ya existe registrada la Categoria");
	 					return;
	 				}

	 			}
	        	if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
		    		
      			
      			dom.byId('otro1Visible').style.display='block';
      			dom.byId('otro2Visible').style.display='block';
      			dom.byId('otro3Visible').style.display='block';
      			dom.byId('otro4Visible').style.display='block';
      			dom.byId('trMonto').style.display='block';
      			dom.byId('trMonto2').style.display='block';
      			dom.byId('otroCumplio').style.display='block';
      			registry.byId('strActividad').set ('required',true);
      			registry.byId('strMeta').set ('required',true);
      			registry.byId('nomOtroCategoria').set ('required',true);
      			registry.byId('strmonto1').set ('required',true);
      			registry.byId('strmonto2').set ('required',true);
      			registry.byId('GridDtA').set("style","display:none");
      			    		        			
      		} else {    
      			if(dom.byId('GridDtA').style.display=='none'){
      				dom.byId('otro1Visible').style.display='none';
	        			dom.byId('otro2Visible').style.display='none';
	        			dom.byId('otro3Visible').style.display='none';
	        			dom.byId('otro4Visible').style.display='none';
	        			dom.byId('trMonto').style.display='none';
	        			dom.byId('trMonto2').style.display='none';
	        			dom.byId('otroCumplio').style.display='none';
	        			registry.byId('strActividad').set ('required',false);
	        			registry.byId('strMeta').set ('required',false);
	        			registry.byId('nomOtroCategoria').set ('required',false);
	        			registry.byId('strmonto1').set ('required',false);
	        			registry.byId('strmonto2').set ('required',false);
			        	registry.byId('GridDtA').set("style","display:block");        		        			
			        }
	        	
	        	n= 0;    		        	
	        	var dataDt1 = {
		          		identifier: "idActividad",
		          		items: []
		          	};
	        	
	        	for(var objActividad in listDetalleG){
	        		if(listDetalleG[objActividad].idProg == registry.byId("prSelect").get('value')){
	        			var arregloObjetivos1 = {
					        	                  	id:+n,
					        	                  	idActividad: listDetalleG[objActividad].id,
				    					        	idSeleccion : false	,
				    					        	actividad : listDetalleG[objActividad].name,
				    					        	meta:" "
								   				};
					        
				        dataDt1.items.push(arregloObjetivos1);    					         
	        		}
	        	}    		        	    		        	
		        
	        	var newStoreDt1 = new ItemFileWriteStore({data: dataDt1});
		        registry.byId('GridDtA').setStore(newStoreDt1);				        
      		}
	        });
		    
		    new FilteringSelect({
	           id: 'prFuente',
	           value:itemToEdit.fuente,
	           store: pFStore,
	           searchAttr: 'name'
	        }, 'prFuente');
		    
		    
		    new FilteringSelect({
		           id: 'prCumplio',
		           value:itemToEdit.cumplio,
		           store: pCStore,
		           searchAttr: 'name'
		        }, 'prCumplio');
			    
		    
		    var strmonto1=  new ValidationTextBox({
	 	           promptMessage:"Capture solo n\u00FAmeros",
	 	           id:'strmonto1',
	 	           regExp: constants.NUMBER_VALID,
	 	           value:itemToEdit.monto1, 
	 	           trim:"true",  
	 	           maxLength:"9",
//	 	           required: "true",
	 	           style:"display:block; width:280px"
	 	        }, 'strmonto1').on ('Blur', function(){	   
	 				   var monto1= registry.byId("strmonto1").get('value');		       
	 				   	if(monto1!=''){			       
	 				       if(monto1==0){
	 				    	   registry.byId('strmontoStr1').set('value','CERO');
	 				       } else if(monto1>=0){			    	   
	 				    		registry.byId('strmontoStr1').set('value',jsUtils.covertirNumLetras(registry.byId("strmonto1").get('value')));    					    	   
	 				       } else{
	 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
	 							return false;
	 				       }
	 			       	}
	 	        });
	 			    
	 		    var strmontoStr1= new ValidationTextBox({
	 	           promptMessage:"Capture solo letras",
	 	           value:itemToEdit.montoStr1, 
	 	           regExp:constants.NoNUMBER_VALID,
	 	           id:'strmontoStr1',
	 	           trim:"true",    
	 	           maxLength:"200",
	 	           style:"display:block; width:480px",
	 	           readOnly: true,
//	 	           required: "true"
	 	        }, 'strmontoStr1');
	 		    
		    
	 		    
	 		   var strmonto2=  new ValidationTextBox({
	 	           promptMessage:"Capture solo n\u00FAmeros",
	 	           id:'strmonto2',
	 	           regExp: constants.NUMBER_VALID,
	 	           value:itemToEdit.monto2, 
	 	           trim:"true",  
	 	           maxLength:"9",
//	 	           required: "true",
	 	           style:"display:block; width:280px"
	 	        }, 'strmonto2').on ('Blur', function(){	   
	 				   var monto2= registry.byId("strmonto2").get('value');		       
	 				   	if(monto2!=''){			       
	 				       if(monto2==0){
	 				    	   registry.byId('strmontoStr2').set('value','CERO');
	 				       } else if(monto2>=0){			    	   
	 				    		registry.byId('strmontoStr2').set('value',jsUtils.covertirNumLetras(registry.byId("strmonto2").get('value')));    					    	   
	 				       } else{
	 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
	 							return false;
	 				       }
	 			       	}
	 	        });
	 			    
	 		    var strmontoStr2= new ValidationTextBox({
	 	           promptMessage:"Capture solo letras",
	 	           value:itemToEdit.montoStr2, 
	 	           regExp:constants.NoNUMBER_VALID,
	 	           id:'strmontoStr2',
	 	           trim:"true",    
	 	           maxLength:"200",
	 	           style:"display:block; width:480px",
	 	           readOnly: true,
//	 	           required: "true"
	 	        }, 'strmontoStr2');
		   //------------------------------------
		    jsUtils.createTag('div','prBtnAceptar','dcDetail');
		    new Button({
		    				label : " Aceptar " ,
		    				onClick : function() {


			    					var form = registry.byId('dDetail');       			    				
			    					var actividadesGrid = registry.byId('GridDtA');

			    					var tmpActividad = "";
			    					var tmpMeta = "";
			    					var tmpnomOtroCategoria = "";
			    					var tmpFuente = "";
			    					var tmpMonto1 = "";
			    					var tmpMontoStr1 = "";
			    					var tmpMonto2 = "";
			    					var tmpMontoStr2 = "";
			    					var tmpCumplio = "";
			    					itemsVacios = 0;
			    					
		    					if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
		    						
		    						if( registry.byId("strmonto1").get('value') == null || registry.byId("strmonto1").get('value') == ''){
		    							utils.cstmAlert('Favor de registrar el monto Recibido');
			    						return false;
		    						}
		    						if( registry.byId("strmonto2").get('value') == null || registry.byId("strmonto2").get('value') == ''){
		    							utils.cstmAlert('Favor de registrar el monto Gastado');
			    						return false;
		    						}
		    						if( registry.byId("strActividad").get('value') == null || registry.byId("strActividad").get('value') == ''){
		    							utils.cstmAlert('Favor de registrar la actividad de la categoria ');
			    						return false;
		    						}
		    						if( registry.byId("strMeta").get('value') == null || registry.byId("strMeta").get('value') == ''){
		    							utils.cstmAlert('Favor de registrar la meta dela categoria Otro');
			    						return false;
		    						}
		    						if( registry.byId("nomOtroCategoria").get('value') == null || registry.byId("nomOtroCategoria").get('value') == ''){
		    							utils.cstmAlert('Favor de registrar el nombre de la categoria Otro');
			    						return false;
		    						}
		    						if( registry.byId("prFuente").get('value') == null || registry.byId("prFuente").get('value') == '' || registry.byId("prFuente").get('value') == 0){
		    							utils.cstmAlert('Favor de registrar la fuente');
			    						return false;
		    						}
		    						if( registry.byId("prCumplio").get('value') == null || registry.byId("prCumplio").get('value') == '' || registry.byId("prCumplio").get('value') ==0){
		    							utils.cstmAlert('Favor de registrar si se cumplio la meta');
			    						return false;
		    						}
		    						
		    						itemsVacios = 1;
		    						tmpActividad = registry.byId("strActividad").get('value');
		    						tmpMeta = registry.byId("strMeta").get('value');
		    						tmpnomOtroCategoria = registry.byId("nomOtroCategoria").get('value');
		    						tmpFuente = registry.byId("prFuente").get('value');
		    						tmpMonto1=registry.byId("strmonto1").get('value');
		    						tmpMontoStr1=registry.byId("strmontoStr1").get('value');
		    						tmpMonto2=registry.byId("strmonto2").get('value');
		    						tmpMontoStr2=registry.byId("strmontoStr2").get('value');
		    						tmpCumplio=registry.byId("prCumplio").get('value');
		    						
		    					} 
		    					
			    					
			    					
			    					longitudMeta = 0;
			    					for ( var i = 0; i < actividadesGrid.rowCount; i++) {

			    						var item = actividadesGrid.getItem(i);														
			    									
			    						if( actividadesGrid.store.getValue(item,'meta') != null && actividadesGrid.store.getValue(item,'meta').trim() != "" ){
			    							itemsVacios=1;
			    							if(actividadesGrid.store.getValue(item,'meta').length>250){
			    								longitudMeta=1;
			    							}
			    						}
			    					}
			    					if (itemsVacios==0){
			    					//if (!form.validate() || itemsVacios==0){  
			    						utils.cstmAlert('Favor de registrar los datos requeridos');
			    						return false;
			    					}
			    					
			    					if (longitudMeta!=0){  
			    						utils.cstmAlert('La longitud m\u00e1xima de una meta es de 250 caracteres');
			    						return false;
			    					}
		    						var actividadSel = new Array();      			    					
			    					
			    					for ( var i = 0; i < actividadesGrid.rowCount; i++) {

			    						var item = actividadesGrid.getItem(i);
			    									
			    						if( actividadesGrid.store.getValue(item,'meta') != null && actividadesGrid.store.getValue(item,'meta').trim() != "" ){
			    							
			    							idFuente = 0;
			    							if( actividadesGrid.store.getValue(item,'fuente') == "Donaciones a la escuela de personas f\u00edsicas o morales" ){
			    								idFuente = 1;
			    							} else if( actividadesGrid.store.getValue(item,'fuente') == "Recursos recabados por rifas o eventos organizados por la escuela" ){
			    								idFuente = 2;
			    							} else if( actividadesGrid.store.getValue(item,'fuente') == "Asociaci\u00f3n de Padres de Familia" ){
			    								idFuente = 3;
			    							} else if( actividadesGrid.store.getValue(item,'fuente') == "Aportaciones extraordinarias de los padres de familia" ){
			    								idFuente = 4;
			    							} else if( actividadesGrid.store.getValue(item,'fuente') == "Otro" ){
			    								idFuente = 5;
			    							}
			    							
			    							idCumplio=0;
			    							if( actividadesGrid.store.getValue(item,'cumplio') == "Si" ){
			    								idCumplio = 1;
			    							} else if( actividadesGrid.store.getValue(item,'cumplio') == "No" ){
			    								idCumplio = 2;
			    							}
			    							
			    							if(edit==true){
			    							  if(idFuente==0)
			    								{
			    								  for(var j =0;j<itemToEdit.nomActividad.length;j++ ){
			    								if(itemToEdit.nomActividad[j].idObjetivo==actividadesGrid.store.getValue(item,'idActividad'))
			    									{
			    									idFuente=itemToEdit.nomActividad[j].fuente;
			    									}
			    								}
			    							 	}
			    							}
			    							
			    							if(edit==true){
				    							  if(idCumplio==0)
				    								{
				    								  for(var j =0;j<itemToEdit.nomActividad.length;j++ ){
				    								if(itemToEdit.nomActividad[j].idObjetivo==actividadesGrid.store.getValue(item,'idActividad'))
				    									{
				    									idCumplio=itemToEdit.nomActividad[j].cumplio;
				    									}
				    								}
				    							 	}
				    							}
			    							var cesion=null;
			    							if(edit){
			    								cesion=itemToEdit.nomActividad[0].cSesion;
			    							}
			    							
			    							var actividades = {
			    												idObjetivo : actividadesGrid.store.getValue(item,'idActividad'),       	       			    							
	       	       			    							meta : 		 actividadesGrid.store.getValue(item,'meta'),
	       	       			    						    cSesion :  cesion,
	       	       			    							fuente :     idFuente,
	       	       			    						    cumplio :     idCumplio,
	       	       			    						    monto1 :     actividadesGrid.store.getValue(item,'monto1'),
	       	       			    						    montoStr1 :   jsUtils.covertirNumLetras(actividadesGrid.store.getValue(item,'monto1').toString()),
	       	       			    					        monto2 :     actividadesGrid.store.getValue(item,'monto2'),
     	       			    						        montoStr2 :   jsUtils.covertirNumLetras(actividadesGrid.store.getValue(item,'monto2').toString())
     	       			    						  			  
			    							};
			    							
			    							if( actividades.meta != null &&  actividades.meta != '' ){
				    						
			    								if( actividades.fuente == '' || actividades.fuente ==0){
					    							utils.cstmAlert('Favor de registrar la fuente de la actividad '+ actividades.idObjetivo);
						    						return false;
					    						}
			    								
			    								
			    								if( actividades.cumplio == '' || actividades.cumplio == null){
					    							utils.cstmAlert('Favor de registrar si se cumplio la meta de la actividad '+ actividades.idObjetivo);
						    						return false;
					    						}
			    								
				    						}
			    							
			    							
    			    						actividadSel.push(actividades);	
			    						}
			    						
			    					}
		    		
//			    					if(registry.byId("strmonto2").get('value') > registry.byId("strmonto1").get('value')){
//			    						utils.cstmAlert('Favor de registrar un monto Gastado igual o menor que el monto Recabado');
//			    						return false;	
//			    					}
			    					
			    					
			    					var grid = registry.byId('10Grid');
			    					try{
			    						if(edit){
			    							var index = grid.selection.selectedIndex;
			    							var item = grid.getItem(index);       			    							       			    							
			    							grid.store.setValue(item, 'nomActividad',  actividadSel);
			    							grid.store.setValue(item, 'objetivo', tmpActividad);
		    							    grid.store.setValue(item, 'meta', tmpMeta);
		    							    grid.store.setValue(item, 'cumplio', tmpCumplio);
		    							    grid.store.setValue(item, 'nomOtraCategoria', tmpnomOtroCategoria);
		    							    grid.store.setValue(item, 'fuente', tmpFuente);
		    								grid.store.setValue(item, 'monto1', tmpMonto1);
		     	 							grid.store.setValue(item, 'montoStr1',tmpMontoStr1);
		     	 							grid.store.setValue(item, 'monto2',tmpMonto2);
		     	 							grid.store.setValue(item, 'montoStr2',tmpMontoStr2);
		     	 							} else {
			    							 var myNewItem = {  cPrograma: ++maxIndexActividades, 
			    									 			idCategoria: registry.byId("prSelect").get('value'),
			    									 			nomCategoria:  registry.byId("prSelect").get('displayedValue'),
			    									 			nomActividad:  actividadSel,
			    									 			objetivo: tmpActividad,
			    									 			meta: tmpMeta,
			    									 		    nomOtraCategoria: tmpnomOtroCategoria,
			    									 		    fuente: tmpFuente,
			    									 		    cumplio: tmpCumplio,
			    									 		    monto1:tmpMonto1,
		 				    									montoStr1:tmpMontoStr1,
		 				    						 		    monto2:  tmpMonto2,
		 				    									montoStr2: tmpMontoStr2
		 				    			};	    							 
		    						         grid.store.newItem(myNewItem);
			    						}
			    						registry.byId('dDetail').destroyRecursive(false);
			    					}catch(e){
			    						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
			    						console.log(e);
			    					}	
		    				}     			    				
		    			},'prBtnAceptar');
	    }
		function actividadesFun() {
 			if(listDetalleG.length==0){			 						 		
 				listDetalleG= new Array();
 				listDetalleG.push({name:"Construcci\u00F3n de aula",id:1, idProg:1});
 				listDetalleG.push({name:"Construcci\u00F3n de biblioteca",id:2, idProg:1});
 				listDetalleG.push({name:"Reparaci\u00F3n de aula",id:3, idProg:1});
 				listDetalleG.push({name:"Reparaci\u00F3n de biblioteca",id:4, idProg:1});
 				listDetalleG.push({name:"Instalaci\u00F3n de servicio el\u00E9ctrico.",id:5, idProg:2});
 				listDetalleG.push({name:"Reparaci\u00F3n de instalaci\u00F3n de luz el\u00E9ctrica",id:6, idProg:2});
 				listDetalleG.push({name:"Introducci\u00F3n  de drenaje",id:7, idProg:3});
 				listDetalleG.push({name:"Reparaci\u00F3n de drenaje",id:8, idProg:3});
 				listDetalleG.push({name:"Construcci\u00F3n de plaza c\u00edvica",id:9, idProg:4});
 				listDetalleG.push({name:"Reparaci\u00F3n de plaza c\u00edvica",id:10, idProg:4});
 				listDetalleG.push({name:"Construcci\u00F3n de sanitarios",id:11, idProg:5});
 				listDetalleG.push({name:"Reparaci\u00F3n de sanitarios",id:12, idProg:5});
 				listDetalleG.push({name:"Instalaci\u00F3n de bebederos",id:13, idProg:5});
 				listDetalleG.push({name:"Instalaci\u00F3n de herrer\u00edas",id:14, idProg:6});
 				listDetalleG.push({name:"Mantenimiento de herrer\u00eda",id:15, idProg:6});
 				listDetalleG.push({name:"Construcci\u00F3n  de techos",id:16, idProg:7});
 				listDetalleG.push({name:"Reparaci\u00F3n de techos",id:17, idProg:7});
 				listDetalleG.push({name:"Construcci\u00F3n de barda perimetral",id:18, idProg:8});
 				listDetalleG.push({name:"Mantenimiento a instalaciones",id:19, idProg:9});
 				listDetalleG.push({name:"Mantenimiento a mobiliario.",id:20, idProg:9});
 				listDetalleG.push({name:"Creaci\u00F3n de \u00e1reas verdes",id:21, idProg:10});
 				listDetalleG.push({name:"Mantenimiento de \u00e1reas verdes",id:22, idProg:10});
// 				listDetalleG.push({name:"Otro",id:23, idProg:11});
// 				listDetalleG.push({name:"Otro",id:24, idProg:12});
// 				listDetalleG.push({name:"Otro",id:25, idProg:13});
 				
 				listFuenteActividad = new Array();
 				listFuenteActividad.push({name:"Donaciones a la escuela de personas f\u00edsicas o morales.",id:1});
 				listFuenteActividad.push({name:"Recursos recabados por rifas o eventos organizados por la escuela.",id:2});
 				listFuenteActividad.push({name:"Asociaci\u00F3n de Padres de Familia.",id:3});
 				listFuenteActividad.push({name:"Aportaciones extraordinarias de los padres de familia.",id:4});
 				listFuenteActividad.push({name:"Otros",id:5});
 						 				
 			}
 		}
 	
		
		function despliegaPreguntasEstatales(crea){
			if(crea){
				if(!registry.byId(id)){
					if(!registry.byId('pregunta1ae')){
			   //var id="preguntasPane"; 
			   var contenido= '<table border="0" align="lefth" >'+ 
			   '<tr><td>'+ 
			   '	<p> <b> \u00BF El Consejo Escolar sabe si est\u00e1 constituido el Consejo Estatal de Participaci\u00f3n Social en la Educaci\u00f3n?</b></p>'+
			   '	<input id="pregunta1ae"/><label for="pregunta1ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta1be"/><label for="pregunta1be">No</label>'+
			   '	<br/><input id="pregunta1ce"/><label for="pregunta1ce">No sabe</label>'+
			   '</td></tr>'+
			   '<tr><td id="otro1Visiblee" >'+ 
			   '	<p> <b> \u00BF El Consejo Estatal de Participaci\u00f3n Social en la Educaci\u00f3n, le dio seguimiento  a los resultados y los acuerdos llevados a cabo en la evaluaci\u00f3n efectuada en el centro escolar?</b></p>'+
			   '	<input id="pregunta2ae"/><label for="pregunta2ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta2be"/><label for="pregunta2be">No</label>'+
			   '</td></tr>'+
			   '<tr><td id="otro2Visiblee" >'+ 
			   '	<p> <b> \u00BF El Consejo Estatal de Participaci\u00f3n Social en la Educaci\u00f3n, apoy\u00f3 al Consejo Escolar de Participaci\u00f3n Social en alguna actividad o gesti\u00f3n ante alguna dependencia gubernamental u otra instituci\u00f3n?</b></p>'+
			   '	<input id="pregunta3ae"/><label for="pregunta3ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta3be"/><label for="pregunta3be">No</label>'+
			   '</td></tr>'+
			  '</table>';
			  
			   dom.byId('preguntasEstatalPane').innerHTML=contenido;
			   
			   
			   if(segundaAsambleaObj.preguntasEstatal!=null){
				   if(segundaAsambleaObj.preguntasEstatal.respuesta1==2 || segundaAsambleaObj.preguntasEstatal.respuesta1==3){
					   
					   dom.byId('otro1Visiblee').style.display='none';
			    	   dom.byId('otro2Visiblee').style.display='none';
				   }
				   
			   }
			   
			   
					    var pregunta1ae= new RadioButton({
					           checked:segundaAsambleaObj.preguntasEstatal==null?true: segundaAsambleaObj.preguntasEstatal.respuesta1==1 ? true:false,
					           value: "1",
					           name: "pregunta1e",
					           id:"pregunta1ae"
					       }, "pregunta1ae").on('click',function(){
					    	   dom.byId('otro1Visiblee').style.display='block';
					    	   dom.byId('otro2Visiblee').style.display='block';
					       });
						   
						  var pregunta1be=new RadioButton({
					           checked:segundaAsambleaObj.preguntasEstatal==null?false: segundaAsambleaObj.preguntasEstatal.respuesta1==2 ? true:false,
					           value: "2",
					           name: "pregunta1e",
					           id:"pregunta1be"
					       }, "pregunta1be").on('click',function(){
					    	   dom.byId('otro1Visiblee').style.display='none';
					    	   dom.byId('otro2Visiblee').style.display='none';
					       });
						  
						  var pregunta1ce=new RadioButton({
					           checked:segundaAsambleaObj.preguntasEstatal==null?false: segundaAsambleaObj.preguntasEstatal.respuesta1==3 ? true:false,
					           value: "3",
					           name: "pregunta1e",
					           id:"pregunta1ce"
					       }, "pregunta1ce").on('click',function(){
					    	   dom.byId('otro1Visiblee').style.display='none';
					    	   dom.byId('otro2Visiblee').style.display='none';
					       });
						  
						  var pregunta2ae= new RadioButton({
					           checked:segundaAsambleaObj.preguntasEstatal==null?true: segundaAsambleaObj.preguntasEstatal.respuesta2==1 ? true:false,
					           value: "1",
					           name: "pregunta2e",
					           id:"pregunta2ae"
					       }, "pregunta2ae");
						   
						  var pregunta2be=new RadioButton({
					           checked: segundaAsambleaObj.preguntasEstatal==null?false:segundaAsambleaObj.preguntasEstatal.respuesta2==2 ? true:false,
					           value: "2",
					           name: "pregunta2e",
					           id:"pregunta2be"
					       }, "pregunta2be");
						  
						  var pregunta3ae= new RadioButton({
					           checked:segundaAsambleaObj.preguntasEstatal==null?true: segundaAsambleaObj.preguntasEstatal.respuesta3==1 ? true:false,
					           value: "1",
					           name: "pregunta3e",
					           id:"pregunta3ae"
					       }, "pregunta3ae");
						   
						  var pregunta3be=new RadioButton({
					           checked: segundaAsambleaObj.preguntasEstatal==null?false:segundaAsambleaObj.preguntasEstatal.respuesta3==2 ? true:false,
					           value: "2",
					           name: "pregunta3e",
					           id:"pregunta3be"
					       }, "pregunta3be");
						  
						
				   	}
				}
				
			}
			else{
				   if(registry.byId(id)){
					   registry.byId('pestanias').closeChild(registry.byId(id));
				   }   
				}
			
		}
		
		
		function despliegaPreguntasMunicipales(crea){
			if(crea){
				if(!registry.byId(id)){
					if(!registry.byId('pregunta1am')){
			   //var id="preguntasPane"; 
			   var contenido= '<table border="0" align="lefth" >'+ 
			   '<tr><td>'+ 
			   '	<p> <b> \u00BF El Consejo Escolar sabe si est\u00e1 constituido el Consejo Municipal de Participaci\u00f3n Social en la Educaci\u00f3n?</b></p>'+
			   '	<input id="pregunta1am"/><label for="pregunta1am">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta1bm"/><label for="pregunta1bm">No</label>'+
			   '	<br/><input id="pregunta1cm"/><label for="pregunta1cm">No sabe</label>'+
			   '</td></tr>'+
			   '<tr><td id="otro1Visiblem">'+ 
			   '	<p> <b> \u00BF El Consejo Municipal de Participaci\u00f3n Social en la Educaci\u00f3n, le dio seguimiento a los resultados y acuerdos llevados a cabo en la  evaluaci\u00f3n del centro escolar?</b></p>'+
			   '	<input id="pregunta2am"/><label for="pregunta2am">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta2bm"/><label for="pregunta2bm">No</label>'+
			   '</td></tr>'+
			   '<tr><td id="otro2Visiblem">'+ 
			   '	<p> <b> \u00BF El Consejo Municipal de Participaci\u00f3n Social en la Educaci\u00f3n, apoy\u00f3 con alg\u00fan programa o capacitaci\u00f3n al Consejo Escolar de Participaci\u00f3n Social?</b></p>'+
			   '	<input id="pregunta3am"/><label for="pregunta3am">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta3bm"/><label for="pregunta3bm">No</label>'+
			   '</td></tr>'+
			   '</td></tr>'+
			   '<tr><td id="otro3Visiblem">'+ 
			   '	<p> <b> \u00BF El Consejo Municipal de Participaci\u00f3n Social en la Educaci\u00f3n, otorg\u00f3 alg\u00fan apoyo al Consejo Escolar de Participaci\u00f3n Social?</b></p>'+
			   '	<input id="pregunta4am"/><label for="pregunta4am">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta4bm"/><label for="pregunta4bm">No</label>'+
			   '</td></tr>'+
			   '</td></tr>'+
			   '<tr><td id="otro4Visiblem">'+ 
			   '	<p> <b> \u00BF El Consejo Municipal de Participaci\u00f3n Social en la Educaci\u00f3n, apoy\u00f3 al Consejo Escolar de Participaci\u00f3n Social en alguna gesti\u00f3n ante alguna dependencia gubernamental u otra instituci\u00f3n?</b></p>'+
			   '	<input id="pregunta5am"/><label for="pregunta5am">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta5bm"/><label for="pregunta5bm">No</label>'+
			   '</td></tr>'+
			   '<tr>'+
			   '<td id="otro5Visiblem" >'+
			        '<input id="emGrid"/>'+
			    '</td>'+
				'</tr>'+
				'<tr>' +
				'<td id="otro6Visiblem">'+
					'<input id="a_emGrid"/>'+
					'<input id="e_emGrid"/>'+
					'<input id="d_emGrid"/>'+
				'</td>'+
			  '</table>';
			  
			   dom.byId('preguntasMunicipalPane').innerHTML=contenido;
			   
			   
			   if(segundaAsambleaObj.preguntasMunicipal!=null){
				   if(segundaAsambleaObj.preguntasMunicipal.respuesta1==2 || segundaAsambleaObj.preguntasMunicipal.respuesta1==3){
					   
					   dom.byId('otro1Visiblem').style.display='none';
			    	   dom.byId('otro2Visiblem').style.display='none';
			    	   dom.byId('otro3Visiblem').style.display='none';
			    	   dom.byId('otro4Visiblem').style.display='none';
			    	   dom.byId('otro5Visiblem').style.display='none';
			    	   dom.byId('otro6Visiblem').style.display='none';
				   }
				   
			   }
			   
					    var pregunta1am= new RadioButton({
					           checked:segundaAsambleaObj.preguntasMunicipal==null?true: segundaAsambleaObj.preguntasMunicipal.respuesta1==1 ? true:false,
					           value: "1",
					           name: "pregunta1m",
					           id:"pregunta1am"
					       }, "pregunta1am").on('click',function(){
					    	   dom.byId('otro1Visiblem').style.display='block';
					    	   dom.byId('otro2Visiblem').style.display='block';
					    	   dom.byId('otro3Visiblem').style.display='block';
					    	   dom.byId('otro4Visiblem').style.display='block';
					    	   dom.byId('otro5Visiblem').style.display='block';
					    	   dom.byId('otro6Visiblem').style.display='block';
					       });
						   
						  var pregunta1bm=new RadioButton({
					           checked:segundaAsambleaObj.preguntasMunicipal==null?false: segundaAsambleaObj.preguntasMunicipal.respuesta1==2 ? true:false,
					           value: "2",
					           name: "pregunta1m",
					           id:"pregunta1bm"
					       }, "pregunta1bm").on('click',function(){
					    	   dom.byId('otro1Visiblem').style.display='none';
					    	   dom.byId('otro2Visiblem').style.display='none';
					    	   dom.byId('otro3Visiblem').style.display='none';
					    	   dom.byId('otro4Visiblem').style.display='none';
					    	   dom.byId('otro5Visiblem').style.display='none';
					    	   dom.byId('otro6Visiblem').style.display='none';
				       });
						  
						  var pregunta1cm=new RadioButton({
					           checked:segundaAsambleaObj.preguntasMunicipal==null?false: segundaAsambleaObj.preguntasMunicipal.respuesta1==3 ? true:false,
					           value: "3",
					           name: "pregunta1m",
					           id:"pregunta1cm"
					       }, "pregunta1cm").on('click',function(){
					    	   dom.byId('otro1Visiblem').style.display='none';
					    	   dom.byId('otro2Visiblem').style.display='none';
					    	   dom.byId('otro3Visiblem').style.display='none';
					    	   dom.byId('otro4Visiblem').style.display='none';
					    	   dom.byId('otro5Visiblem').style.display='none';
					    	   dom.byId('otro6Visiblem').style.display='none';
					       });
						  
						  var pregunta2am= new RadioButton({
					           checked:segundaAsambleaObj.preguntasMunicipal==null?true: segundaAsambleaObj.preguntasMunicipal.respuesta2==1 ? true:false,
					           value: "1",
					           name: "pregunta2m",
					           id:"pregunta2am"
					       }, "pregunta2am");
						   
						  var pregunta2bm=new RadioButton({
					           checked: segundaAsambleaObj.preguntasMunicipal==null?false:segundaAsambleaObj.preguntasMunicipal.respuesta2==2 ? true:false,
					           value: "2",
					           name: "pregunta2m",
					           id:"pregunta2bm"
					       }, "pregunta2bm");
						  
						  var pregunta3am= new RadioButton({
					           checked:segundaAsambleaObj.preguntasMunicipal==null?true: segundaAsambleaObj.preguntasMunicipal.respuesta3==1 ? true:false,
					           value: "1",
					           name: "pregunta3m",
					           id:"pregunta3am"
					       }, "pregunta3am");
						   
						  var pregunta3bm=new RadioButton({
					           checked: segundaAsambleaObj.preguntasMunicipal==null?false:segundaAsambleaObj.preguntasMunicipal.respuesta3==2 ? true:false,
					           value: "2",
					           name: "pregunta3m",
					           id:"pregunta3bm"
					       }, "pregunta3bm");
						  
						  var pregunta4am= new RadioButton({
					           checked:segundaAsambleaObj.preguntasMunicipal==null?true: segundaAsambleaObj.preguntasMunicipal.respuesta4==1 ? true:false,
					           value: "1",
					           name: "pregunta4m",
					           id:"pregunta4am"
					       }, "pregunta4am");
						   
						  var pregunta4bm=new RadioButton({
					           checked: segundaAsambleaObj.preguntasMunicipal==null?false:segundaAsambleaObj.preguntasMunicipal.respuesta4==2 ? true:false,
					           value: "2",
					           name: "pregunta4m",
					           id:"pregunta4bm"
					       }, "pregunta4bm");
						  
						  var pregunta5am= new RadioButton({
					           checked:segundaAsambleaObj.preguntasMunicipal==null?true: segundaAsambleaObj.preguntasMunicipal.respuesta5==1 ? true:false,
					           value: "1",
					           name: "pregunta5m",
					           id:"pregunta5am"
					       }, "pregunta5am");
						   
						  var pregunta5bm=new RadioButton({
					           checked: segundaAsambleaObj.preguntasMunicipal==null?false:segundaAsambleaObj.preguntasMunicipal.respuesta5==2 ? true:false,
					           value: "2",
					           name: "pregunta5m",
					           id:"pregunta5bm"
					       }, "pregunta5bm");
						  
						
						  
					    	layoutm = [[  { name: 'idConsecutivo', field: 'idConsecutivoMunicipal', width: '5px',hidden:true},
						    		      { name: 'Est\u00edmulo y reconocimiento que se otorga', field: 'estimuloMunicipal',  width:'200px'},
						    		      { name: 'candidato', field: 'candidatoMunicipal',  width:'1px',hidden:true},
						    		      { name: 'Candidatos a recibir estimulos y/o reconocimientos ', field: 'tipoCandidatoMunicipal',  width:'200px'},
						    		      { name: 'Nombre del maestro, directivo o trabajador adscrito al centro escolar a quien se otorga est\u00edmulo  o reconocimiento', field: 'nomCandidatoMunicipal',  width:'100px'},
						    		      { name: 'Exposici\u00f3n de motivos y justificaci\u00f3n de porqu\u00e9 se le otorga el est\u00edmulo y reconocimiento', field: 'motivosMunicipal',  width:'100px'},
						    		      { name: 'Fecha de entrega', field: 'fechaMunicipal',  width:'100px'}
					    		      ]];
							
					    	//tmpEstimulom=[];
					    	tmpEstimulom =segundaAsambleaObj.estimulosMunicipal?segundaAsambleaObj.estimulosMunicipal:[];
					    		//segundaAsambleaObj.estimulos?segundaAsambleaObj.estimulos:[];
					  			
								var dataJsonStoreEstimulosm = {
									identifier: 'idConsecutivoMunicipal',
									items: tmpEstimulom
								};

								maxIndexEstimulosm = tmpEstimulom.length;
								
								
							
							new DataGrid({
						        id: 'emGrid',
						        structure: layoutm,
						        rowSelector: '10px',
						        height: '300px',
								width: '450px'
						        }, 'emGrid').startup();    	   		    	    			
					  			
							jsonStoreEstimulosm = new ItemFileWriteStore({data: dataJsonStoreEstimulosm});
					    	
							registry.byId('emGrid').setStore(jsonStoreEstimulosm);
							
							new Button({
								label : " Agregar ",
								id:'a_emGrid',
								onClick : function() {					
									estimulosm();
								}
							}, 'a_emGrid');
					    	
					    	new Button({
								label : " Editar ",
								id:'e_emGrid',
								onClick : function() {	
									var index = registry.byId('emGrid').selection.selectedIndex;    											
									if(index!=-1){												
										var item = registry.byId('emGrid').getItem(index);
					                	var itemToEdit={selectedItem:index,
						                    			idConsecutivoMunicipal: registry.byId('emGrid').store.getValue(item, 'idConsecutivoMunicipal'),     	                    			
						                    			estimuloMunicipal: registry.byId('emGrid').store.getValue(item, 'estimuloMunicipal'),
						                    			candidatoMunicipal: registry.byId('emGrid').store.getValue(item, 'candidatoMunicipal'),
						                    			tipoCandidatoMunicipal: registry.byId('emGrid').store.getValue(item, 'tipoCandidatoMunicipal'),
						                    			nomCandidatoMunicipal:registry.byId('emGrid').store.getValue(item, 'nomCandidatoMunicipal'),
										    		    motivosMunicipal:  registry.byId('emGrid').store.getValue(item, 'motivosMunicipal'),
										    		    fechaMunicipal:  registry.byId('emGrid').store.getValue(item, 'fechaMunicipal')		
					                					};    	                    	
					                	estimulosm(itemToEdit);
					                  
									} else{
						            	 utils.cstmAlert(
											'Debe seleccionar solo un registro.');
						             }					
								}
							}, 'e_emGrid');
					    	
					    	new Button({
								label : " Eliminar",
								id: 'd_emGrid',	
								onClick : function() {
									eliminaRow(registry.byId('emGrid'));
								}
							}, 'd_emGrid');
				   	}
				}
				
			}
			else{
				   if(registry.byId(id)){
					   registry.byId('pestanias').closeChild(registry.byId(id));
				   }   
				}
			
		}
		
		function despliegaContraloria(crea){
			if(crea){
				if(!registry.byId(id)){
					if(!registry.byId('pregunta1cona')){
			   //var id="preguntasPane"; 
			   var contenido= '<table border="0" align="lefth" >'+ 
			   '<tr><td>'+ 
			   '	<p> <b> ** Este apartado solo debe llenarse en caso de que haya registrado el comit\u00E9 de Contralor\u00EDa Social</b></p>'+
			   '</td></tr>'+
			   '<tr><td>'+ 
			   '	<p> <b> 1.- \u00BF El Comit\u00E9 recibi\u00F3 informaci\u00F3n necesaria para llevar a cabo actividades de seguimiento? </b></p>'+
			   '	<input id="pregunta1cona"/><label for="pregunta1ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta1conb"/><label for="pregunta1be">No</label>'+
			   '</td></tr>'+
			   '<tr><td id="otro1Visiblee" >'+ 
			   '	<p> <b> 2.- \u00BF El Comit\u00E9 solicit\u00F3 informaci\u00F3n adicional para realizar dichas actividades?</b></p>'+
			   '	<input id="pregunta2cona"/><label for="pregunta2ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta2conb"/><label for="pregunta2be">No</label>'+
			   '</td></tr>'+
			   '<tr><td id="otro2Visiblee" >'+ 
			   '	<p> <b> 3.- \u00BF El Comit\u00E9 realiz\u00F3 acciones de seguimiento al desarrollo del (los) Programa(s) en la escuela?</b></p>'+
			   '	<input id="pregunta3cona"/><label for="pregunta3ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta3conb"/><label for="pregunta3be">No</label>'+
			   '</td></tr>'+
			   '<tr><td>'+
			   '	<b><br/> 4.- \u00BF A qui\u00E9n le solicit\u00F3 la informaci\u00F3n? </b><div id="pregunta4cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td>'+
			   '	<b><br/>5.- En caso de que alguna respuesta sea negativa, explique \u00BF por qu\u00E9?</b><div id="pregunta5cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td>'+
			   '	<b><br/>\u00BF A cu\u00E1les de estos apoyos le dio seguimiento el comit\u00E9 de la escuela ?</b><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>A).- Acondicionamiento de espacios escolares (hace referencia a cuestiones de mejora que no hab\u00EDa en la escuela: instalaciones el\u00E9ctricas, aire acondicionado (clima), domos, canchas, ba\u00f1os, se\u00f1alizaci\u00F3n de seguridad escolar, c\u00E1maras de seguridad y extintores, comedores, entre otros).</b><div id="pregunta6cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>B).- Rehabilitaci\u00F3n o mantenimiento de espacios escolares (hace referencia a acciones que se realizar\u00E1n en espacios que ya existen en la escuela como mantenimiento a computadoras, aulas de medios y ba\u00f1os, entre otros).</b><br/><div id="pregunta7cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>C).- Adecuaciones a espacios escolares y mobiliario para alumnos y maestros (biblioteca escolar, sala de usos m\u00FAltiples, construcci\u00F3n de rampas, se\u00f1alamientos en braille, instalaci\u00F3n o cambio de ba\u00f1os, barandales, construcci\u00F3n de comedores, entre otros).</b><div id="pregunta8cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>D).- Equipamiento de espacios escolares (talleres, aulas de medios, laboratorios escolares, canchas, cocinas y comedores, entre otros).</b><div id="pregunta9cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>E).- Adquisici\u00F3n de materiales educativos y did\u00E1cticos (libros, globos terr\u00E1queos, modelos anat\u00F3micos y figuras geom\u00E9tricas, libros de macro tipos y en braille, regletas y software, cuentos y videos, programas educativos electr\u00F3nicos, juegos de destrezas, instrumentos musicales, materiales para dibujo, pintura, materiales para m\u00FAsica, documentales de arte, salud, entre otros).</b><br/><div id="pregunta10cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>F).- Apoyos did\u00E1cticos complementarios destinados a los alumnos para la clase de ingl\u00E9s (libros, audios, entre otros).</b><div id="pregunta11cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>G).- Materiales escritos en lengua ind\u00EDgena para reforzar la lectura y escritura (cuentos, poemas, canciones, juegos de palabras, adivinanzas, entre otros).</b><br/><div id="pregunta12cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>H).- Impartici\u00F3n de cursos, talleres, asesor\u00EDas, pl\u00E1ticas, eventos, actividades escolares, culturales y de vida saludable a diferentes integrantes de la comunidad escolar (directivos, docentes, Consejos Escolares de Participaci\u00F3n Social, Asociaci\u00F3n de Padres de Familia, padres de familia o tutores y a la comunidad en general).</b><br/><div id="pregunta13cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>I).- Servicios de alimentaci\u00F3n en la escuela (suministro gratuito de alimentos a alumnos en las escuelas ubicadas en los Municipios de la Cruzada nacional contra el Hambre; compra de insumos y enseres, informaci\u00F3n y orientaci\u00F3n alimentaria sobre la alimentaci\u00F3n correcta que se debe ofrecer en la escuela, apoyo econ\u00F3mico al Coordinador Escolar de Alimentaci\u00F3n).</b><br/><div id="pregunta14cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>J).- Apoyo para contar con un asesor diferente al docente frente a grupo para impartir la clase de ingl\u00E9s.</b><br/><div id="pregunta15cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td align="justify">'+
			   '	<b><br/>K).- Organizaci\u00F3n de eventos y actividades culturales relacionadas con la preservaci\u00F3n de la lengua y la cultura de la comunidad (danza, m\u00FAsica, concursos de poes\u00EDa y lectura de cuentos, entre otros).</b><br/><div id="pregunta16cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td>'+
			   '	<b><br/>\u00BF En caso de haber dado alguna respuesta negativa, especifique a qu\u00E9 programa o programas corresponde ?</b><br/>'+
			   '</td></tr>'+
			   '</td></tr>'+
				'	<td><br/><input id="contraGrid"/>'+
			   '</td></tr>'+
			   '<tr><td>'+
			   '	<b><br/>Otras acciones de los programas a las que se dio seguimiento \u00BF Cu\u00E1les? especifique.</b><div id="pregunta17cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td>'+ 
			   '	<p> <b> Los apoyos recibidos beneficiaron de manera igualitaria a hombres y mujeres</b></p>'+
			   '	<input id="pregunta18cona"/><label for="pregunta18ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta18conb"/><label for="pregunta18be">No</label><label> \u00BF Porque?</label><div id="pregunta19cona" />'+
			   '</td></tr>'+
			   '<tr><td>'+
			   '	<b><br/>\u00BF Qu\u00E9 actividades realiz\u00F3 el comit\u00E9 en la escuela? (puede marcar m\u00E1s de una opci\u00F3n)</b><br/>'+
			   '</td></tr>'+
			   '</td></tr>'+
				'	<td><br/><input id="contraGrid2"/>'+
			   '</td></tr>'+
			   '<tr><td>'+
			   '<tr><td>'+
			   '	<b>Otras (especifique) </b><div id="pregunta20cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td>'+
			   '	<b>En caso de no haber marcado alguna actividad, especifique \u00BFpor qu\u00E9? </b><div id="pregunta21cona" /><br/>'+
			   '</td></tr>'+
			   '<tr><td>'+ 
			   '	<p> <b> 6.- \u00BF Las acciones del programa se desarrollaron correctamente?</b></p>'+
			   '	<input id="pregunta22cona"/><label for="pregunta22ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta22conb"/><label for="pregunta22be">No</label><br/><label> \u00BF Porque?</label><div id="pregunta23cona" />'+
			   '</td></tr>'+
			   '<tr><td>'+ 
			   '	<p> <b> 7.- \u00BF Los apoyos del programa (s) mejoraron las condiciones de la escuela?</b></p>'+
			   '	<input id="pregunta24cona"/><label for="pregunta24ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta24conb"/><label for="pregunta24be">No</label><br/><label> \u00BF Porque?</label><div id="pregunta25cona" />'+
			   '</td></tr>'+
			   '<tr><td>'+ 
			   '	<p> <b> 8.- \u00BF Los apoyos del programa contribuyeron a mejorar los aprendizajes de los alumnos?</b></p>'+
			   '	<input id="pregunta26cona"/><label for="pregunta26ae">S\u00ed</label>'+ 
			   '	<br/><input id="pregunta26conb"/><label for="pregunta26be">No</label><br/><label> \u00BF Porque?</label><div id="pregunta27cona" />'+
			   '</td></tr>'+
			  '</table>';
			  
			   dom.byId('contraPane').innerHTML=contenido;
			   
			   var data=[{name:"No", id:"1"},
			             {name:"Deficiente",     id:"2"},
			             {name:"Regular",     id:"3"},
			             {name:"Bueno",  id:"4"}];
			               
			   var pStore = new Memory({
			       data: data
			   });
			   
			   layout = [[	  { name: 'idContra', field: 'cContra', width: '5px',hidden:true},
 		    	           	  { name: 'Seleccione', field: 'col2', width: "auto", styles: "text-align: center", type: dojox.grid.cells.Bool, editable: true },
 				    		  { name: 'Programa', field: 'programa',  width:'90%'}
 				         ]];
			   
			   layout2 = [[	  { name: 'idContra', field: 'cContra', width: '5px',hidden:true},
 		    	           	  { name: 'Seleccione', field: 'col2', width: "auto", styles: "text-align: center", type: dojox.grid.cells.Bool, editable: true },
 				    		  { name: 'Actividades', field: 'actividad',  width:'90%'}
 				         ]];
			   
			   
			   var itemsContra= new Array(	{id: 1, col2:false, programa:"Programa Escuelas de Calidad (PEC)"},
						{id: 2, col2:false, programa:"Programa Escuelas de Tiempo Completo (PETC)"},
						{id: 3, col2:false, programa:"Programa Escuela Segura (PES)"},
						{id: 4, col2:false, programa:"Programa de Fortalecimiento de la Calidad en la Educaci\u00F3n B\u00E1sica (PFCEB)"},
						{id: 5, col2:false, programa:"Programa para la Inclusi\u00F3n y la Equidad Educativa (PIEE)"}
					 );
			   var itemsContra2= new Array(	{id: 1, col2:false, actividad:"Sesion\u00F3 en los tiempos establecidos por los CEPS."},
						{id: 2, col2:false, actividad:"Solicitaron la informaci\u00F3n necesaria para el buen desempe\u00f1o de sus funciones."},
						{id: 3, col2:false, actividad:"Asistieron a las capacitaciones."},
						{id: 4, col2:false, actividad:"Solicitaron informaci\u00F3n de los apoyos o servicios recibidos de los programas educativos federales."},
						{id: 5, col2:false, actividad:"Verificaron el desarrollo y cumplimiento de las acciones de los programas."},
						{id: 6, col2:false, actividad:"Aplicaron las C\u00E9dulas de Seguimiento de manera semestral."},
						{id: 7, col2:false, actividad:"Entregaron las C\u00E9dulas de Seguimiento e informe anual al Enlace estatal,  conforme a los mecanismos establecidos en la entidad."},
						{id: 8, col2:false, actividad:"Representaron la opini\u00F3n general de la comunidad escolar en el cumplimiento de sus funciones."},
						{id: 9, col2:false, actividad:"Orientaron a la comunidad educativa sobre como presentar quejas, denuncias y sugerencias."},
						{id: 10, col2:false, actividad:"Recibieron y canalizaron las quejas, denuncias y sugerencias conforme a los mecanismos establecidos en la entidad y en las Reglas de Operaci\u00F3n respectivas."},
						{id: 11, col2:false, actividad:"Elaboraron el Informe Anual de Contralor\u00EDa Social."},
						{id: 12, col2:false, actividad:"Brindaron informaci\u00F3n a la comunidad educativa sobre los resultados de la contralor\u00EDa social."}
					 );
			   
			   
			   progComite = segundaAsambleaObj.programaComite?segundaAsambleaObj.programaComite:[];
               
               for(var i in progComite){                                                                                         
            	   itemsContra[i].col2 =progComite[i].opcion==1?true:false; 
               }

				
				var dataContra = {
					      identifier: "id",
					      items: itemsContra
			    };

				 actComite = segundaAsambleaObj.actividadComite?segundaAsambleaObj.actividadComite:[];
	               
	               for(var i in actComite){                                                                                         
	            	   itemsContra2[i].col2 =actComite[i].opcion==1?true:false; 
	               }

				
				var dataContra2 = {
					      identifier: "id",
					      items: itemsContra2
			    };
				new DataGrid({
			        id: 'contraGrid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '150px',
					width: '450px'
		        }, 'contraGrid').startup();    	   		    	    			
		  		
				//Store de federales para seguimiento
				storeContra = new ItemFileWriteStore({data: dataContra});				    
				registry.byId('contraGrid').setStore(storeContra);


				
				new DataGrid({
			        id: 'contraGrid2',
			        structure: layout2,
			        rowSelector: '10px',
			        height: '305px',
					width: '450px'
		        }, 'contraGrid2').startup();    	   		    	    			
		  		
				//Store de federales para seguimiento
				storeContra2 = new ItemFileWriteStore({data: dataContra2});				    
				registry.byId('contraGrid2').setStore(storeContra2);

					    var pregunta1cona= new RadioButton({
					           checked:segundaAsambleaObj.contraloriaComite==null?false: segundaAsambleaObj.contraloriaComite.res1==1 ? true:false,
					           value: "1",
					           name: "pregunta1c",
					           id:"pregunta1cona"
					       }, "pregunta1cona");
						   
						  var pregunta1conb=new RadioButton({
					           checked:segundaAsambleaObj.contraloriaComite==null?true: segundaAsambleaObj.contraloriaComite.res1==2 ? true:false,
					           value: "2",
					           name: "pregunta1c",
					           id:"pregunta1conb"
					       }, "pregunta1conb");
						  
						  					  
						  var pregunta2cona= new RadioButton({
					           checked:segundaAsambleaObj.contraloriaComite==null?true: segundaAsambleaObj.contraloriaComite.res2==1 ? true:false,
					           value: "1",
					           name: "pregunta2c",
					           id:"pregunta2cona"
					       }, "pregunta2cona");
						   
						  var pregunta2conb=new RadioButton({
					           checked: segundaAsambleaObj.contraloriaComite==null?false:segundaAsambleaObj.contraloriaComite.res2==2 ? true:false,
					           value: "2",
					           name: "pregunta2c",
					           id:"pregunta2conb"
					       }, "pregunta2conb");
						  
						  var pregunta3cona= new RadioButton({
					           checked:segundaAsambleaObj.contraloriaComite==null?true: segundaAsambleaObj.contraloriaComite.res3==1 ? true:false,
					           value: "1",
					           name: "pregunta3c",
					           id:"pregunta3cona"
					       }, "pregunta3cona");
						   
						  var pregunta3conb=new RadioButton({
					           checked: segundaAsambleaObj.contraloriaComite==null?false:segundaAsambleaObj.contraloriaComite.res3==2 ? true:false,
					           value: "2",
					           name: "pregunta3c",
					           id:"pregunta3conb"
					       }, "pregunta3conb");
						  
						
						  new ValidationTextBox({    		           
					           value:segundaAsambleaObj.contraloriaComite==null?'':segundaAsambleaObj.contraloriaComite.res4, 
					           trim:"true",    
					           maxLength:"250",
					           //required: "true",
					           uppercase: true,
					           style:"display:block; width:480px"
					        }, 'pregunta4cona');
						   
							new ValidationTextBox({	   		           
					           value:segundaAsambleaObj.contraloriaComite==null?'':segundaAsambleaObj.contraloriaComite.res5, 
					           trim:"true",    
					           uppercase: true,
					           maxLength:"250",
					           //required: "true",
					           style:"display:block; width:480px"
					        }, 'pregunta5cona');	 
							
							var pregunta6cona = new FilteringSelect({
								  id: 'pregunta6cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res6,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta6cona');
							
							var pregunta7cona = new FilteringSelect({
								  id: 'pregunta7cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res7,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta7cona');

						  
							var pregunta8cona = new FilteringSelect({
								  id: 'pregunta8cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res8,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta8cona');
							
							var pregunta9cona = new FilteringSelect({
								  id: 'pregunta9cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res9,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta9cona');
							
							var pregunta10cona = new FilteringSelect({
								  id: 'pregunta10cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res10,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta10cona');
							
							var pregunta11cona = new FilteringSelect({
								  id: 'pregunta11cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res11,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta11cona');
							
							var pregunta12cona = new FilteringSelect({
								  id: 'pregunta12cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res12,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta12cona');
							
							var pregunta13cona = new FilteringSelect({
								  id: 'pregunta13cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res13,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta13cona');
							
							var pregunta14cona = new FilteringSelect({
								  id: 'pregunta14cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res14,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta14cona');
							
							var pregunta15cona = new FilteringSelect({
								  id: 'pregunta15cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res15,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta15cona');
							
							var pregunta16cona = new FilteringSelect({
								  id: 'pregunta16cona',
								  value:segundaAsambleaObj.contraloriaComite==null?0:segundaAsambleaObj.contraloriaComite.res16,
								  store: pStore,
								  //readOnly:true,
								  required: false,
								  searchAttr: 'name'
								}, 'pregunta16cona');
							
							new ValidationTextBox({    		           
								   value:segundaAsambleaObj.contraloriaComite==null?'':segundaAsambleaObj.contraloriaComite.res17,
						           trim:"true",    
						           maxLength:"250",
						           //required: "true",
						           uppercase: true,
						           style:"display:block; width:480px"
						        }, 'pregunta17cona');
							
							
						    var pregunta18cona= new RadioButton({
						           checked:segundaAsambleaObj.contraloriaComite==null?false:segundaAsambleaObj.contraloriaComite.res18==1 ? true:false,
						           value: "1",
						           name: "pregunta18c",
						           id:"pregunta18cona"
						       }, "pregunta18cona");
							   
							  var pregunta18conb=new RadioButton({
						           checked:segundaAsambleaObj.contraloriaComite==null?true: segundaAsambleaObj.contraloriaComite.res18==2 ? true:false,
						           value: "2",
						           name: "pregunta18c",
						           id:"pregunta18conb"
						       }, "pregunta18conb");
							  

								new ValidationTextBox({    		           
									value:segundaAsambleaObj.contraloriaComite==null?'':segundaAsambleaObj.contraloriaComite.res19, 
							           trim:"true",    
							           maxLength:"250",
				//			           required: "true",
							           uppercase: true,
							           style:"display:block; width:480px"
							        }, 'pregunta19cona');
								
							  new ValidationTextBox({    		           
								  value:segundaAsambleaObj.contraloriaComite==null?'':segundaAsambleaObj.contraloriaComite.res20,
						           trim:"true",    
						           maxLength:"250",
					//	           required: "true",
						           uppercase: true,
						           style:"display:block; width:480px"
						        }, 'pregunta20cona');
							   
							  new ValidationTextBox({    		           
								  value:segundaAsambleaObj.contraloriaComite==null?'':segundaAsambleaObj.contraloriaComite.res21,
						           trim:"true",    
						           maxLength:"250",
						//           required: "true",
						           uppercase: true,
						           style:"display:block; width:480px"
						        }, 'pregunta21cona');
							  
							  
						    var pregunta22cona= new RadioButton({
						           checked:segundaAsambleaObj.contraloriaComite==null?false: segundaAsambleaObj.contraloriaComite.res22==1 ? true:false,
						           value: "1",
						           name: "pregunta22c",
						           id:"pregunta22cona"
						       }, "pregunta22cona");
							   
							  var pregunta22conb=new RadioButton({
						           checked:segundaAsambleaObj.contraloriaComite==null?true: segundaAsambleaObj.contraloriaComite.res22==2 ? true:false,
						           value: "2",
						           name: "pregunta22c",
						           id:"pregunta22conb"
						       }, "pregunta22conb");
					
					
							  new ValidationTextBox({    		           
								  value:segundaAsambleaObj.contraloriaComite==null?'':segundaAsambleaObj.contraloriaComite.res23,
						           trim:"true",    
						           maxLength:"250",
						           //required: "true",
						           uppercase: true,
						           style:"display:block; width:480px"
						        }, 'pregunta23cona');
							
					
					
							  
						    var pregunta24cona= new RadioButton({
						           checked:segundaAsambleaObj.contraloriaComite==null?false: segundaAsambleaObj.contraloriaComite.res24==1 ? true:false,
						           value: "1",
						           name: "pregunta24c",
						           id:"pregunta24cona"
						       }, "pregunta24cona");
							   
							  var pregunta24conb=new RadioButton({
						           checked:segundaAsambleaObj.contraloriaComite==null?true: segundaAsambleaObj.contraloriaComite.res24==2 ? true:false,
						           value: "2",
						           name: "pregunta24c",
						           id:"pregunta24conb"
						       }, "pregunta24conb");
							  
							  new ValidationTextBox({    		           
								  value:segundaAsambleaObj.contraloriaComite==null?'':segundaAsambleaObj.contraloriaComite.res25,
						           trim:"true",    
						           maxLength:"250",
						           //required: "true",
						           uppercase: true,
						           style:"display:block; width:480px"
						        }, 'pregunta25cona');
							
							  
						    var pregunta26cona= new RadioButton({
						           checked:segundaAsambleaObj.contraloriaComite==null?false: segundaAsambleaObj.contraloriaComite.res26==1 ? true:false,
						           value: "1",
						           name: "pregunta26c",
						           id:"pregunta26cona"
						       }, "pregunta26cona");
							   
							  var pregunta26conb=new RadioButton({
						           checked:segundaAsambleaObj.contraloriaComite==null?true: segundaAsambleaObj.contraloriaComite.res26==2 ? true:false,
						           value: "2",
						           name: "pregunta26c",
						           id:"pregunta26conb"
						       }, "pregunta26conb");
				
							  new ValidationTextBox({    		           
								  value:segundaAsambleaObj.contraloriaComite==null?'':segundaAsambleaObj.contraloriaComite.res27,
						           trim:"true",    
						           maxLength:"250",
						           //required: "true",
						           uppercase: true,
						           style:"display:block; width:480px"
						        }, 'pregunta27cona');
				
							  
				   	}
				}
				
			}
			else{
				   if(registry.byId(id)){
					   registry.byId('pestanias').closeChild(registry.byId(id));
				   }   
				}
			
		}
		
		
		function estimulosm(itemToEdit){
			var edit=false;
			    if(!itemToEdit){
				   itemToEdit={idConsecutivoMunicipal: 0,estimuloMunicipal:'',candidatoMunicipal:0,tipoCandidatoMunicipal:'',nomCandidatoMunicipal:'',motivosMunicipal:'',fechaMunicipal:''};
				   
			    }else{
				   edit=true;
			    }
			var title ='Est\u00edmulos';
	    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	    	registry.byId('dDetail').on('hide',function(){
				   												registry.byId('dDetail').destroyRecursive(false);
		   													});
	    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
		    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
		    jsUtils.createTag('div','prCnt','dcDetail');
			    
		    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
									   '<tr><td>'+
									   '	<b>*Propuesta de est\u00edmulos y reconocimientos de car\u00e1cter social : </b><div id="estimulosMunicipal" /><br/>'+
									   '</td></tr>'+
		    						   '<tr><td>'+
					    			   '	<b>*Candidatos para recibir los est\u00edmulos y reconocimientos: </b><div id="prSelectCERm" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr><td>'+
					    			   '	<b>*Nombre del maestro, directivo o trabajador adscrito al centro escolar a quien se otorga est\u00edmulo  o reconocimiento: </b><div id="nomCandidatoMunicipal" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr><td>'+
					    			   '	<b>*Exposici\u00f3n de motivos y justificaci\u00f3n de porqu\u00e9 se le otorga el est\u00edmulo y reconocimiento: </b><div id="motivosMunicipal" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr><td>'+
					    			   '	<b>*Fecha de entrega: </b><div id="fechaMunicipal" /><br/>'+
					    			   '</td></tr>'+
					    			   '</table>'; 
		    	    
																										    
		      
		    //---------------------------------- Datos	        
		    var datam=[{name:"[Seleccione]",	id:"0"},
		              {name:"Maestro adscrito al centro educativo.",	id:"1"},
		              {name:"Directivo adscrito al centro educativo.",	id:"2"},
		              {name:"Trabajador de apoyo y asistencia a la educaci\u00f3n adscrito al centro educativo",	id:"3"}];
	    		    	   
		    var pStorem = new Memory({
		        data: datam
		    });
		    	    
		    //---------------------------------- Dojo
		    var prSelectCERm = new FilteringSelect({
	           id: 'prSelectCERm',
	           value:itemToEdit.candidatoMunicipal,
	           store: pStorem,
	           //readOnly:true,
	           searchAttr: 'name'
	        }, 'prSelectCERm');
			    		   		   
		    var estimulosMunicipal = new ValidationTextBox({
	           promptMessage:"Capture los est\u00edmulos y reconocimientos de car\u00e1cter social",
	           value:itemToEdit.estimuloMunicipal, 
	           trim:"true",
	           uppercase: true,
	           maxLength:"250",
	           required:"true",
	           style:"display:block; width:280px"
	        }, 'estimulosMunicipal');
		    
		    
		    
		    var nomCandidatoMunicipal = new ValidationTextBox({
		           promptMessage:"Capture el nombre del candidato",
		           value:itemToEdit.nomCandidatoMunicipal, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           required:"true",
		           style:"display:block; width:280px"
		        }, 'nomCandidatoMunicipal');
		    
		    var motivosMunicipal = new ValidationTextBox({
		           promptMessage:"Capture los motivos",
		           value:itemToEdit.motivosMunicipal, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           required:"true",
		           style:"display:block; width:280px"
		        }, 'motivosMunicipal');
		    
		    var fechaMunicipal = new ValidationTextBox({
		           promptMessage:"Capture la fecha de entrega",
		           value:itemToEdit.fechaMunicipal, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           required:"true",
		           style:"display:block; width:280px"
		        }, 'fechaMunicipal');
			
		    //------------------------------------
		    jsUtils.createTag('div','prBtnAceptar','dcDetail');
			   			    
		    new Button({
					label : " Aceptar " ,
					onClick : function() {



						var form = registry.byId('dDetail');
						if (!form.validate()){  
							utils.cstmAlert('Favor de registrar los datos requeridos');
							return false;
						}
						
						if(registry.byId("prSelectCERm").get('value')==0)
						{
							utils.cstmAlert('Favor de selecionar un candidato');
							return false;
						}
						
						
						var grid = registry.byId('emGrid');
						try{
							if(edit){
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);
								grid.store.setValue(item, 'estimuloMunicipal', registry.byId("estimulosMunicipal").get('value'));
								grid.store.setValue(item, 'tipoCandidatoMunicipal',  registry.byId("prSelectCERm").get('displayedValue'));
								grid.store.setValue(item, 'candidatoMunicipal',  registry.byId("prSelectCERm").get('value'));
								grid.store.setValue(item, 'nomCandidatoMunicipal', registry.byId("nomCandidatoMunicipal").get('value'));
								grid.store.setValue(item, 'motivosMunicipal', registry.byId("motivosMunicipal").get('value'));
								grid.store.setValue(item, 'fechaMunicipal', registry.byId("fechaMunicipal").get('value'));
							} else {
								 var myNewItem = {  idConsecutivoMunicipal: ++maxIndexEstimulosm, 
										
										estimuloMunicipal:  registry.byId("estimulosMunicipal").get('value'),
										tipoCandidatoMunicipal:  registry.byId("prSelectCERm").get('displayedValue'),
										candidatoMunicipal:  registry.byId("prSelectCERm").get('value'),
										nomCandidatoMunicipal:registry.byId('nomCandidatoMunicipal').get('value'),
							    		motivosMunicipal:  registry.byId('motivosMunicipal').get('value'),
							    		fechaMunicipal:  registry.byId('fechaMunicipal').getValue('value')		

										
							      				 };	    							 
						         grid.store.newItem(myNewItem);
							}
							registry.byId('dDetail').destroyRecursive(false);
						}catch(e){
							utils.cstmAlert('Ocurrio un error al Agregar o Editar');
							console.log(e);
						}	
						
						
					
					}     			    				
				},'prBtnAceptar');
		
		}

		
		function estimulos(itemToEdit){
			var edit=false;
			    if(!itemToEdit){
				   itemToEdit={idConsecutivo: 0,estimulo:'',candidato:0,tipoCandidato:'',nomCandidato:'',motivos:'',fecha:''};
				   
			    }else{
				   edit=true;
			    }
			var title ='Est\u00edmulos';
	    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	    	registry.byId('dDetail').on('hide',function(){
				   												registry.byId('dDetail').destroyRecursive(false);
		   													});
	    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
		    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
		    jsUtils.createTag('div','prCnt','dcDetail');
			    
		    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
									   '<tr><td>'+
									   '	<b>*Propuesta de est\u00edmulos y reconocimientos de car\u00e1cter social : </b><div id="prSelectEs" /><br/>'+
									   '</td></tr>'+
									   '<tr id="otro3Visible" style="display:none"><td>'+
                                       '   <b>*Otro Estimulo:</div> </b><div id="nomOtroEstimulo"/><br/>'+
                                       '</td></tr>'+
		    						   '<tr><td>'+
					    			   '	<b>*Candidatos para recibir los est\u00edmulos y reconocimientos: </b><div id="prSelectCER" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr><td>'+
					    			   '	<b>*Nombre del maestro, directivo o trabajador adscrito al centro escolar a quien se otorga est\u00edmulo  o reconocimiento: </b><div id="nomCandidato" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr><td>'+
					    			   '	<b>*Exposici\u00f3n de motivos y justificaci\u00f3n de porqu\u00e9 se le otorga el est\u00edmulo y reconocimiento: </b><div id="motivos" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr><td>'+
					    			   '	<b>*Fecha de entrega: </b><div id="fecha" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr><td>'+
					    			   '	<b>*Se llevo acabo el estimulo: </b><div id="llevoAcabo" /><br/>'+
					    			   '</td></tr>'+
					    			   
					    			   '</table>'; 
		    	    
																										    
		      
		    //---------------------------------- Datos	        
		    var data=[{name:"[Seleccione]",	id:"0"},
		              {name:"Maestro adscrito al centro educativo.",	id:"1"},
		              {name:"Directivo adscrito al centro educativo.",	id:"2"},
		              {name:"Trabajador de apoyo y asistencia a la educaci\u00f3n adscrito al centro educativo",	id:"3"}];
	    		    	   
		    var pStore = new Memory({
		        data: data
		    });
		    
		    var dataLlevoAcabo=[{name:"[Seleccione]",	id:"0"},
		              {name:"SI",	id:"1"},
		              {name:"NO",	id:"2"}];
	    		    	   
		    var pSEtore = new Memory({
		        data: dataLlevoAcabo
		    });
		    	    
		    //---------------------------------- Dojo
		    
		    var llevoAcabo = new FilteringSelect({
		           id: 'llevoAcabo',
		           value:itemToEdit.llevoAcabo,
		           store: pSEtore,
		           //readOnly:true,
		           searchAttr: 'name'
		        }, 'llevoAcabo');
		    
		    var prSelectCER = new FilteringSelect({
	           id: 'prSelectCER',
	           value:itemToEdit.candidato,
	           store: pStore,
	           //readOnly:true,
	           searchAttr: 'name'
	        }, 'prSelectCER');
			    		   		   
		    var dataEs=[{name:"[Seleccione]",   id:"0"} ];

		    for(var a in estimulosStore){
		        dataEs.push({name:estimulosStore[a].nomEstimulo,
		                      id:estimulosStore[a].cEstimulo});
		    }
		                         
		      var pStoreEs = new Memory({
		          data: dataEs
		      });
		      
		      
		      
		      var prSelectEs = new FilteringSelect({
		      id: 'prSelectEs',
		      value:itemToEdit.cEstimulo,
		      store: pStoreEs,
		      width:100,
		      readOnly:edit,
		      searchAttr: 'name'
		    }, 'prSelectEs').on ('change', function(){     
		        
		        if( registry.byId("prSelectEs").get('displayedValue') == "Otro" ){                     
		               dom.byId('otro3Visible').style.display='block';
		               registry.byId('nomOtroEstimulo').set ('required',true);                                                            
		        } else {    
		               dom.byId('otro3Visible').style.display='none';
		               registry.byId('nomOtroEstimulo').set ('required',false);                   
		               }
		    });
		     
		      var nomOtroEstimulo = new ValidationTextBox({
		          promptMessage:"Nombre de Otro Estimulo",
		          value:itemToEdit.nomOtroEstimulo, 
		          trim:"true",
		          uppercase: true,
		          maxLength:"250",
		          //required: "true",
		          style:"display:block; width:280px"
		 }, 'nomOtroEstimulo');

		    
		    var nomCandidato = new ValidationTextBox({
		           promptMessage:"Capture el nombre del candidato",
		           value:itemToEdit.nomCandidato, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           required:"true",
		           style:"display:block; width:280px"
		        }, 'nomCandidato');
		    
		    var motivos = new ValidationTextBox({
		           promptMessage:"Capture los motivos",
		           value:itemToEdit.motivos, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           required:"true",
		           style:"display:block; width:280px"
		        }, 'motivos');
		    
		    var fecha = new ValidationTextBox({
		           promptMessage:"Capture la fecha de entrega",
		           value:itemToEdit.fecha, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           required:"true",
		           style:"display:block; width:280px"
		        }, 'fecha');
			
		    
		    if(edit==true){ 
		    	if(itemToEdit.cEstimulo>=7){
		    	    dom.byId('otro3Visible').style.display='block';
		    	    } else {                   
		    	    dom.byId('otro3Visible').style.display='none';
		    	        
		    	    }
		    	} else {
		    	dom.byId('otro3Visible').style.display='none';
		    	           
		    	}
		    //------------------------------------
		    jsUtils.createTag('div','prBtnAceptar','dcDetail');
			   			    
		    new Button({
					label : " Aceptar " ,
					onClick : function() {



						var form = registry.byId('dDetail');
						if (!form.validate()){  
							utils.cstmAlert('Favor de registrar los datos requeridos');
							return false;
						}
						
						if(registry.byId("prSelectCER").get('value')==0)
						{
							utils.cstmAlert('Favor de selecionar un candidato');
							return false;
						}
						if(registry.byId("llevoAcabo").get('value')==0)
						{
							utils.cstmAlert('Favor de selecionar una respuesta a se llevo acabo el estimulo');
							return false;
						}
						
						 if(registry.byId("prSelectEs").get('value')==0)
                         {
                               utils.cstmAlert('Favor de selecionar un tipo de estimulo');
                               return false;
                         }
						 
						 if( registry.byId("prSelectEs").get('displayedValue') == "Otro" ){
                             if(registry.byId("nomOtroEstimulo").get('value') == null || registry.byId("nomOtroEstimulo").get('value') == ''){
                                    utils.cstmAlert('Favor de registrar el nombre del otro estimulo');
                                    return false; 
                             }
                       
                       }
						
						
						var grid = registry.byId('eGrid');
						try{
							if(edit){
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);
								grid.store.setValue(item, 'nomOtroEstimulo', registry.byId("nomOtroEstimulo").get('value'));
                                grid.store.setValue(item, 'tipoEstimulo',  registry.byId("prSelectEs").get('displayedValue'));
                                grid.store.setValue(item, 'cEstimulo',  registry.byId("prSelectEs").get('value'));
								grid.store.setValue(item, 'tipoCandidato',  registry.byId("prSelectCER").get('displayedValue'));
								grid.store.setValue(item, 'candidato',  registry.byId("prSelectCER").get('value'));
								grid.store.setValue(item, 'nomCandidato', registry.byId("nomCandidato").get('value'));
								grid.store.setValue(item, 'motivos', registry.byId("motivos").get('value'));
								grid.store.setValue(item, 'fecha', registry.byId("fecha").get('value'));
								grid.store.setValue(item, 'llevoAcabo', registry.byId("llevoAcabo").get('value'));
							} else {
								 var myNewItem = {  idConsecutivo: ++maxIndexEstimulos, 
										
										//estimulo:  registry.byId("estimulos").get('value'),
										tipoCandidato:  registry.byId("prSelectCER").get('displayedValue'),
										candidato:  registry.byId("prSelectCER").get('value'),
										nomCandidato:registry.byId('nomCandidato').get('value'),
							    		motivos:  registry.byId('motivos').get('value'),
							    		fecha:  registry.byId('fecha').getValue('value'),
							    		llevoAcabo:  registry.byId('llevoAcabo').getValue('value'),
							    		tipoEstimulo:  registry.byId("prSelectEs").get('displayedValue'),
                                        cEstimulo:  registry.byId("prSelectEs").get('value'),
                                        nomOtroEstimulo:  registry.byId("nomOtroEstimulo").get('value')
										
							      				 };	    							 
						         grid.store.newItem(myNewItem);
							}
							registry.byId('dDetail').destroyRecursive(false);
						}catch(e){
							utils.cstmAlert('Ocurrio un error al Agregar o Editar');
							console.log(e);
						}	
						
						
					
					}     			    				
				},'prBtnAceptar');
		
		}

		
		function funAsunto (itemToEdit){
	    	var edit=false;
		    if(!itemToEdit){
			   itemToEdit={cscAsunto: 0,strAsuntos:'',strAcuerdos:''};
		    }else{
			   edit=true;
		    }
			   
		    //----------------------------Diseño de la ventana
	    	var title = 'Asuntos y acuerdos';
	    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	    	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
	    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
		    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
		    jsUtils.createTag('div','prCnt','dcDetail');
		    
		    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+							    			   
					    			   '<tr><td>'+
					    			   '	<b>*Asuntos generales: </b><div id="strAsuntos" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr><td>'+
					    			   '	<b>*Acuerdos aprobados</b><div id="strAcuerdos" /><br/>'+
					    			   '</td></tr>'+							    			   						    			   							    			   							    			   							    			   
					    			   '</table>';     			         			    
				          					             			        			        			    
		    //---------------------------------- Dojo     			   		    
		    new ValidationTextBox({    		           
	           value:itemToEdit.strAsuntos, 
	           trim:"true",    
	           maxLength:"250",
	           required: "true",
	           uppercase: true,
	           style:"display:block; width:280px"
	        }, 'strAsuntos');
		   
			new ValidationTextBox({	   		           
	           value:itemToEdit.strAcuerdos, 
	           trim:"true",    
	           uppercase: true,
	           maxLength:"250",
	           required: "true",
	           style:"display:block; width:280px"
	        }, 'strAcuerdos');	     			       			    
		         			   
		    //------------------------------------
		    jsUtils.createTag('div','prBtnAceptar','dcDetail');
		    new Button({
					label : " Aceptar " ,
					onClick : function() {



						var form = registry.byId('dDetail');
						if (!form.validate()){  
							utils.cstmAlert('Favor de registrar los datos requeridos');
							return false;
						}
						var grid = registry.byId('9Grid');
						try{
							if(edit){
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);
								grid.store.setValue(item, 'asunto', registry.byId("strAsuntos").get('value'));
								grid.store.setValue(item, 'acuerdo',  registry.byId("strAcuerdos").get('value'));
							} else {
								 var myNewItem = {  cscAsunto: ++maxIndexAsuntos, 
										
										asunto:  registry.byId("strAsuntos").get('value'),
										acuerdo:  registry.byId("strAcuerdos").get('value'), 
										
							      				 };	    							 
						         grid.store.newItem(myNewItem);
							}
							registry.byId('dDetail').destroyRecursive(false);
						}catch(e){
							utils.cstmAlert('Ocurrio un error al Agregar o Editar');
							console.log(e);
						}	
						
						
					
					}     			    				
				},'prBtnAceptar');
	    }

		
		function eventos(itemToEdit){
			var edit=false;
		    if(!itemToEdit){
			   itemToEdit={idConsecutivo: 0,cEvento:0,nomEvento:'',fuenteRecursos:0,idFuente:'',cumplioEvento:'',nomOtroEvento:'',nomOtroFr:'',montoR:'', montoStrR:'',montoG:'', montoStrG:''};
			
		    }else{
			   edit=true;
		    }
			var title ='Eventos';
	    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	    	registry.byId('dDetail').on('hide',function(){
				   												registry.byId('dDetail').destroyRecursive(false);
		   													});
	    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
		    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
		    jsUtils.createTag('div','prCnt','dcDetail');
			    
		    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
									   '<tr><td>'+
					    			   '	<b>*Evento: </b><div id="prSelectE" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr id="otro3Visible" style="display:none"><td>'+
					    			   '	<b>*Otro Evento:</div> </b><div id="nomOtroEvento"/><br/>'+
					    			   '</td></tr>'+
					    			   '<tr><td>'+
									   '	<b>*El evento fue realizado: </b><div id="cumplioEvento" /><br/>'+
									   '</td></tr>'+
					    			   '<tr id="trMontoR"><td> '+
 					    			   '	 <b>*Monto recibido</b><br/>'+
 					    			   'N\u00FAmero:<input id="montoR"/> Letra:<input id="montoStrR"/><br/>'+
 					    			   '</td></tr>'+							    			   							    			   							    			   							    			   
 					    			   '<tr id="trMontoG"><td> '+
 					    			   '	 <b>*Monto gastado</b><br/>'+
 					    			   'N\u00FAmero:<input id="montoG"/> Letra:<input id="montoStrG"/><br/>'+
 					    			   '</td></tr>'+							    			   							    			   							    			   							    			   
 		
									   '<tr><td>'+
					    			   '	<b>*Fuente de recursos: </b><div id="prSelectFR" /><br/>'+
					    			   '</td></tr>'+
					    			   '<tr id="otro4Visible" style="display:none"><td>'+
					    			   '	<b>*Otra fuente de recursos:</div> </b><div id="nomOtroFr"/><br/>'+
					    			   '</td></tr>'+
					    			   '</table>'; 
		    	    
		    //---------------------------------- Datos	        
		    var dataE=[{name:"[Seleccione]",	id:"0"} ];
		    	            
	        for(var a in eventosStore){
	             dataE.push({name:eventosStore[a].nomEvento,
	                           id:eventosStore[a].cEvento});
	        }
	        		    	   
		    var pStore = new Memory({
		        data: dataE
		    });
		    
		    var dataFR=[{name:"[Seleccione]",	id:"0"},
		              {name:"Donaciones a la escuela de personas f\u00edsicas o morales.",	id:"1"},
		              {name:"Recursos recabados por rifas o eventos organizados por la escuela",	id:"2"},
		              {name:"Asociaci\u00f3n de Padres de Familia",	id:"3"},
		              {name:"Aportaciones extraordinarias de los padres de familia.",	id:"4"},
		              {name:"Otro",	id:"5"}];
	    		    
		    var pStoreFR = new Memory({
		        data: dataFR
		    });
		    
		    var dataER=[{name:"[Seleccione]",	id:"0"},
			              {name:"Si",	id:"1"},
			              {name:"No",	id:"2"},
			              ];
		    		    
			    var pStoreER = new Memory({
			        data: dataER
			    });
		    //---------------------------------- Dojo
		    var prSelectE = new FilteringSelect({
	           id: 'prSelectE',
	           value:itemToEdit.cEvento,
	           store: pStore,
	           width:100,
	           readOnly:edit,
	           searchAttr: 'name'
	        }, 'prSelectE').on ('change', function(){     
	        	
	        	if( registry.byId("prSelectE").get('displayedValue') == "Otro" ){		    		
	    			dom.byId('otro3Visible').style.display='block';
	    			registry.byId('nomOtroEvento').set ('required',true);    			    		        			
	    		} else {    
	    			dom.byId('otro3Visible').style.display='none';
	    			registry.byId('nomOtroEvento').set ('required',false);		        
				}
	        });
		    	   		   
		    var  fechaEvento= new Textarea({
		    	promptMessage:"Escriba la fecha del evento",
	           value:itemToEdit.fechaHorariosProgramados, 
	           trim:"true",
	           uppercase: true,
	           maxLength:"250",
	           style : " display:block; width:400px;"
	        }, 'fechaEvento');
			   	    			  	    		
		    var nomOtroEvento = new ValidationTextBox({
		           promptMessage:"Nombre de Otro Evento",
		           value:itemToEdit.nomOtroEvento, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           //required: "true",
		           style:"display:block; width:280px"
	        }, 'nomOtroEvento');
			   
		    var prSelectFr = new FilteringSelect({
		           id: 'prSelectFR',
		           value:itemToEdit.fuenteRecursos,
		           store: pStoreFR,
		           width:100,
		           readOnly:edit,
		           //readOnly:true,
		           searchAttr: 'name'
	        }, 'prSelectFR').on ('change', function(){     
		        	
		        	if( registry.byId("prSelectFR").get('displayedValue') == "Otro" ){			    		
		    			dom.byId('otro4Visible').style.display='block';
		    			registry.byId('nomOtroFr').set ('required',true);	    			    		        			
		    		} else {    
		    			dom.byId('otro4Visible').style.display='none';
	        			registry.byId('nomOtroFr').set ('required',false);			        
					}
	        });
			   
		    var cumplioEvento = new FilteringSelect({
		           id: 'cumplioEvento',
		           value:itemToEdit.cumplioEvento,
		           store: pStoreER,
		           width:100,
		           
		           //readOnly:true,
		           searchAttr: 'name'
	        }, 'cumplioEvento');
		    
		    var nomOtroFr = new ValidationTextBox({
		           promptMessage:"Nombre de Otra fuente de recursos ",
		           value:itemToEdit.nomOtroFr, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           readOnly:edit,
		           //required: "true",
		           style:"display:block; width:280px"
	        }, 'nomOtroFr');
		    
		    var montoR=  new ValidationTextBox({
	 	           promptMessage:"Capture solo n\u00FAmeros",
	 	           id:'montoR',
	 	           regExp: constants.NUMBER_VALID,
	 	           value:itemToEdit.montoR, 
	 	           trim:"true",  
	 	           maxLength:"9",
	 	           required: "true",
	 	           style:"display:block; width:280px"
	 	        }, 'montoR').on ('Blur', function(){	   
	 				   var montoR= registry.byId("montoR").get('value');		       
	 				   	if(montoR!=''){			       
	 				       if(montoR==0){
	 				    	   registry.byId('montoStrR').set('value','CERO');
	 				       } else if(montoR>=0){			    	   
	 				    		registry.byId('montoStrR').set('value',jsUtils.covertirNumLetras(registry.byId("montoR").get('value')));    					    	   
	 				       } else{
	 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
	 							return false;
	 				       }
	 			       	}
	 	        });
	 			    
	 		    var montoLetraR= new ValidationTextBox({
	 	           promptMessage:"Capture solo letras",
	 	           value:itemToEdit.montoStrR, 
	 	           regExp:constants.NoNUMBER_VALID,
	 	           id:'montoStrR',
	 	           trim:"true",    
	 	           maxLength:"200",
	 	           style:"display:block; width:480px",
	 	           readOnly: true,
	 	           required: "true"
	 	        }, 'montoStrR');
	 		    
	 		    
	 		   var montoG=  new ValidationTextBox({
	 	           promptMessage:"Capture solo n\u00FAmeros",
	 	           id:'montoG',
	 	           regExp: constants.NUMBER_VALID,
	 	           value:itemToEdit.montoG, 
	 	           trim:"true",  
	 	           maxLength:"9",
	 	           required: "true",
	 	           style:"display:block; width:280px"
	 	        }, 'montoG').on ('Blur', function(){	   
	 				   var montoG= registry.byId("montoG").get('value');		       
	 				   	if(montoG!=''){			       
	 				       if(montoG==0){
	 				    	   registry.byId('montoStrG').set('value','CERO');
	 				       } else if(montoG>=0){			    	   
	 				    		registry.byId('montoStrG').set('value',jsUtils.covertirNumLetras(registry.byId("montoG").get('value')));    					    	   
	 				       } else{
	 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
	 							return false;
	 				       }
	 			       	}
	 	        });
	 			    
	 		    var montoLetraG= new ValidationTextBox({
	 	           promptMessage:"Capture solo letras",
	 	           value:itemToEdit.montoStrG, 
	 	           regExp:constants.NoNUMBER_VALID,
	 	           id:'montoStrG',
	 	           trim:"true",    
	 	           maxLength:"200",
	 	           style:"display:block; width:480px",
	 	           readOnly: true,
	 	           required: "true"
	 	        }, 'montoStrG');
		    
		    if(edit==true){	
	        	if(itemToEdit.cEvento>=33){
	        		dom.byId('otro3Visible').style.display='block';
	   		} else {			
	        		dom.byId('otro3Visible').style.display='none';
			    
	        		}
	        	} else {
	        	dom.byId('otro3Visible').style.display='none';
				
	        }
		    
		    if(edit==true){	
	        	if(itemToEdit.fuenteRecursos>=5){
	        		dom.byId('otro4Visible').style.display='block';
	   		} else {			
	        		dom.byId('otro4Visible').style.display='none';
			    
	        		}
	        	} else {
	        	dom.byId('otro4Visible').style.display='none';
				
	        }
		    
		    //------------------------------------
		    jsUtils.createTag('div','prBtnAceptar','dcDetail');
			   		
		    
		    new Button({
				label : " Aceptar " ,
				onClick : function() {


					var grid = registry.byId('evGrid');
					var form = registry.byId('dDetail');
					if (!form.validate()){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					
					if(registry.byId("prSelectE").get('value')==0)
					{
						utils.cstmAlert('Favor de selecionar un evento');
						return false;
					}
					if(registry.byId("prSelectFR").get('value')==0)
					{
						utils.cstmAlert('Favor de selecionar una fuente de recursos para el evento');
						return false;
					}
					if(registry.byId("cumplioEvento").get('value') == null || registry.byId("cumplioEvento").get('value') == ''){
						utils.cstmAlert('Favor de registrar si se cumplio el evento');
						return false;	
					}
					if( registry.byId("prSelectE").get('displayedValue') == "Otro" ){
						if(registry.byId("nomOtroEvento").get('value') == null || registry.byId("nomOtroEvento").get('value') == ''){
							utils.cstmAlert('Favor de registrar el nombre del otro comite');
							return false;	
						}
					
					}
					if( registry.byId("prSelectFR").get('displayedValue') == "Otro" ){
						if(registry.byId("nomOtroFr").get('value') == null || registry.byId("nomOtroFr").get('value') == ''){
							utils.cstmAlert('Favor de registrar la otra fuente de recursos');
							return false;	
						}
							
					}
					
					
					if(edit){
					}
					else{
					for ( var i = 0; i < grid.rowCount; i++) {
	 	        		
	 	 				var item = grid.getItem(i);
	 	 				
	 	 				if( grid.store.getValue(item,'cEvento') == registry.byId("prSelectE").get('value')){
	 	 					utils.cstmAlert("Ya esta registrado ese evento");
	 	 					return;
	 	 				}

	 	 			}
					}
					
					
					if(registry.byId("cumplioEvento").get('value')==0)
					{
						utils.cstmAlert('Favor de selecionar una respuesta para el cumplimiento del evento');
						return false;
					}
					
					if(registry.byId("montoR").get('value') == null || registry.byId("montoR").get('value') == ''){
						utils.cstmAlert('Favor de registrar un monto Recabado');
						return false;
					}
					
					if(registry.byId("montoG").get('value') == null || registry.byId("montoG").get('value') == ''){
						utils.cstmAlert('Favor de registrar un monto Recabado');
						return false;
					}
					
//					if(registry.byId("montoG").get('value') > registry.byId("montoR").get('value')){
//						utils.cstmAlert('Favor de registrar un monto Gastado igual o menor que el monto Recabado');
//						return false;	
//					}
					
					
					try{
						if(edit){
							var index = grid.selection.selectedIndex;
							var item = grid.getItem(index);
							
							grid.store.setValue(item, 'cumplioEvento', registry.byId("cumplioEvento").get('value'));
							grid.store.setValue(item, 'fuenteRecursos',  registry.byId("prSelectFR").get('value'));
							grid.store.setValue(item, 'nomOtroEvento',  registry.byId("nomOtroEvento").get('value'));
							grid.store.setValue(item, 'nomOtroFr',  registry.byId("nomOtroFr").get('value'));
							grid.store.setValue(item, 'montoR', registry.byId("montoR").get('value'));
 							grid.store.setValue(item, 'montoStrR', registry.byId("montoStrR").get('value'));
 							grid.store.setValue(item, 'montoG', registry.byId("montoG").get('value'));
 							grid.store.setValue(item, 'montoStrG', registry.byId("montoStrG").get('value'));
 							
						  } else {
							  var myNewItem = {  idConsecutivo: ++maxIndexEventos, 
												cEvento:  registry.byId("prSelectE").get('value'),
												nomEvento:  registry.byId("prSelectE").get('displayedValue'),
											    idFuente:    registry.byId("prSelectFR").get('displayedValue'),
												fuenteRecursos:registry.byId("prSelectFR").get('value'),
												cumplioEvento:  registry.byId("cumplioEvento").get('value'),
												nomOtroEvento:  registry.byId("nomOtroEvento").get('value'),
												nomOtroFr:  registry.byId("nomOtroFr").get('value'),
												montoR:  registry.byId("montoR").get('value'),
		    									montoStrR:  registry.byId("montoStrR").get('value'),
		    									montoG:  registry.byId("montoG").get('value'),
			    								montoStrG:  registry.byId("montoStrG").get('value'),
			    									
						      				 };	    							 
					         grid.store.newItem(myNewItem);
						}
						registry.byId('dDetail').destroyRecursive(false);
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}	
					
					
				
				}     			    				
			},'prBtnAceptar');
		}

		
		function eliminaRow(tmpGrid){
			var index = tmpGrid.selection.selectedIndex;    											
			if(index!=-1){
				tmpGrid.removeSelectedRows();
				tmpGrid.store.save();	
			}else {
		    	 utils.cstmAlert('Debe seleccionar un registro.');
		    }	
		}	

		
		  function funComite ( itemToEdit ){
		    	var edit=false;
			    if(!itemToEdit){
				   itemToEdit={ceComites:0,idComite:0,nomComite:'',noIntegrantes:0,nombrePresidente:'',idCalidad:0,calidadPresidente:'',idAcuerdo:0,acuerdoComite:''};
			    }else{
				   edit=true;
			    }   
			    //----------------------------Diseño de la ventana
		    	var title = 'Comit\u00E9s';
		    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
		    	registry.byId('dDetail').on('hide',function(){
				   												registry.byId('dDetail').destroyRecursive(false);
		   													});
		    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
			    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
			    jsUtils.createTag('div','prCnt','dcDetail');
				    
			    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
										   '<tr><td>'+
										   '	<b>*Comit\u00E9 que se integr\u00f3: </b><br/><div id="idSelect" /><br/>'+
										   '</td></tr>'+
										   '<tr id="otro3Visible" style="display:none"><td>'+
										   '	<b>*Otro Comit\u00e9:</div> </b><div id="nomOtroComite"/><br/>'+
										   '</td></tr>'+
										   '<tr><td>'+
										   '	<br/><b>*N\u00FAmero de integrantes: </b><div id="noIntegrantes" /><br/><br/>'+
										   '</td></tr>'+
										   '<tr><td>'+
										   '	<br/><b>*Nombre del presidente del comit\u00E9: </b><input id="nombrePresidente"/><br/>'+
										   '</td></tr>'+
										   '<tr><td>'+
										   '	<b>*Calidad del presidente del comit\u00E9 en el<br/> consejo escolar de participaci\u00F3n social: </b><input id="calidadPresidente"/><br/><br/>'+
										   '</td></tr>'+
										   '<tr><td>'+
										   '	<b>*Acuerdos de los comit\u00E9s integrados: </b><div id="acuerdoComite" /><br/>'+
										   '</td></tr>'+
										   '<tr id="otroVisibleAccion4"><td>'+
										   '	<b><br/>*Actividades: </b><br/>'+
										   '</td></tr>'+
										   '<tr>' +
										   '	<td><input id="avanceOtroDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr>' +
						    			   '	<td><input id="otroDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr id="otroVisibleAccion1"style="display:none"><td>'+
										   '	<b>*Acci\u00f3n 1: </b><div id="accion1" /><br/>'+
										   '</td></tr>'+
										   '<tr id="otroVisibleAccion2"style="display:none"><td>'+
										   '	<b>*Acci\u00f3n 2: </b><div id="accion2" /><br/>'+
										   '</td></tr>'+
										   '<tr id="otroVisibleAccion3"style="display:none"><td>'+
										   '	<b>Acci\u00f3n 3: </b><div id="accion3" /><br/>'+
										   '</td></tr>'+
										   '<tr style="display:none"><td>'+
										   '	<b>Acci\u00f3n 4: </b><div id="accion4" /><br/>'+
										   '</td></tr>'+
										   '<tr style="display:none"><td>'+
										   '	<b>Acci\u00f3n 5: </b><div id="accion5" /><br/>'+
										   '</td></tr>'+
										   '<tr><td>'+
										   '	<b>*Cumplimiento con el plan de actividades: </b><div id="actividadComite1" /><br/>'+
										   '</td></tr>'+
										   '</table>';
			    
			    var layoutOtro1Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
					          		    { name: 'Selecci\u00F3n de Objetivo',	
					          				    field:'idSeleccion',
					          				    width: "120px",        			          				   
					          				    type: dojox.grid.cells.Bool,
					          				    editable: true, 	hidden:true
					          			},
					          			{ name: 'Recurso no econ\u00F3mico', field: 'objetivo', width: '400px'},        			          				
					          			{ name: '*Respuesta', field: 'meta', 
					          					editable: true, 
					          					width: '250px', 
					          				    type: gridCellsDijit._Widget,
					          				    widgetClass: ValidationTextBox, 
					          				    widgetProps: {uppercase:'true', maxlength: '250'} 
					          			}
					          		]];

				    var layoutOtro2Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
						          		    { name: 'Selecci\u00F3n de Objetivo',	
						          				    field:'idSeleccion',
						          				    width: "120px",        			          				   
						          				    type: dojox.grid.cells.Bool,
						          				    editable: true, 	hidden:true
						          			},
						          			{ name: 'Recurso no econ\u00F3mico', field: 'objetivo', width: '650px'},        			          				
						          			{ name: 'Meta de la escuela', field: 'meta', hidden:true,
						          					editable: true, 
						          					width: '250px', 
						          				    type: gridCellsDijit._Widget,
						          				    widgetClass: ValidationTextBox, 
						          				    widgetProps: {uppercase:'true', maxlength: '250'} 
						          			}
						          		]];

			    var checkDt = null;
			    var otrosSeleccionadoActivo = 0;
			    var otrosSeleccionado=null;
			    otroRecurso = "";
			    	    
			    
			    
			    
			    if(itemToEdit!=null){
				    if(itemToEdit.idComite>13){
					    checkDt =[{
										// First, our view using the _CheckBoxSelector custom type
										type: "dojox.grid._CheckBoxSelector"
									},
									layoutOtro1Dt
								];
				    } else {
				    	checkDt =[{
							// First, our view using the _CheckBoxSelector custom type
							type: "dojox.grid._CheckBoxSelector"
						},
						layoutOtro2Dt
					];
				    	}
			    }
				
				
			    new ValidationTextBox({
					name : "otroDt",
					id : "otroDt",
					value: otroRecurso,
					promptMessage : "Capture otro recurso",
					trim : true,
					style : "display:none;width:280px",
					maxLength: 255,
					placeHolder : "Especifique OTRO ",
					required: false
				}, "otroDt");
				
				new DataGrid({
			  		id: 'avanceOtroDt',
			  		structure: checkDt,
			  		height: '100px',
			  		rowSelector: '20px',
			  		onRowClick: function(e){
			            this.edit.rowClick(e);
			            //this.selection.clickSelectEvent(e);
			         },
			         onSelectionChanged: function(item){
				  			var items = this.selection.getSelected();
				  			
							rneSeleccionados = dojo.map(items, function(item){
								if(this.store.getValue(item, "objetivo")=="Otros"){
									otrosSeleccionado=1;	
								}										
								
								return this.store.getValue(item, "idActividad");
							}, this);
							
							if (otrosSeleccionado==1) {
								
								registry.byId('otroDt').set("style","display:block");	
								registry.byId('otroDt').set("required",true);	
								otrosSeleccionado=0;		
							} else if (otrosSeleccionado==0) {
						    	registry.byId('otroDt').set("style","display:none");
								registry.byId('otroDt').reset();
								registry.byId('otroDt').set("required",false);						    								
							}				
							
							
					  		}
			  		}
		  	    ,'avanceOtroDt').startup();

				var dataOtroDtA = {
		          		identifier: "idActividad",
		          		items: []
		      	};
				
				
				 if(edit==true){	
			        	if(itemToEdit.idComite>13){
				        		dom.byId('otro3Visible').style.display='block';
				        		dom.byId('avanceOtroDt').style.display='none';
				        		dom.byId('otroVisibleAccion1').style.display='block';
				        		dom.byId('otroVisibleAccion2').style.display='block';
				        		dom.byId('otroVisibleAccion3').style.display='block';
				        		
				        		
				        		
			     		} else {			
				        		dom.byId('otro3Visible').style.display='none';
				        		dom.byId('avanceOtroDt').style.display='block';
				        		dom.byId('otroVisibleAccion1').style.display='none';
				        		dom.byId('otroVisibleAccion2').style.display='none';
				        		dom.byId('otroVisibleAccion3').style.display='none';
						    
			    		}
			        	dataOtroDtA.items = [];
			        	
			        	for(var a in opcionesStore){
			        		if( opcionesStore[a].cTipoPcc==3 ){
			        			if(opcionesStore[a].cPccIdentificador == itemToEdit.idComite){

					        		var arregloOpciones = {              	
					                      	idActividad: opcionesStore[a].cOpciones,
					                      	idObjetivo: opcionesStore[a].cOpciones,
					        	        	objetivo : opcionesStore[a].descripOpcion,
					        	        	actividad : opcionesStore[a].cOpciones,
					        	        	meta: "",
					        	        	avance: ""
					        		};
					        		dataOtroDtA.items.push(arregloOpciones);
			            		}	
			        		}        		        	
			            }	        	

			        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
			            registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);
			            
				    } else {
				        	dom.byId('otro3Visible').style.display='none';
			   			
				    }

			    //---------------------------------- Datos     			    
			   
			    
			    var dataAC=[{name:"[Seleccione]",	id:"0"},
				              {name:"Se avanz\u00f3 menos del 60%",	id:"1"},
				              {name:"Se avanz\u00f3 entre el 61 y el 75%",	id:"2"},
				              {name:"Se avanz\u00f3 entre el 76 y el 90%",	id:"3"},
				              {name:"Se avanz\u00f3 entre el 91 y 99%",	id:"4"},
				              {name:"Se realiz\u00f3 al 100%",	id:"5"},
				              ];
			    		    
				    var pStoreAC = new Memory({
				        data: dataAC
				    });
				
				    
				    
				    
			    var data=[{name:"[Seleccione]",	id:"0"}];
			    
			    for(var index in listTemasG){
			    	data.push(listTemasG[index]);
			    }
				  
			    var pStore = new Memory({
			        data: data
			    });
			    
			    var calidadStore = new Memory({
			        data: listCalidadPresidenteG
			    });
			        			    
			    var acuerdoStore = new Memory({
			        data: listAcuerdosComite
			    });
			    
			    
			    
			          	

			    
				    //---------------------------------- Dojo
			    

			
			    var nomOtroComite = new ValidationTextBox({
			           promptMessage:"Nombre de Otro Comite",
			           value:itemToEdit.nomOtroComite, 
			           trim:"true",
			           readOnly:edit,
			           uppercase: true,
			           required : true,
			           maxLength:"250",
			           style:"display:block; width:280px"
			    }, 'nomOtroComite');
			    
			    new FilteringSelect({
		           id: 'idSelect',
		           value:itemToEdit.idComite,
		           store: pStore,
		           readOnly:edit,
		           searchAttr: 'name'
		        //}, 'idSelect');     			    
			    }, 'idSelect').on ('change', function(){     
			        	
			        	var gridCom = registry.byId('7_1Grid');
			        //	var gridComSeg = registry.byId('7Grid');
			        	
			        	for ( var i = 0; i < gridCom.rowCount; i++) {
			        		
			 				var item = gridCom.getItem(i);
			 				
			 				if( gridCom.store.getValue(item,'idComite') == registry.byId("idSelect").get('value')){
			 					utils.cstmAlert("Ya existe registrado el Comite");
			 					return;
			 				}

			 			}
			        	
//			        	for ( var i = 0; i < gridComSeg.rowCount; i++) {
//			        		
//			 				var item = gridComSeg.getItem(i);
//			 				
//			 				if( gridComSeg.store.getValue(item,'idComite') == registry.byId("idSelect").get('value')){
//			 					utils.cstmAlert("Ya existe registrado el Comite en seguimiento");
//			 					return;
//			 				}
//
//			 			}


			        	if( registry.byId("idSelect").get('displayedValue') == "Otro" ){
					    		
			    			dom.byId('otro3Visible').style.display='block';
			    			dom.byId('otroVisibleAccion1').style.display='block';
			    			dom.byId('otroVisibleAccion2').style.display='block';
			    			dom.byId('otroVisibleAccion3').style.display='block';
			    			
			    			
			    			registry.byId('nomOtroComite').set ('required',true);
			    			dom.byId('avanceOtroDt').style.display='none';
			    			    		        			
			    		} else {    
			    			dom.byId('otro3Visible').style.display='none';
			    			dom.byId('otroVisibleAccion1').style.display='none';
			    			dom.byId('otroVisibleAccion2').style.display='none';
			    			dom.byId('otroVisibleAccion3').style.display='none';
			        			registry.byId('nomOtroComite').set ('required',false);
			        			dom.byId('avanceOtroDt').style.display='block';
					        
			    		}
			        	dataOtroDtA.items = [];
			        	
			        	for(var a in opcionesStore){
			        		if( opcionesStore[a].cTipoPcc==3 ){
//			        			if(opcionesStore[a].cPccIdentificador == itemToEdit.idComite){
			        			if(opcionesStore[a].cPccIdentificador == registry.byId("idSelect").get('value') ){

					        		var arregloOpciones = {              	
					                      	idActividad: opcionesStore[a].cOpciones,
					                      	idObjetivo: opcionesStore[a].cOpciones,
					        	        	objetivo : opcionesStore[a].descripOpcion,
					        	        	actividad : opcionesStore[a].cOpciones,
					        	        	meta: "",
					        	        	avance: ""
					        		};
					        		dataOtroDtA.items.push(arregloOpciones);
			            		}	
			        		}        		        	
			            }	        	

			        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
			            registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);

			            gridRNE1 = registry.byId('avanceOtroDt');
				        var headerGrid =gridRNE1.domNode.firstElementChild;
						headerGrid.style.display="none";			    	
			        	        	
			        });

	        	

			    var actividadComite1 = new FilteringSelect({
			           id: 'actividadComite1',
			           value:itemToEdit.actividadComite1,
			           store: pStoreAC,
			           width:100,
			           //readOnly:true,
			           searchAttr: 'name'
		        }, 'actividadComite1');
			    
				    		   		   
			    var accion1 = new ValidationTextBox({
		           promptMessage:"Escriba la acci\u00f3n por cumplir en este comit\u00e9",
		           value:itemToEdit.accion1, 
		           trim:"true",
		           //readOnly:edit,
		           //readOnly:true,
		           //required:true,
		           uppercase: true,
		           maxLength:"250",
		           style:"display:block; width:280px"
		        }, 'accion1');
				   
			    var accion2 = new ValidationTextBox({
		           promptMessage:"Escriba la acci\u00f3n por cumplir en este comit\u00e9",
		           value:itemToEdit.accion2, 
		           trim:"true",
		           //readOnly:edit,
		           //readOnly:true,
		           //required:true,
		           uppercase: true,
		           maxLength:"250",
		           style:"display:block; width:280px"
		        }, 'accion2');
			    
			    var accion3 = new ValidationTextBox({
		           promptMessage:"Escriba la acci\u00f3n por cumplir en este comit\u00e9",
		           value:itemToEdit.accion3, 
		           trim:"true",
		           //readOnly:edit,
		           //readOnly:true,
		           uppercase: true,
		           maxLength:"250",
		           style:"display:block; width:280px"
		        }, 'accion3');
					  	    		
			    var accion4 = new ValidationTextBox({
		           promptMessage:"Escriba la acci\u00f3n por cumplir en este comit\u00e9",
		           value:itemToEdit.accion4, 
		           trim:"true",
		           //readOnly:edit,
		           //readOnly:true,
		           uppercase: true,
		           maxLength:"250",
		           style:"display:block; width:280px"
		        }, 'accion4');
					  	    		
			    var accion5 = new ValidationTextBox({
		           promptMessage:"Escriba la acci\u00f3n por cumplir en este comit\u00e9",
		           value:itemToEdit.accion5, 
		           trim:"true",
		           //readOnly:edit,
		           //readOnly:true,
		           uppercase: true,
		           maxLength:"250",
		           style:"display:block; width:280px"
		        }, 'accion5');
			    
			    new ValidationTextBox({    		           
		           value:itemToEdit.noIntegrantes, 
		           trim:"true",
		           required : true,
		           readOnly:edit,
		           regExp : constants.NUMBER_VALID,
		           maxLength:"3",
		           style:"display:block; width:50px"
		        }, 'noIntegrantes');
				   
			    new ValidationTextBox({	   		           
			           value:itemToEdit.nombrePresidente, 
			           trim:"true",
			           uppercase: true,
			           maxLength:"250",
			           required : true,
			           readOnly:edit,
			           style:"display:block; width:280px"
		        }, 'nombrePresidente');
				  
				new FilteringSelect({
			           id: 'idSelectCalidad',
			           value:itemToEdit.idCalidad,
			           store: calidadStore,
			           readOnly:edit,
			           searchAttr: 'name'
		        }, 'calidadPresidente');	  
					
				new FilteringSelect({
				           id: 'idSelectAcuerdo',
				           value:itemToEdit.idAcuerdo,
				           store: acuerdoStore,
				           readOnly:edit,
				           searchAttr: 'name'
		        }, 'acuerdoComite');	
				
				
				
			        	
			        	
				
				 if(itemToEdit != null){
				    	gridRNE1 = registry.byId('avanceOtroDt');
				    	var headerGrid =gridRNE1.domNode.firstElementChild;
						headerGrid.style.display="none";
				    	if(itemToEdit.accion1 != null){
				    		
					    		items = itemToEdit.accion1.split(",-");
						        
						        for(var a=0; a< items.length; a++){
						        	for ( var j = 0; j < gridRNE1.rowCount; j++) {
							        	var item2 = gridRNE1.getItem(j);
							        			        	
							        	if(array.indexOf( items[a], "=" ) != -1 ){
							        		items2s = items[a].split(",=");
							        		if( items2s[0] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
								        		gridRNE1.selection.setSelected(j, true);	
								        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
								        		registry.byId('otroDt').set("value",items2s[1]);
								        		break;
								        	}	
							        	} else {
							        		if( items[a] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
								        		gridRNE1.selection.setSelected(j, true);	
								        		break;
								        	}		
							        	}
							        	        		
							        }	
						        }
					       }	        	        	        
			        }
				         			    
			    //------------------------------------
			    jsUtils.createTag('div','prBtnAceptar','dcDetail');
			    new Button({
			    	label : " Aceptar ",
						onClick : function() {

							if( registry.byId("idSelect").get('displayedValue') == "Otro" ){			    		
				    			registry.byId('nomOtroComite').set ('required',true);
				    		} else {    
				        			registry.byId('nomOtroComite').set ('required',false);
							}
							if(registry.byId("idSelect").get('value')==0)
							{
								utils.cstmAlert('Favor de selecionar un comite');
								return false;
							}
		   					var form = registry.byId('dDetail');
		   					if (!form.validate()){  
		   						utils.cstmAlert('Favor de registrar los datos requeridos');
		   						return false;
		   					}
		   					if (registry.byId("noIntegrantes").get('value')==0){  
		   						utils.cstmAlert('Debe registrar al menos un integrante en el comite');
		   						return false;
		   					}
		   					if( registry.byId("idSelect").get('displayedValue') == "Otro" ){
		 						if(registry.byId("nomOtroComite").get('value') == null || registry.byId("nomOtroComite").get('value') == ''){
		 							utils.cstmAlert('Favor de registrar el nombre del otro comite');
			    						return false;	
		 						}
		 						
		 						if(registry.byId("accion1").get('value') == null || registry.byId("accion1").get('value') == ''){
		 							utils.cstmAlert('Favor de registrar la primer accion del comite');
			    						return false;	
		 						}
		 						
		 						if(registry.byId("accion2").get('value') == null || registry.byId("accion2").get('value') == ''){
		 							utils.cstmAlert('Favor de registrar la segunda accion del comite');
			    						return false;	
		 						}
		 							
		 					}
		   					
		   					if(registry.byId("actividadComite1").get('value')==0 || registry.byId("actividadComite1").get('value') == null || registry.byId("actividadComite1").get('value') == '')
							{
								utils.cstmAlert('Favor de selecionar una respuesta al cumplimiento del plan de actividades del comite');
								return false;
							}
		   					
		   					var gridRNE = registry.byId('avanceOtroDt');
			 				   
		   				    if(otrosSeleccionadoActivo==1){
		   					   if(registry.byId("otroDt").get('value')==null || registry.byId("otroDt").get('value') == ''){
		   						   utils.cstmAlert('Favor de registrar el OTRO Recurso no econ\u00f3mico');
		   		                   return false;
		   		    		   }				   
		   				    }
		   					
		   				    
		   				 if( registry.byId("idSelect").get('displayedValue') == "Otro" ){			    		
		 	    			
		 	    		} else {
		 			    
		 			    var otrosCuales = "";
		 			    var checador=0;
		 				   if(rneSeleccionados.length>0){
		 					   
		 					   for ( var j = 0; j < gridRNE.rowCount; j++) {
		 						   var item2 = gridRNE.getItem(j);
		 						   if( array.indexOf(rneSeleccionados,gridRNE.store.getValue(item2,'idActividad'))!=-1 ){
		 							   checador++;
		 							   otrosCuales += gridRNE.store.getValue(item2,'idActividad');
		 							   
		 							   if(gridRNE.store.getValue(item2,'meta')){
		 								   otrosCuales += ",="+gridRNE.store.getValue(item2,'meta');   
		 							   }						   
		 							   if(gridRNE.store.getValue(item2, "objetivo")=="Otros"){
		 								   otrosCuales += ",="+registry.byId("otroDt").get('value');
		 							   }
		 							   
		 							   otrosCuales += ",-";
		 						   }
		 					   }
		 					   
		 					//   alert(otrosCuales);
		 					   registry.byId('accion1').set ('value',otrosCuales);
		 				}
		 				   if(checador<2){
		 					   utils.cstmAlert('Favor de registrar al menos dos acciones');
		 	                   return false;
		 				   }
		 	    		}
		   					var grid = registry.byId('7_1Grid');
		   					
		   					
		   					

		   					try{
		   						if(edit){
		   							var index = grid.selection.selectedIndex;
		   							var item = grid.getItem(index);
		   							grid.store.setValue(item, 'indComite', registry.byId("idSelect").get('value'));
		   							grid.store.setValue(item, 'nomComite', registry.byId("idSelect").get('displayedValue'));
		   							grid.store.setValue(item, 'numIntegrantes',  registry.byId("noIntegrantes").get('value'));
		   							grid.store.setValue(item, 'nomPresidente',  registry.byId("nombrePresidente").get('value'));
		   							grid.store.setValue(item, 'idCalidad',  registry.byId("idSelectCalidad").get('value'));
		   							grid.store.setValue(item, 'nomCalidad',  registry.byId("idSelectCalidad").get('displayedValue'));
		   							grid.store.setValue(item, 'idAcuerdo',  registry.byId("idSelectAcuerdo").get('value'));       			    							
		   							grid.store.setValue(item, 'acuerdo',  registry.byId("idSelectAcuerdo").get('displayedValue'));
		   							grid.store.setValue(item, 'nomOtroComite', registry.byId("nomOtroComite").get('value'));
		   							grid.store.setValue(item, 'accion1',registry.byId('accion1').get('value'));
		   							grid.store.setValue(item, 'actividadComite1',registry.byId('actividadComite1').get('value'));
		   							grid.store.setValue(item, 'accion2',registry.byId('accion2').get('value'));
		   							grid.store.setValue(item, 'accion3',registry.byId('accion3').get('value'));
		   							grid.store.setValue(item, 'accion4',registry.byId('accion4').get('value'));
		   							grid.store.setValue(item, 'accion5',registry.byId('accion5').get('value'));
			
		   						} else {
		   							 var myNewItem = {  ceComites: ++maxIndexComites, 
		   									 			idComite: registry.byId("idSelect").get('value'),
					    									nomComite:  registry.byId("idSelect").get('displayedValue'),
					    									numIntegrantes:   registry.byId("noIntegrantes").get('value'),
					    									nomPresidente:  registry.byId("nombrePresidente").get('value'),
					    									idCalidad:  registry.byId("idSelectCalidad").get('value'),nomCalidad: registry.byId("idSelectCalidad").get('displayedValue'),
					    									idAcuerdo:  registry.byId("idSelectAcuerdo").get('value'),
					    									acuerdo:  registry.byId("idSelectAcuerdo").get('displayedValue'),
					    									nomOtroComite: 	registry.byId("nomOtroComite").get('value'),
					    			            			accion1: registry.byId('accion1').get('value'),
					    		                			actividadComite1: registry.byId('actividadComite1').get('value'),
					    			            			accion2: registry.byId('accion2').get('value'),
					    			            			accion3: registry.byId('accion3').get('value'),
					    			            			accion4: registry.byId('accion4').get('value'),
					    			            			accion5: registry.byId('accion5').get('value')
					    			
									      				 };	    							 
								         grid.store.newItem(myNewItem);
		   						}
		   						registry.byId('dDetail').destroyRecursive(false);
		   					}catch(e){
		   						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
		   						console.log(e);
		   					}	
		   					
		 				}     
			    },'prBtnAceptar');		    
		    }

	

			function temasFun(){
				if(listTemasG.length==0){
					listTemasG = new Array();
					listTemasG.push({name:"Fomento de actividades relacionadas con la lectura y aprovechamiento de la infraestructura disponible para ello ",id:1});
					listTemasG.push({name:"Mejoramiento de la infraestructura (NO relacionado con el programa Escuela Digna).",id:2});
					listTemasG.push({name:"Rehabilitaci\u00f3n de planteles escolares 'Escuelas Dignas'",id:3});
					listTemasG.push({name:"De protecci\u00f3n civil y de seguridad de las escuelas.",id:4});
					listTemasG.push({name:"De impulso a la activaci\u00f3n f\u00edsica.",id:5});
					listTemasG.push({name:"De actividades recreativas, art\u00edsticas o culturales.",id:6});
					listTemasG.push({name:"De desaliento de las pr\u00e1cticas que generen violencia.",id:7});
					listTemasG.push({name:"De establecimiento de consumo escolar.",id:8});
					listTemasG.push({name:"De cuidado al medio ambiente y limpieza del entorno escolar.",id:9});
					listTemasG.push({name:"De alimentaci\u00f3n saludable.",id:10});
					listTemasG.push({name:"De integraci\u00f3n educativa.",id:11});
					listTemasG.push({name:"De nuevas tecnolog\u00edas.",id:12});
					listTemasG.push({name:"Contralor\u00eda social",id:13});
					listTemasG.push({name:"Otro",id:14});
					listTemasG.push({name:"Otro",id:15});
					listTemasG.push({name:"Otro",id:16});
				}
			}
			function calidadPresidenteFun(){
				if(listCalidadPresidenteG.length==0){
					listCalidadPresidenteG = new Array();
					listCalidadPresidenteG.push({name:"Presidente del Consejo Escolar de Participaci\u00F3n Social",id:1});
					listCalidadPresidenteG.push({name:"Secretario T\u00E9cnico del Consejo Escolar",id:2});
					listCalidadPresidenteG.push({name:"Consejera madre de familia",id:3});
					listCalidadPresidenteG.push({name:"Consejero padre de familia",id:4});
					listCalidadPresidenteG.push({name:"Consejero representante de la Asociaci\u00F3n de Padres de Familia, o agrupaci\u00F3n equivalente",id:5});
					listCalidadPresidenteG.push({name:"Consejero maestro",id:6});
					listCalidadPresidenteG.push({name:"Consejero representante de la organizaci\u00F3n sindical",id:7});
					listCalidadPresidenteG.push({name:"Consejero director (a) escolar",id:8});
					listCalidadPresidenteG.push({name:"Consejero miembro de la comunidad escolar",id:9});
					listCalidadPresidenteG.push({name:"Consejero ex alumno",id:10});		 				
				}
				if( listAcuerdosComite.length==0){
					listAcuerdosComite = new Array();
					listAcuerdosComite.push({name:"Presentaron un programa de actividades",id:1});
					listAcuerdosComite.push({name:"Presentar\u00e1n programa de actividades antes de la siguiente sesi\u00F3n del Consejo",id:2});
				}
			}		  
		  

			function funFederal ( itemToEdit ){
    	    	var edit=false;
 			    if(!itemToEdit){
 				  itemToEdit={cPrograma: 0,nomPrograma:'',monto:'', montoStr:'',seguimiento:"",avance:""};
// 			    	itemToEdit={	selectedItem:-1,
//   			     cPrograma: -1,
//   			     seguimiento: -1,
//   			     avance: null,
//   			     recibido: 0,
//   			     recibidoTxt: "",
//   			     ejercido: 0,
//   			     ejercidoTxt: ""
// 			    };
 			    }else{
 				   edit=true;
 			    }
 			    //----------------------------Diseño de la ventana
    	    	var title = 'Programa federal';
    	    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
    	    	registry.byId('dDetail').on('hide',function(){
 				   												registry.byId('dDetail').destroyRecursive(false);
			   													});
    	    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
 			    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
 			    jsUtils.createTag('div','prCnt','dcDetail'); 			    
 			    
 			    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
						    			   '<tr><td>'+
						    			   '	<b>*Programa: </b><div id="prSelect" /><br/>'+
						    			   '</td></tr>'+
						    			   '<tr><td>'+
						    			   '	<b>Objetivo General:<br/> </b><input id="objetivoGral" /><br/>'+
						    			   '</td></tr>'+
						    			   '<tr id="gridVisible" >' +
						    			   '	<td><input id="GridDtNewFederal"/></td>'+
						    			   '</tr>'+
						    			   '<tr id="otro3Visible"><td>'+
						    			   '	<b>*Otro Programa:</div> </b><div id="nomOtroPrograma"/><br/>'+
						    			   '</td></tr>'+
						    			   '<tr id="otro1Visible">' +
						    			   '	<td><b>*Objetivo: </b><div id="strObjetivo" /><br/></td>'+
						    			   '</tr>'+
						    			   '<tr id="otro2Visible">' +
						    			   '	<td><b>*Meta: </b><div id="strMeta" /><br/></td>'+
						    			   '</tr>'+
						    			   '<tr id="otro4Visible">' +
						    			   '	<td><b>*Avance: </b><div id="seguimientoSelect" /><br/></td>'+		    			   
						    			   '<tr><td>'+
						    			   '<tr><td>'+
						    			   '<b>Recursos no econ\u00f3micos asignados a la escuela por parte del Programa</b>'+
						    			   '</td></tr>'+
						    			   '<tr style="display: none">' +
						    			   '	<td><input id="avanceDt"/></td>'+
						    			   '</tr>'+				    			   
						    			   '<tr>' +
						    			   '	<td><input id="avanceOtroDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr>' +
						    			   '	<td><input id="otroDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr id="trMontoL"><td> '+
						    			   '	 <b>*Recursos de los programas</b><br/>'+
						    			   '</td></tr>'+
						    			   '<table> '+
						    			   '  <col width="130"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="180"> '+
						    			   '  <tr> '+
						    			   '    <td>Monto asignado:</td> '+
						    			   '    <td><input id="monto"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="montoStr"/></td> '+
						    			   '  </tr> '+
						    			   '  <tr> '+
						    			   '    <td>Monto ejercido:</td> '+
						    			   '    <td><input id="montoEjercido"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="ejercidoStr"/></td> '+
						    			   '  </tr> '+
						    			   '</table> '+
						    			   '</table>';
 			         			    
 			    var layoutDt = [[	{ name: 'No.', field:'idObjetivo', width: '20px'},        			          		            			          		    
    			          		    { name: 'Selecci\u00F3n de Objetivo',	
    			          				    field:'idSeleccion',
    			          				    width: "120px",        			          				   
    			          				    type: dojox.grid.cells.Bool,
    			          				    editable: true, 	hidden:true
    			          			},
    			          			{ name: 'Objetivos especificos del programa', field: 'objetivo', width: '250px'},        			          				
    			          			{ name: 'Meta de la escuela', field: 'meta', 
    			          					editable: true, 
    			          					width: '250px', 
    			          				    type: gridCellsDijit._Widget,
    			          				    widgetClass: ValidationTextBox, 
    			          				    widgetProps: {uppercase:'true', maxlength: '250'} 
    			          			},
    			          			{ name: '*Avance en Metas', field: 'avance', 
			          					editable: true, 
			          					width: '200px', 
			          					type: dojox.grid.cells.ComboBox,
			          	                options: ["Menos del 60%",
			          	                          "Entre el 61 y el 75%",
			          	                          "Entre el 76 y el 90%",
			          	                          "Entre el 91 y el 99%",
			          	                          "El 100%"
			          	                         ] 
			          			    }
    			          		]];
 			         			   
 			   var layoutOtros = [[	{ name: 'No.', field:'idObjetivo', width: '20px'},        			          		    
 			                        { name: 'Objetivo especifico del programa', field: 'objetivoOtro', 
					     					editable: true, 
					     					width: '250px', 
					     				    type: gridCellsDijit._Widget,
					     				    widgetClass: ValidationTextBox, 
					     				    widgetProps: {uppercase:'true', maxlength: '250'} 
					     			 },
    			          			 { name: 'Meta de la escuela', field: 'metaOtro', 
    			          					editable: true, 
    			          					width: '250px', 
    			          				    type: gridCellsDijit._Widget,
    			          				    widgetClass: ValidationTextBox, 
    			          				    widgetProps: {uppercase:'true', maxlength: '250'} 
    			          			 },
					     			 { name: 'Monto', field: 'montoOtro', 
			          					editable: true, 
			          					width: '100px', 
			          				    type: gridCellsDijit._Widget,
			          				    widgetClass: ValidationTextBox, 
			          				    widgetProps: {uppercase:'true', maxlength: '50'} 
			          			     }
    			          		]];
 			        			    		
 			  var layoutOtroDt = [ 
 			                        [   		  
 			                        { name: 'No.', field: 'value', width: '10%'},	                        
 				          			{ name: 'Recurso no economico', field: 'label', width: '60%'},        			          				
 				          			{ name: 'Meta de la escuela', field: 'respuesta', 
 			          					editable: true, 
 			          					width: '250px', 
 			          				    type: gridCellsDijit._Widget,
 			          				    widgetClass: ValidationTextBox, 
 			          				    widgetProps: {uppercase:'true', maxlength: '250'} 
 			          			 }
 				          		]];
 			    
 				    var layoutOtro1Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
 					          			{ name: 'Recurso no econ\u00F3mico', field: 'objetivo', width: '400px'},        			          				
 					          			{ name: '*Respuesta', field: 'meta', 
 					          					editable: true, 
 					          					width: '250px', 
 					          				    type: gridCellsDijit._Widget,
 					          				    widgetClass: ValidationTextBox, 
 					          				    widgetProps: {uppercase:'true', maxlength: '250'} 
 					          			}
 					          		]];

 				    var layoutOtro2Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
 						          			{ name: 'Recurso no econ\u00F3mico', field: 'objetivo', width: '650px'},        			          				
 						          			{ name: 'Meta de la escuela', field: '_item', hidden:true,
 						          					editable: true, 
 						          					width: '250px' 
 						          			}
 						          		]];

 			    var checkDt = null;
 			    var rneSeleccionados = '';
 			    var otrosSeleccionado = null;
 			    var otrosSeleccionadoActivo = 0;
 			    
 			    if(itemToEdit!=null){
 				    if(itemToEdit.cPrograma>=81){
 					    checkDt =[{
 										// First, our view using the _CheckBoxSelector custom type
 										type: "dojox.grid._CheckBoxSelector"
 									},
 									layoutOtro1Dt
 								];
 				    } else {
 				    	checkDt =[{
 							// First, our view using the _CheckBoxSelector custom type
 							type: "dojox.grid._CheckBoxSelector"
 						},
 						layoutOtro2Dt
 					];
 				    	}
 			    }

 			   
 			   
 			    		new DataGrid({
			          		id: 'GridDtNewFederal',
			          		structure: layoutDt,
			          		//autoHeight: true,
			          		height: '150px',
			          		rowSelector: '20px'}
			          	   ,'GridDtNewFederal').startup();
 			    		 
 			    		new Textarea({
 	    					trim : true,
 	    					uppercase: true,
 							readOnly:true,
 	    					style : "width:750px;"
 	    				}, "objetivoGral"); 		
   			    //---------------------------------- Datos     			    
			    
 			    var	otroRecurso = "";
 			    var entrar=0;    
		        var data=[];			        			    
			    var dataDtA = {
		          		identifier: "idObjetivo",
		          		items: []
			    };
    			      		
			    
		        var n = 0;
		        idSeguimiento = itemToEdit.avance;
		        
		        if(edit==true){			  
		        	if(itemToEdit.idPrograma>=81){
		        		dom.byId('otro1Visible').style.display='block';
	        			dom.byId('otro2Visible').style.display='block';
	        			dom.byId('otro3Visible').style.display='block';
	        			dom.byId('otro4Visible').style.display='block';
	        			//registry.byId('strObjetivo').set ('required',true);
	        			//registry.byId('strMeta').set ('required',true);
	        			registry.byId('GridDtNewFederal').set("style","display:none");
		        	} else {			
		        		dom.byId('otro1Visible').style.display='none';
	        			dom.byId('otro2Visible').style.display='none';
	        			dom.byId('otro3Visible').style.display='none';
	        			dom.byId('otro4Visible').style.display='none';
				        for(var objFed in listObjetivosG){
			        		if(listObjetivosG[objFed].idProg == itemToEdit.idPrograma ){
			        			var tmpMeta = "";
			        			var tmpSeleccion = false;
			        			var tmpAvance = "";
			        			if(itemToEdit.objetivosSel == null){
			        				for(var idI in programasRegistrados){
			        					if(programasRegistrados[idI].idPrograma = itemToEdit.idPrograma){
			        						if(listObjetivosG[objFed].id == programasRegistrados[idI].idobjetivo ){
			        							tmpSeleccion = true;
												tmpMeta=programasRegistrados[idI].meta;
												if(programasRegistrados[idI].avance == 1){
													tmpAvance = "Menos del 60%";
								        		} else if(programasRegistrados[idI].avance == 2){
								        			tmpAvance = "Entre el 61 y el 75%";
								        		}else if(programasRegistrados[idI].avance == 3){
								        			tmpAvance = "Entre el 76 y el 90%";
								        		}else if(programasRegistrados[idI].avance == 4){
								        			tmpAvance = "Entre el 91 y el 99%";
								        		}else if(programasRegistrados[idI].avance == 5){
								        			tmpAvance = "El 100%";
								        		}
												
			        						}
			        					}
			        				}
			        			} else {
			        				for(var idObjActividad in itemToEdit.objetivosSel){
										if(itemToEdit.objetivosSel[idObjActividad].idObjetivo == listObjetivosG[objFed].id){
											tmpSeleccion = true;
											tmpMeta=itemToEdit.objetivosSel[idObjActividad].meta;
											if(itemToEdit.objetivosSel[idObjActividad].avance == 1){
												tmpAvance = "Menos del 60%";
							        		} else if(itemToEdit.objetivosSel[idObjActividad].avance == 2){
							        			tmpAvance = "Entre el 61 y el 75%";
							        		}else if(itemToEdit.objetivosSel[idObjActividad].avance == 3){
							        			tmpAvance = "Entre el 76 y el 90%";
							        		}else if(itemToEdit.objetivosSel[idObjActividad].avance == 4){
							        			tmpAvance = "Entre el 91 y el 99%";
							        		}else if(itemToEdit.objetivosSel[idObjActividad].avance == 5){
							        			tmpAvance = "El 100%";
							        		}
										}	
									}	
			        			}
								
			        			var arregloObjetivos1 = {
	    					        	                  	id:+n,
	    					        	                  	idObjetivo: listObjetivosG[objFed].id,
						    					        	idSeleccion : tmpSeleccion	,
						    					        	objetivo : listObjetivosG[objFed].name,
						    					        	meta:tmpMeta,
						    					        	avance:tmpAvance
	    								   				};			        						        			
	    					        
			        			dataDtA.items.push(arregloObjetivos1);			        			
			        			
			        			for(var prFd in listcProgFed[0]){
    					        	if(listcProgFed[0][prFd].cPrograma == itemToEdit.idPrograma){
    					        		registry.byId('objetivoGral').set('value',listcProgFed[0][prFd].objetivo);
    					        	}
    					        }
			        		}
			        	} 
		        	}
		        } else {
		        	dom.byId('otro1Visible').style.display='none';
        			dom.byId('otro2Visible').style.display='none';
        			dom.byId('otro3Visible').style.display='none';
        			dom.byId('otro4Visible').style.display='none';
        			
		        }
		        
		        var newStoreDtA = new ItemFileWriteStore({data: dataDtA});
		        
		        registry.byId('GridDtNewFederal').setStore(newStoreDtA);			        			        
		        
		        var data=[{name:"[Seleccione]",   id:"0"}];
		        
		        for(var a in federalesStore){
		             data.push({name:federalesStore[a].nomPrograma,
		                          id:federalesStore[a].cPrograma});
		        }
		     
		        
		        var pStore = new Memory({
		            data: data
		        });
		        
		        var aSeguimiento= new Array(	{label:"Menos del 60%", value:1},
						{label:"Entre el 61 y el 75%", value:2},
						{label:"Entre el 76 y el 90%", value:3},
						{label:"Entre el 91 y el 99%", value:4},
						{label:"El 100%", value:5} );


				var dataSeguimiento=[{name:"[Seleccione]",   id:"0"}];
				
				for(var a in aSeguimiento){
					dataSeguimiento.push({name:aSeguimiento[a].label,
				          			id:aSeguimiento[a].value});
				}

		        var segStore = new Memory({
		            data: dataSeguimiento
		        });

		        var dataOtroDtA = {
		          		identifier: "idActividad",
		          		items: []
		      	};
		        
		        if(itemToEdit != null){
		        	for(var a in opcionesStore){
		        		if( opcionesStore[a].cTipoPcc==1 && opcionesStore[a].cTipoPrograma==1 ){
		        			if(opcionesStore[a].cPccIdentificador == itemToEdit.cPrograma ){

				        		var arregloOpciones = {              	
				                      	idActividad: opcionesStore[a].cOpciones,
				                      	idObjetivo: 0,
				        	        	objetivo : opcionesStore[a].descripOpcion,
				        	        	actividad : opcionesStore[a].cOpciones,
				        	        	meta: "",
				        	        	avance: ""
				        		};
				        		dataOtroDtA.items.push(arregloOpciones);
				        		
		            		}	
		        		}        		        	
		            }	        	
		        }
		        
		        //Lista de avances        
		       
 			  avanceFederalSelect = new CheckedMultiSelect({
					name : "Avance",
					multiple : true,
					invalidMessage:'',
					required: false
				}, 'seguimiento');
		        
		        
		        
 			    //---------------------------------- Dojo
 			   var programa = new FilteringSelect({
		           id: 'prSelect',
		           value:itemToEdit.idPrograma,
		           store: pStore,
		           readOnly:edit,
		           searchAttr: 'name'
		        }, 'prSelect').on ('change', function(){
		        	    		        	
		        	    var gridFed = registry.byId('1Grid');
    		        	for ( var i = 0; i < gridFed.rowCount; i++) {

			 				var item = gridFed.getItem(i);
			 				
			 				if( gridFed.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
			 					utils.cstmAlert("Ya existe registrado el Programa Federal");
			 					return;
			 				}

			 			}
		        		if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
		        			    				 			    		
		        			registry.byId('objetivoGral').set('value',"");
		        			dom.byId('otro1Visible').style.display='block';
		        			dom.byId('otro2Visible').style.display='block';
		        			dom.byId('otro3Visible').style.display='block';
		        			dom.byId('otro4Visible').style.display='block';
		        	//		registry.byId('strObjetivo').set ('required',true);
		        	//		registry.byId('strMeta').set ('required',true);
		        	//		registry.byId('nomOtroPrograma').set ('required',true);
		        			registry.byId('GridDtNewFederal').set("style","display:none");
		        			    		        			
		        		} else {    
		        			if(dom.byId('GridDtNewFederal').style.display=='none'){
		        				dom.byId('otro1Visible').style.display='none';
    		        			dom.byId('otro2Visible').style.display='none';
    		        			dom.byId('otro3Visible').style.display='none';
    		        			dom.byId('otro4Visible').style.display='none';
    		        			registry.byId('strObjetivo').set ('required',false);
    		        			registry.byId('strMeta').set ('required',false);
    		        			registry.byId('nomOtroPrograma').set ('required',false);
    		        			registry.byId('seguimientoSelect').set ('required',false);
    		        			
					        	registry.byId('GridDtNewFederal').set("style","display:block");        		        			
					        } 
		        			var n=0;
					        var dataDt1 = {
							          		identifier: "idObjetivo",
							          		items: []
					          			   };
					        
					        for(var objFed in listObjetivosG ){
	    		        		if(listObjetivosG[objFed].idProg == registry.byId("prSelect").get('value')){
	    		        			var arregloObjetivos1 = {
		    					        	                  	id:+n,
		    					        	                  	idObjetivo: listObjetivosG[objFed].id,
							    					        	idSeleccion : false	,
							    					        	objetivo : listObjetivosG[objFed].name,
							    					        	meta:" "
		    								   				};
		    					        
	    					        dataDt1.items.push(arregloObjetivos1);    					         
	    		        		}
	    		        	}    
					        					            					        
					        var newStoreDt1 = new ItemFileWriteStore({data: dataDt1});
					        registry.byId('GridDtNewFederal').setStore(newStoreDt1);

					        for(var prFd in listcProgFed[0]){
					        	if(listcProgFed[0][prFd].cPrograma == registry.byId("prSelect").get('value')){
					        		registry.byId('objetivoGral').set('value',listcProgFed[0][prFd].objetivo);
					        	}
					        }    					            					        
		        		}
		        		
		        		
		        		dataOtroDtA.items = [];
			        	
			        	for(var a in opcionesStore){
			        		if( opcionesStore[a].cTipoPcc==1 ){
			        			if(opcionesStore[a].cPccIdentificador == registry.byId("prSelect").get('value') ){

					        		var arregloOpciones = {              	
					                      	idActividad: opcionesStore[a].cOpciones,
					                      	idObjetivo: opcionesStore[a].cOpciones,
					        	        	objetivo : opcionesStore[a].descripOpcion,
					        	        	actividad : opcionesStore[a].cOpciones,
					        	        	meta: "",
					        	        	avance: ""
					        		};
					        		dataOtroDtA.items.push(arregloOpciones);
			            		}	
			        		}        		        	
			            }	        	

			        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
			            registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);
			            
			            gridRNE1 = registry.byId('avanceOtroDt');
				        var headerGrid =gridRNE1.domNode.firstElementChild;
						headerGrid.style.display="none";

		        });
		        
			    			  
		    // Campo nombre otro Programa
			    var nomOtroPrograma = new ValidationTextBox({
	   		           promptMessage:"Nombre de Otro Programa",
	   		           value:itemToEdit.nomOtroPrograma, 
	   		           trim:"true",   
	   		           uppercase: true,
	   		           maxLength:"250",
	   		           style:"display:block; width:280px"
	   		        }, 'nomOtroPrograma');
			    
			    var strObjetivo = new ValidationTextBox({
		           promptMessage:"Objetivo especifico del programa",
		           value:itemToEdit.objetivo, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           style:"display:block; width:280px"
		        }, 'strObjetivo');

				var seguimiento = new FilteringSelect({
			           id: 'seguimientoSelect',
			           value:itemToEdit.seguimiento,
			           store: segStore,
			           searchAttr: 'name',
			           style:"width:480px",
			           required: false,
			        }, 'seguimientoSelect');
			    
 			var strMeta = new ValidationTextBox({
		           promptMessage:"Meta de la escuela",
		           value:itemToEdit.meta, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           style:"display:block; width:280px"
		        }, 'strMeta');
     			
 			   
 			  var monto=  new ValidationTextBox({
		           promptMessage:"Capture solo n\u00FAmeros",
		           id:'monto',
		           regExp: constants.NUMBER_VALID,
		           value:itemToEdit.monto, 
		           trim:"true",  
		           maxLength:"9",
		           required: "true",
		           style:"display:block; width:150px"
		         }, 'monto').on ('Blur', function(){
			   
					   var monto= registry.byId("monto").get('value');
				       
					   	if(monto!=''){
					       
					       if(monto==0){
					    	   registry.byId('montoStr').set('value','CERO');
					       }
					       else if(monto>=0){
					    	   
   				    		registry.byId('montoStr').set('value',jsUtils.covertirNumLetras(registry.byId("monto").get('value')));    					    	   
					       }
					       else{
					    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
	    						return false;
					       }
				       	}
		         });
 			    
 			 var montoEjer=  new ValidationTextBox({
		           promptMessage:"Capture solo n\u00FAmeros",
		           id:'montoEjercido',
		           regExp: constants.NUMBER_VALID,
		           value:itemToEdit.ejercido, 
		           trim:"true",  
		           maxLength:"9",
		           required: "true",
		           style:"display:block; width:150px"
		         }, 'montoEjercido').on ('Blur', function(){
		   
				   var montoEjercidoVal= registry.byId("montoEjercido").get('value');
			       
				   	if(montoEjercidoVal!=''){
				       
				       if(montoEjercidoVal==0){
				    	   registry.byId('ejercidoStr').set('value','CERO');
				       }
				       else if(montoEjercidoVal>=0){
				    	   
				    		registry.byId('ejercidoStr').set('value',jsUtils.covertirNumLetras(montoEjercidoVal));    					    	   
				       }
				       else{
				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
  						return false;
				       }
			       	}
	         });
 			 
 			   var montoLetra= new ValidationTextBox({
		           promptMessage:"Capture solo letras",
		           value:itemToEdit.montoStr, 
		           regExp:constants.NoNUMBER_VALID,
		           id:'montoStr',
		           trim:"true",    
		           maxLength:"200",
		           style:"display:block; width:480px",
		           readOnly: true,
		           //required: "true"
		        }, 'montoStr');
 			   
 			  var ejercidoStr = new Textarea({
		        	id: "ejercidoStr",
		        	value: itemToEdit.ejercidoTxt,
					trim : true,
					uppercase: true,
					readOnly:true,
					style : "width:480px;"
				}, "ejercidoStr");
 			  
 			 new ValidationTextBox({
					name : "otroDt",
					id : "otroDt",
					value: otroRecurso,
					promptMessage : "Capture otro recurso",
					trim : true,
					style : "display:none;",
					maxLength: 255,
					placeHolder : "Especifique",
					required: false
				}, "otroDt");
 			 
 			 
 			var gridTmp = new DataGrid({
 		  		id: 'avanceOtroDt',
 		  		structure: checkDt,
 		  		height: '100px',
 		  		rowSelector: '20px',
 		  		onHeaderCellClick: function() {
 		  		    alert('click header');  
 		  		},
 		  		onRowClick: function(e){
 		            this.edit.rowClick(e);
 		            //this.selection.clickSelectEvent(e);
 		         },
 		  		onSelectionChanged: function(item){
 		  			var items = this.selection.getSelected();
 		  			
 					rneSeleccionados = dojo.map(items, function(item){
 						if(this.store.getValue(item, "objetivo")=="Otros"){
 							otrosSeleccionado=1;	
 						}										
 						
 						return this.store.getValue(item, "idActividad");
 					}, this);
 					
 					if (otrosSeleccionado==1) {
 						if(itemToEdit.cPrograma<81){
 							registry.byId('otroDt').set("style","display:block");	
 							registry.byId('otroDt').set("required",true);
 							otrosSeleccionadoActivo=1;
 						}					
 						otrosSeleccionado=0;		
 					} else if (otrosSeleccionado==0) {
 				    	registry.byId('otroDt').set("style","display:none");
 						registry.byId('otroDt').reset();
 						registry.byId('otroDt').set("required",false);
 						otrosSeleccionadoActivo=0;
 					}				
 									
 			  		}
 		  		}
 	  	    ,'avanceOtroDt').startup();								
 							
 			var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
 	        registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);
 	                
 	        gridRNE1 = registry.byId('avanceOtroDt');                
 	        
 	        query(".gridxRowHeaderHeaderCell").style("visibility","hidden");
 	        
 			var headerGrid =gridRNE1.domNode.firstElementChild;
 			headerGrid.style.display="none";
 	        
 	        if(itemToEdit.avance != null){
 		        items = itemToEdit.avance.split(",-");
 		        
 		        for(var a=0; a< items.length; a++){
 		        	for ( var j = 0; j < gridRNE1.rowCount; j++) {
 			        	var item2 = gridRNE1.getItem(j);
 			        			        	
 			        	if(array.indexOf( items[a], "=" ) != -1 ){
 			        		items2s = items[a].split(",=");
 			        		if( items2s[0] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
 				        		gridRNE1.selection.setSelected(j, true);
 				        		if(itemToEdit.cPrograma<81){
 				        			registry.byId('otroDt').set("value",items2s[1]);
 				        		} else {
 				        			gridRNE1.store.setValue(item2, 'meta', items2s[1]);	
 				        		}
 				        		
 				        		break;
 				        	}	
 			        	} else {
 			        		//if( array.indexOf( items[a], gridRNE1.store.getValue(item2,'idActividad')) != -1) {	        			
 			        		if( items[a] == gridRNE1.store.getValue(item2,'idActividad') ) {
 				        		gridRNE1.selection.setSelected(j, true);	
 				        		break;
 				        	}		
 			        	}
 			        	        		
 			        }	
 		        }	        	        
 	        }        

 			 
 			   //------------------------------------
 			    jsUtils.createTag('div','prBtnAceptar','dcDetail');
 			    new Button({
 			    				label : " Aceptar " ,
 			    				onClick : function() {
 			    					
 			    					var form = registry.byId('dDetail');
 			    					if (!form.validate()){  
 			    						utils.cstmAlert('Favor de registrar los datos requeridos');
 			    						return false;
 			    					}
 			    					
 			    					var data = avanceFederalSelect.getOptions();
 			    					var tSeguimiento = "";
 			    					
 			    					
 			    					var objetivosSel = new Array();      			    					
   			    					var objetivosGrid = registry.byId('GridDtNewFederal');
   			    					var tmpObjetivo = "";
   			    					var tmpMeta = "";
   			    					var tmpnomOtroPrograma = "";
   			    					
 			    					if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
 			    						
 			    						if( registry.byId("strObjetivo").get('value') == null || registry.byId("strObjetivo").get('value') == ''){
 			    							utils.cstmAlert('Favor de registrar objetivo del Programa Federal');
     			    						return false;
 			    						}
 			    						if( registry.byId("strMeta").get('value') == null || registry.byId("strMeta").get('value') == ''){
 			    							utils.cstmAlert('Favor de registrar la meta del Programa Federal');
     			    						return false;
 			    						}
 			    						if( registry.byId("nomOtroPrograma").get('value') == null || registry.byId("nomOtroPrograma").get('value') == ''){
 			    							utils.cstmAlert('Favor de registrar el Nombre del Programa Federal Otro');
     			    						return false;
     			    					}
 			    						if (registry.byId("seguimientoSelect").get('value')==null || registry.byId("seguimientoSelect").get('value') == 0){  
     										utils.cstmAlert('Favor de registrar el avance');
     										return false;
     										}
 			    						tmpObjetivo = registry.byId("strObjetivo").get('value');
 			    						tmpMeta = registry.byId("strMeta").get('value');
 			    						tmpnomOtroPrograma = registry.byId("nomOtroPrograma").get('value');
 			    						
 			    					} else {
       			    					
       			    					longitudMeta = 0;
       			    					
       			    					for ( var i = 0; i < objetivosGrid.rowCount; i++) {

       			    						var item = objetivosGrid.getItem(i);														
       			    									
       			    						if( objetivosGrid.store.getValue(item,'meta') != null  && objetivosGrid.store.getValue(item,'meta').trim() != "" ){
       			    							
       			    							if( objetivosGrid.store.getValue(item,'avance') == null  || objetivosGrid.store.getValue(item,'avance')== "" ){
       	     										utils.cstmAlert('Favor de registrar el avance');
       	     										return false;
       			    								
       			    							}
       			    							tmpAvance = objetivosGrid.store.getValue(item,'avance');
       			    							avanceInt = "";
       			    							       				          	                          
    							        		if(tmpAvance == "Menos del 60%"){								
    												avanceInt = 1;
    							        		} else if(tmpAvance == "Entre el 61 y el 75%"){			        			
    							        			avanceInt = 2;
    							        		}else if(tmpAvance == "Entre el 76 y el 90%"){			        			
    							        			avanceInt = 3;
    							        		}else if(tmpAvance == "Entre el 91 y el 99%"){			        			
    							        			avanceInt = 4;
    							        		}else if(tmpAvance == "El 100%"){			        			
    							        			avanceInt = 5;
    							        		}
    							        		
       			    							var objetivos = {
       			    												idObjetivo : 	objetivosGrid.store.getValue(item,'idObjetivo'),       	       			    							
			       	       			    							meta : 			objetivosGrid.store.getValue(item,'meta'),
			       	       			    							avance: avanceInt,
			       	       			    							seguimiento: tSeguimiento
			       	       			    							};       	       			    									
       			    							objetivosSel.push(objetivos);
       			    							
       			    							if(objetivosGrid.store.getValue(item,'meta').length>250){
       			    								longitudMeta=1;
       			    							}
       			    						}
       			    						
       			    					}
       			    					       			    					       			    					
       			    					if (objetivosSel.length==0){  
     			    						utils.cstmAlert('Favor de registrar al menos una meta del Programa Federal');
     			    						return false;
     			    					}
       			    					
       			    					if (longitudMeta!=0){  
       			    						utils.cstmAlert('La longitud m\u00e1xima de una meta es de 250 caracteres');
       			    						return false;
       			    					}
 			    					} 			    					 			    					
 			    					
 			    					
 			    					var data = avanceFederalSelect.getOptions();
 						   		   
 			    				   var gridRNE = registry.byId('avanceOtroDt');
 			    				   
 			    				   if(otrosSeleccionadoActivo==1){
 			    					   if(registry.byId("otroDt").get('value')==null || registry.byId("otroDt").get('value') == ''){
 			    						   utils.cstmAlert('Favor de registrar el OTRO Recurso no econ\u00f3mico');
 			    		                   return false;
 			    		    		   }				   
 			    				   }
 			    				   
 			    				   var otrosCuales = "";
 			    				   if(rneSeleccionados.length>0){
 			    					   for ( var j = 0; j < gridRNE.rowCount; j++) {
 			    						   var item2 = gridRNE.getItem(j);
 			    						   if( array.indexOf(rneSeleccionados,gridRNE.store.getValue(item2,'idActividad'))!=-1 ){
 			    							   otrosCuales += gridRNE.store.getValue(item2,'idActividad');
 			    							   
 			    							   if(gridRNE.store.getValue(item2,'meta')){
 			    								   otrosCuales += ",="+gridRNE.store.getValue(item2,'meta');   
 			    							   }						   
 			    							   if(gridRNE.store.getValue(item2, "objetivo")=="Otros"){
 			    								   otrosCuales += ",="+registry.byId("otroDt").get('value');
 			    							   }
 			    							   
 			    							   otrosCuales += ",-";
 			    						   }
 			    					   }
 			    					   //alert(otrosCuales);
 			    				   }
 			    				   
 			    					var tSeguimiento = otrosCuales;

 			    					var grid = registry.byId('1Grid');
 			    					
 			    					try{
 			    						if(edit){
 			    							var index = grid.selection.selectedIndex;
 			    							var item = grid.getItem(index);
 			    							//grid.store.setValue(item, 'idPrograma', registry.byId("prSelect").get('value'));
 			    							//grid.store.setValue(item, 'nomPrograma', registry.byId("prSelect").get('displayedValue'));
 			    							grid.store.setValue(item, 'monto', registry.byId("monto").get('value'));
 			    							grid.store.setValue(item, 'montoStr', registry.byId("montoStr").get('value'));
 			    							grid.store.setValue(item, 'recibido', registry.byId("montoEjercido").get('value'));
 			    							grid.store.setValue(item, 'recibidoStr', registry.byId("ejercidoStr").get('value')); 			    							
 			    							grid.store.setValue(item, 'objetivos', objetivosSel);
 			    							grid.store.setValue(item, 'objetivo', tmpObjetivo);
 			    							grid.store.setValue(item, 'meta', tmpMeta);
 			    							grid.store.setValue(item, 'nomOtroPrograma', tmpnomOtroPrograma);
// 			    							grid.store.setValue(item, 'seguimiento', tSeguimiento);
// 			    							grid.store.setValue(item, 'avance', registry.byId("seguimientoSelect").get('value'));
 			    							grid.store.setValue(item, 'avance', tSeguimiento);
 			    							grid.store.setValue(item, 'seguimiento', registry.byId("seguimientoSelect").get('value'));
 			    							
 			    						} else {
 			    							 var myNewItem = {  cPrograma: registry.byId("prSelect").get('value'), 
		     			    									idPrograma: registry.byId("prSelect").get('value'),
		     			    									nomPrograma:  registry.byId("prSelect").get('displayedValue'),
		     			    									monto:  registry.byId("monto").get('value'),
		     			    									montoStr:  registry.byId("montoStr").get('value'),
		     			    									recibido:  registry.byId("montoEjercido").get('value'),
		     			    									recibidoStr:  registry.byId("ejercidoStr").get('value'),
		     			    									objetivos:  objetivosSel,
		     			    									objetivo: tmpObjetivo,
		     			    									meta: tmpMeta,
		     			    									nomOtroPrograma: tmpnomOtroPrograma,
//		     			    									seguimiento: tSeguimiento,
//		     			    									avance: registry.byId("seguimientoSelect").get('value')
		     			    									seguimiento:registry.byId("seguimientoSelect").get('value'),
		     			    									avance:  tSeguimiento
 										      				 };	    							 
 		    						         grid.store.newItem(myNewItem);
 			    						}
 			    						registry.byId('dDetail').destroyRecursive(false);
 			    					}catch(e){
 			    						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
 			    						console.log(e);
 			    					}	     			    					
 			    				}
 			    			},'prBtnAceptar');
 			   
    	    }
			
			function seguimientoFederal(itemToEdit,sesionPrograma){
				//-----------------------
				idLectura = true;

				if(itemToEdit == null){
					itemToEdit={ selectedItem:-1,
	            			     cPrograma: -1,
	            			     seguimiento: -1,
	            			     avance: null,
	            			     recibido: 0,
	            			     recibidoTxt: "",
	            			     ejercido: 0,
	            			     ejercidoTxt: ""
	            			   };
					
					idLectura = false;

				}
				//----------------------------Diseño de la ventana
		    	var title = 'Programa federal';
		    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
		    	registry.byId('dDetail').on('hide',function(){
					   												registry.byId('dDetail').destroyRecursive(false);
			   													});
		    	
		    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
			    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
			    jsUtils.createTag('div','prCnt','dcDetail');
				    		    
			    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
						    			   '<tr><td>'+
						    			   '	<b>*Programa: </b><div id="prSelect" /><br/>'+
						    			   '</td></tr>'+
						    			   '<tr><td>'+
						    			   '	<b>Objetivo General:<br/> </b><input id="objetivoGral" /><br/>'+
						    			   '</td></tr>'+
						    			   '<tr id="gridVisible" >' +
						    			   '	<td><input id="GridDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr id="otro3Visible"><td>'+
						    			   '	<b>*Otro Programa:</div> </b><div id="nomOtroPrograma"/><br/>'+
						    			   '</td></tr>'+
						    			   '<tr id="otro1Visible">' +
						    			   '	<td><b>*Objetivo: </b><div id="strObjetivo" /><br/></td>'+
						    			   '</tr>'+
						    			   '<tr id="otro2Visible">' +
						    			   '	<td><b>*Meta: </b><div id="strMeta" /><br/></td>'+		    			   
						    			   '<tr><td>'+
						    			   '<tr id="otro4Visible">' +
						    			   '	<td><b>*Avance: </b><div id="seguimientoSelect" /><br/></td>'+		    			   
						    			   '<tr><td>'+
						    			   '<b>Recursos no econ\u00f3micos asignados a la escuela por parte del Programa</b>'+
						    			   '</td></tr>'+
						    			   '<tr style="display: none">' +
						    			   '	<td><input id="avanceDt"/></td>'+
						    			   '</tr>'+				    			   
						    			   '<tr>' +
						    			   '	<td><input id="avanceOtroDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr>' +
						    			   '	<td><input id="otroDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr id="trMontoL"><td> '+
						    			   '	 <b>*Recursos de los programas</b><br/>'+
						    			   '</td></tr>'+
						    			   '<table> '+
						    			   '  <col width="130"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="180"> '+
						    			   '  <tr> '+
						    			   '    <td>Monto asignado:</td> '+
						    			   '    <td><input id="montoAsignado"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="montoStr"/></td> '+
						    			   '  </tr> '+
						    			   '  <tr> '+
						    			   '    <td>Monto ejercido:</td> '+
						    			   '    <td><input id="montoEjercido"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="ejercidoStr"/></td> '+
						    			   '  </tr> '+
						    			   '</table> '+
						    			   '</table>';
				         			    
			    var layoutDt = [[	{ name: 'No.', field:'idObjetivo', width: '20px'},		          		    
				          			{ name: 'Objetivos especificos del programa', field: 'objetivo', width: '220px'},        			          				
				          			{ name: 'Meta de la escuela', field: 'meta', width: '250px', editable: !idLectura },
				          			{ name: '*Avance en Metas', field: 'avance', 
			          					editable: true, 
			          					width: '200px', 
			          					type: dojox.grid.cells.ComboBox,
			          	                options: ["Menos del 60%",
			          	                          "Entre el 61 y el 75%",
			          	                          "Entre el 76 y el 90%",
			          	                          "Entre el 91 y el 99%",
			          	                          "El 100%"
			          	                         ] 
			          			    }
				          		]];
				   
			    var layoutOtroDt = [ 
			                        [   		  
			                        { name: 'No.', field: 'value', width: '10%'},	                        
				          			{ name: 'Recurso no economico', field: 'label', width: '60%'},        			          				
				          			{ name: 'Meta de la escuela', field: 'respuesta', 
			          					editable: true, 
			          					width: '250px', 
			          				    type: gridCellsDijit._Widget,
			          				    widgetClass: ValidationTextBox, 
			          				    widgetProps: {uppercase:'true', maxlength: '250'} 
			          			 }
				          		]];
			    
				    var layoutOtro1Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
					          			{ name: 'Recurso no econ\u00F3mico', field: 'objetivo', width: '400px'},        			          				
					          			{ name: '*Respuesta', field: 'meta', 
					          					editable: true, 
					          					width: '250px', 
					          				    type: gridCellsDijit._Widget,
					          				    widgetClass: ValidationTextBox, 
					          				    widgetProps: {uppercase:'true', maxlength: '250'} 
					          			}
					          		]];

				    var layoutOtro2Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
						          			{ name: 'Recurso no econ\u00F3mico', field: 'objetivo', width: '650px'},        			          				
						          			{ name: 'Meta de la escuela', field: '_item', hidden:true,
						          					editable: true, 
						          					width: '250px' 
						          			}
						          		]];

				    var checkDt = null;
				    var rneSeleccionados = '';
				    var otrosSeleccionado = null;
				    var otrosSeleccionadoActivo = 0;
				    
				    if(itemToEdit!=null){
					    if(itemToEdit.cPrograma>=81){
						    checkDt =[{
											// First, our view using the _CheckBoxSelector custom type
											type: "dojox.grid._CheckBoxSelector"
										},
										layoutOtro1Dt
									];
					    } else {
					    	checkDt =[{
								// First, our view using the _CheckBoxSelector custom type
								type: "dojox.grid._CheckBoxSelector"
							},
							layoutOtro2Dt
						];
					    	}
				    }
			    
				new DataGrid({
			  		id: 'GridDt',
			  		structure: layoutDt,
			  		height: '100px',
			  		rowSelector: '20px'}
		  	    ,'GridDt').startup();
				    		 		 
				new Textarea({
					trim : true,
					uppercase: true,
					readOnly:true,
					style : "width:750px;"
				}, "objetivoGral"); 
				
				avanceFederalSelect = new CheckedMultiSelect({
					name : "Avance",
					multiple : true,
					invalidMessage:'',
					required: true
				}, 'avanceDt');
				
			    //---------------------------------- Datos
				var dataDtFed = {
		          		identifier: "idActividad",
		          		items: []
		      	};
			 
				nomOtro = "";
				objOtro = "";
				metaOtro = "";
				otroRecurso = "";
				idSeguimiento = itemToEdit.seguimiento;
				
				//tDetalle4 = [];
				
//				for(var i in tDetalle){
//					if(tDetalle[i].cSesion!=4){
//						tDetalle[i].avance = '';
//					}
//				}
//				
//				for(var i in tDetalle){
//					if(tDetalle[i].cSesion==4){
//						tDetalle4.push(tDetalle[i]);
//					}
//				}
//				
//				if(tDetalle4.length <= 0)
//				{
//					tDetalle4 = tDetalle;
//				}
				
				if(itemToEdit.selectedItem != -1){
					
					if(itemToEdit.cPrograma>=81){
		        		dom.byId('otro1Visible').style.display='block';
		    			dom.byId('otro2Visible').style.display='block';
		    			dom.byId('otro3Visible').style.display='block';
		    			dom.byId('otro4Visible').style.display='block';
		    			registry.byId('GridDt').set("style","display:none");
		    			
		    			for(var idI in tDetalle4){    									    				
				        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
				        		nomOtro  = tDetalle4[idI].nomOtroPrograma;
				        		objOtro  = tDetalle4[idI].objetivo;
				    			metaOtro = tDetalle4[idI].meta;
				    			
				    			//if( itemToEdit.cSesion == 4 ){
				    				itemToEdit.avance = tDetalle4[idI].seguimiento;
					    			idSeguimiento = tDetalle4[idI].avance;	
//				    			} else {
//				    				itemToEdit.avance = "";
//					    			idSeguimiento = "";
//				    			}				    			
				        	}		        				
		    			}
		    			    			    				        		        	
		        	} else {
		        		dom.byId('otro1Visible').style.display='none';
		    			dom.byId('otro2Visible').style.display='none';
		    			dom.byId('otro3Visible').style.display='none';
		    			dom.byId('otro4Visible').style.display='none';

		        		for(var idI in tDetalle4){    							
				        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
				        		tmpAvance = "";

//				        		if( itemToEdit.cSesion == 4 ){
				        			if(tDetalle4[idI].avance == '1'){
										tmpAvance = "Menos del 60%";
					        		} else if(tDetalle4[idI].avance =='2'){
					        			tmpAvance = "Entre el 61 y el 75%";
					        		}else if(tDetalle4[idI].avance == '3'){
					        			tmpAvance = "Entre el 76 y el 90%";
					        		}else if(tDetalle4[idI].avance == '4'){
					        			tmpAvance = "Entre el 91 y el 99%";
					        		}else if(tDetalle4[idI].avance == '5'){
					        			tmpAvance = "100%";
					        		}	
				        		//}				        		
				        		
				        		var arregloObjetivos1Fed = {              	
				                      	idActividad: tDetalle4[idI].idObjetivo,
				                      	idObjetivo: tDetalle4[idI].idObjetivo,
				        	        	objetivo : tDetalle4[idI].objetivo,
				        	        	actividad : tDetalle4[idI].objetivo,
				        	        	meta: tDetalle4[idI].meta,
				        	        	avance: tmpAvance,
				        	        	cSesion: tDetalle4[idI].cSesion
				        		};
				        		dataDtFed.items.push(arregloObjetivos1Fed);
				        		itemToEdit.avance = tDetalle4[idI].seguimiento;
				        	}		        				
		    			}        		        		
		        	}
				} else {
					idLectura = false;
					dom.byId('otro1Visible').style.display='none';
	 				dom.byId('otro2Visible').style.display='none';
	 				dom.byId('otro3Visible').style.display='none';
	 				dom.byId('otro4Visible').style.display='none';
				}

			    var newStoreDtA = new ItemFileWriteStore({data: dataDtFed});
			    
		        registry.byId('GridDt').setStore(newStoreDtA);
		        
		        var data=[{name:"[Seleccione]",   id:"0"}];
		        
		        for(var a in federalesStore){
		             data.push({name:federalesStore[a].nomPrograma,
		                          id:federalesStore[a].cPrograma});
		        }
		     
		        var pStore = new Memory({
		            data: data
		        });

		        
		        //Lista de avances        
		        			
		        var aSeguimiento= new Array(	{label:"Menos del 60%", value:1},
		        								{label:"Entre el 61 y el 75%", value:2},
		        								{label:"Entre el 76 y el 90%", value:3},
		        								{label:"Entre el 91 y el 99%", value:4},
		        								{label:"El 100%", value:5} );
		         
		        
		        var dataSeguimiento=[{name:"[Seleccione]",   id:"0"}];
		        
		        for(var a in aSeguimiento){
		        	dataSeguimiento.push({name:aSeguimiento[a].label,
		                          			id:aSeguimiento[a].value});
		        }
		     
		        
		        
		        var segStore = new Memory({
		            data: dataSeguimiento
		        });
		        
		        var dataOtroDtA = {
		          		identifier: "idActividad",
		          		items: []
		      	};
		        
		        if(itemToEdit != null){
		        	for(var a in opcionesStore){
		        		if( opcionesStore[a].cTipoPcc==1 && opcionesStore[a].cTipoPrograma==1 ){
		        			if(opcionesStore[a].cPccIdentificador == itemToEdit.cPrograma ){

				        		var arregloOpciones = {              	
				                      	idActividad: opcionesStore[a].cOpciones,
				                      	idObjetivo: 0,
				        	        	objetivo : opcionesStore[a].descripOpcion,
				        	        	actividad : opcionesStore[a].cOpciones,
				        	        	meta: "",
				        	        	avance: ""
				        		};
				        		dataOtroDtA.items.push(arregloOpciones);
				        		
		            		}	
		        		}        		        	
		            }	        	
		        } 
		        
		        new Textarea({
		        	value: itemToEdit.recibidoTxt,
					trim : true,
					uppercase: true,
					readOnly:true,
					style : "width:150px;"
				}, "montoStr");
		        
		        var ejercidoStr = new Textarea({
		        	id: "ejercidoStr",
		        	value: itemToEdit.ejercidoTxt,
					trim : true,
					uppercase: true,
					readOnly:true,
					style : "width:150px;"
				}, "ejercidoStr");
		        //
		        var montoEjer=  new ValidationTextBox({
			           promptMessage:"Capture solo n\u00FAmeros",
			           id:'montoEjercido',
			           regExp: constants.NUMBER_VALID,
			           value:itemToEdit.ejercido, 
			           trim:"true",  
			           maxLength:"9",
			           required: "true",
			           style:"display:block; width:150px"
			         }, 'montoEjercido').on ('Blur', function(){
 			   
 					   var montoEjercidoVal= registry.byId("montoEjercido").get('value');
 				       
 					   	if(montoEjercidoVal!=''){
 					       
 					       if(montoEjercidoVal==0){
 					    	   registry.byId('ejercidoStr').set('value','CERO');
 					       }
 					       else if(montoEjercidoVal>=0){
 					    	   
    				    		registry.byId('ejercidoStr').set('value',jsUtils.covertirNumLetras(montoEjercidoVal));    					    	   
 					       }
 					       else{
 					    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
	    						return false;
 					       }
 				       	}
 		         });		        
			    //---------------------------------- Dojo
			    var programa = new FilteringSelect({
		           id: 'prSelect',
		           value:itemToEdit.cPrograma,
		           store: pStore,
		           readOnly:idLectura,
		           searchAttr: 'name'
		        }, 'prSelect');
		        	   		   
			 // Campo nombre otro Programa
			    var montoRecibido = new ValidationTextBox({
				           promptMessage:"Monto Asignado",
				           value : itemToEdit.recibido,
				           trim:"true",   
				           uppercase: true,
				           maxLength:"250",
				           //readOnly:idLectura,
				           style:"display:block; width:150px"				        	   
				        }, 'montoAsignado').on ('Blur', function(){
							   
							   var monto= registry.byId("montoAsignado").get('value');
						       
							   	if(monto!=''){
							       
							       if(monto==0){
							    	   registry.byId('montoStr').set('value','CERO');
							       }
							       else if(monto>=0){
							    	   
		   				    		registry.byId('montoStr').set('value',jsUtils.covertirNumLetras(registry.byId("montoAsignado").get('value')));    					    	   
							       }
							       else{
							    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
			    						return false;
							       }
						       	}
				         });
				    
			    
			 // Campo nombre otro Programa
			    var nomOtroPrograma = new ValidationTextBox({
				           promptMessage:"Nombre de Otro Programa",
				           value : nomOtro,
				           trim:"true",   
				           uppercase: true,
				           maxLength:"250",
				           readOnly:idLectura,
				           style:"display:block; width:280px"
				        }, 'nomOtroPrograma');
			    
			    var strObjetivo = new ValidationTextBox({
		          promptMessage:"Objetivo especifico del programa",
		          value: objOtro,
		          trim:"true",
		          uppercase: true,
		          maxLength:"250",
		          readOnly:idLectura,
		          style:"display:block; width:280px"
		       }, 'strObjetivo');
			   
				var strMeta = new ValidationTextBox({
		          promptMessage:"Meta de la escuela",
		          value:metaOtro,
		          trim:"true",
		          uppercase: true,
		          maxLength:"250",
		          readOnly:idLectura,
		          style:"display:block; width:280px"
		       }, 'strMeta');
				
				var seguimiento = new FilteringSelect({
			           id: 'seguimientoSelect',
			           value:idSeguimiento,
			           store: segStore,
			           searchAttr: 'name',
			           style:"width:480px"
			        }, 'seguimientoSelect');
				
				new ValidationTextBox({
					name : "otroDt",
					id : "otroDt",
					value: otroRecurso,
					promptMessage : "Capture otro recurso",
					trim : true,
					style : "display:none;",
					maxLength: 255,
					placeHolder : "Especifique",
					required: false
				}, "otroDt");
				
				var gridTmp = new DataGrid({
			  		id: 'avanceOtroDt',
			  		structure: checkDt,
			  		height: '100px',
			  		rowSelector: '20px',
			  		onHeaderCellClick: function() {
			  		    alert('click header');  
			  		},
			  		onRowClick: function(e){
			            this.edit.rowClick(e);
			            //this.selection.clickSelectEvent(e);
			         },
			  		onSelectionChanged: function(item){
			  			var items = this.selection.getSelected();
			  			
						rneSeleccionados = dojo.map(items, function(item){
							if(this.store.getValue(item, "objetivo")=="Otros"){
								otrosSeleccionado=1;	
							}										
							
							return this.store.getValue(item, "idActividad");
						}, this);
						
						if (otrosSeleccionado==1) {
							if(itemToEdit.cPrograma<81){
								registry.byId('otroDt').set("style","display:block");	
								registry.byId('otroDt').set("required",true);
								otrosSeleccionadoActivo=1;
							}					
							otrosSeleccionado=0;		
						} else if (otrosSeleccionado==0) {
					    	registry.byId('otroDt').set("style","display:none");
							registry.byId('otroDt').reset();
							registry.byId('otroDt').set("required",false);
							otrosSeleccionadoActivo=0;
						}				
										
				  		}
			  		}
		  	    ,'avanceOtroDt').startup();								
								
				var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
		        registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);
		                
		        gridRNE1 = registry.byId('avanceOtroDt');                
		        
		        query(".gridxRowHeaderHeaderCell").style("visibility","hidden");
		        
				var headerGrid =gridRNE1.domNode.firstElementChild;
				headerGrid.style.display="none";
		        
		        if(itemToEdit.avance != null){
			        items = itemToEdit.avance.split(",-");
			        
			        for(var a=0; a< items.length; a++){
			        	for ( var j = 0; j < gridRNE1.rowCount; j++) {
				        	var item2 = gridRNE1.getItem(j);
				        			        	
				        	if(array.indexOf( items[a], "=" ) != -1 ){
				        		items2s = items[a].split(",=");
				        		if( items2s[0] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
					        		gridRNE1.selection.setSelected(j, true);
					        		if(itemToEdit.cPrograma<81){
					        			registry.byId('otroDt').set("value",items2s[1]);
					        		} else {
					        			gridRNE1.store.setValue(item2, 'meta', items2s[1]);	
					        		}
					        		
					        		break;
					        	}	
				        	} else {
				        		//if( array.indexOf( items[a], gridRNE1.store.getValue(item2,'idActividad')) != -1) {	        			
				        		if( items[a] == gridRNE1.store.getValue(item2,'idActividad') ) {
					        		gridRNE1.selection.setSelected(j, true);	
					        		break;
					        	}		
				        	}
				        	        		
				        }	
			        }	        	        
		        }        

				
			    //------------------------------------
				//------------------------------------
			    jsUtils.createTag('div','prBtnAceptar','dcDetail');
			    new Button({ 
				   label : " Aceptar " ,
				   onClick : function() {
					   var detGrid = registry.byId('GridDt');
					   
					   
					   if (registry.byId("montoEjercido").get('value')==null || registry.byId("montoEjercido").get('value') == ''){  
							utils.cstmAlert('Favor de registrar el monto Ejercido');
							return false;
						}
					   
					   
						var tSeguimiento = "";
						
						 var data = avanceFederalSelect.getOptions();
				   		   
						   var gridRNE = registry.byId('avanceOtroDt');
						   
						   if(otrosSeleccionadoActivo==1){
							   if(registry.byId("otroDt").get('value')==null || registry.byId("otroDt").get('value') == ''){
								   utils.cstmAlert('Favor de registrar el OTRO Recurso no econ\u00f3mico');
				                   return false;
				    		   }				   
						   }
						   
						   var otrosCuales = "";
						   if(rneSeleccionados.length>0){
							   for ( var j = 0; j < gridRNE.rowCount; j++) {
								   var item2 = gridRNE.getItem(j);
								   if( array.indexOf(rneSeleccionados,gridRNE.store.getValue(item2,'idActividad'))!=-1 ){
									   otrosCuales += gridRNE.store.getValue(item2,'idActividad');
									   
									   if(gridRNE.store.getValue(item2,'meta')){
										   otrosCuales += ",="+gridRNE.store.getValue(item2,'meta');   
									   }						   
									   if(gridRNE.store.getValue(item2, "objetivo")=="Otros"){
										   otrosCuales += ",="+registry.byId("otroDt").get('value');
									   }
									   
									   otrosCuales += ",-";
								   }
							   }
							   //alert(otrosCuales);
						   }
						   
							var tSeguimiento = otrosCuales;

						
						if(itemToEdit.cPrograma<81){
		                    tmpVacio = 1;
		                    for ( var i = 0; i < detGrid.rowCount; i++) {
		                          var item2 = detGrid.getItem(i);         
		                          if( detGrid.store.getValue(item2,'avance') == null || detGrid.store.getValue(item2,'avance') == ''){
		                                 tmpVacio = 0;
		                          }                                                  
		             }
		                    if (tmpVacio==0){  
		                          utils.cstmAlert('Favor de registrar el avance');
		                          return false;
		                    }
		             } else {
		                    if (registry.byId("seguimientoSelect").get('value')==null || registry.byId("seguimientoSelect").get('value') == 0){  
		                          utils.cstmAlert('Favor de registrar el avance');
		                          return false;
		                    }      
		             }      

						
					   if(sesionPrograma==1){
						    var grid = registry.byId('1Grid');
							try{
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);						
								//------------------ Seguimiento diferente otros
								if(itemToEdit.cPrograma<81){
     
									for(var idI in tDetalle4){    							
							        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
							        		for ( var i = 0; i < detGrid.rowCount; i++) {
						    					var item2 = detGrid.getItem(i);		
						    					if( detGrid.store.getValue(item2,'idActividad') == tDetalle4[idI].idObjetivo){
						    						tmpAvance = detGrid.store.getValue(item2,'avance');			        		                                                    
									        		if(tmpAvance == "Menos del 60%"){								
														tDetalle4[idI].avance = 1;
									        		} else if(tmpAvance == "Entre el 61 y el 75%"){			        			
									        			tDetalle4[idI].avance = 2;
									        		}else if(tmpAvance == "Entre el 76 y el 90%"){			        			
									        			tDetalle4[idI].avance = 3;
									        		}else if(tmpAvance == "Entre el 91 y el 99%"){			        			
									        			tDetalle4[idI].avance = 4;
									        		}else if(tmpAvance == "El 100%"){			        			
									        			tDetalle4[idI].avance = 5;
									        		}							        		
						    					}				        		    
							        		}
							        	tDetalle4[idI].seguimiento=tSeguimiento;
							        	
							        	}
									}
								} else {
									for(var idI in tDetalle4){    							
							        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){			    											
											tDetalle4[idI].avance = registry.byId("seguimientoSelect").get('value');
					    					tDetalle4[idI].seguimiento=tSeguimiento;					        	
							        	}
									}
									grid.store.setValue(item, 'seguimiento', registry.byId("seguimientoSelect").get('value'));	
								}
												
								grid.store.setValue(item, 'avance', tSeguimiento);
								grid.store.setValue(item, 'recibido', registry.byId("montoEjercido").get('value'));
								grid.store.setValue(item, 'recibidoStr', registry.byId("ejercidoStr").get('value'));
								grid.store.setValue(item, 'monto', registry.byId("montoAsignado").get('value'));
								grid.store.setValue(item, 'montoStr', registry.byId("montoStr").get('value'));
			
			
								registry.byId('dDetail').destroyRecursive(false);
							} catch(e){
									utils.cstmAlert('Ocurrio un error al Editar');
									console.log(e);
							};						
					   } else {
						    var grid = registry.byId('1_1Grid');
							try{
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);						
								//------------------ Seguimiento diferente otros
								if(itemToEdit.cPrograma<81){
									for(var idI in tDetalle4){    							
							        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
							        		existeEnDetalle = 1;
							        		for ( var i = 0; i < detGrid.rowCount; i++) {
						    					var item2 = detGrid.getItem(i);		
						    					if( detGrid.store.getValue(item2,'idActividad') == tDetalle4[idI].idObjetivo){
						    						tmpAvance = detGrid.store.getValue(item2,'avance');
						    						
									        		if(tmpAvance == "Menos del 60%"){								
														tDetalle4[idI].avance = 1;
									        		} else if(tmpAvance == "Entre el 61 y el 75%"){			        			
									        			tDetalle4[idI].avance = 2;
									        		}else if(tmpAvance == "Entre el 76 y el 90%"){			        			
									        			tDetalle4[idI].avance = 3;
									        		}else if(tmpAvance == "Entre el 91 y el 99%"){			        			
									        			tDetalle4[idI].avance = 4;
									        		}else if(tmpAvance == "El 100%"){			        			
									        			tDetalle4[idI].avance = 5;
									        		}							        		
						    					}				        		    
							        		}
							        	tDetalle4[idI].seguimiento=tSeguimiento;
							        	
							        	}
									}
									
								} else {
									for(var idI in tDetalle4){    							
							        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){			    											
											tDetalle4[idI].avance = registry.byId("seguimientoSelect").get('value');
					    					tDetalle4[idI].seguimiento=tSeguimiento;					        	
							        	}
									}
									if(existeEnDetalle==0){
										tDetalle4.push();
									}
									grid.store.setValue(item, 'seguimiento', registry.byId("seguimientoSelect").get('value'));	
								}
												
								grid.store.setValue(item, 'avance', tSeguimiento);
			
								registry.byId('dDetail').destroyRecursive(false);
							} catch(e){
									utils.cstmAlert('Ocurrio un error al Editar');
									console.log(e);
							};					   
					   }				   
				    },
			    },'prBtnAceptar');		   
		    }
			
			function muestra(avanceSelect){
				
				var data = avanceSelect.getOptions();
				for ( var j = 0; j < data.length; j++) {
					if (data[j].label == "Otros" && data[j].selected == true) {
						registry.byId('otroDt').set("style","display:block");
						registry.byId('otroDt').set("required",true);
						
					} else if (data[j].label == "Otros"
							&& data[j].selected == false) {
						registry.byId('otroDt').set("style","display:none");
						registry.byId('otroDt').reset();
						registry.byId('otroDt').set("required",false);
								
					}
				}
			}
			
			function muestra1(avanceSelect){
				
				var data = avanceSelect.getOptions();
				for ( var j = 0; j < data.length; j++) {
					if (data[j].label == "Otros" && data[j].selected == true) {
						registry.byId('otroDt').set("style","display:block");
						registry.byId('otroDt').set("required",false);
						
					} else if (data[j].label == "Otros"
							&& data[j].selected == false) {
						registry.byId('otroDt').set("style","display:none");
						registry.byId('otroDt').reset();
						registry.byId('otroDt').set("required",false);
								
					}
				}
			}
			
			function seguimientoEstatalMunicipalOSC(option, itemToEdit,sesionPrograma){
				var edit=false;
				var newRow=false;
				if(!itemToEdit){
		 			   itemToEdit={cPrograma: 0,idPrograma:0, nomPrograma:'',objetivo:'',meta:'',monto:'', montoStr:'', montoEjercido:'',montoEjercidoStr:''};
		 			   newRow=true;
	 		    }else{
	 			   edit=true;
	 		    }
				//----------------------------Diseño de la ventana
		    	var title = option==2?'Programa Estatal':option==3?'Programa Municipal':'Programa OSC';
		    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
		    	registry.byId('dDetail').on('hide',function(){
					   												registry.byId('dDetail').destroyRecursive(false);
			   													});
		    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
			    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
			    jsUtils.createTag('div','prCnt','dcDetail');
				    
			    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
						    			   '<tr><td>'+
						    			   '	<b>*Programa: </b><div id="prSelect" /><br/>'+
						    			   '</td></tr>'+
						    			   '<tr id="otro3Visible" style="display:none"><td>'+
						    			   '	<b>*Otro Programa:</div> </b><div id="nomOtroPrograma"/><br/>'+
						    			   '</td></tr>'+
						    			   '<tr><td>'+
						    			   '	<b>*Objetivo: </b><div id="strObjetivo" /><br/>'+
						    			   '</td></tr>'+
						    			   '<tr><td>'+
						    			   '	<b>*Meta: </b><div id="strMeta" /><br/>'+
						    			   '</td></tr>'+				    			   
						    			   '<tr><td>'+
						    			   '	<b>*Avance: </b><div id="seguimientoSelect" /><br/>'+
						    			   '</td></tr>'+
						    			   '<tr><td>'+
						    			   '<b>Recursos no econ\u00f3micos asignados a la escuela por parte del Programa</b>'+
						    			   '</td></tr>'+				    			   
						    			   '<tr style="display: none">' +
						    			   '	<td><input id="avanceDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr>' +
						    			   '	<td><input id="avanceOtroDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr>' +
						    			   '	<td><input id="otroDt"/></td>'+
						    			   '</tr>'+
						    			   '<tr id="trMontoEL"><td> '+
						    			   '	 <b>*Recursos de los programas</b><br/>'+
						    			   '</td></tr>'+
						    			   '<table> '+
						    			   '  <col width="130"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="180"> '+
						    			   '  <tr> '+
						    			   '    <td>Monto asignado:</td> '+
						    			   '    <td><input id="montoAsignado"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="montoStr"/></td> '+
						    			   '  </tr> '+
						    			   '  <tr> '+
						    			   '    <td>Monto ejercido:</td> '+
						    			   '    <td><input id="montoEjercido"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="ejercidoStr"/></td> '+
						    			   '  </tr> '+
						    			   '</table> '+
						    			   '</table>'; 
			   
			    var layoutOtro1Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
					          		    { name: 'Selecci\u00F3n de Objetivo',	
					          				    field:'idSeleccion',
					          				    width: "120px",        			          				   
					          				    type: dojox.grid.cells.Bool,
					          				    editable: true, 	hidden:true
					          			},
					          			{ name: 'Recurso no econ\u00F3mico', field: 'objetivo', width: '400px'},        			          				
					          			{ name: '*Respuesta', field: 'meta', 
					          					editable: true, 
					          					width: '250px', 
					          				    type: gridCellsDijit._Widget,
					          				    widgetClass: ValidationTextBox, 
					          				    widgetProps: {uppercase:'true', maxlength: '250'} 
					          			}
					          		]];

				    var layoutOtro2Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
						          		    { name: 'Selecci\u00F3n de Objetivo',	
						          				    field:'idSeleccion',
						          				    width: "120px",        			          				   
						          				    type: dojox.grid.cells.Bool,
						          				    editable: true, 	hidden:true
						          			},
						          			{ name: 'Recurso no econ\u00F3mico', field: 'objetivo', width: '650px'},        			          				
						          			{ name: 'Meta de la escuela', field: 'meta', hidden:true,
						          					editable: true, 
						          					width: '250px', 
						          				    type: gridCellsDijit._Widget,
						          				    widgetClass: ValidationTextBox, 
						          				    widgetProps: {uppercase:'true', maxlength: '250'} 
						          			}
						          		]];

			    var checkDt = null;
			    var rneSeleccionados = '';
			    var otrosSeleccionado = null;
			    var otrosSeleccionadoActivo=0;
			    otroRecurso = "";
			    
			    if(itemToEdit!=null){
				    if( (option==2 && itemToEdit.cPrograma>=94) || (option==3 && itemToEdit.cPrograma>=109) || (option==4 && itemToEdit.cPrograma>=123) ){
					    checkDt =[{
										type: "dojox.grid._CheckBoxSelector"
									},
									layoutOtro1Dt
								];
				    } else {
				    	checkDt =[{
							type: "dojox.grid._CheckBoxSelector"
						},
						layoutOtro2Dt
					];
				    	}
			    }	    

			    
			    new ValidationTextBox({
					name : "otroDt",
					id : "otroDt",
					value : otroRecurso,
					promptMessage : "Capture otro recurso",
					trim : true,
					style : "display:none;width:280px",
					maxLength: 255,
					placeHolder : "Especifique OTRO Recurso no econ\u00f3mico",
					required: false
				}, "otroDt");
			    
			    new DataGrid({
			  		id: 'avanceOtroDt',
			  		structure: checkDt,
			  		height: '100px',
			  		rowSelector: '20px',
			  		singleClickEdit:true,
			  		onRowClick: function(e){
			            this.edit.rowClick(e);
			         },
			  		onSelectionChanged: function(item){
				  			var items = this.selection.getSelected();
			
							rneSeleccionados = dojo.map(items, function(item){
								
								if(this.store.getValue(item, "objetivo")=="Otros"){
									otrosSeleccionado=1;	
								}
								
								return this.store.getValue(item, "idActividad");
							}, this);
							
							if (otrosSeleccionado==1) {
								if( (option==2 && itemToEdit.cPrograma<94) || (option==3 && itemToEdit.cPrograma<109) || (option==4 && itemToEdit.cPrograma<123) ){
									registry.byId('otroDt').set("style","display:block");	
									registry.byId('otroDt').set("required",true);	
									otrosSeleccionadoActivo=1;
								}					
								otrosSeleccionado=0;		
							} else if (otrosSeleccionado==0) {
						    	registry.byId('otroDt').set("style","display:none");
								registry.byId('otroDt').reset();
								registry.byId('otroDt').set("required",false);	
								otrosSeleccionadoActivo=0;
							}
							//alert(tmp);
			  			}	         
			  		}
		  	    ,'avanceOtroDt').startup();
			    
		        query(".gridxRowHeaderHeaderCell").style("visibility","hidden");	    	    
			    
			    avanceProgSelect = new CheckedMultiSelect({
					name : "Avance",
					multiple : true,
					invalidMessage:'',
					required: true
				}, 'avanceDt');
			
				
				
				
			    //---------------------------------- Datos	        
		        var data=[{name:"[Seleccione]",     id:"0"}];
		        
		        if( option == 2 ){
		           for(var a in estatalesStore){
		                   data.push({name:estatalesStore[a].nomPrograma,
		                                 id:estatalesStore[a].cPrograma});
		              }  
		        }
		        if( option == 3 ){
		           for(var a in municipalesStore){
		                   data.push({name:municipalesStore[a].nomPrograma,
		                                 id:municipalesStore[a].cPrograma});
		              }  
		        }
		        if( option == 4 ){
		           for(var a in oscStore){
		                   data.push({name:oscStore[a].nomPrograma,
		                                 id:oscStore[a].cPrograma});
		              }  
		        }
		        
		        nomPrograma  = "";
				objPrograma  = "";
				metaPrograma = "";	
				otroRecurso = "";
				idSeguimiento = itemToEdit.seguimiento;
				
				tDetalle4 = [];
				
				for(var i in tDetalle){
					if(tDetalle[i].cSesion==4){
						tDetalle4.push(tDetalle[i]);
					}
				}
				
				if(tDetalle4.length <= 0)
				{
					tDetalle4 = tDetalle;
				}
				
				//idSeguimiento = itemToEdit.seguimiento;
		        if(option==2){        	
			        if(itemToEdit!= null){	
			        	//var tDetalle = segundaSesionObj.detalleSeguimiento?segundaSesionObj.detalleSeguimiento:[];
			        	if(itemToEdit.cPrograma>=94){
			        		dom.byId('otro3Visible').style.display='block';	        		        		
		        			for(var idI in tDetalle4){
		    		        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
		    		        		nomPrograma  = tDetalle4[idI].nomOtroPrograma;
		    		        		objPrograma  = tDetalle4[idI].objetivo;
		    		        		metaPrograma = tDetalle4[idI].meta;
		    		        		itemToEdit.avance = tDetalle4[idI].seguimiento;
		    		    			idSeguimiento = tDetalle4[idI].avance;
		    		        	}
		        			}
		        		} else {			
			        		dom.byId('otro3Visible').style.display='none';
			        		for(var idI in tDetalle4){
		    		        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
		    		        		nomPrograma  = tDetalle4[idI].nomOtroPrograma;
		    		        		objPrograma  = tDetalle4[idI].objetivo;
		    		        		metaPrograma = tDetalle4[idI].meta;
		    		        		itemToEdit.avance = tDetalle4[idI].seguimiento;
		    		    			idSeguimiento = tDetalle4[idI].avance;
		    		        	}        			
			        		}
			        	}    			
		    		}
			   } else if(option==3){
				  if(itemToEdit!= null){	
					  	//var tDetalle = segundaSesionObj.detalleSeguimiento?segundaSesionObj.detalleSeguimiento:[];		  
			        	if(itemToEdit.cPrograma>=109){
			        		dom.byId('otro3Visible').style.display='block';	        		
		        			for(var idI in tDetalle4){
		    		        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
		    		        		nomPrograma  = tDetalle4[idI].nomOtroPrograma;
		    		        		objPrograma  = tDetalle4[idI].objetivo;
		    		        		metaPrograma = tDetalle4[idI].meta;
		    		        		itemToEdit.avance = tDetalle4[idI].seguimiento;
		    		    			idSeguimiento = tDetalle4[idI].avance;
		    		        	}
		        			}
		        		} else {			
			        		dom.byId('otro3Visible').style.display='none';
			        		for(var idI in tDetalle4){
		    		        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
		    		        		nomPrograma  = tDetalle4[idI].nomOtroPrograma;
		    		        		objPrograma  = tDetalle4[idI].objetivo;
		    		        		metaPrograma = tDetalle4[idI].meta;
		    		        		itemToEdit.avance = tDetalle4[idI].seguimiento;
		    		    			idSeguimiento = tDetalle4[idI].avance;
		    		        	}        			
			        		}
			        	}    	
				  }
			   } else if(option==4){
				  if(itemToEdit!= null){	
					  //var tDetalle = segundaSesionObj.detalleSeguimiento?segundaSesionObj.detalleSeguimiento:[];
					  if(itemToEdit.cPrograma>=123){
			        		dom.byId('otro3Visible').style.display='block';	        		
		        			for(var idI in tDetalle4){
		    		        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
		    		        		nomPrograma  = tDetalle4[idI].nomOtroPrograma;
		    		        		objPrograma  = tDetalle4[idI].objetivo;
		    		        		metaPrograma = tDetalle4[idI].meta;
		    		        		itemToEdit.avance = tDetalle4[idI].seguimiento;
		    		    			idSeguimiento = tDetalle4[idI].avance;
		    		        	}
		        			}
		        		} else {			
			        		dom.byId('otro3Visible').style.display='none';
			        		for(var idI in tDetalle4){
		    		        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
		    		        		nomPrograma  = tDetalle4[idI].nomOtroPrograma;
		    		        		objPrograma  = tDetalle4[idI].objetivo;
		    		        		metaPrograma = tDetalle4[idI].meta;
		    		        		itemToEdit.avance = tDetalle4[idI].seguimiento;
		    		    			idSeguimiento = tDetalle4[idI].avance;
		    		        	}        			
			        		}
			        	}    	
		          } 
			   }
		        
		        var pStore = new Memory({
		            data: data
		        });
			    
			    //Lista de avances        
		        var avances= new Array(	{label:"Materiales educativos (libros, material did\u00e1ctico, \u00fatiles escolares)", value:"1",selected:false},
										{label:"Capacitaci\u00f3n o asesor\u00edas especializadas", value:"2",selected:false},
										{label:"Equipos de c\u00f3mputo", value:"3",selected:false},
										{label:"Materiales para atender necesidades de infraestructura (de construcci\u00f3n, el\u00e9ctrico, de plomer\u00eda, etc\u00e9tera)", value:"4",selected:false},
										{label:"Material deportivo", value:"5",selected:false},
										{label:"Equipo o mobiliario", value:"6",selected:false},
										{label:"Alimentos", value:"7",selected:false},
										{label:"Otros", value:"8",selected:false} );
				
		        var aSeguimiento= new Array(	{label:"Menos del 60% ", value:1},
						{label:"Entre el 61 y el 75% ", value:2},
						{label:"Entre el 76 y el 90% ", value:3},
						{label:"Entre el 91 y el 99% ", value:4},
						{label:"El 100%", value:5} );


				var dataSeguimiento=[{name:"[Seleccione]",   id:"0"}];
				
				for(var a in aSeguimiento){
					dataSeguimiento.push({name:aSeguimiento[a].label,
											id:aSeguimiento[a].value});
				}
				
				var dataOtroDtA = {
		          		identifier: "idActividad",
		          		items: []
		      	};
		        		
		        if(itemToEdit != null){
		        	for(var a in opcionesStore){
		        		if( opcionesStore[a].cTipoPcc==1 && opcionesStore[a].cTipoPrograma==option ){
		        			if(opcionesStore[a].cPccIdentificador == itemToEdit.cPrograma ){        				
		        	        		
				        		var arregloOpciones = {              	
				                      	idActividad: opcionesStore[a].cOpciones,
				                      	idObjetivo: 0,
				        	        	objetivo : opcionesStore[a].descripOpcion,
				        	        	actividad : opcionesStore[a].cOpciones,
				        	        	meta: "",
				        	        	avance: ""
				        		};
				        		dataOtroDtA.items.push(arregloOpciones);
				        		
		            		}	
		        		}        		        	
		            }	        	
		        }
		        
		        var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
		        registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);

		        gridRNE1 = registry.byId('avanceOtroDt');
		        
		        var headerGrid =gridRNE1.domNode.firstElementChild;
				headerGrid.style.display="none";
				
		        if(itemToEdit.avance != null){
			        items = itemToEdit.avance.split(",-");
			        
			        for(var a=0; a< items.length; a++){
			        	for ( var j = 0; j < gridRNE1.rowCount; j++) {
				        	var item2 = gridRNE1.getItem(j);
				        			        	
				        	if(array.indexOf( items[a], "=" ) != -1 ){
				        		items2s = items[a].split(",=");
//				        		if( items2s[0] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
//					        		gridRNE1.selection.setSelected(j, true);	
//					        		gridRNE1.store.setValue(item2, 'meta', items2s[1]);
//					        		break;
//					        	}	
				        		
				        		if( items2s[0] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
					        		gridRNE1.selection.setSelected(j, true);
					        		if((option==2 && itemToEdit.cPrograma>=94) || (option==3 && itemToEdit.cPrograma>=109) || (option==4 && itemToEdit.cPrograma>=123)){			        			
					        			gridRNE1.store.setValue(item2, 'meta', items2s[1]);
					        		} else {
					        			registry.byId('otroDt').set("value",items2s[1]);	
					        		}
					        		
					        		break;
					        	}	
				        		
				        	} else {
				        		if( items[a] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
					        		gridRNE1.selection.setSelected(j, true);	
					        		break;
					        	}		
				        	}
				        	        		
				        }	
			        }	        	        
		        }
				
				var segStore = new Memory({
				data: dataSeguimiento
				});

				avanceProgSelect.addOption(avances);
		        			    
			    //---------------------------------- Dojo
			    var prSelect = new FilteringSelect({
		           id: 'prSelect',
		           value:itemToEdit.cPrograma,
		           store: pStore,
		           readOnly: !newRow,
		           searchAttr: 'name'
		        }, 'prSelect').on ('change', function(){     
		        	
		        	if( registry.byId("prSelect").get('displayedValue') == "Otro" ){		    		
		    			dom.byId('otro3Visible').style.display='block';
		    			registry.byId('nomOtroPrograma').set ('required',true);
		    			
		    			//dom.byId('avanceOtroDt').style.display='none';
		    			
		    		} else {
		    			//dom.byId('avanceOtroDt').style.display='block';
		    			
		    			dom.byId('otro3Visible').style.display='none';
		    			
		    			registry.byId('nomOtroPrograma').set ('required',false);
		    			
		    			
					}
		        	
		        	dataOtroDtA.items = [];
		        	
		        	for(var a in opcionesStore){
		        		if( opcionesStore[a].cTipoPcc==1 ){
		        			if(opcionesStore[a].cPccIdentificador == registry.byId("prSelect").get('value') ){

				        		var arregloOpciones = {              	
				                      	idActividad: opcionesStore[a].cOpciones,
				                      	idObjetivo: opcionesStore[a].cOpciones,
				        	        	objetivo : opcionesStore[a].descripOpcion,
				        	        	actividad : opcionesStore[a].cOpciones,
				        	        	meta: "",
				        	        	avance: ""
				        		};
				        		dataOtroDtA.items.push(arregloOpciones);
		            		}	
		        		}        		        	
		            }	        	

		        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
		            registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);
		            
		            gridRNE1 = registry.byId('avanceOtroDt');
			        var headerGrid =gridRNE1.domNode.firstElementChild;
					headerGrid.style.display="none";
			        
		            
		        });		    		   		   	    	    

				    		   		   
			    var strObjetivo = new ValidationTextBox({
		           promptMessage:"Objetivo especifico del programa",
		           value:itemToEdit.objetivo, 
		           trim:"true",
		           readOnly:!newRow,
		           uppercase: true,
		           maxLength:"250",
		           required: "true",
		           style:"display:block; width:280px"
		        }, 'strObjetivo');
				   
				var strMeta = new ValidationTextBox({
		           promptMessage:"Meta de la escuela",
		           value:itemToEdit.meta, 
		           trim:"true",  
		           readOnly:!newRow,
		           uppercase: true,
		           maxLength:"250",
		           required: "true",
		           style:"display:block; width:280px"
		        }, 'strMeta');
					  	    				
				var seguimiento = new FilteringSelect({
			           id: 'seguimientoSelect',
			           value:idSeguimiento,
			           store: segStore,
			           searchAttr: 'name',
			           style:"width:480px"
			        }, 'seguimientoSelect');
				
	 		    var nomOtroPrograma = new ValidationTextBox({
	 		           promptMessage:"Nombre de Otro Programa",
	 		           value:itemToEdit.nomOtroPrograma, 
	 		           trim:"true",
	 		           uppercase: true,
	 		          readOnly:!newRow,
	 		           maxLength:"250",
	 		   //        required: "true",
	 		           style:"display:block; width:280px"
	 	        }, 'nomOtroPrograma');
				
				
				
				var montoRecibido = new ValidationTextBox({
			           promptMessage:"Monto Asignado",
			           value : itemToEdit.monto,
			           trim:"true",   
			           uppercase: true,
			           maxLength:"250",
			           required: "true",
			           //readOnly:!newRow,
			           style:"display:block; width:150px"				        	   
				}, 'montoAsignado').on ('Blur', function(){;
		 		   
				   var monto= registry.byId("montoAsignado").get('value');		       
			       if(monto!=''){			       
				       if(monto==0){
				    	   registry.byId('montoStr').set('value','CERO');
				       } else if(monto>=0){			    	   
				    		registry.byId('montoStr').set('value',jsUtils.covertirNumLetras(registry.byId("montoAsignado").get('value')));    					    	   
				       } else{
				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
							return false;
				       }
			       	}		       
	        });
				
				new Textarea({
		        	value: itemToEdit.montoStr,
					trim : true,
					uppercase: true,
					readOnly:true,
					style : "width:150px;"
				}, "montoStr");
				
				new Textarea({
		        	id: "ejercidoStr",
		        	value: itemToEdit.montoEjercidoStr,
					trim : true,
					uppercase: true,
					readOnly:true,
					style : "width:150px;"
				}, "ejercidoStr");
		        //
		        var montoEjer=  new ValidationTextBox({
			           promptMessage:"Capture solo n\u00FAmeros",
			           id:'montoEjercido',
			           regExp: constants.NUMBER_VALID,
			           value:itemToEdit.montoEjercido, 
			           trim:"true",  
			           maxLength:"9",
			           required: "true",
			           style:"display:block; width:150px"
			         }, 'montoEjercido').on ('Blur', function(){
 			   
 					   var montoEjercidoVal= registry.byId("montoEjercido").get('value');
 				       
 					   	if(montoEjercidoVal!=''){
 					       
 					       if(montoEjercidoVal==0){
 					    	   registry.byId('ejercidoStr').set('value','CERO');
 					       }
 					       else if(montoEjercidoVal>=0){
 					    	   
    				    		registry.byId('ejercidoStr').set('value',jsUtils.covertirNumLetras(montoEjercidoVal));    					    	   
 					       }
 					       else{
 					    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
	    						return false;
 					       }
 				       	}
 		         });
			    //------------------------------------
//				avanceProgSelect.on('click', function() {
//					muestra(avanceProgSelect);
//				});
//			   
//			    muestra(avanceProgSelect);
//			   
			    jsUtils.createTag('div','prBtnAceptar','dcDetail');
				   			    
			    new Button({
					label : " Aceptar ",
					onClick : function() {
							var grid;
							
							
							if (registry.byId("seguimientoSelect").get('value')==null || registry.byId("seguimientoSelect").get('value') == 0){  
								utils.cstmAlert('Favor de registrar el avance');
								return false;
							}
							
							if (registry.byId("strObjetivo").get('value')==null || registry.byId("strObjetivo").get('value') == ''){  
								utils.cstmAlert('Favor de registrar el objetivo del porgrama');
								return false;
							}
							
							if (registry.byId("montoAsignado").get('value')==null || registry.byId("montoAsignado").get('value') == ''){  
								utils.cstmAlert('Favor de registrar el monto Recibido');
								return false;
							}
							
							if (registry.byId("montoEjercido").get('value')==null || registry.byId("montoEjercido").get('value') == ''){  
								utils.cstmAlert('Favor de registrar el monto Ejercido');
								return false;
							}
							
							if (registry.byId("strMeta").get('value')==null || registry.byId("strMeta").get('value') == ''){  
								utils.cstmAlert('Favor de registrar la meta');
								return false;
							}
							
							if(otrosSeleccionadoActivo==1){
								   if(registry.byId("otroDt").get('value')==null || registry.byId("otroDt").get('value') == ''){
									   utils.cstmAlert('Favor de registrar el OTRO Recurso no econ\u00f3mico');
					                   return false;
					    		   }				   
							   }
							
							if( registry.byId("prSelect").get('displayedValue') == "Otro" ){			    		
								if( registry.byId("nomOtroPrograma").get('value')==null || registry.byId("nomOtroPrograma").get('value') == ''){
								
								utils.cstmAlert('Favor de registrar el nombre del otro programa');
				                   return false;
								}
	 			    		} 
							
							
							
							
							var tmpnomOtroPrograma = "";
	 	 					tmpnomOtroPrograma = registry.byId("nomOtroPrograma").get('value');
	 	 					
							if(sesionPrograma==1){
								if( option == 2 ){
									grid = registry.byId('2Grid');
								} else if( option == 3 ){
									grid = registry.byId('3Grid');
								} else if( option == 4 ){
									grid = registry.byId('4Grid');
								}
							} else {
								if( option == 2 ){
									grid = registry.byId('2_1Grid');
								} else if( option == 3 ){
									grid = registry.byId('3_1Grid');
								} else if( option == 4 ){
									grid = registry.byId('4_1Grid');
								}
							}
								
						    var index = grid.selection.selectedIndex;
						    var item = grid.getItem(index);
						    var data = avanceProgSelect.getOptions();
							var tAvance = "";
							
						    
						    gridRNE = registry.byId('avanceOtroDt');
						    
						    var otrosCuales = "";
						    if(rneSeleccionados.length>0){
							   for ( var j = 0; j < gridRNE.rowCount; j++) {
								   var item2 = gridRNE.getItem(j);
								   if( array.indexOf(rneSeleccionados,gridRNE.store.getValue(item2,'idActividad'))!=-1 ){
									   otrosCuales += gridRNE.store.getValue(item2,'idActividad');
									   
//									   if(gridRNE.store.getValue(item2,'meta')){
//										   otrosCuales += ",="+gridRNE.store.getValue(item2,'meta');   
//									   }
									   
									   if(gridRNE.store.getValue(item2,'meta')){
										   otrosCuales += ",="+gridRNE.store.getValue(item2,'meta');   
									   }						   
									   if(gridRNE.store.getValue(item2, "objetivo")=="Otros"){
										   otrosCuales += ",="+registry.byId("otroDt").get('value');
									   }
									   
									   otrosCuales += ",-";
								   }
							   }
							//   alert(otrosCuales);
						    }
						    var tAvance = otrosCuales;
							try{	
								for(var idI in tDetalle4){    							
						        	if(tDetalle4[idI].idPrograma == itemToEdit.cPrograma){
						        		tDetalle4[idI].avance=registry.byId("seguimientoSelect").get('value');
						        		tDetalle4[idI].seguimiento=tAvance;
										}
								}

								if( newRow==false){
									grid.store.setValue(item, 'avance', tAvance);
									grid.store.setValue(item, 'seguimiento', registry.byId("seguimientoSelect").get('value'));								
									grid.store.setValue(item, 'recibido', registry.byId("montoEjercido").get('value'));
									grid.store.setValue(item, 'recibidoStr', registry.byId("ejercidoStr").get('value'));
									grid.store.setValue(item, 'monto', registry.byId("montoAsignado").get('value'));
									grid.store.setValue(item, 'montoStr', registry.byId("montoStr").get('value'));
									//grid.store.setValue(item, 'objetivoPrograma', registry.byId("strObjetivo").get('value'));
									//grid.store.setValue(item, 'meta', registry.byId("strMeta").get('value'));
								} else {
									
									var objetivos = {												       	       			    							
      			    							meta : 			strMeta.get('value'),
      			    							avance: tAvance,
      			    							seguimiento: registry.byId("seguimientoSelect").get('value')
      			    							};       	       			    									
							
							
	 	 							 var myNewItem = {  
	 	 									cPrograma: parseInt(registry.byId("prSelect").get('value')), 
	  	 									idPrograma: parseInt(registry.byId("prSelect").get('value')),
	  	 									nomPrograma:  registry.byId("prSelect").get('displayedValue'),
	  	 									objetivos:objetivos,
	  	 									objetivo: strObjetivo.get('value'), 
	  	 									meta:  strMeta.get('value'),
	  	 									monto:  registry.byId("montoAsignado").get('value'),
	  	 									montoStr:  registry.byId("montoStr").get('value'),
	  	 									nomOtroPrograma: tmpnomOtroPrograma,
	  	 									avance: tAvance,
	  	 									seguimiento: registry.byId("seguimientoSelect").get('value'),
	  	 									recibido: registry.byId("montoEjercido").get('value'),
	  	 									recibidoStr: registry.byId("ejercidoStr").get('value')
				      				 };	    							 
  							         grid.store.newItem(myNewItem);
									
								}
								
								registry.byId('dDetail').destroyRecursive(false);
							} catch(e){
									utils.cstmAlert('Ocurrio un error al Editar');
									console.log(e);
							};						
					   }
				},'prBtnAceptar');
		    }
			
			function editaParticipacionRecurso(itemToEdit){
				
				var edit=false;
			    if(!itemToEdit){
				   itemToEdit={cParticipacion: 0,descripcion:'',tprogramaFederales: 0,tprogramaEstatales:0,tprogramaMunicipales:0,tprogramaOsc:0,rprogramaFederales: '',rprogramaEstatales:'',rprogramaMunicipales:'',rprogramaOsc:''};
			    }else{
				   edit=true;
			    }

				var title ='Participaci\u00F3n';
		    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
		    	registry.byId('dDetail').on('hide',function(){
					   												registry.byId('dDetail').destroyRecursive(false);
			   													});
		    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
			    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
			    jsUtils.createTag('div','prCnt','dcDetail');
				    
			    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
										   '<tr><td>'+
										   '	<b>*Pariticpaci\u00F3n: </b><div id="strParticipacion" /><br/>'+
										   '</td></tr>'+
			    						   '<tr>'+
			    						   		'<td></br><b>*Toma decisiones y administra los recursos conjuntamente con el director del plantel: </b></td>'+
			    						   		'<td><div id="prSelectF"/></td>'+
						    			   '</tr>'+
						    			   '<tr>'+
		   						   				'<td></br><b>*S\u00F3lo recibe informaci\u00F3n por parte del director del plantel acerca de los recursos que le asignan a la escuela, pero no interviene en su administraci\u00F3n y seguimiento.: </b></td>'+
			    						   		'<td><div id="prSelectE"/></td>'+
						    			   '</tr>'+
						    			   '<tr>'+
								   				'<td></br><b>*El CEPS  tiene conocimiento acerca de los recursos que le asignan al plantel.: </b></td>'+
			    						   		'<td><div id="prSelectM" /></td>'+
						    			   '</tr>'+
						    			   '<tr>'+
							   				'<td></br><b>*Recibe la escuela recursos de programas: </b></td>'+
		   						   				'<td><div id="prSelectOSC" /></td>'+
						    			   '</tr>'+
						    			   '<tr>'+
							   				'<td></br>'+
							   				'</td>'+
							    			'</tr>'+
						    			   '</table>'; 
			    	    
			    //---------------------------------- Datos	        
			    var data=[{name:"[Seleccione]",	id:"0"},
			              {name:"Si",	id:"1"},
			              {name:"No",	id:"2"}];
		    		    	   
			    var pStore = new Memory({
			        data: data
			    });
			    if(itemToEdit.tprogramaFederales== null)	
			    {
			    	itemToEdit.tprogramaFederales=0;
			    }
			    if(itemToEdit.tprogramaEstatales==null)	
			    {
			    	itemToEdit.tprogramaEstatales=0;
			    }
			    if(itemToEdit.tprogramaMunicipales==null)	
			    {
			    	itemToEdit.tprogramaMunicipales=0;
			    }
			    if(itemToEdit.tprogramaOsc==null)	
			    {
			    	itemToEdit.tprogramaOsc=0;
			    }
			    //---------------------------------- Dojo
			    var prSelectF = new FilteringSelect({
		           id: 'prSelectF',
		           value:itemToEdit.tprogramaFederales,
		           store: pStore,
		           //readOnly:true,
		           searchAttr: 'name'
		        }, 'prSelectF');
			    
			   	var prSelectE = new FilteringSelect({
		           id: 'prSelectE',
		           value:itemToEdit.tprogramaEstatales,
		           store: pStore,
		           //readOnly:true,
		           searchAttr: 'name'
		        }, 'prSelectE');
			   
			   	var prSelectM = new FilteringSelect({
		           id: 'prSelectM',
		           value:itemToEdit.tprogramaMunicipales,
		           store: pStore,
		           //readOnly:true,
		           searchAttr: 'name'
		        }, 'prSelectM');
			   	
			   	var prSelectOSC = new FilteringSelect({
		           id: 'prSelectOSC',
		           value:itemToEdit.tprogramaOsc,
		           store: pStore,
		           //readOnly:true,
		           searchAttr: 'name'
		        }, 'prSelectOSC');
			   	
			    var strParticipacion = new ValidationTextBox({
		           promptMessage:"Participacion",
		           value:itemToEdit.descripcion, 
		           trim:"true",
		           readOnly:edit,
		           uppercase: true,
		           maxLength:"250",
		           style:"display:block; width:280px"
		        }, 'strParticipacion');
				
			    //------------------------------------
			    jsUtils.createTag('div','prBtnAceptar','dcDetail');
				   			    
			    new Button({
					label : " Aceptar " ,
					onClick : function() {
						var form = registry.byId('dDetail');
						if (!form.validate()){  
							utils.cstmAlert('Favor de registrar los datos requeridos');
							return false;
						}
						if(registry.byId("prSelectF").get('value')==0 ||
						   registry.byId("prSelectE").get('value')==0 ||
						   registry.byId("prSelectM").get('value')==0 ||
						   registry.byId("prSelectOSC").get('value')==0 )
						{
							utils.cstmAlert('Favor de selecionar una respuesta en cada apartado');
							return false;
						}
						seleccionoSi = 0;
		                if(registry.byId("prSelectF").get('value')==1)                        
		                {
		                       seleccionoSi++;
		                }
		                if(registry.byId("prSelectE").get('value')==1)                        
		                {
		                       seleccionoSi++;
		                }
		                if(registry.byId("prSelectM").get('value')==1)                        
		                {
		                       seleccionoSi++;
		                }
		                if(registry.byId("prSelectOSC").get('value')==1)                             
		                {
		                       seleccionoSi++;
		                }
		                if(seleccionoSi>1)                          
		                {
		                       utils.cstmAlert('Favor de selecionar 1 solo si');
		                       return false;
		                }

						
						var grid = registry.byId('rGrid');
						try{
							if(edit){
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);
								grid.store.setValue(item, 'tprogramaFederales', registry.byId("prSelectF").get('value'));
								grid.store.setValue(item, 'tprogramaEstatales', registry.byId("prSelectE").get('value'));
								grid.store.setValue(item, 'tprogramaMunicipales', registry.byId("prSelectM").get('value'));
								grid.store.setValue(item, 'tprogramaOsc', registry.byId("prSelectOSC").get('value'));
								grid.store.setValue(item, 'rprogramaFederales', registry.byId("prSelectF").get('displayedValue'));
								grid.store.setValue(item, 'rprogramaEstatales', registry.byId("prSelectE").get('displayedValue'));
								grid.store.setValue(item, 'rprogramaMunicipales', registry.byId("prSelectM").get('displayedValue'));
								grid.store.setValue(item, 'rprogramaOsc', registry.byId("prSelectOSC").get('displayedValue'));
							} else {
								 var myNewItem = { 
										    tprogramaFederales: registry.byId("prSelectF").get('value'),
											tprogramaEstatales: registry.byId("prSelectE").get('value'),
											tprogramaMunicipales: registry.byId("prSelectM").get('value'),
											tprogramaOsc: registry.byId("prSelectOSC").get('value'),
											rprogramaFederales: registry.byId("prSelectF").get('displayedValue'),
											rprogramaEstatales: registry.byId("prSelectE").get('displayedValue'),
											rprogramaMunicipales: registry.byId("prSelectM").get('displayedValue'),
											rprogramaOsc: registry.byId("prSelectOSC").get('displayedValue')
							      				 };	    							 
						         grid.store.newItem(myNewItem);
							}
							registry.byId('dDetail').destroyRecursive(false);
						}catch(e){
							utils.cstmAlert('Ocurrio un error al Agregar o Editar');
							console.log(e);
						}	
						
						
					
					}     			    				
				},'prBtnAceptar');
		    		
			}
			
			function seguimientoAccion(itemToEdit){
		 		var edit=false;
			    if(!itemToEdit){
				   itemToEdit={idAccion: 0,accion:'',recomendacion:'',avanceAccion:0,avanceRecomendacion:0};
			    }else{
				   edit=true;
			    }
				   
		 		
				var title ='Seguimiento de Acciones';
		    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
		    	registry.byId('dDetail').on('hide',function(){
					   												registry.byId('dDetail').destroyRecursive(false);
			   													});
		    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
			    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
			    jsUtils.createTag('div','prCnt','dcDetail');
				    
			    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
										   '<tr><td>'+
										   '	<b>*Acci\u00F3n para coadyuvar con el cumplimiento de la planeaci\u00F3n anual: </b><div id="accion" /><br/>'+
										   '</td></tr>'+
			    						   '<tr><td>'+
						    			   '	<b>*Avance: </b><div id="prSelectAccion" /><br/>'+
						    			   '</td></tr>'+
						    			   '<tr><td>'+
										   '	<b>*Acci\u00F3n para coadyuvar con el cumplimiento de las recomendaciones del Consejo T\u00E9cnico: </b><div id="recomendacion" /><br/>'+
										   '</td></tr>'+
			    						   '<tr><td>'+
						    			   '	<b>*Avance: </b><div id="prSelectRecomendacion" /><br/>'+
						    			   '</td></tr>'+
						    			   '</table>'; 
			    		    
			    //---------------------------------- Datos	        
			    var data=[{name:"[Seleccione]",	id:"0"},
			              {name:"Menos del 60%",	id:"1"},
			              {name:"Entre el 61 y el 75%",	id:"2"},
			              {name:"Entre el 76 y el 90%",	id:"3"},
			              {name:"Entre el 91 y el 99%",	id:"4"},
			              {name:"Se realiz\u00F3 al 100%",	id:"5"}
			              ];
		    		    		   
			    var pStore = new Memory({
			        data: data
			    });		    		    
			    //---------------------------------- Dojo
			    var prSelectAccion = new FilteringSelect({
		           id: 'prSelectAccion',
		           value:itemToEdit.avanceAccion,
		           store: pStore,
		           //readOnly:true,
		           searchAttr: 'name'
		        }, 'prSelectAccion');
			       		   			   
				var accion = new ValidationTextBox({
			           //promptMessage:"Capture los est\u00edmulos y reconocimientos de car\u00e1cter social",
			           value:itemToEdit.accion, 
			           trim:"true",
			           readOnly:true,
			           uppercase: true,
			           maxLength:"250",
			           style:"display:block; width:280px"
		        }, 'accion');
					   
			    var prSelectRecomendacion = new FilteringSelect({
			           id: 'prSelectRecomendacion',
			           value:itemToEdit.avanceRecomendacion,
			           store: pStore,
			           //readOnly:true,
			           searchAttr: 'name'
		        }, 'prSelectRecomendacion');
					    		   
			    
				var recomendacion = new ValidationTextBox({
			           promptMessage:"Capture los est\u00edmulos y reconocimientos de car\u00e1cter social",
			           value:itemToEdit.recomendacion, 
			           trim:"true",
			           readOnly:true,
			           uppercase: true,
			           maxLength:"250",
			           style:"display:block; width:280px"
		        }, 'recomendacion');
						   
			    //------------------------------------
			    jsUtils.createTag('div','prBtnAceptar','dcDetail');
		    		    
				new Button({
					label : " Aceptar " ,
					onClick : function() {
						var form = registry.byId('dDetail');
						if (!form.validate()){  
							utils.cstmAlert('Favor de registrar los datos requeridos');
							return false;
						}
						if(registry.byId("prSelectAccion").get('value')==0)
						{
							utils.cstmAlert('Favor de selecionar una respuesta para el avance de la acci&#243;n');
							return false;
						}
						if(registry.byId("prSelectRecomendacion").get('value')==0)
						{
							utils.cstmAlert('Favor de selecionar una respuesta para el avance de la recomendaci&#243;n');
							return false;
						}
						var grid = registry.byId('5Grid');
						try{
							if(edit){
							
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);
								grid.store.setValue(item, 'accion', registry.byId("accion").get('value'));
								grid.store.setValue(item, 'recomendacion',  registry.byId("recomendacion").get('value'));
								grid.store.setValue(item, 'avanceAccion',  registry.byId("prSelectAccion").get('value'));
								grid.store.setValue(item, 'avanceRecomendacion',  registry.byId("prSelectRecomendacion").get('value'));
							} else {
								 var myNewItem = {
										 accion: registry.byId("accion").get('value'),
									     recomendacion: registry.byId("recomendacion").get('value'),
									     avanceAccion: registry.byId("prSelectAccion").get('value'),
									     avanceRecomendacion:  registry.byId("prSelectRecomendacion").get('value')
								};	    							 
						         grid.store.newItem(myNewItem);
							}
							registry.byId('dDetail').destroyRecursive(false);
						}catch(e){
							utils.cstmAlert('Ocurrio un error al Agregar o Editar');
							console.log(e);
						}	
						
						
					
					}     			    				
				},'prBtnAceptar');

						 
			}
			
			
			
			
			 function funEvaluacion(itemToEdit){     
			        //----------------------------Diseño de la ventana
			        var title = 'Resultado de evaluaciones';
			        new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
			        registry.byId('dDetail').on('hide',function(){
			                                                        registry.byId('dDetail').destroyRecursive(false);
			                                  });
			        registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
			        registry.byId('dDetail')._setStyleAttr('top:20px !important;');
			        jsUtils.createTag('div','prCnt','dcDetail');
			            
			        dom.byId('prCnt').innerHTML='<table border="0" align="left" width= "750px" >'+
			                                             '<tr><td>'+
			                                             '   <b>*Grado: </b><div id="strGrado" />'+
			                                             '</td></tr>'+
			                                             '<tr>'+
			                                                    '<td><b>Porcentaje de estudiantes con</b> </td>'+
			                                                    '<td><b>Meta establecida a</br>inicio del ciclo escolar</b></td>'+
			                                                    '<td><b>Resultado de cierre</br>del ciclo escolar</b></td>'+
			                                             '</tr>'+
			                                             '<tr>'+
			                                                    '<td>*Promedio entre 5 y 6: </td>'+
			                                                    '<td><div id="56evaPro"/></td>'+
			                                                    '<td><div id="56evaMet"/></td>'+
			                                             '</tr>'+
			                                             '<tr>'+
			                                                    '<td>*Promedio entre 7 y 8: </td>'+
			                                                    '<td><div id="78evaPro"/></td>'+
			                                                    '<td><div id="78evaMet"/></td>'+
			                                             '</tr>'+
			                                             '<tr>'+
			                                                    '<td>*Promedio entre 9 y 10: </td>'+
			                                                    '<td><div id="90evaPro"/></td>'+
			                                                    '<td><div id="90evaMet"/></td>'+
			                                             '</tr>'+
			                                             '</table>'; 
			      
			        //------------------------------------
			        var strGrado = new ValidationTextBox({
			             value:itemToEdit.grado,
			    	     trim:"true",  
			             readOnly:true,
			             uppercase: true,
			             maxLength:"250",
			        }, 'strGrado');
			      
			        var evaPro56=  new ValidationTextBox({
			             promptMessage:"Capture solo n\u00FAmeros",
			             id:'56evaPro',
			             value:itemToEdit.eva1,
			             regExp: constants.NUMBER_VALID,
			             readOnly:true,
			             trim:"true",  
			             maxLength:"9",
			             required: "true",
			             style:"width:80px"
			        }, '56evaPro');
			        var metPro56=  new ValidationTextBox({
			             promptMessage:"Capture solo n\u00FAmeros",
			             id:'56evaMet',
			             value:itemToEdit.meta1,
			             regExp: constants.NUMBER_VALID,
			             trim:"true",  
			             maxLength:"9",
			             required: "true",
			             style:"width:80px"
			        }, '56evaMet');
			      
			        var evaPro78=  new ValidationTextBox({
			             promptMessage:"Capture solo n\u00FAmeros",
			             id:'78evaPro',
			             value:itemToEdit.eva2,
			             regExp: constants.NUMBER_VALID,
			             readOnly:true,
			             trim:"true",  
			             maxLength:"9",
			             required: "true",
			             style:"width:80px"
			        }, '78evaPro');
			        var metPro78=  new ValidationTextBox({
			             promptMessage:"Capture solo n\u00FAmeros",
			             id:'78evaMet',
			             value:itemToEdit.meta2,
			             regExp: constants.NUMBER_VALID,
			             trim:"true",  
			             maxLength:"9",
			             required: "true",
			             style:"width:80px"
			        }, '78evaMet');
			      
			        var evaPro90=  new ValidationTextBox({
			             promptMessage:"Capture solo n\u00FAmeros",
			             id:'90evaPro',
			             value:itemToEdit.eva3,
			             regExp: constants.NUMBER_VALID,
			             readOnly:true,
			             trim:"true",  
			             maxLength:"9",
			             required: "true",
			             style:"width:80px"
			        }, '90evaPro');
			        var metPro90=  new ValidationTextBox({
			             promptMessage:"Capture solo n\u00FAmeros",
			             id:'90evaMet',
			             value:itemToEdit.meta3,
			             regExp: constants.NUMBER_VALID,
			             trim:"true",  
			             maxLength:"9",
			             required: "true",
			             style:"width:80px"
			        }, '90evaMet');
			      
			        jsUtils.createTag('div','prBtnAceptar','dcDetail');                                   
			        new Button({
			        	label : " Aceptar ",
						onClick : function() {
								//---------- Revision del 100%
								val1= parseInt(registry.byId("56evaMet").get('value'));
								val2= parseInt(registry.byId("78evaMet").get('value'));
								val3= parseInt(registry.byId("90evaMet").get('value'));
								valt= (val1+val2+val3)*100/100;
								if(valt!=100){
									utils.cstmAlert('El porcentaje de resultado de la evaluaci\u00f3n no da el 100%');
									return;
								}
								var grid = registry.byId('myDataGrid');					

								try{
									var index = grid.selection.selectedIndex;
									var item = grid.getItem(index);
									grid.store.setValue(item, 'eva1', registry.byId("56evaPro").get('value'));
									grid.store.setValue(item, 'meta1', registry.byId("56evaMet").get('value'));
									grid.store.setValue(item, 'eva2',  registry.byId("78evaPro").get('value'));
									grid.store.setValue(item, 'meta2',  registry.byId("78evaMet").get('value'));
									grid.store.setValue(item, 'eva3',  registry.byId("90evaPro").get('value'));
									grid.store.setValue(item, 'meta3',  registry.byId("90evaMet").get('value'));						
								}catch(e){
									utils.cstmAlert('Ocurrio un error al Agregar o Editar');
									console.log(e);
								}	
								
								registry.byId('dDetail').destroyRecursive(false);
							}    
			        },'prBtnAceptar');
			    }
			 
				function compromisoAccion(itemToEdit){
					var edit=false;
				    if(!itemToEdit){
					   itemToEdit={idCompromiso: 0,idConsecutivo: 0,accion1:'',accion2:'',nomOtroCompromiso:'',cumplimiento:''};
				    }else{
					   edit=true;					   
				    }
				    var title ='Compromisos';
			    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
			    	registry.byId('dDetail').on('hide',function(){
						   												registry.byId('dDetail').destroyRecursive(false);
				   													});
			    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
				    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
				    jsUtils.createTag('div','prCnt','dcDetail');
					    
				    dom.byId('prCnt').innerHTML='<table border="0" align="left" width= "750px" >'+
											   '<tr><td>'+
							    			   '	<b>*Compromisos: </b><div id="prSelectC" /><br/>'+
							    			   '</td></tr>'+
							    			   '<tr id="otro3Visible" style="display:none"><td>'+
							    			   '	<b>*Otro Compromiso:</div> </b><div id="nomOtroCompromiso"/><br/>'+
							    			   '</td></tr>'+
							    			   '<tr id="tablaVisible" >' +
							    			   '	<td><input id="avanceOtroDt"/></td>'+
							    			   '</tr>'+
											   '<tr>' +
											   '	<td><input id="otroDt"/></td>'+
											   '</tr>'+
											   '<tr>' +
							    			   '   <td id="otraAccion" style="display:none"> <b>*Accion 1: </b><div id="accion1" /><br/>'+
							    			   '</td> </tr>'+
							    			   '<tr>' +
							    			   '<td id="otraAccion2" style="display:none">	<b>*Accion 2: </b><div id="accion2" /><br/>'+
							    			   '</td> </tr>'+
											   '<tr><td>'+
											   '	<b>*Cumplimiento de compromiso: </b><div id="prSelect2" /><br/>'+
											   '</td></tr>'+
							    			   '</table>'; 
				    	    
				    var layoutOtro1Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
						          		    { name: 'Selecci\u00F3n de Objetivo',	
						          				    field:'idSeleccion',
						          				    width: "120px",        			          				   
						          				    type: dojox.grid.cells.Bool,
						          				    editable: true, 	hidden:true
						          			},
						          			{ name: 'Acciones', field: 'objetivo', width: '400px'},        			          				
						          			{ name: '*Respuesta', field: 'meta', 
						          					editable: true, 
						          					width: '250px', 
						          				    type: gridCellsDijit._Widget,
						          				    widgetClass: ValidationTextBox, 
						          				    widgetProps: {uppercase:'true', maxlength: '250'} 
						          			}
						          		]];

					    var layoutOtro2Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
							          		    { name: 'Selecci\u00F3n de Objetivo',	
							          				    field:'idSeleccion',
							          				    width: "120px",        			          				   
							          				    type: dojox.grid.cells.Bool,
							          				    editable: true, 	hidden:true
							          			},
							          			{ name: 'Acciones', field: 'objetivo', width: '650px'},        			          				
							          			{ name: 'Meta de la escuela', field: 'meta', hidden:true,
							          					editable: true, 
							          					width: '250px', 
							          				    type: gridCellsDijit._Widget,
							          				    widgetClass: ValidationTextBox, 
							          				    widgetProps: {uppercase:'true', maxlength: '250'} 
							          			}
							          		]];

				    var checkDt = null;
				    var otrosSeleccionado=null;
				    var otrosSeleccionadoActivo = 0;
				    var rneSeleccionados='';

				    var otroRecurso = "";
				    
				    new ValidationTextBox({
						name : "otroDt",
						id : "otroDt",
						value: otroRecurso,
						promptMessage : "Capture otro recurso",
						trim : true,
						style : "display:none;width:280px",
						maxLength: 255,
						placeHolder : "Especifique OTRA acci\u00F3n",
						required: false
					}, "otroDt");
				    
				    if(itemToEdit!=null){
					    if(itemToEdit.idCompromiso>=11){
						    checkDt =[{
											// First, our view using the _CheckBoxSelector custom type
											type: "dojox.grid._CheckBoxSelector"
										},
										layoutOtro1Dt
									];
					    } else {
					    	checkDt =[{
								// First, our view using the _CheckBoxSelector custom type
								type: "dojox.grid._CheckBoxSelector"
							},
							layoutOtro2Dt
						];
					    	}
				    }
					
					new DataGrid({
				  		id: 'avanceOtroDt',
				  		structure: checkDt,
				  		height: '100px',
				  		rowSelector: '20px',
				  		onRowClick: function(e){
				            this.edit.rowClick(e);
				            //this.selection.clickSelectEvent(e);
				         },
				         onSelectionChanged: function(item){
					  			var items = this.selection.getSelected();
					  			
								rneSeleccionados = dojo.map(items, function(item){
									if(this.store.getValue(item, "objetivo")=="Otro"){
										otrosSeleccionado=1;	
									}										
									
									return this.store.getValue(item, "idActividad");
								}, this);
								
								if (otrosSeleccionado==1) {
									registry.byId('otroDt').set("style","display:block");	
									registry.byId('otroDt').set("required",true);				
									otrosSeleccionado=0;		
								} else if (otrosSeleccionado==0) {
							    	registry.byId('otroDt').set("style","display:none");
									registry.byId('otroDt').reset();
									registry.byId('otroDt').set("required",false);						    								
								}														
					  		}
				  		}
			  	    ,'avanceOtroDt').startup();
				    
			        var dataOtroDtA = {
			          		identifier: "idActividad",
			          		items: []
			      	};
			        
				    //---------------------------------- Datos	        
				    var data=[{name:"[Seleccione]",	id:"0"},
				              {name:"Establecer una corresponsabilidad entre madres, padres y tutores con los docentes, para fortalecer el trabajo acad\u00e9mico tanto en el sal\u00f3n de clases como en los hogares. ", id:"1"},
				              {name:"Establecer una vinculaci\u00f3n entre el Consejo T\u00e9cnico y el Consejo Escolar de Participaci\u00f3n Social, para el seguimiento del desempe\u00f1o acad\u00e9mico del alumnado.", id:"2"},
							  {name:"Exhortar a los padres de familia dedicar una hora diaria al trabajo acad\u00e9mico de los estudiantes", id:"3"},
							  {name:"Coordinar desde los Consejos Escolares, pl\u00e1ticas preparatorias o proped\u00e9uticas a los padres de familia, con el prop\u00f3sito de hacerlos part\u00edcipes de la ense\u00f1anza del alumnado.", id:"4"},
							  {name:"Buscar que los docentes asesoren a las madres, padres y tutores de los alumnos con niveles bajos de aprendizaje. ", id:"5"},
							  {name:"Brindar a los padres de familia a trav\u00e9s de los Consejos Escolares una gu\u00eda de apoyo que fortalezca desde el hogar el trabajo academico de los estudiantes", id:"6"},
							  {name:"Promover programas y cursos sabatinos para los alumnos con niveles bajos de rendimiento escolar.", id:"7"},
							  {name:"Dise\u00f1ar tareas y actividades extras para reforzar el aprendizaje de los alumnos.", id:"8"},
							  {name:"Organizar ceremonias de reconocimiento por los logros acad\u00e9micos globales de la escuela.", id:"9"},
							  {name:"Reconocer los logros de desempe\u00f1o de los diferentes niveles escolares mediante un distintitvo(bander\u00edn,trofeo, etc)", id:"10"},
							  {name:"Otro", id:"11"},
							  {name:"Otro", id:"12"},
							  {name:"Otro", id:"13"}];

			    		    	   
				    var pStore = new Memory({
				        data: data
				    });
				    

				    var data1=[{name:"[Seleccione]",	id:"0"},
				              {name:"SI",	id:"1"},
				              {name:"NO",	id:"2"}];
			    		    	   
				    var pStore1 = new Memory({
				        data: data1
				    });	    
				    	    
				    //---------------------------------- Dojo
				    
				    var prSelect2 = new FilteringSelect({
				           id: 'prSelect2',	           
				           store: pStore1,
				           value: itemToEdit.cumplimiento,
				           //readOnly:true,
				           searchAttr: 'name'
				        }, 'prSelect2');
				    
				    var nomOtroCompromiso = new ValidationTextBox({
				           promptMessage:"Nombre de Otro Compromiso",
				           value:itemToEdit.nomOtroCompromiso, 
				           trim:"true",
				           uppercase: true,
				           maxLength:"250",
				           //required: "true",
				           style:"display:block; width:280px"
			     }, 'nomOtroCompromiso');
				    
				    var prSelectC = new FilteringSelect({
			           id: 'prSelectC',
			           value:itemToEdit.idCompromiso,
			           store: pStore,
			           width:100,
			           readOnly:edit,
			           searchAttr: 'name'
			        }, 'prSelectC').on ('change', function(){     
			        	
			        	if( registry.byId("prSelectC").get('displayedValue') == "Otro" ){		    		
			    			dom.byId('otro3Visible').style.display='block';
			    			dom.byId('otraAccion').style.display='block';
			    			dom.byId('otraAccion2').style.display='block';
			    			registry.byId('nomOtroCompromiso').set ('required',true);
			    			
			    			dom.byId('avanceOtroDt').style.display='none';
			    		} else {
			    			dom.byId('avanceOtroDt').style.display='block';
			    			dom.byId('otro3Visible').style.display='none';
			    			dom.byId('otraAccion').style.display='none';
			    			dom.byId('otraAccion2').style.display='none';
			    			registry.byId('nomOtroCompromiso').set ('required',false);
			    			
			    			
						}
			        	
			        	dataOtroDtA.items = [];
			        	
			        	for(var a in opcionesStore){
			        		if( opcionesStore[a].cTipoPcc==2 ){
			        			if(opcionesStore[a].cPccIdentificador == registry.byId("prSelectC").get('value') ){

					        		var arregloOpciones = {              	
					                      	idActividad: opcionesStore[a].cOpciones,
					                      	idObjetivo: opcionesStore[a].cOpciones,
					        	        	objetivo : opcionesStore[a].descripOpcion,
					        	        	actividad : opcionesStore[a].cOpciones,
					        	        	meta: "",
					        	        	avance: ""
					        		};
					        		dataOtroDtA.items.push(arregloOpciones);
			            		}	
			        		}        		        	
			            }	        	

			        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
			            registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);
			            
			            gridRNE1 = registry.byId('avanceOtroDt');
				        var headerGrid =gridRNE1.domNode.firstElementChild;
						headerGrid.style.display="none";
				        
			            
			        });		    		   		   	    	    
				    
				    var accion1 = new ValidationTextBox({
			           promptMessage:"Escriba la accion por cumplir en este compromiso",
			           value:itemToEdit.accion1, 
			           trim:"true",
			           //readOnly:true,
			           //required: "true",
			           uppercase: true,
			           maxLength:"250",
			           style:"width:280px"
			        }, 'accion1');
					   
				    var accion2 = new ValidationTextBox({
				           promptMessage:"Escriba la accion por cumplir en este compromiso",
				           value:itemToEdit.accion2, 
				           trim:"true",
				           //readOnly:true,
				           //required: "true",
				           uppercase: true,
				           maxLength:"250",
				           style:"width:280px"
			        }, 'accion2');			  	    		
					   		
				    if(edit==true){	
				       	if(itemToEdit.idCompromiso>=11){
				        		dom.byId('otro3Visible').style.display='block';
				    			dom.byId('otraAccion').style.display='block';
				    			dom.byId('otraAccion2').style.display='block';
				    			dom.byId('avanceOtroDt').style.display='none';

			       		} else {			
				        		dom.byId('otro3Visible').style.display='none';
				    			dom.byId('otraAccion').style.display='none';
				    			dom.byId('otraAccion2').style.display='none';
				    			dom.byId('avanceOtroDt').style.display='block';
						    
				    	}
				       	
				       	dataOtroDtA.items = [];
			        	
			        	for(var a in opcionesStore){
			        		if( opcionesStore[a].cTipoPcc==2 ){
			        			if(opcionesStore[a].cPccIdentificador == registry.byId("prSelectC").get('value') ){

					        		var arregloOpciones = {              	
					                      	idActividad: a,
					                      	idObjetivo: opcionesStore[a].cOpciones,
					        	        	objetivo : opcionesStore[a].descripOpcion,
					        	        	actividad : opcionesStore[a].cOpciones,
					        	        	meta: "",
					        	        	avance: ""
					        		};
					        		dataOtroDtA.items.push(arregloOpciones);
			            		}	
			        		}        		        	
			            }	        	

			        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
			            registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);
			            
				    } else {
				        	dom.byId('otro3Visible').style.display='none';
			   			
				    }
					
				    
				    
				    if(itemToEdit != null){
				    	gridRNE1 = registry.byId('avanceOtroDt');
				        items = itemToEdit.accion1.split(",-");
				        var headerGrid =gridRNE1.domNode.firstElementChild;
						headerGrid.style.display="none";
				        for(var a=0; a< items.length; a++){
				        	for ( var j = 0; j < gridRNE1.rowCount; j++) {
					        	var item2 = gridRNE1.getItem(j);
					        			        	
					        	if(array.indexOf( items[a], "=" ) != -1 ){
					        		items2s = items[a].split(",=");
					        		if( items2s[0] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
						        		gridRNE1.selection.setSelected(j, true);	
						        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
						        		registry.byId('otroDt').set("value",items2s[1]);
						        		break;
						        	}	
					        	} else {
					        		if( items[a] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
						        		gridRNE1.selection.setSelected(j, true);	
						        		break;
						        	}		
					        	}
					        	        		
					        }	
				        }	        	        
			        }
				    
				    //------------------------------------
				    jsUtils.createTag('div','prBtnAceptar','dcDetail');
					   		
					   		new Button({
								label : " Aceptar " ,
								onClick : function() {


									var grid = registry.byId('cGrid');
									var form = registry.byId('dDetail');
									if (!form.validate()){  
										utils.cstmAlert('Favor de registrar los datos requeridos');
										return false;
									}
									if(registry.byId("prSelectC").get('value')==0)
									{
										utils.cstmAlert('Favor de selecionar un compromiso');
										return false;
									}
									
									if(registry.byId("prSelect2").get('value')==0 || registry.byId("prSelect2").get('value') == null || registry.byId("prSelect2").get('value') == '')
									{
										utils.cstmAlert('Favor de selecionar una respuesta al cumplimiento del compromiso');
										return false;
									}
									
									
																        	
									if(edit!=true){
						 	        	for ( var i = 0; i < grid.rowCount; i++) {
						 	        		
						 	 				var item = grid.getItem(i);
						 	 				
						 	 				if( grid.store.getValue(item,'idCompromiso') == registry.byId("prSelectC").get('value')){
						 	 					utils.cstmAlert("Ya esta registrado ese compromiso");
						 	 					return;
						 	 				}
				
						 	 			}
									}
									if( registry.byId("prSelectC").get('displayedValue') == "Otro" ){
			    						if(registry.byId("nomOtroCompromiso").get('value') == null || registry.byId("nomOtroCompromiso").get('value') == ''){
			    							utils.cstmAlert('Favor de registrar el nombre de otro compromiso');
				    						return false;	
			    						}
			    						if(registry.byId("accion1").get('value') == null || registry.byId("accion1").get('value') == ''){
			    							utils.cstmAlert('Favor de registrar la primera accion del compromiso');
				    						return false;	
			    						}
			    						if(registry.byId("accion2").get('value') == null || registry.byId("accion2").get('value') == ''){
			    							utils.cstmAlert('Favor de registrar la segunda accion del compromiso');
				    						return false;	
			    						}
				    				}
									
								   var gridRNE = registry.byId('avanceOtroDt');
								   
								   if(otrosSeleccionadoActivo==1){
									   if(registry.byId("otroDt").get('value')==null || registry.byId("otroDt").get('value') == ''){
										   utils.cstmAlert('Favor de registrar la acci\u00f3n OTRO');
						                   return false;
						    		   }				   
								   }

								   
								   var otrosCuales = "";
								   var checador=0;
								   if(rneSeleccionados.length>0){
									   for ( var j = 0; j < gridRNE.rowCount; j++) {
										   var item2 = gridRNE.getItem(j);
										   if( array.indexOf(rneSeleccionados,gridRNE.store.getValue(item2,'idActividad'))!=-1 ){
											   checador++;
											   otrosCuales += gridRNE.store.getValue(item2,'idActividad');
											   
											   if(gridRNE.store.getValue(item2,'meta')){
												   otrosCuales += ",="+gridRNE.store.getValue(item2,'meta');   
											   }						   
											   if(gridRNE.store.getValue(item2, "objetivo")=="Otro"){
												   otrosCuales += ",="+registry.byId("otroDt").get('value');
											   }
											   
											   otrosCuales += ",-";
										   }
									   }
									   
									   //alert(otrosCuales);
									   //accion1.value = otrosCuales;
									   registry.byId('accion1').set ('value',otrosCuales);
								   }
								   
								   if( registry.byId("prSelectC").get('displayedValue') != "Otro" ){
								   if(checador<2){
									   utils.cstmAlert('Favor de registrar al menos dos acciones');
					                   return false;
								   }
								   }
									try{
										
										if(edit){
											var index = grid.selection.selectedIndex;
											var item = grid.getItem(index);
											grid.store.setValue(item, 'accion1', registry.byId("accion1").get('value'));
											grid.store.setValue(item, 'accion2', registry.byId("accion2").get('value'));
											grid.store.setValue(item, 'nomOtroCompromiso', registry.byId("nomOtroCompromiso").get('value'));
											grid.store.setValue(item, 'cumplimiento', registry.byId("prSelect2").get('displayedValue'));
										//	grid.store.setValue(item, 'compromiso',  registry.byId("prSelectC").get('displayedValue'));
										//	grid.store.setValue(item, 'idCompromiso',  registry.byId("prSelectC").get('value'));
										} else {
											 var myNewItem = {  idConsecutivo: ++maxIndexCompromiso, 
																accion1:  registry.byId("accion1").get('value'),
																accion2:  registry.byId("accion2").get('value'),
																nomOtroCompromiso:  registry.byId("nomOtroCompromiso").get('value'),
																compromiso:  registry.byId("prSelectC").get('displayedValue'),
																idCompromiso:  registry.byId("prSelectC").get('value'), 
																cumplimiento: registry.byId("prSelect2").get('displayedValue')
															};	    							 
									         grid.store.newItem(myNewItem);
										}
										registry.byId('dDetail').destroyRecursive(false);
									}catch(e){
										utils.cstmAlert('Ocurrio un error al Agregar o Editar');
										console.log(e);
									}	
									
									
								
								}     			    				
							},'prBtnAceptar');

			    		
				}
						function despliegaRecursos2(crea){
					if(crea){
						if(!registry.byId(id)){
							if(!registry.byId('pregunta1ar')){
					   //var id="preguntasPane"; 
					   var contenido= '<table border="0" align="lefth" >'+ 
					   '<tr><td>'+ 
					   '	<p> <b> \u00BF A la fecha en que se realiz\u00f3 la segunda asamblea, la Asociaci\u00f3n de Padres de Familia inform\u00f3 a la comunidad escolar sobre los recursos obtenidos?</b></p>'+
					   '	<input id="pregunta1ar"/><label for="pregunta1ar">S\u00ed</label>'+ 
					   '	<br/><input id="pregunta1br"/><label for="pregunta1br">No</label>'+
					   
					   '</td></tr>'+
					   
					   '<tr>'+
					   '<td >'+
					        '<input id="r2Grid"/>'+
					    '</td>'+
						'</tr>'+
						'<tr>' +
						'<td>'+
							'<input id="a_r2Grid"/>'+
							'<input id="e_r2Grid"/>'+
							'<input id="d_r2Grid"/>'+
						'</td>'+
					  '</table>';
					  
					   dom.byId('recursos2Pane').innerHTML=contenido;
					   
					   
							      
								  var pregunta1ar= new RadioButton({
							           checked:segundaAsambleaObj.preguntaRecursosPadres==null?true: segundaAsambleaObj.preguntaRecursosPadres.respuesta1==1 ? true:false,
							           value: "1",
							           name: "pregunta1r",
							           id:"pregunta1ar"
							       }, "pregunta1ar");
								   
								  var pregunta1br=new RadioButton({
							           checked: segundaAsambleaObj.preguntaRecursosPadres==null?false:segundaAsambleaObj.preguntaRecursosPadres.respuesta1==2 ? true:false,
							           value: "2",
							           name: "pregunta1r",
							           id:"pregunta1br"
							       }, "pregunta1br");
						    
								
								  
							    	layoutr = [[  { name: 'idConsecutivo', field: 'idConsecutivor', width: '5px',hidden:true},
								    		      { name: 'Monto recabado por la asociaci\u00f3n de padres de familia o equivalente ', field: 'montoR1',  width:'150px'},
								    		      { name: 'Monto recabado por la asociaci\u00f3n de padres de familia o equivalente (Letra)', field: 'montoStrR1',  width:'150px',hidden:true},
								    		      { name: 'Monto gastado Eventos deportivos, recreativos, art\u00edsticos y culturales', field: 'montoG1',  width:'150px'},
								    		      { name: 'Monto gastado Eventos deportivos, recreativos, art\u00edsticos y culturales (Letra)', field: 'montoStrG1',  width:'150px',hidden:true},
								    		      { name: 'Monto gastado Actividades adicionales desarrolladas en beneficio del centro escolar', field: 'montoG2',  width:'150px'},
								    		      { name: 'Monto gastado Actividades adicionales desarrolladas en beneficio del centro escolar (Letra)', field: 'montoStrG2',  width:'150px',hidden:true},
								    		      { name: 'Monto gastado Otro', field: 'montoG3',  width:'150px'},
								    		      { name: 'Monto gastado Otro (Letra)', field: 'montoStrG3',  width:'150px',hidden:true},
								    		      { name: 'Otro', field: 'otro',  width:'200px',hidden:true},
								    		      { name: 'Monto gastado Otro 2', field: 'montoG4',  width:'150px'},
								    		      { name: 'Monto gastado Otro 2 (Letra)', field: 'montoStrG4',  width:'150px',hidden:true},
								    		      { name: 'Otro 2', field: 'otro2',  width:'200px',hidden:true},
								    		      { name: 'Monto gastado Otro 3', field: 'montoG5',  width:'150px'},
								    		      { name: 'Monto gastado Otro 3 (Letra)', field: 'montoStrG5',  width:'150px',hidden:true},
								    		      { name: 'Otro 3', field: 'otro3',  width:'200px',hidden:true}
								    		      
								    		      
							    		      ]];
									
							    	//tmpRecursos2 =[]; 
							    	tmpRecursos2=segundaAsambleaObj.recursosPadres?segundaAsambleaObj.recursosPadres:[];
							  			
										var dataJsonStoreRecursos2 = {
											identifier: 'idConsecutivor',
											items: tmpRecursos2
										};

										maxIndexRecursos2 = tmpRecursos2.length;
										
										
									
									new DataGrid({
								        id: 'r2Grid',
								        structure: layoutr,
								        rowSelector: '10px',
								        height: '200px',
										width: '450px'
								        }, 'r2Grid').startup();    	   		    	    			
							  			
									jsonStoreRecursos2 = new ItemFileWriteStore({data: dataJsonStoreRecursos2});
							    	
									registry.byId('r2Grid').setStore(jsonStoreRecursos2);
									
									new Button({
										label : " Agregar ",
										id:'a_r2Grid',
										onClick : function() {					
											recursos2();
										}
									}, 'a_r2Grid');
							    	
							    	new Button({
										label : " Editar ",
										id:'e_r2Grid',
										onClick : function() {	
											var index = registry.byId('r2Grid').selection.selectedIndex;    											
											if(index!=-1){												
												var item = registry.byId('r2Grid').getItem(index);
							                	var itemToEdit={selectedItem:index,
								                    			idConsecutivor: registry.byId('r2Grid').store.getValue(item, 'idConsecutivor'),     	                    			
								                    			montoR1: registry.byId('r2Grid').store.getValue(item, 'montoR1'),
								                    			montoStrR1: registry.byId('r2Grid').store.getValue(item, 'montoStrR1'),
								                    			montoG1: registry.byId('r2Grid').store.getValue(item, 'montoG1'),
								                    			montoStrG1: registry.byId('r2Grid').store.getValue(item, 'montoStrG1'),
								                    			montoG2: registry.byId('r2Grid').store.getValue(item, 'montoG2'),
								                    			montoStrG2: registry.byId('r2Grid').store.getValue(item, 'montoStrG2'),
								                    			montoG3: registry.byId('r2Grid').store.getValue(item, 'montoG3'),
								                    			montoStrG3: registry.byId('r2Grid').store.getValue(item, 'montoStrG3'),
								                    			otro: registry.byId('r2Grid').store.getValue(item, 'otro'),
								                    			montoG4: registry.byId('r2Grid').store.getValue(item, 'montoG4'),
								                    			montoStrG4: registry.byId('r2Grid').store.getValue(item, 'montoStrG4'),
								                    			otro2: registry.byId('r2Grid').store.getValue(item, 'otro2'),
								                    			montoG5: registry.byId('r2Grid').store.getValue(item, 'montoG5'),
								                    			montoStrG5: registry.byId('r2Grid').store.getValue(item, 'montoStrG5'),
								                    			otro3: registry.byId('r2Grid').store.getValue(item, 'otro3'),
								                    			};    	                    	
							                	recursos2(itemToEdit);
							                  
											} else{
								            	 utils.cstmAlert(
													'Debe seleccionar solo un registro.');
								             }					
										}
									}, 'e_r2Grid');
							    	
							    	new Button({
										label : " Eliminar",
										id: 'd_r2Grid',	
										onClick : function() {
											eliminaRow(registry.byId('r2Grid'));
										}
									}, 'd_r2Grid');
						   	}
						}
						
					}
					else{
						   if(registry.byId(id)){
							   registry.byId('pestanias').closeChild(registry.byId(id));
						   }   
						}
					
				}				
		
			function recursos2(itemToEdit){
				var edit=false;
			    if(!itemToEdit){
				   itemToEdit={idConsecutivor: 0,montoR1:'',montoStrR1:'',montoG1:'',montoStrG1:'',montoG2:'',montoStrG2:'',montoG3:'',montoStrG3:'',otro:'',montoG4:'',montoStrG4:'',otro2:'',montoG5:'',montoStrG5:'',otro3:''};
				}else{
				   edit=true;
			    }
				var title ='Recursos';
		    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
		    	registry.byId('dDetail').on('hide',function(){
					   												registry.byId('dDetail').destroyRecursive(false);
			   													});
		    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
			    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
			    jsUtils.createTag('div','prCnt','dcDetail');
				    
			    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "800px" >'+
						    			   '<tr id="trMontoR1"><td> '+
	 					    			   '	 <b>*Monto recabado por la asociaci\u00f3n de padres de familia o equivalente</b><br/><br/>'+
	 					    			  '<table> '+
						    			   '  <col width="60"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="60"> '+
						    			   '  <col width="180"> '+
						    			   '  <tr> '+
						    			   '    <td>N\u00FAmero:</td> '+
						    			   '    <td><input id="montoR1"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="montoStrR1"/></td> '+
						    			   '  </tr> '+
						    			   '</table> '+
	 					    			   '</td></tr>'+							    			   							    			   							    			   							    			   
	 					    			   '<tr id="trMontoG1"><td> '+
	 					    			   '	 <b><br/>Destino: Eventos deportivos, recreativos, art\u00edsticos y culturales</b><br/><br/>'+
	 					    			  '<table> '+
	 					    			 '  <col width="60"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="60"> '+
						    			   '  <col width="180"> '+
						    			   '  <tr> '+
						    			   '    <td>N\u00FAmero:</td> '+
						    			   '    <td><input id="montoG1"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="montoStrG1"/></td> '+
						    			   '  </tr> '+
						    			   '</table> '+
	 					    			   '</td></tr>'+							    			   							    			   							    			   							    			   
	 					    			  '<tr id="trMontoG2"><td> '+
	 					    			   '	 <b><br/>Destino: Actividades adicionales desarrolladas en beneficio del centro escolar</b><br/><br/>'+
	 					    			  '<table> '+
	 					    			 '  <col width="60"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="60"> '+
						    			   '  <col width="180"> '+
						    			   '  <tr> '+
						    			   '    <td>N\u00FAmero:</td> '+
						    			   '    <td><input id="montoG2"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="montoStrG2"/></td> '+
						    			   '  </tr> '+
						    			   '</table> '+
	 					    			  '</td></tr>'+
	 					    			   
	 					    			  '<tr id="trMontoG3"><td> '+
	 					    			   '	 <b><br/>Destino: Otro</b><br/>'+
	 					    			  '	<b>Mencione el otro destino: </b><div id="otro" /><br/><br/>'+
	 					    			   '</td></tr>'+
	 					    			  '<tr"><td> '+
	 					    			 '<table> '+
	 					    			'  <col width="60"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="60"> '+
						    			   '  <col width="180"> '+
						    			   '  <tr> '+
						    			   '    <td>N\u00FAmero:</td> '+
						    			   '    <td><input id="montoG3"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="montoStrG3"/></td> '+
						    			   '  </tr> '+
						    			   '</table> '+
	 					    			   '</td></tr>'+
	 		                               
	 					    			  '<tr id="trMontoG4"><td> '+
	 					    			   '	 <b><br/>Destino: Otro 2</b><br/>'+
	 					    			  '	<b>Mencione el otro destino: </b><div id="otro2" /><br/><br/>'+
	 					    			   '</td></tr>'+
	 					    			  '<tr"><td> '+
	 					    			 '<table> '+
	 					    			'  <col width="60"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="60"> '+
						    			   '  <col width="180"> '+
						    			   '  <tr> '+
						    			   '    <td>N\u00FAmero:</td> '+
						    			   '    <td><input id="montoG4"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="montoStrG4"/></td> '+
						    			   '  </tr> '+
						    			   '</table> '+
	 					    			   '</td></tr>'+
	 					    			   
	 					    			  '<tr id="trMontoG5"><td> '+
	 					    			   '	 <b><br/>Destino: Otro 3</b><br/>'+
	 					    			  '	<b>Mencione el otro destino: </b><div id="otro3" /><br/><br/>'+
	 					    			   '</td></tr>'+
	 					    			  '<tr"><td> '+
	 					    			 '<table> '+
	 					    			'  <col width="60"> '+
						    			   '  <col width="80"> '+
						    			   '  <col width="60"> '+
						    			   '  <col width="180"> '+
						    			   '  <tr> '+
						    			   '    <td>N\u00FAmero:</td> '+
						    			   '    <td><input id="montoG5"/></td> '+
						    			   '    <td>Letra:</td> '+
						    			   '    <td><input id="montoStrG5"/></td> '+
						    			   '  </tr> '+
						    			   '</table> '+
	 					    			   '</td></tr>'+
	 					    			   
						    			   '</table>'; 
			    	    
			    //---------------------------------- Datos	        
			    //---------------------------------- Dojo
			    
			    var otro = new ValidationTextBox({
			           promptMessage:"Nombre de Otro Destino",
			           value:itemToEdit.otro, 
			           trim:"true",
			           uppercase: true,
			           maxLength:"250",
			           //required: "true",
			           style:"display:block; width:200px"
		        }, 'otro');
			    
			    var otro2 = new ValidationTextBox({
			           promptMessage:"Nombre de Otro Destino",
			           value:itemToEdit.otro2, 
			           trim:"true",
			           uppercase: true,
			           maxLength:"250",
			           //required: "true",
			           style:"display:block; width:200px"
		        }, 'otro2');
			    
			    var otro3 = new ValidationTextBox({
			           promptMessage:"Nombre de Otro Destino",
			           value:itemToEdit.otro3, 
			           trim:"true",
			           uppercase: true,
			           maxLength:"250",
			           //required: "true",
			           style:"display:block; width:200px"
		        }, 'otro3');
			    
			    var montoR1=  new ValidationTextBox({
		 	           promptMessage:"Capture solo n\u00FAmeros",
		 	           id:'montoR1',
		 	           regExp: constants.NUMBER_VALID,
		 	           value:itemToEdit.montoR1, 
		 	           trim:"true",  
		 	           maxLength:"9",
		 	           required: "true",
		 	           style:"display:block; width:200px"
		 	        }, 'montoR1').on ('Blur', function(){	   
		 				   var montoR1= registry.byId("montoR1").get('value');		       
		 				   	if(montoR1!=''){			       
		 				       if(montoR1==0){
		 				    	   registry.byId('montoStrR1').set('value','CERO');
		 				       } else if(montoR1>=0){			    	   
		 				    		registry.byId('montoStrR1').set('value',jsUtils.covertirNumLetras(registry.byId("montoR1").get('value')));    					    	   
		 				       } else{
		 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
		 							return false;
		 				       }
		 			       	}
		 	        });
		 			    
		 		    var montoLetraR1= new ValidationTextBox({
		 	           promptMessage:"Capture solo letras",
		 	           value:itemToEdit.montoStrR1, 
		 	           regExp:constants.NoNUMBER_VALID,
		 	           id:'montoStrR1',
		 	           trim:"true",    
		 	           maxLength:"200",
		 	           style:"display:block; width:400px",
		 	           readOnly: true,
		 	           required: "true"
		 	        }, 'montoStrR1');
		 		    
		 		
		 		   var montoG1=  new ValidationTextBox({
		 	           promptMessage:"Capture solo n\u00FAmeros",
		 	           id:'montoG1',
		 	           regExp: constants.NUMBER_VALID,
		 	           value:itemToEdit.montoG1, 
		 	           trim:"true",  
		 	           maxLength:"9",
//		 	           required: "true",
		 	           style:"display:block; width:200px"
		 	        }, 'montoG1').on ('Blur', function(){	   
		 				   var montoG1= registry.byId("montoG1").get('value');		       
		 				   	if(montoG1!=''){			       
		 				       if(montoG1==0){
		 				    	   registry.byId('montoStrG1').set('value','CERO');
		 				       } else if(montoG1>=0){			    	   
		 				    		registry.byId('montoStrG1').set('value',jsUtils.covertirNumLetras(registry.byId("montoG1").get('value')));    					    	   
		 				       } else{
		 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
		 							return false;
		 				       }
		 			       	}
		 	        });
		 			    
		 		    var montoLetraG1= new ValidationTextBox({
		 	           promptMessage:"Capture solo letras",
		 	           value:itemToEdit.montoStrG1, 
		 	           regExp:constants.NoNUMBER_VALID,
		 	           id:'montoStrG1',
		 	           trim:"true",    
		 	           maxLength:"200",
		 	           style:"display:block; width:400px",
		 	           readOnly: true,
//		 	           required: "true"
		 	        }, 'montoStrG1');
			    
		 		   var montoG2=  new ValidationTextBox({
		 	           promptMessage:"Capture solo n\u00FAmeros",
		 	           id:'montoG2',
		 	           regExp: constants.NUMBER_VALID,
		 	           value:itemToEdit.montoG2, 
		 	           trim:"true",  
		 	           maxLength:"9",
//		 	           required: "true",
		 	           style:"display:block; width:200px"
		 	        }, 'montoG2').on ('Blur', function(){	   
		 				   var montoG2= registry.byId("montoG2").get('value');		       
		 				   	if(montoG2!=''){			       
		 				       if(montoG2==0){
		 				    	   registry.byId('montoStrG2').set('value','CERO');
		 				       } else if(montoG2>=0){			    	   
		 				    		registry.byId('montoStrG2').set('value',jsUtils.covertirNumLetras(registry.byId("montoG2").get('value')));    					    	   
		 				       } else{
		 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
		 							return false;
		 				       }
		 			       	}
		 	        });
		 			    
		 		    var montoLetraG2= new ValidationTextBox({
		 	           promptMessage:"Capture solo letras",
		 	           value:itemToEdit.montoStrG2, 
		 	           regExp:constants.NoNUMBER_VALID,
		 	           id:'montoStrG2',
		 	           trim:"true",    
		 	           maxLength:"200",
		 	           style:"display:block; width:400px",
		 	           readOnly: true,
//		 	           required: "true"
		 	        }, 'montoStrG2');
			    
			    
		 		    
		 		   var montoG3=  new ValidationTextBox({
		 	           promptMessage:"Capture solo n\u00FAmeros",
		 	           id:'montoG3',
		 	           regExp: constants.NUMBER_VALID,
		 	           value:itemToEdit.montoG3, 
		 	           trim:"true",  
		 	           maxLength:"9",
//		 	           required: "true",
		 	           style:"display:block; width:200px"
		 	        }, 'montoG3').on ('Blur', function(){	   
		 				   var montoG3= registry.byId("montoG3").get('value');		       
		 				   	if(montoG3!=''){			       
		 				       if(montoG3==0){
		 				    	   registry.byId('montoStrG3').set('value','CERO');
		 				       } else if(montoG3>=0){			    	   
		 				    		registry.byId('montoStrG3').set('value',jsUtils.covertirNumLetras(registry.byId("montoG3").get('value')));    					    	   
		 				       } else{
		 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
		 							return false;
		 				       }
		 			       	}
		 	        });
		 			    
		 		    var montoLetraG3= new ValidationTextBox({
		 	           promptMessage:"Capture solo letras",
		 	           value:itemToEdit.montoStrG3, 
		 	           regExp:constants.NoNUMBER_VALID,
		 	           id:'montoStrG3',
		 	           trim:"true",    
		 	           maxLength:"200",
		 	           style:"display:block; width:400px",
		 	           readOnly: true,
//		 	           required: "true"
		 	        }, 'montoStrG3');
		 		    
		 		   var montoG4=  new ValidationTextBox({
		 	           promptMessage:"Capture solo n\u00FAmeros",
		 	           id:'montoG4',
		 	           regExp: constants.NUMBER_VALID,
		 	           value:itemToEdit.montoG4, 
		 	           trim:"true",  
		 	           maxLength:"9",
//		 	           required: "true",
		 	           style:"display:block; width:200px"
		 	        }, 'montoG4').on ('Blur', function(){	   
		 				   var montoG4= registry.byId("montoG4").get('value');		       
		 				   	if(montoG4!=''){			       
		 				       if(montoG4==0){
		 				    	   registry.byId('montoStrG4').set('value','CERO');
		 				       } else if(montoG4>=0){			    	   
		 				    		registry.byId('montoStrG4').set('value',jsUtils.covertirNumLetras(registry.byId("montoG4").get('value')));    					    	   
		 				       } else{
		 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
		 							return false;
		 				       }
		 			       	}
		 	        });
		 			    
		 		    var montoLetraG4= new ValidationTextBox({
		 	           promptMessage:"Capture solo letras",
		 	           value:itemToEdit.montoStrG4, 
		 	           regExp:constants.NoNUMBER_VALID,
		 	           id:'montoStrG4',
		 	           trim:"true",    
		 	           maxLength:"200",
		 	           style:"display:block; width:400px",
		 	           readOnly: true,
//		 	           required: "true"
		 	        }, 'montoStrG4');
		 		    
		 		    
		 		   var montoG5=  new ValidationTextBox({
		 	           promptMessage:"Capture solo n\u00FAmeros",
		 	           id:'montoG5',
		 	           regExp: constants.NUMBER_VALID,
		 	           value:itemToEdit.montoG5, 
		 	           trim:"true",  
		 	           maxLength:"9",
//		 	           required: "true",
		 	           style:"display:block; width:200px"
		 	        }, 'montoG5').on ('Blur', function(){	   
		 				   var montoG5= registry.byId("montoG5").get('value');		       
		 				   	if(montoG5!=''){			       
		 				       if(montoG5==0){
		 				    	   registry.byId('montoStrG5').set('value','CERO');
		 				       } else if(montoG5>=0){			    	   
		 				    		registry.byId('montoStrG5').set('value',jsUtils.covertirNumLetras(registry.byId("montoG5").get('value')));    					    	   
		 				       } else{
		 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
		 							return false;
		 				       }
		 			       	}
		 	        });
		 			    
		 		    var montoLetraG5= new ValidationTextBox({
		 	           promptMessage:"Capture solo letras",
		 	           value:itemToEdit.montoStrG5, 
		 	           regExp:constants.NoNUMBER_VALID,
		 	           id:'montoStrG5',
		 	           trim:"true",    
		 	           maxLength:"200",
		 	           style:"display:block; width:400px",
		 	           readOnly: true,
//		 	           required: "true"
		 	        }, 'montoStrG5');
			    //------------------------------------
			    jsUtils.createTag('div','prBtnAceptar','dcDetail');
				   		
			    
			    new Button({
					label : " Aceptar " ,
					onClick : function() {							
						var form = registry.byId('dDetail');
						if (!form.validate()){  
							utils.cstmAlert('Favor de registrar los datos requeridos');
							return false;
						}
						var totalDestino1=0;
						var totalDestino2=0;
						var totalDestino3=0;
						var totalDestino4=0;
						var totalDestino5=0;
						
						var totalDestino=0;
						var totalRecabado=0;
						
						
						if( registry.byId("montoG1").get('value') != null && registry.byId("montoG1").get('value') != ""){
						 totalDestino1=parseInt( registry.byId("montoG1").get('value'));
						}
						if( registry.byId("montoG2").get('value') != null && registry.byId("montoG2").get('value') != ""){
						totalDestino2=parseInt(registry.byId("montoG2").get('value'));
						}
						if( registry.byId("montoG3").get('value') != null && registry.byId("montoG3").get('value') != ""){
						totalDestino3=parseInt(registry.byId("montoG3").get('value'));
						}
						if( registry.byId("montoG4").get('value') != null && registry.byId("montoG4").get('value') != ""){
							totalDestino4=parseInt(registry.byId("montoG4").get('value'));
							}
						if( registry.byId("montoG5").get('value') != null && registry.byId("montoG5").get('value') != ""){
							totalDestino5=parseInt(registry.byId("montoG5").get('value'));
							}
						
						totalDestino=totalDestino1+totalDestino2+totalDestino3+totalDestino4+totalDestino5;
						
												
						totalRecabado=parseInt(registry.byId("montoR1").get('value'));
						
//						if(totalDestino != totalRecabado){
//							utils.cstmAlert('Favor de registrar un monto Destino igual que el monto Recabado');
//							return false;	
//						}

						var grid = registry.byId('r2Grid');
						try{
							if(edit){
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);
								grid.store.setValue(item, 'montoR1', registry.byId("montoR1").get('value'));
								grid.store.setValue(item, 'montoStrR1',  registry.byId("montoStrR1").get('value'));
								grid.store.setValue(item, 'montoG1',  registry.byId("montoG1").get('value'));
								grid.store.setValue(item, 'montoStrG1',  registry.byId("montoStrG1").get('value'));
								grid.store.setValue(item, 'montoG2',  registry.byId("montoG2").get('value'));
								grid.store.setValue(item, 'montoStrG2',  registry.byId("montoStrG2").get('value'));
								grid.store.setValue(item, 'montoG3',  registry.byId("montoG3").get('value'));
								grid.store.setValue(item, 'montoStrG3',  registry.byId("montoStrG3").get('value'));
								grid.store.setValue(item, 'otro',  registry.byId("otro").get('value'));
								grid.store.setValue(item, 'montoG4',  registry.byId("montoG4").get('value'));
								grid.store.setValue(item, 'montoStrG4',  registry.byId("montoStrG4").get('value'));
								grid.store.setValue(item, 'otro2',  registry.byId("otro2").get('value'));
								grid.store.setValue(item, 'montoG5',  registry.byId("montoG5").get('value'));
								grid.store.setValue(item, 'montoStrG5',  registry.byId("montoStrG5").get('value'));
								grid.store.setValue(item, 'otro3',  registry.byId("otro3").get('value'));
								
	
							} else {
								 var myNewItem = {
										    idConsecutivor:++maxIndexRecursos2,
			                    			otro: registry.byId('otro').get('value'),
			                    			otro2: registry.byId('otro2').get('value'),
			                    			otro3: registry.byId('otro3').get('value'),
			                    			montoR1: registry.byId('montoR1').get('value'),
			                    			montoStrR1: registry.byId('montoStrR1').get('value'),
			                    			montoG1: registry.byId('montoG1').get('value'),
			                    			montoStrG1: registry.byId('montoStrG1').get('value'),
			                    			montoG2: registry.byId('montoG2').get( 'value'),
			                    			montoStrG2: registry.byId('montoStrG2').get('value'),
			                    			montoG3: registry.byId('montoG3').get('value'),
			                    			montoStrG3: registry.byId('montoStrG3').get('value'),
			                    			montoG4: registry.byId('montoG4').get('value'),
			                    			montoStrG4: registry.byId('montoStrG4').get('value'),
			                    			montoG5: registry.byId('montoG5').get('value'),
			                    			montoStrG5: registry.byId('montoStrG5').get('value')
			                    			 };	    							 
						         grid.store.newItem(myNewItem);
							}
							registry.byId('dDetail').destroyRecursive(false);
						}catch(e){
							utils.cstmAlert('Ocurrio un error al Agregar o Editar');
							console.log(e);
						}	
						
						
					
					}     			    				

				},'prBtnAceptar');

	
			}
			
	// Se manda a actualizar la informacion capturada
	function saveSegundaAsamblea(cct) {
		//
		console.log("Guardando segunda asamblea... Inicio");
				
		var standby = new Standby({
			target : "dialogCaptiraDG"
		});
		
		document.body.appendChild(standby.domNode);
		standby.startup();
				
		var form = registry.byId('registraPrimeraReunion');
		
		if ( form.validate() == false){  
			jsUtils.cstmAlert('Favor de registrar los datos requeridos');
			return false;
		}
		
		var fchSesion = registry.byId('fechaRegistro').get('value');
		var fechapublicacion = registry.byId('fechaPublicacion').get('value');
		
	 	if(fechapublicacion>fchSesion)
	 	{
	 		jsUtils.cstmAlert('La fecha de Publicaci\u00f3n no debe ser posterior a la Fecha de la Sesi\u00f3n');
	 		return false;
	 	}

		var ceInfGral = {
				cCct : cct
		};
		var ceSesion = {
 				fchSesion : registry.byId('fechaRegistro').get('value'),
 				horaIniSesion : registry.byId('horaInicio').get('value'),
 				horaFinSesion : registry.byId('horaFinal').get('value'),
 				numIntegrantes : registry.byId('numIntegrantes').get('value'),
 				observaciones : registry.byId('observaciones').get('value'),
 				publicadaen : registry.byId('publicadaEn').get('value'),
 				fechapublicacion : registry.byId('fechaPublicacion').get('value'),
 				fchRegistro : registry.byId('fechaRegistro').get('value')
		};

//	 	if(ceSesion.numIntegrantes<2 || ceSesion.numIntegrantes>15)
//  	    {
//  	        utils.cstmAlert("El n&#250;mero de asistentes no puede ser menor a 2 o mayor a 15");
//			return false;
//  	    }
	 	
		// Actividades
		var actividades = new Array();
		var actividadesArray = registry.byId('nomActividad').get('value');

		// Carga los objetos tipo CeActSesion
		for ( var i in actividadesArray) {
			actividades.push({cActividad : actividadesArray[i]});
		}		
 
	 	
		tfederalSeguimiento = [];			
		tfederalActual = [];
		testatalSeguimiento = [];
		testatalActual = [];
		tmunicipalSeguimiento = [];
		tmunicipalActual = [];
		toscSeguimiento = [];
		toscActual = [];
		tprogramaRecursos = [];
		tacciones = [];
		tnormalidad = [];
		tevaluacion = [];
		tcompromiso = [];

	 	tcomites=[];
	 	teventos=[];
	 	testimulos=[];
	 	tconsejosEstatal={};
	 	tconsejosMunicipal={};
	 	tconsejosEstatal1={};
	 	tconsejosMunicipal1={};
	 	
	 	tcontraloriaComite={};
	 	
	 	testimulosMunicipal=[];
	 	tactividades=[];
	 	tpreguntaAsociacion={};
	 	trecursosAsociacion=[];
	 	tasunto = [];
	 	var tpreguntas={};	
	 	if(array.indexOf(actividadesArray,41)!=-1){
			//----------------------------------------------------------------- Lee informacion programas federales seguimiento
			var gridFed = registry.byId('1Grid');
			
			for ( var i = 0; i < gridFed.rowCount; i++) {
	
				var item = gridFed.getItem(i);														
				
				detalle = [];
				
				if( gridFed.store.getValue(item,'idPrograma') >= 81 ){
					detalle = [{		 					
						idObjetivo: gridFed.store.getValue(item,'idObjetivo'),
						objetivo: gridFed.store.getValue(item,'objetivo'),
						meta: gridFed.store.getValue(item,'meta'),						
						seguimiento: gridFed.store.getValue(item,'seguimiento'),
						avance: gridFed.store.getValue(item,'avance')						
					}]; 
				} else {
					detalle = item.objetivos;
				}
//				if( gridFed.store.getValue(item,'cSesion')==null){
//				if(detalle.avance==null  && detalle.avance==''){
//					utils.cstmAlert("Debe registrar el avance final del programa 1");
//					return false;	
//				}
//				}
				noSesion = gridFed.store.getValue(item,'cSesion') !=null?gridFed.store.getValue(item,'cSesion'):null;
				
				var federal = {		 					
				    cSesion: noSesion,
	    			idPrograma: parseInt(gridFed.store.getValue(item,'idPrograma')), 
	    			nomPrograma: gridFed.store.getValue(item,'nomPrograma'),
	    			nomOtroPrograma:gridFed.store.getValue(item,'nomOtroPrograma'),
	    			objetivos: detalle,    	                    			
	    			monto: parseInt( gridFed.store.getValue(item,'monto') ),
	    			montoStr: gridFed.store.getValue(item,'montoStr'),
	    			recibido: gridFed.store.getValue(item,'recibido')==null?0:parseInt(gridFed.store.getValue(item,'recibido')),
	    			recibidoStr: gridFed.store.getValue(item,'recibidoStr')==null?"":gridFed.store.getValue(item,'recibidoStr')
				};
				
				tfederalActual.push(federal);		 									 				
			}		
			
			//----------------------------------------------------------------- Fin programas federales seguimiento
			if(tDetalle.length>0){
				if(tDetalle4.length==0){
					utils.cstmAlert("Debe registrar el avance final de los programas");
					return false;
				}
			}
			progFedSeg4 = tDetalle4;
			progFedSeg = [];

			for(var i=0;i<progFedSeg4.length;i++){
				if(progFedSeg4[i].cSesion == 4){
					progFedSeg.push(progFedSeg4[i]);
				}
			}
			
			if(progFedSeg.length==0){
				progFedSeg = progFedSeg4;
			}
			
			for(var i=0;i<progFedSeg.length;i++){				
				listaProgramas = progFedSeg[i];
				//if(listaProgramas.tipoPrograma==0 ){//&& listaProgramas.cSesion==2){
					tAvance = listaProgramas.avance?listaProgramas.avance:"";

					noSesion = listaProgramas.cSesion!=null?listaProgramas.cSesion:null;
					
					var fedS = {
							idPrograma : listaProgramas.idPrograma,						
							idDetalle : listaProgramas.idDetalle,
							idObjetivo : listaProgramas.idObjetivo,
							cSesion : noSesion,
							avance : tAvance,
							seguimiento :	listaProgramas.seguimiento==null?"":listaProgramas.seguimiento								
					};							
					
					if(fedS.avance==null || fedS.avance==''){
						utils.cstmAlert("Debe registrar el avance final de los programas");
						return false;	
					}
					tfederalSeguimiento.push(fedS);	
										
				//}
			}			
			//----------------------------------------------------------------- Lee informacion programas estatales seguimiento
			var gridEstatal = registry.byId('2Grid');
				
			for ( var i = 0; i < gridEstatal.rowCount; i++) {

				var item = gridEstatal.getItem(i);														
							
				var detalle = [{		 					
					idObjetivo: gridEstatal.store.getValue(item,'idObjetivo'),
					objetivo: gridEstatal.store.getValue(item,'objetivo'),
					meta: gridEstatal.store.getValue(item,'meta'),
					seguimiento: gridEstatal.store.getValue(item,'avance'),
					avance: gridEstatal.store.getValue(item,'seguimiento')
				}];
				
				noSesion = gridEstatal.store.getValue(item,'cSesion') !=null?gridEstatal.store.getValue(item,'cSesion'):null;
				
				var estatal = {
					cSesion: noSesion,
        			idPrograma: gridEstatal.store.getValue(item,'idPrograma'), 
        			nomPrograma: gridEstatal.store.getValue(item,'nomPrograma'),
        			nomOtroPrograma:gridEstatal.store.getValue(item,'nomOtroPrograma'),
        			objetivos: detalle,                    			
        			monto: gridEstatal.store.getValue(item,'monto'),
        			montoStr: gridEstatal.store.getValue(item,'montoStr'),
        			recibido: gridEstatal.store.getValue(item,'recibido')==null?0:gridEstatal.store.getValue(item,'recibido'),
        			recibidoStr: gridEstatal.store.getValue(item,'recibidoStr')==null?"":gridEstatal.store.getValue(item,'recibidoStr')
				};
							
				testatalActual.push(estatal);
			}	

			//----------------------------------------------------------------- Fin programas estatales seguimiento
			//----------------------------------------------------------------- Lee informacion programas municipales seguimiento
			var gridMunicipal = registry.byId('3Grid');
			
			for ( var i = 0; i < gridMunicipal.rowCount; i++) {

				var item = gridMunicipal.getItem(i);														
						
				var detalle = [{		 					
					idObjetivo: gridMunicipal.store.getValue(item,'idObjetivo'),
					objetivo: gridMunicipal.store.getValue(item,'objetivo'),
					meta: gridMunicipal.store.getValue(item,'meta'),
					seguimiento: gridMunicipal.store.getValue(item,'avance'),
					avance: gridMunicipal.store.getValue(item,'seguimiento')
				}];

				noSesion = gridMunicipal.store.getValue(item,'cSesion') !=null?gridMunicipal.store.getValue(item,'cSesion'):null;
				
				var Municipal = {		
				    cSesion: noSesion,
        			idPrograma: gridMunicipal.store.getValue(item,'idPrograma'), 
        			nomPrograma: gridMunicipal.store.getValue(item,'nomPrograma'),
        			nomOtroPrograma:gridMunicipal.store.getValue(item,'nomOtroPrograma'),
        			objetivos: detalle,
        			monto: gridMunicipal.store.getValue(item,'monto'),
        			montoStr: gridMunicipal.store.getValue(item,'montoStr'),
        			recibido: gridMunicipal.store.getValue(item,'recibido')==null?0:gridMunicipal.store.getValue(item,'recibido'),
        			recibidoStr: gridMunicipal.store.getValue(item,'recibidoStr')==null?"":gridMunicipal.store.getValue(item,'recibidoStr'),
				};
							
				tmunicipalActual.push(Municipal);
			}

			//----------------------------------------------------------------- Fin programas municipales seguimiento
			//----------------------------------------------------------------- Lee informacion programas OSC seguimiento	
			var gridOSC = registry.byId('4Grid');
				
			for ( var i = 0; i < gridOSC.rowCount; i++) {

				var item = gridOSC.getItem(i);														
						
				var detalle = [{		 					
					idObjetivo: gridOSC.store.getValue(item,'idObjetivo'),
					objetivo: gridOSC.store.getValue(item,'objetivo'),
					meta: gridOSC.store.getValue(item,'meta'),
					seguimiento: gridOSC.store.getValue(item,'avance'),
					avance: gridOSC.store.getValue(item,'seguimiento')
				}];

				noSesion = gridOSC.store.getValue(item,'cSesion') !=null?gridOSC.store.getValue(item,'cSesion'):null;
				
				var OSC = {
				    cSesion: noSesion,
        			idPrograma: gridOSC.store.getValue(item,'idPrograma'), 
        			nomPrograma: gridOSC.store.getValue(item,'nomPrograma'),
        			nomOtroPrograma:gridOSC.store.getValue(item,'nomOtroPrograma'),
        			objetivos: detalle,
        			monto: gridOSC.store.getValue(item,'monto'),
        			montoStr: gridOSC.store.getValue(item,'montoStr'),
        			recibido: gridOSC.store.getValue(item,'recibido')==null?0:gridOSC.store.getValue(item,'recibido'),
        			recibidoStr: gridOSC.store.getValue(item,'recibidoStr')==null?"":gridOSC.store.getValue(item,'recibidoStr'),
				};
							
				toscActual.push(OSC);
			}
			
			
			var g1 = registry.byId('1Grid');
			
			var g3 = registry.byId('2Grid');
			
			var g5 = registry.byId('3Grid');
			
			var g7 = registry.byId('4Grid');
			
			var totfed=g1.rowCount;
			var totest=g3.rowCount;
			var totmun=g5.rowCount;
			var totosc=g7.rowCount;
	 	}
			//----------------------------------------------------------------- Fin programas OSC seguimiento
			if(array.indexOf(actividadesArray,43)!=-1){
		        // Validacion de acciones registradas en la primera sesion
		        tmpVacio=1;
		        var gridAcciones = registry.byId('5Grid');                             
		        for ( var i = 0; i < gridAcciones.rowCount; i++) {
	                var item = gridAcciones.getItem(i);                                                                                                                                                                                                                                                                                                                  
	                
	                if( gridAcciones.store.getValue(item,'avanceAccion') == "" )
	                {
	                                tmpVacio=0;
	                }
		        }	        
		        if(tmpVacio==0)
		        {
	               jsUtils.cstmAlert('Debe registrar avance en las acciones registradas en Primera Sesi\u00f3n');
	               return false;
		        }	        
		    //----------------------------------------------------------------- Lee informacion de acciones					
				for ( var i = 0; i < gridAcciones.rowCount; i++) {

					var item = gridAcciones.getItem(i);														
								
					var accion = {
							idAccion: gridAcciones.store.getValue(item,'idAccion'),     	                    			
							avanceAccion: gridAcciones.store.getValue(item,'avanceAccion'),							
							avanceRecomendacion: gridAcciones.store.getValue(item,'avanceRecomendacion')     	                    									
						};
				
					tacciones.push(accion);
				}
			
			     //----------------------------------------------------------------- Fin acciones
			}
			if(array.indexOf(actividadesArray,44)!=-1){
				 //----------------------------------------------------------------- Lee informacion de normalidad
						
				  var gridNormalidad = registry.byId('nGrid');
					var error=0;
					for ( var i = 0; i < gridNormalidad.rowCount; i++) {

						var item = gridNormalidad.getItem(i);														
									
						var normalidad = {
								cNormalidad: gridNormalidad.store.getValue(item,'cNormalidad'),     	                    			
								opcionNunca: gridNormalidad.store.getValue(item,'opcionNunca') //=='SI'?1:gridNormalidad.store.getValue(item,'opcionNunca')=='NO'?2:null,
//								opcionCasiNunca: gridNormalidad.store.getValue(item,'opcionCasiNunca')=='SI'?1:gridNormalidad.store.getValue(item,'opcionCasiNunca')=='NO'?2:null,
//								opcionCasiSiempre: gridNormalidad.store.getValue(item,'opcionCasiSiempre')=='SI'?1:gridNormalidad.store.getValue(item,'opcionCasiSiempre')=='NO'?2:null,  
//								opcionSiempre: gridNormalidad.store.getValue(item,'opcionSiempre')=='SI'?1:gridNormalidad.store.getValue(item,'opcionSiempre')=='NO'?2:null,
								
							};
							if(normalidad.opcionNunca==null )
							{
								error=1;
												
							}
						tnormalidad.push(normalidad);
					}
					if(error==1){
					utils.cstmAlert("Es obligatorio registrar normalidad m\u00ednima");
					return false;
					}
					tpreguntas = {
							
							respuesta3 : registry.byId('pregunta3a').checked ? 1:2
							
					};
				  //----------------------------------------------------------------- Fin normalidad
				}
			
			if(array.indexOf(actividadesArray,42)!=-1)
			{
				//----------------------------------------------------------------- Lee informacion de recursos		
				var gridRecursos = registry.byId('rGrid');
				var repFed=0;
				var repEst=0;
				var repMun=0;
				var repOSc=0;
				for ( var i = 0; i < gridRecursos.rowCount; i++) {

					var item = gridRecursos.getItem(i);		
					var recurso;
								if(gridRecursos.store.getValue(item,'tprogramaFederales')==null){
									 recurso = {
											cParticipacion: gridRecursos.store.getValue(item,'cParticipacion'),     	                    			
											tprogramaFederales:2,					
											tprogramaEstatales: 2,     	                    			
											tprogramaMunicipales:2,
											tprogramaOsc: 2
										};				
								}
								else{
									 recurso = {
											cParticipacion: gridRecursos.store.getValue(item,'cParticipacion'),     	                    			
											tprogramaFederales: gridRecursos.store.getValue(item,'tprogramaFederales'),					
											tprogramaEstatales: gridRecursos.store.getValue(item,'tprogramaEstatales'),     	                    			
											tprogramaMunicipales: gridRecursos.store.getValue(item,'tprogramaMunicipales'),
											tprogramaOsc: gridRecursos.store.getValue(item,'tprogramaOsc')
										};
								
							     }
					
					
					seleccionoSi=0; 
		            if(recurso.tprogramaFederales==1){
		                   seleccionoSi++;
		            }
		            if(recurso.tprogramaEstatales==1){
		                   seleccionoSi++;
		            }
		            if(recurso.tprogramaMunicipales==1){
		                   seleccionoSi++;
		            }
		            if(recurso.tprogramaOsc==1){
		                   seleccionoSi++;
		            }
		            
//		            if(seleccionoSi>1 || seleccionoSi==0)
//		            {
//		                   utils.cstmAlert("Debe registrar 1 solo SI en la participaci\u00f3n del Consejo Escolar");
//		                   return false;
//		            }

		            if(recurso.tprogramaFederales==2 && recurso.tprogramaEstatales==2 && recurso.tprogramaMunicipales==2 && recurso.tprogramaOsc==2){
						//repFed=repFed+1;
						if(array.indexOf(actividadesArray,41)!=-1){
							
							
							if(totfed>0 && recurso.cParticipacion==1){
							
							utils.cstmAlert("Debe contestar afirmativamente alguna de las respuesta de la Participaci\u00f3n en Programas Federales del Consejo Escolar en la pesta\u00F1a Recursos");
							return false;
							}
							
							if(totest>0 && recurso.cParticipacion==2){
								
								utils.cstmAlert("Debe contestar afirmativamente alguna de las respuesta de la Participaci\u00f3n en Programas Estatales del Consejo Escolar en la pesta\u00F1a Recursos");
								return false;
								}
							
							if(totmun>0 && recurso.cParticipacion==3){
								
								utils.cstmAlert("Debe contestar afirmativamente alguna de las respuesta de la Participaci\u00f3n en Programas Municipales del Consejo Escolar en la pesta\u00F1a Recursos");
								return false;
								}
							
							if(totosc>0 && recurso.cParticipacion==4){
								
								utils.cstmAlert("Debe contestar afirmativamente alguna de las respuesta de la Participaci\u00f3n en Programas OSC del Consejo Escolar en la pesta\u00F1a Recursos");
								return false;
								}
							
							}

					}
		            
		            if(array.indexOf(actividadesArray,41)!=-1){
		            	
		            	if(totfed==0 && recurso.cParticipacion==1){
		            		recurso = {
									cParticipacion: 1,     	                    			
									tprogramaFederales:2,					
									tprogramaEstatales: 2,     	                    			
									tprogramaMunicipales:2,
									tprogramaOsc: 2
								};
		            	}
		            	
		            	if(totest==0 && recurso.cParticipacion==2){
		            		recurso = {
									cParticipacion: 2,     	                    			
									tprogramaFederales:2,					
									tprogramaEstatales: 2,     	                    			
									tprogramaMunicipales:2,
									tprogramaOsc: 2
								};
		            	}
		            	
		            	if(totmun==0 && recurso.cParticipacion==3){
		            		recurso = {
									cParticipacion: 3,     	                    			
									tprogramaFederales:2,					
									tprogramaEstatales: 2,     	                    			
									tprogramaMunicipales:2,
									tprogramaOsc: 2
								};
		            	}
		            	
		            	if(totosc==0 && recurso.cParticipacion==4){
		            		recurso = {
									cParticipacion: 4,     	                    			
									tprogramaFederales:2,					
									tprogramaEstatales: 2,     	                    			
									tprogramaMunicipales:2,
									tprogramaOsc: 2
								};
		            	}
		            	
		            }
		            else{
		            	recurso = {
								cParticipacion: recurso.cParticipacion,     	                    			
								tprogramaFederales:2,					
								tprogramaEstatales: 2,     	                    			
								tprogramaMunicipales:2,
								tprogramaOsc: 2
							};
		            }
		          
		            
		            
					tprogramaRecursos.push(recurso);
				}
				  
				     //----------------------------------------------------------------- Fin recursos
			}
			
			if(array.indexOf(actividadesArray,45)!=-1){
				 //----------------------------------------------------------------- Lee informacion de evaluaciones
			    var gridEvaluaciones = registry.byId('myDataGrid');
				
				for ( var i = 0; i < gridEvaluaciones.rowCount; i++) {

					var item = gridEvaluaciones.getItem(i);														
								
					var evaluacion = {
							cGrado: gridEvaluaciones.store.getValue(item,'idGrado'),     	                    			
							eva1: parseInt(gridEvaluaciones.store.getValue(item,'eva1')),	
							meta1: parseInt(gridEvaluaciones.store.getValue(item,'meta1')),
							eva2: parseInt(gridEvaluaciones.store.getValue(item,'eva2')),  
							meta2: parseInt(gridEvaluaciones.store.getValue(item,'meta2')),
							eva3: parseInt(gridEvaluaciones.store.getValue(item,'eva3')),
							meta3: parseInt(gridEvaluaciones.store.getValue(item,'meta3'))
						};
					
					
					val1= parseInt(evaluacion.meta1);
					val2= parseInt(evaluacion.meta2);
					val3= parseInt(evaluacion.meta3);
					valt= (val1+val2+val3)*100/100;
					if(infCctNivel.cNivel==12 || infCctNivel.cNivel==13){
					if(valt!=100){
						utils.cstmAlert('El registro de los resultados de las evaluaciones no da el 100%');
						return;
					}
					}
					tevaluacion.push(evaluacion);
				}
			    //----------------------------------------------------------------- Fin evaluaciones
			}				
				
			if(array.indexOf(actividadesArray,45)!=-1){
				//----------------------------------------------------------------- Lee informacion de compromisos					
				var gridCompromiso = registry.byId('cGrid');
		
				if(gridCompromiso.rowCount < 2 ){
						utils.cstmAlert("Es obligatorio registrar al menos 2 compromisos");
						return false;
					}
				
				for ( var i = 0; i < gridCompromiso.rowCount; i++) {
		
					var item = gridCompromiso.getItem(i);														
								
					var compromiso = {
							idConsecutivo: gridCompromiso.store.getValue(item,'idConsecutivo'),     	                    			
							idCompromiso: gridCompromiso.store.getValue(item,'idCompromiso'),					
							accion1: gridCompromiso.store.getValue(item,'accion1'),     	                    			
							accion2: gridCompromiso.store.getValue(item,'accion2'),
							nomOtroCompromiso: gridCompromiso.store.getValue(item,'nomOtroCompromiso'),
							cumplimiento: gridCompromiso.store.getValue(item,'cumplimiento')=="SI"?1:2
						};
								
					tcompromiso.push(compromiso);
				}
				
			}
				//----------------------------------------------------------------- Fin compromisos
	 	
		 	if(array.indexOf(actividadesArray,46)!=-1){			
	//----------------------------------------------------------------- Lee informacion de comites

	
			var gridComite = registry.byId('7_1Grid');
			
			var comiContra=0;
 			
 			for ( var i = 0; i < gridComite.rowCount; i++) {

 				var item = gridComite.getItem(i);														
 							
 				var comite = {		  						 
 						ceComites: gridComite.store.getValue(item,'idConsecutivo'),
 						cSesion: gridComite.store.getValue(item,'cSesion'),
 						idComite: gridComite.store.getValue(item,'idComite'),
 						nomComite: gridComite.store.getValue(item,'nomComite'),		 						
 						numIntegrantes: gridComite.store.getValue(item,'numIntegrantes'),
 						nomPresidente: gridComite.store.getValue(item,'nomPresidente'),
 						idCalidad: gridComite.store.getValue(item,'idCalidad'),
 						nomcalidad: gridComite.store.getValue(item,'nomCalidad'),
 						idAcuerdo: gridComite.store.getValue(item,'idAcuerdo'),		 								
 						acuerdo: gridComite.store.getValue(item,'acuerdo'),
 						nomOtroComite: gridComite.store.getValue(item,'nomOtroComite'),
 						accion1: gridComite.store.getValue(item,'accion1'),		 						
						accion2: gridComite.store.getValue(item,'accion2'),
						accion3: gridComite.store.getValue(item,'accion3'),
						accion4: gridComite.store.getValue(item,'accion4'),
						accion5: gridComite.store.getValue(item,'accion5'),
						actividadComite1: gridComite.store.getValue(item,'actividadComite1')
 				};
 				
 				if(comite.actividadComite1==null ||comite.actividadComite1==0){
					utils.cstmAlert("Debe registrar si se cumplio el plan de actividades del comite");
					return false;	
				}	
 				
 				if(comite.idComite==13 ){
 					comiContra++;
				}
 				tcomites.push(comite);
 			}
		//----------------------------------------------------------------- Fin comites
 			
 			//comite de contraloria social
 			
 			if(comiContra==1){
 			
 			tcontraloriaComite = {
					
					
					res1 : registry.byId('pregunta1cona').checked ? 1:2,
					res2 : registry.byId('pregunta2cona').checked ? 1:2,
					res3 : registry.byId('pregunta3cona').checked ? 1:2,
					res4 : registry.byId('pregunta4cona').get('value'),
					res5 : registry.byId('pregunta5cona').get('value'),
					res6 : registry.byId('pregunta6cona').get('value'),
					res7 : registry.byId('pregunta7cona').get('value'),
					res8 : registry.byId('pregunta8cona').get('value'),
					res9 : registry.byId('pregunta9cona').get('value'),
					res10 : registry.byId('pregunta10cona').get('value'),
			        res11 : registry.byId('pregunta11cona').get('value'),
					res12 : registry.byId('pregunta12cona').get('value'),
					res13 : registry.byId('pregunta13cona').get('value'),
					res14 : registry.byId('pregunta14cona').get('value'),
					res15 : registry.byId('pregunta15cona').get('value'),
					res16 : registry.byId('pregunta16cona').get('value'),
					res17 : registry.byId('pregunta17cona').get('value'),
					res18 : registry.byId('pregunta18cona').checked ? 1:2,
					res19 : registry.byId('pregunta19cona').get('value'),
					res20 : registry.byId('pregunta20cona').get('value'),
					res21 : registry.byId('pregunta21cona').get('value'),
					res22 : registry.byId('pregunta22cona').checked ? 1:2,
					res23 : registry.byId('pregunta23cona').get('value'),
					res24 : registry.byId('pregunta24cona').checked ? 1:2,
					res25 : registry.byId('pregunta25cona').get('value'),
					res26 : registry.byId('pregunta26cona').checked ? 1:2,
					res27 : registry.byId('pregunta27cona').get('value') 
			};
 			//fin comite contraloria social

 			//programas de comites
 			if(tcontraloriaComite.res4==null || tcontraloriaComite.res4==''){
 				utils.cstmAlert("Debe contestar el cuestionario de la pesta\u00F1a Contralor\u00EDa Social");
 				return false;
 			}
 			
 			
 			if((tcontraloriaComite.res1==2 || tcontraloriaComite.res2==2 || tcontraloriaComite.res1==3) && (tcontraloriaComite.res5==null || tcontraloriaComite.res5=='')){
 				utils.cstmAlert("Debe registrar la respuesta de 'En caso de que alguna respuesta sea negativa, explique \u00BF por qu\u00E9?'");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res6==null || tcontraloriaComite.res6==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso A)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res7==null || tcontraloriaComite.res7==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso B)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res8==null || tcontraloriaComite.res8==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso C)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res9==null || tcontraloriaComite.res9==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso D)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res10==null || tcontraloriaComite.res10==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso E)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res11==null || tcontraloriaComite.res11==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso F)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res12==null || tcontraloriaComite.res12==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso G)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res13==null || tcontraloriaComite.res13==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso H)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res14==null || tcontraloriaComite.res14==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso I)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res15==null || tcontraloriaComite.res15==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso J)");
 				return false;
 			}
 			
 			if(tcontraloriaComite.res16==null || tcontraloriaComite.res16==''){
 				utils.cstmAlert("Debe seleciconar una respuesta para el inciso K)");
 				return false;
 			}
 			
 			
 			var gridProgramaComite = registry.byId('contraGrid');
 			
 			var rowsProgramaComite = new Array();
 			var conPro=0;
				for ( var i = 0; i < gridProgramaComite.rowCount; i++) {
 				
 				var itemNor = gridProgramaComite.getItem(i);
 				
 				var rProgramaComite = {		
 						cProgramaComite: gridProgramaComite.store.getValue(itemNor,'id'),									 		
 						opcion: gridProgramaComite.store.getValue(itemNor,'col2')==true?1:2 
	 						};
						
 				if(rProgramaComite.opcion==2)
 					{
 					conPro++;
 					}
 				rowsProgramaComite.push(rProgramaComite);
 				
 			}

//				if((tcontraloriaComite.res6==1 || tcontraloriaComite.res7==1 || tcontraloriaComite.res8==1 || tcontraloriaComite.res9==1 || tcontraloriaComite.res10==1 || tcontraloriaComite.res11==1 || tcontraloriaComite.res12==1 || tcontraloriaComite.res13==1 || tcontraloriaComite.res14==1 || tcontraloriaComite.res15==1 || tcontraloriaComite.res16==1) && conPro==5){
//	 				utils.cstmAlert("Debe seleccionar al menos un programa");
//	 				return false;
//	 			}
				
				if(tcontraloriaComite.res18==2  && (tcontraloriaComite.res19==null || tcontraloriaComite.res19=='')){
	 				utils.cstmAlert("Debe registrar el \u00BF por qu\u00E9? de 'Los apoyos recibidos beneficiaron de manera igualitaria a hombres y mujeres'");
	 				return false;
	 			}
				
				if(tcontraloriaComite.res23==null || tcontraloriaComite.res23==''){
	 				utils.cstmAlert("Debe registrar el \u00BF por qu\u00E9? de su respuesta en la pregunta 6.-");
	 				return false;
	 			}
				
				if(tcontraloriaComite.res25==null || tcontraloriaComite.res25==''){
					utils.cstmAlert("Debe registrar el \u00BF por qu\u00E9? de su respuesta en la pregunta 7.-");
	 				return false;
	 			}
				
				if(tcontraloriaComite.res27==null || tcontraloriaComite.res27==''){
					utils.cstmAlert("Debe registrar el \u00BF por qu\u00E9? de su respuesta en la pregunta 8.-");
	 				return false;
	 			}
 			//fin programas de comites
 			
 			//actividades de comites

	 			var gridActividadComite = registry.byId('contraGrid2');

 			
 			var rowsActividadComite = new Array();
 			var actComite=0;
				for ( var i = 0; i < gridActividadComite.rowCount; i++) {
 				
 				var itemNor2 = gridActividadComite.getItem(i);
 				
 				var rActividadComite = {		
 						cActividadComite: gridActividadComite.store.getValue(itemNor2,'id'),									 		
 						opcion: gridActividadComite.store.getValue(itemNor2,'col2')==true?1:2 
	 						};
 				if(rActividadComite.opcion==1)
					{
 					actComite++;
					}			
 				rowsActividadComite.push(rActividadComite);
 				
 			}
				if(actComite==0 && (tcontraloriaComite.res20==null || tcontraloriaComite.res20=='')){
					if( tcontraloriaComite.res21==null || tcontraloriaComite.res21==''){
						
							utils.cstmAlert("Debe responder a la pregunta: En caso de no haber marcado alguna actividad, especifique \u00BF por qu\u00E9?");
		 					return false;	
						
					}
	 				
	 			}

		 	}
 			
 			//fin de actividades de comites
		 	}
		 	if(array.indexOf(actividadesArray,47)!=-1){
 			//----------------------------------------------------------------- Lee informacion de eventos		
 			
 			var gridEvento = registry.byId('evGrid');
 			
 			if(gridEvento.rowCount < 1 ){
 				utils.cstmAlert("Debe registrar por lo menos un Evento");
 				return false;
 			}
 			
 			
 			for ( var i = 0; i < gridEvento.rowCount; i++) {

 				var item = gridEvento.getItem(i);														
 			
 				var evento = {
 						cEvento: gridEvento.store.getValue(item,'cEvento'),     	                    			
 						cumplioEvento: gridEvento.store.getValue(item,'cumplioEvento'),					
 						fuenteRecursos: gridEvento.store.getValue(item,'fuenteRecursos'),     	                    			
 						nomOtroEvento: gridEvento.store.getValue(item,'nomOtroEvento'),
 						nomOtroFr: gridEvento.store.getValue(item,'nomOtroFr'),
 						montoR: gridEvento.store.getValue(item,'montoR'),
 						montoStrR: gridEvento.store.getValue(item,'montoStrR'),
 						montoG: gridEvento.store.getValue(item,'montoG'),
 						montoStrG: gridEvento.store.getValue(item,'montoStrG')
 					};
 				
 				if(evento.cumplioEvento==0 || evento.cumplioEvento==null)
 				{
 					utils.cstmAlert('Favor de selecionar una respuesta para el cumplimiento del evento');
 					return false;
 				}
 				
 				if(evento.montoR == null || evento.montoR== ''){
 					utils.cstmAlert('Favor de registrar un monto Recabado en el apartado de Eventos');
 					return false;
 				}
 				
 				if(evento.montoG== null || evento.montoG == ''){
 					utils.cstmAlert('Favor de registrar un monto Gastado en el apartado de Eventos');
 					return false;
 				}	
 							
 				teventos.push(evento);
 			}
 		
 		//----------------------------------------------------------------- Fin eventos
		 	}
		 	if(array.indexOf(actividadesArray,48)!=-1){

 			//----------------------------------------------------------------- Lee informacion de estimulos		
 			
			var gridEstimulo = registry.byId('eGrid');
		
			if(gridEstimulo.rowCount < 1 ){
				utils.cstmAlert("Debe registrar por lo menos un Estimulo");
				return false;
			}
			
			for ( var i = 0; i < gridEstimulo.rowCount; i++) {

				var item = gridEstimulo.getItem(i);														

			    
				var estimulo = {
						idConsecutivo: gridEstimulo.store.getValue(item,'idConsecutivo'),     	                    			
						estimulo: gridEstimulo.store.getValue(item,'estimulo'),
						candidato: gridEstimulo.store.getValue(item,'candidato'),                   					 								
						nomCandidato: gridEstimulo.store.getValue(item,'nomCandidato'),
						motivos: gridEstimulo.store.getValue(item,'motivos'),
						fecha: gridEstimulo.store.getValue(item,'fecha'),
						cEstimulo: gridEstimulo.store.getValue(item,'cEstimulo'),
                        nomOtroEstimulo: gridEstimulo.store.getValue(item,'nomOtroEstimulo'),
						llevoAcabo: gridEstimulo.store.getValue(item,'llevoAcabo')
				};
				
				if(estimulo.llevoAcabo==null ||estimulo.llevoAcabo==0){
					utils.cstmAlert("Debe registrar si se realizo el Estimulo");
					return false;	
				}
				if(estimulo.fecha==null ||estimulo.fecha==''){
					utils.cstmAlert("Debe registrar una fecha para el Estimulo");
					return false;	
				}
				if(estimulo.motivos==null ||estimulo.motivos==''){
					utils.cstmAlert("Debe registrar los motivos del Estimulo");
					return false;	
				}
				if(estimulo.nomCandidato==null ||estimulo.nomCandidato==''){
					utils.cstmAlert("Debe registrar el nombre del candidato en el apartado de Estimulos");
					return false;	
				}
							
				testimulos.push(estimulo);
			}
		
		//----------------------------------------------------------------- Fin estimulos
		 	}
		 	if(array.indexOf(actividadesArray,50)!=-1){
        
		//----------------------------------- Lee informacion de Preguntas estatal
			
			
			tconsejosEstatal1 = {
						
						respuesta1 : registry.byId('pregunta1ae').checked ? 1:registry.byId('pregunta1be').checked ? 2:3,
						respuesta2 : registry.byId('pregunta2ae').checked ? 1:2,
						respuesta3 : registry.byId('pregunta3ae').checked ? 1:2
						
				};
			
			if(tconsejosEstatal1.respuesta1==2 || tconsejosEstatal1.respuesta1==3)
			{
				tconsejosEstatal ={
				
				respuesta1:tconsejosEstatal1.respuesta1
				}
			}
			else{
				tconsejosEstatal ={
						
						respuesta1:tconsejosEstatal1.respuesta1,
						respuesta2:tconsejosEstatal1.respuesta2,
						respuesta3:tconsejosEstatal1.respuesta3
						}
			}
			  
		//----------------------------------- Fin Preguntas estatal

        //----------------------------------- Lee informacion de Preguntas Municipal y estimulos municipales
			
							
			tconsejosMunicipal1 = {
						
						respuesta1 : registry.byId('pregunta1am').checked ? 1:registry.byId('pregunta1bm').checked ? 2:3,
						respuesta2 : registry.byId('pregunta2am').checked ? 1:2,
						respuesta3 : registry.byId('pregunta3am').checked ? 1:2,
						respuesta4 : registry.byId('pregunta4am').checked ? 1:2,
						respuesta5 : registry.byId('pregunta5am').checked ? 1:2
						
				};
			
			
			if(tconsejosMunicipal1.respuesta1==2 || tconsejosMunicipal1.respuesta1==3)
			{
				tconsejosMunicipal ={
				
				respuesta1:tconsejosMunicipal1.respuesta1
				}
			}
			else{
				tconsejosMunicipal ={
						
						respuesta1:tconsejosMunicipal1.respuesta1,
						respuesta2:tconsejosMunicipal1.respuesta2,
						respuesta3:tconsejosMunicipal1.respuesta3,
						respuesta4:tconsejosMunicipal1.respuesta4,
						respuesta5:tconsejosMunicipal1.respuesta5
						}
			}
			
			
			if(tconsejosMunicipal.respuesta1==1 )
			{
			var gridEstimuloMunicipal = registry.byId('emGrid');
			
//			if(gridEstimuloMunicipal.rowCount < 1 ){
//				utils.cstmAlert("Debe registrar por lo menos un Estimulo Municipal");
//				return false;
//			}
			
			for ( var i = 0; i < gridEstimuloMunicipal.rowCount; i++) {

				var item = gridEstimuloMunicipal.getItem(i);														
			    
				var estimuloMunicipal = {
						idConsecutivoMunicipal: gridEstimuloMunicipal.store.getValue(item,'idConsecutivoMunicipal'),     	                    			
						estimuloMunicipal: gridEstimuloMunicipal.store.getValue(item,'estimuloMunicipal'),
						candidatoMunicipal: gridEstimuloMunicipal.store.getValue(item,'candidatoMunicipal'),                   					 								
						nomCandidatoMunicipal: gridEstimuloMunicipal.store.getValue(item,'nomCandidatoMunicipal'),
						motivosMunicipal: gridEstimuloMunicipal.store.getValue(item,'motivosMunicipal'),
						fechaMunicipal: gridEstimuloMunicipal.store.getValue(item,'fechaMunicipal')
				};
							
				testimulosMunicipal.push(estimuloMunicipal);
			}
			
			}
			  
		//----------------------------------- Fin Preguntas Municipal y estimulos municipales
		 	}
		 	if(array.indexOf(actividadesArray,49)!=-1){
			
 			//----------------------------------------------------------------- Lee informacion de Actividades		
 			

	 			
	 			var gridActividad = registry.byId('10Grid');
	 			
	 			for ( var i = 0; i < gridActividad.rowCount; i++) {

	 				var item = gridActividad.getItem(i);														
	 				
	 					detalle = [];
	 				
	 				if( gridActividad.store.getValue(item,'idCategoria') >=11  ){
	 					detalle = [{		 					
	 						idObjetivo: gridActividad.store.getValue(item,'idActividad'),
		 					objetivo: gridActividad.store.getValue(item,'objetivo'),
		 					cSesion: gridActividad.store.getValue(item,'cSesion'),
		 					meta: gridActividad.store.getValue(item,'meta'),
		 					monto1: gridActividad.store.getValue(item,'monto1'),
		 					montoStr1: gridActividad.store.getValue(item,'montoStr1'),
		 					monto2: gridActividad.store.getValue(item,'monto2'),
		 					montoStr2: gridActividad.store.getValue(item,'montoStr2'),
		 					cumplio:gridActividad.store.getValue(item,'cumplio'),
		 					fuente:gridActividad.store.getValue(item,'fuente')
		 					
		 				}];
	 				} else {
	 					detalle = item.nomActividad;
	 				}
	 		
	 				
	 				var actividad = {
	 						ceActividad: gridActividad.store.getValue(item,'idCategoria'),
	 						cSesion: gridActividad.store.getValue(item,'cSesion'),
	 						actividad: gridActividad.store.getValue(item,'nomCategoria'),
	 						actividades: detalle  ,
	 						//objetivo: gridActividad.store.getValue(item,'strActividad'),
	 						nomOtraCategoria:gridActividad.store.getValue(item,'nomOtraCategoria'),
	 						monto1:gridActividad.store.getValue(item,'monto1'),
	 						montoStr1:gridActividad.store.getValue(item,'montoStr1'),
	 						monto2:gridActividad.store.getValue(item,'monto2'),
	 						montoStr2:gridActividad.store.getValue(item,'montoStr2')
	 				};
	 				if(actividad.actividades[0].monto1==null || actividad.actividades[0].monto1==''){
						
						utils.cstmAlert("Debe registrar el monto recabado en la categoria");
						return false;	
					}
	 				if(actividad.actividades[0].monto2==null || actividad.actividades[0].monto2==''){
						
						utils.cstmAlert("Debe registrar el  monto gastado en la categoria");
						return false;	
					}
	 				
	 				if(actividad.actividades[0].cumplio==0 ){
						
						utils.cstmAlert("Debe registrar la respuesta de cumplimiento de la categoria");
						return false;	
					}
	 							
	 				tactividades.push(actividad);
	 			}
 			
 			//----------------------------------------------------------------- Fin Actividades
		 	}
		 	if(array.indexOf(actividadesArray,52)!=-1){
	    //----------------------------------------------------------------- Lee informacion de Recursos de la Asociacion Padres de Familia
	 			
	 			
	 			
	 			tpreguntaAsociacion = {
						
						
						respuesta1 : registry.byId('pregunta1ar').checked ? 1:2
						
				};
	 	
	 				var numeroDeVacias=0;
					var gridRecursosPadres = registry.byId('r2Grid');
					
					if(gridRecursosPadres.rowCount < 1 ){
						utils.cstmAlert("Debe registrar los Recursos obtenidos por la Asociaci\u00f3n de Padres de Familia");
						return false;
					}
					
					for ( var i = 0; i < gridRecursosPadres.rowCount; i++) {
					
						var item = gridRecursosPadres.getItem(i);														
					    
						var recursoPadres = {
								idConsecutivor: gridRecursosPadres.store.getValue(item,'idConsecutivor'),     	                    			
								montoR1: gridRecursosPadres.store.getValue(item,'montoR1'),
								montoStrR1: gridRecursosPadres.store.getValue(item,'montoStrR1'),                   					 								
								montoG1: gridRecursosPadres.store.getValue(item,'montoG1'),
								montoStrG1: gridRecursosPadres.store.getValue(item,'montoStrG1'),
								montoG2: gridRecursosPadres.store.getValue(item,'montoG2'),
								montoStrG2: gridRecursosPadres.store.getValue(item,'montoStrG2'),
								montoG3: gridRecursosPadres.store.getValue(item,'montoG3'),
								montoStrG3: gridRecursosPadres.store.getValue(item,'montoStrG3'),
								otro: gridRecursosPadres.store.getValue(item,'otro'),
								montoG4: gridRecursosPadres.store.getValue(item,'montoG4'),
								montoStrG4: gridRecursosPadres.store.getValue(item,'montoStrG4'),
								otro2: gridRecursosPadres.store.getValue(item,'otro2'),
								montoG5: gridRecursosPadres.store.getValue(item,'montoG5'),
								montoStrG5: gridRecursosPadres.store.getValue(item,'montoStrG5'),
								otro3: gridRecursosPadres.store.getValue(item,'otro3'),
								
						};
				
						if(recursoPadres.montoG1==null ||recursoPadres.montoG1==''){
							numeroDeVacias=numeroDeVacias +1;
						}
						if(recursoPadres.montoG2==null ||recursoPadres.montoG2==''){
							numeroDeVacias=numeroDeVacias +1;	
						}
						if(recursoPadres.montoG3==null ||recursoPadres.montoG3==''){
							numeroDeVacias=numeroDeVacias +1;
						}
						if(recursoPadres.montoG4==null ||recursoPadres.montoG4==''){
							numeroDeVacias=numeroDeVacias +1;
						}
						if(recursoPadres.montoG5==null ||recursoPadres.montoG5==''){
							numeroDeVacias=numeroDeVacias +1;
						}
						if(numeroDeVacias==5){
							
							utils.cstmAlert("Debe registrar al menos un monto Gastado en los recursos de la Asociaci\u00f3n de Padres de Familia");
							return false;	
						}
						
						trecursosAsociacion.push(recursoPadres);
					}


	   //----------------------------------------------------------------- Fin Recursos de la Asociacion Padres de Familia	 	
		 	}
		 	if(array.indexOf(actividadesArray,53)!=-1){
 		//----------------------------------------------------------------- Lee informacion de Asuntos

			
			
			
 			var gridAsunto = registry.byId('9Grid');
 			
 			if(gridAsunto.rowCount < 1 ){
				utils.cstmAlert("Debe registrar por lo menos un Asunto General");
				return false;
			}
 			
 			for ( var i = 0; i < gridAsunto.rowCount; i++) {

 				var item = gridAsunto.getItem(i);														
 							
 				var asunto = {
 						cscAsunto: gridAsunto.store.getValue(item,'cPrograma'),     	                    			
 						asunto: gridAsunto.store.getValue(item,'asunto'),
 						acuerdo: gridAsunto.store.getValue(item,'acuerdo')                   					 								
 				};
 							
 				tasunto.push(asunto);
 			}
			
			
		 	}
 			//----------------------------------------------------------------- Fin Asuntos

		// Se integra la segunda asamblea		
 			var segundaAsamblea = {
 					ceInfGral : ceInfGral,
 					ceSesion : ceSesion,
 					actividades : actividades,
 					detalleSeguimiento : tfederalSeguimiento,			
 					federalActual : tfederalActual,
 					estatalActual : testatalActual,
 					municipalActual : tmunicipalActual,
 					oscActual : toscActual,
 					acciones : tacciones,
 					programaRecursos : tprogramaRecursos,
 					normalidad : tnormalidad,
 					evaluacion : tevaluacion,
					compromiso : tcompromiso,
					comiteSeguimiento:tcomites,
 					eventos:teventos,
 				 	estimulos:testimulos,
 				 	preguntasEstatal:tconsejosEstatal,
 				 	preguntasMunicipal:tconsejosMunicipal,
 				 	estimulosMunicipal:testimulosMunicipal,
 				 	contraloriaComite:tcontraloriaComite,
 				 	programaComite: rowsProgramaComite,
	 				actividadComite: rowsActividadComite,
 				 	categorias:tactividades,
 				 	preguntaRecursosPadres:tpreguntaAsociacion,
 				 	recursosPadres:trecursosAsociacion,
 					asunto:tasunto,
 					preguntas2 : tpreguntas
 				};
		
		var urlJson = dojo.config.app.urlBase + 'segundaAsamblea/saveSegundaAsamblea1415';		 			                         
		console.log(json.toJson(segundaAsamblea));                                                     
		xhr.post({  url : urlJson,
					postData : json.toJson(segundaAsamblea),
					headers : {
						"Content-Type" : "application/json; charset=UTF-8"
					},
					handleAs : 'json',
					handle : function(response) {
						if (response == 'SyntaxError: syntax error') {
		    	            window.location.reload();
						}else if (response != 1) {
							jsUtils.cstmAlert('Ocurri\u00F3 un error al actualizar los datos.');
							standby.hide();
						} else {
							jsUtils.cstmAlert('La actualizaci\u00F3n se realiz\u00F3 correctamente.');
							reuniones.refresh(cct);
							standby.hide();
						}

						registry.byId('dialogCaptiraDG').destroyRecursive(false);
					}
		}).progress(standby.show());					

		
		console.log("Guardando segunda asamblea... Final");
	}

		function objetivosFun() {
 			if(listObjetivosG.length==0){			 						 		
 				listObjetivosG= new Array();
 				listObjetivosG.push({name:"Fortalecer y desarrollar el sistema b\u00e1sico de mejora en las escuelas participantes.",id:1, idProg:1 });
 				listObjetivosG.push({name:"Desarrollar la propuesta pedag\u00f3gica de tiempo completo que permita usar de manera efectiva el tiempo para mejorar los aprendizajes del alumnado y disminuir los \u00edndices de reprobaci\u00f3n, deserci\u00f3n y rezago educativo en las escuelas participantes.",id:2, idProg:1});
 				listObjetivosG.push({name:"Fortalecer la autonom\u00eda de gesti\u00f3n de las escuelas, por medio de la participaci\u00f3n social y de la comunidad escolar; el desarrollo de los CTE y CTZ, incluyendo el de escuelas multigrado; el dise\u00f1o, la puesta en marcha y la evaluaci\u00f3n de rutas de mejora escolar, as\u00ed como la mejora de las pr\u00e1cticas docentes.",id:3, idProg:1});
 				listObjetivosG.push({name:"Fomentar ambientes escolares propicios para el aprendizaje que impliquen la mejora de la convivencia escolar en un contexto de equidad e inclusi\u00f3n educativas.",id:4, idProg:1});
 				listObjetivosG.push({name:"Fortalecer y desarrollar el sistema b\u00e1sico para la mejora educativa en las escuelas participantes. ",id:5, idProg:2});
 				listObjetivosG.push({name:"Desarrollar, en corresponsabilidad con la autoridad educativa local, ambientes escolares seguros que impliquen la mejora de la convivencia escolar en un contexto de equidad, inclusi\u00f3n e igualdad de g\u00e9nero. ",id:6, idProg:2});
 				listObjetivosG.push({name:"Impulsar el desarrollo, aplicaci\u00f3n y seguimiento de marcos locales de convivencia escolar que permitan fortalecer la convivencia y la seguridad en las escuelas de educaci\u00f3n b\u00e1sica. ",id:7, idProg:2});
 				listObjetivosG.push({name:"Contribuir al desarrollo de competencias de las autoridades educativas locales, autoridades escolares, docentes y otros miembros de la comunidad escolar, en materia de gesti\u00f3n de ambientes de convivencia que propicien el aprendizaje.",id:8, idProg:2});
 				listObjetivosG.push({name:"Fortalecer y desarrollar el Sistema B\u00e1sico de Mejora Educativa en las Escuelas participantes. ",id:9, idProg:3});
 				listObjetivosG.push({name:"Fortalecer la Estrategia Local para el Desarrollo de la Educaci\u00f3n B\u00e1sica: plan de acci\u00f3n formulado por el Comit\u00e9 T\u00e9cnico Local de Educaci\u00f3n B\u00e1sica con el fin de fortalecer la planeaci\u00f3n local integrada y evaluar los avances en las metas establecidas en calidad y equidad. En esta estrategia se incluir\u00e1 la Propuesta Local para el desarrollo del Programa. ",id:10, idProg:3});
 				listObjetivosG.push({name:"Impulsar el desarrollo de las capacidades de gesti\u00f3n pedag\u00f3gica, escolar e institucional centrada en los aprendizajes del alumnado, con el acompa\u00f1amiento cercano del SATE y/o la supervisi\u00f3n, bajo el liderazgo directivo, con la participaci\u00f3n del alumnado, personal docente y madres y padres de familia, o tutores.",id:11, idProg:3});
 				listObjetivosG.push({name:"Contribuir al desarrollo de competencias en gesti\u00f3n educativa de los integrantes de los Consejos T\u00e9cnicos Escolares y de Zona que fortalezcan el trabajo colectivo y la toma de decisiones eficaces y responsables en la escuela en el contexto de sus necesidades",id:12, idProg:3});
 				listObjetivosG.push({name:"Fomentar la corresponsabilidad social y fortalecer las capacidades de las madres y padres de familia, o tutores, enfocada en el aprendizaje del estudiantado, la transparencia y rendici\u00f3n de cuentas. ",id:13, idProg:3});
 				listObjetivosG.push({name:"Dise\u00f1ar mecanismos que permitan a la escuela gestionar, obtener y ejercer recursos de manera m\u00e1s eficiente y con menor carga administrativa.",id:14, idProg:3});
 				listObjetivosG.push({name:"Poner a disposici\u00f3n de las escuelas, materiales educativos complementarios, para el desarrollo de estrategias did\u00e1cticas que favorezcan la lectura, la escritura y las matem\u00e1ticas.",id:15, idProg:4});
 				listObjetivosG.push({name:"Apoyar a las AEL y a las escuelas en el desarrollo curricular.",id:16, idProg:4});
 				listObjetivosG.push({name:"Apoyar a las AEL para que puedan instrumentar procesos de estudio de una segunda lengua (ingl\u00e9s) en las escuelas p\u00fablicas de educaci\u00f3n b\u00e1sica, en los t\u00e9rminos que establece el Plan de Estudios 2011 para la educaci\u00f3n b\u00e1sica",id:17, idProg:4});
 				listObjetivosG.push({name:"Impulsar un esquema de financiamiento para que las AEL desarrollen un Proyecto Local para la calidad educativa que tenga como fin fortalecer la calidad del aprendizaje en las escuelas, con \u00e9nfasis en la mejora del logro educativo de la lectura, la escritura y las matem\u00e1ticas.",id:18, idProg:4});
 				listObjetivosG.push({name:"Seguridad estructural y condiciones generales de funcionamiento.- Se analizar\u00e1n y atender\u00e1n las  condiciones y caracter\u00edsticas que deben cumplir las construcciones a fin de garantizar la seguridad f\u00edsica de los usuarios, as\u00ed como las condiciones generales de funcionamiento de los diferentes elementos que integran la construcci\u00f3n de los edificios que conforman la infraestructura f\u00edsica, incluidos como parte de este componente los bebederos de agua potable.",id:19, idProg:5});
 				listObjetivosG.push({name:"Servicios sanitarios.- Se procurar\u00e1 la suficiencia y el correcto funcionamiento de los Locales destinados a satisfacer las necesidades fisiol\u00f3gicas y de higiene de los estudiantes, personal docente y administrativo, as\u00ed como sus muebles, instalaciones y redes hidr\u00e1ulicas, sanitarias y el\u00e9ctricas.",id:20, idProg:5});
 				listObjetivosG.push({name:"Mobiliario y equipo.- Se procurar\u00e1 la dotaci\u00f3n de mobiliario y equipo b\u00e1sico para el desarrollo de las actividades de los planteles educativos seg\u00fan su destino, en funci\u00f3n de los objetivos que dicten los planes y programas de estudio.",id:21, idProg:5});
 				listObjetivosG.push({name:"\u00c1reas de servicios administrativos.- Se atender\u00e1 el Desarrollo de los espacios destinados a los servidores p\u00fablicos que tienen la funci\u00f3n administrativa y directiva de los planteles educativos.",id:22, idProg:5});
 				listObjetivosG.push({name:"Accesibilidad.- Se dotar\u00e1 de las condiciones pertinentes para asegurar el libre acceso a personas con discapacidad a las instalaciones de los planteles educativos.",id:23, idProg:5});
 				listObjetivosG.push({name:"Infraestructura para la conectividad.- Se proveer\u00e1 de las Adaptaciones e instalaciones necesarias en los planteles educativos para poder recibir el servicio de Internet.",id:24, idProg:5});
 				listObjetivosG.push({name:"Espacios de Usos M\u00faltiples.- Se promover\u00e1 el Desarrollo de la infraestructura para la realizaci\u00f3n de actividades al aire libre, as\u00ed como para la protecci\u00f3n perimetral de los planteles educativos.",id:25, idProg:5});
 				listObjetivosG.push({name:"Mejorar las condiciones de infraestructura y equipamiento de las escuelas p\u00fablicas de educaci\u00f3n b\u00e1sica, con base en las carencias detectadas en el Censo de Escuelas, Maestros y Alumnos de Educaci\u00f3n B\u00e1sica. ",id:26, idProg:6});
 				listObjetivosG.push({name:"Fortalecer la autonom\u00eda de gesti\u00f3n de las escuelas p\u00fablicas de educaci\u00f3n b\u00e1sica implementando acciones para el desarrollo de capacidades de la comunidad escolar y la adquisici\u00f3n de materiales educativos.",id:27, idProg:6});
 				listObjetivosG.push({name:"Implementar estrategias orientadas a inhibir los factores escolares asociados a la producci\u00f3n de rezago educativo en las escuelas p\u00fablicas de educaci\u00f3n b\u00e1sica.",id:28, idProg:6});
 				listObjetivosG.push({name:"Apoyar las funciones de la supervisi\u00f3n escolar con recursos y herramientas que favorezcan los procesos de asistencia t\u00e9cnica y acompa\u00f1amiento a las escuelas p\u00fablicas de educaci\u00f3n b\u00e1sica para la mejora del servicio educativo.",id:29, idProg:6});
 				listObjetivosG.push({name:"Utilizar Bibliotecas Escolares y de Aula en las escuelas de educaci\u00f3n b\u00e1sica p\u00fablica, a trav\u00e9s de la formaci\u00f3n de figuras educativas en tem\u00e1ticas de fomento a la lectura, selecci\u00f3n de acervos y difusi\u00f3n de las acciones del Programa Nacional de Lectura. ",id:30, idProg:7});
 				listObjetivosG.push({name:"Fortalecer las capacidades de las escuelas y servicios educativos que atienden a la ni\u00f1ez ind\u00edgena.",id:31, idProg:8});
 				listObjetivosG.push({name:"Fortalecer las capacidades de las escuelas y servicios educativos que atienden a la ni\u00f1ez migrante.",id:32, idProg:8});
 				listObjetivosG.push({name:"Fortalecer las capacidades de las escuelas unitarias y multigrado.",id:33, idProg:8});
 				listObjetivosG.push({name:"Fortalecer las capacidades de las escuelas y de los servicios educativos que brindan atenci\u00f3n al alumnado con necesidades educativas especiales, priorizando a los alumnos/as con discapacidad y con aptitudes sobresalientes.",id:34, idProg:8});
 				listObjetivosG.push({name:"Fortalecer las capacidades de las escuelas y servicios educativos de telesecundaria.",id:35, idProg:8});
 				listObjetivosG.push({name:"Impulsar un esquema de financiamiento para que las AEL desarrollen un Proyecto Local de inclusi\u00f3n y equidad educativa que tenga como fin fortalecer a las escuelas p\u00fablicas de educaci\u00f3n b\u00e1sica y servicios educativos, con \u00e9nfasis en la retenci\u00f3n, reinserci\u00f3n y el egreso oportuno.",id:36, idProg:8});
 				listObjetivosG.push({name:"Otorgar becas a ni\u00f1as y j\u00f3venes en contexto y situaci\u00f3n de vulnerabilidad agravada por el embarazo y la maternidad.",id:37, idProg:9});
 				listObjetivosG.push({name:"Promover y consolidar la oferta de opciones para el desarrollo profesional docente que considere las prioridades educativas nacionales, las necesidades de las escuelas p\u00fablicas de educaci\u00f3n b\u00e1sica y de los maestros para fortalecer paulatinamente el logro educativo del alumnado.",id:38, idProg:10});
 				listObjetivosG.push({name:"Mejorar la direcci\u00f3n y supervisi\u00f3n escolar, reforzando su capacidad para apoyar, retroalimentar y evaluar el trabajo pedag\u00f3gico de los docentes, a trav\u00e9s del fortalecimiento de sus capacidades de gesti\u00f3n y liderazgo.",id:39, idProg:10});
 				listObjetivosG.push({name:"Promover la formaci\u00f3n de personal calificado con funciones de asesor\u00eda t\u00e9cnica pedag\u00f3gica como parte del servicio de asistencia t\u00e9cnica a la escuela.",id:40, idProg:10});
 				listObjetivosG.push({name:"Crear e impulsar el servicio de asistencia t\u00e9cnica a la escuela como un mecanismo de apoyo, asesor\u00eda y acompa\u00f1amiento especializado al personal docente y personal con funciones de direcci\u00f3n para mejorar la pr\u00e1ctica profesional y el funcionamiento de la escuela p\u00fablica de educaci\u00f3n b\u00e1sica, en el marco del fortalecimiento de los Consejos T\u00e9cnicos Escolares y los Consejos T\u00e9cnicos de Zona, y como una estrategia de atenci\u00f3n al desarrollo profesional docente.",id:41, idProg:10});
 				listObjetivosG.push({name:"Impulsar la formaci\u00f3n de tutores que acompa\u00f1en al personal docente de nuevo ingreso durante el periodo de inducci\u00f3n para fortalecer sus capacidades, conocimientos y competencias.",id:42, idProg:10});
 				listObjetivosG.push({name:"Impulsar la convivencia escolar pac\u00edfica con perspectiva de g\u00e9nero en la educaci\u00f3n b\u00e1sica.",id:43, idProg:10});
 			}
		}
 			
   return {
	   init:init,
	   saveSegundaAsamblea:saveSegundaAsamblea
	   };
});


//for (var i in arreglo ){
//if(arreglo[i].cSesion=4){
// nuevoArreglo.push(arreglo[i]);
//}
//}
