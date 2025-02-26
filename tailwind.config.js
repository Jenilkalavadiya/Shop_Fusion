const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", flowbite.content()],

  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};

// try {
//   // Checking if the user already exists by email
//   const existingUser = await axios.get(
//     `http://localhost:3002/user?email=${values.email}`
//   );

//   // If the response returns an existing user, show an error
//   if (existingUser.data.length > 0) {
//     toast.error("User already exists!");
//   } else {
//     // If user doesn't exist, proceed with signup
//     await axios.post("http://localhost:3002/user", values);
//     toast.success("Account created successfully!");
//     navigate("/Loginpage"); // Redirect to login page after successful registration
//   }
// } catch (error) {
//   console.log(error);
//   toast.error("Something went wrong! Please try again.");
// }
// };
