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
		
		#rcorners2 {
		    border-radius: 25px;
		    border: 2px solid #8AC007;
		    padding: 20px;
		    width: 200px;
		    height: 150px;
		}
		#rcorners3 {
				    /*border-radius: 25px;*/
				    border: 2px;
				    width: 300px;
				    padding: 2px;
		}
				p.sansserif {
                                   font-family: sans-serif, Helvetica, Arial ;
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
       <table border="0" style="height:auto;padding:1%;width:100%;">
             <tr>
                    <th colspan="4">
                           <img src="static/img/logo.jpg"/>
                    </th>
             </tr>
             <tr>
                    <th width="40%" align="right">
                           <a href="http://conapase.sep.gob.mx/es/conapase/Consejo_Nacional_de_Participacion_Social_en_la_Educacion" target="_blank">
                                  <img src="static/img/botones/menu_repuce01.png" width="258" height="65" alt="Consejo Nacional de Participación Social en la Educación"  border="0">
                           </a>
                    </th>
                    <th width="20%" rowspan="3" align="center">
                           <div id="formContent" style="margin:auto; width: 460px; padding-top:15px;">
                     <div id="rcorners2" style="width:325px;height:165px;border: 2px solid #BAB6B6;padding-left:20px;overflow-x: hidden;">
                     <div id="rcorners3" style="background:#BAB6B6; height:15px; color:#333; font-weight:bold; margin-bottom:5px;">Ingrese su usuario y contraseña</div>
                    
                           <form id="loginForm">
                       <table border="0" >
                          <tr>
                              <td width="25%" align="right"><label for="username">Usuario:</label></td>
                              <td>&nbsp;</td>
                              <td colspan="2"><input id="username"></td>
                          </tr>
                          <tr>
                               <td width="25%" align="right"><label for="password">Contraseña:</label></td> 
                               <td>&nbsp;</td>
                               <td> <input id="password"><br></td>
                          </tr>
                          <tr>
                              <td colspan="3" style="text-align: right;"><input id="btnLogin" style="border:none" value=""></td>                                          
                          </tr>
                          <tr>
                              <td colspan="3" align="center" valign="middle" class="requeridos">
                                  <div id="caplock" style="visibility:hidden">
                                         <img src="static/img/cstmAlert.png" height="10" width="10">
                                         &nbsp;&nbsp;
                                         El bloque de may&uacute;sculas est&aacute; activado.
                                  </div>
                              </td>
                          </tr>
                       </table>                                                            
                     </form>
         <div style="float:left; width:155px;"><a href="mvc/contrasenas/recuperarContrasenas.jsp">Recuperar contraseña<img src="static/img/recContrasena.png"  id="actDirector" border="0" height="10" width="10"/></div>
         <div style="float:right; width:150px;"><a href="mvc/contrasenas/cambiarContrasenas.jsp">Cambiar contraseña<img src="static/img/security_keyandlock.png"  id="actDirector" border="0" height="10" width="10"/></div>
                                                                                              
                    </th>
                    <th width="40%" align="left">
                           <a href="http://conapase.sep.gob.mx/es/conapase/Instructivo_para_el_ingreso_REPUCE" target="_blank">
                                  <img src="static/img/botones/menu_repuce05.png" width="258" height="65" alt="Consejo Nacional de Participación Social en la Educación"  border="0">
                           </a>
                    </th>
             </tr>
             <tr>
                    <th align="right">
                           <a href="http://conapase.sep.gob.mx/es/conapase/Consejos_Estatales_de_Participacion_Social_en_la_Educacion" target="_blank">
                                  <img src="static/img/botones/menu_repuce02.png" width="258" height="65"  alt="reportes municipal"  border="0">
                           </a>
                    </th>
                    
                    <th align="left">
                           <a href="static/html/videos.jsp">
                                  <img src="static/img/botones/menu_repuce06.png" width="258" height="65"  alt="reportes municipal"  border="0">
                           </a>
                    </th>
             </tr>
             <tr>
                    <th align="right">
                           <a href="mvc/graficas/movimientoMunicipal.jsp">
                                  <img src="static/img/botones/menu_repuce03.png" width="258" height="65"  alt="videos de apoyo"  border="0">
                       </a>
                    </th>
                    
                    <th align="left">
                           <a href="http://conapase.sep.gob.mx/es/conapase/Atencion_en_tu_Estado"  target="_blank">
                                  <img src="static/img/botones/menu_repuce07.png" width="258" height="65"  alt="videos de apoyo"  border="0">
                       </a>
                    </th>
             </tr>
             <tr>
                    <th align="right">
                           <a href="mvc/graficas/reportegraficas.jsp">
                                        <img src="static/img/botones/menu_repuce04.png" width="258" height="65"  alt="reportes nacional"  border="0">
                           </a>
                    </th>
                    <td rowspan="2" align="center" valign="middle" class="requeridos">
                           <div align="left" id="rcorners2" style="width:325px;height:150px;border: 2px solid #BAB6B6;overflow-x: hidden;">
                                  <li><a href="http://www.consejosescolares.sep.gob.mx/es/conapase/Marco_Juridico" target="_blank"> Normatividad de los Consejos de Participación Social en la Educaci&oacute;n</a></li>
                                  <br>
                                  <li><a href="https://www.gob.mx/modeloeducativo2016/" target="_blank"> Modelo Educativo 2016  </a></li>
                                  <br>
                                  <li><a href="http://www.consejosescolares.sep.gob.mx/es/conapase/Indicadores_del_Ciclo_Funcional_de_los_CEPS" target="_blank"> Indicadores del ciclo funcional de los Consejos Escolares de Participaci&oacute;n Social en la Educaci&oacute;n </a></li>
                           </div>
                    </td>        
                    <th align="left">
                           <a href="http://conapase.sep.gob.mx/es/conapase/Preguntas_Frecuentes" target="_blank">
                                  <img src="static/img/botones/menu_repuce08.png" width="258" height="65"  alt="reportes nacional"  border="0">
                        </a>
                    </th>
             </tr>
             <tr>
                    <th align="right">
<!--                              <a href="mvc/graficas/buscarCct2.jsp"> -->
                             <a href="mvc/graficas/buscarCct.jsp">
                                        <img src="static/img/botones/menu_repuce99.png" width="258" height="65"  alt="reportes nacional"  border="0">
                             </a>
                    </th>
                    
                    <th align="left">
                           <a href="http://conapase.sep.gob.mx/es/conapase/Formatos_de_Actas" target="_blank">
                                  <img src="static/img/botones/menu_repuce09.png" width="258" height="65"  alt="reportes nacional"  border="0">
                        </a>
                    </th>
             </tr>
             <tr>
             
                    <th colspan="4">
<!--                            <img src="static/img/abajo.jpg" width="400" height="40%"/> -->
                                <img src="static/img/abajo.jpg"/>
                    </th>
             </tr>
             <tr>
             <th><font size="1">Versi&oacute;n: <%=attributes.getValue("Implementation-Version")%></font></th>
             </tr>                             
       </table>
       <c:if test="${not empty param.login_error}">
        <font face="Arial" color="red" size="2"> 
           <marquee bgcolor="white">
                 Nombre de usuario o contraseña incorrectos, favor de ingresar los datos correctos o ingresar a la opci&oacute;n "Recuperar contraseña".
           </marquee>
        </font> 
    </c:if> 
						
</body>

</html>