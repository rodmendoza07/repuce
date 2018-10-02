define(['dojo/dom','dojo/cookie', 'dojo/parser', 'dijit/form/Button', 'dijit/form/Select', 'dijit/form/CheckBox', 'dijit/form/Form', 'dijit/registry',
        'dojox/form/uploader/FileList', 'dojo/_base/xhr', 'app/util/jsUtils', 'dojox/form/Uploader', 'dojox/form/uploader/plugins/Flash',
        "dojox/grid/DataGrid", "dojo/store/Memory", "dojo/data/ObjectStore", "app/util/constants","dojo/_base/json", "dojox/widget/Standby","dijit/Dialog", "dijit/form/ValidationTextBox"],
		function(dom, cookie, parser, Button, Select, CheckBox, Form, registry, FileList, xhr, jsUtils,Uploader,Flash, DataGrid, Memory, 
				ObjectStore, constants, json, Standby, Dialog, ValidationTextBox){
		
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
		
		config.contenedor.set('content', config.template);
		modConfig = config;
		
		xhr.get({
			handleAs: "json",
			url: dojo.config.app.urlBase + "archivos/paths",
			load: function(paths){
				if(jsUtils.isEmpty(paths)){
					btnCargar.set('disabled', true);
		    		dojo.publish("/app/notificacion",[{
		    			message: 'No se encontr\u00F3 ning\u00FAn directorio.'+url,
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
			    
	    
	    new Button({
	    	type: 'reset',
	    	label: 'Buscar',
	    	onClick: function(){
	    		// limpiamos el array de archivos agregados
	    		uploader.reset();
	    		console.log(uploader.getFileList());
	    	}
	    }, 'submitCarga');
	    			    
		var layoutResults = [[
		    		    { name: 'Nombre del archivo', 	field: 'nomArchivo', 		width: '200px'},
		    		    { name: 'Estatus de la carga', 	field: 'nomRespuesta', 		width: '500px'}
		    		]];
		
		var resultsStore = new dojo.store.Memory({
		      data: {
			      identifier: 'nomArchivo',
			      items: []
			    }
		});
		
		var dataStore = new dojo.data.ObjectStore({
	          objectStore: resultsStore
			});
		
	    var gridResults = new DataGrid({
	        id: 'gridResultados',
	        store: dataStore,
	        structure: layoutResults,
	        autoHeight: true,
	        rowSelector: '20px'},
	        "listResultadosGrid");
    	gridResults.startup();

//    	var lstActas=xhr.get({
//	            url: dojo.config.app.urlBase + 'actasMunicipales/listar/',
//	            sync: false,
//	            preventCache:true,
//	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
//	            handleAs: "json"
//	        });
//      
//    	lstActas.then(function(actasData){
//    		
//       	 	var data = {
//				      identifier: "id",
//				      items: []
//				    };
//       	
//       	 	for (var j in actasData){
//       	 		
//			   var actaObj = {
//					   id: actasData[j].idEntidadfed +  '|' + actasData[j].idMunicipio,
//					   idEntidadfed: actasData[j].idEntidadfed,
//					   idMunicipio: actasData[j].idMunicipio,
//					   nomEntidadfed: actasData[j].nomEntidadfed,
//					   nomMunicipio: actasData[j].nomMunicipio,
//					   archivo: actasData[j].archivo
//			   };
//
//       	 		data.items.push(actaObj);
//       	 	}
//
//    		var actasStore = new dojo.store.Memory({data: data});
//	  		
//	  		var actasDataStore = new dojo.data.ObjectStore({
//	            objectStore: actasStore
//	  		});
//    	
//			var layoutActas = [[
//				    		{ name: 'id',		 			field: 'id', 			width: '1px', hidden:true},
//			    		    { name: 'Id Entidad', 			field: 'idEntidadfed',	width: '1px', hidden:true},
//			    		    { name: 'Id Muicipio', 			field: 'idMunicipio',	width: '1px', hidden:true},
//			    		    { name: 'Entidad federativa', 	field: 'nomEntidadfed',	width: '100px'},
//			    		    { name: 'Municipio', 			field: 'nomMunicipio',	width: '100px'},
//			    		    { name: 'Nombre del archivo', 	field: 'archivo',		width: '100px',
//			    		    	formatter: function(value, rowIndex){
//			    		    	     return "<a href=\"javascript:void(0)\" yourCustomAttr=\""+value
//			    		    	     +"\" onclick=\"_downloadActa(dojo.attr(this, 'yourCustomAttr')); return false;\">"+value+"</a>"; 
//			    		    	}
//			    		    },
//			    		    { name: 'Estatus', 			field: 'nomEstatus',	width: '50px'},
//			    		    { name: 'Id estatus', 		field: 'estatus',	width: '1px', hidden:true}
//			    		]];
//			
//		    gridActasMun = new DataGrid({
//		        id: 'gridActasMun',
//		        store: actasDataStore,
//		        structure: layoutActas,
//		        autoHeight: true,
//		        rowSelector: '20px'},
//		        "listActasMunGrid");
//		    gridActasMun.startup();
//    	});
    	
		new Button({
		       label: constants.TEXT_BUTTON_ELIMINAR_ACTA_MUN,
		       onClick: function(){
		    	   _deleteActasMunicipales(); 
		       }
		}, "removeRow");

		new Button({
      label: constants.TEXT_BUTTON_EDITAR_ACTA_MUN,
      onClick: function(){
      	var index = registry.byId('gridActasMun').selection.selectedIndex;    											
				if(index!=-1){
					var item = registry.byId('gridActasMun').getItem(index);
					_editarActaMunicipal(item);
				}else{
					dojo.publish("/app/notificacion",[{
	    			message: 'Debe seleccionar un archivo',
	    			type: "error",
	    			duration: 4000
	    		}]);	    			
	    		return;
        }
      }
		}, "editarRow");
		
	}
	
	function _editarActaMunicipal(item){
		
		var title = 'Acta Municipal';
	   	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	   	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
	   	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    jsUtils.createTag('div','prCnt','dcDetail');    
	    jsUtils.createTag('div','prBtnAceptar','dcDetail');
	    
	    var optionAceptarActa = new Array({label:'[Seleccione]', value: 0});
        
	    optionAceptarActa.push({label: 'Aceptar acta', value: 1});
	    optionAceptarActa.push({label: 'Rechazar acta', value: 2});
	     
        
        
	    dom.byId('prCnt').innerHTML='<table border="0" align="lefth" width= "350px" >'+
				    			   '<tr>'+
				    			   		'<td width="25%"><b>Entidad: </b></td>'+				    			   
				    			   		'<td width="50%">'+item.nomEntidadfed+'</td>'+
				    			   '</tr>'+
				    			   '<tr>'+
				    			   		'<td><b>Municipio: </b></td>'+
				    			        '<td>'+item.nomMunicipio+'</td>'+
				    			   '</tr>'+
				    			   '<tr>'+
				    			   		'<td><b>Archivo</b></td>'+
				    			   		'<td>'+item.archivo+'</td>'+				    			   
				    			   '</tr>'+
				    			   '<tr>'+
			    			   			'<td><b>\u00BFAceptar el acta?</b></td>'+
			    			   			'<td><input id="aceptarActa"></td>'+
			    			   		'</tr>'+
				    			   '</table>';
	    
	    var aceptarActa= new Select({
            name: "aceptarActa",            
            required: true,
            options: optionAceptarActa           
        },'aceptarActa');
	    
	    aceptarActa.startup();
	    
	    new Button({
			label : " Aceptar " ,
			onClick : function() {
				var form = registry.byId('dDetail');
				if (!form.validate()){  
					utils.cstmAlert('Favor de registrar los datos requeridos');
					return false;
				}
				
				if( aceptarActa.get('value') == 0 ){
					dojo.publish("/app/notificacion",[{
		    			message: 'Favor de registrar los datos requeridos',
		    			type: "error",
		    			duration: 4000
		    		}]);	    	
					return false;
				}
				
				var grid = registry.byId('gridActasMun');
				var index = grid.selection.selectedIndex;
				var item = grid.getItem(index);				
				grid.store.setValue(item, 'estatus', aceptarActa.get('value'));
				grid.store.setValue(item, 'nomEstatus', aceptarActa.get('displayedValue'));
				
				registry.byId('dDetail').destroyRecursive(false);
				
			}
		},'prBtnAceptar');    
	    
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

