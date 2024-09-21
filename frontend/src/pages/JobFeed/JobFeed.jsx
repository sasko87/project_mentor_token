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
import JobCardRow from "../../components/JobCardRow/JobCardRow";
import FilterIcon from "../../assets/admin-icons/filter-icon.png";
import { useLocation } from "react-router-dom";
import NoData from "../../components/NoData/NoData";

const JobFeed = () => {
  const user = window.mentorToken.user;
  const [allJobs, setAllJobs] = useState([]);
  const [isViewJobModalActive, setIsViewJobModalActive] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [categoryFilter, setCategoryFilter] = useState();
  const [sortFilter, setSortFilter] = useState("Latest");
  const [selectedStartup, setSelectedStartup] = useState();
  const [filtersDropdown, setFiltersDropdown] = useState(false);
  const [jobLayout, setJobLayout] = useState(false);
  const [allStartups, setAllStartups] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("companyId");

  const token = window.localStorage.getItem("token");
  const fetchData = async () => {
    try {
      let payload = {
        status: "OPEN",
        applicationType: "OPEN_FOR_ALL",
      };
      if (categoryFilter) {
        payload.category = categoryFilter;
      }

      if (selectedStartup) {
        payload.companyId = selectedStartup;
      } else if (id) {
        payload.companyId = id;
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

      const allStartups = await fetch("/api/get-all-startups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (allJobs.ok) {
        let data = await allJobs.json();
        console.log(data);
        if (sortFilter === "Oldest") {
          data = data.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
        } else if (sortFilter === "Latest") {
          data = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }
        setAllJobs(data);
      }
      if (allStartups.ok) {
        let data = await allStartups.json();
        data = data.sort((a, b) => a.name.localeCompare(b.name)); //sompare two strings
        setAllStartups(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [categoryFilter, sortFilter, selectedStartup, id]);
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
      title: "Latest",
      value: "Latest",
    },
    {
      title: "Oldest",
      value: "Oldest",
    },
  ];

  const category = [
    {
      title: "All Categories",
      value: "",
    },
    {
      title: "Software Developer",
      value: "Software Developer",
    },
    {
      title: "Design",
      value: "Design",
    },
    {
      title: "Marketing",
      value: "Marketing",
    },
    {
      title: "Content Writing",
      value: "Content Writing",
    },
    {
      title: "Other",
      value: "OTHER",
    },
  ];

  const handleApplyToJob = async () => {
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
        setIsViewJobModalActive(false);
        fetchData();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const handleJobLayot = (e) => {
    e.preventDefault();
    setJobLayout(!jobLayout);
  };

  const handleFiltersDropdown = (e) => {
    e.preventDefault();
    setFiltersDropdown(!filtersDropdown);
  };
  console.log(selectedStartup);

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
            <FilterJobs
              label="Sort By"
              selecetdFilterValue={sortFilter}
              setSkillsFilter={setSortFilter}
              filter={sort}
            />
            <FilterJobs
              label="Category"
              selecetdFilterValue={categoryFilter}
              setSkillsFilter={setCategoryFilter}
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
            <div
              onClick={handleFiltersDropdown}
              className="filter-container filters"
            >
              <img src={FilterIcon} />
              <label>Filters</label>
              {allStartups && filtersDropdown && (
                <div className="filters-dropdown">
                  <ul>
                    <li onClick={() => setSelectedStartup(null)}>All</li>
                    {allStartups.map((startup) => (
                      <li
                        key={startup._id}
                        value={selectedStartup}
                        onClick={() => setSelectedStartup(startup._id)}
                      >
                        {startup.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* <FilterJobs
              icon={true}
              label="Filters"
              allStartups={allStartups}
              onClick={hangleFiltersDropdown}
            /> */}
            <div className="filter-container" style={{ marginRight: 0 }}>
              <img
                src={LayoutIcon}
                alt="Layout"
                value={jobLayout}
                onClick={(e) => handleJobLayot(e)}
              />
            </div>
          </div>
        </div>
        {allJobs && jobLayout ? (
          <JobCardRow
            jobs={allJobs}
            modalFunction={handleToggleJobDetailsModal}
          />
        ) : (
          <JobsCard
            jobs={allJobs}
            modalFunction={handleToggleJobDetailsModal}
          />
        )}

        {allJobs.length === 0 && <NoData children={"No Jobs avaliabe"} />}

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
