import Header from "../layouts/Header"
import iphoneImage from '../images/iphone4.jpg';
import { Form } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import rep1 from '../images/rep1.jpg';
import rep2 from '../images/tecd.jpeg';
import Footer from "../layouts/Footer";



const DetailsBookIphone = (()=>{
    const [show, setShow] = useState(false);
    const [showSignUp, setSignUp] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseshowSignUp = () => setSignUp(false);
    const handleShowshowSignUp = () => setSignUp(true);

    return(

<>
<Header/>

<div className="container">
        <h3 className="iphone-detaials-head">Iphones</h3>
        {/* <div className='fixlineDiv'>
  <div className='fixLine' ></div>
</div> */}
         <div className="iphone-detaials-cover">
           <div className="iphone-detaials-cover-image">
             <img className="iphone-detaials-image" src={iphoneImage}/>
        </div>
        <div className="iphone-detaials-cover-text">
               <div className="text-about-details tickHead" style={{fontWeight:"bold"}}>Get your broken iPhone device
                 quickly and professionally repaired at TecFix.</div>
           
              <div className="text-about-details">Our trained technicians with years of
                 experience can perform most iPhone repairs the same day.  We have the tools and the
                  knowledge to fix iPhone issues such as: cracked or non-working screens, liquid damage,
                   intermittent or
                 no charging, mic issues, speaker issues and more! Book your same-day iPhone repair today!</div>

                 <div className="text-about-details tickHead" style={{fontWeight:"bold"}}>Premium vs cheap aftermarket iPhone screens.</div>
           
              <div className="text-about-details">We only use premium quality screens because cheap aftermarket
                 screens have a high chance of showing unattractive white spots or discolouration and may appear
                  less bright than premium quality screens. For your iPhone repair, we highly recommend not going for
                   the cheapest price in the city for this reason. At Techyfix, you will be paying for premium quality parts 
                   and at a fair & affordable price.

</div>


              </div>
             

    </div>

     <h3 className="head-bookRepair">BOOK A REPAIR OR A FREE IN-STORE ASSESSMENT</h3>  
     <Button variant="secondary" onClick={handleShow}>
        Sign up
      </Button>
      <Button variant="secondary" onClick={handleShowshowSignUp}>
        Sign in
      </Button>


<div className="card-hol">
<div className="card-covers">
   <div className="cardimage-book p-3">
      <img className="cardimagess" src= {rep1}/>
   </div>
   <div className="cardtext-book p-3">
      <h4>In-Store Appointment</h4> 
   If youd like to setup an in-store appointment to have your device repaired or assessed, choose this option. 
   This is the quickest way to get a repair done.</div>
   <div className="cardbtn-book p-3"> 
       <button className="picckBtn">Select</button>
   </div>
</div>
<div className="containers">
     
     <h3 className="signtext">Please provide these required details</h3>
     <form >
        <div className="form-row">
           <div className="input-data">
              <input type="text" required/>
              <div className="underline"></div>
              <label for="">Device model</label>
           </div>
           <div className="input-data">
              <input type="text" required/>
              <div className="underline"></div>
              <label for="">Last Name</label>
           </div>
           
        </div>
        <div className="form-row">
           <div className="input-data">
              <input type="text" required/>
              <div className="underline"></div>
              <label for="">Phone number</label>
           </div>
           <div className="input-data">
              <input type="text" required/>
              <div className="underline"></div>
              <label for="">Email</label>
           </div>
        </div>
        <div className="form-row">
           <div className="input-data">
              <input type="text" required/>
              <div className="underline"></div>
              <label for="">Password</label>
           </div>
           <div className="input-data">
              <input type="text" required/>
              <div className="underline"></div>
              <label for="">Confirm password</label>
           </div>
        </div>
        <button className="picckBtn">Submit</button>
     </form>
     </div>



<div className="card-covers">
   <div className="cardimage-book p-3">
      <img className="cardimagess" src= {rep2}/>
   </div>
   <div className="cardtext-book p-3">
      <h4>Free Pickup by Courier </h4> 
      We offer free pickup city-wide if you are unable to come to our store. If youd like to arrange for your device to be picked up, please choose a time and day youd 
      like for us to call to arrange this and we will give you a call.</div>
   <div className="cardbtn-book p-3"> 
       <button className="picckBtn">Select</button>
   </div>


</div>

</div>
     <div className="bookRepair-form">
    


    </div>

</div>
    

      <Modal show={show} onHide={handleClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title> <div className="text">
         Sign up
      </div></Modal.Title>
        </Modal.Header>
        <Modal.Body> 
         <div className="containers">
     
      <div className="signtext">Sign up to save your information for faster booking and seamless repair tracking</div>
      <form >
         <div className="form-row">
            <div className="input-data">
               <input type="text" required/>
               <div className="underline"></div>
               <label for="">First Name</label>
            </div>
            <div className="input-data">
               <input type="text" required/>
               <div className="underline"></div>
               <label for="">Last Name</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="text" required/>
               <div className="underline"></div>
               <label for="">Phone number</label>
            </div>
            <div className="input-data">
               <input type="text" required/>
               <div className="underline"></div>
               <label for="">Email</label>
            </div>
         </div>
         <div className="form-row">
            <div className="input-data">
               <input type="text" required/>
               <div className="underline"></div>
               <label for="">Password</label>
            </div>
            <div className="input-data">
               <input type="text" required/>
               <div className="underline"></div>
               <label for="">Confirm password</label>
            </div>
         </div>
      </form>
      </div>

      </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>





      <Modal show={showSignUp} onHide={handleCloseshowSignUp} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>  <div className="text">
         Sign in
      </div></Modal.Title>
        </Modal.Header>
        <Modal.Body>  <div className="containers">
     
      <div className="signtext">Sign in for faster booking and seamless repair tracking</div>
      <form >
         <div className="form-row">
            <div className="input-data">
               <input type="text" required/>
               <div className="underline"></div>
               <label for="">Email</label>
            </div>
            <div className="input-data">
               <input type="text" required/>
               <div className="underline"></div>
               <label for="">password</label>
            </div>
         </div>
        
         {/* <button className="sign-btn">Sign in</button> */}
        
      </form>
      </div></Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseshowSignUp}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleCloseshowSignUp}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
<Footer/>


</>

    )

})

export default DetailsBookIphone