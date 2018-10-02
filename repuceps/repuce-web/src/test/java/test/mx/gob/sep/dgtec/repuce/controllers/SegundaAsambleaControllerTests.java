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

public class SegundaAsambleaControllerTests extends BaseControllerTests{

	
	/*
	 *  CCT de prueba  
		80	01DJN0022R selectSegundaAsambleaTest
		81				saveSegundaAsambleaTest
		82				deleteSegundaSesionTest
	 */
	
	@Test
	@SuppressWarnings("unchecked")
	public void selectSegundaAsambleaTest() throws Exception {
		mockMvc.perform(get("/segundaAsamblea/select/80").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.metas").value(collectionWithSize(equalTo(1))))
				.andExpect(jsonPath("$.resultadosEnlace").value(collectionWithSize(equalTo(7))))
				.andExpect(jsonPath("$.mejoras").value(collectionWithSize(equalTo(2))))
				;	
		
	}
	
	@Test
	public void saveSegundaAsambleaTest() throws Exception {
		String bodyStr = 
			"	{\"ceInfGral\":{\"cCct\":81}, " +
			"		\"ceSesion\":{\"fchSesion\":\"2012-11-09T06:00:00.000Z\", " +
			"		\"horaIniSesion\":\"10:21\", " +
			"		\"horaFinSesion\":\"10:22\", " +
			"		\"numIntegrantes\":\"1\", " +
			"		\"observaciones\":\"sadasdasdassdsdasdasd\", " +
			"		\"fchRegistro\":\"2012-11-09T06:00:00.000Z\"}, " +
			"	\"mejoras\":[ " +
			"		{\"cMejoraCct\":9, \"metasObjetivos\":\"Las metas  los objetivos del nueve\", \"actividades\":\"Las actividades del nueve\"}, " +
			"		{\"cMejoraCct\":11, \"nomOtraMejora\":\"prueba\", \"metasObjetivos\":\"Las metas  los objetivos del once\", " +
			"			\"actividades\":\"Las actividades del once\"} " +
			"	  ], " +
			"	\"comites\":[ " +
			"		{\"cComite\":1, \"indProyAnualCom\":true}, " +
			"		{\"cComite\":5, \"indProyAnualCom\":false}, " +
			"		{\"cComite\":3, \"indProyAnualCom\":true}, " +
			"		{\"cComite\":2, \"indProyAnualCom\":false}, " +
			"		{\"cComite\":8, \"indProyAnualCom\":true}" +
			"	  ]," +
			"	\"asistentes\":[]" +
			"	}";

	mockMvc.perform(post("/segundaAsamblea/saveSegundaAsamblea")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk());	
	}
	
	@Test
	public void deleteSegundaSesionTest() throws Exception {
		mockMvc.perform(get("/primeraSesion/delete/82").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}
	


}