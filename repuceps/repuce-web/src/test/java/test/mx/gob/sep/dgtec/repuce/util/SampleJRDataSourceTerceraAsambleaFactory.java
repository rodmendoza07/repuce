package test.mx.gob.sep.dgtec.repuce.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import mx.gob.sep.dgtec.repuce.model.CeActSesionCstm;
import mx.gob.sep.dgtec.repuce.model.CeSesion;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.ActaMinutaInfoVO;
import mx.gob.sep.dgtec.repuce.vo.CCctViewVO;
import mx.gob.sep.dgtec.repuce.vo.ReunionVO;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;

/**
 * 
 * @author ismaelrosas
 */
public class SampleJRDataSourceTerceraAsambleaFactory {

	// This is the method to call to get the datasource.
	// The method must be static.....
	public JRDataSource createDatasource() {
		return new JRBeanCollectionDataSource(createBeanCollection());
	}

	public JRDataSource createBeanCollectionDatasource() {
		return new JRBeanCollectionDataSource(createBeanCollection());
	}

	public static Vector<ActaMinutaInfoVO> createBeanCollection() {
		Vector<ActaMinutaInfoVO> coll = new Vector<ActaMinutaInfoVO>();

		ReunionVO terAsamVO = new ReunionVO();
		final Integer C_CCT = 100;

		terAsamVO.setNomConsejeros(Arrays.asList(new String[] {
				"ISMAEL ROSAS SANDOVAL", "SOCORRO MONTERO LOPEZ",
				"CARLOS VALENCIA VÉRTIZ" }));

		// ce_sesion
		CeSesion ceSesion = new CeSesion();
		ceSesion.setcCct(C_CCT);
		ceSesion.setcSesion(Constants.TERCERA_ASAMBLEA);
		ceSesion.setFchSesion(new Date());
		ceSesion.setHoraIniSesion("11:00");
		ceSesion.setHoraFinSesion("12:00");
		ceSesion.setNumIntegrantes(new Short("50"));
		ceSesion.setObservaciones("---- Esta es una prueba ----");
		ceSesion.setFchRegistro(new Date());
		ceSesion.setUsrCaptura("YO");
		ceSesion.setCadena("Gjey41/D7JC1Rq8fTGXT");

		// ce_act_sesion
		ArrayList<CeActSesionCstm> actividades = new ArrayList<CeActSesionCstm>();
		CeActSesionCstm CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("71"));
		CeActSesionCstm
				.setNomOtraActividad("Explicó y entregó informe público de transparencia y de resultados a la comunidad escolar");
		actividades.add(CeActSesionCstm);
		CeActSesionCstm = new CeActSesionCstm();
		CeActSesionCstm.setcActividad(new Short("72"));
		CeActSesionCstm
				.setNomOtraActividad("Inscribió el informe en el Registro público de Consejos Escolares de Participación Social en la Educación");
		actividades.add(CeActSesionCstm);

		// Datos del CCT
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
		cCctViewVO.setPeriodo("2012-2013");

		terAsamVO.setActividades(actividades);
		terAsamVO.setCctViewVO(cCctViewVO);
		terAsamVO.setCeSesion(ceSesion);

		ActaMinutaInfoVO actaMinutaInfoVO = new ActaMinutaInfoVO();
		actaMinutaInfoVO.setTerceraAsamblea(terAsamVO);

		coll.add(actaMinutaInfoVO);

		return coll;
	}

	/**
	 * Este metodo genera el documento PDF (actas y minutas) especificado por el
	 * usuario.
	 * 
	 * @param voDatos
	 *            El objeto de valor con la informacion del reporte Para acuses:
	 *            VOAcuse, para comprobantes: VOFormatoPago.
	 * @param jasperPath
	 *            La ruta donde se ubican los archivos jasper.
	 * @param pdfPath
	 *            La ruta donde se ubicara el archivo PDF generado.
	 * @param imagesPath
	 *            La ruta donde se ubican las imagenes.
	 * @param pdfName
	 *            Nombre del documento PDF a generar.
	 * @param tipoDocto
	 *            Tipo de documento a generar.
	 * 
	 * @throws JRException
	 *             , Exception
	 */
	public static void createPDF(List<ActaMinutaInfoVO> list, String path)
			throws JRException, Exception {
		try {

			String jasperName = path
					+ "/WEB-INF/jasperTemplates/TerceraAsamblea.jasper";
			// logger.debug("Filling report..."+pdfPath+pdfName);
			// Sirve para almacenar los parametros del documento.
			HashMap<String, Object> hm = new HashMap<String, Object>();
			// Variable con el nombre del archivo jasper del documento

			hm.put("pRuta", path);

			// Exporta la plantilla cargada con datos a PDF
			JRPdfExporter pdfExporter = new JRPdfExporter();

			// Establece los parametros de los subreportes y la fuente de datos.
			pdfExporter.setParameter(JRExporterParameter.JASPER_PRINT,
					JasperFillManager.fillReport(jasperName, hm,
							new JRBeanCollectionDataSource(list)));

			// Establece el nombre de la plantilla para el documento.
			pdfExporter.setParameter(JRExporterParameter.OUTPUT_FILE_NAME, path
					+ "/WEB-INF/jasperTemplates/TerceraAsamblea.pdf");

			// logger.debug("Exporting report...");
			pdfExporter.exportReport();
			// logger.debug("Done!");

		} catch (JRException e) {
			e.printStackTrace();
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	/**
	 * Rebobina el apuntador del DataSource
	 * 
	 * @param ds
	 *            Datasouce a rebobinar
	 * @return
	 */
	public static JRDataSource rewindDataSource(JRDataSource ds)
			throws JRException {
		((JRBeanCollectionDataSource) ds).moveFirst();
		return ds;
	}

	// Metodo de prueba para los documentos, genera todos los documentos
	public static void main(String[] args) {
		final String PROJECT_PATH = System.getProperty("user.dir")
				+ "/src/main/webapp/";

		List<ActaMinutaInfoVO> datos = createBeanCollection();

		Iterator<ActaMinutaInfoVO> it = datos.iterator();
		List<ActaMinutaInfoVO> list;

		while (it.hasNext()) {
			list = new ArrayList<ActaMinutaInfoVO>();
			list.add(it.next());
			try {
				createPDF(list, PROJECT_PATH);

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}
