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

public class TerceraAsambleaControllerTests extends BaseControllerTests{

	
	/*
	 *  CCT de prueba  
		90	01DJN0055I selectTerTest
		91	01DJN0056H saveSegundaAsambleaTest
	 */
	
	@Test
	@SuppressWarnings("unchecked")
	public void selectTerceraAsambleaTest() throws Exception {
		mockMvc.perform(get("/terceraAsamblea/select/120").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.actividades").value(collectionWithSize(equalTo(2))));	
	}
	
	@Test
	public void saveTerceraAsambleaTest() throws Exception {
		String bodyStr = 
		"{\"ceInfGral\":{\"cCct\":122}, " +
		"	\"ceSesion\":{" +
		"		\"fchSesion\":\"2013-01-09T06:00:00.000Z\", \"horaIniSesion\":\"09:00\", " +
		"		\"horaFinSesion\":\"14:00\", \"numIntegrantes\":12, " +
		"		\"observaciones\":\"Esta es una prueba de la tercera asamblea\", " +
		"		\"usrCaptura\":\"KOCOTL\"}, " +
		"	\"actividades\":[ " +
		"		{\"cActividad\":71}, " +
		"		{\"cActividad\":72}], " +
		"	\"asistentes\":[]" +
		"	} ";


	mockMvc.perform(post("/terceraAsamblea/saveTerceraAsamblea")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk());	
	}
	
	@Test
	public void deleteTerceraAsambleaTest() throws Exception {
		mockMvc.perform(get("/terceraAsamblea/delete/122").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}
	


}