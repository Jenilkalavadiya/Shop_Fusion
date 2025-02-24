import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkform = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCancelClick = () => {
    navigate("/cart");
  };

  return (
    <div className="flex justify-center items-center min-h-[700px]">
      <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0 ">
        <h2 className="text-2xl font-bold text-gray-800">
          Complete your order
        </h2>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-sm lg:text-base text-gray-800 mb-4">
              Personal Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="Fname"
                  id="Fname"
                  placeholder="First Name"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="Lname"
                  id="Lname"
                  placeholder="Last Name"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="Email"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>

              <div>
                <input
                  type="number"
                  name="Pnumber"
                  id="Pnumber"
                  placeholder="Phone No."
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm lg:text-base text-gray-800 mb-4">
              Shipping Address
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="Address"
                  id="Address"
                  placeholder="Address Line"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="City"
                  id="City"
                  placeholder="City"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="State"
                  id="State"
                  placeholder="State"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="Zip"
                  id="Zip"
                  placeholder="Zip Code"
                  className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>
            </div>

            <div className="flex gap-4 max-md:flex-col mt-8">
              <button
                type="button"
                onClick={handleCancelClick}
                className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                onClick={()=>dispatch()}
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkform;
