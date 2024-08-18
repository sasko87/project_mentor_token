import React from "react";
import Search from "../Search/Search";
import ProfileImg from "../../assets/Ellipse 3.png";
import "./adminPageHeader.css";

const AdminPageHeader = ({ user }) => {
  const placeholder =
    user.type === "startup" ? "Search Mentor..." : "Search...";

  return (
    <div className="admin-page-header">
      <Search placeholder={placeholder} />
      <div className="account-profile">
        {/* TODO smeni ja slikata spored user (treba da ja ima u token) */}
        <img src={ProfileImg} alt="Profile Image" className="profile-image" />
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default AdminPageHeader;
