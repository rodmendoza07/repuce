define(["dijit/form/ValidationTextBox","dijit/form/Button","dijit/registry","dojo/_base/xhr","app/util/jsUtils",
				"app/util/constants","dijit/form/DateTextBox","dojox/widget/Calendar","dijit/form/Textarea",
				"dojox/form/CheckedMultiSelect","dijit/Dialog","dijit/TitlePane","dojo/dom","app/reuniones_conafe/reunionesControllerConafe",
				"app/util/text!content/reuniones_conafe/capturaDatosGeneralesConafe!strip;no-cache",
				"dijit/layout/TabContainer", "dijit/layout/ContentPane","dojo/_base/json", "dojo/DeferredList", 
				"dojox/widget/Standby",	"dojo/_base/lang", "dijit/form/CheckBox","dijit/TitlePane", "dijit/form/FilteringSelect",
				"dojo/data/ItemFileWriteStore",
				"app/reuniones_conafe/actaConstitutiva",
				"app/reuniones_conafe/primeraReunion",
				"app/reuniones_conafe/segundaReunion",
				"app/reuniones_conafe/terceraReunion",
				"app/reuniones_conafe/reuniones_conafe"],
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
					required: true,
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
						var actividades = new Array();
						
						for ( var i in listSeccionesP){
							var seleccionado = false;
							if(listSeccionesP[i].cApec!=null){
								seleccionado = true;
							}						
							actividades.push({
								label : listSeccionesP[i].nombreSeccion,
								value : listSeccionesP[i].cSeccionRegistro,
								selected : seleccionado
							});
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