import React, { useState, useEffect } from "react";
import MentorInfo from "../../components/MentorInfo/MentorInfo";
import { jwtDecode } from "jwt-decode";
import Grafikon from "../../assets/grafikon.png";
import QuickOverview from "../../components/QuickOverview/QuickOverview";
import "./myStats.css";
import Title from "../../components/Title/Title";

const MyStats = () => {
  const [mentorData, setMentorData] = useState([]);
  const token = window.localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const fetchMentorInfo = async () => {
    try {
      const res = await fetch("/api/get-mentor-statistics", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setMentorData(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };
  useEffect(() => {
    fetchMentorInfo();
  }, []);

  const quickOverviewData = [
    {
      title: "Total Jobs",
      count: mentorData.totalJobs,
    },
    {
      title: "Total Assigned Jobs",
      count: mentorData.totalAssignedJobs,
    },
    {
      title: "Jobs That You Have Applied",
      count: mentorData.applicationsSent,
    },
    {
      title: "Finished Jobs",
      count: mentorData.doneJobs,
    },
  ];
  return (
    <>
      <MentorInfo mentorData={mentorData} />
      <div className="my-stats-info-container">
        <div>
          <Title>Performance Over Time</Title>
          <img
            src={Grafikon}
            style={{ width: "567.11px", height: "345.03px" }}
          />
        </div>
        <div>
          <QuickOverview data={quickOverviewData} />
        </div>
      </div>
    </>
  );
};

export default MyStats;
