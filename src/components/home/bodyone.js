import React from "react"
import "./body.css"
import pic from "./../images/my.jpg"
import {useState} from 'react'; 
import BookList from "./another";
import { Alert, CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../images/Technology-1.jpg"
import image2 from "../images/wat1.jpeg";
import image3 from "../images/monstrance.jpg"
import { NavLink } from "react-router-dom";


const BodyOne = ()=>{

    return (

        <>

      <div className="body-one-textcontiner">
      <div className="firsttext-contain">
      <h1>ChukkySavvy Tech</h1>
      <h3>We bring the services to your door step.</h3>
      <div className="btn-begin-container">
       <NavLink to='/bookingpage' className="navlink-button" > <button className="btn-begin">
       Get Started
      </button></NavLink>
     

        </div>
      

      <p>
        
        </p>  
      </div>
      <div className="secondtext-contain">
        <h2>ddddddddddddddddddddddd</h2>
        <h2>ddddddddddddddddddddddd</h2>
      </div>
   
        </div>



             

        </>
    )
}
export default BodyOne