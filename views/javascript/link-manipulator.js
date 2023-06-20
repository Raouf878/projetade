const button = document.getElementById('report-url');
const button2 = document.getElementById('report-url2');
const button3 = document.getElementById('report-url3');
const button4 = document.getElementById('report-url4');
const Home_btn = document.getElementById('home-url');

const Home_btn3 = document.getElementById('home-url3');
const Home_btn4 = document.getElementById('home-url4');
const Team_btn = document.getElementById('Teams-url');

const Team_btn3 = document.getElementById('Teams-url3');
const Team_btn4 = document.getElementById('Teams-url4');
const Map_btn = document.getElementById('map-url');

const Map_btn3 = document.getElementById('map-url3');
const Map_btn4 = document.getElementById('map-url4');
//home
button.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/adereport/home/');
    window.location.href = newUrl;
}
Team_btn.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/report/');
    window.location.href = newUrl;

}

Map_btn.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/map/');
    window.location.href = newUrl;
}
//report

//map
button3.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/adereport/home/');
    window.location.href = newUrl;
}
Team_btn3.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/report/');
    window.location.href = newUrl;

}

Map_btn3.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/map/');
    window.location.href = newUrl;
}
//team
button4.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/adereport/home/');
    window.location.href = newUrl;
}
Team_btn4.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/report/');
    window.location.href = newUrl;

}

Map_btn4.onclick=function(){
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/map/');
    window.location.href = newUrl;
}