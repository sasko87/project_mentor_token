import React from "react";
import "./button.css";

const Button = ({ label, startingIcon, type, className, clickFunction }) => {
  return (
    <div className="button-container">
      <button
        onClick={clickFunction}
        className={`primary_button ${className} `}
        type={type}
      >
        {startingIcon && (
          <span className="primary_button_startingIcon"><img src={startingIcon} /></span>
        )}
        {label}
      </button>
    </div>
  );
};

export default Button;
