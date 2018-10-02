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
  	   function(Tooltip,ValidationTextBox,Button,registry,on,xhr,json,Select,DeferredList,utils,constants,RadioButton, ready, 
  			   dom, dojo, jsUtils){
  		
  		var gcCct=0;
  		var gTipoClave = 0;
  		
  	    ready(function(){
  	        // Create a button programmatically:
  	        var myButton = new Button({
  	            label: "Cambiar Contrase\u00f1a",
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
	           promptMessage:" Ingrese el cct "
	       }, "cve_cct");
  	    
	  	var validCct = new ValidationTextBox({
	          type:"hidden",  
	          name:"v_cveCct", 
	          value:"", trim:"true", uppercase:"true"        	   
	      }, "v_cveCct");
	  	var validUsername = new ValidationTextBox({
	          type:"hidden",  
	          name:"v_userName", 
	          value:"", trim:"true", uppercase:"true"        	   
	      }, "v_userName");
	  	
	  	new ValidationTextBox({
	           type:"text",  
	           name:"nContrasena", 
	           value:"", trim:"true",      
	           regExp:constants.SIZE_CONTRASENA,
	           promptMessage:" Ingrese la nueva contrase\u00f1a "
	       }, "nContrasena");
	       
	       new ValidationTextBox({
	           type:"text",  
	           name:"rnContrasena", 
	           value:"", trim:"true",       
	           regExp:constants.SIZE_CONTRASENA,
	           promptMessage:" Repita la nueva contrase\u00f1a "
	       }, "rnContrasena");
	       
	       new ValidationTextBox({
	           type:"text",  
	           name:"aContrasena", 
	           value:"", trim:"true",  
	           regExp:constants.SIZE_CONTRASENA,
	           promptMessage:" Ingrese la contrase\u00f1a actual"
	       }, "aContrasena");
  	    
  	    });  		
  		
  		
  	 function _getTurnos(){  		 
	       var cveCct={cveCct:registry.byId('cve_cct').get('value')};
       	   registry.byId('aContrasena').set('value','');
		   registry.byId('nContrasena').set('value','');
		   registry.byId('rnContrasena').set('value','');  
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
	       
	       //alert("_getTurnos :: "+cveCct);
	       var urlJson=dojo.config.app.urlBase + 'catalogos/ListCct/';
	        xhr.get({
	            url: urlJson,
	            sync: false,
	            content:cveCct,
	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
	            handleAs: "json",
	            handle: function(response){
                	
	            	if(response.length==0){	
						jsUtils.cstmAlert("No se encontr\u00F3 el Centro Escolar");
						return;	
	            	}else if(response.length>0){
	                	
	                    _getInfCct(response[0].cCct);
	                    return;
	            	}
	               
	                	                	
	                document.getElementById('tableCct').style.display="none";
	               	document.getElementById('tableUsuario').style.display="inline";
	               	    
	               	 //Busca usuario ListUsuarios
	               	 gTipoClave = 1;

	            },
	            error: function(error){
	            	utils.basicAlert(json.toJson(error));
	            }

  		});
	        
	        
	        //Usuarios
	        var urlJson=dojo.config.app.urlBase + 'catalogos/ListUsuarios/';
	        xhr.get({
	            url: urlJson,
	            sync: false,
	            content:cveCct,
	            contentType: "application/x-www-form-urlencoded; charset=utf-8",
	            handleAs: "json",
	            handle: function(response){
        			dom.byId("username").innerHTML="";
        	      	dom.byId("nombre").innerHTML="";
        	  	    dom.byId("activo").innerHTML="";
           	    	
	            	if(response.length==1){

	            		if(response[0] != null && response[0] != ''){
		                	utils.createTag('ins','nomTurno', 'infCct');	                	
		                	document.getElementById('v_userName').setAttribute('value',response[0].username);
		                    dom.byId("username").innerHTML=response[0].username;
		               	    dom.byId("nombre").innerHTML=response[0].nombre;
		               	    if(response[0].activo = "true"){
		               	    	dom.byId("activo").innerHTML="SI";	
		               	    }else{
		               	    	dom.byId("activo").innerHTML="NO";
		               	    }
	            			
	            		}else{	            				            				
	            			utils.basicAlert("No existen datos para el CCT o usuario seleccionado");
		            	}
	            		
	               	    
	                    return;
	            	}else{
	            		utils.basicAlert("No existen datos para el CCT o usuario seleccionado");
	            	}
	                
	                	
	            },
	            error: function(error){
	            	utils.basicAlert(json.toJson(error));
	            }

  		});
	        
	        
  	 }
  	 
     function _getInfCct(cCct){
    	 //alert(" _getInfCct ");
    	 document.getElementById('tableCct').style.display="inline";
    	 document.getElementById('tableUsuario').style.display="none";
    	 
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
  	   var v_userName={v_cveCct:registry.byId('v_userName').get('value')};
  	   var aContrasena={nContrasena:registry.byId('aContrasena').get('value')};
	   var nContrasena={nContrasena:registry.byId('nContrasena').get('value')};
	   var rnContrasena={rnContrasena:registry.byId('rnContrasena').get('value')};

  	   var regenerar = "2";

	  	if( gTipoClave == 0){
	   	   if( registry.byId('v_cveCct').get('value') == null || registry.byId('v_cveCct').get('value') == ''){
	   		utils.basicAlert('Debe buscar un CCT v\u00e1lido');
	  		   return false;
	  	   }
	  		
	  	}else{
	  		if( registry.byId('v_userName').get('value') == null || registry.byId('v_userName').get('value') == ''){
	  			utils.basicAlert('Debe buscar un usuario v\u00e1lido');
		  		   return false;
		  	   }
	  		
	  	}

	  	if( registry.byId('aContrasena').get('value') == null || registry.byId('aContrasena').get('value') == ''){
	  		utils.basicAlert('Debe ingresar la contrase\u00f1a actual.');
			   return false;
		}	
	  	  
	   	if( registry.byId('nContrasena').get('value') == null || registry.byId('nContrasena').get('value') == ''){
	   		utils.basicAlert('La nueva contrase\u00f1a no debe ser nula.');
		   return false;
	    }
	   	
  	    if( registry.byId('rnContrasena').get('value') == null || registry.byId('rnContrasena').get('value') == ''){
  	    	utils.basicAlert('Debe confirmar la nueva contrase\u00f1a.');
		     return false;
	     }
	  	  	   	
	  	if( registry.byId('nContrasena').get('value') != registry.byId('rnContrasena').get('value') ){
			   
	  		utils.basicAlert('La nueva contrase\u00f1a y la confirmaci\u00f3n no coinciden.');
		  return false;
		}	
	  	
  	    if( registry.byId('aContrasena').get('value') == registry.byId('rnContrasena').get('value') ){
  	    	utils.basicAlert('La nueva contrase\u00f1a debe ser diferente a la contrase\u00f1a actual');
		     return false;
	    }

	  	if( registry.byId('nContrasena').get('value').length  < 6 || registry.byId('rnContrasena').get('value').length  < 6){
	  		utils.basicAlert('La nueva contrase\u00f1a no debe ser menor de seis caracteres.');
			   return false;
		}

	  	
  	   var params=[
  	               registry.byId('nContrasena').get('value'),
  	               registry.byId('nContrasena').get('value'),
  	               regenerar,
  	               registry.byId('nContrasena').get('value'),
  	               gcCct+'',
  	               registry.byId('aContrasena').get('value'),
  	               gTipoClave+'',
  	               document.getElementById('v_userName').getAttribute('value')
  	              ];
	
  	   console.log(json.toJson(params));
     	
  	  	var urlJson=dojo.config.app.urlBase + 'catalogos/updatePwdCCct';
          xhr.post({
              url: urlJson,
              postData: json.toJson(params),
  			 headers:{
  				     "Content-Type" : "application/json; charset=UTF-8"
  				},					
  			 handleAs: 'json',
              handle: function(response){
             	 if(response!=1){
             		utils.basicAlert('No fue posible cambiar la contrase\u00f1a. Verifique que la contrase\u00f1a actual sea la correcta');
             	}else{
             		utils.basicAlert('El cambio de la contrase\u00f1a se realiz\u00f3 correctamente');
            	    //window.location.href='<%=contexto %>/login.jsp';             		 
             	 }  
             	 
				registry.byId('cve_cct').reset();
				registry.byId('nContrasena').reset();
				registry.byId('rnContrasena').reset();
				registry.byId('aContrasena').reset();
				
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
                    <div align="center" class="titulos">CAMBIO DE CONTRASEÑA</div>
                    
                    <div align="lefth" class="sub">Información del Usuario</div>
                    
                    <div align="lefth" class="infoCct" id="infCct">
                        <span style="color:black; ">*</span>Usuario o CCT: <input id="cve_cct" /> <button id="progButtonNode"></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                        
                    </div> <br>
                    
                    <table width="950px" border="0" align="center" class="infoCct" id="tableCct" style="display:none;" >

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

                    </table>
                    
                    <table width="950px" border="0" align="center" class="infoCct" id="tableUsuario" style="display:none;"  >
                        <tr>
                            <td>
                                Usuario: <span id="username" class="datosCct"/>
                            </td>
                            <td>
                                Nombre: <span id="nombre" class="datosCct"/>
                            </td>
                            <td>
                                Activo:<span id="activo" class="datosCct"/>
                            </td>                            
                        </tr>
                    </table>
                    
                    <br>
                    <br>
                    <br>
                
                    <div align="lefth" class="sub">Cambiar Contraseña</div>
                    <table width="950px" border="0" align="center" class="infoCct" >
                        <tr>
                            <td>
                               <span style="color:black; ">*</span>Contraseña actual:
                            </td>
                            <td>
                                <input id="aContrasena" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                               <span style="color:black; ">*</span>Nueva contraseña:
                            </td>
                            <td>
                                <input id="nContrasena" />
                            </td>
                        </tr>
                       <tr>
                            <td>
                               <span style="color:black; ">*</span>Confirmar contraseña:
                            </td>
                                                        <td>
                                <input id="rnContrasena" />
                            </td>
                            
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <input type="hidden" id="v_userName">
                                <input type="hidden" id="v_cveCct">
                                <input type="hidden" id="v_mailCct">
                                <button id="regButtonNode"></button>
                                <button id="regresar"></button>
                            </td>
                            
                        </tr>
                        <tr>
                            <td colspan="2" >
                               <span style="color:black; ">*</span>Los campos señalados con asterisco son obligatorios.
                            </td>
                            
                        </tr>
                         
                    </table><br>
                </td>
            </tr>
        </table>
        
</div>
</div>
        
    </body>
    

