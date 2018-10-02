package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.SegundaSesionMapper;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class SegundaSesionMapperTest extends BaseDaoTest {
	
	@Autowired
	private SegundaSesionMapper segundaSesionMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(segundaSesionMapper);
	}
	
	
	@Test
	public void selectSegundaSesionTest(){

		try{
			SegundaSesionVO segundaSesionVO = segundaSesionMapper
					.selectSegundaSesion(70);
			
			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(segundaSesionVO));

			Assert.assertNotNull(segundaSesionVO);

			Assert.assertNotNull(segundaSesionVO.getCctViewVO());
			Assert.assertNotNull(segundaSesionVO.getCeSesion());
			Assert.assertEquals(1,segundaSesionVO.getActividades().size());
			Assert.assertEquals(7,segundaSesionVO.getResultadosEnlace().size());
			Assert.assertEquals(1,segundaSesionVO.getMetas().size());
			Assert.assertEquals(0,segundaSesionVO.gethMetas().size());
			Assert.assertEquals(2,segundaSesionVO.getCompromisos().size());
			Assert.assertNotNull(segundaSesionVO.getIndicadorEnlace());

		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}
	
}
