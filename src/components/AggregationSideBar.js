import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AggregationSideBar = () => {
  return (
    <div className="flex flex-col bg-white rounded w-1/4">
      <SyntaxHighlighter language="javascript" style={atomDark}>
        Holding for Aggregation Code Build
      </SyntaxHighlighter>
    </div>
  );
};

export default AggregationSideBar;
