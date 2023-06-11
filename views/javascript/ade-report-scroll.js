// Get all the material sections
const materialSections2 = document.querySelectorAll('.one-material-populated');
// Number of material sections per page
const itemsPerPage = 2;
// Current page index
let currentPage = 0;

// Function to show/hide material sections based on the current page
function showMaterialSections() {
  // Calculate the start and end index of material sections to display
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Loop through all material sections and show/hide them based on the current page
  materialSections2.forEach((section, index) => {
    if (index >= startIndex && index < endIndex) {
      section.style.display = 'block';
    } else {
      section.style.display = 'none';
    }
  });
}

// Function to navigate to the previous page
function goToPrevPage() {
  if (currentPage > 0) {
    currentPage--;
    showMaterialSections();
  }
}

// Function to navigate to the next page
function goToNextPage() {
  const totalPages = Math.ceil(materialSections2.length / itemsPerPage);
  if (currentPage < totalPages - 1) {
    currentPage++;
    showMaterialSections();
  }
}

// Attach event listeners to the pagination buttons
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
prevPageBtn.addEventListener('click', goToPrevPage);
nextPageBtn.addEventListener('click', goToNextPage);

// Initially show the first page of material sections
showMaterialSections();
