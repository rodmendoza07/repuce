package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.Date;

import mx.gob.sep.dgtec.repuce.dao.CCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAsistenteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.dao.CeSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.TerceraAsambleaMapper;
import mx.gob.sep.dgtec.repuce.model.CeActSesion;
import mx.gob.sep.dgtec.repuce.model.CeActSesionExample;
import mx.gob.sep.dgtec.repuce.model.CeAsistente;
import mx.gob.sep.dgtec.repuce.model.CeAsistenteExample;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.servicios.TerceraAsambleaService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ReunionVO;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TerceraAsambleaServiceImpl implements TerceraAsambleaService{
	
	private static final Logger log = LoggerFactory.getLogger(TerceraAsambleaServiceImpl.class);
	
	@Autowired
	private CeInfGralMapper ceInfGralMapper;
	@Autowired
	private CCctMapper cCctMapper;
	@Autowired
	private CeSesionMapper ceSesionMapper;
	@Autowired
	private CeAsistenteMapper ceAsistenteMapper;
	@Autowired
	private CeActSesionMapper ceActSesionMapper;
	@Autowired
	private TerceraAsambleaMapper terceraAsambleaMapper;
	
	/**
	 * Guarda la informacion de la cuarta sesión
	 */
	public int saveTerceraAsamblea(ReunionVO reunionVO){
		
		Integer cCct =  reunionVO.getCeInfGral().getcCct();
		int numRecords = -1;
		
		try{
			
			/*
			 * Elimina eliminan los datos de la cuarta sesion 
			 */
			deleteTerceraAsamblea(cCct);
	
			/*
			 * Se guarda la informacion de la cuarta sesion 
			 */
			//Se actualiza la fecha de la última modificación del la cuarta sesion
			CeInfGral ceIngGral = new CeInfGral();
			ceIngGral.setcCct(cCct);
			ceIngGral.setFchActualizacion(new Date());
			ceInfGralMapper.updateByPrimaryKeySelective(ceIngGral);
	
			//Inserta la informacion de la cuarta sesion para el CCT dado
			reunionVO.getCeSesion().setcCct(cCct);
			reunionVO.getCeSesion().setcSesion(Constants.TERCERA_ASAMBLEA);
			reunionVO.getCeSesion().setFchRegistro(new Date());
			numRecords = ceSesionMapper.insertSelective(reunionVO.getCeSesion());
			
			//Inserta la informacion de actividades para la cuarta sesion para el CCT dado
			if(reunionVO.getActividades()!=null){
				for (CeActSesion ceActSesion : reunionVO.getActividades()) {
					ceActSesion.setcCct(cCct);
					ceActSesion.setcSesion(Constants.TERCERA_ASAMBLEA);
					ceActSesionMapper.insertSelective(ceActSesion);
				}
			}
			
			short cscAsistente = 1;
			//Se inserta la información de los asistentes
			for (CeAsistente ceAsistente : reunionVO.getAsistentes()) {
				ceAsistente.setcCct(cCct);
				ceAsistente.setcSesion(Constants.TERCERA_ASAMBLEA);
				ceAsistente.setCscAsistente(cscAsistente++);
				ceAsistenteMapper.insertSelective(ceAsistente);
			}

			//Se elimina los asistentes de la segunda asamblea para un cct dado.
			CeAsistenteExample ceAsistenteCriteria = new CeAsistenteExample();
			ceAsistenteCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
			ceAsistenteMapper.deleteByExample(ceAsistenteCriteria);
			
		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(reunionVO));
			}catch(Exception ex){
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura (e,"servicios.cuarta.sesion.error.editar",new Object[]{});
		}
		
		//Regresa el número de registros de c_sesion insertados
		//Cómo válido deberá se uno y solo uno
		return numRecords;
	}
	
	/**
	 * Da de baja logica al Consejo del CCT dado
	 * @param cCct Clave dle CCT a ser dado de baja
	 */
	public int deleteTerceraAsamblea(Integer cCct){
		int numRecords = -1;
		
		try{
			
			//Se eliminan los datos de actividades de la cuarta sesión para el CCT dado.
			CeActSesionExample actividadesCriteria = new CeActSesionExample();
			actividadesCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.TERCERA_ASAMBLEA);
			ceActSesionMapper.deleteByExample(actividadesCriteria);		
			
			//Se elimina los asistentes de la tercera asamblea para un cct dado.
			CeAsistenteExample ceAsistenteCriteria = new CeAsistenteExample();
			ceAsistenteCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.TERCERA_ASAMBLEA);
			ceAsistenteMapper.deleteByExample(ceAsistenteCriteria);
			
			//Se eliminan los datos de la tercera asamblea para el CCT dado.
			numRecords = ceSesionMapper.deleteByPrimaryKey(cCct,Constants.TERCERA_ASAMBLEA);
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"servicios.cuarta.sesion.error.eliminar",new Object[]{});
		}
		
		return numRecords;
	}

	/**
	 * Consulta la informacion de la cuarta sesion dado un CCT
	 */
	public ReunionVO selectTerceraAsamblea(Integer cCct){
		ReunionVO reunionVO = terceraAsambleaMapper.selectTerceraAsamblea(cCct);
		
		return reunionVO;				
	}

	
}
