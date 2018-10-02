package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.SegundaAsambleaMapper;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsambleaVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class SegundaAsambleaMapperTest extends BaseDaoTest {
	
	@Autowired
	private SegundaAsambleaMapper segundaAsambleaMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(segundaAsambleaMapper);
	}
	
	
	@Test
	public void selectSegundaAsambleaTest(){

		try{
			SegundaAsambleaVO segundaAsambleaVO = segundaAsambleaMapper
					.selectSegundaAsamblea(80);
			
			Assert.assertNotNull(segundaAsambleaVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(segundaAsambleaVO));

			Assert.assertNotNull(segundaAsambleaVO.getCctViewVO());
			Assert.assertNotNull(segundaAsambleaVO.getCeSesion());
			Assert.assertEquals(6,segundaAsambleaVO.getActividades().size());
			Assert.assertEquals(5,segundaAsambleaVO.getComites().size());
			Assert.assertEquals(2,segundaAsambleaVO.getMejoras().size());
			Assert.assertEquals(8,segundaAsambleaVO.getProgramas().size());
			Assert.assertEquals(3,segundaAsambleaVO.getRecursos().size());
			Assert.assertNotNull(segundaAsambleaVO.getPlaneacion());
			Assert.assertEquals(7,segundaAsambleaVO.getResultadosEnlace().size());
			Assert.assertEquals(1,segundaAsambleaVO.getMetas().size());
			Assert.assertEquals(2,segundaAsambleaVO.getCompromisos().size());
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}
	
}
