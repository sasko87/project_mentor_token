import React from "react";
import "./assignedJobs.css";

const AssignedJobs = ({ tabs, onClickFunction, selectedTab }) => {
  return (
    <div className="startup-jobs">
      <h2 className="assigned-jobs-title">Assigned Jobs</h2>
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
      <hr />

      <div className="startupCompanyJobs">
        {tabs[selectedTab].content.slice(0, 10).map((job) => {
          let jobStatusClass = "";

          switch (job.status) {
            case "Open":
              jobStatusClass = "status-done";
              break;
            case "Closed":
              jobStatusClass = "status-rejected";
              break;
            case "Pending":
              jobStatusClass = "status-pending";
          }
          return (
            <div key={job._id} className="startup-company-job">
              <div className="job-title-container">
                <h3 className="job-title">{job.title}</h3>
              </div>
              <div className="job-status-container">
                <p className={`job-status ${jobStatusClass}`}>{job.status}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignedJobs;
