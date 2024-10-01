import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import BestMentors from "../../../components/BestMentors/BestMentors";
import AssignedJobs from "../../../components/AssignedJobs/AssignedJobs";
import ArrowUp from "../../../assets/admin-icons/arrow-up-side.png";
import ProfileImg from "../../../assets/Ellipse 3.png";
import ApexChart from "../../../components/ApexChart/ApexChart";
import Title from "../../../components/Title/Title";
import Section from "../../../components/Section/Section";

const DashboardStartup = () => {
  const token = window.localStorage.getItem("token");
  const user = window.mentorToken.user;

  const [jobs, setJobs] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [jobsInMonth, setJobsInMonth] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchData = async () => {
    try {
      const allJobs = await fetch("/api/get-one-company-jobs", {
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
        query: { status: "OPEN" },
      });

      if (allJobs.ok) {
        const data = await allJobs.json();
        setJobs(data.jobs);
        setJobsInMonth(data.jobsInMonth);
      }

      if (allMentors.ok) {
        const data = await allMentors.json();
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
      <Section className="flex">
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
          <div style={{ marginTop: 25 }}>
            <Title>OVERALL STATISTICKS</Title>
          </div>

          <div
            style={{
              maxWidth: 567,
              width: "100%",
              marginTop: 25,
              backgroundColor: "white",
              borderRadius: 23.8,
              padding: 20,
            }}
          >
            <ApexChart jobsInMonth={jobsInMonth} />
          </div>
        </div>
      </Section>
    </>
  );
};

export default DashboardStartup;
