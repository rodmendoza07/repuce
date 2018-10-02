define([ "dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojo/_base/json","dijit/form/Button","dijit/Dialog","dijit/form/FilteringSelect",
         "app/util/constants","dojo/_base/xhr","dijit/form/ValidationTextBox","dojo/store/Memory",
         "dojox/widget/Standby","dojo/dom","dojox/form/CheckedMultiSelect","dijit/form/RadioButton",
         "app/conafe1415/reuniones_conafe", "dojox/grid/cells/dijit","dojox/grid/DataGrid","dojox/grid/cells",
         "dojox/grid/_CheckBoxSelector", "dojo/data/ItemFileWriteStore"],

   	function(registry,array,utils,json,Button,Dialog,FilteringSelect,
			 constants,xhr,ValidationTextBox,Memory,Standby,dom,
			 CheckedMultiSelect,RadioButton,reuniones,gridCellsDijit,DataGrid,gridCells,
			 _CheckBoxSelector,ItemFileWriteStore){

		var terceraReunionObj = new Object();
		var apoyoConafeStore = {};
		var apoyoFederalStore = {};
		var apoyoEstatalStore = {};
		var apoyoNecesidadStore = {};
		var apoyosPlanTrabajo = {};
		var apoyosDiagCierre = {};
		var idReunion = null;
		var opcionesStore = new Array();
		 var rneSeleccionados2='';
		 var rneSeleccionados4='';
		 var rneSeleccionados5='';
		 var rneSeleccionados9='';
		 var rneSeleccionados13='';
		 var rneSeleccionados14='';
		 var rneSeleccionados15='';
		 var rneSeleccionados16='';
		 var rneSeleccionados17='';
	
		 
		 
		
		function init(actividades,cApec,ReunionObj, storeCcts){
			terceraReunionObj = !ReunionObj?{}:ReunionObj;
			idReunion = !ReunionObj.reunion?constants.TERCERA_REUNION:terceraReunionObj.reunion.cReunion;

			
			  // Informe Final
		    xhr.get({
		           url: dojo.config.app.urlBase + 'catalogos/listOpcionesContra/',
		           sync: true, 
		           loadOnParse:true,
		           preventCache:true,
		           handleAs: "json",
		           contentType: "application/x-www-form-urlencoded; charset=utf-8"
		        } ).then(function(data){
		        	console.log(data);
		        	opcionesStore = data;
		        }); 
			
			
		/*	_findApoyosPorTipo(constants.APOYO_CONAFE);
			_findApoyosPorTipo(constants.APOYO_FEDERAL);
			_findApoyosPorTipo(constants.APOYO_ESTATAL);*/
			
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
				apoyoConafeStore = new Memory({data:store});
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
					apoyoFederalesStore = new Memory({data:store});
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
					apoyoEstatalStore = new Memory({data:store});
			    });
			
			
		
			
			

			utils.asistenciaReunion(idReunion,'Integrantes',terceraReunionObj.integrantesR3,storeCcts);
			utils.asistenciaReunion(idReunion,'Instructores',terceraReunionObj.instructoresR3,storeCcts);

			//Busca tipos de acciones, que vendrían siendo 
			//los apoyos del plan de trabajo.
			
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
				url: dojo.config.app.urlBase+'catalogos/listCriteriosDesercion/',
				sync: false, 
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]" , descripcionLarga:""}];
				for(var j in data){
					store.push({ 
						id:data[j].cDesercion,
						name:data[j].descripCorta,
						descripcionLarga:data[j].descripDesercion
					});
				}
				apoyosDiagCierre = new Memory({data:store});
		    });
			
			_apoyos(array.indexOf(actividades,3)!=-1);
			_planDTrabajo(array.indexOf(actividades,4)!=-1);
			_diagnostico(array.indexOf(actividades,9)!=-1);
			_evaluacion(array.indexOf(actividades,10)!=-1);
			_inclusionSocial(array.indexOf(actividades,12)!=-1);
			_contraloriaSocial(array.indexOf(actividades,16)!=-1); //actualizar el numero 15
			_informeFinal(array.indexOf(actividades,17)!=-1);
			
		

		}

		function _apoyos(crearApoyos){
			//La función dependiendo del tipo de apoyo que existe, extrae la información 
			//del objeto y la manda a _crearListaApoyos en donde se mostrara en tablas.
			var listPanelesAPoyo= new Array({title:"Apoyos CONAFE",     tpoList:1,id:"apoyoC"},
											{title:"Apoyos federales",  tpoList:2,id:"apoyoF"},
											{title:"Apoyos est. o mun.",tpoList:3,id:"apoyoE"});
			for(var i in listPanelesAPoyo){
				if(crearApoyos){
					if(!registry.byId(listPanelesAPoyo[i].id)){
						var objSelect = null;
						if(listPanelesAPoyo[i].id=="apoyoC"){
							objSelect = terceraReunionObj.apoyosConafe?terceraReunionObj.apoyosConafe:[];
						}else if(listPanelesAPoyo[i].id=="apoyoF"){
							objSelect = terceraReunionObj.apoyosFederales?terceraReunionObj.apoyosFederales:[];
						}else if(listPanelesAPoyo[i].id=="apoyoE"){
							objSelect = terceraReunionObj.apoyosEstatales?terceraReunionObj.apoyosEstatales:[];
						}
						_crearListaApoyos(listPanelesAPoyo[i],objSelect);
						utils.pestaniaSelect(listPanelesAPoyo[0].id);
					}
				}else{
					utils.cerrarPestania(listPanelesAPoyo[i].id);
				}
			}
		}
		
/* vblake	function _crearListaApoyos(pestaniaDestino,listApoyos){
			var apoyosEncontrados=new Array();
			var noAplica = "N/A";
			var idGrid = 'gridApoyo' + pestaniaDestino.tpoList;
			var idPanelSecundario = 'Apoyo' + pestaniaDestino.tpoList;
			var layoutApoyo = [[{name:'cApoyo',field:'cApoyo',hidden:true},
		                        {name:'Apoyos recibidos',width:'370px',styles:'text-align: left;',field:'apoyoRecibido'},
		                        {name:'Econ\u00F3mico',width:'150px',styles:'text-align: center;',field:'economico'},
		                        {name:'Cantidad 2\u00AA reuni\u00F3n',width:'170px',styles:'text-align: center;',field:'cantidad_desc_Segunda'},
		                        {name:'Cantidad',width:'170px',styles:'text-align: center;',field:'cantidad_desc'},
		                        {name:'Cantidad',field:'cantidad',hidden:true},
		                        {name:'Cantidad',field:'cantidadSegunda',hidden:true},
		                        {name:'Descripcion',field:'descripcion',hidden:true},
		                        {name:'Otros',field:'otros',hidden:true},
		                        {name:'Reunion',field:'reunion',hidden:true}]];
			for(var i in listApoyos){
				var valorCant = !listApoyos[i].apoyo.beneficiariosr3?noAplica:listApoyos[i].beneficiariosr3;
				var descCant = !listApoyos[i].apoyo.otroTipoBeneficiarios?'':listApoyos[i].apoyo.otroTipoBeneficiarios;
				var apoyo = {
					cApoyo : listApoyos[i].apoyo.cApoyo,
				    apoyoRecibido : !listApoyos[i].descripOtro?listApoyos[i].apoyo.descripCorta:listApoyos[i].apoyo.descripCorta +': '+ listApoyos[i].descripOtro,
				    economico : !listApoyos[i].apoyo.economico?noAplica:listApoyos[i].montor3,
				    cantidad_desc : !listApoyos[i].apoyo.beneficiariosr3?noAplica:!listApoyos[i].beneficiariosr3?'':!descCant?listApoyos[i].beneficiariosr3:descCant +': '+ listApoyos[i].beneficiariosr3,
				    cantidad : !listApoyos[i].apoyo.beneficiariosr3?noAplica:listApoyos[i].beneficiariosr3,
				    cantidad_desc_Segunda:!listApoyos[i].apoyo.beneficiarios?noAplica:!listApoyos[i].beneficiariosr2?noAplica:!descCant?listApoyos[i].beneficiariosr2:descCant +': '+ listApoyos[i].beneficiariosr2,
				    cantidadSegunda:!listApoyos[i].apoyo.beneficiarios?noAplica:listApoyos[i].beneficiariosr2,
				    descripcion: descCant,
				    otros : listApoyos[i].descripOtro,
				    reunion : listApoyos[i].cReunion
				};
				apoyosEncontrados.push(apoyo);
			}

			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
			utils.crearGrid(idPanelSecundario,layoutApoyo,'cApoyo',apoyosEncontrados,idGrid);
			
			//Aquí se mostraran los botones para agregar, editar y eliminar
			//pero dependiendo del tipo de apoyo se mostraran uno o varios.
			if(pestaniaDestino.tpoList==constants.APOYO_ESTATAL){
				_agregarFilaGrid(pestaniaDestino.tpoList,idPanelSecundario,idGrid);
			}
			
			utils.createTag('input','edit'+idPanelSecundario,idPanelSecundario);
			new Button({
				label:'Editar',
				onClick:function(){
					var grid = registry.byId(idGrid);
					var items = grid.selection.getSelected();
					if(items.length==1){
						dojo.forEach(items, function(selectedItem){
							if(selectedItem !== null){
								var itemToEdit={
									//Crea un arreglo con toda la información del elemento seleccionado
									//en el grid para poder editar la información.
									cApoyo : grid.store.getValue(selectedItem,'cApoyo'),
									apoyoRecibido : grid.store.getValue(selectedItem,'apoyoRecibido'),
									economico : grid.store.getValue(selectedItem,'economico'),
									cantidad : grid.store.getValue(selectedItem,'cantidad'),
									cantidadSegunda : grid.store.getValue(selectedItem,'cantidadSegunda'),
									descripcion : grid.store.getValue(selectedItem,'descripcion'),
									reunion : grid.store.getValue(selectedItem,'reunion'),
									otros : grid.store.getValue(selectedItem,'otros')
								};
								_pop_up(idGrid,pestaniaDestino.tpoList,itemToEdit);
							}
						}); 
			         }else{
			        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
			         }
				}
			},'edit'+idPanelSecundario);
			
			if(pestaniaDestino.tpoList==constants.APOYO_ESTATAL){
				utils.eliminarFilaGrid(idGrid,idPanelSecundario,constants.TERCERA_REUNION,true);
			}
		}
		
*/
		// VBLAKE se crea el Grid con las opciones de Apoyos CONAFE, Federales y Estatales de acuerdo al tipo de apoyo
		
		function _crearListaApoyos(pestaniaDestino,listApoyos){	
			var idPanelSecundario='Apoyo' + pestaniaDestino.tpoList;
							
			if(pestaniaDestino.tpoList==1){
				var idGrid = "gridConafe";
				var listApoyosC = terceraReunionObj.apoyosConafe?terceraReunionObj.apoyosConafe:[];	
				var apoyosConafe=new Array();
				var idPanelSecundario = "ApoyoPaneConafe";
				
				
			    var layoutApoyoCo = [[{name:'columna1',field:'id',hidden:true},
				                        {name:'cApoyo',field:'cApoyo',hidden:true},
				                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
				                        {name:'\u00BFCu\u00e1l?',field:'cual',width:'272px',styles:'text-align: left;'},
				                        {name:'Cantidad',field:'cantidad',width:'80px'},
				                        {name:'Alumnos beneficiados',field:'beneficiarios',width:'80px'}]];
				                     /*   {name:'Se gestion\u00e1',width:'272px',styles:'text-align: left;',field:'gestion'}*/
			    

				utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
				
				dom.byId('ApoyoPaneConafe').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
					'<td width= "450px"><span class="sub" align="left">Se recibieron los siguientes apoyos del Consejo Nacional de Fomento Educativo:</span></td>'+
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
					    beneficiarios : listApoyosC[i].numBenef
					//    gestion : listApoyosC[i].gestion
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
				var listApoyosF = terceraReunionObj.apoyosFederales?terceraReunionObj.apoyosFederales:[];	
				var apoyosFederales=new Array();
				var idPanelSecundario = "ApoyoPane";
				
				
			    var layoutApoyo = [[{name:'columna1',field:'id',hidden:true},
				                        {name:'cApoyo',field:'cApoyo',hidden:true},
				                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
				                        {name:'\u00BFCu\u00e1l?',field:'cual',width:'200px',styles:'text-align: left;'},
				                        {name:'Cantidad',field:'cantidad',width:'80px',styles:'text-align: center;'},
				                        {name:'Acci\u00f3n realizada',field:'accion',width:'150px',styles:'text-align: center;'},
				                        {name:'N\u00famero de beneficiarios',field:'beneficiarios',width:'80px',styles:'text-align: center;'}]];
				               		    

				utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
				
				dom.byId('ApoyoPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
					'<td width= "450px"><span class="sub" align="left">Se recibieron apoyos de los siguientes programas federales: </span></td>'+
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
					    cApoyo			:	listApoyosF[i].cApoyo,
					    apoyo			:	listApoyosF[i].nombre,
					    cual			:	listApoyosF[i].otro,
					    cantidad 		:	listApoyosF[i].cantidad,
					    accion			:	listApoyosF[i].descripApoyo,
					    beneficiarios 	:	listApoyosF[i].numBenef
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
				           				    accion :grid.store.getValue(selectedItem,'accion'),
				           				    beneficiarios :grid.store.getValue(selectedItem,'beneficiarios'),
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
			var listApoyosE = terceraReunionObj.apoyosEstatales?terceraReunionObj.apoyosEstatales:[];	
			var apoyosEstatales=new Array();
			var idPanelSecundario = "apoyosEstatales";
			
			
		    var layoutApoyoE = [[{name:'columna1',field:'id',hidden:true},
			                        {name:'cApoyo',field:'cApoyo',hidden:true},
			                        {name:'Apoyo',width:'272px',styles:'text-align: left;',field:'apoyo'},
			                        {name:'Especifique',field:'especifique',width:'200px',styles:'text-align: center;'},
			                        {name:'Cantidad',field:'cantidad',width:'80px',styles:'text-align: center;'},
			                        {name:'Acci\u00f3n realizada',field:'accion',width:'150px',styles:'text-align: center;'},
			                        {name:'N\u00famero de beneficiarios',field:'beneficiarios',width:'80px',styles:'text-align: center;'}]];
			         //             {name:'Se gestionar\u00e1',width:'80px',styles:'text-align: center;',field:'gestion'}]];
		    

			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,idPanelSecundario);
			
			dom.byId('apoyosEstatales').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
			'<tr>'+
				'<td width= "450px"><span class="sub" align="left">Se recibieron apoyos estatales o municipales: </span></td>'+
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
				    cantidad:listApoyosE[i].cantidad,
				    accion : listApoyosE[i].descripApoyo,
				    beneficiarios : listApoyosE[i].numBenef
				 //   gestion : listApoyosE[i].gestion
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
			           				    cantidad :grid.store.getValue(selectedItem,'cantidad'),
			           				    accion :grid.store.getValue(selectedItem,'accion'),
			           				    beneficiarios :grid.store.getValue(selectedItem,'beneficiarios'),
			           			//	    gestion :grid.store.getValue(selectedItem,'gestion'),
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
							objSelect =terceraReunionObj.necesidadesEspeciales?terceraReunionObj.necesidadesEspeciales:[];						
							Panel ='inclusionPane';
						}else if(listPanelesNP[i].id=="bullying"){
							objSelect = terceraReunionObj.bullying?terceraReunionObj.bullying:[];
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

	 /* vblake Se comenta el codigo original
	  
		function _crearListaNP(pestaniaDestino,listPN,PanelPN){
			objSelect = terceraReunionObj.bullying?terceraReunionObj.bullying:[];
			var situacionBullying=new Array();
			var idGrid = "gridBullying";
			//Crea la pestaña y el primer bloque.
			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,PanelPN); 
			if(pestaniaDestino.id =="bullying"){

				
				var bullying=new Array();
				dom.byId('bullyingPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
				'<tr>'+
				'<td width= "450px"><span class="sub" align="left">Atenci\u00f3n de acoso escolar(bullying) en la escuela</span></td>'+
				'<tr>'+
				
				'<td id="gridB" align="center"></td>'+
				
			'</tr>'+
			'<tr>'+
				
				'<td><div id="buttonR" align="center"></td>'+
			'</tr>'+
		  '</table>';
				'</tr>'+
			  '</table>';
				
				var layoutBullyingNew = [[{name:'columna1',field:'id',hidden:true},
				                       	{name:'idTpoBullying',field:'idTpoBullying',hidden:true},
				                       	{name:'nomTipoBullying',field:'nomTipoBullying',hidden:true},
				                        {name:'idBullying',field:'idBullying',hidden:true},
				                        {name:'Nombre',width:'272px',styles:'text-align: left;',field:'nombre'},
				                        {name:'Acci\u00f3n o apoyo',width:'272px',styles:'text-align: left;',field:'numveces'},
				                        {name:'Beneficiarios',field:'beneficiarios',width:'80px',styles:'text-align: center;'},
				                        ]];
				
				// nueva
				
				
				for(var j in objSelect){
					var nuevosBullying = {
					    id:j,
					    idTpoBullying:objSelect[j].cCoTipoBullying,
					    nomTipoBullying:objSelect[j].nomTipoBullying,
					    idBullying:objSelect[j].cCoBullying,
					    nombre:objSelect[j].descripCortar1,
					    numveces:objSelect[j].numvecesr1,
					    beneficiarios:objSelect[j].beneficiarios
					};
					bullying.push(nuevosBullying);
				}
				
				utils.crearGrid('gridB',layoutBullyingNew,'idBullying',bullying,idGrid);
			
			/// revisarl	
				
				//Sección para los botones.
				_agregarFilaGrid('Bullying','buttonR');
				utils.createTag('input','editBullying','buttonR');
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
				                			numveces : grid.store.getValue(selectedItem,'numveces'),
				                			beneficiarios : grid.store.getValue(selectedItem,'beneficiarios'),
									    };
				                	
				                	//_popupBullying(itemToEdit);
				                	_pop_up(idGrid,'Bullying',itemToEdit);
				                 }
				             }); 
				         }else{
				        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				         }
					}
				},'editBullying');
				utils.eliminarFilaGrid('gridBullying','buttonR',0,false);
				////Revisar
			}
			if(pestaniaDestino.id=="inclS"){
				var necesidadesObj=terceraReunionObj.necesidadesEspeciales?terceraReunionObj.necesidadesEspeciales:[];
				var necesidades=new Array();
				var layoutNecesidad = [[{name:'id',field:'id',hidden:true},
					                        {name:'cApoyo',field:'cApoyo',hidden:true},
					                        {name:'Necesidad',width:'315px',styles:'text-align: left;',field:'necesidad'},
					                        {name:'idTipoNecesidad',field:'cNee',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee',hidden:true},
					                        {name:'Apoyos que se program\u00f3 gestionar',field:'gestion',width:'215px',styles:'text-align: left;'},
					                        {name:'Beneficiarios',width:'80px',styles:'text-align: center;',field:'beneficiarios'},
					                        {name:'idTipoNecesidad',field:'cNee1',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee1',hidden:true},
					                        {name:'Apoyos que se program\u00f3 gestionar',field:'gestion1',width:'215px',styles:'text-align: left;'},
					                        {name:'Beneficiarios1',field:'beneficiarios1',width:'215px',styles:'text-align: left;'}
					                        ]];

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
						    beneficiarios:necesidadesObj[i].beneficiarios, 
						    cNee1:necesidadesObj[i].cNee1,
						    nomNee1:necesidadesObj[i].nomNee1,
						    gestion1:necesidadesObj[i].gestionar1,
						    beneficiarios1:necesidadesObj[i].beneficiarios1,
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
					                			beneficiarios: grid.store.getValue(selectedItem,'beneficiarios'),
					                			cNee1: grid.store.getValue(selectedItem,'cNee1'),
					                			nomNee1: grid.store.getValue(selectedItem,'nomNee1'),
					                			gestion1: grid.store. getValue(selectedItem,'gestion1'),
					                			beneficiarios1: grid.store.getValue(selectedItem,'beneficiarios1'),
					                			
										    };
					                	
					                	//_popupNecesidad(itemToEdit);
					                	_pop_up(idGrid,'Necesidad',itemToEdit);
					                	

					                 }
					             }); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'editNecesidad');
					utils.eliminarFilaGrid(gridNecesidad,'buttonsL',0,false);

				//Sección de población indígena.
				
			}
		}
*/		
		function _crearListaNP(pestaniaDestino,listPN,PanelPN){
			var situacionBullying=new Array();
			var idGrid = "gridBullying";
			//Crea la pestaña y el primer bloque.
			utils.crearPanel(pestaniaDestino.id,pestaniaDestino.title,PanelPN); 
			if(pestaniaDestino.id =="bullying"){

				objSelect = terceraReunionObj.acoso?terceraReunionObj.acoso:[];
				var bullying=new Array();
				dom.byId('bullyingPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
				'<tr>'+
				'<tr>'+
				'<td width= "900px"><span class="sub" align="left">Atenci\u00f3n de casos de acoso escolar (bullying) en la escuela:</span></td>'+
				'<tr>'+
				
				'<td id="gridB" align="center"></td>'+
				'</tr>'+
			'<tr>'+
				'<td><div id="buttonR" align="center"></td>'+
				'<td><div id="buttonB" align="center"></td>'+
			'</tr>'+
		  '</table>';
				'</tr>'+
			  '</table>';
	
				var layoutBullyingNew = [[{name:'columna1',field:'id',hidden:true},
				                       	{name:'idTpoBullying',field:'idTpoBullying',hidden:true},
				                       	{name:'nomTipoBullying',field:'nomTipoBullying',hidden:true},
				                        {name:'idBullying',field:'idBullying',hidden:true},
				                        {name:'Nombre',width:'250px',styles:'text-align: left;',field:'nombre'},
				                        {name:'Se concret\u00f3',field:'seconcreto',width:'80px',styles:'text-align: center;'},
				                        {name:'Acci\u00f3n que se program\u00f3 emprender o apoyo a gestionar',width:'250px',styles:'text-align: center;',field:'numveces'},
				 						{name:'N\u00famero de casos presentados',field:'cuantos',width:'80px',styles:'text-align: center;'}]];
			
				objSelect = terceraReunionObj.bullying?terceraReunionObj.bullying:[];
				for(var j in objSelect){
					var nuevosBullying = {
					    id:j,
					    idTpoBullying:objSelect[j].cCoTipoBullying,
					    nomTipoBullying:objSelect[j].nomTipoBullying,
					    idBullying:objSelect[j].cCoBullying,
					    nombre:objSelect[j].descripCortar1,
					    seconcreto:objSelect[j].seconcreto,
					    numveces:objSelect[j].numvecesr1,					   
					    cuantos:objSelect[j].cuantos,
					};
					bullying.push(nuevosBullying);
				}  
				
				utils.crearGrid('gridB',layoutBullyingNew,'idBullying',bullying,'gridBullyingN');
			
						
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
				                			seconcreto : grid.store.getValue(selectedItem,'seconcreto'),
				                			numveces : grid.store.getValue(selectedItem,'numveces'),
				                			cuantos: grid.store.getValue(selectedItem,'cuantos')
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
			}
			if(pestaniaDestino.id=="inclS"){
				var necesidadesObj=terceraReunionObj.necesidadesEspeciales?terceraReunionObj.necesidadesEspeciales:[];
				var necesidades=new Array();
				var layoutNecesidad = [[{name:'id',field:'id',hidden:true},
					                        {name:'cApoyo',field:'cApoyo',hidden:true},
					                        {name:'Necesidad',width:'215px',styles:'text-align: left;',field:'necesidad'},
					                        {name:'idTipoNecesidad',field:'cNee',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee',hidden:true},
					                        {name:'Apoyo que se program\u00f3 gestionar',field:'gestion',width:'215px',styles:'text-align: left;'},
					                        {name:'Se concret\u00f3',width:'80px',styles:'text-align: center;',field:'seconcreto'},
					                        {name:'En qu\u00e9 consisti\u00f3 el apoyo',field:'consiste', width:'215px',styles:'text-align: left;'},
					                        {name:'Ni\u00f1os beneficiados',field:'cuantos',width:'80px',styles:'text-align: center;'},
					                        {name:'idTipoNecesidad',field:'cNee1',hidden:true},
					                        {name:'Tipo de Necesidad',field:'nomNee1',hidden:true},
					                        {name:'Apoyo que se program\u00f3 gestionar',field:'gestion1',width:'215px',styles:'text-align: left;'},
					                        {name:'Se concret\u00f3',width:'80px',styles:'text-align: center;',field:'seconcreto1'},
											{name:'En qu\u00e9 consisti\u00f3 el apoyo',field:'consiste1',width:'215px',styles:'text-align: left;'},
							                {name:'Ni\u00f1os beneficiados',field:'cuantos1',width:'80px',styles:'text-align: center;'}]];
				

				dom.byId('inclusionPane').innerHTML='<table border="0" align="left" width= "900px" cellspacing="10">'+
										'<tr>'+
											'<td width= "450px"><span class="sub" align="left">Apoyos en beneficio de ni\u00f1os con necesidades educativas especiales:</span></td>'+
										'<tr>'+
											'<td id="gridISL" align="center"></td>'+
										'</tr>'+
										'<tr>'+
											'<td><div id="buttonsL" align="center"></td>'+
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
						    seconcreto:necesidadesObj[i].seconcreto,
						    consiste:necesidadesObj[i].consiste,
						    cuantos:necesidadesObj[i].cuantos,
						    cNee1:necesidadesObj[i].cNee1,
						    nomNee1:necesidadesObj[i].nomNee1,
						    seconcreto1:necesidadesObj[i].seconcreto1,
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
					                			seconcreto: grid.store.getValue(selectedItem,'seconcreto'),
					                			consiste: grid.store.getValue(selectedItem,'consiste'),
					                			cuantos: grid.store.getValue(selectedItem,'cuantos'),
					                   			cNee1: grid.store.getValue(selectedItem,'cNee1'),
					                			nomNee1: grid.store.getValue(selectedItem,'nomNee1'),
					                			gestion1: grid.store. getValue(selectedItem,'gestion1'),
					                			seconcreto1: grid.store.getValue(selectedItem,'seconcreto1'),
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
					var opinionesObj=terceraReunionObj.opiniones?terceraReunionObj.opiniones:[];
					var denunciasObj=terceraReunionObj.denuncias?terceraReunionObj.denuncias:[];
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
		
		

		function _informeFinal(crearInforme){
 		
			var idinforme="informe";
			var informeR1;
			id : idinforme;
			var idPanelSecundario="informeFinalPanel";
			if(crearInforme){
				if(!registry.byId(idinforme)){
					utils.crearPanel("informe","Informe Final",'informeFinalPane');
					dom.byId('informeFinalPane').innerHTML='<table border="0" align="lefth" width= "750px">'+
					   '<tr><td>'+ 
					   '	<p> <b>1. \u00bfRecibieron la informaci\u00f3n necesaria para realizar actividades de contralor\u00eda social?</b></p>'+
					   '</td></tr>'+
					   '<tr><td >'+
					   '	<input id="cmbSiNo1"/>'+
	    			   '</td></tr>'+
				
					   '<tr><td>'+ 
					   '	<p> <b>2. La informaci\u00f3n que conocen se refiere a (puede elegir m\u00e1s de una opci\u00f3n):</b></p>'+
					   '</td></tr>'+
					   '<tr ><td >'+
					   '	<input id="avanceOtroDt"/ size="40">'+
	    			   '</td></tr>'+
	    		    			   
	    			   '<tr><td>'+ 
					   '	<p> <b>3. En caso de no haber recibido informaci\u00f3n, \u00bfsolicitaron a la autoridad competente la informaci\u00f3n necesaria para ejercer las actividades de contralor\u00eda social?</b></p>'+
					   '</td></tr>'+
					   '<tr><td >'+
					   '	<input id="cmbSiNo3"/>'+
	    			   '</td></tr>'+
				
					   '<tr><td>'+ 
					   '	<p> <b>4. \u00bfQu\u00e9 actividades de contralor\u00eda social realizaron como comit\u00e9? (puede elegir m\u00e1s de una opci\u00f3n):</b></p>'+
					   '</td></tr>'+
					   '<tr><td >'+
					   '	<input id="avanceOtroDt4"/>'+
	    			   '</td></tr>'+
	    			   	    			   
	    			   '<tr><td>'+ 
				   		'	<p> <b>5. De los resultados de seguimiento, supervisi\u00f3n y vigilancia \u00bfPara qu\u00e9 consideran les sirvi\u00f3 participar en actividades de contralor\u00eda social? (puede elegir m\u00e1s de una opci\u00f3n):</b></p>'+
				   		'</td></tr>'+
				   		'<tr><td >'+
				   		'	<input id="avanceOtroDt5"/>'+
				   		'</td></tr>'+
				    			   
   			   			'<tr><td>'+ 
   			   			'	<p> <b>6. En las siguientes preguntas se\u00f1alen lo que piensan, despu\u00e9s de hacer contralor\u00eda social:</b></p>'+
   			   			'</td></tr>'+
   			   			
   			   			'<tr><td>'+ 
			   			'	<p> <b>6.1 \u00bfEl programa entreg\u00f3 los beneficios correcta y oportunamente, conforme a las reglas de operaci\u00f3n u otras normas que lo regulen?</b></p>'+
			   			'</td></tr>'+
			   			'<tr><td >'+
						'	<input id="cmbSiNo61"/>'+
		    			'</td></tr>'+
		    			
		    			'<tr><td>'+ 
			   			'	<p> <b>6.2 Despu\u00e9s de realizar la supervisi\u00f3n de la obra, apoyo o servicio, \u00bfconsideran que cumple con lo que el programa les inform\u00f3 que se les entregar\u00eda?</b></p>'+
			   			'</td></tr>'+
			   			'<tr><td >'+
						'	<input id="cmbSiNo62"/>'+
		    			'</td></tr>'+
		    			
		    			'<tr><td>'+ 
			   			'	<p> <b>6.3 \u00bfDetectaron que el programa se utiliz\u00f3 con fines pol\u00edticos, electorales, de lucro u otros distintos a su objetivo?</b></p>'+
			   			'</td></tr>'+
			   			'<tr><td >'+
						'	<input id="cmbSiNo63"/>'+
		    			'</td></tr>'+
		    			
		    			'<tr><td>'+ 
			   			'	<p> <b>6.4 \u00bfRecibieron quejas y denuncias sobre la aplicaci\u00f3n u operaci\u00f3n del programa?</b></p>'+
			   			'</td></tr>'+
			   			'<tr><td >'+
						'	<input id="cmbSiNo64"/>'+
		    			'</td></tr>'+
		    			
		    			'<tr><td>'+ 
			   			'	<p> <b>6.5 \u00bfEntregaron las quejas y denuncias a la autoridad competente?</b></p>'+
			   			'</td></tr>'+
			   			'<tr><td >'+
						'	<input id="cmbSiNo65"/>'+
		    			'</td></tr>'+
		    			
		    			'<tr><td>'+ 
			   			'	<p> <b>6.6 \u00bfRecibieron respuesta de las quejas que entregaron a la autoridad competente?</b></p>'+
			   			'</td></tr>'+
			   			'<tr><td >'+
						'	<input id="cmbSiNo66"/>'+
		    			'</td></tr>'+ 	
   			   			
   			   			'<tr><td>'+ 
   			   			'	<p> <b>7. \u00bfDe acuerdo con la informaci\u00f3n proporcionada por los servidores p\u00fablicos promotores del programa, consideran que la localidad, la comunidad o las personas beneficiadas cumplen con los requisitos para ser beneficiarios?</b></p>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
   			   			'	<input id="cmbSiNo7"/>'+
   			   			'</td></tr>'+
   			   	
   			   			'<tr><td>'+ 
			   			'	<p> <b>8. En la elecci\u00f3n de integrantes de los comit\u00e9s, \u00bftienen la misma posibilidad de ser electos hombres y mujeres?</b></p>'+
			   			'</td></tr>'+
			   			'<tr><td >'+
			   			'	<input id="cmbSiNo8"/>'+
			   			'</td></tr>'+
			   			
			   			'<tr><td>'+ 
				   		'	<p> <b>9. \u00bfQu\u00e9 informaci\u00f3n de la Gu\u00eda de APEC ha revisado hasta el momento?</b></p>'+
				   		'</td></tr>'+
				   		'<tr><td >'+
				   		'	<input id="avanceOtroDt9"/>'+
				   		'</td></tr>'+
				  			   			
   			   			'<tr><td>'+ 
   			   			'	<p> <b>10. \u00bfLa informaci\u00f3n que conoce ha sido clara y suficiente?</b></p>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
   			   			'	<input id="cmbSiNo10"/>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
			   			'<b>\u00bfPor qu\u00e9? </b><input id="txtPorQue"/>'+
			   			'</td></tr>'+
   			   						   			
   			   			'<tr><td>'+ 
			   			'	<p> <b>11. \u00bfRecibieron los carteles de contralor\u00eda social de este ciclo escolar?</b></p>'+
			   			'</td></tr>'+
			   			'<tr><td >'+
			   			'	<input id="cmbSiNo11"/>'+
			   			'</td></tr>'+
			   			
			   			'<tr><td>'+ 
   			   			'	<p> <b>12. Si recibieron los carteles, \u00bfest\u00e1n colocados en alg\u00fan lugar visible para las personas de la comunidad?</b></p>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
   			   			'	<input id="cmbSiNo12"/>'+
   			   			'</td></tr>'+
			   			
   			   			'<tr><td>'+ 
   			   			'	<p> <b>13. \u00bfQu\u00e9 funcionarios de Conafe le han brindado atenci\u00f3n, orientaci\u00f3n y/o informaci\u00f3n sobre contralor\u00eda?</b></p>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
   			   			'	<input id="avanceOtroDt13"/>'+
   			   			'</td></tr>'+
   			   			'<tr><td>'+
			   			'	<input id="otroDt13"/>'+
			   			'</td></tr>'+
   			   			
			   			'<tr><td>'+ 
   			   			'	<p> <b>14. De acuerdo con su opini\u00f3n, \u00bfc\u00f3mo ha sido el desempe\u00f1o del funcionario que le ha brindado atenci\u00f3n respecto al tema de contralor\u00eda social? (puede elegir m\u00e1s de una opci\u00f3n):</b></p>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
   			   			'	<input id="avanceOtroDt14"/>'+
   			   			'</td></tr>'+
   			   		   			   			
			   			'<tr><td>'+ 
   			   			'	<p> <b>15. \u00bf Cu\u00e1l es su opini\u00f3n respecto a los apoyos que el Conafe le ha proporcionado? (puede elegir m\u00e1s de una opci\u00f3n):</b></p>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
   			   			'	<input id="avanceOtroDt15"/>'+
   			   			'</td></tr>'+
   			   			'<tr><td>'+
			   			'	<input id="otroDt15"/>'+
			   			'</td></tr>'+
   			   			
			   			'<tr><td>'+ 
   			   			'	<p> <b>16. \u00bf Cu\u00e1l es su opini\u00f3n sobre el servicio o los servicios educativos que le brinda el Conafe? (puede elegir m\u00e1s de una opci\u00f3n):</b></p>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
   			   			'	<input id="avanceOtroDt16"/>'+
   			   			'</td></tr>'+
   			   			'<tr><td>'+
			   			'	<input id="otroDt16"/>'+
			   			'</td></tr>'+
			   			
			   			'<tr><td>'+ 
   			   			'	<p> <b>17. Los temas que se abordan durante las reuniones con padres (APEC y Mesa Directiva del Comit\u00e9) son:</b></p>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
   			   			'	<input id="avanceOtroDt17"/>'+
   			   			'</td></tr>'+
   			   						   			
			   			'<tr><td>'+ 
   			   			'	<p> <b>18. Con la experiencia que tiene respecto a la realizaci\u00f3n de las actividades de contralor\u00eda, \u00bfusted seguir\u00eda participando?</b></p>'+
   			   			'</td></tr>'+
   			   			'<tr><td >'+
   			   			'<tr><td >'+
   			   		    
			   			'	<input id="cmbSiNo18"/>'+
			   			'</td></tr>'+
			   			'<tr><td >'+
			   			'<b>\u00bfPor qu\u00e9? </b><input id="txtPorQue18"/>'+
			   			'</td></tr>'+
   			   			
					  '</table>';

						    var layoutOtro2Dt = [[	{ name: 'No.', field:'idObjetivo', width: '20px', hidden:true},        			          		            			          		    
								          		    { name: 'Selecci\u00F3n de Objetivo', field:'idSeleccion',
								          				    width: "20px",        			          				   
								          				    type: dojox.grid.cells.Bool,
								          				    editable: true, 	hidden:true
								          			},
								          			{ name: 'Respuesta', field: 'objetivo', width: '660px'},        			          				
								          			{ name: 'Meta de la escuela', field: 'meta', hidden:true,
								          					editable: true, 
								          					width: '50px', 
								          				    type: gridCellsDijit._Widget,
								          				    widgetClass: ValidationTextBox, 
								          				    widgetProps: {uppercase:'true', maxlength: '250'} 
								          			}
								          		]];

					    var checkDt = null;
					    var otrosSeleccionadoActivo = 0;
					    var otrosSeleccionado=null;
					    otroRecurso = "";
					    	    
					    
		 		
						    	checkDt =[{
									// First, our view using the _CheckBoxSelector custom type
									type: "dojox.grid._CheckBoxSelector"
								},
								layoutOtro2Dt
							];
					
// Inicia Pregunta 1
						    	
						var stateStore = new Memory({
						    data: [
						        {name:"Si", id:"Si"},
						        {name:"No", id:"No"}
						          ]
							    });		    	
					
						var cmbSiNo1 = new FilteringSelect({
						//		readOnly : edit,
							    searchAttr : "name",
							    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
							    store:stateStore,
							    value:terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta1:"",
							    required : false
							    },"cmbSiNo1");					    	
						    	
// Termina Pregunta 1
						    	
					    	
						    	
// Pregunta 2			
						
						
					    var dataOtroDtA = {
				          		identifier: "idActividad",
				          		items: []
				      	};
					    
					    
				         dataOtroDtA.items = [];
				        	
				        	for(var a in opcionesStore){
				        		if(opcionesStore[a].cPregunta == 2){

						        		var arregloOpciones = {              	
						        				idActividad: opcionesStore[a].identificador,
						        				idObjetivo: opcionesStore[a].identificador,
						        				objetivo: opcionesStore[a].respuesta,
						        				actividad : opcionesStore[a].identificador,
						        	        	meta: "",
						        	        	avance: ""
						        		};
						        		dataOtroDtA.items.push(arregloOpciones);
				            		}	
				        	}	
				             	
				         
				            
				            
						new DataGrid({
					  		id: 'avanceOtroDt',
					  		structure: checkDt,
					  		height: '184px', // alto del Grid, menos de 184 px muestra la barra de desplazamiento horizontal
					  		//width: '650px', se comenta para que no interfiera en lo alto del grid
					  		rowSelector: '20px',
					  		onRowClick: function(e){
					            this.edit.rowClick(e);
					            //this.selection.clickSelectEvent(e);
					         },
					         onSelectionChanged: function(item){
						  			var items = this.selection.getSelected();
						  			
									rneSeleccionados2 = dojo.map(items, function(item){
										if(this.store.getValue(item, "objetivo")=="Otro"){
											otrosSeleccionado=1;	
										}										
										
										return this.store.getValue(item, "idActividad");
									}, this);
									
													
									
									
							  		}
					  		},'avanceOtroDt');
						var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
			            
				        	
			            
			            registry.byId('avanceOtroDt').startup();
			    
			            registry.byId('avanceOtroDt').setStore(newStoreOtroDtA);
			       
				         
				         // Lectura de la Base de datos para mostrar la información capturada en el Checkbox	
				            
				    	    if(terceraReunionObj.informeFinal!=null ){
						    	gridpregunta2 = registry.byId('avanceOtroDt');
						        items = terceraReunionObj.informeFinal.respuesta2.split(",-");
						        //var headerGrid =gridpregunta2.domNode.firstElementChild;
								//headerGrid.style.display="none";
						        for(var a=0; a< items.length; a++){
						        	for ( var j = 0; j < gridpregunta2.rowCount; j++) {
							        	var item2 = gridpregunta2.getItem(j);
							        			        	
							        	if(array.indexOf( items[a], "=" ) != -1 ){
							        		items2s = items[a].split(",=");
							        		if( items2s[0] == gridpregunta2.store.getValue(item2,'idActividad')) {	        			
							        			gridpregunta2.selection.setSelected(j, true);	
								        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
								        		registry.byId('otroDt').set("value",items2s[1]);
								        		break;
								        	}	
							        	} else {
							        		if( items[a] == gridpregunta2.store.getValue(item2,'idActividad')) {	        			
							        			gridpregunta2.selection.setSelected(j, true);	
								        		break;
								        	}		
							        	}
							        	        		
							        }	
						        }	        	        
					        }

// termina Pregunta 2
				            
// Inicia Pregunta 3
 	
			    	
							var cmbSiNo3 = new FilteringSelect({
							//		readOnly : edit,
								    searchAttr : "name",
								    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
								    store:stateStore,
								    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta3:"",
								    required : false
								    },"cmbSiNo3");					    	
							    	
// Termina Pregunta 3	            
				            
				            
				            
				
// Inicia Pregunta 4
				   
						    var dataOtroDtA = {
					          		identifier: "idActividad",
					          		items: []
					      	};
						    
						    
					         dataOtroDtA.items = [];
					        	
					        	for(var a in opcionesStore){
					        		if(opcionesStore[a].cPregunta == 4){

							        		var arregloOpciones = {              	
							        				idActividad: opcionesStore[a].identificador,
							        				idObjetivo: opcionesStore[a].identificador,
							        				objetivo: opcionesStore[a].respuesta,
							        				actividad : opcionesStore[a].identificador,
							        	        	meta: "",
	 						        	        	avance: ""
							        		};
							        		dataOtroDtA.items.push(arregloOpciones);
					            		}	
					        	}	        	

					        	new DataGrid({
							  		id: 'avanceOtroDt4',
							  		structure: checkDt,
							  		height: '170px',
							  		// width: '450px',
							  		rowSelector: '20px',

								  		onRowClick: function(e){
								            this.edit.rowClick(e);
								            //this.selection.clickSelectEvent(e);
								         },
								         onSelectionChanged: function(item){
									  			var items = this.selection.getSelected();
									  			
												rneSeleccionados4 = dojo.map(items, function(item){
													if(this.store.getValue(item, "objetivo")=="Otro"){
														otrosSeleccionado=1;	
													}										
													
													return this.store.getValue(item, "idActividad");
												}, this);
												
												}
							  	},'avanceOtroDt4').startup();
					        	
					        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
					            registry.byId('avanceOtroDt4').setStore(newStoreOtroDtA);
					            
// Lectura de la Base de datos para mostrar la información capturada en el Checkbox					            
					            
					            if(terceraReunionObj.informeFinal!=null ){
							    	gridpregunta4 = registry.byId('avanceOtroDt4');
							        items = terceraReunionObj.informeFinal.respuesta4.split(",-");
							        //var headerGrid =gridpregunta2.domNode.firstElementChild;
									//headerGrid.style.display="none";
							        for(var a=0; a< items.length; a++){
							        	for ( var j = 0; j < gridpregunta4.rowCount; j++) {
								        	var item4 = gridpregunta4.getItem(j);
								        			        	
								        	if(array.indexOf( items[a], "=" ) != -1 ){
								        		items2s = items[a].split(",=");
								        		if( items2s[0] == gridpregunta4.store.getValue(item4,'idActividad')) {	        			
								        			gridpregunta4.selection.setSelected(j, true);	
									        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
									        		registry.byId('otroDt4').set("value",items2s[1]);
									        		break;
									        	}	
								        	} else {
								        		if( items[a] == gridpregunta4.store.getValue(item4,'idActividad')) {	        			
								        			gridpregunta4.selection.setSelected(j, true);	
									        		break;
									        	}		
								        	}
								        	        		
								        }	
							        }	        	        
						        } 
					            
//termina pregunta 4
			
			
// Inicia Pregunta 5

								new DataGrid({
							  		id: 'avanceOtroDt5',
							  		structure: checkDt,
							  		height: '170px',
							  		//width: '450px',
							  		rowSelector: '20px',
							  		onRowClick: function(e){
							            this.edit.rowClick(e);
							            //this.selection.clickSelectEvent(e);
							         },
							         onSelectionChanged: function(item){
								  			var items = this.selection.getSelected();
								  			
											rneSeleccionados5 = dojo.map(items, function(item){
												if(this.store.getValue(item, "objetivo")=="Otro"){
													otrosSeleccionado=1;	
												}										
												
												return this.store.getValue(item, "idActividad");
											}, this);
											
											}
									},'avanceOtroDt5').startup();
							   
							    var dataOtroDtA = {
						          		identifier: "idActividad",
						          		items: []
						      	};
							    
							    
						         dataOtroDtA.items = [];
						        	
						        	for(var a in opcionesStore){
						        		if(opcionesStore[a].cPregunta == 5){

								        		var arregloOpciones = {              	
								        				idActividad: opcionesStore[a].identificador,
								        				idObjetivo: opcionesStore[a].identificador,
								        				objetivo: opcionesStore[a].respuesta,
								        				actividad : opcionesStore[a].identificador,
								        	        	meta: "",
		 						        	        	avance: ""
								        		};
								        		dataOtroDtA.items.push(arregloOpciones);
						            		}	
						        	}	        	

						        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
						            registry.byId('avanceOtroDt5').setStore(newStoreOtroDtA);
						            
// Lectura de la Base de datos para mostrar la información capturada en el Checkbox					            
						            
						            if(terceraReunionObj.informeFinal!=null ){
								    	gridpregunta5 = registry.byId('avanceOtroDt5');
								        items = terceraReunionObj.informeFinal.respuesta5.split(",-");
								        //var headerGrid =gridpregunta2.domNode.firstElementChild;
										//headerGrid.style.display="none";
								        for(var a=0; a< items.length; a++){
								        	for ( var j = 0; j < gridpregunta5.rowCount; j++) {
									        	var item5 = gridpregunta5.getItem(j);
									        			        	
									        	if(array.indexOf( items[a], "=" ) != -1 ){
									        		items2s = items[a].split(",=");
									        		if( items2s[0] == gridpregunta5.store.getValue(item5,'idActividad')) {	        			
									        			gridpregunta5.selection.setSelected(j, true);	
										        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
										        		registry.byId('otroDt5').set("value",items2s[1]);
										        		break;
										        	}	
									        	} else {
									        		if( items[a] == gridpregunta5.store.getValue(item5,'idActividad')) {	        			
									        			gridpregunta5.selection.setSelected(j, true);	
										        		break;
										        	}		
									        	}
									        	        		
									        }	
								        }	        	        
							        } 
						            
//termina pregunta 5		            


// Inicia Pregunta 6
							    	
								
									var cmbSiNo61 = new FilteringSelect({
									//		readOnly : edit,
										    searchAttr : "name",
										    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
										    store:stateStore,
										    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta61:"",
										    required : false
										    },"cmbSiNo61");	
									
				
									var cmbSiNo62 = new FilteringSelect({
									//		readOnly : edit,
										    searchAttr : "name",
										    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
										    store:stateStore,
										    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta62:"",
										    required : false
										    },"cmbSiNo62");	
									
					
									var cmbSiNo63 = new FilteringSelect({
									//		readOnly : edit,
										    searchAttr : "name",
										    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
										    store:stateStore,
										    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta63:"",
										    required : false
										    },"cmbSiNo63");
									
									
									var cmbSiNo64 = new FilteringSelect({
										//		readOnly : edit,
											    searchAttr : "name",
											    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
											    store:stateStore,
											    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta64:"",
											    required : false
											    },"cmbSiNo64");	
									
									var cmbSiNo65 = new FilteringSelect({
										//		readOnly : edit,
											    searchAttr : "name",
											    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
											    store:stateStore,
											    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta65:"",
											    required : false
											    },"cmbSiNo65");	
									
									var cmbSiNo66 = new FilteringSelect({
										//		readOnly : edit,
											    searchAttr : "name",
											    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
											    store:stateStore,
											    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta66:"",
											    required : false
											    },"cmbSiNo66");	
									    	
// Termina Pregunta 6						            
						            
						            
						            
// Inicia Pregunta 7
					 	
									var cmbSiNo7 = new FilteringSelect({
									//		readOnly : edit,
										    searchAttr : "name",
										    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
										    store:stateStore,
										    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta7:"",
										    required : false
										    },"cmbSiNo7");					    	
									    	
// Termina Pregunta 7						            
						            
// Inicia Pregunta 8
					    	
									var cmbSiNo8 = new FilteringSelect({
									//		readOnly : edit,
										    searchAttr : "name",
										    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
										    store:stateStore,
										    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta8:"",
										    required : false
										    },"cmbSiNo8");					    	
									    	
// Termina Pregunta 8						            
						            
						            
						            
// Inicia Pregunta 9
			 			       	
									new DataGrid({
								  		id: 'avanceOtroDt9',
								  		structure: checkDt,
								  		height: '170px',
								  		//width: '450px',
								  		rowSelector: '20px',
								  		onRowClick: function(e){
								            this.edit.rowClick(e);
								            //this.selection.clickSelectEvent(e);
								         },
								         onSelectionChanged: function(item){
									  			var items = this.selection.getSelected();
									  			
												rneSeleccionados9 = dojo.map(items, function(item){
													if(this.store.getValue(item, "objetivo")=="Otro"){
														otrosSeleccionado=1;	
													}										
													
													return this.store.getValue(item, "idActividad");
												}, this);
												
										}
								  	},'avanceOtroDt9').startup();
								   
								    var dataOtroDtA = {
							          		identifier: "idActividad",
							          		items: []
							      	};
								    
								    
							         dataOtroDtA.items = [];
							        	
							        	for(var a in opcionesStore){
							        		if(opcionesStore[a].cPregunta == 9){

									        		var arregloOpciones = {              	
									        				idActividad: opcionesStore[a].identificador,
									        				idObjetivo: opcionesStore[a].identificador,
									        				objetivo: opcionesStore[a].respuesta,
									        				actividad : opcionesStore[a].identificador,
									        	        	meta: "",
			 						        	        	avance: ""
									        		};
									        		dataOtroDtA.items.push(arregloOpciones);
							            		}	
							        	}	        	

							        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
							            registry.byId('avanceOtroDt9').setStore(newStoreOtroDtA);
							            
// Lectura de la Base de datos para mostrar la información capturada en el Checkbox					            
							            
							            if(terceraReunionObj.informeFinal!=null ){
									    	gridpregunta9 = registry.byId('avanceOtroDt9');
									        items = terceraReunionObj.informeFinal.respuesta9.split(",-");
									        //var headerGrid =gridpregunta2.domNode.firstElementChild;
											//headerGrid.style.display="none";
									        for(var a=0; a< items.length; a++){
									        	for ( var j = 0; j < gridpregunta9.rowCount; j++) {
										        	var item9 = gridpregunta9.getItem(j);
										        			        	
										        	if(array.indexOf( items[a], "=" ) != -1 ){
										        		items2s = items[a].split(",=");
										        		if( items2s[0] == gridpregunta9.store.getValue(item9,'idActividad')) {	        			
										        			gridpregunta9.selection.setSelected(j, true);	
											        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
											        		registry.byId('otroDt9').set("value",items2s[1]);
											        		break;
											        	}	
										        	} else {
										        		if( items[a] == gridpregunta9.store.getValue(item9,'idActividad')) {	        			
										        			gridpregunta9.selection.setSelected(j, true);	
											        		break;
											        	}		
										        	}
										        	        		
										        }	
									        }	        	        
								        } 
							            
							            
//termina pregunta 9					            
			            

// Inicia Pregunta 10
								    	
										var cmbSiNo10 = new FilteringSelect({
										//		readOnly : edit,
											    searchAttr : "name",
											    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
											    store:stateStore,
											    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta10:"",
											    required : false
											    },"cmbSiNo10");	

										
										var txtPorQue = new ValidationTextBox({
											id : 'txtPorQue',
											value : terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta10otro:"",
											required : false,
											maxLength : "150",
											placeHolder : "Nota: especifique por qu\u00e9?",
								            style : "width:500px;"
										},'txtPorQue');
										    	
// Termina Pregunta 10							            
							            
							            
							            
							            
							            
							            
// Inicia Pregunta 11
								    	
										var stateStore11 = new Memory({
										    data: [
										        {name:"Si", id:"Si"},
										        {name:"No", id:"No"},
										        {name:"No sabe", id:"No sabe"}
										          ]
											    });		    	
						    	
										var cmbSiNo11 = new FilteringSelect({
										//		readOnly : edit,
											    searchAttr : "name",
											    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
											    store:stateStore11,
											    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta11:"",
											    required : false
											    },"cmbSiNo11");					    	
										    	
// Termina Pregunta 11							            
							            
// Inicia Pregunta 12
								    	
										var stateStore12 = new Memory({
										    data: [
										        {name:"Si", id:"Si"},
										        {name:"No", id:"No"},
										        {name:"No se han colocado en ning\u00fan lugar", id:"No se han colocado en ning\u00fan lugar"}
										          ]
											    });		    	
						    	
										var cmbSiNo12 = new FilteringSelect({
										//		readOnly : edit,
											    searchAttr : "name",
											    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
											    store:stateStore12,
											    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta12:"",
											    required : false
											    },"cmbSiNo12");					    	
										    	
// Termina Pregunta 12							            
							            
 						            
// Inicia Pregunta 13
 							        
										new ValidationTextBox({
											name : "otroDt13",
											id : "otroDt13",
											value: otroRecurso,
											promptMessage : "Capture \u00bfQui\u00e9n?",
											trim : true,
											style : "display:none;width:280px",
											maxLength: 255,
											placeHolder : "Especifique \u00bfQui\u00e9n?",
											required: false
										}, "otroDt13");

										
										new DataGrid({
									  		id: 'avanceOtroDt13',
									  		structure: checkDt,
									  		height: '170px',
									  		//width: '450px',
									  		rowSelector: '20px',
									  		onRowClick: function(e){
									            this.edit.rowClick(e);
									            //this.selection.clickSelectEvent(e);
									         },
									         onSelectionChanged: function(item){
										  			var items = this.selection.getSelected();
										  			
													rneSeleccionados13 = dojo.map(items, function(item){
														if(this.store.getValue(item, "objetivo")=="Otro. \u00bfQui\u00e9n?"){
															otrosSeleccionado=1;	
														}										
														
														return this.store.getValue(item, "idActividad");
													}, this);
													
													if (otrosSeleccionado==1) {
														
														registry.byId('otroDt13').set("style","display:block");	
														registry.byId('otroDt13').set("required",true);	
																		
														otrosSeleccionado=0;		
													} else if (otrosSeleccionado==0) {
												    	registry.byId('otroDt13').set("style","display:none");
														registry.byId('otroDt13').reset();
														registry.byId('otroDt13').set("required",false);						    								
													}				
													
													
											  		}
									  		}
								  	    ,'avanceOtroDt13').startup();
									   
									    var dataOtroDtA = {
								          		identifier: "idActividad",
								          		items: []
								      	};
									    
									    
								         dataOtroDtA.items = [];
								        	
								        	for(var a in opcionesStore){
								        		if(opcionesStore[a].cPregunta == 13){

										        		var arregloOpciones = {              	
										        				idActividad: opcionesStore[a].identificador,
										        				idObjetivo: opcionesStore[a].identificador,
										        				objetivo: opcionesStore[a].respuesta,
										        				actividad : opcionesStore[a].identificador,
										        	        	meta: "",
				 						        	        	avance: ""
										        		};
										        		dataOtroDtA.items.push(arregloOpciones);
								            		}	
								        	}	        	

								        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
								            registry.byId('avanceOtroDt13').setStore(newStoreOtroDtA);
								            
// Lectura de la Base de datos para mostrar la información capturada en el Checkbox					            
								            
								            if(terceraReunionObj.informeFinal!=null ){
										    	gridpregunta13 = registry.byId('avanceOtroDt13');
										        items = terceraReunionObj.informeFinal.respuesta13.split(",-");
										        //var headerGrid =gridpregunta2.domNode.firstElementChild;
												//headerGrid.style.display="none";
										        for(var a=0; a< items.length; a++){
										        	for ( var j = 0; j < gridpregunta13.rowCount; j++) {
											        	var item13  = gridpregunta13.getItem(j);
											        			        	
											        	if(array.indexOf( items[a], "=" ) != -1 ){
											        		items2s = items[a].split(",=");
											        		if( items2s[0] == gridpregunta13.store.getValue(item13,'idActividad')) {	        			
											        			gridpregunta13.selection.setSelected(j, true);	
												        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
												        		registry.byId('otroDt13').set("value",items2s[1]);
												        		break;
												        	}	
											        	} else {
											        		if( items[a] == gridpregunta13.store.getValue(item13,'idActividad')) {	        			
											        			gridpregunta13.selection.setSelected(j, true);	
												        		break;
												        	}		
											        	}
											        	        		
											        }	
										        }	        	        
									        } 
								            
								            
		
//termina pregunta 13
							            
// Inicia Pregunta 14

											new DataGrid({
										  		id: 'avanceOtroDt14',
										  		structure: checkDt,
										  		height: '150px',
										  		//width: '450px',
										  		rowSelector: '20px',
										  		onRowClick: function(e){
										            this.edit.rowClick(e);
										            //this.selection.clickSelectEvent(e);
										         },
										         onSelectionChanged: function(item){
											  			var items = this.selection.getSelected();
											  			
														rneSeleccionados14 = dojo.map(items, function(item){
															if(this.store.getValue(item, "objetivo")=="Otro"){
																otrosSeleccionado=1;	
															}										
															
															return this.store.getValue(item, "idActividad");
														}, this);
														
												}
											},'avanceOtroDt14').startup();
										   
										    var dataOtroDtA = {
									          		identifier: "idActividad",
									          		items: []
									      	};
										    
										    
									         dataOtroDtA.items = [];
									        	
									        	for(var a in opcionesStore){
									        		if(opcionesStore[a].cPregunta == 14){

											        		var arregloOpciones = {              	
											        				idActividad: opcionesStore[a].identificador,
											        				idObjetivo: opcionesStore[a].identificador,
											        				objetivo: opcionesStore[a].respuesta,
											        				actividad : opcionesStore[a].identificador,
											        	        	meta: "",
					 						        	        	avance: ""
											        		};
											        		dataOtroDtA.items.push(arregloOpciones);
									            		}	
									        	}	        	

									        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
									            registry.byId('avanceOtroDt14').setStore(newStoreOtroDtA);
									            
// Lectura de la Base de datos para mostrar la información capturada en el Checkbox					            
									            
									            if(terceraReunionObj.informeFinal!=null ){
											    	gridpregunta14 = registry.byId('avanceOtroDt14');
											        items = terceraReunionObj.informeFinal.respuesta14.split(",-");
											        //var headerGrid =gridpregunta2.domNode.firstElementChild;
													//headerGrid.style.display="none";
											        for(var a=0; a< items.length; a++){
											        	for ( var j = 0; j < gridpregunta14.rowCount; j++) {
												        	var item14  = gridpregunta14.getItem(j);
												        			        	
												        	if(array.indexOf( items[a], "=" ) != -1 ){
												        		items2s = items[a].split(",=");
												        		if( items2s[0] == gridpregunta14.store.getValue(item14,'idActividad')) {	        			
												        			gridpregunta14.selection.setSelected(j, true);	
													        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
													        		registry.byId('otroDt14').set("value",items2s[1]);
													        		break;
													        	}	
												        	} else {
												        		if( items[a] == gridpregunta14.store.getValue(item14,'idActividad')) {	        			
												        			gridpregunta14.selection.setSelected(j, true);	
													        		break;
													        	}		
												        	}
												        	        		
												        }	
											        }	        	        
										        }
									            
									            
//termina pregunta 14							            
							            
// Inicia Pregunta 15
						 			            
										        
												new ValidationTextBox({
													name : "otroDt15",
													id : "otroDt15",
													value: otroRecurso,
													promptMessage : "Capture otra opini\u00f3n",
													trim : true,
													style : "display:none;width:280px",
													maxLength: 255,
													placeHolder : "Especifique OTRO",
													required: false
												}, "otroDt15");

												
												new DataGrid({
											  		id: 'avanceOtroDt15',
											  		structure: checkDt,
											  		height: '170px',
											  		//width: '450px',
											  		rowSelector: '20px',
											  		onRowClick: function(e){
											            this.edit.rowClick(e);
											            //this.selection.clickSelectEvent(e);
											         },
											         onSelectionChanged: function(item){
												  			var items = this.selection.getSelected();
												  			
															rneSeleccionados15 = dojo.map(items, function(item){
																if(this.store.getValue(item, "objetivo")=="Otra opini\u00f3n."){
																	otrosSeleccionado=1;	
																}										
																
																return this.store.getValue(item, "idActividad");
															}, this);
															
															if (otrosSeleccionado==1) {
																
																registry.byId('otroDt15').set("style","display:block");	
																registry.byId('otroDt15').set("required",true);	
																				
																otrosSeleccionado=0;		
															} else if (otrosSeleccionado==0) {
														    	registry.byId('otroDt15').set("style","display:none");
																registry.byId('otroDt15').reset();
																registry.byId('otroDt15').set("required",false);						    								
															}				
															
															
													  		}
											  		}
										  	    ,'avanceOtroDt15').startup();
											   
											    var dataOtroDtA = {
										          		identifier: "idActividad",
										          		items: []
										      	};
											    
											    
										         dataOtroDtA.items = [];
										        	
										        	for(var a in opcionesStore){
										        		if(opcionesStore[a].cPregunta == 15){

												        		var arregloOpciones = {              	
												        				idActividad: opcionesStore[a].identificador,
												        				idObjetivo: opcionesStore[a].identificador,
												        				objetivo: opcionesStore[a].respuesta,
												        				actividad : opcionesStore[a].identificador,
												        	        	meta: "",
						 						        	        	avance: ""
												        		};
												        		dataOtroDtA.items.push(arregloOpciones);
										            		}	
										        	}	        	

										        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
										            registry.byId('avanceOtroDt15').setStore(newStoreOtroDtA);
										            
// Lectura de la Base de datos para mostrar la información capturada en el Checkbox					            
										            
										            if(terceraReunionObj.informeFinal!=null ){
												    	gridpregunta15 = registry.byId('avanceOtroDt15');
												        items = terceraReunionObj.informeFinal.respuesta15.split(",-");
												        //var headerGrid =gridpregunta2.domNode.firstElementChild;
														//headerGrid.style.display="none";
												        for(var a=0; a< items.length; a++){
												        	for ( var j = 0; j < gridpregunta15.rowCount; j++) {
													        	var item15  = gridpregunta15.getItem(j);
													        			        	
													        	if(array.indexOf( items[a], "=" ) != -1 ){
													        		items2s = items[a].split(",=");
													        		if( items2s[0] == gridpregunta15.store.getValue(item15,'idActividad')) {	        			
													        			gridpregunta15.selection.setSelected(j, true);	
														        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
														        		registry.byId('otroDt15').set("value",items2s[1]);
														        		break;
														        	}	
													        	} else {
													        		if( items[a] == gridpregunta15.store.getValue(item15,'idActividad')) {	        			
													        			gridpregunta15.selection.setSelected(j, true);	
														        		break;
														        	}		
													        	}
													        	        		
													        }	
												        }	        	        
											        }
										            
										            
//termina pregunta 15							            

// Inicia Pregunta 16
										            new ValidationTextBox({
														name : "otroDt16",
														id : "otroDt16",
														value: otroRecurso,
														promptMessage : "Capture otra opini\u00f3n",
														trim : true,
														style : "display:none;width:280px",
														maxLength: 255,
														placeHolder : "Especifique OTRO",
														required: false
													}, "otroDt16");

													
													new DataGrid({
												  		id: 'avanceOtroDt16',
												  		structure: checkDt,
												  		height: '170px',
												  		//width: '450px',
												  		rowSelector: '20px',
												  		onRowClick: function(e){
												            this.edit.rowClick(e);
												            //this.selection.clickSelectEvent(e);
												         },
												         onSelectionChanged: function(item){
													  			var items = this.selection.getSelected();
													  			
																rneSeleccionados16 = dojo.map(items, function(item){
																	if(this.store.getValue(item, "objetivo")=="Otro."){
																		otrosSeleccionado=1;	
																	}										
																	
																	return this.store.getValue(item, "idActividad");
																}, this);
																
																if (otrosSeleccionado==1) {
																	
																	registry.byId('otroDt16').set("style","display:block");	
																	registry.byId('otroDt16').set("required",true);	
																					
																	otrosSeleccionado=0;		
																} else if (otrosSeleccionado==0) {
															    	registry.byId('otroDt16').set("style","display:none");
																	registry.byId('otroDt16').reset();
																	registry.byId('otroDt16').set("required",false);						    								
																}				
																
																
														  		}
												  		}
											  	    ,'avanceOtroDt16').startup();
												   
												    var dataOtroDtA = {
											          		identifier: "idActividad",
											          		items: []
											      	};
												    
												    
											         dataOtroDtA.items = [];
											        	
											        	for(var a in opcionesStore){
											        		if(opcionesStore[a].cPregunta == 16){

													        		var arregloOpciones = {              	
													        				idActividad: opcionesStore[a].identificador,
													        				idObjetivo: opcionesStore[a].identificador,
													        				objetivo: opcionesStore[a].respuesta,
													        				actividad : opcionesStore[a].identificador,
													        	        	meta: "",
							 						        	        	avance: ""
													        		};
													        		dataOtroDtA.items.push(arregloOpciones);
											            		}	
											        	}	        	

											        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
											            registry.byId('avanceOtroDt16').setStore(newStoreOtroDtA);
											            
// Lectura de la Base de datos para mostrar la información capturada en el Checkbox					            
											            
											            if(terceraReunionObj.informeFinal!=null ){
													    	gridpregunta16 = registry.byId('avanceOtroDt16');
													        items = terceraReunionObj.informeFinal.respuesta16.split(",-");
													        //var headerGrid =gridpregunta2.domNode.firstElementChild;
															//headerGrid.style.display="none";
													        for(var a=0; a< items.length; a++){
													        	for ( var j = 0; j < gridpregunta16.rowCount; j++) {
														        	var item16 = gridpregunta16.getItem(j);
														        			        	
														        	if(array.indexOf( items[a], "=" ) != -1 ){
														        		items2s = items[a].split(",=");
														        		if( items2s[0] == gridpregunta16.store.getValue(item16,'idActividad')) {	        			
														        			gridpregunta16.selection.setSelected(j, true);	
															        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
															        		registry.byId('otroDt16').set("value",items2s[1]);
															        		break;
															        	}	
														        	} else {
														        		if( items[a] == gridpregunta16.store.getValue(item16,'idActividad')) {	        			
														        			gridpregunta16.selection.setSelected(j, true);	
															        		break;
															        	}		
														        	}
														        	        		
														        }	
													        }	        	        
												        }
											            
											            
//termina pregunta 16										            
										            
// Inicia Pregunta 17
													new DataGrid({
													  		id: 'avanceOtroDt17',
													  		structure: checkDt,
													  		height: '150px',
													  		//width: '450px',
													  		rowSelector: '20px',
													  		onRowClick: function(e){
													            this.edit.rowClick(e);
													            //this.selection.clickSelectEvent(e);
													         },
													         onSelectionChanged: function(item){
														  			var items = this.selection.getSelected();
														  			
																	rneSeleccionados17 = dojo.map(items, function(item){
																		if(this.store.getValue(item, "objetivo")=="Otro."){
																			otrosSeleccionado=1;	
																		}										
																		
																		return this.store.getValue(item, "idActividad");
																	}, this);
																	
															  		}
														},'avanceOtroDt17').startup();	
													   
													    var dataOtroDtA = {
												          		identifier: "idActividad",
												          		items: []
												      	};
													    
													    
												         dataOtroDtA.items = [];
												        	
												        	for(var a in opcionesStore){
												        		if(opcionesStore[a].cPregunta == 17){

														        		var arregloOpciones = {              	
														        				idActividad: opcionesStore[a].identificador,
														        				idObjetivo: opcionesStore[a].identificador,
														        				objetivo: opcionesStore[a].respuesta,
														        				actividad : opcionesStore[a].identificador,
														        	        	meta: "",
								 						        	        	avance: ""
														        		};
														        		dataOtroDtA.items.push(arregloOpciones);
												            		}	
												        	}	        	

												        	var newStoreOtroDtA = new ItemFileWriteStore({data: dataOtroDtA});
												            registry.byId('avanceOtroDt17').setStore(newStoreOtroDtA);
												            
// Lectura de la Base de datos para mostrar la información capturada en el Checkbox					            
												            
												            if(terceraReunionObj.informeFinal!=null ){
														    	gridpregunta17 = registry.byId('avanceOtroDt17');
														        items = terceraReunionObj.informeFinal.respuesta17.split(",-");
														        //var headerGrid =gridpregunta2.domNode.firstElementChild;
																//headerGrid.style.display="none";
														        for(var a=0; a< items.length; a++){
														        	for ( var j = 0; j < gridpregunta17.rowCount; j++) {
															        	var item17 = gridpregunta17.getItem(j);
															        			        	
															        	if(array.indexOf( items[a], "=" ) != -1 ){
															        		items2s = items[a].split(",=");
															        		if( items2s[0] == gridpregunta17.store.getValue(item17,'idActividad')) {	        			
															        			gridpregunta17.selection.setSelected(j, true);	
																        		//gridRNE1.store.setValue(item2, 'meta', items2s[1]);
																        		registry.byId('otroDt17').set("value",items2s[1]);
																        		break;
																        	}	
															        	} else {
															        		if( items[a] == gridpregunta17.store.getValue(item17,'idActividad')) {	        			
															        			gridpregunta17.selection.setSelected(j, true);	
																        		break;
																        	}		
															        	}
															        	        		
															        }	
														        }	        	        
													        }
												            
												            
//termina pregunta 17										            
										            
										            
//Inicia pregunta 18									            
												            var cmbSiNo18 = new FilteringSelect({
																//		readOnly : edit,
																	    searchAttr : "name",
																	    placeHolder : "Nota: seleccione una opci\u00f3n Si/No.",
																	    store:stateStore,
																	    value: terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta18:"",
																	    required : false
																	    },"cmbSiNo18");	

																
																var txtPorQue18 = new ValidationTextBox({
																	id : 'txtPorQue18',
																	value : terceraReunionObj.informeFinal!=null?terceraReunionObj.informeFinal.respuesta18otro:"",
																	required : false,
																	maxLength : "150",
																	placeHolder : "Nota: especifique por qu\u00e9?",
														            style : "width:500px;"
																},'txtPorQue18');	
																
																
																
										            
//termina pregunta 18											            
																 					            
				}
				
			}else{
			
				utils.cerrarPestania(idinforme);
			}
		}	
		

		
	/* vblake codigo original
	 
	 
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
						beneficiarios:'',
						cNee1:1,
						nomNee1:'',
						gestion1:'',
						beneficiarios1:'',
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
									'<td align="right"><label>*Beneficiarios : </label></td>'+
									'<td><input id="txtBeneficiarios"/></td>'+
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
									'<td align="right"><label>Beneficiarios: </label></td>'+
									'<td><input id="txtBeneficiarios1"/></td>'+
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
			
			var txtGestion = new ValidationTextBox({
				id:'txtGestion',
				value: itemToEdit.gestion,
				readOnly : edit,
				maxLength : "150",
				required: true,
				placeHolder : "Nota: agregar los apoyos a gestionar separados por una coma.",
	        },"txtGestion");
			

			

			var txtBeneficiarios = new ValidationTextBox({
				id:'txtBeneficiarios',
				value: itemToEdit.beneficiarios,
				maxLength : "3",
				required: true,
				regExp : constants.NUMBER_VALID_NOT_ZERO
	        },"txtBeneficiarios");
			
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
			
			
			var txtBeneficiarios1=new ValidationTextBox({
				id:'txtBeneficiarios1',
				value:itemToEdit.beneficiarios1,
				maxLength:"3",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtBeneficiarios1');
			

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
								gridNecesidad.store.setValue(item, 'beneficiarios',txtBeneficiarios.get('value'));
								gridNecesidad.store.setValue(item, 'nomNee', cmbTipoNecesidad1.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'gestion1',txtGestion1.get('value'));
								gridNecesidad.store.setValue(item, 'beneficiarios1',txtBeneficiarios1.get('value'));
								gridNecesidad.update();
							}else{
								var myNewItem = {
									id: gridNecesidad.rowCount + 1,
									cApoyo : cmbNecesidad.get('value'),
									necesidad :cmbNecesidad.get('displayedValue'),
									cNee : cmbTipoNecesidad.get('value'),
									nomNee : cmbTipoNecesidad.get('displayedValue'),
									gestion: txtGestion.get('value'),
									beneficiarios : txtBeneficiarios.get('Value'),
									cNee1 : cmbTipoNecesidad1.get('value'),
									nomNee1 : cmbTipoNecesidad1.get('displayedValue'),
									gestion1: txtGestion1.get('value'),
									beneficiarios1 : txtBeneficiarios1.get('Value'),
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
					numveces:'',
					beneficiarios:'',
					
				};
			}else{			
				edit=true;
			}
			
			
			var idVentana='popUPBullying';
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
									'<td align="right"><label>* Beneficiarios: </label></td>'+
									'<td><input id="txtBeneficiarios"/></td>'+'</tr>'+
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

			var txtNumAccion = new ValidationTextBox({
				readOnly : edit,
				value : itemToEdit.numveces,
				required : true,
				maxLength :"150",
				placeHolder : "Nota: agregar accion o apoyo  a emprender.",
	            style : "width:500px;"
			},'txtNumAccion');
			
			var txtBeneficiarios = new ValidationTextBox({
				value: itemToEdit.beneficiarios,
				require:true,
				maxlength:"3",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtBeneficiarios');
			
			
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
								gridBullying.store.setValue(item, 'numveces',txtNumAccion.get('value'));
								gridBullying.store.setValue(item, 'beneficiarios',txtBeneficiarios.get('value'));
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
									beneficiarios: txtBeneficiarios.get('value'),
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
*/
		
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
						seconcreto:'',
						consiste:'',
						cuantos:'',
						cNee1:1,
						nomNee1:'',
						gestion1:'',
						seconcreto1:'',
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
									'<td align="right"><label>*Apoyo que se program\u00f3 gestionar: </label></td>'+	
									'<td><input id="txtGestion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*Se concret\u00f3 : </label></td>'+
									'<td><input id="cmbConcreto"/></td>'+
								'</tr>'+
								'<tr>'+
			 						'<td align="right"><label>*En qu\u00e9 consisti\u00f3 el apoyo: </label></td>'+
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
									'<td align="right"><label>*Apoyo que se program\u00f3 gestionar: </label></td>'+
									'<td><input id="txtGestion1"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>Se concret\u00f3 : </label></td>'+
									'<td><input id="cmbConcreto1"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>*En qu\u00e9 consisti\u00f3 el apoyo: </label></td>'+
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
		            {name:"No", id:"No"}
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
				regExp : constants.NUMBER_VALID_NOT_ZERO
	        },"txtCuantos");
			

			var cmbConcreto=new FilteringSelect({
				value:itemToEdit.seconcreto,
				store:stateStore,
				required: true,
				maxLength:"2",
			}, 'cmbConcreto');
			
			
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
				regExp : constants.NUMBER_VALID_NOT_ZERO
	        },"txtCuantos1");
			
			
			var cmbConcreto1=new FilteringSelect({
				value:itemToEdit.seconcreto1,
				maxLength:"2",
				store:stateStore,
			}, 'cmbConcreto1');
			
	
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
								gridNecesidad.store.setValue(item, 'seconcreto',cmbConcreto.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'consiste',txtConsiste.get('value'));
								gridNecesidad.store.setValue(item, 'cuantos',txtCuantos.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'nomNee', cmbTipoNecesidad1.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'seconcreto1',cmbConcreto1.get('displayedValue'));
								gridNecesidad.store.setValue(item, 'consiste1',txtConsiste1.get('value'));
								gridNecesidad.store.setValue(item, 'cuantos1',txtCuantos1.get('displayedValue'));
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
									seconcreto : cmbConcreto.get('displayedValue'),
									consiste : txtConsiste.get('displayedValue'),
									cuantos : txtCuantos.get('displayedValue'),
									cNee1 : cmbTipoNecesidad1.get('value'),
									nomNee1 : cmbTipoNecesidad1.get('displayedValue'),
									gestion1: txtGestion1.get('value'),
									seconcreto1 : cmbConcreto1.get('displayedValue'),
									consiste1 : txtConsiste1.get('displayedValue'),
									cuantos1 : txtCuantos1.get('displayedValue'),
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
					seconcreto:'',
					numveces:'',
					cuantos:''
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
									'<td align="right"><label>* Se concret\u00f3: </label></td>'+
									'<td><input id="cmbConcreto"/></td>'+'</tr>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Acci\u00f3n que se program\u00f3 emprender o apoyo a gestionar: </label></td>'+
									'<td><input id="txtNumAccion"/></td>'+
								'</tr>'+
								'<tr>'+
			 						'<td align="right"><label>* N\u00famero de casos presentados: </label></td>'+
									'<td><input id="txtCuantos"/></td>'+
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
			
			
	 		var txtCuantos = new ValidationTextBox({
				id:'txtCuantos',
				value: itemToEdit.cuantos,
				//	readOnly : edit,
				maxLength : "150",
				required: true,
				regExp : constants.NUMBER_VALID_NOT_ZERO
			//	placeHolder : "Nota: agregar en que consiste el apoyo",
			},"txtCuantos");
			
			
			var cmbConcreto = new FilteringSelect({
				value: itemToEdit.seconcreto,
				require:true,
				maxlength:"10",
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
								gridBullying.store.setValue(item, 'seconcreto',cmbConcreto.get('displayedValue'));
								gridBullying.store.setValue(item, 'cuantos', txtCuantos.get('displayedValue'));
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
									seconcreto: cmbConcreto.get('displayedValue'),
									cuantos: txtCuantos.get('displayedValue'),
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
		
		
/* vblake se comenta el codigo original		
		
		function _planDTrabajo(crearPlan){
			var id="plnTrabajo";
			var idGrid = 'gridPlanTrabajo';
			var idPanelSecundario = "planTrabajoPane";
			var accionesEncontradas=new Array();
			var planTrabajoObj=terceraReunionObj.planTrabajo?terceraReunionObj.planTrabajo:[];
			var layoutPlnTrabajo = [[{name:'cApoyo',field:'cApoyo',hidden:true},
			                         {name:'Apoyo', width:'580px',styles:'text-align: left;',field:'apoyoRecibido'},
			                         {name:'Cumplimiento', width:'300px',styles:'text-align: left;',field:'accion'},
			                         {name:'idAccion',field:'idAccion',hidden:true},
			                         {name:'Reunion',field:'reunion',hidden:true},
			                         {name:'idRespuesta',field:'idRespuesta',hidden:true},
			                         {name:'tipoRespuesta',field:'tipoRespuesta',hidden:true},
			                         {name:'Otros',field:'otros',hidden:true}]];
			if(crearPlan){
				if(!registry.byId(id)){
					for(var i in planTrabajoObj){
						var accion = {
							    cApoyo : planTrabajoObj[i].accion.cTipoAccion,		
							    apoyoRecibido : !planTrabajoObj[i].nomOtra?planTrabajoObj[i].accion.descripCortar3:planTrabajoObj[i].accion.brigadaEsp? planTrabajoObj[i].accion.descripCortar3 +" Especifique cu\u00E1l: "+ planTrabajoObj[i].nomOtra:planTrabajoObj[i].accion.descripCortar3 +": "+ planTrabajoObj[i].nomOtra,
							    accion : !planTrabajoObj[i].numVecesr3?planTrabajoObj[i].respuestaR3:planTrabajoObj[i].numVecesr3,
							    idAccion : planTrabajoObj[i].cAccion,
							    reunion : planTrabajoObj[i].cReunion,
							    tipoRespuesta : planTrabajoObj[i].accion.cTipoRespuesta,
							    idRespuesta : planTrabajoObj[i].cRespuestar3,
							    otros : planTrabajoObj[i].nomOtra
							};
						accionesEncontradas.push(accion);
					}
					
					utils.crearPanel(id,"Plan de trabajo",idPanelSecundario);
					//Crear tabla con la formación de BD.
					utils.crearGrid(idPanelSecundario,layoutPlnTrabajo,'idAccion',accionesEncontradas,idGrid);
					//Sección para los botones.
					_agregarFilaGrid(constants.PLAN_TRABAJO,idPanelSecundario,idGrid);
					
					utils.createTag('input','edit'+id,idPanelSecundario);
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId(idGrid);
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
										_pop_up(idGrid,constants.PLAN_TRABAJO,itemToEdit);
									}
								}); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'edit'+id);
					
					utils.eliminarFilaGrid(idGrid,idPanelSecundario,constants.TERCERA_REUNION,true);
					utils.pestaniaSelect(id);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
*/
		function _planDTrabajo(crearPlan){
			var id="plnTrabajo";
			var idPlanTrabajo=5;
			var idPanelSecundario = "planTrabajoPane";
			var accionesEncontradas=new Array();
			var planTrabajoObj=terceraReunionObj.planTrabajo?terceraReunionObj.planTrabajo:[];
			var layoutPlnTrabajo = [[{name:'columna1',field:'id',hidden:true},
			                         {name:'columna2',field:'cApoyo',hidden:true},
			                         {name:'Apoyo', width:'650px',styles:'text-align: left;',field:'apoyoRecibido'},
			                         {name:'Cumplimiento / Avance', width:'150px',styles:'text-align: left;',field:'accion'},
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
							     apoyoRecibido : !planTrabajoObj[i].nomOtra?planTrabajoObj[i].accion.descripCortar3:planTrabajoObj[i].accion.brigadaEsp? planTrabajoObj[i].accion.descripCortar3 +" : "+ planTrabajoObj[i].nomOtra:planTrabajoObj[i].accion.descripCortar3 +": "+ planTrabajoObj[i].nomOtra,
							//     accion : !planTrabajoObj[i].numVecesr3?planTrabajoObj[i].respuestaR3:planTrabajoObj[i].numVecesr3,
							     accion : planTrabajoObj[i].numVecesr3,
							     idAccion : planTrabajoObj[i].cAccion,
							     reunion : planTrabajoObj[i].cReunion,
							     tipoRespuesta : planTrabajoObj[i].accion.cTipoRespuesta,
							     idRespuesta : planTrabajoObj[i].cRespuestar3,
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
					
					utils.eliminarFilaGrid('gridApoyo'+idPlanTrabajo,idPanelSecundario,constants.TERCERA_REUNION,true);
					utils.pestaniaSelect(id);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
		
		function _diagnostico(crearDiag){
			var id = "diagPestania";
			var idPanelSecundario = "diagPane";
			var idGrid = 'gridDiagnostico';
			var diagnosticoObj=terceraReunionObj.diagnosticoCierre?terceraReunionObj.diagnosticoCierre:[];
			var diagEncontrados=new Array();
			var layoutDiag = [[ {name:'cDesercion',field:'cDesercion',hidden:true},
								{name:'Deserci\u00F3n', width:'580px',styles:'text-align: left;',field:'pregunta'},
								{name:'Cantidad', width:'300px',styles:'text-align: left;',field:'cantidad'},
								{name:'Reunion',field:'reunion',hidden:true}]];
			if(crearDiag){
				if(!registry.byId(id)){
					for(var i in diagnosticoObj){
						var diag = {
								cDesercion : diagnosticoObj[i].cDesercion,
								pregunta : diagnosticoObj[i].preguntaLarga,
								cantidad : diagnosticoObj[i].cantidad,
								reunion : diagnosticoObj[i].cReunion
							};
						diagEncontrados.push(diag);
					}
					
					utils.crearPanel(id,"Diagn\u00F3stico de cierre",idPanelSecundario);
					//Crear tabla con la formación de BD.
					utils.crearGrid(idPanelSecundario,layoutDiag,'cDesercion',diagEncontrados,idGrid);
					//Sección para los botones.
					_agregarFilaGrid1(constants.DIAGNOSTICO,idPanelSecundario,idGrid);
					
					utils.createTag('input','edit'+id,idPanelSecundario);
					new Button({
						label:'Editar',
						onClick:function(){
							var grid = registry.byId(idGrid);
							var items = grid.selection.getSelected();
							if(items.length==1){
								dojo.forEach(items, function(selectedItem){
									if(selectedItem !== null){
										var itemToEdit={
											//Crea un arreglo con toda la información del elemento seleccionado
											//en el grid para poder editar la información.
											cDesercion : grid.store.getValue(selectedItem,'cDesercion'),
											pregunta : grid.store.getValue(selectedItem,'pregunta'),
											cantidad : grid.store.getValue(selectedItem,'cantidad'),
											reunion : grid.store.getValue(selectedItem,'reunion')
										};
										_pop_up(idGrid,constants.DIAGNOSTICO,itemToEdit);
									}
								}); 
					         }else{
					        	 utils.cstmAlert('Debe seleccionar s\u00f3lo un registro.');
					         }
						}
					},'edit'+id);
					
					utils.eliminarFilaGrid(idGrid,idPanelSecundario,constants.TERCERA_REUNION,true);
					utils.pestaniaSelect(id);
				}
			}else{
				utils.cerrarPestania(id);
			}
		}
		
		function _evaluacion(crearEvaluacion){
			var id = "evaluacionPestania";
			var idPanelSecundario = "evaluacionPane";
			var evaluacionObj=terceraReunionObj.encuestaSatisfaccion?terceraReunionObj.encuestaSatisfaccion:[];
			var tablaHTML = '<table border="0" align="left" width= "900px" cellspacing="10">';
			if(crearEvaluacion){
				if(!registry.byId(id)){
					//Se crea el bloque para poder almacenar la tlaba HTML
					utils.crearPanel(id,"Actividades de cierre",idPanelSecundario);
					
					for(var i in evaluacionObj){
						tablaHTML = tablaHTML + '<tr>'+
													'<td width= "600px"><p>'+ utils.dividirString(evaluacionObj[i].nombreActividad,180) +'</p></td>'+
													'<td width= "500px">';
						var respuestas = evaluacionObj[i].respuestas;
						for(var j in respuestas){
							tablaHTML = tablaHTML + '<input id="pregunta_'+ i +'_resp_'+ j +'"/><label for="pregunta_'+ i +'_resp_'+ j +'">'+ respuestas[j].nomRespuesta +'</label><br/>';
						}						
						tablaHTML = tablaHTML + '</td>'+
											'</tr>';
					}	
					dom.byId(idPanelSecundario).innerHTML = tablaHTML + '</table>';

					for(var i in evaluacionObj){
						var respuestas = evaluacionObj[i].respuestas;
						for(var j in respuestas){
							var respuestaSelect = false;							
							if(evaluacionObj[i].cRespuesta==respuestas[j].cRespuesta){
								respuestaSelect = true;
							}
							new RadioButton({
								checked: respuestaSelect,
								value: respuestas[j].cRespuesta,
								name: 'pregunta_'+ i,
								id: 'pregunta_'+ i +'_resp_'+ j
							},'pregunta_'+ i +'_resp_'+ j);
						}
					}
					utils.pestaniaSelect(id);
				}
			}else{
				utils.cerrarPestania(id);
			}
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
		        store: apoyoConafeStore,
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
					accion: '',
					beneficiarios : '',
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
									'<td align="right"><label>* Acci\u00f3n realizada: </label></td>'+
									'<td><input id="txtAccion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de beneficiarios: </label></td>'+
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
			
			
			var cmbApoyosf = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        value: itemToEdit.cApoyo,
		        store: apoyoFederalesStore,
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
				id :'txtCantidad',
				value: itemToEdit.cantidad,
				require:true,
				maxlength:"7",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtCantidad');
			
			
			var txtAccion = new ValidationTextBox({
				id:'txtAccion',
				value: itemToEdit.accion,
				maxlength:"150",
			 	placeHolder : "Nota: describa la acci\u00f3n realizada.",
	            style : "width:500px;"
				},'txtAccion');
			
			
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
					if (!form.validate() || registry.byId('cmbApoyosf').get('value')==-1 || registry.byId('txtCantidad').get('value')==-1){  
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
								gridFederal.store.setValue(item, 'accion',txtAccion.get('value'));
								gridFederal.store.setValue(item, 'beneficiarios',txtBenefi.get('value'));
								gridFederal.update();
							}
							else{
								var myNewItem = {
									id : gridFederal.rowCount + 1,
									cApoyo : cmbApoyosf.get('value'),
									apoyo : cmbApoyosf.get('displayedValue'),
									cual : txtCual.get('value'),
									cantidad: txtCantidad.get('value'),
									accion: txtAccion.get('value'),
									beneficiarios: txtBenefi.get('value')

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
					especifique:'',
					cantidad:'',
					accion : '',
					beneficiarios : '',					
				//	gestion : '',
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
									'<td align="right"><label>* Cantidad: </label></td>'+
									'<td><input id="txtCantidad"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* Acci\u00f3n realizada: </label></td>'+
									'<td><input id="txtAccion"/></td>'+
								'</tr>'+
								'<tr>'+
									'<td align="right"><label>* N\u00famero de beneficiarios: </label></td>'+
									'<td><input id="txtBenefiEstatal"/></td>'+
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
				store: apoyoEstatalStore,
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
			
			
			var txtCantidad = new ValidationTextBox({
				id:'txtCantidad',
				value: itemToEdit.cantidad,
				require:true,
				maxlength:"7",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			},'txtCantidad');
			
			
			var txtAccion = new ValidationTextBox({
				id:'txtAccion',
				value: itemToEdit.accion,
				maxlength:"150",
				placeHolder : "Nota: describa la acci\u00f3n realizada.",
	            style : "width:500px;"
				},'txtAccion');
			
				
			
	/*		var txtDescribirEstatal = new ValidationTextBox({
				id:'txtDescribirEstatal',
				value: itemToEdit.describir,
				maxlength:"150",
				placeHolder : "Nota: describa tipo de apoyo estatal.",
	            style : "width:500px;"
				},'txtDescribirEstatal');
	*/		
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
					if (!form.validate() || registry.byId('cmbApoyosE').get('value')==-1){  
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
							 	gridEstatal.store.setValue(item, 'cantidad',txtCantidad.get('value'));
								gridEstatal.store.setValue(item, 'accion',txtAccion.get('value'));
								gridEstatal.store.setValue(item, 'beneficiarios',txtBenefiEstatal.get('value'));
								//gridEstatal.store.setValue(item, 'gestion',cmbGestionar.get('displayedValue'));
								gridEstatal.update();
							}
							else{
					//			utils.cstmAlert(txtAccion.get('value'));
								var myNewItem = {
									id : gridEstatal.rowCount + 1,
									cApoyo : cmbApoyosE.get('value'),
									apoyo : cmbApoyosE.get('displayedValue'),
							 		especifique: txtOtraAccion.get('value'),
							 		cantidad: txtCantidad.get('value'),
									accion : txtAccion.get('value'),
									beneficiarios : txtBenefiEstatal.get('value')
								//	gestion : cmbGestionar.get('value')
								};
								gridEstatal.store.newItem(myNewItem);
							}
						    registry.byId(idVentana).destroyRecursive(false);
						} 
						
				  		catch (e) {
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

		
		function _popupApoyos(tpoApoyo,itemToEdit){
			var edit = false;
			var exitenBrigadas = false;
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
			
			
			var idVentana = 'popup_TerceraReunion';
			var dDetail =new Dialog({
				id : idVentana,
				title : "Plan de trabajo",
				content : '<table border="0">'+
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
				'<td ><label>* Cumplimiento: </label></td>'+
				'<td><input id="cmbNumVeces"/></td>'+
			'</tr>'+
			'<tr>'+
				'<tr id="visible2" style="display:none">'+
				'<td ><label>* Avance: </label></td>'+
				'<td><input id="cmbNumVeces1"/></td>'+
			'</tr>'+
	 		'<tr>'+
				'<tr id="visible3" style="display:none">'+
				'<td ><label>* Especifique cu\u00e1l: </label></td>'+
				'<td><input id="txtEspeCual"/></td>'+
			'</tr>'+
	 	 	'<tr>'+
				'<td><div id="lblOtraAccion" style="display:none;"></div></td>'+
				'<td><div id="divOtraAccion" style="display:none;"><input id="txtEspecifique"></div></td>'+
			'</tr>'+
			'<tr>'+
			'<td><div id="lblEspeCual" style="display:none;"></div></td>'+
			'<td><div id="divEspeCual" style="display:none;"><input id="txtEspeCual"></div></td>'+
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
		
				esPlanTrabajo = true;
		
//			Creamos la tabla con los elementos que tendrá el Pop UP.
	
		
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
					value: itemToEdit.idAccion,
		            searchAttr: "name",
		            onChange: function(){
		            	if(cmbAccion.item.hayOtros) { 
		             		if(cmbAccion.item.hayOtros){
		         	             exitenOtros = true;
		         	             dom.byId('lblOtraAccion').innerHTML='<label>* Especifique cu\u00E1l otra accion: </label>';
		         	        }else{
		         	             exitenOtros = false;
		         	             dom.byId('lblOtraAccion').innerHTML='<label>* Especifique: </label>';
		         	        }    		
		            		
		               		document.getElementById('lblOtraAccion').style.display='block';
		    				document.getElementById('divOtraAccion').style.display='block';
		    	    		registry.byId("txtEspecifique").set("required", true);
		    	    	}else{
		     				document.getElementById('lblOtraAccion').style.display='none';
		    				document.getElementById('divOtraAccion').style.display='none';
		    				registry.byId("txtEspecifique").set("required", false);
		    	    	}
		            	
		            	if(cmbAccion.item.id==22){
		            		dom.byId('visible3').style.display='block';
		            		dom.byId('visible2').style.display='none';
		            		dom.byId('visible1').style.display='none';
		            	}
		            			            	
		            	
		            	if(cmbAccion.item.id==1 || cmbAccion.item.id==2 || cmbAccion.item.id==3 || cmbAccion.item.id==4){
		            		dom.byId('visible1').style.display='block';
		            		dom.byId('visible2').style.display='none';
		               		dom.byId('visible3').style.display='none';
		            		
		            	}
		            	if (cmbAccion.item.id!=1 && cmbAccion.item.id!=2 && cmbAccion.item.id!=3 && cmbAccion.item.id!=4 && cmbAccion.item.id!=22){
		            		dom.byId('visible2').style.display='block';
		            		dom.byId('visible1').style.display='none';
		               		dom.byId('visible3').style.display='none';
		            	}
		            }
		        },"cmbAccion");			
				
			
			
			var stateStore = new Memory({
		        data: [
		            {name:"[Seleccione]",id:"-1"}, 
		            {name:"Siempre", id:"Siempre"},
		            {name:"La mayor\u00eda de las veces", id:"La mayor\u00eda de las veces"},
		            {name:"Algunas veces", id:"Algunas veces"},
		            {name:"Nunca", id:"Nunca"}  
		        ]
		    });
			
			var cmbNumVeces = new FilteringSelect({
				//readOnly : edit,
		        searchAttr : "name",
		        store:stateStore,  
		        value: itemToEdit.accion,
		      //  required : true  sirve para que sea obligatorio de captura el campo
		     
		    },"cmbNumVeces");
			
			
			var stateStore1 = new Memory({
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
	
				
			var cmbNumVeces1 = new FilteringSelect({
				//readOnly : edit,
		        searchAttr : "name",
		        store:stateStore1,
		        value: itemToEdit.accion,
		      //  required : true	sirve para que sea obligatorio de captura el campo
		     
		    },"cmbNumVeces1");
				
			
			
			var txtEspecifique = new ValidationTextBox({
				value : itemToEdit.otros,
				maxLength : 150,
				placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
	            style : "width:500px;"
			}, 'txtEspecifique');

		 	if(itemToEdit.reunion==constants.SEGUNDA_REUNION){
				registry.byId('txtEspecifique').set('readOnly',true);
			}
		 	
			var txtEspeCual = new ValidationTextBox({
				value : itemToEdit.otros,
				maxLength : 150,
				placeHolder : "Nota: especifique Cu\u00e1l.",
	            style : "width:500px;"
			}, 'txtEspeCual');

	/*	 	if(itemToEdit.reunion==constants.TERCERA_REUNION){
				registry.byId('txtEspeCual').set('readOnly',false);
			}
	*/	 	
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
					var desc="";
					var tipo=0;
					if (registry.byId('cmbApoyo').get('value')==-1 || registry.byId('cmbAccion').get('value')==-1){	
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
		   	
					
				  	if (cmbAccion.item.id==1 || cmbAccion.item.id==2 || cmbAccion.item.id==3 || cmbAccion.item.id==4){
						tiponumVeces=cmbNumVeces.get('value');
					}
					else {
						tiponumVeces=cmbNumVeces1.get('value');
					}
					
				  	if (cmbAccion.item.id==22){
					tiponumVeces='Si';
				  	}
		 
				  	
					if(tiponumVeces=="" || tiponumVeces=="-1" ){
						utils.cstmAlert('Favor de registrar cuantas veces se ejecuta dentro del ciclo escolar');
						return false;
					}
				 	
					if(txtEspeCual.get('value')!=null && txtEspeCual.get('value')!=""  &&  cmbAccion.get('value')==22){
						desc=': '+txtEspeCual.get('value');
						tipo=1;
					}
					if(txtEspecifique.get('value')!=null  && txtEspecifique.get('value')!="" &&  cmbAccion.get('value')==20){
						desc=': '+txtEspecifique.get('value');
						tipo=2;
					}
					var gridGenerico = registry.byId('gridApoyo'+tpoApoyo);
					try{
						if(edit){
							var index = gridGenerico.selection.selectedIndex;
							var item = gridGenerico.getItem(index);
								if(registry.byId('cmbAccion').get('value')==-1) {
									utils.cstmAlert('Favor de registrar los datos requeridos');
									return false;
								}
									gridGenerico.store.setValue(item, 'apoyoRecibido',cmbAccion.get('displayedValue')+desc);
									gridGenerico.store.setValue(item, 'accion',tiponumVeces);
									gridGenerico.store.setValue(item, 'reunion',itemToEdit.reunion);
									gridGenerico.store.setValue(item, 'tipoRespuesta',!txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2);
									gridGenerico.store.setValue(item, 'idRespuesta',!txtResSimple.get('value')?cmbResMultiple.get('value'):0);
									gridGenerico.store.setValue(item, 'otros',tipo==2?txtEspecifique.get('value'):tipo==1?txtEspeCual.get('value'):"");
								gridGenerico.update();	 
						}else{
							try {
								var myNewItem = null;
										if(registry.byId('cmbAccion').get('value')==-1 ){
										utils.cstmAlert('Favor de registrar los datos requeridos');
										return false;
									}
						 
									myNewItem = {
										id: gridGenerico.rowCount + 1,
										cApoyo : cmbApoyo.get('value'),
										apoyoRecibido : cmbAccion.get('displayedValue')+desc,
										accion : tiponumVeces,
										idAccion : cmbAccion.get('value'),
										reunion : constants.TERCERA_REUNION,
										tipoRespuesta : !txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2,
										idRespuesta :  !txtResSimple.get('value')?cmbResMultiple.get('value'):0,
										otros : tipo==2?txtEspecifique.get('value'):tipo==1?txtEspeCual.get('value'):"",
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
		
		
		
		
		
		function _pop_up(idGridSelect,tpoApoyo,itemToEdit){
			if(tpoApoyo !="Bullying" && tpoApoyo !="Necesidad"){
			var idVentana = 'popup_TerceraReunion';
			var textoApoyo = '* Apoyo: ';
			var exitenBrigadas  = false;
			var esPlanTrabajo = false;
			var esDiagCierre = false;
			var tituloVentana = "";
			var noAPlica = "N/A";
			var edit = false;
			
			if(!itemToEdit){
				itemToEdit={
					cApoyo : -1,
					cDesercion : - 1,
					apoyoRecibido : '',
					economico : '',
					cantidad : '',
					cantidadSegunda : '',
					descripcion : '',
					reunion : '',
					otros : '',
					accion : '',
					pregunta : '',
					idAccion : -1,
					tipoRespuesta : 0,
					idRespuesta : -1
				};
			}else{
				edit=true;
			}
			}
			//Titulo de la ventana
			if(tpoApoyo==constants.APOYO_CONAFE){
				tituloVentana="Apoyo CONAFE";
			}else if(tpoApoyo==constants.APOYO_FEDERAL){
				tituloVentana="Apoyo federal";
			}else if(tpoApoyo==constants.APOYO_ESTATAL){
				tituloVentana="Apoyo estatal o municipal";
			}else if(tpoApoyo==constants.APOYO_NECESIDAD){
				tituloVentana="Necesidades educativas especiales";
			}else if(tpoApoyo==constants.PLAN_TRABAJO){
				tituloVentana="Plan de trabajo";
				esPlanTrabajo=true;
			}
			
	/*		else if(tpoApoyo=="Necesidad"){
				_popupNecesidad(itemToEdit);
				//_popupBullying();
			}else if(tpoApoyo =="Bullying"){
				_popupBullying(itemToEdit);
			}  */
			
			else{
				tituloVentana="Diagn\u00F3stico de cierre";
				esDiagCierre=true;
				textoApoyo='* Deserci\u00F3n: ';
			}
			if(tpoApoyo !="Bullying" && tpoApoyo !="Necesidad"){
			var tablaHTML = '<table border="0">'+
								'<tr>'+
									'<td align="right"><div id="divLBLApoyo" ><label>'+ textoApoyo +'</label></td>'+
									'<td><div id="divInputApoyo"><input id="cmbApoyo"/></td>'+
								'</tr>';
	/*		if(esPlanTrabajo){
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
			}else
	*/		
			 if(esDiagCierre){
				tablaHTML = tablaHTML + '<tr>'+
											'<td align="right"><div id="divLBLCantidad"><label>* Cantidad: </label></div></td>'+
											'<td><div id="divInputCantidad"><input id="txtCantidad"/></div></td>'+
										'</tr>';
			}else{
				tablaHTML = tablaHTML + '<tr>'+
											'<td align="right"><div id="divLBLEconomico"><label>* Econ\u00F3mico: </label></div></td>'+
											'<td><div id="divInputEconomico"><input id="txtEconomico"/></div></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><div id="divLBLCantidadSegunda"></div></td>'+
											'<td><div id="divInputCantidadSegunda"><input id="txtCantidadSegunda"/></div></td>'+
										'</tr>'+
										'<tr>'+
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
			
			//Se definen los widget's
			var cmbApoyo = new FilteringSelect({
				readOnly : edit,
		        searchAttr : "name",
		        store: new Memory({data:[{id:"-1" , name:"[Seleccione]"}]}),
		    },"cmbApoyo");
			
			var txtEconomico = new ValidationTextBox({
				value : itemToEdit.economico,
				maxLength:"6",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtEconomico');
			
			var txtCantidad = new ValidationTextBox({
				value : itemToEdit.cantidad,
				maxLength:"4",
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtCantidad');
			
			var txtCantidadSegunda = new ValidationTextBox({
				value : itemToEdit.cantidadSegunda,
				maxLength:"4",
				readOnly : true,
				regExp : constants.NUMBER_VALID_NOT_ZERO
			}, 'txtCantidadSegunda');
			
			var txtEspecifique = new ValidationTextBox({
				value : itemToEdit.otros,
				maxLength : 150,
				placeHolder : "Nota: agregar los otros tipos de apoyos no considerados separados por una coma.",
	            style : "width:500px;"
			}, 'txtEspecifique');
			
	/*		if(esPlanTrabajo){
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
*/
			//En esta parte se carga el store del combo principal.
/*			if(tpoApoyo==constants.APOYO_CONAFE){
				registry.byId('cmbApoyo').set('store',apoyoConafeStore);
			}else if(tpoApoyo==constants.APOYO_FEDERAL){
				registry.byId('cmbApoyo').set('store',apoyoFederalStore);
			}else if(tpoApoyo==constants.APOYO_ESTATAL){
				registry.byId('cmbApoyo').set('store',apoyoEstatalStore);
			}else if(tpoApoyo==constants.APOYO_NECESIDAD){
				registry.byId('cmbApoyo').set('store',apoyoNecesidadStore);
			}else if(tpoApoyo==constants.PLAN_TRABAJO){
				registry.byId('cmbApoyo').set('store',apoyosPlanTrabajo);
			}else{
				
			}*/
				registry.byId('cmbApoyo').set('store',apoyosDiagCierre);
		//	}
			
			cmbApoyo.set('onChange',function(){
		/*		if(!esPlanTrabajo && !esDiagCierre){
					//Cuando se trata de un apoyo estatal en esta sección se podrá 
					//agregar nuevos elementos, así que quedaran habilitados el 
					//combo de apoyos y el campo de texto para la parte de otros.
					utils.ocultarSeccionHTML("Economico",cmbApoyo.item.hayMonto,true);
					utils.ocultarSeccionHTML("Cantidad",cmbApoyo.item.hayBeneficiarios,true);

					if(!edit || itemToEdit.reunion==constants.TERCERA_REUNION){
						utils.ocultarSeccionHTML("CantidadSegunda",false,true);
					}else{
						utils.ocultarSeccionHTML("CantidadSegunda",cmbApoyo.item.hayBeneficiariosr2,true);
					}
					utils.ocultarSeccionHTML("Especifique",cmbApoyo.item.hayOtros,true);
					if(tpoApoyo!=constants.APOYO_ESTATAL){
						registry.byId('txtEspecifique').set('readOnly',true);
					}
					
					if(cmbApoyo.item.hayBeneficiarios){
	        			//Aquí se cambia el texto del label, dependiendo 
	        			//de que tipo de beneficiario es.
	        			dom.byId('divLBLCantidad').innerHTML='<label>* \u00BF'+ cmbApoyo.item.descCant +'?: </label>';
	        			dom.byId('divLBLCantidadSegunda').innerHTML='<label>\u00BF'+ cmbApoyo.item.descCant +'?: </label>';
	        		}
				}else if(esPlanTrabajo){
					utils.findAccionesXTipo(cmbApoyo.item.id,itemToEdit.idAccion,'cmbAccion',idReunion);
				}else
		*/			
					
					if(esDiagCierre){
					registry.byId('txtCantidad').set('required',true);
				}
	        });
			
			if(itemToEdit.reunion==constants.PRIMERA_REUNION || itemToEdit.reunion==constants.SEGUNDA_REUNION){
				registry.byId('txtEspecifique').set('readOnly',true);
			}

			if(esDiagCierre){
				registry.byId('cmbApoyo').set('value',itemToEdit.cDesercion);
			}else{
				registry.byId('cmbApoyo').set('value',itemToEdit.cApoyo);	
			}

			if(!edit){registry.byId('cmbApoyo').set('value',-1);}
			var btnAceptar = new Button({
				label:'Aceptar',
				onClick : function() {
					var form = registry.byId(idVentana);
					if (!form.validate() || registry.byId('cmbApoyo').get('value')==-1){
						utils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					var gridGenerico = registry.byId(idGridSelect);
					try{
						if(edit){
							var index = gridGenerico.selection.selectedIndex;
							var item = gridGenerico.getItem(index);
				/*			if(!esPlanTrabajo && !esDiagCierre){
								gridGenerico.store.setValue(item,'apoyoRecibido',!txtEspecifique.get('value')?cmbApoyo.get('displayedValue'):cmbApoyo.get('displayedValue') +': '+ txtEspecifique.get('value'));
								gridGenerico.store.setValue(item,'economico',!txtEconomico.get('value')?noAPlica:txtEconomico.get('value'));
								gridGenerico.store.setValue(item,'cantidad_desc',!txtCantidad.get('value')?noAPlica:cmbApoyo.item.descCant!='Cu\u00E1ntos'?cmbApoyo.item.descCant +': '+ txtCantidad.get('value'):txtCantidad.get('value'));
								gridGenerico.store.setValue(item,'cantidad',!txtCantidad.get('value')?noAPlica:txtCantidad.get('value'));
								//gridGenerico.store.setValue(item,'descripcion',itemToEdit.descripcion);
								gridGenerico.store.setValue(item,'reunion',itemToEdit.reunion);
								gridGenerico.store.setValue(item,'otros',txtEspecifique.get('value'));
							}else if(esPlanTrabajo){
								if(registry.byId('cmbAccion').get('value')==-1 || (registry.byId('txtEspecifique').get('value')=='' && registry.byId('cmbResMultiple').get('value')==-1)){
									utils.cstmAlert('Favor de registrar los datos requeridos');
									return false;
								}
								gridGenerico.store.setValue(item,'apoyoRecibido',!txtEspecifique.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +' Especifique cu\u00E1l: '+ txtEspecifique.get('value'):cmbAccion.get('displayedValue') +': '+ txtEspecifique.get('value'));
								gridGenerico.store.setValue(item,'accion',!txtResSimple.get('value')?cmbResMultiple.get('displayedValue'):txtResSimple.get('value'));
								gridGenerico.store.setValue(item,'reunion',itemToEdit.reunion);
								gridGenerico.store.setValue(item,'tipoRespuesta',!txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2);
								gridGenerico.store.setValue(item,'idRespuesta',!txtResSimple.get('value')?cmbResMultiple.get('value'):0);
								gridGenerico.store.setValue(item,'otros',txtEspecifique.get('value'));
							}else
					*/			
								if(esDiagCierre){
								gridGenerico.store.setValue(item,'pregunta',cmbApoyo.item.descripcionLarga);
								gridGenerico.store.setValue(item,'cantidad',txtCantidad.get('value'));
								gridGenerico.store.setValue(item,'reunion',itemToEdit.reunion);
							}
							gridGenerico.update();
						}else{
							try{
								var myNewItem = null;
				/*				if(!esPlanTrabajo && !esDiagCierre){
									myNewItem = {
										cApoyo : cmbApoyo.get('value'),
										apoyoRecibido : !txtEspecifique.get('value')?cmbApoyo.get('displayedValue'):cmbApoyo.get('displayedValue') +': '+ txtEspecifique.get('value'),
										economico : !txtEconomico.get('value')?noAPlica:txtEconomico.get('value'),
										cantidad_desc : !txtCantidad.get('value')?noAPlica:cmbApoyo.item.descCant!='Cu\u00E1ntos'?cmbApoyo.item.descCant +': '+ txtCantidad.get('value'):txtCantidad.get('value'),
										cantidad : !txtCantidad.get('value')?'':txtCantidad.get('value'),
										cantidad_desc_Segunda : 'N/A',
										cantidadSegunda : 0,
										//descripcion : cmbApoyo.item.descCant,
										reunion : constants.TERCERA_REUNION,
										otros : txtEspecifique.get('value')
									};
								}else if(esPlanTrabajo){
									if(registry.byId('cmbAccion').get('value')==-1 || (registry.byId('txtEspecifique').get('value')=='' && registry.byId('cmbResMultiple').get('value')==-1)){
										utils.cstmAlert('Favor de registrar los datos requeridos');
										return false;
									}
									myNewItem = {
										cApoyo : cmbApoyo.get('value'),
										apoyoRecibido : !txtEspecifique.get('value')?cmbAccion.get('displayedValue'):exitenBrigadas?cmbAccion.get('displayedValue') +' Especifique cu\u00E1l: '+ txtEspecifique.get('value'):cmbAccion.get('displayedValue') +': '+ txtEspecifique.get('value'),
										accion : !txtResSimple.get('value')?cmbResMultiple.get('displayedValue'):txtResSimple.get('value'),
										idAccion : cmbAccion.get('value'),
										tipoRespuesta : !txtResSimple.get('value')?cmbAccion.item.tpoRespuesta:2,
										idRespuesta : !txtResSimple.get('value')?cmbResMultiple.get('value'):0,
										reunion : constants.TERCERA_REUNION,
										otros : txtEspecifique.get('value')
									};
								}else 
									
				*/					
									if(esDiagCierre){
									myNewItem = {
										cDesercion : cmbApoyo.get('value'),
										pregunta : cmbApoyo.item.descripcionLarga,
										cantidad : txtCantidad.get('value'),
										reunion : constants.TERCERA_REUNION,
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
					}
					/*
					else if(nombreGrid=="Apoyo"){
						_popupApoyos();
					}
					*/
					else if(nombreGrid=="Necesidad"){
						_popupNecesidad();
					}else if(nombreGrid=="Situacion"){
						_popupPoblacion();
					}else if(nombreGrid=="BullyingN"){
						_popupBullyingN();
					}else if(nombreGrid=="Accion"){
						_popupAccion();
					}else if(nombreGrid=="accionCSoc"){
						_popupOpiniones();
					}else if(nombreGrid=="accionCSdq"){
						_popupDenuncias();
					}else if(nombreGrid=="numeroAlumnos"){
						_popupNumeroDeAlumnos();
					}else _popupApoyos(nombreGrid);
				 }
			},'add'+nombreGrid);
		}
		
		
		
		
		
		
	 	function _agregarFilaGrid1(tpoApoyo,embedded,nombreGrid){
			//La función crea un botón para poder agregar
			//una fila al grid seleccionado.
			utils.createTag('input','add'+embedded,embedded);
			new Button({
				id : 'add'+embedded,
				label:'Agregar',
				onClick: function(){
					_pop_up(nombreGrid,tpoApoyo);
		        }
			},'add'+embedded);
		}
	 	
		function _findApoyosPorTipo(tpoApoyo){
			//La siguiente funcion regresa una lista de todos los
			//apoyos, dependiendo de la opcion seleccionada, ya sean: 
			//apoyos conafe, federales, estatales y de necesidad.
			xhr.get({
				url: dojo.config.app.urlBase+'catalogos/listApoyosPorTipo/'+ tpoApoyo+'/'+idReunion,
				sync: false,
				preventCache:true,
				handleAs: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1",name:"[Seleccione]",descCant:null,hayMonto:false,hayEspecie:false,hayBeneficiariosr2:false,hayBeneficiarios:false,hayOtros:false}];
				for(var j in data){				
					store.push({ 
						id:data[j].cApoyo,
						name:data[j].descripCorta,
						descCant:!data[j].otroTipoBeneficiarios?'Cu\u00E1ntos':data[j].otroTipoBeneficiarios,
						hayMonto:data[j].economico,
						hayEspecie:data[j].especie,
						hayBeneficiariosr2:data[j].beneficiarios,
						hayBeneficiarios:data[j].beneficiariosr3,
						hayOtros:data[j].otraDescripcion
					});
				}
				//Y son asignados al Store correspondiente.
				if(tpoApoyo==constants.APOYO_CONAFE){
					apoyoConafeStore = new Memory({data:store});
				}else if(tpoApoyo==constants.APOYO_FEDERAL){
					apoyoFederalStore = new Memory({data:store});
				}else if(tpoApoyo==constants.APOYO_ESTATAL){
					apoyoEstatalStore = new Memory({data:store});
				}else if(tpoApoyo==constants.APOYO_NECESIDAD){
					apoyoNecesidadStore = new Memory({data:store});
				}
		    });
		}
		
		//funcion que construye las listas de apoyos y necesidades especiales
    function _construyeApoyosNecesidades(gridApoyo) {
			
		 	var apoyosTipoArray = new Array();

			// Obtiene la informaci—n del Grid
			for ( var i = 0; i < gridApoyo.rowCount; i++) {

				var item = gridApoyo.getItem(i);
				// Genera un nuevo objeto de apoyo conafe de cada
				// renglon del grid.
				if (gridApoyo.store.getValue(item,
						'apoyoRecibido') == null
						|| gridApoyo.store.getValue(item,
								'apoyoRecibido') == "") {						
					return null;
				}

				var ApoyoTipo = {
						cApoyo : gridApoyo.store.getValue(item,
						'cApoyo'),
				montor3 : gridApoyo.store.getValue(item,
						'economico')=="N/A"?null:gridApoyo.store.getValue(item,
						'economico'),				
				beneficiariosr3 : gridApoyo.store.getValue(
						item, 'cantidad')=="N/A"?null:gridApoyo.store.getValue(item,
						'cantidad'),
						descripOtro:gridApoyo.store.getValue(
								item, 'otros'),
				cReunion:gridApoyo.store.getValue(item,
				'reunion')			
					    
				};
				apoyosTipoArray.push(ApoyoTipo);
				
			}
			
			return apoyosTipoArray;
		}


		function saveTerceraReunion(cApec, storeCcts){
			var standby = new Standby({
				target : "dialogCaptiraDGConafe"
			});
			document.body.appendChild(standby.domNode);
			standby.startup();

			var form = registry.byId('registraActaReunion');
			if(form.validate()==false) {
				return false;
			}

			var apec = {cApec : cApec};

			var evaluacionObj=terceraReunionObj.encuestaSatisfaccion?terceraReunionObj.encuestaSatisfaccion:[];
			var existeReunion = terceraReunionObj.reunion?true:false;
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
			
			var hayApoyos = false;
			var hayPlanTrab = false;
			var hayDesercion = false;
			var hayEncuestaSatis = false;
			var hayInclusion = false;
			var hayContraSocial = false;  
			var hayInformeFinal = false; 
			
			var seccionesRegistradasArray = registry.byId('selectSeccion').get('value');
			// Carga los apoyos conafes seleccionados
			for ( var i in seccionesRegistradasArray) {
				if (seccionesRegistradasArray[i] == constants.SECCION_APOYOS_R3) {
					hayApoyos = true;
				}
				if (seccionesRegistradasArray[i] == constants.SECCION_PLAN_TRABAJO_R3) {
					hayPlanTrab = true;
				}
				
				if (seccionesRegistradasArray[i] == constants.SECCION_DIAG_DESERCION) {
					hayDesercion = true;
				}
				
				if (seccionesRegistradasArray[i] == constants.SECCION_ENCUESTA_SATISFACCION) {
					hayEncuestaSatis = true;
				}
				if (seccionesRegistradasArray[i] == constants.SECCION_INCLUSION_SOCIAL_R3) {
					hayInclusion = true;
				}
				if (seccionesRegistradasArray[i] == constants.SECCION_CONTRALORIA_SOCIAL_R3) {
					hayContraSocial = true;
				}
				if (seccionesRegistradasArray[i] == constants.SECCION_INFORME_FINAL_R3) {
					hayInformeFinal = true;
				}
			}
			
			var apoyosConafe = new Array();
			var apoyosFederales = new Array();
			var apoyosEstatales = new Array();
			var necEsp = new Array();
			var bullying = new Array();
			var planTrabajo = new Array();
			var diagCierre = new Array();
			var informeFinal= {};
			
			
			//Validar que por lo menos haya seleccionado un registro de la lista.
			if(!hayApoyos && !hayPlanTrab && !hayDesercion && !hayEncuestaSatis && !hayInformeFinal)
			
			{
				utils.cstmAlert("Deber\u00E1 seleccionar por lo menos un rubro, para continuar <br> con el registro de la tercera reuni\u00F3n.");
				return false;
			}
			
	/*		if (hayApoyos == true) {
				// Carga los apoyos conafes

				var cuentaConApoyos=false;
				var gridApoyoConafe = registry.byId('gridApoyo1');
				apoyosConafe=_construyeApoyosNecesidades(gridApoyoConafe,"CONAFE");
				if(apoyosConafe!=null){
					if(apoyosConafe.length!=0)
						cuentaConApoyos=true;
				}
				else{
					utils
					.cstmAlert("Uno o m\u00e1s apoyos de CONAFE no cuentan con la informaci\u00F3n requerida");
					return false;
				}
				
				
				// Carga los apoyos federales seleccionados

				var gridApoyoFederal = registry.byId('gridApoyo2');
									
	 			apoyosFederales=_construyeApoyosNecesidades(gridApoyoFederal,"Federales");
				if(apoyosFederales!=null){
					if(apoyosFederales.length!=0)
						cuentaConApoyos=true;
				}
				else{
					utils
					.cstmAlert("Uno o m\u00e1s apoyos de federales no cuentan con la informaci\u00F3n requerida");
					return false;
				}
				

				var gridApoyoEstatal = registry.byId('gridApoyo3');
				
	 			apoyosEstatales=_construyeApoyosNecesidades(gridApoyoEstatal,"estatal");
				if(apoyosEstatales!=null){
					if(apoyosEstatales.length!=0)
						cuentaConApoyos=true;
				}
				else{
					utils
					.cstmAlert("Uno o m\u00e1s apoyos de estatales no cuentan con la informaci\u00F3n requerida");
					return false;
				}
								

			}
			
	*/		
			
	//Inicia carga apoyos Vblake
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
						cantidad : parseInt (gridApoyos.store.getValue(item,'cantidad')),
						numBenef : parseInt (gridApoyos.store.getValue(item,'beneficiarios'))
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
			
//apoyos federales
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
							|| gridApoyos.store.getValue(item,'accion')== null
							|| gridApoyos.store.getValue(item,'accion')==""	
							|| gridApoyos.store.getValue(item,'beneficiarios')== null
							|| gridApoyos.store.getValue(item,'beneficiarios')==""
							|| gridApoyos.store.getValue(item,'cantidad')== null
							|| gridApoyos.store.getValue(item,'cantidad')=="")	
								
					{

						utils
								.cstmAlert("Uno o m\u00e1s apoyos federales no cuentan con la informaci\u00F3n requerida");
						return false;
					}
					
 			
		 			// Los nombres de la izquierda corresponden a los de la BD
					
					var apoyo = {
						cApoyo			: gridApoyos.store.getValue(item,'cApoyo'),
						otro			: gridApoyos.store.getValue(item,'cual'),
						cantidad		: parseInt (gridApoyos.store.getValue(item,'cantidad')),
						descripApoyo	: gridApoyos.store.getValue(item,'accion'),
						numBenef		: parseInt (gridApoyos.store.getValue(item,'beneficiarios'))
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
 							|| gridApoyos.store.getValue(item, 'cantidad') == null
 						 	|| gridApoyos.store.getValue(item, 'cantidad') == ""	
 							|| gridApoyos.store.getValue(item, 'accion') == null
 					 		|| gridApoyos.store.getValue(item, 'accion') == ""
 					 		|| gridApoyos.store.getValue(item,	'beneficiarios')== null
 							|| gridApoyos.store.getValue(item,	'beneficiarios')=="")
 					{
 
 						utils
 								.cstmAlert("Uno o m\u00e1s apoyos estatales no cuentan con la informaci\u00F3n requerida");
 						return false;
 					}
 				 	
 					
 					// los campos de la izquierda son los que corresponden a la base de datos y se deben de poner 
 					//tal cual se llamen en la BD
 		 			
 					var estatal= {
 						cApoyo: gridApoyos.store.getValue(item,'cApoyo'),
 						otro : gridApoyos.store.getValue(item,'especifique'),
 						cantidad : gridApoyos.store.getValue(item,'cantidad'),
 						descripApoyo : gridApoyos.store.getValue(item,'accion'),
 						numBenef : gridApoyos.store.getValue(item,'beneficiarios') 
 					};
 					apoyosEstatales.push(estatal);
 					hayEstatal = true;
 				}
 
 				if (hayEstatal == false) {
 					utils.cstmAlert("Debe indicar alg\u00fan apoyo estatal");
 					return false;
 				}
 			}	
		
 	//Termina carga apoyos Vblake
 			
 			
			
			if (hayInclusion) {
				var hayDatosIncSocial = false;
				var gridNecesidades = registry.byId('gridNecesidad');

				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridNecesidades.rowCount; i++) {

					var item = gridNecesidades.getItem(i);
					// Genera un nuevo objeto de necesidad especial de cada
					// renglon del grid.
					if (gridNecesidades.store.getValue(item, 'cApoyo') == null || gridNecesidades.store.getValue(item,'cApoyo') == ""
							|| gridNecesidades.store.getValue(item,'cNee') == null || gridNecesidades.store.getValue(item,'cNee') == ""
							|| gridNecesidades.store.getValue(item,'gestion') == null || gridNecesidades.store.getValue(item,'gestion') == ""
							|| gridNecesidades.store.getValue(item,'seconcreto') == null || gridNecesidades.store.getValue(item,'seconcreto') == ""	
							|| gridNecesidades.store.getValue(item,'consiste') == null || gridNecesidades.store.getValue(item,'consiste') == ""
							|| gridNecesidades.store.getValue(item,'cuantos') == null || gridNecesidades.store.getValue(item,'cuantos') == ""	
					) {
						utils
								.cstmAlert("Una o m\u00e1s necesidades especiales no cuentan con la informaci\u00F3n requerida");
						return false;
					}
 
					var neceEspItem = {
							cApoyo		: gridNecesidades.store.getValue(item,'cApoyo'),
							cNee		: gridNecesidades.store.getValue(item,'cNee'),
							gestionar	: gridNecesidades.store.getValue(item,'gestion'),
							seconcreto	: gridNecesidades.store.getValue(item,'seconcreto'),
							consiste	: gridNecesidades.store.getValue(item,'consiste'),
							cuantos		: gridNecesidades.store.getValue(item,'cuantos'),
							cNee1		: gridNecesidades.store.getValue(item,'cNee1'),
							gestionar1	: gridNecesidades.store.getValue(item,'gestion1'),
							seconcreto1	: gridNecesidades.store.getValue(item,'seconcreto1'),
							consiste1	: gridNecesidades.store.getValue(item,'consiste1'),
							cuantos1	: gridNecesidades.store.getValue(item,'cuantos1'),
							proceso		: null,
							concreto	: null,
							proceso1	: null,
							concreto1	: null,
					
					};

					necEsp.push(neceEspItem);
					hayDatosIncSocial = true;
				}
			
			
	 		var gridAcoso = registry.byId('gridBullyingN');

			// Obtiene la informaci—n del Grid
			for ( var i = 0; i < gridAcoso.rowCount; i++) {

				var item = gridAcoso.getItem(i);
				// Genera un nuevo objeto de Bullying de cada
				// renglon del grid.
				if (gridAcoso.store.getValue(item, 'seconcreto') == null || gridAcoso.store.getValue(item, 'seconcreto') == ""
					|| gridAcoso.store.getValue(item, 'numveces') == null || gridAcoso.store.getValue(item, 'numveces') == ""
					|| gridAcoso.store.getValue(item, 'cuantos') == null || gridAcoso.store.getValue(item, 'cuantos') == "") {

					utils
							.cstmAlert("Una o m\u00e1s casos de bullying no cuentan con la informaci\u00F3n requerida");
					return false;
				}
				
 
										
				var acoso = {
				    cCoTipoBullying	: gridAcoso.store.getValue(item,'idTpoBullying'),
					cCoBullying		: gridAcoso.store.getValue(item,'idBullying'),
					seconcreto		: gridAcoso.store.getValue(item,'seconcreto'),
					numvecesr1		: gridAcoso.store.getValue(item,'numveces'),
					cuantos			: gridAcoso.store.getValue(item,'cuantos'),
					
				};
				bullying.push(acoso);
				hayDatosIncSocial = true;
				
			}

	 		}
			
	 
				
			var planTrabajo = new Array();
			if (hayPlanTrab) {
			 var hayPlanTrabajo = false;
			 //var gridTrabajo = registry.byId('gridPlanTrabajo');
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

					var numVecesR3=null;
					var respuesta=null;
					
					if(gridTrabajo.store.getValue(item,
					'tipoRespuesta')==2){
						
						numVecesR3=gridTrabajo.store.getValue(item,
						'accion');
						if(numVecesR3!=null){
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
						cAccion			:	gridTrabajo.store.getValue(item,'idAccion'),
						cReunion		:	gridTrabajo.store.getValue(item,'reunion'),
						numVecesr3		:	gridTrabajo.store.getValue(item,'accion'),
						cRespuestar3	:	5,
						nomOtra			:	gridTrabajo.store.getValue(item,'otros')						
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
			
			
// vblake Inicia carga Informe Final
		
	    	if (registry.byId('cmbSiNo1').getValue() == null || registry.byId('cmbSiNo1').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 1, no cuenta con la informaci\u00f3n requerida");
				return false;} 
	    	
	    	if (registry.byId('cmbSiNo3').getValue() == null || registry.byId('cmbSiNo3').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 3, no cuenta con la informaci\u00f3n requerida");
				return false;} 
	    	
	    	if (registry.byId('cmbSiNo61').getValue() == null || registry.byId('cmbSiNo61').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 6.1, no cuenta con la informaci\u00f3n requerida");
				return false;} 
			
	    	if (registry.byId('cmbSiNo62').getValue() == null || registry.byId('cmbSiNo62').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 6.2, no cuenta con la informaci\u00f3n requerida");
				return false;} 
	    	
	    	if (registry.byId('cmbSiNo63').getValue() == null || registry.byId('cmbSiNo63').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 6.3, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('cmbSiNo64').getValue() == null || registry.byId('cmbSiNo64').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 6.4, no cuenta con la informaci\u00f3n requerida");
				return false;}
			
	    	if (registry.byId('cmbSiNo65').getValue() == null || registry.byId('cmbSiNo65').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 6.5 no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('cmbSiNo66').getValue() == null || registry.byId('cmbSiNo66').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 6.6, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('cmbSiNo7').getValue() == null || registry.byId('cmbSiNo7').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 7, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('cmbSiNo8').getValue() == null || registry.byId('cmbSiNo8').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 8, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('cmbSiNo10').getValue() == null || registry.byId('cmbSiNo10').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 10, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('txtPorQue').getValue() == null || registry.byId('txtPorQue').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 10 Por qu\u00e9?, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('cmbSiNo11').getValue() == null || registry.byId('cmbSiNo11').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 11, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('cmbSiNo12').getValue() == null || registry.byId('cmbSiNo12').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 12, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('cmbSiNo18').getValue() == null || registry.byId('cmbSiNo18').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 18, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
	    	if (registry.byId('txtPorQue18').getValue() == null || registry.byId('txtPorQue18').getValue() == ""){
				utils
						.cstmAlert("Informe Final: La pregunta No. 18 Por qu\u00e9?, no cuenta con la informaci\u00f3n requerida");
				return false;}
	    	
		   
		   
		   
		
		    
// en esta sección se realiza para grabar a base de datos		    
//	    	if(rneSeleccionados2.length>0 && rneSeleccionados4.length>0 && rneSeleccionados5.length>0 && rneSeleccionados9.length>0 && rneSeleccionados13.length>0 && rneSeleccionados14.length>0 && rneSeleccionados15.length>0 && rneSeleccionados16.length>0 && rneSeleccionados17.length>0){
//	    		utils.cstmAlert("Favor de llenar la informacion de los grids");
//		return false;
//	    	}else{
	    	var grid = registry.byId('avanceOtroDt');
	        var otrosCuales2 = "";
		    var checador2=0;
			   if(rneSeleccionados2.length>0){
				   
				   for ( var j = 0; j < grid.rowCount; j++) {
					   var item2 = grid.getItem(j);
					   if( array.indexOf(rneSeleccionados2,grid.store.getValue(item2,'idActividad'))!=-1){
						   checador2++;
						   otrosCuales2 += grid.store.getValue(item2,'idActividad');
						   
						   if(grid.store.getValue(item2,'meta')){
							   otrosCuales2 += ",="+grid.store.getValue(item2,'meta');   
						   }						   
						   if(grid.store.getValue(item2, "objetivo")=="Otro"){
							   otrosCuales2 += ",="+registry.byId("otroDt").get('value');
						   }
						   
						   otrosCuales2 += ",-";
					   }
				   }
				   
				   //alert(otrosCuales);
				  // registry.byId('accion1').set ('value',otrosCuales);
			    }
			   if(checador2<1){
				   utils.cstmAlert('Informe Final: La pregunta No. 2, no cuenta con la informaci\u00f3n requerida');
                   return false;
			   }
	    	
			   
			    var grid = registry.byId('avanceOtroDt4');
		        var otrosCuales4 = "";
			    var checador4=0;
				   if(rneSeleccionados4.length>0){
					   
					   for ( var j = 0; j < grid.rowCount; j++) {
						   var item4 = grid.getItem(j);
						   if( array.indexOf(rneSeleccionados4,grid.store.getValue(item4,'idActividad'))!=-1){
							   checador4++;
							   otrosCuales4 += grid.store.getValue(item4,'idActividad');
							   
							   if(grid.store.getValue(item4,'meta')){
								   otrosCuales4 += ",="+grid.store.getValue(item4,'meta');   
							   }						   
							   if(grid.store.getValue(item4, "objetivo")=="Otro"){
								   otrosCuales4 += ",="+registry.byId("otroDt4").get('value');
							   }
							   
							   otrosCuales4 += ",-";
						   }
					   }
				   }
				   if(checador4<1){
					   utils.cstmAlert('Informe Final: La pregunta No. 4, no cuenta con la informaci\u00f3n requerida');
	                   return false;
				   }   
			   
				   var grid = registry.byId('avanceOtroDt5');
			        var otrosCuales5 = "";
				    var checador5=0;
					   if(rneSeleccionados5.length>0){
						   
						   for ( var j = 0; j < grid.rowCount; j++) {
							   var item5 = grid.getItem(j);
							   if( array.indexOf(rneSeleccionados5,grid.store.getValue(item5,'idActividad'))!=-1){
								   checador5++;
								   otrosCuales5 += grid.store.getValue(item5,'idActividad');
								   
								   if(grid.store.getValue(item5,'meta')){
									   otrosCuales5 += ",="+grid.store.getValue(item5,'meta');   
								   }						   
								   if(grid.store.getValue(item5, "objetivo")=="Otro"){
									   otrosCuales5 += ",="+registry.byId("otroDt5").get('value');
								   }
								   
								   otrosCuales5 += ",-";
							   }
						   }
					   }
					   if(checador5<1){
						   utils.cstmAlert('Informe Final: La pregunta No. 5, no cuenta con la informaci\u00f3n requerida');
		                   return false;
					   }
					   
					   var grid = registry.byId('avanceOtroDt9');
				        var otrosCuales9 = "";
					    var checador9=0;
						   if(rneSeleccionados9.length>0){
							   
							   for ( var j = 0; j < grid.rowCount; j++) {
								   var item9 = grid.getItem(j);
								   if( array.indexOf(rneSeleccionados9,grid.store.getValue(item9,'idActividad'))!=-1){
									   checador9++;
									   otrosCuales9 += grid.store.getValue(item9,'idActividad');
									   
									   if(grid.store.getValue(item9,'meta')){
										   otrosCuales9 += ",="+grid.store.getValue(item9,'meta');   
									   }						   
									   if(grid.store.getValue(item9, "objetivo")=="Otro"){
										   otrosCuales9 += ",="+registry.byId("otroDt9").get('value');
									   }
									   
									   otrosCuales9 += ",-";
								   }
							   }
						   }
						   if(checador9<1){
							   utils.cstmAlert('Informe Final: La pregunta No. 9, no cuenta con la informaci\u00f3n requerida');
			                   return false;
						   }
						   
						   var grid = registry.byId('avanceOtroDt13');
					        var otrosCuales13 = "";
						    var checador13=0;
							   if(rneSeleccionados13.length>0){
								   
								   for ( var j = 0; j < grid.rowCount; j++) {
									   var item13 = grid.getItem(j);
									   if( array.indexOf(rneSeleccionados13,grid.store.getValue(item13,'idActividad'))!=-1){
										   checador13++;
										   otrosCuales13 += grid.store.getValue(item13,'idActividad');
										   
										   if(grid.store.getValue(item13,'meta')){
											   otrosCuales13 += ",="+grid.store.getValue(item13,'meta');   
										   }						   
										   if(grid.store.getValue(item13, "objetivo")=="Otro. \u00bfQui\u00e9n?"){
											   otrosCuales13 += ",="+registry.byId("otroDt13").get('value');
										   }
										   
										   otrosCuales13 += ",-";
									   }
								   }
							   }
							   if(checador13<1){
								   utils.cstmAlert('Informe Final: La pregunta No. 13, no cuenta con la informaci\u00f3n requerida');
				                   return false;
							   }
							   
							   var grid = registry.byId('avanceOtroDt14');
						        var otrosCuales14 = "";
							    var checador14=0;
								   if(rneSeleccionados14.length>0){
									   
									   for ( var j = 0; j < grid.rowCount; j++) {
										   var item14 = grid.getItem(j);
										   if( array.indexOf(rneSeleccionados14,grid.store.getValue(item14,'idActividad'))!=-1){
											   checador14++;
											   otrosCuales14 += grid.store.getValue(item14,'idActividad');
											   
											   if(grid.store.getValue(item14,'meta')){
												   otrosCuales14 += ",="+grid.store.getValue(item14,'meta');   
											   }						   
											   if(grid.store.getValue(item14, "objetivo")=="Otro"){
												   otrosCuales14 += ",="+registry.byId("otroDt14").get('value');
											   }
											   
											   otrosCuales14 += ",-";
										   }
									   }
								   }
								   if(checador14<1){
									   utils.cstmAlert('Informe Final: La pregunta No. 14, no cuenta con la informaci\u00f3n requerida');
					                   return false;
								   }
								   
								   var grid = registry.byId('avanceOtroDt15');
							        var otrosCuales15 = "";
								    var checador15=0;
									   if(rneSeleccionados15.length>0){
										   
										   for ( var j = 0; j < grid.rowCount; j++) {
											   var item15 = grid.getItem(j);
											   if( array.indexOf(rneSeleccionados15,grid.store.getValue(item15,'idActividad'))!=-1){
												   checador15++;
												   otrosCuales15 += grid.store.getValue(item15,'idActividad');
												   
												   if(grid.store.getValue(item15,'meta')){
													   otrosCuales15 += ",="+grid.store.getValue(item15,'meta');   
												   }						   
												   if(grid.store.getValue(item15, "objetivo")=="Otra opini\u00f3n."){
													   otrosCuales15 += ",="+registry.byId("otroDt15").get('value');
												   }
												   
												   otrosCuales15 += ",-";
											   }
										   }
									   }
									   if(checador15<1){
										   utils.cstmAlert('Informe Final: La pregunta No. 15, no cuenta con la informaci\u00f3n requerida');
						                   return false;
									   }
									   
									   var grid = registry.byId('avanceOtroDt16');
								        var otrosCuales16 = "";
									    var checador16=0;
										   if(rneSeleccionados16.length>0){
											   
											   for ( var j = 0; j < grid.rowCount; j++) {
												   var item16 = grid.getItem(j);
												   if( array.indexOf(rneSeleccionados16,grid.store.getValue(item16,'idActividad'))!=-1){
													   checador16++;
													   otrosCuales16 += grid.store.getValue(item16,'idActividad');
													   
													   if(grid.store.getValue(item16,'meta')){
														   otrosCuales16 += ",="+grid.store.getValue(item16,'meta');   
													   }						   
													   if(grid.store.getValue(item16, "objetivo")=="Otro."){
														   otrosCuales16 += ",="+registry.byId("otroDt16").get('value');
													   }
													   
													   otrosCuales16 += ",-";
												   }
											   }
										   }
										   if(checador16<1){
											   utils.cstmAlert('Informe Final: La pregunta No. 16, no cuenta con la informaci\u00f3n requerida');
							                   return false;
										   }
										   
										   var grid = registry.byId('avanceOtroDt17');
									        var otrosCuales17 = "";
										    var checador17=0;
											   if(rneSeleccionados17.length>0){
												   
												   for ( var j = 0; j < grid.rowCount; j++) {
													   var item17 = grid.getItem(j);
													   if( array.indexOf(rneSeleccionados17,grid.store.getValue(item17,'idActividad'))!=-1){
														   checador17++;
														   otrosCuales17 += grid.store.getValue(item17,'idActividad');
														   
														   if(grid.store.getValue(item17,'meta')){
															   otrosCuales17 += ",="+grid.store.getValue(item17,'meta');   
														   }						   
														   if(grid.store.getValue(item17, "objetivo")=="Otro."){
															   otrosCuales17 += ",="+registry.byId("otroDt17").get('value');
														   }
														   
														   otrosCuales17 += ",-";
													   }
												   }
											   }
											   if(checador17<1){
												   utils.cstmAlert('Informe Final: La pregunta No. 17, no cuenta con la informaci\u00f3n requerida');
								                   return false;
											   }
	    	
					   
			   
			if (hayInformeFinal) {					 																	
 					 informeFinal = {
						respuesta1		: registry.byId('cmbSiNo1').getValue(),
						respuesta2		: otrosCuales2,
						respuesta3		: registry.byId('cmbSiNo3').getValue(),
						respuesta4		: otrosCuales4,
						respuesta5		: otrosCuales5,
						respuesta61		: registry.byId('cmbSiNo61').getValue(),
						respuesta62		: registry.byId('cmbSiNo62').getValue(),
						respuesta63		: registry.byId('cmbSiNo63').getValue(),
						respuesta64		: registry.byId('cmbSiNo64').getValue(),
						respuesta65		: registry.byId('cmbSiNo65').getValue(),
						respuesta66		: registry.byId('cmbSiNo66').getValue(),
						respuesta7 		: registry.byId('cmbSiNo7').getValue(),
						respuesta8 		: registry.byId('cmbSiNo8').getValue(),
						respuesta9		: otrosCuales9,
						respuesta10		: registry.byId('cmbSiNo10').getValue(),
						respuesta10otro : registry.byId('txtPorQue').getValue(),
						respuesta11 	: registry.byId('cmbSiNo11').getValue(),
						respuesta12 	: registry.byId('cmbSiNo12').getValue(),
						respuesta13		: otrosCuales13,
						respuesta13otro	: null,
						respuesta14		: otrosCuales14,
						respuesta15		: otrosCuales15,
						respuesta16		: otrosCuales16,
						respuesta17		: otrosCuales17,
						respuesta18 	: registry.byId('cmbSiNo18').getValue(),
						respuesta18otro : registry.byId('txtPorQue18').getValue()
					};

					hayInformeFinal = true;
				}
			
// vblake Termina carga Informe Final 
			
			var desercionArray = new Array();
			if (hayDesercion) {
				var hayCriteriosDesercion = false;

				
				var gridDesercion = registry.byId('gridDiagnostico');

				// Obtiene la informaci—n del Grid
				for ( var i = 0; i < gridDesercion.rowCount; i++) {

					var item = gridDesercion.getItem(i);
					// Genera un nuevo objeto de la desercion de cada
					// renglon del grid.
					if (gridDesercion.store.getValue(item, 'pregunta') == null
							|| gridDesercion.store.getValue(item, 'pregunta') == ""
							) {

						utils
								.cstmAlert("Una o m\u00e1s criterios de deserci\u00F3n no cuentan con la informaci\u00F3n requerida");
						return false;
					}

					
					var critDesercion = {
						cDesercion : gridDesercion.store.getValue(item,
								'cDesercion'),											
						cantidad : gridDesercion.store.getValue(item,
						'cantidad')						
					};

					desercionArray.push(critDesercion);
					hayCriteriosDesercion = true;
				}

				if (hayCriteriosDesercion == false) {

					utils
							.cstmAlert("Debe indicar algun criterio de deserci\u00F3n.");
					return false;
				}

			}
			
			var encuestaSatifArray= new Array();
			if(hayEncuestaSatis){
				var hayencuestaResuelta=false;

				for(var iPregunta in evaluacionObj){
					
					var respuestas = evaluacionObj[iPregunta].respuestas;
					
					for(var j in respuestas){
						var idREspuesta= 'pregunta_'+ iPregunta +'_resp_'+ j;
						var respuestaSelecionadaValue = registry.byId(idREspuesta).get(
						'value');
						var respuestaSelecionada = registry.byId(idREspuesta).get(
						'checked');
						if(respuestaSelecionada!=false){
							
							var respuestaEncuesta={
									cMedicionSatisfaccion:evaluacionObj[iPregunta].cMedicionSatisfaccion,
									cRespuesta:respuestaSelecionadaValue
							};
							encuestaSatifArray.push(respuestaEncuesta);
							hayencuestaResuelta=true;
							break;
						}						
						
					}
				}
				
				if (hayencuestaResuelta == false) {

					utils
							.cstmAlert("Debe responder al menos una de las preguntas de la encuesta de satisfacci\u00F3n.");
					return false;
				}

			}
			
			var integrantesR3 = new Array();
			integrantesR3 = utils.integrantesAsistieron(terceraReunionObj.integrantesR3?terceraReunionObj.integrantesR3:[],constants.TERCERA_REUNION);				
			if(integrantesR3.length==0){
				return false;
			}
			
			var instructoresR3 = new Array();
			instructoresR3 = utils.instructoresAsistieron(terceraReunionObj.instructoresR3?terceraReunionObj.instructoresR3:[],constants.TERCERA_REUNION,'gridInstructores'+constants.TERCERA_REUNION);
			if(instructoresR3.length==0){
				return false;
			}
			
			var terceraReunion = {
				apec					: apec,
				reunion					: apecReunion,
				apoyosConafe			: apoyosConafe,
				apoyosFederales			: apoyosFederales,
				apoyosEstatales			: apoyosEstatales,
				necesidadesEspeciales	: necEsp,
				bullying				: bullying,
				planTrabajo				: planTrabajo,
				seccionesReunion		: null,	// Esta en el archivo TerceraReunionVO
				diagnosticoCierre		:  desercionArray,
				encuestaSatisfaccion	:  encuestaSatifArray,
				apoyos					: null,	//Esta en el archivo TerceraReunionVO
				opiniones				: opiniones,
				denuncias				: denuncias,
				informeFinal			: informeFinal,
				integrantesR3			: integrantesR3,
				instructoresR3			: instructoresR3
			};
				console.log(json.toJson(terceraReunion));
				var urlJson = dojo.config.app.urlBase + 'terceraReunion/save';

				xhr
						.post(
								{
									url : urlJson,
									postData : json.toJson(terceraReunion),
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
													.cstmAlert('La informaci\u00F3n de su reunion de cierre se registr\u00F3 correctamente.');

											reuniones
													.refresh(
															terceraReunionObj.apec.idEntidadfed,
															terceraReunionObj.apec.idMunicipio,
															terceraReunionObj.apec.idLocalidad,
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
			saveTerceraReunion : saveTerceraReunion
		};
	});