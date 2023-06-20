const Home_btn2 = document.getElementById('home-url2');
const Team_btn2 = document.getElementById('Teams-url2');
const Map_btn2 = document.getElementById('map-url2');
Home_btn2.onclick=function(){
    const currentUrl = window.location.href;
    console.log('2222222222');
    const newUrl = currentUrl.replace('/adereport/home/', '/home/');
    window.location.href = newUrl;
}
Team_btn2.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/adereport/home/', '/report/');
    window.location.href = newUrl;

}

Map_btn2.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/adereport/home/', '/map/');
    window.location.href = newUrl;
}