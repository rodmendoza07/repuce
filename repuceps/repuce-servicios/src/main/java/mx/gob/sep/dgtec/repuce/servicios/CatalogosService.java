package mx.gob.sep.dgtec.repuce.servicios;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import mx.gob.sep.dgtec.repuce.model.ApecDesercionCstm;
import mx.gob.sep.dgtec.repuce.model.CAccion;
import mx.gob.sep.dgtec.repuce.model.CActSesion;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.model.CApoyo2;
import mx.gob.sep.dgtec.repuce.model.CCalidadInt;
import mx.gob.sep.dgtec.repuce.model.CCargoInt;
import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CCoBullying;
import mx.gob.sep.dgtec.repuce.model.CCoNee;
import mx.gob.sep.dgtec.repuce.model.CCoTipoBullying;
import mx.gob.sep.dgtec.repuce.model.CComite;
import mx.gob.sep.dgtec.repuce.model.CCompEnlace;
import mx.gob.sep.dgtec.repuce.model.CDesercion;
import mx.gob.sep.dgtec.repuce.model.CDiagnosticoCom;
import mx.gob.sep.dgtec.repuce.model.CDiferenciaPgr;
import mx.gob.sep.dgtec.repuce.model.CEntidad;
import mx.gob.sep.dgtec.repuce.model.CEstimulos;
import mx.gob.sep.dgtec.repuce.model.CEvento;
import mx.gob.sep.dgtec.repuce.model.CGrado;
import mx.gob.sep.dgtec.repuce.model.CInformeFinal;
import mx.gob.sep.dgtec.repuce.model.CLengua;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafe;
import mx.gob.sep.dgtec.repuce.model.CMejoraCct;
import mx.gob.sep.dgtec.repuce.model.CMunicipio;
import mx.gob.sep.dgtec.repuce.model.CNiveleduc;
import mx.gob.sep.dgtec.repuce.model.CNiveleducConafe;
import mx.gob.sep.dgtec.repuce.model.CObjetivos;
import mx.gob.sep.dgtec.repuce.model.COpcionesCat;
import mx.gob.sep.dgtec.repuce.model.CPlaneacion;
import mx.gob.sep.dgtec.repuce.model.CPoblacionIndigena;
import mx.gob.sep.dgtec.repuce.model.CPrograma;
import mx.gob.sep.dgtec.repuce.model.CProgramaEscolar;
import mx.gob.sep.dgtec.repuce.model.CRespuesta;
import mx.gob.sep.dgtec.repuce.model.CReunion;
import mx.gob.sep.dgtec.repuce.model.CRuta;
import mx.gob.sep.dgtec.repuce.model.CSeccionRegistro;
import mx.gob.sep.dgtec.repuce.model.CSesion;
import mx.gob.sep.dgtec.repuce.model.CTipoAccion;
import mx.gob.sep.dgtec.repuce.vo.CeDenunciaVO;
import mx.gob.sep.dgtec.repuce.model.CeEstimulos;
import mx.gob.sep.dgtec.repuce.model.ConConsejoCstm;
import mx.gob.sep.dgtec.repuce.model.ConProgramasYComitesCstm;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;
import mx.gob.sep.dgtec.repuce.vo.Datos2VO;
import mx.gob.sep.dgtec.repuce.vo.DatosEscuelaPorLocyMunVO;
import mx.gob.sep.dgtec.repuce.vo.DatosEscuelaVO;
import mx.gob.sep.dgtec.repuce.vo.DatosVO;
import mx.gob.sep.dgtec.repuce.vo.ValidacionNombreHijoVO;
import mx.gob.sep.dgtec.repuce.vo.ValidacionSegundaSesionVO;


/**
 * Clase para el acceso de los usuarios al sistema
 * @Descripcion: Refactor al nombre de interfaz
 */
@SuppressWarnings("unused")
public interface CatalogosService {

	/**
	 * Trae los programas Educativos para Centros CONAFE
	 * @return Catalogo de Programas Escolares para CONAFE
	 * @throws Exception
	 */
	List<CProgramaEscolar> searchProgramasEducativos() throws Exception;
	
	/**
	 * Trae los cargos que pueden ostentar los integrantes del APASE
	 * @param tipoCargo Identifica que cargo de consejero se solicita 
	 *  null: REPUCE, 'CE': CONAFE
	 * @return Catalogo de cargos de los integrantes
	 * @throws Exception
	 */
	List<CCargoInt> searchCargos(String tipoCargo)  throws Exception;

	/**
	 * Trae el catálogo de los Comités manifestados en las reuniones
	 * @param tipoComite Tipo comite 1: REPUCE, 2: CONAFE
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	List<CComite> searchComites(String tipoComite)  throws Exception;
	
	/**
	 * Trae el catálogo de los Comités para un CCT dado
	 * @param cCct Clave del centro escolar
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	public List<CComite> searchComitesCct(Integer cCct)  throws Exception;


	/**
	 * Trae el catálogo de los Comités para un CCT dado
	 * @param cComite La ifnromación del comite a editar o insertar
	 * @return el numero de registros actualizados
	 * @throws Exception
	 */
	public int saveComiteCct(CComite cComite, String currentUser)  throws Exception;
	
	/**
	 * Elimina la entrada de catálogo del  Comités para un CCT dado
	 * @param cComite La clave del comité a eliminar
	 * @param currentUser La clave del usuario que requiere eliminar el comité
	 * @return el numero de registros eliminados
	 * @throws Exception
	 */
	public int deleteComitesCct(List<Integer> comites, String currentUser)  throws Exception;
	
	/**
	 * Trae el catálogo de programas manifestados en las reuniones
	 * @param tipoPrograma El tipo de programa que se trate
	 * 1-4: REPUCE, 5-7: CONAFE 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	List<CPrograma> searchProgramas(Short tipoPrograma)  throws Exception;
	
	
	public List<CObjetivos> searchObjetivos() throws Exception;
	
	/**
	 * Trae los temas (Actividades) tratados en las reuniones
	 * @param cSesion El numero de la sesion correspondiente
	 * @return Catalogo de temas
	 * @throws Exception
	 */
	List<CActSesion> searchActividades(Short cSesion)  throws Exception;

	/**
	 * Obtiene el listado de las entidades federativas seleccionadas
	 * @return Listado de entidades federativas
	 * @throws Exception
	 */
	public List<CEntidad> searchEntidades()  throws Exception;
	
	/**
	 * Obtiene el listado de las entidades federativas seleccionadas
	 * @param idEnt 
	 * @return La entidad federativa
	 * @throws Exception
	 */
	public CEntidad searchEntidad(Short idEnt)  throws Exception;	

	/**
	 * Trae los municipios dado una entidad federativa
	 * @param idEnt Clave de la entidad Federativa 
	 * @return Listado de los municipios
	 * @throws Exception
	 */
	public List<CMunicipio> searchMunicipios(Short idEnt)  throws Exception;
	
	/**
	 * Trae las localidades conafe dado una entidad federativa y municipio
	 * @param idEnt Clave de la entidad Federativa 
	 * @param idMun Clave del municipio 
	 * @return Listado de Localidades
	 * @throws Exception
	 */
	public List<CLocalidadConafe> searchLocalidades(Short idEnt, Integer idMun)  throws Exception;
	
	/**
	 * Obtiene el listado de los CCTs de una localidad dada
	 * @param cveEntidadfed Clave de la entidad Federativa 
	 * @param cveMunicipio Clave del municipio
	 * @param cveLocalidad Clave de la localidad 
	 * @return Listado de CCTs de una localidad
	 * @throws Exception
	 */
	public List<CCctLight> searchCCtsPorLocalidad(Short idEnt, Integer idMun, Integer idLoc)  throws Exception;

	/**
	 * Obtiene la informacian del CCT dada la clave interna
	 * @param cCct
	 * @return
	 * @throws Exception
	 */
	public CCct selectCCct(Integer cCct) throws Exception;

	/**
	 * Obtiene la informacian del CCT dada la clave del centro de trabajo
	 * @param cveCct
	 * @param userName
	 * @return
	 * @throws Exception
	 */
	public List <CCct> selectCCct(String cveCct, String userName) throws Exception;
	
	
	/**
	 * Trae el catálogo de eventos manifestados en las reuniones
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
		
	public List <CEvento> searchEventos()  throws Exception;
	
	
	/**
	 * Trae el catálogo de mejoras manifestadas en las reuniones
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
		
	public List <CMejoraCct> searchMejorasCct()  throws Exception;
	
	

	/**
	 * Trae el catálogo de planeacion que pueden seleccionar en las reuniones
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
		
	public List<CPlaneacion> searchPlaneacion()  throws Exception;
	
	
	
	/**
	 * Trae el catálogo de nivel educativo que pueden seleccionar en las reuniones
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
		
	public List <CNiveleduc> searchNivelEduc()  throws Exception;
	
	/**
	 * Trae el catálogo de nivel educativo Conafe que pueden seleccionar en las reuniones
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	
	
	
    public List <CNiveleducConafe> searchNiveleducConafe(Short tipoMiembro)  throws Exception;
	
	
	 /**
	  * Trae el catálogo de los grados del centro escolar
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
		
	public List <CGrado> searchGrado()  throws Exception;
	
	/**
	  * Trae el catálogo de los grados del centro escolar
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
		
	public List <COpcionesCat> searchOpciones()  throws Exception;	
	
	/**
	 * Trae el catálogo de las sesiones del centro escolar
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	public List <CSesion> searchSesion()  throws Exception;
	
	/**
	 * Trae el catálogo de las reuniones del CONAFE
	 * @return Catalogo de reuniones CONAFE
	 * @throws Exception
	 */
	public List <CReunion> searchReunionesCONAFE()  throws Exception;
	
	/**
	 * Trae el catálogo de la calidad de los integrantes
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	public List <CCalidadInt> searchCalidadInt()  throws Exception;
		
	/**
	 * Trae el catálogo de los compromisos de la prueba enlace
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	public List<CCompEnlace> searchCompromisosEnlace() throws Exception;
	
	
	/**
	 * Actualiza la informacion del director, telefono y mail y extension CCT.
	 * @return Numero de elementos actualizados  
	 * @throws Exception
	 */
	public int updateCCct(CCct cCct) throws Exception;
	
	/**
	 * Se carga los elementos del catálogo de diferencias.
	 * @return Lista de diferencias de un tipo  
	 * @throws Exception
	 */
	public List<CDiferenciaPgr> searchCDiferenciaPgr(Short tipoDiferencia)
			throws Exception;
	
	public List<CApoyo> searchApoyosPorTipo(Short idTipoApoyo,Short idReunion) throws Exception;
	public List<CApoyo2> searchApoyosPorTipo2(Integer idTipoApoyo) throws Exception;
	
	public List<CDiagnosticoCom> searchDiagnosticoComunitario(Short idTipoDiagnostico) throws Exception;
	
	public List<CPoblacionIndigena> searchPoblacionIndigena() throws Exception;
	public List<CLengua> searchLenguasIndigenas() throws Exception;
	public List<CAccion> searchAccionesPorTipo(Short idTipoAccion,Short idReunion) throws Exception;
	public List<CTipoAccion> searchTipoAccion(boolean excluirApoyos) throws Exception;
	public List<CSeccionRegistro> searchSeccionesRegistro(Short reunion) throws Exception;
	public List<CAccion> searchAccionesExcluirTipo(Short idTipoAccion,Short idReunion) throws Exception;
	public List<CAccion> searchAcciones(Short idReunion) throws Exception;
	public List<CRespuesta> searchRespuestaPorTipo(Short idTipoRespuesta) throws Exception;
	public List<CAccion> searchAccionesPorTipoYReunion(Short idTipoAccion,Short idReunion) throws Exception;
	public List<CApoyo> searchApoyosPorTipoYReunion(Short idTipoApoyo,Short idReunion) throws Exception;
	public List<CDesercion> searchCriteriosDesercion() throws Exception;
	public Integer searchMaxIdInstructor(Integer cApec)throws Exception;
	
	//conafe susana
	public List<CCoNee> searchNee() throws Exception; 
	public List<CCoBullying> searchBullying() throws Exception;
	public List<CCoTipoBullying> searchTipoBullying() throws Exception;
	public List<CCoBullying> searchBullyingPorTipo(Short idTipoBullying,Short idReunion) throws Exception;
	
	//verifica si tiene consejo o no
	public ConConsejoCstm searchConsejo(Integer cCct)  throws Exception;
	//muestra programa federales y comites del cct en la seccion busca tu escuela
	public List<ConProgramasYComitesCstm> selectConProgramasYComites(Integer cCct) throws Exception;
	
	public ValidacionNombreHijoVO searchValidacionHijo(Integer cCct)  throws Exception;
	public ValidacionSegundaSesionVO searchValidadPaloma(Integer cCct)  throws Exception;
	
	public List <CEstimulos> searchEstimulos()  throws Exception;

	//public int saveDenuncia(CeDenuncia ceDenuncia);
	public int saveDenuncia(CeDenunciaVO ceDenuncia);

	public List<DatosEscuelaVO> searchEscuela(DatosVO datos)  throws Exception;
	public List<DatosEscuelaPorLocyMunVO> searchTipoEscuelas(DatosVO datos)  throws Exception;
	public List<DatosEscuelaVO> searchEscuela2(Datos2VO datos)  throws Exception;

	public List <CRuta> searchRuta()  throws Exception;
	
	
   public List <CInformeFinal> searchOpcionesFinal()  throws Exception;	
	

}

