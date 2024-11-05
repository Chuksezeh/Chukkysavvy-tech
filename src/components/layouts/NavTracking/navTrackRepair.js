import React, { useState } from "react";
import Header from "../Header";
import "./navTrackRepair.css"
import { useNavigate } from "react-router-dom";
import TrackBtn from "../../UserDashboard/TrackProgress/trackerButton";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const NavtrackRepair = (()=>{

    const [showTrackOrder, setShowTrackOrder] = useState("");


    const navigate = useNavigate();

    const handleShowTrackOrder = (()=>{
        setShowTrackOrder(true) 
      })
     
      const handleCloseTrackOrder = () => setShowTrackOrder(false);






    return(


<>

 <Header/> 
<div className="searchStuff-gen"> 
 <div className="searchStuff">Track Your Device repair Progress</div> 
 <div className="formBodySearch">
    
<form className="searchForm" onSubmit={(e)=>e.preventDefault()}>
 
  <input id="searcher" type="search" placeholder="Enter Order Number..." autofocus required />
  <button  className="searchButtonSUB" onClick={handleShowTrackOrder}>Go</button>    
</form> 
</div> 
</div>

    
    <Modal show={showTrackOrder} onHide={handleCloseTrackOrder} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Device Repair Tracking Progress</Modal.Title>
    </Modal.Header>
    <Modal.Body>


<TrackBtn/>


    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseTrackOrder}>
        Close
      </Button>
      
    </Modal.Footer>
  </Modal>   
         
        
        
        </>
    )
})

export default NavtrackRepair;  
    