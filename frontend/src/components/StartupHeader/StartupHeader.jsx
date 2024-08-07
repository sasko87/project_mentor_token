import React from "react";
import Search from "../Search/Search";
import ProfileImg from "../../assets/Ellipse 3.png";
import "./startupHeader.css";

const StartupHeader = ({ placeholder }) => {
  return (
    <div className="admin-startup-header">
      <Search placeholder={placeholder} />
      <div className="account-profile">
        <img src={ProfileImg} alt="Profile Image" className="profile-image" />
        <p>Aleksandar Stevkovski</p>
      </div>
    </div>
  );
};

export default StartupHeader;
