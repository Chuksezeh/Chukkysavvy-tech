import React, { useEffect } from "react";
import Header from "../Header"
import "./findLocation.css"
import { 
  GiPhone, 
  GiSmartphone,
  GiPositionMarker 
} from "react-icons/gi";
import { 
  IoPhoneLandscape, 
  IoPhonePortraitSharp,
  IoLocationSharp,
  IoTimeSharp,
  IoCallSharp
} from "react-icons/io5";
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaPhoneAlt,
  FaStore,
  FaCarSide,
  FaDirections
} from "react-icons/fa";
import useGetData from "../../Utility/getFunction";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

const FindLocation = (() => {
  const { data, isPending, error } = useGetData("location/getAllLocations");
  const navigate = useNavigate();

  const scrolltop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrolltop();
  }, []);

  // Function to open directions in Google Maps
 const openDirections = (location) => {
  const { latitude, longitude, locationAddress, locationName } = location;

  // Prefer accurate coordinates if available
  const hasValidCoords =
    latitude && longitude &&
    latitude !== "1234737744" &&
    longitude !== "1234737744";

  if (hasValidCoords) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
    return;
  }

  // Fallback to address
  if (locationAddress || locationName) {
    const encodedAddress = encodeURIComponent(
      `${locationAddress || ""} ${locationName || ""}`
    );
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(url, "_blank");
    return;
  }

  alert("Location information not available for directions.");
};


  // Function to open native maps app on mobile
 const openNativeMaps = (location) => {
  const { latitude, longitude, locationAddress, locationName } = location;

  const hasValidCoords =
    latitude && longitude &&
    latitude !== "1234737744" &&
    longitude !== "1234737744";

  // iPhone maps link
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (hasValidCoords) {
    const coords = `${latitude},${longitude}`;
    if (isIOS) {
      window.open(`http://maps.apple.com/?daddr=${coords}`);
    } else {
      window.open(`https://maps.google.com/maps?daddr=${coords}`);
    }
    return;
  }

  // fallback to address
  const encoded = encodeURIComponent(`${locationAddress || ""} ${locationName || ""}`);

  if (isIOS) {
    window.open(`http://maps.apple.com/?daddr=${encoded}`);
  } else {
    window.open(`https://maps.google.com/maps?daddr=${encoded}`);
  }
};


  // Function to handle direction button click
  const handleGetDirections = (location) => {
    // Check if we're on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile, give user choice between native app and web
      if (window.confirm('Open directions in maps app?')) {
        openNativeMaps(location);
      } else {
        openDirections(location);
      }
    } else {
      // On desktop, open web version
      openDirections(location);
    }
  };

  // Function to handle phone call
  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  // Function to handle online booking
  const handleBookOnline = () => {
    navigate('/bookingpage'); // Adjust the route as needed
  };

  // Function to handle pickup call
  const handleCallPickup = () => {
    // You can set a default number or let users choose from locations
    const defaultNumber = "08020653456"; // You can make this dynamic
    handleCall(defaultNumber);
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="locations-hero">
        <div className="locations-container">
          <div className="locations-content">
            <div className="locations-badge">
              <GiPositionMarker className="badge-icon" />
              Our Service Centers
            </div>
            <h1 className="locations-title">Find Our Service Centers</h1>
            <p className="locations-subtitle">
              Visit us in person or book online for convenient pickup and delivery service
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="intro-section">
        <div className="locations-container">
          <div className="intro-content">
            <div className="intro-text">
              <h2>Convenient Repair Services Near You</h2>
              <p>
                Here are our active service centers, in case you'd like to visit us in person.
                But if you're too busy or can't make it, no worries — we're just one click away!
              </p>
              <p>
                Book a repair online, and we'll pick up your device, diagnose the issue, fix it promptly, 
                and deliver it back to you — all without you leaving your home or office.
              </p>
              <p className="highlight-text">
                With our tracking system, you can monitor the repair progress every step of the way, 
                right up until we deliver your device.
              </p>
              <p className="cta-text">
                Try us today and experience fast, reliable, and convenient repair service!
              </p>
            </div>
            <div className="intro-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaCarSide />
                </div>
                <div className="feature-content">
                  <h4>Pickup & Delivery</h4>
                  <p>We come to you for device collection and return</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <GiSmartphone />
                </div>
                <div className="feature-content">
                  <h4>Online Booking</h4>
                  <p>Schedule repairs from anywhere, anytime</p>
                </div>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <FaDirections />
                </div>
                <div className="feature-content">
                  <h4>Easy Directions</h4>
                  <p>Get turn-by-turn navigation to our centers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="locations-section">
        <div className="locations-container">
          <div className="section-header">
            <h2>Our Service Centers</h2>
            <p>Find the nearest location to visit us in person</p>
          </div>

          {isPending ? (
            <div className="locations-loading">
              <div className="loading-grid">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="location-card-skeleton">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-content">
                      <div className="skeleton-line skeleton-title"></div>
                      <div className="skeleton-line skeleton-text"></div>
                      <div className="skeleton-line skeleton-text"></div>
                      <div className="skeleton-line skeleton-phone"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="locations-error">
              <div className="error-content">
                <GiPositionMarker size={64} className="error-icon" />
                <h3>Unable to Load Locations</h3>
                <p>Please check your connection and try again</p>
              </div>
            </div>
          ) : (
            <div className="locations-grid">
              {data.map((item, index) => (
                <div key={index} className="location-card">
                  <div className="card-header">
                    <div className="location-badge">
                      <FaStore className="location-icon" />
                    </div>
                    <div className="location-meta">
                      <span className="location-number">#{index + 1}</span>
                      <span className={`status-badge ${item.status?.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <h3 className="location-name">{item.locationName}</h3>
                    <p className="shop-name">{item.shopName}</p>
                    
                    <div className="location-details">
                      <div className="detail-item">
                        <div className="detail-icon">
                          <FaMapMarkerAlt />
                        </div>
                        <div className="detail-content">
                          <span className="detail-label">Address</span>
                          <p className="detail-value">{item.locationAddress}</p>
                          {(item.latitude && item.longitude && item.latitude !== "1234737744" && item.longitude !== "1234737744") && (
                            <small className="coordinates-available">
                              📍 Coordinates available
                            </small>
                          )}
                        </div>
                      </div>
                      
                      <div className="detail-item">
                        <div className="detail-icon">
                          <FaPhoneAlt />
                        </div>
                        <div className="detail-content">
                          <span className="detail-label">Phone Number</span>
                          <p className="detail-value phone-number">
                            <GiSmartphone className="phone-icon" />
                            {item.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-footer">
                    <button 
                      className="direction-btn"
                      onClick={() => handleGetDirections(item)}
                      title="Get directions to this location"
                    >
                      <FaDirections />
                      Get Directions
                    </button>
                    <button 
                      className="call-btn"
                      onClick={() => handleCall(item.phone)}
                      title={`Call ${item.phone}`}
                    >
                      <IoCallSharp />
                      Call Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="locations-container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Can't Visit Our Center?</h2>
              <p>We'll come to you! Book our pickup and delivery service</p>
            </div>
            <div className="cta-actions">
              <button 
                className="cta-btn primary"
                onClick={handleBookOnline}
              >
                <GiSmartphone />
                Book Repair Online
              </button>
              <button 
                className="cta-btn secondary"
                onClick={handleCallPickup}
              >
                <FaPhoneAlt />
                Call for Pickup
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
})

export default FindLocation