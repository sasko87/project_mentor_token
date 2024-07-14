import React from "react";
import Section from "../../components/Section/Section";
import Link from "../../components/Link/Link";
import { GoArrowRight } from "react-icons/go";
import ComputerImg from "../../assets/Scene.png";
import "./heroLanding.css";

const HeroLanding = () => {
  return (
    <Section className="lp-hero">
      <div className="hero-left-container">
        <h2>Grow your StartUp! Monitoring and Evaluating now is easy!</h2>
        <p>
          Welcome to Mentor Token, where we redefine the dynamics of start-up
          success. Our innovative platform offers a transformative approach to
          mentorship, ensuring that mentors are not just engaged but motivated
          to drive the success of the ventures they support.
        </p>
        <div className="home-hero-button-container">
          <Link className="blueButton">
            <GoArrowRight /> Get Started
          </Link>
          <Link>Get in Touch</Link>
        </div>
      </div>
      <div className="hero-right-container">
        <img
          src={ComputerImg}
          alt="Computer Image"
          className="hero-computer-image"
        />
      </div>
    </Section>
  );
};

export default HeroLanding;
