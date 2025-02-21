import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartDetails from "../components/ui/CartDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null); // State for user ID
  const navigate = useNavigate();
  const cartItem = useSelector((state) => state.cartSlice.cart);

  // Calculate total and extra charges
  const total = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const extrachargers = {
    shipping: 10,
    Tax: parseInt((total * 18) / 100),
  };

  const fetchUserId = async () => {
    const id = localStorage.getItem("LoggedID");
    if (id) {
      setUserId(id);
      setCartItems(); // Store the user ID in state
    }
  };

  const setCartItems = async () => {
    console.log("Cart", cartItem);
    const response = await axios.post("http://localhost:3002/order", {
      cartItem: cartItem,
      userId: userId,
    });
    console.log("hiiii", response);
    console.log("iiiiiiiiiiid", userId);
    getCartItems();
  };

  const getCartItems = async () => {
    if (userId) {
      try {
        console.log("USer", userId);
        const response = await axios.get(`http://localhost:3002/order`);
        console.log("Peh", response.data);
        setItems(cartItem); // Set the cart items in state from the server
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };

  // Fetch user ID on component mount
  useEffect(() => {
    fetchUserId();
  }, []);

  // Fetch the cart items after the user ID is retrieved
  useEffect(() => {
    if (userId) {
      setCartItems();
    }
  }, [userId]);

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-[700px]">
      <h1 className="text-3xl font-bold text-black text-start">Cart</h1>
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
