define(["app/util/reportesConstantConafe", "dijit/form/Button", "dojo/dom","dojo/dom-class", "dojo/dnd/Source",
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
	
	//Avance
	var catalogA= new Object();
	var catalogT= new Object();
	var catalogT1= new Object();
	var catalogT2= new Object();
	var catalogT3= new Object();
	var catalogT4= new Object();
	var catalogG= new Object();
	var catalogI= new Object();
	var catalogC= new Object();
	
	var DnDA= new Array();
	var DnDT= new Array();
	var DnDT1= new Array();
	var DnDT2= new Array();
	var DnDT3= new Array();
	var DnDT4= new Array();
	var DnDG= new Array();
	var DnDI= new Array();
	var DnDC= new Array();
	
	var template= new Deferred();
    function init(config){
		config.contenedor.set('content', config.template); 
		template.resolve(true);
    }
    
	template.then(function(respoce){
		$('#slider').tinycarousel({ display: 3});	
		
		catalogA = new Source("tcatalogNodeAvn",{accept:["ActivoA"]});
    	catalogT = new Source("tcatalogNodeTpo",{accept:["ActivoT"]});
    	catalogT1 = new Source("tcatalogNodeApo",{accept:["ActivoT1"]});
    	catalogT2 = new Source("tcatalogNodeDgc",{accept:["ActivoT2"]});
    	catalogT3 = new Source("tcatalogNodeBull",{accept:["ActivoT3"]});
    	catalogT4 = new Source("tcatalogNodePbi",{accept:["ActivoT4"]});
    	catalogG = new Source("tcatalogNodeGeo",{accept:["ActivoG"]});
    	catalogI = new Source("tcatalogNodeInt",{accept:["ActivoI"]});
//    	catalogC = new Source("tcatalogNodeCom",{accept:["ActivoC"]});
		
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
        	
        	registry.byId('tfilterCont').destroyRecursive();
        	jsUtils.destroyDivs(['pivot','tdtStats','tActions','filter']);
        	consulta=[];
        	DnDA=[];
        	DnDT=[];
        	DnDT1=[];
        	DnDT2=[];
        	DnDT3=[];
        	DnDT4=[];
        	DnDG=[];
        	DnDI=[];
        	DnDC=[];
     	
        	catalogA.selectAll();
        	catalogT.selectAll();
        	catalogT1.selectAll();
        	catalogT2.selectAll();
        	catalogT3.selectAll();
        	catalogT4.selectAll();
        	catalogG.selectAll();
        	catalogI.selectAll();
 //       	catalogC.selectAll();
        	registry.byId('tstatsNode').set('value',[]);
        	catalogA.deleteSelectedNodes();
        	catalogT.deleteSelectedNodes();
        	catalogT1.deleteSelectedNodes();
        	catalogT2.deleteSelectedNodes();
        	catalogT3.deleteSelectedNodes();
        	catalogT4.deleteSelectedNodes();
        	catalogG.deleteSelectedNodes();
        	catalogI.deleteSelectedNodes();
  //      	catalogC.deleteSelectedNodes();
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
    		if(catalogoOpciones[i].tpo=='Educacion'){
    			DnDT.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Apoyo'){
    			DnDT1.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Diagnostico'){
    			DnDT2.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Bullying'){
    			DnDT3.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='Poblacion'){
    			DnDT4.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
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
    	}

    	catalogA.insertNodes(false,DnDA);
    	catalogA.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
		catalogT.insertNodes(false,DnDT);
    	catalogT.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogT1.insertNodes(false,DnDT1);
    	catalogT1.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogT2.insertNodes(false,DnDT2);
    	catalogT2.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogT3.insertNodes(false,DnDT3);
    	catalogT3.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogT4.insertNodes(false,DnDT4);
    	catalogT4.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
	   	catalogG.insertNodes(false,DnDG);
    	catalogG.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
	    catalogI.insertNodes(false,DnDI);
    	catalogI.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    //	catalogC.insertNodes(false,DnDC);
   // 	catalogC.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
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
    		var params={  
					'q':"*:*",  
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
		
		if(dom.byId('tActions')){
			jsUtils.destroyDivs(['tActions']);
		}
		jsUtils.createTag('div','tActions', 'filter');
    	dom.byId('tActions').innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'<a href="#"><img src="static/img/invertir.png" border="0"id="invImg"/></a>'+
    	'&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'<a href="#"><img src="static/img/export.png" border="0"id="exportImg"/></a>'+
    	'&nbsp;&nbsp;&nbsp;&nbsp;'+
    	'<a href="#"><img src="static/img/aceptar.png" border="0"id="acepImg"/></a>';
		
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

            new Tooltip({connectId: ['exportImg'],
                label: "Exportar"});
            on( dom.byId('exportImg'),'click', function(){
            	_exportar(cat,col);
     	   });
        
	}
	
	
	loadPivotTable=function (categorias,cat,col) {
		var fqs=facetQuerys(cat,col);
		var busqueda= new Deferred();
		var sField=registry.byId('tstatsNode').get("value");
		
		jsUtils.JSONP.call(url,{  
			callbackParamName: "jsoncallback",  
			params: {  
					'q': "*:*",  
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
					      { name: 'Id',			field: 'id', 		width: '5px', hidden:true},
					      { name: 'Entidad',	field: 'entidad',	width: '150px'},      
						  { name: 'Municipio',	field: 'municipio',	width: '150px'},      
					      { name: 'Localidad',	field: 'localidad',	width: '150px'}]];
		
		var busqueda= new Deferred();
		
		jsUtils.JSONP.call(url,{  
			callbackParamName: "jsoncallback",  
			params: {  
				'q': "*:*",  
				'facet': "on",  
				'facet.mincount':1,
				'facet.limit':-1,
				'json.wrf':"JSONP.process",
				'fl': 'id,entidad,municipio,localidad',
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
   					entidad: ccts[i].entidad, 
   					municipio: ccts[i].municipio,
   					localidad: ccts[i].localidad});
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
		fl.push('entidad');
		fl.push('municipio');
		fl.push('localidad');
		fl.push('cApec');
		//fl.push('id');
		fl.push('numApec');
		label.push('entidad');
		label.push('municipio');
		label.push('localidad');
		label.push('Apec');
		//label.push('Id');
		label.push('numApec');
		var params={
				query:'+' +fq.join(" +"), fieldList:fl, fieldsLabels:label
		};

		jsUtils.XFRAME.call(dojo.config.app.urlBase+'exportarDocumentos/resultadosBusqueda1', {
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
				if (i=='max'){html+='N\u00FAmero m\u00E1ximo: '+stats[prop][i]+'<br> ';}
				if (i=='min'){html+='N\u00FAmero m\u00EDnimo: '+stats[prop][i]+'<br> ';}
				if (i=='sum'){html+='Total: '+stats[prop][i]+'<br> ';}
				if (i=='mean'){html+='Promedio: '+stats[prop][i]+'<br> ';}
				if (i=='stddev'){html+='Desviaci\u00F3n est\u00E1ndar: '+stats[prop][i]+'<br> ';}
			}
		}
		return html;
	};
	
	var json2pivot = function(result,categorias){
		var jQueryResult = new Array();
		var strCat = '{';
		readarray(result["facet_counts"]["facet_pivot"][categorias],jQueryResult,strCat);	
		return jQueryResult;
	};

	var readarray =function(results, jQueryResult,strCat){
		var max = results.length;
		for(var i=0; i<max; i++){
			var row = strCat + (strCat=='{'?'"':', "') +results[i]["field"]+ '":"' + results[i]["value"] + '"';
			if(!results[i].hasOwnProperty('pivot') || results[i]['pivot'].length==0){
				row = row + ', "total ": "N\u00FAm. de localidades", "Score":"' + +results[i]["count"] + '"}';
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