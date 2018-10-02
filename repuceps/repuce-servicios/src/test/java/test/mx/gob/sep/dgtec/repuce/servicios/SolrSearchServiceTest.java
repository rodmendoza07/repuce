package test.mx.gob.sep.dgtec.repuce.servicios;


import java.util.Arrays;

import mx.gob.sep.dgtec.repuce.servicios.SolrSearchService;
import mx.gob.sep.dgtec.repuce.vo.SolrQueryVO;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

public class SolrSearchServiceTest extends BaseServicioTest {
	
	@Autowired
	private SolrSearchService solrSearchService;

	@Test
	public void solrSearchServiceTest(){
		Assert.notNull(solrSearchService);
	}
	
	
	
	@Test
	public void selectReporteMvtosNacionalTest(){
		try{
			solrSearchService.selectReporteMvtosNacional();
		}catch(Exception e){
			e.printStackTrace();
			Assert.isTrue(false);
		}
	}
	
	
	@Test
	public void selectExportResultsTest(){
		SolrQueryVO query = new SolrQueryVO();
		query.setQuery("cveEntidad:1");
		query.setFieldList(Arrays.asList(new String[]{"cveCct","turno","nombreCCT","entidad"}));
		query.setRows(250000);
		
		solrSearchService.selectExportResults(query);
		
	}

}
