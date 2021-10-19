import React, { useEffect, useState, useContext } from "react";
import ReactStars from "react-rating-stars-component";
import MagnifyingGlass from "../images/Search.png";
import { SearchStageContext } from "../store/SearchStageContext";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const SearchSideBar = ({
  setOperator,
  operator,
  distance,
  setDistance,
  setShowDistanceInput,
  showDistanceInput,
  setValid,
  setSubmitted,
  setStars,
  stars,
  borough,
  setBorough,
  cuisine,
  setCuisine,
  setShowSuggestions,
}) => {
  const {
    showStars,
    setShowStars,
    showCuisine,
    setShowCuisine,
    showBorough,
    setShowBorough,
    cuisineString,
    setCuisineString,
    starString,
    setStarString,
    boroughString,
    setBoroughString,
    showStarsAgg,
    setShowStarsAgg,
    showCuisineAgg,
    setShowCuisineAgg,
    showBoroughAgg,
    setShowBoroughAgg,
  } = useContext(SearchStageContext);

  const ratingChanged = (rating) => {
    setStars(rating);
  };

  useEffect(() => {
    console.log("Stars: " + stars);
    if (stars === 1) {
      return;
    }
    setShowStars(true);
    setShowStarsAgg(true);

    // eslint-disable-next-line
  }, [stars]);

  useEffect(() => {
    console.log("Cuisine: " + cuisine);
    if (cuisine.length === 0) {
      setShowCuisineAgg(false);
      return;
    }
    setShowCuisine(true);
    setShowCuisineAgg(true);
    // eslint-disable-next-line
  }, [cuisine]);

  useEffect(() => {
    console.log("Borough: " + borough);
    if (!borough) {
      setShowBoroughAgg(false);
      return;
    }
    setShowBorough(true);
    setShowBoroughAgg(true);
    // eslint-disable-next-line
  }, [borough]);

  const handleNearSearch = (event) => {
    setOperator("near");
    setShowDistanceInput(false);
    setShowSuggestions(false);
    console.log("NEAR SEARCH");
    handleSearch(event);
  };

  const handleGeoSearch = (event) => {
    event.preventDefault();
    setOperator("geoWithin");
    console.log("GEOSEARCH");
    setShowSuggestions(false);
    handleSearch(event);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setValid(true);
    setShowSuggestions(false);
    setSubmitted(true);
  };

  const handleSearchMaster = (event) => {
    event.preventDefault();
    if (operator === "text") handleSearch(event);
    else if (operator === "near") handleNearSearch(event);
    else handleGeoSearch(event);
  };

  const onChangeBorough = (e) => {
    setBorough(e.target.value);
  };

  const onChangeCuisine = (e) => {
    let { name, checked } = e.target;
    if (checked) {
      setCuisine((prevCuisine) => [...prevCuisine, name]);
      console.log("CUISINE", cuisine);
    }
    if (checked === false) {
      let cuisineArray = cuisine.filter((item) => item !== name);
      setCuisine(cuisineArray);
    }
  };

  let active =
    "w-20 h-12 my-auto text text-white bg-gradient-to-r from-mongo-700 to-mongo-600 border border-green-700 rounded hover:shadow-2xl hover:bg-green-700 transform hover:scale-110 focus:outline-none";
  let inactive =
    "w-20 h-12 my-auto text text-white bg-gray-400 border border-gray-500 rounded hover:shadow-2xl hover:bg-green-800 transform hover:scale-110 focus:outline-none";

  const starObject = {
    range: {
      gte: stars,
      path: "stars",
    },
  };
  const sString = JSON.stringify(starObject, null, 2);
  setStarString(sString);

  const cuisineObject = {
    query: cuisine,
    path: "cuisine",
  };
  const cString = JSON.stringify(cuisineObject, null, 2);
  setCuisineString(cString);

  const boroughObject = {
    text: borough,
    path: "borough",
  };
  const bString = JSON.stringify(boroughObject, null, 2);
  setBoroughString(bString);

  return (
    <>
      <div className="flex flex-col bg-white border border-gray-300 rounded w-1/6">
        {/************* SEARCH OPERATOR SECTION ******************/}

        <div className="flex h-12 justify-evenly px-1 ">
          {operator === "text" ? (
            <button
              type="button"
              className={active}
              onClick={() => setOperator("text")}
            >
              text
            </button>
          ) : (
            <button
              type="button"
              className={inactive}
              onClick={() => {
                setOperator("text");
                setShowDistanceInput(false);
              }}
            >
              text
            </button>
          )}
          {operator === "near" ? (
            <button
              type="button"
              className={active}
              onClick={() => setOperator("text")}
            >
              near
            </button>
          ) : (
            <button
              type="button"
              className={inactive}
              onClick={handleNearSearch}
            >
              near
            </button>
          )}
          {operator === "geoWithin" ? (
            <button
              type="button"
              className={active}
              onClick={() => {
                setOperator("text");
                setShowDistanceInput(false);
              }}
            >
              geoWithin
            </button>
          ) : (
            <button
              type="button"
              className={inactive}
              onClick={() => {
                setOperator("geoWithin");
                setShowDistanceInput(true);
              }}
            >
              geoWithin
            </button>
          )}
          <button
            className="flex items-center justify-center w-20 h-12 my-auto text-lg font-bold transform bg-white border border-gray-400 rounded hover:shadow-2xl hover:scale-110 focus:outline-none"
            type="button"
            onClick={handleSearchMaster}
          >
            <img className="w-12" src={MagnifyingGlass} alt="glass" />
          </button>
        </div>
        {showDistanceInput && (
          <div className="flex items-center pb-2 mx-4">
            <label className="font-bold text-san-juan-800">Distance: </label>
            <input
              type="text"
              placeholder={distance}
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
              className="w-16 mx-auto leading-10 text-center bg-transparent rounded outline-none"
              onSubmit={handleSearchMaster}
            ></input>
          </div>
        )}

        <br />

        {/************* STAR RATING SECTION ******************/}

        <div className="mx-auto">
          <label className="font-bold text-tolopea-500">
            Average Star Rating:{" "}
          </label>
          <ReactStars
            size={36}
            activeColor="#ffd700"
            onChange={ratingChanged}
            count={5}
            color="black"
            isHalf="true"
            value={stars}
          />
        </div>
        {}
        {showStars && (
          <div
            onClick={() => {
              setShowStars(false);
            }}
          >
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {starString}
            </SyntaxHighlighter>
          </div>
        )}

        <hr
          style={{
            color: "darkgreen",
            backgroundColor: "darkgreen",
            height: 1,
            margin: 4,
            borderColor: "darkgreen",
          }}
        />
        <br />

        {/************* CUISINE TYPE SECTION ******************/}

        <div className="text-lg" onChange={onChangeCuisine}>
          <div className="mb-1 ml-10 space-x-6 cursor-pointer">
            <input
              type="checkbox"
              name="American"
              defaultChecked={cuisine.includes("American")}
            />
            <label htmlFor="American">American</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer">
            <input
              type="checkbox"
              name="Chinese"
              defaultChecked={cuisine.includes("Chinese")}
            />
            <label htmlFor="Chinese">Chinese</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer ">
            <input
              type="checkbox"
              name="French"
              defaultChecked={cuisine.includes("French")}
            />
            <label htmlFor="French">French</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer ">
            <input
              type="checkbox"
              name="Hamburgers"
              defaultChecked={cuisine.includes("Hamburgers")}
            />
            <label htmlFor="Hamburgers">Hamburgers</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer ">
            <input
              type="checkbox"
              name="Italian"
              defaultChecked={cuisine.includes("Italian")}
            />
            <label htmlFor="Italian">Italian</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer ">
            <input
              type="checkbox"
              name="Japanese"
              defaultChecked={cuisine.includes("Japanese")}
            />
            <label htmlFor="Japanese">Japanese</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer">
            <input
              type="checkbox"
              name="Mexican"
              defaultChecked={cuisine.includes("Mexican")}
            />
            <label htmlFor="Mexican">Mexican</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer ">
            <input
              type="checkbox"
              name="Pizza"
              defaultChecked={cuisine.includes("Pizza")}
            />
            <label htmlFor="Pizza">Pizza</label>
          </div>
        </div>
        {showCuisine && (
          <div
            onClick={() => {
              setShowCuisine(false);
            }}
          >
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {cuisineString}
            </SyntaxHighlighter>
          </div>
        )}

        <hr
          style={{
            color: "darkgreen",
            backgroundColor: "darkgreen",
            height: 1,
            margin: 4,
            borderColor: "darkgreen",
          }}
        />
        <br />

        {/************* BOROUGH SECTION ******************/}

        <div className="text-lg" onChange={onChangeBorough}>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer borough">
            <input
              type="radio"
              name="borough"
              value="Manhattan"
              defaultChecked={borough === "Manhattan"}
            />
            <label htmlFor="Manhattan">Manhattan</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer checkbox-borough">
            <input
              type="radio"
              value="Brooklyn"
              name="borough"
              defaultChecked={borough === "Brooklyn"}
            />
            <label htmlFor="Brooklyn">Brooklyn</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer checkbox-borough">
            <input
              type="radio"
              value="Queens"
              name="borough"
              defaultChecked={borough === "Queens"}
            />
            <label htmlFor="Queens">Queens</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer checkbox-borough">
            <input
              type="radio"
              value="Bronx"
              name="borough"
              defaultChecked={borough === "Bronx"}
            />
            <label htmlFor="Bronx">Bronx</label>
          </div>
          <div className="mb-2 ml-10 space-x-6 cursor-pointer checkbox-borough">
            <input
              type="radio"
              value="Staten Island"
              name="borough"
              defaultChecked={borough === "Staten Island"}
            />
            <label htmlFor="Staten Island">Staten Island</label>
          </div>
        </div>
        {showBorough && (
          <div
            onClick={() => {
              setShowBorough(false);
            }}
          >
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {boroughString}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </>
  );
};
export default SearchSideBar;
