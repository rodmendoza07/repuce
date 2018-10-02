package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.Date;
import java.util.List;




import mx.gob.sep.dgtec.repuce.dao.SerAlimPetc1415Mapper;
import mx.gob.sep.dgtec.repuce.model.SerAlimPetc1415;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.gob.sep.dgtec.repuce.servicios.ZZ_SerAlim1415Service;

// Service
@Service
public class ZZ_SerAlim1415ServiceImpl implements ZZ_SerAlim1415Service{
	
	private static final Logger log = LoggerFactory.getLogger(ZZ_SerAlim1415ServiceImpl.class);
	
	@Autowired
	private SerAlimPetc1415Mapper serAlim1415Mapper;
	
	/**
	 * Consulta la informacion de la segunda asamblea dado un CCT
	 */
	public SerAlimPetc1415 selectSerAlim1415(Integer cCct){

		SerAlimPetc1415 serAlim1415VO = serAlim1415Mapper.selectByPrimaryKey(cCct);
		
		return serAlim1415VO;
	}

	/**
	 * Guarda la informacion de la segunda asamblea
	**/
	public int saveFormSerAlim1415(SerAlimPetc1415 serAlim1415){
		
		System.out.println("Esta en services guardar ...");
		//Integer cCct = serAlim1415.getIdCct();
		
		SerAlimPetc1415 tmpServ = selectSerAlim1415(serAlim1415.getIdCct());
		
		try{
			//Se INSERT la informacion del Servicio de Alimentacion
			if(tmpServ == null){
				
				//serAlim1415.setFecharegForm( (new Date()).toString() );
				
				System.out.println("Esta en services guardar ... Insert");
								
				serAlim1415Mapper.insertSelective(serAlim1415);
				return 1;
			}
			//Se UPDATE la informacion del Servicio de Alimentacion
			else if(tmpServ != null){
				
				
				System.out.println("Esta en services guardar ... Update");
				
				serAlim1415Mapper.updateByPrimaryKeySelective(serAlim1415);
				return 1;
			}
			return 1;
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"SerAlim. Error al Registrar",new Object[]{});			
		}
	}
	
}
