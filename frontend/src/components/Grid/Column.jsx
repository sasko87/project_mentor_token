import React from "react";

const Column = ({ children, size }) => {
  console.log(size);
  return (
    <div className="column" style={{ gridColumn: `span ${size}` }}>
      {children}
    </div>
  );
};

export default Column;
