import React from "react";
import MentorTokenLogo from "../../assets/logos/MentorToken.svg";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import Link from "../Link/Link";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={MentorTokenLogo} alt="Mentor Token Logo" />
          <p className="footer-description">
            With Mentor Token, every failure transforms into an opportunity for
            growth.
          </p>
        </div>
        <div className="footer-subcontainer">
          <h5 className="footer-title">Pages</h5>
          <div className="footer-link-container">
            <Link className="footer">Home</Link>
            <Link className="footer">Contact Us</Link>
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
            <Link className="footer-social">
              <FaLinkedinIn />
            </Link>
            <Link className="footer-social">
              <FaTwitter />
            </Link>
            <Link className="footer-social">
              <FaFacebookF />
            </Link>
          </p>
        </div>
      </div>
      <hr />
      <p className="copyright">©2024 Mentor Token. All right reserved.</p>
    </footer>
  );
};

export default Footer;
