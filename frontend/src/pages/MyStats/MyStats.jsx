import React, { useState, useEffect } from "react";
import MentorInfo from "../../components/MentorInfo/MentorInfo";

const MyStats = () => {
  //   const token = window.localStorage.getItem("token");
  //   const [mentorInfo, setMentorInfo] = useState([]);

  //   const fetchMentorInfo = async () => {
  //     try {
  //       const infoMentor = await fetch("/api/getaccount", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (infoMentor.ok) {
  //         const data = await infoMentor.json();
  //         console.log(data);
  //         setMentorInfo(data);
  //       }
  //     } catch (error) {
  //       console.log("An error occurred during fetching data:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchMentorInfo();
  //   }, []);

  return (
    <>
      <MentorInfo />
    </>
  );
};

export default MyStats;
