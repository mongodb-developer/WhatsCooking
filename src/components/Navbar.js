import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { SearchParametersContext } from "../store/SearchParametersContext";
import LOGO from "../images/MongoDB_Logo.svg";

const Navbar = () => {
  const history = useHistory();
  const {
    showAggregation,
    setShowAggregation,
    setFunctionScore,
    setValid,
    setShowSuggestions,
    setSubmitted,
  } = useContext(SearchParametersContext);
  const handleShowAggregation = () => {
    setShowAggregation(!showAggregation);
  };

  const handleFunctionScore = (event) => {
    event.preventDefault();
    setFunctionScore("function");
    console.log("IMPLEMENT FUNCTION SCORE");
    setValid(true);
    setShowSuggestions(false);
    setSubmitted(true);
    // handleSearch(event);
  };
  return (
    <header className="container flex px-10 justify-between pb-2 mx-auto">
      <div id="logo">
        <Link to="/" className="flex items-center">
          <img className="mx-auto my-auto h-20" src={LOGO} alt="logo" />
        </Link>
      </div>
      <div
        id="right"
        className="container pl-32 mt-4 flex justify-end divide-x divide-green-500 "
      >
        <button
          onClick={handleShowAggregation}
          className="flex items-center h-12 pl-4 my-auto space-x-6 text-lg rounded w-full font-body transition duration-700 transform  hover:scale-150 hover:font-bold focus:outline-none"
        >
          <span>Aggregation</span>
          <div className="flex items-center justify-center w-8 h-12 text-xl rounded-full">
            {" "}
            💻
          </div>
        </button>
        <button
          onClick={handleFunctionScore}
          className="flex items-center pl-4 my-auto mx-auto space-x-6 text-lg text-tolopea transition duration-700 transform rounded  w-full font-body  hover:scale-150 hover:font-bold focus:outline-none"
        >
          <span>Function Score</span>
          <div className="flex items-center justify-center w-8 h-12 text-xl rounded-full">
            {" "}
            💯
          </div>
        </button>
        <button
          className="flex items-center pl-4 my-auto space-x-6 text-lg text-mongo-600 transition duration-700 transform rounded w-full font-body font-bold hover:scale-150 hover:font-bold focus:outline-none"
          onClick={() => history.push("/synonyms")}
        >
          <span>Synonyms</span>
          <div className="flex items-center justify-center w-8 h-12 text-2xl rounded-full">
            {" "}
            📚
          </div>
        </button>
      </div>
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
        <button
        className="flex items-center pl-4 my-auto space-x-6 text-lg text-mongo-600 transition duration-700 transform rounded  w-full font-body font-bold hover:scale-150 hover:font-bold focus:outline-none"
        onClick={() => history.push("/scoring")}
      >
        <span>Custom Scores</span>
        <div className="flex items-center justify-center w-8 h-12 text-xl rounded-full">
          {" "}
          ✨
        </div>
      </button>
      </nav>
 * 
 * 
 */
