// This function is the webhook's request handler.
exports = async function(payload, response) {
  console.log("Returning all food synonyms");
 

  // Querying a mongodb service:
  const collection = context.services.get("mongodb-atlas").db("whatscooking").collection("menu_synonyms");
  
  const foodSynonyms = await collection.find({}).toArray();
  

 return {foodSynonyms, ok:true};
};
