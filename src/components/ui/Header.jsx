import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../redux/userSlice";
import axios from "axios";

const Header = () => {
  const cartItem = useSelector((state) => state.cartSlice.cart);
  const user = useSelector((state) => state.userSlice.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = JSON.parse(localStorage.getItem("isActive"));
  // const cartItem = useSelector((state) => state.cartSlice.cart);
  const setCartItems = async () => {
    if (userID) {
      try {
        const existingOrderResponse = await axios.get(
          `http://localhost:3002/order?userID=${userID}`
        );
        if (existingOrderResponse.data.length > 0) {
          // Update the existing order if it exists
          const order = existingOrderResponse.data[0];
          const updatedOrder = { ...order, cartItem: cartItem };
          await axios.put(
            `http://localhost:3002/order/${order.id}`,
            updatedOrder
          );
        } else {
          await axios.post("http://localhost:3002/order", {
            userID: userID,
            cartItem: cartItem,
          });
        }
      } catch (error) {
        console.error("Error saving cart data:", error);
      }
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    setCartItems();
    dispatch(authentication(true));
    navigate("/Loginpage");
  };

  const currentUser = JSON.parse(localStorage.getItem("UserDetail"));

  return (
    <div className="header-container w-full sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
      <div className="navbar h-[80px] flex justify-between items-center p-4 md:p-6 shadow-xl text-white">
        <div className="logo flex flex-col justify-center">
          <NavLink
            className="text-3xl font-bold hover:text-yellow-400 transition-all"
            to="/"
          >
            Shop Fusion
          </NavLink>
          <p className="text-sm mt-1 hidden md:block">
            Customer satisfaction is our motto
          </p>
        </div>

        <div className="links flex gap-10 md:flex">
          <NavLink
            to="/"
            className="text-xl hover:text-yellow-400 transition-colors duration-200"
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className="text-xl hover:text-yellow-400 transition-colors duration-200"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="text-xl hover:text-yellow-400 transition-colors duration-200"
          >
            Contact
          </NavLink>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button className="text-2xl hover:text-yellow-400 transition-all">
            <FaShoppingCart />
          </button>
        </div>

        <div className="btn flex items-center gap-10">
          {user && (
            <NavLink to="/cart" className="relative text-2xl">
              <p className="absolute bg-red-500 text-xs rounded-full text-white px-2 py-1 top-[-8px] right-[-12px]">
                {cartItem.length}
              </p>
              <FaShoppingCart className="hover:text-yellow-400 transition-all" />
            </NavLink>
          )}

          {user ? (
            <div className="relative">
              <select
                name="menu"
                id="menu"
                className="bg-gray-800 text-white py-2 px-4 rounded-lg outline-none cursor-pointer hover:bg-gray-700 transition-all"
                // value={user ? currentUser.name : ""}
                onChange={(e) => {
                  if (e.target.value === "orderComplete") {
                    navigate("/orderComplete");
                  }
                  if (e.target.value === "user") {
                    navigate("/");
                  }
                  if (e.target.value === "logout") {
                    handleLogOut();
                  }
                }}
              >
                <option value="">{user ? currentUser.name : "Login"}</option>
                {user && <option value="orderComplete">Your Orders</option>}
                <option value="logout">{user ? "LogOut" : "Login"}</option>
              </select>
            </div>
          ) : (
            <button className="bg-gray-800 text-white py-2 px-4 rounded-lg outline-none cursor-pointer hover:bg-gray-700 transition-all">
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
