import Header from "../layouts/Header"
import iphoneImage from '../images/iphone4.jpg';
import { Form, useNavigate } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import rep1 from '../images/rep1.jpg';
import rep2 from '../images/tecd.jpeg';
import Footer from "../layouts/Footer";
import SignUpSignIn from "./singupSignIn/signup-signin";
import { FaWhatsapp } from "react-icons/fa";
import ChatComponent from "../layouts/contactComponent/chatComponent";
import IphonePickupREpair from "../layouts/IphonePickupRepairForm/iphonePickupRepair";
import IphoneInstoreRepair from "../layouts/IphoneInstoreRepairForm/iphoneInstoreRepair";
import Goback from "../layouts/goBack";



const DetailsBookIphone = (()=>{
    const [show, setShow] = useState(false);
    const [showSignUp, setSignUp] = useState(false);
    const [showBookForm, setShowBookForm] = useState(false);
    const [showPickUpForm, setShowPickUpForm]= useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseshowSignUp = () => setSignUp(false);
    const handleShowshowSignUp = () => setSignUp(true);

    const handleShowPickUpForm = () => setShowPickUpForm(true);
    const handleClosePickupForm = () => setShowPickUpForm(false);

   


    const [isVisible, setIsVisible] = useState(false);
    const [isVisiblePickUp, setIsVisiblePickUp] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsVisiblePickUp(false)
    handleShow()
  };

  const toggleVisibilityPickUp = ()=>{
   setIsVisiblePickUp(!isVisiblePickUp)
   setIsVisible(false);
   handleShowPickUpForm()
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

    return(

<>
<Header/>

<div className="container">
<Goback/>

        <div className='fixlineDiv'>
        <h2 className="iphone-d">Iphones</h2>
        <div className='fixLine' ></div>
        </div>
         <div className="iphone-detaials-cover container" >
           <div className="iphone-detaials-cover-image">
             <img className="iphone-detaials-image" src={iphoneImage}/>
        </div>
        <div className="iphone-detaials-cover-text">
               <div className="text-about-details tickHead" style={{fontWeight:"bold"}}>Get your broken iPhone device
                 quickly and professionally repaired at TecFix.</div>
           
              <div className="text-about-details container">Our trained technicians with years of
                 experience can perform most iPhone repairs the same day.  We have the tools and the
                  knowledge to fix iPhone issues such as: cracked or non-working screens, liquid damage,
                   intermittent or
                 no charging, mic issues, speaker issues and more! Book your same-day iPhone repair today!</div>

                 <div className="text-about-details tickHead" style={{fontWeight:"bold"}}>Premium vs cheap aftermarket iPhone screens.</div>
           
              <div className="text-about-details  container">We only use premium quality screens because cheap aftermarket
                 screens have a high chance of showing unattractive white spots or discolouration and may appear
                  less bright than premium quality screens. For your iPhone repair, we highly recommend not going for
                   the cheapest price in the city for this reason. At Chukkytech, you will be paying for premium quality parts 
                   and at a fair & affordable price.

</div>


              </div>
             

    </div>

     <h3 className="head-bookRepair">BOOK A REPAIR OR A FREE IN-STORE ASSESSMENT</h3>  
    <SignUpSignIn/>

<div className="card-hol">

<div className="card-covers">
   <div className="cardimage-book p-3">
      <img className="cardimagess" src= {rep2}/>
   </div>
   <div className="cardtext-book p-3">
      <h4 className="cl-textHEAd">Pickup, Repair and Deliver </h4> 
      We offer free pickup city-wide if you are unable to come to our store. If youd like to arrange for
       your device to be picked up, please choose a time and day you would 
      like us to contact you for Pickup and quick fix
      <p className="cl-text">Please chat or call us for detail explanation and the pricing for the fixing service. We are available 24/7    </p>
      <ChatComponent/>
      
      </div>

      <button className="picckBtn p-3" onClick={toggleVisibilityPickUp}> Order Now </button>
   

</div>

<div className="card-covers">
   <div className="cardimage-book p-3">
      <img className="cardimagess" src= {rep1}/>
   </div>
   <div className="cardtext-book p-3">
      <h4 className="cl-textHEAd">In-Store Appointment</h4> 
   If youd like to setup an in-store appointment to have your device repaired or assessed, choose this option. 
   This is the quickest way to get a repair done.
   <p className="cl-text">Please chat or call us for detail explanation, reservation and the pricing for the fixing service. We are available 24/7    </p>
      <ChatComponent/>
   
   </div>
   <button className="picckBtn  p-3" onClick={toggleVisibility}> Reserve Now</button>
   
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
          <IphonePickupREpair/>
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary">Continue</Button> */}
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
       <IphoneInstoreRepair/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePickupForm}>
            Close
          </Button>
          {/* <Button variant="primary">Continue</Button> */}
        </Modal.Footer>
      </Modal>






     
<br/>
<br/> 
<br/>
<br/>   
<br/>
 

</div>
    

    
      
<Footer/>


</>

    )

})

export default DetailsBookIphone