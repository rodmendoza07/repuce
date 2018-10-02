define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/form/CheckedMultiSelect","app/util/jsUtils","dojo/_base/xhr","dojo/_base/json",
         "dijit/form/ValidationTextBox","dojo/on","dijit/form/RadioButton","dijit/form/Textarea",
         "dojo/dom", "dojox/grid/cells/dijit", "dojo/data/ItemFileWriteStore", "dijit/form/FilteringSelect",
         "dijit/form/CheckBox", "dojox/grid/EnhancedGrid", "dijit/form/Button", "app/util/constants",  "dijit/form/Form",
         "dojo/_base/xhr", "dojo/DeferredList", "dojox/widget/Standby","dojo/data/ItemFileWriteStore",
         "dojox/form/MultiComboBox","dojox/grid/DataGrid","app/ciclo2014-15/reuniones","dojo/_base/lang",
         "dijit/Dialog","dojo/store/Memory","dijit/form/RadioButton","dojox/grid/cells", "dojox/grid/_CheckBoxSelector",
         "dijit/form/HorizontalSlider", "dijit/form/HorizontalRuleLabels", "dojo/query"], 
function( ContentPane,registry,array,utils,CheckedMultiSelect,jsUtils,xhr,json,ValidationTextBox,
		on,RadioButton,Textarea,dom, gridCellsDijit, ItemFileWriteStore, FilteringSelect,
		CheckBox, EnhancedGrid, Button, constants, Form, xhr, DeferredList, Standby, ItemFileWriteStore,
		MultiComboBox,DataGrid,reuniones,lang,Dialog,Memory,RadioButton,gridCells, _CheckBoxSelector,
		HorizontalSlider,HorizontalRuleLabels, query){

	//var segundaSesionObj= new Object();
	var maxIndexEventos = 0;
	var maxIndexCompromiso = 0;
	var maxIndexEstimulos = 0;
	var maxIndexAsuntos = 0;
	var maxIntegrantesComites = 0;
	listTemasG = new Array();
	listCalidadPresidenteG = new Array();
	listAcuerdosComite = new Array();

		
	var listPestanias= new Array(	
			{title:"Programas Federales",	tpoPrograma:1,id:"progFedPane", funcion:"funFederal",idDB:31},
			{title:"Programas Estatales",	tpoPrograma:2,id:"progEstPane", funcion:"funEstatal",idDB:31},
			{title:"Programas Municipales",	tpoPrograma:3,id:"progLocPane", funcion:"funMunicipal",idDB:31},
			{title:"Programas OSC",			tpoPrograma:4,id:"proyOSCPane", funcion:"funOSC",idDB:31},
			{title:"Recursos",				tpoPrograma:5,id:"recursosPane", funcion:"showRecursos",idDB:32},
			{title:"Acciones",				tpoPrograma:6,id:"accionPane", funcion:"funAccion",idDB:33},
			{title:"Normalidad m\u00ednima",tpoPrograma:7,id:"normalidadPane", funcion:"funNormal",idDB:34},			
			{title:"Evaluaciones",			tpoPrograma:8,id:"evaluacionPane", funcion:"funEvaluacion",idDB:35},
			{title:"Compromisos",			tpoPrograma:9,id:"compromisoPane", funcion:"funCompromiso",idDB:36},
			{title:"Comit\u00E9s",			tpoPrograma:10,id:"comitePane", funcion:"funComite",idDB:37},
			{title:"Integrantes de los Comit\u00E9s",tpoPrograma:15,id:"integrantesPane", funcion:"detalleIntegrante",idDB:37},
			{title:"Eventos",				tpoPrograma:11,id:"eventoPane", funcion:"funEvento",idDB:38},
			{title:"Estimulos y reconocimientos",	tpoPrograma:12,id:"estimuloPane", funcion:"funEstimulo",idDB:39},
			{title:"Consejos Estatal y Municipal",	tpoPrograma:14,id:"preguntasPane", funcion:"funPreguntas",idDB:40},
			{title:"Asuntos y acuerdos",	tpoPrograma:13,id:"asuntoPane", funcion:"funAsunto",idDB:41}
			
		);
	
	function init(actividades,cCct,ReunionObj,infCctPar){
		segundaSesionObj=ReunionObj;
		gActividades=actividades;
		infCctNivel=infCctPar;
		
		
		 if(gActividades.length>0){
			  _pestanias(true);
			  
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
		
		tDetalle = segundaSesionObj.detalleSeguimiento?segundaSesionObj.detalleSeguimiento:[];
		
		despliegaFederales(array.indexOf(gActividades,31)!=-1);
		despliegaEstatales(array.indexOf(gActividades,31)!=-1);
		despliegaMunicipales(array.indexOf(gActividades,31)!=-1);
		despliegaOsc(array.indexOf(gActividades,31)!=-1);
		despliegaRecursos(array.indexOf(gActividades,32)!=-1);
		despliegaAcciones(array.indexOf(gActividades,33)!=-1);
		despliegaNormalidad(array.indexOf(gActividades,34)!=-1);
		despliegaCompromisos(array.indexOf(gActividades,36)!=-1);
		despliegaComites(array.indexOf(gActividades,37)!=-1);
		despliegaIntegrantesComites(array.indexOf(gActividades,37)!=-1);
		despliegaEvaluacion(array.indexOf(gActividades,35)!=-1);
		despliegaEstimulos(array.indexOf(gActividades,39)!=-1);
		despliegaEventos(array.indexOf(gActividades,38)!=-1);
		despliegaAsuntos(array.indexOf(gActividades,41)!=-1);
		despliegaPreguntas(array.indexOf(gActividades,40)!=-1);
		
		temasFun();
		calidadPresidenteFun();
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

    var rutaStore = new Array();
    xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listRuta/',
           sync: false, 
           preventCache:true,
           handleAs: "json",
           contentType: "application/x-www-form-urlencoded; charset=utf-8"
        } ).then(function(data){
           for ( var i in data) {
                 rutaStore.push({
                	   cRuta : data[i].cRuta,
                	 nomRuta : data[i].nomRuta
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

    
	function _pestanias(crea){			   
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
			
//			if(listPestanias[i].tpoPrograma<5){
//			  listaProg(listPestanias[i].tpoPrograma);   
//			}
	   }
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
	
function despliegaFederales(crea){
		
	if (crea){
		if(!registry.byId(id)){
			if(!registry.byId('1Grid')){
				layout = [[	  { name: 'cSesion', 					field: 'cSesion', 		width: '5px', hidden:true},
				           	  { name: 'cPrograma', 					field: 'cPrograma', 		width: '5px',	hidden:true},				                  	  
			    		      { name: 'Programa', 					field: 'idPrograma',  		width:'180px', hidden:true},
			    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', hidden:true},
			    		      { name: 'Metas y objetivos', 			field: 'objetivos', 		width: '110px', hidden:true},					    		      					    		      
			    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '110px', hidden:true},
			    		      { name: 'Metas Otros', 				field: 'meta', 				width: '110px', hidden:true},
			    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'180px'},					    		      					    		      
			    		      { name: 'Monto', 						field: 'monto', 			width: '70px'},
			    		      { name: 'Monto(Letra)', 				field: 'montoStr', 			width: '200px'},
			    		      { name: 'Monto', 						field: 'monto2Sesion', 			width: '70px', hidden:true},
			    		      { name: 'Monto(Letra)', 				field: 'montoStr2Sesion', 			width: '200px', hidden:true},
			    		      { name: 'Cambio Monto', 				field: 'cambioMonto', 			width: '50px', hidden:true},
			    		      { name: 'seguimiento', 				field: 'seguimiento', 		width: '160px', hidden:true},
			    		      { name: 'avance', 					field: 'avance', 			width: '160px', hidden:true}
			    		      
			    		]];
							
			tablaGrid1=	'<table border="0" align="left" width= "900px">'+
						'<tr>' +
							'<td width= "450px"><span class="sub" align="left">Seguimiento</span></td>'+
							'<td width= "450px"><span class="sub" align="left">Nuevos programas</span></td>'+
						'<tr>'+
						'	<td><input id="1Grid"/></td>'+
						'	<td><input id="1_1Grid"/></td>'+
						'</tr>'+
						'<tr>' +
							'<td>'+
								'<input id="e_1Grid"/>'+
							'</td>'+
							'<td>'+
								'<input id="a_1_1Grid"/>'+
								'<input id="e_1_1Grid"/>'+
								'<input id="d_1_1Grid"/>'+
								'<input id="s_1_1Grid"/>'+
							'</td>'+
						'</tr>'+
						'</table>';
			
			dom.byId('progFedPane').innerHTML=tablaGrid1;
			
			progFedSeg = segundaSesionObj.federalSeguimiento?segundaSesionObj.federalSeguimiento:[];
			progFedNuevo = segundaSesionObj.federalActual?segundaSesionObj.federalActual:[];
							
			var dataFedSeg = {
				      identifier: "idPrograma",
				      items: progFedSeg
		    };
			
			var dataFedAct = {
				      identifier: "idPrograma",
				      items: progFedNuevo
		    };
			
			new DataGrid({
		        id: '1Grid',
		        structure: layout,
		        rowSelector: '10px',
		        height: '300px',
				width: '450px'
	        }, '1Grid').startup();    	   		    	    			
	  					
			new DataGrid({
		        id: '1_1Grid',
		        structure: layout,
		        rowSelector: '10px',
		        height: '300px',
				width: '450px'
	        }, '1_1Grid').startup();
			    	
				
			//Store de federales para seguimiento
			storeFedSeg = new ItemFileWriteStore({data: dataFedSeg});				    
			registry.byId('1Grid').setStore(storeFedSeg);
			
			//Store de federales nuevos
			storeFedNuevo = new ItemFileWriteStore({data: dataFedAct});				    
			registry.byId('1_1Grid').setStore(storeFedNuevo);

			var fedNvoGrid = registry.byId('1_1Grid');
			var objetivosSel = [];
	        for ( var i = 0; i < fedNvoGrid.rowCount; i++) {
	               var item = fedNvoGrid.getItem(i);
	               
	               for(var j in tDetalle){
	            	   if(tDetalle[j].idPrograma<=7){
	                      if(tDetalle[j].idPrograma == item.idPrograma ){
	                             objetivos = {
	                                          idObjetivo : tDetalle[j].idObjetivo,                                                                                     
	                                          meta :                     tDetalle[j].meta
	                                   };
	                             objetivosSel.push(objetivos);
	                      }
	               }
	            	  
	               }
	               fedNvoGrid.store.setValue(item, 'objetivos', objetivosSel);
	        }
			
	    	for ( var i = 0; i < fedNvoGrid.rowCount; i++) {
				var item = fedNvoGrid.getItem(i);
				idPrograma= fedNvoGrid.store.getValue(item,'idPrograma');
				for(var j in tDetalle){
					if(tDetalle[j].idPrograma == idPrograma){
						if(tDetalle[j].idPrograma==81 || tDetalle[j].idPrograma==82){
							fedNvoGrid.store.setValue(item, 'meta', tDetalle[j].meta);
							fedNvoGrid.store.setValue(item, 'objetivo', tDetalle[j].objetivo);	
						break;
						}
					}
		         }
			}
	        
	        
			maxIndexFederal = dataFedAct.length;
			
	    	new Button({
				label : " Seguimiento a programas ",
				id:'e_1Grid',
				onClick : function() {	
					var index = registry.byId('1Grid').selection.selectedIndex;    											
					if(index!=-1){
						var item = registry.byId('1Grid').getItem(index);
						 var cPrograma = registry.byId('1Grid').store.getValue(item, 'idPrograma');                 	                  
	                    var seguimiento = registry.byId('1Grid').store.getValue(item, 'seguimiento');
	                    var avance = registry.byId('1Grid').store.getValue(item, 'avance');
	                    var monto2Sesion=registry.byId('1Grid').store.getValue(item, 'monto2Sesion');
	                    var montoStr2Sesion=registry.byId('1Grid').store.getValue(item, 'montoStr2Sesion');
	                    var cambioMonto=registry.byId('1Grid').store.getValue(item, 'cambioMonto');
	            		var monto= registry.byId('1Grid').store.getValue(item, 'monto');
            			var montoStr= registry.byId('1Grid').store.getValue(item, 'montoStr');
					}else{
		            	 utils.cstmAlert('Debe seleccionar solo un registro.');
		            	 return;
		            }
					 
	    		      
	    		      
	    		      	
					var itemToEdit={selectedItem:index,
								cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance,
		            			monto2Sesion:monto2Sesion,
                                montoStr2Sesion:montoStr2Sesion,
                                cambioMonto:cambioMonto,
                                monto:monto,
                                montoStr:montoStr
		            			};
				
					
					seguimientoFederal(itemToEdit,1);				
	            	
				}
			}, 'e_1Grid');
	    	    	
	    	new Button({
				label : " Agregar ",
				id:'a_1_1Grid',
				onClick : function() {					
					funFederal();
				}
			}, 'a_1_1Grid');
	    	
	    	new Button({
				label : " Editar ",
				id:'e_1_1Grid',
				onClick : function() {					
					var index = registry.byId('1_1Grid').selection.selectedIndex;    											
					if(index!=-1){
						var item = registry.byId('1_1Grid').getItem(index);
	                	var itemToEdit={selectedItem:index,
	                			cPrograma: registry.byId('1_1Grid').store.getValue(item, 'cPrograma'), 
	                			idPrograma: registry.byId('1_1Grid').store.getValue(item, 'idPrograma'), 
	                			nomPrograma: registry.byId('1_1Grid').store.getValue(item, 'nomPrograma'),
	                			nomOtroPrograma: registry.byId('1_1Grid').store.getValue(item,'nomOtroPrograma'),
	                			objetivosSel: item.objetivos,
	                			objetivo: registry.byId('1_1Grid').store.getValue(item, 'objetivo'),
	                			meta: registry.byId('1_1Grid').store.getValue(item, 'meta'),
	                			monto: registry.byId('1_1Grid').store.getValue(item, 'monto'),
	                			montoStr: registry.byId('1_1Grid').store.getValue(item, 'montoStr')
	                			};    	                    	
	                	funFederal(itemToEdit);
					}
				}
			}, 'e_1_1Grid');
	    	
	    	new Button({
				label : " Eliminar",
				id: 'd_1_1Grid',
				onClick : function() {
					eliminaRow(registry.byId('1_1Grid'));
				}
			}, 'd_1_1Grid');
	    	
	    	new Button({
				label : " Seguimiento a programas ",
				id:'s_1_1Grid',
				onClick : function() {	
					var index = registry.byId('1_1Grid').selection.selectedIndex;    											
					if(index!=-1){
						var item = registry.byId('1_1Grid').getItem(index);
						 var cPrograma = registry.byId('1_1Grid').store.getValue(item, 'idPrograma');                 	                  
	                    var seguimiento = registry.byId('1_1Grid').store.getValue(item, 'seguimiento');
	                    var avance = registry.byId('1_1Grid').store.getValue(item, 'avance');
					}else{
		            	 utils.cstmAlert('Debe seleccionar solo un registro.');
		            	 return;
		            }
					
					var itemToEdit={};
					if(cPrograma==81 || cPrograma==82){
						itemToEdit={selectedItem:index,
								cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			nomOtroPrograma: registry.byId('1_1Grid').store.getValue(item,'nomOtroPrograma'),
		            			objetivo:registry.byId('1_1Grid').store.getValue(item, 'objetivo'),
		            			meta:registry.byId('1_1Grid').store.getValue(item, 'meta'),
		            			avance: avance
		            			};
					}
					else{
						itemToEdit={selectedItem:index,
								cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance
		            			};
					}
				
					
					seguimientoFederal(itemToEdit,2);				
	            	
				}
			}, 's_1_1Grid');    	
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
				    		      { name: 'Programa', 					field: 'idPrograma',  		width:'180px',	hidden:true},
				    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', 	hidden:true},
				    		      { name: 'Metas y objetivos', 			field: 'objetivos', 		width: '160px', hidden:true},					    		      					    		      
				    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
				    		      { name: 'Metas Otros', 				field: 'meta', 				width: '160px', hidden:true},
				    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'180px'},					    		      					    		      
				    		      { name: 'Monto', 						field: 'monto', 			width: '70px'},
				    		      { name: 'Monto(Letra)', 				field: 'montoStr', 			width: '200px'},
				    		      { name: 'Monto',                      field: 'monto2Sesion',      width: '70px', hidden:true},
				    		      { name: 'Monto(Letra)', 	 		 	field: 'montoStr2Sesion',   width: '200px', hidden:true},
				    		      { name: 'Cambio Monto', 				field: 'cambioMonto', 	    width: '50px', hidden:true},
				    		      { name: 'seguimiento', 				field: 'seguimiento', 		width: '160px', hidden:true},
				    		      { name: 'avance', 					field: 'avance', 			width: '160px', hidden:true}
				    		]];
						
				tablaGrid1=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
								'<td width= "450px"><span class="sub" align="left">Seguimiento</span></td>'+
								'<td width= "450px"><span class="sub" align="left">Nuevos programas</span></td>'+
							'<tr>'+
							'	<td><input id="2Grid"/></td>'+
							'	<td><input id="2_1Grid"/></td>'+
							'</tr>'+
							'<tr>' +
								'<td>'+
									'<input id="e_2Grid"/>'+
								'</td>'+
								'<td>'+
									'<input id="a_2_1Grid"/>'+
									'<input id="e_2_1Grid"/>'+
									'<input id="d_2_1Grid"/>'+
									'<input id="s_2_1Grid"/>'+
								'</td>'+
							'</tr>'+
							'</table>';
				
				dom.byId('progEstPane').innerHTML=tablaGrid1;
				
				progEstSeg = segundaSesionObj.estatalSeguimiento?segundaSesionObj.estatalSeguimiento:[];
				progEstNuevo = segundaSesionObj.estatalActual?segundaSesionObj.estatalActual:[];
				
				var dataEstSeg = {
					      identifier: "idPrograma",
					      items: progEstSeg
			    };
				
				var dataEstAct = {
					      identifier: "idPrograma",
					      items: progEstNuevo
			    };
				
				new DataGrid({
			        id: '2Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '2Grid').startup();    	   		    	    			
		  					
				new DataGrid({
			        id: '2_1Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '2_1Grid').startup();
				    	
				//Store de federales para seguimiento
				storeEstSeg = new ItemFileWriteStore({data: dataEstSeg});				    
				registry.byId('2Grid').setStore(storeEstSeg);
				
				//Store de federales nuevos
				storeEstNuevo = new ItemFileWriteStore({data: dataEstAct});				    
				registry.byId('2_1Grid').setStore(storeEstNuevo);

				var gridEstatal = registry.byId('2_1Grid');
						
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
								
				maxIndexEstatal = dataEstAct.items.length;
				
				new Button({
					label : " Seguimiento a programas ",
					id:'e_2Grid',
					onClick : function() {		
						var index = registry.byId('2Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('2Grid').getItem(index);
		                    var cPrograma = registry.byId('2Grid').store.getValue(item, 'idPrograma');
		                    var seguimiento = registry.byId('2Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('2Grid').store.getValue(item, 'avance');
		                    var monto2Sesion=registry.byId('2Grid').store.getValue(item, 'monto2Sesion');
		                    var montoStr2Sesion=registry.byId('2Grid').store.getValue(item, 'montoStr2Sesion');
		                    var cambioMonto=registry.byId('2Grid').store.getValue(item, 'cambioMonto');
		                    var monto= registry.byId('2Grid').store.getValue(item, 'monto');
		                    var montoStr= registry.byId('2Grid').store.getValue(item, 'montoStr');
						}else{
			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance,
		            			monto2Sesion:monto2Sesion,
		            			montoStr2Sesion:montoStr2Sesion,
		            			cambioMonto:cambioMonto,
		            			monto:monto,
		            			montoStr:montoStr
		            			};
						
						seguimientoEstatalMunicipalOSC(2,itemToEdit,1);
					}							
				}, 'e_2Grid');
		    	
		    	
		    	new Button({
					label : " Agregar ",
					id:'a_2_1Grid',
					onClick : function() {					
						funEstatal();
				}}, 'a_2_1Grid');
		    	
		    	new Button({
					label : " Editar ",
					id:'e_2_1Grid',
					onClick : function() {	
						var index = registry.byId('2_1Grid').selection.selectedIndex;    																						
						var item = registry.byId('2_1Grid').getItem(index);
		            	var itemToEdit={selectedItem:index,
		            			cPrograma: registry.byId('2_1Grid').store.getValue(item, 'cPrograma'), 
		            			idPrograma: registry.byId('2_1Grid').store.getValue(item, 'idPrograma'), 
		            			nomPrograma: registry.byId('2_1Grid').store.getValue(item, 'nomPrograma'),
		            			nomOtroPrograma: registry.byId('2_1Grid').store.getValue(item,'nomOtroPrograma'),
		            			objetivoPrograma: registry.byId('2_1Grid').store.getValue(item, 'objetivo'),
		            			meta: registry.byId('2_1Grid').store.getValue(item, 'meta'),
		            			monto: registry.byId('2_1Grid').store.getValue(item, 'monto'),
		            			montoStr: registry.byId('2_1Grid').store.getValue(item, 'montoStr')
		            			};  
		            	
						funEstatal(itemToEdit);
					}			
				}, 'e_2_1Grid');
		    	
		    	new Button({
					label : " Eliminar",
					id: 'd_2_1Grid',
					onClick : function() {			
						eliminaRow(registry.byId('2_1Grid'));
					}
				}, 'd_2_1Grid');
		    	
		    	new Button({
					label : " Seguimiento a programas ",
					id:'s_2_1Grid',
					onClick : function() {		
						var index = registry.byId('2_1Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('2_1Grid').getItem(index);
		                    var cPrograma = registry.byId('2_1Grid').store.getValue(item, 'idPrograma');
		                    var seguimiento = registry.byId('2_1Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('2_1Grid').store.getValue(item, 'avance');
						}else{
			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance
		            			};
						
						seguimientoEstatalMunicipalOSC(2,itemToEdit,2);
					}							
				}, 's_2_1Grid');
		        	
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
				    		      { name: 'Programa', 					field: 'idPrograma',  		width:'180px',	hidden:true},
				    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', 	hidden:true},
				    		      { name: 'Metas y objetivos', 			field: 'objetivos', 		width: '160px', hidden:true},					    		      					    		      
				    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
				    		      { name: 'Metas Otros', 				field: 'meta', 				width: '160px', hidden:true},
				    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'180px'},					    		      					    		      
				    		      { name: 'Monto', 						field: 'monto', 			width: '70px'},
				    		      { name: 'Monto(Letra)', 				field: 'montoStr', 			width: '200px'},
				    		      { name: 'Monto', 						field: 'monto2Sesion', 		width: '70px', hidden:true},
				    		      { name: 'Monto(Letra)', 				field: 'montoStr2Sesion', 	width: '200px', hidden:true},
				    		      { name: 'Cambio Monto', 				field: 'cambioMonto', 		width: '50px', hidden:true},
				    		      { name: 'seguimiento', 				field: 'seguimiento', 		width: '160px', hidden:true},
				    		      { name: 'avance', 					field: 'avance', 			width: '160px', hidden:true}
				    		]];
				
				tablaGrid1=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
								'<td width= "450px"><span class="sub" align="left">Seguimiento</span></td>'+
								'<td width= "450px"><span class="sub" align="left">Nuevos programas</span></td>'+
							'<tr>'+
							'	<td><input id="3Grid"/></td>'+
							'	<td><input id="3_1Grid"/></td>'+
							'</tr>'+
							'<tr>' +
								'<td>'+
									'<input id="e_3Grid"/>'+
								'</td>'+
								'<td>'+
									'<input id="a_3_1Grid"/>'+
									'<input id="e_3_1Grid"/>'+
									'<input id="d_3_1Grid"/>'+
									'<input id="s_3_1Grid"/>'+
								'</td>'+
							'</tr>'+
							'</table>';
				
				dom.byId('progLocPane').innerHTML=tablaGrid1;

				progMunSeg = segundaSesionObj.municipalSeguimiento?segundaSesionObj.municipalSeguimiento:[];
				progMunNuevo = segundaSesionObj.municipalActual?segundaSesionObj.municipalActual:[];
						
				var dataMunSeg = {
					      identifier: "idPrograma",
					      items: progMunSeg
			    };
				
				var dataMunAct = {
					      identifier: "idPrograma",
					      items: progMunNuevo
			    };
				
				new DataGrid({
			        id: '3Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '3Grid').startup();    	   		    	    			
		  					
				new DataGrid({
			        id: '3_1Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '3_1Grid').startup();
				    	
				//Store de federales para seguimiento
				storeMunSeg = new ItemFileWriteStore({data: dataMunSeg});				    
				registry.byId('3Grid').setStore(storeMunSeg);
				
				//Store de federales nuevos
				storeMunNuevo = new ItemFileWriteStore({data: dataMunAct});				    
				registry.byId('3_1Grid').setStore(storeMunNuevo);
				
				var gridMun = registry.byId('3_1Grid');
				
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
				
				maxIndexMunicipal = dataMunAct.items.length;
				
		    	new Button({
					label : " Seguimiento a programas ",
					id:'e_3Grid',
					onClick : function() {	
						var index = registry.byId('3Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('3Grid').getItem(index);
		                    var cPrograma = registry.byId('3Grid').store.getValue(item, 'idPrograma');
		                    var seguimiento = registry.byId('3Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('3Grid').store.getValue(item, 'avance');
		                    var monto2Sesion=registry.byId('3Grid').store.getValue(item, 'monto2Sesion');
		                    var montoStr2Sesion=registry.byId('3Grid').store.getValue(item, 'montoStr2Sesion');
		                    var cambioMonto=registry.byId('3Grid').store.getValue(item, 'cambioMonto');
		                    var monto= registry.byId('3Grid').store.getValue(item, 'monto');
		                    var montoStr= registry.byId('3Grid').store.getValue(item, 'montoStr');
						}else{
			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance,
		            			monto2Sesion:monto2Sesion,
		            			montoStr2Sesion:montoStr2Sesion,
		            			cambioMonto:cambioMonto,
		            			monto:monto,
		            			montoStr:montoStr
		            			};
						
						seguimientoEstatalMunicipalOSC(3,itemToEdit,1);
					}							
				}, 'e_3Grid');
		    	    	
		    	new Button({
					label : " Agregar ",
					id:'a_3_1Grid',
					onClick : function() {					
						funMunicipal();
					}
				}, 'a_3_1Grid');
		    	
		    	new Button({
					label : " Editar ",
					id:'e_3_1Grid'	,
					onClick : function() {	
						var index = registry.byId('3_1Grid').selection.selectedIndex;    																						
						var item = registry.byId('3_1Grid').getItem(index);
		            	var itemToEdit={selectedItem:index,
		            			cPrograma: registry.byId('3_1Grid').store.getValue(item, 'cPrograma'), 
		            			idPrograma: registry.byId('3_1Grid').store.getValue(item, 'idPrograma'), 
		            			nomPrograma: registry.byId('3_1Grid').store.getValue(item, 'nomPrograma'),
		            			nomOtroPrograma: registry.byId('3_1Grid').store.getValue(item,'nomOtroPrograma'),
		            			objetivoPrograma: registry.byId('3_1Grid').store.getValue(item, 'objetivo'),
		            			meta: registry.byId('3_1Grid').store.getValue(item, 'meta'),
		            			monto: registry.byId('3_1Grid').store.getValue(item, 'monto'),
		            			montoStr: registry.byId('3_1Grid').store.getValue(item, 'montoStr')
		            			};  
						funMunicipal(itemToEdit);
					}		
				}, 'e_3_1Grid');
		    	
		    	new Button({
					label : " Eliminar",
					id: 'd_3_1Grid',
					onClick : function() {
						eliminaRow(registry.byId('3_1Grid'));
					}
				}, 'd_3_1Grid');
		    	
		    	new Button({
					label : " Seguimiento a programas ",
					id:'s_3_1Grid',
					onClick : function() {		
						var index = registry.byId('3_1Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('3_1Grid').getItem(index);
		                    var cPrograma = registry.byId('3_1Grid').store.getValue(item, 'idPrograma');
		                    var seguimiento = registry.byId('3_1Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('3_1Grid').store.getValue(item, 'avance');
						}else{
			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance
		            			};
						
						seguimientoEstatalMunicipalOSC(3,itemToEdit,2);
					}							
				}, 's_3_1Grid');
		        	
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
				    		      { name: 'Programa', 					field: 'idPrograma',  		width:'180px',	hidden:true},
				    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', 	hidden:true},
				    		      { name: 'Metas y objetivos', 			field: 'objetivos', 		width: '160px', hidden:true},					    		      					    		      
				    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
				    		      { name: 'Metas Otros', 				field: 'meta', 				width: '160px', hidden:true},
				    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'180px'},					    		      					    		      
				    		      { name: 'Monto', 						field: 'monto', 			width: '70px'},
				    		      { name: 'Monto(Letra)', 				field: 'montoStr', 			width: '200px'},
				    		      { name: 'Monto', 						field: 'monto2Sesion', 		width: '70px', hidden:true},
				    		      { name: 'Monto(Letra)', 				field: 'montoStr2Sesion', 	width: '200px', hidden:true},
				    		      { name: 'Cambio Monto', 				field: 'cambioMonto', 		width: '50px', hidden:true},
				    		      { name: 'seguimiento', 				field: 'seguimiento', 		width: '160px', hidden:true},
				    		      { name: 'avance', 					field: 'avance', 			width: '160px', hidden:true}
				    		]];
				
				tablaGrid1=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
								'<td width= "450px"><span class="sub" align="left">Seguimiento</span></td>'+
								'<td width= "450px"><span class="sub" align="left">Nuevos programas</span></td>'+
							'<tr>'+
							'	<td><input id="4Grid"/></td>'+
							'	<td><input id="4_1Grid"/></td>'+
							'</tr>'+
							'<tr>' +
								'<td>'+
									'<input id="e_4Grid"/>'+
								'</td>'+
								'<td>'+
									'<input id="a_4_1Grid"/>'+
									'<input id="e_4_1Grid"/>'+
									'<input id="d_4_1Grid"/>'+
									'<input id="s_4_1Grid"/>'+
								'</td>'+
							'</tr>'+
							'</table>';
				
				dom.byId('proyOSCPane').innerHTML=tablaGrid1;

				progOscSeg = segundaSesionObj.oscSeguimiento?segundaSesionObj.oscSeguimiento:[];
				progOscNuevo = segundaSesionObj.oscActual?segundaSesionObj.oscActual:[];
				
				var dataOscSeg = {
					      identifier: "idPrograma",
					      items: progOscSeg
			    };
				
				var dataOscAct = {
					      identifier: "idPrograma",
					      items: progOscNuevo
			    };
				
				new DataGrid({
			        id: '4Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '4Grid').startup();    	   		    	    			
		  					
				new DataGrid({
			        id: '4_1Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
		        }, '4_1Grid').startup();

				//Store de federales para seguimiento
				storeOscSeg = new ItemFileWriteStore({data: dataOscSeg});				    
				registry.byId('4Grid').setStore(storeOscSeg);
				
				//Store de federales nuevos
				storeOscNuevo = new ItemFileWriteStore({data: dataOscAct});				    
				registry.byId('4_1Grid').setStore(storeOscNuevo);
				
				var gridOsc = registry.byId('4_1Grid');
				
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
				
				maxIndexOsc = dataOscAct.items.length;
				
		    	new Button({
					label : " Seguimiento a programas ",
					id:'e_4Grid',
					onClick : function() {	
						var index = registry.byId('4Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('4Grid').getItem(index);
		                    var cPrograma = registry.byId('4Grid').store.getValue(item, 'idPrograma');
		                    var seguimiento = registry.byId('4Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('4Grid').store.getValue(item, 'avance');
		                    var monto2Sesion=registry.byId('4Grid').store.getValue(item, 'monto2Sesion');
		                    var montoStr2Sesion=registry.byId('4Grid').store.getValue(item, 'montoStr2Sesion');
		                    var cambioMonto=registry.byId('4Grid').store.getValue(item, 'cambioMonto');
		                    var monto= registry.byId('4Grid').store.getValue(item, 'monto');
		                    var montoStr= registry.byId('4Grid').store.getValue(item, 'montoStr');
						}else{
			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance,
		            			monto2Sesion:monto2Sesion,
		            			montoStr2Sesion:montoStr2Sesion,
		            			cambioMonto:cambioMonto,
		            			monto:monto,
		            			montoStr:montoStr
		            			};
						
						seguimientoEstatalMunicipalOSC(4,itemToEdit,1);
					}							
				}, 'e_4Grid');
		    	    	
		    	new Button({
					label : " Agregar ",
					id:'a_4_1Grid',
					onClick : function() {					
						funOSC();
					}
				}, 'a_4_1Grid');
		    	
		    	new Button({
					label : " Editar ",
					id:'e_4_1Grid',
					onClick : function() {	
						var index = registry.byId('4_1Grid').selection.selectedIndex;    																						
						var item = registry.byId('4_1Grid').getItem(index);
		            	var itemToEdit={selectedItem:index,
		            			cPrograma: registry.byId('4_1Grid').store.getValue(item, 'cPrograma'), 
		            			idPrograma: registry.byId('4_1Grid').store.getValue(item, 'idPrograma'), 
		            			nomPrograma: registry.byId('4_1Grid').store.getValue(item, 'nomPrograma'),
		            			nomOtroPrograma: registry.byId('4_1Grid').store.getValue(item,'nomOtroPrograma'),
		            			objetivoPrograma: registry.byId('4_1Grid').store.getValue(item, 'objetivo'),
		            			meta: registry.byId('4_1Grid').store.getValue(item, 'meta'),
		            			monto: registry.byId('4_1Grid').store.getValue(item, 'monto'),
		            			montoStr: registry.byId('4_1Grid').store.getValue(item, 'montoStr')
		            			};  
						funOSC(itemToEdit);
					}			
				}, 'e_4_1Grid');
		    	
		    	new Button({
					label : " Eliminar",
					id: 'd_4_1Grid',
					onClick : function() {					
						eliminaRow(registry.byId('4_1Grid'));
					}
				}, 'd_4_1Grid');
		    	
		    	new Button({
					label : " Seguimiento a programas ",
					id:'s_4_1Grid',
					onClick : function() {		
						var index = registry.byId('4_1Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('4_1Grid').getItem(index);
		                    var cPrograma = registry.byId('4_1Grid').store.getValue(item, 'idPrograma');
		                    var seguimiento = registry.byId('4_1Grid').store.getValue(item, 'seguimiento');
		                    var avance = registry.byId('4_1Grid').store.getValue(item, 'avance');
						}else{
			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			cPrograma: cPrograma,
		            			seguimiento: seguimiento,
		            			avance: avance
		            			};
						
						seguimientoEstatalMunicipalOSC(4,itemToEdit,2);
					}							
				}, 's_4_1Grid');
		        	
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
		    	//	  { name: 'Tiene conocimiento acerca de los recursos asignados al plantel.', field: 'rprogramaFederales',  width:'163px'},
		    		  { name: 'Toma decisiones y administra los recursos conjuntamente con el director del plantel.', field: 'rprogramaEstatales',  width:'169px'},
		    		  { name: 'Recibe informaci\u00f3n por parte del director sobre los recursos asignados, pero no interviene en su administraci\u00f3n y seguimiento.', field: 'rprogramaMunicipales',  width:'173px'},
		    	//	  { name: 'La escuela no recibe recursos de programas', field: 'rprogramaOsc',  width:'125px'},
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
    			
		progRec = segundaSesionObj.programaRecursos?segundaSesionObj.programaRecursos:[];
		
		for(var i in progRec){
			progRec[i].descripcion = progRec[i].cParticipacion==1?"En el caso de programas federales":progRec[i].cParticipacion==2?"En el caso de programas estatales":progRec[i].cParticipacion==3?"En el caso de programas municipales":progRec[i].cParticipacion==4?"En el caso de programas OSC":"";
		//	progRec[i].rprogramaFederales = progRec[i].tprogramaFederales==1?"SI":progRec[i].tprogramaFederales==2?"NO":"";
			progRec[i].rprogramaEstatales = progRec[i].tprogramaEstatales==1?"SI":progRec[i].tprogramaEstatales==2?"NO":"";
			progRec[i].rprogramaMunicipales = progRec[i].tprogramaMunicipales==1?"SI":progRec[i].tprogramaMunicipales==2?"NO":"";
		//	progRec[i].rprogramaOsc = progRec[i].tprogramaOsc==1?"SI":progRec[i].tprogramaOsc==2?"NO":"";
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
			label : "Editar",
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
					//		rprogramaFederales: registry.byId('rGrid').store.getValue(item, 'rprogramaFederales'),
							rprogramaEstatales: registry.byId('rGrid').store.getValue(item, 'rprogramaEstatales'),
							rprogramaMunicipales: registry.byId('rGrid').store.getValue(item, 'rprogramaMunicipales')
					//		rprogramaOsc: registry.byId('rGrid').store.getValue(item, 'rprogramaOsc')
	                    			
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
	              	  { name: 'indAccion', field: 'idRuta', width: '5px',hidden:true},
	              	  { name: 'indAccion', field: 'nomOtraRuta', width: '5px',hidden:true},
	              	  { name: 'L\u00CDNEAS PARA COADYUVAR CON EL CUMPLIMIENTO DE LA RUTA DE MEJORA', field: 'nomRuta', width: '250px'},
	    		      { name: 'PRIMERA ACCION PARA COADYUVAR CON EL CUMPLIMIENTO DE LA RUTA DE MEJORA ', field: 'accion',  width:'250px'},
	    		      { name: 'SEGUNDA ACCION PARA COADYUVAR CON EL CUMPLIMIENTO DE LA RUTA DE MEJORA ', field: 'recomendacion',  width:'250px'}
	    		      ]];
		
		tablaGrid1=	'<table border="0" align="left" width= "900px">'+
					'<tr>' +
						'<td width= "450px"><span class="sub" align="left">Seguimiento</span></td>'+
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

		progAccSeg = segundaSesionObj.acciones?segundaSesionObj.acciones:[];
		
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
			label : " Seguimiento a acciones ",
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
						avanceRecomendacion: registry.byId('5Grid').store.getValue(item, 'avanceRecomendacion'),
						idRuta: registry.byId('5Grid').store.getValue(item, 'idRuta'),
            			nomRuta: registry.byId('5Grid').store.getValue(item, 'nomRuta'),
            			nomOtraRuta: registry.byId('5Grid').store.getValue(item, 'nomOtraRuta')
                    	};    	                    	
				seguimientoAccion(itemToEdit);
              
			} else{
            	 utils.cstmAlert(
					'Debe seleccionar solo un registro.');
             }					
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
    	layout= [[	  { name: 'idNormalidad', field: 'idNormalidad', width: '5px',hidden:true},
 	              	  { name: 'cNormalidad', field: 'cNormalidad', width: '5px',hidden:true},
 	              	  { name: 'Normalidad', field: 'descripcion', width: '250px'},
 	                  { name: 'Primera Acci\u00F3n a seguir', field: 'accion1', width: '250px'},
 	              	  { name: 'Segunda Acci\u00F3n a seguir', field: 'accion2', width: '250px'}
		    		      ]];
	
			
	
					
		tablaGrid1=	'<table border="0" align="left" width= "900px">'+
					'<tr><td>'+ 
					   '	<p> <b>*\u00BFEl consejo escolar opin\u00F3 sobre el calendario escolar que elegir\u00EDa la escuela?</b></p>'+
					   '	<input id="pregunta3a"/><label for="pregunta3a">S\u00ed </label>'+ 
					   '	<br/><input id="pregunta3b"/><label for="pregunta3b">No </label>'+
					'</td></tr>'+
					'<tr><td>'+ 
					   '	<p> <b>*Su escuela eligi\u00F3 el calendario escolar de: </b></p>'+
					   '	<input id="pregunta4a"/><label for="pregunta4a">185 d\u00edas </label>'+ 
					   '	<br/><input id="pregunta4b"/><label for="pregunta4b">200 d\u00edas </label>'+
					'</td></tr>'+
					'<tr>' +
					'	<td><input id="nGrid"/></td>'+
					'</tr>'+
					'<tr>' +
						'<td>'+
							'<input id="e_nGrid"/>'+
						'</td>'+
					'</tr>'+
					'</table>';
		  
		   
		   
		dom.byId('normalidadPane').innerHTML=tablaGrid1;
		
		new DataGrid({
	        id: 'nGrid',
	        structure: layout,
	        rowSelector: '10px',
	        height: '280px',
			width: '450px'
        }, 'nGrid').startup();  
		
		progNormal = segundaSesionObj.normalidad?segundaSesionObj.normalidad:[];
		
//		for(var i in progNormal){
//			progNormal[i].opcionNunca = progNormal[i].opcionNunca; //?"SI":progNormal[i].opcionNunca==2?"NO":"";
////			progNormal[i].opcionCasiNunca = progNormal[i].opcionCasiNunca==1?"SI":progNormal[i].opcionCasiNunca==2?"NO":"";
////			progNormal[i].opcionCasiSiempre = progNormal[i].opcionCasiSiempre==1?"SI":progNormal[i].opcionCasiSiempre==2?"NO":"";
////			progNormal[i].opcionSiempre = progNormal[i].opcionSiempre==1?"SI":progNormal[i].opcionSiempre==2?"NO":"";
//		}
//		
		
	    progNorSeg = [];
		
		for(var i in progNormal){
			if(progNormal[i].cSesion==3){
				progNorSeg.push(progNormal[i]);
			}
		}
		
		if(progNorSeg.length <= 0)
		{
			progNorSeg = progNormal;
		}
		var dataNormalidad = {
			      identifier: "cNormalidad",
			      items: progNorSeg
	    };
		
	  	   		    	    			
  		
		//Store de federales para seguimiento
		storeNormalidad = new ItemFileWriteStore({data: dataNormalidad});				    
		registry.byId('nGrid').setStore(storeNormalidad);
		
		 var pregunta3a= new RadioButton({
	           checked:segundaSesionObj.preguntas2==null?true: segundaSesionObj.preguntas2.respuesta3==1 ? true:false,
	           value: "1",
	           name: "pregunta3",
	           id:"pregunta3a"
	       }, "pregunta3a");
		   
		  var pregunta3b=new RadioButton({
	           checked:segundaSesionObj.preguntas2==null?false: segundaSesionObj.preguntas2.respuesta3==2 ? true:false,
	           value: "2",
	           name: "pregunta3",
	           id:"pregunta3b"
	       }, "pregunta3b");
		  
		  
		  var pregunta4a= new RadioButton({
	           checked:segundaSesionObj.preguntas2==null?true: segundaSesionObj.preguntas2.respuesta4==1 ? true:false,
	           value: "1",
	           name: "pregunta4",
	           id:"pregunta4a"
	       }, "pregunta4a");
		   
		  var pregunta4b=new RadioButton({
	           checked:segundaSesionObj.preguntas2==null?false: segundaSesionObj.preguntas2.respuesta4==2 ? true:false,
	           value: "2",
	           name: "pregunta4",
	           id:"pregunta4b"
	       }, "pregunta4b");
		
		
    	new Button({
			label : " Seguimiento de la normalidad",
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
	                    		 idNormalidad: registry.byId('nGrid').store.getValue(item, 'idNormalidad'),
	                    			cNormalidad: registry.byId('nGrid').store.getValue(item, 'cNormalidad'),
	                    			descripcion: registry.byId('nGrid').store.getValue(item, 'descripcion'),
	                    			accion1: registry.byId('nGrid').store.getValue(item, 'accion1'),
	                    			accion2: registry.byId('nGrid').store.getValue(item, 'accion2'),
	                    			opcionCasiSiempre: registry.byId('nGrid').store.getValue(item, 'opcionCasiSiempre'),
	                    		    opcionSiempre: registry.byId('nGrid').store.getValue(item, 'opcionSiempre'),
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
	function despliegaEvaluacion(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('myDataGrid')){
					if(infCctNivel.nomNivel == 'PRIMARIA' || infCctNivel.nomNivel == 'SECUNDARIA'){
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
                       '<tr><th field="56eva" width="33%">En la primera evaluación del ciclo escolar</th>'+
                           '<th field="56meta" width="33%">Meta de cierre del ciclo escolar</th>'+
                           '<th field="78eva" width="33%">En la primera evaluación del ciclo escolar</th>'+
                           '<th field="78meta" width="33%">Meta de cierre del ciclo escolar</th>'+
                           '<th field="90eva" width="33%">En la primera evaluación del ciclo escolar</th>'+
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
                     }else{
						
						tablaGrid1=	'<table border="0" align="left" width= "900px">'+
						'<tr><td>'+ 
						   '	<p> <b>RECUERDE QUE LOS SERVICIOS INICIAL, ESPECIAL Y NIVEL PREESCOLAR, NO EST\u00C1N OBLIGADOS A REGISTRAR EVALUACIONES, SOLAMENTE COMPROMISOS</b></p>'+
						'</td></tr>'+
						'</table>';
                     	} 
					
        dom.byId('evaluacionPane').innerHTML=tablaGrid1;                            
       
        regEvaluacion = segundaSesionObj.evaluacion?segundaSesionObj.evaluacion:[];
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
        
        if(infCctNivel.nomNivel=="SECUNDARIA" || infCctNivel.nomNivel=="PRIMARIA"){//------INICIO DE IF
        
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
        }//----------------------------------------------------------------------------------------FIN DE IF    
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
		           	  { name: 'idConsecutivo', field: 'idConsecutivo', width: '5px',hidden:true},
	    		      { name: 'COMPROMISO DEL CONSEJO ESCOLAR DE PARTICIPACI\u00d3N SOCIAL', field: 'compromiso',  width:'525px'},
		              { name: 'ACI\u00d3N1', field: 'accion1',  width:'25px', hidden:true},
		              { name: 'ACI\u00d3N2', field: 'accion2',  width:'25px',hidden:true},
		              { name: 'nomOtroCompromiso', field: 'nomOtroCompromiso',width:'5px',	hidden:true}
	    		 ]];
	
	tmpCompromiso = segundaSesionObj.compromiso?segundaSesionObj.compromiso:[];
		
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
			label : " Editar ",
			id:'e_cGrid',
			onClick : function() {	
				var index = registry.byId('cGrid').selection.selectedIndex;    											
				if(index!=-1){												
					var item = registry.byId('cGrid').getItem(index);
                	var itemToEdit={selectedItem:index,
	                    			idCompromiso: registry.byId('cGrid').store.getValue(item, 'idCompromiso'),
	                    			idConsecutivo: registry.byId('cGrid').store.getValue(item, 'idConsecutivo'),
	                    			accion1: registry.byId('cGrid').store.getValue(item, 'accion1'),
	                    			accion2: registry.byId('cGrid').store.getValue(item, 'accion2'),
	                    			nomOtroCompromiso: registry.byId('cGrid').store.getValue(item, 'nomOtroCompromiso')
	                    			
	                    			};    	                    	
                	compromisoAccion(itemToEdit);
                  
				} else{
	            	 utils.cstmAlert(
						'Debe seleccionar solo un registro.');
	             }					
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
				if(!registry.byId('7Grid')){
					layout = [[	  { name: 'idConsecutivo', field: 'ceComites', width: '5px', hidden:true},
			                  	  { name: 'idComite', field: 'idComite', width: '5px',hidden:true},
				    		      { name: 'Comit\u00E9', field: 'nomComite',  width:'150px'},
				    		      { name: 'nomOtroComite', field: 'nomOtroComite',width:'150px',hidden:true},
				    		      { name: 'Integrantes', field: 'numIntegrantes',  width:'150px'},
				    		      { name: 'Nombre del presidente del comit\u00E9 en el consejo escolar de participaci\u00F3n social', field: 'nomPresidente',  width:'300px'},
				    		      { name: 'idCalidad', field: 'idCalidad',  width:'1px',hidden:true},
				    		      { name: 'Calidad del presidente del comit\u00E9 en el consejo escolar de participaci\u00F3n social', field: 'nomcalidad',  width:'100px'},
				    		      { name: 'idAcuerdo', field: 'idAcuerdo', width: '1px',hidden:true},
				    		      { name: 'Acuerdo del comit\u00E9', field: 'acuerdo', width: '300px'},
				    		      { name: 'accion 1', field: 'accion1', width: '1px'},
				    		      { name: 'accion 2', field: 'accion2', width: '1px',hidden:true},
				    		      { name: 'accion 3', field: 'accion3', width: '1px',hidden:true},
				    		      { name: 'accion 4', field: 'accion4', width: '1px',hidden:true},
				    		      { name: 'accion 5', field: 'accion5', width: '1px',hidden:true}
				    		      ]];
				
				tablaGrid1=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
								'<td width= "450px"><span class="sub" align="left">Seguimiento</span></td>'+
								'<td width= "450px"><span class="sub" align="left">Nuevos comit\u00e9s</span></td>'+
							'<tr>'+
							'	<td><input id="7Grid"/></td>'+
							'	<td><input id="7_1Grid"/></td>'+
							'</tr>'+
							'<tr>' +
								'<td>'+
									'<input id="e_7Grid"/>'+
								'</td>'+
								'<td>'+
									'<input id="a_7_1Grid"/>'+
									'<input id="e_7_1Grid"/>'+
									'<input id="d_7_1Grid"/>'+
									'<input id="s_7_1Grid"/>'+
								'</td>'+
							'</tr>'+
							'</table>';
				
				dom.byId('comitePane').innerHTML=tablaGrid1;
				
				progComSeg = segundaSesionObj.comiteSeguimiento?segundaSesionObj.comiteSeguimiento:[];
				progComNuevo = segundaSesionObj.comiteActual?segundaSesionObj.comiteActual:[];
				
				var dataComSeg = {
					      identifier: "idComite",
					      items: progComSeg
			    };
				
				var dataComAct = {
					      identifier: "idComite",
					      items: progComNuevo
			    };
				
				new DataGrid({
			        id: '7Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
			        }, '7Grid').startup();    	   		    	    			
		  					
				new DataGrid({
			        id: '7_1Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '450px'
			        }, '7_1Grid').startup();

				//Store de federales para seguimiento
				storeComSeg = new ItemFileWriteStore({data: dataComSeg});				    
				registry.byId('7Grid').setStore(storeComSeg);
				
				//Store de federales nuevos
				storeComNuevo = new ItemFileWriteStore({data: dataComAct});				    
				registry.byId('7_1Grid').setStore(storeComNuevo);
				
				maxIndexComites = dataComAct.items.length;
				
		    	new Button({
					label : " Seguimiento a comit\u00e9s ",
					id:'e_7Grid',
					onClick : function() {	
						var index = registry.byId('7Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('7Grid').getItem(index);
						}else{
			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			ceComites: registry.byId('7Grid').store.getValue(item, 'ceComites'), 
		            			idComite: registry.byId('7Grid').store.getValue(item, 'idComite'),
		            			nomComite: registry.byId('7Grid').store.getValue(item, 'nomComite'),
		            			nomOtroComite: registry.byId('7Grid').store.getValue(item, 'nomOtroComite'),
		            			accion1: registry.byId('7Grid').store.getValue(item, 'accion1'),
		            			accion2: registry.byId('7Grid').store.getValue(item, 'accion2'),
		            			accion3: registry.byId('7Grid').store.getValue(item, 'accion3'),
		            			accion4: registry.byId('7Grid').store.getValue(item, 'accion4'),
		            			accion5: registry.byId('7Grid').store.getValue(item, 'accion5')
								};
									
						seguimientoComite(itemToEdit,1);
					}			
				}, 'e_7Grid');
		    	    	
		    	new Button({
					label : " Agregar ",
					id:'a_7_1Grid',
					onClick : function() {					
						funComite();
					}
				}, 'a_7_1Grid');
		    	
		    	new Button({
					label : " Editar ",
					id:'e_7_1Grid',
					onClick : function() {					
						var index = registry.byId('7_1Grid').selection.selectedIndex;    											
						if(index!=-1){												
							var item = registry.byId('7_1Grid').getItem(index);
		                	var itemToEdit={selectedItem:index,
		                			ceComites: registry.byId('7_1Grid').store.getValue(item, 'ceComites'), 
		                			idComite: registry.byId('7_1Grid').store.getValue(item, 'idComite'),
		                			nomComite: registry.byId('7_1Grid').store.getValue(item, 'nomComite'),
		                			noIntegrantes: registry.byId('7_1Grid').store.getValue(item, 'numIntegrantes'),
		                			nombrePresidente: registry.byId('7_1Grid').store.getValue(item, 'nomPresidente'),
		                			idCalidad: registry.byId('7_1Grid').store.getValue(item, 'idCalidad'),
		                			calidadPresidente: registry.byId('7_1Grid').store.getValue(item, 'nomCalidad'),
		                			idAcuerdo: registry.byId('7_1Grid').store.getValue(item, 'idAcuerdo'),
		                			acuerdoComite: registry.byId('7_1Grid').store.getValue(item, 'acuerdo'),
		                			nomOtroComite: registry.byId('7_1Grid').store.getValue(item, 'nomOtroComite')  
		                			};    	                    	
		                	funComite(itemToEdit);
		                  
						}else{
			            	 utils.cstmAlert(
								'Debe seleccionar solo un registro.');
			             }		
					}			
				}, 'e_7_1Grid');
		    	
		    	new Button({
					label : " Eliminar",
					id: 'd_7_1Grid',	
					onClick : function() {					
						eliminaRow(registry.byId('7_1Grid'));
					}
				}, 'd_7_1Grid');
		    
		    	new Button({
					label : " Seguimiento a comit\u00e9s ",
					id:'s_7_1Grid',
					onClick : function() {	
						var index = registry.byId('7_1Grid').selection.selectedIndex;    											
						if(index!=-1){
							var item = registry.byId('7_1Grid').getItem(index);
						}else{
			            	 utils.cstmAlert('Debe seleccionar solo un registro.');
			            	 return;
			            }
						
						var itemToEdit={selectedItem:index,
		            			ceComites: registry.byId('7_1Grid').store.getValue(item, 'ceComites'), 
		            			idComite: registry.byId('7_1Grid').store.getValue(item, 'idComite'),
		            			nomComite: registry.byId('7_1Grid').store.getValue(item, 'nomComite'),
		            			nomOtroComite: registry.byId('7_1Grid').store.getValue(item, 'nomOtroComite'),
		            			accion1: registry.byId('7_1Grid').store.getValue(item, 'accion1'),
		            			accion2: registry.byId('7_1Grid').store.getValue(item, 'accion2'),
		            			accion3: registry.byId('7_1Grid').store.getValue(item, 'accion3'),
		            			accion4: registry.byId('7_1Grid').store.getValue(item, 'accion4'),
		            			accion5: registry.byId('7_1Grid').store.getValue(item, 'accion5')
								};
									
						seguimientoComite(itemToEdit,2);
					}			
				}, 's_7_1Grid');    	
	}
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}
function despliegaIntegrantesComites(crea){
		
	if(crea){
		if(!registry.byId(id)){
			if(!registry.byId('1IGrid')){
				layoutInCom = [[
			    		    { name: 'Id', 							field: 'id', 				width: '50px',hidden:true},
			    		    { name: 'Miembro del Consejo Escolar', 	field: 'nomEsMiembroCe', 	width: '50px'},
			    		    { name: 'idIntegrante', 				field: 'idIntegrante', 	width: '50px',hidden:true},
			    		    { name: 'Nombre', 						field:'nombreIntegrante', 	width: '150px'}, 
			    		    { name: 'Calidad', 						field:'cCalidad', 			width: '150px'}, 
			    		    { name: 'MiembroConsejo', 				field:'esMiembroCe', 		width: '50px',hidden:true}, 
			    		    { name: 'Comit\u00e9', 				field:'nomComites', 		width: '150px'},
			    		    { name: 'idcomite', 				field:'idComite', 		width: '50px',hidden:true}
			    		]];
				
			
			tablaGridIntegrantes=	'<table border="0" align="left" width= "900px">'+
							'<tr>' +
							'<td width= "450px"><span class="sub" align="left">Integrantes del comit\u00E9</span></td>'+
							'<tr>'+
							'	<p> <b>RECUERDE QUE EL NOMBRE DEL PRESIDENTE DEL COMIT\u00C9 SE REGISTR\u00D3 EN LA PRIMERA SESI\u00D3N, POR LO QUE NO ES NECESARIO ESCRIBIRLO NUEVAMENTE.</b></p>'+
							 '</tr>'+
							'<tr>'+
							'	<td><input id="1IGrid"/></td>'+
							 '</tr>'+
							   '<tr>' +
						   	   '<td><input id="addRow"/> <input id="editRow"/> <input id="removeRow"/></td>'+
							   '</tr>'+
							  
							   '</table>';
			
			dom.byId('integrantesPane').innerHTML=tablaGridIntegrantes;
			
			inteComite = segundaSesionObj.integrantesComites?segundaSesionObj.integrantesComites:[];
			
			
			
			var dataComInt = {
				      identifier: "id",
				      items: inteComite
		    };
			
			maxIntegrantesComites=inteComite.length;
			
			new DataGrid({
		        id: '1IGrid',
		        structure: layoutInCom,
		        rowSelector: '10px',
		        height: '250px',
				width: '450px'
		        }, '1IGrid').startup();    	   		    	    			
	  	
			
			storeComint = new ItemFileWriteStore({data: dataComInt});				    
			registry.byId('1IGrid').setStore(storeComint);
			   //utils.createTag('div','addRow','comitesDiv');
			   new Button({
					label :'Agregar integrante',
					onClick : function() {
						detalleIntegrante();
						
					}
				}, "addRow");
				
			//	utils.createTag('div','editRow', 'comitesDiv');
				new Button({
					label : 'Editar integrante',
					onClick : function(){ 
						var grid = registry.byId('1IGrid');
						var items = grid.selection.getSelected();
						if(items.length==1){
			                 dojo.forEach(items, function(selectedItem){
			                     if(selectedItem !== null){	
			                    	var itemToEdit={
				                    		id: grid.store.getValue(selectedItem,'id'), 
				                    		nomEsMiembroCe: grid.store.getValue(selectedItem,'nomEsMiembroCe'), 
				                    		idIntegrante: grid.store.getValue(selectedItem,'idIntegrante'), 
						      				nombreIntegrante: grid.store.getValue(selectedItem,'nombreIntegrante'), 
						      				esMiembroCe: grid.store.getValue(selectedItem,'esMiembroCe'),
						       				nomComites: grid.store.getValue(selectedItem,'nomComites'),
						       				idComite: grid.store.getValue(selectedItem,'idComite'),
						       				cCalidad: grid.store.getValue(selectedItem,'cCalidad'),
									    };
			                    	
			                    	detalleIntegrante(itemToEdit);
			                     }
			                 }); 
			             }else{
			            	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
			             }
					}
				},'editRow');				

				//utils.createTag('div','removeRow', 'comitesDiv');

				new Button({
				       label: 'Eliminar integrante',
				       onClick: function(){
				    		eliminaRow(registry.byId('1IGrid'));
				      }
				}, "removeRow");
			
			
			
		}
		}
	}
	else{
		   if(registry.byId(id)){
			   registry.byId('pestanias').closeChild(registry.byId(id));
		   }   
		}
}

function detalleIntegrante(itemToEdit){
	   var edit=false;
	    if(!itemToEdit){
		   itemToEdit= {idIntegrante: -1, 
    				nombreIntegrante: '', cCalidad:'',nomEsMiembroCe:'',
    				esMiembroCe:true, nomComites:'',idComite:0
    		};   
	   }else{
		   edit=true;
	   }
	   
	   var title ='Integrante de comit\u00E9';
    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
    	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    jsUtils.createTag('div','prCnt','dcDetail');
		    
	    dom.byId('prCnt').innerHTML='<table border="0" align="left" >'+
	   '<tr> ' +
	   '  <td>'+
	   '	<b>*Tipo de integrante: </b><br>' +
	   
	   '	<input id="esMiembroCESi"/><label for="esMiembroCESi"></label> Miembro del Consejo Escolar<br>'+ 
	  
	   '	<input id="esMiembroCENo"/><label for="esMiembroCENo"></label> Miembro de la Comunidad Educativa<br>' +
	   '  </td>'+
	   '</tr>'+
      
	   '<tr><td align="right" id="esc3">'+
	   '	<b>*Nombre: </b><div id="nombreIntegrante"/>'+
	   '</td></tr>'+
	   '<tr><td align="right" >'+
	   '	<b></b></td><td><input type="hidden" id="cscIntegranteStr"/>'+
	   '</td></tr>'+
	   '<tr><td align="right" style="display:none" id="esc4">'+
	   '	<b>*Integrante del Consejo Escolar: </b><div id="integranteElegir"/>'+
	   '</td></tr>'+
	
	   '<tr><td align="right" style="display:none" id="esc7">'+
	   '	<b>*Nombre: </b><div id="nombreIntegranteStr"/>'+
	   '</td></tr>'+
	 
	   '<tr><td align="right" style="display:none" id="esc9">'+
	   '	<b>*Calidad: </b><div id="nomCalidadStr"/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<br><br><b>*Comit\u00E9 al cual pertenece el integrante: </b><div id="comitesSel" /><br/>'+
	   '</td></tr>'+
	  '</table>';
	   
	   integrantesCon = segundaSesionObj.integrantes?segundaSesionObj.integrantes:[];

	   
	   var intList=[{name:"[Seleccione]",id:-1}];
	  
			 //for(var i=0 in integrantesCon){
	  for( var i=0; i <integrantesCon.length ; i ++){ 
			 intList.push({name:integrantesCon[i].nombre, id:integrantesCon[i].cscIntegrante});
		    }
			  
		    var integrantesDa = new Memory({
		        data: intList
		    });
	   
		    
	   var data=[{name:"[Seleccione]",	id:"0"}];
	    
	    for(var index in listTemasG){
	    	data.push(listTemasG[index]);
	    }
		  
	    var pStore = new Memory({
	        data: data
	    });
	   //Componentes de los integrantes de la comunidad escolar

	    new RadioButton({
	           checked: false,
	           value: true,
	           name: "esMiembroCe"
	       }, "esMiembroCESi").on( 'change', function(){
	    		if(registry.byId('esMiembroCESi').checked){
	       		
	    			dom.byId('esc3').style.display='none';
	       		dom.byId('esc4').style.display='block';
	       		dom.byId('esc7').style.display='block';
	       		dom.byId('esc9').style.display='block';
	       		
	       		registry.byId('nombreIntegranteStr').reset();
	          	//registry.byId('integranteElegir').reset();
	          	registry.byId('nomCalidadStr').reset();
	       }else{
	        	dom.byId('esc3').style.display='block';
	       		dom.byId('esc4').style.display='none';
	       		dom.byId('esc7').style.display='none';
	       		dom.byId('esc9').style.display='none';
	      } 
	          });
		   
		   new RadioButton({
	           checked: true,
	           value: false,
	           name: "esMiembroCe"
	       }, "esMiembroCENo");

		 
		   new ValidationTextBox({
			   value:itemToEdit.nombreIntegrante,
	           uppercase:'true',trim:"true",maxLength:"90",
	           style:"width:350px",
	         //  required: true
	        }, 'nombreIntegrante');
		   
		  if(itemToEdit.esMiembroCe){
			   new FilteringSelect({
				   id:'integranteElegir',
		           store: integrantesDa,
		           searchAttr:'name',
		           style:"width:350px",
		           value: itemToEdit.idIntegrante
		        }, 'integranteElegir').on('change', function(){ 
		        	
			    	var idInt= registry.byId('integranteElegir').get('value');
			    
			    	var cal='';
			    	var nom='';
			    	
			    	  for( var i=0; i <integrantesCon.length ; i ++){ 
			    		  if(integrantesCon[i].cscIntegrante==idInt)
			    		  {
			 			    cal=integrantesCon[i].calidad;
			 				nom=integrantesCon[i].nombre;
			 			  }
			 		    }
			    	
			    	registry.byId('nombreIntegranteStr').set("value",nom);
			        registry.byId('nomCalidadStr').set("value",cal);
	        
			
		        });
		   }else{
			   new ValidationTextBox({
				   value:itemToEdit.idIntegrante,
		           uppercase:'true',trim:"true",maxLength:"30",
		           type: 'hidden'
		        }, 'cscIntegranteStr');
		   }
	    
		  
		  
		   new ValidationTextBox({
			   value:itemToEdit.nombreIntegrante,
	           uppercase:'true',trim:"true",maxLength:"90",
	           style:" width:350px",
	           readOnly: true
	        }, 'nombreIntegranteStr');
		
		  
		   new ValidationTextBox({
			   value:itemToEdit.cCalidad,
			   style:"width:350px",
	           //uppercase:'true',
	           trim:"true",maxLength:"60",
	           readOnly: true
	        }, 'nomCalidadStr');
		   
		   
		   var gridComiteSe = registry.byId('7Grid');
		   var gridComitePr = registry.byId('7_1Grid');
		   var tcomiteSeleccionados=[];
		   
			for ( var i = 0; i < gridComiteSe.rowCount; i++) {

				var item = gridComiteSe.getItem(i);	
				var idcom=gridComiteSe.store.getValue(item,'idComite');
				var nomcom='';
				if(idcom>=13){
					nomcom=gridComiteSe.store.getValue(item,'nomComite')+ ": " +gridComiteSe.store.getValue(item,'nomOtroComite');
				}
				else{
					nomcom=gridComiteSe.store.getValue(item,'nomComite');
				}
				
		   var comSeg = {		  						 
					
					idComite: idcom,
					nomComite: nomcom
			};
						
		   tcomiteSeleccionados.push(comSeg);
			}
			
			for ( var i = 0; i < gridComitePr.rowCount; i++) {

				var item = gridComitePr.getItem(i);	 
				var idcom2=gridComitePr.store.getValue(item,'idComite');
				var nomcom2='';
				if(idcom2>=13){
					nomcom2=gridComitePr.store.getValue(item,'nomComite')+ ": " +gridComitePr.store.getValue(item,'nomOtroComite');
				}
				else{
					nomcom2=gridComitePr.store.getValue(item,'nomComite');
				}
		   var comSeg2 = {		  						 
					
					idComite:idcom2 ,
					nomComite:nomcom2
						
					
			};
						
		   tcomiteSeleccionados.push(comSeg2);
			}
		   
	    var intListCom=[{name:"[Seleccione]",id:0}];
			  
		 for( var i=0; i <tcomiteSeleccionados.length ; i ++){ 
		  intListCom.push({name:tcomiteSeleccionados[i].nomComite, id:tcomiteSeleccionados[i].idComite});
		    }
			  
		    var comitesSele = new Memory({
		        data: intListCom
		    });
			
		   new FilteringSelect({
			   id:'comitesSel',
	           store: comitesSele,
	           searchAttr:'name',
	           style:"width:350px",
	           value: itemToEdit.idComite
	        }, 'comitesSel');
		   

		   if(itemToEdit.esMiembroCe==true){
			   registry.byId('esMiembroCESi').set('checked',true);  
		   }
		   
		   if(itemToEdit.esMiembroCe==false){
			   registry.byId('esMiembroCENo').set('checked',true);
			}
		   
		   if(edit==true){
			   registry.byId('esMiembroCESi').set('readOnly',true);
			   registry.byId('esMiembroCENo').set('readOnly',true);
			   if(registry.byId('integranteElegir'))
				   registry.byId('integranteElegir').set('readOnly',true);
		   }
		   
		   
		   utils.createTag('div','inBtnAceptar','dcDetail');
	   
	   
	   new Button({
			label : " Aceptar ",
			onClick : function() {
				var form = registry.byId('dDetail');
			
				
				var gnomEsMiembroCe='';
				var gidIntegrante=0;
				var gnombreIntegrante='';
				var gcCalidad='';
				var gesMiembroCe=0;
				
				if( registry.byId('esMiembroCESi').checked)
				{
					if( registry.byId("integranteElegir").get('value')==-1){
	 					utils.cstmAlert("Debe seleccionar un integrante del consejo para asignar a un comit\u00E9");
	 					return;
					}
				}
				else
				{
					if( registry.byId("nombreIntegrante").get('value')=='' || registry.byId("nombreIntegrante").get('value')==null){
	 					utils.cstmAlert("Debe registrar el nombre del miembro de la comunidad que asignara al comit\u00E9");
	 					return;
					}
				}
				
				if(registry.byId("comitesSel").get('value')==0){
					utils.cstmAlert("Debe selecionar un comit\u00E9");
 					return;
				}
				
				
				if( registry.byId('esMiembroCESi').checked){
					 
					gnomEsMiembroCe='S\u00CD';
					gidIntegrante=registry.byId("integranteElegir").get('value');
					gnombreIntegrante=registry.byId("integranteElegir").get('displayedValue');
					gcCalidad=registry.byId("nomCalidadStr").get('value');
					gesMiembroCe=1;
					
				   }
				else{
					gnomEsMiembroCe='NO';
					gidIntegrante=null;
					gnombreIntegrante=registry.byId("nombreIntegrante").get('value');
					gcCalidad='Miembro de la Comunidad Educativa';
					gesMiembroCe=0;
					
				}
				
				var grid = registry.byId('1IGrid');
				if(!edit){
				for ( var i = 0; i < grid.rowCount; i++) {
		        		
		 				var item = grid.getItem(i);
		 				
		 				if( grid.store.getValue(item,'idIntegrante') == registry.byId("integranteElegir").get('value') && grid.store.getValue(item,'idComite') == registry.byId("comitesSel").get('value')){
		 					utils.cstmAlert("Ya existe registrado el integrante dentro de ese comit\u00E9");
		 					return;
		 				}

		 			}
				}
				
			
				try{
					if(edit){
						var index = grid.selection.selectedIndex;
						var item = grid.getItem(index);
						
						grid.store.setValue(item, 'nomEsMiembroCe', gnomEsMiembroCe);
						grid.store.setValue(item, 'idIntegrante', gidIntegrante);
						grid.store.setValue(item, 'nombreIntegrante',gnombreIntegrante);
						grid.store.setValue(item, 'cCalidad', gcCalidad);
						grid.store.setValue(item, 'esMiembroCe', gesMiembroCe);
						grid.store.setValue(item, 'nomComites', registry.byId("comitesSel").get('displayedValue'));
						grid.store.setValue(item, 'idComite', registry.byId("comitesSel").get('value'));
			      } else {
                         var myNewItem = {		id:++maxIntegrantesComites,
                        		 	nomEsMiembroCe:gnomEsMiembroCe,
									idIntegrante:gidIntegrante,
									nombreIntegrante:gnombreIntegrante,
									cCalidad:gcCalidad,
									esMiembroCe:gesMiembroCe,
									nomComites:registry.byId("comitesSel").get('displayedValue'),
									idComite:registry.byId("comitesSel").get('value'),
						            };	    							 
                         grid.store.newItem(myNewItem);
					}
					registry.byId('dDetail').destroyRecursive(false);
				}catch(e){
					utils.cstmAlert('Ocurrio un error al Agregar o Editar');
					console.log(e);
				}
			}
	},'inBtnAceptar');
}



function despliegaEventos(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('evGrid')){
    	layout = [[	    { name: 'idConsecutivo', field: 'idConsecutivo', width: '5px',hidden:true},
	    	           	  { name: 'idEvento', field: 'cEvento', width: '5px',hidden:true},
		    		      { name: 'EVENTOS A REALIZAR', field: 'nomEvento',  width:'405px'},
		    		      { name: 'fechaHorariosProgramados', field: 'fechaHorariosProgramados', width: '5px',hidden:true},
		    		      { name: 'idFuente', field: 'fuenteRecursos', width: '5px',hidden:true},
		    		      { name: 'nombreOtroEvento', field: 'nomOtroEvento', width: '5px',hidden:true},
		    		      { name: 'fuenteRecursos', field: 'idFuente', width: '5px',hidden:true},
		    		      { name: 'nombreOtraFuente', field: 'nomOtroFr', width: '5px',hidden:true}
		    		    
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
		
		progEventos = segundaSesionObj.eventos?segundaSesionObj.eventos:[];
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
			label : " Editar ",
			id:'e_evGrid',
			onClick : function() {					
				var index = registry.byId('evGrid').selection.selectedIndex;    											
				if(index!=-1){												
					var item = registry.byId('evGrid').getItem(index);
					
                	var itemToEdit={selectedItem:index,
	                    			idConsecutivo: registry.byId('evGrid').store.getValue(item, 'idConsecutivo'),
	                    			cEvento: registry.byId('evGrid').store.getValue(item, 'cEvento'),
	                    			fechaHorariosProgramados: registry.byId('evGrid').store.getValue(item, 'fechaHorariosProgramados'),
	                    			fuenteRecursos: registry.byId('evGrid').store.getValue(item, 'fuenteRecursos'),
	                    			nomOtroEvento: registry.byId('evGrid').store.getValue(item, 'nomOtroEvento'),
	                    			nomOtroFr: registry.byId('evGrid').store.getValue(item, 'nomOtroFr')
	                    			
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
layout = [[    { name: 'idConsecutivo', field: 'idConsecutivo', width: '5px',hidden:true},
              { name: 'cEstimulo', field: 'cEstimulo',  width:'1px',hidden:true},
                  { name: 'PROPUESTA DE EST\u00cdMULOS Y RECONOCIMIENTOS DE CAR\u00c1CTER SOCIAL ', field: 'tipoEstimulo',  width:'430px'},
                   { name: 'nombreOtroEstimulo', field: 'nomOtroEstimulo', width: '5px',hidden:true},
                  { name: 'candidato', field: 'candidato',  width:'1px',hidden:true},
                  { name: 'CANDIDATOS PARA RECIBIR LOS EST\u00cdMULOS Y RECONOCIMIENTOS', field: 'tipoCandidato',  width:'430px'}
                  
           ]];
     
tmpEstimulo = segundaSesionObj.estimulos?segundaSesionObj.estimulos:[];
            
            var dataJsonStoreEstimulos = {
                   identifier: 'idConsecutivo',
                   items: tmpEstimulo
            };

            maxIndexEstimulos = tmpEstimulo.length;
            
            
     
     tablaGrid1=  '<table border="0" align="left" width= "900px">'+
                          '<tr>' +
                                '<td width= "450px"><span class="sub" align="left"></span></td>'+
                          '<tr>'+
                          '      <td><input id="eGrid"/></td>'+
                          '</tr>'+
                          '<tr>' +
                          '<td>'+
                                '<input id="a_eGrid"/>'+
                                '<input id="e_eGrid"/>'+
                                '<input id="d_eGrid"/>'+
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
            label : " Editar ",
            id:'e_eGrid',
            onClick : function() {     
                   var index = registry.byId('eGrid').selection.selectedIndex;                                                                           
                   if(index!=-1){                                                                                
                          var item = registry.byId('eGrid').getItem(index);
            var itemToEdit={selectedItem:index,
                                       idConsecutivo: registry.byId('eGrid').store.getValue(item, 'idConsecutivo'),                                                  
                                       cEstimulo: registry.byId('eGrid').store.getValue(item, 'cEstimulo'),
                                       tipoEstimulo: registry.byId('eGrid').store.getValue(item, 'tipoEstimulo'),
                                       candidato: registry.byId('eGrid').store.getValue(item, 'candidato'),
                                       tipoCandidato: registry.byId('eGrid').store.getValue(item, 'tipoCandidato'),
                                       nomOtroEstimulo: registry.byId('eGrid').store.getValue(item, 'nomOtroEstimulo'),
                                       
                                       };                               
            estimulos(itemToEdit);
          
                   } else{
            utils.cstmAlert(
                                'Debe seleccionar solo un registro.');
            }                                 
            }
     }, 'e_eGrid');

		new Button({
		            label : " Eliminar",
		            id: 'd_eGrid',      
		            onClick : function() {
		                   eliminaRow(registry.byId('eGrid'));
		            }
		     }, 'd_eGrid');
		             
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
		
		progAsuSeg = segundaSesionObj.asunto?segundaSesionObj.asunto:[];
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
	function despliegaPreguntas(crea){
		if(crea){
			if(!registry.byId(id)){
				if(!registry.byId('pregunta1a')){
		   //var id="preguntasPane"; 
		   var contenido= '<table border="0" align="lefth" >'+ 
		   '<tr><td>'+ 
		   '	<p> <b>El Consejo Escolar sabe si est\u00e1 constituido el Consejo Municipal de Participaci\u00f3n Social en la Educaci\u00f3n</b></p>'+
		   '	<input id="pregunta1a"/><label for="pregunta1a">S\u00ed est\u00e1 constituido</label>'+ 
		   '	<br/><input id="pregunta1b"/><label for="pregunta1b">No est\u00e1 constituido</label>'+
		   '	<br/><input id="pregunta1c"/><label for="pregunta1c">No sabe</label>'+
		   '</td></tr>'+
		   '<tr><td>'+ 
		   '	<p> <b>El Consejo Escolar sabe si est\u00e1 constituido el Consejo Estatal de Participaci\u00f3n Social en la Educaci\u00f3n</b></p>'+
		   '	<input id="pregunta2a"/><label for="pregunta2a">S\u00ed est\u00e1 constituido</label>'+ 
		   '	<br/><input id="pregunta2b"/><label for="pregunta2b">No est\u00e1 constituido</label>'+
		   '	<br/><input id="pregunta2c"/><label for="pregunta2c">No sabe</label>'+
		   '</td></tr>'+
		  
		  '</table>';
		  
		   dom.byId('preguntasPane').innerHTML=contenido;
		   
				    var pregunta1a= new RadioButton({
				           checked:segundaSesionObj.preguntas2==null?true: segundaSesionObj.preguntas2.respuesta1==1 ? true:false,
				           value: "1",
				           name: "pregunta1",
				           id:"pregunta1a"
				       }, "pregunta1a");
					   
					  var pregunta1b=new RadioButton({
				           checked:segundaSesionObj.preguntas2==null?false: segundaSesionObj.preguntas2.respuesta1==2 ? true:false,
				           value: "2",
				           name: "pregunta1",
				           id:"pregunta1b"
				       }, "pregunta1b");
					  
					  var pregunta1c=new RadioButton({
				           checked:segundaSesionObj.preguntas2==null?false: segundaSesionObj.preguntas2.respuesta1==3 ? true:false,
				           value: "3",
				           name: "pregunta1",
				           id:"pregunta1c"
				       }, "pregunta1c");
					  
					  var pregunta2a= new RadioButton({
				           checked:segundaSesionObj.preguntas2==null?true: segundaSesionObj.preguntas2.respuesta2==1 ? true:false,
				           value: "1",
				           name: "pregunta2",
				           id:"pregunta2a"
				       }, "pregunta2a");
					   
					  var pregunta2b=new RadioButton({
				           checked: segundaSesionObj.preguntas2==null?false:segundaSesionObj.preguntas2.respuesta2==2 ? true:false,
				           value: "2",
				           name: "pregunta2",
				           id:"pregunta2b"
				       }, "pregunta2b");
					  
					  var pregunta2c=new RadioButton({
				           checked: segundaSesionObj.preguntas2==null?false:segundaSesionObj.preguntas2.respuesta2==3 ? true:false,
				           value: "3",
				           name: "pregunta2",
				           id:"pregunta2c"
				       }, "pregunta2c");
					  			   
					
			   	}
			}
		}
		else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}		      			 	
	
	function seguimientoFederal(itemToEdit,sesionPrograma){
	    //----------------------------Diseño de la ventana
    	var title = 'Programa federal';
    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
    	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
    	
    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    jsUtils.createTag('div','prCnt','dcDetail');
	   if( sesionPrograma==1){
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
				    			   '  <tr><td><b>Monto registrado en la primera sesi\u00F3n:</b>'+
				    			   '    <input id="monto"/><b>Letra:</b><input id="montoStr"/></td> '+
				    			   '  </tr> '+
				    			   '<tr><td>'+ 
				    			   '	<p> <b>\u00BFHubo un cambio en el monto recibido con respecto a la primera sesi\u00F3n?</b></p>'+
				    			   '	<input id="preguntaMontoa"/><label for="preguntaMontoa">S\u00ed</label>'+ 
				    			   '	<br/><input id="preguntaMontob"/><label for="preguntaMontob">No</label>'+
				    			   '</td></tr>'+
				    		       '  <tr style="display: none" id="montoVisible"><td><b>Nuevo monto:</b>'+
				    			   '    <input id="monto2Sesion"/><b>Letra:</b><input id="montoStr2Sesion"/></td> '+
				    			   '  </tr> '+
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
				    			   '</table>';
	   }
	   else{
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
		   '</table>';   
	   }
	 //	  monto2Sesion@
     //   montoStr2Sesion
     //   cambioMonto
     //   monto
     //   montoStr
	    
	    
	    var layoutDt = [[	
	                     	{ name: 'No.', field:'idObjetivo', width: '20px'},		          		    
		          			{ name: 'Objetivos especificos del programa', field: 'objetivo', width: '220px'},        			          				
		          			{ name: 'Meta de la escuela', field: 'meta', width: '250px' },
		          			{ name: '*Avance en Metas', field: 'avance', 
	          					editable: true, 
	          					width: '200px', 
	          					type: dojox.grid.cells.ComboBox,
	          	                options: ["Metas sin avance por falta de liberaci\u00f3n del recurso",
	          	                          "Las metas est\u00e1n retrasadas de acuerdo con lo previsto a la fecha",
	          	                          "El avance de metas est\u00e1 de acuerdo con lo previsto a la fecha",
	          	                          "Las metas van adelantadas de acuerdo con lo previsto a la fecha"
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
		var dataDtA = {
          		identifier: "idActividad",
          		items: []
      	};
	 		
		nomOtro = "";
		objOtro = "";
		metaOtro = "";
		otroRecurso = "";
		idSeguimiento = itemToEdit.seguimiento;

		if(itemToEdit != null){
			
			if(itemToEdit.cPrograma>=81){
        		dom.byId('otro1Visible').style.display='block';
    			dom.byId('otro2Visible').style.display='block';
    			dom.byId('otro3Visible').style.display='block';
    			dom.byId('otro4Visible').style.display='block';
    			registry.byId('GridDt').set("style","display:none");
    			
    			for(var idI in tDetalle){    							
		        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
		        		nomOtro  = tDetalle[idI].nomOtroPrograma;
		        		objOtro  = tDetalle[idI].objetivo;
		    			metaOtro = tDetalle[idI].meta;
		    			itemToEdit.avance = tDetalle[idI].seguimiento;
		    			idSeguimiento = tDetalle[idI].avance;
		    			itemToEdit.monto2Sesion=tDetalle[idI].monto2Sesion;
		    			itemToEdit.montoStr2Sesion=tDetalle[idI].montoStr2Sesion;
		    			itemToEdit.cambioMonto=tDetalle[idI].cambioMonto;
		        	}
//		        	else{
//		        		if(itemToEdit.cPrograma==81){
//		        		nomOtro  = itemToEdit.nomOtroPrograma;
//		        		objOtro  = itemToEdit.objetivo;
//		    			metaOtro = itemToEdit.meta;
//		        		}
//		        		if(itemToEdit.cPrograma==82){
//			        		nomOtro  = itemToEdit.nomOtroPrograma;
//			        		objOtro  = itemToEdit.objetivo;
//			    			metaOtro = itemToEdit.meta;
//			        		}
//		    			
//		        	}
    			}
    			   			    				        		        	
        	} else {
        		dom.byId('otro1Visible').style.display='none';
    			dom.byId('otro2Visible').style.display='none';
    			dom.byId('otro3Visible').style.display='none';
    			dom.byId('otro4Visible').style.display='none';

        		for(var idI in tDetalle){    							
		        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
		        		tmpAvance = "";
		        		                                                    
		        		if(tDetalle[idI].avance == 1){
							tmpAvance = "Metas sin avance por falta de liberaci\u00f3n del recurso";
		        		} else if(tDetalle[idI].avance == 2){
		        			tmpAvance = "Las metas est\u00e1n retrasadas de acuerdo con lo previsto a la fecha";
		        		}else if(tDetalle[idI].avance == 3){
		        			tmpAvance = "El avance de metas est\u00e1 de acuerdo con lo previsto a la fecha";
		        		}else if(tDetalle[idI].avance == 4){
		        			tmpAvance = "Las metas van adelantadas de acuerdo con lo previsto a la fecha";
		        		}
		        		
		        		var arregloObjetivos1 = {              	
		                      	idActividad: tDetalle[idI].idDetalle,
		                      	idObjetivo: tDetalle[idI].idObjetivo,
		        	        	objetivo : tDetalle[idI].objetivo,
		        	        	actividad : tDetalle[idI].objetivo,
		        	        	meta: tDetalle[idI].meta,
		        	        	avance: tmpAvance
		        	        	
		        		};
		        		dataDtA.items.push(arregloObjetivos1);
		        		itemToEdit.avance = tDetalle[idI].seguimiento;
		        		itemToEdit.monto2Sesion=tDetalle[idI].monto2Sesion;
    			        itemToEdit.montoStr2Sesion=tDetalle[idI].montoStr2Sesion;
    			        itemToEdit.cambioMonto=tDetalle[idI].cambioMonto;
		        	}		        				
    			}        		        		
        	}
		}

	    var newStoreDtA = new ItemFileWriteStore({data: dataDtA});
        registry.byId('GridDt').setStore(newStoreDtA);
                       
        var data=[{name:"[Seleccione]",   id:"0"}];
        
        for(var a in federalesStore){
             data.push({name:federalesStore[a].nomPrograma,
                          id:federalesStore[a].cPrograma});
        }
     
        var pStore = new Memory({
            data: data
        });
                		
        var aSeguimiento= new Array(	{label:"Metas sin avance por falta de liberaci\u00f3n del recurso", value:1},
        								{label:"Las metas est\u00e1n retrasadas de acuerdo con lo previsto a la fecha", value:2},
        								{label:"El avance de metas est\u00e1 de acuerdo con lo previsto a la fecha", value:3},
        								{label:"Las metas van adelantadas de acuerdo con lo previsto a la fecha", value:4} );
         
        
        var dataSeguimiento=[{name:"[Seleccione]",   id:"0"}];
        
        for(var a in aSeguimiento){
        	dataSeguimiento.push({name:aSeguimiento[a].label,
                          			id:aSeguimiento[a].value});
        }
     
        var avances=[];
        
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

        
        var segStore = new Memory({
            data: dataSeguimiento
        });
                                     
	    //---------------------------------- Dojo
        if( sesionPrograma==1){
        var preguntaMontoa= new RadioButton({
	           checked:itemToEdit.cambioMonto==null?false: itemToEdit.cambioMonto==1 ? true:false,
	           value: "1",
	           name: "preguntaMonto",
	           id:"preguntaMontoa"
	       }, "preguntaMontoa").on('click',function(){
	    	   dom.byId('montoVisible').style.display='block';
	    	 
	       });
		   
		  var preguntaMontob=new RadioButton({
	           checked:itemToEdit.cambioMonto==null?true: itemToEdit.cambioMonto==2 ? true:false,
	           value: "2",
	           name: "preguntaMonto",
	           id:"preguntaMontob"
	       }, "preguntaMontob").on('click',function(){
	    	   dom.byId('montoVisible').style.display='none';
	    	 
	       });
		  
		  if(registry.byId('preguntaMontoa').checked){
		    	dom.byId('montoVisible').style.display='block';
		    }
		    else{
		    	dom.byId('montoVisible').style.display='none';
		    }
		  
			var monto=  new ValidationTextBox({
		           promptMessage:"Capture solo n\u00FAmeros",
		           id:'monto',
		           regExp: constants.NUMBER_VALID,
		           value:itemToEdit.monto, 
		           trim:"true",  
		           maxLength:"9",
		           readOnly:true,
		           required: "true",
		           style:"display:block; width:280px"
		        }, 'monto').on ('Blur', function(){	   
					   var monto= registry.byId("monto").get('value');		       
					   	if(monto!=''){			       
					       if(monto==0){
					    	   registry.byId('montoStr').set('value','CERO');
					       } else if(monto>=0){			    	   
					    		registry.byId('montoStr').set('value',jsUtils.covertirNumLetras(registry.byId("monto").get('value')));    					    	   
					       } else{
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
		           required: "true"
		        }, 'montoStr');
			    
				var monto2Sesion=  new ValidationTextBox({
			           promptMessage:"Capture solo n\u00FAmeros",
			           id:'monto2Sesion',
			           regExp: constants.NUMBER_VALID,
			           value:itemToEdit.monto2Sesion, 
			           trim:"true",  
			           maxLength:"9",
			           required: "true",
			           style:"display:block; width:280px"
			        }, 'monto2Sesion').on ('Blur', function(){	   
						   var monto2Sesion= registry.byId("monto2Sesion").get('value');		       
						   	if(monto2Sesion!=''){			       
						       if(monto2Sesion==0){
						    	   registry.byId('montoStr2Sesion').set('value','CERO');
						       } else if(monto2Sesion>=0){			    	   
						    		registry.byId('montoStr2Sesion').set('value',jsUtils.covertirNumLetras(registry.byId("monto2Sesion").get('value')));    					    	   
						       } else{
						    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
									return false;
						       }
					       	}
			        });
					    
				    var montoLetra2Sesion= new ValidationTextBox({
			           promptMessage:"Capture solo letras",
			           value:itemToEdit.montoStr2Sesion, 
			           regExp:constants.NoNUMBER_VALID,
			           id:'montoStr2Sesion',
			           trim:"true",    
			           maxLength:"200",
			           style:"display:block; width:480px",
			           readOnly: true,
			           required: "true"
			        }, 'montoStr2Sesion');
		  
        }
		new ValidationTextBox({
			name : "otroDt",
			id : "otroDt",
			value: otroRecurso,
			promptMessage : "Capture otro recurso",
			trim : true,
			style : "display:none;width:280px",
			maxLength: 255,
			placeHolder : "Especifique OTRO Recurso no econ\u00f3mico",
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

        var programa = new FilteringSelect({
           id: 'prSelect',
           value:itemToEdit.cPrograma,
           store: pStore,
           readOnly:true,
           searchAttr: 'name'
        }, 'prSelect');
        	   		   
	 // Campo nombre otro Programa
	    var nomOtroPrograma = new ValidationTextBox({
		           promptMessage:"Nombre de Otro Programa",
		           value : nomOtro,
		           trim:"true",   
		           uppercase: true,
		           maxLength:"250",
		           readOnly:true,
		           style:"display:block; width:280px"
		        }, 'nomOtroPrograma');
	    
	    var strObjetivo = new ValidationTextBox({
          promptMessage:"Objetivo especifico del programa",
          value: objOtro,
          trim:"true",
          uppercase: true,
          maxLength:"250",
          readOnly:true,
          style:"display:block; width:280px"
       }, 'strObjetivo');
	   
		var strMeta = new ValidationTextBox({
          promptMessage:"Meta de la escuela",
          value:metaOtro,
          trim:"true",
          uppercase: true,
          maxLength:"250",
          readOnly:true,
          style:"display:block; width:280px"
       }, 'strMeta');
		
		var seguimiento = new FilteringSelect({
	           id: 'seguimientoSelect',
	           value:idSeguimiento,
	           store: segStore,
	           searchAttr: 'name',
	           style:"width:480px"
	        }, 'seguimientoSelect');
		
		
	    //------------------------------------
	    jsUtils.createTag('div','prBtnAceptar','dcDetail');
	    new Button({ 
		   label : " Aceptar " ,
		   onClick : function() {
			   var detGrid = registry.byId('GridDt');
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
						   if(itemToEdit.cPrograma>=81){
							   if(gridRNE.store.getValue(item2,'meta')==null || gridRNE.store.getValue(item2,'meta')==''){
								   utils.cstmAlert('En recursos no econ\u00f3micos, de la opci\u00f3n seleccionada especifique en el recuadro de la derecha correspondiente');
			                          return false; 
							   }
							   else{
								   otrosCuales += ",="+gridRNE.store.getValue(item2,'meta');
							   }
						   }
						   else{
							   if(gridRNE.store.getValue(item2, "objetivo")=="Otros"){
								   otrosCuales += ",="+registry.byId("otroDt").get('value');
							   }
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
							
							for(var idI in tDetalle){    							
					        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
					        		for ( var i = 0; i < detGrid.rowCount; i++) {
				    					var item2 = detGrid.getItem(i);		
				    					if( detGrid.store.getValue(item2,'idObjetivo') == tDetalle[idI].idObjetivo){
				    						tmpAvance = detGrid.store.getValue(item2,'avance');			        		                                                    
							        		if(tmpAvance == "Metas sin avance por falta de liberaci\u00f3n del recurso"){								
												tDetalle[idI].avance = 1;
							        		} else if(tmpAvance == "Las metas est\u00e1n retrasadas de acuerdo con lo previsto a la fecha"){			        			
							        			tDetalle[idI].avance = 2;
							        		}else if(tmpAvance == "El avance de metas est\u00e1 de acuerdo con lo previsto a la fecha"){			        			
							        			tDetalle[idI].avance = 3;
							        		}else if(tmpAvance == "Las metas van adelantadas de acuerdo con lo previsto a la fecha"){			        			
							        			tDetalle[idI].avance = 4;
							        		}							        		
				    					}				        		    
					        		}
					        	tDetalle[idI].seguimiento=tSeguimiento;
					        	tDetalle[idI].monto2Sesion=registry.byId("monto2Sesion").get('value');
		    			        tDetalle[idI].montoStr2Sesion=registry.byId("montoStr2Sesion").get('value');
		    			        tDetalle[idI].cambioMonto=registry.byId('preguntaMontoa').checked?1:2;
					        	
					        	}
							}
						} else {
							for(var idI in tDetalle){    							
					        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){			    											
									tDetalle[idI].avance = registry.byId("seguimientoSelect").get('value');
			    					tDetalle[idI].seguimiento=tSeguimiento;	
			    				   	tDetalle[idI].monto2Sesion=registry.byId("monto2Sesion").get('value');
			    			        tDetalle[idI].montoStr2Sesion=registry.byId("montoStr2Sesion").get('value');
			    			        tDetalle[idI].cambioMonto=registry.byId('preguntaMontoa').checked?1:2;
					        	}
							}
							grid.store.setValue(item, 'seguimiento', registry.byId("seguimientoSelect").get('value'));	
						}
										
						grid.store.setValue(item, 'avance', tSeguimiento);
	
						registry.byId('dDetail').destroyRecursive(false);
					} catch(e){
							utils.cstmAlert('Ocurrio un error al Editar');
							console.log(e);
					};						
			   } else {
				    var grid = registry.byId('1_1Grid');
					try{
					//	var existeEnDetalle=0;
						var index = grid.selection.selectedIndex;
						var item = grid.getItem(index);						
						//------------------ Seguimiento diferente otros
						if(itemToEdit.cPrograma<81){
							for(var idI in tDetalle){    							
					        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
					        		existeEnDetalle = 1;
					        		for ( var i = 0; i < detGrid.rowCount; i++) {
				    					var item2 = detGrid.getItem(i);		
				    					if( detGrid.store.getValue(item2,'idObjetivo') == tDetalle[idI].idObjetivo){
				    						tmpAvance = detGrid.store.getValue(item2,'avance');			        		                                                    
							        		if(tmpAvance == "Metas sin avance por falta de liberaci\u00f3n del recurso"){								
												tDetalle[idI].avance = 1;
							        		} else if(tmpAvance == "Las metas est\u00e1n retrasadas de acuerdo con lo previsto a la fecha"){			        			
							        			tDetalle[idI].avance = 2;
							        		}else if(tmpAvance == "El avance de metas est\u00e1 de acuerdo con lo previsto a la fecha"){			        			
							        			tDetalle[idI].avance = 3;
							        		}else if(tmpAvance == "Las metas van adelantadas de acuerdo con lo previsto a la fecha"){			        			
							        			tDetalle[idI].avance = 4;
							        		}							        		
				    					}				        		    
					        		}
					        	tDetalle[idI].seguimiento=tSeguimiento;
					        	
					        	}
							}
							
						} else {
							for(var idI in tDetalle){    							
					        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){			    											
									tDetalle[idI].avance = registry.byId("seguimientoSelect").get('value');
			    					tDetalle[idI].seguimiento=tSeguimiento;	
			    				//	existeEnDetalle++;
					        	}
					     }
//							
//						if(existeEnDetalle==0){
//							tDetalle.push({
//			        			idPrograma:itemToEdit.cPrograma,
//			        			avance:registry.byId("seguimientoSelect").get('value'),
//	    					    seguimiento:tSeguimiento
//	    					    });
//								tDetalle.push();
//							}
							grid.store.setValue(item, 'seguimiento', registry.byId("seguimientoSelect").get('value'));	
						}
										
						grid.store.setValue(item, 'avance', tSeguimiento);
	
						registry.byId('dDetail').destroyRecursive(false);
					} catch(e){
							utils.cstmAlert('Ocurrio un error al Editar');
							console.log(e);
					};					   
			   }
		   }
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
	function seguimientoEstatalMunicipalOSC(option, itemToEdit,sesionPrograma){	   
		//----------------------------Diseño de la ventana
    	var title = option==2?'Programa Estatal':option==3?'Programa Municipal':'Programa OSC';
    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
    	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    jsUtils.createTag('div','prCnt','dcDetail');
	    if( sesionPrograma==1){	    
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
				    			   '  <tr><td><b>Monto registrado en la primera sesi\u00F3n:</b>'+
				    			   '    <input id="monto"/><b>Letra:</b><input id="montoStr"/></td> '+
				    			   '  </tr> '+
				    			   '<tr><td>'+ 
				    			   '	<p> <b>\u00BFHubo un cambio en el monto recibido con respecto a la primera sesi\u00F3n?</b></p>'+
				    			   '	<input id="preguntaMontoa"/><label for="preguntaMontoa">S\u00ed</label>'+ 
				    			   '	<br/><input id="preguntaMontob"/><label for="preguntaMontob">No</label>'+
				    			   '</td></tr>'+
				    		           '  <tr style="display: none" id="montoVisible"><td><b>Nuevo monto:</b>'+
				    			   '    <input id="monto2Sesion"/><b>Letra:</b><input id="montoStr2Sesion"/></td> '+
				    			   '  </tr> '+
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
				    			   '</table>'; 
	    }
		   else{
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
			   '</table>'; 
		   }
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
		
		idSeguimiento = itemToEdit.seguimiento;
        if(option==2){        	
	        if(itemToEdit!= null){	
	        	//var tDetalle = segundaSesionObj.detalleSeguimiento?segundaSesionObj.detalleSeguimiento:[];
	        	if(itemToEdit.cPrograma>=94){
	        		dom.byId('otro3Visible').style.display='block';	        		        		
        			for(var idI in tDetalle){
    		        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
    		        		nomPrograma  = tDetalle[idI].nomOtroPrograma;
    		        		objPrograma  = tDetalle[idI].objetivo;
    		        		metaPrograma = tDetalle[idI].meta;
    		        		itemToEdit.avance = tDetalle[idI].seguimiento;
    		    			idSeguimiento = tDetalle[idI].avance;
    		    			itemToEdit.monto2Sesion=tDetalle[idI].monto2Sesion;
    		    			itemToEdit.montoStr2Sesion=tDetalle[idI].montoStr2Sesion;
    		    			itemToEdit.cambioMonto=tDetalle[idI].cambioMonto;
    		        	}
        			}
        		} else {			
	        		dom.byId('otro3Visible').style.display='none';
	        		for(var idI in tDetalle){
    		        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
    		        		nomPrograma  = tDetalle[idI].nomOtroPrograma;
    		        		objPrograma  = tDetalle[idI].objetivo;
    		        		metaPrograma = tDetalle[idI].meta;
    		        		itemToEdit.avance = tDetalle[idI].seguimiento;
    		    			idSeguimiento = tDetalle[idI].avance;
    		    			itemToEdit.monto2Sesion=tDetalle[idI].monto2Sesion;
	    			        itemToEdit.montoStr2Sesion=tDetalle[idI].montoStr2Sesion;
    			            itemToEdit.cambioMonto=tDetalle[idI].cambioMonto;
    		        	}        			
	        		}
	        	}    			
    		}
	   } else if(option==3){
		  if(itemToEdit!= null){	
			  	//var tDetalle = segundaSesionObj.detalleSeguimiento?segundaSesionObj.detalleSeguimiento:[];		  
	        	if(itemToEdit.cPrograma>=109){
	        		dom.byId('otro3Visible').style.display='block';	        		
        			for(var idI in tDetalle){
    		        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
    		        		nomPrograma  = tDetalle[idI].nomOtroPrograma;
    		        		objPrograma  = tDetalle[idI].objetivo;
    		        		metaPrograma = tDetalle[idI].meta;
    		        		itemToEdit.avance = tDetalle[idI].seguimiento;
    		    			idSeguimiento = tDetalle[idI].avance;
    		    			itemToEdit.monto2Sesion=tDetalle[idI].monto2Sesion;
    		    			itemToEdit.montoStr2Sesion=tDetalle[idI].montoStr2Sesion;
    		    			itemToEdit.cambioMonto=tDetalle[idI].cambioMonto;
    		        	}
        			}
        		} else {			
	        		dom.byId('otro3Visible').style.display='none';
	        		for(var idI in tDetalle){
    		        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
    		        		nomPrograma  = tDetalle[idI].nomOtroPrograma;
    		        		objPrograma  = tDetalle[idI].objetivo;
    		        		metaPrograma = tDetalle[idI].meta;
    		        		itemToEdit.avance = tDetalle[idI].seguimiento;
    		    			idSeguimiento = tDetalle[idI].avance;
    		    			itemToEdit.monto2Sesion=tDetalle[idI].monto2Sesion;
	    			        itemToEdit.montoStr2Sesion=tDetalle[idI].montoStr2Sesion;
    			            itemToEdit.cambioMonto=tDetalle[idI].cambioMonto;
    		        	}        			
	        		}
	        	}    	
		  }
	   } else if(option==4){
		  if(itemToEdit!= null){	
			  //var tDetalle = segundaSesionObj.detalleSeguimiento?segundaSesionObj.detalleSeguimiento:[];
			  if(itemToEdit.cPrograma>=123){
	        		dom.byId('otro3Visible').style.display='block';	        		
        			for(var idI in tDetalle){
    		        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
    		        		nomPrograma  = tDetalle[idI].nomOtroPrograma;
    		        		objPrograma  = tDetalle[idI].objetivo;
    		        		metaPrograma = tDetalle[idI].meta;
    		        		itemToEdit.avance = tDetalle[idI].seguimiento;
    		    			idSeguimiento = tDetalle[idI].avance;
    		    			itemToEdit.monto2Sesion=tDetalle[idI].monto2Sesion;
    		    			itemToEdit.montoStr2Sesion=tDetalle[idI].montoStr2Sesion;
    		    			itemToEdit.cambioMonto=tDetalle[idI].cambioMonto;
    		        	}
        			}
        		} else {			
	        		dom.byId('otro3Visible').style.display='none';
	        		for(var idI in tDetalle){
    		        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
    		        		nomPrograma  = tDetalle[idI].nomOtroPrograma;
    		        		objPrograma  = tDetalle[idI].objetivo;
    		        		metaPrograma = tDetalle[idI].meta;
    		        		itemToEdit.avance = tDetalle[idI].seguimiento;
    		    			idSeguimiento = tDetalle[idI].avance;
    		    			itemToEdit.monto2Sesion=tDetalle[idI].monto2Sesion;
	    			        itemToEdit.montoStr2Sesion=tDetalle[idI].montoStr2Sesion;
    			            itemToEdit.cambioMonto=tDetalle[idI].cambioMonto;
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
		
        var aSeguimiento= new Array(	{label:"Metas sin avance por falta de liberaci\u00f3n del recurso", value:1},
				{label:"Las metas est\u00e1n retrasadas de acuerdo con lo previsto a la fecha", value:2},
				{label:"El avance de metas est\u00e1 de acuerdo con lo previsto a la fecha", value:3},
				{label:"Las metas van adelantadas de acuerdo con lo previsto a la fecha", value:4} );


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
//		        		if( items2s[0] == gridRNE1.store.getValue(item2,'idActividad')) {	        			
//			        		gridRNE1.selection.setSelected(j, true);	
//			        		gridRNE1.store.setValue(item2, 'meta', items2s[1]);
//			        		break;
//			        	}	
		        		
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

		//avanceProgSelect.addOption(avances);
        			    
	    //---------------------------------- Dojo
		 if( sesionPrograma==1){
		        var preguntaMontoa= new RadioButton({
			           checked:itemToEdit.cambioMonto==null?false: itemToEdit.cambioMonto==1 ? true:false,
			           value: "1",
			           name: "preguntaMonto",
			           id:"preguntaMontoa"
			       }, "preguntaMontoa").on('click',function(){
			    	   dom.byId('montoVisible').style.display='block';
			    	 
			       });
				   
				  var preguntaMontob=new RadioButton({
			           checked:itemToEdit.cambioMonto==null?true: itemToEdit.cambioMonto==2 ? true:false,
			           value: "2",
			           name: "preguntaMonto",
			           id:"preguntaMontob"
			       }, "preguntaMontob").on('click',function(){
			    	   dom.byId('montoVisible').style.display='none';
			    	 
			       });
				  
				  if(registry.byId('preguntaMontoa').checked){
				    	dom.byId('montoVisible').style.display='block';
				    }
				    else{
				    	dom.byId('montoVisible').style.display='none';
				    }
				  
					var monto=  new ValidationTextBox({
				           promptMessage:"Capture solo n\u00FAmeros",
				           id:'monto',
				           regExp: constants.NUMBER_VALID,
				           value:itemToEdit.monto, 
				           trim:"true",  
				           maxLength:"9",
				           readOnly:true,
				           required: "true",
				           style:"display:block; width:280px"
				        }, 'monto').on ('Blur', function(){	   
							   var monto= registry.byId("monto").get('value');		       
							   	if(monto!=''){			       
							       if(monto==0){
							    	   registry.byId('montoStr').set('value','CERO');
							       } else if(monto>=0){			    	   
							    		registry.byId('montoStr').set('value',jsUtils.covertirNumLetras(registry.byId("monto").get('value')));    					    	   
							       } else{
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
				           required: "true"
				        }, 'montoStr');
					    
						var monto2Sesion=  new ValidationTextBox({
					           promptMessage:"Capture solo n\u00FAmeros",
					           id:'monto2Sesion',
					           regExp: constants.NUMBER_VALID,
					           value:itemToEdit.monto2Sesion, 
					           trim:"true",  
					           maxLength:"9",
					           required: "true",
					           style:"display:block; width:280px"
					        }, 'monto2Sesion').on ('Blur', function(){	   
								   var monto2Sesion= registry.byId("monto2Sesion").get('value');		       
								   	if(monto2Sesion!=''){			       
								       if(monto2Sesion==0){
								    	   registry.byId('montoStr2Sesion').set('value','CERO');
								       } else if(monto2Sesion>=0){			    	   
								    		registry.byId('montoStr2Sesion').set('value',jsUtils.covertirNumLetras(registry.byId("monto2Sesion").get('value')));    					    	   
								       } else{
								    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
											return false;
								       }
							       	}
					        });
							    
						    var montoLetra2Sesion= new ValidationTextBox({
					           promptMessage:"Capture solo letras",
					           value:itemToEdit.montoStr2Sesion, 
					           regExp:constants.NoNUMBER_VALID,
					           id:'montoStr2Sesion',
					           trim:"true",    
					           maxLength:"200",
					           style:"display:block; width:480px",
					           readOnly: true,
					           required: "true"
					        }, 'montoStr2Sesion');
				  
                                       }
		var nomOtroPrograma = new ValidationTextBox({
	           promptMessage:"Nombre de Otro Programa",
	           value:nomPrograma, 
	           trim:"true",
	           readOnly:true,
	           uppercase: true,
	           maxLength:"250",
	           required: "true",
	           style:"display:block; width:280px"
	        }, 'nomOtroPrograma');
		
	    var prSelect = new FilteringSelect({
           id: 'prSelect',
           value:itemToEdit.cPrograma,
           store: pStore,
           readOnly:true,
           searchAttr: 'name'
        }, 'prSelect');
		    		   		   
	    var strObjetivo = new ValidationTextBox({
           promptMessage:"Objetivo especifico del programa",
           value:objPrograma, 
           trim:"true",
           readOnly:true,
           uppercase: true,
           maxLength:"250",
           style:"display:block; width:280px"
        }, 'strObjetivo');
		   
		var strMeta = new ValidationTextBox({
           promptMessage:"Meta de la escuela",
           value:metaPrograma, 
           trim:"true",  
           readOnly:true,
           uppercase: true,
           maxLength:"250",
           style:"display:block; width:280px"
        }, 'strMeta');
			  	    				
		var seguimiento = new FilteringSelect({
	           id: 'seguimientoSelect',
	           value:idSeguimiento,
	           store: segStore,
	           searchAttr: 'name',
	           style:"width:480px"
	        }, 'seguimientoSelect');
		
		
		
	    //------------------------------------
//		avanceProgSelect.on('click', function() {
//			muestra(avanceProgSelect);
//		});
//	   
//	    muestra(avanceProgSelect);
	   
	    jsUtils.createTag('div','prBtnAceptar','dcDetail');
		   			    
	    new Button({
			label : " Aceptar ",
			onClick : function() {
					var grid;
					
					if (registry.byId("seguimientoSelect").get('value')==null || registry.byId("seguimientoSelect").get('value') == 0){  
						utils.cstmAlert('Favor de registrar el avance');
						return false;
					}	
					
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
				    
				    gridRNE = registry.byId('avanceOtroDt');
				    
				    var otrosCuales = "";
				    if(rneSeleccionados.length>0){
					   for ( var j = 0; j < gridRNE.rowCount; j++) {
						   var item2 = gridRNE.getItem(j);
						   if( array.indexOf(rneSeleccionados,gridRNE.store.getValue(item2,'idActividad'))!=-1 ){
							   otrosCuales += gridRNE.store.getValue(item2,'idActividad');
							   if((option==2 && itemToEdit.cPrograma>=94) || (option==3 && itemToEdit.cPrograma>=109) || (option==4 && itemToEdit.cPrograma>=123)){
								   if(gridRNE.store.getValue(item2,'meta')==null || gridRNE.store.getValue(item2,'meta')==''){
									   utils.cstmAlert('En recursos no econ\u00f3micos, de la opci\u00f3n seleccionada especifique en el recuadro de la derecha correspondiente');
									   	return false; 
								   }
								   else{
									   otrosCuales += ",="+gridRNE.store.getValue(item2,'meta');
								   }	
							   }
							   else{
							   		if(gridRNE.store.getValue(item2, "objetivo")=="Otros"){
							   			if(registry.byId("otroDt").get('value')==null || registry.byId("otroDt").get('value') == ''){
							   				utils.cstmAlert('Favor de registrar el OTRO Recurso no econ\u00f3mico');
							   				return false;
							   			}
							   			else{
							   			otrosCuales += ",="+registry.byId("otroDt").get('value');
							   		        }
							   		}
							   }
							   otrosCuales += ",-";
						   }
					   }
					//   alert(otrosCuales);
				    }
				   
					//var tSeguimiento = otrosCuales;
						
				    var tAvance = otrosCuales;
//					for ( var j = 0; j < data.length; j++) {
//						if (data[j].selected == true) {
//							tAvance += data[j].value+",";
//							if(data[j].value==8){
//								tAvance += registry.byId("otroDt").get('value');
//							}
//						};
//					}
					try{	
						for(var idI in tDetalle){    							
				        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){
				        		tDetalle[idI].avance=registry.byId("seguimientoSelect").get('value');
				        		tDetalle[idI].seguimiento=tAvance;
				        		if( sesionPrograma==1){	
				        		tDetalle[idI].monto2Sesion=registry.byId("monto2Sesion").get('value');
				    			tDetalle[idI].montoStr2Sesion=registry.byId("montoStr2Sesion").get('value');
			    			    tDetalle[idI].cambioMonto=registry.byId('preguntaMontoa').checked?1:2;
				        		}
								}
						}
																
						grid.store.setValue(item, 'avance', tAvance);
						grid.store.setValue(item, 'seguimiento', registry.byId("seguimientoSelect").get('value'));
						
						registry.byId('dDetail').destroyRecursive(false);
					} catch(e){
							utils.cstmAlert('Ocurrio un error al Editar');
							console.log(e);
					};						
			   }
		},'prBtnAceptar');
    }	
	function editarNormalidad(itemToEdit){
		var edit=false;
	    if(!itemToEdit){
		   itemToEdit={idNormalidad:0 ,cNormalidad: 0,accion1:'',acion2:'',descripcion:''};
	    }else{
		   edit=true;
	    }
		var title ='Normalidad M\u00EDnima';
    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
    	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    jsUtils.createTag('div','prCnt','dcDetail');
		    
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
				    '<tr><td>'+
					   '	<b>*Normalidad: </b><div id="prSelectN" /><br/>'+
					   '</td></tr>'+
					   '<tr><td>'+
					   '	<b>*Primera acci\u00F3n: </b><div id="accion1" /><br/>'+
					   '</td></tr>'+
					   '<tr><td>'+
	    			   '	<b>Avance: </b><div id="avanceAccion1" /><br/>'+
	    			   '</td></tr>'+
					   '<tr><td>'+
					   '	<b>Segunda acci\u00F3n: </b><div id="accion2" /><br/>'+
					   '</td></tr>'+
					   '<tr><td>'+
	    			   '	<b>Avance: </b><div id="avanceAccion2" /><br/>'+
	    			   '</td></tr>'+
					   '</table>';     			         			    
			listNormalidad = new Array();
			listNormalidad.push({name:"Nuestra escuela brinda el servicio educativo durante todos los d\u00EDas establecidos en el calendario escolar",id:1});
			listNormalidad.push({name:"Todos los grupos tienen maestros todos los d\u00EDas del ciclo escolar.",id:2});
			listNormalidad.push({name:"Todos los maestros inician puntualmente sus actividades.",id:3});
			listNormalidad.push({name:"Todos los alumnos asisten puntualmente a todas las clases",id:4});
			listNormalidad.push({name:"Todos los materiales est\u00E1n a disposici\u00F3n de cada estudiante y se usan sistem\u00E1ticamente",id:5});
			listNormalidad.push({name:"Todo el tiempo escolar se ocupa fundamentalmente en actividades de aprendizaje.",id:6});
			listNormalidad.push({name:"Las actividades en las aulas logran que todos los alumnos participen activamente en el trabajo de la clase.",id:7});
			listNormalidad.push({name:"Todos los alumnos consolidan su dominio de la lectura, la escritura y las matem\u00E1ticas de acuerdo con su grado educativo.",id:8});
			
			
			//---------------------------------- Dojo     			   
		    var data=[{name:"[Seleccione]",	id:"0"},
		              {name:"Retrasado de acuerdo con lo previsto a la fecha.",	id:"1"},
		              {name:"De acuerdo con lo previsto a la fecha.",	id:"2"},
		              {name:"Adelantado de acuerdo con lo previsto a la fecha.",	id:"3"}];
	    		    		   
		    var pStore1 = new Memory({
		        data: data
		    });	
		   
		    var dataR=[{name:"[Seleccione]",	id:"0"} ];
	           
	       var dataN=[{name:"[Seleccione]",	id:0} ];
			
			for(var index in listNormalidad){
			dataN.push(listNormalidad[index]);
			}
			 
			var pStoreN = new Memory({
			data: dataN
			});
		    
		   var avanceAccion1 = new FilteringSelect({
	           id: 'avanceAccion1',
	           value:itemToEdit.opcionCasiSiempre==null?0:itemToEdit.opcionCasiSiempre,
	           store: pStore1,
	           //readOnly:true,
	           searchAttr: 'name',
	        	   style:"display:block; width:450px",
	        }, 'avanceAccion1');
		  
		   
		   var avanceAccion2 = new FilteringSelect({
	           id: 'avanceAccion2',
	           value:itemToEdit.opcionSiempre==null?0:itemToEdit.opcionSiempre,
	           store: pStore1,
	           //readOnly:true,
	           searchAttr: 'name',
	        	   style:"display:block; width:450px",
	        }, 'avanceAccion2');
		
			
			
			var prSelectN = new FilteringSelect({
			id: 'prSelectN',
			value:itemToEdit.cNormalidad,
			store: pStoreN,
			width:100,
			style:"display:block; width:450px",
			readOnly:edit,
			searchAttr: 'name'
			}, 'prSelectN');
			
			
			var accion1= new ValidationTextBox({    		           
			value:itemToEdit.accion1, 
			trim:"true",    
			maxLength:"250",
			required:true,
			uppercase: true,
			readOnly:edit,
			style:"display:block; width:450px"
			}, 'accion1');
			
			var accion2= new ValidationTextBox({	   		           
			value:itemToEdit.accion2, 
			trim:"true",    
			maxLength:"250",
			readOnly:edit,
			//required:true,
			uppercase: true,
			style:"display:block; width:450px"
			}, 'accion2');	     			       	
					    		   		   
	
		   					  	    				
	    //------------------------------------
	    jsUtils.createTag('div','prBtnAceptar','dcDetail');
		   			    
	    new Button({
    				label : " Aceptar ",
    				onClick : function() {
    					
    					var grid; 
    					var grid = registry.byId('nGrid');
    					
    					if(registry.byId("avanceAccion1").get('value')==0)
    					{
    						utils.cstmAlert('Favor de selecionar una respuesta para el avance de la primera acci\u00F3n');
    						return false;
    					}
    					
    					
    					if(registry.byId("accion2").get('value')!='' && registry.byId("accion2").get('value')!=null){
    						if(registry.byId("avanceAccion2").get('value')==0)
        					{
        						utils.cstmAlert('Favor de selecionar una respuesta para el avance de la segunda acci\u00F3n');
        						return false;
        					}
    						}
    						else
    							{
    							registry.byId("avanceAccion2").set('value',0);
    							
    							}
    					
    					if(!edit){
    					for ( var i = 0; i < grid.rowCount; i++) {
    	 	        		
    	 	 				var item = grid.getItem(i);
    	 	 				
    	 	 				if( grid.store.getValue(item,'cNormalidad') == registry.byId("prSelectN").get('value')){
    	 	 					utils.cstmAlert("Ya esta registrada esa normalidad");
    	 	 					return;
    	 	 				}

    	 	 			} 		
    					}
    					
    				    var grid = registry.byId('nGrid');
    				    var index = grid.selection.selectedIndex;
    				    var item = grid.getItem(index);
    					try{
    						if(edit){
    							var index = grid.selection.selectedIndex;
    							var item = grid.getItem(index);
    							
    							grid.store.setValue(item, 'accion1', registry.byId("accion1").get('value'));
    							grid.store.setValue(item, 'accion2', registry.byId("accion2").get('value'));
    							grid.store.setValue(item, 'opcionCasiSiempre', registry.byId("avanceAccion1").get('value'));
    							grid.store.setValue(item, 'opcionSiempre', registry.byId("avanceAccion2").get('value'));
    							
    							
    							} else {
    							 var myNewItem = { idNormalidad: ++maxIndexNormalidad,
    									 cNormalidad:  registry.byId("prSelectN").get('value'),
    									 descripcion:  registry.byId("prSelectN").get('displayedValue'),
    									 accion1:      registry.byId("accion1").get('value'), 
    									 accion2:      registry.byId("accion2").get('value'),
    									 opcionCasiSiempre: registry.byId("avanceAccion1").get('value'),
     							         opcionSiempre: registry.byId("avanceAccion2").get('value'),
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
//	    						   '<tr>'+
//	    						   		'<td></br><b>*Tiene conocimiento acerca de los recursos asignados al plantel: </b></td>'+
//	    						   		'<td><div id="prSelectF"/></td>'+
//				    			   '</tr>'+
				    			   '<tr>'+
   						   				'<td></br><b>*Toma decisiones y administra los recursos conjuntamente con el director del plantel: </b></td>'+
	    						   		'<td><div id="prSelectE"/></td>'+
				    			   '</tr>'+
				    			   '<tr>'+
						   				'<td></br><b>*Recibe informaci\u00F3n por parte del director sobre los recursos asignados, pero no interviene en su administraci\u00F3n y seguimiento: </b></td>'+
	    						   		'<td><div id="prSelectM" /></td>'+
				    			   '</tr>'+
				    	//		   '<tr>'+
					    //				'<td></br><b>*La escuela no recibe recursos de programas.: </b></td>'+
   						//  			'<td><div id="prSelectOSC" /></td>'+
				    	//		   '</tr>'+
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
//	    if(itemToEdit.tprogramaFederales== null)	
//	    {
//	    	itemToEdit.tprogramaFederales=0;
//	    }
	    if(itemToEdit.tprogramaEstatales==null)	
	    {
	    	itemToEdit.tprogramaEstatales=0;
	    }
	    if(itemToEdit.tprogramaMunicipales==null)	
	    {
	    	itemToEdit.tprogramaMunicipales=0;
	    }
//	    if(itemToEdit.tprogramaOsc==null)	
//	    {
//	    	itemToEdit.tprogramaOsc=0;
//	    }
	    //---------------------------------- Dojo
//	    var prSelectF = new FilteringSelect({
//           id: 'prSelectF',
//           value:itemToEdit.tprogramaFederales,
//           store: pStore,
//           //readOnly:true,
//           searchAttr: 'name'
//        }, 'prSelectF');
	    
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
	   	
//	   	var prSelectOSC = new FilteringSelect({
//           id: 'prSelectOSC',
//           value:itemToEdit.tprogramaOsc,
//           store: pStore,
//           //readOnly:true,
//           searchAttr: 'name'
//        }, 'prSelectOSC');
	   	
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
				if(//registry.byId("prSelectF").get('value')==0 ||
				   registry.byId("prSelectE").get('value')==0 ||
				   registry.byId("prSelectM").get('value')==0 )
				 //  || 				   registry.byId("prSelectOSC").get('value')==0 )
				{
					utils.cstmAlert('Favor de selecionar una respuesta en cada apartado');
					return false;
				}
				seleccionoSi = 0;
//                if(registry.byId("prSelectF").get('value')==1)                        
//                {
//                       seleccionoSi++;
//                }
                if(registry.byId("prSelectE").get('value')==1)                        
                {
                       seleccionoSi++;
                }
                if(registry.byId("prSelectM").get('value')==1)                        
                {
                       seleccionoSi++;
                }
//                if(registry.byId("prSelectOSC").get('value')==1)                             
//                {
//                       seleccionoSi++;
//                }
                if(seleccionoSi>1 || seleccionoSi==0)                          
                {
                       utils.cstmAlert('Favor de selecionar 1 solo si');
                       return false;
                }

				
				var grid = registry.byId('rGrid');
				try{
					if(edit){
						var index = grid.selection.selectedIndex;
						var item = grid.getItem(index);
					//	grid.store.setValue(item, 'tprogramaFederales', registry.byId("prSelectF").get('value'));
						grid.store.setValue(item, 'tprogramaEstatales', registry.byId("prSelectE").get('value'));
						grid.store.setValue(item, 'tprogramaMunicipales', registry.byId("prSelectM").get('value'));
					//	grid.store.setValue(item, 'tprogramaOsc', registry.byId("prSelectOSC").get('value'));
					//	grid.store.setValue(item, 'rprogramaFederales', registry.byId("prSelectF").get('displayedValue'));
						grid.store.setValue(item, 'rprogramaEstatales', registry.byId("prSelectE").get('displayedValue'));
						grid.store.setValue(item, 'rprogramaMunicipales', registry.byId("prSelectM").get('displayedValue'));
				//		grid.store.setValue(item, 'rprogramaOsc', registry.byId("prSelectOSC").get('displayedValue'));
					} else {
						 var myNewItem = { 
							//	    tprogramaFederales: registry.byId("prSelectF").get('value'),
									tprogramaEstatales: registry.byId("prSelectE").get('value'),
									tprogramaMunicipales: registry.byId("prSelectM").get('value'),
							//		tprogramaOsc: registry.byId("prSelectOSC").get('value'),
							//		rprogramaFederales: registry.byId("prSelectF").get('displayedValue'),
									rprogramaEstatales: registry.byId("prSelectE").get('displayedValue'),
									rprogramaMunicipales: registry.byId("prSelectM").get('displayedValue'),
						//			rprogramaOsc: registry.byId("prSelectOSC").get('displayedValue')
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
	
	function compromisoAccion(itemToEdit){
		var edit=false;
	    if(!itemToEdit){
		   itemToEdit={idCompromiso: 0,idConsecutivo: 0,accion1:'',accion2:'',nomOtroCompromiso:''};
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
	              {name:"Establecer una corresponsabilidad entre madres, padres y tutores con los docentes, para fortalecer el trabajo acad\u00E9mico tanto en el sal\u00F3n de clases como en los hogares.", id:"1"},			
	              {name:"Establecer una vinculaci\u00F3n entre el Consejo T\u00E9cnico y el Consejo Escolar de Participaci\u00F3n Social, para el seguimiento del desempe\u00F1o acad\u00E9mico del alumnado.", id:"2"},			
				  {name:"Buscar que los docentes asesoren a las madres, padres y tutores de los alumnos con niveles bajos de aprendizaje. ", id:"3"},
				  {name:"El Consejo Escolar brindar\u00E1 a padres de familia una gu\u00EDa de apoyo para fortalecer el trabajo desde casa en estudiantes con bajo rendimiento.", id:"4"},
				  {name:"Promover programas y cursos sabatinos para los alumnos con niveles bajos de rendimiento escolar.", id:"5"},
				  {name:"Dise\u00F1ar tareas y actividades extras para reforzar el aprendizaje de los alumnos.", id:"6"},
				  {name:"Organizar ceremonias de reconocimiento por los logros acad\u00E9micos globales de la escuela.", id:"7"},
				  {name:"Otro", id:"8"},
				  {name:"Otro", id:"9"}];


    		    	   
	    var pStore = new Memory({
	        data: data
	    });
	    	    
	    //---------------------------------- Dojo
	    
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
	       	if(itemToEdit.idCompromiso>=8){
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
    							utils.cstmAlert('Favor de registrar los datos requeridos');
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
					   if(registry.byId("prSelectC").get('value')<=7 ){
					   if(checador<2){
						   utils.cstmAlert('Favor de registrar al menos dos acciones');
		                   return false;
					   }
					   }
					   else{
						   if(registry.byId("accion1").get('value')==null || registry.byId("accion1").get('value') == '')
							   {
							   utils.cstmAlert('Favor de registrar al menos dos acciones para el compromiso Otro');
			                   return false;
							   }
						   if(registry.byId("accion2").get('value')==null || registry.byId("accion2").get('value') == '')
						   {
						   utils.cstmAlert('Favor de registrar al menos dos acciones para el compromiso Otro');
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
							//	grid.store.setValue(item, 'compromiso',  registry.byId("prSelectC").get('displayedValue'));
							//	grid.store.setValue(item, 'idCompromiso',  registry.byId("prSelectC").get('value'));
							} else {
								 var myNewItem = {  idConsecutivo: ++maxIndexCompromiso, 
													accion1:  registry.byId("accion1").get('value'),
													accion2:  registry.byId("accion2").get('value'),
													nomOtroCompromiso:  registry.byId("nomOtroCompromiso").get('value'),
													compromiso:  registry.byId("prSelectC").get('displayedValue'),
													idCompromiso:  registry.byId("prSelectC").get('value'), 
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
		   itemToEdit={idConsecutivo: 0,cEvento:0,nomEvento:'',fuenteRecursos:0,idFuente:'',fechaHorariosProgramados:0,nomOtroEvento:'',nomOtroFr:''};
		
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
								   '	<b>*Evento a realizarse con: </b><div id="prSelectRC" /><br/>'+
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
	    
	    var dataRC=[{name:"[Seleccione]",	id:"0"},
		              {name:"Padres de Familia",	id:"1"},
		              {name:"Alumnos de otra escuela",	id:"2"},
		              {name:"Alumnos de otra zona escolar",	id:"3"},
		              {name:"Alumnos de otro municipio",	id:"4"},
		              {name:"Alumnos de otro u otros estados del pa\u00EDs",	id:"5"}];
	    		    
		    var pStoreRC = new Memory({
		        data: dataRC
		    });
		    
		
	    //---------------------------------- Dojo
	    var prSelectE = new FilteringSelect({
           id: 'prSelectE',
           value:itemToEdit.cEvento,
           store: pStore,
           width:100,
           style:"display:block; width:350px",
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
	    	   		   
//	    var  fechaEvento= new Textarea({
//	    	promptMessage:"Escriba la fecha del evento",
//           value:itemToEdit.fechaHorariosProgramados, 
//           trim:"true",
//           uppercase: true,
//           maxLength:"250",
//           style : " display:block; width:400px;"
//        }, 'fechaEvento');
		   	    			  	    		
	    var nomOtroEvento = new ValidationTextBox({
	           promptMessage:"Nombre de Otro Evento",
	           value:itemToEdit.nomOtroEvento, 
	           trim:"true",
	           uppercase: true,
	           maxLength:"250",
	           style:"display:block; width:350px"
        }, 'nomOtroEvento');
		   
	    var prSelectFr = new FilteringSelect({
	           id: 'prSelectFR',
	           value:itemToEdit.fuenteRecursos,
	           store: pStoreFR,
	           width:100,
	           style:"display:block; width:350px",
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
		   
	    var prSelectRC = new FilteringSelect({
	           id: 'prSelectRC',
	           value:itemToEdit.fechaHorariosProgramados,
	           store: pStoreRC,
	           width:100,
	           //readOnly:true,
	           searchAttr: 'name',
	           style:"display:block; width:350px"
     }, 'prSelectRC');
	    
	    var nomOtroFr = new ValidationTextBox({
	           promptMessage:"Nombre de Otra fuente de recursos ",
	           value:itemToEdit.nomOtroFr, 
	           trim:"true",
	           uppercase: true,
	           maxLength:"250",
	           //required: "true",
	           style:"display:block; width:350px"
        }, 'nomOtroFr');
	    
	    if(edit==true){	
        	if(itemToEdit.cEvento>=33){
        		dom.byId('otro3Visible').style.display='block';
        		
        		
   		} else {			
        		dom.byId('otro3Visible').style.display='none';
        		
		    
        		}
        	} else {
        	dom.byId('otro3Visible').style.display='none';
        	dom.byId('prSelectE').style.display='block';
			
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
				if(registry.byId("prSelectRC").get('value')==0)
				{
					utils.cstmAlert('Favor de selecionar un tipo de persona que realizara el evento');
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
				
				if(!edit){
				for ( var i = 0; i < grid.rowCount; i++) {
 	        		
 	 				var item = grid.getItem(i);
 	 				
 	 				if( grid.store.getValue(item,'cEvento') == registry.byId("prSelectE").get('value')){
 	 					utils.cstmAlert("Ya esta registrado ese Evento");
 	 					return;
 	 				}

 	 			}
				}
				try{
					if(edit){
						var index = grid.selection.selectedIndex;
						var item = grid.getItem(index);
						
						grid.store.setValue(item, 'fechaHorariosProgramados', registry.byId("prSelectRC").get('value'));
						grid.store.setValue(item, 'fuenteRecursos',  registry.byId("prSelectFR").get('value'));
						grid.store.setValue(item, 'nomOtroEvento',  registry.byId("nomOtroEvento").get('value'));
						grid.store.setValue(item, 'nomOtroFr',  registry.byId("nomOtroFr").get('value'));
					  } else {
						  var myNewItem = {  idConsecutivo: ++maxIndexEventos, 
											cEvento:  registry.byId("prSelectE").get('value'),
											nomEvento:  registry.byId("prSelectE").get('displayedValue'),
										    idFuente:    registry.byId("prSelectFR").get('displayedValue'),
											fuenteRecursos:registry.byId("prSelectFR").get('value'),
											fechaHorariosProgramados:  registry.byId("prSelectRC").get('value'),
											nomOtroEvento:  registry.byId("nomOtroEvento").get('value'),
											nomOtroFr:  registry.byId("nomOtroFr").get('value'),
											
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
              itemToEdit={idConsecutivo: 0,estimulo:'',candidato:0,tipoCandidato:'',cEstimulo:0,tipoEstimulo:'',nomOtroEstimulo:''};
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
                                                '   <b>*Propuesta de est\u00edmulos y reconocimientos de car\u00e1cter social : </b><div id="prSelectEs" /><br/>'+
                                                '</td></tr>'+
                                                '<tr id="otro3Visible" style="display:none"><td>'+
                                         '   <b>*Otro Estimulo:</div> </b><div id="nomOtroEstimulo"/><br/>'+
                                         '</td></tr>'+
                                         '<tr><td>'+
                                         '   <b>*Candidatos para recibir los est\u00edmulos y reconocimientos: </b><div id="prSelectCER" /><br/>'+
                                         '</td></tr>'+           
                                         '</table>'; 
         
  //---------------------------------- Datos         
  var data=[{name:"[Seleccione]",     id:"0"},
            {name:"Maestro adscrito al centro educativo.", id:"1"},
            {name:"Directivo adscrito al centro educativo.",     id:"2"},
            {name:"Trabajador de apoyo y asistencia a la educaci\u00f3n adscrito al centro educativo",  id:"3"}];
              
  var pStore = new Memory({
      data: data
  });
         
  //---------------------------------- Dojo
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
                         
                     	var gridE = registry.byId('eGrid');
 	 	 	        	if(edit){}
	    					else	
	    					{ 	 	 	        	
 	 	 	        	for ( var i = 0; i < gridE.rowCount; i++) {
 	 	 	        		
 	 	 	 				var item = gridE.getItem(i);
 	 	 	 				
 	 	 	 				if( gridE.store.getValue(item,'cEstimulo') == registry.byId("prSelectEs").get('value')){
 	 	 	 					utils.cstmAlert("Ya existe registrado ese estimulo");
 	 	 	 					return;
 	 	 	 				}

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
                               } else {
                                      var myNewItem = {  idConsecutivo: ++maxIndexEstimulos, 
                                                   
                                      //           estimulo:  registry.byId("estimulos").get('value'),
                                                   tipoEstimulo:  registry.byId("prSelectEs").get('displayedValue'),
                                                   cEstimulo:  registry.byId("prSelectEs").get('value'), 
                                                   tipoCandidato:  registry.byId("prSelectCER").get('displayedValue'),
                                                   candidato:  registry.byId("prSelectCER").get('value'),
                                                   nomOtroEstimulo:  registry.byId("nomOtroEstimulo").get('value'),
                                                   
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
								   '	<b>*Ruta: </b><div id="prSelectR" /><br/>'+
								   '</td></tr>'+
								   '<tr id="otro3Visible" style="display:none"><td>'+
								   '	<b>*Otra Ruta:</div> </b><div id="nomOtraRuta"/><br/>'+
								   '</td></tr>'+
								   '<tr><td>'+
								   '	<b>*Primera accion para coadyuvar con el cumplimiento de la ruta de mejora:  </b><div id="accion" /><br/>'+
								   '</td></tr>'+
	    						   '<tr><td>'+
				    			   '	<b>*Avance: </b><div id="prSelectAccion" /><br/>'+
				    			   '</td></tr>'+
				    			   '<tr><td>'+
								   '	<b>Segunda accion para coadyuvar con el cumplimiento de la ruta de mejora: </b><div id="recomendacion" /><br/>'+
								   '</td></tr>'+
	    						   '<tr><td>'+
				    			   '	<b>Avance: </b><div id="prSelectRecomendacion" /><br/>'+
				    			   '</td></tr>'+
				    			   '</table>'; 
	    		    
	    //---------------------------------- Datos	        
	    var data=[{name:"[Seleccione]",	id:"0"},
	              {name:"Retrasado de acuerdo con lo previsto a la fecha.",	id:"1"},
	              {name:"De acuerdo con lo previsto a la fecha.",	id:"2"},
	              {name:"Adelantado de acuerdo con lo previsto a la fecha.",	id:"3"}];
    		    		   
	    var pStore1 = new Memory({
	        data: data
	    });	
	   
	    var dataR=[{name:"[Seleccione]",	id:"0"} ];
           
	        for(var a in rutaStore){
	             dataR.push({name:rutaStore[a].nomRuta,
	                           id:rutaStore[a].cRuta});
	        }
	        		    	   
		    var pStore = new Memory({
		        data: dataR
		    });
		    
		    
		   var prSelectR = new FilteringSelect({
	           id: 'prSelectR',
	           value:itemToEdit.idRuta,
	           store: pStore,
	           width:100,
	           style:"display:block; width:450px",
	           readOnly:edit,
	           searchAttr: 'name'
	        }, 'prSelectR').on ('change', function(){     
	        	
	        	if( registry.byId("prSelectR").get('displayedValue') == "Otro" ){		    		
	    			dom.byId('otro3Visible').style.display='block';
	    			registry.byId('nomOtraRuta').set ('required',true);    			    		        			
	    		} else {    
	    			dom.byId('otro3Visible').style.display='none';
	    			registry.byId('nomOtraRuta').set ('required',false);		        
				}
	        });
		    	   		   
		        			  	    		
		    var nomOtraRuta = new ValidationTextBox({
		           promptMessage:"Nombre de Otra Ruta",
		           value:itemToEdit.nomOtraRuta, 
		           trim:"true",
		           uppercase: true,
		           maxLength:"250",
		           //required: "true",
		           style:"display:block; width:450px"
	        }, 'nomOtraRuta');
		    
		    
	    var prSelectAccion = new FilteringSelect({
           id: 'prSelectAccion',
           value:itemToEdit.avanceAccion,
           store: pStore1,
           //readOnly:true,
           searchAttr: 'name',
        	   style:"display:block; width:450px",
        }, 'prSelectAccion');
	       		   			   
		var accion = new ValidationTextBox({
	           //promptMessage:"Capture los est\u00edmulos y reconocimientos de car\u00e1cter social",
	           value:itemToEdit.accion, 
	           trim:"true",
	           readOnly:true,
	           uppercase: true,
	           maxLength:"250",
	           style:"display:block; width:450px"
        }, 'accion');
			   
	    var prSelectRecomendacion = new FilteringSelect({
	           id: 'prSelectRecomendacion',
	           value:itemToEdit.avanceRecomendacion,
	           store: pStore1,
	           //readOnly:true,
	           style:"display:block; width:450px",
	           searchAttr: 'name'
        }, 'prSelectRecomendacion');
			    		   
	    
		var recomendacion = new ValidationTextBox({
	           promptMessage:"Capture los est\u00edmulos y reconocimientos de car\u00e1cter social",
	           value:itemToEdit.recomendacion, 
	           trim:"true",
	           readOnly:true,
	           uppercase: true,
	           maxLength:"250",
	           style:"display:block; width:450px"
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
					utils.cstmAlert('Favor de selecionar una respuesta para el avance de la accion');
					return false;
				}
				if(registry.byId("recomendacion").get('value')!='' && registry.byId("recomendacion").get('value')!=null){
				if(registry.byId("prSelectRecomendacion").get('value')==0)
				{
					utils.cstmAlert('Favor de selecionar una respuesta para el avance de la recomendacion');
					return false;
				}
				}
				else
					{
					registry.byId("prSelectRecomendacion").set('value',0);
					
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
	 
	  function funFederal ( itemToEdit ){
	    	var edit=false;
		    if(!itemToEdit){
			   itemToEdit={cPrograma: 0,nomPrograma:'',monto:'', montoStr:''};
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
					    			   '	<td><input id="GridDt"/></td>'+
					    			   '</tr>'+
					    			   '<tr id="otro3Visible"  style="display:none"><td>'+
					    			   '	<b>*Otro Programa:</div> </b><div id="nomOtroPrograma"/><br/>'+
					    			   '</td></tr>'+
					    			   '<tr id="otro1Visible"  style="display:none">' +
					    			   '	<td><b>*Objetivo: </b><div id="strObjetivo" /><br/></td>'+
					    			   '</tr>'+
					    			   '<tr id="otro2Visible"  style="display:none">' +
					    			   '	<td><b>*Meta: </b><div id="strMeta" /><br/></td>'+
					    			   '</tr>'+
					    			   '<tr id="trMonto"><td> '+
					    			   '	 <b>*Recurso Asignado para ejercer en el presente ciclo escolar</b><br/>'+
					    			   'N\u00FAmero:<input id="monto"/> Letra:<input id="montoStr"/><br/>'+
					    			   '</td></tr>'+							    			   							    			   							    			   							    			   
					    			   '</table>';
			         			    
		    var layoutDt = [[	{ name: 'No.', field:'idObjetivo', width: '20px'},        			          		            			          		    
			          		    { name: 'Selecci\u00F3n de Objetivo',	
			          				    field:'idSeleccion',
			          				    width: "120px",        			          				   
			          				    type: dojox.grid.cells.Bool,
			          				    editable: true, 	hidden:true
			          			},
			          			{ name: 'Objetivos especificos del programa', field: 'objetivo', width: '415px'},        			          				
			          			{ name: 'Meta de la escuela', field: 'meta', 
			          					editable: true, 
			          					width: '250px', 
			          				    type: gridCellsDijit._Widget,
			          				    widgetClass: ValidationTextBox, 
			          				    widgetProps: {uppercase:'true', maxlength: '250'} 
			          			}
			          		]];
			         			   	    		        			    		
			new DataGrid({
	      		id: 'GridDt',
	      		structure: layoutDt,
	      		//autoHeight: 4,
	      		height: '250px',
	      		rowSelector: '20px'
			},'GridDt').startup();
			    		 
			new Textarea({
				trim : true,
				uppercase: true,
					readOnly:true,
				style : "width:750px;"
			}, "objetivoGral"); 		
		    //---------------------------------- Datos     			    

			      			    
	        var n = 0;
	            
	        var dataDt1 = {
	          		identifier: "idObjetivo",
	          		items: []
	  			   };
	        
	        //-----------------------------------
	        var entrar=0;    
	        var data=[];
//			    var data=[{name:"[Seleccione]",	id:"0"}];
//		    
//		    for(var a in listcProgFed){
//			   for(var i in listcProgFed[a]){
//				   data.push({name:listcProgFed[a][i].nomPrograma,id:listcProgFed[a][i].cPrograma});    					  
//			   }
//		    }
//		        			    
		    var dataDtB = {
	          		identifier: "idObjetivo",
	          		items: []
		    };
			  
	        var data=[{name:"[Seleccione]",   id:"0"}];
	        
	        for(var a in federalesStore){
	             data.push({name:federalesStore[a].nomPrograma,
	                          id:federalesStore[a].cPrograma});
	        }
	     
	        var dataDtA = new Memory({
	            data: data
	        });
	        
	        var n = 0;
	        
	        if(edit==true){			  
	        	if(itemToEdit.idPrograma>=81){
	        		dom.byId('otro1Visible').style.display='block';
        			dom.byId('otro2Visible').style.display='block';
        			dom.byId('otro3Visible').style.display='block';
        			//registry.byId('strObjetivo').set ('required',true);
        			//registry.byId('strMeta').set ('required',true);
        			registry.byId('GridDt').set("style","display:none");
	        	} else {			
	        		dom.byId('otro1Visible').style.display='none';
        			dom.byId('otro2Visible').style.display='none';
        			dom.byId('otro3Visible').style.display='none';
			        for(var objFed in federalesStore){
		        		if(federalesStore[objFed].cPrograma == itemToEdit.idPrograma ){
		        			var tmpMeta = "";
		        			var tmpSeleccion = false;
		        			if(itemToEdit.objetivosSel == null){
		        				for(var idI in programasRegistrados){
		        					if(programasRegistrados[idI].idPrograma = itemToEdit.idPrograma){
		        						if(federalesStore[objFed].cPrograma == programasRegistrados[idI].idobjetivo ){
		        							tmpSeleccion = true;
											tmpMeta=programasRegistrados[idI].meta;
											
											var arregloObjetivos1 = {
					        	                  	id:+n,
					        	                  	idObjetivo:itemToEdit.objetivosSel[idI].idObjetivo,
				    					        	idSeleccion : tmpSeleccion	,
				    					        	objetivo : itemToEdit.objetivosSel[idObjActividad].name,
				    					        	meta:tmpMeta
								   				};			        						        			
					        
	        			dataDtB.items.push(arregloObjetivos1);   
	        			
	        			
		        						}
		        					}
		        				}
		        			} else {
		        				for(var idObjActividad in itemToEdit.objetivosSel){
									//if(itemToEdit.objetivosSel[idObjActividad].idObjetivo == federalesStore[objFed].cPrograma){
									if(itemToEdit.objetivosSel[idObjActividad].idObjetivo!=null){
										
										for(var objFed in objsStore ){
		    		 		        		if(objsStore[objFed].cObjetivo == itemToEdit.objetivosSel[idObjActividad].idObjetivo ){
		    		 		       			
		    		 		        			tmpSeleccion = true;
											tmpMeta=itemToEdit.objetivosSel[idObjActividad].meta;
							        
											var arregloObjetivos1 = {
					        	                  	id:+n,
					        	                  	idObjetivo: itemToEdit.objetivosSel[idObjActividad].idObjetivo,
				    					        	idSeleccion : tmpSeleccion	,
				    					        	objetivo : objsStore[objFed].descripObjetivo,
				    					        	meta:tmpMeta
				    					        	
					    					        	
								   				};			        						        			
					        
	        			                       dataDtB.items.push(arregloObjetivos1);	        			
		    		 		        		       
		    		 		        		}
		    		 		        		}
		        		   
        			
									}	
								}	
		        			}
							
		        			
		        			for(var prFd in federalesStore){
					        	if(federalesStore[prFd].cPrograma == itemToEdit.idPrograma){
					        		registry.byId('objetivoGral').set('value',federalesStore[prFd].objetivo);
					        	}
					        }
		        		}
		        	} 
	        	}
	        } else {
	        	dom.byId('otro1Visible').style.display='none';
    			dom.byId('otro2Visible').style.display='none';
    			dom.byId('otro3Visible').style.display='none';
    			
	        }
	        
	        //-----------------------------------
	        var newStoreDtA = new ItemFileWriteStore({data: dataDtB});
	        
	        registry.byId('GridDt').setStore(newStoreDtA);			        			        

	        var data=[];
	        
	        for(var a in federalesStore){
	             data.push({name:federalesStore[a].nomPrograma,
	                           id:federalesStore[a].cPrograma});
	        }
	     
	        var pStore = new Memory({
	            data: data
	        });

		            			    			    
		    //---------------------------------- Dojo
//	     	Campo nombre otro Programa
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
	           style:"display:block; width:280px"
	        }, 'monto').on ('Blur', function(){	   
				   var monto= registry.byId("monto").get('value');		       
				   	if(monto!=''){			       
				       if(monto==0){
				    	   registry.byId('montoStr').set('value','CERO');
				       } else if(monto>=0){			    	   
				    		registry.byId('montoStr').set('value',jsUtils.covertirNumLetras(registry.byId("monto").get('value')));    					    	   
				       } else{
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
	           required: "true"
	        }, 'montoStr');
		    
	        var programa = new FilteringSelect({
	           id: 'prSelect',
	           value:itemToEdit.idPrograma,
	           store: pStore,
	           readOnly:edit,
	           searchAttr: 'name'
	        }, 'prSelect').on ('change', function(){
	        	
	    	    var gridFed = registry.byId('1_1Grid');
//	        	for ( var i = 0; i < gridFed.rowCount; i++) {
//
//	 				var item = gridFed.getItem(i);
//	 				
//	 				if( gridFed.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
//	 					utils.cstmAlert("Ya existe registrado el Programa Federal");
//	 					return;
//	 				}
//
//	 			}
	        

	    		if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
	    			    				 			    		
	    			registry.byId('objetivoGral').set('value',"");
	    			dom.byId('otro1Visible').style.display='block';
	    			dom.byId('otro2Visible').style.display='block';
	    			dom.byId('otro3Visible').style.display='block';
	    			registry.byId('strObjetivo').set ('required',true);
	    			registry.byId('strMeta').set ('required',true);
	    			registry.byId('nomOtroPrograma').set ('required',true);
	    			registry.byId('GridDt').set("style","display:none");
	    			    		        			
	    		} else {    
	    			if(dom.byId('GridDt').style.display=='none'){
	    				dom.byId('otro1Visible').style.display='none';
	        			dom.byId('otro2Visible').style.display='none';
	        			dom.byId('otro3Visible').style.display='none';
	        			registry.byId('strObjetivo').set ('required',false);
	        			registry.byId('strMeta').set ('required',false);
	        			registry.byId('nomOtroPrograma').set ('required',false);
			        	registry.byId('GridDt').set("style","display:block");        		        			
			        } 
	    			var n=0;
			        dataDt1.items=[];
			        		        
			        for(var objFed in objsStore ){
		        		if(objsStore[objFed].tpoPrograma == registry.byId("prSelect").get('value')){
		        			var arregloObjetivos1 = {
						        	                  	id:+n,
						        	                  	idObjetivo: objsStore[objFed].cObjetivo,
					    					        	idSeleccion : false	,
					    					        	objetivo : objsStore[objFed].descripObjetivo,
					    					        	meta:" "
									   				};
						        
					        dataDt1.items.push(arregloObjetivos1);    					         
		        		}
		        	}    
			        					            					        
			        var newStoreDt1 = new ItemFileWriteStore({data: dataDt1});
			        registry.byId('GridDt').setStore(newStoreDt1);

			        for(var prFd in federalesStore[0]){
			        	if(federalesStore[0][prFd].cPrograma == registry.byId("prSelect").get('value')){
			        		registry.byId('objetivoGral').set('value',federalesStore[0][prFd].objetivo);
			        	}
			        }    					            					        
	    		}    		        		    		        	
	        });
	        	   
	        
		    //------------------------------------
		    jsUtils.createTag('div','prBtnAceptar','dcDetail');
		    	    
		    new Button({
				label : " Aceptar "  ,
					onClick : function() {
	 					
	 					var form = registry.byId('dDetail');
	 					if (!form.validate()){  
	 						utils.cstmAlert('Favor de registrar los datos requeridos');
	 						return false;
	 					}
	 					
	 					var objetivosSel = new Array();      			    					
	   					var objetivosGrid = registry.byId('GridDt');
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
	 						tmpObjetivo = registry.byId("strObjetivo").get('value');
	 						tmpMeta = registry.byId("strMeta").get('value');
	 						tmpnomOtroPrograma = registry.byId("nomOtroPrograma").get('value');
	 						
	 					} else {
		    					
		    					longitudMeta = 0;
		    					
		    					for ( var i = 0; i < objetivosGrid.rowCount; i++) {

		    						var item = objetivosGrid.getItem(i);														
		    									
		    						if( objetivosGrid.store.getValue(item,'meta') != null  && objetivosGrid.store.getValue(item,'meta').trim() != "" ){
		    							var objetivos = {
		    												idObjetivo : 	objetivosGrid.store.getValue(item,'idObjetivo'),
		    												objetivo : 		objetivosGrid.store.getValue(item,'objetivo'),
	   	       			    							    meta : 			objetivosGrid.store.getValue(item,'meta')
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
	 					
	 					var gridFed1 = registry.byId('1_1Grid');
	 					if(edit){}
    					else	
    					{
 		        	for ( var i = 0; i < gridFed1.rowCount; i++) {

 		 				var item = gridFed1.getItem(i);
 		 				
 		 				if( gridFed1.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
 		 					utils.cstmAlert("Ya existe registrado el Programa Federal en nuevos programas");
 		 					return;
 		 				}

 		 			}
				    }
	 					var gridFed2 = registry.byId('1Grid');
	 					if(edit){}
	    					else	
	    					{
	 		        	for ( var i = 0; i < gridFed2.rowCount; i++) {

	 		 				var item = gridFed2.getItem(i);
	 		 				
	 		 				if( gridFed2.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
	 		 					utils.cstmAlert("Ya existe registrado el Programa Federal en seguimiento");
	 		 					return;
	 		 				}

	 		 			}
					    }
	 					var grid = registry.byId('1_1Grid');
	 					try{
	 						if(edit){
	 							var index = grid.selection.selectedIndex;
	 							var item = grid.getItem(index);
	 							//grid.store.setValue(item, 'idPrograma', registry.byId("prSelect").get('value'));
	 							//grid.store.setValue(item, 'nomPrograma', registry.byId("prSelect").get('displayedValue'));
	 							grid.store.setValue(item, 'monto', registry.byId("monto").get('value'));
	 							grid.store.setValue(item, 'montoStr', registry.byId("montoStr").get('value'));
	 							grid.store.setValue(item, 'objetivos', objetivosSel);
	 							grid.store.setValue(item, 'objetivo', tmpObjetivo);
	 							grid.store.setValue(item, 'meta', tmpMeta);
	 							grid.store.setValue(item, 'nomOtroPrograma', tmpnomOtroPrograma);
	 							
	 						} else {
	 							 var myNewItem = {  cPrograma: ++maxIndexFederal, 
				    									idPrograma: registry.byId("prSelect").get('value'),
				    									nomPrograma:  registry.byId("prSelect").get('displayedValue'),
				    									monto:  registry.byId("monto").get('value'),
				    									montoStr:  registry.byId("montoStr").get('value'),
				    									objetivos:  objetivosSel,
				    									objetivo: tmpObjetivo,
				    									meta: tmpMeta,
				    									nomOtroPrograma: tmpnomOtroPrograma
								      				 };	    							 
							         grid.store.newItem(myNewItem);
							         
							         // Se da de alta su seguimiento en automatico para que cuando se de seguimiento a
							         // un programa nueva, ya se encuentre en el arreglo de seguimiento
							        
							         if(objetivosSel.length>0){
							        	 inicial = 1;
							        	 for(var j in objetivosSel){
							        		 
							        		var newSeguimiento = {  idPrograma: parseInt(registry.byId("prSelect").get('value')),
		 	 							    		tipoPrograma: 0, // 0 Federales
		 	 							    		cSesion: 3,
		 	 							    		idDetalle: inicial++,
		 	 							    		idObjetivo: objetivosSel[j].idObjetivo,				 	 							    						 	 							    		
		 	 							    		monto: registry.byId("monto").get('value'),
		 	 							    		montoStr: registry.byId("montoStr").get('value'),
		 	 							    		nomOtroPrograma: tmpnomOtroPrograma,
		 	 							    		nomPrograma: registry.byId("prSelect").get('displayedValue'),
		 	 							    		objetivo:  objetivosSel[j].objetivo,
		 	 							    		meta: objetivosSel[j].meta,
		 	 							    		seguimiento: null,
		 	 							    		avance: null
				      				 			  };
//							        		newSeguimiento.idDetalle = objetivosSel[j].idObjetivo; 
//							        		newSeguimiento.idObjetivo = objetivosSel[j].idObjetivo;
//							        		newSeguimiento.objetivo = objetivosSel[j].objetivo;
//							        		newSeguimiento.meta = objetivosSel[j].meta;
							        		tDetalle.push(newSeguimiento);
							        	 }
							         }
							         if(parseInt(registry.byId("prSelect").get('value'))==81 || parseInt(registry.byId("prSelect").get('value'))==82){
							        	
							        		 
							        		var newSeguimientoOtro = {  idPrograma: parseInt(registry.byId("prSelect").get('value')),
		 	 							    		tipoPrograma: 0, // 0 Federales
		 	 							    		cSesion: 3,
		 	 							    		idDetalle: 1,
		 	 							    		idObjetivo: null,				 	 							    						 	 							    		
		 	 							    		monto: registry.byId("monto").get('value'),
		 	 							    		montoStr: registry.byId("montoStr").get('value'),
		 	 							    		nomOtroPrograma: tmpnomOtroPrograma,
		 	 							    		nomPrograma: registry.byId("prSelect").get('displayedValue'),
		 	 							    		objetivo: tmpObjetivo,
		 	 							    		meta: tmpMeta ,
		 	 							    		seguimiento: null,
		 	 							    		avance: null
				      				 			  };
							        	tDetalle.push(newSeguimientoOtro);
							        	
							         }
							         
	 						}
	 						registry.byId('dDetail').destroyRecursive(false);
	 					}catch(e){
	 						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
	 						console.log(e);
	 					}	     			    					
	 				}
		    },'prBtnAceptar');		   
	    }
	  
 	    function funEstatal(itemToEdit){
 	    	var edit=false;
 		    if(!itemToEdit){
 			   itemToEdit={cPrograma: 0,idPrograma:0, nomPrograma:'',objetivoPrograma:'',meta:'',monto:'', montoStr:''};
 		    }else{
 			   edit=true;
 		    }
 			//----------------------------Diseño de la ventana
 	    	var title ='Programa Estatal';
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
 					    			   '<tr id="trMonto"><td> '+
 					    			   '	 <b>*Recurso Asignado para ejercer en el presente ciclo escolar</b><br/>'+
 					    			   'N\u00FAmero:<input id="monto"/> Letra:<input id="montoStr"/><br/>'+
 					    			   '</td></tr>'+							    			   							    			   							    			   							    			   
 					    			   '</table>';     			         			   
 			          					        
 		    //---------------------------------- Datos
 		        
 	        var data=[];
 	       
 	        for(var a in estatalesStore){
 	              data.push({name:estatalesStore[a].nomPrograma,
 	                           id:estatalesStore[a].cPrograma});
 	        }  
 	       
 	        var pStore = new Memory({
 	           data: data
 	        });

// 	        for(var i in tDetalle){
// 	        	if(tDetalle[i].idPrograma == itemToEdit.idPrograma){
// 	        		if(tDetalle[i].cSesion == 3){
// 		        		itemToEdit.meta = tDetalle[i].meta;
// 		        		itemToEdit.objetivoPrograma = tDetalle[i].objetivo;
// 	        		}
// 	        	}
// 	        }
 	       
	        	
		        if(edit==true){	
		        	if(itemToEdit.idPrograma>=94){
		        		dom.byId('otro3Visible').style.display='block';
	        		} else {			
		        		dom.byId('otro3Visible').style.display='none';
				    
		        		}
		        	} else {
		        	dom.byId('otro3Visible').style.display='none';
       			
		        		}
			   
 		    //---------------------------------- Dojo
 		    var prSelect = new FilteringSelect({
 	           id: 'prSelect',
 	           value:itemToEdit.idPrograma,
 	           store: pStore,
 	           readOnly:edit,
 	           searchAttr: 'name'
 		    }, 'prSelect').on ('change', function(){     
 	        	
// 	        	var gridE = registry.byId('2_1Grid');
// 	        	var gridEs = registry.byId('2Grid');
// 	        	
// 	        	for ( var i = 0; i < gridE.rowCount; i++) {
// 	        		
// 	 				var item = gridE.getItem(i);
// 	 				
// 	 				if( gridE.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
// 	 					registry.byId('prSelect').set ('value',0);
// 	 					utils.cstmAlert("Ya existe registrado el Programa Estatal en nuevos programas");
// 	 					return;
// 	 				}
//
// 	 			}
// 	        	
// 	        	for ( var i = 0; i < gridEs.rowCount; i++) {
// 	        		
// 	 				var item = gridEs.getItem(i);
// 	 				
// 	 				if( gridEs.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
// 	 					registry.byId('prSelect').set ('value',0);
// 	 					utils.cstmAlert("Ya existe registrado el Programa Estatal en seguimiento");
// 	 					return;
// 	 				}
//
// 	 			}

 	        	if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
 			    		
 	    			dom.byId('otro3Visible').style.display='block';
 	    			registry.byId('nomOtroPrograma').set ('required',true);
 	    			    		        			
 	    		} else {    
 	    			dom.byId('otro3Visible').style.display='none';
 	        			registry.byId('nomOtroPrograma').set ('required',false);
 			        
 	    				}
 	        });
 			    
 		    var nomOtroPrograma = new ValidationTextBox({
 		           promptMessage:"Nombre de Otro Programa",
 		           value:itemToEdit.nomOtroPrograma, 
 		           trim:"true",
 		           uppercase: true,
 		           maxLength:"250",
 		   //        required: "true",
 		           style:"display:block; width:280px"
 	        }, 'nomOtroPrograma');
 			   
 		    var strObjetivo = new ValidationTextBox({
 	           promptMessage:"Objetivo especifico del programa",
 	           value:itemToEdit.objetivoPrograma, 
 	           trim:"true",
 	           uppercase: true,
 	           required: "true",
 	           maxLength:"250",
 	           style:"display:block; width:280px"
 	        }, 'strObjetivo');
 			   
 			var strMeta = new ValidationTextBox({
 		           promptMessage:"Meta de la escuela",
 		           value:itemToEdit.meta, 
 		           trim:"true",    
 		           required: "true",
 		           uppercase: true,
 		           maxLength:"250",
 		           style:"display:block; width:280px"
 	        }, 'strMeta');
 				  
 		    var monto = new ValidationTextBox({
 	           promptMessage:"Capture solo n\u00FAmeros",
 	           id:'monto',
 	           regExp: constants.NUMBER_VALID,
 	           value:itemToEdit.monto, 
 	           trim:"true",  
 	           maxLength:"9",
 	           required: "true",
 	           style:"display:block; width:280px"
 		    }, 'monto').on ('Blur', function(){;
 		   
 				   var monto= registry.byId("monto").get('value');		       
 			       if(monto!=''){			       
 				       if(monto==0){
 				    	   registry.byId('montoStr').set('value','CERO');
 				       } else if(monto>=0){			    	   
 				    		registry.byId('montoStr').set('value',jsUtils.covertirNumLetras(registry.byId("monto").get('value')));    					    	   
 				       } else{
 				    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
 							return false;
 				       }
 			       	}		       
 	        });
 			    
 		    var montoStr = new ValidationTextBox({
 	           promptMessage:"Capture solo letras",
 	           value:itemToEdit.montoStr, 
 	           regExp:constants.NoNUMBER_VALID,
 	           id:'montoStr',
 	           trim:"true",    
 	           maxLength:"200",
 	           style:"display:block; width:480px",
 	           readOnly: true,
 	           required: "true"
 	        }, 'montoStr');
 		    //------------------------------------
 		    jsUtils.createTag('div','prBtnAceptar','dcDetail');
 		   
 		    new Button({
 				label : " Aceptar " ,
 					onClick : function() {
 						
 						if( registry.byId("prSelect").get('displayedValue') == "Otro" ){			    		
 			    			registry.byId('nomOtroPrograma').set ('required',true);
 			    		} else {    
 			        			registry.byId('nomOtroPrograma').set ('required',false);
 	    				}
 						
 	 					var form = registry.byId('dDetail');
 	 					if (!form.validate()){  
 	 						utils.cstmAlert('Favor de registrar los datos requeridos');
 	 						return false;
 	 					}
 	 					var tmpnomOtroPrograma = "";
 	 					tmpnomOtroPrograma = registry.byId("nomOtroPrograma").get('value');
 	 					
 	 	 	        	var gridE = registry.byId('2_1Grid');
 	 	 	        	var gridEs = registry.byId('2Grid');
 	 	 	        	if(edit){}
	    					else	
	    					{ 	 	 	        	
 	 	 	        	for ( var i = 0; i < gridE.rowCount; i++) {
 	 	 	        		
 	 	 	 				var item = gridE.getItem(i);
 	 	 	 				
 	 	 	 				if( gridE.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
 	 	 	 					utils.cstmAlert("Ya existe registrado el Programa Estatal en nuevos programas");
 	 	 	 					return;
 	 	 	 				}

 	 	 	 			}
						}
 	 	 	        	if(edit){}
						else	
						{
 	 	 	        	for ( var i = 0; i < gridEs.rowCount; i++) {
 	 	 	        		
 	 	 	 				var item = gridEs.getItem(i);
 	 	 	 				
 	 	 	 				if( gridEs.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
 	 	 	 					utils.cstmAlert("Ya existe registrado el Programa Estatal en seguimiento");
 	 	 	 					return;
 	 	 	 				}

 	 	 	 			}}
 	 					
 	 					var grid = registry.byId('2_1Grid');
 	 					try{
 	 						if(edit){
 	 							var index = grid.selection.selectedIndex;
 	 							var item = grid.getItem(index);
 	 							grid.store.setValue(item, 'objetivo', strObjetivo.get('value'));
 	 							grid.store.setValue(item, 'meta', strMeta.get('value'));
 	 							grid.store.setValue(item, 'monto', registry.byId("monto").get('value'));
 	 							grid.store.setValue(item, 'montoStr', registry.byId("montoStr").get('value'));
 	 							grid.store.setValue(item, 'nomOtroPrograma', tmpnomOtroPrograma);
 	 							
 	 							for(var idI in tDetalle){    							
 						        	if(tDetalle[idI].idPrograma == itemToEdit.cPrograma){			    											
 										tDetalle[idI].objetivo = strObjetivo.get('value');
 				    					tDetalle[idI].meta= strMeta.get('value');					        	
 						        	}
 								}
 	 							
 	 						} else {
 	 							 var myNewItem = {  cPrograma: ++maxIndexEstatal, 
 	 									idPrograma: parseInt(registry.byId("prSelect").get('value')),
 	 									nomPrograma:  registry.byId("prSelect").get('displayedValue'),
 	 									objetivo: strObjetivo.get('value'), 
 	 									meta:  strMeta.get('value'),
 	 									monto:  registry.byId("monto").get('value'),
 	 									montoStr:  registry.byId("montoStr").get('value'),
 	 									nomOtroPrograma: tmpnomOtroPrograma
 								      				 };	    							 
 							         grid.store.newItem(myNewItem);
 							         
 							         // Se da de alta su seguimiento en automatico para que cuando se de seguimiento a
 							         // un programa nueva, ya se encuentre en el arreglo de seguimiento
 							         var newSeguimiento = {  idPrograma: parseInt(registry.byId("prSelect").get('value')),
 				 	 							    		tipoPrograma: null, 
 				 	 							    		cSesion: 3,
 				 	 							    		idDetalle: 1,
 				 	 							    		idObjetivo: null,				 	 							    						 	 							    		
 				 	 							    		monto: registry.byId("monto").get('value'),
 				 	 							    		montoStr: registry.byId("montoStr").get('value'),
 				 	 							    		nomOtroPrograma: tmpnomOtroPrograma,
 				 	 							    		nomPrograma: registry.byId("prSelect").get('displayedValue'),
 				 	 							    		objetivo: strObjetivo.get('value'),
 				 	 							    		meta: strMeta.get('value'),
 				 	 							    		seguimiento: null,
 				 	 							    		avance: null
 						      				 			  };
 							         
 							         tDetalle.push(newSeguimiento);	
 							         
 	 						}
 	 						registry.byId('dDetail').destroyRecursive(false);
 	 					}catch(e){
 	 						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
 	 						console.log(e);
 	 					}	
 	 				}    
 		    },'prBtnAceptar');			      
 	    }
 	    
 	    function funMunicipal(itemToEdit){
 	    	var edit=false;
 		    if(!itemToEdit){
 			   itemToEdit={cPrograma: 0,idPrograma:0, nomPrograma:'',objetivoPrograma:'',meta:'',monto:'', montoStr:''};
 		    }else{
 			   edit=true;
 		    }    			   
 		    //----------------------------Diseño de la ventana
 	    	var title ='Programa Municipal';
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
 				    			   '<tr id="trMonto"><td> '+
 				    			   '	 <b>*Recurso Asignado para ejercer en el presente ciclo escolar</b><br/>'+
 				    			   'N\u00FAmero:<input id="monto"/> Letra:<input id="montoStr"/><br/>'+
 				    			   '</td></tr>'+							    			   							    			   							    			   							    			   
 				    			   '</table>';     			         			   
 		          					        
 		    //---------------------------------- Datos
 		    var data=[];
 	        
 	        for(var a in municipalesStore){
 	                data.push({name:municipalesStore[a].nomPrograma,
 	                              id:municipalesStore[a].cPrograma});
 	        }  

 	        var pStore = new Memory({
 	             data: data
 	        });
 	        	
 	       
				  if(edit==true){	
			        	if(itemToEdit.idPrograma>=109){
			        		dom.byId('otro3Visible').style.display='block';
		        		} else {			
			        		dom.byId('otro3Visible').style.display='none';
					    
			        		}
			        	} else {
			        	dom.byId('otro3Visible').style.display='none';
	        			
			        		}   
			   
 	        
// 	        for(var i in tDetalle){
// 	        	if(tDetalle[i].idPrograma == itemToEdit.idPrograma){
// 	        		if(tDetalle[i].cSesion == 3){
// 		        		itemToEdit.meta = tDetalle[i].meta;
// 		        		itemToEdit.objetivoPrograma = tDetalle[i].objetivo;
// 	        		}
// 	        	}
// 	        }
 	        
 		    //---------------------------------- Dojo
 	        var prSelect = new FilteringSelect({
 		    	id: 'prSelect',
 		       value:itemToEdit.idPrograma,
 		       store: pStore,
 		       readOnly:edit,
 		       searchAttr: 'name'
 	        }, 'prSelect').on ('change', function(){     
 	        	
// 	        	var gridE = registry.byId('3_1Grid');
// 	        	var gridEs = registry.byId('3Grid');
// 	        	
// 	        	for ( var i = 0; i < gridE.rowCount; i++) {
// 	        		
// 	 				var item = gridE.getItem(i);
// 	 				
// 	 				if( gridE.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
// 	 					registry.byId('prSelect').set ('value',0);
// 	 					utils.cstmAlert("Ya existe registrado el Programa Municipal");
// 	 					return;
// 	 				}
//
// 	 			}
// 	        	
// 	        	for ( var i = 0; i < gridEs.rowCount; i++) {
// 	        		
// 	 				var item = gridEs.getItem(i);
// 	 				
// 	 				if( gridEs.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
// 	 					registry.byId('prSelect').set ('value',0);
// 	 					utils.cstmAlert("Ya existe registrado el Programa Municipal en seguimiento");
// 	 					return;
// 	 				}
//
// 	 			}

 	        	if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
 			    		
 	    			dom.byId('otro3Visible').style.display='block';
 	    			registry.byId('nomOtroPrograma').set ('required',true);
 	    			    		        			
 	    		} else {    
 	    			dom.byId('otro3Visible').style.display='none';
 	        			registry.byId('nomOtroPrograma').set ('required',false);
 			        
 	    				}
 	        });
 		    
 	        var nomOtroPrograma = new ValidationTextBox({
 	           promptMessage:"Nombre de Otro Programa",
 	           value:itemToEdit.nomOtroPrograma, 
 	           trim:"true",
 	           uppercase: true,
 	           maxLength:"250",
 	           //required: "true",
 	           style:"display:block; width:280px"
 	        }, 'nomOtroPrograma');
 		   
 		    var strObjetivo = new ValidationTextBox({
 		       promptMessage:"Objetivo especifico del programa",
 		       value:itemToEdit.objetivoPrograma, 
 		       trim:"true",
 		       uppercase: true,
 		       required: "true",
 		       maxLength:"250",
 		       style:"display:block; width:280px"
 		    }, 'strObjetivo');
 		   
 			var strMeta = new ValidationTextBox({
 	           promptMessage:"Meta de la escuela",
 	           value:itemToEdit.meta, 
 	           trim:"true",    
 	           required: "true",
 	           uppercase: true,
 	           maxLength:"250",
 	           style:"display:block; width:280px"
 	        }, 'strMeta');
 			  
 		    var monto = new ValidationTextBox({
 		       promptMessage:"Capture solo n\u00FAmeros",
 		       id:'monto',
 		       regExp: constants.NUMBER_VALID,
 		       value:itemToEdit.monto, 
 		       trim:"true",  
 		       maxLength:"9",
 		       required: "true",
 		       style:"display:block; width:280px"
 		    }, 'monto').on ('Blur', function(){;
 			    var monto= registry.byId("monto").get('value');	      
 		        if(monto!=''){		       
 			       if(monto==0){
 			    	   registry.byId('montoStr').set('value','CERO');
 			       } else if(monto>=0){		    	   
 			    		registry.byId('montoStr').set('value',jsUtils.covertirNumLetras(registry.byId("monto").get('value')));    					    	   
 			       } else{
 			    	   utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
 						return false;
 			       }
 		       	}	       
 		    });
 		    
 		    var montoStr = new ValidationTextBox({
 		       promptMessage:"Capture solo letras",
 		       value:itemToEdit.montoStr, 
 		       regExp:constants.NoNUMBER_VALID,
 		       id:'montoStr',
 		       trim:"true",    
 		       maxLength:"200",
 		       style:"display:block; width:480px",
 		       readOnly: true,
 		       required: "true"
 		    }, 'montoStr');
 		    //------------------------------------
 		    jsUtils.createTag('div','prBtnAceptar','dcDetail');
 		   
 		    new Button({
 				label : " Aceptar ",
 				onClick : function() {
 					
 					if( registry.byId("prSelect").get('displayedValue') == "Otro" ){			    		
 		    			registry.byId('nomOtroPrograma').set ('required',true);
 		    		} else {    
 		        			registry.byId('nomOtroPrograma').set ('required',false);
 					}
 					
 						var form = registry.byId('dDetail');
 						if (!form.validate()){  
 							utils.cstmAlert('Favor de registrar los datos requeridos');
 							return false;
 						}
 						var tmpnomOtroPrograma = "";
 						tmpnomOtroPrograma = registry.byId("nomOtroPrograma").get('value');
 						
 		 	        	var gridE = registry.byId('3_1Grid');
 		 	        	var gridEs = registry.byId('3Grid');
 		 	        	if(edit){}
	    					else	
	    					{
 		 	        	for ( var i = 0; i < gridE.rowCount; i++) {
 		 	        		
 		 	 				var item = gridE.getItem(i);
 		 	 				
 		 	 				if( gridE.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
 		 	 					utils.cstmAlert("Ya existe registrado el Programa Municipal en nuevos programas");
 		 	 					return;
 		 	 				}

 		 	 			}
	    					}
 		 	        	if(edit){}
	    					else	
	    					{
 		 	        	for ( var i = 0; i < gridEs.rowCount; i++) {
 		 	        		
 		 	 				var item = gridEs.getItem(i);
 		 	 				
 		 	 				if( gridEs.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
 		 	 					utils.cstmAlert("Ya existe registrado el Programa Municipal en seguimiento");
 		 	 					return;
 		 	 				}

 		 	 			}
	    					}
 						var grid = registry.byId('3_1Grid');
 						try{
 							if(edit){
 								var index = grid.selection.selectedIndex;
 								var item = grid.getItem(index);
 								grid.store.setValue(item, 'objetivo', strObjetivo.get('value'));
 								grid.store.setValue(item, 'meta', strMeta.get('value'));
 								grid.store.setValue(item, 'monto', registry.byId("monto").get('value'));
 								grid.store.setValue(item, 'montoStr', registry.byId("montoStr").get('value'));
 								grid.store.setValue(item, 'nomOtroPrograma', tmpnomOtroPrograma);
 							} else {
 								 var myNewItem = {  cPrograma: ++maxIndexMunicipal, 
 										idPrograma: registry.byId("prSelect").get('value'),
 										nomPrograma:  registry.byId("prSelect").get('displayedValue'),
 										objetivo: strObjetivo.get('value'), 
 										meta:  strMeta.get('value'),
 										monto:  registry.byId("monto").get('value'),
 										montoStr:  registry.byId("montoStr").get('value'),
 										nomOtroPrograma: tmpnomOtroPrograma
 							      				 };	    							 
 						         grid.store.newItem(myNewItem);
 						         
 						         // Se da de alta su seguimiento en automatico para que cuando se de seguimiento a
						         // un programa nueva, ya se encuentre en el arreglo de seguimiento
						         var newSeguimiento = {  idPrograma: parseInt(registry.byId("prSelect").get('value')),
			 	 							    		tipoPrograma: null, 
			 	 							    		cSesion: 3,
			 	 							    		idDetalle: 1,
			 	 							    		idObjetivo: null,				 	 							    						 	 							    		
			 	 							    		monto: registry.byId("monto").get('value'),
			 	 							    		montoStr: registry.byId("montoStr").get('value'),
			 	 							    		nomOtroPrograma: tmpnomOtroPrograma,
			 	 							    		nomPrograma: registry.byId("prSelect").get('displayedValue'),
			 	 							    		objetivo: strObjetivo.get('value'),
			 	 							    		meta: strMeta.get('value'),
			 	 							    		seguimiento: null,
			 	 							    		avance: null
					      				 			  };
						         
						         tDetalle.push(newSeguimiento);
 							}
 							registry.byId('dDetail').destroyRecursive(false);
 						}catch(e){
 							utils.cstmAlert('Ocurrio un error al Agregar o Editar');
 							console.log(e);
 						}	
 					}    
 		    },'prBtnAceptar');			      
 	    }
 	    
 	    function funOSC(itemToEdit){
 	    	var edit=false;
 		    if(!itemToEdit){
 			   itemToEdit={cPrograma: 0,idPrograma:0, nomPrograma:'',objetivoPrograma:'',meta:'',monto:'', montoStr:''};
 		    }else{
 			   edit=true;
 		    } 
 		    //----------------------------Diseño de la ventana
 			var title ='Programa OSC';
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
 				    			   '<tr id="trMonto"><td> '+
 				    			   '	 <b>*Recurso Asignado para ejercer en el presente ciclo escolar</b><br/>'+
 				    			   'N\u00FAmero:<input id="monto"/> Letra:<input id="montoStr"/><br/>'+
 				    			   '</td></tr>'+							    			   							    			   							    			   							    			   
 				    			   '</table>';     			         			   
 		          					        
 		    //---------------------------------- Datos
 		    var data=[];
 	        
 	        for(var a in oscStore){
 	                data.push({name:oscStore[a].nomPrograma,
 	                              id:oscStore[a].cPrograma});
 	           }  

 	         var pStore = new Memory({
 	             data: data
 	         });
 	       
 	         
				  if(edit==true){	
			        	if(itemToEdit.idPrograma>=123){
			        		dom.byId('otro3Visible').style.display='block';
		        		} else {			
			        		dom.byId('otro3Visible').style.display='none';
					    
			        		}
			        	} else {
			        	dom.byId('otro3Visible').style.display='none';
	        			
			        		}
			   
 	         
// 	         for(var i in tDetalle){
// 	         	if(tDetalle[i].idPrograma == itemToEdit.idPrograma){
// 	         		if(tDetalle[i].cSesion == 3){
// 	 	        		itemToEdit.meta = tDetalle[i].meta;
// 	 	        		itemToEdit.objetivoPrograma = tDetalle[i].objetivo;
// 	         		}
// 	         	}
// 	         }
 	         
 		    //---------------------------------- Dojo
 		    var prSelect = new FilteringSelect({
 		       id: 'prSelect',
 		       value:itemToEdit.idPrograma,
 		       store: pStore,
 		       readOnly:edit,
 		       searchAttr: 'name'
 		    }, 'prSelect').on ('change', function(){     
 	        	
// 	        	var gridE = registry.byId('4_1Grid');
// 	        	var gridEs = registry.byId('4Grid');
// 	        	
// 	        	for ( var i = 0; i < gridE.rowCount; i++) {
// 	        		
// 	 				var item = gridE.getItem(i);
// 	 				
// 	 				if( gridE.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
// 	 					registry.byId('prSelect').set ('value',0);
// 	 					utils.cstmAlert("Ya existe registrado el Programa OSC");
// 	 					return;
// 	 				}
//
// 	 			}
// 	        	
// 	       	   for ( var i = 0; i < gridEs.rowCount; i++) {
//	        		
//	 				var item = gridEs.getItem(i);
//	 				
//	 				if( gridEs.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
//	 					registry.byId('prSelect').set ('value',0);
//	 					utils.cstmAlert("Ya existe registrado el Programa OSC en seguimiento");
//	 					return;
//	 				}
//
//	 			}

 	        	if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
 			    		
 	    			dom.byId('otro3Visible').style.display='block';
 	    			registry.byId('nomOtroPrograma').set ('required',true);
 	    			    		        			
 	    		} else {    
 	    			dom.byId('otro3Visible').style.display='none';
 	        			registry.byId('nomOtroPrograma').set ('required',false);
 			        
 	    				}
 	        });
 		    
 		    var nomOtroPrograma = new ValidationTextBox({
 	           promptMessage:"Nombre de Otro Programa",
 	           value:itemToEdit.nomOtroPrograma, 
 	           trim:"true",
 	           uppercase: true,
 	           maxLength:"250",
 	           //required: "true",
 	           style:"display:block; width:280px"
 	        }, 'nomOtroPrograma');
 		   
 		    var strObjetivo = new ValidationTextBox({
 		       promptMessage:"Objetivo especifico del programa",
 		       value:itemToEdit.objetivoPrograma, 
 		       trim:"true",
 		       uppercase: true,
 		       required: "true",
 		       maxLength:"250",
 		       style:"display:block; width:280px"
 		    }, 'strObjetivo');
 		   
 			var strMeta = new ValidationTextBox({
 	           promptMessage:"Meta de la escuela",
 	           value:itemToEdit.meta, 
 	           trim:"true",    
 	           required: "true",
 	           uppercase: true,
 	           maxLength:"250",
 	           style:"display:block; width:280px"
 	        }, 'strMeta');
 			  
 		    var monto = new ValidationTextBox({
 		       promptMessage:"Capture solo n\u00FAmeros",
 		       id:'monto',
 		       regExp: constants.NUMBER_VALID,
 		       value:itemToEdit.monto, 
 		       trim:"true",  
 		       maxLength:"9",
 		       required: "true",
 		       style:"display:block; width:280px"
 		     }, 'monto').on ('Blur', function(){;
 			     var monto= registry.byId("monto").get('value');		       
 		         if(monto!=''){      
 				     if(monto==0){
 				    	 registry.byId('montoStr').set('value','CERO');
 				     } else if(monto>=0){		    	   
 				    	 registry.byId('montoStr').set('value',jsUtils.covertirNumLetras(registry.byId("monto").get('value')));    					    	   
 				     } else{
 				    	 utils.cstmAlert('Favor de registrar una cantidad mayor o igual a cero');
 						 return false;
 				     }
 		       	 }	       
 		     });
 		    
 		    var montoStr = new ValidationTextBox({
 		       promptMessage:"Capture solo letras",
 		       value:itemToEdit.montoStr, 
 		       regExp:constants.NoNUMBER_VALID,
 		       id:'montoStr',
 		       trim:"true",    
 		       maxLength:"200",
 		       style:"display:block; width:480px",
 		       readOnly: true,
 		       required: "true"
 		    }, 'montoStr');
 		   //------------------------------------
 		    jsUtils.createTag('div','prBtnAceptar','dcDetail');
 		   
 		    new Button({
 				label : " Aceptar " ,
 				onClick : function() {
 					
 					if( registry.byId("prSelect").get('displayedValue') == "Otro" ){			    		
 		    			registry.byId('nomOtroPrograma').set ('required',true);
 		    		} else {    
 		        			registry.byId('nomOtroPrograma').set ('required',false);
 					}
 					
 						var form = registry.byId('dDetail');
 						if (!form.validate()){  
 							utils.cstmAlert('Favor de registrar los datos requeridos');
 							return false;
 						}
 						var tmpnomOtroPrograma = "";
 						tmpnomOtroPrograma = registry.byId("nomOtroPrograma").get('value');
 						
 		 	        	var gridE = registry.byId('4_1Grid');
 		 	        	var gridEs = registry.byId('4Grid');
 		 	        	if(edit){}
	    					else	
	    					{
 		 	        	for ( var i = 0; i < gridE.rowCount; i++) {
 		 	        		
 		 	 				var item = gridE.getItem(i);
 		 	 				
 		 	 				if( gridE.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
 		 	 					utils.cstmAlert("Ya existe registrado el Programa OSC en nuevos programas");
 		 	 					return;
 		 	 				}

 		 	 			}
	    					}
 		 	        	if(edit){}
	    					else	
	    					{
 		 	       	   for ( var i = 0; i < gridEs.rowCount; i++) {
 			        		
 			 				var item = gridEs.getItem(i);
 			 				
 			 				if( gridEs.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
 			 					utils.cstmAlert("Ya existe registrado el Programa OSC en seguimiento");
 			 					return;
 			 				}

 			 			}
	    					}
 						var grid = registry.byId('4_1Grid');
 						try{
 							if(edit){
 								var index = grid.selection.selectedIndex;
 								var item = grid.getItem(index);
 								grid.store.setValue(item, 'objetivo', registry.byId("strObjetivo").get('value'));
 								grid.store.setValue(item, 'meta',registry.byId("strMeta").get('value'));
 								grid.store.setValue(item, 'monto', registry.byId("monto").get('value'));
 								grid.store.setValue(item, 'montoStr', registry.byId("montoStr").get('value'));
 								grid.store.setValue(item, 'nomOtroPrograma', tmpnomOtroPrograma);
 							} else {
 								 var myNewItem = {  cPrograma: ++maxIndexOsc, 
 										idPrograma: registry.byId("prSelect").get('value'),
 										nomPrograma:  registry.byId("prSelect").get('displayedValue'),
 										objetivo: registry.byId("strObjetivo").get('value'), 
 										meta:  registry.byId("strMeta").get('value'),
 										monto:  registry.byId("monto").get('value'),
 										montoStr:  registry.byId("montoStr").get('value'),
 										nomOtroPrograma: tmpnomOtroPrograma
 							      				 };	    							 
 						         grid.store.newItem(myNewItem);
 						         
 						         // Se da de alta su seguimiento en automatico para que cuando se de seguimiento a
						         // un programa nueva, ya se encuentre en el arreglo de seguimiento
						         var newSeguimiento = {  idPrograma: parseInt(registry.byId("prSelect").get('value')),
			 	 							    		tipoPrograma: null, 
			 	 							    		cSesion: 3,
			 	 							    		idDetalle: 1,
			 	 							    		idObjetivo: null,				 	 							    						 	 							    		
			 	 							    		monto: registry.byId("monto").get('value'),
			 	 							    		montoStr: registry.byId("montoStr").get('value'),
			 	 							    		nomOtroPrograma: tmpnomOtroPrograma,
			 	 							    		nomPrograma: registry.byId("prSelect").get('displayedValue'),
			 	 							    		objetivo:  registry.byId("strObjetivo").get('value'),
			 	 							    		meta: registry.byId("strMeta").get('value'),
			 	 							    		seguimiento: null,
			 	 							    		avance: null
					      				 			  };
						         
						         tDetalle.push(newSeguimiento)
						         
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
                                                    '<td><b>En la primera evaluaci\u00f3n del ciclo escolar</b></td>'+
                                                    '<td><b>Meta de cierre del ciclo escolar</b></td>'+
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
					val1= parseInt(registry.byId("56evaPro").get('value'));
					val2= parseInt(registry.byId("78evaPro").get('value'));
					val3= parseInt(registry.byId("90evaPro").get('value'));
					valt= (val1+val2+val3)*100/100;
					if(valt!=100){
						utils.cstmAlert('El porcentaje de evaluaci\u00f3n no da el 100%');
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
    //-----------------

    function seguimientoComite(itemToEdit,sesionComite){
		var edit=false;
	    if(!itemToEdit){
		   itemToEdit={ceComites:0,idComite:0,nomComite:'',accion1:"",accion2:"",accion3:"",accion4:0,accion5:""};
	    }else{
		   edit=true;
	    }
		var title ='Comit\u00e9';
    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
    	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    jsUtils.createTag('div','prCnt','dcDetail');
		    
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
								   '<tr><td>'+
				    			   '	<b>*Comit\u00e9: </b><div id="prSelectCom" /><br/>'+
				    			   '</td></tr>'+
				    			   '<tr id="otro3Visible" style="display:none"><td>'+
				    			   '	<b>*Otro Comit\u00e9:</div> </b><div id="nomOtroComite"/><br/>'+
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
								   '	<b>Acci\u00f3n 5: </b><div id="accion5" /><br/>'+
								   '</td></tr>'+
								   '<tr><td>'+
				    			   '	<b>*Avance del programa de actividades del comit\u00e9:</b><div id="accion4" /><br/>'+
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

		
		      var dataAC=[{name:"[Seleccione]",	id:"0"},
			              {name:"Acciones sin avance de acuerdo al programa de actividades ",	id:"1"},
			              {name:"Acciones retrasadas de acuerdo al programa de actividades",	id:"2"},
			              {name:"Las acciones est\u00E1n de acuerdo al programa de actividades ",	id:"3"},
			              {name:"Las acciones van adelantadas de acuerdo al programa de actividades",	id:"4"}];
		    		    
			    var pStoreAC = new Memory({
			        data: dataAC
			    });
			    
			    var accion4 = new FilteringSelect({
			           id: 'accion4',
			           value:itemToEdit.accion4==null?itemToEdit.accion4=0:itemToEdit.accion4==undefined?itemToEdit.accion4=0:itemToEdit.accion4,
			           store: pStoreAC,
			           width:100,
			           //readOnly:true,
			           searchAttr: 'name',
			           style:"display:block; width:350px"
		     }, 'accion4');

	    //---------------------------------- Datos	        
	    var data=[{name:"[Seleccione]",	id:"0"}];
	    for(var index in listTemasG){
	    	data.push(listTemasG[index]);
	    }
	    
	    var pStore = new Memory({
	        data: data
	    });

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
        	dom.byId('otroVisibleAccion1').style.display='none';
        	dom.byId('otroVisibleAccion2').style.display='none';
        	dom.byId('otroVisibleAccion3').style.display='none';
		}
        	    

	    //---------------------------------- Dojo
	    var prSelectCom = new FilteringSelect({
           id: 'prSelectCom',
           value:itemToEdit.idComite,
           store: pStore,
           width:100,
           readOnly:true,
           style:"width:380px",
           searchAttr: 'name'
        }, 'prSelectCom').on ('change', function(){     
        	
        	if( registry.byId("prSelectCom").get('displayedValue') == "Otro" ){
		    		
    			dom.byId('otro3Visible').style.display='block';
    			dom.byId('otroVisibleAccion1').style.display='block';
    			dom.byId('otroVisibleAccion2').style.display='block';
    			dom.byId('otroVisibleAccion3').style.display='block';
    			
    			
    			registry.byId('nomOtroComite').set ('required',true);
    			    		        			
    		} else {    
    			dom.byId('otro3Visible').style.display='none';
    			dom.byId('otroVisibleAccion1').style.display='none';
    			dom.byId('otroVisibleAccion2').style.display='none';
    			dom.byId('otroVisibleAccion3').style.display='none';
        			registry.byId('nomOtroComite').set ('required',false);
		        
    		}
        	        	
        });
		    		   		   
	    var accion1 = new ValidationTextBox({
           promptMessage:"Escriba la acci\u00f3n por cumplir en este comit\u00e9",
           value:itemToEdit.accion1, 
           trim:"true",
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
           //readOnly:true,
           uppercase: true,
           maxLength:"250",
           style:"display:block; width:280px"
        }, 'accion3');
			  	    		
		
	    var accion5 = new ValidationTextBox({
           promptMessage:"Escriba la acci\u00f3n por cumplir en este comit\u00e9",
           value:itemToEdit.accion5, 
           trim:"true",
           //readOnly:true,
           uppercase: true,
           maxLength:"250",
           style:"display:block; width:280px"
        }, 'accion5');
			  	    					  	    		
	    var nomOtroComite = new ValidationTextBox({
           promptMessage:"Nombre de Otro Comit\u00e9",
           value:itemToEdit.nomOtroComite, 
           trim:"true",
           uppercase: true,
           maxLength:"250",
           readOnly:true,
           style:"display:block; width:280px"
        }, 'nomOtroComite');
		
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
			label : " Aceptar " ,
			onClick : function() {
				
				if( registry.byId("prSelectCom").get('displayedValue') == "Otro" ){			    		
	    			registry.byId('nomOtroComite').set ('required',true);
	    		} else {    
	        			registry.byId('nomOtroComite').set ('required',false);
				}
				
				var form = registry.byId('dDetail');
				if (!form.validate()){  
					utils.cstmAlert('Favor de registrar los datos requeridos');
					return false;
				}

				var grid;
				if(sesionComite==1){
					grid = registry.byId('7Grid');	
				} else {
					grid = registry.byId('7_1Grid');
				}
				
				var gridRNE = registry.byId('avanceOtroDt');
				   
			    if(otrosSeleccionadoActivo==1){
				   if(registry.byId("otroDt").get('value')==null || registry.byId("otroDt").get('value') == ''){
					   utils.cstmAlert('Favor de registrar el OTRO Recurso no econ\u00f3mico');
	                   return false;
	    		   }				   
			    }
		
				if( registry.byId("prSelectCom").get('displayedValue') == "Otro" ){			    		
	    			
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
				
				
			
				if(registry.byId("accion4").get('value')==0)
				{
					utils.cstmAlert('Favor de selecionar el avance del programa de actividades del comit\u00E9 ');
					return false;
				}
			
				
				
				
				var index = grid.selection.selectedIndex;
				var item = grid.getItem(index);
				try{
					grid.store.setValue(item, 'accion1', accion1.get('value'));
					grid.store.setValue(item, 'accion2', accion2.get('value'));
					grid.store.setValue(item, 'accion3', accion3.get('value'));
					grid.store.setValue(item, 'accion4', accion4.get('value'));
					grid.store.setValue(item, 'accion5', accion5.get('value'));

					registry.byId('dDetail').destroyRecursive(false);
				}catch(e){
					utils.cstmAlert('Ocurrio un error al Agregar o Editar');
					console.log(e);
				}	
			}    
		},'prBtnAceptar');
    			
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
		    
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "550px" >'+
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
								   '</table>';
		    
	    //---------------------------------- Datos     			    
	        
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
	    
	    if(edit==true){	
	        	if(itemToEdit.idComite>=13){
	        		dom.byId('otro3Visible').style.display='block';
     		} else {			
	        		dom.byId('otro3Visible').style.display='none';
			    
	        		}
	        	} else {
	        	dom.byId('otro3Visible').style.display='none';
 			
	        		}
	    
		    //---------------------------------- Dojo
	    var nomOtroComite = new ValidationTextBox({
	           promptMessage:"Nombre de Otro Comite",
	           value:itemToEdit.nomOtroComite, 
	           trim:"true",
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


	        	if( registry.byId("idSelect").get('displayedValue') == "Otro" ){
			    		
	    			dom.byId('otro3Visible').style.display='block';
	    			registry.byId('nomOtroComite').set ('required',true);
	    			    		        			
	    		} else {    
	    			dom.byId('otro3Visible').style.display='none';
	        			registry.byId('nomOtroComite').set ('required',false);
			        
	    				}
	        });
		    
	    new ValidationTextBox({    		           
           value:itemToEdit.noIntegrantes, 
           trim:"true",
           required : true,
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
	           style:"display:block; width:280px"
        }, 'nombrePresidente');
		  
		new FilteringSelect({
	           id: 'idSelectCalidad',
	           value:itemToEdit.idCalidad,
	           store: calidadStore,	  		           
	           searchAttr: 'name'
        }, 'calidadPresidente');	  
			
		new FilteringSelect({
		           id: 'idSelectAcuerdo',
		           value:itemToEdit.idAcuerdo,
		           store: acuerdoStore,	  		           
		           searchAttr: 'name'
        }, 'acuerdoComite');	
			
		         			    
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
 							utils.cstmAlert('Favor de registrar los datos requeridos');
	    						return false;	
 						}
 							
 					}
   					
   		        	
   		        	var gridCom = registry.byId('7_1Grid');
   		        	var gridComSeg = registry.byId('7Grid');
   		        	if(!edit){
   		        	for ( var i = 0; i < gridCom.rowCount; i++) {
   		        		
   		 				var item = gridCom.getItem(i);
   		 				
   		 				if( gridCom.store.getValue(item,'idComite') == registry.byId("idSelect").get('value')){
   		 					utils.cstmAlert("Ya existe registrado el Comite en nuevos comites");
   		 					return;
   		 				}

   		 			}
   		        	
   		        	for ( var i = 0; i < gridComSeg.rowCount; i++) {
   		        		
   		 				var item = gridComSeg.getItem(i);
   		 				
   		 				if( gridComSeg.store.getValue(item,'idComite') == registry.byId("idSelect").get('value')){
   		 					utils.cstmAlert("Ya existe registrado el Comite en seguimiento");
   		 					return;
   		 				}

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
   						} else {
   							 var myNewItem = {  ceComites: ++maxIndexComites, 
   									 			idComite: registry.byId("idSelect").get('value'),
			    									nomComite:  registry.byId("idSelect").get('displayedValue'),
			    									numIntegrantes:   registry.byId("noIntegrantes").get('value'),
			    									nomPresidente:  registry.byId("nombrePresidente").get('value'),
			    									idCalidad:  registry.byId("idSelectCalidad").get('value'),
			    									nomCalidad: registry.byId("idSelectCalidad").get('displayedValue'),
			    									idAcuerdo:  registry.byId("idSelectAcuerdo").get('value'),
			    									acuerdo:  registry.byId("idSelectAcuerdo").get('displayedValue'),
			    									nomOtroComite: 	registry.byId("nomOtroComite").get('value')
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
	    
	function saveSegundaSesion(cct) {
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
      if(ceSesion.numIntegrantes<2 || ceSesion.numIntegrantes>15)
    	  {
    	  utils.cstmAlert("El n&#250;mero de asistentes no puede ser menor a 2 o mayor a 15");
			return false;
    	  }
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
		tcomiteSeguimiento = [];
		tcomiteIntegrantes = [];
		tcomiteActual = [];
		teventos = [];
		testimulos = [];
		tasunto = [];
		var tpreguntas={};	
		
		if(array.indexOf(actividadesArray,31)!=-1){
			
			// Validacion de programas registrados en la primera sesion
	        progSeg = tDetalle;
	        tmpVacio=1;
	        tmpVacioSegundaSesion=1;
	        
	        for(var i=0;i<progSeg.length;i++){                                                         
	                        listaProgramas = progSeg[i];
	                        if(listaProgramas.cSesion==3 ){
	                        	if(listaProgramas.avance==null || listaProgramas.avance==''){	
			            	        	
			            	        	tmpVacioSegundaSesion=0;       
	                        	}
	                        }
	                        if(listaProgramas.cSesion==2 ){
		                        if(listaProgramas.avance==null || listaProgramas.avance==''){
		                                        tmpVacio=0;
		                        }
	                        }
	        }
	        
	        if(tmpVacio==0)
	        {
	                       jsUtils.cstmAlert('Debe registrar avance en los Programas registrados en Primera Sesi\u00f3n');
	                       return false;
	        }
	        if(tmpVacioSegundaSesion==0)
	        {
	        	
	                       jsUtils.cstmAlert('Debe registrar avance en los Programas que acaba de agregar en la Segunda Sesi\u00f3n');
	                       return false;
	        }
		//----------------------------------------------------------------- Lee informacion programas federales seguimiento
		progFedSeg = tDetalle; 		 
		for(var i=0;i<progFedSeg.length;i++){				
			listaProgramas = progFedSeg[i];
			//if(listaProgramas.tipoPrograma==0 ){//&& listaProgramas.cSesion==2){
				tAvance = listaProgramas.avance?listaProgramas.avance:null;
				
				var fedS = {
						idPrograma : listaProgramas.idPrograma,						
						idDetalle : listaProgramas.idDetalle,
						idObjetivo : listaProgramas.idObjetivo,
						cSesion : listaProgramas.cSesion,
						avance : tAvance,
						seguimiento :	listaProgramas.seguimiento,
						monto2Sesion : listaProgramas.cambioMonto==1?listaProgramas.monto2Sesion:null,
						montoStr2Sesion :listaProgramas.cambioMonto==1?listaProgramas.montoStr2Sesion:null,
						cambioMonto : listaProgramas.cSesion==3?2:listaProgramas.cambioMonto
					
				};							
				tfederalSeguimiento.push(fedS);
				
			//}
		}
		//----------------------------------------------------------------- Fin programas federales seguimiento
		//----------------------------------------------------------------- Lee informacion programas federales actuales

			var gridFed = registry.byId('1_1Grid');
			
			for ( var i = 0; i < gridFed.rowCount; i++) {

				var item = gridFed.getItem(i);														
				
				detalle = [];
				
				if( gridFed.store.getValue(item,'idPrograma') >= 81 ){
					detalle = [{		 					
 					idObjetivo: gridFed.store.getValue(item,'idObjetivo'),
 					objetivo: gridFed.store.getValue(item,'objetivo'),
 					meta: gridFed.store.getValue(item,'meta')
 					
 				}];
				} else {
					detalle = item.objetivos;
				}
				var federal = {		 						 
        			idPrograma: gridFed.store.getValue(item,'idPrograma'), 
        			nomPrograma: gridFed.store.getValue(item,'nomPrograma'),
        			nomOtroPrograma:gridFed.store.getValue(item,'nomOtroPrograma'),
        			objetivos: detalle,    	                    			
        			monto: gridFed.store.getValue(item,'monto'),
        			montoStr: gridFed.store.getValue(item,'montoStr')                    					 								
				};
				
				tfederalActual.push(federal);		 									 				
			}		
		//----------------------------------------------------------------- Fin programas federales actuales
		//----------------------------------------------------------------- Lee informacion programas estatales seguimiento
		progEstSeg = segundaSesionObj.estatalSeguimiento?segundaSesionObj.estatalSeguimiento:[];		 
		for(var i=0;i<progEstSeg.length;i++){			
			listaProgramas = progEstSeg[i];
			var fedS = {
					idPrograma : listaProgramas.idPrograma[0],
					nomPrograma: listaProgramas.nomPrograma[0],
						  monto: listaProgramas.monto[0],
					   montoStr: listaProgramas.montoStr[0]
			};
						
			testatalSeguimiento.push(fedS);
		}
		//----------------------------------------------------------------- Fin programas estatales seguimiento
		//----------------------------------------------------------------- Lee informacion programas estatales actuales
		
		var gridEstatal = registry.byId('2_1Grid');
			
			for ( var i = 0; i < gridEstatal.rowCount; i++) {

				var item = gridEstatal.getItem(i);														
							
				var detalle = [{		 					
					idObjetivo: gridEstatal.store.getValue(item,'idObjetivo'),
					objetivo: gridEstatal.store.getValue(item,'objetivo'),
					meta: gridEstatal.store.getValue(item,'meta'),
				}];
				
				var estatal = {
        			idPrograma: gridEstatal.store.getValue(item,'idPrograma'), 
        			nomPrograma: gridEstatal.store.getValue(item,'nomPrograma'),
        			nomOtroPrograma:gridEstatal.store.getValue(item,'nomOtroPrograma'),
        			objetivos: detalle,                    			
        			monto: gridEstatal.store.getValue(item,'monto'),
        			montoStr: gridEstatal.store.getValue(item,'montoStr')                    					 								
				};
							
				testatalActual.push(estatal);
			}	
		//----------------------------------------------------------------- Fin programas estatales actuales
		//----------------------------------------------------------------- Lee informacion programas municipales seguimiento
		progMunSeg = segundaSesionObj.municipalSeguimiento?segundaSesionObj.municipalSeguimiento:[];		 
		for(var i=0;i<progMunSeg.length;i++){			
			listaProgramas = progMunSeg[i];
			var fedS = {
					idPrograma : listaProgramas.idPrograma[0],
					nomPrograma: listaProgramas.nomPrograma[0],
						  monto: listaProgramas.monto[0],
					   montoStr: listaProgramas.montoStr[0]
			};
						
			tmunicipalSeguimiento.push(fedS);
		}
		//----------------------------------------------------------------- Fin programas municipales seguimiento
		//----------------------------------------------------------------- Lee informacion programas municipales actuales
		var gridMunicipal = registry.byId('3_1Grid');
			
			for ( var i = 0; i < gridMunicipal.rowCount; i++) {

				var item = gridMunicipal.getItem(i);														
						
				var detalle = [{		 					
					idObjetivo: gridMunicipal.store.getValue(item,'idObjetivo'),
					objetivo: gridMunicipal.store.getValue(item,'objetivo'),
					meta: gridMunicipal.store.getValue(item,'meta'),
				}];
				
				var Municipal = {		 						
        			idPrograma: gridMunicipal.store.getValue(item,'idPrograma'), 
        			nomPrograma: gridMunicipal.store.getValue(item,'nomPrograma'),
        			nomOtroPrograma:gridMunicipal.store.getValue(item,'nomOtroPrograma'),
        			objetivos: detalle,
        			monto: gridMunicipal.store.getValue(item,'monto'),
        			montoStr: gridMunicipal.store.getValue(item,'montoStr')                    					 								
				};
							
				tmunicipalActual.push(Municipal);
			}
				
		//----------------------------------------------------------------- Fin programas municipales actuales
		//----------------------------------------------------------------- Lee informacion programas OSC seguimiento	
		progoscSeg = segundaSesionObj.oscSeguimiento?segundaSesionObj.oscSeguimiento:[];		 
		for(var i=0;i<progoscSeg.length;i++){			
			listaProgramas = progoscSeg[i];
			var fedS = {
					idPrograma : listaProgramas.idPrograma[0],
					nomPrograma: listaProgramas.nomPrograma[0],
						  monto: listaProgramas.monto[0],
					   montoStr: listaProgramas.montoStr[0]
			};
						
			toscSeguimiento.push(fedS);
		}
		//----------------------------------------------------------------- Fin programas OSC seguimiento
		//----------------------------------------------------------------- Lee informacion programas OSC actuales		
		var gridOSC = registry.byId('4_1Grid');
			
			for ( var i = 0; i < gridOSC.rowCount; i++) {

				var item = gridOSC.getItem(i);														
						
				var detalle = [{		 					
					idObjetivo: gridOSC.store.getValue(item,'idObjetivo'),
					objetivo: gridOSC.store.getValue(item,'objetivo'),
					meta: gridOSC.store.getValue(item,'meta'),
				}];
				
				var OSC = {		 						
        			idPrograma: gridOSC.store.getValue(item,'idPrograma'), 
        			nomPrograma: gridOSC.store.getValue(item,'nomPrograma'),
        			nomOtroPrograma:gridOSC.store.getValue(item,'nomOtroPrograma'),
        			objetivos: detalle,
        			monto: gridOSC.store.getValue(item,'monto'),
        			montoStr: gridOSC.store.getValue(item,'montoStr')                    					 								
				};
							
				toscActual.push(OSC);
			}
						
	
		//----------------------------------------------------------------- Fin programas OSC actuales
		
			var g1 = registry.byId('1Grid');
			var g2 = registry.byId('1_1Grid');
			var g3 = registry.byId('2Grid');
			var g4 = registry.byId('2_1Grid');
			var g5 = registry.byId('3Grid');
			var g6 = registry.byId('3_1Grid');
			var g7 = registry.byId('4Grid');
			var g8 = registry.byId('4_1Grid');
			var totfed=g1.rowCount+g2.rowCount;
			var totest=g3.rowCount+g4.rowCount;
			var totmun=g5.rowCount+g6.rowCount;
			var totosc=g7.rowCount+g8.rowCount;
		}
		if(array.indexOf(actividadesArray,33)!=-1){
	        // Validacion de acciones registradas en la primera sesion
	        tmpVacio=1;
	        var gridAcciones = registry.byId('5Grid');                             
	        for ( var i = 0; i < gridAcciones.rowCount; i++) {
	                        var item = gridAcciones.getItem(i);                                                                                                                                                                                                                                                                                                                  
	                        
	                        if( gridAcciones.store.getValue(item,'avanceAccion') == "" )
	                        {
	                                        tmpVacio=0;
	                        }
	                                        //gridAcciones.store.getValue(item,'avanceRecomendacion')                 
	        }
	        
	        if(tmpVacio==0)
	        {
	                       jsUtils.cstmAlert('Debe registrar avance en las acciones registradas en Primera Sesi\u00f3n');
	                       return false;
	        }
	        

	    //----------------------------------------------------------------- Lee informacion de acciones		
		 //   var gridAcciones = registry.byId('5Grid');
			
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
		if(array.indexOf(actividadesArray,32)!=-1){
	//----------------------------------------------------------------- Lee informacion de recursos		
		
		var gridRecursos = registry.byId('rGrid');
		var repFed=0;
		var repEst=0;
		var repMun=0;
		var repOSc=0;
		for ( var i = 0; i < gridRecursos.rowCount; i++) {

			var item = gridRecursos.getItem(i);		
			var recurso;
						if(gridRecursos.store.getValue(item,'tprogramaEstatales')==null){
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
            
//            if(seleccionoSi>1 || seleccionoSi==0)
//            {
//                   utils.cstmAlert("Debe registrar 1 solo SI en la participaci\u00f3n del Consejo Escolar");
//                   return false;
//            }

            if(recurso.tprogramaFederales==2 && recurso.tprogramaEstatales==2 && recurso.tprogramaMunicipales==2 && recurso.tprogramaOsc==2){
				//repFed=repFed+1;
				if(array.indexOf(actividadesArray,31)!=-1){
					
					
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
            
            if(array.indexOf(actividadesArray,31)!=-1){
            	
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
		if(array.indexOf(actividadesArray,34)!=-1){
		 //----------------------------------------------------------------- Lee informacion de normalidad
		
	
		  var gridNormalidad = registry.byId('nGrid');
			error=1;
			 for ( var i = 0; i < gridNormalidad.rowCount; i++) {
                        var item = gridNormalidad.getItem(i);                                                                                                                                                                                                                                                                                                                  
		                        
                        if( gridNormalidad.store.getValue(item,'opcionCasiSiempre')==null)
                        {
                        	error=0;
                        }
		                                                        
		        }
		        
		        if(error==0)
		        {
                       jsUtils.cstmAlert('Debe registrar avance en las normalidades registradas en Primera Sesi\u00f3n');
                       return false;
		        }
			
			
			for ( var i = 0; i < gridNormalidad.rowCount; i++) {

				var item = gridNormalidad.getItem(i);														
							
				var normalidad = {
						cNormalidad: gridNormalidad.store.getValue(item,'cNormalidad'), 
						accion1: gridNormalidad.store.getValue(item,'accion1'),	
						accion2: gridNormalidad.store.getValue(item,'accion2'),	
						opcionCasiSiempre: gridNormalidad.store.getValue(item,'opcionCasiSiempre'),					
						opcionSiempre: gridNormalidad.store.getValue(item,'opcionSiempre'), 
					};
					
				tnormalidad.push(normalidad);
			}
			
			if(registry.byId('pregunta3a').checked==false && registry.byId('pregunta3b').checked==false){
				utils.cstmAlert('Debe contestar la primer pregunta');
				return;
			}
			if(registry.byId('pregunta4a').checked==false && registry.byId('pregunta4b').checked==false){
				utils.cstmAlert('Debe contestar la segunda pregunta');
				return;
			}
			
			tpreguntas = {
					
					respuesta3 : registry.byId('pregunta3a').checked ? 1:2,
					respuesta4 : registry.byId('pregunta4a').checked ? 1:2
					
			};
			

		  //----------------------------------------------------------------- Fin normalidad
		}
		if(array.indexOf(actividadesArray,35)!=-1){
		 //----------------------------------------------------------------- Lee informacion de evaluaciones

			if(infCctNivel.nomNivel=="SECUNDARIA" || infCctNivel.nomNivel=="PRIMARIA"){
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
			
			val1= parseInt(evaluacion.eva1);
			val2= parseInt(evaluacion.eva2);
			val3= parseInt(evaluacion.eva3);
			valt= (val1+val2+val3)*100/100;
			if(valt!=100){
				utils.cstmAlert('El porcentaje de evaluaci\u00f3n no da el 100%');
				return;
			}	
			
			tevaluacion.push(evaluacion);
			}
			
		}
			
	    //----------------------------------------------------------------- Fin evaluaciones
		}
		if(array.indexOf(actividadesArray,36)!=-1){
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
					nomOtroCompromiso: gridCompromiso.store.getValue(item,'nomOtroCompromiso')
				};
				
			if(compromiso.accion1=="" || compromiso.accion1==null)
		        {
		                       jsUtils.cstmAlert('Debe registrar las acciones en los compromisos registrados en la Segunda Sesi\u00f3n');
		                       return false;
		        }
			tcompromiso.push(compromiso);
		}
	
	//----------------------------------------------------------------- Fin compromisos
		}
		if(array.indexOf(actividadesArray,37)!=-1){
	        // Validacion de comites registrados en la primera sesion                           
	        tmpVacio=1;
	        var gridComiteSeg = registry.byId('7Grid');                         
	        for ( var i = 0; i < gridComiteSeg.rowCount; i++) {
	                        var item = gridComiteSeg.getItem(i);                                                                   
	                        if( gridComiteSeg.store.getValue(item,'accion1') == "" || gridComiteSeg.store.getValue(item,'accion1') == null){
	                                        tmpVacio=0;
	                        }
	        }
	        
	        if(tmpVacio==0)
	        {
	                       jsUtils.cstmAlert('Debe registrar las acciones en los comites registrados en Primera Sesi\u00f3n');
	                       return false;
	        }
	        
	        //--------------------------------------------------------------- fin Validaciones

		//----------------------------------------------------------------- Lee informacion de comites seguimiento
		
	        var comiteContraloria=0;
	        var tcomiteSel1=0;
	        var tcomiteSel2=0;
	        var tcomiteSel3=0;
	        var tcomiteSel4=0;
	        var tcomiteSel5=0;
	        var tcomiteSel6=0;
	        var tcomiteSel7=0;
	        var tcomiteSel8=0;
	        var tcomiteSel9=0;
	        var tcomiteSel10=0;
	        var tcomiteSel11=0;
	        var tcomiteSel12=0;
	        var tcomiteSel14=0;
	        var tcomiteSel15=0;
	        var tcomiteinteSel1=0;
	        var tcomiteinteSel2=0;
	        var tcomiteinteSel3=0;
	        var tcomiteinteSel4=0;
	        var tcomiteinteSel5=0;
	        var tcomiteinteSel6=0;
	        var tcomiteinteSel7=0;
	        var tcomiteinteSel8=0;
	        var tcomiteinteSel9=0;
	        var tcomiteinteSel10=0;
	        var tcomiteinteSel11=0;
	        var tcomiteinteSel12=0;
	        var tcomiteinteSel14=0;
	        var tcomiteinteSel15=0;
	        
		//var gridComiteSeg = registry.byId('7Grid');
			
			for ( var i = 0; i < gridComiteSeg.rowCount; i++) {

				var item = gridComiteSeg.getItem(i);														
							
				var comiteSeg = {		  						 
						
						idComite: gridComiteSeg.store.getValue(item,'idComite'),
						accion1: gridComiteSeg.store.getValue(item,'accion1'),		 						
						accion2: gridComiteSeg.store.getValue(item,'accion2'),
						accion3: gridComiteSeg.store.getValue(item,'accion3'),
						accion4: gridComiteSeg.store.getValue(item,'accion4'),
						accion5: gridComiteSeg.store.getValue(item,'accion5'),
						
				};
				if(comiteSeg.idComite==1){
					tcomiteSel1=1;
				}
				if(comiteSeg.idComite==2){
					tcomiteSel2=1;		
								}
				if(comiteSeg.idComite==3){
					tcomiteSel3=1;
				}
				if(comiteSeg.idComite==4){
					tcomiteSel4=1;
				}
				if(comiteSeg.idComite==5){
					tcomiteSel5=1;
				}
				if(comiteSeg.idComite==6){
					tcomiteSel6=1;
				}
				if(comiteSeg.idComite==7){
					tcomiteSel7=1;
				}
				if(comiteSeg.idComite==8){
					tcomiteSel8=1;
				}
				if(comiteSeg.idComite==9){
					tcomiteSel9=1;
				}
				if(comiteSeg.idComite==10){
					tcomiteSel10=1;
				}
				if(comiteSeg.idComite==11){
					tcomiteSel11=1;
				}
				if(comiteSeg.idComite==12){
					tcomiteSel12=1;
				}
				if(comiteSeg.idComite==14){
					tcomiteSel14=1;
				}
				if(comiteSeg.idComite==15){
					tcomiteSel15=1;
				}
				
				if(comiteSeg.idComite==11){
						comiteContraloria++;
					}
				tcomiteSeguimiento.push(comiteSeg);
			}
		//----------------------------------------------------------------- Fin comites seguimiento
		//----------------------------------------------------------------- Lee informacion de comites actuales
			var gridComite = registry.byId('7_1Grid');
 			
 			for ( var i = 0; i < gridComite.rowCount; i++) {

 				var item = gridComite.getItem(i);														
 							
 				var comite = {		  						 
 						ceComites: gridComite.store.getValue(item,'idConsecutivo'),
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
						accion5: gridComite.store.getValue(item,'accion5')
 				};
 				
 				if(comite.accion1=="" || comite.accion1==null)
 		        {
 		                       jsUtils.cstmAlert('Debe registrar las acciones en los comites registrados en Segunda Sesi\u00f3n');
 		                       return false;
 		        }
 				if(comite.idComite==1){
					tcomiteSel1=1;
				}
				if(comite.idComite==2){
					tcomiteSel2=1;		
								}
				if(comite.idComite==3){
					tcomiteSel3=1;
				}
				if(comite.idComite==4){
					tcomiteSel4=1;
				}
				if(comite.idComite==5){
					tcomiteSel5=1;
				}
				if(comite.idComite==6){
					tcomiteSel6=1;
				}
				if(comite.idComite==7){
					tcomiteSel7=1;
				}
				if(comite.idComite==8){
					tcomiteSel8=1;
				}
				if(comite.idComite==9){
					tcomiteSel9=1;
				}
				if(comite.idComite==10){
					tcomiteSel10=1;
				}
				if(comite.idComite==11){
					tcomiteSel11=1;
				}
				if(comite.idComite==12){
					tcomiteSel12=1;
				}
				if(comite.idComite==14){
					tcomiteSel14=1;
				}
				if(comite.idComite==15){
					tcomiteSel15=1;
				}	
				
				if(comite.idComite==11){
					comiteContraloria++;
				}
 				tcomiteActual.push(comite);
 			}
 			
 			if(array.indexOf(actividadesArray,31)!=-1){
	 			
	 			var gfs = registry.byId('1Grid');
	 			var gfn = registry.byId('1_1Grid');
	 			
	 			if((gfs.rowCount>=1 || gfn.rowCount>=1) && comiteContraloria==0){
	 				utils.cstmAlert("Es obligatorio registrar el comite de contralor\u00EDa social");
	 				return false;
	 			}
 			}
		//----------------------------------------------------------------- Fin comites actuales
 		//	----------------------------------------------------------------- Inicia integrantes comites 
	         var gridComiteIntegrantes = registry.byId('1IGrid');
 			
 			for ( var i = 0; i < gridComiteIntegrantes.rowCount; i++) {

 				var item = gridComiteIntegrantes.getItem(i);														
 							
 				var comiteInte = {
 						    id: gridComiteIntegrantes.store.getValue(item,'id'),
			    		    nomEsMiembroCe: gridComiteIntegrantes.store.getValue(item,'nomEsMiembroCe'),
			    		    idIntegrante: gridComiteIntegrantes.store.getValue(item,'idIntegrante'),
			    		    nombreIntegrante: gridComiteIntegrantes.store.getValue(item,'nombreIntegrante'),
			    		    cCalidad: gridComiteIntegrantes.store.getValue(item,'cCalidad'),
			    		    esMiembroCe: gridComiteIntegrantes.store.getValue(item,'esMiembroCe'),
			    		    nomComites: gridComiteIntegrantes.store.getValue(item,'nomComites'),
			    		    idComite: gridComiteIntegrantes.store.getValue(item,'idComite')
 				};
 				if(comiteInte.idComite==1){
					tcomiteinteSel1=1;
				}
				if(comiteInte.idComite==2){
					tcomiteinteSel2=1;		
								}
				if(comiteInte.idComite==3){
					tcomiteinteSel3=1;
				}
				if(comiteInte.idComite==4){
					tcomiteinteSel4=1;
				}
				if(comiteInte.idComite==5){
					tcomiteinteSel5=1;
				}
				if(comiteInte.idComite==6){
					tcomiteinteSel6=1;
				}
				if(comiteInte.idComite==7){
					tcomiteinteSel7=1;
				}
				if(comiteInte.idComite==8){
					tcomiteinteSel8=1;
				}
				if(comiteInte.idComite==9){
					tcomiteinteSel9=1;
				}
				if(comiteInte.idComite==10){
					tcomiteinteSel10=1;
				}
				if(comiteInte.idComite==11){
					tcomiteinteSel11=1;
				}
				if(comiteInte.idComite==12){
					tcomiteinteSel12=1;
				}
				if(comiteInte.idComite==14){
					tcomiteinteSel14=1;
				}
				if(comiteInte.idComite==15){
					tcomiteinteSel15=1;
				}
 				tcomiteIntegrantes.push(comiteInte);
			}
 			
 			if(tcomiteSel1==1){
				if(tcomiteinteSel1==0){ jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de Fomento de actividades relacionadas con la mejora del logro educativo y la promoci\u00F3n de la lectura.');
                 return false;}
			}
			if(tcomiteSel2==1){
				if(tcomiteinteSel2==0){jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de Mejoramiento de la infraestructura educativa.');
                 return false;}		
							}
			if(tcomiteSel3==1){
				if(tcomiteinteSel3==0){jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De protecci\u00F3n civil y de seguridad de las escuelas.');
                 return false;}
			}
			if(tcomiteSel4==1){
				if(tcomiteinteSel4==0){jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De impulso a la activaci\u00F3n f\u00EDsica.');
                 return false;}
			}
			if(tcomiteSel5==1){
				if(tcomiteinteSel5==0){jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De actividades recreativas, art\u00EDsticas o culturales.');
                 return false;}
			}
			if(tcomiteSel6==1){
				if(tcomiteinteSel6==0){jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De desaliento de las pr\u00E1cticas que generen violencia y el consumo de sustancias nocivas para la salud.');
                 return false;}
			}
			if(tcomiteSel7==1){
				if(tcomiteinteSel7==0){jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De establecimiento de consumo escolar.');
                 return false;}
			}
			if(tcomiteSel8==1){
				if(tcomiteinteSel8==0){jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De cuidado al medio ambiente y limpieza del entorno escolar.');
                 return false;}
			}
			if(tcomiteSel9==1){
				if(tcomiteinteSel9==0){ jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De alimentaci\u00F3n saludable.');
                 return false;}
			}
			if(tcomiteSel10==1){
				if(tcomiteinteSel10==0){ jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De inclusi\u00F3n educativa.');
                 return false;}
			}
			if(tcomiteSel11==1){
				if(tcomiteinteSel11==0){jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De contralor\u00EDa Social.');
                 return false;}
			}
			if(tcomiteSel12==1){
				if(tcomiteinteSel12==0){ jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de De nuevas tecnolog\u00EDas.');
                 return false;}
			}
			if(tcomiteSel14==1){
				if(tcomiteinteSel14==0){ jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de Otro.');
                 return false;}
			}
			if(tcomiteSel15==1){
				if(tcomiteinteSel15==0){jsUtils.cstmAlert('Debe registrar al menos un integrante para el comit\u00E9 de Otro.');
                 return false;}
			}
 		//----------------------------------------------------------------- Fin integrantes comites	
 			
		}
		if(array.indexOf(actividadesArray,38)!=-1){
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
					fechaHorariosProgramados: gridEvento.store.getValue(item,'fechaHorariosProgramados'),					
					fuenteRecursos: gridEvento.store.getValue(item,'fuenteRecursos'),     	                    			
					nomOtroEvento: gridEvento.store.getValue(item,'nomOtroEvento'),
					nomOtroFr: gridEvento.store.getValue(item,'nomOtroFr'),
				};
						
			teventos.push(evento);
		}
	
	//----------------------------------------------------------------- Fin eventos
		}
		if(array.indexOf(actividadesArray,39)!=-1){
		
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
						cEstimulo: gridEstimulo.store.getValue(item,'cEstimulo'),
                        nomOtroEstimulo: gridEstimulo.store.getValue(item,'nomOtroEstimulo')

				};
							
				testimulos.push(estimulo);
			}
		
		//----------------------------------------------------------------- Fin estimulos
		}
		if(array.indexOf(actividadesArray,41)!=-1){
		
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
			
			//----------------------------------------------------------------- Fin Asuntos
		}
		if(array.indexOf(actividadesArray,40)!=-1){

 			  tpreguntas = {
					
					respuesta1 : registry.byId('pregunta1a').checked ? 1:registry.byId('pregunta1b').checked ? 2:3,
					respuesta2 : registry.byId('pregunta2a').checked ? 1:registry.byId('pregunta2b').checked ? 2:3,
					respuesta3: tpreguntas.respuesta3,
					respuesta4: tpreguntas.respuesta4
			};
 			 
		}

		// Se integra la segunda sesion.
		var segundaSesion = {
			ceInfGral : ceInfGral,
			ceSesion : ceSesion,
			actividades : actividades,
			detalleSeguimiento : tfederalSeguimiento,			
			federalActual : tfederalActual,
			estatalSeguimiento : testatalSeguimiento,
			estatalActual : testatalActual,
			municipalSeguimiento : tmunicipalSeguimiento,
			municipalActual : tmunicipalActual,
			oscSeguimiento : toscSeguimiento,
			oscActual : toscActual,
			programaRecursos : tprogramaRecursos,
			acciones : tacciones,
			normalidad : tnormalidad,
			evaluacion : tevaluacion,
			compromiso : tcompromiso,
			comiteSeguimiento : tcomiteSeguimiento,
			comiteActual : tcomiteActual,
			integrantesComites:tcomiteIntegrantes,
			eventos : teventos,
			estimulos : testimulos,
			asunto : tasunto,
			preguntas2 : tpreguntas
		};
					 					 			
		console.log(json.toJson(segundaSesion));
		var urlJson = dojo.config.app.urlBase + 'segundaSesion/saveSegundaSesionC1415';		 			                         
			xhr.post({  url : urlJson,
						postData : json.toJson(segundaSesion),
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
	}
	
	function temasFun(){
		if(listTemasG.length==0){
			listTemasG = new Array();
				listTemasG.push({name:"Fomento de actividades relacionadas con la mejora del logro educativo y la promoci\u00F3n de la lectura.",id:1});
				listTemasG.push({name:"Mejoramiento de la infraestructura educativa. ",id:2});
				listTemasG.push({name:"De protecci\u00F3n civil y de seguridad de las escuelas.",id:3});
				listTemasG.push({name:"De impulso a la activaci\u00F3n f\u00EDsica.",id:4});
				listTemasG.push({name:"De actividades recreativas, art\u00EDsticas o culturales.",id:5});
				listTemasG.push({name:"De desaliento de las pr\u00E1cticas que generen violencia y el consumo de sustancias nocivas para la salud.",id:6});
				listTemasG.push({name:"De establecimiento de consumo escolar.",id:7});
				listTemasG.push({name:"De cuidado al medio ambiente y limpieza del entorno escolar.",id:8});
				listTemasG.push({name:"De alimentaci\u00F3n saludable.",id:9});
				listTemasG.push({name:"De inclusi\u00F3n educativa.",id:10});
				listTemasG.push({name:"De contralor\u00EDa Social.",id:11});
				listTemasG.push({name:"De nuevas tecnolog\u00EDas.",id:12});
				listTemasG.push({name:"Otro",id:14});
				listTemasG.push({name:"Otro",id:15});
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
	
   return {
	   init:init,
	   saveSegundaSesion:saveSegundaSesion
   };

   
});

