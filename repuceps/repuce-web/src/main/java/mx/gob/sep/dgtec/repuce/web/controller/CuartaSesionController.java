package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;

import mx.gob.sep.dgtec.repuce.servicios.CuartaSesionService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CuartaSesionVO;
import mx.gob.sep.dgtec.repuce.web.util.ReunionesUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/cuartaSesion") 
public class CuartaSesionController {
	
	@Autowired
	private CuartaSesionService cuartaSesionService;
	
	/**
	 * Consulta la informacion almacenada en la base de datos de la cuarta sesion.
	 * @param cCct La clave del CCT cuya Cuarta Sesion sera consultada
	 * @return
	 */
	@RequestMapping(value = "/select/{cCct}", method=RequestMethod.GET)
	@ResponseBody
	public CuartaSesionVO selectCuartaSesion(@PathVariable Integer cCct){
		
		CuartaSesionVO cuartaSesionVO = new CuartaSesionVO();
		
		try{
			cuartaSesionVO = cuartaSesionService.selectCuartaSesion(cCct);
		}catch(Exception e){
			e.printStackTrace();
		}
		return cuartaSesionVO;	
	}
	
	/**
	 * Guarda la informacion de la cuarta sesion
	 * para un CCT dado
	 * @return Numero de minutas registradas
	 * @throws Exception
	 */
    @RequestMapping(value="/saveCuartaSesion", method=RequestMethod.POST)
    @ResponseBody
	public int saveCuartaSesion(@RequestBody CuartaSesionVO cuartaSesionVO,
			Principal principal) throws Exception{
        int numRecords = -1;
        final String currentUser = principal.getName();
        cuartaSesionVO.getCeSesion().setUsrCaptura(currentUser);
        String cadenaAutenticidad = ReunionesUtil.generaCadenaHash(cuartaSesionVO, 
        		Constants.CUARTA_SESION, 
        		cuartaSesionVO.getCeSesion().getFchSesion().toString());
        cuartaSesionVO.getCeSesion().setCadena(cadenaAutenticidad);
        
        numRecords = cuartaSesionService.saveCuartaSesion(cuartaSesionVO);

        return numRecords;
    }  
    
	/**
	 * Elimina la Cuarta Sesion para un CCT dado
	 * @return Numero de registros eliminadas
	 * @throws Exception
	 */
    @RequestMapping(value="/delete/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public int deleteCuartaSesion(@PathVariable Integer cCct) throws Exception{
    	int numRecords = -1;
        
    	numRecords = cuartaSesionService.deleteCuartaSesion(cCct);      
        return numRecords;
    }    

	/**
	 * Valida si el informe de transparencia es imprimible
	 * @return falso o verdadero según exisntan elementos con curp capturada o no
	 * @throws Exception
	 */
    @RequestMapping(value="/isInformeAccesible/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public boolean isInformeAccesible(@PathVariable Integer cCct) throws Exception{
        
        return cuartaSesionService.isInformeAccesible(cCct);
    }      
}
