package mx.gob.sep.dgtec.repuce.web.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalle;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalleCstm;
import mx.gob.sep.dgtec.repuce.servicios.SegundaSesionService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionC1415VO;
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
@RequestMapping(value = "/segundaSesion") 
public class SegundaSesionController {
	
	@Autowired
	private SegundaSesionService segundaSesionService;
	
	/**
	 * Consulta la informacion almacenada en la base de datos de la segunda sesion.
	 * @param cCct La clave del CCT cuya Segunda Sesion sera consultada
	 * @return
	 */
	@RequestMapping(value = "/selectC1415/{cCct}", method=RequestMethod.GET)
	@ResponseBody
	public SegundaSesionC1415VO selectSegundaSesionC1415(@PathVariable Integer cCct){
		
		System.out.println("Segunda sesion... 1");
		SegundaSesionC1415VO segundaSesionVO=new SegundaSesionC1415VO();
		
		try{
			System.out.println("Segunda sesion... 2");
			segundaSesionVO = segundaSesionService.selectSegundaSesionC1415(cCct);
			System.out.println("Segunda sesion... 3");
		}catch(Exception e){
			e.printStackTrace();
		}
		System.out.println("Segunda sesion... 4");
		return segundaSesionVO;	
	}
	
	/**
	 * Consulta la informacion almacenada en la base de datos de la segunda sesion.
	 * @param cCct La clave del CCT cuya Segunda Sesion sera consultada
	 * @return
	 */
	@RequestMapping(value = "/select/{cCct}", method=RequestMethod.GET)
	@ResponseBody
	public SegundaSesionVO selectSegundaSesion(@PathVariable Integer cCct){
		
		SegundaSesionVO segundaSesionVO=new SegundaSesionVO();
		
		try{
			segundaSesionVO = segundaSesionService.selectSegundaSesion(cCct);
		}catch(Exception e){
			e.printStackTrace();
		}
		return segundaSesionVO;	
	}

	/**
	 * Guarda la informacion de la Segunda Sesion
	 * para un CCT dado
	 * @return Numero de Segundas Sesiones registrados o modificados
	 * @throws Exception
	 */
    @RequestMapping(value="/saveSegundaSesion", method=RequestMethod.POST)
    @ResponseBody
	public int savePrimeraSesion(@RequestBody SegundaSesionVO segundaSesionVO,
			Principal principal) throws Exception{
        int numRecords = 0;
        final String currentUser = principal.getName();
        segundaSesionVO.getCeSesion().setUsrCaptura(currentUser);
        String cadenaAutenticidad = ReunionesUtil.generaCadenaHash(segundaSesionVO, 
        		Constants.SEGUNDA_SESION, 
        		segundaSesionVO.getCeSesion().getFchSesion().toString());
        segundaSesionVO.getCeSesion().setCadena(cadenaAutenticidad);
        
        numRecords = segundaSesionService.saveSegundaSesion(segundaSesionVO);

        return numRecords;
    }  
    
    
    @RequestMapping(value="/saveSegundaSesionC1415", method=RequestMethod.POST)
    @ResponseBody
	public int saveSegundaSesionC1415(@RequestBody SegundaSesionC1415VO segundaSesionVO,
			Principal principal) throws Exception{
    	
        int numRecords = 0;
        final String currentUser = principal.getName();
        
        segundaSesionVO.getCeSesion().setUsrCaptura(currentUser);
        
        String cadenaAutenticidad = ReunionesUtil.generaCadenaHash(segundaSesionVO, 
        		Constants.SEGUNDA_SESION, 
        		segundaSesionVO.getCeSesion().getFchSesion().toString());
        		segundaSesionVO.getCeSesion().setCadena(cadenaAutenticidad);
        
        numRecords = segundaSesionService.saveSegundaSesionC1415(segundaSesionVO);

        return numRecords;
    }  
    
	/**
	 * Elimina la Segunda Sesion para un CCT dado
	 * @return Numero de Segundas sesiones eliminadas
	 * @throws Exception
	 */
    @RequestMapping(value="/delete/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public int delete(@PathVariable Integer cCct) throws Exception{
    	int numRecords = -1;
        
    	numRecords = segundaSesionService.deleteSegundaSesion(cCct);      
        return numRecords;
    }    
    
    
	/**
	 * Consulta la informacion almacenada en la base de datos de la segunda sesion.
	 * @param cCct La clave del CCT cuya Segunda Sesion sera consultada
	 * @return
	 */
	@RequestMapping(value = "/selectResultadosEnlace/{cCct}", method=RequestMethod.GET)
	@ResponseBody
	public List<CctResultEnlace> selectResultadosEnlace(@PathVariable Integer cCct){
		
		List<CctResultEnlace> resultados = new ArrayList<CctResultEnlace>();
		
		try{
			resultados = segundaSesionService.selectResultadosEnlace(cCct);
		}catch(Exception e){
			e.printStackTrace();
		}
		return resultados;	
	}    

	/**
	 * Consulta la informacion almacenada en la base de datos de la segunda sesion.
	 * @param cCct La clave del CCT cuya Segunda Sesion sera consultada
	 * @return
	 */
	@RequestMapping(value = "/selectDetalle/{idPrograma}/{cCct}", method=RequestMethod.GET)
	@ResponseBody
	public List<CeProgramasDetalle> selectDetalle(@PathVariable Integer idPrograma, @PathVariable Integer cCct){
		
		System.out.println("Recuperando valor del programa seleccionado-contr-1");
		
		List<CeProgramasDetalle> detalle = new ArrayList<CeProgramasDetalle>();
		
		try{
			detalle = segundaSesionService.selectDetalle(idPrograma, cCct);
			
			System.out.println("Recuperando valor del programa seleccionado-contr-2");
		}catch(Exception e){
			e.printStackTrace();
		}
		System.out.println("Recuperando valor del programa seleccionado-contr-3");
		return detalle;	
	} 
	
	/**
	 * Elimina la Segunda Sesion para un CCT dado
	 * @return Numero de Segundas sesiones eliminadas
	 * @throws Exception
	 */
    @RequestMapping(value="/deleteC1415/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public int deleteC1415(@PathVariable Integer cCct) throws Exception{
    	int numRecords = -1;
        
    	numRecords = segundaSesionService.deleteSegundaSesionC1415(cCct);      
        return numRecords;
    } 
	
}
