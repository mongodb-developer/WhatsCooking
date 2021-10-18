import React from "react";
import SearchBar from "./SearchBar";
import Icon from "../images/whatscooking.png";

const SearchForm = ({
  setSearchTerm,
  searchTerm,
  food,
  setFood,
  setOperator,
  operator,
  setFunctionScore,
  functionScore,
  setDistance,
  setShowDistanceInput,
  setRestaurants,
  restaurants,
  setSubmitted,
  setBorough,
  showAggregation,
  setShowAggregation,
  valid,
  setValid,
  setStars,
  setShowSuggestions,
  showSuggestions,
}) => {
  const handleSearch = (event) => {
    event.preventDefault();
    setValid(true);
    setShowSuggestions(false);
    setSubmitted(true);
  };

  const handleFunctionScore = (event) => {
    event.preventDefault();
    setFunctionScore("function");
    console.log("IMPLEMENT FUNCTION SCORE");
    handleSearch(event);
  };

  const handleShowAggregation = () => {
    setShowAggregation(!showAggregation);
  };

  const handleClearSearch = () => {
    setOperator("text");
    setDistance(1);
    setSearchTerm("");
    setFood("");
    setRestaurants([]);
    setShowDistanceInput(false);
    setShowAggregation(false);
    setFunctionScore(null);
    setValid(false);
    setBorough(null);
    setStars(1);
    setShowSuggestions(false);
    setSubmitted(true);
  };

  return (
    <>
      <form
        onSubmit={handleSearch}
        className="relative flex flex-col w-full px-0 bg-white"
      >
        <div className="flex p-10 mx-10 rounded bg-gradient-to-r from-san-juan-500 via-san-juan-400 to-deep-cerulean-700">
          <img src={Icon} alt="app logo" className="my-auto w-32"></img>
          <div className="flex flex-col w-full">
            <div className="mb-2 text-3xl font-bold text-white text-center font-body">
              Atlas Search Demo: Restaurant Finder
            </div>
            <div className="flex w-full pl-8 my-auto">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                restaurants={restaurants}
                setSubmitted={setSubmitted}
                setValid={setValid}
                showSuggestions={showSuggestions}
                setShowSuggestions={setShowSuggestions}
              />
              <div className="flex w-1/4 px-3 py-2 mx-auto my-4 text-xl text-black  bg-white border rounded border-san-juan-300 hover:shadow-xl">
                <input
                  // food and setFood HERE
                  type="text"
                  id="menu"
                  placeholder="food..."
                  className="px-5 bg-transparent outline-none font-body"
                />
              </div>

              <div className="flex mx-4 w-1/4 px-0">
                <button
                  type="submit"
                  className="flex items-center w-32 h-12 pl-4 my-auto space-x-4 text-2xl text-white rounded bg-mongo-500 to-green-500 font-body hover:shadow-2xl hover:bg-green-700 focus:outline-none"
                >
                  <span>Find</span>
                  <div className="flex items-center justify-center w-16 h-16 text-6xl rounded-full bg-mongo-700">
                    👩🏽‍🍳
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/*************** DISPLAY BAR CLEAR --- SHOW AGGREGATION --- FUNCTION SCORE **************
      {valid && (
        <div className="flex justify-center px-2 mx-10 space-x-20 bg-yellow-300 rounded">
          <div className="py-2 my-auto text-xl text-center bg-yellow-300 font-body">
            Search results for "{searchTerm}" with {operator} operator.
          </div>
          <button
            onClick={handleClearSearch}
            className="flex items-center h-12 pl-4 my-auto space-x-6 text-xl bg-yellow-300 border border-yellow-200 rounded shadow-xl w-60 font-body hover:bg-yellow-200 focus:outline-none"
          >
            <span>Clear table</span>
            <div className="flex items-center justify-center w-12 text-5xl bg-black rounded-full">
              🍽️
            </div>
          </button>
          <button
            onClick={handleShowAggregation}
            className="flex items-center h-12 pl-4 my-auto space-x-6 text-lg bg-yellow-300 border border-yellow-200 rounded shadow-xl w-60 font-body hover:bg-yellow-200 focus:outline-none"
          >
            <span>Aggregation</span>
            <div className="flex items-center justify-center w-12 h-12 text-5xl rounded-full">
              {" "}
              💻
            </div>
          </button>
          <button
            onClick={handleFunctionScore}
            className="flex items-center pl-4 my-auto space-x-6 text-lg text-white transition duration-700 transform rounded shadow-xl bg-night-shadz-500 w-60 font-body hover:bg-night-shadz-600 hover:scale-150 hover:font-bold focus:outline-none"
          >
            <span>Function Score</span>
            <div className="flex items-center justify-center w-12 h-12 text-6xl rounded-full">
              {" "}
              ✨
            </div>
          </button>
        </div>
      )}

      ***/}
    </>
  );
};

export default SearchForm;
