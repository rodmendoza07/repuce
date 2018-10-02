define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array",
         "dojox/form/CheckedMultiSelect","app/util/jsUtils","dojo/_base/xhr","dojo/_base/json",
         "dijit/form/ValidationTextBox","dojo/on","dijit/form/RadioButton","dijit/form/Textarea",
         "dojo/dom", "dojox/grid/cells/dijit", "dojo/data/ItemFileWriteStore", "dijit/form/FilteringSelect",
         "dijit/form/CheckBox", "dojox/grid/EnhancedGrid", "dijit/form/Button", "app/util/constants",  "dijit/form/Form",
         "dojo/_base/xhr", "dojo/DeferredList", "dojox/widget/Standby","dojo/data/ItemFileWriteStore",
         "dojox/form/MultiComboBox","dojox/grid/DataGrid","app/reuniones/reuniones","dojo/_base/lang","dijit/Dialog",
         "dojo/store/Memory"], 
function( ContentPane,registry,array,CheckedMultiSelect,jsUtils,xhr,json,ValidationTextBox,
		on,RadioButton,Textarea,dom, gridCellsDijit, ItemFileWriteStore, FilteringSelect,
		CheckBox, EnhancedGrid, Button, constants, Form, xhr, DeferredList, Standby, ItemFileWriteStore,
		MultiComboBox,DataGrid,reuniones,lang,Dialog,Memory){
	
	//Variables Globales
	var listProgramas= new Array({title:"Programas Federales",tpoPrograma:1,id:"progFedPane"},
			   {title: "Programas Estatales",tpoPrograma:2,id:"progEstPane"},
			   {title:"Programas Locales",tpoPrograma:3,id:"progLocPane"},
			   {title:"Proyectos OSC",tpoPrograma:4,id:"proyOSCPane"});
	
	var cuartaSesionObj= new Object();
	var gActividades=[];
	var pStorePositivo=new Memory();
	var pStoreNegativo=new Memory();
	//Termina la definición de variables globales

	//Función Principal
	function init(actividades,cCct,ReunionObj){	   		
		cuartaSesionObj=ReunionObj;
		gActividades=actividades;
			
		_programas(array.indexOf(actividades,61)!=-1);
		_comites(array.indexOf(actividades,62)!=-1);
		_recursos(array.indexOf(actividades,63)!=-1);
		_mejoras(array.indexOf(actividades,64)!=-1);
		_eventos(array.indexOf(actividades,65)!=-1);
		_planeacion(array.indexOf(actividades,66)!=-1);
		   
		  
		   
   }//Termina funsión principal
	
	
	//--------------------------------------------------------
	// Funciones
	//--------------------------------------------------------
	
	//Función Comites
	function _comites(crea){
		
		   var id="comitesPane"; 
		   if(crea){
			   
			   if(cuartaSesionObj.comites.length==0){
					 jsUtils.cstmAlert('La actividad seleccionada no puede ser registrada, ya que no registr\u00F3 comit\u00E9s en la primera sesi\u00F3n.');
					 
					 registry.byId('nomActividad').updateOption({
							value: 62,
							selected: false
						});
					 return;
			   }
			   
		  	   if(!registry.byId(id)){
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:"Comit\u00e9s",
			           id:id
			       }));
				   
				   registry.byId('pestanias').selectChild(registry.byId(id),true);
				  
				   
				   jsUtils.createTag('div',id+'Grid',id);
				    
				   var layout = [[
				                  	{ name: 'cComite', field:'cComite', width: '20px', hidden:true},
					    		    { name: '**Comit\u00e9', field: 'nomComites', width: '120px'},
					    		    { name: 'Integrantes', field: 'integrantes',  width: '400px'},
					    		    { name: 'Los comit\u00e9s que presentaron  su proyecto anual de actividades \u00BFlos cumplieron?',	
							    		   field:'indCumplieronAct',
								    	   width: "auto",
								    	   styles: "text-align: center",
								    	   type: dojox.grid.cells.Bool,
								    	   editable: true
								    	},
							    	{ name: 'Proyectos', field: 'actividades', 
										editable: true, 
										width: '150px', 
							    		type: gridCellsDijit._Widget,
							    		widgetClass: ValidationTextBox, 
							    		widgetProps: {uppercase:'true', required: true, maxlength: '50'}, 
							    		styles: 'text-align: center;' }
					    		]];
				  
			       new DataGrid({
				        id: id+'Grid',
				        structure: layout,
				        autoHeight: true,
				        rowSelector: '30px'
				   },id+'Grid').startup();;
			
				   var data = {
				      identifier: "cComite",
				      items: []
				    };
				    
				    for(var cont in cuartaSesionObj.comites){
				    	
				    	if(cuartaSesionObj.comites[cont].indProyAnualCom==true){
				    		
				    		var actividades=cuartaSesionObj.comites[cont].actividades;
				    		if(cuartaSesionObj.comites[cont].actividades==null){
				    			actividades='';
				    		}
				    		
				    		data.items.push({cComite:cuartaSesionObj.comites[cont].cComite, 
				    					nomComites: cuartaSesionObj.comites[cont].nomComite, 
				    					integrantes: cuartaSesionObj.comites[cont].nomIntegrantes,
				    					indCumplieronAct:cuartaSesionObj.comites[cont].indCumplieronAct,
				    					actividades:actividades});
				    	}
				    }
				    var newStore = new ItemFileWriteStore({data: data});
			    	registry.byId(id+'Grid').setStore(newStore);
			    	
			    	if(data.items.length==0){
			    		jsUtils.createTag('div','mensajeComites',id);
			    		dom.byId('mensajeComites').innerHTML=' <br><br><table border="0">'+
			    		   '<tr><td>'+
			    		   '	<b>No existen comit\u00e9s que hayan presentado proyecto anual.</b>'+
			    		   '</td></tr>'+
			    		   '</table>';
			    	}
			    	
			    	jsUtils.createTag('div','mensajeInformacion',id);
		    		dom.byId('mensajeInformacion').innerHTML=' <br><br><table border="0">'+
		    		   '<tr><td>'+
		    		   '	<b><font size=1> ** Informaci\u00F3n recabada en la segunda asamblea. </Font></b>'+
		    		   '</td></tr>'+
		    		   '</table>';
			    	
			    	
			   }
			
		}else{
			   if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}
	}
	
	//Función Recursos
	function _recursos(crea){
	
		var id="recursosPane"; 
		if(crea){
			
			 if(cuartaSesionObj.recursos.length==0){
				 jsUtils.cstmAlert('La actividad seleccionada no puede ser registrada, ya que no registr\u00F3 recursos en la primera sesi\u00F3n.');
				 
				 registry.byId('nomActividad').updateOption({
						value: 63,
						selected: false
					});
				 return;
			 }
			
			
			if(!registry.byId(id)){
				 
				   var contenido= '<table border="0" align="lefth" >'+ 
				   '<tr><td>'+ 
				   '	<span align="lefth" class="sub">' +
				   '	** Informe de la Asociaci\u00f3n de Padres de Familia o su equivalente, a la invitaci\u00f3n del ' +
				   '	consejo escolar, sobre el monto y uso que se le dio a los recursos recabados.' +
				   '	</span>'+ 
				   '</td></tr>'+ 
				   '<tr><td> ';
				   
				   if(cuartaSesionObj.recursos[0].indRecurso == '0' || cuartaSesionObj.recursos[0].indRecurso == 'o'){
					   contenido += "La Asociaci\u00f3n de Padres de Familia o su equivalente no promovi\u00f3 informe de la asociaci\u00f3n de padres de familia, ante la comunidad educativa sobre el monto y uso que le dar\u00E1 a la recursos recabados."+
					   				'</td></tr></table>';
				   }
				   
				   if(cuartaSesionObj.recursos[0].indRecurso == '2'){
					   contenido +="No existe asociaci\u00f3n de padres de familia o su equivalente en el centro escolar"+
						   			'</td></tr></table>';
				   }
					
				   if(cuartaSesionObj.recursos[0].indRecurso == '1'){
					   
					   contenido += "La Asociaci\u00f3n de Padres de Familia o su equivalente si promovi\u00f3 informe de la asociaci\u00f3n de padres de familia, ante la comunidad educativa sobre el monto y uso que le dar\u00E1 a la recursos recabados.";
					   
					   contenido += 
						   '<tr><td>'+
						   ' 	<b><p style="text-align:center">La asociaci\u00f3n de padres de familia <br/> \u00BFacepta la invitaci\u00f3n del consejo escolar para  informar sobre el monto <br/> y uso que le dio a  los recursos que recabo? <br/> </b>'+
						   '	<input id="indRecurso1"/><label for="indRecurso1">S\u00ED</label><br/>'+
						   '	<input id="indRecurso0"/><label for="indRecurso0">No</label><br/><br/> </p>'	+		
						   '</td></tr> '+
						   '<tr id="montoUso" style="display:none"><td>'+ 
						   '	<b><p style="text-align:center">* Monto</b><br/>N\u00FAmero:<input id="montoRecursos"/>&nbsp;&nbsp;&nbsp; Letra:<input id="montoStrRecursos"/><br/><br/>'+ 
						   '	  *Uso: <input id="uso"/> '+ 
						   '</td></tr>';
				   }
				   
				   contenido +=
				   '<tr><td>'+
	    		   '	<br/><br/><br/> <b><font size=1> ** Informaci\u00F3n recabada en la primera sesi\u00F3n. </Font></b>'+
	    		   '</td></tr>'+
	    		   '</table>';
				 
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:"Recursos",
			           content: contenido,			           
			           id:id
			       }));
						   
		   
				   if(cuartaSesionObj.recursos[0].indRecurso == '1'){
					   new ValidationTextBox({
			            	  name:'montoRecursos',
			                  id:'montoRecursos',
			                  promptMessage:"Capture s\u00f3lo n\u00fameros",
			                  regExp: constants.NUMBER_VALID,
			                  trim:"true",  
			                  maxLength:"9",
			                  value:cuartaSesionObj.recursos[0].monto
			               }, 'montoRecursos').on ('Blur', function(){
			            	   
			            	   var monto= registry.byId("montoRecursos").get('value');
			    		       
			            	   if(monto!=''){
			            		
				         	       if(monto==0){
				         	    	   jsUtils.cstmAlert('Favor de registrar una cantidad mayor a 0.');
				         	    	   registry.byId('montoRecursos').set('value', '');
				         	    	   registry.byId('montoStrRecursos').set('value','');
				         	    	   return;
				         	       }
				                   
					           		registry.byId('montoStrRecursos').set('value', 
					   				   jsUtils.covertirNumLetras(registry.byId("montoRecursos").get('value')));
			            	  }
			           });
					   
					   new ValidationTextBox({
			            	  name:'montoStrRecursos',
			                  id:'montoStrRecursos',
			                  regExp:constants.NoNUMBER_VALID,
			                  trim:"true",    
			                  maxLength:"200",
			                  value:cuartaSesionObj.recursos[0].montoStr,
			                  readOnly: "true"
			               }, 'montoStrRecursos');
			
					   new ValidationTextBox({
			         	  name:'uso',
			               id:'uso',
			               promptMessage:"Capture el uso de los recursos",
			               trim:"true",    
			               maxLength:"200",
			               value:cuartaSesionObj.recursos[0].uso
			            }, 'uso');
					   
					   new RadioButton({
				           checked: false,
				           value: 1,
				           name: "indRecurso"
				       }, "indRecurso1").on ('change', function(){ 
				    	   if(registry.byId('indRecurso1').checked){
				    		   
					    		 registry.byId('montoRecursos').set('required', true);
					  			 registry.byId('montoStrRecursos').set ('required',true);
					  			 registry.byId('uso').set ('required',true);
					  			 
					  			dom.byId('montoUso').style.display='block';
					  			
				           }else{
				        	   	 registry.byId('montoRecursos').set('required', false);
					  			 registry.byId('montoStrRecursos').set ('required',false);
					  			 registry.byId('uso').set ('required',false);	
					  			 	
					  			 registry.byId('montoRecursos').set('value','');
					  			 registry.byId('montoStrRecursos').set('value','');
					  			 registry.byId('uso').set('value','');
					  			 
					  			dom.byId('montoUso').style.display='none';
				        	    
				           } 
				       });
					   
					   new RadioButton({
				           checked: true,
				           value: 0,
				           name: "indRecurso"
				       }, "indRecurso0");
					   
					   if (cuartaSesionObj.recursos[0].indTransparenta == true){
						   	registry.byId('indRecurso1').set('checked',true);
						   	}
					   if (cuartaSesionObj.recursos[0].indTransparenta == false){
						   	registry.byId('indRecurso0').set('checked',true);
						   	}
	
				   }
		  
				   registry.byId('pestanias').selectChild(registry.byId(id),true);
			}
			
		}else{
			if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			}
		}
	}
	
	//Función Planeacion
	function _planeacion(crea){
		
		 var id="planeacionPane"; 
		   if(crea){
			   
			   if(cuartaSesionObj.planeacion==null){
					 jsUtils.cstmAlert('La actividad seleccionada no puede ser registrada, ya que no registr\u00F3 planeaci\u00F3n en la primera sesi\u00F3n.');
					 
					 registry.byId('nomActividad').updateOption({
							value: 66,
							selected: false
						});
					 return;
				 }
			   
			   if(!registry.byId(id)){
				   
				   var contenido= '<table border="0" align="lefth" >'+ 
					   '<tr><td>'+ 
					   '	<span align="lefth" class="sub">' +
					   '	** \u00BFConoce el consejo escolar si se cumpli\u00f3 con la planeaci\u00f3n anual de su centro escolar?'+ 
					   '	</span>'+ 
					   '</td></tr>'+ 
					   '<tr><td> ';
		
				   if(cuartaSesionObj.planeacion.indPlaneacion){
					   contenido +=  '	  * Proyecto: ' + cuartaSesionObj.planeacion.nomPlaneacion + (cuartaSesionObj.planeacion.nomOtroPlaneacion?
							   ': ' + cuartaSesionObj.planeacion.nomOtroPlaneacion:'') +
					   '&nbsp;&nbsp;&nbsp; <input id="indCumplioPlaneacionSi"/><label for="indCumplioPlaneacionSi">Si</label>'+ 
					   '	<input id="indCumplioPlaneacionNo"/><label for="indCumplioPlaneacionNo">No</label>';
	
				   }else{
					   contenido +=  'Consejo Escolar no conoce la planeaci\u00F3n anual de su centro escolar para este ciclo.';
				   }
				   
				   contenido +=  '</td></tr>'+ 
					   '<tr><td>'+
		    		   '	<br/><br/><br/> <b><font size=1> ** Informaci\u00F3n recabada en la primera sesi\u00F3n. </Font></b>'+
		    		   '</td></tr>'+
		    		   '</table>';
	
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:"Planeaci\u00f3n",
			           content: contenido,			           
			           id:id
			       }));				   
			
				   if(cuartaSesionObj.planeacion.indPlaneacion){
					   new RadioButton({
				            checked: false,
				            value: true,
				            name: "indCumplioPlaneacion"
				        }, "indCumplioPlaneacionSi");
					   
					   new RadioButton({
				            checked: true,
				            value: false,
				            name: "indCumplioPlaneacion"
				        }, "indCumplioPlaneacionNo");
					   
					   if (cuartaSesionObj.planeacion.indCumplioPlaneacion=='1'){
						   registry.byId('indCumplioPlaneacionSi').set('checked',true);
					   }
				   }
				   
				   registry.byId('pestanias').selectChild(registry.byId(id),true);
			   }
			 
		   }else{
				if(registry.byId(id)){
					   registry.byId('pestanias').closeChild(registry.byId(id));
				}
		   }
	}
	
   //Función programas
   function _programas(crea){
	  
	   if(crea){
		   
		   //Ningún programa fue capturado en la tercera sesión
		   if(!cuartaSesionObj.programas[0].cPrograma && !cuartaSesionObj.programas[1].cPrograma &&
				   !cuartaSesionObj.programas[2].cPrograma && !cuartaSesionObj.programas[3].cPrograma){
					 jsUtils.cstmAlert('La actividad seleccionada no puede ser registrada, ya que no registr\u00F3 programas en la tercera sesi\u00F3n.');
					 
					 registry.byId('nomActividad').updateOption({
							value: 61,
							selected: false
						});
					 return;
			 }
		   
		   if(!registry.byId(listProgramas[0].id)){
			   var k=0;
			   
			   // Se obtienen las diferencias del catálogo.
			   selectDiferenciasPgr(1);
			   selectDiferenciasPgr(0);
			   
				// Por cada tipo de programa se crea un GRID.   
			   for(var i in listProgramas ){
				   
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:listProgramas[i].title,
			           id:listProgramas[i].id
			       }));
				   
				   registry.byId('pestanias').selectChild(registry.byId(listProgramas[i].id),true);
				   
				   if(cuartaSesionObj.programas[k].cPrograma){
					   
					   dom.byId(listProgramas[i].id).innerHTML='<table border="0" align="left" width= "900px">'+
					   '<tr>' +
				   	   '	<td><input id="'+listProgramas[i].tpoPrograma+'Grid"/></td>'+
					   '</tr>'+
					   '<tr>' +
				   	   	'<td><input id="'+i+'e_'+listProgramas[i].tpoPrograma+'"/>'+
					   '</tr>'+
					   '</table>';
				      
					   var layout = [[	  { name: 'cPrograma', field: 'cPrograma', width: '20px', hidden:true},
					                  	  { name: 'indRecurso', field: 'indRecurso', width: '100px',hidden:true},
					                  	  { name: 'monto', field: 'monto', width: '20px', hidden:true},
					                  	  { name: 'montoStr', field: 'montoStr', width: '20px',hidden:true},
					                  	  { name: 'actividades', field: 'actividades', width: '20px', hidden:true},
					                  	  { name: 'objetivo', field: 'objetivo', width: '20px',hidden:true},
						    		      { name: '** Programa', field: 'nomPrograma',  width:'100px'},
						    		      { name: 'Estatus del recurso', field: 'indRecursoStr', width: '100px'},					    		      
						    		      { name: 'Ciclo escolar de ingreso', field: 'anioIngreso', width: '90px'},
						    		      { name: 'Monto recabado', field: 'montoFinal', width: '90px'},
						    		      { name: 'Monto en letra', field: 'montoFinalStr', width: '90px'},
						    		      { name: 'cDiferencia', field: 'cDiferencia', width: '20px',hidden:true},
						    		      { name: 'Diferencia', field: 'otraDiferencia', width: '120px'},
						    		      { name: 'Actividades realizadas', field: 'actividadesFin', width: '180px'},
						    		      { name: 'Metas y objetivos logrados', field: 'objetivoFin', width: '180px'}]];
					   
					   if(listProgramas[i].id == "proyOSCPane"){
						   layout[0].push({name: 'Nombre de la organizaci\u00F3n de la sociedad civil que apoya',
							   			   field: 'nomBenefactor', width: '100px'});
					   }
					  
					   new DataGrid({
					        id: listProgramas[i].tpoPrograma+'Grid',
					        structure: layout,
					        rowSelector: '10px',
					        height: '300px',
							width: '800px'},
					        listProgramas[i].tpoPrograma+'Grid').startup();
					 		
					   var data = {
							      identifier: "cPrograma",
							      items: []
							    };
					
					   var tpoPrograma=cuartaSesionObj.programas[k].tpoPrograma;
					   while(cuartaSesionObj.programas[k]){
						   
						   if(listProgramas[i].tpoPrograma!=tpoPrograma
								   || !cuartaSesionObj.programas[k].cPrograma){
							 	break;
						   }
						 
						   var indRecursoStr="";
						   var nomPrograma="";
						   switch(cuartaSesionObj.programas[k].indRecurso){
								case '0': indRecursoStr="El consejo no conoce el monto del recurso";
								break;
								case '1':indRecursoStr="El consejo conoce el monto del recurso pero no lo maneja";
								break;
								case '2': indRecursoStr="El consejo conoce el monto del recurso y lo maneja";
								break;
						   }
						   
						   if(cuartaSesionObj.programas[k].nomPrograma=='Otro'){
							   nomPrograma=cuartaSesionObj.programas[k].nomPrograma+': '+ cuartaSesionObj.programas[k].nomOtroPrograma;
						   }
						   else{
							   nomPrograma=cuartaSesionObj.programas[k].nomPrograma;
						   }
							  
						   var progObj = {
								    cPrograma: cuartaSesionObj.programas[k].cPrograma, 
						   			nomPrograma: nomPrograma, 
								    indRecurso: cuartaSesionObj.programas[k].indRecurso, 
								    indRecursoStr:indRecursoStr,
								    monto: cuartaSesionObj.programas[k].monto, 
								    montoStr:cuartaSesionObj.programas[k].montoStr,
								    actividades: cuartaSesionObj.programas[k].actividades, 
								    objetivo:cuartaSesionObj.programas[k].objetivo,
								    anioIngreso: cuartaSesionObj.programas[k].anioIngreso,
								    montoFinal:cuartaSesionObj.programas[k].montoFinal,
								    montoFinalStr:cuartaSesionObj.programas[k].montoFinalStr,									    
								    actividadesFin:cuartaSesionObj.programas[k].actividadesFin,
								    objetivoFin:cuartaSesionObj.programas[k].objetivoFin,
								    cDiferencia:cuartaSesionObj.programas[k].cDiferencia, 
								    otraDiferencia:cuartaSesionObj.programas[k].otraDiferencia
								    };
						   
						   if(listProgramas[i].id=='proyOSCPane'){
							   lang.mixin(progObj, {nomBenefactor: cuartaSesionObj.programas[k].nomBenefactor});
								  
							}
						   
						  data.items.push(progObj); 
						  
						  k++;
						  if(cuartaSesionObj.programas[k]){
							  tpoPrograma=cuartaSesionObj.programas[k].tpoPrograma;
						  }
						   
					  }// fin while
					
					   var newStore = new ItemFileWriteStore({data: data}); 
					   registry.byId(listProgramas[i].tpoPrograma+'Grid').setStore(newStore);
				
		
					   //Botón para editar cada uno de los registros del grid.
					   jsUtils.createTag('div',listProgramas[i].tpoPrograma+'Editar',listProgramas[i].id);
					   new Button({
							label : " Editar ",
							id:i+'e_'+listProgramas[i].tpoPrograma,
							onClick : function() {
								prId=this.id;
								pos=prId.substring(0,1);
								prId=prId.substring(prId.lastIndexOf("e_")+2);
								var items = registry.byId(prId+'Grid').selection.getSelected();
								if(items.length==1){
					                 dojo.forEach(items, function(selectedItem){
					                     if(selectedItem !== null){
					                    	
					                    	var itemToEdit={selectedItem:selectedItem,
					                    		cPrograma: registry.byId(prId+'Grid').store.getValue(selectedItem,'cPrograma'), 
									   			nomPrograma: registry.byId(prId+'Grid').store.getValue(selectedItem,'nomPrograma'), 
											    indRecurso: registry.byId(prId+'Grid').store.getValue(selectedItem,'indRecurso'),
											    indRecursoStr: registry.byId(prId+'Grid').store.getValue(selectedItem,'indRecursoStr'),
											    actividades: registry.byId(prId+'Grid').store.getValue(selectedItem,'actividades'),
											    objetivo: registry.byId(prId+'Grid').store.getValue(selectedItem,'objetivo'),
											    anioIngreso: registry.byId(prId+'Grid').store.getValue(selectedItem,'anioIngreso'),
											    monto: registry.byId(prId+'Grid').store.getValue(selectedItem,'monto'),
											    montoStr: registry.byId(prId+'Grid').store.getValue(selectedItem,'montoStr'),
											    actividadesFin: registry.byId(prId+'Grid').store.getValue(selectedItem,'actividadesFin'),
											    montoFinal: registry.byId(prId+'Grid').store.getValue(selectedItem,'montoFinal'),
											    montoFinalStr: registry.byId(prId+'Grid').store.getValue(selectedItem,'montoFinalStr'),
											    objetivoFin: registry.byId(prId+'Grid').store.getValue(selectedItem,'objetivoFin'),
											    cDiferencia: registry.byId(prId+'Grid').store.getValue(selectedItem,'cDiferencia'),
											    otraDiferencia: registry.byId(prId+'Grid').store.getValue(selectedItem,'otraDiferencia')
											    };
					                    	
					                    	if(listProgramas[i].id=='proyOSCPane'){
					                    		lang.mixin(itemToEdit, {nomBenefactor: registry.byId(prId+'Grid')
					                    			.store.getValue(selectedItem,'nomBenefactor')});
					                    	}
					                    	programaDetail(prId,pos,itemToEdit);
					                     }
					                 }); 
					             }else{
					            	 jsUtils.cstmAlert('Debe seleccionar solo un registro.');
					             }
								
							}
						},i+'e_'+listProgramas[i].tpoPrograma);   
					   
				   }// fin del if que valida si cPrograma es diferente de null
				   else{
					   	 jsUtils.createTag('div','mensaje'+ listProgramas[i].id,listProgramas[i].id);
			    		 dom.byId('mensaje' + listProgramas[i].id).innerHTML='<br><br><table border="0" align="center">'+
			    		   '<tr><td>'+
			    		   '	<b><p  align="center">No existen programas seleccionados en la tercera sesi\u00F3n.</p></b>'+
			    		   '</td></tr>'+
			    		   '</table>';
			    		 k++;
				   }
				   
				   jsUtils.createTag('div','mensjInf'+ listProgramas[i].tpoPrograma,listProgramas[i].id);
		    		dom.byId('mensjInf'+ listProgramas[i].tpoPrograma).innerHTML=' <br><br><table border="0">'+
		    		   '<table><tr><td>'+
		    		   '	<b><font size=1> ** Informaci\u00F3n recabada en la tercera sesi\u00F3n. </Font></b>'+
		    		   '</td></tr>'+
		    		   '</table>';
	
			   }//Fin del for
			 
		   } // fin del registry 
	   }// fin de crea
	   else{
		   for(var i in listProgramas ){
			   if(registry.byId(listProgramas[i].id))
				   registry.byId('pestanias').closeChild(registry.byId(listProgramas[i].id)); 
		   } 
	   }
	}// Fin de función de programas.
   
   
   //Función Mejoras		
   function _mejoras(crea){
	   var id="mejorasPane"; 
	   if(crea){
		   
		   if(cuartaSesionObj.mejoras.length==0){
				 jsUtils.cstmAlert('La actividad seleccionada no puede ser registrada, ya que no registr\u00F3 mejoras en la segunda asamblea.');
				 
				 registry.byId('nomActividad').updateOption({
						value: 64,
						selected: false
					});
				 return;
			 }
		   
		   if(!registry.byId(id)){
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Mejoras",
		           id:id
		       }));
			   
			   //registry.byId('pestanias').selectChild(registry.byId(id),true);
			  
			   dom.byId(id).innerHTML='<table border="0" align="left" width= "900px">'+
			   '<tr>' +
		   	   '	<td><input id="'+id+'Grid"/></td>'+
			   '</tr>'+
			   '<tr>' +
		   	   	'<td><input id="e_'+id +'"/></td>'+
			   '</tr>'+
			   '</table>';
			   
			   
			   var layout = [[	  { name: 'cMejoraCct', field: 'cMejoraCct', width: '20px', hidden:true},
				    		      { name: '** Mejora', field: 'nomMejoraCct',  width:'150px'},					    		      
				    		      { name: 'indRecurso', field: 'indRecurso', width: '100px',hidden:true},
				    		      { name: '* Ciclo escolar de inicio de proyecto', field: 'periodoInicio', width: '90px'},
				    		      { name: '* Estatus del recurso', field: 'indRecursoStr', width: '100px'},
			                  	  { name: 'Monto final recabado', field: 'montoMejora', width: '80px'},
			                  	  { name: 'Monto en letra', field: 'montoStrMejora', width: '100px'},
				    		      { name: 'Actividades', field: 'actividades', width: '20px', hidden:true},
				    		      { name: 'Metas y objetivos', field: 'metasObjetivos', width: '20px', hidden:true},
				    		      { name: 'Actividades realizadas', field: 'actividadesFin', width: '200px'},
				    		      { name: 'Metas y objetivos logrados', field: 'objetivoFin', width: '200px'}]];

			   new DataGrid({
			        id: id+'Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '800px'},
			        id+'Grid').startup();
				
				
			   var data = {
					      identifier: "cMejoraCct",
					      items: []
					    };
			
			   for(var k in cuartaSesionObj.mejoras){
				   
					   var indRecursoStr="";
					   var nomMejora="";
					   switch(cuartaSesionObj.mejoras[k].indRecurso){
							case '0': indRecursoStr="El consejo no conoce el monto del recurso";
							break;
							case '1':indRecursoStr="El consejo conoce el monto del recurso pero no lo maneja";
							break;
							case '2': indRecursoStr="El consejo conoce el monto del recurso y lo maneja";
							break;
					   }
					   
					   if(cuartaSesionObj.mejoras[k].nomMejoraCct=='Otra'){
						   nomMejora=cuartaSesionObj.mejoras[k].nomMejoraCct + ': ' +cuartaSesionObj.mejoras[k].nomOtraMejora;
					  }
					   else{
						   nomMejora=cuartaSesionObj.mejoras[k].nomMejoraCct;
					   }
					  
					  data.items.push({
						  	cMejoraCct: cuartaSesionObj.mejoras[k].cMejoraCct, 
			        		nomMejoraCct: nomMejora, 
			        		indRecurso: cuartaSesionObj.mejoras[k].indRecurso, 
			        		periodoInicio: cuartaSesionObj.mejoras[k].periodoInicio,
			        		indRecursoStr:indRecursoStr, 
			        		montoMejora: cuartaSesionObj.mejoras[k].monto,
						    montoStrMejora: cuartaSesionObj.mejoras[k].montoStr,
						    actividades: cuartaSesionObj.mejoras[k].actividades,
						    metasObjetivos: cuartaSesionObj.mejoras[k].metasObjetivos,
						    actividadesFin: cuartaSesionObj.mejoras[k].actividadesFin,
						    objetivoFin: cuartaSesionObj.mejoras[k].objetivoFin
					  });
			   }
	
			   var newStore = new ItemFileWriteStore({data: data});
			   registry.byId(id+'Grid').setStore(newStore);
				
			   new Button({
					label : " Editar ",
					id:'e_'+id,
					onClick : function() {
						var items = registry.byId(id+'Grid').selection.getSelected();
						if(items.length==1){
			                 dojo.forEach(items, function(selectedItem){
			                     if(selectedItem !== null){
			                    	
			                    	var itemToEdit={selectedItem:selectedItem,
			                    		cMejoraCct: registry.byId(id+'Grid').store.getValue(selectedItem,'cMejoraCct'), 
			                    		nomMejoraCct: registry.byId(id+'Grid').store.getValue(selectedItem,'nomMejoraCct'), 
			                    		indRecurso: registry.byId(id+'Grid').store.getValue(selectedItem,'indRecurso'), 
			                    		indRecursoStr: registry.byId(id+'Grid').store.getValue(selectedItem,'indRecursoStr'),
			                    		periodoInicio: registry.byId(id+'Grid').store.getValue(selectedItem,'periodoInicio'),
									    montoMejora: registry.byId(id+'Grid').store.getValue(selectedItem,'montoMejora'),
									    montoStrMejora: registry.byId(id+'Grid').store.getValue(selectedItem,'montoStrMejora'),
									    actividades: registry.byId(id+'Grid').store.getValue(selectedItem,'actividades'),
									    metasObjetivos: registry.byId(id+'Grid').store.getValue(selectedItem,'metasObjetivos'),
									    actividadesFin: registry.byId(id+'Grid').store.getValue(selectedItem,'actividadesFin'),
									    objetivoFin: registry.byId(id+'Grid').store.getValue(selectedItem,'objetivoFin')};
			                    	
			                    	mejoraDetail(id,itemToEdit);
			                    	
			                    	
			                     }
			                 }); 
			             }else{
			            	 jsUtils.cstmAlert('Debe seleccionar solo un registro.');
			             }
					}
				},'e_'+id); 
			   
			   jsUtils.createTag('div','mensjInf',id);
	    		dom.byId('mensjInf').innerHTML=' <br><br><table border="0">'+
	    		   '<table><tr><td>'+
	    		   '	<b><font size=1> ** Informaci\u00F3n recabada en la segunda asamblea. </Font></b>'+
	    		   '</td></tr>'+
	    		   '</table>';

		   }
	   }else{
		   if(registry.byId(id)){
			   registry.byId('pestanias').closeChild(registry.byId(id));
		   }   
		}
   }
   
   // Función Eventos
   function _eventos(crea){
	   var id="eventosPane"; 
	   if(crea){
		   
		   if(cuartaSesionObj.eventos.length==0){
				 jsUtils.cstmAlert('La actividad seleccionada no puede ser registrada, ya que no registr\u00F3 eventos en la tercera sesi\u00F3n.');
				 
				 registry.byId('nomActividad').updateOption({
						value: 65,
						selected: false
					});
				 return;
			 }
		   
		   if(!registry.byId(id)){
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Eventos",
		           id:id
		       }));
			
			   registry.byId('pestanias').selectChild(registry.byId(id),true);
			   
			   dom.byId(id).innerHTML='<table border="0" align="left" width= "900px">'+
			   '<tr>' +
		   	   '	<td><input id="'+id+'Grid"/></td>'+
			   '</tr>'+
			   '<tr>' +
		   	   	'<td><input id="e_'+id+'"/></td>'+
			   '</tr>'+
			   '</table>';
			   
			   var layout = [[	  { name: 'cEvento', field: 'cEvento', width: '5px', hidden:true},
				    		      { name: 'nomOtroEvento', field: 'nomOtroEvento', width: '5px', hidden:true},	
				    		      { name: '** Evento', field: 'nomEvento',  width:'150px'},
				    		      { name: 'indRecurso', field: 'indRecurso', width: '100px',hidden:true},
				    		      { name: 'Ciclo escolar de inicio de proyecto', field: 'periodoRealizado', width: '90px'},
				    		      { name: '* Estatus del recurso', field: 'indRecursoStr', width: '100px'},
			                  	  { name: 'Monto final recabado', field: 'montoEvento', width: '80px'},
			                  	  { name: 'Monto en letra', field: 'montoStrEvento', width: '100px'},
				    		      { name: 'Actividades', field: 'actividades', width: '20px', hidden:true},
				    		      { name: 'Metas y objetivos', field: 'objetivo', width: '20px', hidden:true},
				    		      { name: 'Actividades realizadas', field: 'actividadesFin', width: '200px'},
				    		      { name: 'Metas y objetivos logrados', field: 'objetivoFin', width: '200px'}]];
			   new DataGrid({
			        id: id+'Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '800px'},
			        id+'Grid').startup();
			  
			   var data = {
					      identifier: "cEvento",
					      items: []
					    };
			   
			   for(var k in cuartaSesionObj.eventos){
				   
				   	   var indRecursoStr="";
					   switch(cuartaSesionObj.eventos[k].indRecurso){
							case '0': indRecursoStr="El consejo no conoce el monto del recurso";
							break;
							case '1':indRecursoStr="El consejo conoce el monto del recurso pero no lo maneja";
							break;
							case '2': indRecursoStr="El consejo conoce el monto del recurso y lo maneja";
							break;
					   }
					  data.items.push({
                    		cEvento: cuartaSesionObj.eventos[k].cEvento,
                    		nomEvento: cuartaSesionObj.eventos[k].nomEvento,
                    		nomOtroEvento: cuartaSesionObj.eventos[k].nomOtroEvento, 
                    		indRecurso: cuartaSesionObj.eventos[k].indRecurso, 
                    		indRecursoStr:indRecursoStr, 
                    		periodoRealizado: cuartaSesionObj.eventos[k].periodoRealizado,
                    		montoEvento: cuartaSesionObj.eventos[k].monto,
						    montoStrEvento: cuartaSesionObj.eventos[k].montoStr,
						    actividades: cuartaSesionObj.eventos[k].actividades,
						    objetivo: cuartaSesionObj.eventos[k].objetivo,
						    actividadesFin: cuartaSesionObj.eventos[k].actividadesFin,
						    objetivoFin: cuartaSesionObj.eventos[k].objetivoFin
					  });
			   }
			   
			   var newStore = new ItemFileWriteStore({data: data});
			   registry.byId(id+'Grid').setStore(newStore);
				
			   jsUtils.createTag('div',id+'Editar',id);
			   new Button({
					label : " Editar ",
					id:'e_'+id,
					onClick : function() {
						var items = registry.byId(id+'Grid').selection.getSelected();
						if(items.length==1){
			                 dojo.forEach(items, function(selectedItem){
			                     if(selectedItem !== null){
			                    	
			                    	var itemToEdit={selectedItem:selectedItem,
			                    		cEvento: registry.byId(id+'Grid').store.getValue(selectedItem,'cEvento'), 
			                    		nomEvento: registry.byId(id+'Grid').store.getValue(selectedItem,'nomEvento'),
			                    		nomOtroEvento: registry.byId(id+'Grid').store.getValue(selectedItem,'nomOtroEvento'), 
			                    		indRecurso: registry.byId(id+'Grid').store.getValue(selectedItem,'indRecurso'), 
			                    		indRecursoStr: registry.byId(id+'Grid').store.getValue(selectedItem,'indRecursoStr'),
			                    		periodoRealizado:registry.byId(id+'Grid').store.getValue(selectedItem,'periodoRealizado'),
									    montoEvento: registry.byId(id+'Grid').store.getValue(selectedItem,'montoEvento'),
									    montoStrEvento: registry.byId(id+'Grid').store.getValue(selectedItem,'montoStrEvento'),
									    actividades: registry.byId(id+'Grid').store.getValue(selectedItem,'actividades'),
									    objetivo: registry.byId(id+'Grid').store.getValue(selectedItem,'objetivo'),
									    actividadesFin: registry.byId(id+'Grid').store.getValue(selectedItem,'actividadesFin'),
									    objetivoFin: registry.byId(id+'Grid').store.getValue(selectedItem,'objetivoFin')};
			                    	
			                    	eventoDetail(id,itemToEdit);
			                    	
			                     }
			                 }); 
			             }else{
			            	 jsUtils.cstmAlert('Debe seleccionar solo un registro.');
			             }
					}
				},'e_'+id); 
			   
			   jsUtils.createTag('div','infMensj',id);
	    		dom.byId('infMensj').innerHTML=' <br><br><table border="0">'+
	    		   '<table><tr><td>'+
	    		   '	<b><font size=1> ** Informaci\u00F3n recabada en la tercera sesi\u00F3n. </Font></b>'+
	    		   '</td></tr>'+
	    		   '</table>';
		   }
	   }else{
		   if(registry.byId(id)){
			   registry.byId('pestanias').closeChild(registry.byId(id));
		   }   
		}
   }
   
   
 //Función para mostrar el formulario con los datos del registro seleccionado de mejoras.
   function mejoraDetail(id,itemToEdit){
	  
	   new Dialog({id:'dDetail',title:'Proyecto de mejora', content :'<div id="dcDetail"/>'}).show();
	   registry.byId('dDetail').on('hide',function(){
		   registry.byId('dDetail').destroyRecursive(false);
	   });
	   registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	   registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	   
	   jsUtils.createTag('div','evCnt','dcDetail');
	   dom.byId('evCnt').innerHTML='<table border="0" align="lefth" >'+
	   '<tr><td>'+
	   '	<b>Mejora: </b>'+ itemToEdit.nomMejoraCct + '<br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>Actividades: </b>'+ itemToEdit.actividades + '<br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>Metas y objetivos: </b>'+ itemToEdit.metasObjetivos + '<br/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>Ciclo escolar de inicio del proyecto: </b><input id="periodoInicio"/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>* Estatus del recurso: </b> <br/><input id="indRecurso2Mejora"/><label for="indRecurso2Mejora">El consejo conoce el monto del recurso y lo maneja</label><br/>'+
	   '	<input id="indRecurso1Mejora"/><label for="indRecurso1Mejora">El consejo conoce el monto del recurso pero no lo maneja</label><br/>'+
	   '	<input id="indRecurso0Mejora"/><label for="indRecurso0Mejora">El consejo no conoce el monto del recurso</label><br/>'+
	   '</td></tr>'+
	   '<tr id="trMonto" style="display:none"><td> '+
	   '	 <b>* Monto final recabado</b><br>N\u00FAmero: <input id="montoMejora"/> Letra: <input id="montoStrMejora"/><br/>'+
	   '<input id="montoCorrectoMejo"/><label for="montoCorrectoMejo">\u00BFEl monto capturado es correcto?</label>'+
	   '</td></tr><br/>'+
	   '<tr><td><br/><br/>'+
	   '	<b>Actividades realizadas:</b><br/>'+
	   '</td></tr>  '+
	   '<tr><td>'+
	   '<input id="actividadesNuevas"/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>Metas y objetivos logrados:</b><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '<input id="objetivoNuevo"/><br/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '<input id="prBtnAceptarMejoras"/> <br/>'+
	   '</td></tr>'+
	   '</table>';
	   
	   new ValidationTextBox({
           promptMessage:"aaaa-aaaa",
           id:"periodoInicio",
           regExp: constants.CICLO_ESCOLAR_VALID,
           value:itemToEdit.periodoInicio, 
           trim:"true",  
           maxLength:"9",
           required: "true",
           style:"display:block; width:80px"
        }, "periodoInicio");
	  
	   new RadioButton({
           checked: false,
           value: 2,
           name: "indRecurso"
       }, "indRecurso2Mejora");
	   
	  new RadioButton({
           checked: false,
           value: 1,
           name: "indRecurso"
       }, "indRecurso1Mejora");
	   
	   new RadioButton({
           checked: true,
           value: 0,
           name: "indRecurso"
       }, "indRecurso0Mejora").on ('change', function(){ 
    	   if(registry.byId('indRecurso0Mejora').checked){
	    		 registry.byId('montoMejora').set('required', false);
	  			 registry.byId('montoStrMejora').set ('required',false);
	  			 dom.byId('trMonto').style.display='none';
	  			 registry.byId('montoMejora').set('value','');
	  			 registry.byId('montoStrMejora').set('value','');
           }else{
        	   	 registry.byId('montoMejora').set('required', true);
    			 registry.byId('montoStrMejora').set ('required',true);
    			 dom.byId('trMonto').style.display='block';
    			 
           } 
       });
	   
	   new ValidationTextBox({
           promptMessage:"Capture solo n\u00FAmeros",
           id:'montoMejora',
           regExp: constants.NUMBER_VALID,
           value:itemToEdit.montoMejora, 
           trim:"true",  
           maxLength:"9",
           //required: "true",
           style:"width:80px"
        }, 'montoMejora').on ('Blur', function(){
        	
           var monto= registry.byId("montoMejora").get('value');
        	
           if(monto!=''){
		       
	 	       if(monto==0){
	 	    	   jsUtils.cstmAlert('Favor de registrar una cantidad mayor a 0.');
	 	    	   registry.byId('montoMejora').set('value', '');
	 	    	   registry.byId('montoStrMejora').set('value','');
	 	    	   return;
	 	       }
	        
	 	       registry.byId('montoStrMejora').set('value', 
	 	    		   jsUtils.covertirNumLetras(registry.byId("montoMejora").get('value')));
           }
	        
        });
	   
	   new ValidationTextBox({
           value:itemToEdit.montoStrMejora, 
           regExp:constants.NoNUMBER_VALID,
           id:'montoStrMejora',
           trim:"true",    
           maxLength:"200",
           readOnly: true
        }, 'montoStrMejora');
	   
	   new CheckBox({
	        name: "montoCorrectoMejo",
	        value: "montoCorrectoMejo",
	        checked: false
	    }, 'montoCorrectoMejo');
	   
	   if (itemToEdit.indRecurso==1){registry.byId('indRecurso1Mejora').set('checked',true);}
	   if (itemToEdit.indRecurso==0){registry.byId('indRecurso0Mejora').set('checked',true);}
	   if (itemToEdit.indRecurso==2){registry.byId('indRecurso2Mejora').set('checked',true);}
	   
	   
	   //Componentes para las actividades
	  
	   new Textarea({ 
           id:'actividadesNuevas',
           trim:"true",    
           maxLength:"200",
           style:"width:400px;",
           value: itemToEdit.actividadesFin
        }, 'actividadesNuevas');
	   
	   //Componentes para los objetivos
	   
	   new Textarea({ 
           id:'objetivoNuevo',
           trim:"true",    
           maxLength:"200",
           style : "width:400px;",
           value: itemToEdit.objetivoFin
        }, 'objetivoNuevo');
	   
	   //Botón Aceptar en el cual se validan los datos del formulario.
	   //jsUtils.createTag('div','prBtnAceptar','dcDetail');
	   new Button({
			label : " Aceptar ",
			id: "prBtnAceptarMejoras",
			onClick : function() {
					
					var form = registry.byId('dDetail');
					if ( form.validate() == false){  
						jsUtils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					
					var ciclo_escolar=registry.byId('periodoInicio').get('value');
					var ciclo=jsUtils.cicloFormat(ciclo_escolar);
					if(ciclo!=1){
						jsUtils.cstmAlert('Favor de registrar un ciclo escolar v\u00E1lido');
						return false;
					}
					
					if(!registry.byId('montoCorrectoMejo').checked && (registry.byId('indRecurso1Mejora').checked
							|| registry.byId('indRecurso2Mejora').checked)){
						jsUtils.cstmAlert('Favor de indicar si el monto capturado es correcto');
						return false;
					}
					
					//Se obtienen los valores de los campos para guardarlos.
				   var grid=registry.byId(id+'Grid');
				   var indRecurso=0;
				   var indRecursoStr="El consejo no conoce el monto del recurso";
				   if(registry.byId('indRecurso2Mejora').checked==true){
					   indRecurso=2;
					   indRecursoStr="El consejo conoce el monto del recurso y lo maneja";
				   }else if(registry.byId('indRecurso1Mejora').checked==true){
					   indRecurso=1;
					   indRecursoStr="El consejo conoce el monto del recurso pero no lo maneja";
				   }else if(registry.byId('indRecurso0Mejora').checked==true){
					   indRecurso=0;
					   indRecursoStr="El consejo no conoce el monto del recurso";
				   }
				  
					var index = grid.selection.selectedIndex;
					var item = grid.getItem(index);
					
					grid.store.setValue(item, 'indRecurso', indRecurso);
					grid.store.setValue(item, 'indRecursoStr',indRecursoStr);
					grid.store.setValue(item, 'periodoInicio',registry.byId('periodoInicio').get('value'));
					grid.store.setValue(item, 'montoMejora',registry.byId('montoMejora').get('value'));
					grid.store.setValue(item, 'montoStrMejora',registry.byId('montoStrMejora').get('value'));
					grid.store.setValue(item, 'actividadesFin',registry.byId('actividadesNuevas').get('value'));
					grid.store.setValue(item, 'objetivoFin',registry.byId('objetivoNuevo').get('value'));
					
					grid.update();
				
				    registry.byId('dDetail').destroyRecursive(false);
			}
		},'prBtnAceptarMejoras');
   }
   
   
   //Función para mostrar el formulario con los datos del registro seleccionado de eventos.
   function eventoDetail(id,itemToEdit){
	  
	   new Dialog({id:'dDetail',title:'Evento', content :'<div id="dcDetail"/>'}).show();
	   registry.byId('dDetail').on('hide',function(){
		   registry.byId('dDetail').destroyRecursive(false);
	   });
	   registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	   registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	   
	   jsUtils.createTag('div','evCnt','dcDetail');
	   dom.byId('evCnt').innerHTML='<table border="0" align="lefth" >'+
	   '<tr><td>'+
	   '	<b>Evento: </b> '+ itemToEdit.nomEvento+ (itemToEdit.nomOtroEvento?(':'+ itemToEdit.nomOtroEvento):'')+'<br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>Ciclo escolar de inicio del proyecto:</b> '+itemToEdit.periodoRealizado +'<br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>Actividades: </b>'+ itemToEdit.actividades + '<br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>Metas y objetivos: </b>'+ itemToEdit.objetivo + '<br/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>* Estatus del recurso: </b> <br/><input id="indRecurso2Evento"/><label for="indRecurso2Evento">El consejo conoce el monto del recurso y lo maneja</label><br/>'+
	   '	<input id="indRecurso1Evento"/><label for="indRecurso1Evento">El consejo conoce el monto del recurso pero no lo maneja</label><br/>'+
	   '	<input id="indRecurso0Evento"/><label for="indRecurso0Evento">El consejo no conoce el monto del recurso</label><br/>'+
	   '</td></tr>'+
	   '<tr id="trMonto" style="display:none"><td> '+
	   '	 <b>* Monto final recabado</b><br>N\u00FAmero: <input id="montoEvento"/> Letra:<input id="montoStrEvento"/><br/>'+
	   '<input id="montoCorrectoEven"/><label for="montoCorrectoEven">\u00BFEl monto capturado es correcto?</label>'+
	   '</td></tr><br/>'+
	   '<tr><td><br/><br/>'+
	   '	<b>Actividades realizadas:</b><br/>'+
	   '</td></tr>  '+
	   '<tr><td>'+
	   '<input id="actividadesNuevas"/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>Metas y objetivos logrados:</b><br/> '+
	   '</td></tr>'+
	   '<tr><td>'+
	   '<input id="objetivoNuevo"/><br/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '<input id="prBtnAceptarEvento"/> <br/>'+
	   '</td></tr>'+
	   '</table>';
	   
	   new RadioButton({
           checked: false,
           value: 2,
           name: "indRecurso"
       }, "indRecurso2Evento");
	   
	  new RadioButton({
           checked: false,
           value: 1,
           name: "indRecurso"
       }, "indRecurso1Evento");
	   
	   new RadioButton({
           checked: true,
           value: 0,
           name: "indRecurso"
       }, "indRecurso0Evento").on ('change', function(){ 
    	   if(registry.byId('indRecurso0Evento').checked){
	    		 registry.byId('montoEvento').set('required', false);
	  			 registry.byId('montoStrEvento').set ('required',false);
	  			 dom.byId('trMonto').style.display='none';
	  			 registry.byId('montoEvento').set('value','');
	  			 registry.byId('montoStrEvento').set('value','');
           }else{
        	   	 registry.byId('montoEvento').set('required', true);
    			 registry.byId('montoStrEvento').set ('required',true);
    			 dom.byId('trMonto').style.display='block';
    			 
           } 
       });
	   
	   if (itemToEdit.indRecurso==1){registry.byId('indRecurso1Evento').set('checked',true);}
	   if (itemToEdit.indRecurso==0){registry.byId('indRecurso0Evento').set('checked',true);}
	   if (itemToEdit.indRecurso==2){registry.byId('indRecurso2Evento').set('checked',true);}
	   
	   
	   new ValidationTextBox({
           promptMessage:"Capture solo n\u00FAmeros",
           id:'montoEvento',
           regExp: constants.NUMBER_VALID,
           value:itemToEdit.montoEvento, 
           trim:"true",  
           maxLength:"9",
           //required: "true",
           style:"width:80px"
        }, 'montoEvento').on ('Blur', function(){
        	
           var monto= registry.byId("montoEvento").get('value');
           
           if(monto!=''){
		       
		       if(monto==0){
		    	   jsUtils.cstmAlert('Favor de registrar una cantidad mayor a 0.');
		    	   registry.byId('montoEvento').set('value', '');
		    	   registry.byId('montoStrEvento').set('value','');
		    	   return;
		       }
			      
	    		registry.byId('montoStrEvento').set('value', 
				   jsUtils.covertirNumLetras(registry.byId("montoEvento").get('value')));
           }
    
        });
	   
	   new ValidationTextBox({
           value:itemToEdit.montoStrEvento, 
           regExp:constants.NoNUMBER_VALID,
           id:'montoStrEvento',
           trim:"true",    
           maxLength:"200",
           readOnly: true
        }, 'montoStrEvento');
	   
	   new CheckBox({
	        name: "montoCorrectoEven",
	        value: "montoCorrectoEven",
	        checked: false
	    }, 'montoCorrectoEven');
	   
	   //Actividades
	  
	   new Textarea({
           promptMessage:"Capture las nuevas actividades", 
           id:'actividadesNuevas',
           trim:"true",    
           maxLength:"200",
           style:"width:400px;",
           value: itemToEdit.actividadesFin
        }, 'actividadesNuevas');
	   
	   //Objetivos
	   
	   new Textarea({
           promptMessage:"Capture los nuevos objetivos", 
           id:'objetivoNuevo',
           trim:"true",    
           maxLength:"200",
           style : "width:400px;",
           value: itemToEdit.objetivoFin
        }, 'objetivoNuevo');
	   
	   //Botón Aceptar en el cual se validan los datos del formulario.
	   //jsUtils.createTag('div','prBtnAceptar','dcDetail');
	   new Button({
			label : " Aceptar ",
			id: "prBtnAceptarEvento",
			onClick : function() {
					
					var form = registry.byId('dDetail');
					if ( form.validate() == false){  
						jsUtils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
									
					if(!registry.byId('montoCorrectoEven').checked && (registry.byId('indRecurso1Evento').checked
							|| registry.byId('indRecurso2Evento').checked)){
						jsUtils.cstmAlert('Favor de indicar si el monto capturado es correcto');
						return false;
					}
					
					//Se obtienen los valores de los campos para guardarlos.
				   var grid=registry.byId(id+'Grid');
				   var indRecurso=0;
				   var indRecursoStr="El consejo no conoce el monto del recurso";
				   if(registry.byId('indRecurso2Evento').checked==true){
					   indRecurso=2;
					   indRecursoStr="El consejo conoce el monto del recurso y lo maneja";
				   }else if(registry.byId('indRecurso1Evento').checked==true){
					   indRecurso=1;
					   indRecursoStr="El consejo conoce el monto del recurso pero no lo maneja";
				   }else if(registry.byId('indRecurso0Evento').checked==true){
					   indRecurso=0;
					   indRecursoStr="El consejo no conoce el monto del recurso";
				   }
				  
					var index = grid.selection.selectedIndex;
					var item = grid.getItem(index);
					
					grid.store.setValue(item, 'indRecurso', indRecurso);
					grid.store.setValue(item, 'indRecursoStr',indRecursoStr);
					grid.store.setValue(item, 'montoEvento',registry.byId('montoEvento').get('value'));
					grid.store.setValue(item, 'montoStrEvento',registry.byId('montoStrEvento').get('value'));
					grid.store.setValue(item, 'actividadesFin',registry.byId('actividadesNuevas').get('value'));
					grid.store.setValue(item, 'objetivoFin',registry.byId('objetivoNuevo').get('value'));
					
					grid.update();
				
				    registry.byId('dDetail').destroyRecursive(false);
			}
		},'prBtnAceptarEvento');
   }
   
     
   //Función para mostrar el formulario con los datos del registro seleccionado de programas.
   function programaDetail(prId,pos,itemToEdit){
	   
	   var banderaMonto=0;	 
	   var diferencia=0;
	 
	   var title = pos=='0'?'Programa federal':
				pos=='1'?'Programa estatal':
					pos=='2'?'Programa local':'Proyecto OSC';

	   new Dialog({id:'dDetail',title:title, content :'<div id="dcDetail"/>'}).show();
	   registry.byId('dDetail').on('hide',function(){
		   registry.byId('dDetail').destroyRecursive(false);
	   });
	   registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	   registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	   
	   jsUtils.createTag('div','prCnt','dcDetail');
	   dom.byId('prCnt').innerHTML='<table border="0" align="left">'+
	   '<tr><td colspan="2">'+
	   '	<b>Programa:</b> '+ itemToEdit.nomPrograma+'<br/>'+
	   '</td></tr>'+
	   '<tr id="trOrg" style="display:none"><td colspan="2">'+
	   '	<b>Nombre de la organizaci\u00F3n de la sociedad civil que apoya:</b> '+ itemToEdit.nomBenefactor+'<br/>'+
	   '</td></tr>'+
	   '<tr><td colspan="2">'+
	   '	<b>Estatus del recurso: </b>'+ itemToEdit.indRecursoStr+'<br/>'+
	   '</td></tr>'+
	   '<tr id="montoAsig"><td colspan="2"> '+
	   '	 <b>Monto asignado</b><br/>N\u00FAmero: '+itemToEdit.monto + ' &nbsp;&nbsp; Letra: '+ itemToEdit.montoStr +'<br/>'+
	   '</td></tr>'+
	   '<tr><td colspan="2">'+
	   '	<b>Ciclo escolar de ingreso al programa: </b>'+ itemToEdit.anioIngreso + '<br/>'+
	   '</td></tr>'+
	   '<tr><td colspan="2">'+
	   '	<b>Actividades: </b>'+ itemToEdit.actividades + '<br/>'+
	   '</td></tr>'+
	   '<tr><td colspan="2">'+
	   '	<b>Metas y objetivos: </b>'+ itemToEdit.objetivo + '<br/><br/>'+
	   '</td></tr>'+
	   '<tr id ="montoFin" ><td align="left">'+
	   '	<b>* Monto recabado</b><br/>N\u00FAmero:<input id="montoFinal"/>Letra:<input id="montoFinalStr"/> </td>'+
	   '</tr>'+
	   '<tr id="montoCorrecto"><td colspan="2">'+
	   '<input id="montoCorrectoProg"/><label for="montoCorrectoProg">\u00BFEl monto capturado es correcto?</label><br/>'+ 
	   '</td></tr>'+
	   '<tr id="dif"><td align="left">'+ 
	   '	* Existe una diferencia de $<b id="difx"></b>, favor de indicar el <span id="destino"><b> destino </b>de la misma:</span><span id="origen"><b> origen</b> de la misma:</span>'+
	   '</tr></td>'+
	   '<tr id="prdif"><td align="left">'+
	   '<input id="prDifSelect"/>'+
	   '</tr></td>'+
	   '<tr id="esp"><td colspan="2">'+
	   '	<b>* Especifique:</b> <input id="otraDiferencia"/>'+
	   '</td></tr>'+
	   '<tr><td colspan="2"><br/><br/>'+
	   '	<b>Actividades realizadas:</b>' +
	   '</td></tr>  '+
	   '<tr><td colspan="2">'+
	   '<input id="actividadesNuevas"/>'+
	   '</td></tr>'+
	   '<tr><td colspan="2">'+
	   '	<b>Metas y objetivos logrados:</b>'+
	   '</td></tr>'+
	   '<tr><td colspan="2">'+
	   '<input id="objetivoNuevo"/><br/><br/>'+
	   '</td></tr>'+
	   '<tr><td colspan="2">'+
	   '<input id="prBtnAceptar"/> <br/><br/>'+
	   '</td></tr>'+
	   '</table>';
	   
	   new ValidationTextBox({
           value:itemToEdit.montoFinalStr, 
           regExp:constants.NoNUMBER_VALID,
           id:'montoFinalStr',
           trim:"true",    
           maxLength:"200",
           style:"display:block",
           readOnly: true
        }, 'montoFinalStr');
	   
	   new ValidationTextBox({
           promptMessage:"Capture s\u00F3lo n\u00FAmeros",
           id:'montoFinal',
           regExp: constants.NUMBER_VALID,
           value:itemToEdit.montoFinal, 
           trim:"true",  
           maxLength:"9",
           required: true,
           style:"display:block; width:70px",
        }, 'montoFinal').on ('Blur', function(){ 
        	
		       var difMonto= registry.byId("montoFinal").get('value');
		       
			       if(difMonto!=''){
			       
				       if(difMonto==0){
				    	   jsUtils.cstmAlert('Favor de registrar una cantidad mayor a 0.');
				    	   registry.byId('montoFinal').set('value','');
				    	   registry.byId('montoFinalStr').set('value','');
				    	   
				    	   dom.byId('dif').style.display='none';
						   dom.byId('esp').style.display='none';
						   dom.byId('prdif').style.display='none';
				    	   return;
				       }
				       
				       if(banderaMonto!=difMonto){
				    	 
						       if(itemToEdit.monto== difMonto){
						    	   registry.byId('montoFinalStr').set('required', true);
								   registry.byId('otraDiferencia').set('required', false);
								   registry.byId('prDifSelect').set('required', false);
								   dom.byId('dif').style.display='none';
								   dom.byId('esp').style.display='none';
								   dom.byId('prdif').style.display='none';
								   registry.byId('montoFinalStr').set('value', 
										   jsUtils.covertirNumLetras(registry.byId("montoFinal").get('value')));
						       }
						       else{
						    	   if(difMonto>itemToEdit.monto){
						    		   diferencia=difMonto-itemToEdit.monto;
						    		   registry.byId('prDifSelect').reset();
						    		   dom.byId('difx').innerHTML=diferencia;
						    		   dom.byId('dif').style.display='block';
						    		   dom.byId('prdif').style.display='block';
						    		   dom.byId('origen').style.display='block';
						    		   dom.byId('destino').style.display='none';
						    		   registry.byId('montoFinalStr').set('required', true);
									   registry.byId('prDifSelect').set('store', pStorePositivo);
									   registry.byId('prDifSelect').set('value', 0);
									   registry.byId('montoFinalStr').set('value', 
											   jsUtils.covertirNumLetras(registry.byId("montoFinal").get('value')));
									   
						    	   }
						    	   else{
						    		   diferencia=itemToEdit.monto-difMonto;
						    		   registry.byId('prDifSelect').reset();
						    		   dom.byId('difx').innerHTML=diferencia;
						    		   dom.byId('dif').style.display='block';
						    		   dom.byId('prdif').style.display='block';
						    		   dom.byId('origen').style.display='none';
						    		   dom.byId('destino').style.display='block';
						    		   registry.byId('montoFinalStr').set('required', true);
									   registry.byId('prDifSelect').set('store', pStoreNegativo);
									   registry.byId('prDifSelect').set('value', 0);
									   registry.byId('montoFinalStr').set('value', 
											   jsUtils.covertirNumLetras(registry.byId("montoFinal").get('value')));
						    	   }
						
						       }
					       }
				       }
			          
				   banderaMonto=registry.byId("montoFinal").get('value');
        });

	   banderaMonto= registry.byId("montoFinal").get('value');
	   
	    new CheckBox({
	        name: "montoCorrectoProg",
	        value: "montoCorrectoProg",
	        checked: false
	    }, 'montoCorrectoProg');
	   
	   
	   new ValidationTextBox({
           promptMessage:"Capture la descripci\u00f3n de la diferencia", 
           regExp:constants.NoNUMBER_VALID,
           id:'otraDiferencia',
           trim:"true",    
           maxLength:"200",
           style:"display:block",
        }, 'otraDiferencia');

	   new FilteringSelect({
           id: 'prDifSelect',
           searchAttr: 'name',
           //value: 0
       }, 'prDifSelect').on ('change', function(){ 
    	   
    	   if(registry.byId('prDifSelect').get('displayedValue')=='Otra'){
    		   	 registry.byId('otraDiferencia').set('required', true);
	  			 dom.byId('esp').style.display='block';
    	   }
    	   else{
    		   registry.byId('otraDiferencia').set('required', false);
    		   dom.byId('esp').style.display='none'; 
    		   registry.byId('otraDiferencia').reset();
    	   }
       });
	
	   //Validación  de los datos que se obtiene de la base de datos.
	   
	   if(listProgramas[pos].id=='proyOSCPane'){
		   dom.byId('trOrg').style.display='block';
	   }
	   
	   if(itemToEdit.indRecurso==0){
		  
		   dom.byId('montoAsig').style.display='none';
		   dom.byId('montoFin').style.display='none';
		   dom.byId('dif').style.display='none';
		   dom.byId('esp').style.display='none';
		   dom.byId('prdif').style.display='none';
		   dom.byId('montoCorrecto').style.display='none';
		 
		   registry.byId('montoFinal').set('required', false);
		   registry.byId('montoFinalStr').set('required', false);
		   registry.byId('otraDiferencia').set('required', false);
		   registry.byId('prDifSelect').set('required', false);
		   
		   
	   }
	   else{
		   if(itemToEdit.montoFinal==null){
			   registry.byId('montoFinal').set('required', true);
			   registry.byId('montoFinalStr').set('required', true);
			   
			   dom.byId('dif').style.display='none';
			   dom.byId('esp').style.display='none';
			   dom.byId('prdif').style.display='none';
		   }
		   else{ 
			   if(itemToEdit.monto==itemToEdit.montoFinal){
				   registry.byId('otraDiferencia').set('required', false);
				   registry.byId('prDifSelect').set('required', false);
				   dom.byId('dif').style.display='none';
				   dom.byId('esp').style.display='none';
				   dom.byId('prdif').style.display='none';
		    	 }
			   else{
				   if(itemToEdit.montoFinal>itemToEdit.monto){
					   diferencia=itemToEdit.montoFinal-itemToEdit.monto;
					   dom.byId('difx').innerHTML=diferencia;
					   dom.byId('dif').style.display='block';
					   dom.byId('prdif').style.display='block';
					   dom.byId('origen').style.display='block';
		    		   dom.byId('destino').style.display='none';
					   dom.byId('esp').style.display='none';
					   registry.byId('prDifSelect').set('store', pStorePositivo);
					  
					   registry.byId('prDifSelect').set('value', itemToEdit.cDiferencia);
				   }
				   
				   else{
					   diferencia=itemToEdit.monto-itemToEdit.montoFinal;
					   dom.byId('difx').innerHTML=diferencia;
					   dom.byId('dif').style.display='block';
					   dom.byId('prdif').style.display='block';
					   dom.byId('origen').style.display='none';
		    		   dom.byId('destino').style.display='block';
					   registry.byId('prDifSelect').set('store', pStoreNegativo);
					   registry.byId('prDifSelect').set('value', itemToEdit.cDiferencia);
				   }
				   
				  var cad=itemToEdit.otraDiferencia.substring(0,4);
				  if(cad=='Otra'){
					   dom.byId('esp').style.display='block';
					   registry.byId('otraDiferencia').set('required', true);
					   cad=itemToEdit.otraDiferencia.substring(5);
					   registry.byId('otraDiferencia').set('value', cad);
				  }
			   }
		   }
	   }
	   
	   //Actividades realizadas
	   
	   new Textarea({
           promptMessage:"Capture las actividades realizadas", 
           id:'actividadesNuevas',
           trim:"true",    
           maxLength:"200",
           style:"width:400px;",
           value: itemToEdit.actividadesFin
        }, 'actividadesNuevas');
	   
	   //Objetivos logrados
	   
	   new Textarea({
           promptMessage:"Capture las metas y objetivos logrados", 
           id:'objetivoNuevo',
           trim:"true",    
           maxLength:"200",
           style:"width:400px;",
           value: itemToEdit.objetivoFin
        }, 'objetivoNuevo');
	  
	   //Botón Aceptar
	   //jsUtils.createTag('div','prBtnAceptar','dcDetail');
	   
	   new Button({
			label : " Aceptar ",
			id: "prBtnAceptar",
			onClick : function() {
			
			var form = registry.byId('dDetail');
			if ( form.validate() == false){  
				jsUtils.cstmAlert('Favor de registrar los datos requeridos');
				return false;
			}
			else{
				if(itemToEdit.indRecurso!=0){
				
					if(registry.byId('prDifSelect').get('value')==0 && registry.byId('montoFinal').get('value') !=itemToEdit.monto){
						jsUtils.cstmAlert('Favor de seleccionar la diferencia');
						return false;
					}
					
					if(!registry.byId('montoCorrectoProg').checked){
						jsUtils.cstmAlert('Favor de indicar si el monto capturado es correcto');
						return false;
					}
				}
				
			}
			
		    var grid=registry.byId(prId+'Grid');
		  	
			var index = grid.selection.selectedIndex;
			var item = grid.getItem(index);
			
			grid.store.setValue(item, 'montoFinal',registry.byId('montoFinal').get('value'));
			grid.store.setValue(item, 'montoFinalStr',registry.byId('montoFinalStr').get('value'));
			grid.store.setValue(item, 'actividadesFin',registry.byId('actividadesNuevas').get('value'));
			grid.store.setValue(item, 'objetivoFin',registry.byId('objetivoNuevo').get('value'));
			
			if(itemToEdit!= registry.byId('montoFinal').get('value')){
				grid.store.setValue(item, 'cDiferencia',registry.byId('prDifSelect').get('value'));
				var nomDiferencia=registry.byId('prDifSelect').get('displayedValue');
				if(nomDiferencia=='Otra'){
					nomDiferencia= 'Otra: '+registry.byId('otraDiferencia').get('value');
				}
				
				grid.store.setValue(item,'otraDiferencia', nomDiferencia);
			}
				
			grid.update();
		
		   registry.byId('dDetail').destroyRecursive(false);
								
		   }
		},'prBtnAceptar');
	  
   }//Fin de la función programaDetail
   
   
   
   //Función para obtener del catalogo las diferencias de los programas.
   function selectDiferenciasPgr(tipoDif){
   
   		var pStore=new Object();
   
   		var lstPr=xhr.get({
	            url: dojo.config.app.urlBase + 'catalogos/selectCDiferenciasPgr/'+tipoDif,
	            sync: false,
	            preventCache:true,
	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
	            handleAs: "json"
		   	});
		   
   		lstPr.then(function(cDiferencia){
	   		
   			var dataDif=[{name:"Seleccione",id:"0"}];
	   
   			for(var i in cDiferencia){
   				dataDif.push({name:cDiferencia[i].nomDiferencia, id:cDiferencia[i].cDiferencia});
   			}
   
   			pStore = new Memory({
   				data: dataDif
   			});
   			if(tipoDif==1){
   				pStorePositivo=pStore;				  		 
   			}
	  	 	if(tipoDif==0){
	  	 		pStoreNegativo=pStore; 
	  	 	}
   		});
   }//Fin de la función en la que se obtiene el catalogo de diferencias
   
   
	// Se manda a actualizar la informacion capturada de la cuarta
	// sesión
	function saveCuartaSesion(cct) {
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
		
		//Información General
		var ceInfGral = {
			cCct : cct
		};
		
		//Sesión
		var ceSesion = {
			fchSesion : registry.byId('fechaRegistro').get('value'),
			horaIniSesion : registry.byId('horaInicio').get('value'),
			horaFinSesion : registry.byId('horaFinal').get('value'),
			numIntegrantes : registry.byId('numIntegrantes').get('value'),
			observaciones : registry.byId('observaciones').get('value'),
			fchRegistro : registry.byId('fechaRegistro').get('value')
		};

		// Actividades
		var actividades = new Array();
		var actividadesArray = registry.byId('nomActividad').get('value');
		
		// Carga los objetos tipo CeActSesion
		for ( var i in actividadesArray) {
			
			if(actividadesArray[i]){
				actividades.push({
					cActividad : actividadesArray[i]
				});
			}
		}
		
		//Programas
		var programas = new Array();
		
		if(array.indexOf(gActividades,61)!=-1){
				// Se recorre cada una de las categorias de los programas
			
				for( var a=0; a<listProgramas.length; a++){
					if(registry.byId(listProgramas[a].tpoPrograma+'Grid')){
						var grid = registry.byId(listProgramas[a].tpoPrograma+'Grid');
						// Obtiene la informaci—on del Grid
						// Se recorre el grid de acuerdo  a la categoria.
						for ( var i = 0; i < grid.rowCount; i++) {
							var item = grid.getItem(i);
							
							if(grid.store.getValue(item,'indRecurso')!=0 &&  grid.store.getValue(item, 'montoFinal')==null){
								jsUtils.cstmAlert('Favor de registrar la informaci\u00F3n requerida para el ' +
										listProgramas[a].title + ': <b>' + grid.store.getValue(item,'nomPrograma')+ '</b> ' );
								return false;
							}
								
							var programa = {
										cPrograma : grid.store.getValue(item,'cPrograma'),
										
							};
							
							if(grid.store.getValue(item, 'indRecurso')!=0 ){
								
								lang.mixin(programa, {actividadesFin: grid.store.getValue(item, 'actividadesFin'),
											objetivoFin: grid.store.getValue(item,'objetivoFin'), 
											montoFinal: grid.store.getValue(item, 'montoFinal'),
											montoFinalStr: grid.store.getValue(item,'montoFinalStr')});
								
								 if(grid.store.getValue(item, 'monto')!=grid.store.getValue(item, 'montoFinal')){
									   
									   lang.mixin(programa, {cDiferencia:grid.store.getValue(item,'cDiferencia')});
									   var cad=grid.store.getValue(item,'otraDiferencia').substring(0,4);
									      
									   if(cad=='Otra'){
										   cad=grid.store.getValue(item,'otraDiferencia').substring(5);
										   lang.mixin(programa, {otraDiferencia:cad});
									   }
								   }
							}
							else{
								if(grid.store.getValue(item, 'actividadesFin')==null){
									lang.mixin(programa, {actividadesFin: '',
									objetivoFin: grid.store.getValue(item,'objetivoFin')});
								}
								else{
									if(grid.store.getValue(item, 'objetivoFin')==null){
										lang.mixin(programa, {actividadesFin: grid.store.getValue(item, 'actividadesFin'),
											objetivoFin: ''});
									}
									else{
										lang.mixin(programa, {actividadesFin: grid.store.getValue(item, 'actividadesFin'),
													objetivoFin: grid.store.getValue(item,'objetivoFin')});
									}	
								}
									
							}
							
						   programas.push(programa);
							
						}
					}
				}
		}
		
			
		//Comites
		var comites = new Array();
		var comite={};
		
		if(array.indexOf(gActividades,62)!=-1 && registry.byId('comitesPaneGrid')){
			
				var gridComites = registry.byId('comitesPaneGrid');
				
				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridComites.rowCount; i++) {
					var item = gridComites.getItem(i);
					
					 //var indCumplieronAct=gridComites.store.getValue(item,'indCumplieronAct');
					 if(gridComites.store.getValue(item,'indCumplieronAct')){
						 comite = {
									cComite: gridComites.store.getValue(item,'cComite'),
									indCumplieronAct:true,
									actividades: gridComites.store.getValue(item,'actividades')
								}; 
					 }
					 else{
						 comite = {
									cComite: gridComites.store.getValue(item,'cComite'),
									indCumplieronAct:false,
									actividades: gridComites.store.getValue(item,'actividades')
								}; 
					 }
				
					comites.push(comite);
				}
		}
		
		
		//Eventos
		var eventos = new Array();
		
		if(array.indexOf(gActividades,65)!=-1 && registry.byId('eventosPaneGrid')){
			
				var gridEventos = registry.byId('eventosPaneGrid');
				
				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridEventos.rowCount; i++) {
					var item = gridEventos.getItem(i);

					if(gridEventos.store.getValue(item,'indRecurso')==null){
								jsUtils.cstmAlert('Favor de registrar la informaci\u00F3n requerida para el evento: <b>' 
										+ gridEventos.store.getValue(item,'nomOtroEvento')+ '</b> ' );
								return false;
					}

					var evento = {
							cEvento: gridEventos.store.getValue(item,'cEvento'),
							indRecurso: gridEventos.store.getValue(item,'indRecurso'),
							monto: gridEventos.store.getValue(item,'montoEvento'),
							montoStr: gridEventos.store.getValue(item,'montoStrEvento'),
							actividadesFin: gridEventos.store.getValue(item, 'actividadesFin'),
							objetivoFin: gridEventos.store.getValue(item,'objetivoFin')
							
					};
					
					eventos.push(evento);
			
			}
		}
		

		//Mejoras
		var mejoras = new Array();
		
		if(array.indexOf(gActividades,64)!=-1 && registry.byId('mejorasPaneGrid')){
			
				var gridMejoras = registry.byId('mejorasPaneGrid');
				
				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridMejoras.rowCount; i++) {
					var item = gridMejoras.getItem(i);
					
					if(gridMejoras.store.getValue(item,'indRecurso')==null && gridMejoras.store.getValue(item,'periodoInicio')==null){
						jsUtils.cstmAlert('Favor de registrar la informaci\u00F3n requerida para la mejora: <b>' 
								+ gridMejoras.store.getValue(item,'nomMejoraCct')+ '</b> ' );
						return false;
					}

					var mejora = {
							cMejoraCct: gridMejoras.store.getValue(item,'cMejoraCct'),
							indRecurso: gridMejoras.store.getValue(item,'indRecurso'),
							monto: gridMejoras.store.getValue(item,'montoMejora'),
							montoStr: gridMejoras.store.getValue(item,'montoStrMejora'),
							actividadesFin: gridMejoras.store.getValue(item, 'actividadesFin'),
							objetivoFin: gridMejoras.store.getValue(item,'objetivoFin'),
							periodoInicio: gridMejoras.store.getValue(item,'periodoInicio')
					};
					
					mejoras.push(mejora);
					
					
			}
		}


		//Recursos
		var recursos = new Array();
		
		//Captura la informacion de recusrsos siempre y cuando 
		//se hayan aceptado la transparencia de los montos
		if(array.indexOf(gActividades,63)!=-1){
			
			if(cuartaSesionObj.recursos.length != 0 && cuartaSesionObj.recursos[0].indRecurso == '1'){
			
				var indTransparenta=0;
				
				if(registry.byId('indRecurso1').checked){
					indTransparenta=true;
				}
				
				if(registry.byId('indRecurso0').checked){
					indTransparenta=false;
				}
				
				var recurso = {
						cRecurso: 3,
						indTransparenta: indTransparenta,
						uso: registry.byId('uso').get('value'),
						monto: registry.byId('montoRecursos').get('value'),
						montoStr: registry.byId('montoStrRecursos').get('value')
					};
				
				recursos.push(recurso);
			}
			
		}
		

		// Se integra la cuarta sesión.
		var cuartaSesion = {
			ceInfGral : ceInfGral,
			ceSesion : ceSesion,
			actividades : actividades,
			programas : programas,
			mejoras : mejoras,
			recursos : recursos,
			eventos : eventos,
			comites : comites
		};

		//Captura la pregunsta siempre y cuando se haya contestado
		if(registry.byId('indCumplioPlaneacionSi')){
			var indCumplio = registry.byId('indCumplioPlaneacionSi').checked==true?true:false;
			lang.mixin(cuartaSesion, {planeacion: {indCumplioPlaneacion: indCumplio}});
		}
		
		console.log('Se guarda la cuarta sesión:'+json.toJson(cuartaSesion));
		var urlJson = dojo.config.app.urlBase
				+ 'cuartaSesion/saveCuartaSesion';
		xhr.post({
					url : urlJson,
					postData : json.toJson(cuartaSesion),
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
   
   
    return {
	   init:init,
	   saveCuartaSesion:saveCuartaSesion
	};
});

