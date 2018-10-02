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
  		 });
  		
	  	 function _getTurnos(){  		 
		       var cveCct={cveCct:registry.byId('cve_cct').get('value')};
	  		   
	  		   dom.byId("cveCct").innerHTML="";
	  		   gcCct = "";
	  		   dom.byId("nomCct").innerHTML="";
	      	   dom.byId("nomLocalidad").innerHTML="";
	      	   dom.byId("nomMunicipio").innerHTML="";
	  	   	   dom.byId("nomEntidadfed").innerHTML=""; 
		       
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
		               	gTipoClave = 1;
	
		            },
		            error: function(error){
		            	utils.basicAlert(json.toJson(error));
		            }
	
	  			});
	        	        
  	 	}
  	 
     function _getInfCct(cCct){
    	 document.getElementById('tableCct').style.display="inline";
    	 
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
  		   
  		   dom.byId("cveCct").innerHTML=cct.cveCct;
  		   
  		   gcCct = cct.cCct;
  		   
  		   dom.byId("nomCct").innerHTML=cct.nomCct;
         	         	   
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
                                        
                    <div align="lefth" class="sub">Busca tú escuela</div>
                    
                    <div align="lefth" class="infoCct" id="infCct">
                        <span style="color:black; ">*</span>CCT: <input id="cve_cct" /> <button id="progButtonNode"></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                        
                    </div> <br>
                    
                    <table width="950px" border="0" align="center" class="infoCct" id="tableCct" style="display:none;" >

                        <tr>
                            <td>
                                CCT: <span id="cveCct" class="datosCct"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Nombre del Centro Escolar: <span id="nomCct" class="datosCct"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Entidad Federativa: <span id="nomEntidadfed" class="datosCct"/>
                            </td>
                        </tr>                        
                        <tr>
                            <td>
                                Localidad: <span id="nomLocalidad" class="datosCct"/>
                            </td>
                        </tr>                        
                        <tr>
                            <td>
                                 Municipio: <span id="nomMunicipio" class="datosCct"/>
                            </td>
                        </tr> 

                    </table>
                    
                </td>
            </tr>
        </table>
        
</div>
</div>
        
    </body>
    

