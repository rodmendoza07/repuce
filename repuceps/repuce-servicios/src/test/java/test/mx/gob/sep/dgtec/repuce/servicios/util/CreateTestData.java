package test.mx.gob.sep.dgtec.repuce.servicios.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;
import mx.gob.sep.dgtec.repuce.model.ApecAsistenteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecInstructorCstm;
import mx.gob.sep.dgtec.repuce.model.ApecIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CeActSesionCstm;
import mx.gob.sep.dgtec.repuce.model.CeAsistenteCstm;
import mx.gob.sep.dgtec.repuce.model.CeComite;
import mx.gob.sep.dgtec.repuce.model.CeComiteCstm;
import mx.gob.sep.dgtec.repuce.model.CeComiteIntegrante;
import mx.gob.sep.dgtec.repuce.model.CeCompEnlaceCstm;
import mx.gob.sep.dgtec.repuce.model.CeEventoCstm;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteComite;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteComiteConsejo;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctCstm;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.model.CmSeguimiento;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;
import mx.gob.sep.dgtec.repuce.vo.CuartaSesionVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsambleaVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionVO;
import mx.gob.sep.dgtec.repuce.vo.TerceraSesionVO;


public class CreateTestData {


	/*-----------------------------------------------------------
	-------------------PRIMERA ASAMBLEA----------------------------
	-------------------------------------------------------------*/
	
	
	public static PrimeraAsambleaVO getPrimeraAsambleaBean(){
		PrimeraAsambleaVO prim = new PrimeraAsambleaVO();
		final Integer C_CCT = 46; 

		//ce_inf_gral
		CeInfGral ceInfGral = new CeInfGral();
		ceInfGral.setcCct(C_CCT);

		//ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00"); 
		ceSesion.setNumIntegrantes(new Short("50"));
		ceSesion.setObservaciones("---- Esta es una prueba ----");
		ceSesion.setUsrCaptura("PI");
		
		//ce_act_sesion
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(new Short("1")); //Primera Asamblea
		CeActSesionCstm.setcActividad(new Short("11"));
		actividades.add(CeActSesionCstm);
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(new Short("1")); //Primera Asamblea
		CeActSesionCstm.setcActividad(new Short("12"));
		actividades.add(CeActSesionCstm);
		
		//ce_integrante
		ArrayList<CeIntegranteCstm> ceIntegrantes = new ArrayList<CeIntegranteCstm>();
	
		CeIntegranteCstm ceIntegrante = new CeIntegranteCstm();
		ceIntegrante.setCscIntegrante(new Short("1"));
		ceIntegrante.setPaternoIntegrante("HERTE");
		ceIntegrante.setMaternoIntegrante("MATERNO");
		ceIntegrante.setNombreIntegrante("PACO");
		ceIntegrante.setcCalidad(1); //Representante de APF
		ceIntegrante.setEmailIntegrante("xsxs@xxsx.com");
		ceIntegrante.setTelIntegrante("115321313213");
		ceIntegrante.setcCargo(1); //PRESIDENTE;
		ceIntegrante.setcNiveleduc(1);
		ceIntegrante.setGenero("M"); //Hombre
		ceIntegrante.setcGrado(1); 
		ceIntegrante.setcNivel(new Short("0")); //PREESCOLAR
		ceIntegrantes.add(ceIntegrante);

		ceIntegrante = new CeIntegranteCstm();
		ceIntegrante.setCscIntegrante(new Short("2"));
		ceIntegrante.setPaternoIntegrante("NAZORINE");
		ceIntegrante.setMaternoIntegrante("MAT");
		ceIntegrante.setNombreIntegrante("ENZO");
		ceIntegrante.setcCalidad(2); //Representante de Asociación sindical
		ceIntegrante.setEmailIntegrante("enzo@godfather.com");
		ceIntegrante.setTelIntegrante("115321313213");
		ceIntegrante.setcCargo(2); //SECRETARIO TÉCNICO;
		ceIntegrante.setcNiveleduc(1);
		ceIntegrante.setGenero("M"); //Hombre
		ceIntegrante.setcGrado(1); 
		ceIntegrante.setcNivel(new Short("0")); //PRIMARIA
		ceIntegrantes.add(ceIntegrante);


		ceIntegrante = new CeIntegranteCstm();
		ceIntegrante.setCscIntegrante(new Short("3"));
		ceIntegrante.setPaternoIntegrante("NAZORINE");
		ceIntegrante.setMaternoIntegrante("MAT");
		ceIntegrante.setNombreIntegrante("ENZO");
		ceIntegrante.setcCalidad(4); //Padre de familia 
		ceIntegrante.setEmailIntegrante("enzo@godfather.com");
		ceIntegrante.setTelIntegrante("115321313213");
		ceIntegrante.setcCargo(3); //Consejero;
		ceIntegrante.setcNiveleduc(1);
		ceIntegrante.setGenero("M"); //Hombre
		ceIntegrante.setcGrado(1); 
		ceIntegrante.setcNivel(new Short("0")); //PRIMARIA
		ceIntegrantes.add(ceIntegrante);
		
		//ce_integrante
		ArrayList<CeAsistenteCstm> asistentes = new ArrayList<CeAsistenteCstm>();
	
		CeAsistenteCstm asistente = new CeAsistenteCstm();
		asistente.setPaternoAsistente("HERTE");
		asistente.setMaternoAsistente("MATERNO");
		asistente.setNombreAsistente("PACO");
		asistente.setcCalidad(1);
		asistentes.add(asistente);

		asistente = new CeAsistenteCstm();
		asistente.setPaternoAsistente("NAZORINE");
		asistente.setMaternoAsistente("MAT");
		asistente.setNombreAsistente("ENZO");
		asistente.setcCalidad(4);
		asistentes.add(asistente);

		prim.setCeInfGral(ceInfGral);
		prim.setCeSesion(ceSesion);
		prim.setActividades(actividades);
		prim.setIntegrantes(ceIntegrantes);	
		prim.setAsistentes(asistentes);	
		
		
		return prim; 
	} 

	
	/*-----------------------------------------------------------
	-------------------PRIMERA SESIÓN----------------------------
	-------------------------------------------------------------*/
	
	public static PrimeraSesionVO getPrimeraSesionBean(){
			
		PrimeraSesionVO primeraSesion = new PrimeraSesionVO();
		
		//Datos generales del Consejo
		final Integer C_CCT = 1;
		CeInfGral ceInfGral = new CeInfGral(); 
		ceInfGral.setcCct(C_CCT);
		primeraSesion.setCeInfGral(ceInfGral);
		
		/*----------------------INFORMACIÓN GENERAL---------------------*/	
		//Se instancia el objeto y se le asignan valores.
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.PRIMERA_SESION); //Primera sesión
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("09:00");
		ceSesion.setHoraFinSesion("14:00"); 
		ceSesion.setNumIntegrantes(new Short("352"));
		ceSesion.setObservaciones("Esta es una prueba de la primera sesión");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("KOCO");
		ceSesion.setCadena("!#$%&/()");
		primeraSesion.setCeSesion(ceSesion);
		
		/*----------------------ACTIVIDADES-----------------------------*/
		//Lista de Actividades.
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		
		//Programas
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.PRIMERA_SESION); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("21"));
		actividades.add(CeActSesionCstm);
		//Mejoras
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.PRIMERA_SESION); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("22"));
		actividades.add(CeActSesionCstm);
		//Recursos
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.PRIMERA_SESION); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("23"));
		actividades.add(CeActSesionCstm);
		//Recursos APF
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.PRIMERA_SESION); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("24"));
		actividades.add(CeActSesionCstm);
		//Comités
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.PRIMERA_SESION); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("25"));
		actividades.add(CeActSesionCstm);
		
		primeraSesion.setActividades(actividades);
		
		
		/*----------------------PROGRAMAS-----------------------------*/
		//Lista de programas.
		ArrayList<CeProgramaCstm> programas = new ArrayList<CeProgramaCstm>();
		
		//Programa del catálogo en el cual no se conoce los recursos.
		CeProgramaCstm cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.PRIMERA_SESION);//Primera Sesión
		cePrograma.setcPrograma(new Short("1"));//Programa Escuela de Calidad
		cePrograma.setIndRecurso("0");
		programas.add(cePrograma);
		
		
		//Programa que no esta en el catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.PRIMERA_SESION);//Primera Sesión
		cePrograma.setcPrograma(new Short("34"));//Otro programa
		cePrograma.setNomOtroPrograma("Programa de prueba");
		cePrograma.setIndRecurso("1");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planear, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados");
		cePrograma.setNomBenefactor("Gobierno");
		cePrograma.setMonto(new BigDecimal("12000.00"));
		cePrograma.setMontoStr("Doce mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		
		//Programa del catálogo en el cual no se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.PRIMERA_SESION); //Primera Sesión
		cePrograma.setcPrograma(new Short("20")); //Programa de Lectura
		cePrograma.setIndRecurso("0");
		programas.add(cePrograma);
		
		
		//Programa que no esta en el catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.PRIMERA_SESION);//Primera Sesión
		cePrograma.setcPrograma(new Short("54"));//Otro Programa
		cePrograma.setNomOtroPrograma("Programa de actuación");
		cePrograma.setIndRecurso("1");
		cePrograma.setAnioIngreso("2011");
		cePrograma.setActividades("Planear, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados");
		cePrograma.setNomBenefactor("Televisa");
		cePrograma.setMonto(new BigDecimal("20000.00"));
		cePrograma.setMontoStr("Veinte mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		primeraSesion.setProgramas(programas);
		
		
		/*----------------------RECURSOS-----------------------------*/
		
		//Lista de recursos.
		ArrayList<CeRecurso> recursos = new ArrayList<CeRecurso>();
		
		
		//Recurso de catálogo y se conocen los datos del mismo.
		CeRecurso ceRecurso = new CeRecurso();
		ceRecurso.setcCct(C_CCT);
		ceRecurso.setcSesion(Constants.PRIMERA_SESION);
		ceRecurso.setcRecurso(new Short("0"));//Donación
		ceRecurso.setIndRecurso("1");
		ceRecurso.setMonto(new BigDecimal("15000.00"));
		ceRecurso.setMontoStr("Quince  mil pesos 00/100 MN");
		ceRecurso.setUso("Planeación, Organización, Dirección y Control");
		recursos.add(ceRecurso);
		
		
		//Recurso del catálogo y no se conocen los datos.
		ceRecurso = new CeRecurso();
		ceRecurso.setcCct(C_CCT);
		ceRecurso.setcSesion(Constants.PRIMERA_SESION);
		ceRecurso.setcRecurso(new Short("1"));//Rifa
		ceRecurso.setIndRecurso("0");
		recursos.add(ceRecurso);
		
		primeraSesion.setRecursos(recursos);
		
		
		/*----------------------PLANEACION-----------------------------------*/
		//Planeación.
			
		CePlaneacionCstm cePlaneacion = new CePlaneacionCstm();
		cePlaneacion.setcCct(C_CCT);
		cePlaneacion.setcSesion(Constants.PRIMERA_SESION);
		cePlaneacion.setIndPlaneacion(true);
		cePlaneacion.setcPlaneacion(new Short("4"));// otra planeación que no pertence al catálogo.
		cePlaneacion.setNomOtroPlaneacion("Otra planeación");
		cePlaneacion.setIndParticipacion(true);
		cePlaneacion.setActividades("PLaneación, Organización, Dirección y Control");
		
		primeraSesion.setPlaneacion(cePlaneacion);
			
		/*----------------------COMITES---------------------------------------*/
		//Lista de comites.
		ArrayList<CeComite> comites = new ArrayList<CeComite>();
		
		CeComite ceComite = new CeComite();
		ceComite.setcCct(C_CCT);
		ceComite.setcSesion(Constants.PRIMERA_SESION);
		ceComite.setcComite(21); // Otro comite que no pertenece al catálogo
		ceComite.setNomOtroComite("De educación física");
		ceComite.setNumIntegrantes(new Short("3"));
		ceComite.setIndProyAnualCom(true);
		ceComite.setProyAnualCom("F�?SICA");
		ceComite.setClasificacionComite("ABC");
		comites.add(ceComite);
		
		ceComite = new CeComite();
		ceComite.setcCct(C_CCT);
		ceComite.setcSesion(Constants.PRIMERA_SESION);
		ceComite.setcComite(1); // Comite de lectura
		ceComite.setNumIntegrantes(new Short("2"));
		ceComite.setIndProyAnualCom(true);
		ceComite.setProyAnualCom("LECTURA");
		ceComite.setClasificacionComite("CBA");
		comites.add(ceComite);
		
		//primeraSesion.setComites(comites);
		
		/*----------------------INTEGRANTES DEL CONSEJO-----------------------*/
		
		
		/*		
		 				Comite de Lectura		Otro Comité
		 				--------------------------------------
		 Integr1 1		|					|		X
						---------------------------------------
		 Integr1 2		|					|		X
						------------------------------------
		 Integr1 3		|		X			|
		*/
		
		//Lista de integrantes del consejo 21.
		ArrayList<CeIntegranteComiteConsejo> integranteComiteConsejo = new ArrayList<CeIntegranteComiteConsejo>();
		
		CeIntegranteComiteConsejo ceIntegranteComiteConsejo = new CeIntegranteComiteConsejo();
		
		// Integrantes del comite 21.
		ceIntegranteComiteConsejo.setcCctIntegrante(C_CCT);
		ceIntegranteComiteConsejo.setcSesionIntegrante(Constants.PRIMERA_SESION); //Primera Sesión
		ceIntegranteComiteConsejo.setCscIntegrante(new Short("1")); // Clave del integrante
		ceIntegranteComiteConsejo.setcCctComite(C_CCT);
		ceIntegranteComiteConsejo.setcSesionComite(new Short("2"));
		ceIntegranteComiteConsejo.setcComite(21);// Otro comite que no pertence al catálogo
		integranteComiteConsejo.add(ceIntegranteComiteConsejo);
		
		ceIntegranteComiteConsejo = new CeIntegranteComiteConsejo();
		ceIntegranteComiteConsejo.setcCctIntegrante(C_CCT);
		ceIntegranteComiteConsejo.setcSesionIntegrante(Constants.PRIMERA_SESION); //Primera Sesión
		ceIntegranteComiteConsejo.setCscIntegrante(new Short("2")); // Clave del integrante
		ceIntegranteComiteConsejo.setcCctComite(C_CCT);
		ceIntegranteComiteConsejo.setcSesionComite(new Short("2"));
		ceIntegranteComiteConsejo.setcComite(21);// Otro comite que no pertence al catálogo
		integranteComiteConsejo.add(ceIntegranteComiteConsejo);	
			
		
		//Integrantes del comite de lectura 1
		ceIntegranteComiteConsejo = new CeIntegranteComiteConsejo();
		ceIntegranteComiteConsejo.setcCctIntegrante(C_CCT);
		ceIntegranteComiteConsejo.setcSesionIntegrante(Constants.PRIMERA_SESION); //Primera Sesión
		ceIntegranteComiteConsejo.setCscIntegrante(new Short("1")); // Clave del integrante
		ceIntegranteComiteConsejo.setcCctComite(C_CCT);
		ceIntegranteComiteConsejo.setcSesionComite(new Short("2"));
		ceIntegranteComiteConsejo.setcComite(1);// Comite de lectura
		integranteComiteConsejo.add(ceIntegranteComiteConsejo);	
		
		
		//primeraSesion.setIntegrantesComiteConsejo(integranteComiteConsejo);
		
	/*----------------------INTEGRANTES QUE NO PERTENECEN AL CONSEJO------------------------*/
		
		//Lista de integrantes que no pertenecen al consejo.
		ArrayList<CeIntegranteComite> integrantesComite = new ArrayList<CeIntegranteComite>();
		
		CeIntegranteComite ceIntegranteComite = new CeIntegranteComite();
		
		ceIntegranteComite.setcCct(C_CCT);
		ceIntegranteComite.setcSesion(Constants.PRIMERA_SESION); // Primera Sesión
		ceIntegranteComite.setCscIntegrante(new Short("1")); //Primer Integrante
		ceIntegranteComite.setPaternoIntegrante("LÓPEZ");
		ceIntegranteComite.setMaternoIntegrante("LÓPEZ");
		ceIntegranteComite.setNombreIntegrante("MONSERRAT");
		ceIntegranteComite.setFchAlta(new Date());
		ceIntegranteComite.setGenero("M");
		integrantesComite.add(ceIntegranteComite);
		
		ceIntegranteComite = new CeIntegranteComite();
		ceIntegranteComite.setcCct(C_CCT);
		ceIntegranteComite.setcSesion(Constants.PRIMERA_SESION); // Primera Sesión
		ceIntegranteComite.setCscIntegrante(new Short("2")); //Segundo Integrante
		ceIntegranteComite.setPaternoIntegrante("LÓPEZ");
		ceIntegranteComite.setMaternoIntegrante("LÓPEZ");
		ceIntegranteComite.setNombreIntegrante("JOSÉ LUIS");
		ceIntegranteComite.setFchAlta(new Date());
		ceIntegranteComite.setGenero("H");
		integrantesComite.add(ceIntegranteComite);
		
		//primeraSesion.setIntegrantesComites(integrantesComite);
		
		
		/*----------------------COMITÉS SELECCIONADOS------------------------*/
		
		/*		
					Comite de Lectura		Otro Comité
					--------------------------------------
		Integr1 1		|					|		X
				---------------------------------------
		Integr1 2		|		X			|		
		*/

		//Lista de integrantes que no pertenecen al consejo.
		ArrayList<CeComiteIntegrante> comiteIntegrantes = new ArrayList<CeComiteIntegrante>();
		
		//Integrante del comite 21
		CeComiteIntegrante ceComiteIntegrante = new CeComiteIntegrante();
		ceComiteIntegrante.setCeIntegranteComiteCCct(C_CCT);
		ceComiteIntegrante.setCeIntegranteComiteCSesion(Constants.PRIMERA_SESION); //Primera Sesión
		ceComiteIntegrante.setCeIntegranteComiteCscIntegrante(new Short("1")); //Clave del integrante
		ceComiteIntegrante.setCeComiteCCct(C_CCT);
		ceComiteIntegrante.setCeComiteCSesion(Constants.PRIMERA_SESION);
		ceComiteIntegrante.setCeComiteCComite(21);
		comiteIntegrantes.add(ceComiteIntegrante);
	
		//Integrante del comite de lectura 1
		ceComiteIntegrante = new CeComiteIntegrante();
		ceComiteIntegrante.setCeIntegranteComiteCCct(C_CCT);
		ceComiteIntegrante.setCeIntegranteComiteCSesion(Constants.PRIMERA_SESION); //Primera Sesión
		ceComiteIntegrante.setCeIntegranteComiteCscIntegrante(new Short("2")); //Clave del integrante
		ceComiteIntegrante.setCeComiteCCct(C_CCT);
		ceComiteIntegrante.setCeComiteCSesion(Constants.PRIMERA_SESION);
		ceComiteIntegrante.setCeComiteCComite(1);
		comiteIntegrantes.add(ceComiteIntegrante);
		
		//primeraSesion.setComitesSeleccionados(comiteIntegrantes);
		
		return primeraSesion;
		
	}
	
	
	
	
	/*-----------------------------------------------------------
	-------------------SEGUNDA SESIÓN----------------------------
	-------------------------------------------------------------*/
	
	public static SegundaSesionVO getSegundaSesionBean(){
			
		SegundaSesionVO segundaSesion = new SegundaSesionVO();
		
		//Datos generales del Consejo
		
		final Integer C_CCT = 1;
		
		CeInfGral ceInfGral = new CeInfGral(); 
		ceInfGral.setcCct(C_CCT);
		segundaSesion.setCeInfGral(ceInfGral);
		
		
		
		/*----------------------INFORMACIÓN GENERAL---------------------*/
		
		//Se instancia el objeto y se le asignan valores.
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.SEGUNDA_SESION); //Segunda sesión
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("09:00");
		ceSesion.setHoraFinSesion("14:00"); 
		ceSesion.setNumIntegrantes(new Short("352"));
		ceSesion.setObservaciones("Esta es una prueba de la segunda sesión");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("KOCO");
		ceSesion.setCadena("!#$%&/()");
		
		segundaSesion.setCeSesion(ceSesion);
		
		
		/*----------------------ACTIVIDADES-----------------------------*/
		
		//Lista de Actividades.
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		
		//El Consejo Escolar tomó nota de los resultados de las evaluaciones que realicen las autoridades educativas
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.SEGUNDA_SESION); //Segunda Sesión
		CeActSesionCstm.setcActividad(new Short("31"));
		actividades.add(CeActSesionCstm);
		//Estableció metas y acciones complementarias para mejorar los resultados de las evaluaciones en mención
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.SEGUNDA_SESION); //Segunda Sesión
		CeActSesionCstm.setcActividad(new Short("32"));
		actividades.add(CeActSesionCstm);
	
		
		segundaSesion.setActividades(actividades);
		
		
		/*----------------------RESULTADO META ENLACE---------------------*/	
		
		
		ArrayList<CctResultEnlace> resultEnlace = new ArrayList<CctResultEnlace>();
		
		CctResultEnlace cctResultEnlace = new CctResultEnlace();
		
		cctResultEnlace.setcCct(C_CCT);
		cctResultEnlace.setNumGrado(new Short ("1"));// PRIMER GRADO
		cctResultEnlace.setNumMateria(new Short("1")); //Español
		cctResultEnlace.setAnioResult(new Short("2012"));
		cctResultEnlace.setPuntosNal("1245");
		cctResultEnlace.setPuntosEdo("1278");
		cctResultEnlace.setPuntosCct("4578");
		cctResultEnlace.setPctInsuf("50%");
		cctResultEnlace.setPctElem("30%");
		cctResultEnlace.setPctBueno("10%");
		cctResultEnlace.setPctExcel("10%");
		resultEnlace.add(cctResultEnlace);
		
		cctResultEnlace.setcCct(C_CCT);
		cctResultEnlace.setNumGrado(new Short ("1"));// PRIMER GRADO
		cctResultEnlace.setNumMateria(new Short("2")); //Matemáticas
		cctResultEnlace.setAnioResult(new Short("2011"));
		cctResultEnlace.setPuntosNal("1002");
		cctResultEnlace.setPuntosEdo("1145");
		cctResultEnlace.setPuntosCct("3254");
		cctResultEnlace.setPctInsuf("40%");
		cctResultEnlace.setPctElem("20%");
		cctResultEnlace.setPctBueno("30%");
		cctResultEnlace.setPctExcel("20%");
		resultEnlace.add(cctResultEnlace);
		
		cctResultEnlace.setcCct(C_CCT);
		cctResultEnlace.setNumGrado(new Short ("1"));// PRIMER GRADO
		cctResultEnlace.setNumMateria(new Short("3")); //Rotativa
		cctResultEnlace.setAnioResult(new Short("2012"));
		cctResultEnlace.setPuntosNal("1230");
		cctResultEnlace.setPuntosEdo("1065");
		cctResultEnlace.setPuntosCct("2356");
		cctResultEnlace.setPctInsuf("34%");
		cctResultEnlace.setPctElem("25%");
		cctResultEnlace.setPctBueno("25%");
		cctResultEnlace.setPctExcel("16%");
		resultEnlace.add(cctResultEnlace);
		
		cctResultEnlace.setcCct(C_CCT);
		cctResultEnlace.setNumGrado(new Short ("2"));// SEGUNDO GRADO
		cctResultEnlace.setNumMateria(new Short("1")); //Español
		cctResultEnlace.setAnioResult(new Short("2009"));
		cctResultEnlace.setPuntosNal("875");
		cctResultEnlace.setPuntosEdo("860");
		cctResultEnlace.setPuntosCct("812");
		cctResultEnlace.setPctInsuf("30%");
		cctResultEnlace.setPctElem("30%");
		cctResultEnlace.setPctBueno("30%");
		cctResultEnlace.setPctExcel("10%");
		resultEnlace.add(cctResultEnlace);
		
		cctResultEnlace.setcCct(C_CCT);
		cctResultEnlace.setNumGrado(new Short ("2"));// SEGUNDO GRADO
		cctResultEnlace.setNumMateria(new Short("2")); //Matemáticas
		cctResultEnlace.setAnioResult(new Short("2010"));
		cctResultEnlace.setPuntosNal("830");
		cctResultEnlace.setPuntosEdo("724");
		cctResultEnlace.setPuntosCct("710");
		cctResultEnlace.setPctInsuf("20%");
		cctResultEnlace.setPctElem("40%");
		cctResultEnlace.setPctBueno("30%");
		cctResultEnlace.setPctExcel("10%");
		resultEnlace.add(cctResultEnlace);
		
		cctResultEnlace.setcCct(C_CCT);
		cctResultEnlace.setNumGrado(new Short ("2"));// SEGUNDO GRADO
		cctResultEnlace.setNumMateria(new Short("3")); //Rotativa
		cctResultEnlace.setAnioResult(new Short("2012"));
		cctResultEnlace.setPuntosNal("720");
		cctResultEnlace.setPuntosEdo("710");
		cctResultEnlace.setPuntosCct("654");
		cctResultEnlace.setPctInsuf("10%");
		cctResultEnlace.setPctElem("40%");
		cctResultEnlace.setPctBueno("30%");
		cctResultEnlace.setPctExcel("20%");
		resultEnlace.add(cctResultEnlace);
		
		segundaSesion.setResultadosEnlace(resultEnlace);
		
		
		
		/*----------------------META ENLACE---------------------*/	
	
		ArrayList<CeMetaEnlace> metaEnlace = new ArrayList<CeMetaEnlace>();
		
		CeMetaEnlace ceMetaEnlace = new CeMetaEnlace();
		ceMetaEnlace.setcCct(C_CCT);
		ceMetaEnlace.setcSesion(Constants.SEGUNDA_SESION);//Segunda Sesión
		ceMetaEnlace.setNumGrado(new Short ("1"));//PRIMER GRADO
		ceMetaEnlace.setNumMateria(new Short("1")); //Español
		ceMetaEnlace.setPuntosCct("980");
		ceMetaEnlace.setPctInsuf("25%");
		ceMetaEnlace.setPctElem("25");
		ceMetaEnlace.setPctBueno("40%");
		ceMetaEnlace.setPctExcel("20%");		
		metaEnlace.add(ceMetaEnlace);
		
		
		ceMetaEnlace = new CeMetaEnlace();
		ceMetaEnlace.setcCct(C_CCT);
		ceMetaEnlace.setcSesion(Constants.SEGUNDA_SESION);// Segunda Sesión
		ceMetaEnlace.setNumGrado(new Short ("1"));//SEGUNDO GRADO
		ceMetaEnlace.setNumMateria(new Short("2")); //Matemáticas
		ceMetaEnlace.setPuntosCct("580");
		ceMetaEnlace.setPctInsuf("5%");
		ceMetaEnlace.setPctElem("30%");
		ceMetaEnlace.setPctBueno("30%");
		ceMetaEnlace.setPctExcel("35%");		
		metaEnlace.add(ceMetaEnlace);

				
		segundaSesion.setMetas(metaEnlace);
		
		
		/*----------------------COMP META ENLACE---------------------*/	
		
		ArrayList<CeCompEnlaceCstm> compEnlace = new ArrayList<CeCompEnlaceCstm>();
		
		
		//COMPROMISOS DE DIAGNÓSTICO Y SEGUIMIENTO
		
		CeCompEnlaceCstm ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("1"));// Establecer mecanismos para brindar una atención pedagógica específica a las alumnas y alumnos que se ubiquen en los niveles Insuficiente y Elemental en los resultados de la prueba Enlace.
		
		compEnlace.add(ceCompEnlace);
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("2"));// "Establecer una corresponsabilidad entre madres, padres y tutores con los docentes, para fortalecer el trabajo académico tanto en el salón de clases como en los hogares."
		
		compEnlace.add(ceCompEnlace);
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("3"));// Fortalecer  al  cuerpo  docente  que imparte las asignaturas y  temas que mayor dificultad hayan representado para el alumnado conforme a los resultados de la prueba Enlace.
		
		compEnlace.add(ceCompEnlace);
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("4"));//Otro compromiso.
		ceCompEnlace.setNomOtroComp("Establecer horas extras de aprendizaje en las asignaturas y temas que mayor dificultad hayan repsentado para el alumnado. ");
		compEnlace.add(ceCompEnlace);
		
				
		//COMPROMISOS EN EL CUMPLIMIENTO DE METAS
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("11"));//"Capacitar a la comunidad escolar en su conjunto, en el diseño,elaboración, lectura e interpretación de gráficos relativos al desempeño global, por grado y asignatura de las alumnas y alumnos participantes en la prueba Enlace."
		compEnlace.add(ceCompEnlace);
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("14"));// Otro compromiso.
		ceCompEnlace.setNomOtroComp("Recomendar a las madres, padres o tutores que apoyen a sus hijos para que se queden horas extras a estudiar.");
		compEnlace.add(ceCompEnlace);
		
		
		//CORRESPONSABILIDAD DE MADRES Y PADRES DE FAMILIA
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("22"));// "Buscar que los docentes asesoren a las madres, padres y tutores de los alumnos con niveles de logro Insuficiente y Elemental en función de resultados de la prueba Enlace."
		compEnlace.add(ceCompEnlace);
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("24"));// 
		ceCompEnlace.setNomOtroComp("Otro Compromiso Prueba");
		compEnlace.add(ceCompEnlace);
		
		//CURSOS Y TAREAS EXTRAS
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("31"));// "Programas cursos sabatinos para los alumnos con niveles de logro Insuficiente y Elemental (y en su caso, también para los alumnos de niveles Bueno y Excelente en la prueba Enlace que así lo decidan)."
		compEnlace.add(ceCompEnlace);
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("32"));// "Diseñar tareas y actividades extras para los alumnos de Insuficiente y Elemental para realizarse en el hogar (en su caso, también para los alumnos de niveles Bueno y Excelente en la prueba Enlace)."
		compEnlace.add(ceCompEnlace);
		
		//EST�?MULOS Y RECONOCIMIENTO AL MEJORAMIENTO DEL DESEMPEÑO GLOBAL Y GRUPAL
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("41"));// Organizar ceremonias de reconocimiento por los logros académicos globales de la escuela.
		
		compEnlace.add(ceCompEnlace);
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("42"));// "Otorgar un distintivo u objeto simbólico (un banderín, un trofeo) al grupo con mejor desempeño según grado académico y asignatura, el cual cambiará de depositario conforme los resultados en la prueba Enlace."
		compEnlace.add(ceCompEnlace);
		
		
		//CAPACITACIÓN Y APOYO DOCENTE
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("52"));// Incorporar a las escuelas con desempeños globales y grupales Insuficientes y Elementales al Programa Emergente para Mejorar el Logro Educativo  (PEMLE); para solicitar mayor información se pone a su disposición el correo electrónico pemle@sep.gob.mx.
		
		compEnlace.add(ceCompEnlace);
		
		ceCompEnlace = new CeCompEnlaceCstm();
		ceCompEnlace.setcCct(C_CCT);
		ceCompEnlace.setcSesion(Constants.SEGUNDA_SESION);
		ceCompEnlace.setcCompEnlace(new Short ("53"));// Fortalecer el trabajo de los Asesores Técnico Pedagógicos (ATP's) en las escuelas con desempeños globales y grupales Insuficientes y Elementales. 
		compEnlace.add(ceCompEnlace);
		
		
		segundaSesion.setCompromisos(compEnlace);
		
		return segundaSesion;
		
	}
	
	
	
	
	/*-----------------------------------------------------------
	-------------------SEGUNDA ASAMBLEA----------------------------
	-------------------------------------------------------------*/
	
	public static SegundaAsambleaVO getSegundaAsambleaBEan(){
		
		SegundaAsambleaVO segundaAsamblea = new SegundaAsambleaVO();
		
		final Integer C_CCT = 4; 
		
		//Datos generales del Consejo
	
		CeInfGral ceInfGral = new CeInfGral(); 
		ceInfGral.setcCct(C_CCT);
		segundaAsamblea.setCeInfGral(ceInfGral);
		
		/*----------------------INFORMACIÓN GENERAL---------------------*/	
		
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.SEGUNDA_ASAMBLEA); //Segunda Asamblea
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("09:00");
		ceSesion.setHoraFinSesion("14:00"); 
		ceSesion.setNumIntegrantes(new Short("53"));
		ceSesion.setObservaciones("Esta es una prueba de la segunda Asamblea");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("KOCO");
		ceSesion.setCadena("!#$%&/()");
		
		segundaAsamblea.setCeSesion(ceSesion);
		
		
		/*----------------------ACTIVIDADES-----------------------------*/
		//Lista de Actividades.
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		
		//"Comunicó a la comunidad, las gestiones de los trámites para incorporar a la escuela los beneficios de programas federales, estatales o locales"
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.SEGUNDA_ASAMBLEA); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("41"));
		actividades.add(CeActSesionCstm);
		
		//Presentó a la comunidad los proyectos anuales del Consejo Escolar
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.SEGUNDA_ASAMBLEA); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("42"));
		actividades.add(CeActSesionCstm);
		
		//"Informó a la comunidad, los recursos provenientes de otras fuentes distintas a los programas mencionados"
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.SEGUNDA_ASAMBLEA); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("43"));
		actividades.add(CeActSesionCstm);
		
		//"PROMOVIÓ INFORME DE LA ASOCIACIÓN DE PADRES DE FAMILIA O SU EQUIVALENTE, ANTE LA COMUNIDAD EDUCATIVA SOBRE EL MONTO Y USO QUE LE DAR�? A LOS RECURSOS RECABADOS"
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.SEGUNDA_ASAMBLEA); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("44"));
		actividades.add(CeActSesionCstm);
		
		//"Informó a la comunidad, la integración del o los comités"
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcCct(C_CCT);
		CeActSesionCstm.setcSesion(Constants.SEGUNDA_ASAMBLEA); //Primera Sesión
		CeActSesionCstm.setcActividad(new Short("45"));
		actividades.add(CeActSesionCstm);
	
		
		segundaAsamblea.setActividades(actividades);
		
		
		
		/*----------------------PROGRAMAS-----------------------------*/
		
		//Lista de programas.
		ArrayList<CeProgramaCstm> programas = new ArrayList<CeProgramaCstm>();
		
		
		//PROGRAMAS FEDERALES
		//Programa del catálogo en el cual no se conoce los recursos.
		CeProgramaCstm cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.SEGUNDA_ASAMBLEA);//Segunda Asamblea
		cePrograma.setcPrograma(new Short ("1"));//Programa Escuela de Calidad
		cePrograma.setIndRecurso("1");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados");
		cePrograma.setNomBenefactor("Gobierno");
		cePrograma.setMonto(new BigDecimal("30000.00"));
		cePrograma.setMontoStr("Treinta mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual no se conoce los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.SEGUNDA_ASAMBLEA);//Segunda Asamblea
		cePrograma.setcPrograma(new Short ("4"));//Escuela de Bajo Rendimiento
		cePrograma.setIndRecurso("1");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Mejorar el rendimiento de los alumnos");
		cePrograma.setNomBenefactor("Gobierno");
		cePrograma.setMonto(new BigDecimal("30000.00"));
		cePrograma.setMontoStr("Treinta mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		
		//Programa que no esta en el catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.SEGUNDA_ASAMBLEA);//Segunda Asamblea
		cePrograma.setcPrograma(new Short ("12"));//Programa Ver Bien para Aprender Mejor
		cePrograma.setIndRecurso("1");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos que tienen problemas en su vista tengan lentes.");
		cePrograma.setNomBenefactor("Gobierno");
		cePrograma.setMonto(new BigDecimal("20000.00"));
		cePrograma.setMontoStr("Veinte mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		
		//PROGRAMAS ESTATALES
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.SEGUNDA_ASAMBLEA);//Segunda Asamblea
		cePrograma.setcPrograma(new Short ("20"));//Programa de Lectura
		cePrograma.setIndRecurso("1");
		cePrograma.setAnioIngreso("2011");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados y que comprenda cada detalle de lo que estan leyendo");
		cePrograma.setNomBenefactor("Televisa");
		cePrograma.setMonto(new BigDecimal("5000.00"));
		cePrograma.setMontoStr("Cinco mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.SEGUNDA_ASAMBLEA);//Segunda Asamblea
		cePrograma.setcPrograma(new Short ("33"));//Desayunos Escolares
		cePrograma.setIndRecurso("1");
		cePrograma.setAnioIngreso("2011");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos tengan salud para un mejor aprendizaje");
		cePrograma.setNomBenefactor("Televisa");
		cePrograma.setMonto(new BigDecimal("8000.00"));
		cePrograma.setMontoStr("Ocho mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		
		//PROGRAMAS MUNICIPALES
		
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.SEGUNDA_ASAMBLEA);//Segunda Asamblea
		cePrograma.setcPrograma(new Short ("40"));//Reconocimiento y Estímulos a Maestros y Escuelas
		cePrograma.setIndRecurso("1");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Estimular a los maestros y escuelas que obtengan mejor puntaje en las pruebas enlace");
		cePrograma.setNomBenefactor("Gobierno");
		cePrograma.setMonto(new BigDecimal("50000.00"));
		cePrograma.setMontoStr("Cincuenta mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.SEGUNDA_ASAMBLEA);//Segunda Asamblea
		cePrograma.setcPrograma(new Short ("44"));//Idioma Inglés
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos aprendan otro idioma");
		cePrograma.setNomBenefactor("Gobierno");
		cePrograma.setMonto(new BigDecimal("50000.00"));
		cePrograma.setMontoStr("Cincuenta mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		//PROYECTOS CON ORGANIZACIONES DE LA SOCIEDAD CIVIL	
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcCct(C_CCT);
		cePrograma.setcSesion(Constants.SEGUNDA_ASAMBLEA);//Segunda Asamblea
		cePrograma.setcPrograma(new Short ("50"));//Becas
		cePrograma.setIndRecurso("1");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos de bajos recursos obtengan becas para que no abandonen sus estudios");
		cePrograma.setNomBenefactor("Gobierno");
		cePrograma.setMonto(new BigDecimal("25000.00"));
		cePrograma.setMontoStr("veinticinco mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		/*----------------------RECURSOS-----------------------------*/
		
		//Lista de recursos.
		ArrayList<CeRecurso> recursos = new ArrayList<CeRecurso>();
		
		
		//Recurso de catálogo y se conocen los datos del mismo.
		CeRecurso ceRecurso = new CeRecurso();
		ceRecurso.setcCct(C_CCT);
		ceRecurso.setcSesion(Constants.SEGUNDA_ASAMBLEA);//Segunda Asamblea
		ceRecurso.setcRecurso(new Short ("0"));//Donación
		ceRecurso.setIndRecurso("1");
		ceRecurso.setMonto(new BigDecimal("15000.00"));
		ceRecurso.setMontoStr("Quince  mil pesos 00/100 MN");
		ceRecurso.setUso("Compra de material didactico");
		recursos.add(ceRecurso);
		
		
		/*----------------------MEJORAS-----------------------------*/
		
		//Lista de mejoras.
		ArrayList<CeMejoraCctCstm> mejoras = new ArrayList<CeMejoraCctCstm>();
		
		
		//Mejora que no esta en el catálogo en la cual  se conoce los recursos.
		CeMejoraCctCstm ceMejoraCct = new CeMejoraCctCstm();
		ceMejoraCct.setcCct(C_CCT);
		ceMejoraCct.setcSesion(Constants.SEGUNDA_ASAMBLEA); //Segunda Asamblea
		ceMejoraCct.setcMejoraCct(new Short("11")); //Otra
		ceMejoraCct.setIndRecurso("1");
		ceMejoraCct.setNomOtraMejora("Construcción y reparación de áreas deportivas");
		ceMejoraCct.setPeriodoInicio("2011");
		ceMejoraCct.setActividades("Planeación, Organización, Dirección y Control");
		ceMejoraCct.setMonto(new BigDecimal("25000.00"));
		ceMejoraCct.setMontoStr("Veinticinco mil pesos 00/100 MN");
		mejoras.add(ceMejoraCct);
		
		
		//Mejora que esta en el catálogo en la cual  se conoce los recursos.
		ceMejoraCct = new CeMejoraCctCstm();
		ceMejoraCct.setcCct(C_CCT);
		ceMejoraCct.setcSesion(Constants.SEGUNDA_ASAMBLEA); //Segunda Asamblea
		ceMejoraCct.setcMejoraCct(new Short("1")); //Construcción o Reparación de Aula y/o Biblioteca
		ceMejoraCct.setIndRecurso("1");
		ceMejoraCct.setPeriodoInicio("2010");
		ceMejoraCct.setActividades("Planeación, Organización, Dirección y Control");
		ceMejoraCct.setMonto(new BigDecimal("30000.00"));
		ceMejoraCct.setMontoStr("Treinta mil pesos 00/100 MN");
		mejoras.add(ceMejoraCct);
		
		
		segundaAsamblea.setMejoras(mejoras);
		
		
		
		/*----------------------COMITES---------------------------------------*/
		//Lista de comites.
		ArrayList<CeComiteCstm> comites = new ArrayList<CeComiteCstm>();
		
		CeComiteCstm ceComite = new CeComiteCstm();
		ceComite.setcCct(C_CCT);
		ceComite.setcSesion(Constants.SEGUNDA_ASAMBLEA);
		ceComite.setcComite(21); // Otro comite que no pertenece al catálogo
		ceComite.setNomOtroComite("De EDUCACIÓN F�?SICA");
		ceComite.setNumIntegrantes(new Short("3"));
		ceComite.setIndProyAnualCom(true);
		ceComite.setProyAnualCom("F�?SICA");
		ceComite.setClasificacionComite("ABC");
		comites.add(ceComite);
		
		ceComite = new CeComiteCstm();
		ceComite.setcCct(C_CCT);
		ceComite.setcSesion(Constants.SEGUNDA_ASAMBLEA);
		ceComite.setcComite(1); // Comite de lectura
		ceComite.setNumIntegrantes(new Short("2"));
		ceComite.setIndProyAnualCom(true);
		ceComite.setProyAnualCom("LECTURA");
		ceComite.setClasificacionComite("CBA");
		comites.add(ceComite);
		
		segundaAsamblea.setComites(comites);
		
		
								
		return segundaAsamblea;
	
	}

		
	
	/*
	public static SegundaReunionVO getSegundaReunionBean(){
		SegundaReunionVO segunda = new SegundaReunionVO();

		ArrayList<CCct> ccts = new ArrayList<CCct>(); 
		CCct cct = new CCct();
		cct.setcCct(1249);
		ccts.add(cct);
		cct = new CCct();
		cct.setcCct(1419);
		ccts.add(cct);
		cct = new CCct();
		cct.setcCct(1450);
		ccts.add(cct);
		cct = new CCct();
		cct.setcCct(1486);
		ccts.add(cct);
		
		CeSesion ceSesion = new CeSesion();
		ceSesion.setHoraIniSesion("10:00");
		ceSesion.setHoraFinSesion("12:00");
		ceSesion.setNumIntegrantes(new Short("123"));
		ceSesion.setFchSesion(new Date());
		ceSesion.setUsrCaptura("yo");
		
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setCActividad(new Short("1"));
		actividades.add(CeActSesionCstm);
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setCActividad(new Short("2"));
		actividades.add(CeActSesionCstm);
		
		ArrayList<CeProgramaAsamb> programas = new ArrayList<CeProgramaAsamb>();
		CeProgramaAsamb programa = new CeProgramaAsamb();
		programa.setCPrograma(new Short("55"));
		programas.add(programa);
		programa = new CeProgramaAsamb();
		programa.setCPrograma(new Short("56"));
		programas.add(programa);
		programa = new CeProgramaAsamb();
		programa.setCPrograma(new Short("57"));
		programas.add(programa);
		programa = new CeProgramaAsamb();
		programa.setCPrograma(new Short("58"));
		programa.setNomOtroPrograma("FALTA LA OPCI�N OTRO");
		programas.add(programa);
		
		ArrayList<CeComiteInt> comites = new ArrayList<CeComiteInt>();
		CeComiteInt comite = new CeComiteInt();
		comite.setCComite(new Short("10"));
		comites.add(comite);
		comite = new CeComiteInt();
		comite.setCComite(new Short("11"));
		comites.add(comite);
		comite = new CeComiteInt();
		comite.setCComite(new Short("12"));
		comites.add(comite);		
		comite = new CeComiteInt();
		comite.setCComite(new Short("13"));
		comites.add(comite);
		
		segunda.setCeSesion(ceSesion);
		segunda.setActividades(actividades);
		segunda.setProgramasAsamb(programas);
		segunda.setComitesInt(comites);
		segunda.setCCcts(ccts);
		
		return segunda; 
	} 
	
	public static TerceraReunionVO getTerceraReunionBean(){
		TerceraReunionVO segunda = new TerceraReunionVO();



		CeSesion ceSesion = new CeSesion();
                ceSesion.setcCct(1249);
                ceSesion.setCSesion(Constants.TERCERA_REUNION);
		ceSesion.setHoraIniSesion("10:00");
		ceSesion.setHoraFinSesion("12:00");
		ceSesion.setNumIntegrantes(new Short("123"));
		ceSesion.setFchSesion(new Date());
		ceSesion.setUsrCaptura("yo");

		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setCActividad(new Short("1"));
		actividades.add(CeActSesionCstm);
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setCActividad(new Short("2"));
		actividades.add(CeActSesionCstm);

		ArrayList<CeProgramaReal> programas = new ArrayList<CeProgramaReal>();
		CeProgramaReal programa = new CeProgramaReal();
		programa.setCPrograma(new Short("55"));
		programas.add(programa);
		programa = new CeProgramaReal();
		programa.setCPrograma(new Short("56"));
		programas.add(programa);
		programa = new CeProgramaReal();
		programa.setCPrograma(new Short("57"));
		programas.add(programa);
		programa = new CeProgramaReal();
		programa.setCPrograma(new Short("58"));
		programa.setNomOtroPrograma("FALTA LA OPCI�N OTRO");
		programas.add(programa);

		ArrayList<CeComiteReal> comites = new ArrayList<CeComiteReal>();
		CeComiteReal comite = new CeComiteReal();
		comite.setCComite(new Short("10"));
		comites.add(comite);
		comite = new CeComiteReal();
		comite.setCComite(new Short("11"));
		comites.add(comite);
		comite = new CeComiteReal();
		comite.setCComite(new Short("12"));
		comites.add(comite);
		comite = new CeComiteReal();
		comite.setCComite(new Short("13"));
		comites.add(comite);

		segunda.setCeSesion(ceSesion);
		segunda.setActividades(actividades);

		return segunda;
	}
	*/
	
	/*-----------------------------------------------------------
	-------------------TERCERA SESION----------------------------
	-------------------------------------------------------------*/
	
	public static TerceraSesionVO getTerceraSesionBean(){
		
		TerceraSesionVO terceraSesionVO = new TerceraSesionVO();
		
		final Integer C_CCT = 91; 
		
		//Datos generales del Consejo
	
		CeInfGral ceInfGral = new CeInfGral(); 
		ceInfGral.setcCct(C_CCT);
		terceraSesionVO.setCeInfGral(ceInfGral);
		
		/*----------------------INFORMACIÓN GENERAL---------------------*/	
		
		CeSesion ceSesion = new CeSesion();
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("09:00");
		ceSesion.setHoraFinSesion("14:00"); 
		ceSesion.setNumIntegrantes(new Short("53"));
		ceSesion.setObservaciones("Esta es una prueba de la segunda Asamblea");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("KOCOTL");
		ceSesion.setCadena("!#$%&/()");
		
		terceraSesionVO.setCeSesion(ceSesion);
		
		
		/*----------------------ACTIVIDADES-----------------------------*/
		//Lista de Actividades.
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		
		//Conoció el monto y destino de los recursos que les asignaron a través de programas federales,<br> estatales, Municipales o locales y Proyectos llevados a cabo con Organizaciones de la Sociedad Civil
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("51"));
		actividades.add(CeActSesionCstm);
		
		//Acordó eventos deportivos, recreativos, artísticos y culturales
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("52"));
		actividades.add(CeActSesionCstm);
		
		//Apoyo y seguimiento de los consejos municipales a los Consejos Escolares
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("53"));
		actividades.add(CeActSesionCstm);
		
		terceraSesionVO.setActividades(actividades);
		
		/*----------------------PROGRAMAS-----------------------------*/
		
		//Lista de programas.
		ArrayList<CeProgramaCstm> programas = new ArrayList<CeProgramaCstm>();
		
		
		//PROGRAMAS FEDERALES
		//Programa del catálogo en el cual no se conoce los recursos.
		CeProgramaCstm cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("1"));//Programa Escuela de Calidad
		cePrograma.setIndRecurso("1");
		cePrograma.setMonto(new BigDecimal("30000.00"));
		cePrograma.setMontoStr("Treinta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual no se conoce los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("4"));//Escuela de Bajo Rendimiento
		cePrograma.setIndRecurso("1");
		cePrograma.setMonto(new BigDecimal("30000.00"));
		cePrograma.setMontoStr("Treinta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Mejorar el rendimiento de los alumnos");
		programas.add(cePrograma);
		
		
		//Programa que no esta en el catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("12"));//Programa Ver Bien para Aprender Mejor
		cePrograma.setIndRecurso("1");
		cePrograma.setMonto(new BigDecimal("20000.00"));
		cePrograma.setMontoStr("Veinte mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos que tienen problemas en su vista tengan lentes.");
		programas.add(cePrograma);
		
		
		//PROGRAMAS ESTATALES
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("20"));//Programa de Lectura
		cePrograma.setIndRecurso("1");
		cePrograma.setMonto(new BigDecimal("5000.00"));
		cePrograma.setMontoStr("Cinco mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados y que comprenda cada detalle de lo que estan leyendo");
		programas.add(cePrograma);
		
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("33"));//Desayunos Escolares
		cePrograma.setIndRecurso("1");
		cePrograma.setMonto(new BigDecimal("8000.00"));
		cePrograma.setMontoStr("Ocho mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos tengan salud para un mejor aprendizaje");
		programas.add(cePrograma);
		
		
		//PROGRAMAS MUNICIPALES
		
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("40"));//Reconocimiento y Estímulos a Maestros y Escuelas
		cePrograma.setIndRecurso("1");
		cePrograma.setMonto(new BigDecimal("50000.00"));
		cePrograma.setMontoStr("Cincuenta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Estimular a los maestros y escuelas que obtengan mejor puntaje en las pruebas enlace");
		programas.add(cePrograma);
		
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("44"));//Idioma Inglés
		cePrograma.setIndRecurso("1");
		cePrograma.setMonto(new BigDecimal("50000.00"));
		cePrograma.setMontoStr("Cincuenta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos aprendan otro idioma");
		programas.add(cePrograma);
		
		//PROYECTOS CON ORGANIZACIONES DE LA SOCIEDAD CIVIL	
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("50"));//Becas
		cePrograma.setIndRecurso("1");
		cePrograma.setMonto(new BigDecimal("25000.00"));
		cePrograma.setMontoStr("veinticinco mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos de bajos recursos obtengan becas para que no abandonen sus estudios");
		programas.add(cePrograma);
		
		terceraSesionVO.setProgramas(programas);
		
		/*----------------------EVENTOS-----------------------------*/
		
		//Lista de recursos.
		ArrayList<CeEventoCstm> eventos = new ArrayList<CeEventoCstm>();
		
		//Evento
		CeEventoCstm ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("1")); //Futbol
		ceEvento.setIndRecurso("1");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO FUTBOL");
		eventos.add(ceEvento);
		
		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("2")); //Basquetbol
		ceEvento.setIndRecurso("1");
		ceEvento.setPeriodoRealizado("2011-2012");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO BASQUETBOL");
		eventos.add(ceEvento);
		
		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("17")); //Otro
		ceEvento.setIndRecurso("1");
		ceEvento.setNomOtroEvento("YOGA");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO OTRO");
		eventos.add(ceEvento);
		
		terceraSesionVO.setEventos(eventos);
		
		//Consejos Minicipales
		CmSeguimiento cmSeguimiento = new CmSeguimiento();
		cmSeguimiento.setAccionesSeg("ACIONES");
		cmSeguimiento.setDesApoyo("MUCHO APOYO MUNICIPAL");
		cmSeguimiento.setDesApoyoGestion("MUCHO APOYO MUNICIPAL EN LA GESTION");
		cmSeguimiento.setIndApoyoProg("1");
		cmSeguimiento.setIndConsejoEst("1");
		cmSeguimiento.setIndConsejoMun("1");
		cmSeguimiento.setIndSegEnlace("1");
		cmSeguimiento.setInstitucionGestion("INSTITUCION");
		
		terceraSesionVO.setSeguimientoMunicipal(cmSeguimiento);
		
		return terceraSesionVO;
	
	}	

	
	public static CuartaSesionVO getCuartaSesionBean(){
		
		CuartaSesionVO cuartaSesionVO = new CuartaSesionVO();
		
		final Integer C_CCT = 100; 
		
		//Datos generales del Consejo
	
		CeInfGral ceInfGral = new CeInfGral(); 
		ceInfGral.setcCct(C_CCT);
		cuartaSesionVO.setCeInfGral(ceInfGral);
		
		return cuartaSesionVO; 
	}

	public static ActaConstitutivaVO getActaConstitutivaBean(){
		ActaConstitutivaVO acta = new ActaConstitutivaVO();		
				
		ApecCstm apec = new ApecCstm();
		
		
		apec.setFchIntegracion(new Date());
		apec.setPeriodo("2013-2015");
		apec.setStatusApec((short)3);
		apec.setIdEntidadfed((short)1);
		apec.setIdMunicipio(1);
		apec.setIdLocalidad(191);
		apec.setTpoRegistro("1");
		
		/*
		 * {"apec":{"cApec":97,"fchIntegracion":1383890400000,"periodo":"2013-2015",
		 * "statusApec":3,"tpoRegistro":"1","idLocalidad":191,"idMunicipio":1,"idEntidadfed":1,
		 * "nomMunicipio":"AGUASCALIENTES","nomLocalidad":"LOS DURON","indAulaCompartida":false,"nomEntidadFed":"AGUASCALIENTES"}
		 * ,"centrosConafe":[{"cCct":1401,"cveCct":"01KJN0176D","nomCct":null,"cvePrograma":null,"nomNivel":"PREESCOLAR"},
		 * {"cCct":276005,"cveCct":"01FEI0336S","nomCct":null,"cvePrograma":null,"nomNivel":"INICIAL NO"}],
		 * "localidad":null,
		 * "reunion":{"cApec":97,"cReunion":1,"fchReunion":1383890400000,"horaIni":"10:00","horaFin":"12:00",
		 * "observaciones":"ACTA CONSTITUTIVA","fchRegistro":1385964000000,"usrCaptura":"01ENLACE","cadena":"Bc0m/e4D9Sp0HNr2kgiG"},
		 * "instructores":[{"cApec":97,"cReunion":1,"cApecInstructor":97,"cInstructor":1,
		 * "instructor":{"cApec":97,"cInstructor":1,"paternoInstructor":"VAZQUEZ","maternoInstructor":"LINARES",
		 * "nombreInstructor":"JOSE","genero":"M","edad":28,"cNiveleduc":11,"nomNiveleduc":"Carrera Técnica",
		 * "ccts":[{"cCct":1401,"cveCct":"01KJN0176D","nomCct":null,"cvePrograma":null,"nomNivel":"PREESCOLAR"},
		 * {"cCct":276005,"cveCct":"01FEI0336S","nomCct":null,"cvePrograma":null,"nomNivel":"INICIAL NO"}]},
		 * "editable":false,"imprimir":false}],"integrantes":[{"cApec":97,"cReunion":1,"cApecIntegrante":97,"cIntegrante":1,"integrante":{"cApec":97,"cIntegrante":1,"paternoIntegrante":"ISLAS","maternoIntegrante":"MORENO","nombreIntegrante":"JOSE","cCargo":4,"genero":"M","edad":43,"cNiveleduc":6},"nomCargo":"PRESIDENTE","nomNiveleduc":"Carrera Técnica"},{"cApec":97,"cReunion":1,"cApecIntegrante":97,"cIntegrante":2,"integrante":{"cApec":97,"cIntegrante":2,"paternoIntegrante":"MENDEZ","maternoIntegrante":"HERNANDEZ","nombreIntegrante":"ALINE","cCargo":6,"genero":"F","edad":28,"cNiveleduc":5},"nomCargo":"VOCAL","nomNiveleduc":"Media Superior"}],"asistentes":[]}
		 */

		ApecReunion reunion = new ApecReunion();
		
		
		reunion.setcReunion(Constants.ACTA_CONSTITUTIVA);
		reunion.setFchReunion(new Date());
		reunion.setUsrCaptura("O1ENLACE");
		reunion.setCadena("c0m/e4D9Sp0HNr2kgiG");
		reunion.setHoraIni("10:00");
		reunion.setHoraFin("12:00");
		
		List<ApecReunionInstructorCtsm> instructores = new ArrayList<ApecReunionInstructorCtsm>();
		ApecReunionInstructorCtsm relacionInst1= new ApecReunionInstructorCtsm();
		ApecInstructorCstm instructor = new ApecInstructorCstm();
				
		
		instructor.setcInstructor((short)1);
		instructor.setPaternoInstructor("VAZQUEZ");
		instructor.setMaternoInstructor("LINARES");
		instructor.setNombreInstructor("JOSE");
		instructor.setGenero("M");
		instructor.setEdad((short)28);
		instructor.setcNiveleduc(11);
		
		List<CCctLight> programas_educativos = new ArrayList<CCctLight>();
		CCctLight pro1= new CCctLight();
		pro1.setcCct(1401);
		
		programas_educativos.add(pro1);
		
		instructor.setCcts(programas_educativos);
		relacionInst1.setInstructor(instructor);		
		relacionInst1.setcReunion(Constants.ACTA_CONSTITUTIVA);
		
		instructores.add(relacionInst1);
		
		
		/*
		 *  * "instructores":[{"cApec":97,"cReunion":1,"cApecInstructor":97,"cInstructor":1,
		 * "instructor":{"cApec":97,"cInstructor":1,"paternoInstructor":"VAZQUEZ","maternoInstructor":"LINARES",
		 * "nombreInstructor":"JOSE","genero":"M","edad":28,"cNiveleduc":11,"nomNiveleduc":"Carrera Técnica",
		 * "ccts":[{"cCct":1401,"cveCct":"01KJN0176D","nomCct":null,"cvePrograma":null,"nomNivel":"PREESCOLAR"},
		 * {"cCct":276005,"cveCct":"01FEI0336S","nomCct":null,"cvePrograma":null,"nomNivel":"INICIAL NO"}]},
		 * "editable":false,"imprimir":false}],
		 * "integrantes":[{"cApec":97,"cReunion":1,"cApecIntegrante":97,"cIntegrante":1,
		 * "integrante":{"cApec":97,"cIntegrante":1,"paternoIntegrante":"ISLAS","maternoIntegrante":"MORENO",
		 * "nombreIntegrante":"JOSE","cCargo":4,"genero":"M","edad":43,"cNiveleduc":6},
		 * "nomCargo":"PRESIDENTE","nomNiveleduc":"Carrera Técnica"},
		 * {"cApec":97,"cReunion":1,"cApecIntegrante":97,"cIntegrante":2,
		 * "integrante":{"cApec":97,"cIntegrante":2,"paternoIntegrante":"MENDEZ",
		 * "maternoIntegrante":"HERNANDEZ","nombreIntegrante":"ALINE","cCargo":6,"genero":"F","edad":28,"cNiveleduc":5},
		 * "nomCargo":"VOCAL","nomNiveleduc":"Media Superior"}],"asistentes":[]}
		 */
		
		List<ApecReunionIntegranteCstm> integrantes = new ArrayList<ApecReunionIntegranteCstm>();
		ApecReunionIntegranteCstm relacionInte1= new ApecReunionIntegranteCstm();
		ApecIntegranteCstm integrante1 = new ApecIntegranteCstm();
		
				
		
		integrante1.setcIntegrante((short)1);
		integrante1.setPaternoIntegrante("ISLAS");
		integrante1.setMaternoIntegrante("MORENO");
		integrante1.setNombreIntegrante("JOSE");
		integrante1.setGenero("M");
		integrante1.setEdad((short)43);
		integrante1.setcNiveleduc(6);
		integrante1.setcCargo(4);
		
		
		relacionInte1.setIntegrante(integrante1);		
		relacionInte1.setcReunion(Constants.ACTA_CONSTITUTIVA);
		
		integrantes.add(relacionInte1);
		 		
		
		ApecReunionIntegranteCstm relacionInte2= new ApecReunionIntegranteCstm();
		ApecIntegranteCstm integrante2 = new ApecIntegranteCstm();
		
				
		integrante2.setcIntegrante((short)2);
		integrante2.setPaternoIntegrante("MENDEZ");
		integrante2.setMaternoIntegrante("HERNANDEZ");
		integrante2.setNombreIntegrante("ALINE");
		integrante2.setGenero("F");
		integrante2.setEdad((short)28);
		integrante2.setcNiveleduc(5);
		integrante2.setcCargo(6);
		
		
		relacionInte2.setIntegrante(integrante2);
		relacionInte2.setcReunion(Constants.ACTA_CONSTITUTIVA);
		
		integrantes.add(relacionInte2);
		
		
		List<ApecAsistenteCstm> asistentes = new ArrayList<ApecAsistenteCstm>();
		acta.setApec(apec);
		acta.setInstructores(instructores);
		acta.setIntegrantes(integrantes);
		acta.setReunion(reunion);
		acta.setAsistentes(asistentes);
			
		
		return acta; 
	} 

}
