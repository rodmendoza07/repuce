define(["dijit/registry","dojo/_base/array","app/util/jsUtils","dojo/store/Memory",
        	"dojo/dom","dijit/form/ValidationTextBox","dijit/form/FilteringSelect",
        	"app/util/constants","dijit/form/Button","dojo/_base/xhr","dojox/widget/Standby",
        	"dijit/Dialog","dojox/form/CheckedMultiSelect","dijit/form/CheckBox",
        	"dojo/_base/json","app/conafe1415/reuniones_conafe", "dojo/data/ItemFileWriteStore",
        	"dijit/form/DateTextBox"],
	         
	function(registry,array,utils,Memory,dom,ValidationTextBox,FilteringSelect,constants,
			Button,xhr,Standby,Dialog,CheckedMultiSelect,CheckBox,json,reuniones,ItemFileWriteStore,DateTextBox){

		var primeraReunionObj = new Object();
		var opciones = null;
		var ckmsApoyo = new Array();
		var idReunion = null;
		var rneSeleccionados51='';
	
	
		//Variables para guardar los catálogos.
		var necesidadesStore = {};
		var situacionesIndigenasStore = {};
		var lenguasIndigenasStore = {};
		var apoyosPlanTrabajo = {};
		var BullyingTipoStore ={};
		var NeeStore ={};
		var ConafeStore={};
		var FederalesStore={};
		var EstatalStore={};
		var AlumnosStore={};
		var escuelas = {};
		
		
		function init(actividades,cApec,ReunionObj, storeCcts){
			//Se busca la clave de cada uno de los registros
			//para mostrar la pestaña correspondiente.
			primeraReunionObj = !ReunionObj?{}:ReunionObj;
			idReunion = !ReunionObj.reunion?2:primeraReunionObj.reunion.cReunion;
			var idtpoAccion =constants.APOYO_FEDERAL;
			var idtpoEstatal=constants.APOYO_ESTATAL;
			
		

			_alumnos(array.indexOf(actividades,14)!=-1); 
			_apoyos(array.indexOf(actividades,1)!=-1);
			_diagnostico(array.indexOf(actividades,2)!=-1);
			_inclusionSocial(array.indexOf(actividades,5)!=-1);
			_planDTrabajo(array.indexOf(actividades,6)!=-1);
			_contraloriaSocial(array.indexOf(actividades,13)!=-1);
			_principalesDyN(array.indexOf(actividades,18)!=-1);
		  	_actividadesUno(array.indexOf(actividades,19)!=-1);
	 	  	_actividadesTres(array.indexOf(actividades,20)!=-1);
	 	  	_actividadesCuatro(array.indexOf(actividades,21)!=-1);
		
			utils.asistenciaReunion(idReunion,'Integrantes',primeraReunionObj.integrantesR1,storeCcts);
			utils.asistenciaReunion(idReunion,'Instructores',primeraReunionObj.instructoresR1,storeCcts);
			
			  var escuelas1= new Array();
			     for(var a in storeCcts){
			    	 escuelas1.push({name:storeCcts[a].label,
			                          id:storeCcts[a].label});
			        }
			  
			     escuelas2 = escuelas1;
			 if(escuelas2.length>=1){
				 escuelas=escuelas2;
			 }
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listTipoBullying/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];				
				for(var j in data){
					store.push({ 
						id:data[j].cCoTipoBullying,
						name:data[j].nomTipoBullying,
					});
				}
				BullyingTipoStore = new Memory({data:store});
		    });
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listNee/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{name:"[Seleccione]",id:"-1"}];
				for(var j in data){
					store.push({ 
						id:data[j].cNee,
						name:data[j].nomNee,
					});
				}
				NeeStore = new Memory({data:store});
			});
			

			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listNecesidadesEspeciales/'+idReunion,
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{name:"[Seleccione]",id:"-1"}];
				for(var i in data){
					store.push({name:data[i].descripCorta,id:data[i].cApoyo});
				}
				necesidadesStore = new Memory({data:store});
		    });

			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listPolacionIndigena/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{name:"[Seleccione]",id:"-1"}];
				for(var i in data){
					store.push({name:data[i].descripCorta,id:data[i].cPoblacionIndigena});
			     }
				situacionesIndigenasStore = new Memory({data:store});
			});
		
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listLenguasIndigenas/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{name:"[Seleccione]",id:"-1"}];
				for(var i in data){
					store.push({name:data[i].nomLengua,id:data[i].cLengua});
			     }
				lenguasIndigenasStore = new Memory({data:store});
			});
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listTipoAccionesSinApoyo/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];				
				for(var j in data){
					store.push({ 
						id:data[j].cTipoAccion,
						name:data[j].nomTipoAccion,
					});
				}
				apoyosPlanTrabajo = new Memory({data:store});
		    });
			
			xhr.get({
			//	url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo/'+ idtpoAccion+'/'+idReunion,
				url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo2/'+ 1,
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];				
				for(var j in data){
					if(data[j].cTipoApoyo==2){
					store.push({ 
						id:data[j].cApoyo,
						name:data[j].nombre,
					});
					}
				}
				FederalesStore = new Memory({data:store});
		    });
			
			//EstatalStore
			
			xhr.get({
		//		url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo/'+ idtpoEstatal+'/'+idReunion,
				url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo2/'+ 1,
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];				
				for(var j in data){
					if(data[j].cTipoApoyo==3){
					store.push({ 
						id:data[j].cApoyo,
						name:data[j].nombre,
					});
					}
				}
				EstatalStore = new Memory({data:store});
		    });
		
			
			// VBLAKE store para apoyos conafe
			
			xhr.get({
				//url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo/'+ 1+'/'+idReunion,
				url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo2/'+ 1,
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];				
				for(var j in data){
					if(data[j].cTipoApoyo==1){
					store.push({ 
						id:data[j].cApoyo,
						name:data[j].nombre,
					});
					}
				}
				ConafeStore = new Memory({data:store});
		    });
	
	    }
		

		
		//@************************** Nueva Minuta 
		
		function _principalesDyN(crearPrincipalesDyN){
			var id = "principalesDyN";
			var idGridPD = "gridAccionPD";
			var idGridPN = "gridAccionPN";
			if(crearPrincipalesDyN){
				if(!registry.byId(id)){
					var dificultades=new Array();
					var necesidades=new Array();
					var dificultadesObj=primeraReunionObj.dificultades?primeraReunionObj.dificultades:[];
					var necesidadesObj=primeraReunionObj.necesidades?primeraReunionObj.necesidades:[];
					//Creamos el layout con el nombre de las columnas de la tabla y sus propiedades.
					var layoutDificultades = [[{name:'columna1',field:'id',hidden:true},
					                        {name:'cDificultades',field:'cDificultades',hidden:true},
					                        {name:'Describir brevemente',field:'dificultades',width:'450px',styles:'text-align: left;'}]];
					var layoutNecesidades = [[{name:'columna1',field:'id',hidden:true},
					                        {name:'cNecesidades',field:'cNecesidades',hidden:true},
					                        {name:'Describir brevemente',field:'necesidades',width:'450px',styles:'text-align: left;'}]];
					//Se crea un bloque para agregar la estructura de la tabla.
					utils.crearPanel("principalesDyN","Principales Dificultades y Necesidades",'principalesDyNPane');
					dom.byId('principalesDyNPane').innerHTML='<table border="0" width= "900px" cellspacing="10">'+
												'<tr>'+
													'<td><span align="left" class="sub" align="left">Principales Dificultades</span></td>'+
													'<td><span align="left" class="sub" align="left">Principales Necesidades</span></td>'+
												'</tr>'+
												'<tr>'+
													'<td width= "450px"><div id="gridPrincipalesD"/></td>'+
													'<td width= "450px"><div id="gridPrincipalesN"/></td>'+
												'</tr>'+
												'<tr>'+
													'<td id="buttonsPDif" align="center"></td>'+
											    	'<td id="buttonsPNec" align="center"></td>'+
												'</tr>'+
										   '</table>';
					
					for(var j in dificultadesObj){
						var dif = {
						    id:j,
						    cDificultades:dificultadesObj[j].cDificultades,
						    dificultades:dificultadesObj[j].dificultades,
						 };
						dificultades.push(dif);
					}
					
	 				for(var j in necesidadesObj){
	 					var nec = {
	 	 				    id:j,
	 	 				    cNecesidades:necesidadesObj[j].cNecesidades,
	 	 				    necesidades:necesidadesObj[j].necesidades,
	 	 				 };
	 	 					necesidades.push(nec);
	 	 			}
					
					
					//En esta parte se crean los grid con la información
					utils.crearGrid('gridPrincipalesD',layoutDificultades,'id',dificultades,idGridPD);
					utils.crearGrid('gridPrincipalesN',layoutNecesidades,'id',necesidades,idGridPN);
					//Sección para los botones.
					_agregarFilaGrid('accionPD','buttonsPDif');
					_agregarFilaGrid('accionPN','buttonsPNec');

					utils.createTag('input','editAccionPD','buttonsPDif');
					new Button({
						label:'Editar',
						onClick:function(){
							var gridPD = registry.byId(idGridPD);
							var items = gridPD.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEdit={
					                			dificultades :gridPD.store.getValue(selectedItem,'dificultades'),
					                	};
					                	_popupDificultades(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editAccionPD');
	
					utils.eliminarFilaGrid('gridAccionPD','buttonsPDif',0,false);
						
					// Segunda Ventana
				 
					utils.createTag('input','editAccionPN','buttonsPNec');
					new Button({
						label:'Editar',
						onClick:function(){
							var gridPN = registry.byId(idGridPN);
							var items = gridPN.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEdit={
					                	    necesidades :gridPN.store.getValue(selectedItem,'necesidades'),
										    };
					                	_popupNecesidades(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editAccionPN');
					utils.eliminarFilaGrid('gridAccionPN','buttonsPNec',0,false);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
		
	
		
		function _actividadesUno(crearActUno){
 		 
			var idactividadesuno="actividadesuno";
			var informeR1;
			id : idactividadesuno;
			var idPanelSecundario="actividadUnoPanel";
			if(crearActUno){
				if(!registry.byId(idactividadesuno)){
					//Se crea el panel principal, que contendrá toda la sección de Actividad 1
					utils.crearPanel("actividadesuno","1. Actividades y 2. Actividades",'actividadUnoPane');
					//Sección de Actividades 1
				 //	var line = 0;
				//	var actividadesUnoObj=primeraReunionObj.actividadesuno?primeraReunionObj.actividadesuno:[];
					//Se crea un bloque para agregar la tabla.  @
				//	utils.createTag('div','seccionActividadesUno',idPanelSecundario);
					dom.byId('actividadUnoPane').innerHTML='<table border="0" align="lefth" width= "750px">'+
																'<tr><span class="sub" align="left">1. Actividades para alentar el inter\u00E9s comunitario en los aprendizajes de alumnos y alumnas, programadas para realizar de septiembre a enero.</b></p>'+
																 '</td></tr>'+
														 	 
														 		 '<br/>'+
														 		 '<tr><span class="sub" align="left">Comunidad de Aprendizaje</tr>'+
														 	     '<br/>'+
														 
														 		 '<tr><td>'+ 
																 '		<p> <b>Talleres</b></p>'+
																 '</td></tr>'+
														 		
																 '<tr><td>'+ 
																 '		<p> Conformaci\u00F3n de la comunidad de aprendizaje:      </p>'+'<td><input id="fechataller1"/></td>'+
																 '</td></tr>'+
																											     		 
																 '<tr><td>'+ 
																 '		<p> Espacio para crecer y comunicarnos:      </p>'+'<td><input id="fechataller2"/></td>'+
																 '</td></tr>'+	
																 
																 '<tr><td>'+ 
																 '		<p> Las matem\u00E1ticas en la vida diaria:      </p>'+'<td><input id="fechataller3"/></td>'+
																 '</td></tr>'+
														 
																 '<tr><td>'+ 
																 '		<p> Integrante de APEC que realizar\u00E1 el seguimiento:      </p>'+'<td><input id="cmbIntApecSeg3a"/></td>'+
																 '</td></tr>'+
														
															
																 '<tr><td>'+ 
																 '		<p> <b>Unidad de aprendizaje Aut\u00F3nomo</b></p>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> <b>Talleres</b></p>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> As\u00ED estamos. Etapa de Diagn\u00F3stico:      </p>'+'<td><input id="fechataller4"/></td>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> Qu\u00E9 queremos. Etapa de planeaci\u00F3n:      </p>'+'<td><input id="fechataller5"/></td>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> Manos a la obra. Etapa de ejecuci\u00F3n:      </p>'+'<td><input id="fechataller6"/></td>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> Integrante de APEC que realizar\u00E1 el seguimiento:      </p>'+'<td><input id="cmbIntApecSeg7"/></td>'+
																 '</td></tr>'+
															
												 	 	 
																 '</tr>'+
											 		 			 	'<td align="left"><label><b> Celebraciones c\u00EDvico culturales: </b></label></td>'+
											 		 			 '</tr>'+	
											 		 			 '<tr><td>'+ 
										   			   			 '	<p> </p>'+
										   			   			 '</td></tr>'+
														 		 
										   			   			 '</tr>'+
												 		 				'<td align="left"><label> Describir brevemente 1: </label></td>'+
												 		 				'<td><input id="describirCC1"/></td>'+'<td><input id="fechaCelCulturales1"/></td>'+
												 		 		 '</tr>'+
																
																
																 '</tr>'+
																		'<td align="left"><label> Describir brevemente 2: </label></td>'+
																		'<td><input id="describirCC2"/></td>'+'<td><input id="fechaCelCulturales2"/></td>'+
																 '</tr>'+
																 '</tr>'+
																		'<td align="left"><label> Describir brevemente 3: </label></td>'+
																		'<td><input id="describirCC3"/></td>'+'<td><input id="fechaCelCulturales3"/></td>'+
																 '</tr>'+
																
																 '<tr><td>'+ 
																 '		<p> Tareas, recursos y espacios que se utilizar\u00E1n.:      </p>'+'<td><input id="tareasyespaciosCC"/></td>'+
																 '</td></tr>'+
													
																 
																 '</tr>'+
											 		 			 	'<td align="left"><label><b> Estrategia CONAFE </b></label></td>'+
											 		 			 '</tr>'+	
											 		 			 '<tr><td>'+ 
										   			   			 '	<p> </p>'+
										   			   			 '</td></tr>'+
																 
														 		 '</tr>'+
														 		 		'<td align="left"><label>  Se solicitar\u00E1 la participaci\u00F3n de una Caravana por el desarrollo?: </label></td>'+
														 		 		'<td><input id="cmbSolCaravana"/></td>'+'<td><input id="fechaSC"/></td>'+
														 		 '</tr>'+
														 		 '<tr><td>'+ 
										   			   			 '	<p> </p>'+
										   			   			 '</td></tr>'+
														 		 '</tr>'+
														 		 		'<td align="left"><label>Integrante de APEC que realizar\u00E1 la solicitud y dar\u00E1 seguimiento a las actividades de la estrategia. </label></td>'+
														 		 		'<td><input id="cmbIntApecEC17"/></td>'+
														 		 '</tr>'+
														 		 '<tr><td>'+ 
										   			   			 '	<p> </p>'+
										   			   			 '</td></tr>'+
														  															 		 
														 		 '</tr>'+
										 		 			 		'<td align="left"><label><b> Otras actividades art\u00EDsticas </b></label></td>'+
										 		 			 		'</tr>'+	
										 		 			 	 '<tr><td>'+ 
										 		 			 		'	<p> </p>'+
										 		 			 	 '</td></tr>'+
										 		 			 	
										 		 			 	 '</tr>'+
										 		 			 			'<td align="left"><label> Describir brevemente 1: </label></td>'+
										 		 			 			'<td><input id="describirAA1"/></td>'+'<td><input id="fechaAA1"/></td>'+
												 				 '</tr>'+
												 				 
												 				 '</tr>'+
											 						'<td align="left"><label>Tareas, recursos y espacios que se utilizar\u00E1n.: </label></td>'+
											 						'<td><input id="tareasyespaciosAA"/></td>'+
											 					'</tr>'+
												 				 
												 				 '</tr>'+
												 						'<td align="left"><label> Describir brevemente 2: </label></td>'+
												 						'<td><input id="describirAA2"/></td>'+'<td><input id="fechaAA2"/></td>'+
												 				 '</tr>'+
												 				 '</tr>'+
												 						'<td align="left"><label>Tareas, recursos y espacios que se utilizar\u00E1n.: </label></td>'+
												 						'<td><input id="tareasyespaciosAA2"/></td>'+
												 			     '</tr>'+	
														 		 
												 			 	 '<tr><td>'+ 
										   			   			 '	<p> </p>'+
										   			   			 '</td></tr>'+
														  															 		 
														 		 '</tr>'+
										 		 			 		'<td align="left"><label><b> Eventos Deportivos </b></label></td>'+
										 		 			 		'</tr>'+	
										 		 			 	 '<tr><td>'+ 
										 		 			 		'	<p> </p>'+
										 		 			 	 '</td></tr>'+
										 		 			 	
										 		 			 	 '</tr>'+
										 		 			 			'<td align="left"><label> Describir brevemente 1: </label></td>'+
										 		 			 			'<td><input id="describirED1"/></td>'+'<td><input id="fechaED1"/></td>'+
												 				 '</tr>'+
												 				 '</tr>'+
											 						'<td align="left"><label>Tareas, recursos y espacios que se utilizar\u00E1n.: </label></td>'+
											 						'<td><input id="tareasyespaciosED"/></td>'+
											 					'</tr>'+
												 				 
												 				 '</tr>'+
												 						'<td align="left"><label> Describir brevemente 2: </label></td>'+
												 						'<td><input id="describirED2"/></td>'+'<td><input id="fechaED2"/></td>'+
												 				 '</tr>'+
												 				 '</tr>'+
												 						'<td align="left"><label>Tareas, recursos y espacios que se utilizar\u00E1n.: </label></td>'+
												 						'<td><input id="tareasyespaciosED2"/></td>'+
												 			 	'</tr>'+	
				// 2. Actividades Extraescolares	@		
												 			 	
												 				 '<tr><td>'+ 
																 '		<div><p><H3 align="left"><b>2. Actividades estraescolares que fortalezcan la formaci\u00F3n de los alumnos y alumnas.</b><H3p></p></div>'+
																 '</td></tr>'+
				 												 
																 
																 '<tr><td>'+ 
																 '		<p> Se asign\u00F3 la Estrategia Asesor Pedag\u00F3gico Itinerante a la comunidad?      </p>'+'<td><input id="cmbSiNo28"/></td>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<div><p><H4 align="left"><b>Alfabetizaci\u00F3n</b><H4p></p></div>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> N\u00FAmero de adultos con inter\u00E9s      </p>'+'<td><input id="numAdultos"/></td>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> La comunidad forma parte del universo de acreditaci\u00F3n y certificaci\u00F3n INEA?      </p>'+'<td><input id="cmbSiNo30"/></td>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> En caso afirmativo, n\u00FAmero de adultos inscritos       </p>'+'<td><p> Mujeres</p>'+'<input id="mujeres31"/></td>'+'<td><p> Hombres</p>'+'<input id="hombres32"/></td>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> Integrante de la APEC que realizar\u00E1 el seguimiento:      </p>'+'<td><input id="cmbIntApecAlf33"/></td>'+
																 '</td></tr>'+
																 
																 '<tr><td>'+ 
																 '		<p> Se realizar\u00F3n actividades para el reforzamiento de aprendizajes fuera de horario escolar      </p>'+'<td><input id="cmbSiNo34"/></td>'+
																 '</td></tr>'+
																 '<tr><td>'+ 
																 '		<p> En caso afirmativo</p>'+
																 '</td></tr>'+
															
																 '<tr><td>'+ 
																 '		<p> Describir brevemente 1:</p>'+'<td><input id="describirAR35"/></td>'+
																 '</td></tr>'+
																 '<tr><td>'+ 
																 '		<p> Cu\u00E1ndo</p>'+'<td><input id="cuandoAR36"/></td>'+
																 '</td></tr>'+
																 '<tr><td>'+ 
																 '		<p> Nivel Educativo</p>'+'<td><input id="cmbNivelEduc37"/></td>'+
																 '</td></tr>'+
																 '<tr><td>'+ 
																 '		<p> N\u00FAmero de alumnos</p>'+'<td><input id="numAlum38"/></td>'+
																 '</td></tr>'+
																 
																 
																 '<tr><td>'+ 
																 '		<p> Describir brevemente 2:</p>'+'<td><input id="describirAR39"/></td>'+
																 '</td></tr>'+
																 '<tr><td>'+ 
																 '		<p> Cu\u00E1ndo</p>'+'<td><input id="cuandoAR40"/></td>'+
																 '</td></tr>'+
																 '<tr><td>'+ 
																 '		<p> Nivel Educativo</p>'+'<td><input id="cmbNivelEduc41"/></td>'+
																 '</td></tr>'+
																 '<tr><td>'+ 
																 '		<p> N\u00FAmero de alumnos</p>'+'<td><input id="numAlum42"/></td>'+
																 '</td></tr>'+
	
																 
																 
																 
																 
																 
																 
																 
																 
																 
															'</table>';
					
					var today = new DateTextBox({
						value : new Date()
					});
					
					
					var stateStore = new Memory({
				        data: [
				            {name:"SI", id:"SI"},
				            {name:"NO", id:"NO"},
				      //      {name:"NO HAY ACTIVIDAD", id:"NO HAY ACTIVIDAD"},
				             ]
				    });
					
					var stateStore1 = new Memory({
				        data: [
				            {name:"PREESCOLAR", id:"PREESCOLAR"},
				            {name:"PRIMARIA", id:"PRIMARIA"},
				            {name:"SECUNDARIA", id:"SECUNDARIA"},
				      //      {name:"NO HAY ACTIVIDAD", id:"NO HAY ACTIVIDAD"},
				             ]
				    });
					
					var stateStore2 = new Memory({
				        data: [
				            {name:"PRESIDENTE(A)", id:"PRESIDENTE(A)"},
				            {name:"SECRETARIO(A) / VICEPRESIDENTE(A)", id:"SECRETARIO(A) / VICEPRESIDENTE(A)"},
				            {name:"TESORERO(A)", id:"TESORERO(A)"},
				            {name:"VOCAL", id:"VOCAL"},
				      //      {name:"NO HAY ACTIVIDAD", id:"NO HAY ACTIVIDAD"},
				             ]
				    });
					
					
					
					
					// Fecha registro
					new DateTextBox({
						name : 'fechataller1',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su reuni\u00f3n",
					// 	required : true,
						readOnly : false,
 					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta1:"0000/00/00"),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta1!=null?primeraReunionObj.actividadesUno.respuesta1:""),
						
						constraints : {
							formatLength : 'short',
						 	max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechataller1");	
					
					// Fecha registro
					new DateTextBox({
						name : 'fechataller2',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su taller",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta2:""),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta2!=null?primeraReunionObj.actividadesUno.respuesta2:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechataller2");
					
					// Fecha registro
					new DateTextBox({
						name : 'fechataller3',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su taller",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta3:""),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta3!=null?primeraReunionObj.actividadesUno.respuesta3:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechataller3");
					
					var cmbIntApecSeg3a = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Integrante APEC",
				        store:stateStore2,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta3a:"",
				        required : false
				     
				    },"cmbIntApecSeg3a");
					
					
					// Fecha registro
					new DateTextBox({
						name : 'fechataller4',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su taller",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta4:""),
					//	value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta4!=null?primeraReunionObj.actividadesUno.respuesta4:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechataller4");
					
					// Fecha registro
					new DateTextBox({
						name : 'fechataller5',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su taller",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta5:""),
					//	value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta5!=null?primeraReunionObj.actividadesUno.respuesta5:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechataller5");
					
					// Fecha registro
					new DateTextBox({
						name : 'fechataller6',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su taller",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta6:""),
					//	value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta6!=null?primeraReunionObj.actividadesUno.respuesta6:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechataller6");
					
					
					var cmbIntApecSeg7 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Integrante APEC",
				        store:stateStore2,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta7:"",
				        required : false
				     
				    },"cmbIntApecSeg7");
					
		
					var describirCC1 = new ValidationTextBox({
							value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta8:"",
							require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:280px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'describirCC1');
					
					var describirCC2 = new ValidationTextBox({
							value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta10:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:280px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'describirCC2');
					
					var describirCC3 = new ValidationTextBox({
							value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta12:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:280px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'describirCC3');
					
					new DateTextBox({
						name : 'fechaCelCulturales1',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su celebraci\u00F3n",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta9:""),
					//	value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta9!=null?primeraReunionObj.actividadesUno.respuesta9:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaCelCulturales1");
					
					new DateTextBox({
						name : 'fechaCelCulturales2',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su celebraci\u00F3n",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta11:""),
					//	value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta11!=null?primeraReunionObj.actividadesUno.respuesta11:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaCelCulturales2");
					
					new DateTextBox({
						name : 'fechaCelCulturales3',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su celebraci\u00F3n",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta13:""),
				//		value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta13!=null?primeraReunionObj.actividadesUno.respuesta13:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaCelCulturales3");
					
					var tareasyespaciosCC = new ValidationTextBox({
						value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta14:"",
					 	require:true,
						maxlength:"250",
						placeHolder : "Nota: agregar tareas, recursos y espacios que se utilizar\u00E1n.",
			            style : "width:280px;"
					},'tareasyespaciosCC');
 				
					var cmbSolCaravana = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta15:"",
				        required : false,
				     
				    },"cmbSolCaravana");
				 	
					new DateTextBox({
						name : 'fechaSC',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de solicitud",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta16:""),
					//	value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta16!=null?primeraReunionObj.actividadesUno.respuesta16:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaSC");
					
					var cmbIntApecEC17 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Integrante APEC",
				        store:stateStore2,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta17:"",
				        required : false
				     
				    },"cmbIntApecEC17");
					
					var describirAA1 = new ValidationTextBox({
							value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta18:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:280px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'describirAA1');
					
					var describirAA2 = new ValidationTextBox({
							value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta20:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:280px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'describirAA2');
					
					new DateTextBox({
						name : 'fechaAA1',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de actividades art\u00EDsticas",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta19:""),
					//	value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta19!=null?primeraReunionObj.actividadesUno.respuesta19:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaAA1");
					
					new DateTextBox({
						name : 'fechaAA2',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de actividades art\u00EDsticas",
					//	required : true,
						readOnly : false,
					//	value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta21:""),
					//	value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta21!=null?primeraReunionObj.actividadesUno.respuesta21:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaAA2");
					
	 				var tareasyespaciosAA = new ValidationTextBox({
							value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta22:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: agregar tareas, recursos y espacios que se utilizar\u00E1n.",
				            style : "width:280px;"
						},'tareasyespaciosAA');
	 				
	 				var tareasyespaciosAA2 = new ValidationTextBox({
						value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta22a:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: agregar tareas, recursos y espacios que se utilizar\u00E1n.",
			            style : "width:280px;"
					},'tareasyespaciosAA2');
					
	// Variables Eventos Deportivos
	 		
					var describirED1 = new ValidationTextBox({
							value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta23:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:280px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'describirED1');
					
					var describirED2 = new ValidationTextBox({
							value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta25:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:280px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'describirED2');
					
					new DateTextBox({
						name : 'fechaED1',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de evento deportivo",
				//		required : true,
						readOnly : false,
				//		value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta24:""),
				//		value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta24!=null?primeraReunionObj.actividadesUno.respuesta24:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaED1");
					
					new DateTextBox({
						name : 'fechaED2',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de evento deportivo",
				//		required : true,
						readOnly : false,
				//		value : new Date(primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta26:""),
				//		value : new Date,//(infReunion.fchReunion),
						value : new Date(primeraReunionObj.actividadesUno!=null&&primeraReunionObj.actividadesUno.respuesta26!=null?primeraReunionObj.actividadesUno.respuesta26:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaED2");
					
	 				var tareasyespaciosED = new ValidationTextBox({
							value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta27:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: agregar tareas, recursos y espacios que se utilizar\u00E1n.",
				            style : "width:280px;"
						},'tareasyespaciosED');
	 				
	 				var tareasyespaciosED2 = new ValidationTextBox({
						value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta27a:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: agregar tareas, recursos y espacios que se utilizar\u00E1n.",
			            style : "width:280px;"
					},'tareasyespaciosED2');

	 				
	 				
	 				
	 				
	 				
	 				
	 				
	 // variables 2. Actividades Extraescolares @@				
	 				
	 				var cmbSiNo28 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta28:"",
				        required : false
	 				 },"cmbSiNo28");
	 				
	 				var numAdultos = new ValidationTextBox({
	 					id : 'numAdultos',
	 					value : primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta29:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero de adultos",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'numAdultos');
	 				
	 				var cmbSiNo30 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta30:"",
				        required : false
	 				 },"cmbSiNo30");
	 				
	 				var mujeres31 = new ValidationTextBox({
	 					id : 'mujeres31',
	 					value : primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta31:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero de mujeres",
	 					regExp : constants.NUMBER_VALID,
	 					//required : true,
	 		            style : "width:50px;"
	 				},'mujeres31');
	 				
	 				var hombres32 = new ValidationTextBox({
	 					id : 'hombres32',
	 					value : primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta32:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero de hombres",
	 					regExp : constants.NUMBER_VALID,
	 					//required : true,
	 		            style : "width:50px;"
	 				},'hombres32');
	 				
	 				
	 				var cmbIntApecAlf33 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Integrante APEC",
				        store:stateStore2,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta33:"",
				        required : false
				     
				    },"cmbIntApecAlf33");
	 				
	 				var cmbSiNo34 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta34:"",
				        required : false
	 				 },"cmbSiNo34");
	 				
	 				var describirAR35 = new ValidationTextBox({
						value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta35:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: describir brevemente.",
			            style : "width:280px;"
					//	regExp : constants.NUMBER_VALID_NOT_ZERO
					},'describirAR35');
	 				
	 				var cuandoAR36 = new ValidationTextBox({
						value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta36:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: describir brevemente.",
			            style : "width:280px;"
					//	regExp : constants.NUMBER_VALID_NOT_ZERO
					},'cuandoAR36');
	 				
	 				var cmbNivelEduc37 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione un nivel educativo",
				        store:stateStore1,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta37:"",
				        required : false
	 				 },"cmbNivelEduc37");
	 				
	 				var numAlum38 = new ValidationTextBox({
	 					id : 'numAlum38',
	 					value : primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta38:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero de alumnos",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'numAlum38');
	 				 
	 				var describirAR39 = new ValidationTextBox({
						value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta39:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: describir brevemente.",
			            style : "width:280px;"
					//	regExp : constants.NUMBER_VALID_NOT_ZERO
					},'describirAR39');
	 				
	 				var cuandoAR40 = new ValidationTextBox({
						value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta40:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: describir brevemente.",
			            style : "width:280px;"
					//	regExp : constants.NUMBER_VALID_NOT_ZERO
					},'cuandoAR40');
	 				
	 				var cmbNivelEduc41 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione un nivel educativo",
				        store:stateStore1,
				        value: primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta41:"",
				        required : false
	 				 },"cmbNivelEduc41");
	 				
	 				var numAlum42 = new ValidationTextBox({
	 					id : 'numAlum42',
	 					value : primeraReunionObj.actividadesUno!=null?primeraReunionObj.actividadesUno.respuesta42:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero de alumnos",
	 					regExp : constants.NUMBER_VALID,
	 				//	required : true,
	 		            style : "width:50px;"
	 				},'numAlum42');
	 				
	 				
	 				
	 				
				}
			}else{
				utils.cerrarPestania(idactividadesuno);
			}
		}
	 	
    //Termina Actividades 1
		
  		
	// Inicia Actividad 3 
 		
		function _actividadesTres(crearActTres){
	 		 
			var idactividadtres="actividadtres";
			var informeR1;
			id : idactividadtres;
			var idPanelSecundario="actividadTresPanel";
			if(crearActTres){
				if(!registry.byId(idactividadtres)){
					//Se crea el panel principal, que contendrá toda la sección de Actividad 1
					utils.crearPanel("actividadtres","3. Actividad",'actividadTresPane');
					//Sección de Actividades 1
				 //	var line = 0;
				//	var actividadesUnoObj=primeraReunionObj.actividadesuno?primeraReunionObj.actividadesuno:[];
					//Se crea un bloque para agregar la tabla.  @
				//	utils.createTag('div','seccionActividadesUno',idPanelSecundario);
					dom.byId('actividadTresPane').innerHTML='<table border="0" align="lefth" width= "750px">'+
								    			 '<tr><span class="sub" align="left">3. Actividades para disminuir los factores que influyen en el abandono escolar.</b></p>'+
												 '</td></tr>'+
										 		 '<tr><td>'+ 
												 '		<p> <b>Registrar los procedimientos, acordados en asamblea, mediante los cuales la comunidad se organizar\u00E1 para:</b></p>'+
												 '</td></tr>'+
										 		
												 '<tr><td>'+ 
												 '		<p> Proporcionar a LEC alimentaci\u00F3n</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="alimentacion1"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> Proporcionar a LEC hospedaje</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="hospedaje2"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    	//	 	'<tr><td>'+ 
										//		 '		<p> Proporcionar a LEC hospedaje</p>'+
										//		 '</td></tr>'+
										 		
												 '<tr><td>'+ 
												 '		<p> Acompa\u00F1amiento a LEC a cabecera municipal</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="cabecera3"/>'+
								    		 	 '</td></tr>'+
								     	'</table>'+ 	 
								    		 	 '<tr><td>'+ 
												 '		<p> <b>En la comunidad, \u00bfcu\u00E1ntos ni\u00F1os y adolescentes NO asisten a servicios educativos?</b></p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="noAsisten4"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> <b>Edades de 0 a 3</b> a\u00F1os</p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '<td><p>Cantidad</p>'+'<input id="cantidad5"/></td>'+
												 '<tr><td>'+ 
												 '		<p> <b>Razones por las cuales no asisten</b></p>'+
												 '</td></tr>'+
												 '<td><p> Sin servicio educativo "Marcar con X"</p>'+'<input id="sinServicio6"/></td>'+'<td><p> Otras</p>'+'<input id="otras7"/></td>'+'<td><p> Actividades a realizar para incorporarlos al servicio educativo</p>'+'<input id="incorporacion8"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Edades de 3 a 6</b> a\u00F1os</p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '<td><p>Cantidad</p>'+'<input id="cantidad9"/></td>'+
												 '<tr><td>'+ 
												 '		<p> <b>Razones por las cuales no asisten</b></p>'+
												 '</td></tr>'+
												 '<td><p> Sin servicio educativo "Marcar con X"</p>'+'<input id="sinServicio10"/></td>'+'<td><p> Otras</p>'+'<input id="otras11"/></td>'+'<td><p> Actividades a realizar para incorporarlos al servicio educativo</p>'+'<input id="incorporacion12"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Edades de 6 a 12</b> a\u00F1os</p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '<td><p>Cantidad</p>'+'<input id="cantidad13"/></td>'+
												 '<tr><td>'+ 
												 '		<p> <b>Razones por las cuales no asisten</b></p>'+
												 '</td></tr>'+
												 '<td><p> Sin servicio educativo</p>'+'<input id="sinServicio14"/></td>'+'<td><p> Otras</p>'+'<input id="otras15"/></td>'+'<td><p> Actividades a realizar para incorporarlos al servicio educativo</p>'+'<input id="incorporacion16"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Edades de 12 a 18</b> a\u00F1os</p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '<td><p>Cantidad</p>'+'<input id="cantidad17"/></td>'+
												 '<tr><td>'+ 
												 '		<p> <b>Razones por las cuales no asisten</b></p>'+
												 '</td></tr>'+
												 '<td><p> Sin servicio educativo</p>'+'<input id="sinServicio18"/></td>'+'<td><p> Otras</p>'+'<input id="otras19"/></td>'+'<td><p> Actividades a realizar para incorporarlos al servicio educativo</p>'+'<input id="incorporacion20"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>De los ni\u00F1os y adolescentes que no asisten a servicios educativos:</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '<td><p><b>Condici\u00F3n: Tiene alguna discapacidad</b></p>'+'<td><p> Especificar</p>'+'<input id="especificar21"/></td>'+'<td><p> Cu\u00E1ntos ni\u00F1os</p>'+'<input id="cNinos22"/></td>'+'<td><p> Cu\u00E1ntos Adolescentes</p>'+'<input id="cAdolescentes23"/></td>'+
												 '</td></tr>'+
												 
								 
												 '<tr><td>'+ 
												 '		<p> <b>Se\u00F1ale con una X si en el ciclo actual se solicitar\u00E1 beca o la familia recibir\u00E1 programa</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<td><p> Acercate a tu escuela (Beca CONAFE)</p>'+'<input id="beca24"/></td>'+'<td><p> Programa Inclusi\u00F3n Social Prospera</p>'+'<input id="prospera25"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '<td><p><b>Condici\u00F3n: Hablan \u00FAnicamente legua ind\u00EDgena</b></p>'+'<td><p> Especificar</p>'+'<input id="especificar26"/></td>'+'<td><p> Cu\u00E1ntos Ni\u00F1os</p>'+'<input id="cNinos27"/></td>'+'<td><p> Cu\u00E1ntos Adolescentes</p>'+'<input id="cAdolescentes28"/></td>'+
												 '</td></tr>'+
												 
								 
												 '<tr><td>'+ 
												 '		<p> <b>Se\u00F1ale con una X si en el ciclo actual se solicitar\u00E1 beca o la familia recibir\u00E1 programa</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<td><p> Acercate a tu escuela (Beca CONAFE)</p>'+'<input id="beca29"/></td>'+'<td><p> Programa Inclusi\u00F3n Social Prospera</p>'+'<input id="prospera30"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '<td><p><b>Condici\u00F3n: Trabajan</b></p>'+'<td><p> Especificar</p>'+'<input id="especificar31"/></td>'+'<td><p> Cu\u00E1ntos Ni\u00F1os</p>'+'<input id="cNinos32"/></td>'+'<td><p> Cu\u00E1ntos Adolescentes</p>'+'<input id="cAdolescentes33"/></td>'+
												 '</td></tr>'+
												 
								 
												 '<tr><td>'+ 
												 '		<p> <b>Se\u00F1ale con una X si en el ciclo actual se solicitar\u00E1 beca o la familia recibir\u00E1 programa</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<td><p> Acercate a tu escuela (Beca CONAFE)</p>'+'<input id="beca34"/></td>'+'<td><p> Programa Inclusi\u00F3n Social Prospera</p>'+'<input id="prospera35"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>\u00bfCu\u00E1ntos alumnos con discapacidad asisten a los servicios educativos?</b></p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="alumConDisc36"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> Registrar el tipo de discapacidad</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="cmbTiposDisc37"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> \u00bfEs necesario adecuar mobiliario y espacios educativos?</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="mobYespacios38"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> \u00bfQu\u00E9 apoyos necesitan para aprender?</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="apoyos39"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> \u00bfCu\u00E1les son las actividades que se realizar\u00E1n para favorecer sus aprendizajes?</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="favorecer40"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '<td><p><b>Condici\u00F3n: Viven en comunidades vecinas y se transladan diariamente para asistir a los servicios educativos</b></p>'+'<td><p> Especificar</p>'+'<input id="especificar41"/></td>'+'<td><p> Cu\u00E1ntos Ni\u00F1os</p>'+'<input id="cNinos42"/></td>'+'<td><p> Cu\u00E1ntos Adolescentes</p>'+'<input id="cAdolescentes43"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<td><p> Se tramitar\u00E1 beca "Ac\u00E9rcate a tu escuela" \u00bfReciben beca prospera?</p>'+'<input id="cmbBeca44"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '<td><p><b>Condici\u00F3n: Se hospedan temporalmente en la comunidad para asistir a clases</b></p>'+'<td><p> Especificar</p>'+'<input id="especificar45"/></td>'+'<td><p> Cu\u00E1ntos Ni\u00F1os</p>'+'<input id="cNinos46"/></td>'+'<td><p> Cu\u00E1ntos Adolescentes</p>'+'<input id="cAdolescentes47"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<td><p> Se tramitar\u00E1 beca "Acercate a tu escuela"</p>'+'<input id="cmbBeca48"/></td>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Cu\u00E1ntos alumnos tienen baja talla y peso?</b></p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="tallaPeso49"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr><td>'+ 
												 '		<p> <b>Apoyos alimentarios</b></p>'+
												 '</td></tr>'+
								    		 	 
								    		 	 '<tr>'+
									 		 		'<td align="left"><label>  Recibir\u00E1n apoyo alimentario del Programa de Inclusi\u00F3n Social </label></td>'+
									 		 		'<td><input id="cmbAlimen50"/></td>'+
									 		 	 '</tr>'+
									 		 	
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
									 		 	 '<tr>'+
									 		  		'<td align="right"><div id="lblfecha51" style="display:block;"></div></td>'+
													'<td><div id="divfecha51" style="display:block;"><input id="fechaAA51"/></div></td>'+
												 '</tr>'+
												
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   /*			 	 '</tr>'+
					   			   			 	 	'<td align="left"><label>  Se tramitar\u00E1n apoyos alimentarios DIF (desayunos frios o calientes) </label></td>'+
					   			   			 	 	'<td><input id="cmbAlimen52"/></td>'+'<td><p> En caso afirmativo, registrar cuando se recibir\u00E1 o tramitar\u00E1</p>'+'<td><input id="fechaAA53"/></td>'+
					   			   			 	 '</tr>'+
					   			   			 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   	*/
						   			   			 '<tr>'+
								 		 		 '<td align="left"><label>  Se tramitar\u00E1n apoyos alimentarios DIF (desayunos frios o calientes) </label></td>'+
								 		 		 '<td><input id="cmbAlimen52"/></td>'+
									 		 	 '</tr>'+
									 		 	
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
									 		 	 '<tr>'+
									 		  		'<td align="right"><div id="lblfecha53" style="display:block;"></div></td>'+
													'<td><div id="divfecha53" style="display:block;"><input id="fechaAA53"/></div></td>'+
												 '</tr>'+
												
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   			 	 
					   			   			 	 
					   			   			 	 
					   			   			 	 
	/*				   			   			 	 
					   			   			 	 
					   			   			 	 '</tr>'+
					   			   			 	 	'<td align="left"><label>  En la comunidad, \u00bffunciona un comedor de la cruzada contra el hambre? </label></td>'+
					   			   			 	 	'<td><input id="cmbAlimen54"/></td>'+'<td><p> En caso afirmativo, registrar cuando se recibir\u00E1 o tramitar\u00E1</p>'+'<td><input id="fechaAA55"/></td>'+
					   			   			 	 '</tr>'+
					   			   			 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
	*/				   			   			 	 
						   			   			 '<tr>'+
								 		 		 '<td align="left"><label>  En la comunidad, \u00bffunciona un comedor de la cruzada contra el hambre? </label></td>'+
								 		 		 '<td><input id="cmbAlimen54"/></td>'+
									 		 	 '</tr>'+
									 		 	
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
									 		 	 '<tr>'+
									 		  		'<td align="right"><div id="lblfecha55" style="display:block;"></div></td>'+
													'<td><div id="divfecha55" style="display:block;"><input id="fechaAA55"/></div></td>'+
												 '</tr>'+
												
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   			 	 
					   			   		
					   			   			 	 '</tr>'+
					   			   			 	 	'<td align="left"><label>Integrante de APEC que realizar\u00E1 el seguimiento </label></td>'+
									 		 		'<td><input id="cmbIntApecAA56"/></td>'+
									 		 	 '</tr>'+
									 		     '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr><td>'+ 
												 '		<p> <b>Los Alumnos que asisten a servicios educativos cuentan con los materiales escolares y bibliogr\u00E1ficos b\u00E1sicos:</b></p>'+
												 '</td></tr>'+
											 
											 
												 '<tr><td>'+ 
												 '		<p> <b>Material</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Paquetes \u00FAtiles escolares</b></p>'+
												 '</td></tr>'+
													 
												 '</tr>'+
					   			   			 	 	'<td align="left"><label>  Cantidad requerida </label></td>'+'<td><input id="cantidadReq57"/></td>'+
					   			   			 	 	'<td align="left"><label>  Cantidad entregada </label></td>'+'<td><input id="cantidadEnt58"/></td>'+
					   			   			 	 	'<td align="left"><label>  Fecha de recepci\u00F3n </label></td>'+'<td><input id="fechaME59"/></td>'+
					   			   			 	 '</tr>'+
					   			   			 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
								   			   			 	 
						   			   			'<tr><td>'+ 
												 '		<p> <b>Libros de texto gratuitos</b></p>'+
												 '</td></tr>'+
													 
												 '</tr>'+
					   			   			 	 	'<td align="left"><label>  Cantidad requerida </label></td>'+'<td><input id="cantidadReq60"/></td>'+
					   			   			 	 	'<td align="left"><label>  Cantidad entregada </label></td>'+'<td><input id="cantidadEnt61"/></td>'+
					   			   			 	 	'<td align="left"><label>  Fecha de recepci\u00F3n </label></td>'+'<td><input id="fechaME62"/></td>'+
					   			   			 	 '</tr>'+
					   			   			 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   			 	 '<tr><td>'+ 
					   			   			 	 '		<p> <b>Material y mobiliario</b></p>'+
					   			   			 	 '</td></tr>'+
							
												 
												'<tr><td>'+ 
					   			   			 	 	'<td align="left"><label>  Materiales para el aula   :</label></td>'+
					   			   			 	 	'<td align="left"><label>  \u00bfPaquete completo?   : </label></td>'+'<td><input id="cmbMatMob63"/></td>'+
					   			   			  	 	'<td align="left"><label>  Fecha de recepci\u00F3n </label></td>'+'<td><input id="fechaMM64"/></td>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
				   			   			 	 	
					   			   			 	 '<tr><td>'+ 
					   			   			 	 		'<td align="left"><label> Auxiliares did\u00E1cticos   :</label></td>'+
									   			   		'<td align="left"><label> \u00bfEs suficiente?      : </label></td>'+'<td><input id="cmbMatMob65"/></td>'+
									   			 '</td></tr>'+  
									   			 
									   			 
									   			 '<tr><td>'+ 
												 '		<p>En caso negativo, Se solicitar\u00E1 reposici\u00F3n?, explicar.</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="explicar66"/>'+
								    		 	 '</td></tr>'+
												 				   			   			 
							   			   		 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
				   			   			 	
					   			   			 	 
						   			   			'<tr><td>'+ 
					   			   			 	 		'<td align="left"><label> Biblioteca   :</label></td>'+
									   			   		'<td align="left"><label> Es suficiente?      : </label></td>'+'<td><input id="cmbMatMob67"/></td>'+
						   			   			'</td></tr>'+
						   			   			 
								   			   		 '<tr><td>'+ 
													 '		<p>En caso negativo, Se solicitar\u00E1 reposici\u00F3n?, explicar.</p>'+
													 '</td></tr>'+
													 '<tr><td >'+
												 	 '		<input id="explicar68"/>'+
									    		 	 '</td></tr>'+
				   			   			 				   			   			 
							   			   		 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   			 	 '<tr><td>'+ 
					   			   			 	 		'<td align="left"><label> Mobiliario   :</label></td>'+
									   			   		'<td align="left"><label> Es suficiente?      : </label></td>'+'<td><input id="cmbMatMob69"/></td>'+
						   			   			 '</td></tr>'+
						   			   			 
							   			   		 '<tr><td>'+ 
												 '		<p>En caso negativo, Se solicitar\u00E1 reposici\u00F3n?, explicar.</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="explicar70"/>'+
								    		 	 '</td></tr>'+
		   			   			 				   			   			 
							   			   		 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr><td>'+ 
					   			   			 	 '		<p> <b>Otros materiales</b></p>'+ 
					   			   			 	 '</td></tr>'+
				   			   			 	 
							   			   		 '<tr><td>'+ 
						   			   			 '	<p> </p>'+
						   			   			 '</td></tr>'+
					   			   			 	 
							   			   		 '<tr><td>'+ 
						   			   			 	 	'<td align="left"><label> Material deportivo   :</label></td>'+
										   			   	'<td align="left"><label> \u00bfEl material es suficiente?      : </label></td>'+'<td><input id="cmbMatMob71"/></td>'+
							   			   		 '</td></tr>'+
					   			   			  	 
						   			   			 '<tr><td>'+ 
												 '		<p>En caso negativo, mencionar las medidas acordadas para cubrir la necesidad.</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="mencionar72"/>'+
								    		 	 '</td></tr>'+

							   			   		 '<tr><td>'+ 
							   			   		 '	<p> </p>'+
							   			   		 '</td></tr>'+
						   			   			
							   			   		 '<tr><td>'+ 
					   			   			 	 	'<td align="left"><label> Botiqu\u00EDn de primeros auxilios   :</label></td>'+
									   			   	'<td align="left"><label> El material es suficiente?      : </label></td>'+'<td><input id="cmbMatMob73"/></td>'+
									   			 '</td></tr>'+
				   			   			  	 
						   			   			 '<tr><td>'+ 
												 '		<p>En caso negativo, mencionar las medidas acordadas para cubrir la necesidad.</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="mencionar74"/>'+
								    		 	 '</td></tr>'+

							   			   		 '<tr><td>'+ 
							   			   		 '	<p> </p>'+
							   			   		 '</td></tr>'+
							   			   			
								   			   	 '<tr><td>'+ 
						   			   			 	 	'<td align="left"><label> Bandera, asta bandera, portabandera   :</label></td>'+
										   			   	'<td align="left"><label> El material es suficiente?      : </label></td>'+'<td><input id="cmbMatMob75"/></td>'+
							   			   		 '</td></tr>'+
			   			   			  	 
						   			   			 '<tr><td>'+ 
												 '		<p>En caso negativo, mencionar las medidas acordadas para cubrir la necesidad.</p>'+
												 '</td></tr>'+
												 '<tr><td >'+
											 	 '		<input id="mencionar76"/>'+
								    		 	 '</td></tr>'+

							   			   		 '<tr><td>'+ 
							   			   		 '	<p> </p>'+
							   			   		 '</td></tr>'+
							   			   		 
								   			     '<tr><td>'+ 
												 '		<p> <b>Si la comunidad es hablante de lengua ind\u00EDgena</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Material dirigido a LEC y biblioteca</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Existen en la biblioteca libros (Hacedores de las palabras, entre otros), revistas, peri\u00F3dicos, libros de referencia (atlas, diccionarios, enciclopedias) u otros documentos impresos en lengua ind\u00EDgena</b></p>'+
												 '</td></tr>'+
												 
				   			   			 	 
					   			   			 	 '</tr>'+
					   			   			 	 	'<td align="left"><label>   \u00bfLos materiales son suficientes? </label></td>'+
					   			   			 	 	'<td><input id="cmbMatSuf77"/></td>'+'<td><p>  \u00bfSe solicitar\u00E1 reposici\u00F3n?</p>'+'<td><input id="fechaMS78"/></td>'+
					   			   			 	 '</tr>'+
					   			   			 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr><td>'+ 
												 '		<p> <b>LEC cuenta con material que oriente su intervenci\u00F3n con alumnos que hablan \u00FAnicamente su lengua materna </b></p>'+
												 '</td></tr>'+
					   			   			 	 
							   			   		 '</tr>'+
					   			   			 	 	'<td align="left"><label>  Los materiales son suficientes</label></td>'+
					   			   			 	 	'<td><input id="cmbMatSuf79"/></td>'+'<td><p> Se solicitar\u00E1 reposici\u00F3n?</p>'+'<td><input id="fechaMS80"/></td>'+
					   			   			 	 '</tr>'+
					   			   			 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   		
					   			   			 	 '</tr>'+
					   			   			 	 	'<td align="left"><label>Integrante de APEC que realizar\u00E1 el seguimiento a la solicitud</label></td>'+
									 		 		'<td><input id="cmbIntApecMS81"/></td>'+
									 		 	 '</tr>'+
									 		     '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+


																 
																 
																 
																 
																 
																 
								'</table>';
					
					var today = new DateTextBox({
						value : new Date()
					});
					
					
					var stateStore = new Memory({
				        data: [
				            {name:"SI", id:"SI"},
				            {name:"NO", id:"NO"},
				      //      {name:"NO HAY ACTIVIDAD", id:"NO HAY ACTIVIDAD"},
				             ]
				    });
					
					var stateStore1 = new Memory({
				        data: [
				            {name:"PREESCOLAR", id:"PREESCOLAR"},
				            {name:"PRIMARIA", id:"PRIMARIA"},
				            {name:"SECUNDARIA", id:"SECUNDARIA"},
				      //      {name:"NO HAY ACTIVIDAD", id:"NO HAY ACTIVIDAD"},
				             ]
				    });
					
					var stateStore2 = new Memory({
				        data: [
				            {name:"PRESIDENTE(A)", id:"PRESIDENTE(A)"},
				            {name:"SECRETARIO(A) / VICEPRESIDENTE(A)", id:"SECRETARIO(A) / VICEPRESIDENTE(A)"},
				            {name:"TESORERO(A)", id:"TESORERO(A)"},
				            {name:"VOCAL", id:"VOCAL"},
				        //    {name:"NO HAY ACTIVIDAD", id:"NO HAY ACTIVIDAD"},
				             ]
				    });
					
					var stateStore3 = new Memory({
				        data: [
				            {name:"INTELECTUAL", id:"INTELECTUAL"},
				            {name:"F\u00CDSICA-MOTRIZ", id:"F\u00CDSICA-MOTRIZ"},
				            {name:"MENTAL", id:"MENTAL"},
				            {name:"SENSORIAL", id:"SENSORIAL"},
				     //       {name:"NO HAY ALUMNOS CON DISCAPACIDAD", id:"NO HAY ALUMNOS CON DISCAPACIDAD"},
				               ]
				    });
					
					
					
					var alimentacion1 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta1:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'alimentacion1');
					
					var hospedaje2 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta2:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'hospedaje2');
					
					var cabecera3 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta3:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'cabecera3');
					
					var noAsisten4 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta4:"",
						 	require:false,
							maxlength:"2",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:50px;",
						 	regExp : constants.NUMBER_VALID
						},'noAsisten4');
					
					var cantidad5 = new ValidationTextBox({
	 					id : 'cantidad5',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta5:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cantidad5');
					
					var sinServicio6 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta6:"",
						//	require:true,
							maxlength:"1",
							placeHolder : "Marcar con X",
				            style : "width:20px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'sinServicio6');
					
					var otras7 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta7:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'otras7');
					
					var incorporacion8 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta8:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'incorporacion8');
					
					var cantidad9 = new ValidationTextBox({
	 					id : 'cantidad9',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta9:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 				 	required : false,
	 		            style : "width:50px;"
	 				},'cantidad9');
					
					var sinServicio10 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta10:"",
						//	require:true,
							maxlength:"1",
							placeHolder : "Marcar con X",
				            style : "width:20px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'sinServicio10');
					
					var otras11 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta11:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'otras11');
					
					var incorporacion12 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta12:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'incorporacion12');
					
					var cantidad13 = new ValidationTextBox({
	 					id : 'cantidad13',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta13:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cantidad13');
					
					var sinServicio14 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta14:"",
						//	require:true,
							maxlength:"20",
							placeHolder : "Marcar con X",
				            style : "width:20px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'sinServicio14');
					
					var otras15 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta15:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'otras15');
					
					var incorporacion16 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta16:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'incorporacion16');
					
					var cantidad17 = new ValidationTextBox({
	 					id : 'cantidad17',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta17:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cantidad17');
					
					var sinServicio18 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta18:"",
						//	require:true,
							maxlength:"20",
							placeHolder : "Marcar con X",
				            style : "width:20px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'sinServicio18');
					
					var otras19 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta19:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'otras19');
					
					var incorporacion20 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta20:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'incorporacion20');
					
					var especificar21 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta21:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'especificar21');
					
					var cNinos22 = new ValidationTextBox({
	 					id : 'cNinos22',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta22:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cNinos22');
					
					var cAdolescentes23 = new ValidationTextBox({
	 					id : 'cAdolescentes23',
	 				  	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta23:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cAdolescentes23');
					
					var beca24 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta24:"",
						//	require:true,
							maxlength:"1",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:50px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'beca24');
					
					var prospera25 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta25:"",
						//	require:true,
							maxlength:"1",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:50px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'prospera25');
					
					// segunda condicion
					
					
					var especificar26 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta26:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'especificar26');
					
					var cNinos27 = new ValidationTextBox({
	 					id : 'cNinos27',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta27:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 				 	required : false,
	 		            style : "width:50px;"
	 				},'cNinos27');
					
					var cAdolescentes28 = new ValidationTextBox({
	 					id : 'cAdolescentes28',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta28:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 				 	required : false,
	 		            style : "width:50px;"
	 				},'cAdolescentes28');
					
					var beca29 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta29:"",
						//	require:true,
							maxlength:"1",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:50px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'beca29');
					
					var prospera30 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta30:"",
						//	require:true,
							maxlength:"1",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:50px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'prospera30');
					
					// tercera condicion
					
					var especificar31 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta31:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'especificar31');
					
					var cNinos32 = new ValidationTextBox({
	 					id : 'cNinos32',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta32:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 				 	required : false,
	 		            style : "width:50px;"
	 				},'cNinos32');
					
					var cAdolescentes33 = new ValidationTextBox({
	 					id : 'cAdolescentes33',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta33:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 				//	required : true,
	 		            style : "width:50px;"
	 				},'cAdolescentes33');
					
					var beca34 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta34:"",
						//	require:true,
							maxlength:"1",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:50px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'beca34');
					
					var prospera35 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta35:"",
						//	require:true,
							maxlength:"1",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:50px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'prospera35');
					
					var alumConDisc36 = new ValidationTextBox({
	 					id : 'alumConDisc36',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta36:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'alumConDisc36');
					
					var cmbTiposDisc37 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Tipo",
				        store:stateStore3,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta37:"",
				        required : false
				     
				    },"cmbTiposDisc37");
					
					var mobYespacios38 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta38:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'mobYespacios38');
					
					var apoyos39 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta39:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'apoyos39');
					
					var favorecer40 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta40:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'favorecer40');
					

					var especificar41 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta41:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'especificar41');
					
					var cNinos42 = new ValidationTextBox({
	 					id : 'cNinos42',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta42:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cNinos42');
					
					var cAdolescentes43 = new ValidationTextBox({
	 					id : 'cAdolescentes43',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta43:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cAdolescentes43');
					
					var cmbBeca44 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta44:"",
				        required : false
				     
				    },"cmbBeca44");
					

					var especificar45 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta45:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'especificar45');
					
					var cNinos46 = new ValidationTextBox({
	 					id : 'cNinos46',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta46:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cNinos46');
					
					var cAdolescentes47 = new ValidationTextBox({
	 					id : 'cAdolescentes47',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta47:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cAdolescentes47');
					
					var cmbBeca48 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta48:"",
				        required : false
				     
				    },"cmbBeca48");
					
					var tallaPeso49 = new ValidationTextBox({
	 					id : 'tallaPeso49',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta49:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'tallaPeso49');
					
					
					
					
					var cmbAlimen50 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        required : false,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta50:"0000/00/00",
				     // required : true
				        		
				        		onChange: function(){
					            	if(cmbAlimen50=="SI"){
					            		dom.byId('lblfecha51').innerHTML='<label>En caso afirmativo, registrar cuando se recibir\u00E1 o tramitar\u00E1: </label>';
					            		document.getElementById('lblfecha51').style.display='block';
					    				document.getElementById('divfecha51').style.display='block';
					    	    		registry.byId("cmbAlimen50").set("required", true);
					    	    	}else{
					    				document.getElementById('lblfecha51').style.display='none';
					    				document.getElementById('divfecha51').style.display='none';
					    				registry.byId("cmbAlimen50").set("required", false);
					    			//	fechaAA51=null
					    	    	}
					            }
				     
				    },"cmbAlimen50");
					
					
					new DateTextBox({
						name 			: 'fechaAA51',
						invalidMessage 	: "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder 	: "Ingrese fecha de su reuni\u00f3n",
					//	required 		: true,
						readOnly 		: false,
					 //	value 			: new Date(primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta51:"00-00-0000"),
						value 			: new Date(primeraReunionObj.actividadesTres!=null&&primeraReunionObj.actividadesTres.respuesta51!=null?primeraReunionObj.actividadesTres.respuesta51:""),
						constraints 	: {
											formatLength : 'short',
											max : today.get('value')
										},
						datePattern 	: 'dd/MM/yyyy'
					}, "fechaAA51");
					
			
					var cmbAlimen52 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta52:"",
				        required : false,
				        		onChange: function(){
					            	if(cmbAlimen52=="SI"){
					            		dom.byId('lblfecha53').innerHTML='<label>En caso afirmativo, registrar cuando se recibir\u00E1 o tramitar\u00E1: </label>';
					            		document.getElementById('lblfecha53').style.display='block';
					    				document.getElementById('divfecha53').style.display='block';
					    	    		registry.byId("cmbAlimen52").set("required", true);
					    	    	}else{
					    				document.getElementById('lblfecha53').style.display='none';
					    				document.getElementById('divfecha53').style.display='none';
					    				registry.byId("cmbAlimen52").set("required", false);
					    			//	fechaAA51=null
					    	    	}
					            }		
				        		
				        		
				        		
				     
				    },"cmbAlimen52");
					
				 
					new DateTextBox({
						name : 'fechaAA53',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su reuni\u00f3n",
					 	required : false,
						readOnly : false,
 					// 	value : new Date(primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta53:""),
						value 			: new Date(primeraReunionObj.actividadesTres!=null&&primeraReunionObj.actividadesTres.respuesta53!=null?primeraReunionObj.actividadesTres.respuesta53:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaAA53");
					
					var cmbAlimen54 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
						required : false,
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta54:"",
				     // required : true
				        		onChange: function(){
					            	if(cmbAlimen54=="SI"){
					            		dom.byId('lblfecha55').innerHTML='<label>En caso afirmativo, registrar cuando se recibir\u00E1 o tramitar\u00E1: </label>';
					            		document.getElementById('lblfecha55').style.display='block';
					    				document.getElementById('divfecha55').style.display='block';
					    	    		registry.byId("cmbAlimen54").set("required", true);
					    	    	}else{
					    				document.getElementById('lblfecha55').style.display='none';
					    				document.getElementById('divfecha55').style.display='none';
					    				registry.byId("cmbAlimen54").set("required", false);
					    			//	fechaAA51=null
					    	    	}
					            }		
				        		
				     
				    },"cmbAlimen54");
					
				 
					new DateTextBox({
						name : 'fechaAA55',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su reuni\u00f3n",
					// 	required : true,
						readOnly : false,
 					// 	value : new Date(primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta55:""),
						value : new Date(primeraReunionObj.actividadesTres!=null&&primeraReunionObj.actividadesTres.respuesta55!=null?primeraReunionObj.actividadesTres.respuesta55:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaAA55");
					
					var cmbIntApecAA56 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Integrante APEC",
				        store:stateStore2,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta56:"",
				        required : false
				     
				    },"cmbIntApecAA56");
					
					var cantidadReq57 = new ValidationTextBox({
	 					id : 'cantidadReq57',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta57:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cantidadReq57');
					
					var cantidadEnt58 = new ValidationTextBox({
	 					id : 'cantidadEnt58',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta58:"",
	 					maxLength : "2",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cantidadEnt58');
					
					new DateTextBox({
						name : 'fechaME59',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su reuni\u00f3n",
					//	required : true,
						readOnly : false,
 					// 	value : new Date(primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta59:""),
						value : new Date(primeraReunionObj.actividadesTres!=null&&primeraReunionObj.actividadesTres.respuesta59!=null?primeraReunionObj.actividadesTres.respuesta59:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaME59");
					
					var cantidadReq60 = new ValidationTextBox({
	 					id : 'cantidadReq60',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta60:"",
	 					maxLength : "3",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cantidadReq60');
					
					var cantidadEnt61 = new ValidationTextBox({
	 					id : 'cantidadEnt61',
	 				 	value : primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta61:"",
	 					maxLength : "3",
	 					placeHolder : "Nota: agregar n\u00famero",
	 					regExp : constants.NUMBER_VALID,
	 					required : false,
	 		            style : "width:50px;"
	 				},'cantidadEnt61');
					
					new DateTextBox({
						name : 'fechaME62',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de su reuni\u00f3n",
					//	required : true,
						readOnly : false,
 					// 	value : new Date(primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta62:""),
						value : new Date(primeraReunionObj.actividadesTres!=null&&primeraReunionObj.actividadesTres.respuesta62!=null?primeraReunionObj.actividadesTres.respuesta62:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaME62");
					
					var cmbMatMob63 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta63:"",
				        required : false
				     
				    },"cmbMatMob63");
					
					new DateTextBox({
						name : 'fechaMM64',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de recepci\u00f3n",
					 	required : false,
						readOnly : false,
 					// 	value : new Date(primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta64:""),
						value : new Date(primeraReunionObj.actividadesTres!=null&&primeraReunionObj.actividadesTres.respuesta64!=null?primeraReunionObj.actividadesTres.respuesta64:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaMM64");
					
					var cmbMatMob65 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta65:"",
				        required : false
				     
				    },"cmbMatMob65");
					
					var explicar66 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta66:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: explicar brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'explicar66');
					
					var cmbMatMob67 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta67:"",
				        required : false
				     
				    },"cmbMatMob67");
					
					var explicar68 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta68:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: explicar brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'explicar68');
					
					var cmbMatMob69 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta69:"",
				        required : false
				     
				    },"cmbMatMob69");
					
					var explicar70 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta70:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: explicar brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'explicar70');
					
					var cmbMatMob71 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta71:"",
				        required : false
				     
				    },"cmbMatMob71");
					
					var mencionar72 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta72:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: mencionar brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'mencionar72');
					
					var cmbMatMob73 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta73:"",
				        required : false
				     
				    },"cmbMatMob73");
					
					var mencionar74 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta74:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: mencionar brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'mencionar74');
					
					var cmbMatMob75 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta75:"",
				        required : false
				     
				    },"cmbMatMob75");
					
					var mencionar76 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta76:"",
						 	require:false,
							maxlength:"250",
							placeHolder : "Nota: mencionar brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'mencionar76');
					
					var cmbMatSuf77 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta77:"",
				        required : false
				     
				    },"cmbMatSuf77");
					
					new DateTextBox({
						name : 'fechaMS78',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de recepci\u00f3n",
					//	required : true,
						readOnly : false,
 					// 	value : new Date(primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta78:""),
						value : new Date(primeraReunionObj.actividadesTres!=null&&primeraReunionObj.actividadesTres.respuesta78!=null?primeraReunionObj.actividadesTres.respuesta78:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaMS78");
					
					var cmbMatSuf79 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta79:"",
				        required : false
				     
				    },"cmbMatSuf79");
					
					new DateTextBox({
						name : 'fechaMS80',
						invalidMessage : "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder : "Ingrese fecha de recepci\u00f3n",
					//	required : true,
						readOnly : false,
 					// 	value : new Date(primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta80:""),
						value : new Date(primeraReunionObj.actividadesTres!=null&&primeraReunionObj.actividadesTres.respuesta80!=null?primeraReunionObj.actividadesTres.respuesta80:""),
						constraints : {
							formatLength : 'short',
							max : today.get('value')
						},
						datePattern : 'dd/MM/yyyy'

					}, "fechaMS80");
					
					var cmbIntApecMS81 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Integrante APEC",
				        store:stateStore2,
				        value: primeraReunionObj.actividadesTres!=null?primeraReunionObj.actividadesTres.respuesta81:"",
				        required : false
				     
				    },"cmbIntApecMS81");
				 
					
					
					
					
					
					
	 				
	 				
	 				
				}
			}else{
				utils.cerrarPestania(idactividadtres);
			}
		}	
	
		
	//Termina Actividades 3 y 4
	
		
//********************************* Inicia actividad 4 y 5


 		
		function _actividadesCuatro(crearActCuatro){
	 		 
			var idactividadcuatro="actividadcuatro";
			var informeR1;
			id : idactividadcuatro;
			var idPanelSecundario="actividadCuatroPanel";
			if(crearActCuatro){
				if(!registry.byId(idactividadcuatro)){
					//Se crea el panel principal, que contendrá toda la sección de Actividad 1
					utils.crearPanel("actividadcuatro","4. Actividad y 5. Integrante de la APEC",'actividadCuatroPane');
					//Sección de Actividades 1
				 //	var line = 0;
				//	var actividadesUnoObj=primeraReunionObj.actividadesuno?primeraReunionObj.actividadesuno:[];
					//Se crea un bloque para agregar la tabla.  @
				//	utils.createTag('div','seccionActividadesUno',idPanelSecundario);
					dom.byId('actividadCuatroPane').innerHTML='<table border="0" align="lefth" width= "750px">'+
								    			 '<tr><span class="sub" align="left">4. Mejora de los espacios educativos.</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Limpieza</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Espacios educativos</b></p>'+
												 '</td></tr>'+
								 	
												 '<tr><td>'+ 
												 '		<p> Fechas</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="fechaEE1"/>'+
								    		 	 '</td></tr>'+
												 
						   			   		 	 '<tr><td>'+ 
												 '		<p> Tareas, procedimientos y recursos que se utilizar\u00E1n</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="tareas2"/>'+
								    		 	 '</td></tr>'+
								    		     '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
								    		 	 
					   			   			 	 
								    			 '</tr>'+
					   			   			 	 	'<td align="left"><label>Participantes e integrante de la APEC que realizar\u00E1 el seguimiento</label></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
						   			   			 	 '	<p> </p>'+
						   			   			 	 '</td></tr>'+
									 		     '<tr><td>'+ 
									 		     ' <input id="intApecEE2a"/>'+
					   			   			 	 '</td></tr>'+
					   			   			     '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
								    		 	 
								    		 	
								    		 	'<tr><td>'+ 
												 '		<p> <b>Sanitarios, cisterna, tinaco o dep\u00F3sito de agua.</b></p>'+
												 '</td></tr>'+
							
												 '<tr><td>'+ 
												 '		<p> Fechas</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="fechaSC3"/>'+
								    		 	 '</td></tr>'+
												 
												
						   			   		 	 '<tr><td>'+ 
												 '		<p> Tareas, procedimientos y recursos que se utilizar\u00E1n</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="tareas4"/>'+
								    		 	 '</td></tr>'+
								    		     '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
								    		 	 
								    		 
								    			 '</tr>'+
					   			   			 	 	'<td align="left"><label>Participantes e integrante de la APEC que realizar\u00E1 el seguimiento</label></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
						   			   			 	 '	<p> </p>'+
						   			   			 	 '</td></tr>'+
									 		     '<tr><td>'+ 
									 		     ' <input id="intApecSC4a"/>'+
					   			   			 	 '</td></tr>'+
								    		 	 
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> <b>Medidas de protecci\u00F3n en zona de riesgo cercanas a los espacios educativos</b></p>'+
												 '</td></tr>'+
										 	 
											
												 '<tr><td>'+ 
												 '		<p> Fechas</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="fechaMP5"/>'+
								    		 	 '</td></tr>'+
												 
												 
						   			   		 	 '<tr><td>'+ 
												 '		<p> Tareas, procedimientos y recursos que se utilizar\u00E1n</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="tareas6"/>'+
								    		 	 '</td></tr>'+
								    		     '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   			 	 
						   			   			 '</tr>'+
					   			   			 	 	'<td align="left"><label>Participantes e integrante de la APEC que realizar\u00E1 el seguimiento</label></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
						   			   			 	 '	<p> </p>'+
						   			   			 	 '</td></tr>'+
									 		     '<tr><td>'+ 
									 		     ' <input id="intApecMP7"/>'+
					   			   			 	 '</td></tr>'+
					   			   			     '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
	
						   			   			 '<tr><td>'+ 
												 '		<p> <b>Actividades de mejora</b></p>'+
												 '</td></tr>'+
												 
												 
												 '<tr>'+
								 		 		 '<td align="left"><label>  \u00bfLa APEC firma carta compromiso para participar en estrategia Fortalecimiento Comunitario para la Educaci\u00F3n? </label></td>'+
								 		 		 '<td><input id="cmbSINO8"/></td>'+
									 		 	 '</tr>'+
									 		 	
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
									 	/*	 	 '<tr>'+
									 		  		'<td align="right"><div id="lblApec9" style="display:block;"></div></td>'+
													'<td><div id="divApec9" style="display:blok;"><input id="cmbIntApecAM9"/></div></td>'+
												 '</tr>'+
												
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   		*/	 	 
					   			   			 	 
						   			   			 '</tr>'+
					   			   			 	 	'<td align="left"><label>Participantes e integrante de la APEC que realizar\u00E1 el seguimiento</label></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
						   			   			 	 '	<p> </p>'+
						   			   			 	 '</td></tr>'+
									 		     '<tr><td>'+ 
									 		     ' <input id="cmbIntApecAM9"/>'+
					   			   			 	 '</td></tr>'+
					   			   			     '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   		 	 	 
						   			   			 '<tr><td>'+ 
												 '		<p> <b>Actividades de mantenimiento</b></p>'+
												 '</td></tr>'+
								 	
												 '<tr><td>'+ 
												 '		<p> Al mobiliario escolar</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="fechaME10"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	'<tr><td>'+ 
												 '		<p> Participantes</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="participantesME11"/>'+
								    		 	 '</td></tr>'+
												 
						   			   		 	 '<tr><td>'+ 
												 '		<p> Recursos, tareas y procedimientos</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="recursosME12"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> Instalaciones el\u00E9ctricas e hidr\u00E1ulicas (si las aulas cuentas con dichos servicios)</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="fechaIE13"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> Participantes</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="participantesIE14"/>'+
								    		 	 '</td></tr>'+
												 
						   			   		 	 '<tr><td>'+ 
												 '		<p> Recursos, tareas y procedimientos</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="recursosIE15"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	'<tr><td>'+ 
												 '		<p> Huerta o parcela escolar</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="fechaHP16"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> Participantes</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="participantesHP17"/>'+
								    		 	 '</td></tr>'+
												 
						   			   		 	 '<tr><td>'+ 
												 '		<p> Recursos, tareas y procedimientos</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="recursosHP18"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	'<tr><td>'+ 
												 '		<p> Cerca perif\u00E9rica y el asta porta bandera</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="fechaCA19"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> Participantes</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="participantesCA20"/>'+
								    		 	 '</td></tr>'+
												 
						   			   		 	 '<tr><td>'+ 
												 '		<p> Recursos, tareas y procedimientos</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="recursosCA21"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    		 	 
								    		 	 '<tr><td>'+ 
												 '		<p> <b>Construcci\u00F3n o rehabilitaci\u00F3n</b></p>'+
												 '</td></tr>'+
												 
												 '<tr><td>'+ 
												 '		<p> <b>Construcci\u00F3n de aula y sanitario</b></p>'+
												 '</td></tr>'+
												 
												 '<tr>'+
								 		 		 '<td align="left"><label>  Se tramitar\u00E1n apoyos econ\u00F3micos o materiales en el municipio o el estado.</label></td>'+
								 		 		 '<td><input id="cmbSINO22"/></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   			 	 
						   			   			 '<tr><td>'+ 
												 '		<p> <b>\u00bfLa comunidad participa en programas para disminuir los rezagos de condiciones f\u00EDsicas?</b></p>'+
												 '</td></tr>'+
					   			   			 	 
					   			   			 	 
					   			   			 	 '<tr>'+
								 		 		 '<td align="left"><label>  Reforma Educativa</label></td>'+'<td><input id="cmbSINO23"/></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr>'+
								 		 		 '<td align="left"><label>  Escuelas al CIEN</label></td>'+'<td><input id="cmbSINO24"/></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   			 	 
						   			   			'<tr><td>'+ 
												 '		<p> <b>Rehabilitaci\u00F3n de espacios educativos</b></p>'+
												 '</td></tr>'+
												 
												 '<tr>'+
								 		 		 '<td align="left"><label>  Se tramitar\u00E1n apoyos econ\u00F3micos o materiales en el municipio o el estado.</label></td>'+
								 		 		 '<td><input id="cmbSINO25"/></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
					   			   			 	 
						   			   			 '<tr><td>'+ 
												 '		<p> <b>\u00bfLa comunidad participa en programas para disminuir los rezagos de condiciones f\u00EDsicas?</b></p>'+
												 '</td></tr>'+
					   			   			 	 
					   			   			 	 
					   			   			 	 '<tr>'+
								 		 		 '<td align="left"><label>  Reforma Educativa</label></td>'+'<td><input id="cmbSINO26"/></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr>'+
								 		 		 '<td align="left"><label>  Escuelas al CIEN</label></td>'+'<td><input id="cmbSINO27"/></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+

						   			   	
												 '<tr>'+
								 		 		 '<td align="left"><label>  \u00bfSe cuenta con espacios de juegos infantiles?</label></td>'+'<td><input id="cmbSINO28"/></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr>'+
								 		 		 '<td align="left"><label>  \u00bfSe tramitar\u00E1 apoyo municipal para construirlo?</label></td>'+'<td><input id="cmbSINO29"/></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
		// 			   			   			 	 
					   			   			 	 
						   			   			 '<tr><td>'+ 
												 '		<div><p><H3 align="left"><b>5. Integrantes de la APEC</b><H3p></p></div>'+
												 '</td></tr>'+
					   			   			 	 
					   			   			
												 
												 '<tr><td>'+ 
												 '		<p> <b>Asociaci\u00F3n Promotora de Educaci\u00F3n Comunitaria</b></p>'+
												 '</td></tr>'+
												
												 '<tr>'+
								 		 		 '<td align="left"><label>  \u00bfSe form\u00F3 un Comit\u00E9 de Contralor\u00EDa?</label></td>'+'<td><input id="cmbSINO30"/></td>'+
									 		 	 '</tr>'+
									 		 	  '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
						   			   			 	 
						   			   			 '<tr><td>'+ 
												 '		<p> En caso negativo, explicar.</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="explicar31a"/>'+
								    		 	 '</td></tr>'+
					   			   			 	 
								    			 '<tr><td>'+ 
						   			   			 	 '	<p> </p>'+
						   			   			 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr>'+
								 		 		 '<td align="left"><label>  Se registraron nombres de representantes en el Acta Constitutiva APEC</label></td>'+'<td><input id="cmbSINO31"/></td>'+
									 		 	 '</tr>'+
									 							   			   			 	 
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
								    		 	 
								    		 	 '<tr>'+
								 		 		 '<td align="left"><label>  \u00bfSe integraron representantes del Programa Educaci\u00F3n Inicial en APEC?</label></td>'+'<td><input id="cmbSINO32"/></td>'+
									 		 	 '</tr>'+
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr><td>'+ 
												 '		<p> En caso negativo, explicar.</p>'+
												 '</td></tr>'+
										 		
												 '<tr><td >'+
											 	 '		<input id="explicar34"/>'+
								    		 	 '</td></tr>'+
								    		 	 
								    			 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			 '<tr>'+
								 		 		 '<td align="left"><label>  Se registraron nombres de representantes en el Acta Constitutiva APEC</label></td>'+'<td><input id="cmbSINO33"/></td>'+
									 		 	 '</tr>'+
									 		 	 '<tr><td>'+ 
					   			   			 	 '	<p> </p>'+
					   			   			 	 '</td></tr>'+
					   			   			 	 
						   			   			
																 
								'</table>';
					
					var today = new DateTextBox({
						value : new Date()
					});
					
					
					var stateStore = new Memory({
				        data: [
				            {name:"SI", id:"SI"},
				            {name:"NO", id:"NO"},
				      //      {name:"NO HAY ACTIVIDAD", id:"NO HAY ACTIVIDAD"},
				             ]
				    });
					
					var stateStore1 = new Memory({
				        data: [
				            {name:"PREESCOLAR", id:"PREESCOLAR"},
				            {name:"PRIMARIA", id:"PRIMARIA"},
				            {name:"SECUNDARIA", id:"SECUNDARIA"},
				    //        {name:"NO HAY ACTIVIDAD", id:"NO HAY ACTIVIDAD"},
				             ]
				    });
					
					var stateStore2 = new Memory({
				        data: [
				            {name:"PRESIDENTE(A)", id:"PRESIDENTE(A)"},
				            {name:"SECRETARIO(A) / VICEPRESIDENTE(A)", id:"SECRETARIO(A) / VICEPRESIDENTE(A)"},
				            {name:"TESORERO(A)", id:"TESORERO(A)"},
				            {name:"VOCAL", id:"VOCAL"},
				      //      {name:"NO HAY ACTIVIDAD", id:"NO HAY ACTIVIDAD"},
				             ]
				    });
					
					var stateStore3 = new Memory({
				        data: [
				            {name:"INTELECTUAL", id:"INTELECTUAL"},
				            {name:"F\u00CDSICA-MOTRIZ", id:"F\u00CDSICA-MOTRIZ"},
				            {name:"MENTAL", id:"MENTAL"},
				            {name:"SENSORIAL", id:"SENSORIAL"},
				    //        {name:"NO HAY ALUMNOS CON DISCAPACIDAD", id:"NO HAY ALUMNOS CON DISCAPACIDAD"},
				               ]
				    });
					
					
					new DateTextBox({
						name 			: 'fechaEE1',
						invalidMessage 	: "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder 	: "Ingrese fecha de su reuni\u00f3n",
					 	required 		: false,
						readOnly 		: false,
						value 			: new Date(primeraReunionObj.actividadesCuatro!=null&&primeraReunionObj.actividadesCuatro.respuesta1!=null?primeraReunionObj.actividadesCuatro.respuesta1:""),
						constraints 	: {
											formatLength : 'short',
											max : today.get('value')
										},
						datePattern 	: 'dd/MM/yyyy'
					}, "fechaEE1");
					
					var tareas2 = new ValidationTextBox({
					  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta2:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: describir brevemente.",
			            style : "width:400px;"
					//	regExp : constants.NUMBER_VALID_NOT_ZERO
					},'tareas2');
					
		 			var intApecEE2a = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta2a:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'intApecEE2a');
					
					new DateTextBox({
						name 			: 'fechaSC3',
						invalidMessage 	: "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder 	: "Ingrese fecha de su reuni\u00f3n",
					//	required 		: true,
						readOnly 		: false,
					 	value 			: new Date(primeraReunionObj.actividadesCuatro!=null&&primeraReunionObj.actividadesCuatro.respuesta3!=null?primeraReunionObj.actividadesCuatro.respuesta3:""),
						constraints 	: {
											formatLength : 'short',
											max : today.get('value')
										},
						datePattern 	: 'dd/MM/yyyy'
					}, "fechaSC3");
					
					var tareas4 = new ValidationTextBox({
					  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta4:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: describir brevemente.",
			            style : "width:400px;"
					//	regExp : constants.NUMBER_VALID_NOT_ZERO
					},'tareas4');
					
					
		 			var intApecSC4a = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta4a:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'intApecSC4a');
					
					
					new DateTextBox({
						name 			: 'fechaMP5',
						invalidMessage 	: "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder 	: "Ingrese fecha de su reuni\u00f3n",
					//	required 		: true,
						readOnly 		: false,
					 	value 			: new Date(primeraReunionObj.actividadesCuatro!=null&&primeraReunionObj.actividadesCuatro.respuesta5!=null?primeraReunionObj.actividadesCuatro.respuesta5:""),
						constraints 	: {
											formatLength : 'short',
											max : today.get('value')
										},
						datePattern 	: 'dd/MM/yyyy'
					}, "fechaMP5");
					
					var tareas6 = new ValidationTextBox({
					  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta6:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: describir brevemente.",
			            style : "width:400px;"
					//	regExp : constants.NUMBER_VALID_NOT_ZERO
					},'tareas6');
					

		 			

		 			
		 			var intApecMP7 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta7:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'intApecMP7');
		 			
			
					var cmbSINO8 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
						required : false,
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta8:"",
				     // required : true
				      /*  		onChange: function(){
					            	if(cmbSINO8=="SI"){
					            		dom.byId('lblApec9').innerHTML='<label>En caso afirmativo, registrar Integrante de APEC para dar seguimiento a la solicitud </label>';
					            		document.getElementById('lblApec9').style.display='block';
					    				document.getElementById('divApec9').style.display='block';
					    	    		registry.byId("cmbSINO8").set("required", true);
					    	    	}else{
					    				document.getElementById('lblApec9').style.display='none';
					    				document.getElementById('divApec9').style.display='none';
					    				registry.byId("cmbSINO8").set("required", false);
					    	    	}
					            }		
				        	*/	
				     
				    },"cmbSINO8");
					
					var cmbIntApecAM9 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Integrante APEC",
				        store:stateStore2,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta9:"",
				        required : false
				     
				    },"cmbIntApecAM9");
					
					
					new DateTextBox({
						name 			: 'fechaME10',
						invalidMessage 	: "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder 	: "Ingrese fecha de su reuni\u00f3n",
					//	required 		: true,
						readOnly 		: false,
					 	value 			: new Date(primeraReunionObj.actividadesCuatro!=null&&primeraReunionObj.actividadesCuatro.respuesta10!=null?primeraReunionObj.actividadesCuatro.respuesta10:""),
						constraints 	: {
											formatLength : 'short',
											max : today.get('value')
										},
						datePattern 	: 'dd/MM/yyyy'
					}, "fechaME10");
					
					var participantesME11 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta11:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'participantesME11');
					
					var recursosME12 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta12:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'recursosME12');
					
					
					new DateTextBox({
						name 			: 'fechaIE13',
						invalidMessage 	: "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder 	: "Ingrese fecha de su reuni\u00f3n",
					//	required 		: true,
						readOnly 		: false,
					 	value 			: new Date(primeraReunionObj.actividadesCuatro!=null&&primeraReunionObj.actividadesCuatro.respuesta13!=null?primeraReunionObj.actividadesCuatro.respuesta13:""),
						constraints 	: {
											formatLength : 'short',
											max : today.get('value')
										},
						datePattern 	: 'dd/MM/yyyy'
					}, "fechaIE13");
					
					var participantesIE14 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta14:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'participantesIE14');
					
					var recursosIE15 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta15:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'recursosIE15');
					
					
					
					new DateTextBox({
						name 			: 'fechaHP16',
						invalidMessage 	: "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder 	: "Ingrese fecha de su reuni\u00f3n",
					//	required 		: true,
						readOnly 		: false,
					  	value 			: new Date(primeraReunionObj.actividadesCuatro!=null&&primeraReunionObj.actividadesCuatro.respuesta16!=null?primeraReunionObj.actividadesCuatro.respuesta16:""),
						constraints 	: {
											formatLength : 'short',
											max : today.get('value')
										},
						datePattern 	: 'dd/MM/yyyy'
					}, "fechaHP16");
					
					var participantesHP17 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta17:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'participantesHP17');
					
					var recursosHP18 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta18:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'recursosHP18');
					
					
					
					new DateTextBox({
						name 			: 'fechaCA19',
						invalidMessage 	: "Ingrese la fecha en formato dd/mm/aaaa",
						placeHolder 	: "Ingrese fecha de su reuni\u00f3n",
					//	required 		: true,
						readOnly 		: false,
					 	value 			: new Date(primeraReunionObj.actividadesCuatro!=null&&primeraReunionObj.actividadesCuatro.respuesta19!=null?primeraReunionObj.actividadesCuatro.respuesta19:""),
						constraints 	: {
											formatLength : 'short',
											max : today.get('value')
										},
						datePattern 	: 'dd/MM/yyyy'
					}, "fechaCA19");
					
					var participantesCA20 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta20:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'participantesCA20');
					
					var recursosCA21 = new ValidationTextBox({
						  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta21:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: describir brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'recursosCA21');
					
					
					var cmbSINO22 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta22:"",
				        required : false
				    },"cmbSINO22");
					
					var cmbSINO23 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta23:"",
				        required : false
				    },"cmbSINO23");
					
					var cmbSINO24 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta24:"",
				        required : false
				    },"cmbSINO24");
					
					var cmbSINO25 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta25:"",
				        required : false
				    },"cmbSINO25");
					
					var cmbSINO26 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta26:"",
				        required : false
				    },"cmbSINO26");
					
					var cmbSINO27 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta27:"",
				        required : false
				    },"cmbSINO27");
					
					var cmbSINO28 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta28:"",
				        required : false
				    },"cmbSINO28");
					
					var cmbSINO29= new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta29:"",
				        required : false
				    },"cmbSINO29");
					
					
					var cmbSINO30 = new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta30:"",
				        required : false
				    },"cmbSINO30");
					
					var cmbSINO31= new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta31:"",
				        required : false
				    },"cmbSINO31");
					
					var explicar31a = new ValidationTextBox({
					  	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta31a:"",
					//	require:true,
						maxlength:"250",
						placeHolder : "Nota: explicar brevemente.",
			            style : "width:400px;"
					//	regExp : constants.NUMBER_VALID_NOT_ZERO
					},'explicar31a');
					
					var cmbSINO32= new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta32:"",
				        required : false
				    },"cmbSINO32");
					
		
					var cmbSINO33= new FilteringSelect({
						//readOnly : edit,
						searchAttr : "name",
						placeHolder : "Seleccione Si/No",
				        store:stateStore,
				        value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta33:"",
				        required : false
				    },"cmbSINO33");
					
			
					
					var explicar34 = new ValidationTextBox({
						 	value: primeraReunionObj.actividadesCuatro!=null?primeraReunionObj.actividadesCuatro.respuesta34:"",
						//	require:true,
							maxlength:"250",
							placeHolder : "Nota: explicar brevemente.",
				            style : "width:400px;"
						//	regExp : constants.NUMBER_VALID_NOT_ZERO
						},'explicar34');
				}
			}else{
				utils.cerrarPestania(idactividadcuatro);
			}
		}	
	
		
	//Termina Actividades 3 y 4
		
		
//********************************* Termina actividad 4 y 5
		
		
		function _apoyos(crearApoyos){
			var listPanelesAPoyo= new Array({title:"Apoyos CONAFE",     tpoList:1,id:"apoyoC"},
											{title:"Apoyos federales",  tpoList:2,id:"apoyoF"},
											{title:"Apoyos est. o mun.",tpoList:3,id:"apoyoE"}
											);
			//Se recorre la lista de los apoyos, se busca el 
			//correspondiente y se envía la información a la 
			//función para mostrarla en pantalla.
			for(var i in listPanelesAPoyo){
				if(crearApoyos){
					if(!registry.byId(listPanelesAPoyo[i].id)){
						var objSelect = null;
						if(listPanelesAPoyo[i].id=="apoyoC"){
							objSelect = primeraReunionObj.apoyosConafe?primeraReunionObj.apoyosConafe:[];
						}else if(listPanelesAPoyo[i].id=="apoyoF"){
							objSelect = primeraReunionObj.apoyosFederales?primeraReunionObj.apoyosFederales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoE"){
							objSelect = primeraReunionObj.apoyosEstatales?primeraReunionObj.apoyosEstatales:[];
						}
						_crearListaApoyos(listPanelesAPoyo[i],objSelect);
						utils.pestaniaSelect(listPanelesAPoyo[0].id);
					}
				}else{
					utils.cerrarPestania(listPanelesAPoyo[i].id);
				}
			}
		}
		function _diagnostico(crearDiag){
			var id="diagnostico";
			var idPanelSecundario="diagnosticoPanel";
			if(crearDiag){
				if(!registry.byId(id)){
					//Se crea el panel principal, que contendrá toda la
					//sección de diagnóstico, que incluye la parte de
					//salud, producción y alfabetización.
					utils.crearPanel(id,'Diagn\u00f3stico comunitario',idPanelSecundario);
					
					//Aquí se encuentra toda la sección de salud.
					var diagSaludObj=primeraReunionObj.diagnostico?primeraReunionObj.diagnostico:[];
					var ckmsSalud = new Array();
					var listSalud= new Array({title:"\u00BFProblemas de salud m\u00E1s frecuentes en la comunidad?",tpoList:1,id:"problemas"},
											 {title:"\u00BFA d\u00F3nde o con qui\u00E9n acuden cuando se " +
											 		"enferma alg\u00FAn miembro de la familia?",tpoList:2,id:"soluciones"});
					
					//Crea un bloque dentro de la pestana y a su vez crea una tabla en ese bloque.
					utils.createTag('div','seccionSalud',idPanelSecundario);
					dom.byId('seccionSalud').innerHTML='<table border="0">'+
															'<tr><span class="sub" align="left">Salud</span></tr>'+
															'<tr><td id="espacioSalud"></td></tr>'+
														'</table>';
					for(var i in listSalud){
						//Crea un bloque para los textos principales de la lista de opciones.
						utils.createTag('div','tituloProblema'+listSalud[i].tpoList,'espacioSalud');
		        		dom.byId('tituloProblema'+listSalud[i].tpoList).innerHTML='<p>'+listSalud[i].title+'</p>';
		        		//Crea la lista de opciones.
		        		utils.createTag('div','listProblemas'+listSalud[i].tpoList,'espacioSalud');
		        		var cms=new CheckedMultiSelect({
		        			id:'listProblemas'+listSalud[i].tpoList,
		        	        multiple:true
		        	     },'listProblemas'+listSalud[i].tpoList);
		        		ckmsSalud.push(cms);
	        			//Se crea el segundo bloque que contendrá al campo te texto que permanecerá oculto.
	        			_crearCampoTextoOculto(listSalud[i].id,'espacioSalud',"Especifique: ",constants.TEXT_FALTA_INFORMACION,false,false);
		        		//Se llenan los check con la información del objeto.
		        		opciones=new Array();
		        		for(var j in diagSaludObj){
		                	if(diagSaludObj[j].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_SALUD){
		                		if(diagSaludObj[j].diagnostico.cSubtipoDiagnostico == listSalud[i].tpoList){
		                			var opSaludMarcado = false;
		                			if(diagSaludObj[j].cApec!=null){
		                				opSaludMarcado = true;
		                			}
		                			opciones.push({
		                        		label: diagSaludObj[j].diagnostico.descripCorta,
		                        		value: diagSaludObj[j].diagnostico.cDiagnosticoCom,
		                        		otros: diagSaludObj[j].diagnostico.otraDescripcion,
		                        		selected:opSaludMarcado
		                        	});
		                			//Si una de las opciones es otros se carga la descripción 
		                			//en el campo de texto.
		                        	if(diagSaludObj[j].diagnostico.otraDescripcion){
		                        		registry.byId('input'+listSalud[i].id).set('value',diagSaludObj[j].descripOtro);
		                        	}
		                    	}
		                	}
		                }
						//Se cargan todas las opciones en los check's
		                registry.byId('listProblemas'+listSalud[i].tpoList).addOption(opciones);
		                _mostrarTxt(registry.byId('listProblemas'+listSalud[i].tpoList),document.getElementById('tab'+listSalud[i].id),registry.byId('input'+listSalud[i].id));
					}
					//Se genera el evento para que cuando selecionen una casilla
					//muestre o no el campo de texto, dependiendo de la opción marcada.
	                ckmsSalud[0].on('click', function(){
						_mostrarTxt(registry.byId('listProblemas'+listSalud[0].tpoList),document.getElementById('tab'+listSalud[0].id),registry.byId('input'+listSalud[0].id));
					});
	
	                //Aquí se encuentra toda la sección de producción.
	                var diagProdObj=primeraReunionObj.diagnostico?primeraReunionObj.diagnostico:[];
					
	                //Se crea un bloque para agregar la tabla.				
					utils.createTag('div','seccionProduccion',idPanelSecundario);
					dom.byId('seccionProduccion').innerHTML='<br>'+
															'<table border="0">'+
																'<tr><span class="sub" align="left">Producci\u00f3n</span></tr>'+
																'<tr><br><td id="espacioCheck"></td></tr>'+
														//		'<tr><br><td id="espacioText"></td></tr>'+ se elimina segundo reglon de produccion
															'</table>';
					for(var i in diagProdObj){
						if(diagProdObj[i].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_PRODUCCION){
							//Se saca de la lista los valores de tipo producción
							var label = diagProdObj[i].diagnostico.descripCorta;
							var value = diagProdObj[i].poblacionAfectada;
							var produccionMarcada = false;
							if(!diagProdObj[i].diagnostico.poblacionAfectada){
								//Se crea el espacio para poder contener el chek y se 
								//marcara en caso de que este ligado a una APEC.
								dom.byId('espacioCheck').innerHTML='<input id="checkBoxProd"/><label>'+' '+ label +'</label>';
								if(diagProdObj[i].cApec!=null){
									produccionMarcada = true;
								}
								new CheckBox({
									id:"checkBoxProd",
							        checked: produccionMarcada,
							    },"checkBoxProd");
							}else{
								//Se crea el campo de texto.
							//	_crearCampoTextoOculto("Produccion","espacioText",label+": ",constants.TEXT_SOLO_NUMEROS,true,true);							
							//	registry.byId('inputProduccion').set('value',value);
							// se elimina segundo reglon de produccion
							}
						}
					}
					
					//Sección de alfabetización
					var line = 0;
					var diagAlfbObj=primeraReunionObj.diagnostico?primeraReunionObj.diagnostico:[];
					//Se crea un bloque para agregar la tabla.
					utils.createTag('div','seccionAlfabetizacion',idPanelSecundario);
					dom.byId('seccionAlfabetizacion').innerHTML='<br>'+
																'<table border="0">'+
																	'<tr><span class="sub" align="left">Alfabetizaci\u00F3n</span></tr>'+
																	'<tr><td id="td0"/></tr>'+
																	'<tr><td id="td1"/></tr>'+
																'</table>';
					for(var i in diagAlfbObj){
						if(diagAlfbObj[i].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_INEA){
							//Se saca de la lista los valores de tipo alfabetización.
							var label = diagAlfbObj[i].diagnostico.descripCorta;
							var value = diagAlfbObj[i].poblacionAfectada;
							var idDiag = diagAlfbObj[i].tipoDiagnostico + diagAlfbObj[i].diagnostico.cDiagnosticoCom;
							_crearCampoTextoOculto(idDiag,"td"+line,label+": ",constants.TEXT_SOLO_NUMEROS,true,true);
							registry.byId('input'+ idDiag).set('value',value);
							line+=1;
						}
					}
				}
			}else{
				utils.cerrarPestania(id);
			}
		}  

			 
		
		function _inclusionSocial(crearNP){

			var listPanelesNP= new Array({title:"Inclusi\u00F3n social", tpoList:1,id:"inclS"},
										 {title:"bullying",  tpoList:2,id:"bullying"});
			//Se recorre la lista de los apoyos, se busca el 
			//correspondiente y se envía la información a la 
			//función para mostrarla en pantalla.
			for(var i in listPanelesNP){
				if(crearNP){
					if(!registry.byId(listPanelesNP[i].id)){
						var objSelect = null;
						var Panel = null;
						if(listPanelesNP[i].id=="inclS"){
							objSelect =primeraReunionObj.inclusion?primeraReunionObj.inclusion:[];						
							Panel ='inclusionPane';
						}else if(listPanelesNP[i].id=="bullying"){
							objSelect = primeraReunionObj.bullying?primeraReunionObj.bullying:[];
							Panel ='bullyingPane';
						}
						_crearListaNP(listPanelesNP[i],objSelect,Panel);
						utils.pestaniaSelect(listPanelesNP[0].id);
					}
				}else{
					utils.cerrarPestania(listPanelesNP[i].id);
				}
			}
		
		}
		function _planDTrabajo(crearPlan){
			var id = "plnTrabajo";
			var idGrid = "gridAccion";
			if(crearPlan){
				if(!registry.byId(id)){
					opciones = new Array();
					var acciones=new Array();
					var accionesObj=primeraReunionObj.planTrabajo?primeraReunionObj.planTrabajo:[];
					//Creamos el layout con el nombre de las columnas de la tabla y sus propiedades.
					var layoutAcciones = [[{name:'columna1',field:'id',hidden:true},
					                       	{name:'idTpoAccion',field:'idTpoAccion',hidden:true},
					                        {name:'idAccion',field:'idAccion',hidden:true},
					                        {name:'Nombre',width:'272px',styles:'text-align: left;',field:'nombre'},
					                        {name:'N\u00FAmero de \u000A veces',width:'120px',styles:'text-align: center;',field:'numVeces'},
					                        {name:'Otros',styles:'text-align: center;',field:'otros',hidden:true},]];
					//Se crea un bloque para agregar la estructura de la tabla.
					utils.crearPanel("plnTrabajo","Plan de trabajo",'planTrabajoPane');
					dom.byId('planTrabajoPane').innerHTML='<table border="0" width= "900px" cellspacing="10">'+
												'<tr>'+
													'<td><span align="left" class="sub" align="left">Apoyo a figuras educativas</span></td>'+
													'<td><span align="left" class="sub" align="left">Acciones</span></td>'+
												'</tr>'+
												'<tr>'+
													'<td width= "450px" valign="top"><input id="cmsPlanT"/></td>'+
													'<td width= "450px"><div id="gridPT"/></td>'+
												'</tr>'+
												'<tr>'+
													'<td id="nada"></td>'+
													'<td id="buttonsAcc" align="center"></td>'+
												'</tr>'+
										   '</table>';
					//En esta parte solo se revisara las acciones de tipo uno, 
					//que corresponden a los apoyos.
					for (var i in accionesObj){
						if(accionesObj[i].accion.cTipo==constants.PLAN_TRABAJO_APOYO){
							
							var apoyoPlanTMarcado=false;
							if(accionesObj[i].cApec!=null){
								apoyoPlanTMarcado=true;
							}
							//Llenamos el arreglo con la información para el check.
							opciones.push({
								label: utils.dividirString(accionesObj[i].accion.descripCortar1,50),
								value : accionesObj[i].accion.cAccion,
								selected : apoyoPlanTMarcado
							});
						}else if(accionesObj[i].accion.cTipo==constants.PLAN_TRABAJO_ACCION){
							//En esta parte solo se revisara las acciones de tipo uno, 
							//que corresponden a las acciones.
							var accion = {
							    id : i,
							    idTpoAccion : accionesObj[i].accion.cTipoAccion,
							    idAccion : accionesObj[i].accion.cAccion,
							    nombre : !accionesObj[i].nomOtra?accionesObj[i].accion.descripCortar1:accionesObj[i].accion.brigadaEsp?accionesObj[i].accion.descripCortar1 +' Especifique cu\u00E1l: '+ accionesObj[i].nomOtra:accionesObj[i].accion.descripCortar1 +': '+ accionesObj[i].nomOtra,
							    numVeces : accionesObj[i].numVecesr1,
							    otros : accionesObj[i].nomOtra
							};
							acciones.push(accion);
						}
					}
					//Se crea el widget del check multiselección
					//y se le agregan las opciones encontradas.
					var ckmsPT=new CheckedMultiSelect({
						id:'cmsPlanT',
				        multiple:true
				     },'cmsPlanT');
					ckmsPT.addOption(opciones);
					//En esta parte se crean los grid con la información
					utils.crearGrid('gridPT',layoutAcciones,'idAccion',acciones,idGrid);
					//Sección para los botones.
					_agregarFilaGrid('Accion','buttonsAcc');

					utils.createTag('input','editAccion','buttonsAcc');
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId(idGrid);
							var items = grid.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEdit={
					                			idTpoAccion : grid.store.getValue(selectedItem,'idTpoAccion'),
					                			idAccion : grid.store.getValue(selectedItem,'idAccion'),
					                			nombre : grid.store.getValue(selectedItem,'nombre'),
					                			numVeces : grid.store.getValue(selectedItem,'numVeces'),
					                			otros : grid.store.getValue(selectedItem,'otros'),
										    };
					                	_popupAccion(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editAccion');
	
					utils.eliminarFilaGrid('gridAccion','buttonsAcc',0,false);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}


		
		// VBLAKE Función Contraloria Social
		
		function _contraloriaSocial(crearConstraloriaS){
			var id = "ctrlSocial";
			var idGridOC = "gridAccionOC";
			var idGridDQ = "gridAccionDQ";
			if(crearConstraloriaS){
				if(!registry.byId(id)){
		//			opciones = new Array();
					var opiniones=new Array();
					var denuncias=new Array();
					var opinionesObj=primeraReunionObj.opiniones?primeraReunionObj.opiniones:[];
					var denunciasObj=primeraReunionObj.denuncias?primeraReunionObj.denuncias:[];
					//Creamos el layout con el nombre de las columnas de la tabla y sus propiedades.
					var layoutOpiniones = [[{name:'columna1',field:'id',hidden:true},
					                        {name:'cOpiniones',field:'cOpiniones',hidden:true},
					                        {name:'Describir brevemente',field:'opiniones',width:'450px',styles:'text-align: left;'}]];
					var layoutDenuncias = [[{name:'columna1',field:'id',hidden:true},
					                        {name:'cDenuncias',field:'cDenuncias',hidden:true},
					                        {name:'Describir brevemente',field:'denuncias',width:'450px',styles:'text-align: left;'}]];
					//Se crea un bloque para agregar la estructura de la tabla.
					utils.crearPanel("ctrlSocial","Contraloria Social",'contraloriaSocialPane');
					dom.byId('contraloriaSocialPane').innerHTML='<table border="0" width= "900px" cellspacing="10">'+
												'<tr>'+
													'<td><span align="left" class="sub" align="left">Opiniones y comentarios adicionales</span></td>'+
													'<td><span align="left" class="sub" align="left">Denuncias o quejas</span></td>'+
												'</tr>'+
												'<tr>'+
													//'<td width= "450px" valign="top"><input id="cmsContraloriaS"/></td>'+
													'<td width= "450px"><div id="gridCSoc"/></td>'+
													'<td width= "450px"><div id="gridCSdq"/></td>'+
												'</tr>'+
												'<tr>'+
													//'<td id="nada"></td>'+
													'<td id="buttonsOpi" align="center"></td>'+
											    	'<td id="buttonsAcc2" align="center"></td>'+
												'</tr>'+
										   '</table>';
					
					for(var j in opinionesObj){
						var opi = {
						    id:j,
						    cOpiniones:opinionesObj[j].cOpiniones,
						    opiniones:opinionesObj[j].opiniones,
						 };
						opiniones.push(opi);
					}
					
	 				for(var j in denunciasObj){
	 					var denun = {
	 	 				    id:j,
	 	 				    cDenuncias:denunciasObj[j].cDenuncias,
	 	 				    denuncias:denunciasObj[j].denuncias,
	 	 				 };
	 	 					denuncias.push(denun);
	 	 			}
					
					
					//En esta parte se crean los grid con la información
					utils.crearGrid('gridCSoc',layoutOpiniones,'id',opiniones,idGridOC);
					utils.crearGrid('gridCSdq',layoutDenuncias,'id',denuncias,idGridDQ);
					//Sección para los botones.
					_agregarFilaGrid('accionCSoc','buttonsOpi');
					_agregarFilaGrid('accionCSdq','buttonsAcc2');

					utils.createTag('input','editAccionOC','buttonsOpi');
					new Button({
						label:'Editar',
						onClick:function(){
							var gridOC = registry.byId(idGridOC);
							var items = gridOC.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEdit={
					                			opiniones :gridOC.store.getValue(selectedItem,'opiniones'),
					                	};
					                	_popupOpiniones(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editAccionOC');
	
					utils.eliminarFilaGrid('gridAccionOC','buttonsOpi',0,false);
						
					// Segunda Ventana
				 
					utils.createTag('input','editAccionDQ','buttonsAcc2');
					new Button({
						label:'Editar',
						onClick:function(){
							var gridDQ = registry.byId(idGridDQ);
							var items = gridDQ.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEdit={
					                	    denuncias :gridDQ.store.getValue(selectedItem,'denuncias'),
										    };
					                	_popupDenuncias(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editAccionDQ');
					utils.eliminarFilaGrid('gridAccionDQ','buttonsAcc2',0,false);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
				
		
		// Vblake Inicia Numero de alumnos 
		
		function _alumnos(crearNumeroDeAlumnos){
			var id = "alumnos";
			var idGridAlum = "gridAlumnos";  
			

			if(crearNumeroDeAlumnos){
				if(!registry.byId(id)){
					opciones = new Array();
					var numalum=new Array();
					var alumnosObj=primeraReunionObj.numeroAlumnos?primeraReunionObj.numeroAlumnos:[];
					//Creamos el layout con el nombre de las columnas de la tabla y sus propiedades.
					var layoutAlumnos = [[{name:'columna1',field:'id',hidden:true},
					                        {name:'cNumAlum',field:'cNumAlum',hidden:true},
											{name:'Clave de Centro de Trabajo',width:'150px',styles:'text-align: left;',field:'cct'},
											{name:'N\u00FAmero de alumnos hombres',field:'ninos',width:'100px',styles:'text-align: center;'},
											{name:'N\u00FAmero de alumnos mujeres',field:'ninas',width:'100px',styles:'text-align: center;'}]];
							
					//Se crea un bloque para agregar la estructura de la tabla.
					utils.crearPanel("alumnos","Alumnos",'alumnosPane');
					dom.byId('alumnosPane').innerHTML='<table border="0" width= "900px" cellspacing="10">'+
												'<tr>'+
													'<td><span align="left" class="sub" align="left">N\u00famero de alumnos hombres y mujeres por centro de trabajo</span></td>'+
												
												'</tr>'+
												'<tr>'+
													
													'<td width= "450px"><div id="gridNumAlum"/></td>'+
													
												'</tr>'+
												'<tr>'+
													
													'<td id="buttonsAcc1" align="center"></td>'+
											    	
												'</tr>'+
										   '</table>';
					
					// seccion para leer la base de datos y mostrar en el grid al momemento de consultar o iniciar la captura
					
					for(var j in alumnosObj){
						var alum = {
						    id:j,
						    cNumAlum:alumnosObj[j].cNumAlum,
						    cct:alumnosObj[j].cct,
						    ninos:alumnosObj[j].ninos,
						    ninas:alumnosObj[j].ninas,
						    
						};
						numalum.push(alum);
					}
					//En esta parte se crean los grid con la información
					utils.crearGrid('gridNumAlum',layoutAlumnos,'id',numalum,idGridAlum);
		
					//Sección para los botones.
					_agregarFilaGrid('numeroAlumnos','buttonsAcc1');  
				

					utils.createTag('input','editNumAlum','buttonsAcc1');
					new Button({
						label:'Editar',
						onClick:function(){
							var gridAlum = registry.byId(idGridAlum);
							var items = gridAlum.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){	
					                	var itemToEdit={
					                			cct :gridAlum.store.getValue(selectedItem,'cct'),
					                			ninos :gridAlum.store.getValue(selectedItem,'ninos'),
					                			ninas :gridAlum.store.getValue(selectedItem,'ninas'),
							           	};
					                	_popupNumeroDeAlumnos(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editNumAlum');
	
					utils.eliminarFilaGrid('gridAlumnos','buttonsAcc1',0,false);
						
	
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
				
		
		// Vblake termina Numero de alumnos 
		
		
		
		// VBLAKE se crea el Grid con las opciones de Apoyos CONAFE, Federales y Estatales de acuerdo al tipo de apoyo
		
		function _crearListaApoyos(pestaniaDestino,listApoyos){	
			var idPanelSecundario='Apoyo' + pestaniaDestino.tpoList;
							
			if(pestaniaDestino.tpoList==1){
				var idGrid = "gridConafe";
				var listApoyosC = primeraReunionObj.apoyosConafe?primeraReunionObj.apoyosConafe:[];	
				var apoyosConafe=new Array();
				var idPanelSecundario = "ApoyoPaneConafe";
				
				
			    var layoutApoyoCo = [[{name:'columna1',field:'id',hidden:true},
				                        {name:'cApoyo',field:'cApoyo',hidden:true},
				                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
				                        {name:'\u00BFCu\u00e1l?',field:'cual',width:'272px',styles:'text-align: left;'},
				                        {name:'Cantidad',field:'cantidad',width:'80px',styles:'text-align: center;'},
				                        {name:'Alumnos beneficiados',field:'beneficiarios',width:'80px',styles:'text-align: center;'},
				                     /*   {name:'Se gestion\u00e1',width:'272px',styles:'text-align: left;',field:'gestion'}*/]];
			    

				utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
				
				dom.byId('ApoyoPaneConafe').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
					'<td width= "450px"><span class="sub" align="left">Apoyos de programas Conafe recibidos o por gestionar </span></td>'+
				'<tr>'+
					'<td id="gridAc" align="center"></td>'+
				'</tr>'+
				'<tr>'+
					'<td><div id="buttonAc" align="center"></td>'+
				'</tr>'+
			    '</table>';
				
			    // En el For se lee la base de datos apec_apoyos para mostrar los datos en caso que exista una captura previa
				
				for(var i in listApoyosC){
			    	if (listApoyosC[i].tipoApoyo !='' && listApoyosC[i].tipoApoyo !=null ){
					var apoyoCo = {
					    id:i,
					    cApoyo : listApoyosC[i].cApoyo,
					    apoyo:listApoyosC[i].nombre,
					    cual:listApoyosC[i].otro,
					    cantidad : listApoyosC[i].cantidad,
					    beneficiarios : listApoyosC[i].numBenef,
					    gestion : listApoyosC[i].gestion
					};
						apoyosConafe.push(apoyoCo);
			    	}
				}
			    utils.crearGrid('gridAc',layoutApoyoCo,'cApoyo',apoyosConafe,idGrid);
			  //Sección para los botones.
				_agregarFilaGrid('Conafe','buttonAc');
				utils.createTag('input','editapoyosConafe','buttonAc');
				new Button({
					label:'Editar',
					onClick:function(){
						var grid = registry.byId(idGrid);
						var items = grid.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){	
				                	var itemToEdit={
				                			cApoyo :grid.store.getValue(selectedItem,'cApoyo'),
				           				    apoyo:grid.store.getValue(selectedItem,'apoyo'),
				           				    cual:grid.store.getValue(selectedItem,'cual'),
				           				    cantidad:grid.store.getValue(selectedItem,'cantidad'),
				           				    beneficiarios :grid.store.getValue(selectedItem,'beneficiarios'),
				           				    gestion :grid.store.getValue(selectedItem,'gestion'),
				                			};
				                	_popupConafe(itemToEdit);
								}
							}); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
				},'editapoyosConafe');			
				utils.eliminarFilaGrid(idGrid,'buttonAc',0,false);
				}
			
			
			else if(pestaniaDestino.tpoList==2){
				var idGrid = "gridFederal";
				var listApoyosF = primeraReunionObj.apoyosFederales?primeraReunionObj.apoyosFederales:[];	
				var apoyosFederales=new Array();
				var idPanelSecundario = "ApoyoPane";
				
				
			    var layoutApoyo = [[{name:'columna1',field:'id',hidden:true},
				                        {name:'cApoyo',field:'cApoyo',hidden:true},
				                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
				                        {name:'\u00BFCu\u00e1l?',field:'cual',width:'272px',styles:'text-align: left;'},
				                        {name:'Cantidad',field:'cantidad',width:'80px',styles:'text-align: center;'},
				                        {name:'N\u00famero de beneficiarios',field:'beneficiarios',width:'80px',styles:'text-align: center;'},
				                        {name:'Se gestion\u00e1',width:'80px',styles:'text-align: center;',field:'gestion'}]];
			    

				utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
				
				dom.byId('ApoyoPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
					'<td width= "450px"><span class="sub" align="left">Apoyos de programas federales recibidos o por gestionar </span></td>'+
				'<tr>'+
					'<td id="gridAf" align="center"></td>'+
				'</tr>'+
				'<tr>'+
					'<td><div id="buttonAf" align="center"></td>'+
				'</tr>'+
			    '</table>';
				
			    // Lee la Base de datos apec_apoyo
				
				for(var i in listApoyosF){
					var apoyo = {
					    id:i,
					    cApoyo : listApoyosF[i].cApoyo,
					    apoyo:listApoyosF[i].nombre,
					    cual:listApoyosF[i].otro,
					    cantidad : listApoyosF[i].cantidad,
					    beneficiarios : listApoyosF[i].numBenef,
					    gestion : listApoyosF[i].gestion
					};
					apoyosFederales.push(apoyo);
				}
			    utils.crearGrid('gridAf',layoutApoyo,'cApoyo',apoyosFederales,idGrid);
			  //Sección para los botones.
				_agregarFilaGrid('Federal','buttonAf');
				utils.createTag('input','editapoyosFederales','buttonAf');
				new Button({
					label:'Editar',
					onClick:function(){
						var grid = registry.byId(idGrid);
						var items = grid.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){	
				                	var itemToEdit={
				                			cApoyo :grid.store.getValue(selectedItem,'cApoyo'),
				           				    apoyo:grid.store.getValue(selectedItem,'apoyo'),
				           				    cual:grid.store.getValue(selectedItem,'cual'),
				           				    cantidad :grid.store.getValue(selectedItem,'cantidad'),
				           				    beneficiarios :grid.store.getValue(selectedItem,'beneficiarios'),
				           				    gestion :grid.store.getValue(selectedItem,'gestion'),
				                			};
				                	_popupFederal(itemToEdit);
								}
							}); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
				},'editapoyosFederales');			
				utils.eliminarFilaGrid(idGrid,'buttonAf',0,false);
				}
			else if(pestaniaDestino.tpoList==3){
			var idGrid = "gridEstatal";
			var listApoyosE = primeraReunionObj.apoyosEstatales?primeraReunionObj.apoyosEstatales:[];	
			var apoyosEstatales=new Array();
			var idPanelSecundario = "apoyosEstatales";
			
			
		    var layoutApoyoE = [[{name:'columna1',field:'id',hidden:true},
			                        {name:'cApoyo',field:'cApoyo',hidden:true},
			                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
			                        {name:'Especifique',field:'especifique',width:'200px',styles:'text-align: center;'},
			                        {name:'Describir',field:'describir',width:'200px',styles:'text-align: center;'},
			                        {name:'N\u00famero de beneficiarios',field:'beneficiarios',width:'80px',styles:'text-align: center;'},
			                        {name:'Se gestionar\u00e1',width:'80px',styles:'text-align: center;',field:'gestion'}]];
		    

			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
			
			dom.byId('apoyosEstatales').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
			'<tr>'+
				'<td width= "450px"><span class="sub" align="left">Apoyos de programas estatales recibidos o por gestionar </span></td>'+
			'<tr>'+
				'<td id="gridAe" align="center"></td>'+
			'</tr>'+
			'<tr>'+
				'<td><div id="buttonAe" align="center"></td>'+
			'</tr>'+
		    '</table>';
			
			//lee la base de datos para mostrar la información previamente capturada
		    for(var i in listApoyosE){
				var apoyoE = {
				    id:i,
				    cApoyo : listApoyosE[i].cApoyo,
				    apoyo:listApoyosE[i].nombre,
				    especifique:listApoyosE[i].otro,
				    describir : listApoyosE[i].descripApoyo,
				    beneficiarios : listApoyosE[i].numBenef,
				    gestion : listApoyosE[i].gestion
				};
				apoyosEstatales.push(apoyoE);
			}
		    utils.crearGrid('gridAe',layoutApoyoE,'cApoyo',apoyosEstatales,idGrid);
		  //Sección para los botones.
			_agregarFilaGrid('Estatal','buttonAe');
			utils.createTag('input','editapoyosEstatales','buttonAe');
			new Button({
				label:'Editar',
				onClick:function(){
					var grid = registry.byId(idGrid);
					var items = grid.selection.getSelected();
					if(items.length==1){
			             dojo.forEach(items, function(selectedItem){
			                 if(selectedItem !== null){	
			                	var itemToEdit={
			                			cApoyo :grid.store.getValue(selectedItem,'cApoyo'),
			           				    apoyo:grid.store.getValue(selectedItem,'apoyo'),
			           				    especifique :grid.store.getValue(selectedItem,'especifique'),
			           				    describir :grid.store.getValue(selectedItem,'describir'),
			           				    beneficiarios :grid.store.getValue(selectedItem,'beneficiarios'),
			           				    gestion :grid.store.getValue(selectedItem,'gestion'),
			                			};
			                	_popupEstatal(itemToEdit);
							}
						}); 
			         }else{
			        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
			         }
				}
			},'editapoyosEstatales');			
			utils.eliminarFilaGrid(idGrid,'buttonAe',0,false);
			}
		}
		
		
		function _crearListaNP(pestaniaDestino,listPN,PanelPN){
			var idGrid = "gridBullying";
			//Crea la pestaña y el primer bloque.
			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,PanelPN); 
			if(pestaniaDestino.id =="bullying"){
				objSelect = primeraReunionObj.bullying?primeraReunionObj.bullying:[];
				var bullying=new Array();
				dom.byId('bullyingPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
					'<td width= "450px"><span class="sub" align="left">Casos de acoso escolar (bullying) presentados en la escuela</span></td>'+
				'<tr>'+
					'<td id="gridBl" align="center"></td>'+
				'</tr>'+
				'<tr>'+
					'<td><div id="buttonB" align="center"></td>'+
				'</tr>'+
			  '</table>';
				var layoutBullying = [[{name:'columna1',field:'id',hidden:true},
				                       	{name:'idTpoBullying',field:'idTpoBullying',hidden:true},
				                       	{name:'nomTipoBullying',field:'nomTipoBullying',hidden:true},
				                        {name:'idBullying',field:'idBullying',hidden:true},
				                        {name:'Nombre',width:'272px',styles:'text-align: left;',field:'nombre'},
				                        {name:'N\u00famero de casos',field:'cuantos',width:'80px',styles:'text-align: center;'},
				                        {name:'Acciones a emprender o apoyos a gestionar',width:'272px',styles:'text-align: left;',field:'numveces'}]];
				
				for(var j in objSelect){
					var situacionBullying = {
					    id:j,
					    idTpoBullying:objSelect[j].cCoTipoBullying,
					    nomTipoBullying:objSelect[j].nomTipoBullying,
					    idBullying:objSelect[j].cCoBullying,
					    nombre:objSelect[j].descripCortar1,
					    cuantos:objSelect[j].cuantos,
					    numveces:objSelect[j].numvecesr1,
					};
					bullying.push(situacionBullying);
				}
				utils.crearGrid('gridBl',layoutBullying,'idBullying',bullying,idGrid);
				//Sección para los botones.
				_agregarFilaGrid('Bullying','buttonB');
				utils.createTag('input','editBullying','buttonB');
				new Button({
					label:'Editar',
					onClick:function(){
						var grid = registry.byId(idGrid);
						var items = grid.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){	
				                	var itemToEdit={
				                			idTpoBullying:grid.store.getValue(selectedItem,'idTpoBullying'),
				                			nomTipoBullying:grid.store.getValue(selectedItem,'nomTipoBullying'),
				                			idBullying : grid.store.getValue(selectedItem,'idBullying'),
				                			nombre : grid.store.getValue(selectedItem,'nombre'),
				                			cuantos : grid.store.getValue(selectedItem,'cuantos'),
				                			numveces : grid.store.getValue(selectedItem,'numveces')
									    };
				                	_popupBullying(itemToEdit);
				                 }
				             }); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
				},'editBullying');
				utils.eliminarFilaGrid(idGrid,'buttonB',0,false);
				
				
			}
			if(pestaniaDestino.id=="inclS"){
				var necesidadesObj=primeraReunionObj.necesidadesEspeciales?primeraReunionObj.necesidadesEspeciales:[];
				var situacionIndigenaObj=primeraReunionObj.pobIndigena?primeraReunionObj.pobIndigena:[];
				var necesidades=new Array();
				var situacionesIndigenas=new Array();
				var layoutNecesidad = [[{name:'id',field:'id',hidden:true},
					                        {name:'cApoyo',field:'cApoyo',hidden:true},
					                        {name:'Necesidad',width:'315px',styles:'text-align: left;',field:'necesidad'},
					                        {name:'idTipoNecesidad',field:'cNee',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee',width:'215px',styles:'text-align: left;'},
					                        {name:'N\u00famero de Ni\u00f1os',width:'80px',styles:'text-align: center;',field:'cuantos'},
					                        {name:'Apoyos por gestionar',field:'gestion',width:'215px',styles:'text-align: left;'},
					                        {name:'idTipoNecesidad',field:'cNee1',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee1',width:'215px',styles:'text-align: left;'},
					                        {name:'N\u00famero de Ni\u00f1os',width:'80px',styles:'text-align: center;',field:'cuantos1'},
					                        {name:'Apoyos por gestionar',field:'gestion1',width:'215px',styles:'text-align: left;'}]];
					
				
				var layoutPoblacion = [[{name:'id',field:'id',hidden:true},
				                        {name:'idSituacion',field:'idSituacion',hidden:true},
				                        {name:'Situaci\u00F3n de ni\u00F1os ind\u00EDgenas',field:'situacion',width:'215px',styles:'text-align: left;'},
				                        {name:'\u00BFCu\u00E1ntos?',field:'cuantos',width:'80px',styles:'text-align: center;'},
				                        {name:'idLengua',field:'idLengua',hidden:true},
				                        {name:'\u00BFQue lengua hablan?',field:'lengua',width:'100px',styles:'text-align: center;'}]];
				
				dom.byId('inclusionPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
										'<tr>'+
											'<td width= "450px"><span class="sub" align="left">Detecci\u00F3n de necesidades educativas especiales</span></td>'+
											'<td width= "450px"><span class="sub" align="left">Poblaci\u00F3n ind\u00EDgena</span></td>'+
										'<tr>'+
											'<td id="gridISL" align="center"></td>'+
											'<td id="gridISR" align="center"></td>'+
										'</tr>'+
										'<tr>'+
											'<td><div id="buttonsL" align="center"></td>'+
											'<td><div id="buttonsR" align="center"></td>'+
										'</tr>'+
									  '</table>';
				
				//Sección de necesidades educativas.
					for(var i in necesidadesObj){
						var necesidad = {
						    id:i,
						    cApoyo:necesidadesObj[i].cApoyo,
						    necesidad:necesidadesObj[i].descripLarga,
						    cNee:necesidadesObj[i].cNee,
						    nomNee:necesidadesObj[i].nomNee,
						    cuantos:necesidadesObj[i].cuantos,
						    gestion:necesidadesObj[i].gestionar, 
						    cNee1:necesidadesObj[i].cNee1,
						    nomNee1:necesidadesObj[i].nomNee1,
						    cuantos1:necesidadesObj[i].cuantos1,
						    gestion1:necesidadesObj[i].gestionar1
						};
						necesidades.push(necesidad);
					}
					
					
					utils.crearGrid('gridISL',layoutNecesidad,'cApoyo',necesidades,'gridNecesidad');
					
					_agregarFilaGrid('Necesidad','buttonsL');
					utils.createTag('input','editNecesidad','buttonsL');
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId('gridNecesidad');
							var items = grid.selection.getSelected();
							if(items.length==1){
					             dojo.forEach(items, function(selectedItem){
					                 if(selectedItem !== null){
					                	var itemToEdit={
					                			cApoyo: grid.store.getValue(selectedItem,'cApoyo'),
					                			necesidad: grid.store.getValue(selectedItem,'necesidad'),
					                			cNee:grid.store.getValue(selectedItem,'cNee'),
					                			nomNee:grid.store.getValue(selectedItem,'nomNee'),
					                			cuantos: grid.store.getValue(selectedItem,'cuantos'),
					                			gestion: grid.store. getValue(selectedItem,'gestion'),
					                			cNee1:grid.store.getValue(selectedItem,'cNee1'),
					                			nomNee1:grid.store.getValue(selectedItem,'nomNee1'),
					                			cuantos1: grid.store.getValue(selectedItem,'cuantos1'),
					                			gestion1: grid.store.getValue(selectedItem,'gestion1'),
										    };
					                	_popupNecesidad(itemToEdit);
					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editNecesidad');
					utils.eliminarFilaGrid('gridNecesidad','buttonsL',0,false);

				//Sección de población indígena.
				for(var j in situacionIndigenaObj){
					var situacionIndigena = {
					    id:j,
					    idSituacion:situacionIndigenaObj[j].cPoblacionIndigena,
					    situacion:situacionIndigenaObj[j].poblacionIndigena,
					    cuantos:situacionIndigenaObj[j].poblacionAfectada,
					    idLengua:situacionIndigenaObj[j].cLengua,
					    lengua:situacionIndigenaObj[j].lengua
					};
					situacionesIndigenas.push(situacionIndigena);
				}
				
				utils.crearGrid('gridISR',layoutPoblacion,'idSituacion',situacionesIndigenas,'gridSituaciones');
				
				_agregarFilaGrid('Situacion','buttonsR');
				utils.createTag('input','editSituacion','buttonsR');
				new Button({
					label:'Editar',
					onClick:function(){
						var grid = registry.byId('gridSituaciones');
						var items = grid.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){	
				                	var itemToEdit={
				                			idSituacion : grid.store.getValue(selectedItem,'idSituacion'),
				    					    situacion : grid.store.getValue(selectedItem,'situacion'),
				    					    cuantos : grid.store.getValue(selectedItem,'cuantos'),
				    					    idLengua : grid.store.getValue(selectedItem,'idLengua'),
				    					    lengua : grid.store.getValue(selectedItem,'lengua')
									    };
				                	_popupPoblacion(itemToEdit);
				                 }
				             }); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
				},'editSituacion');
				utils.eliminarFilaGrid('gridSituaciones','buttonsR',0,false);
			}
		}
		
		
		function _mostrarTxt(lstCMS,tabContainer,txtSelect){
			//Recorre la lista de check's para encontrar la opción de otros y revisar si 
			//esta seleccionada o no, y ver si muestra o no la caja de texto.
			var data = lstCMS.getOptions();
			for(var i=0;i<data.length;i++){
				if(data[i].otros==true && data[i].selected==true){
					//Se marca la ele campo de texto como requerido.
					tabContainer.style.display = 'block';
					txtSelect.set("required",true); 
				}else if(data[i].otros==true && data[i].selected==false){
					//Se oculta el bloque completo, donde se encuentra montado el campo de texto.
					tabContainer.style.display = 'none';
					txtSelect.set("required",false);
				}
			}
		}

		function _crearCampoTextoOculto(id,embedded,textoLabel,mensaje,visible,numerico){
			//Crea un  campo te texto con una etiqueta al inicio.
			var hideDiv="none";
			if(visible){hideDiv="block";} //Define si se mostrara o no el bloque de elementos.
			utils.createTag('div','tab' + id,embedded);
			dom.byId('tab' + id).innerHTML='<br/><label>'+ textoLabel+'</label><input id="input'+id+'"/>';
			document.getElementById('tab' + id).style.display=hideDiv;
			if(numerico){
				new ValidationTextBox({
		            promptMessage:mensaje,
		            trim:true,
		            maxLength:"4",
		  	        regExp : constants.NUMBER_VALID_NOT_ZERO
				},'input' + id);
			}else{
				new ValidationTextBox({
		            promptMessage:mensaje,
		            trim:true,
		            maxlength:150,
		            placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
		            style : "width:500px;"
				},'input' + id);
			}
		}

		function _agregarFilaGrid(nombreGrid,embedded){
			//La función crea un botón para poder agregar
			//una fila al grid seleccionado.
			utils.createTag('input','add'+nombreGrid,embedded);
			new Button({
				id : 'add'+nombreGrid,
				label:'Agregar',
				onClick: function(){
					if(nombreGrid=="Federal"){
						_popupFederal();
					}else if(nombreGrid=="Conafe"){
						_popupConafe();
					}else if(nombreGrid=="Estatal"){
						_popupEstatal();
					}else if(nombreGrid=="Apoyo"){
						_popupApoyos();
					}else if(nombreGrid=="Necesidad"){
						_popupNecesidad();
					}else if(nombreGrid=="Situacion"){
						_popupPoblacion();
					}else if(nombreGrid=="Bullying"){
						_popupBullying();
					}else if(nombreGrid=="Accion"){
						_popupAccion();
					}else if(nombreGrid=="accionCSoc"){
						_popupOpiniones();
					}else if(nombreGrid=="accionCSdq"){
						_popupDenuncias();
					}else if(nombreGrid=="numeroAlumnos"){
						_popupNumeroDeAlumnos();
					}else if(nombreGrid=="accionPD"){
						_popupDificultades();
					}else if(nombreGrid=="accionPN"){
						_popupNecesidades();
					}
					
				 }
			},'add'+nombreGrid);
		}
		
		//******************Inicia POPUP
		
	
		function _popupDificultades(itemToEdit){
			//Ventana de captura Principales Dificultades  
			
			var edit = false;
			var exitenBrigadas = false;
			if(!itemToEdit){
				itemToEdit= {
				dificultades : ''					 
				};	
			}else{			
				edit=true;
			}
			
			var idVentana='popUPDificultades';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Principales Dificultades", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td align="right"><label>* \u00BFPrincipales Dificultades que presentan las alumnas y alumnos: </label></td>'+
									'<td><input id="txtDificultades"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
		
			
			var txtDificultades = new ValidationTextBox({
				id : 'txtDificultades',
				value : itemToEdit.dificultades,
				maxLength : "250",
				placeHolder : "Nota: agregar principales dificulatdes",
	            style : "width:500px;"
			},'txtDificultades');
			
				
				
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (registry.byId('txtDificultades').get('value')==null || registry.byId('txtDificultades').get('value')==''){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridDificultades = registry.byId('gridAccionPD');
					try{
						try {
							if(edit){	
								var index = gridDificultades.selection.selectedIndex;
								var item = gridDificultades.getItem(index);
								gridDificultades.store.setValue(item,'dificultades',txtDificultades.get('value'));
								}
							else{
								var myNewItem = {
									id : gridDificultades.rowCount + 1,
									dificultades : txtDificultades.get('value')	
								};
								gridDificultades.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}
		
		//******************Termina Principales Dificultades
		
		//******************Inicia Principales Necesiades
		
		function _popupNecesidades(itemToEdit){
			var edit = false;
			var exitenBrigadas = false;
			if(!itemToEdit){
				itemToEdit= {
				necesidades : ''					 
				};	
			}else{			
				edit=true;
			}
			
			var idVentana='popUPNecesidades';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Principales Necesidades", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td align="right"><label>* \u00BFPrincipales Necesidades: </label></td>'+
									'<td><input id="txtNecesidades"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
		
			
			var txtNecesidades = new ValidationTextBox({
				id : 'txtNecesidades',
				value : itemToEdit.necesidades,
				maxLength : "250",
				placeHolder : "Nota: agregar principales necesidades",
	            style : "width:500px;"
			},'txtNecesidades');
			
						
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (registry.byId('txtNecesidades').get('value')==null || registry.byId('txtNecesidades').get('value')==''){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridNecesidades = registry.byId('gridAccionPN');
					try{
						try {
							if(edit){	
								var index = gridNecesidades.selection.selectedIndex;
								var item = gridNecesidades.getItem(index);
								gridNecesidades.store.setValue(item, 'necesidades',txtNecesidades.get('value'));
							}
							else{
								var myNewItem = {
									id : gridNecesidades.rowCount + 1,
								 	necesidades : txtNecesidades.get('value')	
								};
								gridNecesidades.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		
		}
		//******************Termina POPUP Principales Necesidades
		
		
		
		
		
		
		function _popupApoyos(tpoApoyo,itemToEdit){
			var idVentana = 'popup_PrimeraReunion';
			var tituloVentana = "Plan de trabajo";
			var noAPlica = "N/A";
			var esPlanTrabajo = false;
			var exitenBrigadas = false;
			var edit = false;
			
			//Titulo de la ventana
			 if(tpoApoyo==constants.APOYO_FEDERAL){
				tituloVentana="Apoyo federal";
			}else if(tpoApoyo==constants.APOYO_NECESIDAD){
				tituloVentana="Necesidades educativas especiales";
			}else{
				esPlanTrabajo = true;
			}
			//Creamos la tabla con los elementos que tendrá el Pop UP.
			var tablaHTML = '<table border="0">'+
								'<tr>'+
									'<td align="right"><label>* Apoyo: </label></td>'+
									'<td><input id="cmbApoyo"/></td>'+
								'</tr>';
			if(esPlanTrabajo){
				tablaHTML = tablaHTML + '<tr>'+
											'<td align="right"><label>* Actividad: </label></td>'+
											'<td><input id="cmbAccion"/></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><div id="divLBLResMultiple"><label>* Respuesta: </label></div></td>'+
											'<td><div id="divInputResMultiple"><input id="cmbResMultiple"/></div></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><div id="divLBLResSimple" style="display:none;"><label>* Respuesta: </label></div></td>'+
											'<td><div id="divInputResSimple" style="display:none;"><input id="txtResSimple"/></div></td>'+
										'</tr>';
			}else{
				tablaHTML = tablaHTML + '<tr>'+
											'<td align="right"><div id="divLBLCantidad"></div></td>'+
											'<td><div id="divInputCantidad"><input id="txtCantidad"/></div></td>'+
										'</tr>';
			}
			tablaHTML = tablaHTML + '<tr>'+
										'<td align="right"><div id="divLBLEspecifique" style="display:none;"><label>* Especifique: </label></div></td>'+
										'<td><div id="divInputEspecifique" style="display:none;"><input id="txtEspecifique"/></div></td>'+
									'</tr>'+
									'<tr>'+
										'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
									'</tr>'+
								'</table>';
			var dDetail =new Dialog({
				id : idVentana,
				title : tituloVentana,
				content : tablaHTML
			});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
			if(!itemToEdit){
				itemToEdit={
					cApoyo: -1,
					apoyoRecibido : '',
					cantidad : '',
					descripcion : '',
					otros : '',
					accion : '',
					idAccion : -1,
					reunion : '',
					tipoRespuesta : 0,
					idRespuesta : -1 
				};
			}else{
				edit=true;
			}
			
			//Se definen los widget's
			var cmbApoyo = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
		        required : true,
		    },"cmbApoyo");

			if(!esPlanTrabajo){
				var txtCantidad = new ValidationTextBox({
					value : itemToEdit.cantidad,
					maxLength:"4",
					regExp : constants.NUMBER_VALID_NOT_ZERO
				}, 'txtCantidad');
			}else{
				var txtResSimple = new ValidationTextBox({
					value : itemToEdit.accion,
					maxLength:"4",
					regExp : constants.NUMBER_VALID_NOT_ZERO
				}, 'txtResSimple');
				
				var cmbResMultiple = new FilteringSelect({
					searchAttr: "name",
					required : false,
					value : itemToEdit.idRespuesta,  
					store : new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
		        },"cmbResMultiple");
				
				var cmbAccion = new FilteringSelect({
					readOnly : edit,
					store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
					value : itemToEdit.idAccion,
		            required : false,
					searchAttr: "name",
					onChange : function(){
						//Si el tipo de respuesta es de opción múltiple, en ese caso se mostrara un campo de 
						//texto para ingresar la información, de lo contrario se buscara las opciones del combo en BD.
		            	if(cmbAccion.item.tpoRespuesta!=2){
		            		utils.findTipoRespuesta(cmbAccion.item.tpoRespuesta,itemToEdit.idRespuesta,'cmbResMultiple');
		            		utils.ocultarSeccionHTML("ResMultiple",true,false);
		            		utils.ocultarSeccionHTML("ResSimple",false,true);
		            	}else{
		            		utils.ocultarSeccionHTML("ResMultiple",false,false);
		            		utils.ocultarSeccionHTML("ResSimple",true,true);
		            	}
		            	
		            	if(cmbAccion.item.hayOtros || cmbAccion.item.hayBrigada){
		            		if(cmbAccion.item.hayBrigada){
		            			exitenBrigadas = true;
		            			dom.byId('divLBLEspecifique').innerHTML='<label>* Especifique cu\u00E1l: </label>';
		            		}else{
		            			exitenBrigadas = false;
		            		}
		            		utils.ocultarSeccionHTML("Especifique",true,true);
		            	}else{
		            		utils.ocultarSeccionHTML("Especifique",false,true);
		            	}
			        }
		        },"cmbAccion");
			}
			
			var txtEspecifique = new ValidationTextBox({
				value : itemToEdit.otros,
				maxLength : 150,
				placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
	            style : "width:500px;"
			}, 'txtEspecifique');

			if(itemToEdit.reunion==constants.PRIMERA_REUNION){
				registry.byId('txtEspecifique').set('readOnly',true);
			}
			
			//En esta parte se carga el store del combo principal.
			if(tpoApoyo==constants.APOYO_CONAFE){
				registry.byId('cmbApoyo').set('store',apoyoConafeStore);
			}else if(tpoApoyo==constants.APOYO_NECESIDAD){
				registry.byId('cmbApoyo').set('store',apoyoNecesidadStore);
			}else{
				registry.byId('cmbApoyo').set('store',apoyosPlanTrabajo);
			}
			
			cmbApoyo.set('onChange',function(){
	        	if(!esPlanTrabajo){
	        		utils.ocultarSeccionHTML("Cantidad",cmbApoyo.item.hayBeneficiarios,true);
	        		utils.ocultarSeccionHTML("Especifique",cmbApoyo.item.hayOtros,true);
	        		utils.ocultarSeccionHTML("Especifique",cmbApoyo.item.hayOtros,true);
	        		if(cmbApoyo.item.hayBeneficiarios){
	        			//Aquí se cambia el texto del label, dependiendo 
	        			//de que tipo de beneficiario es.
	        			dom.byId('divLBLCantidad').innerHTML='<label>* \u00BF'+ cmbApoyo.item.descCant +'?: </label>';
	        		}
	        	}else{
	        		utils.findAccionesXTipo(cmbApoyo.item.id,itemToEdit.idAccion,'cmbAccion',idReunion);
	        	}
	        });
			registry.byId('cmbApoyo').set('value',itemToEdit.cApoyo);

			if(!edit){registry.byId('cmbApoyo').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyo').get('value')==-1){
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridGenerico = registry.byId('gridApoyo'+tpoApoyo);
					try{
						if(edit){
							var index = gridGenerico.selection.selectedIndex;
							var item = gridGenerico.getItem(index);
							if(!esPlanTrabajo){
								gridGenerico.store.setValue(item, 'apoyoRecibido',!txtEspecifique.get('value')?cmbApoyo.get('displayedValue'):cmbApoyo.get('displayedValue') +': '+ txtEspecifique.get('value'));
								gridGenerico.store.setValue(item, 'cantidad_desc',!txtCantidad.get('value')?noAPlica:cmbApoyo.item.descCant!='Cu\u00E1ntos'?cmbApoyo.item.descCant +': '+ txtCantidad.get('value'):txtCantidad.get('value'));		
								gridGenerico.store.setValue(item, 'cantidad',!txtCantidad.get('value')?noAPlica:txtCantidad.get('value'));
								gridGenerico.store.setValue(item, 'descripcion',itemToEdit.descripcion);
								gridGenerico.store.setValue(item, 'otros',txtEspecifique.get('value'));
							}else{
								if(registry.byId('cmbAccion').get('value')==-1 || (registry.byId('txtEspecifique').get('value')=='' && registry.byId('cmbResMultiple').get('value')==-1)){
									utils.cstmAlert('Favor de registrar los datos requeridos');
									return false;
								}
								gridGenerico.store.setValue(item, 'apoyoRecibido',!txtEspecifique.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +' Especifique cu\u00E1l: '+ txtEspecifique.get('value'):cmbAccion.get('displayedValue') +': '+ txtEspecifique.get('value'));
								gridGenerico.store.setValue(item, 'accion',!txtResSimple.get('value')?cmbResMultiple.get('displayedValue'):txtResSimple.get('value'));
								gridGenerico.store.setValue(item, 'reunion',itemToEdit.reunion);
								gridGenerico.store.setValue(item, 'tipoRespuesta',!txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2);
								gridGenerico.store.setValue(item, 'idRespuesta',!txtResSimple.get('value')?cmbResMultiple.get('value'):0);
								gridGenerico.store.setValue(item, 'otros',txtEspecifique.get('value'));
							}
							gridGenerico.update();
						}else{
							try {
								var myNewItem = null;
								if(!esPlanTrabajo){
									myNewItem = {
										id: gridGenerico.rowCount + 1,
										cApoyo : cmbApoyo.get('value'),
										apoyoRecibido : !txtEspecifique.get('value')?cmbApoyo.get('displayedValue'):cmbApoyo.get('displayedValue') +': '+ txtEspecifique.get('value'),
										cantidad_desc : !txtCantidad.get('value')?noAPlica:cmbApoyo.item.descCant!='Cu\u00E1ntos'?cmbApoyo.item.descCant +': '+ txtCantidad.get('value'):txtCantidad.get('value'),
										cantidad : !txtCantidad.get('value')?'':txtCantidad.get('value'),
										descripcion : cmbApoyo.item.descCant,
										otros : txtEspecifique.get('value')
									};
								}else{
									if(registry.byId('cmbAccion').get('value')==-1 || (registry.byId('txtEspecifique').get('value')=='' && registry.byId('cmbResMultiple').get('value')==-1)){
										utils.cstmAlert('Favor de registrar los datos requeridos');
										return false;
									}
									myNewItem = {
										id: gridGenerico.rowCount + 1,
										cApoyo : cmbApoyo.get('value'),
										apoyoRecibido : !txtEspecifique.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +' Especifique cu\u00E1l: '+ txtEspecifique.get('value'):cmbAccion.get('displayedValue') +': '+ txtEspecifique.get('value'),
										accion : !txtResSimple.get('value')?cmbResMultiple.get('displayedValue'):txtResSimple.get('value'),
										idAccion : cmbAccion.get('value'),
										reunion : constants.SEGUNDA_REUNION,
										tipoRespuesta : !txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2,
										idRespuesta :  !txtResSimple.get('value')?cmbResMultiple.get('value'):0,
										otros : txtEspecifique.get('value')
									};
								}
								gridGenerico.store.newItem(myNewItem);
							} catch (e) {
								utils.cstmAlert("El registro ya se encuentra en la tabla.");
								return false;
							}
						}
					    registry.byId(idVentana).destroyRecursive(false);
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}
		
		function _popupConafe(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					cApoyo: -1,
					apoyo:'',
					cual:'',
					cantidad:'',
					beneficiarios : '',
				//	gestion : '',
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPConafe';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Apoyos Conafe actuales y por gestionar", 
					content:'<table border="0" width= "900px">'+
								
								'<tr>'+
									'<td align="right"><label>* Apoyos Conafe: </label></td>'+
									'<td><input id="cmbApoyosc"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><div id="lblCual" style="display:none;"></div></td>'+
									'<td><div id="divCual" style="display:none;"><input id="txtCual"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Cantidad: </label></td>'+
									'<td><input id="txtCantidad"/></td>'+
							    '</tr>'+
								'<tr>'+
									'<td align="right"><label>* Alumnos beneficiados: </label></td>'+
									'<td><input id="txtBenefi"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			
			
		
			
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
			var stateStore = new Memory({
		        data: [
		            {name:"Si", id:"Si"},
		            {name:"No", id:"No"}
		        ]
		    });
			
	 
	
			var cmbApoyosc = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        value: itemToEdit.cApoyo,
		        store: ConafeStore,
		        required : true,
		        onChange: function(){
	          //  	if(cmbApoyosc.item.id==22) {
	            	if(cmbApoyosc.item.name=="Otro (especifique)") {
	            		dom.byId('lblCual').innerHTML='<label>* \u00BFCu\u00e1l?: </label>';
	            		document.getElementById('lblCual').style.display='block';
	    				document.getElementById('divCual').style.display='block';
	    	    		registry.byId("txtCual").set("required", true);
	    	    	}else{
	    				document.getElementById('lblCual').style.display='none';
	    				document.getElementById('divCual').style.display='none';
	    				registry.byId("txtCual").set("required", false);
	    	    	}
	            }
		        //
		
		    },"cmbApoyosc");
			// if para cuando se utiliza el botom "Editar" 
			if(edit){
			if(itemToEdit.cApoyo==10) {
        		dom.byId('lblCual').innerHTML='<label>* \u00BFCu\u00e1l?: </label>';
        		document.getElementById('lblCual').style.display='block';
				document.getElementById('divCual').style.display='block';
	    	}else{
				document.getElementById('lblCual').style.display='none';
				document.getElementById('divCual').style.display='none';
	    	}
		    }
			var txtCual = new ValidationTextBox({
				id :'txtCual',
				value : itemToEdit.cual,
				maxLength : "150",
				placeHolder : "Nota: especifique otro tipo de apoyo Conafe.",
	            style : "width:500px;"
			},'txtCual');
			
			var txtCantidad = new ValidationTextBox({
				value: itemToEdit.cantidad,
				require:true,
				maxlength:"7",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtCantidad');
			
			var txtBenefi = new ValidationTextBox({
				value: itemToEdit.beneficiarios,
				require:true,
				maxlength:"2",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtBenefi');
			
		
					
			registry.byId('cmbApoyosc').set('value',itemToEdit.cApoyo);
			if(!edit){registry.byId('cmbApoyosc').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyosc').get('value')==-1 || 
						registry.byId('txtCantidad').get('value')==null || registry.byId('txtCantidad').get('value')=='' ||
						registry.byId('txtBenefi').get('value')==null || registry.byId('txtBenefi').get('value')=='') /*  ||
						registry.byId('cmbGestion').get('value')==-1)  */
					{  
						utils.cstmAlert('Favor de registrar los datos requeridos');
					return false;
					}	
									
					var gridConafe = registry.byId('gridConafe');
					try{
						try {
							if(edit){		
								var index = gridConafe.selection.selectedIndex;
								var item = gridConafe.getItem(index);
								gridConafe.store.setValue(item, 'apoyo',cmbApoyosc.get('displayedValue'));
								gridConafe.store.setValue(item, 'cual',txtCual.get('value'));
								gridConafe.store.setValue(item, 'cantidad',txtCantidad.get('value'));
								gridConafe.store.setValue(item, 'beneficiarios',txtBenefi.get('value'));
								gridConafe.update();
							}
							else{
								var myNewItem = {
									id : gridConafe.rowCount + 1,
									cApoyo : cmbApoyosc.get('value'),
									apoyo : cmbApoyosc.get('displayedValue'),
									cual : txtCual.get('value'),
									cantidad : txtCantidad.get('value'),
									beneficiarios: txtBenefi.get('value'),
								};
								gridConafe.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}	
	
		function _popupFederal(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					cApoyo: -1,
					apoyo:'',
					cual:'',
					cantidad : '',
					beneficiarios : '',
					gestion : '',
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPFederal';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Apoyos Federales actuales y por gestionar", 
					content:'<table border="0" width= "900px">'+
								
								'<tr>'+
									'<td align="right"><label>* Apoyos Federales: </label></td>'+
									'<td><input id="cmbApoyosf"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><div id="lblCual" style="display:none;"></div></td>'+
									'<td><div id="divCual" style="display:none;"><input id="txtCual"/></td>'+
								'</tr>'+
								'<tr>'+
								'<td align="right"><label>* Cantidad: </label></td>'+
								'<td><input id="txtCantidad"/></td>'+
							    '</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de beneficiarios: </label></td>'+
									'<td><input id="txtBenefi"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Se gestionar\u00e1: </label></td>'+
									'<td><input id="cmbGestion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			
			
		
			
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
			var stateStore = new Memory({
		        data: [
		            {name:"Si", id:"Si"},
		            {name:"No", id:"No"}
		        ]
		    });
			
			
			var cmbApoyosf = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        value: itemToEdit.cApoyo,
		        store: FederalesStore,
		        required : true,
		        onChange: function(){
	            	if(cmbApoyosf.item.id==21) {
	            		dom.byId('lblCual').innerHTML='<label>* \u00BFCu\u00e1l?: </label>';
	            		document.getElementById('lblCual').style.display='block';
	    				document.getElementById('divCual').style.display='block';
	    	    		registry.byId("txtCual").set("required", true);
	    	    	}else{
	    				document.getElementById('lblCual').style.display='none';
	    				document.getElementById('divCual').style.display='none';
	    				registry.byId("txtCual").set("required", false);
	    	    	}
	            }
		        //
		     
		    },"cmbApoyosf");
				
			if(edit){
			if(itemToEdit.cApoyo==21) {
        		dom.byId('lblCual').innerHTML='<label>* \u00BFCu\u00e1l?: </label>';
        		document.getElementById('lblCual').style.display='block';
				document.getElementById('divCual').style.display='block';
	    	}else{
				document.getElementById('lblCual').style.display='none';
				document.getElementById('divCual').style.display='none';
	    	}
		    }
			var txtCual = new ValidationTextBox({
				id :'txtCual',
				value : itemToEdit.cual,
				maxLength : "150",
				placeHolder : "Nota: especifique otro tipo de apoyo Federal.",
	            style : "width:500px;"
			},'txtCual');
			
			
			var txtCantidad = new ValidationTextBox({
				value: itemToEdit.cantidad,
				require:true,
				maxlength:"7",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtCantidad');
			
			
			var txtBenefi = new ValidationTextBox({
				value: itemToEdit.beneficiarios,
				require:true,
				maxlength:"3",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtBenefi');
			
			var cmbGestion = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.gestion,
		        required : true
		     
		    },"cmbGestion");
			
			
			

			
			registry.byId('cmbApoyosf').set('value',itemToEdit.cApoyo);
			if(!edit){registry.byId('cmbApoyosf').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyosf').get('value')==-1 || registry.byId('cmbGestion').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridFederal = registry.byId('gridFederal');
					try{
						try {
							if(edit){		
								var index = gridFederal.selection.selectedIndex;
								var item = gridFederal.getItem(index);
								gridFederal.store.setValue(item, 'apoyo',cmbApoyosf.get('displayedValue'));
								gridFederal.store.setValue(item, 'cual',txtCual.get('value'));
								gridFederal.store.setValue(item, 'cantidad',txtCantidad.get('value'));
								gridFederal.store.setValue(item, 'beneficiarios',txtBenefi.get('value'));
								gridFederal.store.setValue(item, 'gestion',cmbGestion.get('displayedValue'));
								gridFederal.update();
							}
							else{
								var myNewItem = {
									id : gridFederal.rowCount + 1,
									cApoyo : cmbApoyosf.get('value'),
									apoyo : cmbApoyosf.get('displayedValue'),
									cual : txtCual.get('value'),
									cantidad: txtCantidad.get('value'),
									beneficiarios: txtBenefi.get('value'),
									gestion : cmbGestion.get('value')
								};
								gridFederal.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}
		
		function _popupEstatal(itemToEdit){
			//Ventana captura apoyos estatal
		 
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					cApoyo: -1,
					apoyo:'',
					describir : '',
					beneficiarios : '',
					especifique:'',
					gestion : '',
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPEstatal';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Apoyos Estatales actuales y por gestionar", 
					content:'<table border="0" width= "900px">'+
								
								'<tr>'+
									'<td align="right"><label>* Apoyos Estatales: </label></td>'+
									'<td><input id="cmbApoyosE"/></td>'+
								'</tr>'+
								
								'<tr>'+
								'<td align="right"><div id="lblOtraAccion" style="display:none;"></div></td>'+
								'<td><div id="divOtraAccion" style="display:none;"><input id="txtOtraAccion"/></td>'+
								'</tr>'+
								
								'<tr>'+
									'<td align="right"><label>* Describir los apoyos: </label></td>'+
									'<td><input id="txtDescribirEstatal"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de beneficiarios: </label></td>'+
									'<td><input id="txtBenefiEstatal"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Se gestionar\u00e1: </label></td>'+
									'<td><input id="cmbGestionar"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			
			
		
			
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
			var stateStore = new Memory({
		        data: [
		            {name:"Si", id:"Si"},
		            {name:"No", id:"No"}
		        ]
		    });
			
			
			var cmbApoyosE = new FilteringSelect({
				readOnly : edit,
				store: EstatalStore,
				value: itemToEdit.cApoyo,
	            searchAttr: "name",
	            onChange: function(){
	            	if(cmbApoyosE.item.name=="Otros (especifique)"){
	            		dom.byId('lblOtraAccion').innerHTML='<label>* Especifique: </label>';
	            		document.getElementById('lblOtraAccion').style.display='block';
	    				document.getElementById('divOtraAccion').style.display='block';
	    	    		registry.byId("txtOtraAccion").set("required", true);
	    	    	}else{
	    				document.getElementById('lblOtraAccion').style.display='none';
	    				document.getElementById('divOtraAccion').style.display='none';
	    				registry.byId("txtOtraAccion").set("required", false);
	    	    	}
	            }
	        },"cmbApoyosE");
			
			if(edit){
				if(itemToEdit.apoyo== "Otros (especifique)") {
					dom.byId('lblOtraAccion').innerHTML='<label>* Especifique: </label>';
            		document.getElementById('lblOtraAccion').style.display='block';
    				document.getElementById('divOtraAccion').style.display='block';
		    	}else{
		    		document.getElementById('lblOtraAccion').style.display='none';
    				document.getElementById('divOtraAccion').style.display='none';
		    	}
			    }
			
			var txtOtraAccion = new ValidationTextBox({
				id : 'txtOtraAccion',
				value : itemToEdit.especifique,
				maxLength : "150",
				placeHolder : "Nota: especifique otro tipo de apoyo estatal.",
	            style : "width:500px;"
			},'txtOtraAccion');
			
			var txtDescribirEstatal = new ValidationTextBox({
				id:'txtDescribirEstatal',
				value: itemToEdit.describir,
				maxlength:"150",
				placeHolder : "Nota: describa tipo de apoyo estatal.",
	            style : "width:500px;"
				},'txtDescribirEstatal');
			
			var txtBenefiEstatal = new ValidationTextBox({
				value: itemToEdit.beneficiarios,
				require:true,
				maxlength:"2",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtBenefiEstatal');
			
			var cmbGestionar = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.gestion,
		        required : true
		     
		    },"cmbGestionar");
			
			registry.byId('cmbApoyosE').set('value',itemToEdit.cApoyo);
			if(!edit){registry.byId('cmbApoyosE').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyosE').get('value')==-1 || registry.byId('cmbGestionar').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					
					// VBlake validacion del Programa Estatal para no ser duplicada
	 
		
		 			var gridEst = registry.byId('gridEstatal');
 					if(edit){}
					else	
					{
		        	for ( var i = 0; i < gridEst.rowCount; i++) {

		 				var item = gridEst.getItem(i);
		 				
		 				if( gridEst.store.getValue(item,'cApoyo') == registry.byId('cmbApoyosE').get('value')){
		 					utils.cstmAlert("Ya existe registrado el programa estatal");
		 					return;
		 				}

		 				}
					}
					
					
		 		
					
					
					var gridEstatal = registry.byId('gridEstatal');
					try{
						try {
							if(edit){		
								var index = gridEstatal.selection.selectedIndex;
								var item = gridEstatal.getItem(index);
								gridEstatal.store.setValue(item, 'apoyo',cmbApoyosE.get('displayedValue'));
							 	gridEstatal.store.setValue(item, 'especifique',txtOtraAccion.get('value'));
								gridEstatal.store.setValue(item, 'describir',txtDescribirEstatal.get('value'));
								gridEstatal.store.setValue(item, 'beneficiarios',txtBenefiEstatal.get('value'));
								gridEstatal.store.setValue(item, 'gestion',cmbGestionar.get('displayedValue'));
								gridEstatal.update();
							}
							else{
								utils.cstmAlert(txtDescribirEstatal.get('value'));
								var myNewItem = {
									id : gridEstatal.rowCount + 1,
									cApoyo : cmbApoyosE.get('value'),
									apoyo : cmbApoyosE.get('displayedValue'),
							 		especifique: txtOtraAccion.get('value'),
									describir : txtDescribirEstatal.get('value'),
									beneficiarios : txtBenefiEstatal.get('value'),
									gestion : cmbGestionar.get('value')
								};
								gridEstatal.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}	


		function _popupNecesidad(itemToEdit){
			//Ventana emergente para la tabla de 
			//necesidades educativas especiales
			var edit=false;
			if(!itemToEdit){
				itemToEdit= {
						cApoyo : 0,
						necesidad : '',
						cNee:-1,
						nomNee:'',
						gestion:'',
						cuantos : '',
						cNee1:1,
						nomNee1:'',
						gestion1:'',
						cuantos1: '',
					};
			}else{
				edit=true;
			}
	
			var idVentana='popUPNecesidad';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Necesidad educativa especial", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td align="right"><label>* Necesidad: </label></td>'+
									'<td><input id="cmbNecesidad"/></td>'+	
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*Tipo de necesidad: </label></td>'+
									'<td><input id="cmbTipoNecesidad"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*N\u00famero de Ni\u00f1os?: </label></td>'+
									'<td><input id="txtNumNecesidad"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*Apoyos por gestionar: </label></td>'+
									'<td><input id="txtGestion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>Tipo de necesidad: </label></td>'+
									'<td><input id="cmbTipoNecesidad1"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>N\u00famero de Ni\u00f1os?: </label></td>'+
									'<td><input id="txtNumNecesidad1"/></td>'+
								'</tr>'+
							    '<tr>'+
									'<td align="right"><label>Apoyos por gestionar: </label></td>'+
									'<td><input id="txtGestion1"/></td>'+
								'</tr>'+
							    '<tr>'+	
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
			//Se definen todos los widgets que se van a 
			//requerir para mostrar la ventana emergente.
			var cmbNecesidad = new FilteringSelect({
				value: itemToEdit.cApoyo,
				store: necesidadesStore,
				readOnly : edit,
	            searchAttr: "name",
	        },"cmbNecesidad");
			
			
			var cmbTipoNecesidad = new FilteringSelect({
				value: itemToEdit.cNee,
				store: NeeStore,
				readOnly : edit,
				required: true,
	            searchAttr: "name",
	        },"cmbTipoNecesidad");
			
		
		
	
			var txtNumNecesidad=new ValidationTextBox({
				value:itemToEdit.cuantos,
				required: true,
				maxLength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtNumNecesidad');
			
			
			
			
			var txtGestion = new ValidationTextBox({
				id:'txtGestion',
				value: itemToEdit.gestion,
				maxLength : "150",
				required: true,
				placeHolder : "Nota: agregar los apoyos a gestionar separados por una coma.",
	        },"txtGestion");
			
			var cmbTipoNecesidad1 = new FilteringSelect({
				value: itemToEdit.cNee1,
				store: NeeStore,
				readOnly : edit,
	            searchAttr: "name",
	        },"cmbTipoNecesidad1");
			
			var txtNumNecesidad1=new ValidationTextBox({
				value:itemToEdit.cuantos1,
				maxLength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtNumNecesidad1');
			
			var txtGestion1 = new ValidationTextBox({
				id:'txtGestion1',
				value: itemToEdit.gestion1,
				maxLength : "150",
				placeHolder : "Nota: agregar los apoyos a gestionar separados por una coma.",
	        },"txtGestion1");
			
	
			
			if(!edit){
				registry.byId('cmbNecesidad').set('value',-1);
				registry.byId('cmbTipoNecesidad').set('value',-1);
			}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbNecesidad').get('value')==-1 || registry.byId('cmbTipoNecesidad').get('value')==-1){ 
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					
					if (!form.validate() || registry.byId('cmbTipoNecesidad1').get('value')== registry.byId('cmbTipoNecesidad').get('value')){ 
						utils.cstmAlert('Favor de registrar Tipos de necesidades diferentes');
						return false;
					}
					
					var gridNecesidad = registry.byId('gridNecesidad');
					try{
						try {
							if(edit){
								var index = gridNecesidad.selection.selectedIndex;
								var item = gridNecesidad.getItem(index);
								gridNecesidad.store.setValue(item, 'necesidad', cmbTipoNecesidad.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'nomNee', cmbTipoNecesidad.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'cuantos',txtNumNecesidad.get('value'));
								gridNecesidad.store.setValue(item, 'gestion',txtGestion.get('value'));
								gridNecesidad.store.setValue(item, 'nomNee1', cmbTipoNecesidad1.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'cuantos1',txtNumNecesidad1.get('value'));
								gridNecesidad.store.setValue(item, 'gestion1',txtGestion1.get('value'));
								gridNecesidad.update();
							}else{
								var myNewItem = {
									id: gridNecesidad.rowCount + 1,
									cApoyo : cmbNecesidad.get('value'),
									necesidad :cmbNecesidad.get('displayedValue'),
									cNee : cmbTipoNecesidad.get('value'),
									nomNee : cmbTipoNecesidad.get('displayedValue'),
									cuantos : txtNumNecesidad.get('value'),
									gestion: txtGestion.get('value'),
									cNee1 : cmbTipoNecesidad1.get('value'),
									nomNee1 : cmbTipoNecesidad1.get('displayedValue'),
									cuantos1 : txtNumNecesidad1.get('value'),
									gestion1: txtGestion1.get('value'),
								};
								gridNecesidad.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}
		
		

		function _popupBullying(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					idTpoBullying : -1,
					nomTipoBullying:'',
					idBullying : -1,
					nombre : '',
					cuantos : '',
					numveces:''
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPBullying';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Casos de acoso escolar", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td align="right"><label>* Tipo: </label></td>'+
									'<td><input id="cmbTipoAcoso"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Caso de bullying: </label></td>'+
									'<td><input id="cmbAcoso"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de casos: </label></td>'+
									'<td><input id="txtNumACaso"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Acciones a emprender o apoyos a gestionar: </label></td>'+
									'<td><input id="txtNumAccion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
			
			
			
			var cmbTipoAcoso = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store: BullyingTipoStore,
		        required : true,
		        onChange: function(){
		        	utils.findBullyingXTipo(cmbTipoAcoso.item.id,itemToEdit.idBullying,'cmbAcoso',idReunion);
		        }
		    },"cmbTipoAcoso");
			
			var cmbAcoso = new FilteringSelect({
				readOnly : edit,
				store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
				value:itemToEdit.idBullying,
	            searchAttr: "name"  
	        },"cmbAcoso");
			
			
			var txtNumACaso = new ValidationTextBox({
				value: itemToEdit.cuantos,
				require:true,
				maxlength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtNumACaso');

			var txtNumAccion = new ValidationTextBox({
				value : itemToEdit.numveces,
				required : true,
				maxLength :"150",
				placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
	            style : "width:500px;"
			},'txtNumAccion');
			
			registry.byId('cmbTipoAcoso').set('value',itemToEdit.idTpoBullying);
			if(!edit){registry.byId('cmbTipoAcoso').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbTipoAcoso').get('value')==-1 || registry.byId('cmbAcoso').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridBullying = registry.byId('gridBullying');
					try{
						try {
							if(edit){		
								var index = gridBullying.selection.selectedIndex;
								var item = gridBullying.getItem(index);
								gridBullying.store.setValue(item, 'nombre',cmbAcoso.get('displayedValue'));
								gridBullying.store.setValue(item, 'cuantos',txtNumACaso.get('value'));
								gridBullying.store.setValue(item, 'numveces',txtNumAccion.get('value'));
								gridBullying.update();
							}
							else{
								var myNewItem = {
									id : gridBullying.rowCount + 1,
									idTpoBullying: cmbTipoAcoso.get('value'),
									nomTipoBullying:cmbTipoAcoso.get('displayedValue'),
									idBullying : cmbAcoso.get('value'),
									nombre : cmbAcoso.get('displayedValue'),
									cuantos: txtNumACaso.get('value'),
									numveces : txtNumAccion.get('value')
								};
								gridBullying.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}	

		function _popupPoblacion(itemToEdit){
			//Ventana emergente para la tabla de 
			//población indígena
			var edit=false;
			if(!itemToEdit){
				itemToEdit= {
					idSituacion: 0,
					situacion: '',
					cuantos : '',
					idLengua : 0,
					lengua : '',
				};
			}else{
				edit=true;
			}
	
			var idVentana='popUPSituacionP';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Comunicaci\u00F3n oral", 
					content:'<table border="0" width= "500px">'+
								'<tr>'+
									'<td align="right"><label>* Situaci\u00F3n de ni\u00F1os ind\u00EDgenas: </label></td>'+
									'<td><input id="cmbSituacion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*\u00BFCu\u00E1ntos?: </label></td>'+
									'<td><input id="txtNumSituaciones"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*\u00BFQu\u00E9 lengua habla?: </label></td>'+
									'<td><input id="cmbLengua"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
	
			var cmbsituacion = new FilteringSelect({
				readOnly : edit,
				value : itemToEdit.idSituacion,
				store : situacionesIndigenasStore,
	            searchAttr: "name",
	        },"cmbSituacion");
	
			var txtNumSituaciones = new ValidationTextBox({
				value:itemToEdit.cuantos,
				required: true,
				maxLength: "4",
	 	        regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtNumSituaciones');
	
			var cmbLenguas = new FilteringSelect({
				value: itemToEdit.idLengua,
				store: lenguasIndigenasStore,
	            searchAttr: "name",
	        },"cmbLengua");
			
			if(!edit){
				registry.byId('cmbSituacion').set('value',-1);
				registry.byId('cmbLengua').set('value',-1);
			}
			
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbSituacion').get('value')==-1 || registry.byId('cmbLengua').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridSituacionP = registry.byId('gridSituaciones');
					try{
						try {
							if(edit){
								var index = gridSituacionP.selection.selectedIndex;
								var item = gridSituacionP.getItem(index);
								gridSituacionP.store.setValue(item, 'situacion',cmbsituacion.get('displayedValue'));
								gridSituacionP.store.setValue(item, 'cuantos',txtNumSituaciones.get('value'));
								gridSituacionP.store.setValue(item, 'idLengua',cmbLenguas.get('value'));
								gridSituacionP.store.setValue(item, 'lengua',cmbLenguas.get('displayedValue'));
								gridSituacionP.update();
							}else{
								var myNewItem = {
									id : gridSituacionP.rowCount + 1,
									idSituacion : cmbsituacion.get('value'),
									situacion : cmbsituacion.get('displayedValue'),
									cuantos : txtNumSituaciones.get('value'),
									idLengua : cmbLenguas.get('value'),
									lengua : cmbLenguas.get('displayedValue')
								};
								gridSituacionP.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}

		function _popupAccion(itemToEdit){
			//Ventana emergente par las acciones del Plan de Trabajo.
			var edit = false;
			var exitenBrigadas = false;
			if(!itemToEdit){
				itemToEdit= {
					idTpoAccion : -1,
					idAccion : -1,
					nombre : '',
					numVeces : '',
					otros : ''
				};
			}else{			
				edit=true;
			}
			
			var idVentana='popUPAcciones';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Acci\u00F3n programada", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td ><label>* Apoyo: </label><input id="cmbApoyo"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td ><label>* Acci\u00F3n programada: </label><input id="cmbAccion"/></td>'+
								'</tr>'+
								'<tr id="visible1" style="display:none">'+
									'<td ><label>* \u00BFCu\u00E1ntas veces se ejecutar\u00E1 en el ciclo escolar?: </label></td>'+
									'<td><input id="cmbNumVeces"/></td>'+
								'</tr>'+
								'<tr id="visible2" style="display:none">'+
								'<td ><label>* \u00BFCu\u00E1ntas veces se ejecutar\u00E1 en el ciclo escolar?: </label></td>'+
								'<td><input id="cmbNumVeces1"/></td>'+
							    '</tr>'+
							    
								'<tr>'+
							 	 	'<td><div id="lblOtraAccion" style="display:none;"></div></td>'+
									'<td><div id="divOtraAccion" style="display:none;"><input id="txtOtraAccion"></div></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
		
			var cmbAccion = new FilteringSelect({
				readOnly : edit,
				store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
				value: itemToEdit.idAccion,
	            searchAttr: "name",
	            onChange: function(){
	            	if(cmbAccion.item.hayOtros) { // || cmbAccion.item.hayBrigada){
	            
	         //   		if(cmbAccion.item.hayBrigada){
	         //   		 	exitenBrigadas = true;
	         //    		 	dom.byId('lblOtraAccion').innerHTML='<label>* Especifique cu\u00E1l: </label>';
	         //    		}else{
	         //   		 	exitenBrigadas = false;
	         //   		  	dom.byId('lblOtraAccion').innerHTML='<label>* Especifique: </label>';
	         //    		}
	            		
	             		if(cmbAccion.item.hayOtros){
	         	             exitenOtros = true;
	         	             dom.byId('lblOtraAccion').innerHTML='<label>* Especifique cu\u00E1l: </label>';
	         	        }else{
	         	             exitenOtros = false;
	         	             dom.byId('lblOtraAccion').innerHTML='<label>* Especifique: </label>';
	         	        }    		
	            		
	            		
	             		document.getElementById('lblOtraAccion').style.display='block';
	    				document.getElementById('divOtraAccion').style.display='block';
	    	    		registry.byId("txtOtraAccion").set("required", true);
	    	    	}else{
	     				document.getElementById('lblOtraAccion').style.display='none';
	    				document.getElementById('divOtraAccion').style.display='none';
	    				registry.byId("txtOtraAccion").set("required", false);
	    	    	}
	            	
	            	if(cmbAccion.item.id==18 || cmbAccion.item.id==101 || cmbAccion.item.id==102 ){
	            		dom.byId('visible2').style.display='block';
	            		dom.byId('visible1').style.display='none';
	            		
	            	}
	            	else{
	            		dom.byId('visible1').style.display='block';
	            		dom.byId('visible2').style.display='none';
	            	}
	            }
	        },"cmbAccion");
			
			var cmbApoyo = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store: apoyosPlanTrabajo,
		        required : true,
		        onChange: function(){
		        	utils.findAccionesXTipo(cmbApoyo.item.id,itemToEdit.idAccion,'cmbAccion',idReunion);
		        	if(!edit){registry.byId('cmbNumVeces1').set('value',-1);}
		        	if(!edit){registry.byId('cmbNumVeces').set('value',-1);}
		        	
		        }
		    },"cmbApoyo");
			
			// vblake
			var stateStore = new Memory({
		        data: [
		            {name:"[Seleccione]",id:"-1"},
		            {name:"Una", id:"Una"},
		            {name:"Dos", id:"Dos"},
		            {name:"Tres", id:"Tres"},
		            {name:"Cuatro", id:"Cuatro"},
		            {name:"Cinco o m\u00E1s", id:"Cinco o m\u00E1s"},
		            {name:"Ninguna", id:"Ninguna"}
		        ]
		    });

			var stateStore1 = new Memory({
		        data: [
		            {name:"[Seleccione]",id:"-1"}, 
		            {name:"De una a dos", id:"De una a dos"},
		            {name:"De tres a cuatro", id:"De tres a cuatro"},
		            {name:"Cinco o m\u00E1s", id:"Cinco o m\u00E1s"},
		            {name:"Ninguna", id:"Ninguna"}
		        ]
		    });
			
						
			var txtNumAccion = new ValidationTextBox({
				value : itemToEdit.numVeces,
				required : true,
				maxLength :"4",
	 	        regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtNumAccion'); 
			
			var txtOtro = new ValidationTextBox({
				id : 'txtOtraAccion',
				value : itemToEdit.otros,
				maxLength : "150",
				placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
	            style : "width:500px;"
			},'txtOtraAccion');
			
			//vblake
			var cmbNumVeces = new FilteringSelect({
				//readOnly : edit,
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.numVeces,
		      //  required : true	sirve para que sea obligatorio de captura el campo
		     
		    },"cmbNumVeces");
			
			var cmbNumVeces1 = new FilteringSelect({
				//readOnly : edit,
		        searchAttr : "name",
		        // store:stateStore1,       vblake se asigna el stateStore para unificar las opciones de numero de veces
		        store:stateStore,
		        value: itemToEdit.numVeces,
		      //  required : true  sirve para que sea obligatorio de captura el campo
		     
		    },"cmbNumVeces1");
			
			
			registry.byId('cmbApoyo').set('value',itemToEdit.idTpoAccion);
			if(!edit){registry.byId('cmbApoyo').set('value',-1);}
			
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (registry.byId('cmbApoyo').get('value')==-1 || registry.byId('cmbAccion').get('value')==-1){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var tiponumVeces="";
					
					if(cmbAccion.item.id==18 || cmbAccion.item.id==101 || cmbAccion.item.id==102 ){
						tiponumVeces=cmbNumVeces1.get('value');
					}
					else {
						tiponumVeces=cmbNumVeces.get('value');
					}
					
					if(tiponumVeces=="" || tiponumVeces=="-1" ){
						utils.cstmAlert('Favor de registrar cuantas veces se ejecuta dentro del ciclo escolar');
						return false;
					}
					
					var gridAccion = registry.byId('gridAccion');
					try{
						try {
							if(edit){		
								var index = gridAccion.selection.selectedIndex;
								var item = gridAccion.getItem(index);
								gridAccion.store.setValue(item, 'nombre',!txtOtro.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +" Especifique cu\u00E1l: "+ txtOtro.get('value'):cmbAccion.get('displayedValue') +": "+ txtOtro.get('value'));
								gridAccion.store.setValue(item, 'numVeces',tiponumVeces);
								gridAccion.store.setValue(item, 'otros',txtOtro.get('value'));
								gridAccion.update();
							}
							else{
								var myNewItem = {
									id : gridAccion.rowCount + 1,
									idTpoAccion : cmbApoyo.get('value'),
									idAccion : cmbAccion.get('value'),
									nombre : !txtOtro.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +" Especifique cu\u00E1l: "+ txtOtro.get('value'):cmbAccion.get('displayedValue') +": "+ txtOtro.get('value'),
									numVeces : tiponumVeces,
									otros : txtOtro.get('value')
								};
								gridAccion.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}

		
		// vblake inicia
		function _popupOpiniones(itemToEdit){
			//Ventana emergente par las acciones 
			//de Contraloria Social
			var edit = false;
			var exitenBrigadas = false;
			if(!itemToEdit){
				itemToEdit= {
				/*	idTpoAccion : -1,
					idAccion : -1,
					nombre : '',
					numVeces : '',
					otros : '',*/
					opiniones : ''					 
				};	
			}else{			
				edit=true;
			}
			
			var idVentana='popUPOpiniones';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Contraloria Social", 
					content:'<table border="0" width= "900px">'+
							/*	'<tr>'+
									'<td align="right"><label>* Apoyo: </label></td>'+
									'<td><input id="cmbApoyo"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Acci\u00F3n programada: </label></td>'+
									'<td><input id="cmbAccion"/></td>'+
								'</tr>'+ */
								'<tr>'+
									'<td align="right"><label>* \u00BFOpiniones y comentarios adicionales: </label></td>'+
									'<td><input id="txtOpiniones"/></td>'+
								'</tr>'+
						/*		'<tr>'+
									'<td align="right"><div id="lblOtraAccion" style="display:none;"></div></td>'+
									'<td><div id="divOtraAccion" style="display:none;"><input id="txtOtraAccion"/></td>'+
								'</tr>'+ */
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
		
			
			var txtOpiniones = new ValidationTextBox({
				id : 'txtOpiniones',
				value : itemToEdit.opiniones,
				maxLength : "150",
				placeHolder : "Nota: agregar opiniones y comentarios adicionales",
	            style : "width:500px;"
			},'txtOpiniones');
			
				
		//	registry.byId('cmbApoyo').set('value',itemToEdit.idTpoAccion);
		//	if(!edit){registry.byId('cmbApoyo').set('value',-1);}
			
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (registry.byId('txtOpiniones').get('value')==null || registry.byId('txtOpiniones').get('value')==''){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridOpiniones = registry.byId('gridAccionOC');
					try{
						try {
							if(edit){	
								var index = gridOpiniones.selection.selectedIndex;
								var item = gridOpiniones.getItem(index);
								gridOpiniones.store.setValue(item, 'opiniones',txtOpiniones.get('value'));
							//	gridAccion.store.setValue(item, 'nombre',!txtOtro.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +" Especifique cu\u00E1l: "+ txtOtro.get('value'):cmbAccion.get('displayedValue') +": "+ txtOtro.get('value'));
							//  gridAccion.store.setValue(item, 'numVeces',cmbNumVeces.get('value'));
							//	gridAccion.store.setValue(item, 'otros',txtOtro.get('value'));
							//	gridAccion.update();
							}
							else{
								var myNewItem = {
									id : gridOpiniones.rowCount + 1,
								//	idTpoAccion : cmbApoyo.get('value'),
								//	idAccion : cmbAccion.get('value'),
								//	nombre : !txtOtro.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +" Especifique cu\u00E1l: "+ txtOtro.get('value'):cmbAccion.get('displayedValue') +": "+ txtOtro.get('value'),
								//	numVeces : cmbNumVeces.get('value'),
								//	otros : txtOtro.get('value')
									opiniones : txtOpiniones.get('value')	
								};
								gridOpiniones.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}
		
			
		// vblake inicia
		// Ventana de captura 
		// de Contraloria Social Denuncias o quejas
		
		function _popupDenuncias(itemToEdit){
			var edit = false;
			var exitenBrigadas = false;
			if(!itemToEdit){
				itemToEdit= {
				denuncias : ''					 
				};	
			}else{			
				edit=true;
			}
			
			var idVentana='popUPDenuncias';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Contraloria Social", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td align="right"><label>* \u00BFDenuncias o quejas: </label></td>'+
									'<td><input id="txtDenuncias"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
						    '</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
		
			
			var txtDenuncias = new ValidationTextBox({
				id : 'txtDenuncias',
				value : itemToEdit.denuncias,
				maxLength : "150",
				placeHolder : "Nota: agregar denuncias o quejas",
	            style : "width:500px;"
			},'txtDenuncias');
			
						
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (registry.byId('txtDenuncias').get('value')==null || registry.byId('txtDenuncias').get('value')==''){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridDenuncias = registry.byId('gridAccionDQ');
					try{
						try {
							if(edit){	
								var index = gridDenuncias.selection.selectedIndex;
								var item = gridDenuncias.getItem(index);
								gridDenuncias.store.setValue(item, 'denuncias',txtDenuncias.get('value'));
							}
							else{
								var myNewItem = {
									id : gridDenuncias.rowCount + 1,
								 	denuncias : txtDenuncias.get('value')	
								};
								gridDenuncias.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}
		
		
		// vblake inicia popupnumero de alumnos
		
		function _popupNumeroDeAlumnos(itemToEdit){
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
				cct : '',
				ninos : '',
				ninas : ''
				};	
			}else{			
				edit=true;
			}
			
			var idVentana='popUPNumeroDeAlumnos';
			var dDetail =new Dialog({
					id:idVentana, 
					title:" N\u00famero de alumnos", 
					content:'<table border="0" width= "900px">'+
								'<tr>'+
									'<td align="right"><label>* Seleccionar CCT: </label></td>'+
									'<td><input id="cmbCct"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* \u00BFN\u00famero de alumnos hombres: </label></td>'+
									'<td><input id="txtNinos"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* \u00BFN\u00famero de alumnos mujeres: </label></td>'+
									'<td><input id="txtNinas"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="center" colspan="2"><input id="btnAceptar"/><input id="btnCancelar"/></td>'+
								'</tr>'+
								'</table>'
				});
			dDetail.show();
			dDetail.on('hide',function(){
					registry.byId(idVentana).destroyRecursive(false);
				});
			dDetail._setStyleAttr('left:150px !important;');
			dDetail._setStyleAttr('top:100px !important;');
			
		
			
			var txtNinos = new ValidationTextBox({
				id : 'txtNinos',
				value : itemToEdit.ninos,
				maxLength : "2",
				placeHolder : "Nota: agregar n\u00famero de ni\u00f1os",
				regExp : constants.NUMBER_VALID,
				required : true,
	            style : "width:200px;"
			},'txtNinos');
			
			var txtNinas = new ValidationTextBox({
				id : 'txtNinas',
				value : itemToEdit.ninas,
				maxLength : "2",
				placeHolder : "Nota: agregar n\u00famero de ni\u00f1as",
				regExp : constants.NUMBER_VALID,
				required : true,
	            style : "width:200px;"
			},'txtNinas');
			
	 
	
			var data=[{name:"[Seleccione]", id:"[Seleccione]"}];
		    for(var a in escuelas){
		             data.push({name:escuelas[a].name,
		                          id:escuelas[a].id});
		        }
	
			    var stateStore = new Memory({
		        data:data
		    });
	

		var cmbCct = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store:stateStore,
			    value: itemToEdit.cct,
		        required : true		     
		    },"cmbCct");		
		
		// para que aparezca la etiqueta de [Seleccione] en la captura de la CCT
			if(edit){}
			else {
				registry.byId('cmbCct').set('value','[Seleccione]');
			}

	
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					
					if (!form.validate() || registry.byId('txtNinos').get('value')==-1 || registry.byId('txtNinas').get('value')==-1){ 
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					if (registry.byId('txtNinos').get('value')==null || registry.byId('txtNinos').get('value')==''){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					if (registry.byId('cmbCct').get('value')=="[Seleccione]"){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					
					// VBlake validacion de la CCT para no ser duplicada
					
					var gridAlum = registry.byId('gridAlumnos');
 					if(edit){}
					else	
					{
		        	for ( var i = 0; i < gridAlum.rowCount; i++) {

		 				var item = gridAlum.getItem(i);
		 				
		 				if( gridAlum.store.getValue(item,'cct') == registry.byId("cmbCct").get('value')){
		 					utils.cstmAlert("Ya existe registrada la clave de centro de trabajo");
		 					return;
		 				}

		 				}
					}
					
					// VBlake termina validacion
					
					var gridAlumnos = registry.byId('gridAlumnos');
					try{
						try {
							if(edit){	
								var index = gridAlumnos.selection.selectedIndex;
								var item = gridAlumnos.getItem(index);
								gridAlumnos.store.setValue(item, 'cct',cmbCct.get('value'));
								gridAlumnos.store.setValue(item, 'ninos',txtNinos.get('value'));
								gridAlumnos.store.setValue(item, 'ninas',txtNinas.get('value'));
							}
							else{
								var myNewItem = {
									id : gridAlumnos.rowCount + 1,
									cct : cmbCct.get('value'),
								 	ninos : txtNinos.get('value'),
								 	ninas : txtNinas.get('value')
								};
								gridAlumnos.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} catch (e) {
							utils.cstmAlert("El registro ya se encuentra en la tabla.");
							return false;
						}
					}catch(e){
						utils.cstmAlert('Ocurrio un error al Agregar o Editar');
						console.log(e);
					}			
				}
			},'btnAceptar');
			utils.destruirPopUp('btnCancelar',dDetail);
		}
		
		// vblake Termina numero de alumnos
	
		
		
			function _localizarRegistroOtroApoyo(listaApoyos, idApoyo,
					nombreCampo) {
				var otraDescip = null;
				for ( var w in listaApoyos) {

					if (listaApoyos[w].apoyo.cApoyo == idApoyo) {
						if (listaApoyos[w].apoyo.otraDescripcion == true) {
							otraDescip = registry.byId(nombreCampo)
									.get('value');
							break;
						}
					}
				}
				return otraDescip;
			}

			function _localizarRegistroOtroDiagnostico(listaDiagnostico,
					idDiagnostico, nombreCampo) {
				var otraDescip = null;
				for ( var w in listaDiagnostico) {

					if (listaDiagnostico[w].diagnostico.cDiagnosticoCom == idDiagnostico) {
						if (listaDiagnostico[w].diagnostico.otraDescripcion == true) {
							otraDescip = registry.byId(nombreCampo)
									.get('value');
							break;
						}
					}
				}
				return otraDescip;
			}

			function _construyeApoyosNecesidades(apoyosArray,
					listApoyosReunion, txtOtraDescip, hayFamBeneficiadas) {
				var apoyosSeleccionados = new Array();

				// Carga los apoyos seleccionados
				for ( var i in apoyosArray) {
					var otraDescip = null;
					var hayOtraDescrip = false;
					var famBeneficiadas=null;
					otraDescip = _localizarRegistroOtroApoyo(listApoyosReunion,
							apoyosArray[i], txtOtraDescip);
					
					if(hayFamBeneficiadas && otraDescip!=null){						
						famBeneficiadas= registry.byId('inputapoyoFBnf')
						.get('value');
					}
					
					apoyosSeleccionados.push({
						cApoyo : apoyosArray[i],
						descripOtro : otraDescip,
						beneficiariosr1:famBeneficiadas
					});
				}
				//console.log(apoyosSeleccionados);
				return apoyosSeleccionados;
			}

			//recupera las opciones de salud (enfermedades y clinicas)
			function _construyeOpcionesSalud(arrayDiagnostico,
					listDiagnosticoPrimeraReunion, campoOtroTxt) {

				var diagnosticoCom = new Array();

				for ( var i in arrayDiagnostico) {
					var otraDescip = null;
					var hayOtraDescrip = false;
					otraDescip = _localizarRegistroOtroDiagnostico(
							listDiagnosticoPrimeraReunion, arrayDiagnostico[i],
							campoOtroTxt);

					diagnosticoCom.push({
						cDiagnosticoCom : arrayDiagnostico[i],
						descripOtro : otraDescip,
						diagnostico : {
							cTipoDiagnosticoCom : constants.C_DIAG_SALUD
						}

					});

				}
				return diagnosticoCom;
			}



			
			
			// Se manda a actualizar y a grabar a base de datos la informacion capturada
			
			function savePrimeraReunion(cApec, storeCcts) {

				var standby = new Standby({
					target : "dialogCaptiraDGConafe"
				});
				document.body.appendChild(standby.domNode);
				standby.startup();

				var form = registry.byId('registraActaReunion');

				if (form.validate() == false) {
					return false;
				}

				var apec = {
					cApec : cApec
				};

				var existeReunion = primeraReunionObj.reunion ? true : false;
				var apecReunion = null;
				if (existeReunion == true) {
					apecReunion = cApec;
				}

				var apecReunion = {
					fchReunion : registry.byId('fchRegistro').get('value'),
					horaIni : registry.byId('horaInicio').get('value'),
					horaFin : registry.byId('horaFinal').get('value'),
					observaciones : registry.byId('observaciones').get('value'),
					cApec : apecReunion
				};
				if (Date.parse('01/01/2011 '
						+ registry.byId('horaInicio').get('value')) > Date
						.parse('01/01/2011 '
								+ registry.byId('horaFinal').get('value'))) {

					utils
							.cstmAlert("La hora final de su reuni\u00F3n es incorrecta, favor de verificar");
					return false;
				}

				var seccionesRegistradasArray = registry.byId('selectSeccion').get('value');
				var hayApoyos = false;
				var hayDiagComunitario = false;				
				var hayPobInd = false;
				var hayPlanTrab = false;
				var hayBullying = false;
				var hayContraSocial = false;  
				var hayNumAlumnos = false;
				var hayPrincipalesDN = false; // vblake
				var hayActividadesUno = false;
				var hayActividadesTres = false;
				var hayActividadesCuatro = false;

				// Carga los apoyos conafes seleccionados
				
				for ( var i in seccionesRegistradasArray) {
					if (seccionesRegistradasArray[i] == constants.SECCION_APOYOS) {
						hayApoyos = true;
					}

					if (seccionesRegistradasArray[i] == constants.SECCION_DIAG_COMUNITARIO) {
						hayDiagComunitario  = true;

					}
					if (seccionesRegistradasArray[i] == constants.SECCION_POB_IND) {
						hayPobInd = true;
						hayBullying =true;
					}
					if (seccionesRegistradasArray[i] == constants.SECCION_PLAN_TRABAJO) {
						hayPlanTrab = true;

					}
					if (seccionesRegistradasArray[i] == constants.SECCION_CONTRALORIA_SOCIAL) {
						hayContraSocial = true;

					}
					if (seccionesRegistradasArray[i] == constants.SECCION_NUMERO_ALUMNOS) {
						hayNumAlumnos = true;

					}
					if (seccionesRegistradasArray[i] == constants.SECCION_DIFICULTADES_NECESIDADES) {
						hayPrincipalesDN = true;
					}
					
					if (seccionesRegistradasArray[i] == constants.SECCION_ACTIVIDADES_UNO) {
						hayActividadesUno = true;
					}
					if (seccionesRegistradasArray[i] == constants.SECCION_ACTIVIDADES_TRES) {
						hayActividadesTres = true;
					}
					if (seccionesRegistradasArray[i] == constants.SECCION_ACTIVIDADES_CUATRO) {
						hayActividadesCuatro = true;
					}
					
				}
				
				var apoyosConafe = new Array();
				var apoyosFederales = new Array();
				var apoyosEstatales = new Array();
				var diagnosticoCom = new Array();
				
				//Validar que por lo menos haya seleccionado un registro de la lista.
		/*		if(!hayApoyos && !hayDiagComunitario && !hayPobInd && !hayPlanTrab && !hayContraSocial && !hayNumAlumnos && !hayPrincipalesDN && !hayActividadesUno){
					utils.cstmAlert("Deber\u00E1 seleccionar por lo menos un rubro, para continuar <br> con el registro de la primera reuni\u00F3n.");
					return false;
				}

				Validar que haya capturado en todos los registro.				
		*/		if(!hayNumAlumnos && !hayPrincipalesDN && !hayActividadesUno && !hayActividadesTres && !hayActividadesCuatro){
					utils.cstmAlert("Deber\u00E1 capturar todas las pestañas para continuar <br> con el registro de la primera reuni\u00F3n.");
					return false;
				}
				
				
				// VB	inicia carga Apoyos Conafe
				
				var apoyosConafe = new Array();
				if (hayApoyos) {
					var hayConafe = false;
					var gridApoyos = registry.byId('gridConafe');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridApoyos.rowCount; i++) {

						var item = gridApoyos.getItem(i);
						// Genera un nuevo objeto de cada
						// renglon del grid.
						if (gridApoyos.store.getValue(item, 'apoyo') == null
								|| gridApoyos.store.getValue(item, 'apoyo') == ""
								|| gridApoyos.store.getValue(item,'cual')== null
								|| gridApoyos.store.getValue(item,'cantidad')==""
								|| gridApoyos.store.getValue(item, 'beneficiarios') == null) {
							utils
									.cstmAlert("Uno o m\u00e1s apoyos Conafe no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						
						// Se cargan los campos de la base de datos con las variables que almacenan la captura  
						
						var apoyo = {
							cApoyo: gridApoyos.store.getValue(item,'cApoyo'),
							otro : gridApoyos.store.getValue(item,'cual'),
							cantidad : gridApoyos.store.getValue(item,'cantidad'),
							numBenef : gridApoyos.store.getValue(item,'beneficiarios')
						};
						apoyosConafe.push(apoyo);
						hayConafe = true;
					}

					if (hayConafe == false) {
						utils.cstmAlert("Debe indicar alg\u00fan apoyo Conafe");
						return false;
					}
				}

				
				
///VB	termina Apoyos Conafe			
				
// apoyos federales
				var apoyosFederales = new Array();
				if (hayApoyos) {
					var hayFederal = false;
					var gridApoyos = registry.byId('gridFederal');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridApoyos.rowCount; i++) {

						var item = gridApoyos.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridApoyos.store.getValue(item, 'apoyo') == null
								|| gridApoyos.store.getValue(item, 'apoyo') == ""
								|| gridApoyos.store.getValue(item,'beneficiarios')== null
								|| gridApoyos.store.getValue(item,'beneficiarios')==""
								|| gridApoyos.store.getValue(item,'cantidad')== null
								|| gridApoyos.store.getValue(item,'cantidad')==""	
								|| gridApoyos.store.getValue(item, 'gestion') == null
								|| gridApoyos.store.getValue(item, 'gestion') == "") {

							utils
									.cstmAlert("Uno o m\u00e1s apoyos federales no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						
												
						var apoyo = {
							cApoyo: gridApoyos.store.getValue(item,'cApoyo'),
							otro : gridApoyos.store.getValue(item,'cual'),
							cantidad : gridApoyos.store.getValue(item,'cantidad'),
							numBenef : gridApoyos.store.getValue(item,'beneficiarios'),
							gestion : gridApoyos.store.getValue(item,'gestion')
						};
						apoyosFederales.push(apoyo);
						hayFederal = true;
					}

					if (hayFederal == false) {

						utils.cstmAlert("Debe indicar alg\u00fan apoyo federal");
						return false;
					}
				}	
				
				
//
				
				var apoyosEstatales = new Array();
				if (hayApoyos) {
					var hayEstatal = false;
					var gridApoyos = registry.byId('gridEstatal');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridApoyos.rowCount; i++) {

						var item = gridApoyos.getItem(i);
						// Genera un nuevo objeto de cada renglon del grid.
						
						if (gridApoyos.store.getValue(item, 'apoyo') == null
								|| gridApoyos.store.getValue(item, 'apoyo') == ""
								|| gridApoyos.store.getValue(item, 'gestion') == null
								|| gridApoyos.store.getValue(item, 'gestion') == "") {

							utils
									.cstmAlert("Uno o m\u00e1s apoyos estatales no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						
						// los campos de la izquierda son los que corresponden a la base de datos y se deben de poner 
						//tal cual se llamen en la BD
						
						var estatal= {
							cApoyo: gridApoyos.store.getValue(item,'cApoyo'),
							otro : gridApoyos.store.getValue(item,'especifique'),
							descripApoyo : gridApoyos.store.getValue(item,'describir'),
							numBenef : gridApoyos.store.getValue(item,'beneficiarios'),
							gestion : gridApoyos.store.getValue(item,'gestion')
						};
						apoyosEstatales.push(estatal);
						hayEstatal = true;
					}

					if (hayEstatal == false) {
						utils.cstmAlert("Debe indicar alg\u00fan apoyo estatal");
						return false;
					}
				}	
				
				
				
	//
				if (hayDiagComunitario) {
					var hayOpcionesSalud = false;
					var diagnosticoSaludArray = registry.byId('listProblemas1')
							.get('value');
					var diagSalud1 = new Array();

					diagSalud1 = _construyeOpcionesSalud(diagnosticoSaludArray,
							primeraReunionObj.diagnostico, 'inputproblemas');

					if (diagSalud1.length != 0) {
						for ( var j in diagSalud1) {
							diagnosticoCom.push(diagSalud1[j]);
							hayOpcionesSalud = true;
							;
						}
					}
					var diagnosticoCCSaludArray = registry.byId(
							'listProblemas2').get('value');
					var diagSalud2 = new Array();

					diagSalud2 = _construyeOpcionesSalud(
							diagnosticoCCSaludArray,
							primeraReunionObj.diagnostico, 'inputsoluciones');

					if (diagSalud2.length != 0) {
						for ( var j in diagSalud2) {
							diagnosticoCom.push(diagSalud2[j]);
							hayOpcionesSalud = true;
							;
						}

					}
					var hayOpcionesProd = false;

					var diagProdObj = primeraReunionObj.diagnostico ? primeraReunionObj.diagnostico
								: [];
					for ( var i in diagProdObj) {
						if (diagProdObj[i].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_PRODUCCION) {

							var idConceptoProd = diagProdObj[i].diagnostico.cDiagnosticoCom;

							if (!diagProdObj[i].diagnostico.poblacionAfectada) {
								var prodcg = registry.byId('checkBoxProd').get(
											'value');
									if (prodcg != false) {
										diagnosticoCom.push({
											cDiagnosticoCom : idConceptoProd,
											diagnostico : {
												cTipoDiagnosticoCom : constants.C_DIAG_PRODUCCION
											}
										});
										hayOpcionesProd = true;
									}

								} else {
									var prodTxt = 0 //registry.byId('inputProduccion')
											//.get('value');
											// se elimina segundo reglon de produccion
									if (prodTxt.length != 0) {
										diagnosticoCom.push({
											cDiagnosticoCom : idConceptoProd,
											diagnostico : {
												cTipoDiagnosticoCom : constants.C_DIAG_PRODUCCION
											},
											poblacionAfectada : prodTxt
										});
										hayOpcionesProd = true;
									}

								}
							}
						}
					var hayOpcionesINEA = false;
					var diagAlfbObj = primeraReunionObj.diagnostico ? primeraReunionObj.diagnostico
								: [];
					for ( var i in diagAlfbObj) {
						if (diagAlfbObj[i].diagnostico.cTipoDiagnosticoCom == constants.C_DIAG_INEA) {

							var idConceptoTxt = 'input'
									+ (diagAlfbObj[i].tipoDiagnostico ? diagAlfbObj[i].tipoDiagnostico
											: '')
									+ diagAlfbObj[i].diagnostico.cDiagnosticoCom;

							var cantidadTxt = registry.byId(idConceptoTxt).get(
									'value');

							if (cantidadTxt != null && cantidadTxt.length != 0) {
								diagnosticoCom
										.push({
											cDiagnosticoCom : diagAlfbObj[i].diagnostico.cDiagnosticoCom,
											diagnostico : {
												cTipoDiagnosticoCom : constants.C_DIAG_INEA
											},
											poblacionAfectada : cantidadTxt
										});
								hayOpcionesINEA = true;
							}

						}

					}
					if (hayOpcionesSalud == false && hayOpcionesProd==false && hayOpcionesINEA==false) {

						utils
								.cstmAlert("Debe indicar alguno de los rubros de diagn\u00F3stico comunitario");
						return false;
					}


				}
				var necEsp = new Array();
				var pobIndigena = new Array();
				if (hayPobInd) {
					var hayDatosIncSocial = false;
					var gridNecesidades = registry.byId('gridNecesidad');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridNecesidades.rowCount; i++) {

						var item = gridNecesidades.getItem(i);
						// Genera un nuevo objeto de necesidad especial de cada
						// renglon del grid.
						if (gridNecesidades.store.getValue(item, 'necesidad') == null
								|| gridNecesidades.store.getValue(item,
										'necesidad') == ""
								|| gridNecesidades.store.getValue(item, 
										'nomNee') == null
								|| gridNecesidades.store.getValue(item,
										'nomNee') == ""
								|| gridNecesidades.store.getValue(item,
										'cuantos') == null
								|| gridNecesidades.store.getValue(item,
										'cuantos') == ""
								|| gridNecesidades.store.getValue(item,
										'gestion') == null
								|| gridNecesidades.store.getValue(item,
										'gestion') == "") {
							utils
									.cstmAlert("Una o m\u00e1s necesidades especiales no cuentan con la informaci\u00F3n requerida");
							return false;
						}

						var neceEspItem = {
							cApoyo : gridNecesidades.store.getValue(item,
									'cApoyo'),
							cNee : gridNecesidades.store.getValue(
									item, 'cNee'),
							cuantos : gridNecesidades.store.getValue(
									item, 'cuantos'),
							gestionar : gridNecesidades.store.getValue(
									item, 'gestion'),
							cNee1 : gridNecesidades.store.getValue(
									item, 'cNee1'),
							cuantos1 : gridNecesidades.store.getValue(
									item, 'cuantos1'),
							gestionar1 : gridNecesidades.store.getValue(
									item, 'gestion1'),
						};

						necEsp.push(neceEspItem);
						hayDatosIncSocial = true;
					}

					var gridPobIndigena = registry.byId('gridSituaciones');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridPobIndigena.rowCount; i++) {

						var item = gridPobIndigena.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridPobIndigena.store.getValue(item, 'situacion') == null
								|| gridPobIndigena.store.getValue(item,
										'situacion') == ""
								|| gridPobIndigena.store.getValue(item,
										'cuantos') == null
								|| gridPobIndigena.store.getValue(item,
										'cuantos') == ""
								|| gridPobIndigena.store.getValue(item,
										'lengua') == null
								|| gridPobIndigena.store.getValue(item,
										'lengua') == "") {

							utils
									.cstmAlert("Un o m\u00e1s registros de poblaci\u00F3n indigena no cuentan con la informaci\u00F3n requerida");
							return false;
						}

						var pobIndItem = {
							cPoblacionIndigena : gridPobIndigena.store
									.getValue(item, 'idSituacion'),
							poblacionAfectada : gridPobIndigena.store.getValue(
									item, 'cuantos'),
							cLengua : gridPobIndigena.store.getValue(item,
									'idLengua')

						};

						pobIndigena.push(pobIndItem);
						hayDatosIncSocial = true;
						
						
					}
					//bullying
					var bullying = new Array();
					var gridAcoso = registry.byId('gridBullying');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridAcoso.rowCount; i++) {

						var item = gridAcoso.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridAcoso.store.getValue(item, 'nombre') == null
								|| gridAcoso.store.getValue(item, 'nombre') == ""
								|| gridAcoso.store.getValue(item,'cuantos')== null
								|| gridAcoso.store.getValue(item,'cuantos')==""
								|| gridAcoso.store.getValue(item, 'numveces') == null
								|| gridAcoso.store.getValue(item, 'numveces') == "") {

							utils
									.cstmAlert("Una o m\u00e1s casos de bullying no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						
												
						var acoso = {
						    cCoTipoBullying: gridAcoso.store.getValue(item,
												'idTpoBullying'),
							cCoBullying : gridAcoso.store.getValue(item,
									'idBullying'),
							cuantos : gridAcoso.store.getValue(item,
									'cuantos'),
							numvecesr1 : gridAcoso.store.getValue(item,
									'numveces')
						};
						bullying.push(acoso);
						hayDatosIncSocial = true;
						
					}
					//

					if (hayDatosIncSocial == false) {

						utils
								.cstmAlert("Debe indicar alguno de los rubros de inclusi\u00F3n social");
						return false;
					}

				}
				
//	Bullying
				
			

		
//	Plan de Trabajo			
				var planTrabajo = new Array();
				if (hayPlanTrab) {
					var hayPlanTrabajo = false;

					var apoyoPermanenciaArray = registry.byId('cmsPlanT').get(
							'value');

					// Carga los apoyos conafes seleccionados
					for ( var i in apoyoPermanenciaArray) {

						var apoyoPermanencia = {
							cAccion : apoyoPermanenciaArray[i],

						};

						planTrabajo.push(apoyoPermanencia);
						hayPlanTrabajo = true;

					}

					var gridTrabajo = registry.byId('gridAccion');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridTrabajo.rowCount; i++) {

						var item = gridTrabajo.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridTrabajo.store.getValue(item, 'nombre') == null
								|| gridTrabajo.store.getValue(item, 'nombre') == ""
								|| gridTrabajo.store.getValue(item, 'numVeces') == null
								|| gridTrabajo.store.getValue(item, 'numVeces') == "") {

							utils
									.cstmAlert("Una o m\u00e1s acciones del plan de trabajo no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						
												
						var accionPT = {
							cAccion : gridTrabajo.store.getValue(item,
									'idAccion'),
							numVecesr1 : gridTrabajo.store.getValue(item,
									'numVeces'),
							nomOtra : gridTrabajo.store.getValue(item,
							'otros')

						};
 

						planTrabajo.push(accionPT);
						hayPlanTrabajo = true;
					}

					if (hayPlanTrabajo == false) {

						utils
								.cstmAlert("Debe indicar alguna acci\u00F3n y/o apoyo para el plan de trabajo");
						return false;
					}
				}
				
// vblake Inicia carga Contraloria Solcial 
				
				var contraloriaSocial = new Array();
				var denuncias = new Array();
				var opiniones = new Array();
				
				if (hayContraSocial) {
					var hayContraSocial = false;
					var gridCSoc = registry.byId('gridAccionOC');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridCSoc.rowCount; i++) {

						var item = gridCSoc.getItem(i);
						// Genera un nuevo objeto de contraloria Social Opiniones y Comentarios de cada renglon del grid.
						if (gridCSoc.store.getValue(item, 'opiniones') == null
								|| gridCSoc.store.getValue(item, 'opiniones') == ""){
						
							utils
									.cstmAlert("Una o m\u00e1s acciones de Contraloria Social no cuentan con la informaci\u00F3n requerida");
							return false;
						}
																							
						var accionCSoc = {
							cOpiniones: gridCSoc.store.getValue(item,'id'),
							opiniones : gridCSoc.store.getValue(item,'opiniones')

						};

						opiniones.push(accionCSoc);
						hayContraSocial = true;
					}

					if (hayContraSocial == false) {

						utils
								.cstmAlert("Debe registrar alguna opinion y/o comentario para Contraloria Social");
						return false;
					}
					
					var gridCSdq = registry.byId('gridAccionDQ');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridCSdq.rowCount; i++) {

						var item = gridCSdq.getItem(i);
						// Genera un nuevo objeto de contraloria Social Denuncias o Quejas de cada renglon del grid.
						if (gridCSdq.store.getValue(item, 'denuncias') == null
								|| gridCSdq.store.getValue(item, 'denuncias') == ""){
							
							utils
									.cstmAlert("Una o m\u00e1s acciones Contraloria Social no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						var accionCSdq = {
							cDenuncias : gridCSdq.store.getValue(item,'id'),
							denuncias : gridCSdq.store.getValue(item,'denuncias')
						};


						denuncias.push(accionCSdq);
						hayContraSocial = true;
					}

					if (hayContraSocial == false) {

						utils
								.cstmAlert("Debe registrar alguna denucia o queja para Contraloria Social");
						return false;
					}	
					
					
					
				}
				
// vblake Termina carga Contraloria Social 
				
// vblake Inicia carga Numero de Alumnos
				
				var numeroAlumnos = new Array();
					
				if (hayNumAlumnos) {
					var hayNumAlumnos = false;
					var gridNumAlum = registry.byId('gridAlumnos');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridNumAlum.rowCount; i++) {

						var item = gridNumAlum.getItem(i);
						// Genera un nuevo objeto de cada renglon del grid.
						if (gridNumAlum.store.getValue(item, 'ninos') == null
								|| gridNumAlum.store.getValue(item, 'ninos') == ""){
						
							utils
									.cstmAlert("Una o m\u00e1s acciones de Número de Alumnos no cuentan con la informaci\u00F3n requerida");
							return false;
						}
																							
						var numAlum = {
							cNumalum: gridNumAlum.store.getValue(item,'id'),
							cct : gridNumAlum.store.getValue(item,'cct'),
							ninos: gridNumAlum.store.getValue(item,'ninos'),
							ninas: gridNumAlum.store.getValue(item,'ninas')
						};

						numeroAlumnos.push(numAlum);
						hayNumAlumnos = true;
					}

					if (hayNumAlumnos == false) {

						utils
								.cstmAlert("Debe registrar el n\u00FAmero de alumnos");
						return false;
					}
				
				}
				
// vblake Termina carga Numero de Alumnos
				
						
//******** Inicia carga principales dificultades y necesidades
				
				var principalesDN = new Array();
				var dificultades = new Array();
				var necesidades = new Array();
				
				if (hayPrincipalesDN) {
					var hayPrincipalesDN = false;
					var gridPD = registry.byId('gridAccionPD');
					//var gridPD = registry.byId('gridDificultades');
					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridPD.rowCount; i++) {

						var item = gridPD.getItem(i);
						// Genera un nuevo objeto de principales dificultades de cada renglon del grid.
						if (gridPD.store.getValue(item, 'dificultades') == null
								|| gridPD.store.getValue(item, 'dificultades') == ""){
						
							utils
									.cstmAlert("Una o m\u00e1s acciones de principales Dificultades y Necesidades no cuentan con la informaci\u00F3n requerida");
							return false;
						}
																							
						var accionPD = {
							cDificultades: gridPD.store.getValue(item,'id'),
							dificultades : gridPD.store.getValue(item,'dificultades')

						};

						dificultades.push(accionPD);
						hayPrincipalesDN = true;
					}

					if (hayPrincipalesDN == false) {

						utils
								.cstmAlert("La pesta\u00F1a Principales Dificultades y Necesidades no cuentan con la informaci\u00F3n requerida");
						return false;
					}
					
					var gridPN = registry.byId('gridAccionPN');

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridPN.rowCount; i++) {

						var item = gridPN.getItem(i);
						// Genera un nuevo objeto de principales necesidades de cada renglon del grid.
						if (gridPN.store.getValue(item, 'necesidades') == null
								|| gridPN.store.getValue(item, 'necesidades') == ""){
							
							utils
									.cstmAlert("Una o m\u00e1s acciones Principales Necesidades no cuentan con la informaci\u00F3n requerida");
							return false;
						}
						
						var accionPN = {
							cNecesidades : gridPN.store.getValue(item,'id'),
							necesidades : gridPN.store.getValue(item,'necesidades')
						};


						necesidades.push(accionPN);
						hayPrincipalesDN = true;
					}

					if (hayPrincipalesDN == false) {

						utils
								.cstmAlert("Debe registrar algunas Principales Necesidades ");
						return false;
					}	
					
					
					
				}
				
//******** Termina principales dificultades y necesidades
				

	
// valida que al menos tenga un taller capturado
				if	(registry.byId('fechataller1').getValue() == null &&
					 registry.byId('fechataller2').getValue() == null &&
					 registry.byId('fechataller3').getValue() == null ){			
					
					utils
							.cstmAlert("1. Actividades y 2. Actividades: Comunidad de Aprendizaje: Registrar al menos un taller");
					return false;} 
				
// valida que se registre en integrante de la apec
				if	(registry.byId('cmbIntApecSeg3a').getValue() == "" || registry.byId('cmbIntApecSeg3a').getValue() == null){			
					
					utils
							.cstmAlert("1. Actividades y 2. Actividades: Comunidad de Aprendizaje : Registrar el integrante de la APEC que realiz\u00E1n el seguimiento");
					return false;}
				
				
// valida que tenga los tres talleres capturado				
				if	(registry.byId('fechataller4').getValue() == null ||
					 registry.byId('fechataller5').getValue() == null ||
					 registry.byId('fechataller6').getValue() == null ){			
					
					utils
							.cstmAlert("1. Actividades y 2. Actividades: Unidad de Aprendizaje Aut\u00F3nomo: Registrar los tres talleres");
					return false;} 
				
				
// valida que se registre en integrante de la apec
				if	(registry.byId('cmbIntApecSeg7').getValue() == "" || registry.byId('cmbIntApecSeg7').getValue() == null){			
					
					utils
							.cstmAlert("1. Actividades y 2. Actividades: Comunidad de Aprendizaje : Registrar el integrante de la APEC que realiz\u00E1n el seguimiento");
					return false;}
				
// valida que al menos tenga una celebración 
				if	(registry.byId('describirCC1').getValue() == "" &&
					 registry.byId('describirCC2').getValue() == "" &&
					 registry.byId('describirCC3').getValue() == "" ){			
					
					utils
							.cstmAlert("1. Actividades y 2. Actividades: Celebraciones c\u00EDvico culturales: Registrar al menos una celebraci\u00F3n");
					return false;} 
				
// valida que se registren las tareas, recursos y espacios
				if	(registry.byId('tareasyespaciosCC').getValue() == ""){			
					
					utils
							.cstmAlert("1. Actividades y 2. Actividades: Celebraciones c\u00EDvico culturales: Registrar fecha, tareas, recursos y espacios que se utilizar\u00E1n.");
					return false;}
		
// valida que se registren la solicitud de la caravana
				if	(registry.byId('cmbSolCaravana').getValue() == ""){			
					
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Estrategia CONAFE: No cuenta con la informaci\u00F3n requerida");
					return false;}
				
	 			if	(registry.byId('cmbSolCaravana').getValue() == "SI" &&			
	 				 registry.byId('fechaSC').getValue()== null) {
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Estrategia CONAFE: Registrar fecha");
					return false;}
	 			
	 			if	(registry.byId('cmbSolCaravana').getValue() == "SI" &&			
		 				registry.byId('cmbIntApecEC17').getValue() ==""){
						utils
								.cstmAlert("1. Actividades y 2 Actividades. Estrategia CONAFE: Registrar integrante de la APEC");
						return false;}
	 			
//  valida que se registren actividades artisticas
				if	(registry.byId('describirAA1').getValue() == ""){			
					
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Otras actividades art\u00EDsticas: No cuenta con la informaci\u00F3n requerida");
					return false;}
				
	 			if	(registry.byId('describirAA1').getValue() != "" &&			
	 				 registry.byId('fechaAA1').getValue()== null) {
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Otras actividades art\u00EDsticas: Registrar: Fecha");
					return false;}
	 			
	 			if	(registry.byId('describirAA1').getValue() != "" &&			
		 				registry.byId('tareasyespaciosAA').getValue() ==""){
						utils
								.cstmAlert("1. Actividades y 2 Actividades. Otras actividades art\u00EDsticas: Registrar tareas, recursos y espacios que se utilizar\u00E1n");
						return false;}
  
	 			
// valida que se registren eventos deportivos
				if	(registry.byId('describirED1').getValue() == ""){			
					
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Eventos deportivos: No cuenta con la informaci\u00F3n requerida");
					return false;}
				
	 			if	(registry.byId('describirED1').getValue() != "" &&			
	 				 registry.byId('fechaED1').getValue()== null) {
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Eventos deportivos: Registrar: Fecha");
					return false;}
	 			
	 			if	(registry.byId('describirED1').getValue() != "" &&			
		 				registry.byId('tareasyespaciosED').getValue() ==""){
						utils
								.cstmAlert("1. Actividades y 2 Actividades. Eventos deportivos: Registrar tareas, recursos y espacios que se utilizar\u00E1n");
						return false;}
	 			
// valida que se registren Asesor Pedagogico
				if	(registry.byId('cmbSiNo28').getValue() == ""){			
					
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar Asesor Pedag\u00F3gico Itinerante");
					return false;}
				
// valida que se registren numero de adultos con interes
				if	(registry.byId('numAdultos').getValue() == ""){			
					
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar n\u00FAmero de adultos con interes");
					return false;}
				
// valida que se registren INEA

				if	(registry.byId('cmbSiNo30').getValue() == ""){			
					
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar si la comunidad forma parte del universo de acreditaci\u00F3n y certificaci\u00F3n INEA?");
					return false;}
				
	 			if	(registry.byId('cmbSiNo30').getValue() == "SI" &&			
	 				 registry.byId('mujeres31').getValue()== "") {
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar n\u00FAmero de mujeres");
					return false;}
	 			
	 			if	(registry.byId('cmbSiNo30').getValue() == "SI" &&			
		 				registry.byId('hombres32').getValue() ==""){
						utils
								.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar n\u00FAmero de hombres");
						return false;}	
	 			
	 			if	(registry.byId('cmbSiNo30').getValue() == "SI" &&			
		 				registry.byId('cmbIntApecAlf33').getValue() ==""){
						utils
								.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar integrante de la APEC");
						return false;}
	 			
// valida que se registren Actividades fuera de horario

				if	(registry.byId('cmbSiNo34').getValue() == ""){			
					
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar Si / NO se realizar\u00F3n actividades para el reforzamiento de aprendizajes fuera de horario escolar");
					return false;}
				
	 			if	(registry.byId('cmbSiNo34').getValue() == "SI" &&			
	 				 registry.byId('describirAR35').getValue()== "") {
					utils
							.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar actividades para el reforzamiento de aprendizajes fuera de horario escolar");
					return false;}
	 			
	 			if	(registry.byId('cmbSiNo34').getValue() == "SI" &&			
		 				registry.byId('cuandoAR36').getValue() ==""){
						utils
								.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar Cu\u00E1ndo");
						return false;}	
	 			
	 			if	(registry.byId('cmbSiNo34').getValue() == "SI" &&			
		 				registry.byId('cmbNivelEduc37').getValue() ==""){
						utils
								.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar Nivel educativo");
						return false;}
	 			
	 			if	(registry.byId('cmbSiNo34').getValue() == "SI" &&			
		 				registry.byId('numAlum38').getValue() ==""){
						utils
								.cstmAlert("1. Actividades y 2 Actividades. Actividades estraescolares: Registrar n\u00FAmero de alumnos");
						return false;}
			
//******** Inicia carga Actividades uno y dos
	 			
	 			
				if (hayActividadesUno) {
				 actividadesUno = {
						respuesta1		: registry.byId('fechataller1').getValue(),
						respuesta2		: registry.byId('fechataller2').getValue(),
						respuesta3		: registry.byId('fechataller3').getValue(),
						respuesta4		: registry.byId('fechataller4').getValue(),
						respuesta5		: registry.byId('fechataller5').getValue(),
						respuesta6		: registry.byId('fechataller6').getValue(),
						respuesta7		: registry.byId('cmbIntApecSeg7').getValue(),
						respuesta8		: registry.byId('describirCC1').getValue(),
						respuesta9		: registry.byId('fechaCelCulturales1').getValue(),
						respuesta10		: registry.byId('describirCC2').getValue(),
						respuesta11		: registry.byId('fechaCelCulturales2').getValue(),
						respuesta12 	: registry.byId('describirCC3').getValue(),
						respuesta13 	: registry.byId('fechaCelCulturales3').getValue(),
						respuesta14		: registry.byId('tareasyespaciosCC').getValue(),
						respuesta15		: registry.byId('cmbSolCaravana').getValue(),
						respuesta16		: registry.byId('fechaSC').getValue(),
						respuesta17 	: registry.byId('cmbIntApecEC17').getValue(),
						respuesta18 	: registry.byId('describirAA1').getValue(),
						respuesta19		: registry.byId('fechaAA1').getValue(),
						respuesta20		: registry.byId('describirAA2').getValue(),
						respuesta21		: registry.byId('fechaAA2').getValue(),
						respuesta22		: registry.byId('tareasyespaciosAA').getValue(),
						respuesta23		: registry.byId('describirED1').getValue(),
						respuesta24		: registry.byId('fechaED1').getValue(),
						respuesta25 	: registry.byId('describirED2').getValue(),
						respuesta26 	: registry.byId('fechaED2').getValue(),
						respuesta27		: registry.byId('tareasyespaciosED').getValue(),
						respuesta28		: registry.byId('cmbSiNo28').getValue(),
						respuesta29		: registry.byId('numAdultos').getValue(),
						respuesta30		: registry.byId('cmbSiNo30').getValue(),
						respuesta31		: registry.byId('mujeres31').getValue(),
						respuesta32		: registry.byId('hombres32').getValue(),
						respuesta33		: registry.byId('cmbIntApecAlf33').getValue(),
						respuesta34		: registry.byId('cmbSiNo34').getValue(),
						respuesta35		: registry.byId('describirAR35').getValue(),
						respuesta36		: registry.byId('cuandoAR36').getValue(),
						respuesta37		: registry.byId('cmbNivelEduc37').getValue(),
						respuesta38		: registry.byId('numAlum38').getValue(),
						respuesta39		: registry.byId('describirAR39').getValue(),
						respuesta40		: registry.byId('cuandoAR40').getValue(),
						respuesta41		: registry.byId('cmbNivelEduc41').getValue(),
						respuesta42		: registry.byId('numAlum42').getValue(),
						respuesta3a		: registry.byId('cmbIntApecSeg3a').getValue(),
						respuesta22a	: registry.byId('tareasyespaciosAA2').getValue(),
						respuesta27a	: registry.byId('tareasyespaciosED2').getValue() 
					};
			
					 hayActividadesUno = true;
				}
				
//******** Termina carga actividades uno y dos
				
				
// Inicia validacion Actividad 3
	 			
//validacion alimentación, hospedaje, acompañamiento al  LEC

				if	(registry.byId('alimentacion1').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar los procedimentos, acordados en asamblea para proporcionar alimentaci\u00F3n al LEC ");
					return false;}
				
				if	(registry.byId('hospedaje2').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar los procedimentos, acordados en asamblea para proporcionar hospedaje al LEC ");
					return false;}
				
				if	(registry.byId('cabecera3').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar los procedimentos, acordados en asamblea para proporcionar acompa\u00F1amiento al LEC a cabecera municipal ");
					return false;}
				
//validacion cuantos niñas y niños no asisten a servicios educativos
				
				if	(registry.byId('noAsisten4').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar Cuantos ni\u00F1os y adolescentes NO asisten a servicios educativos, es caso de no existir registrar el n\u00FAmero CERO");
					return false;}

				if	(registry.byId('cantidad5').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar Cuantos ni\u00F1os y adolescentes NO asisten a servicios educativos de 0 a 3 a\u00F1os, es caso de no existir registrar el n\u00FAmero CERO");
					return false;}
				
				if	(registry.byId('cantidad9').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar Cuantos ni\u00F1os y adolescentes NO asisten a servicios educativosde 3 a 6 a\u00F1os, es caso de no existir registrar el n\u00FAmero CERO");
					return false;}
				
				if	(registry.byId('cantidad13').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar Cuantos ni\u00F1os y adolescentes NO asisten a servicios educativos 6 a 12 a\u00F1os, es caso de no existir registrar el n\u00FAmero CERO");
					return false;}
				
				if	(registry.byId('cantidad17').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar Cuantos ni\u00F1os y adolescentes NO asisten a servicios educativos 12 a 18 a\u00F1os, es caso de no existir registrar el n\u00FAmero CERO");
					return false;}
				
//validacion de los niños y adolescentes que no asisten a servicios educativos
				
				if	(registry.byId('alumConDisc36').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar Cu\u00E1ntos alumnos con discapacidad asisten a servicios educativos?, es caso de no existir registrar el n\u00FAmero CERO");
					return false;}
				
	 			if	(registry.byId('alumConDisc36').getValue() >= "1" &&			
		 				registry.byId('cmbTiposDisc37').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Registrar tipo de discapacidad");
						return false;}
	 			
	 			if	(registry.byId('alumConDisc36').getValue() >= "1" &&			
		 				registry.byId('mobYespacios38').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Registrar si es necesario adecuar mobiliario y espacios educativos");
						return false;}
	 			
	 			if	(registry.byId('alumConDisc36').getValue() >= "1" &&			
		 				registry.byId('apoyos39').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Registrar qu\u00E9 apoyos necesitan para aprender");
						return false;}
	 			
	 			if	(registry.byId('alumConDisc36').getValue() >= "1" &&			
		 				registry.byId('favorecer40').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Registrar cu\u00E1les son las actividades que se realizar\u00E1n para favorecer sus aprendizajes");
						return false;}
				
	 			if	(registry.byId('especificar41').getValue() != "" &&			
		 				registry.byId('cNinos42').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Condici\u00F3n Viven en comunidades vecinas y se transladan diariamente para asistir a los servicios educativos, registrar cu\u00E1ntos ni\u00F1os");
						return false;}
	 			
	 			if	(registry.byId('especificar41').getValue() != "" &&			
		 				registry.byId('cAdolescentes43').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Condici\u00F3n Viven en comunidades vecinas y se transladan diariamente para asistir a los servicios educativos, registrar cu\u00E1ntos adolescentes");
						return false;}
	 			
	 			if	(registry.byId('especificar41').getValue() != "" &&			
		 				registry.byId('cmbBeca44').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Condici\u00F3n Viven en comunidades vecinas y se transladan diariamente para asistir a los servicios educativos,registrar Si / No Se tramitar\u00E1 beca Ac\u00E9rcate a la escuela, Reciben beca Prospera (Programa Inclusi\u00F3n Social)? ");
						return false;}
	 			
	 			if	(registry.byId('especificar45').getValue() != "" &&			
		 				registry.byId('cNinos46').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Condici\u00F3n: Se hospedan temporalmente en la comunidad para asistir a clases, registrar cu\u00E1ntos ni\u00F1os");
						return false;}
	 			
	 			if	(registry.byId('especificar45').getValue() != "" &&			
		 				registry.byId('cAdolescentes47').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Condici\u00F3n: Se hospedan temporalmente en la comunidad para asistir a clases, registrar cu\u00E1ntos adolescentes");
						return false;}
	 			
	 			if	(registry.byId('especificar45').getValue() != "" &&			
		 				registry.byId('cmbBeca48').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Condici\u00F3n: Se hospedan temporalmente en la comunidad para asistir a clases, registrar Si / No Se tramitar\u00E1 beca Ac\u00E9rcate a la escuela, Reciben beca Prospera (Programa Inclusi\u00F3n Social)? ");
						return false;}
	 		
//validacion de ¿Cuántos alumnos tienen baja talla y peso?
	 			
				if	(registry.byId('tallaPeso49').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Registrar Cu\u00E1ntos alumnos tienen baja talla y peso?, es caso de no existir registrar el n\u00FAmero CERO");
					return false;}
				
				
	 			if	(registry.byId('tallaPeso49').getValue() >= "1" &&			
		 				registry.byId('cmbAlimen50').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Apoyos alimentarios, registrar Si / No Recibir\u00E1n apoyo alimentario del Programa de Inclusi\u00F3n Social");
						return false;}
	 			
	 			if	(registry.byId('cmbAlimen50').getValue() == "SI" &&			
		 				registry.byId('fechaAA51').getValue() ==null){
						utils
								.cstmAlert("3. Actividad: Apoyos alimentarios, registrar fecha de se Recibir\u00E1n apoyo alimentario del Programa de Inclusi\u00F3n Social");
						return false;}
	 			
	 			if	(registry.byId('cmbAlimen52').getValue() == "SI" &&			
		 				registry.byId('fechaAA53').getValue() ==null){
						utils
								.cstmAlert("3. Actividad: Apoyos alimentarios, registrar fecha de se tramitar\u00E1n apoyos alimentarios DIF (desayunos fr\u00EDos o calientes)");
						return false;}
	 			
	 			if	(registry.byId('cmbAlimen54').getValue() == "SI" &&			
		 				registry.byId('fechaAA55').getValue() ==null){
						utils
								.cstmAlert("3. Actividad: Apoyos alimentarios, registrar fecha de en la comunidad funciona un comedor de la cruzada contra el hambre?");
						return false;}
	 			
	 			if	(registry.byId('cmbIntApecAA56').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Apoyos alimentarios, registrar integrante de la APEC que realizar\u00E1 el seguimiento");
					return false;}
	 			
//validacion de Los alumnos que asisten a servicios educativos cuentan con los materiales escolares y bibliográficos básicos: 			
	 			
	 			if	(registry.byId('cantidadReq57').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material: Paquetes \u00FAtiles escolares, registrar cantidad requerida");
					return false;}
	 			
	 			if	(registry.byId('cantidadEnt58').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material: Paquetes \u00FAtiles escolares, registrar cantidad entregada");
					return false;}
	 			
	 			if	(registry.byId('fechaME59').getValue() == null){			
					
					utils
							.cstmAlert("3. Actividad: Material: Paquetes \u00FAtiles escolares, registrar fecha de recepci\u00F3n");
					return false;}
	 			
	 			if	(registry.byId('cantidadReq60').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material: Libros de texto gratuitos, registrar cantidad requerida");
					return false;}
	 			
	 			if	(registry.byId('cantidadEnt61').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material: Libros de texto gratuitos, registrar cantidad entregada");
					return false;}
	 			
	 			if	(registry.byId('fechaME62').getValue() == null){			
					
					utils
							.cstmAlert("3. Actividad: Material: Libros de texto gratuitos, registrar fecha de recepci\u00F3n");
					return false;}
	 			
//validacion de material y Mobiliario
	 			
	 			if	(registry.byId('cmbMatMob63').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material y Mobiliario: Materiales para el aula, registrar Paquete completo? Si / No");
					return false;}
	 			
	 			if	(registry.byId('cmbMatMob63').getValue() == "SI" &&			
		 				registry.byId('fechaMM64').getValue() ==null){
						utils
								.cstmAlert("3. Actividad: Material y Mobiliario: Materiales para el aula, registrar fecha de recepci\u00F3n");
						return false;}
	 			
	 			if	(registry.byId('cmbMatMob65').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material y Mobiliario: Auxiliares did\u00E1cticos, registrar Es suficiente? Si / No");
					return false;}
	 			
	 			if	(registry.byId('cmbMatMob65').getValue() == "NO" &&			
		 				registry.byId('explicar66').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Material y Mobiliario: Auxiliares did\u00E1cticos, En caso negativo, registrar se solicitar\u00E1 reposici\u00F3n?, explicar");
						return false;}
	 			
	 			if	(registry.byId('cmbMatMob67').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material y Mobiliario: Biblioteca , registrar Es suficiente? Si / No");
					return false;}
	 			
	 			if	(registry.byId('cmbMatMob67').getValue() == "NO" &&			
		 				registry.byId('explicar68').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Material y Mobiliario: Biblioteca , En caso negativo, registrar se solicitar\u00E1 reposici\u00F3n?, explicar");
						return false;}
	 			
	 			if	(registry.byId('cmbMatMob69').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material y Mobiliario: Mobiliario , registrar Es suficiente? Si / No");
					return false;}
	 			
	 			if	(registry.byId('cmbMatMob69').getValue() == "NO" &&			
		 				registry.byId('explicar70').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Material y Mobiliario: Mobiliario , En caso negativo, registrar se solicitar\u00E1 reposici\u00F3n?, explicar");
						return false;}
	 			
	 			if	(registry.byId('cmbMatMob71').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material y Mobiliario: Material deportivo , registrar Es suficiente? Si / No");
					return false;}
	 			
	 			if	(registry.byId('cmbMatMob71').getValue() == "NO" &&			
		 				registry.byId('mencionar72').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Material y Mobiliario: Material deportivo , En caso negativo, mencionar las medidas acordadas para cubrir la necesidad");
						return false;}
	 			
	 			if	(registry.byId('cmbMatMob73').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material y Mobiliario: Botiquín de primeros auxilios , registrar Es suficiente? Si / No");
					return false;}
	 			
	 			if	(registry.byId('cmbMatMob73').getValue() == "NO" &&			
		 				registry.byId('mencionar74').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Material y Mobiliario: Botiqu\u00EDn de primeros auxilios , En caso negativo, mencionar las medidas acordadas para cubrir la necesidad");
						return false;}
	 			
if	(registry.byId('cmbMatMob75').getValue() == ""){			
					
					utils
							.cstmAlert("3. Actividad: Material y Mobiliario: Bandera, asta bandera, portabandera  , registrar Es suficiente? Si / No");
					return false;}
	 			
	 			if	(registry.byId('cmbMatMob75').getValue() == "NO" &&			
		 				registry.byId('mencionar76').getValue() ==""){
						utils
								.cstmAlert("3. Actividad: Material y Mobiliario: Bandera, asta bandera, portabandera  , En caso negativo, mencionar las medidas acordadas para cubrir la necesidad");
						return false;}
	 			
	 		
//******** Inicia carga actividades tres  
				
				if (hayActividadesTres) {
						actividadesTres = {
						respuesta1		: registry.byId('alimentacion1').getValue(),
						respuesta2		: registry.byId('hospedaje2').getValue(),
						respuesta3		: registry.byId('cabecera3').getValue(),
						respuesta4		: registry.byId('noAsisten4').getValue(),
						respuesta5		: registry.byId('cantidad5').getValue(),
						respuesta6		: registry.byId('sinServicio6').getValue(),
						respuesta7		: registry.byId('otras7').getValue(),
						respuesta8		: registry.byId('incorporacion8').getValue(),
						respuesta9		: registry.byId('cantidad9').getValue(),
						respuesta10		: registry.byId('sinServicio10').getValue(),
						respuesta11		: registry.byId('otras11').getValue(),
						respuesta12 	: registry.byId('incorporacion12').getValue(),
						respuesta13 	: registry.byId('cantidad13').getValue(),
						respuesta14		: registry.byId('sinServicio14').getValue(),
						respuesta15		: registry.byId('otras15').getValue(),
						respuesta16		: registry.byId('incorporacion16').getValue(),
						respuesta17 	: registry.byId('cantidad17').getValue(),
						respuesta18 	: registry.byId('sinServicio18').getValue(),
						respuesta19		: registry.byId('otras19').getValue(),
						respuesta20		: registry.byId('incorporacion20').getValue(),
						respuesta21		: registry.byId('especificar21').getValue(),
						respuesta22		: registry.byId('cNinos22').getValue(),
						respuesta23		: registry.byId('cAdolescentes23').getValue(),
						respuesta24		: registry.byId('beca24').getValue(),
						respuesta25 	: registry.byId('prospera25').getValue(),
						respuesta26 	: registry.byId('especificar26').getValue(),
						respuesta27		: registry.byId('cNinos27').getValue(),
						respuesta28		: registry.byId('cAdolescentes28').getValue(),
						respuesta29		: registry.byId('beca29').getValue(),
						respuesta30		: registry.byId('prospera30').getValue(),
						respuesta31		: registry.byId('especificar31').getValue(),
						respuesta32		: registry.byId('cNinos32').getValue(),
						respuesta33		: registry.byId('cAdolescentes33').getValue(),
						respuesta34		: registry.byId('beca34').getValue(),
						respuesta35		: registry.byId('prospera35').getValue(),
						respuesta36		: registry.byId('alumConDisc36').getValue(),
						respuesta37		: registry.byId('cmbTiposDisc37').getValue(),
						respuesta38		: registry.byId('mobYespacios38').getValue(),
						respuesta39		: registry.byId('apoyos39').getValue(),
						respuesta40		: registry.byId('favorecer40').getValue(),
						respuesta41		: registry.byId('especificar41').getValue(),
						respuesta42		: registry.byId('cNinos42').getValue(),
						respuesta43		: registry.byId('cAdolescentes43').getValue(),
						respuesta44		: registry.byId('cmbBeca44').getValue(),
						respuesta45		: registry.byId('especificar45').getValue(),
						respuesta46		: registry.byId('cNinos46').getValue(),
						respuesta47		: registry.byId('cAdolescentes47').getValue(),
						respuesta48		: registry.byId('cmbBeca48').getValue(),
						respuesta49		: registry.byId('tallaPeso49').getValue(),
						respuesta50		: registry.byId('cmbAlimen50').getValue(),
						respuesta51		: registry.byId('fechaAA51').getValue(),
				  		respuesta52		: registry.byId('cmbAlimen52').getValue(),
						respuesta53		: registry.byId('fechaAA53').getValue(),
						respuesta54		: registry.byId('cmbAlimen54').getValue(),
						respuesta55		: registry.byId('fechaAA55').getValue(),
						respuesta56		: registry.byId('cmbIntApecAA56').getValue(),
						respuesta57		: registry.byId('cantidadReq57').getValue(),
						respuesta58		: registry.byId('cantidadEnt58').getValue(),
						respuesta59		: registry.byId('fechaME59').getValue(),
						respuesta60		: registry.byId('cantidadReq60').getValue(),
						respuesta61		: registry.byId('cantidadEnt61').getValue(),
						respuesta62		: registry.byId('fechaME62').getValue(),
						respuesta63		: registry.byId('cmbMatMob63').getValue(),
						respuesta64		: registry.byId('fechaMM64').getValue(),
						respuesta65		: registry.byId('cmbMatMob65').getValue(),
						respuesta66		: registry.byId('explicar66').getValue(),
						respuesta67		: registry.byId('cmbMatMob67').getValue(),
						respuesta68		: registry.byId('explicar68').getValue(),
						respuesta69		: registry.byId('cmbMatMob69').getValue(),
						respuesta70		: registry.byId('explicar70').getValue(),
						respuesta71		: registry.byId('cmbMatMob71').getValue(),
						respuesta72		: registry.byId('mencionar72').getValue(),
						respuesta73		: registry.byId('cmbMatMob73').getValue(),
						respuesta74		: registry.byId('mencionar74').getValue(),
						respuesta75		: registry.byId('cmbMatMob75').getValue(),
						respuesta76		: registry.byId('mencionar76').getValue(),
						respuesta77		: registry.byId('cmbMatSuf77').getValue(),
						respuesta78		: registry.byId('fechaMS78').getValue(),
						respuesta79		: registry.byId('cmbMatSuf79').getValue(),
						respuesta80		: registry.byId('fechaMS80').getValue(),
						respuesta81		: registry.byId('cmbIntApecMS81').getValue()						
					};
 
					 hayActividadesTres = true;
				}
				
//******** termina carga actividades tres	@	
				
				

// Inicia Validación Actividad 4 
				
// valida que al menos tenga una Mejora de los espacios educativos.
				
				if	(registry.byId('fechaEE1').getValue() == null &&
					 registry.byId('fechaSC3').getValue() == null &&
					 registry.byId('fechaMP5').getValue() == null ){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Espacios educativos: Registrar al menos una acci\u00F3n de limpieza");
					return false;} 		
				
				if	(registry.byId('fechaEE1').getValue() != null &&
						 registry.byId('tareas2').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Espacios educativos: Registrar tareas, procedimientos y recursos que se utilizar\u00E1n.");
						return false;} 	
				
				if	(registry.byId('fechaEE1').getValue() != null &&
						 registry.byId('intApecEE2a').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Espacios educativos: Registrar participantes e integrante de la APEC que realizar\u00E1 el seguimiento.");
						return false;} 
				
				if	(registry.byId('fechaSC3').getValue() != null &&
						 registry.byId('tareas4').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Sanitarios, cisterna, tinaco  o dep\u00E1sito de agua: Registrar tareas, procedimientos y recursos que se utilizar\u00E1n.");
						return false;} 	
				
				if	(registry.byId('fechaSC3').getValue() != null &&
						 registry.byId('intApecSC4a').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Sanitarios, cisterna, tinaco  o dep\u00E1sito de agua: Registrar participantes e integrante de la APEC que realizar\u00E1 el seguimiento.");
						return false;} 
				
				if	(registry.byId('fechaMP5').getValue() != null &&
						 registry.byId('tareas6').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Medidas de protección : Registrar tareas, procedimientos y recursos que se utilizar\u00E1n.");
						return false;} 	
				
				if	(registry.byId('fechaMP5').getValue() != null &&
						 registry.byId('intApecMP7').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Medidas de protecci\u00E1n : Registrar participantes e integrante de la APEC que realizar\u00E1 el seguimiento.");
						return false;} 
				
				
// valida Actividad de mejora
				
				if	(registry.byId('cmbSINO8').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Actividad de mejora: Registrar Si / No, la APEC firma carta compromiso para participar en estrategia Fortalecimiento Comunitario para la Educaci\u00F3n?");
						return false;} 	
				
				
				
				if	(registry.byId('cmbSINO8').getValue() == "SI" &&
						 registry.byId('cmbIntApecAM9').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Actividad de mejora : Registrar participantes e integrante de la APEC que realizar\u00E1 la solicitud.");
						return false;} 
				
// valida Actividad de mantenimiento
				
				
				if	(registry.byId('fechaME10').getValue() == null &&
						 registry.byId('fechaIE13').getValue() == null &&
						 registry.byId('fechaHP16').getValue() == null &&
						 registry.byId('fechaCA19').getValue() == null ){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Actividad de mantenimiento: Registrar al menos una actividad de mantenimiento");
						return false;} 
				
// valida Construcción o rehabilitación 
				
				
				if	(registry.byId('cmbSINO22').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Construcci\u00F3n o rehabilitaci\u00F3n : Registrar Si / No, Se tramitar\u00E1n apoyos econ\u00F3micos o materiales en el municipio o el estado.");
						return false;} 
				
				if	(registry.byId('cmbSINO23').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Construcci\u00F3n o rehabilitaci\u00F3n : Registrar Si / No, La comunidad participa en el programa de la Reforma Educativa ");
					return false;} 
				
				if	(registry.byId('cmbSINO24').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Construcci\u00F3n o rehabilitaci\u00F3n : Registrar Si / No, La comunidad participa en el programa de la Escuelas al CIEN ");
					return false;} 
				
				
				
				if	(registry.byId('cmbSINO25').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Rehabilitaci\u00F3n de espacios educativos  : Registrar Si / No, Se tramitar\u00E1n apoyos econ\u00F3micos o materiales en el municipio o el estado.");
					return false;} 
			
				if	(registry.byId('cmbSINO26').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Rehabilitaci\u00F3n de espacios educativos  : Registrar Si / No, La comunidad participa en el programa de la Reforma Educativa ");
					return false;} 
				
				if	(registry.byId('cmbSINO27').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Rehabilitaci\u00F3n de espacios educativos  : Registrar Si / No, La comunidad participa en el programa de la Escuelas al CIEN ");
					return false;} 
				
				if	(registry.byId('cmbSINO28').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Se cuenta con espacio de juegos infantiles?  : Registrar Si / No");
					return false;} 
				
				if	(registry.byId('cmbSINO29').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Se tramitar\u00E1 apoyo municipal para construirlo? : Registrar Si / No");
					return false;} 
				
// valida Construcción o rehabilitación 
				

				
// Inicia Validación Actividad 5
				
				if	(registry.byId('cmbSINO30').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Asociaci\u00F3n Promotora de Educaci\u00F3n Comunitaria: Registrar Si / No , Se form\u00F3 un Comit\u00E9 de Contralor\u00EDa?");
					return false;} 
				
				if	(registry.byId('cmbSINO30').getValue() == "NO" &&
					 registry.byId('explicar31a').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Asociaci\u00F3n Promotora de Educaci\u00F3n Comunitaria: Se form\u00F3 un Comit\u00E9 de Contralor\u00EDa?: En caso negativo, explicar");
					return false;} 
				
				
				if	(registry.byId('cmbSINO31').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Se registraron nombres de representantes en el Acta Constitutiva APEC: Registrar Si / No");
					return false;} 
				
				if	(registry.byId('cmbSINO32').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Asociaci\u00F3n Promotora de Educaci\u00F3n Comunitaria: Registrar Si / No Se integraron representantes del Programa de Educaci\u00F3n Inicial en APEC?");
					return false;} 
				
				if	(registry.byId('cmbSINO32').getValue() == "NO" &&
					 registry.byId('explicar34').getValue() == ""){			
						
						utils
								.cstmAlert("4. Actividad y 5. Integrante de la APEC: Asociaci\u00F3n Promotora de Educaci\u00F3n Comunitaria: Se integraron representantes del Programa de Educaci\u00F3n Inicial en APEC?: En caso negativo, explicar");
						return false;} 
				
				
				
				
				if	(registry.byId('cmbSINO33').getValue() == ""){			
					
					utils
							.cstmAlert("4. Actividad y 5. Integrante de la APEC: Se registraron nombres de representantes en el Acta Constitutiva APEC: Registrar Si / No");
					return false;} 
				
			
				
				
				
				
				//*** Inicia Actividad 4 y punto 5
			
				if (hayActividadesCuatro) {
						actividadesCuatro = {
						respuesta1		: registry.byId('fechaEE1').getValue(),
						respuesta2		: registry.byId('tareas2').getValue(),
						respuesta2a		: registry.byId('intApecEE2a').getValue(),
						respuesta3		: registry.byId('fechaSC3').getValue(),
						respuesta4		: registry.byId('tareas4').getValue(),
						respuesta4a		: registry.byId('intApecSC4a').getValue(),
						respuesta5		: registry.byId('fechaMP5').getValue(),
						respuesta6		: registry.byId('tareas6').getValue(),
						respuesta7		: registry.byId('intApecMP7').getValue(),
						respuesta8		: registry.byId('cmbSINO8').getValue(),
						respuesta9		: registry.byId('cmbIntApecAM9').getValue(),
						respuesta10		: registry.byId('fechaME10').getValue(),
						respuesta11		: registry.byId('participantesME11').getValue(),
						respuesta12 	: registry.byId('recursosME12').getValue(),
						respuesta13 	: registry.byId('fechaIE13').getValue(),
						respuesta14		: registry.byId('participantesIE14').getValue(),
						respuesta15		: registry.byId('recursosIE15').getValue(),
						respuesta16		: registry.byId('fechaHP16').getValue(),
						respuesta17 	: registry.byId('participantesHP17').getValue(),
						respuesta18 	: registry.byId('recursosHP18').getValue(),
						respuesta19		: registry.byId('fechaCA19').getValue(),
						respuesta20		: registry.byId('participantesCA20').getValue(),
						respuesta21		: registry.byId('recursosCA21').getValue(),
						respuesta22		: registry.byId('cmbSINO22').getValue(),
						respuesta23		: registry.byId('cmbSINO23').getValue(),
						respuesta24		: registry.byId('cmbSINO24').getValue(),
						respuesta25 	: registry.byId('cmbSINO25').getValue(),
						respuesta26 	: registry.byId('cmbSINO26').getValue(),
						respuesta27		: registry.byId('cmbSINO27').getValue(),
						respuesta28		: registry.byId('cmbSINO28').getValue(),
						respuesta29		: registry.byId('cmbSINO29').getValue(),
						respuesta30		: registry.byId('cmbSINO30').getValue(),
						respuesta31		: registry.byId('cmbSINO31').getValue(),
						respuesta32		: registry.byId('cmbSINO32').getValue(),
						respuesta33		: registry.byId('cmbSINO33').getValue(),
						respuesta34		: registry.byId('explicar34').getValue(),
						respuesta31a		: registry.byId('explicar31a').getValue()
					};
 
					 hayActividadesCuatro = true;
				}
				
	
				
				
//*** termina Actividad 4 y punto 5
				
				
				
				
				
				
				
				
				var integrantesR1 = new Array();
				integrantesR1 = utils.integrantesAsistieron(primeraReunionObj.integrantesR1?primeraReunionObj.integrantesR1:[],constants.PRIMERA_REUNION);				
				if(integrantesR1.length==0){
					return false;
				}
				
				var instructoresR1 = new Array();
				instructoresR1 = utils.instructoresAsistieron(primeraReunionObj.instructoresR1?primeraReunionObj.instructoresR1:[],constants.PRIMERA_REUNION,'gridInstructores'+constants.PRIMERA_REUNION);
				if(instructoresR1.length==0){
					return false;
				}

				var primeraReunion = {
					apec					: apec,
					reunion					: apecReunion,
				  	apoyosConafe			: apoyosConafe,
				  	apoyosFederales 		: apoyosFederales,	
				 	apoyosEstatales 		: apoyosEstatales,	
					diagnostico				: diagnosticoCom,
					necesidadesEspeciales 	: necEsp,
					pobIndigena 			: pobIndigena,
					bullying				: bullying,
					planTrabajo 			: planTrabajo,
					opiniones 				: opiniones,
					denuncias				: denuncias,
					numeroAlumnos 			: numeroAlumnos,
					dificultades 			: dificultades,
					necesidades 			: necesidades,
					actividadesUno 			: actividadesUno,
					actividadesTres			: actividadesTres,
					actividadesCuatro		: actividadesCuatro,
					integrantesR1 			: integrantesR1,
					instructoresR1 			: instructoresR1
				};
				
				console.log(json.toJson(primeraReunion));
				//console.log(json.toJson(primeraReunion.Bullying));
				//return false;
				
			var urlJson = dojo.config.app.urlBase + 'primeraReunion/save';

				xhr.post(
								{
									url : urlJson,
									postData : json.toJson(primeraReunion),
									headers : {
										"Content-Type" : "application/json; charset=UTF-8"
									},
									handleAs : 'json',
									handle : function(response) {
										if (response == 'SyntaxError: syntax error') {
											window.location.reload();
										} else if (response != 1) {
											utils
													.cstmAlert('Ocurri\u00F3 un error al registrar la informaci\u00F3n de su reuni\u00F3n para la elaboraci\u00F3n del diagn\u00F3stico.');
											standby.hide();
										} else {
											utils
													//.cstmAlert('La informaci\u00F3n de su reuni\u00F3n para la elaboraci\u00F3n del diagn\u00F3stico se registr\u00F3 correctamente.');
											.cstmAlert('La informaci\u00F3n de la minuta de asamblea para elaborar el plan de trabajo, se registr\u00F3 correctamente.');
											reuniones
													.refresh(
															primeraReunionObj.apec.idEntidadfed,
															primeraReunionObj.apec.idMunicipio,
															primeraReunionObj.apec.idLocalidad,
															storeCcts);
											standby.hide();
										}

										registry.byId('dialogCaptiraDGConafe')
												.destroyRecursive(false);

									}
								}).progress(standby.show());

			}

			return {
				init : init,
				savePrimeraReunion : savePrimeraReunion
			};
		}); 
