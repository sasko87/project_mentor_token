import React from "react";
import Section from "../../components/Section/Section";
import { GoArrowRight } from "react-icons/go";
import Card from "../../components/Card/Card";
import users from "../../aboutCards.js";
import "./about.css";
import Link from "../../components/Link/Link.jsx";

const About = () => {
  return (
    <Section>
      <div className="about-container">
        <h2 className="about-title">Meet our team members</h2>
        <div className="about-description-container">
          <p className="about-description">
            We Focus on the details of everything we do. All to help businesses
            around the world Focus on what's most important to them.
          </p>
          <p className="about-description">
            Focus on what's most important to them.
          </p>
        </div>
        <Link className="blueButton">
          <GoArrowRight /> Get in touch
        </Link>
      </div>
      <div className="users-container">
        {users.map((user, index) => (
          <Card
            key={index}
            cardClass="about-users_card"
            titleClass="about-users_name"
            imageClass="about-users_avatar"
            subtitleClass="about-users_possition"
            descriptionClass="about-users_info"
            image={user.image}
            title={user.name}
            subtitle={user.possition}
            description={user.info}
          />
        ))}
      </div>
    </Section>
  );
};

export default About;
