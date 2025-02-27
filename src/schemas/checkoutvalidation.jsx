import * as Yup from "yup";

export const checkoutvalidation = Yup.object({
  Fname: Yup.string().required("First Name is required"),
  Lname: Yup.string().required("Last Name is required"),
  Pnumber: Yup.string()
    .required("Phone Number is required")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be less than 11 digits"),
  Address: Yup.string().required("Address Line is required"),
  City: Yup.string().required("City is required"),
  State: Yup.string().required("State is required"),
  Zip: Yup.string()
    .required("Zip Code is required")
    .length(5, "Zip Code must be 5 digits"),
});
