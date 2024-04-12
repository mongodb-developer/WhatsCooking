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
      
       
      let{ searchTerm, food, operator, functionScore, dist, borough, stars, cuisine } = searchParameters;
      
       // EMPTY SEARCH
      if (!searchTerm && !food && (operator==="text") && (cuisine.length===0) && (stars ===1)){   // added && (stars ===1) Jan 3
        return {
          aggString:"",
          restaurants: [],
          restaurantsCount : 0,
          searchStage:"empty",
          limitStage:"empty",
          projectStage:"empty",
          ok:true
        };
      }   
      
      let pathArray = "name";
      let foodArray=[];
      if (food){
        foodArray =  food.split(',').map(item=>item.trim());
      }
     
      let distance = 1609;
      const METERS_PER_MILE = 1609.0;
    
  
      if (dist){
        dist = parseFloat(dist);
        distance = dist * METERS_PER_MILE;
      }
      
      if (stars){
        stars = parseFloat(stars);
      }
      
     
     //MongoDB NYC Office
     const lat = 40.76289;
     const long = -73.984
     
      let calledAggregation = [];
      
  /******************************** NOW I HAVE ALL NECESSARY PARAMETERS --- CAN START BUILDING ***********************************/
       
      // call helper functions to build aggregation stages 
      let searchStage = buildSearchStage(searchTerm, food, foodArray, pathArray, operator, distance, borough, cuisine, stars, functionScore);
      let limitStage = {'$limit': 21};
      let projectStage = buildProjectStage();
       
      calledAggregation.push(searchStage);
      calledAggregation.push(limitStage);
      calledAggregation.push(projectStage);
      
      let aggString = JSON.stringify(calledAggregation);
      
      let searchStageString = JSON.stringify(searchStage);
      let limitStageString = JSON.stringify(limitStage);
      let projectStageString = JSON.stringify(projectStage);
      
      const results = await collection.aggregate(calledAggregation).toArray();

      response.setStatusCode(200)
      response.setBody = JSON.stringify({aggString: aggString, restaurants: results, restaurantsConut: results.length, searchStage: searchStageString, limitStage: limitStageString, projectStage: projectStageString, ok: true})
      response.setHeader(
        "Content-Type",
        "application/json"
      );
      console.log(response.setBody)

      return {
        aggString:aggString,
        restaurants: results,
        restaurantsCount : results.length,
        searchStage:searchStageString,        // sending back Strings instead of Objects to avoid BSON in the AggregationModal on the front end
        limitStage:limitStageString,
        projectStage:projectStageString,
        ok:true
      }
    
  };
  
  function buildSearchStage(searchTerm, food, foodArray, pathArray, operator, distance, borough, cuisine, stars, functionScore){
    console.log("BUILDSEARCHSTAGE FUNCTION");
  
  // BUCKLE IN. MOST DIFFICULT FUNCTION. BUILDING OUT SEARCH BUILDING BLOCKS 
    
    let searchStage = { 
          $search: {}
        };
   
    let scoreStage ={};
    let compoundObject = {			// I'll add must array and or filter array
        compound:{}
    };
   
    // these flags will determine is I use the compound operator or if it is a simple search
    let ObjectCounter = 0;  // will use to see if I need a compound operator
    let UseCompoundFilterOperator = false;
    let UseCompoundMustOperator = false;
    let UseFunctionScore = false;
    
    let filterArray = [];
    let mustArray = [];
    
    // ----------------------------- FUNCTION SCORE ------------------------------  
    if (functionScore === 'function'){
      UseFunctionScore = true;
      console.log("USING FUNCTION SCORE");
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
   
    let returnedObjectFromBuildMust = buildCompoundMust(searchTerm, food, foodArray, operator, distance);
    filterArray = buildCompoundFilter(stars, cuisine, borough);
  
    mustArray = returnedObjectFromBuildMust.mustArray;
    console.log("BACK IN BUILD SEARCH STAGE!!");
    console.log("MUST ARRAY RETURNED", JSON.stringify(mustArray));
    console.log("MUST ARRAY LENGTH", mustArray.length);
    console.log("SEARCH OBJECT RETURNED", JSON.stringify(returnedObjectFromBuildMust.searchObject));
    console.log("FILTER ARRAY", JSON.stringify(filterArray));
    console.log("FILTER ARRAY LENGTH", filterArray.length);
    
    if (mustArray.length === 1 && filterArray.length === 0){    // THE MOST BASIC SEARCH
      searchStage.$search = returnedObjectFromBuildMust.searchObject;
        if (UseFunctionScore && operator==='text'){
          searchStage.$search.text.score = scoreStage;
        }
        if (food) {
        searchStage.$search.highlight={path:'menu'};
      }
        console.log("FINAL SEARCH STAGE", JSON.stringify(searchStage));
        return searchStage;
    }
    
  // -------- IF MADE IT HERE, USING THE COMPOUND OPERATOR ----------------  
    
    if (filterArray.length >0){
      UseCompoundFilterOperator = true;
       compoundObject.compound.filter = filterArray;
    }
    
    if (mustArray.length > 0 ){    
      UseCompoundMustOperator = true;
      compoundObject.compound.must = mustArray;
    } 
    
    searchStage.$search = compoundObject;                      
    
    if (UseFunctionScore){                                      
        searchStage.$search.compound.score=scoreStage;
    }
      
    if (food) {
      searchStage.$search.highlight={path:'menu'};
    }
      
    console.log("SEARCH STAGE", JSON.stringify(searchStage));
    return searchStage;
      
  }
  
   // HELPER FUNCTION TO SEE IF OBJECTS ARE EMPTY
  function isEmpty(obj){
    for (var key in obj){
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  
  function buildProjectStage(arg){
    console.log("IN BUILDPROJECTSTAGE FUNCTION")
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
  
  function buildCompoundMust(searchTerm, food, foodArray, operator, distance){
     
     console.log("IN BUILDCOMPOUNDMUST FUNCTION");
      let searchObject = {};
      
      let geoObject = {}; // for geospatial Search options
      let textObject ={}; // for main search box - restaurant names
      let synObject = {}; // for 2nd search box - food items
      
      let mustArray =[];
    
      let ObjectCounter = 0;  // will use to see if I need a compound operator
      let UseCompoundMustOperator = false;
      
       if (searchTerm){
          ObjectCounter++;
        textObject = {
            text:{
              query:searchTerm,
              path: "name",
              fuzzy:{
                maxEdits:2
              }
            }
          };
          
          searchObject = textObject
      }
      
      if (food){
        console.log("FOODARRAY", foodArray);
        ObjectCounter++;
        console.log("MENU IN PATH - SEARCH FOR SYNONYMS");
        if (foodArray.length < 2){
          console.log("FOOD", food);
          synObject = {
            text:{
              query:food,
              path: "menu",
              synonyms: "MenuSynonyms"
            }
          };
        } else { // foodArray.length>2
          //console.log("FOODARRAY", foodArray);
           synObject = {
            text:{
              query:foodArray,
              path: "menu",
              synonyms: "MenuSynonyms"
            }
          };
        }
        searchObject = synObject;
      }
      
      
          if (operator !== 'text'){      // operator is either 'near' or 'geoWithin' - GEOJSON SEARCH
               ObjectCounter++;
                if (operator === 'near'){
             geoObject = {
                "near":{
                    "origin":{
                        "type":"Point",
                        "coordinates": [ -73.98474, 40.76289 ],
                    },
                    "pivot":1609,
                    path: "location" 
                }
             };
           }
           else if (operator ==='geoWithin') {     // OPERATOR IS 'GEOWITHIN'
            geoObject ={ 
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
            }
    
            searchObject = geoObject;
        }		// ---------------------------------------------------FOUND GEOOBJECT 
        
            console.log("OBJECT COUNTER", ObjectCounter);
            console.log("FROM BUILDMUST SEARCHOBJECT: ", JSON.stringify(searchObject));
    
    // 	// TEST IF NEED COMPOUND OPERATOR-------------------------------------------------------
    // 	if (ObjectCounter > 1) {      
    // 		UseCompoundMustOperator = true;
        
          if (!isEmpty(textObject)){
            mustArray.push(textObject);
          }
          
          if (!isEmpty(synObject)) {
            mustArray.push(synObject);
          }
          
          if(!isEmpty(geoObject)){
            mustArray.push(geoObject);
          }
               // NOW I HAVE FINISHED BUILDING compound.must
                console.log("MUST ARRAY", JSON.stringify(mustArray));
        
      // }
       
       console.log("MUSTARRAY from buildmust function", JSON.stringify(mustArray));
       
       return {
         mustArray: mustArray,
         searchObject: searchObject,
         textObject: textObject,
         synObject: synObject,
         geoObject: geoObject
       };
    
     
    }
  
  function buildCompoundFilter(stars, cuisine, borough){
      console.log("IN BUILDCOMPOUNDFILTER FUNCTION");
      
      
      let UseCompoundFilterOperator = false;
      
       let starsObject ={};
       let cuisineObject ={};
       let boroughObject={};
       
       let filterArray=[];    // this array is what I will build and return
       
       if (stars>1){
            UseCompoundFilterOperator= true;		// because using filter
    
               starsObject ={
                range:{
                  gte:stars,
                  path:"stars"
                }
            };
              console.log("STARS OBJECT: " + stars);
          }
    
          if (cuisine && cuisine.length !==0){
              UseCompoundFilterOperator= true;		// because using filter
            cuisineObject = {
                text:{
                  query:cuisine,
                  path: "cuisine"
                }
            };
        }    
        
        if (borough){
            UseCompoundFilterOperator= true;		// because using filter
              boroughObject ={
                text:{
                  query:borough,
                  path:"borough"
                }
              };
        }
    
        if (UseCompoundFilterOperator){
            if (!isEmpty(starsObject)){
              filterArray.push(starsObject);
            }
              if (!isEmpty(cuisineObject)) {
              filterArray.push(cuisineObject);
            }
            
            if(!isEmpty(boroughObject)){
              filterArray.push(boroughObject);
            }
            
        }  
          
          console.log("FILTER ARRAY RETURNED FROM BUILDCOMPOUNDFILTER", JSON.stringify(filterArray));
          
      
      return filterArray;
     
  }
