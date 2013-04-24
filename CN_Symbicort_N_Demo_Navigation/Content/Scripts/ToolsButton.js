SystemBridge.requestCurrentSlideInfo('navSlideInfoReady');

function navSlideInfoReady(slideInfo) {
    
    (function togglePopup(){
 
        var offset = 0;
        var wasHomeButtonActive = false;
     
        if(slideInfo.Title == "Home")
        {
            offset = -35;
            wasHomeButtonActive = true;
        }
     
        if(!this.isDisplayed) {
            SystemBridge.setViewProperties([
                {"name":"ToolsBackground","properties":{"hidden":false}},
                {"name":"ToolsButton","properties":{"selected":true}},
                {"name":"HomeButton","properties":{"selected":false}}
            ]);
            SystemBridge.setViewFrame("toolsPopup",163,475+offset,297,250,true);
            this.isDisplayed = true;
        } else {
            SystemBridge.setViewProperties([
                {"name":"ToolsBackground","properties":{"hidden":true}},
                {"name":"ToolsButton","properties":{"selected":false}},
                {"name":"HomeButton","properties":{"selected":wasHomeButtonActive}}
            ]);
            SystemBridge.setViewFrame("toolsPopup",163,768,297,250,true);
            this.isDisplayed = false;
        }
 
    })();

}