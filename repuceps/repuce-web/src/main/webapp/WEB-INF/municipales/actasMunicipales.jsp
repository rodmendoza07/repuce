<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<body>
<div id="actasMunicipalesDiv">
 <table width="750px" border="0" align="center" >
	<tr>
		<div align="center" class="titulos">Carga de actas municipales</div>
		<td id="colForm">
			<form id="cargaForm">
				<fieldset>
					<legend>Selecci&oacute;n de Archivos</legend>
					Selecci&oacute;n <div id="uploader" ></div>
					<input id="resetForm" />
					<input id="submitCarga" />
<!-- 					<input hidden="true"  id="submitValida" /> -->
					<input id="submitValida" />
					
				</fieldset>
			</form>
		</td>
	</tr>
	<tr><td>&nbsp;</td></tr>
	<tr>
		<td>
        	<div align="centerh" class="sub">Resultados de la carga</div>
		</td>
	</tr>	
	<tr>
		<td width="100%">
			<div  id='listResultadosGrid'></div>
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
        	<div id="removeRow"></div>
		</td>
	</tr>	
</table>
</div>
</body>



