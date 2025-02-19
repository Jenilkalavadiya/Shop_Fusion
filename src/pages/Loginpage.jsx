import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authentication } from "../redux/userSlice";
import { Field, Form, Formik, validateYupSchema } from "formik";

import { validationSchema } from "../schemas";

const Loginpage = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    console.log("Login", values);
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    console.log("loggedUser", loggedUser);
    if (
      loggedUser.email === values.email &&
      loggedUser.password === values.password
    ) {
      localStorage.setItem("loggedin", true);
      dispatch(authentication(true));
      navigate("/");
    } else {
      // navigate("/signup");
    }
  };

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-[750px] flex flex-col items-center justify-center py-6 px-4">
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
                {console.log("object", errors)}
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

                <div className="my-4 flex items-center gap-4">
                  <hr className="w-full border-gray-300" />
                  <p className="text-sm text-gray-800 text-center">or</p>
                  <hr className="w-full border-gray-300" />
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
