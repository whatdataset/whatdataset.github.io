---
layout: default
title: Home
---

<h1>Welcome to WhatDataset?</h1>
<p> To answer your unique research question, you may need a combination of datasets. This website provides an overview of many commonly used datasets, and points out their main strengths and drawbacks. We allow users to quickly filter based on the unit of observation, time period, and several other characteristics. </p>

<h2> Find Your Dataset </h2>

<!-- Dataset Filter -->
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
