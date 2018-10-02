package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.repuce.dao.CCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CctResultEnlaceMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAccionSeguimientoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAsuntoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComIntegrantesMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComitesMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComitesSeguimientoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeCompEnlaceMapper;
import mx.gob.sep.dgtec.repuce.dao.CeCompromisosMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEstimulosMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEvaluacionesMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEventosMapper;
import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.dao.CeMetaEnlaceMapper;
import mx.gob.sep.dgtec.repuce.dao.CeNormalidadMapper;
import mx.gob.sep.dgtec.repuce.dao.CePreguntas2Mapper;
import mx.gob.sep.dgtec.repuce.dao.CePreguntasMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasDetalleMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasParticipacionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasSeguimientoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.HCeMetaEnlaceMapper;
import mx.gob.sep.dgtec.repuce.dao.SegundaSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.SegundaSesionC1415Mapper;
import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CctResultEnlaceExample;
import mx.gob.sep.dgtec.repuce.model.CeAccionCstm;
import mx.gob.sep.dgtec.repuce.model.CeAccionSeguimiento;
import mx.gob.sep.dgtec.repuce.model.CeAccionSeguimientoExample;
import mx.gob.sep.dgtec.repuce.model.CeActSesion;
import mx.gob.sep.dgtec.repuce.model.CeActSesionExample;
import mx.gob.sep.dgtec.repuce.model.CeAsunto;
import mx.gob.sep.dgtec.repuce.model.CeAsuntoExample;
import mx.gob.sep.dgtec.repuce.model.CeComIntegrantes;
import mx.gob.sep.dgtec.repuce.model.CeComIntegrantesExample;
import mx.gob.sep.dgtec.repuce.model.CeComites;
import mx.gob.sep.dgtec.repuce.model.CeComitesCstm;
import mx.gob.sep.dgtec.repuce.model.CeComitesExample;
import mx.gob.sep.dgtec.repuce.model.CeComitesSeguimiento;
import mx.gob.sep.dgtec.repuce.model.CeComitesSeguimientoExample;
import mx.gob.sep.dgtec.repuce.model.CeCompEnlace;
import mx.gob.sep.dgtec.repuce.model.CeCompEnlaceExample;
import mx.gob.sep.dgtec.repuce.model.CeCompromisos;
import mx.gob.sep.dgtec.repuce.model.CeCompromisosCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompromisosExample;
import mx.gob.sep.dgtec.repuce.model.CeEstimulos;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosCstm;
import mx.gob.sep.dgtec.repuce.model.CeEstimulosExample;
import mx.gob.sep.dgtec.repuce.model.CeEvaluaciones;
import mx.gob.sep.dgtec.repuce.model.CeEvaluacionesExample;
import mx.gob.sep.dgtec.repuce.model.CeEventos;
import mx.gob.sep.dgtec.repuce.model.CeEventosCstm;
import mx.gob.sep.dgtec.repuce.model.CeEventosExample;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlaceExample;
import mx.gob.sep.dgtec.repuce.model.CeNormalidad;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadCstm;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadExample;
import mx.gob.sep.dgtec.repuce.model.CePreguntas;
import mx.gob.sep.dgtec.repuce.model.CePreguntas2;
import mx.gob.sep.dgtec.repuce.model.CePreguntas2Example;
import mx.gob.sep.dgtec.repuce.model.CePreguntasExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramaDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramaSeguimientoC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramas;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalle;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalleCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalleExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramasExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacion;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramasParticipacionExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramasRecursosAsignados;
import mx.gob.sep.dgtec.repuce.model.CeProgramasSeguimiento;
import mx.gob.sep.dgtec.repuce.model.CeProgramasSeguimientoExample;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraSesionService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaAsambleaService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaSesionService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionC1415VO;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SegundaSesionServiceImpl implements SegundaSesionService{
	
	private static final Logger log = LoggerFactory.getLogger(SegundaSesionServiceImpl.class);
	
	@Autowired
	private CeInfGralMapper ceInfGralMapper;
	@Autowired
	private CCctMapper cCctMapper;
	@Autowired
	private SegundaSesionMapper segundaSesionMapper;
	@Autowired
	private SegundaSesionC1415Mapper segundaSesionC1415Mapper;
	@Autowired
	private CeSesionMapper ceSesionMapper;
	@Autowired
	private CeActSesionMapper ceActSesionMapper;
	@Autowired
	private CeMetaEnlaceMapper ceMetaEnlaceMapper;
	@Autowired
	private HCeMetaEnlaceMapper hCeMetaEnlaceMapper;
	@Autowired
	private CeCompEnlaceMapper ceCompEnlaceMapper;
	@Autowired
	private CctResultEnlaceMapper cctResultEnlaceMapper;
	@Autowired
	private CeProgramasDetalleMapper ceProgramasDetalleMapper;
	@Autowired
	private PrimeraSesionService primeraSesionService;
	@Autowired
	private SegundaAsambleaService segundaAsambleaService;
	//-------------------
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
	private CeComIntegrantesMapper ceComIntegrantesMapper;
	
	
	
	/**
	 * Guarda la informacion de la segunda sesión sesión
	 */
	public int saveSegundaSesion(SegundaSesionVO segundaSesionVO){
		
		Integer cCct =  segundaSesionVO.getCeInfGral().getcCct();
		int numRecords = -1;
		
		try{
		
			//Elimina los datos de la segunda sesión
			deleteSegundaSesion(cCct);
			
			/*
			 * Se guarda la informacion de la segunda sesión 
			 */
			//Se actualiza la fecha de la última modificación del la segunda sesion
			CeInfGral ceIngGral = new CeInfGral();
			ceIngGral.setcCct(cCct);
			ceIngGral.setFchActualizacion(new Date());
			ceInfGralMapper.updateByPrimaryKeySelective(ceIngGral);
	
			//Inserta la información de la segunda sesión para el CCT dado
			segundaSesionVO.getCeSesion().setcCct(cCct);
			segundaSesionVO.getCeSesion().setcSesion(Constants.SEGUNDA_SESION);
			segundaSesionVO.getCeSesion().setFchRegistro(new Date());
			numRecords = ceSesionMapper.insertSelective(segundaSesionVO.getCeSesion());
			
			//Inserta la información de actividades para la segunda sesión para el CCT dado
			if(segundaSesionVO.getActividades()!=null){
				for (CeActSesion ceActSesion : segundaSesionVO.getActividades()) {
					ceActSesion.setcCct(cCct);
					ceActSesion.setcSesion(Constants.SEGUNDA_SESION);
					ceActSesionMapper.insertSelective(ceActSesion);
				}
			}
			
			//Inserta la información de las metas registradas en la 
			//segunda sesión para el CCT dado.
			if(segundaSesionVO.getMetas()!=null){
				for (CeMetaEnlace ceMetaEnlace : segundaSesionVO.getMetas()) {
					ceMetaEnlace.setcCct(cCct);
					ceMetaEnlace.setcSesion(Constants.SEGUNDA_SESION);
					ceMetaEnlaceMapper.insertSelective(ceMetaEnlace);
				}
			}
			
			//Inserta la información de los compromisos registrados 
			//en la segunda sesión para el CCT dado.
			if(segundaSesionVO.getCompromisos()!=null){
				for (CeCompEnlace ceCompEnlace : segundaSesionVO.getCompromisos()) {
					ceCompEnlace.setcCct(cCct);
					ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
					ceCompEnlaceMapper.insertSelective(ceCompEnlace);
				}
			}
			
		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(segundaSesionVO));
			}catch(Exception ex){
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura (e,"servicios.segunda.sesion.error.editar",new Object[]{});
		}

		//Regresa el número de registros de c_sesion insertados
		//Cómo válido deberá se uno y solo uno
		return numRecords;
	}
	
    public int saveSegundaSesionC1415(SegundaSesionC1415VO segundaSesionVO){
		
    	System.out.println("En Save implementacion");
    	
		Integer cCct =  segundaSesionVO.getCeInfGral().getcCct();
		int numRecords = -1;
		
		try{
			
			//Elimina los datos de la segunda sesión
			deleteSegundaSesionC1415(cCct);
			
			//Se actualiza la fecha de la última modificación del la segunda sesion
			CeInfGral ceIngGral = new CeInfGral();
			ceIngGral.setcCct(cCct);
			ceIngGral.setFchActualizacion(new Date());
			ceInfGralMapper.updateByPrimaryKeySelective(ceIngGral);
			
			//Inserta la información de la segunda sesión para el CCT dado
			segundaSesionVO.getCeSesion().setcCct(cCct);
			segundaSesionVO.getCeSesion().setcSesion(Constants.SEGUNDA_SESION);
			segundaSesionVO.getCeSesion().setFchRegistro(new Date());
			numRecords = ceSesionMapper.insertSelective(segundaSesionVO.getCeSesion());
			
			//Inserta la información de actividades para la segunda sesión para el CCT dado
			if(segundaSesionVO.getActividades()!=null){
				for (CeActSesion ceActSesion : segundaSesionVO.getActividades()) {
					ceActSesion.setcCct(cCct);
					ceActSesion.setcSesion(Constants.SEGUNDA_SESION);
					ceActSesionMapper.insertSelective(ceActSesion);
				}
			}
			
			//Inserta la información de programas federales para la primera sesión para el CCT dado
			if(segundaSesionVO.getFederalActual() !=null){
				Short tipoPrograma = 0; 
				for (CeProgramaDetalleC1415Cstm ceProgramaFederal : segundaSesionVO.getFederalActual()) {
					System.out.println("Programa federal="+ceProgramaFederal.getNomPrograma());
					CeProgramas programaFederal = new CeProgramas();
					programaFederal.setcCct(cCct);
					programaFederal.setcSesion(Constants.SEGUNDA_SESION);
					programaFederal.setMonto(ceProgramaFederal.getMonto());
					programaFederal.setMontoStr(ceProgramaFederal.getMontoStr());
					programaFederal.setcPrograma(ceProgramaFederal.getIdPrograma());
					programaFederal.setTipoPrograma(tipoPrograma);
					programaFederal.setNomOtroPrograma(ceProgramaFederal.getNomOtroPrograma());
					ceProgramasMapper.insert(programaFederal);
					
					int idDetallePrograma = 1;
					for (CeProgramasDetalleCstm ceDetalleFederal : ceProgramaFederal.getObjetivos() ) {
						System.out.println("Detalle federal="+ceDetalleFederal.getIdObjetivo());
						CeProgramasDetalle detalleFederal = new CeProgramasDetalle();
						detalleFederal.setcCct(cCct);
						detalleFederal.setcSesion(Constants.SEGUNDA_SESION);
						detalleFederal.setcPrograma(ceProgramaFederal.getIdPrograma());						
						detalleFederal.setIdDetalle(idDetallePrograma);
						detalleFederal.setIdObjetivo(ceDetalleFederal.getIdObjetivo());						
						detalleFederal.setObjetivo(ceDetalleFederal.getObjetivo());
						detalleFederal.setMeta(ceDetalleFederal.getMeta());
						
						ceProgramasDetalleMapper.insert(detalleFederal);
						idDetallePrograma++;
					}
				}
			}
			
			//Inserta la información de programas Estatales para la primera sesión para el CCT dado
			if(segundaSesionVO.getEstatalActual() !=null){
				Short tipoPrograma = 1; 
				for (CeProgramaDetalleC1415Cstm ceProgramaEstatal : segundaSesionVO.getEstatalActual()) {
					System.out.println("Programa Estatal="+ceProgramaEstatal.getNomPrograma());
					CeProgramas programaEstatal = new CeProgramas();
					programaEstatal.setcCct(cCct);
					programaEstatal.setcSesion(Constants.SEGUNDA_SESION);
					programaEstatal.setMonto(ceProgramaEstatal.getMonto());
					programaEstatal.setMontoStr(ceProgramaEstatal.getMontoStr());
					programaEstatal.setcPrograma(ceProgramaEstatal.getIdPrograma());
					programaEstatal.setTipoPrograma(tipoPrograma);
					programaEstatal.setNomOtroPrograma(ceProgramaEstatal.getNomOtroPrograma());
									
					ceProgramasMapper.insert(programaEstatal);
					
					int idDetallePrograma = 1;
					for (CeProgramasDetalleCstm ceDetalleEstatal : ceProgramaEstatal.getObjetivos() ) {
						System.out.println("Detalle Estatal="+ceDetalleEstatal.getIdObjetivo());
						CeProgramasDetalle detalleEstatal = new CeProgramasDetalle();
						detalleEstatal.setcCct(cCct);
						detalleEstatal.setcSesion(Constants.SEGUNDA_SESION);
						detalleEstatal.setcPrograma(ceProgramaEstatal.getIdPrograma());						
						detalleEstatal.setIdDetalle(idDetallePrograma);
						detalleEstatal.setIdObjetivo(ceDetalleEstatal.getIdObjetivo());						
						detalleEstatal.setObjetivo(ceDetalleEstatal.getObjetivo());
						detalleEstatal.setMeta(ceDetalleEstatal.getMeta());
						
						ceProgramasDetalleMapper.insert(detalleEstatal);
						idDetallePrograma++;
					}
				}
			}
			
			//Inserta la información de programas Municipal para la primera sesión para el CCT dado
			if(segundaSesionVO.getMunicipalActual() !=null){
				Short tipoPrograma = 2; 
				for (CeProgramaDetalleC1415Cstm ceProgramaMunicipal : segundaSesionVO.getMunicipalActual()) {
					System.out.println("Programa Municipal="+ceProgramaMunicipal.getNomPrograma());
					CeProgramas programaMunicipal = new CeProgramas();
					programaMunicipal.setcCct(cCct);
					programaMunicipal.setcSesion(Constants.SEGUNDA_SESION);
					programaMunicipal.setMonto(ceProgramaMunicipal.getMonto());
					programaMunicipal.setMontoStr(ceProgramaMunicipal.getMontoStr());
					programaMunicipal.setcPrograma(ceProgramaMunicipal.getIdPrograma());
					programaMunicipal.setTipoPrograma(tipoPrograma);					
					programaMunicipal.setNomOtroPrograma(ceProgramaMunicipal.getNomOtroPrograma());
					ceProgramasMapper.insert(programaMunicipal);
					
					int idDetallePrograma = 1;
					for (CeProgramasDetalleCstm ceDetalleMunicipal : ceProgramaMunicipal.getObjetivos() ) {
						System.out.println("Detalle Municipal="+ceDetalleMunicipal.getIdObjetivo());
						CeProgramasDetalle detalleMunicipal = new CeProgramasDetalle();
						detalleMunicipal.setcCct(cCct);
						detalleMunicipal.setcSesion(Constants.SEGUNDA_SESION);
						detalleMunicipal.setcPrograma(ceProgramaMunicipal.getIdPrograma());						
						detalleMunicipal.setIdDetalle(idDetallePrograma);
						detalleMunicipal.setIdObjetivo(ceDetalleMunicipal.getIdObjetivo());						
						detalleMunicipal.setObjetivo(ceDetalleMunicipal.getObjetivo());
						detalleMunicipal.setMeta(ceDetalleMunicipal.getMeta());
						
						ceProgramasDetalleMapper.insert(detalleMunicipal);
						idDetallePrograma++;
					}
				}
			}	
			
			//Inserta la información de programas Osc para la primera sesión para el CCT dado
			if(segundaSesionVO.getOscActual() !=null){
				Short tipoPrograma = 3; 
				for (CeProgramaDetalleC1415Cstm ceProgramaOsc : segundaSesionVO.getOscActual()) {
					System.out.println("Programa Osc="+ceProgramaOsc.getNomPrograma());
					CeProgramas programaOsc = new CeProgramas();
					programaOsc.setcCct(cCct);
					programaOsc.setcSesion(Constants.SEGUNDA_SESION);
					programaOsc.setMonto(ceProgramaOsc.getMonto());
					programaOsc.setMontoStr(ceProgramaOsc.getMontoStr());
					programaOsc.setcPrograma(ceProgramaOsc.getIdPrograma());
					programaOsc.setTipoPrograma(tipoPrograma);					
					programaOsc.setNomOtroPrograma(ceProgramaOsc.getNomOtroPrograma());
					ceProgramasMapper.insert(programaOsc);
					
					int idDetallePrograma = 1;
					for (CeProgramasDetalleCstm ceDetalleOsc : ceProgramaOsc.getObjetivos() ) {
						System.out.println("Detalle Osc="+ceDetalleOsc.getIdObjetivo());
						CeProgramasDetalle detalleOsc = new CeProgramasDetalle();
						detalleOsc.setcCct(cCct);
						detalleOsc.setcSesion(Constants.SEGUNDA_SESION);
						detalleOsc.setcPrograma(ceProgramaOsc.getIdPrograma());						
						detalleOsc.setIdDetalle(idDetallePrograma);
						detalleOsc.setIdObjetivo(ceDetalleOsc.getIdObjetivo());						
						detalleOsc.setObjetivo(ceDetalleOsc.getObjetivo());
						detalleOsc.setMeta(ceDetalleOsc.getMeta());
						
						ceProgramasDetalleMapper.insert(detalleOsc);
						idDetallePrograma++;
					}
				}
			}

			//Inserta la información de Programas Seguimiento
			if(segundaSesionVO.getDetalleSeguimiento() !=null){				
				for(CeProgramaSeguimientoC1415Cstm programa : segundaSesionVO.getDetalleSeguimiento() ){
					CeProgramasSeguimiento rowProgSeg = new CeProgramasSeguimiento();					
					rowProgSeg.setcCct(cCct);
					rowProgSeg.setcSesion(programa.getcSesion());
					rowProgSeg.setcPrograma(programa.getIdPrograma());
					rowProgSeg.setIdDetalle(programa.getIdDetalle());
					rowProgSeg.setIdObjetivo(programa.getIdObjetivo());
					rowProgSeg.setAvance(programa.getAvance());
					rowProgSeg.setSeguimiento(programa.getSeguimiento());
					rowProgSeg.setMonto2Sesion(programa.getMonto2Sesion());
					rowProgSeg.setMontoStr2Sesion(programa.getMontoStr2Sesion());
					rowProgSeg.setCambioMonto(programa.getCambioMonto());
					
					ceProgramaSeguimientoMapper.insert(rowProgSeg);					
				}										
			}	

			
			//Inserta la información de Acciones
			if(segundaSesionVO.getAcciones() !=null){				
				for(CeAccionCstm acciones : segundaSesionVO.getAcciones() ){
					CeAccionSeguimiento rowAccion = new CeAccionSeguimiento();					
					rowAccion.setcCct(cCct);
					rowAccion.setcSesion(Constants.SEGUNDA_SESION);
					rowAccion.setIdAccion(acciones.getIdAccion());
					rowAccion.setAvanceAccion(acciones.getAvanceAccion());
					rowAccion.setAvanceRecomendacion(acciones.getAvanceRecomendacion());					
					
					ceAccionSeguimientoMapper.insert(rowAccion);					
				}										
			}	
			
			//Inserta la información de Normalidad
			if(segundaSesionVO.getNormalidad() !=null){				
				for(CeNormalidadCstm normalidad : segundaSesionVO.getNormalidad() ){
					CeNormalidad rowNormalidad = new CeNormalidad();					
					rowNormalidad.setcCct(cCct);
					rowNormalidad.setcSesion(Constants.SEGUNDA_SESION);
					rowNormalidad.setcNormalidad(normalidad.getcNormalidad());
					rowNormalidad.setOpcionCasiNunca(normalidad.getOpcionCasiNunca());
					rowNormalidad.setOpcionNunca(normalidad.getOpcionNunca());
					rowNormalidad.setOpcionCasiSiempre(normalidad.getOpcionCasiSiempre());
					rowNormalidad.setOpcionSiempre(normalidad.getOpcionSiempre());
					rowNormalidad.setAccion1(normalidad.getAccion1());
					rowNormalidad.setAccion2(normalidad.getAccion2());
															
					ceNormalidadMapper.insert(rowNormalidad);					
				}										
			}				
			
			//Inserta la información de Evaluacion
			if(segundaSesionVO.getEvaluacion() !=null){				
				for(CeEvaluaciones evaluacion : segundaSesionVO.getEvaluacion() ){
					//CeEvaluaciones rowEvaluacion = new CeEvaluaciones();					
					evaluacion.setcCct(cCct);
					evaluacion.setcSesion(Constants.SEGUNDA_SESION);															
															
					ceEvaluacionMapper.insert(evaluacion);
				}										
			}
			
			//Inserta la información de comites seguimiento
			if(segundaSesionVO.getComiteActual() !=null){
				int idComites=1;
				for(CeComitesCstm comites : segundaSesionVO.getComiteActual() ){
					CeComites rowComite = new CeComites();
					rowComite.setcCct(cCct);
					rowComite.setcSesion(Constants.SEGUNDA_SESION);
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
					rowComiteS.setcSesion(Constants.SEGUNDA_SESION);
					rowComiteS.setIdComite(comites.getIdComite());
					rowComiteS.setAccion1(comites.getAccion1());
					rowComiteS.setAccion2(comites.getAccion2());
					rowComiteS.setAccion3(comites.getAccion3());
					rowComiteS.setAccion4(comites.getAccion4());
					rowComiteS.setAccion5(comites.getAccion5());	
					
					ceComitesSeguimientoMapper.insert(rowComiteS);
					
					idComites++;
				}										
			}
			
			//Inserta la información de comites seguimiento
			if(segundaSesionVO.getComiteSeguimiento() !=null){
				
				for(CeComitesCstm comites : segundaSesionVO.getComiteSeguimiento() ){
					CeComitesSeguimiento rowComite = new CeComitesSeguimiento();
					rowComite.setcCct(cCct);
					rowComite.setcSesion(Constants.SEGUNDA_SESION);
					rowComite.setIdComite(comites.getIdComite());
					rowComite.setAccion1(comites.getAccion1());
					rowComite.setAccion2(comites.getAccion2());
					rowComite.setAccion3(comites.getAccion3());
					rowComite.setAccion4(comites.getAccion4());
					rowComite.setAccion5(comites.getAccion5());					
										
					ceComitesSeguimientoMapper.insert(rowComite);										
				}										
			}

			//Inserta la información de los integrantes de los comites
			if(segundaSesionVO.getIntegrantesComites() !=null){
				
				for(CeComIntegrantes comitesInte : segundaSesionVO.getIntegrantesComites() ){
					CeComIntegrantes rowComiteInte = new CeComIntegrantes();
					rowComiteInte.setcCct(cCct);
					rowComiteInte.setcSesion(Constants.SEGUNDA_SESION);
					rowComiteInte.setId(comitesInte.getId());
					rowComiteInte.setcCalidad(comitesInte.getcCalidad());
					rowComiteInte.setEsMiembroCe(comitesInte.getEsMiembroCe());
					rowComiteInte.setIdComite(comitesInte.getIdComite());
					rowComiteInte.setIdIntegrante(comitesInte.getIdIntegrante());
					rowComiteInte.setNombreIntegrante(comitesInte.getNombreIntegrante());
					rowComiteInte.setNomComites(comitesInte.getNomComites());
					rowComiteInte.setNomEsMiembroCe(comitesInte.getNomEsMiembroCe());
										
					ceComIntegrantesMapper.insert(rowComiteInte);										
				}										
			}
			//Inserta la información de Recursos
			if(segundaSesionVO.getProgramaRecursos() !=null){
				Short idCompromiso=1;
				for(CeProgramasParticipacionCstm recursos : segundaSesionVO.getProgramaRecursos() ){
					CeProgramasParticipacion rowPrograma = new CeProgramasParticipacion();					
					rowPrograma.setcCct(cCct);
					rowPrograma.setcSesion(Constants.SEGUNDA_SESION);
					rowPrograma.setcParticipacion(recursos.getcParticipacion());
					rowPrograma.setTprogramaFederales(recursos.getTprogramaFederales());
					rowPrograma.setTprogramaEstatales(recursos.getTprogramaEstatales());
					rowPrograma.setTprogramaMunicipales(recursos.getTprogramaMunicipales());
					rowPrograma.setTprogramaOsc(recursos.getTprogramaOsc());
										
					ceProgramasParticipacionMapper.insert(rowPrograma);
					idCompromiso++;
				}										
			}			
			
			//Inserta la información de compromisos
			if(segundaSesionVO.getCompromiso() !=null){
				Short idCompromiso=1;
				for(CeCompromisosCstm compromisos : segundaSesionVO.getCompromiso() ){
					CeCompromisos rowCompromiso = new CeCompromisos();					
					rowCompromiso.setcCct(cCct);
					rowCompromiso.setcSesion(Constants.SEGUNDA_SESION);
					rowCompromiso.setIdCompromiso(compromisos.getIdCompromiso());
					rowCompromiso.setIdConsecutivo(idCompromiso);
					rowCompromiso.setAccion1(compromisos.getAccion1());
					rowCompromiso.setAccion2(compromisos.getAccion2());
					rowCompromiso.setNomOtroCompromiso(compromisos.getNomOtroCompromiso());
					
					ceCompromisosMapper.insert(rowCompromiso);
					idCompromiso++;
				}										
			}
			
			//Inserta la información de eventos 
			if(segundaSesionVO.getEventos() !=null){
				Short idEstimulo=1;
				for(CeEventosCstm eventos : segundaSesionVO.getEventos() ){
					CeEventos rowEvento = new CeEventos();					
					rowEvento.setcCct(cCct);
					rowEvento.setcSesion(Constants.SEGUNDA_SESION);					
					rowEvento.setcEvento(eventos.getcEvento());
					rowEvento.setFechaHorariosProgramados(eventos.getFechaHorariosProgramados());
					rowEvento.setFuenteRecursos(eventos.getFuenteRecursos());
					rowEvento.setNomOtroEvento(eventos.getNomOtroEvento());
					rowEvento.setNomOtroFr(eventos.getNomOtroFr());
					
					ceEventosMapper.insert(rowEvento);					
					idEstimulo++;
				}										
			}
			
			//Inserta la información de estimulos y reconocimientos 
			if(segundaSesionVO.getEstimulos() !=null){
				Short idEstimulo=1;
				for(CeEstimulosCstm estimulos : segundaSesionVO.getEstimulos() ){
					CeEstimulos rowEstimulo = new CeEstimulos();					
					rowEstimulo.setcCct(cCct);
					rowEstimulo.setcSesion(Constants.SEGUNDA_SESION);
					rowEstimulo.setIdConsecutivo(idEstimulo);
					rowEstimulo.setCandidato(estimulos.getCandidato());
					rowEstimulo.setEstimulo(estimulos.getEstimulo());
					rowEstimulo.setcEstimulo(estimulos.getcEstimulo());
					rowEstimulo.setNomOtroEstimulo(estimulos.getNomOtroEstimulo());
					ceEstimulosMapper.insert(rowEstimulo);					
					idEstimulo++;
				}										
			}
			
			//Inserta la información de asuntos para la primera sesión para el CCT dado
			if(segundaSesionVO.getAsunto() !=null){
				Short idAsuntos=1;
				for(CeAsunto asuntos : segundaSesionVO.getAsunto() ){
					asuntos.setcCct(cCct);
					asuntos.setcSesion(Constants.SEGUNDA_SESION);
					asuntos.setCscAsunto(idAsuntos);
					ceAsuntoMapper.insert(asuntos);
					
					idAsuntos++;
				}										
			}
			
			CePreguntas2 preguntas2 = segundaSesionVO.getPreguntas2();
			preguntas2.setCctId(cCct);
			preguntas2.setcSesion(Constants.SEGUNDA_SESION);
			cePreguntas2Mapper.insert(preguntas2);
			
			
			numRecords=1;	
		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(segundaSesionVO));
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
	public int deleteSegundaSesionC1415(Integer cCct){
		/*
		 * Elimina eliminan los datos de la segunda sesion 
		 */
		int numRecords = -1;
		
		try{
			//Elimina la Segunda Asamblea dado que afecta la constitucion de su Acta 
			segundaAsambleaService.deleteSegundaAsamblea1415(cCct,1);
			
			//Se eliminan los datos de actividades de la segunda sesión para el CCT dado.
			CeActSesionExample actividadesCriteria = new CeActSesionExample();
			actividadesCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceActSesionMapper.deleteByExample(actividadesCriteria);	

			//Se eliminan los datos de programas seguimiento
			CeProgramasSeguimientoExample programaSeguimiento = new CeProgramasSeguimientoExample();
			programaSeguimiento.createCriteria().andCCctEqualTo(cCct).andCSesionBetween(Constants.PRIMERA_SESION,Constants.SEGUNDA_ASAMBLEA);
			ceProgramaSeguimientoMapper.deleteByExample(programaSeguimiento);
			
			//Se elimina el detalle de programas federales de la primera sesión para el CCT dado.
			CeProgramasDetalleExample detalleFederal = new CeProgramasDetalleExample();
			detalleFederal.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceProgramasDetalleMapper.deleteByExample(detalleFederal);
			
			//Se eliminan los datos de programas federales de la primera sesión para el CCT dado.
			CeProgramasExample programaFederal = new CeProgramasExample();
			programaFederal.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceProgramasMapper.deleteByExample(programaFederal);
			
					
			
			//Se eliminan los acciones de seguimiento
			CeAccionSeguimientoExample acciones = new CeAccionSeguimientoExample();
			acciones.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceAccionSeguimientoMapper.deleteByExample(acciones);			
			
			//Se eliminan los evaluacion
			CeEvaluacionesExample evaluacion = new CeEvaluacionesExample();
			evaluacion.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceEvaluacionMapper.deleteByExample(evaluacion);			
			
			//Se eliminan los normalidad
			CeNormalidadExample normalidad = new CeNormalidadExample();
			normalidad.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceNormalidadMapper.deleteByExample(normalidad);
			
			//Se eliminan los eventos
			CeComIntegrantesExample comiteIntegrantes = new CeComIntegrantesExample();
			comiteIntegrantes.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceComIntegrantesMapper.deleteByExample(comiteIntegrantes);
			
			//Se eliminan los comites de la primera sesión para el CCT dado.
			CeComitesSeguimientoExample comitesSeguimiento = new CeComitesSeguimientoExample();
			comitesSeguimiento.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceComitesSeguimientoMapper.deleteByExample(comitesSeguimiento);			
			
			//Se eliminan los comites de la primera sesión para el CCT dado.
			CeComitesExample comites = new CeComitesExample();
			comites.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceComitesMapper.deleteByExample(comites);
			
			//Se eliminan los recursos
			CeCompromisosExample compromiso = new CeCompromisosExample();
			compromiso.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceCompromisosMapper.deleteByExample(compromiso);
			
			
			//Se eliminan los eventos
			CeProgramasParticipacionExample recurso = new CeProgramasParticipacionExample();
			recurso.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceProgramasParticipacionMapper.deleteByExample(recurso);			
			
			//Se eliminan los eventos
			CeEventosExample evento = new CeEventosExample();
			evento.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceEventosMapper.deleteByExample(evento);	
			
						
			//Se eliminan los estimulos
			CeEstimulosExample estimulos = new CeEstimulosExample();
			estimulos.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceEstimulosMapper.deleteByExample(estimulos);
			
			//Se eliminan los datos de asuntos de la primera sesión para el CCT dado.
			CeAsuntoExample asuntos = new CeAsuntoExample();
			asuntos.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceAsuntoMapper.deleteByExample(asuntos);
			
			//se eliminan respuestas
			CePreguntas2Example cePreguntasCriteria2 = new CePreguntas2Example();
			cePreguntasCriteria2.createCriteria().andCctIdEqualTo(cCct)
			.andCSesionEqualTo(Constants.SEGUNDA_SESION);
			cePreguntas2Mapper.deleteByExample(cePreguntasCriteria2);
			
			//Se eliminan los datos de la segunda sesión para el CCT dado.
			numRecords = ceSesionMapper.deleteByPrimaryKey(cCct,Constants.SEGUNDA_SESION);
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"servicios.segunda.sesion.error.eliminar",new Object[]{});
		}
		
		return numRecords;
			
	}

	public int deleteSegundaSesion(Integer cCct){
		/*
		 * Elimina eliminan los datos de la segunda sesion 
		 */
		int numRecords = -1;
		
		try{
			//Elimina la Segunda Asamblea dado que afecta la constitucion de su Acta 
			segundaAsambleaService.deleteSegundaAsamblea(cCct);

			//Se eliminan los compromisos de la segunda sesión para el CCT dado.
			CeCompEnlaceExample ceCompEnlaceExample = new CeCompEnlaceExample();
			ceCompEnlaceExample.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceCompEnlaceMapper.deleteByExample(ceCompEnlaceExample);
	
			//Se eliminan las metas de la segunda sesión para el CCT dado.
			CeMetaEnlaceExample ceMetaEnlaceExample = new CeMetaEnlaceExample();
			ceMetaEnlaceExample.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceMetaEnlaceMapper.deleteByExample(ceMetaEnlaceExample);
			
			//Se eliminan los datos de actividades de la segunda sesión para el CCT dado.
			CeActSesionExample actividadesCriteria = new CeActSesionExample();
			actividadesCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.SEGUNDA_SESION);
			ceActSesionMapper.deleteByExample(actividadesCriteria);	
			
			//Se eliminan los datos de la segunda sesión para el CCT dado.
			numRecords = ceSesionMapper.deleteByPrimaryKey(cCct,Constants.SEGUNDA_SESION);
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"servicios.segunda.sesion.error.eliminar",new Object[]{});
		}
		
		return numRecords;
			
	}
	/**
	 * Consulta la informacion de la segunda sesión dado un CCT
	 */
	public SegundaSesionVO selectSegundaSesion(Integer cCct){

		return segundaSesionMapper.selectSegundaSesion(cCct);
	}
	
	public SegundaSesionC1415VO selectSegundaSesionC1415(Integer cCct){

		System.out.println("Buscando segunda sesion");
		
		SegundaSesionC1415VO segC1415VO = segundaSesionC1415Mapper.selectSegundaSesionC1415(cCct);
		
		System.out.println("Regreso de segunda sesion");
		
		System.out.println("Valor de segunda sesion"+segC1415VO);
		
		return segC1415VO;
	}
	
	public List<CctResultEnlace> selectResultadosEnlace(Integer cCct){
		
		List <CctResultEnlace> resultados;
		
		CctResultEnlaceExample example = new CctResultEnlaceExample();
		example.createCriteria().andCCctEqualTo(cCct);
		example.setOrderByClause("anio_result");
		resultados = cctResultEnlaceMapper.selectByExample(example);	
		
		return resultados;
	}

	public List<CeProgramasDetalle> selectDetalle(Integer idPrograma, Integer cCct){
		
		System.out.println("Recuperando valor del programa seleccionado-impl-1");
		
		List <CeProgramasDetalle> resultados;
		
		CeProgramasDetalleExample example = new CeProgramasDetalleExample();
		short cPrograma = idPrograma.shortValue();
		
		example.createCriteria().andCCctEqualTo(cCct).andCProgramaEqualTo(cPrograma);		
		resultados = ceProgramasDetalleMapper.selectByExample(example);	
		
		System.out.println("Recuperando valor del programa seleccionado-impl-2");
		return resultados;	
	}
}
