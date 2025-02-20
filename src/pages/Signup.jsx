import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { signUpvalidation } from "../schemas/signUpvalidation";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = (values) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const validUser = user.some((data) => data.email === values.email);

    try {
      if (validUser) {
        toast.error("User Already Registered");
      } else {
        const response = await axios.post(
          "http://localhost:3001/api/users",
          values
        );
        toast.success("User created successfully");
        navigate("/Loginpage");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get request to validate user

  const getAllUser = async (values) => {
    const res = await axios.get("http://localhost:3002/user", values);
    console.log("result", res);
    setUser(res.data);
  };
  console.log("first", user);

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="flex justify-center min-h-[800px]">
      <div className="font-[sans-serif] bg-white max-w-7xl flex items-center justify-center p-2">
        <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
            <div>
              <h4 className="text-white text-lg">Create Your Account</h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Welcome to our registration page! Get started by creating your
                account.
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg">
                Simple & Secure Registration
              </h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Our registration process is designed to be straightforward and
                secure. We prioritize your privacy and data security.
              </p>
            </div>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={signUpvalidation}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, errors }) => (
              <Form className="md:col-span-2 w-full py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-gray-800 text-xl font-bold">
                    Create an account
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-gray-600 text-sm mb-2 block">
                      Name
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                        placeholder="Enter name"
                      />
                    </div>
                    {
                      <span className="text-sm text-red-600">
                        {errors.name}
                      </span>
                    }
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm mb-2 block">
                      Email Id
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                        className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                        placeholder="Enter email"
                      />
                    </div>
                    {
                      <span className="text-sm text-red-600">
                        {errors.email}
                      </span>
                    }
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm mb-2 block">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <Field
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="text-gray-800 bg-white border border-gray-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                        placeholder="Enter password"
                      />
                    </div>
                    {
                      <span className="text-sm text-red-600">
                        {errors.password}
                      </span>
                    }
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
                  >
                    Create an account
                  </button>
                </div>
                <p className="text-gray-600 text-sm mt-6 text-center">
                  Already have an account?{" "}
                  <NavLink
                    to="/Loginpage"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Login
                  </NavLink>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
