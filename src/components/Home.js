import React, { useRef } from "react"
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import BodyOne from "./home/bodyone";
import Bodytwo from "./home/bodytwo";
import Bodythree from "./home/bodythree";
import ContactForm from "./home/contactform";
import Newsletter from "./home/newsletter";
import Testmony from "./home/tesmony";
import { BsList, BsPersonCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import brandlogo from "./images/mybrand.JPEG"



const Home = ()=>{

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

<nav className="nav-container-c">
      <input type="checkbox" id="check"/>
      <label for="check" className="checkbtn">
      <i className="checkbtn"><BsList size={35} /></i>
      </label>
      <label className="logo"><img className="logo-img" src={brandlogo}/></label>
      <ul className="navlist-li">
      <NavLink to="/" className="navlink-style" > <li><a className="active">Home</a></li></NavLink>
        <li><a >About</a></li>
        <li onClick={() =>scrollBottom(scrollRef)} ><a >Services</a></li>
        <li  onClick={() =>scrollContact(contactScroll)}><a >Contact</a></li>
        <li onClick={() =>scrollTes(scrollTesmony)} ><a >Feedback</a></li>
        <NavLink to="/signinpage" className="navlink-style" ><i><BsPersonCircle/></i></NavLink>
        
      
        
      </ul>
    </nav>
           
    <div className="first-body-corel">
    
      <BodyOne /> 
   
    </div> 
    <Bodytwo/>
    {/* <div className="our-solution-text">
      <h2>
        OUR SOLUTIONS
      </h2>
      <div className="oursolutions-line"></div>
      </div> */}
      <div ref={scrollRef} >   
     <Bodythree/>
     </div> 
        <h1 className="testmony-head">Tesmonies</h1>
        <div className="line-testmony"></div>
     <div ref={scrollTesmony}>
      <Testmony/>
     </div>
     
            <div ref={contactScroll}>
            <Footer />
            </div>


        </>

    )

};

export default Home;