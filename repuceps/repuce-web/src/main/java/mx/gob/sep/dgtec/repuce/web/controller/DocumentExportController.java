package mx.gob.sep.dgtec.repuce.web.controller;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CCctCstm;
import mx.gob.sep.dgtec.repuce.servicios.ReportesService;
import mx.gob.sep.dgtec.repuce.servicios.SolrSearchService;
import mx.gob.sep.dgtec.repuce.vo.SolrQueryVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


/**
 * Controller que manda a imprimir las actas y minutas
 * 
 * @author Ismael Rosas
 * 
 */
@Controller
@RequestMapping(value = "/exportarDocumentos")
public class DocumentExportController {
	
	@Autowired
	private SolrSearchService solrSearchService;

	@Autowired
	private ReportesService reportesService;


	@RequestMapping(value = "/resultadosBusqueda", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView exportDocument(@RequestParam String query,
    		@RequestParam List<String> fieldList,
    		@RequestParam List<String> fieldsLabels) throws Exception{

		ModelAndView mav = new ModelAndView("excelDocument");  

		SolrQueryVO queryParams = new SolrQueryVO();
		queryParams.setQuery(query);
		queryParams.setFieldList(fieldList);
		queryParams.setFieldsLabels(fieldsLabels);
		
        mav.addObject("results", solrSearchService.selectExportResults(queryParams));  
        mav.addObject("labels",fieldsLabels);
        mav.addObject("values",fieldList);
        return mav;

    }
	
	@RequestMapping(value = "/resultadosBusqueda1", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView exportDocument1(@RequestParam String query,
    		@RequestParam List<String> fieldList,
    		@RequestParam List<String> fieldsLabels) throws Exception{

		ModelAndView mav = new ModelAndView("excelDocument");  

		SolrQueryVO queryParams = new SolrQueryVO();
		queryParams.setQuery(query);
		queryParams.setFieldList(fieldList);
		queryParams.setFieldsLabels(fieldsLabels);
		
        mav.addObject("results", solrSearchService.selectExportResults1(queryParams));  
        mav.addObject("labels",fieldsLabels);
        mav.addObject("values",fieldList);
        return mav;

    }
	
	@RequestMapping(value = "/resultadosPublico1415Consejo", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView exportPublico(
			@RequestParam Short idEntidad,@RequestParam Short idMunicipio,
    		@RequestParam Boolean consejoMun,@RequestParam Boolean apoyo,@RequestParam Boolean enlace,
    		@RequestParam Boolean joinSeguimiento,@RequestParam Boolean joinInfGral,@RequestParam Boolean statusCe) 
    				throws Exception{

    	List<CCctCstm> cCcts = reportesService.searchCesPublicoPorMunicipio1415Consejo(idEntidad, 
    			idMunicipio, consejoMun, apoyo, enlace,
				joinSeguimiento,joinInfGral,statusCe);
    	String [] labels = {"CCT","Nombre de la escuela","Turno","Nivel","Subnivel","Domicilio","Colonia","Codigo Postal","Genero del presidente","Calidad del secretario","Integrantes"};
		
		ModelAndView mav = new ModelAndView("excelPublico");  

		mav.addObject("cCcts", cCcts);
		mav.addObject("labels", labels);
        
        return mav;

    }

	@RequestMapping(value = "/resultadosPublicoConPrograma", method = RequestMethod.GET)
	@ResponseBody
	public ModelAndView exportPublico2(
			@RequestParam Short idEntidad,@RequestParam Short idMunicipio,
    		@RequestParam Boolean consejoMun,@RequestParam Boolean apoyo,@RequestParam Boolean enlace,
    		@RequestParam Boolean joinSeguimiento,@RequestParam Boolean joinInfGral,@RequestParam Boolean statusCe) 
    				throws Exception{

    	List<CCctCstm> cCcts = reportesService.searchCesPublicoPorMunicipio1415Programas(idEntidad, idMunicipio, consejoMun, apoyo, enlace, joinSeguimiento, joinInfGral, statusCe);
    	String [] labels = {"CCT","Nombre de la escuela","Turno","Nivel","Subnivel","Domicilio","Colonia","Codigo Postal","Genero del presidente","Calidad del secretario","Integrantes","Programa","Monto"};
		
		ModelAndView mav2 = new ModelAndView("excelPublico2");  

		mav2.addObject("cCcts", cCcts);
		mav2.addObject("labels", labels);
        
        return mav2;

    }
	
}
