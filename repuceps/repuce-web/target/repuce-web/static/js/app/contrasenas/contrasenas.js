define(["dijit/Tooltip","dijit/form/ValidationTextBox","dijit/form/Button",
        "dojo/dom","dijit/registry","dojo/on", "dojo/_base/xhr",
        "dojo/_base/json","dijit/form/Select","dojo/DeferredList","app/util/jsUtils",
        "app/util/constants","dijit/form/RadioButton","app/reuniones/capturaDatosGenerales", 
        "app/util/jsUtils"], 
function( Tooltip,ValidationTextBox,Button,dom,registry,on,xhr,json,Select,DeferredList,
		utils,constants,RadioButton,capturaDG, jsUtils){
	
	var gCct=0;
	var gcCct=0;
    
    function init(config){
		config.contenedor.set('content', config.template);  
        load();
    }
    
   function load(){
	   var reuniones=[];
	   for(var i=1;i<8;i++){
		   reuniones.push({disponibilidad:0,status:0,nomReunion:constants.NOM_SESION(i),contenido:' <h3>No Disponible</h3><p>...</p>'});
	   }        
	   
	   /*busqueda de c_cct*/   
       new Button({
           label: " BUSCAR ",
           onClick: function(){
              _getTurnos();
           }
       }, "progContButtonNode");


       //Boton Actualizar
       new Button({
           label: " Regenerar Contrase\u00f1a ",
           onClick: function(){
        	   _actualizarDatosContrasena();
           }
       },"regContButtonNode");
       
       new ValidationTextBox({
           type:"text",  
           name:"cve_cct_Cont", 
           value:"", trim:"true", uppercase:"true",                                   
           required:"true",
           regExp:constants.CVE_CCT_VALID,
           promptMessage:" Ingrese el CCT "
       }, "cve_cct_Cont");
       
       new ValidationTextBox({
           type:"text",  
           name:"nContasena", 
           value:"", trim:"true",
           regExp:constants.SIZE_CONTRASENA,
           promptMessage:" Ingrese la contrase\u00f1a "           
       }, "nContasena");
       
       new ValidationTextBox({
           type:"text",  
           name:"rnContasena", 
           value:"", trim:"true",             
           regExp:constants.SIZE_CONTRASENA,
           promptMessage:" Repita la contrase\u00f1a "           
       }, "rnContasena");
       
       new ValidationTextBox({
           type:"text",  
           name:"v_mailCct", 
           value:"", trim:"true",                                   
           //required:"true",
           regExp:constants.MAIL_VALID,
           promptMessage:" Correo electr\u00f3nico configurado para CCT "
       }, "v_mailCct");

       
       new RadioButton({
           checked: false,
           value: "1",
           name: "regenera",
           onClick: function(){
        	   registry.byId('nContasena').setAttribute('disabled', true);
        	   registry.byId('rnContasena').setAttribute('disabled', true);
        	   registry.byId('rnContasena').setAttribute('required', false);
        	   registry.byId('nContasena').setAttribute('required', false);
        	   registry.byId('v_mailCct').setAttribute('required', false);
        	   dom.byId("obligatorio").innerHTML="";
        	   
           }
       }, "radioReg1");
       
       new RadioButton({
           checked: true,
           value: "2",
           name: "regenera",
           onClick: function(){
        	   registry.byId('nContasena').setAttribute('disabled', false);
        	   registry.byId('rnContasena').setAttribute('disabled', false);
        	   registry.byId('rnContasena').setAttribute('required', true);
        	   registry.byId('nContasena').setAttribute('required', true);
        	   registry.byId('v_mailCct').setAttribute('required', true);
        	   dom.byId("obligatorio").innerHTML="*";
        	   
           }

       }, "radioReg2");
	   
       
       new ValidationTextBox({
           type:"hidden",  
           name:"v_cveCct", 
           value:"", trim:"true", uppercase:"true"        	   
       }, "v_cveCct");
   }
   
   
   function _getTurnos(){
       var cveCct={cveCct:registry.byId('cve_cct_Cont').get('value')};
       var urlJson=dojo.config.app.urlBase + 'catalogos/ListCct/';
        xhr.get({
            url: urlJson,
            sync: false,
            content:cveCct,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            handleAs: "json",
            handle: function(response){

               registry.byId('v_cveCct').set('value',"");
     		   registry.byId('v_mailCct').set('value',"");
     		   dom.byId("cveCct_Cont").innerHTML="";
     		   dom.byId("nomCct_Cont").innerHTML="";
     		   gcCct = "";
     		   //dom.byId("nomTurno_Cont").innerHTML="";
     		   dom.byId("nomDirector_Cont").innerHTML="";
         	   dom.byId("nomNivel_Cont").innerHTML="";
         	   dom.byId("telCct_Cont").innerHTML="";
         	   dom.byId("mailCct_Cont").innerHTML="";
         	   dom.byId("domicilio_Cont").innerHTML="";
         	   dom.byId("nomLocalidad_Cont").innerHTML="";
         	   dom.byId("nomMunicipio_Cont").innerHTML="";
         	   dom.byId("nomEntidadfed_Cont").innerHTML="";
         	   dom.byId("obligatorio").innerHTML="*";
    		   registry.byId('nContasena').set('value','');
 		       registry.byId('rnContasena').set('value','');
 		      
               
 		       if(response.length>0){
                	
                    _getInfCct(response[0].cCct);
                }else{
                	jsUtils.cstmAlert("No existen datos para el CCT");
                }

            },
            error: function(error){
                jsUtils.cstmAlert(json.toJson(error));
            }
        } );	
   }
   
   function _getInfCct(cCct){
	   
	   gCct=cCct;
	   var infCct=xhr.get({
           url: dojo.config.app.urlBase + 'reuniones/listReuniones/'+cCct,
           sync: false,
           contentType: "application/x-www-form-urlencoded; charset=utf-8",
           handleAs: "json"
       } );	
	   
	   var cSesion=xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listSesiones/',
           sync: false,
           contentType: "application/x-www-form-urlencoded; charset=utf-8",
           handleAs: "json"
       } );	
       
	   
	   var defs = new DeferredList([infCct, cSesion]);
	   defs.then(function(results){
		   var cct= results[0][1].cct;
		   var ubicacionCct= results[0][1].ubicacionCct;
		   var ceInfGral= results[0][1].ceInfGral;
		   var listReuniones= results[0][1].reuniones;
		   var listCSesion= results[1][1];
		   
		   
		   registry.byId('v_cveCct').set('value',cct.cveCct);
		   
		   registry.byId('v_mailCct').set('value',cct.mailCct);
		   
		   dom.byId("cveCct_Cont").innerHTML=cct.cveCct;
		   dom.byId("nomCct_Cont").innerHTML=cct.nomCct;
		   
		   gcCct = cct.cCct;
		   
		   dom.byId("nomDirector_Cont").innerHTML=cct.nomDirector;
    	   dom.byId("nomNivel_Cont").innerHTML=cct.nomNivel;
    	  
    	   if(cct.telCct != null && cct.telCct != "" && cct.telCct !="null" && cct.telCct !="undefined" ){
        		 dom.byId("telCct_Cont").innerHTML=cct.telCct;   
        	   }
        	  
        	 if(cct.mailCct != null && cct.mailCct != "" && cct.mailCct !="null" && cct.mailCct !="undefined" ){
        		dom.byId("mailCct_Cont").innerHTML=cct.mailCct;
        	 }
        	           	  
        	 if(ubicacionCct.domicilio != null && ubicacionCct.domicilio != "" && ubicacionCct.domicilio !="null" && ubicacionCct.domicilio !="undefined" ){
        		dom.byId("domicilio_Cont").innerHTML=ubicacionCct.domicilio;
        	 }        	   
        	   
        	 if(ubicacionCct.localidad.nomLocalidad != null && ubicacionCct.localidad.nomLocalidad != "" && 
        	    ubicacionCct.localidad.nomLocalidad !="null" && ubicacionCct.localidad.nomLocalidad !="undefined" ){
        		dom.byId("nomLocalidad_Cont").innerHTML=ubicacionCct.localidad.nomLocalidad;
        	 }
        	   
        	 if(ubicacionCct.municipio.nomMunicipio != null && ubicacionCct.municipio.nomMunicipio != "" && 
        		ubicacionCct.municipio.nomMunicipio !="null" && ubicacionCct.municipio.nomMunicipio !="undefined" ){
        		dom.byId("nomMunicipio_Cont").innerHTML=ubicacionCct.municipio.nomMunicipio;
        	 }
    	   	   
    	   	 if(ubicacionCct.entidad.nomEntidadfed != null && ubicacionCct.entidad.nomEntidadfed != "" && 
    	   		ubicacionCct.entidad.nomEntidadfed !="null" && ubicacionCct.entidad.nomEntidadfed !="undefined" ){
    	   	    dom.byId("nomEntidadfed_Cont").innerHTML=ubicacionCct.entidad.nomEntidadfed; 
    	   	 }  

    	   	/* if(!utils.isEmpty(ceInfGral)){
    		   dom.byId("statusCe").innerHTML=constants.STATUS_CE(ceInfGral.statusCe);
        	   dom.byId("periodo").innerHTML=ceInfGral.periodo;
    	   }else{
    		   dom.byId("statusCe").innerHTML=constants.STATUS_CE(0);
        	   dom.byId("periodo").innerHTML="-";   
    	   }*/
    	   
	    });
   }
  
   //Se manda a actualizar la información capturada
   function _actualizarDatosContrasena(){

	   var form = registry.byId('registraContrasena');
		/*
	   var v_cveCct={v_cveCct:registry.byId('v_cveCct').get('value')};
	   var nContasena={nContasena:registry.byId('nContasena').get('value')};
	   var rnContasena={rnContasena:registry.byId('rnContasena').get('value')};
	   */

	   var regenerar = 2;
	   
	   if( registry.byId('v_cveCct').get('value') == null || registry.byId('v_cveCct').get('value') == ''){
		   jsUtils.cstmAlert('Debe buscar un CCT v\u00E1lido');
		   return false;
	   }

	   if(registry.byId('radioReg1').get('checked')){
		   regenerar = registry.byId('radioReg1').get('value');
		   
		   var re = new RegExp(constants.MAIL_VALID);
			
			if ( registry.byId('v_mailCct').get('value') && !registry.byId('v_mailCct').get('value').match(re)) {
				utils.cstmAlert("El correo electr\u00F3nico " + "'" + registry.byId('v_mailCct').get('value') + "'"+ " es inv\u00e1lido");
				return false;
			}
		   
	   }
	   if(registry.byId('radioReg2').get('checked')){
		   regenerar = registry.byId('radioReg2').get('value');
		   if( registry.byId('nContasena').get('value') == null || registry.byId('nContasena').get('value') == ''){
			   jsUtils.cstmAlert('La nueva contrase\u00f1a no debe ser nula.');
			   return false;   
		   }
		   
		   if( registry.byId('rnContasena').get('value') == null || registry.byId('rnContasena').get('value') == ''){
			   jsUtils.cstmAlert('Debe confirmar la nueva contrase\u00f1a. ');
			   return false;
		   }
		   
		  	if( registry.byId('rnContasena').get('value') != registry.byId('nContasena').get('value') ){				   
		  		jsUtils.cstmAlert('La nueva contrase\u00f1a y la confirmaci\u00f3n no coinciden.');
			  return false;
			}	
		  			
		   if( registry.byId('rnContasena').get('value').length  < 6 || registry.byId('nContasena').get('value').length  < 6){
			   jsUtils.cstmAlert('La nueva contrase\u00f1a no debe ser menor de seis caracteres.');
			   return false;
		    }
		    
		   var re = new RegExp(constants.MAIL_VALID);
			
			if ( registry.byId('v_mailCct').get('value') && !registry.byId('v_mailCct').get('value').match(re)) {
				utils.cstmAlert("El correo electr\u00F3nico " + "'" + registry.byId('v_mailCct').get('value') + "'"+ " es inv\u00e1lido");
				return false;
			}
			
			if (form.validate() == false){  
					jsUtils.cstmAlert('Favor de registrar los datos requeridos con el formato especificado');
					return false;
				}
			
		}

	   var params=[
	               registry.byId('v_cveCct').get('value'), 
	               registry.byId('v_mailCct').get('value'),
	               regenerar,
	               registry.byId('nContasena').get('value'),
	               gcCct+''
	              ];

	  	var urlJson=dojo.config.app.urlBase + 'catalogos/updateMailCCct';
        xhr.post({
            url: urlJson,
            postData: json.toJson(params),
			 headers:{
				     "Content-Type" : "application/json; charset=UTF-8"
				},					
			 handleAs: 'json',
            handle: function(response){
           	
    		if(response==99){
    			jsUtils.cstmAlert('No se tiene correo configurado, por lo que la contrase\u00f1a ser\u00e1 igual al nombre del cct : '+document.getElementById('v_cveCct').getAttribute('value'));             	 
            }else 
            	if(response!=1){
            		jsUtils.cstmAlert('Ocurri\u00f3 un error al recuperar la contrase\u00f1a');
            	}else           		
            		jsUtils.cstmAlert('La nueva contrase\u00f1a se envi\u00f3 al correo electr\u00f3nico que ingres\u00f3.');
    		    registry.byId('nContasena').reset();
    		    registry.byId('rnContasena').reset();
    		    registry.byId('cve_cct_Cont').reset();
    		    registry.byId('v_mailCct').reset();
    		    
             	_getTurnos();
            }	
        });
   }

      return{
	   init:init
	  
  };
    
   return{
     init:init
   };
   
});


