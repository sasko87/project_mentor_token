import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import BestMentors from "../../components/BestMentors/BestMentors";
import AssignedJobs from "../../components/AssignedJobs/AssignedJobs";
import StartupHeader from "../../components/StartupHeader/StartupHeader";
import ArrowUp from "../../assets/admin-icons/arrow-up-side.png";
import ProfileImg from "../../assets/Ellipse 3.png";

const Dashboard = () => {
  const token = window.localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const [jobs, setJobs] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [accountData, setAccountData] = useState([]);
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
      const accountData = await fetch("/api/getaccount", {
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
        console.log(data);
        setMentors(data);
      }
      if (accountData.ok) {
        const data = await accountData.json();
        console.log(data);
        setAccountData(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
      {user.type === "startup" && (
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
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            >
              <BestMentors
                mentors={mentors}
                profileImg={ProfileImg}
                icon={ArrowUp}
              />
            </div>
          </section>
        </>
      )}

      {user.type === "mentor" && (
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
            <div
              style={{ display: "flex", flexDirection: "column", width: "50%" }}
            ></div>
          </section>
        </>
      )}
    </>
  );
};

export default Dashboard;
