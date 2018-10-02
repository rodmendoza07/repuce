<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">	
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Videos</title>

<link rel="stylesheet" href="../../static/js/libs/dijit/themes/tundra/tundra.css" media="screen"> 
<script src="../../static/js/libs/dojo/dojo.js"></script>
<script>
  		dojoConfig= {
			has: {
	            "dojo-firebug": true,
	            "dojo-debug-messages": true
	        },  				
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
		        }, "regresarv");
	    });
	    getVideo=function (video){
			
			var cnt='';
			var titulo='';
			switch(video){
			case 0:
				titulo='Administraci&oacute;n de contrase&ntilde;as';
				cnt='<div><iframe width="560" height="315" src="http://www.youtube.com/embed/Y0S4HxliuqI" frameborder="0" allowfullscreen></iframe></div>';
			break;
			case 1:
				titulo='Primera Asamblea';
				cnt='<div><iframe width="560" height="315" src="http://www.youtube.com/embed/Kxs9bZchFNQ" frameborder="0" allowfullscreen></iframe></div>';
			break;
 			case 2:
 				titulo='Primera Sesi&oacute;n';
 				cnt='<div><iframe width="560" height="315" src="https://www.youtube.com/embed/fW8eoJe5wik" frameborder="0" allowfullscreen></iframe></div>';
 			break;
			case 3:
				titulo='Segunda Sesi&oacute;n';
				cnt='<div><iframe width="560" height="315" src="https://www.youtube.com/embed/pdOoOKU3YAY" frameborder="0" allowfullscreen></iframe></div>';
			break;
// 			case 4:
// 				titulo='Segunda Asamblea';
// 				cnt='<div><iframe width="560" height="315" src="https://www.youtube.com/embed/1l9-wZ_Eb3I" frameborder="0" allowfullscreen></iframe></div>'; 
// 			break;
// 			case 5:
// 				titulo='Tercera Sesi&oacute;n';
// 			//	cnt='<div><iframe width="560" height="315" src="http://www.youtube.com/embed/lY6KNEdxow0" frameborder="0" allowfullscreen></iframe></div>';
// 			break;
// 			case 6:
// 				titulo='Cuarta Sesi&oacute;n';
// 			//	cnt='<div><iframe width="560" height="315" src="http://www.youtube.com/embed/VpXegfwr0_I" frameborder="0" allowfullscreen></iframe></div>';
// 			break;
// 			case 7:
// 				titulo='Tercera Asamblea';
// 		//		cnt='<div><iframe width="560" height="315" src="http://www.youtube.com/embed/PQbS5d4lEj4" frameborder="0" allowfullscreen></iframe></div>';
// 			break;
			
			}
	        
			var dialog = new Dialog({
			    title: titulo,
			    content: cnt
			});
			
			dialog.show();
			dialog.on('hide',function(){
				dialog.destroyRecursive(false);
			});
	     };
	});
	
		
		
</script>
</head>
<body class="tundra">
<div style="text-align:center; margin:auto;"><img src='<c:url value="/static/img/banner.jpg"/>' width="918" height="74" alt="banner logotipo CONAPASE" /></div>

<div id="formContent" style="margin:auto; width: 600px; padding-top:50px;">

	 &Phi;  <a href="#" onclick="getVideo(0)" >Administraci&oacute;n de contrase&ntilde;as</a><br/><br/>

<!-- 	 &Phi;  <a href="#" onclick="getVideo(1)" >Primera Asamblea</a><br/><br/> -->
	 &Phi;  <a href="#">Primera Asamblea</a><br/><br/>
	
<!--  	 &Phi;  <a href="#" onclick="getVideo(2)" >Primera Sesi&oacute;n</a><br/><br/> -->
 	 &Phi;  <a href="#">Primera Sesi&oacute;n</a><br/><br/> 
	 
<!-- 	 &Phi;  <a href="#" onclick="getVideo(3)" >Segunda Sesi&oacute;n</a><br/><br/> -->
	 &Phi;  <a href="#">Segunda Sesi&oacute;n</a><br/><br/>

<!-- 	 &Phi;  <a href="#" onclick="getVideo(4)" >Segunda Asamblea</a><br/><br/> -->
<!-- 	 &Phi;  <a href="#"  >Primera Sesi&oacute;n</a><br/><br/> -->
<!-- 	 &Phi;  <a href="#"  >Segunda Sesi&oacute;n</a><br/><br/> -->
	 &Phi;  <a href="#"  >Segunda Asamblea</a><br/><br/>

<!-- 	 &Phi;  <a href="#" onclick="getVideo(5)" >Tercera Sesi&oacute;n</a><br/><br/> -->

<!-- 	 &Phi;  <a href="#" onclick="getVideo(6)" >Cuarta Sesi&oacute;n</a><br/><br/> -->

<!-- 	 &Phi;  <a href="#" onclick="getVideo(7)" >Tercera Asamblea</a><br/><br/> -->
	 
	 <button id="regresarv" type="button"></button>
	 
 </div>
</body>
</html>