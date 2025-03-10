import { Navigate, useLocation, useNavigate } from "react-router-dom";
import UserDashBoard from "../userDashboard"
import { useState } from "react";
import { auth } from "../../Configfile/firebaseConfig";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdKeyboardBackspace } from "react-icons/md";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";



const AccountOverMobile = (() => {


	const [showMenu, setShowMenu] = useState(false);

	const location = useLocation();
	const { user } = location.state || {};

	// console.log("user>>>>>>>",user);
	const navigate = useNavigate();

	// const handleSignOut = async () => {
	// 	try {
	// 	  await auth.signOut();
	// 	  setUserData(null)
	// 	} catch (error) {
	// 	  console.error("Error signing out:", error);
	// 	}
	//   };

	const handleShowMenu = (() => {
		setShowMenu(true)
	})

	const userInfo = localStorage.getItem('userInfo');
	const userData = JSON.parse(userInfo);

	return (

		<>
			<Header />
			<div className="tec-main-Hide">
				<UserDashBoard />
			</div>
			<div className="main-content">
				<div onClick={() => navigate(-1)}> <MdKeyboardBackspace size={35} /> </div>

				<div className="panel-wrapper">
					<div className="panel-head">
						Account Overview
					</div>
					<hr />
					<div className="panel-body">
						<p> {userData.firstName} {userData.lastName} </p>
						<p> {userData.email}  </p>
						{/* <button onClick={handleSignOut}>logout</button> */}
					</div>
				</div>

			</div>

			

		</>
	)
})

export default AccountOverMobile