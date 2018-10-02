define(['dojo/dom','dojo/cookie', 'dojo/parser', 'dijit/form/Button', 'dijit/form/Select', 'dijit/form/CheckBox', 'dijit/form/Form', 'dijit/registry',
        'dojox/form/uploader/FileList', 'dojo/_base/xhr', 'app/util/jsUtils', 'dojox/form/Uploader', 'dojox/form/uploader/plugins/Flash',
        "dojox/grid/DataGrid", "dojo/store/Memory", "dojo/data/ObjectStore", "app/util/constants","dojo/_base/json", "dojox/widget/Standby"],
		function(dom, cookie, parser, Button, Select, CheckBox, Form, registry, FileList, xhr, jsUtils,Uploader,Flash, DataGrid, Memory, 
				ObjectStore, constants, json, Standby){
		
	var modConfig,
		btnCargar;
	var uploader = {};
	var gridActasMun = {};
	var data = {};
	var dataActas = {};
	var standby = new Standby({
		target : "actasMunicipalesDiv"
	});
	
	function init(config){
		//document.body.appendChild(standby.domNode);
		//standby.startup();
		
		config.contenedor.set('content', config.template);
		modConfig = config;
		//alert(modConfig);
		xhr.get({
			handleAs: "json",
			url: dojo.config.app.urlBase + "archivos/paths",
			load: function(paths){
				if(jsUtils.isEmpty(paths)){
					alert(url);
					btnCargar.set('disabled', true);
		    		dojo.publish("/app/notificacion",[{
		    			message: 'No se encontr\u00F3 ning\u00FAn directorio.',
		    			type: "error",
		    			duration: 4000
		    		}]);		
		    		// Sin directorios no podemos hacer nada, asÃ­ que cerramos el Tab.
		    		modConfig.cerrarTab();
		    		return;
				}
				var opciones = [];
				for (var prop in paths) {
					opciones.push({
						value: prop,
						label: paths[prop]
					});
				}
				opciones[0].selected =  true;
				if(!registry.byId('sltDirectorioCarga')){
					new Select({
						id: 'sltDirectorioCarga',
		                name: "path",
		                options: opciones,
					}, 'sltDirectorioCarga');
				}
			}
		});		

		new Form({
			method: 'post',
			enctype: 'multipart/form-data',
			'class': 'Uploader',
	       //onSubmit: function(){
	       // 	standby.show();
	       // },
			action: dojo.config.app.urlBase + 'actasMunicipales/upload'
		}, 'cargaForm');
		
	    btnCargar = new Button({
	        type: 'submit',
	        label: 'Cargar',
	    }, 'submitCarga');	
	    
	    btnValidae = new Button({
	        type: 'submit',
	        label: 'Validar',
	    }, 'submitValida');	
	    
	    new Button({
	    	type: 'reset',
	    	label: 'Limpiar',
	    	onClick: function(){
	    		// limpiamos el array de archivos agregados
	    		uploader.reset();
	    		console.log(uploader.getFileList());
	    	}
	    }, 'resetForm');
	    
		uploader = new dojox.form.Uploader({
	    	id: 'uploader',
	    	name: 'uploadedfile',
	    	showInput: 'before',
	    	isDebug: true,
	    	url: dojo.config.app.urlBase + 'actasMunicipales/upload',
	    	multiple: true,
	    	force: '',
	    	onComplete: function(respuesta){
	    		console.log('*********************respuesta: ' + json.toJson(respuesta));

	    		if(respuesta.length == 0){
		    		dojo.publish("/app/notificacion",[{
		    			message: 'Debe seleccionar al menos un archivo',
		    			type: "error",
		    			duration: 4000
		    		}]);	    			
		    		return;
	    		}
	    		
	    		if(respuesta.claveError){
		    		dojo.publish("/app/notificacion",[{
		    			message: respuesta.mensaje,
		    			type: "error",
		    			duration: 4000
		    		}]);	    			
		    		return;
	    		}
	    		dojo.publish("/app/notificacion",[{
	    			message: "Se termin\u00f3 de cargar los archivos.",
	    			type: "message",
	    			duration: 4000
	    		}]);
	    		
	       	 	data = {
					      identifier: "nomArchivo",
					      items: respuesta
					    };
	       	
	    		var resultsStore = new dojo.store.Memory({data: data});

	    		var resultStore = new dojo.data.ObjectStore({
	    	          objectStore: resultsStore
	    		});

    		    var gridResults = registry.byId('gridResultados');
    		    gridResults.setStore(resultStore);  
    		    
    	    	var lstActas=xhr.get({
    	            url: dojo.config.app.urlBase + 'actasMunicipales/listar/',
    	            sync: false,
    	            preventCache:true,
    	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
    	            handleAs: "json"
    	        });
          
	        	lstActas.then(function(actasData){
	        		
	           	 	dataActas = {
	    				      identifier: "id",
	    				      items: []
	    				    };
	           	
	           	 	for (var j in actasData){
	           	 		
	    			   var actaObj = {
	    					   id: actasData[j].idEntidadfed +  '|' + actasData[j].idMunicipio,
	    					   idEntidadfed: actasData[j].idEntidadfed,
	    					   idMunicipio: actasData[j].idMunicipio,
	    					   nomEntidadfed: actasData[j].nomEntidadfed,
	    					   nomMunicipio: actasData[j].nomMunicipio,
	    					   archivo: actasData[j].archivo
	    			   };
	
	           	 		dataActas.items.push(actaObj);
	           	 	}
	
	        		var actasStore = new dojo.store.Memory({data: dataActas});
	    	  		
	    	  		var actasDataStore = new dojo.data.ObjectStore({
	    	            objectStore: actasStore
	    	  		});
	    		    
	    	  		gridActasMun.setStore(actasDataStore);
	        	});
	        	
	        	//standby.hide();
	    		
	    	},
	    	onChange: function(archivos){
	    		// Aqui se podran listar los archivos en alguna tabla. 
	    		console.log(archivos);
	    	}
	    }, 'uploader');
		
	    uploader.startup();
	    
		var resultsStore = new dojo.store.Memory({
		      data: {
			      identifier: 'nomArchivo',
			      items: []
			    }
		});
		
		var dataStore = new dojo.data.ObjectStore({
          objectStore: resultsStore
		});

	    
		var layoutResults = [[
		    		    { name: 'Nombre del archivo', 	field: 'nomArchivo', 		width: '200px'},
		    		    { name: 'Estatus de la carga', 	field: 'nomRespuesta', 		width: '500px'}
		    		]];
	    var gridResults = new DataGrid({
	        id: 'gridResultados',
	        store: dataStore,
	        structure: layoutResults,
	        autoHeight: true,
	        rowSelector: '20px'},
	        "listResultadosGrid");
    	gridResults.startup();

    	var lstActas=xhr.get({
	            url: dojo.config.app.urlBase + 'actasMunicipales/listar/',
	            sync: false,
	            preventCache:true,
	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
	            handleAs: "json"
	        });
      
    	lstActas.then(function(actasData){
    		
       	 	var data = {
				      identifier: "id",
				      items: []
				    };
       	
       	 	for (var j in actasData){
       	 		
			   var actaObj = {
					   id: actasData[j].idEntidadfed +  '|' + actasData[j].idMunicipio,
					   idEntidadfed: actasData[j].idEntidadfed,
					   idMunicipio: actasData[j].idMunicipio,
					   nomEntidadfed: actasData[j].nomEntidadfed,
					   nomMunicipio: actasData[j].nomMunicipio,
					   archivo: actasData[j].archivo
			   };

       	 		data.items.push(actaObj);
       	 	}

    		var actasStore = new dojo.store.Memory({data: data});
	  		
	  		var actasDataStore = new dojo.data.ObjectStore({
	            objectStore: actasStore
	  		});
    	
			var layoutActas = [[
				    		{ name: 'id',		 			field: 'id', 			width: '1px', hidden:true},
			    		    { name: 'Id Entidad', 			field: 'idEntidadfed',	width: '1px', hidden:true},
			    		    { name: 'Id Muicipio', 			field: 'idMunicipio',	width: '1px', hidden:true},
			    		    { name: 'Entidad federativa', 	field: 'nomEntidadfed',	width: '250px'},
			    		    { name: 'Municipio', 			field: 'nomMunicipio',	width: '250px'},
			    		    { name: 'Nombre del archivo', 	field: 'archivo',		width: '200px',
			    		    	formatter: function(value, rowIndex){
			    		    	     return "<a href=\"javascript:void(0)\" yourCustomAttr=\""+value
			    		    	     +"\" onclick=\"_downloadActa(dojo.attr(this, 'yourCustomAttr')); return false;\">"+value+"</a>"; 
			    		    	}
			    		    }
			    		]];
		    gridActasMun = new DataGrid({
		        id: 'gridActasMun',
		        store: actasDataStore,
		        structure: layoutActas,
		        autoHeight: true,
		        rowSelector: '20px'},
		        "listActasMunGrid");
		    gridActasMun.startup();
    	});
    	
		new Button({
		       label: constants.TEXT_BUTTON_ELIMINAR_ACTA_MUN,
		       onClick: function(){
		    	   _deleteActasMunicipales(); 
		       }
		}, "removeRow");

	}
	
	function _deleteActasMunicipales(){
		var standby2 = new Standby({
			target : "actasMunicipalesDiv"
		});
		document.body.appendChild(standby2.domNode);
		standby2.startup();
		
		var selectedItems = new Array();
		var items = gridActasMun.selection.getSelected();
		console.log('items: ' + json.toJson(items));
		console.log('items.length: ' + items.length);
        if(items.length){
            dojo.forEach(items, function(selectedItem){
                if(selectedItem !== null){
                    selectedItems.push({
                    	idEntidadfed: gridActasMun.store.getValue(selectedItem, 'idEntidadfed'),
                    	idMunicipio: gridActasMun.store.getValue(selectedItem, 'idMunicipio')});
                } // end if
            }); // end forEach
        }else{
        	jsUtils.cstmAlert('Debe seleccionar al menos un elemento a eliminar.');
        	return false;
        }
		
		xhr.post({
            url: dojo.config.app.urlBase + 'actasMunicipales/delete',
			postData : json.toJson(selectedItems),
			headers : {
				"Content-Type" : "application/json; charset=UTF-8"
			},
			handleAs : 'json',
			handle : function(response) {
					gridActasMun.removeSelectedRows();
					gridActasMun.store.save();
					
	        	   dojo.publish("/app/notificacion",[{
	        			message: "Resultados: " + response,
	        			type: "message",
	        			duration: 4000
	        		}]);
					standby2.hide();
			},
            error: function(error){
	        	   dojo.publish("/app/notificacion",[{
	        			message: "No se pudieron eliminar las actas.",
	        			type: "message",
	        			duration: 4000
	        		}]);
					standby2.hide();
            }
		}).progress(standby2.show());

	}

	_downloadActa = function(value){
		//Elimina la extesión del archivo
		value = value.split(".")[0];
		window.open(dojo.config.app.urlBase + 'actasMunicipales/download/'+ value, null, 
				'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	};
	
	return{
    	init: init
    };
});

