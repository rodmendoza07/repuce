define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
	         "dojox/grid/DataGrid","dojo/data/ItemFileWriteStore",
	         "dojo/store/Memory", "dojo/dom", "dijit/form/ValidationTextBox","dijit/form/FilteringSelect",
	         "dojo/_base/json","dojo/on","app/util/constants","dijit/form/Button", "dijit/form/Form",
	         "dojo/_base/xhr","dojox/widget/Standby","app/conafe1415/reuniones_conafe",
	         "dijit/Dialog","dojox/form/CheckedMultiSelect","dojo/_base/lang",
	         "dojo/_base/window", "dojo/domReady!", "dojo/data/ObjectStore", "dojo/DeferredList"],
	function( ContentPane,registry,array,utils,DataGrid,ItemFileWriteStore,
			Memory, dom,ValidationTextBox,FilteringSelect,json,on,constants,Button,Form,xhr,Standby,reuniones,
			Dialog,CheckedMultiSelect,lang,win, domReady, ObjectStore, DeferredList){

   var actaConstitutivaObj= new Object();
   var storeCctsCheck=new Object();
   var maxIndexIntgr = 0;
   var maxIndexInstr = 0;
   var maxIndexAsist = 0;
   var maxIndexPromot = 0; //vblake
   
   function init(actividades,cApec,ReunionObj, storeCcts){
	   actaConstitutivaObj = !ReunionObj?{}:ReunionObj;
	   storeCctsCheck= storeCcts;

	   registry.byId('tpoRegistro').set('value',!ReunionObj?0:actaConstitutivaObj.apec.tpoRegistro);
	   _integrantes();
	   _instructores();
	   _asistentes();
	   _promotores(); //vblake
	 
    }

   /***************************************
   Inicia funcion Integrantes
   *****************************************/
   function _integrantes(){
	   if(!registry.byId("integrantesPane")){
		   var integrantesPane = 'integrantesPane';
		   var integrantes = !actaConstitutivaObj.integrantes?[]:actaConstitutivaObj.integrantes;
	   	
		   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Integrantes",
		           id:integrantesPane
		   })); 
			
		   registry.byId('pestanias').selectChild(registry.byId(integrantesPane), true);

		   //set up layout
		   var layout = [[
		         { name: 'Id',						field: 'cIntegrante', 		width: '5px', hidden:true},
				 { name: 'Apellido Paterno',		field: 'paternoIntegrante',	width: '150px'},
				 { name: 'Apellido Materno',		field: 'maternoIntegrante',	width: '150px'},
				 { name: 'Nombre', 					field: 'nombreIntegrante',	width: '150px'},
				 { name: 'Cargo en el Consejo',		field: 'cCargo',			width: '5px', hidden:true},
			//	 { name: 'Sexo H: Hombre M:Mujer',				field: 'genero',			width: '5px', hidden:true},
				 { name: 'Edad',			        field: 'edad',   			width: '90px' },				 
				 { name: 'Escolaridad', 			field: 'cNiveleduc',		width: '5px', hidden:true},
			//	 { name: 'Curp',					field: 'curp',				width: '150px'},
			//	 { name: 'Sexo H: Hombre M:Mujer',				field: 'nomGenero',			width: '80px' },
				 { name: 'APEC', 					field: 'cApec',		 		hidden:true},
				 { name: 'Cargo en el Consejo',		field: 'nomCargo',			width: '150px'},
				 { name: 'Escolaridad', 			field: 'nomNiveleduc',		width: '200px'},
			]];
		   utils.createTag('div','gridIntegrantes',integrantesPane);
		   dom.byId('gridIntegrantes').innerHTML='<table border="0" align="left" width= "530px">'+
				   '<tr>' +
				   '<td><input id="grid"/></td>'+
				   '</tr>'+
				   '<tr>' +
			   	   		'<td><input id="addRow"/> <input id="editRow"/> <input id="removeRow"/> </td>'+
				   '</tr>'+
				   '</table>';

		   var integrantesEncontrados=new Array();
		   //Establece la descripción del genero
		   for(var i in integrantes){
			   var nomGeneroIntegrante='';
			   if(integrantes[i].integrante.genero=='F'){
					nomGeneroIntegrante='M';
				}else{
					nomGeneroIntegrante='H';
				}
				
				var integrante = {
						cIntegrante : integrantes[i].integrante.cIntegrante,
						paternoIntegrante : integrantes[i].integrante.paternoIntegrante,
						maternoIntegrante : integrantes[i].integrante.maternoIntegrante,
						nombreIntegrante : integrantes[i].integrante.nombreIntegrante,
						cCargo : integrantes[i].integrante.cCargo,
					//	genero : integrantes[i].integrante.genero,
						edad : integrantes[i].integrante.edad,
						cNiveleduc : integrantes[i].integrante.cNiveleduc,
					//	curp : integrantes[i].integrante.curp,
					//	nomGenero : nomGeneroIntegrante,
						cApec : integrantes[i].integrante.cApec,
						nomCargo : integrantes[i].nomCargo,
						nomNiveleduc : integrantes[i].nomNiveleduc
					};
				integrantesEncontrados.push(integrante);
				
				var lastValueIntgr = integrantes[i].integrante.cIntegrante;
				if(maxIndexIntgr<=lastValueIntgr)
					maxIndexIntgr = lastValueIntgr;
		   }
		   
		   var dataJsonStore = {
			   identifier: 'cIntegrante',
			   items: integrantesEncontrados
		   };
		   
		   var jsonStore = new ItemFileWriteStore({data: dataJsonStore});
		   
	       	//Grid integrantes
	        new DataGrid({
			    id: 'grid',
			    store: jsonStore,
			    structure: layout,
			    rowSelector:'10px'
	        },"grid").startup();

	        new Button({
				label : constants.TEXT_BUTTON_AGREGAR_INTEGRANTE,
				onClick : function() {
					_detalleIntegrante();
                  }
			}, "addRow");

	    	new Button({
				label : constants.TEXT_BUTTON_EDITAR_INTEGRANTE,
				onClick : function(){ 
					var grid = registry.byId('grid');
					var items = grid.selection.getSelected();
					if(items.length==1){
                           dojo.forEach(items, function(selectedItem){
			                 if(selectedItem !== null){	
			                	var itemToEditIntegrante={
			                		cApec: grid.store.getValue(selectedItem,'cApec'),
			                		cIntegrante: grid.store.getValue(selectedItem,'cIntegrante'),
				      				paternoIntegrante: grid.store.getValue(selectedItem,'paternoIntegrante'),
				      				maternoIntegrante: grid.store.getValue(selectedItem,'maternoIntegrante'),
				       				nombreIntegrante: grid.store.getValue(selectedItem,'nombreIntegrante'),
				       				cCargo: grid.store.getValue(selectedItem,'cCargo'),
				       			//	genero: grid.store.getValue(selectedItem,'genero'),
				       				edad: grid.store.getValue(selectedItem,'edad'),
				       				cNiveleduc: grid.store.getValue(selectedItem,'cNiveleduc'),
				       			//	curp: grid.store.getValue(selectedItem,'curp'),
				       				nomCargo: grid.store.getValue(selectedItem,'nomCargo'),
				       			//	nomGenero: grid.store.getValue(selectedItem,'nomGenero'),
				       				nomNiveleduc: grid.store.getValue(selectedItem,'nomNiveleduc')
			                	 };
			                	_detalleIntegrante(itemToEditIntegrante);
			                 }
			             });
			         }else{
			        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
			         }
				}
			},'editRow');
	    	
	    	//Boton de eliminar integrante.
			new Button({
				label: constants.TEXT_BUTTON_ELIMINAR_INTEGRANTE,
				onClick: function(){
					var grid = registry.byId('grid');
					var items = grid.selection.getSelected();
					if(items.length!=0){
						grid.removeSelectedRows();
						grid.store.save();
					}else{
			        utils.cstmAlert('Debe seleccionar al menos un registro.');
				}
			  }
			}, "removeRow");
		}else{
		   if(registry.byId("integrantesPane")){
			   registry.byId('pestanias').closeChild(registry.byId("integrantesPane"));
		   }
		}
   	}

   /***************************************
   Inicia funcion Instructores
   *****************************************/
   function _instructores(){		
	   if(!registry.byId("instructoresPane")){
		   var instructoresPane = 'instructoresPane';
		   var instructores = !actaConstitutivaObj.instructores?[]:actaConstitutivaObj.instructores;
		   var apecActa = !actaConstitutivaObj.apec?0:actaConstitutivaObj.apec.cApec;
			   
		   registry.byId('pestanias').addChild(new ContentPane({
	           persist:false,
	           tabStrip:true,
	           title:"L\u00edderes",
	           id:instructoresPane
	       })); 

	   		var layoutInstructores = [[
				{ name: 'Id',									field: 'cInstructor', 	    width: '5px', hidden:true},
				{ name: 'Ccts',									field: 'cCcts', 	        width: '5px', hidden:true},
				{ name: 'Apellido Paterno',						field: 'paternoInstructor',	width: '150px'},
				{ name: 'Apellido Materno',						field: 'maternoInstructor',	width: '150px'},
				{ name: 'Nombre', 								field: 'nombreInstructor',	width: '150px'},
				{ name: 'Centro de trabajo asignado',			field: 'nomCcts', 	        width: '150px'},
			//	{ name: 'Sexo H: Hombre M:Mujer',				field: 'nomGenero',			width: '80px' },
			//	{ name: 'genero',								field: 'genero',			width: '5px' ,hidden:true},
				{ name: 'Edad',			       					field: 'edad',     			width: '90px' },
				{ name: 'Escolaridad', 							field: 'nomNiveleduc',		width: '200px'},
				{ name: 'cNiveleduc', 							field: 'cNiveleduc',		width: '5px',hidden:true},
			//	{ name: 'Curp',									field: 'curp',				width: '150px', hidden:true},								
				{ name: 'cApec', 								field: 'cApec',				hidden:true}
			]];

	   		var intructoresEncontrados=new Array();
	   		for(var i in instructores){
	   			var cCts=[];
	   			var nomCcts=[];
	   			var nomGenero='';
	   			
	   			for(var a in instructores[i].instructor.ccts){
	   				cCts.push(instructores[i].instructor.ccts[a].cCct);
	   				nomCcts.push(instructores[i].instructor.ccts[a].cveCct + ' (' + instructores[i].instructor.ccts[a].nomNivel+')');
	   			}
	   		
	   	/*		if(instructores[i].instructor.genero=="F"){
	   				nomGenero='M';
	   			}
	   			else{
	   				nomGenero='H';
	   			}
	   	*/		
				var instructor = {
					cInstructor: instructores[i].instructor.cInstructor,
					cApec: instructores[i].instructor.cApec,
					paternoInstructor:instructores[i].instructor.paternoInstructor,
					maternoInstructor: instructores[i].instructor.maternoInstructor,
					nombreInstructor: instructores[i].instructor.nombreInstructor,
				//	genero: instructores[i].instructor.genero,
					edad:instructores[i].instructor.edad,
					cNiveleduc: instructores[i].instructor.cNiveleduc,
				//	curp: instructores[i].instructor.curp,
					nomNiveleduc: instructores[i].instructor.nomNiveleduc,
					cCcts: cCts,
					nomCcts: nomCcts,
				//	nomGenero: nomGenero
				};
				
				intructoresEncontrados.push(instructor);
	   		}
	   		
	   		if(apecActa!=0){
	   			maxIndexInstr = utils.idMaxIdIntegrante(actaConstitutivaObj.apec.cApec);
	   		}

			var instructoresSelStore = new dojo.store.Memory({
				data: {
					identifier: 'cInstructor',
					items: intructoresEncontrados
				}
			});

			var dataStore = new dojo.data.ObjectStore({
	            objectStore: instructoresSelStore
	        });

	   		utils.createTag('div','divInstructores',instructoresPane);
	   		dom.byId('divInstructores').innerHTML='<table border="0" align="left" width= "950px">'+
				   '<tr>' +
				   	'<td><input id="gridInstructor"/></td>'+
				   '</tr>'+
				   '<tr>' +
			   	   	'<td><input id="addRowInstruc"/> <input id="editRowInstruc"/><input id="removeRowInstruc"/> </td>'+
				   '</tr>'+
	           '</table>';

	   		//Grid Instructores
	   		new DataGrid({
			    id: 'gridInstructor',
			    store: dataStore,
			    structure: layoutInstructores,
			    height: '300px',
			    width: '800px',
			    rowSelector:'10px'
	   		},"gridInstructor").startup();

	   		//Boton Agregar
	   		new Button({
				label : constants.TEXT_BUTTON_AGREGAR_INSTRUCTOR2014,
				onClick : function() {
					_detalleInstructor();
				}
		    }, "addRowInstruc");

	   		//Boton Editar
	   		new Button({
				label : constants.TEXT_BUTTON_EDITAR_INSTRUCTOR2014,
				onClick : function(){
					var gridInstructor = registry.byId('gridInstructor');
					var items = gridInstructor.selection.getSelected();
					if(items.length==1){
			             dojo.forEach(items, function(selectedItem){
			                 if(selectedItem !== null){	
			                	var itemToEditInstructor={
			                		cInstructor: gridInstructor.store.getValue(selectedItem,'cInstructor'),
			                		cApec: gridInstructor.store.getValue(selectedItem,'cApec'),
				      				paternoInstructor: gridInstructor.store.getValue(selectedItem,'paternoInstructor'),
				      				maternoInstructor: gridInstructor.store.getValue(selectedItem,'maternoInstructor'),
				       				nombreInstructor: gridInstructor.store.getValue(selectedItem,'nombreInstructor'),
				       		//		genero: gridInstructor.store.getValue(selectedItem,'genero'),
				       		//		nomGenero: gridInstructor.store.getValue(selectedItem,'nomGenero'),
				       				edad: gridInstructor.store.getValue(selectedItem,'edad'),
				       				cCcts: gridInstructor.store.getValue(selectedItem,'cCcts'),
				       				nomCcts: gridInstructor.store.getValue(selectedItem,'nomCcts'),
				       				cNiveleduc: gridInstructor.store.getValue(selectedItem,'cNiveleduc'),
				       		//		curp:	gridInstructor.store.getValue(selectedItem,'curp'),
				       				nomNiveleduc: gridInstructor.store.getValue(selectedItem,'nomNiveleduc')
			                	 };
			                	_detalleInstructor(itemToEditInstructor);
			                 }
			             });
			         }else{
			        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
			 		}
				}
		   },'editRowInstruc');

	    	utils.createTag('div','removeRow',instructoresPane);

	   		//Boton eliminar Instructor
	   		new Button({
				label : constants.TEXT_BUTTON_ELIMINAR_INSTRUCTOR2014,
				onClick : function(){ 
					var gridInstructor = registry.byId('gridInstructor');
					var items = gridInstructor.selection.getSelected();
					if(items.length!=0){
						gridInstructor.removeSelectedRows();
						gridInstructor.store.save();
					}else{
				        utils.cstmAlert('Debe seleccionar al menos un registro.');
					}
				}
	       },"removeRowInstruc");
	   		utils.createTag('div','removeRowInstruc',instructoresPane);
		}else{
		   if(registry.byId("instructoresPane")){
			   registry.byId('pestanias').closeChild(registry.byId("instructoresPane"));
		   }
		}
   }
   
   /***************************************
   Inicia funcion de Asistentes
   *****************************************/
    
   function _asistentes(){		
		   if(!registry.byId("asistentesPane")){
			  
			   var asistentesPane = 'asistentesPane';
			   var asistentes = !actaConstitutivaObj.asistentes?[]:actaConstitutivaObj.asistentes;
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Asistentes",
		           id:asistentesPane
		       })); 
			   
			//   registry.byId('pestanias').selectChild( registry.byId(asistentesPane), true);
			    
			   //set up layoutAsistentes
		   
		   		var layoutAsistentes = [[
		   		  { name: 'Id',						field: 'cAsistente', 	    width: '5px', hidden:true},
		          { name: 'Apellido Paterno',		field: 'paternoAsistente',	width: '150px'},      
			      { name: 'Apellido Materno',		field: 'maternoAsistente',	width: '150px'},      
		          { name: '*Nombre', 				field: 'nombreAsistente',	width: '150px'},
		      //    { name: 'Sexo H: Hombre M:Mujer',			field: 'nomGenero',			width: '80px' },
		      //    { name: 'Sexo H: Hombre M:Mujer',			field: 'genero',			width: '5px' ,hidden:true},
		          { name: 'Edad',			        field: 'edad',     width: '90px' },
		          { name: 'Escolaridad', 			field: 'nomNiveleduc',		width: '200px'},
		          { name: 'Escolaridad', 			field: 'cNiveleduc',		width: '5px',hidden:true}]];
		  
	/*   	   var nomGeneroAsistente='';

			   //Establece la descripción del genero
			   for(var i in asistentes){
				   if(asistentes[i].genero=='F'){
					   nomGeneroAsistente='M';
				   }else{
					   nomGeneroAsistente='H';
				   }
				   lang.mixin(asistentes[i],{ nomGenero: nomGeneroAsistente});
				   
				   var lastValueAsist = asistentes[i].cAsistente;
					if(maxIndexAsist<=lastValueAsist)
						maxIndexAsist = lastValueAsist;
				   
			   }
		*/		
		   	    var dataJsonStoreAsist = {
							identifier: 'cAsistente',
							items: asistentes
					};
								//Se crea el store de los asistentes.
				var jsonStoreAsist = new ItemFileWriteStore({data: dataJsonStoreAsist});
			
			   utils.createTag('div','divAsistentes',asistentesPane);
			
			   dom.byId('divAsistentes').innerHTML='<table border="0" align="left" width= "900">'+
			   '<tr>' +
			   '<td><input id="gridAsistente"/></td>'+
			   '</tr>'+
			   '<tr>' +
		   	   '<td><input id="addRowAsistent"/> <input id="editRowAsistent"/><input id="removeRowAsistent"/> </td>'+
			   '</tr>'+
		       '</table>';
				   	
	   
				 //Grid Asistentes
				   
			       new DataGrid({
				    id: 'gridAsistente',
				    store: jsonStoreAsist,
			       //autoHeight: true,
				    structure: layoutAsistentes,
				    height: '300px',
				    width: '800px',
				    rowSelector:'10px'
			       },
			       "gridAsistente").startup();
			       
			       //utils.createTag('div','addAsist',asistentesPane);
			       new Button({
						label : constants.TEXT_BUTTON_AGREGAR_ASISTENTE,
						onClick : function() {
							_detalleAsistente();
						}
				   }, "addRowAsistent");
			       
			       //utils.createTag('div','editAsist',asistentesPane);
				     
			       new Button({
						label : constants.TEXT_BUTTON_EDITAR_ASISTENTE,
						onClick : function(){ 
							var gridAsistente = registry.byId('gridAsistente');
							var items = gridAsistente.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEditAsistente={
					                		cAsistente: gridAsistente.store.getValue(selectedItem,'cAsistente'), 
						      				paternoAsistente: gridAsistente.store.getValue(selectedItem,'paternoAsistente'),
						      				maternoAsistente: gridAsistente.store.getValue(selectedItem,'maternoAsistente'), 
						       				nombreAsistente: gridAsistente.store.getValue(selectedItem,'nombreAsistente'),
						       				genero: gridAsistente.store.getValue(selectedItem,'genero'),
						       				nomGenero: gridAsistente.store.getValue(selectedItem,'nomGenero'),
						       				edad: gridAsistente.store.getValue(selectedItem,'edad'),
						       				cNiveleduc: gridAsistente.store.getValue(selectedItem,'cNiveleduc'),
						       				nomNiveleduc: gridAsistente.store.getValue(selectedItem,'nomNiveleduc')
						       				
										    };
					                	_detalleAsistente(itemToEditAsistente);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
				   },'editRowAsistent');
		       
			     ///Boton eliminar Asistente
		
			       new Button({
						label : constants.TEXT_BUTTON_ELIMINAR_ASISTENTE,
						onClick : function(){ 
							var gridAsistente = registry.byId('gridAsistente');
							var items = gridAsistente.selection.getSelected();
							if(items.length!=0){
							gridAsistente.removeSelectedRows();
							gridAsistente.store.save();
							
							}else{
						        utils.cstmAlert('Debe seleccionar al menos un registro.');
							}
						}
			       },"removeRowAsistent");
			       utils.createTag('div','removeRowAsistent',asistentesPane);

	   			}else{
	 			   if(registry.byId("asistentesPane")){
					   registry.byId('pestanias').closeChild(registry.byId("asistentesPane"));
				   }
	   			}

	}
    ////Termina funcion de asistentes
	
   
   /***************************************
   Inicia funcion Promotor Educativo
   *****************************************/
   function _promotores(){		
	   if(!registry.byId("promotorPane")){
		   var promotorPane = 'promotorPane';
		   var promotor = !actaConstitutivaObj.promotores?[]:actaConstitutivaObj.promotores;
		  // var apecActa = !actaConstitutivaObj.apec?0:actaConstitutivaObj.apec.cApec;
			   
		   registry.byId('pestanias').addChild(new ContentPane({
	           persist:false,
	           tabStrip:true,
	           title:"Promotor Educativo",
	           id:promotorPane
	       })); 

	   		var layoutPromotores = [[
				{ name: 'Id',									field: 'cPromotor', 	    width: '5px', hidden:true},
			//	{ name: 'CnumSer',								field: 'cNumSer', 	        width: '5px', hidden:true},
				{ name: 'Apellido Paterno',						field: 'paternoPromotor',	width: '150px'},
				{ name: 'Apellido Materno',						field: 'maternoPromotor',	width: '150px'},
				{ name: 'Nombre', 								field: 'nombrePromotor',	width: '150px'},
				{ name: 'N\u00FAmero de servicio ',					field: 'numServ', 	        width: '150px'},
			//	{ name: 'Sexo H: Hombre M:Mujer',				field: 'nomGenero',			width: '80px' },
			//	{ name: 'genero',								field: 'genero',			width: '5px' ,hidden:true},
				{ name: 'Edad',			       					field: 'edad',     			width: '90px' },
				{ name: '\u00DAltimo grado de estudios', 		field: 'nomNiveleduc',		width: '200px',hidden:true},
				{ name: 'cNiveleduc', 							field: 'cNiveleduc',		width: '5px',hidden:true},
			//	{ name: 'Curp',									field: 'curp',				width: '150px', hidden:true},								
				{ name: 'cApec', 								field: 'cApec',				hidden:true}
			]];

	   		var promotoresEncontrados=new Array();
	   		for(var i in promotor){
	   			var cCts=[];
	   			var nomCcts=[];
	   			var nomGenero='';
	   			
	/*   			for(var a in promotores[i].promotor.ccts){
	   				cCts.push(promotores[i].promotor.ccts[a].cCct);
	   				nomCcts.push(promotores[i].promotor.ccts[a].cveCct + ' (' + promotores[i].promotor.ccts[a].nomNivel+')');
	   			}
	   	*/	
	   	/*		if(instructores[i].instructor.genero=="F"){
	   				nomGenero='M';
	   			}
	   			else{
	   				nomGenero='H';
	   			}
	   	*/		
				//valores de la derecha corresponden a la base
	   			
	   			var promotores = {
					cPromotor: promotor[i].cPromotor,
					cApec: promotor[i].cApec,
					paternoPromotor:promotor[i].paternoPromotor,
					maternoPromotor: promotor[i].maternoPromotor,
					nombrePromotor: promotor[i].nombrePromotor,
				//	genero: instructores[i].instructor.genero,
					edad:promotor[i].edad,
					cNiveleduc: promotor[i].nomNiveleduc,
				//	curp: instructores[i].instructor.curp,
				//	nomNiveleduc: promotor[i].nomNiveleduc,
				//	cCcts: cCts,
					numServ: promotor[i].numServ,
				//	nomGenero: nomGenero
				};
				
				promotoresEncontrados.push(promotores);
	   		}
	   		
/*	
 * Preguntar a Ing. Juan Carlos
 *    		if(apecActa!=0){
	   			maxIndexPromot = utils.idMaxIdPromotor(actaConstitutivaObj.apec.cApec);
	   		}
*/
			var promotoresSelStore = new dojo.store.Memory({
				data: {
					identifier: 'cpromotor',
					items: promotoresEncontrados
				}
			});

			var dataStore = new dojo.data.ObjectStore({
	            objectStore: promotoresSelStore
	        });

	   		utils.createTag('div','divPromotores',promotorPane);
	   		dom.byId('divPromotores').innerHTML='<table border="0" align="left" width= "950px">'+
				   '<tr>' +
				   	'<td><input id="gridPromotor"/></td>'+
				   '</tr>'+
				   '<tr>' +
			   	   	'<td><input id="addRowPromot"/> <input id="editRowPromot"/><input id="removeRowPromot"/> </td>'+
				   '</tr>'+
	           '</table>';

	   		//Grid Promotores
	   		new DataGrid({
			    id: 'gridPromotor',
			    store: dataStore,
			    structure: layoutPromotores,
			    height: '300px',
			    width: '800px',
			    rowSelector:'10px'
	   		},"gridPromotor").startup();

	   		//Boton Agregar
	   		new Button({
			//	label : constants.TEXT_BUTTON_AGREGAR_INSTRUCTOR2014,
				label : 'Agregar Promotor', // Vblake  
				onClick : function() {
					_detallePromotor();
				}
		    }, "addRowPromot");

	   		//Boton Editar
	   		new Button({
			//	label : constants.TEXT_BUTTON_EDITAR_INSTRUCTOR2014,
				label : 'Editar Promotor', // Vblake
				onClick : function(){
					var gridPromotor = registry.byId('gridPromotor');
					var items = gridPromotor.selection.getSelected();
					if(items.length==1){
			             dojo.forEach(items, function(selectedItem){
			                 if(selectedItem !== null){	
			                	var itemToEditPromotor={
			                		cPromotor: gridPromotor.store.getValue(selectedItem,'cPromotor'),
			                		cApec: gridPromotor.store.getValue(selectedItem,'cApec'),
				      				paternoPromotor: gridPromotor.store.getValue(selectedItem,'paternoPromotor'),
				      				maternoPromotor: gridPromotor.store.getValue(selectedItem,'maternoPromotor'),
				       				nombrePromotor: gridPromotor.store.getValue(selectedItem,'nombrePromotor'),
				       		//		genero: gridInstructor.store.getValue(selectedItem,'genero'),
				       		//		nomGenero: gridInstructor.store.getValue(selectedItem,'nomGenero'),
				       				edad: gridPromotor.store.getValue(selectedItem,'edad'),
				       		//		cCcts: gridPromotor.store.getValue(selectedItem,'cCcts'),
				       		//		nomCcts: gridPromotor.store.getValue(selectedItem,'nomCcts'),
				       				numServ: gridPromotor.store.getValue(selectedItem,'numServ'),
				       				cNiveleduc: gridPromotor.store.getValue(selectedItem,'cNiveleduc'),
				       		//		curp:	gridInstructor.store.getValue(selectedItem,'curp'),
				       				nomNiveleduc: gridPromotor.store.getValue(selectedItem,'nomNiveleduc')
			                	 };
			                	_detallePromotor(itemToEditPromotor);
			                 }
			             });
			         }else{
			        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
			 		}
				}
		   },'editRowPromot');

	    	utils.createTag('div','removeRow',promotorPane);

	   		//Boton eliminar Promotor
	   		new Button({
			//	label : constants.TEXT_BUTTON_ELIMINAR_INSTRUCTOR2014,
				label : 'Eliminar Promotor', // Vblake
				onClick : function(){ 
					var gridPromotor = registry.byId('gridPromotor');
					var items = gridPromotor.selection.getSelected();
					if(items.length!=0){
						gridPromotor.removeSelectedRows();
						gridPromotor.store.save();
					}else{
				        utils.cstmAlert('Debe seleccionar al menos un registro.');
					}
				}
	       },"removeRowPromot");
	   		utils.createTag('div','removeRowPromot',promotorPane);
		}else{
		   if(registry.byId("promotorPane")){
			   registry.byId('pestanias').closeChild(registry.byId("promotorPane"));
		   }
		}
   }
// termina funcion promotores vblake
   
   
   
   // funcion para agregar o editar un integrante
   function _detalleIntegrante(itemToEditIntegrante){
	   
	   var editIntegrante=false;
	   
	   if(!itemToEditIntegrante){
		   itemToEditIntegrante= { 
      				paternoIntegrante: '',
      				maternoIntegrante: '', 
       				nombreIntegrante: '', 
       				cCargo: 4,
       			//	genero:'F',
       				edad: '',
       				cNiveleduc: 1, 
       			//	curp:'',
       				cApec: null
       					};   
	   }else{
		   editIntegrante=true;
	   }
	   
	   var dDetail =new Dialog({id:'dDetail', title:'Integrante de la APEC' ,content :'<div id="dcDetail"/>'});
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
  /*     '<tr><td align="right">'+
	   '	<br/><b>*Sexo H: Hombre M:Mujer: </b></td><td><br/><div id="genero"/><br/>'+
	   '</td></tr>'+
  */ 	   '<tr><td align="right">'+
   	   '	<br/><b>*Edad: </b></td><td><br/><div id="edad"/><br/>'+
   	   '</td></tr>'+
   	   '<tr><td align="right">'+
   	   '	<br/><b>*Escolaridad: </b></td><td><br/><div id="cNiveleduc"/><br/>'+
   	   '</td></tr>'+
  /* 	   '<tr><td align="right">'+
	   '	<br/><b>*Curp: </b></td><td><br/><div id="curp"/><br/>'+
	   '</td></tr>'+
  */ 	   '<tr><td colspan = "2" align="center"><br/><br/><br/><input id="aceptRow"/><br/></td>'+
	   '</tr>'+   	   
       '</table>';
   	   
   	   var paternoIntegrante=new ValidationTextBox({
			 value:itemToEditIntegrante.paternoIntegrante,
	         uppercase:'true',
	         trim:"true",
	         maxLength:"30",
	         required: true
         }, 'paternoIntegrante');

   	   
       var maternoIntegrante=new ValidationTextBox({
			 value:itemToEditIntegrante.maternoIntegrante,
	         uppercase:'true',
	         trim:"true",
	         maxLength:"30",
	         required: false
         }, 'maternoIntegrante');
   	 
 	   var nombreIntegrante=new ValidationTextBox({
			value:itemToEditIntegrante.nombreIntegrante,
	        uppercase:'true',
	        trim:"true",
	        maxLength:"50",
	        required: true
        }, 'nombreIntegrante');
 	   
 	 
 	   var cCargo=new FilteringSelect({
	         value:itemToEditIntegrante.cCargo,
	         store: _catalogoCargo(),
	 		 required: true,
	         searchAttr:'nomCargo'
         }, 'cCargo');
 	   
 	    var genero=new FilteringSelect({
           value:itemToEditIntegrante.genero,
 		   store: _catalogoGenero(),
 		   required: true,
           searchAttr:'nomGenero'
         }, 'genero');
 	   
 	    var edad=new ValidationTextBox({
 			 value:itemToEditIntegrante.edad,
 	         uppercase:'true',
 	         trim:"true",
 	         maxLength:"2",
 	        regExp : constants.NUMBER_VALID,
 	         required: true
 	      }, 'edad');
 	   
 	    
 	 	var cNiveleduc=new FilteringSelect({
            value:itemToEditIntegrante.cNiveleduc,
            store: _catalogoNivelEduc(1),
 	 		required: true,
            searchAttr:'name'
         }, 'cNiveleduc');
 	 	
    	   
        var curp=new ValidationTextBox({
 			 value:itemToEditIntegrante.curp,
 	         uppercase:'true',
 	         trim:"true",
 	         maxLength:"30",
 	         required: false
          }, 'curp');
 	 
 	    new Button({
			label : constants.TEXT_BUTTON_ACEPTAR,
			onClick : function() {
				var form = registry.byId('dDetail');
				if (!form.validate()){  
					utils.cstmAlert('Favor de registrar los datos requeridos');
					return false;
				}
				var grid = registry.byId('grid');
				try{
					if(editIntegrante){
						var index = grid.selection.selectedIndex;
						var item = grid.getItem(index);
						grid.store.setValue(item, 'paternoIntegrante', paternoIntegrante.get('value'));
						grid.store.setValue(item, 'maternoIntegrante', maternoIntegrante.get('value'));
						grid.store.setValue(item, 'nombreIntegrante', nombreIntegrante.get('value'));
						grid.store.setValue(item, 'cCargo', cCargo.get('value'));
				//		grid.store.setValue(item, 'genero', genero.get('value'));
						grid.store.setValue(item, 'edad', edad.get('value'));
						grid.store.setValue(item, 'cNiveleduc', cNiveleduc.get('value'));
				//		grid.store.setValue(item, 'curp', curp.get('value'));
						grid.store.setValue(item, 'nomCargo', cCargo.get('displayedValue'));
				//		grid.store.setValue(item, 'nomGenero', genero.get('displayedValue'));
						grid.store.setValue(item, 'nomNiveleduc', cNiveleduc.get('displayedValue'));
						grid.update();
					}else{
						var myNewItem = {cIntegrante: ++maxIndexIntgr, 
			      				paternoIntegrante: paternoIntegrante.get('value'),
			      				maternoIntegrante: maternoIntegrante.get('value'), 
			       				nombreIntegrante: nombreIntegrante.get('value'),
			       				cCargo: cCargo.get('value'),
			    //   				genero: genero.get('value'),
			       				edad: edad.get('value'),
			       				cNiveleduc: cNiveleduc.get('value'),
			    //   				curp : curp.get('value'),
			       				nomCargo: cCargo.get('displayedValue'),
								nomNiveleduc: cNiveleduc.get('displayedValue'),
				//			    nomGenero: genero.get('displayedValue'),
							    cApec: null
			       			};
						grid.store.newItem(myNewItem);
					}
					registry.byId('dDetail').destroyRecursive(false);
				}catch(e){
					utils.cstmAlert('Ocurrio un error al Agregar o Editar');
					console.log(e);
				}	
				}
 	    	},'aceptRow');
     }
   
 	    
 	// funcion para agregar o editar un Instructor
   function _detalleInstructor(itemToEditInstructor){
		   var editInstructor=false;
		   if(!itemToEditInstructor){
			   itemToEditInstructor= { 
					paternoInstructor: '',
					maternoInstructor: '', 
					nombreInstructor: '', 
					cCcts: [],
					nomCcts:'',
				//	genero:'F',
					edad: '',
					cNiveleduc: 8,
				//	curp:'',
					cApec: null
			   };
		   }else{
			   editInstructor=true;
		   }
 	
           var dDetail =new Dialog({id:'dDetail', title:'L\u00edder para la Educaci\u00f3n Comunitaria' ,content :'<div id="dcDetail"/>'});
 	   	   dDetail.show();
 	   	   dDetail.on('hide',function(){
 	   	        registry.byId('dDetail').destroyRecursive(false);
 	   	   });
 	   	   dDetail._setStyleAttr('left:20px !important;'); 
 	   	   dDetail._setStyleAttr('top:20px !important;');
 	   	   
 	   	   utils.createTag('div','intCnt','dcDetail');
    	   dom.byId('intCnt').innerHTML='<table border="0" align="left" >'+
    	   '<tr><td align="right">'+
    	   '	<b>*Apellido Paterno: </b></td><td><div id="paternoInstructor"/>'+
    	   '</td></tr>'+
    	   '<tr><td align="right">'+
    	   '	<br/><b>&nbsp;Apellido Materno:</b></td><td><br/><div id="maternoInstructor"/><br/>'+
    	   '</td></tr>'+
    	   '<tr><td align="right">'+
    	   '	<br/><b>*Nombre:</b></td><td><br/><div id="nombreInstructor"/><br/>'+
    	   '</td></tr>'+ 
    	   '<tr><td align="right">'+
    	   '	<br/><b>*Programa educativo:</b></td><td><br/><div id="programaEducativo"/><br/>'+
    	   '</td></tr>'+
    /*       '<tr><td align="right">'+
 	       '<br/><b>*Sexo H: Hombre M:Mujer: </b></td><td><br/><div id="genero"/><br/>'+
 	       '</td></tr>'+
    */	   '<tr><td align="right">'+
    	   '	<br/><b>*Edad: </b></td><td><br/><div id="edad"/><br/>'+
    	   '</td></tr>'+
    	   '<tr><td align="right">'+
    	   '	<br/><b>*Escolaridad: </b></td><td><br/><div id="cNiveleduc"/><br/>'+
    	   '</td></tr>'+
    	   //'<tr><td align="right">'+
    	   //'	<br/><b>*Curp: </b></td><td><br/><div id="curp"/><br/>'+
    	   //'</td></tr>'+
    	   '<tr><td colspan = "2" align="center"><br/><br/><br/><input id="aceptRowInstructor"/><br/></td>'+
 	       '</tr>'+   	   
           '</table>';

    	   
       	   var paternoInstructor=new ValidationTextBox({
    		 value:itemToEditInstructor.paternoInstructor,
             uppercase:'true',
             trim:"true",
             maxLength:"30",
             required: true
             }, 'paternoInstructor');

       	   
           var maternoInstructor=new ValidationTextBox({
    		 value:itemToEditInstructor.maternoInstructor,
             uppercase:'true',
             trim:"true",
             maxLength:"30",
             required: false
             }, 'maternoInstructor');
       	 
     	   var nombreInstructor=new ValidationTextBox({
    		value:itemToEditInstructor.nombreInstructor,
            uppercase:'true',
            trim:"true",
            maxLength:"50",
            required: true
            }, 'nombreInstructor');
     	   
     		var programaEducativo= new CheckedMultiSelect ({
     	 		 multiple:true,
     	 		 invalidMessage:"Debe seleccionar al menos un programa educativo"
     	 	    },'programaEducativo');
     		
     		//se obtienen las opciones del componente y se eliminan.
     		var opts=registry.byId('programaEducativo').getOptions();
        	registry.byId('programaEducativo').removeOption(opts);
     		
        	// Se copian los valores del componente de ccts para que no se muestren seleccionado
        	var storeProgCcts=new Array();
        	
        	for(var i in storeCctsCheck){
        		storeProgCcts.push({label: storeCctsCheck[i].label, 
	 				value: storeCctsCheck[i].value,selected:false});
        	}
        	
        	
        	// Se valida que opciones del componente se deben mostrar seleccioandas y cuales no.
        	        	
        	for(var j in storeProgCcts){
        			
	        		for(var a in itemToEditInstructor.cCcts){
	        			if(itemToEditInstructor.cCcts[a]==storeProgCcts[j].value){
	        			
	        				storeProgCcts[j].selected=true;
	        			}
	        			
	        		}
        		
        	}
        
           //se asignas las opciones al componente	
     	   registry.byId('programaEducativo').addOption(storeProgCcts);
     	   
     	   var genero=new FilteringSelect({
               value:itemToEditInstructor.genero,
               store: _catalogoGenero(),
     		   required: true,
               searchAttr:'nomGenero'
             }, 'genero');
     	   
           var edad=new ValidationTextBox({
     			 value:itemToEditInstructor.edad,
     	         uppercase:'true',
     	         trim:"true",
     	         maxLength:"2",
     	        regExp : constants.NUMBER_VALID,
     	         required: true
     	      }, 'edad');
         	 
     	 	var cNiveleduc=new FilteringSelect({
                value:itemToEditInstructor.cNiveleduc,
                store: _catalogoNivelEduc(2),
     	 		required: true,
                searchAttr:'name'
             }, 'cNiveleduc');
     	    
     	 	var curp=new ValidationTextBox({
       		 value:itemToEditInstructor.curp,
                uppercase:'true',
                trim:"true",
                maxLength:"30",
                required: false
                }, 'curp');
     	 	
     	 	new Button({
    			label : constants.TEXT_BUTTON_ACEPTAR,
    			onClick : function() {
    				
    				var form = registry.byId('dDetail');
    				var gridInstructor = registry.byId('gridInstructor');
    				var nomCcts='';
    				var cCcts= programaEducativo.get('value');
    				var tamCcts=cCcts.length-1;
    				
    				
    				if (!form.validate()){  
    					utils.cstmAlert('Favor de registrar los datos requeridos');
    					return false;
    				};
    				if(programaEducativo.get('value')==''){
    					utils.cstmAlert('Debe seleccionar al menos un programa educativo');
    					return false;
    				}
    				
    				if(cCcts.length>2){
    					utils.cstmAlert('No se pueden seleccionar m\u00E1s de dos programas'+ 
    										' educativos por l\u00edder.');
    					return false;
    				}
    				
    				
    				//Se validan los programas eductativos seleccionados, estos deben ser solo uno, 
    				// o la combinacion prescolar-primaria
    				/*if(cCcts.length==2){
    					
    					  var lstCcts=xhr.get({
    			            url:dojo.config.app.urlBase+'catalogos/listCctsLocalidad/'+ 
    			            			registry.byId('nomEntidadApec').get('value') +'/'+
    			            			registry.byId('nomMunicipioApec').get('value') +'/'+
    			            			registry.byId('nomLocalidadApec').get('value'),
    			            sync: true,
    			            preventCache:true,
    			            contentType: "application/x-www-form-urlencoded; charset=utf-8",
    			            handleAs: "json"
    		    	 		});
    					
    					  lstCcts.then(function(centrosEsc) {
    					  var nomNivel=[];
  		    	 		  var nomNivelCorrectos=['PREESCOLAR', 'PRIMARIA'];
  		    	 		 
  		    	 		    		    	 		  
				          for(var i in cCcts){
				        	  for (var j in centrosEsc){
				        		  if(cCcts[i]==centrosEsc[j].cCct){
				        			  nomNivel.push(centrosEsc[j].nomNivel);
				        		  }
				        	  }
				          }
				           
				          for(var x=0; x<nomNivelCorrectos.length; x++){
					          if(nomNivel[x]!=nomNivelCorrectos[x]){
					        	  progIncorrecto=-1;
					          }
				          }
				        	
    					});
    					
    				}*/
    				    				
    				// Se separan por comas los programas educativos
    				for(var i in cCcts){
						for(var a in storeProgCcts){
							if(cCcts[i]==storeProgCcts[a].value){
								if(i==tamCcts){
									nomCcts = nomCcts + storeProgCcts[a].label;
								}
								else{
									nomCcts = nomCcts + storeProgCcts[a].label +',';
								}
							}
						}
					}
    				
    				try{
    					
    					if(editInstructor){
    						
    						var index = gridInstructor.selection.selectedIndex;
    						var item = gridInstructor.getItem(index);
    						
    						gridInstructor.store.setValue(item, 'paternoInstructor', paternoInstructor.get('value'));
    						gridInstructor.store.setValue(item, 'maternoInstructor', maternoInstructor.get('value'));
    						gridInstructor.store.setValue(item, 'nombreInstructor', nombreInstructor.get('value'));
    						gridInstructor.store.setValue(item, 'cNiveleduc', cNiveleduc.get('value'));
    						gridInstructor.store.setValue(item, 'nomNiveleduc', cNiveleduc.get('displayedValue'));
    						gridInstructor.store.setValue(item, 'edad', edad.get('value'));
    				//		gridInstructor.store.setValue(item, 'curp', curp.get('value'));
    				//		gridInstructor.store.setValue(item, 'genero', genero.get('value'));
    				//		gridInstructor.store.setValue(item, 'nomGenero', genero.get('displayedValue'));
    						gridInstructor.store.setValue(item, 'cCcts', programaEducativo.get('value'));
    						gridInstructor.store.setValue(item, 'nomCcts',nomCcts);

    						gridInstructor.update();
    						
    					}else{
    						
		    				var myNewItem = {cInstructor: ++maxIndexInstr,
		    						cApec: null,
		    						paternoInstructor: paternoInstructor.get('value'),
		    						maternoInstructor: maternoInstructor.get('value'), 
		    						nombreInstructor: nombreInstructor.get('value'),
		    						cNiveleduc: cNiveleduc.get('value'),
		    						nomNiveleduc: cNiveleduc.get('displayedValue'),
		    	       	//			genero: genero.get('value'),
		    	       	//			nomGenero: genero.get('displayedValue'),
		    	       				edad: edad.get('value'),
		    	       	//			curp: curp.get('value'),
		    						cCcts: programaEducativo.get('value'),
		    						nomCcts: nomCcts
	    	       			};
			    		gridInstructor.store.newItem(myNewItem);
			    		
    					}
				     registry.byId('dDetail').destroyRecursive(false);
			}catch(e){
				utils.cstmAlert('Ocurri\u00f3 un error al Agregar o Editar');
				console.log(e);
			}
			
			}
    	},'aceptRowInstructor');

   	}

   
       // funcion para agregar o editar un Asistente
 	   
 	   function _detalleAsistente(itemToEditAsistente){
 		   
 		   
 		  var editAsistente=false;
		   
		   if(!itemToEditAsistente){
			   itemToEditAsistente= { 
					   paternoAsistente: '',
					   maternoAsistente: '', 
					   nombreAsistente: '', 
	       		//	   genero:'F',
	       			   edad: '',
	       			   cNiveleduc: 13 
	       		};   
		   }else{
			   editAsistente=true;
		   }
 	
           var dDetail =new Dialog({id:'dDetail', title:'Asistente de la APEC' ,content :'<div id="dcDetail"/>'});
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
    /*       '<tr><td align="right">'+
 	       '<br/><b>*Sexo H: Hombre M:Mujer: </b></td><td><br/><div id="genero"/><br/>'+
 	*/       '</td></tr>'+
    	   '<tr><td align="right">'+
    	   '	<br/><b>*Edad: </b></td><td><br/><div id="edad"/><br/>'+
    	   '</td></tr>'+
    	   '<tr><td align="right">'+
    	   '	<br/><b>*Escolaridad: </b></td><td><br/><div id="cNiveleduc"/><br/>'+
    	   '</td></tr>'+
    	   '<tr><td colspan = "2" align="center"><br/><br/><br/><input id="aceptRowAsistente"/><br/></td>'+
 	       '</tr>'+   	   
           '</table>';
    	   
    	   var paternoAsistente=new ValidationTextBox({
     		  value:itemToEditAsistente.paternoAsistente,
              uppercase:'true',
              trim:"true",
              maxLength:"30",
              required: true
              }, 'paternoAsistente');

        	   
            var maternoAsistente=new ValidationTextBox({
     		  value:itemToEditAsistente.maternoAsistente,
              uppercase:'true',
              trim:"true",
              maxLength:"30",
              required: false
              }, 'maternoAsistente');
        	 
      	   var nombreAsistente=new ValidationTextBox({
     		  value:itemToEditAsistente.nombreAsistente,
              uppercase:'true',
              trim:"true",
              maxLength:"50",
              required: true
              }, 'nombreAsistente');
      	 
      	   
      	   var genero=new FilteringSelect({
               value:itemToEditAsistente.genero,
               store: _catalogoGenero(),
      		   required: true,
               searchAttr:'nomGenero'
              },'genero');
      	   
      	   var edad=new ValidationTextBox({
      			 value:itemToEditAsistente.edad,
      	         uppercase:'true',
      	         trim:"true",
      	         maxLength:"2",
      	         regExp: constants.NUMBER_VALID,
      	         required: true
      	      }, 'edad');
      	 	 
      	 	var cNiveleduc=new FilteringSelect({
                 value:itemToEditAsistente.cNiveleduc,
                 store: _catalogoNivelEduc(3),
      	 		 required: true,
                 searchAttr:'name'
              },'cNiveleduc');
      	  
      	 	new Button({
     			label : constants.TEXT_BUTTON_ACEPTAR,
     			onClick : function() {
     				
     				var form = registry.byId('dDetail');
     				if (!form.validate()){  
     					utils.cstmAlert('Favor de registrar los datos requeridos');
     					return false;
     				};
     				
     				var gridAsistente = registry.byId('gridAsistente');
    				try{
    					if(editAsistente){
    						var index = gridAsistente.selection.selectedIndex;
    						var item = gridAsistente.getItem(index);
    						gridAsistente.store.setValue(item, 'paternoAsistente', paternoAsistente.get('value'));
    						gridAsistente.store.setValue(item, 'maternoAsistente', maternoAsistente.get('value'));
    						gridAsistente.store.setValue(item, 'nombreAsistente', nombreAsistente.get('value'));
    				//		gridAsistente.store.setValue(item, 'genero', genero.get('value'));
    				//		gridAsistente.store.setValue(item, 'nomGenero', genero.get('displayedValue'));
    						gridAsistente.store.setValue(item, 'edad', edad.get('value'));
    						gridAsistente.store.setValue(item, 'cNiveleduc', cNiveleduc.get('value'));
    						gridAsistente.store.setValue(item, 'nomNiveleduc', cNiveleduc.get('displayedValue'));
    						gridAsistente.update();
    						
    					}else{
     				
		     				var myNewItem = {cAsistente: ++maxIndexAsist, 
		     	      				paternoAsistente: paternoAsistente.get('value'),
		     	      				maternoAsistente: maternoAsistente.get('value'), 
		     	       				nombreAsistente: nombreAsistente.get('value'),
		     	       		//		genero: genero.get('value'),
		     	       		//	    nomGenero: genero.get('displayedValue'),	     	       				
		     	       				edad: edad.get('value'),
		     	       				cNiveleduc: cNiveleduc.get('value'), 
		     						nomNiveleduc: cNiveleduc.get('displayedValue')
		     	       			};
		                    
		     				gridAsistente.store.newItem(myNewItem);  
    					}
    					 registry.byId('dDetail').destroyRecursive(false);
    				}catch(e){
    						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
    						console.log(e);
    					}
      				
     			}
  	    	},'aceptRowAsistente');

		      
  	   }

	
 	   
 	// funcion para agregar o editar un Promotor
 	   
 	   function _detallePromotor(itemToEditPromotor){
 			   var editPromotor=false;
 			   if(!itemToEditPromotor){
 				   itemToEditPromotor= { 
 						paternoPromotor: '',
 						maternoPromotor: '', 
 						nombrePromotor: '', 
 					//	cCcts: [],
 					//	nomCcts:'',
 						numServ:'',
 					//	genero:'F',
 						edad: '',
 					 	cNiveleduc: 8, // preguntar al Ing. Juan Carlos
 						nomNiveleduc: null,
 					//	curp:'',
 						cApec: null
 				   };
 			   }else{
 				   editPromotor=true;
 			   }
 	 	
 	           var dDetail =new Dialog({id:'dDetail', title:'Promotor Educativo' ,content :'<div id="dcDetail"/>'});
 	 	   	   dDetail.show();
 	 	   	   dDetail.on('hide',function(){
 	 	   	        registry.byId('dDetail').destroyRecursive(false);
 	 	   	   });
 	 	   	   dDetail._setStyleAttr('left:20px !important;'); 
 	 	   	   dDetail._setStyleAttr('top:20px !important;');
 	 	   	   
 	 	   	   utils.createTag('div','intCnt','dcDetail');
 	    	   dom.byId('intCnt').innerHTML='<table border="0" align="left" >'+
 	    	   '<tr><td align="right">'+
 	    	   '	<b>*Apellido Paterno: </b></td><td><div id="paternoPromotor"/>'+
 	    	   '</td></tr>'+
 	    	   '<tr><td align="right">'+
 	    	   '	<br/><b>&nbsp;Apellido Materno:</b></td><td><br/><div id="maternoPromotor"/><br/>'+
 	    	   '</td></tr>'+
 	    	   '<tr><td align="right">'+
 	    	   '	<br/><b>*Nombre:</b></td><td><br/><div id="nombrePromotor"/><br/>'+
 	    	   '</td></tr>'+ 
 	    	   '<tr><td align="right">'+
 	    	   '	<br/><b>*N\u00FAmero de servicio:</b></td><td><br/><div id="numServ"/><br/>'+
 	    	   '</td></tr>'+
 	    /*       '<tr><td align="right">'+
 	 	       '<br/><b>*Sexo H: Hombre M:Mujer: </b></td><td><br/><div id="genero"/><br/>'+
 	 	       '</td></tr>'+
 	    */	   '<tr><td align="right">'+
 	    	   '	<br/><b>*Edad: </b></td><td><br/><div id="edad"/><br/>'+
 	    	   '</td></tr>'+
 	    	   '<tr><td align="right">'+
 	    	   '	<br/><b>*Escolaridad: </b></td><td><br/><div id="nomNiveleduc"/><br/>'+
 	    	   '</td></tr>'+
 	    	   //'<tr><td align="right">'+
 	    	   //'	<br/><b>*Curp: </b></td><td><br/><div id="curp"/><br/>'+
 	    	   //'</td></tr>'+
 	    	   '<tr><td colspan = "2" align="center"><br/><br/><br/><input id="aceptRowPromotor"/><br/></td>'+
 	 	       '</tr>'+   	   
 	           '</table>';

 	    	   
 	       	   var paternoPromotor=new ValidationTextBox({
 	    		 value:itemToEditPromotor.paternoPromotor,
 	             uppercase:'true',
 	             trim:"true",
 	             maxLength:"30",
 	             required: true
 	             }, 'paternoPromotor');

 	       	   
 	           var maternoPromotor=new ValidationTextBox({
 	    		 value:itemToEditPromotor.maternoPromotor,
 	             uppercase:'true',
 	             trim:"true",
 	             maxLength:"30",
 	             required: false
 	             }, 'maternoPromotor');
 	       	 
 	     	   var nombrePromotor=new ValidationTextBox({
 	    		value:itemToEditPromotor.nombrePromotor,
 	            uppercase:'true',
 	            trim:"true",
 	            maxLength:"50",
 	            required: true
 	            }, 'nombrePromotor');
 	     	   
 	     	   var numServ=new ValidationTextBox({
  	    		value:itemToEditPromotor.numServ,
  	            uppercase:'true',
  	            trim:"true",
  	            maxLength:"12",
  	            required: true
  	            }, 'numServ');
 	     	   
/* vblake 	      	var programaEducativo= new CheckedMultiSelect ({
 	     	 		 multiple:true,
 	     	 		 invalidMessage:"Debe seleccionar al menos un programa educativo"
 	     	 	    },'programaEducativo');
 	     		
 	     		//se obtienen las opciones del componente y se eliminan.
 	    		var opts=registry.byId('programaEducativo').getOptions();
 	        	registry.byId('programaEducativo').removeOption(opts);
 	     		
 	        	// Se copian los valores del componente de ccts para que no se muestren seleccionado
 	        	var storeProgCcts=new Array();
 	        	
 	        	for(var i in storeCctsCheck){
 	        		storeProgCcts.push({label: storeCctsCheck[i].label, 
 		 				value: storeCctsCheck[i].value,selected:false});
 	        	}
 	        	
 	        	
 	        	// Se valida que opciones del componente se deben mostrar seleccioandas y cuales no.
 	        	        	
 	        	for(var j in storeProgCcts){
 	        			
 		        		for(var a in itemToEditInstructor.cCcts){
 		        			if(itemToEditInstructor.cCcts[a]==storeProgCcts[j].value){
 		        			
 		        				storeProgCcts[j].selected=true;
 		        			}
 		        			
 		        		}
 	        		
 	        	}
 	        
 	           //se asignas las opciones al componente	
 	     	   registry.byId('programaEducativo').addOption(storeProgCcts);
 	     */	   
 	     	   var genero=new FilteringSelect({
 	               value:itemToEditPromotor.genero,
 	               store: _catalogoGenero(),
 	     		   required: true,
 	               searchAttr:'nomGenero'
 	             }, 'genero');
 	     	   
 	           var edad=new ValidationTextBox({
 	     			 value:itemToEditPromotor.edad,
 	     	         uppercase:'true',
 	     	         trim:"true",
 	     	         maxLength:"2",
 	     	        regExp : constants.NUMBER_VALID,
 	     	         required: true
 	     	      }, 'edad');
 	         	 
 	     	 	var nomNiveleduc=new FilteringSelect({
 	                value:itemToEditPromotor.cNiveleduc,
 	                store: _catalogoNivelEduc(2),
 	     	 		required: true,
 	                searchAttr:'name'
 	             }, 'nomNiveleduc');
 	     	    
 	     	 	var curp=new ValidationTextBox({
 	       		 value:itemToEditPromotor.curp,
 	                uppercase:'true',
 	                trim:"true",
 	                maxLength:"30",
 	                required: false
 	                }, 'curp');
 	     	 	
 	     	 	new Button({
 	    			label : constants.TEXT_BUTTON_ACEPTAR,
 	    			onClick : function() {
 	    				
 	    				var form = registry.byId('dDetail');
 	    				var gridPromotor = registry.byId('gridPromotor');
 	    	/*vblake	var nomCcts='';
  	    				var cCcts= programaEducativo.get('value'); 	  			
  	    				var tamCcts=cCcts.length-1;
 	    				
 	    	*/			
 	    				if (!form.validate()){  
 	    					utils.cstmAlert('Favor de registrar los datos requeridos');
 	    					return false;
 	    				}; /* vblake
 	    				
 	    				if(programaEducativo.get('value')==''){
 	    					utils.cstmAlert('Debe seleccionar al menos un programa educativo');
 	    					return false;
 	    				}
 	    				
 	    				if(cCcts.length>2){
 	    					utils.cstmAlert('No se pueden seleccionar m\u00E1s de dos programas'+ 
 	    										' educativos por l\u00edder.');
 	    					return false;
 	    				}
 	    				
 	    				*/
 	    				//Se validan los programas eductativos seleccionados, estos deben ser solo uno, 
 	    				// o la combinacion prescolar-primaria
 	    				/*if(cCcts.length==2){
 	    					
 	    					  var lstCcts=xhr.get({
 	    			            url:dojo.config.app.urlBase+'catalogos/listCctsLocalidad/'+ 
 	    			            			registry.byId('nomEntidadApec').get('value') +'/'+
 	    			            			registry.byId('nomMunicipioApec').get('value') +'/'+
 	    			            			registry.byId('nomLocalidadApec').get('value'),
 	    			            sync: true,
 	    			            preventCache:true,
 	    			            contentType: "application/x-www-form-urlencoded; charset=utf-8",
 	    			            handleAs: "json"
 	    		    	 		});
 	    					
 	    					  lstCcts.then(function(centrosEsc) {
 	    					  var nomNivel=[];
 	  		    	 		  var nomNivelCorrectos=['PREESCOLAR', 'PRIMARIA'];
 	  		    	 		 
 	  		    	 		    		    	 		  
 					          for(var i in cCcts){
 					        	  for (var j in centrosEsc){
 					        		  if(cCcts[i]==centrosEsc[j].cCct){
 					        			  nomNivel.push(centrosEsc[j].nomNivel);
 					        		  }
 					        	  }
 					          }
 					           
 					          for(var x=0; x<nomNivelCorrectos.length; x++){
 						          if(nomNivel[x]!=nomNivelCorrectos[x]){
 						        	  progIncorrecto=-1;
 						          }
 					          }
 					        	
 	    					});
 	    					
 	    				}*/
 	    				    				
 	    				// Se separan por comas los programas educativos
 /*vblake	    				for(var i in cCcts){
 							for(var a in storeProgCcts){
 								if(cCcts[i]==storeProgCcts[a].value){
 									if(i==tamCcts){
 										nomCcts = nomCcts + storeProgCcts[a].label;
 									}
 									else{
 										nomCcts = nomCcts + storeProgCcts[a].label +',';
 									}
 								}
 							}
 						}
 */		    				
 	    				try{
 	    					
     					if(editPromotor){
 	    						
 	    						var index = gridPromotor.selection.selectedIndex;
 	    						var item = gridPromotor.getItem(index);
 	    						
 	    						gridPromotor.store.setValue(item, 'paternoPromotor', paternoPromotor.get('value'));
 	    						gridPromotor.store.setValue(item, 'maternoPromotor', maternoPromotor.get('value'));
 	    						gridPromotor.store.setValue(item, 'nombrePromotor', nombrePromotor.get('value'));
 	    						gridPromotor.store.setValue(item, 'numServ', numServ.get('value'));
 	    						gridPromotor.store.setValue(item, 'nomNiveleduc', nomNiveleduc.get('displayedValue'));
 	    						gridPromotor.store.setValue(item, 'edad', edad.get('value'));
 	    						gridPromotor.store.setValue(item, 'cNiveleduc', nomNiveleduc.get('value'));
 	    				//		gridInstructor.store.setValue(item, 'curp', curp.get('value'));
 	    				//		gridInstructor.store.setValue(item, 'genero', genero.get('value'));
 	    				//		gridInstructor.store.setValue(item, 'nomGenero', genero.get('displayedValue'));
 	    				//		gridPromotor.store.setValue(item, 'cCcts', programaEducativo.get('value'));
 	    				//		gridPromotor.store.setValue(item, 'nomCcts',nomCcts);

 	    						gridPromotor.update();
 	    						
 	    					}else{
 	    						
 			    				var myNewItem = {cPromotor: gridPromotor.rowCount +1,
 			    						cApec: null,
 			    						paternoPromotor: paternoPromotor.get('value'),
 			    						maternoPromotor: maternoPromotor.get('value'), 
 			    						nombrePromotor: nombrePromotor.get('value'),
 			    						numServ: numServ.get('value'),
 			    						cNiveleduc: nomNiveleduc.get('value'),
 			    						nomNiveleduc: nomNiveleduc.get('displayedValue'),
 			    	       	//			genero: genero.get('value'),
 			    	       	//			nomGenero: genero.get('displayedValue'),
 			    	       				edad: edad.get('value'),
 			    	       	//			curp: curp.get('value'),
 			    			//			cCcts: programaEducativo.get('value'),
 			    			//			nomCcts: nomCcts
 		    	       			};
 				    		gridPromotor.store.newItem(myNewItem);
 				    		
 	    					}
 					     registry.byId('dDetail').destroyRecursive(false);
 				}catch(e){
 					utils.cstmAlert('Ocurri\u00f3 un error al Agregar o Editar');
 					console.log(e);
 				}
 				
 				}
 	    	},'aceptRowPromotor');

 	   	}
  
 	   
 	 // termina funcion para Promotores  @
 	   
 	   
 	  //Funcion para obtener el catalogo de los niveles educativos 
 	  function _catalogoNivelEduc(tipoMiembro){
 		  
 		 var cNivelEducStore = {};
 		   		  
 		 var lstPr=xhr.get({
	            url: dojo.config.app.urlBase + 'catalogos/listNivelesEducConafe/'+tipoMiembro,
	            sync: true,
	            preventCache:true,
	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
	            handleAs: "json"
		   	});
		   
		lstPr.then(function(cNivelEducConafe){
			   		
			var dataDif=[];
	   
			for(var i in cNivelEducConafe){
				dataDif.push({name:cNivelEducConafe[i].nomNiveleduc, id:cNivelEducConafe[i].cNiveleduc});
			}

			 cNivelEducStore = new Memory({
				data: dataDif
			});
			
		});
		
		 return cNivelEducStore;
		
 	  }
 	  
 	  
      //Funcion para obtener el catalogo de los generos
 	  function _catalogoGenero(){
 		
 		  var jsonGeneroStore ={ identifier: 'genero',
 			            label: 'nomGenero',
 			            items: [{genero: 'M',nomGenero: 'H'},
 			                	{genero: 'F',nomGenero: 'M'}]};
 		  
 		  
 		  generoStore = new dojo.data.ItemFileWriteStore({data: jsonGeneroStore});
 		  
 		  return generoStore;
 	  }
 	  
 	  
 	  //funcion pra obtener el catalogo de cargos
 	  function _catalogoCargo(){
 		  
 		 var cargoStore = new dojo.data.ItemFileWriteStore({
 			   url: dojo.config.app.urlBase + "catalogos/cargos/CE"
 		   });

 	  return cargoStore;
 	 } 
 	  
 	  //funcion para obtener el catalogo de programas educativos
 	  function _catalogoProgramEdu(){

 		 var options= new Array();
 		  
 		 options=[{label:'Maternal',   value: 1,  selected:false},
 		          {label:'Prescolar',  value: 2,  selected:false},
 		          {label:'Primaria',   value: 3,  selected:false},
 		          {label:'Secunadria', value: 4,  selected:false}
 		          ];

 		  return options;  
 	  
 	  }
 	  
	// Se manda a actualizar la informacion capturada
	function saveActaConstitutiva(cApec, storeCcts) {
		
		var standby = new Standby({
			target : "dialogCaptiraDGConafe"
		});
		document.body.appendChild(standby.domNode);
		standby.startup();
	
		var form = registry.byId('registraActaReunion');
		
		if ( form.validate() == false){return false;} 
		
			
		if(!_validateConsejo()){return false;}
		
		var apec = {
				cApec:cApec,
				tpoRegistro:registry.byId('tpoRegistro').get('value'),
				idLocalidad:registry.byId('nomLocalidadApec').get('value'),
				idMunicipio:registry.byId('nomMunicipioApec').get('value'),
				idEntidadfed:registry.byId('nomEntidadApec').get('value')				
			};

		

		var apecReunion = {fchReunion: registry.byId('fchRegistro').get('value'),
				horaIni: registry.byId('horaInicio').get('value'),
				horaFin: registry.byId('horaFinal').get('value'),
				observaciones: registry.byId('observaciones').get('value')
	    	};
		if (Date.parse('01/01/2014 ' + registry.byId('horaInicio').get('value')) > Date.parse('01/01/2014 ' + registry.byId('horaFinal').get('value'))){
			
			utils.cstmAlert("La hora final de su reuni\u00F3n es incorrecta, favor de verificar");
			return false;	
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
			   || grid.store.getValue(item,'cCargo') == null || grid.store.getValue(item,'cCargo') == ""
			   || grid.store.getValue(item,'cNiveleduc') == null || grid.store.getValue(item,'cNiveleduc') == ""
				   
			 ){
				utils.cstmAlert("Uno o m\u00e1s integrantes no cuentan con la informaci\u00F3n requerida");
				return false;
			}

			var integrante = {
				cIntegrante : grid.store.getValue(item,'cIntegrante'),
				cApec : grid.store.getValue(item,'cApec'),
				paternoIntegrante : grid.store.getValue(item,'paternoIntegrante'),
				maternoIntegrante : grid.store.getValue(item,'maternoIntegrante'),
				nombreIntegrante : grid.store.getValue(item,'nombreIntegrante'),
				cCargo : grid.store.getValue(item, 'cCargo'),
			// 	genero : grid.store.getValue(item, 'genero'),
				genero : null,
				edad : grid.store.getValue(item, 'edad'),
				cNiveleduc : grid.store.getValue(item, 'cNiveleduc'),
			// 	curp: grid.store.getValue(item,'curp')
				curp: null
			};
			
			var infoPrincipal = {
				cApec: grid.store.getValue(item,'cApec'),
				cReunion: constants.ACTA_CONSTITUTIVA,
				cApecIntegrante: grid.store.getValue(item,'cApec'),
				cIntegrante: grid.store.getValue(item,'cIntegrante'),
				integrante : integrante
			};
			integrantes.push(infoPrincipal);
		}
		
		var instructores = new Array();
		var gridInstructor = registry.byId('gridInstructor');
		
		if(gridInstructor.rowCount==0){
			utils.cstmAlert("Debe registrar al menos un lider para la educaci\u00f3n comunitaria.");
			return false;
		}
		
		// Obtiene la informaci—n del Grid
		for ( var i = 0; i < gridInstructor.rowCount; i++) {
	
			var item = gridInstructor.getItem(i);
			// Genera un nuevo objeto instructor de cada renglon del
			// grid.
			if(gridInstructor.store.getValue(item,'paternoInstructor') == null || gridInstructor.store.getValue(item,'paternoInstructor') == ""
			   || gridInstructor.store.getValue(item,'nombreInstructor') == null || gridInstructor.store.getValue(item,'nombreInstructor') == ""
			   || gridInstructor.store.getValue(item,'cNiveleduc') == null || gridInstructor.store.getValue(item,'cNiveleduc') == ""	   
			   || gridInstructor.store.getValue(item,'cNiveleduc') == null || gridInstructor.store.getValue(item,'cNiveleduc') == ""
			 ){
				utils.cstmAlert("Uno o m\u00e1s instructores no cuentan con la informaci\u00F3n requerida");
				return false;
			}

			var cCctsArray = new Array();
			var cCcts = gridInstructor.store.getValue(item,'cCcts');
			for ( var j in cCcts) {
				cCctsArray.push({cCct: cCcts[j]});
			}

			var instructor = {
				cInstructor : gridInstructor.store.getValue(item,'cInstructor'),
				cApec : gridInstructor.store.getValue(item,'cApec'),
				paternoInstructor : gridInstructor.store.getValue(item,'paternoInstructor'),
				maternoInstructor : gridInstructor.store.getValue(item,'maternoInstructor'),
				nombreInstructor : gridInstructor.store.getValue(item,'nombreInstructor'),
			//	genero : gridInstructor.store.getValue(item, 'genero'),
				genero: null,
				edad : gridInstructor.store.getValue(item, 'edad'),
				cNiveleduc : gridInstructor.store.getValue(item, 'cNiveleduc'),
			//	curp :	gridInstructor.store.getValue(item,'curp'),
				curp: null,
				ccts: cCctsArray
			};

			var infoPrincipal = {
				cApec: gridInstructor.store.getValue(item,'cApec'),
				cReunion: constants.ACTA_CONSTITUTIVA,
				cApecInstructor: gridInstructor.store.getValue(item,'cApec'),
				cInstructor: gridInstructor.store.getValue(item,'cInstructor'),
				instructor : instructor,
				editable : false
			};
			
			instructores.push(infoPrincipal);
		}
		
		var asistentes = new Array();
		
		// var actividades = [{cActividad: 11},{cActividad:12}];
		var gridAsistente = registry.byId('gridAsistente');
		
		// Obtiene la informaci—n del Grid
		for ( var i = 0; i < gridAsistente.rowCount; i++) {
	
			var item = gridAsistente.getItem(i);
			// Genera un nuevo objeto asistente de cada renglon del
			// grid.
			if(gridAsistente.store.getValue(item,'paternoAsistente') == null || gridAsistente.store.getValue(item,'paternoAsistente') == ""
			   || gridAsistente.store.getValue(item,'nombreAsistente') == null || gridAsistente.store.getValue(item,'nombreAsistente') == ""	
			//   || gridAsistente.store.getValue(item,'genero') == null || gridAsistente.store.getValue(item,'genero') == ""
			   || gridAsistente.store.getValue(item,'cNiveleduc') == null || gridAsistente.store.getValue(item,'cNiveleduc') == ""
			 ){
				utils.cstmAlert("Uno o m\u00e1s asistentes no cuentan con la informaci\u00F3n requerida");
				return false;
			}
			
			var asistente = {
				cAsistente : gridAsistente.store.getValue(item,'cAsistente'),
				paternoAsistente : gridAsistente.store.getValue(item,'paternoAsistente'),
				maternoAsistente : gridAsistente.store.getValue(item,'maternoAsistente'),
				nombreAsistente : gridAsistente.store.getValue(item,'nombreAsistente'),
			//	genero : gridAsistente.store.getValue(item, 'genero'),
				genero: null,
				edad : gridAsistente.store.getValue(item, 'edad'),
				cNiveleduc : gridAsistente.store.getValue(item, 'cNiveleduc')
				
			};
						
			asistentes.push(asistente);
		}
	

		var promotores = new Array();
		var gridPromotor = registry.byId('gridPromotor');
		
/*vblake		if(gridPromotor.rowCount==0){
			utils.cstmAlert("Debe registrar al menos un Promotor Educativo.");
			return false;
		}
*/		
		// Obtiene la informaci—n del Grid
		for ( var i = 0; i < gridPromotor.rowCount; i++) {
	
			var item = gridPromotor.getItem(i);
			// Genera un nuevo objeto promotor de cada renglon del
			// grid.
			if(gridPromotor.store.getValue(item,'paternoPromotor') == null || gridPromotor.store.getValue(item,'paternoPromotor') == ""
			   || gridPromotor.store.getValue(item,'nombrePromotor') == null || gridPromotor.store.getValue(item,'nombrePromotor') == ""
			//   || gridPromotor.store.getValue(item,'nomNiveleduc') == null || gridPromotor.store.getValue(item,'nomNiveleduc') == ""	   
			   || gridPromotor.store.getValue(item,'cNiveleduc') == null || gridPromotor.store.getValue(item,'cNiveleduc') == ""
			 ){
				utils.cstmAlert("Uno o m\u00e1s promotores educativos no cuentan con la informaci\u00F3n requerida");
				return false;
			}

	

			var promotor = {				
				cApec : gridPromotor.store.getValue(item,'cApec'),
				cPromotor : gridPromotor.store.getValue(item,'cPromotor'),
				paternoPromotor : gridPromotor.store.getValue(item,'paternoPromotor'),
				maternoPromotor : gridPromotor.store.getValue(item,'maternoPromotor'),
				nombrePromotor : gridPromotor.store.getValue(item,'nombrePromotor'),
				numServ : gridPromotor.store.getValue(item, 'numServ'),
			    edad : gridPromotor.store.getValue(item, 'edad'),
				nomNiveleduc : gridPromotor.store.getValue(item, 'cNiveleduc'),				
			};

	
			
			promotores.push(promotor);
		}
		
		
		
		
		
		var actaConstitutiva = {
			apec : apec,
			reunion : apecReunion,
			instructores : instructores,
			integrantes : integrantes,
			asistentes: asistentes,
			promotores : promotores
		};
	
		var urlJson = dojo.config.app.urlBase
				+ 'actaConstitutiva/save';
		
		xhr.post({
					url : urlJson,
					postData : json.toJson(actaConstitutiva),
					headers : {
						"Content-Type" : "application/json; charset=UTF-8"
					},
					handleAs : 'json',
					handle : function(response) {
						if (response == 'SyntaxError: syntax error') {
		    	            window.location.reload();
						}else if (response != 1) {
		                	utils.cstmAlert(
							'Ocurri\u00F3 un error al registrar la informaci\u00F3n de su APEC.');
		                	standby.hide();
						} else {
							utils.cstmAlert(
							'La informaci\u00F3n de su APEC se registr\u00F3 correctamente.');						
							reuniones.refresh(registry.byId('nomEntidadApec').get('value'),
											  registry.byId('nomMunicipioApec').get('value'),
									          registry.byId('nomLocalidadApec').get('value'), 
									          storeCcts);
							standby.hide();
						}
						
						registry.byId('dialogCaptiraDGConafe').destroyRecursive(false);
	
					}
				}).progress(standby.show());
	
	}
	
	/*
	 * Obtiene la lista de las descripciones de los programas educativos seleccionados 
	 */
	function getMltCkDisplay( ){
		
	}
	
	function _validateConsejo(){
	
		var grid = registry.byId('grid');
		var numPresidente = 0;
		var numSecretario = 0;
		var numTesorero=0;
		var numVocales = 0;

		var cargo = 0;
		
		
		// Obtiene la informaci—n del Grid
		for ( var i = 0; i < grid.rowCount; i++) {
			var item = grid.getItem(i);
	
			cargo = grid.store.getValue(item, 'cCargo');
			
			
			if(cargo == 4){//Es presidente 
				numPresidente++;
			}else if(cargo == 5){//Es secretario
				numSecretario++;
			}else if(cargo == 6){//Es consejero
				numVocales++;
			}else if(cargo == 8){//Es consejero
				numTesorero++;
			}
		
		}
		
		if(numPresidente!=1){
			utils.cstmAlert("La APEC debe contar con un y solo un Presidente");
			return false;
		}else if(numSecretario>1){
			utils.cstmAlert("La APEC debe contar con un secretario como m\u00E1ximo");
			return false;
		}else if(numVocales>3){
			utils.cstmAlert("La APEC debe contar con un m\u00E1ximo de tres vocales");
			return false;
		}else if(numTesorero>1){
			utils.cstmAlert("La APEC debe contar con un tesorero como m\u00E1ximo");
			return false;
		}
			
		return true;
	}
  
   return {
	   init:init,
	   saveActaConstitutiva:saveActaConstitutiva
	 };
   });