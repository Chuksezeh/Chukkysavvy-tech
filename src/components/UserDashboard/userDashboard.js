import { useState } from "react";
import Header from "../layouts/Header";
import "./userDashboard.css";
import { FaUser } from "react-icons/fa6";

import { IoIosArrowForward } from "react-icons/io";
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
// import { useUser } from "./userConytext";
// import { auth, googleProvider } from "../../Configfile/firebaseConfig";
import { IoPerson } from "react-icons/io5";



const UserDashBoard = (() => {

	const [activeIndex, setActiveIndex] = useState(0);
	// const { user } = useUser();
	const [showMenu, setShowMenu] = useState(true)
	

	const menuItems = [
		{ name: 'My Account', path: '/user-profile-dashboard',icon: <IoIosArrowForward />, sideIcon: <FaUser />
		},
		{ name: 'Device Repair Orders', path: "/repair-orders" ,icon: <IoIosArrowForward />},
		{ name: 'Purchase Orders', path: '',icon: <IoIosArrowForward /> },
		{ name: 'Contact', path: '',icon: <IoIosArrowForward /> },
		{ name: 'Logout', path: '/',icon: <IoIosArrowForward /> }
	];

	const handleItemClick = (index) => {
		setActiveIndex(index);
		setShowMenu(false)
	};
	const { uid } = useParams();
	const location = useLocation();
	const { googleData } = location.state || {};
	//   const { setUser } = useUser();

	const navigate = useNavigate();

        const handleMenu = (()=>{
			setShowMenu(false)
        })



	//   const handleSignOut = async () => {
	// 	try {
	// 	  await auth.signOut();
	// 	//   setUser(null);
	// 	//   navigate("/user-login");
	// 	} catch (error) {
	// 	  console.error("Error signing out:", error);
	// 	}
	//   };


	//   console.log("logData>>>>>>>>>", user)

	return (



		<>

			{/* <Header /> */}

			{/* <div className="nav-btn-control"  >Menu</div> */}
			<div className="container-Userprof">
			
				<div className="sidebar-User-prof">
					
					<nav>
						<a href="#" className="aControlUser">Hello! <span>Chuks</span></a>
						 
						   
                           <ul style={{color:"white"}} className="marUlshift">
							
							
                              {menuItems.map((item, index) => (
								    <Link to={item.path} className="navlink-style">
									    <li
										key={index}
										onClick={() => handleItemClick(index)}
										className={activeIndex === index ? 'active' : ''}
										>
										{/* <span> {item.sideIcon}</span> */}
										<span className="setIconDivSideB">
										<span>{item.name}</span>
										<span> {item.icon}</span>

										</span>
										 
									</li>
									</Link>
							))}

						</ul>
					</nav>
				</div>
			</div>
		</>
	)
})

export default UserDashBoard