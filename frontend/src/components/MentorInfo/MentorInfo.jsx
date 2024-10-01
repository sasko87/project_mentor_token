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
  const [profileImage, setProfileImage] = useState("");
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(null);
  const [uploadImage, setUploadImage] = useState();
  const maxLength = 1200;

  useEffect(() => {
    setName(mentorData.name);
    setEmail(mentorData.email);
    setPhone(mentorData.phone);
    setSkills(mentorData.skills);
    setDesc(mentorData.desc);
    setPosition(mentorData.position);
    setProfileImage(mentorData.profileImage);
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
        setSkillsRequired("");
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

  const handleFileUpload = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setUploadImage(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setFile(reader.result);
    };
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const saveEditedAccount = async (e) => {
    e.preventDefault();
    try {
      let imagePath = profileImage;
      if (uploadImage) {
        let formData = new FormData();
        formData.set("document", uploadImage);
        formData.set("email", email);
        const image = await fetch("/api/upload", {
          method: "POST",
          "Content-Type": "multipart/form-data",
          body: formData,
        });
        if (image.ok) {
          const data = await image.json();

          imagePath = data.localhost;
        }
      }

      const data = {
        name,
        desc,
        skills,
        email,
        phone,
        position,
        id: mentorData._id,
        profileImage: imagePath,
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
        const updatedData = await update.json();
        console.log(updatedData.desc);
        setName(updatedData.name);
        setEmail(updatedData.email);
        setPhone(updatedData.phone);
        setSkills(updatedData.skills);
        setDesc(updatedData.desc);
        setPosition(updatedData.position);
        setProfileImage(updatedData.profileImage);
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
              {!isEditActive && (
                <>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={profileImage}
                      alt="Profile Image"
                      className="mentor-info-profile-image"
                    />
                    <img
                      src={GreenCheckSign}
                      style={{ position: "absolute", right: "33%", top: "33%" }}
                    />
                  </div>
                  <h3 className="mentor-info-name">
                    {name}
                    <sup style={{ marginLeft: 3 }}>
                      <a href={mentorData.linkedin} target="_blank">
                        <img
                          src={Linkedin}
                          alt="linkedin"
                          className="mentor-info-linkedin"
                        />
                      </a>
                    </sup>
                  </h3>

                  <p className="mentor-info-possition">{position}</p>

                  <p className="mentor-info-contact">
                    <img src={MailIcon} alt="" />

                    {email}
                  </p>
                  <p className="mentor-info-contact">
                    <img src={PhoneIcon} alt="" />

                    {phone}
                  </p>
                </>
              )}
              {isEditActive && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className=".mentor-info-edit-image-container">
                      <label
                        htmlFor="file-upload"
                        className="register-upload-label"
                      >
                        {file ? (
                          <img
                            src={preview}
                            className="mentor-info-profile-image"
                          />
                        ) : (
                          <>
                            <img
                              src={profileImage}
                              alt="User Icon"
                              className="mentor-info-profile-image"
                            />
                          </>
                        )}
                      </label>
                      <input
                        name="document"
                        type="file"
                        id="file-upload"
                        onChange={handleFileUpload}
                        accept="image/jpeg, image/png, image/pjpeg, image/gif"
                      />
                    </div>
                  </div>
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
              {!isEditActive && skills && (
                <>
                  <p className="mentor-info-skills">
                    Skills: {skills.join(" | ")}
                  </p>
                  <p className="mentor-info-desc">{desc}</p>
                </>
              )}

              {isEditActive && skills && (
                <>
                  <TagsInput
                    value={skills}
                    onChange={setSkills}
                    name="fruits"
                    placeHolder="press enter to add new skill"
                    classNames="mentor-info-edit-input"
                  />

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
              clickFunction={handleCreateNewJobSubmit}
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
