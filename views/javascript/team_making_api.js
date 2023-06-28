var gen_btn=document.getElementById('gen-btn')
var gen_btn2=document.getElementById('gen-btn2')
var inputtt=document.getElementById('team-input')
var title=document.getElementById('team-title')


gen_btn2.onclick=function(){
  console.log("raouf");
  const currentUrl = window.location.href;
  const newUrl = currentUrl.replace('/report/', '/report/Team/');
  console.log(newUrl);
  fetch(`${newUrl}`, {
    method: 'GET'
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Parse the response body as JSON
      } else {
        throw new Error('Name invalid');
      }
    })
    .then(data => {
      console.log(data.message); // Access the message value from the parsed JSON data
      inputtt.value = data.message; // Set the value of 'inputtt' with the message
    })
    .catch(error => {
      console.error(error);
      alert(error.message);
    });
}
