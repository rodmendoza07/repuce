define([],function(){
	
var statusCe= function(status){
	var stat="";
	switch(status){
		case 0:
			stat="No Registrdo";
		break;
		case 1:
			stat="Constituido";
		break;
		case 2:
			stat="Dado de Baja";
		break;
		case 3:
			stat="Constituido";
		break;
		case 4:
			stat="Constituido";
		break;
		case 5:
			stat="Vencido";
		break;
	}
	return stat;
};

var nomReunionConafe = function (cReunion){
	var nom ="";
	switch(cReunion){
		case 1:
			nom="Acta Constitutiva";
		break;
		case 2:
			nom="Primera Reuni\u00F3n";
		break;
		case 3:
			nom="Segunda Reuni\u00F3n";
		break;
		case 4:
			nom="Tercera Reuni\u00F3n";
		break;
	}
	return nom;
};

var nomSesion = function (cSesion){
	var nom ="";
	switch(cSesion){
		case 1:
			nom="Primera Asamblea";
		break;
		case 2:
			nom="Primera Sesi\u00F3n";
		break;
		case 3:
			nom="Segunda Sesi\u00F3n";
		break;
		case 4:
			nom="Segunda Asamblea";
		break;
		case 5:
			nom="Tercera Sesi\u00F3n";
		break;
		case 6:
			nom="Cuarta Sesi\u00F3n";
		break;
		case 7:
			nom="Tercera Asamblea";
		break;
		case 9:
			nom="Segunda Reuni\u00F3n";
		break;
		case 10:
			nom="Tercera Reuni\u00F3n";
		break;
	}
	return nom;
};

var nomGrado=function (cGrado){
	var turno ="";
	var grado ="";
	switch((cGrado+"").substring(1, 2)){
    case "1":
 	   turno = "T. Matutino";
    break;
    case "2":
 	   turno = "T. Vespertino";
	   break;
    case "3":
 	   turno = "T. Nocturno";
	   break;
    case "4":
 	   turno = "T. Dicontinuo";
	   break;
    }
	switch((cGrado+"").substring(0, 1)){
    case "1":
    	grado = "1ro. ";
    	break;
    case "2":
    	grado = "2do. ";
 	   	break;
    case "3":
     	grado = "3ro. ";
  	   	break;
    case "4":
      	grado = "4to. ";
   	   	break;
    case "5":
      	grado = "5to. ";
   	   	break;
    case "6":
      	grado = "6to. ";
   	   	break;
	}
	return grado+turno;
};

var nomMateria=function (cMateria){
	var materia ="";
	switch(cMateria+""){
    case "1":
 	   materia = "Espa\u00f1ol";
    break;
    case "2":
 	   materia = "Matem\u00e1ticas";
	   break;
    case "3":
 	   materia = "Rotativa";
	   break;
 }
	return materia;
};

var constants={
		CHARACTERS_VALID :"((^[0-9A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]?)|(^[0-9A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]+))([0-9A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]$)",
		NOMBRE_VALID :"((^[A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]?)|(^[A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]+))([A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]$)",
		CURP_VALID : "^([A-Z][A,E,I,O,U,X][A-Z]{2})(\\d{2})((01|03|05|07|08|10|12)(0[1-9]|[12]\\d|3[01])|02(0[1-9]|[12]\\d)|" +
		"(04|06|09|11)(0[1-9]|[12]\\d|30))([M,H])(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|" +
		"SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)([B,C,D,F,G,H,J,K,L,M,N,�,P,Q,R,S,T,V,W,X,Y,Z]{3})([0-9,A-Z][0-9])$",

		INTEXT_VALID : "((^[0-9A-Za-z\\s\\-]?)|(^[0-9A-Za-z\\s\\-]+))([0-9A-Za-z\\s\\-]$)",
		TELEPHONE_VALID : "(^[0-9A-Za-z\s.,\-]+)([0-9A-Za-z\s.,\-]$)",
		CVE_CCT_VALID : "[0-9|a-z|A-Z]{10}",
		LADA_VALID : "[0-9]+",
		NUMBER_VALID : "[0-9]+",
		NUMBER_VALID_NOT_ZERO : "[1-9][0-9]*",
		NUMBER_MONETARY : "^[0-9]{1,5}(\.[0-9]{0,2})?$",
		HORA_VALID : "(^[01]\\d\\:[0-5][0-9]$)|(^[2][0-3]\\:[0-5][0-9]$)",
		MAIL_VALID : "(^[0-9a-zA-Z._-]+([0-9a-zA-Z._-]+)*)@([0-9a-zA-Z]+(?:[._-][0-9a-zA-Z]+)*\\.[0-9a-zA-Z]{2,3})$",
		CP_VALID : "\\d{5}",
		SIZE_CONTRASENA : ".{6,25}",
		NoNUMBER_VALID : "^([^0-9]*)$",
		CICLO_ESCOLAR_VALID: "^\\d{4}\-\\d{4}$",
		DEFAULT_STYLE : "font-family: Arial, Verdana, Helvetica, sans-serif;font-size:0.7em;width:210px;",
		SUSCRIPTOR_STYLE : "font-family: Arial, Verdana, Helvetica, sans-serif;font-size:0.7em;width:450px;",
		SEPOMEX_STYLE : "font-family: Arial, Verdana, Helvetica, sans-serif;font-size:0.9em;width:210px;",
		MASK_IMAGES : [
		                 			["Jpeg File", 	"*.jpg;*.jpeg"],
		                			["GIF File", 	"*.gif"],
		                			["PNG File", 	"*.png"],
		                			["All Images", 	"*.jpg;*.jpeg;*.gif;*.png"]
		                		],
		EXT_FILES : new Array('txt','csv'),
		STATUS_CE:statusCe,
		NOM_SESION:nomSesion,
		NOM_REUNION_CONAFE:nomReunionConafe,
		
		TEXT_BUTTON_GUARDAR: "GUARDAR",
		TEXT_BUTTON_AGREGAR_INTEGRANTE: "Agregar integrante",
		TEXT_BUTTON_EDITAR_INTEGRANTE: "Editar integrante",
		TEXT_BUTTON_ELIMINAR_INTEGRANTE: "Eliminar integrante(s)",
		TEXT_BUTTON_AGREGAR_ASISTENTE: "Agregar asistente",
		TEXT_BUTTON_EDITAR_ASISTENTE: "Editar asistente",
		TEXT_BUTTON_ELIMINAR_ASISTENTE: "Eliminar asistente(s)",
		TEXT_BUTTON_AGREGAR_INSTRUCTOR: "Agregar instructor",
		TEXT_BUTTON_EDITAR_INSTRUCTOR: "Editar instructor",
		TEXT_BUTTON_ELIMINAR_INSTRUCTOR: "Eliminar instructor(s)",
		TEXT_BUTTON_AGREGAR_INSTRUCTOR2014: "Agregar l\u00edder",
		TEXT_BUTTON_EDITAR_INSTRUCTOR2014: "Editar l\u00edder",
		TEXT_BUTTON_ELIMINAR_INSTRUCTOR2014: "Eliminar l\u00edder(es)",
		TEXT_FALTA_INFORMACION: "Falta informaci\u00F3n.",
		TEXT_SOLO_NUMEROS: "Capture s\u00f3lo n\u00fameros.",
		
		TEXT_BUTTON_ACEPTAR: ' Aceptar ',
		
		TEXT_BUTTON_ELIMINAR_ACTA_MUN: "Eliminar acta(s) municipal(es)",

		TEXT_BUTTON_EDITAR_ACTA_MUN: "Editar acta(s) municipal(es)",
		
		//Reuniones CONAFE
		ACTA_CONSTITUTIVA: 1, 
		PRIMERA_REUNION: 2, 
		SEGUNDA_REUNION: 3, 
		TERCERA_REUNION: 4,
		
		//Apoyos
		APOYO_CONAFE:1,
		APOYO_FEDERAL:2,
		APOYO_ESTATAL:3,
		APOYO_NECESIDAD:4,
		PLAN_TRABAJO:5,
		DIAGNOSTICO:6,
		
		//Sesiones y Asambleas
		PRIMERA_ASAMBLEA: 1, 
		PRIMERA_SESION: 2,  
		SEGUNDA_SESION: 3,  
		SEGUNDA_ASAMBLEA: 4,  
		TERCERA_SESION: 5,  
		CUARTA_SESION: 6,  
		TERCERA_ASAMBLEA: 7,  
		MODULO_REPUCE: 'REPUCE',
		MODULO_CONAFE: 'CONAFE',
		CVE_DEP_NOR: 'CE',
			
		FIN_PERIODO_VENCIDOS: '2012',
		PERIODO_2012_2014: '2012-2014',
		PERIODO_2014_2016 : "2014-2016",
		NOM_GRADO:nomGrado,
		NOM_MATERIA:nomMateria,
		
		C_DIAG_SALUD:1,
		C_DIAG_PRODUCCION:2,
		C_DIAG_INEA:3,
		
		PLAN_TRABAJO_APOYO:1,
		PLAN_TRABAJO_ACCION:2,
		
		SECCION_APOYOS:1,
		SECCION_DIAG_COMUNITARIO:2,		
		SECCION_POB_IND:5,
		SECCION_PLAN_TRABAJO:6,
		SECCION_CONTRALORIA_SOCIAL:13,
		SECCION_NUMERO_ALUMNOS:14,
		SECCION_DIFICULTADES_NECESIDADES:18,		// vblake ciclo 1718  
		SECCION_ACTIVIDADES_UNO:19,					// vblake ciclo 1718 
		SECCION_ACTIVIDADES_TRES:20,				// vblake ciclo 1718 
		SECCION_ACTIVIDADES_CUATRO:21,				// vblake ciclo 1718 
		
		SECCION_APOYOS_R2:7,
		SECCION_PLAN_TRABAJO_R2:8,
		SECCION_INCLUSION_SOCIAL_R2:11,
		SECCION_CONTRALORIA_SOCIAL_R2:15,			// Vblake para Segunda Reunion
		SECCION_DIFICULTADES_NECESIDADES_R2:18,		// vblake ciclo 1718 
		SECCION_ACTIVIDADES_UNO_R2:19,				// vblake ciclo 1718 
		SECCION_ACTIVIDADES_TRES_R2:20,				// vblake ciclo 1718
		SECCION_ACTIVIDADES_CUATRO_R2:21,			// vblake ciclo 1718 
		
		SECCION_APOYOS_R3:3,
		SECCION_PLAN_TRABAJO_R3:4,
		SECCION_DIAG_DESERCION:9,
		SECCION_ENCUESTA_SATISFACCION:10,
		SECCION_INCLUSION_SOCIAL_R3:12,
		
		// Vblake para Tercera Reunion
		SECCION_CONTRALORIA_SOCIAL_R3:16,
		SECCION_INFORME_FINAL_R3:17,
};

return constants;
	
	
});