/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.gob.sep.dgtec.repuce.web.controller;

import java.util.List;

import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.servicios.ReunionesService;
import mx.gob.sep.dgtec.repuce.vo.ReunionesRealizadasVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author cvalencia
 */
@Controller
@RequestMapping("/reuniones")
public class ReunionesController {

	@Autowired
	private ReunionesService reunionesService;
	
    
	/**
	 * Trae los datos de las sesiones y asambleas para un CCT dado
	 * @return Datos de las sesiones y Asambleas.
	 * @throws Exception
	 */
    @RequestMapping(value="/listReuniones/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	ReunionesRealizadasVO searchReuniones(@PathVariable Integer cCct)
			throws Exception{
        
    	return reunionesService.searchReunionesRegistradas(cCct);
    }
    
	/**
	 * Trae los datos de las reuniones para una APEC dada
	 * @return La lista de las reuniones capturadas
	 * @throws Exception
	 */
    @RequestMapping(value="/listReunionesApec/{idEnidadfed}/{idMunicipio}/{idLocalidad}", 
    		method=RequestMethod.GET)
    @ResponseBody
    List<ApecReunion> searchReunionesApec(@PathVariable Short idEnidadfed,
    			@PathVariable Integer idMunicipio,
    			@PathVariable Integer idLocalidad)
    		throws Exception{
    	
    	return reunionesService.searchReunionesApec(idEnidadfed,idMunicipio,idLocalidad);
    }
}
