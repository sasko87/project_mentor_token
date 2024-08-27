import React from "react";
import Logo from "../../assets/logos/MentorToken.svg";
import "./header.css";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Header = () => {
  const token = window.localStorage.getItem("token");
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header>
      <nav className="main-nav">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className="links">
          <Link to="/" className="component-link-default">
            Home
          </Link>
          <Link to="/about" className="component-link-default">
            About
          </Link>
          <Link to="/contact" className="component-link-default">
            Contact
          </Link>
        </div>
        <div className="links">
          {token ? (
            <Link to="/dashboard" className="component-link-default">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="component-link-default">
              Login
            </Link>
          )}
          {token ? (
            <Link
              to="/login"
              className="component-link-default"
              onClick={() => handleLogout()}
            >
              Logout
            </Link>
          ) : (
            <Link to="/register" className="component-link-blueButton">
              <GoArrowRight /> Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
