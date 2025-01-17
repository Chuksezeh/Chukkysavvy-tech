import Header from "../layouts/Header"
import iphoneImage from '../images/iphone4.jpg';
import { Form, useNavigate } from "react-router-dom";
import { Button, Row } from "react-bootstrap";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import rep1 from '../images/rep1.jpg';
import rep2 from '../images/tecd.jpeg';
import Footer from "../layouts/Footer";
import SignUpSignIn from "./singupSignIn/signup-signin";
import { FaWhatsapp } from "react-icons/fa";
import ChatComponent from "../layouts/contactComponent/chatComponent";



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


    return(

<>
<Header/>

<div className="container">
        
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
        <div className="container">
	
	<div className="form-wra">
   <p id="description" className="text-center">
   Please provide required details and locate our store
		</p>	
		<form id="survey-form">
     
			<div className="row">

         <div className="col-md-6">
					<div className="form-group">
						<label>Choose iphone model</label>
						<select id="dropdown" name="role" className="form-control" required>
                   <option disabled>Choose...</option>
                 <option>Iphone 4</option>
                 <option>Iphone 4S</option>
                 <option>Iphone 5</option>
                 <option>Iphone 5S</option>
                 <option>Iphone 5C</option>
                 <option>Iphone 6</option>
                 <option>Iphone 6Plus</option>
                 <option>Iphone 6S</option>
                 <option>Iphone 6S Plus</option>
                 <option>SE(1st generation)</option>
                 <option>Iphone 7 </option>
                 <option>Iphone 7 Plus</option>
                 <option>Iphone 8</option>
                 <option>Iphone 8 Plus</option>
                 <option>Iphone X</option>
                 <option>Iphone XS</option>
                 <option>Iphone XR</option>
                 <option>Iphone XS Max</option>
                 <option>Iphone 11</option>
                 <option>Iphone 11 Pro</option>
                 <option>Iphone 11 Pro Max</option>
                 <option>Iphone SE(2nd generation)</option>
                 <option>Iphone 12 </option>
                 <option>Iphone 12 mini</option>
                 <option>Iphone 12 Pro </option>
                 <option>Iphone 12 Pro Max</option>
                 <option>Iphone 13 </option>
                 <option>Iphone 13 mini</option>
                 <option>Iphone 13 Pro</option>
                 <option>Iphone 13 Pro Max</option>
                 <option>Iphone SE(3rd generation)</option>
                 <option>Iphone 14</option>
                 <option>Iphone 14 Pro</option>
                 <option>Iphone 14 Plus</option>
                 <option>Iphone 14 Pro Max</option>
                 <option>Iphone 15</option>
                 <option>Iphone 15 Pro</option>
                 <option>Iphone 15 Plus</option>
                 <option>Iphone 15 Pro Max</option>
                 <option>Iphone 16</option>
                 <option>Iphone 16 Pro</option>
                 <option>Iphone 16 Plus</option>
                 <option>Iphone 16 Pro Max</option>
               
               </select>
					
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label id="name-label" for="name">Reservation date and time</label>
						<input type="datetime-local" required  id="name" placeholder="Enter your name" className="form-control" />
					</div>
				</div>
				<div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<label id="number-label" for="number">Select service store </label>
						<select id="dropdown" name="role" className="form-control" required>
                   <option disabled>Choose...</option>
                 <option>Main store</option>
                 <option>Branch</option>
                </select>
					</div>
				</div>
				
			</div>
       </div>
			<div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<label>Details</label>
						<textarea  id="comments" className="form-control" name="comment" placeholder="Please describe your requirement in details, for direct diagnosis and immediate fix" ></textarea>
					</div>
				</div>
			</div>
			
			{/* <div className="row">
				<div className="col-md-4">
				 <button className="picckBtn">Submit</button>
				</div>
			</div> */}

		</form>
	</div>	
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Continue</Button>
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
          <Modal.Title>Order For Pickup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="container">

	<div className="form-wra">
   <p id="description" className="text-center">
   Please provide required details for pickup/delivery
   
		</p>	
		<form id="survey-form">
     
			<div className="row">

         <div className="col-md-6">
					<div className="form-group">
						<label>Choose iphone model</label>
						<select id="dropdown" name="role" className="form-control" required>
                   <option disabled>Choose...</option>
                 <option>Iphone 4</option>
                 <option>Iphone 4S</option>
                 <option>Iphone 5</option>
                 <option>Iphone 5S</option>
                 <option>Iphone 5C</option>
                 <option>Iphone 6</option>
                 <option>Iphone 6Plus</option>
                 <option>Iphone 6S</option>
                 <option>Iphone 6S Plus</option>
                 <option>SE(1st generation)</option>
                 <option>Iphone 7 </option>
                 <option>Iphone 7 Plus</option>
                 <option>Iphone 8</option>
                 <option>Iphone 8 Plus</option>
                 <option>Iphone X</option>
                 <option>Iphone XS</option>
                 <option>Iphone XR</option>
                 <option>Iphone XS Max</option>
                 <option>Iphone 11</option>
                 <option>Iphone 11 Pro</option>
                 <option>Iphone 11 Pro Max</option>
                 <option>Iphone SE(2nd generation)</option>
                 <option>Iphone 12 </option>
                 <option>Iphone 12 mini</option>
                 <option>Iphone 12 Pro </option>
                 <option>Iphone 12 Pro Max</option>
                 <option>Iphone 13 </option>
                 <option>Iphone 13 mini</option>
                 <option>Iphone 13 Pro</option>
                 <option>Iphone 13 Pro Max</option>
                 <option>Iphone SE(3rd generation)</option>
                 <option>Iphone 14</option>
                 <option>Iphone 14 Pro</option>
                 <option>Iphone 14 Plus</option>
                 <option>Iphone 14 Pro Max</option>
                 <option>Iphone 15</option>
                 <option>Iphone 15 Pro</option>
                 <option>Iphone 15 Plus</option>
                 <option>Iphone 15 Pro Max</option>
               </select>
					
					</div>
				</div>

				<div className="col-md-6">
					<div className="form-group">
						<label id="name-label" for="name">Reservation date and time</label>
						<input type="datetime-local" required  id="name" placeholder="Enter your name" className="form-control" />
					</div>
				</div>
				<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label id="number-label" for="number">Pick up address</label>
						<input type="text" required   placeholder="Enter detailed address" className="form-control" />
					</div>
				</div>
            <div className="col-md-6">
					<div className="form-group">
						<label id="number-label" for="number">Phone number</label>
						<input type="text" required   placeholder="Enter phone number" className="form-control" />
					</div>
				</div>
				
			</div>
       </div>
			<div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<label>Details</label>
						<textarea  id="comments" className="form-control" name="comment" placeholder="Please describe your requirement in details, for direct diagnosis and immediate fix" ></textarea>
					</div>
				</div>
			</div>
			
			{/* <div className="row">
				<div className="col-md-4">
				 <button className="picckBtn">Submit</button>
				</div>
			</div> */}

		</form>
	</div>	
</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePickupForm}>
            Close
          </Button>
          <Button variant="primary">Continue</Button>
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