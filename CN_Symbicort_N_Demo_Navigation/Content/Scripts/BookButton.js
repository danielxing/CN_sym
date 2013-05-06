function goto(value){

    var title = value['Title'];

    switch(title) {
            
        case "中重度患者":
        {
            SystemBridge.goToSlide('Page1.2 PopUp');
            break;
        }
            
        case "哮喘关键症状":
        {
            SystemBridge.goToSlide('Page1.3 PopUp');
            break;
        }
            
        case "哮喘评估":
        {
            SystemBridge.goToSlide('Page1.4 PopUp');
            break;
        }
            
        case "EuroSMART":
        {
            SystemBridge.goToSlide('Page2.2 PopUp');
            break;
        }
            
        case "AHEAD研究":
        {
            SystemBridge.goToSlide('Page2.3 PopUp');
            break;
        }
            
        case "GIMA建议":
        {
            SystemBridge.goToSlide('Page3.1 PopUp');
            break;
        }
            
        case "剂量调整":
        {
            SystemBridge.goToSlide('Page3.2 PopUp');
            break;
        }
            
        case "哮喘总体控制目标":
        {
            SystemBridge.goToSlide('Page4.1 PopUp');
            break;
        }
            
        case "卓越组合":
        {
            SystemBridge.goToSlide('Page5.1 PopUp');
            break;
        }
            
        case "药物经济学":
        {
            SystemBridge.goToSlide('Page6.1 PopUp');
            break;
        }
    }

}
//


SystemBridge.requestCurrentSlideInfo("goto");