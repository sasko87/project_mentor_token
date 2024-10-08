import React from "react";
import Button from "../Button/Button";
import ClockIcon from "../../assets/admin-icons/clock.png";
import "./mentorJobs.css";
import Title from "../Title/Title";
import NoData from "../NoData/NoData";

const MentorJobs = ({
  title,
  description,
  jobs,
  firstButtonLabel,
  secondButtonLabel,
  icon,
  firstButtonClickFunction,
  secondButtonClickFunction,
  cancelJob,
}) => {
  const user = window.mentorToken.user;
  return (
    <div style={{ maxWidth: "479px", width: "100%" }}>
      <div>
        <Title>{title}</Title>
        <p>{description}</p>
      </div>
      <div>
        <div className="mentors-jobs-container">
          {user.type === "mentor" && jobs && jobs.length > 0 && (
            <>
              {jobs.map((application, index) => (
                <div key={index} className="mentors-jobs">
                  <div>
                    <p>{application.jobId.title}</p>
                  </div>
                  <div className="mentors-jobs-buttons">
                    {firstButtonLabel && (
                      <Button
                        label={firstButtonLabel}
                        className="mentors-jobs-button mentors-jobs-first-button  "
                        clickFunction={() =>
                          firstButtonClickFunction(application)
                        }
                      />
                    )}
                    {secondButtonLabel && (
                      <Button
                        label={secondButtonLabel}
                        className="mentors-jobs-button mentors-jobs-second-button"
                        clickFunction={() =>
                          secondButtonClickFunction(application)
                        }
                      />
                    )}
                    {icon === "true" && <img src={ClockIcon} />}
                  </div>
                </div>
              ))}
            </>
          )}
          {user.type === "startup" && jobs && jobs.length > 0 && (
            <>
              {jobs.map((job, index) => (
                <div key={index} className="mentors-jobs">
                  <div>
                    <p>{job.title}</p>
                  </div>
                  <div className="mentors-jobs-buttons">
                    <Button
                      label="Cancel Offer"
                      className="cancel-offer-button "
                      clickFunction={() => cancelJob(job)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}

          {jobs && jobs.length === 0 && (
            <NoData
              children={"No data to show"}
              style={{ justifyContent: "left", paddingLeft: 20 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorJobs;
