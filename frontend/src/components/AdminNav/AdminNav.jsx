import React from "react";
import "./adminNav.css";
import { Link, useLocation } from "react-router-dom";

const AdminNav = ({ items }) => {
  const location = useLocation();
  return (
    <nav className="admin-nav">
      <div className="admin-nav-links">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.url}
            className={`${
              location.pathname.startsWith(item.url)
                ? "admin-nav-link admin-nav-link-active"
                : "admin-nav-link"
            }`}
          >
            <img src={item.icon} className="admin-nav-icon" />
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNav;
