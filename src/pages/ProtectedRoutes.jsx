import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const authentication = useSelector((state) => state.userSlice.login);

  return authentication ? <Outlet /> : <Navigate to="/Loginpage" />;
};

export default ProtectedRoutes;
