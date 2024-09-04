import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchtext] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    console.log("useEffect Rendered");
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestaurants(
      json?.data?.cards[1]?.card.card.gridElements.infoWithStyle.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus == false) {
    return (
      <h1>
        Looks like You are Offline, Please Check Your Internet Connection.
      </h1>
    );
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex">
        <div className="search m-4 p-4">
          <input
            type="input"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchtext(e.target.value);
            }}
          ></input>
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <div className="px-4 py-2 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.info.avgRating === 4
              );
              console.log("clicked");
              setFilteredRestaurant(filteredList); // Update filteredRestaurant instead of listOfRestaurants
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="res-container flex flex-wrap">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {restaurant?.info?.aggregatedDiscountInfoV3 ? (
              <RestaurantCardPromoted resData={restaurant}/>
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
