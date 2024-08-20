import React from "react";
import "./bestMentors.css";
import Title from "../Title/Title";
import { useNavigate } from "react-router-dom";

const BestMentors = ({ mentors, profileImg, icon }) => {
  const navigate = useNavigate();
  const handleViewMentor = (id) => {
    navigate(`/mentors/${id}`);
  };

  return (
    <>
      <Title>Best Performing Mentors</Title>
      <div className="best-mentors-container">
        {mentors.slice(0, 3).map((mentor) => (
          <div
            className="best-mentors-data"
            onClick={() => handleViewMentor(mentor._id)}
          >
            <div style={{ width: "15%", textAlign: "center" }}>
              <img
                src={profileImg}
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
              <img src={icon} alt="arrow up" className="best-mentor-arrow" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BestMentors;
