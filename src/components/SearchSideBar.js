import React from 'react';
import ReactStars from 'react-rating-stars-component';

const SearchSideBar = ({setOperator, operator, distance, setDistance, setShowDistanceInput, showDistanceInput, 
    setValid, setSubmitted, setStars, stars, borough, setBorough, setShowSuggestions }) => {
    
    const ratingChanged =(rating)=>{
        setStars(rating);
    }
    
    const handleNearSearch = event =>{
        setOperator('near'); 
        setShowDistanceInput(false);
        setShowSuggestions(false);
        console.log("NEAR SEARCH");
        handleSearch(event);
    }

    const handleGeoSearch = event =>{
        event.preventDefault(); 
        setOperator('geoWithin'); 
        console.log("GEOSEARCH");
        setShowSuggestions(false);
        handleSearch(event);
    }

    const handleSearch = event =>{
        event.preventDefault();
        setValid(true);
        setShowSuggestions(false);
        setSubmitted(true);
    }

    const handleSearchMaster = event =>{
        event.preventDefault();
        if (operator==="text") handleSearch(event);
        else if (operator==="near") handleNearSearch(event);
        else handleGeoSearch(event);
    }

    const onChangeRadio = e =>{  
        setBorough(e.target.value)
    }
    let active ="w-20 h-12 my-auto text text-white bg-gradient-to-r from-mongo-700 to-mongo-600 border border-green-700 rounded hover:shadow-2xl hover:bg-green-700 transform hover:scale-110 focus:outline-none" ;
    let inactive="w-20 h-12 my-auto text text-white bg-gray-400 border border-gray-500 rounded hover:shadow-2xl hover:bg-green-800 transform hover:scale-110 focus:outline-none" ;


    return (
        <>
        <div className="flex flex-col bg-white border border-gray-300 rounded left-10">
        <div className="flex items-center justify-center py-4 font-bold text-white rounded bg-san-juan-500">Advanced Search Features</div>
            <div className="flex h-16 px-2 ">
            {  
                (operator === 'text') ?   <button type='button' className={active} onClick={()=>setOperator('text')} >text</button>
                :  <button type='button' className={inactive} onClick={()=>{setOperator('text'); setShowDistanceInput(false)}}>text</button>
            }
            
            {  
                (operator === 'near') ?   <button type='button' className={active} onClick={()=>setOperator('text')} >near</button>
                :  <button type='button' className={inactive} onClick={handleNearSearch}>near</button>
            }
    
            {  
                (operator === 'geoWithin') ?   
                <button type='button' className={active} 
                    onClick={()=>{setOperator('text'); setShowDistanceInput(false)}} >geoWithin</button>
                :  <button type='button' className={inactive} onClick={()=>{setOperator('geoWithin');setShowDistanceInput(true)}}>geoWithin</button>
            }
    
            </div> 
             { showDistanceInput && 
                <div className="flex items-center pb-2 mx-4">
                    <label className="font-bold text-san-juan-800">Distance: </label>
                    <input 
                        type="text" 
                        placeholder={distance} 
                        value={distance}
                        onChange={event => setDistance(event.target.value)}
                        className="w-16 mx-auto leading-10 text-center bg-transparent rounded outline-none"
                        onSubmit={handleSearchMaster}
                    ></input>
                </div>
            } 
            <hr style={{
                color: 'darkgreen',
                backgroundColor: 'darkgreen',
                height: 2,
                margin:6,
                borderColor : 'darkgreen'
            }}/>   
            
            
            <div className="mx-auto">
                <label className="font-bold text-tolopea-500">Average Star Rating: </label>
                <ReactStars
                    size={36}
                    activeColor="#ffd700"
                    onChange={ratingChanged}    
                    count={5}
                    color='black'
                    isHalf='true'
                    value={stars}
                />
            </div>
            <hr style={{
                color: 'darkgreen',
                backgroundColor: 'darkgreen',
                height: 2,
                margin:6,
                borderColor : 'darkgreen'
            }}/>   
            <br />
        <div onChange={onChangeRadio}>
            <div className="mb-2 ml-10 space-x-6 cursor-pointer borough">
                <input 
                    type="radio"
                    name="borough" 
                    value="Manhattan"
                    checked={borough === 'Manhattan'}
                  />   
                <label for="Manhattan">Manhattan</label>
                
            </div>
            <div className="mb-2 ml-10 space-x-6 cursor-pointer checkbox-borough">
                <input 
                    type="radio" 
                    value="Brooklyn"
                    name="borough"
                    checked={borough === 'Brooklyn'}
                />
                <label for="Brooklyn">Brooklyn</label>
            </div>
            <div className="mb-2 ml-10 space-x-6 cursor-pointer checkbox-borough">
                <input 
                    type="radio" 
                    value="Queens"
                    name="borough"
                    checked={borough === 'Queens'}     
                />
                <label for="Queens">Queens</label>
            </div>
            <div className="mb-2 ml-10 space-x-6 cursor-pointer checkbox-borough">
                <input 
                    type="radio" 
                    value="Bronx"
                    name="borough"
                    checked={borough==='Bronx'}   
                />
                <label for="Bronx">Bronx</label>
            </div>
            
            <div className="mb-2 ml-10 space-x-6 cursor-pointer checkbox-borough">
                <input 
                    type="radio" 
                    value="Staten Island"
                    name="borough"
                    checked={borough==='Staten Island'}   
                />
                <label for="Staten Island">Staten Island</label>
            </div>
        </div>
            
               
        
        <button className="flex items-center justify-center p-4 mx-10 my-4 font-bold text-white transform rounded bg-night-shadz-500 hover:shadow-2xl hover:bg-red-900 hover:scale-110 focus:outline-none"
            type="button" onClick={handleSearchMaster}
        
        >Submit</button>
        </div>
        </>
            

    )
}

export default SearchSideBar;


