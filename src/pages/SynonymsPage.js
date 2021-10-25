import React, { useState, useEffect } from "react";
import SynonymForm from "../components/SynonymForm";
import OneWay from "../images/one-way.png";
import Icon from "../images/whatscooking.png";
import IdeasIcon from "../images/foodIdeas.png";
import axios from "axios";

const SynonymsPage = () => {
  const [loadedSynonyms, setLoadedSynonyms] = useState([]);
  const [showSynForm, setShowSynForm] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  const DELETE_ENDPOINT =
    "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/synonyms/incoming_webhook/removeSynonym";

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
  }, [deleteMessage, submissionMessage]); // add all external values your effect function depends on - none in this case

  const deleteSynonym = async (id) => {
    await axios.post(DELETE_ENDPOINT + `?id=${id}`);
    console.log("Deleting synonym");
    setDeleteMessage("Successfully deleted synonym.");
  };

  return (
    <>
      <div className="flex py-10 mx-24 mb-10 rounded bg-gradient-to-r from-san-juan-500 via-san-juan-400 to-deep-cerulean-700">
        <img
          src={Icon}
          alt="app logo"
          className="my-auto w-32 ml-20 pl-30"
        ></img>
        <div className="flex flex-col w-full">
          <div className="my-auto text-4xl font-bold text-white text-center font-body">
            Synonyms in Atlas Search
          </div>
        </div>
      </div>

      <div className="flex mx-40 text-2xl justify-center">
        <div className="my-auto text-center text-4xl">
          <div className="text-center text-4xl">
            You say "pop," and I say "coke?"{" "}
            <span className="text-6xl">🥤</span>
          </div>
          <div className="text-center">
            <br></br>With synonyms in Atlas Search, call it what you will.
          </div>

          <button
            type="button"
            className="flex justify-center my-auto mt-12 w-full mx-auto h-16 pl-4 space-x-4 text-4xl text-white rounded bg-gradient-to-r from-mongo-500 to-green-700 font-body hover:shadow-2xl hover:bg-green-700 focus:outline-none"
            onClick={() => {
              setShowSynForm(true);
              setSubmissionMessage("");
            }}
          >
            <span className="my-auto">Create Synonym</span>
            <div className="flex items-center justify-center w-16 h-16 text-6xl rounded-full bg-white">
              🍽️
            </div>
          </button>
        </div>

        <div className="w-1/3">
          <img
            src={IdeasIcon}
            alt="thinking"
            className="my-auto ml-20 pl-30"
          ></img>
        </div>
      </div>
      {submissionMessage !== "" && (
        <div
          className="flex justify-center px-2 w-4/5 mt-4 py-4 text-2xl mx-auto bg-yellow-300 rounded"
          onClick={() => setSubmissionMessage("")}
        >
          {submissionMessage}
        </div>
      )}

      {showSynForm && (
        <SynonymForm
          className="mx-auto justify-center"
          setShowSynForm={setShowSynForm}
          setSubmissionMessage={setSubmissionMessage}
        />
      )}

      <div className="grid grid-cols-2 gap-6 p-2 mt-10 px-20 md:grid-cols-2 md:gap-6">
        {loadedSynonyms.map((syndoc) => (
          <div className="flex text-center my-auto text-lg w-full px-6 py-6 overflow-auto  border border-black rounded-sm shadow-xl h-48 font-body">
            <>
              <div
                id="left-col"
                className="flex flex-col text-center my-auto text-lg w-1/4 px-6 py-3 overflow-auto rounded-sm h-auto font-body"
                key={syndoc._id}
              >
                {syndoc.mappingType === "equivalent" ? (
                  <>
                    <h1 className="text-6xl mb-2"> ⚖️</h1>
                    <h1 className="text-2xl">Equivalent</h1>
                  </>
                ) : (
                  <>
                    <img
                      src={OneWay}
                      alt="explicit"
                      className="object-contain w-1/3 mx-auto my-auto mb-2"
                    />
                    <h1 className="text-2xl">Explicit</h1>
                  </>
                )}
              </div>

              <div id="mid-col" className="my-auto text-center mx-auto w-3/4">
                {syndoc.mappingType === "explicit" && (
                  <h1 className="text-4xl mb-2 text-deep-cerulean-600 font-bold">
                    {syndoc.input[0]}
                  </h1>
                )}
                {syndoc.synonyms.map((word) => (
                  <span className="text-xl px-4">{word}, </span>
                ))}
              </div>
              {syndoc.editable && (
                <div id="right-col" className="flex flex-col space-y-4">
                  <button
                    className="flex items-center w-20 h-20 px-6 py-4 text-3xl text-white transition duration-300 rounded shadow-xl bg-deep-cerulean-600"
                    onClick={() => console.log("click!")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  <button
                    className="flex items-center w-20 h-20 px-6 py-4 text-2xl text-white transition duration-300 rounded shadow-xl bg-red-600 hover:bg-red-700"
                    onClick={() => deleteSynonym(Object.values(syndoc._id))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          </div>
        ))}
      </div>
      {deleteMessage !== "" && (
        <div
          className="flex justify-center px-2 w-4/5 mt-4 py-4 text-2xl mx-auto bg-san-juan-400 text-white rounded"
          onClick={() => setDeleteMessage("")}
        >
          {deleteMessage}
        </div>
      )}
    </>
  );
};

export default SynonymsPage;
/**<div className="flex justify-center items-center mt-10"> */
