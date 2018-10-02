define([], 
function(){
		var URL = "http://search.sep.gob.mx/solr/conafeCore/select";
//		var URL = "http://10.75.11.80:8083/solr/conafeCore/select";
//		var URL = "http://localhost:8083/solr/conafeCore/select";
		
		var STATS_OPCIONES =new Array(
				//	{label:'Apoyos gestionados',value:'apoyosGestionados',selected:false},
				//	{label:'Apoyos asignados',value:'apoyosAsignados',selected:false},
					{label:'Integrantes',value:'numIntegrantes',selected:false},
					{label:'Hombres',value:'numHombres',selected:false},
					{label:'Mujeres',value:'numMujeres',selected:false}
					);
			
			var C_OPCIONES=new Array(
					
					{opcion:'tieneActaConstitutiva',label:'Tiene Acta Constitutiva',	status:"ActivoA",	tpo:'Avance'},
					{opcion:'tienePrimeraReunion',	label:'Tiene Primera Reuni\u00f3n',	status:"ActivoA",	tpo:'Avance'},
					{opcion:'tieneSegundaReunion',	label:'Tiene Segunda Reuni\u00f3n',	status:"ActivoA",	tpo:'Avance'},
					{opcion:'tieneTerceraReunion',	label:'Tiene Tercera Reuni\u00f3n',	status:"ActivoA",	tpo:'Avance'},
					{opcion:'tpoRegistro',			label:'Tipo de registro APEC',		status:"ActivoA",	tpo:'Avance'},

					
					{opcion:'numHombres',			label:'N\u00FAmero de hombres',		status:"ActivoI",	tpo:'Integracion'},
					{opcion:'numMujeres',			label:'N\u00FAmero de mujeres',		status:"ActivoI",	tpo:'Integracion'},
					{opcion:'numIntegrantes',		label:'N\u00FAmero de integrantes',	status:"ActivoI",	tpo:'Integracion'},
					{opcion:'edadInstructores',		label:'Edad instructores',			status:"ActivoI",	tpo:'Integracion'},

					
					//{opcion:'programasEscolares',	label:'Programas escolares',																	status:"ActivoT",	tpo:'Educacion'},
					{opcion:'apoyo1',	label:'Beca "Acercate a tu Escuela"',																		status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo2',	label:'Apoyo FORTALECE',																					status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo3',	label:'Paquetes de \u00fatiles escolares',																	status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo4',	label:'Paquetes de materiales did\u00e1cticos',																status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo5',	label:'Paquetes auxiliares did\u00e1cticos',																status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo6',	label:'Rehabilitaci\u00f3n de espacios educativos',															status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo7',	label:'Construcci\u00f3n de espacios educativos',															status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo8',	label:'Biblioteca comunitaria',																				status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo9',	label:'Mobiliario escolar',																					status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo10',	label:'Asesor\u00eda Pedag\u00f3gica itinerante',															status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo11',	label:'Caravanas culturales',																				status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo13',	label:'Otro apoyo',																							status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo14',	label:'PAL de 0 a 5 a\u00f1os',																				status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo15',	label:'PAL de 6 a 9 a\u00f1os',																				status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo18',	label:'Desayunos DIF Fr\u00edos de 0 a 5 a\u00f1os',														status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo19',	label:'Desayunos DIF Fr\u00edos de 6 a 12 a\u00f1os',														status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo20',	label:'Desayunos DIF calientes de 0 a 5 a\u00f1os',															status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo21',	label:'Desayunos DIF calientes de 6 a 12 a\u00f1os',														status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo16',	label:'Prospera Becas a estudiantes',																		status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo17',	label:'Prospera Pl\u00e1ticas de promoci\u00f3n de la salud',												status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo100',	label:'Escuelas de Calidad',																				status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo22',	label:'Otro programa parte de CNCH',																		status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo101',	label:'Campa\u00f1a Nacional de Alfabetizaci\u00f3n y reducci\u00f3n de rezago educativo ',					status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo23',	label:'Mejorar condiciones de aulas',																		status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo24',	label:'Apoyos para la construcci\u00f3n del aula comunitaria',												status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo26',	label:'Otro apoyo estatal o municipal',																		status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo27',	label:'Ni\u00f1os con necesidades educativas especiales',													status:"ActivoT1",	tpo:'Apoyo'},
					{opcion:'apoyo28',	label:'Ni\u00f1os sin necesidades educativas especiales',													status:"ActivoT1",	tpo:'Apoyo'},
					
					{opcion:'dc1',		label:'Problemas de Salud Gastrointestinales',																status:"ActivoT2",	tpo:'Diagnostico'},
					{opcion:'dc2',		label:'Problemas de Salud Respiratorios',																	status:"ActivoT2",	tpo:'Diagnostico'},
					{opcion:'dc3',		label:'Problemas de Salud Otros',																			status:"ActivoT2",	tpo:'Diagnostico'},
					{opcion:'dc4',		label:'Centro de Salud de la comunidad',																	status:"ActivoT2",	tpo:'Diagnostico'},
					{opcion:'dc5',		label:'Centro de salud en la cabecera municipal',															status:"ActivoT2",	tpo:'Diagnostico'},
					{opcion:'dc6',		label:'Curandera de la comunidad',																			status:"ActivoT2",	tpo:'Diagnostico'},
					{opcion:'dc7',		label:'Huerto escolar',																						status:"ActivoT2",	tpo:'Diagnostico'},
					{opcion:'dc9',		label:'INEA Mayores de 15 a\u00f1os no leer/escribir',														status:"ActivoT2",	tpo:'Diagnostico'},
					{opcion:'dc10',		label:'INEA Interesados en ser alfabetizados mayores de 15 a\u00f1os',										status:"ActivoT2",	tpo:'Diagnostico'},
					
					{opcion:'b1',		label:'Violencia f\u00edsica y verbal',																		status:"ActivoT3",	tpo:'Bullying'},
					{opcion:'b2',		label:'Uso de armas',																						status:"ActivoT3",	tpo:'Bullying'},
					{opcion:'b3',		label:'Violencia sexual',																					status:"ActivoT3",	tpo:'Bullying'},
					{opcion:'b4',		label:'Violencia psicol\u00f3gica',																			status:"ActivoT3",	tpo:'Bullying'},
					{opcion:'b5',		label:'Ciberacoso',																							status:"ActivoT3",	tpo:'Bullying'},
					{opcion:'b6',		label:'Social',																								status:"ActivoT3",	tpo:'Bullying'},
					
					{opcion:'pi1',		label:'Ni\u00f1os ind\u00edgenas que hablan solo su lengua materna',										status:"ActivoT4",	tpo:'Poblacion'},
					{opcion:'pi2',		label:'Ni\u00f1os ind\u00edgenas biling\xFCes',																status:"ActivoT4",	tpo:'Poblacion'},
					{opcion:'pi3',		label:'Ni\u00f1os que hablan solo su lengua materna y no asisten',											status:"ActivoT4",	tpo:'Poblacion'},
					
					{opcion:'fe1',		label:'Acuerdos para garantizar alimentaci\u00f3n y hospedaje',												status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe2',		label:'Identificaci\u00f3n de zonas de riesgo evacuaci\u00f3n y zonas seguras en espacios escolares',		status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe3',		label:'Traslado y acompa\u00f1amiento para LEC',															status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe4',		label:'Informaci\u00f3n familiar y antecedentes m\u00e9dicos de los LEC',									status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe5',		label:'Limpieza de instalaciones',																			status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe6',		label:'Mobiliario escolar',																					status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe7',		label:'Avances educativos',																					status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe8',		label:'Actividades de ense\u00f1anza',																		status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe9',		label:'Clases de reforzamiento',																			status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe10',		label:'Fomento a la lectura',																				status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe11',		label:'Celebraci\u00f3n de fecha c\u00edvica',																status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe100',	label:'Eventos deportivos',																					status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe12',		label:'Comisiones para recoger materiales did\u00e1cticos',													status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe13',		label:'Pl\u00e1ticas de prevenci\u00f3n',																	status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe14',		label:'Informaci\u00f3n sobre tipos de discapacidad',														status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe15',		label:'Programas de eventos relacionados con derechos humanos y prevenci\u00f3n de violencia',				status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe16',		label:'Jornada de cuidado del medio ambiente',																status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe17',		label:'Actividades culturales en comunidad',																status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe18',		label:'Brigadas de Salud',																					status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe101',	label:'Brigadas de Higiene',																				status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe102',	label:'Brigadas de Cuidado personal',																		status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe19',		label:'Pl\u00e1ticas de nutrici\u00f3n',																	status:"ActivoT",	tpo:'Educacion'},
					{opcion:'fe20',		label:'Otros programas de apoyo comunitario',																status:"ActivoT",	tpo:'Educacion'},
					
					
					{opcion:'entidad',				label:'Entidad',					status:"ActivoG",	tpo:'Geo'}
					//{opcion:'municipio',			label:'Municipio',					status:"ActivoG",	tpo:'Geo'},
					//{opcion:'localidad',			label:'Localidad',					status:"ActivoG",	tpo:'Geo'},
					
					
					//{opcion:'apoyosGestionados',	label:'Apoyos gestionados',			status:'ActivoC',	tpo:'Comite'},
					//{opcion:'apoyosAsignados',		label:'Apoyos asignados',			status:'ActivoC',	tpo:'Comite'}
			);

			var C_STATUS=new Array(
					"ActivoA",
					"ActivoT",
					"ActivoT1",
					"ActivoT2",
					"ActivoT3",
					"ActivoT4",
					"ActivoG",
					"ActivoI"
				//	"ActivoC"
					);
					
			var C_COLOR= new Array('#FFEE45','#BCBF03','#16364F','#00A4D4','#D8D2FF','#003e3c','#0bb993',
									  '#91d89f','#ffe6a9','#d61620','#540548','#693366','#825781','#93a34b',
									  '#91bd00','#433547','#6d868a','#dec699','#dba539','#9c3834');

	   return{
		   STATS_OPCIONES:STATS_OPCIONES,
		   C_OPCIONES:C_OPCIONES,
		   C_STATUS:C_STATUS,
		   C_COLOR:C_COLOR,
		   URL:URL
	   };
	   
	});
