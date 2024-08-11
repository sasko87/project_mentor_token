import React from "react";

const useAuth = () => {
  const token = window.localStorage.getItem("token");
  return token ? true : false;
};

export default useAuth;
