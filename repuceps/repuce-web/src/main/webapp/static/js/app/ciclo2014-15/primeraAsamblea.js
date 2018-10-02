define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/grid/DataGrid","dojo/data/ItemFileWriteStore", 
         "dojo/store/Memory", "dojo/dom", "dijit/form/ValidationTextBox","dijit/form/FilteringSelect",
         "dojo/_base/json","dojo/on","app/util/constants","dijit/form/Button", "dijit/form/Form",
         "dojo/_base/xhr","dojo/_base/lang","dojox/widget/Standby","app/ciclo2014-15/reuniones", 
         "app/util/constants","dijit/Dialog","dojo/_base/lang","dijit/form/RadioButton", "app/util/jsUtils"], 
function( ContentPane,registry,array,utils,DataGrid,ItemFileWriteStore,
		Memory, dom,ValidationTextBox,FilteringSelect,json,on,constants,Button,Form,xhr,
		lang,Standby,reuniones, constants,Dialog,lang,RadioButton, jsUtils){

   //savePrimeraAsamblea
   var primeraAsamblea= new Object();
   
   var maxIndexConsejero = 0;
   var maxIndexEscrutador = 0;
   var maxIndexPresidente = 0;
   var maxIndexTecnico = 0;
   var maxAsuntos = 0;
   var pregunta1=false;
   var pregunta2=false;
   var pregunta3=false;
   var pregunta4=false;
   var pregunta5=false;
   var gSecreTecnicoSi = 0;
   var escrutadorPregunta5a;
   //var escrutadorPregunta5a=primeraAsamblea.preguntas==null?true: primeraAsamblea.preguntas.respuesta5==1 ? true:false;
  // var Pregunta5a=primeraAsamblea.preguntas==null?true: primeraAsamblea.preguntas.respuesta5==1 ? true:false;

   var gActividades= new Array();
   var jsonStore= new Array();
   var cStore = Object();
   var dataInt=new Array();
   var infCctNivel = new Object();
   var clave = '';
   var clave1 = '';

   
   
   function init(actividades,cct, ReunionObj, infCctPar){
	   primeraAsamblea=!ReunionObj?{}:ReunionObj;
	   	gActividades=actividades;
	   	
	   	infCctNivel = infCctPar;
        clave=infCctNivel.cveCct;

	   	
	   	_elecciones(array.indexOf(actividades, 11)!=-1 || array.indexOf(actividades, 12)!=-1);
//	   	_escrutadores(array.indexOf(actividades, 11)!=-1 || array.indexOf(actividades, 12)!=-1);
	   	_consejo(array.indexOf(actividades, 11)!=-1 || array.indexOf(actividades, 12)!=-1);
	    _presidentes(array.indexOf(actividades, 11)!=-1 || array.indexOf(actividades, 12)!=-1);
//	    _secretarios(array.indexOf(actividades, 11)!=-1 || array.indexOf(actividades, 12)!=-1);
	    _asunto(array.indexOf(actividades, 11)!=-1 || array.indexOf(actividades, 12)!=-1);
	    
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
  
   function _escrutadores(crea){
	   if(crea){
		   if(!registry.byId('escrutaPes')){
			   var escrutaPes = 'escrutaPes';
		   	   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:'Escrutadores',
		           id:'escrutaPes'
		       }));			   
		   
		   
		   layout = [[	  { name: 'idEscrutador', field: 'cscEscrutador', width: '5px', hidden:true},
		               	  { name: 'Primer apellido', field: 'paternoEscrutador', width: '150px'},
		               	  { name: 'Segundo apellido', field: 'maternoEscrutador',  width:'150px'},
			    		  { name: 'Nombre', field: 'nombreEscrutador',  width:'150px'}
			        ]];
		   
		   tablaGrid=	'<table border="0" align="left" width= "900px">'+
		  	'<tr>' +
		  	'	<td><input id="escrutaGrid"/></td>'+
		  	'</tr>'+
		    '<tr>' +
	   	   	'<td><input id="a_escrutaGrid"/>'+
		   	   	'<input id="e_escrutaGrid"/>'+
		   	   	'<input id="d_escrutaGrid"/></td>'+
	   	   	'</tr>'+
	   	   	'</table>';
		   
		    dom.byId('escrutaPes').innerHTML=tablaGrid;
   		
		    //registry.byId('pestanias').selectChild( registry.byId(escrutaPes), true);
	
		    
   			new DataGrid({
		        id: 'escrutaGrid',
		        structure: layout,
		        rowSelector: '10px',
		        height: '300px',
				width: '850px'
		        }, 'escrutaGrid').startup();
   		   		   		
   			var rEscrutadores = primeraAsamblea.escrutadores?primeraAsamblea.escrutadores:[];
   			var dataJsonStoreEscrut = {
					identifier: 'cscEscrutador',
					items: rEscrutadores
				};

   			 maxIndexEscrutador = rEscrutadores.length;
   			
			//Se crea el store de los escrutadores.
			jsonStoreEscrut = new ItemFileWriteStore({data: dataJsonStoreEscrut});
   				    	
		    registry.byId('escrutaGrid').setStore(jsonStoreEscrut);
		    
		    new Button({
				label : " Agregar ",
				id:'a_escrutaGrid',	
				onClick : function() {
					var numEsc = registry.byId('escrutaGrid');
					if(numEsc.rowCount>=2){
					utils.cstmAlert("El Consejo Escolar no debe contar con mas de 2 Escrutadores");
					return false;
					}
					funEscruta();
				}
			}, 'a_escrutaGrid');
	    	
	    	new Button({
				label : " Editar ",
				id:'e_escrutaGrid',	
				onClick : function() {	
					var index = registry.byId('escrutaGrid').selection.selectedIndex;
					var item = registry.byId('escrutaGrid').getItem(index);					
					if(index!=-1){														                                     	
                    	var itemToEdit={selectedItem:index,
                    			idEscrutador: registry.byId('escrutaGrid').store.getValue(item, 'cscEscrutador'), 
                    			paterno: registry.byId('escrutaGrid').store.getValue(item, 'paternoEscrutador'), 
                    			materno: registry.byId('escrutaGrid').store.getValue(item, 'maternoEscrutador'),
                    			nombre: registry.byId('escrutaGrid').store.getValue(item, 'nombreEscrutador')
                    			};
                    	funEscruta(itemToEdit);
                      
		             }else{
		            	 utils.cstmAlert(
							'Debe seleccionar solo un registro.');
		             }
					
				}
			}, 'e_escrutaGrid');
	    	
	    	new Button({
				label : " Eliminar",
				id: 'd_escrutaGrid',
				onClick : function() {					
					registry.byId('escrutaGrid').removeSelectedRows();
					registry.byId('escrutaGrid').store.save();
				}
			}, 'd_escrutaGrid');   
		   
	   }else{
		   if(registry.byId("escrutaPes")){
			   //registry.byId('pestanias').closeChild(registry.byId("escrutaPes"));
		   }
	   }
    }
   }
   function funEscruta ( itemToEdit ){
   		var edit=false;
	    if(!itemToEdit){
		   itemToEdit={idEscrutador: 0,paterno:'',materno:'', nombre:''};
	    }else{
		   edit=true;
	    }
	   
	    //----------------------------Diseño de la ventana
	   	var title = 'Escrutadores';
	   	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	   	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
	   	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    utils.createTag('div','prCnt','dcDetail');    
	    
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "550px" >'+
				    			   '<tr><td> '+
				    			   '	 <b>*Primer apellido</b><br/>'+
				    			   '<input id="paterno"/><br/>'+
				    			   '</td></tr>'+
				    			   '<tr><td> '+
				    			   '	 <b>Segundo apellido</b><br/>'+
				    			   '<input id="materno"/><br/>'+
				    			   '</td></tr>'+
				    			   '<tr><td> '+
				    			   '	 <b>*Nombre</b><br/>'+
				    			   '<input id="nombre"/><br/>'+
				    			   '</td></tr>'+
				    			   '</table>';
	    
	    
	    var paterno = new ValidationTextBox({
	           promptMessage:"Primer apellido",
	           value:itemToEdit.paterno, 
	           trim:"true",    
	           uppercase: true,
	           maxLength:"60",
	           required: true,
	           style:"display:block; width:160px"
	        }, 'paterno');
	    var materno = new ValidationTextBox({
	           promptMessage:"Segundo apellido",
	           value:itemToEdit.materno, 
	           trim:"true",   
	           uppercase: true,
	           maxLength:"60",	           
	           style:"display:block; width:160px"
	        }, 'materno');
	    var nombre = new ValidationTextBox({
	           promptMessage:"Nombre(s)",
	           value:itemToEdit.nombre, 
	           trim:"true",  
	           uppercase: true, 
	           maxLength:"60",
	           required: true,
	           style:"display:block; width:160px"
	        }, 'nombre');
	    
	   //------------------------------------
	    utils.createTag('div','prBtnAceptar','dcDetail');
	    
	    new Button({
	    				label : " Aceptar " ,
	    				onClick : function() {
	    					var form = registry.byId('dDetail');
	    					if (!form.validate()){  
	    						utils.cstmAlert('Favor de registrar los datos requeridos');
	    						return false;
	    					}
	    					var grid = registry.byId('escrutaGrid');
	    					try{
	    						if(edit){
	    							var index = grid.selection.selectedIndex;
	    							var item = grid.getItem(index);
	    							grid.store.setValue(item, 'paternoEscrutador', paterno.get('value'));
	    							grid.store.setValue(item, 'maternoEscrutador', materno.get('value'));
	    							grid.store.setValue(item, 'nombreEscrutador', nombre.get('value'));
	    						} else {
	    							 var myNewItem = {  cscEscrutador: ++maxIndexEscrutador, 
	    									 			paternoEscrutador: paterno.get('value'),
	    									 			maternoEscrutador: materno.get('value'), 
								      				    nombreEscrutador:  nombre.get('value'),
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
   //------------------------------------------Consejeros
   function _consejo(crea){
	   if(crea){
		   if(!registry.byId('consejoPes')){
			   var escrutaPes = 'consejoPes';
		   	   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:'Consejeros',
		           id:'consejoPes'
		       }));			   
		   
		   
		   var layout = [[
					      { name: 'Id',						field: 'cscIntegrante', 	width: '1px', hidden:true},
					      { name: 'Apellido Paterno',		field: 'paternoIntegrante',	width: '130px'},      
						  { name: 'Apellido Materno',		field: 'maternoIntegrante',	width: '110px'},      
					      { name: 'Nombre', 				field: 'nombreIntegrante',	width: '130px'},
					      { name: 'Cargo en el Consejo',	field: 'nomCargo',			width: '110px',hidden:true},
					      { name: 'Cargo en el Consejo',	field: 'cCargo',			width: '1px',hidden:true},
					      { name: 'Identificaci\u00F3n oficial ',					field: 'identificacion',				width: '110px' ,hidden:true},
					    //{ name: 'N\u00famero de identificaci\u00F3n oficial ',					field: 'curp',				width: '110px'},
					      { name: 'En Calidad',			field: 'nomCalidad',		width: '100px'},
					      { name: 'En Calidad',			field: 'cCalidad',			width: '1px',hidden:true},
					      { name: 'Correo electr\u00F3nico',field: 'emailIntegrante',	width: '100px'},
					      { name: 'Tel\u00E9fono',			field: 'telIntegrante',		width: '90px' },
					      { name: 'Escolaridad', 			field: 'nomNiveleduc',		width: '100px'},
					      { name: 'Escolaridad', 			field: 'cNiveleduc',		width: '1px',hidden:true},
					      { name: 'G\u00E9nero',			field: 'nomGenero',			width: '80px' ,hidden:true},
					      { name: 'G\u00E9nero',			field: 'genero',			width: '1px' ,hidden:true},
					      { name: 'Tiene hijos estudiando en el Centro Escolar', field: 'nomGrado',width: '100px',hidden:true},
					      { name: 'Acreditaci\u00F3n', 			field: 'acreditacion',width: '100px',hidden:true},
					      { name: 'Tiene hijos estudiando', field: 'cGrado',width: '1px',hidden:true},					      
					      { name: 'Alta', field: 'fchAlta', width: '1px', hidden:true}]];
		   
		   tablaGrid=	'<table border="0" align="left" width= "900px">'+
		  	'<tr>' +
		  	'	<td><input id="consejoGrid"/></td>'+
		  	'</tr>'+
		  	'<tr>' +
	   	   	'<td><input id="a_consejoGrid"/>'+
		   	   	'<input id="e_consejoGrid"/>'+
		   	   	'<input id="d_consejoGrid"/></td>'+
	   	   	'</tr>'+
	   	   	'</table>';
		   
		    dom.byId('consejoPes').innerHTML=tablaGrid;
   		
		    //registry.byId('pestanias').selectChild( registry.byId(escrutaPes), true);
		    
   			new DataGrid({
		        id: 'consejoGrid',
		        structure: layout,
		        rowSelector: '10px',
		        height: '300px',
				width: '850px'
		        }, 'consejoGrid').startup();
   		   		   		
   			var rIntegrantes = primeraAsamblea.integrantes?primeraAsamblea.integrantes:[];
   			
   			for(var index in rIntegrantes){
   				if(maxIndexConsejero<rIntegrantes[index].cscIntegrante){
   					maxIndexConsejero=rIntegrantes[index].cscIntegrante;
   				}
   				for(var indexj in jsonCalidadStore.items){
   					if( jsonCalidadStore.items[indexj].cCalidad == rIntegrantes[index].cCalidad ){
   						rIntegrantes[index].nomCalidad = jsonCalidadStore.items[indexj].nomCalidad;
   					}	
   				}   				
   			}
   			
   			//maxIndexConsejero = rIntegrantes.length;
   			
   			var dataJsonStoreConsejo = {
					identifier: 'cscIntegrante',
					items: rIntegrantes
				};

   			dataInt = dataJsonStoreConsejo;
   			
			//Se crea el store de los escrutadores.
			jsonStoreConsejo = new ItemFileWriteStore({data: dataJsonStoreConsejo});
   				    	
		    registry.byId('consejoGrid').setStore(jsonStoreConsejo);
		    
		    new Button({
				label : " Agregar ",
				id:'a_consejoGrid',	
				onClick : function() {
					var gridCuentaConsejo = registry.byId('consejoGrid');
					
					// Obtiene la informaci—n del Grid
					numConsejeros=gridCuentaConsejo.rowCount;

					clave1 = clave.substring(2,5);
					if(clave1=='DAI' || clave1=='DCC' || clave1=='DCI' || clave1=='DPB' || clave1=='ECC' || clave1=='EPB'|| clave1=='ESC' || clave1=='PCC' || clave1=='PPB' || clave1=='PTB' || clave1=='DSC' || clave1=='NJN' || clave1=='XTV' || clave1=='EDI'|| clave1=='ODI' || clave1=='EML' || clave1=='DZS' || clave1=='DCO' || clave1=='DLA' || clave1=='DML' || clave1=='ECO' || clave1=='EDM' || clave1=='EIV' || clave1=='ELA' || clave1=='ELS' || clave1=='EML' || clave1=='FAS' || clave1=='FLS' || clave1=='FUA' || clave1=='FUX'|| clave1=='PDM' || clave1=='PIM' || clave1=='PIV' || clave1=='PLA' || clave1=='PML' || clave1=='DZC' || clave1=='DNM')
						{
						if(numConsejeros>=25){
						utils.cstmAlert("El Consejo Escolar no debe contar con mas de 25 Integrantes");
						return false;
						}
						}
					if(numConsejeros>=25){
						utils.cstmAlert("El Consejo Escolar no debe contar con mas de 25 Integrantes");
						return false;
						}
						else{
					_detalleIntegrante();
						}
				}
			}, 'a_consejoGrid');
	    	
	    	new Button({
				label : " Editar ",
				id:'e_consejoGrid',	
				onClick : function() {	
					var index = registry.byId('consejoGrid').selection.selectedIndex;
					var item = registry.byId('consejoGrid').getItem(index);					
					if(index!=-1){														                                     	
                    	var itemToEdit={selectedItem:index,
                    			cscIntegrante: 		registry.byId('consejoGrid').store.getValue(item, 'cscIntegrante'),
                  				paternoIntegrante: 	registry.byId('consejoGrid').store.getValue(item, 'paternoIntegrante'), 
                  				maternoIntegrante: 	registry.byId('consejoGrid').store.getValue(item, 'maternoIntegrante'),
                   				nombreIntegrante: 	registry.byId('consejoGrid').store.getValue(item, 'nombreIntegrante'),
                   				cCargo: 			registry.byId('consejoGrid').store.getValue(item, 'cCargo'),
                   				identificacion: 	registry.byId('consejoGrid').store.getValue(item, 'identificacion'),
                   				//curp: 				registry.byId('consejoGrid').store.getValue(item, 'curp'),
                   				cCalidad: 			registry.byId('consejoGrid').store.getValue(item, 'cCalidad'),
                   				emailIntegrante: 	registry.byId('consejoGrid').store.getValue(item, 'emailIntegrante'),
                   				telIntegrante: 		registry.byId('consejoGrid').store.getValue(item, 'telIntegrante'),
                   				cNiveleduc: 		registry.byId('consejoGrid').store.getValue(item, 'cNiveleduc'),
                   				genero:				registry.byId('consejoGrid').store.getValue(item, 'genero'),
                   				cGrado:				registry.byId('consejoGrid').store.getValue(item, 'cGrado'),
                   				cAcredita:			registry.byId('consejoGrid').store.getValue(item, 'acreditacion')
                    			};
                    	_detalleIntegrante(itemToEdit);
                      
		             }else{
		            	 utils.cstmAlert(
							'Debe seleccionar solo un registro.');
		             }
					
				}
			}, 'e_consejoGrid');
	    	
	    	new Button({
				label : " Eliminar",
				id: 'd_consejoGrid',
				onClick : function() {
					var grid = registry.byId('consejoGrid');
					var gridPresi = registry.byId('presiGrid');
					//var gridSecre = registry.byId('secreGrid');
					for ( var i in grid.selection.getSelected()) {
					var item=grid.selection.getSelected();
					for(var j=0;j<gridPresi.rowCount;j++)
						{
						var itemj=gridPresi.getItem(j);
						if(itemj.idConsejero[0]==item[i].cscIntegrante)
							{
							utils.cstmAlert("Primero debe eliminarlo en Candidato Presidente");
						return;
							}
						}
//					for(var j=0;j<gridSecre.rowCount;j++)
//					{
//					var itemj=gridSecre.getItem(j);
//					if(itemj.idConsejero[j]==item[i].cscIntegrante)
//						{
//						utils.cstmAlert("Primero debe eliminarlo en Candidato Secretario");
//					return;
//						}
//					}
					
					}
					registry.byId('consejoGrid').removeSelectedRows();
					registry.byId('consejoGrid').store.save();
				}
			}, 'd_consejoGrid');   
		   
	   }else{
		   if(registry.byId("consejoPes")){
			   //registry.byId('pestanias').closeChild(registry.byId("consejoPes"));
		   }
	   }
    }
   }
   
   function funConsejo ( itemToEdit ){
   		var edit=false;
	    if(!itemToEdit){
		   itemToEdit={idEscrutador: 0,paterno:'',materno:'', nombre:''};
	    }else{
		   edit=true;
	    }
	   
	    //----------------------------Diseño de la ventana
	   	var title = 'Consejeros';
	   	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	   	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
	   	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    utils.createTag('div','prCnt','dcDetail');    
	    
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "550px" >'+
				    			   '<tr><td> '+
				    			   '	 <b>*Primer apellido</b><br/>'+
				    			   '<input id="paterno"/><br/>'+
				    			   '</td></tr>'+
				    			   '<tr><td> '+
				    			   '	 <b>Segundo apellido</b><br/>'+
				    			   '<input id="materno"/><br/>'+
				    			   '</td></tr>'+
				    			   '<tr><td> '+
				    			   '	 <b>*Nombre</b><br/>'+
				    			   '<input id="nombre"/><br/>'+
				    			   '</td></tr>'+
				    			   '</table>';
	    
	    
	    var paterno = new ValidationTextBox({
	           promptMessage:"Primer apellido",
	           value:itemToEdit.paterno, 
	           trim:"true",    
	           maxLength:"60",
	           required: true,
	           style:"display:block; width:160px"
	        }, 'paterno');
	    var materno = new ValidationTextBox({
	           promptMessage:"Segundo apellido",
	           value:itemToEdit.materno, 
	           trim:"true",    
	           maxLength:"60",	           
	           style:"display:block; width:160px"
	        }, 'materno');
	    var nombre = new ValidationTextBox({
	           promptMessage:"Primer apellido",
	           value:itemToEdit.nombre, 
	           trim:"true",    
	           maxLength:"60",
	           required: true,
	           style:"display:block; width:160px"
	        }, 'nombre');
	    
	   //------------------------------------
	    utils.createTag('div','prBtnAceptar','dcDetail');
	    
	    new Button({
	    				label : " Aceptar " ,
	    				onClick : function() {
	    					var form = registry.byId('dDetail');
	    					if (!form.validate()){  
	    						utils.cstmAlert('Favor de registrar los datos requeridos');
	    						return false;
	    					}
	    					var grid = registry.byId('escrutaGrid');
	    					try{
	    						if(edit){
	    							var index = grid.selection.selectedIndex;
	    							var item = grid.getItem(index);
	    							grid.store.setValue(item, 'paternoEscrutador', paterno.get('value'));
	    							grid.store.setValue(item, 'maternoEscrutador', materno.get('value'));
	    							grid.store.setValue(item, 'nombreEscrutador', nombre.get('value'));
	    						} else {
	    							 var myNewItem = {  idEscrutador: ++maxIndexConsejero, 
	    									 			paternoEscrutador: paterno.get('value'),
	    									 			maternoEscrutador: materno.get('value'), 
								      				    nombreEscrutador:  nombre.get('value'),
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
   //------------------------------------------
   //------------------------------------------ Presidentes
   function _presidentes(crea){
	   if(crea){
		   if(!registry.byId('presiPes')){			   			   
		   	   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:'Candidatos a Presidente',
		           id:'presiPes'
		       }));			   
		   
		   
		   layout = [[	  { name: 'idPresi', 			field: 'idPresi', width: '5px', hidden:true},
		              	  { name: 'idConsejero', 		field: 'idConsejero', width: '5px', hidden:true},
		               	  { name: 'Primer apellido', 	field: 'paternoPresi',  width:'100px'},
		               	  { name: 'Segundo apellido', 	field: 'maternoPresi',  width:'100px'},
		               	  { name: 'Nombre(s)', 			field: 'nombrePresi',  width:'100px'},
			    		  { name: 'Votos', 				field: 'votosPresi',  width:'100px'},
			    		  { name: 'Nombre Hijo', 				field: 'nombreHijoPresi',  width:'100px',hidden:true},
			    		  { name: 'Tiene hijos estudiando en el Centro Escolar', field: 'nomGrado' ,hidden:true},			    		  
			    		  { name: 'Tiene hijos estudiando', field: 'cGrado',width: '1px',hidden:true},
			    		  { name: 'Acreditaci\u00F3n', 			field: 'acreditacion',width: '100px'},
			    		  { name: 'idAcredita', field: 'idAcredita',width: '1px',hidden:true}
			        ]];
		   
		   tablaGrid=	'<table border="0" align="left" width= "900px">'+
		  	'<tr>' +
		  	'	<td><input id="presiGrid"/></td>'+
		  	'</tr>'+
		  	'<tr>' +
	   	   	'<td><input id="a_presiGrid"/>'+
		   	   	'<input id="e_presiGrid"/>'+
		   	   	'<input id="d_presiGrid"/></td>'+
	   	   	'</tr>'+
	   	   	'</table>';
		   
		    dom.byId('presiPes').innerHTML=tablaGrid;
   		
   			new DataGrid({
		        id: 'presiGrid',
		        structure: layout,
		        rowSelector: '10px',
		        height: '300px',
				width: '850px'
		        }, 'presiGrid').startup();
   		   		   		
   			var rCandidatoPresidente = primeraAsamblea.presidentes?primeraAsamblea.presidentes:[];
   			var rCandidatoPresidenteData = [];
   			
   			maxIndexPresidente = rCandidatoPresidente.length;
   			
   			if(rCandidatoPresidente.length>0){
   				var rIntegrantesDum = primeraAsamblea.integrantes;
   				for (var i in rCandidatoPresidente) {
   					maxIndexPresidente =rCandidatoPresidente[i].idcandidato;
   					for (var j in rIntegrantesDum) {
   	   					if(rIntegrantesDum[j].cscIntegrante==rCandidatoPresidente[i].idconsejero){
	   	   					if(rCandidatoPresidente[i].acreditacion=='Constancia de inscripci\u00F3n'){
								idAcredita = 1;
							} else if(rCandidatoPresidente[i].acreditacion=='Constancia emitida por el director escolar'){
								idAcredita = 2;
							} else if(rCandidatoPresidente[i].acreditacion==null){
								idAcredita = 0;
							} else {idAcredita = 3;}
   	   						rCandidatoPresidenteData.push({
   	   							idPresi: 		rCandidatoPresidente[i].idcandidato,
   	   							idConsejero: 	rCandidatoPresidente[i].idconsejero,
   	   							paternoPresi: 	rIntegrantesDum[j].paternoIntegrante, 
   	   							maternoPresi: 	rIntegrantesDum[j].maternoIntegrante, 
   	   							nombrePresi: 	rIntegrantesDum[j].nombreIntegrante,
   	   							votosPresi: 	rCandidatoPresidente[i].votos,
   	   							acreditacion: rCandidatoPresidente[i].acreditacion,
   	   						    nombreHijoPresi:rCandidatoPresidente[i].nombreHijoPresi,
   	   							idAcredita: idAcredita
   	   						});
   	   					}
   	   				}
   				}   				   				
   			}
   			
   			var data = {
				      identifier: "idPresi",
				      items: rCandidatoPresidenteData
				    };
		
   			
   			
	    	var newStore = new ItemFileWriteStore({data: data}); 
	    	
		    registry.byId('presiGrid').setStore(newStore);
		    
		    new Button({
				label : " Agregar ",
				id:'a_presiGrid',	
				onClick : function() {
					var numPre = registry.byId('presiGrid');
					if(numPre.rowCount>=3){
					utils.cstmAlert("El Consejo Escolar no debe contar con mas de 3 Candidatos a Presidente");
					return false;
					}
					funPresi();
				}
			}, 'a_presiGrid');
	    	
	    	new Button({
				label : " Editar ",
				id:'e_presiGrid',	
				onClick : function() {	
					var index = registry.byId('presiGrid').selection.selectedIndex;
					var item = registry.byId('presiGrid').getItem(index);					
					if(index!=-1){														                                     	
                    	var itemToEdit={selectedItem:index,
                    			idPresi: registry.byId('presiGrid').store.getValue(item, 'idPresi'),
                    			id: registry.byId('presiGrid').store.getValue(item, 'idConsejero'), 
                    			paternoPresi: registry.byId('presiGrid').store.getValue(item, 'paternoPresi'), 
                    			maternoPresi: registry.byId('presiGrid').store.getValue(item, 'maternoPresi'),
                    			nombrePresi: registry.byId('presiGrid').store.getValue(item, 'nombrePresi'),
                    			votosPresi: registry.byId('presiGrid').store.getValue(item, 'votosPresi'),
                    			nombreHijoPresi: registry.byId('presiGrid').store.getValue(item, 'nombreHijoPresi'),
                    			idAcredita : registry.byId('presiGrid').store.getValue(item, 'idAcredita'),
								acredita : registry.byId('presiGrid').store.getValue(item, 'acreditacion')
                    			};
                    	funPresi(itemToEdit);
                      
		             }else{
		            	 utils.cstmAlert(
							'Debe seleccionar solo un registro.');
		             }
					
				}
			}, 'e_presiGrid');
	    	
	    	new Button({
				label : " Eliminar",
				id: 'd_presiGrid',	
				onClick : function() {					
					registry.byId('presiGrid').removeSelectedRows();
					registry.byId('presiGrid').store.save();
				}
			}, 'd_presiGrid');   
		   
	   }else{
		   if(registry.byId("presiPes")){
			   //registry.byId('pestanias').closeChild(registry.byId("presiPes"));
		   }
	   }
    }
   }
   //
   function funPresi ( itemToEdit ){
   		var edit=false;
	    if(!itemToEdit){
		   itemToEdit={idPresi:0,id:0,paternoPresi:'',maternoPresi:'', nombrePresi:'',votosPresi:0,idAcredita:0,cAcreditaOtro:'',nombreHijoPresi:''};
	    }else{
		   edit=true;
	    }
	   
	    //----------------------------Diseño de la ventana
	   	var title = 'Candidatos a Presidente';
	   	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	   	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
	   	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    utils.createTag('div','prCnt','dcDetail');
	    
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "500px" >'+
								    '<tr><td>'+
								    '	<b>*Candidato Presidente: <br/></b><div id="prSelect" />'+
								    '</td></tr>'+
									'<tr><td> '+
								    '	 <br/><b>*Votos</b>'+
								    '<input id="votosPresi"/>'+
								    '</td></tr>'+									
									'<tr><td>'+
									'	<br/><b>*Forma de acreditaci\u00f3n: </b>'+
									'<br/><div id="cAcredita"/>'+
									'</td></tr>' +
									'<tr id="trOtro" style="display:none" ><td>'+
									'	<br/><b>*Especifique otro: </b><br/><input id="cAcreditaOtro"/><br/>'+
									'</td></tr>' +
									'<tr><td> '+
								    '	 <br/><b>*Nombre del Ni\u00f1o: </b>'+
								    '<input id="nombreHijoPresi"/>'+
								    '</td></tr>'+	
									'</table>';
	    
	    var integrantes = primeraAsamblea.integrantes?primeraAsamblea.integrantes:[];	    	    
	    
	    if(edit==true){
			if(itemToEdit.idAcredita==3){
				dom.byId('trOtro').style.display='block';
				itemToEdit.cAcreditaOtro = itemToEdit.acredita;
			} else {
				dom.byId('trOtro').style.display='none';
			}			
		}
	    
	   jsAcredita =  new Array();
	   jsAcredita = [{idAcredita:1, tipo:"Constancia de inscripci\u00F3n"},
	                 {idAcredita:2, tipo:"Constancia emitida por el director escolar"},
	                 {idAcredita:3, tipo:"Otro"},
	                 ];
	   
	   objAcredita = { identifier: 'idAcredita',
	     		    items: jsAcredita 
	             };
	   
	   acreditaStore = new dojo.data.ItemFileWriteStore({data: objAcredita});
		   
	    dataInta=[{name:"Seleccione",id:-1}];	    	    
	    
		//for (var i in integrantes) {
	    
	    var gridLeeConsejo = registry.byId('consejoGrid');
	    var gridCandidatosPresidenteTmp = registry.byId('presiGrid');
		
		// Obtiene la informaci—n del Grid
	    for ( var i = 0; i < gridLeeConsejo.rowCount; i++) {

			var item = gridLeeConsejo.getItem(i);
			
			if(gridLeeConsejo.store.getValue(item,'cCalidad') == 1 || gridLeeConsejo.store.getValue(item,'cCalidad') == 4){
				if(gridLeeConsejo.store.getValue(item,'cGrado') != '' ){
					var candidatoExite = 0;
					for(var j=0; j<gridCandidatosPresidenteTmp.rowCount;j++){
						var itemPresi = gridCandidatosPresidenteTmp.getItem(j);
						if(gridLeeConsejo.store.getValue(item,'cscIntegrante')==gridCandidatosPresidenteTmp.store.getValue(itemPresi,'idConsejero')){
							if(edit==false){
								candidatoExite=1;
							}
							break;
						}
					}
					if(candidatoExite==0){										
					dataInta.push({ id:     gridLeeConsejo.store.getValue(item,'cscIntegrante'),
				           name:    gridLeeConsejo.store.getValue(item,'nombreIntegrante')+' '+gridLeeConsejo.store.getValue(item,'paternoIntegrante')+' '+gridLeeConsejo.store.getValue(item,'maternoIntegrante'),
				           paterno: gridLeeConsejo.store.getValue(item,'paternoIntegrante'),
				           materno: gridLeeConsejo.store.getValue(item,'maternoIntegrante'),
				           nombre:  gridLeeConsejo.store.getValue(item,'nombreIntegrante'),
				           cargo:   gridLeeConsejo.store.getValue(item,'nomCargo'),
				           idCargo: gridLeeConsejo.store.getValue(item,'cCargo')
				           }
			            );
					}
				}				
			}
		}
		
	    cStore = new Memory({
				data: dataInta
			}); 		    	    	    
	    
	    new FilteringSelect({
	           id: 'prSelect',
	           value:itemToEdit.id,
	           store: cStore,
	           readOnly:edit,
	           searchAttr: 'name'
	        }, 'prSelect').on ('change', function(){     		    	   	    		    	  		    		  	    		   
	        	var idIntegrante= registry.byId('prSelect').get('value');
	        	for(var i in dataInta){
	        		if( idIntegrante == dataInta[i].id ){
	        			itemToEdit.idConsejero  = dataInta[i].id;
	        			itemToEdit.nombrePresi  = dataInta[i].nombre;
	        			itemToEdit.paternoPresi = dataInta[i].paterno;
	        			itemToEdit.maternoPresi = dataInta[i].materno;	        			
	        		}
	        	}
	        });
	    
//	    var cGrado=new FilteringSelect({
//	           value:itemToEdit.cGrado,
//	           store: gradoStore, 
//	           searchAttr:'nomNivel'
//	        }, 'cGrado');

	    var cAcredita=new FilteringSelect({
	           value:itemToEdit.idAcredita,
	           store: acreditaStore, 
	           searchAttr:'tipo'
	        }, 'cAcredita');
	    
	    var cAcreditaOtro=new ValidationTextBox({
			   value:itemToEdit.cAcreditaOtro,
	           uppercase:'true',trim:"true",maxLength:"30",		   
	      //     required: true
	        }, 'cAcreditaOtro');
		   
	    var votosPresi = new ValidationTextBox({
	           promptMessage:"Votos",
	           value:itemToEdit.votosPresi, 
	           trim:"true",    
	           maxLength:"3",
	           style:"display:block; width:60px"
	        }, 'votosPresi');
	    
	    var nombreHijoPresi = new ValidationTextBox({
	           promptMessage:"Capture el nombre del ni\u00f1o",
	           value:itemToEdit.nombreHijoPresi, 
	           trim:"true",    
	           maxLength:"250",
	           required: true,
	           style:"display:block; width:200px"
	        }, 'nombreHijoPresi');
	    
	    cAcredita.on('change', function(){
			   var tieneValue = registry.byId('cAcredita').get('value');
			   if(tieneValue == 3){
				   //cAcreditaOtro.readOnly = false;
				   dom.byId('trOtro').style.display='block';
			   } else {
				   //cAcreditaOtro.readOnly = true;
				   dom.byId('trOtro').style.display='none';			   
			   }
		   });
	   //------------------------------------
	    utils.createTag('div','prBtnAceptar','dcDetail');
	    new Button({
	    				label : " Aceptar " ,
	    				onClick : function() {
	    					var form = registry.byId('dDetail');
	    					if (!form.validate()){  
	    						utils.cstmAlert('Favor de registrar los datos requeridos');
	    						return false;
	    					}
	    					
	    					numVotos= parseInt(registry.byId("votosPresi").get('value'));
	    					
	    					if(numVotos>25)
	    						{
	    						utils.cstmAlert('El numero de Votos no puede ser mayor a 25');
	    						return false;
	    						}
	    					if(numVotos<0)
    						{
    						utils.cstmAlert('El numero de Votos debe ser mayor o igual a 0');
    						return false;
    						}	
	    					var grid = registry.byId('presiGrid');
	    					try{
	    						if(edit){
	    							var index = grid.selection.selectedIndex;
	    							var item = grid.getItem(index);
	    							grid.store.setValue(item, 'paternoPresi', itemToEdit.paternoPresi);
	    							grid.store.setValue(item, 'maternoPresi', itemToEdit.maternoPresi);
	    							grid.store.setValue(item, 'nombrePresi',  itemToEdit.nombrePresi);	    								    						
	    							grid.store.setValue(item, 'votosPresi',  votosPresi.get('value'));
	    							grid.store.setValue(item, 'nombreHijoPresi', nombreHijoPresi.get('value'));
	    							//grid.store.setValue(item, 'nomGrado', cGrado.get('displayedValue'));
	    							if(cAcredita.get('value')==3){
	    								grid.store.setValue(item, 'acreditacion', cAcreditaOtro.get('value'));
	    							} else {
	    								grid.store.setValue(item, 'acreditacion', cAcredita.get('displayedValue'));
	    							}
	    							
	    						} else {
	    							var acreditacionTmp = '';
	    							if(cAcredita.get('value')==3){
			      				    	acreditacionTmp =  cAcreditaOtro.get('value');
	    							} else {
	    								acreditacionTmp =  cAcredita.get('displayedValue');
	    							}
	    							 var myNewItem = {  idPresi: ++maxIndexPresidente, 
	    									 		    idConsejero:  itemToEdit.idConsejero,
	    									 			paternoPresi: itemToEdit.paternoPresi,
	    									 			maternoPresi: itemToEdit.maternoPresi, 
								      				    nombrePresi:  itemToEdit.nombrePresi,
								      				    votosPresi:     votosPresi.get('value'),
								      				    nombreHijoPresi: nombreHijoPresi.get('value'),
								      				    //nomGrado: cGrado.get('displayedValue'),
								      				   
						    							acreditacion:  acreditacionTmp
						    							
								      				    //acreditacion: cAcredita.get('displayedValue')
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
   //------------------------------------------ fin Presidentes
   //------------------------------------------ Secretarios
   function _secretarios(crea){
	   if(crea){
		   if(!registry.byId('secrePes')){			   			   
		   	   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:'Candidato a Secretario T\u00E9cnico',
		           id:'secrePes'
		       }));			   
		   
		   
		   layout = [[	  { name: 'idSecre', 		    field: 'idSecre', width: '5px', hidden:true},
		              	  { name: 'idConsejero', 		field: 'idConsejero', width: '5px', hidden:true},
		               	  { name: 'Primer apellido', 	field: 'paternoSecre',  width:'100px'},
		               	  { name: 'Segundo apellido', 	field: 'maternoSecre',  width:'100px'},
		               	  { name: 'Nombre(s)', 			field: 'nombreSecre',  width:'100px'},
			    		  { name: 'Votos', 				field: 'votosSecre',  width:'100px'}
			        ]];
		   
		   tablaGrid=	'<table border="0" align="left" width= "900px">'+
		  	'<tr>' +
		  	'	<td><input id="secreGrid"/></td>'+
		  	'</tr>'+
		  	'<tr>' +
	   	   	'<td><input id="a_secreGrid"/>'+
		   	   	'<input id="e_secreGrid"/>'+
		   	   	'<input id="d_secreGrid"/></td>'+
	   	   	'</tr>'+
	   	   	'</table>';
		   
		    dom.byId('secrePes').innerHTML=tablaGrid;
   		
   			new DataGrid({
		        id: 'secreGrid',
		        structure: layout,
		        rowSelector: '10px',
		        height: '300px',
				width: '850px'
		        }, 'secreGrid').startup();
   		   	
   			var rTecnico = primeraAsamblea.secretarios?primeraAsamblea.secretarios:[];
   			var rCandidatoSecretarioData = []
   			
   			if(rTecnico.length>0){
   				var rIntegrantesDum = primeraAsamblea.integrantes;
   				for (var i in rTecnico) {
   					for (var j in rIntegrantesDum) {
   	   					if(rIntegrantesDum[j].cscIntegrante==rTecnico[i].idconsejero){
   	   						rCandidatoSecretarioData.push({
   	   							idSecre: 		rTecnico[i].idcandidato,
   	   							idConsejero: 	rTecnico[i].idconsejero,
   	   							paternoSecre: 	rIntegrantesDum[j].paternoIntegrante, 
   	   							maternoSecre: 	rIntegrantesDum[j].maternoIntegrante, 
   	   							nombreSecre: 	rIntegrantesDum[j].nombreIntegrante,
   	   							votosSecre: 	rTecnico[i].votos
   	   						});
   	   					}
   	   				}
   				}   				   				
   			}
   			
   			var data = {
				      identifier: "idSecre",
				      items: rCandidatoSecretarioData
				    };
		
   			maxIndexTecnico = rTecnico.length;
   			
	    	var newStore = new ItemFileWriteStore({data: data}); 
		    registry.byId('secreGrid').setStore(newStore);
		    
		    new Button({
				label : " Agregar ",
				id:'a_secreGrid',	
				onClick : function() {
					
					if(registry.byId('escrutadorPregunta5a').checked ==true){
				//	if(gSecreTecnicoSi==0){
						utils.cstmAlert('No se eligio un Secretario T\u00e9cnico');
						}
					else{
					funSecre();
						}
					
				}
			}, 'a_secreGrid');
	    	
	    	new Button({
				label : " Editar ",
				id:'e_secreGrid',	
				onClick : function() {	
					var index = registry.byId('secreGrid').selection.selectedIndex;
					var item = registry.byId('secreGrid').getItem(index);					
					if(index!=-1){														                                     	
                    	var itemToEdit={selectedItem:index,
                    			idSecre: registry.byId('secreGrid').store.getValue(item, 'idSecre'),
                    			id: registry.byId('secreGrid').store.getValue(item, 'idConsejero'), 
                    			paternoSecre: registry.byId('secreGrid').store.getValue(item, 'paternoSecre'), 
                    			maternoSecre: registry.byId('secreGrid').store.getValue(item, 'maternoSecre'),
                    			nombreSecre: registry.byId('secreGrid').store.getValue(item, 'nombreSecre'),
                    			votosSecre: registry.byId('secreGrid').store.getValue(item, 'votosSecre')
                    			};
                    	funSecre(itemToEdit);
                      
		             }else{
		            	 utils.cstmAlert(
							'Debe seleccionar solo un registro.');
		             }
					
				}
			}, 'e_secreGrid');
	    	
	    	new Button({
				label : " Eliminar",
				id: 'd_secreGrid',
				onClick : function() {					
					registry.byId('secreGrid').removeSelectedRows();
					registry.byId('secreGrid').store.save();
				}
			}, 'd_secreGrid');   
		   
	   }else{
		   if(registry.byId("secrePes")){
			   //registry.byId('pestanias').closeChild(registry.byId("secrePes"));
		   }
	   }
    }
   }
   //
   function funSecre ( itemToEdit ){
   		var edit=false;
	    if(!itemToEdit){
		   itemToEdit={idSecre:0,id:0,paternoSecre:'',maternoSecre:'', nombreSecre:'',votosSecre:0};
	    }else{
		   edit=true;
	    }
	   
	    //----------------------------Diseño de la ventana
	   	var title = 'Candidatos a secretarios t\u00E9cnicos';
	   	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	   	registry.byId('dDetail').on('hide',function(){
		   												registry.byId('dDetail').destroyRecursive(false);
   													});
	   	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    utils.createTag('div','prCnt','dcDetail');
	    
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "550px" >'+
								    '<tr><td>'+
								    '	<b>*Candidato Secreatario t\u00E9cnico: </b><div id="prSelect" /><br/>'+
								    '</td></tr>'+
				    			    '<tr><td> '+
				    			    '	 <b>*Votos</b><br/>'+
				    			    '<input id="votosSecre"/><br/>'+
				    			    '</td></tr>'+
				    			    '</table>';
	    
	    var integrantes = primeraAsamblea.integrantes?primeraAsamblea.integrantes:[];
	    
	    dataIntb=[{name:"Seleccione",id:-1}];
	    var gridLeeConsejo = registry.byId('consejoGrid');
	    var gridCandidatosSecretarioTmp = registry.byId('secreGrid');
	    
		//for (var i in integrantes {
	    for ( var i = 0; i < gridLeeConsejo.rowCount; i++) {
			
			var candidatoExite = 0;
			var item = gridLeeConsejo.getItem(i);
			
			for(var j=0; j<gridCandidatosSecretarioTmp.rowCount;j++){
				var itemSecre = gridCandidatosSecretarioTmp.getItem(j);
				if(gridLeeConsejo.store.getValue(item,'cscIntegrante')==gridCandidatosSecretarioTmp.store.getValue(itemSecre,'idConsejero')){
					candidatoExite=1;
					break;
				}
			}
			if(candidatoExite==0){
			dataIntb.push({ id:      integrantes[i].cscIntegrante,
				           name:    integrantes[i].nombreIntegrante+' '+integrantes[i].paternoIntegrante+' '+integrantes[i].maternoIntegrante,
				           paterno: integrantes[i].paternoIntegrante,
				           materno: integrantes[i].maternoIntegrante,
				           nombre:  integrantes[i].nombreIntegrante,
				           cargo:   integrantes[i].nomCargo,
				           idCargo: integrantes[i].cCargo
				           }
			            );
			}
		}
	    
	    cStore = new Memory({
			data: dataIntb
		}); 
	    
	    new FilteringSelect({
	           id: 'prSelect',
	           value:itemToEdit.id,
	           store: cStore,
	           readOnly:edit,
	           searchAttr: 'name'
	        }, 'prSelect').on ('change', function(){     		    	   	    		    	  		    		  	    		   
	        	var idIntegrante= registry.byId('prSelect').get('value');
	        	for(var i in dataIntb){
	        		if( idIntegrante == dataIntb[i].id ){
	        			itemToEdit.idConsejero  = dataIntb[i].id;
	        			itemToEdit.nombreSecre  = dataIntb[i].nombre;
	        			itemToEdit.paternoSecre = dataIntb[i].paterno;
	        			itemToEdit.maternoSecre = dataIntb[i].materno;	        			
	        		}
	        	}
	        });
	    
	    
	    var votosSecre = new ValidationTextBox({
	           promptMessage:"Votos",
	           value:itemToEdit.votosSecre, 
	           trim:"true",    
	           maxLength:"3",
	           style:"display:block; width:60px"
	        }, 'votosSecre');
	    
	   //------------------------------------
	    utils.createTag('div','prBtnAceptar','dcDetail');
	    new Button({
	    				label : " Aceptar " ,
	    				onClick : function() {
	    					var form = registry.byId('dDetail');
	    					if (!form.validate()){  
	    						utils.cstmAlert('Favor de registrar los datos requeridos');
	    						return false;
	    					}
	    					var grid = registry.byId('secreGrid');
	    					try{
	    						if(edit){
	    							var index = grid.selection.selectedIndex;
	    							var item = grid.getItem(index);
	    							grid.store.setValue(item, 'paternoSecre', itemToEdit.paternoSecre);
	    							grid.store.setValue(item, 'maternoSecre', itemToEdit.paternoSecre);
	    							grid.store.setValue(item, 'nombreSecre',  itemToEdit.nombreSecre);
	    							grid.store.setValue(item, 'votosSecre',  votosSecre.get('value'));	    							
	    						} else {
	    							 var myNewItem = {  idSecre: ++maxIndexTecnico, 
	    									 			idConsejero:  itemToEdit.idConsejero,
	    									 			paternoSecre: itemToEdit.paternoSecre,
	    									 			maternoSecre: itemToEdit.maternoSecre, 
								      				    nombreSecre:  itemToEdit.nombreSecre,
								      				    votosSecre:   votosSecre.get('value')
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
   //------------------------------------------ fin Secreatarios
         
   function _detalleIntegrante(itemToEdit){
	   var edit=false;
	   if(!itemToEdit){
		   itemToEdit= {cscIntegrante: 0, 
      				paternoIntegrante: '', maternoIntegrante: '', 
       				nombreIntegrante: '', cCargo: 3,identificacion: 0,
       				cCalidad: 1,
       				emailIntegrante: '', telIntegrante: '', idTiene:1,
       				cNiveleduc: null, genero:'F', cGrado:null, cAcredita:''
       		};   
	   }else{
		   edit=true;
	   }
	   
//		var dataIdentificacion=[{name:"[Seleccione]",   id:"0"},
//		                     {name:"CURP",   id:"1"},
//		                     {name:"Pasaporte",   id:"2"},
//		                     {name:"C\u00e9dula Profesional",   id:"3"},
//		                     {name:"IFE",   id:"4"}];
//		
		var dataIdentificacion=[{name:"[Seleccione]",   id:"0"},
			                     {name:"Constancia de inscripci\u00F3n del hijo",   id:"1"},
			                     {name:"Constancia del director o autoridad educativa",   id:"2"}];
			
			
		
		var identificacionStore = new Memory({
		data: dataIdentificacion
		});
	   
	   cargoStore = new dojo.data.ItemFileWriteStore({data: jsonCargoStore});
	   calidadStore = new dojo.data.ItemFileWriteStore({data: jsonCalidadStore});
	   nivelEducStore = new dojo.data.ItemFileWriteStore({data: jsonNivelEducStore});
	   
	   jsGrado =  new Array();
	   jsTieneHijos =  new Array();
	   jsTieneHijos = [{tiene: "NO",idTiene:1},{tiene: "SI", idTiene:2}];
	   
	   for(var ne in jsonGradoStore.items){
		   if(jsonGradoStore.items[ne].cNivel == infCctNivel.cNivel){
			   jsGrado.push(jsonGradoStore.items[ne]);
		   }
	   }	   
	   
	   if(edit){
		   if(itemToEdit.cGrado!=null && itemToEdit.cGrado!=''){
			   itemToEdit.idTiene = 2;   
		   } else {itemToEdit.idTiene = 1;}
	   }
	   objTiene = { identifier: 'idTiene',
    		    items: jsTieneHijos 
            };
	   
	   objGrado = { identifier: 'cGrado',
	     		    items: jsGrado 
	             };
	   
	   tieneStore = new dojo.data.ItemFileWriteStore({data: objTiene});
	   
	   gradoStore = new dojo.data.ItemFileWriteStore({data: objGrado});
	   
	   //gradoStore = new dojo.data.ItemFileWriteStore({data: jsonGradoStore});
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
	   '	<br/><b>*Forma <br/>acreditaci\u00F3n</b></td><td><br/><div id="identificacion" /><br/>'+
	   '</td></tr>'+
//	   '<tr><td align="right">'+
//	   '	<br/><b>*N\u00famero de identificaci\u00F3n <br/>oficial: CURP, Pasaporte,<br/> C\u00E9dula Profesional, IFE  </b></td><td><br/><div id="curp" /><br/>'+
//	   '</td></tr>'+
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
	   '<tr><td>'+
		'	<br/><b>*Tiene hijos estudiando<br/> en el Centro Escolar: </b></td><td><br/><br/><div id="cTiene"/><br/>'+
		'</td></tr>'+
		'<tr id="trTiene"><td>'+
		'	<br/><b>*Grado en el Centro Escolar: </b></td><td><br/><br/><div id="cGrado"/><br/>'+
		'</td></tr>'+
	   '</table>';
	   
//	   '<tr><td align="right">'+
//	   '	<br/><b>*Tiene hijos estudiando<br/> en el Centro Escolar: </b></td><td><br/><br/><div id="cGrado"/><br/>'+
//	   '</td></tr>'+
//	   '<tr><td align="right">'+
//	   '	<br/><b>*Forma de acreditaci\u00f3n<br/>: </b></td><td><br/><br/><div id="cAcredita"/><br/>'+
//	   '</td></tr>'
	   
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
           readOnly: true,
           searchAttr:'nomCargo'
        }, 'cCargo');
	   var identificacion=new FilteringSelect({
           value:itemToEdit.identificacion,
           store: identificacionStore,
           required: true,
           
        }, 'identificacion');
	   
//	   var curp=new ValidationTextBox({
//		   value:itemToEdit.curp,
//         //  regExp: constants.CURP_VALID,
//           uppercase:'true',trim:"true",maxLength:"18",
//           required: true
//        }, 'curp');
	   var cCalidad=new FilteringSelect({
           value:itemToEdit.cCalidad,
           store: calidadStore,required: true,
           searchAttr:'nomCalidad',
        //   readOnly: edit
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
//           readOnly: true,
           searchAttr:'nomGenero'
        }, 'genero');
	   
	   var cTiene=new FilteringSelect({
           value:itemToEdit.idTiene,
           store: tieneStore, 
           searchAttr:'tiene'
        }, 'cTiene');
	   
	   var cGrado=new FilteringSelect({
           value:itemToEdit.cGrado,
           store: gradoStore, 
           readOnly: true,
           searchAttr:'nomNivel'
        }, 'cGrado');
//
//	   var cAcredita=new ValidationTextBox({
//           value:itemToEdit.cAcredita, 
//           trim:"true", maxLength:"250"           
//        }, 'cAcredita');
	   
	   if(!edit || registry.byId('cTiene').get('value')==1){
		   cGrado.required = false;
		   
		  
	   }
	   if(edit && registry.byId('cTiene').get('value')==2 && (registry.byId('cCalidad').get('value')==1 || registry.byId('cCalidad').get('value')==4)){
		   cGrado.readOnly = false;
		   		  
	   }
	   cTiene.on('change', function(){
		   var tieneValue = registry.byId('cTiene').get('value');
		   if(tieneValue == 2){		
			   cGrado.readOnly = false;	
			   cGrado.required = true;
		   } else {
			   cGrado.readOnly = true;
			   cGrado.required = false;
			   itemToEdit.cGrado = '';
		   }
	   });
	   
//	   curp.on('change',function(){
//       	var curpValue = registry.byId('curp').get('value');
//       	var sexo = '';
//       	if(curpValue.length==18){
//       		sexo = curpValue.substring(10,11);
//       		if(sexo=='H')
//       			registry.byId('genero').set('value','M');
//           	else if(sexo=='M')
//           		registry.byId('genero').set('value','F');
//       	}
//       });
	   
	   utils.createTag('div','inBtnAceptar','dcDetail');
	   new Button({
			label : " Aceptar ",
			onClick : function() {
					var form = registry.byId('dDetail');
					if (!form.validate()){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					if (registry.byId('identificacion').get('value')==0){  
						utils.cstmAlert('Debe seleccionar un tipo de Identificaci\u00f3n');
						return false;
					}
					
					var grid = registry.byId('consejoGrid');
					try{
						var cGradoTmp = '';
						if(registry.byId('cTiene').get('value')==1){
							cGradoTmp = '';
						} else {
							cGradoTmp = cGrado.get('value');
						}
							
						if(edit){
							var index = grid.selection.selectedIndex;
							var item = grid.getItem(index);
							grid.store.setValue(item, 'paternoIntegrante', paternoIntegrante.get('value'));
							grid.store.setValue(item, 'maternoIntegrante', maternoIntegrante.get('value'));
							grid.store.setValue(item, 'nombreIntegrante', nombreIntegrante.get('value'));
							grid.store.setValue(item, 'cCargo', cCargo.get('value'));
							grid.store.setValue(item, 'identificacion', identificacion.get('value'));
					//		grid.store.setValue(item, 'curp', curp.get('value'));
							grid.store.setValue(item, 'cCalidad', cCalidad.get('value'));
							grid.store.setValue(item, 'emailIntegrante', emailIntegrante.get('value'));
							grid.store.setValue(item, 'telIntegrante', telIntegrante.get('value'));
							grid.store.setValue(item, 'cNiveleduc', cNiveleduc.get('value'));
							grid.store.setValue(item, 'genero', genero.get('value'));
							grid.store.setValue(item, 'cGrado', cGradoTmp);
							grid.store.setValue(item, 'nomCargo', cCargo.get('displayedValue'));
							grid.store.setValue(item, 'nomCalidad', cCalidad.get('displayedValue'));
							grid.store.setValue(item, 'nomNiveleduc', cNiveleduc.get('displayedValue'));
							grid.store.setValue(item, 'nomGrado', cGrado.get('displayedValue'));
							grid.store.setValue(item, 'nomGenero', genero.get('displayedValue'));
							//grid.store.setValue(item, 'acreditacion', cAcredita.get('displayedValue'));
							
							grid.update();
						}else{
						   var myNewItem = {cscIntegrante: ++maxIndexConsejero, 
						      				paternoIntegrante: paternoIntegrante.get('value'),
						      				maternoIntegrante: maternoIntegrante.get('value'), 
						       				nombreIntegrante: nombreIntegrante.get('value'),
						       				cCargo: cCargo.get('value'),
						       				identificacion: identificacion.get('value'),
						//       				curp: curp.get('value'),
						       				cCalidad: cCalidad.get('value'),
						       				emailIntegrante: emailIntegrante.get('value'), 
						       				telIntegrante: telIntegrante.get('value'),
						       				cNiveleduc: cNiveleduc.get('value'), 
						       				genero: genero.get('value'),
						       				cGrado: cGradoTmp,
						       				nomCargo: cCargo.get('displayedValue'),
											nomCalidad: cCalidad.get('displayedValue'),
											nomNiveleduc: cNiveleduc.get('displayedValue'),
											nomGrado: cGrado.get('displayedValue'),
											nomGenero: genero.get('displayedValue')
											//acreditacion: cAcredita.get('displayedValue')
											
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
   
	// Se manda a actualizar la informacion capturada
	function savePrimeraAsamblea(cct) {
		
		var standby = new Standby({
			target : "dialogCaptiraDG"
		});
		document.body.appendChild(standby.domNode);
		standby.startup();
	
		var form = registry.byId('registraPrimeraReunion');
		
		if ( form.validate() == false){return false;}
		
		clave1 = clave.substring(2,5);
		if(clave1=='DAI' || clave1=='DCC' || clave1=='DCI' || clave1=='DPB' || clave1=='ECC' || clave1=='EPB'|| clave1=='ESC' || clave1=='PCC' || clave1=='PPB' || clave1=='PTB' || clave1=='DSC' || clave1=='NJN' || clave1=='XTV' || clave1=='EDI'|| clave1=='ODI' || clave1=='EML' || clave1=='DZS' || clave1=='DCO' || clave1=='DLA' || clave1=='DML' || clave1=='ECO' || clave1=='EDM' || clave1=='EIV' || clave1=='ELA' || clave1=='ELS' || clave1=='EML' || clave1=='FAS' || clave1=='FLS' || clave1=='FUA' || clave1=='FUX'|| clave1=='PDM' || clave1=='PIM' || clave1=='PIV' || clave1=='PLA' || clave1=='PML' || clave1=='DZC' || clave1=='DNM' || clave1=='KJN' || clave1=='KPR' || clave1=='KTV' || clave1=='KCI' || clave1=='KNP' || clave1=='KNM' || clave1=='KCC' || clave1=='KPB' || clave1=='KSC' || clave1=='FEI' || clave1=='KES' || clave1=='KCA')
			{
			if(!_validateConsejo2()){return false;}
			}
		else{
		if(!_validateConsejo()){return false;}
		}	
		var fchSesion = registry.byId('fechaRegistro').get('value');
			var fechapublicacion = registry.byId('fechaPublicacion').get('value');
			
			 	if(fechapublicacion>fchSesion)
			 		{
			 		jsUtils.cstmAlert('La fecha de Publicacion no debe ser posterior a la Fecha de la Asamblea');
 				return false;
 			 	}
			
		
		var ceInfGral = {cCct : cct};
		
		var ceSesion = {
			fchSesion : registry.byId('fechaRegistro').get('value'),
			horaIniSesion : registry.byId('horaInicio').get('value'),
			horaFinSesion : registry.byId('horaFinal').get('value'),
			numIntegrantes : registry.byId('numIntegrantes').get('value'),
			publicadaen : registry.byId('publicadaEn').get('value'),
			fechapublicacion : registry.byId('fechaPublicacion').get('value'),
			observaciones : registry.byId('observaciones').get('value')
		};

		var actividades = new Array();
		var numAct=0;
		var actividadesArray = registry.byId('nomActividad').get('value');
		
		for( var i in actividadesArray){
			if(actividadesArray[i]==11){
				numAct++;
			}
			if(actividadesArray[i]==12){
				numAct++;
			}
		}
		
		if(numAct!=2){
			utils.cstmAlert("Debe seleccionar las dos primeras actividades");
			return false;
		}
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
		//----------------------------------------------------------------- Lee informacion de escrutadores		
//		var rowsEscrutadores = new Array();
//		var gridEs = registry.byId('escrutaGrid');
//		
//		for ( var i = 0; i < gridEs.rowCount; i++) {
//
//			var item = gridEs.getItem(i);														
//						
//			var escrutador = {
//				paternoEscrutador : gridEs.store.getValue(item,'paternoEscrutador'),
//				maternoEscrutador : gridEs.store.getValue(item,'maternoEscrutador'),
//				nombreEscrutador : gridEs.store.getValue(item,'nombreEscrutador')				
//			};
//						
//			rowsEscrutadores.push(escrutador);
//		}
		//----------------------------------------------------------------- Fin escrutadores
		//----------------------------------------------------------------- Lee informacion de asuntos		
		var asuntos = new Array();
		var gridAsu = registry.byId('asuntoGrid');
		
		for ( var i = 0; i < gridAsu.rowCount; i++) {

			var item = gridAsu.getItem(i);														
						
			var asunto = {
				asunto : gridAsu.store.getValue(item,'asunto'),
				acuerdo : gridAsu.store.getValue(item,'acuerdo')
			};
						
			asuntos.push(asunto);
		}
		//----------------------------------------------------------------- Fin asuntos
		//----------------------------------------------------------------- Lee informacion de presidentes		
		var presidentes = new Array();
		var gridPresi = registry.byId('presiGrid');
		var idPresidenteGanador = 0;
		var votosPresidenteGanador = 0;
		var votoMayor=0;
		var idGrado=0;
		
		for ( var i = 0; i < gridPresi.rowCount; i++) {

			var item = gridPresi.getItem(i);														
									
			var candidatoPresi = {
				idcandidato : gridPresi.store.getValue(item,'idPresi'),
				idconsejero : gridPresi.store.getValue(item,'idConsejero'),
				acreditacion : gridPresi.store.getValue(item,'acreditacion'),
				nombreHijoPresi : gridPresi.store.getValue(item,'nombreHijoPresi'),
				votos : gridPresi.store.getValue(item,'votosPresi')
			};
			if(candidatoPresi.nombreHijoPresi==null || candidatoPresi.nombreHijoPresi==''){
			utils.cstmAlert('Favor de registrar el nombre del hijo del candidato a Presidente');
			return false;
		     }
			
			if(gridPresi.store.getValue(item,'votosPresi')>votosPresidenteGanador){
				
				votosPresidenteGanador=gridPresi.store.getValue(item,'votosPresi');
				idPresidenteGanador = gridPresi.store.getValue(item,'idConsejero');
				votoMayor=1;
				
			}
			else
				{
				if(gridPresi.store.getValue(item,'votosPresi')==votosPresidenteGanador && votoMayor>0){	
					votoMayor++;
				   }
				}
						
			presidentes.push(candidatoPresi);
		}
		
		if(idPresidenteGanador<=0){
			utils.cstmAlert("Debe elegir un Presidente");
			return false;
		}
		if(votoMayor>1 || votoMayor==0){
			utils.cstmAlert("Debe elegir un solo ganador en Presidente");
			return false;
		}
		
		//----------------------------------------------------------------- Fin presidentes
		//----------------------------------------------------------------- Lee informacion de secretarios		
//		var secretarios = new Array();
//		var gridSecre = registry.byId('secreGrid');
//		var idSecretarioGanador = 0;
//		var votosSecretarioGanador = 0;
//		var votoMayorSecre=0;
//		 
//		
//		
//		for ( var i = 0; i < gridSecre.rowCount; i++) {
//
//			var item = gridSecre.getItem(i);														
//						
//			var candidatoSecre = {
//				idcandidato : gridSecre.store.getValue(item,'idSecre'),
//				idconsejero : gridSecre.store.getValue(item,'idConsejero'),
//				votos : gridSecre.store.getValue(item,'votosSecre')
//			};
//			
//			if( gridSecre.store.getValue(item,'votosSecre') > votosSecretarioGanador ){
//				idSecretarioGanador=gridSecre.store.getValue(item,'idConsejero');
//				votosSecretarioGanador=gridSecre.store.getValue(item,'votosSecre');
//				votoMayorSecre++;
//			}
//			else
//				{
//				if( gridSecre.store.getValue(item,'votosSecre') ==votosSecretarioGanador ){
//					votoMayorSecre++;
//				}
//				}
//						
//			secretarios.push(candidatoSecre);
//		}
//		
//		if(idSecretarioGanador == idPresidenteGanador){
//			utils.cstmAlert("El Secretario T\u00e9cnico no puede ser el mismo Presidente del consejo");
//			return false;
//		}
//		
//		 
//		if(!registry.byId('escrutadorPregunta5a').checked){
//			if(votoMayorSecre>1 || votoMayorSecre==0){
//				utils.cstmAlert("Debe elegir un solo ganador en Secretario");
//				return false;
//			}
//		}
//		
//		
//			
		
		//----------------------------------------------------------------- Fin secretarios
		//----------------------------------------------------------------- Lee informacion de consejeros (anterior Integrantes)
		var integrantes = new Array();

		// var actividades = [{cActividad: 11},{cActividad:12}];
		var grid = registry.byId('consejoGrid');
		
		// Obtiene la informaci—n del Grid
		for ( var i = 0; i < grid.rowCount; i++) {

			var item = grid.getItem(i);
			// Genera un nuevo objeto inegrante de cada renglon del
			// grid.
			
			if(grid.store.getValue(item,'cscIntegrante')==idPresidenteGanador)
				{
				if(grid.store.getValue(item,'cGrado')==null || grid.store.getValue(item,'cGrado')==''){
					utils.cstmAlert("Debe seleccionar un grado para el presidente ganador");
					return false;	
				}
				}
				
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
				identificacion : grid.store.getValue(item, 'identificacion'),
				curp : null,
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

     
		
						
			var preguntas = {
					respuesta1 : null,
					respuesta2 : null,
					respuesta3 : null,
					respuesta4 : null,
					respuesta5 : registry.byId('escrutadorPregunta5a').checked ? 1:2,
			};
		
		
		var nulo = new Array();
		
		var primeraAsamblea = {
			ceInfGral : ceInfGral,
			ceSesion : ceSesion,
			actividades : actividades,
			integrantes : integrantes,
		//	escrutadores : null,
			asuntos : asuntos,
			asistentes: nulo,
			presidentes: presidentes,
			secretarios:null,
			preguntas:preguntas
		};

		console.log(json.toJson(primeraAsamblea));
		var urlJson = dojo.config.app.urlBase
				+ 'primeraAsamblea/savePrimeraAsamblea';
		
		console.log( urlJson );
		
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
		
		var grid = registry.byId('consejoGrid');
		var gridPresi = registry.byId('presiGrid');
		//var gridEscruta = registry.byId('escrutaGrid');
						
		//var numEscruta = gridEscruta.rowCount;
		var numPresidente = gridPresi.rowCount;
		var numSecretario = 0;
		var numConsejeros = 0;
		var totalIntegrantes = grid.rowCount;
		var umbralPadresFamilia = Math.floor(totalIntegrantes/2) + 1; 
		var totalPadresFamilia = 0;
		var directivo = 0;
		var maestro=0;
		
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
			
//			if(cargo == 1){//Es presidente 
//				numPresidente++;
//			}else if(cargo == 2){//Es secretario
//				numSecretario++;
//			}else if(cargo == 3){//Es consejero
				numConsejeros++;
//			}
				if(calidad == 8 ){
					//Si es directivo
					directivo++;
				}
				if(calidad == 6 ){
					//Si es maestro
					maestro++;
				}
			if(calidad == 1 || calidad == 4){
				//Si es Representante de la APF o padre de familia
				totalPadresFamilia++;
			}
		}
		
		
		if(numConsejeros>2){
		if(directivo==0){
			utils.cstmAlert("El Consejo Escolar debe contar con un Directivo");
			return false;
		}
		
		if(directivo>=2){
			utils.cstmAlert("El Consejo Escolar no debe contar con mas de un Directivo");
			return false;
		}
		}
		
		if(numConsejeros==0){
			utils.cstmAlert("El Consejo Escolar debe contar con Consejeros");
			return false;
		}else if(numPresidente<=0){
			utils.cstmAlert("El Consejo Escolar debe contar con al menos un candidato a Presidente");
			return false;
		}else if(numPresidente>3){
			utils.cstmAlert("El Consejo Escolar no debe contar con mas de 3 candidatos a  Presidente");
			return false;
		}else if(numConsejeros<3){
			utils.cstmAlert("El Consejo Escolar debe contar con al menos tres Consejeros");
			return false;
		}else if(totalPadresFamilia < umbralPadresFamilia && numConsejeros>2){
			utils.cstmAlert("El consejo escolar debe estar conformado por la mayor\u00EDa de madres o padres de familia");
			return false;
		}else if(numConsejeros>25){
			utils.cstmAlert("El Consejo Escolar no debe contar con mas de 25 Integrantes");
			return false;
		}
		return true;
	}
	
	function _validateConsejo2(){

		var grid = registry.byId('consejoGrid');
		var gridPresi = registry.byId('presiGrid');
		var numPresidente = gridPresi.rowCount;

		var numConsejeros = 0;
		var totalPadresFamilia = 0;
	    var cargo = 0;
		var calidad =  0;
		
		// Obtiene la informaci—n del Grid
		for ( var i = 0; i < grid.rowCount; i++) {
			var item = grid.getItem(i);

			cargo = grid.store.getValue(item, 'cCargo');
			calidad =  grid.store.getValue(item, 'cCalidad');
			
				numConsejeros++;
			if(calidad == 1 || calidad == 4){
				totalPadresFamilia++;
			}
		}
		
			
		if(totalPadresFamilia==0){
			utils.cstmAlert("El Consejo Escolar debe contar con al menos un padre de famlia");
			return false;	
		}else if(numConsejeros==0){
			utils.cstmAlert("El Consejo Escolar debe contar con Consejeros");
			return false;
		}else if(numPresidente<=0){
			utils.cstmAlert("El Consejo Escolar debe contar con al menos un candidato a Presidente");
			return false;
		}else if(numPresidente>3){
			utils.cstmAlert("El Consejo Escolar no debe contar con mas de 3 candidatos a  Presidente");
			return false;
		}else if(numConsejeros<=2){
			utils.cstmAlert("El Consejo Escolar debe contar con al menos tres Consejeros");
			return false;
		}else if(numConsejeros>=25){
			utils.cstmAlert("El Consejo Escolar no debe contar con mas de 25 Integrantes");
			return false;
		}
		return true;
	}

   
	function _asunto(crea){
		   if(crea){
			   if(!registry.byId('asuntoPes')){			   			   
			   	   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:'Asuntos y acuerdos',
			           id:'asuntoPes'
			       }));			   
			   
			   
			   layout = [[	  { name: 'idAsunto', field: 'cscAsunto', width: '5px', hidden:true},
			               	  { name: 'Asuntos generales', field: 'asunto', width: '150px'},
			               	  { name: 'Acuerdos aprobados', field: 'acuerdo',  width:'150px'}
				        ]];
			   
			   tablaGrid=	'<table border="0" align="left" width= "900px">'+
			  	'<tr>' +
			  	'	<td><input id="asuntoGrid"/></td>'+
			  	'</tr>'+
			  	'<tr>' +
		   	   	'<td><input id="a_asuntoGrid"/>'+
			   	   	'<input id="e_asuntoGrid"/>'+
			   	   	'<input id="d_asuntoGrid"/></td>'+
		   	   	'</tr>'+
		   	   	'</table>';
			   
			    dom.byId('asuntoPes').innerHTML=tablaGrid;
	   		
	   			new DataGrid({
			        id: 'asuntoGrid',
			        structure: layout,
			        rowSelector: '10px',
			        height: '300px',
					width: '850px'
			        }, 'asuntoGrid').startup();
	   		   	
	   			//var rAsuntos = [];
	   			
	   			var rAsuntos = primeraAsamblea.asuntos?primeraAsamblea.asuntos:[];
	   			var dataJsonStoreAsunto = {
						identifier: 'cscAsunto',
						items: rAsuntos
					};

	   			maxAsuntos = rAsuntos.length;
	   			
				//Se crea el store de los asuntos.
				jsonStoreAsunto = new ItemFileWriteStore({data: dataJsonStoreAsunto});	   			
		    	
			    registry.byId('asuntoGrid').setStore(jsonStoreAsunto);
			    
			    new Button({
					label : " Agregar ",
					id:'a_asuntoGrid',	
					onClick : function() {					
						funAsunto();
					}
				}, 'a_asuntoGrid');
		    	
		    	new Button({
					label : " Editar ",
					id:'e_asuntoGrid',
					onClick : function() {	
						var index = registry.byId('asuntoGrid').selection.selectedIndex;
						var item = registry.byId('asuntoGrid').getItem(index);					
						if(index!=-1){														                                     	
	                    	var itemToEdit={selectedItem:index,
	                    			idAsunto: registry.byId('asuntoGrid').store.getValue(item, 'cscAsunto'), 
	                    			strAsuntos: registry.byId('asuntoGrid').store.getValue(item, 'asunto'), 
	                    			strAcuerdos: registry.byId('asuntoGrid').store.getValue(item, 'acuerdo')	                    			
	                    			};
	                    	funAsunto(itemToEdit);
	                      
			             }else{
			            	 utils.cstmAlert(
								'Debe seleccionar solo un registro.');
			             }
						
					}
				}, 'e_asuntoGrid');
		    	
		    	new Button({
					label : " Eliminar",
					id: 'd_asuntoGrid',	
					onClick : function() {					
						registry.byId('asuntoGrid').removeSelectedRows();
						registry.byId('asuntoGrid').store.save();
					}
				}, 'd_asuntoGrid');   
			   
		   }else{
			   if(registry.byId("asuntoPes")){
				   //registry.byId('pestanias').closeChild(registry.byId("asuntoPes"));
			   }
		   }
	    }
	}
	
	 function _elecciones(crea){
		   var id="eleccionesPane"; 
		   var contenido= '<table border="0" align="lefth" >'+ 
//		   '<tr><td>'+ 
//		   '	<p> <b>Se propuso a los que integrar\u00e1n el Consejo Escolar de Participaci\u00f3n Social, y los integrantes de la Asamblea procedieron</b></p>'+
//		   '	<input id="escrutadorPregunta1a"/><label for="escrutadorPregunta1a">A depositar en la urna instalada para el efecto las boletas con su voto </label>'+ 
//		   '	<br/><input id="escrutadorPregunta1b"/><label for="escrutadorPregunta1b">Emitir directamente su sufragio, por votaci\u00f3n nominal, para elegir a los Consejeros que integrar\u00e1n el Consejo Escolar de Participaci\u00f3n Social  </label>'+ 
//		   '</td></tr>'+
//		  '<tr><td>'+ 
//			'	<p> <b>Posteriormente, los escrutadores procedieron a:</b></p>'+
//			'	<input id="escrutadorPregunta2a"/><label for="escrutadorPregunta2a">Extraer las boletas de la urna   </label>'+ 
//			'	<br/><input id="escrutadorPregunta2b"/><label for="escrutadorPregunta2b">Contabilizar de manera econ\u00f3mica y a dar lectura en voz alta al sentido de cada voto, anotando el resultado de cada voto emitido en el pizarr\u00f3n, o material habilitado al efecto </label>'+ 
//		  '</td></tr>'+
//		  '<tr><td>'+ 
//		   '	<p> <b>Se procede a la elecci\u00f3n del Consejero Presidente del Consejo Escolar de Participaci\u00f3n Social, por lo que recibidas las propuestas, los Consejeros procedieron</b></p>'+
//		   '	<input id="escrutadorPregunta3a"/><label for="escrutadorPregunta3a">A depositar en la urna instalada para el efecto las boletas con su voto  </label>'+ 
//		   '	<br/><input id="escrutadorPregunta3b"/><label for="escrutadorPregunta3b">Emitir directamente su sufragio, por votaci\u00f3n nominal, para elegir al Consejero Presidente del Consejo Escolar de Participaci\u00f3n Social</label>'+ 
//		   '</td></tr>'+
//		  '<tr><td>'+ 
//			'	<p> <b>Posteriormente, los escrutadores procedieron a:</b></p>'+
//			'	<input id="escrutadorPregunta4a"/><label for="escrutadorPregunta4a">Extraer las boletas de la urna   </label>'+ 
//			'	<br/><input id="escrutadorPregunta4b"/><label for="escrutadorPregunta4b">Contabilizar de manera econ\u00f3mica y a dar lectura en voz alta al sentido de cada voto, anotando el resultado de cada voto emitido en el pizarr\u00f3n, o material habilitado al efecto</label>'+ 
//		  '</td></tr>'+
		  '<tr><td>'+ 
			'	<p> <b>Elecci\u00f3n de Secretario T\u00e9cnico:</b></p>'+
			'	<input id="escrutadorPregunta5a"/><label for="escrutadorPregunta5a"> No se eligi\u00f3 un Secretario T\u00e9cnico </label>'+ 
			'	<br/><input id="escrutadorPregunta5b"/><label for="escrutadorPregunta5b">El director es Secretario T\u00e9cnico  </label>'+ 
			'</td></tr>'+
		  
		  '</table>';
		   if(crea){
			   if(!registry.byId(id)){
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:"Elecciones",
			           content: contenido,
			           id:id
			       })); 
				
//				    var escrutadorPregunta1a= new RadioButton({
//				           checked:primeraAsamblea.preguntas==null?true: primeraAsamblea.preguntas.respuesta1==1 ? true:false,
//				           value: "1",
//				           name: "escrutadorPregunta1",
//				           id:"escrutadorPregunta1a"
//				       }, "escrutadorPregunta1a");
//					   
//					  var escrutadorPregunta1b=new RadioButton({
//				           checked:primeraAsamblea.preguntas==null?false: primeraAsamblea.preguntas.respuesta1==2 ? true:false,
//				           value: "2",
//				           name: "escrutadorPregunta1",
//				           id:"escrutadorPregunta1b"
//				       }, "escrutadorPregunta1b");
//				    
//					  var escrutadorPregunta2a= new RadioButton({
//				           checked:primeraAsamblea.preguntas==null?true: primeraAsamblea.preguntas.respuesta2==1 ? true:false,
//				           value: "1",
//				           name: "escrutadorPregunta2",
//				           id:"escrutadorPregunta2a"
//				       }, "escrutadorPregunta2a");
//					   
//					  var escrutadorPregunta2b=new RadioButton({
//				           checked: primeraAsamblea.preguntas==null?false:primeraAsamblea.preguntas.respuesta2==2 ? true:false,
//				           value: "2",
//				           name: "escrutadorPregunta2",
//				           id:"escrutadorPregunta2b"
//				       }, "escrutadorPregunta2b");
//					  
//					  var escrutadorPregunta3a= new RadioButton({
//				           checked:primeraAsamblea.preguntas==null?true: primeraAsamblea.preguntas.respuesta3==1 ? true:false,
//				           value: "1",
//				           name: "escrutadorPregunta3",
//				           id:"escrutadorPregunta3a"
//				       }, "escrutadorPregunta3a");
//					   
//					  var escrutadorPregunta3b=new RadioButton({
//				           checked:primeraAsamblea.preguntas==null?false: primeraAsamblea.preguntas.respuesta3==2 ? true:false,
//				           value: "2",
//				           name: "escrutadorPregunta3",
//				           id:"escrutadorPregunta3b"
//				       }, "escrutadorPregunta3b");
					  
//					  var escrutadorPregunta4a= new RadioButton({
//				           checked:primeraAsamblea.preguntas==null?true: primeraAsamblea.preguntas.respuesta4==1 ? true:false,
//				           value: "1",
//				           name: "escrutadorPregunta4",
//				           id:"escrutadorPregunta4a"
//				       }, "escrutadorPregunta4a");
//					   
//					   var escrutadorPregunta4b=new RadioButton({
//				           checked:primeraAsamblea.preguntas==null?false: primeraAsamblea.preguntas.respuesta4==2 ? true:false,
//				           value: "2",
//				           name: "escrutadorPregunta4",
//				           id:"escrutadorPregunta4b"
//				       }, "escrutadorPregunta4b");
//					  
					   escrutadorPregunta5a= new RadioButton({
				           checked:primeraAsamblea.preguntas==null?true: primeraAsamblea.preguntas.respuesta5==1 ? true:false,
				           value: "1",
				           name: "escrutadorPregunta5",
				           id:"escrutadorPregunta5a"
				       }, "escrutadorPregunta5a").on('change',function(){
				    	   gSecreTecnicoSi = 0;
				       });
					  
					   
					    var escrutadorPregunta5b=new RadioButton({
				           checked:primeraAsamblea.preguntas==null?false: primeraAsamblea.preguntas.respuesta5==2 ? true:false,
				           value: "2",
				           name: "escrutadorPregunta5",
				           id:"escrutadorPregunta5b"
				       }, "escrutadorPregunta5b").on('click',function(){
				    	   gSecreTecnicoSi = 1;
				       });
					  
				   
					
			   	}
		   
		   
		   }
		   else{
			   if(registry.byId(id)){
				   //registry.byId('pestanias').closeChild(registry.byId(id));
			   }   
			}   
			 
		   
	   }
	   
	
	function funAsunto (itemToEdit ){
    	var edit=false;
	    if(!itemToEdit){
		   itemToEdit={idAsunto: 0,strAsuntos:'',strAcuerdos:''};
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
	    utils.createTag('div','prCnt','dcDetail');
		    
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "550px" >'+							    			   
				    			   '<tr><td>'+
				    			   '	<b>*Asuntos generales: </b><div id="strAsuntos" /><br/>'+
				    			   '</td></tr>'+
				    			   '<tr><td>'+
				    			   '	<b>*Acuerdos aprobados</b><div id="strAcuerdos" /><br/>'+
				    			   '</td></tr>'+							    			   						    			   							    			   							    			   							    			   
				    			   '</table>';     			         			    
		          					             			        			        			    
	    //---------------------------------- Dojo     			   
	    
	    var strAsuntos = new ValidationTextBox({    		           
           value:itemToEdit.strAsuntos, 
           trim:"true",    
           maxLength:"250",
           style:"display:block; width:280px"
        }, 'strAsuntos');
	   
		var strAcuerdos = new ValidationTextBox({	   		           
           value:itemToEdit.strAcuerdos, 
           trim:"true",    
           maxLength:"250",
           style:"display:block; width:280px"
        }, 'strAcuerdos');	     			       			    
	         			   
	   //------------------------------------
	    utils.createTag('div','prBtnAceptar','dcDetail');
	    new Button({
	    				label : " Aceptar " ,
	    				onClick : function() {
	    					var form = registry.byId('dDetail');
	    					if (!form.validate()){  
	    						utils.cstmAlert('Favor de registrar los datos requeridos');
	    						return false;
	    					}
	    					var grid = registry.byId('asuntoGrid');
	    					try{
	    						if(edit){
	    							var index = grid.selection.selectedIndex;
	    							var item = grid.getItem(index);
	    							grid.store.setValue(item, 'asunto', strAsuntos.get('value'));
	    							grid.store.setValue(item, 'acuerdo', strAcuerdos.get('value'));		    							
	    						} else {
	    							 var myNewItem = {  cscAsunto: ++maxAsuntos, 
	    									 			asunto: strAsuntos.get('value'),
	    									 			acuerdo: strAcuerdos.get('value')									      				    
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
	
   return {
		   init:init,
		   savePrimeraAsamblea:savePrimeraAsamblea
	   };
   
});





