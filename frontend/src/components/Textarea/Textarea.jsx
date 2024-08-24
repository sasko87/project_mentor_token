import React from "react";
import "./textarea.css";

const Textarea = ({
  placeholder,
  className,
  disabled,
  rows,
  onChange,
  value,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`textarea ${className}`}
      disabled={disabled}
      rows={rows}
      onChange={onChange}
      value={value}
    ></textarea>
  );
};

export default Textarea;
