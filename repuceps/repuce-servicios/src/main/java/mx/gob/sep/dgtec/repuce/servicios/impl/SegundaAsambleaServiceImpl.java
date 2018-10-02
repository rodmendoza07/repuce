package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.repuce.dao.CCctViewMapper;
import mx.gob.sep.dgtec.repuce.dao.CctResultEnlaceMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAccionSeguimientoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActividadComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActividadDetalleMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActividadMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAsistenteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAsuntoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComitesMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComitesSeguimientoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeCompromisosMapper;
import mx.gob.sep.dgtec.repuce.dao.CeContraloriaComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEstimulosMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEstimulosMunicipalMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEvaluacionesMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEventosMapper;
import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.dao.CeMejoraCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CeMetaEnlaceMapper;
import mx.gob.sep.dgtec.repuce.dao.CeNormalidadMapper;
import mx.gob.sep.dgtec.repuce.dao.CePreguntaRecursosPadresMapper;
import mx.gob.sep.dgtec.repuce.dao.CePreguntas2Mapper;
import mx.gob.sep.dgtec.repuce.dao.CePreguntasEstatalMapper;
import mx.gob.sep.dgtec.repuce.dao.CePreguntasMunicipalMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramaComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasDetalleMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasParticipacionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasSeguimientoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeRecursoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeRecursosPadresMapper;
import mx.gob.sep.dgtec.repuce.dao.CeSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.SegundaAsamblea1415Mapper;
import mx.gob.sep.dgtec.repuce.dao.SegundaAsambleaMapper;
import mx.gob.sep.dgtec.repuce.model.CeAccionCstm;
import mx.gob.sep.dgtec.repuce.model.CeAccionSeguimiento;
import mx.gob.sep.dgtec.repuce.model.CeAccionSeguimientoExample;
import mx.gob.sep.dgtec.repuce.model.CeActSesion;
import mx.gob.sep.dgtec.repuce.model.CeActSesionExample;
import mx.gob.sep.dgtec.repuce.model.CeActividad;
import mx.gob.sep.dgtec.repuce.model.CeActividadComite;
import mx.gob.sep.dgtec.repuce.model.CeActividadComiteExample;
import mx.gob.sep.dgtec.repuce.model.CeActividadDetalle;
import mx.gob.sep.dgtec.repuce.model.CeActividadDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeActividadDetalleExample;
import mx.gob.sep.dgtec.repuce.model.CeActividadExample;
import mx.gob.sep.dgtec.repuce.model.CeAsistente;
import mx.gob.sep.dgtec.repuce.model.CeAsistenteExample;
import mx.gob.sep.dgtec.repuce.model.CeAsunto;
import mx.gob.sep.dgtec.repuce.model.CeAsuntoExample;
import mx.gob.sep.dgtec.repuce.model.CeComite;
import mx.gob.sep.dgtec.repuce.model.CeComiteExample;
import mx.gob.sep.dgtec.repuce.model.CeComites;
import mx.gob.sep.dgtec.repuce.model.CeComitesCstm;
import mx.gob.sep.dgtec.repuce.model.CeComitesExample;
import mx.gob.sep.dgtec.repuce.model.CeComitesSeguimiento;
import mx.gob.sep.dgtec.repuce.model.CeComitesSeguimientoExample;
import mx.gob.sep.dgtec.repuce.model.CeCompromisos;
import mx.gob.sep.dgtec.repuce.model.CeCompromisosCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompromisosExample;
import mx.gob.sep.dgtec.repuce.model.CeContraloriaComite;
import mx.gob.sep.dgtec.repuce.model.CeContraloriaComiteExample;
import mx.gob.sep.dgtec.repuce.model.CeEstimulos;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosCstm;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosExample;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosMunicipal;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosMunicipalExample;
import mx.gob.sep.dgtec.repuce.model.CeEvaluaciones;
import mx.gob.sep.dgtec.repuce.model.CeEvaluacionesExample;
import mx.gob.sep.dgtec.repuce.model.CeEventos;
import mx.gob.sep.dgtec.repuce.model.CeEventosCstm;
import mx.gob.sep.dgtec.repuce.model.CeEventosExample;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCct;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctExample;
import mx.gob.sep.dgtec.repuce.model.CeNormalidad;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadCstm;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadExample;
import mx.gob.sep.dgtec.repuce.model.CePreguntaRecursosPadres;
import mx.gob.sep.dgtec.repuce.model.CePreguntaRecursosPadresExample;
import mx.gob.sep.dgtec.repuce.model.CePreguntas;
import mx.gob.sep.dgtec.repuce.model.CePreguntas2;
import mx.gob.sep.dgtec.repuce.model.CePreguntas2Example;
import mx.gob.sep.dgtec.repuce.model.CePreguntasEstatal;
import mx.gob.sep.dgtec.repuce.model.CePreguntasEstatalExample;
import mx.gob.sep.dgtec.repuce.model.CePreguntasMunicipal;
import mx.gob.sep.dgtec.repuce.model.CePreguntasMunicipalExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramaComite;
import mx.gob.sep.dgtec.repuce.model.CeProgramaComiteExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramaDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaSeguimientoC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramas;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalle;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalleCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalleExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramasExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacion;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacionExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramasSeguimiento;
import mx.gob.sep.dgtec.repuce.model.CeProgramasSeguimientoExample;
import mx.gob.sep.dgtec.repuce.model.CeRecursosPadres;
import mx.gob.sep.dgtec.repuce.model.CeRecursosPadresExample;
import mx.gob.sep.dgtec.repuce.servicios.SegundaAsambleaService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CeRecursosPadresVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsamblea1415VO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsambleaVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SegundaAsambleaServiceImpl implements SegundaAsambleaService{
	
	//saveSegundaAsamblea1415
	
	private static final Logger log = LoggerFactory.getLogger(SegundaAsambleaServiceImpl.class);
	
	@Autowired
	private CeInfGralMapper ceInfGralMapper;
	@Autowired
	private CeSesionMapper ceSesionMapper;
	@Autowired
	private CeAsistenteMapper ceAsistenteMapper;
	@Autowired
	private CeRecursoMapper ceRecursoMapper;
	@Autowired
	private CeComiteMapper ceComiteMapper;
	@Autowired
	private CeMejoraCctMapper ceMejoraCctMapper;
	@Autowired
	private CeMetaEnlaceMapper ceMetaEnlaceMapper;
	@Autowired
	private CctResultEnlaceMapper cctResultEnlaceMapper;
	@Autowired
	private SegundaAsambleaMapper segundaAsambleaMapper;
	@Autowired
	private SegundaAsamblea1415Mapper segundaAsamblea1415Mapper;
	@Autowired
	private CCctViewMapper cCctViewMapper;
	@Autowired
	private CeActSesionMapper ceActSesionMapper;
	@Autowired
	private CeProgramasDetalleMapper ceProgramasDetalleMapper;
	
	
	@Autowired
	private CeProgramasMapper ceProgramasMapper;
	@Autowired
	private CeComitesMapper ceComitesMapper;
	@Autowired
	private CeComitesSeguimientoMapper ceComitesSeguimientoMapper;
	@Autowired
	private CeAsuntoMapper ceAsuntoMapper;
	@Autowired
	private CeEstimulosMapper ceEstimulosMapper;
	@Autowired
	private CeEventosMapper ceEventosMapper	;
	@Autowired
	private CeCompromisosMapper ceCompromisosMapper;
	@Autowired
	private CeProgramasParticipacionMapper ceProgramasParticipacionMapper;
	@Autowired
	private CeAccionSeguimientoMapper ceAccionSeguimientoMapper;
	@Autowired
	private CeNormalidadMapper ceNormalidadMapper;
	@Autowired
	private CeEvaluacionesMapper ceEvaluacionMapper;
	@Autowired
	private CeProgramasSeguimientoMapper ceProgramaSeguimientoMapper;
	@Autowired
	private CePreguntas2Mapper cePreguntas2Mapper;
	@Autowired
	private CeEstimulosMunicipalMapper ceEstimulosMunicipalMapper;
	@Autowired
	private CeRecursosPadresMapper ceRecursosPadresMapper;
	@Autowired
	private CePreguntasEstatalMapper cePreguntasEstatalMapper;
	@Autowired
	private CePreguntasMunicipalMapper cePreguntasMunicipalMapper;
	@Autowired
	private CePreguntaRecursosPadresMapper cePreguntaRecursosPadresMapper;
	@Autowired
	private CeActividadMapper ceActividadMapper;
	@Autowired
	private CeActividadDetalleMapper ceActividadDetalleMapper;
	
	@Autowired
	private CeContraloriaComiteMapper ceContraloriaComiteMapper;

	@Autowired
	private CeProgramaComiteMapper ceProgramaComiteMapper;

	@Autowired
	private CeActividadComiteMapper ceActividadComiteMapper;

	/**
	 * Guarda la informacion de la segunda asamblea
	 */
	public int saveSegundaAsamblea(SegundaAsambleaVO segundaAsambleaVO) throws Exception{
		
		Integer cCct = segundaAsambleaVO.getCeInfGral().getcCct();
		int numRecords = -1;

		try{
			//Elimina los datos de la segunda Asamblea
			deleteSegundaAsamblea(cCct);
			
			/*
			 * Se guarda la informacion de la segunda Asamblea 
			 */
			//Se actualiza la fecha de la última modificación del la segunda asamblea
			CeInfGral ceIngGral = new CeInfGral();
			ceIngGral.setcCct(cCct);
			ceIngGral.setFchActualizacion(new Date());
			ceInfGralMapper.updateByPrimaryKeySelective(ceIngGral);
	
			//Inserta la informacion de la segunda sesion para el CCT dado
			segundaAsambleaVO.getCeSesion().setcCct(cCct);
			segundaAsambleaVO.getCeSesion().setcSesion(Constants.SEGUNDA_ASAMBLEA);
			segundaAsambleaVO.getCeSesion().setFchRegistro(new Date());
			numRecords = ceSesionMapper.insertSelective(segundaAsambleaVO.getCeSesion());
	
			//Inserta la información de mejoras para la segunda asamblea para el CCT dado
			if(segundaAsambleaVO.getMejoras()!=null){
				for (CeMejoraCct ceMejoraCct : segundaAsambleaVO.getMejoras()) {
					ceMejoraCct.setcCct(cCct);
					ceMejoraCct.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					ceMejoraCctMapper.insertSelective(ceMejoraCct);
				}
			}

			short cscAsistente = 1;
			//Se inserta la información de los asistentes
			for (CeAsistente ceAsistente : segundaAsambleaVO.getAsistentes()) {
				ceAsistente.setcCct(cCct);
				ceAsistente.setcSesion(Constants.SEGUNDA_ASAMBLEA);
				ceAsistente.setCscAsistente(cscAsistente++);
				ceAsistenteMapper.insertSelective(ceAsistente);
			}

			//Actualiza la informacion de los comites
			if(segundaAsambleaVO.getComites()!=null){
				for(CeComite comite: segundaAsambleaVO.getComites()){
					comite.setcCct(cCct);
					comite.setcSesion(Constants.PRIMERA_SESION);
					ceComiteMapper.updateByPrimaryKeySelective(comite);
				}
			}
			
		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(segundaAsambleaVO));
			}catch(Exception ex){
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura (e,"servicios.segunda.asamblea.error.editar",new Object[]{});
		}

		//Regresa el número de registros de c_sesion insertados
		//Cómo válido deberá se uno y solo uno
		return numRecords;
	}
	
	/**
	 * Da de baja logica al Consejo del CCT dado
	 * @param cCct Clave dle CCT a ser dado de baja
	 */
	public int deleteSegundaAsamblea(Integer cCct) throws Exception {
		int numRecords = -1;

		try{
			//Se eliminan los datos de mejoras de la primera sesión para el CCT dado.
			CeMejoraCctExample mejoraCriteria = new CeMejoraCctExample();
			mejoraCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceMejoraCctMapper.deleteByExample(mejoraCriteria);		
			
			//Obtiene la información base de comites de la 1ra sesión
			CeComiteExample ceComiteExample = new CeComiteExample();
			ceComiteExample.createCriteria().andCCctEqualTo(cCct).
				andCSesionEqualTo(Constants.PRIMERA_SESION);
			List<CeComite> comites = ceComiteMapper.selectByExample(
					ceComiteExample);
			
			//Se elimina los asistentes de la segunda asamblea para un cct dado.
			CeAsistenteExample ceAsistenteCriteria = new CeAsistenteExample();
			ceAsistenteCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceAsistenteMapper.deleteByExample(ceAsistenteCriteria);
			
			//elimina los datos de comites correspondientes a la cuarta sesion
			if(comites!=null){
				for (CeComite comite : comites) {
					comite.setIndProyAnualCom(null);
					ceComiteMapper.updateByPrimaryKey(comite);
				}
			}
			numRecords = ceSesionMapper.deleteByPrimaryKey(cCct, Constants.SEGUNDA_ASAMBLEA);
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"servicios.segunda.asamblea.error.eliminar",new Object[]{});
		}
		
		return numRecords;
	}

	/**
	 * Consulta la informacion de la segunda asamblea dado un CCT
	 */
	public SegundaAsambleaVO selectSegundaAsamblea(Integer cCct) throws Exception{

		SegundaAsambleaVO segundaAsambleaVO = segundaAsambleaMapper
				.selectSegundaAsamblea(cCct);

			return segundaAsambleaVO;
	}
	

	// Ciclo escolar 2014-2015
	
	public int saveSegundaAsamblea1415(SegundaAsamblea1415VO segundaAsambleaVO) throws Exception{
		
       System.out.println("Entro en save 1");
    	
		Integer cCct =  segundaAsambleaVO.getCeInfGral().getcCct();
		int numRecords = -1;
		
		try{
			
			//Elimina los datos de la segunda sesión
			deleteSegundaAsamblea1415(cCct,2);
			
			System.out.println("Entro en save 2");	
			//Se actualiza la fecha de la última modificación del la segunda sesion
			CeInfGral ceIngGral = new CeInfGral();
			ceIngGral.setcCct(cCct);
			ceIngGral.setFchActualizacion(new Date());
			ceInfGralMapper.updateByPrimaryKeySelective(ceIngGral);
			
			System.out.println("Entro en save 3");
			//Inserta la información de la segunda sesión para el CCT dado
			segundaAsambleaVO.getCeSesion().setcCct(cCct);
			segundaAsambleaVO.getCeSesion().setcSesion(Constants.SEGUNDA_ASAMBLEA);
			segundaAsambleaVO.getCeSesion().setFchRegistro(new Date());
			numRecords = ceSesionMapper.insertSelective(segundaAsambleaVO.getCeSesion());
			
			System.out.println("Entro en save 4");
			//Inserta la información de actividades para la segunda sesión para el CCT dado
			if(segundaAsambleaVO.getActividades()!=null){
				for (CeActSesion ceActSesion : segundaAsambleaVO.getActividades()) {
					ceActSesion.setcCct(cCct);
					ceActSesion.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					ceActSesionMapper.insertSelective(ceActSesion);
				}
			}
			
//			//Inserta la información de programas federales para la primera sesión para el CCT dado
			if(segundaAsambleaVO.getFederalActual() !=null){
				Short tipoPrograma = 0; 
				for (CeProgramaDetalleC1415Cstm ceProgramaFederal : segundaAsambleaVO.getFederalActual()) {
					System.out.println("Programa federal="+ceProgramaFederal.getNomPrograma());
					CeProgramas programaFederal = new CeProgramas();
					
					programaFederal.setcCct(cCct);
					
					programaFederal.setMonto(ceProgramaFederal.getMonto());
					programaFederal.setMontoStr(ceProgramaFederal.getMontoStr());
					programaFederal.setcPrograma(ceProgramaFederal.getIdPrograma());
					programaFederal.setTipoPrograma(tipoPrograma);
					programaFederal.setNomOtroPrograma(ceProgramaFederal.getNomOtroPrograma());
					programaFederal.setRecibido(ceProgramaFederal.getRecibido());
					programaFederal.setRecibidoStr(ceProgramaFederal.getRecibidoStr());
					
					if(ceProgramaFederal.getcSesion()!=Constants.SEGUNDA_ASAMBLEA && ceProgramaFederal.getcSesion() !=null){
						programaFederal.setcSesion(ceProgramaFederal.getcSesion());
						System.out.println("actualizando programa federal");
						System.out.println("cct="+programaFederal.getcCct());
						System.out.println("sesion="+programaFederal.getcSesion());
						System.out.println("programa="+programaFederal.getcPrograma());
						ceProgramasMapper.updateByPrimaryKeySelective(programaFederal);
					} else {
						programaFederal.setcSesion(Constants.SEGUNDA_ASAMBLEA);
						if(ceProgramaFederal.getcSesion()==null){
							ceProgramasMapper.insert(programaFederal);
						} else {							
							ceProgramasMapper.updateByPrimaryKeySelective(programaFederal);
						}							
					}
					
					if(ceProgramaFederal.getcSesion()==null){
						int idDetallePrograma = 1;
						System.out.println("Detalle federal="+ceProgramaFederal.getObjetivos());
						
						if( ceProgramaFederal.getObjetivos() != null ){
							for (CeProgramasDetalleCstm ceDetalleFederal : ceProgramaFederal.getObjetivos() ) {
								System.out.println("Detalle federal="+ceDetalleFederal.getIdObjetivo());
								CeProgramasDetalle detalleFederal = new CeProgramasDetalle();
								detalleFederal.setcCct(cCct);
								detalleFederal.setcSesion(Constants.SEGUNDA_ASAMBLEA);
								detalleFederal.setcPrograma(ceProgramaFederal.getIdPrograma());						
								detalleFederal.setIdDetalle(idDetallePrograma);
								detalleFederal.setIdObjetivo(ceDetalleFederal.getIdObjetivo());						
								detalleFederal.setObjetivo(ceDetalleFederal.getObjetivo());
								detalleFederal.setMeta(ceDetalleFederal.getMeta());
								
								ceProgramasDetalleMapper.insert(detalleFederal);
								
								CeProgramasSeguimiento rowProgSeg = new CeProgramasSeguimiento();					
								rowProgSeg.setcCct(cCct);
								rowProgSeg.setcSesion(Constants.SEGUNDA_ASAMBLEA);
								rowProgSeg.setcPrograma(ceProgramaFederal.getIdPrograma());
								rowProgSeg.setIdDetalle(idDetallePrograma);
								rowProgSeg.setIdObjetivo(ceDetalleFederal.getIdObjetivo());
								rowProgSeg.setAvance(ceDetalleFederal.getAvance());
								rowProgSeg.setSeguimiento(ceDetalleFederal.getSeguimiento());
								
								ceProgramaSeguimientoMapper.insert(rowProgSeg);	
								idDetallePrograma++;
							}						
						}																		
					}
				}
			}
//			
//			//Inserta la información de programas Estatales para la primera sesión para el CCT dado
			if(segundaAsambleaVO.getEstatalActual() !=null){
				Short tipoPrograma = 1; 
				for (CeProgramaDetalleC1415Cstm ceProgramaEstatal : segundaAsambleaVO.getEstatalActual()) {
					System.out.println("Programa Estatal="+ceProgramaEstatal.toString());
					System.out.println("Programa Estatal="+ceProgramaEstatal.getNomPrograma());
					System.out.println("SESION"+ceProgramaEstatal.getcSesion());
					
					CeProgramas programaEstatal = new CeProgramas();
					programaEstatal.setcCct(cCct);
					
					programaEstatal.setMonto(ceProgramaEstatal.getMonto());
					programaEstatal.setMontoStr(ceProgramaEstatal.getMontoStr());
					programaEstatal.setcPrograma(ceProgramaEstatal.getIdPrograma());
					programaEstatal.setTipoPrograma(tipoPrograma);
					programaEstatal.setNomOtroPrograma(ceProgramaEstatal.getNomOtroPrograma());
					programaEstatal.setRecibido(ceProgramaEstatal.getRecibido());
					programaEstatal.setRecibidoStr(ceProgramaEstatal.getRecibidoStr());										
					
					if(ceProgramaEstatal.getcSesion()!=Constants.SEGUNDA_ASAMBLEA && ceProgramaEstatal.getcSesion() !=null){
						programaEstatal.setcSesion(ceProgramaEstatal.getcSesion());
						System.out.println("actualizando programa estatal");
						System.out.println("cct="+programaEstatal.getcCct());
						System.out.println("sesion="+programaEstatal.getcSesion());
						System.out.println("programa="+programaEstatal.getcPrograma());
						ceProgramasMapper.updateByPrimaryKeySelective(programaEstatal);
					} else {
						programaEstatal.setcSesion(Constants.SEGUNDA_ASAMBLEA);
						if(ceProgramaEstatal.getcSesion()==null){
							ceProgramasMapper.insert(programaEstatal);	
						} else {
							ceProgramasMapper.updateByPrimaryKeySelective(programaEstatal);	
						}						    
					}
					
					if(ceProgramaEstatal.getcSesion()==null){
						int idDetallePrograma = 1;
						if( ceProgramaEstatal.getObjetivos() != null ){
							for (CeProgramasDetalleCstm ceDetalleEstatal : ceProgramaEstatal.getObjetivos() ) {
								System.out.println("Detalle Estatal="+ceDetalleEstatal.getIdObjetivo());
								CeProgramasDetalle detalleEstatal = new CeProgramasDetalle();
								detalleEstatal.setcCct(cCct);
								detalleEstatal.setcSesion(Constants.SEGUNDA_ASAMBLEA);
								detalleEstatal.setcPrograma(ceProgramaEstatal.getIdPrograma());						
								detalleEstatal.setIdDetalle(idDetallePrograma);
								detalleEstatal.setIdObjetivo(ceDetalleEstatal.getIdObjetivo());						
								detalleEstatal.setObjetivo(ceDetalleEstatal.getObjetivo());
								detalleEstatal.setMeta(ceDetalleEstatal.getMeta());
								
								ceProgramasDetalleMapper.insert(detalleEstatal);
								
								CeProgramasSeguimiento rowProgSeg = new CeProgramasSeguimiento();					
								rowProgSeg.setcCct(cCct);
								rowProgSeg.setcSesion(Constants.SEGUNDA_ASAMBLEA);
								rowProgSeg.setcPrograma(ceProgramaEstatal.getIdPrograma());
								rowProgSeg.setIdDetalle(idDetallePrograma);
								rowProgSeg.setIdObjetivo(ceDetalleEstatal.getIdObjetivo());
								rowProgSeg.setAvance(ceDetalleEstatal.getAvance());
								rowProgSeg.setSeguimiento(ceDetalleEstatal.getSeguimiento());
								
								ceProgramaSeguimientoMapper.insert(rowProgSeg);	
								
								idDetallePrograma++;
							}						
						}						
					}
				}
			}
//			
//			//Inserta la información de programas Municipal para la primera sesión para el CCT dado
			if(segundaAsambleaVO.getMunicipalActual() !=null){
				Short tipoPrograma = 2; 
				for (CeProgramaDetalleC1415Cstm ceProgramaMunicipal : segundaAsambleaVO.getMunicipalActual()) {
					System.out.println("Programa Municipal="+ceProgramaMunicipal.getNomPrograma());
					
						CeProgramas programaMunicipal = new CeProgramas();
						programaMunicipal.setcCct(cCct);
						
						programaMunicipal.setMonto(ceProgramaMunicipal.getMonto());
						programaMunicipal.setMontoStr(ceProgramaMunicipal.getMontoStr());
						programaMunicipal.setcPrograma(ceProgramaMunicipal.getIdPrograma());
						programaMunicipal.setTipoPrograma(tipoPrograma);					
						programaMunicipal.setNomOtroPrograma(ceProgramaMunicipal.getNomOtroPrograma());
						programaMunicipal.setRecibido(ceProgramaMunicipal.getRecibido());
						programaMunicipal.setRecibidoStr(ceProgramaMunicipal.getRecibidoStr());

						if(ceProgramaMunicipal.getcSesion()!=Constants.SEGUNDA_ASAMBLEA && ceProgramaMunicipal.getcSesion() !=null){
							programaMunicipal.setcSesion(ceProgramaMunicipal.getcSesion());
							System.out.println("actualizando programa municipal");
							System.out.println("cct="+programaMunicipal.getcCct());
							System.out.println("sesion="+programaMunicipal.getcSesion());
							System.out.println("programa="+programaMunicipal.getcPrograma());
							
							ceProgramasMapper.updateByPrimaryKeySelective(programaMunicipal);
						} else {
							programaMunicipal.setcSesion(Constants.SEGUNDA_ASAMBLEA);
							if(ceProgramaMunicipal.getcSesion()==null){
								ceProgramasMapper.insert(programaMunicipal);	
							} else {
								ceProgramasMapper.updateByPrimaryKeySelective(programaMunicipal);
							}
							
						}
						
						if(ceProgramaMunicipal.getcSesion()==null){						
							int idDetallePrograma = 1;
							if( ceProgramaMunicipal.getObjetivos() != null){
								for (CeProgramasDetalleCstm ceDetalleMunicipal : ceProgramaMunicipal.getObjetivos() ) {
									System.out.println("Detalle Municipal="+ceDetalleMunicipal.getIdObjetivo());
									CeProgramasDetalle detalleMunicipal = new CeProgramasDetalle();
									detalleMunicipal.setcCct(cCct);
									detalleMunicipal.setcSesion(Constants.SEGUNDA_ASAMBLEA);
									detalleMunicipal.setcPrograma(ceProgramaMunicipal.getIdPrograma());						
									detalleMunicipal.setIdDetalle(idDetallePrograma);
									detalleMunicipal.setIdObjetivo(ceDetalleMunicipal.getIdObjetivo());						
									detalleMunicipal.setObjetivo(ceDetalleMunicipal.getObjetivo());
									detalleMunicipal.setMeta(ceDetalleMunicipal.getMeta());
									
									ceProgramasDetalleMapper.insert(detalleMunicipal);
									
									CeProgramasSeguimiento rowProgSeg = new CeProgramasSeguimiento();					
									rowProgSeg.setcCct(cCct);
									rowProgSeg.setcSesion(Constants.SEGUNDA_ASAMBLEA);
									rowProgSeg.setcPrograma(ceProgramaMunicipal.getIdPrograma());
									rowProgSeg.setIdDetalle(idDetallePrograma);
									rowProgSeg.setIdObjetivo(ceDetalleMunicipal.getIdObjetivo());
									rowProgSeg.setAvance(ceDetalleMunicipal.getAvance());
									rowProgSeg.setSeguimiento(ceDetalleMunicipal.getSeguimiento());
									
									ceProgramaSeguimientoMapper.insert(rowProgSeg);	
									
									idDetallePrograma++;
								}						
							}
						}
					}
				}			
//			
//			//Inserta la información de programas Osc para la primera sesión para el CCT dado
			if(segundaAsambleaVO.getOscActual() !=null){
				Short tipoPrograma = 3; 
				for (CeProgramaDetalleC1415Cstm ceProgramaOsc : segundaAsambleaVO.getOscActual()) {
					System.out.println("Programa Osc="+ceProgramaOsc.getNomPrograma());

					CeProgramas programaOsc = new CeProgramas();
					programaOsc.setcCct(cCct);
					programaOsc.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					programaOsc.setMonto(ceProgramaOsc.getMonto());
					programaOsc.setMontoStr(ceProgramaOsc.getMontoStr());
					programaOsc.setcPrograma(ceProgramaOsc.getIdPrograma());
					programaOsc.setTipoPrograma(tipoPrograma);					
					programaOsc.setNomOtroPrograma(ceProgramaOsc.getNomOtroPrograma());
					programaOsc.setRecibido(ceProgramaOsc.getRecibido());
					programaOsc.setRecibidoStr(ceProgramaOsc.getRecibidoStr());

					if(ceProgramaOsc.getcSesion()!=Constants.SEGUNDA_ASAMBLEA && ceProgramaOsc.getcSesion() !=null){
						System.out.println("actualizando programa osc");
						programaOsc.setcSesion(ceProgramaOsc.getcSesion());
						
						System.out.println("cct="+programaOsc.getcCct());
						System.out.println("sesion="+programaOsc.getcSesion());
						System.out.println("programa="+programaOsc.getcPrograma());
						
						ceProgramasMapper.updateByPrimaryKeySelective(programaOsc);
					} else {
						programaOsc.setcSesion(Constants.SEGUNDA_ASAMBLEA);
						if(ceProgramaOsc.getcSesion()==null){
							ceProgramasMapper.insert(programaOsc);	
						} else {
							ceProgramasMapper.updateByPrimaryKeySelective(programaOsc);
						}
						
					}
						
					if(ceProgramaOsc.getcSesion()==null){
						int idDetallePrograma = 1;
						if(ceProgramaOsc.getObjetivos() != null){
							for (CeProgramasDetalleCstm ceDetalleOsc : ceProgramaOsc.getObjetivos() ) {
								System.out.println("Detalle Osc="+ceDetalleOsc.getIdObjetivo());
								CeProgramasDetalle detalleOsc = new CeProgramasDetalle();
								detalleOsc.setcCct(cCct);
								detalleOsc.setcSesion(Constants.SEGUNDA_ASAMBLEA);
								detalleOsc.setcPrograma(ceProgramaOsc.getIdPrograma());						
								detalleOsc.setIdDetalle(idDetallePrograma);
								detalleOsc.setIdObjetivo(ceDetalleOsc.getIdObjetivo());						
								detalleOsc.setObjetivo(ceDetalleOsc.getObjetivo());
								detalleOsc.setMeta(ceDetalleOsc.getMeta());
								
								ceProgramasDetalleMapper.insert(detalleOsc);
								
								CeProgramasSeguimiento rowProgSeg = new CeProgramasSeguimiento();					
								rowProgSeg.setcCct(cCct);
								rowProgSeg.setcSesion(Constants.SEGUNDA_ASAMBLEA);
								rowProgSeg.setcPrograma(ceProgramaOsc.getIdPrograma());
								rowProgSeg.setIdDetalle(idDetallePrograma);
								rowProgSeg.setIdObjetivo(ceDetalleOsc.getIdObjetivo());
								rowProgSeg.setAvance(ceDetalleOsc.getAvance());
								rowProgSeg.setSeguimiento(ceDetalleOsc.getSeguimiento());
								
								ceProgramaSeguimientoMapper.insert(rowProgSeg);	
								
								idDetallePrograma++;
							}						
						}
					}
				}
			}
		
			System.out.println("Entro en save 5");
			//Inserta la información de Programas Seguimiento
			if(segundaAsambleaVO.getDetalleSeguimiento() !=null){				
				for(CeProgramaSeguimientoC1415Cstm programa : segundaAsambleaVO.getDetalleSeguimiento() ){
					CeProgramasSeguimiento rowProgSeg = new CeProgramasSeguimiento();					
					rowProgSeg.setcCct(cCct);
					//rowProgSeg.setcSesion(programa.getcSesion());
					rowProgSeg.setcPrograma(programa.getIdPrograma());
					rowProgSeg.setIdDetalle(programa.getIdDetalle());
					rowProgSeg.setIdObjetivo(programa.getIdObjetivo());
					rowProgSeg.setAvance(programa.getAvance());
					rowProgSeg.setSeguimiento(programa.getSeguimiento());					
					
					
					System.out.println("Seguimiento=====");
					System.out.println("Seguimiento sesion=="+programa.getcSesion());
					
					if(programa.getcSesion()==null){
						 
						System.out.println("Seguimiento Insertando 1 ==");
						
						rowProgSeg.setcSesion(Constants.SEGUNDA_ASAMBLEA);
						ceProgramaSeguimientoMapper.insert(rowProgSeg);	
					} else {
						System.out.println("Seguimiento sesion es igual =="+programa.getcSesion()+"==="+Constants.SEGUNDA_ASAMBLEA+"-->");
						if(programa.getcSesion()!=4){
							System.out.println("Seguimiento Insertando 2 ==");
							rowProgSeg.setcSesion(Constants.SEGUNDA_ASAMBLEA);
							ceProgramaSeguimientoMapper.insert(rowProgSeg);								
						} else {
							System.out.println("Seguimiento Actualizando==");
							rowProgSeg.setcSesion(Constants.SEGUNDA_ASAMBLEA);
							ceProgramaSeguimientoMapper.updateByPrimaryKeySelective(rowProgSeg);	
						}
					}
										
				}										
			}	

			System.out.println("Entro en save 6");
			//Inserta la información de Acciones
			if(segundaAsambleaVO.getAcciones() !=null){				
				for(CeAccionCstm acciones : segundaAsambleaVO.getAcciones() ){
					CeAccionSeguimiento rowAccion = new CeAccionSeguimiento();					
					rowAccion.setcCct(cCct);
					rowAccion.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					rowAccion.setIdAccion(acciones.getIdAccion());
					rowAccion.setAvanceAccion(acciones.getAvanceAccion());
					rowAccion.setAvanceRecomendacion(acciones.getAvanceRecomendacion());					
					
					ceAccionSeguimientoMapper.insert(rowAccion);					
				}										
			}	
			System.out.println("Entro en save 7");
			//Inserta la información de Normalidad
			if(segundaAsambleaVO.getNormalidad() !=null){				
				for(CeNormalidadCstm normalidad : segundaAsambleaVO.getNormalidad() ){
					CeNormalidad rowNormalidad = new CeNormalidad();					
					rowNormalidad.setcCct(cCct);
					rowNormalidad.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					rowNormalidad.setcNormalidad(normalidad.getcNormalidad());
					rowNormalidad.setOpcionCasiNunca(normalidad.getOpcionCasiNunca());
					rowNormalidad.setOpcionNunca(normalidad.getOpcionNunca());
					rowNormalidad.setOpcionCasiSiempre(normalidad.getOpcionCasiSiempre());
					rowNormalidad.setOpcionSiempre(normalidad.getOpcionSiempre());					
															
					ceNormalidadMapper.insert(rowNormalidad);					
				}										
			}				
			System.out.println("Entro en save 8");
			//Inserta la información de Evaluacion
			if(segundaAsambleaVO.getEvaluacion() !=null){				
				for(CeEvaluaciones evaluacion : segundaAsambleaVO.getEvaluacion() ){
					//CeEvaluaciones rowEvaluacion = new CeEvaluaciones();					
					evaluacion.setcCct(cCct);
					evaluacion.setcSesion(Constants.SEGUNDA_ASAMBLEA);															
															
					ceEvaluacionMapper.insert(evaluacion);
				}										
			}
			

			System.out.println("Entro en save 9");
			//Inserta la información de comites seguimiento
			if(segundaAsambleaVO.getComiteSeguimiento() !=null){
				int idComites=1;
				for(CeComitesCstm comites : segundaAsambleaVO.getComiteSeguimiento() ){
					
					if(comites.getcSesion()==null){
					CeComites rowComite = new CeComites();
					rowComite.setcCct(cCct);
					rowComite.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					rowComite.setCeComites(idComites);
					rowComite.setIdComite(comites.getIdComite());
					rowComite.setNomComite(comites.getNomComite());
					rowComite.setNumIntegrantes(comites.getNumIntegrantes());
					rowComite.setNomPresidente(comites.getNomPresidente());
					rowComite.setIdCalidad(comites.getIdCalidad());
					rowComite.setNomcalidad(comites.getNomcalidad());
					rowComite.setAcuerdo(comites.getAcuerdo());
					rowComite.setIdAcuerdo(comites.getIdAcuerdo());
					rowComite.setNomOtroComite(comites.getNomOtroComite());
										
					ceComitesMapper.insert(rowComite);
					
					
					CeComitesSeguimiento rowComiteS = new CeComitesSeguimiento();
					rowComiteS.setcCct(cCct);
					rowComiteS.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					rowComiteS.setIdComite(comites.getIdComite());
					rowComiteS.setAccion1(comites.getAccion1());
					rowComiteS.setAccion2(comites.getAccion2());
					rowComiteS.setAccion3(comites.getAccion3());
					rowComiteS.setAccion4(comites.getAccion4());
					rowComiteS.setAccion5(comites.getAccion5());					
					rowComiteS.setActividadComite1(comites.getActividadComite1());					
					ceComitesSeguimientoMapper.insert(rowComiteS);
					idComites++;
					}
					else
					{
						CeComites rowComite = new CeComites();
						rowComite.setcCct(cCct);
						rowComite.setcSesion(comites.getcSesion());
						rowComite.setCeComites(comites.getCeComites());
						rowComite.setIdComite(comites.getIdComite());
						rowComite.setNomComite(comites.getNomComite());
						rowComite.setNumIntegrantes(comites.getNumIntegrantes());
						rowComite.setNomPresidente(comites.getNomPresidente());
						rowComite.setIdCalidad(comites.getIdCalidad());
						rowComite.setNomcalidad(comites.getNomcalidad());
						rowComite.setAcuerdo(comites.getAcuerdo());
						rowComite.setIdAcuerdo(comites.getIdAcuerdo());
						rowComite.setNomOtroComite(comites.getNomOtroComite());
											
						ceComitesMapper.updateByPrimaryKey(rowComite);
						
						
						CeComitesSeguimiento rowComiteS = new CeComitesSeguimiento();
						rowComiteS.setcCct(cCct);
						rowComiteS.setcSesion(Constants.SEGUNDA_ASAMBLEA);
						rowComiteS.setIdComite(comites.getIdComite());
						rowComiteS.setAccion1(comites.getAccion1());
						rowComiteS.setAccion2(comites.getAccion2());
						rowComiteS.setAccion3(comites.getAccion3());
						rowComiteS.setAccion4(comites.getAccion4());
						rowComiteS.setAccion5(comites.getAccion5());					
						rowComiteS.setActividadComite1(comites.getActividadComite1());					
						ceComitesSeguimientoMapper.insert(rowComiteS);
						idComites++;
					}
				}										
			}
			System.out.println("Entro al salvado de contraloria comite");
			if(segundaAsambleaVO.getContraloriaComite().getRes1()!=null){
				CeContraloriaComite contraloriaComite = segundaAsambleaVO.getContraloriaComite();
				contraloriaComite.setcCct(cCct);
				contraloriaComite.setcSesion(Constants.SEGUNDA_ASAMBLEA);
				ceContraloriaComiteMapper.insert(contraloriaComite);
		}
			System.out.println("Entro al salvado de programa comite");
				if(segundaAsambleaVO.getProgramaComite()!=null){
				
				for(CeProgramaComite programaComite : segundaAsambleaVO.getProgramaComite() ){
					CeProgramaComite programaComite1 = new CeProgramaComite();
					programaComite1.setcCct(cCct);
					programaComite1.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					programaComite1.setcProgramaComite(programaComite.getcProgramaComite());
					programaComite1.setOpcion(programaComite.getOpcion());
					
					ceProgramaComiteMapper.insert(programaComite1);										
				}	
				
			}
				System.out.println("Entro al salvado de actividades de comite");
				if(segundaAsambleaVO.getActividadComite()!=null){
					
					for(CeActividadComite actividadComite : segundaAsambleaVO.getActividadComite() ){
						CeActividadComite actividadComite1 = new CeActividadComite();
						actividadComite1.setcCct(cCct);
						actividadComite1.setcSesion(Constants.SEGUNDA_ASAMBLEA);
						actividadComite1.setcActividadComite(actividadComite.getcActividadComite());
						actividadComite1.setOpcion(actividadComite.getOpcion());
						
						ceActividadComiteMapper.insert(actividadComite1);										
					}	
					
				}

			System.out.println("Entro en save 10");
			//Inserta la información de Recursos
			if(segundaAsambleaVO.getProgramaRecursos() !=null){
				Short idCompromiso=1;
				for(CeProgramasParticipacionCstm recursos : segundaAsambleaVO.getProgramaRecursos() ){
					CeProgramasParticipacion rowPrograma = new CeProgramasParticipacion();					
					rowPrograma.setcCct(cCct);
					rowPrograma.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					rowPrograma.setcParticipacion(recursos.getcParticipacion());
					rowPrograma.setTprogramaFederales(recursos.getTprogramaFederales());
					rowPrograma.setTprogramaEstatales(recursos.getTprogramaEstatales());
					rowPrograma.setTprogramaMunicipales(recursos.getTprogramaMunicipales());
					rowPrograma.setTprogramaOsc(recursos.getTprogramaOsc());
										
					ceProgramasParticipacionMapper.insert(rowPrograma);
					idCompromiso++;
				}										
			}			
			System.out.println("Entro en save 11");
			//Inserta la información de compromisos
			if(segundaAsambleaVO.getCompromiso() !=null){
				Short idCompromiso=1;
				for(CeCompromisosCstm compromisos : segundaAsambleaVO.getCompromiso() ){
					CeCompromisos rowCompromiso = new CeCompromisos();					
					rowCompromiso.setcCct(cCct);
					rowCompromiso.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					rowCompromiso.setIdCompromiso(compromisos.getIdCompromiso());
					rowCompromiso.setIdConsecutivo(idCompromiso);
					rowCompromiso.setAccion1(compromisos.getAccion1());
					rowCompromiso.setAccion2(compromisos.getAccion2());
					rowCompromiso.setNomOtroCompromiso(compromisos.getNomOtroCompromiso());
					rowCompromiso.setCumplimiento(compromisos.getCumplimiento());
					
					ceCompromisosMapper.insert(rowCompromiso);
					idCompromiso++;
				}										
			}
			System.out.println("Entro en save 12");
			//Inserta la información de eventos 
			if(segundaAsambleaVO.getEventos() !=null){
				Short idEstimulo=1;
				for(CeEventosCstm eventos : segundaAsambleaVO.getEventos() ){
					CeEventos rowEvento = new CeEventos();					
					rowEvento.setcCct(cCct);
					rowEvento.setcSesion(Constants.SEGUNDA_ASAMBLEA);					
					rowEvento.setcEvento(eventos.getcEvento());
					rowEvento.setFechaHorariosProgramados(eventos.getFechaHorariosProgramados());
					rowEvento.setFuenteRecursos(eventos.getFuenteRecursos());
					rowEvento.setNomOtroEvento(eventos.getNomOtroEvento());
					rowEvento.setNomOtroFr(eventos.getNomOtroFr());
					rowEvento.setCumplioEvento(eventos.getCumplioEvento());
					rowEvento.setMontoR(eventos.getMontoR());
					rowEvento.setMontoStrR(eventos.getMontoStrR());
					rowEvento.setMontoG(eventos.getMontoG());
					rowEvento.setMontoStrG(eventos.getMontoStrG());
					ceEventosMapper.insert(rowEvento);					
					idEstimulo++;
				}										
			}
			System.out.println("Entro en save 13");
			//Inserta la información de estimulos y reconocimientos 
			if(segundaAsambleaVO.getEstimulos() !=null){
				Short idEstimulo=1;
				for(CeEstimulosCstm estimulos : segundaAsambleaVO.getEstimulos() ){
					CeEstimulos rowEstimulo = new CeEstimulos();					
					rowEstimulo.setcCct(cCct);
					rowEstimulo.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					rowEstimulo.setIdConsecutivo(idEstimulo);
					rowEstimulo.setCandidato(estimulos.getCandidato());
					rowEstimulo.setEstimulo(estimulos.getEstimulo());
					rowEstimulo.setNomCandidato(estimulos.getNomCandidato());
					rowEstimulo.setMotivos(estimulos.getMotivos());
					rowEstimulo.setFecha(estimulos.getFecha());
					rowEstimulo.setLlevoAcabo(estimulos.getLlevoAcabo());
					rowEstimulo.setcEstimulo(estimulos.getcEstimulo());
					rowEstimulo.setNomOtroEstimulo(estimulos.getNomOtroEstimulo());
					ceEstimulosMapper.insert(rowEstimulo);					
					idEstimulo++;
				}										
			}
			System.out.println("Entro en save 14");
			//Inserta la información de asuntos para la primera sesión para el CCT dado
			if(segundaAsambleaVO.getAsunto() !=null){
				Short idAsuntos=1;
				for(CeAsunto asuntos : segundaAsambleaVO.getAsunto() ){
					asuntos.setcCct(cCct);
					asuntos.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					asuntos.setCscAsunto(idAsuntos);
					ceAsuntoMapper.insert(asuntos);
					
					idAsuntos++;
				}										
			}
			System.out.println("Entro en save 15");
			//Inserta la información de estimulos y reconocimientos 
			if(segundaAsambleaVO.getEstimulosMunicipal() !=null){
				Short idEstimuloMunicipal=1;
				for(CeEstimulosMunicipal estimulosMunicipal : segundaAsambleaVO.getEstimulosMunicipal() ){
					CeEstimulosMunicipal rowEstimuloMunicipal = new CeEstimulosMunicipal();					
					rowEstimuloMunicipal.setcCct(cCct);
					rowEstimuloMunicipal.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					rowEstimuloMunicipal.setIdConsecutivoMunicipal(idEstimuloMunicipal);
					rowEstimuloMunicipal.setCandidatoMunicipal(estimulosMunicipal.getCandidatoMunicipal());
					rowEstimuloMunicipal.setEstimuloMunicipal(estimulosMunicipal.getEstimuloMunicipal());
					rowEstimuloMunicipal.setNomCandidatoMunicipal(estimulosMunicipal.getNomCandidatoMunicipal());
					rowEstimuloMunicipal.setMotivosMunicipal(estimulosMunicipal.getMotivosMunicipal());
					rowEstimuloMunicipal.setFechaMunicipal(estimulosMunicipal.getFechaMunicipal());
					ceEstimulosMunicipalMapper.insert(rowEstimuloMunicipal);					
					idEstimuloMunicipal++;
				}										
			}			
			
			System.out.println("Entro en save 16");
			if(segundaAsambleaVO.getPreguntasEstatal().getRespuesta1()!=null){
				
				
				CePreguntasEstatal preguntasEstatal = segundaAsambleaVO.getPreguntasEstatal();
					System.out.println("Longuitud   "+preguntasEstatal.toString());
					preguntasEstatal.setCctId(cCct);
					preguntasEstatal.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					cePreguntasEstatalMapper.insert(preguntasEstatal);
			}
			
			System.out.println("Entro en save 17");
			if(segundaAsambleaVO.getPreguntasMunicipal().getRespuesta1()!=null){
					CePreguntasMunicipal preguntasMunicipal = segundaAsambleaVO.getPreguntasMunicipal();
					preguntasMunicipal.setCctId(cCct);
					preguntasMunicipal.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					cePreguntasMunicipalMapper.insert(preguntasMunicipal);
			}
			
			System.out.println("Entro en save 18");
			if(segundaAsambleaVO.getPreguntaRecursosPadres() !=null){
					CePreguntaRecursosPadres preguntaRecursosPadres = segundaAsambleaVO.getPreguntaRecursosPadres();
					preguntaRecursosPadres.setCctId(cCct);
					preguntaRecursosPadres.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					cePreguntaRecursosPadresMapper.insert(preguntaRecursosPadres);
			}
			
			System.out.println("Entro en save 19");
			if(segundaAsambleaVO.getRecursosPadres() !=null){
				
				Short idRecursosPadres=1;
				for(CeRecursosPadresVO recursosPadres : segundaAsambleaVO.getRecursosPadres() ){
					CeRecursosPadres rowRecursosPadres = new CeRecursosPadres();
					rowRecursosPadres.setcCct(cCct);
					rowRecursosPadres.setcSesion(Constants.SEGUNDA_ASAMBLEA);
					rowRecursosPadres.setIdConsecutivor(idRecursosPadres);
					rowRecursosPadres.setMontoG1(recursosPadres.getMontoG1());
					rowRecursosPadres.setMontoG2(recursosPadres.getMontoG2());
					rowRecursosPadres.setMontoG3(recursosPadres.getMontoG3());
					rowRecursosPadres.setMontoG4(recursosPadres.getMontoG4());
					rowRecursosPadres.setMontoG5(recursosPadres.getMontoG5());
					rowRecursosPadres.setMontoR1(recursosPadres.getMontoR1());
					rowRecursosPadres.setMontoStrG1(recursosPadres.getMontoStrG1());
					rowRecursosPadres.setMontoStrG2(recursosPadres.getMontoStrG2());
					rowRecursosPadres.setMontoStrG3(recursosPadres.getMontoStrG3());
					rowRecursosPadres.setMontoStrG4(recursosPadres.getMontoStrG4());
					rowRecursosPadres.setMontoStrG5(recursosPadres.getMontoStrG5());
					rowRecursosPadres.setMontoStrR1(recursosPadres.getMontoStrR1());
					rowRecursosPadres.setOtro(recursosPadres.getOtro());
					rowRecursosPadres.setOtro2(recursosPadres.getOtro2());
					rowRecursosPadres.setOtro3(recursosPadres.getOtro3());
					ceRecursosPadresMapper.insert(rowRecursosPadres);
					idRecursosPadres++;
				}
				
			}
			
			System.out.println("Entro en save 20");
			//Inserta la información de Actividades adicionales para la primera sesión para el CCT dado
            if(segundaAsambleaVO.getCategorias() !=null){
                   //Short idActividad = 0; 
                   for (CeActividadDetalleC1415Cstm ceCategorias : segundaAsambleaVO.getCategorias()) {
                      //    idActividad++;
                	if(ceCategorias.getcSesion()==null){
                          System.out.println("Categoria="+ceCategorias.getActividad());
                          CeActividad actividad = new CeActividad();
                          actividad.setcCct(cCct);
                          actividad.setcSesion(Constants.SEGUNDA_ASAMBLEA);
                          actividad.setCeActividad(ceCategorias.getCeActividad());  
                          actividad.setNomOtraCategoria(ceCategorias.getNomOtraCategoria());
                          
                                                    
                          ceActividadMapper.insert(actividad);
                                                                                             
                          int idDetalleActividad = 1;
                          for (CeActividadDetalle ceDetalleActividad : ceCategorias.getActividades() ) {
                                System.out.println("Detalle actividad="+ceDetalleActividad.getIdDetalle());
                                
                                CeActividadDetalle detalleActividad = new CeActividadDetalle();
                                detalleActividad.setcCct(cCct);
                                detalleActividad.setcSesion(Constants.SEGUNDA_ASAMBLEA);
                                detalleActividad.setCeActividad(ceCategorias.getCeActividad());
                                detalleActividad.setIdDetalle(idDetalleActividad);
                                detalleActividad.setIdObjetivo(ceDetalleActividad.getIdObjetivo());
                                detalleActividad.setObjetivo(ceDetalleActividad.getObjetivo());
                                detalleActividad.setMeta(ceDetalleActividad.getMeta());
                                detalleActividad.setCumplio(ceDetalleActividad.getCumplio());
                                detalleActividad.setFuente(ceDetalleActividad.getFuente());
                                detalleActividad.setMonto1(ceDetalleActividad.getMonto1());
                                detalleActividad.setMonto2(ceDetalleActividad.getMonto2());
                                detalleActividad.setMontoStr1(ceDetalleActividad.getMontoStr1());
                                detalleActividad.setMontoStr2(ceDetalleActividad.getMontoStr2());
                                
                                ceActividadDetalleMapper.insert(detalleActividad);
                                idDetalleActividad++;
                          }
                          
                   }
                   else
                	   {
                	   System.out.println("Entro cuando la varibale tiene sesion"+ceCategorias.getcSesion());    	   
                	   CeActividad actividad = new CeActividad();
                       actividad.setcCct(cCct);
                       actividad.setcSesion(ceCategorias.getcSesion());
                       actividad.setCeActividad(ceCategorias.getCeActividad());  
                       actividad.setNomOtraCategoria(ceCategorias.getNomOtraCategoria());
                       
                                                 
                       ceActividadMapper.updateByPrimaryKey(actividad);
                       
                	   int idDetalleActividad = 1;
                       for (CeActividadDetalle ceDetalleActividad : ceCategorias.getActividades() ) {
                             System.out.println("Detalle actividad="+ceDetalleActividad.getIdDetalle());
                             
                             CeActividadDetalle detalleActividad = new CeActividadDetalle();
                             detalleActividad.setcCct(cCct);
                             
                             detalleActividad.setCeActividad(ceCategorias.getCeActividad());
                             detalleActividad.setIdDetalle(idDetalleActividad);
                             detalleActividad.setIdObjetivo(ceDetalleActividad.getIdObjetivo());
                             detalleActividad.setObjetivo(ceDetalleActividad.getObjetivo());
                             detalleActividad.setMeta(ceDetalleActividad.getMeta());
                             detalleActividad.setCumplio(ceDetalleActividad.getCumplio());
                             detalleActividad.setFuente(ceDetalleActividad.getFuente());
                             detalleActividad.setMonto1(ceDetalleActividad.getMonto1());
                             detalleActividad.setMonto2(ceDetalleActividad.getMonto2());
                             detalleActividad.setMontoStr1(ceDetalleActividad.getMontoStr1());
                             detalleActividad.setMontoStr2(ceDetalleActividad.getMontoStr2());
                             if(ceDetalleActividad.getcSesion()==null){
                            	 System.out.println("entro 1");
                            	 detalleActividad.setcSesion(Constants.SEGUNDA_ASAMBLEA);
                            	 ceActividadDetalleMapper.insert(detalleActividad);
                             }
                             else if (ceDetalleActividad.getcSesion()==Constants.SEGUNDA_ASAMBLEA){
                            	 System.out.println("entro 2");
                            	 detalleActividad.setcSesion(Constants.SEGUNDA_ASAMBLEA);
                            	 ceActividadDetalleMapper.updateByPrimaryKey(detalleActividad);
                            	 
                             }
                             else
                             {
                            	 if(ceDetalleActividad.getcSesion()!=4){
                            		 System.out.println("entro 3");
                            		 detalleActividad.setcSesion(Constants.SEGUNDA_ASAMBLEA);
                                	 ceActividadDetalleMapper.insert(detalleActividad);
                                	 }
                                	 else{
                            		 System.out.println("entro 4");
                            	 detalleActividad.setcSesion(Constants.SEGUNDA_ASAMBLEA);
                            	 ceActividadDetalleMapper.updateByPrimaryKey(detalleActividad);
                            	 }
                             }
                             
                             
                             idDetalleActividad++;
                       }
                	   }
                   }
                  }
            if(segundaAsambleaVO.getPreguntas2().getRespuesta3()!=null){ 
            CePreguntas2 preguntas2 = segundaAsambleaVO.getPreguntas2();
			preguntas2.setCctId(cCct);
			preguntas2.setcSesion(Constants.SEGUNDA_ASAMBLEA);
			cePreguntas2Mapper.insert(preguntas2);
            }
			System.out.println("Grabo todos XD ");
			numRecords=1;	
		}catch(Exception e){
			try{
				System.out.println("Entro al error"+e);
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(segundaAsambleaVO));
			}catch(Exception ex){
				
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura (e,"servicios.segunda.sesion.error.editar",new Object[]{});
		}

		//Regresa el número de registros de c_sesion insertados
		//Cómo válido deberá se uno y solo uno
		return numRecords;

	}
	
	/**
	 * Da de baja logica al Consejo del CCT dado
	 * @param cCct Clave dle CCT a ser dado de baja
	 */
	public int deleteSegundaAsamblea1415(Integer cCct,Integer opcion) throws Exception {
		
		/*
		 * Elimina eliminan los datos de la segunda sesion 
		 */
		System.out.println("entro al delete 1");
		int numRecords = -1;
		
		try{
			//Elimina la Segunda Asamblea dado que afecta la constitucion de su Acta 
		
	//opcion 1 borra todo, opcion 2 es el guardado		
			if(opcion==1){
	
			//Se elimina el detalle de programas federales de la primera sesión para el CCT dado.
			CeProgramasDetalleExample detalleFederal = new CeProgramasDetalleExample();
			detalleFederal.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceProgramasDetalleMapper.deleteByExample(detalleFederal);
			
			System.out.println("entro al delete 2");
			//Se eliminan los datos de programas federales de la primera sesión para el CCT dado.
			CeProgramasExample programaFederal = new CeProgramasExample();
			programaFederal.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceProgramasMapper.deleteByExample(programaFederal);
			
			System.out.println("entro al delete 3");
			//Se eliminan los datos de programas seguimiento
			CeProgramasSeguimientoExample programaSeguimiento = new CeProgramasSeguimientoExample();
			programaSeguimiento.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceProgramaSeguimientoMapper.deleteByExample(programaSeguimiento);			
			}

			System.out.println("entro al delete 4");
			//Se eliminan los acciones de seguimiento
			CeAccionSeguimientoExample acciones = new CeAccionSeguimientoExample();
			acciones.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceAccionSeguimientoMapper.deleteByExample(acciones);			
			
			System.out.println("entro al delete 5");
			//Se eliminan los evaluacion
			CeEvaluacionesExample evaluacion = new CeEvaluacionesExample();
			evaluacion.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceEvaluacionMapper.deleteByExample(evaluacion);			
			
			System.out.println("entro al delete 6");
			//Se eliminan los normalidad
			CeNormalidadExample normalidad = new CeNormalidadExample();
			normalidad.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceNormalidadMapper.deleteByExample(normalidad);
			
			System.out.println("entro al delete 7");
			//Se eliminan los comites de la primera sesión para el CCT dado.
			CeComitesSeguimientoExample comitesSeguimiento = new CeComitesSeguimientoExample();
			comitesSeguimiento.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceComitesSeguimientoMapper.deleteByExample(comitesSeguimiento);			
			
			System.out.println("entro al delete 8");
			//Se eliminan los comites de la primera sesión para el CCT dado.
			CeComitesExample comites = new CeComitesExample();
			comites.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceComitesMapper.deleteByExample(comites);
			
			System.out.println("entro al delete de contraloria social");
			CeContraloriaComiteExample ceContraloriaComite = new CeContraloriaComiteExample();
			ceContraloriaComite.createCriteria().andCCctEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			System.out.println("borrar preguntas estatales  "+ceContraloriaComite.toString());
			ceContraloriaComiteMapper.deleteByExample(ceContraloriaComite);

			System.out.println("entro al delete de programa comite");
			CeProgramaComiteExample ceProgramaComite = new CeProgramaComiteExample();
			ceProgramaComite.createCriteria().andCCctEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			System.out.println("borrar preguntas estatales  "+ceProgramaComite.toString());
			ceProgramaComiteMapper.deleteByExample(ceProgramaComite);

			
			System.out.println("entro al delete de actividad comite");
			CeActividadComiteExample ceActividadComite = new CeActividadComiteExample();
			ceActividadComite.createCriteria().andCCctEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			System.out.println("borrar preguntas estatales  "+ceActividadComite.toString());
			ceActividadComiteMapper.deleteByExample(ceActividadComite);

			System.out.println("entro al delete 9");
			//Se eliminan los recursos
			CeCompromisosExample compromiso = new CeCompromisosExample();
			compromiso.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceCompromisosMapper.deleteByExample(compromiso);
			
			System.out.println("entro al delete 10");
			//Se eliminan los eventos
			CeProgramasParticipacionExample recurso = new CeProgramasParticipacionExample();
			recurso.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceProgramasParticipacionMapper.deleteByExample(recurso);			
			
			System.out.println("entro al delete 11");
			//Se eliminan los eventos
			CeEventosExample evento = new CeEventosExample();
			evento.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceEventosMapper.deleteByExample(evento);			
			
			System.out.println("entro al delete 12");
			//Se eliminan los estimulos
			CeEstimulosExample estimulos = new CeEstimulosExample();
			estimulos.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceEstimulosMapper.deleteByExample(estimulos);
			
			System.out.println("entro al delete 13");
			//Se eliminan los datos de asuntos de la primera sesión para el CCT dado.
			CeAsuntoExample asuntos = new CeAsuntoExample();
			asuntos.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceAsuntoMapper.deleteByExample(asuntos);
			
			System.out.println("entro al delete 14");
			//se eliminan respuestas
			CePreguntas2Example cePreguntasCriteria2 = new CePreguntas2Example();
			cePreguntasCriteria2.createCriteria().andCctIdEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			cePreguntas2Mapper.deleteByExample(cePreguntasCriteria2);

			System.out.println("entro al delete 15");
            //elimina respuesta preguntas estatales			
			CePreguntasEstatalExample cePreguntasEstatal = new CePreguntasEstatalExample();
			cePreguntasEstatal.createCriteria().andCctIdEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			System.out.println("borrar preguntas estatales  "+cePreguntasEstatal.toString());
			cePreguntasEstatalMapper.deleteByExample(cePreguntasEstatal);

			System.out.println("entro al delete 16");
            //elimina respuesta preguntas municipal			
			CePreguntasMunicipalExample cePreguntasMunicipal = new CePreguntasMunicipalExample();
			cePreguntasMunicipal.createCriteria().andCctIdEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			cePreguntasMunicipalMapper.deleteByExample(cePreguntasMunicipal);
			
			System.out.println("entro al delete 17");
			//elimina respuesta pregunta recursos padres			
			CePreguntaRecursosPadresExample cePreguntaRecursosPadres = new CePreguntaRecursosPadresExample();
			cePreguntaRecursosPadres.createCriteria().andCctIdEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			cePreguntaRecursosPadresMapper.deleteByExample(cePreguntaRecursosPadres);
		
			System.out.println("entro al delete 18");
			//elimina estimulos municipales			
			CeEstimulosMunicipalExample ceEstimulosMunicipal = new CeEstimulosMunicipalExample();
			ceEstimulosMunicipal.createCriteria().andCCctEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceEstimulosMunicipalMapper.deleteByExample(ceEstimulosMunicipal);
		
			System.out.println("entro al delete 19");
			//elimina estimulos municipales			
			CeRecursosPadresExample ceRecursosPadres = new CeRecursosPadresExample();
			ceRecursosPadres.createCriteria().andCCctEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceRecursosPadresMapper.deleteByExample(ceRecursosPadres);
			if(opcion==1){
			System.out.println("entro al delete 20");
			//Se eliminan los detalles de actividades adicionales de la primera sesión para el CCT dado.
			CeActividadDetalleExample actividadDetalle = new CeActividadDetalleExample();
			actividadDetalle.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceActividadDetalleMapper.deleteByExample(actividadDetalle);
			
			System.out.println("entro al delete 21");
			//Se eliminan los actividades adicionales de la primera sesión para el CCT dado.
			CeActividadExample actividad = new CeActividadExample();
			actividad.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceActividadMapper.deleteByExample(actividad);
			}
			System.out.println("entro al delete 22");
			//Se eliminan los datos de actividades de la segunda sesión para el CCT dado.
			CeActSesionExample actividadesCriteria = new CeActSesionExample();
			actividadesCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.SEGUNDA_ASAMBLEA);
			ceActSesionMapper.deleteByExample(actividadesCriteria);	

			System.out.println("entro al delete 23");
			
		
			//Se eliminan los datos de la segunda asamblea para el CCT dado.
			numRecords = ceSesionMapper.deleteByPrimaryKey(cCct,Constants.SEGUNDA_ASAMBLEA);
			System.out.println("entro al delete 24");
			numRecords=1;
		}catch(Exception e){
			System.out.println("entro al error"+e);
			throw new ErrorInfraestructura (e,"servicios.segunda.sesion.error.eliminar",new Object[]{});
			
		}
		
		return numRecords;
	}

	/**
	 * Consulta la informacion de la segunda asamblea dado un CCT
	 */
	public SegundaAsamblea1415VO selectSegundaAsamblea1415(Integer cCct) throws Exception{

		SegundaAsamblea1415VO segundaAsambleaVO = segundaAsamblea1415Mapper
				.selectSegundaAsamblea(cCct);

			return segundaAsambleaVO;
	}
	
}
