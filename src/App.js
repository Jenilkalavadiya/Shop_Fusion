import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Loginpage from "./pages/Loginpage";
import Signup from "./pages/Signup";

import Checkform from "./components/ui/Checkform";
import OrderComplete from "./components/ui/OrderComplete";
import ProtectedRoutes from "./pages/ProtectedRoutes";

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/",
            element: <Shop />,
          },
          {
            path: `/cart`,
            element: <Cart />,
          },

          {
            path: "/about",
            element: <About />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/Loginpage",
        element: <Loginpage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/checkout",
        element: <Checkform />,
      },
      {
        path: "/orderComplete",
        element: <OrderComplete />,
      },
    ],
  },
]);
