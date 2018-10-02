package mx.gob.sep.dgtec.repuce.util;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import mx.gob.sep.dgtec.repuce.model.CeActSesionCstm;

public interface Constants {
	

	public static final String TPO_REGISTRO_CONSTITUCION = "1";
	
	public static final String TPO_REGISTRO_RENOVACION = "2";


	public static String PERIODO_2012_2014 = "2012-2014";

	public static String PERIODO_2013_2015 = "2013-2015";
	
	public static String PERIODO_2014_2016 = "2014-2016";
	
	public static String PERIODO_2015_2017 = "2015-2017";
	
	public static String PERIODO_2016_2018 = "2016-2018";
	
	public static String PERIODO_2017_2019 = "2017-2019"; // Vblake para acta constitutiva 17 nov 17 

//	public static Integer PERIODO_FIN = 2014;
	public static Integer PERIODO_FIN = 2015;

	public static Short INFORME_TRANSPARENCIA = new Short("0");

//	// Inicio del ciclo escolar 18 AGO 2014
//	public static Date FCH_INI_CICLO = new Date(2014,8,18);
//
//	// Fin del ciclo escolar cilco 2014-2015 14 JUL 2015
//	public static Date FCH_FIN_CICLO = new Date(2015,7,14);

	// Inicio del ciclo escolar 1 AGO 2015
	public static Date FCH_INI_CICLO = new Date(2015,8,1);

	// Fin del ciclo escolar cilco 2014-2015 31 JUL 2016
	public static Date FCH_FIN_CICLO = new Date(2016,7,31);

	public static final Short ACTA_CONSTITUTIVA = new Short("1");

	public static final Short PRIMERA_REUNION = new Short("2");

	public static final Short SEGUNDA_REUNION = new Short("3");

	public static final Short TERCERA_REUNION = new Short("4");

	public static Short PRIMERA_ASAMBLEA = new Short("1");
	
	public static Short PRIMERA_ASAMBLEA_OAXACA = new Short("1");
	
	public static Short PRIMERA_SESION = new Short("2");

	public static Short SEGUNDA_SESION = new Short("3");

	public static Short SEGUNDA_ASAMBLEA = new Short("4");

	public static Short TERCERA_SESION = new Short("5");

	public static Short CUARTA_SESION = new Short("6");

	public static Short TERCERA_ASAMBLEA = new Short("7");

	public static final String MODULO_REPUCE = "REPUCE";

	public static final String MODULO_CONAFE = "CONAFE";

	public static final String CVE_DEP_NOR = "CE";

	public static final List<Short> C_SESION_TIPO_REPUCE = (Arrays
			.asList(new Short[] { new Short("1"), new Short("2") }));

	public static final List<Short> C_SESION_TIPO_CONAFE = (Arrays
			.asList(new Short[] { new Short("1"), new Short("3") }));

	// Estatus
	public static final Short ESTATUS_BAJA = 2;
	public static final Short ESTATUS_ACTIVO = 1;

	// Rol ACONAFE: administradores CONAFE
	public static final String[] ADMIN_USERS = { "ENLACE", "OSFAE", "ACONAFE",
			"REPUCE" };

	public static final String OBJECT_LIST = "List";
	public static final String OBJECT_MAP = "Map";
	public static final String OBJECT_STRING = "String";
	public static final String OBJECT_ARRAY = "Array";
	public static final String OBJECT_INTEGER = "Integer";

	public static final String TPO_COMITE_REPUCE = "1";

	public static final String TPO_COMITE_CONAFE = "2";

	public static final Short TPO_PROGRAMA_FEDERAL = new Short("1");

	public static final Short TPO_PROGRAMA_ESTATAL = new Short("2");

	public static final Short TPO_PROGRAMA_LOCAL = new Short("3");

	public static final Short TPO_PROGRAMA_OSC = new Short("4");

	public static final Short TPO_PROGRAMA_CONAFE = new Short("5");

	public static final Short TPO_PROGRAMA_FEDERAL_CONAFE = new Short("6");

	public static final Short TPO_PROGRAMA_MUNICIPAL_CONAFE = new Short("7");

	public static final Short EDO_CE_NO_REGISTRADO = new Short("0");

	public static final Short EDO_CE_PREEXISTENTE = new Short("1");

	public static final Short EDO_CE_DADO_DE_BAJA = new Short("2");

	public static final Short EDO_CE_NUEVO = new Short("3");

	public static final Short EDO_CE_MODIFICADO = new Short("4");

	public static final Short EDO_CE_VENCIDO = new Short("5");

	public static final Short EDO_CE_RENOVADO = new Short("6");

	public static final List<Integer> PADRES_DE_FAMILIA_LIST = (Arrays
			.asList(new Integer[] { new Integer(1), new Integer(4) }));

	// Tipo de Recurso Donación
	public static final Short C_RECURSO_DONACION = new Short("0");

	// Tipo Recurso Rifa
	public static final Short C_RECURSO_RIFA = new Short("1");

	// Tipo Recurso APF
	public static final Short C_RECURSO_APF = new Short("3");

	public Short TPO_DIFERENCIA_POSITIVA_PGR = new Short("0");

	public Short TPO_DIFERENCIA_NEGATIVA_PGR = new Short("1");
	// Tipo apoyo Conafe
	public static final Short C_TIPO_APOYO_CONAFE = new Short("1");
	// Tipo apoyo federales
	public static final Short C_TIPO_APOYO_FEDERAL = new Short("2");
	// Tipo apoyo estatales
	public static final Short C_TIPO_APOYO_ESTATAL = new Short("3");
	// Tipo apoyo necesidad especial
	public static final Short C_TIPO_APOYO_NECESIDAD_ESPECIAL = new Short("4");

	// Tipo accion permanencia en la comunidad
	public static final Short C_TIPO_ACCION_PERMANENCIA = new Short("1");
	// Tipo accion de mantenimiento a espacioes educativos
	public static final Short C_TIPO_ACCION_MANTTO_ESPACIOS = new Short("2");
	// Tipo accion de estrategias
	public static final Short C_TIPO_ACCION_ESTRATEGIAS = new Short("3");
	// Tipo accion de fomento
	public static final Short C_TIPO_ACCION_FOMENTO = new Short("4");
	// Tipo de accion de apoyo a la comunidad
	public static final Short C_TIPO_ACCION_APOYO_COM = new Short("5");
	// Tipo de accion de otro tipo
	public static final Short C_TIPO_ACCION_OTRAS = new Short("6");
	// Tipo de diagnostico de salud
	public static final Short C_DIAG_SALUD = new Short("1");
	// Tipo de diagnostico de produccion
	public static final Short C_DIAG_PRODUCCION = new Short("2");
	// Tipo de diagnostico de inea
	public static final Short C_DIAG_INEA = new Short("3");
	//tipo aopoyo permanencia
	public static final Short C_APOYO_PERMANENCIA = new Short("1");
	// Tipo accion
	public static final Short C_ACCION = new Short("2");

	public static final Integer SECCION_APOYOS_PRIMER_REUNION = new Integer("1");
	public static final Integer SECCION_DIAGNOSTICO_COMUM_PRIMER_REUNION = new Integer("2");
	public static final Integer SECCION_INCLUSION_PRIMER_REUNION = new Integer("5");
	public static final Integer SECCION_PLAN_TRABAJO_PRIMER_REUNION = new Integer("6");
	public static final Integer SECCION_APOYOS_SEGUNDA_REUNION = new Integer("7");
	public static final Integer SECCION_PLAN_TRABAJO_SEGUNDA_REUNION = new Integer("8");
	public static final Integer SECCION_APOYOS_TERCER_REUNION = new Integer("3");
	public static final Integer SECCION_PLAN_TRABAJO_TERCER_REUNION = new Integer("4");
	public static final Integer SECCION_DESERCION_TERCER_REUNION = new Integer("9");
	public static final Integer SECCION_ENCUESTA_SATISFACIION_TERCER_REUNION = new Integer("10");
	public static final Integer SECCION_CONTRALORIA_PRIMER_REUNION = new Integer("13");
	public static final Integer SECCION_NUMERO_ALUMNOS_PRIMER_REUNION = new Integer("14");
	public static final Integer SECCION_CONTRALORIA_SEGUNDA_REUNION = new Integer("15");// Vblake para Adecuacion Segunda Reunion
	public static final Integer SECCION_CONTRALORIA_TERCERA_REUNION = new Integer("16");// Vblake para Adecuacion Tercera Reunion
	public static final Integer SECCION_INFORME_FINAL_TERCERA_REUNION = new Integer("17");
	public static final Integer SECCION_INCLUSION_TERCERA_REUNION = new Integer("12");
	public static final Integer SECCION_PRINCIPALESDN_PRIMERA_REUNION = new Integer("18"); //Vblake Primera Reunion 2017-2018
	public static final Integer SECCION_ACTIVIDADES_UNO_PRIMERA_REUNION = new Integer("19"); //Vblake Primera Reunion 2017-2018
	public static final Integer SECCION_ACTIVIDADES_TRES_PRIMERA_REUNION = new Integer("20"); //Vblake Primera Reunion 2017-2018
	public static final Integer SECCION_ACTIVIDADES_CUATRO_PRIMERA_REUNION = new Integer("21"); //Vblake Primera Reunion 2017-2018
	
	// varibale puesta por MARIO para que compile conafe
	public static final Integer SECCION_INCLUSION_SEGUNDA_REUNION = new Integer("11");

	public CeActSesionCstm C_ACTIVIDAD_SOLICITO_MEJORA = new CeActSesionCstm(
			new Short("22"), "");

	public static String CURP_SIN_VALIDAR 	= "0";
	public static String CURP_VALIDA 		= "1";
	public static String CURP_INVALIDA 		= "2";
	
	public static Integer num1 = new Integer("1");
	public static Integer num2 = new Integer("2");
	public static Integer num3 = new Integer("3");
	//public static String num1 = "1";
	//public static String num2 = "2";
	//public static String num3 = "3";

}
