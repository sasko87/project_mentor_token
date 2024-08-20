import React, { useEffect, useState } from "react";
import Section from "../Section/Section";
import "./mentorInfo.css";
import Textarea from "../Textarea/Textarea";
import editIcon from "../../assets/admin-icons/edit.png";
import Button from "../Button/Button";
import { jwtDecode } from "jwt-decode";
import PlusIcon from "../../assets/admin-icons/plus.png";
import Title from "../Title/Title";
import Modal from "../Modal/Modal";
import NewJob from "../NewJob/NewJob";

const MentorInfo = ({ mentorData }) => {
  const token = window.localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const [isOfferJobModalVisible, setIsOfferJobModalVisible] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);

  const handleToggleOfferJobModal = () => {
    setIsOfferJobModalVisible(!isOfferJobModalVisible);
  };

  const handleCreateNewJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: jobTitle,
        description: jobDescription,
        mentorId: mentorData._id,
      };
      const res = await fetch("/api/create-direct-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();
        setJobTitle("");
        setJobDescription("");

        handleToggleOfferJobModal();
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  return (
    <>
      <Section>
        {user.type === "mentor" && <Title>My Stats</Title>}
        <div className="mentor-info">
          <div className="mentor-info-container">
            <div className="mentor-info-personal-data-container">
              <img src="" alt="" />
              <h3 className="mentor-info-name">{mentorData.name}</h3>
              {mentorData.skills && (
                <p className="mentor-info-possition">{mentorData.skills[0]}</p>
              )}
              <p className="mentor-info-contact">{mentorData.email}</p>
              <p className="mentor-info-contact">{mentorData.phone}</p>
            </div>
            <div className="mentor-info-about-data-container">
              {user.type === "mentor" && <h4>About</h4>}
              {user.type === "startup" && <h4>About Mentor</h4>}
              {mentorData.skills && (
                <p className="mentor-info-skills">
                  Skills: {mentorData.skills.join(" | ")}
                </p>
              )}
              {/* <Textarea
                placeholder={mentorInfo.desc}
                disabled={true}
                className="mentor-info-textarea"
              ></Textarea> */}
              <p className="mentor-info-desc">{mentorData.desc}</p>
              {user.type === "mentor" && (
                <span className="mentor-info-edit-button">
                  <img
                    src={editIcon}
                    style={{ width: "18px", height: "18px" }}
                  />
                </span>
              )}
              {user.type === "startup" && (
                <span className="mentor-info-edit-button">
                  <Button
                    label="Offer New Job"
                    className="mentor-info-offer-job-button"
                    startingIcon={PlusIcon}
                    clickFunction={() => handleToggleOfferJobModal(false)}
                  />
                </span>
              )}
            </div>
          </div>
          <div></div>
        </div>
        {isOfferJobModalVisible && (
          <Modal
            closeModal={handleToggleOfferJobModal}
            width={553.04}
            height={666.71}
          >
            <NewJob
              title="Offer Job"
              text="Create and offer job to a mentor"
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              setJobDescription={setJobDescription}
              jobDescription={jobDescription}
              skillsRequired={skillsRequired}
              setSkillsRequired={setSkillsRequired}
              clickFunction={handleCreateNewJobSubmit}
            />
          </Modal>
        )}
      </Section>
    </>
  );
};

export default MentorInfo;
