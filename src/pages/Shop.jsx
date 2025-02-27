import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import axios from "axios";

const Shop = () => {
  const [apidata, setapiData] = useState([]);
  // const [products, setProducts] = useState([]);


  const fetchData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    // console.log(data);
    // setProducts(data);
    setapiData(data);
  };

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

  const getCartItems = async () => {
    const userID = localStorage.getItem("isActive");
    if (!userID) {
      console.error("No userID found in localStorage. Please login again.");
      return;
    }
    console.log("Fetching cart items for userID:", userID);

    try {
      const res = await axios.get(
        `http://localhost:3002/order?userID=${userID}`
      );
      if (res.data.length > 0) {
        const cartItem = res.data[0].cartItem;
        console.log("RESSS", res.data);
        localStorage.setItem("cartItem", JSON.stringify(cartItem));
        console.log("Cart Items fetched and saved to localStorage:", cartItem);
      } else {
        console.log("No cart items found for userID:", userID);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchData();
    getCartItems();
  }, []);
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 py-10">
      {apidata.map((item, index) => {
        return <Card item={item} key={index} />;
      })}
    </div>
  );
};

export default Shop;
