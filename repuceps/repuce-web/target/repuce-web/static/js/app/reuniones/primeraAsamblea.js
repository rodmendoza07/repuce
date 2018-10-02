define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/grid/DataGrid","dojo/data/ItemFileWriteStore", 
         "dojo/store/Memory", "dojo/dom", "dijit/form/ValidationTextBox","dijit/form/FilteringSelect",
         "dojo/_base/json","dojo/on","app/util/constants","dijit/form/Button", "dijit/form/Form",
         "dojo/_base/xhr","dojo/_base/lang","dojox/widget/Standby","app/reuniones/reuniones", 
         "app/util/constants","dijit/Dialog","dojo/_base/lang"], 
function( ContentPane,registry,array,utils,DataGrid,ItemFileWriteStore,
		Memory, dom,ValidationTextBox,FilteringSelect,json,on,constants,Button,Form,xhr,
		lang,Standby,reuniones, constants,Dialog,lang){

   var primeraAsamblea= new Object();
   var maxIndex = 0;
   var maxIndexAsist = 0;
   var gActividades= new Array();

   function init(actividades,cct, ReunionObj){
	   primeraAsamblea=!ReunionObj?{}:ReunionObj;
	   	gActividades=actividades;
	   
	   _integrantes(array.indexOf(actividades, 11)!=-1 || 
			   array.indexOf(actividades, 12)!=-1);   
	   asistentes(array.indexOf(actividades, 11)!=-1 || 
			   array.indexOf(actividades, 12)!=-1, primeraAsamblea);
    }

   var jsonCargoStore = new Object();
   xhr.get({
       url: dojo.config.app.urlBase + "catalogos/cargos/1",
       sync: false, preventCache:true,handleAs: "json",
       contentType: "application/x-www-form-urlencoded; charset=utf-8"
   } ).then(function(data){
	   jsonCargoStore={ identifier: data.identifier,
			      		items: data.items};
   });
      
   var jsonCalidadStore = new Object();
   xhr.get({
       url: dojo.config.app.urlBase + "catalogos/listCalidades",
       sync: false, preventCache:true,handleAs: "json",
       contentType: "application/x-www-form-urlencoded; charset=utf-8"
   } ).then(function(data){
	   jsonCalidadStore={ identifier: data.identifier,
	      		items: data.items};
   });
   
   var jsonNivelEducStore = new Object() ;
   xhr.get({
        url:dojo.config.app.urlBase+"catalogos/listNivelesEduc",
        sync: false, preventCache:true,handleAs: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
    } ).then(function(data){
    	jsonNivelEducStore={ identifier: data.identifier,
	      		items: data.items};
    });
   
   var jsonGradoStore = new Object() ;
   xhr.get({
        url:dojo.config.app.urlBase+"catalogos/listGrados",
        sync: false, preventCache:true,handleAs: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
    } ).then(function(data){
    	jsonGradoStore={ identifier: data.identifier,
	      		items: data.items};
    });
   
   // Se crea el store del genero 
   var jsonGeneroStore ={ identifier: 'genero',
	            label: 'nomGenero',
	            items: [{genero: 'M',nomGenero: 'Masculino'},
	                	{genero: 'F',nomGenero: 'Femenino'}]};
  
   function _integrantes(crea){
	   if(crea)	{			
		   if(!registry.byId("integrantesPane")){
			   		var integrantesPane = 'integrantesPane';
			   
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:"Integrantes",
			           id:integrantesPane
			       })); 

				   registry.byId('pestanias').selectChild( registry.byId(integrantesPane), true);

				   //set up layout
				    var layout = [[
				      { name: 'Id',						field: 'cscIntegrante', 	width: '1px', hidden:true},
				      { name: 'Apellido Paterno',		field: 'paternoIntegrante',	width: '130px'},      
					  { name: 'Apellido Materno',		field: 'maternoIntegrante',	width: '110px'},      
				      { name: 'Nombre', 				field: 'nombreIntegrante',	width: '130px'},
				      { name: 'Cargo en el Consejo',	field: 'nomCargo',			width: '110px'},
				      { name: 'Cargo en el Consejo',	field: 'cCargo',			width: '1px',hidden:true},
				      { name: 'CURP',					field: 'curp',				width: '110px'},
				      { name: 'En Calidad',			field: 'nomCalidad',		width: '100px'},
				      { name: 'En Calidad',			field: 'cCalidad',			width: '1px',hidden:true},
				      { name: 'Correo electr\u00F3nico',field: 'emailIntegrante',	width: '100px'},
				      { name: 'Tel\u00E9fono',			field: 'telIntegrante',		width: '90px' },
				      { name: 'Escolaridad', 			field: 'nomNiveleduc',		width: '100px'},
				      { name: 'Escolaridad', 			field: 'cNiveleduc',		width: '1px',hidden:true},
				      { name: 'G\u00E9nero',			field: 'nomGenero',			width: '80px' },
				      { name: 'G\u00E9nero',			field: 'genero',			width: '1px' ,hidden:true},
				      { name: 'Tiene hijos estudiando en el Centro Escolar', field: 'nomGrado',width: '100px'},
				      { name: 'Tiene hijos estudiando', field: 'cGrado',width: '1px',hidden:true},
				      { name: 'Alta', field: 'fchAlta', width: '1px', hidden:true}]];
				    
				    var integrantes = primeraAsamblea.integrantes?primeraAsamblea.integrantes:[];
				    
					for (var i in integrantes) {
						for(var j in jsonCargoStore.items){
							if(jsonCargoStore.items[j].cCargo==integrantes[i].cCargo){
								lang.mixin(integrantes[i],{nomCargo : jsonCargoStore.items[j].nomCargo});
							}
						}
						
						for(var j in jsonCalidadStore.items){
							if(jsonCalidadStore.items[j].cCalidad==integrantes[i].cCalidad){
								lang.mixin(integrantes[i],{nomCalidad : jsonCalidadStore.items[j].nomCalidad});
							}
						}
						for(var j in jsonNivelEducStore.items){
							if(jsonNivelEducStore.items[j].cNiveleduc==integrantes[i].cNiveleduc){
								lang.mixin(integrantes[i],{nomNiveleduc : jsonNivelEducStore.items[j].nomNiveleduc});
							}
						}
						for(var j in jsonGradoStore.items){
							if(jsonGradoStore.items[j].cGrado==integrantes[i].cGrado){
								lang.mixin(integrantes[i],{nomGrado : jsonGradoStore.items[j].nomNivel});
							}
						}
						for(var j in jsonGeneroStore.items){
							if(jsonGeneroStore.items[j].genero==integrantes[i].genero){
								lang.mixin(integrantes[i],{nomGenero : jsonGeneroStore.items[j].nomGenero});
							}
						}
						
						var lastValue = integrantes[i].cscIntegrante;
						if(maxIndex<=lastValue)
							maxIndex = lastValue;
					}
					
					var dataJsonStore = {
						identifier: 'cscIntegrante',
						items: integrantes
					};

					//Se crea el store de los integrantes.
					var jsonStore = new ItemFileWriteStore({data: dataJsonStore});
					
					
					utils.createTag('div','gridIntegrantes',integrantesPane);
					   
				   dom.byId('gridIntegrantes').innerHTML='<table border="0" align="left" width= "530px">'+
				  
				   '<tr>' +
				   	   '<td><input id="grid"/></td>'+
				   '</tr>'+
				   '<tr>' +
			   	   '<td><input id="addRow"/> <input id="Editar"/> <input id="removeRow"/> </td>'+
				   '</tr>'+
				  
				   '</table>';
					
					//create a new grid:
					new DataGrid({
					    id: 'grid',
					    store: jsonStore,
				        //autoHeight: true,
					    structure: layout,
					    rowSelector:'10px'
					    //height: '50px'
				        //width: '700px'
					    },
					    "grid").startup();
					
					//utils.createTag('div','addRow',integrantesPane);
					new Button({
						label : constants.TEXT_BUTTON_AGREGAR_INTEGRANTE,
						onClick : function() {
							_detalleIntegrante();
						}
					}, "addRow");
   
					//utils.createTag('div','Editar',integrantesPane);
					
					new Button({
						label : constants.TEXT_BUTTON_EDITAR_INTEGRANTE,
						onClick : function(){ 
							var grid = registry.byId('grid');
							var items = grid.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEdit={
					                		cscIntegrante: grid.store.getValue(selectedItem,'cscIntegrante'), 
						      				paternoIntegrante: grid.store.getValue(selectedItem,'paternoIntegrante'),
						      				maternoIntegrante: grid.store.getValue(selectedItem,'maternoIntegrante'), 
						       				nombreIntegrante: grid.store.getValue(selectedItem,'nombreIntegrante'),
						       				cCargo: grid.store.getValue(selectedItem,'cCargo'),
						       				curp: grid.store.getValue(selectedItem,'curp'),
						       				cCalidad: grid.store.getValue(selectedItem,'cCalidad'),
						       				emailIntegrante: grid.store.getValue(selectedItem,'emailIntegrante'), 
						       				telIntegrante: grid.store.getValue(selectedItem,'telIntegrante'),
						       				cNiveleduc: grid.store.getValue(selectedItem,'cNiveleduc'), 
						       				genero: grid.store.getValue(selectedItem,'genero'),
						       				cGrado: grid.store.getValue(selectedItem,'cGrado'),
						       				nomCargo: grid.store.getValue(selectedItem,'nomCargo'),
						       				nomCalidad: grid.store.getValue(selectedItem,'nomCalidad'),
						       				nomNiveleduc: grid.store.getValue(selectedItem,'nomNiveleduc'),
						       				nomGrado: grid.store.getValue(selectedItem,'nomGrado'),
						       				nomGenero: grid.store.getValue(selectedItem,'nomGenero')
										    };
					                	_detalleIntegrante(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'Editar');
   
					utils.createTag('div','removeRow',integrantesPane);

					new Button({
						label: constants.TEXT_BUTTON_ELIMINAR_INTEGRANTE,
						onClick: function(){
							var grid = registry.byId('grid');
							grid.removeSelectedRows();
							grid.store.save();
						}
					}, "removeRow");

				}

	   }else{
		   if(registry.byId("integrantesPane")){
			   registry.byId('pestanias').closeChild(registry.byId("integrantesPane"));
		   }
	   }
   }
   
   /*
    * Función generica que genera la pestaña con la información de los
    * asistentes a las reuniones.
    */
   function asistentes(crea, reunionObj){
	   if(crea)	{			
		   if(!registry.byId("asistentesPane")){
	
			   var asistentesPane = 'asistentesPane';
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Asistentes",
		           id:asistentesPane
		       })); 
			   
			   registry.byId('pestanias').selectChild( registry.byId(asistentesPane), true);
			   
			   //set up layout
			    var layoutAsist = [[ 
			      { name: 'Id',						field: 'cCct', 				width: '5px', hidden:true},
			      { name: 'Id',						field: 'cSesion', 			width: '5px', hidden:true},
			      { name: 'Id',						field: 'cscAsistente', 		width: '5px', hidden:true},
			      { name: 'Apellido Paterno',		field: 'paternoAsistente',	width: '200px'},      
				  { name: 'Apellido Materno',		field: 'maternoAsistente',	width: '200px'},      
			      { name: 'Nombre', 				field: 'nombreAsistente',	width: '220px'},
			      { name: 'cCalidad',				field: 'cCalidad',			width: '5px' ,hidden:true},
			      { name: 'Calidad',				field: 'nomCalidad',		width: '200px' }
			      ]];
	
			    
			    var asistentes = reunionObj.asistentes?reunionObj.asistentes:[];
			    
				for (var i in asistentes) {
					for(var j in jsonCalidadStore.items){
						if(jsonCalidadStore.items[j].cCalidad==asistentes[i].cCalidad){
							lang.mixin(asistentes[i],{nomCalidad : jsonCalidadStore.items[j].nomCalidad});
						}
					}
				}
	
				maxIndexAsist = asistentes?asistentes.length:0;
				
				var dataJsonStoreAsist = {
						identifier: 'cscAsistente',
						items: asistentes
				};
  
			   //Se crea el store de los asistentes.
			   var jsonStoreAsist = new ItemFileWriteStore({data: dataJsonStoreAsist});
			   
			   utils.createTag('div','gridAsistentes',asistentesPane);
			   
			  dom.byId('gridAsistentes').innerHTML='<table border="0" align="left" width= "900px">'+
			   '<tr>' +
		   	   '	<td><input id="gridAsist"/></td>'+
			   '</tr>'+
			   '<tr>' +
		   	   	'<td><input id="addAsist"/> <input id="editAsist"/> <input id="removeAsist"/></td>'+
			   '</tr>'+
			   '</table>';
				  
			   //create a new grid:
			   new DataGrid({
				    id: 'gridAsist',
				    store: jsonStoreAsist,
			        //autoHeight: true,
				    structure: layoutAsist,
				    rowSelector:'10px',
				    height: '300px',
				    width: '800px'
				    },
				    "gridAsist").startup();
				
			   //utils.createTag('div','addAsist',asistentesPane);
			   new Button({
					label : constants.TEXT_BUTTON_AGREGAR_ASISTENTE,
					onClick : function() {
						_detalleAsistente();
					}
			   }, "addAsist");
	
			   //utils.createTag('div','editAsist',asistentesPane);
				
			   new Button({
					label : constants.TEXT_BUTTON_EDITAR_ASISTENTE,
					onClick : function(){ 
						var grid = registry.byId('gridAsist');
						var items = grid.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){	
				                	var itemToEdit={
				                		cscIntegrante: grid.store.getValue(selectedItem,'cscAsistente'), 
					      				paternoAsistente: grid.store.getValue(selectedItem,'paternoAsistente'),
					      				maternoAsistente: grid.store.getValue(selectedItem,'maternoAsistente'), 
					       				nombreAsistente: grid.store.getValue(selectedItem,'nombreAsistente'),
					       				cCalidad: grid.store.getValue(selectedItem,'cCalidad'),
					       				nomCalidad: grid.store.getValue(selectedItem,'nomCalidad')
									    };
				                	_detalleAsistente(itemToEdit);
				                 }
				             }); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
			   },'editAsist');
	
			   //utils.createTag('div','removeAsist',asistentesPane);
	
			   new Button({
					label: constants.TEXT_BUTTON_ELIMINAR_ASISTENTE,
					onClick: function(){
						var grid = registry.byId('gridAsist');
						grid.removeSelectedRows();
						grid.store.save();
					}
			   }, "removeAsist");
			   
			   //Si existe a pestaña de integrantes (En primera Asamblea), habilita la misma.
			   if(registry.byId('integrantesPane'))
				   registry.byId('pestanias').selectChild( registry.byId('integrantesPane'), true);

			}
	   }else{
		   if(registry.byId("asistentesPane")){
				   registry.byId('pestanias').closeChild(registry.byId("asistentesPane"));
		   }
	   }
	   
   }
   
   
   /*
    * Función genérica que crea la pantalla de captura y edición de los asistentes a las reuniones
    */
   function _detalleAsistente(itemToEdit){
	   var edit=false;
	   if(!itemToEdit){
		   itemToEdit= {cscAsistente: ++maxIndexAsist, 
      				paternoAsistente: '', maternoAsistente: '', 
       				nombreAsistente: '', emailAsistente: '', 
       				cCalidad: 0, nomCalidad: '', 
       		};   
	   }else{
		   edit=true;
	   }
	   
	   calidadStore = new dojo.data.ItemFileWriteStore({data: jsonCalidadStore});
	   
	   var dDetail =new Dialog({id:'dDetail', title:'Asistente', content :'<div id="dcDetail"/>'});
	   dDetail.show();
	   dDetail.on('hide',function(){
		   registry.byId('dDetail').destroyRecursive(false);
	   });
	   dDetail._setStyleAttr('left:20px !important;'); 
	   dDetail._setStyleAttr('top:20px !important;');

	   utils.createTag('div','intCnt','dcDetail');
	   dom.byId('intCnt').innerHTML='<table border="0" align="left" >'+
	   '<tr><td align="right">'+
	   '	<b>*Apellido Paterno: </b></td><td><div id="paternoAsistente"/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>&nbsp;Apellido Materno:</b></td><td><br/><div id="maternoAsistente"/><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>*Nombre:</b></td><td><br/><div id="nombreAsistente"/><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>*Calidad del asistente: </b></td><td><br/><div id="cCalidad"/><br/>'+
	   '</td></tr>'+
	   '</table>';
	   
	   var paternoAsistente=new ValidationTextBox({
		   value:itemToEdit.paternoAsistente,
           uppercase:'true',trim:"true",maxLength:"30",
           required: true
        }, 'paternoAsistente');
	   var maternoAsistente=new ValidationTextBox({
		   value:itemToEdit.maternoAsistente, 
           uppercase:'true',trim:"true", maxLength:"30"
        }, 'maternoAsistente');
	   var nombreAsistente=new ValidationTextBox({
		   value:itemToEdit.nombreAsistente,
           uppercase:'true',trim:"true",maxLength:"30",
           required: true
        }, 'nombreAsistente');
	   var cCalidad=new FilteringSelect({
           value:itemToEdit.cCalidad,
           store: calidadStore, 
           searchAttr:'nomCalidad'
        }, 'cCalidad');
	      
	   utils.createTag('div','inBtnAceptar','dcDetail');
	   new Button({
			label : " Aceptar ",
			onClick : function() {
					var form = registry.byId('dDetail');
					if (!form.validate()){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var grid = registry.byId('gridAsist');
					try{
						if(edit){
							var index = grid.selection.selectedIndex;
							var item = grid.getItem(index);
							grid.store.setValue(item, 'paternoAsistente', paternoAsistente.get('value'));
							grid.store.setValue(item, 'maternoAsistente', maternoAsistente.get('value'));
							grid.store.setValue(item, 'nombreAsistente', nombreAsistente.get('value'));
							grid.store.setValue(item, 'cCalidad', cCalidad.get('value'));
							grid.store.setValue(item, 'nomCalidad', cCalidad.get('displayedValue'));
							grid.update();
						}else{
						   var myNewItem = {cscAsistente: ++maxIndexAsist, 
						      				paternoAsistente: paternoAsistente.get('value'),
						      				maternoAsistente: maternoAsistente.get('value'), 
						       				nombreAsistente: nombreAsistente.get('value'),
						       				cCalidad: cCalidad.get('value'),
											nomCalidad: cCalidad.get('displayedValue')
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
   
   function _detalleIntegrante(itemToEdit){
	   var edit=false;
	   if(!itemToEdit){
		   itemToEdit= {cscIntegrante: ++maxIndex, 
      				paternoIntegrante: '', maternoIntegrante: '', 
       				nombreIntegrante: '', cCargo: 3, curp: '',
       				cCalidad: 1,
       				emailIntegrante: '', telIntegrante: '',
       				cNiveleduc: 1, genero:'F', cGrado:1
       		};   
	   }else{
		   edit=true;
	   }
	   
	   cargoStore = new dojo.data.ItemFileWriteStore({data: jsonCargoStore});
	   calidadStore = new dojo.data.ItemFileWriteStore({data: jsonCalidadStore});
	   nivelEducStore = new dojo.data.ItemFileWriteStore({data: jsonNivelEducStore});
	   gradoStore = new dojo.data.ItemFileWriteStore({data: jsonGradoStore});
	   generoStore = new dojo.data.ItemFileWriteStore({data: jsonGeneroStore});
	   
	   var dDetail =new Dialog({id:'dDetail', title:'Integrante del consejo escolar' ,content :'<div id="dcDetail"/>'});
	   dDetail.show();
	   dDetail.on('hide',function(){
		   registry.byId('dDetail').destroyRecursive(false);
	   });
	   dDetail._setStyleAttr('left:20px !important;'); 
	   dDetail._setStyleAttr('top:20px !important;');

	   utils.createTag('div','intCnt','dcDetail');
	   dom.byId('intCnt').innerHTML='<table border="0" align="left" >'+
	   '<tr><td align="right">'+
	   '	<b>*Apellido Paterno: </b></td><td><div id="paternoIntegrante"/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>&nbsp;Apellido Materno:</b></td><td><br/><div id="maternoIntegrante"/><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>*Nombre:</b></td><td><br/><div id="nombreIntegrante"/><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>*Cargo en el Consejo: </b></td><td><br/><div id="cCargo" /><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>*CURP: </b></td><td><br/><div id="curp" /><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>*En Calidad: </b></td><td><br/><div id="cCalidad" /><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>&nbsp;Correo electr\u00F3nico: </b></td><td><br/><div id="emailIntegrante"/><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>&nbsp;Tel\u00E9fono: </b></td><td><br/><div id="telIntegrante"/><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>*Escolaridad: </b></td><td><br/><div id="cNiveleduc"/><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>*G\u00E9nero: </b></td><td><br/><div id="genero"/><br/>'+
	   '</td></tr>'+
	   '<tr><td align="right">'+
	   '	<br/><b>*Tiene hijos estudiando<br/> en el Centro Escolar: </b></td><td><br/><br/><div id="cGrado"/><br/>'+
	   '</td></tr>'+
	   '</table>';
	   
	   var paternoIntegrante=new ValidationTextBox({
		   value:itemToEdit.paternoIntegrante,
           uppercase:'true',trim:"true",maxLength:"30",
           required: true
        }, 'paternoIntegrante');
	   var maternoIntegrante=new ValidationTextBox({
		   value:itemToEdit.maternoIntegrante, 
           uppercase:'true',trim:"true", maxLength:"30"
        }, 'maternoIntegrante');
	   var nombreIntegrante=new ValidationTextBox({
		   value:itemToEdit.nombreIntegrante,
           uppercase:'true',trim:"true",maxLength:"30",
           required: true
        }, 'nombreIntegrante');
	   
	   var cCargo=new FilteringSelect({
           value:itemToEdit.cCargo,
           store: cargoStore,required: true,
           searchAttr:'nomCargo'
        }, 'cCargo');
	   var curp=new ValidationTextBox({
		   value:itemToEdit.curp,
           regExp: constants.CURP_VALID,
           uppercase:'true',trim:"true",maxLength:"30",
           required: true
        }, 'curp');
	   var cCalidad=new FilteringSelect({
           value:itemToEdit.cCalidad,
           store: calidadStore,required: true,
           searchAttr:'nomCalidad'
        }, 'cCalidad');
	   
	   var emailIntegrante=new ValidationTextBox({
           value:itemToEdit.emailIntegrante, 
           trim:"true", maxLength:"50",
           regExp: constants.MAIL_VALID
        }, 'emailIntegrante');
	   var telIntegrante=new ValidationTextBox({
		   value:itemToEdit.telIntegrante, 
           regExp: constants.NUMBER_VALID,
           trim:"true",maxLength:"50"
        }, 'telIntegrante');
	   
	   var cNiveleduc=new FilteringSelect({
           value:itemToEdit.cNiveleduc,
           store: nivelEducStore, 
           searchAttr:'nomNiveleduc'
        }, 'cNiveleduc');
	   var genero=new FilteringSelect({
           value:itemToEdit.genero,
           store: generoStore,
           readOnly: true,
           searchAttr:'nomGenero'
        }, 'genero');
	   var cGrado=new FilteringSelect({
           value:itemToEdit.cGrado,
           store: gradoStore, 
           searchAttr:'nomNivel'
        }, 'cGrado');

	   curp.on('change',function(){
       	var curpValue = registry.byId('curp').get('value');
       	var sexo = '';
       	if(curpValue.length==18){
       		sexo = curpValue.substring(10,11);
       		if(sexo=='H')
       			registry.byId('genero').set('value','M');
           	else if(sexo=='M')
           		registry.byId('genero').set('value','F');
       	}
       });
	   
	   utils.createTag('div','inBtnAceptar','dcDetail');
	   new Button({
			label : " Aceptar ",
			onClick : function() {
					var form = registry.byId('dDetail');
					if (!form.validate()){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var grid = registry.byId('grid');
					try{
						if(edit){
							var index = grid.selection.selectedIndex;
							var item = grid.getItem(index);
							grid.store.setValue(item, 'paternoIntegrante', paternoIntegrante.get('value'));
							grid.store.setValue(item, 'maternoIntegrante', maternoIntegrante.get('value'));
							grid.store.setValue(item, 'nombreIntegrante', nombreIntegrante.get('value'));
							grid.store.setValue(item, 'cCargo', cCargo.get('value'));
							grid.store.setValue(item, 'curp', curp.get('value'));
							grid.store.setValue(item, 'cCalidad', cCalidad.get('value'));
							grid.store.setValue(item, 'emailIntegrante', emailIntegrante.get('value'));
							grid.store.setValue(item, 'telIntegrante', telIntegrante.get('value'));
							grid.store.setValue(item, 'cNiveleduc', cNiveleduc.get('value'));
							grid.store.setValue(item, 'genero', genero.get('value'));
							grid.store.setValue(item, 'cGrado', cGrado.get('value'));
							grid.store.setValue(item, 'nomCargo', cCargo.get('displayedValue'));
							grid.store.setValue(item, 'nomCalidad', cCalidad.get('displayedValue'));
							grid.store.setValue(item, 'nomNiveleduc', cNiveleduc.get('displayedValue'));
							grid.store.setValue(item, 'nomGrado', cGrado.get('displayedValue'));
							grid.store.setValue(item, 'nomGenero', genero.get('displayedValue'));
							grid.update();
						}else{
						   var myNewItem = {cscIntegrante: ++maxIndex, 
						      				paternoIntegrante: paternoIntegrante.get('value'),
						      				maternoIntegrante: maternoIntegrante.get('value'), 
						       				nombreIntegrante: nombreIntegrante.get('value'),
						       				cCargo: cCargo.get('value'),
						       				curp: curp.get('value'),
						       				cCalidad: cCalidad.get('value'),
						       				emailIntegrante: emailIntegrante.get('value'), 
						       				telIntegrante: telIntegrante.get('value'),
						       				cNiveleduc: cNiveleduc.get('value'), 
						       				genero: genero.get('value'),
						       				cGrado: cGrado.get('value'),
						       				nomCargo: cCargo.get('displayedValue'),
											nomCalidad: cCalidad.get('displayedValue'),
											nomNiveleduc: cNiveleduc.get('displayedValue'),
											nomGrado: cGrado.get('displayedValue'),
											nomGenero: genero.get('displayedValue')
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

   /*
    * Función para llevar a acbo la lectura de los asistentes capturados
    * @return lista con los objetos con la información de los asistentes
    */
   function leeAsistentes(){
		var asistentes = new Array();
		grid = registry.byId('gridAsist');
		
		// Obtiene la informacion de los asistentes
		for ( var i = 0; i < grid.rowCount; i++) {
	
			var item = grid.getItem(i);
			// Genera un nuevo objeto inegrante de cada renglon del
			// grid.
			
			if(grid.store.getValue(item,'paternoAsistente') == null || grid.store.getValue(item,'paternoAsistente') == ""
			   || grid.store.getValue(item,'nombreAsistente') == null || grid.store.getValue(item,'nombreAsistente') == ""	
			 ){
				utils.cstmAlert("Uno o m\u00e1s asistentes no cuentan con la informaci\u00F3n requerida");
				return false;
			}
			
			var asistente = {
				paternoAsistente : grid.store.getValue(item,'paternoAsistente'),
				maternoAsistente : grid.store.getValue(item,'maternoAsistente'),
				nombreAsistente : grid.store.getValue(item,'nombreAsistente'),
				cCalidad : grid.store.getValue(item, 'cCalidad')
			};
						
			asistentes.push(asistente);
		}
		return asistentes;
   }
   
	// Se manda a actualizar la informacion capturada
	function savePrimeraAsamblea(cct) {
		
		var standby = new Standby({
			target : "dialogCaptiraDG"
		});
		document.body.appendChild(standby.domNode);
		standby.startup();
	
		var form = registry.byId('registraPrimeraReunion');
		
		if ( form.validate() == false){return false;}  
			
		if(!_validateConsejo()){return false;}
		
		var ceInfGral = {cCct : cct};
		
		var ceSesion = {
			fchSesion : registry.byId('fechaRegistro').get('value'),
			horaIniSesion : registry.byId('horaInicio').get('value'),
			horaFinSesion : registry.byId('horaFinal').get('value'),
			numIntegrantes : registry.byId('numIntegrantes').get('value'),
			observaciones : registry.byId('observaciones').get('value')
		};

		var actividades = new Array();

		var actividadesArray = registry.byId('nomActividad').get('value');

		// Carga los objetos tipo CeActSesion
		for ( var i in actividadesArray) {
			var oa=null;
			
			if(actividadesArray[i]==13){
				oa= registry.byId('otraActividad').get('value')	;	
			}
			
			actividades.push({
				cActividad : actividadesArray[i],
				nomOtraActividad : oa
			});
			
		}

		var integrantes = new Array();

		// var actividades = [{cActividad: 11},{cActividad:12}];
		var grid = registry.byId('grid');
		
		// Obtiene la informaci—n del Grid
		for ( var i = 0; i < grid.rowCount; i++) {

			var item = grid.getItem(i);
			// Genera un nuevo objeto inegrante de cada renglon del
			// grid.
			if(grid.store.getValue(item,'paternoIntegrante') == null || grid.store.getValue(item,'paternoIntegrante') == ""
			   || grid.store.getValue(item,'nombreIntegrante') == null || grid.store.getValue(item,'nombreIntegrante') == ""	
			   || grid.store.getValue(item,'cCargo') == null || grid.store.getValue(item,'curp') == "" 
			   || grid.store.getValue(item,'cCargo') == ""
			   || grid.store.getValue(item,'cCalidad') == null || grid.store.getValue(item,'cCalidad') == ""
			 ){
				utils.cstmAlert("Uno o m\u00e1s integrantes no cuentan con la informaci\u00F3n requerida");
				return false;
			}
			
			var re = new RegExp(constants.MAIL_VALID);
			
			if (grid.store.getValue(item,'emailIntegrante') && !grid.store.getValue(item,'emailIntegrante').match(re)) {
				utils.cstmAlert("El correo electr\u00F3nico " + json.toJson(grid.store.getValue(item,'emailIntegrante')) +  " de " + 
						(grid.store.getValue(item,'paternoIntegrante')) + " " + (grid.store.getValue(item,'nombreIntegrante')) + " " + "es inv\u00e1lido");
				return false;
			}
						
			var integrante = {
				paternoIntegrante : grid.store.getValue(item,'paternoIntegrante'),
				maternoIntegrante : grid.store.getValue(item,'maternoIntegrante'),
				nombreIntegrante : grid.store.getValue(item,'nombreIntegrante'),
				cCargo : grid.store.getValue(item, 'cCargo'),
				curp : grid.store.getValue(item, 'curp'),
				cscIntegrante : grid.store.getValue(item,'cscIntegrante'),
				cCalidad : grid.store.getValue(item, 'cCalidad'),
				telIntegrante : grid.store.getValue(item,'telIntegrante'),
				emailIntegrante : grid.store.getValue(item,'emailIntegrante'),
				cNiveleduc : grid.store.getValue(item, 'cNiveleduc'),
				genero : grid.store.getValue(item, 'genero'),
				cGrado : grid.store.getValue(item, 'cGrado'),
				fchAlta: grid.store.getValue(item, 'fchAlta')
			};
						
			integrantes.push(integrante);
		}

		
		var primeraAsamblea = {
			ceInfGral : ceInfGral,
			ceSesion : ceSesion,
			actividades : actividades,
			integrantes : integrantes,
			asistentes: leeAsistentes()
		};

		console.log(json.toJson(primeraAsamblea));
		var urlJson = dojo.config.app.urlBase
				+ 'primeraAsamblea/savePrimeraAsamblea';
		
		xhr.post({
					url : urlJson,
					postData : json.toJson(primeraAsamblea),
					headers : {
						"Content-Type" : "application/json; charset=UTF-8"
					},
					handleAs : 'json',
					handle : function(response) {
						if (response == 'SyntaxError: syntax error') {
		    	            window.location.reload();
						}else if (response != 1) {
		                	utils.cstmAlert(
							'Ocurri\u00F3 un error al registrar la informaci\u00F3n de su Consejo Escolar.');
		                	standby.hide();
						} else {
							utils.cstmAlert(
							'La informaci\u00F3n de su Consejo Escolar se registr\u00F3 correctamente.');						
							reuniones.refresh(cct);
							standby.hide();
						}

						registry.byId('dialogCaptiraDG').destroyRecursive(false);

					}
				}).progress(standby.show());

	}

	function _validateConsejo(){

		if(array.indexOf(gActividades, 11)==-1 && 
				   array.indexOf(gActividades, 12)==-1){
			utils.cstmAlert("Para continuar, debe registrar el Consejo Escolar.");
			return false;
		}
		
		var grid = registry.byId('grid');
		var numPresidente = 0;
		var numSecretario = 0;
		var numConsejeros = 0;
		var totalIntegrantes = grid.rowCount;
		var umbralPadresFamilia = Math.floor(totalIntegrantes/2) + 1; 
		var totalPadresFamilia = 0;
		//Valida que la integracion contentenga al menos 50% + 1
		//de con calidad de Padres de familia o provenientes de 
		//la Asociacion de Pedres de Familia
		
		// var actividades = [{cActividad: 11},{cActividad:12}];
		var cargo = 0;
		var calidad =  0;
		
		// Obtiene la informaci—n del Grid
		for ( var i = 0; i < grid.rowCount; i++) {
			var item = grid.getItem(i);

			cargo = grid.store.getValue(item, 'cCargo');
			calidad =  grid.store.getValue(item, 'cCalidad');
			
			if(cargo == 1){//Es presidente 
				numPresidente++;
			}else if(cargo == 2){//Es secretario
				numSecretario++;
			}else if(cargo == 3){//Es consejero
				numConsejeros++;
			}
			
			if(calidad == 1 || calidad == 4){
				//Si es Representante de la APF o padre de familia
				totalPadresFamilia++;
			}
		}
		
		if(numPresidente!=1){
			utils.cstmAlert("El Consejo Escolar debe contar con un y solo un Presidente");
			return false;
		}else if(numSecretario!=1){
			utils.cstmAlert("El Consejo Escolar debe contar con un y solo un Secretario");
			return false;
		}else if(numConsejeros<1){
			utils.cstmAlert("El Consejo Escolar debe contar con al menos un Consejero");
			return false;
		}else if(totalPadresFamilia < umbralPadresFamilia){
			utils.cstmAlert("El Consejo Escolar debe estar conformado con al menos 50%+1 de Padres de Familia o Representantes de la APF");
			return false;
		}
			
		return true;
	}
   
   return {
	   init:init,
	   savePrimeraAsamblea:savePrimeraAsamblea,
	   asistentes:asistentes,
	   leeAsistentes:leeAsistentes
	   };
   
});





