import React, { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import MyStats from "../MyStats/MyStats";
import MentorInfo from "../../components/MentorInfo/MentorInfo";
import { useParams } from "react-router-dom";
import AssignedJobs from "../../components/AssignedJobs/AssignedJobs";
import MentorJobs from "../../components/MentorJobs/MentorJobs";

const MentorProfile = () => {
  const token = window.localStorage.getItem("token");
  const user = window.mentorToken.user;
  const { id } = useParams();
  const [mentorData, setMentorData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [pendingDirectJobOffers, setPendingDirectJobOffers] = useState([]);
  const [doneJobs, setDoneJobs] = useState([]);
  const [canceledJobs, setCanceledJobs] = useState([]);
  const [inProgressJobs, setInProgressJobs] = useState([]);

  const fetchData = async () => {
    let payload = {
      mentorId: id,
      companyId: user.id,
    };
    try {
      const res = await fetch(`/api/get-account-data-by-id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const jobs = await fetch(
        "/api/filtered-jobs?" + new URLSearchParams(payload).toString(),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMentorData(data);
      }
      if (jobs.ok) {
        const data = await jobs.json();
        console.log(data);
        setJobs(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCancelJob = async (job) => {
    try {
      const res = await fetch("/api/cancel-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(job),
      });

      if (res.ok) {
        const data = await res.json();
        job.status = "CANCELED";
        fetchData();
      } else {
        const errorData = await res.json();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  const handleTabs = (index) => {
    setSelectedTab(index);
  };

  useEffect(() => {
    setPendingDirectJobOffers(
      jobs.filter(
        (job) => job.applicationType === "DIRECT" && job.status === "OPEN"
      )
    );

    setDoneJobs(jobs.filter((job) => job.status === "DONE"));
    setCanceledJobs(jobs.filter((job) => job.status === "CANCELED"));
    setInProgressJobs(jobs.filter((job) => job.status === "IN_PROGRESS"));
  }, [jobs]);
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
      tab: "Canceled",
      content: canceledJobs,
    },
    {
      tab: "In Progress",
      content: inProgressJobs,
    },
  ];

  const handleCreateNewJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: jobTitle,
        description: jobDescription,
        mentorId: mentorData._id,
        category: category,
      };
      const res = await fetch("/api/create-direct-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
      });

      if (res.ok) {
        const data = await res.json();
        setJobTitle("");
        setJobDescription("");
        setCategory("");
        handleToggleOfferJobModal();
        setSkillsRequired("");
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };
  return (
    <>
      <Section>
        <MentorInfo mentorData={mentorData} />
        <div>
          <div style={{ display: "flex", gap: 80 }}>
            <AssignedJobs
              tabs={tabs}
              onClickFunction={handleTabs}
              selectedTab={selectedTab}
            />

            <MentorJobs
              title="Pending Offers"
              jobs={pendingDirectJobOffers}
              cancelJob={handleCancelJob}
            />
          </div>
        </div>
      </Section>
    </>
  );
};
export default MentorProfile;
