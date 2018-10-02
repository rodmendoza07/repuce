define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojo/_base/json","dijit/form/Button","dijit/Dialog","dijit/form/FilteringSelect",
         "app/util/constants","dojo/_base/xhr","dijit/form/ValidationTextBox","dojo/store/Memory",
         "dojox/widget/Standby","dojo/dom","app/conafe1415/reuniones_conafe"],
         
	function(ContentPane,registry,array,utils,json,Button,Dialog,FilteringSelect,
			 constants,xhr,ValidationTextBox,Memory,Standby,dom,reuniones){

		var segundaReunionObj = new Object();
		
		var FederalesStore = {};
		var EstatalStore = {};
		var BullyingTipoStore ={};
		var NeeStore ={};
		var necesidadesStore ={};

		
		var apoyosPlanTrabajo = {};
		var idReunion = null;

		function init(actividades,cApec,ReunionObj, storeCcts){
			segundaReunionObj = !ReunionObj?{}:ReunionObj;
			idReunion = !ReunionObj.reunion?constants.SEGUNDA_REUNION:segundaReunionObj.reunion.cReunion;
			
			var idtpoAccion =constants.APOYO_FEDERAL;
			var idtpoEstatal=constants.APOYO_ESTATAL;

			
			_apoyos(array.indexOf(actividades,7)!=-1);
			_planDTrabajo(array.indexOf(actividades,8)!=-1);
			_inclusionSocial(array.indexOf(actividades,11)!=-1);
			
			utils.asistenciaReunion(idReunion,'Integrantes',segundaReunionObj.integrantesR2,storeCcts);
			utils.asistenciaReunion(idReunion,'Instructores',segundaReunionObj.instructoresR2,storeCcts);
			
			//Busca tipos de acciones, que vendrían siendo 
			//los apoyos del plan de trabajo.
			
			
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listTipoAcciones/',
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
		//		url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo/'+ idtpoAccion+'/'+idReunion,
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
			//	url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo/'+ idtpoEstatal+'/'+idReunion,
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
			
		}
		
		function _apoyos(crearApoyos){
			//La función dependiendo del tipo de apoyo que existe, extrae la información 
			//del objeto y la manda a _crearListaApoyos en donde se mostrara en tablas.
			var listPanelesAPoyo= new Array({title:"Apoyos federales",  tpoList:2,id:"apoyoF"},
											{title:"Apoyos est. o mun.",tpoList:3,id:"apoyoEM"});
			for(var i in listPanelesAPoyo){
				if(crearApoyos){
					if(!registry.byId(listPanelesAPoyo[i].id)){
						var objSelect = null;
						if(listPanelesAPoyo[i].id=="apoyoF"){
							objSelect = segundaReunionObj.apoyosFederales?segundaReunionObj.apoyosFederales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoEM"){
							objSelect = segundaReunionObj.apoyosEstatales?segundaReunionObj.apoyosEstatales:[];
						}
						_crearListaApoyos(listPanelesAPoyo[i],objSelect);
						utils.pestaniaSelect(listPanelesAPoyo[0].id);
					}
				}else{
					utils.cerrarPestania(listPanelesAPoyo[i].id);
				}
			}
		}
		

		

		function _planDTrabajo(crearPlan){
			var id="plnTrabajo";
			var idPlanTrabajo=5;
			var idPanelSecundario = "planTrabajoPane";
			var accionesEncontradas=new Array();
			var planTrabajoObj=segundaReunionObj.planTrabajo?segundaReunionObj.planTrabajo:[];
			var layoutPlnTrabajo = [[{name:'columna1',field:'id',hidden:true},
			                         {name:'columna2',field:'cApoyo',hidden:true},
			                         {name:'Apoyo', width:'580px',styles:'text-align: left;',field:'apoyoRecibido'},
			                         {name:'Cumplimiento', width:'300px',styles:'text-align: left;',field:'accion'},
			                         {name:'idAccion',field:'idAccion',hidden:true},
			                         {name:'Reunion',field:'reunion',hidden:true},
			                         {name:'tipoRespuesta',field:'tipoRespuesta',hidden:true},
			                         {name:'idRespuesta',field:'idRespuesta',hidden:true},
			                         {name:'Otros',field:'otros',hidden:true}]];
			if(crearPlan){
				if(!registry.byId(id)){
					for(var i in planTrabajoObj){
						var accion = {
							    id:i,
							    cApoyo : planTrabajoObj[i].accion.cTipoAccion,		
							    apoyoRecibido : !planTrabajoObj[i].nomOtra?planTrabajoObj[i].accion.descripCortar2:planTrabajoObj[i].accion.brigadaEsp? planTrabajoObj[i].accion.descripCortar2 +" Especifique cu\u00E1l: "+ planTrabajoObj[i].nomOtra:planTrabajoObj[i].accion.descripCortar2 +": "+ planTrabajoObj[i].nomOtra,
							    accion : !planTrabajoObj[i].numVecesr2?planTrabajoObj[i].respuestaR2:planTrabajoObj[i].numVecesr2,
							    idAccion : planTrabajoObj[i].cAccion,
							    reunion : planTrabajoObj[i].cReunion,
							    tipoRespuesta : planTrabajoObj[i].accion.cTipoRespuesta,
							    idRespuesta : planTrabajoObj[i].cRespuestar2,
							    otros : planTrabajoObj[i].nomOtra
							};
						accionesEncontradas.push(accion);
					}
						
					utils.crearPanel(id,"Plan de trabajo",idPanelSecundario);
					//Crear tabla con la formación de BD.
					utils.crearGrid(idPanelSecundario,layoutPlnTrabajo,'idAccion',accionesEncontradas,'gridApoyo'+idPlanTrabajo);
					//Sección para los botones.
					_agregarFilaGrid(idPlanTrabajo,idPanelSecundario);
					
					utils.createTag('input','edit'+id,idPanelSecundario);
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId('gridApoyo'+idPlanTrabajo);
							var items = grid.selection.getSelected();
							if(items.length==1){
								dojo.forEach(items, function(selectedItem){
									if(selectedItem !== null){
										var itemToEdit={
											//Crea un arreglo con toda la información del elemento seleccionado
											//en el grid para poder editar la información.
											cApoyo : grid.store.getValue(selectedItem,'cApoyo'),
											apoyoRecibido : grid.store.getValue(selectedItem,'apoyoRecibido'),
											accion : grid.store.getValue(selectedItem,'accion'),
											idAccion : grid.store.getValue(selectedItem,'idAccion'),
											reunion : grid.store.getValue(selectedItem,'reunion'),
											tipoRespuesta : grid.store.getValue(selectedItem,'tipoRespuesta'),
											idRespuesta : grid.store.getValue(selectedItem,'idRespuesta'),
											otros : grid.store.getValue(selectedItem,'otros')
										};
										_popupApoyos(idPlanTrabajo,itemToEdit);
									}
								}); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'edit'+id);
					
					utils.eliminarFilaGrid('gridApoyo'+idPlanTrabajo,idPanelSecundario,constants.SEGUNDA_REUNION,true);
					utils.pestaniaSelect(id);
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
							objSelect =segundaReunionObj.inclusion?segundaReunionObj.inclusion:[];						
							Panel ='inclusionPane';
						}else if(listPanelesNP[i].id=="bullying"){
							objSelect = segundaReunionObj.bullying?segundaReunionObj.bullying:[];
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
		
		function _crearListaApoyos(pestaniaDestino,listApoyos){	
			if(pestaniaDestino.tpoList==2){
				var idGrid = "gridFederal";
				var listApoyosF = segundaReunionObj.apoyosFederales?segundaReunionObj.apoyosFederales:[];	
				var apoyosFederales=new Array();
				var idPanelSecundario = "ApoyoPane";
			    var layoutApoyo = [[{name:'columna1',field:'id',hidden:true},
				                        {name:'cApoyo',field:'cApoyo',hidden:true},
				                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
				                        {name:'\u00BFCu\u00e1l?',field:'cual',width:'272px',styles:'text-align: left;'},
				  //                    {name:'idfconcreto', field:'idfconcreto',hidden:true},
				  //                    {name:'Se concret\u00f3',field:'fconcreto',width:'80px',styles:'text-align: center;'},
				                        {name:'Se concret\u00f3',field:'gestion',width:'80px',styles:'text-align: center;'},
				                        {name:'Cantidad',field:'cantidad',width:'80px',styles:'text-align: center;'},
				                        {name:'N\u00famero de beneficiarios',field:'beneficiarios',width:'80px',styles:'text-align: center;'},
				                        {name:'idfproceso',field:'idfproceso',hidden:true}]];
				  // vblake             {name:'En proceso',width:'272px',styles:'text-align: left;',field:'fproceso'}]];
			    
				utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
				
				dom.byId('ApoyoPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
					'<td width= "450px"><span class="sub" align="left">De los apoyos que se programaron gestionar, a la fecha se han concretado los siguientes programas federales:  </span></td>'+
				'<tr>'+
					'<td id="gridAf" align="center"></td>'+
				'</tr>'+
				'<tr>'+
					'<td><div id="buttonAf" align="center"></td>'+
				'</tr>'+
			    '</table>';
				
				
			    for(var i in listApoyosF){
					var apoyo = {
					    id:i,
					    cApoyo : listApoyosF[i].cApoyo,
					    apoyo:listApoyosF[i].nombre,
					    cual:listApoyosF[i].otro,
					    gestion : listApoyosF[i].gestion,
				//	    idfconcreto:listApoyosF[i].beneficiariosr1,
				//	    fconcreto:listApoyosF[i].beneficiariosr1==1?"Si":listApoyosF[i].beneficiariosr1==2?"No":"",
					    cantidad : listApoyosF[i].cantidad,
					    beneficiarios : listApoyosF[i].numBenef
				//	    idfproceso : listApoyosF[i].beneficiariosr2,
				//	    fproceso:listApoyosF[i].beneficiariosr2==1?"Si":listApoyosF[i].beneficiariosr2==2?"No":"",
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
				           				    gestion:grid.store.getValue(selectedItem,'gestion'),
				           			//	    idfconcreto:grid.store.getValue(selectedItem,'idfconcreto'),
				           			//	    fconcreto :grid.store.getValue(selectedItem,'fconcreto'),
				           				    cantidad :grid.store.getValue(selectedItem,'cantidad'),
				           				    beneficiarios :grid.store.getValue(selectedItem,'beneficiarios'),
				           			//	    idfproceso:grid.store.getValue(selectedItem,'idfproceso'),
				           			//	    fproceso: grid.store.getValue(selectedItem,'fproceso'),
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
			var listApoyosE = segundaReunionObj.apoyosEstatales?segundaReunionObj.apoyosEstatales:[];
			var apoyosEstatales=new Array();
			var idPanelSecundario = "apoyosEstatales";
			
			
		    var layoutApoyoE = [[{name:'columna1',field:'id',hidden:true},
			                        {name:'cApoyo',field:'cApoyo',hidden:true},
			                        {name:'Apoyo',width:'200px',styles:'text-align: left;',field:'apoyo'},
			                        {name:'Especifique',field:'especifique',width:'200px',styles:'text-align: center;'},
			                        {name:'Se concret\u00f3',field:'gestion',width:'80px',styles:'text-align: center;'},
			                        {name:'Describir los apoyos',field:'describir',width:'250px',styles:'text-align: center;'},
			                        {name:'N\u00famero de beneficiarios',field:'beneficiarios',width:'80px',styles:'text-align: center;'}]];
			          //              {name:'ideconcreto',field:'ideconcreto',hidden:true},
			          //              {name:'Se concreto',width:'272px',styles:'text-align: left;',field:'econcreto'},
			          //              {name:'ideproceso',field:'ideproceso',hidden:true},
			          //              {name:'En proceso',width:'272px',styles:'text-align: left;',field:'eproceso'}]];
		    

			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
			
			dom.byId('apoyosEstatales').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
			'<tr>'+
				'<td width= "450px"><span class="sub" align="left">De los apoyos que se programaron gestionar, a la fecha, se han concretado los siguientes apoyos estatales o municipales: </span></td>'+
			'<tr>'+
				'<td id="gridAe" align="center"></td>'+
			'</tr>'+
			'<tr>'+
				'<td><div id="buttonAe" align="center"></td>'+
			'</tr>'+
		    '</table>';
			
		    for(var i in listApoyosE){
				var apoyoE = {
				    id:i,
				    cApoyo : listApoyosE[i].cApoyo,
				    apoyo:listApoyosE[i].nombre,
				    especifique : listApoyosE[i].otro,
				    gestion : listApoyosE[i].gestion,
				    describir : listApoyosE[i].descripApoyo,
				    beneficiarios : listApoyosE[i].numBenef,
				    
			//	    ideconcreto: listApoyosE[i].beneficiariosr1,
			//	    econcreto:listApoyosE[i].beneficiariosr1==1?"Si":listApoyosE[i].beneficiariosr1==2?"No":"",
			//	    ideproceso: listApoyosE[i].montor2,
			//	    eproceso:listApoyosE[i].montor2==1?"Si":listApoyosE[i].montor2==2?"No":"",
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
			           				    gestion :grid.store.getValue(selectedItem,'gestion'),
			           				    describir :grid.store.getValue(selectedItem,'describir'),
			           				    beneficiarios :grid.store.getValue(selectedItem,'beneficiarios')
			           			//	    ideconcreto:grid.store.getValue(selectedItem,'ideconcreto'),
			           			//	    econcreto:grid.store.getValue(selectedItem,'econcreto'),
			           			//	    ideproceso:grid.store.getValue(selectedItem,'ideproceso'),
			           			//	    eproceso:grid.store.getValue(selectedItem,'eproceso')
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
			var situacionBullying=new Array();
			var idGrid = "gridBullying";
			//Crea la pestaña y el primer bloque.
			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,PanelPN); 
			if(pestaniaDestino.id =="bullying"){

				objSelect = segundaReunionObj.acoso?segundaReunionObj.acoso:[];
				var bullying=new Array();
				dom.byId('bullyingPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
				'<tr>'+
				'<td width= "900px"><span class="sub" align="left">Atenci\u00f3n de casos de acoso escolar (bullying) presentados en la escuela:</span></td>'+
	//			'<td width= "450px"><span class="sub" align="right">Nuevos casos de acoso escolar(bullying) presentado en la escuela</span></td>'+
			'<tr>'+
				
				'<td id="gridB" align="center"></td>'+
	//			'<td id="gridBl" align="center"></td>'+
			'</tr>'+
			'<tr>'+
				'<td><div id="buttonR" align="center"></td>'+
				'<td><div id="buttonB" align="center"></td>'+
			'</tr>'+
		  '</table>';
				'</tr>'+
			  '</table>';
	/*			var layoutBullying = [[{name:'columna1',field:'id',hidden:true},
				                       	{name:'idTpoBullying',field:'idTpoBullying',hidden:true},
				                       	{name:'nomTipoBullying',field:'nomTipoBullying',hidden:true},
				                        {name:'idBullying',field:'idBullying',hidden:true},
				                        {name:'Nombre',width:'272px',styles:'text-align: left;',field:'nombre'},
				                        {name:'N\u00famero de casos',field:'cuantos',width:'80px',styles:'text-align: center;'},
				                        {name:'Acci\u00f3n o apoyo',width:'272px',styles:'text-align: left;',field:'numveces'}]];
	*/			
				var layoutBullyingNew = [[{name:'columna1',field:'id',hidden:true},
				                       	{name:'idTpoBullying',field:'idTpoBullying',hidden:true},
				                       	{name:'nomTipoBullying',field:'nomTipoBullying',hidden:true},
				                        {name:'idBullying',field:'idBullying',hidden:true},
				                        {name:'Nombre',width:'250px',styles:'text-align: left;',field:'nombre'},
				                        {name:'Acci\u00f3n que se program\u00f3 emprender o apoyos a gestionar',width:'250px',styles:'text-align: center;',field:'numveces'},
				                        {name:'Se concret\u00f3',field:'bconcreto',width:'80px',styles:'text-align: center;'},
				                        {name:'En qu\u00e9 consiste la acci\u00f3n o el apoyo',field:'consiste',width:'240px',styles:'text-align: center;'},]];
				
	/*			for(var j in objSelect){
					var Bullying = {
					    id:j,
					    idTpoBullying:objSelect[j].cCoTipoBullying,
					    nomTipoBullying:objSelect[j].nomTipoBullying,
					    idBullying:objSelect[j].cCoBullying,
					    nombre:objSelect[j].descripCortar1,
					    cuantos:objSelect[j].cuantos,
					    numveces:objSelect[j].numvecesr1,
					    
					};
					situacionBullying.push(Bullying);
				}
	*/			
		//		utils.crearGrid('gridBl',layoutBullying,'idBullying',situacionBullying,idGrid);
				//Sección para los botones.
		/*		_agregarFilaGrid('Bullying','buttonB');
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
		*/		// nueva
				
				
				objSelect = segundaReunionObj.bullying?segundaReunionObj.bullying:[];
				for(var j in objSelect){
					var nuevosBullying = {
					    id:j,
					    idTpoBullying:objSelect[j].cCoTipoBullying,
					    nomTipoBullying:objSelect[j].nomTipoBullying,
					    idBullying:objSelect[j].cCoBullying,
					    nombre:objSelect[j].descripCortar1,
					    numveces:objSelect[j].numvecesr1,
					    bconcreto:objSelect[j].bconcreto,
					    consiste:objSelect[j].consiste,
				//	    bproceso:objSelect[j].bproceso,
					};
					bullying.push(nuevosBullying);
				}  
				
				utils.crearGrid('gridB',layoutBullyingNew,'idBullying',bullying,'gridBullyingN');
			
			/// revisarl	
				
				//Sección para los botones.
				_agregarFilaGrid('BullyingN','buttonR');
				utils.createTag('input','editBullyingN','buttonR');
				new Button({
					label:'Editar',
					onClick:function(){
						var grid = registry.byId('gridBullyingN');
						var items = grid.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){	
				                	var itemToEdit={
				                			idTpoBullying:grid.store.getValue(selectedItem,'idTpoBullying'),
				                			nomTipoBullying:grid.store.getValue(selectedItem,'nomTipoBullying'),
				                			idBullying : grid.store.getValue(selectedItem,'idBullying'),
				                			nombre : grid.store.getValue(selectedItem,'nombre'),
				                			numveces : grid.store.getValue(selectedItem,'numveces'),
				                			bconcreto : grid.store.getValue(selectedItem,'bconcreto'),
				                			consiste: grid.store.getValue(selectedItem,'consiste')
									    };
				                	_popupBullyingN(itemToEdit);
				                 }
				             }); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
				},'editBullyingN');
				utils.eliminarFilaGrid('gridBullyingN','buttonR',0,false);
				////Revisar
			}
			if(pestaniaDestino.id=="inclS"){
				var necesidadesObj=segundaReunionObj.necesidadesEspeciales?segundaReunionObj.necesidadesEspeciales:[];
				var necesidades=new Array();
				var layoutNecesidad = [[{name:'id',field:'id',hidden:true},
					                        {name:'cApoyo',field:'cApoyo',hidden:true},
					                        {name:'Necesidad',width:'215px',styles:'text-align: left;',field:'necesidad'},
					                        {name:'idTipoNecesidad',field:'cNee',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee',hidden:true},
					                        {name:'Apoyos que se program\u00f3 gestionar',field:'gestion',width:'215px',styles:'text-align: left;'},
					                        {name:'Se concret\u00f3',width:'80px',styles:'text-align: center;',field:'concreto'},
					                        {name:'En qu\u00e9 consiste el apoyo',field:'consiste', width:'215px',styles:'text-align: left;'},
					                        {name:'Ni\u00f1os beneficiados',field:'cuantos',width:'80px',styles:'text-align: center;'},
					                        {name:'idTipoNecesidad',field:'cNee1',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee1',hidden:true},
					                        {name:'Apoyos que se program\u00f3 gestionar',field:'gestion1',width:'215px',styles:'text-align: left;'},
					                        {name:'Se concret\u00f3',width:'80px',styles:'text-align: center;',field:'concreto1'},
											{name:'En qu\u00e9 consiste el apoyo',field:'consiste',width:'215px',styles:'text-align: left;'},
							                {name:'Ni\u00f1os beneficiados',field:'cuantos1',width:'80px',styles:'text-align: center;'}]];
				

				dom.byId('inclusionPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
										'<tr>'+
											'<td width= "450px"><span class="sub" align="left">De los apoyos que se programaron gestionar en favor de la inclusi\u00f3n social, se han logrado a la fecha:</span></td>'+
											//'<td width= "450px"><span class="sub" align="left">Poblaci\u00F3n ind\u00EDgena</span></td>'+
										'<tr>'+
											'<td id="gridISL" align="center"></td>'+
											//'<td id="gridBN" align="center"></td>'+
										'</tr>'+
										'<tr>'+
											'<td><div id="buttonsL" align="center"></td>'+
											//'<td><div id="buttonsR" align="center"></td>'+
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
						    gestion:necesidadesObj[i].gestionar, 
						    concreto:necesidadesObj[i].concreto,
						    consiste:necesidadesObj[i].consiste,
						    cuantos:necesidadesObj[i].cuantos,
						    cNee1:necesidadesObj[i].cNee1,
						    nomNee1:necesidadesObj[i].nomNee1,
						    concreto1:necesidadesObj[i].concreto1,
						    gestion1:necesidadesObj[i].gestionar1,
						    consiste1:necesidadesObj[i].consiste1,
						    cuantos1:necesidadesObj[i].cuantos1,
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
					                			cNee: grid.store.getValue(selectedItem,'cNee'),
					                			nomNee: grid.store.getValue(selectedItem,'nomNee'),
					                			gestion: grid.store. getValue(selectedItem,'gestion'),
					                			concreto: grid.store.getValue(selectedItem,'concreto'),
					                			consiste: grid.store.getValue(selectedItem,'consiste'),
					                			cuantos: grid.store.getValue(selectedItem,'cuantos'),
					                   			cNee1: grid.store.getValue(selectedItem,'cNee1'),
					                			nomNee1: grid.store.getValue(selectedItem,'nomNee1'),
					                			concreto1: grid.store.getValue(selectedItem,'concreto1'),
					                   			gestion1: grid.store. getValue(selectedItem,'gestion1'),
					                			consiste1: grid.store. getValue(selectedItem,'consiste1'),
					                			cuantos1: grid.store. getValue(selectedItem,'cuantos1'),
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
				
			}
		}


		function _popupApoyos(tpoApoyo,itemToEdit){
			var idVentana = 'popup_SegundaReunion';
			var tituloVentana = "Plan de trabajo";
			var noAPlica = "N/A";
			var esPlanTrabajo = false;
			var exitenBrigadas = false;
			var edit = false;
			
			//Titulo de la ventana
			
				esPlanTrabajo = true;
		
			//Creamos la tabla con los elementos que tendrá el Pop UP.
			var tablaHTML = '<table border="0">'+
								'<tr>'+
									'<td align="right"><label>* Apoyo: </label></td>'+
									'<td><input id="cmbApoyo"/></td>'+
								'</tr>'+
			
								'<tr>'+
									'<td align="right"><label>* Actividad: </label></td>'+
									'<td><input id="cmbAccion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<tr id="visible1" style="display:none">'+
									'<td ><label>* Respuesta: </label></td>'+
									'<td><input id="cmbNumVeces"/></td>'+
								'</tr>'+
									'<tr id="visible2" style="display:none">'+
									'<td ><label>* Respuesta: </label></td>'+
									'<td><input id="cmbNumVeces1"/></td>'+
								'</tr>'+
	    /*								'<td align="right"><div id="divLBLResMultiple"><label>* Respuesta: </label></div></td>'+
											'<td><div id="divInputResMultiple"><input id="cmbResMultiple"/></div></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><div id="divLBLResSimple" style="display:none;"><label>* Respuesta: </label></div></td>'+
											'<td><div id="divInputResSimple" style="display:none;"><input id="txtResSimple"/></div></td>'+
										'</tr>'+
		*/	
								'<tr>'+
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
	
				
			var cmbNumVeces = new FilteringSelect({
				//readOnly : edit,
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.numVeces,
		      //  required : true	sirve para que sea obligatorio de captura el campo
		     
		    },"cmbNumVeces");	
			
			
			var stateStore1 = new Memory({
		        data: [
		            {name:"[Seleccione]",id:"-1"}, 
		            {name:"Nunca", id:"Nunca"},
		            {name:"Algunas veces", id:"Algunas veces"},
		            {name:"La mayor\u00eda de las veces", id:"La mayor\u00eda de las veces"},
		            {name:"Siempre", id:"Siempre"}
		        ]
		    });
			
			var cmbNumVeces1 = new FilteringSelect({
				//readOnly : edit,
		        searchAttr : "name",
		        store:stateStore1,  
		        value: itemToEdit.numVeces,
		      //  required : true  sirve para que sea obligatorio de captura el campo
		     
		    },"cmbNumVeces1");
				
			
			
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
			
			registry.byId('cmbApoyo').set('store',apoyosPlanTrabajo);
			
			
			cmbApoyo.set('onChange',function(){
	        	
	        		utils.findAccionesXTipo(cmbApoyo.item.id,itemToEdit.idAccion,'cmbAccion',idReunion);
	        	
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
							
							gridGenerico.update();
						}else{
							try {
								var myNewItem = null;
								
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



		function _popupFederal(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					cApoyo: -1,
					apoyo:'',
					cual:'',
					gestion:'',
			//		idfconcreto:-1,
			//		fconcreto:'',
					cantidad : '',
					beneficiarios : '',
			//		idfconcreto:'',
			//		fproceso : -1,
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
									'<td align="right"><label>* Se concret\u00f3: </label></td>'+
									'<td><input id="cmbSeConcreto"/></td>'+
								'</tr>'+
								'<tr>'+
								'<td align="right"><label>* Cantidad: </label></td>'+
								'<td><input id="txtCantidad"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de beneficiarios: </label></td>'+
									'<td><input id="txtBeneficiarios"/></td>'+
								'</tr>'+
							/*	'<tr>'+
									'<td align="right"><label>* En proceso: </label></td>'+
									'<td><input id="cmbFproceso"/></td>'+
								'</tr>'+  */
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
		            {name:"Si", id:"1"},
		            {name:"No", id:"2"}
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
			if(itemToEdit.cApoyo=="21") {
        		dom.byId('lblCual').innerHTML='<label>* \u00BFCu\u00e1l?: </label>';
        		document.getElementById('lblCual').style.display='block';
				document.getElementById('divCual').style.display='block';
	    	}else{
				document.getElementById('lblCual').style.display='none';
				document.getElementById('divCual').style.display='none';
	    	}
		    }
			var txtCual = new ValidationTextBox({
				readOnly : edit,
				id :'txtCual',
				value : itemToEdit.cual,
				maxLength : "150",
				placeHolder : "Nota: especifique otro tipo de apoyo Federal.",
	            style : "width:500px;"
			},'txtCual');
			
			//vblake
			
			var txtCantidad = new ValidationTextBox({
				value: itemToEdit.cantidad,
				require:true,
				maxlength:"7",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtCantidad');
			
			
			
			//vblake
			var stateStore1 = new Memory({
		        data: [
		            {name:"Si", id:"Si"},
		            {name:"No", id:"No"},
		            {name:"En proceso", id:"En proceso"}
		            
		        ]
		    });
			
			var cmbSeConcreto = new FilteringSelect({
				//readOnly : edit,
		        searchAttr : "name",
		        store:stateStore1,
		        value: itemToEdit.gestion,
		        required : true
		     
		    },"cmbSeConcreto");
			
					
			var cmbFconcreto = new FilteringSelect({
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.idfconcreto,
		        required : true
		     
		    },"cmbFconcreto");			
			
			var txtBeneficiarios = new ValidationTextBox({
				value: itemToEdit.beneficiarios,
				require:true,
				maxlength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtBeneficiarios');
			

			
			var cmbFproceso = new FilteringSelect({
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.idfproceso,
		        required : true
		     
		    },"cmbFproceso");

			registry.byId('cmbApoyosf').set('value',itemToEdit.cApoyo);
			if(!edit){registry.byId('cmbApoyosf').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyosf').get('value')==-1    || 
											registry.byId('cmbSeConcreto').get('value')==-1 ||
											registry.byId('txtCantidad').get('value')==""   ||
											registry.byId('txtBeneficiarios').get('value')==""){  
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
								gridFederal.store.setValue(item, 'gestion',cmbSeConcreto.get('displayedValue'));
						//		gridFederal.store.setValue(item,'idfconcreto',cmbFconcreto.get('value'));
						//		gridFederal.store.setValue(item, 'fconcreto',cmbFconcreto.get('displayedValue'));
								gridFederal.store.setValue(item, 'cantidad',txtCantidad.get('value'));
								gridFederal.store.setValue(item, 'beneficiarios',txtBeneficiarios.get('value'));
						//		gridFederal.store.setValue(item, 'idfproceso',cmbFproceso.get('value'));
						//		gridFederal.store.setValue(item, 'fproceso',cmbFproceso.get('displayedValue'));
								gridFederal.update();
							}
							else{
								var myNewItem = {
									id : gridFederal.rowCount + 1,
									cApoyo : cmbApoyosf.get('value'),
									apoyo : cmbApoyosf.get('displayedValue'),
									cual : txtCual.get('value'),
									gestion : cmbSeConcreto.get('displayedValue'),
						//			idfconcreto:cmbFconcreto.get('value'),
						//			fconcreto:cmbFconcreto.get('displayedValue'),
									cantidad: txtCantidad.get('value'),
									beneficiarios: txtBeneficiarios.get('value'),
						//			idfproceso : cmbFproceso.get('value'),
						//			fproceso : cmbFproceso.get('displayedValue'),
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
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					cApoyo: -1,
					apoyo:'',
					especifique : '',
 					gestion : '',
					describir : '',
					beneficiarios : ''
				//	ideconcreto:-1,
				//	econcreto : '',
 				//	ideproceso:-1,
				//	eproceso:''
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
									'<td align="right"><label>* Se concret\u00f3: </label></td>'+
									'<td><input id="cmbSeConcreto"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Describir los apoyos: </label></td>'+
									'<td><input id= "txtDescribir"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de beneficiarios: </label></td>'+
									'<td><input id= "txtBeneficiarios"/></td>'+
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
		            {name:"Si", id:"1"},
		            {name:"No", id:"2"}
		        ]
		    });
			
			
			var cmbApoyosE = new FilteringSelect({
				readOnly : edit,
				store: EstatalStore,
				value: itemToEdit.cApoyo,
	            searchAttr: "name",
	            onChange: function(){
	            	if(cmbApoyosE.item.name== "Otros (especifique)" ){
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
				readOnly : edit,
				id : 'txtOtraAccion',
				value : itemToEdit.especifique,
				maxLength : "150",
				placeHolder : "Nota: especifique otro tipo de apoyo estatal.",
	            style : "width:500px;"
			},'txtOtraAccion');
			
			var cmbEconcreto = new FilteringSelect({
				
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.ideconcreto,
		        required : true
		     
		    },"cmbEconcreto");
			
			
			var cmbEproceso = new FilteringSelect({
				
		        searchAttr : "name",
		        store:stateStore,
		        value: itemToEdit.ideproceso,
		        required : true
		     
		    },"cmbEproceso");
			
			var txtBeneficiarios = new ValidationTextBox({
				value: itemToEdit.beneficiarios,
				require:true,
				maxlength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtBeneficiarios');
			
			var txtDescribir = new ValidationTextBox({
				value: itemToEdit.describir,
				require:true,
				maxlength:"250",
			//	regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtDescribir');
			 
			var stateStore1 = new Memory({
		        data: [
		            {name:"Si", id:"Si"},
		            {name:"No", id:"No"},
		            {name:"En proceso", id:"En proceso"}
		            
		        ]
		    });
			
			var cmbSeConcreto = new FilteringSelect({
				//readOnly : edit,
		        searchAttr : "name",
		        store:stateStore1,
		        value: itemToEdit.gestion,
		        required : true
		     
		    },"cmbSeConcreto");	
			
			registry.byId('cmbApoyosE').set('value',itemToEdit.cApoyo);
			if(!edit){registry.byId('cmbApoyosE').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
 					if (!form.validate() || registry.byId('cmbApoyosE').get('value')==-1    ||
											registry.byId('cmbSeConcreto').get('value')==-1 ||
											registry.byId('txtDescribir').get('value')==""  ||
											registry.byId('txtBeneficiarios').get('value')==""){  
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridEstatal = registry.byId('gridEstatal');
					try{
						try {
							if(edit){		
								var index = gridEstatal.selection.selectedIndex;
								var item = gridEstatal.getItem(index);
								gridEstatal.store.setValue(item, 'apoyo',cmbApoyosE.get('displayedValue'));
								gridEstatal.store.setValue(item, 'especifique',txtOtraAccion.get('value'));
								gridEstatal.store.setValue(item, 'gestion',cmbSeConcreto.get('displayedValue'));
								gridEstatal.store.setValue(item, 'describir',txtDescribir.get('value'));
								gridEstatal.store.setValue(item, 'beneficiarios',txtBeneficiarios.get('value'));
								gridEstatal.update();
							}
							else{
								var myNewItem = {
									id : gridEstatal.rowCount + 1,
									cApoyo : cmbApoyosE.get('value'),
									apoyo : cmbApoyosE.get('displayedValue'),
									especifique: txtOtraAccion.get('value'),
									gestion : cmbSeConcreto.get('displayedValue'),
									describir: txtDescribir.get('value'),
									beneficiarios: txtBeneficiarios.get('value')									
							//		ideconcreto:cmbEconcreto.get('value'),
							//		econcreto:cmbEconcreto.get('displayedValue'),
							//		ideproceso:cmbEproceso.get('value'),
							//		eproceso:cmbEproceso.get('displayedValue')
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
									'<td align="right"><label>* Acci\u00f3n o apoyo: </label></td>'+
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
				placeHolder : "Nota: agregar las acciones o apoyos a emprender.",
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


		function _popupBullyingN(itemToEdit){
			//Ventana emergente par las acciones 
			//del plan de trabajo.
			var edit = false;
			if(!itemToEdit){
				itemToEdit= {
					idTpoBullying : -1,
					nomTipoBullying:'',
					idBullying : -1,
					nombre : '',
					numveces:'',
					bconcreto:'',
					consiste:''
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPBullyingN';
			var dDetail =new Dialog({
					id:idVentana, 
					title:"Atenci\u00f3n de acoso escolar", 
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
									'<td align="right"><label>* Acci\u00f3n o apoyo: </label></td>'+
									'<td><input id="txtNumAccion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Se concret\u00f3: </label></td>'+
									'<td><input id="cmbConcreto"/></td>'+'</tr>'+
								'</tr>'+
								'<tr>'+
			 						'<td align="right"><label>* En qu\u00e9 consiste la acci\u00f3n o el apoyo </label></td>'+
									'<td><input id="txtConsiste"/></td>'+
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
		            {name:"No", id:"No"},
		            {name:"En proceso", id:"En proceso"}
		        ]
		    });
			
			
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

			var txtNumAccion = new ValidationTextBox({
				readOnly : edit,
				value : itemToEdit.numveces,
				required : true,
				maxLength :"150",
				placeHolder : "Nota: agregar accion o apoyo  a emprender.",
	            style : "width:500px;"
			},'txtNumAccion');
			
			
	 		var txtConsiste = new ValidationTextBox({
				id:'txtConsiste',
				value: itemToEdit.consiste,
				//	readOnly : edit,
				maxLength : "150",
				required: true,
				placeHolder : "Nota: agregar en que consiste el apoyo",
			},"txtConsiste");
			
			
			var cmbConcreto = new FilteringSelect({
				value: itemToEdit.bconcreto,
				require:true,
				maxlength:"2",
				store:stateStore,
			},'cmbConcreto');
			
			var cmbProceso = new FilteringSelect({
				value: itemToEdit.bproceso,
				require:true,
				maxlength:"2",
				store:stateStore,
			},'cmbProceso');
			
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
					var gridBullying = registry.byId('gridBullyingN');
					try{
						try {
							if(edit){		
								var index = gridBullying.selection.selectedIndex;
								var item = gridBullying.getItem(index);
								gridBullying.store.setValue(item, 'nombre',cmbAcoso.get('displayedValue'));
								gridBullying.store.setValue(item, 'numveces',txtNumAccion.get('value'));
								gridBullying.store.setValue(item, 'bconcreto',cmbConcreto.get('displayedValue'));
								gridBullying.store.setValue(item, 'consiste', txtConsiste.get('displayedValue'));
								gridBullying.update();
							}
							else{
								var myNewItem = {
									id : gridBullying.rowCount + 1,
									idTpoBullying: cmbTipoAcoso.get('value'),
									nomTipoBullying:cmbTipoAcoso.get('displayedValue'),
									idBullying : cmbAcoso.get('value'),
									nombre : cmbAcoso.get('displayedValue'),
									numveces : txtNumAccion.get('value'),
									bconcreto: cmbConcreto.get('displayedValue'),
									consiste: txtConsiste.get('displayedValue'),
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
						concreto:'',
						consiste:'',
						cuantos:'',
						cNee1:1,
						nomNee1:'',
						gestion1:'',
						concreto1:'',
						consiste1:'',
						cuantos1:'',
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
									'<td align="right"><label>*Apoyos por gestionar: </label></td>'+	
									'<td><input id="txtGestion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*Se concret\u00f3 : </label></td>'+
									'<td><input id="cmbConcreto"/></td>'+
								'</tr>'+
								'<tr>'+
			 						'<td align="right"><label>*En qu\u00e9 consiste el apoyo : </label></td>'+
									'<td><input id="txtConsiste"/></td>'+
								'</tr>'+
								'<tr>'+
		 							'<td align="right"><label>*Ni\u00f1os beneficiados : </label></td>'+
		 							'<td><input id="txtCuantos"/></td>'+
		 							'</tr>'+
								'<tr>'+
									'<td align="right"><label>Tipo de necesidad: </label></td>'+
									'<td><input id="cmbTipoNecesidad1"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>Apoyos por gestionar: </label></td>'+
									'<td><input id="txtGestion1"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>Se concret\u00f3 : </label></td>'+
									'<td><input id="cmbConcreto1"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*En qu\u00e9 consiste el apoyo : </label></td>'+
									'<td><input id="txtConsiste1"/></td>'+
								'</tr>'+
								'<tr>'+
	 								'<td align="right"><label>*Ni\u00f1os beneficiados : </label></td>'+
	 								'<td><input id="txtCuantos1"/></td>'+
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
			
			var stateStore = new Memory({
		        data: [
		            {name:"Si", id:"Si"},
		            {name:"No", id:"No"},
		            {name:"En proceso", id:"En proceso"}
		        ]
		    });
			
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
			
			var txtGestion = new ValidationTextBox({
				id:'txtGestion',
				value: itemToEdit.gestion,
				readOnly : edit,
				maxLength : "150",
				required: true,
				placeHolder : "Nota: agregar los apoyos a gestionar separados por una coma.",
	        },"txtGestion");
			
			var txtConsiste = new ValidationTextBox({
				id:'txtConsiste',
				value: itemToEdit.consiste,
			//	readOnly : edit,
				maxLength : "150",
				required: true,
				placeHolder : "Nota: agregar en que consiste el apoyo",
	        },"txtConsiste");
			
			var txtCuantos = new ValidationTextBox({
				id:'txtCuantos',
				value: itemToEdit.cuantos,
			//	readOnly : edit,
				maxLength : "150",
				required: true,
				placeHolder : "Nota: agregar cuantos ni\u00f1os son beneficiados",
	        },"txtCuantos");
			

			var cmbConcreto=new FilteringSelect({
				value:itemToEdit.concreto,
				store:stateStore,
				required: true,
				maxLength:"2",
			}, 'cmbConcreto');
			

/*		var cmbProceso = new FilteringSelect({
				id:'cmbProceso',
				store:stateStore,
				value: itemToEdit.proceso,
				maxLength : "2",
				required: true,
	        },"cmbProceso");*/
			
			var cmbTipoNecesidad1 = new FilteringSelect({
				value: itemToEdit.cNee1,
				store: NeeStore,
				readOnly : edit,
	            searchAttr: "name",
	        },"cmbTipoNecesidad1");
			
			var txtGestion1 = new ValidationTextBox({
				id:'txtGestion1',
				value: itemToEdit.gestion1,
				readOnly : edit,
				maxLength : "150",
				placeHolder : "Nota: agregar los apoyos a gestionar separados por una coma.",
	        },"txtGestion1");
			
			var txtConsiste1 = new ValidationTextBox({
				id:'txtConsiste1',
				value: itemToEdit.consiste1,
			//	readOnly : edit,
				maxLength : "150",
				required: true,
				placeHolder : "Nota: agregar en que consiste el apoyo",
	        },"txtConsiste1");
			
			var txtCuantos1 = new ValidationTextBox({
				id:'txtCuantos1',
				value: itemToEdit.cuantos1,
			//	readOnly : edit,
				maxLength : "150",
				required: true,
				placeHolder : "Nota: agregar cuantos ni\u00f1os son beneficiados",
	        },"txtCuantos1");
			
			
			var cmbConcreto1=new FilteringSelect({
				value:itemToEdit.concreto1,
				maxLength:"2",
				store:stateStore,
			}, 'cmbConcreto1');
			
	/*		var cmbProceso1 = new FilteringSelect({
				store:stateStore,
				value: itemToEdit.proceso1,
				maxLength : "2"
	        },"cmbProceso1");*/
			

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
								gridNecesidad.store.setValue(item, 'necesidad', cmbNecesidad.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'nomNee', cmbTipoNecesidad.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'gestion',txtGestion.get('value'));
								gridNecesidad.store.setValue(item, 'concreto',cmbConcreto.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'consiste',txtConsiste.get('value'));
								gridNecesidad.store.setValue(item, 'cuantos',txtCuantos.get('displayedValue'));
							//	gridNecesidad.store.setValue(item, 'proceso',cmbProceso.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'nomNee', cmbTipoNecesidad1.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'concreto1',cmbConcreto1.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'consiste1',txtConsiste1.get('value'));
								gridNecesidad.store.setValue(item, 'cuantos1',txtCuantos1.get('displayedValue'));
							//	gridNecesidad.store.setValue(item, 'proceso1',cmbProceso1.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'gestion1',txtGestion1.get('value'));
								gridNecesidad.update();
							}else{
								var myNewItem = {
									id: gridNecesidad.rowCount + 1,
									cApoyo : cmbNecesidad.get('value'),
									necesidad :cmbNecesidad.get('displayedValue'),
									cNee : cmbTipoNecesidad.get('value'),
									nomNee : cmbTipoNecesidad.get('displayedValue'),
									gestion: txtGestion.get('value'),
									concreto : cmbConcreto.get('displayedValue'),
									consiste : txtConsiste.get('displayedValue'),
									cuantos : txtCuantos.get('displayedValue'),
							//		proceso: cmbProceso.get('displayedValue'),
									cNee1 : cmbTipoNecesidad1.get('value'),
									nomNee1 : cmbTipoNecesidad1.get('displayedValue'),
									gestion1: txtGestion1.get('value'),
									concreto1 : cmbConcreto1.get('displayedValue'),
									consiste1 : txtConsiste1.get('displayedValue'),
									cuantos1 : txtCuantos1.get('displayedValue'),
							//		proceso1: cmbProceso1.get('displayedValue'),
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

		function _agregarFilaGrid(tpoApoyo,embedded){
			//La función crea un botón para poder agregar
			//una fila al grid seleccionado.
			utils.createTag('input','add'+embedded,embedded);
			new Button({
				id : 'add'+embedded,
				label:'Agregar',
				onClick: function(){
					if(tpoApoyo=="Federal"){
						_popupFederal();
					}else if(tpoApoyo=="Estatal"){
						_popupEstatal();	
					}else if(tpoApoyo=="Necesidad"){
						_popupNecesidad();
					}else if(tpoApoyo=="Bullying"){
						_popupBullying();
					}else if(tpoApoyo =="BullyingN"){
						_popupBullyingN();
				    }else{
						_popupApoyos(tpoApoyo);
					}
					
		        }
			},'add'+embedded);
		}
		
		function saveSegundaReunion(cApec, storeCcts) {

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

				var existeReunion = segundaReunionObj.reunion ? true : false;
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

				var seccionesRegistradasArray = registry.byId('selectSeccion')
						.get('value');
				var hayApoyos = false;
				var hayPlanTrab = false;
				var hayInclusion = false;

				// Carga los apoyos conafes seleccionados
				for ( var i in seccionesRegistradasArray) {
					if (seccionesRegistradasArray[i] == constants.SECCION_APOYOS_R2) {
						hayApoyos = true;
					}

					if (seccionesRegistradasArray[i] == constants.SECCION_PLAN_TRABAJO_R2) {
						hayPlanTrab = true;

					}
					if (seccionesRegistradasArray[i]==constants.SECCION_INCLUSION_SOCIAL_R2){
						hayInclusion = true;
					}
				}

				
				var apoyosFederales = new Array();
				var apoyosEstatales = new Array();
				var necEsp = new Array();

				// Validar que por lo menos haya seleccionado un registro de la
				// lista.
				if (!hayApoyos && !hayPlanTrab) {
					utils
							.cstmAlert("Deber\u00E1 seleccionar por lo menos un rubro, para continuar <br> con el registro de la segunda reuni\u00F3n.");
					return false;
				}

				if (hayApoyos == true) {
					// Carga los apoyos conafes seleccionados
					

				
					
					
					// Carga los apoyos federales seleccionados

					
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
									|| gridApoyos.store.getValue(item, 'idfconcreto')== null
									|| gridApoyos.store.getValue(item, 'idfconcreto')==""	
									|| gridApoyos.store.getValue(item, 'beneficiarios')== null
									|| gridApoyos.store.getValue(item, 'beneficiarios')==""
									|| gridApoyos.store.getValue(item, 'idfproceso') == null
									|| gridApoyos.store.getValue(item, 'idfproceso') == "") {

								utils
										.cstmAlert("Uno o m\u00e1s apoyos federales no cuentan con la informaci\u00F3n requerida");
								return false;
							}
							
							
													
							var apoyo = {
								cApoyo: gridApoyos.store.getValue(item,'cApoyo'),
								descripOtro : gridApoyos.store.getValue(item,'cual'),
								beneficiariosr1 : gridApoyos.store.getValue(item,'idfconcreto'),
								montor3 : gridApoyos.store.getValue(item,'beneficiarios'),
								beneficiariosr2 : gridApoyos.store.getValue(item,'idfproceso'), 		
							};
							apoyosFederales.push(apoyo);
							hayFederal = true;
						}

					}	
					
	/// apoyos estatales
					
					if (hayApoyos) {
						var hayEstatal = false;
						var gridApoyos = registry.byId('gridEstatal');

						// Obtiene la informaci—n del Grid
						for ( var i = 0; i < gridApoyos.rowCount; i++) {

							var item = gridApoyos.getItem(i);
							// Genera un nuevo objeto de poblacion indigena de cada
							// renglon del grid.
							if (gridApoyos.store.getValue(item, 'apoyo') == null
									|| gridApoyos.store.getValue(item, 'apoyo') == ""
									|| gridApoyos.store.getValue(item, 'ideconcreto') == null
									|| gridApoyos.store.getValue(item, 'ideconcreto') == ""
									|| gridApoyos.store.getValue(item, 'ideproceso') == null
									|| gridApoyos.store.getValue(item, 'ideproceso') == "") {

								utils
										.cstmAlert("Uno o m\u00e1s apoyos estatales no cuentan con la informaci\u00F3n requerida");
								return false;
							}
							
							
													
							var estatal= {
								cApoyo: gridApoyos.store.getValue(item,'cApoyo'),
								descripOtro : gridApoyos.store.getValue(item,'especifique'),
								beneficiariosr1 : gridApoyos.store.getValue(item,'ideconcreto'),
								montor2 : gridApoyos.store.getValue(item,'ideproceso'),
							};
							apoyosEstatales.push(estatal);
							hayEstatal = true;
						}

						
					}	
	/// Necesidad
					
					//

					

				}
				
				
		if (hayInclusion == true) {
///inclusion social
				var gridNecesidades = registry.byId('gridNecesidad');

				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridNecesidades.rowCount; i++) {

					var item = gridNecesidades.getItem(i);
					// Genera un nuevo objeto de necesidad especial de cada
					// renglon del grid.
					if (gridNecesidades.store.getValue(item, 'necesidad') == null
							|| gridNecesidades.store.getValue(item, 'necesidad') == ""
							|| gridNecesidades.store.getValue(item, 'nomNee') == null
							|| gridNecesidades.store.getValue(item, 'nomNee') == ""
							|| gridNecesidades.store.getValue(item, 'concreto') == null
							|| gridNecesidades.store.getValue(item, 'concreto') == ""
							|| gridNecesidades.store.getValue(item, 'proceso') == null
							|| gridNecesidades.store.getValue(item, 'proceso') == "") {
						utils.cstmAlert("Una o m\u00e1s necesidades especiales no cuentan con la informaci\u00F3n requerida");
						return false;
					}

					var neceEspItem = {
						cApoyo : gridNecesidades.store.getValue(item, 'cApoyo'),
						cNee:gridNecesidades.store.getValue(item,'cNee'),
						gestionar : gridNecesidades.store.getValue(item, 'gestion'),
						concreto : gridNecesidades.store.getValue(item, 'concreto'),
						proceso : gridNecesidades.store.getValue(item, 'proceso'),
						cNee1:gridNecesidades.store.getValue(item,'cNee1'),
						gestionar1 : gridNecesidades.store.getValue(item, 'gestion1'),
						concreto1 : gridNecesidades.store.getValue(item, 'concreto1'),
						proceso1 : gridNecesidades.store.getValue(item, 'proceso1'),
					};

					necEsp.push(neceEspItem);
					hayDatosIncSocial = true;
				}		
		
/// Bullying
			
				var bullying = new Array();
				var gridAcoso = registry.byId('gridBullyingN');

				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridAcoso.rowCount; i++) {

					var item = gridAcoso.getItem(i);
					// Genera un nuevo objeto de poblacion indigena de cada
					// renglon del grid.
					if (gridAcoso.store.getValue(item, 'bconcreto') == null
							|| gridAcoso.store.getValue(item, 'bconcreto') == ""
							|| gridAcoso.store.getValue(item, 'bproceso') == null
							|| gridAcoso.store.getValue(item, 'bproceso') == "") {

						utils
								.cstmAlert("Una o m\u00e1s casos de bullying no cuentan con la informaci\u00F3n requerida");
						return false;
					}
						
					var Nacoso = {
						cCoTipoBullying: gridAcoso.store.getValue(item,'idTpoBullying'),
						cCoBullying : gridAcoso.store.getValue(item,'idBullying'),
						numvecesr1: gridAcoso.store.getValue(item,'numveces'),
						bconcreto :gridAcoso.store.getValue(item,'bconcreto'),
						bproceso : gridAcoso.store.getValue(item,'bproceso'),
					};
					bullying.push(Nacoso);
					hayDatosIncSocial = true;
					
				}
				var acoso = new Array();
				var gridNcaso = registry.byId('gridBullying');

				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridNcaso.rowCount; i++) {

					var item = gridNcaso.getItem(i);
					// Genera un nuevo objeto de poblacion indigena de cada
					// renglon del grid.
					if (gridNcaso.store.getValue(item, 'nombre') == null
							|| gridNcaso.store.getValue(item, 'nombre') == ""
							|| gridNcaso.store.getValue(item,'cuantos')== null
							|| gridNcaso.store.getValue(item,'cuantos')==""
							|| gridNcaso.store.getValue(item, 'numveces') == null
							|| gridNcaso.store.getValue(item, 'numveces') == "") {

						utils
								.cstmAlert("Una o m\u00e1s casos de bullying no cuentan con la informaci\u00F3n requerida");
						return false;
					}
					
					
											
					var bullyingN = {
						
						cCoTipoBullying: gridNcaso.store.getValue(item,'idTpoBullying'),
						cCoBullying : gridNcaso.store.getValue(item,'idBullying'),
						cuantos : gridNcaso.store.getValue(item, 'cuantos'),
						numvecesr1 : gridNcaso.store.getValue(item,'numveces')
					};
					acoso.push(bullyingN);
					hayDatosIncSocial = true;
					
				}	
				
				
				
		}
// plan de trabajo				
				var planTrabajo = new Array();
				if (hayPlanTrab) {
					var hayPlanTrabajo = false;

					
					var gridTrabajo = registry.byId('gridApoyo5');
					

					// Obtiene la informaci—n del Grid
					for ( var i = 0; i < gridTrabajo.rowCount; i++) {

						var item = gridTrabajo.getItem(i);
						// Genera un nuevo objeto de poblacion indigena de cada
						// renglon del grid.
						if (gridTrabajo.store.getValue(item, 'apoyoRecibido') == null
								|| gridTrabajo.store.getValue(item, 'apoyoRecibido') == ""
								) {

							utils
									.cstmAlert("Una o m\u00e1s acciones del plan de trabajo no cuentan con la informaci\u00F3n requerida");
							return false;
						}

						var numVecesR2=null;
						var respuesta=null;
						
						
						if(gridTrabajo.store.getValue(item,
						'tipoRespuesta')==2){
							
							numVecesR2=gridTrabajo.store.getValue(item,
							'accion');
							if(numVecesR2!=null){
								respuesta=5;	
							}
							else
								respuesta=null;
							
						}
						else{
							respuesta=gridTrabajo.store.getValue(item,
							'idRespuesta');
						}																		
						
							
						
						var accionPT = {
							cAccion : gridTrabajo.store.getValue(item,
									'idAccion'),
							cReunion : gridTrabajo.store.getValue(item,
									'reunion'),
							numVecesr2 : numVecesR2,
							cRespuestar2:respuesta,
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
				
				var integrantesR2 = new Array();
				integrantesR2 = utils.integrantesAsistieron(segundaReunionObj.integrantesR2?segundaReunionObj.integrantesR2:[],constants.SEGUNDA_REUNION);				
				if(integrantesR2.length==0){
					return false;
				}
				
				var instructoresR2 = new Array();
				instructoresR2 = utils.instructoresAsistieron(segundaReunionObj.instructoresR2?segundaReunionObj.instructoresR2:[],constants.SEGUNDA_REUNION,'gridInstructores'+constants.SEGUNDA_REUNION);
				if(instructoresR2.length==0){
					return false;
				}
				
				var segundaReunion = {
						apec : apec,
						reunion : apecReunion,
						apoyosFederales : apoyosFederales,
						apoyosEstatales : apoyosEstatales,
						necesidadesEspeciales : necEsp,
						bullying:bullying,
						acoso:acoso,
						planTrabajo : planTrabajo,
						integrantesR2 : integrantesR2,
						instructoresR2 : instructoresR2
				};
				
				console.log(json.toJson(segundaReunion));
				
				var urlJson = dojo.config.app.urlBase + 'segundaReunion/save';

				xhr
						.post(
								{
									url : urlJson,
									postData : json.toJson(segundaReunion),
									headers : {
										"Content-Type" : "application/json; charset=UTF-8"
									},
									handleAs : 'json',
									handle : function(response) {
										if (response == 'SyntaxError: syntax error') {
											window.location.reload();
										} else if (response != 1) {
											utils
													.cstmAlert('Ocurri\u00F3 un error al registrar la informaci\u00F3n de su APEC.');
											standby.hide();
										} else {
											utils
													.cstmAlert('La informaci\u00F3n de su reunion intermedia se registr\u00F3 correctamente.');

											reuniones
													.refresh(
															segundaReunionObj.apec.idEntidadfed,
															segundaReunionObj.apec.idMunicipio,
															segundaReunionObj.apec.idLocalidad,
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
				saveSegundaReunion : saveSegundaReunion
			};
		});