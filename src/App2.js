import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import Grid from "./components/Grid";
import NYCMap from "./components/NYCMap";
import SearchSideBar from "./components/SearchSideBar";
import Top3 from "./components/Top3";
import AggregationCode from "./components/AggregationCode";
import MenuModal from "./components/MenuModal";

// HOOKS
import { useHomeFetch } from "./hooks/useHomeFetch";

const App2 = () => {
  const {
    setSearchTerm,
    searchTerm,
    setOperator,
    operator,
    distance,
    setDistance,
    submitted,
    setSubmitted,
    restaurants,
    setRestaurants,
    pathOptions,
    setPathOptions,
    functionScore,
    setFunctionScore,
    stages,
    setStars,
    stars,
    borough,
    setBorough,
    cuisine,
    setCuisine,
  } = useHomeFetch();

  const [showDistanceInput, setShowDistanceInput] = useState(false); // USED IN SEARCH SIDE BAR FOR GEOWITHIN OPERATOR OPTION
  const [valid, setValid] = useState(false); // IF VALID SEARCH EXECUTED - WILL SHOW BUTTONS TO CLEAR/AGGREGATION/FUNCTION SCORE
  const [showAggregation, setShowAggregation] = useState(false); // TO SHOW MODAL FOR AGGREGATION CODE
  const [showSuggestions, setShowSuggestions] = useState(false); // FOR AUTOCOMPLETED RESTAURANT NAMES IN SEARCH BAR
  const [showMenu, setShowMenu] = useState(false); // POP UP FOR RESTAURANT MENU ITEMS
  const [index, setIndex] = useState(0);

  let displayRestaurants = false;
  let topPicks = [];
  let picks = [];

  if (restaurants && restaurants.length > 0) {
    displayRestaurants = true;
    topPicks = restaurants.slice(0, 3);
    picks = restaurants.slice(3);
    console.log(restaurants);
    console.log("Top Picks", topPicks);
    console.log("picks", picks);
  }

  return (
    <div className="relative px-20 mt-8">
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setOperator={setOperator}
        operator={operator}
        submitted={submitted}
        setSubmitted={setSubmitted}
        distance={distance}
        setDistance={setDistance}
        setRestaurants={setRestaurants}
        pathOptions={pathOptions}
        setCuisine={setCuisine}
        setPathOptions={setPathOptions}
        setBorough={setBorough}
        functionScore={functionScore}
        setFunctionScore={setFunctionScore}
        stages={stages}
        setShowAggregation={setShowAggregation}
        showAggregation={showAggregation}
        setShowDistanceInput={setShowDistanceInput}
        valid={valid}
        setValid={setValid}
        setStars={setStars}
        setShowSuggestions={setShowSuggestions}
        showSuggestions={showSuggestions}
      />

      {showAggregation && (
        <div className="absolute z-10 rounded right-96">
          <AggregationCode
            setShowAggregation={setShowAggregation}
            stages={stages}
          />
        </div>
      )}

      <div className="relative flex flex-col mx-auto">
        <div className="flex w-full px-10 mx-auto mt-4 bg-white">
          <SearchSideBar
            className=""
            setOperator={setOperator}
            operator={operator}
            distance={distance}
            setDistance={setDistance}
            showDistanceInput={showDistanceInput}
            setShowDistanceInput={setShowDistanceInput}
            setShowSuggestions={setShowSuggestions}
            valid={valid}
            setValid={setValid}
            setSubmitted={setSubmitted}
            setStars={setStars}
            stars={stars}
            setBorough={setBorough}
            borough={borough}
            cuisine={cuisine}
            setCuisine={setCuisine}
          />

          <NYCMap restaurants={restaurants} submitted={submitted} />

          {displayRestaurants && (
            <div className="w-1/2 -right-0">
              <Top3
                restaurants={topPicks}
                setShowMenu={setShowMenu}
                setIndex={setIndex}
                functionScore={functionScore}
                setFunctionScore={setFunctionScore}
              />
            </div>
          )}
        </div>

        {displayRestaurants && (
          <Grid
            restaurants={picks}
            setShowMenu={setShowMenu}
            setIndex={setIndex}
            functionScore={functionScore}
            setFunctionScore={setFunctionScore}
          />
        )}

        {showMenu && (
          <MenuModal
            menu={restaurants[index].menu}
            setShowMenu={setShowMenu}
            highlights={restaurants[index].highlights}
            name={restaurants[index].name}
          />
        )}
        <div className="sticky bottom-0 px-4 py-2 mx-auto text-white italic text-center rounded-full shadow-lg bg-gradient-to-r from-mongo-600 to-mongo-700">
          This data is partially mocked. Enjoy playing with the app, but please
          do not use to make dining decisions.
        </div>
      </div>
    </div>
  );
};

export default App2;
