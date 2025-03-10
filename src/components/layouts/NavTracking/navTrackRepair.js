import React, { useState } from "react";
import Header from "../Header";
import "./navTrackRepair.css"
import { useNavigate } from "react-router-dom";
import TrackBtn from "../../UserDashboard/TrackProgress/trackerButton";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ServicesComponent from "../../home/services-component";
import Footer from "../Footer";
import useGetData from "../../Utility/getFunction";
import { FaClipboardList, FaTruckPickup, FaTools, FaTruckMoving, FaCheckCircle } from 'react-icons/fa';
import moment from "moment";

const NavtrackRepair = (()=>{

    const [showTrackOrder, setShowTrackOrder] = useState("");

    const [orderCode, setOrderCode] = useState("");


    const navigate = useNavigate();

    
     
      const handleCloseTrackOrder = () => setShowTrackOrder(false);

      const handleGetCode = ((e)=>{
        setOrderCode( e.target.value)  
      })

const { data , isPending, error } = useGetData(`repair/getRepairOrderCode/${orderCode}`);


// const stages = [
//   { name: "Ordered", icon: <FaClipboardList />, date: "09/05/2025" },
//   { name: "Picked", icon: <FaTruckPickup />  , date: "09/05/2025"},
//   { name: "Fixing", icon: <FaTools /> , date: "09/05/2025" },
//   { name: "Delivery", icon: <FaTruckMoving /> , date: "09/05/2025" },
//   { name: "Delivered", icon: <FaCheckCircle /> , date: "09/05/2025" },
//   ];


const repairOrders = data?.repairOrders || []; // Ensure it's always an array

 

  const getRepairData = repairOrders[0]

  console.log("data>>>>>jjfj", getRepairData)



  // Sort repairOrders by createdDateTime to get the latest status
  const sortedOrders = [...repairOrders].sort((a, b) => new Date(a.createdDateTime) - new Date(b.createdDateTime));

  // Get the latest status update
  const latestOrder = sortedOrders[sortedOrders.length - 1];

  // Define the stages and their corresponding statuses
  const stages = [
      { name: "Ordered", status: "Processing", icon: <FaClipboardList />, date: null },
      { name: "Picked", status: "pickedUp", icon: <FaTruckPickup />, date: null },
      { name: "Fixing", status: "fixing", icon: <FaTools />, date: null },
      { name: "Delivery", status: "outForDelivery", icon: <FaTruckMoving />, date: null },
      { name: "Delivered", status: "delivered", icon: <FaCheckCircle />, date: null },
  ];

  // Map status updates to the stages
  const updatedStages = stages.map((stage) => {
      const matchingOrder = sortedOrders.find((order) => order.status === stage.status);
      return {
          ...stage,
          date: matchingOrder ? matchingOrder.createdDateTime : null,
          isActive: latestOrder?.status === stage.status, // Highlight latest status
      };
  });

  const handleShowTrackOrder = (()=>{

    
    setShowTrackOrder(true) 
  })

    return(


<>

 <Header/> 
<div className="searchStuff-gen"> 
 <div className="searchStuff">Track Your Device repair Progress</div> 
 <div className="formBodySearch">
    
<form className="searchForm" onSubmit={(e)=>e.preventDefault()}>
 
  <input id="searcher" type="search" placeholder="Enter Order Number..." autofocus required onChange={handleGetCode} />
  <button  className="searchButtonSUB" onClick={handleShowTrackOrder}>Go</button>    
</form> 
</div> 
</div>
 <ServicesComponent/>


    
    <Modal show={showTrackOrder} onHide={handleCloseTrackOrder} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Device Repair Tracking Progress</Modal.Title>
    </Modal.Header>
    <Modal.Body>

{

repairOrders?.length === 0 ?
<div>  No repair Order associated with this code, please enter the correct code and try again </div>:

<div>
<h3> Tracking for {getRepairData?.deviceType} {getRepairData?.deviceModel} repair</h3>
<p>Repair Order Code: {getRepairData?.repairOrderCode}</p>
<div>
 
       <div style={{ gap: "20px" }}>
           {updatedStages.map((stage, index) => (
               <div key={index}  style={{ color: stage.isActive ? "green" : "gray", fontWeight:stage.isActive ? "bold": "revert" }}>
                  <span className="icon-container">{stage.icon}</span> 
                   <p>{stage.name}</p>
                   <p>{stage.date ? moment(stage.date).format("lll") : "Pending"}</p>
                   <hr/>
               </div>
           ))}
           
       </div>
   </div>

</div>
}
      



    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseTrackOrder}>
        Close
      </Button>
      
    </Modal.Footer>
  </Modal>   

  <Footer/>
         
        
        
        </>
    )
})

export default NavtrackRepair;  
    