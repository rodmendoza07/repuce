package test.mx.gob.sep.dgtec.repuce.servicios;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.conafe.vo.SegundaReunionVO;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.servicios.CatalogosService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaReunionService;
import mx.gob.sep.dgtec.repuce.util.Constants;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

public class SegundaReunionServiceTest extends BaseServicioTest {

	@Autowired
	private SegundaReunionService segundaReunionService;
	@Autowired
	private CatalogosService catalogoService;

	@Test
	public void segundaReunionServiceTest() {
		Assert.notNull(segundaReunionService);
	}

	@Ignore
	@Test
	public void selectSegundaReunionTest() {
		try {
			SegundaReunionVO segundaReunion = segundaReunionService
					.selectSegundaReunion(130);

			Assert.notNull(segundaReunion);
			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(segundaReunion));

		} catch (Exception e) {
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Test
	public void saveSegundaReunionTest() {
		try {
			SegundaReunionVO segundaReunion = segundaReunionService
					.selectSegundaReunion(130);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(segundaReunion));

			ApecCstm apec = new ApecCstm();
			apec.setcApec(130);
			segundaReunion.setApec(apec);

			ApecReunion reunion2 = new ApecReunion();
			reunion2.setObservaciones("Insertando reunion 2 para apec 130");
			reunion2.setFchReunion(new Date());
			reunion2.setHoraIni("10:30");
			reunion2.setHoraFin("12:30");
			reunion2.setUsrCaptura("01ENLACE");
			reunion2.setCadena("aldfhfcdd");
			segundaReunion.setReunion(reunion2);

			// INTEGRANTES
			ArrayList<ApecReunionIntegranteCstm> integrantes = new ArrayList<ApecReunionIntegranteCstm>();

			ApecReunionIntegranteCstm relacionIntegrante1 = new ApecReunionIntegranteCstm();

			relacionIntegrante1.setcApec(130);
			relacionIntegrante1.setcReunion(Constants.ACTA_CONSTITUTIVA);
			relacionIntegrante1.setcApecIntegrante(130);
			relacionIntegrante1.setcIntegrante((short) 2);

			integrantes.add(relacionIntegrante1);

			segundaReunion.setIntegrantesR2(integrantes);

			// INSTRUCTORES
			ArrayList<ApecReunionInstructorCtsm> instructores = new ArrayList<ApecReunionInstructorCtsm>();

			ApecReunionInstructorCtsm relacionInstructor = new ApecReunionInstructorCtsm();
			relacionInstructor.setcApec(130);
			relacionInstructor.setcApecInstructor(130);
			relacionInstructor.setcInstructor((short) 1);
			relacionInstructor.setcReunion(Constants.ACTA_CONSTITUTIVA);
			relacionInstructor.setEditable(false);

			instructores.add(relacionInstructor);

			segundaReunion.setInstructoresR2(instructores);

			List<CApoyo> apoyos = null;
			

			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_CONAFE, Constants.SEGUNDA_REUNION);

			List<ApecApoyoCstm> conafeList = new ArrayList<ApecApoyoCstm>();

			for (CApoyo regInser : apoyos) {
				ApecApoyoCstm elemento = new ApecApoyoCstm();
				elemento.setApoyo(regInser);
				elemento.setcApoyo(regInser.getcApoyo());

				if (regInser.getBeneficiarios()) {
					elemento.setBeneficiariosr2(4);
				}

				if (regInser.getOtraDescripcion()) {
					elemento.setDescripOtro("otro tipo de apoyo");
				}
				conafeList.add(elemento);
			}

			segundaReunion.setApoyosConafe(conafeList);

			apoyos = null;
			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_FEDERAL, Constants.SEGUNDA_REUNION);

			segundaReunion.setApoyosFederales(null);
			List<ApecApoyoCstm> federalList = new ArrayList<ApecApoyoCstm>();

			for (CApoyo regInser : apoyos) {
				ApecApoyoCstm elemento = new ApecApoyoCstm();
				elemento.setApoyo(regInser);
				elemento.setcApoyo(regInser.getcApoyo());

				if (regInser.getBeneficiarios()) {
					elemento.setBeneficiariosr2(3);
				}

				if (regInser.getOtraDescripcion()) {
					elemento.setDescripOtro("otro tipo de apoyo fed");
				}

				federalList.add(elemento);
			}

			segundaReunion.setApoyosFederales(federalList);

			apoyos = null;
			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_ESTATAL, Constants.SEGUNDA_REUNION);

			segundaReunion.setApoyosEstatales(null);

			List<ApecApoyoCstm> estatalList = new ArrayList<ApecApoyoCstm>();

			for (CApoyo regInser : apoyos) {
				ApecApoyoCstm elemento = new ApecApoyoCstm();
				elemento.setApoyo(regInser);
				elemento.setcApoyo(regInser.getcApoyo());

				if (regInser.getBeneficiarios()) {
					elemento.setBeneficiariosr2(5);
				}

				if (regInser.getOtraDescripcion()) {
					elemento.setDescripOtro("otro tipo de apoyo municipal");
				}

				estatalList.add(elemento);
			}

			segundaReunion.setApoyosEstatales(estatalList);

			apoyos = null;
			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_NECESIDAD_ESPECIAL,
					Constants.SEGUNDA_REUNION);

			segundaReunion.setNecesidadesEspeciales(null);

			List<ApecApoyoCstm> necEspList = new ArrayList<ApecApoyoCstm>();

			for (CApoyo regInser : apoyos) {
				ApecApoyoCstm elemento = new ApecApoyoCstm();
				elemento.setApoyo(regInser);
				elemento.setcApoyo(regInser.getcApoyo());
				if (regInser.getBeneficiarios()) {
					elemento.setBeneficiariosr2(6);
				}

				necEspList.add(elemento);
			}

			segundaReunion.setNecesidadesEspeciales(necEspList);

			
			for (ApecPlanTrabajoCstm regEditar : segundaReunion
					.getPlanTrabajo()) {

				if (regEditar.getAccion().getcTipoRespuesta().intValue() == 1)
					regEditar.setcRespuestar2(2);

				if (regEditar.getAccion().getcTipoRespuesta().intValue() == 2) {
					regEditar.setcRespuestar2(4);
					regEditar.setNumVecesr2(4);
				}

				if (regEditar.getAccion().getcTipoRespuesta().intValue() == 3)
					regEditar.setcRespuestar2(7);

				if (regEditar.getAccion().getcTipoRespuesta().intValue() == 4)
					regEditar.setcRespuestar2(9);

			}

			segundaReunionService.saveSegundaReunion(segundaReunion);

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
			segundaReunionService.deleteSegundaReunion(130);

			System.out
					.println("Terminando correctamente el eliminar la segunda reunion");
		} catch (Exception e) {
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

}
