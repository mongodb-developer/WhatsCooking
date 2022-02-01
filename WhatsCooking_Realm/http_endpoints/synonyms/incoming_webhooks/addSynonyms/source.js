exports = function(payload, response) {
  // This is a POST from Restaurant Finder Synonyms form to add to synomyms collection
  
  if (payload.body) {
     
     // Parse the body to get the content document...
    synonym_doc = EJSON.parse(payload.body.text());
     console.log("Parsed Payload body: ", JSON.stringify(synonym_doc));
    
    let mappingType = "explicit";       // by default, can be overwritten to 'equivalent'
    const inputWord = synonym_doc.word;
    let DOC_TO_INSERT ={};
    
    let synString = synonym_doc.synonyms;
    let synArray =  synString.split(',').map(item=>item.trim());
    
    
    if (synonym_doc.isEquivalent){     // for equivalent mappingType synonyms
      mappingType = "equivalent";
      synArray.unshift(inputWord);
        DOC_TO_INSERT ={
          mappingType,
          synonyms:synArray,
          date_inserted:new Date(),
          editable:true
        };
    } else{
       let input = [inputWord];
      DOC_TO_INSERT ={
          input,
          mappingType,
          synonyms: synArray,
          date_inserted:new Date(),
          editable:true
      };
    }
    
console.log("INSERTING: ", JSON.stringify(DOC_TO_INSERT));

// Get a reference to the todos database and collection...
    var collection = context.services.get("mongodb-atlas").db("whatscooking").collection("menu_synonyms");
  
    // Insert the new content...
    return collection.insertOne(DOC_TO_INSERT);
    
  }
  return {ok:false};
}
  