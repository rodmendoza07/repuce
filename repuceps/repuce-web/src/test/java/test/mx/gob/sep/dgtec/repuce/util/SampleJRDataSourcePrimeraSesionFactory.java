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
import mx.gob.sep.dgtec.repuce.model.CePlaneacionCstm;
import mx.gob.sep.dgtec.repuce.model.CeProgramaCstm;
import mx.gob.sep.dgtec.repuce.model.CeRecurso;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ActaMinutaInfoVO;
import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraSesionVO;
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
public class SampleJRDataSourcePrimeraSesionFactory {
    
    public static  Vector<ActaMinutaInfoVO>  createBeanCollection()
    {
        Vector<ActaMinutaInfoVO> coll = new Vector<ActaMinutaInfoVO>();
        
        PrimeraSesionVO primeraSesionVO = new PrimeraSesionVO(); 
		final Integer C_CCT = 80; 

		primeraSesionVO.setNomConsejeros(Arrays.asList(
				new String[]{"ISMAEL ROSAS SANDOVAL","SOCORRO MONTERO LOPEZ","CARLOS VALENCIA VÉRTIZ"}));
		
		//ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.PRIMERA_SESION);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00"); 
		ceSesion.setNumIntegrantes(new Short("50"));
		ceSesion.setObservaciones("---- Esta es una prueba de la primera sesión----");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("YO");
		ceSesion.setCadena("Gjey41/D7JC1Rq8fTGXT");
		
		//Lista de recursos.
		ArrayList<CeRecurso> recursos = new ArrayList<CeRecurso>();
		
		//Recurso de catálogo y se conocen los datos del mismo.
		CeRecurso ceRecurso = new CeRecurso();
		ceRecurso.setcRecurso(Constants.C_RECURSO_DONACION);//Donación
		ceRecurso.setMonto(new BigDecimal("15000.00"));
		ceRecurso.setMontoStr("Quince  mil pesos 00/100 MN");
		ceRecurso.setEspecie("15 puputres");
		recursos.add(ceRecurso);
		
		//Rifas
		ceRecurso = new CeRecurso();
		ceRecurso.setcRecurso(Constants.C_RECURSO_RIFA);//Rifa
		ceRecurso.setMonto(new BigDecimal("1000.00"));
		ceRecurso.setMontoStr("Mil pesos 00/100 MN");
		recursos.add(ceRecurso);
		
		//Recursos APF
		ceRecurso = new CeRecurso();
		ceRecurso.setcRecurso(Constants.C_RECURSO_APF);//Rifa
		ceRecurso.setIndRecurso("2");
		recursos.add(ceRecurso);

		
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

		
		//Planeacion
		CePlaneacionCstm planeacion = new CePlaneacionCstm();
		planeacion.setIndPlaneacion(true);
		planeacion.setcPlaneacion(new Short("2"));
		planeacion.setNomOtroPlaneacion("PETE");
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
		
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		actividades.add(Constants.C_ACTIVIDAD_SOLICITO_MEJORA);
		
		primeraSesionVO.setActividades(actividades);
        primeraSesionVO.setCctViewVO(cCctViewVO);
        primeraSesionVO.setCeSesion(ceSesion);
        primeraSesionVO.setComites(comites);
        primeraSesionVO.setPlaneacion(planeacion);
        primeraSesionVO.setProgramas(programas);
        primeraSesionVO.setRecursos(recursos);
        
        ActaMinutaInfoVO actaMinutaInfoVO = new ActaMinutaInfoVO();
        actaMinutaInfoVO.setPrimeraSesion(primeraSesionVO);

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

			String jasperName = path + "/WEB-INF/jasperTemplates/PrimeraSesion.jasper";
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
					path + "/WEB-INF/jasperTemplates/PrimeraSesion.pdf");

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
