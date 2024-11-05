import { useState } from "react";
import Header from "../layouts/Header";
import "./userDashboard.css"
import { Link, NavLink } from "react-router-dom";



const UserDashBoard = (()=>{

	const [activeIndex, setActiveIndex] = useState(0);

	const menuItems = [
		{ name: 'My Account', path: '/user-profile' },
		{ name: 'Device Repair Orders', path: "/repair-orders" },
		{ name: 'Purchase Orders', path: '/services' },
		{ name: 'Contact', path: '/contact' }
	  ];
  
	  const handleItemClick = (index) => {
		setActiveIndex(index);
	  };

    return(



        <>
        
        <Header/>
        {/* <header className="header-user-prof">
		<div className="logo">Xero<span>Source</span></div>
	</header> */}
	<div className="nav-btn-control">Menu</div>
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
            className={activeIndex === index ? 'active' : ''}
          >
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