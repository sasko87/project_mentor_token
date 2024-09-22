import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import JobsCard from "../../components/JobsCard/JobsCard";
import "./jobs.css";
import Textarea from "../../components/Textarea/Textarea";
import Title from "../../components/Title/Title";
import NewJob from "../../components/NewJob/NewJob";
import FilterJobs from "../../components/FilterJobs/FilterJobs";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isViewJobModalActive, setIsViewJobModalActive] = useState(false);
  const [isCreateJobModalActive, setIsCreateJobModalActive] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedJob, setSelectedJob] = useState({});
  const [sortJobStatus, setSortJobStatus] = useState("OPEN");
  const [sortApplicationStatus, setSortApplicationStatus] =
    useState("OPEN_FOR_ALL");

  const token = window.localStorage.getItem("token");
  const user = window.mentorToken.user;
  console.log(user.id);
  const fetchData = async () => {
    try {
      let payload = {
        companyId: user.id,
      };

      if (sortJobStatus) {
        payload.status = sortJobStatus;
      }

      if (sortApplicationStatus) {
        payload.applicationType = sortApplicationStatus;
      }
      const allJobs = await fetch(
        "/api/filtered-jobs?" + new URLSearchParams(payload).toString(),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (allJobs.ok) {
        const data = await allJobs.json();
        console.log(data);
        setJobs(data);
      }
    } catch (error) {
      console.log("An error occurred during fetching data:", error);
    }
  };

  const handleToggleJobDetailsModal = (isVisible, job) => {
    setIsViewJobModalActive(isVisible);
    if (isVisible) {
      setSelectedJob(job);
    } else {
      setSelectedJob({});
    }
  };

  const handleCreateNewJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: jobTitle,
        description: jobDescription,
        skillsRequired: skillsRequired,
        category: category.toUpperCase(),
        status: "OPEN",
        applicationType: "OPEN_FOR_ALL",
      };
      const res = await fetch("/api/create-new-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();
        setJobTitle("");
        setJobDescription("");
        setSkillsRequired([]);
        setCategory("");
        handleToggleCreateJobModal(false);
        fetchData();
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const handleToggleCreateJobModal = (isVisible) => {
    setIsCreateJobModalActive(isVisible);
    setJobTitle("");
    setJobDescription("");
    setCategory("");
    setSkillsRequired([]);
    setCategory("");
  };

  useEffect(() => {
    fetchData();
  }, [sortApplicationStatus, sortJobStatus]);

  const handleAcceptApplication = async (application) => {
    try {
      const res = await fetch("/api/accept-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(application),
      });

      if (res.ok) {
        const data = await res.json();
        handleToggleJobDetailsModal(false);
        fetchData();
      } else {
        const errorData = await res.json();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const handleRejectApplication = async (application) => {
    try {
      const res = await fetch("/api/reject-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(application),
      });

      if (res.ok) {
        const data = await res.json();
        application.status = "REJECTED";
        fetchData();
      } else {
        const errorData = await res.json();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const handleCancelJob = async (job) => {
    try {
      const res = await fetch("/api/cancel-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(job),
      });

      if (res.ok) {
        const data = await res.json();
        job.status = "CANCELED";
        handleToggleJobDetailsModal(false);
        fetchData();
      } else {
        const errorData = await res.json();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const handleMarkAsDoneJob = async (job) => {
    try {
      const res = await fetch("/api/done-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(job),
      });

      if (res.ok) {
        const data = await res.json();
        job.status = "DONE";
        handleToggleJobDetailsModal(false);
        fetchData();
      } else {
        const errorData = await res.json();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const jobStatus = [
    {
      title: "Open",
      value: "OPEN",
    },
    {
      title: "In Progress",
      value: "IN_PROGRESS",
    },
    {
      title: "Rejected",
      value: "REJECTED",
    },
    {
      title: "Done",
      value: "DONE",
    },
    {
      title: "Canceled",
      value: "CANCELED",
    },
  ];

  const applicationType = [
    {
      title: "Open",
      value: "OPEN_FOR_ALL",
    },
    {
      title: "Direct",
      value: "DIRECT",
    },
  ];

  return (
    <>
      <Section>
        <div className="jobs-create-job-button-container">
          <Title>Your Startup Jobs</Title>

          <Button
            className="create-job-btn"
            label="Create New Job"
            clickFunction={() => {
              handleToggleCreateJobModal(true);
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <FilterJobs
            label="Job Status"
            selecetdFilterValue={sortJobStatus}
            setSkillsFilter={setSortJobStatus}
            filter={jobStatus}
          />
          <FilterJobs
            label="Application Status"
            selecetdFilterValue={sortApplicationStatus}
            setSkillsFilter={setSortApplicationStatus}
            filter={applicationType}
          />
        </div>
        <JobsCard jobs={jobs} modalFunction={handleToggleJobDetailsModal} />
      </Section>

      {isViewJobModalActive && (
        <Modal
          closeModal={() => {
            handleToggleJobDetailsModal(false);
          }}
          width={470}
          height={461}
        >
          <div className="startup-job-details-container">
            <div className="startup-job-details">
              <h2>{selectedJob.title}</h2>
              <p style={{ overflowY: "scroll", maxHeight: "150px" }}>
                {selectedJob.description}
              </p>
            </div>
            <div className="startup-job-details-applicants-container">
              {selectedJob.applicationType === "DIRECT" && (
                <h1>this is a direct job</h1>
              )}
              <h2>Applicants:</h2>
              {selectedJob.applications.length === 0 && <>no data found</>}
              {selectedJob.applications.length > 0 && (
                <>
                  <div style={{ overflowY: "auto", maxHeight: "130px" }}>
                    {selectedJob.applications.map((application) => {
                      return (
                        <div
                          key={application._id}
                          className="startup-job-details-applicants"
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "70%",
                              marginRight: "10px",
                            }}
                          >
                            <p> {application.mentorId.name}</p>
                            <p> {application.status}</p>
                          </div>

                          <div className="startup-jobs-buttons">
                            {selectedJob.applicationType !== "DIRECT" &&
                              selectedJob.status === "OPEN" && (
                                <>
                                  <Button
                                    label="Accept"
                                    className="startup-jobs-button startup-jobs-accept-button "
                                    clickFunction={() => {
                                      handleAcceptApplication(application);
                                    }}
                                  />

                                  <Button
                                    label="Reject"
                                    className="startup-jobs-button startup-jobs-reject-button"
                                    clickFunction={() => {
                                      handleRejectApplication(application);
                                    }}
                                  />
                                </>
                              )}
                          </div>
                          {/* <button
                        onClick={() => {
                          handleAcceptApplication(application);
                        }}
                      >
                        accept
                      </button>
                      <button
                        onClick={() => {
                          handleRejectApplication(application);
                        }}
                      >
                        reject
                      </button> */}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {selectedJob.status === "OPEN" && (
                <>
                  <Button
                    label="Cancel Offer"
                    className="startup-jobs-cancel-button "
                    clickFunction={() => {
                      handleCancelJob(selectedJob);
                    }}
                  />
                </>
              )}
              {selectedJob.status === "IN_PROGRESS" && (
                <>
                  <Button
                    label="Mark As DONE"
                    className="startup-jobs-done-button"
                    clickFunction={() => {
                      handleMarkAsDoneJob(selectedJob);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </Modal>
      )}

      {isCreateJobModalActive && (
        <Modal
          closeModal={() => {
            handleToggleCreateJobModal(false);
          }}
          width={553.04}
          height={666.71}
        >
          {/* <div>
          <h2 className="create-new-job-title">Create New Job</h2>
          
          <form action="" className="create-new-job-form">
            <Input
              className="input-create-new-job"
              type="text"
              placeholder="title"
              onChange={(e) => setJobTitle(e.target.value)}
              value={jobTitle}
            />
            <Input
              className="input-create-new-job"
              type="text"
              placeholder="Required Skills"
              onChange={(e) => {
                setSkillsRequired(e.target.value);
              }}
              value={skillsRequired}
            />
            <Textarea
              placeholder="Job Description"
              className="input-create-new-job textarea-create-new-job"
              onChange={(e) => {
                setJobDescription(e.target.value);
              }}
              value={jobDescription}
            />
            <Button
              className="button-submit-new-job"
              label="Create Job"
              clickFunction={(e) => handleCreateNewJobSubmit(e)}
            />
          </form>
          </div> */}
          <NewJob
            title="Create New Job"
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            skillsRequired={skillsRequired}
            setSkillsRequired={setSkillsRequired}
            clickFunction={(e) => handleCreateNewJobSubmit(e)}
            category={category}
            setCategory={setCategory}
          />
        </Modal>
      )}
    </>
  );
};

export default Jobs;
