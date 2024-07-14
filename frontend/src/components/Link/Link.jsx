import React from "react";
import "./Link.css";

const Link = ({ url, target = "", className = "default", children }) => {
  return (
    <a href={url} target={target} className={`component-link-${className}`}>
      {children}
    </a>
  );
};

export default Link;
