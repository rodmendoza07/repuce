package test.mx.gob.sep.dgtec.repuce.servicios;


import mx.gob.sep.dgtec.repuce.servicios.PrimeraAsambleaService;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import test.mx.gob.sep.dgtec.repuce.servicios.util.CreateTestData;


/**
 * CCT 46 01DJN0007Z Guarada Por medio del servicio un CE de nueva creación
 * 
 * @author ismael.rosas
 *
 */

public class PrimeraAsambleaServiceTest extends BaseServicioTest {
	
	@Autowired
	private PrimeraAsambleaService primeraAsambleaService;

	@Test
	public void primeraAsambleaServiceTest(){
		Assert.notNull(primeraAsambleaService);
	}

	@Test
	public void savePrimeraAsambleaTest(){
		int numRecords = 0;
		try{
			PrimeraAsambleaVO primeraAsambleaVO = CreateTestData.getPrimeraAsambleaBean();
			numRecords = primeraAsambleaService.savePrimeraAsamblea(primeraAsambleaVO);
			System.out.println(numRecords);
			Assert.isTrue(numRecords==1);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	@Test
	public void selectPrimeraAsambleaTest(){
		try{
			PrimeraAsambleaVO primeraAsamblea =
					primeraAsambleaService.selectPrimeraAsamblea(40,null);
			System.out.println(primeraAsamblea);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

	
	@Test
	public void selectPrimeraAsambleaTestActa(){
		try{
			PrimeraAsambleaVO primeraAsamblea =
					primeraAsambleaService.selectPrimeraAsamblea(45,"1");
			System.out.println(primeraAsamblea);
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}

}
