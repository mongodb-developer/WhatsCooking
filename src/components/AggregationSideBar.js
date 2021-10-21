import React, { useState, useContext, useEffect } from "react";
import { SearchStageContext } from "../store/SearchStageContext";
import { SearchParametersContext } from "../store/SearchParametersContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AggregationSideBar = () => {
  const {
    cuisineString,
    starString,
    geoString,
    boroughString,
    showStarsAgg,
    showCuisineAgg,
    showBoroughAgg,
  } = useContext(SearchStageContext);

  const { searchTerm, food, operator, borough, stars, cuisine } = useContext(
    SearchParametersContext
  );

  const [showAggCode, setShowAggCode] = useState(false);
  const [showFilterAgg, setShowFilterAgg] = useState(false);
  const [showMustAgg, setShowMustAgg] = useState(false);
  const [showCompound, setShowCompound] = useState(false);

  let basicSearchObject = {
    text: searchTerm,
    path: ["name", "cuisine"],
    fuzzy: {},
  };

  let synObject = {
    text: {
      query: food,
      path: "menu",
      synonyms: "MenuSynonyms",
    },
  };

  let synString = JSON.stringify(synObject, null, 2);

  let basicSearchString = JSON.stringify(basicSearchObject, null, 2);

  useEffect(() => {
    if (borough || stars > 1 || cuisine.length > 0) {
      setShowFilterAgg(true);
      setShowAggCode(true);
    } else setShowFilterAgg(false);
    // eslint-disable-next-line
  }, [stars, cuisine, borough]);

  useEffect(() => {
    if (showFilterAgg || showMustAgg) {
      setShowCompound(true);
    } else setShowCompound(false);
    // eslint-disable-next-line
  }, [showMustAgg, showFilterAgg]);

  useEffect(() => {
    if (searchTerm || food) setShowAggCode(true);
    if (
      (searchTerm !== "" && food !== "") ||
      (searchTerm !== "" && operator !== "text")
    ) {
      setShowMustAgg(true);
    } else if (
      (searchTerm !== "" || food !== "" || operator !== "text") &&
      showFilterAgg
    ) {
      setShowMustAgg(true);
    } else setShowMustAgg(false);
    // eslint-disable-next-line
  }, [food, searchTerm, operator, showFilterAgg]);

  return (
    <div className="flex flex-col w-1/4 rounded h-auto bg-black px-4 pt-10">
      <button className="absolute text-lg font-body font-bold bg-mongo-500 hover:bg-mongo-400 border-b-4 border-mongo-700 hover:border-green-500 text-white py-2 px-4 rounded -top-2">
        Search Stage
      </button>

      {showAggCode && (
        <pre className="text-fuchsia-400 font-mono text-xl py-2 text-left">
          &#123; $search :
        </pre>
      )}
      {showCompound && (
        <pre className="text-blue-300 font-mono pl-2 text-left">
          &#123; compound : &#123;
        </pre>
      )}
      {showMustAgg && <pre className="pl-8 text-orange-300">must : [</pre>}
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

        {showMustAgg && <pre className="pl-4 text-orange-300">]</pre>}
      </div>

      {showFilterAgg && (
        <div id="filter">
          <div className="pl-2 text-yellow-300 font-mono">filter:[</div>
          {showStarsAgg && (
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {starString},
            </SyntaxHighlighter>
          )}
          {showCuisineAgg && (
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {cuisineString},
            </SyntaxHighlighter>
          )}
          {showBoroughAgg && (
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {boroughString}
            </SyntaxHighlighter>
          )}
          <div className="pl-4 text-yellow-300 font-mono">]</div>
        </div>
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
