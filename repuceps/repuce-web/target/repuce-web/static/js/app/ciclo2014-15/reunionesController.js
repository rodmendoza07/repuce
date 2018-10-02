define(["app/ciclo2014-15/primeraAsamblea", "app/ciclo2014-15/primeraSesion",
        "app/ciclo2014-15/segundaSesion",   "app/ciclo2014-15/segundaAsamblea"
        ], 
function( primeraAsamblea, primeraSesion, segundaSesion, segundaAsamblea
		){
	
	function init (cSesion,actividades,cCct,ReunionObj, infCctNivel){
		switch(cSesion){
			case 1:
				primeraAsamblea.init(actividades,cCct,ReunionObj, infCctNivel);
			break;
			case 2:
				primeraSesion.init(actividades,cCct,ReunionObj);
			break;
			case 3:
				segundaSesion.init(actividades,cCct, ReunionObj, infCctNivel);
			break;
			case 4:
				segundaAsamblea.init(actividades,cCct,ReunionObj, infCctNivel);
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
				url=dojo.config.app.urlBase + 'primeraSesion/selectC1415/'+cCct;
			break;
			case 3:
				url=dojo.config.app.urlBase + 'segundaSesion/selectC1415/'+cCct;
			break;
			case 4:
				url=dojo.config.app.urlBase + 'segundaAsamblea/select1415/'+cCct;
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