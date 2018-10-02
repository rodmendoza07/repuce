package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TimeZone;

import mx.gob.sep.dgtec.repuce.dao.CCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAccionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActividadDetalleMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActividadMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAsuntoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComiteIntegranteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComitesMapper;
import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.dao.CeIntegranteComiteConsejoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeIntegranteComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeNormalidadMapper;
import mx.gob.sep.dgtec.repuce.dao.CePlaneacionMapper;
import mx.gob.sep.dgtec.repuce.dao.CePreguntas2Mapper;
import mx.gob.sep.dgtec.repuce.dao.CePreguntasMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramaMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasDetalleMapper;
import mx.gob.sep.dgtec.repuce.dao.CeProgramasMapper;
import mx.gob.sep.dgtec.repuce.dao.CeRecursoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeTemaMapper;
import mx.gob.sep.dgtec.repuce.dao.PrimeraSesionC1415Mapper;
import mx.gob.sep.dgtec.repuce.dao.PrimeraSesionMapper;
import mx.gob.sep.dgtec.repuce.model.CeAccion;
import mx.gob.sep.dgtec.repuce.model.CeAccionExample;
import mx.gob.sep.dgtec.repuce.model.CeActSesion;
import mx.gob.sep.dgtec.repuce.model.CeActSesionExample;
import mx.gob.sep.dgtec.repuce.model.CeActividad;
import mx.gob.sep.dgtec.repuce.model.CeActividadDetalle;
import mx.gob.sep.dgtec.repuce.model.CeActividadDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeActividadDetalleExample;
import mx.gob.sep.dgtec.repuce.model.CeActividadExample;
import mx.gob.sep.dgtec.repuce.model.CeAsunto;
import mx.gob.sep.dgtec.repuce.model.CeAsuntoExample;
import mx.gob.sep.dgtec.repuce.model.CeComite;
import mx.gob.sep.dgtec.repuce.model.CeComiteExample;
import mx.gob.sep.dgtec.repuce.model.CeComiteIntegrante;
import mx.gob.sep.dgtec.repuce.model.CeComiteIntegranteExample;
import mx.gob.sep.dgtec.repuce.model.CeComites;
import mx.gob.sep.dgtec.repuce.model.CeComitesExample;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteComite;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteComiteConsejo;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteComiteConsejoExample;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteComiteExample;
import mx.gob.sep.dgtec.repuce.model.CeNormalidad;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadCstm;
import mx.gob.sep.dgtec.repuce.model.CeNormalidadExample;
import mx.gob.sep.dgtec.repuce.model.CePreguntas;
import mx.gob.sep.dgtec.repuce.model.CePreguntas2;
import mx.gob.sep.dgtec.repuce.model.CePreguntas2Example;
import mx.gob.sep.dgtec.repuce.model.CePreguntasExample;
import mx.gob.sep.dgtec.repuce.model.CePrograma;
import mx.gob.sep.dgtec.repuce.model.CeProgramaDetalleC1415Cstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramas;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalle;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalleCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramasDetalleExample;
import mx.gob.sep.dgtec.repuce.model.CeProgramasExample;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;
import mx.gob.sep.dgtec.repuce.model.CeRecursoExample;
import mx.gob.sep.dgtec.repuce.model.CeTema;
import mx.gob.sep.dgtec.repuce.model.CeTemaExample;
import mx.gob.sep.dgtec.repuce.servicios.CuartaSesionService;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraSesionService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaAsambleaService;
//import mx.gob.sep.dgtec.repuce.servicios.SegundaSesionService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ComiteVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionC1415VO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionVO;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrimeraSesionServiceImpl implements PrimeraSesionService{
	
	private static final Logger log = LoggerFactory.getLogger(PrimeraSesionServiceImpl.class);
	
	@Autowired
	private PrimeraSesionMapper primeraSesionMapper;
	@Autowired
	private PrimeraSesionC1415Mapper primeraSesionC1415Mapper;
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
	private CeRecursoMapper ceRecursoMapper;
	@Autowired
	private CeComiteMapper ceComiteMapper;
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
	private CuartaSesionService cuartaSesionService;
	//-------------------
	@Autowired
	private CeProgramasMapper ceProgramasMapper;
	@Autowired
	private CeProgramasDetalleMapper ceProgramasDetalleMapper;
	@Autowired
	private CeAsuntoMapper ceAsuntoMapper;
	@Autowired
	private CeTemaMapper ceTemaMapper;
	@Autowired
	private CeAccionMapper ceAccionMapper;
	@Autowired
	private CeActividadMapper ceActividadMapper;
	@Autowired
	private CeActividadDetalleMapper ceActividadDetalleMapper;
	@Autowired
	private CeComitesMapper ceComitesMapper;
	@Autowired
	private CeNormalidadMapper ceNormalidadMapper;
	
	@Autowired
	private CePreguntas2Mapper cePreguntas2Mapper;
	//-------------------
	/**
	 * Guarda la informacion de la primer sesión
	 * @param primeraSesionVO La información de la primera sesión a ser insertada
	 */
	public int savePrimeraSesionC1415(PrimeraSesionC1415VO primeraSesionVO){
		System.out.println("Grabando 1ra Sesion... Inicio");
		
		Integer cCct =  primeraSesionVO.getCeInfGral().getcCct();
		int numRecords = -1;
		
		try{
			
			/*
			 * Elimina los datos de la primera sesion 
			 */
			deletePrimeraSesion(cCct);
			
			//Se actualiza la fecha de la última modificación del la primera sesion
			CeInfGral ceIngGral = new CeInfGral();
			ceIngGral.setcCct(cCct);
			ceIngGral.setFchActualizacion(new Date());
			
			//Camnbia el estatus del CE una vez registrada la Primera Sesion
			//ceIngGral.setStatusCe(Constants.EDO_CE_MODIFICADO);  
			ceInfGralMapper.updateByPrimaryKeySelective(ceIngGral);
			
			//Inserta la información de la primera sesión para el CCT dado
			primeraSesionVO.getCeSesion().setcCct(cCct);
			primeraSesionVO.getCeSesion().setcSesion(Constants.PRIMERA_SESION);
			primeraSesionVO.getCeSesion().setFchRegistro(new Date());
			
			
			SimpleDateFormat GMT = new SimpleDateFormat("yyyy-MM-dd");
			SimpleDateFormat SYD = new SimpleDateFormat("yyyy-MM-dd");
			GMT.setTimeZone(TimeZone.getTimeZone("GMT"));
			SYD.setTimeZone(TimeZone.getTimeZone("Australia/Sydney"));
			  
			SimpleDateFormat formatoDelTexto1 = new SimpleDateFormat("yyyy-MM-dd");
			Date fecha1 = null;
			fecha1 = formatoDelTexto1.parse(SYD.format(primeraSesionVO.getCeSesion().getFchSesion()));
			System.out.println("fecha ya transformado en ce_sesion en el campo fecha sesion d ela primera sesion------"+fecha1);
			
			primeraSesionVO.getCeSesion().setFchSesion(fecha1);
			
			SimpleDateFormat formatoDelTexto2 = new SimpleDateFormat("yyyy-MM-dd");
			Date fecha2 = null;
			fecha2 = formatoDelTexto2.parse(SYD.format(primeraSesionVO.getCeSesion().getFechapublicacion()));
			System.out.println("fecha ya transformado en ce_sesion en el campo fecha publicacion de la primera sesion------"+fecha2);
			
			primeraSesionVO.getCeSesion().setFechapublicacion(fecha2);
			
			
			
			numRecords = ceSesionMapper.insertSelective(primeraSesionVO.getCeSesion());
			
			//Inserta la información de actividades para la primera sesión para el CCT dado
			if(primeraSesionVO.getActividades()!=null){
				for (CeActSesion ceActSesion : primeraSesionVO.getActividades()) {
					ceActSesion.setcCct(cCct);
					ceActSesion.setcSesion(Constants.PRIMERA_SESION);
					ceActSesionMapper.insertSelective(ceActSesion);
				}
			}
			
			//Inserta la información de programas federales para la primera sesión para el CCT dado
			if(primeraSesionVO.getFederales() !=null){
				Short tipoPrograma = 0; 
				for (CeProgramaDetalleC1415Cstm ceProgramaFederal : primeraSesionVO.getFederales()) {
					System.out.println("Programa federal="+ceProgramaFederal.getNomPrograma());
					CeProgramas programaFederal = new CeProgramas();
					programaFederal.setcCct(cCct);
					programaFederal.setcSesion(Constants.PRIMERA_SESION);
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
						detalleFederal.setcSesion(Constants.PRIMERA_SESION);
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
			if(primeraSesionVO.getEstatales() !=null){
				Short tipoPrograma = 1; 
				for (CeProgramaDetalleC1415Cstm ceProgramaEstatal : primeraSesionVO.getEstatales()) {
					System.out.println("Programa Estatal="+ceProgramaEstatal.getNomPrograma());
					CeProgramas programaEstatal = new CeProgramas();
					programaEstatal.setcCct(cCct);
					programaEstatal.setcSesion(Constants.PRIMERA_SESION);
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
						detalleEstatal.setcSesion(Constants.PRIMERA_SESION);
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
			if(primeraSesionVO.getMunicipales() !=null){
				Short tipoPrograma = 2; 
				for (CeProgramaDetalleC1415Cstm ceProgramaMunicipal : primeraSesionVO.getMunicipales()) {
					System.out.println("Programa Municipal="+ceProgramaMunicipal.getNomPrograma());
					CeProgramas programaMunicipal = new CeProgramas();
					programaMunicipal.setcCct(cCct);
					programaMunicipal.setcSesion(Constants.PRIMERA_SESION);
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
						detalleMunicipal.setcSesion(Constants.PRIMERA_SESION);
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
			if(primeraSesionVO.getOscs() !=null){
				Short tipoPrograma = 3; 
				for (CeProgramaDetalleC1415Cstm ceProgramaOsc : primeraSesionVO.getOscs()) {
					System.out.println("Programa Osc="+ceProgramaOsc.getNomPrograma());
					CeProgramas programaOsc = new CeProgramas();
					programaOsc.setcCct(cCct);
					programaOsc.setcSesion(Constants.PRIMERA_SESION);
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
						detalleOsc.setcSesion(Constants.PRIMERA_SESION);
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
			
			//Inserta la información de acciones para la primera sesión para el CCT dado
			if(primeraSesionVO.getAcciones() !=null){
				Short idAccion=1;
				for(CeAccion acciones : primeraSesionVO.getAcciones() ){
					acciones.setcCct(cCct);
					acciones.setcSesion(Constants.PRIMERA_SESION);
					acciones.setIdAccion(idAccion);
					ceAccionMapper.insert(acciones);
					
					idAccion++;
				}										
			}

			//Inserta la información de temas para la primera sesión para el CCT dado
			if(primeraSesionVO.getTemas() !=null){
				Short idTemas=1;
				for(CeTema temas : primeraSesionVO.getTemas() ){
					temas.setcCct(cCct);
					temas.setcSesion(Constants.PRIMERA_SESION);
					temas.setIdSecuencia(idTemas);
					//temas.setNomOtroTema(nomOtroTema);
					ceTemaMapper.insert(temas);
					
					idTemas++;
				}										
			}

			//Inserta la información de comites para la primera sesión para el CCT dado
			if(primeraSesionVO.getComites() !=null){
				int idComites=1;
				for(CeComites comites : primeraSesionVO.getComites() ){
					comites.setcCct(cCct);
					comites.setcSesion(Constants.PRIMERA_SESION);
					comites.setCeComites(idComites);
					ceComitesMapper.insert(comites);
					
					idComites++;
				}										
			}
			
			//Inserta la información de Normalidad
			if(primeraSesionVO.getNormalidad() !=null){
				
				for(CeNormalidadCstm normalidadCstm : primeraSesionVO.getNormalidad() ){
					CeNormalidad normalidad = new CeNormalidad();
					normalidad.setcCct(cCct);
					normalidad.setcSesion(Constants.PRIMERA_SESION);
					normalidad.setcNormalidad(normalidadCstm.getcNormalidad());
					normalidad.setAccion1(normalidadCstm.getAccion1());
					normalidad.setAccion2(normalidadCstm.getAccion2());
					ceNormalidadMapper.insert(normalidad);										
				}	
				
			}
			
			//Inserta la información de Actividades adicionales para la primera sesión para el CCT dado
            if(primeraSesionVO.getCategorias() !=null){
                   //Short idActividad = 0; 
                   for (CeActividadDetalleC1415Cstm ceCategorias : primeraSesionVO.getCategorias()) {
                      //    idActividad++;
                          System.out.println("Categoria="+ceCategorias.getActividad());
                          CeActividad actividad = new CeActividad();
                          actividad.setcCct(cCct);
                          actividad.setcSesion(Constants.PRIMERA_SESION);
                          actividad.setCeActividad(ceCategorias.getCeActividad());  
                          actividad.setNomOtraCategoria(ceCategorias.getNomOtraCategoria());
                                                    
                          ceActividadMapper.insert(actividad);
                                                                                             
                          int idDetalleActividad = 1;
                          for (CeActividadDetalle ceDetalleActividad : ceCategorias.getActividades() ) {
                                System.out.println("Detalle actividad="+ceDetalleActividad.getIdDetalle());
                                
                                CeActividadDetalle detalleActividad = new CeActividadDetalle();
                                detalleActividad.setcCct(cCct);
                                detalleActividad.setcSesion(Constants.PRIMERA_SESION);
                                detalleActividad.setCeActividad(ceCategorias.getCeActividad());
                                detalleActividad.setIdDetalle(idDetalleActividad);
                                detalleActividad.setIdObjetivo(ceDetalleActividad.getIdObjetivo());
                                detalleActividad.setObjetivo(ceDetalleActividad.getObjetivo());
                                detalleActividad.setMeta(ceDetalleActividad.getMeta());
                                detalleActividad.setFuente(ceDetalleActividad.getFuente());
                                
                                ceActividadDetalleMapper.insert(detalleActividad);
                                idDetalleActividad++;
                          }
                   }
            }

			//Inserta la información de asuntos para la primera sesión para el CCT dado
			if(primeraSesionVO.getAsuntos() !=null){
				Short idAsuntos=1;
				for(CeAsunto asuntos : primeraSesionVO.getAsuntos() ){
					asuntos.setcCct(cCct);
					asuntos.setcSesion(Constants.PRIMERA_SESION);
					asuntos.setCscAsunto(idAsuntos);
					ceAsuntoMapper.insert(asuntos);
					
					idAsuntos++;
				}										
			}
			
			
			CePreguntas2 preguntas2 = primeraSesionVO.getPreguntas2();
			preguntas2.setCctId(cCct);
			preguntas2.setcSesion(Constants.PRIMERA_SESION);
			cePreguntas2Mapper.insert(preguntas2);
			
			
		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(primeraSesionVO));
			}catch(Exception ex){
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura (e,"servicios.primera.sesion.error.editar",new Object[]{});
		}
		
		System.out.println("Grabando 1ra Sesion... Fin");
		
		//Regresa el número de registros de c_sesion insertados
		//Cómo válido deberá se uno y solo uno
		
		return numRecords;
		
		
	}
	/**
	public int savePrimeraSesion(PrimeraSesionVO primeraSesionVO){
		
		Integer cCct =  primeraSesionVO.getCeInfGral().getcCct();
		int numRecords = -1;
		
		try{
			
			/*
			 * Elimina eliminan los datos de la primera sesion 
			 *//**
			deletePrimeraSesion(cCct);
	
			/*
			 * Se guarda la informacion de la primera asamblea 
			 *//**
			//Se actualiza la fecha de la última modificación del la primera sesion
			CeInfGral ceIngGral = new CeInfGral();
			ceIngGral.setcCct(cCct);
			ceIngGral.setFchActualizacion(new Date());
			//Camnbia el estatus del CE una vez registrada la Primera Sesion
			//ceIngGral.setStatusCe(Constants.EDO_CE_MODIFICADO);  
			ceInfGralMapper.updateByPrimaryKeySelective(ceIngGral);
	
			//Inserta la información de la primera sesión para el CCT dado
			primeraSesionVO.getCeSesion().setcCct(cCct);
			primeraSesionVO.getCeSesion().setcSesion(Constants.PRIMERA_SESION);
			primeraSesionVO.getCeSesion().setFchRegistro(new Date());
			numRecords = ceSesionMapper.insertSelective(primeraSesionVO.getCeSesion());
			
			//Inserta la información de actividades para la primera sesión para el CCT dado
			if(primeraSesionVO.getActividades()!=null){
				for (CeActSesion ceActSesion : primeraSesionVO.getActividades()) {
					ceActSesion.setcCct(cCct);
					ceActSesion.setcSesion(Constants.PRIMERA_SESION);
					ceActSesionMapper.insertSelective(ceActSesion);
				}
			}
			
			//Inserta la información de programas para la primera sesión para el CCT dado
			if(primeraSesionVO.getProgramas()!=null){
				for (CePrograma cePrograma : primeraSesionVO.getProgramas()) {
					cePrograma.setcCct(cCct);
					cePrograma.setcSesion(Constants.PRIMERA_SESION);
					ceProgramaMapper.insertSelective(cePrograma);
				}
			}
			
			//Inserta la información de los recursos para la primera sesión para el CCT dado
			if(primeraSesionVO.getRecursos()!=null){
				for (CeRecurso ceRecurso : primeraSesionVO.getRecursos()) {
					ceRecurso.setcCct(cCct);
					ceRecurso.setcSesion(Constants.PRIMERA_SESION);
					ceRecursoMapper.insertSelective(ceRecurso);
				}
			}
			
			//Lista de comites consejeros registrados en comites
			List<CeIntegranteComiteConsejo> ceIntegranteComiteConsejoList 
					= new ArrayList<CeIntegranteComiteConsejo>();
			//Lista de los miembros de la comunidad que integran comites
			List<CeIntegranteComite> ceIntegranteComiteList
					= new ArrayList<CeIntegranteComite>();
			List<CeComiteIntegrante> ceComiteIntegranteList
					= new ArrayList<CeComiteIntegrante>();
			Set<Integer> comitesSet  = new HashSet<Integer>();
			
			CeIntegranteComiteConsejo 	ceIntegranteComiteConsejoObj 	= null;
			CeIntegranteComite 			ceIntegranteComiteObj 			= null;
			CeComiteIntegrante 			ceComiteIntegranteObj 			= null;
			
			//Inserta la información de los comites para la primera sesión para el CCT dado
			if(primeraSesionVO.getIntegrantesComites()!=null){
				for (ComiteVO comiteVO: primeraSesionVO.getIntegrantesComites()) {
					//Guarda los comites en un conjunto que garantiza que los elementos
					//sean únicos y para ser insertados en la tabla ce_comite 
					comitesSet.addAll(comiteVO.getComites());
					
					//Inserta el al integrante de la comunidad
					if(!comiteVO.getEsMiembroCE()){
						ceIntegranteComiteObj = new CeIntegranteComite();
						ceIntegranteComiteObj.setCscIntegrante(comiteVO
								.getCscIntegrante());
						ceIntegranteComiteObj.setPaternoIntegrante(comiteVO
								.getPaternoIntegrante());
						ceIntegranteComiteObj.setMaternoIntegrante(comiteVO
								.getMaternoIntegrante());
						ceIntegranteComiteObj.setNombreIntegrante(comiteVO
								.getNombreIntegrante());
						ceIntegranteComiteList.add(ceIntegranteComiteObj);
					}
					
					for(Integer cComite : comiteVO.getComites()){
						//Si se trata de un miembro del Consejo Escolar
						if(comiteVO.getEsMiembroCE()){
							ceIntegranteComiteConsejoObj = new CeIntegranteComiteConsejo();
							ceIntegranteComiteConsejoObj.setCscIntegrante(
									comiteVO.getCscIntegrante());
							ceIntegranteComiteConsejoObj.setcComite(cComite);
							ceIntegranteComiteConsejoList.add(
									ceIntegranteComiteConsejoObj);
						}else{//Se trata de un integrante del Comité 
							ceComiteIntegranteObj = new CeComiteIntegrante();
							ceComiteIntegranteObj.setCeComiteCComite(cComite);
							ceComiteIntegranteObj.setCeIntegranteComiteCscIntegrante(
									comiteVO.getCscIntegrante());
							ceComiteIntegranteObj.setCeComiteCComite(cComite);
							ceComiteIntegranteList.add(ceComiteIntegranteObj);
						}
					}
				}
			}

			//Inserta la lista de los comites
			Iterator<Integer> it = comitesSet.iterator();
			CeComite ceComite = null;
			while(it.hasNext()) {
				ceComite = new CeComite();
				ceComite.setcComite(it.next());
				ceComite.setcCct(cCct);
				ceComite.setcSesion(Constants.PRIMERA_SESION);
				ceComiteMapper.insert(ceComite);
			}
			
			//Inserta la información de los integrantes que pertenecen al consejo 
			//para la primera sesión para el CCT dado
			for (CeIntegranteComiteConsejo ceIntegranteComiteConsejo 
					: ceIntegranteComiteConsejoList) {
				ceIntegranteComiteConsejo.setcCctComite(cCct);
				ceIntegranteComiteConsejo.setcSesionComite(Constants.PRIMERA_SESION);
				ceIntegranteComiteConsejo.setcCctIntegrante(cCct);
				//Los integrantes se registran en la Primera Asamblea
				ceIntegranteComiteConsejo.setcSesionIntegrante(Constants.PRIMERA_ASAMBLEA); 
				ceIntegranteComiteConsejoMapper.insertSelective(ceIntegranteComiteConsejo);
			}
	
			//Inserta la información de los integrantes del comite que no pertenecen 
			// al consejo para la primera sesión para el CCT dado
			for (CeIntegranteComite ceIntegranteComite 
					: ceIntegranteComiteList) {
				ceIntegranteComite.setcCct(cCct);
				ceIntegranteComite.setcSesion(Constants.PRIMERA_SESION);
				ceIntegranteComite.setFchAlta(new Date());
				ceIntegranteComiteMapper.insertSelective(ceIntegranteComite);
			}
							
			//Inserta la información de los comites seleccionados por los integrantes del 
			//comite que no pertenecen al consejo para la primera sesión para el CCT dado
			for (CeComiteIntegrante ceComiteIntegrante : ceComiteIntegranteList) {
				ceComiteIntegrante.setCeIntegranteComiteCCct(cCct);
				ceComiteIntegrante.setCeIntegranteComiteCSesion(Constants.PRIMERA_SESION);
				ceComiteIntegrante.setCeComiteCCct(cCct);
				ceComiteIntegrante.setCeComiteCSesion(Constants.PRIMERA_SESION);
				ceComiteIntegranteMapper.insertSelective(ceComiteIntegrante);
			}
			
			if(primeraSesionVO.getPlaneacion()!=null){
				primeraSesionVO.getPlaneacion().setcCct(cCct);
				primeraSesionVO.getPlaneacion().setcSesion(Constants.PRIMERA_SESION);
				cePlaneacionMapper.insert(primeraSesionVO.getPlaneacion());
			}
			
		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(primeraSesionVO));
			}catch(Exception ex){
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura (e,"servicios.primera.sesion.error.editar",new Object[]{});
		}
		
		//Regresa el número de registros de c_sesion insertados
		//Cómo válido deberá se uno y solo uno
		return numRecords;
	}**/
	
	/**
	 * Da de baja logica al Consejo del CCT dado
	 * @param cCct Clave dle CCT a ser dado de baja
	 */
	public int deletePrimeraSesion(Integer cCct){
		int numRecords = -1;
		
		try{
			
			
			//Elimina la Segunda Asamblea dado que afecta la constitucion de su Acta 
			cuartaSesionService.deleteCuartaSesion(cCct);
			//Elimina la Segunda Asamblea dado que afecta la constitucion de su Acta 
			segundaAsambleaService.deleteSegundaAsamblea1415(cCct,1);
			
			//Se eliminan los datos de planeación de la primera sesión para el CCT dado.
			cePlaneacionMapper.deleteByPrimaryKey(cCct, Constants.PRIMERA_SESION);
			
			//Se eliminan los datos de los comites seleccionados por integrantes de comites 
			//de la primera sesión para el CCT dado.
			CeComiteIntegranteExample comiteIntCriteria = new CeComiteIntegranteExample();
			comiteIntCriteria.createCriteria().andCeIntegranteComiteCCctEqualTo(cCct)
				.andCeIntegranteComiteCSesionEqualTo(Constants.PRIMERA_SESION);
			ceComiteIntegranteMapper.deleteByExample(comiteIntCriteria);		
			
			//Se eliminan los datos de los integrantes de los comités de la primera sesión para el CCT dado.
			CeIntegranteComiteExample intComiteCriteria = new CeIntegranteComiteExample();
			intComiteCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceIntegranteComiteMapper.deleteByExample(intComiteCriteria);		
			
			//Se eliminan los integrentes del comite que forman parte del consejo escolar
			//para  la primera sesión para el CCT dado.
			CeIntegranteComiteConsejoExample intComConsejoCriteria = new CeIntegranteComiteConsejoExample();
			intComConsejoCriteria.createCriteria()
				.andCCctIntegranteEqualTo(cCct)
				.andCSesionIntegranteEqualTo(Constants.PRIMERA_ASAMBLEA)
				.andCCctComiteEqualTo(cCct)
				.andCSesionComiteEqualTo(Constants.PRIMERA_SESION);
			ceIntegranteComiteConsejoMapper.deleteByExample(intComConsejoCriteria);		
			
			//Se eliminan los datos de los comites de la primera sesión para el CCT dado.
			CeComiteExample comiteCriteria = new CeComiteExample();
			comiteCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceComiteMapper.deleteByExample(comiteCriteria);		
			
			//Se eliminan los datos de normalidad minima
			CeNormalidadExample normalidadCriteria = new CeNormalidadExample();
			normalidadCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceNormalidadMapper.deleteByExample(normalidadCriteria);
			
			//Se eliminan los datos de recursos de la primera sesión para el CCT dado.
			CeRecursoExample recursoCriteria = new CeRecursoExample();
			recursoCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceRecursoMapper.deleteByExample(recursoCriteria);		
			
			//Se eliminan los datos de programas de la primera sesión para el CCT dado.
			CeProgramaExample programaCriteria = new CeProgramaExample();
			programaCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceProgramaMapper.deleteByExample(programaCriteria);		

			//Se elimina el detalle de programas federales de la primera sesión para el CCT dado.
			CeProgramasDetalleExample detalleFederal = new CeProgramasDetalleExample();
			detalleFederal.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceProgramasDetalleMapper.deleteByExample(detalleFederal);
			
			//Se eliminan los datos de programas federales de la primera sesión para el CCT dado.
			CeProgramasExample programaFederal = new CeProgramasExample();
			programaFederal.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceProgramasMapper.deleteByExample(programaFederal);
			
			//Se eliminan los datos de asuntos de la primera sesión para el CCT dado.
			CeAsuntoExample asuntos = new CeAsuntoExample();
			asuntos.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceAsuntoMapper.deleteByExample(asuntos);
			
			//Se eliminan los temas de la primera sesión para el CCT dado.
			CeTemaExample temas = new CeTemaExample();
			temas.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceTemaMapper.deleteByExample(temas);
			
			//Se eliminan las acciones de la primera sesión para el CCT dado.
			CeAccionExample acciones = new CeAccionExample();
			acciones.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceAccionMapper.deleteByExample(acciones);

			//Se eliminan los comites de la primera sesión para el CCT dado.
			CeComitesExample comites = new CeComitesExample();
			comites.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceComitesMapper.deleteByExample(comites);

			//Se eliminan los detalles de actividades adicionales de la primera sesión para el CCT dado.
			CeActividadDetalleExample actividadDetalle = new CeActividadDetalleExample();
			actividadDetalle.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceActividadDetalleMapper.deleteByExample(actividadDetalle);

			//Se eliminan los actividades adicionales de la primera sesión para el CCT dado.
			CeActividadExample actividad = new CeActividadExample();
			actividad.createCriteria().andCCctEqualTo(cCct).andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceActividadMapper.deleteByExample(actividad);
			
			//Se eliminan los datos de actividades de la primera sesión para el CCT dado.
			CeActSesionExample actividadesCriteria = new CeActSesionExample();
			actividadesCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_SESION);
			ceActSesionMapper.deleteByExample(actividadesCriteria);		
			
			//se eliminan respuestas
			CePreguntas2Example cePreguntasCriteria2 = new CePreguntas2Example();
			cePreguntasCriteria2.createCriteria().andCctIdEqualTo(cCct)
			.andCSesionEqualTo(Constants.PRIMERA_SESION);
			cePreguntas2Mapper.deleteByExample(cePreguntasCriteria2);
			
			
			//Se eliminan los datos de la primera sesión para el CCT dado.
			numRecords = ceSesionMapper.deleteByPrimaryKey(cCct,Constants.PRIMERA_SESION);
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"servicios.primera.sesion.error.eliminar",new Object[]{});
		}
		
		return numRecords;
	}

	/**
	 * Consulta la iformacion de la primera asamblea dado un CCT
	 * @param cCct la clave interna del Centro de trabajo
	 */
	/**public PrimeraSesionVO selectPrimeraSesion(Integer cCct){

		return primeraSesionMapper.selectPrimeraSesion(cCct);
	}
**/
	
	public PrimeraSesionC1415VO selectPrimeraSesionC1415(Integer cCct) {
		System.out.println("llego al metodo");
		PrimeraSesionC1415VO C1415 =primeraSesionC1415Mapper.selectPrimeraSesionC1415(cCct);
		//PrimeraSesionC1415VO C1415=new PrimeraSesionC1415VO();
		System.out.println("trajo algo");
		System.out.println(C1415);
		return C1415;
		
	}	
}
