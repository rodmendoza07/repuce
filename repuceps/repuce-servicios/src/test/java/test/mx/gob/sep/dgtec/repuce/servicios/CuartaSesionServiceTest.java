package test.mx.gob.sep.dgtec.repuce.servicios;



import mx.gob.sep.dgtec.repuce.servicios.CuartaSesionService;
import mx.gob.sep.dgtec.repuce.vo.CuartaSesionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import test.mx.gob.sep.dgtec.repuce.servicios.util.CreateTestData;

public class CuartaSesionServiceTest extends BaseServicioTest {
	
	@Autowired
	private CuartaSesionService cuartaSesionService;

	@Test
	public void cuartaSesionServiceTest(){
		Assert.notNull(cuartaSesionService);
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
	public void saveCuartaSesionTest(){
		int numRecords = 0;
		try{
			CuartaSesionVO cuartaSesionVO = CreateTestData.getCuartaSesionBean();
			numRecords = cuartaSesionService.saveCuartaSesion(cuartaSesionVO);
			Assert.isTrue(numRecords==1);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	
	@Test
	public void selectCuartaSesionTest(){
		try{
			CuartaSesionVO cuartaSesion =
					cuartaSesionService.selectCuartaSesion(100);
			Assert.notNull(cuartaSesion);
			Assert.notNull(cuartaSesion.getCeSesion());
			try{
				ObjectMapper mapper = new ObjectMapper();
				System.out.println(mapper.writeValueAsString(cuartaSesion));
			}catch(Exception ex){
				ex.printStackTrace();
			}
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

}


