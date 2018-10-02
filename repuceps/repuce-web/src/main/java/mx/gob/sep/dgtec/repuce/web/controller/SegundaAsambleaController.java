package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraSesionService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaAsambleaService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaSesionService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ComiteVO;
import mx.gob.sep.dgtec.repuce.vo.JsonWrapperVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsamblea1415VO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsambleaVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsambleaVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionVO;
import mx.gob.sep.dgtec.repuce.web.util.ReunionesUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/segundaAsamblea") 
public class SegundaAsambleaController {
	
	@Autowired
	private SegundaAsambleaService segundaAsambleaService;
	
	/**
	 * Consulta la informacion almacenada en la base de datos de la segunda asamblea.
	 * @param cCct La clave del CCT cuya Segunda Sesion sera consultada
	 * @return
	 */
	@RequestMapping(value = "/select/{cCct}", method=RequestMethod.GET)
	@ResponseBody
	public SegundaAsambleaVO selectSegundaAsamblea(@PathVariable Integer cCct){
		
		SegundaAsambleaVO segundaAsambleaVO = new SegundaAsambleaVO();
		
		try{
			segundaAsambleaVO = segundaAsambleaService.selectSegundaAsamblea(cCct);
		}catch(Exception e){
			e.printStackTrace();
		}
		return segundaAsambleaVO;	
	}
	
	@RequestMapping(value = "/select1415/{cCct}", method=RequestMethod.GET)
	@ResponseBody
	public SegundaAsamblea1415VO selectSegundaAsamblea1415(@PathVariable Integer cCct){
		
		SegundaAsamblea1415VO segundaAsambleaVO = new SegundaAsamblea1415VO();
		
		try{
			segundaAsambleaVO = segundaAsambleaService.selectSegundaAsamblea1415(cCct);
		}catch(Exception e){
			e.printStackTrace();
		}
		return segundaAsambleaVO;	
	}

	/**
	 * Guarda la informacion de la Segunda Asamblea
	 * para un CCT dado
	 * @return Numero de Segundas registros insertados o modificados
	 * @throws Exception
	 */
    @RequestMapping(value="/saveSegundaAsamblea", method=RequestMethod.POST)
    @ResponseBody
	public int savePrimeraAsamblea(@RequestBody SegundaAsambleaVO segundaAsambleaVO,
			Principal principal) throws Exception{
        int numRecords = -1;
        final String currentUser = principal.getName();
        segundaAsambleaVO.getCeSesion().setUsrCaptura(currentUser);
        String cadenaAutenticidad = ReunionesUtil.generaCadenaHash(segundaAsambleaVO, 
        		Constants.SEGUNDA_SESION, 
        		segundaAsambleaVO.getCeSesion().getFchSesion().toString());
        segundaAsambleaVO.getCeSesion().setCadena(cadenaAutenticidad);
        
        numRecords = segundaAsambleaService.saveSegundaAsamblea(segundaAsambleaVO);

        return numRecords;
    }  

    @RequestMapping(value="/saveSegundaAsamblea1415", method=RequestMethod.POST)
    @ResponseBody
	public int saveSegundaAsamblea1415(@RequestBody SegundaAsamblea1415VO segundaAsambleaVO,
			Principal principal) throws Exception{
    	
    	System.out.println("Controller... Save segunda asamblea... Inicio");
        int numRecords = -1;
        final String currentUser = principal.getName();
        
        segundaAsambleaVO.getCeSesion().setUsrCaptura(currentUser);
        
        String cadenaAutenticidad = ReunionesUtil.generaCadenaHash(segundaAsambleaVO, 
        		Constants.SEGUNDA_ASAMBLEA, 
        		segundaAsambleaVO.getCeSesion().getFchSesion().toString());
        segundaAsambleaVO.getCeSesion().setCadena(cadenaAutenticidad);
        
        numRecords = segundaAsambleaService.saveSegundaAsamblea1415(segundaAsambleaVO);

        System.out.println("Controller... Save segunda asamblea... Fin");
        
        return numRecords;
    }  

	/**
	 * Elimina la Segunda Asamblea para un CCT dado
	 * @return Numero de registros eliminadas
	 * @throws Exception
	 */
    @RequestMapping(value="/delete/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public int deleteSegundaAsamblea(@PathVariable Integer cCct) throws Exception{
    	int numRecords = -1;
        
    	numRecords = segundaAsambleaService.deleteSegundaAsamblea(cCct);      
        return numRecords;
    }    

    @RequestMapping(value="/delete1415/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public int deleteSegundaAsamblea1415(@PathVariable Integer cCct) throws Exception{
    	int numRecords = -1;
        
    	numRecords = segundaAsambleaService.deleteSegundaAsamblea1415(cCct,1);      
        return numRecords;
    }    
    
}
