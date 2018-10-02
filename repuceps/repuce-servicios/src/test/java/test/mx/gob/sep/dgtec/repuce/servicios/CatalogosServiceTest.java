package test.mx.gob.sep.dgtec.repuce.servicios;



import java.util.Arrays;
import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CAccion;
import mx.gob.sep.dgtec.repuce.model.CActSesion;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.model.CCalidadInt;
import mx.gob.sep.dgtec.repuce.model.CCargoInt;
import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CComite;
import mx.gob.sep.dgtec.repuce.model.CCompEnlace;
import mx.gob.sep.dgtec.repuce.model.CDiferenciaPgr;
import mx.gob.sep.dgtec.repuce.model.CEvento;
import mx.gob.sep.dgtec.repuce.model.CGrado;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafe;
import mx.gob.sep.dgtec.repuce.model.CMejoraCct;
import mx.gob.sep.dgtec.repuce.model.CMunicipio;
import mx.gob.sep.dgtec.repuce.model.CNiveleduc;
import mx.gob.sep.dgtec.repuce.model.CNiveleducConafe;
import mx.gob.sep.dgtec.repuce.model.CPlaneacion;
import mx.gob.sep.dgtec.repuce.model.CPrograma;
import mx.gob.sep.dgtec.repuce.model.CProgramaEscolar;
import mx.gob.sep.dgtec.repuce.model.CRespuesta;
import mx.gob.sep.dgtec.repuce.model.CReunion;
import mx.gob.sep.dgtec.repuce.model.CSesion;
import mx.gob.sep.dgtec.repuce.servicios.CatalogosService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

public class CatalogosServiceTest extends BaseServicioTest {
//	private final static Logger logger = Logger.getLogger(CatalogosServiceTest.class);

	@Autowired
	private CatalogosService catalogosService;

	@Test
	public void catalogosServiceTest(){
		Assert.notNull(catalogosService);
	}
	


	@Ignore	
	@Test	
	public void testSearchActividades(){
		
		try{
			List<CActSesion> temas2da = catalogosService.searchActividades(Constants.SEGUNDA_REUNION);
			
			/* Espera que se encuentren cargadas 11 entradas en el 
			 * catálogo de actividades de la segunda reunión.
			 */
			Assert.isTrue(11 == temas2da.size());

			List<CActSesion> temas3ra = catalogosService.searchActividades(Constants.TERCERA_REUNION);

			/* Espera que se encuentren cargadas 8 entradas en el 
			 * catálogo de actividades de la tercera reunión.
			 */
			Assert.isTrue(8 == temas3ra.size());
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Ignore
	@Test
	public void testSearchCargos(){
		
		try{
			List<CCargoInt> cargosCONAFE = catalogosService.searchCargos("CE");
			
			/* Espera que se encuentren cargadas 6 entradas en el 
			 * catálogo de cargos CONAFE.
			 */
			Assert.isTrue(cargosCONAFE.size() == 6);

			List<CCargoInt> cargos = catalogosService.searchCargos(null);
			
			/* Espera que se encuentren cargadas 6 entradas en el 
			 * catálogo de cargos REPUCE.
			 */
			Assert.isTrue(3 == cargos.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	

	@Ignore
	@Test
	public void testSearchComites(){
		
		try{
			List<CComite> comitesCONAFE = catalogosService.searchComites(Constants.TPO_COMITE_CONAFE);
			
			/* Espera que se encuentren cargadas 12 entradas en el 
			 * catálogo de comites.
			 */
			Assert.isTrue(comitesCONAFE.size() == 12);

			List<CComite> comites = catalogosService.searchComites(Constants.TPO_COMITE_REPUCE);
			
			/* Espera que se encuentren cargadas 12 entradas en el 
			 * catálogo de comites.
			 */
			Assert.isTrue(10 == comites.size());			
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	
	
	@Ignore
	@Test
	public void searchReunionesCONAFETest(){
		try{
			List<CReunion> reuniones =
					catalogosService.searchReunionesCONAFE();

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(reuniones));
			
			Assert.notNull(reuniones);
			Assert.isTrue(reuniones.size() == 4);
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Ignore
	@Test
	public void testSearchComitesCct(){
		
		try{
			List<CComite> comites = catalogosService.searchComitesCct(60);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(comites));

			Assert.isTrue(comites.size() == 2);

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
		
	}	

	@Ignore
	@Test
	public void testSaveComiteCct(){
		
		try{
			int numRecords = 0;
			
			CComite cComite = new CComite();
			cComite.setcComite(28);
			cComite.setNomComite("CAMBIO A OTRO 2");
			
			numRecords = catalogosService.saveComiteCct(cComite,"01DES0007I");
			
			Assert.isTrue(numRecords == 1);

			cComite = new CComite();
			cComite.setNomComite("NUEVO COMITÉ 2");
			
			numRecords = catalogosService.saveComiteCct(cComite,"01DES0007I");
			
			Assert.isTrue(numRecords == 1);
			
			
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}		
	@Ignore
	@Test
	public void testDeleteComiteCct(){
		
		try{
			int numRecords = 0;

			numRecords = catalogosService.deleteComitesCct(
					Arrays.asList(new Integer[]{30,31}),"01DES0007I");
			
			Assert.isTrue(numRecords == 2);
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}		
	@Ignore
	@Test
	public void testSearchProgramasEducativos(){
		
		try{
			List<CProgramaEscolar> programasEscolares = catalogosService.searchProgramasEducativos();
			
			/* Espera que se encuentren cargadas 9 entradas en el 
			 * catálogo de Programas Escolares.
			 */
			Assert.isTrue(9 == programasEscolares.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	
	@Ignore
	@Test
	public void testSearchProgramas(){
		
		try{
			List<CPrograma> programasFederales = catalogosService.searchProgramas(
					Constants.TPO_PROGRAMA_FEDERAL);

			/* Espera que se encuentren cargadas 4 entradas en el 
			 * catálogo de Programas Federales
			 */
			Assert.isTrue(18 == programasFederales.size());

			List<CPrograma> programasEstatales = catalogosService.searchProgramas(
					Constants.TPO_PROGRAMA_ESTATAL);

			/* Espera que se encuentren cargadas 4 entradas en el 
			 * catálogo de Programas Estatales
			 */
			Assert.isTrue(15 == programasEstatales.size());

			List<CPrograma> programasLocales = catalogosService.searchProgramas(
					Constants.TPO_PROGRAMA_LOCAL);

			/* Espera que se encuentren cargadas 4 entradas en el 
			 * catálogo de Programas Locales
			 */
			Assert.isTrue(6 == programasLocales.size());

			List<CPrograma> programasOSC = catalogosService.searchProgramas(
					Constants.TPO_PROGRAMA_OSC);

			/* Espera que se encuentren cargadas 4 entradas en el 
			 * catálogo de Programas Organizados por la Sociedad Civil
			 */
			Assert.isTrue(5 == programasOSC.size());

			List<CPrograma> apoyoConafe = catalogosService.searchProgramas(
					Constants.TPO_PROGRAMA_CONAFE);

			/* Espera que se encuentren cargadas 4 entradas en el 
			 * catálogo de Programas del CONAFE
			 */
			Assert.isTrue(4 == apoyoConafe.size());

			List<CPrograma> apoyoFederal = catalogosService.searchProgramas(
					Constants.TPO_PROGRAMA_FEDERAL_CONAFE);
			
			/* Espera que se encuentren cargadas 7 entradas en el 
			 * catálogo de Programas del Federal CONAFE
			 */
			Assert.isTrue(7 == apoyoFederal.size());

			List<CPrograma> apoyoMunicipal = catalogosService.searchProgramas(
					Constants.TPO_PROGRAMA_MUNICIPAL_CONAFE);
			
			/* Espera que se encuentren cargadas 9 entradas en el 
			 * catálogo de Programas del Municipal CONAFE
			 */
			Assert.isTrue(9 == apoyoMunicipal.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}		
	@Ignore
	@Test
	public void testSearchMunicipios(){
		
		try{
			List<CMunicipio> municipios = catalogosService.searchMunicipios(
					new Short("1"));
			
			/* Espera que se encuentren cargadas 11 entradas en el 
			 * catálogo de Municipios para la entidad de Aguscalientes
			 */
			Assert.isTrue(11 == municipios.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}		
	@Ignore
	@Test
	public void testSearchLocalidades(){
		
		try{
			List<CLocalidadConafe> localidades = catalogosService.searchLocalidades(
					new Short("1"), 1);
			
			/* Espera que se encuentren cargadas 81 entradas en el 
			 * catálogo de Localidades para la entidad de Aguscalientes
			 */
			Assert.isTrue(47 == localidades.size());

		}catch(Exception e){
			//logger.error("Error en el Catálogo de Localidades para de Aguascalientes Muinicipio de Aguascalientes");
			e.printStackTrace();
			//Assert.fail();
		}
	}		
	@Ignore
	@Test
	public void testSearchCCtsPorLocalidad(){
		
		try{
			List<CCctLight> localidades = catalogosService.searchCCtsPorLocalidad(
					new Short("1"), 1, 1);
			
			/* Espera que se encuentren cargadas 2 CCT
			 * con consejo escolar
			 */
			Assert.isTrue(2 == localidades.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	

	/*@Test
	public void testSearchCCtsPorLocalidadCCT(){
		
		try{
			List<CCct> localidades = catalogosService.searchCCtsPorLocalidad(245689);
			
			// Espera que se encuentren cargadas 2 CCT
			// con consejo escolar
			//
			Assert.isTrue(1 == localidades.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	*/
	
	
	@Ignore
	@Test
	public void testSearchMejoras(){
		
		try{
			List<CMejoraCct> mejoras = catalogosService.searchMejorasCct();
			
			/* Espera que se encuentren cargadas # entradas en el 
			 * catálogo de Mejoras.
			 */
			System.out.println(mejoras.size());
			Assert.isTrue(11 == mejoras.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	
	
	@Ignore
	@Test
	public void testSearchPlaneacion(){
		
		try{
			List<CPlaneacion> planeaciones = catalogosService.searchPlaneacion();
			
			/* Espera que se encuentren cargadas # entradas en el 
			 * catálogo de planeación.
			 */
			System.out.println(planeaciones.size());
			Assert.isTrue(4 == planeaciones.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	
	
	
	@Ignore
	@Test
	public void testSearchNivelEduc(){
		
		try{
			List<CNiveleduc> niveles_educativos = catalogosService.searchNivelEduc();
			
			/* Espera que se encuentren cargadas # entradas en el 
			 * catálogo de los niveles educativos.
			 */
			System.out.println(niveles_educativos.size());
			Assert.isTrue(8 == niveles_educativos.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	
	
	
	@Ignore
	@Test
	public void testSearchNivelEducconafe(){
		
		try{
			List<CNiveleducConafe> niveles_educativosConafe = catalogosService.searchNiveleducConafe((short)2);
			
			/* Espera que se encuentren cargadas # entradas en el 
			 * catálogo de los niveles educativos.
			 */
			System.out.println(niveles_educativosConafe.size());
			Assert.isTrue(8 == niveles_educativosConafe.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}	
	
	
	@Ignore
	@Test
	public void testSearchGrado(){
		
		try{
			List<CGrado> grados = catalogosService.searchGrado();
			
			/* Espera que se encuentren cargadas # entradas en el 
			 * catálogo de los grados.
			 */
			System.out.println(grados.size());
			Assert.isTrue(16 == grados.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	@Ignore
	@Test
	public void testSearchSesion(){
		
		try{
			List<CSesion> sesiones = catalogosService.searchSesion();
			
			/* Espera que se encuentren cargadas # entradas en el 
			 * catálogo de las sesiones.
			 */
			System.out.println(sesiones.size());
			Assert.isTrue(10 == sesiones.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	@Ignore
	@Test
	public void testSearchCalidadInt(){
		
		try{
			List<CCalidadInt> calidad_integrantes = catalogosService.searchCalidadInt();
			
			/* Espera que se encuentren cargadas # entradas en el 
			 * catálogo de la calidad de los integrantes.
			 */
			System.out.println(calidad_integrantes.size());
			Assert.isTrue(8 == calidad_integrantes.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	@Ignore
	@Test
	public void testSearchEvento(){
		
		try{
			List<CEvento> eventos = catalogosService.searchEventos();
			
			/* Espera que se encuentren cargadas # entradas en el 
			 * catálogo de los eventos.
			 */
			System.out.println(eventos.size());
			Assert.isTrue(17 == eventos.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	
	@Ignore
	@Test
	public void testSearchCompEnlace(){
		
		try{
			List<CCompEnlace> compromisos = catalogosService.searchCompromisosEnlace();
			
			/* Espera que se encuentren cargadas # entradas en el 
			 * catálogo de los compromisos enlace.
			 */
			System.out.println(compromisos.size());
			Assert.isTrue(22 == compromisos.size());

		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	@Ignore
	@Test
	public void testSearchCCct(){
		
		try{
			List<CCct> ccts = catalogosService.selectCCct("01DDI0004F", "01ENLACE01");
			
			Assert.isTrue(1 == ccts.size());
			
			CCct cct = catalogosService.selectCCct(1);
			
			Assert.isTrue(cct.getCveCct().equals("01DDI0004F"));
			
		}catch(Exception e){
			//logger.error("Error en el Catálogo de los eventos ");
			e.printStackTrace();
			//Assert.fail();
		}
	
	}
	@Ignore
	@Test
	public void testSearchCDiferenciaPgr(){
		
		try{
			List<CDiferenciaPgr> diferencias = catalogosService.searchCDiferenciaPgr(
					Constants.TPO_DIFERENCIA_POSITIVA_PGR);
			
			Assert.isTrue(diferencias.size() == 6);
			
			diferencias = catalogosService.searchCDiferenciaPgr(
					Constants.TPO_DIFERENCIA_NEGATIVA_PGR);
			
			Assert.isTrue(diferencias.size() == 2);			
			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	

	@Ignore
	@Test
	public void testSearchApoyosPorTipo(){
		
		try{
			List<CApoyo> apoyos = catalogosService.searchApoyosPorTipo(Constants.C_TIPO_APOYO_CONAFE,Constants.SEGUNDA_REUNION);
			
			Assert.isTrue(apoyos.size() != 0);
			
			for (CApoyo registro : apoyos) {
				System.out.println(".."+registro.getDescripCorta());
				
			}			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	@Ignore
	@Test
	public void testSearchRspuestasPorTipo(){
		
		try{
			List<CRespuesta> respuestas = catalogosService.searchRespuestaPorTipo(new Short("3"));
			
			Assert.isTrue(respuestas.size() != 0);
			
			for (CRespuesta registro : respuestas) {
				System.out.println(".."+registro.getNomRespuesta());
				
			}			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}


	@Ignore
	@Test
	public void testSearchApoyosPorTipoYReunion(){
		
		try{
			List<CApoyo> apoyos = catalogosService.searchApoyosPorTipoYReunion(Constants.C_TIPO_APOYO_ESTATAL,Constants.TERCERA_REUNION);
			
			Assert.isTrue(apoyos.size() != 0);
			
			for (CApoyo registro : apoyos) {
				System.out.println(".."+registro.getDescripCorta());
				
			}			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Ignore
	@Test
	public void testSearchAccionesPorTipoYReunion(){
		
		try{
			List<CAccion> acciones = catalogosService.searchAccionesPorTipoYReunion(Constants.C_TIPO_ACCION_PERMANENCIA,Constants.TERCERA_REUNION);
			
			Assert.isTrue(acciones.size() != 0);
			
			for (CAccion registro : acciones) {
				System.out.println(".."+registro.getDescripCortar3());
				
			}			
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	@Test
public void testMaxIntegrante(){
		
		try{
			Integer valor =null;
			valor= catalogosService.searchMaxIdInstructor(105);
			
			System.out.println("El id maximo es "+valor);
			}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

}
