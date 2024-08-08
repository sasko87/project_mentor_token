import React, { useEffect, useState } from "react";
import StartupHeader from "../../components/StartupHeader/StartupHeader";
import Card from "../../components/Card/Card";
import ArrowUp from "../../assets/admin-icons/arrow-up-side.png";
import ProfileImg from "../../assets/Ellipse 3.png";
import "./dashboardStartup.css";
import AssignedJobs from "../../components/AssignedJobs/AssignedJobs";
import BestMentors from "../../components/BestMentors/BestMentors";

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
      tab: "In Progress",
      content: pendingJobs,
    },
  ];

  const handleTabs = (index) => {
    setSelectedTab(index);
  };

  return (
    <>
      <StartupHeader placeholder="Search Mentor..." />
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
          padding: "20px 0",
        }}
      >
        <AssignedJobs
          tabs={tabs}
          onClickFunction={handleTabs}
          selectedTab={selectedTab}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <BestMentors
            mentors={mentors}
            profileImg={ProfileImg}
            icon={ArrowUp}
          />
        </div>
      </section>
    </>
  );
};

export default DashboardStartup;
