package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import mx.gob.sep.dgtec.conafe.vo.PrimeraReunionVO;
import mx.gob.sep.dgtec.repuce.dao.ActaConstitutivaMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecApoyoMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecBullyingMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecInformeFinalMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecOpinionesComentariosMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecDenunciasQuejasMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecNecesidadesEducativasMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecDiagnosticoComMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecInstructorMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecIntegranteMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecPlanTrabajoMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecPlanTrabajoMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecPoblacionIndigenaMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionIntegranteMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecReunionMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecSeccionMapper;
import mx.gob.sep.dgtec.repuce.dao.CAccionMapper;
import mx.gob.sep.dgtec.repuce.dao.CApoyoMapper;
import mx.gob.sep.dgtec.repuce.dao.CCctInstructorMapper;
import mx.gob.sep.dgtec.repuce.dao.CDiagnosticoComMapper;
import mx.gob.sep.dgtec.repuce.dao.PrimeraReunionMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecNumeroAlumnosMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecPrincipalesDificultadesMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecPrincipalesNecesidadesMapper;
import mx.gob.sep.dgtec.repuce.dao.ApecActividadesUnoMapper;	// vblake
import mx.gob.sep.dgtec.repuce.dao.ApecActividadesTresMapper;	// vblake
import mx.gob.sep.dgtec.repuce.dao.ApecActividadesCuatroMapper;	// vblake

import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoExample;
import mx.gob.sep.dgtec.repuce.model.ApecBullying;
import mx.gob.sep.dgtec.repuce.model.ApecBullyingExample;
import mx.gob.sep.dgtec.repuce.model.ApecBullyingCstm;
import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejasExample;
import mx.gob.sep.dgtec.repuce.model.ApecInformeFinal;
import mx.gob.sep.dgtec.repuce.model.ApecInformeFinalExample;
import mx.gob.sep.dgtec.repuce.model.ApecNumeroAlumnosExample;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentarios;
import mx.gob.sep.dgtec.repuce.model.ApecDenunciasQuejas;
import mx.gob.sep.dgtec.repuce.model.ApecDiagnosticoComCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDiagnosticoComExample;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativas;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasExample;
import mx.gob.sep.dgtec.repuce.model.ApecNumeroAlumnos;
import mx.gob.sep.dgtec.repuce.model.ApecNecesidadesEducativasCstm;
import mx.gob.sep.dgtec.repuce.model.ApecOpinionesComentariosExample;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajo;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoExample;
import mx.gob.sep.dgtec.repuce.model.ApecPoblacionIndigenaCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPoblacionIndigenaExample;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructor;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorExample;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteExample;
import mx.gob.sep.dgtec.repuce.model.ApecSeccion;
import mx.gob.sep.dgtec.repuce.model.ApecSeccionExample;
import mx.gob.sep.dgtec.repuce.model.CAccion;
import mx.gob.sep.dgtec.repuce.model.CAccionExample;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.model.CApoyoExample;
import mx.gob.sep.dgtec.repuce.model.CCctInstructor;
import mx.gob.sep.dgtec.repuce.model.CCctInstructorExample;
import mx.gob.sep.dgtec.repuce.model.CDiagnosticoCom;
import mx.gob.sep.dgtec.repuce.model.CDiagnosticoComExample;
import mx.gob.sep.dgtec.repuce.model.ApecPrincipalesDificultades;
import mx.gob.sep.dgtec.repuce.model.ApecPrincipalesDificultadesExample;
import mx.gob.sep.dgtec.repuce.model.ApecPrincipalesNecesidades;
import mx.gob.sep.dgtec.repuce.model.ApecPrincipalesNecesidadesExample;
import mx.gob.sep.dgtec.repuce.model.ApecActividadesUno;			// vblake
import mx.gob.sep.dgtec.repuce.model.ApecActividadesUnoExample;	// vblake
import mx.gob.sep.dgtec.repuce.model.ApecActividadesTres;			// vblake
import mx.gob.sep.dgtec.repuce.model.ApecActividadesTresExample;	// vblake
import mx.gob.sep.dgtec.repuce.model.ApecActividadesCuatro;			// vblake
import mx.gob.sep.dgtec.repuce.model.ApecActividadesCuatroExample;	// vblake


import mx.gob.sep.dgtec.repuce.servicios.PrimeraReunionService;
import mx.gob.sep.dgtec.repuce.servicios.SegundaReunionService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorNegocio;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;

@Service
public class PrimeraReunionServiceImpl implements PrimeraReunionService {
	private static final Logger log = LoggerFactory
			.getLogger(PrimeraReunionServiceImpl.class);
	@Autowired
	private ActaConstitutivaMapper actaConstitutivaMapper;
	@Autowired
	private ApecMapper apecMapper;
	@Autowired
	private ApecReunionMapper apecReunionMapper;
	@Autowired
	private ApecInstructorMapper apecInstructorMapper;
	@Autowired
	private ApecIntegranteMapper apecIntegranteMapper;
	@Autowired
	private CCctInstructorMapper cctInstructorMapper;
	@Autowired
	private ApecApoyoMapper apecApoyoMapper;
	@Autowired
	private ApecBullyingMapper apecBullyingMapper;
	@Autowired
	private ApecNecesidadesEducativasMapper ApecNecesidadesEducativasMapper;
	@Autowired
	private ApecDiagnosticoComMapper apecDiagnosticoComMapper;
	@Autowired
	private PrimeraReunionMapper primeraReunionMapper;
	@Autowired
	private CApoyoMapper cApoyoMapper;
	@Autowired
	private CDiagnosticoComMapper cDiagnosticoComMapper;

	@Autowired
	private CAccionMapper cAccionMapper;
	@Autowired
	private ApecSeccionMapper apecSeccionMapper;
	@Autowired
	private ApecPoblacionIndigenaMapper apecPoblacionIndigenaMapper;
	@Autowired
	private ApecPlanTrabajoMapper apecPlanTrabajoMapper;
	@Autowired
	private SegundaReunionService segundaReunionService;
	@Autowired
	private ApecReunionIntegranteMapper apecReunionIntegranteMapper;
	@Autowired
	private ApecReunionInstructorMapper apecReunionInstructorMapper;

	@Autowired
	private ApecInstructorMapperCstm apecInstructorMapperCstm;
	@Autowired
	private ApecReunionInstructorMapperCstm apecReunionInstructorMapperCstm;
	
	@Autowired
	private ApecOpinionesComentariosMapper apecOpinionesComentariosMapper;
	
	@Autowired
	private ApecDenunciasQuejasMapper apecDenunciasQuejasMapper;
	
	@Autowired
	private ApecNumeroAlumnosMapper apecNumeroAlumnosMapper;
	
	@Autowired
	private ApecPlanTrabajoMapperCstm apecPlanTrabajoMapperCstm;
	
	@Autowired
	private ApecPrincipalesDificultadesMapper apecPrincipalesDificultadesMapper;
	
	@Autowired
	private ApecPrincipalesNecesidadesMapper apecPrincipalesNecesidadesMapper;
	
	@Autowired
	private ApecActividadesUnoMapper apecActividadesUnoMapper;
	
	@Autowired
	private ApecActividadesTresMapper apecActividadesTresMapper;
	
	@Autowired
	private ApecActividadesCuatroMapper apecActividadesCuatroMapper;

	public int savePrimeraReunion(PrimeraReunionVO primeraReunionVO) throws Exception {

		boolean existenApoyos = false;
		boolean existeInclusionSocial = false;
		boolean existeDiagnosticoComunitario = false;
		boolean existenNecEsp = false;
		boolean existePlanTrabajo = false;
		boolean existeContraloria=false;
		boolean existePrincipalesDN=false;		//vblake 
		boolean existeNumeroAlumnos=false;
		boolean existeActividadesUno=false;		//vblake
		boolean existeActividadesTres=false;	//vblake 
		boolean existeActividadesCuatro=false;	//vblake 
		
		List<ApecPlanTrabajo> planTrabajoBD = new ArrayList<ApecPlanTrabajo>();
		int numRecords = -1;
		List<ApecReunionInstructor> relacionesExistentesInst = new ArrayList<ApecReunionInstructor>();
		try {

			// verificar si es una modificacion

			if (primeraReunionVO.getReunion() != null
					&& primeraReunionVO.getReunion().getcApec() != null) {

				// Recuperar las relaciones existentes de los instructores con
				// las reuniones siguientes

				ApecReunionInstructorExample realcionesInstExample = new ApecReunionInstructorExample();
				realcionesInstExample.createCriteria()
						.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
						.andCReunionGreaterThan(Constants.PRIMERA_REUNION);
				relacionesExistentesInst = apecReunionInstructorMapper
						.selectByExample(realcionesInstExample);
				
//revisar si hay acciones del plan de trabajo repetidos en reuniones posterior
				
				if(primeraReunionVO.getPlanTrabajo()!=null && primeraReunionVO.getPlanTrabajo().isEmpty()==false){
					List<ApecPlanTrabajoCstm> accionesReunionesPosteriores= new ArrayList<ApecPlanTrabajoCstm>();
					
					accionesReunionesPosteriores=apecPlanTrabajoMapperCstm.selectAccionesRegistradasPosterior(primeraReunionVO.getApec().getcApec(), Constants.PRIMERA_REUNION);
					
					if(accionesReunionesPosteriores!=null && accionesReunionesPosteriores.size()!=0){
						
						
						for (ApecPlanTrabajoCstm accionNueva : primeraReunionVO.getPlanTrabajo()) {
							
							for (ApecPlanTrabajoCstm accionExistente : accionesReunionesPosteriores) {
								
								if(accionNueva.getcAccion().intValue()==accionExistente.getcAccion().intValue()){
									
									throw new ErrorNegocio(new Object[]{}, "servicios.reunion.error.planTrabajo");
								}
							}
							
						}
						
						
					}
					
				}

				planTrabajoBD = borrarElementosPrimerReunion(primeraReunionVO);
				primeraReunionVO.getReunion().setcApec(
						primeraReunionVO.getApec().getcApec());
				primeraReunionVO.getReunion().setcReunion(
						Constants.PRIMERA_REUNION);
				primeraReunionVO.getReunion().setFchRegistro(new Date());
				numRecords = apecReunionMapper
						.updateByPrimaryKey(primeraReunionVO.getReunion());

			}

			else {
				primeraReunionVO.getReunion().setcApec(
						primeraReunionVO.getApec().getcApec());
				primeraReunionVO.getReunion().setcReunion(
						Constants.PRIMERA_REUNION);
				primeraReunionVO.getReunion().setFchRegistro(new Date());
				numRecords = apecReunionMapper.insert(primeraReunionVO
						.getReunion());
			}

			// insertar los apoyos
			if (primeraReunionVO.getApoyosConafe() != null
					&& primeraReunionVO.getApoyosConafe().isEmpty() == false) {
				for (ApecApoyoCstm apoyoConafe : primeraReunionVO
						.getApoyosConafe()) {
					apoyoConafe.setcApec(primeraReunionVO.getReunion()
							.getcApec());
					apoyoConafe.setcReunion(Constants.PRIMERA_REUNION);
					apecApoyoMapper.insert(apoyoConafe);
					existenApoyos = true;
				}
			}

			if (primeraReunionVO.getApoyosFederales() != null
					&& primeraReunionVO.getApoyosFederales().isEmpty() == false) {
				for (ApecApoyoCstm apFederal : primeraReunionVO
						.getApoyosFederales()) {
					apFederal.setcApec(primeraReunionVO.getReunion()
							.getcApec());
					apFederal.setcReunion(Constants.PRIMERA_REUNION);
					apecApoyoMapper.insert(apFederal);
					existenApoyos = true;
				}
			}

			if (primeraReunionVO.getApoyosEstatales() != null
					&& primeraReunionVO.getApoyosEstatales().isEmpty() == false) {
				for (ApecApoyoCstm apoyoEstatal : primeraReunionVO
						.getApoyosEstatales()) {
					apoyoEstatal.setcApec(primeraReunionVO.getReunion()
							.getcApec());
					apoyoEstatal.setcReunion(Constants.PRIMERA_REUNION);
					System.out.println("apoyo: "+apoyoEstatal.getcApoyo()); // linea para enviar mensajes al archivo "log"
					apoyoEstatal.setcApoyo(apoyoEstatal.getcApoyo());
					System.out.println("otro especifique: "+apoyoEstatal.getOtro()); // linea para enviar mensajes al archivo "log"
					apoyoEstatal.setOtro(apoyoEstatal.getOtro());
					System.out.println("descripcion de apoyo: "+apoyoEstatal.getDescripApoyo()); // linea para enviar mensajes al archivo "log"
					apoyoEstatal.setDescripApoyo(apoyoEstatal.getDescripApoyo());
					System.out.println("numero de beneficiarios: "+apoyoEstatal.getNumBenef()); // linea para enviar mensajes al archivo "log"
					apoyoEstatal.setNumBenef(apoyoEstatal.getNumBenef());
					System.out.println("se gestionara: "+apoyoEstatal.getGestion()); // linea para enviar mensajes al archivo "log"
					apoyoEstatal.setGestion(apoyoEstatal.getGestion());
					apecApoyoMapper.insert(apoyoEstatal);
					existenApoyos = true;
				}
			}

			

			// diagnostico comunitario
			if (primeraReunionVO.getDiagnostico() != null
					&& primeraReunionVO.getDiagnostico().isEmpty() == false) {
				for (ApecDiagnosticoComCstm diagCom : primeraReunionVO
						.getDiagnostico()) {
					diagCom.setcApec(primeraReunionVO.getReunion().getcApec());
					diagCom.setcReunion(Constants.PRIMERA_REUNION);
					apecDiagnosticoComMapper.insert(diagCom);

					existeDiagnosticoComunitario = true;

				}
			}

			// poblacion indigena
			if (primeraReunionVO.getPobIndigena() != null
					&& primeraReunionVO.getPobIndigena().isEmpty() == false) {
				for (ApecPoblacionIndigenaCstm pobInd : primeraReunionVO
						.getPobIndigena()) {
					pobInd.setcApec(primeraReunionVO.getReunion().getcApec());
					pobInd.setcReunion(Constants.PRIMERA_REUNION);
					apecPoblacionIndigenaMapper.insert(pobInd);
					existeInclusionSocial = true;
				}
			}
			
			// bullying
			if (primeraReunionVO.getBullying() != null
					&& primeraReunionVO.getBullying().isEmpty() == false) {
				for (ApecBullyingCstm bullying : primeraReunionVO
						.getBullying()) {
					bullying.setcApec(primeraReunionVO.getReunion().getcApec());
					bullying.setcReunion(Constants.PRIMERA_REUNION);
					apecBullyingMapper.insert(bullying);
					existeInclusionSocial = true;
							}
						}
			//necesidades Eductivas
			
			if (primeraReunionVO.getNecesidadesEspeciales() != null
					&& primeraReunionVO.getNecesidadesEspeciales().isEmpty() == false) {
				for (ApecNecesidadesEducativasCstm neceEsp : primeraReunionVO
						.getNecesidadesEspeciales()) {
					neceEsp.setcApec(primeraReunionVO.getReunion().getcApec());
					neceEsp.setcReunion(Constants.PRIMERA_REUNION);
					ApecNecesidadesEducativasMapper.insert(neceEsp);
					existenNecEsp = true;
				}
			}
			// plan de trabajo
			if (primeraReunionVO.getPlanTrabajo() != null
					&& primeraReunionVO.getPlanTrabajo().isEmpty() == false) {
				for (ApecPlanTrabajoCstm acciones : primeraReunionVO
						.getPlanTrabajo()) {
					acciones.setcApec(primeraReunionVO.getReunion().getcApec());
					acciones.setcReunion(Constants.PRIMERA_REUNION);

					// identificar si la accion ya tenia respuesta de alguna de
					// cumplimiento
					for (ApecPlanTrabajo accionBD : planTrabajoBD) {
						if (accionBD.getcAccion().intValue() == acciones
								.getcAccion().intValue()) {
							acciones.setcRespuestar2(accionBD.getcRespuestar2());
							acciones.setcRespuestar3(accionBD.getcRespuestar3());
							acciones.setNumVecesr2(accionBD.getNumVecesr2());
							acciones.setNumVecesr3(accionBD.getNumVecesr3());
							break;
						}
					}

					apecPlanTrabajoMapper.insert(acciones);
					existePlanTrabajo = true;
				}
			}

			// opiniones
			if (primeraReunionVO.getOpiniones() != null
					&& primeraReunionVO.getOpiniones().isEmpty() == false) {
				for (ApecOpinionesComentarios opiniones : primeraReunionVO
						.getOpiniones()) {
					opiniones.setcApec(primeraReunionVO.getReunion()
							.getcApec());
					opiniones.setcReunion(Constants.PRIMERA_REUNION);
					opiniones.setcOpiniones(opiniones.getcOpiniones());
					opiniones.setOpiniones(opiniones.getOpiniones());
					apecOpinionesComentariosMapper.insert(opiniones);
					existeContraloria = true;
				}
			}
			
			// denuncias
			if (primeraReunionVO.getDenuncias() != null
					&& primeraReunionVO.getDenuncias().isEmpty() == false) {
				for (ApecDenunciasQuejas denuncias : primeraReunionVO
						.getDenuncias()) {
					denuncias.setcApec(primeraReunionVO.getReunion()
							.getcApec());
					denuncias.setcReunion(Constants.PRIMERA_REUNION);
					denuncias.setcDenuncias(denuncias.getcDenuncias());
					denuncias.setDenuncias(denuncias.getDenuncias());
					apecDenunciasQuejasMapper.insert(denuncias);
					existeContraloria = true;
				}
			}
			
			// numero alumnos
			if (primeraReunionVO.getNumeroAlumnos() != null
					&& primeraReunionVO.getNumeroAlumnos().isEmpty() == false) {
				for (ApecNumeroAlumnos numalumnos : primeraReunionVO
						.getNumeroAlumnos()) {
					numalumnos.setcApec(primeraReunionVO.getReunion()
							.getcApec());
					numalumnos.setcReunion(Constants.PRIMERA_REUNION);
					numalumnos.setcNumalum(numalumnos.getcNumalum());
					numalumnos.setCct(numalumnos.getCct());
					numalumnos.setNinos(numalumnos.getNinos());
					numalumnos.setNinas(numalumnos.getNinas());
					apecNumeroAlumnosMapper.insert(numalumnos);
					existeNumeroAlumnos = true;
				}
			}
			
			// dificultades
						if (primeraReunionVO.getDificultades()!= null
								&& primeraReunionVO.getDificultades().isEmpty() == false) {
							for (ApecPrincipalesDificultades dificultades : primeraReunionVO
									.getDificultades()) {
								dificultades.setcApec(primeraReunionVO.getReunion()
										.getcApec());
								dificultades.setcReunion(Constants.PRIMERA_REUNION);
								dificultades.setcDificultades(dificultades.getcDificultades());
								dificultades.setDificultades(dificultades.getDificultades());
								apecPrincipalesDificultadesMapper.insert(dificultades);
								existePrincipalesDN = true;
							}
						}
			
			
			// necesidades
						if (primeraReunionVO.getNecesidades() != null
								&& primeraReunionVO.getNecesidades().isEmpty() == false) {
							for (ApecPrincipalesNecesidades necesidades : primeraReunionVO
									.getNecesidades()) {
								necesidades.setcApec(primeraReunionVO.getReunion()
										.getcApec());
								necesidades.setcReunion(Constants.PRIMERA_REUNION);
								necesidades.setcNecesidades(necesidades.getcNecesidades());
								necesidades.setNecesidades(necesidades.getNecesidades());
								apecPrincipalesNecesidadesMapper.insert(necesidades);
								existePrincipalesDN = true;
							}
						}
						
			// Actividades1
						
						
						ApecActividadesUno actividadesUno = primeraReunionVO.getActividadesUno();
						actividadesUno.setcApec(primeraReunionVO.getReunion().getcApec());
						actividadesUno.setcReunion(Constants.PRIMERA_REUNION);
						apecActividadesUnoMapper.insert(actividadesUno);
						existeActividadesUno = true;
						
			// Actividades3
						
						
						ApecActividadesTres actividadesTres = primeraReunionVO.getActividadesTres();
						actividadesTres.setcApec(primeraReunionVO.getReunion().getcApec());
						actividadesTres.setcReunion(Constants.PRIMERA_REUNION);
						apecActividadesTresMapper.insert(actividadesTres);
						existeActividadesTres = true;
						
			// Actividades 4
						
						
						ApecActividadesCuatro actividadesCuatro = primeraReunionVO.getActividadesCuatro();
						actividadesCuatro.setcApec(primeraReunionVO.getReunion().getcApec());
						actividadesCuatro.setcReunion(Constants.PRIMERA_REUNION);
						apecActividadesCuatroMapper.insert(actividadesCuatro);
						existeActividadesCuatro = true;
						
						
						
			
			
			// insertar los integrantes seleccionados

			if (primeraReunionVO.getIntegrantesR1() != null
					&& primeraReunionVO.getIntegrantesR1().isEmpty() == false) {

				for (ApecReunionIntegranteCstm intSeleccionado : primeraReunionVO
						.getIntegrantesR1()) {
					intSeleccionado.setcReunion(Constants.PRIMERA_REUNION);
					intSeleccionado.setcApec(primeraReunionVO.getReunion()
							.getcApec());
					intSeleccionado.setcApecIntegrante(primeraReunionVO
							.getReunion().getcApec());
					apecReunionIntegranteMapper.insert(intSeleccionado);

				}
			}

			// insertar los instructores registrados en la r1 y las relaciones
			// de todos los instructores registrados y seleccionados

			if (primeraReunionVO.getInstructoresR1() != null
					&& primeraReunionVO.getInstructoresR1().isEmpty() == false) {
				for (ApecReunionInstructorCtsm instructorR1 : primeraReunionVO
						.getInstructoresR1()) {

					boolean intsExistente = false;
					if (instructorR1.getcApec() != null
							&& instructorR1.getcApec().intValue() != 0) {
						intsExistente = true;
					}

					// Instructor registrado en la reunion 1
					if (instructorR1.isEditable() == true) {
						instructorR1.getInstructor().setcApec(
								primeraReunionVO.getApec().getcApec());
						apecInstructorMapper.insert(instructorR1
								.getInstructor());

						// ccts por instructor registrado
						for (CCctLight cct : instructorR1.getInstructor()
								.getCcts()) {
							CCctInstructor cctInstructor = new CCctInstructor();
							cctInstructor.setcApec(primeraReunionVO.getApec()
									.getcApec());
							cctInstructor.setcInstructor(instructorR1
									.getInstructor().getcInstructor());
							cctInstructor.setcCct(cct.getcCct());

							cctInstructorMapper.insertSelective(cctInstructor);
						}

						// Insertar las relaciones que se tenian con otras
						// reuniones
						if (intsExistente == true) {
							for (ApecReunionInstructor relAnteriorInst : relacionesExistentesInst) {
								if (relAnteriorInst.getcApec().intValue() == instructorR1
										.getcApec().intValue()
										&& relAnteriorInst.getcInstructor()
												.intValue() == instructorR1
												.getcInstructor().intValue()) {
									apecReunionInstructorMapper
											.insert(relAnteriorInst);

								}
							}
						}

					}

					// Registra las relaciones
					instructorR1.setcApecInstructor(primeraReunionVO.getApec()
							.getcApec());
					instructorR1.setcReunion(Constants.PRIMERA_REUNION);
					instructorR1
							.setcApec(primeraReunionVO.getApec().getcApec());
					apecReunionInstructorMapper.insert(instructorR1);

				}

			}

			insertarSeccionesRegistradas(primeraReunionVO, existenApoyos,
					existenNecEsp, existeDiagnosticoComunitario,
					existeInclusionSocial, existePlanTrabajo,existeContraloria,
					existeNumeroAlumnos, existePrincipalesDN,
					existeActividadesUno,existeActividadesTres,existeActividadesCuatro);

			System.out.println("guardo la reunion");

		}
		
		catch(ErrorNegocio e ){
			throw e;
		}
		catch (Exception e) {
			try {
				ObjectMapper mapper = new ObjectMapper();
				log.error(mapper.writeValueAsString(primeraReunionVO));
			} catch (Exception ex) {
				ex.printStackTrace();
			}
			throw new ErrorInfraestructura(e,
					"servicios.primera.reunion.error.editar", new Object[] {});

		}

		return numRecords;

	}

	/**
	 * Eliminar la primera reunion
	 */

	public int deletePrimeraReunion(Integer num_apec) throws Exception {

		int numRecords = -1;
		try {
			// Elimina todas las reuniones de la APEC
			/*
			 * segundaReunionService.deleteSegundaSesion( cApec );
			 * terceraReunionService.deletePrimeraSesion( cApec );
			 */
			PrimeraReunionVO preunion = new PrimeraReunionVO();
			ApecCstm apec = new ApecCstm();
			apec.setcApec(num_apec);
			preunion.setApec(apec);

			segundaReunionService.deleteSegundaReunion(num_apec);
			borrarElementosPrimerReunion(preunion);
			numRecords = apecReunionMapper.deleteByPrimaryKey(num_apec,
					Constants.PRIMERA_REUNION);

		} catch (Exception e) {
			throw new ErrorInfraestructura(e,
					"servicios.primera.reunion.error.eliminar", new Object[] {});
		}
		return numRecords;
	}

	public PrimeraReunionVO selectPrimeraReunion(Integer apec) {

		PrimeraReunionVO primeraReunion = null;
		primeraReunion = primeraReunionMapper.selectPrimeraReunion(apec);

		if (primeraReunion != null) {
			// Obtener todos los apoyos aun cuando no esten registrados en
			// reunion
			List<CApoyo> apoyos = null;
			// obtener todos los conceptos de diagnostico comunitario no
			// registrados en la reunion
			List<CDiagnosticoCom> diagCom = null;
			// acciones de apoyo a la permanencia sin registrar en la reunion
			List<CAccion> accionesPermanencia = null;

			// obtener integrantes para la R1
			primeraReunion
					.setIntegrantesR1(buscarIntegrantesR1(primeraReunion));

			// obtener instructores para la R1
			primeraReunion
					.setInstructoresR1(buscarInstructoresR1(primeraReunion));

			CApoyoExample criterioApoyos = new CApoyoExample();
			criterioApoyos.setOrderByClause("c_apoyo");

			apoyos = cApoyoMapper.selectByExample(criterioApoyos);

			CDiagnosticoComExample criterioDCom = new CDiagnosticoComExample();
			criterioDCom.setOrderByClause("c_diagnostico_com");
			diagCom = cDiagnosticoComMapper.selectByExample(criterioDCom);

			CAccionExample criterio = new CAccionExample();
			criterio.createCriteria().andCTipoAccionEqualTo(
					Constants.C_TIPO_ACCION_PERMANENCIA);
			criterio.setOrderByClause("c_accion");
			accionesPermanencia = cAccionMapper.selectByExample(criterio);

			// Obtener todos los apoyos conafes no registrados
			if (apoyos != null && apoyos.isEmpty() == false) {
				primeraReunion.setApoyosConafe(obtenerApoyosPorTipo(
						primeraReunion.getApoyosConafe(), apoyos,
						Constants.C_TIPO_APOYO_CONAFE));
			}

			// Obtener todos los apoyos federales no registrados
			

			// Obtener todos los apoyos estatales no registrados
			

			// Obtener todos los apoyos de permanencia no registrados
			if (accionesPermanencia != null
					&& accionesPermanencia.isEmpty() == false) {
				primeraReunion.setPlanTrabajo(obtenerAccionesPermanencia(
						primeraReunion.getPlanTrabajo(), accionesPermanencia));
			}

			// Obtener todas conceptos de diagnostico comunitario no registrados

			if (diagCom != null && diagCom.isEmpty() == false) {
				primeraReunion.setDiagnostico(obtenerDiagnosticoComunitario(
						primeraReunion.getDiagnostico(), diagCom));
			}

		}

		return primeraReunion;
	}

	private List<ApecApoyoCstm> obtenerApoyosPorTipo(
			List<ApecApoyoCstm> apoyosPrimeraReunion, List<CApoyo> apoyos,
			Short tipo) {

		boolean encontrado = false;
		List<ApecApoyoCstm> apoyosPrimeraReunionFinales = new ArrayList<ApecApoyoCstm>();
		for (int i = 0; i < apoyos.size(); i++) {
			CApoyo elemento = (CApoyo) apoyos.get(i);
			ApecApoyoCstm apoyoSinRegistrar = new ApecApoyoCstm();
			apoyoSinRegistrar.setApoyo(elemento);
			apoyoSinRegistrar.setcApoyo(elemento.getcApoyo());
			apoyoSinRegistrar.setcReunion(Constants.PRIMERA_REUNION);
			encontrado = false;

			if (elemento.getcTipoApoyo().intValue() == tipo.intValue()
					&& (elemento.getSiempreVisible() == true || elemento
							.getVisibleEnReunion().intValue() == Constants.PRIMERA_REUNION
							.intValue())) {
				if (apoyosPrimeraReunion != null
						&& apoyosPrimeraReunion.isEmpty() == false) {
					for (int j = 0; j < apoyosPrimeraReunion.size(); j++) {
						ApecApoyoCstm apoyoReg = (ApecApoyoCstm) apoyosPrimeraReunion
								.get(j);

						if (apoyoReg.getcApoyo().intValue() == elemento
								.getcApoyo().intValue()) {
							encontrado = true;
							apoyosPrimeraReunionFinales.add(apoyoReg);
							break;
						}
					}
					if (encontrado == false)
						apoyosPrimeraReunionFinales.add(apoyoSinRegistrar);
				}

				else {
					apoyosPrimeraReunionFinales.add(apoyoSinRegistrar);
				}
			}

		}

		return apoyosPrimeraReunionFinales;
	}

	private List<ApecDiagnosticoComCstm> obtenerDiagnosticoComunitario(
			List<ApecDiagnosticoComCstm> diagnosPrimeraReunion,
			List<CDiagnosticoCom> diagnostico) {

		boolean encontrado = false;
		List<ApecDiagnosticoComCstm> diagnisticoComPrimeraReunionFinales = new ArrayList<ApecDiagnosticoComCstm>();

		for (int i = 0; i < diagnostico.size(); i++) {
			CDiagnosticoCom elemento = (CDiagnosticoCom) diagnostico.get(i);
			ApecDiagnosticoComCstm elementoSinRegistrar = new ApecDiagnosticoComCstm();
			elementoSinRegistrar.setDiagnostico(elemento);
			elementoSinRegistrar.setcDiagnosticoCom(elemento
					.getcDiagnosticoCom());
			elementoSinRegistrar.setcReunion(Constants.PRIMERA_REUNION);
			encontrado = false;

			if (diagnosPrimeraReunion != null
					&& diagnosPrimeraReunion.isEmpty() == false) {
				for (int j = 0; j < diagnosPrimeraReunion.size(); j++) {
					ApecDiagnosticoComCstm diagComReg = (ApecDiagnosticoComCstm) diagnosPrimeraReunion
							.get(j);

					if (diagComReg.getcDiagnosticoCom().intValue() == elemento
							.getcDiagnosticoCom().intValue()) {
						encontrado = true;
						diagnisticoComPrimeraReunionFinales.add(diagComReg);

						break;
					}
				}
				if (encontrado == false)
					diagnisticoComPrimeraReunionFinales
							.add(elementoSinRegistrar);
			}

			else {
				diagnisticoComPrimeraReunionFinales.add(elementoSinRegistrar);
			}
		}

		return diagnisticoComPrimeraReunionFinales;
	}

	public List<ApecPlanTrabajoCstm> obtenerAccionesPermanencia(
			List<ApecPlanTrabajoCstm> planTrabajoPR, List<CAccion> acciones) {

		boolean encontrado = false;
		List<ApecPlanTrabajoCstm> planTrabPrimeraReunionFinal = new ArrayList<ApecPlanTrabajoCstm>();

		for (int i = 0; i < acciones.size(); i++) {
			CAccion elemento = (CAccion) acciones.get(i);
			if (elemento.getSiempreVisible() == true
					|| elemento.getVisibleEnReunion().intValue() == Constants.PRIMERA_REUNION
							.intValue()) {
				ApecPlanTrabajoCstm accionSinRegistrar = new ApecPlanTrabajoCstm();
				accionSinRegistrar.setAccion(elemento);
				accionSinRegistrar.setcAccion(elemento.getcAccion());
				accionSinRegistrar.setcReunion(Constants.PRIMERA_REUNION);
				encontrado = false;

				if (planTrabajoPR != null && planTrabajoPR.isEmpty() == false) {
					for (int j = 0; j < planTrabajoPR.size(); j++) {
						ApecPlanTrabajoCstm accionRegistrada = (ApecPlanTrabajoCstm) planTrabajoPR
								.get(j);

						if (accionRegistrada.getcAccion().intValue() == elemento
								.getcAccion().intValue()) {
							encontrado = true;
							planTrabPrimeraReunionFinal.add(accionRegistrada);
							break;
						}
					}
					if (encontrado == false)
						planTrabPrimeraReunionFinal.add(accionSinRegistrar);
				}

				else {
					planTrabPrimeraReunionFinal.add(accionSinRegistrar);
				}
			}

		}

		// copiar las acciones que hayan sido registradas

		for (int j = 0; j < planTrabajoPR.size(); j++) {
			ApecPlanTrabajoCstm accionRegistrada = (ApecPlanTrabajoCstm) planTrabajoPR
					.get(j);

			if (accionRegistrada.getAccion().getcTipo().intValue() == Constants.C_ACCION
					.intValue()) {
				planTrabPrimeraReunionFinal.add(accionRegistrada);
			}
		}

		return planTrabPrimeraReunionFinal;
	}

	private List<ApecPlanTrabajo> borrarElementosPrimerReunion(
			PrimeraReunionVO primeraReunionVO) {

		List<ApecPlanTrabajo> ptOriginal = new ArrayList<ApecPlanTrabajo>();

		// recupera el plan de trabajo original, en caso de que se tenga
		// respuesta de seguimiento en la reunion 2 o 3
		ApecPlanTrabajoExample criterioPT = new ApecPlanTrabajoExample();
		criterioPT.createCriteria()
				.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.PRIMERA_REUNION);

		ptOriginal = apecPlanTrabajoMapper.selectByExample(criterioPT);

		// Eliminar los apoyos de todo tipo
		ApecApoyoExample criterioApoyos = new ApecApoyoExample();
		criterioApoyos.createCriteria()
				.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.PRIMERA_REUNION);
		apecApoyoMapper.deleteByExample(criterioApoyos);

		// Eliminar el diagnostico comunitario
		ApecDiagnosticoComExample criterioDiagnostico = new ApecDiagnosticoComExample();

		criterioDiagnostico.createCriteria()
				.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.PRIMERA_REUNION);
		apecDiagnosticoComMapper.deleteByExample(criterioDiagnostico);

		// Eliminar la poblacion indigena
		ApecPoblacionIndigenaExample criterioPoblacion = new ApecPoblacionIndigenaExample();

		criterioPoblacion.createCriteria()
				.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.PRIMERA_REUNION);
		apecPoblacionIndigenaMapper.deleteByExample(criterioPoblacion);
		

		// Eliminar bullying
		ApecBullyingExample criterioBullying = new ApecBullyingExample();

		criterioBullying.createCriteria()
				.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.PRIMERA_REUNION);
		apecBullyingMapper.deleteByExample(criterioBullying);
		
		
		// Eliminar Necesidades
		ApecNecesidadesEducativasExample criterioneceEsp = new ApecNecesidadesEducativasExample();

				criterioneceEsp.createCriteria()
						.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
						.andCReunionEqualTo(Constants.PRIMERA_REUNION);
				ApecNecesidadesEducativasMapper.deleteByExample(criterioneceEsp);



		// Eliminar el plan de trabajo

		apecPlanTrabajoMapper.deleteByExample(criterioPT);

		// Eliminar las relaciones de integrantes seleccionados para la reunion
		ApecReunionIntegranteExample criterioIntegrantes = new ApecReunionIntegranteExample();
		criterioIntegrantes.createCriteria()
				.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.PRIMERA_REUNION);
		apecReunionIntegranteMapper.deleteByExample(criterioIntegrantes);

		// eliminar los instructores registrados y su relaccion con cct en la
		// reunion 1
		List<ApecReunionInstructorCtsm> relInstRegistrados = new ArrayList<ApecReunionInstructorCtsm>();

		relInstRegistrados=apecReunionInstructorMapperCstm.selectInstructoresRegistradosXReunion(primeraReunionVO.getApec().getcApec(),Constants.PRIMERA_REUNION);
		
		
		System.out.println("instrutores registrados en reunion"+relInstRegistrados.size()+"..."+primeraReunionVO.getApec().getcApec());

		for (ApecReunionInstructorCtsm instrRegistado : relInstRegistrados) {

			System.out.println("a borrar el"+ instrRegistado.getcInstructor());
			CCctInstructorExample cCctInstructorExample = new CCctInstructorExample();
			cCctInstructorExample.createCriteria()
					.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
					.andCInstructorEqualTo(instrRegistado.getcInstructor());

			cctInstructorMapper.deleteByExample(cCctInstructorExample);

			apecInstructorMapper.deleteByPrimaryKey(primeraReunionVO.getApec()
					.getcApec(), instrRegistado.getcInstructor());

		}
		
		// Eliminar las relaciones de instructores seleccionados

		ApecReunionInstructorExample criterioInstructor = new ApecReunionInstructorExample();
		criterioInstructor.createCriteria()
				.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.PRIMERA_REUNION);
		apecReunionInstructorMapper.deleteByExample(criterioInstructor);



		// borrar todas las secciones registradas
		ApecSeccionExample criterios = new ApecSeccionExample();
		criterios.createCriteria()
				.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
				.andCReunionEqualTo(Constants.PRIMERA_REUNION);
		apecSeccionMapper.deleteByExample(criterios);
		
		ApecNumeroAlumnosExample criteriosAlumnos= new ApecNumeroAlumnosExample();
		criteriosAlumnos.createCriteria()
		.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.PRIMERA_REUNION);
        apecNumeroAlumnosMapper.deleteByExample(criteriosAlumnos);
        
        ApecOpinionesComentariosExample criteriosOpiniones= new ApecOpinionesComentariosExample();
        criteriosOpiniones.createCriteria()
		.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.PRIMERA_REUNION);
        apecOpinionesComentariosMapper.deleteByExample(criteriosOpiniones);
        
        ApecDenunciasQuejasExample criteriosDenuncias= new ApecDenunciasQuejasExample();
        criteriosDenuncias.createCriteria()
		.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.PRIMERA_REUNION);
        apecDenunciasQuejasMapper.deleteByExample(criteriosDenuncias);
        
        ApecPrincipalesDificultadesExample criteriosDificultades= new ApecPrincipalesDificultadesExample();
        criteriosDificultades.createCriteria()
		.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.PRIMERA_REUNION);
        apecPrincipalesDificultadesMapper.deleteByExample(criteriosDificultades);
        
        ApecPrincipalesNecesidadesExample criteriosNecesidades= new ApecPrincipalesNecesidadesExample();
        criteriosNecesidades.createCriteria()
		.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.PRIMERA_REUNION);
        apecPrincipalesNecesidadesMapper.deleteByExample(criteriosNecesidades);
        
//Actividades Uno
        
        ApecActividadesUnoExample criteriosActividadesUno= new ApecActividadesUnoExample();
        criteriosActividadesUno.createCriteria()
		.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.PRIMERA_REUNION);
        apecActividadesUnoMapper.deleteByExample(criteriosActividadesUno);
        
//Actividades Tres
        
        ApecActividadesTresExample criteriosActividadesTres= new ApecActividadesTresExample();
        criteriosActividadesTres.createCriteria()
		.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.PRIMERA_REUNION);
        apecActividadesTresMapper.deleteByExample(criteriosActividadesTres);
        
//Actividades Cuatro
        
        ApecActividadesCuatroExample criteriosActividadesCuatro= new ApecActividadesCuatroExample();
        criteriosActividadesCuatro.createCriteria()
		.andCApecEqualTo(primeraReunionVO.getApec().getcApec())
		.andCReunionEqualTo(Constants.PRIMERA_REUNION);
        apecActividadesCuatroMapper.deleteByExample(criteriosActividadesCuatro);
        

		return ptOriginal;
	}

	/**
	 * Registra las secciones que fueron agregadas a la primera reunion
	 * 
	 * @param pRVO
	 * @param existenApoyos
	 * @param existenNecEsp
	 * @param existeDiagnosticoSalud
	 * @param existeDiagnosticoProd
	 * @param existeDiagnosticoINEA
	 * @param existeInclusionSocial
	 * @param existePlanTrabajo
	 */

	private void insertarSeccionesRegistradas(PrimeraReunionVO pRVO,
			boolean existenApoyos, boolean existenNecEsp,
			boolean existeDiagnosticoComunitario,
			boolean existeInclusionSocial, boolean existePlanTrabajo, boolean existeContraloria,
			boolean existeNumeroAlumnos, boolean existePrincipalesDN, boolean existeActividadesUno,
			boolean existeActividadesTres,boolean existeActividadesCuatro) {

		// registrar la seccion para la reunion de que hay apoyos
		if (existenApoyos == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_APOYOS_PRIMER_REUNION);
			apecSeccionMapper.insert(seccion);

		}

		// registrar la seccion de inclusion social
		if (existenNecEsp == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_INCLUSION_PRIMER_REUNION);
			apecSeccionMapper.insert(seccion);
		}

		// registrar la seccion para la reunion de diagnostico INEA
		/*
		 * if (existeDiagnosticoINEA == true) { ApecSeccion seccion = new
		 * ApecSeccion(); seccion.setcApec(pRVO.getApec().getcApec());
		 * seccion.setcReunion(pRVO.getReunion().getcReunion());
		 * seccion.setcSeccionRegistro
		 * (Constants.SECCION_ALFABETIZACION_PRIMER_REUNION);
		 * apecSeccionMapper.insert(seccion);
		 * 
		 * }
		 */

		// registrar la seccion para la reunion de diagnostico salud
		if (existeDiagnosticoComunitario == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_DIAGNOSTICO_COMUM_PRIMER_REUNION);
			apecSeccionMapper.insert(seccion);

		}

		// registrar la seccion para la reunion de diagnostico produccion
		/*
		 * if (existeDiagnosticoProd == true) { ApecSeccion seccion = new
		 * ApecSeccion(); seccion.setcApec(pRVO.getApec().getcApec());
		 * seccion.setcReunion(pRVO.getReunion().getcReunion());
		 * seccion.setcSeccionRegistro
		 * (Constants.SECCION_PRODUCCION_PRIMER_REUNION);
		 * apecSeccionMapper.insert(seccion);
		 * 
		 * }
		 */

		// registrar la seccion para la inclusion social de poblacion indigena
		if (existeInclusionSocial == true && existenNecEsp == false) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_INCLUSION_PRIMER_REUNION);
			apecSeccionMapper.insert(seccion);
		}

		// registrar la seccion para la reunion de PLan de Trabajo
		if (existePlanTrabajo == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_PLAN_TRABAJO_PRIMER_REUNION);
			apecSeccionMapper.insert(seccion);

		}
		
		if (existeContraloria == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_CONTRALORIA_PRIMER_REUNION);
			apecSeccionMapper.insert(seccion);

		}
		
		if (existeNumeroAlumnos == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_NUMERO_ALUMNOS_PRIMER_REUNION);
			apecSeccionMapper.insert(seccion);

		}
		
		if (existePrincipalesDN == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_PRINCIPALESDN_PRIMERA_REUNION);
			apecSeccionMapper.insert(seccion);

		}
		
		if (existeActividadesUno == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_ACTIVIDADES_UNO_PRIMERA_REUNION);
			apecSeccionMapper.insert(seccion);
		}
		
		if (existeActividadesTres == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_ACTIVIDADES_TRES_PRIMERA_REUNION);
			apecSeccionMapper.insert(seccion);
		}
		
		if (existeActividadesCuatro == true) {
			ApecSeccion seccion = new ApecSeccion();
			seccion.setcApec(pRVO.getApec().getcApec());
			seccion.setcReunion(pRVO.getReunion().getcReunion());
			seccion.setcSeccionRegistro(Constants.SECCION_ACTIVIDADES_CUATRO_PRIMERA_REUNION);
			apecSeccionMapper.insert(seccion);
		}
	}

	private List<ApecReunionIntegranteCstm> buscarIntegrantesR1(
			PrimeraReunionVO primeraReunion) {
		List<ApecReunionIntegranteCstm> integrantesSeleccionadosR1 = new ArrayList<ApecReunionIntegranteCstm>();

		// obtiene los integrantes seleccionados en la r1 y los disponibles del
		// acta no seleccionados
		for (ApecReunionIntegranteCstm integranteActa : primeraReunion
				.getIntegrantes()) {

			boolean encontrado = false;
			for (ApecReunionIntegranteCstm integranteR1 : primeraReunion
					.getIntegrantesR1()) {

				if (integranteActa.getcIntegrante().intValue() == integranteR1
						.getcIntegrante().intValue()) {

					integrantesSeleccionadosR1.add(integranteR1);
					encontrado = true;
					break;
				}

			}

			if (encontrado == false) {
				integrantesSeleccionadosR1.add(integranteActa);
			}
		}

		return integrantesSeleccionadosR1;
	}

	private List<ApecReunionInstructorCtsm> buscarInstructoresR1(
			PrimeraReunionVO primeraReunion) {
		List<ApecReunionInstructorCtsm> instructoresSeleccionadosR1 = new ArrayList<ApecReunionInstructorCtsm>();

		// obtiene los instructores seleccionados en la r1 y los disponibles del
		// acta no seleccionados, asi como los que fueron dados de alta en la R1
		for (ApecReunionInstructorCtsm instructorRelGral : primeraReunion
				.getInstructores()) {

			boolean encontrado = false;
			for (ApecReunionInstructorCtsm instructorR1 : primeraReunion
					.getInstructoresR1()) {

				if (instructorRelGral.getcInstructor().intValue() == instructorR1
						.getcInstructor().intValue()) {

					if (instructorRelGral.getcReunion().intValue() == instructorR1
							.getcReunion().intValue()) {
						instructorR1.setEditable(true);
					} else
						instructorR1.setEditable(false);

					instructorR1.setImprimir(true);
					instructoresSeleccionadosR1.add(instructorR1);
					encontrado = true;
					break;
				}

			}

			if (encontrado == false) {
				instructorRelGral.setEditable(false);
				instructorRelGral.setImprimir(false);
				instructoresSeleccionadosR1.add(instructorRelGral);
			}
		}

		return instructoresSeleccionadosR1;
	}

}
