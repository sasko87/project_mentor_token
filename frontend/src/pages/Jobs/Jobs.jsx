import React, { useState, useEffect } from "react";
import StartupHeader from "../../components/StartupHeader/StartupHeader";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import JobsCard from "../../components/JobsCard/JobsCard";
import "./jobs.css";
import Textarea from "../../components/Textarea/Textarea";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isViewJobModalActive, setIsViewJobModalActive] = useState(false);
  const [isCreateJobModalActive, setIsCreateJobModalActive] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState([]);

  const [selectedJob, setSelectedJob] = useState({});

  const token = window.localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const allJobs = await fetch("/api/get-one-company-jobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (allJobs.ok) {
        const data = await allJobs.json();
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
        setRequiredSkills([]);
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Section>
        <div className="jobs-create-job-button-container">
          <h1>Your Startup Jobs</h1>
          <Button
            className="create-job-btn"
            label="Create New Job"
            clickFunction={() => {
              handleToggleCreateJobModal(true);
            }}
          />
        </div>

        <JobsCard jobs={jobs} modalFunction={handleToggleJobDetailsModal} />

        {/* <div>
          {jobs.map((job) => (
            <div key={job._id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <Button
                label="View Details"
                clickFunction={() => {
                  handleToggleJobDetailsModal(true, job);
                }}
              />
            </div>
          ))}
        </div> */}
      </Section>

      {isViewJobModalActive && (
        <Modal
          closeModal={() => {
            handleToggleJobDetailsModal(false);
          }}
          width={794}
          height={671}
        >
          <h1>{selectedJob.title}</h1>
          <p>{selectedJob.description}</p>
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
          <div className="create-new-job-container">
            <h2>Create New Job</h2>
          </div>
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
              onChange={(e) => setRequiredSkills(e.target.value)}
              value={requiredSkills}
            />
            <Textarea
              placeholder="Job Description"
              className="input-create-new-job textarea-create-new-job"
              onChange={(e) => setJobDescription(e.target.value)}
              value={jobDescription}
            />
            <Button
              className="button-submit-new-job"
              label="Create Job"
              clickFunction={(e) => handleCreateNewJobSubmit(e)}
            />
          </form>
        </Modal>
      )}
    </>
  );
};

export default Jobs;
