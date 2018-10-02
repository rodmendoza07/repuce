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
<title>Reportes de Movimiento Municipal</title>
<script src='<c:url value="/static/css/segundaSesion/FusionChartsFree/JSClass/FusionCharts.js"/>' type="text/javascript" charset="UTF-8"></script>
<link rel="stylesheet" href='<c:url value="/static/css/style.css"/>' media="screen">
<link rel="stylesheet" href='<c:url value="/static/css/segundaSesion/estilo.css"/>' media="screen">
<link rel="stylesheet" href='<c:url value="/static/js/libs/dijit/themes/tundra/tundra.css"/>' media="screen">  
<link rel="stylesheet" href='<c:url value="/static/js/libs/dojox/widget/Toaster/Toaster.css"/>' />
<link rel="stylesheet" href='<c:url value="/static/js/libs/dojox/grid/resources/tundraGrid.css"/>' />
<link rel="stylesheet" href='<c:url value="/static/js/libs/dojox/grid/enhanced/resources/EnhancedGrid.css"/>' />
<link rel="stylesheet" href='<c:url value="/static/js/libs/dojox/form/resources/CheckedMultiSelect.css"/>'/>
<link rel="stylesheet" href='<c:url value="/static/js/libs/dojox/grid/enhanced/resources/EnhancedGrid_rtl.css"/>' />
<link rel="stylesheet" href='<c:url value="/static/css/demo.css"/>' />
<link rel="stylesheet" href='<c:url value="/static/css/container.css"/>' />
<style type="text/css">
		/*Grid need a explicit width/height by default*/
		#grid {
	     width: 700px;
	     height: 300px;
		}
</style> 
<script>
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
	require(["dojo/ready", "dijit/form/Button","dijit/Dialog","dijit/form/FilteringSelect","dojo/store/Memory",
	         "dojo/_base/xhr","dojo/_base/json","dijit/registry","app/util/jsUtils","dojo/DeferredList",
	         "dojo/data/ItemFileWriteStore","dojox/grid/DataGrid","dojo/number","dojox/grid/EnhancedGrid",
	         "dojox/grid/enhanced/plugins/Printer","dojo/io/iframe","dojox/grid/enhanced/plugins/exporter/CSVWriter"],
			function(ready, Button,Dialog,FilteringSelect,Memory,xhr,json,registry,jsUtils,DeferredList,
					ItemFileWriteStore,DataGrid,number,EnhancedGrid,Printer,iframe,CSVWriter){
		
		var urlBase='<c:url value="/mvc/"/>';
		var urlStatic='<c:url value="/static/"/>';
		var urlBasica='<c:url value="/"/>';
		
		var layout = [[	  { name: 'cCct', field: 'cCct', width: '10px', hidden:true},
		    		      { name: 'CCT', field: 'cveCct',  width:'100px'},					    		      
		    		      { name: 'Nombre de la Escuela', field: 'nomCct', width: '100px'},
		    		      { name: 'Turno', field: 'nomTurno', width: '80px'},
		    		      { name: 'Nivel', field: 'nomNivel', width: '80px'},
		    		      { name: 'Sub Nivel', field: 'nomSubnivel', width: '80px'}
		    		      ,{ name: 'Domicilio', field: 'domicilio', width: '100px'}
		    		      ,{ name: 'Colonia', field: 'colonia', width: '50px'}
		    		      ,{ name: 'Código Postal', field: 'codigoPostal', width: '50px'}
		    		      ,{ name: 'Genero del Presidente', field: 'presidente', width: '50px'}
		    		      ,{ name: 'Calidad del Secretario', field: 'secretario', width: '50px'}
		    		      ,{ name: 'Integrantes', field: 'integrantes', width: '50px'}
		    		      ]];
		
		var layout2 = [[ { name: 'id', field: 'id', width: '10px', hidden:true},	 
		                { name: 'cCct', field: 'cCct', width: '10px', hidden:true},
		    		      { name: 'CCT', field: 'cveCct',  width:'100px'},					    		      
		    		      { name: 'Nombre de la Escuela', field: 'nomCct', width: '100px'},
		    		      { name: 'Turno', field: 'nomTurno', width: '80px'},
		    		      { name: 'Nivel', field: 'nomNivel', width: '80px'},
		    		      { name: 'Sub Nivel', field: 'nomSubnivel', width: '80px'}
		    		      ,{ name: 'Domicilio', field: 'domicilio', width: '100px'}
		    		      ,{ name: 'Colonia', field: 'colonia', width: '50px'}
		    		      ,{ name: 'Código Postal', field: 'codigoPostal', width: '50px'}
		    		      ,{ name: 'Genero del Presidente', field: 'presidente', width: '50px'}
		    		      ,{ name: 'Calidad del Secretario', field: 'secretario', width: '50px'}
		    		      ,{ name: 'Integrantes', field: 'integrantes', width: '50px'}
		    		      ,{ name: 'Programa', field: 'programa', width: '50px'}
		    		      ,{ name: 'Monto', field: 'monto', width: '50px'}
		    		      ]];
		
	    ready(function(){
	    	
	    	 new Button({
		            label: "Regresar",
		            onClick: function(){
		            	window.location.href='<c:url value="/login.jsp"/>';
		            }
		        }, "regresar");
	    	 
	    	 
	    	 var lstEnt=xhr.get({
		            url:  urlBase+'catalogos/listEntidades',
		            sync: false,
		            preventCache:true,
		            contentType: "application/x-www-form-urlencoded; charset=utf-8",
		            handleAs: "json"
		        });
	    	 lstEnt.then(function(entidades){
	    		 var data= [{name:"[Seleccione]",id:"0"}];
	    		 for(var i in entidades){
	    			 data.push({name:entidades[i].nomEntidadfed,id:entidades[i].idEntidadfed});
	    		 }
	    		 var tentStore = new Memory({data:data});
	    		 
	    		 new FilteringSelect({
		             id: "entidadSelect",
		             value: 0,
		             store: tentStore,
		             searchAttr: "name"
		         }, "entidadSelect").on('change',function(){
		        	 
		        	 var lstMun=xhr.get({
				            url:  urlBase+'catalogos/listMunicipios/'+registry.byId('entidadSelect').get('value'),
				            sync: false,
				            preventCache:true,
				            contentType: "application/x-www-form-urlencoded; charset=utf-8",
				            handleAs: "json"
				        });
		        	 lstMun.then(function(municipio){
		        		var store=[{name:"[Seleccione]",id:"0"}];
			    		for(var i in municipio ){
		 	         		store.push({name:municipio[i].nomMunicipio,id:municipio[i].idMunicipio});
		 	         	}
		 	         	registry.byId('munucipioSelect').set('store',new Memory({data:store}));
		 	         	registry.byId('munucipioSelect').set('value',0);
		 	         	registry.byId('munucipioSelect').set('readOnly',false);
		        	 });
		         });
		         
		         new FilteringSelect({
		             id: "munucipioSelect",
		             value: 0,
		             readOnly:true,
		             searchAttr: "name"
		         }, "munucipioSelect");
	    	 });

	         
	    });
	    
	    getStatusConsejo= function(){
	    	 var entidad =registry.byId('entidadSelect').get('value');
	   		 var municipio=registry.byId('munucipioSelect').get('value');
	   		 if(entidad==0 ||municipio==0){
	   			 jsUtils.basicAlert('Seleccione los criterios de búsqueda');
	   			 return;
	   		 }
	   		var search={idEntidad:entidad,idMunicipio:municipio,
	   					consejoMun:true,apoyo:false,enlace:false, 
	   					joinSeguimiento:true,joinInfGral:false,statusCe:true};
	   			
	   		 var status=xhr.get({
			            url:  urlBase+'reportes/hasCm/'+entidad+'/'+municipio,
			            sync: false,preventCache:true,handleAs: "json",
			            contentType: "application/x-www-form-urlencoded; charset=utf-8"
			        });
	   		 
	   		var countMun=xhr.get({
	            url:  urlBase+'reportes/countCePubMun1415',
				content:search,sync: false,preventCache:true,handleAs: "json",
	            contentType: "application/x-www-form-urlencoded; charset=utf-8"
	        });
	   		var defs = new DeferredList([status, countMun]);
			 
			 defs.then(function(data){
				 var title='Módulo 1: Reporte de Existencia del Consejo Municipal de Participación Social en la Educación.';
	   			 var msg='No cuenta con Consejo Municipal de Participación Social en la Educacion';
	   			 var color='#F73B3B';
	   			 
	   			if (data[0][1]){
	   				 msg='Existe Consejo Municipal de Participación Social en la Educación y cuenta con el registro del Acta Constitutiva ante el REPUCE';
	   				 color='#77EB52';
	   			 }else if(data[1][1]>0){
	   				 msg='Existe Consejo Municipal de Participación Social en la Educación pero no se cuenta con el registro del Acta Constitutiva ante el REPUCE';
	   				 color='#FFFF00';
	   			 }
	   			 
	   			dlg(title,'<div style="background-color:'+color+';"><b>'+registry.byId('munucipioSelect').get('displayedValue')+':</b><br/>'+msg+'</div>');
	   		 });
   	 	};
   	 	
   	 	
   	 	
   		getListCeMun= function(){
   			var entidad =registry.byId('entidadSelect').get('value');
	   		var municipio=registry.byId('munucipioSelect').get('value');
	   		if(entidad==0 ||municipio==0){
	   			 jsUtils.basicAlert('Seleccione los criterios de búsqueda');
	   			 return;
	   		}
	   		
	   		var search1={idEntidad:entidad,idMunicipio:municipio,
   					consejoMun:false,apoyo:false,enlace:false, 
   					joinSeguimiento:false,joinInfGral:true,statusCe:true};
	   		var ListCeMun=xhr.get({
	            url:  urlBase+'reportes/cesPubMun1415',
	            content:search1,sync: false,preventCache:true,handleAs: "json",
	            contentType: "application/x-www-form-urlencoded; charset=utf-8"
	        });
	   		
	   		var search2={idEntidad:entidad,idMunicipio:municipio,
   					consejoMun:false,apoyo:false,enlace:false, 
   					joinSeguimiento:false,joinInfGral:false,statusCe:false};
	   		var CountCctMun=xhr.get({
	            url:  urlBase+'reportes/countCePubMunProgramas',
	            content:search2,sync: false,preventCache:true,handleAs: "json",
	            contentType: "application/x-www-form-urlencoded; charset=utf-8"
	        });
	   		
	   		var defs = new DeferredList([ListCeMun, CountCctMun]);
	   		
	   		defs.then(function(data){
	   			var LstCeMun=data[0][1];
	   			var CountCctMun=data[1][1];
	   			var color='#FFFF00';
	   			
	   			var data = {identifier: "cCct",
					    items: []};
   			
   			for (var i in LstCeMun){
   				if(LstCeMun[i].integrantes>0){
   				data.items.push({
   					cCct: LstCeMun[i].cCct, 
   					cveCct: LstCeMun[i].cveCct, 
   					nomCct: LstCeMun[i].nomCct,
   					nomTurno: LstCeMun[i].nomTurno,
   					nomNivel: LstCeMun[i].nomNivel,
   					nomSubnivel: LstCeMun[i].nomSubnivel,
   					domicilio:LstCeMun[i].domicilio,
   					colonia:LstCeMun[i].colonia,
   					codigoPostal:LstCeMun[i].codigoPostal,
   					presidente: LstCeMun[i].presidente,
   					secretario: LstCeMun[i].secretario,
   					integrantes: LstCeMun[i].integrantes
   				});}
   			}
   			
	   			var pct=number.round(((data.items.length*100)/CountCctMun),2);
	   			if (pct>=60){
	   				color='#77EB52';
	   			}else if (pct<=19){
	   				color='#F73B3B';
	   			}
	   			if(isNaN(pct)){
	   				color='#F73B3B';
	   				pct=0;
	   			}
	   			var msg='Cuenta con el '+pct+'% de Escuelas Públicas de Educación Básica con Consejo Escolar Registrado en la Primera Asamblea';
	   			var title='Módulo 2: Reporte de Consejos Escolares en las escuelas Públicas de Educación Básica por Municipio.';
	   			dlg(title,'<div style="background-color:'+color+';"><b>'+registry.byId('munucipioSelect').get('displayedValue')+':</b><br/>'+msg+'</div><div id="CePubMunDiv"/> <button id="imprimir" type="button" >Imprimir</button> <button id="exportar2" type="button" >Exportar</button>');
	   			
	   			
	   			var newStore = new ItemFileWriteStore({data: data});
	   			
	   			jsUtils.createTag('div','grid','CePubMunDiv','width: 700px; height: 300px;');
	   			
	   			/*
	   			new DataGrid({
			        id: 'gridDiv',
			        structure: layout,
			        store:newStore,
			        autoWidth:true,
			        rowSelector: '20px'},
			        'grid').startup();
	   		    
	   		  */
	   			new EnhancedGrid({
	   		        id: 'gridDiv',
	   		        store:newStore,
	   		        structure: layout,
	   		        autoWidth:true,
			        rowSelector: '20px',
	   		        plugins: {
	   		            printer: true,
	   		            exporter: true
	   		        }
	   		    },
		        'grid').startup();
	   		  
	            var cssFiles = [
	                            //urlStatic+'js/libs/dojox/grid/tests/enhanced/support/print_style1.css',
	                            //urlStatic+'js/libs/dojox/grid/tests/enhanced/support/print_style2.css'
	                            urlStatic+'js/libs/dojox/grid/enhanced/resources/EnhancedGrid.css',
	                            urlStatic+'js/libs/dojox/grid/enhanced/resources/EnhancedGrid_rtl.css'	                            
	                 ];

	            new Button({
		            label: "Imprimir",
		            onClick: function(){
		            	dijit.byId("gridDiv").printGrid({
		                    title: "Consulta Pública",
		                    cssFiles: cssFiles
		                });
		            }
		        }, "imprimir");
	            
	            
	            new Button({
		            label: "Exportar",
		            onClick: function(){
		            	var entidad =registry.byId('entidadSelect').get('value');
			            var municipio=registry.byId('munucipioSelect').get('value');                                                                
				                                                                                        			            
			            var params={                                                                          
			            		idEntidad:entidad,idMunicipio:municipio,
			            		consejoMun:false,apoyo:false,enlace:false, 
			   					joinSeguimiento:false,joinInfGral:true,statusCe:true                                 
						};                                                                                    
				                                                                                        
						jsUtils.XFRAME.call(urlBase+'exportarDocumentos/resultadosPublico1415Consejo', {
							callback: function(data){                                                            
								alert('sale');                                                                      
							},                                                                                   
							params:params});  
			
		            }
		        }, "exportar2");
	            
    
	   		});
   		};
   		
   		
   		
   		
   		getCeApoyoMun= function(){
   			var entidad =registry.byId('entidadSelect').get('value');
	   		var municipio=registry.byId('munucipioSelect').get('value');
	   		if(entidad==0 ||municipio==0){
	   			 jsUtils.basicAlert('Seleccione los criterios de búsqueda');
	   			 return;
	   		}
	   		
	   		var search1={idEntidad:entidad,idMunicipio:municipio,
   					consejoMun:false,apoyo:true,enlace:false, 
   					joinSeguimiento:true,joinInfGral:false,statusCe:true};
	   		var ListCeMun=xhr.get({
	            url:  urlBase+'reportes/cesPubMun1415Programas',
	            content:search1,sync: false,preventCache:true,handleAs: "json",
	            contentType: "application/x-www-form-urlencoded; charset=utf-8"
	        });
	   		
	   		var search2={idEntidad:entidad,idMunicipio:municipio,
   					consejoMun:false,apoyo:false,enlace:false, 
   					joinSeguimiento:false,joinInfGral:true,statusCe:true};
	   		var CountCctMun=xhr.get({
	            url:  urlBase+'reportes/countCePubMunProgramas',
	            content:search2,sync: false,preventCache:true,handleAs: "json",
	            contentType: "application/x-www-form-urlencoded; charset=utf-8"
	        });
	   		
			var defs = new DeferredList([ListCeMun, CountCctMun]);
	   		
	   		defs.then(function(data){
	   			var LstCeMun=data[0][1];
	   			var CountCctMun=data[1][1];
	   			var color='#F9AD20';
	   			var noRepetidos=0;
	   			if(LstCeMun.length==1){
	   				noRepetidos=1;
	   			}
	   			else{
	   			for(var i=0;i<LstCeMun.length;i++)
	   				{
	   				if(i==(LstCeMun.length-1)){
	   					
	   				}else{
	   				if(LstCeMun[i].cCct!=LstCeMun[i+1].cCct)
	   					{
	   					noRepetidos++;
	   					}
	   				}
	   				}
	   			}
	   			var pct=number.round(((noRepetidos*100)/CountCctMun),2);
	   			if (pct>=60){
	   				color='#77EB52';
	   			}else if (pct<=19){
	   				color='#F73B3B';
	   			}
	   			if(isNaN(pct)){
	   				color='#F73B3B';
	   				pct=0;
	   			}
				var msg='Cuenta con el '+pct+'% de Escuelas de Educación Básica con Consejo Escolar '+
                'que han reportado una o mas Gestiones y/o Apoyos con los programas Municipales o Locales '+
                'por parte del Consejo Municipal de Participación Social en la Educación';
				var title='Módulo 3: Reporte de Gestión Municipal y/o apoyo con los programas Municipales'+
				'en cada escuela Pública <br/>de Educación Básica por parte del Consejo Municipal de Participación Social en la Educación.';
	   			dlg(title,'<div style="background-color:'+color+';width:900px"><b>'+registry.byId('munucipioSelect').get('displayedValue')+':</b><br/>'+msg+'</div><div id="CePubMunDiv"/> <button id="imprimir" type="button" >Imprimir</button> <button id="exportar3" type="button" >Exportar</button>');
	   			
				var data = {identifier: "id",
						    items: []};
	   			
	   			
	   				for (var i in LstCeMun){
		   				data.items.push({
		   					id:i,
		   					cCct: LstCeMun[i].cCct, 
		   					cveCct: LstCeMun[i].cveCct, 
		   					nomCct: LstCeMun[i].nomCct,
		   					nomTurno: LstCeMun[i].nomTurno,
		   					nomNivel: LstCeMun[i].nomNivel,
		   					nomSubnivel: LstCeMun[i].nomSubnivel,
		   					domicilio:LstCeMun[i].domicilio,
		   					colonia:LstCeMun[i].colonia,
		   					codigoPostal:LstCeMun[i].codigoPostal,
		   					presidente: LstCeMun[i].presidente,
		   					secretario: LstCeMun[i].secretario,
		   					integrantes: LstCeMun[i].integrantes,
		   					programa: LstCeMun[i].programa,
		   					monto: LstCeMun[i].monto
		   				});
	   			}
	   			var newStore = new ItemFileWriteStore({data: data});
	   			
	   			jsUtils.createTag('div','grid','CePubMunDiv','width: 700px; height: 300px;');
	   			
	   			/*
	   			new DataGrid({
			        id: 'gridDiv',
			        structure: layout,
			        store:newStore,
			        autoWidth:true,
			        rowSelector: '20px'},
			        'grid').startup();
	   			*/
	   			new EnhancedGrid({
	   		        id: 'gridDiv',
	   		        store:newStore,
	   		        structure: layout2,
	   		        autoWidth:true,
			        rowSelector: '20px',
	   		        plugins: {
	   		            printer: true,
	   		            exporter: true
	   		        }
	   		    },
		        'grid').startup();
	            
	            var cssFiles = [
	                            urlStatic+'js/libs/dojox/grid/enhanced/resources/EnhancedGrid.css',
	                            urlStatic+'js/libs/dojox/grid/enhanced/resources/EnhancedGrid_rtl.css'
	                 ];

	            new Button({
		            label: "Imprimir",
		            onClick: function(){
		            	dijit.byId("gridDiv").printGrid({
		                    title: "Consulta Pública",
		                    cssFiles: cssFiles
		                });
		            }
		        }, "imprimir");
	            
	            new Button({
		            label: "Exportar",
		            onClick: function(){
		            	var entidad =registry.byId('entidadSelect').get('value');
			            var municipio=registry.byId('munucipioSelect').get('value');                                                                
				                                                                                        			            
			            var params={                                                                          
			            		idEntidad:entidad,idMunicipio:municipio,
			            		consejoMun:false,apoyo:true,enlace:false, 
			   					joinSeguimiento:true,joinInfGral:false,statusCe:true                                 
						};                                                                                    
				                                                                                        
						jsUtils.XFRAME.call(urlBase+'exportarDocumentos/resultadosPublicoConPrograma', {
							callback: function(data){                                                            
								alert('sale');                                                                      
							},                                                                                   
							params:params});  
			
		            }
		        }, "exportar3");	


        
	            
	   		 });
	   		
   		};
   		
   		getCeEnlaceMun= function(){
   			var entidad =registry.byId('entidadSelect').get('value');
	   		var municipio=registry.byId('munucipioSelect').get('value');
	   		if(entidad==0 ||municipio==0){
	   			 jsUtils.basicAlert('Seleccione los criterios de búsqueda');
	   			 return;
	   		}
	   		var search1={idEntidad:entidad,idMunicipio:municipio,
   					consejoMun:false,apoyo:false,enlace:true, 
   					joinSeguimiento:true,joinInfGral:false,statusCe:true};
	   		var ListCeMun=xhr.get({
	            url:  urlBase+'reportes/cesPubMun',
	            content:search1,sync: false,preventCache:true,handleAs: "json",
	            contentType: "application/x-www-form-urlencoded; charset=utf-8"
	        });
	   		
	   		var search2={idEntidad:entidad,idMunicipio:municipio,
   					consejoMun:false,apoyo:false,enlace:false, 
   					joinSeguimiento:false,joinInfGral:true,statusCe:true};
	   		var CountCctMun=xhr.get({
	            url:  urlBase+'reportes/countCePubMun',
	            content:search2,sync: false,preventCache:true,handleAs: "json",
	            contentType: "application/x-www-form-urlencoded; charset=utf-8"
	        });
	   		
			var defs = new DeferredList([ListCeMun, CountCctMun]);
	   		
			defs.then(function(data){
	   			var LstCeMun=data[0][1];
	   			var CountCctMun=data[1][1];
	   			var color='#F9AD20';
	   			var pct=number.round(((LstCeMun.length*100)/CountCctMun),2);
	   			if (pct>=60){
	   				color='#77EB52';
	   			}else if (pct<=19){
	   				color='#F73B3B';
	   			}
	   			if(isNaN(pct)){
	   				color='#F73B3B';
	   				pct=0;
	   			}
				var msg="Cuenta con el "+pct+"% de Escuelas de Educación Básica con Consejo Escolar "+
                "que han reportado el seguimiento de los resultados de la prueba Enlace por parte del Consejo "+
                "Municipal de Participación Social en la Educación";
				var title=' Reporte del seguimiento de los Resultados de la Prueba Enlace en cada escuela Pública '+
				'de Educación Básica con <br/>Consejo Escolar por parte del Consejo Municipal de Participación Social en la Educación.';
				
	   			dlg(title,'<div style="background-color:'+color+';width:900px"><b>'+registry.byId('munucipioSelect').get('displayedValue')+':</b><br/>'+msg+'</div><div id="CePubMunDiv"/> <button id="imprimir" type="button" >Imprimir</button> <button id="exportar4" type="button" >Exportar</button>');
	   			
				var data = {identifier: "cCct",
						    items: []};
	   			
	   			for (var i in LstCeMun){
	   				data.items.push({
	   					cCct: LstCeMun[i].cCct, 
	   					cveCct: LstCeMun[i].cveCct, 
	   					nomCct: LstCeMun[i].nomCct,
	   					nomTurno: LstCeMun[i].nomTurno,
	   					nomNivel: LstCeMun[i].nomNivel,
	   					nomSubnivel: LstCeMun[i].nomSubnivel
	   					,presidente: LstCeMun[i].presidente
	   					,secretario: LstCeMun[i].secretario
	   					,integrantes: LstCeMun[i].integrantes	
	   				});
	   			}
	   			var newStore = new ItemFileWriteStore({data: data});
	   			
	   			jsUtils.createTag('div','grid','CePubMunDiv','width: 700px; height: 300px;');
	   			
	   			/*
	   			new DataGrid({
			        id: 'gridDiv',
			        structure: layout,
			        store:newStore,
			        autoWidth:true,
			        rowSelector: '20px'},
			        'grid').startup();
	   			*/
	   			new EnhancedGrid({
	   		        id: 'gridDiv',
	   		        store:newStore,
	   		        structure: layout,
	   		        autoWidth:true,
			        rowSelector: '20px',
	   		        plugins: {
	   		            printer: true,
	   		            exporter: true
	   		        }
	   		    },
		        'grid').startup();
	   			
	            var cssFiles = [
	                            urlStatic+'js/libs/dojox/grid/enhanced/resources/EnhancedGrid.css',
	                            urlStatic+'js/libs/dojox/grid/enhanced/resources/EnhancedGrid_rtl.css'
	                 ];

	            new Button({
		            label: "Imprimir",
		            onClick: function(){
		            	dijit.byId("gridDiv").printGrid({
		                    title: "Consulta Pública",
		                    cssFiles: cssFiles
		                });
		            }
		        }, "imprimir");
	            
	            new Button({
		            label: "Exportar",
		            onClick: function(){
		            	var entidad =registry.byId('entidadSelect').get('value');
			            var municipio=registry.byId('munucipioSelect').get('value');                                                                
				                                                                                        			            
			            var params={                                                                          
			            		idEntidad:entidad,idMunicipio:municipio,
			            		consejoMun:false,apoyo:false,enlace:true, 
			   					joinSeguimiento:true,joinInfGral:false,statusCe:true                                 
						};                                                                                    
				                                                                                        
						jsUtils.XFRAME.call(urlBase+'exportarDocumentos/resultadosPublico', {
							callback: function(data){                                                            
								alert('sale');                                                                      
							},                                                                                   
							params:params});  
			
		            }
		        }, "exportar4");	

	
	        
	   		    
	   		 });
	   		
   		};
   	 	
   	    getCeMunGr= function(){
   	    	var entidad =registry.byId('entidadSelect').get('value');
   	    	if(entidad==0){
	   			 jsUtils.basicAlert('Seleccione los criterios de búsqueda');
	   			 return;
	   		 }
   	    	
   	    	var countCm=xhr.get({
	            url:  urlBase+'reportes/countCm/'+entidad,
	            sync: false,preventCache:true,handleAs: "json",
	            contentType: "application/x-www-form-urlencoded; charset=utf-8"   
	        });
   	    	var countMun=xhr.get({
	            url:  urlBase+'reportes/countMun/'+entidad,
	            sync: false,preventCache:true,handleAs: "json",
	            contentType: "application/x-www-form-urlencoded; charset=utf-8"
	        });
			 
   	    	var defs = new DeferredList([countCm, countMun]);
			 
			 defs.then(function(data){
				 var cCm=data[0][1];
				 var cMun=data[1][1];
				 var cctPor=parseFloat(((cCm/cMun)*100)).toFixed(0);
				 var cctPorNo=parseFloat((((cMun-cCm)/cMun)*100)).toFixed(0);
				 if(((cMun-cCm)/cMun)==1)
					 {
					 cctPorNo=0;
					 }
				 			 
				 dlg(' Módulo 5: Reporte de los Consejos Municipales de Participación Social en la Educación. ','<div id="chartdiv"/>');
				 var chart = new FusionCharts('<c:url value="/static/css/segundaSesion/FusionChartsFree/Charts/"/>FCF_Pie2D.swf', "ChartId", "500", "400");
				 chart.setDataXML(
			    			"<graph caption='TOTAL DE MUNICIPIOS DE "+registry.byId('entidadSelect').get('displayedValue')+" "+(cMun) +"' "+
			    			"showNames='1' showValues='1' animation='1'  decimalPrecision='0'  >"+
			    			"<set name='("+cctPor+" %) Con Consejo' value='"+cCm+"'  color='#77EB52'  isSliced='1'/>"+
			    			"<set name='("+cctPorNo+" %) Sin Consejo' value='"+(cMun-cCm)+"'  color='#FE0002'/>"+
			    			"</graph>"
			    			);	   
			    			chart.render("chartdiv");
			 });
   	    };
	    dlg=function(titulo,cnt){
	    	var dialog2 = new Dialog({
			    title:titulo,
			    content:'<div height:600">'+cnt+'</div>',
			    style: "width: 700;height:500"
	    	});
		    dialog2.show();
			dialog2.on('hide',function(){
				dialog2.destroyRecursive(false);
			});
			dialog2._setStyleAttr('left:30px !important;'); 
			dialog2._setStyleAttr('top:30px !important;');
	    };
	});
	</script>
</head>
<body class="tundra">

<div style="text-align:center; margin:auto;"><img src='<c:url value="/static/img/banner.jpg"/>' width="918" height="74" alt="banner logotipo CONAPASE" /></div>

<table  border="0" cellpadding="0" cellspacing="0" align="center" width="918">
	<tr>
	    <td align="center">
	       <strong><b><font size="3">REPORTES DE MOVIMIENTO MUNICIPAL</font></b></strong>
	    </td>
	</tr>
	<tr>
        <td colspan="3">
             <font color="#929292">
              <b>Seleccione los Criterios de B&uacute;squeda para emitir su Reporte.</b>
             </font>
             <font color="#929292" size="1px">
                 <br> Los campos marcados con (*) son obligatorios.
             </font>
         </td>
    </tr>
    <tr>
	    <td align="right">
	     <b>* Entidad Federativa:</b> <div id='entidadSelect'></div> <br/>
	     <b>* Municipio:</b> <div id='munucipioSelect'></div> <br/><br/>
	    </td>
	</tr>
	<tr>
	    <td>
	     	&Phi;  <a href="#" onclick="getStatusConsejo()" >Módulo 1: Reporte de Existencia del Consejo Municipal de Participación Social en la Educación. </a><br/><br/>

<!-- 			&Phi;  <a href="#" onclick="getListCeMun()" >Módulo 2: Reporte de Consejos Escolares en las escuelas Públicas de Educación Básica -->
			&Phi;  <a href="#">Módulo 2: Reporte de Consejos Escolares en las escuelas Públicas de Educación Básica
			      por Municipio. </a><br/><br/>
			
			&Phi;  <a href="#" onclick="getCeApoyoMun()" >Módulo 3: Reporte de Gestión Municipal y/o apoyo con los programas Municipales 
			      en cada  escuela Pública de Educación Básica por parte del Consejo
			      Municipal de Participación Social en la Educación. </a><br/><br/>
			
<!-- 			&Phi;  <a href="#" onclick="getCeEnlaceMun()" >Reporte del seguimiento de los Resultados de la Prueba Enlace en cada -->
<!-- 			    &Phi;   <a >Reporte del seguimiento de los Resultados de la Prueba Enlace en cada -->
<!-- 			      escuela  Pública de Educación Básica  con Consejo Escolar por parte del -->
<!-- 			      Consejo Municipal de Participación Social en la Educación. </a><br/><br/> -->
			
			&Phi;  <a href="#" onclick="getCeMunGr()" >Módulo 4: Reporte de los Consejos Municipales de Participación Social en la Educación. </a><br/><br/>
	    </td>
	</tr>
    
	<tr>
	    <td>
	      <button id="regresar" type="button"></button>
	    </td>
	</tr>

</table>

</body>
</html>