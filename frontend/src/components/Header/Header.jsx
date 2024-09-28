import React from "react";
import Logo from "../../assets/logos/MentorToken.svg";
import "./header.css";
import { GoArrowRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const token = window.localStorage.getItem("token");
  const location = useLocation();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header>
      <nav className="main-nav">
        <div>
          <Link to="/">
            <img src={Logo} alt="Mentor Token Logo" />
          </Link>
        </div>
        <div className="links">
          <Link
            to="/"
            className={`${
              location.pathname === "/"
                ? "link-default active-link"
                : "link-default"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`${
              location.pathname.startsWith("/about")
                ? "link-default active-link"
                : "link-default"
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`${
              location.pathname.startsWith("/contact")
                ? "link-default active-link"
                : "link-default"
            }`}
          >
            Contact
          </Link>
        </div>
        <div className="links">
          {token ? (
            <Link to="/dashboard" className="link-default">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="link-default">
              Login
            </Link>
          )}
          {token ? (
            <Link to="/" className="link-default" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/register" className="link-blue-button">
              <GoArrowRight /> Get Started
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
