define(["dijit/Tooltip","dijit/form/ValidationTextBox","dijit/form/Button",
        "dojo/dom","dijit/registry","dojo/on", "dojo/_base/xhr","dojo/dom-construct",
        "dojo/_base/json","dijit/form/Select","dojo/DeferredList","app/util/jsUtils",
        "app/util/constants","app/ciclo2014-15/capturaDatosGenerales", "app/ciclo2014-15/modificacionDirector","app/util/jsUtils"
        ,"app/ciclo2014-15/DGDGIE_servAlim_PETC_2015","app/ciclo2014-15/cedulaConaliteg","dijit/Dialog"], 
        function( Tooltip,ValidationTextBox,Button,dom,registry,on,xhr,domConstruct,json,Select,DeferredList,utils,constants,
        		capturaDG, modificacionDirector,jsUtils,DGDGIE_servAlim_PETC_2015,cedulaConaliteg,Dialog){

		    var infCctNivel = new Object();
		    
		    var primeraVez=0;
        	var gCct=0;
        	var gStatus=0;
        	var gUsuario='';
        	var abrir=0;
            eval('var _usuario='+dom.byId('usuario').value);
        	
            function init(config){
        		config.contenedor.set('content', config.template);  
                load();
            }
            
            function load(){
        	   var reuniones=[];
        	   for(var i=1;i<5;i++){
        		   reuniones.push({disponibilidad:0,status:0,nomReunion:constants.NOM_SESION(i),contenido:' <h3>No Disponible</h3><p>...</p>'});
        	   }      

        	   if(_usuario.roles!='ROLE_CCT'){
        		   /*busqueda de c_cct*/   
        		   new Button({
                       label: " BUSCAR ",
                       onClick: function(){
                    	   primeraVez=0;
                            if(registry.byId('cve_cct').get('value').substring(0,2)!= _usuario.username.substring(0,2)){
                                   if(_usuario.roles!='ROLE_ADMINISTRADOR' && _usuario.roles!='ROLE_CONAPASE' && _usuario.roles!='ROLE_TEST'){
                                          utils.cstmAlert('Solo puede registrar CCTs de su entidad');   
                                   }   else {
                                          _getTurnos();
                                   }                                                           
                                          } else {
                                       _getTurnos();    
                                          }
                          //_getTurnos();
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
        	   //utils.createTag('div','informeDiv', 'informeTD');
        	   var acordion='';
        	   var tieneCuartaSesion = false;
        	   var capturoCURP = false;
               /*Creacion del acordion*/
               for(var i in reuniones) {
                   var candado='';
                   var status='';
                   
                   if(reuniones[i].cSesion > 4 ){
                	  continue;   
                   }
                   
                   if(reuniones[i].disponibilidad==1)
                       candado='<img src="static/img/candado_a.png"  id="disp'+i+'"/>';
                   else
                       candado='<img src="static/img/candado_c.png" id="nodisp'+i+'"/>';

                   if(reuniones[i].status==1){
                       status='<img src="static/img/statusv.png" id="realizado'+i+'"/>';
                   }else if(reuniones[i].status==2){
                	   status='<img src="static/img/roja.png" width="20" height="25" id="incompleto'+i+'"/>';
                   }
                   else{
                       status='<img src="static/img/statusg.png" id="pendiente'+i+'"/>';
                   }
                   //El CCT cuenta con la cuarta sesión registrada
                   if(reuniones[i].cSesion==constants.CUARTA_SESION && reuniones[i].status==1){
                	   tieneCuartaSesion = true;
                   }
                   
//                if(i==0){
//                	acordion=acordion+'<div id="tablas">'+            
//                    '<table border="0" width="100%" align="center">'+
//                        '<tr>'+
//                            '<td width="20%" align="center">'+candado+'</td>'+
//                            '<td width="15%" align="center">'+status+'</td>'+
//                            '<td width="25%" align="center" style="font-weight: bold;">'+reuniones[i].nomReunion+'</td>'+
//                            '<td width="13%" align="center"><a href="#"><img src="static/img/edit.png" border="0" id="edit'+reuniones[i].cSesion+'" /></a></td>'+
//                            '<td width="13%" align="center"><border="0" id="trash'+i+'"/></a></td>'+
//                            '<td width="14%" align="center"><a href="#"><img src="static/img/print.png" border="0"id="print'+i+'"/></a></td>'+
//                        '</tr>'+
//                    '</table>'+
//                '</div>'+
//                '<div class="accordion" id="section1"><span></span></div>'+
//                '<div class="container">'+
//                    '<div class="content">'+reuniones[i].contenido+' </div>'+
//                '</div>';
//
//                }
//                else{
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
                	
//                }
                		                	
               }        
               
//               var informeLinkStr = '';
//               var imgName = 'checklist-gris.png';
////               
//        	   informeLinkStr = '<a href="#"><img src=""  id="linkInforme" border="0" /></a>';
////
//               dom.byId('informeDiv').innerHTML=informeLinkStr;
//               dom.byId('linkInforme').style.width='auto';
//				dom.byId('linkInforme').src='./static/img/checklist2.png';
//               new Tooltip({connectId: ['linkInforme'],
//                   label: "Imprimir Informe de Transparencia "});
//        	   
               //------------------------------------------------------- O J O ----------------------------------
               //-----------------------Revisar cual es la restricción para imprimir el informe de transparencia
               //------------------------------------------------------------------------------------------------
               //En caso de que tenga registrada su CEPS, se procede con la impresión del Informe de Transparencia 
//	    	   on( dom.byId('linkInforme'),'click', function(){
//	    		//   window.open(dojo.config.app.urlBase + 'documentos/informeTransparencia/'+gCct, null, 
//	    			//	   'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
//	    	   });
//            	               
               dom.byId('acrbody').innerHTML=acordion;
               /*tooltips*/
               for(var i in reuniones) {
            	   
            	   if(reuniones[i].cSesion > 4 ){
                 	  continue;   
                    }
            	   
            	   var edit="edit"+reuniones[i].cSesion;
                   new Tooltip({connectId: [edit],
                       label: "Editar reuni\u00F3n "});
                   if(reuniones[i].disponibilidad==1){
                	   on( dom.byId(edit),'click', function(){
                			if(_usuario.roles!='ROLE_CCT' && _usuario.roles!='ROLE_ADMINISTRADOR' && _usuario.roles!='ROLE_CONAPASE' && _usuario.roles!='ROLE_ENLACE'){
                			alert("No tiene privilegios para realizar esta acci\u00f3n");	
                			}
                			else{
                		   _editarReunion(this.id, reuniones);
                			}
                	   });
                  // Mario - 27-10-2014
                  // Solo para hacer pruebas de la segunda sesion sin activar el candado
                  // Esto se debe quitar cuando se habilite el candado. 
                   } else {
//                	   on( dom.byId(edit),'click', function(){
//              				_editarReunion(this.id, reuniones);
//                	   });
                   }
                   
                   var trash="trash"+i;
                   new Tooltip({connectId: [trash],
                       label: "Eliminar reuni\u00F3n "});
                   if(reuniones[i].status==1 || reuniones[i].status==2){
                	   on( dom.byId(trash),'click', function(){
                		   if(_usuario.roles!='ROLE_CCT' && _usuario.roles!='ROLE_ADMINISTRADOR' && _usuario.roles!='ROLE_CONAPASE' && _usuario.roles!='ROLE_ENLACE'){
                			   alert("No tiene privilegios para realizar esta acci\u00f3n");
               			  }
               			else{
                		   _eliminarReunion(this.id);
               			}
                	   });     	   
                   }
                   
                   var print="print"+i;
                   new Tooltip({connectId: [print],
                       label: "Imprimir acta "});
                   if(reuniones[i].status==1 ||reuniones[i].status==2){
                	   on( dom.byId(print),'click', function(){
                		   _imprimirReunion(this.id);
                		   //_docBlancoReunion(this.id);
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
                   new Tooltip({connectId: ["incompleto"+i],
                       label: "Incompleta "});
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
              
        	   var validarHijo=xhr.get({
                   url: dojo.config.app.urlBase + 'catalogos/validaHijo/'+cCct,
                   sync: false,
                   preventCache:true,
                   contentType: "application/x-www-form-urlencoded; charset=utf-8",
                   handleAs: "json"
               } );	
        	   
        	   var validarPaloma=xhr.get({
                   url: dojo.config.app.urlBase + 'catalogos/validaPaloma/'+cCct,
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
        		   abrir=validarHijo.results[0].valnomhijo;
        		   paloma=validarPaloma.results[0];
        		   console.log(results);
        		   infCctNivel = cct;
        		   
        		   //tiempo completo
					var tieneProgramaTiempoCompleto = results[0][1].tiempoCompleto.programaTiempoCompleto; 
        		   
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
            		   if(listReuniones.length>=1){
            		   gUsuario=listReuniones[0].usrCaptura;
            		   }
                	   dom.byId("periodo").innerHTML=ceInfGral.periodo;
                	  
            	   }else{
            		   dom.byId("statusCe").innerHTML=constants.STATUS_CE(0);
                	   dom.byId("periodo").innerHTML="-";   
            	   }            	               	 
            	   if(listReuniones.length>=1){
            	   if(listReuniones[0].usrCaptura=='REPDES'){
            		   if(primeraVez==0){
                	   alert("Es necesario que actualice la informaci\u00F3n de sus consejeros con base en los criterios del Acuerdo 716, el cual podr\u00e1 consultar en la p\u00e1gina principal del REPUCE");
            		   primeraVez=1;
            		   }
            		   
                   }
            	   }
            	   
           		// ********** By ZZ 24Feb15 ***********
//					
//					function revisaDatSerAlim(datCct,enviar){
//						
//						var infCct_zz=xhr.get({
//							url: dojo.config.app.urlBase + 'serAlim1415/selDatFormSerAlim/'+datCct,
//							sync: false,
//							preventCache:true,
//							contentType: "application/x-www-form-urlencoded; charset=utf-8",
//							handleAs: "json"
//						} );
//						
//						
//						var defs_zz = new DeferredList([infCct_zz]);
//
//						defs_zz.then(function(results){
//							var datServAlim_ZZ = results[0][1];
//							var tieneDatos = (datServAlim_ZZ != null)?'con':'sin';
//
//							if(enviar === 'NO'){
//								var msgALT = '';
//								if(tieneDatos === 'sin'){
//									msgALT = 'Registrar el Servicio de Alimentaci\u00F3n del Programa Federal: Tiempo completo.';
//									alert("Seleccion\u00F3 el Programa Federal: Tiempo completo.\n\nDebe registrar el formulario de \"Servicio de Alimentaci\u00F3n\"");
//								}
//								else if(tieneDatos === 'con'){
//									msgALT = 'Actualizar el Servicio de Alimentaci\u00F3n del Programa Federal: Tiempo completo.';
//								}
//								
//								new Tooltip({connectId: ['linkPrograma'],label: msgALT});
//								dom.byId('linkPrograma').src='./static/img/serAlim_'+tieneDatos+'.jpg';
//								dom.byId('linkPrograma').style.width="180px";
//							}
//							else if(enviar === 'SI'){
//								DGDGIE_servAlim_PETC_2015.init(cct, datServAlim_ZZ);
//							}
//							
//						});
//
//					}
//					// ********** FIN By ZZ 24Feb15 ***********
//					
//					
//					if(tieneProgramaTiempoCompleto>0){
//
//						utils.createTag('div','programaDiv', 'programaTC');
//						programaLinkStr = '<a href="#"><img src="static/img/z_ajax-loader.gif" id="linkPrograma" border="0" /></a>';
//						new Tooltip({connectId: ['linkPrograma'],label: 'Cargando enlace a Servicio de alimentaci\u00F3n'});
//						dom.byId('programaDiv').innerHTML=programaLinkStr;
//						dom.byId('linkPrograma').style.width='auto';
//						
//						// Mando revisar si existen datos del ServAlim para pintar el icono
//						revisaDatSerAlim(cct.cCct,'NO');								
//					}
//            	   
//           	   //probando boton cuca
////            	   utils.createTag('div','programaDiv', 'programaTC');
////            	   programaLinkStr = '<a href="#"><img src="static/img/z_ajax-loader.gif" id="linkPrograma" border="0" /></a>';
////            	   
////					dom.byId('programaDiv').innerHTML=programaLinkStr;
////					dom.byId('linkPrograma').style.width='auto';
////					dom.byId('linkPrograma').src='./static/img/checklist.png';
////					new Tooltip({connectId: ['linkPrograma'],label: 'C\u00e9dula CONALITEG'});
////					
////					on( dom.byId("linkPrograma"),'click', function(){									
////						//window.open('/utilgnx/servlet/com.sistem01.paso?'+gCct);
////						cnt1="/utilgnx/servlet/com.sistem01.paso?"+gCct;
////		           		cnt='<div><iframe width="1200" height="315" src="'+cnt1+'" frameborder="0" allowfullscreen></iframe></div>';
////		           		var dialog = new Dialog({
////		    			    title: "Cuestionario",
////		    			    content: cnt
////		    			});
////		    			
////		    			dialog.show();
////		    			dialog.on('hide',function(){
////		    				dialog.destroyRecursive(false);
////		    			});
////						});
//					
//            		var informeLinkStr = '';
//
//					utils.createTag('div','informeDiv', 'informeTD');	               
//	        	   informeLinkStr = '<a href="#"><img src="static/img/z_ajax-loader.gif"  id="linkInforme" border="0" /></a>';
//				//	informeLinkStr = '<a href="http://www.consejosescolares.sep.gob.mx/work/models/conapase/Resource/680/1/images/Mensaje%20del%20CSecretario%20SPD(1).pdf">Mensaje del C. Secretario de Educaci�n</a>';
//	               dom.byId('informeDiv').innerHTML=informeLinkStr;
//	               dom.byId('linkInforme').style.width='auto';
//					dom.byId('linkInforme').src='./static/img/cuestionarioEducativo.JPG';
//	               
//					
//	               new Tooltip({connectId: ['linkInforme'],
//	                   label: "Cuestionario Modelo Educativo 2016"});
//	    
//	           	on( dom.byId("linkInforme"),'click', function(){									
////					window.open(dojo.config.app.urlBase + 'documentos/primeraAsamblea/'+gCct, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
//			        //	window.open('/utilgnx/servlet/com.sistem01.aoficio01?'+gCct);
//	           //		cnt2="http://www.consejosescolares.sep.gob.mx/work/models/conapase/Resource/680/1/images/Mensaje%20del%20CSecretario%20SPD(1).pdf";
//	           		    cnt2="https://es.surveymonkey.com/r/CONAPASEconsulta";
//	           		
//	           		cnt3='<div><iframe width="800" height="315" src="'+cnt2+'" frameborder="0" allowfullscreen></iframe></div>';
//	           		var dialog1 = new Dialog({
//	    			    title: "Cuestionario Modelo Educativo 2016",
//	    			    content: cnt3
//	    			});
//	    			
//	    			dialog1.show();
//	    			dialog1.on('hide',function(){
//	    				dialog1.destroyRecursive(false);
//	    			});
//				
//				});
//	               
//					utils.createTag('div','cuesaprende', 'aprende');	               
//		        	   informeLinkStr2 = '<a href="#"><img src="static/img/z_ajax-loader.gif"  id="linkInforme2" border="0" /></a>';
//		
//		               dom.byId('cuesaprende').innerHTML=informeLinkStr2;
//		               dom.byId('linkInforme2').style.width='auto';
//		               dom.byId('linkInforme2').src='./static/img/btn_registro.png';
//		               new Tooltip({connectId: ['linkInforme2'],
//		                   label: "Cuestionario INEA"});
//		    
//					
//		           	on( dom.byId("linkInforme2"),'click', function(){									
////					window.open(dojo.config.app.urlBase + 'documentos/primeraAsamblea/'+gCct, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
//		           	//	window.open('/servlet/com.repucequest.aprende?'+gCct);
//		           		cnt4="http://200.77.230.5/REGISTRO/registro_ed_cnp.jsp?id="+cct.cveCct+"&turno="+cct.nomTurno+";";
//		           		cnt5='<div><iframe width="800" height="315" src="'+cnt4+'" frameborder="0" allowfullscreen></iframe></div>';
//		           		var dialogINEA = new Dialog({
//		    			    title: "Inscripción INEA",
//		    			    content: cnt5
//		    			});
//		    			
//		    			dialogINEA.show();
//		    			dialogINEA.on('hide',function(){
//		    				dialogINEA.destroyRecursive(false);
//		    			});
//					});
//		               
					
           	   new Tooltip({connectId: ["actDirector"],
                      label: "Actualizar datos del director"});
           	   		on( dom.byId("actDirector"),'click', function(){
           		   modificacionDirector.init(cct);
           	   		});
       		   
//           			if(tieneProgramaTiempoCompleto>0){
//							on( dom.byId("linkPrograma"),'click', function(){									
//								revisaDatSerAlim(cct.cCct,'SI');
//           	});								
//   	    }

//            	   new Tooltip({connectId: ["actDirector"],
//                       label: "Actualizar datos del director"});
//            	   		on( dom.byId("actDirector"),'click', function(){
//            		   modificacionDirector.init(cct);
//            	   		});
        		   
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
            		   var pal=0;
            		   
            		   if(paloma.proPri==1){
            			   if(paloma.proSeg==0){
            				   pal=pal+1; 
            			   }
            			}
            		   
            		   if(paloma.recSeg==0){pal=pal+1; }
            		   if(paloma.accSeg==0){pal=pal+1; }
            		   if(paloma.norSeg==0){pal=pal+1; }
            		   if(paloma.cNivel==12 ||paloma.cNivel==13){if(paloma.evaSeg==0){pal=pal+1; }}
            		   if(paloma.comSeg==0){pal=pal+1; }
					   if(paloma.comiSeg==0){pal=pal+1; }
					   if(paloma.preSeg==0){pal=pal+1; }
            									   
            		   	if(listCSesion[i].cSesion==3){
            		   		if(pal>0 && cont!=' <h3>No Disponible</h3><p>...</p>')
            		   		{
            		   			reuniones.push({disponibilidad:listCSesion[i].dVigencia,
         			   			   status:2,
         			   			   nomReunion:constants.NOM_SESION(listCSesion[i].cSesion),
         			   			   contenido:cont,
         			   			   cSesion:listCSesion[i].cSesion});	
            		   		}
            		   		else{
            		   			reuniones.push({disponibilidad:listCSesion[i].dVigencia,
         			   			   status:stat,
         			   			   nomReunion:constants.NOM_SESION(listCSesion[i].cSesion),
         			   			   contenido:cont,
         			   			   cSesion:listCSesion[i].cSesion});
            		   		}
            		   	   
    		   	}    else{
            		   reuniones.push({disponibilidad:listCSesion[i].dVigencia,
            			   			   status:stat,
            			   			   nomReunion:constants.NOM_SESION(listCSesion[i].cSesion),
            			   			   contenido:cont,
            			   			   cSesion:listCSesion[i].cSesion});
            		   	}
            	   }        
            	   domConstruct.destroy("acrbody");
            //	   domConstruct.destroy("informeDiv");            	   
            	   _createAcordion(reuniones);

        	    });
           }
           
           function _editarReunion(reunion, reuniones){
        	   
        	   if(reunion.lastIndexOf("edit")==0){
        		   var sn=parseInt(reunion.substring(reunion.lastIndexOf("edit")+4));
        		   if(sn!=1 && (gStatus==0||gStatus==2||gStatus==5 || gUsuario=='REPDES') ){
        			   utils.cstmAlert('Debe registrar su primera asamblea');
        			   return;
        		   }
        	
        		   //Valida las precondiciones para el registro de la Segunda Asamblea
        		   //Debe tener la Primera Asamblea registrada asi com alguna de las dos sguientes sesiones
        		   if(sn==4 && (reuniones[0].status==0 || reuniones[1].status==0 || reuniones[2].status==0)){
        			   utils.cstmAlert('Debe registrar su primera asamblea y contar con la primera y segunda sesi\u00F3n');
        			   return;
        		   }
        		   
        		   if(sn==2 && abrir>0){
        			   utils.cstmAlert('Debe modificar su primera asamblea antes de resgistrar la primer sesi\u00F3n');
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
        			   capturaDG.init(sn,gCct,infSesion,infCctNivel);
        		   }catch (e) {
        			   require(["app/ciclo2014-15/capturaDatosGenerales"], function(capturaDatosGenerales){
        				   capturaDatosGenerales.init(sn,gCct,infSesion,infCctNivel);
        	        	});
        		   }        		  
        	   }        	   
           } 
           
           function _eliminarReunion(reunion){
        	   var sn=0;
        	   if(reunion.lastIndexOf("trash")==0){
        		   sn=parseInt(reunion.substring(reunion.lastIndexOf("trash")+5))+1;
        		 }
        	   
        	   if(sn==1){
    			   utils.cstmAlert('No puede borrar la informaci\u00F3n de la Primer Asamblea');
    			   
    		   }
        	   else {
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
        				urlJson=dojo.config.app.urlBase + 'segundaSesion/deleteC1415/'+gCct;
        			break;
        			case 4:
        				urlJson=dojo.config.app.urlBase + 'segundaAsamblea/delete1415/'+gCct;
        			break;        			
        		}
        		   
        	   }
    	        xhr.get({
    	           url: urlJson,
    	           preventCache:true,
    	           contentType: "application/x-www-form-urlencoded; charset=utf-8",
    			   handleAs: 'json',
    	           handle: function(response){    	          	 
    	          	 if(response!=1){
    	          		 utils.cstmAlert('Ocurri\u00F3 un error al eliminar los datos');
    	          	}
    	          	 else{
    	          		 utils.cstmAlert('La eliminaci\u00F3n se realiz\u00F3 correctamente');
    	          		_getInfCct(gCct);    	          	              		 
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
		    		    window.open(dojo.config.app.urlStatic + 'documentos/1a_asamblea.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		    		break;
		    		case 2:
		    			window.open(dojo.config.app.urlStatic + 'documentos/1a_sesion.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		    		break;
		    		case 3:
		    			window.open(dojo.config.app.urlStatic + 'documentos/2a_sesion.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		    		break;
		    		case 4:
		    			window.open(dojo.config.app.urlStatic + 'documentos/SegundaAsamblea.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
		    		break;        		
        	   }
           } 
           
            
           return{
             init:init,
             refresh:_getInfCct,
             capturaDG:capturaDG,
             cedulaConaliteg:cedulaConaliteg
           };
           
        });


