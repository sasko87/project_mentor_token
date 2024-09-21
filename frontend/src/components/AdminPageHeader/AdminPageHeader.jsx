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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p className="user-name">{user.name}</p>
          {user.type === "mentor" && <p className="user-type">Mentor</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminPageHeader;
