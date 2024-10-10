import React from "react";
import Partners from "../../components/Partners/Partners";
import HeroLanding from "../../components/HeroLanding/HeroLanding";
import Features from "../../components/Features/Features";
import MentorPreview from "../../components/MentorPeview/MentorPreview";

const Home = () => {
  return (
    <>
      <HeroLanding />
      <Partners />
      <Features />
      <MentorPreview />
    </>
  );
};

export default Home;
