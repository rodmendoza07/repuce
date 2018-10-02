 define(["dijit/Tooltip","dijit/form/ValidationTextBox","dijit/form/Button",
        "dojo/dom","dijit/registry","dojo/on", "dojo/_base/xhr","dojo/dom-construct",
        "dojo/_base/json","dijit/form/Select","dojo/DeferredList","app/util/jsUtils",
        "app/util/constants","app/reuniones_conafe/capturaDatosGeneralesConafe", 
        "dijit/form/FilteringSelect", "dojo/store/Memory", "dojox/form/CheckedMultiSelect"], 
function( Tooltip,ValidationTextBox,Button,dom,registry,on,xhr,domConstruct,json,Select,DeferredList,utils,constants,
		capturaDG,FilteringSelect, Memory,CheckedMultiSelect){
	
	eval('var _usuario='+ dom.byId('usuario').value);
	var gCApec=-1;
	var oLocalidades=[{}];	
	/****************************************
	 * Funcion Inicial
	 **************************************/
    function init(config){
		config.contenedor.set('content', config.template);  
        load();
    }
 
    function load(){

         var reunionesConafe=[];
         var idEntidad= _usuario.username.substring(0, 2);
         var idLocalidad=0;
         var idMunicipio=0;
 		 
 		 var storeEntidades=[{name:"[Seleccione]",id:"0"}];
 	   
 	     for(var i=1;i<5;i++){
 		   reunionesConafe.push({disponibilidad:0,status:0,nomReunion:constants.NOM_REUNION_CONAFE(i),cReunion: i,contenido:' <h3>No Disponible</h3><p>...</p>'});
 	     }      
 	     
 	     /*****************************************************
 	        Componente para mostrar las entidades federativas
 	     *******************************************************/
 		 new FilteringSelect({
             id: "nomEntidadApec",
             searchAttr: "name",
         }, "nomEntidadApec").on ('change', function(){
        
        	 idEntidad=registry.byId('nomEntidadApec').get('value');
        	 
        	 if(idEntidad!=0){
	        	    var lstMun= xhr.get({
			    		url: dojo.config.app.urlBase+'catalogos/listMunicipios/'+ idEntidad,
			    		sync: false, 
			    		preventCache:true,
			    		handleAs: "json",
			    		contentType: "application/x-www-form-urlencoded; charset=utf-8"
			    	 });
		     		
		     		lstMun.then(function(cMunicipios){
		     			
		     			 var store=[{name:"[Seleccione]",id:"0"}];
		     			 var storeLoc=[{name:"[Seleccione]",id:"0"}];
			
						for(var i in cMunicipios ){
					      		store.push({name:cMunicipios[i].nomMunicipio,id:cMunicipios[i].idMunicipio});
					     }
						 registry.byId('nomMunicipioApec').set('store',new Memory({data:store}));
						 registry.byId('nomMunicipioApec').set('value',0);
						 registry.byId('nomMunicipioApec').set('readOnly',false);
						 registry.byId('nomLocalidadApec').set('readOnly',true);
						 registry.byId('nomLocalidadApec').set('store',new Memory({data:storeLoc}));
						 registry.byId('nomLocalidadApec').set('value',0);
							
		 	    		if(_usuario.roles=='CONAFE_LOCALIDAD'){
		 	    			var idMunic=_usuario.username.substring(2, 5);
		 	    			idMunic=idMunic-0;

	 	     				registry.byId('nomMunicipioApec').set('value',idMunic);
	 	     				registry.byId('nomMunicipioApec').set('readOnly',true);
		 	    		}
						
		     		});
        	 }
        	 else{
				 registry.byId('nomMunicipioApec').set('readOnly',true);
				 registry.byId('nomLocalidadApec').set('readOnly',true);
				 registry.byId('nomMunicipioApec').set('value',0);
				 registry.byId('nomLocalidadApec').set('value',0);
				
        	 }
        	 
        	 
         });
 	     
 	 
 		 /**************************************************
 		        Componente para mostrar los municipios.
 		 **************************************************/
 		 new FilteringSelect({
             id: "nomMunicipioApec",
             searchAttr: "name",
             readOnly: true
         }, "nomMunicipioApec").on ('change', function(){
        	
        	 idMunicipio=registry.byId('nomMunicipioApec').get('value');
        	 dom.byId('cctsApec').style.display='none';
        	
        	 if(idMunicipio!=0){
	     	 	 var lstMunicipios=xhr.get({
			            url:dojo.config.app.urlBase+'catalogos/listLocalidades/'+ idEntidad + '/' + idMunicipio,
			            sync: false,
			            preventCache:true,
			            contentType: "application/x-www-form-urlencoded; charset=utf-8",
			            handleAs: "json"
	     	 		});
	     	 	 lstMunicipios.then(function(localidades){
	     	 		 
	     	 		oLocalidades=localidades;
	     	 		 
	     	 		if(localidades.length==0){
	     	 			 utils.cstmAlert('No existen localidades para el municipio seleccionado.');
	     	 		} 
	     	 		else{
		     	 		var storeLocalidades=[{name:"[Seleccione]",id:"0"}];
		     	 		
		 	    		for(var i in localidades){
		 	    			
		 	    			storeLocalidades.push({name:localidades[i].idLocalidad + ' - ' + localidades[i].nomLocalidad + ((localidades[i].indAulaCompartida==true)?' *':'') ,id:localidades[i].idLocalidad});
		 	    			
		  	         	}
		 	    		
		 	    		//registry.byId('nomLocalidadApec').reset();
		 	    		registry.byId('nomLocalidadApec').set('store',new Memory({data:storeLocalidades}));
		 	    		registry.byId('nomLocalidadApec').set('value',0);
		 	    		registry.byId('nomLocalidadApec').set('readOnly',false);
		 	    		
		 	    		if(_usuario.roles=='CONAFE_LOCALIDAD'){
		 	    			var idLoc=_usuario.username.substring(5, 9);
		 	    			idLoc=idLoc-0;
	 	     				registry.byId('nomLocalidadApec').set('value',idLoc);
	 	     				registry.byId('nomLocalidadApec').set('readOnly',true);
		 	    		}
		 	    		
	     	 		}
	 	    		
	     	 	 });
        	 }
        	 
        	 if(idMunicipio==0){
     	    	dom.byId('cctsApec').style.display='none';
     	    	registry.byId('nomLocalidadApec').set('value',0);
 	    		registry.byId('nomLocalidadApec').set('readOnly',true);
     	    }
     		
         });
 		 
 		 
 		/**************************************************
 		      Componente para mostrar las localidades. 
 		**************************************************/
 		new FilteringSelect({
            id: "nomLocalidadApec",
            searchAttr: "name",
            readOnly: true
        }, 'nomLocalidadApec').on ('change', function(){
        	
        	    registry.byId('nomCctsApec').reset();        	    
        	    idLocalidad=registry.byId('nomLocalidadApec').get('value');
        	    
        	    var aulaCom=false;
        	    
        	    for(var  i in oLocalidades){
        	    	if(idLocalidad==oLocalidades[i].idLocalidad){
        	    	    aulaCom=oLocalidades[i].indAulaCompartida;
        	    	}
        	    	
        	    }
        	            	    
        	    if(idLocalidad!=0){
        	    	
        	    	if(aulaCom==true){
        	    		
        	    		dom.byId('locAulComp').style.display='block';
        	    		
        	    	}else
        	    		{dom.byId('locAulComp').style.display='none';}
        	    	
		        	var lstCcts=xhr.get({
			            url:dojo.config.app.urlBase+'catalogos/listCctsLocalidad/'+ idEntidad +'/'+ idMunicipio +'/'+ idLocalidad,
			            sync: false,
			            preventCache:true,
			            contentType: "application/x-www-form-urlencoded; charset=utf-8",
			            handleAs: "json"
		    	 		});
		    	 	lstCcts.then(function(centrosEsc){
		    	 		
		    	 		if(centrosEsc.length==0){
		    	 			dom.byId('cctsApec').style.display='none';
		    	 			utils.cstmAlert('La localidad seleccionada no cuenta con centros de trabajo');
		    	 			_createAcordion(reunionesConafe);
		    	 			return false;
		    	 		}
		    	 		else{
			    	 		
			    	 		var opts=registry.byId('nomCctsApec').getOptions();
	                    	registry.byId('nomCctsApec').removeOption(opts);
			    	 		
			    	 		
			    	 		var storeCcts = new Array();
			    	 		
			    	 		for(var i in centrosEsc){
			    	 			storeCcts.push({label: centrosEsc[i].cveCct + ' (' 
			    	 				+ centrosEsc[i].nomNivel + ')', 
			    	 				value: centrosEsc[i].cCct,selected:true});
			  	         	}
			    	 		
			    	 		registry.byId('nomCctsApec').addOption(storeCcts);
			    	 		dom.byId('cctsApec').style.display='block';
			    	 		registry.byId('nomCctsApec').set('readOnly',true);
			    	 		
			    	 		infReuniones(idEntidad,idMunicipio,idLocalidad, storeCcts);
		    	 		}
		    	 		
		    	 	});
        	    }
        	    
        	    if(idLocalidad==0){
        	    	dom.byId('cctsApec').style.display='none';
        	    	
        	    	 /*for(var i=1;i<5;i++){
        	   		   reunionesConafe.push({disponibilidad:0,status:0,nomReunion:constants.NOM_REUNION_CONAFE(i),cReunion: i,contenido:' <h3>No Disponible</h3><p>...</p>'});
        	   	     }*/ 
        	    	
        	    	_createAcordion(reunionesConafe);
        	    }
	    
        });
 		
 		/**************************************************
 		//Componente para mostrar los CCTs.
 		**************************************************/
 		new CheckedMultiSelect ({
    		id:"nomCctsApec",
    		readOnly:true,
    		multiple:true
    	 },'nomCctsApec');
 		
 		
 		//Se carga el compoenente de Entidad.
		xhr.get({
	     		url: dojo.config.app.urlBase+'catalogos/listEntidades',
	     		sync: false, 
	     		preventCache:true,
	     		handleAs: "json",
	     		contentType: "application/x-www-form-urlencoded; charset=utf-8"
	     	   }).then(function(cEntidades){
	     		
	     		for(var i in cEntidades ){
		      		storeEntidades.push({name:cEntidades[i].nomEntidadfed,id:cEntidades[i].idEntidadfed});
		        }
			    
	     		registry.byId('nomEntidadApec').set('store',new Memory({data:storeEntidades}));
	     		
	     		if(_usuario.roles!='CONAFE_ENLACE' && _usuario.roles!='CONAFE_LOCALIDAD'){
	     			registry.byId('nomEntidadApec').set('value',0);
	     		}
	     		else{
	     			if(_usuario.roles=='CONAFE_ENLACE' || _usuario.roles=='CONAFE_LOCALIDAD'){
	     				var id=idEntidad-0;
	     				registry.byId('nomEntidadApec').set('value',id);
	     				registry.byId('nomEntidadApec').set('readOnly',true);
	     				
	     			}
	     		}
	     	    
	     });

 	     _createAcordion(reunionesConafe);
 	   
   }//Termina funcion Load.  		
 	
    
    
    
    function infReuniones(idEntidad,idMunicipio,idLocalidad, storeCcts){
    	
 	   var reunionesCatalogoReq=xhr.get({
           url: dojo.config.app.urlBase + 'catalogos/listReunionesCONAFE',
           sync: false,
           preventCache:true,
           contentType: "application/x-www-form-urlencoded; charset=utf-8",
           handleAs: "json"
       } );	
	   
	   var reunionesApecReq=xhr.get({
           url: dojo.config.app.urlBase + 'reuniones/listReunionesApec/' + idEntidad +'/'+ idMunicipio +'/'+ idLocalidad,
           sync: false,
           preventCache:true,
           contentType: "application/x-www-form-urlencoded; charset=utf-8",
           handleAs: "json"
       } );	
	  
 	   var defs = new DeferredList([reunionesCatalogoReq, reunionesApecReq]);
 	   	   defs.then(function(results){
		  
	    	var reunionesCatalogo = results[0][1];
	    	var reunionesApec = results[1][1];
	    	
	
	    	gCApec=(!reunionesApec[0] || !reunionesApec[0].cApec)?
	    			-1:reunionesApec[0].cApec;
    	    
	       var reunionesConafe=[];
	       
	  	   for(var i=0;i<reunionesCatalogo.length;i++){
	  		   var status=0;
	  		   var cont=' <h3>No Disponible</h3><p>...</p>';
	  		   for(var j=0;j<reunionesApec.length;j++){
	  			   if(reunionesCatalogo[i].cReunion== reunionesApec[j].cReunion){
	  				   status=1;
	  				   var fchReunion=new Date(reunionesApec[j].fchReunion);
	  				   fchReunion=utils.dateFormat(fchReunion,"DD/MM/YYYY");
	  				   cont=' <h3>Informaci\u00F3n de la Reuni\u00F3n</h3>'+
	  				   '<table align="center" width="100%" border="0" >'+
				    		'       <tr><td colspan="2"><span class="detalleCont">Fecha de Registro:</span> '+fchReunion+'   </td>'+
				              '     <tr><td><span class="detalleCont">Hora inicial:</span> '+reunionesApec[j].horaIni+' </td>'+
				               '        <td><span class="detalleCont">Hora final:</span> '+reunionesApec[j].horaFin+' </td></tr>'+
				                '   <tr><td colspan="2"><span class="detalleCont">Observaciones:</span> '+reunionesApec[j].observaciones+' </td></tr>'+
				                 '  <tr><td colspan="2"><span class="detalleCont">Registrado por:</span> '+reunionesApec[j].usrCaptura+' </td></tr>'+	
				                  ' <tr><td colspan="2"><span class="detalleCont">Caracteres de autenticidad del acta:</span> '+reunionesApec[j].cadena+' </td></tr>'+
				           '</table> ';
	  			   }
	  				   
	  		   }
	  		   reunionesConafe.push({disponibilidad:reunionesCatalogo[i].dVigencia,
	  			   			   status:status,
	  			   			   nomReunion:constants.NOM_REUNION_CONAFE(reunionesCatalogo[i].cReunion),
	  			   			   contenido:cont,
	  			   			   cReunion:reunionesCatalogo[i].cReunion});
	  	   }
	  	 
	  	 domConstruct.destroy("acordeonBody");
	  	 _createAcordion(reunionesConafe, reunionesApec, storeCcts);
	  	 
	    });
    	
    }
   
    function _createAcordion(reunionesConafe,reunionesApec, storeCcts){
    	
 	    utils.createTag('div','acordeonBody', 'acordeonReuniones');
 
 	    var acordion='';
 	    
        /*Creacion del acordion*/
        for(var i in reunionesConafe) {
            var candado='';
            var status='';
            

            if(reunionesConafe[i].disponibilidad==1)
                candado='<img src="static/img/candado_a.png"  id="dispConafe'+i+'"/>';
            else
                candado='<img src="static/img/candado_c.png" id="nodispConafe'+i+'"/>';

            if(reunionesConafe[i].status==1)
                status='<img src="static/img/statusv.png" id="realizadoConafe'+i+'"/>';
            else
                status='<img src="static/img/statusg.png" id="pendienteConafe'+i+'"/>';

            acordion=acordion+'<div id="tablas">'+            
                        '<table border="0" width="100%" align="center">'+
                            '<tr>'+
                                '<td width="20%" align="center">'+candado+'</td>'+
                                '<td width="15%" align="center">'+status+'</td>'+
                                '<td width="25%" align="center" style="font-weight: bold;">'+reunionesConafe[i].nomReunion+'</td>'+
                                '<td width="13%" align="center"><a href="#"><img src="static/img/edit.png" border="0" id="editConafe'+reunionesConafe[i].cReunion+'" /></a></td>'+
                                '<td width="13%" align="center"><a href="#"><img src="static/img/trash.png" border="0" id="trashConafe'+i+'"/></a></td>'+
                                '<td width="14%" align="center"><a href="#"><img src="static/img/print.png" border="0"id="printConafe'+i+'"/></a></td>'+
                            '</tr>'+
                        '</table>'+
                    '</div>'+
                    '<div class="accordion" id="section1"><span></span></div>'+
                    '<div class="container">'+
                        '<div class="content">'+reunionesConafe[i].contenido+' </div>'+
                    '</div>'; 
        }        

        dom.byId('acordeonBody').innerHTML=acordion;
        /*tooltips*/
        for(var i in reunionesConafe) {
        	var tooltipEditar="Editar acta";
        	var tooltipEliminar="Eliminar acta";
        	var tooltipImprimir="Imprimir acta";
        	
        	if(reunionesConafe[i].nomReunion!="Acta Constitutiva"){
        		tooltipEditar="Editar reuni\u00F3n";
        		tooltipEliminar="Eliminar reuni\u00F3n";
        		tooltipImprimir="Imprimir minuta";
        	}
        	
     	   var edit="editConafe"+reunionesConafe[i].cReunion;
            new Tooltip({connectId: [edit],
                label: tooltipEditar});
            
            if(reunionesConafe[i].disponibilidad==1){
         	   on( dom.byId(edit),'click', function(){
         		  _editarReunion(this.id, reunionesConafe,reunionesApec, storeCcts);
         	   });     	   
            }
            
            var trash="trashConafe"+i;
            new Tooltip({connectId: [trash],
                label: tooltipEliminar});
            if(reunionesConafe[i].status==1){
         	   on( dom.byId(trash),'click', function(){
         		   _eliminarReunion(this.id, storeCcts);
         	  });     	   
            }
            
            var print="printConafe"+i;
            new Tooltip({connectId: [print],
                label: tooltipImprimir});
            if(reunionesConafe[i].status==1){
         	   on( dom.byId(print),'click', function(){
         		   _imprimirReunion(this.id);
         	   });     	   
            }else{
         	   on( dom.byId(print),'click', function(){
         		   _docBlancoReunion(this.id);
         	   });        	   
            }
            
            new Tooltip({connectId: ["dispConafe"+i],
                label: "Disponible "});
            new Tooltip({connectId: ["nodispConafe"+i],
                label: "No disponible "});
            new Tooltip({connectId: ["realizadoConafe"+i],
                label: "Realizada "});
            new Tooltip({connectId: ["pendienteConafe"+i],
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

	function _editarReunion(reunion, reunionesConafe, reunionesApec, storeCcts){
		if(reunion.lastIndexOf("editConafe")==0){
			var sn=parseInt(reunion.substring(reunion.lastIndexOf("editConafe")+10));
			//Valida que la opción sea diferente de acta constitutiva.
			if(sn!=1){
				//Para la primer reunión valida que exista un acta.
				if(sn==2 && (reunionesConafe[0].status==0)){
					utils.cstmAlert('Debe registrar su acta constitutiva.');
					return;
				}
				
				//Para la segunda reunión valida que exista una primera.
				if(sn==3 && (reunionesConafe[1].status==0)){
					utils.cstmAlert('Debe registrar su primera reuni\u00F3n.');
					return;
				}
				
				//Para la segunda reunión valida que exista una primera.
				if(sn==4 && (reunionesConafe[2].status==0)){
					utils.cstmAlert('Debe registrar su segunda reuni\u00F3n.');
					return;
				}
			}
			
			var infReunion= new Object();
			for (var i in reunionesApec){
				if(reunionesApec[i].cReunion==sn){
					infReunion=reunionesApec[i];
					reunionesApec[i].cApec;
					break;
				}
			}
			
			try{
				capturaDG.init(sn,gCApec,infReunion, storeCcts);
			}catch (e) {
				require(["app/reuniones_conafe/capturaDatosGeneralesConafe"], function(capturaDatosGeneralesConafe){
				capturaDatosGeneralesConafe.init(sn,gCApec,infReunion, storeCcts);
				});
			}
		}
	}
 
    //Imprimir acta o minuta con datos
    function _imprimirReunion(reunion){
 	   var sn=0;
 	   if(reunion.lastIndexOf("printConafe")==0){
 		   sn=parseInt(reunion.substring(reunion.lastIndexOf("printConafe")+11))+1;
 	   }
 	   //utils.cstmAlert("imprime sn :: "+sn);   
 	   switch(sn){
	 		case 1:
	 			window.open(dojo.config.app.urlBase + 'documentos/actaConstitutiva/'+gCApec, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	 		break;
	 		case 2:
	 			window.open(dojo.config.app.urlBase + 'documentos/primeraReunion/'+gCApec, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	 		break;
	 		case 3:
	 			window.open(dojo.config.app.urlBase + 'documentos/segundaReunion/'+gCApec, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	 		break;
	 		case 4:
	 			window.open(dojo.config.app.urlBase + 'documentos/terceraReunion/'+gCApec, null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	 		break;
 		
 	   }
 	   
    } 
    
    //Documento en blanco
    function _docBlancoReunion(reunion){
 	   var sn = 0;
 	   if(reunion.lastIndexOf("printConafe")==0){
 		   sn=parseInt(reunion.substring(reunion.lastIndexOf("printConafe")+11))+1;
 		 }
 		   
 	   //utils.cstmAlert("documento sn :: "+sn);   
 	   switch(sn){
	 		case 1:
	 		    window.open(dojo.config.app.urlStatic + 'documentos/ActaConstitutiva.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	 		break;
	 		case 2:
	 			window.open(dojo.config.app.urlStatic + 'documentos/PrimeraReunion.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	 		break;
	 		case 3:
	 			window.open(dojo.config.app.urlStatic + 'documentos/SegundaReunion.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	 		break;
	 		case 4:
	 			window.open(dojo.config.app.urlStatic + 'documentos/TerceraReunion.pdf', null, 'height=820,width=590,status=no,toolbar=no, resizable=0,scrollbars=yes');
	 		break;	
 	   }
    } 
    
    
    
    //Eliminar
    function _eliminarReunion(reunion, storeCcts){
 	   var sn=0;
 	   if(reunion.lastIndexOf("trashConafe")==0){
 		   sn=parseInt(reunion.substring(reunion.lastIndexOf("trashConafe")+11))+1;
 		 }
 	   
 	   if(confirm("Esta acci\u00F3n eliminar\u00E1 la "+constants.NOM_REUNION_CONAFE(sn)+
 			   " y toda la informaci\u00F3n relacionada, \u00BFdesea continuar?")){
 			   
 		   switch(sn){
 			case 1:
 				urlJson=dojo.config.app.urlBase + 'actaConstitutiva/delete/'+gCApec;
 			break;
 			case 2:
 				urlJson=dojo.config.app.urlBase + 'primeraReunion/delete/'+gCApec;
 			break;
 			case 3:
 				urlJson=dojo.config.app.urlBase + 'segundaReunion/delete/'+gCApec;
 			break;
 			case 4:
 				urlJson=dojo.config.app.urlBase + 'terceraReunion/delete/'+gCApec;
 			break;
 			
 		   }
 		   
 		  xhr.get({
	           url: urlJson,
	           preventCache:true,
	           contentType: "application/x-www-form-urlencoded; charset=utf-8",
			   handleAs: 'json',
	           handle: function(response){
	          	 //utils.cstmAlert(response);
	          	 if(response!=1){
	          		 utils.cstmAlert('Ocurri\u00F3 un error al eliminar los datos');
	          	}
	          	 else{
	          		 utils.cstmAlert('La eliminaci\u00F3n se realiz\u00F3 correctamente');
	          		 infReuniones(registry.byId('nomEntidadApec').get('value'),
							  registry.byId('nomMunicipioApec').get('value'),
					          registry.byId('nomLocalidadApec').get('value'),storeCcts);

	          		//_getInfCct(gCct);
	          	     //_getTurnos();          		 
	          	 }            		
	           }
	       });

 	  }
 	   
    } 
    
    
    
    
   return{
     init:init,
     refresh:infReuniones,
     capturaDG:capturaDG
   };
   
});

