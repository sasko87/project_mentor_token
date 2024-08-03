import React from "react";
import RocketImg from "../assets/rocket-small.png";
import MentorTokenIcon from "../assets/logos/mentor-icon.png";
import WhiteLogo from "../assets/logos/mentor-token-white-logo.png";
import Link from "../components/Link/Link";
import "./authPagesLayout.css";
import { Outlet } from "react-router-dom";

const AuthPagesLayouts = ({ children }) => {
  return (
    <div className="auth-page">
      <div className="auth-page-hero">
        <div className="auth-page-hero-text">
          <h1>Grow Your Startup!</h1>
          <h4>Monitoring and evaluating now is easy</h4>
        </div>

        <img src={RocketImg} alt="rocket" className="auth-page-rocket" />

        <div className="auth-page-logo">
          <img src={WhiteLogo} alt="logo" />
          <Link className="auth-logo">mentortoken.com</Link>
        </div>
      </div>
      <div className="auth-page-form">
        <img src={MentorTokenIcon} alt="" className="auth-form-icon" />
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPagesLayouts;
