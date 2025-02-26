import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import axios from "axios";

const Shop = () => {
  const [apidata, setapiData] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    console.log(data);
    setProducts(data);
    setapiData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 py-20">
      {apidata.map((item, index) => {
        return <Card item={item} key={index} />;
      })}
    </div>
  );
};

export default Shop;
