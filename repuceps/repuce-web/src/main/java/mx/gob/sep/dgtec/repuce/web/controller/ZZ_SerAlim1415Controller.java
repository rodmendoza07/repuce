package mx.gob.sep.dgtec.repuce.web.controller;

import mx.gob.sep.dgtec.repuce.model.SerAlimPetc1415;
import mx.gob.sep.dgtec.repuce.servicios.ZZ_SerAlim1415Service;
import mx.gob.sep.dgtec.repuce.vo.ReunionesRealizadasVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/serAlim1415") 
public class ZZ_SerAlim1415Controller { 
	private static final Logger log = LoggerFactory
			.getLogger(ZZ_SerAlim1415Controller.class);
	
	@Autowired
	private ZZ_SerAlim1415Service serAlim1415Service;
	
	
	/**
	 * Guarda la informacion del Servicio de Alimentacion
	 * para las CCT que sean integrantes del PETC 
	 * Ciclo 2014 - 2015
	 * @return Numero de Consejos registrados o modificados
	 * @throws Exception
	 */
    @RequestMapping(value="/saveSerAlim1415", method=RequestMethod.POST)
    @ResponseBody
    public int saveSerAlim1415(@RequestBody SerAlimPetc1415 serAlim1415) throws Exception{ 
              
    	System.out.println("Esta en controller...");
    	
    	System.out.println("Esta en controller... Envia al servicio");
        int numRecords = serAlim1415Service.saveFormSerAlim1415(serAlim1415);

        System.out.println("Esta en controller... regresa del servicio");
        
        return numRecords;
    }
		
		/**
			* Trae los datos del Servicio de alimentacion
			*
			* @param idCct
			*			cCct : identificador del CCT
			* @return tren de datos del Servicio de alimentacion del PETC
			* @throws Exception
		*/ 
    @RequestMapping(value="/selDatFormSerAlim/{cCct}" , method=RequestMethod.GET)
    @ResponseBody
	public SerAlimPetc1415 searchSerAlim(@PathVariable Integer cCct)
			throws Exception{
        
    	return serAlim1415Service.selectSerAlim1415(cCct);
    }
		

}


