package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;

import mx.gob.sep.dgtec.repuce.servicios.TerceraAsambleaService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ReunionVO;
import mx.gob.sep.dgtec.repuce.web.util.ReunionesUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/terceraAsamblea") 
public class TerceraAsambleaController {
	
	@Autowired
	private TerceraAsambleaService terceraAsambleaService;
	
	/**
	 * Consulta la informacion almacenada en la base de datos de la cuarta sesion.
	 * @param cCct La clave del CCT cuya Cuarta Sesion sera consultada
	 * @return
	 */
	@RequestMapping(value = "/select/{cCct}", method=RequestMethod.GET)
	@ResponseBody
	public ReunionVO selectTerceraAsamblea(@PathVariable Integer cCct){
		
		ReunionVO terceraAsambleaVO = new ReunionVO();
		
		try{
			terceraAsambleaVO = terceraAsambleaService.selectTerceraAsamblea(cCct);
		}catch(Exception e){
			e.printStackTrace();
		}
		return terceraAsambleaVO;	
	}
	
	/**
	 * Guarda la informacion de la cuarta sesion
	 * para un CCT dado
	 * @return Numero de minutas registradas
	 * @throws Exception
	 */
    @RequestMapping(value="/saveTerceraAsamblea", method=RequestMethod.POST)
    @ResponseBody
	public int saveTerceraAsamblea(@RequestBody ReunionVO terceraAsambleaVO,
			Principal principal) throws Exception{
        int numRecords = -1;
        final String currentUser = principal.getName();
        terceraAsambleaVO.getCeSesion().setUsrCaptura(currentUser);
        String cadenaAutenticidad = ReunionesUtil.generaCadenaHash(terceraAsambleaVO, 
        		Constants.CUARTA_SESION, 
        		terceraAsambleaVO.getCeSesion().getFchSesion().toString());
        terceraAsambleaVO.getCeSesion().setCadena(cadenaAutenticidad);
        
        numRecords = terceraAsambleaService.saveTerceraAsamblea(terceraAsambleaVO);

        return numRecords;
    }  
    
	/**
	 * Elimina la Cuarta Sesion para un CCT dado
	 * @return Numero de registros eliminadas
	 * @throws Exception
	 */
    @RequestMapping(value="/delete/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public int deleteTerceraAsamblea(@PathVariable Integer cCct) throws Exception{
    	int numRecords = -1;
        
    	numRecords = terceraAsambleaService.deleteTerceraAsamblea(cCct);      
        return numRecords;
    }    
    
}
