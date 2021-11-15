import React, { useContext } from "react";
import { SearchStageProvider } from "../store/SearchStageContext";
import { SearchParametersContext } from "../store/SearchParametersContext";
import SearchForm from "../components/SearchForm";
import Grid from "../components/Grid";
import NYCMap from "../components/NYCMap";
import SearchSideBar from "../components/SearchSideBar";
import AggregationSideBar from "../components/AggregationSideBar";
import TopPicks from "../components/TopPicks";
import AggregationModal from "../components/AggregationModal";
import FacetModal from "../components/FacetModal";
import MenuModal from "../components/MenuModal";

import AGGLOGO from "../images/pipeline.png";
// HOOKS
import { useHomeFetch } from "../hooks/useHomeFetch";

const MainPage = () => {
  const {
    setOperator,
    operator,
    distance,
    setDistance,
    submitted,
    setSubmitted,
    searchTerm,
    setSearchTerm,
    food,
    setFood,
    restaurants,
    setRestaurants,
    setFunctionScore,
    functionScore,
    stages,
    facetStage,
    borough,
    setBorough,
    cuisine,
    setCuisine,
    setStars,
    stars,
    noResultsMsg,
    setNoResultsMsg,
    boroughBuckets,
    cuisineBuckets,
    facetOverallCount,
  } = useHomeFetch();

  const {
    showDistanceInput,
    setShowDistanceInput,
    valid,
    setValid,
    showSuggestions,
    setShowSuggestions,
    aggregationErrorMsg,
    setAggregationErrorMsg,
    setIndex,
    index,
    showMenu,
    setShowMenu,
    showAggregation,
    setShowAggregation,
    showFacetCode,
    setShowFacetCode,
    setShowSearchStage,
    showSearchStage,
    showFacets,
    setShowFacets,
  } = useContext(SearchParametersContext);

  let displayRestaurants = false;
  let topPicks = [];

  let picks = [];

  if (restaurants && restaurants.length > 0) {
    displayRestaurants = true;
    topPicks = restaurants.slice(0, 5);
    picks = restaurants.slice(5);
    console.log(restaurants);
    // console.log("Top Picks", topPicks);
    // console.log("picks", picks);
  }

  return (
    <SearchStageProvider>
      <div className="relative px-20">
        <SearchForm
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          food={food}
          setFood={setFood}
          setOperator={setOperator}
          operator={operator}
          submitted={submitted}
          setSubmitted={setSubmitted}
          distance={distance}
          setDistance={setDistance}
          setRestaurants={setRestaurants}
          setCuisine={setCuisine}
          setBorough={setBorough}
          functionScore={functionScore}
          setFunctionScore={setFunctionScore}
          stages={stages}
          setShowDistanceInput={setShowDistanceInput}
          valid={valid}
          setValid={setValid}
          setStars={setStars}
          setShowSuggestions={setShowSuggestions}
          showSuggestions={showSuggestions}
          showSearchStage={showSearchStage}
          setShowSearchStage={setShowSearchStage}
        />

        {noResultsMsg !== "" && (
          <div
            className="w-3/4 mx-auto py-6 text-2xl bg-black text-white text-center rounded my-4"
            onClick={() => setNoResultsMsg("")}
          >
            {noResultsMsg}
          </div>
        )}
        {aggregationErrorMsg !== "" && (
          <div
            className="w-3/4 mx-auto py-6 text-2xl bg-black text-white text-center rounded my-4"
            onClick={() => setAggregationErrorMsg("")}
          >
            {aggregationErrorMsg}
          </div>
        )}

        {showAggregation && (
          <div className="absolute z-10 rounded right-96">
            <AggregationModal
              setShowAggregation={setShowAggregation}
              stages={stages}
            />
          </div>
        )}
        {showFacetCode && (
          <div className="absolute z-10 rounded right-96">
            <FacetModal
              setShowFacetCode={setShowFacetCode}
              facetStage={facetStage}
            />
          </div>
        )}

        <div className="relative flex flex-col mx-auto">
          <div className="flex w-full px-10 mx-auto mt-4 bg-white">
            <SearchSideBar
              className="w-auto"
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
              boroughBuckets={boroughBuckets}
              cuisineBuckets={cuisineBuckets}
              facetOverallCount={facetOverallCount}
              showFacets={showFacets}
              setShowFacets={setShowFacets}
              setShowFacetCode={setShowFacetCode}
            />

            <NYCMap
              className=""
              restaurants={restaurants}
              submitted={submitted}
            />
            {displayRestaurants && (
              <div className="w-1/2 -right-0">
                <TopPicks
                  restaurants={topPicks}
                  setShowMenu={setShowMenu}
                  setIndex={setIndex}
                  functionScore={functionScore}
                  setFunctionScore={setFunctionScore}
                />
              </div>
            )}

            {showSearchStage && <AggregationSideBar className="" />}
          </div>
          <Grid
            restaurants={picks}
            setShowMenu={setShowMenu}
            setIndex={setIndex}
            functionScore={functionScore}
            setFunctionScore={setFunctionScore}
          />
          )
          {showMenu && (
            <MenuModal
              menu={restaurants[index].menu}
              setShowMenu={setShowMenu}
              highlights={restaurants[index].highlights}
              name={restaurants[index].name}
            />
          )}
          <div className="sticky bottom-0 px-4 py-2 mx-auto text-white italic text-center rounded-full shadow-lg bg-gradient-to-r from-mongo-600 to-mongo-700">
            This data is partially mocked. Enjoy playing with the app, but
            please do not use to make dining decisions.
          </div>
        </div>
      </div>
    </SearchStageProvider>
  );
};

export default MainPage;
