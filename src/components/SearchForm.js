import React from "react";
import SearchBar from "./SearchBar";
import Icon from "../images/whatscooking.png";
import SearchIcon from "../images/ATLAS_Search.png";

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
  setShowSearchStage,
  showSearchStage,
}) => {
  const handleSearch = (event) => {
    event.preventDefault();

    setValid(true);
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
              <div className="flex w-1/4 px-3 py-2 mx-auto my-4 text-xl text-black  bg-white border rounded border-san-juan-300 hover:shadow-xl focus:outline-none">
                <input
                  onChange={(event) => {
                    setFood(event.target.value);
                  }}
                  value={food}
                  type="text"
                  id="menu"
                  placeholder="food..."
                  autoComplete="off"
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
              </div>{" "}
              <button
                onClick={() => setShowSearchStage(!showSearchStage)}
                type="button"
                className="absolute flex space-x-4 my-auto font-body font-bold bg-mongo-500 border-b-4 border-r-4 border-solid border-mongo-700 rounded-xl -bottom-8 z-10 right-16"
              >
                <div className="relative text-2xl my-auto text-white font-extrabold font-body pr-6 pl-12 py-2">
                  $search
                </div>
                <img
                  src={SearchIcon}
                  alt="app logo"
                  className="absolute right-32 -bottom-4 my-auto w-20 h-20 rounded-full mx-auto bg-white border-t-2 border-l-2 border-b-4 border-r-4 border-solid border-mongo-600"
                ></img>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
