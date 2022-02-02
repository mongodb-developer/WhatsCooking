 // HELPER FUNCTION TO SEE IF OBJECTS ARE EMPTY
function isEmpty(obj){
  for (var key in obj){
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}


exports = function(searchTerm, food, foodArray, operator, distance){
 
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

 
};