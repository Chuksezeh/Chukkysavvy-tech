
import { IoMdSettings } from "react-icons/io"
import Footer from "../Footer"
import Header from "../Header"
import "./aboutUs.css"
import { MdAttachEmail, MdOutlineLocationOn } from "react-icons/md"
import { FaFacebook, FaInstagramSquare, FaTiktok } from "react-icons/fa"
import { IoLogoYoutube } from "react-icons/io5"
import { BsTwitterX } from "react-icons/bs";
import imageRepair from "../../images/microscoperepair.jpg"
import WhatsAppFloat from "../whatsappFloat/whatsAppFloat"

const AboutUs = (()=>{



    return(


        <>

        <Header/>
<br/>


<section className="contact-sec sec-pad">
  <div className="container" style={{padding:"10px"}}>
    <div className="row">
      <div className="col-md-6">
        <div className="contact-detail">
          <h1 className="section-title">Contact us</h1>

          <ul className="contact-ul">
            <li><i className="fa fa-location-dot"> <MdOutlineLocationOn />
            </i> 91, Ram Nagar, Ram Mandir, Delhi</li>

            <li>
              <i className="fa fa-phone"></i>
              <a href="tel:08510004495"> <b>08020653456</b> </a>,

              <a href="tel:08510005495"> <b>07035910938</b> </a>
            </li>

            <li>
              <i className=" "> <MdAttachEmail size={20}/>
              </i>
              <a href="mailto:pardeepkumar4bjp@gmail.com"><b> chukkytech001@gmail.com</b></a>
            </li>
          </ul>

          <span>
            <a href="https://www.facebook.com/chukkystarmedia/" className="fb" target="blank"><i className=""><FaFacebook />
            </i></a>
            <a href="https://www.tiktok.com/@chukwukap?_t=ZM-8wJtmPinCTt&_r=1" target="blank" className="tik"><i className=""><FaTiktok />
            </i></a>
            <a href="https://www.instagram.com/chukky_tech?igsh=ZHIybmhocGZ4c3Jw"target="blank" className="insta"><i className=""><FaInstagramSquare />
            </i></a>
            <a href="https://www.youtube.com/channel/UCs2Pew4i6lGiVkjTJEZ5o-g" target="blank" className="youtu"><i className=""><IoLogoYoutube />
            </i></a>
            <a href="https://x.com/chuksp6" target="blank" className="twitter"><i className=""> <BsTwitterX />
            </i></a>
          </span>
        </div>
      </div>

      <div className="col-md-6">
        <div className="imGDIv"> <img  className="imgRepA" src={imageRepair}/>   </div>
      </div>
    </div>
     </div>
     </section>


      <div className="aboutus-section">
        <div className="container">
            <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="aboutus">
                        <h2 className="aboutus-title">About Us</h2>
                        <p className="aboutus-text">At <strong>Chukkytech</strong> , we are committed to delivering top-tier gadget solutions tailored to meet the everyday needs of our customers.  Registered under corporate affairs commission with registration number <strong>7679854 </strong>,  founded and led by Chukwuka Paul Ezeh, a passionate tech enthusiast with years of hands-on experience in the tech and repair industry, Chukkytech has grown to become a trusted name in gadget repair, sales, and support services.</p>
                        <p className="aboutus-text">We specialize in the <strong> repair and sales of all kinds of gadgets</strong>—including <strong>smartphones, iPads, laptops, tablets, and other smart devices</strong> . Whether it's a cracked screen, a faulty motherboard, or software issues, our certified technicians use modern diagnostic tools 
                            and original replacement parts to ensure your device gets back to you in optimal condition.</p>
                        <p className="aboutus-text">To make things even more convenient, we offer <strong>doorstep pickup and delivery services</strong>  for repairs—so you don’t have to step out to fix your device. Just schedule a pickup, and our team will handle the rest, ensuring a smooth, secure, and timely service.

                    At Chukkytech, we don’t just fix gadgets—we provide peace of mind. From fast turnaround times and transparent updates to quality parts and exceptional customer care, we’re here to help you stay connected and productive.</p>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="aboutus-banner">
                        <img src="http://themeinnovation.com/demo2/html/build-up/img/home1/about1.jpg" alt=""/>
                    </div>
                </div>
                <div className="col-md-5 col-sm-6 col-xs-12">
                    <div className="feature">
                        <div className="feature-box">
                            <div className="clearfix">
                                <div className="iconset">
                                    <span className="glyphicon icon"><IoMdSettings size={40} />
                                    </span>
                                </div>
                                <div className="feature-content">
                                    <h4>Professional Service</h4>
                                    <p>We deliver expert repair solutions with 
                                        precision and attention to detail, ensuring your devices are handled by certified technicians.</p>
                                </div>
                            </div>
                        </div>
                        <div className="feature-box">
                            <div className="clearfix">
                                <div className="iconset">
                                <span className="glyphicon icon"><IoMdSettings size={40} />
                                </span>
                                </div>
                                <div className="feature-content">
                                    <h4>Reliable services</h4>
                                    <p>Count on us for consistent, high-quality service and timely updates throughout your device repair process.</p>
                                </div>
                            </div>
                        </div>
                        <div className="feature-box">
                            <div className="clearfix">
                                <div className="iconset">
                                <span className="glyphicon icon"><IoMdSettings size={40} />
                                </span>
                                </div>
                                <div className="feature-content">
                                    <h4>Great support</h4>
                                    <p>Our friendly and responsive support team is always ready to assist you with any questions or concerns—before, during, and after your repair.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</div> 

<WhatsAppFloat/>

<Footer/>
        
        
        </>
    )
})


export default AboutUs