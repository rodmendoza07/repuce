
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

 public class PrimeraAsambleaControllerTests extends BaseControllerTests{

	
	/*
	 * CCTS de Prueba
		40	01DJN0001E savePrimeraAsambleaNuevaCreacionTest
		41	01DJN0002D savePrimeraAsambleaSinPresidente
		42	01DJN0003C savePrimeraAsambleaSinSecretario
		43	01DJN0004B savePrimeraAsambleaSinConsejeros
		44	01DJN0005A savePrimeraAsambleaSinPorcentajePadres
		45	01DJN0006Z CCT con 2 bajas 2 modificaciones
		46	01DJN0007Z delete
		47	01DJN0008Y
		48	01DJN0009X
		49	01DJN0011L
	 */
	
	@Test
	@SuppressWarnings("unchecked")
	public void searchPrimeraAsambleaTest() throws Exception {
		mockMvc.perform(get("/primeraAsamblea/select/40/0").with(userDeatilsService("PI"))
					.accept(MediaType.APPLICATION_JSON))
					.andExpect(jsonPath("$.integrantes").value(collectionWithSize(equalTo(6))))
					;	
	}
	
	@Test
	@SuppressWarnings("unchecked")
	public void searchPrimeraAsambleaActaTest() throws Exception {
		mockMvc.perform(get("/primeraAsamblea/select/45/1").with(userDeatilsService("PI"))
					.accept(MediaType.APPLICATION_JSON))
					.andExpect(jsonPath("$.integrantes").value(collectionWithSize(equalTo(10))))
					;
	}
	
	//Escenarios a probar

	//1. Registro de Consejo de nueva creación
	@Test
	public void savePrimeraAsambleaNuevaCreacionTest() throws Exception {
		String bodyStr = "{\"ceInfGral\":{\"cCct\":40}, " +
				"\"ceSesion\":{\"fchSesion\":\"2013-09-01T06:00:00.000Z\", " +
				"\"horaIniSesion\":\"10:00\", \"horaFinSesion\":\"12:00\", " +
				"\"numIntegrantes\":23, \"observaciones\":\"CDSCDSCDS\"}, " +
				"\"actividades\":[ " +
				"	{\"cActividad\":11}, " +
				"	{\"cActividad\":13, \"nomOtraActividad\":\"OTRA ACTIVIDAD\"}], " +
				"\"integrantes\":[ " +
				"	{\"paternoIntegrante\":\"CDSCDSCS\", " +
				"		\"maternoIntegrante\":\"DSCDSCDSC\", " +
				"		\"nombreIntegrante\":\"ABUNDIO\", " +
				"		\"cCargo\":3, " +
				"		\"cscIntegrante\":1, " +
				"		\"cCalidad\":1, " +
				"		\"telIntegrante\":\"34567\", " +
				"		\"emailIntegrante\":\"cdscds@cdcd.com\", " +
				"		\"cNiveleduc\":1, " +
				"		\"genero\":\"M\", " +
				"		\"cGrado\":8}, " +
				"	{\"paternoIntegrante\":\"CSDCDSCS\", " +
				"		\"maternoIntegrante\":\"DSCDSCSD\", " +
				"		\"nombreIntegrante\":\"NEPOMUCENO\", " +
				"		\"cCargo\":3, " +
				"		\"cscIntegrante\":2, " +
				"		\"cCalidad\":4, " +
				"		\"telIntegrante\":\"1234567\", " +
				"		\"emailIntegrante\":\"email@dominio.com\"," +
				"		\"cNiveleduc\":2, " +
				"		\"genero\":\"F\", " +
				"		\"cGrado\":2}, " +
				"	{\"paternoIntegrante\":\"XASXSAXAS\", " +
				"		\"maternoIntegrante\":\"XAXASXAS\", " +
				"		\"nombreIntegrante\":\"EULOGIO\", " +
				"		\"cCargo\":3, " +
				"		\"cscIntegrante\":6, " +
				"		\"cCalidad\":4, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"csdcsd@dcdc.com\", " +
				"		\"cNiveleduc\":1, " +
				"		\"genero\":\"M\", " +
				"		\"cGrado\":3}, " +
				"	{\"paternoIntegrante\":\"ROSAS\", " +
				"		\"maternoIntegrante\":\"SANDOVAL\", " +
				"		\"nombreIntegrante\":\"ISMAEL\", " +
				"		\"cCargo\":3, " +
				"		\"cscIntegrante\":7, " +
				"		\"cCalidad\":1, " +
				"		\"telIntegrante\":\"345678\", " +
				"		\"emailIntegrante\":\"ismael.rosas@dddd.com\", " +
				"		\"cNiveleduc\":2, " +
				"		\"genero\":\"M\", " +
				"		\"cGrado\":1}, " +
				"	{\"paternoIntegrante\":\"VALENCIA\", " +
				"		\"maternoIntegrante\":\"VERTIZ\", " +
				"		\"nombreIntegrante\":\"CARLOS\", " +
				"		\"cCargo\":1, " +
				"		\"cscIntegrante\":8, " +
				"		\"cCalidad\":1, " +
				"		\"telIntegrante\":\"234567\"," +
				"		\"emailIntegrante\":\"carlos.valencia@dcdcd.com\", " +
				"		\"cNiveleduc\":1, " +
				"		\"genero\":\"M\", " +
				"		\"cGrado\":1}, " +
				"	{\"paternoIntegrante\":\"MONTERO\", " +
				"		\"maternoIntegrante\":\"LOPEZ\", " +
				"		\"nombreIntegrante\":\"SOCORRO\", " +
				"		\"cCargo\":2, " +
				"		\"cscIntegrante\":9, " +
				"		\"cCalidad\":1, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"cocotl@cdcd.com\", " +
				"		\"cNiveleduc\":8, " +
				"		\"genero\":\"F\"," +
				"		\"cGrado\":1}], " +
				"\"asistentes\":[ " +
				"	{\"paternoAsistente\":\"PEREZ\", " +
				"		\"maternoAsistente\":\"LOPEZ\", " +
				"		\"nombreAsistente\":\"JUAN\", " +
				"		\"cCalidad\":1}, " +
				"	{\"paternoAsistente\":\"DOUB\", " +
				"		\"maternoAsistente\":\"FIRE\", " +
				"		\"nombreAsistente\":\"MRS\", " +
				"		\"cCalidad\":4}, " +
				"	{\"paternoAsistente\":\"FULANITO\", " +
				"		\"maternoAsistente\":\"DE TAL\", " +
				"		\"nombreAsistente\":\"COSME\", " +
				"		\"cCalidad\":2}] " +
				"}";
		mockMvc.perform(post("/primeraAsamblea/savePrimeraAsamblea")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk());	
	}
		
/*	
	//1.1 Registro de Consjo sin cumplir con varios requisitos
	//1.1.1 Consejo sin un presidente
	@Test
	public void savePrimeraAsambleaSinPresidente() throws Exception {
		String bodyStr = "{\"ceInfGral\":{\"cCct\":41}, " +
				"\"ceSesion\":{\"fchSesion\":\"2012-11-08T06:00:00.000Z\", " +
				"\"horaIniSesion\":\"10:00\", \"horaFinSesion\":\"12:00\", " +
				"\"numIntegrantes\":23, \"observaciones\":\"CDSCDSCDS\", " +
				"\"fchRegistro\":\"2012-11-08T06:00:00.000Z\"}, " +
				"\"actividades\":[ " +
				"	{\"cActividad\":11}, " +
				"	{\"cActividad\":13, \"nomOtraActividad\":\"OTRA ACTIVIDAD\"}], " +
				"\"integrantes\":[ " +
				"	{\"paternoIntegrante\":\"XASXSAXAS\", " +
				"		\"maternoIntegrante\":\"XAXASXAS\", " +
				"		\"nombreIntegrante\":\"EULOGIO\", " +
				"		\"cCargo\":3, " +
				"		\"cscIntegrante\":6, " +
				"		\"cCalidad\":4, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"csdcsd@dcdc.com\", " +
				"		\"cNiveleduc\":1, " +
				"		\"genero\":\"M\", " +
				"		\"cGrado\":3}, " +
				"	{\"paternoIntegrante\":\"MONTERO\", " +
				"		\"maternoIntegrante\":\"LOPEZ\", " +
				"		\"nombreIntegrante\":\"SOCORRO\", " +
				"		\"cCargo\":2, " +
				"		\"cscIntegrante\":9, " +
				"		\"cCalidad\":1, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"cocotl@cdcd.com\", " +
				"		\"cNiveleduc\":8, " +
				"		\"genero\":\"F\"," +
				"		\"cGrado\":1}]}";
		mockMvc.perform(post("/primeraAsamblea/savePrimeraAsamblea")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(content().string(containsString(
							"mx.gob.sep.dgtec.repuce.servicios.util.ErrorNegocio"
							)));	
	}	

	//1.1.2 Consejo sin secretario
	@Test
	public void savePrimeraAsambleaSinSecretario() throws Exception {
		String bodyStr = "{\"ceInfGral\":{\"cCct\":42}, " +
				"\"ceSesion\":{\"fchSesion\":\"2012-11-08T06:00:00.000Z\", " +
				"\"horaIniSesion\":\"10:00\", \"horaFinSesion\":\"12:00\", " +
				"\"numIntegrantes\":23, \"observaciones\":\"CDSCDSCDS\", " +
				"\"fchRegistro\":\"2012-11-08T06:00:00.000Z\"}, " +
				"\"actividades\":[ " +
				"	{\"cActividad\":11}, " +
				"	{\"cActividad\":13, \"nomOtraActividad\":\"OTRA ACTIVIDAD\"}], " +
				"\"integrantes\":[ " +
				"	{\"paternoIntegrante\":\"XASXSAXAS\", " +
				"		\"maternoIntegrante\":\"XAXASXAS\", " +
				"		\"nombreIntegrante\":\"EULOGIO\", " +
				"		\"cCargo\":3, " +
				"		\"cscIntegrante\":6, " +
				"		\"cCalidad\":4, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"csdcsd@dcdc.com\", " +
				"		\"cNiveleduc\":1, " +
				"		\"genero\":\"M\", " +
				"		\"cGrado\":3}, " +
				"	{\"paternoIntegrante\":\"MONTERO\", " +
				"		\"maternoIntegrante\":\"LOPEZ\", " +
				"		\"nombreIntegrante\":\"SOCORRO\", " +
				"		\"cCargo\":2, " +
				"		\"cscIntegrante\":9, " +
				"		\"cCalidad\":1, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"cocotl@cdcd.com\", " +
				"		\"cNiveleduc\":8, " +
				"		\"genero\":\"F\"," +
				"		\"cGrado\":1}]}";
		mockMvc.perform(post("/primeraAsamblea/savePrimeraAsamblea")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk())
					.andExpect(view().name("exceptionPage"));
	}	

	//1.1.3 Consejo sin Consejeros
	@Test
	public void savePrimeraAsambleaSinConsejeros() throws Exception {
		String bodyStr = "{\"ceInfGral\":{\"cCct\":43}, " +
				"\"ceSesion\":{\"fchSesion\":\"2012-11-08T06:00:00.000Z\", " +
				"\"horaIniSesion\":\"10:00\", \"horaFinSesion\":\"12:00\", " +
				"\"numIntegrantes\":23, \"observaciones\":\"CDSCDSCDS\", " +
				"\"fchRegistro\":\"2012-11-08T06:00:00.000Z\"}, " +
				"\"actividades\":[ " +
				"	{\"cActividad\":11}, " +
				"	{\"cActividad\":13, \"nomOtraActividad\":\"OTRA ACTIVIDAD\"}], " +
				"\"integrantes\":[ " +
				"	{\"paternoIntegrante\":\"XASXSAXAS\", " +
				"		\"maternoIntegrante\":\"XAXASXAS\", " +
				"		\"nombreIntegrante\":\"EULOGIO\", " +
				"		\"cCargo\":2, " +
				"		\"cscIntegrante\":6, " +
				"		\"cCalidad\":4, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"csdcsd@dcdc.com\", " +
				"		\"cNiveleduc\":1, " +
				"		\"genero\":\"M\", " +
				"		\"cGrado\":3}, " +
				"	{\"paternoIntegrante\":\"MONTERO\", " +
				"		\"maternoIntegrante\":\"LOPEZ\", " +
				"		\"nombreIntegrante\":\"SOCORRO\", " +
				"		\"cCargo\":2, " +
				"		\"cscIntegrante\":9, " +
				"		\"cCalidad\":1, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"cocotl@cdcd.com\", " +
				"		\"cNiveleduc\":8, " +
				"		\"genero\":\"F\"," +
				"		\"cGrado\":1}]}";
		mockMvc.perform(post("/primeraAsamblea/savePrimeraAsamblea")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk());	
	}	
	
	
	//1.2 Consejo que no cumpla con el 50%+1 de la integración
	@Test
	public void savePrimeraAsambleaSinPorcentajePadres() throws Exception {
		String bodyStr = "{\"ceInfGral\":{\"cCct\":44}, " +
				"\"ceSesion\":{\"fchSesion\":\"2012-11-08T06:00:00.000Z\", " +
				"\"horaIniSesion\":\"10:00\", \"horaFinSesion\":\"12:00\", " +
				"\"numIntegrantes\":23, \"observaciones\":\"CDSCDSCDS\", " +
				"\"fchRegistro\":\"2012-11-08T06:00:00.000Z\"}, " +
				"\"actividades\":[ " +
				"	{\"cActividad\":11}, " +
				"	{\"cActividad\":13, \"nomOtraActividad\":\"OTRA ACTIVIDAD\"}], " +
				"\"integrantes\":[ " +
				"	{\"paternoIntegrante\":\"HERNANDEZ\", " +
				"		\"maternoIntegrante\":\"SOTO\", " +
				"		\"nombreIntegrante\":\"EULOGIO\", " +
				"		\"cCargo\":1, " +
				"		\"cscIntegrante\":1, " +
				"		\"cCalidad\":2, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"csdcsd@dcdc.com\", " +
				"		\"cNiveleduc\":1, " +
				"		\"genero\":\"M\", " +
				"		\"cGrado\":3}, " +
				"	{\"paternoIntegrante\":\"LOPEZ\", " +
				"		\"maternoIntegrante\":\"AYALA\", " +
				"		\"nombreIntegrante\":\"RODRIGO\", " +
				"		\"cCargo\":2, " +
				"		\"cscIntegrante\":2, " +
				"		\"cCalidad\":4, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"csdcsd@dcdc.com\", " +
				"		\"cNiveleduc\":1, " +
				"		\"genero\":\"M\", " +
				"		\"cGrado\":3}, " +
				"	{\"paternoIntegrante\":\"MONTERO\", " +
				"		\"maternoIntegrante\":\"LOPEZ\", " +
				"		\"nombreIntegrante\":\"SOCORRO\", " +
				"		\"cCargo\":3, " +
				"		\"cscIntegrante\":3, " +
				"		\"cCalidad\":3, " +
				"		\"telIntegrante\":\"2345678\", " +
				"		\"emailIntegrante\":\"cocotl@cdcd.com\", " +
				"		\"cNiveleduc\":8, " +
				"		\"genero\":\"F\"," +
				"		\"cGrado\":1}]}";
		mockMvc.perform(post("/primeraAsamblea/savePrimeraAsamblea")
					.with(userDeatilsService("PI"))
					.contentType(MediaType.APPLICATION_JSON)
					.characterEncoding("UTF-8")
					.body(bodyStr.getBytes()))
					.andExpect(status().isOk());	
	}		
	*/
	
	//2. Modificación de la Primera Asemablea - Consejo nuevo
	//2.1 Consejo que cuenta con más de tres modificaciones 
	//PENDIENTE
	
	//3. Baja de un Consejero que esté registrado en un Comité y que tenga a otros integrantes registrados
	
	//4. Baja de un Consjero que esté registrado en un Comité  y que NO tenga a otros integrantes registrados
	
	//4. Modificación de integración del Consejo modificado y preexistente
	
	//5. Baja de Consejos con Sesiones registradas
	
	//6. Baja de Consejos sin Sesiones registradas
	
	
	//7. 
	
	
	@Test
	public void deleteSegundaSesionTest() throws Exception {
		mockMvc.perform(get("/primeraAsamblea/delete/46").with(userDeatilsService("PI"))
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
	}


}