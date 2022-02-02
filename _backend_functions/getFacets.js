
exports = async function(payload, response) {
  console.log("IN GETFACETS POST REQUEST");
  
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
    
     
    let{ searchTerm, food, operator, dist, stars, borough, cuisine } = searchParameters;
    
    let pathArray = ["name", "cuisine"];
    let distance = 1609;
    const METERS_PER_MILE = 1609.0;
    //const METERS_PER_KM = 1000;
    
    let foodArray =  [];
    if (food){
      foodArray = food.split(',').map(item=>item.trim());
    }
  
    if (stars){
      stars = parseFloat(stars);
      console.log("STARS", stars);
    }
    
    if (dist){
      dist = parseFloat(dist);
      distance = dist * METERS_PER_MILE;        // changed to km
    }
   
  // NOW I CAN BUILD query
  let synObject={};
  let geoSearchObject = {};
  let textObject ={};
  let compoundObject={};
  let starsObject ={};
  let filterArray=[]; 
  
  let facetOperatorObject={};
  
  let ObjectCounter = 0;


  if (searchTerm){
    
    ObjectCounter++;
    textObject = {
        text:{
          query:searchTerm,
          path: pathArray,
          // fuzzy:{
          //  maxEdits:2
          // }
        }
      };
      facetOperatorObject = textObject;
  }
  
  if (foodArray.length>0){
    console.log("MENU - LOOK FOR SYNONYMS");
    console.log(foodArray.length);
    console.log(JSON.stringify(foodArray));
    
    ObjectCounter++;
    synObject = {
      text:{
        query:foodArray,
        path: "menu",
        synonyms:"MenuSynonyms"
      }
    };
    facetOperatorObject = synObject;
    console.log(facetOperatorObject);
  } 
  
  if (operator!=='text'){
    ObjectCounter++;
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
      } else {
        geoSearchObject ={ 
          geoWithin:{
            circle:{
              center:{
                type:"Point",
               "coordinates": [ -73.98474, 40.76289 ],
                },
                radius:distance
                // radius:dist
              },
              path:"location"
          }
        };
      }
      facetOperatorObject = geoSearchObject;
  }

  if ((ObjectCounter > 1 ) || (stars>1)){     
      compoundObject = {
        compound:{
          must:[
            //  textObject, synObject, geoSearchObject
            ],
          filter:[
            // filterArray
            ]
        }
      };
      
      if (!isEmpty(textObject)){
        compoundObject.compound.must.push(textObject);
      }
      
      if (!isEmpty(synObject)) {
        compoundObject.compound.must.push(synObject);
      }
      
      if(!isEmpty(geoSearchObject)){
        compoundObject.compound.must.push(geoSearchObject);
      }
  
  
    filterArray = context.functions.execute("buildCompoundFilter", stars, cuisine, borough);
    if (filterArray.length>0){
      compoundObject.compound.filter = filterArray;
    }
      
    facetOperatorObject= compoundObject;
    }       // NOW I HAVE FINISHED BUILDING facetOperatorObject
    
 
  	
    
    console.log("OPERATOR ", JSON.stringify(facetOperatorObject));
    const facetOperatorString = JSON.stringify(facetOperatorObject);
    const searchMetaStage = { 
      "$searchMeta": {
        index: 'facetIndex',
          "facet": {
            "operator": facetOperatorObject,
          "facets":{
            "cuisineFacet": {
              "type": "string",
              "path": "cuisine"
            },
            "boroughFacet" : {
              "type" : "string",
              "path" : "borough"
            }
          }}
        }
      };
      
    const searchMetaStageString = JSON.stringify(searchMetaStage);
   
    const results = await collection.aggregate([
      searchMetaStage
    ]).toArray();
    
    return {
      results:results,
      searchMetaStageString: searchMetaStageString,
      searchMetaStage:searchMetaStage,
      ok:true
    }
    
    
};


// HELPER FUNCTION TO SEE IF OBJECTS ARE EMPTY
function isEmpty(obj){
  for (var key in obj){
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

