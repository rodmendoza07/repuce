package mx.gob.sep.dgtec.repuce.servicios;

import java.util.List;

import mx.gob.sep.dgtec.repuce.vo.RepConsejosNacionalVO;
import mx.gob.sep.dgtec.repuce.vo.SolrQueryVO;

import org.apache.solr.common.SolrDocumentList;


public interface SolrSearchService {
	
	public List<RepConsejosNacionalVO> selectReporteMvtosNacional();
	public List<RepConsejosNacionalVO> selectReporteMvtosNacional2();
	
	public SolrDocumentList selectExportResults(SolrQueryVO queryParam);
	public SolrDocumentList selectExportResults1(SolrQueryVO queryParam);
	
}
