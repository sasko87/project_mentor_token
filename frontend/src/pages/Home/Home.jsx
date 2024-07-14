import React from "react";
import Header from "../../components/Header/Header";

import Partners from "../../components/Partners/Partners";
import HeroLanding from "../../components/HeroLanding/HeroLanding";
import Features from "../../components/Features/Features";
import MentorPreview from "../../components/MentorPeview/MentorPreview";
import Footer from "../../components/Footer/Footer";

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
