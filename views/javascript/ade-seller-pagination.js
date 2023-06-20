const productsPerPage = 5; // Number of products to display per page

function displayProducts(page, searchQuery = '') {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productListContainer = document.getElementById('product-list');
    const rows = productListContainer.querySelectorAll('tr');
    const visibleRows = [];
  
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const productName = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
      const productPrice = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
      if (productName.includes(searchQuery.toLowerCase()) || productPrice.includes(searchQuery.toLowerCase())) {
        visibleRows.push(row);
      }
    }
  
    const totalPages = Math.ceil(visibleRows.length / productsPerPage);
  
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
  
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.textContent = i;
      pageLink.href = '#';
      pageLink.addEventListener('click', () => {
        displayProducts(i, searchQuery);
      });
      paginationContainer.appendChild(pageLink);
    }
  
    rows.forEach(row => {
      row.style.display = 'none';
    });
  
    visibleRows.forEach((row, index) => {
      if (index >= startIndex && index < endIndex) {
        row.style.display = 'table-row';
      }
    });
  }

// Initial display
displayProducts(1);

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value.trim();
  displayProducts(1, searchQuery);
});