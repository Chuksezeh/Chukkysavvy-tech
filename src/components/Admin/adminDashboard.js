import { NavLink, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import SideNav, { Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './adminDashboard.css';
import "./adminDashboard.scss";
import React, { useEffect, useState } from 'react';
import { FaHome, FaBars } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import { IoIosPeople } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { GoListOrdered } from "react-icons/go";
import { MdOutlineLogout } from "react-icons/md";
import { FaComment, FaLocationDot, FaMagnifyingGlassLocation } from "react-icons/fa6";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 760);
    const [sidebarVisible, setSidebarVisible] = useState(!isMobile);

    const handleResize = () => {
        const isNowMobile = window.innerWidth < 760;
        setIsMobile(isNowMobile);
        setSidebarVisible(!isNowMobile); // Hide sidebar by default on mobile
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const userInfo = localStorage.getItem("adminsInfo");
    const userData = JSON.parse(userInfo);

    useEffect(() => {
        if (!userData) {
            navigate("/");
        }
    }, [userData]);

    const handleLogOut = () => {
        localStorage.removeItem("userInfo");
        setTimeout(() => navigate("/admin-login"), 500);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

   



    return (
        <>
        <Header/>
            {/* Hamburger icon on mobile */}
            {isMobile && (
                <div className="hamburger-icon" onClick={toggleSidebar} style={{ padding: "10px", cursor: "pointer", background: "#eee" }}>
                    <FaBars size={24} />
                </div>
            )}

            {/* Sidebar */}
            {sidebarVisible && (
                <SideNav className="nowsidecontainer">
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <FaHome onClick={() => navigate("/admin-dashboard-card")} className="side-main-icon" />
                            </NavIcon>
                            <NavText>
                                <NavLink to="/admin-dashboard-card" className="admindash-nav"><li className="dashbbb">Dashboard</li></NavLink>
                            </NavText>
                        </NavItem>

                        <NavItem eventKey="2">
                            <NavIcon><SlPeople className="side-main-icon" /></NavIcon>
                            <NavText>Users</NavText>
                            <NavItem eventKey="2-2">
                                <NavText className="move-side">
                                    <li className="shift-nav" onClick={() => navigate("/user-table")}>
                                        <IoIosPeople className="inicon" size={18} />
                                        <span className="ml-5">View users</span>
                                    </li>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="2-3">
                                <NavText className="move-side">
                                    <li className="shift-nav" onClick={() => navigate("/admin-user")}>
                                        <IoIosPeople className="inicon" size={18} />
                                        <span className="ml-5">View admin users</span>
                                    </li>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="2-4">
                                <NavText>
                                    <li className="shift-nav" onClick={() => navigate("/create-user")}>
                                        <IoPersonAddOutline className="inicon" size={16} />
                                        <span className="ml-5">Create user</span>
                                    </li>
                                </NavText>
                            </NavItem>
                        </NavItem>

                        <NavItem eventKey="3">
                            <NavIcon><GoListOrdered className="side-main-icon" /></NavIcon>
                            <NavText>Orders</NavText>
                            <NavItem eventKey="3-1">
                                <NavText className="move-side">
                                    <li className="shift-nav" onClick={() => navigate("/user-repair-orders")}>
                                        <IoIosPeople className="inicon" size={18} />
                                        <span className="ml-5">Repair Order</span>
                                    </li>
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="3-2">
                                <NavText>
                                    <li className="shift-nav" onClick={() => navigate("/product-orders")}>
                                        <IoPersonAddOutline className="inicon" size={16} />
                                        <span className="ml-5">Product Order</span>
                                    </li>
                                </NavText>
                            </NavItem>
                        </NavItem>

                        <NavItem eventKey="4">
                            <NavIcon> <FaLocationDot className="side-main-icon"/>  </NavIcon>
                            <NavText>Locations</NavText>
                            <NavItem eventKey="4-1">
                                <NavText className="move-side">
                                    <li className="shift-nav" onClick={() => navigate("/admin-service-locations")}>
                                        <FaMagnifyingGlassLocation className="inicon" size={18} />
                                        <span className="ml-5">Location</span>
                                    </li>
                                </NavText>
                            </NavItem>
                           
                        </NavItem>
                        <NavItem eventKey="5">
                            <NavIcon> <FaComment className="side-main-icon"/>  </NavIcon>
                            <NavText onClick={() => navigate("/manage-comments")}>Manage comments</NavText>
                            {/* <NavItem eventKey="4-1">
                                <NavText className="move-side">
                                    <li className="shift-nav" onClick={() => navigate("/admin-service-locations")}>
                                        <FaMagnifyingGlassLocation className="inicon" size={18} />
                                        <span className="ml-5">Location</span>
                                    </li>
                                </NavText>
                            </NavItem> */}
                           
                        </NavItem>


                        <NavItem eventKey="9">
                        <NavIcon> <MdOutlineLogout className="side-main-icon"/>  </NavIcon>
                            <NavText onClick={handleLogOut}>Log out</NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            )}
        </>
    );
};

export default AdminDashboard;
