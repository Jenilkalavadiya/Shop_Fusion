// src/hooks/useFetchData.js

import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getData } from "../redux/cartSlice";

const useFetchData = (userId) => {
  const [change, setChange] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  // console.log("Fusion", cartItems);
  const innerArray = change?.[0];
  const cartItems = innerArray?.product;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3002/order?userId=${userId.id}`
        );
        setChange(res.data);

        setLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId.id]);

//  useEffect(() => {})

  return { change, setChange, error, loading };
};

export default useFetchData;
