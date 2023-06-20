document.addEventListener("DOMContentLoaded", function() {
    var ReportStatus2=document.getElementById("report-info2")
    var StatusButtons2=document.getElementsByClassName("buton1")
    var inputtt=document.getElementById('team-input')
    var ReportImg=document.getElementById("close-img2")
    
    for(var i = 0; i < StatusButtons2.length; i++) {
        
        StatusButtons2[i].addEventListener("click", function() {
            
            ReportStatus2.style.height = "93%";
            ReportStatus2.style.opacity = 1;
            ReportStatus2.style.bottom= "5%";
        });
    }

    ReportImg.onclick=function(){
        ReportStatus2.style.height = "0%";
        ReportStatus2.style.opacity = 0;
        ReportStatus2.style.bottom= "0%";
    }
});