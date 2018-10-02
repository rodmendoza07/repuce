define(["dijit/Tooltip","dijit/form/ValidationTextBox","dijit/form/Button",
        "dojo/dom","dijit/registry","dojo/on", "dojo/_base/xhr",
        "dojo/_base/json","dijit/form/Select","dojo/DeferredList","app/util/jsUtils",
        "app/util/constants","dijit/form/RadioButton","app/reuniones/capturaDatosGenerales",
        "app/util/jsUtils"], 
function( Tooltip,ValidationTextBox,Button,dom,registry,on,xhr,json,Select,DeferredList,
		utils,constants,RadioButton,capturaDG, jsUtils){
	
	var gCct=0;
	var gcCct=0;
    
    function init(config){
		config.contenedor.set('content', config.template);  
        load();
    }
    
   function load(){
	   var reuniones=[];
	   for(var i=1;i<8;i++){
		   reuniones.push({disponibilidad:0,status:0,nomReunion:constants.NOM_SESION(i),contenido:' <h3>No Disponible</h3><p>...</p>'});
	   }        
	   
	   /*busqueda de c_cct*/   
       new Button({
           label: " BUSCAR ",
           onClick: function(){
              _getTurnos();
           }
       }, "progButtonNode");


       //Boton Actualizar
       new Button({
           label: " Regenerar Contase\u00f1a ",
           onClick: function(){
        	   _actualizarDatosContrasena();
           }
       },"regButtonNode");
       
       new ValidationTextBox({
           type:"text",  
           name:"cve_cct", 
           value:"", trim:"true", uppercase:"true",                                   
           required:"true",
           regExp:constants.CVE_CCT_VALID,
           promptMessage:" Ingrese el cct "
       }, "cve_cct");
       
       new ValidationTextBox({
           type:"hidden",  
           name:"v_cveCct", 
           value:"", trim:"true"        	   
       }, "v_cveCct");
   }
   
   
   function _getTurnos(){
       var cveCct={cveCct:registry.byId('cve_cct').get('value')};
       var urlJson=dojo.config.app.urlBase + 'catalogos/ListCct';
        xhr.get({
            url: urlJson,
            sync: false,
            content:cveCct,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            handleAs: "json",
            handle: function(response){
                
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
                }

            },
            error: function(error){
                alert(json.toJson(error));
            }
        } );	
   }
   
   function _getInfCct(cCct){
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
		   
		   
		   registry.byId('v_cveCct').set('value',cct.cveCct);
		   
		   registry.byId('v_mailCct').set('value',cct.mailCct);
		   
		   gcCct = cct.cCct;
		   
		   dom.byId("cveCct").innerHTML=cct.cveCct;
		   
		   //dom.byId("nomTurno").innerHTML=cct.nomTurno;
		   
		   dom.byId("nomCct").innerHTML=cct.nomCct;
    	   //dom.byId("nomDirector").innerHTML=cct.nomDirector+'  &nbsp;<a href="#"><img src="static/img/refresh.png"  id="actDirector" />';
		   dom.byId("nomDirector").innerHTML=cct.nomDirector;
    	   dom.byId("nomNivel").innerHTML=cct.nomNivel;
    	   dom.byId("telCct").innerHTML=cct.telCct;
    	   dom.byId("mailCct").innerHTML=cct.mailCct;
    	   
    	   dom.byId("domicilio").innerHTML=ubicacionCct.domicilio;
    	   dom.byId("nomLocalidad").innerHTML=ubicacionCct.idLocalidad;
    	   dom.byId("nomMunicipio").innerHTML=ubicacionCct.idMunicipio;
    	   dom.byId("nomEntidadfed").innerHTML=ubicacionCct.idEntidadfed;
    	   
    	   if(!utils.isEmpty(ceInfGral)){
    		   dom.byId("statusCe").innerHTML=constants.STATUS_CE(ceInfGral.statusCe);
        	   dom.byId("periodo").innerHTML=ceInfGral.periodo;
    	   }else{
    		   dom.byId("statusCe").innerHTML=constants.STATUS_CE(0);
        	   dom.byId("periodo").innerHTML="-";   
    	   }
    	   
    	     	   
    	   new Tooltip({connectId: ["actDirector"],
               label: "Actualizar Datos del director"});
		   
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
    			   			   nomReunion:listCSesion[i].nomSesion,
    			   			   contenido:cont,
    			   			   cSesion:listCSesion[i].cSesion});
    	   }        
           
    	   utils.destroyDivs(['acrCnt']);
    	   _createAcordion(reuniones);

	    });
   }
   
  
   
   //Se manda a actualizar la información capturada
   function _actualizarDatosContrasena(){

	   var v_cveCct={v_cveCct:registry.byId('v_cveCct').get('value')};

	   var regenerar = 2;

	   if( registry.byId('v_cveCct').get('value') == null || registry.byId('v_cveCct').get('value') == ''){
		   jsUtils.cstmAlert('Debe buscar un CCT válido');
		   return false;
	   }

	  
	   var params=[
	               registry.byId('v_cveCct').get('value'), 
	               registry.byId('v_mailCct').get('value'),
	               regenerar,
	               "",
	               gcCct+''
	              ];

	  	 //alert('params ::'+json.toJson(params));
   	
   	
	  	var urlJson=dojo.config.app.urlBase + 'catalogos/updateMailCCct';
	  	/*
        xhr.post({
            url: urlJson,
            postData: json.toJson(params),
			 headers:{
				     "Content-Type" : "application/json; charset=UTF-8"
				},					
			 handleAs: 'json',
            handle: function(response){
           	 alert(response);
           	 if(response!=1){
           		 alert('Ocurrió un error al recuperar la contraseña');
           	}
           	 else            		
           		 alert('La recuperación se realizó correctamente');
           	     //_getTurnos();
           	    //window.location.href='j_spring_security_logout';
           	    window.location.href='login.jsp';
           	    //window.location.href='/';
           	    //window.location.href=dojo.config.app.urlBase;
           	   //window.history.back();
           	   //location.href="http://localhost:8080/examplestrust/Login;jsessionid=8878F96031170BBD964906210C4DB5C4";return false;  
            }
        });
        */
	  	location.href="http://www.repuce.sep.gob.mx";
	  	return false;
	  	  
   }

      return{
	   init:init
	  
  };
    
   return{
     init:init
   };
   
});


