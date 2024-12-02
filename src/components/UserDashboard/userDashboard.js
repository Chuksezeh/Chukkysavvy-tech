import { useState } from "react";
import Header from "../layouts/Header";
import "./userDashboard.css"
import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
// import { useUser } from "./userConytext";
// import { auth, googleProvider } from "../../Configfile/firebaseConfig";



const UserDashBoard = (() => {

	const [activeIndex, setActiveIndex] = useState(0);
	// const { user } = useUser();
	const [showMenu, setShowMenu] = useState(true)

	const menuItems = [
		{ name: 'My Account', path: '/user-profile' },
		{ name: 'Device Repair Orders', path: "/repair-orders" },
		{ name: 'Purchase Orders', path: '/services' },
		{ name: 'Contact', path: '/contact' },
		{ name: 'Logout', path: '/contact' }
	];

	const handleItemClick = (index) => {
		setActiveIndex(index);
	};
	const { uid } = useParams();
	const location = useLocation();
	const { googleData } = location.state || {};
	//   const { setUser } = useUser();

	const navigate = useNavigate();




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

			<Header />

			{/* <div className="nav-btn-control"  >Menu</div> */}
			<div className="container-Userprof">
			
				<div className="sidebar-User-prof">
					
					<nav>
						<a href="#" className="aControlUser">Hello! <span>Chuks</span></a>



						<ul>
							

							{menuItems.map((item, index) => (
								<Link to={item.path} className="navlink-style">
									<li
										key={index}
										onClick={() => handleItemClick(index)}
										className={activeIndex === index ? 'active' : ''}>
										{item.name}
									</li></Link>
							))}

						</ul>
					</nav>
				</div>
			</div>
		</>
	)
})

export default UserDashBoard