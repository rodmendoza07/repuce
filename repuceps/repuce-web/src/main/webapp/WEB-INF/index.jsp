<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="ISO-8859-1">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">	
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
  	<title>Registro P&uacute;blico de Consejos Escolares</title>
	<link rel="stylesheet" href="static/css/style.css" media="screen">
	<link rel="stylesheet" href="static/css/segundaSesion/estilo.css" media="screen">
  	<link rel="stylesheet" href="static/js/libs/dijit/themes/tundra/tundra.css" media="screen">  
  	<link rel="stylesheet" href="static/js/libs/dojox/widget/Toaster/Toaster.css" />
  	<link rel="stylesheet" href="static/js//libs/dojox/grid/resources/tundraGrid.css" />
  	<link rel="stylesheet" href="static/js//libs/dojox/grid/enhanced/resources/EnhancedGrid.css" />
  	<link rel="stylesheet" href="static/js//libs/dojox/form/resources/CheckedMultiSelect.css"/>
  	<link rel="stylesheet" href="static/js//libs/dojox/grid/enhanced/resources/EnhancedGrid_rtl.css" />
  	<link rel="stylesheet" href="static/css/demo.css" />
  	<link rel="stylesheet" href="static/css/container.css" />
  	<link rel="stylesheet" href="static/css/stylsheet.css" />
        <script src="static/js/util/jquery-1.8.0.min.js" type="text/javascript" charset="UTF-8"></script>		
        <script src="static/js/util/jquery.cookie.min.js"type="text/javascript" charset="UTF-8"></script>		
        <script src="static/js/util/jquery.accordion.js" type="text/javascript" charset="UTF-8"></script>
        <script src="static/js/util/jquery.pivot.js" type="text/javascript" charset="UTF-8"></script>
        <script src="static/js/util/jquery.tinycarousel.min.js" type="text/javascript" charset="UTF-8"></script>
        <script src="static/css/segundaSesion/FusionChartsFree/JSClass/FusionCharts.js" type="text/javascript" charset="UTF-8"></script>		
        
  	<script type="text/javascript">
                var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
                document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
        </script>
        <script type="text/javascript">
                try {
                        var pageTrackerFooter = _gat._getTracker("UA-24886980-1");
                pageTrackerFooter._trackPageview("MENU");
                } catch(err) {}
        </script>
  	<script>
  		dojoConfig= {
			has: {
	            "dojo-firebug": true,
	            "dojo-debug-messages": true
	        },  				
  	        app: {
  	        	urlBase: '<c:url value="/mvc/"/>',
  	        	urlStatic: '<c:url value="/static/"/>'
  	        	},
  	        packages:[{
  	        	name: 'app',
  	        	location: '<c:url value="/static/"/>js/app'
  	        },{
  	        	name: 'content',
  	        	location: '<c:url value="/mvc"/>'
  	        },{
  	        	name: 'static',
  	        	location: '<c:url value="/static"/>'
  	        }],
  	      	parseOnLoad: false,
  	        async: true,
  	      	debugAtAllCosts: true,
  	      	ioPublish: true,
  	      	cacheBust: true
  	    };  		
  	</script>
  	<script src="static/js/libs/dojo/dojo.js"></script>
	<script>
		require(["app/util/TreeMenu", "dojo/_base/xhr", "dojo/_base/array", "dojo/_base/lang",
		         "dijit/registry", "dijit/layout/BorderContainer",
		            "dijit/layout/TabContainer", "dijit/layout/ContentPane",
		            "dijit/layout/AccordionContainer", "dijit/form/Button", "dojox/widget/Standby", 
		            "dojo/string", "dojox/widget/Toaster", "dojo/_base/Deferred", 
		            "app/util/errorHandler", "dojo/domReady!","dijit/form/Form"],
		        function(TreeMenu, xhr, arrayUtil, lang, registry, BorderContainer, TabContainer, ContentPane, 
		        		AccordionContainer, Button, Standby, string, Toaster, Deferred, Form){					
					function onClickOpcion(item, node, evt){
			        	var url = item.url;
			        	var idOp = item.id;
			        	var titulo = item.opcion;
			        	if(url && string.trim(url) !== ''){
			        		var idPanel = 'contentTab_' + idOp;
			        		if(registry.byId(idPanel)){
			        			contentTabs.selectChild(registry.byId(idPanel));
			        			return;
			        		}
						    var panel = new ContentPane({
						        title: titulo,
						        id: idPanel,
						        closable: true,
						        onClose: function(){
 						        	standby.destroy();
 						        	return true;
						        }
						    });
							contentTabs.addChild(panel);
							contentTabs.selectChild(panel);
							var standby = new Standby({
								id: 'standby_contentTab_' + idOp,
							    target: idPanel,
							    'class': "dijitContentPaneLoading"
							});
							document.body.appendChild(standby.domNode);
							standby.startup();
							standby.show();
				        	require(['app/'+url,'app/util/text!content/'+url + '!strip;no-cache'], function(modulo,template){
				        		
				        		if(modulo.init && lang.isFunction(modulo.init)){
				        			var deferred = modulo.init({
				        				contenedor: panel, 
				        				idContenedor: 'contentTabs_' + idOp,
				        				template: template,
				        				urlBase: dojo.config.app.urlBase,
				        				standby: standby,
				        				cerrarTab: function(){
				        					contentTabs.closeChild(panel);
				        				}
			        				});
				        			
				        			if(deferred && lang.isFunction(deferred.then)){
					        			deferred.then(function(result){
					        				standby.hide();
					        			}); 				        			
				        			} else {
				        				//si no se devolvió algún deferred quitamos el bloqueo de inmediato
				        				standby.hide();
				        			}
				        		} else {
				        			// si no hay init quitamos el bloqueo de inmediato
				        			standby.hide();
				        		}
				        	});	
			        	}
			        };
			        
			        var btnLogout = new Button({
			        	id: 'btnLogout',
		                iconClass: 'dijitIconUsers',
		                type: 'button',
		                label: 'Salir',
		                onClick: function(){
		                	window.location.href='j_spring_security_logout';
		                }
		            });			
					
					var layoutPrincipal = new BorderContainer({
					    design: "headline"
					}, "layoutPrincipal");			
					var contentAccordion = new AccordionContainer();
					 
					 
					var contentTabs = new TabContainer({
					    region: "center",
					    id: "contenedorTabs",
					    tabPosition: "top"
					});
					 
					layoutPrincipal.addChild( contentTabs );
					 
					layoutPrincipal.addChild(
					    new ContentPane({
					    	style: 'text-align: right;',
					        region: "top",
					        id: "panelEncabezado", 
					        content: btnLogout
					    })
					);
					layoutPrincipal.addChild(
					    new ContentPane({
					        region: "left",
					        id: "panelMenu", 
					        content: contentAccordion,
					        splitter: true,
					        minSize: 200
					    })
					);
					 
					contentTabs.addChild(
					    new ContentPane({   
					        content:"<br><br><a href="+'http://conapase.sep.gob.mx/es/conapase/Instructivos'+" target='_blank'> Instructivos para el registro de sesiones y asambleas</a><br><br><br><br><div align="+'center'+"><img src="+'static/img/Calendarios.JPG'+" width="+'600'+" height="+'400'+"  border="+'0'+"></div>",
					        title: "Bienvenido"
					    }) 
					);
					
					xhr.get({
						handleAs: "json",
						preventCache:true,
						url: dojo.config.app.urlBase + "seguridad/menu/modulos",
						load: function(data){
							arrayUtil.forEach(data, function(mod){
								contentAccordion.addChild(new ContentPane({
							        title: mod.modulo,
							        idModulo: mod.id,
							        content: new TreeMenu(mod.id, onClickOpcion).getTree()
							    }));										
							});
							layoutPrincipal.startup();
						}
					});
					
					new Toaster({
						id: 'panelMensaje',
						positionDirection: 'tl-down',
						messageTopic: '/app/notificacion'
					}, 'panelNotificaciones');
					
		        });
		
	   
	</script>      

	<style type="text/css">
		/*Grid need a explicit width/height by default*/
		#grid {
	     width: 880px;
	     height: 300px;
		}
	</style>
	        
</head>
	<body class="tundra">
		<div id="panelNotificaciones"></div>	
        <div id="layoutPrincipal">

        </div>
        <input type="hidden" value="${usuario}" id=usuario />
    </body>
</html>
