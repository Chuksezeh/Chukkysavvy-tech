
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Header from '../layouts/Header';
import ipadImage from "../images/tab1.jpg"
import Footer from '../layouts/Footer';
import iphoneImage from '../images/iphone4.jpg';
import samsung from '../images/samsung.png';
import otherPhones from '../images/other-phones.jpg';
import laptop from '../images/laptops1.avif';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Goback from '../layouts/goBack';
import ServicesComponent from './services-component';
import "./body.css"



const BookingPage=(()=>{
const navigate = useNavigate()

const handleDetailsIphone = (()=>{
     navigate("/details-book-Iphone")
})

const handleNavigateISamsung = (()=>{
  navigate("/samsung-details")
})


const navigateIpad = (()=>{

  navigate("/ipad-details")
})

const navigateOtherPhones = (()=>{

  navigate("/other-phones-details")
})

const navigateLaptopDetails = (()=>{
navigate("/laptop-details")
})



const scrolltop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrolltop();
  }, []);


    return (
        <>
        <Header/>

            
<h1 className='respom '>I want to Fix</h1>
{/* <div style={{justifyContent:"start", textAlign:"start"}} className='container'> <Goback/></div> */}
<div className='fixText'> To get started on your repair, please select the option that closely matches your device </div>
<div className='fixlineDiv'>
  <div className='fixLine' ></div>
</div>

<div className="wrapper mobile-display-wrapper card-container" >
 
    
   <div className=" card-paper card-mobile" onClick={handleDetailsIphone}>
   <div >
		<h3 className="card-title" style={{fontWeight: 'bold', textAlign:"center"}}>
      Iphone
      </h3>
      <p></p>
      <p></p>
	<img className='card-mg mobile-image' src={iphoneImage} />
  </div>
	</div>
 
 
	<div className="card-paper card-mobile" onClick={handleNavigateISamsung}>
  <div  >
		<h3 className="card-title" style={{fontWeight: 'bold', textAlign:"center"}}>
      Samsung
      </h3>
       <p></p>
      <p></p>
    <img className='card-mg mobile-image' src={samsung}/>
	
    </div>
	</div>
  
	<div className="card-paper card-mobile" onClick={navigateIpad}>
    
		<h3 className="card-title" style={{fontWeight: 'bold', textAlign:"center"}}>
      Ipad
      </h3>
    <img className='mobile-image' src={ipadImage}/>
		
	</div>
  <div className="card-paper card-mobile" onClick={navigateOtherPhones}>
		<h3 className="card-title" style={{fontWeight: 'bold', textAlign:"center"}}>
      Other phones
      </h3>
    <img className='mobile-image' src={otherPhones}/>
		
	</div>
	<div className="card-paper card-mobile" onClick={navigateLaptopDetails}>
		<h3 className="card-title" style={{fontWeight: 'bold', textAlign:"center"}}>
      Laptops
      </h3>
	
		<img className='mobile-image' src={laptop}/>
		
   
	</div>
	
</div>


<ServicesComponent/>

<Footer/>


        
        </>
    )
})
export default BookingPage