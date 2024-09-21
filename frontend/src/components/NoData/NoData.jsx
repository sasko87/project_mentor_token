import React from "react";
import "./noData.css";

const NoData = ({ children, style }) => {
  return (
    <div className="no-data-container" style={{ ...style }}>
      {children}
    </div>
  );
};

export default NoData;
