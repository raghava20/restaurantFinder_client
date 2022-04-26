import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdatePage = () => {
  const { id } = useParams();
  const [updateData, setUpdateData] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await RestaurantFinder.get(`/${id}`);
      setUpdateData(result.data.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await RestaurantFinder.put(`/${id}`, {
      name: updateData.name,
      location: updateData.location,
      price_range: updateData.price_range,
    });
    navigate("/");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  return (
    <div className="w-[90%] sm:w-[70%] m-auto">
      <h1 className="text-4xl text-center mt-5">Update Restaurant</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mt-10 gap-6">
        <div>
          <label htmlFor="name" className="text-md font-medium">
            Name:
          </label>
          <input
            type="text"
            className="w-full border rounded-sm border-blue-500 focus:outline-blue-600 p-2"
            value={updateData?.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location" className="text-md font-medium">
            Location:
          </label>
          <input
            type="text"
            className="w-full border rounded-sm border-blue-500 focus:outline-blue-600 p-2"
            value={updateData?.location}
            name="location"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price_range" className="text-md font-medium">
            Price Range:
          </label>
          <input
            type="number"
            className="w-full border rounded-sm border-blue-500 focus:outline-blue-600 p-2"
            value={updateData?.price_range}
            name="price_range"
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto mr-3 px-4 py-2 border-none bg-slate-300 text-slate-600 hover:bg-slate-200 hover:text-slate-700 rounded-md shadow-md shadow-slate-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 border-none bg-indigo-500 text-white hover:bg-indigo-400 rounded-md shadow-md shadow-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
