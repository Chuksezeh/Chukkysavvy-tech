import React, { useRef } from "react";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Testmony from "./home/tesmony";
import HomeDashBoard from "./home/homedashboard";
import TopTextComponent from "./home/top-text-component";
import ServicesComponent from "./home/services-component";



const Home = () => {

  const scrollRef = useRef();
  const scrollTesmony = useRef();
  const contactScroll = useRef();

  const scrollBottom = (e) => {
    e.current.scrollIntoView({
      behavior: "smooth"
    });
  };
  const scrollTes = (e) => {
    e.current.scrollIntoView({
      behavior: "smooth"
    });
  };
  const scrollContact = (e) => {
    e.current.scrollIntoView({
      behavior: "smooth"
    });
  };


  return (
    <>


      <Header />

      <div className="first-body-corel">

        <HomeDashBoard />

      </div>
      <TopTextComponent />

      <div ref={scrollRef} >
        <ServicesComponent />
      </div>
      <h1 className="testmony-head">Tesmonies</h1>
      <div className="line-testmony"></div>
      <div ref={scrollTesmony}>
        <Testmony />
      </div>

      <div ref={contactScroll}>
        <Footer />
      </div>


    </>

  )

};

export default Home;