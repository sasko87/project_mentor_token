import React from "react";
import "./assignedJobs.css";
import Title from "../Title/Title";
import NoData from "../NoData/NoData";
import { useNavigate } from "react-router-dom";

const AssignedJobs = ({ tabs, onClickFunction, selectedTab }) => {
  const navigate = useNavigate();
  const user = window.mentorToken.user;
  const handleViewJob = (id) => {
    navigate(`/jobs?` + new URLSearchParams({ _id: id }).toString());
  };
  return (
    <div className="startup-jobs">
      <Title>Assigned Jobs</Title>
      <div className="startup-jobs-tab-title">
        {tabs.map((tab, index) => (
          <div key={index} onClick={() => onClickFunction(index)}>
            <p
              className={`tab-title ${
                selectedTab === index ? "activeTab" : ""
              }`}
            >
              {tab.tab}
            </p>
          </div>
        ))}
      </div>
      <hr className="hr-assigned-jobs" />
      {tabs[selectedTab].content.length > 0 ? (
        <div className="startupCompanyJobs">
          <>
            {tabs[selectedTab].content.slice(0, 10).map((job) => {
              let jobStatusClass = "";

              switch (job.status) {
                case "DONE":
                  jobStatusClass = "status-done";
                  break;
                case "OPEN":
                  jobStatusClass = "status-open";
                  break;
                case "REJECTED":
                case "CANCELED":
                  jobStatusClass = "status-rejected";
                  break;
                case "IN_PROGRESS":
                  jobStatusClass = "status-in-progress";
              }
              return (
                <div key={job._id} className="startup-company-job">
                  <div className="job-title-container">
                    <h3
                      className="job-title"
                      onClick={
                        user.type === "startup"
                          ? () => handleViewJob(job._id)
                          : undefined
                      }
                    >
                      {job.title}
                    </h3>
                  </div>
                  <div className="job-status-container">
                    <p className={`job-status ${jobStatusClass}`}>
                      {job.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        </div>
      ) : (
        <NoData>No jobs to show</NoData>
      )}
    </div>
  );
};

export default AssignedJobs;
