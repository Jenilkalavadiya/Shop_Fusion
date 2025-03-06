import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCartItems } from "../redux/cartSlice";

const Shop = () => {
  const [apidata, setapiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState([]); // Array of orders (single cart object expected)
  const userID = JSON.parse(localStorage.getItem("UserDetail"))?.id;

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setapiData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3002/order?userID=${userID}`
      );
      console.log("GETDATA", res.data);
      setChange(res.data); // Expecting an array like [{ id, userID, product: [...] }]
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userID) {
      getData();
    }
  }, []);

  console.log("Change", change);

  const dispatch = useDispatch();
  // Logic to add to redux

  useEffect(() => {
    if (change.length >= 0) {
      dispatch(setCartItems(change)); // Dispatching the cartItems to Redux
    }
  }, [change, dispatch]); //
  // const cartItem = useSelector((state) => state.cartSlice.cart);
  // if (cartItem.length >= 0) {
  //   localStorage.setItem("cartItem", JSON.stringify(cartItem));
  // }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 py-7 min-h-[800px]">
      {apidata.map((item, index) => {
        return (
          <Card product={item} change={change} getData={getData} key={index} />
        );
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
