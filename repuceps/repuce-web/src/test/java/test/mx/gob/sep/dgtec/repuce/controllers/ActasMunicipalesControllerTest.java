package test.mx.gob.sep.dgtec.repuce.controllers;

import static com.jayway.jsonassert.JsonAssert.collectionWithSize;
import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.server.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.server.result.MockMvcResultMatchers.jsonPath;
import static test.mx.gob.sep.dgtec.repuce.controllers.SecurityRequestPostProcessors.userDeatilsService;

import org.junit.Test;
import org.springframework.http.MediaType;

public class ActasMunicipalesControllerTest extends BaseControllerTests{

	@Test
	@SuppressWarnings("unchecked")
	public void selectActasMunicipalesTest() throws Exception {
		mockMvc.perform(get("/actasMunicipales/listar").with(userDeatilsService("02ENLACE01"))
				.accept(MediaType.APPLICATION_JSON))
				.andExpect(jsonPath("$.").value(collectionWithSize(equalTo(5))));

	}

}