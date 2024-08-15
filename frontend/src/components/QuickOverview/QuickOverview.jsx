import React from "react";

import "./quickOverview.css";

const QuickOverview = ({ text, data }) => {
  return (
    <div className="quick-overview">
      <div className="quick-overview-title-container">
        <h2 className="quick-overview-title">Quick Overview</h2>
        {text && <p className="quick-overview-text">{text}</p>}
      </div>
      <div>
        {data.map((data) => (
          <div className="quick-overview-data-cointainer">
            <h3 className="quick-overview-data-title">{data.title}</h3>
            <p className="quick-overview-data-count">{data.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickOverview;
