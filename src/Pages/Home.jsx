import React from "react";
import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import Pricing from "../components/Home/Pricing";
import FeedBack from "../components/Home/FeedBack";
import Footer from "../components/Home/Footer";
import Available from "../components/Home/Available";
import Traders from "../components/Home/Traders";
import BackToTop from "../components/ToTop/BackToTop";
const Home = () => {
  return (
    <main className=" ">
      <div className=" overflow-x-hidden min-h-screen flex flex-col  gap-6  bg-[#B8C3FE]">
        <BackToTop/>
        <Navbar />
        <Hero />
        <Services />
        <Pricing />
        <Traders/>
      </div>
      <FeedBack />
      <Available />
      <Footer />
    </main>
  );
};

export default Home;
