/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.repuce.dao.PrimeraAsambleaMapper;
import mx.gob.sep.dgtec.repuce.model.CeIntegrante;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteCstm;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraAsambleaService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.JsonWrapperVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;
import mx.gob.sep.dgtec.repuce.web.util.ReunionesUtil;
import mx.gob.sep.dgtec.repuce.model.CeDenuncia;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author cvalencia
 */
@Controller
@RequestMapping("/primeraAsamblea")
public class PrimeraAsambleaController {

	@Autowired
	private PrimeraAsambleaService primeraAsambleaService;
	@Autowired
	private PrimeraAsambleaMapper primeraAsambleaMapper;
	
	@RequestMapping(value = "/select/{cCct}/{acta}", method=RequestMethod.GET)
	@ResponseBody
	public PrimeraAsambleaVO selectPrimeraAsamblea(@PathVariable Integer cCct,
			@PathVariable String acta)
			throws Exception{
		
		PrimeraAsambleaVO primeraAsambleaVO=new PrimeraAsambleaVO();
		
		primeraAsambleaVO = primeraAsambleaService.selectPrimeraAsamblea(cCct,acta);

		return primeraAsambleaVO;	
	}
	
	/**
	 * Trae la lista de los integrantes de la primera asamblea
	 * @return Lista de integrantes en formato JSON.
	 * @throws Exception
	 */
    @RequestMapping(value="/searchIntegrantesComite/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	JsonWrapperVO searchIntegrantesComite(@PathVariable Integer cCct)
			throws Exception{
        
    	JsonWrapperVO integrantes = new JsonWrapperVO();
        	
    	List<CeIntegrante> intCom = primeraAsambleaService.selectIntegrantes(cCct);
    	for(CeIntegrante integrante : intCom){
    		integrante.setNombreIntegrante(integrante.getNombreIntegrante() + " " 
    				+ integrante.getPaternoIntegrante()  + " "
    				+ integrante.getMaternoIntegrante());
    	}
    	integrantes.setItems(intCom);
    	integrantes.setLabel("nombreIntegrante");
    	integrantes.setIdentifier("cscIntegrante");
        
        return integrantes;
    }
    
	/**
	 * Trae la lista de los integrantes de la primera asamblea
	 * @return Lista de integrantes en formato JSON.
	 * @throws Exception
	 */
    @RequestMapping(value="/searchIntegrante/{cCct}/{cscIntegrante}" , 
    		method=RequestMethod.GET)
    @ResponseBody
	public CeIntegranteCstm searchIntegrante(@PathVariable Integer cCct, 
			@PathVariable Short cscIntegrante){
        
        	return primeraAsambleaMapper.selectIntegrante(cCct,cscIntegrante);
    }
    
    /**
	 * Trae la lista de los integrantes de la primera asamblea
	 * @return Lista de integrantes en formato JSON.
	 * @throws Exception
	 */
    @RequestMapping(value="/searchIntegrantes/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	JsonWrapperVO searchIntegrantes(@PathVariable Integer cCct)
			throws Exception{
        
    	JsonWrapperVO integrantes = new JsonWrapperVO();
        
    	integrantes.setItems(
    			primeraAsambleaService.selectIntegrantes(cCct));
    	integrantes.setIdentifier("cscIntegrante");

        return integrantes;
    }
    

	/**
	 * Guarda la informacion de la Primera Asamblea
	 * para un CCT dado
	 * @return Numero de Consejos registrados o modificados
	 * @throws Exception
	 */
    @RequestMapping(value="/savePrimeraAsamblea", method=RequestMethod.POST)
    @ResponseBody
	public int savePrimeraAsamblea(@RequestBody PrimeraAsambleaVO primeraAsambleaVO,
			Principal principal) throws Exception{
    	System.out.println("Mensaje 1");
        int numRecords = 0;
        System.out.println("Mensaje 2");        
        final String currentUser = principal.getName();
        System.out.println("Mensaje 3");
        primeraAsambleaVO.getCeSesion().setUsrCaptura(currentUser);
        System.out.println("Mensaje 4");
        String cadenaAutenticidad = "";
        System.out.println("Mensaje 5");
        cadenaAutenticidad = ReunionesUtil.generaCadenaHash(primeraAsambleaVO, 
        		Constants.PRIMERA_ASAMBLEA, 
        		primeraAsambleaVO.getCeSesion().getFchSesion().toString());
        
        System.out.println("Mensaje 6");
        primeraAsambleaVO.getCeSesion().setCadena(cadenaAutenticidad);
        System.out.println("Mensaje 7");
        
        numRecords = primeraAsambleaService.savePrimeraAsamblea(primeraAsambleaVO);
        System.out.println("Mensaje 8");
        return numRecords;
    }    
    
    
	/**
	 * Elimina la informaci[on de la Primera Asamblea
	 * @return Lista de integrantes en formato JSON.
	 * @throws Exception
	 */
    @RequestMapping(value="/delete/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public int delete(@PathVariable Integer cCct) throws Exception{
    	int numRecords = -1;
        
    	numRecords = primeraAsambleaService.deletePrimeraAsamblea(cCct);      
        return numRecords;
    }
    
    @RequestMapping(value="/saveDenuncia", method=RequestMethod.POST)
    @ResponseBody
	public int saveDenuncia(@RequestBody CeDenuncia ceDenuncia) throws Exception{
    	System.out.println("entro al controlador");
        int numRecords = 0;
        
        ceDenuncia.setFchRegistro(new Date());
        numRecords = primeraAsambleaService.saveDenuncia(ceDenuncia);
        
        return numRecords;
    }    
    
}
