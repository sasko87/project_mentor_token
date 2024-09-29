import React, { useState, useEffect } from "react";
import "./bestMentors.css";
import Title from "../Title/Title";
import { useNavigate } from "react-router-dom";
import RisingIcon from "../../assets/admin-icons/rizing-arrow.png";

const BestMentors = ({ mentors, icon }) => {
  const [rizingMentor, setRizingMentor] = useState(false);
  const navigate = useNavigate();
  const handleViewMentor = (id) => {
    navigate(`/mentors/${id}`);
  };

  // Najdi go mentorot so najmnogu zavrseni raboti vo poslednite 30 dena
  useEffect(() => {
    // Find the mentor with the most jobs in the last 30 days
    if (mentors.length > 0) {
      const maxJobsIn30Days = Math.max(
        ...mentors.map((mentor) => mentor.doneJobsInLast30Days.length)
      );
      const risingMentor = mentors.find(
        (mentor) => mentor.doneJobsInLast30Days.length === maxJobsIn30Days
      );
      if (risingMentor) {
        setRizingMentor(risingMentor._id);
      }
    }
  }, [mentors]);

  return (
    <>
      <Title>Best Performing Mentors</Title>
      <div className="best-mentors-container">
        {mentors
          .sort(
            (a, b) =>
              b.doneJobsInLast30Days.length - a.doneJobsInLast30Days.length
          )
          .slice(0, 3)
          .map((mentor, _id) => (
            <div
              key={mentor._id}
              className={`best-mentors-data ${
                mentor._id === rizingMentor ? "rizing-mentor" : ""
              }`}
              onClick={() => handleViewMentor(mentor._id)}
            >
              <div className="best-mentor-profile-image-container">
                <img
                  src={mentor.profileImage}
                  alt="Profile Image"
                  className="best-mentor-profile-image"
                />
              </div>
              <div style={{ width: "40%" }}>
                <h4 className="best-mentor-name">{mentor.name}</h4>
              </div>

              <div className="best-mentor-jobs">
                <p className="best-mentor-completed-jobs">
                  {mentor.doneJobsInLast30Days.length}
                </p>
                <p className="best-mentor-archived-jobs">Archived Jobs</p>
              </div>
              <div style={{ width: "10%", textAlign: "right" }}>
                <img
                  src={mentor._id === rizingMentor ? RisingIcon : icon}
                  alt="arrow up"
                  className="best-mentor-arrow"
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default BestMentors;
