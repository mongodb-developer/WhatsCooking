import React, { useState, useContext, useEffect } from "react";
import { SearchStageContext } from "../store/SearchStageContext";
import { SearchParametersContext } from "../store/SearchParametersContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AggregationSideBar = () => {
  const { geoString, geoObject, boroughObject, cuisineObject, starsObject } =
    useContext(SearchStageContext);

  const { searchTerm, food, operator, borough, stars, cuisine } = useContext(
    SearchParametersContext
  );

  const [showAggCode, setShowAggCode] = useState(false);
  const [showFilterAgg, setShowFilterAgg] = useState(false);
  const [showMustAgg, setShowMustAgg] = useState(false);
  const [showCompound, setShowCompound] = useState(false);

  let mustCount = 0;
  let mustArray = [];
  let filterArray = []; // using filter for stars, borough, cuisine

  let basicSearchObject = {
    text: searchTerm,
    path: ["name", "cuisine"],
    fuzzy: {
      maxEdits: 2,
    },
  };

  let synObject = {
    text: {
      query: food,
      path: "menu",
      synonyms: "MenuSynonyms",
    },
  };

  if (searchTerm !== "") {
    mustCount++;
    mustArray.push(basicSearchObject);
  }
  if (food !== "") {
    mustCount++;
    mustArray.push(synObject);
  }
  if (operator !== "text") {
    mustCount++;
    mustArray.push(geoObject);
  }
  let mustObject = {
    must: mustArray,
  };

  if (stars > 1) filterArray.push(starsObject);
  if (cuisine.length > 0) filterArray.push(cuisineObject);
  if (borough) filterArray.push(boroughObject);

  let filterObject = {
    filter: filterArray,
  };

  let mustString = JSON.stringify(mustObject, null, 2);
  let filterString = JSON.stringify(filterObject, null, 2);

  let synString = JSON.stringify(synObject, null, 2);

  let basicSearchString = JSON.stringify(basicSearchObject, null, 2);

  useEffect(() => {
    if (borough || stars > 1 || cuisine.length > 0) {
      setShowFilterAgg(true);
      setShowAggCode(true);
      if (mustCount > 0) setShowMustAgg(true);
    } else {
      setShowFilterAgg(false);
      setShowFilterAgg(false);
    }
    // eslint-disable-next-line
  }, [stars, cuisine, borough]);

  useEffect(() => {
    if (showFilterAgg || showMustAgg) {
      setShowCompound(true);
    } else setShowCompound(false);
    // eslint-disable-next-line
  }, [showMustAgg, showFilterAgg]);

  useEffect(() => {
    if (mustCount > 1) {
      setShowMustAgg(true);
    } else setShowMustAgg(false);
    if (searchTerm !== "" || food !== "" || operator !== "text") {
      setShowAggCode(true);
    }

    // eslint-disable-next-line
  }, [food, searchTerm, operator]);

  return (
    <div
      className="flex flex-col w-96 rounded h-auto bg-black px-4 pt-10"
      onClick={() => setShowAggCode(!showAggCode)}
    >
      {/* <button className="absolute text-lg font-body font-bold bg-mongo-500 hover:bg-mongo-400 border-b-4 border-mongo-700 hover:border-green-500 text-white py-2 px-4 rounded -top-2">
        Search Stage
      </button> */}

      {showAggCode && (
        <pre className="text-fuchsia-400 font-mono text-xl py-2 text-left">
          &#123; $search :
        </pre>
      )}

      {showCompound && (
        <pre className="text-blue-300 font-mono pl-2 text-left text-lg font-bold">
          &#123; compound :
        </pre>
      )}

      {showMustAgg ? (
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {mustString}
        </SyntaxHighlighter>
      ) : (
        <div className="">
          {searchTerm !== "" && (
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {basicSearchString}
            </SyntaxHighlighter>
          )}

          {food !== "" && (
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {synString}
            </SyntaxHighlighter>
          )}
          {operator !== "text" && (
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {geoString}
            </SyntaxHighlighter>
          )}
        </div>
      )}

      {showFilterAgg && (
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {filterString}
        </SyntaxHighlighter>
      )}

      {showCompound && (
        <pre className="text-blue-300 font-mono pl-2 text-left">&#125; </pre>
      )}
      {showAggCode && (
        <pre className="text-fuchsia-400 font-mono text-lg px-0 text-left">
          &#125;{" "}
        </pre>
      )}
    </div>
  );
};

export default AggregationSideBar;
