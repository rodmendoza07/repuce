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

public class CatalogosControllerTests extends BaseControllerTests {

	@Ignore
	@Test
	public void debugConsultaCargos() throws Exception {
		this.mockMvc.perform(get("/catalogos/cargos/1").with(
				userDeatilsService("PI")).accept(MediaType.APPLICATION_JSON));
	}

	@Ignore
	@Test
	public void updateCCctTest() throws Exception {
		this.mockMvc
				.perform(
						post("/catalogos/updateCCct")
								.with(userDeatilsService("PI"))
								.contentType(MediaType.APPLICATION_JSON)
								.body("{\"cCct\":\"8\", \"nomDirector\":\"El charlie\"}"
										.getBytes()))
				.andExpect(status().isOk());
	}

	@Ignore
	@Test
	@SuppressWarnings("unchecked")
	public void selectCDiferenciasPgrTest() throws Exception {
		mockMvc.perform(
				get("/catalogos/selectCDiferenciasPgr/1").with(
						userDeatilsService("PI")).accept(
						MediaType.APPLICATION_JSON)).andExpect(
				jsonPath("$.").value(collectionWithSize(equalTo(6))));

		mockMvc.perform(
				get("/catalogos/selectCDiferenciasPgr/0").with(
						userDeatilsService("PI")).accept(
						MediaType.APPLICATION_JSON)).andExpect(
				jsonPath("$.").value(collectionWithSize(equalTo(2))));
	}

	@Ignore
	@Test
	public void searchListCctTest() throws Exception {
		mockMvc.perform(
				get("/catalogos/ListCct?cveCct=01DES0007I").with(
						userDeatilsService("00CONAPASE01")).accept(
						MediaType.APPLICATION_JSON)).andExpect(
				jsonPath("$.[0]cveCct").value("01DES0007I"));
	}

	@Ignore
	@Test
	@SuppressWarnings("unchecked")
	public void searchReunionesCONAFETest() throws Exception {
		mockMvc.perform(
				get("/catalogos/listReunionesCONAFE").with(
						userDeatilsService("PI")).accept(
						MediaType.APPLICATION_JSON)).andExpect(
				jsonPath("$.").value(collectionWithSize(equalTo(4))));
	}

	@Ignore
	@Test
	@SuppressWarnings("unchecked")
	public void listNivelesEducConafeTest() throws Exception {
		mockMvc.perform(
				get("/catalogos/listNivelesEducConafe/1").with(
						userDeatilsService("PI")).accept(
						MediaType.APPLICATION_JSON)).andExpect(
				jsonPath("$.").value(collectionWithSize(equalTo(8))));
	}

	@Ignore
	@Test
	@SuppressWarnings("unchecked")
	public void searchComitesCctTest() throws Exception {
		mockMvc.perform(
				get("/catalogos/listComiteCct/60").with(
						userDeatilsService("PI")).accept(
						MediaType.APPLICATION_JSON)).andExpect(
				jsonPath("$.").value(collectionWithSize(equalTo(2))));
	}

	@Ignore
	@Test
	public void saveComitesCctTest() throws Exception {
		String bodyStr = "{\"nomComite\":\"sadasdasdassdsdasdasd\", "
				+ "		\"observaciones\":\"cocotl\"}";

		mockMvc.perform(
				post("/catalogos/saveComiteCct/")
						.with(userDeatilsService("01DES0007I"))
						.contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8").body(bodyStr.getBytes()))
				.andExpect(status().isOk());
	}

	@Ignore
	@Test
	public void saveComitesCctUpdateTest() throws Exception {
		String bodyStr = "{ \"cComite\":36, "
				+ "	\"nomComite\":\"sadasdasdassdsdasdasd\", "
				+ "	\"observaciones\":\"sadasdasdassdsdasdasd\"}";

		mockMvc.perform(
				post("/catalogos/saveComiteCct/")
						.with(userDeatilsService("01DES0007I"))
						.contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8").body(bodyStr.getBytes()))
				.andExpect(status().isOk());
	}

	@Ignore
	@Test
	public void deleteComiteCctTest() throws Exception {
		String bodyStr = "[40,41]";

		mockMvc.perform(
				post("/catalogos/deleteComiteCct/")
						.with(userDeatilsService("01DES0007I"))
						.contentType(MediaType.APPLICATION_JSON)
						.characterEncoding("UTF-8").body(bodyStr.getBytes()))
				.andExpect(status().isOk());
	}

	@Test
	@SuppressWarnings("unchecked")
	public void searchApoyosPorTipo() throws Exception {
		System.out.println("buscando apoyos");

		mockMvc.perform(get("/catalogos/listNecesidadesEspeciales/2").with(
				userDeatilsService("PI")).accept(MediaType.APPLICATION_JSON));
	}

	@Test
	@SuppressWarnings("unchecked")
	public void searcRespuestasPorTipo() throws Exception {
		System.out.println("buscando respuesras");

		mockMvc.perform(get("/catalogos/listRespuestaPorTipo/1").with(
				userDeatilsService("PI")).accept(MediaType.APPLICATION_JSON));
	}

	@Test
	@SuppressWarnings("unchecked")
	public void searchAccionesPorTipoYReunion() throws Exception {

		mockMvc.perform(get("/catalogos/listAccionesPorTipoYReunion/1/4").with(
				userDeatilsService("PI")).accept(MediaType.APPLICATION_JSON));
	}

	@Test
	@SuppressWarnings("unchecked")
	public void searchMAxIdIntegrante() throws Exception {

		mockMvc.perform(get("/catalogos/listMaxIdIntegrante/105").with(
				userDeatilsService("PI")).accept(MediaType.APPLICATION_JSON));
	}
}