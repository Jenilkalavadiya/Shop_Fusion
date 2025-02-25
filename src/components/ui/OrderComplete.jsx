import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderComplete = () => {
  const [packed, setPacked] = useState([]);
  const [info, setInfo] = useState({}); // Added state to store info

  const userID = JSON.parse(localStorage.getItem("isActive"));
  console.log("Order User ID", userID);

  const getOrderDetails = async () => {
    const res = await axios.get(
      `http://localhost:3002/orderplaced?userID=${userID}`,
      userID
    );
    const data = res.data[0].cartItem;
    const info = res.data[0].formdata;
    console.log("Order Details", info);
    setPacked(data);
    setInfo(info); // Storing the info data in the state
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center h-screen w-screen">
        <h1 className="text-3xl font-bold mt-16 text-green-500">
          Order Complete
        </h1>
        <div className="w-[300px] border-b-2 border-black h-[5px] mb-7"></div>
        <div className="main-container flex gap-10">
          {packed?.map((curElem) => {
            const { title, price, image, quantity } = curElem;
            return (
              <div key={title} className="flex items-start w-96 gap-4">
                <div className="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-200 rounded-md">
                  <img
                    src={image}
                    alt="productImg"
                    className="w-full object-contain"
                  />
                </div>
                <div className="w-full">
                  <h3 className="text-sm lg:text-base text-gray-800">
                    {title}
                  </h3>
                  <ul className="text-xs text-gray-800 space-y-1 mt-3">
                    <li className="flex flex-wrap gap-4">
                      Quantity: <span className="ml-auto">{quantity}</span>
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
        <div className="info-container bg-gray-900 p-4 text-white w-[500px] mt-7">
          <h2 className="text-lg font-bold">Shipping Information</h2>
          <div className="text-white mt-4">
            <p>
              <strong>First Name:</strong> {info.Fname}
            </p>
            <p>
              <strong>Last Name:</strong> {info.Lname}
            </p>
            <p>
              <strong>Address:</strong> {info.Address}
            </p>
            <p>
              <strong>City:</strong> {info.City}
            </p>
            <p>
              <strong>Phone no:</strong> {info.Pnumber}
            </p>
            <p>
              <strong>Zip code:</strong> {info.Zip}
            </p>
            {/* Add more fields as needed */}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderComplete;
