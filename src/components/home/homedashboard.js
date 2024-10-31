import React from "react"
import "./body.css"
import pic from "./../images/my.jpg"
import { useState } from 'react';
import BookList from "./another";
import { Alert, CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../images/Technology-1.jpg"
import image2 from "../images/wat1.jpeg";
import image3 from "../images/monstrance.jpg"
import { NavLink } from "react-router-dom";


const HomeDashBoard = () => {

  return (

    <>

      <div className="body-one-textcontiner">
        <div className="firsttext-contain">
          <h3>Old Device, Broken Device, Neeed a Device?</h3>
          <h2>We Fix, Sell and Deliver</h2>


        </div>
        <div className="secondtext-contain">
          <div className="home-text-we-offer">We offer full-service professional
            repairs & data recovery services for  cell phones,
            tablets and computers. We are here for all your repair &
            data recovery needs. Any brand, any problem.</div>

        </div>
        <div className="btn-begin-container">
        
       
          <div>
            <NavLink to='/bookingpage' className="navlink-button" > <button className="button-50" role="button">
              Repair A Device
            </button></NavLink>

          </div>

          <div>
            <NavLink to='/bookingpage' className="navlink-button" > <button className="button-50" role="button">
              Buy A Device
            </button></NavLink>

          </div>


        </div>

      </div>





    </>
  )
}
export default HomeDashBoard