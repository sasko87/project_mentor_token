import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import ProfileImg from "../../assets/Ellipse 3.png";
import "./adminPageHeader.css";
import defaultProfileImage from "../../lib/ProfileImage";
import { Link } from "react-router-dom";

const AdminPageHeader = ({ user }) => {
  const [dropdownIsActive, setDropdownIsActive] = useState(false);
  const [accountData, setAccountData] = useState("");
  const token = window.localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/get-account-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAccountData(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDropdown = (e) => {
    e.preventDefault();
    setDropdownIsActive(!dropdownIsActive);
  };

  const closeDropdown = () => {
    setDropdownIsActive(false);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  const placeholder =
    user.type === "startup" ? "Search Mentor..." : "Search...";

  return (
    <div className="admin-page-header">
      <Search placeholder={placeholder} />
      <div className="account-profile">
        <div className="account-profile-content" onClick={handleDropdown}>
          <img
            src={accountData.profileImage}
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
            <p className="user-name">{accountData.name}</p>
            {user.type === "mentor" && <p className="user-type">Mentor</p>}
          </div>
        </div>
        {dropdownIsActive && (
          <div className="account-profile-dropdown">
            <ul>
              {user.type === "mentor" && (
                <li>
                  <Link
                    to="/mystats"
                    className="link-default"
                    onClick={closeDropdown}
                  >
                    My Profile
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/change-password"
                  className="link-default"
                  onClick={closeDropdown}
                >
                  Change Password
                </Link>
              </li>
              <hr style={{ marginTop: 30, marginRight: 25 }} />
              <li>
                <Link to="/" className="link-default" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPageHeader;
