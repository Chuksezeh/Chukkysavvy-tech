import { useLocation, useNavigate } from "react-router-dom";
import UserDashBoard from "../userDashboard"
import { useEffect, useState } from "react";
import { auth } from "../../Configfile/firebaseConfig";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import UserDashBoardComponent from "./userDashboardComponent";



const AccountOverView = (() => {

	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);

	const location = useLocation();
	const { user } = location.state || {};

	const userInfo = localStorage.getItem('userInfo');
	const userData = JSON.parse(userInfo);

	const handleShowMenu = (() => {
		setShowMenu(true)
	})


	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo');
		console.log('UserInfo:', userInfo);
	  
		if (!userInfo) {
		  navigate('/user-login');
		}
	  }, [navigate]);
	

	return (

		<>
			<Header />
			<UserDashBoard />

			<div className="main-content">
				<div className="panel-wrapper">
					<div className="panel-head">
						Account Overview
					</div>
					<hr />
					{/* <div className="panel-body">
					<p> {userData?.firstName} {userData?.lastName} </p>
					<p> {userData?.email}  </p>
						
					</div> */}
                   <UserDashBoardComponent/>

				</div>
				
			</div>

			

			

		</>
	)
})

export default AccountOverView