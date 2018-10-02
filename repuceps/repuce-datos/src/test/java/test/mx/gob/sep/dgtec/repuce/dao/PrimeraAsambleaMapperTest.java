package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.PrimeraAsambleaMapper;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class PrimeraAsambleaMapperTest extends BaseDaoTest {
	
	@Autowired
	private PrimeraAsambleaMapper primeraAsambleaMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(primeraAsambleaMapper);
	}
	
	@Test
	public void selectPrimeraAsambleaTest(){

		try{
			PrimeraAsambleaVO primeraAsambleaVO = primeraAsambleaMapper.selectPrimeraAsamblea(40);
			
			Assert.assertNotNull(primeraAsambleaVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(primeraAsambleaVO));

			Assert.assertNotNull(primeraAsambleaVO.getCctViewVO());
			Assert.assertNotNull(primeraAsambleaVO.getCeInfGral());
			Assert.assertNotNull(primeraAsambleaVO.getCeSesion());
			Assert.assertEquals(2,primeraAsambleaVO.getActividades().size());
			Assert.assertEquals(4,primeraAsambleaVO.getNomConsejeros().size());
			Assert.assertEquals(3,primeraAsambleaVO.getAsistentes().size());
			Assert.assertEquals(6,primeraAsambleaVO.getIntegrantes().size());
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}
	
	@Test
	public void selectPrimeraAsambleaActaTest(){

		try{
			PrimeraAsambleaVO primeraAsambleaVO = primeraAsambleaMapper.selectPrimeraAsambleaActa(45);
			
			Assert.assertNotNull(primeraAsambleaVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(primeraAsambleaVO));

			Assert.assertNotNull(primeraAsambleaVO.getCctViewVO());
			Assert.assertNotNull(primeraAsambleaVO.getCeInfGral());
			Assert.assertNotNull(primeraAsambleaVO.getCeSesion());
			Assert.assertEquals(2,primeraAsambleaVO.getActividades().size());
			Assert.assertEquals(4,primeraAsambleaVO.getNomConsejeros().size());
			Assert.assertEquals(3,primeraAsambleaVO.getAsistentes().size());
			Assert.assertEquals(10,primeraAsambleaVO.getIntegrantes().size());
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}


}
