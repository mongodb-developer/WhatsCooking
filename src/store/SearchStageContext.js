import React, { useState, createContext } from "react";

export const SearchStageContext = createContext();
// export StageProvider and StageContext

export const SearchStageProvider = (props) => {
  const [showStars, setShowStars] = useState(false);
  const [showCuisine, setShowCuisine] = useState(false);
  const [showBorough, setShowBorough] = useState(false);
  const [starString, setStarString] = useState("");
  const [cuisineString, setCuisineString] = useState("");
  const [boroughString, setBoroughString] = useState("");
  const [showStarsAgg, setShowStarsAgg] = useState(false);
  const [showCuisineAgg, setShowCuisineAgg] = useState(false);
  const [showBoroughAgg, setShowBoroughAgg] = useState(false);
  const [showGeo, setShowGeo] = useState(false);
  const [showGeoAgg, setShowGeoAgg] = useState(false);
  const [geoString, setGeoString] = useState("");

  const value = {
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
    showGeo,
    setShowGeo,
    showGeoAgg,
    setShowGeoAgg,
    geoString,
    setGeoString,
  };

  return (
    <SearchStageContext.Provider value={value}>
      {props.children}
    </SearchStageContext.Provider>
  );
};

// the provider provides info to components
