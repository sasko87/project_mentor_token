import React, { useState, useEffect } from "react";
import StartupHeader from "../../components/StartupHeader/StartupHeader";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import Modal from "../../components/Modal/Modal";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isViewJobModalActive, setIsViewJobModalActive] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});

  const token = window.localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const allJobs = await fetch("/api/showjobs", {
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
      console.error("An error occurred during fetching data:", error);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <StartupHeader placeholder="Search Mentor..." />
      <Section>
        <div>
          <h1>Your Startup Jobs</h1>
          <Button
            label="Create New Job"
            clickFunction={() => {
              // tuka treba za drug modal
            }}
          />
        </div>

        <div>
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
        </div>
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
    </>
  );
};

export default Jobs;
