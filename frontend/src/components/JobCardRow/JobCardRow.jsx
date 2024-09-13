import React from "react";
import "./jobCardRow.css";
import ProfileImg from "../../assets/Ellipse 3.png";
import Button from "../Button/Button";

const JobCardRow = ({ jobs, modalFunction }) => {
  return (
    <div className="job-card-row-container">
      {jobs.map((job) => (
        <div key={job._id} className="job-card-row">
          <div className="job-card-row-content">
            <div className="job-card-row-company-container">
              <img src={ProfileImg} alt="" />
              <p>{job.companyId.name}</p>
            </div>
            <div className="job-card-row-job-info">
              <h2>{job.title}</h2>
              <p>{job.description}</p>
            </div>
            <div style={{ width: "20%", textAlign: "center" }}>
              <Button
                label="View Details"
                clickFunction={() => {
                  modalFunction(true, job);
                }}
                className="job-card-row-button"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobCardRow;
