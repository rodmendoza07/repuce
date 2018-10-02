define(["app/reuniones_conafe/actaConstitutiva", "app/reuniones_conafe/primeraReunion" ,
        "app/reuniones_conafe/segundaReunion","app/reuniones_conafe/terceraReunion"], 
function( actaConstitutiva,primeraReunion,segundaReunion,terceraReunion){
	
	function init (cReunion,actividades,cApec,ReunionObj, storeCcts){

		switch(cReunion){
			case 1:
				actaConstitutiva.init(actividades,cApec,ReunionObj, storeCcts);
			break;
			case 2:
				primeraReunion.init(actividades,cApec,ReunionObj, storeCcts);
			break;
			case 3:
				segundaReunion.init(actividades,cApec,ReunionObj, storeCcts);
			break;
			case 4:
				terceraReunion.init(actividades,cApec,ReunionObj, storeCcts);
			break;
		}
	}
	
	function urlDatosReunion (cReunion,cApec){
		var url="";
		switch(cReunion){
			case 1:
				url=dojo.config.app.urlBase + 'actaConstitutiva/select/'+cApec;
			break;
			case 2:
				url=dojo.config.app.urlBase + 'primeraReunion/select/'+cApec;
			break;
			case 3:
				url=dojo.config.app.urlBase + 'segundaReunion/select/'+cApec;
			break;
			case 4:
				url=dojo.config.app.urlBase + 'terceraReunion/select/'+cApec;
			break;
		}
		return url;
	}
	
	return{
		init : init,
		urlDatosReunion : urlDatosReunion
	};
});