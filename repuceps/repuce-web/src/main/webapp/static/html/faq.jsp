<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">	
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<title>Dudas</title>

<link href="../../static/css/faq.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>

<script type="text/javascript" src="../../static/js/util/ddaccordion.js">

/***********************************************
* Accordion Content script- (c) Dynamic Drive DHTML code library (www.dynamicdrive.com)
* Visit http://www.dynamicDrive.com for hundreds of DHTML scripts
* This notice must stay intact for legal use
***********************************************/

</script>


<script type="text/javascript">


ddaccordion.init({ //top level headers initialization
	headerclass: "expandable", //Shared CSS class name of headers group that are expandable
	contentclass: "categoryitems", //Shared CSS class name of contents group
	revealtype: "click", //Reveal content when user clicks or onmouseover the header? Valid value: "click", "clickgo", or "mouseover"
	mouseoverdelay: 200, //if revealtype="mouseover", set delay in milliseconds before header expands onMouseover
	collapseprev: true, //Collapse previous content (so only one open at any time)? true/false 
	defaultexpanded: [0], //index of content(s) open by default [index1, index2, etc]. [] denotes no content
	onemustopen: false, //Specify whether at least one header should be open always (so never all headers closed)
	animatedefault: false, //Should contents open by default be animated into view?
	persiststate: true, //persist state of opened contents within browser session?
	toggleclass: ["", "openheader"], //Two CSS classes to be applied to the header when it's collapsed and expanded, respectively ["class1", "class2"]
	togglehtml: ["prefix", "", ""], //Additional HTML added to the header when it's collapsed and expanded, respectively  ["position", "html1", "html2"] (see docs)
	animatespeed: "fast", //speed of animation: integer in milliseconds (ie: 200), or keywords "fast", "normal", or "slow"
	oninit:function(headers, expandedindices){ //custom code to run when headers have initalized
		//do nothing
	},
	onopenclose:function(header, index, state, isuseractivated){ //custom code to run whenever a header is opened or closed
		//do nothing
	}
})

ddaccordion.init({ //2nd level headers initialization
	headerclass: "subexpandable", //Shared CSS class name of sub headers group that are expandable
	contentclass: "subcategoryitems", //Shared CSS class name of sub contents group
	revealtype: "click", //Reveal content when user clicks or onmouseover the header? Valid value: "click" or "mouseover
	mouseoverdelay: 200, //if revealtype="mouseover", set delay in milliseconds before header expands onMouseover
	collapseprev: true, //Collapse previous content (so only one open at any time)? true/false 
	defaultexpanded: [], //index of content(s) open by default [index1, index2, etc]. [] denotes no content
	onemustopen: false, //Specify whether at least one header should be open always (so never all headers closed)
	animatedefault: false, //Should contents open by default be animated into view?
	persiststate: true, //persist state of opened contents within browser session?
	toggleclass: ["opensubheader", "closedsubheader"], //Two CSS classes to be applied to the header when it's collapsed and expanded, respectively ["class1", "class2"]
	togglehtml: ["none", "", ""], //Additional HTML added to the header when it's collapsed and expanded, respectively  ["position", "html1", "html2"] (see docs)
	animatespeed: "fast", //speed of animation: integer in milliseconds (ie: 200), or keywords "fast", "normal", or "slow"
	oninit:function(headers, expandedindices){ //custom code to run when headers have initalized
		//do nothing
	},
	onopenclose:function(header, index, state, isuseractivated){ //custom code to run whenever a header is opened or closed
		//do nothing
	}
})


</script>
<link rel="stylesheet" href="../../static/js/libs/dijit/themes/tundra/tundra.css" media="screen"> 
<link rel="stylesheet" href="../../static/js/libs/dojox/image/resources/Lightbox.css">  
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
	    regresar=function(){
        	window.location.href='<c:url value="/login.jsp"/>';
        }
	    getCont= function(pregunta){
			
			var text='';
			var titulo='';
			switch(pregunta){
			case 1:
				titulo='El Sistema no se encuentra disponible.';
				text='<p style="text-align:justify"><span> '+ 
				'Es posible que, por cuestiones de mantenimiento o problemas en la '+ 
				'operaci&oacute;n, el Sistema no se encuentre disponible, de tal manera, le pedimos '+ 
				'intentar ingresar en un tiempo razonable -m&aacute;ximo una hora- y  si a&uacute;n persiste el problema, favor de comunicarse a nuestra '+ 
				'Mesa de Ayuda a los tel&eacute;fonos: 01 55 3601 7599, 01 800 288 66 88 y 01 55 36 01 '+ 
				'10 00 ext. 55777 o al correo electr&oacute;nico <a href="mailto:sacv@sep.gob.mx">sacv@sep.gob.mx</a> '+ 
				'en d&oacute;nde le informar&aacute;n de la situaci&oacute;n y el tiempo estimado de reactivaci&oacute;n del '+ 
				'Sistema.</span></p>';
			break;
			case 2:
				titulo='No permite ingresar al REPUCE. ';
				text='<p  style="text-align:justify"><span>Es probable que su contrase&ntilde;a no este vigente o actualizada, en '+ 
				'este caso, usted puede regenerar su contrase&ntilde;a mediante la opci&oacute;n "<span '+ 
				'style="color:red"><ahref="http://www.repuce.sep.gob.mx/REPUCE/mvc/contrasenas/recuperarContrasenas.jsp">'+ 
				'Recuperar contrase&ntilde;a</a></span>", es importante mencionar que ser&aacute; necesario contar con un '+ 
				'correo electr&oacute;nico registrado en el REPUCE; de no ser as&iacute;, deber&aacute; comunicarse '+ 
				'con el &aacute;rea de Mesa de Ayuda o a las oficinas del Consejo Nacional de Participaci&oacute;n '+ 
				'Social en la Educaci&oacute;n (CONAPASE), donde le brindar&aacute;n el apoyo necesario para actualizar su '+ 
				'informaci&oacute;n, asimismo le ayudar&aacute;n a regenerar su contrase&ntilde;a.</span></p> '+ 
				'<p  style="text-align:justify"><span>Tambi&eacute;n es posible que su centro de trabajo este dado de baja, por '+ 
				'lo cual, deber&aacute; comunicarse al CONAPASE, donde le informar&aacute;n los pasos a seguir.</span></p> '+ 
				'<p  style="text-align:justify"><span>Para mayor informaci&oacute;n consulte la secci&oacute;n "<span '+ 
				'style="color:red"><a '+ 
				'href="http://www.repuce.sep.gob.mx/REPUCE/static/documentos/manual.pdf">Recuperar '+ 
				'contrase&ntilde;a</a></span>" de su Manual de Usuario.</span></p>';
			break;
			case 3:
				titulo='Mi centro es de nueva creaci&oacute;n y no puedo ingresar al REPUCE.';
				text='<p  style="text-align:justify"><span>Se deber&aacute; comunicar a las oficinas del Consejo Nacional de '+ 
				'Participaci&oacute;n Social en la Educaci&oacute;n (CONAPASE), donde le brindar&aacute; el apoyo e '+ 
				'informaci&oacute;n para ingresar a la base de datos del REPUCE.</span></p>';
			break;
			case 4:
				titulo='No se muestran los botones de guardar y cerrar.';
				text='<p  style="text-align:justify"><span>Si el formato de su captura no es visible completamente '+ 
				'en la pantalla y tiene problemas para navegar por los elementos que la conforman, '+ 
				'incluidos los botones de "Guardar", "Cerrar", "Agregar integrante", "Eliminar '+ 
				'integrante", entre otros; le sugerimos utilizar la tecla del tabulador (TABS), '+ 
				'o bien, manejar la barra de desplazamiento que se ubica de lado derecho de su pantalla de captura '+ 
				'con la cual podr&aacute; visualizar y ejecutar dichos botones.</span></p> '+ 
				'<p  style="text-align:justify"><span>Para mayor informaci&oacute;n consulte la <span style="color:red"><a '+ 
				'href="http://www.repuce.sep.gob.mx/REPUCE/static/documentos/manual.pdf">P&aacute;gina '+ 
				'16</a></span> de su Manual de Usuario.</span></p>';
			break;
			case 5:
				titulo='Al dar clic en el bot&oacute;n "Guardar", no aparece el acta.';
				text='<p  style="text-align:justify"><span>Una vez que guard&oacute; la informaci&oacute;n, deber&aacute; dar clic en el bot&oacute;n de "Cerrar" '+ 
				'con la finalidad de desplegar la pantalla que muestra las asambleas y sesiones. '+ 
				'En seguida, de clic en el &iacute;cono de la impresora para obtener el acta en formato '+ 
				'PDF. Recuerde tener desbloqueados los elementos emergentes para visualizar las '+ 
				'minutas que se abren en otra ventana.</span></p> '+
				'<p  style="text-align:justify"><span>Para mayor informaci&oacute;n consulte la <span style="color:red"><a '+ 
				'href="http://www.repuce.sep.gob.mx/REPUCE/static/documentos/manual.pdf">P&aacute;gina '+ 
				'10</a></span> de su Manual de Usuario.</span></p>';
			break;
			case 6:
				titulo='Al dar clic en el bot&oacute;n "Guardar", no salva cambios ';
				text='<p  style="text-align:justify"><span>Si registr&oacute; toda la informaci&oacute;n y el Sistema no responde al “Guardar”'+ 
				', pareciera no hacer nada, le pedimos comunicarse a nuestra Mesa de Ayuda a </span><span lang=ES-TRAD '+ 
				'style="font-size:11.0pt;line-height:115%">los tel&eacute;fonos: 01 55 3601 7599, 01 '+ 
				'800 288 66 88 y 01 55 36 01 10 00 ext. 55777 </span><span lang=ES-TRAD>o al </span><span '+ 
				'lang=ES-TRAD style="font-size:11.0pt;line-height:115%">cor</span><span>reo electr&oacute;nico <a href="mailto:sacv@sep.gob.mx">sacv@sep.gob.mx</a>. '+ 
				'Para mejorar nuestro servicio de atenci&oacute;n, en tiempo y forma, se recomienda '+ 
				'insertar im&aacute;genes en su reporte con la finalidad de analizar el comportamiento del '+ 
				'Sistema, el navegador y la versi&oacute;n que utiliza para acceder al REPUCE. Entre '+ 
				'm&aacute;s informaci&oacute;n nos proporcione, el tiempo de resoluci&oacute;n ser&aacute; menor. </span></p> '+ 
				'<p  style="text-align:justify"><span>En todo momento, usted recibir&aacute; un n&uacute;mero (ticket) con el que '+ 
				'podr&aacute; dar seguimiento a su reporte hasta que este sea resuelto.</span></p>';
			break;
			case 7:
				titulo='Tengo problemas al guardar integrantes.';
				text='<p  style="text-align:justify"><span>Al registrar integrantes, activa diversos '+ 
				'campos que el usuario debe llenar en su totalidad; si deja alguno en blanco o vac&iacute;o, '+ 
				'tendr&aacute; problemas al guardar y se le mostrar&aacute; el siguiente mensaje: "SI AGREGA A UN '+ 
				'INTEGRANTE DEL CONSEJO, DEBER&Aacute; SELECCIONARLO ANTES DE CONTINUAR", por lo que '+ 
				'deber&aacute; revisar que todas las celdas contengan informaci&oacute;n, o en su defecto, '+ 
				'proceda a eliminar los datos no necesarios mediante el bot&oacute;n: "Eliminar integrante".</span></p> '+ 
				'<p  style="text-align:justify"><span>Si persiste la inconsistencia, en este u otro caso, le pedimos '+ 
				'de favor se comunique a nuestra Mesa de Ayuda a los tel&eacute;fonos: 01 55 3601 7599, 01 800 '+ 
				'288 66 88 y 01 55 36 01 10 00 ext. 55777 o al correo electr&oacute;nico <a '+ 
				'href="mailto:sacv@sep.gob.mx">sacv@sep.gob.mx</a>. '+ 
				'Para mejorar nuestro servicio de atenci&oacute;n, en tiempo y forma, se recomienda '+ 
				'insertar im&aacute;genes en su reporte con la finalidad de analizar el comportamiento del '+ 
				'Sistema, el navegador y la versi&oacute;n que utiliza para acceder al REPUCE. Entre m&aacute;s informaci&oacute;n nos '+ 
				'proporcione, el tiempo de resoluci&oacute;n ser&aacute; menor. </span></p> '+ 
				'<p  style="text-align:justify"><span>En todo momento, usted recibir&aacute; un n&uacute;mero (ticket) con el que '+ 
				'podr&aacute; dar seguimiento a su reporte hasta que este sea resuelto.</span></p>';
			break;
			case 8:
				titulo='No puedo escribir en los campos o celdas de captura.';
				text='<p  style="text-align:justify"><span>Sera necesario dar doble clic en la celda o campo donde desea '+ 
				'ingresar informaci&oacute;n. Un ejemplo de esto lo puede encontrar en la <span '+ 
				'style="color:red"><a '+ 
				'href="http://www.repuce.sep.gob.mx/REPUCE/static/documentos/manual.pdf">P&aacute;gina '+ 
				'24</a></span> de su Manual de Usuario.</span></p>';
			break;
			case 9:
				titulo='Deseo modificar informaci&oacute;n capturada.';
				text='<p  style="text-align:justify"><span>Si un dato capturado fuera incorrecto, deber&aacute; dar clic en el &iacute;cono '+ 
				'del l&aacute;piz para actualizar o modificar la informaci&oacute;n de la sesi&oacute;n o asamblea. Un '+ 
				'ejemplo de esto lo puede encontrar en la <span style="color:red"><a '+ 
				'href="http://www.repuce.sep.gob.mx/REPUCE/static/documentos/manual.pdf">P&aacute;gina '+ 
				'21</a></span> de su Manual de Usuario.</span></p>';
			break;
			case 10:
				titulo='Cache, cookies o historial de navegaci&oacute;n.';
				text='<p  style="text-align:justify"><span>Todos los navegadores operan de manera difernte y muchos de ellos '+ 
				'guardan elementos de navegaci&oacute;n de las p&aacute;ginas a las que se accede, en lo que '+ 
				'se denomina com&uacute;nmente como memoria cache o cookies; el REPUCE se actualiza '+ 
				'constantemente, por lo tanto existen continuamente versiones nuevas, por ello '+ 
				'se recomienda realizar la eliminaci&oacute;n del historial de navegaci&oacute;n. Consulte la '+ 
				'documentaci&oacute;n del navegador que utiliza para limpiar los archivos temporales.</span></p>';
			break;
			case 11:
				titulo='No todas las escuelas cuentan con correo electr&oacute;nico.';
				text='<p  style="text-align:justify"><span>En caso de que su escuela no cuente con un correo electr&oacute;nico '+ 
				'registrado, deber&aacute; comunicarse con la Mesa de Ayuda o a las oficinas del '+ 
				'Consejo Nacional de Participaci&oacute;n Social en la Educaci&oacute;n (CONAPASE), donde le '+ 
				'brindar&aacute;n asesor&iacute;a para generar una cuenta de correo electr&oacute;nico.</span></p>';
			break;
			case 12:
				titulo='¿Qu&eacute; sucede si los campos obligatorios no se llenan?.';
				text='<p  style="text-align:justify"><span>En caso de que no registre informaci&oacute;n clasificada como obligatoria, '+ 
				'el Sistema le notificar&aacute; con un triangulo de alerta a un costado del dato '+ 
				'faltante, que el campo se halla vac&iacute;o, por lo que el Sistema no le permitir&aacute; continuar con la captura. Un ejemplo de '+ 
				'esto lo puede encontrar en la <span style="color:red"><a '+ 
				'href="http://www.repuce.sep.gob.mx/REPUCE/static/documentos/manual.pdf">P&aacute;gina 15</a></span> '+ 
				'de su Manual de Usuario.</span></p>';
			break;
			case 13:
				titulo='Datos no modificables para Mesa de Servicios.';
				text='<p  style="text-align:justify"><span>La Mesa de Servicios tiene la facultad de '+ 
				'modificar cierta informaci&oacute;n del Sistema, sin embargo, existen datos como el sector, la zona y el nombre '+ 
				'de la escuela que no es posible sean modificados a trav&eacute;s de nuestra Mesa, si '+ 
				'requiere corregir esta informaci&oacute;n, deber&aacute; notificarlo a su zona escolar, &aacute;rea '+ 
				'de planeaci&oacute;n y por &uacute;ltimo a las oficinas del Consejo Nacional de Participaci&oacute;n '+ 
				'Social en la Educaci&oacute;n (CONAPASE).</span></p>';
			break;
			case 14:
				titulo='¿Qu&eacute; sucede cuando se da de baja un Consejo Escolar?.';
				text='<p  style="text-align:justify"><span>Al dar de baja un Consejo Escolar, se borra toda la informaci&oacute;n de '+ 
				'las sesiones y asambleas contenida en el REPUCE, por lo tanto no se podr&aacute; '+ 
				'recuperar ni tener acceso a dichos datos; si lo requiere, deber&aacute; dar de '+ 
				'alta nuevamente su Consejo Escolar, el cual tendr&aacute; un estatus de nuevo.</span></p> ';
			break;
			case 15:
				titulo='El sistema no imprime mi acta o minuta despu&eacute;s de guardar mi informaci&oacute;n.';
				text='<p  style="text-align:justify"><span>Al guardar el acta el sistema presenta la pantalla principal, se debe dar '+ 
				'clic en el &iacute;cono en forma de impresora correspondiente para mostrar el acta o minuta -a diferencia de la plataforma anterior, '+ 
				'donde al dar clic en el bot&oacute;n “Guardar” nos desplegaba de forma inmediata el acta o minuta correspondiente-. Un ejemplo lo '+ 
				'puede ubicar en la <a '+ 
				'href="http://www.repuce.sep.gob.mx/REPUCE/static/documentos/manual.pdf">P&aacute;gina 17</a> del manual de usuario.</span></p> ';
			break;
			case 16:
				titulo='';
				text='';
			break;
			case 17:
				titulo='';
				text='';
			break;
			case 18:
				titulo='';
				text='';
			break;
			
			}
	        
			var dialog = new Dialog({
			    title: titulo,
			    content: text,
			    style: "width: 600px"
			});
			
			dialog.show();
		}
	});
</script>
</head>

<body class="tundra">
<div id="wrapp">
<div><img src="../../static/img/banner.jpg" width="918" height="74" alt="logo" /></div>
<div id="menu">
<ul>
<li><a href="#">¿Dudas?</a></li>
<li><a href="#" onclick="regresar()">Regresar</a></li>
<!-- <li><a href="#">Videos de ayuda</a></li> -->
<!-- <li><a href="#">Gu&iacute;as y manuales de usuario</a></li> -->
<!-- <li><a href="#">Asesor&iacute;a</a></li> -->
</ul>
</div>
<div id="cont">
<div class="arrowlistmenu">

<h3 class="menuheader expandable"><img src="../../static/img/faq/6.png" width="63" height="63" alt="problemas para ingresar" />Problemas para ingresar al Registro P&uacute;blico de Consejos Escolares</h3>
<ul class="categoryitems">
<li><a href="#" onclick="getCont(1)"> El Sistema no se encuentra disponible.</a></li>
<li><a href="#" onclick="getCont(2)"> No permite ingresar al Registro P&uacute;blico de Consejos Escolares (REPUCE).</a></li>
<li><a href="#" onclick="getCont(3)"> Mi centro es de nueva creaci&oacute;n y no puedo ingresar al Registro P&uacute;blico de Consejos Escolares (REPUCE).</a></li>
</ul>

<h3 class="menuheader expandable"><img src="../../static/img/faq/5.png" width="63" height="63" alt="Problemas al registrar" />Problemas al registrar sesiones o asambleas</h3>
<ul class="categoryitems">
<li><a href="#" onclick="getCont(4)">No se muestran los botones de guardar y cerrar.</a></li>
<li><a href="#" onclick="getCont(5)">Al dar clic en el bot&oacute;n "Guardar", no aparece el acta.</a></li>
<li><a href="#" onclick="getCont(6)">Al dar clic en el bot&oacute;n "Guardar", no guarda cambios. </a></li>
<li><a href="#" onclick="getCont(7)">Tengo problemas al guardar.</a></li>
<li><a href="#" onclick="getCont(8)">No puedo escribir en los campos o celdas de captura.</a></li>
<li><a href="#" onclick="getCont(9)">Deseo modificar informaci&oacute;n capturada.</a></li>

</ul>

<h3 class="menuheader expandable"><img src="../../static/img/faq/2.png" width="63" height="63" alt="Problemas para imrpimir" />Problemas para imprimir las actas de mis sesiones o asambleas</h3>
<ul class="categoryitems">
<li><a href="#" onclick="getCont(15)">El sistema no imprime mi acta o minuta despu&eacute;s de guardar mi informaci&oacute;n.</a></li>
</ul>

<h3 class="menuheader expandable"><img src="../../static/img/faq/1.png" width="63" height="63" alt="Dudas normativas" />Dudas con respecto a los lineamientos de operaci&oacute;n del REPUCE</h3>
<ul class="categoryitems">
<li><a href="#" onclick="getCont(14)">¿Qu&eacute; sucede cuando se da de baja un Consejo Escolar?.</a></li>

</ul>


<h3 class="menuheader expandable"><img src="../../static/img/faq/4.png" width="63" height="63" alt="Dudas informacion de registro" />Dudas con respecto a la informaci&oacute;n que se registra en el REPUCE</h3>
<ul class="categoryitems">
<li><a href="#" onclick="getCont(11)">No todas las escuelas cuentan con correo electr&oacute;nico.</a></li>
<li><a href="#" onclick="getCont(12)">¿Qu&eacute; sucede si los campos obligatorios no se llenan?.</a></li>
<li><a href="#" onclick="getCont(13)">Datos no modificables para Mesa de Servicios.</a></li>
</ul>


<h3 class="menuheader expandable"><img src="../../static/img/faq/3.png" width="63" height="63" alt="Problemas con mi navegador" />Problemas con mi navegador</h3>
<ul class="categoryitems">
<li><a href="#" onclick="getCont(10)">Cache, cookies o historial de navegaci&oacute;n.</a></li>
</ul>
</div>

<p>&nbsp;</p>

</div>

</div>

</body>
</html>
