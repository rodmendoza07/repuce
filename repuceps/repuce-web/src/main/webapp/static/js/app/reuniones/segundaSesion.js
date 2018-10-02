define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/form/CheckedMultiSelect","app/util/jsUtils","dojo/_base/xhr","dojo/_base/json",
         "dijit/form/ValidationTextBox","dojo/on","dijit/form/RadioButton","dijit/form/Textarea",
         "dojo/dom", "dojox/grid/cells/dijit", "dojo/data/ItemFileWriteStore", "dijit/form/FilteringSelect",
         "dijit/form/CheckBox", "dojox/grid/EnhancedGrid", "dijit/form/Button", "app/util/constants",  "dijit/form/Form",
         "dojo/_base/xhr", "dojo/DeferredList", "dojox/widget/Standby","dojo/data/ItemFileWriteStore",
         "dojox/form/MultiComboBox","dojox/grid/DataGrid","app/reuniones/reuniones","dojo/_base/lang","app/reuniones/resultadosDatos"], 
function( ContentPane,registry,array,utils,CheckedMultiSelect,jsUtils,xhr,json,ValidationTextBox,
		on,RadioButton,Textarea,dom, gridCellsDijit, ItemFileWriteStore, FilteringSelect,
		CheckBox, EnhancedGrid, Button, constants, Form, xhr, DeferredList, Standby, ItemFileWriteStore,
		MultiComboBox,DataGrid,reuniones,lang,resultadosDatos){

	var segundaSesionObj= new Object();
	var gridCellsDijit = dojox.grid.cells;
	var sinDatosStr='<br>Lo sentimos, usted no cuenta con resultados de la prueba ENLACE, por lo que solo podr\u00E1 registrar compromisos.<br> Para mayor informaci\u00F3n comun\u00EDquese al CONAPASE.';
		
	function init(actividades,cCct,ReunionObj){
		segundaSesionObj=ReunionObj;
		gActividades=actividades;

		_resultados(array.indexOf(actividades,31)!=-1, cCct, segundaSesionObj.resultadosEnlace,segundaSesionObj.hMetas);
		_metas(array.indexOf(actividades,32)!=-1, cCct, segundaSesionObj.metas, segundaSesionObj.resultadosEnlace);
		_compromisos(array.indexOf(actividades,32)!=-1, cCct, segundaSesionObj.compromisos);

   }
	
	
	 function _muestraOtro(tbId,cmsID){ 
		   var data = cmsID.getOptions();
	       for(var j=0;j<data.length;j++){
	           if(data[j].label=="Otro" && data[j].selected==true){
	        	   tbId.set("style","display:block");
	        	   tbId.set("required",true);
	        	   
	           }

	           else if(data[j].label=="Otro" && data[j].selected==false){
	        	   tbId.set("style","display:none");
	        	   tbId.reset();
	        	   tbId.set("required",false);
	           } 

	       }
	   }
	
	 
	   function _resultados(crea,cCct,resultadosEnlace,hMetas){
		   //alert(json.toJson(resultadosEnlace));
		   var id="resultadosPane";
		   var theadPrimero="";
		   var theadSegundo="";
		   var theadTercero="";
		   var tablaPrimero="";
		   var tablaSegundo="";
		   var tablaTercero="";
		   
		   var theadCuarto="";
		   var theadQuinto="";
		   var theadSexto="";
		   var tablaCuarto="";
		   var tablaQuinto="";
		   var tablaSexto="";
		   
		   if(crea){
			   if(!registry.byId(id)){
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:"Resultados de evaluaciones",
			           id:id,
			           content: "<div id='resultadosDiv'></div>"
			       })); 
				   
					function displayValue(nodeId, store, attr, item) {
						if (item != null) { //if it's null, it wasn't found!
							dojo.byId(nodeId).innerHTML = store.getValue(item, (attr));
						}
					}
						var rLinks='&Phi; <a href="#" id="resultadosD1">Sugerencias para el an\u00e1lisis de los resultados y establecimiento de metas. </a><br/>'+
							       '&Phi; <a href="#" id="resultadosD2">Recomendaciones generales que pueden contribuir a alcanzar las metas escolares. </a><br/>'+
							       '&Phi; <a href="#" id="resultadosD3">Aspectos orientadores para establecer acciones para la mejora continua. </a><br/>'+
							       '&Phi; <a href="#" id="resultadosD4">Fomento del an\u00e1lisis y reflexi\u00f3n de la comunidad escolar. </a><br/>';
					   
						utils.createTag('div','resultadosDatos1','resultadosDiv');
					    dom.byId('resultadosDatos1').innerHTML=rLinks;
					    on( dom.byId('resultadosD1'),'click', function(){
					    	resultadosDatos.muestraDoc(1);
			        	   });   
					    
						on( dom.byId('resultadosD2'),'click', function(){
					    	resultadosDatos.muestraDoc(2);
			        	   });   

						on( dom.byId('resultadosD3'),'click', function(){
					    	resultadosDatos.muestraDoc(3);
			        	   });   

						on( dom.byId('resultadosD4'),'click', function(){
					    	resultadosDatos.muestraDoc(4);
			        	   });   

					    var datos='';
					    
					    datos=datos+'<table border="0" width="100%" ><tr border="0"><td class="s2ResultadosHead" align="center" colspan="4">RESULTADOS</td><tr/><tr valign="top">';
					    
					    theadPrimero=theadPrimero+'<td><table align="lefth" class="s2Resultados" border="0" >'
					    +'<tr>'
					    +'<td align="center">Grado</td>'
					    +'<td align="center">Materia</td>'
					    +'<td align="center">Datos</td>'
					    +'</tr>'
					    +'</table><table border="0" width="100%" align="center">';
					    
					    theadSegundo=theadSegundo+'<td><table align="lefth" class="s2Resultados" border="0" >'
					    +'<tr>'
					    +'<td align="center">Grado</td>'
					    +'<td align="center">Materia</td>'
					    +'<td align="center">Datos</td>'
					    +'</tr>'
					    +'</table><table border="0" width="100%" align="center">';
					    
					    theadTercero=theadTercero+'<td><table align="lefth" class="s2Resultados" border="0" >'
					    +'<tr>'
					    +'<td align="center">Grado</td>'
					    +'<td align="center">Materia</td>'
					    +'<td align="center">Datos</td>'
					    +'</tr>'
					    +'</table><table border="0" width="100%" align="center">';
					    
					    theadCuarto=theadCuarto+'<td><table align="lefth" class="s2Resultados" border="0" >'
					    +'<tr>'
					    +'<td align="center">Grado</td>'
					    +'<td align="center">Materia</td>'
					    +'<td align="center">Datos</td>'
					    +'</tr>'
					    +'</table><table border="0" width="100%" align="center">';
					    
					    theadQuinto=theadQuinto+'<td><table align="lefth" class="s2Resultados" border="0" >'
					    +'<tr>'
					    +'<td align="center">Grado</td>'
					    +'<td align="center">Materia</td>'
					    +'<td align="center">Datos</td>'
					    +'</tr>'
					    +'</table><table border="0" width="100%" align="center">';
					    
					    theadSexto=theadSexto+'<td><table align="lefth" class="s2Resultados" border="0" >'
					    +'<tr>'
					    +'<td align="center">Grado</td>'
					    +'<td align="center">Materia</td>'
					    +'<td align="center">Datos</td>'
					    +'</tr>'
					    +'</table><table border="0" width="100%" align="center">';
					    					    					    
						var anio = 0;
						var anioAc = 0;
						var param=new Array();
						
					    for(var i in resultadosEnlace) {
					    	var grado = "";
					    	var materia = "";
					    	anio= resultadosEnlace[i].anioResult;
					    	
					    	if(anioAc < anio ){
					    		anioAc= resultadosEnlace[i].anioResult;
					    		tablaPrimero ="";
					    		tablaSegundo ="";
					    		tablaTercero ="";
					    		tablaCuarto="";
					 		    tablaQuinto="";
					 		    tablaSexto="";
					    	}
					    	if(anioAc == anio ){
					    		
						    	materia = constants.NOM_MATERIA(resultadosEnlace[i].numMateria);
						    	grado = constants.NOM_GRADO(resultadosEnlace[i].numGrado);
						    	switch((resultadosEnlace[i].numGrado+"").substring(0, 1)){
								case "1":
									tablaPrimero = tablaPrimero+'<tr>' +		
									   '<td >'+grado+'</td>'+			                       
				                       '<td >'+materia+'</td>'+
				                       '<td ><a href="#"><img src="static/img/gr2s.png" border="0" id="'+resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria+'"></a></td>'+
				                       '</tr>';
									if(array.indexOf(param,resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria)==-1){
										param.push(resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria);
									}
									
								break;
								case "2":
									tablaSegundo = tablaSegundo+'<tr>' +		
									   '<td >'+grado+'</td>'+			                       
				                       '<td >'+materia+'</td>'+
				                       '<td ><a href="#"><img src="static/img/gr2s.png" border="0" id="'+resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria+'"></a></td>'+
				                       '</tr>';
									if(array.indexOf(param,resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria)==-1){
										param.push(resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria);
									}
								break;
								case "3":
									tablaTercero = tablaTercero+'<tr>' +		
									   '<td >'+grado+'</td>'+			                       
				                       '<td >'+materia+'</td>'+
				                       '<td ><a href="#"><img src="static/img/gr2s.png" border="0" id="'+resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria+'"></a></td>'+
				                       '</tr>'; 
									if(array.indexOf(param,resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria)==-1){
										param.push(resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria);
									}
								break;
								case "4":
									tablaCuarto = tablaCuarto+'<tr>' +		
									   '<td >'+grado+'</td>'+			                       
				                       '<td >'+materia+'</td>'+
				                       '<td ><a href="#"><img src="static/img/gr2s.png" border="0" id="'+resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria+'"></a></td>'+
				                       '</tr>';
									if(array.indexOf(param,resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria)==-1){
										param.push(resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria);
									}
									
								break;
								case "5":
									tablaQuinto = tablaQuinto+'<tr>' +		
									   '<td >'+grado+'</td>'+			                       
				                       '<td >'+materia+'</td>'+
				                       '<td ><a href="#"><img src="static/img/gr2s.png" border="0" id="'+resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria+'"></a></td>'+
				                       '</tr>';
									if(array.indexOf(param,resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria)==-1){
										param.push(resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria);
									}
								break;
								case "6":
									tablaSexto = tablaSexto+'<tr>' +		
									   '<td >'+grado+'</td>'+			                       
				                       '<td >'+materia+'</td>'+
				                       '<td ><a href="#"><img src="static/img/gr2s.png" border="0" id="'+resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria+'"></a></td>'+
				                       '</tr>'; 
									if(array.indexOf(param,resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria)==-1){
										param.push(resultadosEnlace[i].numGrado+','+resultadosEnlace[i].numMateria);
									}
								break;
							   }
					    	}//if anio
					     }
					     
					    theadPrimero = theadPrimero + tablaPrimero + '</table></td>';
					    theadSegundo = theadSegundo + tablaSegundo + '</table></td>';
					    theadTercero = theadTercero + tablaTercero + '</table></td>';
					    theadCuarto = theadCuarto + tablaCuarto + '</table></td>';
					    theadQuinto = theadQuinto + tablaQuinto + '</table></td>';
					    theadSexto = theadSexto + tablaSexto + '</table></td>';
					    
					    if(tablaPrimero ==""){theadPrimero='';}
					    if(tablaSegundo ==""){theadSegundo='';}
					    if(tablaTercero ==""){theadTercero='';}
					    if(tablaCuarto ==""){theadCuarto='';}
					    if(tablaQuinto ==""){theadQuinto='';}
					    if(tablaSexto ==""){theadSexto='';}
					    datos=datos+theadPrimero+theadSegundo+theadTercero+theadCuarto+theadQuinto+theadSexto;					     
					    datos=datos+'</tr></table>'; 					       
					    utils.createTag('div','tablaResultadosEnlace','resultadosDiv');
					    if(resultadosEnlace.length>0){
					    	dom.byId('tablaResultadosEnlace').innerHTML=datos;
					    }else{
					    	dom.byId('tablaResultadosEnlace').innerHTML=sinDatosStr;
					    }
					    
					    for(var i in param){
					    	//Se agrega esta validación para evitar conectar a un elemento DOM
					    	//inexistente, aparentemente se da cuando no hay resultados.
							if(dom.byId(param[i])){
						    	on( dom.byId(param[i]),'click', function(){
									 resultadosDatos.getGrf(this.id,resultadosEnlace,hMetas);
					        	   });
							}
					    }
					    
					    		   
			   }
			} 
		   
		   
		   
		   else{
				if(registry.byId(id)){
					   registry.byId('pestanias').closeChild(registry.byId(id));
				}
			} 
	
	   }
   
	   
	   
	   function _metas(crea,cCct,metas,resultadosEnlace){
		   
		   var id="metasPane";
		   if(crea){
			   if(!registry.byId(id)){
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:"Metas",
			           id:id,
			           content: "<div id='metasDiv'></div>"
			       })); 				   		
				   registry.byId('pestanias').selectChild( registry.byId(id), true);
				   
					function displayValue(nodeId, store, attr, item) {
						if (item != null) { //if it's null, it wasn't found!
							dojo.byId(nodeId).innerHTML = store.getValue(item, (attr));
						}
					}

					
					//////////////////////////////////////////////////////////////
					 /* resultadosEnlace
					   cCct
					   numGrado
					   numMateria
					   anioResult *
					   puntosNal *
					   puntosEdo *
					   puntosCct *
					   pctInsuf *%
					   pctElem *%
					   pctBueno *%
					   pctExcel *%
					   */
					   var resultadosMetas = [];
					   var materia  = "";
					   var grado = "";
					   
					   
					   // Completar resultados
					   var contador = 0;
					   var anio = 0;
					   var anioAc = 0;
					   var agregado = 0;
					   for(var i in resultadosEnlace) {
						   
						    anio= resultadosEnlace[i].anioResult;					    	
					    	if(anioAc < anio ){
					    		anioAc= resultadosEnlace[i].anioResult;
					    		resultadosMetas = [];
					    		contador = 0;
					    	}
					    	if(anioAc == anio ){
							   lang.mixin(resultadosEnlace[i],{id:resultadosEnlace[i].numGrado+'_'+resultadosEnlace[i].numMateria});
							   materia = constants.NOM_MATERIA(resultadosEnlace[i].numMateria);
							   lang.mixin(resultadosEnlace[i],{nomMateria:materia});							   							   
						       grado = constants.NOM_GRADO(resultadosEnlace[i].numGrado);
							   lang.mixin(resultadosEnlace[i],{nomGrado:grado});
							   
							   agregado = 0;					    	
						    	for(var j in metas) {
						    		  if(resultadosEnlace[i].cCct == metas[j].cCct &&
						    		     resultadosEnlace[i].numGrado == metas[j].numGrado &&
						    			 resultadosEnlace[i].numMateria == metas[j].numMateria
						    		    ){
						    			  agregado = 1;
						    			  lang.mixin(resultadosEnlace[i],{mpuntosCct:metas[j].puntosCct});
						    			  lang.mixin(resultadosEnlace[i],{mpctInsuf:metas[j].pctInsuf});
						    			  lang.mixin(resultadosEnlace[i],{mpctElem:metas[j].pctElem});
						    			  lang.mixin(resultadosEnlace[i],{mpctBueno:metas[j].pctBueno});
						    			  lang.mixin(resultadosEnlace[i],{mpctExcel:metas[j].pctExcel});
						    			  lang.mixin(resultadosEnlace[i],{mpuntosCct:metas[j].puntosCct});
						    			  
						    		  }					    		     
								   }// fin for metas
						    	 if(agregado == 0){
					    			  lang.mixin(resultadosEnlace[i],{mpuntosCct:null});
					    			  lang.mixin(resultadosEnlace[i],{mpctInsuf:null});
					    			  lang.mixin(resultadosEnlace[i],{mpctElem:null});
					    			  lang.mixin(resultadosEnlace[i],{mpctBueno:null});
					    			  lang.mixin(resultadosEnlace[i],{mpctExcel:null});
					    			  lang.mixin(resultadosEnlace[i],{mpuntosCct:null});
						    	 }
						    	 
						       resultadosMetas[contador] = resultadosEnlace[i];
							   contador++;
							   
					       }  // fin if anio 

					   }
					   
					   

						   var dataMetas = {
							      identifier: 'id',
							      //items: metas /*[{cCct:1,cSesion:1,numGrado:31,numMateria:31,puntosCct:400,pctInsuf:200,pctElem:300,pctBueno:454,pctExcel:45 }]*/
							      items: resultadosMetas
							    };

						   var metasStore = new ItemFileWriteStore({data: dataMetas});

					
				  
						   
						   

					   var layout = [[
					    		      { name: 'Id', field: 'id', width: '20px', hidden:true},
					    		      { name: 'cCct', field: 'cCct', width: '20px', hidden:true},
					    		      { name: 'numGrado', field: 'numGrado', width: '20px', hidden:true},
					    		      { name: 'numMateria', field: 'numMateria', width: '20px', hidden:true},
					    		      { name: 'GRADO', field: 'nomGrado', width: '90px'},
					    		      { name: 'MATERIA', field: 'nomMateria', width: '60px'},					    		      
					    		      { name: 'A\u00d1O', field: 'anioResult', width: '30px'},
					    		      { name: 'PTS. NAL.', field: 'puntosNal', width: '30px'},
					    		      { name: 'PTS. EST.', field: 'puntosEdo', width: '30px'},
					    		      { name: 'PTS. CCT', field: 'puntosCct', width: '30px'},
					    		      { name: '% NIVEL INSUF.', field: 'pctInsuf', width: '40px'},
					    		      { name: '% NIVEL ELEM.', field: 'pctElem', width: '40px'},
					    		      { name: '% NIVEL BUENO.', field: 'pctBueno', width: '40px'},
					    		      { name: '% NIVEL EXCEL.', field: 'pctExcel', width: '40px'},
					    		      
					    		      { name: 'PUNTOS CCT', field: 'mpuntosCct', 
										editable: true, 
										width: '70px', 
							    		type: gridCellsDijit._Widget,
							    		widgetClass: ValidationTextBox, 
							    		widgetProps: {promptMessage:"Capture solo n\u00FAmeros", regExp:constants.NUMBER_VALID, maxlength: 3 }, 
							    		styles: 'text-align: center;' },
						    		  { name: '% NIVEL INSUFICIENTE', field: 'mpctInsuf', 
										editable: true, 
										width: '70px', 
							    		type: gridCellsDijit._Widget,
							    		widgetClass: ValidationTextBox, 
							    		widgetProps: {promptMessage:"Capture solo n\u00FAmeros", regExp:constants.NUMBER_VALID, maxlength: 3}, 
							    		styles: 'text-align: center;' },
									  { name: '% NIVEL ELEMENTAL', field: 'mpctElem', 
										editable: true, 
										width: '70px', 
										type: gridCellsDijit._Widget,
										widgetClass: ValidationTextBox, 
										widgetProps: {promptMessage:"Capture solo n\u00FAmeros", regExp:constants.NUMBER_VALID, maxlength: 3}, 
										styles: 'text-align: center;' },
									  { name: '% NIVEL BUENO', field: 'mpctBueno', 
										editable: true, 
										width: '70px', 
										type: gridCellsDijit._Widget,
										widgetClass: ValidationTextBox, 
										widgetProps: {promptMessage:"Capture solo n\u00FAmeros", regExp:constants.NUMBER_VALID, maxlength: 3}, 
										styles: 'text-align: center;' },
									  { name: '% NIVEL EXCELENTE', field: 'mpctExcel', 
										editable: true, 
										width: '70px', 
										type: gridCellsDijit._Widget,
										widgetClass: ValidationTextBox, 
										widgetProps: {promptMessage:"Capture solo n\u00FAmeros",regExp:constants.NUMBER_VALID, maxlength: 3}, 
										styles: 'text-align: center;' }
					    		]];
					        
							utils.createTag('div','tituloMetas','metasDiv');
						    
						    
					        utils.createTag('div','gridMetasDiv1', 'metasDiv','200px');
			
					        if(resultadosEnlace.length>0){
					        	dom.byId('tituloMetas').innerHTML="<p>Resultados y metas por grado y por materia</p>";
					        	var grid1 = new DataGrid({
							        id: 'gridMetas1',
							        store: metasStore, 
							        structure: layout,
							        autoHeight: true,
							        rowSelector: '20px'},
							        "gridMetasDiv1");

								grid1.startup();
						    }else{
						    	dom.byId('gridMetasDiv1').innerHTML=sinDatosStr;
						    }
					    	

			   }
			} 
		   
		   
		   
		   else{
				if(registry.byId(id)){
					   registry.byId('pestanias').closeChild(registry.byId(id));
				}
			} 
	
	   }
	   
	   function _compromisos(crea,cCct, compromisos){
		   var id="compromisosPane";
		   if(crea){
			   if(!registry.byId(id)){
				   //Pestañas
				   registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:"Compromisos de mejoras para alcanzar las metas",
			           id:id,
			           content: "<div id='compromisosDiv'></div>"
			           //contenType: "application/x-www-form-urlencoded; charset=utf-8"
			       })); 
				   
				   registry.byId('pestanias').selectChild( registry.byId(id), true);
				   
				   //Titulos
				   var listCompromisos= new Array({title:"Compromisos de diagn\u00f3stico y seguimiento",tpoCompEnlace:1,id:"compDiagPane",otroCom:4},
						   {title: "Compromisos en el cumplimiento de metas",tpoCompEnlace:2,id:"compCumpPane",otroCom:14},
						   {title:"Corresponsabilidad de madres y padres de familia",tpoCompEnlace:3,id:"compCorrPane",otroCom:24},
						   {title:"Cursos y tareas extras",tpoCompEnlace:4,id:"compCursPane",otroCom:33},
						   {title:"Est\u00edmulos y reconocimiento al mejoramiento del desempe\u00f1o global y grupal",tpoCompEnlace:5,id:"compEstPane",otroCom:43},
						   {title:"Capacitaci\u00f3n y apoyo docente",tpoCompEnlace:6,id:"compCapPane",otroCom:54});	

				   var compSelects= new Array();									   
				   
					//COMPROMISOS DE DIAGNÓSTICO Y DE SEGUIMIENTO 
				    //COMPROMISOS EN EL CUMPLIMIENTO DE METAS 
				    //CORRESPONSABILIDAD DE MADRES Y PADRES DE FAMILIA 
				    //CURSOS Y TAREAS EXTRAS
				    //ESTÍMULOS Y RECONOCIMIENTO AL MEJORAMIENTO DEL DESEMPEÑO GLOBAL Y GRUPAL 
				    //CAPACITACIÓN Y APOYO DOCENTE 
				   
					    //Se cargan los datos de la BD
				        var contador = 0;
					    var xhrArgs={
					            url: dojo.config.app.urlBase + 'catalogos/listCompromisosEnlace/',
					            sync: false,
					            contentType: "application/x-www-form-urlencoded; charset=utf-8",
					            handleAs: "json",
					            load: function(cCompromiso){
					            	
					            	for(var i in listCompromisos ){					            		
							                  
					            		utils.createTag('div','titleCompDiv'+listCompromisos[i].tpoCompEnlace ,'compromisosDiv');
					            		dom.byId('titleCompDiv'+listCompromisos[i].tpoCompEnlace ).innerHTML='<p>'+listCompromisos[i].title+'</p>';
					            		
					            		utils.createTag('div','listCompDiv'+listCompromisos[i].tpoCompEnlace ,'compromisosDiv');
					            		//Validacion
										   var ckms=new CheckedMultiSelect({
						                       multiple:true,
						                       invalidMessage:"Debe seleccionar al menos uno de los "+listCompromisos[i].title,
						                       style:"width:50px;"
						                    },'listCompDiv'+listCompromisos[i].tpoCompEnlace);
										    compSelects.push(ckms);
										   
						            	var options = new Array();
//					                    var oCompEnlace;
					                    
					                    for(var j in cCompromiso ){				                    
					                    	if(cCompromiso[j].tpoCompEnlace == listCompromisos[i].tpoCompEnlace){				                    		
					                    		options.push({label: cCompromiso[j].nomCompEnlace, value: cCompromiso[j].cCompEnlace,selected:false});
//						                    	if(cCompromiso[j].nomCompEnlace=='Otro'){
//						                    		oCompEnlace=cCompromiso[j].cCompEnlace;
//						                    	}
					                    	}					                    	
					                    }

					                    registry.byId('listCompDiv'+listCompromisos[i].tpoCompEnlace).addOption(options);					                    
					                    	
					                    utils.createTag('div','otroCompEnlace'+listCompromisos[i].otroCom,'compromisosDiv');
							              
							               new ValidationTextBox({
							            	  name:'otroCompEnlace'+listCompromisos[i].otroCom,
							                  id:'otroCompEnlace'+listCompromisos[i].otroCom,
							                  promptMessage:"Capture otro Compromiso", 
							                  trim:true, 
							                  style: "display:none;",                                  
							                  placeHolder:"Especifique",
							                  missingMessage: "Debe especificar el compromiso"
							               }, 'otroCompEnlace'+listCompromisos[i].otroCom);
                                         
							               
							               
					                    for(var k in compromisos){
					                    	registry.byId('listCompDiv'+listCompromisos[i].tpoCompEnlace).updateOption({value:compromisos[k].cCompEnlace,selected:true});
					                    	if(compromisos[k].cCompEnlace == listCompromisos[i].otroCom){
					                    		registry.byId('otroCompEnlace'+listCompromisos[i].otroCom).set('value',compromisos[k].nomOtroComp);
					                    	}
					                    }
					                    
					                    _muestraOtro(registry.byId('otroCompEnlace'+listCompromisos[i].otroCom),registry.byId('listCompDiv'+listCompromisos[i].tpoCompEnlace));
					                    
					                    contador++;
					                   
					            							                   
					            	}// fin list comp
					            	
					            	registry.byId('listCompDiv'+listCompromisos[0].tpoCompEnlace).on('click',function(){
				    	            	   _muestraOtro(registry.byId('otroCompEnlace'+listCompromisos[0].otroCom),registry.byId('listCompDiv'+listCompromisos[0].tpoCompEnlace));
				    	                });	               
				    				     registry.byId('listCompDiv'+listCompromisos[1].tpoCompEnlace).on('click',function(){
				    				    	_muestraOtro(registry.byId('otroCompEnlace'+listCompromisos[1].otroCom),registry.byId('listCompDiv'+listCompromisos[1].tpoCompEnlace));
				    	                });
				    				     registry.byId('listCompDiv'+listCompromisos[2].tpoCompEnlace).on('click',function(){
				    				    	_muestraOtro(registry.byId('otroCompEnlace'+listCompromisos[2].otroCom),registry.byId('listCompDiv'+listCompromisos[2].tpoCompEnlace));
				    	                });
				    				     registry.byId('listCompDiv'+listCompromisos[3].tpoCompEnlace).on('click',function(){
				    				    	_muestraOtro(registry.byId('otroCompEnlace'+listCompromisos[3].otroCom),registry.byId('listCompDiv'+listCompromisos[3].tpoCompEnlace));
				    	                });
				    				     registry.byId('listCompDiv'+listCompromisos[4].tpoCompEnlace).on('click',function(){
				    				    	_muestraOtro(registry.byId('otroCompEnlace'+listCompromisos[4].otroCom),registry.byId('listCompDiv'+listCompromisos[4].tpoCompEnlace));
				    	                });
				    				     registry.byId('listCompDiv'+listCompromisos[5].tpoCompEnlace).on('click',function(){
				    				    	_muestraOtro(registry.byId('otroCompEnlace'+listCompromisos[5].otroCom),registry.byId('listCompDiv'+listCompromisos[5].tpoCompEnlace));
				    	                });
					            	
				                    
					            },
					            error: function(error){
					                jsUtils.cstmAlert(json.toJson(error));
					            }
					        };

				        xhr.get(xhrArgs);



			   }
			} 
		   
		   
		   
		   else{
				if(registry.byId(id)){
					   registry.byId('pestanias').closeChild(registry.byId(id));
				}
			} 
	
	   }	   
	   

   
		   
		   
		   ////////////////////////////////////
		// Se manda a actualizar la informacion capturada
			function saveSegundaSesion(cct) {
				//alert("saveSegundaSesion");
				var standby = new Standby({
					target : "dialogCaptiraDG"
				});
				document.body.appendChild(standby.domNode);
				standby.startup();

				//alert("saveSegundaSesion :: 1");
				var form = registry.byId('registraPrimeraReunion');
				if ( form.validate() == false){  
					jsUtils.cstmAlert('Favor de registrar los datos requeridos en cada una de las peta\u00F1as');
					return false;
				}
				
				//alert("saveSegundaSesion :: 2");
				var ceInfGral = {
					cCct : cct
				};
				
				//alert("saveSegundaSesion :: 3");
				var ceSesion = {
					fchSesion : registry.byId('fechaRegistro').get('value'),
					horaIniSesion : registry.byId('horaInicio').get('value'),
					horaFinSesion : registry.byId('horaFinal').get('value'),
					numIntegrantes : registry.byId('numIntegrantes').get(
							'value'),
					observaciones : registry.byId('observaciones').get('value'),
					fchRegistro : registry.byId('fechaRegistro').get('value')
				};

				//alert("saveSegundaSesion :: 4");
				// Actividades
				var actividades = new Array();
				var actividadesArray = registry.byId('nomActividad').get(
						'value');

				//alert("saveSegundaSesion :: 5");
				// Carga los objetos tipo CeActSesion
				for ( var i in actividadesArray) {
					actividades.push({
						cActividad : actividadesArray[i]
					});
				}
						
				//alert("saveSegundaSesion :: 6");
				var metas = new Array();
				if(registry.byId('gridMetas1')){
					var gridMetas = registry.byId('gridMetas1');


					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridMetas.rowCount; i++) {
						var item = gridMetas.getItem(i);
						
						if((gridMetas.store.getValue(item,'mpuntosCct') == null || gridMetas.store.getValue(item,'mpuntosCct')=='')
								&&(gridMetas.store.getValue(item,'mpctInsuf') == null || gridMetas.store.getValue(item,'mpctInsuf') =='')
								&&(gridMetas.store.getValue(item,'mpctElem') == null || gridMetas.store.getValue(item,'mpctElem') =='')
								&&(gridMetas.store.getValue(item,'mpctBueno') == null || gridMetas.store.getValue(item,'mpctBueno') =='')
								&&(gridMetas.store.getValue(item,'mpctExcel') == null || gridMetas.store.getValue(item,'mpctExcel') =='')
						){
							//alert (i);
						}
						else{
							
							if(gridMetas.store.getValue(item,'mpuntosCct') != null&&gridMetas.store.getValue(item,'mpuntosCct')+'' != ''
								&&(gridMetas.store.getValue(item,'mpuntosCct')< 200 ||gridMetas.store.getValue(item,'mpuntosCct') >800) ){
									utils.cstmAlert("Los puntos CCT capturados para la materia "+constants.NOM_MATERIA(gridMetas.store.getValue(item,'numMateria'))+" del grado "+
											constants.NOM_GRADO(gridMetas.store.getValue(item,'numGrado'))+" no deben ser mayores a 800 ni menores a 200");
									return false;
								
							}
							var insuf=0,elem=0,bueno=0,excel=0;
							if(!isNaN(parseInt(gridMetas.store.getValue(item,'mpctInsuf')))){
								insuf=parseInt(gridMetas.store.getValue(item,'mpctInsuf'));
					           }
							if(!isNaN(parseInt(gridMetas.store.getValue(item,'mpctElem')))){
								elem=parseInt(gridMetas.store.getValue(item,'mpctElem'));
					           }
							if(!isNaN(parseInt(gridMetas.store.getValue(item,'mpctBueno')))){
								bueno=parseInt(gridMetas.store.getValue(item,'mpctBueno'));
					           }
							if(!isNaN(parseInt(gridMetas.store.getValue(item,'mpctExcel')))){
								excel=parseInt(gridMetas.store.getValue(item,'mpctExcel'));
					           }
							
							var total=insuf+elem+bueno+excel;
							if(total!=0&&total!=100){				
									utils.cstmAlert("La suma del porcentaje de los diferentes niveles en la materia "
											+constants.NOM_MATERIA(gridMetas.store.getValue(item,'numMateria'))+" del grado "
											+constants.NOM_GRADO(gridMetas.store.getValue(item,'numGrado'))+ " debe ser 100%");
									return false;
								}
							
							if(total==0 && (gridMetas.store.getValue(item,'mpuntosCct')>= 200 ||gridMetas.store.getValue(item,'mpuntosCct')<=800 )){
								utils.cstmAlert("La suma del porcentaje de los diferentes niveles en la materia "
											+constants.NOM_MATERIA(gridMetas.store.getValue(item,'numMateria'))+" del grado "
											+constants.NOM_GRADO(gridMetas.store.getValue(item,'numGrado'))+ " no debe ser 0");
										return false;
							}
							
							if(total==100 && (gridMetas.store.getValue(item,'mpuntosCct')< 200 ||gridMetas.store.getValue(item,'mpuntosCct')>800)){
								utils.cstmAlert("Los puntos CCT capturados en la materia "+constants.NOM_MATERIA(gridMetas.store.getValue(item,'numMateria'))+" del grado "+
										constants.NOM_GRADO(gridMetas.store.getValue(item,'numGrado'))+ " no deben ser mayores a 800 ni menores a 200");
										return false;
							}
							
							
								var meta = {
									numGrado : gridMetas.store.getValue(item,'numGrado'),
									numMateria : gridMetas.store.getValue(item,'numMateria'),
									puntosCct : gridMetas.store.getValue(item,'mpuntosCct') && gridMetas.store.getValue(item,'mpuntosCct')!=''
												?gridMetas.store.getValue(item,'mpuntosCct'):0,
									pctInsuf : gridMetas.store.getValue(item, 'mpctInsuf') && gridMetas.store.getValue(item, 'mpctInsuf')!=''
												?gridMetas.store.getValue(item, 'mpctInsuf'):0,
									pctElem : gridMetas.store.getValue(item,'mpctElem') && gridMetas.store.getValue(item,'mpctElem') !=''
												?gridMetas.store.getValue(item,'mpctElem'):0,
									pctBueno : gridMetas.store.getValue(item, 'mpctBueno') && gridMetas.store.getValue(item, 'mpctBueno') !=''
												?gridMetas.store.getValue(item, 'mpctBueno'):0,
									pctExcel : gridMetas.store.getValue(item,'mpctExcel') && gridMetas.store.getValue(item,'mpctExcel')!=''
												?gridMetas.store.getValue(item,'mpctExcel'):0
								};
		
								metas.push(meta);
						}
	
					}
				}
				
				
				//alert("saveSegundaSesion :: 8");
				// Compromisos
				var compromisos = new Array();
				var todosCompromisos = [];
				var comps = new Array();
				var nomOtroCompromisos;

				//alert("saveSegundaSesion :: 9");
				//El usuario selecciono Programas
				if(registry.byId('listCompDiv1')){
					//alert("saveSegundaSesion :: 9.1");
					var listCompromisos= new Array({title:"Compromisos de diagn\u00f3stico y seguimiento",tpoCompEnlace:1,id:"compDiagPane"},
							   {title: "Compromisos en el cumplimiento de metas",tpoCompEnlace:2,id:"compCumpPane"},
							   {title:"Corresponsabilidad de madres y padres de familia",tpoCompEnlace:3,id:"compCorrPane"},
							   {title:"Cursos y tareas extras",tpoCompEnlace:4,id:"compCursPane"},
							   {title:"Est\u00edmulos y reconocimiento al mejoramiento del desempe\u00f1o global y grupal",tpoCompEnlace:5,id:"compEstPane"},
							   {title:"Capacitaci\u00f3n y apoyo docente",tpoCompEnlace:6,id:"compCapPane"});

					//alert("saveSegundaSesion :: 9.2");
					for ( var i in listCompromisos) {
						compromisos = registry.byId(
								'listCompDiv'+listCompromisos[i].tpoCompEnlace).get(
								'value');
						todosCompromisos = todosCompromisos.concat(compromisos);
					}
					
					//alert("saveSegundaSesion :: 9.3 "+ json.toJson(todosCompromisos));
					if(todosCompromisos.length <= 0 ){
						jsUtils.cstmAlert("Debe seleccionar al menos uno de los compromisos");
						return false;	
					}
									
					//alert("saveSegundaSesion :: 9.4");
					//var cont = 0;
					for ( var i in todosCompromisos) {
						var comp = {};
						if (todosCompromisos[i] == 4 || todosCompromisos[i] == 14
							|| todosCompromisos[i] == 24 || todosCompromisos[i] == 33
							|| todosCompromisos[i] == 43 || todosCompromisos[i] == 54) {
							nomOtroCompromisos = registry.byId(
									'otroCompEnlace'
											+ todosCompromisos[i]).get(
									'value');
							comp = {
								cCompEnlace : todosCompromisos[i],
								nomOtroComp : nomOtroCompromisos
							};
							//cont++;
						} else {
							comp = {
								cCompEnlace : todosCompromisos[i]
							};
						}
						comps.push(comp);
					}
					//alert("saveSegundaSesion :: 9.5 ::"+ comps);
				}

				//alert("saveSegundaSesion :: 10");
				var segundaSesion = {
					ceInfGral : ceInfGral,
					ceSesion : ceSesion,
					actividades : actividades,
					metas : metas,
					compromisos : comps
				};

				console.log(json.toJson(segundaSesion));
				//alert(json.toJson(segundaSesion));
				
				
				var urlJson = dojo.config.app.urlBase
						+ 'segundaSesion/saveSegundaSesion';
				
				xhr.post({
							url : urlJson,
							postData : json.toJson(segundaSesion),
							headers : {
								"Content-Type" : "application/json; charset=UTF-8"
							},
							handleAs : 'json',
							handle : function(response) {
								if (response == 'SyntaxError: syntax error') {
				    	            window.location.reload();
								}else if (response != 1) {
				                	utils.cstmAlert('Ocurri\u00F3 un error al actualizar los datos.');
				                	standby.hide();
								} else {
									utils.cstmAlert('La actualizaci\u00F3n se realiz\u00F3 correctamente.');						
									reuniones.refresh(cct);
									standby.hide();
								}

								registry.byId('dialogCaptiraDG').destroyRecursive(false);


							}
						}).progress(standby.show());
                     
			}		   
		   
			
		   ///////////////////////////////////
			return {
				saveSegundaSesion:saveSegundaSesion,
				init:init
			};
   
});

