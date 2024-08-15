import React, { useEffect, useState } from "react";
import "./jobfeed.css";
import Section from "../../components/Section/Section";

const JobFeed = () => {
  const [allJobs, setAllJobs] = useState([]);
  const token = window.localStorage.getItem("token");
  const fetchData = async () => {
    try {
      const allJobs = await fetch("/api/alljobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (allJobs.ok) {
        const data = await allJobs.json();
        setAllJobs(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Section>
        <div>
          {allJobs.map((job) => (
            <div key={job._id}>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};

export default JobFeed;
