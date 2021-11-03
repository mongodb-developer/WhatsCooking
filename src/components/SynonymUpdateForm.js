import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SynonymUpdateForm = ({
  values,
  setCardIDToUpdate,
  synID,
  setSynID,
  setSubmissionMessage,
}) => {
  const [equivalentMapping, setEquivalentMapping] = useState(true);

  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      word: values.word,
      synonyms: values.synString,
      isEquivalent: values.isEquivalent,
    },
  });

  const { errors } = formState;

  const updateSynonym = (data) => {
    console.log("In updateSynonym function");
    const UPDATE_ENDPOINT = `https://webhooks.mongodb-realm.com/api/client/v2.0/app/restaurantfinderkeynote-jinvs/service/synonyms/incoming_webhook/updateSynonym?id=${synID}`;
    setSynID(0);
    setCardIDToUpdate(0);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(UPDATE_ENDPOINT, requestOptions).then(() => {
      console.log("POSTED TO UPDATE ENDPOINT");
      setSubmissionMessage(
        `You successfully updated synonyms for ${data.word}`
      );
    });
  };

  return (
    <div className="text-center text-xl my-4 justify-center">
      <form
        className="flex flex-col my-10 w-full justify-between border border-gray-300 shadow p-3 rounded"
        onSubmit={handleSubmit(updateSynonym)}
      >
        <div className="flex justify-between space-x-6">
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
                placeholder={values.word}
                name="word"
                autoComplete="off"
                {...register("word", { required: true })}
                className="border-b-2 border-gray-400 focus:border-green-800 w-full flex-1 py-2 placeholder-gray-300 outline-none font-body text-2xl"
              />
            </div>
            {errors.word && (
              <p className="text-fuchsia-600 text-right">Cannot be empty.</p>
            )}

            <div id="switch" className="flex flex-col mx-auto my-auto">
              {/* <div className="font-body text-xl mx-auto my-auto">
                Equivalent
              </div> */}
              <label htmlFor="toggle-switch">
                <input
                  type="checkbox"
                  name="isEquivalent"
                  id="toggle-switch"
                  defaultChecked={values.isEquivalent}
                  className="cursor-pointer mx-16 h-10 mt-10 mb-6 w-24 rounded-full appearance-none bg-gray-800 border-4 border-black checked:bg-gray-800 transition duration-200 relative"
                  onChange={() => setEquivalentMapping(!equivalentMapping)}
                  {...register("isEquivalent")}
                />
              </label>
              <div className="font-body text-xl mx-auto my-auto mb-4">
                Equivalent --- Explicit
              </div>
            </div>
          </div>

          <div id="synonyms" className="flex flex-col">
            <textarea
              rows="4"
              cols="20"
              className="border border-gray-400 p-5 outline-none focus:border-tolopea-400 rows=10"
              placeholder={values.synString}
              name={`synonyms`}
              {...register(`synonyms`, { required: true })}
            />
            {errors.synonyms && (
              <p className="text-fuchsia-600 text-center mb-2">
                Cannot be empty.
              </p>
            )}
          </div>
        </div>
        <div className="space-x-8 justify-center flex mr-6">
          <button
            className="px-8 py-2 bg-gradient-to-r from-green-700 via-mongo-500 to-mongo-800 text-white rounded h-12 my-auto flex items-center space-x-4 justify-center"
            type="submit"
          >
            <div className="flex items-center justify-center w-16 h-16 text-4xl rounded-full bg-white border border-deep-cerulean-700">
              👌
            </div>
          </button>
          <button
            className="px-8 py-2 bg-gradient-to-r from-red-700 to-red-900 text-white rounded h-12 my-auto flex items-center space-x-4 justify-center"
            onClick={() => setCardIDToUpdate(0)}
            type="button"
          >
            <div className="flex items-center justify-center w-16 h-16 text-4xl rounded-full bg-white border border-red-700">
              ❌
            </div>
          </button>
        </div>
      </form>
      {/* <pre className="text-left">{JSON.stringify(watch(), null, 2)}</pre> */}
    </div>
  );
};

export default SynonymUpdateForm;
