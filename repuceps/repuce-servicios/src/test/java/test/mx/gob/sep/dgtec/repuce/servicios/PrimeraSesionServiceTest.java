package test.mx.gob.sep.dgtec.repuce.servicios;



import mx.gob.dgtec.util.LoggerUtil;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraSesionService;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionVO;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import test.mx.gob.sep.dgtec.repuce.servicios.util.CreateTestData;

public class PrimeraSesionServiceTest extends BaseServicioTest {
	
	@Autowired
	private PrimeraSesionService primeraSesionService;

	@Test
	public void primeraSesionServiceTest(){
		Assert.notNull(primeraSesionService);
	}
	
	
	/* Consulta que valida si se registran datos
	  	select * from ce_sesion where c_cct = 2 and c_sesion=2;
		select * from ce_act_sesion where c_cct = 2 and c_sesion=2; 
		select * from ce_programa where c_cct = 2 and c_sesion=2;
		select * from ce_mejora_cct where c_cct = 2 and c_sesion=2;
		select * from ce_recurso where c_cct = 2 and c_sesion=2;
		select * from ce_comite where c_cct = 2 and c_sesion=2;
		select * from ce_integrante_comite_consejo where c_cct_comite = 2 and c_sesion_comite=2;
		select * from ce_comite_integrante where ce_integrante_comite_c_cct = 2 and ce_integrante_comite_c_sesion=2;
		select * from ce_integrante_comite where c_cct = 2 and c_sesion=2;
		select * from ce_planeacion where c_cct = 2 and c_sesion=2;
		
		Y para eliminar:
		delete from ce_planeacion where c_cct = 2 and c_sesion=2; 
		delete from ce_comite_integrante where ce_integrante_comite_c_cct = 2 and ce_integrante_comite_c_sesion=2;
		delete from ce_integrante_comite where c_cct = 2 and c_sesion=2;
		delete from ce_integrante_comite_consejo where c_cct_comite = 2 and c_sesion_comite=2;
		delete from ce_comite where c_cct = 2 and c_sesion=2;
		delete from ce_recurso where c_cct = 2 and c_sesion=2;
		delete from ce_mejora_cct where c_cct = 2 and c_sesion=2;
		delete from ce_programa where c_cct = 2 and c_sesion=2;
		delete from ce_act_sesion where c_cct = 2 and c_sesion=2; 
		delete from ce_sesion where c_cct = 2 and c_sesion=2;		
	*/

	@Test
	public void savePrimeraSesionTest(){
		int numRecords = 0;
		try{
			PrimeraSesionVO primeraSesionVO = CreateTestData.getPrimeraSesionBean();
			numRecords = primeraSesionService.savePrimeraSesion(primeraSesionVO);
			Assert.isTrue(numRecords==1);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	
	/*@Test
	public void selectPrimeraSesionTest(){
		try{
			PrimeraSesionVO primeraSesion =
					primeraSesionService.selectPrimeraSesion(2);
			Assert.notNull(primeraSesion);
			Assert.notNull(primeraSesion.getCeSesion());
			LoggerUtil.debug(this, primeraSesion);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}*/
	}


