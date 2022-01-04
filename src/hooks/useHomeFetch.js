import axios from "axios";
import { useContext, useEffect } from "react";
import { SearchParametersContext } from "../store/SearchParametersContext";
const { REACT_APP_GETRESTAURANTS_SECRET, REACT_APP_GETFACETS_SECRET } =
  process.env;

//const GetRestaurantsEndpoint = `https://us-east-1.aws.data.mongodb-api.com/app/whatscooking-agtge/endpoint/getRestaurants?secret=${REACT_APP_GETRESTAURANTS_SECRET}`;
// const GetFacetsEndpoint = `https://us-east-1.aws.data.mongodb-api.com/app/whatscooking-agtge/endpoint/restaurants/getFacets?secret=${REACT_APP_GETFACETS_SECRET}`;

const GetRestaurantsEndpoint = `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/restaurants/incoming_webhook/getRestaurants?secret=${REACT_APP_GETRESTAURANTS_SECRET}`;
const GetFacetsEndpoint = `https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/restaurants/incoming_webhook/getFacets?secret=${REACT_APP_GETFACETS_SECRET}`;

export const useHomeFetch = () => {
  const {
    restaurants,
    setRestaurants,
    searchTerm,
    setSearchTerm,
    food,
    setFood,
    operator,
    setOperator,
    distance,
    setDistance,
    submitted,
    setSubmitted,
    setStages,
    facetStage,
    setFacetStage,
    functionScore,
    setFunctionScore,
    stars,
    setStars,
    borough,
    setBorough,
    cuisine,
    setCuisine,
    stages,
    noResultsMsg,
    setNoResultsMsg,
    cuisineBuckets,
    setCuisineBuckets,
    boroughBuckets,
    setBoroughBuckets,
    facetOverallCount,
    setFacetOverallCount,
    setShowFacets,
  } = useContext(SearchParametersContext);

  const postSearch = async () => {
    // POST TO GETRESTAURANTSENDPOINT

    let data = {
      searchTerm: searchTerm,
      food: food,
      operator: operator,
      dist: distance,
      functionScore: functionScore,
      borough: borough,
      cuisine: cuisine,
      stars: stars,
    };
    axios.post(GetRestaurantsEndpoint, data).then((res) => {
      setRestaurants(res.data.restaurants);
      if (res.data.restaurants.length === 0) {
        setNoResultsMsg(
          "NO RESULTS MATCH YOUR SEARCH. 😞 TRY DIFFERENT SEARCH PARAMETERS."
        );
      } else setNoResultsMsg("");
      setStages({
        searchStage: res.data.searchStage,
        limitStage: res.data.limitStage,
        projectStage: res.data.projectStage,
      });
      console.log("SEARCH STAGE", res.data.searchStage); //----------- FOR DEBUGGING ----------------
    });
  };

  const postFacets = async () => {
    let facetData = {
      searchTerm: searchTerm,
      food: food,
      operator: operator,
      dist: distance,
      stars: stars,
      borough: borough,
      cuisine: cuisine,
    };
    axios.post(GetFacetsEndpoint, facetData).then((res) => {
      let count = res.data.results[0].count.lowerBound.$numberLong; // facet
      setFacetOverallCount(count);
      setCuisineBuckets(res.data.results[0].facet.cuisineFacet.buckets);
      setBoroughBuckets(res.data.results[0].facet.boroughFacet.buckets);
      setFacetStage(res.data.searchMetaStage);
      console.log("GETFACETS", res.data.results[0]);
      setShowFacets(true);
    });
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (!submitted) return;

    postSearch();
    postFacets();

    setSubmitted(false);

    // eslint-disable-next-line
  }, [submitted]);

  return {
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
    cuisineBuckets,
    boroughBuckets,
    facetOverallCount,
  };
};
