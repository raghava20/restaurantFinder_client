import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import HomePage from "./routes/HomePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants/:id/update" element={<UpdatePage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
        </Routes>
      </BrowserRouter>
    </RestaurantsContextProvider>
  );
};

export default App;
