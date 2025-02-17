import React from "react";
// import ReactStars from "react-rating-stars-component";
import { addItemToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  // console.log(cartItem)
  // console.log("cartitem", cartItem);
  const { title, price, description, image, rating } = item;
  return (
    // <div className="flex flex-col">
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] py-2 max-w-[350px] max-h-[650px] p-2 rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-2">
      <div className="flex items-center gap-2 px-6">
        <h3 className="text-xl text-gray-800 font-bold flex-1">
          {title.slice(0, 20) + "..."}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18px"
          className="cursor-pointer fill-blue-600 shrink-0"
          viewBox="0 0 64 64"
        >
          <path
            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
            data-original="#000000"
          ></path>
        </svg>
      </div>
      <div className="flex justify-center">
        <img
          src={image}
          alt=""
          className="object-contain max-h-[200px] my-6 "
        />
      </div>
      <div className="px-6">
        <p className="text-sm text-gray-600 leading-relaxed font-semibold">
          Description: {description.slice(0, 50) + "..."}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <h3 className="text-xl text-gray-800  flex-1 font-bold">${price}</h3>
          <h3 className="text-xl text-gray-800 flex-1">
            <span className="font-bold">Rating :</span> {rating.rate}
          </h3>
        </div>
        <div className="btn-div flex justify-center items-center mt-4">
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider w-2/5 bg-blue-600 hover:bg-blue-700 outline-none"
            onClick={() => dispatch(addItemToCart(item))}
          >
            Order now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

// {/* <ReactStars
//               count={5}
//               value={2}
//               size={24}
//               activeColor="#ffd700"
//             /> */}
