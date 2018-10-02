package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.gob.sep.dgtec.conafe.vo.SegundaReunionVO;
import mx.gob.sep.dgtec.repuce.dao.ActaConstitutivaMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecApoyoMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecApoyoMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecDenunciasQuejasMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecBullyingMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecBullyingMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecOpinionesComentariosMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecPlanTrabajoMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecPlanTrabajoMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionIntegranteMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecNecesidadesEducativasMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecSeccionMapper;
import mx.gob.sep.dgtec.repuce.dao.CCctInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.SegundaReunionMapper;
import mx.gob.sep.dgtec.repuce.model.ApecApoyo;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoExample;
import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejas;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejasExample;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentarios;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentariosExample;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajo;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoExample;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructor;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorExample;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteExample;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativas;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasExample;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasCstm;
import mx.gob.sep.dgtec.repuce.model.ApecBullying;
import mx.gob.sep.dgtec.repuce.model.ApecBullyingCstm;
import mx.gob.sep.dgtec.repuce.model.ApecBullyingExample;
import mx.gob.sep.dgtec.repuce.model.ApecSeccion;
import mx.gob.sep.dgtec.repuce.model.ApecSeccionCstm;
import mx.gob.sep.dgtec.repuce.model.ApecSeccionExample;
import mx.gob.sep.dgtec.repuce.model.CCctInstructor;
import mx.gob.sep.dgtec.repuce.model.CCctInstructorExample;
import mx.gob.sep.dgtec.repuce.servicios.SegundaReunionService;
import mx.gob.sep.dgtec.repuce.servicios.TerceraReunionService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorNegocio;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;

@Service
public class SegundaReunionServiceImpl implements SegundaReunionService {

	private static final Logger log = LoggerFactory
			.getLogger(SegundaReunionServiceImpl.class);
	@Autowired
	private ActaConstitutivaMapper actaConstitutivaMapper;
	@Autowired
	private ApecMapper apecMapper;
	@Autowired
	private ApecReunionMapper apecReunionMapper;
	@Autowired
	private ApecApoyoMapper apecApoyoMapper;
	@Autowired
	private ApecBullyingMapper ApecBullyingMapper;
	@Autowired
	private ApecNecesidadesEducativasMapper ApecNecesidadesEducativasMapper;
	@Autowired
	private SegundaReunionMapper segundaReunionMapper;
	@Autowired
	private ApecSeccionMapper apecSeccionMapper;
	@Autowired
	private ApecPlanTrabajoMapper apecPlanTrabajoMapper;
	@Autowired
	private TerceraReunionService terceraReunionService;
	@Autowired
	private ApecReunionIntegranteMapper apecReunionIntegranteMapper;
	@Autowired
	private ApecReunionInstructorMapper apecReunionInstructorMapper;
	@Autowired
	private ApecInstructorMapper apecInstructorMapper;
	@Autowired
	private CCctInstructorMapper cctInstructorMapper;
	@Autowired
	private ApecReunionInstructorMapperCstm apecReunionInstructorMapperCstm;
	@Autowired
	private ApecApoyoMapperCstm apecApoyoMapperCstm;
	@Autowired
	private ApecPlanTrabajoMapperCstm apecPlanTrabajoMapperCstm;
	@Autowired
	private ApecBullyingMapperCstm ApecBullyingMapperCstm;
	@Autowired
	private ApecOpinionesComentariosMapper apecOpinionesComentariosMapper;
	@Autowired
	private ApecDenunciasQuejasMapper apecDenunciasQuejasMapper;

	public int saveSegundaReunion(SegundaReunionVO segundaReunionVO) 
			throws Exception {
		boolean existenApoyos = false;
		boolean existePlanTrabajo = false;
		boolean existeInclusion = false;
		boolean existeContraloria=false;
		int numRecords = -1;
		List<ApecPlanTrabajo> planTrabajoBD = new ArrayList<ApecPlanTrabajo>();
		List<ApecApoyo> apoyosRegistradoBD = new ArrayList<ApecApoyo>();
		List<ApecReunionInstructor> relacionesExistentesInst = new ArrayList<ApecReunionInstructor>();
		List<ApecBullying> bullyingBD = new ArrayList<ApecBullying>();
		List<ApecNecesidadesEducativas> necesidadesBD = new ArrayList<ApecNecesidadesEducativas>();


		try {

			// verificar si es una modificacion

			if (segundaReunionVO.getReunion() != null
					&& segundaReunionVO.getReunion().getcApec() != null) {
				ApecApoyoExample criterioApoyos = new ApecApoyoExample();
				criterioApoyos
						.createCriteria()
						.andCApecEqualTo(
								segundaReunionVO.getReunion().getcApec())
						.andCReunionEqualTo(Constants.SEGUNDA_REUNION);

				apoyosRegistradoBD = apecApoyoMapper
						.selectByExample(criterioApoyos);
				
				//Verificar si hay apoyos repetidos en reuniones posteriores
				
//nuevo
				if(segundaReunionVO.getApoyosEstatales()!=null && segundaReunionVO.getApoyosEstatales().isEmpty()==false){
					List<ApecApoyoCstm> apoyosReunionesPosteriores= new ArrayList<ApecApoyoCstm>();
					
					apoyosReunionesPosteriores=apecApoyoMapperCstm.selectApoyosRegistradosPosterior(segundaReunionVO.getApec().getcApec(), Constants.SEGUNDA_REUNION, "");
					
					if(apoyosReunionesPosteriores!=null && apoyosReunionesPosteriores.size()!=0){
						
						
						for (ApecApoyoCstm apoyoNuevo : segundaReunionVO.getApoyosEstatales()) {
							
							for (ApecApoyoCstm apoyoExistentes : apoyosReunionesPosteriores) {
								
								if(apoyoNuevo.getcApoyo().intValue()==apoyoExistentes.getcApoyo().intValue()){
									
									throw new ErrorNegocio(new Object[]{}, "servicios.segunda.reunion.error.apoyosEstatal");

								}
							}
							
						}
						
						
					}
					
				}
				
	//nuevo 27/05/15
			/*if(segundaReunionVO.getBullying()!=null && segundaReunionVO.getBullying().isEmpty()==false){
					List<ApecBullyingCstm> acosoReunionesPosteriores= new ArrayList<ApecBullyingCstm>();
					
					acosoReunionesPosteriores =ApecBullyingMapperCstm.selectBullyingRegistradosPosterior(segundaReunionVO.getApec().getcApec(), Constants.SEGUNDA_REUNION);
					
					if(acosoReunionesPosteriores!=null && acosoReunionesPosteriores.size()!=0){
						
						
						for (ApecBullyingCstm acosoNuevo : segundaReunionVO.getBullying()) {
							
							for (ApecBullyingCstm acosoExistentes : acosoReunionesPosteriores) {
								
								if(acosoNuevo.getcCoBullying().intValue()==acosoExistentes.getcCoBullying().intValue()){
									
									throw new ErrorNegocio(new Object[]{}, "servicios.segunda.reunion.error.bullying");

								}
							}
							
						}
						
						
					}
					
				}*/
				
	//nuevo				
				
				//revisar si hay acciones del plan de trabajo repetidos en reuniones posterior
				
				if(segundaReunionVO.getPlanTrabajo()!=null && segundaReunionVO.getPlanTrabajo().isEmpty()==false){
					List<ApecPlanTrabajoCstm> accionesReunionesPosteriores= new ArrayList<ApecPlanTrabajoCstm>();
					
					accionesReunionesPosteriores=apecPlanTrabajoMapperCstm.selectAccionesRegistradasPosterior(segundaReunionVO.getApec().getcApec(), Constants.SEGUNDA_REUNION);
					
					if(accionesReunionesPosteriores!=null && accionesReunionesPosteriores.size()!=0){
						
						
						for (ApecPlanTrabajoCstm accionNueva : segundaReunionVO.getPlanTrabajo()) {
							
							for (ApecPlanTrabajoCstm accionExistente : accionesReunionesPosteriores) {
								
								if(accionNueva.getcAccion().intValue()==accionExistente.getcAccion().intValue()){
									
									throw new ErrorNegocio(new Object[]{}, "servicios.reunion.error.planTrabajo");
								}
							}
							
						}
						
						
					}
					
				}
				
				// Recuperar las relaciones existentes de los instructores con
				// las reuniones siguientes

				ApecReunionInstructorExample realcionesInstExample = new ApecReunionInstructorExample();
				realcionesInstExample.createCriteria()
						.andCApecEqualTo(segundaReunionVO.getApec().getcApec())
						.andCReunionGreaterThan(Constants.SEGUNDA_REUNION);
				relacionesExistentesInst = apecReunionInstructorMapper
						.selectByExample(realcionesInstExample);
				

				planTrabajoBD = borrarElementosSegundaReunion(segundaReunionVO);
				segundaReunionVO.getReunion().setcApec(
						segundaReunionVO.getApec().getcApec());
				segundaReunionVO.getReunion().setcReunion(
						Constants.SEGUNDA_REUNION);
				segundaReunionVO.getReunion().setFchRegistro(new Date());
				numRecords = apecReunionMapper
						.updateByPrimaryKey(segundaReunionVO.getReunion());

			}

			else {
				segundaReunionVO.getReunion().setcApec(
						segundaReunionVO.getApec().getcApec());
				segundaReunionVO.getReunion().setcReunion(
						Constants.SEGUNDA_REUNION);
				segundaReunionVO.getReunion().setFchRegistro(new Date());
				numRecords = apecReunionMapper.insert(segundaReunionVO
						.getReunion());
			}

			// insertar los apoyos
		
			if (segundaReunionVO.getApoyosFederales() != null
					&& segundaReunionVO.getApoyosFederales().isEmpty() == false) {
				for (ApecApoyoCstm apoyoFederal : segundaReunionVO
						.getApoyosFederales()) {
					apoyoFederal.setcApec(segundaReunionVO.getReunion()
							.getcApec());
					apoyoFederal.setcReunion(Constants.SEGUNDA_REUNION);
					for (ApecApoyo apoyoBD : apoyosRegistradoBD) {
						if (apoyoFederal.getcApoyo().intValue() == apoyoBD
								.getcApoyo().intValue()) {
							apoyoFederal.setDescripOtro(apoyoBD.getDescripOtro());
							apoyoFederal.setBeneficiariosr1(apoyoBD.getBeneficiariosr1());
							apoyoFederal.setMontor3(apoyoBD.getMontor3());
							apoyoFederal.setBeneficiariosr2(apoyoBD.getBeneficiariosr2());
							break;
						}
					}
					apecApoyoMapper.insert(apoyoFederal);
					existenApoyos = true;
				}
			}
			
				
			
			if (segundaReunionVO.getApoyosEstatales() != null
					&& segundaReunionVO.getApoyosEstatales().isEmpty() == false) {
				for (ApecApoyoCstm apoyoEstatal : segundaReunionVO
						.getApoyosEstatales()) {
					apoyoEstatal.setcApec(segundaReunionVO.getReunion()
							.getcApec());
					apoyoEstatal.setcReunion(Constants.SEGUNDA_REUNION);
					for (ApecApoyo apoyoBD : apoyosRegistradoBD) {
						if (apoyoEstatal.getcApoyo().intValue() == apoyoBD
								.getcApoyo().intValue()) {
							apoyoEstatal.setDescripOtro(apoyoBD.getDescripOtro());
							apoyoEstatal.setBeneficiariosr1(apoyoBD.getBeneficiariosr1());
							apoyoEstatal.setMontor2(apoyoBD.getMontor2());
							break;
						}
					}
					apecApoyoMapper.insert(apoyoEstatal);
					existenApoyos = true;
				}
			}
			
			//Bullying
			if (segundaReunionVO.getAcoso() != null
					&& segundaReunionVO.getAcoso().isEmpty() == false) {
				for (ApecBullyingCstm bullyingN : segundaReunionVO
						.getAcoso()) {
					bullyingN.setcApec(segundaReunionVO.getReunion()
							.getcApec());
					bullyingN.setcReunion(Constants.SEGUNDA_REUNION);
					for (ApecBullying acosoBD : bullyingBD) {
						if (bullyingN.getcCoBullying().intValue() == acosoBD
								.getcCoBullying().intValue()) {
							bullyingN.setcCoTipoBullying(acosoBD.getcCoTipoBullying());
							bullyingN.setCuantos(acosoBD.getCuantos());
							bullyingN.setNumvecesr1(acosoBD.getNumvecesr1());
							bullyingN.setSeconcreto(acosoBD.getSeconcreto());
							bullyingN.setConsiste(acosoBD.getConsiste());
							break;
						}
					}
					ApecBullyingMapper.insert(bullyingN);
					existeInclusion = true;
				}
			}
			System.out.println("llego antes de bullying");
			if (segundaReunionVO.getBullying() != null
					&& segundaReunionVO.getBullying().isEmpty() == false) {
				for (ApecBullyingCstm bullying : segundaReunionVO
						.getBullying()) {
					bullying.setcApec(segundaReunionVO.getReunion()
							.getcApec());
					bullying.setcReunion(Constants.SEGUNDA_REUNION);
					for (ApecBullying acosoBD : bullyingBD) {
						if (bullying.getcCoBullying().intValue() == acosoBD
								.getcCoBullying().intValue()) {
							
							System.out.println("entro al if donde ponemos los parametros");
							bullying.setcCoTipoBullying(acosoBD.getcCoTipoBullying());
							bullying.setCuantos(acosoBD.getCuantos());
							bullying.setNumvecesr1(acosoBD.getNumvecesr1());
							bullying.setBconcreto(acosoBD.getBconcreto());
							bullying.setBproceso(acosoBD.getBproceso());
							bullying.setSeconcreto(acosoBD.getSeconcreto());
							bullying.setConsiste(acosoBD.getConsiste());
							break;
						}
					}
					ApecBullyingMapper.insert(bullying);
					existeInclusion = true;
				}
			}
			//
			System.out.println("salio de bullying");
			//
			
			System.out.println("llego antes de necesidades");
			
			if (segundaReunionVO.getNecesidadesEspeciales() != null
					&& segundaReunionVO.getNecesidadesEspeciales().isEmpty() == false) {
				for (ApecNecesidadesEducativasCstm necesidadesEspeciales : segundaReunionVO
						.getNecesidadesEspeciales()) {
					necesidadesEspeciales.setcApec(segundaReunionVO.getReunion()
							.getcApec());
					necesidadesEspeciales.setcReunion(Constants.SEGUNDA_REUNION);
					for (ApecNecesidadesEducativas neceBD : necesidadesBD) {
						if (necesidadesEspeciales.getcApoyo().intValue() == neceBD
								.getcApoyo().intValue()) {
							System.out.println("entro al if donde ponemos los parametros a necesidades");
							necesidadesEspeciales.setcNee(neceBD.getcNee());
							necesidadesEspeciales.setGestionar(neceBD.getGestionar());
							necesidadesEspeciales.setcNee1(neceBD.getcNee1());
							necesidadesEspeciales.setGestionar1(neceBD.getGestionar1());
							necesidadesEspeciales.setConcreto(neceBD.getConcreto());
							necesidadesEspeciales.setProceso(neceBD.getProceso());
							necesidadesEspeciales.setConcreto1(neceBD.getConcreto1());
							necesidadesEspeciales.setProceso1(neceBD.getProceso1());
							necesidadesEspeciales.setCuantos(neceBD.getCuantos());
							necesidadesEspeciales.setCuantos1(neceBD.getCuantos1());
							necesidadesEspeciales.setSeconcreto(neceBD.getSeconcreto());
							necesidadesEspeciales.setSeconcreto1(neceBD.getSeconcreto1());
							necesidadesEspeciales.setConsiste(neceBD.getConsiste());
							necesidadesEspeciales.setConsiste1(neceBD.getConsiste1());					
						break;
						}
					}
					ApecNecesidadesEducativasMapper.insert(necesidadesEspeciales);
					existeInclusion = true;
				}
			}
	
			System.out.println("salio de necesidades");
			
			
			// plan de trabajo
			if (segundaReunionVO.getPlanTrabajo() != null
					&& segundaReunionVO.getPlanTrabajo().isEmpty() == false) {
				for (ApecPlanTrabajoCstm acciones : segundaReunionVO
						.getPlanTrabajo()) {
					acciones.setcApec(segundaReunionVO.getReunion().getcApec());

					for (ApecPlanTrabajo accionBD : planTrabajoBD) {
						if (accionBD.getcAccion().intValue() == acciones
								.getcAccion().intValue()) {
							acciones.setcRespuestar3(accionBD.getcRespuestar3());
							acciones.setNumVecesr3(accionBD.getNumVecesr3());
							break;
						}
					}
					if (acciones.getcReunion() != null
							&& acciones.getcReunion().intValue() == Constants.PRIMERA_REUNION) {
						// Solo actualiza la respuesta de la reunion 2 y el
						// campo numero de veces 2
						if (acciones.getcRespuestar2() != null) {
							apecPlanTrabajoMapper
									.updateByPrimaryKeySelective(acciones);
						}

					} else {

						acciones.setcReunion(Constants.SEGUNDA_REUNION);
						apecPlanTrabajoMapper.insert(acciones);
					}

					existePlanTrabajo = true;
				}
			}
			
			//inclusionSocial
		
			
			//

			// insertar los integrantes seleccionados
			if(segundaReunionVO.getIntegrantesR2()!=null && segundaReunionVO.getIntegrantesR2().isEmpty()==false){
				for (ApecReunionIntegranteCstm intSeleccionado : segundaReunionVO
						.getIntegrantesR2()) {
					intSeleccionado.setcReunion(Constants.SEGUNDA_REUNION);
					intSeleccionado.setcApec(segundaReunionVO.getReunion()
							.getcApec());
					intSeleccionado.setcApecIntegrante(segundaReunionVO
							.getReunion().getcApec());
					apecReunionIntegranteMapper.insert(intSeleccionado);

				}
	
			}
			
			// opiniones
						if (segundaReunionVO.getOpiniones() != null
								&& segundaReunionVO.getOpiniones().isEmpty() == false) {
							for (ApecOpinionesComentarios opiniones : segundaReunionVO
									.getOpiniones()) {
								opiniones.setcApec(segundaReunionVO.getReunion()
										.getcApec());
								opiniones.setcReunion(Constants.SEGUNDA_REUNION);
								opiniones.setcOpiniones(opiniones.getcOpiniones());
								opiniones.setOpiniones(opiniones.getOpiniones());
								apecOpinionesComentariosMapper.insert(opiniones);
								existeContraloria = true;
							}
						}
						
						// denuncias
						if (segundaReunionVO.getDenuncias() != null
								&& segundaReunionVO.getDenuncias().isEmpty() == false) {
							for (ApecDenunciasQuejas denuncias : segundaReunionVO
									.getDenuncias()) {
								denuncias.setcApec(segundaReunionVO.getReunion()
										.getcApec());
								denuncias.setcReunion(Constants.SEGUNDA_REUNION);
								denuncias.setcDenuncias(denuncias.getcDenuncias());
								denuncias.setDenuncias(denuncias.getDenuncias());
								apecDenunciasQuejasMapper.insert(denuncias);
								existeContraloria = true;
							}
						}
			
			
			
					
			
			// insertar los instructores registrados en la r2 y las relaciones
			// de todos los instructores registrados y seleccionados
			
			if(segundaReunionVO.getInstructoresR2()!=null && segundaReunionVO.getInstructoresR2().isEmpty()==false){
				for (ApecReunionInstructorCtsm instructorR2 : segundaReunionVO
						.getInstructoresR2()) {

					boolean intsExistente = false;
					if (instructorR2.getcApec() != null
							&& instructorR2.getcApec().intValue() != 0) {
						intsExistente = true;
					}

					// Instructor registrado en la reunion 2
					if (instructorR2.isEditable() == true) {						
						instructorR2.getInstructor().setcApec(
								segundaReunionVO.getApec().getcApec());
					
						apecInstructorMapper.insert(instructorR2.getInstructor());

						// ccts por instructor registrado
						for (CCctLight cct : instructorR2.getInstructor().getCcts()) {
							CCctInstructor cctInstructor = new CCctInstructor();
							cctInstructor.setcApec(segundaReunionVO.getApec()
									.getcApec());
							cctInstructor.setcInstructor(instructorR2
									.getInstructor().getcInstructor());
							cctInstructor.setcCct(cct.getcCct());

							cctInstructorMapper.insertSelective(cctInstructor);
						}

						// Insertar las relaciones que se tenian con otras reuniones
						if (intsExistente == true) {
							for (ApecReunionInstructor relAnteriorInst : relacionesExistentesInst) {
								if (relAnteriorInst.getcApec().intValue() == instructorR2.getcApec().intValue()
										&& relAnteriorInst.getcInstructor()
												.intValue() == instructorR2
												.getcInstructor().intValue()) {
									apecReunionInstructorMapper
											.insert(relAnteriorInst);

								}
							}
						}

					}
					// Registra las relaciones
					instructorR2.setcApecInstructor(segundaReunionVO.getApec()
							.getcApec());
					instructorR2.setcReunion(Constants.SEGUNDA_REUNION);
					instructorR2.setcApec(segundaReunionVO.getApec().getcApec());
					apecReunionInstructorMapper.insert(instructorR2);

				}
	
			}



			

			insertarSeccionesRegistradas(segundaReunionVO, existenApoyos, existeInclusion,
					existePlanTrabajo, existeContraloria);

			System.out.println("guardo la reunion");

		}catch(ErrorNegocio e ){
			throw e;
		} 
		catch (Exception e) {
			try {
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(segundaReunionVO));
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura(e,
					"servicios.primera.reunion.error.editar", new Object[] {});

		}

		return numRecords;

	}

	public int deleteSegundaReunion(Integer apec) throws Exception{

		int numRecords = -1;
		try {
			// Elimina todas las reuniones de la APEC
			/*
			 * segundaReunionService.deleteSegundaSesion( cApec );
			 * terceraReunionService.deletePrimeraSesion( cApec );
			 */
			SegundaReunionVO sreunion = new SegundaReunionVO();
			ApecCstm apecObj = new ApecCstm();
			apecObj.setcApec(apec);
			sreunion.setApec(apecObj);
			
			terceraReunionService.deleteTerceraReunion(apec);
			borrarElementosSegundaReunion(sreunion);
			
			numRecords = apecReunionMapper.deleteByPrimaryKey(apec,
					Constants.SEGUNDA_REUNION);

		} catch (Exception e) {
			throw new ErrorInfraestructura(e,
					"servicios.segunda.reunion.error.eliminar", new Object[] {});
		}
		return numRecords;

	}

	private List<ApecPlanTrabajo> borrarElementosSegundaReunion(SegundaReunionVO segundaReunionVO) {

		// Obtener el plan de trabajo original de la segunda reunuion
		List<ApecPlanTrabajo> ptOriginal = new ArrayList<ApecPlanTrabajo>();

		ApecPlanTrabajoExample criterioPT = new ApecPlanTrabajoExample();
		criterioPT.createCriteria().andCApecEqualTo(segundaReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.SEGUNDA_REUNION);
		// recupera el plan de trabajo original, en caso de que se tenga
		// respuesta de seguimiento en la reunion 3

		ptOriginal = apecPlanTrabajoMapper.selectByExample(criterioPT);


		// Eliminar los apoyos de todo tipo
		ApecApoyoExample criterioApoyos = new ApecApoyoExample();
		criterioApoyos.createCriteria().andCApecEqualTo(segundaReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.SEGUNDA_REUNION);
		apecApoyoMapper.deleteByExample(criterioApoyos);
		
		
		
	

		//Eliminar bullying
		
		ApecBullyingExample criterioBullying = new ApecBullyingExample();

		criterioBullying.createCriteria()
				.andCApecEqualTo(segundaReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.SEGUNDA_REUNION);
		ApecBullyingMapper.deleteByExample(criterioBullying);
		
		//Eliminar necesidades educativas
		
		ApecNecesidadesEducativasExample criterioneceEsp = new ApecNecesidadesEducativasExample();

		criterioneceEsp.createCriteria()
				.andCApecEqualTo(segundaReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.SEGUNDA_REUNION);
		ApecNecesidadesEducativasMapper.deleteByExample(criterioneceEsp);
		
		// Eliminar el plan de trabajo
		

		apecPlanTrabajoMapper.deleteByExample(criterioPT);

		// borrar todas las secciones registradas
		ApecSeccionExample criterios = new ApecSeccionExample();
		criterios.createCriteria().andCApecEqualTo(segundaReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.SEGUNDA_REUNION);
		apecSeccionMapper.deleteByExample(criterios);

		// Eliminar los integrantes seleccionados para la reunion
		ApecReunionIntegranteExample criterioIntegrantes = new ApecReunionIntegranteExample();
		criterioIntegrantes.createCriteria().andCApecEqualTo(segundaReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.SEGUNDA_REUNION);
		apecReunionIntegranteMapper.deleteByExample(criterioIntegrantes);
		
		// eliminar los instructores registrados y su relaccion con cct en la reunion 2
		List<ApecReunionInstructorCtsm> relInstRegistrados = new ArrayList<ApecReunionInstructorCtsm>();

		relInstRegistrados=apecReunionInstructorMapperCstm.selectInstructoresRegistradosXReunion(segundaReunionVO.getApec().getcApec(),Constants.SEGUNDA_REUNION);
		
		for (ApecReunionInstructorCtsm instrRegistado : relInstRegistrados) {

			
			CCctInstructorExample cCctInstructorExample = new CCctInstructorExample();
			cCctInstructorExample.createCriteria()
					.andCApecEqualTo(segundaReunionVO.getApec().getcApec())
					.andCInstructorEqualTo(instrRegistado.getcInstructor());

			cctInstructorMapper.deleteByExample(cCctInstructorExample);

			apecInstructorMapper.deleteByPrimaryKey(segundaReunionVO.getApec()
					.getcApec(), instrRegistado.getcInstructor());

		}
		
		// Eliminar las relaciones de instructores seleccionados

			ApecReunionInstructorExample criterioInstructor = new ApecReunionInstructorExample();
			criterioInstructor.createCriteria()
					.andCApecEqualTo(segundaReunionVO.getApec().getcApec())
					.andCReunionEqualTo(Constants.SEGUNDA_REUNION);
			apecReunionInstructorMapper.deleteByExample(criterioInstructor);

		// eliminar los instructores registrados en la reunion 2
			/*if(segundaReunionVO.getInstructoresR2()!=null && segundaReunionVO.getInstructoresR2().isEmpty()==false){
				for (ApecReunionInstructorCtsm instrRegistado : segundaReunionVO
						.getInstructoresR2()) {
					if (instrRegistado.isEditable() == true) {
						apecInstructorMapper.deleteByPrimaryKey(segundaReunionVO
								.getApec().getcApec(), instrRegistado.getcInstructor());
					}
				}	
			}*/

		
		// borrar las respuesta que se hayan dado a las actividades del plan de
		// trabajo de la reunion 1
		List<ApecPlanTrabajo> planTrabajoR1 = new ArrayList<ApecPlanTrabajo>();
		ApecPlanTrabajoExample criterioPTR1 = new ApecPlanTrabajoExample();
		criterioPTR1.createCriteria()
				.andCReunionEqualTo(Constants.PRIMERA_REUNION)
				.andCApecEqualTo(segundaReunionVO.getApec().getcApec());

		planTrabajoR1 = apecPlanTrabajoMapper.selectByExample(criterioPTR1);
				
		if (planTrabajoR1 != null && planTrabajoR1.isEmpty() == false) {
			for (ApecPlanTrabajo accion : planTrabajoR1) {
				accion.setcRespuestar2(null);
				accion.setNumVecesr2(null);

				apecPlanTrabajoMapper.updateByPrimaryKey(accion);
			}
		}
		
		
		ApecOpinionesComentariosExample criteriosOpiniones= new ApecOpinionesComentariosExample();
        criteriosOpiniones.createCriteria()
		.andCApecEqualTo(segundaReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.SEGUNDA_REUNION);
        apecOpinionesComentariosMapper.deleteByExample(criteriosOpiniones);
        
        ApecDenunciasQuejasExample criteriosDenuncias= new ApecDenunciasQuejasExample();
        criteriosDenuncias.createCriteria()
		.andCApecEqualTo(segundaReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.SEGUNDA_REUNION);
        apecDenunciasQuejasMapper.deleteByExample(criteriosDenuncias);

		return ptOriginal;

	}

	public SegundaReunionVO selectSegundaReunion(Integer apec) {

		SegundaReunionVO segundaReunion = null;
		segundaReunion = segundaReunionMapper.selectSegundaReunion(apec);

		// Para la minuta se colocan todos los apoyos en una sola lista
		List<ApecApoyoCstm> apoyos = new ArrayList<ApecApoyoCstm>();
	

		for (ApecApoyoCstm federal : segundaReunion.getApoyosFederales()) {
			apoyos.add(federal);

		}
		for (ApecApoyoCstm estatal : segundaReunion.getApoyosEstatales()) {
			apoyos.add(estatal);
		}
		
		

		
	
		// verificar que la seccion de plan de trabajo se habilite cuando hay
		// acciones de la reunion1 y no existan en la 2
		
		
		boolean tieneSeccionPlan = false;
		// verificar que la seccion de plan de trabajo se habilite cuando hay
		// acciones de la reunion1 y no existan en la 2
		if (segundaReunion.getPlanTrabajo() != null
				&& segundaReunion.getPlanTrabajo().size() != 0) {

			for (ApecSeccionCstm seccionesSegR : segundaReunion
					.getSeccionesReunion()) {
				if (seccionesSegR.getcSeccionRegistro().intValue() == Constants.SECCION_PLAN_TRABAJO_SEGUNDA_REUNION
						.intValue()) {
					if (seccionesSegR.getcApec() != null
							&& seccionesSegR.getcApec().intValue() == segundaReunion
									.getApec().getcApec().intValue()) {
						tieneSeccionPlan = true;
					}
					if (tieneSeccionPlan == false) {
						seccionesSegR.setcApec(segundaReunion.getApec()
								.getcApec());
					}
				}
			}

		}
///
		boolean tieneSeccionInclusion = false;
		// verificar que la seccion de plan de trabajo se habilite cuando hay
		// acciones de la reunion1 y no existan en la 2
		if (segundaReunion.getBullying() != null
				&& segundaReunion.getBullying().size() != 0) {

			for (ApecSeccionCstm seccionesSegR : segundaReunion
					.getSeccionesReunion()) {
				if (seccionesSegR.getcSeccionRegistro().intValue() == Constants.SECCION_INCLUSION_SEGUNDA_REUNION 
						.intValue()) {
					if (seccionesSegR.getcApec() != null
							&& seccionesSegR.getcApec().intValue() == segundaReunion
									.getApec().getcApec().intValue()) {
						tieneSeccionInclusion = true;
					}
					if (tieneSeccionInclusion == false) {
						seccionesSegR.setcApec(segundaReunion.getApec()
								.getcApec());
					}
				}
			}

		}
		
	
		//
	
		segundaReunion.setApoyos(apoyos);
				// obtener integrantes para la R2
		segundaReunion.setIntegrantesR2(buscarIntegrantesR2(segundaReunion));
		
		// obtener instructores para la R2
		segundaReunion
				.setInstructoresR2(buscarInstructoresR2(segundaReunion));


		return segundaReunion;

	}

	private void insertarSeccionesRegistradas(SegundaReunionVO sRVO,
			boolean existenApoyos, boolean existeInclusion, boolean existePlanTrabajo ,boolean existeContraloria) {

		// registrar la seccion para la reunion de que hay apoyos
		if (existenApoyos == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(sRVO.getApec().getcApec());
			seccion.setcReunion(sRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_APOYOS_SEGUNDA_REUNION);
			apecSeccionMapper.insert(seccion);

		}

		// registrar la seccion para la reunion de PLan de Trabajo
		if (existePlanTrabajo == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(sRVO.getApec().getcApec());
			seccion.setcReunion(sRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_PLAN_TRABAJO_SEGUNDA_REUNION);
			apecSeccionMapper.insert(seccion);

		}
		if(existeInclusion == true){
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(sRVO.getApec().getcApec());
			seccion.setcReunion(sRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_INCLUSION_SEGUNDA_REUNION);
			apecSeccionMapper.insert(seccion);
		}
		
		if (existeContraloria == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(sRVO.getApec().getcApec());
			seccion.setcReunion(sRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_CONTRALORIA_SEGUNDA_REUNION);
			apecSeccionMapper.insert(seccion);

		}
		

	}

	private List<ApecReunionIntegranteCstm> buscarIntegrantesR2(
			SegundaReunionVO segundaReunion) {
		List<ApecReunionIntegranteCstm> integrantesSeleccionadosR2 = new ArrayList<ApecReunionIntegranteCstm>();

		// obtiene los integrantes seleccionados en la r2 y los disponibles del
		// acta no seleccionados
		for (ApecReunionIntegranteCstm integranteActa : segundaReunion
				.getIntegrantes()) {

			boolean encontrado = false;
			for (ApecReunionIntegranteCstm integranteR2 : segundaReunion
					.getIntegrantesR2()) {

				if (integranteActa.getcIntegrante().intValue() == integranteR2
						.getcIntegrante().intValue()) {

					integrantesSeleccionadosR2.add(integranteR2);
					encontrado = true;
					break;
				}

			}

			if (encontrado == false) {
				integrantesSeleccionadosR2.add(integranteActa);
			}
		}

		return integrantesSeleccionadosR2;
	}
	
	
	private List<ApecReunionInstructorCtsm> buscarInstructoresR2(
			SegundaReunionVO segundaReunion) {
		List<ApecReunionInstructorCtsm> instructoresSeleccionadosR2 = new ArrayList<ApecReunionInstructorCtsm>();

		// obtiene los instructores seleccionados en la r2 y los disponibles del
		// acta y r1 no seleccionados, asi como los que fueron dados de alta en la R2
		for (ApecReunionInstructorCtsm instructorRelGral : segundaReunion
				.getInstructores()) {

			boolean encontrado = false;
			for (ApecReunionInstructorCtsm instructorR2 : segundaReunion
					.getInstructoresR2()) {

				if (instructorRelGral.getcInstructor().intValue() == instructorR2
						.getcInstructor().intValue()) {

					if (instructorRelGral.getcReunion().intValue() == instructorR2
							.getcReunion().intValue()) {
						instructorR2.setEditable(true);
					} else
						instructorR2.setEditable(false);

					instructorR2.setImprimir(true);
					instructoresSeleccionadosR2.add(instructorR2);
					encontrado = true;
					break;
				}

			}

			if (encontrado == false) {
				instructorRelGral.setEditable(false);
				instructorRelGral.setImprimir(false);
				instructoresSeleccionadosR2.add(instructorRelGral);
			}
		}

		return instructoresSeleccionadosR2;
	}


}
