import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./userDashboard.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserDashBoard = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showMenu, setShowMenu] = useState(true);
    const navigate = useNavigate();
    
    const userInfo = localStorage.getItem("userInfo");
    const userData = JSON.parse(userInfo);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const menuItems = [
        { name: "My Account", path: "/user-profile-dashboard", icon: <IoIosArrowForward />, sideIcon: <FaUser /> },
        { name: "Device Repair Orders", path: "/repair-orders", icon: <IoIosArrowForward /> },
        // { name: "Purchase Orders", path: "/user-product-orders", icon: <IoIosArrowForward /> },
        { name: "Book Device Repair", path: "/bookingpage", icon: <IoIosArrowForward /> },
        // { name: "Contact", path: "", icon: <IoIosArrowForward /> },
        { name: "Logout", path: "", icon: <IoIosArrowForward /> }
    ];

   

    const handleItemClick = (index) => {
        console.log("log", index)
        setActiveIndex(index);
        if(activeIndex === 2){
            // setShow(true)
         }else if(activeIndex === 3){
            setShow(true)
         }else if(activeIndex === 4){
            handleShow();
         }
         else{
            return
         }

        };

        useEffect(()=>{
            handleItemClick();  

        },[activeIndex])

    console.log("activeindex", activeIndex)

         const handleLogOut = ()=>{
         localStorage.removeItem("userInfo");
            setTimeout(() => navigate("/"), 500); // Ensure cleanup before navigating
          
        }

        useEffect(() => {
            const userInfo = localStorage.getItem('userInfo');
            console.log('UserInfo:', userInfo);
          
            if (!userInfo) {
              navigate('/user-login');
            }
          }, [navigate]);
        
 

    return (
        <>
         
        <div className="container-Userprof">
            <div className="sidebar-User-prof">
                <nav>
                    <a href="#" className="aControlUser">
                        Hello! <span>{userData?.firstName}</span>
                    </a>
                    <ul className="marUlshift">
                        {menuItems.map((item, index) => (
                            <Link to={item.path} className="navlink-style" key={index}>
                                <li onClick={() => handleItemClick(index)} className={activeIndex === index ? "active" : ""}>
                                    <span className="setIconDivSideB">
                                        <span>{item.name}</span>
                                        <span>{item.icon}</span>
                                    </span>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>

        <Modal show={show} onHide={handleClose} animation={false}   centered>
        <Modal.Header closeButton>
          <Modal.Title>Proceed Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout? click logout to continue</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="" style={{backgroundColor:"red", color:"white"}} onClick={handleLogOut}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
};

export default UserDashBoard;
