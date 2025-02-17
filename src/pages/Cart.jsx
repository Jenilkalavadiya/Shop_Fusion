import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartDetails from "../components/ui/CartDetails";

const Cart = () => {
  // const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartSlice.cart);
  console.log(cartItem);

  return (
    <>
      {cartItem.length > 0
        ? cartItem.map((cartData) => {
            return <CartDetails cartData={cartData} />;
          })
        : "No items Present in Cart"}
    </>
  );
};

export default Cart;
