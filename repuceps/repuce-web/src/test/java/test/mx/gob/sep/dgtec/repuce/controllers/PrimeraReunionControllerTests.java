package test.mx.gob.sep.dgtec.repuce.controllers;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.status;
import static test.mx.gob.sep.dgtec.repuce.controllers.SecurityRequestPostProcessors.userDeatilsService;

import org.junit.Ignore;
import org.junit.Test;
import org.springframework.http.MediaType;

public class PrimeraReunionControllerTests extends BaseControllerTests {

	@Ignore
	@Test
	@SuppressWarnings("unchecked")
	public void searchPrimeraReunionTest() throws Exception {

		mockMvc.perform(
				get("/primeraReunion/select/132")
						.with(userDeatilsService("PI")).accept(
								MediaType.APPLICATION_JSON)).andExpect(
				jsonPath("$.reunion").exists());
	}

	// 1. Registro de la primera reunion

	@Test
	public void savePrimeraReunionTest() throws Exception {
		Integer cApec = 132;
		String bodyStr = "";

		bodyStr = "{\"apec\":{\"cApec\":"
				+ cApec
				+ ",\"fchIntegracion\":\"2013-09-01T06:00:00.000Z\",\"periodo\":"
				+ "\"2013-2015\",\"statusApec\":3,\"tpoRegistro\":\"1\",\"idLocalidad\":128,"
				+ " \"idMunicipio\":12,\"idEntidadfed\":12,\"nomMunicipio\":\"AYUTLA DE LOS LIBRES\","
				+ "\"nomLocalidad\":\"EL LIMON\",\"indAulaCompartida\":\"false\","
				+ " \"nomEntidadFed\":\"GUERRERO\"},"
				+ " \"reunion\":{\"cReunion\":2,\"fchReunion\":\"2013-10-24T06:00:00.000Z\",\"horaIni\":"
				+ " \"10:30\",\"horaFin\":\"12:30\",\"observaciones\":\"actualizando reunion\",\"fchRegistro\":"
				+ " \"2013-10-24T06:00:00.000Z\",\"usrCaptura\":\"01ENLACE\",\"cadena\":\"aldfhfcdd\"},"

				+ "\"apoyosConafe\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cApoyo\":1,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,"
				+ "\"especier2\":null,\"beneficiariosr2\":null,\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":1,\"apoyo\":{\"cApoyo\":1,"
				+ "\"cTipoApoyo\":1,\"descripLarga\":\"Becas Acercate a tu escuela\",\"descripCorta\":\"Becas Acercate\",\"economico\":false,"
				+ "\"especie\":true,\"beneficiarios\":true,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cApoyo\":2,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,"
				+ "\"especier2\":null,\"beneficiariosr2\":null,\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":1,"
				+ "\"apoyo\":{\"cApoyo\":2,\"cTipoApoyo\":1,\"descripLarga\":\"Apoyo FORTALECE\",\"descripCorta\":\"Apoyo FORTALECE\","
				+ "\"economico\":true,\"especie\":false,\"beneficiarios\":false,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cApoyo\":3,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,\"especier2\":null,"
				+ "\"beneficiariosr2\":null,\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":1,\"apoyo\":{\"cApoyo\":3,\"cTipoApoyo\":1,"
				+ "\"descripLarga\":\"Utiles escolares\",\"descripCorta\":\"Utiles escolares\",\"economico\":false,\"especie\":true,"
				+ "\"beneficiarios\":true,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}},{\"cApec\":null,\"cReunion\":2,"
				+ "\"cApoyo\":12,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,\"especier2\":null,\"beneficiariosr2\":null,"
				+ "\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":null,\"apoyo\":{\"cApoyo\":12,\"cTipoApoyo\":1,"
				+ "\"descripLarga\":\"Otro: Especifique\",\"descripCorta\":\"Otros:\",\"economico\":false,\"especie\":true,"
				+ "\"beneficiarios\":true,\"otraDescripcion\":true,\"otroTipoBeneficiarios\":null}}],"

				+ "\"apoyosFederales\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cApoyo\":6,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,"
				+ "\"especier2\":null,\"beneficiariosr2\":null,\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":2,\"apoyo\":{\"cApoyo\":6,"
				+ "\"cTipoApoyo\":2,\"descripLarga\":\"Programa de apoyo alimentario (PAL) para menores de 0 a 5 anios\",\"descripCorta\":\"PAL para menores de 0 a 5 anios\",\"economico\":false,"
				+ "\"especie\":true,\"beneficiarios\":true,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}}],"

				+ "\"apoyosEstatales\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cApoyo\":8,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,"
				+ "\"especier2\":null,\"beneficiariosr2\":null,\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":3,\"apoyo\":{\"cApoyo\":8,"
				+ "\"cTipoApoyo\":3,\"descripLarga\":\"Recursos economicos o materiales para mejorar las condiciones de las aulas comimitarias\",\"descripCorta\":\"Recursos economicos o materiales para mejoras en aulas comunitarias\",\"economico\":false,"
				+ "\"especie\":true,\"beneficiarios\":true,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}}],"

				+ "\"necesidadesEspeciales\":[{\"cApec\":130,\"cReunion\":2,\"cApoyo\":4,\"descripOtro\":null,\"beneficiariosr1\":null,\"montor2\":null,"
				+ "\"especier2\":null,\"beneficiariosr2\":null,\"montor3\":null,\"beneficiariosr3\":null,\"tipoApoyo\":4,\"apoyo\":{\"cApoyo\":4,"
				+ "\"cTipoApoyo\":4,\"descripLarga\":\"En el espacio educativo existen ninos con necesidades educativas especiales\",\"descripCorta\":\"Hay ninos con necesidades educativas especiale\",\"economico\":false,"
				+ "\"especie\":true,\"beneficiarios\":true,\"otraDescripcion\":false,\"otroTipoBeneficiarios\":null}}],"

				+ "\"diagnostico\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cDiagnosticoCom\":1,\"poblacionAfectada\":null,\"descripOtro\":null,"
				+ "\"tipoDiagnostico\":\"Salud\",\"diagnostico\":{\"cDiagnosticoCom\":1,\"cTipoDiagnosticoCom\":1,"
				+ "\"descripLarga\":\"Problemas de salud gastrointestinales\",\"descripCorta\":\"Problemas gastrointestinales\",\"poblacionAfectada\":true,"
				+ "\"otraDescripcion\":false}}],"

				+ "\"pobIndigena\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cPoblacionIndigena\":1,\"poblacionAfectada\":160,\"cLengua\":10,"
				+ "\"poblacionIndigena\":\"En el espacio educactivo existen ninos indigenas que solo hablan su lengua materna\",\"lengua\":\"SERI\"},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cPoblacionIndigena\":2,\"poblacionAfectada\":160,\"cLengua\":10,"
				+ "\"poblacionIndigena\":\"En la comunidad existen ninos indigenas que solo hablan su lengua materna y no asisten a la escuela\","
				+ "\"lengua\":\"SERI\"},{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cPoblacionIndigena\":3,\"poblacionAfectada\":160,\"cLengua\":10,"
				+ "\"poblacionIndigena\":\"En el espacio educativo existen ninos indigenas que son biligues\",\"lengua\":\"SERI\"}],"

				+ "\"planTrabajo\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cAccion\":1,\"nomOtra\":null,\"numVecesr1\":null,\"numVecesr2\":null,"
				+ "\"cRespuestar2\":null,\"numVecesr3\":null,\"cRespuestar3\":null,\"tipoAccion\":\"Apoyos para motivar permanencia\","
				+ "\"respuestaR2\":null,\"respuestaR3\":null,\"accion\":{\"cAccion\":1,\"cTipoAccion\":1,"
				+ "\"descripLargar1\":\"Organizacion y acuerdos de la comunidad para garantizar la alimentacion y hospedaje\","
				+ "\"descripLargar2\":\"Apoyos en alimentacion y hospedaje\","
				+ "\"descripLargar3\":\"Se ha logrado la organizacion para garantizar la alimentacion y hospedaje de los IC\","
				+ "\"descripCortar1\":\"Alimentacion y hospedaje de IC\","
				+ "\"descripCortar2\":\"La APEC logro la organizacion de la comunidad para garantizar la alimentacion y hospedaje de los IC\","
				+ "\"descripCortar3\":\"Alimentacion y hospedaje garantizado a los IC\",\"cantidad\":false,"
				+ "\"cTipoRespuesta\":1,\"cTipo\":1,\"brigadaEsp\":false,\"otraDescripcion\":false}},"
				+ "{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cAccion\":2,\"nomOtra\":null,\"numVecesr1\":null,\"numVecesr2\":null,"
				+ "\"cRespuestar2\":null,\"numVecesr3\":null,\"cRespuestar3\":null,\"tipoAccion\":\"Apoyos para motivar permanencia\","
				+ "\"respuestaR2\":null,\"respuestaR3\":null,\"accion\":{\"cAccion\":2,\"cTipoAccion\":1,"
				+ "\"descripLargar1\":\"Translado y acompanamiento a cabeceras municipales a los instructores comunitarios\","
				+ "\"descripLargar2\":\"Translados y acomopanamiento a IC\","
				+ "\"descripLargar3\":\"En los casos requeridos se ha transladado y acompanado a las cabeceras municipales a los IC\","
				+ "\"descripCortar1\":\"Translados y acomopanamiento a IC requeridos\","
				+ "\"descripCortar2\":\"En los casos requeridos se ha transladado y acompanado a las cabeceras municipales a los IC\","
				+ "\"descripCortar3\":\"Translados y acomopanamiento a IC requeridos\",\"cantidad\":false,\"cTipoRespuesta\":1,\"cTipo\":1,"
				+ "\"brigadaEsp\":false,\"otraDescripcion\":false}},{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":2,\"cAccion\":3,\"nomOtra\":null,"
				+ "\"numVecesr1\":134,\"numVecesr2\":null,\"cRespuestar2\":null,\"numVecesr3\":null,\"cRespuestar3\":null,"
				+ "\"tipoAccion\":\"Mantenimiento a los espacios educativos\",\"respuestaR2\":null,\"respuestaR3\":null,"
				+ "\"accion\":{\"cAccion\":3,\"cTipoAccion\":2,"
				+ "\"descripLargar1\":\"Se programan realizar jornadas comunitarias para el mantenimiento y limpieza de las instalaciones educativas\","
				+ "\"descripLargar2\":\"Se programan jornadas de limpieza y mantenimiento\","
				+ "\"descripLargar3\":\"Numero de jornadas educativas realizadas para mantenimiento y limpieza de instalaciones educativas\","
				+ "\"descripCortar1\":\"Numero de jornadas de mantenimiento y limpieza\","
				+ "\"descripCortar2\": \"Numero de jornadas educativas llevadas a cabo para el mantenimiento y limpieza de las instalaciones\","
				+ "\"descripCortar3\":\"Numero de jornadas de mantenimiento y limpieza\",\"cantidad\":true,\"cTipoRespuesta\":2,\"cTipo\":2,"
				+ "\"brigadaEsp\":false,\"otraDescripcion\":false}}],"

				+ "	\"integrantesR1\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":1,\"cApecIntegrante\":"
				+ cApec
				+ ",\"cIntegrante\":1}],"
				+ "	\"instructoresR1\":[{\"cApec\":"
				+ cApec
				+ ",\"cReunion\":1,\"cApecInstructor\":"
				+ cApec
				+ ",\"cInstructor\":1,\"editable\":false},"
				+ "	{\"cApec\":null,\"cReunion\":2,\"cApecInstructor\":null,\"cInstructor\":2,\"editable\":true,"
				+ "	\"instructor\":{\"cApec\":null,\"cInstructor\":2,\"paternoInstructor\":\"VERA\",\"maternoInstructor\":\"LUNA\","
				+ "	\"nombreInstructor\":\"JOSE\",\"genero\":\"M\",\"edad\":38,\"cNiveleduc\":11,\"ccts\":[{\"cCct\":1401,\"cveCct\":\"01KJN0176D\",\"nomCct\":null,"
				+ "	\"cvePrograma\":null,\"nomNivel\":\"PREESCOLAR\"},"
				+ "	{\"cCct\":276005,\"cveCct\":\"01FEI0336S\",\"nomCct\":null,\"cvePrograma\":null,\"nomNivel\":\"INICIAL NO\"}]}}]"

				+ "}";

		mockMvc.perform(
				post("/primeraReunion/save").with(userDeatilsService("PI"))
						.contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8").body(bodyStr.getBytes()))
				.andExpect(status().isOk());
	}

	@Ignore
	@Test
	public void deletePrimeraReunionTest() throws Exception {
		mockMvc.perform(
				get("/primeraReunion/delete/132")
						.with(userDeatilsService("PI")).accept(
								MediaType.APPLICATION_JSON)).andExpect(
				status().isOk());
	}

}
