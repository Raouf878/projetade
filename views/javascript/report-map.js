document.addEventListener("DOMContentLoaded", function() {
    var ReportStatus=document.getElementById("report-info")
    var StatusButtons=document.getElementsByClassName("button")
    var inputtt=document.getElementById('team-input')
    var ReportImg=document.getElementById("close-img")
    
    for(var i = 0; i < StatusButtons.length; i++) {
        
        StatusButtons[i].addEventListener("click", function() {
            
            ReportStatus.style.height = "93%";
            ReportStatus.style.opacity = 1;
            ReportStatus.style.bottom= "5%";
        });
    }

    ReportImg.onclick=function(){
        ReportStatus.style.height = "0%";
        ReportStatus.style.opacity = 0;
        ReportStatus.style.bottom= "0%";
    }
});