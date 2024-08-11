import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";

import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  const token = window.localStorage.getItem("token");
  const user = jwtDecode(token);
  return isAuth && user.exp < Date.now() ? (
    <Outlet />
  ) : (
    <>
      window.localStorage.removeItem("token")
      <Navigate to="/" replace state={{ from: location }} />
    </>
  );
};

export default ProtectedRoutes;
