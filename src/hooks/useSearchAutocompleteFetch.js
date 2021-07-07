import { useState, useEffect } from 'react';

const initialState={
    
    suggestions:[]
};

//const Suggestions_AC_Endpoint ="https://webhooks.mongodb-realm.com/api/client/v2.0/app/restaurantfinder-nxtzz/service/restaurants/incoming_webhook/restaurants_autocomplete";

export const useSearchAutocompleteFetch= ()=>{
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState(initialState);
    const [showSuggestions, setShowSuggestions] = useState(false);

    console.log("SEARCHTERM: " + searchTerm);

   
    // this is a function definition that calls another function API.fetchContent()
    const fetchAC_Content = async (searchTerm) =>{
        let endpoint = Suggestions_AC_Endpoint;

        if (searchTerm){
            endpoint = endpoint +`?restname=${searchTerm}`;
        }
        try {
                
            let restaurants = await (await fetch(endpoint)).json();

            setSuggestions({suggestions: restaurants});
        } catch (error){
            console.error(error);
        }
      
       
    };

    // initial render and search with 1 page calling the fetchContent function above
    // eslint-disable-next-line
    useEffect(()=>{
         setSuggestions(initialState);
         fetchAC_Content(searchTerm);
         // eslint-disable-next-line
    }, [searchTerm]);
    return {
        suggestions, 
        setSuggestions, 
        showSuggestions,
        setShowSuggestions
	};

};
