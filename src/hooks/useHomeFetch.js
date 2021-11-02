import axios from "axios";
import { useContext, useEffect } from "react";
import { SearchParametersContext } from "../store/SearchParametersContext";

const GetRestaurantsEndpointTEST =
  "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/restaurants/incoming_webhook/getRestaurantsTestNov1";

//"https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/restaurants/incoming_webhook/getRestaurantsTest_Oct18";

const GetFacetsEndpoint =
  "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/restaurants/incoming_webhook/getFacets";

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
    let endpoint = GetRestaurantsEndpointTEST;

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
    axios.post(endpoint, data).then((res) => {
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
      // console.log("SEARCH STAGE", res.data.searchStage);   ----------- FOR DEBUGGING ----------------
    });
  };

  const postFacets = async () => {
    let facetData = {
      searchTerm: searchTerm,
      food: food,
      operator: operator,
      dist: distance,
    };
    axios.post(GetFacetsEndpoint, facetData).then((res) => {
      console.log("FACET RESPONSE");
      let count = res.data.results[0].count.lowerBound.$numberLong; // facet
      setFacetOverallCount(count);
      console.log(res.data.results[0].facet.cuisineFacet);
      setCuisineBuckets(res.data.results[0].facet.cuisineFacet.buckets);
      setBoroughBuckets(res.data.results[0].facet.boroughFacet.buckets);
      setFacetStage(res.data.searchMetaStage);

      console.log("CUISINE BUCKETS", cuisineBuckets);
      console.log("BOROUGH BUCKETS", boroughBuckets);
      console.log("FACET STAGE", res.data.searchMetaStageString);

      setShowFacets(true);
    });
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (!submitted) return;

    postSearch();
    postFacets();
    console.log("FACET COUNT", facetOverallCount);
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
