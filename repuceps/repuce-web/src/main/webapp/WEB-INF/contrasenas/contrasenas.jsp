<body>
	<form dojoType="dijit.form.Form" jsId="registraContrasena" name="registraContrasena" id="registraContrasena" 
			action='' method="post">
        <table width="950px" border="0" align="center">
            <tr>
                <td>
                    <div align="center" class="titulos">REGENERACI�N DE CONTRASE�A</div>
                    
                    <div align="lefth" class="sub">Informaci�n del CCT</div>
                    
                    <div align="lefth" class="infoCct" id="infCct_Cont">
                        <span style="color:black; ">*</span>CCT: <input id="cve_cct_Cont" /> <button id="progContButtonNode"></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                        
                    </div> <br>
                    
                    <table width="950px" border="0" align="center" class="infoCct" >

                        <tr>
                            <td>
                                CCT: <span id="cveCct_Cont" class="datosCct"/>
                            </td>
                            <td>
                                Nombre del Centro Escolar: <span id="nomCct_Cont" class="datosCct"/>
                            </td>
                            
                            <td>
                               Nivel: <span id="nomNivel_Cont" class="datosCct"/>
                            </td>
                            
                        </tr>
                        <tr>
                            <td>
                                Director: <span id="nomDirector_Cont" class="datosCct"/>
                            </td>                                                
                            <td>
                                Tel�fono: <span id="telCct_Cont" class="datosCct"/>
                            </td>
                            <td>
                                Correo Electr�nico: <span id="mailCct_Cont" class="datosCct"/>
                            </td>                            
                        </tr>
                        <tr>
                             <td>
                                Calle y N�mero: <span id="domicilio_Cont" class="datosCct"/>
                            </td>
                            <td>
                                Localidad: <span id="nomLocalidad_Cont" class="datosCct"/>
                            </td>
                            <td>
                                 Municipio: <span id="nomMunicipio_Cont" class="datosCct"/>
                            </td>
                        </tr> 
                        <tr>
                            <td>
                                Entidad Federativa: <span id="nomEntidadfed_Cont" class="datosCct"/>
                            </td>
                        </tr>

                    </table><br>
                
                    <div align="lefth" class="sub">Regenerar</div>
                    <table width="950px" border="0" align="center" class="infoCct" >
                       <tr>
                            <td>
                               Acci�n:
                            </td>
                            <td>
                               <input type="radio" name="regenera" id="radioReg1" value="1"/> Regenerar autom�ticamente
                            </td>                            
                        </tr>
                         <tr>
                            <td></td>
                            <td>
                                <input type="radio" name="regenera" id="radioReg2" value="2"/> Regenerar manualmente
                            </td>                            
                        </tr>
                       <tr>
                            <td>
                               <span style="color:black; ">*</span>Nueva contrase�a:
                            </td>
                            <td>
                                <input type="hidden" id="v_cveCct">
                                <input id="nContasena" />
                            </td>
                        </tr>
                       <tr>
                            <td>
                               <span style="color:black; ">*</span>Confirmar contrase�a:
                            </td>
                                                        <td>
                                <input id="rnContasena" />
                            </td>
                            
                        </tr>
                        <tr>
                            <td>
                              <span id="obligatorio"></span>Correo Electr�nico del CCT:
                            </td>
                                                        <td>
                                <input id="v_mailCct" />
                            </td>
                            
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button id="regContButtonNode"></button>
                            </td>                            
                        </tr>
                        <tr>
                            <td colspan="2" >
                               <span style="color:black; ">*</span> Los campos se�alados con asterisco son obligatorios.
                            </td>
                            
                        </tr>
                    </table><br>
                </td>
            </tr>
        </table>
	</form>
        
</body>
    

