package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.TerceraSesionMapper;
import mx.gob.sep.dgtec.repuce.vo.TerceraSesionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class TerceraSesionMapperTest extends BaseDaoTest {
	
	@Autowired
	private TerceraSesionMapper terceraSesionMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(terceraSesionMapper);
	}
	
	@Test
	public void selectTerceraSesionTest(){

		try{
			TerceraSesionVO terceraSesionVO = terceraSesionMapper.selectTerceraSesion(90);
			
			Assert.assertNotNull(terceraSesionVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(terceraSesionVO));

			Assert.assertNotNull(terceraSesionVO.getCctViewVO());
			Assert.assertNotNull(terceraSesionVO.getCeSesion());
			Assert.assertEquals(3,terceraSesionVO.getActividades().size());
			Assert.assertEquals(8,terceraSesionVO.getProgramas().size());
			Assert.assertEquals(3,terceraSesionVO.getEventos().size());
			Assert.assertNotNull(terceraSesionVO.getSeguimientoMunicipal());
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	
	}
	

	
}
