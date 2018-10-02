package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

import mx.gob.sep.dgtec.repuce.dao.CCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CeActSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAsistenteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeAsuntoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeCandidatopresiMapper;
import mx.gob.sep.dgtec.repuce.dao.CeCandidatosecreMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CeComiteMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.CeDenunciaMapper;
import mx.gob.sep.dgtec.repuce.dao.CeEscrutadorMapper;
import mx.gob.sep.dgtec.repuce.dao.CeInfGralMapper;
import mx.gob.sep.dgtec.repuce.dao.CeIntegranteBajaMapper;
import mx.gob.sep.dgtec.repuce.dao.CeIntegranteComiteConsejoMapper;
import mx.gob.sep.dgtec.repuce.dao.CeIntegranteMapper;
import mx.gob.sep.dgtec.repuce.dao.CePreguntasMapper;
import mx.gob.sep.dgtec.repuce.dao.CeSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.PrimeraAsambleaMapper;
import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CeActSesion;
import mx.gob.sep.dgtec.repuce.model.CeActSesionExample;
import mx.gob.sep.dgtec.repuce.model.CeAsistente;
import mx.gob.sep.dgtec.repuce.model.CeAsistenteExample;
import mx.gob.sep.dgtec.repuce.model.CeAsunto;
import mx.gob.sep.dgtec.repuce.model.CeAsuntoExample;
import mx.gob.sep.dgtec.repuce.model.CeCandidatopresi;
import mx.gob.sep.dgtec.repuce.model.CeCandidatopresiExample;
import mx.gob.sep.dgtec.repuce.model.CeCandidatosecre;
import mx.gob.sep.dgtec.repuce.model.CeCandidatosecreExample;
import mx.gob.sep.dgtec.repuce.model.CeComiteExample;
import mx.gob.sep.dgtec.repuce.model.CeDenuncia;
import mx.gob.sep.dgtec.repuce.model.CeEscrutador;
import mx.gob.sep.dgtec.repuce.model.CeEscrutadorExample;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeIntegrante;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteBaja;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteBajaExample;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteComiteConsejoExample;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteExample;
import mx.gob.sep.dgtec.repuce.model.CePreguntas;
import mx.gob.sep.dgtec.repuce.model.CePreguntasExample;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraAsambleaService;
//import mx.gob.sep.dgtec.repuce.servicios.PrimeraSesionService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaAsambleaService;
//import mx.gob.sep.dgtec.repuce.servicios.SegundaSesionService;
import mx.gob.sep.dgtec.repuce.servicios.TerceraSesionService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorNegocio;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections.CollectionUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrimeraAsambleaServiceImpl implements PrimeraAsambleaService{
	
	private static final Logger log = LoggerFactory.getLogger(PrimeraAsambleaServiceImpl.class);
	
	@Autowired
	private CeInfGralMapper ceInfGralMapper;
	@Autowired
	private PrimeraAsambleaMapper primeraAsambleaMapper;
	@Autowired
	private CeSesionMapper ceSesionMapper;
	@Autowired
	private CCctMapper cCctMapper;
	@Autowired
	private CeActSesionMapper ceActSesionMapper;
	@Autowired
	private CeIntegranteMapper ceIntegranteMapper;
	@Autowired
	private CeAsistenteMapper ceAsistenteMapper;
	@Autowired
	private CeIntegranteBajaMapper ceIntegranteBajaMapper;
	@Autowired
	private CeIntegranteComiteConsejoMapper ceIntComConsejoMapper;
	@Autowired
	private CeComiteMapperCstm ceComiteMapperCstm;
	@Autowired
	private CeComiteMapper ceComiteMapper; 
//	@Autowired
//	private PrimeraSesionService primeraSesionService;
//	@Autowired
//	private SegundaSesionService segundaSesionService;
	@Autowired
	private SegundaAsambleaService segundaAsambleaService;
	@Autowired
	private TerceraSesionService terceraSesionService;
	@Autowired
	private CeEscrutadorMapper ceEscrutadorMapper;
	@Autowired
	private CeAsuntoMapper ceAsuntoMapper;
	@Autowired
	private CeCandidatopresiMapper ceCandidatopresiMapper;
	@Autowired
	private CeCandidatosecreMapper ceCandidatosecreMapper;

	@Autowired
	private CePreguntasMapper cePreguntasMapper;
	
	@Autowired
	private CCctMapper cCctDAO;
	
	@Autowired
	private CeDenunciaMapper ceDenunciaMapper;
	
	/**
	 * Guarda la informacion de la primer asamblea de CONAFE
	 */
	@SuppressWarnings("unchecked")
	public int savePrimeraAsamblea(PrimeraAsambleaVO primeraAsambleaVO){
		Locale l=Locale.getDefault();
		System.out.println("local------"+l.getLanguage()+"----"+l.getCountry());
		
		SimpleDateFormat GMT = new SimpleDateFormat("yyyy-MM-dd");
		  SimpleDateFormat SYD = new SimpleDateFormat("yyyy-MM-dd");
		  
		     GMT.setTimeZone(TimeZone.getTimeZone("GMT"));
		    SYD.setTimeZone(TimeZone.getTimeZone("Australia/Sydney"));
		  

		Integer cCct =  primeraAsambleaVO.getCeInfGral().getcCct();
		int numRecords = -1;

		String validationMssg = validatePrimeraAsamblea(primeraAsambleaVO);
//		if(!validationMssg.equals("")){
//			throw new ErrorNegocio(new Object[]{}, validationMssg);
//		}
		
		new ErrorNegocio(new Object[]{}, validationMssg);
		
		//Obtiene la información del CE previamente existente
		PrimeraAsambleaVO primeraAsambleaPreexistente = primeraAsambleaMapper
				.selectPrimeraAsamblea(cCct);

		/*
		 * Opciones de registro segun el grafo REGLAS DE NEGOCIO
		 */
		short modificacionesCE = 0;
		boolean ceConCambios = false;
		
		
		//Obtiene la lista de los integrantes que existían previamente en el CE
		List <CeIntegranteCstm> integrantesPreexistentes = primeraAsambleaPreexistente == null? 
				new ArrayList<CeIntegranteCstm>():primeraAsambleaPreexistente.getIntegrantes();
		
		//Obtiene la lista de los integrantes a insertar 
		Collection<CeIntegranteCstm> integrantesAInsertar = CollectionUtils.subtract(
				primeraAsambleaVO.getIntegrantes(), integrantesPreexistentes);

		Collection<CeIntegranteCstm> integrantesAModificar = new ArrayList<CeIntegranteCstm>();
		Collection<CeIntegranteCstm> integrantesAEliminar = new ArrayList<CeIntegranteCstm>();

		//--------------------------------------- Ciclo 2014-15
	//	Collection<CeEscrutador> escrutadoresAInsertar = primeraAsambleaVO.getEscrutadores();
		Collection<CeAsunto> asuntosAInsertar = primeraAsambleaVO.getAsuntos();
		Collection<CeCandidatopresi> presidentesAInsertar = primeraAsambleaVO.getPresidentes();
//		Collection<CeCandidatosecre> secretariosAInsertar = primeraAsambleaVO.getSecretarios();
		
		try{
			
			ObjectMapper mapper = new ObjectMapper();

			//Si ya se se cuenta con un CE previamente registrado 
			if(primeraAsambleaPreexistente!=null){

				modificacionesCE = primeraAsambleaPreexistente.getCeInfGral()
						.getModificaciones();
				
				
				//Obtiene la lista de los integrantes a modificar 
				integrantesAModificar = CollectionUtils.intersection(
						primeraAsambleaVO.getIntegrantes(), integrantesPreexistentes);

				log.debug("integrantesPreexistentes: " + 
						mapper.writeValueAsString(integrantesPreexistentes));

				//Obtiene la lista de los integrantes a eliminar 
				integrantesAEliminar = CollectionUtils.subtract(
						integrantesPreexistentes, primeraAsambleaVO.getIntegrantes()); 
				
				//Si hubo cambios en la integración del CE, se incrementa el contador
				if(integrantesAModificar.size() != integrantesPreexistentes.size() ||
						primeraAsambleaVO.getIntegrantes().size() != 
								integrantesPreexistentes.size()){
					primeraAsambleaVO.getCeInfGral().setModificaciones(modificacionesCE++);
					ceConCambios = true;
				}
				
				/*
				A peticion hecha por el CONAPASE se deroga esta regla 
				//Si el numero de modificaciones supera las tres veces, se impide el registro 
				if((primeraAsambleaPreexistente.getCeInfGral().getStatusCe().equals(
						Constants.EDO_CE_PREEXISTENTE) ||
						primeraAsambleaPreexistente.getCeInfGral().getStatusCe().equals(
						Constants.EDO_CE_MODIFICADO))	
						&& modificacionesCE > 3){
					validationMssg = "servicios.primera.asamblea.num.max.modificaciones";
					throw new ErrorNegocio(new Object[]{},validationMssg);

				}
				*/
				
				List<Short> intKeyToDelete = new ArrayList<Short>();
				
				//Identifica cuales son los integrantes que se dan de baja para integrarlo a 
				//lista intKeyToDelete de lo contario se agregan a la lista intKeyToRetain. 
				for(CeIntegranteCstm integrante : integrantesAEliminar){
						intKeyToDelete.add(integrante.getCscIntegrante());
				}

				//Si hay integrantes dados de baja, se procede a disasociarlos de los Comites  
				if ( !intKeyToDelete.isEmpty() ){
					CeIntegranteComiteConsejoExample ceIntComConsejoExample 
				 		= new CeIntegranteComiteConsejoExample();
					ceIntComConsejoExample.createCriteria().andCscIntegranteIn(intKeyToDelete)
						.andCCctIntegranteEqualTo(cCct)
						.andCSesionIntegranteEqualTo(Constants.PRIMERA_ASAMBLEA);
					ceIntComConsejoMapper.deleteByExample(ceIntComConsejoExample);
				}
				
				//Elimina Comites Zombie
				List<Integer> comitesToDelete = ceComiteMapperCstm.
						selectComitesSinIntegrantes(cCct);
				if ( !comitesToDelete.isEmpty() ){
					CeComiteExample ceComiteExample = new CeComiteExample();
					ceComiteExample.createCriteria().andCCctEqualTo(cCct)
						.andCSesionEqualTo(Constants.PRIMERA_SESION)
						.andCComiteIn(comitesToDelete);
					ceComiteMapper.deleteByExample(ceComiteExample);
				}
				log.debug("comitesToDelete: " + comitesToDelete);

				//Se elimina a los integrantes que fueron dados de baja.
				CeIntegranteExample ceIntegranteExample = new CeIntegranteExample();
				ceIntegranteExample.createCriteria().andCCctEqualTo(cCct)
					.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA)
					.andCscIntegranteIn(intKeyToDelete);
				if ( !intKeyToDelete.isEmpty() ){
					ceIntegranteMapper.deleteByExample(ceIntegranteExample);				
				}

				//Se elimina las actividades de la primera asamblea para un cct dado.
				CeActSesionExample ceActSesionCriteria = new CeActSesionExample();
				ceActSesionCriteria.createCriteria().andCCctEqualTo(cCct)
					.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
				ceActSesionMapper.deleteByExample(ceActSesionCriteria);

				//Se elimina los asistentes de la primera asamblea para un cct dado.
				CeAsistenteExample ceAsistenteCriteria = new CeAsistenteExample();
				ceAsistenteCriteria.createCriteria().andCCctEqualTo(cCct)
					.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
				ceAsistenteMapper.deleteByExample(ceAsistenteCriteria);
				
				//Se elimina los escrutadores de la primera asamblea para un cct dado.
				CeEscrutadorExample ceEscrutadorCriteria = new CeEscrutadorExample();
				ceEscrutadorCriteria.createCriteria().andCCctEqualTo(cCct)
					.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
				ceEscrutadorMapper.deleteByExample(ceEscrutadorCriteria);
			
				//Se elimina los asuntos de la primera asamblea para un cct dado.
				CeAsuntoExample ceAsuntoCriteria = new CeAsuntoExample();
				ceAsuntoCriteria.createCriteria().andCCctEqualTo(cCct)
					.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
				ceAsuntoMapper.deleteByExample(ceAsuntoCriteria);
				
				//Se elimina los candidatos a presidente de la primera asamblea para un cct dado.
				CeCandidatopresiExample ceCandidatopresiCriteria = new CeCandidatopresiExample();
				ceCandidatopresiCriteria.createCriteria().andCCctEqualTo(cCct)
					.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
				ceCandidatopresiMapper.deleteByExample(ceCandidatopresiCriteria);
			
				//Se elimina los candidatos a secretario tecnico de la primera asamblea para un cct dado.
				CeCandidatosecreExample ceCandidatosecreCriteria = new CeCandidatosecreExample();
				ceCandidatosecreCriteria.createCriteria().andCCctEqualTo(cCct)
					.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
				ceCandidatosecreMapper.deleteByExample(ceCandidatosecreCriteria);
				
				//se eliminan respuestas
				CePreguntasExample cePreguntasCriteria = new CePreguntasExample();
				cePreguntasCriteria.createCriteria().andCctIdEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
				cePreguntasMapper.deleteByExample(cePreguntasCriteria);
				
			}
			
			log.debug("integrantesAModificar: " + mapper.writeValueAsString(integrantesAModificar));
			log.debug("integrantesAInsertar: " + mapper.writeValueAsString(integrantesAInsertar));
			log.debug("integrantesAEliminar: " + mapper.writeValueAsString(integrantesAEliminar));
			System.out.println("---------integrantes a insertar------------"+integrantesAInsertar.toString());
			System.out.println("---------integrantes tamaño------------"+integrantesAInsertar.size());
			//	Inserta la información de la primera asamblea
			//ce_inf_gral
			System.out.println("prueba de fecha GMT---"+GMT.format(primeraAsambleaVO.getCeSesion().getFchSesion()));
			System.out.println("prueba de fecha SYD---"+SYD.format(primeraAsambleaVO.getCeSesion().getFchSesion()));
			
			SimpleDateFormat formatoDelTexto = new SimpleDateFormat("yyyy-MM-dd");
			Date fecha = null;
			fecha = formatoDelTexto.parse(SYD.format(primeraAsambleaVO.getCeSesion().getFchSesion()));
			System.out.println("fecha ya transformado en ce_inf_gral------"+fecha);
			
			
			primeraAsambleaVO.getCeInfGral().setFchIntegracion(
			//primeraAsambleaVO.getCeSesion().getFchSesion());
					fecha);
			
			System.out.println("---------fecha sysout sesion------------"+primeraAsambleaVO.getCeSesion().getFchSesion());
			primeraAsambleaVO.getCeInfGral().setFchActualizacion(new Date());
			primeraAsambleaVO.getCeInfGral().setModificaciones(modificacionesCE);
	
		
//			if(primeraAsambleaPreexistente == null || primeraAsambleaPreexistente
//					.getCeInfGral().getStatusCe().equals(Constants.EDO_CE_DADO_DE_BAJA)){
//				//Consejo Inexistente o dado de baja y se registra su integracion
//				primeraAsambleaVO.getCeInfGral().setPeriodo(Constants.PERIODO_2015_2017);
//				primeraAsambleaVO.getCeInfGral().setStatusCe(Constants.EDO_CE_NUEVO);
//				
//			}else if(primeraAsambleaPreexistente.getCeInfGral().getStatusCe().equals(
//					Constants.EDO_CE_NUEVO) && ceConCambios){
//				//Consejo Nuevo cambia a modificado si su contitucion cambia
//				primeraAsambleaVO.getCeInfGral().setStatusCe(Constants.EDO_CE_MODIFICADO);
//				
//			}else if((primeraAsambleaPreexistente.getCeInfGral().getStatusCe().equals(
//					Constants.EDO_CE_PREEXISTENTE)
//					|| primeraAsambleaPreexistente.getCeInfGral().getStatusCe().equals(
//							Constants.EDO_CE_MODIFICADO)
//					|| primeraAsambleaPreexistente.getCeInfGral().getStatusCe().equals(
//							Constants.EDO_CE_VENCIDO))
//					&& primeraAsambleaPreexistente.getCeInfGral().getPeriodo() != null 
//					&& primeraAsambleaPreexistente.getCeInfGral().getPeriodo().length()==9
//					&& new Integer(primeraAsambleaPreexistente.getCeInfGral().getPeriodo()
//							.substring(5,9)) <= Constants.PERIODO_FIN
//					&& primeraAsambleaVO.getCeSesion().getFchSesion().after(Constants.FCH_INI_CICLO)
//					){
//				//Consejo Pre-existente desde ciclos pasados y el cual vence este ciclo
//				//se renueva en automático al modificarlo siempre y cuando la fecha de consitución del
//				//consejo sea mayor a la del inicio del ciclo escolar (31 agosto 2013 fecha de cierre).
//				primeraAsambleaVO.getCeInfGral().setStatusCe(Constants.EDO_CE_NUEVO);
//				primeraAsambleaVO.getCeInfGral().setPeriodo(Constants.PERIODO_2015_2017);
//				primeraAsambleaVO.getCeInfGral().setModificaciones((short)0);
//				
//			}else if(primeraAsambleaPreexistente.getCeInfGral().getStatusCe().equals(
//					Constants.EDO_CE_PREEXISTENTE)){ 
//				//Consejo Pre-existente desde ciclos pasados
//				primeraAsambleaVO.getCeInfGral().setStatusCe(Constants.EDO_CE_MODIFICADO);
//				
//			}else {
//				primeraAsambleaVO.getCeInfGral().setStatusCe(primeraAsambleaPreexistente.getCeInfGral().getStatusCe());
//			}
//			if(primeraAsambleaVO.getCeInfGral().getStatusCe()==0){
//				primeraAsambleaVO.getCeInfGral().setStatusCe(Constants.EDO_CE_NUEVO);
//				primeraAsambleaVO.getCeInfGral().setPeriodo(Constants.PERIODO_2015_2017);
//			}
//			if(primeraAsambleaPreexistente == null  ||
//					primeraAsambleaPreexistente.getCeInfGral()==null){
//				//Consejo Inexistente
//				ceInfGralMapper.insert(primeraAsambleaVO.getCeInfGral());
//			}else{
//				ceInfGralMapper.updateByPrimaryKeySelective(primeraAsambleaVO.getCeInfGral());
//			}
//             System.out.println("valor del periodo--"+primeraAsambleaPreexistente.getCeInfGral().getPeriodo());
//             System.out.println("validacion--"+primeraAsambleaPreexistente.getCeInfGral().getPeriodo().equals(Constants.PERIODO_2013_2015));
//             System.out.println("validacion 2--"+primeraAsambleaPreexistente.getCeInfGral().getPeriodo().toString().length());
//             System.out.println("validacion 3--"+Constants.PERIODO_2013_2015);
//             System.out.println("validacion 4--"+Constants.PERIODO_2013_2015.length());
			if(primeraAsambleaPreexistente == null  || primeraAsambleaPreexistente.getCeInfGral()==null ){
				//Consejo Inexistente
				primeraAsambleaVO.getCeInfGral().setStatusCe(Constants.EDO_CE_NUEVO);
				primeraAsambleaVO.getCeInfGral().setPeriodo(Constants.PERIODO_2016_2018);
				primeraAsambleaVO.getCeInfGral().setModificaciones((short)0);
				ceInfGralMapper.insert(primeraAsambleaVO.getCeInfGral());
			}else{
				if(!primeraAsambleaPreexistente.getCeInfGral().getPeriodo().equals(Constants.PERIODO_2015_2017)){
					primeraAsambleaVO.getCeInfGral().setStatusCe(Constants.EDO_CE_NUEVO);
					primeraAsambleaVO.getCeInfGral().setPeriodo(Constants.PERIODO_2016_2018);	
				}
				ceInfGralMapper.updateByPrimaryKeySelective(primeraAsambleaVO.getCeInfGral());
			}
					
			
			primeraAsambleaVO.getCeSesion().setcCct(cCct);
			primeraAsambleaVO.getCeSesion().setcSesion(Constants.PRIMERA_ASAMBLEA);
			primeraAsambleaVO.getCeSesion().setFchRegistro(new Date());
			
			SimpleDateFormat formatoDelTexto1 = new SimpleDateFormat("yyyy-MM-dd");
			Date fecha1 = null;
			fecha1 = formatoDelTexto1.parse(SYD.format(primeraAsambleaVO.getCeSesion().getFchSesion()));
			System.out.println("fecha ya transformado en ce_sesion en el campo fecha sesion de la primera asamblea------"+fecha1);
			
			primeraAsambleaVO.getCeSesion().setFchSesion(fecha1);
			
			SimpleDateFormat formatoDelTexto2 = new SimpleDateFormat("yyyy-MM-dd");
			Date fecha2 = null;
			fecha2 = formatoDelTexto2.parse(SYD.format(primeraAsambleaVO.getCeSesion().getFechapublicacion()));
			System.out.println("fecha ya transformado en ce_sesion en el campo fecha publicacion de la primera asamblea------"+fecha2);
			
			primeraAsambleaVO.getCeSesion().setFechapublicacion(fecha2);
				
			
			System.out.println("cct-----"+cCct);
			System.out.println("primera asamblea-----"+Constants.PRIMERA_ASAMBLEA);
			if(primeraAsambleaPreexistente==null ||
					primeraAsambleaPreexistente.getCeSesion()==null){
				numRecords = ceSesionMapper.insert(primeraAsambleaVO.getCeSesion());
			}else{
				numRecords = ceSesionMapper.updateByPrimaryKeySelective(
						primeraAsambleaVO.getCeSesion());
			}
				
			for (CeActSesion ceActSesion : primeraAsambleaVO.getActividades()) {
				ceActSesion.setcCct(cCct);
				ceActSesion.setcSesion(Constants.PRIMERA_ASAMBLEA);
				ceActSesionMapper.insert(ceActSesion);
			}

			//------------------- Ciclo 2014-15
			//Se capturan los escrutadores del CE
//			short noEscrutador = 1;
//			for (CeEscrutador escrutador : escrutadoresAInsertar) {
//				escrutador.setcCct(cCct);
//				escrutador.setcSesion(Constants.PRIMERA_ASAMBLEA);
//				if(escrutador.getCscEscrutador() == null){
//					escrutador.setCscEscrutador(noEscrutador);
//				}
//				ceEscrutadorMapper.insert(escrutador);
//				noEscrutador++;
//			}
			//------------------- Ciclo 2014-15
			//Se capturan los asuntos del CE
			short noAsunto = 1;
			for (CeAsunto asunto : asuntosAInsertar) {
				asunto.setcCct(cCct);
				asunto.setcSesion(Constants.PRIMERA_ASAMBLEA);
				if(asunto.getCscAsunto() == null){
					asunto.setCscAsunto(noAsunto);
				}
				ceAsuntoMapper.insert(asunto);
				noAsunto++;
			}
			//---------------------------------
			//Se capturan los candidatos a presidente del CE
			short noPresidente = 1;
			for (CeCandidatopresi presidentes : presidentesAInsertar) {
				presidentes.setcCct(cCct);
				presidentes.setcSesion(Constants.PRIMERA_ASAMBLEA);
				if(presidentes.getIdcandidato() == null){
					presidentes.setIdcandidato(noPresidente);
				}
				ceCandidatopresiMapper.insert(presidentes);
				noPresidente++;
			}
			//---------------------------------
			//Se capturan los candidatos a secretario del CE
//			short noSecretario = 1;
//			for (CeCandidatosecre secretarios : secretariosAInsertar) {
//				secretarios.setcCct(cCct);
//				secretarios.setcSesion(Constants.PRIMERA_ASAMBLEA);
//				if(secretarios.getIdcandidato() == null){
//					secretarios.setIdcandidato(noSecretario);
//				}
//				ceCandidatosecreMapper.insert(secretarios);				
//				noSecretario++;
//			}
			//---------------------------------
			//---------------------------------
			CeIntegrante integranteDirectivo= new CeIntegrante(); 
			//Se actualizan los datos de los integrantes del consejo
			for (CeIntegranteCstm integrante : integrantesAModificar) {
				
				integrante.setcCct(cCct);
				integrante.setcSesion(Constants.PRIMERA_ASAMBLEA);
				integrante.setCurpValida(Constants.CURP_SIN_VALIDAR);
				if(integrante.getcCalidad()==8){
					integranteDirectivo=integrante;
				}
				ceIntegranteMapper.updateByPrimaryKeySelective(integrante);
			}
			//Se capturan los nuevos integrantes del CE
			for (CeIntegrante integrante : integrantesAInsertar) {
				
				integrante.setcCct(cCct);
				integrante.setcSesion(Constants.PRIMERA_ASAMBLEA);
				integrante.setFchAlta(new Date());
				integrante.setCurpValida(Constants.CURP_SIN_VALIDAR);
				if(integrante.getcCalidad()==8){
					integranteDirectivo=integrante;
				}
				
				ceIntegranteMapper.insert(integrante);
			}

			if(integranteDirectivo.getcCct()!=null){
			    CCct cCctUpdateInfo = new CCct();
				cCctUpdateInfo.setcCct(cCct);
				cCctUpdateInfo.setNomDirector(integranteDirectivo.getPaternoIntegrante()+' '+integranteDirectivo.getMaternoIntegrante()+' '+integranteDirectivo.getNombreIntegrante());
				System.out.println("-------------insertara el siguiente nombre del director--------"+cCctUpdateInfo.getNomDirector());
				cCctDAO.updateByPrimaryKeySelective(cCctUpdateInfo);
			}
				
			short cscAsistente = 1;
			if(primeraAsambleaVO.getAsistentes()!=null){
			//Se inserta la información de los asistentes
			for (CeAsistente ceAsistente : primeraAsambleaVO.getAsistentes()) {
				ceAsistente.setcCct(cCct);
				ceAsistente.setcSesion(Constants.PRIMERA_ASAMBLEA);
				ceAsistente.setCscAsistente(cscAsistente++);
				ceAsistenteMapper.insertSelective(ceAsistente);
			}
			}

			
			short cscIntegranteBaja = primeraAsambleaMapper.selectMaxCscIntBaja(cCct);
			//Se inserta la información de los asistentes
//			for (CeIntegranteCstm integrante : integrantesAEliminar) {
//				CeIntegranteBaja intBaja = new CeIntegranteBaja();
//				BeanUtils.copyProperties(intBaja, integrante);
//				intBaja.setcCct(cCct);
//				intBaja.setcSesion(Constants.PRIMERA_ASAMBLEA);
//				intBaja.setCscIntegrante(cscIntegranteBaja++);
//				intBaja.setFchBaja(new Date());
//				ceIntegranteBajaMapper.insert(intBaja);
//			}
			
			CePreguntas preguntas = primeraAsambleaVO.getPreguntas();
			preguntas.setCctId(cCct);
			preguntas.setcSesion(Constants.PRIMERA_ASAMBLEA);
			cePreguntasMapper.insert(preguntas);
			
			
			
			
		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(primeraAsambleaVO));
			}catch(Exception ex){
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura (e,"servicios.primera.asamblea.error.editar",new Object[]{});
		}
		
		return numRecords;
	}
	
	/**
	 * Realiza las validaciones de negocio qu debe cumplir a integracion del 
	 * Consejo Escolar para poder ser registrado. 
	 * @param primeraAsambleaVO
	 * @return null si las validaiones se cumplen, el mensaje de error en caso
	 * contrario.
	 */
	private String validatePrimeraAsamblea(PrimeraAsambleaVO primeraAsambleaVO){
		String validaionMssg = "";
		int numPresidente = 0;
		int numSecretario = 0;
		int numConsejeros = 0;
		int totalIntegrantes = primeraAsambleaVO.getIntegrantes().size();
		int umbralPadresFamilia = ((int)Math.floor(totalIntegrantes/2)) + 1; 
		int totalPadresFamilia = 0;
		//Valida que la integracion contentenga al menos 50% + 1
		//de con calidad de Padres de familia o provenientes de 
		//la Asociacion de Pedres de Familia
		for(CeIntegrante integrante : primeraAsambleaVO.getIntegrantes()){
			if(integrante.getPaternoIntegrante() == null 
					|| integrante.getPaternoIntegrante().equals(""))
				return "servicios.primera.asamblea.integracion.validation.error.paterno";
			if(integrante.getNombreIntegrante() == null 
					|| integrante.getNombreIntegrante().equals(""))	
				return "servicios.primera.asamblea.integracion.validation.error.nombre";
			if(integrante.getcCargo() == null 
					|| integrante.getcCargo().equals(0))
				return "servicios.primera.asamblea.integracion.validation.error.cargo";
			if(integrante.getcCalidad() == null 
					|| integrante.getcCalidad().equals(0))
				return "servicios.primera.asamblea.integracion.validation.error.calidad";

			//Cuenta cada uno de los integrantes por cargo
			if(integrante.getcCargo().equals(1)){//Es presidente 
				numPresidente++;
			}else if(integrante.getcCargo().equals(2)){//Es secretario
				numSecretario++;
			}else if(integrante.getcCargo().equals(3)){//Es consejero
				numConsejeros++;
			}
			//Cuenta el total de integrantes que son padres de familia
			//o miembros de la APF
			if(Constants.PADRES_DE_FAMILIA_LIST.contains(
					integrante.getcCalidad())){
				totalPadresFamilia++;
			}
		}

		if(numPresidente!=1)
			return "servicios.primera.asamblea.integracion.presidente";
		if(numSecretario!=1)
			return "servicios.primera.asamblea.integracion.secretario";
		if(numConsejeros<1)
			return "servicios.primera.asamblea.integracion.consejero";
		if(totalPadresFamilia < umbralPadresFamilia)
			return "servicios.primera.asamblea.porcentage.padres";
		
			return validaionMssg;
	}
	
	
	/**
	 * Da de baja logica al Consejo del CCT dado
	 * @param cCct Clave dle CCT a ser dado de baja
	 */
	public int deletePrimeraAsamblea(Integer cCct){
		
		int numRecords = -1; 
				
		try{
			CeInfGral ceInfGral = new CeInfGral();
			ceInfGral.setcCct(cCct);
			ceInfGral.setStatusCe(Constants.ESTATUS_BAJA);
			ceInfGral.setFchActualizacion(new Date());
			numRecords = ceInfGralMapper.updateByPrimaryKeySelective(ceInfGral);
	
//			//Elimina todas las sesiones y asambleas del Centro Escolar
//			terceraSesionService.deleteTerceraSesion( cCct );
//			segundaSesionService.deleteSegundaSesion( cCct );
//			primeraSesionService.deletePrimeraSesion( cCct );
//			
			CeIntegranteComiteConsejoExample ceIntegranteComiteConsejoExample = new CeIntegranteComiteConsejoExample();
			ceIntegranteComiteConsejoExample.createCriteria().andCCctIntegranteEqualTo( cCct )
				.andCSesionIntegranteEqualTo(Constants.PRIMERA_ASAMBLEA);
			ceIntComConsejoMapper.deleteByExample( ceIntegranteComiteConsejoExample );
			
			CeIntegranteExample ceIntegranteExample = new CeIntegranteExample();
			ceIntegranteExample.createCriteria().andCCctEqualTo( cCct )
				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
			ceIntegranteMapper.deleteByExample( ceIntegranteExample );
	
			CeAsistenteExample ceAsistenteExample = new CeAsistenteExample();
			ceAsistenteExample.createCriteria().andCCctEqualTo( cCct )
				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
			ceAsistenteMapper.deleteByExample( ceAsistenteExample );
			
			CeActSesionExample ceActSesionExample = new CeActSesionExample();
			ceActSesionExample.createCriteria().andCCctEqualTo( cCct )
				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
			ceActSesionMapper.deleteByExample( ceActSesionExample );
			
			CeIntegranteBajaExample ceIntegranteBajaExample = new CeIntegranteBajaExample();
			ceIntegranteBajaExample.createCriteria().andCCctEqualTo( cCct )
				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
			ceIntegranteBajaMapper.deleteByExample( ceIntegranteBajaExample );
			
			//Se elimina los escrutadores de la primera asamblea para un cct dado.
			CeEscrutadorExample ceEscrutadorCriteria = new CeEscrutadorExample();
			ceEscrutadorCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
			ceEscrutadorMapper.deleteByExample(ceEscrutadorCriteria);
		
			//Se elimina los asuntos de la primera asamblea para un cct dado.
			CeAsuntoExample ceAsuntoCriteria = new CeAsuntoExample();
			ceAsuntoCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
			ceAsuntoMapper.deleteByExample(ceAsuntoCriteria);
			
			//Se elimina los candidatos a presidente de la primera asamblea para un cct dado.
			CeCandidatopresiExample ceCandidatopresiCriteria = new CeCandidatopresiExample();
			ceCandidatopresiCriteria.createCriteria().andCCctEqualTo(cCct)
				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
			ceCandidatopresiMapper.deleteByExample(ceCandidatopresiCriteria);
		
			//Se elimina los candidatos a secretario tecnico de la primera asamblea para un cct dado.
//			CeCandidatosecreExample ceCandidatosecreCriteria = new CeCandidatosecreExample();
//			ceCandidatosecreCriteria.createCriteria().andCCctEqualTo(cCct)
//				.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
//			ceCandidatosecreMapper.deleteByExample(ceCandidatosecreCriteria);
//			
			//se eliminan respuestas
			CePreguntasExample cePreguntasCriteria = new CePreguntasExample();
			cePreguntasCriteria.createCriteria().andCctIdEqualTo(cCct)
			.andCSesionEqualTo(Constants.PRIMERA_ASAMBLEA);
			cePreguntasMapper.deleteByExample(cePreguntasCriteria);
			
			ceSesionMapper.deleteByPrimaryKey(cCct,Constants.PRIMERA_ASAMBLEA);
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"servicios.primera.asamblea.error.eliminar",new Object[]{});
		}
		
		
		return numRecords;
	}

	/**
	 * Consulta la iformacion de la primera asamblea dado un CCT
	 */
	public PrimeraAsambleaVO selectPrimeraAsamblea(Integer cCct, String acta){
		PrimeraAsambleaVO primeraAsambleaVO = null;
		
		if(acta!=null && acta.equals("1")){
			primeraAsambleaVO = primeraAsambleaMapper.selectPrimeraAsambleaActa(cCct);
		}else{
			primeraAsambleaVO = primeraAsambleaMapper.selectPrimeraAsamblea(cCct);
		}
		
		return primeraAsambleaVO;
	}
	
	/**
	 * Consulta la informacion de los integrantes del Consejo Escolar 
	 * para un CCT dado.
	 * @param cCct Clave del CCT cuyos integrantes de Consejo seran devueltos
	 */
	public List<CeIntegrante> selectIntegrantes(Integer cCct){
		CeIntegranteExample criteria = new CeIntegranteExample();
		criteria.createCriteria().andCCctEqualTo(cCct);

		return ceIntegranteMapper.selectByExample(criteria);
	}

	public int saveDenuncia(CeDenuncia ceDenuncia) {
		int numRecords = -1;
		
		
			numRecords=	ceDenunciaMapper.insert(ceDenuncia);
		
		
		return numRecords;

	}
	
}