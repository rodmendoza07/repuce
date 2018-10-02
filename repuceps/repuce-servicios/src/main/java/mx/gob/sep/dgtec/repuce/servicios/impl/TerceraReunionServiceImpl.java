package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 

import mx.gob.sep.dgtec.conafe.vo.TerceraReunionVO;
import mx.gob.sep.dgtec.repuce.dao.ActaConstitutivaMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecApoyoMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecBullyingMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecBullyingMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecDenunciasQuejasMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecDesercionMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecEncuestaSatisfaccionMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecNecesidadesEducativasMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecOpinionesComentariosMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecPlanTrabajoMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionIntegranteMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecSeccionMapper;
import mx.gob.sep.dgtec.repuce.dao.CCctInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.CRespuestaMapper;
import mx.gob.sep.dgtec.repuce.dao.TerceraReunionMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecInformeFinalMapper;  // vblake
import mx.gob.sep.dgtec.repuce.model.ApecApoyo;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecBullying;
import mx.gob.sep.dgtec.repuce.model.ApecBullyingCstm;
import mx.gob.sep.dgtec.repuce.model.ApecBullyingExample;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejas;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejasExample;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativas;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasCstm;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoExample;
import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDesercionCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDesercionExample;
import mx.gob.sep.dgtec.repuce.model.ApecEncuestaSatisfaccionCstm;
import mx.gob.sep.dgtec.repuce.model.ApecEncuestaSatisfaccionExample;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasExample;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentarios;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentariosExample;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajo;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoExample;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorExample;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteExample;
import mx.gob.sep.dgtec.repuce.model.ApecSeccion;
import mx.gob.sep.dgtec.repuce.model.ApecSeccionCstm;
import mx.gob.sep.dgtec.repuce.model.ApecSeccionExample;
import mx.gob.sep.dgtec.repuce.model.CCctInstructor;
import mx.gob.sep.dgtec.repuce.model.CCctInstructorExample;
import mx.gob.sep.dgtec.repuce.model.ApecInformeFinal;			// vblake
import mx.gob.sep.dgtec.repuce.model.ApecInformeFinalExample;	// vblake
import mx.gob.sep.dgtec.repuce.model.CePreguntas2;
import mx.gob.sep.dgtec.repuce.servicios.TerceraReunionService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;

@Service
public class TerceraReunionServiceImpl implements TerceraReunionService {

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
	private TerceraReunionMapper TerceraReunionMapper;
	@Autowired
	private ApecSeccionMapper apecSeccionMapper;
	@Autowired
	private ApecPlanTrabajoMapper apecPlanTrabajoMapper;
	@Autowired
	private ApecNecesidadesEducativasMapper ApecNecesidadesEducativasMapper;
	@Autowired
	private ApecDesercionMapper apecDesercionMapper;

	@Autowired
	private ApecEncuestaSatisfaccionMapper apecEncuestaSatisfaccionMapper;

	@Autowired
	private CRespuestaMapper cRespuestaMapper;
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
	private ApecBullyingMapperCstm ApecBullyingMapperCstm;
	@Autowired
	private ApecBullyingMapper ApecBullyingMapper;
	@Autowired
	private ApecOpinionesComentariosMapper apecOpinionesComentariosMapper;
	@Autowired
	private ApecDenunciasQuejasMapper apecDenunciasQuejasMapper;
	@Autowired
	private ApecInformeFinalMapper apecInformeFinalMapper;


	public int saveTerceraReunion(TerceraReunionVO terceraReunionVO) throws Exception{
		List<ApecNecesidadesEducativas> necesidadesBD = new ArrayList<ApecNecesidadesEducativas>();
		List<ApecBullying> bullyingBD = new ArrayList<ApecBullying>();
		List<ApecApoyo> apoyosRegistradoBD = new ArrayList<ApecApoyo>();
		boolean existenApoyos = false;
		boolean existePlanTrabajo = false;
		boolean existeInclusion = false;
		boolean existeDiagDesercion = false;
		boolean existeEncuestaSatisfaccion = false;
		boolean ExisteNecesidades = false;
		boolean existeContraloria=false;
		boolean existeInformeFinal=false;
		int numRecords = -1;

		try {

			// verificar si es una modificacion
			
			if (terceraReunionVO.getReunion() != null
					&& terceraReunionVO.getReunion().getcApec() != null) {
				borrarElementosTerceraReunion(terceraReunionVO, false);
				terceraReunionVO.getReunion().setcApec(
						terceraReunionVO.getApec().getcApec());
				terceraReunionVO.getReunion().setcReunion(
						Constants.TERCERA_REUNION);
				terceraReunionVO.getReunion().setFchRegistro(new Date());
				numRecords = apecReunionMapper
						.updateByPrimaryKey(terceraReunionVO.getReunion());
				System.out.println("ok" + numRecords);
			}

			else {
				terceraReunionVO.getReunion().setcApec(
						terceraReunionVO.getApec().getcApec());
				terceraReunionVO.getReunion().setcReunion(
						Constants.TERCERA_REUNION);
				terceraReunionVO.getReunion().setFchRegistro(new Date());
				numRecords = apecReunionMapper.insert(terceraReunionVO
						.getReunion());
			}

			if (terceraReunionVO.getApoyosConafe() != null
					&& terceraReunionVO.getApoyosConafe().isEmpty() == false) {

				boolean hayApoyoConafe = false;
				hayApoyoConafe = insertUpdateApoyos(
						terceraReunionVO.getApoyosConafe(), terceraReunionVO
								.getReunion().getcApec());
				if (hayApoyoConafe)
					existenApoyos = true;

			}

			if (terceraReunionVO.getApoyosFederales() != null
					&& terceraReunionVO.getApoyosFederales().isEmpty() == false) {
				for (ApecApoyoCstm apoyoFederal : terceraReunionVO
						.getApoyosFederales()) {
					apoyoFederal.setcApec(terceraReunionVO.getReunion()
							.getcApec());
					apoyoFederal.setcReunion(Constants.TERCERA_REUNION);
					for (ApecApoyo apoyoBD : apoyosRegistradoBD) {
						if (apoyoFederal.getcApoyo().intValue() == apoyoBD.getcApoyo().intValue()) {
							apoyoFederal.setcApoyo(apoyoBD.getcApoyo());
							apoyoFederal.setOtro(apoyoBD.getOtro());
							apoyoFederal.setCantidad(apoyoBD.getCantidad());
							apoyoFederal.setDescripApoyo(apoyoBD.getDescripApoyo());
							apoyoFederal.setNumBenef(apoyoBD.getNumBenef());
							break;
						}
					}
					apecApoyoMapper.insert(apoyoFederal);
					existenApoyos = true;
				}
			}
			
			
			
			
			
	/*	Vblake Codigo Original
	 * 
	   		if (terceraReunionVO.getApoyosFederales() != null
					&& terceraReunionVO.getApoyosFederales().isEmpty() == false) {
				boolean hayApoyoFederal = false;
				hayApoyoFederal = insertUpdateApoyos(
						terceraReunionVO.getApoyosFederales(), terceraReunionVO
								.getReunion().getcApec());
				if (hayApoyoFederal)
					existenApoyos = true;

			}
	*/		
			if (terceraReunionVO.getApoyosEstatales() != null
					&& terceraReunionVO.getApoyosEstatales().isEmpty() == false) {
				boolean hayApoyoEstatal = false;
				hayApoyoEstatal = insertUpdateApoyos(
						terceraReunionVO.getApoyosEstatales(), terceraReunionVO
								.getReunion().getcApec());
				if (hayApoyoEstatal)
					existenApoyos = true;
			}

			
			//Bullying
			if (terceraReunionVO.getBullying() != null
					&& terceraReunionVO.getBullying().isEmpty() == false) {
				for (ApecBullyingCstm bullying : terceraReunionVO
						.getBullying()) {
					bullying.setcApec(terceraReunionVO.getReunion()
							.getcApec());
					bullying.setcReunion(Constants.TERCERA_REUNION);
					for (ApecBullying acosoBD : bullyingBD) {
						if (bullying.getcCoBullying().intValue() == acosoBD.getcCoBullying().intValue()) {
							bullying.setcCoTipoBullying(acosoBD.getcCoTipoBullying());
							bullying.setSeconcreto(acosoBD.getSeconcreto());
							bullying.setNumvecesr1(acosoBD.getNumvecesr1());
							bullying.setCuantos(acosoBD.getCuantos());
							break;
						}
					}
					ApecBullyingMapper.insert(bullying);
					existeInclusion = true;
				}
			}
	

			// plan de trabajo
			if (terceraReunionVO.getPlanTrabajo() != null
					&& terceraReunionVO.getPlanTrabajo().isEmpty() == false) {
				for (ApecPlanTrabajoCstm acciones : terceraReunionVO
						.getPlanTrabajo()) {
					acciones.setcApec(terceraReunionVO.getReunion().getcApec());
					if (acciones.getcReunion() != null
							&& acciones.getcReunion().intValue() != Constants.TERCERA_REUNION) {
						// Solo actualiza la respuesta de la reunion 3 y el
						// campo numero de veces 3
						if (acciones.getcRespuestar3() != null) {
							apecPlanTrabajoMapper
									.updateByPrimaryKeySelective(acciones);
						}

					} else {
						acciones.setcReunion(Constants.TERCERA_REUNION);
						apecPlanTrabajoMapper.insert(acciones);
					}

					existePlanTrabajo = true;
				}
			}
			//necesidades Educativas
			if (terceraReunionVO.getNecesidadesEspeciales() != null
					&& terceraReunionVO.getNecesidadesEspeciales().isEmpty() == false) {
				for (ApecNecesidadesEducativasCstm necesidadesEspeciales : terceraReunionVO
						.getNecesidadesEspeciales()) {
					necesidadesEspeciales.setcApec(terceraReunionVO.getReunion()
							.getcApec());
					necesidadesEspeciales.setcReunion(Constants.TERCERA_REUNION);
					for (ApecNecesidadesEducativas neceBD : necesidadesBD) {
						if (necesidadesEspeciales.getcApoyo().intValue() == neceBD
								.getcApoyo().intValue()) {
							necesidadesEspeciales.setcNee(neceBD.getcNee());
							necesidadesEspeciales.setGestionar(neceBD.getGestionar());
							necesidadesEspeciales.setConcreto(neceBD.getConcreto());
							necesidadesEspeciales.setConsiste(neceBD.getConsiste());
							necesidadesEspeciales.setCuantos(neceBD.getCuantos());
							necesidadesEspeciales.setcNee1(neceBD.getcNee1());
							necesidadesEspeciales.setGestionar1(neceBD.getGestionar1());
							necesidadesEspeciales.setConcreto1(neceBD.getConcreto1());
							necesidadesEspeciales.setConsiste1(neceBD.getConsiste1());
							necesidadesEspeciales.setCuantos1(neceBD.getCuantos1());
							
							break;
						}
					}
					ApecNecesidadesEducativasMapper.insert(necesidadesEspeciales);
					existeInclusion = true;
				}
			}
	
			// desercion
			if (terceraReunionVO.getDiagnosticoCierre() != null
					&& terceraReunionVO.getDiagnosticoCierre().isEmpty() == false) {
				for (ApecDesercionCstm desercion : terceraReunionVO
						.getDiagnosticoCierre()) {
					desercion
							.setcApec(terceraReunionVO.getReunion().getcApec());
					desercion.setcReunion(Constants.TERCERA_REUNION);
					apecDesercionMapper.insert(desercion);
					existeDiagDesercion = true;
				}
			}

			// encuesta de satisfaccion
			if (terceraReunionVO.getEncuestaSatisfaccion() != null
					&& terceraReunionVO.getEncuestaSatisfaccion().isEmpty() == false) {
				for (ApecEncuestaSatisfaccionCstm encuesta : terceraReunionVO
						.getEncuestaSatisfaccion()) {
					encuesta.setcApec(terceraReunionVO.getReunion().getcApec());
					encuesta.setcReunion(Constants.TERCERA_REUNION);
					apecEncuestaSatisfaccionMapper.insert(encuesta);
					existeEncuestaSatisfaccion = true;
				}
			}

			// insertar los integrantes seleccionados
			for (ApecReunionIntegranteCstm intSeleccionado : terceraReunionVO
					.getIntegrantesR3()) {
				intSeleccionado.setcReunion(Constants.TERCERA_REUNION);
				intSeleccionado.setcApec(terceraReunionVO.getReunion()
						.getcApec());
				intSeleccionado.setcApecIntegrante(terceraReunionVO
						.getReunion().getcApec());
				apecReunionIntegranteMapper.insert(intSeleccionado);

			}
			
			
			// opiniones
			if (terceraReunionVO.getOpiniones() != null
					&& terceraReunionVO.getOpiniones().isEmpty() == false) {
				for (ApecOpinionesComentarios opiniones : terceraReunionVO
						.getOpiniones()) {
					opiniones.setcApec(terceraReunionVO.getReunion()
							.getcApec());
					opiniones.setcReunion(Constants.TERCERA_REUNION);
					opiniones.setcOpiniones(opiniones.getcOpiniones());
					opiniones.setOpiniones(opiniones.getOpiniones());
					apecOpinionesComentariosMapper.insert(opiniones);
					existeContraloria = true;
				}
			}
			
			// denuncias
			if (terceraReunionVO.getDenuncias() != null
					&& terceraReunionVO.getDenuncias().isEmpty() == false) {
				for (ApecDenunciasQuejas denuncias : terceraReunionVO
						.getDenuncias()) {
					denuncias.setcApec(terceraReunionVO.getReunion()
							.getcApec());
					denuncias.setcReunion(Constants.TERCERA_REUNION);
					denuncias.setcDenuncias(denuncias.getcDenuncias());
					denuncias.setDenuncias(denuncias.getDenuncias());
					apecDenunciasQuejasMapper.insert(denuncias);
					existeContraloria = true;
				}
			}
			
			// Informe Final
			
			
			ApecInformeFinal informefinal = terceraReunionVO.getInformeFinal();
			informefinal.setcApec(terceraReunionVO.getReunion().getcApec());
			informefinal.setcReunion(Constants.TERCERA_REUNION);
			apecInformeFinalMapper.insert(informefinal);
			existeInformeFinal = true;
						
			
			
			
			

			// insertar los instructores registrados en la r3 y las relaciones
			// de todos los instructores registrados y seleccionados

			if (terceraReunionVO.getInstructoresR3() != null
					&& terceraReunionVO.getInstructoresR3().isEmpty() == false) {
				for (ApecReunionInstructorCtsm instructorR3 : terceraReunionVO
						.getInstructoresR3()) {

					// Instructor registrado en la reunion 3
					if (instructorR3.isEditable() == true) {

						instructorR3.getInstructor().setcApec(
								terceraReunionVO.getApec().getcApec());
						apecInstructorMapper.insert(instructorR3
								.getInstructor());

						// ccts por instructor registrado
						for (CCctLight cct : instructorR3.getInstructor()
								.getCcts()) {
							CCctInstructor cctInstructor = new CCctInstructor();
							cctInstructor.setcApec(terceraReunionVO.getApec()
									.getcApec());
							cctInstructor.setcInstructor(instructorR3
									.getInstructor().getcInstructor());
							cctInstructor.setcCct(cct.getcCct());

							cctInstructorMapper.insertSelective(cctInstructor);
						}

					}
					// Registra las relaciones
					instructorR3.setcApecInstructor(terceraReunionVO.getApec()
							.getcApec());
					instructorR3.setcReunion(Constants.TERCERA_REUNION);
					instructorR3
							.setcApec(terceraReunionVO.getApec().getcApec());
					apecReunionInstructorMapper.insert(instructorR3);

				}

			}

			insertarSeccionesRegistradas(terceraReunionVO, existenApoyos, existeInclusion,
					existePlanTrabajo, existeDiagDesercion, ExisteNecesidades,
					existeEncuestaSatisfaccion, existeContraloria, existeInformeFinal);

			System.out.println("guardo la reunion");

		} catch (Exception e) {
			try {
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(terceraReunionVO));
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura(e,
					"servicios.tercera.reunion.error.editar", new Object[] {});

		}

		return numRecords;

	}
	
	private boolean insertUpdateNecesidaades(List<ApecNecesidadesEducativasCstm> ListNecesidades,
			Integer apec) {
		boolean hayNecesidades = false;

		for (ApecNecesidadesEducativasCstm nec : ListNecesidades) {
			nec.setcApec(apec);
			if (nec.getcReunion() != null
					&& nec.getcReunion().intValue() == Constants.SEGUNDA_REUNION) {
				// Solo actualiza la respuesta de la reunion 3 y el
				// campo numero de veces 3
				if (nec.getcNee() != null
						|| nec.getcNee1() != null) {
					ApecNecesidadesEducativasMapper.updateByPrimaryKeySelective(nec);
				}

			} else {
				nec.setcReunion(Constants.TERCERA_REUNION);
				ApecNecesidadesEducativasMapper.insert(nec);
			}

			hayNecesidades = true;
		}

		return hayNecesidades;

	}

	private boolean insertUpdateApoyos(List<ApecApoyoCstm> Listapoyos,
			Integer apec) {
		boolean hayApoyos = false;

		for (ApecApoyoCstm apoyo : Listapoyos) {
			apoyo.setcApec(apec);
			if (apoyo.getcReunion() != null
					&& apoyo.getcReunion().intValue() == Constants.SEGUNDA_REUNION) {
				// Solo actualiza la respuesta de la reunion 3 y el
				// campo numero de veces 3
				if (apoyo.getBeneficiariosr3() != null
						|| apoyo.getMontor3() != null) {
					apecApoyoMapper.updateByPrimaryKeySelective(apoyo);
				}

			} else {
				apoyo.setcReunion(Constants.TERCERA_REUNION);
				apecApoyoMapper.insert(apoyo);
			}

			hayApoyos = true;
		}

		return hayApoyos;

	}

	public int deleteTerceraReunion(Integer apec) throws Exception{

		int numRecords = -1;
		try {

			TerceraReunionVO treunion = new TerceraReunionVO();
			ApecCstm apecObj = new ApecCstm();
			apecObj.setcApec(apec);
			treunion.setApec(apecObj);
			borrarElementosTerceraReunion(treunion, true);
			numRecords = apecReunionMapper.deleteByPrimaryKey(apec,
					Constants.TERCERA_REUNION);

		} catch (Exception e) {
			throw new ErrorInfraestructura(e,
					"servicios.tercera.reunion.error.eliminar", new Object[] {});
		}
		return numRecords;

	}

	private void borrarElementosTerceraReunion(
			TerceraReunionVO terceraReunionVO, boolean limpiarRespuestaR3) {

		// Eliminar los apoyos de la tercera reunion
		ApecApoyoExample criterioApoyos = new ApecApoyoExample();
		criterioApoyos.createCriteria()
				.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.TERCERA_REUNION);
		apecApoyoMapper.deleteByExample(criterioApoyos);

		// Eliminar el plan de trabajo
		ApecPlanTrabajoExample criterioPT = new ApecPlanTrabajoExample();
		criterioPT.createCriteria()
				.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.TERCERA_REUNION);
		apecPlanTrabajoMapper.deleteByExample(criterioPT);

		// borrar todas las secciones registradas
		ApecSeccionExample criterios = new ApecSeccionExample();
		criterios.createCriteria()
				.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.TERCERA_REUNION);
		apecSeccionMapper.deleteByExample(criterios);

		// borrar todos los registro de desercion
		ApecDesercionExample criteriosDesc = new ApecDesercionExample();
		criteriosDesc.createCriteria()
				.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.TERCERA_REUNION);
		apecDesercionMapper.deleteByExample(criteriosDesc);

		// borrar todos los registro de la encuesta
		ApecEncuestaSatisfaccionExample criteriosEncuesta = new ApecEncuestaSatisfaccionExample();
		criteriosEncuesta.createCriteria()
				.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.TERCERA_REUNION);
		apecEncuestaSatisfaccionMapper.deleteByExample(criteriosEncuesta);
		
		
		//Eliminar Bullying
		ApecBullyingExample criterioBullying = new ApecBullyingExample();

		criterioBullying.createCriteria()
				.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.TERCERA_REUNION);
		ApecBullyingMapper.deleteByExample(criterioBullying);
		
		//Eliminar necesidades educativas
		ApecNecesidadesEducativasExample criterioneceEsp = new ApecNecesidadesEducativasExample();

		criterioneceEsp.createCriteria()
		.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.TERCERA_REUNION);
		ApecNecesidadesEducativasMapper.deleteByExample(criterioneceEsp);
		
		//Eliminar Opiniones Comentarios
		ApecOpinionesComentariosExample criteriosOpiniones= new ApecOpinionesComentariosExample();
        criteriosOpiniones.createCriteria()
		.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.TERCERA_REUNION);
        apecOpinionesComentariosMapper.deleteByExample(criteriosOpiniones);
        System.out.println("Elimino Opiniones Comentarios");
        
      //Eliminar Denuncias y Quejas
        ApecDenunciasQuejasExample criteriosDenuncias= new ApecDenunciasQuejasExample();
        criteriosDenuncias.createCriteria()
		.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.TERCERA_REUNION);
        apecDenunciasQuejasMapper.deleteByExample(criteriosDenuncias);
        System.out.println("Elimino Denuncias y Quejas");
        
       //Eliminar Informe Final
        
        ApecInformeFinalExample criteriosInformeFinal= new ApecInformeFinalExample();
        criteriosInformeFinal.createCriteria()
		.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.TERCERA_REUNION);
        apecInformeFinalMapper.deleteByExample(criteriosInformeFinal);
		
		
		// Eliminar los integrantes seleccionados para la reunion
		ApecReunionIntegranteExample criterioIntegrantes = new ApecReunionIntegranteExample();
		criterioIntegrantes.createCriteria()
				.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.TERCERA_REUNION);
		apecReunionIntegranteMapper.deleteByExample(criterioIntegrantes);

		// eliminar los instructores registrados y su relaccion con cct en la
		// reunion 1
		List<ApecReunionInstructorCtsm> relInstRegistrados = new ArrayList<ApecReunionInstructorCtsm>();
		
		relInstRegistrados = apecReunionInstructorMapperCstm
				.selectInstructoresRegistradosXReunion(terceraReunionVO
						.getApec().getcApec(), Constants.TERCERA_REUNION);

		System.out.println(".." + relInstRegistrados.size());

		for (ApecReunionInstructorCtsm instrRegistado : relInstRegistrados) {

			CCctInstructorExample cCctInstructorExample = new CCctInstructorExample();
			cCctInstructorExample.createCriteria()
					.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
					.andCInstructorEqualTo(instrRegistado.getcInstructor());

			cctInstructorMapper.deleteByExample(cCctInstructorExample);

			apecInstructorMapper.deleteByPrimaryKey(terceraReunionVO.getApec()
					.getcApec(), instrRegistado.getcInstructor());

		}

		// Eliminar las relaciones de instructores seleccionados
		ApecReunionInstructorExample criterioInstructor = new ApecReunionInstructorExample();
		criterioInstructor.createCriteria()
				.andCApecEqualTo(terceraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.TERCERA_REUNION);
		apecReunionInstructorMapper.deleteByExample(criterioInstructor);

		if (limpiarRespuestaR3) {
			// borrar las respuestas de economico y cantidad registrados en la
			// reunion 3 en los apoyos de la reunion 2
			List<ApecApoyo> apoyosSegundaReunion = new ArrayList<ApecApoyo>();
			ApecApoyoExample criterioApoyosR2 = new ApecApoyoExample();
			criterioApoyosR2.createCriteria()
					.andCReunionEqualTo(Constants.SEGUNDA_REUNION)
					.andCApecEqualTo(terceraReunionVO.getApec().getcApec());

			apoyosSegundaReunion = apecApoyoMapper
					.selectByExample(criterioApoyosR2);

			if (apoyosSegundaReunion != null
					&& apoyosSegundaReunion.isEmpty() == false) {
				for (ApecApoyo apoyo : apoyosSegundaReunion) {
					apoyo.setMontor3(null);
					apoyo.setBeneficiariosr3(null);
					apecApoyoMapper.updateByPrimaryKey(apoyo);
				}
			}

			// borrar las respuesta que se hayan dado a las actividades del plan
			// de
			// trabajo de la reunion 1 y 2
			List<ApecPlanTrabajo> planTrabajoR12 = new ArrayList<ApecPlanTrabajo>();
			ApecPlanTrabajoExample criterioPTR2 = new ApecPlanTrabajoExample();
			criterioPTR2.createCriteria()
					.andCReunionNotEqualTo(Constants.TERCERA_REUNION)
					.andCApecEqualTo(terceraReunionVO.getApec().getcApec());

			planTrabajoR12 = apecPlanTrabajoMapper
					.selectByExample(criterioPTR2);

			if (planTrabajoR12 != null && planTrabajoR12.isEmpty() == false) {
				for (ApecPlanTrabajo accion : planTrabajoR12) {
					accion.setcRespuestar3(null);
					accion.setNumVecesr3(null);
					apecPlanTrabajoMapper.updateByPrimaryKey(accion);
				}
			}
			
		      
		}

	}

	public TerceraReunionVO selectTerceraReunion(Integer apec) {

		TerceraReunionVO terceraReunionVO = null;
		terceraReunionVO = TerceraReunionMapper.selectTerceraReunion(apec);
		
		// Para la minuta se colocan todos los apoyos en una sola lista
		List<ApecApoyoCstm> apoyos = new ArrayList<ApecApoyoCstm>();
		boolean existenApoyos = false;
		boolean existeInclusion = false;

		for (ApecApoyoCstm conafe : terceraReunionVO.getApoyosConafe()) {
			apoyos.add(conafe);
			existenApoyos = true;
		}

		for (ApecApoyoCstm federal : terceraReunionVO.getApoyosFederales()) {
			apoyos.add(federal);
			existenApoyos = true;

		}
		for (ApecApoyoCstm estatal : terceraReunionVO.getApoyosEstatales()) {
			apoyos.add(estatal);
			existenApoyos = true;
		}

		List<ApecNecesidadesEducativasCstm> necesidades = new ArrayList<ApecNecesidadesEducativasCstm>();
		for (ApecNecesidadesEducativasCstm necEsp : terceraReunionVO.getNecesidadesEspeciales()) {
			necesidades.add(necEsp);
			// existenApoyos = true;
			existeInclusion = true;
			
			
		}
		
		List<ApecBullyingCstm> bullying = new ArrayList<ApecBullyingCstm>();
		for (ApecBullyingCstm acoso : terceraReunionVO.getBullying()) {
			bullying.add(acoso);
			existeInclusion = true;
		}
		boolean tieneSeccionPlan = false;
		if (terceraReunionVO.getPlanTrabajo() != null
				&& terceraReunionVO.getPlanTrabajo().size() != 0) {
			tieneSeccionPlan = true;
		}

		for (ApecSeccionCstm seccionesSegR : terceraReunionVO
				.getSeccionesReunion()) {
			if (seccionesSegR.getcSeccionRegistro().intValue() == Constants.SECCION_PLAN_TRABAJO_TERCER_REUNION
					.intValue()) {
				if (tieneSeccionPlan == true) {
					seccionesSegR.setcApec(terceraReunionVO.getApec()
							.getcApec());
				}
			}

			if (seccionesSegR.getcSeccionRegistro().intValue() == Constants.SECCION_APOYOS_TERCER_REUNION
					.intValue()) {
				if (existenApoyos == true) {
					seccionesSegR.setcApec(terceraReunionVO.getApec()
							.getcApec());
				}
			}
		}

		terceraReunionVO.setApoyos(apoyos);

		// obtener integrantes para la R3
		terceraReunionVO
				.setIntegrantesR3(buscarIntegrantesR3(terceraReunionVO));

		// obtener instructores para la R3
		terceraReunionVO
				.setInstructoresR3(buscarInstructoresR3(terceraReunionVO));

		return terceraReunionVO;

	}

	private void insertarSeccionesRegistradas(TerceraReunionVO tRVO,
			boolean existenApoyos, boolean existeInclusion,boolean existePlanTrabajo,
			boolean existeDesecion, boolean ExisteNecesidades, boolean existeEncuesta, boolean existeContraloria, boolean existeInformeFinal) {

		// registrar la seccion para la reunion de que hay apoyos
		if (existenApoyos == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(tRVO.getApec().getcApec());
			seccion.setcReunion(tRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_APOYOS_TERCER_REUNION);
			apecSeccionMapper.insert(seccion);

		}

		if (existeInclusion == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(tRVO.getApec().getcApec());
			seccion.setcReunion(tRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_INCLUSION_TERCERA_REUNION);
			apecSeccionMapper.insert(seccion);

		}
		
		
		
		
		
		// registrar la seccion para la reunion de PLan de Trabajo
		if (existePlanTrabajo == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(tRVO.getApec().getcApec());
			seccion.setcReunion(tRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_PLAN_TRABAJO_TERCER_REUNION);
			apecSeccionMapper.insert(seccion);

		}

		// registrar la seccion para la reunion de desercion
		if (existeDesecion == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(tRVO.getApec().getcApec());
			seccion.setcReunion(tRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_DESERCION_TERCER_REUNION);
			apecSeccionMapper.insert(seccion);

		}

		// registrar la seccion para la reunion la encuesta de satisfaccion
		if (existeEncuesta == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(tRVO.getApec().getcApec());
			seccion.setcReunion(tRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_ENCUESTA_SATISFACIION_TERCER_REUNION);
			apecSeccionMapper.insert(seccion);

		}
		
		if (existeContraloria == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(tRVO.getApec().getcApec());
			seccion.setcReunion(tRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_CONTRALORIA_TERCERA_REUNION);
			apecSeccionMapper.insert(seccion);

		}

		if (existeInformeFinal == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(tRVO.getApec().getcApec());
			seccion.setcReunion(tRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_INFORME_FINAL_TERCERA_REUNION);
			apecSeccionMapper.insert(seccion);

		}
		
	}

	private List<ApecReunionIntegranteCstm> buscarIntegrantesR3(
			TerceraReunionVO terceraReunion) {
		List<ApecReunionIntegranteCstm> integrantesSeleccionadosR3 = new ArrayList<ApecReunionIntegranteCstm>();

		// obtiene los integrantes seleccionados en la r3 y los disponibles del
		// acta no seleccionados
		for (ApecReunionIntegranteCstm integranteActa : terceraReunion
				.getIntegrantes()) {

			boolean encontrado = false;
			for (ApecReunionIntegranteCstm integranteR3 : terceraReunion
					.getIntegrantesR3()) {

				if (integranteActa.getcIntegrante().intValue() == integranteR3
						.getcIntegrante().intValue()) {

					integrantesSeleccionadosR3.add(integranteR3);
					encontrado = true;
					break;
				}

			}

			if (encontrado == false) {
				integrantesSeleccionadosR3.add(integranteActa);
			}
		}

		return integrantesSeleccionadosR3;
	}

	private List<ApecReunionInstructorCtsm> buscarInstructoresR3(
			TerceraReunionVO terceraReunion) {
		List<ApecReunionInstructorCtsm> instructoresSeleccionadosR3 = new ArrayList<ApecReunionInstructorCtsm>();

		// obtiene los instructores seleccionados en la r3 y los disponibles del
		// acta, r1 y r2 no seleccionados, asi como los que fueron dados de alta
		// en la R3
		for (ApecReunionInstructorCtsm instructorRelGral : terceraReunion
				.getInstructores()) {

			boolean encontrado = false;
			for (ApecReunionInstructorCtsm instructorR3 : terceraReunion
					.getInstructoresR3()) {

				if (instructorRelGral.getcInstructor().intValue() == instructorR3
						.getcInstructor().intValue()) {

					if (instructorRelGral.getcReunion().intValue() == instructorR3
							.getcReunion().intValue()) {
						instructorR3.setEditable(true);
					} else
						instructorR3.setEditable(false);

					instructorR3.setImprimir(true);
					instructoresSeleccionadosR3.add(instructorR3);
					encontrado = true;
					break;
				}

			}

			if (encontrado == false) {
				instructorRelGral.setEditable(false);
				instructorRelGral.setImprimir(false);
				instructoresSeleccionadosR3.add(instructorRelGral);
			}
		}

		return instructoresSeleccionadosR3;
	}

}
