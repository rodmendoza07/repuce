package test.mx.gob.sep.dgtec.repuce.servicios;


import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;
import mx.gob.sep.dgtec.repuce.servicios.ActaConstitutivaService;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import test.mx.gob.sep.dgtec.repuce.servicios.util.CreateTestData;


/**
 * Apec 1 consultar
 * 
 * @author ismael.rosas
 *
 */

public class ActaConstitutivaServiceTest extends BaseServicioTest {
	
	@Autowired
	private ActaConstitutivaService actaConstitutivaService;

	
	@Test
	public void actaConstitutivaServiceTest(){
		Assert.notNull(actaConstitutivaService);
	}

	
	@Ignore
	@Test
	public void saveActaConstitutivaTest(){
		
		int numRecords = 0;
		try{
			ActaConstitutivaVO ActaConstitutivaVO = CreateTestData.getActaConstitutivaBean();
			numRecords = actaConstitutivaService.saveActaConstitutiva(ActaConstitutivaVO);
			System.out.println(numRecords);
			Assert.isTrue(numRecords==1);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
		
	}

	
	@Test
	public void selectActaConstitutivaTest(){
		try{
			ActaConstitutivaVO actaConstitutiva =
					actaConstitutivaService.selectActaConstitutiva(130);
			
			Assert.notNull(actaConstitutiva);	
			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(actaConstitutiva));
		}catch(Exception e){
			e.printStackTrace();			
			Assert.isTrue(false);
		}
	}
	
	
	@Ignore
	@Test
	public void deleteActaConstitutivaTest() {
		try {
			int exito=-1;
			exito=actaConstitutivaService.deleteActaConstitutiva(130);
			
			System.out.println("Terminando correctamente el eliminar el acta constitutiva:"+exito);
		} catch (Exception e) {
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	
	@Test
	public void actaulizaRelacionesActaConstitutivaTest(){
		try{
			actaConstitutivaService.actaulizaRelacionesPendientes();
			
			
		}catch(Exception e){
			e.printStackTrace();			
			Assert.isTrue(false);
		}
	}

}
