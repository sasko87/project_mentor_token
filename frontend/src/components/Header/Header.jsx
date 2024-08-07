import React from "react";
import Link from "../Link/Link";
import Logo from "../../assets/logos/MentorToken.svg";
import "./header.css";
import { GoArrowRight } from "react-icons/go";

const Header = () => {
  return (
    <header>
      <nav className="main-nav">
        <div>
          <img src={Logo} alt="" />
        </div>
        <div className="links">
          <Link url="/">Home</Link>
          <Link url="/about">About</Link>
          <Link url="/contact">Contact</Link>
        </div>
        <div className="links">
          <Link url="/login">Login</Link>
          <Link url="/register" className="blueButton">
            <GoArrowRight /> Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
