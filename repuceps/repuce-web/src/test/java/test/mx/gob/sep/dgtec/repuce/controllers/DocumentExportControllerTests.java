package test.mx.gob.sep.dgtec.repuce.controllers;

import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static test.mx.gob.sep.dgtec.repuce.controllers.SecurityRequestPostProcessors.userDeatilsService;

import org.junit.Test;

public class DocumentExportControllerTests extends BaseControllerTests{

	
	@Test
	public void exportDocumentTest() throws Exception {
		mockMvc.perform(get("/exportarDocumentos/resultadosBusqueda/bla").with(userDeatilsService("PI")));
	}

}