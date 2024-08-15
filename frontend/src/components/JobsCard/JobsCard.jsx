import React from "react";
import ProfileImg from "../../assets/Ellipse 3.png";
import Button from "../Button/Button";
import "./jobsCard.css";

const JobsCard = ({ jobs, modalFunction }) => {
  return (
    <div className="jobs-container">
      {jobs.map((job) => (
        <div key={job._id} className="jobs-card">
          <div>
            <div className="jobs-card-company-container">
              <img src={ProfileImg} alt="" />
              <p>{job.companyId.name}</p>
            </div>
            <div className="jobs-card-job-info">
              <h2>{job.title}</h2>
              <p>{job.description}</p>
            </div>
          </div>

          <Button
            label="View Details"
            clickFunction={() => {
              modalFunction(true, job);
            }}
            className="jobs-button"
          />
        </div>
      ))}
    </div>
  );
};

export default JobsCard;
