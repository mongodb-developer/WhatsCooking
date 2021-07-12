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
<img src="CookingDemo.gif" width="450"  />
</div>
<p><em>Note: This dataset is mocked. Please do not use to make actual dining decisions.</em></p>

<p> What's Cooking implements many Atlas Search features from autocomplete to custom function scoring. Using the $search operator in a MongoDB aggregation pipeline, we can build fine-grained searches across text, numerics, and geospatial data. By building out What's Cooking, you'll learn all sorts of ways MongoDB allows you to build complex, fine-grained full-text searches on your Atlas data.</p>

**No additional servers or software needed. No need to keep data in sync. Everything is done in MongoDB Atlas.**

- fuzzy matching
- highlighting
- autocomplete
- range queries
- geoqueries
- facets
- relevance-based scoring
- custom function scoring

<p>Check out the video of the MongoDB .Live keynote to see a demonstration of all the features or visit the link below to play around with the finished application, hosted entirely in MongoDB Atlas:</p>
<h2 align="center"><a href="https://www.atlassearchrestaurants.com">www.atlassearchrestaurants.com</a></h2>

<p>This application is hosted entirely by MongoDB Atlas was created using:</p>

- React
- Tailwind CSS
- A modified sample dataset based on MongoDB's Atlas sample_restaurants dataset

<h3>Prerequisites</h3>

- A MongoDB Atlas account. Get one for free <a href="https://www.mongodb.com/cloud/atlas">here.</a>
- A recent version of Node.js and npm.
- Restaurant sample dataset.
- (Recommended) <a href="https://www.mongodb.com/try/download/compass">MongoDB Compass - GUI</a>

<p>You can read and download the dataset using the MongoDB Shell, any MongoDB driver, or my favorite MongoDB Compass using the following URI:</p>

<pre>
  <code>
mongodb+srv://mongodb:atlassearch@shareddemoapps.dezdl.mongodb.net/whatscooking
</code>
</pre>

<p>It is also included in this repo's Supplemental Files branch as <pre>whatscooking.json</pre></p>

---

<h2>To Run This Application....</h2>

1. Clone the repo.
2. Navigate inside `WhatsCooking` directory.
3. Run <code>npm install</code> .
4. Run <code>npm start </code> .

---

<h2>To Build This Application...</h2>

<h2>Prepare Data</h2>

<ol>
<li> Load data to Atlas cluster:
<ul>
<li>database: <code>whatscooking</code></li>
<li>collection: <code>restaurants</code></li>
</ul>
</li>

<li> Create Search indexes. (Index definitions includes in `supplement-files` .)</li>
</ol>

<h2>React Components....</h2>
<p float="left">
    <img src="https://search-demos.s3.us-east-2.amazonaws.com/AppComponents1.png" width="250"  />
    <img src="https://search-demos.s3.us-east-2.amazonaws.com/AppComponents2.png" width="250"  />
    <img src="https://search-demos.s3.us-east-2.amazonaws.com/AggregationComponent.png" width="250"  />
</p>

<h2>Using Realm as Your Serverless Backend....</h2>
<p>What's Cooking uses HTTP services in Realm to create 2 APIs to allow you to query for your restaurant data over HTTP: </p>

- `getRestaurants` called from the `useHomeFetch.js` hook.
- `getRestaurantsAutocomplete` called from the `Autosuggestions.js` component.

Find the Realm application and code for these webhooks in the <code>supplement-files</code> branch in a folder called `WhatsCookingRealm`</p>

<h2>If you have any questions or feedback, feel free to create an Issue or PR in this repo or reach out to me on Twitter @YouOldMaid.</h2>

<h2>Have fun and happy coding!</h2>

Keynote 2021 for Atlas Search Demo
