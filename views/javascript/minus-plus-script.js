document.addEventListener("DOMContentLoaded", function() {
    var TruckNbr=document.getElementById('truck-number');
    var WrenchNbr=document.getElementById('wrench-number');
    var PipeNbr=document.getElementById('pipe-number');
    var ScrewNbr=document.getElementById('screw-number');
    var wrenchplus=document.getElementById('wrench-plus');
    var wrenchminus=document.getElementById('wrench-minus');
    var Truckplus=document.getElementById('truck-plus');
    var Truckminus=document.getElementById('truck-minus');
    var Pipeplus=document.getElementById('pipe-plus');
    var Pipeminus=document.getElementById('pipe-minus');
    var Screwplus=document.getElementById('screw-plus');
    var Screwminus=document.getElementById('screw-minus');
    Truckplus.onclick = function() {
        var currentValue = parseInt(TruckNbr.value); // get current value and convert to number
        if (!isNaN(currentValue)) { // check if current value is a number
          currentValue++; // increment current value by 1
          TruckNbr.value = currentValue; // set input value to updated value
        }}
        Truckminus.onclick = function() {
            var currentValue = parseInt(TruckNbr.value); // get current value and convert to number
            if (currentValue>0) { // check if current value is a number
              currentValue--; // increment current value by 1
              TruckNbr.value = currentValue; // set input value to updated value
            }}
        wrenchplus.onclick = function() {
        var currentValue = parseInt(WrenchNbr.value); 
            if (!isNaN(currentValue)) { 
                currentValue++; 
                WrenchNbr.value = currentValue; }}
        wrenchminus.onclick = function() {
                    var currentValue = parseInt(WrenchNbr.value); // get current value and convert to number
                    if (currentValue>0) { // check if current value is a number
                      currentValue--; // increment current value by 1
                      WrenchNbr.value = currentValue; // set input value to updated value
                    }}
                    Pipeplus.onclick = function() {
                        var currentValue = parseInt(PipeNbr.value); 
                            if (!isNaN(currentValue)) { 
                                currentValue++; 
                                PipeNbr.value = currentValue; }}
                        Pipeminus.onclick = function() {
                                    var currentValue = parseInt(PipeNbr.value); // get current value and convert to number
                                    if (currentValue>0) { // check if current value is a number
                                      currentValue--; // increment current value by 1
                                      PipeNbr.value = currentValue; // set input value to updated value
                                    }}
                                    Screwplus.onclick = function() {
                                        var currentValue = parseInt(ScrewNbr.value); 
                                            if (!isNaN(currentValue)) { 
                                                currentValue++; 
                                                ScrewNbr.value = currentValue; }}
                                        Screwminus.onclick = function() {
                                                    var currentValue = parseInt(ScrewNbr.value); // get current value and convert to number
                                                    if (currentValue>0) { // check if current value is a number
                                                      currentValue--; // increment current value by 1
                                                      ScrewNbr.value = currentValue; // set input value to updated value
                                                    }}
                
    
    
    });