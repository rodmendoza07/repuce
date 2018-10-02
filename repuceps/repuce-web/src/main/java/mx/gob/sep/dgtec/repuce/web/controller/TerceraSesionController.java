package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;

import mx.gob.sep.dgtec.repuce.servicios.TerceraSesionService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.TerceraSesionVO;
import mx.gob.sep.dgtec.repuce.web.util.ReunionesUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/terceraSesion") 
public class TerceraSesionController {
	
	@Autowired
	private TerceraSesionService terceraSesionService;
	
	/**
	 * Consulta la informacion almacenada en la base de datos de la tercera sesion.
	 * @param cCct La clave del CCT cuya Tercera Sesion sera consultada
	 * @return
	 */
	@RequestMapping(value = "/select/{cCct}", method=RequestMethod.GET)
	@ResponseBody
	public TerceraSesionVO selectTerceraSesion(@PathVariable Integer cCct){
		
		TerceraSesionVO terceraSesionVO = new TerceraSesionVO();
		
		try{
			terceraSesionVO = terceraSesionService.selectTerceraSesion(cCct);
		}catch(Exception e){
			e.printStackTrace();
		}
		return terceraSesionVO;	
	}

	/**
	 * Guarda la informacion de la tercera sesion
	 * para un CCT dado
	 * @return Numero de minutas registradas
	 * @throws Exception
	 */
    @RequestMapping(value="/saveTerceraSesion", method=RequestMethod.POST)
    @ResponseBody
	public int saveTerceraSesion(@RequestBody TerceraSesionVO terceraSesionVO,
			Principal principal) throws Exception{
        int numRecords = -1;
        final String currentUser = principal.getName();
        terceraSesionVO.getCeSesion().setUsrCaptura(currentUser);
        String cadenaAutenticidad = ReunionesUtil.generaCadenaHash(terceraSesionVO, 
        		Constants.TERCERA_SESION, 
        		terceraSesionVO.getCeSesion().getFchSesion().toString());
        terceraSesionVO.getCeSesion().setCadena(cadenaAutenticidad);
        
        numRecords = terceraSesionService.saveTerceraSesion(terceraSesionVO);

        return numRecords;
    }  
    
	/**
	 * Elimina la Tercera Sesion para un CCT dado
	 * @return Numero de registros eliminadas
	 * @throws Exception
	 */
    @RequestMapping(value="/delete/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public int deleteTerceraSesion(@PathVariable Integer cCct) throws Exception{
    	int numRecords = -1;
        
    	numRecords = terceraSesionService.deleteTerceraSesion(cCct);      
        return numRecords;
    }    
    
}
