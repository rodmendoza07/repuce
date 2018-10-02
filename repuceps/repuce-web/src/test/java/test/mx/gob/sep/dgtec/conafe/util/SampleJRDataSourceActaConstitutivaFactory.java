package test.mx.gob.sep.dgtec.conafe.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.Vector;

import mx.gob.sep.dgtec.conafe.vo.ActaConstitutivaVO;
import mx.gob.sep.dgtec.conafe.vo.ReunionesConafeVO;
import mx.gob.sep.dgtec.repuce.model.ApecAsistenteCstm;
import mx.gob.sep.dgtec.repuce.model.ApecCstm;
import mx.gob.sep.dgtec.repuce.model.ApecInstructorCstm;
import mx.gob.sep.dgtec.repuce.model.ApecIntegrante;
import mx.gob.sep.dgtec.repuce.model.ApecReunion;
import mx.gob.sep.dgtec.repuce.model.ApecReunionInstructorCtsm;
import mx.gob.sep.dgtec.repuce.model.ApecReunionIntegranteCstm;
import mx.gob.sep.dgtec.repuce.model.CLocalidadConafe;
import mx.gob.sep.dgtec.repuce.util.Constants;
import mx.gob.sep.dgtec.repuce.vo.CCctLight;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public class SampleJRDataSourceActaConstitutivaFactory {

	public JRDataSource createDatasource() {
		return new JRBeanCollectionDataSource(createBeanCollection());
	}

	public JRDataSource createBeanCollectionDatasource() {
		return new JRBeanCollectionDataSource(createBeanCollection());
	}

	public static Vector<ReunionesConafeVO> createBeanCollection() {

		Vector<ReunionesConafeVO> coll = new Vector<ReunionesConafeVO>();

		ReunionesConafeVO reuniones = new ReunionesConafeVO();

		ActaConstitutivaVO actaConstitutiva = new ActaConstitutivaVO();

		// APEC
		ApecCstm apec = new ApecCstm();

		apec.setcApec(1);
		apec.setFchIntegracion(new Date());
		apec.setIdEntidadfed((short) 1);
		apec.setIdMunicipio(1);
		apec.setIdLocalidad(5);
		apec.setNomEntidadFed("MICHOACAN DE OCAMPO");
		apec.setNomMunicipio("Coalcomán de Vázquez Pallares");
		apec.setNomLocalidad("Barranca de Aguilar (Barranca del Limoncito)");
		apec.setPeriodo("13-14");
		apec.setStatusApec((short) Constants.EDO_CE_NUEVO);
		apec.setTpoRegistro("1");
		apec.setIndAulaCompartida(true);

		// reunion
		ApecReunion reunion = new ApecReunion();
		reunion.setFchRegistro(new Date());
		reunion.setHoraIni("12:00");
		reunion.setHoraFin("14:00");
		reunion.setFchReunion(new Date());
		reunion.setObservaciones("Ninguna");
		reunion.setCadena("KJNEPÑ");
		reunion.setcReunion(Constants.ACTA_CONSTITUTIVA);
		// CCTS
		ArrayList<CCctLight> coCCT = new ArrayList<CCctLight>();

		CCctLight cCct = new CCctLight();

		cCct.setcCct(1);
		cCct.setCveCct("16JKN");
		cCct.setCvePrograma("PREESCOLAR");
		cCct.setNomCct("El JAGUAR");

		coCCT.add(cCct);

		// INTEGRANTES
		ArrayList<ApecReunionIntegranteCstm> integrantes = new ArrayList<ApecReunionIntegranteCstm>();

		ApecIntegrante ceIntegrante1 = new ApecIntegrante();
		ApecIntegrante ceIntegrante2 = new ApecIntegrante();
		ApecIntegrante ceIntegrante3 = new ApecIntegrante();

		ceIntegrante1.setcApec(1);
		ceIntegrante1.setcCargo(1);
		ceIntegrante1.setcIntegrante((short) 1);
		ceIntegrante1.setcNiveleduc(1);
		ceIntegrante1.setEdad((short) 16);
		ceIntegrante1.setGenero("H");
		ceIntegrante1.setPaternoIntegrante("Robledo Janitzio Lopez Garibaldi");
		ceIntegrante1.setMaternoIntegrante("Mendez de Guzman Renteria");
		ceIntegrante1
				.setNombreIntegrante("Jose Salvador Macario Reyes Minero ");

		ApecReunionIntegranteCstm relacionIntegrante1 = new ApecReunionIntegranteCstm();

		relacionIntegrante1.setcApec(1);
		relacionIntegrante1.setcReunion(Constants.ACTA_CONSTITUTIVA);
		relacionIntegrante1.setcApecIntegrante(1);
		relacionIntegrante1.setcIntegrante((short) 1);
		relacionIntegrante1.setIntegrante(ceIntegrante1);
		relacionIntegrante1.setNomCargo("PRESIDENTE");
		relacionIntegrante1.setNomNiveleduc("MEDIA SUPERIOR");

		integrantes.add(relacionIntegrante1);

		ceIntegrante2.setcApec(1);
		ceIntegrante2.setcCargo(2);
		ceIntegrante2.setcIntegrante((short) 2);
		ceIntegrante2.setcNiveleduc(1);
		ceIntegrante2.setEdad((short) 16);
		ceIntegrante2.setGenero("H");
		ceIntegrante2.setPaternoIntegrante("Gonzalez del rio");
		ceIntegrante2.setMaternoIntegrante("Torres monte mayo");
		ceIntegrante2.setNombreIntegrante("Bulmaro Carlos Eugenio");

		ApecReunionIntegranteCstm relacionIntegrante2 = new ApecReunionIntegranteCstm();

		relacionIntegrante2.setcApec(1);
		relacionIntegrante2.setcReunion(Constants.ACTA_CONSTITUTIVA);
		relacionIntegrante2.setcApecIntegrante(1);
		relacionIntegrante2.setcIntegrante((short) 2);
		relacionIntegrante2.setIntegrante(ceIntegrante2);
		relacionIntegrante2.setNomCargo("SECRETARIO/ VICEPRESIDENTE");
		relacionIntegrante2.setNomNiveleduc("MEDIA SUPERIOR");

		integrantes.add(relacionIntegrante2);

		ceIntegrante3.setcApec(1);
		ceIntegrante3.setcCargo(3);
		ceIntegrante3.setcIntegrante((short) 3);
		ceIntegrante3.setcNiveleduc(1);
		ceIntegrante3.setEdad((short) 16);
		ceIntegrante3.setGenero("H");
		ceIntegrante3.setPaternoIntegrante("Duran");
		ceIntegrante3.setMaternoIntegrante("Jasso");
		ceIntegrante3.setNombreIntegrante("Emmanuel");

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
		relacionInstructor.setcReunion(Constants.ACTA_CONSTITUTIVA);
		relacionInstructor.setImprimir(true);

		relacionInstructor.setInstructor(ceInstructor);

		instructores.add(relacionInstructor);

		// ASISTENTES
		ArrayList<ApecAsistenteCstm> asistentes = new ArrayList<ApecAsistenteCstm>();

		ApecAsistenteCstm ceAsistente1 = new ApecAsistenteCstm();
		ApecAsistenteCstm ceAsistente2 = new ApecAsistenteCstm();

		ceAsistente1.setcApec(1);
		ceAsistente1.setcAsistente((short) 1);
		ceAsistente1.setcReunion((short) Constants.ACTA_CONSTITUTIVA);
		ceAsistente1.setPaternoAsistente("Diaz");
		ceAsistente1.setMaternoAsistente("Alvarez");
		ceAsistente1.setNombreAsistente("Laura");
		ceAsistente1.setEdad((short) 22);
		ceAsistente1.setGenero("M");
		ceAsistente1.setcNiveleduc(1);
		ceAsistente1.setNomNiveleduc("MEDIA SUPERIOR");

		asistentes.add(ceAsistente1);

		ceAsistente2.setcApec(1);
		ceAsistente2.setcAsistente((short) 1);
		ceAsistente2.setcReunion((short) Constants.ACTA_CONSTITUTIVA);
		ceAsistente2.setPaternoAsistente("Ezquivel de los monteros");
		ceAsistente2.setMaternoAsistente("Alvarez de jesusu");
		ceAsistente2.setNombreAsistente("Claudia Diana Areli");
		ceAsistente2.setEdad((short) 23);
		ceAsistente2.setGenero("M");
		ceAsistente2.setcNiveleduc(1);
		ceAsistente2.setNomNiveleduc("MEDIA SUPERIOR");

		asistentes.add(ceAsistente2);

		CLocalidadConafe locConafe = new CLocalidadConafe();

		locConafe.setIdLocalidad(1);
		locConafe.setIdMunicipio(1);
		locConafe.setIdEntidadfed((short) 16);
		locConafe.setNomLocalidad("Apatzingan");
		locConafe.setFchIniVigencia(new Date());

		actaConstitutiva.setApec(apec);
		actaConstitutiva.setReunion(reunion);
		actaConstitutiva.setIntegrantes(integrantes);
		actaConstitutiva.setAsistentes(asistentes);
		actaConstitutiva.setCentrosConafe(coCCT);
		actaConstitutiva.setLocalidad(locConafe);
		actaConstitutiva.setInstructores(instructores);

		reuniones.setActaConstitutiva(actaConstitutiva);

		coll.add(reuniones);

		return coll;

	}
}