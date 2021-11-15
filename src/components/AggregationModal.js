import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AggregationModal = ({ setShowAggregation, stages }) => {
  const jsonSearch = JSON.stringify(JSON.parse(stages.searchStage), null, 2);
  const jsonLimit = JSON.stringify(JSON.parse(stages.limitStage), null, 2);
  const jsonProject = JSON.stringify(JSON.parse(stages.projectStage), null, 2);

  return (
    <div className="fixed inset-0 z-20 flex justify-center bg-smoke-dark font-body">
      <div className="relative px-20 py-10 mx-auto mt-24 overflow-x-scroll overflow-y-auto text-2xl text-white whitespace-pre-wrap bg-black h-3/4 ">
        <div className="text-4xl text-center text-deep-cerulean-100 font-bold">
          Aggregation Pipeline with $search
        </div>
        <br></br>

        <SyntaxHighlighter language="javascript" style={atomDark}>
          {jsonSearch}
        </SyntaxHighlighter>
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {jsonLimit}
        </SyntaxHighlighter>
        <SyntaxHighlighter language="javascript" style={atomDark}>
          {jsonProject}
        </SyntaxHighlighter>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            setShowAggregation(false);
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

export default AggregationModal;
