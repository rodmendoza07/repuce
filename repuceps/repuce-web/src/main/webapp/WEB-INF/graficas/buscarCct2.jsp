 <%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>

     
<% String contexto = request.getContextPath(); %>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">	
  	<title>Regreso a clases ciclo 2016-2017</title>
        
<!--
	<link rel="stylesheet" href='<c:url value="/static/css/style.css"/>' media="screen">
	<link rel="stylesheet" href='<c:url value="/static/css/segundaSesion/estilo.css"/>' media="screen">-->
	<link rel="stylesheet" href='<c:url value="/static/js/libs/dijit/themes/nihilo/nihilo.css"/>' media="screen">  
	<link href="https://framework-gb.cdn.gob.mx/assets/styles/main.css" rel="stylesheet">
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
  	      	debugAtAllCosts: false,
  	      	ioPublish: true,
  	      	cacheBust: true
  	    };
  	</script>
  	<script src="<%=contexto %>/static/js/libs/dojo/dojo.js"></script>
  	
  	<script>
  	
  	require(["dijit/Tooltip","dijit/form/ValidationTextBox","dijit/form/Button","dijit/registry","dojo/on", 
  	         "dojo/_base/xhr","dojo/_base/json","dijit/form/Select","dojo/DeferredList","app/util/jsUtils","app/util/constants",
  	         "dijit/form/RadioButton", "dojo/ready","dojo/dom","dojo","app/util/jsUtils","dojox/grid/DataGrid","dojo/data/ItemFileWriteStore",
  	       "dojox/grid/EnhancedGrid","dojo/store/Memory","dijit/form/FilteringSelect","dijit/form/RadioButton","dijit/form/Textarea",
  	     "dojox/widget/Standby"], 
  	   function(Tooltip,ValidationTextBox,Button,registry,on,xhr,json,Select,DeferredList,utils,constants,RadioButton, ready, 
  			   dom, dojo, jsUtils,DataGrid,ItemFileWriteStore,EnhancedGrid,Memory,FilteringSelect,RadioButton,Textarea,
  			 Standby){
//   		var urlBase='<c:url value="/mvc/"/>';
// 		var urlStatic='<c:url value="/static/"/>';
// 		var urlBasica='<c:url value="/"/>';  		
  		 var gcCct=0;
  		 var gTipoClave = 0;
  		var dataPC={};
  		var p1="";
  		var p2="";
  		var p3="";
  		var p4="";
  		var p5="";


		on( dom.byId('saveForm'), 'click', _guardar );
  		
  		var ceDenuncia= new Object();
  		 ready(function(){
  			 




//  	    	 var lstEnt=xhr.get({
//  		            url:  dojo.config.app.urlBase+'catalogos/listEntidades',
//  		            sync: false,
//  		            preventCache:true,
//  		            contentType: "application/x-www-form-urlencoded; charset=utf-8",
//  		            handleAs: "json"
//  		        });
//  	    	 lstEnt.then(function(entidades){
 	    		 var data= [{name:"[Seleccione]",id:"0"},
 	    		           	{name:"AGUASCALIENTES",id:"1"},
 	    		          	{name:"BAJA CALIFORNIA",id:"2"},
 	    		         	{name:"BAJA CALIFORNIA SUR",id:"3"},
 	    		        	{name:"CAMPECHE",id:"4"},
 	    		       		{name:"COAHUILA DE ZARAGOZA",id:"5"},
 	    		      		{name:"COLIMA",id:"6"},
 	    		     		{name:"CHIAPAS",id:"7"},
 	    		    		{name:"CHIHUAHUA",id:"8"},
 	    		   			{name:"CIUDAD DE MÉXICO",id:"9"},
 	    		  			{name:"DURANGO",id:"10"},
 	    		 			{name:"GUANAJUATO",id:"11"},
				    		{name:"GUERRERO",id:"12"},
				    		{name:"HIDALGO",id:"13"},
				    		{name:"JALISCO",id:"14"},
				    		{name:"MÉXICO",id:"15"},
				    		{name:"MICHOACÁN DE OCAMPO",id:"16"},
				    		{name:"MORELOS",id:"17"},
				    		{name:"NAYARIT",id:"18"},
				    		{name:"NUEVO LEÓN",id:"19"},
				    		{name:"OAXACA",id:"20"},
				    		{name:"PUEBLA",id:"21"},
				    		{name:"QUERÉTARO",id:"22"},
				    		{name:"QUINTANA ROO",id:"23"},
				    		{name:"SAN LUIS POTOSÍ",id:"24"},
				    		{name:"SINALOA",id:"25"},
				    		{name:"SONORA",id:"26"},
				    		{name:"TABASCO",id:"27"},
				    		{name:"TAMAULIPAS",id:"28"},
				    		{name:"TLAXCALA",id:"29"},
				    		{name:"VERACRUZ DE IGNACIO DE LA LLAVE",id:"30"},
				    		{name:"YUCATÁN",id:"31"},
				    		{name:"ZACATECAS",id:"32"}];
//  	    		 for(var i in entidades){
//  	    			 data.push({name:entidades[i].nomEntidadfed,id:entidades[i].idEntidadfed});
//  	    		 }
 	    		 var tentStore = new Memory({data:data});
	    		 
 	    		 new FilteringSelect({
 		             id: "entidadSelect",
 		             value: 0,
 		             store: tentStore,
 		             searchAttr: "name"
 		         }, "entidadSelect").on('change',function(){
		        	 
 		        	 var lstMun=xhr.get({
 				            url:  dojo.config.app.urlBase+'catalogos/listMunicipios/'+registry.byId('entidadSelect').get('value'),
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
 		 	         	registry.byId('tipoEscuela').set('value',0);
 		 	         	registry.byId('escuela').set('value',0);
 		 	         	registry.byId('munucipioSelect').set('readOnly',false);
 		        	 });
 		         });
		         
 		         new FilteringSelect({
 		             id: "munucipioSelect",
 		             value: 0,
 		             readOnly:true,
 		             searchAttr: "name"
 		         }, "munucipioSelect").on('change',function(){
 		        	if(registry.byId('munucipioSelect').get('value')!=0){  
 			  		
 		        		var dato1=registry.byId('entidadSelect').get('value');
 		        		var dato2=registry.byId('munucipioSelect').get('value');
 		        		 var dato3= Number(dato1);
 		        		var dato4= Number(dato2);
 		        		
 		        		var datos = {
 			  				idEnt :dato3 ,
 		         			//municipio : dom.byId('munucipioSelect').value
 		        			idMun : dato4
 		          		};
 		        	
 		        		console.log("esta es datos  "+datos);
 		        		console.log("esta es json  "+json.toJson(datos));
 		        		
 		        	 var lstMun1=xhr.get({
  		        		//var lstMun1=xhr.post({
 				            //url:  dojo.config.app.urlBase+'catalogos/escuelas/'+dato3+'/'+dato4,
 				           url:  dojo.config.app.urlBase+'catalogos/tipoEscuelas/'+dato3+'/'+dato4,
				            sync: false,
				       //     postData : json.toJson(datos),
 				            preventCache:true,
 				            contentType: "application/x-www-form-urlencoded; charset=utf-8",
 				            handleAs: "json"
 				        });
 		        		console.log("esta es la url  "+dojo.config.app.urlBase+'catalogos/escuelas');
		        	 lstMun1.then(function(escuela){
		        		 
		        		 
 		        		var store1=[{name:"[Seleccione]",id:"0"}];
 			    		for(var i in escuela ){
 		 	         		//store1.push({name:escuela[i].nomCct,id:escuela[i].cveCct});
 		 	         		store1.push({name:escuela[i].nomNivel,id:escuela[i].cNivel});
 		 	         	}
 		 	         	registry.byId('tipoEscuela').set('store',new Memory({data:store1}));
 		 	         	registry.byId('tipoEscuela').set('value',0);
 		 	         	registry.byId('escuela').set('value',0);
 		 	         	registry.byId('tipoEscuela').set('readOnly',false);
 		        	 });
		        	 
 		         }
 		         });
 	    	 });

			new FilteringSelect({
	 		             id: "tipoEscuela",
 			             value: 0,
 			             searchAttr: "name",
 			            	readOnly:true,
 					 }, "tipoEscuela").on('change',function(){
						if(registry.byId('tipoEscuela').get('value')!=0){  
 	 			  		
 	 		        		var dato1=registry.byId('entidadSelect').get('value');
 	 		        		var dato2=registry.byId('munucipioSelect').get('value');
 	 		        		var dato3=registry.byId('tipoEscuela').get('value');
 	 		        		var dato4= Number(dato1);
 	 		        		var dato5= Number(dato2);
 	 		        		var dato6= Number(dato3);
 	 		        		
 	 		        		var datos = {
 	 			  				idEnt :dato4 ,
 	 		         			idMun : dato5,
 	 		         			cNivel : dato6,
 	 		          		};
 	 		        	
 	 		        		console.log("esta es datos  "+datos);
 	 		        		console.log("esta es json  "+json.toJson(datos));
 	 		        		
 	 		        	 var lstMun2=xhr.get({
 	  		        		    url:  dojo.config.app.urlBase+'catalogos/escuelas2/'+dato4+'/'+dato5+'/'+dato6,
 	 				            sync: false,
 					            preventCache:true,
 	 				            contentType: "application/x-www-form-urlencoded; charset=utf-8",
 	 				            handleAs: "json"
 	 				        });
 	 		        		
 			        	 lstMun2.then(function(escuela){
 			        		 
 			        		 
 	 		        		var store1=[{name:"[Seleccione]",id:"0"}];
 	 			    		for(var i in escuela ){
 	 		 	         		store1.push({name:escuela[i].nomCct,id:escuela[i].cveCct});
 	 		 	         		
 	 		 	         	}
 	 		 	         	registry.byId('escuela').set('store',new Memory({data:store1}));
 	 		 	         	registry.byId('escuela').set('value',0);
 	 		 	         	registry.byId('escuela').set('readOnly',false);
 	 		        	 });
 			        	 
 	 		         }
 	 		         });
 					 


			new FilteringSelect({
	 		             id: "escuela",
 			             value: 0,
 			             readOnly:true,
 				         searchAttr: "name"
 					 }, "escuela");

  			var myButtonBuscar = new Button({
	            label: " Buscar ",
	            onClick: function(){
	            	 _getTurnos();
	            }
	        }, "progButtonNode");	
  			
  			var validText = new ValidationTextBox({
 	           type:"text",  
 	           name:"cve_cct", 
 	           value:"", trim:"true", uppercase:"true",                                   
 	           required:"true",
 	           promptMessage:" Ingrese el cct "
 	       }, "cve_cct");  			  			  			
  		// });
  		

		function _getTurnos(){  		 
		       var cveCct={cveCct:registry.byId('cve_cct').get('value')};
	  		   
	  		   dom.byId("cveCct").innerHTML="";
	  		   gcCct = "";
	  		   dom.byId("nomCct").innerHTML="";
	      	   dom.byId("nomLocalidad").innerHTML="";
	      	   dom.byId("nomMunicipio").innerHTML="";
	  	   	   dom.byId("nomEntidadfed").innerHTML=""; 
		       
		       var urlJson=dojo.config.app.urlBase + 'catalogos/ListCct/';
		       console.log( urlJson );	       
		        xhr.get({
		            url: urlJson,
		            sync: false,
		            content:cveCct,
		            contentType: "application/x-www-form-urlencoded; charset=utf-8",
		            handleAs: "json",
		            handle: function(response){
	                	
		            	if(response.length==0){	
							jsUtils.cstmAlert("No se encontr\u00F3 el Centro Escolar");
							return;	
		            	}else if(response.length>0){
		                	
		                    _getInfCct(response[0].cCct);
		                    return;
		            	}
		               	gTipoClave = 1;
	
		            },
		            error: function(error){
		            	utils.basicAlert(json.toJson(error));
		            }
	
	  			});
	        	        
  	 	}


function _getInfCct(cCct){
    	 document.getElementById('tableCct').style.display="inline";
    	 
  	   gCct=cCct;
  	   var infCct=xhr.get({
             url: dojo.config.app.urlBase + 'reuniones/listReuniones/'+cCct,
             sync: false,
             contentType: "application/x-www-form-urlencoded; charset=utf-8",
             handleAs: "json"
         } );	
  	   
  	   var cSesion=xhr.get({
             url: dojo.config.app.urlBase + 'catalogos/listSesiones/',
             sync: false,
             contentType: "application/x-www-form-urlencoded; charset=utf-8",
             handleAs: "json"
         } );	
  	   
  	 	
       

	   
	   
  	   var defs = new DeferredList([infCct, cSesion]);
  	   defs.then(function(results){
  		   var cct= results[0][1].cct;
  		   var ubicacionCct= results[0][1].ubicacionCct;
  		   var ceInfGral= results[0][1].ceInfGral;
  		   var listReuniones= results[0][1].reuniones;
  		   var listCSesion= results[1][1];
  		 
  		   
  		   

		   layout = [[	 
		               	  { name: 'Nombre', field: 'nombre',  width:'150px'},
			    		  { name: 'Tipo', field: 'tipo',  width:'150px'}
			        ]];
		   
  		   
  		 try{
  		   
  		   dom.byId("cveCct").innerHTML=cct.cveCct;
  		   gcCct = cct.cCct;
  		   p1=cct.cveCct;
  		   dom.byId("nomCct").innerHTML=cct.nomCct;
         	         	   p2=cct.nomCct;
      	 if(ubicacionCct.localidad.nomLocalidad != null && ubicacionCct.localidad.nomLocalidad != "" && 
      	    ubicacionCct.localidad.nomLocalidad !="null" && ubicacionCct.localidad.nomLocalidad !="undefined" ){
      		dom.byId("nomLocalidad").innerHTML=ubicacionCct.localidad.nomLocalidad;
      	 }
      	   
      	 p3=ubicacionCct.localidad.nomLocalidad;
      	 if(ubicacionCct.municipio.nomMunicipio != null && ubicacionCct.municipio.nomMunicipio != "" && 
      		ubicacionCct.municipio.nomMunicipio !="null" && ubicacionCct.municipio.nomMunicipio !="undefined" ){
      		dom.byId("nomMunicipio").innerHTML=ubicacionCct.municipio.nomMunicipio;
      	 }
  	   	   p4=ubicacionCct.municipio.nomMunicipio;
  	   	 if(ubicacionCct.entidad.nomEntidadfed != null && ubicacionCct.entidad.nomEntidadfed != "" && 
  	   		ubicacionCct.entidad.nomEntidadfed !="null" && ubicacionCct.entidad.nomEntidadfed !="undefined" ){
  	   	    dom.byId("nomEntidadfed").innerHTML=ubicacionCct.entidad.nomEntidadfed; 
  	   	 }  	   	   
  	   	 
  	   	 p5=ubicacionCct.entidad.nomEntidadfed;
	   
  	   
			dataPC = {identifier: "nombre",
				    items: []};
			

		        

	    
  	             	         	  
  		 }catch(e){
  			utils.basicAlert(e);
  		 }
      	     	   

  	    });
     }          

  		
	  	 function _guardar(){
			




	 document.getElementById('divD').style.display='none';

			console.log( 'ITEM SELECTED ENTIDAD:' + registry.byId('entidadSelect').get('value'));

			if( !registry.byId('entidadSelect').isValid() || registry.byId('entidadSelect').get('value')== 0 ){

				document.getElementById('divD').style.display='block';
				document.getElementById('divD').focus();
				return;
			}

			if( !registry.byId('munucipioSelect').isValid() || registry.byId('munucipioSelect').get('value')== 0 ){

				document.getElementById('divD').style.display='block';
				document.getElementById('divD').focus();
				return;
			}

			if( !registry.byId('tipoEscuela').isValid() || registry.byId('tipoEscuela').get('value')== 0 ){

				document.getElementById('divD').style.display='block';
				document.getElementById('divD').focus();
				return;
			}
			
			if( !registry.byId('escuela').isValid() || registry.byId('escuela').get('value')== 0 ){

				document.getElementById('divD').style.display='block';
				document.getElementById('divD').focus();
				return;
			}

			if( document.getElementById("observaciones").value == '' ){
				document.getElementById('divD').style.display='block';
				document.getElementById('divD').focus();
				return;
			}

			
			if( !document.getElementById("anonimo").checked ){
				
				
				if( document.getElementById("name").value == '' ){

					document.getElementById('divD').style.display='block';
					document.getElementById('divD').focus();
					return;
				}				
				
				if( document.getElementById("firstName").value == '' ){

					document.getElementById('divD').style.display='block';
					document.getElementById('divD').focus();
					return;
				}
				var mailPattern ="(^[0-9a-zA-Z]+(?:[._\\-0-9a-zA-Z]+)*)@([0-9a-zA-Z]+(?:[._-][0-9a-zA-Z]+)*\\.[0-9a-zA-Z]{2,3})$";
				if( document.getElementById("mail").value == '' ){

					document.getElementById('divD').style.display='block';
					document.getElementById('divD').focus();
					return;
				}


				var patt = new RegExp(mailPattern);
				if( ! patt.test( document.getElementById("mail").value ) ){
					document.getElementById('divD').style.display='block';
					document.getElementById('divD').focus();
					return;
				}
				//				 console.log( 'is mail valid:' +  );

				
			}
			

	  		 var ceDenuncia = {
        			cct : registry.byId('escuela').get('value'),
         			nombrecct : dom.byId("escuela").value,
         			entidad :dom.byId('entidadSelect').value ,
         			localidad : p4,
         			municipio : dom.byId('munucipioSelect').value,
         			observaciones : dom.byId("observaciones").value,
                    reporte : (dom.byId('single').checked ? "Escuela cerrada ":dom.byId('married').checked ? "Escuela funcionando parcialmente":dom.byId('single1').checked ? "Falta de personal ":dom.byId('single2').checked ? "Cobro de cuotas":"Otro"),
         			anonimo : (dom.byId('anonimo').checked ? 1:2),
 					nombre : dom.byId('name').value,
 					apellidopaterno : dom.byId('firstName').value,
 					apellidomaterno : dom.byId('secondName').value,
 					correo : dom.byId('mail').value,
 					ocupacion : dom.byId('name1').value,
 					edad : dom.byId('edad').value,
 					sexo : (dom.byId('male').checked ? "Hombre":dom.byId('female').checked?"Mujer":'')
          		};
			/*        	       	
			if( true ){
				

				alert('Saved');
				return;
			}*/
	  		
	  		var urlJson=dojo.config.app.urlBase + 'catalogos/saveDenuncia';
	  		
 	xhr.post({
 				url : urlJson,
 				postData : json.toJson(ceDenuncia),
 				headers : {
 					"Content-Type" : "application/json; charset=UTF-8"
 				},
 				handleAs : 'json',
 				handle : function(response) {
					console.log( "entro al post ");
					console.log( "este es el valor de response: "+response);
	            					
					if (response!=1) {
	                	utils.cstmAlert('Ocurri\u00F3 un error al registrar la informaci\u00F3n');
	                	
					} else {
						top.location='success.jsp';
//						utils.cstmAlert('La informaci\u00F3n se registr\u00F3 correctamente.');						
						
					}
				}
			});	  	
	 
	}
	  	 
	  	 
  	}
  );
  	 
  	</script>

<script type="text/javascript">
	function showOrHide( checked ){
		if( checked ){
		document.getElementById('byCCT').style.display='block';
		document.getElementById('bySearch').style.display='none';
		}else{
			document.getElementById('bySearch').style.display='block';
			document.getElementById('byCCT').style.display='none';
		}
	}

	function _guardar2(){
		alert('send xrrPost');
	}
</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-82819746-1', 'auto');
  ga('send', 'pageview');

</script>

</head>
    
    
	<body scrolling="yes" class="nihilo" onload="window.onload()">
	<?php include_once("analyticstracking.php") ?>
		<main class="page">
			<img src="http://www.sep.gob.mx/work/models/sep1/Resource/100/reporte_escolar_16.jpg" width="100%" height="100%" alt="banner">
			<div class="container">

      			<h3>La verdadera transformaci&oacute;n del pa&iacute;s  empieza en la escuela: reporta las irregularidades que impidan que todos los  ni&ntilde;os, ni&ntilde;as y j&oacute;venes de M&eacute;xico tengan acceso a una educaci&oacute;n de calidad</h3>
      			<hr class="red">


				<div class="alert alert-danger" tabindex="0" id="divD" style="display: none;">
					<strong>¡Error de Registro! </strong>
					<span id="lblD">alguna validaci&oacute;n no cumple o no ha llenado los campos requeridos. Por favor verifique.</span>
				</div>	

				<h4>   &iquest;Sabes de alguna escuela cerrada?,  &iquest;d&oacute;nde no se est&eacute; cumpliendo con los horarios de clases o se cobren cuotas?</h4>
                <p> </p>
				<p><br><center>&iexcl;Ayuda a tu comunidad escolar con  un reporte!</center></p> 
       		<p>&nbsp; </p>
			<form role="form">
        			<h3>Información de la escuela</h3>
      				<hr>


<%--					 <div class="row">
        <p>
            <label>
              <input type="checkbox" id="buscaCCT" onclick="javascript:showOrHide(this.checked)">
              Conozco la Clave del Centro de Trabajo (CCT) de mi escuela
            </label>
        </p>
      </div>--%>
			<div id="byCCT" style="display:none">
				<div class="row">
        
					<div class="col-md-4">
						<div class="form-group">
							<label class="control-label">
								Clave de Centro de Trabajo<span id="required_cve_cct" class="text-muted">*</span>:
							</label>
	                  		<input name="cve_cct" id="cve_cct" placeholder="Escriba el CCT" >
	                  		<button id="progButtonNode"></button>
	                  	</div>
              		</div>					
              	</div>

				<div class="row">
					<div class="col-md-8">
					 <table class="table" id="tableCct">

                        
                                                <tr>
                            <td>
                                CCT: <span id="cveCct" class="datosCct"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Nombre del Centro Escolar: <span id="nomCct" class="datosCct"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Entidad Federativa: <span id="nomEntidadfed" class="datosCct"/>
                            </td>
                        </tr>                        
                        <tr>
                            <td>
                                Localidad: <span id="nomLocalidad" class="datosCct"/>
                            </td>
                        </tr>                        
                        <tr>
                            <td>
                                 Municipio: <span id="nomMunicipio" class="datosCct"/>
                            </td>
                        </tr>
					</table>
					</div>
					<div class="col-md-4">
						<hr/>
					</div>
				</div>

			</div>
			<div id="bySearch">


					
				<div class="row">					
					<div class="col-md-4">
						<div class="form-group">
							<label class="control-label">Entidad Federativa<span id="required_entidadSelect" class="text-muted">*</span>:</label>
							<div id='entidadSelect'></div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label class="control-label">Municipio<span id="required_munucipioSelect" class="text-muted">*</span>:</label>
							<div id='munucipioSelect'></div>
						</div>
					</div>
				</div>


				
				
				<div class="row">


					<div class="col-md-4">
						<div class="form-group">
							<label class="control-label">Tipo de escuela<span id="required_tipoEscuela" class="text-muted">*</span>:</label>
							<div id='tipoEscuela'></div>
						</div>
					</div>
					

					<div class="col-md-4">
						<div class="form-group">
							<label class="control-label">Nombre de la escuela<span id="required_escuela" class="text-muted">*</span>:</label>
							<div id='escuela'></div>
						</div>
					</div>
				</div>
			</div>
				



 <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Reporte<span class="form-text">*</span>:</label>
                      <div>
                        <label class="radio-inline">
                          <input id="single" type="radio" name="maritalStatus" value="0" checked> Escuela cerrada
                        </label>
                      </div>
                      <div>
                        <label class="radio-inline">
                          <input id="married" type="radio" name="maritalStatus" value="1"> Escuela funcionando parcialmente
                        </label>
                      </div>
					  <div>
                        <label class="radio-inline">
                          <input id="single1" type="radio" name="maritalStatus" value="2" checked> Falta de Personal
                        </label>
                      </div>
					  <div>
                        <label class="radio-inline">
                          <input id="single2" type="radio" name="maritalStatus" value="3" checked> Cobro de cuotas
                        </label>
                      </div>
					  <div>
                        <label class="radio-inline">
                          <input id="single3" type="radio" name="maritalStatus" value="4" checked> Otro
                        </label>
                      </div>
                   </div>
                  </div>
                  
                  <div class="col-md-8">
                    <div class="form-group">
                    <label for="name">Observaciones<span class=		"form-text">*</span>:</label>
                      <textarea id="observaciones" class="form-control" rows="3" placeholder="Escribe aquí la situación que deseas reportar"></textarea>
                    </div>
                  </div>  
         </div>         
      <div class="row">
          <div class="col-md-8 col-md-offset-4">
              <hr>
          </div>
      </div>

<p>Si no localizas tu escuela, favor de enviar un correo electr&oacute;nico a <a href="mailto:notificaciones@sep.gob.mx">notificaciones@sep.gob.mx</a></p>
<p>          
      <h3>Datos de contacto</h3>
      <hr>  
      
      <div class="checkbox">
                  <p>
                    <label>
                      <input type="checkbox"  id="anonimo" onclick="javascript: this.checked?document.getElementById('datosContacto').style.display='none':document.getElementById('datosContacto').style.display='block';">
                      Deseo que mi reporte sea anónimo
                    </label>
                  </p>
                  <p>&nbsp;</p>
      </div>
      
    <div id="datosContacto" >
  
	<div>
		<p>
		 <label>
Tu reporte ayuda a que todas y todos tengan  acceso a una educaci&oacute;n de calidad, llena los siguientes campos si deseas  permanecer en contacto con la SEP y recibir informaci&oacute;n de sus programas.
         </label>
         </p>
	</div>

	      <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="name">Nombre(s)*:</label>
                      <input type="text" id="name" class="form-control" placeholder="Ingrese su nombre">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="firstName">Primer apellido<span class="form-text">*</span>:</label>
                      <input type="text" id="firstName" class="form-control" placeholder="Ingrese su primer apellido">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="secondName">Segundo apellido<span class="form-text"></span>:</label>
                      <input type="text" id="secondName" class="form-control" placeholder="Ingrese su segundo apellido">
                    </div>
                  </div>
          </div>
           <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                      <label for"mail">Correo electrónico<span class="form-text">*</span>:</label>
                      <input type="email" id="mail" class="form-control" placeholder="ejemplo@dominio.com">
                    </div>
                  </div>
  
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="name">Ocupación<span class="form-text"></span>:</label>
                      <input type="text" id="name1" class="form-control" placeholder="Ingrese su ocupación">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                    <label   for="name">Edad<span class=		"form-text"></span>:</label>
                    <select id ="edad" class="form-control">
                       <option value="De 0 a 14 años">De 0 a 14 años</option>
                       <option>De 15 a 25 años </option>
                       <option>De 26 a 40 años</option>
                       <option>Mayor de 41 años</option>
                    </select>
                  	</div>   
                  </div> 
            </div>
    	
  		    <div class="row">                
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Sexo<span class="form-text"></span>:</label>
                      <div>
                        <label class="radio-inline">
                          <input id="male" type="radio" name="gender" value="0"> Hombre
                        </label>
                        <label class="radio-inline">
                          <input id="female" type="radio" name="gender" value="0"> Mujer
                        </label>
                      </div>
                    </div>
            </div>
        </div>                        
     </div>         
              	</form>
				 <button class="btn btn-primary pull-right"  type="button" id="saveForm" <%--onclick="javascript:_guardar2()"--%> >Enviar</button>
    <div class="row">
          <div class="col-md-8 col-md-offset-4">
              <hr>
          </div>
      </div>
             </div>


		</main>
     	<script src="https://framework-gb.cdn.gob.mx/gobmx.js"></script>
    </body>
</html>   
                           
                  
