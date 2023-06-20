document.addEventListener("DOMContentLoaded", function() {
    var ReportStatus=document.getElementById("report-info")
    var StatusButtons=document.getElementsByClassName("button")
    var ReportImg=document.getElementById("close-img")
    let Gen_BTN =document.getElementById('gen-btn2')
    let teamName = document.getElementById('team-input');
    let incidentAddress = document.getElementById('address')
    let incidentTitle = document.getElementById('title')
    let incidentAffected = document.getElementById('affected')
    let estimated_time=document.getElementById('desc')
    let incidentLan = document.getElementById('Lan')
    let incidentLat = document.getElementById('Lat')
    var selectElement = document.getElementById("mySelect");
    
    
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
        Gen_BTN.disabled=false;
        teamName.value='';
        incidentAddress.value=''
        incidentAffected.value=''
        incidentLan.value=''
        incidentLat.value=''
        incidentTitle.value=''
        estimated_time.value=''
                                }
});