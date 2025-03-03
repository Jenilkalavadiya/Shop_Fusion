import React from "react";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  deleteItemToCart,
  increaseItemQuantity,
} from "../../redux/cartSlice";


const CartDetails = ({ cartData, index }) => {
  const dispatch = useDispatch();
  const { title, price, description, image, category, id, quantity } = cartData;

  // const {cartItem} = useSelector((state)=>state.)
  

  return (
    <>
      <div className="font-sans md:max-w-full max-md:max-w-xl mx-auto bg-white py-4">
        <div className="md:col-span-2 bg-gray-100 p-4 rounded-md ">
          <hr className="border-gray-300 mt-2 mb-4" />
          <div className="space-y-1 flex gap-4">
            <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
              <img
                src={image}
                alt="shoe"
                className="w-full h-full object-contain"
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">{title}</h3>
              <button
                onClick={() => dispatch(deleteItemToCart(index))}
                className="text-xs text-red-500 cursor-pointer mt-0.5"
              >
                Remove
              </button>
              <div className="discription">
                <p className="text-sm text-gray-600">
                  <span className="text-md font-bold">Decription : </span>
                  {description}
                </p>
              </div>
              <div className="category flex">
                <p className="text-sm text-gray-600">
                  <span className="text-md font-bold">Category</span> :
                  {category}
                </p>
              </div>
              <div>
                <div className="flex gap-2 items-center border border-gray-300 bg-white px-3 py-2 w-max">
                  <button
                    type="button"
                    className="border-none outline-none"
                    onClick={() => dispatch(decreaseItemQuantity(id))}
                  >
                    <span className="text-black">
                      <RiSubtractLine />
                    </span>
                  </button>
                  <span className="text-gray-800 text-sm font-semibold px-3">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="border-none outline-none"
                    onClick={() => dispatch(increaseItemQuantity(id))}
                  >
                    <span className="text-black">
                      {" "}
                      <IoMdAdd />{" "}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-auto flex justify-end">
            <h4 className="text-base font-bold text-gray-800">
              ${price * quantity}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
