package test.mx.gob.sep.dgtec.repuce.util;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import mx.gob.sep.dgtec.repuce.model.CeActSesionCstm;
import mx.gob.sep.dgtec.repuce.model.CeEventoCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.model.CmSeguimiento;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ActaMinutaInfoVO;
import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;
import mx.gob.sep.dgtec.repuce.vo.TerceraSesionVO;
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
public class SampleJRDataSourceTerceraSesionFactory {
    
    // This is the method to call to get the datasource.
    // The method must be static.....    
    public  JRDataSource createDatasource()
    {        
        return new JRBeanCollectionDataSource(createBeanCollection());
    }    
    
    public  JRDataSource createBeanCollectionDatasource()
    {
    	return new JRBeanCollectionDataSource(createBeanCollection());
    }    
     
    public static  Vector<ActaMinutaInfoVO>  createBeanCollection()
    {
        Vector<ActaMinutaInfoVO> coll = new Vector<ActaMinutaInfoVO>();
        
        TerceraSesionVO terceraSesionVO = new TerceraSesionVO(); 
		final Integer C_CCT = 91; 

		terceraSesionVO.setNomConsejeros(Arrays.asList(
				new String[]{"ISMAEL ROSAS SANDOVAL","SOCORRO MONTERO LOPEZ","CARLOS VALENCIA VÉRTIZ"}));
		
		//ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.TERCERA_SESION);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00"); 
		ceSesion.setNumIntegrantes(new Short("0"));
		ceSesion.setObservaciones("---- Esta es una prueba de impresion de la tercera sesion----");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("YO");
		ceSesion.setCadena("Gjey41/D7JC1Rq8fTGXT");
		
		//ce_act_sesion
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("51"));
		CeActSesionCstm.setNomOtraActividad("Apoyo y seguimiento de los consejos municipales a los Consejos Escolares");
		actividades.add(CeActSesionCstm);
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("52"));
		CeActSesionCstm.setNomOtraActividad("Conoció el monto y destino de los recursos que les asignaron a través de programas federales,<br> estatales, Municipales o locales y Proyectos llevados a cabo con Organizaciones de la Sociedad Civil");
		actividades.add(CeActSesionCstm);		
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("53"));
		CeActSesionCstm.setNomOtraActividad("Acordó eventos deportivos, recreativos, artísticos y culturales");
		actividades.add(CeActSesionCstm);		
        
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
		eventos.add(ceEvento);
		
		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("2")); //Basquetbol
		ceEvento.setcSesion(new Short("1")); //Deportivos
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Basquetbol");
		ceEvento.setPeriodoRealizado("2011-2012");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO BASQUETBOL");
		eventos.add(ceEvento);

		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("10")); //Otro
		ceEvento.setcSesion(new Short("2")); //Culturales
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Cuento");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO OTRO");
		eventos.add(ceEvento);		

		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("17")); //Otro
		ceEvento.setcSesion(new Short("3")); //Otros
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Otros: YOGA");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO OTRO");
		eventos.add(ceEvento);		
		
		//Programas
		List<CeProgramaCstm> programas = new ArrayList<CeProgramaCstm>();
		//PROGRAMAS FEDERALES
		//Programa del catálogo en el cual no se conoce los recursos.
		CeProgramaCstm cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("1"));//Programa Escuela de Calidad
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Programa Escuela de Calidad");
		cePrograma.setMonto(new BigDecimal("30000.00"));
		cePrograma.setMontoStr("Treinta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual no se conoce los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("4"));//Escuela de Bajo Rendimiento
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Escuela de Bajo Rendimiento");
		cePrograma.setMonto(new BigDecimal("30000.00"));
		cePrograma.setMontoStr("Treinta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Mejorar el rendimiento de los alumnos");
		programas.add(cePrograma);
		
		//Programa que no esta en el catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("12"));//Programa Ver Bien para Aprender Mejor
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Programa Ver Bien para Aprender Mejor");
		cePrograma.setMonto(new BigDecimal("20000.00"));
		cePrograma.setMontoStr("Veinte mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos que tienen problemas en su vista tengan lentes.");
		programas.add(cePrograma);
		
		
		//PROGRAMAS ESTATALES
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("20"));//Programa de Lectura
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_ESTATAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Programa de Lectura");
		cePrograma.setMonto(new BigDecimal("5000.00"));
		cePrograma.setMontoStr("Cinco mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados y que comprenda cada detalle de lo que estan leyendo");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("33"));//Desayunos Escolares
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_ESTATAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Desayunos Escolares");
		cePrograma.setMonto(new BigDecimal("8000.00"));
		cePrograma.setMontoStr("Ocho mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos tengan salud para un mejor aprendizaje");
		programas.add(cePrograma);
		
		
		//PROGRAMAS MUNICIPALES
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("40"));//Reconocimiento y Estímulos a Maestros y Escuelas
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_LOCAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Reconocimiento y Estímulos a Maestros y Escuelas");
		cePrograma.setMonto(new BigDecimal("50000.00"));
		cePrograma.setMontoStr("Cincuenta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Estimular a los maestros y escuelas que obtengan mejor puntaje en las pruebas enlace");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("44"));//Idioma Inglés
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_LOCAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Idioma Inglés");
		cePrograma.setMonto(new BigDecimal("50000.00"));
		cePrograma.setMontoStr("Cincuenta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos aprendan otro idioma");
		programas.add(cePrograma);
		
		//PROYECTOS CON ORGANIZACIONES DE LA SOCIEDAD CIVIL	
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("50"));//Becas
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_OSC);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Becas");
		cePrograma.setMonto(new BigDecimal("25000.00"));
		cePrograma.setMontoStr("veinticinco mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos de bajos recursos obtengan becas para que no abandonen sus estudios");
		cePrograma.setNomBenefactor("ALUNA ORGANIZACI[ON DE LA SOCIEDAD CIVIL");
		programas.add(cePrograma);
		
		//Datos del CCT
		CCctViewVO cCctViewVO = new CCctViewVO();
		cCctViewVO.setcCct(C_CCT);
		cCctViewVO.setCveCct("01DES0007I");
		cCctViewVO.setNomCct("22 DE OCTUBRE");
		cCctViewVO.setDomicilio("GUADALUPE VICTORIA ESQUINA ALVARO OBREGON");
		cCctViewVO.setNomDirector("MARTHA PIÑA");
		cCctViewVO.setNomTurno("MATUTINO");
		cCctViewVO.setTelCct("9136544");
		cCctViewVO.setTelExtCct("");
		cCctViewVO.setNomEntidadFed("AGUASCALIENTES");
		cCctViewVO.setNomMunicipio("AGUASCALIENTES");
		cCctViewVO.setNomLocalidad("AGUASCALIENTES");
		cCctViewVO.setFchSesion(new Date());
		cCctViewVO.setZonaEscolar("003");
		cCctViewVO.setNumIntegrantes("5");
		cCctViewVO.setNomPresidente("CARLOS VALENCIA VÉRTIZ");
		cCctViewVO.setNomSecretario("ISMAEL ROSAS SANDOVAL");
		cCctViewVO.setPeriodo("2012-2014");
		

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

		
		terceraSesionVO.setCctViewVO(cCctViewVO);
		terceraSesionVO.setCeSesion(ceSesion);
		terceraSesionVO.setActividades(actividades);
		terceraSesionVO.setProgramas(programas);
		terceraSesionVO.setEventos(eventos);
		terceraSesionVO.setSeguimientoMunicipal(cmSeguimiento);
        
        ActaMinutaInfoVO actaMinutaInfoVO = new ActaMinutaInfoVO();
        actaMinutaInfoVO.setTerceraSesion(terceraSesionVO);
        
        coll.add(actaMinutaInfoVO);   
        
        return coll;
     }
    
    public static  Vector<CeEventoCstm>  createBeanEventosCollection()
    {
        Vector<CeEventoCstm> coll = new Vector<CeEventoCstm>();
        
		//Evento
		CeEventoCstm ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("1")); //Futbol
		ceEvento.setcSesion(new Short("1")); //Deportivos
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Futbol");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO FUTBOL");
		coll.add(ceEvento);
		
		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("2")); //Basquetbol
		ceEvento.setcSesion(new Short("1")); //Deportivos
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Basquetbol");
		ceEvento.setPeriodoRealizado("2011-2012");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO BASQUETBOL");
		coll.add(ceEvento);

		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("10")); //Otro
		ceEvento.setcSesion(new Short("2")); //Culturales
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Cuento");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO OTRO");
		coll.add(ceEvento);		

		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("17")); //Otro
		ceEvento.setcSesion(new Short("3")); //Otros
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Otros: YOGA");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("ACTIVIDADES, ACTIVIDADES Y MAS ACTIVIDADES");
		ceEvento.setObjetivo("OBJETIVO OTRO");
		coll.add(ceEvento);	
      
        return coll;
     }

    public static  Vector<CmSeguimiento>  createBeanCmSeguimientoCollection()
    {
        Vector<CmSeguimiento> coll = new Vector<CmSeguimiento>();
        
		//Consejos Minicipales
		CmSeguimiento cmSeguimiento = new CmSeguimiento();
		cmSeguimiento.setAccionesSeg("ACIONES DDSCDSCDS CDSCDSCDS CDS CDS CDSCDSCDS CDSC DS C DS CDSC DSCDSCSDC DSCSD CDSCSDCSDCDS SCSDCSCS CSCDSCSCSCD DSCSCDDSCDS CSDCDSCDSC");
		cmSeguimiento.setDesApoyo("MUCHO APOYO MUNICIPAL DSUCDSCDS CSDCDSCDSC CSDCSDCDS CDSCDSCSDC DSCDSCDSCDS CDSCDSCDSCSDCSDC DSCSDCSDCDSCDS CSDCDSCDSCSDC DSCDSCSDCDSCDSCDS");
		cmSeguimiento.setDesApoyoGestion("MUCHO APOYO MUNICIPAL EN LA HC V  CDDSVCHDS VCGDSVHCDS GCVHDSGVCHDSVHC VDSVHCDSHCVSD GCSDHVCGDSVCHDSCDSGVHCVSD CDSGCDSHVCHG CDSCH");
		cmSeguimiento.setIndApoyo("1");
		cmSeguimiento.setIndApoyoGestion("1");
		cmSeguimiento.setIndApoyoProg("1");
		cmSeguimiento.setIndConsejoEst("1");
		cmSeguimiento.setIndConsejoMun("2");
		cmSeguimiento.setIndSegEnlace("1");
		cmSeguimiento.setInstitucionGestion("INSTITUCIO VHVHCD DHGSVCHDSVHCS CHGDSVCHGDSVC HGDSVCHGDSVC VHGDSVHCVDSHCVDS CHSDGVCGDSCN VCJDCD");
		
        coll.add(cmSeguimiento);   
        
        return coll;
     }

    public static  Vector<CeProgramaCstm>  createBeanProgramaCollection()
    {
		//Programas
		Vector<CeProgramaCstm> programas = new Vector<CeProgramaCstm>();
		/*
		CeProgramaCstm cePrograma = new CeProgramaCstm();
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		programas.add(cePrograma);
		cePrograma = new CeProgramaCstm();
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_ESTATAL);
		programas.add(cePrograma);
		cePrograma = new CeProgramaCstm();
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_LOCAL);
		programas.add(cePrograma);
		cePrograma = new CeProgramaCstm();
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_OSC);
		programas.add(cePrograma);
		
*/
		//PROGRAMAS FEDERALES
		//Programa del catálogo en el cual no se conoce los recursos.
		CeProgramaCstm cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("1"));//Programa Escuela de Calidad
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Programa Escuela de Calidad");
		cePrograma.setMonto(new BigDecimal("30000.00"));
		cePrograma.setMontoStr("Treinta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012-2013");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados");
		cePrograma.setMontoFinal(5000);
		cePrograma.setActividadesFin("APLICAR LAS ACTIVIDADES DE LA ESTRATEGIA 11+5, LECTURA DE CUENTOS POR PADRES DE FAMILIA EN EL AULA, REALIZAR LECTURA EN VOZ ALTA PERMANENTEMENTE, DEMO");
		cePrograma.setObjetivo("objetivoFin");
		cePrograma.setOtraDiferencia("Se regresó al programa");
		cePrograma.setMontoStr("Cincuenta mil pesos");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual no se conoce los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("4"));//Escuela de Bajo Rendimiento
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Escuela de Bajo Rendimiento");
		cePrograma.setMonto(new BigDecimal("30000.00"));
		cePrograma.setMontoStr("Treinta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012-2013");
		cePrograma.setActividades("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		cePrograma.setObjetivo("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		cePrograma.setMontoFinal(20000);
		cePrograma.setActividadesFin("actividadesFin");
		cePrograma.setObjetivoFin("Objetivos finales");
		cePrograma.setcDiferencia(new Short("7"));
		cePrograma.setOtraDiferencia("Se regresó al programa");
		cePrograma.setMontoFinalStr("Dos mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		//Programa que no esta en el catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("12"));//Programa Ver Bien para Aprender Mejor
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Programa Ver Bien para Aprender Mejor");
		cePrograma.setMonto(new BigDecimal("20000.00"));
		cePrograma.setMontoStr("Veinte mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012-2013");
		cePrograma.setActividades("CONFERENCIAS, TALLERES POR PARTE DE ESPECIALISTAS SOBRE PROTECCIÓN CIVIL, ORGANIZAR SITUACIONES DE APRENDIZAJE SOBRE PRIMEROS AUXILIOS, REALIZACIÓN DE");
		cePrograma.setObjetivo("CONFERENCIAS, TALLERES POR PARTE DE ESPECIALISTAS SOBRE PROTECCIÓN CIVIL, ORGANIZAR SITUACIONES DE APRENDIZAJE SOBRE PRIMEROS AUXILIOS, REALIZACIÓN DE");
		cePrograma.setMontoFinal(10000);
		cePrograma.setActividadesFin("Las actividads modificadas");
		cePrograma.setObjetivoFin("Objetivos finales");
		cePrograma.setcDiferencia(new Short("8"));
		cePrograma.setOtraDiferencia("Otra: Nos lo quedamos");
		cePrograma.setMontoFinalStr("Diez mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		
		//PROGRAMAS ESTATALES
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("20"));//Programa de Lectura
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_ESTATAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Programa de Lectura");
		cePrograma.setMonto(new BigDecimal("5000.00"));
		cePrograma.setMontoStr("Cinco mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("DAR A CONOCER LOS LINEALIENTOS Y VIGILAR PERMANENTEMENTE LA CALIDAD DE LOS ALIMENTOS Y BEBIDAS QUE SE DISTRIBUYEN EN LA ESCUELA DE ACUERDO A LOS LINEA");
		cePrograma.setObjetivo("DAR A CONOCER LOS LINEALIENTOS Y VIGILAR PERMANENTEMENTE LA CALIDAD DE LOS ALIMENTOS Y BEBIDAS QUE SE DISTRIBUYEN EN LA ESCUELA DE ACUERDO A LOS LINEA");
		cePrograma.setMontoFinal(6000);
		cePrograma.setcDiferencia(new Short("6"));
		cePrograma.setOtraDiferencia("Otra: Donativo sorpresa");
		cePrograma.setMontoFinalStr("Seis mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("33"));//Desayunos Escolares
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_ESTATAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Desayunos Escolares");
		cePrograma.setMonto(new BigDecimal("8000.00"));
		cePrograma.setMontoStr("Ocho mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("REALIZAR TALLERES DE RECREACIÓN LITERARIA, CANTO, TEATRO, DANZA E INSTRUMENTOS MUSICALES, ORGANIZAR FESTIVALES PARA CONMEMORAR FECHAS CÍVICAS Y SOCIO ");
		cePrograma.setObjetivo("REALIZAR TALLERES DE RECREACIÓN LITERARIA, CANTO, TEATRO, DANZA E INSTRUMENTOS MUSICALES, ORGANIZAR FESTIVALES PARA CONMEMORAR FECHAS CÍVICAS Y SOCIO ");
		cePrograma.setMontoFinal(8000);
		programas.add(cePrograma);
		
		
		//PROGRAMAS MUNICIPALES
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("40"));//Reconocimiento y Estímulos a Maestros y Escuelas
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_LOCAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Reconocimiento y Estímulos a Maestros y Escuelas");
		cePrograma.setMonto(new BigDecimal("50000.00"));
		cePrograma.setMontoStr("Cincuenta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012-2013");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Estimular a los maestros y escuelas que obtengan mejor puntaje en las pruebas enlace");
		cePrograma.setMontoFinal(60000);
		cePrograma.setActividadesFin("Las actividads modificadas");
		cePrograma.setObjetivoFin("Objetivos finales");
		cePrograma.setcDiferencia(new Short("1"));
		cePrograma.setOtraDiferencia("Padres de familia");
		cePrograma.setMontoFinalStr("Cincuenta mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("44"));//Idioma Inglés
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_LOCAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Idioma Inglés");
		cePrograma.setMonto(new BigDecimal("50000.00"));
		cePrograma.setMontoStr("Cincuenta mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012-2013");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos aprendan otro idioma");
		cePrograma.setMontoFinal(60000);
		cePrograma.setActividadesFin("Las actividads modificadas");
		cePrograma.setObjetivoFin("Objetivos finales");
		cePrograma.setcDiferencia(new Short("1"));
		cePrograma.setOtraDiferencia("Padres de familia");
		cePrograma.setMontoFinalStr("Sesenta mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		//PROYECTOS CON ORGANIZACIONES DE LA SOCIEDAD CIVIL	
		/*
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("50"));//Becas
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_OSC);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Becas");
		cePrograma.setMonto(new BigDecimal("25000.00"));
		cePrograma.setMontoStr("veinticinco mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2012-2013");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos de bajos recursos obtengan becas para que no abandonen sus estudios");
		cePrograma.setNomBenefactor("ALGUNA ORGANIZACIÓN DE LA SOCIEDAD CIVIL");
		cePrograma.setMontoFinal(26000);
		cePrograma.setActividadesFin("Las actividads modificadas");
		cePrograma.setObjetivoFin("Objetivos finales");
		cePrograma.setcDiferencia(new Short("1"));
		cePrograma.setOtraDiferencia("Padres de familia");
		cePrograma.setMontoFinalStr("Sesenta mil pesos 00/100 MN");
		programas.add(cePrograma);

		//PROYECTOS CON ORGANIZACIONES DE LA SOCIEDAD CIVIL	
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("50"));//Becas
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_OSC);
		cePrograma.setIndRecurso("0");
		cePrograma.setNomPrograma("Becas");
		cePrograma.setAnioIngreso("2011-2012");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos de bajos recursos obtengan becas para que no abandonen sus estudios");
		cePrograma.setNomBenefactor("Grupo Bimbo");

		programas.add(cePrograma);        
		*/
		cePrograma = new CeProgramaCstm();
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_OSC);
		programas.add(cePrograma);
		return programas;
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

			String jasperName = path + "/WEB-INF/jasperTemplates/TerceraSesion.jasper";
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
					path + "/WEB-INF/jasperTemplates/TerceraSesion.pdf");

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
