const Home_btn2 = document.getElementById('home-url3');
const Team_btn2 = document.getElementById('Teams-url3');
const button3 = document.getElementById('report-url3');
const Map_btn2 = document.getElementById('map-url3');
Home_btn2.onclick=function(){
    const currentUrl = window.location.href;
    console.log('2222222222');
    const newUrl = currentUrl.replace('/map/', '/home/');
    window.location.href = newUrl;
}
button3.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/map/', '/adereport/home/');
    window.location.href = newUrl;

}

Team_btn2.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/map/', '/report/');
    window.location.href = newUrl;
}