import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ review }: any) => {
  return (
    <div className="flex flex-wrap justify-center sm:justify-center items-center mt-9">
      {review?.map((review: any) => {
        return (
          <div
            className="flex text-white flex-col border-none bg-blue-500 mr-4 mb-4 gap-5 p-5 rounded-sm shadow-md shadow-blue-400 w-[290px]"
            key={review.id}
          >
            <div className="flex flex-row justify-between items-center border-b-2 border-gray-400 pb-2">
              <div>
                <h6>{review.name}</h6>
              </div>
              <div className="text-yellow-400">
                <StarRating rating={review.rating} />
              </div>
            </div>
            <div>
              <div>{review.review}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
