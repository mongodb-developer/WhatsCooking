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
                      className="object-contain w-3/4 mx-auto my-auto mb-2"
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
                    className="px-4 py-2 bg-gradient-to-r from-san-juan-400 to-deep-cerulean-600 text-white rounded h-12 my-auto flex items-center space-x-4 justify-center"
                    type="button"
                    onClick={() => {
                      if (syndoc.mappingType === "explicit")
                        setWordToUpdate(syndoc.input[0]);
                      else setWordToUpdate(syndoc.synonyms[0]);

                      console.log("UNDERSCOREID: ", syndoc._id.$oid);

                      setSynID(syndoc._id.$oid);
                      editSynonym(synID, index);
                      console.log(synID);
                    }}
                  >
                    <div className="flex items-center justify-center w-16 h-16 text-4xl rounded-full bg-white border border-deep-cerulean-700">
                      ✏️
                    </div>
                  </button>

                  <button
                    className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-900 text-white rounded h-12 my-auto flex items-center space-x-4 justify-center"
                    onClick={() => deleteSynonym(Object.values(syndoc._id))}
                    type="button"
                  >
                    <div className="flex items-center justify-center w-16 h-16 text-4xl rounded-full bg-white border border-red-700">
                      ❌
                    </div>
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
