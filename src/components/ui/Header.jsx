import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../redux/userSlice";

const Header = () => {
  // const username = JSON.parse(localStorage.getItem("user"));
  const vap = useSelector((state) => state.userSlice.login);
  const count = useSelector((state) => state.cartSlice.cart);
  // console.log("Count", count);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem("loggedin");
    dispatch(authentication(true));
  };

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
          <button className="text-xl w-32 bg-teal-200 text-black rounded-full py-3">
            <NavLink
              to="/Loginpage"
              className="font-semibold"
              onClick={handleLogOut}
            >
              {vap ? "LogOut" : "Login"}
            </NavLink>
          </button>
          <NavLink to="/cart" className="text-xl">
            <sup>{count.length}</sup>
            <FaShoppingCart />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
