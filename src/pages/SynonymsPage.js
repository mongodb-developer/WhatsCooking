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
    console.log("SYNONYMS", storedSynonyms);
  };
  useEffect(() => {
    getSynonyms();
  }, []); // add all external values your effect function depends on - none in this case

  return (
    <>
      <div className="text-4xl text-center my-8">Synonyms</div>

      <SynonymForm />
    </>
  );
};

export default SynonymsPage;
/**<div className="flex justify-center items-center mt-10"> */
