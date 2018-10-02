<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@page import="org.springframework.context.i18n.LocaleContextHolder"%>
<% 
java.util.jar.Manifest manifest = new java.util.jar.Manifest();
manifest.read(pageContext.getServletContext().getResourceAsStream("/META-INF/MANIFEST.MF"));
java.util.jar.Attributes attributes = manifest.getMainAttributes();
%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
  	<title>Registro P&uacute;blico de Consejos Escolares</title>
	<style>
		.soria .dijitDialogUnderlay { background:#000; }
	    #footer {
		   position:absolute;
		   bottom:0;
		   text-align: center;
		   width:100%;
		   height:60px;   /* Height of the footer */
		}
	</style>	
	<link rel="stylesheet" href="static/css/style.css" media="screen">
	<link rel="stylesheet" href="static/css/segundaSesion/estilo.css" media="screen">
	<link rel="stylesheet" href="static/js/libs/dijit/themes/tundra/tundra.css" media="screen"> 
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
	<script src="static/js/libs/dojo/dojo.js"></script>	
	<script>
		require(["dijit/Dialog", "dijit/form/ValidationTextBox", "dijit/form/Button", "dijit/form/Form", "dojo/dom",
		         "app/util/jsUtils"], 
				function(Dialog, ValidationTextBox, Button, Form, dom, jsUtils) {
			new Form({
				method: 'POST',
				action: 'j_spring_security_check'
			}, 'loginForm');
			
	        var txtBoxUsuario = new ValidationTextBox({
	        	name: 'j_username',
                placeHolder: 'Nombre de usuario',
                missingMessage: 'Obligatorio',
                required: true,
                uppercase: true
            }, 'username');
	        
	        var txtBoxPass = new ValidationTextBox({
	        	name: 'j_password',
                placeHolder: 'Contraseña',
                missingMessage: 'Obligatorio',
                required: true,
                regExp: '.{1,25}',
                type: 'password',
                onKeyPress: function(event){
                	jsUtils.capLock(event);
                }
            }, 'password');
	        	        
	        var btnLogin = new Button({
                iconClass: 'dijitIconKey',
                type: 'submit',
                label: 'Ingresar'
            }, 'btnLogin');    
	        
	        txtBoxPass.startup();	        
	        txtBoxUsuario.startup();
	        btnLogin.startup();		        
		});
	</script>
</head>
<body class="tundra">
<div style="width:918px; margin:auto;">
<div style="text-align:center; margin:auto;"><img src="static/img/banner.jpg" width="918" height="74" alt="banner logotipo CONAPASE" /></div>
<div style="float:right; width:180px;">
	<a href="http://conapase.sep.gob.mx/work/models/conapase/Resource/494/1/images/MAPA%20CE%20JUNIO.pdf" target="_blank">
	  <img src="static/img/estatales.png" width="180" height="78" alt="lineamientos generales"  border="0">
	</a><br>
</div>

<div style="float:left; width:180px;">
	<a href="static/documentos/ConsejosEscolar080610.pdf" target="_blank">
	  <img src="static/img/botones/lineamientos.jpg" width="180" height="78" alt="lineamientos generales"  border="0">
	</a><br>
	<a href="mvc/graficas/movimientoMunicipal.jsp" >
<!-- 	<a href="" > -->
   <img src="static/img/botones/reportesmun.jpg" width="180" height="78" alt="reportes municipal"  border="0">
	</a><br>
	<a href="static/html/videos.jsp">
<!-- 	<a href=""> -->
	   <img src="static/img/botones/videos.jpg" width="180" height="78" alt="videos de apoyo"  border="0">
   </a><br> 
  <a href="<c:url value="/" />mvc/documentos/reporteMvtosNal" target="_blank">
<!-- <a href="http://conapase.sep.gob.mx/es/conapase/Conapase_Confidencial" target="_blank"> -->
  	<img src="static/img/botones/reportes.jpg" width="180" height="78" alt="reportes nacional"  border="0">
  </a><br>
<!--   <a href="static/documentos/manual.pdf" target="_blank"> -->
<a href="http://conapase.sep.gob.mx/es/conapase/Conapase_Confidencial" target="_blank">
  	<img src="static/img/botones/manualdu.jpg" width="180" height="78" alt="manual de usuario"  border="0">
  </a><br>
  <a href="mvc/graficas/graficasPublicas.jsp" >
<!--   <a href="" > -->
  	<img src="static/img/botones/graficas.jpg" width="180" height="78" alt="graficas integracion"  border="0">
  </a><br>
  <a href="http://www.consejosescolares.sep.gob.mx/es/conapase/Directorio_REPUCE" target="_blank">
  	<img src="static/img/botones/atencionestados.jpg" width="180" height="78" alt="atencion en tu estado"  border="0">
  </a><br>
<!--   <a href="static/html/faq.jsp"> -->
  <a href="">
  	<img src="static/img/botones/dudas.jpg" width="180" height="78" alt="Dudas"  border="0">
  </a><br>
<!--   <img src="static/img/botones/consulta.jpg" width="180" height="78" alt="consulta de consejos"  border="0"><br> -->
<!--   <img src="static/img/botones/asesoria.jpg" width="180" height="78" alt="asesoria y soporte"  border="0"><br> -->
 </div>
<div id="formContent" style="margin:auto; width: 365px; padding-top:100px;">
<div style="background:#BAB6B6; height:25px; color:#333; font-weight:bold; margin-bottom:10px; padding:5px;">Ingrese su usuario y contraseña</div>
<form id="loginForm">
                <table border="0">
                               <tr>
                                               <td width="25%" align="right"><label for="username">Usuario:</label></td>
                                               <td>&nbsp;</td>
                                               <td colspan="2"><input id="username"></td>
                               </tr>
                               <tr>
                                               <td width="25%" align="right"><label for="password">Contraseña:</label></td> 
                                               <td>&nbsp;</td>
                                               <td colspan="2"><input id="password"><br></td>
                               </tr>
                               <tr>
                                               <td colspan="4" style="text-align: right;"><input id="btnLogin" style="border:none" value=""></td>
                                               
                               </tr>
                               <tr>
												<td colspan="4" align="center" valign="middle" class="requeridos">
													<div id="caplock" style="visibility:hidden">
														<img src="static/img/cstmAlert.png">
														&nbsp;&nbsp;
														El bloque de may&uacute;sculas est&aacute; activado.
													</div>
												</td>
                               </tr>
                               <tr>
                                               <td colspan="4" style="text-align: right;">
	                                             	<c:if test="${not empty param.login_error}">
													    <font face="Arial" color="red" size="2"> 
													    	<marquee bgcolor="white">
													    		Nombre de usuario o contraseña incorrectos, favor de ingresar los datos correctos o ingresar a la opci&oacute;n "Recuperar contraseña".
													    	</marquee>
													    </font> 
													</c:if>  
                                               </td>
                               </tr>
                               <tr>
                                               <td colspan="4" style="text-align: right;"></td>
                               </tr>
                               <tr>
                                               <td colspan="2" style="text-align: right;"><a href="mvc/contrasenas/recuperarContrasenas.jsp">Recuperar contraseña<img src="static/img/recContrasena.png"  id="actDirector" border="0" height="20" width="20"/></td>
                                               <td colspan="2" style="text-align: right;"><a href="mvc/contrasenas/cambiarContrasenas.jsp">Cambiar contraseña<img src="static/img/security_keyandlock.png"  id="actDirector" border="0" height="20" width="20"/></td>
                               </tr>
                               
                </table>
                
</form>
</div>
</div>
<div id="footer">Versi&oacute;n: <%=attributes.getValue("Implementation-Version")%></div>
								
</body>

</html>