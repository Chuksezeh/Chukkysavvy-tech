import { useEffect, useState } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./userDashboard.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useGetData from "../Utility/getFunction";
import { GiAutoRepair } from "react-icons/gi";
import { BsTools } from "react-icons/bs";
import { LiaLuggageCartSolid } from "react-icons/lia";

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
        { name: "Dashboard", path: "/user-profile-dashboard", icon: <IoIosArrowForward />, sideIcon: <FaUser /> },
       { name: "My Repair Orders", path: "/repair-orders", icon: <IoIosArrowForward />, sideIcon: <BsTools /> },
       { name: "My Product Orders", path: "/user-product-orders", icon: <IoIosArrowForward />, sideIcon:  <LiaLuggageCartSolid size={20} />},
        { name: "Book Device Repair", path: "/bookingpage", icon: <IoIosArrowForward />, sideIcon: <GiAutoRepair /> },
         { name: "Continue Shopping", path: "/buy-products", icon: <IoIosArrowForward />, sideIcon: <FaCartShopping /> },
        
        { name: "Logout", path: "" }
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
         }};

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


  const encodedEmail = encodeURIComponent(userData.email);
  const {data, isPending, error} = useGetData(`/auth/getUser/${encodedEmail}`)

  const checkColor = (item) => {
      switch (item) {
        case "Logout":
        return "red";
      default:
      }
     };

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
                                      
                                        <span  style={{ color: checkColor(item.name) }}> <span>{item.sideIcon}</span>  <span  style={{marginLeft:"5px"}}>{item.name}</span>  </span>
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
