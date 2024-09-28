import React from "react";
import RocketImg from "../assets/rocket-small.png";
import MentorTokenIcon from "../assets/logos/mentor-icon.png";
import WhiteLogo from "../assets/logos/mentor-token-white-logo.png";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import "./authPagesLayout.css";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthPagesLayouts = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleBack = (e) => {
    e.preventDefault();
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-page-hero">
        <div className="auth-page-hero-text">
          <Link onClick={handleBack} className="link-white-button">
            <GoArrowLeft />
            Back
          </Link>
          <h1>Grow Your Startup!</h1>
          <h4>Monitoring and evaluating now is easy</h4>
        </div>

        <img src={RocketImg} alt="rocket" className="auth-page-rocket" />

        <div className="auth-page-logo">
          <img src={WhiteLogo} alt="logo" />
          <Link to="/" className="link-auth-logo">
            mentortoken.com
          </Link>
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
