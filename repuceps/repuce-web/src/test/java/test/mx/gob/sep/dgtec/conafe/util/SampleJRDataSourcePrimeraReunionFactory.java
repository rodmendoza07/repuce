package test.mx.gob.sep.dgtec.conafe.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;
import mx.gob.sep.dgtec.conafe.vo.PrimeraReunionVO;
import mx.gob.sep.dgtec.conafe.vo.ReunionesConafeVO;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecDiagnosticoComCstm;
import mx.gob.sep.dgtec.repuce.model.ApecInstructorCstm;
import mx.gob.sep.dgtec.repuce.model.ApecIntegrante;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecPoblacionIndigenaCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CAccion;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.model.CDiagnosticoCom;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafe;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;

public class SampleJRDataSourcePrimeraReunionFactory {

	public JRDataSource createDatasource() {
		return new JRBeanCollectionDataSource(createBeanCollection());
	}

	public JRDataSource createBeanCollectionDatasource() {
		return new JRBeanCollectionDataSource(createBeanCollection());
	}

	public static Vector<ReunionesConafeVO> createBeanCollection() {

		Vector<ReunionesConafeVO> coll = new Vector<ReunionesConafeVO>();

		ReunionesConafeVO reuniones = new ReunionesConafeVO();

		PrimeraReunionVO primeraReunionVO = new PrimeraReunionVO();

		// APEC
		ApecCstm apec = new ApecCstm();

		apec.setcApec(16);
		apec.setFchIntegracion(new Date());
		apec.setIdEntidadfed((short) 12);
		apec.setIdMunicipio(12);
		apec.setIdLocalidad(128);
		apec.setNomEntidadFed("GUERRERO");
		apec.setNomMunicipio("AYUTLA DE LOS LIBRES");
		apec.setNomLocalidad("EL LIMON");
		apec.setPeriodo("2013-2015");
		apec.setStatusApec((short) Constants.EDO_CE_NUEVO);
		apec.setTpoRegistro("1");
		apec.setIndAulaCompartida(false);

		// "reunion":{"cApec":16,"cReunion":2,"fchReunion":1382590800000,"horaIni":"10:30","horaFin":"12:30",
		// "observaciones":"actualizando reunion","fchRegistro":1382590800000,"usrCaptura":"PI","cadena":"FhUVNFAv9MfUo9srIbio"},

		// reunion
		ApecReunion reunion = new ApecReunion();
		reunion.setFchRegistro(new Date());
		reunion.setHoraIni("10:30");
		reunion.setHoraFin("12:30");
		reunion.setFchReunion(new Date());
		reunion.setObservaciones("actualizando reunion");
		reunion.setCadena("FhUVNFAv9MfUo9srIbio");
		reunion.setcReunion(Constants.PRIMERA_REUNION);

		// CCTS
		ArrayList<CCctLight> coCCT = new ArrayList<CCctLight>();

		CCctLight cCct = new CCctLight();

		cCct.setcCct(75565);
		cCct.setCveCct("12KPB0154N");
		cCct.setCvePrograma("PREESCOLAR");
		cCct.setNomCct("El JAGUAR");

		coCCT.add(cCct);

		// INTEGRANTES
		ArrayList<ApecReunionIntegranteCstm> integrantes = new ArrayList<ApecReunionIntegranteCstm>();

		ApecIntegrante ceIntegrante1 = new ApecIntegrante();
		ApecIntegrante ceIntegrante2 = new ApecIntegrante();
		ApecIntegrante ceIntegrante3 = new ApecIntegrante();

		ceIntegrante1.setcApec(1);
		ceIntegrante1.setcCargo(4);
		ceIntegrante1.setcIntegrante((short) 1);
		ceIntegrante1.setcNiveleduc(1);
		ceIntegrante1.setEdad((short) 58);
		ceIntegrante1.setGenero("M");
		ceIntegrante1.setPaternoIntegrante("ARGÜELLO");
		ceIntegrante1.setMaternoIntegrante("");
		ceIntegrante1.setNombreIntegrante("FRANCISCO");

		ApecReunionIntegranteCstm relacionIntegrante1 = new ApecReunionIntegranteCstm();

		relacionIntegrante1.setcApec(1);
		relacionIntegrante1.setcReunion(Constants.PRIMERA_REUNION);
		relacionIntegrante1.setcApecIntegrante(1);
		relacionIntegrante1.setcIntegrante((short) 1);
		relacionIntegrante1.setIntegrante(ceIntegrante1);
		relacionIntegrante1.setNomCargo("PRESIDENTE");
		relacionIntegrante1.setNomNiveleduc("MEDIA SUPERIOR");

		integrantes.add(relacionIntegrante1);

		ceIntegrante2.setcApec(1);
		ceIntegrante2.setcCargo(5);
		ceIntegrante2.setcIntegrante((short) 3);
		ceIntegrante2.setcNiveleduc(2);
		ceIntegrante2.setEdad((short) 15);
		ceIntegrante2.setGenero("H");
		ceIntegrante2.setPaternoIntegrante("GARCÍA");
		ceIntegrante2.setMaternoIntegrante("GODINEZ");
		ceIntegrante2.setNombreIntegrante("MALENA");

		ApecReunionIntegranteCstm relacionIntegrante2 = new ApecReunionIntegranteCstm();

		relacionIntegrante2.setcApec(1);
		relacionIntegrante2.setcReunion(Constants.PRIMERA_REUNION);
		relacionIntegrante2.setcApecIntegrante(1);
		relacionIntegrante2.setcIntegrante((short) 2);
		relacionIntegrante2.setIntegrante(ceIntegrante2);
		relacionIntegrante2.setNomCargo("SECRETARIO/ VICEPRESIDENTE");
		relacionIntegrante2.setNomNiveleduc("MEDIA SUPERIOR");

		integrantes.add(relacionIntegrante2);

		ceIntegrante3.setcApec(1);
		ceIntegrante3.setcCargo(6);
		ceIntegrante3.setcIntegrante((short) 4);
		ceIntegrante3.setcNiveleduc(1);
		ceIntegrante3.setEdad((short) 16);
		ceIntegrante3.setGenero("H");
		ceIntegrante3.setPaternoIntegrante("GARCIA");
		ceIntegrante3.setMaternoIntegrante("GARCIA");

		ApecReunionIntegranteCstm relacionIntegrante3 = new ApecReunionIntegranteCstm();

		relacionIntegrante3.setcApec(1);
		relacionIntegrante3.setcReunion(Constants.ACTA_CONSTITUTIVA);
		relacionIntegrante3.setcApecIntegrante(1);
		relacionIntegrante3.setcIntegrante((short) 3);
		relacionIntegrante3.setIntegrante(ceIntegrante3);
		relacionIntegrante3.setNomCargo("VOCAL");
		relacionIntegrante3.setNomNiveleduc("MEDIA SUPERIOR");

		integrantes.add(relacionIntegrante3);

		// INSTRUCTORES
		ArrayList<ApecReunionInstructorCtsm> instructores = new ArrayList<ApecReunionInstructorCtsm>();

		ApecInstructorCstm ceInstructor = new ApecInstructorCstm();

		ceInstructor.setcApec(1);
		ceInstructor.setcInstructor((short) 1);

		ceInstructor.setPaternoInstructor("Quintero Gonzales");
		ceInstructor.setMaternoInstructor("Gonzales Quintero");
		ceInstructor.setNombreInstructor("Esmeralda Claudia Leticia");
		ceInstructor.setEdad((short) 24);
		ceInstructor.setGenero("M");
		ceInstructor.setcNiveleduc(1);
		ceInstructor.setNomNiveleduc("MEDIA SUPERIOR");

		ApecReunionInstructorCtsm relacionInstructor = new ApecReunionInstructorCtsm();
		relacionInstructor.setcApec(1);
		relacionInstructor.setcApecInstructor(1);
		relacionInstructor.setcInstructor((short) 1);
		relacionInstructor.setcReunion(Constants.PRIMERA_REUNION);
		relacionInstructor.setImprimir(true);
		relacionInstructor.setInstructor(ceInstructor);

		instructores.add(relacionInstructor);

		ArrayList<ApecApoyoCstm> apoyosConafe = new ArrayList<ApecApoyoCstm>();

		ApecApoyoCstm apoyo1 = new ApecApoyoCstm();

		apoyo1.setcApec(16);
		apoyo1.setcReunion(Constants.PRIMERA_REUNION);
		apoyo1.setcApoyo(1);

		CApoyo apoyoCat = new CApoyo();
		apoyoCat.setcApoyo(1);
		apoyoCat.setcTipoApoyo(Constants.C_TIPO_APOYO_CONAFE);
		apoyoCat.setDescripCorta("Becas Acercate");
		apoyoCat.setDescripLarga("Becas Acercate a tu escuela");
		apoyoCat.setEconomico(false);
		apoyoCat.setEspecie(true);
		apoyoCat.setBeneficiarios(true);
		apoyoCat.setOtraDescripcion(false);

		apoyo1.setApoyo(apoyoCat);

		apoyosConafe.add(apoyo1);

		ApecApoyoCstm apoyoC2 = new ApecApoyoCstm();

		apoyoC2.setcReunion(Constants.PRIMERA_REUNION);
		apoyoC2.setcApoyo(2);
		// apoyoC2.setcApec(0);

		CApoyo apoyoCatC2 = new CApoyo();
		apoyoCatC2.setcApoyo(1);
		apoyoCatC2.setcTipoApoyo(Constants.C_TIPO_APOYO_CONAFE);
		apoyoCatC2.setDescripCorta("Apoyo FORTALECE");
		apoyoCatC2.setDescripLarga("Apoyo FORTALECE");
		apoyoCatC2.setEconomico(false);
		apoyoCatC2.setEspecie(true);
		apoyoCatC2.setBeneficiarios(true);
		apoyoCatC2.setOtraDescripcion(false);

		apoyoC2.setApoyo(apoyoCatC2);

		apoyosConafe.add(apoyoC2);

		ArrayList<ApecApoyoCstm> apoyosfederal = new ArrayList<ApecApoyoCstm>();

		ApecApoyoCstm apoyo2 = new ApecApoyoCstm();

		apoyo2.setcApec(16);
		apoyo2.setcReunion(Constants.PRIMERA_REUNION);
		apoyo2.setcApoyo(6);

		CApoyo apoyoCat2 = new CApoyo();
		apoyoCat2.setcApoyo(6);
		apoyoCat2.setcTipoApoyo(Constants.C_TIPO_APOYO_FEDERAL);
		apoyoCat2.setDescripCorta("PAL para menores de 0 a 5 años");
		apoyoCat2
				.setDescripLarga("Programa de apoyo alimentario (PAL) para menores de 0 a 5 años");
		apoyoCat2.setEconomico(false);
		apoyoCat2.setEspecie(true);
		apoyoCat2.setBeneficiarios(false);
		apoyoCat2.setOtraDescripcion(false);

		apoyo2.setApoyo(apoyoCat2);

		apoyosfederal.add(apoyo2);

		ArrayList<ApecApoyoCstm> apoyosestatal = new ArrayList<ApecApoyoCstm>();

		ApecApoyoCstm apoyo3 = new ApecApoyoCstm();

		apoyo3.setcApec(16);
		apoyo3.setcReunion(Constants.PRIMERA_REUNION);
		apoyo3.setcApoyo(8);

		CApoyo apoyoCat3 = new CApoyo();
		apoyoCat3.setcApoyo(8);
		apoyoCat3.setcTipoApoyo(Constants.C_TIPO_APOYO_ESTATAL);
		apoyoCat3
				.setDescripCorta("Recursos economicos o materiales para mejoras en aulas comunitarias");
		apoyoCat3
				.setDescripLarga("Recursos economicos o materiales para mejorar las condiciones de las aulas comimitarias");
		apoyoCat3.setEconomico(false);
		apoyoCat3.setEspecie(true);
		apoyoCat3.setBeneficiarios(true);
		apoyoCat3.setOtraDescripcion(false);

		apoyo3.setApoyo(apoyoCat3);

		apoyosestatal.add(apoyo3);

		ApecApoyoCstm apoyo5 = new ApecApoyoCstm();

		apoyo5.setcApec(16);
		apoyo5.setcReunion(Constants.PRIMERA_REUNION);
		apoyo5.setcApoyo(7);
		apoyo5.setDescripOtro("programa de prueba");
		apoyo5.setBeneficiariosr1(23);

		CApoyo apoyoCat5 = new CApoyo();
		apoyoCat5.setcApoyo(7);
		apoyoCat5.setcTipoApoyo(Constants.C_TIPO_APOYO_FEDERAL);
		apoyoCat5
				.setDescripCorta("Otro programa que sea parte de la cruzada contra el hambre");
		apoyoCat5
				.setDescripLarga("Algun otro programa que forma parte de la cruzada Nacional contra el Hambre.");
		apoyoCat5.setEconomico(false);
		apoyoCat5.setEspecie(true);
		apoyoCat5.setBeneficiarios(true);
		apoyoCat5.setOtraDescripcion(true);

		apoyo5.setApoyo(apoyoCat5);

		apoyosfederal.add(apoyo5);

		ArrayList<ApecApoyoCstm> necesidadesEsp = new ArrayList<ApecApoyoCstm>();

		ApecApoyoCstm apoyo4 = new ApecApoyoCstm();

		apoyo4.setcApec(16);
		apoyo4.setcReunion(Constants.PRIMERA_REUNION);
		apoyo4.setcApoyo(4);
		apoyo4.setBeneficiariosr1(45);
		apoyo4.setDescripOtro("apoyos braile");

		CApoyo apoyoCat4 = new CApoyo();
		apoyoCat4.setcApoyo(4);
		apoyoCat4.setcTipoApoyo(Constants.C_TIPO_APOYO_NECESIDAD_ESPECIAL);
		apoyoCat4
				.setDescripCorta("¿Hay niños con necesidades educativas especiale?");
		apoyoCat4
				.setDescripLarga("En el espacio educativo existen niños con necesidades educativas especiales");
		apoyoCat4.setEconomico(false);
		apoyoCat4.setEspecie(true);
		apoyoCat4.setBeneficiarios(true);
		apoyoCat4.setOtraDescripcion(false);

		apoyo4.setApoyo(apoyoCat4);

		necesidadesEsp.add(apoyo4);

		ArrayList<ApecDiagnosticoComCstm> diagnostico = new ArrayList<ApecDiagnosticoComCstm>();

		ApecDiagnosticoComCstm salud = new ApecDiagnosticoComCstm();

		salud.setcApec(16);
		salud.setcReunion(Constants.PRIMERA_REUNION);
		salud.setcDiagnosticoCom(1);
		salud.setTipoDiagnostico("Salud");

		CDiagnosticoCom saludCat = new CDiagnosticoCom();
		saludCat.setcDiagnosticoCom(1);
		saludCat.setcTipoDiagnosticoCom(Constants.C_DIAG_SALUD);
		saludCat.setDescripCorta("Gastrointestinales");
		saludCat.setDescripLarga("Problemas de salud más frecuentes en la comunidad: Gastrointestinales");
		saludCat.setPoblacionAfectada(false);
		saludCat.setOtraDescripcion(false);

		salud.setDiagnostico(saludCat);

		diagnostico.add(salud);

		ApecDiagnosticoComCstm salud2 = new ApecDiagnosticoComCstm();

		salud2.setcApec(16);
		salud2.setcReunion(Constants.PRIMERA_REUNION);
		salud2.setcDiagnosticoCom(2);
		salud2.setTipoDiagnostico("Salud");

		CDiagnosticoCom saludCat2 = new CDiagnosticoCom();
		saludCat2.setcDiagnosticoCom(2);
		saludCat2.setcTipoDiagnosticoCom(Constants.C_DIAG_SALUD);
		saludCat2.setDescripCorta("Respitarorios");
		saludCat2
				.setDescripLarga("Problemas de salud más frecuentes en la comunidad: Respitarorios");
		saludCat2.setPoblacionAfectada(false);
		saludCat2.setOtraDescripcion(false);

		salud2.setDiagnostico(saludCat2);
		diagnostico.add(salud2);

		ApecDiagnosticoComCstm salud3 = new ApecDiagnosticoComCstm();

		salud3.setcApec(16);
		salud3.setcReunion(Constants.PRIMERA_REUNION);
		salud3.setcDiagnosticoCom(5);
		salud3.setTipoDiagnostico("Salud");
		salud3.setDescripOtro("envenamiento");

		CDiagnosticoCom saludCat3 = new CDiagnosticoCom();
		saludCat3.setcDiagnosticoCom(1);
		saludCat3.setcTipoDiagnosticoCom(Constants.C_DIAG_SALUD);
		saludCat3.setDescripCorta("Otro:");
		saludCat3.setDescripLarga("Otro:");
		saludCat3.setPoblacionAfectada(false);
		saludCat3.setOtraDescripcion(true);

		salud3.setDiagnostico(saludCat3);

		diagnostico.add(salud3);

		ApecDiagnosticoComCstm produccion = new ApecDiagnosticoComCstm();

		produccion.setcApec(16);
		produccion.setcReunion(Constants.PRIMERA_REUNION);
		produccion.setcDiagnosticoCom(3);
		produccion.setTipoDiagnostico("Producción");

		CDiagnosticoCom prodCat = new CDiagnosticoCom();
		prodCat.setcDiagnosticoCom(1);
		prodCat.setcTipoDiagnosticoCom(Constants.C_DIAG_PRODUCCION);
		prodCat.setDescripCorta("¿Existen huertos o parcelas?");
		prodCat.setDescripLarga("¿Se cuenta con espacio o parcela destinada para huerto escolar?");
		prodCat.setPoblacionAfectada(false);
		prodCat.setOtraDescripcion(false);

		produccion.setDiagnostico(prodCat);
		diagnostico.add(produccion);

		ApecDiagnosticoComCstm produccion2 = new ApecDiagnosticoComCstm();

		produccion2.setcApec(16);
		produccion2.setcReunion(Constants.PRIMERA_REUNION);
		produccion2.setcDiagnosticoCom(4);
		produccion2.setPoblacionAfectada(14);
		produccion2.setTipoDiagnostico("Producción");

		CDiagnosticoCom prodCat2 = new CDiagnosticoCom();
		prodCat2.setcDiagnosticoCom(4);
		prodCat2.setcTipoDiagnosticoCom(Constants.C_DIAG_PRODUCCION);
		prodCat2.setDescripCorta("Número de familias que siembran para autoconsumo");
		prodCat2.setDescripLarga("Número de familias que tienen prácticas de siembra de huerto para autoconsumo");
		prodCat2.setPoblacionAfectada(true);
		prodCat2.setOtraDescripcion(false);

		produccion2.setDiagnostico(prodCat2);
		diagnostico.add(produccion2);

		ArrayList<ApecPoblacionIndigenaCstm> pobIng = new ArrayList<ApecPoblacionIndigenaCstm>();
		ApecPoblacionIndigenaCstm preg1 = new ApecPoblacionIndigenaCstm();

		preg1.setcApec(16);
		preg1.setcReunion(Constants.PRIMERA_REUNION);
		preg1.setPoblacionAfectada(160);
		preg1.setcLengua(1);
		preg1.setcPoblacionIndigena((short) 1);
		preg1.setPoblacionIndigena("En el espacio educactivo existen niños indigenas que solo hablan su lengua materna");
		preg1.setLengua("SERI");

		pobIng.add(preg1);

		ApecPoblacionIndigenaCstm preg2 = new ApecPoblacionIndigenaCstm();

		preg2.setcApec(16);
		preg2.setcReunion(Constants.PRIMERA_REUNION);
		preg2.setPoblacionAfectada(60);
		preg2.setcLengua(1);
		preg2.setcPoblacionIndigena((short) 2);
		preg2.setPoblacionIndigena("En el espacio educativo existen niños indigenas que son biligües");
		preg2.setLengua("SERI");

		pobIng.add(preg2);

		ArrayList<ApecPlanTrabajoCstm> planTrabajo = new ArrayList<ApecPlanTrabajoCstm>();
		ApecPlanTrabajoCstm apoyoPermanencia1 = new ApecPlanTrabajoCstm();

		apoyoPermanencia1.setcApec(16);
		apoyoPermanencia1.setcReunion(Constants.PRIMERA_REUNION);

		apoyoPermanencia1.setcAccion(1);
		apoyoPermanencia1.setTipoAccion("Apoyos");

		CAccion regCat1 = new CAccion();
		regCat1.setcAccion(1);
		regCat1.setcTipoAccion(Constants.C_TIPO_ACCION_PERMANENCIA);
		regCat1.setDescripLargar1("Organización y acuerdos de la comunidad para garantizar la alimentación y el hospedaje");
		regCat1.setCantidad(false);
		regCat1.setcTipoRespuesta((short) 1);
		regCat1.setBrigadaEsp(false);
		regCat1.setOtraDescripcion(false);

		apoyoPermanencia1.setAccion(regCat1);

		planTrabajo.add(apoyoPermanencia1);

		ApecPlanTrabajoCstm apoyoPermanencia2 = new ApecPlanTrabajoCstm();

		apoyoPermanencia2.setcApec(16);
		apoyoPermanencia2.setcReunion(Constants.PRIMERA_REUNION);

		apoyoPermanencia2.setcAccion(1);
		apoyoPermanencia2.setTipoAccion("Apoyos");

		CAccion regCatP2 = new CAccion();
		regCatP2.setcAccion(1);
		regCatP2.setcTipoAccion(Constants.C_TIPO_ACCION_PERMANENCIA);
		regCatP2.setDescripLargar1("Identificar zonas de riesgo e inseguridad, rutas de evacuación y zonas de seguridad en los espacios escolares y en el interior de la comunidad");
		regCatP2.setCantidad(false);
		regCatP2.setcTipoRespuesta((short) 1);
		regCatP2.setBrigadaEsp(false);
		regCatP2.setOtraDescripcion(false);

		apoyoPermanencia2.setAccion(regCatP2);

		planTrabajo.add(apoyoPermanencia2);

		ApecPlanTrabajoCstm accion1 = new ApecPlanTrabajoCstm();

		accion1.setcApec(16);
		accion1.setcReunion(Constants.PRIMERA_REUNION);
		accion1.setcAccion(5);
		accion1.setTipoAccion("Mantenimiento a los espacios educativos");
		accion1.setNumVecesr1(2);

		CAccion regCat2 = new CAccion();
		regCat2.setcAccion(5);
		regCat2.setcTipoAccion(Constants.C_TIPO_ACCION_MANTTO_ESPACIOS);
		regCat2.setDescripLargar1("Se programan realizar jornadas comunitarias para el  mantenimiento y limpieza de las instalaciones educativas");
		regCat2.setCantidad(true);
		regCat2.setcTipoRespuesta((short) 1);
		regCat2.setBrigadaEsp(false);
		regCat2.setOtraDescripcion(false);

		accion1.setAccion(regCat2);

		planTrabajo.add(accion1);

		ApecPlanTrabajoCstm accion2 = new ApecPlanTrabajoCstm();

		accion2.setcApec(16);
		accion2.setcReunion(Constants.PRIMERA_REUNION);
		accion2.setcAccion(17);
		accion2.setTipoAccion("Actividades de apoyo comunitario");
		accion2.setNumVecesr1(12);

		CAccion regCat3 = new CAccion();
		regCat3.setcAccion(17);
		regCat3.setcTipoAccion(Constants.C_TIPO_ACCION_APOYO_COM);
		regCat3.setDescripLargar1("Solicitar que se realicen actividades culturales en la comunidad");
		regCat3.setCantidad(true);
		regCat3.setcTipoRespuesta((short) 1);
		regCat3.setBrigadaEsp(false);
		regCat3.setOtraDescripcion(false);

		accion2.setAccion(regCat3);

		planTrabajo.add(accion2);

		ApecPlanTrabajoCstm accion3 = new ApecPlanTrabajoCstm();

		accion3.setcApec(16);
		accion3.setcReunion(Constants.PRIMERA_REUNION);
		accion3.setcAccion(18);
		accion3.setTipoAccion("Actividades de apoyo comunitario");
		accion3.setNomOtra("atencion dental");
		accion3.setNumVecesr1(8);

		CAccion regCat4 = new CAccion();
		regCat4.setcAccion(18);
		regCat4.setcTipoAccion(Constants.C_TIPO_ACCION_APOYO_COM);
		regCat4.setDescripLargar1("Solicitar brigadas de salud e higiene y cuidado personal.");
		regCat4.setCantidad(true);
		regCat4.setcTipoRespuesta((short) 1);
		regCat4.setBrigadaEsp(true);
		regCat4.setOtraDescripcion(false);

		accion3.setAccion(regCat4);
		planTrabajo.add(accion3);

		ApecPlanTrabajoCstm accion4 = new ApecPlanTrabajoCstm();

		accion4.setcApec(16);
		accion4.setcReunion(Constants.PRIMERA_REUNION);
		accion4.setcAccion(19);
		accion4.setTipoAccion("Otro. Especifique:");
		accion4.setNomOtra("cuidado del medio ambiente");
		accion4.setNumVecesr1(4);

		CAccion regCat5 = new CAccion();
		regCat5.setcAccion(19);
		regCat5.setcTipoAccion(Constants.C_TIPO_ACCION_OTRAS);
		regCat5.setDescripLargar1("");
		regCat5.setCantidad(true);
		regCat5.setcTipoRespuesta((short) 1);
		regCat5.setBrigadaEsp(false);
		regCat5.setOtraDescripcion(true);

		accion4.setAccion(regCat5);
		planTrabajo.add(accion4);

		CLocalidadConafe locConafe = new CLocalidadConafe();

		locConafe.setIdLocalidad(1);
		locConafe.setIdMunicipio(1);
		locConafe.setIdEntidadfed((short) 16);
		locConafe.setNomLocalidad("Apatzingan");
		locConafe.setFchIniVigencia(new Date());

		primeraReunionVO.setApec(apec);
		primeraReunionVO.setReunion(reunion);
		primeraReunionVO.setIntegrantesR1(integrantes);
		primeraReunionVO.setCentrosConafe(coCCT);
		primeraReunionVO.setLocalidad(locConafe);
		primeraReunionVO.setInstructoresR1(instructores);
		primeraReunionVO.setApoyosConafe(apoyosConafe);
		primeraReunionVO.setApoyosFederales(apoyosfederal);
		primeraReunionVO.setApoyosEstatales(apoyosestatal);
		// primeraReunionVO.setNecesidadesEspeciales(necesidadesEsp);
		primeraReunionVO.setDiagnostico(diagnostico);
		// primeraReunionVO.setPobIndigena(pobIng);
		primeraReunionVO.setPlanTrabajo(planTrabajo);

		reuniones.setPrimeraReunionVO(primeraReunionVO);
		reuniones.setActaConstitutiva(new ActaConstitutivaVO());

		System.out.println("kkk" + primeraReunionVO.getIntegrantesR1());
		coll.add(reuniones);

		return coll;

	}

	public static void createPDF(List<ReunionesConafeVO> list, String path)
			throws JRException, Exception {
		try {

			String jasperName = path
					+ "/WEB-INF/jasperTemplates/PrimeraReunion.jasper";
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
					+ "/WEB-INF/jasperTemplates/PrimeraReunion.pdf");

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
	 * Rebobina el el apuntador del DataSource
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

		List<ReunionesConafeVO> datos = createBeanCollection();

		Iterator<ReunionesConafeVO> it = datos.iterator();
		List<ReunionesConafeVO> list;

		while (it.hasNext()) {
			list = new ArrayList<ReunionesConafeVO>();
			list.add(it.next());
			try {
				createPDF(list, PROJECT_PATH);

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}
