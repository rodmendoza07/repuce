<body>
	<div id ="cntnt">
		<div id="infGralPane" >
			<form dojoType="dijit.form.Form" jsId="registraActaReunion"
					name="registraActaReunion" id="registraActaReunion"
					action='' method="post">
					<table width="750px" border="0" align="left" >
						<tr>
							<td>
								<div id='dSesionTP'>
									<table border="0" id='dSesion'>
										<tr>
											<td width="230px">* Fecha de realización de la reunión:</td>
											<td colspan="3"><input id="fchRegistro"/></td>
										</tr>
										<tr>
											<td width="230px">* Hora inicial:</td>
											<td><input id="horaInicio" /></td>
											<td width="230px"  align="right">* Hora final:</td>
											<td><input id="horaFinal"/></td>      
										</tr>
										<tr id="idTipoOperacion">
											<td> * Tipo de Operación</td>
											<td colspan="3"><input id="tpoRegistro"/></td>
										</tr>
										<tr>
											<td width="230px">Observaciones:</td>
											<td colspan="3"><input id="observaciones" /></td>
										</tr>
									</table>
						 		</div>
							</td>
						</tr>
						<tr id='filaParaSecciones' style="display:none">
							<td>
				        		<div id="seccionParaRegistros">
				        			<div id="cntSeccion">
				        				<div id="listSecciones"></div>
				        			</div>
				        		</div>
			        		</td>
						</tr>
						<tr>
							<td>
								<div id='dPestaniasTP'>
									<div id= "pestanias"></div>
								</div>
							</td>
						</tr>  
						<tr>
							<td>
								<div id="botones"></div>
							</td>
						</tr>
						<tr>
							<td>
								<p>* Los campos se&ntilde;alados con asterisco son obligatorios. </p>                                
							</td>
						</tr>
					</table>
			</form>
		</div>
	</div>
</body>