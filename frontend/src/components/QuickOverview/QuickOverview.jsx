import React from "react";

import "./quickOverview.css";
import Title from "../Title/Title";

const QuickOverview = ({ text, data }) => {
  return (
    <div className="quick-overview">
      <div className="quick-overview-title-container">
        <Title>Quick Overview</Title>

        {text && <p className="quick-overview-text">{text}</p>}
      </div>
      <div>
        {data.map((data, index) => (
          <div key={index} className="quick-overview-data-cointainer">
            <h3 className="quick-overview-data-title">{data.title}</h3>
            <p className="quick-overview-data-count">{data.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickOverview;
