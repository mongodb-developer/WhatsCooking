exports = function(searchTerm, food, foodArray, pathArray, operator, distance, borough, cuisine, stars, functionScore){
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
 
  let returnedObjectFromBuildMust = context.functions.execute("buildCompoundMust", searchTerm, food, foodArray, operator, distance);
  filterArray = context.functions.execute("buildCompoundFilter", stars, cuisine, borough);

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
    
};

 // HELPER FUNCTION TO SEE IF OBJECTS ARE EMPTY
function isEmpty(obj){
  for (var key in obj){
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
