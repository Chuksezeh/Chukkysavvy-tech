import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./navTrackRepair.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ServicesComponent from "../../home/services-component";
import Footer from "../Footer";
import { 
  FaClipboardList, 
  FaTruckPickup, 
  FaTools, 
  FaTruckMoving, 
  FaCheckCircle,
  FaSearch,
  FaExclamationTriangle,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';
import { IoCheckmarkDoneOutline, IoCloseCircle } from "react-icons/io5";
import moment from "moment";
import { chukkytechAxios } from "../../Utility/axios";
import logo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"

const NavtrackRepair = () => {
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [showNoRepair, setShowNoRepair] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [isPendingTracking, setIsPendingTracking] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const scrolltop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrolltop();
  }, []);

  const navigate = useNavigate();

  const handleCloseTrackOrder = () => {
    setShowTrackOrder(false);
    setError("");
  };

  const handleCloseNoRepair = () => {
    setShowNoRepair(false);
    setError("");
  };

  const handleGetCode = (e) => {
    setOrderCode(e.target.value);
    setError("");
  };

  const handleShowTrackOrder = async (e) => {
    e.preventDefault();
    
    if (!orderCode.trim()) {
      setError("Please enter a valid repair order code");
      return;
    }

    setIsPendingTracking(true);
    setError("");

    try {
      const response = await chukkytechAxios.get(`repair/getRepairOrderCode/${orderCode.trim()}`);
      const repairData = response.data;
      setData(repairData);

      const latestOrdersMap = repairData.repairOrders?.reduce((acc, order) => {
        if (
          !acc[order.repairOrderCode] ||
          new Date(order.createdDateTime) > new Date(acc[order.repairOrderCode].createdDateTime)
        ) {
          acc[order.repairOrderCode] = order;
        }
        return acc;
      }, {}) || {};

      const latestOrders = Object.values(latestOrdersMap);
      const firstOrder = latestOrders[0];

      if (!firstOrder) {
        setError("No repair order found with this code");
        return;
      }

      if (firstOrder?.status === "irreparable" || firstOrder?.status === "cancel") {
        setShowNoRepair(true);
        setShowTrackOrder(false);
      } else {
        setShowTrackOrder(true);
        setShowNoRepair(false);
      }

    } catch (error) {
      console.error("Error fetching tracking:", error);
      setError("Invalid repair order code or network error");
    } finally {
      setIsPendingTracking(false);
    }
  };

  const repairOrders = data?.repairOrders || [];
  const getRepairData = repairOrders[0];

  // Sort and get latest status
  const sortedOrders = [...repairOrders].sort(
    (a, b) => new Date(a.createdDateTime) - new Date(b.createdDateTime)
  );
  const latestOrder = sortedOrders[sortedOrders.length - 1];

  const stages = [
    { name: "Order Placed", status: "Processing", icon: <FaClipboardList />, date: null, description: "Your repair order has been received" },
    { name: "Device Picked Up", status: "pickedUp", icon: <FaTruckPickup />, date: null, description: "Your device has been collected" },
    { name: "Repair in Progress", status: "fixing", icon: <FaTools />, date: null, description: "Our technicians are working on your device" },
    { name: "Repair Completed", status: "fixed", icon: <FaTruckMoving />, date: null, description: "Your device has been repaired" },
    { name: "Ready for Delivery", status: "delivered", icon: <FaCheckCircle />, date: null, description: "Your device is ready for delivery" },
    { name: "Order Settled", status: "settled", icon: <IoCheckmarkDoneOutline />, date: null, description: "Repair process completed" },
  ];

  const updatedStages = stages.map((stage) => {
    const matchingOrder = sortedOrders.find((order) => order.status === stage.status);
    const isCompleted = matchingOrder ? true : false;
    const isActive = latestOrder?.status === stage.status;
    
    return {
      ...stage,
      date: matchingOrder ? matchingOrder.createdDateTime : null,
      isActive,
      isCompleted,
    };
  });

  const latestOrdersMap = repairOrders.reduce((acc, order) => {
    if (
      !acc[order.repairOrderCode] ||
      new Date(order.createdDateTime) > new Date(acc[order.repairOrderCode].createdDateTime)
    ) {
      acc[order.repairOrderCode] = order;
    }
    return acc;
  }, {});
  
  const latestOrders = Object.values(latestOrdersMap);
  const firstOrder = latestOrders[0];

  const getStatusColor = (status) => {
    const colors = {
      Processing: "#4361ee",
      pickedUp: "#ff9f1c",
      fixing: "#ff6b6b",
      fixed: "#06d6a0",
      delivered: "#118ab2",
      settled: "#073b4c",
      irreparable: "#ef476f",
      cancel: "#6c757d"
    };
    return colors[status] || "#4361ee";
  };

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <div className="tracking-hero">
        <div className="tracking-container">
          <div className="tracking-content">
            <div className="tracking-badge">
              <FaClock className="badge-icon" />
              Track Repair
            </div>
            <h1 className="tracking-title">Track Your Device Repair Progress</h1>
            <p className="tracking-subtitle">
              Enter your repair order code below to get real-time updates on your device repair status
            </p>
            
            <form className="tracking-form" onSubmit={handleShowTrackOrder}>
              <div className="form-group">
                <div className="input-wrapper">
                  <FaSearch className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter your repair order code (e.g., ROC-12345)..."
                    value={orderCode}
                    onChange={handleGetCode}
                    className="tracking-input"
                    required
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
              </div>
              
              <button
                type="submit"
                className="tracking-button"
                disabled={isPendingTracking}
              >
                {isPendingTracking ? (
                  <>
                    <div className="button-spinner"></div>
                    Tracking...
                  </>
                ) : (
                  <>
                    <FaSearch />
                    Track Order
                  </>
                )}
              </button>
            </form>

            <div className="tracking-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <FaClock />
                </div>
                <div className="feature-text">
                  <h4>Real-time Updates</h4>
                  <p>Get instant status updates</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="feature-text">
                  <h4>Progress Tracking</h4>
                  <p>Follow each repair stage</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <FaPhoneAlt />
                </div>
                <div className="feature-text">
                  <h4>Support</h4>
                  <p>Help when you need it</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServicesComponent />

      {/* Tracking Progress Modal */}
      <Modal show={showTrackOrder} onHide={handleCloseTrackOrder} size="lg" centered className="tracking-modal">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            <div className="modal-title-content">
              <FaClock className="modal-title-icon" />
              Repair Progress Tracking
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          {isPendingTracking ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading tracking information...</p>
            </div>
          ) : repairOrders.length === 0 ? (
            <div className="no-order-state">
              <FaExclamationTriangle className="no-order-icon" />
              <h4>Order Not Found</h4>
              <p>We couldn't find a repair order associated with this code. Please double-check the code and try again.</p>
            </div>
          ) : (
            <div className="tracking-details">
              {/* Order Header */}
              <div className="order-header-section">
                <div className="order-badge">
                  <img src={logo} alt="Chukkytech" className="order-logo" />
                </div>
                <div className="order-info">
                  <h3>{getRepairData?.deviceType} {getRepairData?.deviceModel}</h3>
                  <p className="order-code">Order: #{getRepairData?.repairOrderCode}</p>
                  <div className="order-meta">
                    <span className="order-date">
                      <FaClock />
                      Created: {moment(getRepairData?.createdDateTime).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="progress-timeline-track">
                <h4 className="timeline-title">Repair Progress</h4>
                <div className="timeline-track">
                  {updatedStages.map((stage, index) => (
                    <div key={index} className={`timeline-item ${stage.isCompleted ? 'completed' : ''} ${stage.isActive ? 'active' : ''}`}>
                      <div className="timeline-marker">
                        <div className="marker-icon">
                          {stage.icon}
                        </div>
                        {index < updatedStages.length - 1 && (
                          <div className="timeline-connector"></div>
                        )}
                      </div>
                      <div className="timeline-content">
                        <div className="stage-header">
                          <h5 className="stage-name">{stage.name}</h5>
                          {stage.isActive && <span className="current-badge">Current</span>}
                        </div>
                        <p className="stage-description">{stage.description}</p>
                        <p className="stage-date">
                          {stage.date ? (
                            <span className="date-completed">
                              Completed: {moment(stage.date).format("MMM D, YYYY [at] h:mm A")}
                            </span>
                          ) : (
                            <span className="date-pending">Pending</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Section */}
              <div className="support-section">
                <div className="support-card">
                  <FaPhoneAlt className="support-icon" />
                  <div className="support-content">
                    <h5>Need Help?</h5>
                    <p>Contact our support team for assistance with your repair order</p>
                    <Button variant="outline-primary" size="sm">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* No Repair/Cancelled Modal */}
      <Modal show={showNoRepair} onHide={handleCloseNoRepair} size="lg" centered className="status-modal">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>
            <div className="modal-title-content">
              <IoCloseCircle className="modal-title-icon error" />
              Repair Status Update
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-custom">
          {firstOrder && (
            <div className="status-details">
              {/* Order Header */}
              <div className="order-header-section">
                <div className="order-badge">
                  <img src={logo} alt="Chukkytech" className="order-logo" />
                </div>
                <div className="order-info">
                  <h3>{firstOrder?.deviceType} {firstOrder?.deviceModel}</h3>
                  <p className="order-code">Order: #{firstOrder?.repairOrderCode}</p>
                  <div className={`status-badge ${firstOrder?.status}`}>
                    {firstOrder?.status === "cancel" ? "Cancelled" : "Unrepairable"}
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className="status-message-track">
                {firstOrder?.status === "cancel" ? (
                  <>
                    <div className="status-icon cancelled">
                      <IoCloseCircle />
                    </div>
                    <h4>Repair Order Cancelled</h4>
                    <p>
                      We regret to inform you that your repair order has been canceled. 
                      If you need further assistance or have any questions, please don't 
                      hesitate to reach out to our support team.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="status-icon irreparable">
                      <FaExclamationTriangle />
                    </div>
                    <h4>Device Cannot Be Repaired</h4>
                    <p>
                      Thank you for entrusting us with your device. After a thorough 
                      diagnostic assessment by our certified technicians, we regret to 
                      inform you that your device cannot be repaired at our service center.
                    </p>
                    
                    {firstOrder?.repairOrderType === "Pickup" ? (
                      <div className="additional-info">
                        <p>
                          <strong>Note:</strong> A delivery fee of <strong>₦2,000</strong> applies for the
                          return of unrepaired devices. Your device will be safely returned to you shortly.
                        </p>
                      </div>
                    ) : (
                      <div className="additional-info">
                        <p>
                          <strong>Note:</strong> We kindly request that you pick up your device 
                          as soon as possible from our service center.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Support Section */}
              <div className="support-section">
                <div className="support-card">
                  <FaPhoneAlt className="support-icon" />
                  <div className="support-content">
                    <h5>Contact Support</h5>
                    <p>Our team is here to help you with any questions</p>
                    <div className="support-actions">
                      <Button variant="primary" size="sm" className="me-2">
                        Call Support
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
};

export default NavtrackRepair;