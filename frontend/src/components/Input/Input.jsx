import React from "react";
import "./input.css";
import { useState } from "react";

const Input = ({
  type,
  name,
  className,
  placeholder,
  onClick,
  onChange,
  value,
  onFocus,
  id,
  onBlur,
  labelId,
  label,
  isRequired = false,
  onKeyDown,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true); // Update internal state to indicate focus
    if (onFocus) onFocus(e); // Call the onFocus function passed via props
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      setIsFocused(false); // Reset the focus state if the input is empty
    }
    if (onBlur) onBlur(e); // Call the onBlur function passed via props
  };
  return (
    <div className="component-input-container">
      {label && (
        <label
          htmlFor={labelId}
          className={`input-label ${isFocused ? "focused-label" : ""}`}
        >
          {label}{" "}
          {isRequired && !isFocused && <span className="required">*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        className={`input ${className}`}
        placeholder={placeholder}
        onClick={onClick}
        onChange={onChange}
        value={value}
        id={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      ></input>
    </div>
  );
};

export default Input;
