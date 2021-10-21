import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const SynonymsPage = () => {
  const [loadedSynonyms, setLoadedSynonyms] = useState([]);
  const [equivalentMapping, setEquivalentMapping] = useState(true);
  const { register, handleSubmit, watch, control, errors, reset, setValue } =
    useForm({
      word: "",
      synonyms: [],
      mapping: "equivalent",
    });

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

  const addSynonym = (data) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/synonyms/incoming_webhook/addSynonyms",
      requestOptions
    ).then(() => {
      console.log("SUBMITTED SYNONYM!!");
      //history.replace("/");
    }); // push goes back to previous page - so replace // fetch returns a promise
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <>
      <div className="text-4xl text-center my-8">Synonyms</div>

      <form
        className="flex my-24 w-3/4 justify-between ml-20 border border-gray-300 shadow p-3 rounded "
        onSubmit={handleSubmit(addSynonym)}
      >
        <div className="flex flex-col w-1/3">
          <div className="flex items-center">
            <label
              htmlFor="word"
              className="inline-block text-right mr-6 w-20 font-bold font-body text-2xl"
            >
              Word:
            </label>
            <input
              type="text"
              placeholder="word"
              name="word"
              autoComplete="off"
              {...register("word", { required: true })}
              className="border-b-2 border-gray-400 focus:border-green-800 w-full flex-1 py-2 placeholder-gray-300 outline-none font-body text-2xl"
            />
          </div>

          <label htmlFor="toggle-switch">
            <input
              type="checkbox"
              name="mapping"
              id="toggle-switch"
              defaultChecked={true}
              className="cursor-pointer mx-24 h-10 my-10 w-24 rounded-full appearance-none bg-gray-800 border-4 border-black checked:bg-gray-800 transition duration-200 relative"
              onChange={() => setEquivalentMapping(!equivalentMapping)}
              {...register("mapping")}
            />
          </label>

          <div className="font-body text-2xl mx-4">Equivalent --- Explicit</div>
        </div>
        <div id="synonyms">
          <textarea
            rows="6"
            cols="20"
            className="border border-gray-400 p-5 outline-none focus:border-tolopea-400 rows=10"
            placeholder={`synonyms separated by a comma...`}
            name={`synonyms`}
            {...register(`synonyms`)}
          />
        </div>

        <input
          className="px-8 py-4 bg-indigo-800 text-white rounded h-16 my-auto"
          type="submit"
        />
      </form>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </>
  );
};

export default SynonymsPage;
/**<div className="flex justify-center items-center mt-10"> */
