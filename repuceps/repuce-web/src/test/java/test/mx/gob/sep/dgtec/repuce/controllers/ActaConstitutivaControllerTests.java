package test.mx.gob.sep.dgtec.repuce.controllers;

import static com.jayway.jsonassert.JsonAssert.collectionWithSize;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static test.mx.gob.sep.dgtec.repuce.controllers.SecurityRequestPostProcessors.userDeatilsService;

import org.junit.Ignore;
import org.junit.Test;
import org.springframework.http.MediaType;

public class ActaConstitutivaControllerTests extends BaseControllerTests {

	/*
	 * APEC de Prueba 1 savePrimeraAsambleaNuevaCreacionTest 2
	 * savePrimeraAsambleaSinPresidente 3 savePrimeraAsambleaSinSecretario
	 */

	@Test
	@SuppressWarnings("unchecked")
	public void searchActaConstitutivaTest() throws Exception {

		mockMvc.perform(
				get("/actaConstitutiva/select/130").with(
						userDeatilsService("PI")).accept(
						MediaType.APPLICATION_JSON))
				.andExpect(
						jsonPath("$.integrantes").value(
								collectionWithSize(equalTo(2))));
	}

	// Escenarios a probar

	// 1. Registro de Consejo de nueva creación

	@Ignore
	@Test
	public void saveActaConstitutivaNuevaCreacionTest() throws Exception {

		String bodyStr =

		"{	\"apec\":{ "
				+ "\"tpoRegistro\":\"1\","
				+ "		\"idLocalidad\":191,"
				+ "		\"idMunicipio\":1,"
				+ "		\"idEntidadfed\":1}, "
				+ "		\"reunion\":{\"cApec\":1, "
				+ "		\"fchReunion\":\"2013-09-01T06:00:00.000Z\", "
				+ "		\"horaIni\":\"10:00\", \"horaFin\":\"12:00\", "
				+ "		\"observaciones\":\"acta constitutiva\", "
				+ "		\"usrCaptura\":\"01ENLACE\", "
				+ "		\"cadena\":\"dvcdsvchgsdvcgsdcgfsd\"},"

				+ "		\"integrantes\":[{\"cApec\":null,\"cReunion\":1,\"cApecIntegrante\":null,\"cIntegrante\":1,"
				+ "		\"integrante\":{\"cApec\":null,\"cIntegrante\":1,\"paternoIntegrante\":\"ISLAS\",\"maternoIntegrante\":\"MORENO\","
				+ "		\"nombreIntegrante\":\"JOSE\",\"genero\":\"M\",\"edad\":43,\"cNiveleduc\":6,\"cCargo\":4}},"

				+ "		{\"cApec\":null,\"cReunion\":1,\"cApecIntegrante\":null,\"cIntegrante\":2,"
				+ "		\"integrante\":{\"cApec\":null,\"cIntegrante\":2,\"paternoIntegrante\":\"MENDEZ\",\"maternoIntegrante\":\"HERNANDEZ\",\"nombreIntegrante\":\"ALINE\","
				+ "		\"cCargo\":6,\"genero\":\"F\",\"edad\":28,\"cNiveleduc\":5}}],"

				+ "		\"instructores\":[{\"cApec\":null,\"cReunion\":1,\"cApecInstructor\":null,\"cInstructor\":1,"
				+ "		\"instructor\":{\"cApec\":null,\"cInstructor\":1,\"paternoInstructor\":\"VAZQUEZ\",\"maternoInstructor\":\"LINARES\","
				+ "		\"nombreInstructor\":\"JOSE\",\"genero\":\"M\",\"edad\":28,\"cNiveleduc\":11,\"ccts\":[{\"cCct\":1401,\"cveCct\":\"01KJN0176D\",\"nomCct\":null,"
				+ "		\"cvePrograma\":null,\"nomNivel\":\"PREESCOLAR\"},"
				+ "		{\"cCct\":276005,\"cveCct\":\"01FEI0336S\",\"nomCct\":null,\"cvePrograma\":null,\"nomNivel\":\"INICIAL NO\"}]},"
				+ "		\"editable\":false,\"imprimir\":false}],"

				+ "		\"asistentes\":[{\"cAsistente\":\"1\", "
				+ "		\"paternoAsistente\":\"Ezquivel\", "
				+ "		\"maternoAsistente\":\"Alvarez\", "
				+ "		\"nombreAsistente\":\"Claudia\", "
				+ "		\"genero\":\"F\", " + "		\"edad\":32, "
				+ "		\"cNiveleduc\":4}, " + "   {\"cAsistente\":\"2\", "
				+ "		\"paternoAsistente\":\"Ezquivel\", "
				+ "		\"maternoAsistente\":\"Alvarez\", "
				+ "		\"nombreAsistente\":\"Claudia\", "
				+ "		\"genero\":\"F\", " + "		\"edad\":32, "
				+ "		\"cNiveleduc\":4}] " + "}";

		mockMvc.perform(
				post("/actaConstitutiva/save").with(userDeatilsService("PI"))
						.contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8").body(bodyStr.getBytes()))
				.andExpect(status().isOk());
	}

	@Ignore
	@Test
	public void deleteActaConstitutivaTest() throws Exception {
		mockMvc.perform(
				get("/actaConstitutiva/delete/130").with(
						userDeatilsService("PI")).accept(
						MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}

}