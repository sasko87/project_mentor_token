import React, { useEffect, useState } from "react";
import StartupHeader from "../../components/StartupHeader/StartupHeader";
import Card from "../../components/Card/Card";
import ArrowUp from "../../assets/admin-icons/arrow-up-side.png";
import ProfileImg from "../../assets/Ellipse 3.png";
import "./dashboardStartup.css";

const DashboardStartup = () => {
  // const povik = async () => {
  //   try {
  //     const res = await fetch("/api/filteredJobs", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       query: {
  //         status: "Open",
  //         companyId: "66ace5bb6a17e10e2e009e46",
  //         skillsRequired: "HTML",
  //       },
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(data);
  //     } else {
  //       const errorData = await res.json();
  //     }
  //   } catch (err) {
  //     console.error("An error occurred during login:", err);
  //   }
  // };

  // useEffect(() => {
  //   povik();
  // }, []);
  const token = window.localStorage.getItem("token");
  const [jobs, setJobs] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const fetchJobs = async () => {
    try {
      const allJobs = await fetch("/api/showjobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allMentors = await fetch("/api/getAllMentors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (allJobs.ok) {
        const data = await allJobs.json();
        setJobs(data);
      }

      if (allMentors.ok) {
        const data = await allMentors.json();
        setMentors(data);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const doneJobs = jobs.filter((job) => job.status === "Done");
  const pendingJobs = jobs.filter((job) => job.status === "Pending");
  const rejectedJobs = jobs.filter((job) => job.status === "Closed");

  const tabs = [
    {
      tab: "All",
      content: jobs,
    },
    {
      tab: "Done",
      content: doneJobs,
    },
    {
      tab: "Rejected",
      content: rejectedJobs,
    },
    {
      tab: "Pending",
      content: pendingJobs,
    },
  ];

  const handleTabs = (index) => {
    setSelectedTab(index);
  };

  return (
    <>
      <StartupHeader placeholder="Search Mentor..." />
      <div className="startup-jobs">
        <div className="startup-jobs-tab-title">
          {tabs.map((tab, index) => (
            <div key={index} onClick={() => handleTabs(index)}>
              <p>{tab.tab}</p>
            </div>
          ))}
        </div>

        <div className="startupCompanyJobs">
          {tabs[selectedTab].content.map((job) => (
            <div key={job._id} className="startupCompanyJob">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="best-mentors-container">
        {mentors.slice(0, 3).map((mentor) => (
          <div className="best-mentors-data">
            <div style={{ width: "15%", textAlign: "center" }}>
              <img
                src={ProfileImg}
                alt="Profile Image"
                className="best-mentor-profile-image"
              />
            </div>
            <div style={{ width: "40%" }}>
              <h4 className="best-mentor-name">{mentor.name}</h4>
            </div>

            <div className="best-mentor-jobs">
              <p className="best-mentor-completed-jobs">
                {mentor.acceptedJobs.length}
              </p>
              <p className="best-mentor-archived-jobs">Archived Jobs</p>
            </div>
            <div style={{ width: "10%", textAlign: "right" }}>
              <img src={ArrowUp} alt="arrow up" className="best-mentor-arrow" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardStartup;
