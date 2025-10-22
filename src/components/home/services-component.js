import { Fade } from "react-awesome-reveal";
import image1 from "../images/ipHonwithperson.webp";
import image2 from "../images/laptop.jpeg";
import image3 from "../images/tab1.jpg";
import imagedev from "../images/perDeve.jpg";
import image4 from "../images/website.png";
import image5 from "../images/cartracking.jpg";
import { NavLink } from "react-router-dom";
import "./ServicesComponent.css";
import { 
  LiaHandPointRightSolid,
  LiaToolsSolid,
  LiaLaptopSolid 
} from "react-icons/lia";
import { 
  FaMobileAlt, 
  FaTabletAlt, 
  FaLaptop, 
  FaCode,
  FaArrowRight,
  FaCheckCircle,
  FaClock,
  FaShieldAlt
} from "react-icons/fa";

const ServicesComponent = () => {
  const services = [
    {
      id: 1,
      title: "Phone Repairs/Fixes",
      description: "Our experienced technicians, equipped with years of expertise, can handle most phone repairs on the same day. From cracked screens to charging issues, we have the specialized tools and knowledge to restore your device to top condition.",
      image: image1,
      features: [
        "Same-day repairs",
        "Cracked screen replacement",
        "Charging port fixes",
        "Liquid damage repair",
        "Speaker & microphone issues"
      ],
      icon: <FaMobileAlt />,
      color: "#4361ee"
    },
    {
      id: 2,
      title: "Tablet Repairs",
      description: "Our trained technicians are committed to restoring your tablet to its best condition. Most repairs can be completed the same day using state-of-the-art tools and in-depth knowledge.",
      image: image3,
      features: [
        "Display replacement",
        "Battery issues",
        "Charging problems",
        "Software troubleshooting",
        "Hardware repairs"
      ],
      icon: <FaTabletAlt />,
      color: "#4361ee"
    },
    {
      id: 3,
      title: "Laptop & Computer Repairs",
      description: "Our technicians with years of experience can repair many issues associated with your computer. We solve hardware and software-related issues with expertise and care.",
      image: image2,
      features: [
        "Hardware replacement",
        "Software installation",
        "Virus removal",
        "Performance upgrades",
        "Data recovery"
      ],
      icon: <FaLaptop />,
      color: "#4361ee"
    },
    {
      id: 4,
      title: "Software Development",
      description: "We specialize in building smart, efficient, and scalable software solutions tailored to meet your business or personal needs with cutting-edge technology.",
      image: imagedev,
      features: [
        "Website Design & Development",
        "Mobile App Development",
        "Custom Software Solutions",
        "E-commerce Platforms",
        "API Integration"
      ],
      icon: <FaCode />,
      color: "#4361ee"
    }
  ];

  return (
    <>
      {/* Services Header */}
      <div className="services-header">
        <div className="services-container">
          <Fade triggerOnce>
            <div className="services-intro">
              <div className="services-badge">
                <LiaToolsSolid className="badge-icon" />
                Our Services
              </div>
              <h1 className="services-title">Expert Repair & Development Services</h1>
              <p className="services-subtitle">
                Professional solutions for all your device repair and software development needs. 
                Fast, reliable, and backed by years of expertise.
              </p>
            </div>
          </Fade>
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-section">
        <div className="services-container">
          {services.map((service, index) => (
            <Fade key={service.id} triggerOnce delay={index * 100}>
              <div className={`service-card ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="service-image-container">
                  <div 
                    className="service-image"
                    style={{ 
                      backgroundImage: `url(${service.image})`,
                      borderColor: "#F8F8F8" 
                    }}
                  >
                    {/* <div className="service-overlay" style={{ backgroundColor: service.color }}></div> */}
                    <div className="service-icon" style={{ backgroundColor: service.color }}>
                      {service.icon}
                    </div>
                  </div>
                </div>
                
                <div className="service-content">
                  <div className="service-header">
                    <h2 className="service-title" style={{ color: service.color }}>
                      {service.title}
                    </h2>
                    <div className="service-features">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="feature-item">
                          <FaCheckCircle className="feature-icon" style={{ color: "white" }} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="service-body">
                    <p className="service-description">{service.description}</p>
                    
                    <div className="service-benefits">
                      <div className="benefit-item">
                        <FaClock className="benefit-icon" />
                        <span>Fast Service</span>
                      </div>
                      <div className="benefit-item">
                        <FaShieldAlt className="benefit-icon" />
                        <span>Quality Guarantee</span>
                      </div>
                      <div className="benefit-item">
                        <LiaToolsSolid className="benefit-icon" />
                        <span>Expert Technicians</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="service-footer">
                    <NavLink to="/bookingpage" className="service-cta-btn" style={{ backgroundColor: service.color }}>
                      <span>Book Service</span>
                      <FaArrowRight className="cta-icon" />
                    </NavLink>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="services-cta-section">
        <div className="services-container">
          <Fade triggerOnce>
            <div className="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>Book your repair or development project today and experience professional service</p>
              <div className="cta-buttons">
                <NavLink to="/bookingpage" className="cta-btn primary">
                  <FaMobileAlt />
                  Book Repair Service
                </NavLink>
                {/* <NavLink 
                // to="/software-development" 
                className="cta-btn secondary">
                  <FaCode />
                  Start Development Project
                </NavLink> */}
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default ServicesComponent;