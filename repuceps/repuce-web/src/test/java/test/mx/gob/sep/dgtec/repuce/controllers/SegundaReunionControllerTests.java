package test.mx.gob.sep.dgtec.repuce.controllers;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static test.mx.gob.sep.dgtec.repuce.controllers.SecurityRequestPostProcessors.userDeatilsService;

import org.junit.Ignore;
import org.junit.Test;
import org.springframework.http.MediaType;

public class SegundaReunionControllerTests extends BaseControllerTests {

	@Test
	@SuppressWarnings("unchecked")
	public void searchSegundaReunionTest() throws Exception {

		mockMvc.perform(
				get("/segundaReunion/select/132")
						.with(userDeatilsService("PI")).accept(
								MediaType.APPLICATION_JSON)).andExpect(
				jsonPath("$.reunion").doesNotExist());
	}

	@Test
	public void deleteSegundaReunionTest() throws Exception {
		mockMvc.perform(
				get("/segundaReunion/delete/132")
						.with(userDeatilsService("PI")).accept(
								MediaType.APPLICATION_JSON)).andExpect(
				status().isOk());
	}

	@Ignore
	@Test
	public void saveSegundaReunionTest() throws Exception {
		Integer cApec = 132;
		String bodyStr = "";

		bodyStr = "{\"apec\":{\"cApec\":"
				+ cApec
				+ ",\"fchIntegracion\":\"2013-09-01T06:00:00.000Z\",\"periodo\":"
				+ "\"2013-2015\",\"statusApec\":3,\"tpoRegistro\":\"1\",\"idLocalidad\":128,"
				+ " \"idMunicipio\":12,\"idEntidadfed\":12,\"nomMunicipio\":\"AYUTLA DE LOS LIBRES\","
				+ "\"nomLocalidad\":\"EL LIMON\",\"indAulaCompartida\":\"false\","
				+ " \"nomEntidadFed\":\"GUERRERO\"},"
				+ " \"reunion\":{\"cReunion\":3,\"fchReunion\":\"2013-10-24T06:00:00.000Z\",\"horaIni\":"
				+ " \"10:30\",\"horaFin\":\"12:30\",\"observaciones\":\"segunda reunion\",\"fchRegistro\":"
				+ " \"2013-10-24T06:00:00.000Z\",\"usrCaptura\":\"01ENLACE\",\"cadena\":\"aldfhfcdd\"},"

				+ "\"apoyosConafe\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,\"cApoyo\":3,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,"
				+ "\"especier2\":\"----\",\"beneficiariosr2\":4,\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":1,\"apoyo\":{\"cApoyo\":3,"
				+ "\"cTipoApoyo\":1,\"descripLarga\":\"Utiles escolares\",\"descripCorta\":\"Utiles escolares\",\"economico\":false,"
				+ "\"especie\":true,\"beneficiarios\":true,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}}],"

				+ "\"apoyosFederales\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,\"cApoyo\":14,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,"
				+ "\"especier2\":\"---\",\"beneficiariosr2\":19,\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":2,"
				+ "\"apoyo\":{\"cApoyo\":14,\"cTipoApoyo\":2,\"descripLarga\":\"Programa de Apoyo Alimentario (PAL): Menores de 0 a 5 anios\",\"descripCorta\":\"PAL: Menores de 0 a 5 anios\","
				+ "\"economico\":true,\"especie\":false,\"beneficiarios\":false,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}}],"

				+ "\"apoyosEstatales\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,\"cApoyo\":24,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":150,\"especier2\":\"--\","
				+ "\"beneficiariosr2\":34,\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":3,\"apoyo\":{\"cApoyo\":24,\"cTipoApoyo\":3,"
				+ "\"descripLarga\":\"Apoyos para la construccion del aula comunitaria\",\"descripCorta\":\"Apoyos para la construccion del aula comunitaria\",\"economico\":false,\"especie\":true,"
				+ "\"beneficiarios\":true,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}}],"

				+ "\"necesidadesEspeciales\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,"
				+ "\"cApoyo\":27,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":176,\"especier2\":\"----\",\"beneficiariosr2\":67,"
				+ "\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":4,\"apoyo\":{\"cApoyo\":27,\"cTipoApoyo\":4,"
				+ "\"descripLarga\":\"En el espacio educativo existen ninos con necesidades educativas especiales\",\"descripCorta\":\"Existen ninos con necesidades educativas especiales\",\"economico\":false,\"especie\":true,"
				+ "\"beneficiarios\":true,\"otraDescripcion\":true,\"otroTipoBeneficiarios\":null}}],"

				+ "\"planTrabajo\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,\"cAccion\":1,\"nomOtra\":null,\"numVecesr1\":null,\"numVecesr2\":null,"
				+ "\"cRespuestar2\":3,\"numVecesr3\":null,\"cRespuestar3\":null,\"tipoAccion\":\"Apoyos para motivar permanencia\","
				+ "\"respuestaR2\":\"Casi siempre\",\"respuestaR3\":null,\"accion\":{\"cAccion\":1,\"cTipoAccion\":1,"
				+ "\"descripLargar1\":\"Se ha logrado la organizacion para garantizar la alimentacion y el hospedaje de los instructores comunitarios.\","
				+ "\"descripLargar2\":\"Se ha logrado la organizacion para garantizar la alimentacion y el hospedaje de los instructores comunitarios.\","
				+ "\"descripLargar3\":\"Se ha logrado la organizacion para garantizar la alimentacion y el hospedaje de los instructores comunitarios.\","
				+ "\"descripCortar1\":\"Se ha logrado la organizacion para garantizar la alimentacion y el hospedaje de los IC.\","
				+ "\"descripCortar2\":\"Se ha logrado la organizacion para garantizar la alimentacion y el hospedaje de los IC\","
				+ "\"descripCortar3\":\"Se ha logrado la organizacion para garantizar la alimentacion y el hospedaje de los IC\",\"cantidad\":false,"
				+ "\"cTipoRespuesta\":1,\"cTipo\":1,\"brigadaEsp\":false,\"otraDescripcion\":false}},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cAccion\":5,\"nomOtra\":null,\"numVecesr1\":12,\"numVecesr2\":16,"
				+ "\"cRespuestar2\":5,\"numVecesr3\":null,\"cRespuestar3\":null,\"tipoAccion\":\"Mantenimiento a los espacios educativos\","
				+ "\"respuestaR2\":\"numerica\",\"respuestaR3\":null,\"accion\":{\"cAccion\":5,\"cTipoAccion\":2,"
				+ "\"descripLargar1\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza de instalaciones educativas.\","
				+ "\"descripLargar2\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza de instalaciones educativas.\","
				+ "\"descripLargar3\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza de instalaciones educativas.\","
				+ "\"descripCortar1\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza.\","
				+ "\"descripCortar2\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza.\","
				+ "\"descripCortar3\":\"Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza.\",\"cantidad\":true,"
				+ "\"cTipoRespuesta\":2,\"cTipo\":2,\"brigadaEsp\":false,\"otraDescripcion\":false}},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":3,\"cAccion\":6,\"nomOtra\":null,\"numVecesr1\":null,\"numVecesr2\":5,"
				+ "\"cRespuestar2\":5,\"numVecesr3\":null,\"cRespuestar3\":null,\"tipoAccion\":\"Apoyos para motivar permanencia\","
				+ "\"respuestaR2\":\"Numerica\",\"respuestaR3\":null,\"accion\":{\"cAccion\":6,\"cTipoAccion\":2,"
				+ "\"descripLargar1\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripLargar2\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripLargar3\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripCortar1\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripCortar2\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\","
				+ "\"descripCortar3\":\"Se programan jornadas de mantenimiento del mobiliario escolar.\",\"cantidad\":true,\"cTipoRespuesta\":5,\"cTipo\":2,"
				+ "\"brigadaEsp\":false,\"otraDescripcion\":false}}],"

				+ "	\"integrantesR2\":[{\"cApec\":" + cApec
				+ ",\"cReunion\":1,\"cApecIntegrante\":" + cApec
				+ ",\"cIntegrante\":2}]," + "	\"instructoresR2\":[{\"cApec\":"
				+ cApec + ",\"cReunion\":1,\"cApecInstructor\":" + cApec
				+ ",\"cInstructor\":1,\"editable\":false}]"

				+ "}";

		mockMvc.perform(
				post("/segundaReunion/save").with(userDeatilsService("PI"))
						.contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8").body(bodyStr.getBytes()))
				.andExpect(status().isOk());
	}
}
