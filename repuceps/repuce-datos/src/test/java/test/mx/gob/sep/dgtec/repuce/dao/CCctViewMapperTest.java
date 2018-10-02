package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.CCctViewMapper;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class CCctViewMapperTest extends BaseDaoTest {
	
	@Autowired
	private CCctViewMapper cCctViewMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(cCctViewMapper);
	}
	
	
	@Test
	public void selectCCctViewTest(){

		CCctViewVO cCctViewVO = cCctViewMapper.selectCCctView(80, Constants.SEGUNDA_ASAMBLEA);
		
		try{
			ObjectMapper mapper = new ObjectMapper();
			System.out.println(mapper.writeValueAsString(cCctViewVO));
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		Assert.assertNotNull(cCctViewVO);
		Assert.assertEquals(new Integer(80), cCctViewVO.getcCct());
	}
	
}
