define([], 
function(){
	      var URL = "http://search.sep.gob.mx/solr/repuce1617Core/select";
		//var URL = "http://search.sep.gob.mx/solr/repuceCore/select";
//		var URL = "http://10.75.11.80:8083/solr/repuce1617Core/select";
//		var URL = "http://localhost:8083/solr/repuceCore/select";

		var C_GRAFICA=new Array(
				{name:'[Seleccione]',	id:'0',	tpo:'0'},
				{name:'Column 3D',	id:'FCF_Column3D.swf',	tpo:'1'},
				{name:'Column 2D',	id:'FCF_Column2D.swf',	tpo:'1'},
				{name:'Line 2D',	id:'FCF_Line.swf',		tpo:'1'},
				{name:'Area 2D',	id:'FCF_Area2D.swf',	tpo:'1'},
				{name:'Bar 2D',		id:'FCF_Bar2D.swf',		tpo:'1'},
				{name:'Pie 2D',		id:'FCF_Pie2D.swf',		tpo:'1'},
				{name:'Pie 3D',		id:'FCF_Pie3D.swf',		tpo:'1'},
				{name:'Doughnut 2D',id:'FCF_Doughnut2D.swf',tpo:'1'},
				{name:'Column 2D',	id:'FCF_MSColumn2D.swf',tpo:'2'},
				{name:'Column 3D',	id:'FCF_MSColumn3D.swf',tpo:'2'},
				{name:'Line 2D',	id:'FCF_MSLine.swf',	tpo:'2'},
				{name:'Bar 2D',		id:'FCF_MSBar2D.swf',	tpo:'2'},
				{name:'Area 2D',	id:'FCF_MSArea2D.swf',	tpo:'2'},
				{name:'Column 3D',	id:'FCF_StackedColumn3D.swf',	tpo:'3'},
				{name:'Column 2D',	id:'FCF_StackedColumn2D.swf',	tpo:'3'},
				{name:'Bar 2D',		id:'FCF_StackedBar2D.swf',	tpo:'3'},
				{name:'Area 2D',	id:'FCF_StackedArea2D.swf',	tpo:'3'},
				{name:'Column 2D + Line - Dual Y Axis',	id:'FCF_MSColumn2DLineDY.swf',	tpo:'4'},
				{name:'Column 3D + Line - Dual Y Axis',	id:'FCF_MSColumn3DLineDY.swf',	tpo:'4'});
		
		var C_TPO_GRAFICA=new Array(
				{name:"[Seleccione]",	id:"0"},
	            {name:"Serie simple",	id:"1"},
	            {name:"Multi-serie",	id:"2"},
	            {name:"Apiladas",		id:"3"}
	            //{name:"Combinadas",		id:"4"}
	            );

		var C_COLOR= new Array('#FFEE45','#BCBF03','#16364F','#00A4D4','#D8D2FF','#003e3c','#0bb993',
								  '#91d89f','#ffe6a9','#d61620','#540548','#693366','#825781','#93a34b',
								  '#91bd00','#433547','#6d868a','#dec699','#dba539','#9c3834');

		var IDX_ENTIDAD= function(nomEntidad){
			var idxEntidad=-1;
			switch(nomEntidad){
			case 'AGUASCALIENTES':
				idxEntidad = 0;
			break;
			case 'BAJA CALIFORNIA':
				idxEntidad = 1;
			break;
			case 'BAJA CALIFORNIA SUR':
				idxEntidad = 2;
			break;
			case 'CAMPECHE':
				idxEntidad = 3;
			break;
			case 'COAHUILA DE ZARAGOZA':
				idxEntidad = 4;
			break;
			case 'COLIMA':
				idxEntidad = 5;
			break;
			case 'CHIAPAS':
				idxEntidad = 6;
			break;
			case 'CHIHUAHUA':
				idxEntidad = 7;
			break;
			case 'DISTRITO FEDERAL':
				idxEntidad = 8;
			break;
			case 'DURANGO':
				idxEntidad = 9;
			break;
			case 'GUANAJUATO':
				idxEntidad = 10;
			break;
			case 'GUERRERO':
				idxEntidad = 11;
			break;
			case 'HIDALGO':
				idxEntidad = 12;
			break;
			case 'JALISCO':
				idxEntidad = 13;
			break;
			case 'M\u00C9XICO':
				idxEntidad = 14;
			break;
			case 'MICHOAC\u00C1N DE OCAMPO':
				idxEntidad = 15;
			break;
			case 'MORELOS':
				idxEntidad = 16;
			break;
			case 'NAYARIT':
				idxEntidad = 17;
			break;
			case 'NUEVO LE\u00D3N':
				idxEntidad = 18;
			break;
			case 'OAXACA':
				idxEntidad = 19;
			break;
			case 'PUEBLA':
				idxEntidad = 20;
			break;
			case 'QUER\u00C9TARO':
				idxEntidad = 21;
			break;
			case 'QUINTANA ROO':
				idxEntidad = 22;
			break;
			case 'SAN LUIS POTOS\u00CD':
				idxEntidad = 23;
			break;
			case 'SINALOA':
				idxEntidad = 24;
			break;
			case 'SONORA':
				idxEntidad = 25;
			break;
			case 'TABASCO':
				idxEntidad = 26;
			break;
			case 'TAMAULIPAS':
				idxEntidad = 27;
			break;
			case 'TLAXCALA':
				idxEntidad = 28;
			break;
			case 'VERACRUZ DE IGNACIO DE LA LLAVE':
				idxEntidad = 29;
			break;
			case 'YUCAT\u00C1N':
				idxEntidad = 30;
			break;
			case 'ZACATECAS':
				idxEntidad = 31;
			break;
				
			}
			return idxEntidad;
		};
		
   return{
	   C_GRAFICA:C_GRAFICA,
	   C_TPO_GRAFICA:C_TPO_GRAFICA,
	   C_COLOR:C_COLOR,
	   URL:URL,
	   IDX_ENTIDAD:IDX_ENTIDAD
   };
   
});
