SystemBridge.requestCurrentSlideInfo('navSlideInfoReady');

function navSlideInfoReady(slideInfo)
{
	if (slideInfo.Title == "Home")
		shiftLogoUp();
	else
		shiftLogoDown();
}

function shiftLogoUp()
{
	if (window.orientation == 90 || window.orientation == -90) { // landscape
		SystemBridge.setViewFrame("LogoButton", 800, 500, 212, 101, true);
        SystemBridge.setViewFrame("BottomView", 0, 611, 1064, 177, true);
    }
	else { // portrait
		SystemBridge.setViewFrame("LogoButton", 544, 756, 212, 101, true);
        SystemBridge.setViewFrame("BottomView", 0, 611, 1064, 177, true);
    }
}

function shiftLogoDown()
{
	if (window.orientation == 90 || window.orientation == -90) { // landscape
		SystemBridge.setViewFrame("LogoButton", 800, 550, 212, 101, true);
        SystemBridge.setViewFrame("BottomView", 0, 658, 1064, 130, true);
    }
	else { // portrait
		SystemBridge.setViewFrame("LogoButton", 544, 806, 212, 101, true);
        SystemBridge.setViewFrame("BottomView", 0, 658, 1064, 130, true);
    }
}
