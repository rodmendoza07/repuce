package mx.gob.sep.dgtec.repuce.web.controller;

import java.awt.PageAttributes.MediaType;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import mx.gob.sep.dgtec.repuce.model.CAccion;
import mx.gob.sep.dgtec.repuce.model.CActSesion;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.model.CApoyo2;
import mx.gob.sep.dgtec.repuce.model.CCargoInt;
import mx.gob.sep.dgtec.repuce.model.CCct;
import mx.gob.sep.dgtec.repuce.model.CCoBullying;
import mx.gob.sep.dgtec.repuce.model.CCoNee;
import mx.gob.sep.dgtec.repuce.model.CCoTipoBullying;
import mx.gob.sep.dgtec.repuce.model.CComite;
import mx.gob.sep.dgtec.repuce.model.CCompEnlace;
import mx.gob.sep.dgtec.repuce.model.CDesercion;
import mx.gob.sep.dgtec.repuce.model.CDiferenciaPgr;
import mx.gob.sep.dgtec.repuce.model.CEntidad;
import mx.gob.sep.dgtec.repuce.model.CEstimulos;
import mx.gob.sep.dgtec.repuce.model.CEvento;
import mx.gob.sep.dgtec.repuce.model.CInformeFinal;
import mx.gob.sep.dgtec.repuce.model.CLengua;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafe;
import mx.gob.sep.dgtec.repuce.model.CMejoraCct;
import mx.gob.sep.dgtec.repuce.model.CMunicipio;
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
import mx.gob.sep.dgtec.repuce.model.ConConsejoCstm;
import mx.gob.sep.dgtec.repuce.model.ConProgramasYComitesCstm;
import mx.gob.sep.dgtec.repuce.servicios.CatalogosService;
import mx.gob.sep.dgtec.repuce.servicios.MailService;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;
import mx.gob.sep.dgtec.repuce.vo.Datos2VO;
import mx.gob.sep.dgtec.repuce.vo.DatosEscuelaPorLocyMunVO;
import mx.gob.sep.dgtec.repuce.vo.DatosEscuelaVO;
import mx.gob.sep.dgtec.repuce.vo.DatosVO;
import mx.gob.sep.dgtec.repuce.vo.JsonWrapperVO;
import mx.gob.sep.dgtec.repuce.vo.ValidacionNombreHijoVO;
import mx.gob.sep.dgtec.repuce.vo.ValidacionSegundaSesionVO;
import mx.gob.sep.dgtec.seguridad.modelo.UsuarioSeguridad;
import mx.gob.sep.dgtec.seguridad.servicios.UsuarioSeguridadServicio;
import mx.gob.sep.dgtec.seguridad.util.Encripta;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller que provee acceso a las consultas de catalogos.
 * 
 * @author Ismael Rosas
 * 
 */
@Controller
@RequestMapping(value = "/catalogos")
public class CatalogosController {
	private static final Logger log = LoggerFactory
			.getLogger(CatalogosController.class);

	@Autowired
	private CatalogosService catalogosService;

	@Autowired
	private MailService sender;

	@Autowired
	private UsuarioSeguridadServicio usuarioSeguridadServicio;

	@RequestMapping(value = "/cargos/{tipoCargo}", method = RequestMethod.GET)
	@ResponseBody
	public JsonWrapperVO searchCargos(@PathVariable String tipoCargo)
			throws Exception {

		JsonWrapperVO cargosWrap = new JsonWrapperVO();
		List<CCargoInt> cargos = null;

		if (tipoCargo.equals("CE"))
			cargos = catalogosService.searchCargos("CE");
		else
			cargos = catalogosService.searchCargos(null);
		cargosWrap.setIdentifier("cCargo");
		cargosWrap.setLabel("nomCargo");
		cargosWrap.setItems(cargos);

		return cargosWrap;
	}

	@RequestMapping(value = "/ListCct", method = RequestMethod.GET)
	@ResponseBody
	public List<CCct> searchListCct(@RequestParam("cveCct") String cveCct,
			Principal principal) throws Exception {

		final String currentUser = principal == null ? "" : principal.getName();

		List<CCct> cCcts = new ArrayList<CCct>();
		cCcts = catalogosService.selectCCct(cveCct, currentUser);

		return cCcts;

	}

	/**
	 * Trae los programas Educativos para Centros CONAFE
	 * 
	 * @return Catalogo de Programas Escolares para CONAFE
	 * @throws Exception
	 */
	@RequestMapping(value = "/listProgramasEducativos", method = RequestMethod.GET)
	@ResponseBody
	List<CProgramaEscolar> searchProgramasEducativos() throws Exception {
		List<CProgramaEscolar> programasEscolares = new ArrayList<CProgramaEscolar>();

		programasEscolares = catalogosService.searchProgramasEducativos();

		return programasEscolares;
	}

	/**
	 * Trae el cat‡logo de los ComitŽs manifestados en las reuniones
	 * 
	 * @param tipoComite
	 *            Tipo comite 1: REPUCE, 2: CONAFE
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	@RequestMapping(value = "/listComite/{tipoComite}", method = RequestMethod.GET)
	@ResponseBody
	List<CComite> searchComites(@PathVariable String tipoComite)
			throws Exception {

		List<CComite> comites = new ArrayList<CComite>();
		comites = catalogosService.searchComites(tipoComite);
		return comites;
	}

	/**
	 * Trae el catálogo de los Comites particulares a un CCT dado
	 * 
	 * @return Catalogo de comites del CCT
	 * @throws Exception
	 */
	@RequestMapping(value = "/listComiteCct/{cCct}", method = RequestMethod.GET)
	@ResponseBody
	List<CComite> searchComitesCct(@PathVariable Integer cCct) throws Exception {

		List<CComite> comites = new ArrayList<CComite>();
		comites = catalogosService.searchComitesCct(cCct);
		return comites;
	}

	/**
	 * Edita entras en el catálogo de Comités
	 * 
	 * @return Catalogo de comites del CCT
	 * @throws Exception
	 */
	@RequestMapping(value = "/saveComiteCct/", method = RequestMethod.POST)
	@ResponseBody
	public int saveComiteCct(@RequestBody CComite cComite, Principal principal)
			throws Exception {

		final String currentUser = principal == null ? "" : principal.getName();

		return catalogosService.saveComiteCct(cComite, currentUser);
	}

	/**
	 * Elimina el comité de la escuela
	 * 
	 * @return Numero de entradas eliminadas
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteComiteCct/", method = RequestMethod.POST)
	@ResponseBody
	public int deleteComiteCct(@RequestBody List<Integer> comites,
			Principal principal) throws Exception {

		final String currentUser = principal == null ? "" : principal.getName();

		return catalogosService.deleteComitesCct(comites, currentUser);
	}

	/**
	 * Trae el cat‡logo de programas manifestados en las reuniones
	 * 
	 * @param tipoPrograma
	 *            El tipo de programa que se trate 1-4: REPUCE, 5-7: CONAFE
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	@RequestMapping(value = "/listProgramas/{tipoPrograma}", method = RequestMethod.GET)
	@ResponseBody
	List<CPrograma> searchProgramas(@PathVariable Short tipoPrograma)
			throws Exception {
		return catalogosService.searchProgramas(tipoPrograma);

	}

	/**
	 * Trae el cat‡logo de objetivos de programas 
	 * 
	 * @return Catalogo de objetivos de programas
	 * @throws Exception
	 */
	@RequestMapping(value = "/listObjetivos/", method = RequestMethod.GET)
	@ResponseBody
	List<CObjetivos> searchObjetivos()
			throws Exception {
		return catalogosService.searchObjetivos();

	}
	
	/**
	 * Trae los temas (Actividades) tratados en las reuniones
	 * 
	 * @param cSesion
	 *            El numero de la sesion correspondiente
	 * @return Catalogo de temas
	 * @throws Exception
	 */
	@RequestMapping(value = "/listActividades/{cSesion}", method = RequestMethod.GET)
	@ResponseBody
	List<CActSesion> searchActividades(@PathVariable Short cSesion)
			throws Exception {
		return catalogosService.searchActividades(cSesion);
	}

	/**
	 * Obtiene el listado de las entidades federativas seleccionadas
	 * 
	 * @return Listado de entidades federativas
	 * @throws Exception
	 */
	@RequestMapping(value = "/listEntidades", method = RequestMethod.GET)
	@ResponseBody
	public List<CEntidad> searchEntidades() throws Exception {

		return catalogosService.searchEntidades();
	}

	/**
	 * Obtiene el listado de las entidades federativas seleccionadas
	 * 
	 * @param idEnt
	 * @return La entidad federativa
	 * @throws Exception
	 */
	@RequestMapping(value = "/getEntidad/{idEnt}", method = RequestMethod.GET)
	@ResponseBody
	public CEntidad searchEntidad(@PathVariable Short idEnt) throws Exception {

		return catalogosService.searchEntidad(idEnt);
	}

	/**
	 * Trae los municipios dado una entidad federativa
	 * 
	 * @param idEnt
	 *            Clave de la entidad Federativa
	 * @return Listado de los municipios
	 * @throws Exception
	 */
	@RequestMapping(value = "/listMunicipios/{idEnt}", method = RequestMethod.GET,produces = "application/json")
	@ResponseBody
	public List<CMunicipio> searchMunicipios(@PathVariable Short idEnt)
			throws Exception {
		return catalogosService.searchMunicipios(idEnt);
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
	@RequestMapping(value = "/listLocalidades/{idEnt}/{idMun}", method = RequestMethod.GET)
	@ResponseBody
	public List<CLocalidadConafe> searchLocalidades(@PathVariable Short idEnt,
			@PathVariable Integer idMun) throws Exception {
		return catalogosService.searchLocalidades(idEnt, idMun);
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
	@RequestMapping(value = "/listCctsLocalidad/{idEnt}/{idMun}/{idLoc}", method = RequestMethod.GET)
	@ResponseBody
	public List<CCctLight> searchCCtsPorLocalidad(@PathVariable Short idEnt,
			@PathVariable Integer idMun, @PathVariable Integer idLoc) {
		List<CCctLight> centrosEscolares = new ArrayList<CCctLight>();

		try {
			centrosEscolares = catalogosService.searchCCtsPorLocalidad(idEnt,
					idMun, idLoc);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return centrosEscolares;
	}

	/**
	 * Obtiene el listado de los CCTs de una localidad dada
	 * 
	 * @param cCct
	 * @return Listado de CCTs de una localidad
	 * @throws Exception
	 */
	/*
	 * public List<CCct> searchCCtsPorLocalidad( Integer cCct){
	 * List<CProgramaEscolar> programasEscolares = new
	 * ArrayList<CProgramaEscolar>();
	 * 
	 * try { programasEscolares=catalogosService.searchProgramasEducativos();
	 * 
	 * } catch (Exception e) { e.printStackTrace(); }
	 * 
	 * return programasEscolares; }
	 */

	/**
	 * Obtiene la informacian del CCT dada la clave interna
	 * 
	 * @param cCct
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getCCct/{cCct}", method = RequestMethod.GET)
	@ResponseBody
	public CCct selectCCct(@PathVariable Integer cCct) throws Exception {
		return catalogosService.selectCCct(cCct);
	}

	/**
	 * Trae el cat‡logo de eventos manifestados en las reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	@RequestMapping(value = "/listEventos", method = RequestMethod.GET)
	@ResponseBody
	public List<CEvento> searchEventos() throws Exception {
		return catalogosService.searchEventos();
	}

	/**
	 * Trae el cat‡logo de mejoras manifestadas en las reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	@RequestMapping(value = "/listMejoras", method = RequestMethod.GET)
	@ResponseBody
	public List<CMejoraCct> searchMejorasCct() throws Exception {
		return catalogosService.searchMejorasCct();
	}

	/**
	 * Trae el cat‡logo de planeacion que pueden seleccionar en las reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	@RequestMapping(value = "/listPlaneaciones", method = RequestMethod.GET)
	@ResponseBody
	public List<CPlaneacion> searchPlaneacion() throws Exception {
		return catalogosService.searchPlaneacion();
	}

	/**
	 * Trae el cat‡logo de nivel educativo que pueden seleccionar en las
	 * reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	@RequestMapping(value = "/listNivelesEduc", method = RequestMethod.GET)
	@ResponseBody
	public JsonWrapperVO searchNivelEduc() throws Exception {
		JsonWrapperVO nivelesEducativos = new JsonWrapperVO();

		nivelesEducativos.setIdentifier("cNiveleduc");
		nivelesEducativos.setLabel("nomCNivelEduc");
		nivelesEducativos.setItems(catalogosService.searchNivelEduc());
		return nivelesEducativos;
	}

	/**
	 * Trae el cat‡logo de nivel educativo Conafe que pueden seleccionar en las
	 * reuniones
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	@RequestMapping(value = "/listNivelesEducConafe/{tipoMiembro}", method = RequestMethod.GET)
	@ResponseBody
	public List<CNiveleducConafe> searchNivelEducConafe(
			@PathVariable Short tipoMiembro) throws Exception {

		return catalogosService.searchNiveleducConafe(tipoMiembro);

	}

	/**
	 * Trae el cat‡logo de los grados del centro escolar
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	@RequestMapping(value = "/listGrados", method = RequestMethod.GET)
	@ResponseBody
	public JsonWrapperVO searchGrado() throws Exception {
		JsonWrapperVO grados = new JsonWrapperVO();

		grados.setIdentifier("cGrado");
		grados.setLabel("nomNivel");
		grados.setItems(catalogosService.searchGrado());

		return grados;
	}

	/**
	 * Trae el catalogo de las opciones de programas, compromisos y comites
	 * 
	 * @return Catalogo de opciones
	 * @throws Exception
	 */
	@RequestMapping(value = "/listOpciones", method = RequestMethod.GET)
	@ResponseBody
	public List <COpcionesCat> searchOpciones() throws Exception {		

		return catalogosService.searchOpciones();
	}
	
	/**
	 * Trae el cat‡logo de las sesiones CONAFE del centro escolar
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	@RequestMapping(value = "/listSesiones", method = RequestMethod.GET)
	@ResponseBody
	public List<CSesion> searchSesion() throws Exception {
		return catalogosService.searchSesion();
	}
	
	/**
	 * Verifica si tiene Primera Asamblea o no
	 * 
	 */
	@RequestMapping(value = "/verificaConsejo/{cCct}", method = RequestMethod.GET)
	@ResponseBody
	public ConConsejoCstm searchConsejo(@PathVariable Integer cCct) throws Exception {
		System.out.println("llego al controlador y esto trae cct-----"+ cCct);
		return catalogosService.searchConsejo(cCct);
	}
	/**
	 * Trae el catálogo de las reuniones del CONAFE
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */
	@RequestMapping(value = "/listReunionesCONAFE", method = RequestMethod.GET)
	@ResponseBody
	public List<CReunion> searchReunionesCONAFE() throws Exception {
		return catalogosService.searchReunionesCONAFE();
	}

	/**
	 * Trae el cat‡logo de la calidad de los integrantes
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	@RequestMapping(value = "/listCalidades", method = RequestMethod.GET)
	@ResponseBody
	public JsonWrapperVO searchCalidadInt() throws Exception {
		JsonWrapperVO calidades = new JsonWrapperVO();
		calidades.setIdentifier("cCalidad");
		calidades.setLabel("nomCalidad");
		calidades.setItems(catalogosService.searchCalidadInt());

		return calidades;
	}

	/**
	 * Trae el cat‡logo de los compromisos de la prueba enlace
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	@RequestMapping(value = "/listCompromisosEnlace", method = RequestMethod.GET)
	@ResponseBody
	public List<CCompEnlace> searchCompromisosEnlace() throws Exception {
		return catalogosService.searchCompromisosEnlace();
	}

	/**
	 * Actualiza los datos del CCT
	 * 
	 * @return Catalogo de apoyos
	 * @throws Exception
	 */

	@RequestMapping(value = "/updateCCct", method = RequestMethod.POST)
	@ResponseBody
	public int updateCCct(@RequestBody CCct cCct) throws Exception {
		return catalogosService.updateCCct(cCct);
	}

	@RequestMapping(value = "/updateMailCCct", method = RequestMethod.POST)
	@ResponseBody
	public int updateMailCCct(@RequestBody List<String> params,
			Principal principal) throws Exception {
		int numRecords = 0;

		final String currentUser = principal == null ? "" : principal.getName();

		Integer regenerar = new Integer(params.get(2));
		String pwd = (String) params.get(3);
		String pwdEnc = null;

		List<CCct> listCCct = catalogosService.selectCCct(params.get(0),
				currentUser);
		Iterator<CCct> iterator = listCCct.iterator();
		CCct cCct = null;
		while (iterator.hasNext()) {
			cCct = iterator.next();
		}
		if (cCct != null) {
			log.debug("No es null");
			if (cCct.getMailCct() == null || cCct.getMailCct().equals("")
					|| cCct.getMailCct().equals("null")) {
				log.debug("Mail es nulo");
			}
			log.debug(params.get(1) + " correo");
			if ((cCct.getMailCct() == null || !cCct.getMailCct().equals(
					params.get(1)))
					&& params.get(1) != "") {
				cCct.setMailCct(params.get(1));
				cCct.setcCct(new Integer(params.get(4)));
				numRecords = catalogosService.updateCCct(cCct);
			} else {
				numRecords = 1;
			}

			if (numRecords > 0) {
				log.debug("Actualizo los registros");

				// Regenerar automaticamente
				if (regenerar == 1) {
					pwd = usuarioSeguridadServicio.generateRandomPassword();
					if (cCct.getMailCct() == null
							|| cCct.getMailCct().equals("")
							|| cCct.getMailCct().equals("null")) {
						log.debug(" Regenerar y mail nulo contraseña :: "
								+ cCct.getCveCct());
						pwd = cCct.getCveCct();
					}
				}

				pwdEnc = Encripta.generaHashByte(pwd);

				UsuarioSeguridad usuarioSeguridad = usuarioSeguridadServicio
						.consultarUserName(cCct.getCveCct());
				usuarioSeguridad.setPassword(pwdEnc);

				numRecords = usuarioSeguridadServicio
						.actualizar(usuarioSeguridad);
				log.debug("numRecords :: " + numRecords);

				// Envio de mail
				if (numRecords > 0) {
					Properties props = new Properties();
					props.put("nomDirector", cCct.getNomDirector());
					props.put("nomCct", cCct.getNomCct());
					props.put("cveCct", cCct.getCveCct());
					props.put("password", pwd);

					SimpleMailMessage msg = new SimpleMailMessage();
					msg.setFrom("repuce@sep.gob.mx");

					if (cCct.getMailCct() == null
							|| cCct.getMailCct().equals("")
							|| cCct.getMailCct().equals("null")) {
						log.debug("No se mando el correo");
						if (regenerar == 1) {
							numRecords = 99;
						}
					} else {
						msg.setTo(cCct.getMailCct());
						msg.setSubject("Nueva clave de ingreso al sistema REPUCE");
						sender.send(msg, props);
					}

				}

			}

		}
		return numRecords;
	}

	@RequestMapping(value = "/ListUsuarios", method = RequestMethod.GET)
	@ResponseBody
	public List<UsuarioSeguridad> searchListUsuarios(
			@RequestParam("cveCct") String cveCct) throws Exception {

		List<UsuarioSeguridad> usuarioSeguridads = new ArrayList<UsuarioSeguridad>();

		UsuarioSeguridad usuarioSeguridad = usuarioSeguridadServicio
				.consultarUserName(cveCct);
		usuarioSeguridads.add(usuarioSeguridad);

		return usuarioSeguridads;
	}

	@RequestMapping(value = "/updatePwdCCct", method = RequestMethod.POST)
	@ResponseBody
	public int updatePwdCCct(@RequestBody List<String> params,
			Principal principal) throws Exception {
		int numRecords = 0;

		String pwd = (String) params.get(3);
		String pwdEnc = null;
		String pwdOri = (String) params.get(5);
		String pwdOriEnc = null;
		String tipo = (String) params.get(6);
		final String currentUser = principal == null ? "" : principal.getName();

		if (pwdOri != null && tipo != null) {
			pwdOriEnc = Encripta.generaHashByte(pwdOri);
			if (tipo == "0") {
				List<CCct> listCCct = catalogosService.selectCCct(
						params.get(0), currentUser);
				Iterator<CCct> iterator = listCCct.iterator();
				CCct cCct = null;
				while (iterator.hasNext()) {
					cCct = iterator.next();
				}
				if (cCct != null) {
					cCct.setMailCct(params.get(1));
					cCct.setcCct(new Integer(params.get(4)));
					UsuarioSeguridad usuarioSeguridad = usuarioSeguridadServicio
							.consultarUserName(cCct.getCveCct());
					if (usuarioSeguridad.getPassword().equals(pwdOriEnc)) {
						pwdEnc = Encripta.generaHashByte(pwd);
						usuarioSeguridad.setPassword(pwdEnc);
						log.debug("Actualizo los registros");
						numRecords = usuarioSeguridadServicio
								.actualizar(usuarioSeguridad);
						log.debug("numRecords :: " + numRecords);

						// ---------------------------------------
						// Envio de mail
						if (numRecords > 0) {
							Properties props = new Properties();
							props.put("nomDirector", cCct.getNomDirector());
							props.put("nomCct", cCct.getNomCct());
							props.put("cveCct", cCct.getCveCct());
							props.put("password", pwd);

							SimpleMailMessage msg = new SimpleMailMessage();
							msg.setFrom("repuce@sep.gob.mx");

							if (cCct.getMailCct() == null
									|| cCct.getMailCct().equals("")
									|| cCct.getMailCct().equals("null")) {
								log.debug("No se mando el correo");
							} else {
								msg.setTo(cCct.getMailCct());
								msg.setSubject("Nueva clave de ingreso al sistema REPUCE");
								sender.send(msg, props);
							}
						}
						// ---------------------------------------
					}

				}
			} else {
				String user = (String) params.get(7);
				if (user != null) {
					UsuarioSeguridad usuarioSeguridad = usuarioSeguridadServicio
							.consultarUserName(user);
					if (usuarioSeguridad.getPassword().equals(pwdOriEnc)) {
						pwdEnc = Encripta.generaHashByte(pwd);
						usuarioSeguridad.setPassword(pwdEnc);
						log.debug("Actualizo los registros");
						numRecords = usuarioSeguridadServicio
								.actualizar(usuarioSeguridad);
						log.debug("numRecords :: " + numRecords);

					}
				}
			}// else tipo

		}

		return numRecords;
	}

	@RequestMapping(value = "/selectCDiferenciasPgr/{tipoDiferencia}", method = RequestMethod.GET)
	@ResponseBody
	public List<CDiferenciaPgr> selectCDiferenciasPgr(
			@PathVariable Short tipoDiferencia) throws Exception {
		return catalogosService.searchCDiferenciaPgr(tipoDiferencia);
	}

	@RequestMapping(value = "/listSeccionesRegistroXReunion/{cReunion}", method = RequestMethod.GET)
	@ResponseBody
	public List<CSeccionRegistro> searchSeccionesRegistro(
			@PathVariable Short creunion) throws Exception {
		return catalogosService.searchSeccionesRegistro(creunion);
	}

	@RequestMapping(value = "/listNecesidadesEspeciales/{visibleEnReunion}", method = RequestMethod.GET)
	@ResponseBody
	public List<CApoyo> selectNecesidadesEspeciales(
			@PathVariable Short visibleEnReunion) throws Exception {
		return catalogosService.searchApoyosPorTipo(
				Constants.C_TIPO_APOYO_NECESIDAD_ESPECIAL, visibleEnReunion);
	}

	@RequestMapping(value = "/listPolacionIndigena/", method = RequestMethod.GET)
	@ResponseBody
	public List<CPoblacionIndigena> searchPoblacionIndigena() throws Exception {
		return catalogosService.searchPoblacionIndigena();
	}

	@RequestMapping(value = "/listLenguasIndigenas/", method = RequestMethod.GET)
	@ResponseBody
	public List<CLengua> searchLenguasIndigenas() throws Exception {
		return catalogosService.searchLenguasIndigenas();
	}

	@RequestMapping(value = "/listAccionesPlanTrabajo/{visibleEnReunion}", method = RequestMethod.GET)
	@ResponseBody
	public List<CAccion> searchAcccionesPlanTrabajo(
			@PathVariable Short visibleEnReunion) throws Exception {

		return catalogosService.searchAccionesExcluirTipo(
				Constants.C_TIPO_ACCION_PERMANENCIA, visibleEnReunion);
	}

	@RequestMapping(value = "/listApoyosPorTipo/{cTipoApoyo}/{visibleEnReunion}", method = RequestMethod.GET)
	@ResponseBody
	public List<CApoyo> searchTipoApoyos(@PathVariable Short cTipoApoyo,
			@PathVariable Short visibleEnReunion) throws Exception {
		return catalogosService.searchApoyosPorTipo(cTipoApoyo,
				visibleEnReunion);
	}

	
	// Victor Blake Consulta al nuevo catalogo c_apoyo2
	
	@RequestMapping(value = "/listApoyosPorTipo2/{cTipoApoyo}", method = RequestMethod.GET)
	@ResponseBody
	public List<CApoyo2> searchTipoApoyos2(@PathVariable Integer cTipoApoyo) throws Exception {
		System.out.println("entro al controlador de tipo 2");
		return catalogosService.searchApoyosPorTipo2(cTipoApoyo);
	}
	
	
	
	@RequestMapping(value = "/listRespuestaPorTipo/{cTipoRespuesta}", method = RequestMethod.GET)
	@ResponseBody
	public List<CRespuesta> searchRespuestasPorTipo(
			@PathVariable Short cTipoRespuesta) throws Exception {
		return catalogosService.searchRespuestaPorTipo(cTipoRespuesta);
	}

	@RequestMapping(value = "/listTipoAcciones/", method = RequestMethod.GET)
	@ResponseBody
	public List<CTipoAccion> searchTipoAccciones() throws Exception {

		return catalogosService.searchTipoAccion(false);
	}

	@RequestMapping(value = "/listTipoAccionesSinApoyo/", method = RequestMethod.GET)
	@ResponseBody
	public List<CTipoAccion> searchTipoAcccionesExcluirApoyosPermanencia()
			throws Exception {

		return catalogosService.searchTipoAccion(true);
	}

	@RequestMapping(value = "/listAccionesPorTipo/{cTipoAccion}/{visibleEnReunion}", method = RequestMethod.GET)
	@ResponseBody
	public List<CAccion> searchAccionesPorTipo(@PathVariable Short cTipoAccion,
			@PathVariable Short visibleEnReunion) throws Exception {

		return catalogosService.searchAccionesPorTipo(cTipoAccion,
				visibleEnReunion);
	}

	@RequestMapping(value = "/listAccionesPorTipoYReunion/{cTipoAccion}/{visibleEnReunion}", method = RequestMethod.GET)
	@ResponseBody
	public List<CAccion> searchAccionesPorTipoYReunion(
			@PathVariable Short cTipoAccion,
			@PathVariable Short visibleEnReunion) throws Exception {

		return catalogosService.searchAccionesPorTipoYReunion(cTipoAccion,
				visibleEnReunion);
	}

	@RequestMapping(value = "/listApoyosPorTipoYReunion/{cTipoApoyo}/{visibleEnReunion}", method = RequestMethod.GET)
	@ResponseBody
	public List<CApoyo> searchApoyoPorTipoYReunion(
			@PathVariable Short cTipoApoyo, @PathVariable Short visibleEnReunion)
			throws Exception {

		return catalogosService.searchApoyosPorTipoYReunion(cTipoApoyo,
				visibleEnReunion);
	}

	@RequestMapping(value = "/listCriteriosDesercion/", method = RequestMethod.GET)
	@ResponseBody
	public List<CDesercion> searchCriteriosDesercion() throws Exception {
		return catalogosService.searchCriteriosDesercion();
	}

	@RequestMapping(value = "/listMaxIdIntegrante/{cApec}", method = RequestMethod.GET)
	@ResponseBody
	public Integer searchMaxIdIntegrante(@PathVariable Integer cApec)
			throws Exception {

		return catalogosService.searchMaxIdInstructor(cApec);
	}
	
	
	//conafe susana
	
	
	
	
	@RequestMapping(value = "/listTipoBullying/", method = RequestMethod.GET)
	@ResponseBody
	public List<CCoTipoBullying> searchTipoBullying() throws Exception {
		return catalogosService.searchTipoBullying();
	}
	

	@RequestMapping(value = "/listNee/", method = RequestMethod.GET)
	@ResponseBody
	public List<CCoNee> searchNee() throws Exception {
		return catalogosService.searchNee();
	}
	
	@RequestMapping(value = "/listBullying/", method = RequestMethod.GET)
	@ResponseBody
	public List<CCoBullying> searchBullying() throws Exception {
		return catalogosService.searchBullying();
		
	}
	
	@RequestMapping(value = "/listBullyingPorTipo/{cCoTipoBullying}/{visibleEnReunion}", method = RequestMethod.GET)
	@ResponseBody
	public List<CCoBullying> searchBullyingPorTipo(@PathVariable Short cCoTipoBullying,
			@PathVariable Short visibleEnReunion) throws Exception {

		return catalogosService.searchBullyingPorTipo(cCoTipoBullying,
				visibleEnReunion);
	}
	

	@RequestMapping(value = "/validaHijo/{cCct}", method = RequestMethod.GET)
	@ResponseBody
	public ValidacionNombreHijoVO searchValidacionHijo(@PathVariable Integer cCct)
			throws Exception {

		return catalogosService.searchValidacionHijo(cCct);
	}
	
	@RequestMapping(value = "/validaPaloma/{cCct}", method = RequestMethod.GET)
	@ResponseBody
	public ValidacionSegundaSesionVO searchValidadPaloma(@PathVariable Integer cCct)
			throws Exception {

		return catalogosService.searchValidadPaloma(cCct);
	}
	
	/**
	 * Trae los programas federales y comites que halla registrado en sus primer sesion
	 * 
	 */
	@RequestMapping(value = "/verificaConProgramasYComites/{cCct}", method = RequestMethod.GET)
	@ResponseBody
	public List<ConProgramasYComitesCstm> selectConProgramasYComites(@PathVariable Integer cCct) throws Exception {
		System.out.println("llego al controlador en el metodo de busqueda de programas y comites de busca tu escuela y esto trae cct-----"+ cCct);
		return catalogosService.selectConProgramasYComites(cCct);
	}

	@RequestMapping(value = "/listEstimulos", method = RequestMethod.GET)
    @ResponseBody
    public List<CEstimulos> searchEstimulos() throws Exception {
          return catalogosService.searchEstimulos();
    }
	
	
	@RequestMapping(value="/saveDenuncia", method=RequestMethod.POST)
    @ResponseBody
	public int saveDenuncia(@RequestBody CeDenunciaVO ceDenuncia) throws Exception{
    	System.out.println("entro al controlador");
        int numRecords = 0;
        
        //ceDenuncia.setFchRegistro(new Date());
        numRecords = catalogosService.saveDenuncia(ceDenuncia);
        
        return numRecords;
    }

//	@RequestMapping(value="/escuelas", method=RequestMethod.POST)
//    @ResponseBody
//	public List<DatosEscuelaVO> saveDenuncia(@RequestBody DatosVO datos) throws Exception{
//    	
//		System.out.println("entro al controlador de escuelas");
//        
//    	return catalogosService.searchEscuela(datos);
//        
//   }
	
	@RequestMapping(value="/escuelas/{idEnt}/{idMun}", method = RequestMethod.GET)
    @ResponseBody
	public List<DatosEscuelaVO> saveDenuncia(@PathVariable Integer idEnt,
			@PathVariable Integer idMun) throws Exception{
    	
		System.out.println("entro al controlador de escuelas");
		 DatosVO datos=new DatosVO();
		 datos.setIdEnt(idEnt);
		 datos.setIdMun(idMun);
    	return catalogosService.searchEscuela(datos);
        
   }
	
	@RequestMapping(value="/tipoEscuelas/{idEnt}/{idMun}", method = RequestMethod.GET)
    @ResponseBody
	public List<DatosEscuelaPorLocyMunVO> buscaEscuelas(@PathVariable Integer idEnt,
			@PathVariable Integer idMun) throws Exception{
    	
		System.out.println("entro al controlador de tipo de escuelas");
		 DatosVO datos=new DatosVO();
		 datos.setIdEnt(idEnt);
		 datos.setIdMun(idMun);
    	return catalogosService.searchTipoEscuelas(datos);
        
   }
	
	@RequestMapping(value="/escuelas2/{idEnt}/{idMun}/{cNivel}", method = RequestMethod.GET)
    @ResponseBody
	public List<DatosEscuelaVO> buscaEscuelasPorLocMunTipo(@PathVariable Integer idEnt,
			@PathVariable Integer idMun,@PathVariable Integer cNivel) throws Exception{
    	
		System.out.println("entro al controlador de escuelas");
		 Datos2VO datos=new Datos2VO();
		 datos.setIdEnt(idEnt);
		 datos.setIdMun(idMun);
		 datos.setcNivel(cNivel);
    	return catalogosService.searchEscuela2(datos);
        
   }
	@RequestMapping(value = "/listRuta", method = RequestMethod.GET)
	@ResponseBody
	public List<CRuta> searchRuta() throws Exception {
		return catalogosService.searchRuta();
	}	
	
//	@RequestMapping(value="/saveDenuncia/{ceDenuncia}", method=RequestMethod.GET)
//    @ResponseBody
//	public int saveDenuncia(@PathVariable CeDenuncia ceDenuncia) throws Exception{
//    	System.out.println("entro al controlador");
//        int numRecords = 0;
//        
//        ceDenuncia.setFchRegistro(new Date());
//        numRecords = catalogosService.saveDenuncia(ceDenuncia);
//        
//        return numRecords;
//    }
	
	
	/**
	 * Trae el catalogo de las opciones de programas, compromisos y comites
	 * 
	 * @return Catalogo de opciones
	 * @throws Exception
	 */
	@RequestMapping(value = "/listOpcionesContra", method = RequestMethod.GET)
	@ResponseBody
	public List <CInformeFinal> searchOpcionesFinal() throws Exception {		

		return catalogosService.searchOpcionesFinal();
	}
}
