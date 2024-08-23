import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import BestMentors from "../../../components/BestMentors/BestMentors";
import AssignedJobs from "../../../components/AssignedJobs/AssignedJobs";
import ArrowUp from "../../../assets/admin-icons/arrow-up-side.png";
import ProfileImg from "../../../assets/Ellipse 3.png";

const DashboardStartup = () => {
  const token = window.localStorage.getItem("token");
  const user = window.mentorToken.user;

  const [jobs, setJobs] = useState([]);
  const [mentors, setMentors] = useState([]);

  const [selectedTab, setSelectedTab] = useState(0);

  const fetchData = async () => {
    try {
      const allJobs = await fetch("/api/get-one-company-jobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //TODO nov endpoint get top 3
      //ke preracunas na BE i samo ke pokazes na FE bez nisto drugo
      const allMentors = await fetch("/api/getAllMentors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        query: { status: "OPEN" },
      });

      if (allJobs.ok) {
        const data = await allJobs.json();
        setJobs(data);
      }

      if (allMentors.ok) {
        const data = await allMentors.json();
        console.log(data);
        setMentors(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const doneJobs = jobs.filter((job) => job.status === "DONE");
  const inProgressJobs = jobs.filter((job) => job.status === "IN_PROGRESS");
  const rejectedJobs = jobs.filter((job) => job.status === "REJECED");

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
      content: inProgressJobs,
    },
  ];

  const handleTabs = (index) => {
    setSelectedTab(index);
  };

  return (
    <>
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
