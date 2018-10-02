define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/form/CheckedMultiSelect","app/util/jsUtils","dojo/_base/xhr","dojo/_base/json",
         "dijit/form/ValidationTextBox","dojo/on","dijit/form/RadioButton","dijit/form/Textarea",
         "dojo/dom", "dojox/grid/cells/dijit", "dojo/data/ItemFileWriteStore", "dijit/form/FilteringSelect",
         "dijit/form/CheckBox", "dojox/grid/EnhancedGrid", "dijit/form/Button", "app/util/constants",  "dijit/form/Form",
         "dojo/_base/xhr", "dojo/DeferredList", "dojox/widget/Standby","dojo/data/ItemFileWriteStore",
         "dojox/form/MultiComboBox","dojox/grid/DataGrid","app/reuniones/reuniones","dojo/_base/lang","dijit/Dialog",
         "dojo/store/Memory", "dojo/data/ObjectStore"],
function( ContentPane,registry,array,utils,CheckedMultiSelect,jsUtils,xhr,json,ValidationTextBox,
		on,RadioButton,Textarea,dom, gridCellsDijit, ItemFileWriteStore, FilteringSelect,
		CheckBox, EnhancedGrid, Button, constants, Form, xhr, DeferredList, Standby, ItemFileWriteStore,
		MultiComboBox,DataGrid,reuniones,lang,Dialog,Memory,ObjectStore){
	
	var primeraSesionObj= new Object();
	var grid = {};
	
	//Maximo valor del indentificador de los integrantes de Comites
	var maxIndex = 0;
	
	var gActividades= new Array();
	var cE=0;
	var comitesSelData={};
	var iStore=new Object();
	
		
	function init(actividades,cCct,ReunionObj){
		primeraSesionObj=ReunionObj;
	   	gActividades=actividades;
	   		
		_programas(array.indexOf(actividades,21)!=-1);
		_recursos(array.indexOf(actividades,23)!=-1);
		_planeacion(array.indexOf(actividades,24)!=-1);
		_comites(array.indexOf(actividades,25)!=-1, cCct); 
   }
		   
   function _programas(crea){
	   
	   var listProgramas= new Array({title:"Programas Federales",tpoPrograma:1,id:"progFedPane"},
								   {title: "Programas Estatales",tpoPrograma:2,id:"progEstPane"},
								   {title:"Programas Locales",tpoPrograma:3,id:"progLocPane"},
								   {title:"Proyectos OSC",tpoPrograma:4,id:"proyOSCPane"});
	  
	   if(crea){
		   var cmSelects= new Array();
		   var tbxs= new Array();
		   if(!registry.byId(listProgramas[0].id)){
		   for(var i in listProgramas ){

				   
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:listProgramas[i].title,
			           id:listProgramas[i].id
			       })); 

				   jsUtils.createTag('div','CMSelect'+listProgramas[i].tpoPrograma,listProgramas[i].id);

				   
	               
				    var ckms=new CheckedMultiSelect({
                       multiple:true,
                       invalidMessage:"Debe seleccionar al menos uno de los "+listProgramas[i].title
                    },'CMSelect'+listProgramas[i].tpoPrograma);
				    
				    cmSelects.push(ckms);
				   
				    var xhrArgs={
				            url: dojo.config.app.urlBase + 'catalogos/listProgramas/'+listProgramas[i].tpoPrograma,
				            sync: false,
				            preventCache:true,
				            contentType: "application/x-www-form-urlencoded; charset=utf-8",
				            handleAs: "json",
				            load: function(cPrograma){
				            	var options = new Array();
			                    var oPrograma = '';
			                    for(var i in cPrograma ){
			                    	options.push({label: cPrograma[i].nomPrograma, value: cPrograma[i].cPrograma,selected:false}); 
			                    	if(cPrograma[i].nomPrograma=='Otro'){
			                    		oPrograma=cPrograma[i].cPrograma;
			                    	}
			                    }

			                    registry.byId('CMSelect'+cPrograma[0].tpoPrograma).addOption(options);
			                    
			                    for(var i in primeraSesionObj.programas){
			                    	registry.byId('CMSelect'+cPrograma[0].tpoPrograma).updateOption({value:primeraSesionObj.programas[i].cPrograma,selected:true});
			                    	if(primeraSesionObj.programas[i].nomOtroPrograma && primeraSesionObj.programas[i].cPrograma== oPrograma){
			                    		registry.byId('otroPrograma'+cPrograma[0].tpoPrograma).set('value',primeraSesionObj.programas[i].nomOtroPrograma);
			                    	}
			                    }
			                    
			                    _muestraOtro(registry.byId('otroPrograma'+cPrograma[0].tpoPrograma),registry.byId('CMSelect'+cPrograma[0].tpoPrograma));			      
				            },
				            error: function(error){
				                jsUtils.cstmAlert(json.toJson(error));
				            }
				        } ;

			        xhr.get(xhrArgs);
		              
	               utils.createTag('div','otroPrograma'+listProgramas[i].tpoPrograma, listProgramas[i].id);
	              
	               var tbx= new ValidationTextBox({
	            	  name:'otroPrograma'+listProgramas[i].tpoPrograma,
	                  id:'otroPrograma'+listProgramas[i].tpoPrograma,
	                  promptMessage:"Capture otro Programa", 
	                  trim:true, 
	                  style: "display:none;",                                  
	                  placeHolder:"Especifique",
	                  missingMessage: "Debe especificar el nombre de su programa",
	                  maxlength: 50
	               }, 'otroPrograma'+listProgramas[i].tpoPrograma);
	                  
	               tbxs.push(tbx);
	            	              
			   }
		  
			    cmSelects[1].on('click',function(){
	                     _muestraOtro(registry.byId('otroPrograma'+listProgramas[1].tpoPrograma),registry.byId('CMSelect'+listProgramas[1].tpoPrograma));
                });
			    cmSelects[2].on('click',function(){
		                  _muestraOtro(registry.byId('otroPrograma'+listProgramas[2].tpoPrograma),registry.byId('CMSelect'+listProgramas[2].tpoPrograma));
	            });
				cmSelects[3].on('click',function(){
					_muestraOtro(registry.byId('otroPrograma'+listProgramas[3].tpoPrograma),registry.byId('CMSelect'+listProgramas[3].tpoPrograma));
	            });
			}   
	   }else
		   for(var i in listProgramas ){
			   if(registry.byId(listProgramas[i].id))
				   registry.byId('pestanias').closeChild(registry.byId(listProgramas[i].id)); 
		   } 
	}
   
   function _recursos(crea){
	   var id="recursosPane";
	   if(crea){
		   if(!registry.byId(id)){
			   
			   var contenido= '<table border="0" align="lefth" >'+ 
			   '<tr><td>'+ 
			   '	<span align="lefth" class="sub">Informe de los Recursos de fuentes distintas a los programas, recabados por el Consejo Escolar </span>'+ 
			   '</td></tr>'+ 
			   '<tr><td> '+ 
			   '	 <p>1.Recursos recabados por donaciones de personas f\u00EDsicas o morales, a la escuela.( Otorgan o transfiere al centro escolar'+ 
			   '	  gratuitamente el dominio de una cosa, como  puede  ser dinero, materiales etc.)</p>'+ 
			   '	  *Monto: <br>*N\u00FAmero <input id="MontoDonacion"/>&nbsp;&nbsp;&nbsp; *Letra <input id="MontoStrDonacion"/>'+ 
			   '	  <br><br>*Materiales:<input id="EspecieoDonacion"/>'+ 
			   '</td></tr>'+ 
			   '<tr><td>'+ 
			   '	<p>2.Recursos recabados por actividades de rifas, ventas, etc.</p>'+ 
			   '	  *Monto: <br>*N\u00FAmero <input id="MontoRifa"/>&nbsp;&nbsp;&nbsp; *Letra <input id="MontoStrRifa"/>'+ 
			   '</td></tr> '+ 
			   '<tr><td>'+ 
			   '	<span align="lefth" class="sub">*\u00BFPromovi\u00F3 informe  de la asociaci\u00F3n de padres de familia o su equivalente, ante la'+ 
			   '	comunidad educativa sobre el monto y  uso que le dar\u00E1 a los recursos recabados? </span><br>'+ 
			   '	<form id="radioform"><br><input id="apfRadioSi"/><label for="apfRadioSi">Si</label>'+ 
			   '	<br/><input id="apfRadioNo"/><label for="apfRadioNo">No</label>'+ 
			   '	<br/><input id="apfRadioNoex"/><label for="apfRadioNoex">No existe asociaci\u00F3n de padres de familia o su equivalente en el centro escolar</label><br/> </form>'+ 
			   '</td></tr>'+ 
			   '</table>';
			   
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Recursos",
		           content: contenido,
		           id:id
		       })); 
			   var donacion= new Object();
			   var rifa= new Object();
			   var apf= new Object();
			   
			   for(var i in primeraSesionObj.recursos){
               	if(primeraSesionObj.recursos[i].cRecurso==0){
               		donacion=primeraSesionObj.recursos[i];
               	}
               	if(primeraSesionObj.recursos[i].cRecurso==1){
               		rifa=primeraSesionObj.recursos[i];
               	}
               	if(primeraSesionObj.recursos[i].cRecurso==3){
               		apf=primeraSesionObj.recursos[i];
               	}
               }  

			   new ValidationTextBox({
	            	  name:'MontoDonacion',
	                  id:'MontoDonacion',
	                  promptMessage:"Capture solo numeros",
	                  value:donacion.monto, 
	                  regExp: constants.NUMBER_VALID,
	                  trim:"true",
	                  maxLength:"9", 
	                  required:"true"
	               }, 'MontoDonacion');
			   new ValidationTextBox({
	            	  name:'MontoStrDonacion',
	                  id:'MontoStrDonacion',
	                  promptMessage:"Capture solo letras",
	                  value:donacion.montoStr, 
	                  regExp: constants.NoNUMBER_VALID,
	                  trim:"true",
	                  maxLength:"200",
	                  required:"true"
	               }, 'MontoStrDonacion');
			   new ValidationTextBox({
	            	  name:'EspecieoDonacion',
	                  id:'EspecieoDonacion',
	                  promptMessage:"Capture los recursos otorgados en especie",
	                  value:donacion.especie, 
	                  trim:"true",
	                  maxLength:"200",
	                  required:"true"
	               }, 'EspecieoDonacion');
			   new ValidationTextBox({
	            	  name:'MontoRifa',
	                  id:'MontoRifa',
	                  promptMessage:"Capture solo numeros",
	                  regExp: constants.NUMBER_VALID,
	                  value:rifa.monto, 
	                  trim:"true",  
	                  maxLength:"9",
	                  required:"true"
	               }, 'MontoRifa');
			   new ValidationTextBox({
	            	  name:'MontoStrRifa',
	                  id:'MontoStrRifa',
	                  promptMessage:"Capture solo letras",
	                  value:rifa.montoStr, 
	                  regExp:constants.NoNUMBER_VALID,
	                  trim:"true",    
	                  maxLength:"200",
	                  required:"true"
	               }, 'MontoStrRifa');
			   			   
			   var ckSi=new RadioButton({
		            checked: true,
		            value: 1,
		            name: "apfRadio"
		        }, "apfRadioSi");
			   
			   var ckNo=new RadioButton({
		            checked: false,
		            value: 0,
		            name: "apfRadio"
		        }, "apfRadioNo");
			   
			   var ckNoex=new RadioButton({
		            checked: false,
		            value: 2,
		            name: "apfRadio"
		        }, "apfRadioNoex");
			   
			   if(!jsUtils.isEmpty(apf)){
				   if (apf.indRecurso==1){ckSi.set('checked',true);}
				   if (apf.indRecurso==0||apf.indRecurso=='o'){ckNo.set('checked',true);}
				   if (apf.indRecurso==2){ckNoex.set('checked',true);}   
			   }
			   

		   }
		} else{
			if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			}
		} 
   }
   
   function _planeacion(crea){
	  var id="planeacionPane";
	  if(crea){
		   if(!registry.byId(id)){
			   
			   var contenido='<table border="0" align="lefth" >'+ 
			   '<tr><td> '+ 
			   '	 <p>1. \u00BFEl Consejo Escolar conoce la planeaci\u00F3n anual de su centro escolar para este ciclo  2013-2014?</p>'+ 
			   '	<form id="indPlaneacionform"><br><input id="indPlaneacionSi"/><label for="indPlaneacionSi">Si</label>'+ 
			   '	<br/><input id="indPlaneacionNo"/><label for="indPlaneacionSi">No</label></form>'+
			   '</td></tr>'+ 
			   '<tr><td>'+ 
			   '	<p>2. \u00BFEl Consejo Escolar  participa en alguna de las actividades de la planeaci\u00F3n de su centro escolar?</p>'+ 
			   '	<form id="indParticipacionform"><br><input id="indParticipacionSi"/><label for="indParticipacionSi">Si</label>'+ 
			   '	<br/><input id="indParticipacionNo"/><label for="indParticipacionNo">No</label></form>'+
			   '</td></tr> '+ 
			   '</table>';
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Planeaci\u00F3n Escolar",
		           content: contenido,
		           id:id
		       })); 
			   
			   new RadioButton({
		            checked: false,
		            value: 1,
		            name: "indPlaneacion"
		        }, "indPlaneacionSi").on( 'change', function(){
		        	if(registry.byId('indPlaneacionSi').checked){
		        		registry.byId('CMSelectPlaneacion').set("style","display:block");
		        		registry.byId('CMSelectPlaneacion').set("required",true);
		            }else{
		            	registry.byId('CMSelectPlaneacion').set("style","display:none");
		            	registry.byId('CMSelectPlaneacion').reset();
		            	registry.byId('otraPlaneacion').set("style","display:none");
		            	registry.byId('otraPlaneacion').reset();
		            	registry.byId('CMSelectPlaneacion').set("required",false);
		            } 
	               });
			   
			   new RadioButton({
		            checked: true,
		            value: 0,
		            name: "indPlaneacion"
		        }, "indPlaneacionNo");
			   
			   if(!jsUtils.isEmpty(primeraSesionObj.planeacion)){
				   if (primeraSesionObj.planeacion.indPlaneacion){registry.byId('indPlaneacionSi').set('checked',true);} 
			   }
			   
			   
			   jsUtils.createTag('div','CMSelectPlaneacion','indPlaneacionform');
			   
			   new CheckedMultiSelect({
	               style: "display:none;",
	               multiple:true
	            },'CMSelectPlaneacion');
			   
			   var xhrArgs={
			            url: dojo.config.app.urlBase + 'catalogos/listPlaneaciones',
			            sync: false,
			            preventCache:true,
			            contentType: "application/x-www-form-urlencoded; charset=utf-8",
			            handleAs: "json",
			            load: function(cPlaneaciones){
			            	var options = new Array();
		                    for(var i in cPlaneaciones ){
		                            options.push({label: cPlaneaciones[i].nomPlaneacion, value: cPlaneaciones[i].cPlaneacion,selected:false});	 
		                    }
		        	        //registry.byId('CMSelectPlaneacion').set('multiple',false);
		                    registry.byId('CMSelectPlaneacion').addOption(options);
		                    if(!jsUtils.isEmpty(primeraSesionObj.planeacion)){
		                    	registry.byId('CMSelectPlaneacion').updateOption({value:primeraSesionObj.planeacion.cPlaneacion,selected:true});
		                    	 _muestraOtro(registry.byId('otraPlaneacion'),registry.byId('CMSelectPlaneacion'));
		                    }
		                    
			                			      
			            },
			            error: function(error){
			                jsUtils.cstmAlert(json.toJson(error));
			            }
			        } ;

	        xhr.get(xhrArgs);

	        
	        utils.createTag('div','otraPlaneacion', 'indPlaneacionform');
	        
	        var otraPlaneacion = primeraSesionObj.planeacion?
	        		primeraSesionObj.planeacion.nomOtroPlaneacion:'';
	        
            new ValidationTextBox({
         	  name:'otraPlaneacion',
               id:'otraPlaneacion',
               promptMessage:"Capture otra Planeacion",
               value:otraPlaneacion, 
               trim:"true", 
               style: "display:none;",                                  
               placeHolder:"Especifique"
            }, 'otraPlaneacion');
            
            registry.byId('CMSelectPlaneacion').on( 'click', function(){
            	var arr=registry.byId('CMSelectPlaneacion').get('value').length;
            	
            			if(arr>1){  
            				
            				jsUtils.cstmAlert('Seleccione solo una opci\u00F3n');
            				registry.byId('CMSelectPlaneacion').reset();
            			}else{
            				_muestraOtro(registry.byId('otraPlaneacion'),registry.byId('CMSelectPlaneacion'));
            			}
            				
	               });
            
            new RadioButton({
	            checked: false,
	            value: 1,
	            name: "indParticipacion"
	        }, "indParticipacionSi").on( 'change', function(){
	        	if(registry.byId('indParticipacionSi').checked){
	        		registry.byId('txActividades').set("style","display:block");
	        		dom.byId('txAct').style.display='block';
	        		
	            }else{
	            	registry.byId('txActividades').set("style","display:none");
	            	dom.byId('txAct').style.display='none';
	            	registry.byId('txActividades').reset();
	            	
	            } 
               });
		   
            
		   new RadioButton({
	            checked: true,
	            value: 0,
	            name: "indParticipacion"
	        }, "indParticipacionNo");
		   
		   utils.createTag('div','txAct','indParticipacionform');
		   dom.byId('txAct').innerHTML='*Especifique al menos 3 actividades  en las que participar\u00E1 de la planeaci\u00F3n escolar 2013-2014';
		   dom.byId('txAct').style.display='none';
		   
		   utils.createTag('div','txActividades','indParticipacionform');
		   
		   new Textarea({ 
	            name:"txActividades", 
	            promptMessage:"Capture sus actividades",
	            value:'', 
	            trim:"true", 
	            style: "width:400px; display:none;"
	        }, "txActividades");
		   
		   if(!jsUtils.isEmpty(primeraSesionObj.planeacion)){
			   if (primeraSesionObj.planeacion.indParticipacion){registry.byId('indParticipacionSi').set('checked',true);} 
			   registry.byId('txActividades').set('value',primeraSesionObj.planeacion.actividades);
		   }
			   
		   }
		} else{
			if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			}
		} 
   }
      
   function _comites(crea,cCct){
	   
	   var id="comitesPane";
	   comitesSelData = primeraSesionObj.integrantesComites;
	   cE=cCct;
	   
	   if(crea){
		   if(!registry.byId(id)){
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Comit\u00e9s",
		           id:id,
		           content: "<div id='comitesDiv'></div>"
		          
		       }));
			   

			   var lstPr=xhr.get({
   	            url: dojo.config.app.urlBase +"primeraAsamblea/searchIntegrantesComite/" + cCct,
   	            sync: false,
   	            preventCache:true,
   	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
   	            handleAs: "json"
			   });
   		   
	      		lstPr.then(function(cIntegrantes){
	      		
	      			var dataInt=[{name:"Seleccione",id:-1}];
	      			
	   	   
	      			for(var i in cIntegrantes.items){
	      				dataInt.push({name:cIntegrantes.items[i].nombreIntegrante, id:cIntegrantes.items[i].cscIntegrante});
	      				
	      			}
	      
	      			iStore = new Memory({
	      				data: dataInt
	      			});
	      			
	      		});
			  
			   registry.byId('pestanias').selectChild(registry.byId(id),true);
			   
				//Establece el identificador de cada renglon asi como el valor maximo
				for(var i in comitesSelData){
					
					//Agrega el identificador
					comitesSelData[i] = lang.mixin({id : comitesSelData[i].cscIntegrante
							+ '_' + (comitesSelData[i].esMiembroCE?"1":"0"),
							nomEsMiembroCE: comitesSelData[i].esMiembroCE?"S\u00ed":"No"}, 
							comitesSelData[i]);
					
					var lastValue = comitesSelData[i].cscIntegrante;
					
		    		if(maxIndex<=lastValue)
		    			maxIndex = lastValue;
					
				}

				var comitesSelStore = new dojo.store.Memory({
				      data: {
					      identifier: 'id',
					      items: comitesSelData
					    }
				});
				
				var dataStore = new dojo.data.ObjectStore({
		            objectStore: comitesSelStore
		        });

				var layout = [[
				    		    { name: 'Id', 							field: 'id', 				width: '1px', hidden:true},
				    		    { name: 'Miembro del Consejo Escolar', 	field: 'nomEsMiembroCE', 	width: '55px'},
				    		    { name: 'cscIntegrante', 				field: 'cscIntegrante', 	width: '1px', hidden:true},
				    		    { name: 'Nombre', 						field:'nombreIntegrante', 	width: '140px'}, 
				    		    { name: 'Apellido paterno', 			field:'paternoIntegrante', 	width: '120px'}, 
				    		    { name: 'Apellido materno', 			field:'maternoIntegrante', 	width: '120px'}, 
				    		    { name: 'Calidad', 						field:'cCalidad', 			width: '120px'}, 
				    		    { name: 'MiembroConsejo', 				field:'esMiembroCE', 		width: '1px', hidden:true}, 
				    		    { name: 'Cargo', 						field:'nomCargo', 			width: '1px', hidden:true},
				    		    { name: 'Comit\u00e9s', 				field:'nomComites', 		width: '240px'}, 
				    		    { name: 'listComites', 					field:'comites', 			width: '1px',  hidden:true} 
				    		]];
								
				utils.createTag('div','miembrosConsejo','comitesDiv');
				dom.byId('miembrosConsejo').innerHTML='<table border="0" align="left" width= "530px">'+
				   '<tr>' +
				   	   '<td align="center">Instalaci&oacute;n de Comit&eacute;s</td>'+
				   '</tr>'+
				   '<tr>' +
			   	   '<td><input id="gridDiv"/></td>'+
				   '</tr>'+
				   '<tr>' +
			   	   '<td><input id="addRow"/> <input id="editRow"/> <input id="removeRow"/></td>'+
				   '</tr>'+
				  
				   '</table>';
					
				//utils.createTag('div','gridDiv', 'comitesDiv');
				
		    	grid = new DataGrid({
			        id: 'grid',
			        store: dataStore,
			        structure: layout,
			        //autoHeight: true,
			        rowSelector:'10px',
				    //height: '80px',
			        //width: '700px'
			       },
			        "gridDiv");
							
		    	grid.startup(); 
			
			   //utils.createTag('div','addRow','comitesDiv');
			   new Button({
					label : constants.TEXT_BUTTON_AGREGAR_INTEGRANTE,
					onClick : function() {
						detalleIntegrante();
						
					}
				}, "addRow");
				
				utils.createTag('div','editRow', 'comitesDiv');
				new Button({
					label : constants.TEXT_BUTTON_EDITAR_INTEGRANTE,
					onClick : function(){ 
						var grid = registry.byId('grid');
						var items = grid.selection.getSelected();
						if(items.length==1){
			                 dojo.forEach(items, function(selectedItem){
			                     if(selectedItem !== null){	
			                    	var itemToEdit={
				                    		id: grid.store.getValue(selectedItem,'id'), 
				                    		nomEsMiembroCE: grid.store.getValue(selectedItem,'nomEsMiembroCE'), 
				                    		cscIntegrante: grid.store.getValue(selectedItem,'cscIntegrante'), 
						      				paternoIntegrante: grid.store.getValue(selectedItem,'paternoIntegrante'),
						      				maternoIntegrante: grid.store.getValue(selectedItem,'maternoIntegrante'), 
						      				nombreIntegrante: grid.store.getValue(selectedItem,'nombreIntegrante'), 
						      				cCalidad: grid.store.getValue(selectedItem,'cCalidad'),
						      				esMiembroCE: grid.store.getValue(selectedItem,'esMiembroCE'),
						       				comites: grid.store.getValue(selectedItem,'comites'),
						       				nomCargo: grid.store.getValue(selectedItem,'nomCargo'),
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
				       label: constants.TEXT_BUTTON_ELIMINAR_INTEGRANTE,
				       onClick: function(){
				    	   grid.removeSelectedRows();
				    	   grid.store.save();
				      }
				}, "removeRow");
						
		   }
		} 
	   
	   
	   
	   else{
			if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			}
		} 
   }
   
   
   
  
   
   
   
   
   function _muestraOtro(tbId,cmsID){

	   var data = cmsID.getOptions();
       for(var j=0;j<data.length;j++){
           if(data[j].label=="Otro" && data[j].selected==true){
        	   tbId.set("style","display:block");
        	   tbId.set("required",true);
        	   
           }

           else if(data[j].label=="Otro" && data[j].selected==false){
        	   tbId.set("style","display:none");
        	   tbId.reset();
        	   tbId.set("required",false);
           }              
       }
   }
   
   /*
    * Funcion que despliega la pantalla de edicion de integrantes de comites. 
    */
   function detalleIntegrante(itemToEdit){
	   var edit=false;
	   
	   //Se agrega un nuevo integrante
	   if(!itemToEdit){
		   itemToEdit= {cscIntegrante: -1,
      				paternoIntegrante: '', maternoIntegrante: '', 
       				nombreIntegrante: '',  nomCargo: '', cCalidad:'',
       				esMiembroCE:true, comites: []
       		};   
	   }else{
		   edit=true;
	   }
	   
	   var optionsComites=_selectComitesCatalogo();

	   //var comiteStore = new dojo.data.ItemFileWriteStore({data: jsonComiteStore});
	   
	   var dDetail =new Dialog({id:'dDetail', title:'Integrante de comit\u00E9', content :'<div id="dcDetail"/>'});
	   dDetail.show();
	   dDetail.on('hide',function(){
		   registry.byId('dDetail').destroyRecursive(false);
	   });
	   dDetail._setStyleAttr('left:20px !important;');
	   dDetail._setStyleAttr('top:20px !important;');
	   
	   utils.createTag('div','intCnt','dcDetail');
	   dom.byId('intCnt').innerHTML='<table border="0" align="left" width="440" height="500px">'+
	   '<tr> ' +
	   '  <td>'+
	   '	<b>*Tipo de integrante: </b><br><br>' +
	   '    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	<input id="esMiembroCESi"/><label for="esMiembroCESi"></label> Miembro del Consejo Escolar<br>'+ 
	   '    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	<input id="esMiembroCENo"/><label for="esMiembroCENo"></label> Miembro de la Comunidad Educativa<br>' +
	   '  </td>'+
	   '</tr>'+
	   '<tr id="datosMiembroComunidad"><td align="center">' +
	   '  	<br><b>*Apellido Paterno: </b><input id="paternoIntegrante"/><br><br>'+
	   '  	<b> Apellido Materno: </b><input id="maternoIntegrante"/><br><br>'+
	   '  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	<b>*Nombre: </b><input id="nombreIntegrante"/><br>'+
	   '	<input type="hidden" id="cscIntegranteStr"/>'+
	   '</td></tr>' +
	   '<tr id="datosMiembroConsejo" style="display:none"><td align="center">' +
	   '	<br><b>*Integrante del Consejo Escolar: </b><input id="cscIntegrante"/><br><br>'+
	   '  	<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	Apellido Paterno: </b><input id="paternoIntegranteStr"/><br><br>'+
	   '  	<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	Apellido Materno: </b><input id="maternoIntegranteStr"/><br><br>'+
	   '  	<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	Nombre: </b><input id="nombreIntegranteStr"/><br><br>'+
	   '  	<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	Cargo: </b><input id="nomCargoStr"/><br><br>'+
	   '  	<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	   '	Calidad: </b><input id="nomCalidadStr"/><br>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<br/><b>Comit&eacute;s en los que participa </b>'+
	   '</td><td><input id="agregarComites"/></td></tr>'+
	   '<tr><td>'+
	   '	<input id="comites" /><br/>'+
	   '</td></tr>'+
	   '<tr>'+
	   '<td><input id="inBtnAceptar"/><br/>'+
	   '</td></tr>'+
	   '</table>';
	   
	   //Componentes de los integrantes de la comunidad escolar
	   new ValidationTextBox({
		   value:itemToEdit.paternoIntegrante,
           uppercase:'true',trim:"true",maxLength:"30",
           required: true
        }, 'paternoIntegrante');
	   new ValidationTextBox({
		   value:itemToEdit.maternoIntegrante, 
           uppercase:'true',trim:"true", maxLength:"30"
        }, 'maternoIntegrante');
	   new ValidationTextBox({
		   value:itemToEdit.nombreIntegrante,
           uppercase:'true',trim:"true",maxLength:"30",
           required: true
        }, 'nombreIntegrante');
	   
	   
	   
	   //Componentes de los integrantes del Consejo Escolar
	   if(itemToEdit.esMiembroCE){
		   new FilteringSelect({
			   id:'cscIntegrante',
	           store: iStore,
	           searchAttr:'name',
	           value: itemToEdit.cscIntegrante
	        }, 'cscIntegrante').on('change', function(){ 
	        	
		    	var idIntegrante= registry.byId('cscIntegrante').get('value');
		    	
		    	var integrante= xhr.get({
			            url: dojo.config.app.urlBase + 'primeraAsamblea/searchIntegrante/'+ cE + '/'+ idIntegrante,
			            sync: false,
			            preventCache:true,
			            contentType: "application/x-www-form-urlencoded; charset=utf-8",
			            handleAs: "json"
		    	});
		    	
		    	integrante.then(function(cIntegrante){
				      registry.byId('paternoIntegranteStr').set("value",cIntegrante.paternoIntegrante);
				      registry.byId('maternoIntegranteStr').set("value",cIntegrante.maternoIntegrante);
				      registry.byId('nombreIntegranteStr').set("value",cIntegrante.nombreIntegrante);
				      registry.byId('nomCargoStr').set("value",cIntegrante.nomCargo);
				      registry.byId('nomCalidadStr').set("value",cIntegrante.nomCalidad);
		        });
		
	        });
	   }else{
		   new ValidationTextBox({
			   value:itemToEdit.cscIntegrante,
	           uppercase:'true',trim:"true",maxLength:"30",
	           type: 'hidden'
	        }, 'cscIntegranteStr');
	   }
    
	   new ValidationTextBox({
		   value:itemToEdit.paternoIntegrante,
           uppercase:'true',trim:"true",maxLength:"30",
           readOnly:true
        }, 'paternoIntegranteStr');
	   new ValidationTextBox({
		   value:itemToEdit.maternoIntegrante, 
           uppercase:'true',trim:"true", maxLength:"30",
           readOnly: true
        }, 'maternoIntegranteStr');
	   new ValidationTextBox({
		   value:itemToEdit.nombreIntegrante,
           uppercase:'true',trim:"true",maxLength:"30",
           readOnly: true
        }, 'nombreIntegranteStr');
	   new ValidationTextBox({
		   value:itemToEdit.nomCargo, 
           uppercase:'true',trim:"true", maxLength:"30",
           readOnly: true
        }, 'nomCargoStr');
	  
	   new ValidationTextBox({
		   value:itemToEdit.cCalidad,
           uppercase:'true',trim:"true",maxLength:"30",
           readOnly: true
        }, 'nomCalidadStr');
	   	   

	   new RadioButton({
           checked: false,
           value: true,
           name: "esMiembroCE"
       }, "esMiembroCESi").on( 'change', function(){
    	   
    	//Selecciona integrante del Consejo Escolar
       	if(registry.byId('esMiembroCESi').checked){
       		
       		
       		dom.byId('datosMiembroComunidad').style.display='none';
       		dom.byId('datosMiembroConsejo').style.display='block';
       		

          	//Resetea los valores de integrante del consejo 
          	registry.byId('paternoIntegranteStr').reset();
          	registry.byId('maternoIntegranteStr').reset();
          	registry.byId('nombreIntegranteStr').reset();
          	registry.byId('nomCargoStr').reset();
          	registry.byId('nomCalidadStr').reset();
          	
          	//Hace obligatorio la captura del integrante de CE
       		registry.byId('cscIntegrante').set("required",true);
       		//registry.byId('cscIntegrante').set("value",-1);
       		
          	//Quita la obligatoriedad de la captura del nombre del integrante de
       		//la comunidad escolar
       		registry.byId('paternoIntegrante').set("required",false);
       		registry.byId('maternoIntegrante').set("required",false);
       		registry.byId('nombreIntegrante').set("required",false);
           }else{
        	//Desahabilita la edicioon de los datos del integrnte del CE
       		
       		dom.byId('datosMiembroComunidad').style.display='block';
       		dom.byId('datosMiembroConsejo').style.display='none';
           	
          	//Resetea los valores del integrante del consejo escolar
          	//registry.byId('cscIntegrante').reset();
           	
          	//Quita la obligatoriedad de la captura del nombre del integrante de CE
           	registry.byId('cscIntegrante').set("required",false);
           	
          	//Hace obligatorio la captura del nombre del integrante de 
           	//la cominudad escolar
       		registry.byId('paternoIntegrante').set("required",true);
       		registry.byId('nombreIntegrante').set("required",true);
           } 
          });
	   
	   new RadioButton({
           checked: true,
           value: false,
           name: "esMiembroCE"
       }, "esMiembroCENo");

	   
	   if(itemToEdit.esMiembroCE==true){
		   registry.byId('esMiembroCESi').set('checked',true);  
	   }
	   
	   if(itemToEdit.esMiembroCE==false){
		   registry.byId('esMiembroCENo').set('checked',true);
		   
		  
	   }
	   
	   if(edit==true){
		   registry.byId('esMiembroCESi').set('readOnly',true);
		   registry.byId('esMiembroCENo').set('readOnly',true);
		   if(registry.byId('cscIntegrante'))
			   registry.byId('cscIntegrante').set('readOnly',true);
	   }
	  
	   var comitesCk = new CheckedMultiSelect({
           multiple:true,
           required: true,
           invalidMessage:"Debe seleccionar al menos un comit\u00e9"
        },'comites');

	   
	   registry.byId('comites').addOption(optionsComites);
	   registry.byId('comites').reset();
	   
	  
       for(var i in itemToEdit.comites){
    	   registry.byId('comites').updateOption({value:itemToEdit.comites[i],selected:true});
       }          

	   new Button({
			label : "+/- Comit\u00e9s",
			onClick : function() {
				editComites();
			}
		}, "agregarComites");
       	   
	   new Button({
			label : " Aceptar ",
			onClick : function() {
					var form = registry.byId('dDetail');
					
					if (!form.validate()){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					
					var comites =[];
					var nomComites='';
					var resp=null;
					var esMiembro=null;
					var grid = registry.byId('grid');
					
					comites= registry.byId('comites').get('value');
					
					var tamComite=comites.length-1;
					var csc=registry.byId('cscIntegrante')?registry.byId('cscIntegrante').get('value'):
						registry.byId('cscIntegranteStr').get('value');
					
					var idGrid='';
										
					if(registry.byId('esMiembroCESi').checked==true){
						   resp="S\u00ED";
						   esMiembro=true;
						   if(edit==false){
							   
							   if(csc==-1){
								   utils.cstmAlert('Debe seleccionar a un integrante del consejo');
								   return false;
							   }
							   
							   idGrid=csc+'_'+1;
							   
							   for(var i in comitesSelData){
								   if(comitesSelData[i].id==idGrid){
									   utils.cstmAlert('El integrante seleccionado se encuentra previamente registrado,<br> si desea modificar sus datos, seleccione la opci\u00F3n <b>Editar integrante</b>');
										return false;
								   }
							   }
							   
							   var gridComitesIntegrantes = registry.byId('grid');
								
								// Obtiene la informaci—n del Grid
								for ( var i = 0; i < gridComitesIntegrantes.rowCount; i++) {
									
									var item = gridComitesIntegrantes.getItem(i);
									
									if(gridComitesIntegrantes.store.getValue(item,'id')==idGrid){
										utils.cstmAlert('El integrante seleccionado se encuentra previamente registrado,<br> si desea modificar sus datos, seleccione la opci\u00F3n <b>Editar integrante</b>');
										return false;
										
									}
									
								}
							   
						   }
						   
					 }else if(registry.byId('esMiembroCENo').checked==true){
						   resp="No";
						   esMiembro=false;
						   
					 }
					
					
					if(edit){
						var index = grid.selection.selectedIndex;
						var item = grid.getItem(index);
						
						 grid.store.setValue(item, 'id',  csc + '_' + (esMiembro?"1":"0"));
						 grid.store.setValue(item, 'cscIntegrante', csc);
						 grid.store.setValue(item, 'nomEsMiembroCE', resp);
						 grid.store.setValue(item, 'esMiembroCE', esMiembro);
						 grid.store.setValue(item, 'comites', comitesCk.get('value'));
						 
						 if(esMiembro==true){
							    grid.store.setValue(item, 'nombreIntegrante', registry.byId('nombreIntegranteStr').get('value'));
								grid.store.setValue(item, 'paternoIntegrante', registry.byId('paternoIntegranteStr').get('value'));
								grid.store.setValue(item, 'maternoIntegrante', registry.byId('maternoIntegranteStr').get('value'));
								grid.store.setValue(item, 'cCalidad', registry.byId('nomCalidadStr').get('value'));
								grid.store.setValue(item, 'nomCargo', registry.byId('nomCargoStr').get('value'));
						 }
						 else{
							 	grid.store.setValue(item, 'nombreIntegrante', registry.byId('nombreIntegrante').get('value'));
								grid.store.setValue(item, 'paternoIntegrante', registry.byId('paternoIntegrante').get('value'));
								grid.store.setValue(item, 'maternoIntegrante', registry.byId('maternoIntegrante').get('value'));
						 }
						
						 var optionsComites=_selectComitesCatalogo();
						 
						for(var a in comites){
							for (var i in optionsComites){
								if(comites[a]==optionsComites[i].value){
									if(a==tamComite){
										nomComites = nomComites + optionsComites[i].label;
									}
									else{
										nomComites = nomComites + optionsComites[i].label +',';
									}
								}
							}
						}
						grid.store.setValue(item, 'nomComites', nomComites);
						grid.update();
						
					}else{
					   var myNewItem = {id: csc + '_' + (esMiembro?"1":"0"),  
			       				nomEsMiembroCE: resp,
			       				comites: registry.byId('comites').get('value'),
			       				esMiembroCE: esMiembro
			       			};
					   
					   if(esMiembro==true){
						    
						    lang.mixin(myNewItem,{cscIntegrante: csc});
						   	lang.mixin(myNewItem,{nombreIntegrante: registry.byId('nombreIntegranteStr').get('value')});
						   	lang.mixin(myNewItem,{paternoIntegrante: registry.byId('paternoIntegranteStr').get('value')});
						   	lang.mixin(myNewItem,{maternoIntegrante: registry.byId('maternoIntegranteStr').get('value')});
						   	lang.mixin(myNewItem,{cCalidad: registry.byId('nomCalidadStr').get('value')});
						   	lang.mixin(myNewItem,{nomCargo: registry.byId('nomCargoStr').get('value')});
						   	
					   }else{
						    lang.mixin(myNewItem,{cscIntegrante: ++maxIndex});
						    lang.mixin(myNewItem,{nombreIntegrante: registry.byId('nombreIntegrante').get('value')});
						   	lang.mixin(myNewItem,{paternoIntegrante: registry.byId('paternoIntegrante').get('value')});
						   	lang.mixin(myNewItem,{maternoIntegrante: registry.byId('maternoIntegrante').get('value')});
						   	lang.mixin(myNewItem,{cCalidad:'COMUNIDAD ESCOLAR'});
					   }
					   
					   var optionsComites=_selectComitesCatalogo();
					   for(var a in comites){
							for (var i in optionsComites){
								if(comites[a]==optionsComites[i].value){
									if(a==tamComite){
										nomComites = nomComites + optionsComites[i].label;
									}
									else{
										nomComites = nomComites + optionsComites[i].label +', ';
									}
								}
							}
						}
					   
					   lang.mixin(myNewItem,{nomComites: nomComites});
				       grid.store.newItem(myNewItem);  
					}
				    registry.byId('dDetail').destroyRecursive(false);
							
			}
		},'inBtnAceptar');
	   
   }

  
	// Se manda a actualizar la informacion capturada de la primera
	// sesión
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
		
		var ceInfGral = {
			cCct : cct
		};
		var ceSesion = {
			fchSesion : registry.byId('fechaRegistro').get('value'),
			horaIniSesion : registry.byId('horaInicio').get('value'),
			horaFinSesion : registry.byId('horaFinal').get('value'),
			numIntegrantes : registry.byId('numIntegrantes').get(
					'value'),
			observaciones : registry.byId('observaciones').get('value'),
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

		// Programas
		var programas = new Array();
		var todosProgramas = [];
		var proms = new Array();
		var nomOtroPrograma;

		//El usuario selecciono Programas
		if(registry.byId('CMSelect1')){
		
			var listProgramas = new Array({
				title : "Programas Federales",
				tpoPrograma : 1,
				id : "progFedPane"
			}, {
				title : "Programas Estatales",
				tpoPrograma : 2,
				id : "progEstPane"
			}, {
				title : "Programas Locales",
				tpoPrograma : 3,
				id : "progLocPane"
			}, {
				title : "Proyectos OSC",
				tpoPrograma : 4,
				id : "proyOSCPane"
			});

			for ( var x in listProgramas) {
				programas = registry.byId(
						'CMSelect' + listProgramas[x].tpoPrograma).get(
						'value');
				todosProgramas = todosProgramas.concat(programas);
			}
			
			if(todosProgramas.length <= 0 ){
				jsUtils.cstmAlert("Debe seleccionar al menos uno de los programas o proyectos");
				return false;	
			}
			
			var cPrograma = 0;
			for ( var i in todosProgramas) {
				cPrograma = todosProgramas[i];
				if (cPrograma == 37 || cPrograma == 49
						|| cPrograma == 80) {
					nomOtroPrograma = registry.byId(
							'otroPrograma'
									+ listProgramas[cPrograma==37?1:cPrograma==49?2:3
									                ].tpoPrograma).get(
							'value');
					proms.push({
						cPrograma : todosProgramas[i],
						nomOtroPrograma : nomOtroPrograma
					});
				
				} else {
					proms.push({
						cPrograma : todosProgramas[i]
					});
				
				}
			}
		}
		
		// Recursos
		var indRecurso;
		var recursos = new Array();
		if(registry.byId("MontoDonacion")){
			var montoDonacion = registry.byId("MontoDonacion").get('value');
			var montoStrDonacion = registry.byId("MontoStrDonacion").get(
					'value');
			var especieoDonacion = registry.byId("EspecieoDonacion").get(
					'value');
			var montoRifa = registry.byId("MontoRifa").get('value');
			var montoStrRifa = registry.byId("MontoStrRifa").get('value');

			recursos.push({
				cRecurso : 0,
				monto : montoDonacion,
				montoStr : montoStrDonacion,
				especie : especieoDonacion
			});
			recursos.push({
				cRecurso : 1,
				monto : montoRifa,
				montoStr : montoStrRifa
			});

			if (registry.byId('apfRadioSi').checked==true) {
				
				indRecurso = registry.byId("apfRadioSi").get('value');
				// jsUtils.cstmAlert(json.toJson(indRecurso));
				recursos.push({
					cRecurso : 3,
					indRecurso : indRecurso
				});
			} else {
				if (registry.byId("apfRadioNo").checked == true) {
					indRecurso = registry.byId("apfRadioNo").get('value');
					// jsUtils.cstmAlert(json.toJson(indRecurso));
					recursos.push({
						cRecurso : 3,
						indRecurso : indRecurso
					});
				} else {
					if (registry.byId("apfRadioNoex").checked == true) {
						indRecurso = registry.byId("apfRadioNoex").get(
								'value');
						// jsUtils.cstmAlert(json.toJson(indRecurso));
						recursos.push({
							cRecurso : 3,
							indRecurso : indRecurso
						});
					}
				}
			}
		}
		
		// Planeacion

		var planeacion = {};
		var planeacionAct = {};
		if(registry.byId("indPlaneacionSi")){

			if(registry.byId('indParticipacionSi').checked && registry.byId('txActividades').get('value')==''){
				jsUtils.cstmAlert('Favor de registrar sus actividades');
				return false;
			}

			var indPlaneacionSi = registry.byId("indPlaneacionSi").get(
					'value');
			var indPlaneacionNo = registry.byId("indPlaneacionNo").get(
					'value');

			if (indPlaneacionSi == true && indPlaneacionNo == false) {
				var plan = registry.byId("CMSelectPlaneacion").get('value');
				var otroPlan=null;
				if(plan[0]==4){
					otroPlan=registry.byId('otraPlaneacion').get('value');
				}
				planeacion = {
					indPlaneacion : indPlaneacionSi,
					cPlaneacion : plan[0],
					nomOtroPlaneacion:otroPlan
				};
				if(plan[0]==4){
					
				}
			} else {
				
					planeacion = {
						indPlaneacion : false
					};
				
			}

			var indParticipacionSi = registry.byId("indParticipacionSi")
					.get('value');
			var indParticipacionNo = registry.byId("indParticipacionNo")
					.get('value');

			if (indParticipacionSi == true && indParticipacionNo == false) {
				var actPlan = registry.byId("txActividades").get('value');
				if ( actPlan == ''){  
					jsUtils.cstmAlert('Favor de registrar los datos requeridos');
					return false;
				}
				planeacionAct = {
					indParticipacion : indParticipacionSi,
					actividades : actPlan
				};
			} else {
					planeacionAct = {
						indParticipacion : false
					};
			}

			lang.mixin(planeacion, planeacionAct);
		}
		
		// Comites e Integrantes.
		
		var comites = new Array();
		var comite={};
				
		//El usuario seleccino Comites
		if(array.indexOf(gActividades,25)!=-1){

					var gridComitesIntegrantes = registry.byId('grid');
					
					if(gridComitesIntegrantes.rowCount==0){
						jsUtils.cstmAlert('Favor de registrar al menos un comit\u00E9');
						return false;
					}
					
					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridComitesIntegrantes.rowCount; i++) {
						
						var item = gridComitesIntegrantes.getItem(i);
						
						if(gridComitesIntegrantes.store.getValue(item,'esMiembroCE')==true){
							comite = {
								    
		                    		cscIntegrante:  gridComitesIntegrantes.store.getValue(item,'cscIntegrante'),
				      				esMiembroCE: gridComitesIntegrantes.store.getValue(item,'esMiembroCE'),
				       				comites: gridComitesIntegrantes.store.getValue(item,'comites'),
							
								}; 
						}
						else{
						 comite = {
								   
		                    		cscIntegrante:  gridComitesIntegrantes.store.getValue(item,'cscIntegrante'),
				      				paternoIntegrante: gridComitesIntegrantes.store.getValue(item,'paternoIntegrante'),
				      				maternoIntegrante: gridComitesIntegrantes.store.getValue(item,'maternoIntegrante'), 
				      				nombreIntegrante: gridComitesIntegrantes.store.getValue(item,'nombreIntegrante'), 
				      				esMiembroCE: gridComitesIntegrantes.store.getValue(item,'esMiembroCE'),
				       				comites: gridComitesIntegrantes.store.getValue(item,'comites'),
							
								}; 
						}
				
						comites.push(comite);
					}
			
			
		}

		// Se integra la primera sesión.
		var primeraSesion = {
			ceInfGral : ceInfGral,
			ceSesion : ceSesion,
			actividades : actividades,
			programas : proms,
			recursos : recursos,
			integrantesComites : comites
			
		};
		
		if(registry.byId("indPlaneacionSi")){
			lang.mixin(primeraSesion,{planeacion : planeacion});
		}
		
		console.log(json.toJson(primeraSesion));
		var urlJson = dojo.config.app.urlBase
				+ 'primeraSesion/savePrimeraSesion';
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
	
	 /*
	    * Función generica que genera la pestaña con la información de los
	    * comites.
	    */
	   function editComites(){
		  
		   			
				   var dDetailComite =new Dialog({id:'dDetailComite', title:'Administraci\u00F3n de Comit\u00e9s',
					   							content :'<div id="dcDetailComite"/>', style:'width:650px;height:400px;'});
				   dDetailComite.show();
				   dDetailComite.on('hide',function(){
					   registry.byId('dDetailComite').destroyRecursive(false);
 
					   var optionsComites = _selectComitesCatalogo();

					    var data = {
							      identifier: "id",
							      items: []
							    };
					   
					   var storeCom = new dojo.data.ItemFileWriteStore({data: data});
					   
					   var valCom = registry.byId('comites').get('value');
					   
					   registry.byId('comites').set('store', storeCom);
					   registry.byId('comites').startup();
					   
					   registry.byId('comites').addOption(optionsComites);
					   registry.byId('comites').reset();
					   
				       for(var i in valCom){
				    	   registry.byId('comites').updateOption({value:valCom[i],selected:true});
				       }          
					   
				   });
				   dDetailComite._setStyleAttr('left:40px !important;'); 
				   dDetailComite._setStyleAttr('top: 40px !important;');
				   
				   utils.createTag('div','intCntComite','dcDetailComite');
				   
				   dom.byId('intCntComite').innerHTML='<table border="0" align="left">'+
				  
				   '<tr>' +
				   	   '<td>* Nombre del comit\u00E9:'+
				       '</td>'+
				   	   '<td><input id="nombreComite"/>'+
				   	   '</td>'+
				   	   '<td>Observaciones:'+
				   	   '</td>'+
				       '<td><input id="obserComite"/>'+
				   	   '</td>'+
				   '</tr>'+
				   '<tr>' +
				   		'<td colspan=4><input id="addComite"/>'+
			   	   '</tr>'+
				   '<tr>'+
				   		'<td colspan=4><br/>'+
				   		'<input id="gridComites"/><br/><br/>'+
				   		'</td>'+
				   '</tr>'+
				   '<tr>'+
				   	     '<td colspan=4><input id="editComite"/><input id="removeComite"/></td>'+
				   '</tr>'+
				   '</table>';
				   
				   var idComite=0;
				   var edit=0;
				   
				   //set up layout
				    var layoutComites = [[ 
				      { name: 'Id',						field: 'id', 		     width: '1px', hidden:true},
				      { name: 'IdComite',				field: 'cComite', 		 width: '1px', hidden:true},
					  { name: 'Nombre Comit\u00e9',		field: 'nombreComite',	 width: '200px'},      
				      { name: 'Observaciones', 			field: 'observaciones',	 width: '377px'}
					  ]];
				    
				 //Componentes para editar o agregar un comité.
				   new ValidationTextBox({
					   value:' ', 
			           trim:"true",
			           maxLength:"30",
			        }, 'nombreComite');
				   
				   new ValidationTextBox({
					   value:' ', 
			           trim:"true",
			           maxLength:"100",
			        }, 'obserComite');
				   
				   //create a new grid:
				    new DataGrid({
					    id: 'gridComites',
				        //autoHeight: true,
					    structure: layoutComites,
					    rowSelector:'10px',
					    height: '200px',
				    },
					    'gridComites').startup();
				    
				    //Cargar grid.
				    
				    listComitesCct();
				    
				    
				   new Button({
						label : 'Agregar',
						onClick : function() {
							
							var gridComite = registry.byId('gridComites');
							var comite={};
							
							var standby = new Standby({
								target : "dDetailComite"
							});
							document.body.appendChild(standby.domNode);
							standby.startup();
							
							if(registry.byId('nombreComite').get('value')==''){
								jsUtils.cstmAlert('Favor de registrar el nombre del comit\u00e9');
								return false;
							}
							
							comite = {
				       				nomComite: registry.byId('nombreComite').get('value'),
				       				observaciones: registry.byId('obserComite').get('value')
								}; 
						
							if(edit==1){
							    lang.mixin(comite,{cComite: idComite});
							}
							
							var urlJson = dojo.config.app.urlBase + 'catalogos/saveComiteCct/';
							xhr.post({
										url : urlJson,
										postData : json.toJson(comite),
										headers : {
											"Content-Type" : "application/json; charset=UTF-8",
										},
										handleAs : 'json',
										handle : function(response) {
											
											if (response == 'SyntaxError: syntax error'){
							    	            window.location.reload();
											}else if (response != 1) {
												jsUtils.cstmAlert('Ocurri\u00F3 un error al actualizar los datos.');
												standby.hide();
											} else {
												
												if(edit==0){
													listComitesCct();
													
												}
												else{
													var index = gridComite.selection.selectedIndex;
													var item = gridComite.getItem(index);
													
													gridComite.store.setValue(item, 'nombreComite', comite.nomComite);
													gridComite.store.setValue(item, 'observaciones', comite.observaciones);
						
													edit=0;
													
													gridComite.update();
												
												}
												
												standby.hide();
											}

										}
							}).progress(standby.show());	
							
					        registry.byId('nombreComite').set("value",'');
		                	registry.byId('obserComite').set("value",'');
		                	
						}
				   }, "addComite");
		
				   new Button({
						label : 'Editar',
						onClick : function(){ 
							var grid = registry.byId('gridComites');
							var items = grid.selection.getSelected();

							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	 
					                	 idComite=grid.store.getValue(selectedItem,'cComite');
					                	 
					                	 registry.byId('nombreComite').set("value",grid.store.getValue(selectedItem,'nombreComite'));
					                	 registry.byId('obserComite').set("value",grid.store.getValue(selectedItem,'observaciones'));
					                	 
					                	 edit=1;
					                	 
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
				   },'editComite');
		
				   new Button({
						label: 'Eliminar',
						onClick: function(){
							var grid = registry.byId('gridComites');
							var comElim=new Array();
							var items = grid.selection.getSelected();
							var gridListComites = registry.byId('grid');
							
							if(items.length>0){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	
					                	 comElim.push(grid.store.getValue(selectedItem,'cComite'));
					                	 
					                 }
					             });			                	 
					             
						       var urlJson = dojo.config.app.urlBase + 'catalogos/deleteComiteCct/';
						        
					            xhr.post({
					  	           url: urlJson,
					  	           postData : json.toJson(comElim),
					  	           headers : {
										"Content-Type" : "application/json; charset=UTF-8",
									},
					  			   handleAs: 'json',
					  	           handle: function(response){
					  	          	
					  	          	 if(response!=comElim.length){
					  	          		 utils.cstmAlert('Ocurri\u00F3 un error al eliminar los datos');
					  	          	}
					  	          	 else{
					  	          		// Elimina la filas del grid
					  	          		grid.removeSelectedRows();
								        grid.store.save();
								        
								        //Se eliminan los comites del grid de integrantes
					  	          		var comitesCat = _selectComitesCatalogo();
					  	          		
						  	          	for ( var i = 0; i < gridListComites.rowCount; i++) {
											
											var item = gridListComites.getItem(i);
											
											var comitesGrid = gridListComites.store.getValue(item,'comites');
											
											var comites=[];
											var nomComites=[];
											
											for(var a =0; a<comitesGrid.length; a++){
																																				
												for(var j=0; j<comitesCat.length; j++){
													
													if(comitesGrid[a]==comitesCat[j].value){
													
														comites.push(comitesCat[j].value);
														nomComites.push(comitesCat[j].label);
														
													}
												
												}
											}
											
											gridListComites.store.setValue(item, 'comites', comites);
											gridListComites.store.setValue(item, 'nomComites', nomComites);
											
											if(comites.length==0){
												
												gridListComites.store.deleteItem(item);
												gridListComites.store.save();
	
											}
											else{
												
												gridListComites.update();
											}
											
											
										}
						  	           utils.cstmAlert('La eliminaci\u00F3n se realiz\u00F3 correctamente');
								        
					  	          	 }            		
					  	           }
					  	        });
							}
							else{
								 utils.cstmAlert('Debe seleccionar al menos un registro.');
							}
							
					           
						}
				   }, "removeComite");
				   
		}
	   
	   
	   /*
	    * Termina funcion para agregar comites o editar. 
	    *
	    */
	   
	   //Carga grid con los comites que tiene el cct.
	   	   function listComitesCct(){
		   
		   	   var cont=0;
			   var lstEv=xhr.get({
		           url: dojo.config.app.urlBase + 'catalogos/listComiteCct/'+cE,
		           sync: false,
		           preventCache:true,
		           contentType: "application/x-www-form-urlencoded; charset=utf-8",
		           handleAs: "json"
		       });
			    
			    lstEv.then(function(cComite){
					 
					    var data = {
							      identifier: "id",
							      items: []
							    };
					    
					    for (var j in cComite){
							  data.items.push({
								    id:cont++,
		                   		cComite: cComite[j].cComite, 
		                   		nombreComite: cComite[j].nomComite, 
		                   		observaciones: cComite[j].observaciones
								   });
						}
					   
					    var newStore = new ItemFileWriteStore({data: data});
						   registry.byId('gridComites').setStore(newStore);
			    });
	   }
	   
	   
	   // Devuelve un arreglo con los comites generales mas los comites del cct.
	   function _selectComitesCatalogo(){ 
		   
		   var comGlobales=xhr.get({
	           url: dojo.config.app.urlBase + 'catalogos/listComite/1',
	           sync: true,
	           preventCache:true,
	           contentType: "application/x-www-form-urlencoded; charset=utf-8",
	           handleAs: "json"
	       } );	
		   
		   var comCct=xhr.get({
	           url: dojo.config.app.urlBase + 'catalogos/listComiteCct/'+cE,
	           sync: true,
	           preventCache:true,
	           contentType: "application/x-www-form-urlencoded; charset=utf-8",
	           handleAs: "json"
	       } );	

		   var options= new Array();
		   
		   var defs = new DeferredList([comGlobales, comCct]);
		   defs.then(function(results){
			   
			   var optionsComites= new Array();
			   var optionsComitesAll= new Array();
			   
			   optionsComites=results[0][1];
			   optionsComitesAll = optionsComites.concat(results[1][1]);
			   
			   
			   for(var i in optionsComitesAll){
				   options.push({label: optionsComitesAll[i].nomComite, value: optionsComitesAll[i].cComite, selected: false,});
			   }
			  
			   
		   });
		   return(options);

	   }
	   

   return {
	   init:init,
	   savePrimeraSesion:savePrimeraSesion,
	   editComites:editComites
	   };
   
});

