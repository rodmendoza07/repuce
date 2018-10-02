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

public class SegundaSesionControllerTests extends BaseControllerTests{

	/*
	 * CCT de Prueba
		70	01DJN0033X
		71	01DJN0034W
		72	01DJN0035V
		73	01DJN0036U
		74	01DJN0037T
		75	01DJN0038S
		76	01DJN0040G
		77	01DJN0041F
		78	01DJN0042E
		79	01DJN0044C
	 */
	
	@Test
	public void saveSegundaSesionTest() throws Exception {
		String bodyStr = "{\"ceInfGral\":{\"cCct\":71}, " +
				"	\"ceSesion\":{\"fchSesion\":\"2012-01-01T05:00:00.000Z\",  " +
                "       \"horaIniSesion\":\"10:00\", " +
                "       \"horaFinSesion\":\"12:00\", " +
                "       \"numIntegrantes\":10, " +
                "       \"observaciones\":\"PRUEBA\", " +
                "       \"fchRegistro\":\"2012-01-02T05:00:00.000Z\"}, " +
                "    \"actividades\":[{\"cActividad\":32}], " +
                "    \"metas\":[{\"numGrado\":31, " +
                "                       \"numMateria\":1, " +
                "                       \"puntosCct\":300, " +
                "                       \"pctInsuf\":20, " +
                "                       \"pctElem\":20, " +
                "                       \"pctBueno\":20, " +
                "                       \"pctExcel\":40 " +
                "                       }], " +
                "     \"compromisos\":[{\"cCompEnlace\":1}, " +
                "       {\"cCompEnlace\":4, " +
                "       \"nomOtroComp\":\"OTRO COMP\"}]}";	
		mockMvc.perform(post("/segundaSesion/saveSegundaSesion")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk());	
	}

	@Test
	public void deleteSegundaSesionTest() throws Exception {
		mockMvc.perform(get("/segundaSesion/delete/71").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}
	
	@Test
	@SuppressWarnings("unchecked")
	public void selectSegundaSesionTest() throws Exception {
		mockMvc.perform(get("/segundaSesion/select/72").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.metas").value(collectionWithSize(equalTo(1))))
				.andExpect(jsonPath("$.resultadosEnlace").value(collectionWithSize(equalTo(32))))
				.andExpect(jsonPath("$.hMetas").value(collectionWithSize(equalTo(9))));	
	}
	
	@Test
	@SuppressWarnings("unchecked")
	public void selectResultadosEnlaceTest() throws Exception {
		mockMvc.perform(get("/segundaSesion/selectResultadosEnlace/72").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.").value(collectionWithSize(equalTo(32))));	
	}
	
	


}