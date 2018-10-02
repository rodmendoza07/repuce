package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.PrimeraSesionMapper;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class PrimeraSesionMapperTest extends BaseDaoTest {
	
	@Autowired
	private PrimeraSesionMapper primeraSesionMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(primeraSesionMapper);
	}
	
	
	@Test
	public void selectPrimeraSesionTest(){

		try{
			PrimeraSesionVO primeraSesionVO = primeraSesionMapper.selectPrimeraSesion(60);
			
			Assert.assertNotNull(primeraSesionVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(primeraSesionVO));

			Assert.assertNotNull(primeraSesionVO.getCctViewVO());
			Assert.assertNotNull(primeraSesionVO.getCeSesion());
			Assert.assertEquals(5,primeraSesionVO.getComites().size());
			Assert.assertEquals(5,primeraSesionVO.getIntegrantesComites().size());
			Assert.assertEquals(8,primeraSesionVO.getProgramas().size());
			Assert.assertEquals(3,primeraSesionVO.getRecursos().size());
			Assert.assertNotNull(primeraSesionVO.getPlaneacion());
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}

	}

}
