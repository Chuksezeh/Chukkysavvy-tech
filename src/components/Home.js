import React, { useEffect, useRef } from "react";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Testmony from "./home/tesmony";
import HomeDashBoard from "./home/homedashboard";
import TopTextComponent from "./home/top-text-component";
import ServicesComponent from "./home/services-component";

const Home = () => {
  const feedbackRef = useRef(null);

  const scrolltop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrolltop();
  }, []);

  return (
    <>
      <Header onFeedbackClick={() => feedbackRef.current?.scrollIntoView({ behavior: 'smooth' })} />

      <div className="first-body-corel">
        <HomeDashBoard />
      </div>

      <TopTextComponent />

      <ServicesComponent />

     
      <Testmony ref={feedbackRef} />

      <Footer />
    </>
  );
};

export default Home;
