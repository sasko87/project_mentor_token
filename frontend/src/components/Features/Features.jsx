import React from "react";
import Section from "../Section/Section";
import RocketImg from "../../assets/rocket-small.png";
import "./features.css";
import Card from "../Card/Card";
import cardData from "../../cardData.js";

const Features = () => {
  return (
    <Section className="features">
      <img src={RocketImg} alt="" className="rocket-img" />
      <div className="features-titles">
        <h4 className="features-subtitle">Features</h4>
        <h3 className="features-title">
          Boost Your Startup's Journey: Discover Mentor Token's Robust Features
        </h3>
      </div>

      <div className="features-card-container">
        {cardData.map((card, index) => (
          <Card
            key={index}
            cardClass="feature-card"
            title={card.title}
            image={card.image}
            description={card.description}
          />
        ))}
      </div>
    </Section>
  );
};

export default Features;
