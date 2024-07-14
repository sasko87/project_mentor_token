import React from "react";
import "./grid.css";

const Grid = ({ children, columns, className }) => {
  return (
    <div
      className={`grid ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}
    >
      {children}
    </div>
  );
};

export default Grid;
