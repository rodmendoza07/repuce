package test.mx.gob.sep.dgtec.repuce.servicios;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.conafe.vo.TerceraReunionVO;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecEncuestaSatisfaccionCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CAccion;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.servicios.CatalogosService;
import mx.gob.sep.dgtec.repuce.servicios.TerceraReunionService;
import mx.gob.sep.dgtec.repuce.util.Constants;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

public class TerceraReunionServiceTest extends BaseServicioTest {

	@Autowired
	private TerceraReunionService terceraReunionService;
	@Autowired
	private CatalogosService catalogoService;

	@Test
	public void terceraReunionServiceTest() {
		Assert.notNull(terceraReunionService);
	}

	@Ignore
	@Test
	public void selectTerceraReunionTest() {
		try {
			TerceraReunionVO terceraReunion = terceraReunionService
					.selectTerceraReunion(130);

			Assert.notNull(terceraReunion);
			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(terceraReunion));

			System.out.println("Terminando correctamente");
		} catch (Exception e) {
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Ignore
	@Test
	public void saveTerceraReunionTest() {
		try {
			TerceraReunionVO terceraReunion = terceraReunionService
					.selectTerceraReunion(130);

			
			ApecReunion reunion3 = new ApecReunion();
			reunion3.setObservaciones("Tercera reunion");
			reunion3.setFchReunion(new Date());
			reunion3.setHoraIni("10:30");
			reunion3.setHoraFin("12:30");
			reunion3.setUsrCaptura("01ENLACE");
			reunion3.setCadena("aldfhfcdd");
			terceraReunion.setReunion(reunion3);
			
			// INTEGRANTES
			ArrayList<ApecReunionIntegranteCstm> integrantes = new ArrayList<ApecReunionIntegranteCstm>();

			ApecReunionIntegranteCstm relacionIntegrante1 = new ApecReunionIntegranteCstm();

			relacionIntegrante1.setcApec(130);
			relacionIntegrante1.setcReunion(Constants.ACTA_CONSTITUTIVA);
			relacionIntegrante1.setcApecIntegrante(130);
			relacionIntegrante1.setcIntegrante((short) 1);

			integrantes.add(relacionIntegrante1);
			
			ApecReunionIntegranteCstm relacionIntegrante2 = new ApecReunionIntegranteCstm();

			relacionIntegrante2.setcApec(130);
			relacionIntegrante2.setcReunion(Constants.ACTA_CONSTITUTIVA);
			relacionIntegrante2.setcApecIntegrante(130);
			relacionIntegrante2.setcIntegrante((short) 2);

			integrantes.add(relacionIntegrante2);


			terceraReunion.setIntegrantesR3(integrantes);

			// INSTRUCTORES
			ArrayList<ApecReunionInstructorCtsm> instructores = new ArrayList<ApecReunionInstructorCtsm>();

			ApecReunionInstructorCtsm relacionInstructor = new ApecReunionInstructorCtsm();
			relacionInstructor.setcApec(130);
			relacionInstructor.setcApecInstructor(130);
			relacionInstructor.setcInstructor((short) 1);
			relacionInstructor.setcReunion(Constants.ACTA_CONSTITUTIVA);
			relacionInstructor.setEditable(false);

			instructores.add(relacionInstructor);

			terceraReunion.setInstructoresR3(instructores);


			List<CApoyo> apoyos = null;

			List<CAccion> accionesPT = null;

			for (ApecApoyoCstm regInser : terceraReunion.getApoyosConafe()) {

				if (regInser.getApoyo().getBeneficiarios()) {
					regInser.setBeneficiariosr3(1);
				}

				if (regInser.getApoyo().getEconomico()) {
					regInser.setMontor3(1000);
				}
			}

			for (ApecApoyoCstm regInser : terceraReunion.getApoyosFederales()) {

				if (regInser.getApoyo().getBeneficiarios()) {
					regInser.setBeneficiariosr3(2);
				}

				if (regInser.getApoyo().getEconomico()) {
					regInser.setMontor3(2000);
				}
			}

			apoyos = catalogoService.searchApoyosPorTipo(
					Constants.C_TIPO_APOYO_ESTATAL, Constants.TERCERA_REUNION);

			for (CApoyo regInser : apoyos) {
				ApecApoyoCstm elemento = new ApecApoyoCstm();
				elemento.setApoyo(regInser);
				elemento.setcApoyo(regInser.getcApoyo());

				if (regInser.getBeneficiarios()) {
					elemento.setBeneficiariosr3(4);
				}

				if (regInser.getEconomico()) {
					elemento.setMontor3(1000);
				}

				if (regInser.getSiempreVisible() == false
						&& regInser.getVisibleEnReunion().intValue() == Constants.TERCERA_REUNION
								.intValue())
					terceraReunion.getApoyosEstatales().add(elemento);

			}

			for (ApecApoyoCstm regInser : terceraReunion
					.getNecesidadesEspeciales()) {

				if (regInser.getApoyo().getBeneficiarios()) {
					regInser.setBeneficiariosr3(4);
				}

				if (regInser.getApoyo().getEconomico()) {
					regInser.setMontor3(4000);
				}
			}

			accionesPT = catalogoService
					.searchAcciones(Constants.TERCERA_REUNION);

			for (CAccion regInser : accionesPT) {

				ApecPlanTrabajoCstm elemento = new ApecPlanTrabajoCstm();
				elemento.setAccion(regInser);
				elemento.setcAccion(regInser.getcAccion());

				if (regInser.getSiempreVisible() == false
						&& regInser.getVisibleEnReunion().intValue() == Constants.TERCERA_REUNION
								.intValue())
					terceraReunion.getPlanTrabajo().add(elemento);

			}

			for (ApecEncuestaSatisfaccionCstm pregunta : terceraReunion
					.getEncuestaSatisfaccion()) {

				pregunta.setcRespuesta(1);
			}

			terceraReunionService.saveTerceraReunion(terceraReunion);

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
			terceraReunionService.deleteTerceraReunion(130);

			System.out
					.println("Terminando correctamente el eliminar la tercera reunion");
		} catch (Exception e) {
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

}
