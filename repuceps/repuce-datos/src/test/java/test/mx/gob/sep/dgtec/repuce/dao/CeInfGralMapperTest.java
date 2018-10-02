package test.mx.gob.sep.dgtec.repuce.dao;

import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class CeInfGralMapperTest extends BaseDaoTest {
	
	@Autowired
	private CeInfGralMapper ceInfGralMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(ceInfGralMapper);
	}
	
	@Test
	public void selectByPrimaryKeyTest(){
		CeInfGral ceInfGral = ceInfGralMapper.selectByPrimaryKey(1);
		
		Assert.assertNotNull("Elemento Nulo", ceInfGral);
	
		ceInfGral = ceInfGralMapper.selectByPrimaryKey(-1);
		Assert.assertNull("Elemento Nulo", ceInfGral);
	}
}
