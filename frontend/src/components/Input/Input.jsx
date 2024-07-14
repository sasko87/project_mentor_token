import React from "react";
import "./input.css";

const Input = ({
  type,
  name,
  className,
  placeholder,
  onClick,
  onChange,
  value,
}) => {
  return (
    <input
      type={type}
      name={name}
      className={`input ${className}`}
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
      value={value}
    ></input>
  );
};

export default Input;
