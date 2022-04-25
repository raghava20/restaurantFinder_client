import React, { FormEvent, useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const initialState = {
  name: "",
  location: "",
  price_range: "Price Range",
};

const AddRestaurant: React.FC = () => {
  const [formData, setFormData] = useState(initialState);
  const { addRestaurants }: any = useContext(RestaurantsContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData);
      const result = await RestaurantFinder.post("/", {
        name: formData.name,
        location: formData.location,
        price_range: formData.price_range,
      });
      console.log(result);
      addRestaurants(result.data.data);
      setFormData(initialState);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  return (
    <div className="mt-7 mb-3">
      <form
        className="flex flex-col sm:flex-row gap-3 py-3 px-6 lg:px-20"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <input
            type="text"
            className="border w-full border-blue-600 rounded-sm focus:outline-blue-500 p-2"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full ">
          <input
            type="text"
            className="border w-full border-blue-600 rounded-sm focus:outline-blue-500 p-2"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="w-full ">
          <select
            className="border w-full text-gray-800 border-blue-600 rounded-sm focus:outline-blue-500 p-2"
            required
            name="price_range"
            value={formData.price_range}
            onChange={handleChange}
          >
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="shadow-lg w-full shadow-blue-600 border-none rounded-lg hover:bg-blue-600 bg-blue-500 text-white px-4 py-2"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
