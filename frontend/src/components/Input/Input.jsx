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

  id,
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
      id={id}
    ></input>
  );
};

export default Input;
