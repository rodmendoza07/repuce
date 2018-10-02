package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;

import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;
import mx.gob.sep.dgtec.repuce.dao.ActaConstitutivaMapper;
import mx.gob.sep.dgtec.repuce.servicios.ActaConstitutivaService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.web.util.ReunionesUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/actaConstitutiva")
public class ActaConstitutivaController {

	@Autowired
	private ActaConstitutivaService actaConstitutivaService;
	@Autowired
    private ActaConstitutivaMapper actaConstitutivaMapper;

	
	@RequestMapping(value = "/select/{cApec}", method=RequestMethod.GET)
	@ResponseBody
	public ActaConstitutivaVO selectActaConstitutiva(
			@PathVariable Integer cApec)	throws Exception{

		ActaConstitutivaVO actaConstitutivaVO = new ActaConstitutivaVO();
		actaConstitutivaVO = actaConstitutivaService.selectActaConstitutiva(cApec);

		return actaConstitutivaVO;	
	}

	 
	/**
	 * Guarda la informacion de la Acta Constitutiva
	 * para un APEC dado
	 * @return Numero de Consejos registrados o modificados
	 * @throws Exception
	 */
    @RequestMapping(value="/save", method=RequestMethod.POST)
    @ResponseBody
	public int saveActaConstitutiva(@RequestBody ActaConstitutivaVO actaConstitutivaVO,
			Principal principal) throws Exception{
        int numRecords = 0;
        
        
        final String currentUser = principal.getName();
        String cadenaAutenticidad = "";
        
        cadenaAutenticidad = ReunionesUtil.generaCadenaConafeHash(actaConstitutivaVO, 
        		Constants.ACTA_CONSTITUTIVA, 
        		actaConstitutivaVO.getReunion().getFchReunion().toString());

        actaConstitutivaVO.getReunion().setUsrCaptura(currentUser);        
        actaConstitutivaVO.getReunion().setCadena(cadenaAutenticidad);        
        
        numRecords = actaConstitutivaService.saveActaConstitutiva(
        		actaConstitutivaVO);

        return numRecords;
    }   
    
    /**
	 * Elimina la informaci[on de la acta constitutiva
	 * @return Lista de integrantes en formato JSON.
	 * @throws Exception
	 */
    @RequestMapping(value="/delete/{cApec}" , method=RequestMethod.GET)
    @ResponseBody
	public int delete(@PathVariable Integer cApec) throws Exception{
    	int numRecords = -1;
        
    	numRecords = actaConstitutivaService.deleteActaConstitutiva(cApec);      
        return numRecords;
    }  
    
} // Fin de la Clase ActaConstitutivaController