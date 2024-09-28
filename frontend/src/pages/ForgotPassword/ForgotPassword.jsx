import React from "react";
import "./forgotPassword.css";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    const data = {
      email,
    };
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccessMessage(data.message);
      } else {
        const errorData = await res.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError(
        "An error occurred during sending the link. Please try again later."
      );
      console.error("An error occurred during sending the link:", err);
    }
  };

  return (
    <>
      <div className="forgot-password-container">
        <div className="forgot-password-text">
          <h2>Reset your password </h2>
          <p>Enter your email to reset your password</p>
        </div>
        <form onSubmit={handleForgotPassword} className="forgot-password-form">
          <Input
            label="Email"
            labelId="email"
            id="email"
            type="email"
            placeholder="E-mail"
            className="forgot-password-input"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {successMessage && (
            <p style={{ color: "green", textAlign: "center" }}>
              {successMessage}
            </p>
          )}
          <Button
            type="submit"
            label="Reset Password"
            className="forgot-password-button"
          />
        </form>

        <p className="login-register-account">
          Don’t have account?
          <Link to="/register" className="link-login-register">
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
