define(
		[
				"dijit/form/ValidationTextBox",
				"dijit/form/Button",
				"dijit/registry",
				"dojo/_base/xhr",
				"app/util/jsUtils",
				"app/util/constants",
				"dijit/form/DateTextBox",
				"dojox/widget/Calendar",
				"dijit/form/Textarea",
				"dojox/form/CheckedMultiSelect",
				"dijit/Dialog",
				"dijit/TitlePane",
				"dojo/dom",
				"app/reuniones/reunionesController",
				"app/util/text!content/reuniones/capturaDatosGenerales!strip;no-cache",
				"dijit/layout/TabContainer", "dijit/layout/ContentPane",
				"dojo/_base/json", "dojo/DeferredList", "dojox/widget/Standby",
				"dojo/_base/lang", "dijit/form/CheckBox","dijit/TitlePane",
				"app/reuniones/primeraSesion", "app/ciclo2014-15/primeraAsamblea",
				"app/reuniones/segundaSesion", "app/reuniones/segundaAsamblea",
				"app/reuniones/terceraSesion", "app/reuniones/cuartaSesion",
				"app/reuniones/terceraAsamblea"],
		function(ValidationTextBox, Button, registry, xhr, utils, constants,
				DateTextBox, Calendar, Textarea, CheckedMultiSelect, Dialog,
				TitlePane, dom, reunionesController, template,
				TabContainer, ContentPane, json, DeferredList, Standby, lang,
				CheckBox,TitlePane,primeraSesion, primeraAsamblea, segundaSesion,
				segundaAsamblea, terceraSesion, cuartaSesion, terceraAsamblea) {
			
			var dialog = {};
			var fCon;
			var gCct = 0;
			var actividadesSelect = {};
			var sesiones = [2,3,5,6];
			
			var init = function(sesionCct, cCct, infSesion) {
				gCct = cCct;
				
				if (registry.byId("dialogCaptiraDG")) {
					dialog.show();
					dialog.set('content', template);
					load();
				} else {
					dialog = new Dialog({
						title : constants.NOM_SESION(sesionCct),
						content : template,
						id : "dialogCaptiraDG",
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
			        
			        var tpA = new dijit.TitlePane({
			        	title:'<span class="sub">* Actividades</span>',
			        	style:"width: 960px;",
			        	content: dom.byId("dActividades"),
			        	open:true});
			        dom.byId("dActividadesTP").appendChild(tpA.domNode);
			        
			        if(sesionCct!=constants.TERCERA_ASAMBLEA){
			        	var tpP = new dijit.TitlePane({id:'tpP',
				        	title:'<span class="sub">* Pesta&ntilde;as</span>',
				        	style:"width: 960px;",
				        	content: registry.byId("pestanias"),
				        	open:true});
				        dom.byId("dPestaniasTP").appendChild(tpP.domNode);
			        	
			        }

					dialog.show();
			        
					 dialog._setStyleAttr('left:10px !important;'); 
		             dialog._setStyleAttr('top:10px !important;');
					
					load(infSesion,sesionCct);
					_getActividades(sesionCct);
				}

			};

			function load(infSesion,sesionCct) {

				var today = new DateTextBox({
					value : new Date()
				});
			       
				// Fecha registro
				new DateTextBox({
					name : 'fechaRegistro',
					invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
					placeHolder : "Ingrese fecha de su sesi\u00f3n",
					required : true,
					readOnly : false,
					value : new Date(infSesion.fchSesion),
					constraints : {
						formatLength : 'short',
						max : today.get('value')
					},
					datePattern : 'dd/MM/yyyy'

				}, "fechaRegistro");

				// Hora inicio
				new ValidationTextBox({
					type : "text",
					name : "horaInicio",
					promptMessage : "Ingrese la hora que inicio su asamblea",
					value : infSesion.horaIniSesion,
					trim : true,
					required : true,
					regExp : constants.HORA_VALID,
					placeHolder : "hh:mi"
				}, "horaInicio");

				// Hora final
				new ValidationTextBox({
					type : "text",
					name : "horaFinal",
					promptMessage : "Ingrese la hora que termin\u00f3 su asamblea",
					value : infSesion.horaFinSesion,
					trim : true,
					required :true,
					regExp : constants.HORA_VALID,
					placeHolder : "hh:mi"
				}, "horaFinal");

				// N�mero de Integrantes
				new ValidationTextBox({
					type : "text",
					name : "numIntegrantes",
					value : infSesion.numIntegrantes,
					trim : true,
					required : true,
					regExp : constants.NUMBER_VALID,
					placeHolder : "Ingrese el n\u00FAmero de asistentes",
					promptMessage : " Ingrese el n\u00FAmero de asistentes "
				}, "numIntegrantes");

				// Observaciones
				new Textarea({
					// type:"text",
					name : "observaciones",
					promptMessage : "Capture sus observaciones",
					value : infSesion.observaciones,
					trim : true,
					maxLength: 250,
					uppercase: true,
					style : "width:400px;"
				}, "observaciones");
				
				
				utils.createTag('button', 'guardarDG', 'botones');
				utils.createTag('button', 'cancelarDG', 'botones');

				// Boton para guardar los datos de la sesion o asamblea
				new Button(
						{
							label : " GUARDAR ",
							onClick : function() {
								if (sesionCct == constants.PRIMERA_ASAMBLEA)
									primeraAsamblea.savePrimeraAsamblea(gCct);
								else if (sesionCct == constants.PRIMERA_SESION)
									primeraSesion.savePrimeraSesion(gCct);
								else if (sesionCct == constants.SEGUNDA_SESION)
									segundaSesion.saveSegundaSesion(gCct);
								else if (sesionCct == constants.SEGUNDA_ASAMBLEA)
									segundaAsamblea.saveSegundaAsamblea(gCct);
								else if (sesionCct == constants.TERCERA_SESION)
									terceraSesion.saveTerceraSesion(gCct);
								else if (sesionCct == constants.CUARTA_SESION)
									cuartaSesion.saveCuartaSesion(gCct);
								else if (sesionCct == constants.TERCERA_ASAMBLEA)
									terceraAsamblea.saveTerceraAsamblea(gCct);
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

			function _getActividades(sesionCct) {
				var standby = new Standby({
					target : "dialogCaptiraDG"
				});
				document.body.appendChild(standby.domNode);
				standby.startup();

				var cActSesion = xhr
						.get({
							url : dojo.config.app.urlBase
									+ 'catalogos/listActividades/' + sesionCct,
							sync : false,
							preventCache:true,
							contentType : "application/x-www-form-urlencoded; charset=utf-8",
							handleAs : "json"
						});

				var datosReunion = xhr.get({url : reunionesController.urlDatosReunion(sesionCct, gCct),
							sync : false,
							preventCache:true,
							contentType : "application/x-www-form-urlencoded; charset=utf-8",
							handleAs : "json",
							handle : function(response) {
								if (response == 'SyntaxError: syntax error') {
				    	            window.location.reload();
								}
							}								
						});
				
				var defs = new DeferredList([ cActSesion, datosReunion ]);
				defs.progress(standby.show());
				defs.then(function(results) {
					var ListActSesion = results[0][1];
					var ReunionObj = results[1][1];
					var actividades = new Array();
					var actividadesToSet = !ReunionObj?[]:ReunionObj.actividades;
					
					//agrega el texto correspondiente a la etiqueta fecha sesion/asamblea
					var sesionoAsamblea = sesiones.indexOf(sesionCct)!=-1?
							'sesi\u00F3n':'asamblea';
					dom.byId('sesionoAsamblea').innerHTML=sesionoAsamblea;

					for ( var i in ListActSesion) {
						actividades.push({
							label : ListActSesion[i].nomActividad,
							value : ListActSesion[i].cActividad,
							selected : false
						});
					}
					utils.createTag('div', 'nomActividad', 'cntActividades');

					actividadesSelect = new CheckedMultiSelect({
						name : "actividades",
						multiple : true,
						required: true
					}, 'nomActividad');

					actividadesSelect.addOption(actividades);
					

					actividadesSelect.on('click', function() {
						muestra(sesionCct, ReunionObj);
					});

					var otraAct="";
					for ( var i in actividadesToSet) {
						actividadesSelect.updateOption({
							value: actividadesToSet[i].cActividad,
							selected: true
						});
						if(actividadesToSet[i].nomOtraActividad){
							otraAct=actividadesToSet[i].nomOtraActividad;
						}
						
					}

					utils.createTag('div', 'otraActividad', 'cntActividades');

					new ValidationTextBox({
						name : "otraActividad",
						id : "otraActividad",
						promptMessage : "Capture otra actividad",
						value : otraAct,
						trim : true,
						style : "display:none;",
						maxLength: 248,
						placeHolder : "Especifique",
						required: false,
						promptMessage : " Capture la otra actividad "
					}, "otraActividad");

					muestra(sesionCct, ReunionObj);
					standby.hide();
				});

			}

			function muestra(sesionCct, ReunionObj) {

				var data = actividadesSelect.getOptions();
				for ( var j = 0; j < data.length; j++) {
					if (data[j].label == "Otro" && data[j].selected == true) {
						registry.byId('otraActividad').set("style",
								"display:block");
						registry.byId('otraActividad').set("required",
						true);
						
					}

					else if (data[j].label == "Otro"
							&& data[j].selected == false) {
						registry.byId('otraActividad').set("style",
								"display:none");
						registry.byId('otraActividad').reset();
						registry.byId('otraActividad').set("required",
								false);
								
					}
				}

				var actividades = actividadesSelect.get('value');
				reunionesController.init(sesionCct, actividades, gCct,
						ReunionObj);
			}


			return {
				init : init
			};

		});
