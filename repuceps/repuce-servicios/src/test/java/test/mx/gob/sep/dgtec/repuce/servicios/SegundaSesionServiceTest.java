package test.mx.gob.sep.dgtec.repuce.servicios;


import mx.gob.sep.dgtec.repuce.servicios.SegundaSesionService;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionVO;


import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import test.mx.gob.sep.dgtec.repuce.servicios.util.CreateTestData;

public class SegundaSesionServiceTest extends BaseServicioTest {
	
	@Autowired
	private SegundaSesionService segundaSesionService;

	@Test
	public void segundaSesionServiceTest(){
		Assert.notNull(segundaSesionService);
	}
	
	
	
	@Test
	public void saveSegundaSesionTest(){
		int numRecords = 0;
		try{
			SegundaSesionVO segundaSesionVO = CreateTestData.getSegundaSesionBean();
			numRecords = segundaSesionService.saveSegundaSesion(segundaSesionVO);
			Assert.isTrue(numRecords==1);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	
	/*@Test
	public void selectPrimeraSesionTest(){
		try{
			SegundaSesionVO segundaSesion =
					segundaSesionService.selectSegundaSesion(34648);
			System.out.println(segundaSesion);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}*/

}
