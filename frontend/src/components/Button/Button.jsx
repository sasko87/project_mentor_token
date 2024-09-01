import React from "react";
import "./button.css";

const Button = ({
  label,
  startingIcon,
  type,
  className,
  clickFunction,
  disabled = false,
}) => {
  return (
    <div className="button-container">
      <button
        onClick={clickFunction}
        className={`primary_button ${className} ${
          disabled ? "disabled-button" : ""
        }`}
        type={type}
        disabled={disabled}
      >
        {startingIcon && (
          <span className="primary_button_startingIcon">
            <img src={startingIcon} />
          </span>
        )}
        {label}
      </button>
    </div>
  );
};

export default Button;
