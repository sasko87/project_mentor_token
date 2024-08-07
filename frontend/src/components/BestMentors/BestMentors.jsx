import React from "react";
import Card from "../Card/Card";

const BestMentors = ({ image, title, description }) => {
  return (
    <div className="best-mentors-component">
      <Card image={image} title={title} description={description} />
    </div>
  );
};

export default BestMentors;
