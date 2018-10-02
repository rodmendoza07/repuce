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

public class PrimeraSesionControllerTests extends BaseControllerTests{

	
	/*
	 *  CCT de prueba  
		60	01DJN0022R
		61	01DJN0024P savePrimeraSesionTest
		62	01DJN0025O
		63	01DJN0026N
		64	01DJN0027M
		65	01DJN0028L
		66	01DJN0029K
		67	01DJN0030Z
		68	01DJN0031Z
		69	01DJN0032Y
	 */
	
	@Test
	@SuppressWarnings("unchecked")
	public void selectPrimeraSesionTest() throws Exception {
		
		mockMvc.perform(get("/primeraSesion/select/60").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.comites").value(collectionWithSize(equalTo(5))))
				.andExpect(jsonPath("$.programas").value(collectionWithSize(equalTo(8))))
				.andExpect(jsonPath("$.recursos").value(collectionWithSize(equalTo(3))));
	}
	
	@Test
	public void savePrimeraSesionTest() throws Exception {
		String bodyStr = "{\"ceInfGral\":{\"cCct\":61}, " +
			"		\"ceSesion\":{\"fchSesion\":\"2012-11-09T06:00:00.000Z\", " +
			"		\"horaIniSesion\":\"10:21\", " +
			"		\"horaFinSesion\":\"10:22\", " +
			"		\"numIntegrantes\":\"1\", " +
			"		\"observaciones\":\"sadasdasdassdsdasdasd\"}, " +
			"	\"actividades\":[ " +
			"		{\"cActividad\":21}, " +
			"		{\"cActividad\":22}, " +
			"		{\"cActividad\":23}, " +
			"		{\"cActividad\":24}, " +
			"		{\"cActividad\":25}], " +
			"	\"programas\":[ " +
			"		{\"cPrograma\":1}, " +
			"		{\"cPrograma\":18}, " +
			"		{\"cPrograma\":21}, " +
			"		{\"cPrograma\":34, \"nomOtroPrograma\":\"prueba\"}, " +
			"		{\"cPrograma\":41}, " +
			"		{\"cPrograma\":45, \"nomOtroPrograma\":\"prueba\"}, " +
			"		{\"cPrograma\":52}, " +
			"		{\"cPrograma\":54, \"nomOtroPrograma\":\"prueba\"}], " +
			"	\"recursos\":[ " +
			"		{\"cRecurso\":0, \"monto\":\"1000\", \"montoStr\":\"mil pesos\", \"especie\":\"cdscdscs\"}, " +
			"		{\"cRecurso\":1, \"monto\":\"2342342\", \"montoStr\":\"ewqewqeqwe\"}, " +
			"		{\"cRecurso\":3, \"indRecurso\":1}], " +
			"	\"integrantesComites\":[ " +
			"		{\"cscIntegrante\":1,"+
			"			\"esMiembroCE\":true,"+
			"			\"comites\":[1,5]},"+
			"		{\"cscIntegrante\":1,"+
			"			\"paternoIntegrante\":\"XASXASXAS\"," +
			"			\"maternoIntegrante\":\"\","+
			"			\"nombreIntegrante\":\"ASXASXASX\"," +
			"			\"esMiembroCE\":false,"+
			"			\"comites\":[1]},"+
			"		{\"cscIntegrante\":2,"+
			"			\"esMiembroCE\":true,"+
			"			\"comites\":[3]},  "+
			"		{\"cscIntegrante\":6,"+
			"			\"esMiembroCE\":true,"+
			"			\"comites\":[2]},  "+
			"		{\"cscIntegrante\":8,"+
			"			\"esMiembroCE\":true,"+
			"			\"comites\":[8]}  "+
			"		], " +
			"	\"planeacion\":{\"indPlaneacion\":1, " +
			"		\"cPlaneacion\":2, " +
			"		\"indParticipacion\":1, " +
			"		\"actividades\":\"cdscsdcsdcsdcs\"}}";

	mockMvc.perform(post("/primeraSesion/savePrimeraSesion")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk());	
	}
	
	@Test
	public void deleteSegundaSesionTest() throws Exception {
		mockMvc.perform(get("/primeraSesion/delete/62").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}
	


}