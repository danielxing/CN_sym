(function ()
    {  
	   HTMLElement.prototype.addProp = function (key,value,str,compart)
            {  
			    var HTMLelement=this;
			    if (!HTMLelement.getAttribute(key)) 
				{
                     HTMLelement.setAttribute(key,value);
                }
			    else if (!this.hasProp(key, value, compart)) 
				{
                     HTMLelement.setAttribute(key, HTMLelement.getAttribute(key) + str + value);
                }
            };
			
		HTMLElement.prototype.hasProp = function (key,value,compart)
            {  
			    var HTMLelement=this;
			    if (HTMLelement.getAttribute(key)) 
				{
                     return HTMLelement.getAttribute(key).match(new RegExp('('+compart+'|^)' + value + '('+compart+'|$)'));
                }
			    else
				{
                     return false;
                }
            };
		
		HTMLElement.prototype.removeProp = function (key,value,compart)
            {  
			    var HTMLelement=this;
			    var cleaned = new RegExp('('+compart+'|^)' + value + '('+compart+'|$)');
            
				HTMLelement.setAttribute(key, HTMLelement.getAttribute(key).replace(cleaned, '$1'));
            };
			
 	    HTMLElement.prototype.swapProp = function (key,value1,value2,compart)
            {  
			    var HTMLelement=this;
			  
                if (this.hasProp(key, value1, compart))
			    {
					if(this.hasProp(key, value2, compart))
					{
						this.removeProp(key, value2, compart);
					}
					HTMLelement.setAttribute(key, HTMLelement.getAttribute(key).replace(value1, value2));
                }
				
            };
 
        HTMLElement.prototype.hasClass = function (value)
            {  
                this.hasProp("Class", value, '\\s');
            };
			
		HTMLElement.prototype.addClass = function (value)
            {  
                this.addProp("Class", value, ' ', '\\s');
            };
			
		HTMLElement.prototype.removeClass = function (value)
            {  
                this.removeProp("Class", value, '\\s');
            };
			
		HTMLElement.prototype.swapClass = function (value1,value2)
            {  
                this.swapProp("Class", value1, value2, '\\s');
            };
			
		HTMLElement.prototype.toggleClass = function (value)
            {  
                 if (this.hasProp("Class", value, '\\s'))
				 {
                     this.removeProp("Class", value, '\\s');
                 }
                 else 
				 {
                     this.addProp("Class", value, ' ', '\\s');
                 }
            };
   
    })();