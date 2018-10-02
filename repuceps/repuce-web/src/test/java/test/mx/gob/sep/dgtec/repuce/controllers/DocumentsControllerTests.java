package test.mx.gob.sep.dgtec.repuce.controllers;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static test.mx.gob.sep.dgtec.repuce.controllers.SecurityRequestPostProcessors.userDeatilsService;

import org.junit.Test;
import org.springframework.http.MediaType;

public class DocumentsControllerTests extends BaseControllerTests {

	@Test
	public void primeraAsambleaTest() throws Exception {
		mockMvc.perform(get("/documentos/primeraAsamblea/2/3").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

	@Test
	public void segundaAsambleaTest() throws Exception {
		mockMvc.perform(get("/documentos/segundaAsamblea/8").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

	@Test
	public void terceraSesionTest() throws Exception {
		mockMvc.perform(get("/documentos/terceraSesion/91").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

	@Test
	public void cuartaSesionTest() throws Exception {
		mockMvc.perform(get("/documentos/cuartaSesion/101").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

	@Test
	public void informeTransparenciaTest() throws Exception {
		mockMvc.perform(get("/documentos/informeTransperencia/101").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

	@Test
	public void reporteMvtosNalTest() throws Exception {
		mockMvc.perform(get("/documentos/reporteMvtosNal").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

	@Test
	public void actaConstitutivaTest() throws Exception {
		mockMvc.perform(get("/documentos/actaConstitutiva/1").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

	@Test
	public void primeraReunionTest() throws Exception {
		mockMvc.perform(get("/documentos/primeraReunion/7").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

	@Test
	public void segundaReunionTest() throws Exception {
		mockMvc.perform(get("/documentos/segundaReunion/8").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

	@Test
	public void terceraReunionTest() throws Exception {
		mockMvc.perform(get("/documentos/terceraReunion/97").with(
				userDeatilsService("PI")).accept(
				MediaType.APPLICATION_OCTET_STREAM));
	}

}