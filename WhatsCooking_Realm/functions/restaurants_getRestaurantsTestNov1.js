exports = async function(payload, response) {
  console.log("IN GETRESTAURANTS NOV1 POST REQUEST");
  
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
    if (!searchTerm && !food && (operator==="text") && (cuisine.length===0)){ 
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
    
    let pathArray = ["name", "cuisine"];
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
    let searchStage = context.functions.execute("buildSearchStage", searchTerm, food, foodArray, pathArray, operator, distance, borough, cuisine, stars, functionScore);
    let limitStage = {'$limit': 21};
    let projectStage = context.functions.execute("buildProjectStage");
     
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
      restaurantsCount : results.length,
      searchStage:searchStageString,        // sending back Strings instead of Objects to avoid BSON in the AggregationModal on the front end
      limitStage:limitStageString,
      projectStage:projectStageString,
      ok:true
    }
  
};
