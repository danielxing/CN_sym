SystemBridge.requestCurrentSlideInfo('navSlideInfoReady');

function navSlideInfoReady(slideInfo)
{
    var htmlPath = null;
    var trackingMessage = null;
    
    if(slideInfo.Title == "Chemical Class")
    {
        htmlPath = "./index-popup-footnotes.html";
    }
    else if(slideInfo.SectionName == "Over Time" && slideInfo.Title == "PLATO/Troponin")
    {
        htmlPath = "./index-popup-footnotes.html";
    }
	else if(slideInfo.SectionName == "Over Time" && slideInfo.Title == "Primary Endpoint")
	{
		htmlPath = "./index-popup-footnotes.html";
	}
	else if(slideInfo.SectionName == "Over Time" && slideInfo.Title == "Secondary Endpoint")
	{
		htmlPath = "./index-popup-footnotes.html";
	}
	else if(slideInfo.SectionName == "Over Time" && slideInfo.Title == "Stent Thrombosis")
	{
		htmlPath = "./index-popup-footnotes.html";
	}
    else if(slideInfo.Title == "Guidelines")
    {
        htmlPath = "./footnotes.html";
    }
    
    if(htmlPath != null)
    {
        SystemBridge.launchPopUp(htmlPath, trackingMessage);
    }
}