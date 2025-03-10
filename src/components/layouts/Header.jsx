import React, { useRef, useState } from "react";
import logo from "./../images/my.jpg";

import {PiListPlusThin} from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { BsFillPersonFill, BsList, BsPersonCircle } from "react-icons/bs";
import brandlogo from "../images/CHUKKY-BRAND-BACKGROUND.png";
import { MdOutlineShoppingCart } from "react-icons/md";

const Header = ()=>{

  const scrollRef = useRef(); 
  const scrollTesmony = useRef();
  const contactScroll = useRef();

  const navigate = useNavigate();

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

  const [showBasic, setShowBasic] = useState(false);


  const navigateHome = (()=>{
    navigate('/') 
  })

  const navigateAdmin = (()=>{
    navigate("/admin-login")
  })
  const navigateUserLogin = (()=>{
    navigate("/user-login")
  })
  const navigateSignUp = (()=>{
    navigate("/user-signUp")
  })

  const navigateTracking = (()=>{
    navigate("/track-repair")
  });

  const navigateShoppingCart = (()=>{
    navigate("/product-cart")
  })

  const navigateProfilePage = (()=>{

    navigate("/user-profile")
  })


  
  const userInfo = localStorage.getItem('userInfo');
  const userData = JSON.parse(userInfo);







    return (
        <>
      {/* <nav className="nav-container-c">
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
    */}


<div className="nav-main-NAv">
  <input type="checkbox" id="nav-check"/>
  <div className="nav-header">
  </div>
  <div className="nav-btn" >
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div className="logoDiv" onClick={navigateHome}>       
    
    <a> <img src={brandlogo} className="logo-SElf"/> Chukkytech</a>
  </div>
  
  <div className="nav-links">
    <a  onClick={navigateHome} >Home</a>
    <a onClick={navigateTracking}>Track  repair</a>
    {
      userData ? <a  onClick={navigateProfilePage}>My Account</a> : <a  onClick={navigateUserLogin}>Login</a>
    }
    
    <a onClick={ navigateAdmin}>Admin</a>
    {/* <span className="badgeMain" onClick={navigateShoppingCart}><span>  <MdOutlineShoppingCart  /></span>  My Cart <span className="badge0">2</span></span> */}
  </div>
 </div>




        </>
    )
}
export default Header;