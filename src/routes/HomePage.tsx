import React from "react";
import AddRestaurant from "../components/AddRestaurant";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default HomePage;
