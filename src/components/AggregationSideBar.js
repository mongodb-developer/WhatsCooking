import React, { useState, useContext, useEffect } from "react";
import { SearchStageContext } from "../store/SearchStageContext";
import { SearchParametersContext } from "../store/SearchParametersContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AggregationSideBar = () => {
  const { geoString, geoObject, boroughObject, cuisineObject, starsObject } =
    useContext(SearchStageContext);

  const { searchTerm, food, operator, borough, stars, cuisine, functionScore } =
    useContext(SearchParametersContext);

  const [showAggCode, setShowAggCode] = useState(false);
  const [showFilterAgg, setShowFilterAgg] = useState(false);
  const [showMustAgg, setShowMustAgg] = useState(false);
  const [showCompound, setShowCompound] = useState(false);

  let mustCount = 0;
  let mustArray = [];
  let filterArray = []; // using filter for stars, borough, cuisine

  let basicSearchObject = {
    text: searchTerm,
    path: "name",
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
  console.log("MUST OBJECT", JSON.stringify.mustObject);

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
  let scoreString = JSON.stringify(scoreObject, null, 2);
  let highlightString = JSON.stringify(highlightObject, null, 2);

  useEffect(() => {
    if (borough || stars > 1 || cuisine.length > 0) {
      setShowFilterAgg(true);
      setShowMustAgg(true);
      setShowAggCode(true);
      if (mustCount > 0) setShowMustAgg(true);
    } else {
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
    if (mustCount > 1 || showFilterAgg) {
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
      {showAggCode && (
        <>
          <pre className="text-fuchsia-400 font-mono text-xl py-2 text-left">
            &#123; $search :
          </pre>
          <pre className="text-blue-500 font-mono text py-2 pl-2 text-left">
            &#47; &#47; optional, defaults to "default"
          </pre>

          <pre className="text-yellow-400 font-mono text-xl py-2 pl-2 text-left">
            index: &#60; indexName &#62;
          </pre>
        </>
      )}

      {showCompound && (
        <>
          <pre className="text-blue-300 font-mono pl-2 text-left text-xl font-bold">
            &#123; compound :
          </pre>
          <pre className="text-blue-500 font-mono text py-2 pl-2 text-left">
            &#47; &#47; must | mustNot | should | filter
          </pre>
        </>
      )}

      {showMustAgg && mustArray.length > 0 ? (
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
      {functionScore && (
        <div className="border-solid border-2 border-yellow-200 ">
          <pre className="text-blue-300 font-mono pl-2 text-left text-xl font-bold">
            score :
          </pre>
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {scoreString}
          </SyntaxHighlighter>
        </div>
      )}

      {showCompound && (
        <pre className="text-blue-300 font-mono pl-2 text-left text-xl font-bold">
          &#125;{" "}
        </pre>
      )}
      {food !== "" && (
        <div>
          <pre className="text-yellow-200 font-mono pl-2 text-left text-xl font-bold">
            highlight :
          </pre>
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {highlightString}
          </SyntaxHighlighter>
        </div>
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

const scoreObject = {
  function: {
    multiply: [
      {
        score: "relevance",
      },
      {
        path: {
          value: "stars",
          undefined: 1,
        },
      },
      {
        path: {
          value: "sponsored",
          undefined: 1,
        },
      },
    ],
  },
};
const highlightObject = {
  path: "menu",
};
