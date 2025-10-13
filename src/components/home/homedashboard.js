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
import { FaArrowRight, FaShoppingCart, FaTools } from "react-icons/fa";
import "./hero-section.css"


const HomeDashBoard = () => {


   const trackEvent = (label) => {
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Button',
        event_label: label,
        value: 1,
      });
    }
  };


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

        <div className="chs-hero__actions">
              <NavLink 
                to='/bookingpage' 
                className="chs-hero__btn chs-hero__btn--primary"
                onClick={() => trackEvent('Repair A Device - Hero')}
              >
                <span className="chs-hero__btn-content">
                  <FaTools className="chs-hero__btn-icon" />
                  Repair A Device
                  <FaArrowRight className="chs-hero__btn-arrow" />
                </span>
              </NavLink>
              
              <NavLink 
                to='/buy-products' 
                className="chs-hero__btn chs-hero__btn--secondary"
                onClick={() => trackEvent('Buy A Device - Hero')}
              >
                <span className="chs-hero__btn-content">
                  <FaShoppingCart className="chs-hero__btn-icon" />
                  Buy A Device
                  <FaArrowRight className="chs-hero__btn-arrow" />
                </span>
              </NavLink>
            </div>



      </div>





    </>
  )
}
export default HomeDashBoard