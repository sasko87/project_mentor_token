import React from "react";
import "./unauthorized.css";

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h2 className="unauthorized-title">Unauthorized</h2>
      <p className="unauthorized-description">
        You are not authorized to access this site
      </p>
    </div>
  );
};

export default Unauthorized;
