import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import BestMentors from "../../components/BestMentors/BestMentors";
import AssignedJobs from "../../components/AssignedJobs/AssignedJobs";
import ArrowUp from "../../assets/admin-icons/arrow-up-side.png";
import ProfileImg from "../../assets/Ellipse 3.png";
import MentorJobs from "../../components/MentorJobs/MentorJobs";
import DashboardStartup from "./Startup/DashboardStartup";
import DashboardMentor from "./Mentor/DashboardMentor";

const Dashboard = () => {
  const user = window.mentorToken.user;

  if (user.type === "startup") return <DashboardStartup />;
  if (user.type === "mentor") return <DashboardMentor />;
};

export default Dashboard;
