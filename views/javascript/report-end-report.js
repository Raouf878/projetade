const endButtons = document.querySelectorAll('.end-button');

// Add click event listener to each "END" button
endButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Get the ID from the data-id attribute
    const parentId = button.closest('.reports').id;

    // Use the ID as needed
    console.log('ID:', parentId);
    const currentUrl = window.location.href;
    const newUrl = currentUrl.replace('/home/', '/end-report/');
    const data = {
      acc_ID: parentId
    };
    fetch(`${newUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          const banner = document.getElementById('banner');
          
          let seconds = 5;
          const countdown = setInterval(() => {
            banner.innerText = `Report Ended! Website will Reload in ${seconds} seconds.`;
            banner.classList.remove('hidden');
            
            seconds--;
            if (seconds < 0) {
              clearInterval(countdown);
              banner.classList.add('hidden');
              window.location.reload();
            }
          }, 1000);
          

        } else {
            const banner = document.getElementById('banner');
          
            let seconds = 5;
            const countdown = setInterval(() => {
              banner.innerText = `Report Already Ended! Website will Reload in ${seconds} seconds.`;
              banner.classList.remove('hidden');
              
              seconds--;
              if (seconds < 0) {
                clearInterval(countdown);
                banner.classList.add('hidden');
              }
            }, 1000);
        }
      })
      .catch(error => {
        console.error('Fetch Error:', error);
      });
  });
});