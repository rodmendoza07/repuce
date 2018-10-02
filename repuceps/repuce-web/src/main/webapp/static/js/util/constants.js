/*'&aacute;':'\u00e1',
'&eacute;':'\u00e9',
'&iacute;':'\u00ed',
'&oacute;':'\u00f3',
'&uacute;':'\u00fa',
'&Aacute;':'\u00c1',
'&Eacute;':'\u00c9',
'&Iacute;':'\u00cd',
'&Oacute;':'\u00d3',
'&Uacute;':'\u00da',
'&ntilde;':'\u00f1',
'&Ntilde;':'\u00d1',
'&iquest;':'\u00bf'
'ä':'\u00e4',
'ë':'\u00eb',
'ï':'\u00ef',
'ö':'\u00f6',
'ü':'\u00fc',
'Ä':'\u00c4',
'Ë':'\u00cb',
'Ï':'\u00cf',
'Ö':'\u00d6',
'Ü':'\u00dc',
*/
/**
 * @ autor: Horacio Sanchez B.
 * @ mail: hsb12001@gmail.com
 * @ proyecto: replace_var_project
 * @ descripcion: Constantes JS
 * @ fecha de creacion:Tue Mar 15 14:16:15 CST 2011
 **/
dojo.provide("util.constants");
(function(){  
	var constants= util.constants;  
	constants.DOJO_TYPE = { hidden: 0,  validation: 1, date: 2, filtering: 3, textbox:4, radio: 5, checkbox:6, select:7 };
	constants.CHARACTERS_VALID ="((^[0-9A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]?)|(^[0-9A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]+))([0-9A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]$)";
	constants.NOMBRE_VALID ="((^[A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]?)|(^[A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]+))([A-Za-z\\s\u00f1\u00d1.,\\-_\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00e4\u00eb\u00ef\u00f6\u00fc\u00c4\u00cb\u00cf\u00d6\u00dc]$)";
	constants.CURP_VALID = "^[a-zA-Z]{4}\\d{6}[a-zA-Z]{6}\\d{2}$";
	constants.INTEXT_VALID = "((^[0-9A-Za-z\\s\\-]?)|(^[0-9A-Za-z\\s\\-]+))([0-9A-Za-z\\s\\-]$)";
	constants.TELEPHONE_VALID = "(^[0-9A-Za-z\s.,\-]+)([0-9A-Za-z\s.,\-]$)";
	constants.CVE_CCT_VALID = "[0-9|a-z|A-Z]{10}";
	constants.LADA_VALID = "[0-9]+";
	constants.NUMBER_VALID = "[0-9]+";
	constants.HORA_VALID = "(^[01]\\d\\:[0-5][0-9]$)|(^[2][0-3]\\:[0-5][0-9]$)";
	constants.MAIL_VALID = "(^[0-9a-zA-Z]+(?:[._][0-9a-zA-Z]+)*)@([0-9a-zA-Z]+(?:[._-][0-9a-zA-Z]+)*\\.[0-9a-zA-Z]{2,3})$";
	constants.CP_VALID = "\\d{5}";
	constants.SIZE_CONTRASENA = "\\d{6}";
	constants.DEFAULT_STYLE = "font-family: Arial, Verdana, Helvetica, sans-serif;font-size:0.7em;width:210px;";
	constants.SUSCRIPTOR_STYLE = "font-family: Arial, Verdana, Helvetica, sans-serif;font-size:0.7em;width:450px;";
	constants.SEPOMEX_STYLE = "font-family: Arial, Verdana, Helvetica, sans-serif;font-size:0.9em;width:210px;";
	constants.MASK_IMAGES = [
	                 			["Jpeg File", 	"*.jpg;*.jpeg"],
	                			["GIF File", 	"*.gif"],
	                			["PNG File", 	"*.png"],
	                			["All Images", 	"*.jpg;*.jpeg;*.gif;*.png"]
	                		];
	constants.EXT_FILES = new Array('txt','csv');
})
();


//var CURP_VALID = "^[a-zA-Z]{4}((\\d{2}((0[13578]|1[02])(0[1-9]|[12]\\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\\d|30)|02(0[1-9]|1\\d|2[0-8])))|([02468][048]|[13579][26])0229)(H|M)(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|SM|NE)([a-zA-Z]{3})([a-zA-Z0-9\\s]{1})\\d{1}$+";