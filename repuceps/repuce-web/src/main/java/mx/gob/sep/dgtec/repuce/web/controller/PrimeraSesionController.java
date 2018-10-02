package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;

import mx.gob.sep.dgtec.repuce.servicios.PrimeraSesionService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionC1415VO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionVO;
import mx.gob.sep.dgtec.repuce.web.util.ReunionesUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/primeraSesion") 
public class PrimeraSesionController {
	
	@Autowired
	private PrimeraSesionService primeraSesionService;
	
    @RequestMapping(value = "/selectC1415/{cCct}", method=RequestMethod.GET)
    @ResponseBody
    public PrimeraSesionC1415VO selectPrimeraSesionC1415(@PathVariable Integer cCct){
          
          PrimeraSesionC1415VO primeraSesionVO=new PrimeraSesionC1415VO();
          
          try{
                 primeraSesionVO = primeraSesionService.selectPrimeraSesionC1415(cCct);
          }catch(Exception e){
                 e.printStackTrace();
          }
          return primeraSesionVO;    
    }


	/**
	 * Guarda la informacion de la Primera Asamblea
	 * para un CCT dado
	 * @return Numero de Consejos registrados o modificados
	 * @throws Exception
	 */
    @RequestMapping(value="/savePrimeraSesionC1415", method=RequestMethod.POST)
    @ResponseBody
       public int savePrimeraSesionC1415(@RequestBody PrimeraSesionC1415VO primeraSesionVO,
                    Principal principal) throws Exception{
       
       System.out.println("Entrando a guardar");
       System.out.println(primeraSesionVO);
        int numRecords = 0;
        final String currentUser = principal.getName();
        primeraSesionVO.getCeSesion().setUsrCaptura(currentUser);
        String cadenaAutenticidad = ReunionesUtil.generaCadenaHash(primeraSesionVO, 
                    Constants.PRIMERA_SESION, 
                    primeraSesionVO.getCeSesion().getFchSesion().toString());
        primeraSesionVO.getCeSesion().setCadena(cadenaAutenticidad);
        
        
        numRecords = primeraSesionService.savePrimeraSesionC1415(primeraSesionVO);

        return numRecords;
    }

    
    
	/**
	 * Elimina la informacion de la Primera Sesion
	 * @return Lista de integrantes en formato JSON.
	 * @throws Exception
	 */
    @RequestMapping(value="/delete/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public int delete(@PathVariable Integer cCct) throws Exception{
    	int numRecords = -1;
        
    	numRecords = primeraSesionService.deletePrimeraSesion(cCct);      
        return numRecords;
    }    
    

}
