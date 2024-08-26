---
layout: default
title: Datasets
---

# Datasets

Below is a list of available datasets. Use the filter to find specific datasets.

<!-- Filter functionality (JavaScript) -->
<div id="dataset-filter">
  <input type="text" id="filter-input" placeholder="Filter datasets...">
  <ul id="dataset-list">
    {% for dataset in site.datasets %}
      <li class="dataset-item">
        <h3>{{ dataset.title }}</h3>
        <p>{{ dataset.description }}</p>
        <a href="{{ dataset.url }}">View Dataset</a>
      </li>
    {% endfor %}
  </ul>
</div>

<!-- JavaScript for filtering -->
<script>
  document.getElementById('filter-input').addEventListener('input', function() {
    var filter = this.value.toLowerCase();
    var items = document.querySelectorAll('#dataset-list .dataset-item');

    items.forEach(function(item) {
      var title = item.querySelector('h3').textContent.toLowerCase();
      var description = item.querySelector('p').textContent.toLowerCase();

      if (title.includes(filter) || description.includes(filter)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
</script>
