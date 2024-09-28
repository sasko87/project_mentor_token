import React from "react";
import { useState, useEffect } from "react";
import AssignedJobs from "../../../components/AssignedJobs/AssignedJobs";
import MentorJobs from "../../../components/MentorJobs/MentorJobs";
import Section from "../../../components/Section/Section";

const DashboardMentor = () => {
  const token = window.localStorage.getItem("token");
  const user = window.mentorToken.user;

  const [jobs, setJobs] = useState([]);
  const [mentorPendingDirectApplications, setMentorPendingDirectApplications] =
    useState([]);
  const [sentApplicationsByMentor, setSentApplicationsByMentor] = useState();
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
      const pendingJobs = await fetch("/api/get-mentor-direct-applications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const sentApplications = await fetch(
        "/api/get-applications-sent-by-mentor",
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

      if (pendingJobs.ok) {
        const data = await pendingJobs.json();
        setMentorPendingDirectApplications(data);
      }

      if (sentApplications.ok) {
        const data = await sentApplications.json();
        setSentApplicationsByMentor(data);
        console.log(data);
      }
    } catch (error) {
      console.log("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAcceptDirectApplication = async (application) => {
    try {
      const res = await fetch("/api/accept-direct-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(application),
      });

      if (res.ok) {
        const data = await res.json();
        fetchData();
      } else {
        const errorData = await res.json();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const handleRejectDirectApplication = async (application) => {
    try {
      const res = await fetch("/api/reject-direct-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(application),
      });

      if (res.ok) {
        const data = await res.json();
        application.status = "REJECTED";
        application.jobId.status = "REJECTED";
        fetchData();
      } else {
        const errorData = await res.json();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  // const mentorSentApplications = sentApplications.filter(
  //   (application) => application.status === "PENDING"
  // );

  const doneJobs = jobs.filter((job) => job.status === "DONE");
  const inProgressJobs = jobs.filter((job) => job.status === "IN_PROGRESS");
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

  return (
    <>
      <Section className="flex">
        <AssignedJobs
          tabs={tabs}
          onClickFunction={handleTabs}
          selectedTab={selectedTab}
        />
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <MentorJobs
            jobs={mentorPendingDirectApplications}
            title="Pending Jobs"
            description="Jobs offered from your startup"
            firstButtonLabel="Accept"
            secondButtonLabel="Reject"
            firstButtonClickFunction={handleAcceptDirectApplication}
            secondButtonClickFunction={handleRejectDirectApplication}
          />
          <MentorJobs
            jobs={sentApplicationsByMentor}
            title="Applications sent "
            description="Jobs you have applied to"
            icon="true"
          />
        </div>
      </Section>
    </>
  );
};

export default DashboardMentor;
