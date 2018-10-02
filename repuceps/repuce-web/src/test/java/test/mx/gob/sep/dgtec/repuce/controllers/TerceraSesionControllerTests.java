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

public class TerceraSesionControllerTests extends BaseControllerTests{

	
	/*
	 *  CCT de prueba  
		90	01DJN0055I selectTerTest
		91	01DJN0056H saveSegundaAsambleaTest
	 */
	
	@Test
	@SuppressWarnings("unchecked")
	public void selectTerceraSesionTest() throws Exception {
		mockMvc.perform(get("/terceraSesion/select/90").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.programas").value(collectionWithSize(equalTo(8))))
				.andExpect(jsonPath("$.eventos").value(collectionWithSize(equalTo(3))))
				.andExpect(jsonPath("$.actividades").value(collectionWithSize(equalTo(3))));	
	}
	
	@Test
	public void saveTerceraSesionTest() throws Exception {
		String bodyStr = 
		"{\"ceInfGral\":{\"cCct\":91}, " +
		"	\"ceSesion\":{" +
		"		\"fchSesion\":\"2013-01-09T06:00:00.000Z\", \"horaIniSesion\":\"09:00\", " +
		"		\"horaFinSesion\":\"14:00\", \"numIntegrantes\":12, " +
		"		\"observaciones\":\"Esta es una prueba de la tercera sesion\", " +
		"		\"usrCaptura\":\"KOCOTL\"}, " +
		"	\"actividades\":[ " +
		"		{\"cActividad\":51}, " +
		"		{\"cActividad\":52}, " +
		"		{\"cActividad\":53}], " + 
		"	\"programas\":[ " +
		"		{\"cPrograma\":1, \"indRecurso\":\"1\", " +
		"			\"anioIngreso\":\"2012\", \"actividades\":\"Planeacion, Organizacion, Direccion y Control\", " +
		"			\"objetivo\":\"Tener alumnos mejor preparados\", \"monto\":30000, " +
		"			\"montoStr\":\"Treinta mil pesos 00/100 MN\"}, " + 
		"		{\"cPrograma\":4, \"indRecurso\":\"1\", " +
		"			\"anioIngreso\":\"2012\", \"actividades\":\"Planeacion, Organizacion, Direccion y Control\", " +
		"			\"objetivo\":\"Mejorar el rendimiento de los alumnos\", \"monto\":30000, " +
		"			\"montoStr\":\"Treinta mil pesos 00/100 MN\"}, " +
		"		{\"cPrograma\":12, \"indRecurso\":\"1\", " +
		"			\"anioIngreso\":\"2012\", \"actividades\":\"Planeacion, Organizacion, Direccion y Control\", " +
		"			\"objetivo\":\"Que los alumnos que tienen problemas en su vista tengan lentes.\", \"monto\":20000, " +
		"			\"montoStr\":\"Veinte mil pesos 00/100 MN\"}, " + 
		"		{\"cPrograma\":20, \"indRecurso\":\"1\", \"anioIngreso\":\"2011\", \"actividades\":\"Planeacion, Organizacion, Direccion y Control\", " +
		"			\"objetivo\":\"Tener alumnos mejor preparados y que comprenda cada detalle de lo que estan leyendo\", " +
		"			\"monto\":5000, \"montoStr\":\"Cinco mil pesos 00/100 MN\"}, " +
		"		{\"cPrograma\":33, \"indRecurso\":\"1\", \"anioIngreso\":\"2011\", \"actividades\":\"Planeacion, Organizacion, Direccion y Control\", " +
		"			\"objetivo\":\"Que los alumnos tengan salud para un mejor aprendizaje\", \"monto\":8000, " +
		"			\"montoStr\":\"Ocho mil pesos 00/100 MN\"}, " +
		"		{\"cPrograma\":40, \"indRecurso\":\"1\", \"anioIngreso\":\"2012\", \"actividades\":\"Planeacion, Organizacion, Direccion y Control\", " +
		"			\"objetivo\":\"Estimular a los maestros y escuelas que obtengan mejor puntaje en las pruebas enlace\", " +
		"			\"monto\":50000, \"montoStr\":\"Cincuenta mil pesos 00/100 MN\"}, " +
		"		{\"cPrograma\":44, \"indRecurso\":\"1\", \"anioIngreso\":\"2012\", \"actividades\":\"Planeacion, Organizacion, Direccion y Control\", " +
		"			\"objetivo\":\"Que los alumnos aprendan otro idioma\", \"monto\":50000, \"montoStr\":\"Cincuenta mil pesos 00/100 MN\"}, " +
		"		{\"cPrograma\":50, \"indRecurso\":\"1\", \"anioIngreso\":\"2012\", \"actividades\":\"Planeacion, Organizacion, Direccion y Control\", " +
		"			\"objetivo\":\"Que los alumnos de bajos recursos obtengan becas para que no abandonen sus estudios\", " +
		"			\"monto\":25000, \"montoStr\":\"veinticinco mil pesos 00/100 MN\"}], " +
		"	\"eventos\":[ " +
		"		{\"cEvento\":1, \"indRecurso\":\"1\", \"periodoRealizado\":\"2012-2013\", " +
		"			\"actividades\":\"ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES\", " +
		"			\"objetivo\":\"OBJETIVO FUTBOL\"}, " +
		"		{\"cEvento\":2, \"indRecurso\":\"1\", \"periodoRealizado\":\"2011-2012\", " +
		"			\"actividades\":\"ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES\", " +
		"			\"objetivo\":\"OBJETIVO BASQUETBOL\"}, " +
		"		{\"cEvento\":17, \"nomOtroEvento\":\"YOGA\", \"indRecurso\":\"1\", \"periodoRealizado\":\"2012-2013\", " +
		"			\"actividades\":\"ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES\", " +
		"			\"objetivo\":\"OBJETIVO OTRO\"}], " + 
		"	\"seguimientoMunicipal\":{\"indConsejoMun\":\"2\", \"indSegEnlace\":\"1\", " +
		"		\"accionesSeg\":\"ACIONES\", \"indApoyo\":\"1\", \"desApoyo\":\"MUCHO APOYO MUNICIPAL\", \"indApoyoGestion\":\"1\", " +
		"		\"desApoyoGestion\":\"MUCHO APOYO MUNICIPAL EN LA GESTION\", \"institucionGestion\":\"INSTITUCION\", " +
		"		\"indConsejoEst\":\"1\", \"indApoyoProg\":\"1\"} " +
		"	} ";


	mockMvc.perform(post("/terceraSesion/saveTerceraSesion")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk());	
	}
	
	@Test
	public void deleteSegundaSesionTest() throws Exception {
		mockMvc.perform(get("/terceraSesion/delete/91").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}
	


}