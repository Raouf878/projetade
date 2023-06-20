const Home_btn2 = document.getElementById('home-url4');
const Team_btn2 = document.getElementById('Teams-url4');
const button3 = document.getElementById('report-url4');
const Map_btn2 = document.getElementById('map-url4');
Home_btn2.onclick=function(){
    const currentUrl = window.location.href;
    console.log('2222222222');
    const newUrl = currentUrl.replace('/report/', '/home/');
    window.location.href = newUrl;
}
button3.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/report/', '/adereport/home/');
    window.location.href = newUrl;

}

Map_btn2.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/report/', '/map/');
    window.location.href = newUrl;
}