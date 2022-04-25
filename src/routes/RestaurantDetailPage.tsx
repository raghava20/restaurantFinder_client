import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurants, setSelectedRestaurants }: any =
    useContext(RestaurantsContext);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await RestaurantFinder.get(`/${id}`);
        console.log(result.data);
        setSelectedRestaurants(result.data);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="w-[90%] md:w-[70%] m-auto">
      <AddReview />
      <h3 className="text-center text-xl font-normal">
        Restaurant: {selectedRestaurants?.restaurant?.name}
      </h3>
      <div className="text-center text-yellow-400 mt-2">
        <StarRating rating={selectedRestaurants?.restaurant?.avg_rating} />
        &nbsp;(
        {selectedRestaurants?.restaurant?.count
          ? selectedRestaurants?.restaurant?.count
          : 0}
        )
      </div>
      <Reviews review={selectedRestaurants.review} />
    </div>
  );
};

export default RestaurantDetailPage;
