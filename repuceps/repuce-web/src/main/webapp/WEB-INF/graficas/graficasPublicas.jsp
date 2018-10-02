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
	 		
	 		//var cat = ["lectura","infraestructura","proteccionCivil","activacionFisica","actividadesVarias","bulling","consumoEscolar","medioAmbiente","otros","reforzamiento"];
	 		var cat = ["comite1","comite2","comite3","comite4","comite5","comite6","comite7","comite8","comite9","comite10","comite11","comite12","comite13","comite14"];
	 		var col =  ["Fomento de actividades relacionadas con la lectura y aprovechamiento de la infraestructura disponible para ello ","De mejoramiento de la infraestructura (NO relacionado con el programa Escuela Digna).","Rehabilitaci�n de planteles escolares 'Escuelas Dignas'","Protecci�n civil y de seguridad de las escuelas.","Impulso a la activaci�n f�sica.","Actividades recreativas, art�sticas o culturales.","Desaliento de las pr�cticas que generen violencia.","Establecimiento de consumo escolar.","Cuidado al medio ambiente y limpieza del entorno escolar.","Alimentaci�n saludable.","Integraci�n educativa.","Nuevas tecnolog�as.","Contralor�a social","Otro"]; 
	 		var caption='Avance en la instalaci�n de comit�s';
	 		var xAxisName='Comit�s';
	 		var yAxisName='N�mero de escuelas';

	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 2);
		});
	 	
	 	on( dom.byId('grafica4'),'click', function(){
	 		
	 		//var cat = ["conConsejo","tienePrimeraSesion","tieneSegundaSesion","tieneSegundaAsamblea","tieneTerceraSesion","tieneCuartaSesion","tieneTerceraAsamblea"];
	 		var cat = ["tienePrimeraAsamblea","tienePrimeraSesion","tieneSegundaSesion","tieneSegundaAsamblea"];
	 		//var col = ["Primera Asamblea","Primera Sesi�n","Segunda Sesi�n","Segunda Asamblea","Tercera Sesi�n","Cuarta Sesi�n","Tercera Asamblea"];
	 		var col = ["Primera Asamblea","Primera Sesi�n","Segunda Sesi�n","Segunda Asamblea"];
	 		var caption='Avance en el registro de sesiones y asambleas';
	 		var xAxisName='Sesiones y asambleas';
	 		var yAxisName='N�mero de escuelas';
	 	
	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 1);
		});

// 	 	on( dom.byId('grafica5'),'click', function(){
	 		
// 	 		//var cat = ['presDirector', 'presPadre', 'presRepAPF', 'presMaestro', 'presComunidad', 'presSindicato','presAlumno','presExalumno'];
// 	 		//var col = ['Director','Padre de Familia','Representante de la Asociaci�n de Padres de Familia', 'Maestro', 'Miembro de la comunidad', 'Representante de Asociaci�n Sindical','Alumno', 'Exalumno'];
// 	 		var cat = ['calidad_presidente'];
// 	 		var col = ['Padre de Familia o Representante de la Asociaci�n de Padres de Familia'];
// 	 		var caption='Calidad del Presidente del Consejo Escolar';
// 	 		var xAxisName='Calidad del Presidente';
// 	 		var yAxisName='N�mero de escuelas';
// 	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 3);
	 		
	 		
// 		});
	 	
		on( dom.byId('grafica6'),'click', function(){
	 		
	 		var cat = ['secrDirector', 'secrPadre', 'secrRepAPF', 'secrMaestro', 'secrComunidad', 'secrSindicato','secrAlumno', 'secrExalumno'];
	 		var col = ['Director','Padre de Familia','Representante de la Asociaci�n de Padres de Familia', 'Maestro', 'Miembro de la comunidad', 'Representante de Asociaci�n Sindical','Alumno', 'Exalumno'];
	 		var caption='Calidad del Secretario del Consejo Escolar';
	 		var xAxisName='Calidad del Secretario';
	 		var yAxisName='N�mero de escuelas';
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
			var col = ['Con Consejo','Zona Geogr�fica','Entidad'];
			var max = true; 
			getGraficaSimple(categorias,cat,col,max);
	 			 		
		});
       
//        on( dom.byId('grafica9'),'click', function(){
	 		
// 		   // var categorias = "tieneMetasEnlace,tieneCompEnlace,entidad";
// 			var cat = ['tieneMetasEnlace','tieneCompEnlace'];
// 			var col = ['Meta Enlace','Compromisos Enlace'];
// 			var caption='Consejos que registraron metas y compromisos para la prueba ENLACE';
// 	 		var xAxisName=' Prueba ENLACE';
// 	 		var yAxisName='N�mero de escuelas';
// 	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 3);
	 			 		
// 		});
       
//        on( dom.byId('grafica10'),'click', function(){
	 		
//     	   var cat = ['compSeguimiento', 'compCumplMetas', 'compCorrespPadres', 'compTareas', 'compEstimulos', 'compCapacitacion'];
// 	 		var col = ['Compromisos de diagn�stico y seguimiento','Compromisos en el cumplimiento de metas','Corresponsabilidad de madres y padres de familia', 'Cursos y tareas extras', 'Est�mulos y reconocimiento al mejoramiento del desempe�o global y grupal', 'Capacitaci�n y apoyo docente'];
// 	 		var caption='Tipo de compromisos registrados';
// 	 		var xAxisName='Compromisos';
// 	 		var yAxisName='N�mero de escuelas';
// 	 		getGraficaCategoriasIndep(cat,col, caption, xAxisName, yAxisName, 3);
	 			 		
// 		});
       
       new Button({
           label: "Regresar",
           onClick: function(){
           	window.location.href='<c:url value="/login.jsp"/>';
           }
       }, "regresar");
	 
		
 	});

 	/**********************************************************************
 	* Funci�n para obtener el n�mero de elementos para cada categoria.
 	***********************************************************************/
 	/**
 	* cat Arreglo de los nombres de las categorias a consultar
 	* col Arreglo de los nombres visibles de las categor�as a consultar
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
	 			
	 			
	 			//Se asegura el orden correcto de la informaci�n
	 			for(var i in cat){
	 				if(sesion[0]==cat[i]){
	 					nomTitulo=col[i];
	 				}
	 			}
	 			//jsonLkdChart.data.push({label:nomSesion,value:data[j][1]["response"]["numFound"], link:'newchart-json-id' + j});
	 			dataTemp.push({label:nomTitulo,value:data[j][1]["response"]["numFound"], link:'newchart-json-id' + j});
	 		
 	 			var entidades = data[j][1]["facet_counts"]["facet_fields"]["entidad"];	
 	 			var linkData = {id:'id'+j, linkedchart:{chart:{caption:'',xAxisName:'Entidades Federativas',
 	 					yAxisName:'N�mero de Escuelas', formatNumberScale: "0"}, data:[]}};

 	 			for(var k=0; k<entidades.length; k++){

 	 				linkData.linkedchart.data.push({label:entidades[k++] , 
 	 												value: entidades[k]});
 	 				if(band==1){
 	 					linkData.linkedchart.chart.caption='Avance en el registro de '+ nomTitulo + ' por Entidad Federativa';
 	 					nomGrafica='grafAvanceRegistro';
 	 				}
 	 				if(band==2){
 	 					linkData.linkedchart.chart.caption='Avance en la instalaci�n del comit� de '+ nomTitulo + '\n por Entidad Federativa';
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
 	*Funci�n para crear la gr�fica.
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
									yAxisName:'N�mero de escuelas',
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
 		    
 		    //Calcula el n�mero de categor�as que existen
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
 			
 			//Carga en el modelo de la gr�fica el nombre de las categor�as
			for(var i=0; i<tamData; i++){
				var nomNivel=categories[x]["pivot"][i]["value"];
				categoryNames.push({label:nomNivel});
			}
			console.log('categoryNames: ' + json.toJson(categoryNames));

 			jsonLkdChart.categories.push({category: categoryNames});
	
 			//Indice de la categor�a
 			var catIdx = 0;
 			
 			//Carga los datos de las series de cada categor�a
 			for(var j=0; j<categories.length; j++){
 				
 				//Crea la estructura de la gr�fica anidada
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

 					//Valores del n�mero total de escuelas con y sin consejo por entidad
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
 	* funci�n que guarda el orden en el que aparecen 
 	*/
 	function _setEntOrder(){
 		
 		
 	}
 
	/*************************************************************************************
 	*Funci�n para crear la ventana donde se mostrar� la gr�fica.
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
	        <td style="width: 50%;  align: center;"><br>
	        	<h2 style="text-align: center;"><font color="black">Listado de Gr�ficas P�blicas</font></h2>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;"><br>
	        	&Phi; <a href="#" id="grafica1"><font color="black">Gr�fica de avance de instalaci�n por nivel educativo </font></a>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica2"><font color="black">Gr�fica de avance de instalaci�n por sostenimiento</font></a>
	        <br/><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica3"><font color="black">Gr�fica de instalaci�n de comit�s</font></a>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica4"><font color="black">Gr�fica de avance de sesiones y asambleas</font></a>
	        <br><br></td>
		</tr>
<!-- 		<tr> -->
<!-- 	        <td style="width: 50%;"> -->
<!-- 	        	&Phi; <a href="#" id="grafica5"><font color="black">Gr�fica de Calidad del Presidente del Consejo Escolar</font></a> -->
<!-- 	        <br><br></td> -->
<!-- 		</tr> -->
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica6"><font color="black">Gr�fica de Calidad del Secretario T�cnico del Consejo Escolar</font></a>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica7"><font color="black">Gr�fica de Avance en el Registro de Consejos Escolares en el �mbito Urbano y Rural</font></a>
	        <br><br></td>
		</tr>
		<tr>
	        <td style="width: 50%;">
	        	&Phi; <a href="#" id="grafica8"><font color="black">Gr�fica de Avance por Zonas Geogr�ficas</font></a>
	        <br><br></td>
		</tr>
<!-- 		<tr> -->
<!-- 	        <td style="width: 50%;"> -->
<!-- 	        	&Phi; <a href="#" id="grafica9"><font color="black">Gr�fica de Consejos que revisaron los resultados de ENLACE</font></a> -->
<!-- 	        <br><br></td> -->
<!-- 		</tr> -->
<!-- 		<tr> -->
<!-- 	        <td style="width: 50%;"> -->
<!-- 	        	&Phi; <a href="#" id="grafica10"><font color="black">Gr�fica por tipo de compromisos registrados</font></a> -->
<!-- 	        <br><br><br><br></td> -->
<!-- 		</tr> -->
		<tr>
	    <td>
	      <button id="regresar" type="button"></button>
	    </td>
	</tr>
	</table>

</div>
	
	</body>
</html>