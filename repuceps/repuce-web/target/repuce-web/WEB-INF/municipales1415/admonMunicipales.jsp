<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<body>
<div id="actasMunicipalesDiv">
 <table width="750px" border="0" align="center" >
	<tr>
		<div align="center" class="titulos"></div>
		<td id="colForm">
			<form id="cargaForm">
				<fieldset>
					<legend>Selecci&oacute;n de Entidad</legend>
					Selecci&oacute;n <div id="listaEntidad" ></div>
					<input id="resetForm" />
					<input id="submitCarga" />
					
				</fieldset>
			</form>
		</td>
	</tr>
	<tr><td>&nbsp;</td></tr>				
	<tr>
		<td>
        	<div align="centerh" class="sub">Actas municipales registradas</div>
		</td>
	</tr>	
	<tr height="400px" >
		<td width="100%">
			<div  id='listActasMunGrid'></div>
		</td>
	</tr>
	<tr>
		<td>
        	<div id="editarRow"></div>
		</td>
	</tr>	
</table>
</div>
</body>



