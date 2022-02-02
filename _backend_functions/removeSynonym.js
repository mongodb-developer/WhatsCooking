exports = async function(payload) {
    console.log("Removing bundle...");

    const id = payload.query.id || '';
    
    console.log(BSON.ObjectId(id));

    let collection = context.services.get("mongodb-atlas").db("whatscooking").collection("menu_synonyms");

    return collection.deleteOne({_id:BSON.ObjectId(id)});
 

};