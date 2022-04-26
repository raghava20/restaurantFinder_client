import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import StarRating from "./StarRating";

const RestaurantList: React.FC = (): JSX.Element => {
  const { restaurants, setRestaurants }: any = useContext(RestaurantsContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data);
      };
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleDelete = async (e: any, id: number) => {
    e.stopPropagation();
    await RestaurantFinder.delete("/" + id);
    setRestaurants(
      restaurants.filter((res: any) => {
        return res.id !== id;
      })
    );
  };

  const handleUpdate = async (e: any, id: number) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id: number) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <div className="w-[90%] m-auto  overflow-auto">
      <table className="w-full text-gray-200 bg-black">
        <thead>
          <tr>
            <th className="p-2 border border-slate-300 border-collapse">
              Restaurant
            </th>
            <th className="p-2 border border-slate-300 border-collapse">
              Location
            </th>
            <th className="p-2 border border-slate-300 border-collapse">
              Price Range
            </th>
            <th className="p-2 border border-slate-300 border-collapse">
              Ratings
            </th>
            <th className="p-2 border border-slate-300 border-collapse">
              Edit
            </th>
            <th className="p-2 border border-slate-300 border-collapse">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {restaurants?.map((restaurant: any, index: number) => {
            return (
              <tr
                className="bg-gray-50 text-black hover:bg-gray-100"
                key={index}
                onClick={() => handleRestaurantSelect(restaurant.id)}
              >
                <td className="p-2 border border-slate-300 border-collapse text-center">
                  {restaurant.name}
                </td>
                <td className="p-2 border border-slate-300 border-collapse text-center">
                  {restaurant.location}
                </td>
                <td className="p-2 border border-slate-300 border-collapse text-center">
                  {"$".repeat(restaurant.price_range)}
                </td>
                <td className="p-2 border border-slate-300 border-collapse text-center text-xs text-yellow-400">
                  {restaurant.avg_rating ? (
                    <div>
                      <StarRating rating={restaurant.avg_rating} /> (
                      {restaurant.count})
                    </div>
                  ) : (
                    "0 Reviews"
                  )}
                </td>
                <td className="p-2 border border-slate-300 border-collapse text-center">
                  <button
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                    className="shadow-sm border-none rounded-md text-sm text-white  shadow-yellow-600 bg-yellow-400 hover:bg-yellow-500 px-3 py-1"
                  >
                    Update
                  </button>
                </td>
                <td className="p-2 border border-slate-300 border-collapse text-center">
                  <button
                    onClick={(e) => handleDelete(e, restaurant.id)}
                    className="shadow-sm border-none rounded-md text-sm text-white shadow-red-600 bg-red-500 hover:bg-red-600 px-3 py-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
