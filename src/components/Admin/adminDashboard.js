import { NavLink, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import SideNav, { Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './adminDashboard.css';
import "./adminDashboard.scss";
import React, { useEffect, useState } from 'react';
import { FaHome, FaBars, FaProductHunt } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";
import { IoIosPeople } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { GoListOrdered } from "react-icons/go";
import { MdOutlineCreateNewFolder, MdOutlineKeyboardArrowRight, MdOutlineLogout, MdPlaylistAdd, MdProductionQuantityLimits } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaComment, FaLocationDot, FaMagnifyingGlassLocation } from "react-icons/fa6";
import { CiCircleList } from "react-icons/ci";
import { TbCategoryFilled, TbCategoryPlus } from "react-icons/tb";
import { PiOfficeChairFill } from "react-icons/pi";
import useGetData from "../Utility/getFunction";
import { HiDocumentReport } from "react-icons/hi";
import { LuListChecks } from "react-icons/lu";




const AdminDashboard = () => {
    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 760);
    const [sidebarVisible, setSidebarVisible] = useState(!isMobile);

    const [showLogout, setShowLogout] = useState(false);

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

    // useEffect(() => {
    //     if (!userData) {
    //         navigate("/");
    //     }
    // }, [userData]);

    const handleLogOut = () => {
        localStorage.removeItem("adminsInfo");
        setTimeout(() => navigate("/admin-login"), 500);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };



    useEffect(() => {
        const adminsInfo = localStorage.getItem('adminsInfo');
        // console.log('UserInfo:', userInfo);

        if (!adminsInfo) {
            navigate('/admin-login');
        }
    }, [navigate]);


    const { data, isPending, error } = useGetData("auth/getAllAdminUsers");






    return (
        <>
            {/* <Header/> */}
            {/* Hamburger icon on mobile */}
            {isMobile && (
                <div className="hamburger-icon" onClick={toggleSidebar} style={{ padding: "10px", cursor: "pointer", background: "#eee" }}>
                    <FaBars size={24} />
                </div>
            )}




            {/* Sidebar */}
            {sidebarVisible && (




                userData?.role === "super-admin" ?

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
                                <NavText>Users  <MdOutlineKeyboardArrowRight size={20} />  </NavText>
                                <NavItem eventKey="2-2">
                                    <NavText className="move-side">
                                        <li className="shift-nav p-1" onClick={() => navigate("/user-table")}>
                                            <IoIosPeople className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }}>View users</span>
                                        </li>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="2-3">
                                    <NavText className="move-side">
                                        <li className="shift-nav p-1" onClick={() => navigate("/admin-user")}>
                                            <IoIosPeople className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }}>View admin users</span>
                                        </li>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="2-4">
                                    <NavText>
                                        <li className="shift-nav p-1" onClick={() => navigate("/create-user")}>
                                            <IoPersonAddOutline className="inicon" size={16} />
                                            <span className="p-2 " style={{ fontSize: "16px" }}>Create user</span>
                                        </li>
                                    </NavText>
                                </NavItem>
                            </NavItem>

                            <NavItem eventKey="3">
                                <NavIcon><GoListOrdered className="side-main-icon" /></NavIcon>
                                <NavText>Orders <MdOutlineKeyboardArrowRight size={20} /> </NavText>
                                <NavItem eventKey="3-1">
                                    <NavText className="move-side">
                                        <li className="shift-nav p-1" onClick={() => navigate("/user-repair-orders")}>
                                            <IoIosPeople className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }} >Repair Order</span>
                                        </li>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="3-2">
                                    <NavText className="move-side">
                                        <li className="shift-nav p-1" onClick={() => navigate("/product-orders")}>
                                            <MdProductionQuantityLimits className="inicon" size={16} />
                                            <span className="p-2" style={{ fontSize: "16px" }} >Product Order</span>
                                        </li>
                                    </NavText>
                                </NavItem>
                            </NavItem>


                            <NavItem eventKey="6">
                                <NavIcon> <FaProductHunt className="side-main-icon" />  </NavIcon>
                                <NavText>Products   <MdOutlineKeyboardArrowRight size={20} /></NavText>
                                <NavItem eventKey="6-1">
                                    <NavText className="move-side">
                                        <li className="shift-nav p-1" onClick={() => navigate("/create-products")}>
                                            <MdOutlineCreateNewFolder className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }}>Create Product</span>
                                        </li>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="6-1">
                                    <NavText className="move-side">
                                        <li className="shift-nav  p-1" onClick={() => navigate("/view-created-products")}>
                                            <CiCircleList className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }}>View Products</span>
                                        </li>
                                    </NavText>
                                </NavItem>

                            </NavItem>

                            <NavItem eventKey="7">
                                <NavIcon>  <TbCategoryFilled className="side-main-icon" /> </NavIcon>
                                <NavText>Categories   <MdOutlineKeyboardArrowRight size={20} /></NavText>
                                <NavItem eventKey="7-1">
                                    <NavText className="move-side">
                                        <li className="shift-nav p-1" onClick={() => navigate("/view-categories")}>
                                            <TbCategoryPlus className="inicon" size={18} />

                                            <span className="p-2" style={{ fontSize: "16px" }}>View Categories</span>
                                        </li>
                                    </NavText>
                                </NavItem>

                            </NavItem>



                            <NavItem eventKey="4">
                                <NavIcon> <FaLocationDot className="side-main-icon" />  </NavIcon>
                                <NavText>Locations   <MdOutlineKeyboardArrowRight size={20} /></NavText>
                                <NavItem eventKey="4-1">
                                    <NavText className="move-side">
                                        <li className="shift-nav" onClick={() => navigate("/admin-service-locations")}>
                                            <FaMagnifyingGlassLocation className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }}>Location</span>
                                        </li>
                                    </NavText>
                                </NavItem>

                            </NavItem>

                            <NavItem eventKey="8">
                                <NavIcon> <PiOfficeChairFill className="side-main-icon" />  </NavIcon>
                                <NavText>Company   <MdOutlineKeyboardArrowRight size={20} /></NavText>
                                <NavItem eventKey="8-1">
                                    <NavText className="move-side">
                                        <li className="shift-nav" onClick={() => navigate("/view-companies")}>
                                            <CiCircleList className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }}>List Companies</span>
                                        </li>
                                    </NavText>
                                </NavItem>

                            </NavItem>

                            <NavItem eventKey="10">
                                <NavIcon> <PiOfficeChairFill className="side-main-icon" />  </NavIcon>
                                <NavText>Settings   <MdOutlineKeyboardArrowRight size={20} /></NavText>
                                <NavItem eventKey="10-1">
                                    <NavText className="move-side">
                                        <li className="shift-nav" onClick={() => navigate("/admin-general-update")}>
                                            <CiCircleList className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }}>General Update</span>
                                        </li>
                                    </NavText>
                                </NavItem>

                            </NavItem>



                            <NavItem eventKey="5">
                                <NavIcon> <FaComment className="side-main-icon" />  </NavIcon>
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

                            <NavItem eventKey="11">
                                <NavIcon> <HiDocumentReport className="side-main-icon" />  </NavIcon>
                                <NavText>Reports </NavText>
                                <NavItem eventKey="11-1">
                                    <NavText className="move-side">
                                        <li className="shift-nav p-1" onClick={() => navigate("/repair-order-report")}>
                                            <LuListChecks className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }}>Repair Order Report</span>
                                        </li>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="11-2">
                                    <NavText className="move-side">
                                        <li className="shift-nav  p-1" onClick={() => navigate("/product-purchase-report")}>
                                            <CiCircleList className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }}>Product Purchase Report</span>
                                        </li>
                                    </NavText>
                                </NavItem>

                            </NavItem>

                          
                        <NavItem eventKey="9">
                                <NavIcon> <MdOutlineLogout className="side-main-icon" />  </NavIcon>
                                <NavText onClick={() => setShowLogout(true)}>Log out</NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    :
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

                            <NavItem eventKey="3">
                                <NavIcon><GoListOrdered className="side-main-icon" /></NavIcon>
                                <NavText>Orders <MdOutlineKeyboardArrowRight size={20} /> </NavText>
                                <NavItem eventKey="3-1">
                                    <NavText className="move-side">
                                        <li className="shift-nav p-1" onClick={() => navigate("/user-repair-orders")}>
                                            <IoIosPeople className="inicon" size={18} />
                                            <span className="p-2" style={{ fontSize: "16px" }} >Repair Order</span>
                                        </li>
                                    </NavText>
                                </NavItem>
                                <NavItem eventKey="3-2">
                                    <NavText className="move-side">
                                        <li className="shift-nav p-1" onClick={() => navigate("/product-orders")}>
                                            <MdProductionQuantityLimits className="inicon" size={16} />
                                            <span className="p-2" style={{ fontSize: "16px" }} >Product Order</span>
                                        </li>
                                    </NavText>
                                </NavItem>
                            </NavItem>


                            <NavItem eventKey="9">
                                <NavIcon> <MdOutlineLogout className="side-main-icon" />  </NavIcon>
                                <NavText onClick={() => setShowLogout(true)}>Log out</NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>







            )}


            <Modal show={showLogout} onHide={() => setShowLogout(false)} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Proceed Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout? click logout to continue</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogout(false)}>
                        Close
                    </Button>
                    <Button variant="" style={{ backgroundColor: "red", color: "white" }} onClick={handleLogOut}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdminDashboard;
