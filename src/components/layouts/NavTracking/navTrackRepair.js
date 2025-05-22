import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./navTrackRepair.css";
import { useNavigate } from "react-router-dom";
import TrackBtn from "../../UserDashboard/TrackProgress/trackerButton";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ServicesComponent from "../../home/services-component";
import Footer from "../Footer";
import { FaClipboardList, FaTruckPickup, FaTools, FaTruckMoving, FaCheckCircle } from 'react-icons/fa';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import moment from "moment";
import { chukkytechAxios } from "../../Utility/axios";
import logo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"

const NavtrackRepair = () => {
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [showNoRepair, setShowNoRepair] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [isPendingTracking, setIsPendingTracking] = useState(false);
  const [data, setData] = useState([]);


  const navigate = useNavigate();

  const handleCloseTrackOrder = () => setShowTrackOrder(false);
  const handleCloseNoRepair = () => setShowNoRepair(false);

  const handleGetCode = (e) => {
    setOrderCode(e.target.value);
  };

  const fetchTrackingDetails = async () => {
    setIsPendingTracking(true);
    try {
      const response = await chukkytechAxios.get(`repair/getRepairOrderCode/${orderCode.trim()}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching tracking:", error);
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
    { name: "Ordered", status: "Processing", icon: <FaClipboardList />, date: null },
    { name: "Picked", status: "pickedUp", icon: <FaTruckPickup />, date: null },
    { name: "Fixing", status: "fixing", icon: <FaTools />, date: null },
    { name: "Fixed", status: "fixed", icon: <FaTruckMoving />, date: null },
    { name: "Delivered", status: "delivered", icon: <FaCheckCircle />, date: null },
    { name: "Settled", status: "settled", icon: <IoCheckmarkDoneOutline />, date: null },
  ];

  const updatedStages = stages.map((stage) => {
    const matchingOrder = sortedOrders.find((order) => order.status === stage.status);
    return {
      ...stage,
      date: matchingOrder ? matchingOrder.createdDateTime : null,
      isActive: latestOrder?.status === stage.status,
    };
  });

  // Map repair orders to get only latest per code
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

  const handleShowTrackOrder = async () => {
     setShowTrackOrder(true);
    if (!orderCode.trim()) {
      alert("Please enter a valid repair order code.");
      return;
    }
  
    setIsPendingTracking(true);
    try {
      const response = await chukkytechAxios.get(`repair/getRepairOrderCode/${orderCode.trim()}`);
      const repairData = response.data;
      setData(repairData);
  
      const latestOrdersMap = repairData.repairOrders.reduce((acc, order) => {
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
  
      if (firstOrder?.status === "irreparable" || firstOrder?.status === "cancel") {
        setShowNoRepair(true);
      } else {
        setShowTrackOrder(true);
      }
  
    } catch (error) {
      console.error("Error fetching tracking:", error);
      // alert("An error occurred while fetching tracking info.");
    } finally {
      setIsPendingTracking(false);
    }
  };


  useEffect(()=>{
    if(showNoRepair){
      setShowTrackOrder(false);
    } 
  }, [showNoRepair])


  // console.log("firstOrder", firstOrder)

  return (
    <>
      <Header />
      <div className="searchStuff-gen">
        <div className="searchStuff">Track Your Device Repair Progress</div>
        <div className="formBodySearch">
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <input
              id="searcher"
              type="search"
              placeholder="Enter Order Number..."
              // autoFocus
              required
              onChange={handleGetCode}
            />
            <button
              className="searchButtonSUB"
              onClick={handleShowTrackOrder}
              disabled={isPendingTracking}
            >
              {isPendingTracking ? <span className="loader"></span> : "Go"}
            </button>
          </form>
        </div>
      </div>
      <ServicesComponent />

      {/* ====== MODAL: TRACKING ====== */}
      <Modal show={showTrackOrder} onHide={handleCloseTrackOrder} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Device Repair Tracking Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:"center", justifyContent:"center"}}> <img src={logo} style={{width:"80px", padding:"10px"}}/> </div>
          {isPendingTracking ? (
            <div style={{ textAlign: "center" }}>
              <span className="loader-circle"></span>
            </div>
          ) : repairOrders.length === 0 ? (
            <div>We couldn’t find a <strong>repair order</strong> associated with this <strong>code</strong>. Please double-check the code and try again. If the issue persists, feel free to contact our support team for assistance.</div>
          ) : (
            <div>
              <h3>
                Tracking for {getRepairData?.deviceType} {getRepairData?.deviceModel} repair
              </h3>
              <p>Repair Order Code: {getRepairData?.repairOrderCode}</p>
              <div style={{ gap: "20px" }}>
                {updatedStages.map((stage, index) => (
                  <div
                    key={index}
                    style={{
                      color: stage.isActive ? "green" : "gray",
                      fontWeight: stage.isActive ? "bold" : "normal",
                    }}
                  >
                    <span className="icon-container">{stage.icon}</span>
                    <p>{stage.name}</p>
                    <p>{stage.date ? moment(stage.date).format("lll") : "Pending..."}</p>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTrackOrder}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ====== MODAL: NO REPAIR ====== */}
      <Modal show={showNoRepair} onHide={handleCloseNoRepair} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Device Repair Tracking Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{textAlign:"center", justifyContent:"center"}}> <img src={logo} style={{width:"80px", padding:"10px"}}/> </div>
          <div>
            <h3>
              Tracking for {firstOrder?.deviceType} {firstOrder?.deviceModel} repair
            </h3>
            <p>Repair Order Code: {firstOrder?.repairOrderCode}</p>
          </div>
       
           {firstOrder?.status !== "cancel" && (
  firstOrder?.repairOrderType === "Pickup" && firstOrder?.repairOrderType !== "cancel" ? (
    <div>
    <h3 style={{textAlign:"center", color:"red"}}>We're Unable to Fix This Device</h3>
      <p>
        Thank you for entrusting us with your device. After a thorough diagnostic
        assessment and several repair attempts by our certified technicians, we regret to
        inform you that your device cannot be repaired at our service center due to the
        extent of the issue.
        <br />
        <br />
        <strong>Note:</strong> A delivery fee of <strong>₦2,000</strong> applies for the
        return of unrepaired devices. Your device will be safely returned to you shortly.
      </p>
    </div>
  ) : (
    <div>
      <p>
        Thank you for entrusting us with your device. After a thorough diagnostic
        assessment and several repair attempts by our certified technicians, we regret to
        inform you that your device cannot be repaired at our service center.
        <br />
        <br />
        <strong>Note:</strong> We kindly request that you pick up your device as soon as possible.
      </p>
    </div>
  )
)}


       {firstOrder?.status === "cancel" &&
            <div>
                   <h3 style={{textAlign:"center", color:"red"}}>Your Repair Order Has Been Canceled</h3>   
              <p>
              We regret to inform you that your repair order has been canceled. If you need further
               assistance or have any questions, please don’t hesitate to reach out to our support team. We’re here to help!
                <br />
                <br />
                <div style={{textAlign:"center", justifyContent:"center"}}>Thank you for choosing <span style={{fontWeight:"bold"}}>Chukkytech </span> for your repair services.</div>
               
              </p>
            </div>
         
          }

  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNoRepair}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default NavtrackRepair;
