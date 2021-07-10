import React from 'react';
import ReactStars from 'react-rating-stars-component'; 

const RestaurantCard = ({name, idx, setIndex, borough, cuisine, address, score, reviews, price, stars, sponsored, setShowMenu, source, functionScore }) =>{
    
    let modScore = score["$numberDouble"].toString().slice(0, 3);
    let starValue = Object.values(stars)[0];
    let reviewCount;
    if (!reviews){
        reviewCount=0
    } else {
        reviewCount= Object.values(reviews)[0];
    }
    let priceValue;
    if (!price){
        priceValue = 0;
    } else {
        priceValue = Object.values(price)[0];
    }

    let image = '';

    switch(cuisine){
        case 'American':
            image = '🍲';
            break;
        case 'burger':
            image = '🍔';
            break;
        case 'Pizza':
            image = '🍕';
            break;
        case 'Italian':
        case 'Pizza/Italian':
            image = '🍝';
            break;
        case 'Chinese':
            image = '🍜';
            break;
        case 'Café/Coffee/Tea':
            image = '☕';
            break;
        case 'French':
            image= '🥖';
            break;
        case 'Bakery':
            image= '🧁';
            break;
        case 'Japanese':
            image = '🍱';
            break;
        default:
            image ='🥗';
    }

    let dollars = [];

    for (let i =0; i < priceValue; i++){
        dollars.push(i);
    }

    return (
        <>
        <div className="relative flex flex-col justify-around w-full px-4 py-3 mb-10 text-center transition duration-500 transform bg-white border rounded-lg shadow-lg hover:scale-110">
            { source === "Top3" ?   
                <div className="absolute px-2 mx-auto text-xl font-bold text-white transition duration-700 transform rounded-full shadow-lg hover:scale-150 bg-gradient-to-r from-mongo-700 to-mongo-600 -top-4">
                    {modScore}
                </div> 
                :
                <div className="absolute px-2 mx-auto text-xl font-bold text-white transition duration-700 transform rounded-full shadow-lg hover:scale-150 bg-gradient-to-r from-red-700 to-red-600 -top-4">
                    {modScore}
                </div>  
            }
            {   (functionScore === 'function' && sponsored) && 
                <div 
                    className="absolute right-0 px-2 mx-auto text-lg text-white transition duration-700 transform bg-black rounded shadow-lg -top-4 font-body hover:scale-150">
                    SPONSORED 🎉
                </div>
            }
            <div onClick={()=>{setIndex(idx); setShowMenu(true)}}
                className="absolute right-0 px-2 mx-auto text-lg bg-white border rounded shadow-lg -bottom-4 font-body border-mongo">
                    Show Menu 👓
            </div>
        
            <div className="pt-1 mb-1 text-lg font-bold">{name}</div>
                        
            <div className="flex justify-around">
                <div className="my-auto mb-2 text-6xl font-bold">{image}</div>
                <div className="my-auto">
                    <h2>{cuisine}</h2>
                    <h3>{address.street} </h3> 
                    <h2>{borough}</h2>
                </div> 
            </div>
                    
            <div className="flex my-auto mt-2 mb-0 BOTTOM ROW justify-evenly "> 
                <div className="flex justify-center">         
                    <ReactStars className="my-auto "
                        size={16}
                        edit={false}
                        isHalf={true}
                        value={starValue}
                    /> 
                </div>    
                <div className="flex justify-center">
                    { dollars.map((dollar, idx) =>
                        <svg xmlns="http://www.w3.org/2000/svg" key={idx} className="w-5 h-5 text-4xl text-green-700" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                    )}  
                </div>
                <h2 className="text-sm">{reviewCount} reviews</h2>
            </div>
        </div>                       
        </>    
    );
}

export default RestaurantCard;

