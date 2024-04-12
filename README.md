<h1 align="center">What's Cooking with Atlas Search</h1>

<h2 align="center">A Restaurant Finder Application Demo MongoDB Atlas Search</h2>
<p>Hello! 👋 This application allows you to search lightning fast through over 25,000 restaurants in the New York city area based on a variety of search parameters and data types:</p>
<ul>
<li>restaurant name</li>
<li>geolocation coordinates</li>
<li>cuisine type</li>
<li>average star rating</li>
<li>borough</li>
</ul>
<br/>
<div align="center">
<img src="restaurantDemo.gif" width="450"  />
</div>
<br/>
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
- synonyms

<p>Check out the video of the MongoDB.Live keynote to see a demonstration of all the features or visit the link below to play around with the finished application, hosted entirely in MongoDB Atlas:</p>
<h2 align="center"><a href="https://www.atlassearchrestaurants.com">www.atlassearchrestaurants.com</a></h2>

<p>This application is hosted entirely by MongoDB Atlas was created using:</p>

- React
- Tailwind CSS
- MongoDB Realm for backend HTTPs endpoints and webhooks
- A modified sample dataset based on MongoDB's Atlas sample_restaurants dataset

<p float="left">
    <img src="WhatsCookingArchitecture.png" width="750"  />
</p>

<p><em>Currently this app is not suitable for mobile, but feel free to send a PR.</em> 😊</p>

<h3>Prerequisites</h3>

- A MongoDB Atlas account. Get one for free <a href="https://www.mongodb.com/cloud/atlas">here.</a>
- A recent version of Node.js and npm.
- Restaurant sample dataset.
- Synonyms dataset.
- (Recommended) <a href="https://www.mongodb.com/try/download/compass">MongoDB Compass - GUI</a>

<p>You can read and download the dataset using the MongoDB Shell, any MongoDB driver, or my favorite MongoDB Compass using the following URI:</p>

<pre>
  <code>
mongodb+srv://mongodb:atlassearch@shareddemoapps.dezdl.mongodb.net/whatscooking
</code>
</pre>

<p>It is also included in this repo's Supplemental Files branch as <pre>whatscooking.json</pre></p>

---

<h2>To Build This Application...</h2>

<h2>Prepare Data</h2>

<ol>
<li> Load data to Atlas cluster:
<ul>
<li>database: <code>whatscooking</code></li>
<li>collection: <code>restaurants</code>, <code>menu_synonyms</code></li>
</ul>
</li>

<li> Create Search indexes. (Index definitions includes in <code>indexes</code> directory.)</li>
</ol>

<h2> Deploy HTTPS Endpoints at your own env</h2>
<ol>
<li>Create Application</li>
At your Atlas UI, click <code>Create a New App</code></br>
Name your application whatever you wish. </br>
After ensuring it is linked to the correct cluster, click the CREATE APP SERVICE button.
<li>Create HTTPS Endpoints</li>
Go to <code>HTTPS Endpoints</code> at navigation bar at left and click <code>Add An Endpoint</code></br>
Create following 3 HTTP endpoints</br>

<table>
	<tbody>
		<tr>
			<th>Route</th>
			<th>Source code of function</th>
			<th>HTTP methods</th>
            <th>Respond With Result</th>
            <th>Return Type</th>
		</tr>
		<tr>
			<td>/restaurants/getRestaurantsAutocomplete</td>
			<td>_backend_functions/getRestaurantsAutocomplete.js</td>
			<td>GET</td>
            <td>Enable</td>
            <td>JSON</td>
		</tr>
		<tr>
			<td>/getRestaurants</td>
			<td>_backend_functions/getRestaurants.js</td>
			<td>POST</td>
            <td>Enable</td>
            <td>JSON</td>
		</tr>
		<tr>
			<td>/restaurants/getFacets</td>
			<td>_backend_functions
/getFacets.js
</td>
			<td>POST</td>
            <td>Enable</td>
            <td>JSON</td>
		</tr>
        <tr>
			<td>/synonyms/getFoodSynonyms</td>
			<td>_backend_functions/getFoodSynonyms.js</td>
			<td>POST</td>
            <td>Enable</td>
            <td>JSON</td>
		</tr>
	</tbody>
</table>

Please keep default value for other options and click <code>Save Draft</code>

<li>Function Setting</li>
Go to <code>Function</code> at navigation bar at left</br>
At each function which you created, go to <code>Settings</code> tab, choose <code>System</code> at Authentigation and click <code>Save Draft</code>

<li>Deploy app</li>
At the top of UI, click <code>REVIEW DRAFT & DEPLOY</code>
</ol>

<h2> Testing HTTPS endpoints</h2>
You can test each HTTPS endpoints with the following commands
<h3>/restaurants/getRestaurantsAutocomplete</h3>
command
<pre>
$curl https://ap-southeast-1.aws.data.mongodb-api.com/app/whatscooking-XXXXX/endpoint/restaurants/getRestaurantsAutocomplete?restname="burger"
</pre>
response
<pre>
[{"_id":"6095a34a7c34416a90d3212d","name":"Burger King","restaurant_id":"40370238"},{"_id":"6095a34a7c34416a90d3212e","name":"Burger King","restaurant_id":"40370167"},{"_id":"6095a34a7c34416a90d32135","name":"Burger King","restaurant_id":"40370239"},{"_id":"6095a34a7c34416a90d3214b","name":"Burger King","restaurant_id":"40370916"},{"_id":"6095a34a7c34416a90d32164","name":"Burger King","restaurant_id":"40370917"},{"_id":"6095a34a7c34416a90d32166","name":"Burger King","restaurant_id":"40372422"},{"_id":"6095a34a7c34416a90d3216b","name":"Burger King","restaurant_id":"40372618"},{"_id":"6095a34a7c34416a90d321b4","name":"Cozy Soup \u0026 Burger","restaurant_id":"40375839"},{"_id":"6095a34a7c34416a90d3228a","name":"Burger Barn Restaurant","restaurant_id":"40384486"}]
</pre>
<h3>/getRestaurants</h3>
command
<pre>
curl \
-H "Content-Type: application/json" \
-d '{"searchTerm": "burger ", "food": "", "operator": "text",    "dist": 1, "stars": 1, "cuisine": []}' \
https://ap-southeast-1.aws.data.mongodb-api.com/app/whatscooking-qztoq/endpoint/getRestaurants
</pre>

response
<pre>
{"aggString":"[{\"$search\":{\"text\":{\"query\":\"burger \",\"path\":\"name\",\"fuzzy\":{\"maxEdits\":2}}}},{\"$limit\":21},{\"$project\":{\"name\":1,\"cuisine\":1,\"borough\":1,\"location\":1,\"menu\":1,\"restaurant_id\":1,\"address.street\":1,\"stars\":1,\"review_count\":1,\"PriceRange\":1,\"sponsored\":1,\"score\":{\"$meta\":\"searchScore\"},\"highlights\":{\"$meta\":\"searchHighlights\"}}}]","restaurants":[{"_id":"6095a4864ba3a04a69a79eba","address":{"street":"Pearl Street"},"borough":"Manhattan","cuisine":"Hamburgers","name":"Burger Burger","restaurant_id":"41316784","location":{"type":"Point","coordinates":[-74.0105051,40.7040805]},"stars":3.5,"review_count":159,"menu":["Bacon burger","Santa Fe burger","Ahi Tuna burger","Cheeseburger","Loaded Fries","Mushroom swiss burger","Hickory burger","Classic burger","Fajita burger","Oldtimer with cheese","French Fries","Vegetarian burger"],"PriceRange":2,"score":3.3074374198913574},{"_id":"6095a34a7c34416a90d3212d","address":{"street":"Northern Boulevard"},"borough":"Queens","cuisine":"Hamburgers","name":"Burger King","restaurant_id":"40370238","location":{"type":"Point","coordinates":[-73.89707140000002,40.7543896]},"stars":3,"review_count":38,"menu":["Cheeseburger","Ahi Tuna burger","Chili Cheeseburger","Buffalo Fries","Vegetarian burger","Loaded Fries","French Fries","Classic burger","Triple layer burger","Oldtimer with cheese","Hickory burger","Oldtimer"],"PriceRange":2,"score":2.49027419090271}, ...}
</pre>

<h3>/restaurants/getFacets</h3>
command
<pre>
curl \
-H "Content-Type: application/json" \
-d '{"searchTerm": "burger", "food": "", "operator": "text", "dist": 1, "stars": 1, "cuisine": []}' \
https://ap-southeast-1.aws.data.mongodb-api.com/app/whatscooking-qztoq/endpoint/restaurants/getFacets
</pre>

response
<pre>
{"results":[{"count":{"lowerBound":183},"facet":{"cuisineFacet":{"buckets":[{"_id":"Hamburgers","count":105},{"_id":"American","count":69},{"_id":"Other","count":3},{"_id":"Jewish/Kosher","count":2},{"_id":"Pizza/Italian","count":2},{"_id":"Latin (Cuban, Dominican, Puerto Rican, South \u0026 Central American)","count":1},{"_id":"Mexican","count":1}]},"boroughFacet":{"buckets":[{"_id":"Manhattan","count":69},{"_id":"Brooklyn","count":47},{"_id":"Queens","count":36},{"_id":"Bronx","count":23},{"_id":"Staten Island","count":8}]}}}],"searchMetaStageString":"{\"$searchMeta\":{\"index\":\"facetIndex\",\"facet\":{\"operator\":{\"text\":{\"query\":\"burger\",\"path\":[\"name\",\"cuisine\"]}},\"facets\":{\"cuisineFacet\":{\"type\":\"string\",\"path\":\"cuisine\"},\"boroughFacet\":{\"type\":\"string\",\"path\":\"borough\"}}}}}","searchMetaStage":{"$searchMeta":{"index":"facetIndex","facet":{"operator":{"text":{"query":"burger","path":["name","cuisine"]}},"facets":{"cuisineFacet":{"type":"string","path":"cuisine"},"boroughFacet":{"type":"string","path":"borough"}}}}},"ok":true}
</pre>
<h3>/synonyms/getFoodSynonyms</h3>
🚧

<h2>To Run This Application....</h2>

1. Clone the repo.
2. Navigate inside `WhatsCooking` directory.
3. Run <code>npm install</code> .
4. Change HTTPS endpoint urls at <code>src/hooks/useHomeFetch.js</code> to your own ones.
5. Change HTTPS endpoint urls at <code>src/compenents/SearchBar.js</code> to your own one.
6. Change MongoDB Connectionstring at <code>src/pages/IndexPage.js</code> to your own one.
7. Run <code>npm start </code> .

---
<h2>React Components....</h2>

<p float="left">
    <img src="Main.png" width="550"  />
</p>

<h2>Using Realm as Your Serverless Backend....</h2>
<p>What's Cooking uses HTTP services in Realm to create 5 APIs to allow you to query for your restaurant data over HTTP: </p>

- `GetRestaurantsEndPoint` called from the `useHomeFetch.js` hook.
- `GetFacetsEndpoint` called from the `useHomeFetch.js` hook.
- `Suggestions_AC_Endpoint` called from the `SearchBar.js` component.
- `getSynonyms` called in the `SynonymsPage.js`.
<p float="left">
    <img src="RestaurantsFunction.png" width="550"  />
</p>
<hr>
<p float="left">
    <img src="FacetFunction.png" width="550"  />
</p>
<hr>
<p float="left">
    <img src="ACFunction.png" width="550"  />
</p>
<hr>
<p float="left">
    <img src="SynonymsFunction.png" width="550"  />
</p>
<hr>
Find the Realm application and code for these webhooks in the <code>WhatsCookingRealm</code> folder.</p>

<h5>If you have any questions or feedback about this repo, feel free to create an Issue or PR in this repo or reach out to me on Twitter @YouOldMaid.</h5>

<h4>Also please join our online <a href="https://developer.mongodb.com/community/forums/">MongoDB Community</a> to interact with our product and engineering teams along with thousands of other MongoDB and Realm users. <br/><br/>Have fun and happy coding!</h4></h4>
