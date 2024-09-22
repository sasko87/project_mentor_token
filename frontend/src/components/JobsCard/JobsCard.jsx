import React from "react";
import ProfileImg from "../../assets/Ellipse 3.png";
import Button from "../Button/Button";
import "./jobsCard.css";

const JobsCard = ({ jobs, modalFunction }) => {
  const user = window.mentorToken.user;
  return (
    <div className="jobs-container">
      {jobs.map((job) => (
        <div key={job._id} className="jobs-card">
          <div>
            <div className="jobs-card-company-container">
              <img src={job.companyId.profileImage} alt="" />

              <p>{job.companyId.name}</p>
            </div>
            <div className="jobs-card-job-info">
              <h2>{job.title}</h2>
              <p>
                {job.description.length > 200
                  ? job.description.slice(0, 200) + "..."
                  : job.description}
              </p>
            </div>
          </div>

          {user.type === "startup" && (
            <>
              <p className="jobs-cards-job-status">{job.status}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "40%" }}>
                  <div className="applicants-profile-image-container">
                    <img
                      src={ProfileImg}
                      alt="Applicants Image"
                      className="applicants-profile-image applicants-profile-image-first"
                    />
                    <img
                      src={ProfileImg}
                      alt="Applicants Image"
                      className="applicants-profile-image applicants-profile-image-second"
                    />
                    <img
                      src={ProfileImg}
                      alt="Applicants Image"
                      className="applicants-profile-image applicants-profile-image-third"
                    />
                  </div>
                  <div style={{ textAlign: "center", width: "100%" }}>
                    <p className="applicants-number">3+ Applicants</p>
                  </div>
                </div>
                <div>
                  <Button
                    label="View Details"
                    clickFunction={() => {
                      modalFunction(true, job);
                    }}
                    className="jobs-button"
                  />
                </div>
              </div>
            </>
          )}

          {user.type === "mentor" && (
            <>
              <Button
                label="View Details"
                clickFunction={() => {
                  modalFunction(true, job);
                }}
                className="jobs-button"
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default JobsCard;
