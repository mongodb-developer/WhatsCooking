import React, { useState, useEffect } from "react";
import SynonymForm from "../components/SynonymForm";

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
      {/* <div className="flex flex-col w-full h-full bg-foodIdeas bg-contain bg-no-repeat bg-right-bottom bg-scroll"> */}
      <div className="grid grid-cols-2 gap-6 p-2 mt-10 px-20 md:grid-cols-2 md:gap-6">
        {loadedSynonyms.map((syndoc) => (
          <div className="flex text-center my-auto text-lg w-full px-6 py-6 overflow-auto  border border-black rounded-sm shadow-xl h-48 font-body">
            <>
              <div
                id="left-col"
                className="flex flex-col text-center my-auto text-lg w-1/4 px-6 py-3 overflow-auto rounded-sm h-auto font-body"
                key={syndoc._id}
                clickable
                synId={syndoc._id}
              >
                <h1 className="text-6xl mb-2"> ⚖️</h1>
                <h1 className="text-2xl">EQUIVALENT</h1>
              </div>

              <div id="right-col" className="my-auto text-center mx-auto w-3/4">
                {syndoc.mappingType === "explicit" && (
                  <h1 className="text-4xl mb-2 text-indigo-700 ">
                    {syndoc.input[0]}
                  </h1>
                )}
                {syndoc.synonyms.map((word) => (
                  <span className="text-xl px-4">{word}, </span>
                ))}
              </div>
            </>
          </div>
        ))}
      </div>

      <SynonymForm />
    </>
  );
};

export default SynonymsPage;
/**<div className="flex justify-center items-center mt-10"> */
