package test.mx.gob.sep.dgtec.repuce.controllers;

import static com.jayway.jsonassert.JsonAssert.collectionWithSize;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static test.mx.gob.sep.dgtec.repuce.controllers.SecurityRequestPostProcessors.userDeatilsService;

import org.junit.Test;
import org.springframework.http.MediaType;

public class CuartaSesionControllerTests extends BaseControllerTests{

	
	/*
	 *  CCT de prueba  
		100	01DJN0065P selectCuartaSesionTest
		101	01DJN0066O saveCuartaSesionTest
		102	01DJN0067N deleteCuartaSesion
	 */
	
	@Test
	@SuppressWarnings("unchecked")
	public void selectCuartaSesionTest() throws Exception {
		mockMvc.perform(get("/cuartaSesion/select/100").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.actividades").value(collectionWithSize(equalTo(6))))	
				.andExpect(jsonPath("$.programas").value(collectionWithSize(equalTo(8))))
				.andExpect(jsonPath("$.mejoras").value(collectionWithSize(equalTo(2))))
				.andExpect(jsonPath("$.recursos").value(collectionWithSize(equalTo(1))))
				.andExpect(jsonPath("$.eventos").value(collectionWithSize(equalTo(3))))
				.andExpect(jsonPath("$.comites").value(collectionWithSize(equalTo(5))));
	}
	
	@Test
	public void saveCuartaSesionTest() throws Exception {
		String bodyStr = 
		"{\"ceInfGral\":{\"cCct\":101}, " +
		"	\"ceSesion\":{" +
		"		\"fchSesion\":\"2013-01-09T06:00:00.000Z\", \"horaIniSesion\":\"09:00\", " +
		"		\"horaFinSesion\":\"14:00\", \"numIntegrantes\":12, " +
		"		\"observaciones\":\"Esta es una prueba de la cuarta sesion\", " +
		"		\"usrCaptura\":\"KOCOTL\"}, " +
		"	\"actividades\":[ " +
		"		{\"cActividad\":61}, " +
		"		{\"cActividad\":62}, " +
		"		{\"cActividad\":63}, " +
		"		{\"cActividad\":64}, " +
		"		{\"cActividad\":65}, " +
		"		{\"cActividad\":66}" +
		"	  ], " + 
		"	\"programas\":[ " +
		"		{\"cPrograma\":1, \"actividadesFin\":\"Las actividads modificadas\", " +
		"			\"objetivoFin\":\"Objetivos finales\",  " +
		"			\"cDiferencia\":1, \"montoFinal\":50000, " +
		"			\"montoFinalStr\":\"Cincuenta mil pesos\"}, " + 
		"		{\"cPrograma\":4, \"actividadesFin\":\"Las actividads modificadas\", " +
		"			\"objetivoFin\":\"Objetivos finales\",  " +
		"			\"cDiferencia\":7, \"montoFinal\":20000, " +
		"			\"montoFinalStr\":\"Dos mil pesos 00/100 MN\"}, " + 
		"		{\"cPrograma\":12, \"actividadesFin\":\"Las actividads modificadas\", " +
		"			\"objetivoFin\":\"Objetivos finales\",  " +
		"			\"cDiferencia\":8, \"montoFinal\":10000, " +
		"			\"montoFinalStr\":\"Diez mil pesos 00/100 MN\", " +
		"			\"otraDiferencia\":\"Nos lo quedamos\"}, " + 
		"		{\"cPrograma\":20, " +
		"			\"cDiferencia\":6, \"montoFinal\":6000, " +
		"			\"montoFinalStr\":\"Seis mil pesos 00/100 MN\", " +
		"			\"otraDiferencia\":\"Donativo sorpresa\"}, " + 
		"		{\"cPrograma\":33, " +
		"			\"cDiferencia\":6, \"montoFinal\":9000, " +
		"			\"montoFinalStr\":\"Nueve mil pesos 00/100 MN\", " +
		"			\"otraDiferencia\":\"Donativo sorpresa\"}, " + 
		"		{\"cPrograma\":40, \"actividadesFin\":\"Las actividads modificadas\", " +
		"			\"objetivoFin\":\"Objetivos finales\",  " +
		"			\"cDiferencia\":1, \"montoFinal\":60000, " +
		"			\"montoFinalStr\":\"Cincuenta mil pesos 00/100 MN\"}, " + 
		"		{\"cPrograma\":44, \"actividadesFin\":\"Las actividads modificadas\", " +
		"			\"objetivoFin\":\"Objetivos finales\",  " +
		"			\"cDiferencia\":1, \"montoFinal\":60000, " +
		"			\"montoFinalStr\":\"Sesenta mil pesos 00/100 MN\"}, " + 
		"		{\"cPrograma\":50, \"actividadesFin\":\"Las actividads modificadas\", " +
		"			\"objetivoFin\":\"Objetivos finales\",  " +
		"			\"cDiferencia\":1, \"montoFinal\":26000, " +
		"			\"montoFinalStr\":\"Veintiseis mil pesos 00/100 MN\"}" + 
		"	  ], " +
		"	\"mejoras\":[ " +
		"		{\"cMejoraCct\":9, \"indRecurso\":\"1\", \"periodoInicio\":\"2010-2011\", " +
		"			\"monto\":1000, \"montoStr\":\"Mil pesos\", " +
		"			\"objetivoFin\":\"Las metas  los objetivos del nueve\", " +
		"			\"actividadesFin\":\"Las actividades del nueve\"}, " +
		"		{\"cMejoraCct\":11, \"indRecurso\":\"1\", \"monto\":1000, " +
		"			\"periodoInicio\":\"2010-2012\", \"montoStr\":\"Mil pesos\", " +
		"			\"objetivoFin\":\"Las metas  los objetivos del once\", " +
		"			\"actividadesFin\":\"Las actividades del once\"} " +
		"	  ], " +
		"	\"recursos\":[ " +
		"		{\"cRecurso\":3, \"uso\":\"Contratacion de mano de obra\", " +
		"			\"monto\":1000, \"montoStr\":\"Mil pesos\", " +
		"			\"indTransparenta\":true }" +
		"	  ], " +
		"	\"eventos\":[ " +
		"		{\"cEvento\":1, \"indRecurso\":\"1\", \"monto\":1000, \"montoStr\":\"Mil pesos\", " +
		"			\"actividadesFin\":\"ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES\", " +
		"			\"objetivoFin\":\"OBJETIVO FUTBOL\"}, " +
		"		{\"cEvento\":2, \"indRecurso\":\"1\", \"monto\":2000, \"montoStr\":\"Dos mil pesos\", " +
		"			\"actividadesFin\":\"ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES\", " +
		"			\"objetivoFin\":\"OBJETIVO BASQUETBOL\"}, " +
		"		{\"cEvento\":17, \"indRecurso\":\"0\"} " +
		"	  ], " + 
		"	\"comites\":[ " +
		"		{\"cComite\":1, \"indCumplieronAct\":true, \"actividades\":\"creacion de la libreria\"}, " +
		"		{\"cComite\":5, \"indCumplieronAct\":false, \"actividades\":\"bailable\"}, " +
		"		{\"cComite\":3, \"indCumplieronAct\":true, \"actividades\":\"capacitacion de perosnal de proteccion\"}, " +
		"		{\"cComite\":2, \"indCumplieronAct\":false, \"actividades\":\"creacion de planos\"}, " +
		"		{\"cComite\":8, \"indCumplieronAct\":true, \"actividades\":\"creacion del centro de reciclado\"}" +
		"	  ]," +
		"	\"planeacion\":{\"indCumplioPlaneacion\":true}" +
		"	} ";


	mockMvc.perform(post("/cuartaSesion/saveCuartaSesion")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk());	
	}
	
	@Test
	public void deleteCuartaSesionTest() throws Exception {
		mockMvc.perform(get("/cuartaSesion/delete/102").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}
	


}