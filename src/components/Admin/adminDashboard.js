import { NavLink, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './adminDashboard.css';
import "./adminDashboard.scss";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import React, { useEffect, useState } from 'react';
import { FaHome } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import { IoIosPeople } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { GoListOrdered } from "react-icons/go";




const AdminDashboard = (() => {


  const [isMobile, setIsMobile] = useState(window.innerWidth < 760);

  useEffect(() => {
  const handleResize = () => {
  setIsMobile(window.innerWidth < 760);
  };
  
  window.addEventListener('resize', handleResize);
  handleResize(); // Call handler right away so state gets updated with initial window size
  
  return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleClick = (e) => {
  const siblings = Array.from(e.target.parentNode.children).filter(
  (child) => child !== e.target
  );
  
  siblings.forEach((sibling) => {
  sibling.style.display = 'inline-block';
  setTimeout(() => {
  sibling.style.transform = 'translateY(0)';
  }, 0);
  });
  
  document.querySelectorAll('tr td:first-child').forEach((cell) => {
  if (cell !== e.target) {
  const otherSiblings = Array.from(cell.parentNode.children).filter(
  (child) => child !== cell
  );
  otherSiblings.forEach((sibling) => {
  sibling.style.display = 'none';
  sibling.style.transform = 'translateY(-9999px)';
  });
  }
  });
  };
  
  useEffect(() => {
  if (isMobile) {
  document.querySelectorAll('tr td:first-child').forEach((cell) => {
  cell.addEventListener('click', handleClick);
  });
  } else {
  document.querySelectorAll('tr td:first-child').forEach((cell) => {
  cell.removeEventListener('click', handleClick);
  const siblings = Array.from(cell.parentNode.children).filter(
  (child) => child !== cell
  );
  siblings.forEach((sibling) => {
  sibling.style.display = '';
  sibling.style.transform = '';
  });
  });
  }
  }, [isMobile]);
  
const navigate = useNavigate();

const navigateUserTable = ()=>{

  navigate("/user-table")
}

const navigateAminMainDashoard = ()=>{

  navigate("/admin-dashboard-card")
}

const navigateCreateUser = ()=>{

  navigate("/create-user")
}


  return (

    <>

      <Header />




      <SideNav
        onSelect={(selected) => {
          // Add your code here
        }}
        className="nowsidecontainer"
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home"  >
          <NavItem eventKey="home">
            <NavIcon >
              <FaHome onClick={navigateAminMainDashoard} className="side-main-icon"/> 
            </NavIcon>
            <NavText>
              <NavLink to="/admin-dashboard-card " className="admindash-nav"><li className="dashbbb">Dashboard</li></NavLink>
            </NavText>
          </NavItem>

<span></span>

          <NavItem eventKey="2">
            <NavIcon>
              <SlPeople className="side-main-icon" /> 
            </NavIcon>
            <NavText>
              Users
            </NavText>
            
            <NavItem eventKey="2-2">
              <NavText className="move-side">
                <li className="shift-nav" onClick={navigateUserTable }>
                  <IoIosPeople className="inicon" size={18}/>     
                  <span className="ml-5"> View users</span>
                  </li>
              </NavText>
            </NavItem>
            <NavItem eventKey="2-3">
              <NavText>
                <li className="shift-nav" onClick={navigateCreateUser }>
                  <IoPersonAddOutline className="inicon" size={16}/>     
                  <span className="ml-5">  Create user</span> </li>
              </NavText>
            </NavItem>
          </NavItem>

          <NavItem eventKey="3">
            <NavIcon>
            <GoListOrdered  className="side-main-icon"/>
              
            </NavIcon>
            <NavText>
              Repair Order
            </NavText>
            
            <NavItem eventKey="3-1">
              <NavText className="move-side">
                <li className="shift-nav" onClick={navigateUserTable }>
                  <IoIosPeople className="inicon" size={18}/>     
                  <span className="ml-5"> View Repair Order</span>
                  </li>
              </NavText>
            </NavItem>
           
          </NavItem>



         

          <NavItem eventKey="9">
            <NavIcon >
              {/* <BiLogOut className="logoutdownicon" size={30} /> */}
            </NavIcon>
            <NavText
            //  onClick={() => setLgShow(true)}
            >
              Log out
            </NavText>


          </NavItem>









        </SideNav.Nav>
      </SideNav>

   


    </>


  )
})

export default AdminDashboard