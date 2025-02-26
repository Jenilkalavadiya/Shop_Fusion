import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../redux/userSlice";

const Header = () => {
  const cartItem = useSelector((state) => state.cartSlice.cart);
  const user = useSelector((state) => state.userSlice.login);
  const [items, setItems] = useState(cartItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("loggedin");
    setItems([]);
    localStorage.removeItem("isActive");
    localStorage.removeItem("UserDetail");
    dispatch(authentication(true));
    navigate("/Loginpage");
  };

  const currentUser = JSON.parse(localStorage.getItem("UserDetail"));
  // const user = useSelector((state)=>{state.us})
  // console.log("currUserData", currentUser.name);
  return (
    <div className="header-container w-screen fixed">
      <div className="navbar h-[80px] shadow-lg bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-white flex justify-between items-center p-9">
        <div className="logo">
          <NavLink className="text-3xl" to="/">
            Shop Fusion
          </NavLink>
          <pre className="text-sm">Customer satisfaction is our moto</pre>
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
              <NavLink to="/cart" className="text-2xl relative">
                <p className="bg-slate-200 text-center rounded-full absolute text-sm text-black right-[-16px] top-[-9px] left-[12px] w-4 h-4">
                  {cartItem.length}
                </p>
                <FaShoppingCart />
              </NavLink>
            </>
          ) : (
            ""
          )}

          <div className="menu">
            <select
              name="menu"
              id="menu"
              className="bg-slate-900"
              onChange={(e) => {
                if (e.target.value === "orderComplete") {
                  navigate("/orderComplete");
                }
                if (e.target.value === "user") {
                  navigate("/");
                }
                if (e.target.value === "logout") {
                  // navigate("/Loginpage");
                  handleLogOut();
                  localStorage.removeItem("cartItem");
                }
              }}
            >
              <option value="user">
                <span className="text-xl font-bold bg-slate-200 p-2 rounded-full text-black">
                  {user ? currentUser.name : "Please Login"}
                </span>
              </option>

              {user ? <option value="orderComplete">Your Orders</option> : ""}

              <option value="logout">
                <NavLink onClick={handleLogOut}>
                  {user ? "LogOut" : "Login"}
                </NavLink>
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
