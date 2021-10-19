import React, { useContext } from "react";
import { SearchStageContext } from "../store/SearchStageContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AggregationSideBar = () => {
  const {
    cuisineString,
    starString,
    boroughString,
    showStarsAgg,
    showCuisineAgg,
    showBoroughAgg,
  } = useContext(SearchStageContext);

  let basicSearchObject = {
    $search: {
      text: "searchTerm",
      path: ["name", "cuisine"],
    },
  };

  let basicSearchString = JSON.stringify(basicSearchObject, null, 2);

  return (
    <div className="flex flex-col rounded h-auto bg-black">
      <div className="text-white font-body text-2xl py-4 font-bold text-center">
        Search Stage
      </div>

      <SyntaxHighlighter language="javascript" style={atomDark}>
        {basicSearchString}
      </SyntaxHighlighter>

      {(showStarsAgg || showCuisineAgg || showBoroughAgg) && (
        <div id="filter">
          <div className="text-xl pl-2 text-yellow-300 font-mono">filter:[</div>
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
          <div className="text-xl pl-2 text-yellow-300 font-mono">]</div>
        </div>
      )}
    </div>
  );
};

export default AggregationSideBar;
