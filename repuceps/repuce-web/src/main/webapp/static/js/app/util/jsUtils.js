define(["dijit/layout/ContentPane","dijit/form/Button","dojox/grid/DataGrid","dijit/form/CheckBox",
        "dijit/form/ValidationTextBox","dojox/form/CheckedMultiSelect","dijit/form/FilteringSelect",
        "dojo/data/ItemFileWriteStore","dijit/Dialog","dojo/dom","dijit/registry","dojo/_base/xhr",
        "dojo/store/Memory","dojo/_base/json","app/util/constants"],
        
		function(ContentPane,Button,DataGrid,CheckBox,ValidationTextBox,CheckedMultiSelect,
				 FilteringSelect,ItemFileWriteStore,Dialog,dom,registry,xhr,Memory,json,
				 constants){
	
    var isEmpty = function(obj){
    	for(var i in obj){
	        if(obj.hasOwnProperty(i)){
	            return false;
	        }
    	}
    	
    	return true;
    };
    
    var createTag = function (element,id, contId, style) {
        var newTag = document.createElement(element);
        newTag.setAttribute('id', id);
        newTag.setAttribute('style', style);
        document.body.appendChild(newTag);
        document.getElementById(contId).appendChild(newTag);
        //dojo.byId(contId).appendChild(newTag);
    };

    var cerrarPestania = function (idPestania){
		//Cierra la pestaña seleccionada para la 
    	//primera, segunda y tercera reunión CONAFE
		if(registry.byId(idPestania)){
			registry.byId('pestanias').closeChild(registry.byId(idPestania));
		}
	};

	var crearPanel = function (idPanel,tituloPanel,idContenido){
		//Esta función crea el panel seleccionado y a su vez un
		//bloque para luego añadirle de elementos, en donde el
		//tituloPanel es el título de la pestaña y el idContenido
		//es el id del bloque que contendrá la pestaña.
		registry.byId('pestanias').addChild(new ContentPane({
			persist:false,
			tabStrip:true,
			title:tituloPanel,
			id:idPanel,
			content:"<div id='"+ idContenido +"'></div>"
		}));
		pestaniaSelect(idPanel);
		//registry.byId(idPanel)
	};
	
	var crearGrid = function (embedded,layout,identificador,items,idGrid){
		//La función crea un grid recibiendo como parámetros: el id de la tabla,
		//layout que son las columnas y sus propiedades, identificador esto para
		//que no se puedan ingresar el mismo id dos veces en la tabla,
		//embedded es el id del html donde el widget quedara montado y por último
		//los ítems que es toda la información de la tabla.
		createTag('input',idGrid,embedded);
		var data = {
			identifier:identificador,
			items: items
		};
		var jsonStore = new ItemFileWriteStore({data: data});
		new DataGrid({
			id:idGrid,
			store:jsonStore,
			structure:layout,
			rowSelector:'10px',
		    height:'260px'
		},idGrid).startup();
	};
	
	var pestaniaSelect = function (idPestania){
		//La función recibe un id el cual indica la pestaña que
		//fue creada, con la finalidad de poder quedar posicionado
		//en ese ultimo punto.
		registry.byId('pestanias').selectChild(registry.byId(idPestania),true);
	};
	   
	var findBullyingXTipo = function (idtpoAccion,idAccionSelected,idCombo,idReunion){
		//La función busca la lista de acciones del plan de trabajo,
		//para llenar un combo con dicha información.
		if(idtpoAccion!=-1){
			xhr.get({
	    		url: dojo.config.app.urlBase+'catalogos/listBullyingPorTipo/'+ idtpoAccion+'/'+idReunion,
	    		sync: false,
	    		preventCache:true,
	    		handleAs: "json",
	    		contentType: "application/x-www-form-urlencoded; charset=utf-8"
	    	 }).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]" , tpoRespuesta:"-1", hayOtros:false}];
				for(var i in data){
					var descripcion="";
					if(constants.PRIMERA_REUNION==idReunion){
						descripcion = data[i].descripCortar1;
					}else if(constants.SEGUNDA_REUNION==idReunion){
						descripcion = data[i].descripCortar2;
					}else if(constants.TERCERA_REUNION==idReunion){
						descripcion = data[i].descripCortar3;
					}
					
					store.push({
						id : data[i].cCoBullying,
						name : descripcion,
						tpoRespuesta : data[i].cTipoRespuesta,
						hayOtros : data[i].otraDescripcion,
						hayBrigada : data[i].brigadaEsp
					});
				}
				registry.byId(idCombo).set('store',new Memory({data:store}));
				registry.byId(idCombo).set('value',idAccionSelected);
     		});
		}
	};
	var findAccionesXTipo = function (idtpoAccion,idAccionSelected,idCombo,idReunion){
		//La función busca la lista de acciones del plan de trabajo,
		//para llenar un combo con dicha información.
		if(idtpoAccion!=-1){
			xhr.get({
	    		url: dojo.config.app.urlBase+'catalogos/listAccionesPorTipo/'+ idtpoAccion+'/'+idReunion,
	    		sync: false,
	    		preventCache:true,
	    		handleAs: "json",
	    		contentType: "application/x-www-form-urlencoded; charset=utf-8"
	    	 }).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]" , tpoRespuesta:"-1", hayOtros:false}];
				for(var i in data){
					var descripcion="";
					if(constants.PRIMERA_REUNION==idReunion){
						descripcion = data[i].descripCortar1;
					}else if(constants.SEGUNDA_REUNION==idReunion){
						descripcion = data[i].descripCortar2;
					}else if(constants.TERCERA_REUNION==idReunion){
						descripcion = data[i].descripCortar3;
					}
					
					store.push({
						id : data[i].cAccion,
						name : descripcion,
						tpoRespuesta : data[i].cTipoRespuesta,
						hayOtros : data[i].otraDescripcion,
						hayBrigada : data[i].brigadaEsp
					});
				}
				registry.byId(idCombo).set('store',new Memory({data:store}));
				registry.byId(idCombo).set('value',idAccionSelected);
     		});
		}
	};
	var findTipoRespuesta = function (idtpoRes,idRespuestaSelected,idCombo){
		//La siguiente función busca el catálogo de posibles respuestas, 
		//siempre y cuando sea de opción múltiple, guardando la lista 
		//en el combo especificado.
		if(idtpoRes!=-1){
			xhr.get({
	    		url: dojo.config.app.urlBase+'catalogos/listRespuestaPorTipo/'+ idtpoRes,
	    		sync: false,
	    		preventCache:true,
	    		handleAs: "json",
	    		contentType: "application/x-www-form-urlencoded; charset=utf-8"
			}).then(function(data){
				var store=[{id:"-1" , name:"[Seleccione]"}];
				for(var i in data){
					store.push({ 
						id : data[i].cRespuesta,
						name : data[i].nomRespuesta
					});
				}
				registry.byId(idCombo).set('store',new Memory({data:store}));
				registry.byId(idCombo).set('value',idRespuestaSelected);
     		});
		}
	};
	
	var destruirPopUp = function (embedded,ventanaEmergente){
		//La función destruye el popUP
		new Button({
			id: embedded,
			label:'Cancelar',
			onClick : function() {
				ventanaEmergente.destroyRecursive(false);
			}
		},embedded);
	};

	var dividirString = function (cadena,longMax){
		//La función divide la cadena recibida en dos, siempre y 
		//cuando la longitud sea mayor a 50 caracteres, en caso 
		//contrario, la cadena se regresa igual.
		if(cadena.length>=longMax){
			var mitad=(cadena.length/2);
			var res=cadena.substring(mitad,cadena.length); 
			var posicion=mitad + res.indexOf(" ");
			return cadena.substring(0,posicion) + '<br>' + cadena.substring(posicion,cadena.length);
		}else{
			return cadena;
		}
	};
	
	var eliminarFilaGrid = function (idGrid,embedded,idReunion,investigarParaBorrar){
		//La función crea un botón para poder eliminar
		//una fila seleccionada del grid.
		createTag('input','remove'+idGrid,embedded);
		new Button({
			id: 'remove'+idGrid,
			label: 'Eliminar',
			onClick: function(){
				var grid = registry.byId(idGrid);
				var items = grid.selection.getSelected();
				if(items.length==0){
					cstmAlert('Debe seleccionar por lo menos un registro.');
				}else{
					//Si la variable esta como verdadera se investigará 
					//si las fila(s) seleccionada(s) son posibles de borrar.
					var eliminar = true;
					if(investigarParaBorrar){
						for(var i=0;i<items.length;i++){
							if(items[i].reunion!=idReunion){
								cstmAlert('Existe una o m\u00E1s filas que no se pueden borrar, ya que <br> provienen de la reuni\u00F3n anterior.');
								eliminar = false;
								break;
							}
						}
					}
					if(eliminar){
						grid.removeSelectedRows();
						grid.store.save();
					}
				}
			}
		},'remove'+idGrid);
	};
	
	var ocultarSeccionHTML = function (nomFila,visible,campoTexto){
		//Como en el pop_up hay campos que no se debería de 
		//capturar información, esta función los oculta y 
		//los pone como no requeridos.
		var hideDiv="block";
		var tpoCampo="cmb";
		var requerido = visible;
		if(campoTexto){tpoCampo="txt";}
		if(!visible){
			hideDiv="none";
			registry.byId(tpoCampo+nomFila).set("value","");
		}
		registry.byId(tpoCampo+nomFila).set("required", requerido);
		document.getElementById('divLBL'+nomFila).style.display=hideDiv;
		document.getElementById('divInput'+nomFila).style.display=hideDiv;
	};
	
	var imprimirEnConsola = function (variable){
		//Imprime en consola.
		console.log(json.toJson(variable));
	};
	
	var integrantesAsistieron = function(integrantesObj,reunionAsistida){
		//Esta función, regresa un arreglo con todos los integrantes de
		//la APEC, que asistieron a la reunión designada.
		var integrantes = new Array();
		for(var i in integrantesObj){
			var integranteSelecionado = registry.byId('integrante_'+ integrantesObj[i].integrante.cIntegrante).get('checked');
			if(integranteSelecionado!=false){
				var infoPrincipal = {
					cApec : integrantesObj[i].cApec,
					cReunion : reunionAsistida,
					cIntegrante : integrantesObj[i].cIntegrante
				};
				integrantes.push(infoPrincipal);
			}
		}
		
		if(integrantes.length==0){
			cstmAlert("Debe selecionar alg\u00FAn miembro de los integrantes <br> que haya asistido a la reuni\u00F3n.");
		}
		return integrantes;
	};
	
	var instructoresAsistieron = function(instructoresObj,reunionAsistida,idGridInstructores){
		//En la función existen dos alternativas, cuando se
		//selecionan solamente los instructores que asistieron
		//a la reunión o también existe la posibilidad de agregar más.
		var instructores = new Array();
		for(var i in instructoresObj){
			if(instructoresObj[i].editable==false){
				var instructorSelecionado = registry.byId('instructor_'+ instructoresObj[i].instructor.cInstructor).get('checked');
				if(instructorSelecionado!=false){
					var infoPrincipal = {
						cApec : instructoresObj[i].cApec,
						cReunion : reunionAsistida,
						cInstructor : instructoresObj[i].instructor.cInstructor,
						editable : false
					};
					instructores.push(infoPrincipal);
				}
			}
		}

		var grid = registry.byId(idGridInstructores);
		for(var i=0;i<grid.rowCount;i++){
			var cCctsArray = new Array();
			var item = grid.getItem(i);
			
			var cCcts = grid.store.getValue(item,'cCcts').split(',');
			for(var j in cCcts){
				cCctsArray.push({cCct:cCcts[j]});
			}
			
			var instructor = {
				cInstructor : grid.store.getValue(item,'cInstructor'),
				cApec : grid.store.getValue(item,'cApec'),
				paternoInstructor : grid.store.getValue(item,'paternoInstructor'),
				maternoInstructor : grid.store.getValue(item,'maternoInstructor'),
				nombreInstructor : grid.store.getValue(item,'nombreInstructor'),
				genero : grid.store.getValue(item, 'genero'),
				edad : grid.store.getValue(item, 'edad'),
				cNiveleduc : grid.store.getValue(item, 'cNiveleduc'),
				curp: grid.store.getValue(item,'curp'),
				ccts: cCctsArray
			};

			var infoPrincipal = {
				cApec: grid.store.getValue(item,'cApec'),
				cReunion: reunionAsistida,
				cApecInstructor: grid.store.getValue(item,'cApec'),
				cInstructor: grid.store.getValue(item,'cInstructor'),
				instructor: instructor,
				editable: true
			};
			
			instructores.push(infoPrincipal);
		}
		if(instructores.length==0){
			cstmAlert("Debe selecionar alg\u00FAn miembro de los instructores <br> que haya asistido a la reuni\u00F3n.");
		}
		
		return instructores;
	};
	
	var asistenciaReunion = function(idReunion,tipoAsistentes,datosObj,storeCcts){
		//Esta función crea la pestaña para agregar a los integrantes e instructores,
		//los cuales se seleccionaran dependiendo de quien asistió o no. En el caso
		//de los instructores se podrán agregar más de los que ya existen, para la 
		//edición solo se podrán aquellos que hayan sido creados dentro 
		//de la misma reunión.
		var idPanel = tipoAsistentes +'_'+ idReunion;
		var idPanelSecundario = idPanel +'_'+ "Pane";
		var textoColumna = 'Cargo';
		var storeCctsCheck = storeCcts;
		var maxIndexInstr = 0;
		var apecInstructores = 0;
		
		if(!registry.byId(idPanel)){
			crearPanel(idPanel,'Asistentes ' + tipoAsistentes,idPanelSecundario);
			if(tipoAsistentes=="Instructores"){
				textoColumna = 'Programa educativo';
			}
			
			//Se crea la tabla con todos los input que posteriormente
			//se sustituirán por los widgets.
			createTag('div','seccion' + tipoAsistentes +'_'+ idReunion,idPanelSecundario);
			var tablaHTML = '<table border="00" width= "700px" cellspacing="10">'+
								'<tr>'+
									'<td align="left"><b>Nombre</b></td>'+
									'<td align="left"><b>'+ textoColumna +'</b></td>'+
									'<td></td>'+
								'</tr>';
			for(var i in datosObj){
				var nombre = "";
				var apellidoPaterno = "";
				var apellidoMaterno = "";
				var idInput = "";
				var cargoPrograma = "";
				
				if(tipoAsistentes=="Integrantes"){
					nombre = datosObj[i].integrante.nombreIntegrante;
					apellidoPaterno = datosObj[i].integrante.paternoIntegrante;
					apellidoMaterno = datosObj[i].integrante.maternoIntegrante;
					idInput = 'integrante_'+ datosObj[i].integrante.cIntegrante;
					cargoPrograma = datosObj[i].nomCargo;
				}else{
					apecInstructores = datosObj[i].instructor.cApec;
					if(datosObj[i].editable==false){
						nombre = datosObj[i].instructor.nombreInstructor;
						apellidoPaterno = datosObj[i].instructor.paternoInstructor;
						apellidoMaterno = datosObj[i].instructor.maternoInstructor;
						curp = datosObj[i].instructor.curp;
						idInput = 'instructor_'+ datosObj[i].instructor.cInstructor;
						var ccts = datosObj[i].instructor.ccts;
						for(var j in ccts){
							cargoPrograma = cargoPrograma + ccts[j].cveCct + ' ('+ ccts[j].nomNivel +'),';
						}
						cargoPrograma = cargoPrograma.substring(0,cargoPrograma.length - 1);
					}else{
						continue;
					}
				}	
				tablaHTML = tablaHTML + '<tr>'+
					'<td align="left"><label>'+ nombre + ' ' + apellidoPaterno + ' ' + apellidoMaterno +'</label></td>'+
					'<td align="left"><label>'+ cargoPrograma +'</label></td>'+
					'<td align="center"><input id="'+ idInput +'"/></td>'+
				'</tr>';
			}
			dom.byId('seccion' + tipoAsistentes +'_'+ idReunion).innerHTML = tablaHTML + '</table>';

			//widgets
			for(var i in datosObj){
				var asistenteSelect = false;
				var idUsuario = "";
				var idWidget = "";
				
				if(tipoAsistentes=="Integrantes"){
					idUsuario = datosObj[i].integrante.cIntegrante;
					idWidget = 'integrante_'+ idUsuario;
				}else{
					idUsuario = datosObj[i].instructor.cInstructor;;
					idWidget = 'instructor_'+ idUsuario;
				}
				
				if(datosObj[i].cReunion==idReunion){asistenteSelect = true;}
				new CheckBox({
					checked: asistenteSelect,
					value: idUsuario,
				},idWidget);
			}
			
			if(tipoAsistentes=="Instructores"){
				//En el caso de los instructores, estos podrán
				//participantes en las reuniones.
				var idGrid = 'grid'+tipoAsistentes+idReunion;
				createTag('div','addAsistentes',idPanelSecundario);
				var layoutInstructores = [[
						    { name: 'Id',						  field: 'cInstructor', 	  hidden:true},
			   				{ name: 'Ccts',						  field: 'cCcts', 			  hidden:true},
			   				{ name: 'Apellido Paterno',			  field: 'paternoInstructor', width: '150px'},
			   				{ name: 'Apellido Materno',			  field: 'maternoInstructor', width: '150px'},
			   				{ name: 'Nombre', 					  field: 'nombreInstructor',  width: '150px'},
			   				{ name: 'Centro de trabajo asignado', field: 'nomCcts', 	      width: '170px'},
			   				{ name: 'G\u00E9nero',				  field: 'nomGenero',		  width: '60px' },
			   				{ name: 'genero',					  field: 'genero',			  hidden:true},
			   				{ name: 'Edad',			       		  field: 'edad',     		  width: '30px' },
			   				{ name: 'Escolaridad', 				  field: 'nomNiveleduc',	  width: '100px'},
			   				{ name: 'cNiveleduc', 				  field: 'cNiveleduc',		  hidden:true},
			   				{ name: 'Curp',						  field: 'curp',			  width: '150px'},
			   				{ name: 'cApec', 				  	  field: 'cApec',		  	  hidden:true}]];
	
				var intructoresEncontrados=new Array();
		   		for(var i in datosObj){
		   			var nomGenero='';
		   			var nomCcts='';
		   			var cCts='';
		   			
		   			var listProgramas = datosObj[i].instructor.ccts;
		   			for(var j in listProgramas){
		   				cCts = cCts + listProgramas[j].cCct + ',';
		   				nomCcts = nomCcts + listProgramas[j].cveCct + ' ('+ listProgramas[j].nomNivel +'),';
		   			}
		   			
		   			cCts = cCts.substring(0,cCts.length - 1);
		   			nomCcts = nomCcts.substring(0,nomCcts.length - 1);
		   		
		   			if(datosObj[i].instructor.genero=="F"){
		   				nomGenero='Femenino';
		   			}else{
		   				nomGenero='Masculino';
		   			}
		   			
		   			if(datosObj[i].editable==true){
		   				var instructor = {
							cInstructor: datosObj[i].instructor.cInstructor,
							cApec: datosObj[i].instructor.cApec,
							paternoInstructor:datosObj[i].instructor.paternoInstructor,
							maternoInstructor: datosObj[i].instructor.maternoInstructor,
							nombreInstructor: datosObj[i].instructor.nombreInstructor,
							genero: datosObj[i].instructor.genero,
							edad:datosObj[i].instructor.edad,
							cNiveleduc: datosObj[i].instructor.cNiveleduc,
							curp: datosObj[i].instructor.curp,
							nomNiveleduc: datosObj[i].instructor.nomNiveleduc,
							cCcts: cCts,
							nomCcts: nomCcts,
							nomGenero: nomGenero
						};
						intructoresEncontrados.push(instructor);
		   			}
		   		}

		   		maxIndexInstr = idMaxIdIntegrante(apecInstructores);
		   		
				//Se crea el grid para poder agregar a todos los instructores,
				//que estuvieron presentes en esta reunión.
		   		dom.byId('addAsistentes').innerHTML = '<br/>';
		   		crearGrid('addAsistentes',layoutInstructores,'cInstructor',intructoresEncontrados,idGrid);
	
				//Sección para los botones.
				createTag('input','add'+tipoAsistentes+idReunion,'addAsistentes');
				new Button({
					label : 'Agregar',
					onClick : function() {
						var grid = registry.byId(idGrid);
						for(var i=0;i<grid.rowCount;i++){
							var item = grid.getItem(i);
							var lastValueAsist = grid.store.getValue(item,'cInstructor');
							if(maxIndexInstr<=lastValueAsist)
								maxIndexInstr = lastValueAsist;
						}
						pop_UP_Instructor(idGrid,storeCctsCheck,maxIndexInstr);
					}
			    },'add'+tipoAsistentes+idReunion);
				
				createTag('input','edit'+tipoAsistentes+idReunion,'addAsistentes');
				new Button({
				label:'Editar',
				onClick : function(){
						var gridInstructor = registry.byId(idGrid);
						var items = gridInstructor.selection.getSelected();
						if(items.length==1){
				             dojo.forEach(items, function(selectedItem){
				                 if(selectedItem !== null){
				                	var itemToEditInstructor={
				                		cInstructor: gridInstructor.store.getValue(selectedItem,'cInstructor'),
					      				paternoInstructor: gridInstructor.store.getValue(selectedItem,'paternoInstructor'),
					      				maternoInstructor: gridInstructor.store.getValue(selectedItem,'maternoInstructor'),
					       				nombreInstructor: gridInstructor.store.getValue(selectedItem,'nombreInstructor'),
					       				genero: gridInstructor.store.getValue(selectedItem,'genero'),
					       				nomGenero: gridInstructor.store.getValue(selectedItem,'nomGenero'),
					       				edad: gridInstructor.store.getValue(selectedItem,'edad'),
					       				cCcts: gridInstructor.store.getValue(selectedItem,'cCcts'),
					       				nomCcts: gridInstructor.store.getValue(selectedItem,'nomCcts'),
					       				cNiveleduc: gridInstructor.store.getValue(selectedItem,'cNiveleduc'),
					       				curp: gridInstructor.store.getValue(selectedItem,'curp'),
					       				nomNiveleduc: gridInstructor.store.getValue(selectedItem,'nomNiveleduc'),
				                		cApec: gridInstructor.store.getValue(selectedItem,'cApec')
				                	 };
				                	pop_UP_Instructor(idGrid,storeCctsCheck,0,itemToEditInstructor);
				                 }
				             });
				         }else{
				        	 cstmAlert('Debe seleccionar s\u00f3lo un registro.');
				 		}
					}
				},'edit'+tipoAsistentes+idReunion);
	
				eliminarFilaGrid(idGrid,'addAsistentes',idReunion,false);
			}
		}
	};

	var pop_UP_Instructor = function(idGrid,storeCctsCheck,maxIndexInstr,itemToEditInstructor){
		var idVentana = 'popup_Instructor';
		var editInstructor=false;
		if(!itemToEditInstructor){
			itemToEditInstructor = {
				paternoInstructor : '',
				maternoInstructor : '',
				nombreInstructor : '',
				cCcts : [],
				nomCcts :'',
				genero :'F',
				edad : '',
				cNiveleduc : 8,
				curp :'',
				cApec : null
			};
		}else{
			editInstructor=true;
		}
		
		var dDetail =new Dialog({
			id : idVentana,
			title : 'Instructor de la APEC',
			content : '<div id="dcDetail"/>'
		});
		dDetail.show();
		dDetail.on('hide',function(){
			registry.byId(idVentana).destroyRecursive(false);
		});
		dDetail._setStyleAttr('left:20px !important;');
		dDetail._setStyleAttr('top:20px !important;');
	   	   
		createTag('div','intCnt','dcDetail');
		dom.byId('intCnt').innerHTML='<table border="0" align="left" >'+
										'<tr>'+
											'<td align="right"><b>*Apellido Paterno: </b></td>'+
											'<td><div id="paternoInstructor"/></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><br/><b>&nbsp;Apellido Materno:</b></td>'+
											'<td><br/><div id="maternoInstructor"/><br/></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><br/><b>*Nombre:</b></td>'+
											'<td><br/><div id="nombreInstructor"/><br/></td>'+
										'</tr>'+ 
										'<tr>'+
											'<td align="right"><br/><b>*Programa educativo:</b></td>'+
											'<td><br/><div id="programaEducativo"/><br/></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><br/><b>*G\u00E9nero: </b></td>'+
											'<td><br/><div id="genero"/><br/></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><br/><b>*Edad: </b></td>'+
											'<td><br/><div id="edad"/><br/></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><br/><b>*Escolaridad: </b></td>'+
											'<td><br/><div id="cNiveleduc"/><br/></td>'+
										'</tr>'+
										'<tr>'+
											'<td align="right"><br/><b>*Curp: </b></td>'+
											'<td><br/><div id="curp"/><br/></td>'+
										'</tr>'+
										'<tr>'+
											'<td colspan = "2" align="center"><br/><br/><br/><input id="aceptRowInstructor"/><br/></td>'+
										'</tr>'+   	   
									'</table>';
		
		var paternoInstructor=new ValidationTextBox({
			value:itemToEditInstructor.paternoInstructor,
			uppercase:'true',
			trim:"true",
			maxLength:"30",
			required: true
		},'paternoInstructor');

		var maternoInstructor=new ValidationTextBox({
			value:itemToEditInstructor.maternoInstructor,
			uppercase:'true',
			trim:"true",
			maxLength:"30",
			required: false
		},'maternoInstructor');
		
		var nombreInstructor=new ValidationTextBox({
			value:itemToEditInstructor.nombreInstructor,
			uppercase:'true',
			trim:"true",
			maxLength:"50",
			required: true
		},'nombreInstructor');
		
		var programaEducativo= new CheckedMultiSelect ({
			multiple:true,
			invalidMessage:"Debe seleccionar al menos un programa educativo"
		},'programaEducativo');
		
		//Se obtienen las opciones del componente y se eliminan.
		var opts = registry.byId('programaEducativo').getOptions();
		registry.byId('programaEducativo').removeOption(opts);
		// Se copian los valores del componente de ccts
		//para que no se muestren seleccionado
	  	var storeProgCcts=new Array();
	  	for(var i in storeCctsCheck){
	  		storeProgCcts.push({
	  			label: storeCctsCheck[i].label,
	  			value: storeCctsCheck[i].value,
	  			selected:false
	  		});
	  	}
	  	//Se valida que opciones del componente se
	  	//deben mostrar seleccioandas y cuales no.
	  	var cCtsList = '';
	  	if(itemToEditInstructor.cCcts!=''){
	  		cCtsList = itemToEditInstructor.cCcts.split(',');
	  	}
	  	
		for(var j in storeProgCcts){
			for(var k in cCtsList){
				if(cCtsList[k]==storeProgCcts[j].value){
					storeProgCcts[j].selected=true;
				}
			}
		}
		
		//Se asignas las opciones al componente	
		registry.byId('programaEducativo').addOption(storeProgCcts);
	   
		var genero=new FilteringSelect({
			value:itemToEditInstructor.genero,
			store: catalogoGenero(),
			required: true,
			searchAttr:"nomGenero"
		}, 'genero');
		
		var edad=new ValidationTextBox({
			value:itemToEditInstructor.edad,
			uppercase:'true',
			trim:"true",
			maxLength:"2",
			regExp : constants.NUMBER_VALID,
			required: true
		}, 'edad');
		
		var cNiveleduc=new FilteringSelect({
			value:itemToEditInstructor.cNiveleduc,
			required: true,
			store: catalogoNivelEduc(2),
			searchAttr:"name"
		}, 'cNiveleduc');
		
		var curp=new ValidationTextBox({
			value:itemToEditInstructor.curp,
			uppercase:'true',
			trim:"true",
			maxLength:"50",
			required: true
		},'curp');
		
		
		new Button({
			label : constants.TEXT_BUTTON_ACEPTAR,
			onClick : function(){
				var form = registry.byId(idVentana);
				var gridInstructor = registry.byId(idGrid);
				var cCctsSelect= programaEducativo.get('value');
				var nomCcts = '';
				var cCcts = '';
				
				if (!form.validate()){  
					cstmAlert('Favor de registrar los datos requeridos');
					return false;
				};
					
				if(programaEducativo.get('value')==''){
					cstmAlert('Debe seleccionar al menos un programa educativo');
					return false;
				}
				
				if(cCctsSelect.length>2){
					cstmAlert('No se pueden seleccionar m\u00E1s de dos programas'+ 
										' educativos por instructor.');
					return false;
				}
				
				//Se separan por comas los programas educativos
				for(var i in cCctsSelect){
					for(var j in storeProgCcts){
						if(cCctsSelect[i]==storeProgCcts[j].value){
							nomCcts = nomCcts + storeProgCcts[j].label +',';
							cCcts = cCcts + storeProgCcts[j].value +',';
						}
					}
				}
				
				cCcts = cCcts.substring(0,cCcts.length - 1);
				nomCcts = nomCcts.substring(0,nomCcts.length - 1);
				
				try{
					if(editInstructor){
						var index = gridInstructor.selection.selectedIndex;
						var item = gridInstructor.getItem(index);
						gridInstructor.store.setValue(item, 'paternoInstructor', paternoInstructor.get('value'));
						gridInstructor.store.setValue(item, 'maternoInstructor', maternoInstructor.get('value'));
						gridInstructor.store.setValue(item, 'nombreInstructor', nombreInstructor.get('value'));
						gridInstructor.store.setValue(item, 'cNiveleduc', cNiveleduc.get('value'));
						gridInstructor.store.setValue(item, 'curp', curp.get('value'));
						gridInstructor.store.setValue(item, 'nomNiveleduc', cNiveleduc.get('displayedValue'));
						gridInstructor.store.setValue(item, 'edad', edad.get('value'));
						gridInstructor.store.setValue(item, 'genero', genero.get('value'));
						gridInstructor.store.setValue(item, 'nomGenero', genero.get('displayedValue'));
						gridInstructor.store.setValue(item, 'cCcts', cCcts);
						gridInstructor.store.setValue(item, 'nomCcts',nomCcts);
						gridInstructor.update();
					}else{
	    				var myNewItem = {
	    					cInstructor: ++maxIndexInstr,
							paternoInstructor: paternoInstructor.get('value'),
							maternoInstructor: maternoInstructor.get('value'), 
							nombreInstructor: nombreInstructor.get('value'),
							cNiveleduc: cNiveleduc.get('value'),
							curp: curp.get('value'),
							nomNiveleduc: cNiveleduc.get('displayedValue'),
		       				genero: genero.get('value'),
		       				nomGenero: genero.get('displayedValue'),
		       				edad: edad.get('value'),
							cCcts: cCcts,
							nomCcts: nomCcts,
							cApec: null
		       			};
			    		gridInstructor.store.newItem(myNewItem);
					}
				     registry.byId(idVentana).destroyRecursive(false);
				}catch(e){
					cstmAlert('Ocurri\u00f3 un error al Agregar o Editar');
					console.log(e);
				}			
			}
		},'aceptRowInstructor');
	};
	
	var catalogoNivelEduc = function (tipoMiembro,nombreComponente){
		//La función regresa un catálogo con los niveles
		//educativos posibles, dependiendo del miembro
		//que se especifique.
		var cNivelEducStore = {};
		xhr.get({
			url: dojo.config.app.urlBase + 'catalogos/listNivelesEducConafe/'+tipoMiembro,
			sync: true,
			preventCache:true,
			handleAs: "json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			handleAs: "json"
		}).then(function(data){
			var store=[];
			for(var j in data){
				store.push({
					id:data[j].cNiveleduc,
					name:data[j].nomNiveleduc
				});
			}
			cNivelEducStore = new Memory({data:store});
	    });
		return cNivelEducStore;
	};
	
	var idMaxIdIntegrante = function(apec){
		//Esta función regresa el último id ingresado
		//en la tabla de instructores.
		var idMax = 0;
		xhr.get({
			url: dojo.config.app.urlBase + 'catalogos/listMaxIdIntegrante/'+apec,
			sync: true,
			preventCache:true,
			handleAs: "json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			handleAs: "json"
		}).then(function(data){
			idMax = data;
	    });
		return idMax;
	};

	var catalogoGenero = function (){
		//La función regresa un catálogo
		//con los géneros que existen.
		var jsonGeneroStore = {
			identifier: 'genero',
			label: 'nomGenero',
			items: [{genero: 'M',nomGenero: 'Masculino'},
			        {genero: 'F',nomGenero: 'Femenino'}]
		};
		generoStore = new dojo.data.ItemFileWriteStore({data: jsonGeneroStore});
		return generoStore;
	};
	
    //Checks if a a given string str ends withs suffix
    var endsWith = function (str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    };
    
    var destroyDivs = function (divArray){
    	var n;
    	var value;
    	
    	var len=divArray.length;
    	for(var i=0; i<len; i++) {
    		value = divArray[i];

    		n = dojo.byId(value);
    		dojo.forEach(dijit.findWidgets(n), 'item.destroy()');

    		dojo.empty(n);
    	}
    	
    };
    
    var dateFormat = function (date, format) {
    	
        format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate()); 
        format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1)); 
        format = format.replace("YYYY", date.getFullYear());
        
        return format;
    };
    
    var cicloFormat = function (ciclo_escolar) {
    	
    	//Se valida el ciclo escolar.
		
		var ciclo_ini=ciclo_escolar.substring(0,4);
		var ciclo_fin=ciclo_escolar.substring(5,10);
		var diferencia= ciclo_fin-ciclo_ini;
		
        return diferencia;
    };
    
    
    
    
    var cstmAlert = function(mensaje){
    	
    	var dAlert = new Dialog({
			title : 'Mensaje de Sistema',
			content : '<div id="alertCnt" align="center"><table border="0" ><tr>'+
					  '<td><img src="static/img/cstmAlert.png"></td>'+
					  '<td>'+mensaje+'</td>'+
					  '</tr></table><br></div>',
			id : "cstmAlert",
			styles : "text-align: center"
		});
    	dAlert.closeButtonNode.style.display = "none";
    	dAlert._onKey = function(evt) {
			key = evt.keyCode;
			if (key == dojo.keys.ESCAPE) {
				dojo.stopEvent(evt);
			}
		};
    	
		dAlert.show();
    	
    	createTag('div', 'cancelarAlert', 'alertCnt');
    	new Button({
			label : " Aceptar",
			onClick : function() {
				dAlert.destroyRecursive(false);
			}
		}, "cancelarAlert");
    };
    
    var basicAlert = function(mensaje){
    	
    	var dAlert = new Dialog({
			title : 'Mensaje de Sistema',
			content : '<div id="alertCnt" align="center"><table border="0" ><tr>'+
					  '<td>'+mensaje+'</td>'+
					  '</tr></table><br></div>',
			id : "cstmAlert",
			styles : "text-align: center"
		});
    	dAlert.closeButtonNode.style.display = "none";
    	dAlert._onKey = function(evt) {
			key = evt.keyCode;
			if (key == dojo.keys.ESCAPE) {
				dojo.stopEvent(evt);
			}
		};
    	
		dAlert.show();
    	
    	createTag('div', 'cancelarAlert', 'alertCnt');
    	new Button({
			label : " Aceptar",
			onClick : function() {
				dAlert.destroyRecursive(false);
			}
		}, "cancelarAlert");
    };
    
    var jsonPath=function (obj, expr, arg) {
    	   var P = {
    	      resultType: arg && arg.resultType || "VALUE",
    	      result: [],
    	      normalize: function(expr) {
    	         var subx = [];
    	         return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
    	                    .replace(/'?\.'?|\['?/g, ";")
    	                    .replace(/;;;|;;/g, ";..;")
    	                    .replace(/;$|'?\]|'$/g, "")
    	                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
    	      },
    	      asPath: function(path) {
    	         var x = path.split(";"), p = "$";
    	         for (var i=1,n=x.length; i<n; i++)
    	            p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
    	         return p;
    	      },
    	      store: function(p, v) {
    	         if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
    	         return !!p;
    	      },
    	      trace: function(expr, val, path) {
    	         if (expr) {
    	            var x = expr.split(";"), loc = x.shift();
    	            x = x.join(";");
    	            if (val && val.hasOwnProperty(loc))
    	               P.trace(x, val[loc], path + ";" + loc);
    	            else if (loc === "*")
    	               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
    	            else if (loc === "..") {
    	               P.trace(x, val, path);
    	               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
    	            }
    	            else if (/,/.test(loc)) { // [name1,name2,...]
    	               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
    	                  P.trace(s[i]+";"+x, val, path);
    	            }
    	            else if (/^\(.*?\)$/.test(loc)) // [(expr)]
    	               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
    	            else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
    	               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
    	            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
    	               P.slice(loc, x, val, path);
    	         }
    	         else
    	            P.store(path, val);
    	      },
    	      walk: function(loc, expr, val, path, f) {
    	         if (val instanceof Array) {
    	            for (var i=0,n=val.length; i<n; i++)
    	               if (i in val)
    	                  f(i,loc,expr,val,path);
    	         }
    	         else if (typeof val === "object") {
    	            for (var m in val)
    	               if (val.hasOwnProperty(m))
    	                  f(m,loc,expr,val,path);
    	         }
    	      },
    	      slice: function(loc, expr, val, path) {
    	         if (val instanceof Array) {
    	            var len=val.length, start=0, end=len, step=1;
    	            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
    	            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
    	            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
    	            for (var i=start; i<end; i+=step)
    	               P.trace(i+";"+expr, val, path);
    	         }
    	      },
    	      eval: function(x, _v, _vname) {
    	         try { return $ && _v && eval(x.replace(/@/g, "_v")); }
    	         catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
    	      }
    	   };

    	   var $ = obj;
    	   if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
    	      P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
    	      return P.result.length ? P.result : false;
    	   }
    	} ;

    
    	// Función modulo, regresa el residuo de una división 
    	var mod = function (dividendo , divisor){ 
    	  resDiv = dividendo / divisor ;  
    	  parteEnt = Math.floor(resDiv);            
    	  parteFrac = resDiv - parteEnt ;     
    	  modulo = Math.round(parteFrac * divisor);  
    	  return modulo; 
    	}; // Fin de función mod
    	
    	
    	// Función ObtenerParteEntDiv, regresa la parte entera de una división
    	var ObtenerParteEntDiv = function (dividendo , divisor){ 
    	  resDiv = dividendo / divisor ;  
    	  parteEntDiv = Math.floor(resDiv); 
    	  return parteEntDiv; 
    	}; // Fin de función ObtenerParteEntDiv
    	
    	// function fraction_part, regresa la parte Fraccionaria de una cantidad
    	var fraction_part = function (dividendo , divisor){ 
    	  resDiv = dividendo / divisor ;  
    	  f_part = Math.floor(resDiv); 
    	  return f_part; 
    	}; // Fin de función fraction_part

    	
    	
    	
    	// function string_literal conversion
    	 var string_literal_conversion = function (number){   
    	   centenas = ObtenerParteEntDiv(number, 100); 
    	   
    	   number = mod(number, 100); 

    	   decenas = ObtenerParteEntDiv(number, 10); 
    	   number = mod(number, 10); 

    	   unidades = ObtenerParteEntDiv(number, 1); 
    	   number = mod(number, 1);  
    	   string_hundreds="";
    	   string_tens="";
    	   string_units="";
    	  
    	   if(centenas == 1){
    	      string_hundreds = "ciento ";
    	   } 
    	   
    	   
    	   if(centenas == 2){
    	      string_hundreds = "doscientos ";
    	   }
    	    
    	   if(centenas == 3){
    	      string_hundreds = "trescientos ";
    	   } 
    	   
    	   if(centenas == 4){
    	      string_hundreds = "cuatrocientos ";
    	   } 
    	   
    	   if(centenas == 5){
    	      string_hundreds = "quinientos ";
    	   } 
    	   
    	   if(centenas == 6){
    	      string_hundreds = "seiscientos ";
    	   } 
    	   
    	   if(centenas == 7){
    	      string_hundreds = "setecientos ";
    	   } 
    	   
    	   if(centenas == 8){
    	      string_hundreds = "ochocientos ";
    	   } 
    	   
    	   if(centenas == 9){
    	      string_hundreds = "novecientos ";
    	   } 
    	   
    	 // end switch hundreds 

    	  
    	   if(decenas == 1){
    	     
    	      if(unidades == 1){
    	         string_tens = "once";
    	      }
    	      
    	      if(unidades == 2){
    	         string_tens = "doce";
    	      }
    	      
    	      if(unidades == 3){
    	         string_tens = "trece";
    	      }
    	      
    	      if(unidades == 4){
    	         string_tens = "catorce";
    	      }
    	      
    	      if(unidades == 5){
    	         string_tens = "quince";
    	      }
    	      
    	      if(unidades == 6){
    	         string_tens = "diecis\u00E9is";
    	      }
    	      
    	      if(unidades == 7){
    	         string_tens = "diecisiete";
    	      }
    	      
    	      if(unidades == 8){
    	         string_tens = "dieciocho";
    	      }
    	      
    	      if(unidades == 9){
    	         string_tens = "diecinueve";
    	      }
    	   } 
    	   
    	   if(decenas == 2){
    	      string_tens = "veinti";

    	   }
    	   if(decenas == 3){
    	      string_tens = "treinta";
    	   }
    	   if(decenas == 4){
    	      string_tens = "cuarenta";
    	   }
    	   if(decenas == 5){
    	      string_tens = "cincuenta";
    	   }
    	   if(decenas == 6){
    	      string_tens = "sesenta";
    	   }
    	   if(decenas == 7){
    	      string_tens = "setenta";
    	   }
    	   if(decenas == 8){
    	      string_tens = "ochenta";
    	   }
    	   if(decenas == 9){
    	      string_tens = "noventa";
    	   }
    	   
    	    // Fin de swicth decenas

    	   if (decenas == 1) 
    	   { 
    	      string_units="";   
    	   } 
    	   else 
    	   { 
    	      if(unidades == 1){
    	         string_units = "un";
    	      }
    	      if(unidades == 2){
    	         string_units = "dos";
    	      }
    	      if(unidades == 3){
    	         string_units = "tres";
    	      }
    	      if(unidades == 4){
    	         string_units = "cuatro";
    	      }
    	      if(unidades == 5){
    	         string_units = "cinco";
    	      }
    	      if(unidades == 6){
    	         string_units = "seis";
    	      }
    	      if(unidades == 7){
    	         string_units = "siete";
    	      }
    	      if(unidades == 8){
    	         string_units = "ocho";
    	      }
    	      if(unidades == 9){
    	         string_units = "nueve";
    	      }
    	       // end switch units 
    	   } // end if-then-else 
   
    	if (centenas == 1 && decenas == 0 && unidades == 0) 
    	{ 
    	   string_hundreds = "cien " ; 
    	}  
 
    	if (decenas == 1 && unidades ==0) 
    	{ 
    	   string_tens = "diez " ; 
    	} 
    	if (decenas == 2 && unidades ==0) 
    	{ 
    	  string_tens = "veinte " ; 
    	} 

    	if (decenas >=3 && unidades >=1) 
    	{ 
    	   string_tens = string_tens+" y "; 
    	} 

    	final_string = string_hundreds+string_tens+string_units;


    	return final_string ; 

    	}; //end of function string_literal_conversion 

    	
    	var covertirNumLetras = function (number){
    	 
    	   number1=number; 
    	 
    	   cent = number1.split(".");   
    	   centavos = cent[1];
    	   
    	   if (centavos == 0 || centavos == undefined){
    	   centavos = "00";}

    	   if (number == 0 || number == ""){  
    	      centenas_final_string=" cero ";   
    	   } 
    	   else{ 
    	   
    	     millions  = ObtenerParteEntDiv(number, 1000000);  
    	      number = mod(number, 1000000);            
    	      
    	     if (millions != 0){                      
    	     
    	         if (millions == 1){              
    	            descriptor= " mill\u00F3n ";   
    	         } 
    	         else{                            
    	              descriptor = " millones "; 
    	         } 
    	     } 
    	     else{    
    	         descriptor = " ";                 
    	      } 
    	      millions_final_string = string_literal_conversion(millions)+descriptor; 
    	          
    	      
    	      thousands = ObtenerParteEntDiv(number, 1000);   
    	        number = mod(number, 1000);            
    	    
    	     if (thousands != 1){            
    	         thousands_final_string =string_literal_conversion(thousands) + " mil "; 
    	     } 
    	     if (thousands == 1){
    	         thousands_final_string = " mil "; 
    	     }
    	     if (thousands < 1){ 
    	         thousands_final_string = " "; 
    	     } 
    	     centenas  = number;                     
    	     centenas_final_string = string_literal_conversion(centenas) ; 
    	      
    	   } //end if (number ==0) 

    	   cad = millions_final_string+thousands_final_string+centenas_final_string; 
    	   
    	   /* Convierte la cadena a Mayúsculas*/
    	   cad = cad.toUpperCase();       

    	   if (centavos.length>2){   
    	      if(centavos.substring(2,3)>= 5){
    	         centavos = centavos.substring(0,1)+(parseInt(centavos.substring(1,2))+1).toString();
    	      }   else{
    	        centavos = centavos.substring(0,2);
    	       }
    	   }

    	   /* Concatena a los centavos la cadena "/100" */
    	   if (centavos.length==1){
    	      centavos = centavos+"0";
    	   }
    	   centavos = centavos+ "/100"; 

    	   /* Asigna el tipo de moneda, para 1 = PESO, para distinto de 1 = PESOS*/
    	   if (number == 1){
    	      moneda = " PESO ";  
    	   }
    	   else
    	   {
    	      moneda = " PESOS ";  
    	   }
    	   /* Regresa el número en cadena entre paréntesis y con tipo de moneda y la fase M.N.*/
    	  return cad+moneda;
    	};
    	
    	JSONP = {  
    			script: null,  
    			options: {},  
    			call: function(url, options){  
    				if(!options) this.options = {};  
    				this.options.callback = options.callback || function(){};
    				this.options.callbackParamName = options.callbackParamName || "callback"; 
    				this.options.params = options.params || [];
    				var separator = url.indexOf("?") > -1? "&" : "?";  
    				var params = [];  
    				for(var prop in this.options.params){  
    					if(options.params[prop].constructor.toString().indexOf("Array") == -1)
    						params.push(prop + "=" + encodeURIComponent(options.params[prop]));
    					else
    						for(var i in options.params[prop]){
    							params.push(prop + "=" + encodeURIComponent(options.params[prop][i]));
    						}
    				}  
    				var stringParams = params.join("&");  
    				var head = document.getElementsByTagName("head")[0];  
    				if(this.script){ head.removeChild(script); }  
    				script = document.createElement("script");  
    				script.type = "text/javascript";
    				script.src = url + separator + stringParams + (stringParams?"&":"") +
    				this.options.callbackParamName +"=JSONP.process";  
    				head.appendChild(script);
    			},    
    			process: function(data) {this.options.callback(data);} 
    		};
    	XFRAME = {  
    			iframe: null,  
 				options: {},  
 				call: function(url, options){  
 					if(!options) this.options = {};  
 					this.options.callback = options.callback || function(){}; 
 					this.options.params = options.params || [];
 					var separator = url.indexOf("?") > -1? "&" : "?";  
 					var params = [];  
 					for(var prop in this.options.params){  
 							params.push(prop + "=" + encodeURIComponent(options.params[prop]));  
 					}  
 					var stringParams = params.join("&");  
 					var head = document.getElementsByTagName("head")[0];  
 					if(this.script){ head.removeChild(iframe); }  
 					iframe = document.createElement("iframe");  
 					iframe.src = url + separator + stringParams + (stringParams?"&":"");  

 					
 					if((dojo.isIE && iframe.src.length>=1700)
 								|| (!dojo.isIE && iframe.src.length>=7000)){
 						cstmAlert('Para exportar, debe reducir el n\u00famero de filtros seleccionados');
 						return false;
 					}
 			
 					head.appendChild(iframe);
 			},    
 				process: function(data) {this.options.callback(data);} 
 			};
    	
    	var capLock = function(e){
    		kc=e.keyCode?e.keyCode:e.which;
    		sk=e.shiftKey?e.shiftKey:((kc==16)?true:false);
    		if(((kc>=65&&kc<=90)&&!sk)||((kc>=97&&kc<=122)&&sk)){
    			dom.byId('caplock').style.visibility = 'visible';
    		}else{
    			dom.byId('caplock').style.visibility = 'hidden';
    		}
    	};

    return {
    	isEmpty: isEmpty,
    	createTag:createTag,
    	cerrarPestania:cerrarPestania,
    	crearPanel:crearPanel,
    	crearGrid:crearGrid,
    	pestaniaSelect:pestaniaSelect,
    	asistenciaReunion:asistenciaReunion,
    	findBullyingXTipo:findBullyingXTipo,
    	findAccionesXTipo:findAccionesXTipo,
    	findTipoRespuesta:findTipoRespuesta,
    	destruirPopUp:destruirPopUp,
    	dividirString:dividirString,
    	eliminarFilaGrid:eliminarFilaGrid,
    	ocultarSeccionHTML:ocultarSeccionHTML,
    	imprimirEnConsola:imprimirEnConsola,
    	integrantesAsistieron:integrantesAsistieron,
    	instructoresAsistieron:instructoresAsistieron,
    	catalogoNivelEduc:catalogoNivelEduc,
    	catalogoGenero:catalogoGenero,
    	idMaxIdIntegrante:idMaxIdIntegrante,
    	endsWith: endsWith,
    	destroyDivs:destroyDivs,
    	dateFormat:dateFormat,
    	cicloFormat:cicloFormat,
    	cstmAlert:cstmAlert,
    	basicAlert:basicAlert,
    	jsonPath:jsonPath,
    	covertirNumLetras:covertirNumLetras,
    	JSONP:JSONP,
    	XFRAME:XFRAME,
    	capLock:capLock
    };
});