define(["dijit/Dialog",
  "dojo/dom",
  "dijit/form/ValidationTextBox",
  "dijit/form/Button",
  "app/util/constants",
  "dijit/registry",
	  "dojo/_base/json",
	  "dijit/layout/ContentPane",
	  "app/util/text!content/ciclo2014-15/DGDGIE_servAlim_PETC_2015!strip;no-cache",
	  "app/util/jsUtils",
	  "dojo/_base/xhr",
	  "dijit/form/Form",
	  "dijit/Tooltip",
	  "dojo/on",
	  "app/util/jsUtils", 
	  "dijit/form/RadioButton"
  ], 
  function(Dialog,
		dom,
		ValidationTextBox,
		Button,
		constants,
		registry,
		json,
		ContentPane,
		template,
		utils,
		xhr,
		Form,
		Tooltip,
		on,
		jsUtils,
		RadioButton
	){
	
			var dialog; 
	   
			function init(cct, servicios){
					
				if(registry.byId("dialogServicioAlimentacion")){
					dialog.show();
					dialog.set('content',template);
					load();
				}else{
					dialog = new Dialog({
			      //title: cct.cveCct+"valor="+servicios.idCct+" ::: Programa de Escuelas de Tiempo Completo :::: Servicio de Alimentaci\u00F3n",	
						title: "["+cct.cveCct+"] ::: Programa de Escuelas de Tiempo Completo :::: Servicio de Alimentaci\u00F3n",	
			      content:  template,
			      id:"dialogServicioAlimentacion"
			    });
					
					dialog.closeButtonNode.style.display = "none";
			    
					dialog._onKey = function(evt){
						key = evt.keyCode;
			      if (key == dojo.keys.ESCAPE) {
			      	dojo.stopEvent(evt);
			      }
			    }; 
			    	
			    dialog.show();
					load(cct,servicios); 
				}		         
			}// Fin Init
						
/* **********************************************************************************************
************************************** Zona By ZZ ***********************************************
************************************************************************************************/
	
			// Datos individuales de los campos
			var z_arrCampos = {
	
				/* 01 */ z_alumn_esc: { tipo:'text' , max: '4', requerido: true, exp: 'numerico', toolTip: 'Solo n\u00FAmeros', nErr: 'Dato inconsistente en Total de alumnos en la escuela...'},
				/* 02 */ z_alumn_serv_alim: { tipo:'text' , max: '4', requerido: true, exp: 'numerico', toolTip: 'Solo n\u00FAmeros', nErr: 'Dato inconsistente en Total alumnos servicio...'},
				/* 03 */ z_dias_serv_alim: { tipo:'text' , max: '3', requerido: true, exp: 'numerico', toolTip: 'Solo n\u00FAmeros', nErr: 'Dato inconsistente en Reciben servicio...'},
				/* 04 */ z_costo_serv_alim_dia: { tipo: 'text' , max: '5', requerido: true, exp: 'decimal', toolTip: 'Num\u00E9rico con 2 decimales', nErr: 'Dato inconsistente en Costo diario...'},
				
				/* 05 */ z_tiene_norm_serv_alim: { tipo:'radio' , opcRadio: 2, requerido: true, toolTip: '', arrOpcRad: 'opcSINO', validar: 5, nErr: 'Falta dato de Normatividad'},
				/* 06 */ z_docs_serv_alim: { tipo:'text' , max: '150', requerido: false, exp: 'texto', toolTip: 'Nombre del(os) documento(s)', nErr: 'Especifique los documentos'},
				
				/* 07 */ z_padres_apor_rec_eco_alum: { tipo:'radio' , opcRadio: 2, requerido: true, toolTip: '', arrOpcRad: 'opcSINO', nErr: 'Falta dato de Padres aportan...'},
				
				/* 08 */ z_frec_esc_rec_serv_alim: { tipo:'radio' , opcRadio: 4, requerido: true, toolTip: 'Seleccione una opci\u00F3n', arrOpcRad: 'opcTIME', validar: 8, nErr: 'Falta dato de Frecuencia recibe...'},
				/* 09 */ z_frec_esc_rec_serv_alim_otro_text: { tipo:'text' , max: '50', requerido: false, exp: 'texto', toolTip: '', nErr: 'Especifique la frecuencia'},
				
				/* 10 */ z_rec_serv_alim_atiempo: { tipo:'radio' , opcRadio: 2, requerido: true, toolTip: '', arrOpcRad: 'opcSINO', nErr: 'Falta dato de Si llega a tiempo...'},
				/* 11 */ z_conf_comite_alim: { tipo:'radio' , opcRadio: 2, requerido: true, toolTip: '', arrOpcRad: 'opcSINO', nErr: 'Falta dato de Conformo comit\u00E9...'},
				/* 12 */ z_comite_alim_capac: { tipo:'radio' , opcRadio: 2, requerido: true, toolTip: 'Comit\u00e9 que funge como tal', arrOpcRad: 'opcSINO', nErr: 'Falta dato de Recibe capacitaci\u00F3n...'},
				
				/* 13 */ z_coord_alim: { tipo:'radio' , opcRadio: 2, requerido: true, toolTip: '', arrOpcRad: 'opcSINO', validar: 13, nErr:'Falta dato de Coord. Alim. ...'},
				/* 14 */ z_quien_coord_alim: { tipo:'text' , max: '60', requerido: false, exp: 'texto', toolTip: '', nErr: 'Indique qui\u00E9n asume la funci\u00F3n de coordinador alimenticio'},
				
				/* 15 */ z_alim_en_esc: { tipo:'radio' , opcRadio: 2, requerido: true, toolTip: '', arrOpcRad: 'opcSINO', nErr:'Falta dato de Preparaci\u00F3n de alimentos...'},
				/* 16 */ z_esc_cocina: { tipo:'radio' , opcRadio: 3, requerido: true, toolTip: 'Seleccione una opci\u00F3n', arrOpcRad: 'CONST_CONST_a', nErr:'Falta dato de Cuenta con cocina...'},
				/* 17 */ z_cocina_ubic: { tipo:'radio' , opcRadio: 2, requerido: true, toolTip: 'Seleccione una opci\u00F3n', arrOpcRad: 'CONST_UBICA_a', nErr:'Falta dato de Ubicaci\u00F3n con cocina...'},
				/* 18 */ z_esc_comedor: { tipo:'radio' , opcRadio: 3, requerido: true, toolTip: 'Seleccione una opci\u00F3n', arrOpcRad: 'CONST_CONST_o', nErr:'Falta dato de Cuenta con comedor...'},
				/* 19 */ z_comedor_ubic: { tipo:'radio' , opcRadio: 2, requerido: true, toolTip: 'Seleccione una opci\u00F3n', arrOpcRad: 'CONST_UBICA_o', nErr:'Falta dato de Ubicaci\u00F3n con comedor...'},
	
			}// Fin z_arrCampos
					
					
			// Maximos
			var maxCicloEscolar = 250;// de dias del ciclo escolar
			var maxCostoAlim = 200;// de costo diario de alimentacion
			
			// Opciones de los diferentes radios
			var opcSINO = {
					SI: '1',
					NO: '0',
			}
	
			var opcTIME = {
					SEMA:'semanal',
					MENS:'mensual',
					SEME:'semestral',
					ANUA:'anual',
					OTRO:'otro',
			}
	
			var CONST_UBICA = {
				EXT: 'Extern* a la escuela',
				INT: 'Intern* a la escuela',
			}
	
			var CONST_CONST = {
				EXP: 'Construid* exprofeso',
				ADA: 'Adaptad*',
				SIN: 'No cuenta con #',
			}
			
			// Total de elementos por opcion de radio
			var logArrRads = {
				opcSINO:2,
				opcSINO:5,
				CONST_UBICA:2,
				CONST_CONST:3,
			}
	
			// Opciondes de disabled
			var valDis = {
				5: {nomCampDes:'z_docs_serv_alim',valCampDes:'SI'},
				8: {nomCampDes:'z_frec_esc_rec_serv_alim_otro_text',valCampDes:'OTRO'},
				13: {nomCampDes:'z_quien_coord_alim',valCampDes:'NO'},
			}
	
			// Validacion de campo de Texto
			var validacionTipoCampo = {
					numerico: '\[0-9]{1,4}',
					decimal: '\^[0-9]{1,3}[^\,]([\.][0-9]{1,2})?$',
					//texto: '\[A-Za-z \.\,]{2,}',
					texto: '\[A-Za-z 0-9\.\,_-]{2,}',
			}
			
			// Funcion para generar los nombres de la entidad
			function creaNomBD(nomCampoForm){
				nomBD = '';
				arrCampo = nomCampoForm.split('_');
				for(indexArrCampo in arrCampo){
					if(indexArrCampo == 1){
						nomBD = nomBD + arrCampo[indexArrCampo];
					}
					else if(indexArrCampo > 1){
						nomBD = nomBD + arrCampo[indexArrCampo].charAt(0).toUpperCase() + arrCampo[indexArrCampo].slice(1);
					}
				}
			
				return nomBD;
			}
			
			// Objeto con que contendra el regreso de datos
			var formServAlim = new Object();
			
			// Funcion que me devuelve la fecha con el formato requerido dd/mm/aa hh:mm:ss
			var creaFecha = function(){

				
				var resFechaReq = '';
			
				var dN = new Date();
				//d = (dN.getDate() + 1);
				var d = parseInt(dN.getDate());
				var dd = (d < 10)?('0'+d):d;
				var me = parseInt(dN.getMonth() + 1);
				var mm = (me < 10)?('0'+me):me;
				//var aaaa = parseInt(dN.getFullYear());
				var aaaa = dN.getFullYear();
				
				var h = dN.getHours();
				var hh = (h < 10)?'0'+h:h;
				var mi = dN.getMinutes();
				var mn = (mi < 10)?'0'+mi:mi;
				var s = dN.getSeconds();
				var ss = (s < 10)?'0'+s:s;
				
				// ahora formamos el formato de fecha requerido
				resFechaReq = aaaa + '/' + mm + '/' + dd + ' ' + hh + ':' + mm + ':' + ss;
				
				return resFechaReq;
			}
			
			//console.log(creaFecha());
			
			// Para obtener el valor del radio que se encuentra checked
			var obtValRadChecked = function(nameRad){
				valRadCheck = '';
				arrValRad = z_arrCampos[nameRad].arrOpcRad;
				
				if(arrValRad != 'opcTIME' && arrValRad != 'opcSINO'){
					arrNom = arrValRad.split('_');
					nomArr = arrNom[0] + '_' + arrNom[1]; 
					arrValRad = eval(nomArr);
				}else{
					arrValRad = eval(arrValRad);
				}
				
				for(valRad in arrValRad){
					idElem = nameRad + '_' + valRad;
					checkedRad = registry.byId(idElem).checked;
					if(checkedRad){
						valRadCheck = registry.byId(idElem).value;
						break;
					}
				}
				
				return valRadCheck;
			}
			
			// Funcion para validar el FORM completo
			var validaForm_dialog = function(){
				idElemFaltante = '';
				
				for(nomElemJSON in z_arrCampos){
				
					arrJSON_EleReal = eval(z_arrCampos[nomElemJSON]);
					valElem = '';
					tamArrRad = 0;
					
					if(arrJSON_EleReal.requerido == true){
						
						if(arrJSON_EleReal.tipo == 'radio'){
						
							//Reviso si fue checked el radio
							valElem = obtValRadChecked(nomElemJSON);
							
							if(valElem == ''){
								idElemFaltante = nomElemJSON;
							}
							else{
								if(z_arrCampos[nomElemJSON].validar){
									nomCampoText_Verif = valDis[z_arrCampos[nomElemJSON].validar].nomCampDes;
									valCampoText_Verif = valDis[z_arrCampos[nomElemJSON].validar].valCampDes;
									if(valElem == valCampoText_Verif){
										valCampoText = registry.byId(nomCampoText_Verif).value;
										if(valCampoText == ''){
											idElemFaltante = nomCampoText_Verif;
										}
									}									
								}
							}
							
						}
						else if(arrJSON_EleReal.tipo == 'text'){
							idElem = nomElemJSON;
							elemObj = registry.byId(idElem);
							valElem = elemObj.value;
							
							if(valElem == '')
								idElemFaltante = idElem;
							else{
								if(nomElemJSON == 'z_alumn_esc')
									val_z_alumn_esc = valElem;
								else if(nomElemJSON == 'z_alumn_serv_alim')
									val_z_alumn_serv_alim = valElem;

							}
						}
						
						if(idElemFaltante != ''){
							console.log('Falta este campo -> ' + idElemFaltante);
							break;
						}
						
					}
				}

				if(parseInt(val_z_alumn_esc) < parseInt(val_z_alumn_serv_alim)){
					console.log('Dato inconsistente en Alumnos de la escuela');
					idElemFaltante = 'z_alumn_esc';
				}
				else if(parseInt(registry.byId('z_dias_serv_alim').value) > maxCicloEscolar ){
					console.log('Dato inconsistente en dias del servicio de alimentacion');
					idElemFaltante = 'z_dias_serv_alim';
				}
				else if(parseInt(registry.byId('z_costo_serv_alim_dia').value) > maxCostoAlim ){
					console.log('Dato inconsistente en costo de servicio de alimentacion');
					idElemFaltante = 'z_costo_serv_alim_dia';
				}
					
				if(idElemFaltante != ''){
					if(z_arrCampos[idElemFaltante].nErr)
						return idElemFaltante + 'x_x_x' + z_arrCampos[idElemFaltante].nErr;
					else
						return idElemFaltante + 'x_x_x ';
				}else{
					return '';
				}
				
			}
			
/* **********************************************************************************************
************************************** FIN By ZZ ************************************************
************************************************************************************************/
	
			function load(cct,datSerAlim){
						
				for (nomC in z_arrCampos) {
					datosCampo = z_arrCampos[nomC];
						
					//crando el nomVarBD
					idElemento = nomC;
					nomEnBD = creaNomBD(idElemento); // Nombre en BD
					if(nomC == 'z_frec_esc_rec_serv_alim_otro_text')
						nomEnBD = creaNomBD('z_frec_esc_rec_serv_alim_otro'); // Nombre en BD
						
					// Pego dato de BD y si no existe lo mando vacio
					valEnBD_Ev = (datSerAlim != null)?datSerAlim[nomEnBD]:'';// Valor en BD
					
					if(datosCampo.tipo == 'radio'){// Tipo radio
					
						var validarRad = '';
						if(datosCampo.validar){
							validarRad = datosCampo.validar;
						}
						
						arrEspecial = '';
						if(datosCampo.arrOpcRad != 'opcSINO' && datosCampo.arrOpcRad != 'opcTIME' ){
							arrNom = datosCampo.arrOpcRad.split('_');
							nomArr = arrNom[0] + '_' + arrNom[1]; 
										
							arrOpcsRadio = eval(nomArr);
							arrEspecial = arrNom[2];
						}else{
							arrOpcsRadio = eval(datosCampo.arrOpcRad);
						}
						
						
						for (opcsRadio in arrOpcsRadio) {
							
							valorRadio = opcsRadio;
							textoRadio = arrOpcsRadio[opcsRadio];
							idRadioInd = nomC + '_' + valorRadio;
							
							if(validarRad == ''){
								new RadioButton({
									checked:valEnBD_Ev==null || valEnBD_Ev==''?false:valEnBD_Ev==valorRadio?true:false,
									name: nomC,
									id: idRadioInd,
									required: datosCampo.requerido,
									value: valorRadio,
									style: ""
													
								},idRadioInd);
							}
							else if(validarRad != ''){
								new RadioButton({
									checked:valEnBD_Ev==null || valEnBD_Ev==''?false:valEnBD_Ev==valorRadio?true:false,
									name: nomC,
									id: idRadioInd,
									required: datosCampo.requerido,
									value: valorRadio,
									style: ""
														
								},idRadioInd).on('change',function(isChecked){
									if(isChecked){
										valSel_des = this.value;
										idSel_des = this.id;
										nameSel_des = this.name;
										
										datosCampoBus_des = eval('z_arrCampos.' + nameSel_des);
										
										numPregDet_des = datosCampoBus_des.validar;
										
										idElem_des = valDis[numPregDet_des].nomCampDes;
										valDet_des = valDis[numPregDet_des].valCampDes;
										
										elem_des = document.getElementById(idElem_des);
										//elem_des.value = (valSel_des == valDet_des)?'':'XX';
										//elem_des.disabled = (valSel_des == valDet_des)?false:true;
										if(numPregDet_des == 8){
											if(valSel_des == valDet_des){
												document.getElementById('spEspe5').style.display = 'inline';
											}else{
												document.getElementById('spEspe5').style.display = 'none';
											}
										}
										
										if(valSel_des == valDet_des){
											elem_des.disabled = false;
										}else{
											elem_des.disabled = true;
										}
										
										
									}
								},true);
							}
						
						}
    								
					}else{// Tipo text
									
						idElemento = nomC;
			
						validacion =  validacionTipoCampo[datosCampo.exp];
									
						new ValidationTextBox({
							type: datosCampo.tipo,
							name: nomC,
							id: nomC,
							value: valEnBD_Ev,
										
							maxlength: datosCampo.max,
							size: datosCampo.max,
										
							trim:"true",
							required: datosCampo.requerido,

							uppercase: true,
							promptMessage: datosCampo.toolTip,
							missingMessage: 'Campo requerido',
							regExp: validacion,
							invalidMessage: 'Datos incorrectos',
							style: ""
										
						},nomC);
					}// fin else tipo Text
								
								
				}// Termina For In
					
				// Creando los botones
				utils.createTag('button','aceptarZZ', 'botonAceptarCancelarZZ');
				utils.createTag('button','cancelarZZ', 'botonAceptarCancelarZZ');
						  
				//Boton Cancelar
				new Button({
					label: " CANCELAR ",
					onClick: function(){
						dialog.destroyRecursive(false);
					}
				}, "cancelarZZ");
						  
				//Boton Actualizar
				new Button({
					label: " REGISTRAR ",
					onClick: function(){
						//_actualizarDatosSerAlim(cct.cCct);

						if (dialog.validate()){
							elemFaltante = validaForm_dialog();
							arrElemFaltante = elemFaltante.split('x_x_x');
							
							fechaRegForm_BD = (datSerAlim != null)?datSerAlim.fecharegForm:'';
							if(elemFaltante == '')
								_actualizarDatosSerAlim(cct.cCct,cct.cveCct,fechaRegForm_BD);
							else
								alert(':::' + arrElemFaltante[1] + ':::\n\n\nSolo se podra Registrar la C\u00E9dula, si se ha respondido en su totalidad. \n\n\nRevise la C\u00E9dula, a\u00FAn le faltan datos por capturar...');
						}else{
							alert("Capturar todos los datos....");
						}    	   
					}
				},"aceptarZZ");
							
			}// Termina load
			
			//Se manda a actualizar la información capturada
			//function _actualizarDatosSerAlim(cctId,cctCve){
			function _actualizarDatosSerAlim(cctId,cctCve,cctFechaReg){
				//console.log('**** Listo para Grabar ****');
				//console.log('idCCT -> ' + cctId);
				//console.log('idCCT_Real -> ' + cctCve);
						
				formServAlim.idCct = cctId;
				
				for(nomCampoJSP in z_arrCampos){
				
					tipoElem = z_arrCampos[nomCampoJSP].tipo;
					if(tipoElem == 'radio'){
						valCamp = obtValRadChecked(nomCampoJSP);
					}
					else if(tipoElem == 'text'){
						valCamp = registry.byId(nomCampoJSP).value;
					}
					
					if(nomCampoJSP == 'z_frec_esc_rec_serv_alim_otro_text'){
						nomF = 'z_frec_esc_rec_serv_alim_otro';
					}else{
						nomF = nomCampoJSP;
					}
					
					nomBD = creaNomBD(nomF);// Creando las variables de la BD en un json
					
					formServAlim[nomBD] = valCamp;
				}
				// Termina el for...in
		
				var fechaCaptura = creaFecha();
				var fechaRegBD = cctFechaReg.trim();
				var lengthCarFecha = fechaRegBD.length;
				
				//console.log(' ********** FECHAS ************** ');
				//console.log('Fecha Captura = ' + fechaCaptura);
				//console.log('Fecha BD = ' + fechaRegBD);
				//console.log('Tamaño fechaRegForm = ' + lengthCarFecha);
				
				if(lengthCarFecha > 10){
					formServAlim.fecharegForm =  fechaRegBD;
					formServAlim.fechaupForm = fechaCaptura;
					//console.log('Fecha: SI -> ' + fechaRegBD)
				}else{
					formServAlim.fecharegForm = fechaCaptura;
					formServAlim.fechaupForm = '::::';
					//console.log('Fecha: NO -> ' + fechaCaptura)
				}
				//console.log(' ********** FIN FECHAS ************** ');

				formServAlim.cveCct = cctCve;
				
				//console.log(json.toJson(formServAlim));
				//console.log('***** FIN *****');
				
				var urlJson=dojo.config.app.urlBase + 'serAlim1415/saveSerAlim1415';
        
				xhr.post({
          url: urlJson,
          postData: json.toJson(formServAlim),
					
					headers:{
						"Content-Type" : "application/json; charset=UTF-8"
					},
					handleAs: 'json',
					handle: function(response){
						if(response!=1){
							jsUtils.cstmAlert('Ocurri\u00F3 un error al actualizar los datos.');
						}else{
							dom.byId('linkPrograma').src='./static/img/serAlim_con.jpg';
							//dom.byId('linkPrograma').alt='Actualizar el Servicio de Alimentaci\u00F3n del Programa Federal: Tiempo completo.';
							new Tooltip({connectId: ['linkPrograma'],
								label: 'Actualizar el Servicio de Alimentaci\u00F3n del Programa Federal: Tiempo completo.'
								});
							jsUtils.cstmAlert('La actualizaci\u00F3n se realiz\u00F3 correctamente.');
							dialog.destroyRecursive(false); 	   
						}
					}
				});
				

			}// Fin _act....
			
			return{
				init:init
			};
		}
	);
