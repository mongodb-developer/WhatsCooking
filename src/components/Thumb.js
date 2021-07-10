import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Thumb = ({name, borough, cuisine, address, score, stars, reviews, price, sponsored}) =>{

    let modScore = score["$numberDouble"].toString().slice(0, 3);
    let priceValue;
    if (!price){
        priceValue = 0;
    } else {
        priceValue = Object.values(price)[0];
    }
    let reviewCount = Object.values(reviews)[0];
        
    let starValue = Object.values(stars);

    let image = '';

    switch(cuisine){
        case 'American':
            image = '🍲';
            break;
        case 'Hamburgers':
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

    return (
        <>
            <div className="relative px-4 py-3 text-center transition duration-500 transform bg-white border rounded-lg shadow-lg hover:scale-110">
                <div className="absolute flex items-center justify-center px-2 text-xl font-bold text-white bg-red-700 rounded-full shadow-lg -right-4 -top-4">
                    {modScore}
                </div>

                {   sponsored && 
                    <div 
                        className="absolute right-0 px-2 mx-auto text-lg text-yellow-200 bg-black rounded shadow-lg -top-4 font-body">
                        PROMOTION 🎉
                    </div>
                }
                
                <div className="pt-1 mb-1 text-xl font-bold">{name}</div>
                <div className="flex justify-around">
                    <div className="mb-2 text-6xl font-bold">{image}</div>
                    <div>
                        <h2>{cuisine}</h2>
                        <h3>{address.street}</h3> 
                        <h3>{borough}</h3>
                    </div>                 
                </div>

                <div className="flex my-auto mt-2 mb-0 BOTTOM ROW justify-evenly "> 
                    <div className="flex justify-center">
                        <ReactStars className="my-auto"
                            size={16}
                            edit={false}
                            isHalf={true}
                            value={starValue}
                        /> 
                    </div>    
                    <div className="flex justify-center">
                        <ReactStars 
                            size={16}
                            edit={false}
                            char='💵'
                            count={priceValue}
                        /> 
                    </div>
                    <h2 className="text-sm">{reviewCount} reviews</h2>
                </div>              
            </div>
        </>
    );
}

export default Thumb;
