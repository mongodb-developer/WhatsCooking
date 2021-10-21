import React, { useState, useEffect } from "react";
import SynonymForm from "../components/SynonymForm";
import FoodIdeasIcon from "../images/foodIdeas.png";

const SynonymsPage = () => {
  const [loadedSynonyms, setLoadedSynonyms] = useState([]);

  const getSynonyms = async () => {
    let storedSynonyms = await (
      await fetch(
        "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/synonyms/incoming_webhook/getFoodSynonyms"
      )
    ).json();
    console.log("STOREDSYNONYMS: " + storedSynonyms.foodSynonyms.length);
    setLoadedSynonyms(storedSynonyms.foodSynonyms);
  };
  useEffect(() => {
    getSynonyms();
    console.log("SYNONYMS", loadedSynonyms);
  }, []); // add all external values your effect function depends on - none in this case

  return (
    <>
      <div className="text-4xl text-center my-8">Synonyms</div>
      <div className="flex flex-col w-full h-full bg-foodIdeas bg-contain bg-no-repeat bg-right-bottom bg-scroll">
        <div className="grid grid-cols-3 gap-6 p-2 mt-10 md:grid-cols-4 md:gap-6">
          {loadedSynonyms?.map((doc) => {
            <div key={doc._id} className="w-1/8 text-lg font-bold ">
              {doc.mappingType}
            </div>;
          })}
        </div>

        <SynonymForm />
      </div>
    </>
  );
};

export default SynonymsPage;
/**<div className="flex justify-center items-center mt-10"> */
