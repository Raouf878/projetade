function update(id){
    let teamName = document.getElementById('team-input');
    let incidentAddress = document.getElementById('address')
    let incidentTitle = document.getElementById('title')
    let incidentAffected = document.getElementById('affected')
    let estimated_time=document.getElementById('desc')
    let incidentLan = document.getElementById('Lan')
    let incidentLat = document.getElementById('Lat')
    var selectElement = document.getElementById("mySelect");
    let Gen_BTN =document.getElementById('gen-btn2')
    Gen_BTN.disabled=true;
    const currentUrl = window.location.href;
      const newUrl = currentUrl.replace('/home/', '/verify/');
    const data={
        report_id:id
    }
    fetch(`${newUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then(responseData => {
        const{
            firstresult,
            results



        }=responseData
        
        teamName.value=firstresult[0].accident_name
        incidentAddress.value=firstresult[0].address
        incidentTitle.value=firstresult[0].accident_title
        incidentAffected.value=firstresult[0].population_affected
        estimated_time.value=firstresult[0].estimated_time
        incidentLat.value=firstresult[0].latitude
        incidentLan.value=firstresult[0].longtitude
        for (var i = 0; i < selectElement.options.length; i++) {
            var option = selectElement.options[i];
            
            // Check if the option's value matches the previously chosen value
            if (option.value === firstresult[0].team_name) {
              // Set the selectedIndex to the index of the matching option
              selectElement.selectedIndex = i;
              break; // Exit the loop since the option is found
            }
          }
        
      })
}
