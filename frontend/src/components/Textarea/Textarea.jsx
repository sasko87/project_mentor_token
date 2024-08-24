import React from "react";
import "./textarea.css";

const Textarea = ({
  placeholder,
  className,
  disabled,
  rows,
  onChange,
  value,
  maxLength,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`textarea ${className}`}
      disabled={disabled}
      rows={rows}
      onChange={onChange}
      value={value}
      maxLength={maxLength}
    ></textarea>
  );
};

export default Textarea;
