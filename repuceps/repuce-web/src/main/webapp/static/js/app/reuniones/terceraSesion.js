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
	
		var terceraSesionObj= new Object();
		var gActividades=[];

		
	function init(actividades,cCct,ReunionObj){	   		
			terceraSesionObj=ReunionObj;
	   		gActividades=actividades;
			
		   _programas(array.indexOf(actividades,51)!=-1);
		   _eventos(array.indexOf(actividades,52)!=-1);
		   _municipales(array.indexOf(actividades,53)!=-1);
		  
   }
	
	var listProgramas= new Array({title:"Programas Federales",tpoPrograma:1,id:"progFedPane"},
			   {title: "Programas Estatales",tpoPrograma:2,id:"progEstPane"},
			   {title:"Programas Locales",tpoPrograma:3,id:"progLocPane"},
			   {title:"Proyectos OSC",tpoPrograma:4,id:"proyOSCPane"});
	
	var listcPrograma= new Array();
	var _cEvento =new Array();
   
   function _programas(crea){
	   
	  
	   if(crea){
		   if(!registry.byId(listProgramas[0].id)){
			   
		   for(var i in listProgramas ){
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:listProgramas[i].title,
		           id:listProgramas[i].id
		       }));
			   
			   
			   dom.byId(listProgramas[i].id).innerHTML='<table border="0" align="left" width= "900px">'+
			   '<tr>' +
		   	   '	<td><input id="'+listProgramas[i].tpoPrograma+'Grid"/></td>'+
			   '</tr>'+
			   '<tr>' +
		   	   	'<td><input id="'+ i +'a_' + listProgramas[i].tpoPrograma +'"/>'+
		   	   		'<input id="'+ i +'e_' + listProgramas[i].tpoPrograma +'"/>'+
		   	   		'<input id="'+ i +'d_' + listProgramas[i].tpoPrograma +'"/></td>'+
			   '</tr>'+
			   '</table>';
			   
			   var layout = [[	  { name: 'cPrograma', field: 'cPrograma', width: '5px', hidden:true},
			                  	  { name: 'indRecurso', field: 'indRecurso', width: '5px',hidden:true},
				    		      { name: 'Programa', field: 'nomPrograma',  width:'100px'},
				    		      { name: 'nomOtroPrograma', field: 'nomOtroPrograma',  width:'5px', hidden:true},
				    		      { name: 'Estatus del Recurso', field: 'indRecursoStr', width: '100px'},					    		      
				    		      { name: 'Ciclo escolar de Ingreso', field: 'anioIngreso', width: '90px'},
				    		      { name: 'Actividades', field: 'actividades', width: '180px'},
				    		      { name: 'Monto', field: 'monto', width: '70px'},
				    		      { name: 'Monto(Letra)', field: 'montoStr', width: '120px'},
				    		      { name: 'Metas y objetivos', field: 'objetivo', width: '160px'}]];
			   
			   if(listProgramas[i].id == "proyOSCPane"){
				   layout[0].push({name: 'Nombre de la organizaci\u00F3n de la sociedad civil que apoya',
					   			   field: 'nomBenefactor', width: '100px'});
			   }
			 
			   new DataGrid({
			        id: listProgramas[i].tpoPrograma+'Grid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '850px'
			        },
			        listProgramas[i].tpoPrograma+'Grid').startup();
			   
		       var lstPr=xhr.get({
			            url: dojo.config.app.urlBase + 'catalogos/listProgramas/'+listProgramas[i].tpoPrograma,
			            sync: false,
			            preventCache:true,
			            contentType: "application/x-www-form-urlencoded; charset=utf-8",
			            handleAs: "json"
			        });
		       listcPrograma = [];
		       
		       lstPr.then(function(cPrograma){
		        	listcPrograma.push(cPrograma);
		        	 var data = {
						      identifier: "cPrograma",
						      items: []
						    };
		        	
		        	for (var j in cPrograma){
					   for(var k in terceraSesionObj.programas){
						   if(cPrograma[j].cPrograma==terceraSesionObj.programas[k].cPrograma){
							   var indRecursoStr="";
							   switch(terceraSesionObj.programas[k].indRecurso){
								case '0': indRecursoStr="El consejo no conoce el monto del recurso";
								break;
								case '1':indRecursoStr="El consejo conoce el monto del recurso pero no lo maneja";
								break;
								case '2': indRecursoStr="El consejo conoce el monto del recurso y lo maneja";
								break;
							   }
							   var nomPrograma= terceraSesionObj.programas[k].nomPrograma +
							   			(terceraSesionObj.programas[k].nomOtroPrograma?
							   					(': ' + terceraSesionObj.programas[k].nomOtroPrograma):'');
							   
							   var progObj = {
									    cPrograma: terceraSesionObj.programas[k].cPrograma, 
							   			nomPrograma: nomPrograma, 
							   			nomOtroPrograma: terceraSesionObj.programas[k].nomOtroPrograma, 
									    indRecurso: terceraSesionObj.programas[k].indRecurso, 
									    indRecursoStr:indRecursoStr,
									    anioIngreso: terceraSesionObj.programas[k].anioIngreso,
									    actividades:terceraSesionObj.programas[k].actividades,
									    monto:terceraSesionObj.programas[k].monto,
									    montoStr:terceraSesionObj.programas[k].montoStr,
									    objetivo:terceraSesionObj.programas[k].objetivo};
							   
							   if(listProgramas[i].id=='proyOSCPane'){
								   lang.mixin(progObj, {nomBenefactor: terceraSesionObj.programas[k].nomBenefactor});
									  
								}
							   
							  data.items.push(progObj);
							  
						   }
					   }
				   }
		        	 var newStore = new ItemFileWriteStore({data: data});
					 registry.byId(cPrograma[0].tpoPrograma+'Grid').setStore(newStore);
				  
		        });

				   new Button({
						label : " Agregar ",
						id:i+'a_'+listProgramas[i].tpoPrograma,
						onClick : function() {
							prId=this.id;
							pos=prId.substring(0,1);
							prId=prId.substring(prId.lastIndexOf("a_")+2);
							programaDetail(prId,pos);
							
					          
						}
					}, i+'a_'+listProgramas[i].tpoPrograma);
				   
				
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
								   			nomOtroPrograma: registry.byId(prId+'Grid').store.getValue(selectedItem,'nomOtroPrograma'), 
										    indRecurso: registry.byId(prId+'Grid').store.getValue(selectedItem,'indRecurso'),
										    anioIngreso: registry.byId(prId+'Grid').store.getValue(selectedItem,'anioIngreso'),
										    actividades: registry.byId(prId+'Grid').store.getValue(selectedItem,'actividades'),
										    monto: registry.byId(prId+'Grid').store.getValue(selectedItem,'monto'),
										    montoStr: registry.byId(prId+'Grid').store.getValue(selectedItem,'montoStr'),
										    objetivo: registry.byId(prId+'Grid').store.getValue(selectedItem,'objetivo')};
				                    	
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
					}, i+'e_'+listProgramas[i].tpoPrograma);
				   
				   
				   new Button({
						label : " Eliminar ",
						id:i+'d_'+listProgramas[i].tpoPrograma,
						onClick : function() {
							prId=this.id;
							prId=prId.substring(prId.lastIndexOf("d_")+2);
							registry.byId(prId+'Grid').removeSelectedRows();
							registry.byId(prId+'Grid').store.save();
						}
				   },i+'d_'+listProgramas[i].tpoPrograma);
			   }
			}   
	   }else
		   for(var i in listProgramas ){
			   if(registry.byId(listProgramas[i].id))
				   registry.byId('pestanias').closeChild(registry.byId(listProgramas[i].id)); 
		   } 
	}
   
   function _eventos(crea){
	    
	   if(crea){
		   if(!registry.byId("eventosPane")){
			   var id="eventosPane";
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Eventos",
		           id:id
		       }));
			   
			   
			   
			   var layout = [[	  { name: 'cEvento', field: 'cEvento', width: '5px', hidden:true},
				    		      { name: 'Evento', field: 'nomEvento',  width:'180px'},
				    		      { name: 'nomOtroEvento', field: 'nomOtroEvento', width: '5px', hidden:true},
				    		      { name: 'Ciclo escolar de inicio de proyecto', field: 'periodoRealizado', width: '90px'},
				    		      { name: 'Actividades', field: 'actividades', width: '280px'},
				    		      { name: 'Metas y objetivos', field: 'objetivo', width: '280px'}]];
			   	
			   jsUtils.createTag('div','gridEventos',id);
			   
			   dom.byId('gridEventos').innerHTML='<table border="0" align="left" width= "910px">'+
			   '<tr>' +
		   	   '	<td><input id="eventosGrid"/></td>'+
			   '</tr>'+
			   '<tr>' +
		   	   	'<td><input id="eventosAgregar"/> <input id="eventosEditar"/> <input id="eventosEliminar"/></td>'+
			   '</tr>'+
			   '</table>';
				  
			   new DataGrid({
			        id: 'eventosGrid',
			        structure: layout,
			        //autoHeight: true,
			        rowSelector: '10px',
			        height: '300px',
				    width: '900px'
				    },'eventosGrid').startup();
			   
			   var lstEv=xhr.get({
		            url: dojo.config.app.urlBase + 'catalogos/listEventos',
		            sync: false,
		            preventCache:true,
		            contentType: "application/x-www-form-urlencoded; charset=utf-8",
		            handleAs: "json"
		        });
			   lstEv.then(function(cEvento){
				   _cEvento=cEvento;
				   var data = {
						      identifier: "cEvento",
						      items: terceraSesionObj.eventos
						    };
				   
				   var newStore = new ItemFileWriteStore({data: data});
				   registry.byId('eventosGrid').setStore(newStore);
				   
			   });
			   
			   //jsUtils.createTag('div',id+'Agregar',id);
			   new Button({
					label : " Agregar ",
					id:'eventosAgregar',
					onClick : function() {
				         eventoDetail(_cEvento); 
					}
				},'eventosAgregar');
			   
			   //jsUtils.createTag('div',id+'Editar',id);
			   new Button({
					label : " Editar ",
					id:'eventosEditar',
					onClick : function() {
						var items = registry.byId('eventosGrid').selection.getSelected();
						if(items.length==1){
			                 dojo.forEach(items, function(selectedItem){
			                     if(selectedItem !== null){
			                    	
			                    	var itemToEdit={selectedItem:selectedItem,
			                    		cEvento: registry.byId('eventosGrid').store.getValue(selectedItem,'cEvento'), 
			                    		nomOtroEvento: registry.byId('eventosGrid').store.getValue(selectedItem,'nomOtroEvento'), 
			                    		periodoRealizado: registry.byId('eventosGrid').store.getValue(selectedItem,'periodoRealizado'),
									    actividades: registry.byId('eventosGrid').store.getValue(selectedItem,'actividades'),
									    objetivo: registry.byId('eventosGrid').store.getValue(selectedItem,'objetivo')};
			                    	eventoDetail(_cEvento,itemToEdit);
			                     }
			                 }); 
			             }else{
			            	 jsUtils.cstmAlert(
								'Debe seleccionar solo un registro.');
			             }
						
					}
				},'eventosEditar');
			   //jsUtils.createTag('div',id+'Eliminar',id);
			   new Button({
					label : " Eliminar ",
					id:'eventosEliminar',
					onClick : function() {
						registry.byId('eventosGrid').removeSelectedRows();
						registry.byId('eventosGrid').store.save();
					}
				}, 'eventosEliminar');
  
		   }
	   }else{
		   if(registry.byId("eventosPane")){
			   registry.byId('pestanias').closeChild(registry.byId("eventosPane"));
		   }   
		}
   }
	
   
   
   function _municipales(crea){
	   var id="municipalesPane"; 
	   var contenido= '<table border="0" align="lefth" >'+ 
	   '<tr><td>'+ 
	   '	<span align="lefth" class="sub"> APOYO Y SEGUIMIENTO DE LOS CONSEJOS MUNICIPALES A LOS CONSEJOS   ESCOLARES </span>'+ 
	   '</td></tr>'+
	   '<tr><td>'+ 
	   '	<p> <b>\u00BFSu Municipio cuenta con un Consejo Municipal de Participaci\u00f3n Social en la Educaci\u00f3n? </b></p>'+
	   '	<br><input id="indConsejoMun2"/><label for="indConsejoMun2">S\u00ED</label>'+ 
	   '	<br/><input id="indConsejoMun0"/><label for="indConsejoMun0">No</label>'+ 
	   '	<br/><input id="indConsejoMun1"/><label for="indConsejoMun1">No Sabe</label><br/>'+ 
	   '</td></tr>'+
	   '<tr><td>'+ 
	   '	<p> <b>\u00BFEl Consejo Municipal le dio seguimiento a los resultados y acuerdos llevados a cabo en la Prueba ENLACE del centro escolar?</b></p>'+
	   '	<br><input id="indSegEnlace1"/><label for="indSegEnlace1">S\u00ED</label>'+ 
	   '	<br/><input id="indSegEnlace0"/><label for="indSegEnlace0">No</label>'+ 
	   '	<br/><div id="accSeg" style="display:none">Acciones de seguimiento: </div><div id="accionesSeg"/><br/>'+ 
	   '</td></tr>'+
	   '<tr><td>'+ 
	   '	<p> <b>\u00BFEl Consejo Municipal,  apoy\u00f3 con alg\u00fAn programa municipal al Consejo Escolar ?</b></p>'+
	   '	<br><input id="indApoyoProg1"/><label for="indApoyoProg1">S\u00ED</label>'+ 
	   '	<br/><input id="indApoyoProg0"/><label for="indApoyoProg0">No</label><br/>'+ 
	   '</td></tr>'+
	   '<tr><td>'+ 
	   '	<p> <b> \u00BFEl Consejo Municipal apoy\u00f3  al Consejo Escolar (en especie o en econ\u00f3mico)?</b></p>'+
	   '	<br><input id="indApoyo1"/><label for="indApoyo1">S\u00ED</label>'+ 
	   '	<br/><input id="indApoyo0"/><label for="indApoyo0">No</label>'+ 
	   '	<br/><div id="espEco" style="display:none">De qu\u00E9 tipo:</div><div id="desAoyo"/><br/>'+ 
	   '</td></tr>'+
	   '<tr><td>'+ 
	   '	<p> <b> \u00BFEl Consejo Municipal, apoy\u00f3  al Consejo Escolar en alguna gesti\u00f3n ante alguna dependencia gubernamental u otra instituci\u00f3n (en especie o en econ\u00f3mico)? </b></p>'+
	   '	<br><input id="indApoyoGestion1"/><label for="indApoyoGestion1">S\u00ED</label>'+ 
	   '	<br/><input id="indApoyoGestion0"/><label for="indApoyoGestion0">No</label>'+ 
	   '	<br/><div id="espEcoTipo" style="display:none">Tipo de apoyo: <input id="desAoyoGestion"/>'+ 
	   '	<br/>Nombre de la dependencia o instituci\u00f3n:<input id="institucionGestion"/></div><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+ 
	   '	<p> <b> \u00BFSu Entidad cuenta con Consejo Estatal de Participaci\u00f3n Social en la Educaci\u00f3n?</b></p>'+
	   '	<br><input id="indConsejoEst2"/><label for="indConsejoEst2">S\u00ED</label>'+ 
	   '	<br/><input id="indConsejoEst0"/><label for="indConsejoEst0">No</label>'+ 
	   '	<br/><input id="indConsejoEst1"/><label for="indConsejoEst1">No Sabe</label><br/>'+ 
	   '</td></tr>'+
	   '</table>';
	   if(crea){
		   if(!registry.byId(id)){
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Apoyo y Seguimiento",
		           content: contenido,
		           id:id
		       })); 
			   
			   var sMunicipal=terceraSesionObj.seguimientoMunicipal;

			   //Primer Pregunta
			  var indConsejoMun2= new RadioButton({
		           checked: false,
		           value: "2",
		           name: "indConsejoMun",
		           id:"indConsejoMun2"
		       }, "indConsejoMun2");
			   
			  var indConsejoMun0=new RadioButton({
		           checked: true,
		           value: "0",
		           name: "indConsejoMun",
		           id:"indConsejoMun0"
		       }, "indConsejoMun0");
			  
			  var indConsejoMun1=new RadioButton({
		           checked: false,
		           value: "1",
		           name: "indConsejoMun",
		           id:"indConsejoMun1"
		       }, "indConsejoMun1");
			  
			  if(!jsUtils.isEmpty(sMunicipal)){
				  if(sMunicipal.indConsejoMun==2){indConsejoMun2.set('checked',true);}
				  if(sMunicipal.indConsejoMun==1){indConsejoMun1.set('checked',true);}
				  if(sMunicipal.indConsejoMun==0){indConsejoMun0.set('checked',true);}
			  }
			  
			  //Segunda Pregunta
			  var indSegEnlace1 = new RadioButton({
		           checked: false,
		           value: "1",
		           name: "segConsejoMun",
		           id:'indSegEnlace1'
		       }, "indSegEnlace1");
			  indSegEnlace1.on('change', function(){
		    	   if(registry.byId('indSegEnlace1').checked){
		        		registry.byId('accionesSeg').set("style","display:block");
		        		registry.byId('accionesSeg').set("required",true);
		        		dom.byId('accSeg').style.display='block';
		            }else{
		            	registry.byId('accionesSeg').set("style","display:none");
		            	registry.byId('accionesSeg').reset();
		            	registry.byId('accionesSeg').set("required",false);
		            	dom.byId('accSeg').style.display='none';
		            }
		    	   
		       });
		       
			  var indSegEnlace0 = new RadioButton({
		           checked: true,
		           value: "0",
		           name: "segConsejoMun",
		           id:'indSegEnlace0'
		       }, "indSegEnlace0");
			
			  new ValidationTextBox({
	               promptMessage:"Capture las acciones de seguimiento",
	               style: "display:none;",
	               trim:"true"                                
	            }, 'accionesSeg');
			  
			  if(!jsUtils.isEmpty(sMunicipal)){
				  if(sMunicipal.indSegEnlace==0){indSegEnlace0.set('checked',true);}
				  if(sMunicipal.indSegEnlace==1){indSegEnlace1.set('checked',true);}
				  registry.byId('accionesSeg').set('value',sMunicipal.accionesSeg);
			  }
			  if(registry.byId('indSegEnlace1').checked){
	        		registry.byId('accionesSeg').set("style","display:block");
	        		registry.byId('accionesSeg').set("required",true);
	        		dom.byId('accSeg').style.display='block';
	            }
			  
			  //Tercer Pregunta
			   var indApoyoProg1=new RadioButton({
		           checked: false,
		           value: "1",
		           name: "indConsejoMunApo"
		       }, "indApoyoProg1");
			   
			  var indApoyoProg0=new RadioButton({
		           checked: true,
		           value: "0",
		           name: "indConsejoMunApo"
		       }, "indApoyoProg0");
			  
			  if(!jsUtils.isEmpty(sMunicipal)){
				  if(sMunicipal.indApoyoProg==0){indApoyoProg0.set('checked',true);}
				  if(sMunicipal.indApoyoProg==1){indApoyoProg1.set('checked',true);}				   
			  }
			  
			  //Cuarta pregunta		
			   var indApoyo1=new RadioButton({
		           checked: false,
		           value: "1",
		           name: "indApoyo"
		       }, "indApoyo1");
			   indApoyo1.on('change', function(){
		    	   if(registry.byId('indApoyo1').checked){
		        		registry.byId('desAoyo').set("style","display:block");
		        		registry.byId('desAoyo').set("required",true);
		        		dom.byId('espEco').style.display='block';
		            }else{
		            	registry.byId('desAoyo').set("style","display:none");
		            	registry.byId('desAoyo').reset();
		            	registry.byId('desAoyo').set("required",false);
		            	dom.byId('espEco').style.display='none';
		            }
		    	   
		       });
			   
			  var indApoyo0=new RadioButton({
		           checked: true,
		           value: "0",
		           name: "indApoyo"
		       }, "indApoyo0");
			  
			  new ValidationTextBox({
	               promptMessage:"Capture el tipo",
	               trim:"true",     
	               style: "display:none;"
	            }, 'desAoyo');
			  
			  if(!jsUtils.isEmpty(sMunicipal)){
				  if(sMunicipal.indApoyo==0){indApoyo0.set('checked',true);}
				  if(sMunicipal.indApoyo==1){indApoyo1.set('checked',true);}
				  registry.byId('desAoyo').set('value',sMunicipal.desApoyo);
			  }
			  if(registry.byId('indApoyo1').checked){
	        		registry.byId('desAoyo').set("style","display:block");
	        		registry.byId('desAoyo').set("required",true);
	        		dom.byId('espEco').style.display='block';
	            }
			  
			  //Quinta pregunta
			  var indApoyoGestion1=new RadioButton({
		           checked: false,
		           value: "1",
		           name: "indApoyoGestion"
		       }, "indApoyoGestion1");
			  indApoyoGestion1.on('change', function(){
		    	   if(registry.byId('indApoyoGestion1').checked){
		    		    registry.byId('desAoyoGestion').set("required",true);
		        		registry.byId('institucionGestion').set("required",true);
		        		dom.byId('espEcoTipo').style.display='block';
		        	}else{
		            	registry.byId('desAoyoGestion').reset();
		            	registry.byId('desAoyoGestion').set("required",false);
		            	registry.byId('institucionGestion').reset();
		            	registry.byId('institucionGestion').set("required",false);
		            	dom.byId('espEcoTipo').style.display='none';
		            }
		    	});
			   
			  var indApoyoGestion0=new RadioButton({
		           checked: true,
		           value: "0",
		           name: "indApoyoGestion"
		       }, "indApoyoGestion0");
			  
			  
			  new ValidationTextBox({
	               promptMessage:"Capture el tipo",
	               trim:"true"                 
	            }, 'desAoyoGestion');
			  
			  new ValidationTextBox({
	               promptMessage:"Capture el nombre de la institución",
	               trim:"true"                                 
	            }, 'institucionGestion');
			  
			  if(!jsUtils.isEmpty(sMunicipal)){
				  if(sMunicipal.indApoyoGestion==0){indApoyoGestion0.set('checked',true);}
				  if(sMunicipal.indApoyoGestion==1){indApoyoGestion1.set('checked',true);}
				  registry.byId('desAoyoGestion').set('value',sMunicipal.desApoyoGestion);
				  registry.byId('institucionGestion').set('value',sMunicipal.institucionGestion);
			  }
			  if(registry.byId('indApoyoGestion1').checked){
	    		    registry.byId('desAoyoGestion').set("required",true);
	        		registry.byId('institucionGestion').set("required",true);
	        		dom.byId('espEcoTipo').style.display='block';
	        	}
			 
			  //Sexta pregunta
			  var indConsejoEst2=new RadioButton({
		           checked: false,
		           value: "2",
		           name: "indConsejoPart"
		       }, "indConsejoEst2");
			   
			  var indConsejoEst0=new RadioButton({
		           checked: true,
		           value: "0",
		           name: "indConsejoPart"
		       }, "indConsejoEst0");
			  
			  var indConsejoEst1=new RadioButton({
		           checked: false,
		           value: "1",
		           name: "indConsejoPart"
		       }, "indConsejoEst1");
			  
			  if(!jsUtils.isEmpty(sMunicipal)){
				  if(sMunicipal.indConsejoEst==2){indConsejoEst2.set('checked',true);}
				  if(sMunicipal.indConsejoEst==1){indConsejoEst1.set('checked',true);}
				  if(sMunicipal.indConsejoEst==0){indConsejoEst0.set('checked',true);}
			  }
		   }
	   }
	   else{
		   if(registry.byId(id)){
			   registry.byId('pestanias').closeChild(registry.byId(id));
		   }   
		} 
	   
   }
   
   function programaDetail(prId,pos,itemToEdit){
	   var edit=false;
	   if(!itemToEdit){
		   itemToEdit={cPrograma: 0,nomPrograma:'',nomOtroPrograma:'', indRecurso:2, anioIngreso:'',
				   	actividades:'',monto:'', montoStr:'', objetivo:'', nomBenefactor:''};
	   }else{
		   edit=true;
	   }
	   var title = pos=='0'?'Programa federal':
		   				pos=='1'?'Programa estatal':
		   					pos=='2'?'Programa local':'Proyecto OSC';
	   
	   new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	   registry.byId('dDetail').on('hide',function(){
		   registry.byId('dDetail').destroyRecursive(false);
	   });
	   registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	   registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	   
	   jsUtils.createTag('div','prCnt','dcDetail');
	   dom.byId('prCnt').innerHTML='<table border="0" align="lefth" >'+
	   '<tr><td>'+
	   '	<b>*Programa: </b><div id="prSelect" /><br/>'+
	   '</td></tr>'+
	   '<tr id="otroProg" style="display:none"><td>'+
	   '	<b>*Otro Programa:</div> </b><div id="nomOtroPrograma"/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>*Estatus del Recurso:</b> <br/><input id="indRecurso2"/><label for="indRecurso2">El consejo conoce el monto del recurso y lo maneja</label><br/>'+
	   '	<input id="indRecurso1"/><label for="indRecurso1">El consejo conoce el monto del recurso pero no lo maneja</label><br/>'+
	   '	<input id="indRecurso0"/><label for="indRecurso0">El consejo no conoce el monto del recurso</label><br/><br/>'+
	   '</td></tr>'+
	   '<tr id="trMonto"><td> '+
	   '	 <b>*Monto Asignado</b><br/>N\u00FAmero:<input id="monto"/> Letra:<input id="montoStr"/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>*Ciclo escolar de ingreso al programa:</b> <input id="anioIngreso"/><br/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>*Actividades que se realizar&aacute;n para alcanzar las metas y objetivos:</b><br/> <input id="actividades"/>'+
	   '</td></tr>  '+
	   '<tr><td>'+
	   '	<b>*Metas y objetivos del programa:<b><br/> <input id="objetivo"/>'+
	   '</td></tr>'+
	   '<tr id="trOrg" style="display:none"><td>'+
	   '	<b>*Nombre de la organizaci\u00F3n de la sociedad civil que apoya:<b><br/> <input id="nomBenefactor"/>'+
	   '</td></tr>'+
	   '</table>';
	   
	   var data=[{name:"[Seleccione]",	id:"0"}];
	    
	   for(var a in listcPrograma){
		   for(var i in listcPrograma[a]){
			  
			   if(prId==listcPrograma[a][i].tpoPrograma){
				   data.push({name:listcPrograma[a][i].nomPrograma,id:listcPrograma[a][i].cPrograma});
			   }
		   }
	   }
	   var pStore = new Memory({
	        data: data
	    });
	   
	   new FilteringSelect({
           id: 'prSelect',
           value:itemToEdit.cPrograma,
           store: pStore,
           readOnly:edit,
           searchAttr: 'name'
       }, 'prSelect').on ('change', function(){ 
    	   
    	   if(registry.byId('prSelect').get('displayedValue')=='Otro'){
    		   	 registry.byId('nomOtroPrograma').set('required', true);
	  			 dom.byId('otroProg').style.display='block';
    	   }
    	   else{
    		   registry.byId('nomOtroPrograma').set('required', false);
    		   dom.byId('otroProg').style.display='none'; 
    		   registry.byId('nomOtroPrograma').reset();
    	   }
       });
	   
	  new RadioButton({
           checked: true,
           value: 2,
           name: "indRecurso"
       }, "indRecurso2");
	   
	  new RadioButton({
           checked: false,
           value: 1,
           name: "indRecurso"
       }, "indRecurso1");
	   
	   new RadioButton({
           checked: false,
           value: 0,
           name: "indRecurso"
       }, "indRecurso0").on ('change', function(){ 
    	   if(registry.byId('indRecurso0').checked){
	    		 registry.byId('monto').set('required', false);
	  			 registry.byId('montoStr').set ('required',false);
	  			 dom.byId('trMonto').style.display='none';
	  			 registry.byId('monto').set('value','');
	  			 registry.byId('montoStr').set('value','');
           }else{
        	   	 registry.byId('monto').set('required', true);
    			 registry.byId('montoStr').set ('required',true);
    			 dom.byId('trMonto').style.display='block';
    			 
           } 
       });
       
	   new ValidationTextBox({
           promptMessage:"Capture solo n\u00FAmeros",
           id:'monto',
           regExp: constants.NUMBER_VALID,
           value:itemToEdit.monto, 
           trim:"true",  
           maxLength:"9",
           required: "true",
           style:"display:block; width:80px"
        }, 'monto').on ('Blur', function(){;
	   
			   var monto= registry.byId("monto").get('value');
		       
		       if(monto!=''){
			       
			       if(monto==0){
			    	   jsUtils.cstmAlert('Favor de registrar una cantidad mayor a 0.');
			    	   registry.byId('monto').set('value', '');
			    	   registry.byId('montoStr').set('value','');
			    	   return;
			       }
				      
		    		registry.byId('montoStr').set('value', 
					   jsUtils.covertirNumLetras(registry.byId("monto").get('value')));
		       }
        });
	   
	   
	   new ValidationTextBox({
           promptMessage:"Capture solo letras",
           value:itemToEdit.montoStr, 
           regExp:constants.NoNUMBER_VALID,
           id:'montoStr',
           trim:"true",    
           maxLength:"200",
           style:"display:block",
           readOnly: true,
           required: "true"
        }, 'montoStr');
	   
	   if (itemToEdit.indRecurso==1){registry.byId('indRecurso1').set('checked',true);}
	   if (itemToEdit.indRecurso==0){registry.byId('indRecurso0').set('checked',true);}
	   if (itemToEdit.indRecurso==2){registry.byId('indRecurso2').set('checked',true);}
	   
	   new ValidationTextBox({
           promptMessage:"Capture el nombre de su programa",
           value:itemToEdit.nomOtroPrograma, 
           trim:"true",    
           maxLength:"100",
           style:"display:block"
        }, 'nomOtroPrograma');
	  
	   new ValidationTextBox({
           promptMessage:"Capture el nombre de la organizaci\u00F3n",
           value:itemToEdit.nomBenefactor, 
           trim:"true",    
           maxLength:"100",
        }, 'nomBenefactor');
	   
	   
	   if(listProgramas[pos].id=='proyOSCPane'){
		   dom.byId('trOrg').style.display='block';
		   registry.byId('nomBenefactor').set('required', true);
	   }
	   
	   if(registry.byId('prSelect').get('displayedValue')=='Otro'){
		   	 registry.byId('nomOtroPrograma').set('required', true);
			 dom.byId('otroProg').style.display='block';
	   }
	   
	   new ValidationTextBox({
           promptMessage:"aaaa-aaaa",
           value:itemToEdit.anioIngreso, 
           regExp:constants.CICLO_ESCOLAR_VALID,
           trim:"true",    
           maxLength:"9",
           required:"true"
        }, 'anioIngreso');
	   
	   new Textarea({
			value : itemToEdit.actividades,
			trim : true,
			maxLength: 250,
			//uppercase: true,
			style : "width:400px;",
			//required:true
		}, "actividades");
	   
	   new Textarea({
			value :itemToEdit.objetivo,
			trim : true,
			maxLength: 250,
			//uppercase: true,
			style : "width:400px;",
			//required:true
		}, "objetivo");
	   
	   jsUtils.createTag('div','prBtnAceptar','dcDetail');
	   new Button({
			label : " Aceptar ",
			onClick : function() {
					var progSelect=registry.byId('prSelect').get('value');
					var actividades=registry.byId('actividades').get('value');
					var objetivos=registry.byId('objetivo').get('value');
					
					var form = registry.byId('dDetail');
					if ( form.validate() == false){  
						jsUtils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					else {
						if(actividades==''|| objetivos==''){
							jsUtils.cstmAlert('Favor de registrar sus actividades, metas y objetivos');
							return false;
						}
					}
					
					if(progSelect!=0){
							
							//Se valida el ciclo escolar.
							var ciclo_escolar=registry.byId('anioIngreso').get('value');
							var ciclo=jsUtils.cicloFormat(ciclo_escolar);
							if(ciclo!=1){
								jsUtils.cstmAlert('Favor de registrar un ciclo escolar v\u00E1lido');
								return false;
							}
							//Se obtienen los valores de los campos para guardarlos.
							try{
							   var grid=registry.byId(prId+'Grid');
							   var indRecurso=0;
							   var indRecursoStr="El consejo no conoce el monto del recurso";
							   if(registry.byId('indRecurso2').checked==true){
								   indRecurso=2;
								   indRecursoStr="El consejo conoce el monto del recurso y lo maneja";
							   }else if(registry.byId('indRecurso1').checked==true){
								   indRecurso=1;
								   indRecursoStr="El consejo conoce el monto del recurso pero no lo maneja";
							   }else if(registry.byId('indRecurso0').checked==true){
								   indRecurso=0;
								   indRecursoStr="El consejo no conoce el monto del recurso";
							   }
							   var nomPrograma=registry.byId('prSelect').get('displayedValue');
							   var nomOtroPrograma = registry.byId('nomOtroPrograma').get('value');

							   nomPrograma = nomPrograma + (nomOtroPrograma?(': '+ nomOtroPrograma):'');
							   
							   if(edit){
									var index = grid.selection.selectedIndex;
									var item = grid.getItem(index);
									grid.store.setValue(item, 'nomPrograma', nomPrograma);
									grid.store.setValue(item, 'nomOtroPrograma', nomOtroPrograma);
									grid.store.setValue(item, 'indRecurso', indRecurso);
									grid.store.setValue(item, 'indRecursoStr',indRecursoStr);
									grid.store.setValue(item, 'anioIngreso', registry.byId('anioIngreso').get('value'));
									grid.store.setValue(item, 'actividades',registry.byId('actividades').get('value'));
									grid.store.setValue(item, 'monto',registry.byId('monto').get('value'));
									grid.store.setValue(item, 'montoStr',registry.byId('montoStr').get('value'));
									grid.store.setValue(item, 'objetivo',registry.byId('objetivo').get('value'));
									
									if(listProgramas[pos].id=='proyOSCPane'){
										grid.store.setValue(item, 'nomBenefactor',registry.byId('nomBenefactor').get('value'));
									}
									
									grid.update();
								}else{
								   var myNewItem = {cPrograma: registry.byId('prSelect').get('value'), 
								   					nomPrograma: nomPrograma, 
								   					nomOtroPrograma: nomOtroPrograma, 
												    indRecurso: indRecurso, 
												    indRecursoStr:indRecursoStr,
												    anioIngreso: registry.byId('anioIngreso').get('value'),
												    actividades:registry.byId('actividades').get('value'),
												    monto:registry.byId('monto').get('value'),
												    montoStr:registry.byId('montoStr').get('value'),
												    objetivo:registry.byId('objetivo').get('value')
												   };
								   if(listProgramas[pos].id=='proyOSCPane'){
									   lang.mixin(myNewItem, {nomBenefactor:registry.byId('nomBenefactor').get('value')});
								   }
								   
							       grid.store.newItem(myNewItem);
								}
								   registry.byId('dDetail').destroyRecursive(false);
							}catch(e){
								console.log(e);
								jsUtils.cstmAlert('El programa seleccionado ya ha sido agregado, favor de verificar');
							}
					}
					else {
						jsUtils.cstmAlert('Favor de seleccionar un programa');
					}
			}
		},'prBtnAceptar');
	   
   }
   
   function eventoDetail(cEvento,itemToEdit){
	   var edit=false;
	   if(!itemToEdit){
		   itemToEdit={cEvento:0,nomOtroEvento: '', periodoRealizado:'',actividades:'',objetivo:''};
	   }else{
		   edit=true;
	   }
	   new Dialog({id:'dDetail',title:'Evento', content :'<div id="dcDetail"/>'}).show();
	   registry.byId('dDetail').on('hide',function(){
		   registry.byId('dDetail').destroyRecursive(false);
	   });
	   registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	   registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	   
	   jsUtils.createTag('div','evCnt','dcDetail');
	   dom.byId('evCnt').innerHTML='<table border="0" align="lefth" >'+
	   '<tr><td>'+
	   '	<b>*Evento: </b><div id="evSelect" /><br/>'+
	   '</td></tr>'+
	   '<tr id=otroEv style="display:none"><td>'+
	   '	<b>*Otro Evento:</div> </b><div id="nomOtroEvento"/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>*Ciclo escolar de inicio del proyecto:</b> <input id="periodoRealizado"/><br/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>*Actividades que se realizar&aacute;n para alcanzar las metas y objetivos:</b><br/> <input id="actividades"/>'+
	   '</td></tr>  '+
	   '<tr><td>'+
	   '	<b>*Metas y objetivos del evento:<b><br/> <input id="objetivo"/>'+
	   '</td></tr>'+
	   '</table>';
	   
	   var data=[{name:"[Seleccione]",	id:"0"}];
	   
	   for(var i in cEvento){
		   data.push({name:cEvento[i].nomEvento,id:cEvento[i].cEvento});
	   }
	   var pStore = new Memory({
	        data: data
	    });
	   
	   new FilteringSelect({
           id: 'evSelect',
           value:itemToEdit.cEvento,
           store: pStore,
           readOnly:edit,
           searchAttr: 'name'
       }, 'evSelect').on ('change', function(){ 
    	   
    	   if(registry.byId('evSelect').get('displayedValue')=='Otro'){
    		   	 registry.byId('nomOtroEvento').set('required', true);
	  			 dom.byId('otroEv').style.display='block';
    	   }
    	   else{
    		   registry.byId('nomOtroEvento').set('required', false);
    		   dom.byId('otroEv').style.display='none'; 
    		   registry.byId('nomOtroEvento').reset();
    	   }
       });
	   
	   new ValidationTextBox({
           promptMessage:"Capture el nombre de su evento",
           value:itemToEdit.nomOtroEvento, 
           trim:"true",    
           maxLength:"25",
           style:"display:block",
        }, 'nomOtroEvento');
	   
	   if(registry.byId('evSelect').get('displayedValue')=='Otro'){
		   	 registry.byId('nomOtroEvento').set('required', true);
			 dom.byId('otroEv').style.display='block';
	   }
	   
	   new ValidationTextBox({
           promptMessage:"aaaa-aaaa",
           value:itemToEdit.periodoRealizado, 
           regExp:constants.CICLO_ESCOLAR_VALID,
           trim:"true",    
           maxLength:"9",
           required:"true"
        }, 'periodoRealizado');
	   new Textarea({
			value : itemToEdit.actividades,
			trim : true,
			maxLength: 250,
			style : "width:400px;"
		}, "actividades");
	   new Textarea({
			value :itemToEdit.objetivo,
			trim : true,
			maxLength: 250,
			style : "width:400px;"
		}, "objetivo");
	   
	   jsUtils.createTag('div','evBtnAceptar','dcDetail');
	   new Button({
			label : " Aceptar ",
			onClick : function() {
				
					var evSelect=registry.byId('evSelect').get('value');
					var actividades=registry.byId('actividades').get('value');
					var objetivos=registry.byId('objetivo').get('value');
					
					var grid = registry.byId('eventosGrid');
					var form = registry.byId('dDetail');
					if ( form.validate() == false){  
						jsUtils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					else {
						if(actividades==''|| objetivos==''){
							jsUtils.cstmAlert('Favor de registrar sus actividades, metas y objetivos');
							return false;
						}
					}
					
					if(evSelect!=0){
						
						//Se valida el ciclo escolar.
						var ciclo_escolar=registry.byId('periodoRealizado').get('value');
						var ciclo=jsUtils.cicloFormat(ciclo_escolar);
						if(ciclo!=1){
							jsUtils.cstmAlert('Favor de registrar un ciclo escolar v\u00E1lido');
							return false;
						}
						try{
							var nomEvento=registry.byId('evSelect').get('displayedValue');
							//var nomOtroEvento = registry.byId('evSelect').get('displayedValue');
							   if(nomEvento=='Otro'){
								   nomEvento='Otro:'+registry.byId('nomOtroEvento').get('value');
							   }
							if(edit){
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);
								grid.store.setValue(item, 'nomEvento',nomEvento);
								grid.store.setValue(item, 'nomOtroEvento',registry.byId('nomOtroEvento').get('value'));
								grid.store.setValue(item, 'periodoRealizado', registry.byId('periodoRealizado').get('value'));
								grid.store.setValue(item, 'actividades', registry.byId('actividades').get('value'));
								grid.store.setValue(item, 'objetivo', registry.byId('objetivo').get('value'));
								grid.update();
							}else{
							   var myNewItem = {cEvento: registry.byId('evSelect').get('value'), 
									    nomEvento: nomEvento, 
			                    		nomOtroEvento: registry.byId('nomOtroEvento').get('value'),
			                    		periodoRealizado: registry.byId('periodoRealizado').get('value'),
									    actividades:registry.byId('actividades').get('value'),
									    objetivo: registry.byId('objetivo').get('value')};
								 
						       grid.store.newItem(myNewItem);  
							}
						    registry.byId('dDetail').destroyRecursive(false);
						}catch(e){
							jsUtils.cstmAlert('El evento seleccionado ya ha sido agregado, favor de verificar');
							console.log(e);
						}
					}
					else {
						jsUtils.cstmAlert('Favor de seleccionar un evento');
					}
			}
		},'evBtnAceptar');
	   
   }
      
   
   function saveTerceraSesion(cct) {
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
		var actividadesArray = registry.byId('nomActividad').get(
				'value');

		// Carga los objetos tipo CeActSesion
		for ( var i in actividadesArray) {
			actividades.push({
				cActividad : actividadesArray[i]
			});
		}
		
		//Programas
		
		var programas = new Array();
		
		if(array.indexOf(gActividades,51)!=-1){
				// Se recorre cada una de las categorias de los programas
				for( var a=0; a<listProgramas.length; a++){
					var grid = registry.byId(listProgramas[a].tpoPrograma+'Grid');
					// Obtiene la informaci—n del Grid
					// Se recorre el grid de acuerdo  a la categoria.
					for ( var i = 0; i < grid.rowCount; i++) {
						var item = grid.getItem(i);
						//Se compara el id del programa del grid con la lista del programas en el catalogo
						//para obtener el campo nomOtroPrograma y guardar el valor
										
						var programa = {
									cPrograma : grid.store.getValue(item,'cPrograma'),
									nomOtroPrograma: grid.store.getValue(item,'nomOtroPrograma'),
									indRecurso : grid.store.getValue(item,'indRecurso'),
									anioIngreso : grid.store.getValue(item,'anioIngreso'),
									actividades : grid.store.getValue(item, 'actividades'),
									objetivo : grid.store.getValue(item,'objetivo'),
									montoStr : grid.store.getValue(item, 'montoStr'),
									monto : grid.store.getValue(item,'monto'),
						};
						
						if(listProgramas[a].id=='proyOSCPane'){
							lang.mixin(programa, {nomBenefactor:grid.store.getValue(item,'nomBenefactor')});
							
						}
						
						programas.push(programa);
					}
				}
		}
		
		//Seguimiento Municipal
		
			var cmSeguimiento={};
			
			if(array.indexOf(gActividades,53)!=-1){
				//Primer Pregunta
				var indConsejoMun=0;
				if(registry.byId('indConsejoMun2').checked){
					 indConsejoMun = registry.byId("indConsejoMun2").get('value');
				}
				if(registry.byId('indConsejoMun0').checked){
					 indConsejoMun = registry.byId("indConsejoMun0").get('value');
				}
				if(registry.byId('indConsejoMun1').checked){
					 indConsejoMun = registry.byId("indConsejoMun1").get('value');
				}
				
				//Segunda pregunta
				var indSegEnlace=0;
				var acciones=null;
				if(registry.byId('indSegEnlace1').checked){
					indSegEnlace=registry.byId("indSegEnlace1").get('value');
					acciones=registry.byId("accionesSeg").get('value');
				}
				
				if(registry.byId('indSegEnlace0').checked){
					indSegEnlace=registry.byId("indSegEnlace0").get('value');
				}
				
				//Tercera pregunta
				var indApoyoProg=0;
				if(registry.byId('indApoyoProg1').checked){
					indApoyoProg=registry.byId("indApoyoProg1").get('value');
				}
				if(registry.byId('indApoyoProg0').checked){
					indApoyoProg=registry.byId("indApoyoProg0").get('value');
				}
				
				//Cuarta pregunta
				var indApoyo=0;
				var desApoyo=null;
				if(registry.byId('indApoyo1').checked){
					indApoyo=registry.byId("indApoyo1").get('value');
					desApoyo=registry.byId("desAoyo").get('value');
				}
				if(registry.byId('indApoyo0').checked){
					indApoyo=registry.byId("indApoyo0").get('value');
				}
				
				
				//Quinta pregunta
				
				var indApoyoGestion=0;
				var desApoyoStr=null;
				var institucionGestionStr=null;
			
				if(registry.byId('indApoyoGestion1').checked){
					indApoyoGestion=registry.byId("indApoyoGestion1").get('value');
					desApoyoStr=registry.byId("desAoyoGestion").get('value');
					institucionGestionStr=registry.byId("institucionGestion").get('value');
				}
				if(registry.byId('indApoyoGestion0').checked){
					indApoyoGestion=registry.byId("indApoyoGestion0").get('value');
				}
				
				//Sexta pregunta
				var indConsejoEst=0;
				
				if(registry.byId('indConsejoEst2').checked){
					indConsejoEst=registry.byId("indConsejoEst2").get('value');
				}
				if(registry.byId('indConsejoEst0').checked){
					indConsejoEst=registry.byId("indConsejoEst0").get('value');
				}
				if(registry.byId('indConsejoEst1').checked){
					indConsejoEst=registry.byId("indConsejoEst1").get('value');
				}
				
				cmSeguimiento = {
						indConsejoMun:indConsejoMun,					//Primer pregunta
						indSegEnlace:indSegEnlace, 						//Segunda Pregunta
						accionesSeg: acciones,
						indApoyo: indApoyo, 							//Cuarta Pregunta
						desApoyo: desApoyo,
						indApoyoGestion: indApoyoGestion,				//Quinta Pregunta
						desApoyoGestion: desApoyoStr,
						institucionGestion: institucionGestionStr,
						indConsejoEst:indConsejoEst,					//Sexta pregunta
						indApoyoProg:indApoyoProg						//Tercer pregunta
					};
			}
			
			//Eventos
			
			var eventos = new Array();
			
			if(array.indexOf(gActividades,52)!=-1){
				
					var gridEventos = registry.byId('eventosGrid');
					
					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridEventos.rowCount; i++) {
						var item = gridEventos.getItem(i);

						var evento = {
								cEvento: gridEventos.store.getValue(item,'cEvento'),
								nomOtroEvento: gridEventos.store.getValue(item,'nomOtroEvento'),
								periodoRealizado: gridEventos.store.getValue(item,'periodoRealizado'),
								actividades: gridEventos.store.getValue(item, 'actividades'),
								objetivo: gridEventos.store.getValue(item,'objetivo')
								
						};
						
						eventos.push(evento);
				
				}
					
			}
			
		   var terceraSesion = {
				ceInfGral : ceInfGral,
				ceSesion : ceSesion,
				actividades : actividades,
				programas : programas,
				eventos: eventos,
				seguimientoMunicipal:cmSeguimiento
			};

			console.log(json.toJson(terceraSesion));
			
			
			if(array.indexOf(gActividades,51)!=-1){
				if(terceraSesion.programas.length==0){
					jsUtils.cstmAlert('Debe registrar al menos uno de los programas o proyectos');
					return;
				}
			}
			
			if(array.indexOf(gActividades,52)!=-1){
				if(terceraSesion.eventos.length==0){
					jsUtils.cstmAlert('Debe registrar al menos un evento');
					return;
				}
			}
			
			var urlJson = dojo.config.app.urlBase+ 'terceraSesion/saveTerceraSesion';
			
			xhr.post({
						url : urlJson,
						postData : json.toJson(terceraSesion),
						headers : {
							"Content-Type" : "application/json; charset=UTF-8"
						},
						handleAs : 'json',
						handle : function(response) {
							if (response == 'SyntaxError: syntax error') {
			    	            window.location.reload();
							}else if (response != 1) {
			                	jsUtils.cstmAlert(
								'Ocurri\u00F3 un error al registrar la informaci\u00F3n de su Consejo Escolar.');
			                	standby.hide();
							} else {
								jsUtils.cstmAlert(
								'La actualizaci\u00F3n se realiz\u00F3 correctamente.');						
								reuniones.refresh(cct);
								standby.hide();
							}

							registry.byId('dialogCaptiraDG').destroyRecursive(false);
						}
			}).progress(standby.show());
		
   }
   
   
   
    return {
	   init:init,
	   saveTerceraSesion:saveTerceraSesion
	   };
  
});

