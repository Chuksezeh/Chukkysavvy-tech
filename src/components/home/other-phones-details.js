import { useEffect, useState } from "react";
import Footer from "../layouts/Footer";
import samsung from '../images/samsung.png';
import { Button, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import rep1 from '../images/Designer.jpeg';
import rep2 from '../images/black-dispatcher.jpeg';
import Header from "../layouts/Header";
import otherPhones from '../images/other-phones.jpg';
import SignUpSignIn from "./singupSignIn/signup-signin";
import InstoreRepairForm from "../layouts/InstoreRepairForm/instoreREpair";
import PickupRepairForm from "../layouts/PickupRepairForm/pickuprepair";
import ChatComponent from "../layouts/contactComponent/chatComponent";
import Goback from "../layouts/goBack";
import WhatsAppFloat from "../layouts/whatsappFloat/whatsAppFloat";
import ReadMoreText from "../layouts/readMoreText";



const OtherPhonesDetails = (()=>{

    const [show, setShow] = useState(false);
    const [showSignUp, setSignUp] = useState(false);
    const [showBookForm, setShowBookForm] = useState(false);
    const [showPickUpForm, setShowPickUpForm]= useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowPickUpForm = () => setShowPickUpForm(true);
    const handleClosePickupForm = () => setShowPickUpForm(false);


    const handleCloseshowSignUp = () => setSignUp(false);
    const handleShowshowSignUp = () => setSignUp(true);


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
        <div style={{justifyContent:"start", textAlign:"start"}} className='container'> <Goback/></div>
        <h1 className="iphone-d">Other Phones</h1>
        <div className='fixLine' ></div>
        </div>
         <div className="iphone-detaials-cover container" >
           <div className="iphone-detaials-cover-image">
             <img className="iphone-detaials-image" src={otherPhones}/>
        </div>
        < div className="iphone-detaials-cover-text">
               <div className="text-about-details tickHead" style={{fontWeight:"bold"}}>Get your broken phone device
                 quickly and professionally repaired at Chukkytech.</div>
           

           <ReadMoreText
           text="Our trained technicians with years of
                 experience can perform most phone repairs the same day.  We have the tools and the
                  knowledge to fix any phone issues such as: cracked or non-working screens, liquid damage,
                   intermittent or
                 no charging, mic issues, speaker issues and more! Book your same-day phone repair today!

               Premium vs cheap aftermarket phone screens.
           
             We only use premium quality screens because cheap aftermarket
                 screens have a high chance of showing unattractive white spots or discolouration and may appear
                  less bright than premium quality screens. For your iPhone repair, we highly recommend not going for
                   the cheapest price in the city for this reason. At Chukkytech, you will be paying for premium quality parts 
                   and at a fair & affordable price.  "
           />
             




              </div>
             

    </div>

     <h3 className="head-bookRepair">BOOK A REPAIR OR A FREE IN-STORE ASSESSMENT</h3>  
     {/* <SignUpSignIn/> */}


<div className="card-hol">


<div className="card-covers">
   <div className="cardimage-book p-3">
      <img className="cardimagess" src= {rep2}/>
   </div>
   <div className="cardtext-book p-3">
   <h4 className="cl-textHEAd">Order Pickup, Repair and Delivery </h4> 
      We offer free pickup city-wide if you are unable to come to our store. If youd like to arrange for your device to be picked up, please choose a time and day youd 
      like for us to call to arrange this and we will give you a call.
      <p className="cl-text">Please chat or call us for detail explanation and the pricing for the fixing service. We are available 24/7    </p>
      {/* <ChatComponent/> */}
      
      </div>

      <button className="picckBtn p-3" onClick={toggleVisibilityPickUp}> Order Now </button>
   

</div>

<div className="card-covers">
   <div className="cardimage-book p-3">
      <img className="cardimagess" src= {rep1}/>
   </div>
   <div className="cardtext-book p-3">
   <h4 className="cl-textHEAd">Reserve In-Store Appointment</h4> 
   If youd like to setup an in-store appointment to have your device repaired or assessed, choose this option. 
   This is the quickest way to get a repair done.
   <p className="cl-text">Please chat or call us for detail explanation, reservation and the pricing for the fixing service. We are available 24/7    </p>
      {/* <ChatComponent/> */}
   
   </div>
   <button className="picckBtn  p-3" onClick={toggleVisibility}> Reserve Now</button>
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

        <InstoreRepairForm/>

        </Modal.Body>
        <Modal.Footer>
         
         
        </Modal.Footer>
      </Modal>


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
        <PickupRepairForm/>
        </Modal.Body>
        <Modal.Footer>
        
         
        </Modal.Footer>
      </Modal>


      <WhatsAppFloat/>

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

export default OtherPhonesDetails