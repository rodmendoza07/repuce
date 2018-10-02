<body>

	<style>
		.tabForm{
			border: 1px solid #a2a2a2;
		}
		.tdPreg, .tdDat{
			border-bottom: 1px solid #a2a2a2;
		}
		.tdPreg{
			text-align:left;
			padding-left: 10px;
			
			background-color: #f8f8f8;
			
			box-sizing: border-box;
		}
		
		.tdDat{
			text-align:right;
			padding-right: 10px;
			background-color: #f2f2f2;
			
			box-sizing: border-box;
		}
		
		.td01, .td02, .td03, .td04{
			width: 25%;
		}
		
		.ahL{text-align: left;}
		.ahR{text-align: right;}
		.ahC{text-align: center;}
		.avM{vertical-align:middle;}
		.avB{vertical-align:bottom;}
		.avT{vertical-align:top;}
		.lK{font-style:italic;}
		
		.N{font-weight: bold;}
		
		.trTit td{
			text-align: left;
			padding-left: 10px;
			
			background-color: #fafafa;
			
			box-sizing: border-box;
		}
		
		.trDat_01 td, .trDat td{
			background-color: #f2f2f2;
			text-align: left;
			padding-left: 20px;
			
			box-sizing: border-box;
		}
		
		.trDat td{
			border-bottom: 1px solid #a2a2a2;
		}
		
		
		#botonAceptarCancelarZZ, .dvSep{
			position: relative;
			width:100%;
			
			margin: auto;
		} 
		
		#botonAceptarCancelarZZ{
			background-color: #f8f8f8;
			text-align: center;
		}
		
		#dv_inf{
			position: relative;
			margin:auto;
			background-color: #f3ffac;
			border: 1px solid #520101;
			text-align: left;
			padding: 5px;
			
			border-radius: 5px;
			width:99%;
			font-style:italic;
			font-size:10px;
			
			box-sizing: border-box;
		}
		
		.dvSep{
			height: 5px;
			line-height: 5px;
		}
		
		.spSigno{color:#ff0000;}
		
		.spSigPes{
			color:#181818;
			padding:0 1px;
			background-color: #FFFAC6;
		}
		
		
	</style>
	
	<div id="dvContenedor" width="800px">

		<table width="100%" border="0" align="center" class="tabForm">
			<tr>
				<td class="td01"></td>
				<td class="td02"></td>
				<td class="td03"></td>
				<td class="td04"></td>
			</tr>
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿Cu&aacute;ntos alumnos hay en la escuela?
		    </td>
		    <td class="tdDat" colspan="2">
				<input id="z_alumn_esc" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿Cu&aacute;ntos alumnos reciben el servicio de alimentaci&oacute;n en la Escuela?
		      	&nbsp;
		    </td>
		    <td class="tdDat" colspan="2">
		      	<input id="z_alumn_serv_alim" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿Cu&aacute;ntos d&iacute;as del ciclo escolar se programaron para que los alumnos reciban el servicio de alimentaci&oacute;n ?
		    </td>
		    <td class="tdDat" colspan="2">
		        <input id="z_dias_serv_alim" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿Cu&aacute;l es el costo diario del Servicio de Alimentaci&oacute;n por alumno?
		    </td>
		    <td class="tdDat" colspan="2">
		        <span class="spSigPes">$</span><input size="6" id="z_costo_serv_alim_dia" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿La escuela cuenta con normatividad para la organizaci&oacute;n y funcionamiento del Servicio de Alimentaci&oacute;n?
		    </td>
		    <td class="tdDat" colspan="2">
		        SI
		        <input  id="z_tiene_norm_serv_alim_SI" />
		        &nbsp;&nbsp;
		        NO
		        <input  id="z_tiene_norm_serv_alim_NO" />
		    </td>
		  </tr>
		  
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	En caso de que su respuesta sea afirmativa, indica el(los) documento(s) que se utiliza(n):
		    </td>
		    <td class="tdDat" colspan="2">
		        <input id="z_docs_serv_alim" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿Los padres de familia aportan recursos econ&oacute;micos para la alimentaci&oacute;n de los alumnos?
		    </td>
		    <td class="tdDat" colspan="2">
		    	SI
		        <input id="z_padres_apor_rec_eco_alum_SI" />
		        &nbsp;&nbsp;
		        NO
		        <input id="z_padres_apor_rec_eco_alum_NO" />
		    </td>
		  </tr>
		  
		  <tr class="trTit">
		    <td colspan="4" colspan="2">
		      	¿Con que frecuencia recibe la escuela el recurso econ&oacute;mico para el Servicio de Alimentaci&oacute;n?
		    </td>
		  </tr>
		  <tr class="trDat_01">
		  	<td class="ahL">
		    	<input id="z_frec_esc_rec_serv_alim_SEMA" />
		      	semanal
		    </td>
		    <td class="ahC">
		        <input id="z_frec_esc_rec_serv_alim_MENS" />
		        mensual
		    </td>
		    <td class="ahC">
		        <input id="z_frec_esc_rec_serv_alim_SEME" />
		        semestral
			</td>
		    <td class="ahR">
		        <input id="z_frec_esc_rec_serv_alim_ANUA" />
		        anual
			</td>
		  </tr>
		  <tr class="trDat">
		  	<td colspan="4" class="ahC">
		        <input id="z_frec_esc_rec_serv_alim_OTRO" />
		        otro
		    	&nbsp;&nbsp;&nbsp;&nbsp;
						<span id="spEspe5">
							especifique
							<input id="z_frec_esc_rec_serv_alim_otro_text" />
						</span>
		        
		    </td>
		  </tr>
		  
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿Los recursos para el Servicio de Alimentacion llegan a tiempo a la escuela?
		      	&nbsp;
		    </td>
		    <td class="tdDat" colspan="2">
		        SI
		        <input id="z_rec_serv_alim_atiempo_SI" />
		        &nbsp;&nbsp;
		        NO
		        <input id="z_rec_serv_alim_atiempo_NO" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿Se conform&oacute; el Comit&eacute; de Alimentaci&oacute;n?
		    </td>
		    <td class="tdDat" colspan="2">
		        SI
		        <input id="z_conf_comite_alim_SI" />
		        &nbsp;&nbsp;
		        NO
		        <input id="z_conf_comite_alim_NO" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿El Comit&eacute; de Alimentaci&oacute;n recibi&oacute; capacitaci&oacute;n para el manejo de alimentos?
		      	&nbsp;
		    </td>
		    <td class="tdDat" colspan="2">
		        SI
		        <input id="z_comite_alim_capac_SI" />
		        &nbsp;&nbsp;
		        NO
		        <input id="z_comite_alim_capac_NO" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿La escuela cuenta con Coordinador de Alimentaci&oacute;n?
		    </td>
		    <td class="tdDat" colspan="2">
		        SI
		        <input id="z_coord_alim_SI" />
		        &nbsp;&nbsp;
		        NO
		        <input id="z_coord_alim_NO" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	En caso de NO contar con Coordinador de Alimentaci&oacute;n ¿qui&eacute;n asume estas funciones?
		    </td>
		    <td class="tdDat" colspan="2">
		        <input id="z_quien_coord_alim" />
		    </td>
		  </tr>
		
		  <tr>
		    <td class="tdPreg" colspan="2">
		      	¿Los alimentos que los alumnos consumen en la hora de la comida, son preparados dentro de la escuela?
		    </td>
		    <td class="tdDat" colspan="2">
		        SI
		        <input id="z_alim_en_esc_SI" />
		        &nbsp;&nbsp;
		        NO
		        <input id="z_alim_en_esc_NO" />
		    </td>
		  </tr>
		
		  <tr class="trTit">
		    <td colspan="4">
		      	¿La escuela cuenta con cocina?
		    </td>
		  </tr>
		  <tr class="trDat">
		    <td colspan="4">
		        <input id="z_esc_cocina_EXP" />
		        Construida Exprofeso
		        &nbsp;&nbsp;&nbsp;&nbsp;
		    
		        <input id="z_esc_cocina_ADA" />
		        Adaptada
		    	&nbsp;&nbsp;&nbsp;&nbsp;
		    
		    	<input id="z_esc_cocina_SIN" />
		        No cuenta con cocina
		    </td>
		  </tr>
		
		  <tr class="trTit">
		    <td colspan="4">
		      	La cocina se ubica:
		    </td>
		  </tr>
		  <tr class="trDat">
		    <td colspan="4">
		        <input id="z_cocina_ubic_EXT" />
		        Externa a la escuela
		        &nbsp;&nbsp;&nbsp;&nbsp;
		        
		    	<input id="z_cocina_ubic_INT" />
		        Interna a la escuela
		    </td>
		  </tr>
		
		  <tr class="trTit">
		    <td colspan="4">
		    	¿La escuela cuenta con comedor?
		    </td>
		  </tr>
		  <tr class="trDat">
		    <td colspan="4">
				<input id="z_esc_comedor_EXP" />
				Construido Exprofeso
				&nbsp;&nbsp;&nbsp;&nbsp;
				
				<input id="z_esc_comedor_ADA" />
				Adaptado
				&nbsp;&nbsp;&nbsp;&nbsp;
				
				<input id="z_esc_comedor_SIN" />
				No cuenta con comedor
		    </td>
		  </tr>
		
		  <tr class="trTit">
		    <td colspan="4">
		      	El comedor se ubica:
		    </td>
		  </tr>
		  <tr class="trDat">
		    <td colspan="4">
		        <input id="z_comedor_ubic_EXT" />
		        Externo a la escuela
		        &nbsp;&nbsp;&nbsp;&nbsp;
		    
		    	<input id="z_comedor_ubic_INT" />
		        Interno a la escuela
		    </td>
		  </tr>
		
		</table>
		
		<div class="dvSep">&nbsp;</div>
		
		<div id="botonAceptarCancelarZZ"></div>
		
		<div class="dvSep">&nbsp;</div>
		
		<div id="dv_inf">
		  	<span class="N">
		    	<span class="spSigno">"</span>Articulo 2o.- T&iacute;tulo I, Cap&iacute;tulo &Uacute;nico, del Acuerdo n&uacute;mero 716 por el que se establecen los lineamientos para la constituci&oacute;n, organizaci&oacute; y funcionamiento de los consejos de participaci&oacute;n social en la educaci&oacute;n,
		  	</span>
		  	&nbsp;
		    Los Consejos son instancias de participaci&oacute; social en la educaci&oacute;n, de consulta, orientaci&oacute;n, colaboraci&oacute;n, apoyo e informaci&oacute;n, seg&uacute;n corresponda, con el prop&oacute;sito de participar en actividades tendientes a fortalecer, ampliar la cobertura y elevar la calidad y la equidad en la educaci&oacute;n b&aacute;sica<span class="spSigno">"</span>.
		</div>
	
	</div>
</body>