package test.mx.gob.sep.dgtec.repuce.servicios;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.conafe.vo.PrimeraReunionVO;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapperCstm;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDiagnosticoComCstm;
import mx.gob.sep.dgtec.repuce.model.ApecInstructorCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPoblacionIndigenaCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CAccion;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.model.CDiagnosticoCom;
import mx.gob.sep.dgtec.repuce.model.CLengua;
import mx.gob.sep.dgtec.repuce.model.CPoblacionIndigena;
import mx.gob.sep.dgtec.repuce.servicios.CatalogosService;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraReunionService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

public class PrimeraReunionServiceTest extends BaseServicioTest {

	@Autowired
	private PrimeraReunionService primeraReunionService;
	@Autowired
	private ApecReunionInstructorMapperCstm apecReunionInstructorMapperCstm;
	@Autowired
	private CatalogosService catalogoService;

	@Test
	public void primeraReunionServiceTest() {
		Assert.notNull(primeraReunionService);
	}

	@Ignore
	@Test
	public void selectPrimeraReunionTest() {
		try {
			PrimeraReunionVO primeraReunion = primeraReunionService
					.selectPrimeraReunion(130);

			Assert.notNull(primeraReunion);
			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(primeraReunion));
			
			List<ApecReunionInstructorCtsm> lista = new ArrayList<ApecReunionInstructorCtsm>();
			lista=apecReunionInstructorMapperCstm.selectInstructoresRegistradosXReunion(primeraReunion.getApec().getcApec(),Constants.PRIMERA_REUNION);
			
			System.out.println("la lista contiene "+lista.size());
			
			for (ApecReunionInstructorCtsm regis : lista) {
				System.out.println("el instructor es el"+regis.getcInstructor()+".."+regis.getcApec());
				
			}

			Assert.notNull(primeraReunion.getReunion());
			System.out.println("Terminando correctamente");
		} catch (Exception e) {
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Ignore
	@Test
	public void savePrimeraReunionTest() {
		try {
			PrimeraReunionVO primeraReunion = new PrimeraReunionVO();

			ApecCstm apec = new ApecCstm();
			apec.setcApec(130);

			primeraReunion.setApec(apec);

			ApecReunion reunion1 = new ApecReunion();
			reunion1.setObservaciones("Insertando reunion 1 para apec 130");
			reunion1.setFchReunion(new Date());
			reunion1.setHoraIni("10:30");
			reunion1.setHoraFin("12:30");
			reunion1.setUsrCaptura("01ENLACE");
			reunion1.setCadena("aldfhfcdd");
			primeraReunion.setReunion(reunion1);

			// INTEGRANTES
			ArrayList<ApecReunionIntegranteCstm> integrantes = new ArrayList<ApecReunionIntegranteCstm>();

			ApecReunionIntegranteCstm relacionIntegrante1 = new ApecReunionIntegranteCstm();

			relacionIntegrante1.setcApec(130);
			relacionIntegrante1.setcReunion(Constants.PRIMERA_REUNION);
			relacionIntegrante1.setcApecIntegrante(130);
			relacionIntegrante1.setcIntegrante((short) 1);			

			integrantes.add(relacionIntegrante1);

			primeraReunion.setIntegrantesR1(integrantes);
			
			// INSTRUCTORES 
			ArrayList<ApecReunionInstructorCtsm> instructores = new ArrayList<ApecReunionInstructorCtsm>();

			ApecReunionInstructorCtsm relacionInstructor = new ApecReunionInstructorCtsm();
			relacionInstructor.setcApec(130);
			relacionInstructor.setcApecInstructor(130);
			relacionInstructor.setcInstructor((short) 1);
			relacionInstructor.setcReunion(Constants.ACTA_CONSTITUTIVA);
			relacionInstructor.setEditable(false);
			
			instructores.add(relacionInstructor);
			
			
			//nuevo instructor
			ApecReunionInstructorCtsm relacionInst1= new ApecReunionInstructorCtsm();
			ApecInstructorCstm instructor = new ApecInstructorCstm();
					
			
			instructor.setcInstructor((short)2);
			instructor.setPaternoInstructor("VERA");
			instructor.setMaternoInstructor("LUNA");
			instructor.setNombreInstructor("JOSE");
			instructor.setGenero("M");
			instructor.setEdad((short)38);
			instructor.setcNiveleduc(11);
			
			List<CCctLight> programas_educativos = new ArrayList<CCctLight>();
			CCctLight pro1= new CCctLight();
			pro1.setcCct(1401);
			
			programas_educativos.add(pro1);
			
			instructor.setCcts(programas_educativos);
			
			relacionInst1.setInstructor(instructor);
			relacionInst1.setcInstructor(instructor.getcInstructor());
			relacionInst1.setcReunion(Constants.PRIMERA_REUNION);
			relacionInst1.setEditable(true);
			
			instructores.add(relacionInst1);
			
			primeraReunion.setInstructoresR1(instructores);

			
			List<CApoyo> apoyos = null;
			List<CDiagnosticoCom> diagnsotico = null;
			List<CPoblacionIndigena> poblacion = null;
			List<CAccion> accionesPT = null;

			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_CONAFE, Constants.PRIMERA_REUNION);

			primeraReunion.setApoyosConafe(null);

			List<ApecApoyoCstm> conafeList = new ArrayList<ApecApoyoCstm>();

			for (CApoyo regInser : apoyos) {
				ApecApoyoCstm elemento = new ApecApoyoCstm();
				elemento.setApoyo(regInser);
				elemento.setcApoyo(regInser.getcApoyo());
				conafeList.add(elemento);
			}

			primeraReunion.setApoyosConafe(conafeList);

			apoyos = null;
			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_FEDERAL, Constants.PRIMERA_REUNION);

			primeraReunion.setApoyosFederales(null);
			List<ApecApoyoCstm> federalList = new ArrayList<ApecApoyoCstm>();

			for (CApoyo regInser : apoyos) {
				ApecApoyoCstm elemento = new ApecApoyoCstm();
				elemento.setApoyo(regInser);
				elemento.setcApoyo(regInser.getcApoyo());
				federalList.add(elemento);
			}

			primeraReunion.setApoyosFederales(federalList);

			apoyos = null;
			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_ESTATAL, Constants.PRIMERA_REUNION);

			primeraReunion.setApoyosEstatales(null);

			List<ApecApoyoCstm> estatalList = new ArrayList<ApecApoyoCstm>();

			for (CApoyo regInser : apoyos) {
				ApecApoyoCstm elemento = new ApecApoyoCstm();
				elemento.setApoyo(regInser);
				elemento.setcApoyo(regInser.getcApoyo());
				estatalList.add(elemento);
			}

			primeraReunion.setApoyosEstatales(estatalList);

			apoyos = null;
			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_NECESIDAD_ESPECIAL,
					Constants.PRIMERA_REUNION);

			primeraReunion.setNecesidadesEspeciales(null);

			List<ApecApoyoCstm> necEspList = new ArrayList<ApecApoyoCstm>();

			for (CApoyo regInser : apoyos) {
				ApecApoyoCstm elemento = new ApecApoyoCstm();
				elemento.setApoyo(regInser);
				elemento.setcApoyo(regInser.getcApoyo());
				necEspList.add(elemento);
			}

			primeraReunion.setNecesidadesEspeciales(necEspList);

			diagnsotico = catalogoService
					.searchDiagnosticoComunitario(Constants.C_DIAG_SALUD);

			primeraReunion.setDiagnostico(null);

			List<ApecDiagnosticoComCstm> diagComList = new ArrayList<ApecDiagnosticoComCstm>();

			for (CDiagnosticoCom regInser : diagnsotico) {
				ApecDiagnosticoComCstm elemento = new ApecDiagnosticoComCstm();
				elemento.setDiagnostico(regInser);
				elemento.setcDiagnosticoCom(regInser.getcDiagnosticoCom());
				diagComList.add(elemento);
			}

			diagnsotico = catalogoService
					.searchDiagnosticoComunitario(Constants.C_DIAG_INEA);

			for (CDiagnosticoCom regInser : diagnsotico) {
				ApecDiagnosticoComCstm elemento = new ApecDiagnosticoComCstm();
				elemento.setDiagnostico(regInser);
				elemento.setcDiagnosticoCom(regInser.getcDiagnosticoCom());
				diagComList.add(elemento);
			}

			primeraReunion.setDiagnostico(diagComList);

			poblacion = catalogoService.searchPoblacionIndigena();

			primeraReunion.setPobIndigena(null);

			List<ApecPoblacionIndigenaCstm> pobIndList = new ArrayList<ApecPoblacionIndigenaCstm>();

			for (CPoblacionIndigena regInser : poblacion) {
				ApecPoblacionIndigenaCstm elemento = new ApecPoblacionIndigenaCstm();
				elemento.setcLengua(10);
				elemento.setcPoblacionIndigena(regInser.getcPoblacionIndigena());
				elemento.setPoblacionAfectada(160);
				pobIndList.add(elemento);
			}

			primeraReunion.setPobIndigena(pobIndList);

			accionesPT = catalogoService
					.searchAcciones(Constants.PRIMERA_REUNION);

			primeraReunion.setPlanTrabajo(null);

			List<ApecPlanTrabajoCstm> ptList = new ArrayList<ApecPlanTrabajoCstm>();

			int i = 12;
			for (CAccion regInser : accionesPT) {
				ApecPlanTrabajoCstm elemento = new ApecPlanTrabajoCstm();
				elemento.setAccion(regInser);
				elemento.setcAccion(regInser.getcAccion());

				if (regInser.getCantidad() == true) {
					elemento.setNumVecesr1(120 + i);
				}
				if (regInser.getBrigadaEsp() == true) {
					elemento.setNomOtra("Brigadas de pruebas");
				}

				if (regInser.getOtraDescripcion() == true) {
					elemento.setNomOtra("Concepto especifico del plan de trabajo");
				}
				ptList.add(elemento);
				i++;
			}

			primeraReunion.setPlanTrabajo(ptList);
			primeraReunionService.savePrimeraReunion(primeraReunion);

			System.out.println("Terminando correctamente");
		} catch (Exception e) {
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Ignore
	@Test
	public void deletePrimeraReunionTest() {
		try {
			int exito = -1;
			exito = primeraReunionService.deletePrimeraReunion(130);

			System.out
					.println("Terminando correctamente el eliminar la primer reunion"
							+ exito);
		} catch (Exception e) {
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Ignore
	@Test
	public void selectCatalogosTest() {
		try {
			List<CApoyo> apoyos = null;

			List<CDiagnosticoCom> diagCom = null;
			List<CPoblacionIndigena> pobInd = null;
			List<CLengua> lenguas = null;
			List<CAccion> acciones = null;

			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_NECESIDAD_ESPECIAL,
					Constants.PRIMERA_REUNION);

			diagCom = catalogoService
					.searchDiagnosticoComunitario(Constants.C_TIPO_APOYO_CONAFE);

			pobInd = catalogoService.searchPoblacionIndigena();
			lenguas = catalogoService.searchLenguasIndigenas();

			acciones = catalogoService.searchAccionesPorTipo(
					Constants.C_TIPO_ACCION_PERMANENCIA,
					Constants.PRIMERA_REUNION);

			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_CONAFE, Constants.PRIMERA_REUNION);
			Assert.notNull(apoyos);
			int i = 0;

			for (i = 0; i < apoyos.size(); i++) {
				CApoyo elemento = (CApoyo) apoyos.get(i);
				System.out.println("contenido: " + elemento.getDescripLarga());
			}

			for (i = 0; i < diagCom.size(); i++) {
				CDiagnosticoCom elemento = (CDiagnosticoCom) diagCom.get(i);
				System.out.println("contenido: " + elemento.getDescripLarga());
			}

			for (i = 0; i < pobInd.size(); i++) {
				CPoblacionIndigena elemento = (CPoblacionIndigena) pobInd
						.get(i);
				System.out.println("contenido: " + elemento.getDescripLarga());
			}

			for (i = 0; i < lenguas.size(); i++) {
				CLengua elemento = (CLengua) lenguas.get(i);
				System.out.println("contenido: " + elemento.getNomLengua());
			}

			for (i = 0; i < acciones.size(); i++) {
				CAccion elemento = (CAccion) acciones.get(i);
				System.out
						.println("contenido: " + elemento.getDescripLargar1());
			}

		} catch (Exception e) {
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

}
