import React from "react";
import "./textarea.css";

const Textarea = ({ placeholder, className }) => {
  return (
    <textarea
      placeholder={placeholder}
      className={`textarea ${className}`}
    ></textarea>
  );
};

export default Textarea;
