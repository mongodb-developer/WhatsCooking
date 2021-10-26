import React, { useState } from "react";
import axios from "axios";
import OneWay from "../images/one-way.png";
import SynonymUpdateForm from "./SynonymUpdateForm";

const SynonymCard = ({
  syndoc,
  setDeleteMessage,
  setShowSynForm,
  setSubmissionMessage,
  setUpdateMessage,
  index,
}) => {
  const [cardIDToUpdate, setCardIDToUpdate] = useState(0);
  const [wordToUpdate, setWordToUpdate] = useState("");
  const [synID, setSynID] = useState(0);

  const DELETE_ENDPOINT =
    "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/synonyms/incoming_webhook/removeSynonym";

  const deleteSynonym = async (id) => {
    await axios.post(DELETE_ENDPOINT + `?id=${id}`);
    setDeleteMessage("Successfully deleted synonym.");
  };

  const editSynonym = async (id, index) => {
    console.log("IMPLEMENT EDIT FOR SYNONYM: " + id);
    setCardIDToUpdate(index);
    //   setSynID(id);

    setUpdateMessage(`Edit synonym for ${wordToUpdate}.`);
    console.log("IN EDIT SYNONYM");
    // console.log(cardIDToUpdate);
    console.log("SYNID: " + synID);
  };

  const synArray = syndoc.synonyms;
  const synString = synArray.join(", ");

  let isEquivalent = true;
  if (syndoc.mappingType === "explicit") isEquivalent = false;

  return (
    <>
      {
        (index = cardIDToUpdate ? (
          <SynonymUpdateForm
            className="mx-auto justify-center"
            setShowSynForm={setShowSynForm}
            setSubmissionMessage={setSubmissionMessage}
            setDeleteMessage={setDeleteMessage}
            setCardIDToUpdate={setCardIDToUpdate}
            synID={synID}
            setSynID={setSynID}
            values={{
              word: wordToUpdate,
              synString: synString,
              isEquivalent: isEquivalent,
            }}
          />
        ) : (
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
                <h1 className="text-xl">{synString}</h1>
              </div>
              {syndoc.editable && (
                <div id="right-col" className="flex flex-col space-y-4">
                  <button
                    className="flex items-center w-20 h-20 px-6 py-4 text-3xl text-white transition duration-300 rounded shadow-xl bg-deep-cerulean-600"
                    onClick={() => {
                      console.log("IN BUTTON PRESS");
                      if (syndoc.mappingType === "explicit")
                        setWordToUpdate(syndoc.input[0]);
                      else setWordToUpdate(syndoc.synonyms[0]);

                      console.log("IN BUTTON PRESS");
                      //   console.log("INDEX", index);
                      console.log("UNDERSCOREID: ", syndoc._id.$oid);

                      setSynID(syndoc._id.$oid);
                      editSynonym(synID, index);
                      console.log(synID);
                    }}
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
        ))
      }
    </>
  );
};

export default SynonymCard;
