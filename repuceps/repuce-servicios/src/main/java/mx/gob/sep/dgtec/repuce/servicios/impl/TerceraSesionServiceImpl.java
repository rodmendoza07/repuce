package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.Date;

import mx.gob.sep.dgtec.repuce.dao.CeActSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEventoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramaMapper;
import mx.gob.sep.dgtec.repuce.dao.CeSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CmSeguimientoMapper;
import mx.gob.sep.dgtec.repuce.dao.TerceraSesionMapper;
import mx.gob.sep.dgtec.repuce.model.CeActSesion;
import mx.gob.sep.dgtec.repuce.model.CeActSesionExample;
import mx.gob.sep.dgtec.repuce.model.CeEvento;
import mx.gob.sep.dgtec.repuce.model.CeEventoExample;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CePrograma;
import mx.gob.sep.dgtec.repuce.model.CeProgramaExample;
import mx.gob.sep.dgtec.repuce.servicios.CuartaSesionService;
import mx.gob.sep.dgtec.repuce.servicios.TerceraSesionService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.TerceraSesionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TerceraSesionServiceImpl implements TerceraSesionService{
	
	private static final Logger log = LoggerFactory.getLogger(TerceraSesionServiceImpl.class);
	
	@Autowired
	private CeInfGralMapper ceInfGralMapper;
	@Autowired
	private CeSesionMapper ceSesionMapper;
	@Autowired
	private CeActSesionMapper ceActSesionMapper;
	@Autowired
	private CeEventoMapper ceEventoMapper;
	@Autowired
	private CeProgramaMapper ceProgramaMapper;
	@Autowired
	private CmSeguimientoMapper cmSeguimientoMapper;
	@Autowired
	private TerceraSesionMapper terceraSesionMapper;  
	@Autowired
	private CuartaSesionService cuartaSesionService ;  
	
	/**
	 * Guarda la informacion de la tercera sesion
	 */
	public int saveTerceraSesion(TerceraSesionVO terceraSesionVO) throws Exception{
		
		Integer cCct = terceraSesionVO.getCeInfGral().getcCct();
		int numRecords = -1;

		try{
			//Elimina los datos de la segunda Asamblea
			deleteTerceraSesion(cCct);
			
			/*
			 * Se guarda la informacion de la tercera sesion 
			 */
			//Se actualiza la fecha de la última modificación del la tercera sesion
			CeInfGral ceIngGral = new CeInfGral();
			ceIngGral.setcCct(cCct);
			ceIngGral.setFchActualizacion(new Date());
			ceInfGralMapper.updateByPrimaryKeySelective(ceIngGral);
	
			//Inserta la informacion de la segunda sesion para el CCT dado
			terceraSesionVO.getCeSesion().setcCct(cCct);
			terceraSesionVO.getCeSesion().setcSesion(Constants.TERCERA_SESION);
			terceraSesionVO.getCeSesion().setFchRegistro(new Date());
			numRecords = ceSesionMapper.insertSelective(terceraSesionVO.getCeSesion());
			
			//Actualiza la informacion de las actividades
			if(terceraSesionVO.getActividades()!=null){
				for(CeActSesion actividad: terceraSesionVO.getActividades()){
					actividad.setcCct(cCct);
					actividad.setcSesion(Constants.TERCERA_SESION);
					ceActSesionMapper.insertSelective(actividad);
				}
			}

			//Actualiza la informacion de los programas
			if(terceraSesionVO.getProgramas()!=null){
				for(CePrograma programa: terceraSesionVO.getProgramas()){
					programa.setcCct(cCct);
					programa.setcSesion(Constants.TERCERA_SESION);
					ceProgramaMapper.insertSelective(programa);
				}
			}
			
			//Actualiza la informacion de los eventos
			if(terceraSesionVO.getEventos()!=null){
				for(CeEvento evento: terceraSesionVO.getEventos()){
					evento.setcCct(cCct);
					evento.setcSesion(Constants.TERCERA_SESION);
					ceEventoMapper.insertSelective(evento);
				}
			}
			
			//Actualiza la infromacion del seguimiento de Consejos Municipales
			if(terceraSesionVO.getSeguimientoMunicipal()!=null
					&& terceraSesionVO.getSeguimientoMunicipal().getIndConsejoMun()!=null){
				terceraSesionVO.getSeguimientoMunicipal().setcCct(cCct);
				terceraSesionVO.getSeguimientoMunicipal().setcSesion(
						Constants.TERCERA_SESION);
				cmSeguimientoMapper.insertSelective(terceraSesionVO
						.getSeguimientoMunicipal());
			}

		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(terceraSesionVO));
			}catch(Exception ex){
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura (e,"servicios.tercera.sesion.error.editar",new Object[]{});
		}

		//Regresa el número de registros de ce_sesion insertados
		//Cómo válido deberá se uno y solo uno
		return numRecords;
	}
	
	/**
	 * Da de baja la informacion de la tercera sesion
	 * @param cCct Clave del CCT a ser dado de baja
	 */
	public int deleteTerceraSesion(Integer cCct) throws Exception {
		int numRecords = -1;

		try{
			
			cuartaSesionService.deleteCuartaSesion(cCct);
			
			//Elimina Programas
			CeProgramaExample ceProgramaExample = new CeProgramaExample();
			ceProgramaExample.createCriteria()
				.andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.TERCERA_SESION);
			ceProgramaMapper.deleteByExample(ceProgramaExample);
			//Elimina los eventos
			CeEventoExample ceEventoExample = new CeEventoExample();
			ceEventoExample.createCriteria()
				.andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.TERCERA_SESION);
			ceEventoMapper.deleteByExample(ceEventoExample);
			//Elimina la informacion de los Consejos Municipales
			cmSeguimientoMapper.deleteByPrimaryKey(cCct, Constants.TERCERA_SESION);
			//Elimina las acividades
			CeActSesionExample ceActSesionExample = new CeActSesionExample();
			ceActSesionExample.createCriteria()
				.andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.TERCERA_SESION);
			ceActSesionMapper.deleteByExample(ceActSesionExample);
				
			numRecords = ceSesionMapper.deleteByPrimaryKey(cCct, Constants.TERCERA_SESION);
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"servicios.tercera.sesion.error.eliminar",new Object[]{});
		}
		
		return numRecords;
	}

	/**
	 * Consulta la informacion de la tercera sesion para la impresion de la minuta
	 */
	public TerceraSesionVO selectTerceraSesion(Integer cCct) throws Exception{

		return  terceraSesionMapper.selectTerceraSesion(cCct);
	}
	
	
}
