import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Link from "../Link/Link";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const data = {
      email,
      password,
    };
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();
        window.localStorage.setItem("token", data.token);
        window.location = "/dashboard";
      } else {
        const errorData = await res.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError("An error occurred during login. Please try again later.");
      console.error("An error occurred during login:", err);
    }
  };

  return (
    <>
      <div className="component-login">
        <div className="login-text">
          <h2>Log in to mentor token </h2>
          <p>Enter your email and pass to login.</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <Input
            type="email"
            placeholder="E-mail"
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            placeholder="Password"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <Button type="submit" label="Log in" className="login-button" />
        </form>

        <p className="login-register-account">
          Don’t have account?
          <Link url="/register" className="login-register">
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
