import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header-container">
      <div className="navbar h-[80px] shadow-lg bg-gray-900 text-white flex justify-between items-center p-9">
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
          <button className="text-xl w-32 bg-stone-600 text-white rounded-full py-3">
            <NavLink to="/signup" className="font-semibold">
              Login
            </NavLink>
          </button>
          <NavLink to="/cart" className="text-2xl ">
            <FaShoppingCart />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
