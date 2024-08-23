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
  const [jobs, setJobs] = useState([]);

  const fetchMentor = async () => {
    let payload = {
      mentorId: id,
      companyId: user.id,
      applicationType: "DIRECT",
      status: "OPEN",
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
    fetchMentor();
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
        fetchMentor();
      } else {
        const errorData = await res.json();
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  // const tabs = [
  //   {
  //     tab: "All",
  //     content: jobs,
  //   },
  //   {
  //     tab: "Done",
  //     content: doneJobs,
  //   },
  //   {
  //     tab: "Rejected",
  //     content: rejectedJobs,
  //   },
  //   {
  //     tab: "In Progress",
  //     content: inProgressJobs,
  //   },
  // ];
  return (
    <>
      <Section>
        <MentorInfo mentorData={mentorData} />
        <div>
          <div>
            {/* <AssignedJobs tabs={tabs} />
            <MentorJobs /> */}

            <MentorJobs
              title="Pending Offers"
              jobs={jobs}
              cancelJob={handleCancelJob}
            />
          </div>
        </div>
      </Section>
    </>
  );
};
export default MentorProfile;
