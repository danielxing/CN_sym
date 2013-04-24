SystemBridge.requestCurrentSlideInfo('navSlideInfoReady');

function navSlideInfoReady(slideInfo) {
    var wasHomeButtonActive = slideInfo.Title == "Home";
    
    SystemBridge.setViewProperties([
        {"name":"ToolsBackground","properties":{"hidden":true}},
        {"name":"ToolsButton","properties":{"selected":false}},
        {"name":"HomeButton","properties":{"selected":wasHomeButtonActive}}
    ]);
    SystemBridge.setViewFrame("toolsPopup",163,768,297,250,true);
    this.isDisplayed = false;
}