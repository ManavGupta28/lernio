import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Courses from "../components/Courses";

const Home = () => {
  return (
    <div className="h-heightWithoutNavbar flex flex-col">
      <Hero />
      <Courses />
      <Footer />
    </div>
  );
};

export default Home;
