import { useLocation, useNavigate } from "react-router-dom";
import UserDashBoard from "../userDashboard"
import { useState } from "react";
import { auth } from "../../Configfile/firebaseConfig";
import { GiHamburgerMenu } from "react-icons/gi";



const AccountOverView = (()=>{

	const [userData, setUserData] = useState("");
	const [showMenu, setShowMenu] = useState(false);

	const location = useLocation();
	const { user } = location.state || {};

	// console.log("user>>>>>>>",user);
	

	// const handleSignOut = async () => {
	// 	try {
	// 	  await auth.signOut();
	// 	  setUserData(null)
	// 	} catch (error) {
	// 	  console.error("Error signing out:", error);
	// 	}
	//   };
	
const handleShowMenu = (()=>{
	setShowMenu(true)
})

    return(

<>

   <UserDashBoard />
 
		 
	
 
 
         
   
<div className="main-content">
	
			
			
			<div className="panel-wrapper">
				<div className="panel-head">
					Account Overview
				</div>
                <hr/>
				<div className="panel-body">
					<p>Chukwuka Ezeh</p>
                    <p>chuksintellectual@gmail.com</p>
					{/* <button onClick={handleSignOut}>logout</button> */}
				</div>
			</div>
			{/* <div className="panel-wrapper">
				<div className="panel-head">
					News
				</div>
				<div className="panel-body">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam fugiat culpa quia possimus molestiae id sapiente ad eveniet, aliquid, eum sint fuga eius, ratione suscipit ut minus voluptates dicta nesciunt.
				</div>
			</div>
			<div className="panel-wrapper">
				<div className="panel-head">
					News
				</div>
				<div className="panel-body">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam fugiat culpa quia possimus molestiae id sapiente ad eveniet, aliquid, eum sint fuga eius, ratione suscipit ut minus voluptates dicta nesciunt. Totam fugiat culpa quia possimus molestiae id sapiente ad eveniet, aliquid, eum sint fuga eius, ratione suscipit ut minus voluptates dicta nesciunt.
				</div>
			</div> */}
		</div>     
        
        </>
    )
})

export default AccountOverView