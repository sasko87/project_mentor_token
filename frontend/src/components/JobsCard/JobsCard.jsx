import React from "react";
import ProfileImg from "../../assets/Ellipse 3.png";
import Button from "../Button/Button";
import "./jobsCard.css";
import NoData from "../NoData/NoData";

const JobsCard = ({ jobs, modalFunction }) => {
  const user = window.mentorToken.user;
  return (
    <div className="jobs-container">
      {jobs.length > 0 ? (
        jobs.map((job) => (
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
                  <div style={{ width: "40%", height: "48.6px" }}>
                    {job.applications.length > 0 && (
                      <>
                        <div className="applicants-profile-image-container">
                          {console.log(job)}
                          {job.applications.slice(0, 3).map((application) => (
                            <div key={application._id}>
                              <img
                                src={application.mentorId.profileImage}
                                alt="Mentor Profile"
                                className="applicants-profile-image applicants-profile-image-first"
                              />
                            </div>
                          ))}
                        </div>
                        <div style={{ textAlign: "center", width: "100%" }}>
                          <p className="applicants-number">
                            <span>
                              {job.applications.length - 3 > 0
                                ? `${job.applications.length - 3}+`
                                : ""}
                            </span>
                            Applicants
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      height: "48.6px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
              <Button
                label="View Details"
                clickFunction={() => {
                  modalFunction(true, job);
                }}
                className="jobs-button"
              />
            )}
          </div>
        ))
      ) : (
        <NoData>No Jobs To Show</NoData>
      )}
    </div>
  );
};

export default JobsCard;
