const Save_btn=document.getElementById('Product_save')
Save_btn.onclick=function(){
const product_name=document.getElementById('product-name').value;
const product_price=document.getElementById('product-price').value;

    if (product_name=== '' || product_price=== '' ){
        alert('Please provide all product details')
        console.log(product_name);
        console.log(product_price);
    } else{
        const data={
            product_name:product_name,
            product_price:product_price

        }
        const currentUrl = window.location.href;
       const newUrl = currentUrl.replace('/home/', '/create/');
        fetch(`/aade/seller/create/`, {
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
        
    }}