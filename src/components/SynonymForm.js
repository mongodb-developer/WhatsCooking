import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MenuIcon from "../images/restaurant-menu.png";

const SynonymForm = ({ setShowSynForm, setSubmissionMessage }) => {
  const [equivalentMapping, setEquivalentMapping] = useState(true);
  const { register, handleSubmit, watch, control, formState, reset, setValue } =
    useForm({
      word: "",
      synonyms: "",
      isEquivalent: true,
    });

  const { errors } = formState;

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
      setShowSynForm(false);
      setSubmissionMessage(`You successfully added synonyms for ${data.word}.`);
      reset({
        word: "",
        synonyms: "",
        isEquivalent: true,
      });
      //history.replace("/");
    }); // push goes back to previous page - so replace // fetch returns a promise
  };

  return (
    <div className="text-center text-3xl mx-32 my-10 justify-center">
      <div className="text-2xl mx-auto text-center">
        Synonyms allow you to create a relationship between one term and
        another. <br></br>Add a synonym to your menu search by adding terms and
        specifying mappingType to "equivalent" or "explicit."
      </div>
      <form
        className="flex my-10 w-full justify-between px-10 border border-gray-300 shadow p-3 rounded"
        onSubmit={handleSubmit(addSynonym)}
      >
        <div id="map" className="w-48 text-center my-auto">
          <img
            src={MenuIcon}
            alt="restaurant"
            className="object-contain w-3/4 mx-auto my-auto"
          />
        </div>
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
          {errors.word && (
            <p className="text-fuchsia-600 text-right">Cannot be empty.</p>
          )}

          <div className="flex mx-auto my-auto">
            <div className="font-body text-2xl mx-auto my-auto">Equivalent</div>
            <label htmlFor="toggle-switch">
              <input
                type="checkbox"
                name="isEquivalent"
                id="toggle-switch"
                defaultChecked={true}
                className="cursor-pointer mx-16 h-10 my-10 w-24 rounded-full appearance-none bg-gray-800 border-4 border-black checked:bg-gray-800 transition duration-200 relative"
                onChange={() => setEquivalentMapping(!equivalentMapping)}
                {...register("isEquivalent")}
              />
            </label>
            <div className="font-body text-2xl mx-auto my-auto">Explicit</div>
          </div>
        </div>

        <div id="synonyms" className="flex flex-col w-1/3">
          <textarea
            rows="4"
            cols="30"
            className="border border-gray-400 p-5 outline-none focus:border-tolopea-400 rows=10"
            placeholder={`synonyms separated by a comma...`}
            name={`synonyms`}
            {...register(`synonyms`, { required: true })}
          />
          {errors.synonyms && (
            <p className="text-fuchsia-600 text-center mb-2">
              Cannot be empty.
            </p>
          )}
          <input
            className="px-8 py-2 mb-2 bg-gradient-to-r from-san-juan-500 via-san-juan-400 to-deep-cerulean-700 text-white rounded h-12 my-auto"
            type="submit"
          />
          <button
            className="px-8 py-2 bg-gradient-to-r from-red-700 to-red-900 text-white rounded h-12 my-auto flex items-center space-x-4 justify-center"
            onClick={() => setShowSynForm(false)}
            type="button"
          >
            <span className="my-auto">Cancel</span>
            <div className="flex items-center justify-center w-16 h-16 text-4xl rounded-full bg-white">
              ❌
            </div>
          </button>
        </div>
      </form>

      <pre className="text-left">{JSON.stringify(watch(), null, 2)}</pre>
    </div>
  );
};

export default SynonymForm;
