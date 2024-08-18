import React, { useEffect, useState } from "react";
import Section from "../../components/Section/Section";
import MyStats from "../MyStats/MyStats";
import MentorInfo from "../../components/MentorInfo/MentorInfo";
import { useParams } from "react-router-dom";
import AssignedJobs from "../../components/AssignedJobs/AssignedJobs";
import MentorJobs from "../../components/MentorJobs/MentorJobs";

const MentorProfile = () => {
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  const [mentorData, setMentorData] = useState([]);
  const fetchMentor = async () => {
    try {
      const res = await fetch(`/api/get-account-data-by-id/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setMentorData(data);
        console.log(data);
      }
    } catch (error) {
      console.error("An error occurred during fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMentor();
  }, [id]);

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
        <MentorInfo data={mentorData} />
        <div>
          <div>
            {/* <AssignedJobs tabs={tabs} />
            <MentorJobs /> */}
          </div>
        </div>
      </Section>
    </>
  );
};
export default MentorProfile;
