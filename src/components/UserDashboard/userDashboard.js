import { useEffect, useState } from "react";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import "./userDashboard.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useGetData from "../Utility/getFunction";
import { GiAutoRepair } from "react-icons/gi";
import { BsTools } from "react-icons/bs";
import { LiaLuggageCartSolid } from "react-icons/lia";

const UserDashBoard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo");
  const userData = userInfo ? JSON.parse(userInfo) : null;

  /** 🔐 Redirect if not logged in */
  useEffect(() => {
    if (!userInfo) {
      navigate("/user-login");
    }
  }, [navigate, userInfo]);

  /** 📌 Menu items */
  const menuItems = [
    {
      name: "Dashboard",
      path: "/user-profile-dashboard",
      icon: <IoIosArrowForward />,
      sideIcon: <FaUser />,
    },
    {
      name: "My Repair Orders",
      path: "/repair-orders",
      icon: <IoIosArrowForward />,
      sideIcon: <BsTools />,
    },
    {
      name: "My Product Orders",
      path: "/user-product-orders",
      icon: <IoIosArrowForward />,
      sideIcon: <LiaLuggageCartSolid size={20} />,
    },
    {
      name: "Book Device Repair",
      path: "/bookingpage",
      icon: <IoIosArrowForward />,
      sideIcon: <GiAutoRepair />,
    },
    {
      name: "Continue Shopping",
      path: "/buy-products",
      icon: <IoIosArrowForward />,
      sideIcon: <FaCartShopping />,
    },
    {
      name: "Logout",
      path: "#",
    },
  ];

  /** 👉 Handle menu click */
  const handleItemClick = (index, item) => {
    setActiveIndex(index);

    if (item.name === "Logout") {
      setShowLogoutModal(true);
    }
  };

  /** 🚪 Logout */
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setShowLogoutModal(false);
    navigate("/");
  };

  const checkColor = (itemName) => {
    if (itemName === "Logout") return "red";
    return "";
  };

  const encodedEmail = encodeURIComponent(userData?.email || "");
  useGetData(`/auth/getUser/${encodedEmail}`);

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
                <Link
                  to={item.name === "Logout" ? "#" : item.path}
                  className="navlink-style"
                  key={index}
                >
                  <li
                    onClick={() => handleItemClick(index, item)}
                    className={activeIndex === index ? "active" : ""}
                  >
                    <span className="setIconDivSideB">
                      <span style={{ color: checkColor(item.name) }}>
                        {item.sideIcon && (
                          <>
                            {item.sideIcon}
                            <span style={{ marginLeft: "5px" }}>
                              {item.name}
                            </span>
                          </>
                        )}
                        {!item.sideIcon && item.name}
                      </span>
                      <span>{item.icon}</span>
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* 🔔 LOGOUT CONFIRMATION MODAL */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLogoutModal(false)}
          >
            No
          </Button>
          <button className="btn btn-danger"
            // style={{ backgroundColor: "red", color: "white" }}
            onClick={handleLogout}
          >
            Yes, Logout
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDashBoard;
