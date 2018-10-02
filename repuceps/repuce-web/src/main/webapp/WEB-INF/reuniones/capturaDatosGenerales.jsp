<body>


    <div id ="cntnt"> 
	    <div id="infGralPane" >
	    <form dojoType="dijit.form.Form" jsId="registraPrimeraReunion" 
		name="registraPrimeraReunion" id="registraPrimeraReunion" 
			action='' method="post">
    
	        <table width="750px" border="0" align="left" >
	        <tr> 
	        	<td>
		        <div id='dSesionTP'>
		         <table border="0" id='dSesion'>      
			             <tr>
			               <td width="230px">    
			                  * Fecha de realización de la <span id='sesionoAsamblea'></span>:
			               </td>
			               <td> 
			               		<input id="fechaRegistro" />
			               </td>
			             </tr>
			             <tr>      
			                 <td width="230px">* Hora inicial:</td>
			                 <td>
			                 	<input id="horaInicio" />
			                 </td>
							 <td width="400px">
								<table>
									<tr>						 	
									 <td>
									 	* Hora final: 
									 </td>
									 <td>
									 	<input id="horaFinal" />
									 </td>               
									</tr>						 	
								</table>						 	
							 </td>
			             </tr> 
			             <tr>
			             	<td width="230px"> * N&uacute;mero de asistentes:</td><td><input id="numIntegrantes" /></td>
			             </tr> 
			             <tr>
			             	<td width="230px">Observaciones:</td>
			             	<td colspan="3"><input id="observaciones" /></td>
			             </tr>
		             </table>
		             </div>
		             </td>
	             </tr> 
	             <tr>
	             <td >
		             <div id='dActividadesTP'>
			             <div id='dActividades'>
			             	<div id= "cntActividades"></div>
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
	             <td >
	             	<div id="botones"></div>
	             </td>
	             </tr>  
	             <td>
		             <p>* Los campos se&ntilde;alados con asterisco son obligatorios. </p>                                
	             </td>
	             </tr>  
	          </table>
	            </form>
	     </div>
	       
      </div> 

</body>