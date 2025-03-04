import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartDetails from "../components/ui/CartDetails";
import { useNavigate } from "react-router-dom";
import { setCartItems } from "../redux/cartSlice";

const Cart = () => {
  // const [cartdata, setCartData] = useState([]);
  // const [userId, setUserId] = useState(null); // State for user ID
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cartSlice.cart);
 

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  const dispatch = useDispatch();
  dispatch(setCartItems(cartItem));
  // setCartData(cartItem);
  const total = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const extrachargers = {
    shipping: 10,
    Tax: parseInt((total * 18) / 100),
  };
  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-black text-center">Cart</h1>
      {cartItem.length > 0
        ? cartItem.map((cartData, index) => {
            return (
              <CartDetails
                cartData={cartData}
                index={index}
                key={index} // Add key prop for better list rendering
              />
            );
          })
        : "No items Present in Cart"}
      <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
        <ul className="text-gray-800 space-y-4">
          <li className="flex flex-wrap gap-4 text-sm">
            Subtotal{" "}
            <span className="ml-auto font-bold">${total.toFixed(3)}</span>
          </li>
          <li className="flex flex-wrap gap-4 text-sm">
            Shipping{" "}
            <span className="ml-auto font-bold">${extrachargers.shipping}</span>
          </li>
          <li className="flex flex-wrap gap-4 text-sm">
            Tax <span className="ml-auto font-bold">${extrachargers.Tax}</span>
          </li>
          <hr className="border-gray-300" />
          <li className="flex flex-wrap gap-4 text-sm font-bold">
            Total{" "}
            <span className="ml-auto">
              ${parseInt(total + extrachargers.Tax + extrachargers.shipping)}
            </span>
          </li>
        </ul>

        <div className="mt-8 space-y-2">
          <button
            type="button"
            onClick={handleBuyNow}
            className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
          >
            Buy Now
          </button>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <img
            src="https://readymadeui.com/images/master.webp"
            alt="card1"
            className="w-10 object-contain"
          />
          <img
            src="https://readymadeui.com/images/visa.webp"
            alt="card2"
            className="w-10 object-contain"
          />
          <img
            src="https://readymadeui.com/images/american-express.webp"
            alt="card3"
            className="w-10 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
