import React, { useState } from "react";
import StartupHeader from "../../components/StartupHeader/StartupHeader";
import Section from "../../components/Section/Section";
import Card from "../../components/Card/Card";
import ProfileImg from "../../assets/Ellipse 3.png";
import Button from "../../components/Button/Button";
import "./mentors.css";
import { useEffect } from "react";
import QuickOverview from "../../components/QuickOverview/QuickOverview";

const Mentors = () => {
  const token = window.localStorage.getItem("token");
  const [accountData, setAccountData] = useState([]);

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
        console.log(data);
        setAccountData(data);
      }
    } catch (error) {
      console.log("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

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
          {accountData.slice(0, 3).map((mentor) => (
            <div className="startup-mentors-card">
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
