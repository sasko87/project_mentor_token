import React, { useEffect, useState } from "react";
import StartupHeader from "../../components/StartupHeader/StartupHeader";
import Card from "../../components/Card/Card";
import ArrowUp from "../../assets/admin-icons/arrow-up-side.png";
import "./dashboardStartup.css";

const DashboardStartup = () => {
  const povik = async () => {
    try {
      const res = await fetch("/api/filteredJobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        query: {
          status: "Open",
          companyId: "66ace5bb6a17e10e2e009e46",
          skillsRequired: "HTML",
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        const errorData = await res.json();
      }
    } catch (err) {
      console.error("An error occurred during login:", err);
    }
  };

  useEffect(() => {
    povik();
  }, []);

  return (
    <>
      <StartupHeader placeholder="Search Mentor..." />

      <div className="best-mentors">
        <Card
          title="Aleksandar Stevkovski"
          description="javascript developer"
          icon={ArrowUp}
          cardClass="card-best-mentors"
        />
      </div>
    </>
  );
};

export default DashboardStartup;
