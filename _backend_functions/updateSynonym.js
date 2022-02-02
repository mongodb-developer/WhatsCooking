exports = async function(payload, response) {
   // This is a POST from Restaurant Finder Synonym Update
   console.log("IN UPDATE SYNONYM");
   
 
  // Get a reference to the synonyms database and collection...
     var collection = context.services.get("mongodb-atlas").db("whatscooking").collection("menu_synonyms");
     
     const id=payload.query.id || '';
     console.log("ID: " + id);
  
  if (payload.body) {
    
     
     // Parse the body to get the content document...
    let synonym_update_doc = EJSON.parse(payload.body.text());
    console.log("Parsed Payload body: ", JSON.stringify(synonym_update_doc));
    
    
    let mappingType = "explicit";       // by default, can be overwritten to 'equivalent'
    const inputWord = synonym_update_doc.word;
    let SYN_UPDATE_DOC ={};
    
    let synString = synonym_update_doc.synonyms;
    let synArray =  synString.split(',').map(item=>item.trim());
    
    
    if (synonym_update_doc.isEquivalent){     // for equivalent mappingType synonyms
      mappingType = "equivalent";
    
        SYN_UPDATE_DOC ={
          mappingType,
          synonyms:synArray,
          date_inserted:synonym_update_doc.date_inserted,
          date_updated:new Date(),
          editable:true
        };
     } else{
      let input = [inputWord];
      SYN_UPDATE_DOC ={
          input,
          mappingType,
          synonyms: synArray,
          date_inserted:synonym_update_doc.date_inserted,
          date_updated:new Date(),
          editable:true
      };
    }
    

    try{
          console.log( "UPDATING!");
       
          // Insert the new content...
          SYN_UPDATE_DOC._id = BSON.ObjectId(id);
          await collection.replaceOne({_id:BSON.ObjectId(id)}, SYN_UPDATE_DOC);  //{_id:BSON.ObjectId(id)}
        
      } catch (err){
          console.log(err);
          return {"OK":false};
      }
  }
      
    else{
    console.log("NO PAYLOAD.BODY");
    return {"OK": false};
   
    
   }

  return  {"OK": true};
}
  