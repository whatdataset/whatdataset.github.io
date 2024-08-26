---
layout: default
title: Home
---

<h1>Welcome to WhatDataset?</h1>
<p> Your unique research question may need unique data. We provide an overview of the most commonly used datasets, and points out their main strengths and drawbacks. We allow users to quickly filter based on the unit of observation, time period, and several other characteristics. </p>

<h2> Find Your Dataset </h2>

<!-- Dataset Filters -->
<div id="dataset-filter">
  <select id="year-filter">
    <option value="">All Years</option>
    {% assign years = site.datasets | map: 'year' | uniq %}
    {% for year in years %}
      <option value="{{ year }}">{{ year }}</option>
    {% endfor %}
  </select>

  <select id="unit-filter">
    <option value="">All Units</option>
    {% assign units = site.datasets | map: 'unit' | uniq %}
    {% for unit in units %}
      <option value="{{ unit }}">{{ unit }}</option>
    {% endfor %}
  </select>

  <input type="text" id="search-input" placeholder="Search datasets...">

  <ul id="dataset-list">
    {% for dataset in site.datasets %}
      <li class="dataset-item" data-year="{{ dataset.year }}" data-unit="{{ dataset.unit }}">
        <h3>{{ dataset.title }}</h3>
        <p>{{ dataset.description }}</p>
      </li>
    {% endfor %}
  </ul>
</div>

<!-- Custom CSS -->
<style>
  #dataset-filter label {
    display: block;
    margin-bottom: 5px;
  }

  #dataset-filter select, 
  #dataset-filter input[type="text"] {
    display: block;
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  #dataset-filter .btn-dataset {
    display: inline-block;
    padding: 8px 16px;
    margin: 5px 0;
    border-radius: 20px; /* Rounded corners */
    border: 3px solid #155799; /* Custom border color */
    width: calc(50% - 10px); /* Adjust width to fit layout */
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    background-color: #159957; /* Change to your theme's primary color */
    color: white;
    transition: background-color 0.3s ease;
  }

  .btn-dataset:hover {
    background-color: #0056b3; /* Change to your theme's hover color */
    text-decoration: none;
  }
</style>