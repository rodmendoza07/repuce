package test.mx.gob.sep.dgtec.repuce.dao;

import java.util.List;

import mx.gob.sep.dgtec.repuce.dao.ReportesMapper;
import mx.gob.sep.dgtec.repuce.model.CCctCstm;

import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class ReportesMapperTest extends BaseDaoTest {
	
	@Autowired
	private ReportesMapper reportesMapper;
	
	@Test
	public void beanTest(){
		Assert.assertNotNull(reportesMapper);
	}
	
	@Test
	public void countByTest(){
		Integer count = reportesMapper.countBy(new Short("1"),new Short("1"),
				true,true,true,true,true,true);
		System.out.println("count: " + count);
		
		Assert.assertEquals(new Integer(1), count);
	}
	
	@Test
	public void selectReporteMunicipalTest(){
		List<CCctCstm> cCctList = reportesMapper.selectReporteMunicipal(new Short("1"),new Short("1"), 
				true,true,true,true,true,true);
		System.out.println("count: " + cCctList.size());
		
		Assert.assertEquals(1, cCctList.size());
	}
	
}
