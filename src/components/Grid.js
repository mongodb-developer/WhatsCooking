import React from 'react';
import TopCard from './TopCard';

const Grid = ({restaurants, setShowMenu, setIndex}) => {
    return (
       <div className="grid grid-cols-3 gap-6 p-2 mt-10 md:grid-cols-4 md:gap-6">
        { restaurants.map((restaurant, idx) => 
                <TopCard
                    key={restaurant.restaurant_id}
                    idx={idx+3}
                    menu={restaurant.menu}
                    setShowMenu={setShowMenu}
                    highlights={restaurant.highlights}
                    setIndex={setIndex}
                    name={restaurant.name}
                    score={restaurant.score}
                    cuisine={restaurant.cuisine}
                    borough={restaurant.borough}
                    address={restaurant.address}
                    price={restaurant.PriceRange}
                    reviews={restaurant.review_count}
                    stars={restaurant.stars}
                    sponsored={restaurant.sponsored}
                    source="Grid"
                ></TopCard>
         )}
          
        </div>
    )
}

export default Grid;
