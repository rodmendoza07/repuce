package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.CuartaSesionMapper;
import mx.gob.sep.dgtec.repuce.vo.CuartaSesionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class CuartaSesionMapperTest extends BaseDaoTest {
	
	@Autowired
	private CuartaSesionMapper cuartaSesionMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(cuartaSesionMapper);
	}
	
	@Test
	public void selectCuartaSesionTest(){

		try{
			CuartaSesionVO cuartaSesionVO = cuartaSesionMapper.selectCuartaSesion(100);
			
			Assert.assertNotNull(cuartaSesionVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(cuartaSesionVO));

			Assert.assertNotNull(cuartaSesionVO.getCctViewVO());
			Assert.assertNotNull(cuartaSesionVO.getCeSesion());
			Assert.assertEquals(6,cuartaSesionVO.getActividades().size());
			Assert.assertEquals(8,cuartaSesionVO.getProgramas().size());
			Assert.assertEquals(5,cuartaSesionVO.getComites().size());
			Assert.assertEquals(1,cuartaSesionVO.getRecursos().size());
			Assert.assertEquals(2,cuartaSesionVO.getMejoras().size());
			Assert.assertEquals(3,cuartaSesionVO.getEventos().size());
			Assert.assertNotNull(cuartaSesionVO.getPlaneacion());
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	
	}

	
	@Test
	public void isInformeAccesibleTest(){
	
		try{
			boolean result = cuartaSesionMapper.isInformeAccesible(8);
			Assert.assertFalse(result);
	
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}
}
