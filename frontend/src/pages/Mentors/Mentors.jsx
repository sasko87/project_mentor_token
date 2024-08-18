import React, { useState } from "react";

import Section from "../../components/Section/Section";
import Card from "../../components/Card/Card";
import ProfileImg from "../../assets/Ellipse 3.png";
import Button from "../../components/Button/Button";
import "./mentors.css";
import { useEffect } from "react";
import QuickOverview from "../../components/QuickOverview/QuickOverview";
import { useNavigate, useLocation } from "react-router-dom";

const Mentors = () => {
  const token = window.localStorage.getItem("token");
  const [accountData, setAccountData] = useState([]);
  const [mentorData, setMentorData] = useState([]);
  const navigate = useNavigate();
  const fetchMentors = async () => {
    try {
      const allMentors = await fetch("/api/getAllMentors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (allMentors.ok) {
        const data = await allMentors.json();
        setAccountData(data);
      }
    } catch (error) {
      console.log("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleViewMentor = async (id) => {
    try {
      const res = await fetch(`/api/get-account-data-by-id/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setMentorData(data);
        navigate("/mentorinfo", { state: { data: data } });
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const quickOverviewData = [
    {
      title: "Total Mentors",
      count: 150,
    },
    {
      title: "Total Assigned Jobs",
      count: 180,
    },
    {
      title: "Finished Jobs",
      count: 50,
    },
  ];

  return (
    <>
      <Section className="mentors">
        <div className="startup-mentors-cards">
          {accountData.slice(0, 3).map((mentor, index) => (
            <div key={index} className="startup-mentors-card">
              <div style={{ width: "10%" }}>
                <img src={ProfileImg} className="startup-mentors-card-image" />
              </div>
              <div style={{ width: "80%" }}>
                <h3 className="startup-mentors-card-name">{mentor.name}</h3>
                <p className="startup-mentors-card-rating">{mentor.rating}</p>
                <p className="startup-mentors-card-skills">
                  Skills: {mentor.skills.join(" | ")}
                </p>
                <p className="startup-mentors-card-description">
                  {mentor.desc}
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
