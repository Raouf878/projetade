const wordList = [];

    function addWordToList() {
      const inputElements = document.getElementsByClassName('new-word-input');
      let combinedWords = '';
      for (let i = 0; i < inputElements.length; i++) {
        const input = inputElements[i];
        const word = input.value.trim();
        if (word.length !== 0 ) {
          combinedWords += word + ' ';
          input.value = '';
        }
      }
      if (combinedWords.trim().length !== 0) {
        wordList.push(combinedWords.trim());
        printWordList();
      }
    }

    function removeWordFromList(index) {
      wordList.splice(index, 1);
      contacts.splice(index, 1);
      printWordList();
    }

    function printWordList() {
      const wordListDiv = document.getElementById('word-list');
      wordListDiv.innerHTML = '';
      for (let i = 0; i < wordList.length; i++) {
        const word = wordList[i];
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        const wordText = document.createElement('p');
        wordText.innerText = word;
        wordDiv.appendChild(wordText);
        const cancelButton = document.createElement('button');
        cancelButton.className = 'cancel-btn';
        cancelButton.innerText = 'x';
        cancelButton.onclick = () => {
          removeWordFromList(i);
        };
        wordDiv.appendChild(cancelButton);
        wordListDiv.appendChild(wordDiv);
      }
    }
    
    var contacts = [];
    function addContact() {
      // Get the input values
      var nameInput = document.getElementById("name");
      var phoneInput = document.getElementById("phone");
      var name = nameInput.value;
      var phone = phoneInput.value;
      var team=document.getElementById('team-input')
      if(team.value===""){
        alert("Please Generate name.");
        wordList.splice(0)
        contacts.splice(0)
      }
      else{
      if (name === "" || phone === "") {
        alert("Please enter both name and phone number.");
        wordList.splice(0)
        contacts.splice(0)
        return;
      }
      else{
      var contact = {
        name: name,
        phone: phone
      };

      contacts.push(contact);
      console.log(contacts);}
    }}
    async function postData(url = '', data = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    
      try {
        console.log(response.status);
        const responseData =  response.status;
        console.log(responseData);
        if (responseData === 200) {
          contacts.length = 0;
          window.location.reload();
        } else {
          console.error('Error:', responseData.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }


    async function saveContacts(){
      var team=document.getElementById('team-input')
      var btn=document.getElementById('gen-btn')
      contacts.unshift(team.value)
      const nameExists = contacts.some((element) => typeof element === 'object' && element.hasOwnProperty('name') && element.hasOwnProperty('phone'));
      if(nameExists===true){
        const urlString = window.location.href;

        const url = new URL(urlString);
        const pathname = url.pathname;
        const segments = pathname.split('/');
        const lastSegment = segments[segments.length - 1];
        const BeforelastSegment = segments[segments.length - 2];

        console.log(lastSegment);
        await postData(`/Team/Create/${BeforelastSegment}/${lastSegment}`,contacts )
      }
      else{

        alert("please provide all info and try again")
        wordList.splice(0)
        contacts.splice(0)
      }
    }
      
      
    
    

    document.getElementById('add-btn').addEventListener('click', function() {
      addContact()
      addWordToList();
    });
    let elementValue=0;
    const DeleteImg = document.getElementById('delete');
    const teamContainers = document.querySelectorAll('.team-container');
    
    teamContainers.forEach(teamContainer => {
      const idValue = teamContainer.id;
      const radioButton = teamContainer.querySelector('input[type="radio"]');
      radioButton.addEventListener('click', () => {
        if (radioButton.checked) {
          elementValue=idValue
          console.log(idValue);
        }});
    });
    
    DeleteImg.onclick = async () => {
      console.log(`elementValue before delete: ${elementValue}`);
    
      if (elementValue === 0) {
        alert('Please select a value.');
        return;
      }
    
      const urlString = window.location.href;
      const url = new URL(urlString);
      const pathname = url.pathname;
      const segments = pathname.split('/');
      const lastSegment = segments[segments.length - 1];
      const BeforelastSegment = segments[segments.length - 2];
    
      console.log(`elementValue after delete: ${elementValue}`);
      console.log(`lastSegment: ${lastSegment}`);
    
      fetch(`/Team/Delete/${BeforelastSegment}/${lastSegment}/${elementValue}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            window.location.reload();
          } else {
            alert('User does not exist');
          }
        });
    };