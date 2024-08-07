import React from "react";
import { useState } from "react";
import Logo from "../assets/logos/MentorToken.svg";
import { Link, Outlet } from "react-router-dom";
import ArrowLeft from "../assets/admin-icons/arrow-left.png";
import ArrowRight from "../assets/admin-icons/arrow-right.png";

import DashboardIcon from "../assets/admin-icons/dashboard-icon.png";
import ProfileIcon from "../assets/admin-icons/profile.png";
import JobIcon from "../assets/admin-icons/disc.png";
import LogoutIcon from "../assets/admin-icons/logout.png";
import StatsIcon from "../assets/admin-icons/stats.png";
import "./adminPagesLayout.css";
import StartupHeader from "../components/StartupHeader/StartupHeader";
import { jwtDecode } from "jwt-decode";
import AdminNav from "../components/AdminNav/AdminNav";

const AdminPages = () => {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  console.log("user");
  console.log(user);

  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const itemsStartup = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: DashboardIcon,
    },
    {
      name: "Mentors",
      url: "/mentors",
      icon: ProfileIcon,
    },
    {
      name: "Jobs",
      url: "/jobs",
      icon: JobIcon,
    },
  ];

  const itemsMentor = [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: DashboardIcon,
    },
    {
      name: "My Stats",
      url: "/mystats",
      icon: StatsIcon,
    },
    {
      name: "Job Feed",
      url: "/jobfeed",
      icon: JobIcon,
    },
  ];

  const items = user.type === "mentor" ? itemsMentor : itemsStartup;

  return (
    <div className="admin-page">
      <img
        src={isMenuVisible ? ArrowLeft : ArrowRight}
        className={`admin-menu-arrow-left ${
          isMenuVisible ? "" : "menu-hidden"
        }`}
        onClick={toggleMenuVisibility}
      />
      <aside className={`admin-menu ${isMenuVisible ? "" : "hidden"}`}>
        <img src={Logo} alt="Mentor Token Logo" className="admin-logo" />
        <AdminNav items={items} />

        <div className="admin-nav-logout">
          <Link to="/logout" className="admin-nav-link">
            <img src={LogoutIcon} className="admin-nav-icon" />
            Logout
          </Link>
        </div>
      </aside>
      <div className="admin-right-side">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPages;
