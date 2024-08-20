import React, { useEffect, useState } from "react";
import "./jobfeed.css";
import Section from "../../components/Section/Section";
import JobsCard from "../../components/JobsCard/JobsCard";
import Modal from "../../components/Modal/Modal";
import FilterJobs from "../../components/FilterJobs/FilterJobs";
import Title from "../../components/Title/Title";
import LayoutIcon from "../../assets/admin-icons/layout-grid.png";
import Button from "../../components/Button/Button";
import ProfileImg from "../../assets/Ellipse 3.png";

const JobFeed = () => {
  const user = window.mentorToken.user;
  const [allJobs, setAllJobs] = useState([]);
  const [isViewJobModalActive, setIsViewJobModalActive] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [skillsFilter, setSkillsFilter] = useState();
  const token = window.localStorage.getItem("token");
  const fetchData = async () => {
    try {
      let payload = {
        status: "OPEN",
        applicationType: "OPEN_FOR_ALL",
      };
      if (skillsFilter) {
        payload.skillsRequired = skillsFilter;
      }
      const allJobs = await fetch(
        "/api/filtered-jobs?" + new URLSearchParams(payload).toString(),
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
  }, [skillsFilter]);

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
      value: "",
    },
    {
      title: "HTML",
      value: "HTML",
    },
    {
      title: "Some Skills",
      value: "Some Skills",
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

  // const sortNewestJobs = allJobs["createdAt"].sort((a, b) => a - b);
  console.log(allJobs);
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
            <FilterJobs
              label="Category"
              selecetdFilterValue={skillsFilter}
              setSkillsFilter={setSkillsFilter}
              filter={category}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FilterJobs icon={true} label="Filters" />
            <div className="filter-container" style={{ marginRight: 0 }}>
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
            width={470}
            height={461}
          >
            <div className="job-details-container">
              <div>
                <div className="job-details-company-info">
                  <img src={ProfileImg} alt="" />
                  <p>{selectedJob.companyId.name}</p>
                </div>
                <div>
                  <h3 className="job-details-title">New job offer</h3>
                  <p className="job-details-description">
                    {selectedJob.description}
                  </p>
                </div>
              </div>
              {selectedJob.applications.find(
                (job) => job.mentorId._id === user.id
              ) && (
                <div>
                  <p className="job-details-alredy-applied">
                    You have already applied for this job.
                  </p>
                </div>
              )}

              {!selectedJob.applications.find(
                (job) => job.mentorId._id === user.id
              ) && (
                <Button
                  label={"Apply"}
                  className="job-details-apply-button"
                  clickFunction={() => {
                    handleApplyToJob();
                  }}
                />
              )}
            </div>
          </Modal>
        )}
      </Section>
    </>
  );
};

export default JobFeed;
