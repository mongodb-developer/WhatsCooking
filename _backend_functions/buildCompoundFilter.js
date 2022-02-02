exports = function(stars, cuisine, borough){
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
 
};


 // HELPER FUNCTION TO SEE IF OBJECTS ARE EMPTY
function isEmpty(obj){
  for (var key in obj){
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
