import { useState } from "react";
import Footer from "../layouts/Footer";
import samsung from '../images/samsung.png';
import { Button, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import rep1 from '../images/rep1.jpg';
import rep2 from '../images/tecd.jpeg';
import Header from "../layouts/Header";
import SignUpSignIn from "./singupSignIn/signup-signin";
import InstoreRepairForm from "../layouts/InstoreRepairForm/instoreREpair";
import PickupRepairForm from "../layouts/PickupRepairForm/pickuprepair";


const SamsungDetails = (()=>{
    const [show, setShow] = useState(false);
    const [showSignUp, setSignUp] = useState(false);
    const [showBookForm, setShowBookForm] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseshowSignUp = () => setSignUp(false);
    const handleShowshowSignUp = () => setSignUp(true);


    const [isVisible, setIsVisible] = useState(false);
    const [isVisiblePickUp, setIsVisiblePickUp] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsVisiblePickUp(false)

   //  const targetElement = document.getElementById('instoreformSection');
   //  if (targetElement && isVisible) {
   //    targetElement.scrollIntoView({ behavior: 'smooth' });
   //  }
  };

  const toggleVisibilityPickUp = ()=>{
   setIsVisiblePickUp(!isVisiblePickUp)
   setIsVisible(false);
}

const handleScrollInstoreForm = (()=>{

   
})



    return(


        <>
<Header/>

<div className="container">
        
        <div className='fixlineDiv'>
        <h2 className="iphone-d">Samsung</h2>
        <div className='fixLine' ></div>
        </div>
         <div className="iphone-detaials-cover container" >
           <div className="iphone-detaials-cover-image">
             <img className="iphone-detaials-image" src={samsung }/>
        </div>
        <div className="iphone-detaials-cover-text">
               <div className="text-about-details tickHead" style={{fontWeight:"bold"}}>Get your broken Samsung device
                 quickly and professionally repaired at TecFix.</div>
           
              <div className="text-about-details container">Our trained technicians with years of
                 experience can perform most iPhone repairs the same day.  We have the tools and the
                  knowledge to fix Samsung issues such as: cracked or non-working screens, liquid damage,
                   intermittent or
                 no charging, mic issues, speaker issues and more! Book your same-day Samsung repair today!</div>

                 <div className="text-about-details tickHead" style={{fontWeight:"bold"}}>Premium vs cheap aftermarket Samsung screens.</div>
           
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
      <img className="cardimagess" src= {rep1}/>
   </div>
   <div className="cardtext-book p-3">
      <h4>In-Store Appointment</h4> 
   If youd like to setup an in-store appointment to have your device repaired or assessed, choose this option. 
   This is the quickest way to get a repair done.</div>
   <button className="picckBtn  p-3" onClick={toggleVisibility}> {!isVisible ? "Select" : "Hide"} </button>
   
</div>



{isVisible && (
   <div id="instoreformSection">
<InstoreRepairForm />
</div>
      )}



<div className="card-covers">
   <div className="cardimage-book p-3">
      <img className="cardimagess" src= {rep2}/>
   </div>
   <div className="cardtext-book p-3">
      <h4>Free Pickup by Courier </h4> 
      We offer free pickup city-wide if you are unable to come to our store. If youd like to arrange for your device to be picked up, please choose a time and day youd 
      like for us to call to arrange this and we will give you a call.</div>
      <button className="picckBtn p-3" onClick={toggleVisibilityPickUp}> {!isVisiblePickUp ? "Select" : "Hide"} </button>
   

</div>

</div>
     
{isVisiblePickUp && (

<PickupRepairForm/>
      )}



</div>
    

      
      
<Footer/>


        
        </>
    )
})

export default SamsungDetails