package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.TerceraAsambleaMapper;
import mx.gob.sep.dgtec.repuce.vo.ReunionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class TerceraAsambleaMapperTest extends BaseDaoTest {
	
	@Autowired
	private TerceraAsambleaMapper terceraAsambleaMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(terceraAsambleaMapper);
	}
	
	@Test
	public void selectTerceraAsambleaTest(){

		try{
			ReunionVO reunionVO = terceraAsambleaMapper.selectTerceraAsamblea(120);
			
			Assert.assertNotNull(reunionVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(reunionVO));

			Assert.assertNotNull(reunionVO.getCctViewVO());
			Assert.assertNotNull(reunionVO.getCeSesion());
			Assert.assertEquals(2,reunionVO.getActividades().size());
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
		
	}
	
}
