// Place your JavaScript code here

var scan_Btn = document.getElementById('scanbutton');
const addInfoDiv = document.querySelector('.add_info');
const tbody = document.getElementById('prodcts_table');
const Opc=document.getElementById('Opc')
scan_Btn.addEventListener('click', startBarcodeListener);



// Clear the existing content in the add_info div


// Function to start listening for barcode input
function startBarcodeListener() {
  var barcode = '';
  var interval;
  document.addEventListener('keydown', function(evt) {
    if (interval) clearInterval(interval);
    if (evt.code == 'Enter') {
      if (barcode) handleBarcode(barcode);
      barcode = '';
      return;
    }
    if (evt.key != 'Shift') barcode += evt.key;
    interval = setInterval(() => (barcode = ''), 20);
  });

  function handleBarcode(scanned_barcode) {
    fetch(`/ade/incident-material/${scanned_barcode}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          tbody.innerHTML = '';
          Opc.style.opacity=0;
          addInfoDiv.innerHTML = 'codebar error';

        }
          return response.json();
        
      })
      .then(data => {
        addInfoDiv.innerHTML = '';
        Opc.style.opacity=1;
        tbody.innerHTML = '';
        // Loop through the fetched data array
        for (let i = 0; i < data.length; i++) {
          var row = document.createElement('tr');

            const cell = document.createElement('td');
            const cell2 = document.createElement('td');
            cell.textContent = data[i][3];
            cell2.textContent = data[i][2];
            
            row.appendChild(cell);
            row.appendChild(cell2);
          

          // Append the row to the table
          tbody.appendChild(row);
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  }
}
