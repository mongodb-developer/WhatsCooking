import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

const FacetModal = ({ setShowFacetCode, facetStage }) => {
  const jsonFacet = JSON.stringify(facetStage, null, 2);

  return (
    <div className="fixed inset-0 z-20 flex justify-center bg-smoke-dark font-body">
      <div className="relative px-20 py-10 mx-auto mt-24 w-1/2 h-auto text-2xl text-white whitespace-pre-wrap bg-black overflow-y-auto">
        <div className="text-4xl text-center text-deep-cerulean-100 font-bold">
          Facet Code
        </div>
        <br></br>

        <SyntaxHighlighter language="javascript" style={okaidia}>
          {jsonFacet}
        </SyntaxHighlighter>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setShowFacetCode(false);
          }}
          className="sticky bottom-0 float-right w-16 pr-0 text-fuchsia-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default FacetModal;
