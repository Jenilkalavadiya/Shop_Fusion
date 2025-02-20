import React from "react";
import { useSelector } from "react-redux";
import CartDetails from "../components/ui/CartDetails";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate("/checkout");
  };
  const cartItem = useSelector((state) => state.cartSlice.cart);
  console.log("cartItem1", cartItem);

  // const dispatch = useDispatch();
  const total = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const extrachargers = {
    shipping: 10,
    Tax: parseInt((total * 18) / 100),
  };
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
  return (
    <div className="min-h-[700px]">
      <h1 className="text-3xl font-bold text-black text-start">Cart</h1>
      {cartItem.length > 0
        ? cartItem.map((cartData, index) => {
            console.log("cartItem2", cartData);
            // const { title, price, description, image, rating } = cartItem;
            return (
              <CartDetails
                cartData={cartData}
                index={index}
                // cartItem={cartItem}
              />
            );
          })
        : "No items Present in Cart"}
      <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
        <ul className="text-gray-800 space-y-4">
          <li className="flex flex-wrap gap-4 text-sm">
            Subtotal <span className="ml-auto font-bold">${total}</span>
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
              ${total + extrachargers.Tax + extrachargers.shipping}
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
