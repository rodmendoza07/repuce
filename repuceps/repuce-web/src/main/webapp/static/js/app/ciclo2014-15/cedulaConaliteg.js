define([ "dijit/layout/ContentPane","dijit/registry","dojo/_base/array","app/util/jsUtils",
         "dojox/grid/DataGrid","dojo/data/ItemFileWriteStore", 
         "dojo/store/Memory", "dojo/dom", "dijit/form/ValidationTextBox","dijit/form/FilteringSelect",
         "dojo/_base/json","dojo/on","app/util/constants","dijit/form/Button", "dijit/form/Form",
         "dojo/_base/xhr","dojo/_base/lang","dojox/widget/Standby","app/ciclo2014-15/reuniones", 
         "app/util/constants","dijit/Dialog","dojo/_base/lang","dijit/form/RadioButton", "app/util/jsUtils","dijit/form/DateTextBox",
			"dojox/widget/Calendar","dijit/TooltipDialog","dijit/popup"], 
function( ContentPane,registry,array,utils,DataGrid,ItemFileWriteStore,
		Memory, dom,ValidationTextBox,FilteringSelect,json,on,constants,Button,Form,xhr,
		lang,Standby,reuniones, constants,Dialog,lang,RadioButton, jsUtils, DateTextBox, 
		Calendar, TooltipDialog,popup){

   //savePrimeraAsamblea
   
   function init(cct, infCctPar){
	   
	   funCaptura( null );
	   
    }

   
   function funCaptura ( itemToEdit ){
   		var edit=false;
	    if(!itemToEdit){
		   itemToEdit={idEscrutador: 0,paterno:'',materno:'', nombre:''};
	    }else{
		   edit=true;
	    }
	   
	    //----------------------------Diseño de la ventana
	   	var title = 'C\u00e9dula CONALITEG';
	   	new Dialog({id:'dDetail', title:title, content :'<div id="dcDetail"/>'}).show();
	   	registry.byId('dDetail').on('hide',function(){
			   												registry.byId('dDetail').destroyRecursive(false);
	   													});
	   	registry.byId('dDetail')._setStyleAttr('left:20px !important;'); 
	    registry.byId('dDetail')._setStyleAttr('top:20px !important;');
	    utils.createTag('div','prCnt','dcDetail');    
	    
	    dom.byId('prCnt').innerHTML='<table border="0" align="left" width= "750px" >'+
		   '<tr><th align="left">'+ 
		   '<div id="thenode">Cat&aacute;logo.</div>' +
		   '	<p> <b>1.	&iquest;En qu&eacute; fecha llegaron a la escuela de sus hijos los libros de texto gratuitos?</p>'+
		   '</th><th>'+
		   '	<input id="pregunta1a"/>'+ 
		   '	<input id="pregunta1b"/><label for="pregunta1b">No Sabe</label>'+ 
		   '</th></tr>'+
		  '<tr><th align="left">'+ 
			'	<p> <b>2.	Consulte en esta p&aacute;gina el cat&aacute;logo correspondiente al nivel educativo de la escuela de sus hijos para saber cu&aacute;les son los libros y materiales destinados para cada grado escolar. &iquest;Se recibieron todos estos libros y materiales?</b></p>'+
			'</th><th>'+
			'	<input id="pregunta2"/>'+ 
		  '</th></tr>'+
		  '<tr><th align="left">'+ 
		   '	<p> <b>3.	&iquest;En qu&eacute; fecha se entregaron los libros a los ni&ntilde;os?</p>'+
		   '</th><th>'+
		   '	<input id="pregunta3"/>'+ 
		   '</th></tr>'+
		   '<tr><th align="left">'+ 
			'	<p> <b>4.	Como habr&aacute; visto en el cat&aacute;logo, hay libros y materiales para los ni&ntilde;os, para los maestros, para el sal&oacute;n y, en el caso de preescolar, tambi&eacute;n para los padres. Los libros y materiales recibidos en su escuela &iquest;alcanzaron para todos sus destinatarios?</p>'+
			'</th><th>'+
			'	<input id="pregunta4"/>'+ 
		  '</th></tr>'+
		  '<tr><th align="left">'+ 
			'	<p> <b>5.	&iquest;Hay en la escuela alumnos invidentes o que tienen baja visi&oacute;n?</p>'+
			'</th><th>'+
			'	<input id="pregunta5"/>'+ 
		  '</th></tr>'+
		  '<tr><th align="left">'+ 
			'	<p> <b>6.	La Conaliteg produce libros en c&oacute;digo Braille para los ni&ntilde;os que no ven y en formato grande para los que tienen baja visi&oacute;n. &iquest;Recibieron estos alumnos sus libros especiales?</p>'+
			'</th><th>'+
			'	<input id="pregunta6"/>'+  
		  '</th></tr>'+
		  '<tr><th align="left">'+ 
			'	<p> <b>7.	&iquest;Los libros se recibieron en buen estado?</p>'+
			'</th><th>'+
			'	<input id="pregunta7"/>'+ 
		  '</th></tr>'+
		  '<tr><th align="left">'+ 
			'	<p> <b>8.	&iquest;Qu&eacute; hacen la mayor&iacute;a de los ni&ntilde;os de la escuela de sus hijos con los libros de texto una vez terminado el ciclo escolar?</p>'+
			'</th><th>'+
			'	<input id="pregunta8"/>'+ 
		  '</th></tr>'+
		  '<tr><th align="left">'+ 
			'	<p> <b>9.	&iquest;Cree usted que si hubiera un programa de reciclaje de libros usados, los ni&ntilde;os de su escuela estar&aacute;n dispuestos a donar sus libros terminando el ciclo escolar?</p>'+
			'</th><th>'+
			'	<input id="pregunta9"/>'+ 
		  '</th></tr>'+
	    '</table>';		    
	    
		var dataSeleccionSINO=[{name:"[Seleccione]",   id:"0"},
			                     {name:"SI",   id:"1"},
			                     {name:"NO",   id:"2"}
			                     ];
		
		var dataSeleccionStore = new Memory({
			data: dataSeleccionSINO
			});


		var dataSeleccion2=[{name:"[Seleccione]",   id:"0"},
		                     {name:"Los conservan",   id:"1"},
		                     {name:"Los tiran",   id:"2"},
		                     {name:"Los reciclan",   id:"3"},
		                     {name:"Otra",   id:"4"}
		                     ];

		var dataSeleccion2Store = new Memory({
			data: dataSeleccion2
			});

		var dataSeleccion3=[{name:"[Seleccione]",   id:"0"},
		                     {name:"Si",   id:"1"},
		                     {name:"La mayoria",   id:"2"},
		                     {name:"Muy pocos",   id:"3"},
		                     {name:"No",   id:"4"}
		                     ];
		
		var dataSeleccion3Store = new Memory({
			data: dataSeleccion3
			});
		
	    var pregunta1a=new DateTextBox({
	    	id:"pregunta1a",
			name : 'pregunta1',
			readOnly : false,			
			datePattern : 'dd/MM/yyyy'
		}, "pregunta1a");
	    	    
	    var pregunta1b= new RadioButton({
	           checked:true,
	           value: "0",
	           name: "pregunta1",
	           id:"pregunta1b"
	       }, "pregunta1b");
	    
	    var pregunta2=new FilteringSelect({
	           store: dataSeleccionStore,
	           required: true	           
	        }, 'pregunta2');
	    
	    var pregunta3=new DateTextBox({
	    	id:"pregunta3",
			name : 'pregunta3',
			required : true,
			readOnly : false,			
			datePattern : 'dd/MM/yyyy'
		}, "pregunta3");
	    
	    var pregunta4=new FilteringSelect({
	           store: dataSeleccionStore,
	           required: true	           
	        }, 'pregunta4');
	    
	    var pregunta5=new FilteringSelect({
	           store: dataSeleccionStore,
	           required: true	           
	        }, 'pregunta5');
	    
	    var pregunta6=new FilteringSelect({
	           store: dataSeleccionStore,
	           required: true	           
	        }, 'pregunta6');
	    
	    var pregunta7=new FilteringSelect({
	           store: dataSeleccionStore,
	           required: true	           
	        }, 'pregunta7');
	    
	    var pregunta8=new FilteringSelect({
	           store: dataSeleccion2Store,
	           required: true	           
	        }, 'pregunta8');
	    
	    var pregunta9=new FilteringSelect({
	           store: dataSeleccion3Store,
	           required: true	           
	        }, 'pregunta9');
	    
	   //------------------------------------
	    utils.createTag('div','prBtnAceptar','dcDetail');
	    
	    var myTooltipDialog = new TooltipDialog({
	        id: 'myTooltipDialog',
	        style: "width: 300px;",
	        content: '<img src="static/img/refresh.png" alt="Smiley face" height="42" width="42">',
	        onMouseLeave: function(){
	            popup.close(myTooltipDialog);
	        }
	    });
	    
	    on(dom.byId('thenode'), 'mouseover', function(){
	        popup.open({
	            popup: myTooltipDialog,
	            around: dom.byId('thenode')
	        });
	    });
	    
	    new Button({
	    				label : " Aceptar " ,
	    				onClick : function() {
	    					var form = registry.byId('dDetail');
	    					if (!form.validate()){  
	    						utils.cstmAlert('Favor de registrar los datos requeridos');
	    						return false;
	    					}	    					
	    				}
	    			},'prBtnAceptar');	   
   }
	// Se manda a actualizar la informacion capturada
	function savePrimeraAsamblea(cct) {
		
		var standby = new Standby({
			target : "dialogCaptiraDG"
		});
		document.body.appendChild(standby.domNode);
		standby.startup();
	
		var form = registry.byId('registraPrimeraReunion');
		
		if ( form.validate() == false){return false;}
		
		if(!_validateConsejo()){return false;}
				


		registry.byId('dialogCaptiraDG').destroyRecursive(false);


	}

	
   return {
		   init:init,
		   savePrimeraAsamblea:savePrimeraAsamblea
	   };
   
});





