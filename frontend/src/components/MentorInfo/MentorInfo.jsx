import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
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
import Input from "../Input/Input";
import ProfileImg from "../../assets/Ellipse 3.png";
import MailIcon from "../../assets/admin-icons/mail.png";
import PhoneIcon from "../../assets/admin-icons/phone.png";
import Linkedin from "../../assets/social-icons/linkedin.png";
import GreenCheckSign from "../../assets/check-sign.png";

const MentorInfo = ({ mentorData }) => {
  const token = window.localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const [isOfferJobModalVisible, setIsOfferJobModalVisible] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [isEditActive, setIsEditActive] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skills, setSkills] = useState([]);
  const [desc, setDesc] = useState("");
  const [position, setPosition] = useState("");
  const [category, setCategory] = useState("");
  const maxLength = 1200;

  useEffect(() => {
    setName(mentorData.name);
    setEmail(mentorData.email);
    setPhone(mentorData.phone);
    setSkills(mentorData.skills);
    setDesc(mentorData.desc);
    setPosition(mentorData.position);
  }, [mentorData]);

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
        category: category,
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
        setCategory("");
        handleToggleOfferJobModal();
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditActive(!isEditActive);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditActive(false);
  };

  const saveEditedAccount = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        desc,
        skills,
        email,
        phone,
        position,
        id: mentorData._id,
      };
      const update = await fetch("/api/update-mentor-account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
      });

      if (update.ok) {
        const data = await update.json();
        setIsEditActive(false);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", { error });
    }
  };

  return (
    <>
      <Section>
        {user.type === "mentor" && <Title>My Stats</Title>}
        <div className="mentor-info">
          <div className="mentor-info-container">
            <div className="mentor-info-personal-data-container">
              <div style={{ textAlign: "center" }}>
                <img
                  src={ProfileImg}
                  alt="Profile Image"
                  className="mentor-info-profile-image"
                />
                <img
                  src={GreenCheckSign}
                  style={{ position: "absolute", right: "33%", top: "33%" }}
                />
              </div>
              {!isEditActive && (
                <>
                  <h3 className="mentor-info-name">
                    {mentorData.name}
                    <sup style={{ marginLeft: 3 }}>
                      <a href="http://linkedin.com" target="_blank">
                        <img
                          src={Linkedin}
                          alt="linkedin"
                          className="mentor-info-linkedin"
                        />
                      </a>
                    </sup>
                  </h3>

                  <p className="mentor-info-possition">{mentorData.position}</p>

                  <p className="mentor-info-contact">
                    <img src={MailIcon} alt="" />

                    {mentorData.email}
                  </p>
                  <p className="mentor-info-contact">
                    <img src={PhoneIcon} alt="" />

                    {mentorData.phone}
                  </p>
                </>
              )}
              {isEditActive && (
                <>
                  <Input
                    type="text"
                    value={name}
                    className="mentor-info-edit-input"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Input
                    type="text"
                    value={position}
                    className="mentor-info-edit-input"
                    onChange={(e) => setPosition(e.target.value)}
                  />

                  <Input
                    type="email"
                    value={email}
                    className="mentor-info-edit-input"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="number"
                    value={phone}
                    className="mentor-info-edit-input"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              )}
            </div>
            <div className="mentor-info-about-data-container">
              {user.type === "mentor" && <h4>About</h4>}
              {user.type === "startup" && <h4>About Mentor</h4>}
              {!isEditActive && mentorData.skills && (
                <>
                  <p className="mentor-info-skills">
                    Skills: {mentorData.skills.join(" | ")}
                  </p>
                  <p className="mentor-info-desc">{mentorData.desc}</p>
                </>
              )}

              {isEditActive && mentorData.skills && (
                <>
                  <TagsInput
                    value={skills}
                    onChange={setSkills}
                    name="fruits"
                    placeHolder="press enter to add new skill"
                    classNames="mentor-info-edit-input"
                  />
                  {/* <Input
                    type="text"
                    value={skills}
                    className="mentor-info-edit-input"
                    onChange={(e) => setSkills(e.target.value)}
                  /> */}
                  <Textarea
                    value={desc}
                    className="mentor-info-edit-textarea"
                    onChange={(e) => setDesc(e.target.value)}
                    maxLength={maxLength}
                  ></Textarea>
                  <p className="mentor-info-textarea-length">
                    {maxLength - desc.length} characters remaining
                  </p>
                  <div className="mentor-info-buttons-container">
                    <Button
                      label="Save"
                      className="mentor-info-save-button"
                      clickFunction={saveEditedAccount}
                    />
                    <Button
                      label="Cancel"
                      className="mentor-info-cancel-button"
                      clickFunction={handleCancel}
                    />
                  </div>
                </>
              )}
              {user.type === "mentor" && (
                <span
                  className="mentor-info-edit-button"
                  onClick={(e) => handleEdit(e)}
                >
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
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              skillsRequired={skillsRequired}
              setSkillsRequired={setSkillsRequired}
              clickFunction={(e) => handleCreateNewJobSubmit(e)}
              category={category}
              setCategory={setCategory}
            />
          </Modal>
        )}
      </Section>
    </>
  );
};

export default MentorInfo;
