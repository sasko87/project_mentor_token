import React from "react";
import "./textarea.css";

const Textarea = ({ placeholder, className, disabled, rows, onChange }) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`textarea ${className}`}
      disabled={disabled}
      rows={rows}
      onChange={onChange}
    ></textarea>
  );
};

export default Textarea;
