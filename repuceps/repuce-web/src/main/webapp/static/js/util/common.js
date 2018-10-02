/*'&aacute;':'\u00e1',
'&eacute;':'\u00e9',
'&iacute;':'\u00ed',
'&oacute;':'\u00f3',
'&uacute;':'\u00fa',
'&Aacute;':'\u00c1',
'&Eacute;':'\u00c9',
'&Iacute;':'\u00cd',
'&Oacute;':'\u00d3',
'&Uacute;':'\u00da',
'&ntilde;':'\u00f1',
'&Ntilde;':'\u00d1',
'&iquest;':'\u00bf'*/
dojo.provide("util.common");
dojo.require("util.constants");
dojo.require("custom.MyDialog");
dojo.require("dojo.data.ItemFileReadStore");

/**
 * @ autor: Horacio Sanchez B.
 * @ mail: hsb12001@gmail.com
 * @ proyecto: replace_var_project
 * @ descripcion: Creacion de objetos  JS
 * @ fecha de creacion:Tue Mar 15 14:16:15 CST 2011
 **/
/*var override ={
		confirmar:function( focusElement, message ){		
			if( dojo.byId( focusElement ) ){
				try{
					dojo.byId( focusElement ).focus();
				}catch(e){}
			}
			if( this._confirm == null ){		
				this._confirm = new custom.MyDialog({
			    	title: "<span class='dialogTitle'>Confirmar</span>",				
			    	id:'dialogConfirm',
			    	refocus: false,
			    	disableCloseButton:true,
			    	draggable:false
				});
				dojo.connect( this._block, "onkeypress", function(evt){ if(evt.charOrCode == dojo.keys.ESCAPE){ dojo.stopEvent(evt); return;} });
			}		

			var messagewait = '<div style="text-align: center;" ><img src="'+ messagesJS.context+'img/warning.gif"/>'+message+'<br><br><button dojoType="dijit.form.Button" onclick="util.common.confirmHide(true);">Si</button><button dojoType="dijit.form.Button" onclick="util.common.confirmHide(false);">No</button></div>';
			this._confirm.setContent("<span class='messageDialog'>"+messagewait+"</span>" );
			
			this._confirm.show();
		}		

};*/
(function(){  
	var common= util.common;  
	common.createField = function ( dojoFields ){
		if( dojoFields == null || dojoFields == '' || dojoFields == undefined ){
			return;
		}
		dojo.forEach( dojoFields[0].fieldForms, function(node){			
			if( dijit.byId( node.name ) ) {
	 				dijit.byId( node.name ).destroy(true);
			}
			switch( node.object_type ){
				case util.constants.DOJO_TYPE.validation:
					var field = new dijit.form.ValidationTextBox({
	    		   		invalidMessage: node.invalidMessage,
	    		   		placeHolder: node.placeHolder,
	    		   		name: node.name,
	    		   		id: node.name,	  
	    		   		jsId: node.name,
	    		   		required: node.required,	    		   		
	    		   		trim: "true",
	    		   		validator: util.common.validator,	    		   		
	    		   		style:util.constants.DEFAULT_STYLE,
	    		   		"class":"textbox"
	    				}, node.name );

					if( node.regExp ){						
						field.set("regExp", node.regExp );
					}
					if( node.readOnly ){						
						field.set("readOnly", node.readOnly );
					}
					if( node.disabled ){						
						field.set("disabled", node.disabled );
					}
					if( node.style ){
						field.set( 'style', node.style );
					}
					if( node.value ){
						field.set( 'value', node.value );
					}
					if( node.uppercase == null || node.uppercase == undefined || node.uppercase == true ){
						field.set( 'uppercase', 'true' );						
					}
					if( node.constraints ){
						field.set( 'maxLength', node.constraints.max );
						field.set( 'constraints', node.constraints );
					}
					
				break;
				case util.constants.DOJO_TYPE.date:
					new dijit.form.DateTextBox({
	    		   		invalidMessage: node.invalidMessage,
	    		   		placeHolder: node.placeHolder,
	    		   		name: node.name,
	    		   		id: node.name,	
	    		   		jsId: node.name,
	    		   		required: node.required,
	    		   		locale: 'en-us',
	    		   		//constraints: node.constraints,	    		   		
	    		   		//datePattern: node.datePattern,
	    		   		trim: "true",
	    		   		style:util.constants.DEFAULT_STYLE,
	    		   		"class":"textbox"
	    		   		//validator: validaCampo
	    			}, node.name );
					if( node.style ){
						field.set( 'style', node.style );
					}					
					
					if( node.value ){
						field.set( 'value', node.value );
					}
				break;				
				
				case util.constants.DOJO_TYPE.textbox:					
					var field = new dijit.form.TextBox({
	    		   		invalidMessage: node.invalidMessage,
	    		   		placeHolder: node.placeHolder,
	    		   		name: node.name,
	    		   		id: node.name,	
	    		   		jsId: node.name,
	    		   		readOnly:node.readOnly,
	    		   		trim: "true",	    		   		
	    		   		style:util.constants.DEFAULT_STYLE,
	    		   		"class":"textbox"
	    		   		//validator: validaCampo
	    				}, node.name );
					if( node.style ){
						field.set( 'style', node.style );
					}					
					if( node.value ){
						field.set( 'value', node.value );
					}
				break;
				case util.constants.DOJO_TYPE.hidden:					
					var field = new dijit.form.TextBox({
	    		   		invalidMessage: node.invalidMessage,
	    		   		placeHolder: node.placeHolder,
	    		   		name: node.name,
	    		   		id: node.name,	
	    		   		type:'hidden',
	    		   		jsId: node.name,
	    		   		readOnly:node.readOnly,
	    		   		trim: "true",	    		   		
	    		   		style:util.constants.DEFAULT_STYLE,
	    		   		"class":"textbox"
	    				}, node.name );
					if( node.style ){
						field.set( 'style', node.style );
					}	
					if( node.value ){
						field.set( 'value', node.value );
					}
					
				break;
				case util.constants.DOJO_TYPE.checkbox:					
					var field = new dijit.form.CheckBox({	    		   		
	    		   		name: node.name,	    		   			   		
	    		   		checked: node.checked
	    				}, node.name );	
					if( node.funcion != undefined && node.event != undefined ){
						dojo.connect( field, node.event, node.funcion );
					}
					
				break;	
				case util.constants.DOJO_TYPE.radio:					
					var field = new dijit.form.RadioButton({	    		   		
	    		   		name: node.name,	
	    		   		id: node.id,
	    		   		checked: node.checked
	    				}, node.id );	
					if( node.event != undefined && node.funcion != undefined ){
						dojo.connect( field, node.event, node.funcion );
					}
					
				break;				
				case util.constants.DOJO_TYPE.select:					
					var field = new dijit.form.FilteringSelect ({
				        autoComplete: node.autoComplete,
				        name: node.name,
				        id: node.property,
				        invalidMessage: node.invalidMessage,
				        store: node.store,
				        labelType: "html",
				        searchAttr: node.description,
				        value:  node.value,
				        style:'width:210px;font-family: Arial;font-size:0.7em;',
				        onChange: node.selectFunction
				    }, node.property );
					if( node.event != undefined && node.funcion != undefined ){
						dojo.connect( field, node.event, node.funcion );
					}
					
				break;				
			}	
	    } );
	};	
	common._dialog = null;
	common._block = null;
	common._confirm = null;
	common.response = null;	
	common.alert = function ( keyMessage ){ //}{ }focusElement, message ){
		if( dojo.byId( keyMessage.focus ) ){
			try{
				dojo.byId( keyMessage.focus ).focus();
			}catch(e){}
		}
		this._post = null;
		this._post = keyMessage.post;
		if( this._dialog == null ){		
			this._dialog = new custom.MyDialog({
		    	title: "<span class='dialogTitle'>Mensaje</span>",				
		    	id:'dialogMessage',
		    	draggable:true,
		    	onCancel: this.hideAlert,
		    	refocus:true,
		    	refocus: true
			});			
		}		
		if( keyMessage.message == undefined )
			keyMessage.message = "Ocurrio un error.";
		//dojo.connet( this._dialog, 'onCancel', util.common.hideAlert );
		this._dialog.setContent("<table align='center'><tr><td align='center'><span class='messageDialog'>"+keyMessage.message+"</td></tr><tr><td align='center'><button dojoType='dijit.form.Button' onclick='util.common.hideAlert( );'>Aceptar</button></td></tr></table>");			
		this._dialog.show();
		dojo.connect(window, "onresize", this._dialog, this._dialog.layout); 
	};		
common.hideAlert = function( ){			
		if( this._dialog ){
			if( this._post ){
				dojo.hitch( this._post, this._post._function )();
			}
			this._dialog.hide();
			
		}
	};
	common.confirm = function( focusElement, message ){		//No funcion hace falta bloquear los eventos
		common.response = null;
		if( dojo.byId( focusElement ) ){
			try{
				dojo.byId( focusElement ).focus();
			}catch(e){}
		}
		if( this._confirm == null ){		
			this._confirm = new custom.MyDialog({
		    	title: "<span class='dialogTitle'>Confirmar</span>",				
		    	id:'dialogConfirm',
		    	refocus: false,
		    	disableCloseButton:true,
		    	draggable:false
			});
			dojo.connect( this._block, "onkeypress", function(evt){ if(evt.charOrCode == dojo.keys.ESCAPE){ dojo.stopEvent(evt); return;} });
		}		

		var messagewait = '<div style="text-align: center;" ><img src="'+ messagesJS.context+'img/warning.gif"/>'+message+'<br><br><button dojoType="dijit.form.Button" onclick="util.common.confirmHide(true);">Si</button><button dojoType="dijit.form.Button" onclick="util.common.confirmHide(false);">No</button></div>';
		this._confirm.setContent("<span class='messageDialog'>"+messagewait+"</span>" );		
		this._confirm.show();
		window.setTimeout("util.common.confirmHide( null )",1000); 
	};	
	
	common.confirmHide = function( data ){
		
		if( data == null ){
			window.setTimeout("util.common.confirmHide( null )",1000); 
		}		
		
		this._confirm.hide();
		
	}; 
	common.block = function( focusElement, message ){		
			if( dojo.byId( focusElement ) ){
				try{
					dojo.byId( focusElement ).focus();
				}catch(e){}
			}
			if( this._block == null ){		
				this._block = new custom.MyDialog({
			    	title: "<span class='dialogTitle'>Mensaje</span>",				
			    	id:'dialogBlock',
			    	refocus: false,
			    	disableCloseButton:true,
			    	draggable:false
				});
				dojo.connect( this._block, "onkeypress", function(evt){ if(evt.charOrCode == dojo.keys.ESCAPE){ dojo.stopEvent(evt); return;} });
			}		
	
			var messagewait = '<div style="text-align: center;" >'+message+'<br><img src="'+ messagesJS.context+'img/loading2.gif" alt="Espere por favor..."/></div>';
			this._block.setContent("<span class='messageDialog'>"+messagewait+"</span>" );
			
			this._block.show();
		};
	common.unblock = function(){
			if( common._block == null )
				return;
			common._block.hide();
		};
		
	common.getDocumentFrame = function( frameName ){
			if( dojo.isIE ){			
				return document.frames[ frameName ].document;//.location.href=action;  
	    	}else{
	    		return dojo.byId( frameName ).contentDocument;//.location.href=action;
	    		            		
	    	}		
		};
	common.getWindowFrame = function( frameName ){
			if( dojo.isIE ){			
				return document.frames[ frameName ];//.document;//.location.href=action;  
	    	}else{
	    		return dojo.byId( frameName ).contentWindow.window;//.contentDocument;//.location.href=action;
	    		            		
	    	}	
		};
	
	common.debug = function( str ){
			window.status = "DEBUG: " + str;		
		};
		
	common.validator = function ( value, constraints ){
		var isEmpty = this._isEmpty(value);
		var _isValid = (new RegExp("^(" + this.regExpGen(constraints) + ")"+(this.required?"":"?")+"$")).test(value) && 
								(!this.required || !this._isEmpty(value)) && 
								(this._isEmpty(value) || this.parse( value, constraints ) !== null );
		
		var isMin = (typeof constraints.min != "undefined"); 
		var isMax = (typeof constraints.max != "undefined");
		var isValid = true;
		if(isMin || isMax){			
			isValid =(!isMin || this.compare(value.length,constraints.min) >= 0) && (!isMax || this.compare(value.length,constraints.max) <= 0)
		}
		
		
		if( !_isValid && !isValid && !isEmpty ){
			this.invalidMessage = constraints.invalidMessage + "<br>"+ constraints.rangeMessage;
			return false;	
		}			
		if( !_isValid ){
			this.invalidMessage = constraints.invalidMessage;				
			return false;	
		}
		if( !isValid ){
			this.invalidMessage = constraints.rangeMessage;
			dojo.addClass( this.domNode, "dijitTextBoxError dijitValidationTextBoxError dijitError dijitTextBoxErrorHover dijitValidationTextBoxErrorHover dijitErrorHover dijitTextBoxFocused dijitValidationTextBoxFocused dijitFocused dijitTextBoxErrorHoverFocused dijitValidationTextBoxErrorHoverFocused dijitErrorHoverFocused" );
			dijit.showTooltip( constraints.rangeMessage, this.domNode );
			return false;	
		}
		

		dojo.removeClass(this.domNode,"dijitTextBoxError dijitValidationTextBoxError dijitError dijitTextBoxErrorHover dijitValidationTextBoxErrorHover dijitErrorHover dijitTextBoxFocused dijitValidationTextBoxFocused dijitFocused dijitTextBoxErrorHoverFocused dijitValidationTextBoxErrorHoverFocused dijitErrorHoverFocused");
		dijit.hideTooltip( this.domNode );			
		return true;
	};
		
})
();




