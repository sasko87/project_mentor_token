import React from "react";
import "./assignedJobs.css";
import Title from "../Title/Title";
import NoData from "../NoData/NoData";

const AssignedJobs = ({ tabs, onClickFunction, selectedTab }) => {
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

      <div className="startupCompanyJobs">
        {tabs && tabs.content ? (
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
                    <h3 className="job-title">{job.title}</h3>
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
        ) : (
          <NoData children={"No jobs to show"} />
        )}
      </div>
    </div>
  );
};

export default AssignedJobs;
