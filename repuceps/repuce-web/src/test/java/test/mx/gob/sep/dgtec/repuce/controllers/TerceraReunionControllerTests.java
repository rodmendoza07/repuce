package test.mx.gob.sep.dgtec.repuce.controllers;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static test.mx.gob.sep.dgtec.repuce.controllers.SecurityRequestPostProcessors.userDeatilsService;

import org.junit.Ignore;
import org.junit.Test;
import org.springframework.http.MediaType;

public class TerceraReunionControllerTests extends BaseControllerTests {

	@Ignore
	@Test
	@SuppressWarnings("unchecked")
	public void searchTerceraReunionTest() throws Exception {

		mockMvc.perform(
				get("/terceraReunion/select/132")
						.with(userDeatilsService("PI")).accept(
								MediaType.APPLICATION_JSON)).andExpect(
				jsonPath("$.reunion").exists());
	}

	@Ignore
	@Test
	public void deleteTerceraReunionTest() throws Exception {
		mockMvc.perform(
				get("/terceraReunion/delete/132")
						.with(userDeatilsService("PI")).accept(
								MediaType.APPLICATION_JSON)).andExpect(
				status().isOk());
	}

	@Test
	public void saveTerceraReunionTest() throws Exception {
		Integer cApec = 132;
		String bodyStr = "";

		bodyStr = "{\"apec\":{\"cApec\":"
				+ cApec
				+ ",\"fchIntegracion\":\"2013-09-01T06:00:00.000Z\",\"periodo\":"
				+ "\"2013-2015\",\"statusApec\":3,\"tpoRegistro\":\"1\",\"idLocalidad\":191,"
				+ " \"idMunicipio\":1,\"idEntidadfed\":1,\"nomMunicipio\":\"AGUASCALIENTES\","
				+ "\"nomLocalidad\":\"LOS DURON\",\"indAulaCompartida\":\"false\","
				+ " \"nomEntidadFed\":\"AGUASCALIENTES\"},"
				+ " \"reunion\":{\"cReunion\":3,\"fchReunion\":\"2013-10-24T06:00:00.000Z\",\"horaIni\":"
				+ " \"10:30\",\"horaFin\":\"12:30\",\"observaciones\":\"segunda reunion\",\"fchRegistro\":"
				+ " \"2013-10-24T06:00:00.000Z\",\"usrCaptura\":\"01ENLACE\",\"cadena\":\"aldfhfcdd\"},"
				+ "	\"integrantesR3\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":1,\"cApecIntegrante\":"
				+ cApec
				+ ",\"cIntegrante\":1},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":1,\"cApecIntegrante\":"
				+ cApec
				+ ",\"cIntegrante\":2}"
				+ "],"

				+ "	\"instructoresR3\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":1,\"cApecInstructor\":"
				+ cApec
				+ ",\"cInstructor\":1},"
				+ " {\"cApec\":null,\"cReunion\":4,\"cApecInstructor\":null,\"cInstructor\":3,"
				+ "\"instructor\":{\"cApec\":null,\"cInstructor\":3,\"paternoInstructor\":\"ESTEVES\",\"maternoInstructor\":\"RUA\","
				+ "	\"nombreInstructor\":\"ANTONIO\",\"genero\":\"M\",\"edad\":28,\"cNiveleduc\":11,\"ccts\":[{\"cCct\":1401,\"cveCct\":\"01KJN0176D\",\"nomCct\":null,"
				+ "	\"cvePrograma\":null,\"nomNivel\":\"PREESCOLAR\"},"
				+ "	{\"cCct\":276005,\"cveCct\":\"01FEI0336S\",\"nomCct\":null,\"cvePrograma\":null,\"nomNivel\":\"INICIAL NO\"}]},"
				+ "	\"editable\":true,\"imprimir\":false}],"

				+ "\"apoyosConafe\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,\"cApoyo\":2,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,"
				+ "\"especier2\":null,\"beneficiariosr2\":16,\"montor3\":2500,\"beneficiariosr3\":null,\"tipoApoyo\":1,\"apoyo\":{\"cApoyo\":2,"
				+ "\"cTipoApoyo\":1,\"descripLarga\":\"Apoyo FORTALECE\",\"descripCorta\":\"Apoyo FORTALECE\",\"economico\":true,"
				+ "\"especie\":false,\"beneficiarios\":true,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}}],"

				+ "\"apoyosFederales\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,\"cApoyo\":20,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,"
				+ "\"especier2\":null,\"beneficiariosr2\":45,\"montor3\":null,\"beneficiariosr3\":87,\"tipoApoyo\":2,"
				+ "\"apoyo\":{\"cApoyo\":20,\"cTipoApoyo\":2,\"descripLarga\":\"Desayunos escolares DIF calientes: Menores de 0 a 5 anios\",\"descripCorta\":\"Desayunos escolares DIF calientes: Menores de 0 a 5 anios\","
				+ "\"economico\":false,\"especie\":true,\"beneficiarios\":true,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}}],"

				+ "\"apoyosEstatales\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,\"cApoyo\":23,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,\"especier2\":null,"
				+ "\"beneficiariosr2\":null,\"montor3\":5000,\"beneficiariosr3\":3,\"tipoApoyo\":3,\"apoyo\":{\"cApoyo\":23,\"cTipoApoyo\":3,"
				+ "\"descripLarga\":\"Apoyos para la construccion del aula comunitaria\",\"descripCorta\":\"Apoyos para la construccion del aula comunitaria\",\"economico\":true,\"especie\":true,"
				+ "\"beneficiarios\":false,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}}],"

				+ "\"necesidadesEspeciales\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,"
				+ "\"cApoyo\":27,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":176,\"especier2\":\"----\",\"beneficiariosr2\":67,"
				+ "\"montor3\":null,\"beneficiariosr3\":100,\"tipoApoyo\":4,\"apoyo\":{\"cApoyo\":27,\"cTipoApoyo\":4,"
				+ "\"descripLarga\":\"En el espacio educativo existen ninos con necesidades educativas especiales\",\"descripCorta\":\"Existen ninos con necesidades educativas especiales\",\"economico\":false,\"especie\":true,"
				+ "\"beneficiarios\":true,\"otraDescripcion\":true,\"otroTipoBeneficiarios\":null}}],"

				+ "\"planTrabajo\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cAccion\":2,\"nomOtra\":null,\"numVecesr1\":null,\"numVecesr2\":null,"
				+ "\"cRespuestar2\":9,\"numVecesr3\":null,\"cRespuestar3\":9,\"tipoAccion\":\"Apoyos para motivar permanencia\","
				+ "\"respuestaR2\":\"SI\",\"respuestaR3\":\"Si\",\"accion\":{\"cAccion\":2,\"cTipoAccion\":1,"
				+ "\"cantidad\":false,"
				+ "\"cTipoRespuesta\":4,\"cTipo\":1,\"brigadaEsp\":false,\"otraDescripcion\":false}},"

				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cAccion\":3,\"nomOtra\":null,\"numVecesr1\":null,\"numVecesr2\":null,"
				+ "\"cRespuestar2\":2,\"numVecesr3\":null,\"cRespuestar3\":2,\"tipoAccion\":\"Apoyos para motivar permanencias\","
				+ "\"respuestaR2\":\"casi siempre\",\"respuestaR3\":\"casi siempre\",\"accion\":{\"cAccion\":3,\"cTipoAccion\":1,"
				+ "\"descripLargar1\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza de instalaciones educativas.\","
				+ "\"descripLargar2\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza de instalaciones educativas.\","
				+ "\"descripLargar3\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza de instalaciones educativas.\","
				+ "\"descripCortar1\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza.\","
				+ "\"descripCortar2\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza.\","
				+ "\"descripCortar3\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza.\",\"cantidad\":true,"
				+ "\"cTipoRespuesta\":2,\"cTipo\":2,\"brigadaEsp\":false,\"otraDescripcion\":false}},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,\"cAccion\":5,\"nomOtra\":null,\"numVecesr1\":null,\"numVecesr2\":5,"
				+ "\"cRespuestar2\":2,\"numVecesr3\":10,\"cRespuestar3\":2,\"tipoAccion\":\"Mantenimiento a los espacios educativos\","
				+ "\"respuestaR2\":\"Algunas veces\",\"respuestaR3\":\"aLGUNAS veces\",\"accion\":{\"cAccion\":5,\"cTipoAccion\":2,"
				+ "\"descripLargar1\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripLargar2\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripLargar3\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripCortar1\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripCortar2\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripCortar3\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\",\"cantidad\":true,\"cTipoRespuesta\":5,\"cTipo\":2,"
				+ "\"brigadaEsp\":false,\"otraDescripcion\":false}}],"

				+ "\"diagnosticoCierre\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":4,"
				+ "\"cDesercion\":1,\"cantidad\":2},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":4,"
				+ "\"cDesercion\":2,\"cantidad\":11}],"

				+ "\"encuestaSatisfaccion\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":4,"
				+ "\"cMedicionSatisfaccion\":1,\"cRespuesta\":9,\"nombreActividad\":\"Se llevo a cabo el inventario de mobiliario y materiales didacticos\","
				+ "\"respuesta\":\"si\",\"tipoRespuesta\":4},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":4,"
				+ "\"cMedicionSatisfaccion\":2,\"cRespuesta\":1,\"nombreActividad\":\"La APEC conocio los motivos de desercion de los instructores comunitarios (en caso de haber existido este problema).\"}]}";

		mockMvc.perform(
				post("/terceraReunion/save").with(userDeatilsService("PI"))
						.contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8").body(bodyStr.getBytes()))
				.andExpect(status().isOk());
	}
}
