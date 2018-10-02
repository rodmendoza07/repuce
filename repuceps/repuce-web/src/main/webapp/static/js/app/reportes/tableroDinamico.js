define(["app/util/reportesConstant", "dijit/form/Button", "dojo/dom","dojo/dom-class", "dojo/dnd/Source",
        "dojox/form/CheckedMultiSelect","dijit/layout/TabContainer","dijit/layout/ContentPane",
        "dijit/TitlePane","dijit/registry","app/util/jsUtils","dojo/_base/json","dojo/_base/array",
        "dojo/store/Memory", "dijit/form/FilteringSelect","dojo/dom-construct","dojo/DeferredList", 
        "dojo/_base/Deferred","dojox/json/query","dijit/Dialog","dijit/form/CheckBox","dojo/io/iframe",
        "dojo/_base/xhr","dojo/data/ItemFileWriteStore","dojox/grid/DataGrid","dojox/grid/TreeGrid",
        "dojo/_base/array","dijit/Tooltip","dojo/on",
        "dojo/domReady!"], 
function( reportesConstant,Button, dom, domClass, Source,CheckedMultiSelect,
		TabContainer,ContentPane,TitlePane,registry,jsUtils,json,array,
		Memory,FilteringSelect,domConstruct,DeferredList,Deferred,query,
		Dialog,CheckBox,ioframe,xhr,ItemFileWriteStore,DataGrid,TreeGrid,
		array,Tooltip,on){
	
	var url = reportesConstant.URL;
	var catalogoOpciones= reportesConstant.C_OPCIONES;
	var Encontrados = 0;
	
	var catalogA= new Object();
	var catalogR= new Object();
	var catalogG= new Object();
	var catalogI= new Object();
	var catalogC= new Object();
	var catalogCI= new Object();
	var catalogPf= new Object();
	var catalogPe= new Object();
	var catalogPm= new Object();
	var catalogPo= new Object();
	var catalogCc= new Object();
	var catalogZ= new Object();
	var catalogN= new Object();
	
	
	var DnDA= new Array();
	var DnDR= new Array();
	var DnDG= new Array();
	var DnDI= new Array();
	var DnDC= new Array();
	var DnDCI= new Array();
	var DnDPf= new Array();
	var DnDPe= new Array();
	var DnDPm= new Array();
	var DnDPo= new Array();
	var DnDCc= new Array();
	var DnDE= new Array();
	var DnDZ= new Array();
	var DnDN= new Array();
	
	eval('var _usuario='+dom.byId('usuario').value);
	
	var template= new Deferred();
    function init(config){
		config.contenedor.set('content', config.template); 
		template.resolve(true);
    }
    
	template.then(function(respoce){
		$('#slider').tinycarousel({ display: 3});	
		
		catalogA = new Source("tcatalogNodeAvn",{accept:["ActivoA"]});
    	catalogR = new Source("tcatalogNodeRut",{accept:["ActivoR"]});
    	catalogG = new Source("tcatalogNodeGeo",{accept:["ActivoG"]});
    	catalogI = new Source("tcatalogNodeInt",{accept:["ActivoI"]});
    	catalogC = new Source("tcatalogNodeCom",{accept:["ActivoC"]});
    	catalogCI = new Source("tcatalogNodeComIn",{accept:["ActivoCI"]});
    	catalogPf = new Source("tcatalogNodePrFe",{accept:["ActivoPrFe"]});
    	catalogPe = new Source("tcatalogNodePrEs",{accept:["ActivoPrEs"]});
    	catalogPm = new Source("tcatalogNodePrMu",{accept:["ActivoPrMu"]});
    	catalogPo = new Source("tcatalogNodePrOs",{accept:["ActivoPrOsc"]});
    	catalogCc = new Source("tcatalogNodeCac",{accept:["ActivoCc"]});
    	catalogN = new Source("tcatalogNor",{accept:["ActivoN"]});
    	
    	catalogZ = new Source("tcatalogPresidente",{accept:["ActivoZ"]});
		
    	setDNDCatalog();
        setDNDWishlist();
        
        new CheckedMultiSelect({
            multiple:true,
            invalidMessage:"Debe seleccionar al menos una opci\u00F3n "
         },'tstatsNode').addOption(reportesConstant.STATS_OPCIONES);
        
        var tp = new dijit.TitlePane({
			title:'<span class="sub">Opciones</span> <a href="#"><img src="static/img/refresh2.png" border="0"id="refImg"/></a>',
			style:"width: 100%;",
			content: dom.byId("tToggleCnt"),
			open:true});
        dom.byId("tToggleTp").appendChild(tp.domNode);
        
        new Tooltip({connectId: ['refImg'],
            label: "Limpiar Criterios"});
        on( dom.byId('refImg'),'click', function(){
//        new Button({label: "Restablecer"},"tresetAll").
//        on('click', function(){
        	
        	registry.byId('tfilterCont').destroyRecursive();
        	jsUtils.destroyDivs(['pivot','tdtStats','tActions','filter']);
        	consulta=[];
        	DnDA=[];
        	DnDR=[];
        	DnDG=[];
        	DnDI=[];
        	DnDC=[];
        	DnDCI=[];
        	DnDPf= [];
        	DnDPe= [];
        	DnDPm= [];
        	DnDPo= [];
        	DnDCc= [];
        	DnDR= [];
        	DnDE= [];
        	DnDZ= [];
        	DnDN=[];
        	
//        	registry.byId('tinvertir').destroyRecursive();
//        	registry.byId('tAceptar').destroyRecursive();
//        	registry.byId('tExportar').destroyRecursive();
        	catalogA.selectAll();
        	catalogR.selectAll();
        	catalogG.selectAll();
        	catalogI.selectAll();
        	catalogC.selectAll();
        	catalogCI.selectAll();
        	catalogPf.selectAll();
        	catalogPe.selectAll();
        	catalogPm.selectAll();
        	catalogPo.selectAll();
        	catalogCc.selectAll();
        	catalogN.selectAll();
        	catalogZ.selectAll();
        	
        	registry.byId('tstatsNode').set('value',[]);
        	catalogA.deleteSelectedNodes();
        	catalogR.deleteSelectedNodes();
        	catalogG.deleteSelectedNodes();
        	catalogI.deleteSelectedNodes();
        	catalogC.deleteSelectedNodes();
        	catalogCI.deleteSelectedNodes();
        	catalogPf.deleteSelectedNodes();
        	catalogPe.deleteSelectedNodes();
        	catalogPm.deleteSelectedNodes();
        	catalogPo.deleteSelectedNodes();
       	    catalogCc.deleteSelectedNodes();
        	catalogZ.deleteSelectedNodes();
        	catalogN.deleteSelectedNodes();
//        	
        	twishlist.selectAll(); 
        	twishlist.deleteSelectedNodes(); 
        	setDNDCatalog();
        	tp.toggle();
        	
        	jsUtils.createTag('h3','txwln', 'twishlistNode');
			dom.byId('txwln').innerHTML='\u00A1Arrastre aqu\u00ED!';
			
			
		});
        
	});
	
	function setDNDCatalog(){
    	
    	for(var i in catalogoOpciones ){
    		if(catalogoOpciones[i].tpo=='Avance'){
    			DnDA.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Ruta'){
    			DnDR.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Geo'){
    			DnDG.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Integracion'){
    			DnDI.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		
    		if(catalogoOpciones[i].tpo=='Comite'){
    			DnDC.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='ComiteIn'){
    			DnDCI.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='ProgFed'){
    			DnDPf.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='ProgEst'){
    			DnDPe.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='ProgMun'){
    			DnDPm.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='ProyOs'){
    			DnDPo.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Caca'){
    			DnDCc.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Recurso'){
    			DnDR.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='ENLACE'){
    			DnDE.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='PerfilPresidente'){
    			DnDZ.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Norma'){
    			DnDN.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    	}

    	catalogA.insertNodes(false,DnDA);
    	catalogA.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
		catalogR.insertNodes(false,DnDR);
    	catalogR.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
	   	catalogG.insertNodes(false,DnDG);
    	catalogG.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
	    catalogI.insertNodes(false,DnDI);
    	catalogI.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogC.insertNodes(false,DnDC);
    	catalogC.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogCI.insertNodes(false,DnDCI);
    	catalogCI.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogPf.insertNodes(false,DnDPf);
    	catalogPf.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogPe.insertNodes(false,DnDPe);
    	catalogPe.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogPm.insertNodes(false,DnDPm);
    	catalogPm.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogPo.insertNodes(false,DnDPo);
    	catalogPo.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogCc.insertNodes(false,DnDCc);
    	catalogCc.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogZ.insertNodes(false,DnDZ);
    	catalogZ.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogN.insertNodes(false,DnDN);
    	catalogN.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});

    }
	
	var twishlist =new Object();
	function setDNDWishlist(){
		twishlist = new Source("twishlistNode",{ accept:reportesConstant.C_STATUS});
    	twishlist.on('DndDrop',function (){
    		if(dom.byId('txwln')){
    			dojo.destroy(dom.byId('txwln'));
    		}
    		jsUtils.destroyDivs(['pivot']);
    		jsUtils.createTag('div','res', 'pivot');
    		
    		
    	
    		var wishCat=twishlist.getAllNodes(); 
    		var categorias="";
    		var col=new Array();
    		var cat=new Array();
    		var consulta= new Array();
    		
    		if(wishCat.length==0){
    			jsUtils.createTag('h3','txwln', 'twishlistNode');
				dom.byId('txwln').innerHTML='\u00A1Arrastre aqu\u00ED!';
    		}

    		for (var i in wishCat){			
    			if(wishCat[i].innerHTML){
    				consulta.push(wishCat[i].innerHTML);
    			}else{break;}
    		}
    		
    		for (var i in consulta){			
    				col.push(consulta[i].substring(array.indexOf(consulta[i],'>')+1));
                    var pI=array.indexOf(consulta[i],'_');
                    var pF=array.lastIndexOf(consulta[i],'_');
                    categorias= categorias + consulta[i].substring(pI+1,pF) +",";
                    cat.push(consulta[i].substring(pI+1,pF));
    		}
    		
    		categorias =categorias.substring(0,array.lastIndexOf(categorias,','));
    		
    		var fqs=facetQuerys(cat,col);
    		var fField= new Array();
    		for(var j in cat){
    			fField.push(cat[j]);
			}
    		var valorQ = "*:*";
            if(_usuario.roles!='ROLE_ADMINISTRADOR' && _usuario.roles!='ROLE_CONAPASE'){
                            if(_usuario.username.substring(0,2)!="00"){
                              valorQ = "cveEntidad:"+(parseInt(_usuario.username.substring(0,2)));              
                            }                                             
            }   

    		var params={  
					'q':valorQ,  
					'facet':"on",  
					'wt':"json",
					'json.wrf':"JSONP.process",
					'facet.mincount':1,
					'facet.limit':-1,
					'facet.field':fField,
					'fq':fqs,
					'rows':0};
    		jsUtils.JSONP.call(url,{    
				callback: function(data){
					filtros(categorias,cat,col,data);
					if(cat.length>1){
						loadPivotTable(categorias,cat,col);						
					}
				},
    			params:params
			  }); 
    	});
    }
	
	
	function filtros(categorias,cat,col,data){
		if(!registry.byId('tfilterCont')){
			jsUtils.createTag('div','tfilterCont', 'filter');
			var fCon=new TabContainer({
	            persist:false,tabStrip:true,id:"tfilterCont",
	            style:"width: 400px; height: 150px;"
	        },"tfilterCont");
            fCon.startup();
            fCon.resize();
		}
		
//		if(registry.byId('tAceptar')){
//            registry.byId('tAceptar').destroyRecursive();
//             registry.byId('tExportar').destroyRecursive();
//        }
		if(dom.byId('tActions')){
			jsUtils.destroyDivs(['tActions']);
		}
//		jsUtils.createTag('div','tinvertir', 'filter');
		jsUtils.createTag('div','tActions', 'filter');
						
		var xliga = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'<a href="#"><img src="static/img/invertir.png" border="0"id="invImg"/></a>'+
    	'&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'<a href="#"><img src="static/img/export.png" border="0"id="exportImg"/></a>'+
    	'&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'<a href="#"><img src="static/img/aceptar.png" border="0"id="acepImg"/></a>';
				 
		if(_usuario.username.substring(_usuario.username.length-2,_usuario.username.length)=="99"){
			var xliga = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	    	'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	    	'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
	    	'<a href="#"><img src="static/img/invertir.png" border="0"id="invImg"/></a>'+
	    	'&nbsp;&nbsp;&nbsp;&nbsp;'+
	    	'<img src="static/img/export_des.png" border="0"id="exportImg"/>'+
	    	'&nbsp;&nbsp;&nbsp;&nbsp;'+
	    	'<a href="#"><img src="static/img/aceptar.png" border="0"id="acepImg"/></a>';				
		}
		
    	dom.byId('tActions').innerHTML=xliga;
    	
//        jsUtils.createTag('div','tAceptar', 'filter');
//        jsUtils.createTag('div','tExportar', 'filter');
		
        for(var i in cat){
        	if(!registry.byId('tfCp'+cat[i])){

        		registry.byId('tfilterCont').addChild(new ContentPane({
            		persist:false,tabStrip:true,title:col[i],
    		        id:'tfCp'+cat[i]
                }));
            	
            	jsUtils.createTag('div','tCMSelect'+cat[i],'tfCp'+cat[i]);   
             
            	var fieldsArray=data["facet_counts"]["facet_fields"][cat[i]];
            	
            	var optionArray= new Array();
    			for(var j in fieldsArray){
    				if(j%2==0){
    					optionArray.push({label:fieldsArray[j],value:fieldsArray[j],selected:true});
    				}          
    			} 
            	
       			new CheckedMultiSelect({
                   multiple:true,
                   invalidMessage:"Debe seleccionar al menos una opci\u00F3n en "+col[i]
                },'tCMSelect'+cat[i]).addOption(optionArray);
       			if(registry.byId('tinvertir')){
       	            registry.byId('tinvertir').destroyRecursive();
       	        }
       			new Tooltip({connectId: ['invImg'],
                    label: "Invertir selecci\u00F3n"});
                on( dom.byId('invImg'),'click', function(){
                	registry.byId('tCMSelect'+cat[i]).invertSelection(true);
         	    });
//       	         new Button({label: "Invertir selecci\u00F3n"}, 
//       	        		 'tinvertir').on('click', function(){
//       	        			registry.byId('tCMSelect'+cat[i]).invertSelection(true);
//       				});
       			registry.byId('tfilterCont').selectChild( registry.byId('tfCp'+cat[i]), true);
       			
        	}else{
        			registry.byId('tCMSelect'+cat[i]).set('readOnly',true);
        	}	
        }
        var chids=registry.byId('tfilterCont').getChildren();
        for (var i in chids){
        	if(array.indexOf(cat,chids[i].get('id').substring(4))==-1){
        		registry.byId('tfilterCont').closeChild(chids[i]);
        	}
        }

        new Tooltip({connectId: ['acepImg'],
                label: "Aceptar"});
            on( dom.byId('acepImg'),'click', function(){
            	loadPivotTable(categorias,cat,col);
     	    });
            if(_usuario.username.substring(_usuario.username.length-2,_usuario.username.length)!="99"){
    	new Tooltip({connectId: ['exportImg'],
            label: "Exportar"});
        on( dom.byId('exportImg'),'click', function(){
        	if(_usuario.username.substring(_usuario.username.length-2,_usuario.username.length)=="99"){
	            alert("No tiene privilegios de exportar");
	            return;
    		}
        	_exportar(cat,col);
 	   });
            }
//        new Button({label: "Aceptar"},"tAceptar").
//         on('click', function(){
//        	 loadPivotTable(categorias,cat,col);
//		});
        
//        new Button({label: "Exportar"},"tExportar").
//          on('click', function(){
//         	 _exportar(cat,col);
// 		});
	}
	
	
	loadPivotTable=function (categorias,cat,col) {
		var fqs=facetQuerys(cat,col);
		var busqueda= new Deferred();
		var sField=registry.byId('tstatsNode').get("value");
		var valorQ = "*:*";
        if(_usuario.roles!='ROLE_ADMINISTRADOR' && _usuario.roles!='ROLE_CONAPASE'){
                        if(_usuario.username.substring(0,2)!="00"){
                          valorQ = "cveEntidad:"+(parseInt(_usuario.username.substring(0,2)));              
                        }                                             
        }
		jsUtils.JSONP.call(url,{  
			callbackParamName: "jsoncallback",  
			params: {  
					'q': valorQ,  
					'facet': "on",  
					'wt':"json",
					'json.wrf':"JSONP.process",
					'facet.pivot':categorias,
					'facet.mincount':"1",
					'facet.limit':-1,
					'facet.field':cat,
					'fq':fqs,
					'stats':true,
					'stats.field':sField,
					'rows':"0"}  ,
			callback: function(data){busqueda.resolve(data);}
		  }); 
		
		busqueda.then(function(data){
            var rowsIn = json2pivot(data,categorias);
            var stats=data["stats"]["stats_fields"];
            Encontrados=data["response"]["numFound"];
            console.log("Encontrados="+Encontrados);
            var objt;
            var example4JSONdata = {
                    dataid: "Datos de REPUCE",
                    columns: [{ 
                    	colvalue: "total ", coltext: "total ", header: "total ", 
                    	sortbycol: "total ", groupbyrank: null, pivot: true,
                    	result: false }],
                    rows:rowsIn
            };
            for(var i=0; i<cat.length;i++){
                    objt={ colvalue: cat[i], coltext: cat[i], header: col[i], sortbycol: cat[i], groupbyrank: (i+1), pivot: false, result: false };
                    example4JSONdata.columns.push(objt);
            }	
            objt={ colvalue: "Score", coltext: "Score", header: "Score", sortbycol: "Score", groupbyrank: null, pivot: false, result: true};
            example4JSONdata.columns.push(objt);
            var exampleId = $(this).attr('title');
            $('#sourcetables table').hide();
            $('#' + exampleId).show();
            $('#res').html('<h3>Click the source table and it will be transformed into a pivot table</h3>');
            $('#pivot').show();
            $('#res').pivot({
                    source: example4JSONdata,
                    formatFunc: function (n) { return jQuery.fn.pivot.formatUK(n, 2); },
                    onResultCellClicked: function (data) { 
                    	cctViewTb(data,cat); }
            });
            dom.byId('tdtStats').innerHTML=statsHtml(stats);
		});
	};
	
	cctViewTb = function(data, cat){
//		alert(json.toJson(data));
		var grupos=data.groups;
		var fq = new Array();
		
		for(var i in grupos){
			fq.push(grupos[i].dataidGroup+':("'+grupos[i].groupbyval+'")');
		}
		
		if(cat.length!= fq.length){return;}
		
		var vw=new Dialog({id:'cctVw',content :'<div id="view"/>'});
		vw.show();
		vw.on('hide',function(){
			registry.byId('cctVw').destroyRecursive(false);
		});
		vw._setStyleAttr('left:20px !important;'); 
		vw._setStyleAttr('top:20px !important;');
		
		var layout = [[
					      { name: 'Id',							field: 'id', 	width: '5px', hidden:true},
					      { name: 'CCT',						field: 'cveCct',			width: '150px'},      
						  { name: 'Nombre del CCT',				field: 'nombreCCT',			width: '150px'},      
					      { name: 'N\u00FAmero de Integrantes',	field: 'numIntegrantes',	width: '150px'},
					      { name: 'Calidad del Presidente',		field: 'calidadPresidente',	width: '150px', hidden:true},
					      { name: 'Calidad del Secretario',		field: 'calidadSecretario',	width: '150px', hidden:true}]];
		
		var busqueda= new Deferred();
		
		jsUtils.JSONP.call(url,{  
			callbackParamName: "jsoncallback",  
			params: {  
				'q': "*:*",  
				'facet': "on",  
				'facet.mincount':1,
				'facet.limit':-1,
				'json.wrf':"JSONP.process",
				'fl': 'id,cveCct,nombreCCT,numIntegrantes,calidadPresidente,calidadSecretario',
				'wt':"json",
				'fq':fq,
				'rows':"1005"}  ,
			callback: function(data){busqueda.resolve(data);}
		  }); 
		
		busqueda.then(function(data){
			var ccts=data["response"]["docs"];
			var cctLen=ccts.length;
			
			if(ccts.length>1000){
				cctLen=1001;
				jsUtils.cstmAlert('\u00A1Demasiados resultados!<br> Solo se mostrar\u00e1n los primeros 1000. <br> Para obtener informaci\u00F3n detallada, siga filtrando.');
			}
			
			var data = {identifier: "id",items: []};
		
			for (var i=0;i<cctLen;i++){
   				data.items.push({
   					id: ccts[i].id, 
   					cveCct: ccts[i].cveCct, 
   					nombreCCT: ccts[i].nombreCCT,
   					numIntegrantes: ccts[i].numIntegrantes,
   					calidadPresidente: ccts[i].calidadPresidente,
   					calidadSecretario: ccts[i].calidadSecretario});
   			}
			var newStore = new ItemFileWriteStore({data: data});
			
			jsUtils.createTag('div','grid','view','width: 700px; height: 300px;');
   			new DataGrid({
		        id: 'grid',
		        structure: layout,
		        store:newStore,
		        autoWidth:true,
		        rowSelector: '20px'},
		        'grid').startup();
		});
	};
	
	function _exportar(lCat,col){

		if(Encontrados > 65535){
			jsUtils.cstmAlert("Solo es posible exportar hasta 65,535 resultados a Excel");
		}

		var fq= facetQuerys(lCat,col);
		var fl=new Array();
		var label=new Array();

		for(var j in lCat){
			fl.push(lCat[j]);
			label.push(col[j]);
		}
		fl.push('cveCct');
		fl.push('nombreCCT');
		label.push('CCT');
		label.push('Nombre');
		
		valorQ = '+'+fq.join(" +");
		
		if(_usuario.roles!='ROLE_ADMINISTRADOR' && _usuario.roles!='ROLE_CONAPASE'){
            if(_usuario.username.substring(0,2)!="00"){
              valorQ = "+cveEntidad:"+(parseInt(_usuario.username.substring(0,2)));              
            }                                             
		}
		
		var params={
				query:valorQ, fieldList:fl, fieldsLabels:label
		};

		jsUtils.XFRAME.call(dojo.config.app.urlBase+'exportarDocumentos/resultadosBusqueda', {
			callback: function(data){
				alert('sale');
			},  
			params:params});
		
	}
	
	var statsHtml= function(stats){
		var html='';
		var Options = registry.byId('tstatsNode').getOptions();

		for(var prop in stats){  
			for(var i in Options ){
				if(Options[i].value==prop)
					html+='<h3>'+Options[i].label+'</h3> ';
			}
			for(var i in stats[prop]){
				//if (i=='max'){html+='N\u00FAmero m\u00E1ximo: '+stats[prop][i]+'<br> ';}
				//if (i=='min'){html+='N\u00FAmero m\u00EDnimo: '+stats[prop][i]+'<br> ';}
				if (i=='sum'){html+='Total: '+stats[prop][i]+'<br> ';}
				//if (i=='mean'){html+='Promedio: '+stats[prop][i]+'<br> ';}
				//if (i=='stddev'){html+='Desviaci\u00F3n est\u00E1ndar: '+stats[prop][i]+'<br> ';}
			}
		}
		return html;
	};
	
	var json2pivot = function(result,categorias){
		var jQueryResult = new Array();
		var strCat = '{';
		readarray(result["facet_counts"]["facet_pivot"][categorias],jQueryResult,strCat);	
		console.log('jQueryResult:'+ json.toJson(jQueryResult));
		return jQueryResult;
	};

	var readarray =function(results, jQueryResult,strCat){
		var max = results.length;
		for(var i=0; i<max; i++){
			var row = strCat + (strCat=='{'?'"':', "') +results[i]["field"]+ '":"' + results[i]["value"] + '"';
			if(!results[i].hasOwnProperty('pivot') || results[i]['pivot'].length==0){
				row = row + ', "total ": "N\u00FAm. de CCT", "Score":"' + +results[i]["count"] + '"}';
				rowObj = JSON.parse(row);
				jQueryResult.push(rowObj);
			}else{
				readarray(results[i]["pivot"],jQueryResult,row);
			}
		}	
	};
	
	var facetQuerys= function(lCat,col){
		var fqs= new Array();
		if(registry.byId('tfilterCont')){
	        for(var  i in lCat ){
	        	if(registry.byId('tCMSelect'+lCat[i])){
		            var Options = registry.byId('tCMSelect'+lCat[i]).getOptions();
		            var data = registry.byId('tCMSelect'+lCat[i]).get("value");
		            if(data.length==0){
		            	jsUtils.cstmAlert('Debe seleccionar alguna opci\u00F3n de '+col[i]);
		                return false;
		            }else if(data.length<Options.length){
		                var fqArray= registry.byId('tCMSelect'+lCat[i]).get("value");
		                var rParams= lCat[i]+':("';
		                for(var j in fqArray){rParams= rParams+fqArray[j]+'" OR "';}
		                rParams=rParams.substring(0, rParams.lastIndexOf(' OR "'));
		                rParams= rParams+')';
		                fqs.push(rParams);
		            }
	        	}
	        }
		}
		return fqs;
	};
    
    return{
        init:init
      };  
	
	
	
});