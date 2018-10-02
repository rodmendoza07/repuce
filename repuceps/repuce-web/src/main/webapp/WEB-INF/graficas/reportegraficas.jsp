<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">	
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Gr&aacute;ficas de Avance</title>
<script src='<c:url value="/static/js/util/jquery-1.8.0.min.js"/>' type="text/javascript" charset="UTF-8"></script>		
<script src='<c:url value="/static/js/util/jquery.cookie.min.js"/>'type="text/javascript" charset="UTF-8"></script>		
<script src='<c:url value="/static/js/util/jquery.accordion.js" />'type="text/javascript" charset="UTF-8"></script>
<script src='<c:url value="/static/js/util/jquery.pivot.js"/>' type="text/javascript" charset="UTF-8"></script>
<script src='<c:url value="/static/js/util/jquery.tinycarousel.min.js"/>' type="text/javascript" charset="UTF-8"></script>
<script src='<c:url value="/static/js/Charts/FusionCharts.js"/>' type="text/javascript" charset="UTF-8"></script>

<style>
		@import url('<c:url value="/static/js/libs/dojo/resources/dojo.css"/>');
		@import url('<c:url value="/static/js/libs/dojo/resources/dnd.css"/>');
		@import url('<c:url value="/static/js/libs/dojox/form/resources/CheckedMultiSelect.css"/>');
		@import url('<c:url value="/static/js/libs/dijit/themes/tundra/tundra.css"/>');
		@import url('<c:url value="/static/css/stylsheet.css"/>');
		@import url('<c:url value="/static/css/demo.css" />');
  		@import url('<c:url value="/static/css/container.css" />');
        
</style>

<script>
	var getGraficaSimple = '';

	dojoConfig= {
			has: {
	            "dojo-firebug": true,
	            "dojo-debug-messages": true
	        },  				
  	        app: {
  	        	urlBase: '<c:url value="/mvc/"/>',
  	        	urlStatic: '<c:url value="/static/"/>'
  	        	},
  	        packages:[{
  	        	name: 'app',
  	        	location: '<c:url value="/static/"/>js/app'
  	        },{
  	        	name: 'content',
  	        	location: '<c:url value="/mvc"/>'
  	        },{
  	        	name: 'static',
  	        	location: '<c:url value="/static"/>'
  	        }],
  	      	parseOnLoad: false,
  	        async: true,
  	      	debugAtAllCosts: true,
  	      	ioPublish: true,
  	      	cacheBust: true
  	    };  		
	
</script>  
<script src='<c:url value="/static/js/libs/dojo/dojo.js"/>'></script>

<script>
require(["dojo/ready","app/util/reportesPublicConstant", "dijit/form/Button", "dojo/dom","dojo/dom-class", "dojo/dnd/Source",
         "dojox/form/CheckedMultiSelect","dijit/layout/TabContainer","dijit/layout/ContentPane",
         "dijit/TitlePane","dijit/registry","app/util/jsUtils","dojo/_base/json","dojo/_base/array",
         "dojo/store/Memory", "dijit/form/FilteringSelect","dojo/dom-construct","dojo/DeferredList", 
         "dojo/_base/Deferred","dojox/json/query","dijit/Dialog","dijit/form/CheckBox","dojo/io/iframe","dojo/_base/xhr", "dojo/on",
         "dojo/domReady!"], 
 function( ready,reportesPublicConstant,Button, dom, domClass, Source,CheckedMultiSelect,
 		TabContainer,ContentPane,TitlePane,registry,jsUtils,json,array,
 		Memory,FilteringSelect,domConstruct,DeferredList,Deferred,query,
 		Dialog,CheckBox,ioframe,xhr,on){
 	
	
 	var url = reportesPublicConstant.URL;
 	var colorArray= reportesPublicConstant.C_COLOR;
 	var idConsecutivo=0;
 	
 	ready(function(){
	 	on( dom.byId('grafica1'),'click', function(){
	 		
	 		var categorias = "conConsejo,nivel,entidad";
	 		var cat = ['conConsejo','nivel', 'entidad'];
	 		var col = ['Con Consejo','Nivel', 'Entidad'];
	 		var max = true; 
	 		getGraficaSimple(categorias,cat,col,max);
		});

	 	on( dom.byId('grafica2'),'click', function(){
	 		
	 		var categorias = "conConsejo,sostenimiento,entidad";
	 		var cat = ['conConsejo','sostenimiento', 'entidad'];
	 		var col = ['Con Consejo','Sostenimiento', 'Entidad'];
	 		var max = true; 
	 		getGraficaSimple(categorias,cat,col,max);
		});

	 	on( dom.byId('grafica3'),'click', function(){
	 		
	 		
	 		var cat = ["comite1","comite2","comite3","comite4","comite5","comite6","comite7","comite8","comite9","comite10","comite11","comite12","comite14"];
	 		var col = ["Fomento de actividades relacionadas con la mejora del logro educativo y la promoción de la lectura.","Mejoramiento de la infraestructura educativa. ","De protección civil y de seguridad de las escuelas.","De impulso a la activación física.","De actividades recreativas, artísticas o culturales.","De desaliento de las prácticas que generen violencia y el consumo de sustancias nocivas para la salud.","De establecimiento de consumo escolar.","De cuidado al medio ambiente y limpieza del entorno escolar.","De alimentación saludable.","De inclusión educativa.","De contraloría Social","De nuevas tecnologías.","Otro"]; 
	 		var caption='Avance en la instalación de comités';
	 		var xAxisName='Comités';
	 		var yAxisName='Número de escuelas';

	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 2);
		});
	 	
	 	on( dom.byId('grafica4'),'click', function(){
	 		
	 		var cat = ["tienePrimeraAsamblea","tienePrimeraSesion","tieneSegundaSesion","tieneSegundaAsamblea"];
	 		var col = ["Primera Asamblea","Primera Sesión","Segunda Sesión","Segunda Asamblea"];
	 		var caption='Avance en el registro de sesiones y asambleas';
	 		var xAxisName='Sesiones y asambleas';
	 		var yAxisName='Número de escuelas';
	 	
	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 1);
		});


	 	
		on( dom.byId('grafica6'),'click', function(){
	 		
	 		var cat = ['consejDirector', 'consejPadre', 'consejRepAPF', 'consejMaestro', 'consejComunidad', 'consejSindicato', 'consejExalumno'];
	 		var col = ['Director','Padre de Familia','Representante de la Asociación de Padres de Familia', 'Maestro', 'Miembro de la comunidad', 'Representante de Asociación Sindical', 'Exalumno'];
	 		var caption='Calidad de los Integrantes del Consejo Escolar';
	 		var xAxisName='Calidad de los Integrantes';
	 		var yAxisName='Número de escuelas';
	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 3);
	 			 		
		});
		
       on( dom.byId('grafica7'),'click', function(){
	 		
		    var categorias = "conConsejo,ambito,entidad";
			var cat = ['conConsejo','ambito', 'entidad'];
			var col = ['Con Consejo','Ambito', 'Entidad'];
			var max = true; 
			getGraficaSimple(categorias,cat,col,max);
	 			 		
		});
       
       on( dom.byId('grafica8'),'click', function(){
	 		
		    var categorias = "conConsejo,zonaGeografica,entidad";
			var cat = ['conConsejo','zonaGeografica','entidad'];
			var col = ['Con Consejo','Zona Geográfica','Entidad'];
			var max = true; 
			getGraficaSimple(categorias,cat,col,max);
	 			 		
		});
       
       on( dom.byId('grafica9'),'click', function(){
	 		
		    var cat = ['normalidad1','normalidad2','normalidad3','normalidad4','normalidad5','normalidad6','normalidad7','normalidad8'];
			var col = ['Nuestra escuela brinda el servicio educativo durante todos los días establecidos en el calendario escolar.','Todos los grupos tienen maestros todos los días del ciclo escolar.','Todos los maestros inician puntualmente sus actividades.','Todos los alumnos asisten puntualmente a todas las clases.','Todos los materiales están a disposición de cada estudiante y se usan sistemáticamente.','Todo el tiempo escolar se ocupa fundamentalmente en actividades de aprendizaje.','Las actividades en las aulas logran que todos los alumnos participen activamente en el trabajo de la clase.','Todos los alumnos consolidan su dominio de la lectura, la escritura y las matemáticas de acuerdo con su grado educativo.'];
			var caption='Registro de Normalidad Minima';
	 		var xAxisName='Normalidad ';
	 		var yAxisName='Número de escuelas';
	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 3);
	 			 		
		});
       
       
	 	on( dom.byId('grafica5'),'click', function(){
		
		var cat = ['programa1','programa2','programa3','programa4','programa5','programa6','programa7','programa81'];
		var col = ['Escuela de Tiempo Completo. ','Programa de la Reforma Educativa.','Programa Nacional de Convivencia Escolar ','Programa Nacional de Becas','Programa de Fortalecimiento de la Calidad Educativa','Programa para la Inclusión y la Equidad Educativa','Programa Nacional de Inglés','Otro'];
		var caption='Registro de Programas Federales';
		var xAxisName='Programa Federal';
		var yAxisName='Número de escuelas';
		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 3);
		
		
	});
	 	
	 	
       on( dom.byId('grafica10'),'click', function(){
	 		
    	    var cat = ['ruta1','ruta2','ruta3','ruta4','ruta5','ruta6','ruta7','ruta8','ruta9','ruta10'];
	 		var col = ['De fomento y motivación a la participación social','De opinión y propuestas sobre asuntos pedagógicos','De promoción y vigilancia de la educación inclusiva','De atención a necesidades de infraestructura','De reconocimiento social a alumnos, maestros, directivos y empleados escolares, así como a padres de familia','De desarrollo social, cultural y deportivo','De fortalecimiento a la organización y la autonomía de la gestión escolar;','De acompañamiento a las acciones que favorezcan el funcionamiento de la escuela, su ruta de mejora y a la atención de la normalidad mínima escolar','De fortalecimiento de la cultura de la transparencia y la rendición de cuentas','Otra ruta'];
	 		var caption='Rutas de Mejora registradas';
	 		var xAxisName='Ruta de Mejora';
	 		var yAxisName='Número de escuelas';
	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 3);
	 			 		
		});
       
       new Button({
           label: "Regresar",
           onClick: function(){
           	window.location.href='<c:url value="/login.jsp"/>';
           }
       }, "regresar");
	 
		
 	});

 	/**********************************************************************
 	* Función para obtener el número de elementos para cada categoria.
 	***********************************************************************/
 	/**
 	* cat Arreglo de los nombres de las categorias a consultar
 	* col Arreglo de los nombres visibles de las categorías a consultar
 	*/
 	
 	function getGraficaCategoriasIndep(cat,col,caption, xAxisName, yAxisName, band) {
 		
 		var busquedas= new Array();
 		var i = 0;
 		var jsonLkdChart = {chart:{caption:caption, xAxisName:xAxisName, yAxisName:yAxisName, formatNumberScale: "0"}, data:[], linkeddata:[]};
 		var dataTemp=[];
 		var nomGrafica='';
 		 		
 		for(var j in cat){
 			busquedas.push(new Deferred()); 
 		}
 		console.log('busqueda ----:'+ busquedas.length); 
 		for(var j in cat){
 			
 					
	 		jsUtils.JSONP.call(url, {  
	 			callback: function(data){
	 				busquedas[i++].resolve(data);
	 			},  
	 			callbackParamName: "jsoncallback",  
	 			params: {  
	 				'q': cat[j] +  ":SI*",  
	 				'wt':"json",
	 				'facet': "on",  
	 				'facet.mincount':0,
	 				'json.wrf':"JSONP.process",
	 				'facet.field':'entidad',
	 				'rows':"0"
	 			}  
	 		});
	
	 	}

 		var defs = new DeferredList(busquedas);
 	
 		defs.then(function(data){
 			 			
 			console.log('data:'+ json.toJson(data));
 	 		
 			for(var j in cat){
 	 			
	 			var tipoSesion=  data[j][1]["responseHeader"]["params"]["q"];
	 			var sesion=tipoSesion.split(":");
	 			var nomTitulo='';
	 			
	 			
	 			//Se asegura el orden correcto de la información
	 			for(var i in cat){
	 				if(sesion[0]==cat[i]){
	 					nomTitulo=col[i];
	 				}
	 			}
	 			//jsonLkdChart.data.push({label:nomSesion,value:data[j][1]["response"]["numFound"], link:'newchart-json-id' + j});
	 			dataTemp.push({label:nomTitulo,value:data[j][1]["response"]["numFound"], link:'newchart-json-id' + j});
	 		
 	 			var entidades = data[j][1]["facet_counts"]["facet_fields"]["entidad"];	
 	 			var linkData = {id:'id'+j, linkedchart:{chart:{caption:'',xAxisName:'Entidades Federativas',
 	 					yAxisName:'Número de Escuelas', formatNumberScale: "0"}, data:[]}};

 	 			for(var k=0; k<entidades.length; k++){

 	 				linkData.linkedchart.data.push({label:entidades[k++] , 
 	 												value: entidades[k]});
 	 				if(band==1){
 	 					linkData.linkedchart.chart.caption='Avance en el registro de '+ nomTitulo + ' por Entidad Federativa';
 	 					nomGrafica='grafAvanceRegistro';
 	 				}
 	 				if(band==2){
 	 					linkData.linkedchart.chart.caption='Avance en la instalación del comité de '+ nomTitulo + '\n por Entidad Federativa';
 	 					nomGrafica='grafAvanceInstalacion';
 	 				}
 	 				if(band==3){
 	 					linkData.linkedchart.chart.caption= xAxisName + ': ' + nomTitulo + '\n por Entidad Federativa';
 	 				}
 	 			}
 	 			jsonLkdChart.linkeddata.push(linkData);
 	 		}
 	 		//console.log('jsonLkdChart: ' + json.toJson(jsonLkdChart) + 'dataTemp: '+ json.toJson(dataTemp));
 	 		
 	 		for(var m=0; m<col.length; m++){
 	 			for(var n=0; n<dataTemp.length; n++){
	 	 			if(col[m]==dataTemp[n].label){
	 	 				
	 	 				jsonLkdChart.data.push({label: dataTemp[n].label, value:dataTemp[n].value , link:dataTemp[n].link});
	 	 				
	 	 			}
 	 			}
 	 		}
 	 		
 	 		grafica(jsonLkdChart,true, 'Column3D.swf', nomGrafica);
 			
 		});
		
 	}
 	
 	/*************************************************************************************
 	*Función para crear la gráfica.
 	**************************************************************************************/
 	function grafica( data, max, tipoGraf, nomGraf){
 		   
			if(!max){	
				jsUtils.destroyDivs(['ChartId']);
 			}
			
			maximizar();
			
 			var myChart2 = FusionCharts.render({
 				id: nomGraf+idConsecutivo,
 		        swfUrl : dojo.config.app.urlStatic+'/js/Charts/'+ tipoGraf,
 		        width: "1220",
 		        height: '600',
 		        insertMode: 'replace',
 		        renderAt : "mxGrDlg",
 		        dataSource : data,
 		    //    palettecolors: "#008ee4,#6baa01,#f8bd19,#e44a00,#33bdda",
 		        dataFormat : "json"
 		      
 		    });
 			
 			FusionCharts(nomGraf+idConsecutivo).configureLink (
 					  {
 					    overlayButton:
 					    {    
 					      message: 'Regresar',
 					    }
 					  }, 0 );
 			idConsecutivo++;
 	}
 	
 	
 	/*************************************************************************************
 	*
 	**************************************************************************************/
function getGraficaSimple(categorias,cat,col,max) {

 		var pivotCat=categorias;
 		var categoryNames=[];
 	
 		var jsonLkdChart = {chart:{caption:'Cobertura de consejos escolares por '+ col[1],
									xAxisName:col[1], 
									yAxisName:'Número de escuelas',
									formatNumberScale: "0",
								  },
							categories:[], 
							dataset:[],
							linkeddata: []
							};
 
 		var busqueda= new Deferred();
 		jsUtils.JSONP.call(url, { 
 			callback: function(data){ 
 				busqueda.resolve(data);
 			},
 			callbackParamName: "jsoncallback",
 			params: { 
 				"q": "*:*",
 				"facet":"on",
 				"facet.pivot":pivotCat,
 				"wt":"json",
 				"json.wrf":"JSONP.process",
 				"rows":"0",
 				"facet.sort":categorias,
 				"facet.mincount": 0
 			}  
 		
 		});  

 		busqueda.then(function(data){
 			
 		    //console.log('data:'+ json.toJson(data));
 		    
 		    //Calcula el número de categorías que existen
 			var tamData=0;
 			var x=0;
 			var categories = data["facet_counts"]["facet_pivot"][categorias];
 			
 			if(categories[0]["pivot"].length > categories[1]["pivot"].length){
 				tamData=categories[0]["pivot"].length;
 				x=0;
 			}
 			else{
 				tamData=categories[1]["pivot"].length;
 				x=1;
 			}
 			
 			//Carga en el modelo de la gráfica el nombre de las categorías
			for(var i=0; i<tamData; i++){
				var nomNivel=categories[x]["pivot"][i]["value"];
				categoryNames.push({label:nomNivel});
			}
			console.log('categoryNames: ' + json.toJson(categoryNames));

 			jsonLkdChart.categories.push({category: categoryNames});
	
 			//Indice de la categoría
 			var catIdx = 0;
 			
 			//Carga los datos de las series de cada categoría
 			for(var j=0; j<categories.length; j++){
 				
 				//Crea la estructura de la gráfica anidada
 				jsonLkdChart.dataset.push({seriesname: categories[j]["value"] + ' tiene Consejo',
 							  data:[]});
 				catIdx = 0;
 				
 				for(var k=0; k<categories[j]["pivot"].length; catIdx++){
 					

 	 				var subcategory = categories[j]["pivot"][k];

 	 				//console.log('categoryNames[catIdx].label: ' + categoryNames[catIdx].label);
 	 				//console.log('subcategory[k]["value"]: ' + subcategory["value"]);
 	 				
 	 				if(categoryNames[catIdx].label != subcategory["value"]){
 	 					jsonLkdChart.dataset[j].data.push({value: 0,
							link: ''});
 	 				}
 	 				else{
 	 					jsonLkdChart.dataset[j].data.push({value: subcategory["count"],
								link: "newchart-json-"+ categories[j]["value"] +
								subcategory["value"]});
 	 					k++;
 	 				}
 				
 					//console.log('Cat: ' + subcategory["value"] + '(' + subcategory["count"] + ')');

 					var jsonLkdData = { id:'',
			 							chart:{caption:'Entidades Federativas', 
			 		
												xAxisName:'Entidades', 
												yAxisName:'Porcentaje', 
												formatNumberScale: "0",
												plotSpacePercent:"10",
												decimals: 2,
												numberSuffix: '%',
											    categories:[], 
											    palettecolors:"#DF7178",
												dataset:[]
			 								  }
										};
 				
 					var categoryLkd=[];
 			 		var dataLkd=[];
 			 		
 					jsonLkdData.id=categories[j]["value"] + subcategory["value"];
 					
 					jsonLkdData.chart.caption='Cobertura de consejos escolares por '+ col[1] + ': ' + subcategory["value"];
 					
 					var tamDataLkd=subcategory["pivot"];
 					
					var nivel = subcategory["value"];
 					var total = 0;

 					var result = jsUtils.jsonPath(data, '$.facet_counts.facet_pivot.'
 							+categorias+'[*].pivot[?(@.value=="'+nivel+'")].pivot[*]');

 					//console.log('El resultado: ' + json.toJson(result));

 					//Valores del número total de escuelas con y sin consejo por entidad
 					var totales = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
 					var idx = -1;
 					
 					dojo.forEach(result, function(entry){
 						idx = reportesPublicConstant.IDX_ENTIDAD(entry.value);
 	 					//console.log('la entidad: ' + json.toJson(entry.value));
 	 					//console.log('el indice: ' + idx);
 						
 						if(idx != -1)
 							totales[idx] += entry.count;
 					 }); 

 					//console.log('los totales: ' + json.toJson(totales));
 					
 					
 					for(var n=0; n<tamDataLkd.length;n++){
 						idx = reportesPublicConstant.IDX_ENTIDAD(tamDataLkd[n]["value"]);
 						var pct = 0;
 						//console.log('Numerador: ' + tamDataLkd[n]["count"]);
 						//console.log('Denominador: ' + totales[idx]);
 						
 						if(idx != -1 && totales[idx]!=0)
 							pct = tamDataLkd[n]["count"]*100/totales[idx];
 						else 
 							pct = 0;
 						
						categoryLkd.push({label: tamDataLkd[n]["value"]});
						dataLkd.push({value: pct});
 						      
 					}
 					
 					jsonLkdData.chart.categories.push({category:categoryLkd});
 					jsonLkdData.chart.dataset.push({seriesname: subcategory["value"] + ' ' + categories[j]["value"]  
 							+' tiene Consejo', data: dataLkd});
 					jsonLkdChart.linkeddata.push(jsonLkdData);
 					
 					
 				} 
 			}
 			
 			//console.log('jsonLkdChart: '+ json.toJson(jsonLkdChart));
 			
 			grafica(jsonLkdChart,true, 'MSColumn3D.swf', 'grafDependiente');
 			
 		});

 	}
 	
 	/*
 	* función que guarda el orden en el que aparecen 
 	*/
 	function _setEntOrder(){
 		
 		
 	}
 
	/*************************************************************************************
 	*Función para crear la ventana donde se mostrará la gráfica.
 	**************************************************************************************/
 	var maximizar = function(){
 		var mxGr=new Dialog({id:'mxGr',content :'<div id="mxGrDlg"/>'});
 		mxGr.show();
 		mxGr.on('hide',function(){
 			registry.byId('mxGr').destroyRecursive(false);

 		});
 		
 		mxGr._setStyleAttr('left:20px !important;'); 
 		mxGr._setStyleAttr('top:20px !important;');
 	};

 	
 });
		
	</script>
</head>

<body class='tundra'>
<div id='toggleTp'>
<div style="text-align:center; margin:auto;"><img src='<c:url value="/static/img/banner.jpg"/>' width="918" height="74" alt="banner logotipo CONAPASE" /></div>
		
	<table align="center" style="width: 45%;">
	    <tr>
	        <td style="width: 50%;"><br>
	        	<h3 style="text-align: left;"><a href="../../mvc/documentos/reporteMvtosNal" id="reporteMovNacional" target="_blank"><font color="black">Reporte de movimientos nacional </font></a></h3>
	        </td>
		</tr>
		
<!-- 		<tr> -->
<!-- 	        <td style="width: 50%;"><br> -->
<!-- 	        	<h3 style="text-align: left;"><a href="../../mvc/documentos/reporteMvtosNal2" id="reporteMovNacional2" target="_blank"><font color="black">Reporte de movimientos nacional 2</font></a></h3> -->
<!-- 	        </td> -->
<!-- 		</tr> -->

	    <tr>
	        <td style="width: 50%;  align: center;"><br>
	        	<h3 style="text-align: left;"><font color="black">Gráficas de avance</font></h3>
	        <br></td>
		</tr>
		<tr>
	        <td style="width: 50%;"><br>
	        	&Phi; <a href="#" id="grafica1"><font color="black">Instalación por nivel educativo </font></a>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica2"><font color="black">Instalación por sostenimiento</font></a>
	        <br/><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica3"><font color="black">Instalación de comités</font></a>
	        	
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica4"><font color="black">Avance de sesiones y asambleas</font></a>
	        <br><br></td>
		</tr>

		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica7"><font color="black">Registro de Consejos Escolares en el ámbito Urbano y Rural</font></a>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica8"><font color="black">Zonas Geográficas</font></a>
	        <br><br></td>
		</tr>
				<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica6"><font color="black">Integración</font></a>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica9"><font color="black">Gráfica de Normalidad Minima</font></a>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica10"><font color="black">Gráfica de Ruta de Mejora</font></a>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica5"><font color="black">Gráfica de Programas Federales</font></a>
	        <br><br></td>
		</tr>
		
				
		<tr>
	    <td>
	      <button id="regresar" type="button"></button>
	    </td>
	</tr>
	</table>

</div>
	
	</body>
</html>