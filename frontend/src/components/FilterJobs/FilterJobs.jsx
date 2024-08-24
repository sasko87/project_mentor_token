import React, { useState } from "react";
import FilterIcon from "../../assets/admin-icons/filter-icon.png";
import "./filterJobs.css";

const FilterJobs = ({
  label,
  filter,
  icon,
  selecetdFilterValue,
  setSkillsFilter,
}) => {
  return (
    <>
      <div className="filter-container">
        <div>
          {icon && <img src={FilterIcon} />}
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
