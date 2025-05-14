import React from "react"
import "./layout.css"
import logos  from "../images/CHUKKY-BRAND-BACKGROUND.png";
import { IoCall } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { BsFillSendFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";




const Footer = () => {
    return (
        <>
   <footer className="footer-section">
        <div className="container">
            <div className="footer-cta pt-5 pb-5">
                <div className="row">
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="cta-text">
                                <h4>Find us</h4>
                                <span>Wuse 2, Fedral Capital Territory, Nigeria.</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i > <IoCall className="call-icon" size={30} /></i>
                            <div className="cta-text">
                                <h4>Call / Whatsapp us</h4>
                                <span>08020653456</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                        <i > <CiMail className="call-icon" size={30} /></i>  
                                                  <div className="cta-text">
                                <h4>Mail us</h4>
                              

                                <span>chukkytech001@gmail.com </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-content pt-5 pb-5">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 mb-50">
                        <div className="footer-widget">
                            <div className="footer-logo">
                                <a href="index.html"><img src={logos} className="img-fluid" alt="logo"/></a>
                            </div>
                            <div className="footer-text">
                                <p>Chukkytech specializes in high-quality gadget repairs and sales, offering reliable and efficient services. Customers can enjoy the convenience of door pickup and delivery for their devices, along with a real-time tracking system to monitor repair progress. Committed to excellence, Chukkytech uses only premium parts for repairs, ensuring lasting performance and satisfaction.</p>
                            </div>
                            <div className="footer-social-icon">
                                <span>Follow us</span>
                                <a href="https://www.facebook.com/chukkystarmedia" target="blank"><i className=""><FaFacebookF  size={30}/></i></a>
                                <a href="https://x.com/chuksp6"><i><FaXTwitter size={30} />
                                </i></a>
                                <a href="https://www.instagram.com/chukky_tech?igsh=ZHIybmhocGZ4c3Jw"><i ><FaInstagram  size={30}/>
                                </i></a>
                                <a href="https://www.youtube.com/channel/UCs2Pew4i6lGiVkjTJEZ5o-g"><i ><FaYoutube   size={30}/>
                                </i></a>

                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Useful Links</h3>
                            </div>
                            <ul>
                                <li><a href="/">Home</a></li>
                               
                                <li> <Link to="/privacy-policy"><a >Privacy policy</a></Link>  </li>
                               
                                <li><a href="/find-location">Find locations</a></li>
                                <li><a href="/">Our Services</a></li>
                                <li> <Link to="/terms-conditions">  <a >Terms & Condition</a></Link> </li>
                                <li><a href="/about-us">Contact us</a></li>
                                {/* <li><a href="#">Latest News</a></li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                        <div className="footer-widget">
                            <div className="footer-widget-heading">
                                <h3>Subscribe</h3>
                            </div>
                            <div className="footer-text mb-25">
                                <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                            </div>
                            <div className="subscribe-form">
                                <form action="#">
                                    <input type="text" placeholder="Email Address"/>
                                    <button><i className=""><BsFillSendFill />
                                    </i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="copyright-area">
            <div className="container">
                <div className="row">
                    <div className=" text-center ">
                        <div className="copyright-text" >
                            <p style={{textAlign:"center", justifyContent:"center"}}>Copyright &copy;{new Date().getFullYear()}, All Right Reserved <a >chukkytech</a></p>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    </footer>

        </>
    )
}

export default Footer