import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsList } from "react-icons/bs";
import brandlogo from "../images/CHUKKY-BRAND-BACKGROUND.png";
import "./layout.css"

const Header = ({ onFeedbackClick }) => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");
  const userData = JSON.parse(userInfo);

  const navigateHome = () => navigate("/");
  const navigateUserLogin = () => navigate("/user-login");
  const navigateProfilePage = () => navigate("/user-profile");
  const navigateTracking = () => navigate("/track-repair");
  const navigateFindLocation = () => navigate("/find-location");
  const navigateContactus = () => navigate("/about-us");
  const handleBuyDevice = () => navigate("/buy-products");
  const handleRepairDevice = () => navigate("/bookingpage");
  const handleChukkytechAi = () => navigate("/chukkytechai");

  // Close mobile menu
  const closeMobileMenu = () => {
    const navCheck = document.getElementById("ct-nav-toggle");
    if (navCheck && navCheck.checked) {
      navCheck.checked = false;
    }
  };

  const handleNavigate = (callback) => {
    closeMobileMenu();
    callback();
  };

  return (
    <>
      <header className="ct-nav-wrapper">
        <input type="checkbox" id="ct-nav-toggle" className="ct-nav-toggle" />

        {/* Mobile Hamburger */}
        <div className="ct-nav-hamburger">
          <label htmlFor="ct-nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        {/* Logo */}
        <div className="ct-nav-logo" onClick={navigateHome}>
          <img src={brandlogo} alt="Chukkytech Logo" />
          <span>Chukkytech</span>
        </div>

        {/* Navigation Links */}
        <nav className="ct-nav-links">
          <button onClick={() => handleNavigate(navigateHome)}>Home</button>
          <button onClick={() => handleNavigate(handleRepairDevice)}>Repair Device</button>
          <button onClick={() => handleNavigate(handleBuyDevice)}>Buy Device</button>
          <button onClick={() => handleNavigate(navigateTracking)}>Track Repair</button>
          <button onClick={() => handleNavigate(navigateFindLocation)}>Find Location</button>
          <button onClick={() => handleNavigate(navigateContactus)}>Contact Us</button>
          <button onClick={() => handleNavigate(handleChukkytechAi)}>Assistant</button>

          {userData ? (
            <button
              className="ct-nav-account-btn"
              onClick={() => handleNavigate(navigateProfilePage)}
            >
              My Account
            </button>
          ) : (
            <button
              className="ct-nav-account-btn"
              onClick={() => handleNavigate(navigateUserLogin)}
            >
              Login
            </button>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
