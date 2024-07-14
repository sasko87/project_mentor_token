import React from "react";
import "./section.css";

const Section = ({ children, className }) => {
  return (
    <section className={`component-section-${className}`}>{children}</section>
  );
};

export default Section;
