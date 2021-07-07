import axios from 'axios';
import { useState, useEffect } from 'react';

const FuzzyCookingPost = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-hcogd/service/cookingPost/incoming_webhook/fuzzyPost";

const FuzzyCookingPostTEST = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-hcogd/service/TEST-DEV/incoming_webhook/test-post-cooking";

const FuzzySynonymsPostTest = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/whatscooking-hcogd/service/TEST-DEV/incoming_webhook/synonyms";

export const useHomeFetch=()=>{
    const [restaurants, setRestaurants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [operator, setOperator] = useState('text');
    const [distance, setDistance] = useState(1);
    const [pathOptions, setPathOptions] = useState(['name']);
    const [submitted, setSubmitted] = useState(false);
    const [functionScore, setFunctionScore] = useState(null);
    const [stars, setStars] = useState(1);
    const [borough, setBorough] = useState();
    const [stages, setStages] = useState({
                                            searchStage:{},
                                            limitStage:{},
                                            projectStage:{}
                                        });


    const postSearch = async() =>{
       let endpoint = FuzzyCookingPost; 

        let data = {
            arg:searchTerm,
            operator:operator,
            dist:distance,
            functionScore: functionScore,
            path: pathOptions,
            borough: borough,
            stars: stars
        }
        axios
        .post(
          endpoint,
            data
        ).then((res) => {
            setRestaurants(res.data.restaurants);
            setStages({
                searchStage:res.data.searchStage,
                limitStage:res.data.limitStage,
                projectStage:res.data.projectStage
               } );
            console.log("SEARCH STAGE", res.data.searchStage);
        });

    }

    // eslint-disable-next-line
    useEffect(()=>{
        if (!submitted) return;
       
        postSearch();
        setSubmitted(false);
        // eslint-disable-next-line
        },[submitted]);
       

    return {
        setOperator,
        operator,
        distance, 
        setDistance,
        submitted,
        setSubmitted, 
        searchTerm,
        setSearchTerm,
        restaurants,
        setRestaurants,
        pathOptions,
        setPathOptions, 
        setFunctionScore, 
        functionScore,
        stages,
        borough,
        setBorough,
        setStars,
        stars
	};

};