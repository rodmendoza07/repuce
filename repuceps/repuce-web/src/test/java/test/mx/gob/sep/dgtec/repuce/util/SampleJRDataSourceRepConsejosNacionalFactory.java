package test.mx.gob.sep.dgtec.repuce.util;

import java.util.HashMap;
import java.util.List;
import java.util.Vector;

import mx.gob.sep.dgtec.repuce.vo.RepConsejosNacionalVO;
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
public class SampleJRDataSourceRepConsejosNacionalFactory {
    
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
     
    public static  Vector<RepConsejosNacionalVO>  createBeanCollection()
    {
        Vector<RepConsejosNacionalVO> coll = new Vector<RepConsejosNacionalVO>();

        RepConsejosNacionalVO repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("AGUASCALIENTES");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        

        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("BAJA CALIFORNIA");
        repConsejosNacionalVO.setNumCctPub(200);
        repConsejosNacionalVO.setNumCePub(200);
        repConsejosNacionalVO.setNumCctPriv(200);
        repConsejosNacionalVO.setNumCePriv(200);
        repConsejosNacionalVO.setNumCctOtros(200);
        repConsejosNacionalVO.setNumCeOtros(200);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("BAJA CALIFORNIA SUR");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("CAMPECHE");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("CHIAPAS");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("CHIHUAHUA");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("COAHUILA DE ZARAGOZA");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("COLIMA");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("DISTRITO FEDERAL");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("DURANGO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("GUANAJUATO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("GUERRERO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("HIDALGO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("JALISCO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("MEXICO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("MICHOACAN DE OCAMPO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("MORELOS");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("NAYARIT");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("NUEVO LEON");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("OAXACA");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("PUEBLA");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("QUERETARO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("QUINTANA ROO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("SAN LUIS POTOSI");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("SINALOA");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("SONORA");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("TABASCO");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("TAMAULIPAS");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("TLAXCALA");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("VERACRUZ DE IGNACIO DE LA LLAVE");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);  
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("YUCATAN");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);          
        
        repConsejosNacionalVO = new RepConsejosNacionalVO();
        repConsejosNacionalVO.setNomEntidadFed("ZACATECAS");
        repConsejosNacionalVO.setNumCctPub(345);
        repConsejosNacionalVO.setNumCePub(295);
        repConsejosNacionalVO.setNumCctPriv(345);
        repConsejosNacionalVO.setNumCePriv(295);
        repConsejosNacionalVO.setNumCctOtros(345);
        repConsejosNacionalVO.setNumCeOtros(295);
        coll.add(repConsejosNacionalVO);        
        
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
	public static void createPDF(List<RepConsejosNacionalVO> list,String path) 
			throws JRException, Exception{
		try{

			String jasperName = path + "/WEB-INF/jasperTemplates/RepConsejosNacional.jasper";
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
					path + "/WEB-INF/jasperTemplates/RepConsejosNacional.pdf");

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
    		
    	List<RepConsejosNacionalVO> datos = createBeanCollection();

		try{
		    createPDF(datos,PROJECT_PATH);
			
		}catch (Exception e){
			e.printStackTrace();
		}
    }
    
}
