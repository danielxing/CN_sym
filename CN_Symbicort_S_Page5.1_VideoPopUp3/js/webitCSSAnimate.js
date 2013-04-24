(function ()
    {
        var // Useragent RegExp
        rwebkit = /(webkit)[ \/]([\w.]+)/,
        ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        rmsie = /(msie) ([\w.]+)/,
        rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

       var renders=
       {
            "webkit":
               {
                   "Reg":/(webkit)[ \/]([\w.]+)/,
                   "uc_label":"Webkit",
                   "lc_label":"-webkit-",
                   "TRANSITION_END":"webkitTransitionEnd",
                   "ANIMATION_END" : "webkitAnimationEnd"
                },
            "opera":
               {
                   "Reg":/(opera)(?:.*version)?[ \/]([\w.]+)/,
                   "uc_label":"O",
                   "lc_label":"-o-",
                   "TRANSITION_END":"oTransitionEnd",
                   "ANIMATION_END" : "oAnimationEnd"
                },
            "msie":
               {
                   "Reg":/(msie) ([\w.]+)/,
                   "uc_label":"",
                   "lc_label":"",
                   "TRANSITION_END":"MSTransitionEnd",
                   "ANIMATION_END" : "MSAnimationEnd"
                },
            "mozilla":
               {
                   "Reg":/(mozilla)(?:.*? rv:([\w.]+))?/,
                   "uc_label":"Moz",
                   "lc_label":"-moz-",
                   "TRANSITION_END":"transitionend",
                   "ANIMATION_END" : "animationend"
                }
            
       }
       
    window.getUserAgent = function() 
        {
            Agent = navigator.userAgent.toLowerCase();
            //ua.indexOf("compatible") < 0 
            var match=[],temp=null;
            
            for (var p in renders)
            {  
             
               temp=renders[p].Reg.exec( Agent );
               if(temp)
               { 
                 match=temp;
                 break;
               }
            }
            
            return { browser: match[1] || "", version: match[2] || "0" };
        };
        
        
       var render =renders[getUserAgent().browser];
       
     
   
			
			var PropToCss = function( prop )
			{    
			     if(prop.indexOf( render.uc_label ) == -1)return prop; 
			     var  value = prop.replace(render.uc_label,""),
				       value =value.charAt( 0 ).toLowerCase() + value.substr( 1 );
				 return render.lc_label+value;
			}
			var CssToProp = function( prop )
			{   
			     if(prop.indexOf( render.lc_label ) == -1)return prop; 
			     var  value = prop.replace(render.lc_label,""),
				       value =value.charAt( 0 ).toUpperCase() + value.substr( 1 );
				 return render.uc_label+value;
			}
			
       HTMLElement.prototype.cssPropExists = function( prop )
        {  
           var htmlElements =this;
           var uc_prop = render.uc_label + prop.charAt( 0 ).toUpperCase() + prop.substr( 1 ),
               lc_prop = render.lc_label + prop.charAt( 0 ).toLowerCase() + prop.substr( 1 ),
               props = ( prop  + " " + uc_prop + " " + lc_prop).split( " " );
			
           for ( var v in props )
           {
              
                if (htmlElements.style[ props[ v ] ] !== undefined ) 
                {
					
                    return  props[ v ];
					
                    break;
                }
           }
           return  null;
       }
              
        HTMLElement.prototype.$=function(label,eachOperation)
        {     var htmlElements = this.querySelectorAll(label);
            for(var i=htmlElements.length-1;i>=0; i--)
            {
                
                eachOperation(htmlElements[i],i)
            }
            return this;
        }
    
       HTMLElement.prototype.unanimate=function(preventTrigger,delayFinish)
           {
               var htmlElement = this;
               
               if(htmlElement.endTransition)
                     {
                        htmlElement.style[render.uc_label+"TransitionProperty"] = "";
                        htmlElement.style[render.uc_label+"TransitionDuration"] = "";
                        htmlElement.style[render.uc_label+"TransitionDelay"] = "";
                        htmlElement.style[render.uc_label+"TransitionTimingFunction"] = "";
                        htmlElement.removeEventListener(render.TRANSITION_END,htmlElement.endTransition);
                       if(delayFinish){htmlElement.endTransition()}
                     
                     }
             
               return htmlElement;
            }
            
        HTMLElement.prototype.animate = function (configInfo,delayTime,endOperation)
            {

                var htmlElement = this;
                var prop = null,
                    duration = null,
                    delay = null,
                    style = null;
                var keyArray = null;
                var checkList = configInfo;
                
                function setTransitionProperty()
                {
                    prop = Array(),
                    duration = Array(),
                    delay = Array(),
                    style = Array();
                    for(var c in checkList)
                    {    
                            keyArray = checkList[c];
                            delete checkList[c];
                            c=htmlElement.cssPropExists(c)
						
                            checkList[c]=keyArray;
				
                            prop.push(PropToCss(c));
                            delay.push((delayTime || 0) + "ms");
                            style.push(keyArray[1] || "ease-in-out");
                            duration.push((keyArray[2] || 0) + "ms");
                    
                    }
                  
                    htmlElement.style[render.uc_label+"TransitionProperty"] = prop.join(',');
                    htmlElement.style[render.uc_label+"TransitionDuration"] = duration.join(',');
                    htmlElement.style[render.uc_label+"TransitionDelay"] = delay.join(',');
                    htmlElement.style[render.uc_label+"TransitionTimingFunction"] = style.join(',');
                }
            
                  setTransitionProperty();
                  window.setTimeout(function ()
                    {   
                         var value = null;
                        
                            for(var param in checkList)
                            {
                             
                                   value = checkList[param][0];
                                    
                                   if(typeof(value) != "object")
                                       {
                                       
                                           htmlElement.style[param] = value;
                                       }
                                   else
                                       {
                                           htmlElement.form(param,value);
                                    
                                       }

                             } 

                         if (htmlElement.style.display == "none")
                                    {
                                        htmlElement.style.display = "block";
                                    }
                     },0);
                  
                    if(htmlElement.endTransition)htmlElement.removeEventListener(render.TRANSITION_END,htmlElement.endTransition);
                    
                    this.endTransition=function (event)
                       {            
                            event.stopPropagation();
						
                            delete checkList[CssToProp(event.propertyName)];
                            setTransitionProperty();
                     
                                if(prop.join(',') == "")
                            {
                                checkList = prop = duration = delay = style = keyArray = null;
                                htmlElement.removeEventListener(render.TRANSITION_END,this.endTransition);
                                delete htmlElement.endTransition;
                                
                                if (typeof(endOperation) == "function")
                                {
                                    endOperation(htmlElement);
                                                    
                                }
                            }
                       }
                        
                   htmlElement.addEventListener(render.TRANSITION_END,htmlElement.endTransition);
                   return this;
            }
 
 
        HTMLElement.prototype.css=function(cssList)
           {    var htmlElement = this;
            
                if(typeof(cssList) == "object")
                            {var css=cssList;
                             var value=null;
                                   for(var p in css)
                                {  
                                       value=css[p];
                                       p=htmlElement.cssPropExists(p);
                                      
                                   if(typeof(value)!= "object")
                                    {
                                       htmlElement.style[p] = value;
                                    }
                                   else
                                    { 
                                       htmlElement.form(p,value);
                                    }
        
                                 } 
                            }
                return htmlElement;
            
            }
         HTMLElement.prototype.form=function(prop,keyList)
         {     
               var htmlElement = this;
           
               var Trans=htmlElement.style[prop];
               var cssValue=null;
               var search=null;
                if(typeof(keyList) == "object")
                {   var list=keyList;
                       for(var p in list)
                    {  
                       //search=null; 
                       if(list[p]){cssValue= p+"("+list[p]+")"; }
                       if(Trans!="")
                       {
                           search = Trans.match( new RegExp(p+"\\(([^\\)]*)\\)?") );
                       }
                      
                       if(search)
                       {
                           
                           Trans=Trans.replace(search[0],cssValue);
                       }
                       else 
                       {
                           if(cssValue!=""){
                        
                               Trans=cssValue +" "+Trans;
                           }
                        
                       }
                    
                     }

                       htmlElement.style[prop]=Trans;
                       list=null,search=null;
                       cssValue=null;
                }
                return htmlElement;
    
              // cssValue&&htmlElement.style.webkitTransform=Trans.replace(cssValue[0],key+"("+value+")");  position nochange
              // return value ? value[1] : defaultValue; 
          }
        
        HTMLElement.prototype.fade= function (duration, delay,size,opacity,style,endOperation)
        
            {  
               var Xer=["center","left","right"],Yer=["center","top","bottom"];
               var i=(style||0)%3, j=((style||0)-i)/3;
               this.style[render.uc_label+"TransformOrigin"]=Xer[j]+" "+Yer[i];
               Xer=Yer=i=j=null;
               this.animate({"opacity":[opacity,"ease-out",duration],"transform":[{"scale":size },"ease-in-out",duration] },delay,function(Dom){Dom.style[render.uc_label+"TransformOrigin"]="";endOperation&&endOperation(Dom);});
             
            };
            
        HTMLElement.prototype.show = function (duration, delay,endOperation)
            {
                this.animate({"opacity":[1,"ease-out",duration]},delay,endOperation);
            };
        HTMLElement.prototype.hide = function (duration, delay, endOperation)
            {
                this.animate({"opacity":[0,"ease-out",duration]},delay,endOperation);
                        
            };
            
         
       HTMLElement.prototype.move = function (duration, delay,left,top, endOperation)
            {
                this.animate({"left":[left+"px","ease-in",duration],"top":[top+"px","ease-in",duration]},delay,endOperation);
           
            };
       HTMLElement.prototype.shift=function(duration,delay,left,top, endOperation)
       {
           
            this.animate({"transform":[{"translate3d":left+"px,"+top+"px, "+" 0px"},"ease-in",duration]},delay,endOperation);
         
       }

        HTMLElement.prototype.extrude = function (type, parameters, duration, delay,endOperation)
           {
            
                switch (type)
                {

                    case "horizontal-reversely":
                    {

                     
                        this.animate({"left":[this.offsetLeft+parameters+"px","ease-in-out",duration],"width":[this.offsetWidth -parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }

                    case "horizontal":
                    {

                       
                        this.animate({"width":[this.offsetWidth -parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }
    
                       case "horizontal-middle":
                    {

                        this.animate({"background-position":[-parameters/2+"px 0px","ease-in-out",duration],"left":[this.offsetLeft+parameters/2+"px","ease-in-out",duration],"width":[this.offsetWidth -parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }

                    case "vertical-reversely":
                    {

                        this.animate({"top":[this.offsetTop+parameters+"px","ease-in-out",duration],"height":[this.offsetHeight-parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }

                    case "vertical":
                    {
                        this.animate({"height":[this.offsetHeight-parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }
                    
                    case "vertical-middle":
                    {
                        this.animate({"background-position":["0px "-parameters/2+"px","ease-in-out",duration],"top":[this.offsetTop+parameters/2+"px","ease-in-out",duration],"height":[this.offsetHeight-parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }
                    default:
                    {
                        break;
                    }

                }
            
            
            
            
            
            }
        HTMLElement.prototype.compress = function (direction, parameters, duration, delay,endOperation)
            {  //var styleInfo=null;
                switch (direction)
                {

                    case "horizontal-reversely":
                    {

                     
                        this.animate({"left":[this.offsetLeft+parameters+"px","ease-in-out",duration],"width":[this.offsetWidth -parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }

                    case "horizontal":
                    {

                       
                        this.animate({"width":[this.offsetWidth -parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }
    
                       case "horizontal-middle":
                    {

                        this.animate({"background-position":[-parameters/2+"px 0px","ease-in-out",duration],"left":[this.offsetLeft+parameters/2+"px","ease-in-out",duration],"width":[this.offsetWidth -parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }

                    case "vertical-reversely":
                    {

                        this.animate({"top":[this.offsetTop+parameters+"px","ease-in-out",duration],"height":[this.offsetHeight-parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }

                    case "vertical":
                    {
                        this.animate({"height":[this.offsetHeight-parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }
                    
                    case "vertical-middle":
                    {
                        this.animate({"background-position":["0px "+"px","ease-in-out",duration],"top":[this.offsetTop+parameters/2+"px","ease-in-out",duration],"height":[this.offsetHeight-parameters+"px","ease-in-out",duration]},delay,endOperation);
                        break;
                    }
                    default:
                    {
                        break;
                    }

                }

            };
            
        HTMLElement.prototype.setStatus=function(Model)
          {
              Model.link(this);
           
           
           }
           
        window.StatusModel = function (statusInfo)
            {      
                   var HTMLelement=null;
                  
                   var comix=function (currentStatus,comStatus,valueless)
                                {
                                   
                                               for(var D in  currentStatus)
                                           {  
                                              var newStatus=comStatus[D]||{};
                                             
                                              var css=currentStatus[D]
                                              if(!valueless)
                                              {
                                                       for(var p in  css)
                                                   {
                                                       newStatus[p]=css[p];

                                                   }
                                              }
                                              else
                                              {
                                                       for(var p in  css)
                                                   {
                                                       newStatus[p]="";

                                                   }

                                              }
                                              comStatus[D]=newStatus;
                                           }
                                           return comStatus
                                };
                                
                    this.link = function (target)
                    {

                       HTMLelement=target;

                       HTMLelement.turnTo=function(Sname)
                       
                       {
                           
                           if(Sname=="rollback")
                           {
                                  var  Doms=statusInfo[Sname];
                                  for(var D in  Doms )
                                       {  
                                          var css=Doms[D];
                                          
                                        
                                          HTMLelement.querySelectorAll(D)[0].css(css);
                                       }
                                       
                                    delete  statusInfo[Sname]
                               return;   
                           }
                           if(Sname in statusInfo)
                           {   
                            
                               
                                   var  Doms=statusInfo[Sname];
                                   var  action=Doms;
                                    if( "rollback" in statusInfo)
                                      {
                                          action=comix(Doms,comix(statusInfo["rollback"],{}));
                                      }
                                          statusInfo["rollback"]=comix(statusInfo["base"],comix(Doms,{},true))
                                      
                                    
                                       for(var D in  action )
                                       {  
                                          var css=action[D];
                                        
                                          HTMLelement.querySelectorAll(D)[0].css(css);
                                       }
                
                            }
  
                       };
                             HTMLelement.turnTo("base");

                    };
                    this.dispose= function ()
                    {
                    
                
                        HTMLelement=null;
                        statusInfo=null;
                        var Extend=this;
                        for (var prop in Extend)
                                {
                            delete Extend[prop];
                                }
                        Extend=null;
                        
    
                    }

            };

    })();