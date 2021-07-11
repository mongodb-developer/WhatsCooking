<h1 align="center">What's Cooking with Atlas Search</h1>

<h2 align="center">A Restaurant Finder Application Demo MongoDB Atlas Search</h2>
<p>Hello! 👋 This application allows you to search lightning fast through over 25,000 restaurants in the New York city area based on a variety of search parameters and data types:
<ul>
<li>restaurant name</li>
<li>geolocation coordinates</li>
<li>cuisine type</li>
<li>average star rating</li>
<li>borough</li>
</ul>
<div align="center">
<img src="CookingDemo.gif" width="300"  />
</div>

<p> Atlas Search is powered by Apache Lucene and supports the most popular application search features, from autocomplete to custom scoring. By building out Whats' Cooking, you'll learn all sorts of ways MongoDB allows you to build fine-grained full-text searches on your data using Apache Lucene, including:</p>

- fuzzy matching
- highlighting
- autocomplete
- range queries
- geoqueries
- facets
- relevance-based scoring
- custom function scoring

<p>Check out the video of the MongoDB .Live keynote to see a demonstration of all the features or visit the link below to play around with the finished hosted application:</p>
<h2 align="center"><a href="https://www.atlassearchrestaurants.com">www.atlassearchrestaurants.com</a></h2>

<p>This application is hosted entirely by MongoDB Atlas was created using:</p>
*React
*Tailwind CSS
*A modified sample dataset based on MongoDB's Atlas sample_restaurants dataset

<h3>Prerequisites</h3>
<p>Once you have the entire  </p>
* A MongoDB Atlas account. Get one for free <a href="https://www.mongodb.com/cloud/atlas">here.</a>
* A recent version of Node.js and npm.
* Restaurant sample dataset.

<p>You can read and download the dataset using the MongoDB Shell, any MongoDB driver, or my favorite MonogDB Compass using the following URI:</p>

<pre>
  <code>
mongodb+srv://mongodb:atlassearch@shareddemoapps.dezdl.mongodb.net/whatscooking
</code>
</pre>

<p>It is also included in this repo's Supplemental Files branch as <pre>whatscooking.json</pre></p>

<p float="left">
    <img src="https://search-demos.s3.us-east-2.amazonaws.com/AppComponents1.png" width="300"  />
    <img src="https://search-demos.s3.us-east-2.amazonaws.com/AppComponents2.png" width="300"  />
    <img src="https://search-demos.s3.us-east-2.amazonaws.com/AggregationComponent.png" width="300"  />
</p>

# WhatsCooking

Keynote 2021 for Atlas Search
