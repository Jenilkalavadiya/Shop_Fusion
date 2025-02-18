import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartDetails from "../components/ui/CartDetails";
import { totalsum } from "../redux/cartSlice";

const Cart = () => {
  const cartItem = useSelector((state) => state.cartSlice.cart);
  console.log("cartItem1", cartItem);
  const dispatch = useDispatch();
  const total = cartItem.reduce((acc, item) => acc + item.price, 0);
  return (
    <div className="min-h-[700px]">
      <h1 className="text-3xl bg-gray-900 font-bold text-white text-center">
        Cart Items
      </h1>
      {cartItem.length > 0
        ? cartItem.map((cartData, index) => {
            const { title, price, description, image, rating } = cartItem;
            return <CartDetails cartData={cartData} index={index} />;
          })
        : "No items Present in Cart"}
      <div class="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
        <ul class="text-gray-800 space-y-4">
          <li class="flex flex-wrap gap-4 text-sm">
            Subtotal <span class="ml-auto font-bold">{total}</span>
          </li>
          <li class="flex flex-wrap gap-4 text-sm">
            Shipping <span class="ml-auto font-bold">$2.00</span>
          </li>
          <li class="flex flex-wrap gap-4 text-sm">
            Tax <span class="ml-auto font-bold">$4.00</span>
          </li>
          <hr class="border-gray-300" />
          <li class="flex flex-wrap gap-4 text-sm font-bold">
            Total <span class="ml-auto">{total + 2 + 4}</span>
          </li>
        </ul>

        <div class="mt-8 space-y-2">
          <button
            type="button"
            class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
          >
            Buy Now
          </button>
          <button
            type="button"
            class="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
          >
            Continue Shopping
          </button>
        </div>

        <div class="mt-4 flex flex-wrap justify-center gap-4">
          <img
            src="https://readymadeui.com/images/master.webp"
            alt="card1"
            class="w-10 object-contain"
          />
          <img
            src="https://readymadeui.com/images/visa.webp"
            alt="card2"
            class="w-10 object-contain"
          />
          <img
            src="https://readymadeui.com/images/american-express.webp"
            alt="card3"
            class="w-10 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
