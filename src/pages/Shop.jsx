import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCartItems } from "../redux/cartSlice";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [apidata, setapiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setapiData(data);
    setLoading(false);
  };
  const dispatch = useDispatch();

  const cartItem = useSelector((state) => state.cartSlice.cart);

  const userID = localStorage.getItem("isActive");
  //   if (!userID) {
  //     console.error("No userID found in localStorage. Please login again.");
  //     return;
  //   }
  //   console.log("Fetching cart items for userID:", userID);
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3002/order?userID=${userID}`,
  //       userID
  //     );
  //     if (res.data.length > 0) {
  //       console.log("PPPPPPP", res.data);
  //       const cartItem = res.data[0].cartItem;
  //       console.log("RESSS", cartItem);
  //       console.log("Cart Items fetched", cartItem);
  //       dispatch(setCartItems(cartItem));
  //     } else {
  //       console.log("No cart items found for userID:", userID);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart items:", error);
  //   }
  // };

  const getCartItems = async () => {
    if (userID) {
      try {
        const response = await axios.get(
          `http://localhost:3002/order?userID=${userID}`
        );
        // Check if response.data is empty or if cartItem is missing
        if (
          response.data &&
          response.data.length > 0 &&
          response.data[0].cartItem
        ) {
          console.log("Cart items found:", response.data[0].cartItem);
          dispatch(setCartItems(response.data[0].cartItem));
          setItems(response.data[0].cartItem);
        } else {
          console.log("No cart items found for this user.");
          dispatch(setCartItems([])); // Ensure Redux state is updated with an empty array
          setItems([]); // Set local state to an empty array
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  };
  useEffect(() => {
    fetchData();
    getCartItems();
  }, []);

  if (cartItem.length >= 0) {
    localStorage.setItem("cartItem", JSON.stringify(cartItem));
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 py-7 min-h-[800px]">
      {apidata.map((item, index) => {
        return <Card item={item} key={index} />;
      })}
    </div>
  );
};

export default Shop;

// const getCartItems = async () => {
//   const res = await axios.get(
//     `http://localhost:3002/order?userID=${userID}`,
//     userID
//   );
//   const ID = res.data[0].userId;
//   const cartItem = res.data[0].cartItem;
//   // localStorage.setItem("cartItem", JSON.stringify(cartItem));
//   console.log("AAAAA", cartItem);
// };
