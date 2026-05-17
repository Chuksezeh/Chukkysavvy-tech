import React from "react"
import { NavLink } from "react-router-dom";
import { FaArrowRight, FaShoppingCart, FaTools, FaShieldAlt, FaTruck, FaCheckCircle } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import heroImage from "../images/pcd8kdjm1j731i0nsa91q4hcpu.png"
import "./hero-section.css"
import { MdPhoneIphone } from "react-icons/md";

const LandingHero = () => {
  const trackEvent = (label) => {
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Button',
        event_label: label,
        value: 1,
      });
    }
  };

  return (
    <section className="landing-hero-section">
      {/* Background Elements */}
      <div className="hero-background-elements">
        <div className="hero-grid-overlay"></div>
        <div className="hero-floating-icons">
          <div className="floating-icon icon-1"><MdPhoneIphone />
 </div>
          <div className="floating-icon icon-2">💻</div>
          <div className="floating-icon icon-3">🔧</div>
          <div className="floating-icon icon-4">🔧</div>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content-wrapper">
          {/* Text Content */}
          <div className="hero-text-content">
            {/* <div className="hero-badge-container">
              <span className="hero-trust-badge">
                <FaShieldAlt className="badge-icon" />
                Trusted Tech Solutions Since 2020
              </span>
            </div> */}

            <div className="hero-heading-group">
              <h1 className="hero-main-heading">
                <span className="hero-heading-accent">Broken Device?</span> We 
                <span className="hero-heading-highlight"> Fix</span>, 
                <span className="hero-heading-highlight"> Sell</span>, & 
                <span className="hero-heading-highlight"> Deliver</span>
              </h1>
              <p className="hero-subheading">
                Professional repairs, premium devices, and doorstep delivery — 
                all your tech needs covered in one place.
              </p>
            </div>


               <div className="wht-show-home"> ...What are we doing today?</div>
             <div className="hero-actions-section">
              <NavLink 
                to='/bookingpage' 
                className="hero-cta-btn hero-cta-btn--repair"
                onClick={() => trackEvent('Repair A Device - Hero')}
              >
                <div className="cta-btn-content">
                  <div className="cta-icon-wrapper">
                    <FaTools className="cta-icon" />
                    <div className="cta-icon-glow"></div>
                  </div>
                  <div className="cta-text-group">
                    <span className="cta-main-text">Repair  Device</span>
                    <span className="cta-sub-text">Professional Service</span>
                  </div>
                  <div className="cta-arrow-wrapper">
                    <FaArrowRight className="cta-arrow" />
                    <div className="cta-arrow-trail"></div>
                  </div>
                </div>
                <div className="cta-btn-hover-effect"></div>
              </NavLink>

              <NavLink 
                to='/buy-products' 
                className="hero-cta-btn hero-cta-btn--buy"
                onClick={() => trackEvent('Buy A Device - Hero')}
              >
                <div className="cta-btn-content">
                  <div className="cta-icon-wrapper">
                    <FaShoppingCart className="cta-icon" />
                    <div className="cta-icon-sparkle">✨</div>
                  </div>
                  <div className="cta-text-group">
                    <span className="cta-main-text">Buy A Device</span>
                    <span className="cta-sub-text">Quality Guaranteed</span>
                  </div>
                  <div className="cta-arrow-wrapper">
                    <FaArrowRight className="cta-arrow" />
                    <div className="cta-arrow-trail"></div>
                  </div>
                </div>
                <div className="cta-btn-hover-effect"></div>
              </NavLink>
            </div>

            {/* Key Benefits */}
            <div className="hero-benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaTools />
                </div>
                <div className="benefit-content">
                  <h4 className="benefit-title-strong">Same-Day Repair</h4>
                  <p>Most repairs completed within hours</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaCheckCircle />
                </div>
                <div className="benefit-content">
                  <h4>Quality Guaranteed</h4>
                 <p>Quality is our priority</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FaTruck />
                </div>
                <div className="benefit-content">
                  <h4>Door Delivery</h4>
                  <p>Within city limits</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <RiCustomerService2Fill />
                </div>
                <div className="benefit-content">
                  <h4>24/7 Support</h4>
                  <p>Always here to help</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
           

            {/* Trust Indicators */}
            {/* <div className="hero-trust-indicators">
              <div className="trust-stats">
                <div className="trust-stat">
                  <div className="stat-num">8,000+</div>
                  <div className="stat-label">Devices Repaired</div>
                </div>
                <div className="trust-stat">
                  <div className="stat-num">98%</div>
                  <div className="stat-label">Satisfaction Rate</div>
                </div>
                <div className="trust-stat">
                  <div className="stat-num">24h</div>
                  <div className="stat-label">Average Repair Time</div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Visual Content */}
          <div className="hero-visual-content">
            <div className="hero-image-container">
              <div className="hero-image-wrapper">
                <img
                  src={heroImage}
                  alt="Professional device repair service showing technicians working on smartphones and laptops"
                  className="hero-main-image"
                />
                
             

                {/* Quality Badge */}
                <div className="quality-badge">
                  <div className="badge-content">
                    <FaCheckCircle className="badge-check" />
                    <div className="badge-text">
                      <span>Certified</span>
                      <span>Technicians</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Tags */}
              <div className="service-tags">
                <span className="service-tag">iPhone Repair</span>
                <span className="service-tag">Samsung Repair</span>
                <span className="service-tag">Laptop Repair</span>
                {/* <span className="service-tag">Data Recovery</span> */}
                <span className="service-tag">Tablet Repair</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingHero;



