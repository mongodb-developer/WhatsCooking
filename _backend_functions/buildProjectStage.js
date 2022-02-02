exports = function(arg){
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
 