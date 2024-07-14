import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Link from "../Link/Link";
import "./login.css";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPassowrdValue] = useState("");
  console.log(emailValue, passwordValue);

  return (
    <>
      <div className="component-login">
        <div className="login-text">
          <h2>Log in to mentor token </h2>
          <p>Enter your email and pass to login.</p>
        </div>
        <form action="" className="login-form">
          <Input
            type="email"
            placeholder="E-mail"
            className="login-input"
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
          />
          <Input
            type="password"
            placeholder="Password"
            className="login-input"
            onChange={(e) => setPassowrdValue(e.target.value)}
            value={passwordValue}
          />
          <Button type="submit" label="Log in" className="login-button" />
        </form>
        <p className="login-register-account">
          Don’t have account?{" "}
          <Link url="/register" className="login-register">
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
