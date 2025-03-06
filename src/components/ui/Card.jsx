import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Card = ({ product, change, getData }) => {
  const { title, price, description, image, rating, id } = product; // Ensure product has an 'id'
  const userID = JSON.parse(localStorage.getItem("UserDetail"))?.id;
  console.log("USERID", userID);

  // Add or update product in cart
  const setCartItems = async () => {
    try {
      // Find the user's existing cart
      const existingUserCart = change.find((item) => item.userID === userID);

      let updatedCart;
      if (existingUserCart) {
        console.log("Matching user found:", existingUserCart);
        // Clone the existing products array to preserve all items
        let updatedProducts = [...existingUserCart.product];

        // Check if the product already exists in the cart
        const existingProductIndex = updatedProducts.findIndex(
          (item) => item.id === id
        );

        if (existingProductIndex !== -1) {
          // Product exists, increment quantity
          updatedProducts[existingProductIndex] = {
            ...updatedProducts[existingProductIndex],
            quantity: (updatedProducts[existingProductIndex].quantity || 1) + 1,
          };
        } else {
          // Product doesn't exist, append it with quantity 1
          updatedProducts = [...updatedProducts, { ...product, quantity: 1 }];
        }

        // Create the updated cart with all products
        updatedCart = { ...existingUserCart, product: updatedProducts };
        console.log("Updated Cart before PUT:", updatedCart);

        // // Update server with PUT
        const response = await axios.put(
          `http://localhost:3002/order/${existingUserCart.id}`,
          updatedCart
        );
        console.log("UPDATE RES", response.data);
        getData();
      } else {
        console.log("No matching user found, creating new cart.");
        // Create a new cart with the clicked product

        // Post new cart to server
        const response = await axios.post("http://localhost:3002/order", {
          userID: userID,
          product: [{ ...product, quantity: 1 }],
        });
        console.log("POST RES", response.data);
      }

      toast.success("Item added to cart!");
    } catch (error) {
      console.log("Error in setCartItems:", error);
      toast.error("Failed to update cart.");
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
          onClick={handleBtn}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Card;
