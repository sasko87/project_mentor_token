import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const location = useLocation();
  const user = useAuth();

  if (!user || user.exp < Date.now() / 1000) {
    window.localStorage.removeItem("token");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
