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
import mx.gob.sep.dgtec.repuce.model.CeCompEnlaceCstm;
import mx.gob.sep.dgtec.repuce.model.CeMetaEnlace;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ActaMinutaInfoVO;
import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;
import mx.gob.sep.dgtec.repuce.vo.IndicadorEnlaceVO;
import mx.gob.sep.dgtec.repuce.vo.SegundaSesionVO;
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
public class SampleJRDataSourceSegundaSesionFactory {
    
    public static  Vector<ActaMinutaInfoVO>  createBeanCollection()
    {
        Vector<ActaMinutaInfoVO> coll = new Vector<ActaMinutaInfoVO>();
        
        SegundaSesionVO segundaSesionVO = new SegundaSesionVO(); 
		final Integer C_CCT = 80; 

		segundaSesionVO.setNomConsejeros(Arrays.asList(
				new String[]{"ISMAEL ROSAS SANDOVAL","SOCORRO MONTERO LOPEZ","CARLOS VALENCIA VÉRTIZ"}));
		
		//ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.SEGUNDA_SESION);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00"); 
		ceSesion.setNumIntegrantes(new Short("50"));
		ceSesion.setObservaciones("---- Esta es una prueba de la segunda sesión----");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("YO");
		ceSesion.setCadena("Gjey41/D7JC1Rq8fTGXT");
		
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

		IndicadorEnlaceVO indicador = new IndicadorEnlaceVO();
		indicador.setPctInsufLogroEsp(null);
		indicador.setPctInsufLogroMat(new BigDecimal("10.5"));
		indicador.setPctInsufMetaEsp(new BigDecimal("12"));
		indicador.setPctInsufMetaMat(null);
		
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
		
        segundaSesionVO.setCctViewVO(cCctViewVO);
        segundaSesionVO.setCeSesion(ceSesion);
        segundaSesionVO.setMetas(metas);
        segundaSesionVO.setResultadosEnlace(resultados);
        segundaSesionVO.setCompromisos(compromisos);
        segundaSesionVO.setIndicadorEnlace(indicador);
        
        ActaMinutaInfoVO actaMinutaInfoVO = new ActaMinutaInfoVO();
        actaMinutaInfoVO.setSegundaSesion(segundaSesionVO);

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

			String jasperName = path + "/WEB-INF/jasperTemplates/SegundaSesion.jasper";
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
					path + "/WEB-INF/jasperTemplates/SegundaSesion.pdf");

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
