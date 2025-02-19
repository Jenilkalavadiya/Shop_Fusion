import * as Yup from "yup";

export const signUpvalidation = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(25)
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 6 characters")
    .required("Password is required"),
});
