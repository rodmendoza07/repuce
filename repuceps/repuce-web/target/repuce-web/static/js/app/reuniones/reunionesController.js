define(["app/reuniones/primeraAsamblea", "app/reuniones/primeraSesion",
        "app/reuniones/segundaSesion",   "app/reuniones/segundaAsamblea",
        "app/reuniones/terceraSesion",   "app/reuniones/cuartaSesion", 
        "app/reuniones/terceraAsamblea"], 
function( primeraAsamblea, primeraSesion, segundaSesion, segundaAsamblea,
		terceraSesion, cuartaSesion, terceraAsamblea){
	
	function init (cSesion,actividades,cCct,ReunionObj){
		switch(cSesion){
			case 1:
				primeraAsamblea.init(actividades,cCct,ReunionObj);
			break;
			case 2:
				primeraSesion.init(actividades,cCct,ReunionObj);
			break;
			case 3:
				segundaSesion.init(actividades,cCct, ReunionObj);
			break;
			case 4:
				segundaAsamblea.init(actividades,cCct,ReunionObj);
			break;
			case 5:
				terceraSesion.init(actividades,cCct,ReunionObj);
			break;
			case 6:
				cuartaSesion.init(actividades,cCct,ReunionObj);
			break;
			case 7:
				terceraAsamblea.init(actividades,cCct,ReunionObj);
			break;
			case 9:
				alert("por implementar... XD");
			break;
			case 10:
				alert("por implementar... XD");
			break;
		}
	}
	
	function urlDatosReunion (cSesion,cCct){
		var url="";
		switch(cSesion){
			case 1:
				url=dojo.config.app.urlBase + 'primeraAsamblea/select/'+cCct + '/0';
			break;
			case 2:
				url=dojo.config.app.urlBase + 'primeraSesion/select/'+cCct;
			break;
			case 3:
				url=dojo.config.app.urlBase + 'segundaSesion/select/'+cCct;
			break;
			case 4:
				url=dojo.config.app.urlBase + 'segundaAsamblea/select/'+cCct;
			break;
			case 5:
				url=dojo.config.app.urlBase + 'terceraSesion/select/'+cCct;
			break;
			case 6:
				url=dojo.config.app.urlBase + 'cuartaSesion/select/'+cCct;
			break;
			case 7:
				url=dojo.config.app.urlBase + 'terceraAsamblea/select/'+cCct;
			break;
			case 9:
				alert("por implementar... XD");
			break;
			case 10:
				alert("por implementar... XD");
			break;
		}
		return url;
	}
	
	return{init:init,
		urlDatosReunion:urlDatosReunion};
	
});