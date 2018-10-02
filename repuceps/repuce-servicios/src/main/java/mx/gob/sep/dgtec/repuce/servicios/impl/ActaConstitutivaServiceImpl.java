package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;
import mx.gob.sep.dgtec.repuce.dao.ActaConstitutivaMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecAsistenteMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecInstructorMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecIntegranteMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecPromotorMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionIntegranteMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionMapper;
import mx.gob.sep.dgtec.repuce.dao.CCctInstructorMapper;
import mx.gob.sep.dgtec.repuce.model.Apec;
import mx.gob.sep.dgtec.repuce.model.ApecAsistenteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecAsistenteExample;
import mx.gob.sep.dgtec.repuce.model.ApecExample;
import mx.gob.sep.dgtec.repuce.model.ApecInstructor;
import mx.gob.sep.dgtec.repuce.model.ApecInstructorExample;
import mx.gob.sep.dgtec.repuce.model.ApecIntegrante;
import mx.gob.sep.dgtec.repuce.model.ApecIntegranteExample;
import mx.gob.sep.dgtec.repuce.model.ApecPromotor;
import mx.gob.sep.dgtec.repuce.model.ApecPromotorExample;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionExample;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructor;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorExample;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegrante;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteExample;
import mx.gob.sep.dgtec.repuce.model.CCctInstructor;

import mx.gob.sep.dgtec.repuce.servicios.ActaConstitutivaService;
import mx.gob.sep.dgtec.repuce.servicios.PrimeraReunionService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActaConstitutivaServiceImpl implements ActaConstitutivaService{

	private static final Logger log = LoggerFactory.getLogger(ActaConstitutivaServiceImpl.class);
	@Autowired
	private ActaConstitutivaMapper actaConstitutivaMapper;
	@Autowired
	private ApecMapper apecMapper;
	@Autowired
	private ApecReunionMapper apecReunionMapper;
	@Autowired
	private ApecAsistenteMapper apecAsistenteMapper;
	@Autowired
	private ApecInstructorMapper apecInstructorMapper;
	@Autowired
	private ApecIntegranteMapper apecIntegranteMapper;
	@Autowired
	private CCctInstructorMapper cctInstructorMapper;
	@Autowired
	private PrimeraReunionService primeraReunionService;
	
	@Autowired
	private ApecReunionIntegranteMapper apecReunionIntegranteMapper;
	@Autowired
	private ApecReunionInstructorMapper apecReunionInstructorMapper;
	
	@Autowired
	private ApecInstructorMapperCstm apecInstructorMapperCstm;
	
	@Autowired
	private ApecPromotorMapper apecPromotorMapper;
	
	
		
	/**
	 * 
	 * Guardar la Informacion de la Acta Constitutiva  CONAFE
	 *
	 **/
	public int saveActaConstitutiva(ActaConstitutivaVO actaConstitutivaVO) {
		// Identidicar Apec
		Integer cApec = -1;
		int numRecords = -1;
		List<ApecReunionIntegrante> relacionesExistentes= new ArrayList<ApecReunionIntegrante>();
		
		List<ApecReunionInstructor> relacionesExistentesInst= new ArrayList<ApecReunionInstructor>();

		//Consulta la APEC a partir de la clave de la localidad provista por el usuario
		ApecExample apecExample = new ApecExample();
		apecExample.createCriteria()
				.andIdEntidadfedEqualTo(actaConstitutivaVO.getApec().getIdEntidadfed())
				.andIdMunicipioEqualTo(actaConstitutivaVO.getApec().getIdMunicipio())
				.andIdLocalidadEqualTo(actaConstitutivaVO.getApec().getIdLocalidad());
		List<Apec> apecList = apecMapper.selectByExample(apecExample);
				
		
		try{
			
			actaConstitutivaVO.getApec().setFchIntegracion(
			actaConstitutivaVO.getReunion().getFchReunion());
			
		// se comento este if ya que este año solo seran constituidas las APEC
		//	y para el siguiente año ya podran ser renovadas	
			
		/*	if(actaConstitutivaVO.getApec().getPeriodo()==Constants.PERIODO_2015_2017){
				actaConstitutivaVO.getApec().setPeriodo(Constants.PERIODO_2015_2017);
				actaConstitutivaVO.getApec().setStatusApec(Constants.EDO_CE_PREEXISTENTE);
				actaConstitutivaVO.getApec().setTpoRegistro(Constants.TPO_REGISTRO_RENOVACION);
			}
			else{
		*/		//Consejo Inexistente o dado de baja y se registra su integracion
			
				actaConstitutivaVO.getApec().setPeriodo(Constants.PERIODO_2017_2019);  // vblake 
				actaConstitutivaVO.getApec().setStatusApec(Constants.EDO_CE_NUEVO);	
				actaConstitutivaVO.getApec().setTpoRegistro(Constants.TPO_REGISTRO_CONSTITUCION);
		//	}										
					
			if(apecList.size()==0){
				//Consejo Inexistente
				cApec = actaConstitutivaMapper.generateCApec();
				actaConstitutivaVO.getApec().setcApec(cApec);
				numRecords = apecMapper.insert(actaConstitutivaVO.getApec());
			}else{
				//Obtiene la clave de la APEC
				cApec = ((Apec)apecList.get(0)).getcApec();
				actaConstitutivaVO.getApec().setcApec(cApec);
				
				//Recuperar las relaciones existentes de integrantes con las reuniones;									
				ApecReunionIntegranteExample realcionesExample = new ApecReunionIntegranteExample();
				realcionesExample.createCriteria().andCApecEqualTo(cApec).andCReunionNotEqualTo(Constants.ACTA_CONSTITUTIVA);			
				relacionesExistentes=apecReunionIntegranteMapper.selectByExample(realcionesExample);
				
				//Recuperar las relaciones existentes de los instructores con las reuniones(pendiente)
				ApecReunionInstructorExample realcionesInstExample = new ApecReunionInstructorExample();
				realcionesInstExample.createCriteria().andCApecEqualTo(cApec).andCReunionGreaterThan(Constants.ACTA_CONSTITUTIVA);			
				relacionesExistentesInst=apecReunionInstructorMapper.selectByExample(realcionesInstExample);
				
				
				//Elimina la información del acta constitutiva
				deleteElementosActaConstitutiva(cApec);
				numRecords = apecMapper.updateByPrimaryKeySelective(
						actaConstitutivaVO.getApec());
			}
			
			//Se registran los datos de la reunion
			actaConstitutivaVO.getReunion().setcApec(cApec);
			actaConstitutivaVO.getReunion().setcReunion(Constants.ACTA_CONSTITUTIVA);
			actaConstitutivaVO.getReunion().setFchRegistro(new Date());
			apecReunionMapper.insert(actaConstitutivaVO.getReunion());
			
			
			//Se actualizan los datos de los integrantes del consejo
			
			//Se capturan los nuevos integrantes del CE
			for (ApecReunionIntegranteCstm relintegrante : actaConstitutivaVO.getIntegrantes()) {
				boolean intExistente=false;
				if(relintegrante.getcApec()!=null && relintegrante.getcApec().intValue()!=0){
					intExistente=true;
				}
				
				relintegrante.setcApec(cApec);
				relintegrante.setcReunion(Constants.ACTA_CONSTITUTIVA);
				relintegrante.setcApecIntegrante(cApec);
				
				relintegrante.getIntegrante().setcApec(cApec);
				apecIntegranteMapper.insert(relintegrante.getIntegrante());
				
				relintegrante.setcIntegrante(relintegrante.getIntegrante().getcIntegrante());
				apecReunionIntegranteMapper.insert(relintegrante);
				//Insertar las relaciones que se tenian con otras reuniones
				if(intExistente==true){
					for (ApecReunionIntegrante relAnterior : relacionesExistentes) {
						if(relAnterior.getcApec().intValue()== cApec && 
								relAnterior.getcIntegrante().intValue()==relintegrante.getcIntegrante().intValue()){
							apecReunionIntegranteMapper.insert(relAnterior);
							
						}
					}
				}
				
			}

			//Se inserta la información de los asistentes
			for (ApecAsistenteCstm asistente : actaConstitutivaVO.getAsistentes()) {
				asistente.setcApec(cApec);
				asistente.setcReunion(Constants.ACTA_CONSTITUTIVA);
				apecAsistenteMapper.insertSelective(asistente);
			}

			//Se inserta la información de Promotor vblake
			
			for (ApecPromotor promotor : actaConstitutivaVO.getPromotores()) {
			    promotor.setcApec(cApec);
			//	promotor.setcReunion(Constants.ACTA_CONSTITUTIVA);
				apecPromotorMapper.insertSelective(promotor);
			}
			
			//Se inserta la información de los instuctores			
			for (ApecReunionInstructorCtsm relinstructor : actaConstitutivaVO.getInstructores()) {
				
				boolean intsExistente=false;
				if(relinstructor.getcApec()!=null && relinstructor.getcApec().intValue()!=0){
					intsExistente=true;
				}
				
				relinstructor.setcApec(cApec);
				relinstructor.setcReunion(Constants.ACTA_CONSTITUTIVA);
				relinstructor.setcApecInstructor(cApec);				
				relinstructor.getInstructor().setcApec(cApec);
				
				
				apecInstructorMapper.insertSelective(relinstructor.getInstructor());
				
				for(CCctLight cct : relinstructor.getInstructor().getCcts()){
					CCctInstructor cctInstructor = new CCctInstructor();
					cctInstructor.setcApec(cApec);					
					cctInstructor.setcInstructor(relinstructor.getInstructor().getcInstructor());
					cctInstructor.setcCct(cct.getcCct());

					cctInstructorMapper.insertSelective(cctInstructor);
				}
				
				//inserta la relacion del acta con el instructor				
				relinstructor.setcInstructor(relinstructor.getInstructor().getcInstructor());
				apecReunionInstructorMapper.insert(relinstructor);
				
				//Insertar las relaciones que se tenian con otras reuniones
				if(intsExistente==true){
					for (ApecReunionInstructor relAnteriorInst : relacionesExistentesInst) {
						if(relAnteriorInst.getcApec().intValue()== cApec && 
								relAnteriorInst.getcInstructor().intValue()==relinstructor.getcInstructor().intValue()){
							apecReunionInstructorMapper.insert(relAnteriorInst);
							
						}
					}
				}
				
			}

			
		}catch(Exception e){
			try{
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(actaConstitutivaVO));
			}catch(Exception ex){
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura (e,"servicios.acta.constitutiva.error.editar",new Object[]{});
			
		}
		
		return numRecords;
	}

	/**
	 * Selecciona Registros de acta constitutiva
	 * 
	 **/
	public ActaConstitutivaVO selectActaConstitutiva(Integer cApec) {
		ActaConstitutivaVO actaConstitutivaVO = null;
		
		
		actaConstitutivaVO = actaConstitutivaMapper.selectActaConstitutiva(cApec);
		
		
		return actaConstitutivaVO;
	}

	/**
	 * Elimina Registro de acta constitutiva
	 * 
	 **/
	public int deleteActaConstitutiva(Integer cApec){
		int numRecords = -1; 
		
		try{
			
			//Elimina todas las reuniones de la APEC
			  /*
				
				primeraReunionService.deleteTerceraSesion( cApec );
				segundaReunionService.deleteSegundaSesion( cApec );
				terceraReunionService.deletePrimeraSesion( cApec );
			
				*/
			primeraReunionService.deletePrimeraReunion(cApec);
			deleteElementosActaConstitutiva(cApec);
			numRecords = apecMapper.deleteByPrimaryKey(cApec);

			
		}catch(Exception e){
			throw new ErrorInfraestructura (e,"servicios.primera.asamblea.error.eliminar",new Object[]{});
		}
		return numRecords;
	}

	
	private void deleteElementosActaConstitutiva(Integer cApec){

		//Elimina los integrantes
		ApecIntegranteExample apecIntegranteExample = new ApecIntegranteExample();
		apecIntegranteExample.createCriteria().andCApecEqualTo(cApec);			
		apecIntegranteMapper.deleteByExample(apecIntegranteExample);

		
		//Elimina la relacion de instructores con escuelas
		/*CCctInstructorExample cCctInstructorExample = new CCctInstructorExample();
		cCctInstructorExample.createCriteria().andCApecEqualTo(cApec);
		cctInstructorMapper.deleteByExample(cCctInstructorExample);*/
		int numrel=0;
		numrel=apecInstructorMapperCstm.borrarCctsInstructoresXReunion(cApec, Constants.ACTA_CONSTITUTIVA);
		
		System.out.println("borro"+numrel);
		//Elimina los instructores del acta
		/*ApecInstructorExample apecInstructorExample = new ApecInstructorExample();
		apecInstructorExample.createCriteria().andCApecEqualTo(cApec);		
		apecInstructorMapper.deleteByExample(apecInstructorExample);*/
		
		apecInstructorMapperCstm.borrarInstructoresXReunion(cApec, Constants.ACTA_CONSTITUTIVA);
		
		//Elimina los promotores
		ApecPromotorExample apecPromotorExample = new ApecPromotorExample();
		apecPromotorExample.createCriteria().andCApecEqualTo(cApec);
		apecPromotorMapper.deleteByExample(apecPromotorExample);
		
		
		//Elimina los asistentes
		ApecAsistenteExample apecAsistenteExample = new ApecAsistenteExample();
		apecAsistenteExample.createCriteria().andCApecEqualTo(cApec)
			.andCReunionEqualTo(Constants.ACTA_CONSTITUTIVA);
		apecAsistenteMapper.deleteByExample(apecAsistenteExample);
		
		//Elimina el registro de la reunion
		apecReunionMapper.deleteByPrimaryKey(cApec, Constants.ACTA_CONSTITUTIVA);

	}
	
	
	public void actaulizaRelacionesPendientes(){
		
		List<ApecReunion> listapec = new ArrayList<ApecReunion>();
		//criterio de busqueda
		
		ApecReunionExample criteriosApec= new ApecReunionExample();
		criteriosApec.createCriteria().andCReunionEqualTo(Constants.ACTA_CONSTITUTIVA);
		criteriosApec.setOrderByClause("c_apec");
		
		
		listapec=apecReunionMapper.selectByExample(criteriosApec);
		
		for (ApecReunion apecReunionActa : listapec) {
			
			//insertar relaciones de los integrantes
			List<ApecIntegrante> listIntegrantes = new ArrayList<ApecIntegrante>();
			
			ApecIntegranteExample criterioIntegrante = new ApecIntegranteExample();
			
			criterioIntegrante.createCriteria().andCApecEqualTo(apecReunionActa.getcApec());
			
			listIntegrantes=apecIntegranteMapper.selectByExample(criterioIntegrante);
			
			
			for (ApecIntegrante integrante : listIntegrantes) {
				
				ApecReunionIntegranteExample criterioRelIntegrante= new ApecReunionIntegranteExample();
				criterioRelIntegrante.createCriteria().andCApecEqualTo(integrante.getcApec()).andCIntegranteEqualTo(integrante.getcIntegrante());
				List<ApecReunionIntegrante> listaRelaciones= new ArrayList<ApecReunionIntegrante>();
				
				listaRelaciones=apecReunionIntegranteMapper.selectByExample(criterioRelIntegrante);
				
				if(listaRelaciones!=null && listaRelaciones.isEmpty()==false){
					for (ApecReunionIntegrante relExistenteIntegrante : listaRelaciones) {
						System.out.println("Si existe relacion"+relExistenteIntegrante.getcApec()+".."+relExistenteIntegrante.getcIntegrante());	
					}					
				}
				
				else{
					ApecReunionIntegrante relacionNueva = new ApecReunionIntegrante();
					relacionNueva.setcApec(integrante.getcApec());
					relacionNueva.setcApecIntegrante(integrante.getcApec());
					relacionNueva.setcIntegrante(integrante.getcIntegrante());
					relacionNueva.setcReunion(Constants.ACTA_CONSTITUTIVA);		
					System.out.println("insertado para"+integrante.getcApec()+".."+integrante.getcIntegrante());
					apecReunionIntegranteMapper.insert(relacionNueva);
				}
				
			}
				
			
		
		//insertar relaciones de los instructores
		List<ApecInstructor> listInstructores = new ArrayList<ApecInstructor>();
		
		ApecInstructorExample criterioInstructor = new ApecInstructorExample();
		
		criterioInstructor.createCriteria().andCApecEqualTo(apecReunionActa.getcApec());
		
		listInstructores=apecInstructorMapper.selectByExample(criterioInstructor);
		
		
		for (ApecInstructor instructor : listInstructores) {
			
			ApecReunionInstructorExample criterioRelInstructor= new ApecReunionInstructorExample();
			criterioRelInstructor.createCriteria().andCApecEqualTo(instructor.getcApec()).andCInstructorEqualTo(instructor.getcInstructor());
			List<ApecReunionInstructor> listaRelaciones= new ArrayList<ApecReunionInstructor>();
			
			listaRelaciones=apecReunionInstructorMapper.selectByExample(criterioRelInstructor);
			
			if(listaRelaciones!=null && listaRelaciones.isEmpty()==false){
				for (ApecReunionInstructor relExistenteInstructor : listaRelaciones) {
					System.out.println("Si existe relacion"+relExistenteInstructor.getcApec()+".."+relExistenteInstructor.getcInstructor());	
				}					
			}
			
			else{
				ApecReunionInstructor relacionNuevaIns = new ApecReunionInstructor();
				relacionNuevaIns.setcApec(instructor.getcApec());
				relacionNuevaIns.setcApecInstructor(instructor.getcApec());
				relacionNuevaIns.setcInstructor(instructor.getcInstructor());
				relacionNuevaIns.setcReunion(Constants.ACTA_CONSTITUTIVA);		
				System.out.println("insertado para"+instructor.getcApec()+".."+instructor.getcInstructor());
				apecReunionInstructorMapper.insert(relacionNuevaIns);
			}
			
		}		
		
		
	}
}
}