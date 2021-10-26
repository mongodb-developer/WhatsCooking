import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MenuIcon from "../images/restaurant-menu.png";

const SynonymForm = ({
  setShowSynForm,
  setSubmissionMessage,
  source,
  values,
  setCardIDToUpdate,
}) => {
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
    <>
      {source === "page" ? (
        <div className="text-center text-3xl mx-32 my-10 justify-center">
          <div className="text-2xl mx-auto text-center">
            Synonyms allow you to create a relationship between one term and
            another. <br></br>Add a synonym to your menu search by adding terms
            and specifying mappingType to "equivalent" or "explicit."
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
                <div className="font-body text-2xl mx-auto my-auto">
                  Equivalent
                </div>
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
                <div className="font-body text-2xl mx-auto my-auto">
                  Explicit
                </div>
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
      ) : (
        <div className="text-center text-xl mx-32 my-4 justify-center">
          <form
            className="flex flex-col my-10 w-full justify-between border border-gray-300 shadow p-3 rounded"
            onSubmit={handleSubmit(addSynonym)}
          >
            <div className="flex justify-evenly space-x-6">
              <div className="flex flex-col w-1/2">
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
                  <p className="text-fuchsia-600 text-right">
                    Cannot be empty.
                  </p>
                )}

                <div id="switch" className="flex mx-auto my-auto">
                  <div className="font-body text-xl mx-auto my-auto">
                    Equivalent
                  </div>
                  <label htmlFor="toggle-switch">
                    <input
                      type="checkbox"
                      name="isEquivalent"
                      id="toggle-switch"
                      defaultChecked={values.isEquivalent}
                      className="cursor-pointer mx-16 h-10 my-10 w-24 rounded-full appearance-none bg-gray-800 border-4 border-black checked:bg-gray-800 transition duration-200 relative"
                      onChange={() => setEquivalentMapping(!equivalentMapping)}
                      {...register("isEquivalent")}
                    />
                  </label>
                  <div className="font-body text-xl mx-auto my-auto">
                    Explicit
                  </div>
                </div>
              </div>

              <div id="synonyms" className="flex flex-col">
                <textarea
                  rows="4"
                  cols="24"
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
                type="button"
                className="px-6 py-2 text-center text-white font-body bg-yellow-400 rounded bg-gradient-to-r from-san-juan-500 via-san-juan-400 to-deep-cerulean-700 font-bold"
                onClick={() => {
                  // let synString2 = values.synString;
                  // let synArray = values.synString
                  //   .split(",")
                  //   .map((item) => item.trim());
                  // if (values.isEquivalent === true) {
                  //   synArray = synArray.shift();
                  //   synString2 = synArray?.join(", ");
                  //   console.log("SYNSTRING2: " + synString2);
                  // }

                  setValue("word", values.word);
                  setValue("isEquivalent", values.isEquivalent);
                  setValue("synonyms", values.synString);
                }}
              >
                LOAD VALUES
              </button>
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
          <pre className="text-left">{JSON.stringify(watch(), null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default SynonymForm;
