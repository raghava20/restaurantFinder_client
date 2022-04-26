import React, { ChangeEvent, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const initialState = {
  name: "",
  rating: "Rating",
  review: "",
};
const AddReview = () => {
  const [formData, setFormData] = useState(initialState);
  const { id } = useParams();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name: formData.name,
        rating: formData.rating,
        review: formData.review,
      });
      if (response.data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-5">
      <h1 className="mb-2 font-medium text-xl">Add Review</h1>
      <form className="gap-2 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1">
            <label>Name:</label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full p-2 border focus:outline-blue-500 border-blue-400 rounded-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col ">
            <label>Rating:</label>
            <select
              name="rating"
              className="w-32 p-2 border rounded-sm border-blue-400 outline-blue-500 focus:border-blue-500"
              value={formData.rating}
              onChange={handleChange}
            >
              Rating
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div>
          <label>Review:</label>
          <textarea
            rows={4}
            name="review"
            placeholder="Review"
            className="w-full p-2 border focus:outline-blue-500 border-blue-300 rounded-sm"
            value={formData.review}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="border-none outline-none bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500 px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
