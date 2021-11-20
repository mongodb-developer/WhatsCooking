import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

const AutoSuggestions = ({
  items,
  setSuggestions,
  showSuggestions,
  searchTerm,
  setSearchTerm,
  setSubmitted,
  setValid,
}) => {
  const [showAutoCode, setShowAutoCode] = useState(false);
  if (!showSuggestions) return null;

  const autoSuggestObject = {
    $search: {
      index: "autocomplete",
      autocomplete: {
        path: "name",
        query: searchTerm,
        fuzzy: {
          maxEdits: 1,
        },
      },
    },
  };

  const autoSuggestObjectString = JSON.stringify(autoSuggestObject, null, 2);
  return (
    <div className="container flex px-4 space-x-6">
      <div className="flex flex-col">
        {items &&
          items.map((item) => {
            return (
              <div
                className="pl-8 my-4 border-b border-gray-300 w-auto text-lg"
                key={item.restaurant_id}
                onClick={(e) => {
                  setSearchTerm(item.name);
                  setSubmitted(true);
                  setValid(true);
                  setSuggestions([]);
                }}
              >
                {item.name}
              </div>
            );
          })}
        <div
          className="flex space-x-10 bg-black text-white"
          onClick={() => setShowAutoCode(!showAutoCode)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>

          <div className="mx-8 pr-6 py-2 text-2xl text-white bg-black">
            {" "}
            show code for autocomplete operator...
          </div>
        </div>
      </div>
      {showAutoCode && (
        <div className="ml-10 rounded text-xl my-auto p-4 bg-black px-4">
          <SyntaxHighlighter language="javascript" style={okaidia}>
            {autoSuggestObjectString}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default AutoSuggestions;
