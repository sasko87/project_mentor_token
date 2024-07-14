import React from "react";
import MentorPreviewImg from "../../assets/mentor-preview/Mentor-preview.png";
import MentorPreviewImgSecond from "../../assets/mentor-preview/Mentor-preview_1.png";
import "./mentorPreview.css";
import Section from "../Section/Section";
const MentorPreview = () => {
  return (
    <Section className="mentorPreview">
      <h3 className="mentor-preview-title">
        Every <span className="highlighted-text">success</span> is rewarded!
      </h3>
      <div className="mentor-preview-images">
        <img
          src={MentorPreviewImg}
          alt="Mentor Preview"
          className="mentor-preview-img"
        />
        <img
          src={MentorPreviewImgSecond}
          alt="Mentor Preview Second"
          className="mentor-preview-second-image"
        />
      </div>
    </Section>
  );
};

export default MentorPreview;
