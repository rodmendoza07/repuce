define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/grid/DataGrid","dojo/data/ItemFileWriteStore", "dojox/grid/cells/dijit",
         "dojo/store/Memory", "dojo/dom", "dijit/form/ValidationTextBox","dijit/form/FilteringSelect",
         "dojo/_base/json","dojo/on","app/util/constants","dijit/form/Button", "dijit/form/Form",
         "dojo/_base/xhr","dojo/_base/lang","dojox/widget/Standby","app/reuniones/reuniones", 
         "dojo/DeferredList", "app/util/constants","dijit/Dialog","dojo/_base/lang", 
         "app/reuniones/primeraAsamblea"], 
function( ContentPane,registry,array,utils,DataGrid,ItemFileWriteStore, gridCellsDijit,
		Memory, dom,ValidationTextBox,FilteringSelect,json,on,constants,Button,Form,xhr,
		lang,Standby,reuniones,DeferredList, constants,Dialog,lang,primeraAsamblea){

     
   function init(actividades,cct, ReunionObj){
	   terceraAsamblea=ReunionObj;

	   primeraAsamblea.asistentes(array.indexOf(actividades, 71)!=-1 || 
			   array.indexOf(actividades, 72)!=-1, terceraAsamblea);

    }

	// Se manda a actualizar la informacion capturada
	function saveTerceraAsamblea(cct) {
		
		var standby = new Standby({
			target : "dialogCaptiraDG"
		});
		document.body.appendChild(standby.domNode);
		standby.startup();
	
		var form = registry.byId('registraPrimeraReunion');
		
		if ( form.validate() == false){
			utils.cstmAlert('Favor de registrar los datos requeridos');
			return false;
		}  

		
		var ceInfGral = {cCct : cct};
		
		//Si se trata de un Consejo con vigencia de hasta el 2012
		//y el usuario ha seleccionado el refrendo 
		if(registry.byId('refrendo') && registry.byId('refrendo').get('value') == true){
			//Se instalac como un Consejo Escolar nuevo con periodo de 
			//vigencia del 2012-2014
			lang.mixin(ceInfGral, {periodo:constants.PERIODO_2012_2014});
		}
		
		var ceSesion = {
			fchSesion : registry.byId('fechaRegistro').get('value'),
			horaIniSesion : registry.byId('horaInicio').get('value'),
			horaFinSesion : registry.byId('horaFinal').get('value'),
			numIntegrantes : registry.byId('numIntegrantes').get('value'),
			observaciones : registry.byId('observaciones').get('value'),
			fchRegistro : registry.byId('fechaRegistro').get('value')
		};

		var actividades = new Array();

		var actividadesArray = registry.byId('nomActividad').get('value');

		// Carga los objetos tipo CeActSesion
		for ( var i in actividadesArray) {
			
			actividades.push({
				cActividad : actividadesArray[i]
			});
			
		}

		var terceraAsamblea = {
			ceInfGral : ceInfGral,
			ceSesion : ceSesion,
			actividades : actividades,
			asistentes: primeraAsamblea.leeAsistentes()
		};

		console.log(json.toJson(terceraAsamblea));
		var urlJson = dojo.config.app.urlBase
				+ 'terceraAsamblea/saveTerceraAsamblea';
		
		xhr.post({
					url : urlJson,
					postData : json.toJson(terceraAsamblea),
					headers : {
						"Content-Type" : "application/json; charset=UTF-8"
					},
					handleAs : 'json',
					handle : function(response) {
						if (response == 'SyntaxError: syntax error') {
		    	            window.location.reload();
						}else if (response != 1) {
		                	utils.cstmAlert(
							'Ocurri\u00F3 un error al registrar la informaci\u00F3n de su Consejo Escolar.');
		                	standby.hide();
						} else {
							utils.cstmAlert(
							'La informaci\u00F3n de su Consejo Escolar se registr\u00F3 correctamente.');						
							reuniones.refresh(cct);
							standby.hide();
						}

						registry.byId('dialogCaptiraDG').destroyRecursive(false);

					}
				}).progress(standby.show());

	}

   return {
	   init:init,
	   saveTerceraAsamblea:saveTerceraAsamblea
	   };
   
});





