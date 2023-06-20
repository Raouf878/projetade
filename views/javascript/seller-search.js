var searchInput = document.getElementById('search-input');

// Add an event listener to the search input
searchInput.addEventListener('input', function() {
  var searchQuery = searchInput.value.toLowerCase();
  var tableRows = document.querySelectorAll('#product-table tbody tr');

  // Loop through each table row
  tableRows.forEach(function(row) {
    var productName = row.querySelector('td:nth-child(1)').textContent.toLowerCase();

    // Check if the product name contains the search query
    if (productName.includes(searchQuery)) {
      row.style.display = 'table-row'; // Show the row
    } else {
      row.style.display = 'none'; // Hide the row
    }
  });
});