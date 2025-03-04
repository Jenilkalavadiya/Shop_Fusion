import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authentication } from "../redux/userSlice";
import { Field, Form, Formik } from "formik";

import { validationSchema } from "../schemas";
import { toast } from "react-toastify";
import axios from "axios";

const Loginpage = () => {
  const [loggedUser, setLoggedUser] = useState([]);
  const [change, setChange] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllUser = async (values) => {
    // console.log("response", values);
    const res = await axios.get("http://localhost:3002/user", values);
    const data = res.data;
    setLoggedUser(data);
  };

  // console.log("first", user);

  useEffect(() => {
    getAllUser();
  }, []);

  const handleLogin = (values) => {
    let userFound = false;
    // eslint-disable-next-line array-callback-return
    loggedUser.map((currData) => {
      if (
        currData.email === values.email &&
        currData.password === values.password
      ) {
        localStorage.setItem("loggedin", true);
        toast.success("Login Successfull");
        localStorage.setItem("isActive", JSON.stringify(currData.id));
        localStorage.setItem("UserDetail", JSON.stringify(currData));
        dispatch(authentication(true));
        // updateServer();
        navigate("/");
        userFound = true;
      }
    });
    if (!userFound) {
      toast.error("Invalid Email or Password");
    }
  };
  // const userID = JSON.parse(localStorage.getItem("isActive"));

  // const cartItem = useSelector((state) => state.cartSlice.cart);

  // const updateServer = async () => {
  //   try {
  //     // Find the existing cart item for the user
  //     const existingItem = change.find(
  //       (item) => item.userId === userID // Check the userId to find the correct cart
  //     );

  //     console.log("existingItem", existingItem);

  //     if (existingItem) {
  //       // If the item already exists, check if the product is already in the cart
  //       const existingProduct = existingItem.product.find(
  //         (item) => item.id === cartItem.id // Check if the product already exists
  //       );

  //       if (existingProduct) {
  //         // If the product already exists, just update the quantity
  //         existingProduct.quantity += 1;

  //         // Send a PUT request to update the product quantity on the server
  //         await axios.put(`http://localhost:3004/cart/${existingItem.id}`, {
  //           ...existingItem,
  //           product: [...existingItem.product], // Ensure we're sending the updated array
  //         });

  //         // Update the local state to reflect the change
  //         setChange((prevState) =>
  //           prevState.map((item) =>
  //             item.id === existingItem.id
  //               ? { ...item, product: [...item.product] }
  //               : item
  //           )
  //         );
  //         toast.success("Product quantity updated in cart");
  //       } else {
  //         // If the product doesn't exist in the cart, add it to the product array
  //         existingItem.product.push({ ...cartItem, quantity: 1 });

  //         // Send a PUT request to update the product array on the server
  //         await axios.put(`http://localhost:3004/cart/${existingItem.id}`, {
  //           ...existingItem,
  //           product: [...existingItem.product],
  //         });

  //         // Update the local state to reflect the new product addition
  //         setChange((prevState) =>
  //           prevState.map((item) =>
  //             item.id === existingItem.id
  //               ? { ...item, product: [...item.product] }
  //               : item
  //           )
  //         );
  //         toast.success("Product added to cart");
  //       }
  //     } else {
  //       const res = await axios.post("http://localhost:3004/cart", {
  //         userID: userID,
  //         product: [{ ...cartItem, quantity: 1 }],
  //       });

  //       console.log("postData", res.data);
  //       toast.success("Product added to cart");

  //       // Update the local state with the new cart item
  //       setChange((prevState) => [...prevState, res.data]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-[850px] flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-5 max-w-6xl max-md:max-w-md w-full">
          <div>
            <h2 className="lg:text-5xl text-3xl font-extrabold lg:leading-[55px] text-gray-800">
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-sm mt-6 text-gray-800">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
            <div className="text-sm mt-12 text-gray-800">
              Don't have an account{" "}
              <NavLink
                to="/signup"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Create new account
              </NavLink>
            </div>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, errors }) => (
              <Form className="max-w-md md:ml-auto w-full">
                <h3 className="text-gray-800 text-3xl font-extrabold mb-8">
                  Login
                </h3>
                {/* {console.log("object", errors)} */}
                <div className="space-y-4">
                  <div>
                    <Field
                      name="email"
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                      placeholder="Email address"
                    />
                  </div>
                  {<span className="text-red-600 text-sm">{errors.email}</span>}
                  <div>
                    <Field
                      name="password"
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent"
                      placeholder="Password"
                    />
                  </div>
                  {
                    <span className="text-red-600 text-sm">
                      {errors.password}
                    </span>
                  }
                  <div className="flex flex-wrap items-center justify-end gap-4">
                    <p className="text-blue-600 text-sm hover:text-blue-500 font-semibold">
                      Forgot your password?
                    </p>
                  </div>
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Log in
                  </button>
                </div>

                <div className="space-x-6 flex justify-center">
                  {/* Add social login buttons here */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
