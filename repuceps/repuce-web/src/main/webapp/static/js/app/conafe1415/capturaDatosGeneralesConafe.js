define(["dijit/form/ValidationTextBox","dijit/form/Button","dijit/registry","dojo/_base/xhr","app/util/jsUtils",
				"app/util/constants","dijit/form/DateTextBox","dojox/widget/Calendar","dijit/form/Textarea",
				"dojox/form/CheckedMultiSelect","dijit/Dialog","dijit/TitlePane","dojo/dom","app/conafe1415/reunionesControllerConafe",
				"app/util/text!content/conafe1415/capturaDatosGeneralesConafe!strip;no-cache",
				"dijit/layout/TabContainer", "dijit/layout/ContentPane","dojo/_base/json", "dojo/DeferredList", 
				"dojox/widget/Standby",	"dojo/_base/lang", "dijit/form/CheckBox","dijit/TitlePane", "dijit/form/FilteringSelect",
				"dojo/data/ItemFileWriteStore",
				"app/conafe1415/actaConstitutiva",
				"app/conafe1415/primeraReunion",
				"app/conafe1415/segundaReunion",
				"app/conafe1415/terceraReunion",
				"app/conafe1415/reuniones_conafe"],
		function(ValidationTextBox, Button, registry, xhr, utils, constants,
				DateTextBox, Calendar, Textarea, CheckedMultiSelect, Dialog,
				TitlePane, dom, reunionesControllerConafe, template,
				TabContainer, ContentPane, json, DeferredList, Standby, lang,
				CheckBox,TitlePane,FilteringSelect,ItemFileWriteStore,
				actaConstitutiva,primeraReunion,segundaReunion,terceraReunion,reuniones_conafe) {

			var dialog = {};
			var fCon;
			var gCApec = 0;
			var seccionSelect = {};
			
			var init = function(reunionApec, cApec, infReunion, storeCcts) {
				gCApec = cApec;
				
				if (registry.byId("dialogCaptiraDGConafe")) {
					
					dialog.show();
					dialog.set('content', template);
					load();
					
				} else {
					
					dialog = new Dialog({
						title : constants.NOM_REUNION_CONAFE(reunionApec),
						content : template,
						id : "dialogCaptiraDGConafe",
						draggable:false,
						styles : "text-align: center;"
					});
					dialog.closeButtonNode.style.display = "none";
					dialog._onKey = function(evt) {
						key = evt.keyCode;
						if (key == dojo.keys.ESCAPE) {
							dojo.stopEvent(evt);
						}
					};
					
					fCon = new TabContainer({
						persist : false,
						tabStrip : true,
						id : 'pestanias',
						style : "width: 930px; height: 400px;"
					}, "pestanias");

					fCon.startup();
					
					var tp = new dijit.TitlePane({
						title:'<span class="sub">Informaci&oacute;n general</span>',
						style:"width: 960px;",
						content: dom.byId("dSesion"),
						open:true});
			        dom.byId("dSesionTP").appendChild(tp.domNode);
	
			        if(reunionApec!=constants.ACTA_CONSTITUTIVA){
			        	document.getElementById('idTipoOperacion').style.display='none';
			        	document.getElementById('filaParaSecciones').style.display='block';
			        	
			        	var tpReg = new dijit.TitlePane({id:'tpReg',
				        	title:'<span class="sub">* Registros</span>',
				        	style:"width: 960px;",
				        	content: dom.byId("cntSeccion"),
				        	open:true});
				        dom.byId("seccionParaRegistros").appendChild(tpReg.domNode);
			        }
			        
		        	var tpP = new dijit.TitlePane({id:'tpP',
			        	title:'<span class="sub">* Pesta&ntilde;as</span>',
			        	style:"width: 960px;",
			        	content: registry.byId("pestanias"),
			        	open:true});
			        dom.byId("dPestaniasTP").appendChild(tpP.domNode);

					dialog.show();
					
					dialog._setStyleAttr('left:10px !important;');
					dialog._setStyleAttr('top:10px !important;');

					load(infReunion, reunionApec, cApec, storeCcts);
					_getActividades(reunionApec, storeCcts);
				}
			};

			function load(infReunion, reunionApec, cApec, storeCcts) {

				var today = new DateTextBox({
					value : new Date()
				});
				
				// Fecha registro
				new DateTextBox({
					name : 'fchRegistro',
					invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
					placeHolder : "Ingrese fecha de su reuni\u00f3n",
					required : true,
					readOnly : false,
					value : new Date(infReunion.fchReunion),
					constraints : {
						formatLength : 'short',
						max : today.get('value')
					},
					datePattern : 'dd/MM/yyyy'

				}, "fchRegistro");
				
				
				// Hora inicio
				new ValidationTextBox({
					type : "text",
					name : "horaInicio",
					promptMessage : "Ingrese la hora que inicio su reuni\u00f3n, en formato de 24 hrs",
					value : infReunion.horaIni,
					trim : true,
					required : true,
					regExp : constants.HORA_VALID,
					placeHolder : "hh:mi"
				}, "horaInicio");
				
				
				// Hora final
				new ValidationTextBox({
					type : "text",
					name : "horaFinal",
					promptMessage : "Ingrese la hora que termin\u00f3 su reuni\u00f3n, en formato de 24 hrs",
					value : infReunion.horaFin,
					trim : true,
					required :true,
					regExp : constants.HORA_VALID,
					placeHolder : "hh:mi"
				}, "horaFinal");
				

				// Observaciones
				new Textarea({
					// type:"text",
					name : "observaciones",
					promptMessage : "Capture sus observaciones",
					value : infReunion.observaciones,
					trim : true,
					maxLength: 250,
					uppercase: true,
					style : "width:400px;"
				}, "observaciones");

				// Tipo de operacion
				new FilteringSelect({
					id: 'tpoRegistro',
					store: _catalogoTpoRegistro(),
					searchAttr:'nomTpoRegistro'
				}, 'tpoRegistro');

				if(reunionApec!=constants.ACTA_CONSTITUTIVA){
					registry.byId("tpoRegistro").set("required", false);
				}

				utils.createTag('button', 'guardarDG', 'botones');
				utils.createTag('button', 'cancelarDG', 'botones');
				
				new Button({
					label : " GUARDAR ",
					onClick : function() {
							if (reunionApec == constants.ACTA_CONSTITUTIVA)
								actaConstitutiva.saveActaConstitutiva(gCApec, storeCcts);
							else if (reunionApec == constants.PRIMERA_REUNION)
								primeraReunion.savePrimeraReunion(gCApec,storeCcts);
							else if (reunionApec == constants.SEGUNDA_REUNION)
								segundaReunion.saveSegundaReunion(gCApec,storeCcts);
							else if (reunionApec == constants.TERCERA_REUNION)
								terceraReunion.saveTerceraReunion(gCApec,storeCcts);
						}
				}, "guardarDG");

				// Boton para cerrar la ventana.
				new Button({
					label : " CERRAR ",
					onClick : function() {
						dialog.destroyRecursive();
					}
				}, "cancelarDG");
				
		   }
			
			function _getActividades(reunionApec, storeCcts) {
				var standby = new Standby({
					target : "dialogCaptiraDG"
				});
				document.body.appendChild(standby.domNode);
				standby.startup();

				var datosReunion = xhr.get({url : reunionesControllerConafe.urlDatosReunion(reunionApec, gCApec),
					sync : true,
					preventCache:true,
					contentType : "application/x-www-form-urlencoded; charset=utf-8",
					handleAs : "json",
					handle : function(response) {
						if (response == 'SyntaxError: syntax error') {
		    	            window.location.reload();
						}
					}								
				});

				datosReunion.then(function(results) {
					var reunionObj = results;
					if(reunionApec!=constants.ACTA_CONSTITUTIVA){
						var listSeccionesP = reunionObj.seccionesReunion;
						var listSeccionesP1 = reunionObj.seccionesReunion2;
						var listSeccionesP3 = reunionObj.seccionesReunion3;
						var act1=0;
						var act2=0;
						var act3=0;
						var act4=0;
						var act5=0;
						var act6=0;
						var act7=0;
				        var numeroApec=gCApec;
				        
				        
						for ( var i in listSeccionesP){
							if(listSeccionesP[i].cReunion==4){
								if(listSeccionesP3.length==1){
									act1=listSeccionesP3[0].cSeccionRegistro;
									
								}
								else if(listSeccionesP3.length==2){
									act1=listSeccionesP3[0].cSeccionRegistro;
									act2=listSeccionesP3[1].cSeccionRegistro;
								}else if(listSeccionesP3.length==3){
									act1=listSeccionesP3[0].cSeccionRegistro;
									act2=listSeccionesP3[1].cSeccionRegistro;
									act3=listSeccionesP3[2].cSeccionRegistro;
								}else if(listSeccionesP3.length==4){
									act1=listSeccionesP3[0].cSeccionRegistro;
									act2=listSeccionesP3[1].cSeccionRegistro;
									act3=listSeccionesP3[2].cSeccionRegistro;
									act4=listSeccionesP3[3].cSeccionRegistro;
								}else if(listSeccionesP3.length==5){
									act1=listSeccionesP3[0].cSeccionRegistro;
									act2=listSeccionesP3[1].cSeccionRegistro;
									act3=listSeccionesP3[2].cSeccionRegistro;
									act4=listSeccionesP3[3].cSeccionRegistro;
									act5=listSeccionesP3[4].cSeccionRegistro;
								}
								else if(listSeccionesP3.length==6){
									act1=listSeccionesP3[0].cSeccionRegistro;
									act2=listSeccionesP3[1].cSeccionRegistro;
									act3=listSeccionesP3[2].cSeccionRegistro;
									act4=listSeccionesP3[3].cSeccionRegistro;
									act5=listSeccionesP3[4].cSeccionRegistro;
									act6=listSeccionesP3[5].cSeccionRegistro;
								}
								else if(listSeccionesP3.length==7){
									act1=listSeccionesP3[0].cSeccionRegistro;
									act2=listSeccionesP3[1].cSeccionRegistro;
									act3=listSeccionesP3[2].cSeccionRegistro;
									act4=listSeccionesP3[3].cSeccionRegistro;
									act5=listSeccionesP3[4].cSeccionRegistro;
									act6=listSeccionesP3[5].cSeccionRegistro;
									act7=listSeccionesP3[6].cSeccionRegistro;
								}
								
								
								
							
								if(listSeccionesP[i].cSeccionRegistro==act1 || listSeccionesP[i].cSeccionRegistro==act2 || listSeccionesP[i].cSeccionRegistro==act3 || listSeccionesP[i].cSeccionRegistro==act4 || listSeccionesP[i].cSeccionRegistro==act5 || listSeccionesP[i].cSeccionRegistro==act6 || listSeccionesP[i].cSeccionRegistro==act7){
									listSeccionesP[i].cApec=numeroApec;
								}
								
								else{
									listSeccionesP[i].cApec=null;
								}
							}
							
							
							}
					
						for ( var i in listSeccionesP){
						if(listSeccionesP[i].cReunion==3){
							if(listSeccionesP1.length==1){
								act1=listSeccionesP1[0].cSeccionRegistro;
								
							}
							else if(listSeccionesP1.length==2){
								act1=listSeccionesP1[0].cSeccionRegistro;
								act2=listSeccionesP1[1].cSeccionRegistro;
							}else if(listSeccionesP1.length==3){
								act1=listSeccionesP1[0].cSeccionRegistro;
								act2=listSeccionesP1[1].cSeccionRegistro;
								act3=listSeccionesP1[2].cSeccionRegistro;
							}else if(listSeccionesP1.length==4){
								act1=listSeccionesP1[0].cSeccionRegistro;
								act2=listSeccionesP1[1].cSeccionRegistro;
								act3=listSeccionesP1[2].cSeccionRegistro;
								act4=listSeccionesP1[3].cSeccionRegistro;
							}
							
							
							
						
							if(listSeccionesP[i].cSeccionRegistro==act1 || listSeccionesP[i].cSeccionRegistro==act2 || listSeccionesP[i].cSeccionRegistro==act3 || listSeccionesP[i].cSeccionRegistro==act4){
								listSeccionesP[i].cApec=numeroApec;
							}
							
							else{
								listSeccionesP[i].cApec=null;
							}
						}
						
						
						}
						var actividades = new Array();
						
					    
					    if(listSeccionesP[0].cReunion==2){
					    for ( var i in listSeccionesP) {
					    	if(listSeccionesP[i].cSeccionRegistro!=1 &&
					    			listSeccionesP[i].cSeccionRegistro!=2 &&
					    			listSeccionesP[i].cSeccionRegistro!=5 &&
					    			listSeccionesP[i].cSeccionRegistro!=6 &&
					    		//	listSeccionesP[i].cSeccionRegistro!=18 &&
					    		//	listSeccionesP[i].cSeccionRegistro!=19 &&
					    		//	listSeccionesP[i].cSeccionRegistro!=20 &&
					    		//	listSeccionesP[i].cSeccionRegistro!=21 &&
					    			listSeccionesP[i].cSeccionRegistro!=13){
					    		actividades.push({
									label : listSeccionesP[i].nombreSeccion,
									value : listSeccionesP[i].cSeccionRegistro,
									selected :true,
									disabled :true
								});
					    	}
					    	else {
					    		
					    		if(listSeccionesP[i].cApec!=null){
								actividades.push({
									label : listSeccionesP[i].nombreSeccion,
									value : listSeccionesP[i].cSeccionRegistro,
									selected : true
								});
					    		}
					    		else{
					    			actividades.push({
										label : listSeccionesP[i].nombreSeccion,
										value : listSeccionesP[i].cSeccionRegistro,
										selected : false
									});	
					    		}
							}
					    	 }
					    }
					    
					    
				 	    else if(listSeccionesP[0].cReunion==4){  // sección para poner obligatorio la captura del Informe Final
						    for ( var i in listSeccionesP) {
						    	if(listSeccionesP[i].cSeccionRegistro!=3 &&
						    			listSeccionesP[i].cSeccionRegistro!=4 &&
						    			listSeccionesP[i].cSeccionRegistro!=9 &&
						    			listSeccionesP[i].cSeccionRegistro!=10 &&
						    			listSeccionesP[i].cSeccionRegistro!=12 &&
						    			listSeccionesP[i].cSeccionRegistro!=16){
						    
						    		actividades.push({
										label : listSeccionesP[i].nombreSeccion,
										value : listSeccionesP[i].cSeccionRegistro,
										selected :true,
										disabled :true
									});
						    	}
						    	else {
						    		
						    		if(listSeccionesP[i].cApec!=null){
									actividades.push({
										label : listSeccionesP[i].nombreSeccion,
										value : listSeccionesP[i].cSeccionRegistro,
										selected : true
									});
						    		}
						    		else{
						    			actividades.push({
											label : listSeccionesP[i].nombreSeccion,
											value : listSeccionesP[i].cSeccionRegistro,
											selected : false
										});	
						    		}
								}
						    	 }
						    }
					    else{
					    	
				 	    	
						for ( var i in listSeccionesP){
							
							// se agrega el if para validar que se marque la casilla de los registros actualizados
							if(listSeccionesP[i].cApec!=null){
								actividades.push({
									label : listSeccionesP[i].nombreSeccion,
									value : listSeccionesP[i].cSeccionRegistro,
									selected : true
								});
					    		}
					    		else{
						   actividades.push({
								label : listSeccionesP[i].nombreSeccion,
								value : listSeccionesP[i].cSeccionRegistro,
								selected : false
							});
					    		}
						}
					    }
						
						seccionSelect = new CheckedMultiSelect({
							id: "selectSeccion",
							multiple : true
						}, 'listSecciones');
						seccionSelect.addOption(actividades);

						seccionSelect.on('click', function() {
							muestra(reunionApec, reunionObj);
						});
					}

					muestra(reunionApec, reunionObj, storeCcts);
					standby.hide();
				});
			}

			//Funcion para obtener el catalogo de los generos
		 	function _catalogoTpoRegistro(){
		 		
		 		  var jsonTpoRegistroData ={ identifier: 'tpoRegistro',
		 			            label: 'nomTpoRegistro',
		 			            items: [{tpoRegistro: '0',nomTpoRegistro: '[Seleccione]'},
		 			                    {tpoRegistro: '1',nomTpoRegistro: 'Constituci\u00F3n'},
		 			                	{tpoRegistro: '2',nomTpoRegistro: 'Renovaci\u00F3n'}]
		 		  };
		 		  
		 		  
		 		  var tpoRegistroStore = new dojo.data.ItemFileWriteStore({data: jsonTpoRegistroData});
		 		  
		 		  return tpoRegistroStore;
		 	}

			function muestra(reunionApec, ReunionObj, storeCcts) {
				var actividades = new Array();
				if(reunionApec!=constants.ACTA_CONSTITUTIVA){
					actividades = seccionSelect.get('value');
				}
				reunionesControllerConafe.init(reunionApec, actividades, gCApec, ReunionObj, storeCcts);
			}			

			return {
				init : init
			};
		});