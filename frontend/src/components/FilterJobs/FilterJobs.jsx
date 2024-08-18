import React, { useState } from "react";
import FilterIcon from "../../assets/admin-icons/filter-icon.png"
import "./filterJobs.css"

const FilterJobs = ({label, filter, icon}) => {
    const [selectedOption, setSelectedOption]=useState("Popular") 

    
    return<>
    <div className="filter-container">
        <div>
        {icon && <img src={FilterIcon}/>}
        <label>{label}</label>
        </div>
    {filter && 
    <select className="filter-select" value={selectedOption}
    onChange={(e)=> setSelectedOption(e.target.value)}>
    {filter.map((filter, index)=>(
        <option key={index} value={filter.value} onClick={(e)=> setSelectedOption(e.target.value)} className="filter-option">{filter.title}</option>
        
    ))}
    
</select>
    }
    
    </div>
    </>
}

export default FilterJobs