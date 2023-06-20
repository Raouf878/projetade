function handleButtonClick(id){
    const Url=`/ade/home/start/${id}`
    fetch(`${Url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        if (response.ok) {
         window.location.reload();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
}
function EndReport(id){
    const Url=`/ade/home/end/${id}`
    fetch(`${Url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        if (response.ok) {
         window.location.reload();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
}








