import React from "react";
import Section from "../../components/Section/Section";
import MyStats from "../MyStats/MyStats";
import MentorInfo from "../../components/MentorInfo/MentorInfo";
import { useLocation } from "react-router-dom";
const MentorProfile = () => {
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <>
      <Section>
        <MentorInfo data={data} />
      </Section>
    </>
  );
};
export default MentorProfile;
