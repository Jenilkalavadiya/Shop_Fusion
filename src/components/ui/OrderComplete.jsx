import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderComplete = () => {
  // const [cartitem, setCartItem] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order details

  const userID = JSON.parse(localStorage.getItem("isActive"));
  console.log("Order User ID", userID);

  const getOrderDetails = async () => {
    const res = await axios.get(
      `http://localhost:3002/orderplaced?userID=${userID}`,
      userID
    );
    console.log("abc");
    setAllOrders(res.data);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  // console.log("AllOrders", allOrders.length - 1);

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-screen py-10 bg-gray-50">
        <h1 className="text-3xl font-bold mt-16 text-green-500">
          Order Completed
        </h1>
        <div className="w-[300px] h-[2px] bg-green-500 my-4"></div>

        {/* Current Order Section */}
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-10">
          <div className="main-container flex flex-col gap-10">
            {allOrders.map((order, index) => (
              <div
                key={order.orderId}
                className={`${
                  index === allOrders.length - 1
                    ? "bg-green-100 border-l-4 border-green-500"
                    : ""
                } p-5 rounded-md shadow-md mb-6`}
              >
                <h3 className="text-lg font-bold text-gray-800">
                  Order ID: {order.orderId}
                </h3>
                <div className="flex flex-wrap gap-6 mt-4">
                  {order.cartItem?.map((curElem, index) => {
                    const { title, price, image, quantity } = curElem;
                    return (
                      <div
                        key={title}
                        className="flex items-start w-full md:w-1/3 gap-4"
                      >
                        <div className="w-32 h-28 max-w-[100px] flex p-3 shrink-0 bg-gray-200 rounded-md">
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
                              Quantity:{" "}
                              <span className="ml-auto">{quantity}</span>
                            </li>
                            <li className="flex flex-wrap gap-4">
                              Total Price{" "}
                              <span className="ml-auto">${price}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => handleViewDetails(order)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render the detailed view of the selected order */}
      {selectedOrder && (
        <div className="order-details-container fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Order ID: {selectedOrder.orderId} - Details
            </h3>
            <div className="flex flex-wrap gap-6 mt-4">
              {selectedOrder.cartItem?.map((curElem) => {
                const { title, price, image, quantity } = curElem;
                return (
                  <div
                    key={title}
                    className="flex items-start w-full md:w-1/3 gap-4"
                  >
                    <div className="w-32 h-28 max-w-[100px] flex p-3 shrink-0 bg-gray-200 rounded-md">
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

            {/* Shipping info for selected order */}
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-800">
                Shipping Information
              </h4>
              <p>
                <strong>First Name:</strong> {selectedOrder.formdata.Fname}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedOrder.formdata.Lname}
              </p>
              <p>
                <strong>Address:</strong> {selectedOrder.formdata.Address}
              </p>
              <p>
                <strong>City:</strong> {selectedOrder.formdata.City}
              </p>
              <p>
                <strong>Phone no:</strong> {selectedOrder.formdata.Pnumber}
              </p>
              <p>
                <strong>Zip code:</strong> {selectedOrder.formdata.Zip}
              </p>
            </div>

            {/* Close button */}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderComplete;
