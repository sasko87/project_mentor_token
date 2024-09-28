import React from "react";
import MentorTokenLogo from "../../assets/logos/MentorToken.svg";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const location = useLocation();
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Link to="/">
            <img src={MentorTokenLogo} alt="Mentor Token Logo" />
          </Link>
          <p className="footer-description">
            With Mentor Token, every failure transforms into an opportunity for
            growth.
          </p>
        </div>
        <div className="footer-subcontainer">
          <h5 className="footer-title">Pages</h5>
          <div className="footer-link-container">
            <Link
              to="/"
              className={`${
                location.pathname === "/"
                  ? "link-footer active-link"
                  : "link-footer"
              }`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className={`${
                location.pathname.startsWith("/contact")
                  ? "link-footer active-link"
                  : "link-footer"
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="footer-subcontainer">
          <h5 className="footer-title">Contact</h5>
          <p className="footer-info">info@mentortoken.com</p>
          <p className="footer-info">+ ( 389 ) 123 456 789</p>
        </div>
        <div className="footer-subcontainer">
          <h5 className="footer-title">Follow Us</h5>
          <p>
            <Link
              to="https://linkedin.com"
              target="_blank"
              className="link-footer-social"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              to="https://x.com"
              target="_blank"
              className="link-footer-social"
            >
              <FaTwitter />
            </Link>
            <Link
              to="https://facebook.com"
              target="_blank"
              className="link-footer-social"
            >
              <FaFacebookF />
            </Link>
          </p>
        </div>
      </div>
      <hr className="hr-footer" />
      <p className="copyright">©2024 Mentor Token. All right reserved.</p>
    </footer>
  );
};

export default Footer;
