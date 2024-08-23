import React from "react";
import DashboardStartup from "./Startup/DashboardStartup";
import DashboardMentor from "./Mentor/DashboardMentor";

const Dashboard = () => {
  const user = window.mentorToken.user;

  if (user.type === "startup") return <DashboardStartup />;
  if (user.type === "mentor") return <DashboardMentor />;
};

export default Dashboard;
