package test.mx.gob.sep.dgtec.conafe.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;
import mx.gob.sep.dgtec.conafe.vo.ReunionesConafeVO;
import mx.gob.sep.dgtec.conafe.vo.SegundaReunionVO;
import mx.gob.sep.dgtec.repuce.model.ApecApoyoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecInstructorCstm;
import mx.gob.sep.dgtec.repuce.model.ApecIntegrante;
import mx.gob.sep.dgtec.repuce.model.ApecPlanTrabajoCstm;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CAccion;
import mx.gob.sep.dgtec.repuce.model.CApoyo;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafe;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;

public class SampleJRDataSourceSegundaReunionFactory {

	public JRDataSource createDatasource() {
		return new JRBeanCollectionDataSource(createBeanCollection());
	}

	public JRDataSource createBeanCollectionDatasource() {
		return new JRBeanCollectionDataSource(createBeanCollection());
	}

	public static Vector<ReunionesConafeVO> createBeanCollection() {

		Vector<ReunionesConafeVO> coll = new Vector<ReunionesConafeVO>();

		ReunionesConafeVO reuniones = new ReunionesConafeVO();

		SegundaReunionVO segundaReunionVO = new SegundaReunionVO();

		// APEC
		ApecCstm apec = new ApecCstm();

		apec.setcApec(8);
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

		// reunion
		ApecReunion reunion = new ApecReunion();
		reunion.setFchRegistro(new Date());
		reunion.setHoraIni("10:30");
		reunion.setHoraFin("12:30");
		reunion.setFchReunion(new Date());
		reunion.setObservaciones("actualizando reunion");
		reunion.setCadena("FhUVNFAv9MfUo9srIbio");
		reunion.setcReunion(Constants.SEGUNDA_REUNION);

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
		relacionIntegrante1.setcReunion(Constants.SEGUNDA_REUNION);
		relacionIntegrante1.setcApecIntegrante(1);
		relacionIntegrante1.setcIntegrante((short) 1);
		relacionIntegrante1.setIntegrante(ceIntegrante1);
		relacionIntegrante1.setNomCargo("PRESIDENTE");
		relacionIntegrante1
				.setNomNiveleduc("Sin estudios, sabe leer y sabe escribir");

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
		relacionIntegrante2.setcReunion(Constants.ACTA_CONSTITUTIVA);
		relacionIntegrante2.setcApecIntegrante(1);
		relacionIntegrante2.setcIntegrante((short) 3);
		relacionIntegrante2.setIntegrante(ceIntegrante2);
		relacionIntegrante2.setNomCargo("SECRETARIO/ VICEPRESIDENTE");
		relacionIntegrante2.setNomNiveleduc("MEDIA SUPERIOR");

		integrantes.add(relacionIntegrante2);

		ceIntegrante3.setcApec(1);
		ceIntegrante3.setcCargo(6);
		ceIntegrante3.setcIntegrante((short) 4);
		ceIntegrante3.setcNiveleduc(1);
		// ceIntegrante3.setcReunion((short) Constants.ACTA_CONSTITUTIVA);
		ceIntegrante3.setEdad((short) 16);
		ceIntegrante3.setGenero("H");
		ceIntegrante3.setPaternoIntegrante("GARCIA");
		ceIntegrante3.setMaternoIntegrante("GARCIA");
		ceIntegrante3.setNombreIntegrante("MARIA FERNANDA");

		ApecReunionIntegranteCstm relacionIntegrante3 = new ApecReunionIntegranteCstm();

		relacionIntegrante3.setcApec(1);
		relacionIntegrante3.setcReunion(Constants.SEGUNDA_REUNION);
		relacionIntegrante3.setcApecIntegrante(1);
		relacionIntegrante3.setcIntegrante((short) 4);
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
		relacionInstructor.setcReunion(Constants.SEGUNDA_REUNION);
		relacionInstructor.setImprimir(false);
		relacionInstructor.setInstructor(ceInstructor);

		instructores.add(relacionInstructor);

		ArrayList<ApecApoyoCstm> apoyos = new ArrayList<ApecApoyoCstm>();
		ArrayList<ApecApoyoCstm> apoyosConafe = new ArrayList<ApecApoyoCstm>();

		ApecApoyoCstm apoyoCon1 = new ApecApoyoCstm();

		apoyoCon1.setcApec(8);
		apoyoCon1.setcReunion(Constants.SEGUNDA_REUNION);
		apoyoCon1.setcApoyo(3);
		apoyoCon1.setEspecier2("cuadernos rayados y cuadriculados");
		apoyoCon1.setBeneficiariosr2(4);

		CApoyo apoyoCat = new CApoyo();
		apoyoCat.setcApoyo(3);
		apoyoCat.setcTipoApoyo(Constants.C_TIPO_APOYO_CONAFE);
		apoyoCat.setDescripCorta("Utiles escolares");
		apoyoCat.setDescripLarga("Utiles escolares");
		apoyoCat.setEconomico(false);
		apoyoCat.setEspecie(true);
		apoyoCat.setBeneficiarios(true);
		apoyoCat.setOtraDescripcion(false);

		apoyoCon1.setApoyo(apoyoCat);

		apoyosConafe.add(apoyoCon1);
		apoyos.add(apoyoCon1);

		ApecApoyoCstm apoyoCon2 = new ApecApoyoCstm();

		apoyoCon2.setcReunion(Constants.SEGUNDA_REUNION);
		apoyoCon2.setcApoyo(13);
		apoyoCon2.setcApec(8);
		apoyoCon2.setBeneficiariosr2(23);
		apoyoCon2.setEspecier2("3 bebederos");
		apoyoCon2.setMontor2(2800);
		apoyoCon2.setDescripOtro("donacion de bebederos");

		CApoyo apoyoCatC2 = new CApoyo();
		apoyoCatC2.setcApoyo(13);
		apoyoCatC2.setcTipoApoyo(Constants.C_TIPO_APOYO_CONAFE);
		apoyoCatC2.setDescripCorta("Otro:");
		apoyoCatC2.setDescripLarga("Otro:");
		apoyoCatC2.setEconomico(true);
		apoyoCatC2.setEspecie(true);
		apoyoCatC2.setBeneficiarios(true);
		apoyoCatC2.setOtraDescripcion(true);

		apoyoCon2.setApoyo(apoyoCatC2);

		apoyosConafe.add(apoyoCon2);
		apoyos.add(apoyoCon2);

		ArrayList<ApecApoyoCstm> apoyosfederal = new ArrayList<ApecApoyoCstm>();

		ApecApoyoCstm apoyoFed1 = new ApecApoyoCstm();

		apoyoFed1.setcApec(8);
		apoyoFed1.setcReunion(Constants.SEGUNDA_REUNION);
		apoyoFed1.setcApoyo(14);
		apoyoFed1.setEspecier2("jugos y leches saborizadas");
		apoyoFed1.setBeneficiariosr2(136);

		CApoyo apoyoCatFed1 = new CApoyo();
		apoyoCatFed1.setcApoyo(14);
		apoyoCatFed1.setcTipoApoyo(Constants.C_TIPO_APOYO_FEDERAL);
		apoyoCatFed1.setDescripCorta("PAL para menores de 0 a 5 años");
		apoyoCatFed1
				.setDescripLarga("Programa de apoyo alimentario (PAL) para menores de 0 a 5 años");
		apoyoCatFed1.setEconomico(false);
		apoyoCatFed1.setEspecie(true);
		apoyoCatFed1.setBeneficiarios(true);
		apoyoCatFed1.setOtraDescripcion(false);

		apoyoFed1.setApoyo(apoyoCatFed1);

		apoyosfederal.add(apoyoFed1);
		apoyos.add(apoyoFed1);

		ApecApoyoCstm apoyoFed2 = new ApecApoyoCstm();

		apoyoFed2.setcApec(8);
		apoyoFed2.setcReunion(Constants.SEGUNDA_REUNION);
		apoyoFed2.setcApoyo(14);
		apoyoFed2.setEspecier2("como lavar los dientes correctamente");
		apoyoFed2.setBeneficiariosr2(7);

		CApoyo apoyoCatFed2 = new CApoyo();
		apoyoCatFed2.setcApoyo(14);
		apoyoCatFed2.setcTipoApoyo(Constants.C_TIPO_APOYO_FEDERAL);
		apoyoCatFed2
				.setDescripCorta("Oportunidades: Pláticas de promoción de la salud");
		apoyoCatFed2
				.setDescripLarga("Oportunidades: Pláticas de promoción de la salud");
		apoyoCatFed2.setEconomico(false);
		apoyoCatFed2.setEspecie(true);
		apoyoCatFed2.setBeneficiarios(true);
		apoyoCatFed2.setOtraDescripcion(false);
		apoyoCatFed2.setOtroTipoBeneficiarios("Número de pláticas");

		apoyoFed2.setApoyo(apoyoCatFed2);
		apoyosfederal.add(apoyoFed2);
		apoyos.add(apoyoFed2);

		ApecApoyoCstm apoyoFed3 = new ApecApoyoCstm();

		apoyoFed3.setcApec(8);
		apoyoFed3.setcReunion(Constants.SEGUNDA_REUNION);
		apoyoFed3.setcApoyo(22);
		apoyoFed3.setEspecier2("cenas balanceadas");
		apoyoFed3.setMontor2(23900);
		apoyoFed3.setBeneficiariosr2(700);
		apoyoFed3.setDescripOtro("comedores nocturnos");

		CApoyo apoyoCatFed3 = new CApoyo();
		apoyoCatFed3.setcApoyo(14);
		apoyoCatFed3.setcTipoApoyo(Constants.C_TIPO_APOYO_FEDERAL);
		apoyoCatFed3
				.setDescripCorta("Algún otro programa que forme parte de la Cruzada Nacional contra el Hambre");
		apoyoCatFed3
				.setDescripLarga("Algún otro programa que forme parte de la Cruzada Nacional contra el Hambre");
		apoyoCatFed3.setEconomico(true);
		apoyoCatFed3.setEspecie(true);
		apoyoCatFed3.setBeneficiarios(true);
		apoyoCatFed3.setOtraDescripcion(true);

		apoyoFed3.setApoyo(apoyoCatFed3);
		apoyosfederal.add(apoyoFed3);
		apoyos.add(apoyoFed3);

		ArrayList<ApecApoyoCstm> apoyosestatal = new ArrayList<ApecApoyoCstm>();

		ApecApoyoCstm apoyoEst1 = new ApecApoyoCstm();

		apoyoEst1.setcApec(8);
		apoyoEst1.setcReunion(Constants.SEGUNDA_REUNION);
		apoyoEst1.setcApoyo(24);
		apoyoEst1.setBeneficiariosr2(2);
		apoyoEst1.setEspecier2("sacos de cal y ladrillos");
		apoyoEst1.setMontor2(3700);

		CApoyo apoyoCatEst1 = new CApoyo();
		apoyoCatEst1.setcApoyo(24);
		apoyoCatEst1.setcTipoApoyo(Constants.C_TIPO_APOYO_ESTATAL);
		apoyoCatEst1
				.setDescripCorta("Apoyos para la construccion del aula comunitaria.");
		apoyoCatEst1
				.setDescripLarga("Apoyos para la construccion del aula comunitaria.");
		apoyoCatEst1.setEconomico(true);
		apoyoCatEst1.setEspecie(true);
		apoyoCatEst1.setBeneficiarios(true);
		apoyoCatEst1.setOtraDescripcion(false);
		apoyoCatEst1.setOtroTipoBeneficiarios("Número de aulas");

		apoyoEst1.setApoyo(apoyoCatEst1);

		apoyosestatal.add(apoyoEst1);
		apoyos.add(apoyoEst1);

		ApecApoyoCstm apoyoEst2 = new ApecApoyoCstm();

		apoyoEst2.setcApec(8);
		apoyoEst2.setcReunion(Constants.SEGUNDA_REUNION);
		apoyoEst2.setcApoyo(26);
		apoyoEst2.setDescripOtro("programa de prueba");
		apoyoEst2.setBeneficiariosr2(223);
		apoyoEst2.setEspecier2("guias audiovisuales");
		apoyoEst2.setMontor2(24000);

		CApoyo apoyoCatEst2 = new CApoyo();
		apoyoCatEst2.setcApoyo(26);
		apoyoCatEst2.setcTipoApoyo(Constants.C_TIPO_APOYO_ESTATAL);
		apoyoCatEst2.setDescripCorta("Otros");
		apoyoCatEst2.setDescripLarga("Otros");
		apoyoCatEst2.setEconomico(true);
		apoyoCatEst2.setEspecie(true);
		apoyoCatEst2.setBeneficiarios(true);
		apoyoCatEst2.setOtraDescripcion(true);

		apoyoEst2.setApoyo(apoyoCatEst2);

		apoyosestatal.add(apoyoEst2);
		apoyos.add(apoyoEst2);

		ArrayList<ApecApoyoCstm> necesidadesEsp = new ArrayList<ApecApoyoCstm>();

		ApecApoyoCstm apoyoNeSp1 = new ApecApoyoCstm();

		apoyoNeSp1.setcApec(8);
		apoyoNeSp1.setcReunion(Constants.SEGUNDA_REUNION);
		apoyoNeSp1.setcApoyo(27);
		apoyoNeSp1.setBeneficiariosr2(45);
		apoyoNeSp1.setEspecier2("bicicletas");
		apoyoNeSp1.setMontor2(6500);

		CApoyo apoyoCatNe1 = new CApoyo();
		apoyoCatNe1.setcApoyo(4);
		apoyoCatNe1.setcTipoApoyo(Constants.C_TIPO_APOYO_NECESIDAD_ESPECIAL);
		apoyoCatNe1
				.setDescripCorta("En el espacio educativo existen ninos con necesidades educativas especiales");
		apoyoCatNe1
				.setDescripLarga("En el espacio educativo existen niños con necesidades educativas especiales");
		apoyoCatNe1.setEconomico(true);
		apoyoCatNe1.setEspecie(true);
		apoyoCatNe1.setBeneficiarios(true);
		apoyoCatNe1.setOtraDescripcion(false);

		apoyoNeSp1.setApoyo(apoyoCatNe1);

		necesidadesEsp.add(apoyoNeSp1);
		apoyos.add(apoyoNeSp1);

		ArrayList<ApecPlanTrabajoCstm> planTrabajo = new ArrayList<ApecPlanTrabajoCstm>();

		ApecPlanTrabajoCstm accion1 = new ApecPlanTrabajoCstm();
		accion1.setcApec(8);
		accion1.setcReunion(Constants.SEGUNDA_REUNION);

		accion1.setcAccion(1);
		accion1.setTipoAccion("Apoyos para motivar permanencia");
		accion1.setcRespuestar2(3);
		accion1.setRespuestaR2("Casi siempre");

		CAccion regCat1 = new CAccion();
		regCat1.setcAccion(1);
		regCat1.setcTipoAccion(Constants.C_TIPO_ACCION_PERMANENCIA);
		regCat1.setDescripLargar2("Organización y acuerdos de la comunidad para garantizar la alimentación y el hospedaje");
		regCat1.setCantidad(false);
		regCat1.setcTipoRespuesta((short) 1);
		regCat1.setBrigadaEsp(false);
		regCat1.setOtraDescripcion(false);

		accion1.setAccion(regCat1);

		planTrabajo.add(accion1);

		ApecPlanTrabajoCstm accion5 = new ApecPlanTrabajoCstm();
		accion5.setcApec(8);
		accion5.setcReunion(Constants.SEGUNDA_REUNION);

		accion5.setcAccion(4);
		accion5.setTipoAccion("Apoyos para motivar permanencia");
		accion5.setcRespuestar2(9);
		accion5.setRespuestaR2("Sí");

		CAccion regCat5 = new CAccion();
		regCat5.setcAccion(4);
		regCat5.setcTipoAccion(Constants.C_TIPO_ACCION_PERMANENCIA);
		regCat5.setDescripLargar2("Se ha integrado la información familiar y antecedentes médicos de los instructores comunitarios en caso de cualquier emergencia.");
		regCat5.setCantidad(false);
		regCat5.setcTipoRespuesta((short) 4);
		regCat5.setBrigadaEsp(false);
		regCat5.setOtraDescripcion(false);

		accion5.setAccion(regCat5);

		planTrabajo.add(accion5);

		ApecPlanTrabajoCstm accion2 = new ApecPlanTrabajoCstm();
		accion2.setcApec(8);
		accion2.setcReunion(Constants.SEGUNDA_REUNION);

		accion2.setcAccion(5);
		accion2.setTipoAccion("Mantenimiento a los espacios educativos");
		accion2.setcRespuestar2(5);
		accion2.setRespuestaR2("numerica");
		accion2.setNumVecesr2(5);

		CAccion regCat2 = new CAccion();
		regCat2.setcAccion(5);
		regCat2.setcTipoAccion(Constants.C_TIPO_ACCION_MANTTO_ESPACIOS);
		regCat2.setDescripLargar2("Numero de jornadas comunitarias realizadas para el mantenimiento y limpieza de instalaciones educativas.");
		regCat2.setCantidad(true);
		regCat2.setcTipoRespuesta((short) 2);
		regCat2.setBrigadaEsp(false);
		regCat2.setOtraDescripcion(false);

		accion2.setAccion(regCat2);

		planTrabajo.add(accion2);

		ApecPlanTrabajoCstm accion3 = new ApecPlanTrabajoCstm();
		accion3.setcApec(8);
		accion3.setcReunion(Constants.SEGUNDA_REUNION);

		accion3.setcAccion(6);
		accion3.setTipoAccion("Mantenimiento a los espacios educativos");
		accion3.setcRespuestar2(5);
		accion3.setRespuestaR2("numerica");
		accion3.setNumVecesr2(9);

		CAccion regCat3 = new CAccion();
		regCat3.setcAccion(6);
		regCat3.setcTipoAccion(Constants.C_TIPO_ACCION_MANTTO_ESPACIOS);
		regCat3.setDescripLargar2("Número de jornadas efectuadas para dar mantenimiento al mobiliario escolar.");
		regCat3.setCantidad(true);
		regCat3.setcTipoRespuesta((short) 2);
		regCat3.setBrigadaEsp(false);
		regCat3.setOtraDescripcion(false);

		accion3.setAccion(regCat3);

		planTrabajo.add(accion3);

		ApecPlanTrabajoCstm accion4 = new ApecPlanTrabajoCstm();
		accion4.setcApec(8);
		accion4.setcReunion(Constants.SEGUNDA_REUNION);

		accion4.setcAccion(6);
		accion4.setTipoAccion("Apoyo comunitario");
		accion4.setcRespuestar2(5);
		accion4.setRespuestaR2("numerica");
		accion4.setNumVecesr2(11);
		accion4.setNomOtra("educación física");

		CAccion regCat4 = new CAccion();
		regCat4.setcAccion(6);
		regCat4.setcTipoAccion(Constants.C_TIPO_ACCION_APOYO_COM);
		regCat4.setDescripLargar2("Solicitar brigadas de salud e higiene y cuidado personal.");
		regCat4.setCantidad(true);
		regCat4.setcTipoRespuesta((short) 2);
		regCat4.setBrigadaEsp(true);
		regCat4.setOtraDescripcion(false);

		accion4.setAccion(regCat4);

		planTrabajo.add(accion4);

		CLocalidadConafe locConafe = new CLocalidadConafe();

		locConafe.setIdLocalidad(1);
		locConafe.setIdMunicipio(1);
		locConafe.setIdEntidadfed((short) 16);
		locConafe.setNomLocalidad("Apatzingan");
		locConafe.setFchIniVigencia(new Date());

		segundaReunionVO.setApec(apec);
		segundaReunionVO.setReunion(reunion);
		segundaReunionVO.setIntegrantesR2(integrantes);
		segundaReunionVO.setCentrosConafe(coCCT);
		segundaReunionVO.setLocalidad(locConafe);
		segundaReunionVO.setInstructoresR2(instructores);
		segundaReunionVO.setApoyosConafe(apoyosConafe);
		segundaReunionVO.setApoyosFederales(apoyosfederal);
		segundaReunionVO.setApoyosEstatales(apoyosestatal);

		segundaReunionVO.setPlanTrabajo(planTrabajo);
		segundaReunionVO.setApoyos(apoyos);

		reuniones.setSegundaReunion(segundaReunionVO);
		reuniones.setActaConstitutiva(new ActaConstitutivaVO());

		System.out.println("integrantes" + segundaReunionVO.getIntegrantesR2());
		coll.add(reuniones);

		return coll;

	}

	public static void createPDF(List<ReunionesConafeVO> list, String path)
			throws JRException, Exception {
		try {

			String jasperName = path
					+ "/WEB-INF/jasperTemplates/SegundaReunion.jasper";
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
					+ "/WEB-INF/jasperTemplates/SegundaReunion.pdf");

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
