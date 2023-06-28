document.addEventListener("DOMContentLoaded", function() {
    var StatusButton = document.querySelector(".button");
    var ReportInfo = document.querySelector(".report-info");
    var CloseImg = document.getElementById("close-img");

    StatusButton.addEventListener("click", function() {
        ReportInfo.style.height = "70%";
        ReportInfo.style.opacity = 1;
        ReportInfo.style.bottom = "25%";
    });

    CloseImg.addEventListener("click", function() {
        ReportInfo.style.height = "0%";
        ReportInfo.style.opacity = 0;
        ReportInfo.style.bottom = "0%";
    });
});
