import React from "react";
import "./card.css";

const Card = ({ cardClass, image, title, subtitle, description }) => {
  return (
    <div className={` card ${cardClass}`}>
      <img src={image} alt="" className="card-image" />
      <h3 className="card-title ">{title}</h3>
      {subtitle && <h5 className="card-subtitle">{subtitle}</h5>}
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
