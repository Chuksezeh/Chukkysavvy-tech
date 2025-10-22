import { IoMdSettings } from "react-icons/io"
import Footer from "../Footer"
import Header from "../Header"
import "./aboutUs.css"
import { 
  MdAttachEmail, 
  MdOutlineLocationOn,
  MdSupportAgent,
  MdPrecisionManufacturing
} from "react-icons/md"
import { 
  FaFacebook, 
  FaInstagramSquare, 
  FaTiktok,
  FaShieldAlt,
  FaShippingFast,
  FaAward,
  FaUsers,
  FaTools
} from "react-icons/fa"
import { 
  IoLogoYoutube,
  IoCheckmarkCircle,
  IoStar
} from "react-icons/io5"
import { BsTwitterX } from "react-icons/bs";
import imageRepair from "../../images/microscoperepair.jpg"
import WhatsAppFloat from "../whatsappFloat/whatsAppFloat"
import { useEffect, useState } from "react"
import ReadMoreText from "../readMoreText"
import { Fade, Zoom } from "react-awesome-reveal"
import useGetData from "../../Utility/getFunction"

const AboutUs = (() => {
  const scrolltop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrolltop();
  }, []);

  const features = [
    {
      icon: <MdPrecisionManufacturing />,
      title: "Professional Service",
      description: "We deliver expert repair solutions with precision and attention to detail, ensuring your devices are handled by certified technicians.",
      color: "#4361ee"
    },
    {
      icon: <FaShieldAlt />,
      title: "Reliable Services",
      description: "Count on us for consistent, high-quality service and timely updates throughout your device repair process.",
      color: "#06d6a0"
    },
    {
      icon: <MdSupportAgent />,
      title: "Great Support",
      description: "Our friendly and responsive support team is always ready to assist you with any questions or concerns—before, during, and after your repair.",
      color: "#ff6b6b"
    },
    {
      icon: <FaShippingFast />,
      title: "Doorstep Service",
      description: "We come to you! Free pickup and delivery service for all repairs within our service areas.",
      color: "#ff9e1c"
    }
  ];

  const stats = [
    { number: "5,000+", label: "Devices Repaired" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Customer Support" },
    { number: "90+", label: "Days Warranty" }
  ];



  const {data, isPending, error} = useGetData("general/getGeneralSettings");

  const generalData = data?.data;


  return (
    <section className="about-body-show">

      <Header />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-container">
          <Fade triggerOnce>
            <div className="about-hero-content">
              <div className="about-badge">
                <FaAward className="badge-icon" />
                About ChukkyTech
              </div>
              <h1 className="about-hero-title">
                Trusted Tech Solutions Since Day One
              </h1>
              <p className="about-hero-subtitle">
                Your reliable partner for all gadget repair, sales, and support services
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* Contact & Intro Section */}
      <section className="contact-intro-section">
        <div className="about-container">
          <div className="contact-intro-grid">
            <Fade triggerOnce direction="left">
              <div className="contact-card">
                <div className="contact-header">
                  <h2>Get In Touch</h2>
                  <p>We're here to help with all your tech needs</p>
                </div>
                
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <MdOutlineLocationOn />
                    </div>
                    <div className="contact-details">
                      <h4>Visit Us</h4>
                      <p> {generalData?.locationMainAddress} </p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <FaTools />
                    </div>
                    <div className="contact-details">
                      <h4>Call Us</h4>
                      <a href={generalData?.customerSupportPhoneNumber}>  {generalData?.customerSupportPhoneNumber} </a>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <MdAttachEmail />
                    </div>
                    <div className="contact-details">
                      <h4>Email Us</h4>
                      <a href="mailto:support@chukkytech.ng"> {generalData?.customerSupportEmail} </a>
                    </div>
                  </div>
                </div>

                <div className="social-links">
                  <h4>Follow Us</h4>
                  <div className="social-icons">
                    <a href="https://www.facebook.com/chukkystarmedia/" className="social-link fb" target="_blank" rel="noopener noreferrer">
                      <FaFacebook />
                    </a>
                    <a href="https://www.tiktok.com/@chukwukap" className="social-link tik" target="_blank" rel="noopener noreferrer">
                      <FaTiktok />
                    </a>
                    <a href="https://www.instagram.com/chukky_tech" className="social-link insta" target="_blank" rel="noopener noreferrer">
                      <FaInstagramSquare />
                    </a>
                    <a href="https://www.youtube.com/channel/UCs2Pew4i6lGiVkjTJEZ5o-g" className="social-link youtu" target="_blank" rel="noopener noreferrer">
                      <IoLogoYoutube />
                    </a>
                    <a href="https://x.com/chuksp6" className="social-link twitter" target="_blank" rel="noopener noreferrer">
                      <BsTwitterX />
                    </a>
                  </div>
                </div>
              </div>
            </Fade>

            <Fade triggerOnce direction="right">
              <div className="intro-image">
                <div className="image-container">
                  <img src={imageRepair} alt="Professional Device Repair" className="intro-img" />
                  <div className="image-overlay">
                    <div className="experience-badge">
                      <FaAward />
                      <span>Trusted Since 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="about-content-section">
        <div className="about-container">
          <div className="about-content-grid">
            <Fade triggerOnce>
              <div className="about-text-content">
                <div className="section-header">
                  <h2>Our Story</h2>
                  <div className="accent-line"></div>
                </div>
                
                <div className="about-description">
                  <p>
                    At <strong>Chukkytech</strong>, we are committed to delivering top-tier gadget solutions
                    tailored to meet the everyday needs of our customers. Registered under corporate affairs 
                    commission with registration number <strong>7679854</strong>, founded and led by Chukwuka 
                    Paul Ezeh, a passionate tech enthusiast with years of hands-on experience in the tech and 
                    repair industry.
                  </p>
                  
                  <p>
                    Chukkytech has grown to become a trusted name in gadget repair, sales, and support services. 
                    We specialize in the repair and sales of all kinds of gadgets—including smartphones, iPads, 
                    laptops, tablets, and other smart devices.
                  </p>

                  <div className="highlight-box">
                    <IoCheckmarkCircle className="highlight-icon" />
                    <p>
                      Whether it's a cracked screen, a faulty motherboard, or software issues, our certified 
                      technicians use modern diagnostic tools and original replacement parts to ensure your 
                      device gets back to you in optimal condition.
                    </p>
                  </div>

                  <p>
                    To make things even more convenient, we offer doorstep pickup and delivery services for 
                    repairs—so you don't have to step out to fix your device. Just schedule a pickup, and our 
                    team will handle the rest, ensuring a smooth, secure, and timely service.
                  </p>

                  <p className="closing-statement">
                    At Chukkytech, we don't just fix gadgets—we provide peace of mind. From fast turnaround 
                    times and transparent updates to quality parts and exceptional customer care, we're here 
                    to help you stay connected and productive.
                  </p>
                </div>
              </div>
            </Fade>

            <Fade triggerOnce delay={200}>
              <div className="features-section">
                <div className="section-header">
                  <h2>Why Choose Us</h2>
                  <div className="accent-line"></div>
                </div>
                
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <div 
                        className="feature-icon-wrapper"
                        style={{ backgroundColor: feature.color }}
                      >
                        {feature.icon}
                      </div>
                      <h4 className="feature-title">{feature.title}</h4>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="about-container">
          <Fade triggerOnce>
            <div className="section-header centered" style={{display:"center", justifyContent:"center"}}>
              <h2>Our Impact in Numbers</h2>
              <p style={{display:"center", width:"100%"}}>Delivering excellence across every service</p>
            </div>
          </Fade>
          
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <Zoom key={index} triggerOnce delay={index * 100}>
                <div className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </Zoom>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-container">
          <Fade triggerOnce>
            <div className="cta-content">
              <h2>Ready to Experience Professional Service?</h2>
              <p>Join thousands of satisfied customers who trust us with their devices</p>
              <div className="cta-buttons">
                <a href="/bookingpage" className="cta-btn primary">
                  <FaTools />
                  Book a Repair
                </a>
                <a href="tel:08020653456" className="cta-btn secondary">
                  <FaUsers />
                  Call Now
                </a>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      <WhatsAppFloat />
      <Footer />
    </section>
  );
});

export default AboutUs;