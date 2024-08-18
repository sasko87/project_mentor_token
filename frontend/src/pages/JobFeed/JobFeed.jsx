import React, { useEffect, useState } from "react";
import "./jobfeed.css";
import Section from "../../components/Section/Section";
import JobsCard from "../../components/JobsCard/JobsCard";
import Modal from "../../components/Modal/Modal";
import FilterJobs from "../../components/FilterJobs/FilterJobs";
import Title from "../../components/Title/Title";
import LayoutIcon from "../../assets/admin-icons/layout-grid.png";
import Button from "../../components/Button/Button";

const JobFeed = () => {
  const user = window.mentorToken.user;
  const [allJobs, setAllJobs] = useState([]);
  const [isViewJobModalActive, setIsViewJobModalActive] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const token = window.localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const allJobs = await fetch(
        "/api/filtered-jobs?" +
          new URLSearchParams({
            status: "OPEN",
          }).toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (allJobs.ok) {
        const data = await allJobs.json();
        setAllJobs(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleJobDetailsModal = (isVisible, job) => {
    setIsViewJobModalActive(isVisible);
    if (isVisible) {
      setSelectedJob(job);
    } else {
      setSelectedJob({});
    }
  };

  const sort = [
    {
      title: "Newest",
      value: "Newest",
    },
    {
      title: "Rating",
      value: "Rating",
    },
  ];

  const category = [
    {
      title: "All Categories",
      value: "allCategories",
    },
    {
      title: "HTML",
      value: "HTML",
    },
  ];

  const handleApplyToJob = async () => {
    console.log(selectedJob);
    const payload = {
      companyId: selectedJob.companyId._id,
      mentorId: user.id,
      jobId: selectedJob._id,
      status: "PENDING",
    };

    try {
      const postApplication = await fetch("/api/create-new-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (postApplication.ok) {
        const data = await postApplication.json();
        console.log("applied", data);
        setIsViewJobModalActive(false);
        fetchData();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };
  return (
    <>
      <Section>
        <Title>Open Jobs</Title>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FilterJobs label="Sort By" filter={sort} />
            <FilterJobs label="Category" filter={category} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FilterJobs icon={true} label="Filters" />
            <div className="filter-container">
              <img src={LayoutIcon} alt="Layout" />
            </div>
          </div>
        </div>
        <JobsCard jobs={allJobs} modalFunction={handleToggleJobDetailsModal} />

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
            {selectedJob.applications.find(
              (job) => job.mentorId._id === user.id
            ) && <p>veke imas aplicirano</p>}

            {!selectedJob.applications.find(
              (job) => job.mentorId._id === user.id
            ) && (
              <Button
                label={"apply"}
                clickFunction={() => {
                  handleApplyToJob();
                }}
              />
            )}
          </Modal>
        )}
      </Section>
    </>
  );
};

export default JobFeed;
