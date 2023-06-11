function createObject() {
    const teamName = document.getElementById('team-input').value;
    const incidentAddress = document.getElementById('address').value;
    const incidentTitle = document.getElementById('title').value;
    const incidentAffected = document.getElementById('affected').value;
    const incidentLan = document.getElementById('Lan').value;
    const incidentLat = document.getElementById('Lat').value;
    const selectElement = document.getElementById('mySelect').value;
  
    if (teamName === '' || incidentAddress === '' || incidentAffected === '' || incidentLan === '' || incidentLat === '' || selectElement === ''||incidentTitle==='') {
    console.log('team',teamName);
    
      alert('Please provide all information');
    } else {
      const selectedMaterials = [];
      const checkboxes = document.querySelectorAll('.one-material-populated input[type="checkbox"]:checked');
      checkboxes.forEach((checkbox) => {
        const materialContainer = checkbox.closest('.one-material-populated');
        const label = materialContainer.querySelector('label');
        const valueInput = materialContainer.querySelector('.material-nbr');
        const PrInput = materialContainer.querySelector('.material-nbr').value;
        const Price = materialContainer.querySelector('.material-nbr2').value;
        const totalPrice=Price*PrInput;
        const materialName = label.innerText;
        const materialValue = parseInt(valueInput.value, 10);
        const selectedMaterial = [
          {name: materialName,
          value: materialValue,},{total:totalPrice}
        ]
        
        selectedMaterials.push(selectedMaterial);

      });
      for(let i=1;i<selectedMaterials.length;i++){
        let TOTAL=selectedMaterials[i][1].total+selectedMaterials[i-1][1].total
        var TotalPrice={TOTALPRICE:TOTAL}
      }
      console.log(TotalPrice.TOTALPRICE);
  
      const data = {
        teamName: teamName,
        incidentAddress: incidentAddress,
        incidentAffected: incidentAffected,
        incidentLan: incidentLan,
        incidentLat: incidentLat,
        selectedMaterials: selectedMaterials,
        TotalPrice:TotalPrice,
        incidentTitle:incidentTitle,
        selectElement:selectElement

      };
      const currentUrl = window.location.href;
      const newUrl = currentUrl.replace('/home/', '/create/');
  
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
        // Handle the response data
        console.log(responseData);
        
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
    }
  }
  