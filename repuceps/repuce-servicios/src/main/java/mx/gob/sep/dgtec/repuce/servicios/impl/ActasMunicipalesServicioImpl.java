package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.List;

import mx.gob.sep.dgtec.repuce.dao.CMunicipioMapper;
import mx.gob.sep.dgtec.repuce.dao.ConsejoMunMapper;
import mx.gob.sep.dgtec.repuce.dao.ConsejoMunMapperCstm;
import mx.gob.sep.dgtec.repuce.model.ConsejoMun;
import mx.gob.sep.dgtec.repuce.model.ConsejoMunCstm;
import mx.gob.sep.dgtec.repuce.servicios.ActasMunicipalesService;
import mx.gob.sep.dgtec.repuce.servicios.SistemaArchivosServicio;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorNegocio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActasMunicipalesServicioImpl implements ActasMunicipalesService{
	
	private static final Logger log = LoggerFactory.getLogger(ActasMunicipalesServicioImpl.class);
	private final String ACTAS_MUNICIPALES = "actasMunicipales";

	@Autowired
	SistemaArchivosServicio sistemaArchivosServicio;
	@Autowired 
	CMunicipioMapper cMunicipioMapper;
	@Autowired
	ConsejoMunMapper consejoMunMapper; 
	@Autowired
	ConsejoMunMapperCstm consejoMunMapperCstm; 
	@Autowired
	Integer actaMunicMaxSize;
	
	/**
	 * {@inheritDoc}
	 */
	public void insertActaMunicipal(String userName, String nombreArchivo, byte[] archivo)
			throws Exception{
		
		log.debug("userName: " + userName);
		String userNumber = userName.substring(0,2);

		//El archivo no cuenta con el formato especificado
		if(!nombreArchivo.matches("[0-9]{1,2}\\-[0-9]{1,3}\\.pdf"))
			throw new ErrorNegocio( 
					"No cuenta con un nombre correcto, debe ser Num.Edo.-Num.Munic.");
		
		//El usuario inserta un acta que no corresponde a su entidad
		if(userNumber.matches("[0-9]{2}") &&
				new Short(userNumber) > 0 && new Short(userNumber) <= 32 && //Pertenece a alguna entidad
				!new Short(userNumber).equals(new Short(nombreArchivo.split("\\-")[0])) 
			){
			throw new ErrorNegocio( 
					"El acta que desea agregar no corresponde a su entidad");
		}
			
		//El archivo es mayor a 750K
		if(archivo.length > actaMunicMaxSize){
			throw new ErrorNegocio("El archivo no debe exceder los 750Kb de tama\u00F1o");
		}

		//Extrae del nombre del archivo el identificador de la entidad y el municipio
		Short idEntidadfed = new Short(nombreArchivo.split("\\-")[0]);
		Integer idMunicipio = new Integer(nombreArchivo.split("\\-")[1].split("\\.")[0]);

		log.debug("idEntidadfed: " + idEntidadfed);
		log.debug("idMunicipio: " + idMunicipio);

		
		//El municipio no existe
		if(cMunicipioMapper.selectByPrimaryKey(idMunicipio, idEntidadfed) == null)
			throw new ErrorNegocio("El municipio cuya acta quiere cargar, no est\u00e1 cargado en el sistema.");
		
		ConsejoMun consejoMun = new ConsejoMun();
		consejoMun.setIdEntidadfed(idEntidadfed);
		consejoMun.setIdMunicipio(idMunicipio);
		consejoMun.setArchivo(nombreArchivo);
	 
		//Si el registro no existe, lo guarda
		if(consejoMunMapper.selectByPrimaryKey(idEntidadfed,idMunicipio)==null){
			//Guarda la información del archivo en la base de datos
			consejoMunMapper.insertSelective(consejoMun);
		}else{
			consejoMunMapper.updateByPrimaryKeySelective(consejoMun);
		}
		
		sistemaArchivosServicio.escribirArchivo(ACTAS_MUNICIPALES, nombreArchivo, archivo);
		
	}
	
	/**
	 * {@inheritDoc}
	 */	
	public List<ConsejoMunCstm> selectActasMunicipales(String userName){
		
		Short idEntidad = null;
		List<ConsejoMunCstm> actas = null;

		//Se trata de un usuario de los estados
		if(userName.substring(0,2).matches("[0-9]{2}")){
			idEntidad = Short.parseShort((userName.substring(0,2)));
		}

		//Obtiene la lista de las actas registradas en la base de datos 
		actas = consejoMunMapperCstm.selectActasMunicipales(idEntidad);
		
		log.debug("Numero de actas registradas: " + actas.size());
		
		
		return actas;
	}
	
	/**
	 * {@inheritDoc}
	 */	
	public int deleteActaMunicipal(String userName, Short idEntidad, Integer idMunicipio){
			
		int numItemsDeleted = 0;
		String userNumber = userName.substring(0,2);

		//El usuario intenta eliminar un acta que no corresponde a su entidad
		if(userNumber.matches("[0-9]{2}") &&
				new Short(userNumber) > 0 && new Short(userNumber) <= 32 && //Pertenece a alguna entidad
				!new Short(userName.substring(0,2)).equals(idEntidad)){
			throw new ErrorNegocio(new Object[]{}, 
					"servicios.archivos.municipal.error.delete.wrong.entidad");
		} 

		ConsejoMun consejoMun = consejoMunMapper.selectByPrimaryKey(idEntidad, 
				idMunicipio);
				
		
		//Si existe el acta municipal
		if(consejoMun!=null){
			//Elimina el registro en la base de datos
			numItemsDeleted = consejoMunMapper.deleteByPrimaryKey(idEntidad, 
					idMunicipio);
			
			sistemaArchivosServicio.deleteArchivo(ACTAS_MUNICIPALES, consejoMun.getArchivo());
		}
			
		return numItemsDeleted;
		
	}

}
