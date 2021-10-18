import React from "react";
import RestaurantCard from "./RestaurantCard";

const Top3 = ({
  restaurants,
  setShowMenu,
  setIndex,
  functionScore,
  setFunctionScore,
}) => {
  return (
    <div className="flex flex-col bg-white rounded">
      <div className="flex items-center justify-center py-4 mb-0 font-bold  rounded">
        Top Picks!
      </div>
      <hr
        style={{
          color: "darkgreen",
          backgroundColor: "darkgreen",
          height: 1,
          margin: 4,
          borderColor: "darkgreen",
        }}
      />
      <div className="pt-4 pl-2 mt-4">
        {restaurants.map((restaurant, idx) => (
          <RestaurantCard
            key={restaurant.restaurant_id}
            idx={idx}
            name={restaurant.name}
            score={restaurant.score}
            cuisine={restaurant.cuisine}
            borough={restaurant.borough}
            address={restaurant.address}
            stars={restaurant.stars}
            price={restaurant.PriceRange}
            reviews={restaurant.review_count}
            sponsored={restaurant.sponsored}
            menu={restaurant.menu}
            setShowMenu={setShowMenu}
            highlights={restaurant.highlights}
            setIndex={setIndex}
            source="Top3"
            functionScore={functionScore}
            setFunctionScore={setFunctionScore}
          ></RestaurantCard>
        ))}
      </div>
    </div>
  );
};

export default Top3;
