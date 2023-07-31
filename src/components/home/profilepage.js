import { NavLink } from "react-router-dom";
import profileimage from "../images/thisisengineering-raeng-32PpagSzeGs-unsplash.jpg"
import {BsList, BsPersonCircle} from "react-icons/bs"

import brandlogo from "../images/mybrand.JPEG";
import { useRef, useState } from "react";
import Bodythree from "./bodythree";
import Testmony from "./tesmony";
import Footer from "../layouts/Footer";


const ProfilePage=(()=>{

  

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


    return(
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
        <li onClick={() =>scrollBottom(scrollRef)}><a >Services</a></li>
        <li onClick={() =>scrollContact(contactScroll)} ><a >Contact</a></li>
        <li onClick={() =>scrollTes(scrollTesmony)}><a >Feedback</a></li>
        <li><a >Repair Status</a></li>
        <li > <i className="order-list" ><BsPersonCircle/></i>
                    
                      <li className="order-dropdown">
                      <li>Current order</li> <br/>
                      <li>Succesful order closed</li><br/>
                      <li>Unsuccesful order closed</li>
                      <li>Logout</li>
                     </li>
                    
                  
        
        </li>
        
       
        
      </ul>
    </nav>

    <div className="bg-primary rounded ">
      <h1>Good product</h1>
      <h1>Good product</h1>
      <h1>Good product</h1>

      <h1>Good product</h1>
      <h1>Good product</h1>
      <h1>Good product</h1>



    </div>
    <div  ref={scrollRef}>
    <Bodythree/>
    </div>
    <div ref={scrollTesmony}>
      
    <h1 className="testmony-head">Tesmonies</h1>
        <div className="line-testmony"></div>
    <Testmony/>
    </div>
    <div ref={contactScroll}>
    <Footer/>
    </div>  
        </>
    )
})
export default ProfilePage