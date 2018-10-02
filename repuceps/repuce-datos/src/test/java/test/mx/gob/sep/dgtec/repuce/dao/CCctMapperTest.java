package test.mx.gob.sep.dgtec.repuce.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import mx.gob.sep.dgtec.repuce.dao.CCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CCctMapperCstm;
import mx.gob.sep.dgtec.repuce.model.CCctExample;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class CCctMapperTest extends BaseDaoTest {
	
	@Autowired
	private CCctMapper cCctMapper;
	
	@Autowired
	private CCctMapperCstm cCctMapperCstm;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(cCctMapper);
	}
	
	@Test
	public void countByExampleTest(){
		CCctExample cCct = new CCctExample();
		
		Integer id = cCctMapper.countByExample(cCct);
		
		System.out.println("id: " + id);
		Assert.assertEquals(new Integer(257678), id);
	}
	
	@Test
	public void selectCCtsPorLocalidad(){
		
		Map<String, String> params = new HashMap<String, String>();
		
		params.put("idEnt","1");
		params.put("idMun","1");
		params.put("idLoc","1");
		
		List<CCctLight> cCts = cCctMapperCstm.selectCCtsPorLocalidad(params);
		
		Assert.assertEquals(2, cCts.size());
		
	}

	
}
