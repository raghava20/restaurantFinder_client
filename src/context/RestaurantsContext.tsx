import React, { useState, createContext } from "react";

interface ChildrenProps {
  children: React.ReactNode;
}

export const RestaurantsContext = createContext({});

export const RestaurantsContextProvider = ({ children }: ChildrenProps) => {
  const [restaurants, setRestaurants] = useState<string[]>([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState("");

  const addRestaurants = (restaurant: any) => {
    setRestaurants([...restaurants, restaurant]);
  };
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurants,
        setSelectedRestaurants,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
