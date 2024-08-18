import React, { useEffect, useState } from "react";
import Section from "../Section/Section";
import "./mentorInfo.css";
import Textarea from "../Textarea/Textarea";
import editIcon from "../../assets/admin-icons/edit.png";
import Button from "../Button/Button";
import { jwtDecode } from "jwt-decode";
import PlusIcon from "../../assets/admin-icons/plus.png";

const MentorInfo = ({ data }) => {
  const token = window.localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  return (
    <>
      <Section>
        {user.type === "mentor" && <h2>My Stats</h2>}
        <div className="mentor-info">
          <div className="mentor-info-container">
            <div className="mentor-info-personal-data-container">
              <img src="" alt="" />
              <h3 className="mentor-info-name">{data.name}</h3>
              {data.skills && (
                <p className="mentor-info-possition">{data.skills[0]}</p>
              )}
              <p className="mentor-info-contact">{data.email}</p>
              <p className="mentor-info-contact">{data.phone}</p>
            </div>
            <div className="mentor-info-about-data-container">
              {user.type === "mentor" && <h4>About</h4>}
              {user.type === "startup" && <h4>About Mentor</h4>}
              {data.skills && (
                <p className="mentor-info-skills">
                  Skills: {data.skills.join(" | ")}
                </p>
              )}
              {/* <Textarea
                placeholder={mentorInfo.desc}
                disabled={true}
                className="mentor-info-textarea"
              ></Textarea> */}
              <p className="mentor-info-desc">{data.desc}</p>
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
                  />
                </span>
              )}
            </div>
          </div>
          <div></div>
        </div>
      </Section>
    </>
  );
};

export default MentorInfo;
