document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById('search-input');
  var yearFilter = document.getElementById('year-filter');
  var unitFilter = document.getElementById('unit-filter');
  var filterInput = document.getElementById('filter-input');

  // Get modal elements
  var modal = document.getElementById('datasetModal');
  var modalContent = document.getElementById('modalBody');
  var closeModal = document.querySelector('.modal .close');

  function filterDatasets() {
    var searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
    var selectedYear = yearFilter ? yearFilter.value : '';
    var selectedUnit = unitFilter ? unitFilter.value : '';
    var filterQuery = filterInput ? filterInput.value.toLowerCase() : '';

    var items = document.querySelectorAll('#dataset-list .dataset-item');

    items.forEach(function(item) {
      var title = item.querySelector('h3').textContent.toLowerCase();
      var description = item.querySelector('p').textContent.toLowerCase();
      var year = item.getAttribute('data-year');
      var unit = item.getAttribute('data-unit');

      var matchesSearch = title.includes(searchQuery) || description.includes(searchQuery);
      var matchesFilter = title.includes(filterQuery) || description.includes(filterQuery);
      var matchesYear = !selectedYear || selectedYear === year;
      var matchesUnit = !selectedUnit || selectedUnit === unit;

      if ((matchesSearch || matchesFilter) && matchesYear && matchesUnit) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function openModal(content) {
    modalContent.innerHTML = content;
    modal.style.display = 'block';
  }

  function closeModalHandler() {
    modal.style.display = 'none';
  }

  async function fetchDatasetContent(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const markdown = await response.text();
      return marked(markdown); // Convert Markdown to HTML
    } catch (error) {
      console.error('Fetch error:', error);
      return '<p>Error loading dataset content.</p>'; // Return a user-friendly message
    }
  }

  async function openDatasetModal(item) {
    var title = item.querySelector('h3').textContent;
    var description = item.querySelector('p').textContent;
    var datasetUrl = '_datasets/' + item.getAttribute('data-url'); // Adjust path to _datasets folder
    
    // Fetch the dataset content including pros and cons
    var datasetContent = await fetchDatasetContent(datasetUrl);

    // Construct the content for the modal
    var content = `
      <h2>${title}</h2>
      <p>${description}</p>
      <hr>
      ${datasetContent}
    `;

    // Open the modal with the fetched content
    openModal(content);
  }

  if (searchInput) searchInput.addEventListener('input', filterDatasets);
  if (yearFilter) yearFilter.addEventListener('change', filterDatasets);
  if (unitFilter) unitFilter.addEventListener('change', filterDatasets);
  if (filterInput) filterInput.addEventListener('input', filterDatasets);

  // Add click event listeners to dataset items to open the modal
  document.querySelectorAll('#dataset-list .dataset-item').forEach(function(item) {
    item.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default action if item is a link
      openDatasetModal(item);
    });
  });

  // Close the modal when the close button is clicked
  if (closeModal) closeModal.addEventListener('click', closeModalHandler);

  // Close the modal when clicking outside of the modal content
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      closeModalHandler();
    }
  });
});
