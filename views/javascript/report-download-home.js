function Download(id){
    console.log(id);
    url=`/home/download/${id}/`
    fetch(url, {
        method: 'POST'
      })
        .then(response => {
          if (response.ok) {
            return response.json(); // Parse the response body as JSON
          } else {
            throw new Error('Name invalid');
          }
        })
}