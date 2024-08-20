import React from "react";
import Button from "../Button/Button";
import ClockIcon from "../../assets/admin-icons/clock.png";
import "./mentorJobs.css";
import Title from "../Title/Title";

const MentorJobs = ({
  title,
  description,
  jobs,
  firstButtonLabel,
  secondButtonLabel,
  icon,
  firstButtonClickFunction,
  secondButtonClickFunction,
}) => {
  return (
    <div>
      <div>
        <Title>{title}</Title>
        <p>{description}</p>
      </div>
      <div>
        <div className="mentors-jobs-container">
          {jobs && (
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
        </div>
      </div>
    </div>
  );
};

export default MentorJobs;
