import axios from "axios";
import { useContext, useEffect } from "react";
import { SearchParametersContext } from "../store/SearchParametersContext";

const GetRestaurantsEndpointTEST =
  "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-agtge/service/restaurants/incoming_webhook/getRestaurantsTest_Oct18";

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
      console.log("SEARCH STAGE", res.data.searchStage);
    });
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (!submitted) return;

    postSearch();
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
    borough,
    setBorough,
    cuisine,
    setCuisine,
    setStars,
    stars,
    noResultsMsg,
    setNoResultsMsg,
  };
};
