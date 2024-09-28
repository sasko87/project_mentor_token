import React from "react";
import { useState, useEffect } from "react";
import Logo from "../assets/logos/MentorToken.svg";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import ArrowLeft from "../assets/admin-icons/arrow-left.png";
import ArrowRight from "../assets/admin-icons/arrow-right.png";
import DashboardIcon from "../assets/admin-icons/dashboard-icon.png";
import ProfileIcon from "../assets/admin-icons/profile.png";
import JobIcon from "../assets/admin-icons/disc.png";
import LogoutIcon from "../assets/admin-icons/logout.png";
import StatsIcon from "../assets/admin-icons/stats.png";
import "./adminPagesLayout.css";
import { jwtDecode } from "jwt-decode";
import AdminNav from "../components/AdminNav/AdminNav";
import AdminPageHeader from "../components/AdminPageHeader/AdminPageHeader";

const AdminPages = () => {
  const { pathname } = useLocation();
  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  //token
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  //ako nema window.mentorToken.user
  //dekodiraj go i postavi go
  if (!window.mentorToken) {
    const user = token ? jwtDecode(token) : null;
    window.mentorToken = { user };
  }
  //postavi go user spored window objekt
  const user = window.mentorToken.user;

  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
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
        onClick={() => {
          toggleMenuVisibility();
        }}
      />
      <aside className={`admin-menu ${isMenuVisible ? "" : "hidden"}`}>
        <img src={Logo} alt="Mentor Token Logo" className="admin-logo" />
        <AdminNav items={items} />

        <div className="admin-nav-logout">
          <Link
            to="/login"
            className="admin-nav-link"
            onClick={() => handleLogout()}
          >
            <img src={LogoutIcon} className="admin-nav-icon" />
            Logout
          </Link>
        </div>
      </aside>
      <div className="admin-right-side">
        <AdminPageHeader user={user} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPages;
