import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../redux/userSlice";

const Header = () => {
  // const username = JSON.parse(localStorage.getItem("user"));
  const user = useSelector((state) => state.userSlice.login);
  const cartItem = useSelector((state) => state.cartSlice.cart);
  // console.log("cartItem123", cartItem);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("cartItem");
    localStorage.removeItem("isActive");
    localStorage.removeItem("UserDetail");
    dispatch(authentication(true));
  };

  const currentUser = JSON.parse(localStorage.getItem("UserDetail"));
  // const user = useSelector((state)=>{state.us})
  // console.log("currUserData", currentUser.name);
  return (
    <div className="header-container">
      <div className="navbar h-[80px] shadow-lg bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-white flex justify-between items-center p-9">
        <div className="logo">
          <NavLink className="text-3xl" to="/">
            Shop Fusion
          </NavLink>
        </div>
        <ul>
          <div className="links flex justify-center items-center gap-10">
            <li>
              <NavLink to="/" className="text-xl">
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-xl">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-xl">
                Contact
              </NavLink>
            </li>
          </div>
        </ul>
        <div className="btn flex justify-center items-center gap-10">
          {user ? (
            <>
              <span className="text-xl font-bold bg-slate-200 p-2 rounded-full text-black">
                {currentUser ? currentUser.name : ""}
              </span>
              <NavLink to="/cart" className="text-xl">
                <sup>{cartItem.length}</sup>
                <FaShoppingCart />
              </NavLink>
            </>
          ) : (
            ""
          )}
          <button className="text-xl w-32 bg-teal-200 text-black rounded-full py-3">
            <NavLink
              to="/Loginpage"
              className="font-semibold"
              onClick={handleLogOut}
            >
              {user ? "LogOut" : "Login"}
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
