import React from "react";
import "./adminNav.css";
import DashboardIcon from "../../assets/admin-icons/dashboard-icon.png";
import ProfileIcon from "../../assets/admin-icons/profile.png";
import JobIcon from "../../assets/admin-icons/disc.png";
import LogoutIcon from "../../assets/admin-icons/logout.png";
import { Link } from "react-router-dom";

const AdminNav = ({ items }) => {
  return (
    <nav className="admin-nav">
      <div className="admin-nav-links">
        {items.map((item, index) => (
          <Link key={index} to={item.url} className="admin-nav-link">
            <img src={item.icon} className="admin-nav-icon" />
            {item.name}
          </Link>
        ))}
        {/* {user.type === "startup" && (
      <>
       
        <Link to="/mentors" className="admin-nav-link">
          <img src={ProfileIcon} className="admin-nav-icon" />
          Mentors
        </Link>

        <Link to="/Jobs" className="admin-nav-link">
          <img src={JobIcon} className="admin-nav-icon" />
          Jobs
        </Link>
      </>
    )}

    {user.type === "mentor" && (
      <div>
        <Link to="/dashboard" className="admin-nav-link">
          <img src={DashboardIcon} className="admin-nav-icon" />
          Dashboard
        </Link>
        <Link to="/mystats" className="admin-nav-link">
          <img src={ProfileIcon} className="admin-nav-icon" />
          My Stats
        </Link>

        <Link to="/jobsfeed" className="admin-nav-link">
          <img src={JobIcon} className="admin-nav-icon" />
          Job Feed
        </Link>
      </>
    )}
  </div>
  <div className="admin-nav-logout">
    <Link to="/logout" className="admin-nav-link">
      <img src={LogoutIcon} className="admin-nav-icon" />
      Logout
    </Link> */}
      </div>
    </nav>
  );
};

export default AdminNav;
