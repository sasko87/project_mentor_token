import React from "react";
import Search from "../Search/Search";
import ProfileImg from "../../assets/Ellipse 3.png";
import "./adminPageHeader.css";
import defaultProfileImage from "../../lib/ProfileImage";

const AdminPageHeader = ({ user }) => {
  const placeholder =
    user.type === "startup" ? "Search Mentor..." : "Search...";

  return (
    <div className="admin-page-header">
      <Search placeholder={placeholder} />
      <div className="account-profile">
        <img
          src={user.profileImage}
          alt="Profile Image"
          className="profile-image"
        />
        <p>{user.name}</p>
      </div>
    </div>
  );
};

export default AdminPageHeader;
