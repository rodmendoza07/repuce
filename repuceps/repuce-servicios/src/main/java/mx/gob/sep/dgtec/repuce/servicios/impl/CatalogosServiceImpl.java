package mx.gob.sep.dgtec.repuce.servicios.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import mx.gob.sep.dgtec.repuce.dao.ApecReunionInstructorMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.CAccionMapper;
import mx.gob.sep.dgtec.repuce.dao.CActSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CApoyo2Mapper;
import mx.gob.sep.dgtec.repuce.dao.CApoyoMapper;
import mx.gob.sep.dgtec.repuce.dao.CCalidadIntMapper;
import mx.gob.sep.dgtec.repuce.dao.CCargoIntMapper;
import mx.gob.sep.dgtec.repuce.dao.CCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CCctMapperCstm;
import mx.gob.sep.dgtec.repuce.dao.CCoBullyingMapper;
import mx.gob.sep.dgtec.repuce.dao.CCoNeeMapper;
import mx.gob.sep.dgtec.repuce.dao.CCoTipoBullyingMapper;
import mx.gob.sep.dgtec.repuce.dao.CComiteMapper;
import mx.gob.sep.dgtec.repuce.dao.CCompEnlaceMapper;
import mx.gob.sep.dgtec.repuce.dao.CDesercionMapper;
import mx.gob.sep.dgtec.repuce.dao.CDiagnosticoComMapper;
import mx.gob.sep.dgtec.repuce.dao.CDiferenciaPgrMapper;
import mx.gob.sep.dgtec.repuce.dao.CEntidadMapper;
import mx.gob.sep.dgtec.repuce.dao.CEstimulosMapper;
import mx.gob.sep.dgtec.repuce.dao.CEventoMapper;
import mx.gob.sep.dgtec.repuce.dao.CGradoMapper;
import mx.gob.sep.dgtec.repuce.dao.CInformeFinalMapper;
import mx.gob.sep.dgtec.repuce.dao.CLenguaMapper;
import mx.gob.sep.dgtec.repuce.dao.CLocalidadConafeMapper;
import mx.gob.sep.dgtec.repuce.dao.CMejoraCctMapper;
import mx.gob.sep.dgtec.repuce.dao.CMunicipioMapper;
import mx.gob.sep.dgtec.repuce.dao.CNiveleducMapper;
import mx.gob.sep.dgtec.repuce.dao.CNiveleducConafeMapper;
import mx.gob.sep.dgtec.repuce.dao.CObjetivosMapper;
import mx.gob.sep.dgtec.repuce.dao.COpcionesCatMapper;
import mx.gob.sep.dgtec.repuce.dao.CPlaneacionMapper;
import mx.gob.sep.dgtec.repuce.dao.CPoblacionIndigenaMapper;
import mx.gob.sep.dgtec.repuce.dao.CProgramaEscolarMapper;
import mx.gob.sep.dgtec.repuce.dao.CProgramaMapper;
import mx.gob.sep.dgtec.repuce.dao.CRespuestaMapper;
import mx.gob.sep.dgtec.repuce.dao.CReunionMapper;
import mx.gob.sep.dgtec.repuce.dao.CRutaMapper;
import mx.gob.sep.dgtec.repuce.dao.CSeccionRegistroMapper;
import mx.gob.sep.dgtec.repuce.dao.CSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.CTipoAccionMapper;
import mx.gob.sep.dgtec.repuce.dao.CeDenunciaMapper;
import mx.gob.sep.dgtec.repuce.dao.ConConsejoMapper;
import mx.gob.sep.dgtec.repuce.dao.ConProgramasYComitesMapper;
import mx.gob.sep.dgtec.repuce.dao.PrimeraSesionMapper;
import mx.gob.sep.dgtec.repuce.dao.ValidaPaloma2Sesion;
import mx.gob.sep.dgtec.repuce.dao.ValidacionNombreHijo;
import mx.gob.sep.dgtec.repuce.dao.ValidaEscuela;
import mx.gob.sep.dgtec.repuce.model.CAccion;
import mx.gob.sep.dgtec.repuce.model.CAccionExample;
import mx.gob.sep.dgtec.repuce.model.CActSesion;
import mx.gob.sep.dgtec.repuce.model.CActSesionExample;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.model.CApoyo2;
import mx.gob.sep.dgtec.repuce.model.CApoyo2Example;
import mx.gob.sep.dgtec.repuce.model.CApoyoExample;
import mx.gob.sep.dgtec.repuce.model.CCalidadInt;
import mx.gob.sep.dgtec.repuce.model.CCalidadIntExample;
import mx.gob.sep.dgtec.repuce.model.CCargoInt;
import mx.gob.sep.dgtec.repuce.model.CCargoIntExample;
import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CCctExample;
import mx.gob.sep.dgtec.repuce.model.CCoBullying;
import mx.gob.sep.dgtec.repuce.model.CCoBullyingExample;
import mx.gob.sep.dgtec.repuce.model.CCoNee;
import mx.gob.sep.dgtec.repuce.model.CCoNeeExample;
import mx.gob.sep.dgtec.repuce.model.CCoTipoBullying;
import mx.gob.sep.dgtec.repuce.model.CCoTipoBullyingExample;
import mx.gob.sep.dgtec.repuce.model.CComite;
import mx.gob.sep.dgtec.repuce.model.CComiteExample;
import mx.gob.sep.dgtec.repuce.model.CCompEnlace;
import mx.gob.sep.dgtec.repuce.model.CCompEnlaceExample;
import mx.gob.sep.dgtec.repuce.model.CDesercion;
import mx.gob.sep.dgtec.repuce.model.CDiagnosticoCom;
import mx.gob.sep.dgtec.repuce.model.CDiagnosticoComExample;
import mx.gob.sep.dgtec.repuce.model.CDiferenciaPgr;
import mx.gob.sep.dgtec.repuce.model.CDiferenciaPgrExample;
import mx.gob.sep.dgtec.repuce.model.CEntidad;
import mx.gob.sep.dgtec.repuce.model.CEntidadExample;
import mx.gob.sep.dgtec.repuce.model.CEstimulos;
import mx.gob.sep.dgtec.repuce.model.CEstimulosExample;
import mx.gob.sep.dgtec.repuce.model.CEvento;
import mx.gob.sep.dgtec.repuce.model.CEventoExample;
import mx.gob.sep.dgtec.repuce.model.CGrado;
import mx.gob.sep.dgtec.repuce.model.CGradoExample;
import mx.gob.sep.dgtec.repuce.model.CInformeFinal;
import mx.gob.sep.dgtec.repuce.model.CInformeFinalExample;
import mx.gob.sep.dgtec.repuce.model.CLengua;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafe;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafeExample;
import mx.gob.sep.dgtec.repuce.model.CMejoraCct;
import mx.gob.sep.dgtec.repuce.model.CMejoraCctExample;
import mx.gob.sep.dgtec.repuce.model.CMunicipio;
import mx.gob.sep.dgtec.repuce.model.CMunicipioExample;
import mx.gob.sep.dgtec.repuce.model.CNiveleduc;
import mx.gob.sep.dgtec.repuce.model.CNiveleducExample;
import mx.gob.sep.dgtec.repuce.model.CNiveleducConafe;
import mx.gob.sep.dgtec.repuce.model.CNiveleducConafeExample;
import mx.gob.sep.dgtec.repuce.model.CObjetivos;
import mx.gob.sep.dgtec.repuce.model.CObjetivosExample;
import mx.gob.sep.dgtec.repuce.model.COpcionesCat;
import mx.gob.sep.dgtec.repuce.model.COpcionesCatExample;
import mx.gob.sep.dgtec.repuce.model.CPlaneacion;
import mx.gob.sep.dgtec.repuce.model.CPlaneacionExample;
import mx.gob.sep.dgtec.repuce.model.CPoblacionIndigena;
import mx.gob.sep.dgtec.repuce.model.CPoblacionIndigenaExample;
import mx.gob.sep.dgtec.repuce.model.CPrograma;
import mx.gob.sep.dgtec.repuce.model.CProgramaEscolar;
import mx.gob.sep.dgtec.repuce.model.CProgramaEscolarExample;
import mx.gob.sep.dgtec.repuce.model.CProgramaExample;
import mx.gob.sep.dgtec.repuce.model.CRespuesta;
import mx.gob.sep.dgtec.repuce.model.CRespuestaExample;
import mx.gob.sep.dgtec.repuce.model.CReunion;
import mx.gob.sep.dgtec.repuce.model.CReunionExample;
import mx.gob.sep.dgtec.repuce.model.CRuta;
import mx.gob.sep.dgtec.repuce.model.CRutaExample;
import mx.gob.sep.dgtec.repuce.model.CSeccionRegistro;
import mx.gob.sep.dgtec.repuce.model.CSeccionRegistroExample;
import mx.gob.sep.dgtec.repuce.model.CSesion;
import mx.gob.sep.dgtec.repuce.model.CSesionExample;
import mx.gob.sep.dgtec.repuce.model.CTipoAccion;
import mx.gob.sep.dgtec.repuce.model.CTipoAccionExample;
import mx.gob.sep.dgtec.repuce.model.CeDenuncia;
import mx.gob.sep.dgtec.repuce.model.CeDenunciaExample;
import mx.gob.sep.dgtec.repuce.vo.CeDenunciaVO;
import mx.gob.sep.dgtec.repuce.model.CeEstimulos;
import mx.gob.sep.dgtec.repuce.model.ConConsejoCstm;
import mx.gob.sep.dgtec.repuce.model.ConProgramasYComitesCstm;
import mx.gob.sep.dgtec.repuce.servicios.CatalogosService;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorInfraestructura;
import mx.gob.sep.dgtec.repuce.servicios.util.ErrorNegocio;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;
import mx.gob.sep.dgtec.repuce.vo.Datos2VO;
import mx.gob.sep.dgtec.repuce.vo.DatosEscuelaPorLocyMunVO;
import mx.gob.sep.dgtec.repuce.vo.DatosEscuelaVO;
import mx.gob.sep.dgtec.repuce.vo.DatosVO;
import mx.gob.sep.dgtec.repuce.vo.ValidacionNombreHijoVO;
import mx.gob.sep.dgtec.repuce.vo.ValidacionSegundaSesionVO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Clase que consulta
 * 
 * @Descripcion: Refactor al nombre de clase
 */
@Service
public class CatalogosServiceImpl implements CatalogosService {

	private static final Logger log = LoggerFactory
			.getLogger(CatalogosServiceImpl.class);

	@Autowired
	private CProgramaEscolarMapper cProgramaEscolarDAO;
	@Autowired
	private CCargoIntMapper cCargoIntDAO;
	@Autowired
	private CComiteMapper cComiteDAO;
	@Autowired
	private CProgramaMapper cProgramaDAO;
	@Autowired
	private CObjetivosMapper cObjetivoDAO;
	@Autowired
	private CActSesionMapper cActSesionDAO;
	@Autowired
	private CEntidadMapper cEntidadDAO;
	@Autowired
	private CMunicipioMapper cMunicipioDAO;
	@Autowired
	private CLocalidadConafeMapper cLocalidadConafeMapper;
	@Autowired
	private CCctMapper cCctDAO;
	@Autowired
	private CCctMapperCstm cCctMapperDAO;
	@Autowired
	private CMejoraCctMapper cMejoraDAO;
	@Autowired
	private CPlaneacionMapper cPlaneacionDAO;
	@Autowired
	private CNiveleducMapper cNivelDAO;
	@Autowired
	private CNiveleducConafeMapper cNivelConafeDAO;
	@Autowired
	private CGradoMapper cGradoDAO;
	@Autowired
	private COpcionesCatMapper cOpcionesCatDAO;
	@Autowired
	private CSesionMapper cSesionDAO;
	@Autowired
	private CCalidadIntMapper cCalidadIntegranteDAO;
	@Autowired
	private CEventoMapper cEventoDAO;
	@Autowired
	private CCompEnlaceMapper cCompromisoEnlaceDAO;
	@Autowired
	private CDiferenciaPgrMapper cDiferenciaPgrMapper;
	@Autowired
	private PrimeraSesionMapper primeraSesionMapper;
	@Autowired
	private CReunionMapper cReunionMapper;

	@Autowired
	private CApoyoMapper cApoyoMapper;
	@Autowired
	private CDiagnosticoComMapper cDiagnosticoComMapper;
	@Autowired
	private CPoblacionIndigenaMapper cPoblacionIndigenaMapper;
	@Autowired
	private CLenguaMapper cLenguaMapper;
	@Autowired
	private CAccionMapper cAccionMapper;
	@Autowired
	private CTipoAccionMapper cTipoAccionMapper;

	@Autowired
	private CSeccionRegistroMapper cSeccionRegistroMapper;
	@Autowired
	private CRespuestaMapper cRespuestaMapper;
	
	@Autowired
	private CDesercionMapper cDesercionMapper;

	@Autowired
	private ApecReunionInstructorMapperCstm apecReunionInstructorMapperCstm;
	
	//conafe susana
	@Autowired
	private CCoTipoBullyingMapper cCoTipoBullyingMapper;
	
	@Autowired
	private CCoNeeMapper  cCoNeeMapper;
	
	
	@Autowired
	private CCoBullyingMapper  cCoBullyingMapper;
	
	@Autowired
	private ConConsejoMapper conConsejoMapper;
	
	@Autowired
	private ConProgramasYComitesMapper conProgramasYComitesMapper;
	
		
	@Autowired
	private ValidacionNombreHijo validacionNombreHijoMapper;
	
	@Autowired
	private ValidaPaloma2Sesion validaPaloma2SesionMapper;
	
	
	
	@Autowired
	private CEstimulosMapper cEstimulosDAO;
	
	@Autowired
	private CeDenunciaMapper ceDenunciaMapper;

	@Autowired
	private ValidaEscuela validaEscuelaMapper;
	
	
	@Autowired
	private CRutaMapper cRutaDAO;
	
	@Autowired
	private CApoyo2Mapper cApoyo2;
	
	
	@Autowired
	private CInformeFinalMapper cInformeFinalDAO;
	/**
	 * 
	 * Obtiene el catálogo de Programas eductativos para CONAFE
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<CProgramaEscolar> searchProgramasEducativos() throws Exception {

		CProgramaEscolarExample criteria = new CProgramaEscolarExample();
		List<CProgramaEscolar> programas = cProgramaEscolarDAO
				.selectByExample(criteria);

		return programas;
	}

	/**
	 * Obtiene el catálogo de Programas eductativos para CONAFE
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<CCargoInt> searchCargos(String tipoCargo) throws Exception {

		CCargoIntExample criteria = new CCargoIntExample();
		if (tipoCargo == null)
			criteria.createCriteria().andCveDepNorIsNull();
		else
			criteria.createCriteria().andCveDepNorEqualTo(tipoCargo);

		List<CCargoInt> cargos = cCargoIntDAO.selectByExample(criteria);

		return cargos;
	}

	/**
	 * Trae los apoyos (Programas) manifestados en las reuniones
	 * 
	 * @param tipoComite
	 *            1:Otros 2:CONAFE
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	public List<CComite> searchComites(String tipoComite) throws Exception {
		CComiteExample criteria = new CComiteExample();
		criteria.createCriteria().andTpoComiteEqualTo(tipoComite)
				.andCCctIsNull();
		List<CComite> comites = cComiteDAO.selectByExample(criteria);

		return comites;
	}

	/**
	 * 
	 */
	public List<CComite> searchComitesCct(Integer cCct) throws Exception {
		CComiteExample criteria = new CComiteExample();
		criteria.createCriteria()
				.andTpoComiteEqualTo(Constants.TPO_COMITE_REPUCE)
				.andCCctEqualTo(cCct);
		List<CComite> comites = cComiteDAO.selectByExample(criteria);

		return comites;
	}

	/**
	 * Inserta o actualiza el catálogo de los Comités para un CCT dado
	 * 
	 * @param cComite
	 *            La ifnromación del comite a editar o insertar
	 * @return el numero de registros actualizados
	 * @throws Exception
	 */
	public int saveComiteCct(CComite cComite, String currentUser)
			throws Exception {

		int numRecords = 0;
		Date now = new Date();

		// Busca el CCT dado el nombre del usuario
		CCctExample cCctExample = new CCctExample();
		cCctExample.createCriteria().andCveCctEqualTo(currentUser);
		List<CCct> cCctList = cCctDAO.selectByExample(cCctExample);

		if (cCctList.size() == 0) {
			throw new ErrorNegocio(new Object[] {},
					"servicios.catalogos.insert.comite.user.not.allowed");
		}

		for (CCct cCct : cCctList) {
			CComite cComiteExistente = cComiteDAO.selectByPrimaryKey(cComite
					.getcComite());

			// Si no existe el comite
			if (cComiteExistente == null) {

				cComite.setTpoComite(Constants.TPO_COMITE_REPUCE);
				cComite.setFchSistemaIni(now);
				cComite.setFchVigenciaIni(Constants.FCH_INI_CICLO);
				cComite.setFchVigenciaFin(Constants.FCH_FIN_CICLO);
				cComite.setFchSistemaFin(Constants.FCH_FIN_CICLO);
				cComite.setcCct(cCct.getcCct());
				cComite.setdVigencia("1");

				numRecords = primeraSesionMapper.insertCComite(cComite);
			} else {

				/*
				 * Si la entrada del comité es definido por el CONAPASE no se
				 * puede editar
				 */
				if (cComiteExistente.getcCct() == null) {
					throw new ErrorNegocio(
							new Object[] { cComiteExistente.getNomComite() },
							"servicios.catalogos.update.comite");
				}

				numRecords = cComiteDAO.updateByPrimaryKeySelective(cComite);
			}
		}

		return numRecords;
	}

	/**
	 * Elimina la entrada de catálogo del Comités para un CCT dado
	 * 
	 * @param comites
	 *            La lista de los identificadores de los comites a eliminar
	 * @return el numero de registros eliminados
	 * @throws Exception
	 */
	public int deleteComitesCct(List<Integer> comites, String currentUser)
			throws Exception {

		int numRecords = 0;

		// Busca el CCT dado el nombre del usuario
		CCctExample cCctExample = new CCctExample();
		cCctExample.createCriteria().andCveCctEqualTo(currentUser);
		List<CCct> cCctList = cCctDAO.selectByExample(cCctExample);

		if (cCctList.size() == 0) {
			throw new ErrorNegocio(new Object[] {},
					"servicios.catalogos.insert.comite.user.not.allowed");
		}

		// Valida que los comites que desee eliminar le pertenezcan
		for (CCct cCct : cCctList) {
			CComiteExample cComiteExample = new CComiteExample();
			cComiteExample.createCriteria().andCCctEqualTo(cCct.getcCct())
					.andCComiteIn(comites);

			numRecords = cComiteDAO.deleteByExample(cComiteExample);
		}

		if (numRecords != comites.size()) {
			throw new ErrorNegocio(new Object[] {},
					"servicios.catalogos.delete.comite");
		}

		return numRecords;
	}

	/**
	 * Trae los apoyos (Programas) manifestados en las reuniones
	 * 
	 * @param tipoPrograma
	 *            El tipo de programa que se trate
	 * @return Cat�logo de apoyos
	 * @throws Exception
	 */
	public List<CPrograma> searchProgramas(Short tipoPrograma) throws Exception {
        CProgramaExample criteria = new CProgramaExample();
        
        criteria.createCriteria().andTpoProgramaEqualTo(tipoPrograma)
        .andDVigenciaEqualTo("1");   //Modificado por Mario (11/09/2014): Recupera solo los programas activos.
                                   
        List<CPrograma> programas = cProgramaDAO.selectByExample(criteria);

        return programas;
  }

	/**
	 * Trae los Objetivos (Programas) 
	 * 
	 * @return Cat�logo de Objetivos de programas
	 * @throws Exception
	 */
	//Creado por Mario (03/11/2014): Recupera solo los objetivos de programas activos.
	public List<CObjetivos> searchObjetivos() throws Exception {
        CObjetivosExample criteria = new CObjetivosExample();
        
        criteria.createCriteria();   
                                   
        List<CObjetivos> programas = cObjetivoDAO.selectByExample(criteria);

        return programas;
  }
	

	/**
	 * Trae los temas (Actividades) tratados en las reuniones
	 * 
	 * @param cSesion
	 *            El n�mero de la sesi�n correspondiente
	 * @return Cat�logo de temas
	 * @throws Exception
	 */
	public List<CActSesion> searchActividades(Short cSesion) throws Exception {
		CActSesionExample criteria = new CActSesionExample();
		criteria.createCriteria().andCSesionEqualTo(cSesion);
		criteria.setOrderByClause("c_actividad");
		List<CActSesion> actividades = cActSesionDAO.selectByExample(criteria);

		return actividades;
	}

	/**
	 * Obtiene el listado de las entidades federativas seleccionadas
	 * 
	 * @return Listado de entidades federativas
	 * @throws Exception
	 */
	public List<CEntidad> searchEntidades() throws Exception {
		CEntidadExample criteria = new CEntidadExample();
		List<CEntidad> entidades = cEntidadDAO.selectByExample(criteria);
		return entidades;
	}

	/**
	 * Obtiene el listado de las entidades federativas seleccionadas
	 * 
	 * @param idEnt
	 * @return La entidad federativa
	 * @throws Exception
	 */
	public CEntidad searchEntidad(Short idEnt) throws Exception {
		CEntidad entidad = cEntidadDAO.selectByPrimaryKey(idEnt);

		return entidad;
	}

	/**
	 * Trae los municipios dado una entidad federativa
	 * 
	 * @param idEnt
	 *            Clave de la entidad Federativa
	 * @return Listado de los municipios
	 * @throws Exception
	 */
	public List<CMunicipio> searchMunicipios(Short idEnt) throws Exception {
		CMunicipioExample criteria = new CMunicipioExample();
		criteria.createCriteria().andIdEntidadfedEqualTo(idEnt);
		criteria.setOrderByClause("nom_municipio");
		List<CMunicipio> municipios = cMunicipioDAO.selectByExample(criteria);

		return municipios;
	}

	/**
	 * Trae las localidades dado una entidad federativa y municipio
	 * 
	 * @param idEnt
	 *            Clave de la entidad Federativa
	 * @param idMun
	 *            Clave del municipio
	 * @return Listado de Localidades
	 * @throws Exception
	 */
	public List<CLocalidadConafe> searchLocalidades(Short idEnt, Integer idMun)
			throws Exception {
		CLocalidadConafeExample criteria = new CLocalidadConafeExample();
		criteria.createCriteria().andIdEntidadfedEqualTo(idEnt)
				.andIdMunicipioEqualTo(idMun)
				.andStatusEqualTo("1")
				;
		criteria.setOrderByClause("nom_localidad");
		List<CLocalidadConafe> localidades = cLocalidadConafeMapper
				.selectByExample(criteria);
		criteria.setOrderByClause("");
		return localidades;
	}

	/**
	 * Obtiene el listado de los CCTs de una localidad dada
	 * 
	 * @param cveEntidadfed
	 *            Clave de la entidad Federativa
	 * @param cveMunicipio
	 *            Clave del municipio
	 * @param cveLocalidad
	 *            Clave de la localidad
	 * @return Listado de CCTs de una localidad
	 * @throws Exception
	 */

	public List<CCctLight> searchCCtsPorLocalidad(Short idEnt, Integer idMun,
			Integer idLoc) throws Exception {

		Map<String, String> params = new HashMap<String, String>();

		params.put("idEnt", idEnt + "");
		params.put("idMun", idMun + "");
		params.put("idLoc", idLoc + "");
		List<CCctLight> cCCts = cCctMapperDAO.selectCCtsPorLocalidad(params);
		return cCCts;
	}

	/**
	 * Obtiene el listado de los CCTs de una localidad dada
	 * 
	 * @param cCct
	 *            Clave interna del Centro Escolar
	 * @return Listado de CCTs de una localidad
	 * @throws Exception
	 */
	public List<CCct> searchCCtsPorLocalidad(Integer cCct) throws Exception {
		/*
		 * Map<String,String> params = new HashMap<String,String>();
		 * params.put("c_cct",cCct+""); params.put("cve_dep_nor",
		 * Constants.CVE_DEP_NOR); List<CCct> cCCts =
		 * cCctDAO.selectCCtsPorLocalidad(params);
		 * 
		 * return cCCts;
		 */
		return new ArrayList<CCct>();
	}

	/**
	 * Obtiene la informaci�n del CCT dada la clave interna
	 * 
	 * @param cCct
	 * @return
	 * @throws Exception
	 */
	public CCct selectCCct(Integer cCct) throws Exception {

		CCctExample criteria = new CCctExample();
		criteria.createCriteria().andCCctEqualTo(cCct)
				.andCveDepNorNotEqualTo(Constants.CVE_DEP_NOR);
		// El CCT debe ser del tipo CONAFE

		List<CCct> cCctList = cCctDAO.selectByExample(criteria);

		// Si no est� dado de alta el CCT en el cat�logo, regresa un POJO vac�o
		if (cCctList.size() == 0)
			return new CCct();

		return cCctList.get(0);

	}

	/**
	 * Obtiene la informaci�n del CCT dada la clave del centro de trabajo
	 * 
	 * @param cveCct
	 * @return
	 * @throws Exception
	 */
	public List<CCct> selectCCct(String cveCct, String userName)
			throws Exception {
		log.debug("userName: " + userName);

		String userNumber = (userName == null || userName.trim().equals("")) ? ""
				: userName.substring(0, 2);

		// El usuario consulta un CT que no corresponde a su entidad
		if (userNumber.length() > 2 && userNumber.matches("[0-9]{2}")
				&& new Short(userNumber) > 0
				&& new Short(userNumber) <= 32
				&& // Pertenece a alguna entidad
				!new Short(userNumber)
						.equals(new Short(cveCct.substring(0, 2)))) {
			throw new ErrorNegocio(new Object[] { cveCct },
					"servicios.catalogos.consulta.entidad.erronea");
		}

		try {
			CCctExample criteria = new CCctExample();
			criteria.createCriteria().andCveCctEqualTo(cveCct)
					.andCveDepNorNotEqualTo(Constants.CVE_DEP_NOR)
					.andStatusCctNotEqualTo(Constants.ESTATUS_BAJA);
			List<CCct> ccts = cCctDAO.selectByExample(criteria);
		
			return ccts;

		} catch (Exception e) {
			throw new ErrorInfraestructura(e, "servicios.catalogos.consulta",
					new Object[] {});
		}

	}

	/**
	 * Trae el catálogo de mejoras manifestadas en las reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	public List<CMejoraCct> searchMejorasCct() throws Exception {

		CMejoraCctExample criteria = new CMejoraCctExample();
		List<CMejoraCct> mejoras = cMejoraDAO.selectByExample(criteria);

		return mejoras;

	}

	/**
	 * Trae el catálogo de planeacion que pueden seleccionar en las reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	public List<CPlaneacion> searchPlaneacion() throws Exception {

		CPlaneacionExample criteria = new CPlaneacionExample();
		List<CPlaneacion> planeaciones = cPlaneacionDAO
				.selectByExample(criteria);

		return planeaciones;
	}

	/**
	 * Trae el catálogo de nivel educativo que pueden seleccionar en las
	 * reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	public List<CNiveleduc> searchNivelEduc() throws Exception {

		CNiveleducExample criteria = new CNiveleducExample();
		List<CNiveleduc> niveles = cNivelDAO.selectByExample(criteria);

		return niveles;
	}

	/**
	 * Trae el catálogo de nivel educativo conafe que pueden seleccionar en las
	 * reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	public List<CNiveleducConafe> searchNiveleducConafe(Short tipoMiembro)
			throws Exception {

		CNiveleducConafeExample criteria = new CNiveleducConafeExample();
		criteria.createCriteria().andCTipoMiembroEqualTo(tipoMiembro);

		return cNivelConafeDAO.selectByExample(criteria);

	}

	/**
	 * Trae el catálogo de los grados del centro escolar
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	public List<CGrado> searchGrado() throws Exception {

		CGradoExample criteria = new CGradoExample();
		List<CGrado> grados = cGradoDAO.selectByExample(criteria);

		return grados;
	}

	/**
	 * Trae el catálogo de las opciones de programas, compromisos y comites
	 * 
	 * @return Catalogo de opciones
	 * @throws Exception
	 */

	public List<COpcionesCat> searchOpciones() throws Exception {

		COpcionesCatExample criteria = new COpcionesCatExample();
		
		List<COpcionesCat> opciones = cOpcionesCatDAO.selectByExample(criteria);

		return opciones;
	}

	
	/**
	 * Trae el catálogo de las sesiones del centro escolar
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	public List<CSesion> searchSesion() throws Exception {

		CSesionExample criteria = new CSesionExample();
		criteria.createCriteria()
				.andTpoSesionIn(Constants.C_SESION_TIPO_REPUCE);
		List<CSesion> sesiones = cSesionDAO.selectByExample(criteria);

		return sesiones;

	}

	/**
	 * Trae el catálogo de las reuniones del CONAFE
	 * 
	 * @return Catalogo de reuniones CONAFE
	 * @throws Exception
	 */
	public List<CReunion> searchReunionesCONAFE() throws Exception {

		CReunionExample example = new CReunionExample();
		List<CReunion> reuniones = cReunionMapper.selectByExample(example);

		return reuniones;

	}

	/**
	 * Trae el catálogo de lacalidad de los integrantes
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	public List<CCalidadInt> searchCalidadInt() throws Exception {

		CCalidadIntExample criteria = new CCalidadIntExample();
		List<CCalidadInt> calidad_integrantes = cCalidadIntegranteDAO
				.selectByExample(criteria);

		return calidad_integrantes;

	}

	/**
	 * Trae el catálogo de eventos manifestados en las reuniones
	 * 
	 * @param tipoPrograma
	 *            El tipo de evento que se trate 1: REPUCE, 2: CONAFE
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	public List<CEvento> searchEventos() throws Exception {

		CEventoExample criteria = new CEventoExample();
		List<CEvento> eventos = cEventoDAO.selectByExample(criteria);

		return eventos;

	}

	/**
	 * Trae el catálogo de los compromisos de la prueba enlace manifestados en
	 * las reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	public List<CCompEnlace> searchCompromisosEnlace() throws Exception {

		CCompEnlaceExample criteria = new CCompEnlaceExample();
		List<CCompEnlace> compromisos = cCompromisoEnlaceDAO
				.selectByExample(criteria);

		return compromisos;
	}

	/**
	 * Actualiza la informacion del director, telefono y mail y extension CCT.
	 * 
	 * @return Numero de elementos actualizados
	 * @throws Exception
	 */
	public int updateCCct(CCct cCct) throws Exception {
		CCct cCctUpdateInfo = new CCct();
		cCctUpdateInfo.setcCct(cCct.getcCct());
		cCctUpdateInfo.setNomDirector(cCct.getNomDirector());
		cCctUpdateInfo.setMailCct(cCct.getMailCct());
		cCctUpdateInfo.setTelCct(cCct.getTelCct());
		cCctUpdateInfo.setTelExtCct(cCct.getTelExtCct());
		int numRecords = cCctDAO.updateByPrimaryKeySelective(cCctUpdateInfo);
		return numRecords;
	}

	/**
	 * Se carga los elementos del catálogo de diferencias.
	 * 
	 * @return Lista de diferencias de un tipo
	 * @throws Exception
	 */
	public List<CDiferenciaPgr> searchCDiferenciaPgr(Short tipoDiferencia)
			throws Exception {
		CDiferenciaPgrExample cDiferenciaPgrExample = new CDiferenciaPgrExample();
		cDiferenciaPgrExample.createCriteria().andTipoDiferenciaEqualTo(
				tipoDiferencia);
		return cDiferenciaPgrMapper.selectByExample(cDiferenciaPgrExample);

	}

	public List<CApoyo> searchApoyosPorTipo(Short idTipoApoyo, Short idReunion)
			throws Exception {
		List<CApoyo> apoyos = new ArrayList<CApoyo>();
		CApoyoExample cApoyoExample = new CApoyoExample();
		cApoyoExample.createCriteria().andCTipoApoyoEqualTo(idTipoApoyo);

		cApoyoExample.setOrderByClause("c_apoyo");
		apoyos = cApoyoMapper.selectByExample(cApoyoExample);
		for (CApoyo registro : apoyos) {

			if (!(registro.getSiempreVisible() == true || registro
					.getVisibleEnReunion().intValue() == idReunion.intValue())) {
				apoyos.remove(registro);
			}

		}
		return apoyos;
	}

	
	
	
	public List<CApoyo2> searchApoyosPorTipo2(Integer idTipoApoyo)
			throws Exception {
		System.out.println("entro a la implementacion de tipo 2");
		System.out.println("id "+idTipoApoyo);
		
		
		CApoyo2Example cApoyo2Example = new CApoyo2Example();
		List<CApoyo2> apoyos =cApoyo2.selectByExample(cApoyo2Example);

		
		System.out.println("tamaño "+apoyos.size());
        return apoyos;
	}
	
	
	
	public List<CDiagnosticoCom> searchDiagnosticoComunitario(
			Short idTipoDiagnostico) throws Exception {

		CDiagnosticoComExample cDiagnosticoComExample = new CDiagnosticoComExample();
		cDiagnosticoComExample.createCriteria().andCTipoDiagnosticoComEqualTo(
				idTipoDiagnostico);
		return cDiagnosticoComMapper.selectByExample(cDiagnosticoComExample);

	}

	public List<CPoblacionIndigena> searchPoblacionIndigena() throws Exception {
		CPoblacionIndigenaExample cPoblacionIndigenaExample = new CPoblacionIndigenaExample();
		return cPoblacionIndigenaMapper
				.selectByExample(cPoblacionIndigenaExample);
	}

	public List<CLengua> searchLenguasIndigenas() throws Exception {
		return cLenguaMapper.selectByExample(null);
	}

	public List<CAccion> searchAccionesPorTipo(Short idTipoAccion,
			Short reunionVisible) throws Exception {
		List<CAccion> acciones = new ArrayList<CAccion>();
		List<CAccion> accionesFinales = new ArrayList<CAccion>();
		CAccionExample cAccionExample = new CAccionExample();
		cAccionExample.createCriteria().andCTipoAccionEqualTo(idTipoAccion);
		cAccionExample.setOrderByClause("c_tipo_accion");
		acciones = cAccionMapper.selectByExample(cAccionExample);

		for (CAccion registro : acciones) {

			if ((registro.getSiempreVisible() == true || registro
					.getVisibleEnReunion().intValue() == reunionVisible
					.intValue())) {
				accionesFinales.add(registro);
			}

		}
		return accionesFinales;
	}

	public List<CAccion> searchAcciones(Short reunionVisible) throws Exception {

		List<CAccion> acciones = new ArrayList<CAccion>();
		List<CAccion> accionesFinales = new ArrayList<CAccion>();
		acciones = cAccionMapper.selectByExample(null);

		for (CAccion registro : acciones) {

			if ((registro.getSiempreVisible() == true || registro
					.getVisibleEnReunion().intValue() == reunionVisible
					.intValue())) {
				accionesFinales.add(registro);
			}

		}
		return accionesFinales;

	}

	public List<CAccion> searchAccionesExcluirTipo(Short idTipoAccion,
			Short reunionVisible) throws Exception {
		List<CAccion> acciones = new ArrayList<CAccion>();
		List<CAccion> accionesFinales = new ArrayList<CAccion>();
		CAccionExample cAccionExample = new CAccionExample();
		cAccionExample.createCriteria().andCTipoAccionNotEqualTo(idTipoAccion);
		cAccionExample.setOrderByClause("c_tipo_accion");

		acciones = cAccionMapper.selectByExample(cAccionExample);

		for (CAccion registro : acciones) {

			if ((registro.getSiempreVisible() == true || registro
					.getVisibleEnReunion().intValue() == reunionVisible
					.intValue())) {
				accionesFinales.add(registro);
			}

		}
		return accionesFinales;

	}

	public List<CTipoAccion> searchTipoAccion(boolean excluirApoyos)
			throws Exception {
		CTipoAccionExample cTipoAccionExample = new CTipoAccionExample();
		cTipoAccionExample.setOrderByClause("c_tipo_accion");
		if (excluirApoyos == true) {
			cTipoAccionExample.createCriteria().andCTipoAccionNotEqualTo(
					Constants.C_APOYO_PERMANENCIA);
		}

		return cTipoAccionMapper.selectByExample(cTipoAccionExample);
	}

	public List<CSeccionRegistro> searchSeccionesRegistro(Short reunion)
			throws Exception {
		CSeccionRegistroExample criterio = new CSeccionRegistroExample();
		criterio.createCriteria().andCReunionEqualTo(reunion);
		return cSeccionRegistroMapper.selectByExample(criterio);
	}

	public List<CRespuesta> searchRespuestaPorTipo(Short idTipoRespuesta)
			throws Exception {
		CRespuestaExample cRespuestaExample = new CRespuestaExample();
		cRespuestaExample.createCriteria().andCTipoRespuestaEqualTo(
				idTipoRespuesta);
		cRespuestaExample.setOrderByClause("c_Respuesta");
		return cRespuestaMapper.selectByExample(cRespuestaExample);
	}

	public List<CAccion> searchAccionesPorTipoYReunion(Short idTipoAccion,
			Short idReunion) throws Exception {

		List<CAccion> acciones = new ArrayList<CAccion>();
		CAccionExample cAccionExample = new CAccionExample();
		cAccionExample.createCriteria().andCTipoAccionEqualTo(idTipoAccion)
				.andVisibleEnReunionEqualTo(idReunion);
		cAccionExample.setOrderByClause("c_accion");
		acciones = cAccionMapper.selectByExample(cAccionExample);

		return acciones;
	}

	public List<CApoyo> searchApoyosPorTipoYReunion(Short idTipoApoyo,
			Short idReunion) throws Exception {
		List<CApoyo> apoyos = new ArrayList<CApoyo>();
		CApoyoExample cApoyoExample = new CApoyoExample();
		cApoyoExample.createCriteria().andCTipoApoyoEqualTo(idTipoApoyo)
				.andVisibleEnReunionEqualTo(idReunion);

		cApoyoExample.setOrderByClause("c_apoyo");
		apoyos = cApoyoMapper.selectByExample(cApoyoExample);
		return apoyos;
	}
	
	public List<CDesercion> searchCriteriosDesercion() throws Exception{
		return cDesercionMapper.selectByExample(null);	
	}
	
	public Integer searchMaxIdInstructor(Integer cApec){
		Integer maxId=null;
		
		maxId= apecReunionInstructorMapperCstm.selectIdInstructorMaximo(cApec);
		
		if(maxId==null){
			maxId=0;
		}
		
		return maxId;
	}
	//conafe susana
	
	public List<CCoTipoBullying> searchTipoBullying() throws Exception {
		CCoTipoBullyingExample CCoTipoBullyingExample = new CCoTipoBullyingExample();
		return cCoTipoBullyingMapper.selectByExample(CCoTipoBullyingExample);
				
	}
	
	
	public List<CCoNee> searchNee() throws Exception {
		CCoNeeExample CCoNeeExample = new CCoNeeExample();
		return cCoNeeMapper.selectByExample(CCoNeeExample);
				
	}
	

	public List<CCoBullying> searchBullying() throws Exception {
		CCoBullyingExample CCoBullyingExample = new CCoBullyingExample();
		return cCoBullyingMapper.selectByExample(CCoBullyingExample);
	}
	

	public List<CCoBullying> searchBullyingPorTipo(Short idTipoBullying,
			Short reunionVisible) throws Exception {
		List<CCoBullying> bullying = new ArrayList<CCoBullying>();
		List<CCoBullying> bullyingFinales = new ArrayList<CCoBullying>();
		CCoBullyingExample cCoBullyingExample = new CCoBullyingExample();
		cCoBullyingExample.createCriteria().andCCoTipoBullyingEqualTo(idTipoBullying);
		cCoBullyingExample.setOrderByClause("c_co_tipo_bullying");
		bullying = cCoBullyingMapper.selectByExample(cCoBullyingExample);

		for (CCoBullying registro : bullying) {

			if ((registro.getSiempreVisible() == true || registro
					.getVisibleEnReunion().intValue() == reunionVisible
					.intValue())) {
				bullyingFinales.add(registro);
			}

		}
		return bullyingFinales;
	}

	public ConConsejoCstm searchConsejo(Integer cCct) throws Exception {
		System.out.println("llego a la implementacion y esto trae cct-----"+ cCct);
		ConConsejoCstm numero=conConsejoMapper.selectConConsejo(cCct);
         System.out.println("esto trae despues de metodo-----"+ numero.getNumero());
		return numero;
	}

	public ValidacionNombreHijoVO searchValidacionHijo(Integer cCct) throws Exception {
		
		ValidacionNombreHijoVO validar=validacionNombreHijoMapper.selectNombreHijo(cCct);
		
		return validar;
	}

	public ValidacionSegundaSesionVO searchValidadPaloma(Integer cCct) throws Exception {
		
		ValidacionSegundaSesionVO validarPaloma=validaPaloma2SesionMapper.selectValidadPaloma(cCct);
		
		return validarPaloma;
	}
	
	public List<ConProgramasYComitesCstm> selectConProgramasYComites(Integer cCct)
			throws Exception {
		System.out.println("llego a la implementacion en el metodo busca programa y comites y esto trae cct-----"+ cCct);
		List<ConProgramasYComitesCstm> datos=conProgramasYComitesMapper.selectConProgramasYComites(cCct);
		return  datos;
	}

	
	public List<CEstimulos> searchEstimulos() throws Exception {

        CEstimulosExample criteria = new CEstimulosExample();
        List<CEstimulos> estimulos = cEstimulosDAO.selectByExample(criteria);

        return estimulos;
  }      
	public int saveDenuncia(CeDenunciaVO ceDenuncia) {
		int numRecords = -1;
		
		CeDenuncia ceDenuncia1 = new CeDenuncia();
			System.out.println("llego al que guarda");
		
			ceDenuncia1.setCct(ceDenuncia.getCct());
			ceDenuncia1.setNombre(ceDenuncia.getNombre());
			ceDenuncia1.setEntidad(ceDenuncia.getEntidad());
			ceDenuncia1.setLocalidad(ceDenuncia.getLocalidad());
			ceDenuncia1.setMunicipio(ceDenuncia.getMunicipio());
			ceDenuncia1.setObservaciones(ceDenuncia.getObservaciones());
			ceDenuncia1.setReporte(ceDenuncia.getReporte());
			ceDenuncia1.setNombrecct(ceDenuncia.getNombrecct());
			ceDenuncia1.setApellidopaterno(ceDenuncia.getApellidopaterno());
			ceDenuncia1.setApellidomaterno(ceDenuncia.getApellidomaterno());
			ceDenuncia1.setCorreo(ceDenuncia.getCorreo());
			ceDenuncia1.setOcupacion(ceDenuncia.getOcupacion());
			ceDenuncia1.setEdad(ceDenuncia.getEdad());
			ceDenuncia1.setSexo(ceDenuncia.getSexo());
			ceDenuncia1.setAnonimo(ceDenuncia.getAnonimo());
			ceDenuncia1.setFchRegistro(new Date());
		
			numRecords=	ceDenunciaMapper.insert(ceDenuncia1);
		
		
		return numRecords;

	}

	public List<DatosEscuelaVO> searchEscuela(DatosVO datos) throws Exception {
		System.out.println("entro a la implementacion de escuelas");
    List<DatosEscuelaVO>  validar= validaEscuelaMapper.selectEscuelas(datos.getIdEnt(),datos.getIdMun());
		
		return validar;
	}
	
	public List<DatosEscuelaVO> searchEscuela2(Datos2VO datos) throws Exception {
		System.out.println("entro a la implementacion de escuelas");
    List<DatosEscuelaVO>  validar= validaEscuelaMapper.selectEscuelas2(datos.getIdEnt(),datos.getIdMun(),datos.getcNivel());
		
		return validar;
	}
	
	public List<DatosEscuelaPorLocyMunVO> searchTipoEscuelas(DatosVO datos) throws Exception {
		System.out.println("entro a la implementacion de escuelas");
    List<DatosEscuelaPorLocyMunVO>  validar= validaEscuelaMapper.selectTipoEscuelas(datos.getIdEnt(),datos.getIdMun());
		
		return validar;
	}
	
	
	public List<CRuta> searchRuta() throws Exception {

		CRutaExample criteria = new CRutaExample();
		List<CRuta> ruta = cRutaDAO.selectByExample(criteria);

		return ruta;

	}

	public List<CInformeFinal> searchOpcionesFinal() throws Exception {
	
		
		CInformeFinalExample criteria = new CInformeFinalExample();
		
		List<CInformeFinal> opciones = cInformeFinalDAO.selectByExample(criteria);

		return opciones;
	}

}
