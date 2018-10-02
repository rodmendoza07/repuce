package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.CeSesionMapper;
import mx.gob.sep.dgtec.repuce.model.CeSesionExample;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class CeSesionMapperTest extends BaseDaoTest {
	
	
	@Autowired
	private CeSesionMapper cCeSesionMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(cCeSesionMapper);
	}
	
	@Test
	public void countByExampleTest(){
		CeSesionExample example = new CeSesionExample();
		example.createCriteria().andCCctEqualTo(-1);
		
		Integer id = cCeSesionMapper.countByExample(example);
		
		System.out.println("id: " + id);
		Assert.assertEquals(new Integer(0), id);
	}
	
}
