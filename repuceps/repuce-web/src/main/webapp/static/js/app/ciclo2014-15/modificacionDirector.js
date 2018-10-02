
define(["dijit/Dialog", "dojo/dom", "dijit/form/ValidationTextBox"
        ,"dijit/form/Button","app/util/constants","dijit/registry"
        ,"dojo/_base/json","dijit/layout/ContentPane"
        ,"app/util/text!content/ciclo2014-15/modificacionDirector!strip;no-cache", "app/util/jsUtils",
        "dojo/_base/xhr",  "dijit/form/Form", "dijit/Tooltip", "dojo/on", "app/util/jsUtils"], 
function(Dialog, dom , ValidationTextBox, Button, constants,registry
		,json,ContentPane, template, utils, xhr, Form, Tooltip, on, jsUtils){
	
	var dialog; 
	   
	function init(cct){

		if(registry.byId("dialogModificacionDirector")){
			dialog.show();
			dialog.set('content',template);
			load();
		}else{
			dialog = new Dialog({
	            title: "Actualizaci&oacute;n de datos del Centro Escolar",	
	            content:  template,
	            id:"dialogModificacionDirector"
	        });
			dialog.closeButtonNode.style.display = "none";
	        dialog._onKey = function(evt){
	            key = evt.keyCode;
	            if (key == dojo.keys.ESCAPE) {
	            	dojo.stopEvent(evt);
	            }
	        }; 
	    	
	    	dialog.show();
			load(cct); 
		
		}		         
    }
	
    function load(cct){
    	
       //Director
        new ValidationTextBox({
            type:"text",  
            name:"director", 
            value:cct.nomDirector,
            trim:"true",
            id:"director",
            required:"true",
            regExp:constants.NOMBRE_VALID,
            uppercase:true,
            promptMessage:" Ingrese nombre del director "
        }, "director");
       
        //Correo Electronico
        new ValidationTextBox({
            type:"text",  
            name:"correo", 
            value:cct.mailCct,
            id:"correo",
            trim:"true",                                    
            required:"true",
            regExp:constants.MAIL_VALID,
            promptMessage:"Ingrese el correo electr&oacute;nico de la escuela"
        }, "correo");
        
        
        //Telefono
        new ValidationTextBox({
            type:"text",  
            name:"telefono", 
            value:cct.telCct,
            id:"telefono",
            trim:"true",                                    
           // required:"true",
            regExp:constants.TELEPHONE_VALID,
           //placeHolder: '(##) ####-####',
            promptMessage:"Ingrese el  tel&eacute;fono"
        }, "telefono");
        
        //Extension
        new ValidationTextBox({
            type:"text",  
            name:"extension", 
            value:cct.telExtCct,
            id:"extension",
            trim:"true",                                    
            regExp:constants.TELEPHONE_VALID,
            promptMessage:"Ingrese la  extesi&oacute;n"
        }, "extension");
        
        utils.createTag('button','aceptar', 'botonAceptarCancelar');
        utils.createTag('button','cancelar', 'botonAceptarCancelar');
   	 	
	
       //Boton Cancelar
         new Button({
             label: " CANCELAR ",
             onClick: function(){
             	dialog.destroyRecursive(false);
             }
         }, "cancelar");
         
       //Boton Actualizar
         new Button({
             label: " ACTUALIZAR ",
             onClick: function(){
            	   _actualizarDatosDirector(cct.cCct);
              
               /*if (formModifDir.validate()){
            	   _actualizarDatosDirector(cct.cCct);
               }
               else{
            	   alert("Faltan datos por capturar");
               }*/
            	   
             }
         },"aceptar");

         

      
    }
    
    //Se manda a actualizar la información capturada
    function _actualizarDatosDirector(cct){
    	
    	if ( !dijit.byId('director').isValid() ){
			dijit.byId('director').focus();
			return;
		}
		if ( !dijit.byId('correo').isValid() ){
			dijit.byId('correo').focus();
			return;
		}
		
		if ( !dijit.byId('telefono').isValid() ){
			dijit.byId('telefono').focus();
			return;
		}
		
    	
    	var cCct={cCct:cct,
   			 nomDirector:registry.byId('director').get('value'),
   			 telCct:registry.byId('telefono').get('value'),
   			 telExtCct:registry.byId('extension').get('value'),
   			 mailCct:registry.byId('correo').get('value')};
   	  	
    	console.log(json.toJson(cCct));
    	
    	 var urlJson=dojo.config.app.urlBase + 'catalogos/updateCCct';
         xhr.post({
             url: urlJson,
             postData: json.toJson(cCct),
			 headers:{
				     "Content-Type" : "application/json; charset=UTF-8"
				},					
			 handleAs: 'json',
             handle: function(response){
            	 //alert(response);
            	 if(response!=1){
            		 ajsUtils.cstmAlert('Ocurri\u00F3 un error al actualizar los datos.');
            	}
            	 else{
            		 jsUtils.cstmAlert('La actualizaci\u00F3n se realiz\u00F3 correctamente.');
            	 	 dialog.destroyRecursive(false);
            	 	
            	 	 dom.byId("nomDirector").innerHTML=cCct.nomDirector+'  &nbsp;<a href="#"><img src="static/img/refresh.png"  id="actDirector" border="0" />';
            	 	 dom.byId("telCct").innerHTML=cCct.telCct;
            	 	 dom.byId("mailCct").innerHTML=cCct.mailCct;
             	   
             	   
            	 	 new Tooltip({connectId: ["actDirector"],
                      label: "Actualizar Datos del director"});
           	   			on( dom.byId("actDirector"),'click', function(){
           	   			init(cCct);
           	   		});
            	 }
            	 	 
             }
         });
    	     	 
    	 
    	
    	
    }

       return{
	   init:init
	  
   };
   
   
});