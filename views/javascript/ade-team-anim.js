document.addEventListener("DOMContentLoaded", function() {
    var MyBtn=document.querySelectorAll(".report-btn2");
    var MyPage=document.getElementById("report-page")
    var MyImg=document.getElementById("cancel-img")
    var container = document.getElementById("barcode-container");
    var PrImg=document.getElementById("profile-img")
    var PrCon=document.getElementById("profile-container")
    var PrImgBig=document.getElementById("big-profile")
    var MainCon=document.getElementById("main-con")
    for (var i = 0; i < MyBtn.length; i++) {
      
      MyBtn[i].onclick = function() {
        var id = this.id; // Get the id value of the clicked button
        console.log("Clicked button id:", id);

        MyPage.style.height = "80%";
        MyPage.style.opacity = 1;
        MyPage.style.zIndex = 1;
        JsBarcode("#barcode", `${id}`,{format: "CODE128",
        displayValue: false});
      };
    }
    MyImg.onclick=function(){
      if (MyPage.style.height === "80%") {


        MyPage.style.height = "0";
        MyPage.style.opacity = 0;
      }
    };
    PrImg.onclick=function(){
     PrCon.style.width="70%";
     PrCon.style.opacity = 1;
     PrCon.style.zIndex = 1;
     PrCon.style.display = 'inline';
     MyImg2.style.display='inline';
     PrImgBig.style.display='block'
    };
   
    });