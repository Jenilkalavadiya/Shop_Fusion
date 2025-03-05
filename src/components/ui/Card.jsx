import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Card = ({ product }) => {
  const [change, setChange] = useState([]);
  const { title, price, description, image, rating } = product;
  const userID = JSON.parse(localStorage.getItem("UserDetail"));
  // console.log("USERID", userID.id);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3002/order?userID=${userID.id}`,
        userID
      );
      console.log("GETDATA", res.data);
      setChange(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const setCartItems = async () => {
  //   const tempProduct = [];
  //   try {
  //     console.log("change", change);

  //     const existingUserCart = change.find((item) => item.userID === userID.id);
  //     console.log("existingUser", existingUserCart);

  //     if (existingUserCart) {
  //       console.log("matching user found.");

  //       const existingProduct = existingUserCart.product.find(
  //         (item) => item.id === product.id
  //       );

  //       if (existingProduct) {
  //         const newQuantity = existingProduct.quantity + 1;
  //         tempProduct = {
  //           ...existingProduct,
  //           quantity: newQuantity,
  //         };
  //       }
  //       console.log("Temp", tempProduct);
  //     } else {
  //       console.log("No matching user found.");
  //       const newItem = tempProduct.push(product);
  //       console.log("NEWCART", newItem);
  //       console.log("Temp111", tempProduct);
  //       setChange(tempProduct);
  //       const response = await axios.post("http://localhost:3002/order", {
  //         userID: userID.id,
  //         product: tempProduct,
  //       });
  //       console.log("SETRES", response.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const setCartItems = async () => {
    try {
      const existingUserCart = change.find((item) => item.userID === userID.id);
      const tempProduct = [...change];
      console.log("tempProduct", tempProduct);

      if (existingUserCart) {
        console.log("matching user found.");

        const existingProduct = existingUserCart.product.find(
          (item) => item.id === product.id
        );

        if (existingProduct) {
          const newQuantity = existingProduct.quantity + 1;

          const updatedProduct = {
            ...existingProduct,
            quantity: newQuantity,
          };

          tempProduct[0].product.push(updatedProduct);
        } else {
          tempProduct[0].product.push(product);
        }
        console.log("Temp after update:", tempProduct);
        setChange(tempProduct);
      } else {
        console.log("No matching user found.");
        tempProduct.push(product);

        console.log("Temp after adding new product:", tempProduct);

        const response = await axios.post("http://localhost:3002/order", {
          userID: userID.id,
          product: tempProduct,
        });

        // console.log("SETRES", response.data);
      }
      // const response = await axios.post("http://localhost:3002/order", {
      //   tempProduct,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtn = () => {
    setCartItems();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden mx-auto max-w-[350px] max-h-[650px] p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate max-w-[230px]">
          {title.slice(0, 20)}
          {title.length > 20 && "..."}
        </h3>
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={image}
          alt={title}
          className="object-contain aspect-video w-full max-h-[200px] rounded-lg shadow-md transition-transform transform hover:scale-105"
        />
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold">Description:</span>{" "}
          {description.length > 50
            ? description.slice(0, 50) + "..."
            : description}
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">${price}</h3>
        <div className="flex items-center text-sm text-yellow-500">
          <span className="mr-1">⭐ {rating.rate}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="px-6 py-2 rounded-lg text-white text-sm font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-300 w-full max-w-[220px]"
          onClick={() => {
            handleBtn();
          }}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Card;

//         response.data &&
//         response.data.length > 0 &&
//         response.data[0].cartItem
//       ) {
//         console.log("Cart items found:", response.data[0].cartItem);
//         dispatch(setCartItems(response.data[0].cartItem));
//         setZoo(response.data[0].cartItem);
//       } else {
//         console.log("No cart items found for this user.");
//         dispatch(setCartItems([])); // Ensure Redux state is updated with an empty array
//         setZoo([]); // Set local state to an empty array
