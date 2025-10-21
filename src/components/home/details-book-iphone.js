import Header from "../layouts/Header"
import iphoneImage from '../images/iphone4.jpg';
import { Form, useNavigate } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import rep1 from '../images/Designer.jpeg';
import rep2 from '../images/black-dispatcher.jpeg';
import Footer from "../layouts/Footer";
import SignUpSignIn from "./singupSignIn/signup-signin";
import { FaWhatsapp } from "react-icons/fa";
import ChatComponent from "../layouts/contactComponent/chatComponent";
import IphonePickupREpair from "../layouts/IphonePickupRepairForm/iphonePickupRepair";
import IphoneInstoreRepair from "../layouts/IphoneInstoreRepairForm/iphoneInstoreRepair";
import Goback from "../layouts/goBack";
import WhatsAppFloat from "../layouts/whatsappFloat/whatsAppFloat";
import ReadMoreText from "../layouts/readMoreText";
import { GiCardPickup } from "react-icons/gi";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";



const DetailsBookIphone = (() => {
  const [show, setShow] = useState(false);
  const [showSignUp, setSignUp] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [showPickUpForm, setShowPickUpForm] = useState(false);
  const userData = JSON.parse(localStorage.getItem('userInfo') || "null");
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseshowSignUp = () => setSignUp(false);
  const handleShowshowSignUp = () => setSignUp(true);

  const handleShowPickUpForm = () => setShowPickUpForm(true);
  const handleClosePickupForm = () => setShowPickUpForm(false);




  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePickUp, setIsVisiblePickUp] = useState(false);


  const [showNoLogin, setShowNoLogin] = useState(false);
  const handleShowNoLogin = (() => setShowNoLogin(true));
  const handleHideNoLogin = (() => setShowNoLogin(false))

  const navigateLogin = () => navigate("/user-login");

  const toggleVisibility = () => {
    if (!userData) {
      setShowNoLogin(true);

    } else {
      setIsVisible(!isVisible);
      setIsVisiblePickUp(false)
      handleShow()
    }
  };

  const toggleVisibilityPickUp = () => {
    if (!userData) {
      setShowNoLogin(true);
    } else {
      setIsVisiblePickUp(!isVisiblePickUp)
      setIsVisible(false);
      handleShowPickUpForm()
    }

  }

  {/* <Button variant="primary" onClick={handleShow}>
Launch static backdrop modal
</Button> */}
  const scrolltop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    scrolltop()
  }, [])

  return (

    <>
      <Header />

      <div className="container">
        <Goback />

        <div className='fixlineDiv'>
          <div style={{ justifyContent: "start", textAlign: "start" }} className='container'> <Goback /></div>
          <h1 className="iphone-d">iPhones</h1>
          <div className='fixLine' ></div>
        </div>
        <div className="iphone-detaials-cover " >
          <div className="iphone-detaials-cover-image">
            <img className="iphone-detaials-image" src={iphoneImage} />
          </div>
          <div className="mobileShow-btn">
            <div > <button className="picckBtn p-3" style={{ width: "100%" }} onClick={toggleVisibilityPickUp}> <span><GiCardPickup size={20} />
            </span> Request Pickup Repair </button></div>
            <br />
            <div> <button className="picckBtn  p-3" onClick={toggleVisibility} style={{ width: "100%" }}> <span><FaPersonWalkingArrowRight size={20} /></span> Reserve and Visit Shop</button></div>
          </div>

          <div className="iphone-detaials-cover-text">
            <div className="text-about-details tickHead" style={{ fontWeight: "bold" }}>Get your broken iPhone device
              quickly and professionally repaired at Chukkytech.</div>
            <ReadMoreText text=" Our trained technicians with years of
            experience can perform most iPhone repairs the same day.  We have the tools and the
            knowledge to fix iPhone issues such as: cracked or non-working screens, liquid damage,
            intermittent or
            no charging, mic issues, speaker issues and more! Book your same-day iPhone repair today!
            Premium vs cheap aftermarket iPhone screens.

            We only use premium quality screens because cheap aftermarket
            screens have a high chance of showing unattractive white spots or discolouration and may appear
            less bright than premium quality screens. For your iPhone repair, we highly recommend not going for
            the cheapest price in the city for this reason. At Chukkytech, you will be paying for premium quality parts
            and at a fair & affordable price."
              maxWords={50}
            />





          </div>


        </div>

        <h3 className="head-bookRepair">BOOK A REPAIR OR A FREE IN-STORE ASSESSMENT</h3>
        <SignUpSignIn />

        <div className="card-hol">

          <div className="card-covers">
            <div className="cardimage-book p-3">
              <img className="cardimagess" src={rep2} />
            </div>

            <div className="cardtext-book-div">
              <div className="cardtext-book ">
                <h4 className="cl-textHEAd">Order Pickup, Repair and Delivery </h4>
                We offer free pickup city-wide if you are unable to come to our store. If youd like to arrange for
                your device to be picked up, please choose a time and day you would
                like us to contact you for Pickup and quick fix
                <p className="cl-text">Please chat or call us for detail explanation and the pricing for the fixing service. We are available 24/7    </p>
                {/* <ChatComponent/> */}

              </div>
              <div className="btn-order-div">
                <button className="picckBtn btn-order-divbtn" onClick={toggleVisibilityPickUp}> Order Now </button>
              </div>
            </div>
          </div>

          <div className="card-covers">
            <div className="cardimage-book p-3">
              <img className="cardimagess" src={rep1} />
            </div>
            <div className="cardtext-book-div">
            <div className="cardtext-book ">
              <h4 className="cl-textHEAd">Reserve In-Store Appointment</h4>
              If youd like to setup an in-store appointment to have your device repaired or assessed, choose this option.
              This is the quickest way to get a repair done.
              <p className="cl-text">Please chat or call us for detail explanation, reservation and the pricing for the fixing service. We are available 24/7    </p>
              {/* <ChatComponent/> */}

            </div>

            <div className="btn-order-div">
              <button className="picckBtn  btn-order-divbtn" onClick={toggleVisibility}> Reserve Now</button>
            </div>
              </div>
          </div>



          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"

          >
            <Modal.Header closeButton>
              <Modal.Title>Order for Instore Repair</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <IphonePickupREpair />

            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
          </Modal>







        </div>


        <Modal
          show={showPickUpForm}
          onHide={handleClosePickupForm}
          backdrop="static"
          keyboard={false}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"

        >
          <Modal.Header closeButton>
            <Modal.Title>Device Repair Pickup Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <IphoneInstoreRepair />
          </Modal.Body>
          <Modal.Footer>

            {/* <Button variant="primary">Continue</Button> */}
          </Modal.Footer>
        </Modal>



        <WhatsAppFloat />


        <Modal
          show={showNoLogin}
          onHide={handleHideNoLogin}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ fontWeight: 'bold' }} className="text-info">
              {' '}
              LOGIN REQUEST{' '}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Hey, looks like you're not logged in yet! login for a smoother ride, or register to unlock the full experience, let's get you started!

            </p>
          </Modal.Body>
          <Modal.Footer>
           
            <Button className="WProceedBtn" onClick={navigateLogin}>
              Proceed Login
            </Button>

             <Button variant="secondary" onClick={handleHideNoLogin}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>




        <br />
        <br />
        <br />
        <br />
        <br />


      </div>




      <Footer />


    </>

  )

})

export default DetailsBookIphone