import { useState } from "react";
import UserDashBoard from "../userDashboard"
import "../userDashboard.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TrackProgress from "../TrackProgress/trrackProgress";
import TrackBtn from "../TrackProgress/trackerButton";
import { PiPhoneIncomingDuotone } from "react-icons/pi";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";




const RepairOrders = (() => {
  const [showDropDown, setShowDropDown] = useState("");
 const navigate = useNavigate();

  const handleShowDropDown = () => {

    setShowDropDown(!showDropDown)
  }

const handleNavigateDashboard = (()=>{
  navigate("-1")
})

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (



    <>

      
      <div className="tec-main-Hide">
        <UserDashBoard />
      </div>
     
      <div className="main-content">
      <div onClick={() => navigate(-1)}> <MdKeyboardBackspace size={35}  /> </div>
        {/* <h4>Orders</h4> */}

        <div className="panel-wrapper">
          <div className="panel-head">
            Repair Order
          </div>



          <table className="tableInerSet">

            <thead>
              <tr >
                <th scope="col" >Device name/ Brand</th>
                <th scope="col">Book Date time</th>
                <th scope="col">Device Fault</th>
                <th scope="col">Repair Status</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>

              <tr >
                <td data-label="Device name/ Brand" >Samsung</td>
                <td data-label=" Book Date time" > 9/8/2023 </td>
                <td data-label="Device Fault"> compressed</td>
                <td data-label="Repair Status"> Picked</td>
                <td data-label="Details"> <PiPhoneIncomingDuotone size={30} /> </td>
              </tr>


            </tbody>
          </table>






        </div>
      </div>




      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Device Repair Tracking Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <TrackBtn />


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>



    </>
  )
})

export default RepairOrders