import React, { useState } from "react";
import "./filterJobs.css";

const FilterJobs = ({
  label,
  filter,
  selecetdFilterValue,
  setSkillsFilter,
}) => {
  return (
    <>
      <div className="filter-container">
        <div>
          <label>{label}</label>
        </div>
        {filter && (
          <select
            className="filter-select"
            value={selecetdFilterValue}
            onChange={(e) => setSkillsFilter(e.target.value)}
          >
            {filter.map((filter, index) => (
              <option
                key={index}
                value={filter.value}
                className="filter-option"
              >
                {filter.title}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default FilterJobs;
