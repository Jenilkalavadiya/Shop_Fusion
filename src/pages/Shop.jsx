import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner/Spinner";
import { useSelector } from "react-redux";

const Shop = () => {
  const [apidata, setapiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setapiData(data);
    setLoading(false);
  };

  const cartItem = useSelector((state) => state.cartSlice.cart);
  // console.log("BBBBBBB", userID);

  useEffect(() => {
    fetchData();
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
