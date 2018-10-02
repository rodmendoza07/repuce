package test.mx.gob.sep.dgtec.repuce.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import mx.gob.sep.dgtec.repuce.model.CeAsistenteCstm;
import mx.gob.sep.dgtec.repuce.model.CeInfGral;
import mx.gob.sep.dgtec.repuce.model.CeIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ActaMinutaInfoVO;
import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;
import mx.gob.sep.dgtec.repuce.vo.PrimeraAsambleaVO;
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
public class SampleJRDataSourcePrimeraAsambleaFactory {
    
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
        
        /*
        List<CeIntegranteCstm> integrantes;
         */
        
        PrimeraAsambleaVO primeraAsambleaVO = new PrimeraAsambleaVO();
		final Integer C_CCT = 100; 
		
		
		CeInfGral ceInfGral = new CeInfGral();
		ceInfGral.setFchIntegracion(new Date());
		ceInfGral.setStatusCe(Constants.EDO_CE_MODIFICADO);
		
		//ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.PRIMERA_ASAMBLEA);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00"); 
		ceSesion.setNumIntegrantes(new Short("50"));
		ceSesion.setObservaciones("---- Esta es una prueba de la primera asamblea----");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("YO");
		ceSesion.setCadena("Gjey41/D7JC1Rq8fTGXT");
		
		//Integrantes
		ArrayList<CeIntegranteCstm> integrantes = new ArrayList<CeIntegranteCstm>();

		CeIntegranteCstm ceIntegrante = new CeIntegranteCstm();
		ceIntegrante.setcCct(C_CCT);
		ceIntegrante.setcSesion(new Short("1")); //Primera Asamblea
		ceIntegrante.setCscIntegrante(new Short("1"));
		ceIntegrante.setPaternoIntegrante("ROSAS ROSAS ROSAS ROSAS ROSASA");
		ceIntegrante.setMaternoIntegrante("SANDOVAL SANDOVAL SANDOVAL SAN");
		ceIntegrante.setNombreIntegrante("ISMAELISMAEL ISMAEL ISMAEL ISMAEL ISMAEL ISMAEL DE");
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
		ceIntegrante.setCurp("ISOR800512HDFRFB02");
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
		ceIntegrante.setCurp("VAVC881012HDFLNR08");
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
		ceIntegrante.setCurp("MOLS820812MVRNTP05");
		integrantes.add(ceIntegrante);
		
		ceIntegrante = new CeIntegranteCstm();
		ceIntegrante.setcCct(C_CCT);
		ceIntegrante.setcSesion(new Short("1")); //Primera Asamblea
		ceIntegrante.setCscIntegrante(new Short("3"));
		ceIntegrante.setPaternoIntegrante("LENON");
		ceIntegrante.setMaternoIntegrante("MCCARTNEY");
		ceIntegrante.setNombreIntegrante("JUAN CARLOS");
		ceIntegrante.setNomCalidad("Padre de familia");  
		ceIntegrante.setEmailIntegrante("enzo@godfather.com");
		ceIntegrante.setTelIntegrante("115321313213");
		ceIntegrante.setFchAlta(new Date());
		ceIntegrante.setNomCargo("SECRETARIO TÉCNICO");
		ceIntegrante.setcNiveleduc(1);
		ceIntegrante.setGenero("M"); //Hombre
		ceIntegrante.setNomNivel("PRIMARIA");
		ceIntegrante.setEstatusInt(new Short("0"));
		ceIntegrante.setCurp("LEMJ880022HMXNNC04");
		integrantes.add(ceIntegrante);
		
		List<CeAsistenteCstm> asistentes = new ArrayList<CeAsistenteCstm>();
		
		CeAsistenteCstm asistente = new CeAsistenteCstm();
		asistente.setPaternoAsistente("LESTRENGE");
		asistente.setMaternoAsistente("BLACK");
		asistente.setNombreAsistente("BELATRIX");
		asistente.setNomCalidad("REPRESENTANTE SINDICAL");
		asistentes.add(asistente);
		
		asistente = new CeAsistenteCstm();
		asistente.setPaternoAsistente("POTTER");
		asistente.setMaternoAsistente("LUCIUS");
		asistente.setNombreAsistente("HARRY");
		asistente.setNomCalidad("PADRE DE FAMILIA");
		asistentes.add(asistente);
        
		asistente = new CeAsistenteCstm();
		asistente.setPaternoAsistente("BLACK");
		asistente.setMaternoAsistente("BLACK");
		asistente.setNombreAsistente("SIRIUS");
		asistente.setNomCalidad("REPRESENTANTE DE LA APF");
		asistentes.add(asistente);
		
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
		
		primeraAsambleaVO.setNomConsejeros(Arrays.asList(
				new String[]{"ISMAEL ROSAS SANDOVAL","SOCORRO MONTERO LOPEZ","CARLOS VALENCIA VÉRTIZ"}));

		primeraAsambleaVO.setCctViewVO(cCctViewVO);
		primeraAsambleaVO.setCeInfGral(ceInfGral);
		primeraAsambleaVO.setCeSesion(ceSesion);
		primeraAsambleaVO.setAsistentes(asistentes);
		primeraAsambleaVO.setIntegrantes(integrantes);
        
        ActaMinutaInfoVO actaMinutaInfoVO = new ActaMinutaInfoVO();
        actaMinutaInfoVO.setPrimeraAsamblea(primeraAsambleaVO);

        coll.add(actaMinutaInfoVO);   


        return coll;
     }
    

    
    public static  Vector<PrimeraAsambleaVO>  createBeanCollectionPA()
    {
        Vector<PrimeraAsambleaVO> coll = new Vector<PrimeraAsambleaVO>();
        
        PrimeraAsambleaVO primeraAsambleaVO = new PrimeraAsambleaVO();
		
		//ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcSesion(Constants.PRIMERA_ASAMBLEA);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00"); 
		ceSesion.setNumIntegrantes(new Short("50"));
		ceSesion.setObservaciones("---- Esta es una prueba de la primera asamblea----");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("YO");
		ceSesion.setCadena("Gjey41/D7JC1Rq8fTGXT");
		
		//Datos del CCT
		CCctViewVO cCctViewVO = new CCctViewVO();
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
		
		primeraAsambleaVO.setNomConsejeros(Arrays.asList(
				new String[]{"ISMAEL ROSAS SANDOVAL","SOCORRO MONTERO LOPEZ","CARLOS VALENCIA VÉRTIZ"}));

		primeraAsambleaVO.setCctViewVO(cCctViewVO);
		primeraAsambleaVO.setCeSesion(ceSesion);
        
        coll.add(primeraAsambleaVO);   

        return coll;
     }
    
    
    
    
    public static  Vector<String>  createBeanCollectionConsejeros()
    {
        Vector<String> coll = new Vector<String>();
		
        coll.addAll(Arrays.asList(
				new String[]{"ISMAEL ROSAS SANDOVAL","SOCORRO MONTERO LOPEZ","CARLOS VALENCIA VÉRTIZ"}));

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

			String jasperName = path + "/WEB-INF/jasperTemplates/PrimeraAsamblea.jasper";
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
					path + "/WEB-INF/jasperTemplates/PrimeraAsamblea.pdf");

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
