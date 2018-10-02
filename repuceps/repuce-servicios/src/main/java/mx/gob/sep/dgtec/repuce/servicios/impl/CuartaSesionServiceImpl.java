package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.repuce.dao.CCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComiteIntegranteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEventoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.dao.CeIntegranteComiteConsejoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeIntegranteComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeMejoraCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CePlaneacionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramaMapper;
import mx.gob.sep.dgtec.repuce.dao.CeRecursoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CuartaSesionMapper;
import mx.gob.sep.dgtec.repuce.model.CeActSesion;
import mx.gob.sep.dgtec.repuce.model.CeActSesionExample;
import mx.gob.sep.dgtec.repuce.model.CeComite;
import mx.gob.sep.dgtec.repuce.model.CeComiteExample;
import mx.gob.sep.dgtec.repuce.model.CeEvento;
import mx.gob.sep.dgtec.repuce.model.CeEventoExample;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCct;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctExample;
import mx.gob.sep.dgtec.repuce.model.CePlaneacion;
import mx.gob.sep.dgtec.repuce.model.CePrograma;
import mx.gob.sep.dgtec.repuce.model.CeProgramaExample;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;
import mx.gob.sep.dgtec.repuce.servicios.CuartaSesionService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaAsambleaService;
//import mx.gob.sep.dgtec.repuce.servicios.SegundaSesionService;
import mx.gob.sep.dgtec.repuce.servicios.TerceraAsambleaService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CuartaSesionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CuartaSesionServiceImpl implements CuartaSesionService{
	
	private static final Logger log = LoggerFactory.getLogger(CuartaSesionServiceImpl.class);
	
	@Autowired
	private CeInfGralMapper ceInfGralMapper;
	@Autowired
	private CCctMapper cCctMapper;
	@Autowired
	private CeSesionMapper ceSesionMapper;
	@Autowired
	private CeActSesionMapper ceActSesionMapper;
	@Autowired
	private CeProgramaMapper ceProgramaMapper;
	@Autowired
	private CeMejoraCctMapper ceMejoraCctMapper;
	@Autowired
	private CeRecursoMapper ceRecursoMapper;
	@Autowired
	private CeComiteMapper ceComiteMapper;
	@Autowired
	private CeEventoMapper ceEventoMapper;
	@Autowired
	private CeIntegranteComiteConsejoMapper ceIntegranteComiteConsejoMapper;
	@Autowired
	private CeComiteIntegranteMapper ceComiteIntegranteMapper;
	@Autowired
	private CeIntegranteComiteMapper ceIntegranteComiteMapper;
	@Autowired
	private CePlaneacionMapper cePlaneacionMapper;
//	@Autowired
//	private SegundaSesionService segundaSesionService;
	@Autowired
	private SegundaAsambleaService segundaAsambleaService;
	@Autowired
	private CuartaSesionMapper cuartaSesionMapper;
	@Autowired
	private TerceraAsambleaService terceraAsambleaService;
	
	/**
	 * Guarda la informacion de la cuarta sesión
	 */
	public int saveCuartaSesion(CuartaSesionVO cuartaSesionVO){
		
		Integer cCct =  cuartaSesionVO.getCeInfGral().getcCct();
		int numRecords = -1;
		
		try{
			
			/*
			 * Elimina eliminan los datos de la cuarta sesion 
			 */
			deleteCuartaSesion(cCct);
	
			/*
			 * Se guarda la informacion de la cuarta sesion 
			 */
			//Se actualiza la fecha de la última modificación del la cuarta sesion
			CeInfGral ceIngGral = new CeInfGral();
			ceIngGral.setcCct(cCct);
			ceIngGral.setFchActualizacion(new Date());
			ceInfGralMapper.updateByPrimaryKeySelective(ceIngGral);
	
			//Inserta la informacion de la cuarta sesion para el CCT dado
			cuartaSesionVO.getCeSesion().setcCct(cCct);
			cuartaSesionVO.getCeSesion().setcSesion(Constants.CUARTA_SESION);
			cuartaSesionVO.getCeSesion().setFchRegistro(new Date());
			numRecords = ceSesionMapper.insertSelective(cuartaSesionVO.getCeSesion());
			
			//Inserta la informacion de actividades para la cuarta sesion para el CCT dado
			if(cuartaSesionVO.getActividades()!=null){
				for (CeActSesion ceActSesion : cuartaSesionVO.getActividades()) {
					ceActSesion.setcCct(cCct);
					ceActSesion.setcSesion(Constants.CUARTA_SESION);
					ceActSesionMapper.insertSelective(ceActSesion);
				}
			}
			
			//Actualiza la informacion de programas para la cuarta sesion para el CCT dado
			if(cuartaSesionVO.getProgramas()!=null){
				for (CePrograma cePrograma : cuartaSesionVO.getProgramas()) {
					cePrograma.setcCct(cCct);
					cePrograma.setcSesion(Constants.TERCERA_SESION);
					ceProgramaMapper.updateByPrimaryKeySelective(cePrograma);
				}
			}
			
			//Actualiza la informacion de mejoras para la cuarta sesion para el CCT dado
			if(cuartaSesionVO.getMejoras()!=null){
				for (CeMejoraCct ceMejoraCct : cuartaSesionVO.getMejoras()) {
					ceMejoraCct.setcCct(cCct);
					ceMejoraCct.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					ceMejoraCctMapper.updateByPrimaryKeySelective(ceMejoraCct);
				}
			}
			
			//Actualiza la informacion de eventos para la cuarta sesion para el CCT dado
			if(cuartaSesionVO.getEventos()!=null){
				for (CeEvento ceEvento : cuartaSesionVO.getEventos()) {
					ceEvento.setcCct(cCct);
					ceEvento.setcSesion(Constants.TERCERA_SESION);
					ceEventoMapper.updateByPrimaryKeySelective(ceEvento);
				}
			}
			
			//Actualiza la informacion de los recursos para la cuarta sesion para el CCT dado
			if(cuartaSesionVO.getRecursos()!=null){
				for (CeRecurso ceRecurso : cuartaSesionVO.getRecursos()) {
					ceRecurso.setcCct(cCct);
					ceRecurso.setcSesion(Constants.PRIMERA_SESION);
					ceRecursoMapper.updateByPrimaryKeySelective(ceRecurso);
				}
			}
			
			//Actualiza la informacion de los comites para la cuarta sesion para el CCT dado
			if(cuartaSesionVO.getComites()!=null){
				for (CeComite ceComite : cuartaSesionVO.getComites()) {
					ceComite.setcCct(cCct);
					ceComite.setcSesion(Constants.PRIMERA_SESION);
					ceComiteMapper.updateByPrimaryKeySelective(ceComite);
				}
			}
			
			if(cuartaSesionVO.getPlaneacion()!=null){
				cuartaSesionVO.getPlaneacion().setcCct(cCct);
				cuartaSesionVO.getPlaneacion().setcSesion(Constants.PRIMERA_SESION);
				cePlaneacionMapper.updateByPrimaryKeySelective(cuartaSesionVO.getPlaneacion());
			}
			
		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(cuartaSesionVO));
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
	public int deleteCuartaSesion(Integer cCct){
		int numRecords = -1;
		
		try{
			terceraAsambleaService.deleteTerceraAsamblea(cCct);
			
			//Obtiene la información base de programas de la 3ra sesión
			CeProgramaExample ceProgramaExample = new CeProgramaExample();
			ceProgramaExample.createCriteria().andCCctEqualTo(cCct).
				andCSesionEqualTo(Constants.TERCERA_SESION);
			List<CePrograma> programas = ceProgramaMapper.selectByExample(
					ceProgramaExample);
			
			//elimina los datos correspondientes a la cuarta sesion
			if(programas!=null){
				for (CePrograma programa : programas) {
					programa.setMontoFinal(null);
					programa.setMontoFinalStr(null);
					programa.setActividadesFin(null);
					programa.setObjetivoFin(null);
					programa.setcDiferencia(null);
					programa.setOtraDiferencia(null);
					ceProgramaMapper.updateByPrimaryKey(programa);
				}
			}
			
			//Obtiene la información base de mejoras de la 1ra sesión
			CeMejoraCctExample ceMejoraExample = new CeMejoraCctExample();
			ceMejoraExample.createCriteria().andCCctEqualTo(cCct).
				andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			List<CeMejoraCct> mejoras = ceMejoraCctMapper.selectByExample(
					ceMejoraExample);
			
			//elimina los datos de mejoras correspondientes a la cuarta sesion
			if(mejoras!=null){
				for (CeMejoraCct mejora : mejoras) {
					mejora.setPeriodoInicio(null);
					mejora.setMonto(null);
					mejora.setMontoStr(null);
					mejora.setActividadesFin(null);
					mejora.setObjetivoFin(null);
					mejora.setIndRecurso(null);
					ceMejoraCctMapper.updateByPrimaryKey(mejora);
				}
			}
			
			//Se eliminan los datos de recursos APF correspondientes a la cuarta sesion
			CeRecurso recursoAPF = ceRecursoMapper.selectByPrimaryKey(cCct,
					Constants.PRIMERA_SESION, Constants.C_RECURSO_APF);
			if(recursoAPF!=null){
				recursoAPF.setMonto(null);
				recursoAPF.setMontoStr(null);
				recursoAPF.setIndTransparenta(null);
				recursoAPF.setUso(null);
				ceRecursoMapper.updateByPrimaryKey(recursoAPF);
			}
			
			//Obtiene la información base de eventos de la 1ra sesión
			CeEventoExample ceEventoExample = new CeEventoExample();
			ceEventoExample.createCriteria().andCCctEqualTo(cCct).
				andCSesionEqualTo(Constants.TERCERA_SESION);
			List<CeEvento> eventos = ceEventoMapper.selectByExample(
					ceEventoExample);
			
			//elimina los datos de eventos correspondientes a la cuarta sesion
			if(eventos!=null){
				for (CeEvento evento : eventos) {
					evento.setMonto(null);
					evento.setMontoStr(null);
					evento.setActividadesFin(null);
					evento.setObjetivoFin(null);
					evento.setIndRecurso(null);
					ceEventoMapper.updateByPrimaryKey(evento);
				}
			}
			
			//Obtiene la información base de comites de la 1ra sesión
			CeComiteExample ceComiteExample = new CeComiteExample();
			ceComiteExample.createCriteria().andCCctEqualTo(cCct).
				andCSesionEqualTo(Constants.PRIMERA_SESION);
			List<CeComite> comites = ceComiteMapper.selectByExample(
					ceComiteExample);
			
			//elimina los datos de comites correspondientes a la cuarta sesion
			if(comites!=null){
				for (CeComite comite : comites) {
					comite.setActividades(null);
					comite.setIndCumplieronAct(null);
					ceComiteMapper.updateByPrimaryKey(comite);
				}			
			}
			
			//Se eliminan los datos de planeacion correspondientes a la cuarta sesion
			CePlaneacion planeacion = cePlaneacionMapper.selectByPrimaryKey(cCct,
					Constants.PRIMERA_SESION);
			if(planeacion!=null){
				planeacion.setIndCumplioPlaneacion(null);
				cePlaneacionMapper.updateByPrimaryKey(planeacion);
			}
			
			//Se eliminan los datos de actividades de la cuarta sesión para el CCT dado.
			CeActSesionExample actividadesCriteria = new CeActSesionExample();
			actividadesCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.CUARTA_SESION);
			ceActSesionMapper.deleteByExample(actividadesCriteria);		
			
			//Se eliminan los datos de la cuarta sesión para el CCT dado.
			numRecords = ceSesionMapper.deleteByPrimaryKey(cCct,Constants.CUARTA_SESION);
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"servicios.cuarta.sesion.error.eliminar",new Object[]{});
		}
		
		return numRecords;
	}

	/**
	 * Consulta la informacion de la cuarta sesion dado un CCT
	 */
	public CuartaSesionVO selectCuartaSesion(Integer cCct){
		return cuartaSesionMapper.selectCuartaSesion(cCct);
	}
	
	/**
	 * Valida si es posible llevar a cabo la impresión de la cuarta sesión.
	 */
	public boolean isInformeAccesible(Integer cCct){
		return cuartaSesionMapper.isInformeAccesible(cCct);
	}
}
