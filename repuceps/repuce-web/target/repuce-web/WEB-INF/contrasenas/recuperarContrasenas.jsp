 <%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>
<% String contexto = request.getContextPath(); %>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">	
  	<title>Registro P&uacute;blico de Consejos Escolares</title>
        
	<link rel="stylesheet" href='<c:url value="/static/css/style.css"/>' media="screen">
	<link rel="stylesheet" href='<c:url value="/static/css/segundaSesion/estilo.css"/>' media="screen">
	<link rel="stylesheet" href='<c:url value="/static/js/libs/dijit/themes/tundra/tundra.css"/>' media="screen">  
	
	
  	<script>
  		dojoConfig= {
			has: {
	            "dojo-firebug": true,
	            "dojo-debug-messages": true
	        },  				
  	        app: {
  	        	urlBase: '<c:url value="/mvc/"/>',
  	        	urlStatic: '<c:url value="/static/"/>'
  	        	},
  	        packages:[{
  	        	name: 'app',
  	        	location: '<c:url value="/static/"/>js/app'
  	        },{
  	        	name: 'content',
  	        	location: '<c:url value="/mvc"/>'
  	        },{
  	        	name: 'static',
  	        	location: '<c:url value="/static"/>'
  	        }],
  	      	parseOnLoad: false,
  	        async: true,
  	      	debugAtAllCosts: true,
  	      	ioPublish: true,
  	      	cacheBust: true
  	    };
  	</script>
  	<script src="<%=contexto %>/static/js/libs/dojo/dojo.js"></script>
  	
  	<script>
  	
  	require(["dijit/Tooltip","dijit/form/ValidationTextBox","dijit/form/Button","dijit/registry","dojo/on", 
  	         "dojo/_base/xhr","dojo/_base/json","dijit/form/Select","dojo/DeferredList","app/util/jsUtils","app/util/constants",
  	         "dijit/form/RadioButton", "dojo/ready","dojo/dom","dojo","app/util/jsUtils"], 
  	   function(Tooltip,ValidationTextBox,Button,registry,on,xhr,json,Select,DeferredList,utils,constants,RadioButton, 
  			   ready, dom, dojo, jsUtils){
  		
  		var gcCct=0;
  		
  	    ready(function(){
  	        // Create a button programmatically:
  	        var myButton = new Button({
  	            label: "Recuperar Contrase\u00f1a",
  	            onClick: function(){

  	              _actualizarDatosContrasena();
  	            }
  	        }, "regButtonNode");
  	    
  	      new Button({
	            label: "Regresar",
	            onClick: function(){
	            	window.location.href='<%=contexto %>/login.jsp';
	            }
	        }, "regresar");
  	    
  	      var myButtonBuscar = new Button({
	            label: " Buscar ",
	            onClick: function(){
	             
	            	 _getTurnos();
	            }
	        }, "progButtonNode");
  	      
  	      
  	    var validText = new ValidationTextBox({
	           type:"text",  
	           name:"cve_cct", 
	           value:"", trim:"true", uppercase:"true",                                   
	           required:"true",
	           regExp:constants.CVE_CCT_VALID,
	           promptMessage:" Ingrese el cct "
	       }, "cve_cct");
  	    
	  	var validCct = new ValidationTextBox({
	          type:"hidden",  
	          name:"v_cveCct", 
	          value:"", trim:"true", uppercase:"true"        	   
	      }, "v_cveCct");
  	    
  	    });  		
  		
  		
  	 function _getTurnos(){
	       var cveCct={cveCct:registry.byId('cve_cct').get('value')};
	       var urlJson=dojo.config.app.urlBase + 'catalogos/ListCct/';
	        xhr.get({
	            url: urlJson,
	            sync: false,
	            content:cveCct,
	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
	            handleAs: "json",
	            handle: function(response){
	            	
					document.getElementById('v_cveCct').setAttribute('value',"");
					document.getElementById('v_mailCct').setAttribute('value',"");
					dom.byId("cveCct").innerHTML="";
					gcCct = "";
					dom.byId("nomCct").innerHTML="";
					dom.byId("nomDirector").innerHTML="";
					dom.byId("nomNivel").innerHTML="";
					dom.byId("telCct").innerHTML="";
					dom.byId("mailCct").innerHTML="";	                	   
					dom.byId("domicilio").innerHTML="";
					dom.byId("nomLocalidad").innerHTML="";
					dom.byId("nomMunicipio").innerHTML="";
					dom.byId("nomEntidadfed").innerHTML="";
	                
                	if(response.length==0){	
						jsUtils.cstmAlert("No se encontr\u00F3 el Centro Escolar");
						return;	
	            	}else if(response.length>0){
	                	_getInfCct(response[0].cCct);
	                	
	                }else{	                	   
	                	utils.basicAlert("No existen datos para el CCT seleccionado");
	            	}

	            },
	            error: function(error){
	            	utils.basicAlert(json.toJson(error));
	            }

  		});
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
  		   
  		 try{
  		   
  		   document.getElementById('v_cveCct').setAttribute('value',cct.cveCct);
  		   document.getElementById('v_mailCct').setAttribute('value',cct.mailCct);
  		   
  		   dom.byId("cveCct").innerHTML=cct.cveCct;
  		   
  		   gcCct = cct.cCct;
  		   
  		   dom.byId("nomCct").innerHTML=cct.nomCct;
    
  		   dom.byId("nomDirector").innerHTML=cct.nomDirector;
      	   dom.byId("nomNivel").innerHTML=cct.nomNivel;
      	   //dom.byId("telCct").innerHTML=cct.telCct;
      	   //dom.byId("mailCct").innerHTML=cct.mailCct;
      	   
      	   //dom.byId("domicilio").innerHTML=ubicacionCct.domicilio;
      	   //dom.byId("nomLocalidad").innerHTML=ubicacionCct.localidad.nomLocalidad;
  	   	   //dom.byId("nomMunicipio").innerHTML=ubicacionCct.municipio.nomMunicipio;
  	       //dom.byId("nomEntidadfed").innerHTML=ubicacionCct.entidad.nomEntidadfed;
  	       
      	   if(cct.telCct != null && cct.telCct != "" && cct.telCct !="null" && cct.telCct !="undefined" ){
        		 dom.byId("telCct").innerHTML=cct.telCct;   
        	   }
        	  
        	 if(cct.mailCct != null && cct.mailCct != "" && cct.mailCct !="null" && cct.mailCct !="undefined" ){
        		dom.byId("mailCct").innerHTML=cct.mailCct;
        	 }
        	   
        	  
        	 if(ubicacionCct.domicilio != null && ubicacionCct.domicilio != "" && ubicacionCct.domicilio !="null" && ubicacionCct.domicilio !="undefined" ){
        		dom.byId("domicilio").innerHTML=ubicacionCct.domicilio;
        	 }
        	   
        	   
        	 if(ubicacionCct.localidad.nomLocalidad != null && ubicacionCct.localidad.nomLocalidad != "" && 
        	    ubicacionCct.localidad.nomLocalidad !="null" && ubicacionCct.localidad.nomLocalidad !="undefined" ){
        		dom.byId("nomLocalidad").innerHTML=ubicacionCct.localidad.nomLocalidad;
        	 }
        	   
        	 if(ubicacionCct.municipio.nomMunicipio != null && ubicacionCct.municipio.nomMunicipio != "" && 
        		ubicacionCct.municipio.nomMunicipio !="null" && ubicacionCct.municipio.nomMunicipio !="undefined" ){
        		dom.byId("nomMunicipio").innerHTML=ubicacionCct.municipio.nomMunicipio;
        	 }
    	   	   
    	   	 if(ubicacionCct.entidad.nomEntidadfed != null && ubicacionCct.entidad.nomEntidadfed != "" && 
    	   		ubicacionCct.entidad.nomEntidadfed !="null" && ubicacionCct.entidad.nomEntidadfed !="undefined" ){
    	   	    dom.byId("nomEntidadfed").innerHTML=ubicacionCct.entidad.nomEntidadfed; 
    	   	 }  	   	   
  		 }catch(e){
  			utils.basicAlert(e);
  		 }
      	     	   

  	    });
     }
     
     function _actualizarDatosContrasena(){

  	   var v_cveCct={v_cveCct:registry.byId('v_cveCct').get('value')};

  	   var regenerar = "1";

  	   if( registry.byId('v_cveCct').get('value') == null || registry.byId('v_cveCct').get('value') == ''){
  		 utils.basicAlert('Debe buscar un CCT válido');
  		   return false;
  	   }
  	   
  	  if( document.getElementById('v_mailCct').getAttribute('value') == null ||  document.getElementById('v_mailCct').getAttribute('value') == '' ||  document.getElementById('v_mailCct').getAttribute('value') == 'null'){
  		 utils.basicAlert('El CCT no tiene un correo electrónico válido, por lo que tendrá que llamar a su administrador');
		   return false;
  	   }
  	  
  	  var params=[
  	             document.getElementById('v_cveCct').getAttribute('value'),
  	             document.getElementById('v_mailCct').getAttribute('value'),
  	             regenerar,
  	             "",
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
           			utils.basicAlert('No se tiene correo configurado por lo que la contrase\u00f1a igual al nombre del cct : '+document.getElementById('v_cveCct').getAttribute('value'));             	 
             	}
           		else{
             		if(response!=1){
             			utils.basicAlert('Ocurri\u00f3 un error al recuperar la contrase\u00f1a');
             		}else{
             			utils.basicAlert('La nueva contrase\u00f1a se envi\u00f3 al correo electr\u00f3nico registrado: '+
             			document.getElementById('v_mailCct').getAttribute('value')+ '.'+'\n Si el correo electr\u00f3nico no es correcto, favor de contactar a su administrador.');
             		}    
           		}
           		registry.byId('cve_cct').reset();
           		
      		   	dom.byId("cveCct").innerHTML="";
      		   	dom.byId("nomCct").innerHTML="";
      		  	dom.byId("nomDirector").innerHTML="";
          	   	dom.byId("nomNivel").innerHTML="";
          	   	dom.byId("telCct").innerHTML="";
          	   	dom.byId("mailCct").innerHTML="";
          	   	dom.byId("domicilio").innerHTML="";
          	   	dom.byId("nomLocalidad").innerHTML="";
          	   	dom.byId("nomMunicipio").innerHTML="";
          	   	dom.byId("nomEntidadfed").innerHTML="";  
           		
           		//window.location.href='<%=contexto %>/login.jsp';
              }
          });
          
          
     }
  	 
  	}
  );
  	 
  	</script>

</head>
    
    
    <body class="tundra">
<div style="width:918px; margin:auto;">
<div style="text-align:center; margin:auto;"><img src="<%=contexto %>/static/img/banner.jpg" width="918" height="74" alt="banner logotipo CONAPASE" /></div>
<div style="float:left; width:180px;">
    
        <table width="950px" border="0" align="center" >
            <tr>
                <td>
                    <div align="center" class="titulos">RECUPERACIÓN DE CONTRASEÑA</div>
                    
                    <div align="lefth" class="sub">Información del CCT</div>
                    
                    <div align="lefth" class="infoCct" id="infCct">
                        <span style="color:black; ">*</span>CCT: <input id="cve_cct" /> <button id="progButtonNode"></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                        
                    </div> <br>
                    
                    <table width="950px" border="0" align="center" class="infoCct" >

                        <tr>
                            <td>
                                CCT: <span id="cveCct" class="datosCct"/>
                            </td>
                            <td>
                                Nombre del Centro Escolar: <span id="nomCct" class="datosCct"/>
                            </td>
                            
                            <td>
                               Nivel: <span id="nomNivel" class="datosCct"/>
                            </td>
                            
                        </tr>
                        <tr>
                            <td>
                                Director: <span id="nomDirector" class="datosCct"/>
                            </td>                                                
                            <td>
                                Teléfono: <span id="telCct" class="datosCct"/>
                            </td>
                            <td>
                                Correo Electrónico: <span id="mailCct" class="datosCct"/>
                            </td>                            
                        </tr>
                        <tr>
                             <td>
                                Calle y Número: <span id=domicilio class="datosCct"/>
                            </td>
                            <td>
                                Localidad: <span id="nomLocalidad" class="datosCct"/>
                            </td>
                            <td>
                                 Municipio: <span id="nomMunicipio" class="datosCct"/>
                            </td>
                        </tr> 
                        <tr>
                            <td>
                                Entidad Federativa: <span id="nomEntidadfed" class="datosCct"/>
                            </td>
                        </tr>

                    </table><br>
                
                    <div align="lefth" class="sub">Recuperar</div>
                    <table width="950px" border="0" align="center" class="infoCct" >
                        <tr>
                            <td></td>
                            <td>
                                <input type="hidden" id="v_cveCct">
                                <input type="hidden" id="v_mailCct">
                                <button id="regButtonNode"></button>
                                <button id="regresar"></button>
                            </td>
                            
                        </tr>
                        <tr>
                            <td colspan="2" >
                               <span style="color:black; ">*</span> Los campos señalados con asterisco son obligatorios.
                            </td>
                            
                        </tr>
                    </table><br>
                </td>
            </tr>
        </table>
        
</div>
</div>
        
    </body>
    

