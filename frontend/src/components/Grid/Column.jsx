import React from "react";

const Column = ({ children, size }) => {
  return (
    <div className="column" style={{ gridColumn: `span ${size}` }}>
      {children}
    </div>
  );
};

export default Column;
