import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";

const Shop = () => {
  const [apidata, setapiData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    console.log(data);
    setapiData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 p-3">
      {apidata.map((item) => {
        return <Card item={item} />;
      })}
    </div>
  );
};

export default Shop;
