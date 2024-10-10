import React, { useState } from "react";

import Section from "../../components/Section/Section";
import Button from "../../components/Button/Button";
import "./mentors.css";
import { useEffect } from "react";
import QuickOverview from "../../components/QuickOverview/QuickOverview";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Mentors = () => {
  const token = window.localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const [accountData, setAccountData] = useState([]);
  const [accountStatistics, setAccountStatistics] = useState([]);

  const navigate = useNavigate();
  const fetchMentors = async () => {
    try {
      const allMentors = await fetch("/api/getAllMentors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const statistics = await fetch("/api/get-startup-statistics", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (allMentors.ok) {
        const data = await allMentors.json();
        setAccountData(data);
      }
      if (statistics.ok) {
        const data = await statistics.json();
        console.log(data);
        setAccountStatistics(data);
      }
    } catch (error) {
      console.log("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleViewMentor = (id) => {
    navigate(`/mentors/${id}`);
  };

  const quickOverviewData = [
    {
      title: "Total Mentors",
      count: accountData.length,
    },
    {
      title: "Total Assigned Jobs",
      count: accountStatistics.totalAssignedJobs,
    },
    {
      title: "Finished Jobs",
      count: accountStatistics.doneJobs,
    },
  ];

  return (
    <>
      <Section className="mentors">
        <div className="startup-mentors-cards">
          {accountData.slice(0, 3).map((mentor, index) => (
            <div key={index} className="startup-mentors-card">
              <div style={{ width: "10%" }}>
                <img
                  src={mentor.profileImage}
                  className="startup-mentors-card-image"
                />
              </div>
              <div style={{ width: "80%" }}>
                <h3 className="startup-mentors-card-name">{mentor.name}</h3>
                <p className="startup-mentors-card-rating">{mentor.rating}</p>
                <p className="startup-mentors-card-skills">
                  Skills: {mentor.skills.join(" | ")}
                </p>
                <p className="startup-mentors-card-description">
                  {mentor.desc.length > 200
                    ? mentor.desc.slice(0, 200) + "..."
                    : mentor.desc}
                </p>
              </div>
              <Button
                label="View Mentor"
                className="startup-mentors-card-button"
                clickFunction={() => handleViewMentor(mentor._id)}
              />
            </div>
          ))}
        </div>

        <QuickOverview data={quickOverviewData} text="In the last month" />
      </Section>
    </>
  );
};

export default Mentors;
