import { Fade } from "react-awesome-reveal";
import image1 from "../images/PHONE.jpg";
import image2 from "../images/laptop.jpeg";
import image3 from "../images/tab1.jpg";
import imagedev from "../images/perDeve.jpg";
import image4 from "../images/website.png";
 import image5 from "../images/cartracking.jpg";
import { NavLink } from "react-router-dom";
import { LiaHandPointRightSolid } from "react-icons/lia";



const ServicesComponent = ()=>{
    return (
        <>
         <div className="our-solution-text">
      <h2>
        OUR SERVICES
      </h2>
      <div className="oursolutions-line"></div>
      </div>   
            <div className="body3-container-all">
                <Fade>
                    <div className="body3-main">
                        <div className="body3-image-div">
                            <h2 className="tittle-text">Phone Repairs/Fixes</h2>
                            <img src={image1} className="body3-img1" />
                        </div>
                        <div className="body3-text-div">
                        Our experienced technicians, equipped with years of expertise, can handle most phone 
                        repairs on the same day. From cracked front glass and broken display screens to issues
                         with liquid damage, charging problems, and mic or speaker malfunctions, we have the
                          specialized tools and knowledge to restore your device to top condition. Whether your
                           phone needs a simple fix or a more complex repair,
                         we're here to help. Book your same-day phone repair with us today and experience fast,
                          reliable service you can trust! <br/><b/> <br/><b/>
                          <div className="jkBTn">
                            <NavLink to='/bookingpage' className="navlink-button" > <button className="button-43" role="button">
                                Book Now
                            </button></NavLink>
                            </div>
                            


                        </div>

                    </div>
                </Fade>
             </div>


             <div className="body3-container-all">
                <Fade>
                    <div className="body3-main">
                       <div className="body3-image-div centerTextDiVImage showMobSize ">
                            <h2 className="tittle-text">Tablet Fixes</h2>
                            <img src={image3} className="body3-img1" />
                        </div>
                        <div className="body3-text-div centerTextDiV">
                        Our trained technicians, equipped with years of hands-on experience, are 
                        committed to restoring your iPad to its best condition. Most iPad repairs
                         can be completed the very same day, ensuring minimal downtime for you. 
                         Using state-of-the-art tools and in-depth knowledge, we provide solutions 
                         for a wide range of iPad issues, including: Broken Display Screen, Charging 
                         
                         Issues, Microphone and Speaker Malfunctions, Cracked Front Glass and more.
                          Book your same-day iPad repair today and experience efficient, expert service tailored to meet all your repair needs!

                        <br/><b/> <br/><b/>
                        <div className="jkBTn">
                       <NavLink to='/bookingpage' className="navlink-button" > <button className="button-43" role="button">
                                Book Now
                            </button></NavLink>
                            </div>
                            </div>
                            <div className="body3-image-div centerTextDiVImage hideMobSize seeAdjustImage">
                            <h2 className="tittle-text">Tablet Fixes</h2>
                            <img src={image3} className="body3-img1" />
                        </div>

                    </div>
                </Fade>
             </div>


            

           <div className="body3-container-all">
                <Fade>
                    <div className="body3-main">
                    <div className="body3-image-div">
                            <h2 className="tittle-text">System/Laptop Repairs/Fixes</h2>
                            <img src={image2} className="body3-img1" />
                        </div>
                        <div className="body3-text-div">
                        Our trained technicians with years of experience can repair many issues 
                        associated with your computer. We will go above and beyond to solve all
                         your computer’s hardware or software-related issues. We can help with 
                         corrupted operating systems, software issues, failed hardware components, 
                         computer upgrades for slow computers, and more! Book a computer repair today! <br/><b/> <br/><b/>
                           <div className="jkBTn"> 
                            <NavLink to='/bookingpage' className="navlink-button" > <button className="button-43" role="button">
                                Book Now
                            </button></NavLink>

                            </div>


                        </div>

                    </div>
                </Fade>
             </div>

           
             <div className="body3-container-all">
                <Fade>
                    <div className="body3-main">
                       <div className="body3-image-div centerTextDiVImage showMobSize ">
                            <h2 className="tittle-text">Tablet Fixes</h2>
                            <img src={imagedev} className="body3-img1" />
                        </div>
                        <div className="body3-text-div centerTextDiV">
                        At Chukkytech, we specialize in building smart, efficient, and scalable software solutions tailored to meet
                         your business or personal needs. Whether you're a startup, 
                        a growing business, or an individual with a brilliant idea, our team is here to bring your 
                        vision to life with cutting-edge technology.
                       
                        <ul>
                            <li> <LiaHandPointRightSolid /> Website Design & Development
                            From sleek, modern landing pages to full-fledged business websites, we craft engaging web experiences that reflect your brand.</li>
                            <li><LiaHandPointRightSolid />   Mobile App Development
                            Reach your customers on-the-go with intuitive Android and iOS applications that are fast, responsive, and beautifully designed. </li>
                        </ul>
                        
                        

                        <br/><b/> <br/><b/>
                      
                            </div>
                            <div className="body3-image-div centerTextDiVImage hideMobSize seeAdjustImage">
                            <h2 className="tittle-text">Software Development </h2>
                            <img src={imagedev} className="body3-img1" />
                        </div>

                    </div>
                </Fade>
             </div>


           

 
 
       

        </>
    ) 
}
export default ServicesComponent