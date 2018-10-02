package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.InformeTransparenciaMapper;
import mx.gob.sep.dgtec.repuce.vo.InformeTransparenciaVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class InformeTransparenciaMapperTest extends BaseDaoTest {
	
	@Autowired
	private InformeTransparenciaMapper informeTransparenciaMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(informeTransparenciaMapper);
	}
	
	@Test
	public void selectInformeTransparenciaTest(){

		try{
			InformeTransparenciaVO informeTransparenciaVO 
				= informeTransparenciaMapper.selectInformeTransparencia(100);
			
			Assert.assertNotNull(informeTransparenciaVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(informeTransparenciaVO));

			Assert.assertNotNull(informeTransparenciaVO.getCctViewVO());
			Assert.assertNotNull(informeTransparenciaVO.getCeSesion());
			Assert.assertEquals(15,informeTransparenciaVO.getProgramas().size());
			Assert.assertEquals(5,informeTransparenciaVO.getComites().size());
			Assert.assertEquals(3,informeTransparenciaVO.getRecursos().size());
			Assert.assertEquals(2,informeTransparenciaVO.getMejoras().size());
			Assert.assertEquals(3,informeTransparenciaVO.getEventos().size());
			Assert.assertNotNull(informeTransparenciaVO.getPlaneacion());

			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
		
	}
	
}
