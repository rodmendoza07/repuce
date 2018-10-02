define(["app/util/reportesConstant", "dijit/form/Button", "dojo/dom","dojo/dom-class", "dojo/dnd/Source",
        "dojox/form/CheckedMultiSelect","dijit/layout/TabContainer","dijit/layout/ContentPane",
        "dijit/TitlePane","dijit/registry","app/util/jsUtils","dojo/_base/json","dojo/_base/array",
        "dojo/store/Memory", "dijit/form/FilteringSelect","dojo/dom-construct","dojo/DeferredList", 
        "dojo/_base/Deferred","dojox/json/query","dijit/Dialog","dijit/form/CheckBox","dojo/io/iframe","dojo/_base/xhr",
        "dojo/domReady!"], 
function( reportesConstant,Button, dom, domClass, Source,CheckedMultiSelect,
		TabContainer,ContentPane,TitlePane,registry,jsUtils,json,array,
		Memory,FilteringSelect,domConstruct,DeferredList,Deferred,query,
		Dialog,CheckBox,ioframe,xhr){
	
	var catalogoOpciones= reportesConstant.C_OPCIONES;
	var catalogoGraficas= reportesConstant.C_GRAFICA;
	var colorArray= reportesConstant.C_COLOR;
	var url = reportesConstant.URL;
	var tpogrStore = new Memory({data:reportesConstant.C_TPO_GRAFICA});
    
	var catalogA= new Object();
	var catalogT= new Object();
	var catalogG= new Object();
	var catalogI= new Object();
	var catalogC= new Object();
	var catalogPf= new Object();
	var catalogPe= new Object();
	var catalogPm= new Object();
	var catalogPo= new Object();
	var catalogCc= new Object();
	var catalogR= new Object();
	
	var DnDA= new Array();
	var DnDT= new Array();
	var DnDG= new Array();
	var DnDI= new Array();
	var DnDC= new Array();
	var DnDPf= new Array();
	var DnDPe= new Array();
	var DnDPm= new Array();
	var DnDPo= new Array();
	var DnDCc= new Array();
	var DnDR= new Array();
	
	var consulta= new Array();
	
	var template= new Deferred();
    function init(config){
		config.contenedor.set('content', config.template); 
		template.resolve(true);
    }
    
    template.then(function(respoce){
    	$('#slider').tinycarousel({ display: 3});	
    	
    	 catalogA = new Source("catalogNodeAvn",{accept:["ActivoA"]});
    	 catalogT = new Source("catalogNodeTpo",{accept:["ActivoT"]});
    	 catalogG = new Source("catalogNodeGeo",{accept:["ActivoG"]});
    	 catalogI = new Source("catalogNodeInt",{accept:["ActivoI"]});
    	 catalogC = new Source("catalogNodeCom",{accept:["ActivoC"]});
    	 catalogPf = new Source("catalogNodePrFe",{accept:["ActivoPrFe"]});
    	 catalogPe = new Source("catalogNodePrEs",{accept:["ActivoPrEs"]});
    	 catalogPm = new Source("catalogNodePrMu",{accept:["ActivoPrMu"]});
    	 catalogPo = new Source("catalogNodePrOs",{accept:["ActivoPrOsc"]});
    	 catalogCc = new Source("catalogNodeCac",{accept:["ActivoCc"]});
    	 catalogR = new Source("catalogNodeRec",{accept:["ActivoR"]});
    	 
    	 new CheckedMultiSelect({
             multiple:true,
             invalidMessage:"Debe seleccionar al menos una opcion "
          },'statsNode').addOption(reportesConstant.STATS_OPCIONES);
    	 
    	 ready();
    });
	
	var ready= function(){
		var fs=new FilteringSelect({
            id: "tpogrSelect",
            value: 0,store: tpogrStore,
            searchAttr: "name"
        }, "tpogrSelect");
		
		fs.on('change',function(){
        	if(registry.byId('restCkd')){
        		jsUtils.destroyDivs(['restDiv']);
        	}
        	if(registry.byId('tpogrSelect').get('value')>1){
        		jsUtils.createTag('div','restDiv', 'menuini');
        		dom.byId('restDiv').innerHTML='Restrictiva ';
        		jsUtils.createTag('div','restCkd', 'restDiv');
        		new CheckBox({name: "restCkd",value: "agreed",checked: false}, "restCkd");
        	}
        	
        	var store=new Array();
        	for(var i in catalogoGraficas ){
        		if(catalogoGraficas[i].tpo==registry.byId('tpogrSelect').get('value')||catalogoGraficas[i].tpo=='0'){
        			store.push(catalogoGraficas[i]);
        		}
        	}
        	registry.byId('graficaSelect').set('store',new Memory({data:store}));
        	registry.byId('graficaSelect').set('value',0);
        	registry.byId('graficaSelect').set('readOnly',false);
        });
		
		fs.set('value',1);
		
        new FilteringSelect({
            id: "graficaSelect",
            value: 0,readOnly:true,
            searchAttr: "name"
        }, "graficaSelect");
        
        new Button({label: "Restablecer"},"resetAll").
        on('click', function(){
        	jsUtils.destroyDivs(['chartdiv','invertir','Aceptar','Maximizar','Exportar','tdStats']);
        	consulta=[];
        	DnDA=[];
        	DnDT=[];
        	DnDG=[];
        	DnDI=[];
        	DnDC=[];
        	DnDPf= [];
        	DnDPe= [];
        	DnDPm= [];
        	DnDPo= [];
        	DnDCc= [];
        	DnDR= [];
        	registry.byId('filterCont').destroyRecursive();
        	catalogA.selectAll();
        	catalogT.selectAll();
        	catalogG.selectAll();
        	catalogI.selectAll();
        	catalogC.selectAll();
        	catalogPf.selectAll();
        	catalogPe.selectAll();
        	catalogPm.selectAll();
        	catalogPo.selectAll();
        	catalogCc.selectAll();
        	catalogR.selectAll();
        	catalogA.deleteSelectedNodes();
        	catalogT.deleteSelectedNodes();
        	catalogG.deleteSelectedNodes();
        	catalogI.deleteSelectedNodes();
        	catalogC.deleteSelectedNodes();
        	catalogPf.deleteSelectedNodes();
        	catalogPe.deleteSelectedNodes();
        	catalogPm.deleteSelectedNodes();
        	catalogPo.deleteSelectedNodes();
        	catalogCc.deleteSelectedNodes();
        	catalogR.deleteSelectedNodes();
        	setDNDCatalog();
		});
        setDNDCatalog();
        setDNDWishlist();
        var tp = new dijit.TitlePane({
			title:'<span class="sub">Opciones</span>',
			style:"width: 100%;",
			content: dom.byId("toggleCnt"),
			open:true});
        dom.byId("toggleTp").appendChild(tp.domNode);
    };
	
    
    function setDNDCatalog(){
    	for(var i in catalogoOpciones ){
    		if(catalogoOpciones[i].tpo=='Avance'){
    			DnDA.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
    				catalogoOpciones[i].label,
    				type: [catalogoOpciones[i].status]});}
    		if(catalogoOpciones[i].tpo=='TipoEscuela'){
    			DnDT.push({ data: "<input v='_"+catalogoOpciones[i].opcion+"_' type='hidden'> "+
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
    	}

    	catalogA.insertNodes(false,DnDA);
    	catalogA.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
		catalogT.insertNodes(false,DnDT);
    	catalogT.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
	   	catalogG.insertNodes(false,DnDG);
    	catalogG.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
	    catalogI.insertNodes(false,DnDI);
    	catalogI.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
    	catalogC.insertNodes(false,DnDC);
    	catalogC.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});
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
    	catalogR.insertNodes(false,DnDR);
    	catalogR.forInItems(function(item, id, map){domClass.add(id, item.type[0]);});

    }
    
    
    
    function setDNDWishlist(){
		var wishlist = new Source("wishlistNode",{ accept:reportesConstant.C_STATUS});
    	wishlist.on('DndDrop',function (){
  
    		var wishCat=wishlist.getAllNodes(); 
    		var categorias="";
    		var col=new Array();
    		var cat=new Array();
    		for (var i in wishCat){			
    			if(wishCat[i].innerHTML){
    				consulta.push(wishCat[i].innerHTML);
                    domConstruct.destroy(wishCat[i].id);
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
    		for(var j in cat){fField.push(cat[j]);	}
    		jsUtils.JSONP.call(url,{  
    					callbackParamName: "jsoncallback",  
    					params: {  
    							'q': "*:*",  
    							'facet': "on",  
    							'wt':"json",
    							'json.wrf':"JSONP.process",
    							'facet.mincount':1,
    							'facet.field':fField,
    							'fq':fqs,
    							'rows':0}  ,
    					callback: function(data){
    						filtros(categorias,cat,col,data);
    					}
    				  }); 
    	});
    }
    
	function filtros(categorias,cat,col,data){
		if(!registry.byId('filterCont')){
			jsUtils.createTag('div','filterCont', 'wishlistNode');
			var fCon=new TabContainer({
	            persist:false,tabStrip:true,id:"filterCont",
	            style:"width: 400px; height: 150px;"
	        },"filterCont");
            fCon.startup();
            fCon.resize();
		}
		
		if(registry.byId('Aceptar')){
            registry.byId('Aceptar').destroyRecursive();
            registry.byId('Maximizar').destroyRecursive();
            registry.byId('Exportar').destroyRecursive();
        }
		
		jsUtils.createTag('div','invertir', 'wishlistNode');
        jsUtils.createTag('div','Aceptar', 'wishlistNode');
        jsUtils.createTag('div','Maximizar', 'wishlistNode');
        jsUtils.createTag('div','Exportar', 'wishlistNode');
		
        for(var i in cat){
        	
        	if(!registry.byId('fCp'+cat[i])){

        		registry.byId('filterCont').addChild(new ContentPane({
            		persist:false,tabStrip:true,title:col[i],
    		        id:'fCp'+cat[i]
                }));
            	
            	jsUtils.createTag('div','CMSelect'+cat[i],'fCp'+cat[i]);   
             
            	var fieldsArray=data["facet_counts"]["facet_fields"][cat[i]];
            	
            	var optionArray= new Array();
    			for(var j in fieldsArray){
    				if(j%2==0){
    					optionArray.push({label:fieldsArray[j],value:fieldsArray[j],selected:true});
    				}          
    			} 
            	
       			new CheckedMultiSelect({
                   multiple:true,
                   invalidMessage:"Debe seleccionar al menos una opcion en "+col[i]
                },'CMSelect'+cat[i]).addOption(optionArray);
       			
       			if(registry.byId('invertir')){
       	            registry.byId('invertir').destroyRecursive();
       	        }
       			
       	        new Button({label: "invertir Seleccion"}, 
       	        		 'invertir').on('click', function(){
       	        			registry.byId('CMSelect'+cat[i]).invertSelection(true);
       			});
       	         
       			registry.byId('filterCont').selectChild( registry.byId('fCp'+cat[i]), true);
        	}else{
        		if(registry.byId('tpogrSelect').get('value')==1){
        			registry.byId('CMSelect'+cat[i]).set('readOnly',true);
        		}
        	}	
        }
        
        selectGr (categorias,cat,col,false);	
        
        new Button({label: "Aceptar"},"Aceptar").
         on('click', function(){
        	 selectGr (categorias,cat,col,false);	
		});
        
        new Button({label: "Maximizar"},"Maximizar").
         on('click', function(){
        	 selectGr (categorias,cat,col,true);	
		});
        
        new Button({label: "Exportar"},"Exportar").
          on('click', function(){
         	 _exportar(cat,col);
 		});
	}

	function getGraficaSimple(categorias,cat,col,max) {
		var gwi="650";
		var ghe="450";
		var grDiv="chartdiv";
		if(max){
			gwi="1000";
			ghe="600";
			grDiv="mxGrDlg";
			maximizar();
		}

		var fqs=facetQuerys(cat,col);
		var fField= new Array();
		for(var j in cat){fField.push(cat[j]);	}
		var sField=registry.byId('statsNode').get("value");

		var busqueda= new Deferred();
		jsUtils.JSONP.call(url, {  
			callback: function(data){
				busqueda.resolve(data);
			},  
			callbackParamName: "jsoncallback",  
			params: {  
				'q': "*:*",  
				'facet': "on",  
				'facet.mincount':1,
				'fl': 'id,cveCct,nombreCCT,'+categorias,
				'wt':"json",
				'json.wrf':"JSONP.process",
				'stats':true,
				'stats.field':sField,
				'facet.field':fField,
				'fq':fqs,
				'rows':"0"
			}  
		});

		busqueda.then(function(data){
			if(!max){
				jsUtils.destroyDivs(['chartdiv']);							
			}
			var Encontrados=data["response"]["numFound"];
			var fieldsArray=data["facet_counts"]["facet_fields"][cat[(cat.length-1)]];
			var stats=data["stats"]["stats_fields"];

			var DatosGrafica= '';
			for(var j=0; j<fieldsArray.length ; j++){
				if(j%2==0){
					DatosGrafica=DatosGrafica+"<set name='"+fieldsArray[j]+"' value='"+fieldsArray[j+1]+
					"'  color='"+colorArray[parseInt(Math.random()*colorArray.length)]+"'/>";
				}          
			} 

			var chart = new FusionCharts(dojo.config.app.urlStatic+'/css/segundaSesion/FusionChartsFree/Charts/'+
					registry.byId('graficaSelect').get('value'), "ChartId",gwi, ghe);
			chart.setDataXML(
					"<graph caption='"+col[col.length-1]+" "+Encontrados+"' xAxisName='Categorias' "+
					"yAxisName='Centros de trabajo' decimalPrecision='0'  rotateNames='1' formatNumberScale='0'>"+
					DatosGrafica+"</graph>");	   
			chart.render(grDiv);
			dom.byId('tdStats').innerHTML=statsHtml(stats);

		});

	}
		
	function getGraficaMultiple(categorias,cat,col,max) {
		var gwi="650";
		var ghe="450";
		var grDiv="chartdiv";

		if(cat.length<2){
			jsUtils.basicAlert('Debe seleccionar mas de una opcion');
			return;
		}

		if(max){
			gwi="1000";
			ghe="600";
			grDiv="mxGrDlg";
			maximizar();
		}
		var pivotCat=cat[(cat.length-2)]+','+cat[(cat.length-1)];
		var sField=registry.byId('statsNode').get("value");
		var fqs=facetQuerys(cat,col);
		var fField= new Array();
		for(var j in cat){fField.push(cat[j]);	}

		var busqueda= new Deferred();
		jsUtils.JSONP.call(url, { 
			callback: function(data){ 
				busqueda.resolve(data);
			},
			callbackParamName: "jsoncallback",
			params: { 
				"q": "*:*",
				"facet": "on",
				"facet.mincount":1,
				"facet.pivot":pivotCat,
				"fl": "id,cveCct,nombreCCT,"+categorias,
				"wt":"json",
				"json.wrf":"JSONP.process",
				'stats':true,
				'stats.field':sField,
				'facet.field':fField,
				'fq':fqs,
				"rows":"0"
			}  
		});  

		busqueda.then(function(data){
			if(!max){
				jsUtils.destroyDivs(['chartdiv']);							
			}
			var pivotData=data["facet_counts"]["facet_pivot"][pivotCat];
			var setList=data["facet_counts"]["facet_fields"][cat[(cat.length-1)]];
			var stats=data["stats"]["stats_fields"];
			
			var dataSetArray=new Array();
			for(var i=0; i<setList.length ; i++){
				if(i%2==0){
					var jpResult=jsUtils.jsonPath(pivotData,'$.[*].pivot[?(@.value=="'+setList[i]+'")]');
					dataSetArray.push(jpResult);
				}          
			}
			var datosGrafica= '<graph xaxisname="'+cat[(cat.length-1)]+'" yaxisname="Centros de trabajo" hovercapbg="DEDEBE" hovercapborder="889E6D"'+
			' rotateNames="1" yAxisMaxValue="100" numdivlines="9" divLineColor="CCCCCC" divLineAlpha="80" decimalPrecision="0"'+
			' showAlternateHGridColor="1" AlternateHGridAlpha="30" AlternateHGridColor="CCCCCC" formatNumberScale="0" showValues="0"'+
			' caption="'+cat[(cat.length-2)]+'" subcaption="">';
			var category='<categories font="Arial" fontSize="11" fontColor="000000">';
			var datasets= new Array();
			for(var i in pivotData){
				category+='<category name="'+pivotData[i]["value"]+'" />';
				if(i==pivotData.length-1){category+='</categories>';}

				for(var j in dataSetArray ){
					if(!datasets[j]){
						datasets.push('<dataset seriesname="'+dataSetArray[j][i]["value"]+
								'" color="'+colorArray[parseInt(Math.random()*colorArray.length)]+
								'" ><set value="'+dataSetArray[j][i]["count"]+'"/>');
					}else if(!dataSetArray[j][i]){
						continue;
					}else{
						datasets[j]+='<set value="'+dataSetArray[j][i]["count"]+'"/>';
					}
				}
			}
			var allDataset='';
			for(var k in datasets){
				datasets[k]+='</dataset>';
				allDataset+=datasets[k];
			}
			datosGrafica=datosGrafica+category+allDataset+'</graph>';

			var chart = new FusionCharts(dojo.config.app.urlStatic+'/css/segundaSesion/FusionChartsFree/Charts/'+
					registry.byId('graficaSelect').get('value'), "ChartId",gwi, ghe);
			
			chart.setDataXML(datosGrafica);	   
			chart.render(grDiv);
			dom.byId('tdStats').innerHTML=statsHtml(stats);
		});			
	}

				
	function getGraficaMulRestictiva(categorias,cat,col,max) {
		var gwi="650";
		var ghe="450";
		var grDiv="chartdiv";
		if(max){
			gwi="1000";
			ghe="600";
			grDiv="mxGrDlg";
			maximizar();
		}

		var fqs=facetQuerys(cat,col);
		var fField= new Array();
		for(var j in cat){fField.push(cat[j]);	}

		var busqueda= new Deferred();
		jsUtils.JSONP.call(url, {  
			callback: function(data){
				busqueda.resolve(data);
			},  
			callbackParamName: "jsoncallback",  
			params: {  
				'q': "*:*",  
				'facet': "on",  
				'facet.mincount':1,
				'fl': 'id,cveCct,nombreCCT,'+categorias,
				'wt':"json",
				'json.wrf':"JSONP.process",
				'facet.field':fField,
				'fq':fqs,
				'rows':"0"
			}  
		});

		busqueda.then(function(data){
			if(!max){
				jsUtils.destroyDivs(['chartdiv']);							
			}
			var Encontrados=data["response"]["numFound"];
			var facetFields=data["facet_counts"]["facet_fields"];

			var grCat= '<categories>';
			for (var i=0; i<cat.length; i++){
				grCat+=' <category name="'+cat[i]+'" />';
				if(i==(cat.length-1)){grCat+='</categories>';}
			}

			var dataSetNames=new Array();
			for (var i=0; i<eval('facetFields.'+cat[0]+'.length');i++){
				if(i%2==0){
					dataSetNames.push(eval('facetFields.'+cat[0]+'[i]'));
				}
			}
			var dataSetValues=new Array();
			for(var j in dataSetNames){
				var valArr=new Array();
				for (var i=0; i<cat.length; i++){	
					for (var k=0; k<eval('facetFields.'+cat[i]+'.length');k++){
						if(eval('facetFields.'+cat[i]+'[k]')==dataSetNames[j]){
							valArr.push(eval('facetFields.'+cat[i]+'[k+1]'));
						}
					}
				}
				dataSetValues.push(valArr);
			}	

			var grDataSet=''; 	
			for(var i in dataSetNames){
				grDataSet+='<dataset seriesName="'+dataSetNames[i]+'" color="'+colorArray[parseInt(Math.random()*colorArray.length)]+'" >';
				for(var j in dataSetValues[i]){
					grDataSet+='<set value="'+dataSetValues[i][j]+'" />';
				}
				grDataSet+='</dataset>';
			}

			var chart = new FusionCharts(dojo.config.app.urlStatic+'/css/segundaSesion/FusionChartsFree/Charts/'+
					registry.byId('graficaSelect').get('value'), "ChartId",gwi, ghe);
			chart.setDataXML(
					"<graph caption='"+col[col.length-1]+" "+Encontrados+"' xAxisName='Categorias' "+
					"yAxisName='Centros de trabajo' decimalPrecision='0'  rotateNames='1' formatNumberScale='0'>"+
					grCat+grDataSet+"</graph>");	   
			chart.render(grDiv);
		});

	}
		
	function _exportar(lCat,col){

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
		var params={
				query:'*:*', facet:true, facetMinCount:1, fieldList:fl,
				facetQuerys:fq, factetFields:fl, fieldsLabels:label
		};

		jsUtils.XFRAME.call(dojo.config.app.urlBase+'exportarDocumentos/resultadosBusqueda', {
			callback: function(data){
				alert('sale');
			},  
			params:params});
	}

	var facetQuerys= function(lCat,col){
		var fqs= new Array();
		if(registry.byId('filterCont')){
			for(var  i in lCat ){
				if(registry.byId('CMSelect'+lCat[i])){
					var Options = registry.byId('CMSelect'+lCat[i]).getOptions();
					var data = registry.byId('CMSelect'+lCat[i]).get("value");
					if(data.length==0){
						alert('Debe seleccionar alguna opción de '+col[i]);
						return false;
					}else if(data.length<Options.length){
						var fqArray= registry.byId('CMSelect'+lCat[i]).get("value");
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

	var statsHtml= function(stats){
		var html='';
		var Options = registry.byId('statsNode').getOptions();

		for(var prop in stats){  
			for(var i in Options ){
				if(Options[i].value==prop)
					html+='<h3>'+Options[i].label+'</h3> ';
			}
			for(var i in stats[prop]){
				if (i=='max'){html+='Numero maximo: '+stats[prop][i]+'<br> ';}
				if (i=='min'){html+='Numero minimo: '+stats[prop][i]+'<br> ';}
				if (i=='sum'){html+='Total: '+stats[prop][i]+'<br> ';}
				if (i=='mean'){html+='promedio: '+stats[prop][i]+'<br> ';}
				if (i=='stddev'){html+='Desviacion estandar: '+stats[prop][i]+'<br> ';}
			}
		}
		return html;
	};

	var maximizar = function(){
		var mxGr=new Dialog({id:'mxGr',content :'<div id="mxGrDlg"/>'});
		mxGr.show();
		mxGr.on('hide',function(){
			registry.byId('mxGr').destroyRecursive(false);
		});
		mxGr._setStyleAttr('left:20px !important;'); 
		mxGr._setStyleAttr('top:20px !important;');
	};
	
	var selectGr = function(categorias,cat,col,max){
		if(registry.byId('tpogrSelect').get('value')==1 && 
        		registry.byId('graficaSelect').get('value')!=0){
        	getGraficaSimple(categorias,cat,col,max);
        }else if(registry.byId('tpogrSelect').get('value')>1&& 
        		registry.byId('graficaSelect').get('value')!=0){
        	if(registry.byId('restCkd').get('value')){
        		getGraficaMulRestictiva(categorias,cat,col,max);
        	}else{
        		getGraficaMultiple(categorias,cat,col,max);
        	}
        }else{
        	jsUtils.basicAlert('Seleccione la grafica');
        }
	};

//	function domRestrictiva(){
//	dom.byId('seleccion').innerHTML='<table border="0" style="width:400px; height:170px;" ><tr>'+
//	'<td id="filterNode" valign="top" width="200px"></tr>'+
//	'<td id="wishlistNode" valign="top" width="200px"></tr></table>';

//	var wishlist = new Source("wishlistNode",{ accept:["ActivoA","ActivoC","ActivoPrFe","ActivoPrEs","ActivoPrMu","ActivoPrOsc"]});
//	var filterlist = new Source("filterNode",{ accept:["ActivoT","ActivoG","ActivoI"]});

//	wishlist.on('DndDrop',onDrp());
//	filterlist.on('DndDrop',onDrp());
//	}
    
   return{
     init:init
   };
   
});
