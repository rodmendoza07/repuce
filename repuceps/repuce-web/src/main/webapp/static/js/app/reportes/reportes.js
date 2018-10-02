define(["dijit/Tooltip","dijit/form/ValidationTextBox","dijit/form/Button",
        "dojo/dom","dijit/registry","dojo/on", "dojo/_base/xhr",
        "dojo/_base/json","dijit/form/Select","dojo/DeferredList","app/util/jsUtils",
        "app/util/constants","app/reuniones/capturaDatosGenerales", "app/reuniones/modificacionDirector"], 
function( Tooltip,ValidationTextBox,Button,dom,registry,on,xhr,json,Select,DeferredList,utils,constants,
		capturaDG, modificacionDirector){
	
	
    function init(config){
		config.contenedor.set('content', config.template);  
        //load();
    }
    
     
   function load(){
	   window.open(dojo.config.app.urlBase + 'documentos/reporteMvtosNal', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	   } 
   
    
   return{
     init:init
   };
   
});


