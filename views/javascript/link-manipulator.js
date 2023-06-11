const button = document.getElementById('report-url');
const Home_btn = document.getElementById('home-url');
const Team_btn = document.getElementById('Teams-url');
const currentUrl = window.location.href;
button.onclick=function(){
    window.location.href = newUrl;
}
Team_btn.onclick=function(){
    const newUrl = currentUrl.replace('/home/', '/report/');
    window.location.href = newUrl;

}
Home_btn.onclick=function(){
    const newUrl = currentUrl.replace('/report/', '/home/');
    window.location.href = newUrl;
}