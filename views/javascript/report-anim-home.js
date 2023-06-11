document.addEventListener("DOMContentLoaded", function() {
    var StatusButtons = document.getElementsByClassName("button");
    var ReportInfos = document.getElementsByClassName("report-info");
    var CloseImgs = document.getElementsByClassName("close-img");

    for (var i = 0; i < StatusButtons.length; i++) {
        (function(i) {
            StatusButtons[i].addEventListener("click", function() {
                ReportInfos[i].style.height = "70%";
                ReportInfos[i].style.opacity = 1;
                ReportInfos[i].style.bottom = "25%";
            });

            CloseImgs[i].addEventListener("click", function() {
                ReportInfos[i].style.height = "0%";
                ReportInfos[i].style.opacity = 0;
                ReportInfos[i].style.bottom = "0%";
            });
        })(i);
    }
});



