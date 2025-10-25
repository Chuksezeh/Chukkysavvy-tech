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
import { useEffect } from 'react';
import Goback from '../layouts/goBack';
import ServicesComponent from './services-component';



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

<div className="wrapper">
 
    

   <div className="card" >
   <div onClick={handleDetailsIphone}>
		<h3 className="card-title" style={{fontWeight: 'bold', width: '250px'}}>Iphone</h3>
	<img className='card-mg' src={iphoneImage} />
	{/* <button className="card-btn">SELECT</button> */}
  </div>
	</div>
 
 
	<div className="card">
  <div  onClick={handleNavigateISamsung}>
		<h3 className="card-title" style={{fontWeight: 'bold'}}>Samsung</h3>
    <img className='card-mg' src={samsung}/>
		{/* <p className="card-content">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p> */}
	
    </div>
	</div>
  
	<div className="card" onClick={navigateIpad}>
    
		<h3 className="card-title" style={{fontWeight: 'bold'}}>Ipad</h3>
    <img className='' src={ipadImage}/>
		{/* <p className="card-content">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p> */}
		
	</div>
  <div className="card" onClick={navigateOtherPhones}>
		<h3 className="card-title" style={{fontWeight: 'bold'}}>Other phones</h3>
    <img className='' src={otherPhones}/>
		{/* <p className="card-content">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p> */}
		
	</div>
	<div className="card" onClick={navigateLaptopDetails}>
		<h3 className="card-title" style={{fontWeight: 'bold'}}>Laptops</h3>
	
		<img className='' src={laptop}/>
		
   
		{/* <p className="card-content">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p> */}
		{/* <button className="card-btn">SELECT</button> */}
	</div>
	
</div>


<ServicesComponent/>

<Footer/>


        
        </>
    )
})
export default BookingPage