package test.mx.gob.sep.dgtec.repuce.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import mx.gob.sep.dgtec.repuce.model.CctResultEnlace;
import mx.gob.sep.dgtec.repuce.model.CeComiteCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompEnlaceCstm;
import mx.gob.sep.dgtec.repuce.model.CeEventoCstm;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctCstm;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.model.CmSeguimiento;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ActaMinutaInfoVO;
import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;
import mx.gob.sep.dgtec.repuce.vo.IndicadorEnlaceVO;
import mx.gob.sep.dgtec.repuce.vo.InformeTransparenciaVO;
import mx.gob.sep.dgtec.repuce.vo.ProgramaVO;
import mx.gob.sep.dgtec.repuce.vo.SesionVO;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;

/**
 *
 * @author  ismaelrosas
 */	
public class SampleJRDataSourceInformeTransparenciaFactory {
    
     
    public static  Vector<ActaMinutaInfoVO>  createBeanCollection()
    {
        Vector<ActaMinutaInfoVO> coll = new Vector<ActaMinutaInfoVO>();
        
        /*
        List<CeIntegranteCstm> integrantes;
		List<CeSesion> sesiones;
		List<CeComiteCstm> comites;
		List<CePrograma> programas;
		List<CeMejoraCctCstm> mejoras;
		List<CeRecurso> recursos;
		List<CctResultEnlace> resultados;
		List<CeCompEnlaceCstm> compromisos;
		List<CeMetaEnlace> metas;
		List<CeEventoCstm> eventos;
		List<CmSeguimiento> seguimiento;
		CePlaneacionCstm planeacion;
         */
        
        InformeTransparenciaVO informeTransparenciaVO 
        					= new InformeTransparenciaVO();
		final Integer C_CCT = 100; 
		
		informeTransparenciaVO.setInformoSegundaAsamblea(true);
		informeTransparenciaVO.setInformoTerceraAsamblea(true);

		informeTransparenciaVO.setNomConsejeros(Arrays.asList(
				new String[]{"ISMAEL ROSAS SANDOVAL","SOCORRO MONTERO LOPEZ","CARLOS VALENCIA VÉRTIZ"}));
		
		CeInfGral ceInfGral = new CeInfGral();
		ceInfGral.setFchIntegracion(new Date());
		ceInfGral.setStatusCe(Constants.EDO_CE_MODIFICADO);
		
		//ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.INFORME_TRANSPARENCIA);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00"); 
		ceSesion.setNumIntegrantes(new Short("50"));
		ceSesion.setObservaciones("---- Esta es una prueba del informe de transparencia----");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("YO");
		ceSesion.setCadena("Gjey41/D7JC1Rq8fTGXT");
		
		//Integrantes
		ArrayList<CeIntegranteCstm> integrantes = new ArrayList<CeIntegranteCstm>();

		CeIntegranteCstm ceIntegrante = new CeIntegranteCstm();
		ceIntegrante.setcCct(C_CCT);
		ceIntegrante.setcSesion(new Short("1")); //Primera Asamblea
		ceIntegrante.setCscIntegrante(new Short("1"));
		ceIntegrante.setPaternoIntegrante("ROSAS");
		ceIntegrante.setMaternoIntegrante("SANDOVAL");
		ceIntegrante.setNombreIntegrante("ISMAEL");
		ceIntegrante.setNomCalidad("Representante de APF"); 
		ceIntegrante.setEmailIntegrante("xsxs@xxsx.com");
		ceIntegrante.setTelIntegrante("115321313213");
		ceIntegrante.setFchAlta(new Date());
		ceIntegrante.setNomCargo("PRESIDENTE");
		ceIntegrante.setcNiveleduc(1);
		ceIntegrante.setGenero("M"); //Hombre
		ceIntegrante.setNomNivel("Maternal"); 
		ceIntegrante.setNomNiveleduc("PREESCOLAR");
		ceIntegrante.setEstatusInt(new Short("1"));
		integrantes.add(ceIntegrante);

		ceIntegrante = new CeIntegranteCstm();
		ceIntegrante.setcCct(C_CCT);
		ceIntegrante.setcSesion(new Short("1")); //Primera Asamblea
		ceIntegrante.setCscIntegrante(new Short("2"));
		ceIntegrante.setPaternoIntegrante("VALENCIA");
		ceIntegrante.setMaternoIntegrante("VERTIZ");
		ceIntegrante.setNombreIntegrante("CARLOS AZIEL");
		ceIntegrante.setNomCalidad("Representante de Asociación sindical");
		ceIntegrante.setEmailIntegrante("enzo@godfather.com");
		ceIntegrante.setTelIntegrante("115321313213");
		ceIntegrante.setFchAlta(new Date());
		ceIntegrante.setNomCargo("SECRETARIO TÉCNICO");
		ceIntegrante.setNomNiveleduc("Licenciatura");
		ceIntegrante.setGenero("M"); //Hombre
		ceIntegrante.setNomNivel("PRIMARIA"); 
		ceIntegrante.setEstatusInt(new Short("1"));
		integrantes.add(ceIntegrante);


		ceIntegrante = new CeIntegranteCstm();
		ceIntegrante.setcCct(C_CCT);
		ceIntegrante.setcSesion(new Short("1")); //Primera Asamblea
		ceIntegrante.setCscIntegrante(new Short("3"));
		ceIntegrante.setPaternoIntegrante("MONTERO");
		ceIntegrante.setMaternoIntegrante("LOPEZ");
		ceIntegrante.setNombreIntegrante("SOCORRO");
		ceIntegrante.setNomCalidad("Padre de familia");  
		ceIntegrante.setEmailIntegrante("enzo@godfather.com");
		ceIntegrante.setTelIntegrante("115321313213");
		ceIntegrante.setFchAlta(new Date());
		ceIntegrante.setNomCargo("SECRETARIO TÉCNICO"); 
		ceIntegrante.setNomNiveleduc("Bachillerato");
		ceIntegrante.setGenero("F"); //Hombre
		ceIntegrante.setNomNivel("PRIMARIA");
		ceIntegrante.setEstatusInt(new Short("2"));
		integrantes.add(ceIntegrante);
		
		ceIntegrante = new CeIntegranteCstm();
		ceIntegrante.setcCct(C_CCT);
		ceIntegrante.setcSesion(new Short("1")); //Primera Asamblea
		ceIntegrante.setCscIntegrante(new Short("3"));
		ceIntegrante.setPaternoIntegrante("LENON");
		ceIntegrante.setMaternoIntegrante("MCCARTNEY");
		ceIntegrante.setNombreIntegrante("JUEN CARLOS");
		ceIntegrante.setNomCalidad("Padre de familia");  
		ceIntegrante.setEmailIntegrante("enzo@godfather.com");
		ceIntegrante.setTelIntegrante("115321313213");
		ceIntegrante.setFchAlta(new Date());
		ceIntegrante.setNomCargo("SECRETARIO TÉCNICO");
		ceIntegrante.setcNiveleduc(1);
		ceIntegrante.setGenero("M"); //Hombre
		ceIntegrante.setNomNivel("PRIMARIA");
		ceIntegrante.setEstatusInt(new Short("0"));
		integrantes.add(ceIntegrante);
		
		//Sesiones
		List<SesionVO> sesiones = new ArrayList<SesionVO>();
		SesionVO sesion = new SesionVO();
		sesion.setNumActividad("1.1");
		sesion.setcSesion(Constants.PRIMERA_ASAMBLEA);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("OBSERVACIONES DE LA PRIMERA ASAMBLEA");
		sesion.setNomActividad("Se constituyó al Consejo y eligió entre sus miembros al Presidente y al Secretario Técnico");
		sesion.setNomSesion("Primera Asamblea");
		sesion.setPctSesion(16.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("1.3");
		sesion.setcSesion(Constants.PRIMERA_ASAMBLEA);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS, CDSCDSCDS");
		sesion.setNomActividad("Otro");
		sesion.setNomOtraActividad("1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890");
		sesion.setNomSesion("Primera Asamblea");
		sesion.setPctSesion(16.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("2.1");
		sesion.setcSesion(Constants.PRIMERA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("sadasdasdassdsdasdasd");
		sesion.setNomActividad("Conoce informe de gestión que haya realizado la escuela de programas federales, estatales o locales, y proyectos llevados a cabo <br> con Organizaciones de la Sociedad Civil");
		sesion.setNomSesion("Primera Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("2.2");
		sesion.setcSesion(Constants.PRIMERA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("sadasdasdassdsdasdasd");
		sesion.setNomActividad("Solicitó  al personal directivo y docente expongan proyectos de trabajos específicos para mejoras de instalaciones del plantel");
		sesion.setNomSesion("Primera Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("2.3");
		sesion.setcSesion(Constants.PRIMERA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("sadasdasdassdsdasdasd");
		sesion.setNomActividad("Promovió se conozca el recurso proveniente de otras fuentes distintas a los programas, y que fueron recabados por el Consejo Escolar");
		sesion.setNomSesion("Primera Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("2.4");
		sesion.setcSesion(Constants.PRIMERA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("sadasdasdassdsdasdasd");
		sesion.setNomActividad("Conoce la planeación anual de su centro escolar para este ciclo");
		sesion.setNomSesion("Primera Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("2.5");
		sesion.setcSesion(Constants.PRIMERA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("sadasdasdassdsdasdasd");
		sesion.setNomActividad("Acordó la integración de  los comités en temas que tengan por objeto incorporarse a los siguientes programas");
		sesion.setNomSesion("Primera Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("3.2");
		sesion.setcSesion(Constants.SEGUNDA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("sadasdasdassdsdasdasd, sadasdasdassdsdasdasd, sadasdasdassdsdasdasd, sadasdasdassdsdasdasd, ssadasdasdassdsdasdasd, sadasdasdassdsdasdasd, sadasdasdassdsdasdasd, sadasdasdassdsdasdasd, sadasdasdassdsdasdasd, sadasdasdassdsdasdasd, sadasdasdassdsdasdasd");
		sesion.setNomActividad("Estableció metas y acciones complementarias para mejorar los resultados de las evaluaciones en mención");
		sesion.setNomSesion("Segunda Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setcSesion(Constants.SEGUNDA_ASAMBLEA);
		sesion.setNomSesion("Segunda Asamblea");
		sesiones.add(sesion);		
		sesion = new SesionVO();
		sesion.setNumActividad("5.1");
		sesion.setcSesion(Constants.TERCERA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("Esta es una prueba de la tercera sesion");
		sesion.setNomActividad("Conoció el monto y destino de los recursos que les asignaron a través de programas federales, <br>estatales, municipales o locales y proyectos llevados a cabo con Organizaciones de la Sociedad Civil");
		sesion.setNomSesion("Tercera Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("5.2");
		sesion.setcSesion(Constants.TERCERA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("Esta es una prueba de la tercera sesion");
		sesion.setNomActividad("Acordó eventos deportivos, recreativos, artísticos y culturales");
		sesion.setNomSesion("Tercera Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("5.3");
		sesion.setcSesion(Constants.TERCERA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("Esta es una prueba de la tercera sesion");
		sesion.setNomActividad("Apoyo y seguimiento de los consejos municipales a los Consejos Escolares");
		sesion.setNomSesion("Tercera Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("6.1");
		sesion.setcSesion(Constants.CUARTA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("ESTA ES UNA PRUEBA DE LA CUARTA SESION");
		sesion.setNomActividad("Conoció el uso de los recursos recabados durante su gestión y los montos recibidos por la escuela a través de programas y proyectos,<br> que sean responsabilidad del personal directivo o del propio Consejo Escolar");
		sesion.setNomSesion("Cuarta Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("6.3");
		sesion.setcSesion(Constants.CUARTA_SESION);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("ESTA ES UNA PRUEBA DE LA CUARTA SESION");
		sesion.setNomActividad("Informe de aceptación o negación de la asociación de padres de familia o su equivalente, a la invitación del consejo escolar, <br> sobre el monto y uso que se le dio  a los recursos recabados");
		sesion.setNomSesion("Cuarta Sesión");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		sesion = new SesionVO();
		sesion.setNumActividad("7.1");
		sesion.setcSesion(Constants.TERCERA_ASAMBLEA);
		sesion.setFchSesion(new Date());
		sesion.setObservaciones("ESTA ES UNA PRUEBA DE LA TERCERA ASAMBLEA");
		sesion.setNomActividad("Explicó y entregó informe público de transparencia y de resultados a la comunidad escolar ");
		sesion.setNomSesion("Tercera Asamblea");
		sesion.setPctSesion(14.0);
		sesiones.add(sesion);
		
		//Lista de recursos.
		ArrayList<CeRecurso> recursos = new ArrayList<CeRecurso>();
		
		CeRecurso ceRecurso = new CeRecurso();
		ceRecurso.setcCct(C_CCT);
		ceRecurso.setcSesion(Constants.PRIMERA_SESION);
		ceRecurso.setcRecurso(Constants.C_RECURSO_DONACION);//Donación
		ceRecurso.setIndRecurso("1");
		ceRecurso.setMonto(new BigDecimal("15000.00"));
		ceRecurso.setMontoStr("Quince  mil pesos 00/100 MN");
		ceRecurso.setUso("Planeación, Organización, Dirección y Control");
		recursos.add(ceRecurso);
		
		//Recurso del catálogo y no se conocen los datos.
		ceRecurso = new CeRecurso();
		ceRecurso.setcCct(C_CCT);
		ceRecurso.setcSesion(Constants.PRIMERA_SESION);
		ceRecurso.setcRecurso(Constants.C_RECURSO_RIFA);//Rifa
		ceRecurso.setMonto(new BigDecimal("3453647253"));
		recursos.add(ceRecurso);
		
		//Recursos APF
		ceRecurso = new CeRecurso();
		ceRecurso.setcRecurso(Constants.C_RECURSO_APF);//Rifa
		ceRecurso.setIndRecurso("1");
		ceRecurso.setMonto(new BigDecimal("1000"));
		ceRecurso.setMontoStr("Mil pesos");
		ceRecurso.setUso("ivfvufdyvf vfduvfduvfd vfduvuyfdhvufd vfdyuvufdyvuyfdv fdvfduyvfdvfdvd fvfdvfdvfd vvfdvhfdyuhvufdvfdv fdvfdvfdvfd vfdvfdvfd vfdvfdvdfvfd");
		//ceRecurso.setIndTransparenta(true);
		recursos.add(ceRecurso);

		//Programas
		List<ProgramaVO> programas = new ArrayList<ProgramaVO>();
		//PROGRAMAS FEDERALES
		ProgramaVO programa = new ProgramaVO();
		programa.setNomPrograma("Escuela de Bajo Rendimiento");
		programa.setNomTpoPrograma("Federal");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(3213.0);
		programa.setDiferencia(543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Escuela de Tiempo Completo");
		programa.setNomTpoPrograma("Federal");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(213213.0);
		programa.setDiferencia(543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Escuela Segura");
		programa.setNomTpoPrograma("Federal");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Escuela Siempre Abierta");
		programa.setNomTpoPrograma("Federal");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Mejores Escuelas");
		programa.setNomTpoPrograma("Federal");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Mobiliario Escolar");
		programa.setNomTpoPrograma("Estatal");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Desayunos Escolares");
		programa.setNomTpoPrograma("Estatal");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Programas Culturales");
		programa.setNomTpoPrograma("Estatal");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Reconocimiento y Estímulos a Maestros y Escuelas");
		programa.setNomTpoPrograma("Local");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Programas Educativos");
		programa.setNomTpoPrograma("Local");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setIndRecurso("0");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Infraestructura");
		programa.setNomTpoPrograma("Proyectos con Org. Sociedad Civil");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Computadoras");
		programa.setNomTpoPrograma("Proyectos con Org. Sociedad Civil");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("Valores");
		programa.setNomTpoPrograma("Proyectos con Org. Sociedad Civil");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("Sí");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setMontoFinal(32213213.0);
		programa.setDiferencia(454543.0);
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();
		programa.setNomPrograma("OTROS");
		programa.setNomTpoPrograma("Proyectos con Org. Sociedad Civil");
		programa.setAnioIngreso("2010-2011");
		programa.setProgramaGestionado("Sí");
		programa.setRecursoAsignado("No");
		programa.setObjetivo("bcjdbj dhscjdsh chdsbcjdsb cjhdsjchdsbhcds chjbdshjcbdscjds cbdshcbdsj cbdchjdsbjch dshjbcdsjcb dsjhcb dsbc hdsjbc dscbjhds chdsbc dshjbcds jcbsj hcds");
		programa.setIndRecurso("1");
		programas.add(programa);
		programa = new ProgramaVO();

		//Mejoras
		ArrayList<CeMejoraCctCstm> mejoras = new ArrayList<CeMejoraCctCstm>();
		CeMejoraCctCstm mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("1"));
		mejora.setIndRecurso("1");
		mejora.setNomOtraMejora("Construcción o Reparación de Aula y/o Biblioteca");
		mejora.setActividades("ACTIVIDADES 1");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 1");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejora.setActividadesFin("Las actividades del nueve");
		mejora.setObjetivoFin("Las metas  los objetivos del nueve");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("2"));
		mejora.setIndRecurso("1");
		mejora.setNomOtraMejora("Construcción o Reparación de Plaza Cívica");
		mejora.setActividades("ACTIVIDADES 2");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 2");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejora.setActividadesFin("Las actividades del nueve");
		mejora.setObjetivoFin("Las metas  los objetivos del nueve");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("3"));
		mejora.setIndRecurso("1");
		mejora.setNomOtraMejora("Construcción o Reparación de Sanitarios");
		mejora.setActividades("ACTIVIDADES 3");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 3");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("4"));
		mejora.setIndRecurso("1");
		mejora.setNomOtraMejora("Instalación o Reparación de Luz Eléctrica");
		mejora.setActividades("ACTIVIDADES 4");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 4");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejora.setActividadesFin("Las actividades del nueve");
		mejora.setObjetivoFin("Las metas  los objetivos del nueve");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("5"));
		mejora.setIndRecurso("0");
		mejora.setNomOtraMejora("Introducción o Reparación de Drenaje");
		mejora.setActividades("ACTIVIDADES 5");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 5");
		mejoras.add(mejora);
		
		//Lista de eventos.
		ArrayList<CeEventoCstm> eventos = new ArrayList<CeEventoCstm>();
		//Evento
		CeEventoCstm ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("1")); //Futbol
		ceEvento.setcSesion(new Short("1")); //Deportivos
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Futbol");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO FUTBOL");
		ceEvento.setMonto(new BigDecimal("1000"));
		ceEvento.setMontoStr("Mil pesos");
		eventos.add(ceEvento);
		
		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("2")); //Basquetbol
		ceEvento.setcSesion(new Short("1")); //Deportivos
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Basquetbol");
		ceEvento.setPeriodoRealizado("2011-2012");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO BASQUETBOL");
		ceEvento.setMonto(new BigDecimal("1000"));
		ceEvento.setMontoStr("Mil pesos");
		eventos.add(ceEvento);

		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("10")); //Otro
		ceEvento.setcSesion(new Short("2")); //Culturales
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Cuento");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO OTRO");
		ceEvento.setMonto(new BigDecimal("1000"));
		ceEvento.setMontoStr("Mil pesos");
		eventos.add(ceEvento);		

		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("17")); //Otro
		ceEvento.setcSesion(new Short("3")); //Otros
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Otros: YOGA");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO OTRO");
		ceEvento.setMonto(new BigDecimal("1000"));
		ceEvento.setMontoStr("Mil pesos");
		eventos.add(ceEvento);		

		
		//Planeacion
		CePlaneacionCstm planeacion = new CePlaneacionCstm();
		planeacion.setIndPlaneacion(true);
		planeacion.setcPlaneacion(new Short("2"));
		planeacion.setNomOtroPlaneacion("PETE");
		planeacion.setIndParticipacion(true);
		planeacion.setActividades("Muchas actividades de prueba");
		//planeacion.setIndCumplioPlaneacion(true);
		
		//Datos del CCT
		CCctViewVO cCctViewVO = new CCctViewVO();
		cCctViewVO.setcCct(C_CCT);
		cCctViewVO.setCveCct("01DES0007I");
		cCctViewVO.setNomCct("22 DE OCTUBRE");
		cCctViewVO.setDomicilio("GUADALUPE VICTORIA ESQUINA ALVARO OBREGON");
		cCctViewVO.setNomDirector("MARTHA PIÑA");
		cCctViewVO.setNomTurno("MATUTINO");
		cCctViewVO.setTelCct("9136544");
		cCctViewVO.setTelExtCct("21323");
		cCctViewVO.setNomEntidadFed("AGUASCALIENTES");
		cCctViewVO.setNomMunicipio("AGUASCALIENTES");
		cCctViewVO.setNomLocalidad("AGUASCALIENTES");
		cCctViewVO.setFchSesion(new Date());
		cCctViewVO.setZonaEscolar("003");
		cCctViewVO.setNumIntegrantes("5");
		cCctViewVO.setNomPresidente("CARLOS VALENCIA VÉRTIZ");
		cCctViewVO.setNomSecretario("ISMAEL ROSAS SANDOVAL");
		cCctViewVO.setPeriodo("2012-2014");
		
		//Comites
		ArrayList<CeComiteCstm> comites = new ArrayList<CeComiteCstm>();
		CeComiteCstm comite = new CeComiteCstm();
		comite.setcComite(1);
		comite.setNomComite("De lectura");
		comite.setNomIntegrantes("NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)");
		comite.setIndProyAnualCom(true);
		comite.setIndCumplieronAct(true);
		comite.setActividades("capacitacion de perosnal de proteccion");
		comites.add(comite);
		comite = new CeComiteCstm();
		comite.setcComite(2);
		comite.setNomComite("De mejoramiento de la Infraestructura");
		comite.setNomIntegrantes("NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)");
		comite.setIndProyAnualCom(true);
		comite.setIndCumplieronAct(false);
		comite.setActividades("creacion de planos");
		comites.add(comite);
		comite = new CeComiteCstm();
		comite.setcComite(3);
		comite.setNomComite("De protección civil y de seguridad de las escuelas");
		comite.setNomIntegrantes("EULOGIO XASXSAXAS XAXASXAS (PADRE DE FAMILIA), CHARLY CHARLY CHARLY (COMUNIDAD ESCOLAR)");
		comite.setIndProyAnualCom(true);
		comite.setIndCumplieronAct(true);
		comite.setActividades("creacion de la libreria");
		comites.add(comite);		
		comite = new CeComiteCstm();
		comite.setcComite(4);
		comite.setNomComite("De impulso a la activación física");
		comite.setNomIntegrantes("EULOGIO XASXSAXAS XAXASXAS (PADRE DE FAMILIA), CHARLY CHARLY CHARLY (COMUNIDAD ESCOLAR)");
		comite.setIndProyAnualCom(true);
		comite.setIndCumplieronAct(false);
		comite.setActividades("bailable");
		comites.add(comite);
		
		ArrayList<CeCompEnlaceCstm> compromisos = new ArrayList<CeCompEnlaceCstm>();
		CeCompEnlaceCstm compromiso = new CeCompEnlaceCstm();
		compromiso.setcCompEnlace(new Short("1"));
		compromiso.setNomCompEnlace("Establecer mecanismos para brindar una atención pedagógica específica a las alumnas y alumnos que se ubiquen en los niveles Insuficiente y Elemental en los resultados de la prueba Enlace.");
		compromisos.add(compromiso);
		compromiso = new CeCompEnlaceCstm();
		compromiso.setcCompEnlace(new Short("1"));
		compromiso.setNomCompEnlace("Establecer una corresponsabilidad entre madres, padres y tutores con los docentes, para fortalecer el trabajo académico tanto en el salón de clases como en los hogares.");
		compromisos.add(compromiso);
		compromiso = new CeCompEnlaceCstm();
		compromiso.setcCompEnlace(new Short("2"));
		compromiso.setNomCompEnlace("Capacitar a la comunidad escolar en su conjunto, en el diseño,elaboración, lectura e interpretación de gráficos relativos al desempeño global, por grado y asignatura de las alumnas y alumnos participantes en la prueba Enlace.");
		compromisos.add(compromiso);
		compromiso = new CeCompEnlaceCstm();
		compromiso.setcCompEnlace(new Short("2"));
		compromiso.setNomCompEnlace("Fortalecer  al  cuerpo  docente  que imparte las asignaturas y  temas que mayor dificultad hayan representado para el alumnado conforme a los resultados de la prueba Enlace.");
		compromisos.add(compromiso);
		compromiso = new CeCompEnlaceCstm();
		compromiso.setcCompEnlace(new Short("2"));
		compromiso.setNomCompEnlace("Exhortar y recomendar a las madres, padres o tutores, dedicar por lo menos una hora  diaria en  el  hogar,  al trabajo académico de las alumnas y alumnos; este tiempo  podría  ampliarse  media  hora  más  para  el  caso  de estudiantes con  niveles ");
		compromisos.add(compromiso);
		compromiso = new CeCompEnlaceCstm();
		compromiso.setcCompEnlace(new Short("3"));
		compromiso.setNomCompEnlace("Coordinar desde los consejos escolares, pláticas preparatorias o propedéuticas a los padres de familia, con el propósito de hacerlos partícipes de la enseñanza del alumnado.");
		compromisos.add(compromiso);
		compromiso = new CeCompEnlaceCstm();
		compromiso.setcCompEnlace(new Short("4"));
		compromiso.setNomCompEnlace("Programas cursos sabatinos para los alumnos con niveles de logro Insuficiente y Elemental (y en su caso, también para los alumnos de niveles Bueno y Excelente en la prueba Enlace que así lo decidan).");
		compromisos.add(compromiso);
		compromiso = new CeCompEnlaceCstm();
		compromiso.setcCompEnlace(new Short("4"));
		compromiso.setNomCompEnlace("Diseñar tareas y actividades extras para los alumnos de Insuficiente y Elemental para realizarse en el hogar (en su caso, también para los alumnos de niveles Bueno y Excelente en la prueba Enlace).");
		compromisos.add(compromiso);
		
		ArrayList<CeMetaEnlace> metas = new ArrayList<CeMetaEnlace>();
		CeMetaEnlace meta = new CeMetaEnlace();
		meta.setNumGrado(new Short("31"));
		meta.setNumMateria(new Short("1"));
		meta.setPuntosCct("655");
		meta.setPctBueno("31");
		meta.setPctElem("22");
		meta.setPctExcel("23");
		meta.setPctInsuf("24");
		metas.add(meta);
		meta = new CeMetaEnlace();
		meta.setNumGrado(new Short("32"));
		meta.setNumMateria(new Short("2"));
		metas.add(meta);
		
		ArrayList<CctResultEnlace> resultados = new ArrayList<CctResultEnlace>();
		CctResultEnlace resultado = new CctResultEnlace();
		resultado.setNumGrado(new Short("31"));
		resultado.setNumMateria(new Short("1"));
		resultado.setPuntosCct("655");
		resultado.setPuntosEdo("555");
		resultado.setPuntosNal("755");
		resultado.setPctBueno("31%");
		resultado.setPctElem("22%");
		resultado.setPctExcel("23%");
		resultado.setPctInsuf("24%");
		resultado.setAnioResult(new Short("2012"));
		resultados.add(resultado);

		IndicadorEnlaceVO indicador = new IndicadorEnlaceVO();
		indicador.setPctInsufLogroEsp(new BigDecimal("20.3"));
		indicador.setPctInsufLogroMat(new BigDecimal("10.5"));
		indicador.setPctInsufMetaEsp(new BigDecimal("12"));
		indicador.setPctInsufMetaMat(new BigDecimal("20"));

		//Consejos Minicipales
		CmSeguimiento cmSeguimiento = new CmSeguimiento();
		cmSeguimiento.setAccionesSeg("ACIONES");
		cmSeguimiento.setDesApoyo("MUCHO APOYO MUNICIPAL");
		cmSeguimiento.setDesApoyoGestion("MUCHO APOYO MUNICIPAL EN LA GESTION");
		cmSeguimiento.setIndApoyoProg("1");
		cmSeguimiento.setIndApoyo("1");
		cmSeguimiento.setIndApoyoGestion("1");
		cmSeguimiento.setIndConsejoEst("1");
		cmSeguimiento.setIndConsejoMun("1");
		cmSeguimiento.setIndSegEnlace("1");
		cmSeguimiento.setInstitucionGestion("INSTITUCION");
		
		informeTransparenciaVO.setCctViewVO(cCctViewVO);
		informeTransparenciaVO.setCeInfGral(ceInfGral);
		informeTransparenciaVO.setCeSesion(ceSesion);
		informeTransparenciaVO.setIntegrantes(integrantes);
		informeTransparenciaVO.setSesiones(sesiones);
		informeTransparenciaVO.setComites(comites);
		informeTransparenciaVO.setProgramas(programas);
		informeTransparenciaVO.setMejoras(mejoras);
		informeTransparenciaVO.setRecursos(recursos);
		informeTransparenciaVO.setResultados(resultados);
		informeTransparenciaVO.setCompromisos(compromisos);
		informeTransparenciaVO.setMetas(metas);
		informeTransparenciaVO.setEventos(eventos);
		informeTransparenciaVO.setSeguimientoMunicipal(cmSeguimiento);
		informeTransparenciaVO.setPlaneacion(planeacion);
		informeTransparenciaVO.setIndicadorEnlace(indicador);
        
        ActaMinutaInfoVO actaMinutaInfoVO = new ActaMinutaInfoVO();
        actaMinutaInfoVO.setInformeTransparencia(informeTransparenciaVO);

        coll.add(actaMinutaInfoVO);   
        
        return coll;
     }
    
   	/**
	 * Este metodo genera el documento PDF (actas y minutas) especificado por el usuario.  
	 * @param voDatos El objeto de valor con la informacion del reporte Para acuses: VOAcuse,
			  para comprobantes: VOFormatoPago. 
	 * @param jasperPath La ruta donde se ubican los archivos jasper.
	 * @param pdfPath La ruta donde se ubicara el archivo PDF generado.
	 * @param imagesPath La ruta donde se ubican las imagenes.
	 * @param pdfName Nombre del documento PDF a generar.
	 * @param tipoDocto Tipo de documento a generar.
	 * 
	 * @throws JRException, Exception
	 */
	public static void createPDF(List<ActaMinutaInfoVO> list,String path) 
			throws JRException, Exception{
		try{

			String jasperName = path + "/WEB-INF/jasperTemplates/InformeTransparencia.jasper";
			//logger.debug("Filling report..."+pdfPath+pdfName);
			//Sirve para almacenar los parametros del documento.
			HashMap<String,Object> hm = new HashMap<String,Object>();
			//Variable con el nombre del archivo jasper del documento

        	hm.put("pRuta",path);

			//Exporta la plantilla cargada con datos a PDF
			JRPdfExporter pdfExporter = new JRPdfExporter();
			
			//Establece los parametros de los subreportes y la fuente de datos.
			pdfExporter.setParameter(JRExporterParameter.JASPER_PRINT, 
				JasperFillManager.fillReport(jasperName,
						hm, new JRBeanCollectionDataSource(list)));

			//Establece el nombre de la plantilla para el documento.
			pdfExporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME,
					path + "/WEB-INF/jasperTemplates/InformeTransparencia.pdf");

			//logger.debug("Exporting report...");
			pdfExporter.exportReport();
			//logger.debug("Done!");
		
		}catch (JRException e){
			e.printStackTrace();
			throw e;
		}catch (Exception e){
			e.printStackTrace();
			throw e;
		}
	}    
    
	/**
	 * Rebobina el el apuntador del DataSource
	 * @param ds Datasouce a rebobinar
	 * @return
	 */
    public static JRDataSource rewindDataSource(JRDataSource ds) 
    		throws JRException{
    	((JRBeanCollectionDataSource)ds).moveFirst();
    	return ds;
    }

	//Metodo de prueba para los documentos, genera todos los documentos
    public static void main(String[] args) {    
    	final String PROJECT_PATH = System.getProperty("user.dir")+"/src/main/webapp/"; 
    		
    	List<ActaMinutaInfoVO> datos = createBeanCollection();
    	
    	Iterator<ActaMinutaInfoVO> it = datos.iterator();
    	List<ActaMinutaInfoVO> list;
    	    			
    	while (it.hasNext()){
    		list = new ArrayList<ActaMinutaInfoVO>();
    		list.add(it.next());
	    	try{
			    createPDF(list,PROJECT_PATH);
				
			}catch (Exception e){
				e.printStackTrace();
			}
    	}
    }
    
    
}
