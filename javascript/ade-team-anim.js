document.addEventListener("DOMContentLoaded", function() {
    var MyBtn=document.getElementById("report-btn");
    var MyPage=document.getElementById("report-page")
    var MyImg=document.getElementById("cancel-img")
    var MyImg2=document.getElementById("cancel-img2")
    var PrImg=document.getElementById("profile-img")
    var PrCon=document.getElementById("profile-container")
    var PrImgBig=document.getElementById("big-profile")
    var MainCon=document.getElementById("main-con")
    MyBtn.onclick=function(){
          MyPage.style.height = "80%";
          MyPage.style.opacity = 1;
          MyPage.style.zIndex = 1;
    };
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
    MyImg2.onclick=function(){
      
        PrCon.style.width = "0%";
        PrCon.style.opacity = '0';
        PrImgBig.style.display='none'
        PrCon.style.display = 'none';
    
    };
    
    });