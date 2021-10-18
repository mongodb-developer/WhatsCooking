import React from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  return (
    <header className="container mt-4 flex pl-20 mx-auto justify-between divide-x divide-green-500">
      <button
        //   onClick={handleShowAggregation}
        className="flex items-center h-12 pl-4 my-auto space-x-6 text-lg rounded w-full font-body transition duration-700 transform  hover:scale-150 hover:font-bold focus:outline-none"
      >
        <span>Aggregation</span>
        <div className="flex items-center justify-center w-8 h-12 text-5xl rounded-full">
          {" "}
          💻
        </div>
      </button>
      <button
        // onClick={handleFunctionScore}
        className="flex items-center pl-4 my-auto mx-auto space-x-6 text-lg text-tolopea transition duration-700 transform rounded  w-full font-body  hover:scale-150 hover:font-bold focus:outline-none"
      >
        <span>Function Score</span>
        <div className="flex items-center justify-center w-8 h-12 text-5xl rounded-full">
          {" "}
          💯
        </div>
      </button>
      <button
        className="flex items-center pl-4 my-auto space-x-6 text-lg text-mongo-600 transition duration-700 transform rounded w-full font-body font-bold hover:scale-150 hover:font-bold focus:outline-none"
        onClick={() => history.push("/synonyms")}
      >
        <span>Synonyms</span>
        <div className="flex items-center justify-center w-8 h-12 text-5xl rounded-full">
          {" "}
          📚
        </div>
      </button>
      <button
        className="flex items-center pl-4 my-auto space-x-6 text-lg text-mongo-600 transition duration-700 transform rounded  w-full font-body font-bold hover:scale-150 hover:font-bold focus:outline-none"
        onClick={() => history.push("/scoring")}
      >
        <span>Custom Scores</span>
        <div className="flex items-center justify-center w-8 h-12 text-5xl rounded-full">
          {" "}
          ✨
        </div>
      </button>
    </header>
  );
};

export default Navbar;

/***
 * <nav>
        <ul className="flex space-x-10">
          <li className="text-mongo-600 text-xl">
            <Link to="/synonyms">Synonyms</Link>
          </li>
          <li className="text-indigo-600 text-xl">
            <Link to="/scoring">Custom Scores</Link>
          </li>
        </ul>
      </nav>
 * 
 * 
 */
