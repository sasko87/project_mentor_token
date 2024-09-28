import React, { useState } from "react";
import Logo from "../../assets/logos/MentorToken.svg";
import "./header.css";
import { GoArrowRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import NavModal from "../NavModal/NavModal";

const Header = () => {
  const [isMenuModalActive, setIsMenuModalActive] = useState(false);
  const token = window.localStorage.getItem("token");
  const location = useLocation();
  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const handleToggleMenuModal = () => {
    setIsMenuModalActive(!isMenuModalActive);
  };
  return (
    <>
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
          <div className="mobile-nav" onClick={handleToggleMenuModal}>
            <GiHamburgerMenu style={{ fontSize: 30 }} />
          </div>
        </nav>
      </header>
      {isMenuModalActive && (
        <NavModal closeModal={() => handleToggleMenuModal()}>
          <div className="mobile-links">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "link-mobile-nav active-link"
                  : "link-mobile-nav"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                location.pathname.startsWith("/about")
                  ? "link-mobile-nav active-link"
                  : "link-mobile-nav"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                location.pathname.startsWith("/contact")
                  ? "link-mobile-nav active-link"
                  : "link-mobile-nav"
              }`}
            >
              Contact
            </Link>
            {token ? (
              <Link to="/dashboard" className="link-mobile-nav">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="link-mobile-nav">
                Login
              </Link>
            )}
            {token ? (
              <Link to="/" className="link-mobile-nav" onClick={handleLogout}>
                Logout
              </Link>
            ) : (
              <Link to="/register" className="link-blue-button link-register">
                <GoArrowRight /> Get Started
              </Link>
            )}
          </div>
        </NavModal>
      )}
    </>
  );
};

export default Header;
