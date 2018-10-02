package mx.gob.sep.dgtec.repuce.web.controller;

import java.util.ArrayList;
import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CCctCstm;
import mx.gob.sep.dgtec.repuce.servicios.ReportesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/reportes")
public class ReportesController {
	@Autowired
	private ReportesService reportesService;
	//reporte del modulo 1 checa archivo
	@RequestMapping(value="/hasCm/{idEnt}/{idMun}", method=RequestMethod.GET)
    @ResponseBody
	public Boolean hasCm(@PathVariable Short idEnt, @PathVariable Integer idMun) {
    	Boolean has = new Boolean(false);
    	try {
    		has = reportesService.hasCm(idEnt,idMun);

        } catch (Exception e) {
           e.printStackTrace();
        }
        return has;
	}
	//reporte 1 pregunta de conocimiento del municipio
	@RequestMapping(value="/countCePubMun1415", method=RequestMethod.GET)
    @ResponseBody
    public Integer countCesPublicoPorMunicipio1415(@RequestParam Short idEntidad,@RequestParam Short idMunicipio,
    		@RequestParam Boolean consejoMun,@RequestParam Boolean apoyo,@RequestParam Boolean enlace,
    		@RequestParam Boolean joinSeguimiento,@RequestParam Boolean joinInfGral,@RequestParam Boolean statusCe){
		Integer count = new Integer(0);
		try {
			count = reportesService.countCesPublicoPorMunicipio1415(idEntidad, idMunicipio, consejoMun, apoyo, enlace, joinSeguimiento,joinInfGral,statusCe);
        } catch (Exception e) {
           e.printStackTrace();
        }
		return count;
	}
	
	//reporte 2 lista de cct con consejo escolar
	@RequestMapping(value="/cesPubMun1415", method=RequestMethod.GET)
    @ResponseBody
    public List<CCctCstm> searchCesPublicoPorMunicipio1415Consejos(@RequestParam Short idEntidad,@RequestParam Short idMunicipio,
    		@RequestParam Boolean consejoMun,@RequestParam Boolean apoyo,@RequestParam Boolean enlace,
    		@RequestParam Boolean joinSeguimiento,@RequestParam Boolean joinInfGral,@RequestParam Boolean statusCe){
		List<CCctCstm> cCcts = new ArrayList<CCctCstm>();
		try {
			cCcts = reportesService.searchCesPublicoPorMunicipio1415Consejo(idEntidad, idMunicipio, consejoMun, apoyo, enlace, joinSeguimiento,joinInfGral,statusCe);
        } catch (Exception e) {
           e.printStackTrace();
        }
		return cCcts;
	}
	
	
	//reporte 3 lista de cct con programas registrados
		@RequestMapping(value="/cesPubMun1415Programas", method=RequestMethod.GET)
	    @ResponseBody
	    public List<CCctCstm> searchCesPublicoPorMunicipio1415Programas(@RequestParam Short idEntidad,@RequestParam Short idMunicipio,
	    		@RequestParam Boolean consejoMun,@RequestParam Boolean apoyo,@RequestParam Boolean enlace,
	    		@RequestParam Boolean joinSeguimiento,@RequestParam Boolean joinInfGral,@RequestParam Boolean statusCe){
			List<CCctCstm> cCcts = new ArrayList<CCctCstm>();
			try {
				cCcts = reportesService.searchCesPublicoPorMunicipio1415Programas(idEntidad, idMunicipio, consejoMun, apoyo, enlace, joinSeguimiento,joinInfGral,statusCe);
	        } catch (Exception e) {
	           e.printStackTrace();
	        }
			return cCcts;
		}
	
// reporte 2 y 3: total de cct por municipio
	@RequestMapping(value="/countCePubMunProgramas", method=RequestMethod.GET)
    @ResponseBody
    public Integer countCesPublicoPorMunicipioProgramas(@RequestParam Short idEntidad,@RequestParam Short idMunicipio,
    		@RequestParam Boolean consejoMun,@RequestParam Boolean apoyo,@RequestParam Boolean enlace,
    		@RequestParam Boolean joinSeguimiento,@RequestParam Boolean joinInfGral,@RequestParam Boolean statusCe){
		Integer count = new Integer(0);
		try {
			count = reportesService.countCesPublicoPorMunicipioProgramas(idEntidad, idMunicipio, consejoMun, apoyo, enlace, joinSeguimiento,joinInfGral,statusCe);
        } catch (Exception e) {
           e.printStackTrace();
        }
		return count;
	}
	
	
	
	@RequestMapping(value="/countCm/{idEnt}", method=RequestMethod.GET)
    @ResponseBody
    public Integer getCountCm(@PathVariable Short idEnt) {
		Integer count = new Integer(0);
    	try {
    		count = reportesService.getCountCm(idEnt);

        } catch (Exception e) {
           e.printStackTrace();
        }
        return count;
	}  	
	
	@RequestMapping(value="/countMun/{idEnt}", method=RequestMethod.GET)
    @ResponseBody
    public Integer getCountMun(@PathVariable Short idEnt) {
		Integer count = new Integer(0);
    	try {
    		count = reportesService.getCountMun(idEnt);

        } catch (Exception e) {
           e.printStackTrace();
        }
        return count;
	}  
	
	@RequestMapping(value="/cesPubMun", method=RequestMethod.GET)
    @ResponseBody
    public List<CCctCstm> searchCesPublicoPorMunicipio(@RequestParam Short idEntidad,@RequestParam Short idMunicipio,
    		@RequestParam Boolean consejoMun,@RequestParam Boolean apoyo,@RequestParam Boolean enlace,
    		@RequestParam Boolean joinSeguimiento,@RequestParam Boolean joinInfGral,@RequestParam Boolean statusCe){
		List<CCctCstm> cCcts = new ArrayList<CCctCstm>();
		try {
			cCcts = reportesService.searchCesPublicoPorMunicipio(idEntidad, idMunicipio, consejoMun, apoyo, enlace, joinSeguimiento,joinInfGral,statusCe);
        } catch (Exception e) {
           e.printStackTrace();
        }
		return cCcts;
	}
	

	
	
	@RequestMapping(value="/countCePubMun", method=RequestMethod.GET)
    @ResponseBody
    public Integer countCesPublicoPorMunicipio(@RequestParam Short idEntidad,@RequestParam Short idMunicipio,
    		@RequestParam Boolean consejoMun,@RequestParam Boolean apoyo,@RequestParam Boolean enlace,
    		@RequestParam Boolean joinSeguimiento,@RequestParam Boolean joinInfGral,@RequestParam Boolean statusCe){
		Integer count = new Integer(0);
		try {
			count = reportesService.countCesPublicoPorMunicipio(idEntidad, idMunicipio, consejoMun, apoyo, enlace, joinSeguimiento,joinInfGral,statusCe);
        } catch (Exception e) {
           e.printStackTrace();
        }
		return count;
	}
	
	
	
	
	
	}
