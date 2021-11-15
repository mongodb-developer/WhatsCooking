import React, { useState, useEffect } from "react";
import SynonymForm from "../components/SynonymForm";
import SynonymCard from "../components/SynonymCard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

import Icon from "../images/whatscooking.png";
import IdeasIcon from "../images/foodIdeas.png";

const { REACT_APP_GETSYNONYMS } = process.env;

const SynonymsPage = () => {
  const [loadedSynonyms, setLoadedSynonyms] = useState([]);
  const [showSynForm, setShowSynForm] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const getSynonyms = async () => {
    let storedSynonyms = await (await fetch(REACT_APP_GETSYNONYMS)).json();
    setLoadedSynonyms(storedSynonyms.foodSynonyms);
  };
  useEffect(() => {
    getSynonyms();
  }, [deleteMessage, submissionMessage]); // add all external values your effect function depends on - none in this case

  const synonymIndex = {
    synonyms: [
      {
        analyzer: "lucene.standard",
        name: "MenuSynonyms",
        source: {
          collection: "menu_synonyms",
        },
      },
    ],
  };

  const synIndexString = JSON.stringify(synonymIndex, null, 2);

  return (
    <>
      <div
        id="banner"
        className="flex py-10 mx-24 mb-10 rounded bg-gradient-to-r from-san-juan-500 via-san-juan-400 to-deep-cerulean-700"
      >
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

      <div className="flex space-x-8 mx-16 text-2xl justify-center">
        <div className="w-1/4 my-auto">
          <img src={IdeasIcon} alt="thinking" className="my-auto"></img>
        </div>
        <div className="my-auto text-center">
          <div className="text-center text-3xl">
            You say "pop," and I say "coke?"{" "}
            <span className="text-6xl">🥤</span>
          </div>
          <div className="text-center text-2xl">
            <br></br>With synonyms in Atlas Search, call it what you will.
          </div>

          <button
            type="button"
            className="flex justify-center my-auto mt-12 w-4/5 mx-auto h-16 pl-4 space-x-4 text-3xl text-white rounded bg-gradient-to-r from-mongo-500 to-green-700 font-body hover:shadow-2xl hover:bg-green-700 focus:outline-none"
            // onClick={() => {
            //   setShowSynForm(true);
            //   setSubmissionMessage("");
            // }}
          >
            <span className="my-auto">Our Custom Synonyms</span>
            <div className="flex items-center justify-center w-16 h-16 text-6xl rounded-full bg-white">
              🍽️
            </div>
          </button>
        </div>

        <div className="w-auto ml-10 rounded text-base my-auto p-4">
          <SyntaxHighlighter language="javascript" style={okaidia}>
            {synIndexString}
          </SyntaxHighlighter>
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
          setDeleteMessage={setDeleteMessage}
        />
      )}

      <div className="grid grid-cols-3 gap-6 p-2 mt-10 px-20 md:grid-cols-3 md:gap-6">
        {loadedSynonyms.map((syndoc, index) => (
          <SynonymCard
            key={syndoc._id}
            syndoc={syndoc}
            setDeleteMessage={setDeleteMessage}
            setUpdateMessage={setUpdateMessage}
            setShowSynForm
            setSubmissionMessage={setSubmissionMessage}
            updateMessage={updateMessage}
            index={index}
          />
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
