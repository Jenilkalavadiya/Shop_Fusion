import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, setCartItems } from "../../redux/cartSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useFetchData from "../useFetchData";
import { Navigate } from "react-router-dom";

const Card = ({ product }) => {
  // const [change, setChange] = useState(null);
  // console.log("change", change);
  const dispatch = useDispatch();
  const { title, price, description, image, rating } = product;
  const userID = JSON.parse(localStorage.getItem("UserDetail"));
  console.log("USERID", userID.id);

  const handleOrderNow = (product) => {
    // dispatch(addItemToCart(item));
    setCartItems();
  };
  const { change, setChange } = useFetchData(userID);

  const setCartItems = async () => {
    try {
      // Find the existing cart item for the user
      const existingItem = change.find(
        (item) => item.userId === userID.id // Check the userId to find the correct cart
      );

      console.log("existingItem", existingItem);

      if (existingItem) {
        // If the item already exists, check if the product is already in the cart
        const existingProduct = existingItem.product.find(
          (item) => item.id === product.id // Check if the product already exists
        );

        if (existingProduct) {
          const updatedProduct = {
            ...existingProduct,
            quantity: existingProduct.quantity + 1,
          };

          // Create a new product array with the updated product
          const updatedProducts = existingItem.product.map((item) =>
            item.id === product.id ? updatedProduct : item
          );

          console.log("existingProduct", existingProduct);

          // Send a PUT request to update the product quantity on the server
          await axios.put(`http://localhost:3002/order/${existingItem.id}`, {
            ...existingItem,
            product: updatedProducts, // Ensure we're sending the updated array
          });

          // Update the local state to reflect the change
          setChange((prevState) =>
            prevState.map((item) =>
              item.id === existingItem.id
                ? { ...item, product: updatedProducts }
                : item
            )
          );
          toast.success("Product quantity updated in cart");
        } else {
          // If the product doesn't exist in the cart, add it to the product array
          const updatedProducts = [
            ...existingItem.product,
            { ...product, quantity: 1 },
          ];

          // Send a PUT request to update the product array on the server
          await axios.put(`http://localhost:3002/order/${existingItem.id}`, {
            ...existingItem,
            product: updatedProducts, // Ensure we're sending the updated array
          });

          // Update the local state to reflect the new product addition
          setChange((prevState) =>
            prevState.map((item) =>
              item.id === existingItem.id
                ? { ...item, product: updatedProducts }
                : item
            )
          );
          // Navigate("/cart");
          toast.success("Product added to cart");
        }
      } else {
        // If the user doesn't have any cart, create a new entry with the first product
        const res = await axios.post("http://localhost:3002/order", {
          userId: userID.id,
          product: [{ ...product, quantity: 1 }],
        });

        console.log("postData", res.data);
        toast.success("Product added to cart");

        // Update the local state with the new cart item
        setChange((prevState) => [...prevState, res.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const setCartItems = async () => {
  //   try {
  //     const res = await axios.post(`http://localhost:3002/order`, {
  //       userID: userID.id,
  //       cartItem: [{...item,quantity:1}],
  //     });
  //     if(userID.id)
  //     console.log("Response:", res.data);
  //   } catch (error) {
  //     console.error(
  //       "Error posting cart items:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  // const getData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3002/order?userID=${userID}`
  //     );
  //     setChange(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (userID) {
  //     getData();
  //   }
  // }, []);

  //   const setCartItems = async () => {
  //     if (userID) {
  //       try {
  //         const existingOrderResponse = await axios.get(
  //           `http://localhost:3002/order?userID=${userID}`
  //         );
  //         console.log("existingOrderResponse", existingOrderResponse);
  //         if (existingOrderResponse?.data[0]?.length > 0) {
  //           const order = existingOrderResponse.data[0];
  //           const cartItems = order.map((item) => item.item);
  //           console.log("object", cartItems);
  //           const updatedOrder = { ...order, cartItem: cartItem };
  //           await axios.put(
  //             `http://localhost:3002/order/${order.id}`,
  //             updatedOrder
  //           );
  //         } else {
  //           await axios.post("http://localhost:3002/order", {
  //             userID: userID,
  //             cartItem: item,
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error saving cart data:", error);
  //       }
  //     }
  //   //   // console.log("object", item);
  // };
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
          onClick={() => handleOrderNow(product)}
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
