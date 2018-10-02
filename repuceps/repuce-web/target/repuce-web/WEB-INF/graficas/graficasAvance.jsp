<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">	
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Graficas de Avance</title>
<link rel="stylesheet" href='<c:url value="/static/js/libs/dijit/themes/tundra/tundra.css"/>' media="screen"> 
<link rel="stylesheet" href='<c:url value="/static/js/libs/dojox/image/resources/Lightbox.css"/>' >  
<script src='<c:url value="/static/js/libs/dojo/dojo.js"/>'></script>
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
  	
	<script> 
	require(["dojo/ready", "dijit/form/Button","dijit/Dialog"], function(ready, Button,Dialog){
	    ready(function(){
	    	 new Button({
		            label: "Regresar",
		            onClick: function(){
		            	window.location.href='<c:url value="/login.jsp"/>';
		            }
		        }, "regresar");
	    });
	    rep=function(){
	    	var dialog2 = new Dialog({
			    title:'Avance Nacional en el registro de sesiones y asambleas',
			    content: cnt='<div><iframe width="650" height="500" src='+'<c:url value="/static/documentos/AvanceRegistro.pdf"/>'+' frameborder="0" allowfullscreen></iframe></div>',
			    style: "width: 700;height:650"
	    	});
		    dialog2.show();
			dialog2.on('hide',function(){
				dialog2.destroyRecursive(false);
			});
	    };
	    

	});
	
	dojo.require("dojox.image.Lightbox");
		
		function getImg(grafica){
			
			var ahref='';
			switch(grafica){
			case 1:
				ahref='<c:url value="/static/documentos/avance_entidad.gif"/>';
			break;
			case 2:
				ahref='<c:url value="/static/documentos/cobertura_nivel.gif"/>';
			break;
			case 3:
				ahref='<c:url value="/static/documentos/avance_sesiones.gif"/>';
			break;
			case 4:
				ahref='<c:url value="/static/documentos/registro_comites.gif"/>';
			break;
			case 5:
				ahref='<c:url value="/static/documentos/integrantes_genero.gif"/>';
			break;
			}
	        
			var dialog = new dojox.image.LightboxDialog().startup();
			setTimeout(function(){
				dialog.show({title:"",
			          href:ahref});
			    }, 500);
			
			
	     }

	
	
	</script>
</head>
<body class="tundra">

<div style="text-align:center; margin:auto;"><img src='<c:url value="/static/img/banner.jpg"/>' width="918" height="74" alt="banner logotipo CONAPASE" /></div>

<div id="formContent" style="margin:auto; width: 600px; padding-top:50px;">

 &Phi;  <a href="#" onclick="getImg(1)" >Porcentaje de Consejos Escolares integrados por entidad federativa</a><br/><br/>
 
 &Phi;  <a href="#" onclick="getImg(2)" >Cobertura nacional de Consejos Escolares por nivel educativo</a><br/><br/>

 &Phi;  <a href="#" onclick="getImg(3)" >Registro de sesiones y asambleas a nivel nacional</a><br/><br/>

 &Phi;  <a href="#" onclick="getImg(4)" >Registro de comit&eacute;s a nivel nacional</a><br/><br/>
 
 &Phi;  <a href="#" onclick="getImg(5)" >Porcentaje de Padres de Familia integrantes de Consejos Escolares por entidad federativa</a><br/><br/>

 <button id="regresar" type="button"></button>
</div>        

</body>
</html>