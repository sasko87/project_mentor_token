import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = window.localStorage.getItem("token");

  if (!token) return null;

  try {
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    return null; // If the token is invalid or expired
  }
};

export default useAuth;
