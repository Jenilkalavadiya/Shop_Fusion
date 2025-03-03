import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { checkoutvalidation } from "../../schemas/checkoutvalidation";

const Checkform = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { Fname, Lname, Pnumber, Address, City, State, Zip } = values;

    const formData = {
      Fname,
      Lname,
      Pnumber,
      Address,
      City,
      State,
      Zip,
    };

    const cartItem = JSON.parse(localStorage.getItem("cartItem"));
    const userID = JSON.parse(localStorage.getItem("isActive"));
    const orderId = generateOrderId();

    try {
      const res = await axios.post("http://localhost:3002/orderplaced", {
        userID,
        formdata: formData,
        cartItem,
        orderId,
      });

      if (res.status === 201) {
        navigate("/ordercomplete");
        dispatch(clearCart());
        // localStorage.removeItem("cartItem");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateOrderId = () => {
    return `ORDER-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
  };

  const cartItem = JSON.parse(localStorage.getItem("cartItem"));
  // const userID = JSON.parse(localStorage.getItem("isActive"));

  const handleCancelClick = () => {
    navigate("/cart");
  };

  return (
    cartItem && (
      <div className="flex justify-center items-center min-h-[850px]">
        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete your order
          </h2>
          <Formik
            initialValues={{
              Fname: "",
              Lname: "",
              Pnumber: "",
              Address: "",
              City: "",
              State: "",
              Zip: "",
            }}
            validationSchema={checkoutvalidation}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8">
                <div>
                  <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                    Personal Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        type="text"
                        name="Fname"
                        id="Fname"
                        placeholder="First Name"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                      <ErrorMessage
                        name="Fname"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        type="text"
                        name="Lname"
                        id="Lname"
                        placeholder="Last Name"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                      <ErrorMessage
                        name="Lname"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div>
                      <Field
                        type="number"
                        name="Pnumber"
                        id="Pnumber"
                        placeholder="Phone No."
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                      <ErrorMessage
                        name="Pnumber"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-sm lg:text-base text-gray-800 mb-4">
                    Shipping Address
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Field
                        type="text"
                        name="Address"
                        id="Address"
                        placeholder="Address Line"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                      <ErrorMessage
                        name="Address"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="City"
                        id="City"
                        placeholder="City"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                      <ErrorMessage
                        name="City"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="State"
                        id="State"
                        placeholder="State"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                      <ErrorMessage
                        name="State"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="Zip"
                        id="Zip"
                        placeholder="Zip Code"
                        className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                      />
                      <ErrorMessage
                        name="Zip"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 max-md:flex-col mt-8">
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
};

export default Checkform;
