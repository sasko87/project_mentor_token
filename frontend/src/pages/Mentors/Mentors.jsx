import React from "react";
import StartupHeader from "../../components/StartupHeader/StartupHeader";
import Section from "../../components/Section/Section";
import Card from "../../components/Card/Card";
import ProfileImg from "../../assets/Ellipse 3.png";
import Button from "../../components/Button/Button";
import "./mentors.css";

const Mentors = () => {
  const mentor = [
    {
      name: "Aleksandar",
      image: ProfileImg,
      rating: "2.54 average based on KPI success rate",
      skills: "Skills: Sales | Management | Problem-solving",
      description:
        "Field sales training. 5+ years in an outside sales position ",
    },
    {
      name: "Kiril",
      image: ProfileImg,
      rating: "2.54 average based on KPI success rate",
      skills: "Skills: Sales | Management | Problem-solving",
      description:
        "Field sales training. 5+ years in an outside sales position ",
    },
    {
      name: "David",
      image: ProfileImg,
      rating: "2.54 average based on KPI success rate",
      skills: "Skills: Sales | Management | Problem-solving",
      description:
        "Field sales training. 5+ years in an outside sales position ",
    },
  ];
  return (
    <>
      <StartupHeader placeholder="Search Mentor..." />
      <Section className="mentors">
        <div className="startup-mentors-cards">
          {mentor.map((mentor) => (
            <div className="startup-mentors-card">
              <div style={{ width: "10%" }}>
                <img
                  src={mentor.image}
                  className="startup-mentors-card-image"
                />
              </div>
              <div style={{ width: "80%" }}>
                <h3 className="startup-mentors-card-name">{mentor.name}</h3>
                <p className="startup-mentors-card-rating">{mentor.rating}</p>
                <p className="startup-mentors-card-skills">{mentor.skills}</p>
                <p className="startup-mentors-card-description">
                  {mentor.description}
                </p>
              </div>
              <Button
                label="View Mentor"
                className="startup-mentors-card-button"
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default Mentors;
