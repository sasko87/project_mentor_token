import React from "react";
import "./button.css";

const Button = ({ label, startingIcon, type, className }) => {
  return (
    <div className="button-container">
      <button className={`primary_button ${className} `} type={type}>
        {startingIcon && (
          <span className="primary_button_startingIcon">{startingIcon}</span>
        )}
        {label}
      </button>
    </div>
  );
};

export default Button;
