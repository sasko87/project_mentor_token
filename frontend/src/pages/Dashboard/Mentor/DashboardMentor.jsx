import React from "react";
import { useState, useEffect } from "react";
import AssignedJobs from "../../../components/AssignedJobs/AssignedJobs";
import MentorJobs from "../../../components/MentorJobs/MentorJobs";

const DashboardMentor = () => {
  const token = window.localStorage.getItem("token");
  const user = window.mentorToken.user;

  const [jobs, setJobs] = useState([]);

  const [selectedTab, setSelectedTab] = useState(0);

  const fetchData = async () => {
    try {
      let payload = {
        mentorId: user.id,
      };
      const allJobs = await fetch(
        "/api/filtered-jobs?" + new URLSearchParams(payload).toString(),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (allJobs.ok) {
        const data = await allJobs.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const doneJobs = jobs.filter((job) => job.status === "DONE");
  const inProgressJobs = jobs.filter((job) => job.status === "IN_PROGRES");
  const rejectedJobs = jobs.filter((job) => job.status === "REJECTED");

  const tabs = [
    {
      tab: "All",
      content: jobs,
    },
    {
      tab: "Done",
      content: doneJobs,
    },
    {
      tab: "Rejected",
      content: rejectedJobs,
    },
    {
      tab: "In Progress",
      content: inProgressJobs,
    },
  ];

  const handleTabs = (index) => {
    setSelectedTab(index);
  };

  const mentorPendingJobs = [
    {
      title: "Revenue per rate",
    },
    {
      title: "ARPU (Average revenue per use)",
    },
    {
      title: "CAC (Custom Aqusition Cost)",
    },
  ];

  return (
    <>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "30px",
          padding: "20px 0",
        }}
      >
        <AssignedJobs
          tabs={tabs}
          onClickFunction={handleTabs}
          selectedTab={selectedTab}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <MentorJobs
            jobs={mentorPendingJobs}
            title="Pending Jobs"
            description="Jobs offered from your startup"
            firstButtonLabel="Accept"
            secondButtonLabel="Reject"
          />
          <MentorJobs
            jobs={mentorPendingJobs}
            title="Applications sent "
            description="Jobs you have applied to"
            icon="true"
          />
        </div>
      </section>
    </>
  );
};

export default DashboardMentor;
