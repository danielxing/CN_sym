SystemBridge.requestCurrentSlideInfo('navSlideInfoReady');

function navSlideInfoReady(slideInfo)
{   
    if(slideInfo.Title == "Home")
    {
        SystemBridge.setViewFrame("bottomContainerView",0, 682, 1024, 86, true);
        SystemBridge.setViewFrame("preFooterView",0,627,1024,55,true);
        SystemBridge.setViewProperties([{"name":"HomeButton","properties":{"selected":false}}]);
    }
    
    SystemBridge.setViewProperties([{"name":"ToolsBackground","properties":{"hidden":true}}]);
    SystemBridge.setViewFrame("toolsPopup",163,768,297,250,true);
    
    SystemBridge.goToSlide('Clinical Response Information');

}