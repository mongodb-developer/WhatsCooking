import React from 'react'

const AutoSuggestions = ({ items, setSuggestions, showSuggestions, setSearchTerm, setSubmitted, setValid}) => {
    
    if (!showSuggestions) return null;
    return (
        <div className="container flex flex-col">
        {items &&
            items.map((item) => {
              return (
                <div 
                  className="pl-8 my-4 border-b border-gray-300" 
                  key={item.restaurant_id} 
                  onClick={(e)=>{
                      setSearchTerm(item.name);
                      setSubmitted(true);
                      setValid(true);
                      setSuggestions([]);
                    }}
                  >
                  {item.name}
                  </div>
              );
            })
        }
        <div className="px-4 text-white bg-san-juan-500">type keyword to search for restaurants...</div>
        </div>
    )
}

export default AutoSuggestions
