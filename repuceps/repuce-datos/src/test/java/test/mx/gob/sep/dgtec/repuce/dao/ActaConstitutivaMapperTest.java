package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.ActaConstitutivaMapper;
import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class ActaConstitutivaMapperTest extends BaseDaoTest {
	
	@Autowired
	private ActaConstitutivaMapper actaConstitutivaMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(actaConstitutivaMapper);
	}
	
	@Test
	public void selectActaConstitutivaTest(){

		try{
			ActaConstitutivaVO actaConstitutivaVO = actaConstitutivaMapper.selectActaConstitutiva(97);
			System.out.println("reunion "+actaConstitutivaVO.getReunion().getcReunion());
			Assert.assertNotNull(actaConstitutivaVO);

			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(actaConstitutivaVO));

			Assert.assertNotNull(actaConstitutivaVO.getApec());
			Assert.assertNotNull(actaConstitutivaVO.getReunion());
			Assert.assertEquals(3,actaConstitutivaVO.getIntegrantes().size());
			Assert.assertEquals(1,actaConstitutivaVO.getInstructores().size());
			Assert.assertEquals(2,actaConstitutivaVO.getAsistentes().size());
			
		}catch(Exception ex){
			ex.printStackTrace();
			Assert.fail();
		}
	}
	
}
