define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/form/CheckedMultiSelect","app/util/jsUtils","dojo/_base/xhr","dojo/_base/json",
         "dijit/form/ValidationTextBox","dojo/on","dijit/form/RadioButton","dijit/form/Textarea",
         "dojo/dom", "dojo/data/ItemFileWriteStore", "dijit/form/FilteringSelect",
         "dijit/form/CheckBox", "dojox/grid/EnhancedGrid", "dijit/form/Button", "app/util/constants",  "dijit/form/Form",
         "dojo/_base/xhr", "dojo/DeferredList", "dojox/widget/Standby","dojo/data/ItemFileWriteStore",
         "dojox/form/MultiComboBox","dojox/grid/DataGrid","app/reuniones/reuniones","dojo/_base/lang",
         "dijit/form/CheckBox", "app/util/constants","dijit/Dialog","dojo/store/Memory","app/reuniones/primeraAsamblea"], 
function( ContentPane,registry,array,utils,CheckedMultiSelect,jsUtils,xhr,json,ValidationTextBox,
		on,RadioButton,Textarea,dom, ItemFileWriteStore, FilteringSelect,
		CheckBox, EnhancedGrid, Button, constants, Form, xhr, DeferredList, Standby, ItemFileWriteStore,
		MultiComboBox,DataGrid,reuniones,lang, CheckBox, constants, Dialog, Memory,primeraAsamblea){
	
	var segundaAsambleaObj= new Object();
	var sinDatosStr='<br> <b>Lo sentimos, usted no cuenta con datos de ENLACE. </b>';
		
	function init(actividades,cCct,ReunionObj){
		registry.byId('nomActividad').set('readOnly',true);
		segundaAsambleaObj = ReunionObj; 

  		gActividades=actividades;
	   		
  		_programas(array.indexOf(actividades,41)!=-1);
  		_mejoras(array.indexOf(actividades,42)!=-1, cCct);
  		_recursos(array.indexOf(actividades,43)!=-1);
  		_planeacion(array.indexOf(actividades,46)!=-1);
  		_comites(array.indexOf(actividades,45)!=-1, cCct);
  		_metas(array.indexOf(actividades,47)!=-1);
  		_compromisos(array.indexOf(actividades,47)!=-1);
  		
 	   primeraAsamblea.asistentes(array.indexOf(actividades, 41)!=-1 || 
  			  array.indexOf(actividades, 42)!=-1 ||
 			  array.indexOf(actividades, 43)!=-1 ||
 			  array.indexOf(actividades, 44)!=-1 ||
 			  array.indexOf(actividades, 45)!=-1 ||
 			  array.indexOf(actividades, 46)!=-1 ||
 			  array.indexOf(actividades, 47)!=-1, segundaAsambleaObj
 			  );
		   
	}
	
	var jsonMejorasStore = new Object();
	xhr.get({
		url: dojo.config.app.urlBase + "catalogos/listMejoras",
		sync: false, preventCache:true,handleAs: "json",
		contentType: "application/x-www-form-urlencoded; charset=utf-8"
	} ).then(function(cMejoras){
		
		var data=[{name:"[Seleccione]",	id:"0"}];
   
		for(var i in cMejoras){
			data.push({name:cMejoras[i].nomMejoraCct,id:cMejoras[i].cMejoraCct});
		}
		jsonMejorasStore = new Memory({
			data: data
		});
		
	});
	
   function _programas(crea){
	   
	   var listProgramas= new Array({title:"Programas Federales",tpoPrograma:1},
								   {title: "Programas Estatales",tpoPrograma:2},
								   {title:"Programas Locales",tpoPrograma:3},
								   {title:"Proyectos OSC",tpoPrograma:4});
	   var id = 'programasPane';
	  
	   if(crea){
		   if(!registry.byId(id)){
			   
			    var idxTpoPrgr = 0;
			    var tpoPrograma = 0;
		    	var nomTpoPgr = '';
		    	var contenido = '<table border="0" align="lefth" >'; 
		    	
			    for(var i in segundaAsambleaObj.programas ){
			    	
		    		if(tpoPrograma != segundaAsambleaObj.programas[i].tpoPrograma
		    				&& tpoPrograma!=0)
		    			contenido += '</ul></td></tr>';
			    	
			    	if(tpoPrograma != segundaAsambleaObj.programas[i].tpoPrograma 
			    			&& listProgramas[idxTpoPrgr]){
						contenido += '<tr><td>**<b> Gesti\u00F3n de ' 
							   + listProgramas[idxTpoPrgr].title + '</b></td></tr>';
						contenido += '<tr><td><ul type = circle>';
						nomTpoPgr = listProgramas[idxTpoPrgr].title;
						idxTpoPrgr++;
			    	}
			    	tpoPrograma = segundaAsambleaObj.programas[i].tpoPrograma;

			    	if(!segundaAsambleaObj.programas[i].cPrograma){
			    		contenido += '<li> No seleccion\u00F3 ninguno de los<b> ' + nomTpoPgr
					   		+ '</b> en la primera sesi\u00F3n </li>';
			    	}else{
						contenido += '<li>' + segundaAsambleaObj.programas[i].nomPrograma +
							(segundaAsambleaObj.programas[i].nomOtroPrograma?': ' + 
									segundaAsambleaObj.programas[i].nomOtroPrograma:'')
							+ '</li>';
			    	}
					 
		       }
			    
			   contenido += ' </table>';
			   contenido += ' <br><br><font size=1> ** Informaci\u00F3n recabada en la Primera Sesi\u00F3n. </Font>';

			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:'Programas',
		           id:id,
		           content: contenido,
		       })); 
		   
			   registry.byId('pestanias').selectChild(id,true);

		   }
	   }
	   else{
		   if(registry.byId(id))
			   registry.byId('pestanias').closeChild(registry.byId(id)); 
		} 
   }
   
   function _mejoras(crea){
	   var id="mejorasPane"; 
	   if(crea){
		   if(!registry.byId(id)){
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Mejoras",
		           id:id
		       }));
			   
			   jsUtils.createTag('div',id+'Grid',id);
			   
			   dom.byId(id+'Grid').innerHTML='<table border="0" align="left" width= "900px">'+
			   '<tr>' +
		   	   '	<td><input id="mejorasGrid"/></td>'+
			   '</tr>'+
			   '<tr>' +
		   	   	'<td><input id="mejorasAgregar"/> <input id="mejorasEditar"/> <input id="mejorasEliminar"/></td>'+
			   '</tr>'+
			   '</table>';
			   
			   var layout = [[	  { name: 'cMejoraCct', field: 'cMejoraCct', width: '5px', hidden:true},
				    		      { name: 'Proyecto', field: 'nomMejoraCct',  width:'250px'},
				    		      { name: 'nomOtraMejora', field: 'nomOtraMejora', width: '5px', hidden:true},
				    		      { name: 'Actividades', field: 'actividades', width: '300px'},
				    		      { name: 'Metas y objetivos', field: 'metasObjetivos', width: '300px'}]];
			   
			   new DataGrid({
			        id:'mejorasGrid',
			        structure: layout,
			        //autoHeight: true,
			        rowSelector: '10px',
			        height: '300px',
					width: '800px'
					},
			        'mejorasGrid').startup();
			   
			   var data = {
					      identifier: "cMejoraCct",
					      items: segundaAsambleaObj.mejoras
					    };
			   var newStore = new ItemFileWriteStore({data: data});
			   registry.byId('mejorasGrid').setStore(newStore);

			   //jsUtils.createTag('div',id+'Agregar',id);
			   new Button({
					label : " Agregar ",
					id:'mejorasAgregar',
					onClick : function() {
				         _mejoraDetail(); 
					}
				}, 'mejorasAgregar');
			   
			   //jsUtils.createTag('div',id+'Editar',id);
			   new Button({
					label : " Editar ",
					id:'mejorasEditar',
					onClick : function() {
						var items = registry.byId('mejorasGrid').selection.getSelected();
						if(items.length==1){
			                 dojo.forEach(items, function(selectedItem){
			                     if(selectedItem !== null){
			                    	
			                    	var itemToEdit={selectedItem:selectedItem,
			                    		cMejoraCct: registry.byId('mejorasGrid').store.getValue(selectedItem,'cMejoraCct'), 
			                    		nomMejoraCct: registry.byId('mejorasGrid').store.getValue(selectedItem,'nomMejoraCct'),
			                    		nomOtraMejora: registry.byId('mejorasGrid').store.getValue(selectedItem,'nomOtraMejora'),
									    actividades: registry.byId('mejorasGrid').store.getValue(selectedItem,'actividades'),
									    metasObjetivos: registry.byId('mejorasGrid').store.getValue(selectedItem,'metasObjetivos')};
			                    	_mejoraDetail(itemToEdit);
			                     }
			                 }); 
			             }else{
			            	 jsUtils.cstmAlert(
								'Debe seleccionar solo un registro.');
			             }
						
					}
				},'mejorasEditar');
			   
			   //jsUtils.createTag('div',id+'Eliminar',id);
			   new Button({
					label : " Eliminar ",
					id:'mejorasEliminar',
					onClick : function() {
						registry.byId('mejorasGrid').removeSelectedRows();
						registry.byId('mejorasGrid').store.save();
					}
			   },'mejorasEliminar');
			   
			   registry.byId('pestanias').selectChild(registry.byId(id),true);

  
		   }
	   }else{
		   if(registry.byId(id)){
			   registry.byId('pestanias').closeChild(registry.byId(id));
		   }   
		}
   }

   function _recursos(crea){
	   var recursos="recursos";
	   var id="recursosPane";
	   var respuesta="";
	   if(crea){
		   if(!registry.byId(id)){
			   
			   if(segundaAsambleaObj[recursos][2].indRecurso==0 || segundaAsambleaObj[recursos][2].indRecurso=='o'){
			   		respuesta="No";
			   	}
			 
			   	if(segundaAsambleaObj[recursos][2].indRecurso==1){
			   		respuesta="Si";
			   	}
			   	
			   	if(segundaAsambleaObj[recursos][2].indRecurso==2){
			   		respuesta="No existe asociaci\u00F3n de padres de familia o su equivalente en el centro escolar";
			   	}
			   
			   var contenido= '<table border="0" align="lefth" >'+ 
			   '<tr><td>'+ 
			   '	<span align="lefth" class="sub">** Informe de los Recursos de fuentes distintas a los programas, recabados por el Consejo Escolar </span>'+ 
			   '</td></tr>'+ 
			   '<tr><td> '+ 
			   '	 <p>1.Recursos recabados por donaciones de personas f\u00EDsicas o morales, a la escuela.( Otorgan o transfiere al centro escolar'+ 
			   '	  gratuitamente el dominio de una cosa, como  puede  ser dinero, materiales etc.)</p>'+ 
			   '	  *Monto N\u00FAmero: <b>' +  segundaAsambleaObj[recursos][0].monto + '</b>'+
			   '	  &nbsp;&nbsp;&nbsp; *Letra: <b>'+  segundaAsambleaObj[recursos][0].montoStr + '</b>'+
			   '	  <br><br>*Materiales:<b>'+ segundaAsambleaObj[recursos][0].especie + '</b>'+
			   '</td></tr>'+ 
			   '<tr><td>'+ 
			   '	<p>2.Recursos recabados por actividades de rifas, ventas, etc.</p>'+ 
			   '	  *Monto N\u00FAmero: <b>'+ segundaAsambleaObj[recursos][1].monto + '</b>'+
			   '	  &nbsp;&nbsp;&nbsp; *Letra: <b> '+ segundaAsambleaObj[recursos][1].montoStr + '</b>'+ 
			   '</td></tr> '+ 
			   '<tr><td>'+ 
			   '<br><br>	<span align="lefth" class="sub"> **\u00BFPromovi\u00F3 informe  de la asociaci\u00F3n de padres de familia o su equivalente, ante la'+ 
			   '	comunidad educativa sobre el monto y  uso que le dar\u00E1 a los recursos recabados? </span><br>'+ 
			   '<br><b>&nbsp;&nbsp;'+ respuesta +'</b>'+
			   '</td></tr>'+ 
			   '</table>' +
			   ' <br><br><font size=1> ** Informaci\u00F3n recabada en la Primera Sesi\u00F3n. </Font>';
			   			  
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Recursos",
		           content: contenido,
		           id:id
		       }));
			   
			   registry.byId('pestanias').selectChild(registry.byId(id),true);
			   
		   }
		} 
	   
	   else{
			if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			}
		} 
		
   }
   
   function _planeacion(crea){
	  var resp1="";
	  var resp2="";
	  var id="planeacionPane";
	  if(crea){
		   if(!registry.byId(id)){
			   console.log(json.toJson(segundaAsambleaObj["planeacion"]));
			   
			   resp1=segundaAsambleaObj.planeacion.indPlaneacion==true?
					   ('S\u00ED: ' + segundaAsambleaObj.planeacion.nomPlaneacion 
							    + (segundaAsambleaObj.planeacion.nomOtroPlaneacion?
							    		': ' + segundaAsambleaObj.planeacion.nomOtroPlaneacion:'')
							   ):
						   'No';
			   
			   resp2=segundaAsambleaObj.planeacion.indParticipacion==true?('S\u00ED: ' + segundaAsambleaObj.planeacion.actividades):'No';
			   
			   var contenido='<table border="0" align="lefth" >'+ '<tr><td><b align=center> ** Planeaci\u00F3n Escolar </b></td></tr>'+
			   '<tr><td> '+ 
			   '	 <p>1. \u00BFEl Consejo Escolar conoce la planeaci\u00F3n anual de su centro escolar para este ciclo  2012-2013?</p>'+
			   '	 <br><b> '+ resp1 +'</b></br>'+
			   '</td></tr>'+ 
			   '<tr><td>'+ 
			   '	<p>2. \u00BFEl Consejo Escolar  participa en alguna de las actividades de la planeaci\u00F3n de su centro escolar?</p>'+
			   '	 <br><b> '+ resp2 +'</b></br>'+
			   '</td></tr> '+ 
			   '</table>' +
			   ' <br><br><font size=1> ** Informaci\u00F3n recabada en la Primera Sesi\u00F3n. </Font>';
			  
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Planeaci\u00F3n Escolar",
		           content: contenido,
		           id:id
		       })); 
			   
			   registry.byId('pestanias').selectChild(registry.byId(id),true);
			  
		   }
		} else{
			if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			}
		} 
		
   }
      
   function _comites(crea,cCct){
	   var id="comitesPane";
	   if(crea){
		   if(!registry.byId(id)){
			   
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Comit\u00e9s",
		           id:id
		       }));
			   
			   registry.byId('pestanias').selectChild(registry.byId(id),true);
			   
			   var layout = [[
			                  	{ name: 'cComite', 			field:'cComite', 		width: '5px', hidden:true},
				    		    { name: '**Comit\u00E9s', 	field: 'nomComites', 	width: '250px'},
				    		    { name: 'Integrantes', 		field: 'integrantes',  	width: '500px'},
				    		    { name: ' \u00BFCuenta con proyecto anual de actividades?',	
						    		field:'indProyAnualCom',
							    	   width: "auto",
							    	   styles: "text-align: center",
							    	   type: dojox.grid.cells.Bool,
							    	   editable: true
							    	}
				    		]];
			  
			   /*set up data store*/
			    var data = {
			      identifier: "cComite",
			      items: []
			    };
			    
			    for(var cont in segundaAsambleaObj.comites){
			    	
			    	data.items.push({cComite:segundaAsambleaObj.comites[cont].cComite, 
			    					nomComites: segundaAsambleaObj.comites[cont].nomComite, 
			    					integrantes: segundaAsambleaObj.comites[cont].nomIntegrantes,
			    					indProyAnualCom:segundaAsambleaObj.comites[cont].indProyAnualCom});	
			    }
			      
			    var store = new ItemFileWriteStore({data: data});
			    
			    utils.createTag('div','gridDivComites',id);
			    
			    dom.byId('gridDivComites').innerHTML='<table border="0" align="left" width= "900px">'+
				   '<tr>' +
			   	   '	<td><input id="gridComites"/></td>'+
				   '</tr>'+
				   '<tr>' +
			   	   	'<td><font size=1> ** Informaci\u00F3n recabada en la Primera Sesi\u00F3n. </Font></td>'+
				   '</tr>'+
				   '</table>';
				
		       	new DataGrid({
				        id: 'gridComites',
				        store:store, 
				        structure: layout,
				        height: '320px',
					    width: '800px',
				        rowSelector: '10px'
				       },'gridComites').startup();

		   }
		} 
	   
	   else{
			if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			}
		} 
   }
   
  
   function _metas(crea){
	   var contenido="";
	   var id="metasPane";

	   if(crea){
		   if(!registry.byId(id)){
			
		        if(segundaAsambleaObj["resultadosEnlace"].length>0){
		        	
		        	contenido+='<br><div style="text-align:center;"> **<b>Metas por grado-materia</b></div><br><br>';
		        	
		        	if(segundaAsambleaObj["metas"].length>0){
		        	
			        	contenido+='<table id="metas" align="center" cellspacing="0"  cellpadding="5">'+
			        		 '<tr><td> GRADO </td>'+ 
			        			 '<td> MATERIA </td>'+
			        			 '<td> PUNTOS CCT </td>'+
			        			 '<td> % NIVEL INSUFICIENTE </td>'+
			        			 '<td> % NIVEL ELEMENTAL </td> '+
			        			 '<td> % NIVEL BUENO </td> '+
			        			 '<td> % NIVEL EXCELENTE </td></tr>';
				       
					   for(var i in  segundaAsambleaObj["metas"]){
						   
							     contenido += '<tr><td>' + constants.NOM_GRADO(segundaAsambleaObj["metas"][i].numGrado) + '</td>'+
								   				'<td>' + constants.NOM_MATERIA(segundaAsambleaObj["metas"][i].numMateria) + '</td>'+
								   				'<td>' + (!segundaAsambleaObj["metas"][i].puntosCct?'': segundaAsambleaObj["metas"][i].puntosCct) + '</td>'+
								   				'<td>' + (!segundaAsambleaObj["metas"][i].pctInsuf?'': segundaAsambleaObj["metas"][i].pctInsuf) + '</td>'+
								   				'<td>' + (!segundaAsambleaObj["metas"][i].pctElem ?'': segundaAsambleaObj["metas"][i].pctElem) + '</td>'+
								   				'<td>' + (!segundaAsambleaObj["metas"][i].pctBueno?'': segundaAsambleaObj["metas"][i].pctBueno) + '</td>'+
								   				'<td>' + (!segundaAsambleaObj["metas"][i].pctExcel?'': segundaAsambleaObj["metas"][i].pctExcel) + '</td></tr>';
						   		}
						
						contenido += '</table>';
						
		        	}
		        	else{
		        		contenido += ' <div style="text-align:center;"><br>No se registraron metas para la prueba ENLACE.</div>';
		        	}
		        contenido += ' <div><br><br><font size=1> ** Informaci\u00F3n recabada en la Segunda Sesi\u00F3n.</div>';  
		        }// Fin del tamaño del arreglo metas
		   
		   	    else{
			    	contenido+=sinDatosStr;
			    }
		        
		        registry.byId('pestanias').addChild(new ContentPane({
			           persist:false,
			           tabStrip:true,
			           title:"Metas",
			           id:id,
			           content: contenido,
			       })); 
			   
			   registry.byId('pestanias').selectChild(id,true);
		   }
	   }
					    	
	   else{
			if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			}
	   } 
	   
   }
   
   function _compromisos(crea){
	   
	   var id="compromisosPane";
	   var contenido="";
	   
	   if(crea){
		   if(!registry.byId(id)){
			   
			   //Titulos
			   var listCompromisos= new Array({title:" **Compromisos de diagn\u00f3stico y seguimiento",tpoCompEnlace:1,id:"compDiagPane",otroCom:4},
					   {title: "**Compromisos en el cumplimiento de metas",tpoCompEnlace:2,id:"compCumpPane",otroCom:14},
					   {title:"**Corresponsabilidad de madres y padres de familia",tpoCompEnlace:3,id:"compCorrPane",otroCom:24},
					   {title:"**Cursos y tareas extras",tpoCompEnlace:4,id:"compCursPane",otroCom:33},
					   {title:"**Est\u00edmulos y reconocimiento al mejoramiento del desempe\u00f1o global y grupal",tpoCompEnlace:5,id:"compEstPane",otroCom:43},
					   {title:"**Capacitaci\u00f3n y apoyo docente",tpoCompEnlace:6,id:"compCapPane",otroCom:54});	
			   
			   contenido+='<div style="text-align:center;"><b>COMPROMISOS</b></div><br><br>';
			   contenido+='<table cellspacing="0"  cellpadding="5">';
			   
			   for(var i in listCompromisos){					            		
				   var a=0;
				   for(var cont in segundaAsambleaObj["compromisos"]){	
					   
					   if(cont==0){
               				contenido+='<tr><td><b>'+ listCompromisos[i].title+'</b></tr></td><tr><td><UL type = circle>';
               			}
					
                    	if(segundaAsambleaObj["compromisos"][cont].tpoCompEnlace==listCompromisos[i].tpoCompEnlace){				                    		
                    		//Se anexa a la tabla 
                    		
                    		contenido+='<LI>'+ segundaAsambleaObj["compromisos"][cont].nomCompEnlace 
                    			+ (segundaAsambleaObj["compromisos"][cont].nomOtroComp?(': ' 
                    					+ segundaAsambleaObj["compromisos"][cont].nomOtroComp):'') 
                    			+ '</LI>';
                    		a++;	
                    	}					                    	
                    }
				   
				   if(a==0){
					   contenido+='No seleccion\u00f3 ning\u00FAn compromiso';
				   }
				   contenido+='</UL></td></tr>'; 	
				  			
			   }
			   
			   contenido+='</table><br><br><font size=1> **Informaci\u00f3n recabada de la Segunda Sesi\u00f3n </font>';
			   //Pestañas
			   registry.byId('pestanias').addChild(new ContentPane({
		           persist:false,
		           tabStrip:true,
		           title:"Compromisos de mejoras para alcanzar las metas",
		           id:id,
		           content:contenido
		       })); 
			   
			   registry.byId('pestanias').selectChild( registry.byId(id), true);
	        
		   }
	   }	  
	   else{
			if(registry.byId(id)){
				   registry.byId('pestanias').closeChild(registry.byId(id));
			}
		} 
   }	   

   function _mejoraDetail(itemToEdit){
	   
	   var edit=false;
	   if(!itemToEdit){
		   itemToEdit={cMejoraCct:0, nomMejoraCct: '', nomOtraMejora: '', actividades:'', metasObjetivos:''};
	   }else{
		   edit=true;
	   }
	   new Dialog({id:'dDetail', title:'Proyecto de mejora', content :'<div id="dcDetail"/>'}).show();
	   registry.byId('dDetail').on('hide',function(){
		   registry.byId('dDetail').destroyRecursive(false);
	   });
	   registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	   registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	   
	   jsUtils.createTag('div','mejoraCnt','dcDetail');
	   dom.byId('mejoraCnt').innerHTML='<table border="0" align="lefth" >'+
	   '<tr><td>'+
	   '	<b>*Mejora: </b><div id="mejoraSelect" /><br/>'+
	   '</td></tr>'+
	   '<tr id=otraMejora style="display:none"><td>'+
	   '	<b>*Otra mejora:</div> </b><div id="nomOtraMejora"/><br/>'+
	   '</td></tr>'+
	   '<tr><td>'+
	   '	<b>*Actividades que se realizar&aacute;n para alcanzar las metas y objetivos:</b><br/> <input id="actividades"/>'+
	   '</td></tr>  '+
	   '<tr><td>'+
	   '	<b>*Metas y objetivos de la mejora:<b><br/> <input id="metasObjetivos"/>'+
	   '</td></tr>'+
	   '</table>';
	   
	   new FilteringSelect({
           id: 'mejoraSelect',
           value:itemToEdit.cMejoraCct,
           store: jsonMejorasStore,
           readOnly:edit,
           searchAttr: 'name'
       }, 'mejoraSelect').on ('change', function(){ 
    	   
    	   if(registry.byId('mejoraSelect').get('displayedValue')=='Otra'){
    		   	 registry.byId('nomOtraMejora').set('required', true);
	  			 dom.byId('otraMejora').style.display='block';
    	   }
    	   else{
    		   registry.byId('nomOtraMejora').set('required', false);
    		   dom.byId('otraMejora').style.display='none'; 
    		   registry.byId('nomOtraMejora').reset();
    	   }
       });
	   
	   new ValidationTextBox({
           promptMessage:"Capture el nombre de la otra mejora",
           value:itemToEdit.nomOtraMejora, 
           trim:"true",    
           maxLength:"100",
           style:"display:block",
        }, 'nomOtraMejora');
	   
	   if(registry.byId('mejoraSelect').get('displayedValue')=='Otra'){
		   	 registry.byId('nomOtraMejora').set('required', true);
			 dom.byId('otraMejora').style.display='block';
	   }
	   
	   new Textarea({
			value : itemToEdit.actividades,
			trim : true,
			maxLength: 250,
			style : "width:400px;"
		}, "actividades");
	   
	   new Textarea({
			value :itemToEdit.metasObjetivos,
			trim : true,
			maxLength: 250,
			style : "width:400px;"
		}, "metasObjetivos");
	   
	   jsUtils.createTag('div','mejoraBtnAceptar','dcDetail');
	   new Button({
			label : " Aceptar ",
			onClick : function() {
				
					var cMejoraCct=registry.byId('mejoraSelect').get('value');
					var actividades=registry.byId('actividades').get('value');
					var objetivos=registry.byId('metasObjetivos').get('value');
					
					var grid = registry.byId('mejorasGrid');
					var form = registry.byId('dDetail');
					if ( form.validate() == false){  
						jsUtils.cstmAlert('Favor de registrar los datos requeridos');
						return false;
					}
					else {
						if(actividades==''|| objetivos==''){
							jsUtils.cstmAlert('Favor de registrar sus actividades, metas y objetivos');
							return false;
						}
					}
					
					if(cMejoraCct!=0){
						
						try{
							var nomMejoraCct=registry.byId('mejoraSelect').get('displayedValue');
							if(nomMejoraCct=='Otra'){
								nomMejoraCct=registry.byId('nomOtraMejora').get('displayedValue');
							}
							if(edit){
								var index = grid.selection.selectedIndex;
								var item = grid.getItem(index);
								grid.store.setValue(item, 'nomMejoraCct',nomMejoraCct);
								grid.store.setValue(item, 'nomOtraMejora', registry.byId('nomOtraMejora').get('value'));
								grid.store.setValue(item, 'actividades', registry.byId('actividades').get('value'));
								grid.store.setValue(item, 'metasObjetivos', registry.byId('metasObjetivos').get('value'));
								grid.update();
							}else{
							   var myNewItem = {cMejoraCct: registry.byId('mejoraSelect').get('value'), 
			                    		nomMejoraCct: nomMejoraCct,
			                    		nomOtraMejora: registry.byId('nomOtraMejora').get('value'),
									    actividades:registry.byId('actividades').get('value'),
									    metasObjetivos: registry.byId('metasObjetivos').get('value')};
								 
						       grid.store.newItem(myNewItem);  
							}
						    registry.byId('dDetail').destroyRecursive(false);
						}catch(e){
							jsUtils.cstmAlert('La mejora seleccionado ya ha sido agregada, favor de verificar');
							console.log(e);
						}
					}
					else {
						jsUtils.cstmAlert('Favor de seleccionar una mejora');
					}
			}
		},'mejoraBtnAceptar');
	   
   }
   
   
	// Se manda a actualizar la informacion capturada
	function saveSegundaAsamblea(cct) {
		var standby = new Standby({
			target : "dialogCaptiraDG"
		});
		document.body.appendChild(standby.domNode);
		standby.startup();
	
		var form = registry.byId('registraPrimeraReunion');
		if ( form.validate() == false){  
			jsUtils.cstmAlert('Favor de registrar los datos requeridos');
			return false;
		}
				
		// Información General
		var ceInfGral = {
			cCct : cct
		};
		
		// Información de la sesión
		var ceSesion = {
			fchSesion : registry.byId('fechaRegistro').get('value'),
			horaIniSesion : registry.byId('horaInicio').get('value'),
			horaFinSesion : registry.byId('horaFinal').get('value'),
			numIntegrantes : registry.byId('numIntegrantes').get(
					'value'),
			observaciones : registry.byId('observaciones').get('value'),
			fchRegistro : registry.byId('fechaRegistro').get('value')
		};
		
		// Mejoras
		var mejoras = new Array();
		var mejora ={};
		
		//El usuario selecciono Mejoras
		if(array.indexOf(gActividades,42)!=-1){
			
			var gridMejoras = registry.byId('mejorasGrid');

			if(gridMejoras.rowCount==0){
            	utils.cstmAlert('Debe capturar al menos un proyecto de mejora.');
				return false;
			}

			// Carga los objetos tipo Mejora
			for ( var a = 0; a < gridMejoras.rowCount; a++) {
				
					var item = gridMejoras.getItem(a);
					
					mejora = {
							cMejoraCct: gridMejoras.store.getValue(item,'cMejoraCct'),
							nomOtraMejora: gridMejoras.store.getValue(item,'nomOtraMejora'),
							actividades : gridMejoras.store.getValue(item,'actividades'),
							metasObjetivos : gridMejoras.store.getValue(item,'metasObjetivos')	
					};
	
					mejoras.push(mejora);
			}		
		}
		
		// Comites
		var comites = new Array();
		var comite={};
		
		//El usuario seleccino Comites
		if(array.indexOf(gActividades,45)!=-1){
			
			var gridComites = registry.byId('gridComites');
			// Carga los objetos tipo Mejora
			
			for ( var i = 0; i < gridComites.rowCount; i++) {
					var item = gridComites.getItem(i);
					
						comite = {
								cComite: segundaAsambleaObj["comites"][i].cComite,
								indProyAnualCom : gridComites.store.getValue(item,'indProyAnualCom'),
									
							};
		
							comites.push(comite);

			}		

		}
	
		// Se integra la segunda Asamblea.
		var segundaAsamblea = {
			ceInfGral : ceInfGral,
			ceSesion : ceSesion,
			mejoras : mejoras,
			comites : comites,
			asistentes: primeraAsamblea.leeAsistentes()
		};
		
		console.log(json.toJson(segundaAsamblea));
		
		var urlJson = dojo.config.app.urlBase
				+ 'segundaAsamblea/saveSegundaAsamblea';
		
		xhr.post({
					url : urlJson,
					postData : json.toJson(segundaAsamblea),
					headers : {
						"Content-Type" : "application/json; charset=UTF-8"
					},
					handleAs : 'json',
					handle : function(response) {
						if (response == 'SyntaxError: syntax error') {
		    	            window.location.reload();
						}else if (response != 1) {
		                	utils.cstmAlert('Ocurri\u00F3 un error al actualizar los datos.');
		                	standby.hide();
						} else {
							utils.cstmAlert('La actualizaci\u00F3n se realiz\u00F3 correctamente.');						
							reuniones.refresh(cct);
							standby.hide();
						}

						registry.byId('dialogCaptiraDG').destroyRecursive(false);


					}
				}).progress(standby.show());

	}

   return {
	   init:init,
	   saveSegundaAsamblea:saveSegundaAsamblea
	   };
});

