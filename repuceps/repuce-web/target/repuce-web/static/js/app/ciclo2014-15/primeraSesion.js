define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/form/CheckedMultiSelect","app/util/jsUtils","dojo/_base/xhr","dojo/_base/json",
         "dijit/form/ValidationTextBox","dojo/on","dijit/form/RadioButton","dijit/form/Textarea",
         "dojo/dom", "dojox/grid/cells/dijit", "dojo/data/ItemFileWriteStore", "dijit/form/FilteringSelect",
         "dijit/form/CheckBox", "dojox/grid/EnhancedGrid", "dijit/form/Button", "app/util/constants",  "dijit/form/Form",
         "dojo/_base/xhr", "dojo/DeferredList", "dojox/widget/Standby","dojo/data/ItemFileWriteStore",
         "dojox/form/MultiComboBox","dojox/grid/DataGrid","app/ciclo2014-15/reuniones","dojo/_base/lang","dijit/Dialog",
         "dojo/store/Memory", "dojo/data/ObjectStore","dijit/form/RadioButton"],
         function( ContentPane,registry,array,utils,CheckedMultiSelect,jsUtils,xhr,json,ValidationTextBox,
        			on,RadioButton,Textarea,dom, gridCellsDijit, ItemFileWriteStore, FilteringSelect,
        			CheckBox, EnhancedGrid, Button, constants, Form, xhr, DeferredList, Standby, ItemFileWriteStore,
        			MultiComboBox,DataGrid,reuniones,lang,Dialog,Memory,ObjectStore,RadioButton){
        	

//	funFederal();     	    		
//	funEstatalMunicipalOSC(itemToEdit,option);        	    	
//	funAccion();      	    		
//	funTemas( itemToEdit, option );
//	funComite();
//	funActividad();
//	funAsunto();
	
	var maxIndexProgramasFEd = 0;
	var maxIndexProgramasMUN = 0;
	var maxIndexProgramasLOC = 0;
	var maxIndexProgramasOSC = 0;
	var maxIndexAcciones = 0;
	var maxIndexTemas = 0;
	var maxIndexComites = 0;
	var maxIndexActividades = 0;
	var maxIndexAsuntos = 0;
	
	//var actividadesC= new array();
	
	 listcPrograma = [];
	 listcProgFed = new Array();
	 listcProgEst = new Array();
	 listcProgMun = new Array();
	 listcProgOsc = new Array();
				 
	 itemToEdit = [];
	 listDetalleG = new Array();
	 listObjetivosG = new Array();
	 listTemasG = new Array();
	 listCalidadPresidenteG = new Array();
	 listAcuerdosComite = new Array();
	 listFuenteActividad = new Array();
	 
	 
	 progFederal = new Array();
	 progEstatal = new Array();
	 progMunicipal = new Array();
	 progOsc = new Array();
	 programass = new Array();
	 categoriasA = new Array(); 
			        
	var listPestanias= new Array(	{title:"Programas Federales",	tpoPrograma:1,id:"progFedPane", funcion:"funFederal",idDB:21},
									{title: "Programas Estatales",	tpoPrograma:2,id:"progEstPane", funcion:"funEstatal",idDB:21},
									{title:"Programas Municipales",	tpoPrograma:3,id:"progLocPane", funcion:"funMunicipal",idDB:21},
									{title:"Programas OSC",			tpoPrograma:4,id:"proyOSCPane", funcion:"funOSC",idDB:21},
									{title:"Acciones",				tpoPrograma:5,id:"accionPane", funcion:"funAccion",idDB:22},
//									{title:"Temas Prioritarios",	tpoPrograma:6,id:"temasPane", funcion:"funTemas",idDB:24},
									{title:"Comit\u00E9s",			tpoPrograma:7,id:"comitePane", funcion:"funComite",idDB:25},
									{title:"Actividades",			tpoPrograma:8,id:"activPane", funcion:"funActividad",idDB:27},
									{title:"Normalidad m\u00ednima",tpoPrograma:10,id:"normaPane", funcion:"funNormalidad",idDB:23},
									{title:"Asuntos y acuerdos",	tpoPrograma:9,id:"asuntoPane", funcion:"funAsunto",idDB:26}
								);
	var gridObj;
	
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
    
  //  var infCctNivel = new Object();
    var clave = '';
    var clave1 = '';
        			
		function init(actividades,cCct,ReunionObj, infCctPar){
			primeraSesionObj=ReunionObj;
		   	gActividades=actividades;        		   		        		   	
		   	
		   //	infCctNivel = infCctPar;
	        clave=primeraSesionObj.cctViewVO.cveCct;
		   	
		   	progFederal = [];
		   	progEstatal = [];
			progMunicipal = [];
			progOsc = [];
			programass = [];
		   	categoriasA = [];
	
			listDetalleG = [];
			listObjetivosG = [];
			listTemasG = [];
			listCalidadPresidenteG = [];
			listAcuerdosComite = [];
			listFuenteActividad = [];
			
			
		   	temasFun();
		   	actividadesFun();
		   	//objetivosFun();
		   	calidadPresidenteFun();
		   	programasFun();       
		   	categoriasFun();
        		   	
        		   	
			  if(gActividades.length>0){
				  _pestanias(true);
				  _gridsInicial();
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
		   	progObjetivoFun();
		   	detalleCategoriafun();
		   	
//		   	fCon = registry.byId('pestanias');
//	    	
//	    	fCon.watch("selectedChildWidget", function(name, oval, nval){
//			  //  console.log("Tab seleccionado de ", oval.title, " a ", nval.title);
//			    if(nval.title == 'Comit\u00E9s'){
//			    	jsUtils.cstmAlert('No olvide registrar un comit\u00E9 por cada tema prioritario seleccionado');	
//			    }
//			})
			
	   }
        		
		function detalleCategoriafun(){
			categoriasRegistrados = primeraSesionObj.categoriasActa?primeraSesionObj.categoriasActa:[];
			
			for(var i=0;i<categoriasA.length;i++){
				detalleCategoria = new Array();
				for(var j=0;j<categoriasRegistrados.length;j++){
					
					if(categoriasRegistrados[j].ceActividad == categoriasA[i].idCategoria){
						items = {idObjetivo : categoriasRegistrados[j].idobj, 
                				 meta : categoriasRegistrados[j].meta,
                				 fuente:categoriasRegistrados[j].fuente
                				 };
						
						detalleCategoria.push(items);
					}
				}
				categoriasA[i].nomActividad = detalleCategoria;
			}
		}
        		
		function categoriasFun(){
			categoriasRegistrados = primeraSesionObj.categoriasActa?primeraSesionObj.categoriasActa:[];
			for(var i=0;i<categoriasRegistrados.length;i++){
				listaCategorias = categoriasRegistrados[i];

				catObject = {cPrograma:     	categoriasA.length+1,
							 idCategoria:   	listaCategorias.ceActividad,
							 nomCategoria:     	listaCategorias.categoria,
							 nomOtraCategoria: listaCategorias.nomOtraCategoria,
                    		 objetivo: listaCategorias.actividad,
                    		 meta: listaCategorias.meta,
                    		 fuente:listaCategorias.fuente
                    	
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
        		
		function progObjetivoFun(){
			programasRegistrados = primeraSesionObj.programas?primeraSesionObj.programas:[];
			for(var i=0;i<progFederal.length;i++){
				detallePrograma = new Array();
				for(var j=0;j<programasRegistrados.length;j++){
					if(programasRegistrados[j].tipoPrograma == 0){
						if(progFederal[i].idPrograma == programasRegistrados[j].cPrograma)
						{
							items = {idObjetivo : programasRegistrados[j].idobjetivo, 
                    				 meta : programasRegistrados[j].meta};
    						
    						detallePrograma.push(items);	
						} 
					}
				}
				progFederal[i].objetivos = detallePrograma;
			}
		}
        		
		function programasFun(){
        			programasRegistrados = primeraSesionObj.programas?primeraSesionObj.programas:[];
        			detallePrograma = new Array();
        			        			        			        			        			
        			for(var i=0;i<programasRegistrados.length;i++){
        				listaProgramas = programasRegistrados[i];
        				 
        				if(listaProgramas.tipoPrograma == 0){
//        					progObject = new Object();
//            				progObject.cPrograma = progFederal.length+1;
//            				progObject.idPrograma = listaProgramas.cPrograma;
//            				//progObject.objetivo = listaProgramas.objetivo;
//            				progObject.meta = listaProgramas.meta;
//            				progObject.nomPrograma = listaProgramas.programastr;
//            				progObject.monto = listaProgramas.montodecimal;
//            				progObject.montoStr = listaProgramas.montostr;
            				
        					items = {idObjetivo : listaProgramas.idObjetivo, 
                  				  meta : listaProgramas.meta};
        					
        					progObject = {cPrograma:    progFederal.length+1,
        							      idPrograma:   listaProgramas.cPrograma,
        							      //objetivos:    items,
        							      objetivo:     listaProgramas.objetivo,
        							      meta:         listaProgramas.meta,
        							      nomPrograma:  listaProgramas.programastr,
        							      nomOtroPrograma:   listaProgramas.nomOtroPrograma,
        							      monto:        listaProgramas.montodecimal,
        							      montoStr:     listaProgramas.montostr
        							     };
            				
            						
            				//progObject.objetivo = items;            				            				
        					existeFederal=0;
        					for(var j=0;j<progFederal.length;j++){
        						if(progFederal[j].idPrograma == progObject.idPrograma){
        							existeFederal=1;
        						}
        					}
        					if(existeFederal==0){
        						progFederal.push( progObject );	
        					}
        					
        				} else if(listaProgramas.tipoPrograma == 1){
        					progObject1 = new Object();
            				progObject1.cPrograma = progEstatal.length+1;
            				progObject1.idPrograma = listaProgramas.cPrograma;
            				progObject1.objetivo = listaProgramas.objetivo;
            				progObject1.meta = listaProgramas.meta;
            				progObject1.nomPrograma = listaProgramas.programastr;
            				progObject1.nomOtroPrograma = listaProgramas.nomOtroPrograma;
            				progObject1.monto = listaProgramas.montodecimal;
            				progObject1.montoStr = listaProgramas.montostr;
        					existeEstatal=0;
        					for(var j=0;j<progEstatal.length;j++){
        						if(progEstatal[j].idPrograma == progObject1.idPrograma){
        							existeEstatal=1;
        						}
        					}
        					if(existeEstatal==0){
        						progEstatal.push( progObject1 );	
        					}
        					
        				} else if(listaProgramas.tipoPrograma == 2){
        					progObject1 = new Object();
            				progObject1.cPrograma = progMunicipal.length+1;
            				progObject1.idPrograma = listaProgramas.cPrograma;
            				progObject1.objetivo = listaProgramas.objetivo;
            				progObject1.meta = listaProgramas.meta;
            				progObject1.nomPrograma = listaProgramas.programastr;
            				progObject1.nomOtroPrograma = listaProgramas.nomOtroPrograma;
            				progObject1.monto = listaProgramas.montodecimal;
            				progObject1.montoStr = listaProgramas.montostr;
        					existeMunicipal=0;
        					for(var j=0;j<progMunicipal.length;j++){
        						if(progMunicipal[j].idPrograma == progObject1.idPrograma){
        							existeMunicipal=1;
        						}
        					}
        					if(existeMunicipal==0){
        						progMunicipal.push( progObject1 );	
        					}
        					
        				} else if(listaProgramas.tipoPrograma == 3){
        					progObject1 = new Object();
            				progObject1.cPrograma = progOsc.length+1;
            				progObject1.idPrograma = listaProgramas.cPrograma;
            				progObject1.objetivo = listaProgramas.objetivo;
            				progObject1.meta = listaProgramas.meta;
            				progObject1.nomPrograma = listaProgramas.programastr;
            				progObject1.nomOtroPrograma = listaProgramas.nomOtroPrograma;
            				progObject1.monto = listaProgramas.montodecimal;
            				progObject1.montoStr = listaProgramas.montostr;
        					existeOsc=0;
        					for(var j=0;j<progOsc.length;j++){
        						if(progOsc[j].idPrograma == progObject1.idPrograma){
        							existeOsc=1;
        						}
        					}
        					if(existeOsc==0){
        						progOsc.push( progObject1 );	
        					}
        					
        				}
        			}
        			programass = progFederal;
        		}
        		
		function listaProg(option){
			
			var lstPr=xhr.get({
	            url: dojo.config.app.urlBase + 'catalogos/listProgramas/'+option,
	            sync: false,
	            preventCache:true,
	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
	            handleAs: "json"
	        });        	    		 
		       
	        lstPr.then(function(cPrograma){
	        	if(option==1){
	        		if(listcProgFed.length==0){
	        			listcProgFed.push(cPrograma);	
	        		}    		        			
	        	} else if(option==2){
	        		if(listcProgEst.length==0){
	        			listcProgEst.push(cPrograma);	
	        		}    		        		
	        	} else if(option==3){
	        		if(listcProgMun.length==0){
	        			listcProgMun.push(cPrograma);
	        		}
	        	} else if(option==4){
	        		if(listcProgOsc.length==0){
	        			listcProgOsc.push(cPrograma);
	        		}
	        	}
	        	  				        	  						   			        	      						  
	        });	
		}
        		
		        
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
					   	
					   	if(listPestanias[i].tpoPrograma<5){
				   		  listaProg(listPestanias[i].tpoPrograma);   
				   	   	}
				   }        				   
	    }
        	    
       	    
	    function _gridsInicial(){
        	    	      	    	

        	    	        	    	
        	    	var tabs = {};
        	    	var layout = {};
        	    	var i = 0;
        	    	var data = {
						      identifier: "cPrograma",
						      items: []
						    };
  	    		
        	    	var data5Grid = {
						      identifier: "idAccion",
						      items: []
						    };
        	    	
        	    	var data6Grid = {
						      identifier: "ceComites",
						      items: []
						    };
        	    	
        	    	var data7Grid = {
						      identifier: "ceComites",
						      items: []
						    };
        	    	
        	    	var data9Grid = {
						      identifier: "cscAsunto",
						      items: []
						    };
        	    	
        	    	var newStore1 = new ItemFileWriteStore({data: data}); 
        	    	var newStore2 = new ItemFileWriteStore({data: data});
        	    	var newStore3 = new ItemFileWriteStore({data: data});
        	    	var newStore4 = new ItemFileWriteStore({data: data});
        	    	var newStore5 = new ItemFileWriteStore({data: data5Grid});
        	    	var newStore6 = new ItemFileWriteStore({data: data6Grid});
        	    	var newStore7 = new ItemFileWriteStore({data: data7Grid});
        	    	var newStore8 = new ItemFileWriteStore({data: data});
        	    	var newStore9 = new ItemFileWriteStore({data: data9Grid});        	    	        	    	        	    	
					

        	    	
        	    	//Layout para:
        	    	//Programas Federales
        	    	layout[0] = [[	  { name: 'cPrograma', 					field: 'cPrograma', 		width: '5px'},				                  	  
					    		      { name: 'Programa', 					field: 'idPrograma',  		width:'300px',	hidden:true},
					    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', 	hidden:true},
					    		      { name: 'Metas y objetivos', 			field: 'objetivos', 		width: '160px', hidden:true},					    		      					    		      
					    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
					    		      { name: 'Metas Otros', 				field: 'meta', 				width: '160px', hidden:true},
					    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'300px'},					    		      					    		      
					    		      { name: 'Monto', 						field: 'monto', 			width: '70px'},
					    		      { name: 'Monto(Letra)', 				field: 'montoStr', 			width: '220px'}
					    		]];
        	    	
        	    	//Programas Estatales, Municipales y OSC        	    	
        	    	layout[1] = [[	  { name: 'cPrograma', 					field: 'cPrograma', 		width: '5px', hidden:true},				                  	  
					    		      { name: 'Programa', 					field: 'idPrograma',  		width:'300px',hidden:true},					    		      
					    		      { name: 'Programa', 					field: 'nomPrograma',  		width:'300px'},
					    		      { name: 'Objetivo', 					field: 'objetivo',  		width:'200px'},
					    		      { name: 'Meta', 						field: 'meta',  			width:'200px'},
					    		      { name: 'nomOtroPrograma', 			field: 'nomOtroPrograma',  	width:'5px', hidden:true},
					    		      { name: 'Monto', 						field: 'monto', 			width: '70px'},
					    		      { name: 'Monto(Letra)', 				field: 'montoStr', 			width: '220px'}
					    		]];
        	    	
        	    	//Estos Layout no se utilizaran, solo son para continuar el ciclo en el desplegado
        	    	layout[2] = [[ { name: 'cPrograma', field: 'cPrograma', width: '5px', hidden:true} ]];
        	    	layout[3] = [[ { name: 'cPrograma', field: 'cPrograma', width: '5px', hidden:true} ]];
        	    	
        	    	//Layout para:
        	    	//Acciones
        	    	layout[4] = [[	  { name: 'indAccion', field: 'idAccion', width: '5px',hidden:true},
        	    	              	  { name: 'indAccion', field: 'idRuta', width: '5px',hidden:true},
        	    	              	  { name: 'indAccion', field: 'nomOtraRuta', width: '5px',hidden:true},
        	    	              	  { name: 'L\u00CDNEAS PARA COADYUVAR CON EL CUMPLIMIENTO DE LA RUTA DE MEJORA', field: 'nomRuta', width: '250px'},
					    		      { name: 'PRIMERA ACCION PARA COADYUVAR CON EL CUMPLIMIENTO DE LA RUTA DE MEJORA ', field: 'accion',  width:'250px'},
					    		      { name: 'SEGUNDA ACCION PARA COADYUVAR CON EL CUMPLIMIENTO DE LA RUTA DE MEJORA ', field: 'recomendacion',  width:'250px'}
					    		      ]];
        	    	
        	    	//Layout para:
        	    	//Temas prioritarios
        	    	layout[5] = [[	  { name: 'cPrograma', field: 'idSecuencia', width: '5px', hidden:true},
				                  	  { name: 'idTema', field: 'idTema', width: '5px',hidden:true},				                  	  
					    		      { name: 'Temas prioritarios', field: 'tema',  width:'300px'},
					    		      { name: 'nomOtroTema',field: 'nomOtroTema',  	width:'5px', 	hidden:true}
				    		      ]];
        	    	
        	    	//Layout para:
        	    	//Comites
        	    	layout[6] = [[	  { name: 'idConsecutivo', field: 'ceComites', width: '5px', hidden:true},
				                  	  { name: 'idComite', field: 'idComite', width: '5px',hidden:true},
					    		      { name: 'Comit\u00E9', field: 'nomComite',  width:'150px'},
					    		      { name: 'nomOtroComite', field: 'nomOtroComite',width:'5px',	hidden:true},
					    		      { name: 'Integrantes', field: 'numIntegrantes',  width:'150px'},
					    		      { name: 'Nombre del presidente del comit\u00E9 en el consejo escolar de participaci\u00F3n social', field: 'nomPresidente',  width:'300px'},
					    		      { name: 'idCalidad', field: 'idCalidad',  width:'1px',hidden:true},
					    		      { name: 'Calidad del presidente del comit\u00E9 en el consejo escolar de participaci\u00F3n social', field: 'nomcalidad',  width:'100px'},
					    		      { name: 'idAcuerdo', field: 'idAcuerdo', width: '1px',hidden:true},
					    		      { name: 'Acuerdo del comit\u00E9', field: 'acuerdo', width: '300px'}					    		      
					    		      ]];
        	    	
        	    	//Layout para:
        	    	//Actividades
        	    	layout[7] = [[	  { name: 'cPrograma', 		field: 'cPrograma', width: '5px', hidden:true},
				                  	  { name: 'idCategoria', 	field: 'idCategoria', width: '5px',hidden:true},
					    		      { name: 'Categor\u00EDa', field: 'nomCategoria',  width:'150px'},
					    		      { name: 'nomOtroCategoria',field: 'nomOtroCategoria',width:'5px',hidden:true},
					    		      { name: 'objetivo Otros', 			field: 'objetivo', 			width: '160px', hidden:true},
					    		      { name: 'Metas Otros', 				field: 'meta', 				width: '160px', hidden:true},
					    		      { name: 'Actividad', 		field: 'nomActividad',  width:'150px',hidden:true},
					    		      { name: 'Fuente', 		field: 'fuente',  width:'150px',hidden:true}
					    		]];
        	    	
        	    	//Layout para:
        	    	//Asuntos y acuerdos
        	    	layout[8] = [[	  { name: 'cscAsunto', field: 'cscAsunto', width: '5px',hidden:true},
					    		      { name: 'Asuntos generales', field: 'asunto',  width:'300px'},
					    		      { name: 'Acuerdos aprobados', field: 'acuerdo',  width:'300px'}
					    		      ]];
        	 
	        	    	layoutNor = [[	  { name: 'idNormalidad', field: 'idNormalidad', width: '5px',hidden:true},
 	        	    	              	  { name: 'cNormalidad', field: 'cNormalidad', width: '5px',hidden:true},
 	        	    	              	  { name: 'Normalidad', field: 'descripcion', width: '250px'},
 	        	    	              	  { name: 'Primera Acci\u00F3n a seguir', field: 'accion1', width: '250px'},
 	        	    	              	  { name: 'Segunda Acci\u00F3n a seguir', field: 'accion2', width: '250px'}
 						    		      ]];
 					

	        	    	
        	    	tablaGrid1=	'<table border="0" align="left" width= "900px">'+
        		  	'<tr>' +
        		  	'	<td><input id="1Grid"/></td>'+
        		  	'</tr>'+
        		  	'<tr>' +
        	   	   	'<td><input id="a_1Grid"/>'+
        		   	   	'<input id="e_1Grid"/>'+
        		   	   	'<input id="d_1Grid"/></td>'+
        	   	   	'</tr>'+
        	   	   	'</table>';
    	    		        	    		     
        	    	//------------------- Programas Federales
        	    	if(array.indexOf(gActividades,21)!=-1){
        	    		if(registry.byId('progFedPane')){
        	    			if(!registry.byId('1Grid')){
    	    		dom.byId('progFedPane').innerHTML=tablaGrid1;
        	    	
    	    		
    	    		new DataGrid({
    			        id: '1Grid',
    			        structure: layout[0],
    			        rowSelector: '10px',
    			        height: '300px',
    					width: '850px'
    			        }, '1Grid').startup();    	   		    	    			
       	   			
    	   			var dataJsonStoreFederal = {
    						identifier: 'cPrograma',
    						items: progFederal
    					};

    	   			
    	   			    	   			
    	   			maxIndexFederal = progFederal.length;
    	   			
    				//Se crea el store de los asuntos
    				jsonStoreFederal = new ItemFileWriteStore({data: dataJsonStoreFederal});
    	   				    	
    	    		registry.byId('1Grid').setStore(jsonStoreFederal);
    	    		
    	    		//registry.byId('1Grid').setStore(newStore1);
    			   
    	    		new Button({
    					label : " Agregar ",
    					id:'a_1Grid',	
    					onClick : function() {					
    						funAgregar(1);
    					}
    				}, 'a_1Grid');
    		    	
    		    	new Button({
    					label : " Editar ",
    					id:'e_1Grid',	
    					onClick : function() {	
    						var index = registry.byId('1Grid').selection.selectedIndex;    											
    						if(index!=-1){
    							var item = registry.byId('1Grid').getItem(index);
    	                    	var itemToEdit={selectedItem:index,
    	                    			cPrograma: registry.byId('1Grid').store.getValue(item, 'cPrograma'), 
    	                    			idPrograma: registry.byId('1Grid').store.getValue(item, 'idPrograma'), 
    	                    			nomPrograma: registry.byId('1Grid').store.getValue(item, 'nomPrograma'),
    	                    			nomOtroPrograma: registry.byId('1Grid').store.getValue(item,'nomOtroPrograma'),
    	                    			objetivosSel: item.objetivos,
    	                    			objetivo: registry.byId('1Grid').store.getValue(item, 'objetivo'),
    	                    			meta: registry.byId('1Grid').store.getValue(item, 'meta'),
    	                    			monto: registry.byId('1Grid').store.getValue(item, 'monto'),
    	                    			montoStr: registry.byId('1Grid').store.getValue(item, 'montoStr')
    	                    			};    	                    	
    	                    	funFederal(itemToEdit);
    	                      
    						}else{
    			            	 utils.cstmAlert(
    								'Debe seleccionar solo un registro.');
    			             }
    						
    					}
    				}, 'e_1Grid');
    		    	
    		    	new Button({
    					label : " Eliminar",
    					id: 'd_1Grid',	
    					onClick : function() {					
    						registry.byId('1Grid').removeSelectedRows();
    						registry.byId('1Grid').store.save();
    					}
    				}, 'd_1Grid');  	    	
        	    			}
        	    		}
        	    	}
    		    	//------------------- Programas Federales - Fin
    		    	//------------------- Programas Estatales
    		    	
    		    	tablaGrid2=	'<table border="0" align="left" width= "900px">'+
        		  	'<tr>' +
        		  	'	<td><input id="2Grid"/></td>'+
        		  	'</tr>'+
        		  	'<tr>' +
        	   	   	'<td><input id="a_2Grid"/>'+
        		   	   	'<input id="e_2Grid"/>'+
        		   	   	'<input id="d_2Grid"/></td>'+
        	   	   	'</tr>'+
        	   	   	'</table>';
    		    	if(array.indexOf(gActividades,21)!=-1){
        	    		if(registry.byId('progEstPane')){
        	    			if(!registry.byId('2Grid')){
    	    		dom.byId('progEstPane').innerHTML=tablaGrid2;
        	    	
    	    		new DataGrid({
    			        id: '2Grid',
    			        structure: layout[1],
    			        rowSelector: '10px',
    			        height: '300px',
    					width: '850px'
    			        }, '2Grid').startup();
    	   		
    	    		var dataJsonStoreEstatal = {
    						identifier: 'cPrograma',
    						items: progEstatal
    					};

    	   			maxIndexEstatal = progEstatal.length;
    	   			
    				//Se crea el store de los asuntos
    				jsonStoreEstatal = new ItemFileWriteStore({data: dataJsonStoreEstatal});
    	   				    	
    	    		registry.byId('2Grid').setStore(jsonStoreEstatal);
    	    		//registry.byId('2Grid').setStore(newStore2);
    			   
    	    		new Button({
    					label : " Agregar ",
    					id:'a_2Grid',	
    					onClick : function() {					
    						funAgregar(2);
    					}
    				}, 'a_2Grid');
    		    	
    		    	new Button({
    					label : " Editar ",
    					id:'e_2Grid',
    					onClick : function() {	
    						var index = registry.byId('2Grid').selection.selectedIndex;    											
    						if(index!=-1){												
    							var item = registry.byId('2Grid').getItem(index);
    	                    	var itemToEdit={selectedItem:index,
    	                    			cPrograma: registry.byId('2Grid').store.getValue(item, 'cPrograma'), 
    	                    			idPrograma: registry.byId('2Grid').store.getValue(item, 'idPrograma'), 
    	                    			nomPrograma: registry.byId('2Grid').store.getValue(item, 'nomPrograma'),
    	                    			nomOtroPrograma: registry.byId('2Grid').store.getValue(item,'nomOtroPrograma'),
    	                    			objetivoPrograma: registry.byId('2Grid').store.getValue(item, 'objetivo'),
    	                    			meta: registry.byId('2Grid').store.getValue(item, 'meta'),
    	                    			monto: registry.byId('2Grid').store.getValue(item, 'monto'),
    	                    			montoStr: registry.byId('2Grid').store.getValue(item, 'montoStr')
    	                    			};    	                    	
    	                    	funEstatalMunicipalOSC(itemToEdit,2);
    	                      
    			             }else{
    			            	 utils.cstmAlert(
    								'Debe seleccionar solo un registro.');
    			             }
    						
    					}
    				}, 'e_2Grid');
    		    	
    		    	new Button({
    					label : " Eliminar",
    					id: 'd_2Grid',	
    					onClick : function() {					
    						registry.byId('2Grid').removeSelectedRows();
    						registry.byId('2Grid').store.save();
    					}
    				}, 'd_2Grid');  	    	
        	    			}
        	    		}
    		    	}
    		    	//------------------- Programas Estatales - Fin
    		    	//------------------- Programas Municipales
    		    	tablaGrid3=	'<table border="0" align="left" width= "900px">'+
        		  	'<tr>' +
        		  	'	<td><input id="3Grid"/></td>'+
        		  	'</tr>'+
        		  	'<tr>' +
        	   	   	'<td><input id="a_3Grid"/>'+
        		   	   	'<input id="e_3Grid"/>'+
        		   	   	'<input id="d_3Grid"/></td>'+
        	   	   	'</tr>'+
        	   	   	'</table>';
    		    	if(array.indexOf(gActividades,21)!=-1){
        	    		if(registry.byId('progLocPane')){
        	    			if(!registry.byId('3Grid')){
    	    		dom.byId('progLocPane').innerHTML=tablaGrid3;
        	    	
    	    		new DataGrid({
    			        id: '3Grid',
    			        structure: layout[1],
    			        rowSelector: '10px',
    			        height: '300px',
    					width: '850px'
    			        }, '3Grid').startup();
    	   		
    	    		var dataJsonStoreMunicipal = {
    						identifier: 'cPrograma',
    						items: progMunicipal
    					};

    	   			maxIndexMunicipal = progMunicipal.length;
    	   			
    				//Se crea el store de los asuntos
    				jsonStoreMunicipal = new ItemFileWriteStore({data: dataJsonStoreMunicipal});
    	   				    	
    	    		registry.byId('3Grid').setStore(jsonStoreMunicipal);    	    		
    	    		//registry.byId('3Grid').setStore(newStore3);
    			   
    	    		new Button({
    					label : " Agregar ",
    					id:'a_3Grid',	
    					onClick : function() {					
    						funAgregar(3);
    					}
    				}, 'a_3Grid');
    		    	
    		    	new Button({
    					label : " Editar ",
    					id:'e_3Grid',	
    					onClick : function() {	
    						var index = registry.byId('3Grid').selection.selectedIndex;    											
    						if(index!=-1){												
    							var item = registry.byId('3Grid').getItem(index);
    	                    	var itemToEdit={selectedItem:index,
    	                    			cPrograma: registry.byId('3Grid').store.getValue(item, 'cPrograma'), 
    	                    			idPrograma: registry.byId('3Grid').store.getValue(item, 'idPrograma'), 
    	                    			nomPrograma: registry.byId('3Grid').store.getValue(item, 'nomPrograma'),
    	                    			nomOtroPrograma: registry.byId('3Grid').store.getValue(item,'nomOtroPrograma'),
    	                    			objetivoPrograma: registry.byId('3Grid').store.getValue(item, 'objetivo'),
    	                    			meta: registry.byId('3Grid').store.getValue(item, 'meta'),
    	                    			monto: registry.byId('3Grid').store.getValue(item, 'monto'),
    	                    			montoStr: registry.byId('3Grid').store.getValue(item, 'montoStr')
    	                    			};    	                    	
    	                    	funEstatalMunicipalOSC(itemToEdit,3);
    	                      
    			             }else{
    			            	 utils.cstmAlert(
    								'Debe seleccionar solo un registro.');
    			             }
    						
    					}
    				}, 'e_3Grid');
    		    	
    		    	new Button({
    					label : " Eliminar",
    					id: 'd_3Grid',	
    					onClick : function() {					
    						registry.byId('3Grid').removeSelectedRows();
    						registry.byId('3Grid').store.save();
    					}
    				}, 'd_3Grid');  	    	
        	    			}
        	    		}
    		    	}
    		    	//------------------- Programas Municipales - Fin
    		    	//------------------- Programas OSC
    		    	tablaGrid4=	'<table border="0" align="left" width= "900px">'+
        		  	'<tr>' +
        		  	'	<td><input id="4Grid"/></td>'+
        		  	'</tr>'+
        		  	'<tr>' +
        	   	   	'<td><input id="a_4Grid"/>'+
        		   	   	'<input id="e_4Grid"/>'+
        		   	   	'<input id="d_4Grid"/></td>'+
        	   	   	'</tr>'+
        	   	   	'</table>';
    		    	if(array.indexOf(gActividades,21)!=-1){
        	    		if(registry.byId('proyOSCPane')){
        	    			if(!registry.byId('4Grid')){
    	    		dom.byId('proyOSCPane').innerHTML=tablaGrid4;
        	    	
    	    		new DataGrid({
    			        id: '4Grid',
    			        structure: layout[1],
    			        rowSelector: '10px',
    			        height: '300px',
    					width: '850px'
    			        }, '4Grid').startup();

    	    		var dataJsonStoreOsc = {
    						identifier: 'cPrograma',
    						items: progOsc
    					};

    	   			maxIndexOsc = progOsc.length;
    	   			
    				//Se crea el store de los asuntos
    				jsonStoreOsc = new ItemFileWriteStore({data: dataJsonStoreOsc});
    	   				    	
    	    		registry.byId('4Grid').setStore(jsonStoreOsc);    	    		

    	    		//registry.byId('4Grid').setStore(newStore4);
    			   
    	    		new Button({
    					label : " Agregar ",
    					id:'a_4Grid',	
    					onClick : function() {					
    						funAgregar(4);
    					}
    				}, 'a_4Grid');
    		    	
    		    	new Button({
    					label : " Editar ",
    					id:'e_4Grid',	
    					onClick : function() {	
    						var index = registry.byId('4Grid').selection.selectedIndex;    											
    						if(index!=-1){												
    							var item = registry.byId('4Grid').getItem(index);
    	                    	var itemToEdit={selectedItem:index,
    	                    			cPrograma: registry.byId('4Grid').store.getValue(item, 'cPrograma'), 
    	                    			idPrograma: registry.byId('4Grid').store.getValue(item, 'idPrograma'), 
    	                    			nomPrograma: registry.byId('4Grid').store.getValue(item, 'nomPrograma'),
    	                    			nomOtroPrograma: registry.byId('4Grid').store.getValue(item,'nomOtroPrograma'),
    	                    			objetivoPrograma: registry.byId('4Grid').store.getValue(item, 'objetivo'),
    	                    			meta: registry.byId('4Grid').store.getValue(item, 'meta'),
    	                    			monto: registry.byId('4Grid').store.getValue(item, 'monto'),
    	                    			montoStr: registry.byId('4Grid').store.getValue(item, 'montoStr')
    	                    			};    	                    	
    	                    	funEstatalMunicipalOSC(itemToEdit,4);
    	                      
    			             }else{
    			            	 utils.cstmAlert(
    								'Debe seleccionar solo un registro.');
    			             }
    						
    					}
    				}, 'e_4Grid');
    		    	
    		    	new Button({
    					label : " Eliminar",
    					id: 'd_4Grid',	
    					onClick : function() {					
    						registry.byId('4Grid').removeSelectedRows();
    						registry.byId('4Grid').store.save();
    					}
    				}, 'd_4Grid');  	    	
        	    			}
        	    		}
    		    	}
    		    	//------------------- Programas OSC - Fin
    		    	//------------------- Acciones
    		    	tablaGrid5=	'<table border="0" align="left" width= "900px">'+
        		  	
    		    	'<tr><td>'+ 
					   '	<p> <b>\u00BFEl director (a) de la escuela o quien ejerce la funci\u00F3n directiva, dio a conocer la ruta de mejora del centro escolar?</b></p>'+
					   '	<input id="p1a"/><label for="p1">S\u00ed </label>'+ 
					   '	<br/><input id="p1b"/><label for="p1">No. Solicite al director escolar o quien ejerce la funci\u00F3n directiva, que d\u00E9 a conocer la ruta de mejora </label>'+
					'</td></tr>'+
    		    	'<tr>' +
        		  	'	<td><input id="5Grid"/></td>'+
        		  	'</tr>'+
        		  	'<tr>' +
        	   	   	'<td><input id="a_5Grid"/>'+
        		   	   	'<input id="e_5Grid"/>'+
        		   	   	'<input id="d_5Grid"/></td>'+
        	   	   	'</tr>'+
        	   	   	'</table>';
    		    	if(array.indexOf(gActividades,22)!=-1){
        	    		if(registry.byId('accionPane')){
        	    			if(!registry.byId('5Grid')){
    	    		dom.byId('accionPane').innerHTML=tablaGrid5;
        	    	
    	    		var p1a= new RadioButton({
	 			           checked:primeraSesionObj.preguntas2==null?true: primeraSesionObj.preguntas2.respuesta4==1 ? true:false,
	 			           value: "1",
	 			           name: "p1",
	 			           id:"p1a"
	 			       }, "p1a");
	 				   
	 				  var p1b=new RadioButton({
	 			           checked:primeraSesionObj.preguntas2==null?false: primeraSesionObj.preguntas2.respuesta4==2 ? true:false,
	 			           value: "2",
	 			           name: "p1",
	 			           id:"p1b"
	 			       }, "p1b");
    	    		
    	    		new DataGrid({
    			        id: '5Grid',
    			        structure: layout[4],
    			        rowSelector: '10px',
    			        height: '300px',
    					width: '850px'
    			        }, '5Grid').startup();
    	    		
 
    	    		tmpAccion = primeraSesionObj.acciones ?primeraSesionObj.acciones:[];
       	   			
    	   			var dataJsonStoreAccion = {
    						identifier: 'idAccion',
    						items: tmpAccion
    					};

    	   			maxIndexAcciones = tmpAccion.length;
    	   			
    				//Se crea el store de los asuntos
    				jsonStoreAccion = new ItemFileWriteStore({data: dataJsonStoreAccion});
    	   				    	
    	    		registry.byId('5Grid').setStore(jsonStoreAccion);
//<    	    		registry.byId('5Grid').setStore(newStore5);
    			    
    			    new Button({
    					label : " Agregar ",
    					id:'a_5Grid',	
    					onClick : function() {					
    						funAgregar(5);
    					}
    				}, 'a_5Grid');
    		    	
    		    	new Button({
    					label : " Editar ",
    					id:'e_5Grid',
    					onClick : function() {	
    						var index = registry.byId('5Grid').selection.selectedIndex;    											
    						if(index!=-1){												
    							var item = registry.byId('5Grid').getItem(index);
    	                    	var itemToEdit={selectedItem:index,    	                    			 
    	                    			idAccion: registry.byId('5Grid').store.getValue(item, 'idAccion'), 
    	                    			strPlaneacion: registry.byId('5Grid').store.getValue(item, 'accion'),
    	                    			strRecomendacion: registry.byId('5Grid').store.getValue(item, 'recomendacion'),
    	                    			idRuta: registry.byId('5Grid').store.getValue(item, 'idRuta'),
    	                    			nomRuta: registry.byId('5Grid').store.getValue(item, 'nomRuta'),
    	                    			nomOtraRuta: registry.byId('5Grid').store.getValue(item, 'nomOtraRuta')
    	                    			};    	                    	
    	                    	funAccion(itemToEdit,5);
    	                      
    						}else{
    			            	 utils.cstmAlert(
    								'Debe seleccionar solo un registro.');
    			             }					
    					}
    				}, 'e_5Grid');
    		    	
    		    	new Button({
    					label : " Eliminar",
    					id: 'd_5Grid',
    					onClick : function() {					
    						registry.byId('5Grid').removeSelectedRows();
    						registry.byId('5Grid').store.save();
    					}
    				}, 'd_5Grid');
        	    			}
        	    		}
    		    	}
    		    	//------------------- Acciones - fin
    		    	//------------------- Normalidad
    		    	
    		    	tablaGridn=	'<table border="0" align="left" width= "900px">'+
	 				'<tr><td>'+ 
					   '	<p> <b>\u00BFEl director (a) de la escuela o quien ejerce la funci\u00f3n directiva, dio a conocer el calendario escolar?</b></p>'+
					   '	<input id="pregunta1a"/><label for="pregunta1a">S\u00ed </label>'+ 
					   '	<br/><input id="pregunta1b"/><label for="pregunta1b">No. Solicite al director escolar o quien ejerce la funci\u00f3n directiva que d\u00e9 a conocer el tema.</label>'+
					'</td></tr>'+
					'<tr><td>'+ 
						   '	<p> <b>\u00BFEl director (a) de la escuela o quien ejerce la funci\u00f3n directiva, present\u00f3 al personal que laborar\u00E1 en la escuela en el presente ciclo escolar?</b></p>'+
						   '	<input id="pregunta3a"/><label for="pregunta3a">S\u00ed </label>'+ 
						   '	<br/><input id="pregunta3b"/><label for="pregunta3b">No. Solicite al director escolar o quien ejerce la funci\u00f3n directiva que d\u00e9 a conocer el tema. </label>'+
						'</td></tr>'+
					'<tr><td>'+ 
						   '	<p> <b>\u00BFEl director (a) de la escuela o quien ejerce la funci\u00f3n directiva, dio a conocer los ocho rasgos de la normalidad m\u00ednima que debe observar la Escuela?</b></p>'+
						   '	<input id="pregunta2a"/><label for="pregunta2a">S\u00ed </label>'+ 
						   '	<br/><input id="pregunta2b"/><label for="pregunta2b">No. Solicite al director escolar o quien ejerce la funci\u00f3n directiva que d\u00e9 a conocer el tema. </label>'+
						'</td></tr>'+
						'<tr>' +
	        		  	'	<td><input id="nGrid"/></td>'+
	        		  	'</tr>'+
	        		  	'<tr>' +
	        	   	   	'<td><input id="a_nGrid"/>'+
	        		   	   	'<input id="e_nGrid"/>'+
	        		   	   	'<input id="d_nGrid"/></td>'+
	        	   	   	'</tr>'+
						'</table>';
    		    	if(array.indexOf(gActividades,23)!=-1){
    		    		if(registry.byId('normaPane')){
        	    			if(!registry.byId('nGrid')){
        	    				dom.byId('normaPane').innerHTML=tablaGridn;
        	    				
        	    				new DataGrid({
        	    			        id: 'nGrid',
        	    			        structure: layoutNor,
        	    			        rowSelector: '10px',
        	    			        height: '300px',
        	    					width: '850px'
        	    			        }, 'nGrid').startup();
        		 				
        		 				tmpNormalidad = primeraSesionObj.normalidad ?primeraSesionObj.normalidad:[];
        	       	   			
        	    	   			var dataJsonStoreNorm = {
        	    						identifier: 'cNormalidad',
        	    						items: tmpNormalidad
        	    					};
        
        	    	   			
        		 				maxIndexNormalidad=tmpNormalidad.length;
        	    	   			
        	    				//Se crea el store de los asuntos
        	    				jsonStoreNorm = new ItemFileWriteStore({data: dataJsonStoreNorm});
        	    	   				    	
        	    	    		registry.byId('nGrid').setStore(jsonStoreNorm);
        	//<    	    		registry.byId('5Grid').setStore(newStore5);
        	    			    
        	    			    new Button({
        	    					label : " Agregar ",
        	    					id:'a_nGrid',	
        	    					onClick : function() {					
        	    						funAgregar(10);
        	    					}
        	    				}, 'a_nGrid');
        	    		    	
        	    		    	new Button({
        	    					label : " Editar ",
        	    					id:'e_nGrid',
        	    					onClick : function() {	
        	    						var index = registry.byId('nGrid').selection.selectedIndex;    											
        	    						if(index!=-1){												
        	    							var item = registry.byId('nGrid').getItem(index);
        	    	                    	var itemToEdit={selectedItem:index,
        	    	                    			idNormalidad: registry.byId('nGrid').store.getValue(item, 'idNormalidad'),
        	    	                    			cNormalidad: registry.byId('nGrid').store.getValue(item, 'cNormalidad'),
        	    	                    			descripcion: registry.byId('nGrid').store.getValue(item, 'descripcion'),
        	    	                    			accion1: registry.byId('nGrid').store.getValue(item, 'accion1'),
        	    	                    			accion2: registry.byId('nGrid').store.getValue(item, 'accion2')
        	    	                    			
        	    	                    			};    	                    	
        	    	                    	funNormalidad(itemToEdit,10);
        	    	                      
        	    						}else{
        	    			            	 utils.cstmAlert(
        	    								'Debe seleccionar solo un registro.');
        	    			             }					
        	    					}
        	    				}, 'e_nGrid');
        	    		    	
        	    		    	new Button({
        	    					label : " Eliminar",
        	    					id: 'd_nGrid',
        	    					onClick : function() {					
        	    						registry.byId('nGrid').removeSelectedRows();
        	    						registry.byId('nGrid').store.save();
        	    					}
        	    				}, 'd_nGrid');

        		 				 var pregunta1a= new RadioButton({
        		 			           checked:primeraSesionObj.preguntas2==null?true: primeraSesionObj.preguntas2.respuesta1==1 ? true:false,
        		 			           value: "1",
        		 			           name: "pregunta1",
        		 			           id:"pregunta1a"
        		 			       }, "pregunta1a");
        		 				   
        		 				  var pregunta1b=new RadioButton({
        		 			           checked:primeraSesionObj.preguntas2==null?false: primeraSesionObj.preguntas2.respuesta1==2 ? true:false,
        		 			           value: "2",
        		 			           name: "pregunta1",
        		 			           id:"pregunta1b"
        		 			       }, "pregunta1b");
        		 				  
        		 				 var pregunta2a= new RadioButton({
        		 			           checked:primeraSesionObj.preguntas2==null?true: primeraSesionObj.preguntas2.respuesta2==1 ? true:false,
        		 			           value: "1",
        		 			           name: "pregunta2",
        		 			           id:"pregunta2a"
        		 			       }, "pregunta2a");
        		 				   
        		 				  var pregunta2b=new RadioButton({
        		 			           checked:primeraSesionObj.preguntas2==null?false: primeraSesionObj.preguntas2.respuesta2==2 ? true:false,
        		 			           value: "2",
        		 			           name: "pregunta2",
        		 			           id:"pregunta2b"
        		 			       }, "pregunta2b");
        		 				  
        		 				 var pregunta3a= new RadioButton({
        		 			           checked:primeraSesionObj.preguntas2==null?true: primeraSesionObj.preguntas2.respuesta3==1 ? true:false,
        		 			           value: "1",
        		 			           name: "pregunta3",
        		 			           id:"pregunta3a"
        		 			       }, "pregunta3a");
        		 				   
        		 				  var pregunta3b=new RadioButton({
        		 			           checked:primeraSesionObj.preguntas2==null?false: primeraSesionObj.preguntas2.respuesta3==2 ? true:false,
        		 			           value: "2",
        		 			           name: "pregunta3",
        		 			           id:"pregunta3b"
        		 			       }, "pregunta3b");	
        	    										}
    		    									}
    		    	}
    		    	
    		    	//------------------- Temas
//    		    	tablaGrid6=	'<table border="0" align="left" width= "900px">'+
//        		  	'<tr>' +
//        		  	'	<td><input id="6Grid"/></td>'+
//        		  	'</tr>'+
//        		  	'<tr>' +
//        	   	   	'<td><input id="a_6Grid"/>'+
//        	   	   		'<input id="d_6Grid"/></td>'+
//        	   	   	'</tr>'+        	   	            	   	   	
//        	   	   	'</table>';
//    		    	if(array.indexOf(gActividades,24)!=-1){
//        	    		if(registry.byId('temasPane')){
//        	    			if(!registry.byId('6Grid')){
//    	    		dom.byId('temasPane').innerHTML=tablaGrid6;
//        	    	
//    	    		new DataGrid({
//    			        id: '6Grid',
//    			        structure: layout[5],
//    			        rowSelector: '10px',
//    			        height: '300px',
//    					width: '850px'
//    			        }, '6Grid').startup();
//
//    	    		tmpTema = primeraSesionObj.temas ?primeraSesionObj.temas:[];
//       	   			
//    	   			var dataJsonStoreTema = {
//    						identifier: 'idSecuencia',
//    						items: tmpTema
//    					};
//
//    	   			maxIndexTemas = tmpTema.length;
//    	   			
//    				//Se crea el store de los asuntos
//    				jsonStoreTema = new ItemFileWriteStore({data: dataJsonStoreTema});
//    	   				    	
//    	    		registry.byId('6Grid').setStore(jsonStoreTema);
//    	    		
//    	    		//registry.byId('6Grid').setStore(newStore6);
//    			    
//    			    new Button({
//    					label : " Agregar ",
//    					id:'a_6Grid',	
//    					onClick : function() {					
//    						funAgregar(6);
//    					}
//    				}, 'a_6Grid');    		    	
//    		    	
//    				    			    
//    		    	new Button({
//    					label : " Eliminar",
//    					id: 'd_6Grid',	
//    					onClick : function() {					
//    						registry.byId('6Grid').removeSelectedRows();
//    						registry.byId('6Grid').store.save();
//    					}
//    				}, 'd_6Grid');
//        	    			}
//        	    		}
//    		    	}
    		    	//------------------- Temas - Fin
    		    	//------------------- Comites
    		    	
    		    	tablaGrid7=	'<table border="0" align="left" width= "900px">'+
        		  	'<tr>' +
        		  	'	<td><input id="7Grid"/></td>'+
        		  	'</tr>'+
        		  	'<tr>' +
        	   	   	'<td><input id="a_7Grid"/>'+
        		   	   	'<input id="e_7Grid"/>'+
        		   	   	'<input id="d_7Grid"/></td>'+
        	   	   	'</tr>'+
//	        	   	'<tr>' +
//	     	   	    '	<td><b>** No olvide registrar un comit\u00E9 por cada tema prioritario registrado</b></td>'+
//	     	   	   	'</tr>'+
        	   	   	'</table>';
    		    	if(array.indexOf(gActividades,25)!=-1){
        	    		if(registry.byId('comitePane')){
        	    			if(!registry.byId('7Grid')){
    	    		dom.byId('comitePane').innerHTML=tablaGrid7;
        	    	
    	    		
    	    		new DataGrid({
    			        id: '7Grid',
    			        structure: layout[6],
    			        rowSelector: '10px',
    			        height: '300px',
    					width: '850px'
    			        }, '7Grid').startup();
    	    		
    	    		tmpComites = primeraSesionObj.comites ?primeraSesionObj.comites:[];
       	   			
    	    		for(var i in tmpComites){
    	    			for(var j in listCalidadPresidenteG){
    	    				if(listCalidadPresidenteG[j].id == tmpComites[i].idCalidad){
    	    					tmpComites[i].nomcalidad = listCalidadPresidenteG[j].name;
    	    					break;
    	    				}
    	    			}
    	    		}
    	   			var dataJsonStoreComites = {
    						identifier: 'idComite',
    						items: tmpComites
    					};

    	   			maxIndexComites = tmpComites.length;
    	   			
    				//Se crea el store de los asuntos
    				jsonStoreComites = new ItemFileWriteStore({data: dataJsonStoreComites});
    	   				    	
    	    		registry.byId('7Grid').setStore(jsonStoreComites);
    	    		//registry.byId('7Grid').setStore(newStore7);
    			    
    			    new Button({
    					label : " Agregar ",
    					id:'a_7Grid',	
    					onClick : function() {					
    						funAgregar(7);
    					}
    				}, 'a_7Grid');
    		    	
    		    	new Button({
    					label : " Editar ",
    					id:'e_7Grid',	
    					onClick : function() {	
    						var index = registry.byId('7Grid').selection.selectedIndex;    											
    						if(index!=-1){												
    							var item = registry.byId('7Grid').getItem(index);
    	                    	var itemToEdit={selectedItem:index,
    	                    			ceComites: registry.byId('7Grid').store.getValue(item, 'ceComites'), 
    	                    			idComite: registry.byId('7Grid').store.getValue(item, 'idComite'),
    	                    			nomComite: registry.byId('7Grid').store.getValue(item, 'nomComite'),
    	                    			noIntegrantes: registry.byId('7Grid').store.getValue(item, 'numIntegrantes'),
    	                    			nombrePresidente: registry.byId('7Grid').store.getValue(item, 'nomPresidente'),
    	                    			idCalidad: registry.byId('7Grid').store.getValue(item, 'idCalidad'),
    	                    			calidadPresidente: registry.byId('7Grid').store.getValue(item, 'nomCalidad'),
    	                    			idAcuerdo: registry.byId('7Grid').store.getValue(item, 'idAcuerdo'),
    	                    			acuerdoComite: registry.byId('7Grid').store.getValue(item, 'acuerdo'),
    	                    			nomOtroComite: registry.byId('7Grid').store.getValue(item, 'nomOtroComite')  
    	                    			};    	                    	
    	                    	funComite(itemToEdit,7);
    	                      
    						}else{
    			            	 utils.cstmAlert(
    								'Debe seleccionar solo un registro.');
    			             }					
    					}
    				}, 'e_7Grid');
    		    	
    		    	new Button({
    					label : " Eliminar",
    					id: 'd_7Grid',
    					onClick : function() {					
    						registry.byId('7Grid').removeSelectedRows();
    						registry.byId('7Grid').store.save();
    					}
    				}, 'd_7Grid');
        	    			}
        	    		}
    		    	}
    		    	//------------------- Comites - Fin
    		    	//------------------- Actividades
    		    	
    		    	tablaGrid8=	'<table border="0" align="left" width= "900px">'+
        		  	'<tr>' +
        		  	'	<td><input id="8Grid"/></td>'+
        		  	'</tr>'+
        		  	'<tr>' +
        	   	   	'<td><input id="a_8Grid"/>'+
        		   	   	'<input id="e_8Grid"/>'+
        		   	   	'<input id="d_8Grid"/></td>'+
        	   	   	'</tr>'+
        	   	   	'</table>';
    		    	if(array.indexOf(gActividades,27)!=-1){
        	    		if(registry.byId('activPane')){
        	    			if(!registry.byId('8Grid')){
    	    		dom.byId('activPane').innerHTML=tablaGrid8;
        	    	
    	    		new DataGrid({
    			        id: '8Grid',
    			        structure: layout[7],
    			        rowSelector: '10px',
    			        height: '300px',
    					width: '850px'
    			        }, '8Grid').startup();
    	    		
    	    		var dataJsonStoreCategoria = {
    						identifier: 'cPrograma',
    						items: categoriasA
    					};
    	    		
    	    		maxIndexActividades = categoriasA.length;
    	   			
    				//Se crea el store de los asuntos
    				jsonStoreCategoria = new ItemFileWriteStore({data: dataJsonStoreCategoria});
    	   				    	
    	    		registry.byId('8Grid').setStore(jsonStoreCategoria);
    	    		
    	    		//registry.byId('8Grid').setStore(newStore8);
    			    
    			    new Button({
    					label : " Agregar ",
    					id:'a_8Grid',	
    					onClick : function() {					
    						funAgregar(8);
    					}
    				}, 'a_8Grid');
    		    	
    		    	new Button({
    					label : " Editar ",
    					id:'e_8Grid',
    					onClick : function() {	
    						var index = registry.byId('8Grid').selection.selectedIndex;    											
    						if(index!=-1){	    							
    							var item = registry.byId('8Grid').getItem(index);
    	                    	var itemToEdit={selectedItem:index,
    	                    			cPrograma: registry.byId('8Grid').store.getValue(item, 'cPrograma'), 
    	                    			idCategoria: registry.byId('8Grid').store.getValue(item, 'idCategoria'),
    	                    			nomCategoria: registry.byId('8Grid').store.getValue(item, 'nomCategoria'),
    	                    			nomOtraCategoria: registry.byId('8Grid').store.getValue(item, 'nomOtraCategoria'),
    	                    			nomActividad: item.nomActividad,
    	                    			objetivo: registry.byId('8Grid').store.getValue(item, 'objetivo'),
    	                    			meta: registry.byId('8Grid').store.getValue(item, 'meta'),
    	                    			fuente: registry.byId('8Grid').store.getValue(item, 'fuente')	
    	                    	};    	                    	
    	                    		funActividad(itemToEdit,8);
    	                      
    						}else{
    			            	 utils.cstmAlert(
    								'Debe seleccionar solo un registro.');
    			             }					
    					}
    				}, 'e_8Grid');
    		    	
    		    	new Button({
    					label : " Eliminar",
    					id: 'd_8Grid',	
    					onClick : function() {					
    						registry.byId('8Grid').removeSelectedRows();
    						registry.byId('8Grid').store.save();
    					}
    				}, 'd_8Grid');
        	    			}
        	    		}
    		    	}
    		    	//------------------- Actividades - Fin
    		    	//------------------- Asunto
    		    	tablaGrid9=	'<table border="0" align="left" width= "900px">'+
        		  	'<tr>' +
        		  	'	<td><input id="9Grid"/></td>'+
        		  	'</tr>'+
        		  	'<tr>' +
        	   	   	'<td><input id="a_9Grid"/>'+
        		   	   	'<input id="e_9Grid"/>'+
        		   	   	'<input id="d_9Grid"/></td>'+
        	   	   	'</tr>'+
        	   	   	'</table>';
    		    	if(array.indexOf(gActividades,26)!=-1){
        	    		if(registry.byId('asuntoPane')){
        	    			if(!registry.byId('9Grid')){
    	    		dom.byId('asuntoPane').innerHTML=tablaGrid9;
        	    	
    	    		new DataGrid({
    			        id: '9Grid',
    			        structure: layout[8],
    			        rowSelector: '10px',
    			        height: '300px',
    					width: '850px'
    			        }, '9Grid').startup();

    	    		tmpAsunto = primeraSesionObj.asuntos?primeraSesionObj.asuntos:[];
   	   			
    	   			var dataJsonStoreAsunto = {
    						identifier: 'cscAsunto',
    						items: tmpAsunto
    					};

    	   			maxIndexAsuntos = tmpAsunto.length;
    	   			
    				//Se crea el store de los asuntos
    				jsonStoreAsunto = new ItemFileWriteStore({data: dataJsonStoreAsunto});
    	   				    	
    	    		registry.byId('9Grid').setStore(jsonStoreAsunto);
    			    
    			    new Button({
    					label : " Agregar ",
    					id:'a_9Grid',	
    					onClick : function() {					
    						funAgregar(9);
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
    	                    	funAsunto(itemToEdit,9);
    	                      
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
    						registry.byId('9Grid').removeSelectedRows();
    						registry.byId('9Grid').store.save();
    					}
    				}, 'd_9Grid');
        	    			}
        	    		}
    		    	}
    		    	//------------------- Asunto - Fin
        	    }
        	          		
        	    function funAgregar ( option ){
        	    	itemToEdit=[];
        	    	if(option==1){        	    		 
        	    		funFederal();
        	    	} else if(option>=2 && option<=4){        	    		
        	    		funEstatalMunicipalOSC(itemToEdit,option);        	    	
        	    	} else if(option==5){
        	    		funAccion();
        	    	} else if(option==6){        	    		
        	    		funTemas( itemToEdit, option );
        	    	} else if(option==7){
        	    		funComite();
        	    	} else if(option==8){
        	    		funActividad();
        	    	} else if(option==9){
        	    		funAsunto();
        	    	} else if(option==10){
        	    		funNormalidad();
        	    	}
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
							    			   '<tr id="otro3Visible"><td>'+
							    			   '	<b>*Otro Programa:</div> </b><div id="nomOtroPrograma"/><br/>'+
							    			   '</td></tr>'+
							    			   '<tr id="otro1Visible">' +
							    			   '	<td><b>*Objetivo: </b><div id="strObjetivo" /><br/></td>'+
							    			   '</tr>'+
							    			   '<tr id="otro2Visible">' +
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
        			          			{ name: 'Objetivos especificos del programa', field: 'objetivo', width: '250px'},        			          				
        			          			{ name: 'Meta de la escuela', field: 'meta', 
        			          					editable: true, 
        			          					width: '250px', 
        			          				    type: gridCellsDijit._Widget,
        			          				    widgetClass: ValidationTextBox, 
        			          				    widgetProps: {uppercase:'true', maxlength: '250'} 
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
     			        			    		
     			    		new DataGrid({
    			          		id: 'GridDt',
    			          		structure: layoutDt,
    			          		//autoHeight: true,
    			          		height: '300px',
    			          		rowSelector: '20px'}
    			          	   ,'GridDt').startup();
     			    		 
     			    		new Textarea({
     	    					trim : true,
     	    					uppercase: true,
     							readOnly:true,
     	    					style : "width:750px;"
     	    				}, "objetivoGral"); 		
	   			    //---------------------------------- Datos     			    
				    var entrar=0;    
			        var data=[];
//     			    var data=[{name:"[Seleccione]",	id:"0"}];
//   			    
//    			    for(var a in listcProgFed){
//    				   for(var i in listcProgFed[a]){
//						   data.push({name:listcProgFed[a][i].nomPrograma,id:listcProgFed[a][i].cPrograma});    					  
//    				   }
//    			    }
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
			        
			        var newStoreDtA = new ItemFileWriteStore({data: dataDtB});
			        
			        registry.byId('GridDt').setStore(newStoreDtA);			        			        
			        
    			    var pStore = new Memory({
    			        data: data
    			    });
    			            			    			    
     			    //---------------------------------- Dojo
     			   var programa = new FilteringSelect({
    		           id: 'prSelect',
    		           value:itemToEdit.idPrograma,
    		           store: pStore,
    		           readOnly:edit,
    		           searchAttr: 'name'
    		        }, 'prSelect').on ('change', function(){
    		        	    		        	
    		        	    var gridFed = registry.byId('1Grid');
	
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
    
    					        
    		        			var dataDtA = {
    		         	          		identifier: "idObjetivo",
    		         	          		items: []
    		         		    };
    		        			
    		        			for(var objFed in objsStore ){
    		 		        		if(objsStore[objFed].tpoPrograma == registry.byId("prSelect").get('value') ){

    		 		        			var arregloObjetivos1 = {
    		 						        	                  	id:+n,
    		 						        	                  	idObjetivo: objsStore[objFed].cObjetivo,
    		 					    					        	idSeleccion : false	,
    		 					    					        	objetivo : objsStore[objFed].descripObjetivo,
    		 					    					        	meta: tmpMeta
    		 									   				};
    		 						        
    		 					        dataDtA.items.push(arregloObjetivos1);    		 		        			
    		 		        		}
    		 		        	}   
    		        			
    					        var newStoreDt1 = new ItemFileWriteStore({data: dataDtA});
    					        
    					        registry.byId('GridDt').setStore(newStoreDt1);

    					        for(var a in federalesStore){
    					        	if(registry.byId("prSelect").get('value')==federalesStore[a].cPrograma ){
    					        		registry.byId('objetivoGral').set('value',federalesStore[a].objetivo);
    					        	}    					             
    					        }    					        
    		        		}    		        		    		        	
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
			         //  regExp: constants.NUMBER_MONETARY,
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
     			    					
     			    					var grid = registry.byId('1Grid');
     			    					if(edit){}
       			    					else	
       			    					{
     			    					for ( var i = 0; i < grid.rowCount; i++) {
     			    	 	        		
     			    	 	 				var item = grid.getItem(i);
     			    	 	 				
     			    	 	 				if( grid.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
     			    	 	 					utils.cstmAlert("Ya esta registrado ese programa");
     			    	 	 					return;
     			    	 	 				}

     			    	 	 			}
       			    					}
     			    					try{
     			    						if(edit){
     			    							var index = grid.selection.selectedIndex;
     			    							var item = grid.getItem(index);
     			    							grid.store.setValue(item, 'idPrograma', registry.byId("prSelect").get('value'));
     			    							grid.store.setValue(item, 'nomPrograma', registry.byId("prSelect").get('displayedValue'));
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
     			    						}
     			    						registry.byId('dDetail').destroyRecursive(false);
     			    					}catch(e){
     			    						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
     			    						console.log(e);
     			    					}	     			    					
     			    				}
     			    			},'prBtnAceptar');
     			   
        	    }
        	    function funEstatalMunicipalOSC( itemToEdit, option ){
        	    	var edit=false;
     			    if(itemToEdit.length==0){
     				   itemToEdit={cPrograma: 0,idPrograma:0, nomPrograma:'',objetivoPrograma:'',meta:'',monto:'', montoStr:''};
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
							    			   '<tr id="trMonto"><td> '+
							    			   '	 <b>*Recurso Asignado para ejercer en el presente ciclo escolar</b><br/>'+
							    			   'N\u00FAmero:<input id="monto"/> Letra:<input id="montoStr"/><br/>'+
							    			   '</td></tr>'+							    			   							    			   							    			   							    			   
							    			   '</table>';     			         			   
        			          					        
     			    //---------------------------------- Datos
//     			    var lstPr=xhr.get({
//			            url: dojo.config.app.urlBase + 'catalogos/listProgramas/'+option,
//			            sync: false,
//			            preventCache:true,
//			            contentType: "application/x-www-form-urlencoded; charset=utf-8",
//			            handleAs: "json"
//			        });        	    		 
//				       
//			        lstPr.then(function(cPrograma){
//			        	listcPrograma.push(cPrograma);  				        	  						   			        	      						  
//			        });
				        
     			    var data=[{name:"[Seleccione]",	id:"0"}];
   			    
//     			    if(option==2){
//     			    	for(var a in listcProgEst){
//         				   for(var i in listcProgEst[a]){
//     						   data.push({name:listcProgEst[a][i].nomPrograma,id:listcProgEst[a][i].cPrograma});    					  
//         				   }
//         			    }	
//     			    } else if(option==3){
//     			    	for(var a in listcProgMun){
//          				   for(var i in listcProgMun[a]){
//      						   data.push({name:listcProgMun[a][i].nomPrograma,id:listcProgMun[a][i].cPrograma});    					  
//          				   }
//          			    }	
//      			    } else if(option==4){
//     			    	for(var a in listcProgOsc){
//          				   for(var i in listcProgOsc[a]){
//      						   data.push({name:listcProgOsc[a][i].nomPrograma,id:listcProgOsc[a][i].cPrograma});    					  
//          				   }
//          			    }	
//      			    } 
     			   
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
     		        
     			   if(option==2){
			        	
			        if(edit==true){	
			        	if(itemToEdit.idPrograma>=94){
			        		dom.byId('otro3Visible').style.display='block';
		        		} else {			
			        		dom.byId('otro3Visible').style.display='none';
					    
			        		}
			        	} else {
			        	dom.byId('otro3Visible').style.display='none';
	        			
			        		}
     			   } else if(option==3){
     				  if(edit==true){	
  			        	if(itemToEdit.idPrograma>=109){
  			        		dom.byId('otro3Visible').style.display='block';
  		        		} else {			
  			        		dom.byId('otro3Visible').style.display='none';
  					    
  			        		}
  			        	} else {
  			        	dom.byId('otro3Visible').style.display='none';
  	        			
  			        		}   
     			   } else if(option==4){
     				  if(edit==true){	
  			        	if(itemToEdit.idPrograma>=123){
  			        		dom.byId('otro3Visible').style.display='block';
  		        		} else {			
  			        		dom.byId('otro3Visible').style.display='none';
  					    
  			        		}
  			        	} else {
  			        	dom.byId('otro3Visible').style.display='none';
  	        			
  			        		}
     			   }
//     			   
     			   
    			    var pStore = new Memory({
    			        data: data
    			    });
    			        			    
     			    //---------------------------------- Dojo
     			   var prSelect = new FilteringSelect({
    		           id: 'prSelect',
    		           value:itemToEdit.idPrograma,
    		           store: pStore,
    		           readOnly:edit,
    		           searchAttr: 'name'
    		        }, 'prSelect').on ('change', function(){     
    		        	

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
     			   
     			    if(option==2){
     			    new Button({
     			    				label : " Aceptar " ,
     			    				onClick : function() {
     			    					var form = registry.byId('dDetail');
     			    					if (!form.validate()){  
     			    						utils.cstmAlert('Favor de registrar los datos requeridos');
     			    						return false;
     			    					}
     			    					var tmpnomOtroPrograma = "";
     			    					tmpnomOtroPrograma = registry.byId("nomOtroPrograma").get('value');
     			    					
     			    					if(registry.byId("prSelect").get('value')==0)
     			    					{
     			    						utils.cstmAlert('Favor de selecionar un programa Estatal');
     			    						return false;
     			    					}
     			    					
     			    					if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
     			    						if( registry.byId("nomOtroPrograma").get('value') == null || registry.byId("nomOtroPrograma").get('value') == ''){
     			    							utils.cstmAlert('Favor de registrar el Nombre del Programa Estatal Otro');
	     			    						return false;
     			    						}
     			    					}
     			    					var grid = registry.byId('2Grid');
     			    					if(edit){}
       			    					else	
       			    					{
     			    					for ( var i = 0; i < grid.rowCount; i++) {
     			    	 	        		
     			    	 	 				var item = grid.getItem(i);
     			    	 	 				
     			    	 	 				if( grid.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
     			    	 	 					utils.cstmAlert("Ya esta registrado ese programa ");
     			    	 	 					return;
     			    	 	 				}

     			    	 	 			}
       			    					}
     			    					try{
     			    						if(edit){
     			    							var index = grid.selection.selectedIndex;
     			    							var item = grid.getItem(index);
     			    							//grid.store.setValue(item, 'idPrograma', registry.byId("prSelect").get('value'));
     			    							//grid.store.setValue(item, 'nomPrograma', registry.byId("prSelect").get('displayedValue'));
     			    							grid.store.setValue(item, 'objetivo', strObjetivo.get('value'));
     			    							grid.store.setValue(item, 'meta', strMeta.get('value'));
     			    							grid.store.setValue(item, 'monto', registry.byId("monto").get('value'));
     			    							grid.store.setValue(item, 'montoStr', registry.byId("montoStr").get('value'));
     			    							grid.store.setValue(item, 'nomOtroPrograma', tmpnomOtroPrograma);
     			    						} else {
     			    							 var myNewItem = {  cPrograma: ++maxIndexEstatal, 
     			    									idPrograma: registry.byId("prSelect").get('value'),
     			    									nomPrograma:  registry.byId("prSelect").get('displayedValue'),
     			    									objetivo: strObjetivo.get('value'), 
     			    									meta:  strMeta.get('value'),
     			    									monto:  registry.byId("monto").get('value'),
     			    									montoStr:  registry.byId("montoStr").get('value'),
     			    									nomOtroPrograma: tmpnomOtroPrograma
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
     			   if(option==3){
        			    new Button({
        			    				label : " Aceptar " ,
        			    				onClick : function() {
        			    					var form = registry.byId('dDetail');
        			    					if (!form.validate()){  
        			    						utils.cstmAlert('Favor de registrar los datos requeridos');
        			    						return false;
        			    					}
        			    					var tmpnomOtroPrograma = "";
         			    					tmpnomOtroPrograma = registry.byId("nomOtroPrograma").get('value');
        			    					var grid = registry.byId('3Grid');
        			    					if(edit){}
           			    					else	
           			    					{
        			    					for ( var i = 0; i < grid.rowCount; i++) {
         			    	 	        		
         			    	 	 				var item = grid.getItem(i);
         			    	 	 				
         			    	 	 				if( grid.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
         			    	 	 					utils.cstmAlert("Ya esta registrado ese programa");
         			    	 	 					return;
         			    	 	 				}

         			    	 	 			}
           			    					}
        			    				
        			    					if(registry.byId("prSelect").get('value')==0)
         			    					{
         			    						utils.cstmAlert('Favor de selecionar un programa Municipal');
         			    						return false;
         			    					}
        			    					
        			    					if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
         			    						if( registry.byId("nomOtroPrograma").get('value') == null || registry.byId("nomOtroPrograma").get('value') == ''){
         			    							utils.cstmAlert('Favor de registrar el Nombre del Programa Municipal Otro');
    	     			    						return false;
         			    						}
         			    					}
        			    					try{
        			    						if(edit){
        			    							var index = grid.selection.selectedIndex;
        			    							var item = grid.getItem(index);
        			    							//grid.store.setValue(item, 'idPrograma', registry.byId("prSelect").get('value'));
        			    							//grid.store.setValue(item, 'nomPrograma', registry.byId("prSelect").get('displayedValue'));
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
        			    						}
        			    						registry.byId('dDetail').destroyRecursive(false);
        			    					}catch(e){
        			    						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
        			    						console.log(e);
        			    					}	
        			    				}     			    				
        			    			},'prBtnAceptar');
        			    }
     			  if(option==4){
       			    new Button({
       			    				label : " Aceptar " ,
       			    				onClick : function() {
       			    					var form = registry.byId('dDetail');
       			    					if (!form.validate()){  
       			    						utils.cstmAlert('Favor de registrar los datos requeridos');
       			    						return false;
       			    					}
       			    					var tmpnomOtroPrograma = "";
     			    					tmpnomOtroPrograma = registry.byId("nomOtroPrograma").get('value');
       			    					var grid = registry.byId('4Grid');
       			    					if(edit){}
       			    					else	
       			    					{
       			    					for ( var i = 0; i < grid.rowCount; i++) {
     			    	 	        		
     			    	 	 				var item = grid.getItem(i);
     			    	 	 				
     			    	 	 				if( grid.store.getValue(item,'idPrograma') == registry.byId("prSelect").get('value')){
     			    	 	 					utils.cstmAlert("Ya esta registrado ese programa");
     			    	 	 					return;
     			    	 	 				}

     			    	 	 			}
       			    					}
       			    					
       			    					
       			    					if(registry.byId("prSelect").get('value')==0)
     			    					{
     			    						utils.cstmAlert('Favor de selecionar un programa OSC');
     			    						return false;
     			    					}
       			    					
       			    					
       			    					if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
     			    						if( registry.byId("nomOtroPrograma").get('value') == null || registry.byId("nomOtroPrograma").get('value') == ''){
     			    							utils.cstmAlert('Favor de registrar el Nombre del Programa OSC Otro');
	     			    						return false;
     			    						}
     			    					}
       			    					try{
       			    						if(edit){
       			    							var index = grid.selection.selectedIndex;
       			    							var item = grid.getItem(index);
       			    							//grid.store.setValue(item, 'idPrograma', registry.byId("prSelect").get('value'));
       			    							//grid.store.setValue(item, 'nomPrograma', registry.byId("prSelect").get('displayedValue'));
       			    							grid.store.setValue(item, 'objetivo', strObjetivo.get('value'));
       			    							grid.store.setValue(item, 'meta', strMeta.get('value'));
       			    							grid.store.setValue(item, 'monto', registry.byId("monto").get('value'));
       			    							grid.store.setValue(item, 'montoStr', registry.byId("montoStr").get('value'));
       			    							grid.store.setValue(item, 'nomOtroPrograma', tmpnomOtroPrograma);
       			    						} else {
       			    							 var myNewItem = {  cPrograma: ++maxIndexOsc, 
       			    									idPrograma: registry.byId("prSelect").get('value'),
       			    									nomPrograma:  registry.byId("prSelect").get('displayedValue'),
       			    									objetivo: strObjetivo.get('value'), 
       			    									meta:  strMeta.get('value'),
       			    									monto:  registry.byId("monto").get('value'),
       			    									montoStr:  registry.byId("montoStr").get('value'),
       			    									nomOtroPrograma: tmpnomOtroPrograma
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
        	    }
        	    function funMunicipal ( itemToEdit ){
        	    	funEstatal(itemToEdit, 3);
        	    }
        	    function funOSC ( ){
        	    	alert("funOSC");
        	    }
        	    function funAccion (itemToEdit ){

        	    	var edit=false;
     			    if(!itemToEdit){
     				   itemToEdit={idAccion: 0,strPlaneacion:'',strRecomendacion:'',idRuta: 0,nomOtraRuta:'',nomRuta:''};
     			    }else{
     				   edit=true;
     			    }
     			   
     			    //----------------------------Diseño de la ventana
        	    	var title = 'Acciones';
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
							    			   '	<b>*Primera accion para coadyuvar con el cumplimiento de la ruta de mejora: </b><div id="strPlaneacion" /><br/>'+
							    			   '</td></tr>'+
							    			   '<tr><td>'+
							    			   '	<b>Segunda accion para coadyuvar con el cumplimiento de la ruta de mejora: </b><div id="strRecomendacion" /><br/>'+
							    			   '</td></tr>'+							    			   						    			   							    			   							    			   							    			   
							    			   '</table>';     			         			    
        			 
     			   
     			    //---------------------------------- Dojo     			   
     			    
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
     			           style:"display:block; width:280px"
     		        }, 'nomOtraRuta');
     				   
     			    
     			   var strPlaneacion= new ValidationTextBox({    		           
    		           value:itemToEdit.strPlaneacion, 
    		           trim:"true",    
    		           maxLength:"250",
    		           required:true,
    		           uppercase: true,
    		           style:"display:block; width:280px"
    		        }, 'strPlaneacion');
     			   
	     			var strRecomendacion= new ValidationTextBox({	   		           
	   		           value:itemToEdit.strRecomendacion, 
	   		           trim:"true",    
	   		           maxLength:"250",
	   		          // required:true,
	   		           uppercase: true,
	   		           style:"display:block; width:280px"
	   		        }, 'strRecomendacion');	     			       			    
     			    
	     			
	     		   if(edit==true){	
	     	        	if(itemToEdit.idRuta>=10){
	     	        		dom.byId('otro3Visible').style.display='block';
	     	        		
	     	        		
	     	   		} else {			
	     	        		dom.byId('otro3Visible').style.display='none';
	     	        		
	     			    
	     	        		}
	     	        	} else {
	     	        	dom.byId('otro3Visible').style.display='none';
	     	        	dom.byId('prSelectR').style.display='block';
	     				
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
     			    					var grid = registry.byId('5Grid');
     			    					if(edit){
     			    					}
     			    					else{
     			    					for ( var i = 0; i < grid.rowCount; i++) {
     			    	 	        		
     			    	 	 				var item = grid.getItem(i);
     			    	 	 				
     			    	 	 				if( grid.store.getValue(item,'idRuta') == registry.byId("prSelectR").get('value')){
     			    	 	 					utils.cstmAlert("Ya esta registrada esa ruta");
     			    	 	 					return;
     			    	 	 				}

     			    	 	 			} 		
     			    					}
     			    					if(registry.byId("prSelectR").get('value')==0)
     			    					{
     			    						utils.cstmAlert('Favor de selecionar una ruta');
     			    						return false;
     			    					}
     			    					
     			    					if( registry.byId("prSelectR").get('displayedValue') == "Otro" ){
     			    						if(registry.byId("nomOtraRuta").get('value') == null || registry.byId("nomOtraRuta").get('value') == ''){
     			    							utils.cstmAlert('Favor de registrar el nombre de la otra ruta');
     			    							return false;	
     			    						}
     			    					}
     			    					try{
     			    						if(edit){
     			    							var index = grid.selection.selectedIndex;
     			    							var item = grid.getItem(index);
     			    							grid.store.setValue(item, 'accion', strPlaneacion.get('value'));
     			    							grid.store.setValue(item, 'recomendacion', strRecomendacion.get('value'));
     			    							grid.store.setValue(item, 'nomOtraRuta',registry.byId("nomOtraRuta").get('value'));
     			    							grid.store.setValue(item, 'idRuta',registry.byId("prSelectR").get('value'));
     			    							
     			    							} else {
     			    							 var myNewItem = {  idAccion: ++maxIndexAcciones, 
     			    									accion: strPlaneacion.get('value'), 
     			    									recomendacion:  strRecomendacion.get('value'),
     			    									nomOtraRuta:  registry.byId("nomOtraRuta").get('value'),
     			    									idRuta:  registry.byId("prSelectR").get('value'),
     			    									nomRuta:registry.byId("prSelectR").get('displayedValue')
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
        	    function funTemas ( itemToEdit, option ){
        	    	var edit=false;
     			    if(itemToEdit.length==0){
     				   itemToEdit={idSecuencia:0, idTema: 0, tema:''};
     			    }else{
     				   edit=true;
     			    }
     			   
     			    //----------------------------Diseño de la ventana
        	    	var title = 'Temas prioritarios';
        	    	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
        	    	registry.byId('dDetail').on('hide',function(){
     				   												registry.byId('dDetail').destroyRecursive(false);
 			   													});
        	    	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
     			    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
     			    jsUtils.createTag('div','prCnt','dcDetail');
     			    
     			    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
							    			   '<tr><td>'+
							    			   '	<b>*Temas prioritarios: </b><div id="prSelect" /><br/>'+
							    			   '</td></tr>'+
							    			   '<tr id="otro3Visible" style="display:none"><td>'+
							    			   '	<b>*Otro Tema:</div> </b><div id="nomOtroTema"/><br/>'+
							    			   '</td></tr>'+
							    			   '</table>';     			         			   
        			          					        
     			    //---------------------------------- Datos
     			    var lstPr=xhr.get({
			            url: dojo.config.app.urlBase + 'catalogos/listProgramas/1',
			            sync: false,
			            preventCache:true,
			            contentType: "application/x-www-form-urlencoded; charset=utf-8",
			            handleAs: "json"
			        });        	    		 
				       
			        lstPr.then(function(cPrograma){
			        	listcPrograma.push(cPrograma);  				        	  						   			        	      						  
			        });
				        
     			    var data=[{name:"[Seleccione]",	id:"0"}];     			        			     
		        	
     			    for(var index in listTemasG){
     			    	data.push(listTemasG[index]);
     			    }
     			    if(edit==true){	
   			        	if(itemToEdit.idTema>=13){
   			        		dom.byId('otro3Visible').style.display='block';
   		        		} else {			
   			        		dom.byId('otro3Visible').style.display='none';
   					    
   			        		}
   			        	} else {
   			        	dom.byId('otro3Visible').style.display='none';
   	        			
   			        		}
        			   
    			    var pStore = new Memory({
    			        data: data
    			    });
    			        			    
     			    //---------------------------------- Dojo
    			    var nomOtroTema = new ValidationTextBox({
 	   		           promptMessage:"Nombre de Otro Tema",
 	   		           value:itemToEdit.nomOtroPrograma, 
 	   		           trim:"true",
 	   		           uppercase: true,
 	   		         //  required : true,
 	   		           maxLength:"250",
 	   		           style:"display:block; width:280px"
 	   		        }, 'nomOtroTema');
    			    
     			    new FilteringSelect({
    		           id: 'prSelect',
    		           value:itemToEdit.idTema,
    		           store: pStore,
    		           readOnly:edit,
    		           searchAttr: 'name'
    		        }, 'prSelect').on ('change', function(){     		    	   	    		    	  		    		  	    		   
	    		    	  var gridTema = registry.byId('6Grid');
	    		        	
	    		        	for ( var i = 0; i < gridTema.rowCount; i++) {
	    		        		
				 				var item = gridTema.getItem(i);
				 				
				 				if( gridTema.store.getValue(item,'idTema') == registry.byId("prSelect").get('value')){
				 					utils.cstmAlert("Ya existe registrado el Tema");
				 					return;
				 				}

				 			}

	    		        	if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
		 			    		
			        			dom.byId('otro3Visible').style.display='block';
			        			registry.byId('nomOtroPrograma').set ('required',true);
			        			    		        			
			        		} else {    
			        			dom.byId('otro3Visible').style.display='none';
	    		        			registry.byId('nomOtroPrograma').set ('required',false);
						        
			        				}

    		        });     			    
	     			       			    
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
     			    					if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
     			    						if(registry.byId("nomOtroTema").get('value') == null || registry.byId("nomOtroTema").get('value') == ''){
     			    							utils.cstmAlert('Favor de registrar los datos requeridos');
         			    						return false;	
     			    						}
     			    							
     			    					}
     			    					var grid = registry.byId('6Grid');
//     			    					var tmpnomOtroTema = "";
//     			    					tmpnomOtroTema = registry.byId("nomOtroTema").get('value');
     			    					try{
     			    						if(edit){
     			    							var index = grid.selection.selectedIndex;
     			    							var item = grid.getItem(index);
     			    							grid.store.setValue(item, 'idTema', registry.byId("prSelect").get('value'));
       			    							grid.store.setValue(item, 'tema', registry.byId("prSelect").get('displayedValue'));
       			    							grid.store.setValue(item, 'nomOtroTema', registry.byId("nomOtroTema").get('value'));
       			    							
     			    							} else {
     			    							 var myNewItem = {  idSecuencia:  ++maxIndexTemas, 
     			    									 			idTema: 	registry.byId("prSelect").get('value'),
     			    									 			tema:  	registry.byId("prSelect").get('displayedValue'),
     			    									 			nomOtroTema:  	registry.byId("nomOtroTema").get('value')
     			    									 			
       			    									};	    			
     			    							
     		    						         grid.store.newItem(myNewItem);
     		    						         
     		    						         txtAlerta = myNewItem.tema==''?myNewItem.nomOtroTema:myNewItem.tema;
     		    						        utils.cstmAlert('No olvide registrar un comit\u00E9 para el tema prioritario: '+txtAlerta);
     			    						}     			    						
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
	    			   '	<b>*Otro Comite:</div> </b><div id="nomOtroComite"/><br/>'+
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
	    			   '	<b>*Presentaron programa de actividades los comit\u00E9s integrados: </b><div id="acuerdoComite" /><br/>'+
	    			   '</td></tr>'+
	    			   '</table>';
     			    
     			    //---------------------------------- Datos     			    
				        
     			    var data=[{name:"[Seleccione]",	id:"0"}];
   			    
     			   for(var index in listTemasG){
    			    	data.push(listTemasG[index]);
    			    }
     			     if(edit==true){	
 			        	if(itemToEdit.idComite>=13){
 			        		dom.byId('otro3Visible').style.display='block';
 		        		} else {			
 			        		dom.byId('otro3Visible').style.display='none';
 					    
 			        		}
 			        	} else {
 			        	dom.byId('otro3Visible').style.display='none';
 	        			
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
 	   		           uppercase: true,
 	   		           //required : true,
 	   		           maxLength:"250",
 	   		           style:"display:block; width:280px"
 	   		        }, 'nomOtroComite');
    			    
     			    new FilteringSelect({
    		           id: 'idSelect',
    		           value:itemToEdit.idComite,
    		           store: pStore,
    		           readOnly:edit,
    		           searchAttr: 'name'
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
     			    				label : " Aceptar " ,
     			    				onClick : function() {

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
       			    					
       			    					if(registry.byId("idSelect").get('value')==0)
     			    					{
     			    						utils.cstmAlert('Favor de selecionar un comite');
     			    						return false;
     			    					}
       			    					var grid = registry.byId('7Grid');
       			    					if(edit){}
       			    					else	
       			    					{
       			    					for ( var i = 0; i < grid.rowCount; i++) {
       			    	 	        		
       			    	 	 				var item = grid.getItem(i);
       			    	 	 				
       			    	 	 				if( grid.store.getValue(item,'idComite') == registry.byId("idSelect").get('value')){
       			    	 	 					utils.cstmAlert("Ya esta registrado ese comite");
       			    	 	 					return;
       			    	 	 					}

       			    	 	 					}
       			    					}

       			    					try{
       			    						if(edit){
       			    							var index = grid.selection.selectedIndex;
       			    							var item = grid.getItem(index);
       			    							//grid.store.setValue(item, 'idComite', registry.byId("idSelect").get('value'));
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
        	    function funActividad ( itemToEdit ){
        	    	var edit=false;
     			    if(!itemToEdit){
     				   itemToEdit={cPrograma: 0,idCategoria:0,nomPrograma:'',monto:'', montoStr:'', nomActividad:[]};
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
     			    
     			    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "750px" >'+
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
							    			   '<tr id="otro4Visible">' +
							    			   '	<td><b>*Fuente: </b><div id="prFuente" /><br/></td>'+
							    			   '</tr>'+
							    			   '	<td><input id="GridDtA"/></td>'+
							    			   '</tr>'+
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
        			          			{ name: 'Fuente de recursos prevista', field: 'fuente', 
    			          					editable: true, 
    			          					width: '200px', 
    			          					type: dojox.grid.cells.ComboBox,
    			          	                options: ["Donaciones a la escuela de personas f\u00edsicas o morales","Recursos recabados por rifas o eventos organizados por la escuela","Asociaci\u00f3n de Padres de Familia","Aportaciones extraordinarias de los padres de familia","Otro"] 
    			          			    }
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
			        			//registry.byId('strObjetivo').set ('required',true);
			        			//registry.byId('strMeta').set ('required',true);
			        			registry.byId('GridDtA').set("style","display:none");
				        	} else {			
				        		dom.byId('otro1Visible').style.display='none';
			        			dom.byId('otro2Visible').style.display='none';
			        			dom.byId('otro3Visible').style.display='none';
			        			dom.byId('otro4Visible').style.display='none';
						        if(listDetalleG[objActividad].idProg == itemToEdit.idCategoria ){
			        			var tmpMeta = "";
			        			var tmpSeleccion = false;
			        			
			        			if(itemToEdit.nomActividad==null){
			        				for(var idI in categoriasRegistrados){
			        					if(categoriasRegistrados[idI].ceActividad = itemToEdit.idCategoria){
											if(categoriasRegistrados[idI].idobj == listDetalleG[objActividad].id){
											tmpSeleccion = true;
											tmpMeta=categoriasRegistrados[idI].meta;	
											}			        						
			        					}
			        				}
			        			}else{
								for(var idObjActividad in itemToEdit.nomActividad){
																		
									if(itemToEdit.nomActividad[idObjActividad].idObjetivo == listDetalleG[objActividad].id){
										tmpSeleccion = true;
										tmpMeta=itemToEdit.nomActividad[idObjActividad].meta;
										}
									
									}
						        }
								
			        			var arregloObjetivos1 = {
	    					        	                  	id:+n,
	    					        	                  	idActividad: listDetalleG[objActividad].id,
						    					        	idSeleccion : tmpSeleccion	,
						    					        	actividad : listDetalleG[objActividad].name,
						    					        	meta:tmpMeta
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
		     		
 
		
    			    var pStore = new Memory({
    			        data: data
    			    });
    			    var pFStore = new Memory({
    			        data: dataF
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

		        	    var gridAct = registry.byId('8Grid');
    		        	for ( var i = 0; i < gridAct.rowCount; i++) {

			 				var item = gridAct.getItem(i);
			 				
			 				if( gridAct.store.getValue(item,'idCategoria') == registry.byId("prSelect").get('value')){
			 					utils.cstmAlert("Ya existe registrada la Categoria");
			 					return;
			 				}

			 			}
    		        	if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
	 			    		
		        			
		        			dom.byId('otro1Visible').style.display='block';
		        			dom.byId('otro2Visible').style.display='block';
		        			dom.byId('otro3Visible').style.display='block';
		        			dom.byId('otro4Visible').style.display='block';
		        			registry.byId('strActividad').set ('required',true);
		        			registry.byId('strMeta').set ('required',true);
		        			registry.byId('nomOtroCategoria').set ('required',true);
		        			registry.byId('GridDtA').set("style","display:none");
		        			    		        			
		        		} else {    
		        			if(dom.byId('GridDtA').style.display=='none'){
		        				dom.byId('otro1Visible').style.display='none';
    		        			dom.byId('otro2Visible').style.display='none';
    		        			dom.byId('otro3Visible').style.display='none';
    		        			dom.byId('otro4Visible').style.display='none';
    		        			registry.byId('strActividad').set ('required',false);
    		        			registry.byId('strMeta').set ('required',false);
    		        			registry.byId('nomOtroCategoria').set ('required',false);
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
       			    					itemsVacios = 0;
       			    					
     			    					if( registry.byId("prSelect").get('displayedValue') == "Otro" ){
     			    						
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
     			    						itemsVacios = 1;
     			    						tmpActividad = registry.byId("strActividad").get('value');
     			    						tmpMeta = registry.byId("strMeta").get('value');
     			    						tmpnomOtroCategoria = registry.byId("nomOtroCategoria").get('value');
     			    						tmpFuente = registry.byId("prFuente").get('value');
     			    						
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
       			    							var actividades = {
       			    												idObjetivo : actividadesGrid.store.getValue(item,'idActividad'),       	       			    							
			       	       			    							meta : 		 actividadesGrid.store.getValue(item,'meta'),
			       	       			    							fuente :     idFuente
			       	       			    						  };       	       			    									
   	       			    						actividadSel.push(actividades);	
       			    						}
       			    						
       			    					}
     			    					
       			    					var grid = registry.byId('8Grid');
       			    					try{
       			    						if(edit){
       			    							var index = grid.selection.selectedIndex;
       			    							var item = grid.getItem(index);       			    							       			    							
       			    							grid.store.setValue(item, 'nomActividad',  actividadSel);
       			    							grid.store.setValue(item, 'objetivo', tmpActividad);
     			    							grid.store.setValue(item, 'meta', tmpMeta);
     			    							grid.store.setValue(item, 'nomOtraCategoria', tmpnomOtroCategoria);
     			    							grid.store.setValue(item, 'fuente', tmpFuente);
       			    						} else {
       			    							 var myNewItem = {  cPrograma: ++maxIndexActividades, 
       			    									 			idCategoria: registry.byId("prSelect").get('value'),
       			    									 			nomCategoria:  registry.byId("prSelect").get('displayedValue'),
       			    									 			nomActividad:  actividadSel,
       			    									 			objetivo: tmpActividad,
       			    									 			meta: tmpMeta,
       			    									 		    nomOtraCategoria: tmpnomOtroCategoria,
       			    									 		    fuente: tmpFuente
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
        	    function funAsunto (itemToEdit ){
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
 		       	
        	    
      	   function funNormalidad (itemToEdit ){

       	    	var edit=false;
    			    if(!itemToEdit){
    				   itemToEdit={idNormalidad:0 ,cNormalidad: 0,accion1:'',acion2:'',descripcion:''};
    			    }else{
    				   edit=true;
    			    }
    			   
    			    //----------------------------Diseño de la ventana
       	    	var title = 'Normalidad M\u00EDnima';
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
							    			   '	<b>Segunda acci\u00F3n: </b><div id="accion2" /><br/>'+
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
     			    
     			   var dataN=[{name:"[Seleccione]",	id:0} ];
   	            
     			  for(var index in listNormalidad){
     			    	dataN.push(listNormalidad[index]);
     			    }
     		        		    	   
     			    var pStoreN = new Memory({
     			        data: dataN
     			    });
    			    
    			    
    			   var prSelectN = new FilteringSelect({
    		           id: 'prSelectN',
    		           value:itemToEdit.cNormalidad,
    		           store: pStoreN,
    		           width:100,
    		           readOnly:edit,
    		           searchAttr: 'name'
    		        }, 'prSelectN');
    			       
    			    
    			   var accion1= new ValidationTextBox({    		           
   		           value:itemToEdit.accion1, 
   		           trim:"true",    
   		           maxLength:"250",
   		           required:true,
   		           uppercase: true,
   		           style:"display:block; width:280px"
   		        }, 'accion1');
    			   
	     			var accion2= new ValidationTextBox({	   		           
	   		           value:itemToEdit.accion2, 
	   		           trim:"true",    
	   		           maxLength:"250",
	   		           //required:true,
	   		           uppercase: true,
	   		           style:"display:block; width:280px"
	   		        }, 'accion2');	     			       			    
    			    
	     			
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
    			    					    			    					
    			    					if(registry.byId("prSelectN").get('value')==0)
    			    					{
    			    						utils.cstmAlert('Favor de selecionar una normalidad');
    			    						return false;
    			    					}
    			    					
    			    					var grid = registry.byId('nGrid');
    			    					if(!edit){
    			    					for ( var i = 0; i < grid.rowCount; i++) {
    			    	 	        		
    			    	 	 				var item = grid.getItem(i);
    			    	 	 				
    			    	 	 				if( grid.store.getValue(item,'cNormalidad') == registry.byId("prSelectN").get('value')){
    			    	 	 					utils.cstmAlert("Ya esta registrada esa normalidad");
    			    	 	 					return;
    			    	 	 				}

    			    	 	 			} 		
    			    					}

    			    					try{
    			    						if(edit){
    			    							var index = grid.selection.selectedIndex;
    			    							var item = grid.getItem(index);
    			    							
    			    							grid.store.setValue(item, 'accion1', registry.byId("accion1").get('value'));
    			    							grid.store.setValue(item, 'accion2', registry.byId("accion2").get('value'));
    			    							
    			    							
    			    							} else {
    			    							 var myNewItem = { idNormalidad: ++maxIndexNormalidad,
    			    									 cNormalidad:  registry.byId("prSelectN").get('value'),
    			    									 descripcion:  registry.byId("prSelectN").get('displayedValue'),
    			    									 accion1:      registry.byId("accion1").get('value'), 
    			    									 accion2:      registry.byId("accion2").get('value'),
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

        	    
		 		// Se manda a actualizar la informacion capturada de la primera
		 		// sesi\u00F3n
		 		function savePrimeraSesion(cct) {
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
		 			 		jsUtils.cstmAlert('La fecha de Publicacion no debe ser posterior a la Fecha de la Sesi\u00f3n');
			 				return false;
			 			 	}
		 			
		 			 	var integrantes=registry.byId('numIntegrantes').get('value');
		 			 	if(integrantes<3 ||integrantes>25){
		 			 		utils.cstmAlert("El n&#250;mero de asistentes no puede ser menor a 3 o mayor a 25");
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

		 			// Actividades
		 			var actividades = new Array();
		 			var actividadesArray = registry.byId('nomActividad').get(
		 					'value');

		 			// Carga los objetos tipo CeActSesion
		 			for ( var i in actividadesArray) {
		 				actividades.push({
		 					cActividad : actividadesArray[i]
		 				});
		 			}		 					 			
		 			
		 			//----------------------------------------------------------------- Lee informacion de Programas federales
		 			var rowsFederales = new Array();
		 			var rowsEstatales = new Array();
		 			var rowsMunicipales = new Array();
		 			var rowsOSC = new Array();
		 			
		 			if(array.indexOf(actividadesArray,21)!=-1){
		 						 						 			
			 			var gridFed = registry.byId('1Grid');
			 			
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
			 				
			 				rowsFederales.push(federal);		 									 				
			 			}
			 			//----------------------------------------------------------------- Fin Federales
	
			 			//----------------------------------------------------------------- Lee informacion de Programas Estatales		
			 			
			 			var gridEstatal = registry.byId('2Grid');
			 			
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
			 							
			 				rowsEstatales.push(estatal);
			 			}
			 			//----------------------------------------------------------------- Fin Estatales		
			 			//----------------------------------------------------------------- Lee informacion de Programas Municipales		
			 			
			 			var gridMunicipal = registry.byId('3Grid');
			 			
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
			 							
			 				rowsMunicipales.push(Municipal);
			 			}
			 			//----------------------------------------------------------------- Fin Municipales	
			 			//----------------------------------------------------------------- Lee informacion de Programas OSC		
			 			
			 			var gridOSC = registry.byId('4Grid');
			 			
			 			for ( var i = 0; i < gridOSC.rowCount; i++) {
	
			 				var item = gridOSC.getItem(i);														
			 						
			 				var detalle1 = [{		 					
			 					idObjetivo: gridOSC.store.getValue(item,'idObjetivo'),
			 					objetivo: gridOSC.store.getValue(item,'objetivo'),
			 					meta: gridOSC.store.getValue(item,'meta'),
			 				}];
			 				
			 				var OSC = {		 						
	                    			idPrograma: gridOSC.store.getValue(item,'idPrograma'), 
	                    			nomPrograma: gridOSC.store.getValue(item,'nomPrograma'),
	                    			nomOtroPrograma:gridOSC.store.getValue(item,'nomOtroPrograma'),
	                    			objetivos: detalle1,
	                    			monto: gridOSC.store.getValue(item,'monto'),
	                    			montoStr: gridOSC.store.getValue(item,'montoStr')                    					 								
			 				};
			 							
			 				rowsOSC.push(OSC);
			 			}
		 			//----------------------------------------------------------------- Fin OSC	
		 			}
		 			//----------------------------------------------------------------- Lee informacion de Acciones
		 			var rowsAcciones = new Array();
		 			if(array.indexOf(actividadesArray,22)!=-1){
			 			
			 			var gridAccion = registry.byId('5Grid');
			 			if(gridAccion.rowCount < 2 ){
			 				utils.cstmAlert("Es obligatorio registrar al menos dos l\u00EDneas para coadyuvar");
			 				return false;
			 			}
			 				
			 			for ( var i = 0; i < gridAccion.rowCount; i++) {
	
			 				var item = gridAccion.getItem(i);														
			 							
			 				var accion = { 
			 						idAccion: gridAccion.store.getValue(item,'cPrograma'),
			 						accion: gridAccion.store.getValue(item,'accion'),
			 						recomendacion: gridAccion.store.getValue(item,'recomendacion'),
			 						idRuta: gridAccion.store.getValue(item,'idRuta'),
			 						nomOtraRuta: gridAccion.store.getValue(item,'nomOtraRuta')
			 				};
			 							
			 				rowsAcciones.push(accion);
			 			}
		 			}
		 			//----------------------------------------------------------------- Fin Acciones
		 			//----------------------- Normalidad minima
		 			if(array.indexOf(actividadesArray,23)!=-1){
		 				var gridNormalidad = registry.byId('nGrid');
		 				var rowsNormalidad = new Array();
			 			
		 				if(gridNormalidad.rowCount < 1 ){
			 				utils.cstmAlert("Es obligatorio registrar al menos una Normalidad M\u00EDnima");
			 				return false;
			 			}
		 				
		 				for ( var i = 0; i < gridNormalidad.rowCount; i++) {
			 				
			 				var itemNor = gridNormalidad.getItem(i);
			 				
			 				var rNormalidad = {		
			 						cNormalidad: gridNormalidad.store.getValue(itemNor,'cNormalidad'),									 		
			 						accion1: gridNormalidad.store.getValue(itemNor,'accion1'),
			 						accion2: gridNormalidad.store.getValue(itemNor,'accion2')
				 						};
		 							
			 				rowsNormalidad.push(rNormalidad);
			 				
			 			}

		 			}
		 			//----------------------------------------------------------------- Lee informacion de Temas
		 			var rowsTemas = new Array();
//		 			if(array.indexOf(actividadesArray,24)!=-1){
//			 			
//			 			var gridTema = registry.byId('6Grid');
//			 			
//			 			if(gridTema.rowCount < 3 ){
//			 				utils.cstmAlert("Es obligatorio registrar al menos 3 temas prioritarios");
//			 				return false;
//			 			}
//			 			
//			 			for ( var i = 0; i < gridTema.rowCount; i++) {
//	
//			 				var item = gridTema.getItem(i);														
//			 							
//			 				var tema = {		
//			 						    idSecuencia: i+1,
//								 		idTema: 	gridTema.store.getValue(item,'idTema'),
//								 		tema:  	gridTema.store.getValue(item,'tema'),
//								 		nomOtroTema:	gridTema.store.getValue(item,'nomOtroTema') 
//			 				};
//			 							
//			 				rowsTemas.push(tema);
//			 			}
//		 			}
		 			
		 			//----------------------------------------------------------------- Fin Temas	
		 			//------------ Validación Temas vs comites.
//		 			if(rowsTemas.length>0){
//		 				totalTemas=0;
//		 				for(var j=0; j<rowsTemas.length;j++){
//		 					var gridComite = registry.byId('7Grid');		 					
//				 			for ( var i = 0; i < gridComite.rowCount; i++) {	
//				 				var item = gridComite.getItem(i);
//				 				if(gridComite.store.getValue(item,'idComite')==rowsTemas[j].idTema){
//				 					totalTemas++;
//				 					break;
//				 				}
//				 			}	
//		 				}
//		 				if(totalTemas < rowsTemas.length ){
//			 				utils.cstmAlert("Es obligatorio registrar comit\u00e9s de los temas prioritarios");
//			 				return false;
//			 			}
//		 			}
		 			// ----------- Fin validacion Temas vs Comites.
		 			//----------------------------------------------------------------- Lee informacion de Comites		
		 			var rowsComites = new Array();
		 			var comiteContraloria=0;
		 			
		 			if(array.indexOf(actividadesArray,25)!=-1){
			 			
			 			var gridComite = registry.byId('7Grid');

			 			clave1 = clave.substring(2,5);
						if(clave1=='DAI' || clave1=='DCC' || clave1=='DCI' || clave1=='DPB' || clave1=='ECC' || clave1=='EPB'|| clave1=='ESC' || clave1=='PCC' || clave1=='PPB' || clave1=='PTB' || clave1=='DSC' || clave1=='NJN' || clave1=='XTV' || clave1=='EDI'|| clave1=='ODI' || clave1=='EML' || clave1=='DZS' || clave1=='DCO' || clave1=='DLA' || clave1=='DML' || clave1=='ECO' || clave1=='EDM' || clave1=='EIV' || clave1=='ELA' || clave1=='ELS' || clave1=='EML' || clave1=='FAS' || clave1=='FLS' || clave1=='FUA' || clave1=='FUX'|| clave1=='PDM' || clave1=='PIM' || clave1=='PIV' || clave1=='PLA' || clave1=='PML' || clave1=='DZC' || clave1=='DNM')
							{
								if(gridComite.rowCount < 1 )
								{
				 				utils.cstmAlert("Es obligatorio registrar al menos un comite");
				 				return false;
				 				}	
							}
						else{
								if(gridComite.rowCount < 3 )
								{
				 				utils.cstmAlert("Es obligatorio registrar al menos tres comite");
				 				return false;
								}
							}
			 			
			 			
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
			 						nomOtroComite: gridComite.store.getValue(item,'nomOtroComite')
			 				};
			 					if(comite.idComite==11){
			 						comiteContraloria++;
			 					}		
			 				rowsComites.push(comite);
			 			}
			 			
			 			if(array.indexOf(actividadesArray,21)!=-1){
				 			
				 			var gf = registry.byId('1Grid');
				 			if(gf.rowCount>=1 && comiteContraloria==0){
				 				utils.cstmAlert("Es obligatorio registrar el comite de contralor\u00EDa social");
				 				return false;
				 			}
			 			}
		 			}
		 			//----------------------------------------------------------------- Fin Comites	
		 			//----------------------------------------------------------------- Lee informacion de Actividades		
		 			var rowsActividades = new Array();
		 			if(array.indexOf(actividadesArray,27)!=-1){
			 			
			 			var gridActividad = registry.byId('8Grid');
			 			
			 			for ( var i = 0; i < gridActividad.rowCount; i++) {
	
			 				var item = gridActividad.getItem(i);														
			 				
			 					detalle = [];
			 				
			 				if( gridActividad.store.getValue(item,'idCategoria') >=11  ){
			 					detalle = [{		 					
				 					idObjetivo: gridActividad.store.getValue(item,'idObjetivo'),
				 					objetivo: gridActividad.store.getValue(item,'objetivo'),
				 					meta: gridActividad.store.getValue(item,'meta'),
				 					fuente:gridActividad.store.getValue(item,'fuente')
				 					
				 				}];
			 				} else {
			 					detalle = item.nomActividad;
			 				}
			 				
			 				var actividad = {
			 						ceActividad: gridActividad.store.getValue(item,'idCategoria'),
			 						actividad: gridActividad.store.getValue(item,'nomCategoria'),
			 						actividades: detalle  ,
			 						//objetivo: gridActividad.store.getValue(item,'strActividad'),
			 						nomOtraCategoria:gridActividad.store.getValue(item,'nomOtraCategoria')
			 				};
			 							
			 				rowsActividades.push(actividad);
			 			}
		 			}
		 			//----------------------------------------------------------------- Fin Actividades	
		 			//----------------------------------------------------------------- Lee informacion de Asuntos		
		 			var rowsAsuntos = new Array();
		 			if(array.indexOf(actividadesArray,26)!=-1){
			 			
			 			var gridAsunto = registry.byId('9Grid');
			 			
			 			if(gridAsunto.rowCount==0)
			 			{
			 				utils.cstmAlert("Es obligatorio registrar al menos un asunto y un acuerdo");
		 				return false;
		 			    }
			 			for ( var i = 0; i < gridAsunto.rowCount; i++) {
	
			 				var item = gridAsunto.getItem(i);														
			 							
			 				var asunto = {
			 						cscAsunto: gridAsunto.store.getValue(item,'cPrograma'),     	                    			
			 						asunto: gridAsunto.store.getValue(item,'asunto'),
			 						acuerdo: gridAsunto.store.getValue(item,'acuerdo')                   					 								
			 				};
			 							
			 				rowsAsuntos.push(asunto);
			 			}
		 			}
		 			//----------------------------------------------------------------- Fin Asuntos
		 			
		 			var preguntas = {
							respuesta1 : registry.byId('pregunta1a').checked ? 1:2,
							respuesta2 : registry.byId('pregunta2a').checked ? 1:2,
						    respuesta3 : registry.byId('pregunta3a').checked ? 1:2,
						    respuesta4 : registry.byId('p1a').checked ? 1:2,
							
					};
		 			
		 		// Se integra la primera sesiu00f3n.
		 			var primeraSesion = {
		 				ceInfGral : ceInfGral,
		 				ceSesion : ceSesion,
		 				actividades : actividades,
		 				federales : rowsFederales,
		 				estatales : rowsEstatales,
		 				municipales : rowsMunicipales,
		 				oscs : rowsOSC,
		 				acciones : rowsAcciones,
		 				temas : rowsTemas,
		 				comites : rowsComites,
		 				categorias : rowsActividades,
		 				normalidad: rowsNormalidad,
		 				asuntos : rowsAsuntos,
		 				preguntas2:preguntas
		 			};
		 					 					 			
		 			console.log(json.toJson(primeraSesion));
		 			var urlJson = dojo.config.app.urlBase
		 					+ 'primeraSesion/savePrimeraSesionC1415';		 			                         
		 			xhr.post({
		 						url : urlJson,
		 						postData : json.toJson(primeraSesion),
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
		 				listAcuerdosComite.push({name:"S\u00ED",id:1});
		 				listAcuerdosComite.push({name:"No",id:2});
		 			}
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
		 				listTemasG.push({name:"De contralor\u00EDa Social",id:11});
		 				listTemasG.push({name:"De nuevas tecnolog\u00EDas.",id:12});
		 				listTemasG.push({name:"Otro",id:14});
		 				listTemasG.push({name:"Otro",id:15});

		 			}
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
//		 				listDetalleG.push({name:"Otro",id:23, idProg:11});
//		 				listDetalleG.push({name:"Otro",id:24, idProg:12});
//		 				listDetalleG.push({name:"Otro",id:25, idProg:13});
		 				
		 				listFuenteActividad = new Array();
		 				listFuenteActividad.push({name:"Donaciones a la escuela de personas f\u00edsicas o morales.",id:1});
		 				listFuenteActividad.push({name:"Recursos recabados por rifas o eventos organizados por la escuela.",id:2});
		 				listFuenteActividad.push({name:"Asociaci\u00F3n de Padres de Familia.",id:3});
		 				listFuenteActividad.push({name:"Aportaciones extraordinarias de los padres de familia.",id:4});
		 				listFuenteActividad.push({name:"Otros",id:5});
		 						 				
		 			}
		 		}

		 				 		
		 	   return {
			 		   init:init,
			 		   savePrimeraSesion:savePrimeraSesion
		 		   };

 	});
