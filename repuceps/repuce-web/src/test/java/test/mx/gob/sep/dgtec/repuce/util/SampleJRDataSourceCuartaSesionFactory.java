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
import mx.gob.sep.dgtec.repuce.model.CeComiteCstm;
import mx.gob.sep.dgtec.repuce.model.CeEventoCstm;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctCstm;
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ActaMinutaInfoVO;
import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;
import mx.gob.sep.dgtec.repuce.vo.CuartaSesionVO;
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
public class SampleJRDataSourceCuartaSesionFactory {
    
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
        
        CuartaSesionVO cuartaSesionViewVO = new CuartaSesionVO();
		final Integer C_CCT = 100; 

		cuartaSesionViewVO.setNomConsejeros(Arrays.asList(
				new String[]{"ISMAEL ROSAS SANDOVAL","SOCORRO MONTERO LOPEZ","CARLOS VALENCIA VÉRTIZ"}));
		
		//ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.CUARTA_SESION);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00"); 
		ceSesion.setNumIntegrantes(new Short("50"));
		ceSesion.setObservaciones("---- Esta es una prueba de la Cuarta Sesion----");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("YO");
		ceSesion.setCadena("Gjey41/D7JC1Rq8fTGXT");
		
		//ce_act_sesion
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("61"));
		CeActSesionCstm.setNomOtraActividad("Comunicó a la comunidad, las gestiones de los trámites para incorporar a la escuela los beneficios de programas federales, estatales, locales o <br> municipales y proyectos con Organizaciones de la Sociedad Civil");
		actividades.add(CeActSesionCstm);
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("62"));
		CeActSesionCstm.setNomOtraActividad("Presentación a la comunidad  de los proyectos de trabajos específicos para mejoras de instalaciones del plantel");
		actividades.add(CeActSesionCstm);		
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("63"));
		CeActSesionCstm.setNomOtraActividad("Informe a la comunidad los recursos de fuentes distintas a los programas, recabados por el Consejo Escolar y promovió informe de la asociación <br> de padres de familia o su equivalente, sobre el monto y uso que le dará a los recursos recabados");
		actividades.add(CeActSesionCstm);		
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("64"));
		CeActSesionCstm.setNomOtraActividad("Informó a la comunidad la integración del o los comités y la presentación del proyecto anual de actividades");
		actividades.add(CeActSesionCstm);		
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("65"));
		CeActSesionCstm.setNomOtraActividad("Presentación de la planeación anual de su Centro Escolar y si participa en alguna de las actividades de planeación para el ciclo escolar en curso");
		actividades.add(CeActSesionCstm);		
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("66"));
		CeActSesionCstm.setNomOtraActividad("Presentación de los resultados globales de la prueba enlace");
		actividades.add(CeActSesionCstm);		
        
		//Lista de recursos.
		ArrayList<CeRecurso> recursos = new ArrayList<CeRecurso>();
		
		//Recursos APF
		CeRecurso ceRecurso = new CeRecurso();
		ceRecurso.setcRecurso(new Short("3"));//Rifa
		ceRecurso.setIndRecurso("1");
		ceRecurso.setMonto(new BigDecimal("123456789"));
		ceRecurso.setMontoStr("Mil pesosssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
		ceRecurso.setUso("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		ceRecurso.setIndTransparenta(true);
		recursos.add(ceRecurso);

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
		cePrograma.setAnioIngreso("2012-2013");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados");
/*		cePrograma.setMontoFinal(5000);
		cePrograma.setActividadesFin("Las actividads modificadas");
		cePrograma.setObjetivo("objetivoFin");
		cePrograma.setMontoFinalStr("Cinco mil pesos");*/
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
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Mejorar el rendimiento de los alumnos");
//		cePrograma.setMontoFinal(20000);
//		cePrograma.setActividadesFin("actividadesFin");
//		cePrograma.setObjetivoFin("Objetivos finales");
//		cePrograma.setcDiferencia(new Short("7"));
//		cePrograma.setOtraDiferencia("Se regresó al programa");
//		cePrograma.setMontoFinalStr("Dos mil pesos 00/100 MN");
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
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos que tienen problemas en su vista tengan lentes.");
//		cePrograma.setMontoFinal(10000);
//		cePrograma.setActividadesFin("Las actividads modificadas");
//		cePrograma.setObjetivoFin("Objetivos finales");
//		cePrograma.setcDiferencia(new Short("8"));
//		cePrograma.setOtraDiferencia("Otro: Nos lo quedamos");
//		cePrograma.setMontoFinalStr("Diez mil pesos 00/100 MN");
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
		cePrograma.setAnioIngreso("2011");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Tener alumnos mejor preparados y que comprenda cada detalle de lo que estan leyendo");
//		cePrograma.setMontoFinal(6000);
//		cePrograma.setcDiferencia(new Short("6"));
//		cePrograma.setOtraDiferencia("Otro: Donativo sorpresa");
//		cePrograma.setMontoFinalStr("Seis mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("33"));//Desayunos Escolares
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_ESTATAL);
		cePrograma.setIndRecurso("1");
		cePrograma.setNomPrograma("Desayunos Escolares");
		cePrograma.setMonto(new BigDecimal("8000.00"));
		cePrograma.setMontoStr("Ocho mil pesos 00/100 MN");
		cePrograma.setAnioIngreso("2011");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos tengan salud para un mejor aprendizaje");
//		cePrograma.setMontoFinal(9000);
//		cePrograma.setcDiferencia(new Short("6"));
//		cePrograma.setOtraDiferencia("Otro: Donativo sorpresa");
//		cePrograma.setMontoFinalStr("Nueve mil pesos 00/100 MN");
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
//		cePrograma.setMontoFinal(60000);
//		cePrograma.setActividadesFin("Las actividads modificadas");
//		cePrograma.setObjetivoFin("Objetivos finales");
//		cePrograma.setcDiferencia(new Short("1"));
//		cePrograma.setOtraDiferencia("Padres de familia");
//		cePrograma.setMontoFinalStr("Cincuenta mil pesos 00/100 MN");
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
//		cePrograma.setMontoFinal(60000);
//		cePrograma.setActividadesFin("Las actividads modificadas");
//		cePrograma.setObjetivoFin("Objetivos finales");
//		cePrograma.setcDiferencia(new Short("1"));
//		cePrograma.setOtraDiferencia("Padres de familia");
//		cePrograma.setMontoFinalStr("Sesenta mil pesos 00/100 MN");
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
		cePrograma.setAnioIngreso("2012-2013");
		cePrograma.setActividades("Planeación, Organización, Dirección y Control ");
		cePrograma.setObjetivo("Que los alumnos de bajos recursos obtengan becas para que no abandonen sus estudios");
		cePrograma.setNomBenefactor("ALUNA ORGANIZACI[ON DE LA SOCIEDAD CIVIL");
//		cePrograma.setMontoFinal(26000);
//		cePrograma.setActividadesFin("Las actividads modificadas");
//		cePrograma.setObjetivoFin("Objetivos finales");
//		cePrograma.setcDiferencia(new Short("1"));
//		cePrograma.setOtraDiferencia("Padres de familia");
//		cePrograma.setMontoFinalStr("Sesenta mil pesos 00/100 MN");
		programas.add(cePrograma);
		
		//Mejoras
		ArrayList<CeMejoraCctCstm> mejoras = new ArrayList<CeMejoraCctCstm>();
		CeMejoraCctCstm mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("1"));
		mejora.setIndRecurso("1");
		mejora.setNomMejoraCct("Construcción o Reparación de Aula y/o Biblioteca");
		mejora.setActividades("ACTIVIDADES 1");
		mejora.setPeriodoInicio("2012-2013");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 1");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejora.setActividadesFin("Las actividades del nueve");
		mejora.setObjetivoFin("Las metas  los objetivos del nueve");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("2"));
		mejora.setIndRecurso("1");
		mejora.setNomMejoraCct("Construcción o Reparación de Plaza Cívica");
		mejora.setActividades("ACTIVIDADES 2");
		mejora.setPeriodoInicio("2012-2013");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 2");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejora.setActividadesFin("Las actividades del nueve");
		mejora.setObjetivoFin("Las metas  los objetivos del nueve");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("3"));
		mejora.setIndRecurso("1");
		mejora.setNomMejoraCct("Construcción o Reparación de Sanitarios");
		mejora.setActividades("ACTIVIDADES 3");
		mejora.setPeriodoInicio("2012-2013");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 3");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("4"));
		mejora.setIndRecurso("1");
		mejora.setNomMejoraCct("Instalación o Reparación de Luz Eléctrica");
		mejora.setActividades("ACTIVIDADES 4");
		mejora.setPeriodoInicio("2012-2013");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 4");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejora.setActividadesFin("Las actividades del nueve");
		mejora.setObjetivoFin("Las metas  los objetivos del nueve");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("5"));
		mejora.setIndRecurso("0");
		mejora.setPeriodoInicio("2012-2013");
		mejora.setNomMejoraCct("Introducción o Reparación de Drenaje");
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
		ceEvento.setActividades("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		ceEvento.setObjetivo("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		ceEvento.setMonto(new BigDecimal("1000"));
		ceEvento.setMontoStr("Mil pesos");
		eventos.add(ceEvento);
		
		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("2")); //Basquetbol
		ceEvento.setcSesion(new Short("1")); //Deportivos
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Basquetbol");
		ceEvento.setPeriodoRealizado("2011-2012");
		ceEvento.setActividades("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		ceEvento.setObjetivo("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		ceEvento.setMonto(new BigDecimal("100000000"));
		ceEvento.setMontoStr("Mil pesosssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
		eventos.add(ceEvento);

		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("10")); //Otro
		ceEvento.setcSesion(new Short("2")); //Culturales
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Eventos de Cuento");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		ceEvento.setObjetivo("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		ceEvento.setMonto(new BigDecimal("1000"));
		ceEvento.setMontoStr("Mil pesos");
		eventos.add(ceEvento);		

		ceEvento = new CeEventoCstm();
		ceEvento.setcEvento(new Short("17")); //Otro
		ceEvento.setcSesion(new Short("3")); //Otros
		ceEvento.setIndRecurso("1");
		ceEvento.setNomEvento("Otros: YOGA");
		ceEvento.setPeriodoRealizado("2012-2013");
		ceEvento.setActividades("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
		ceEvento.setObjetivo("REFORESTAR LAS ÁREAS VERDES DE LA INSTITUCIÓN, CAMPAÑAS PARA PRESERVAR EL MEDIO AMBIENTE DENTRO Y FUERA DE LA INSTITUCIÓN, ENCALAR LA BARDA PERIMETRAL");
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
		planeacion.setIndCumplioPlaneacion(true);
		
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
		ArrayList<CeComiteCstm> comites = getComites();
		
		cuartaSesionViewVO.setActividades(actividades);
		cuartaSesionViewVO.setCctViewVO(cCctViewVO);
		cuartaSesionViewVO.setCeSesion(ceSesion);
		cuartaSesionViewVO.setComites(comites);
		cuartaSesionViewVO.setEventos(eventos);
		cuartaSesionViewVO.setMejoras(mejoras);
		cuartaSesionViewVO.setPlaneacion(planeacion);
		cuartaSesionViewVO.setProgramas(programas);
		cuartaSesionViewVO.setRecursos(recursos);
        
        ActaMinutaInfoVO actaMinutaInfoVO = new ActaMinutaInfoVO();
        actaMinutaInfoVO.setCuartaSesion(cuartaSesionViewVO);

        coll.add(actaMinutaInfoVO);   
        
        return coll;
     }
    
    public static ArrayList<CeComiteCstm> getComites(){
		//Comites
		ArrayList<CeComiteCstm> comites = new ArrayList<CeComiteCstm>();
		
		CeComiteCstm comite = new CeComiteCstm();
		comite.setcComite(1);
		comite.setNomComite("De lectura");
		comite.setNomIntegrantes("NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)" +
				"NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR), " +
				"NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)," +
				"NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)");
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
		comite.setNomIntegrantes("NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)" +
				"NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR), " +
				"NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)," +
				"NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)");
		comite.setIndProyAnualCom(true);
		comite.setIndCumplieronAct(true);
		comite.setActividades("creacion de la libreria");
		comites.add(comite);		
		comite = new CeComiteCstm();
		comite.setcComite(4);
		comite.setNomComite("De impulso a la activación física");
		comite.setNomIntegrantes("RAMA CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), RAVANA KOCO KOCO (COMUNIDAD ESCOLAR)" +
				"DJNAKA CSDCDSCS SUGRIVA (PADRE DE FAMILIA), DJNOKU KOCO KOCO (COMUNIDAD ESCOLAR), " +
				"SITA CSDCDSCS KEKEYI (PADRE DE FAMILIA), RAGU KOCO (COMUNIDAD ESCOLAR)," +
				"LAKSMANA CSDCDSCS DASARATA (PADRE DE FAMILIA), INDRA KOCO KOCO (COMUNIDAD ESCOLAR");
		comite.setIndProyAnualCom(true);
		comite.setIndCumplieronAct(false);
		comite.setActividades("bailable");
		comites.add(comite);
		
		return comites;
	}
    
    
    public static  Vector<CeMejoraCctCstm>  createBeanMejorasCollection()
    {
		//Programas
		Vector<CeMejoraCctCstm> mejoras = new Vector<CeMejoraCctCstm>();
		
		CeMejoraCctCstm mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("1"));
		mejora.setIndRecurso("1");
		mejora.setNomMejoraCct("Construcción o Reparación de Aula y/o Biblioteca");
		mejora.setActividades("ACTIVIDADES 1");
		mejora.setPeriodoInicio("2012-2013");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 1");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejora.setActividadesFin("Las actividades del nueve");
		mejora.setObjetivoFin("Las metas  los objetivos del nueve");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("2"));
		mejora.setIndRecurso("1");
		mejora.setNomMejoraCct("Construcción o Reparación de Plaza Cívica");
		mejora.setActividades("ACTIVIDADES 2");
		mejora.setPeriodoInicio("2012-2013");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 2");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejora.setActividadesFin("Las actividades del nueve");
		mejora.setObjetivoFin("Las metas  los objetivos del nueve");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("3"));
		mejora.setIndRecurso("1");
		mejora.setNomMejoraCct("Construcción o Reparación de Sanitarios");
		mejora.setActividades("ACTIVIDADES 3");
		mejora.setPeriodoInicio("2012-2013");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 3");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("4"));
		mejora.setIndRecurso("1");
		mejora.setNomMejoraCct("Instalación o Reparación de Luz Eléctrica");
		mejora.setActividades("ACTIVIDADES 4");
		mejora.setPeriodoInicio("2012-2013");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 4");
		mejora.setMonto(new BigDecimal("1000"));
		mejora.setMontoStr("Mil pesos");
		mejora.setActividadesFin("Las actividades del nueve");
		mejora.setObjetivoFin("Las metas  los objetivos del nueve");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("5"));
		mejora.setIndRecurso("0");
		mejora.setNomMejoraCct("Introducción o Reparación de Drenaje");
		mejora.setActividades("ACTIVIDADES 5");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 5");
		mejoras.add(mejora);
		
		return mejoras;
	
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

			String jasperName = path + "/WEB-INF/jasperTemplates/CuartaSesion.jasper";
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
					path + "/WEB-INF/jasperTemplates/CuartaSesion.pdf");

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
