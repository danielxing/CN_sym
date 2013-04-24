SystemBridge.requestCurrentSlideInfo('navSlideInfoReady');

function navSlideInfoReady(slideInfo)
{
    var FOOTER_VERTICAL_SHIFT = -32;
    
    var LEFT_NAV_FRAME = {x:0,y:72,width:58,height:610};
    var PRE_FOOTER_FRAME = {x:0,y:627,width:1024,height:55};
    var FOOTER_FRAME = {x:0,y:682,width:1024,height:86};
    
    function hideLeftNav()
    {
        setFrameAdapter("leftNavView",{
            x:LEFT_NAV_FRAME.width*-1,
            y:LEFT_NAV_FRAME.y,
            width:LEFT_NAV_FRAME.width,
            height:LEFT_NAV_FRAME.height
        });
    }
    
    
	if (slideInfo.Title == "Home")
    {
        hideLeftNav();
        
                
        setFrameAdapter("preFooterView",{
                        x:PRE_FOOTER_FRAME.x,
                        y:PRE_FOOTER_FRAME.y+FOOTER_VERTICAL_SHIFT,
                        width:PRE_FOOTER_FRAME.width,
                        height:PRE_FOOTER_FRAME.height
        });
        
        setFrameAdapter("ToolsBackground",{
                        x:0,
                        y:0,
                        width:1024,
                        height:1+FOOTER_FRAME.y+FOOTER_VERTICAL_SHIFT
        });
        
        SystemBridge.setViewProperties([
            {"name":"PartialISIButton","properties":{"hidden":true}},
            {"name":"FullISIButton","properties":{"hidden":false}}
        ]);
        
    }
	else
    {
        if(slideInfo.Title == "Summary")
        {
            hideLeftNav();
        }
        else
        {
            setFrameAdapter("leftNavView",LEFT_NAV_FRAME);    
        }
        
        ;
        setFrameAdapter("preFooterView",PRE_FOOTER_FRAME);
        setFrameAdapter("ToolsBackground",{
                        x:0,
                        y:0,
                        width:1024,
                        height:1+FOOTER_FRAME.y
        });
        
        SystemBridge.setViewProperties([
            {"name":"PartialISIButton","properties":{"hidden":false}},
            {"name":"FullISIButton","properties":{"hidden":true}}
        ]);
    }
 
    setActiveButton(slideInfo.SectionName, slideInfo.Title);
    
    SystemBridge.setViewProperties([
        {"name":"ToolsBackground","properties":{"hidden":true}},
        {"name":"ToolsButton","properties":{"selected":false}}
    ]);
    SystemBridge.setViewFrame("toolsPopup",163,768,297,250,true);
}

function setActiveButton(section, title)
{
    var isHomeActive = (title == "Home");
    var isChemicalClassActive = (title == "Chemical Class");
    var isInitiationActive = (section == "Initiation");
    var isOvertimeActive = (section == "Over Time");
    var isBleedingActive = (section == "Total Bleed");
    var isDosingActive = (title == "Dosing");
    var isAccessActive = (title == "Formulary Access");
    
    SystemBridge.setViewProperties([
    {
        "name":"HomeButton",
        "properties":{"selected":isHomeActive}
    },
    {
        "name":"ChemicalClassButton",
        "properties":{"selected":isChemicalClassActive}
    },
    {
        "name":"InitiationButton",
        "properties":{"selected":isInitiationActive}
    },
    {
        "name":"OvertimeButton",
        "properties":{"selected":isOvertimeActive}
    },
    {
        "name":"BleedingButton",
        "properties":{"selected":isBleedingActive}
    },
    {
        "name":"DosingButton",
        "properties":{"selected":isDosingActive}
    },
    {
        "name":"AccessButton",
        "properties":{"selected":isAccessActive}
    },
    {
        "name":"FootnotesButton",
        "properties":{"enabled":isFootnotesButtonEnabled(section, title)}
    }]);
    
}

function setFrameAdapter(viewName, newFrame)
{
    SystemBridge.setViewFrame(viewName, newFrame.x, newFrame.y, newFrame.width, newFrame.height, true);
}

function isFootnotesButtonEnabled(section,title)
{
    if( title == "Chemical Class" ||
        title == "Guidelines")
    {
        return true;
    }
    else if(section == "Over Time")
    {
        return (title == "PLATO/Troponin" ||
                title == "Primary Endpoint" ||
                title == "Secondary Endpoint" ||
                title == "Stent Thrombosis");
    }
    
    
    return false;
}