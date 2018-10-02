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
import mx.gob.sep.dgtec.repuce.model.CeActSesionCstm;
import mx.gob.sep.dgtec.repuce.model.CeComiteCstm;
import mx.gob.sep.dgtec.repuce.model.CeCompEnlaceCstm;
import mx.gob.sep.dgtec.repuce.model.CeMejoraCctCstm;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ActaMinutaInfoVO;
import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;
import mx.gob.sep.dgtec.repuce.vo.IndicadorEnlaceVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaAsambleaVO;
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
public class SampleJRDataSourceSegundaAsambleaFactory {
    
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
        
        SegundaAsambleaVO segAsamViewVO = new SegundaAsambleaVO(); 
		final Integer C_CCT = 80; 

		segAsamViewVO.setNomConsejeros(Arrays.asList(
				new String[]{"ISMAEL ROSAS SANDOVAL","SOCORRO MONTERO LOPEZ","CARLOS VALENCIA VÉRTIZ"}));
		
		//ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.SEGUNDA_ASAMBLEA);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00"); 
		ceSesion.setNumIntegrantes(new Short("50"));
		ceSesion.setObservaciones("---- Esta es una prueba ----");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("YO");
		ceSesion.setCadena("Gjey41/D7JC1Rq8fTGXT");
		
		//ce_act_sesion
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("41"));
		CeActSesionCstm.setNomOtraActividad("Comunicó a la comunidad, las gestiones de los trámites para incorporar a la escuela los beneficios de programas federales, estatales, locales o <br> municipales y proyectos con Organizaciones de la Sociedad Civil");
		actividades.add(CeActSesionCstm);
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("42"));
		CeActSesionCstm.setNomOtraActividad("Presentación a la comunidad  de los proyectos de trabajos específicos para mejoras de instalaciones del plantel");
		actividades.add(CeActSesionCstm);		
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("43"));
		CeActSesionCstm.setNomOtraActividad("Informe a la comunidad los recursos de fuentes distintas a los programas, recabados por el Consejo Escolar y promovió informe de la asociación <br> de padres de familia o su equivalente, sobre el monto y uso que le dará a los recursos recabados");
		actividades.add(CeActSesionCstm);		
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("45"));
		CeActSesionCstm.setNomOtraActividad("Informó a la comunidad la integración del o los comités y la presentación del proyecto anual de actividades");
		actividades.add(CeActSesionCstm);		
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("46"));
		CeActSesionCstm.setNomOtraActividad("Presentación de la planeación anual de su Centro Escolar y si participa en alguna de las actividades de planeación para el ciclo escolar en curso");
		actividades.add(CeActSesionCstm);		
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("47"));
		CeActSesionCstm.setNomOtraActividad("Presentación de los resultados globales de la prueba enlace");
		actividades.add(CeActSesionCstm);		
        
		//Lista de recursos.
		ArrayList<CeRecurso> recursos = new ArrayList<CeRecurso>();
		
		//Recurso de catálogo y se conocen los datos del mismo.
		CeRecurso ceRecurso = new CeRecurso();
		ceRecurso.setcRecurso(new Short("0"));//Donación
		ceRecurso.setMonto(new BigDecimal("15000.00"));
		ceRecurso.setMontoStr("Quince  mil pesos 00/100 MN");
		ceRecurso.setEspecie("15 puputres");
		recursos.add(ceRecurso);
		
		//Rifas
		ceRecurso = new CeRecurso();
		ceRecurso.setcRecurso(new Short("1"));//Rifa
		ceRecurso.setMonto(new BigDecimal("1000.00"));
		ceRecurso.setMontoStr("Mil pesos 00/100 MN");
		recursos.add(ceRecurso);
		
		//Recursos APF
		ceRecurso = new CeRecurso();
		ceRecurso.setcRecurso(new Short("3"));//Rifa
		ceRecurso.setIndRecurso("2");
		recursos.add(ceRecurso);

		
		//Programas
		//Programas
		List<CeProgramaCstm> programas = new ArrayList<CeProgramaCstm>();
		//PROGRAMAS FEDERALES
		//Programa del catálogo en el cual no se conoce los recursos.
		CeProgramaCstm cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("1"));//Programa Escuela de Calidad
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		cePrograma.setNomPrograma("Programa Escuela de Calidad");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual no se conoce los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("4"));//Escuela de Bajo Rendimiento
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		cePrograma.setNomPrograma("Escuela de Bajo Rendimiento");
		programas.add(cePrograma);
		
		//Programa que no esta en el catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("12"));//Programa Ver Bien para Aprender Mejor
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_FEDERAL);
		cePrograma.setNomPrograma("Programa Ver Bien para Aprender Mejor");
		programas.add(cePrograma);
		
		//PROGRAMAS ESTATALES
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("20"));//Programa de Lectura
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_ESTATAL);
		cePrograma.setNomPrograma("Programa de Lectura");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("33"));//Desayunos Escolares
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_ESTATAL);
		cePrograma.setNomPrograma("Desayunos Escolares");
		programas.add(cePrograma);
		
		//PROGRAMAS MUNICIPALES
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("40"));//Reconocimiento y Estímulos a Maestros y Escuelas
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_LOCAL);
		cePrograma.setNomPrograma("Reconocimiento y Estímulos a Maestros y Escuelas");
		programas.add(cePrograma);
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("44"));//Idioma Inglés
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_LOCAL);
		cePrograma.setNomPrograma("Idioma Inglés");
		programas.add(cePrograma);
		
		//PROYECTOS CON ORGANIZACIONES DE LA SOCIEDAD CIVIL	
		
		//Programa del catálogo en el cual  se conocen los recursos.
		cePrograma = new CeProgramaCstm();
		cePrograma.setcPrograma(new Short ("50"));//Becas
		cePrograma.setTpoPrograma(Constants.TPO_PROGRAMA_OSC);
		cePrograma.setNomPrograma("Becas");
		programas.add(cePrograma);

		//Mejoras
		ArrayList<CeMejoraCctCstm> mejoras = new ArrayList<CeMejoraCctCstm>();
		CeMejoraCctCstm mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("1"));
		mejora.setNomOtraMejora("Construcción o Reparación de Aula y/o Biblioteca");
		mejora.setActividades("ACTIVIDADES 1");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 1");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("2"));
		mejora.setNomOtraMejora("Construcción o Reparación de Plaza Cívica");
		mejora.setActividades("ACTIVIDADES 2");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 2");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("3"));
		mejora.setNomOtraMejora("Construcción o Reparación de Sanitarios");
		mejora.setActividades("ACTIVIDADES 3");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 3");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("4"));
		mejora.setNomOtraMejora("Instalación o Reparación de Luz Eléctrica");
		mejora.setActividades("ACTIVIDADES 4");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 4");
		mejoras.add(mejora);
		mejora = new CeMejoraCctCstm();
		mejora.setcMejoraCct(new Short("5"));
		mejora.setNomOtraMejora("Introducción o Reparación de Drenaje");
		mejora.setActividades("ACTIVIDADES 5");
		mejora.setMetasObjetivos("METAS Y OBJETIVOS 5");
		mejoras.add(mejora);
		
		//Planeacion
		CePlaneacionCstm planeacion = new CePlaneacionCstm();
		planeacion.setIndCumplioPlaneacion(true);
		planeacion.setNomPlaneacion("PETE");
		planeacion.setIndParticipacion(true);
		planeacion.setActividades("Muchas actividades de prueba");
		
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
		
		//Comites
		ArrayList<CeComiteCstm> comites = new ArrayList<CeComiteCstm>();
		CeComiteCstm comite = new CeComiteCstm();
		comite.setcComite(1);
		comite.setNomComite("De lectura");
		comite.setNomIntegrantes("NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)");
		comite.setIndProyAnualCom(true);
		comites.add(comite);
		comite = new CeComiteCstm();
		comite.setcComite(2);
		comite.setNomComite("De mejoramiento de la Infraestructura");
		comite.setNomIntegrantes("NEPOMUCENO CSDCDSCS DSCDSCSD (PADRE DE FAMILIA), KOCO KOCO KOCO (COMUNIDAD ESCOLAR)");
		comite.setIndProyAnualCom(true);
		comites.add(comite);
		comite = new CeComiteCstm();
		comite.setcComite(3);
		comite.setNomComite("De protección civil y de seguridad de las escuelas");
		comite.setNomIntegrantes("EULOGIO XASXSAXAS XAXASXAS (PADRE DE FAMILIA), CHARLY CHARLY CHARLY (COMUNIDAD ESCOLAR)");
		comite.setIndProyAnualCom(true);
		comites.add(comite);		
		comite = new CeComiteCstm();
		comite.setcComite(4);
		comite.setNomComite("De impulso a la activación física");
		comite.setNomIntegrantes("EULOGIO XASXSAXAS XAXASXAS (PADRE DE FAMILIA), CHARLY CHARLY CHARLY (COMUNIDAD ESCOLAR)");
		comite.setIndProyAnualCom(true);
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

        segAsamViewVO.setActividades(actividades);
        segAsamViewVO.setCctViewVO(cCctViewVO);
        segAsamViewVO.setCeSesion(ceSesion);
        segAsamViewVO.setComites(comites);
        segAsamViewVO.setMetas(metas);
        segAsamViewVO.setMejoras(mejoras);
        segAsamViewVO.setPlaneacion(planeacion);
		segAsamViewVO.setProgramas(programas);
        segAsamViewVO.setRecursos(recursos);
        segAsamViewVO.setResultadosEnlace(resultados);
        segAsamViewVO.setCompromisos(compromisos);
        segAsamViewVO.setIndicadorEnlace(indicador);
        
        ActaMinutaInfoVO actaMinutaInfoVO = new ActaMinutaInfoVO();
        actaMinutaInfoVO.setSegundaAsamblea(segAsamViewVO);

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

			String jasperName = path + "/WEB-INF/jasperTemplates/SegundaAsamblea.jasper";
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
					path + "/WEB-INF/jasperTemplates/SegundaAsamblea.pdf");

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
