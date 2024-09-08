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
      <h1>Chukkytech</h1>
      <h3>We bring the services to your door step.</h3>
      
      
     </div>
      <div className="secondtext-contain">
        <h2 className="home-text-we-offer">We offer full-service professional repairs & data recovery services for  cell phones, tablets and computers. We are here for all your repair & data recovery needs. Any brand, any problem.</h2>
        
</div>




<div className="btn-begin-container">

        <div>
        <NavLink to='/bookingpage' className="navlink-button" > <button className="btn-begin">
       Repair A Device
      </button></NavLink>
     
        </div>
        
        <div>
        <NavLink to='/bookingpage' className="navlink-button" > <button className="btn-begin">
       Buy A Device
      </button></NavLink>
     
        </div>
      

        </div>
   
        </div>



             

        </>
    )
}
export default BodyOne