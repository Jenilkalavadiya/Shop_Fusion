import React from "react";

const OrderComplete = () => {
  const cartItem = JSON.parse(localStorage.getItem("cartItem"));

  //   console.log("cartItem", tt);

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <h1 className="text-3xl font-bold mt-16">Order Complete</h1>
      <div className="w-[300px] border-b-2 border-black h-[5px] "></div>
      {cartItem?.map((curElem) => {
        const { title, price, image, quantity } = curElem;
        return (
          <div className="flex items-start w-96 gap-4">
            <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
              <img
                src={image}
                alt="productImg"
                className="w-full object-contain"
              />
            </div>
            <div className="w-full">
              <h3 className="text-sm lg:text-base text-gray-800">{title}</h3>
              <ul className="text-xs text-gray-800 space-y-1 mt-3">
                <li className="flex flex-wrap gap-4">
                  Quantity : <span className="ml-auto">{quantity}</span>
                </li>
                <li className="flex flex-wrap gap-4">
                  Total Price <span className="ml-auto">${price}</span>
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderComplete;
