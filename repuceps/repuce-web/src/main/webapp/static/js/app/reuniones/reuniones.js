define(["dijit/Tooltip","dijit/form/ValidationTextBox","dijit/form/Button",
        "dojo/dom","dijit/registry","dojo/on", "dojo/_base/xhr","dojo/dom-construct",
        "dojo/_base/json","dijit/form/Select","dojo/DeferredList","app/util/jsUtils",
        "app/util/constants","app/reuniones/capturaDatosGenerales", "app/reuniones/modificacionDirector"], 
function( Tooltip,ValidationTextBox,Button,dom,registry,on,xhr,domConstruct,json,Select,DeferredList,utils,constants,
		capturaDG, modificacionDirector){

	var gCct=0;
	var gStatus=0;
    eval('var _usuario='+dom.byId('usuario').value);
	
    function init(config){
		config.contenedor.set('content', config.template);  
        load();
    }
    
    function load(){
	   var reuniones=[];
	   for(var i=1;i<8;i++){
		   reuniones.push({disponibilidad:0,status:0,nomReunion:constants.NOM_SESION(i),contenido:' <h3>No Disponible</h3><p>...</p>'});
	   }      

	   if(_usuario.roles!='ROLE_CCT'){
		   /*busqueda de c_cct*/   
	       new Button({
	           label: " BUSCAR ",
	           onClick: function(){
	              _getTurnos();
	           }
	       }, "progButtonNode");

	       new ValidationTextBox({
	           type:"text",  
	           name:"cve_cct", 
	           value:"", trim:"true", uppercase:"true",                                   
	           required:"true",
	           regExp:constants.CVE_CCT_VALID,
	           promptMessage:" Ingrese el cct "
	       }, "cve_cct");
	        _createAcordion(reuniones);
	   }else{
		   dom.byId('progButtonNode').style.display='none';
		   new ValidationTextBox({
	           type:"text",  
	           name:"cve_cct", 
	           value:_usuario.username, trim:"true", uppercase:"true",                                   
	           required:"true",
	           readOnly:true,
	           regExp:constants.CVE_CCT_VALID,
	           promptMessage:" Ingrese el cct "
	       }, "cve_cct");
		   _getTurnos();
	   }
	   
   }
   
   
   function _createAcordion(reuniones){
	   utils.createTag('div','acrbody', 'acrCnt');
	   utils.createTag('div','informeDiv', 'informeTD');
	   var acordion='';
	   var tieneCuartaSesion = false;
	   var capturoCURP = false;
       /*Creacion del acordion*/
       for(var i in reuniones) {
           var candado='';
           var status='';
           

           if(reuniones[i].disponibilidad==1)
               candado='<img src="static/img/candado_a.png"  id="disp'+i+'"/>';
           else
               candado='<img src="static/img/candado_c.png" id="nodisp'+i+'"/>';

           if(reuniones[i].status==1)
               status='<img src="static/img/statusv.png" id="realizado'+i+'"/>';
           else
               status='<img src="static/img/statusg.png" id="pendiente'+i+'"/>';

           //El CCT cuenta con la cuarta sesión registrada
           if(reuniones[i].cSesion==constants.CUARTA_SESION && reuniones[i].status==1){
        	   tieneCuartaSesion = true;
           }
        	   
           acordion=acordion+'<div id="tablas">'+            
                       '<table border="0" width="100%" align="center">'+
                           '<tr>'+
                               '<td width="20%" align="center">'+candado+'</td>'+
                               '<td width="15%" align="center">'+status+'</td>'+
                               '<td width="25%" align="center" style="font-weight: bold;">'+reuniones[i].nomReunion+'</td>'+
                               '<td width="13%" align="center"><a href="#"><img src="static/img/edit.png" border="0" id="edit'+reuniones[i].cSesion+'" /></a></td>'+
                               '<td width="13%" align="center"><a href="#"><img src="static/img/trash.png" border="0" id="trash'+i+'"/></a></td>'+
                               '<td width="14%" align="center"><a href="#"><img src="static/img/print.png" border="0"id="print'+i+'"/></a></td>'+
                           '</tr>'+
                       '</table>'+
                   '</div>'+
                   '<div class="accordion" id="section1"><span></span></div>'+
                   '<div class="container">'+
                       '<div class="content">'+reuniones[i].contenido+' </div>'+
                   '</div>'; 
       }        
       
       var informeLinkStr = '';
       var imgName = '';
       
       //Si llevó a cabo el registro de su cuarta sesión
       if(tieneCuartaSesion){

    	   //Verifica si todos los integrantes del CEPS tienen registrada su CURP
           capturoCURP = _capturoCURPIntegrantes();
    	   
    	   if(!capturoCURP){
    		   imgName = 'checklist-gris.png';
    	   }else{ 
    		   imgName = 'checklist.png';
    	   }
       }else{//Si no registró su 4S se deshabilita el ícono
		   imgName = 'checklist-gris.png';
       }

       
	   informeLinkStr = '<a href="#"><img src="static/img/'+imgName+'"  id="linkInforme" border="0" /></a>';

       dom.byId('informeDiv').innerHTML=informeLinkStr;
       new Tooltip({connectId: ['linkInforme'],
           label: "Imprimir Informe de Transparencia "});
	   
       //Si llevó a cabo el registro de su cuarta sesión
       if(tieneCuartaSesion){
    	   if(!capturoCURP){//Si algún integrante le falta el registro de su CURP
        	   on( dom.byId('linkInforme'),'click', function(){
        		   utils.cstmAlert(
    			   'Para imprimir el Informe de Transparencia, primero debe captuar correctamente ' + 
    			   'la CURP de todos y cada uno de los integrantes de su Consejo Escolar');
        	   });
    	   }else{
    		   //En caso de que tenga registrada su CEPS, se procede con la impresión del Informe de Transparencia 
	    	   on( dom.byId('linkInforme'),'click', function(){
	    		   window.open(dojo.config.app.urlBase + 'documentos/informeTransparencia/'+gCct, null, 
	    				   'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	    	   });
    	   }
    	   
       }else{
    	   //Si no cuenta con el registro de su 4S, el informe no puede ser impreso.
    	   on( dom.byId('linkInforme'),'click', function(){
    		   utils.cstmAlert(
			   'Para imprimir el Informe de Transparencia, primero debe captuar la Cuarta Sesi\u00F3n');
    	   }); 
       }
       

       dom.byId('acrbody').innerHTML=acordion;
       /*tooltips*/
       for(var i in reuniones) {
    	   
    	   var edit="edit"+reuniones[i].cSesion;
           new Tooltip({connectId: [edit],
               label: "Editar reuni\u00F3n "});
           if(reuniones[i].disponibilidad==1){
        	   on( dom.byId(edit),'click', function(){
        		   _editarReunion(this.id, reuniones);
        	   });     	   
           }
           
           var trash="trash"+i;
           new Tooltip({connectId: [trash],
               label: "Eliminar reuni\u00F3n "});
           if(reuniones[i].status==1){
        	   on( dom.byId(trash),'click', function(){
        		   _eliminarReunion(this.id);
        	   });     	   
           }
           
           var print="print"+i;
           new Tooltip({connectId: [print],
               label: "Imprimir acta "});
           if(reuniones[i].status==1){
        	   on( dom.byId(print),'click', function(){
        		   _imprimirReunion(this.id);
        	   });     	   
           }else{
        	   on( dom.byId(print),'click', function(){
        		   _docBlancoReunion(this.id);
        	   });        	   
           }
           
           new Tooltip({connectId: ["disp"+i],
               label: "Disponible "});
           new Tooltip({connectId: ["nodisp"+i],
               label: "No disponible "});
           new Tooltip({connectId: ["realizado"+i],
               label: "Realizada "});
           new Tooltip({connectId: ["pendiente"+i],
               label: "Pendiente "});
       }
       /*JQuery*/
       //custom animation for open/close
       $.fn.slideFadeToggle = function(speed, easing, callback) {
           return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
       };

       $('.accordion').accordion({
           //defaultOpen: 'section1',
           cookieName: 'nav',
           speed: 'slow',
           animateOpen: function (elem, opts) { //replace the standard slideUp with custom function
               elem.next().slideFadeToggle(opts.speed);
           },
           animateClose: function (elem, opts) { //replace the standard slideDown with custom function
               elem.next().slideFadeToggle(opts.speed);
           }
       });

   
   }
   
   function _capturoCURPIntegrantes(){
	   var result = false;
	   
       xhr.get({
           url: dojo.config.app.urlBase + 'cuartaSesion/isInformeAccesible/'+gCct,
           sync: true,
           preventCache:true,
           contentType: "application/x-www-form-urlencoded; charset=utf-8",
           handleAs: "json",
           load: function(response){
               
        	   result = response;

           }
       });
       
       console.log(result);
       
       return result;

   }
   
   function _getTurnos(){
	   
	   var cveCct={cveCct:registry.byId('cve_cct').get('value')};
       
       var urlJson=dojo.config.app.urlBase + 'catalogos/ListCct';
        xhr.get({
            url: urlJson,
            sync: false,
            preventCache:true,
            content:cveCct,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            handleAs: "json",
            load: function(response){
                
                if(response.length>1){
                    var turnos = new Array({label:'[Seleccione]', value: 0});
                    
                    for (var i in response){
                       turnos.push({label: response[i].nomTurno, value: response[i].cCct}); 
                    }
                    
                    if(registry.byId('nomTurno')){
                    	
                    	var opts=registry.byId('nomTurno').getOptions();
                    	registry.byId('nomTurno').removeOption(opts);
                    	registry.byId('nomTurno').addOption(turnos);
                    	
                    }else{
                    	utils.createTag('ins','nomTurno', 'infCct');
                    	var s= new Select({
                            name: "nomTurno",
                            options: turnos
                        },'nomTurno');
                        s.startup();
                        s.on("change", function(){
                        	if(registry.byId('nomTurno').get('value')!=0)
                        		_getInfCct(registry.byId('nomTurno').get('value'));
                        });
                    }
                }else if(response.length==1){
                	utils.createTag('ins','nomTurno', 'infCct');
                    dom.byId('nomTurno').innerHTML=response[0].nomTurno;
                    _getInfCct(response[0].cCct);
                }else{
                	utils.cstmAlert('No se encontr\u00F3 el Centro Escolar');
                }

            },
            error: function(error){
        		var patt1=new RegExp('statusText":"(El centro de trabajo con clave [0-9A-Z]{10} no pertenece a su entidad)"');
        		var mssg = patt1.exec(error.responseText);
        		
            	if(mssg.length > 1){
            		utils.cstmAlert(mssg[1]);
            	}else{
            		utils.cstmAlert(json.toJson(error));
            	}
            }
        } );	
   }
   
   var listReuniones= new Object();
   
   function _getInfCct(cCct){
	   gCct=cCct;
	   
	   var infCct=xhr.get({
           url: dojo.config.app.urlBase + 'reuniones/listReuniones/'+cCct,
           sync: false,
           preventCache:true,
           contentType: "application/x-www-form-urlencoded; charset=utf-8",
           handleAs: "json"
       } );	
	   
	   var cSesion=xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listSesiones',
           sync: false,
           preventCache:true,
           contentType: "application/x-www-form-urlencoded; charset=utf-8",
           handleAs: "json"
       } );	
       
	   
	   var defs = new DeferredList([infCct, cSesion]);
	   defs.then(function(results){
		   var cct= results[0][1].cct;
		   var ubicacionCct= results[0][1].ubicacionCct;
		   var ceInfGral= results[0][1].ceInfGral;
		   listReuniones= results[0][1].reuniones;
		   var listCSesion= results[1][1];
		   
		   dom.byId("nomCct").innerHTML=cct.nomCct;
    	   dom.byId("nomDirector").innerHTML=cct.nomDirector+'  &nbsp;<a href="#"><img src="static/img/refresh.png"  id="actDirector" border="0" />';
    	   dom.byId("nomNivel").innerHTML=cct.nomNivel;
    	   dom.byId("telCct").innerHTML=cct.telCct;
    	   dom.byId("mailCct").innerHTML=cct.mailCct;
    	   
    	   dom.byId("domicilio").innerHTML=ubicacionCct.domicilio;
    	   dom.byId("nomLocalidad").innerHTML=ubicacionCct.localidad.nomLocalidad;
    	   dom.byId("nomMunicipio").innerHTML=ubicacionCct.municipio.nomMunicipio;
    	   dom.byId("nomEntidadfed").innerHTML=ubicacionCct.entidad.nomEntidadfed;
    	   
    	   if(!utils.isEmpty(ceInfGral)){
    		   dom.byId("statusCe").innerHTML=constants.STATUS_CE(ceInfGral.statusCe);
    		   gStatus=ceInfGral.statusCe;
        	   dom.byId("periodo").innerHTML=ceInfGral.periodo;
    	   }else{
    		   dom.byId("statusCe").innerHTML=constants.STATUS_CE(0);
        	   dom.byId("periodo").innerHTML="-";   
    	   }
    	   
    	 
    	     	   
    	   new Tooltip({connectId: ["actDirector"],
               label: "Actualizar datos del director"});
    	   		on( dom.byId("actDirector"),'click', function(){
    		   modificacionDirector.init(cct);
    	   		});
		   
    	   var reuniones=[];
    	   for(var i=0;i<listCSesion.length-1;i++){
    		   var stat=0;
    		   var cont=' <h3>No Disponible</h3><p>...</p>';
    		   for(var j=0;j<listReuniones.length;j++){
    			   if(listCSesion[i].cSesion== listReuniones[j].cSesion){
    				   stat=1;
    				   var fchSesion=new Date(listReuniones[j].fchSesion);
    				   fchSesion=utils.dateFormat(fchSesion,"DD/MM/YYYY");
    				   cont=' <h3>Informaci\u00F3n de la Reuni\u00F3n</h3>'+
    				   '<table align="center" width="100%" border="0" >'+
			    		'       <tr><td><span class="detalleCont">Fecha de Registro:</span> '+fchSesion+'   </td>'+
			             '          <td><span class="detalleCont">N\u00FAmero de asistentes:</span> '+listReuniones[j].numIntegrantes+' </td></tr>'+
			              '     <tr><td><span class="detalleCont">Hora inicial:</span> '+listReuniones[j].horaIniSesion+' </td>'+
			               '        <td><span class="detalleCont">Hora final:</span> '+listReuniones[j].horaFinSesion+' </td></tr>'+
			                '   <tr><td colspan="2"><span class="detalleCont">Observaciones:</span> '+listReuniones[j].observaciones+' </td></tr>'+
			                 '  <tr><td colspan="2"><span class="detalleCont">Registrado por:</span> '+listReuniones[j].usrCaptura+' </td></tr>'+	
			                  ' <tr><td colspan="2"><span class="detalleCont">Caracteres de autenticidad del acta:</span> '+listReuniones[j].cadena+' </td></tr>'+
			           '</table> ';
    			   }
    				   
    		   }
    		   reuniones.push({disponibilidad:listCSesion[i].dVigencia,
    			   			   status:stat,
    			   			   nomReunion:constants.NOM_SESION(listCSesion[i].cSesion),
    			   			   contenido:cont,
    			   			   cSesion:listCSesion[i].cSesion});
    	   }        
    	   domConstruct.destroy("acrbody");
    	   domConstruct.destroy("informeDiv");
    	   //alert(':::');
    	   //utils.destroyDivs(['acrCnt']);
    	   _createAcordion(reuniones);

	    });
   }
   
   function _editarReunion(reunion, reuniones){
	   
	   if(reunion.lastIndexOf("edit")==0){
		   var sn=parseInt(reunion.substring(reunion.lastIndexOf("edit")+4));
		   if(sn!=1 && (gStatus==0||gStatus==2||gStatus==5)){
			   utils.cstmAlert('Debe registrar su primera asamblea');
			   return;
		   }
	
		   //Valida las precondiciones para el registro de la Segunda Asamblea
		   //Debe tener la Primera Asamblea registrada asi com alguna de las dos sguientes sesiones
		   if(sn==4 && (reuniones[0].status==0 || (reuniones[1].status==0 && reuniones[2].status==0))){
			   utils.cstmAlert('Debe registrar su primera asamblea y contar con la primera y/o segunda sesi\u00F3n');
			   return;
		   }
		   
		   if(sn==6 && (reuniones[0].status==0 || (reuniones[1].status==0 && reuniones[4].status==0))){
			   utils.cstmAlert('Debe registrar su primera asamblea y contar con la primera y/o tercera sesi\u00F3n');
			   return;
		   }
		   
		   if(sn==7 && (reuniones[0].status==0 || (reuniones[5].status==0))){
			   utils.cstmAlert('Debe registrar su primera asamblea y contar con la cuarta sesi\u00F3n');
			   return;
		   }

		   var infSesion= new Object();
		   for (var i in listReuniones){
			   if(listReuniones[i].cSesion==sn){
				   infSesion=listReuniones[i];
				   break;
			   }
		   }
		   
		   try{
			   capturaDG.init(sn,gCct,infSesion);
		   }catch (e) {
			   require(["app/reuniones/capturaDatosGenerales"], function(capturaDatosGenerales){
				   capturaDatosGenerales.init(sn,gCct,infSesion);
	        	});
		}
		  
	   }
	   
   } 
   function _eliminarReunion(reunion){
	   var sn=0;
	   if(reunion.lastIndexOf("trash")==0){
		   sn=parseInt(reunion.substring(reunion.lastIndexOf("trash")+5))+1;
		 }
	   
	   if(confirm("Esta acci\u00F3n eliminar\u00E1 la "+constants.NOM_SESION(sn)+" y toda la informaci\u00F3n relacionada, \u00BFdesea continuar?")){
		//var urlJson=dojo.config.app.urlBase + 'primeraAsamblea/delete/'+gCct;
			   
		   switch(sn){
			case 1:
				urlJson=dojo.config.app.urlBase + 'primeraAsamblea/delete/'+gCct;
			break;
			case 2:
				urlJson=dojo.config.app.urlBase + 'primeraSesion/delete/'+gCct;
			break;
			case 3:
				urlJson=dojo.config.app.urlBase + 'segundaSesion/delete/'+gCct;
			break;
			case 4:
				urlJson=dojo.config.app.urlBase + 'segundaAsamblea/delete/'+gCct;
			break;
			case 5:
				urlJson=dojo.config.app.urlBase + 'terceraSesion/delete/'+gCct;
			break;
			case 6:
				urlJson=dojo.config.app.urlBase + 'cuartaSesion/delete/'+gCct;
			break;
			case 7:
				urlJson=dojo.config.app.urlBase + 'terceraAsamblea/delete/'+gCct;
			break;
			case 9:
				nom="2da Reuni\u00F3n";
			break;
			case 10:
				nom="3ra Reuni\u00F3n";
			break;
		}

	       xhr.get({
	           url: urlJson,
	           preventCache:true,
	           contentType: "application/x-www-form-urlencoded; charset=utf-8",
			   handleAs: 'json',
	           handle: function(response){
	          	 //utils.cstmAlert(response);
	          	 if(response!=1){
	          		 utils.cstmAlert('Ocurri\u00F3 un error al eliminar los datos');
	          	}
	          	 else{
	          		 utils.cstmAlert('La eliminaci\u00F3n se realiz\u00F3 correctamente');
	          		_getInfCct(gCct);
	          	     //_getTurnos();          		 
	          	 }            		
	           }
	       });
	  }
	   
   } 
   function _imprimirReunion(reunion){
	   var sn=0;
	   if(reunion.lastIndexOf("print")==0){
		   sn=parseInt(reunion.substring(reunion.lastIndexOf("print")+5))+1;
	   }
	   //utils.cstmAlert("imprime sn :: "+sn);   
	   switch(sn){
		case 1:
			window.open(dojo.config.app.urlBase + 'documentos/primeraAsamblea/'+gCct, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 2:
			window.open(dojo.config.app.urlBase + 'documentos/primeraSesion/'+gCct, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 3:
			window.open(dojo.config.app.urlBase + 'documentos/segundaSesion/'+gCct, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 4:
			window.open(dojo.config.app.urlBase + 'documentos/segundaAsamblea/'+gCct, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 5:
			window.open(dojo.config.app.urlBase + 'documentos/terceraSesion/'+gCct, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 6:
			window.open(dojo.config.app.urlBase + 'documentos/cuartaSesion/'+gCct, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 7:
			window.open(dojo.config.app.urlBase + 'documentos/terceraAsamblea/'+gCct, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 9:
			nom="2da Reuni\u00F3n";
		break;
		case 10:
			nom="3ra Reuni\u00F3n";
		break;
	}
	   
   } 
   
   function _docBlancoReunion(reunion){
	   var sn = 0;
	   if(reunion.lastIndexOf("print")==0){
		   sn=parseInt(reunion.substring(reunion.lastIndexOf("print")+5))+1;
		 }
		   
	   //utils.cstmAlert("documento sn :: "+sn);   
	   switch(sn){
		case 1:
		    window.open(dojo.config.app.urlStatic + 'documentos/PrimeraAsamblea_CENuevo.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 2:
			window.open(dojo.config.app.urlStatic + 'documentos/PrimeraSesion.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 3:
			window.open(dojo.config.app.urlStatic + 'documentos/SegundaSesion.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 4:
			window.open(dojo.config.app.urlStatic + 'documentos/SegundaAsamblea.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 5:
			window.open(dojo.config.app.urlStatic + 'documentos/TerceraSesion.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 6:
			window.open(dojo.config.app.urlStatic + 'documentos/CuartaSesion.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 7:
			window.open(dojo.config.app.urlStatic + 'documentos/TerceraAsamblea.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		break;
		case 9:
			nom="2da Reuni\u00F3n";
		break;
		case 10:
			nom="3ra Reuni\u00F3n";
		break;
	}
   } 
   
    
   return{
     init:init,
     refresh:_getInfCct,
     capturaDG:capturaDG
   };
   
});


