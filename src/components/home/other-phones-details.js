import { useState } from "react";
import Footer from "../layouts/Footer";
import samsung from '../images/samsung.png';
import { Button, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import rep1 from '../images/rep1.jpg';
import rep2 from '../images/tecd.jpeg';
import Header from "../layouts/Header";
import otherPhones from '../images/other-phones.jpg';



const OtherPhonesDetails = (()=>{

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
  };

  const toggleVisibilityPickUp = ()=>{
   setIsVisiblePickUp(!isVisiblePickUp)
   setIsVisible(false);
}

    return(

        <>
        
        <Header/>

<div className="container">
        
        <div className='fixlineDiv'>
        <h2 className="iphone-d">Other Phones</h2>
        <div className='fixLine' ></div>
        </div>
         <div className="iphone-detaials-cover container" >
           <div className="iphone-detaials-cover-image">
             <img className="iphone-detaials-image" src={otherPhones}/>
        </div>
        <div className="iphone-detaials-cover-text">
               <div className="text-about-details tickHead" style={{fontWeight:"bold"}}>Get your broken phone device
                 quickly and professionally repaired at Chukkytech.</div>
           
              <div className="text-about-details container">Our trained technicians with years of
                 experience can perform most phone repairs the same day.  We have the tools and the
                  knowledge to fix Samsung issues such as: cracked or non-working screens, liquid damage,
                   intermittent or
                 no charging, mic issues, speaker issues and more! Book your same-day phone repair today!</div>

                 <div className="text-about-details tickHead" style={{fontWeight:"bold"}}>Premium vs cheap aftermarket phone screens.</div>
           
              <div className="text-about-details  container">We only use premium quality screens because cheap aftermarket
                 screens have a high chance of showing unattractive white spots or discolouration and may appear
                  less bright than premium quality screens. For your iPhone repair, we highly recommend not going for
                   the cheapest price in the city for this reason. At Chukkytech, you will be paying for premium quality parts 
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
   <button className="picckBtn  p-3" onClick={toggleVisibility}> {!isVisible ? "Select" : "Hide"} </button>
   
</div>



{isVisible && (
<div className="container">
	<header className="header">
		
	</header>
	<div className="form-wrap">
   <p id="description" className="text-center">
   Please provide required details and locate our store
		</p>	
		<form id="survey-form">
     
			<div className="row">

         <div className="col-md-6">
					<div className="form-group">
						<label>Phone model</label>
                  <input  required  id="name" placeholder="E.g Tecno bb2" className="form-control" />
						
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
			
			<div className="row">
				<div className="col-md-4">
				 <button className="picckBtn">Submit</button>
				</div>
			</div>

		</form>
	</div>	
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

<div className="container">
	<header className="header">
		
	</header>
	<div className="form-wrap">
   <p id="description" className="text-center">
   Please provide required details for pickup/delivery
   
		</p>	
		<form id="survey-form">
     
			<div className="row">

         <div className="col-md-6">
					<div className="form-group">
               <label>Samsung model</label>
               <input  required  id="name" placeholder="E.g Galaxy S8+" className="form-control" />
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
			
			<div className="row">
				<div className="col-md-4">
				 <button className="picckBtn">Submit</button>
				</div>
			</div>

		</form>
	</div>	
</div>
      )}



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

export default OtherPhonesDetails