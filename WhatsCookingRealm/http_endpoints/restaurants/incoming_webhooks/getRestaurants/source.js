
exports = async function(payload, response) {
  console.log("IN GETRESTAURANTS POST REQUEST");
  
    // Querying a mongodb collection:
    const collection = context.services.get("mongodb-atlas").db("whatscooking").collection("restaurants");

  if (!payload.body) {
     return({
            ok:false,
            msg:"No payload body"
          });
  }
     
    let searchParameters = EJSON.parse(payload.body.text());
    console.log(JSON.stringify(searchParameters));
    
     
    let{ arg, operator, functionScore, dist, path, borough, stars, cuisine } = searchParameters;
    
    console.log("CUISINE: ", cuisine);
    let pathArray = ["name"];
    
    if (path){
      pathArray = path;
    }
   
    if (!arg &&(cuisine.length===0)){ return[];}
    
    let distance = 1609;
    const METERS_PER_MILE = 1609.0;
  

    if (dist){
      dist = parseFloat(dist);
      distance = dist * METERS_PER_MILE;
    }
    
    if (stars){
      stars = parseFloat(stars);
    }
    
   
    console.log("distance: ", distance);
   
   //MongoDB NYC Office
   const lat = 40.76289;
   const long = -73.98474;
   
    let calledAggregation = [];
     
    let searchStage = getSearchStage(arg, pathArray, operator, distance, borough, cuisine, stars, functionScore);
    let limitStage = getLimitStage(operator, borough);
    let projectStage = getProjectStage();
     
    calledAggregation.push(searchStage);
    calledAggregation.push(limitStage);
    calledAggregation.push(projectStage);
        
    let aggString = JSON.stringify(calledAggregation);
    
    let searchStageString = JSON.stringify(searchStage);
    let limitStageString = JSON.stringify(limitStage);
    let projectStageString = JSON.stringify(projectStage);
   
   
    const results = await collection.aggregate(calledAggregation).toArray();
      
    return {
      aggString:aggString,
      restaurants: results,
      searchStage:searchStageString,
      limitStage:limitStageString,
      projectStage:projectStageString,
      ok:true
    }
  
};

//******************* HELPER FUNCTIONS **********************

const getSearchStage = (arg, pathArray, operator, distance, borough, cuisine, stars, functionScore) => {
  let searchStage = {};
  let geoSearchObject = {};
  let filterArray = [];   // to be used if there is a borough in payload body
  let cuisineArray =[];
  let textObject ={};
  let scoreStage ={};
  // GET HIGHLIGHTS ACROSS MENU
  let highlightObject = {
    highlight:{
      path:'menu'
    }
  };
  
  if (functionScore === 'function'){
    scoreStage={
      function:{
        multiply:[
          {score: "relevance"},
          { path:{
              value:'stars',
              undefined:1
            }},
          { path:{
            value:'sponsored',
            undefined:1
            }}
          ]}
          
    };    // END FUNCTION STAGE*******************
  }  
 
  if (arg){
    if (arg === "noodles 'pad thai' spaghetti pasta udon ramen macaroni fettuccine 'lo mein' 'chow mein' capellini" && pathArray.includes("menu")){
      console.log("DID I GET HERE?");
      textObject = {
        text:{
          query:arg,
          path: pathArray,
          fuzzy:{
            maxEdits:1
          }
        }
      };
    } else {
      textObject = {
        text:{
          query:arg,
          path: pathArray,
          fuzzy:{
            maxEdits:2
          }
        }
      };
    }
  }
          
   // console.log("SCORE STAGE", JSON.stringify(textObject));

   if (operator === 'text' && !borough && (cuisine &&cuisine.length ===0)){      // MOST BASIC SEARCH
    console.log(" BASIC SEARCH ");
      searchStage = { 
        $search: {}
      };
    if (arg && (functionScore ==='function')){
      textObject.text.score=scoreStage;    // ADDED SCORESTAGE FOR FUNCTION SCORE****************************
    }
    searchStage.$search = textObject;
    searchStage.$search.highlight={path:'menu'};
    console.log("SEARCH STAGE", JSON.stringify(searchStage));
    return searchStage;
   }                      // *************END MOST BASIC SEARCH******************** 

   
    searchStage = {       // WILL NEED TO USE COMPOUND OPERATOR for FILTERS, GEO, and RANGE. TEXT OBJECT REMAINS THE SAME
      $search:{
        compound: {
          must:[
          //  textObject
          ]
        }
      }
    };
    
    if (arg){
      searchStage.$search.compound.must.push(textObject);
    }
     if (functionScore ==='function'){
        searchStage.$search.compound.score=scoreStage;    // ADDED SCORESTAGE FOR FUNCTION SCORE****************************
      }
    
    if (cuisine && cuisine.length !==0){
      let cuisineObject = {
        text:{
          query:cuisine,
          path: "cuisine"
        }
      };

       searchStage.$search.compound.must.push(cuisineObject);
    }     // ***************************END OF CUISINE STAGE************************
   
   // OPERATOR IS 'NEAR' or 'GEOWITHIN' - NEED TO USE COMPOUND OPERATOR
   if (operator === 'near'){
     geoSearchObject = {
        "near":{
    	       "origin":{
    	          "type":"Point",
    	          "coordinates": [ -73.98474, 40.76289 ],
    	        },
    	      "pivot":1609,
    	       path: "location" 
    	     }
     };
     searchStage.$search.compound.must.push(geoSearchObject);
   }
   else if (operator ==='geoWithin') {     // OPERATOR IS 'GEOWITHIN'
     geoSearchObject ={ 
        geoWithin:{
          circle:{
            center:{
              type:"Point",
              coordinates:[-73.98474, 40.76289]
              },
              radius:distance
            },
            path:"location"
        }
      };
   
     searchStage.$search.compound.must.push(geoSearchObject);
   }
    
    if (stars){
      let rangeObject ={
        range:{
          gte:stars,
          path:"stars"
        }
      };
      searchStage.$search.compound.must.push(rangeObject);
    }
    
     if (!borough){
      searchStage.$search.highlight={path:'menu'};
      console.log("SEARCH STAGE", JSON.stringify(searchStage));
      return searchStage;
     }
   
   else {   // INCORPORATE FILTER FOR BOROUGH AND OR STARS ****************
    if (borough){
      let filterObject ={
        text:{
          query:borough,
          path:"borough"
        }
      };
      filterArray.push(filterObject);
    }
    
    
    searchStage.$search.compound.filter=filterArray;
    searchStage.$search.highlight={path:'menu'};
    console.log("SEARCH STAGE", JSON.stringify(searchStage));
    return searchStage;
    
   }
}

// ******************HELPER FUNCTION *******************************

const getLimitStage = (operator, borough) =>{
  let limitStage = {'$limit': 19};
  
  if (operator==="geoWithin"){
    limitStage = { '$limit': 15 };
  }
  return limitStage;
}

// ******************HELPER FUNCTION *******************************

const getProjectStage = ()=>{
  let projectStage = 
     {
          '$project': {
              'name': 1, 
              'cuisine': 1, 
              'borough': 1, 
              'location': 1, 
              'menu':1,
              'restaurant_id': 1, 
              'address.street': 1, 
              'stars':1,
              'review_count':1,
              'PriceRange':1,
              'sponsored':1,
              'score': {
                '$meta': 'searchScore'
              },
              highlights:{
                $meta:'searchHighlights'
              }
          }
      };
  return projectStage;
}
