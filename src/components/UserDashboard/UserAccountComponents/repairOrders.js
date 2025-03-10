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
import Header from "../../layouts/Header";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useGetData from "../../Utility/getFunction";
import moment from "moment/moment";
import { FaClipboardList, FaTruckPickup, FaTools, FaTruckMoving, FaCheckCircle } from 'react-icons/fa';
import Receipt from "../../layouts/Receipt/repairOrderReceipt";
import chukkyLogo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"
import Footer from "../../layouts/Footer";





const RepairOrders = (() => {
  const [showDropDown, setShowDropDown] = useState("");
  const [noRecentOrder, setNoRecentOrder] = useState(false);
  const [noOrderHistory, setNoOrderHistory] = useState(false)

  const [orderData, setOrderData] = useState("");
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const [showTrackOrder, setShowTrackOrder] = useState("");

  const [orderCode, setOrderCode] = useState("");

  const userInfo = localStorage.getItem('userInfo');
  const userData = JSON.parse(userInfo);

  const { data: repairOrdersTracking, isPending: repairOrdersPending, error: repairOrdersError } = useGetData(`repair/getRepairOrderCode/${orderCode}`);

  const { data, isPending, error } = useGetData(`repair/getUserRepairOrders/${userData?.userId}`);


  const handleShowDropDown = () => {

    setShowDropDown(!showDropDown)
  }

  const handleNavigateDashboard = (() => {
    navigate("-1")
  })


  const repairOrders = repairOrdersTracking?.repairOrders || []; // Ensure it's always an array

  const handleCloseTrackOrder = () => setShowTrackOrder(false);


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
  
    const handleShowTrackOrder = ((code)=>{
      setOrderCode(code)
       setShowTrackOrder(true) 
    })


 

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
 


  const getLatestRepairOrders = (orders) => {
    if (!Array.isArray(orders)) {
      console.error("Expected an array, but got:", orders);
      return [];
    }

    console.log("Processing Orders:", orders);

    const latestOrders = orders.reduce((acc, order) => {
      console.log("Checking Order:", order);

      if (!acc[order.repairOrderCode] || new Date(order.createdDateTime) > new Date(acc[order.repairOrderCode].createdDateTime)) {
        acc[order.repairOrderCode] = order;
      }
      return acc;
    }, {});

    console.log("Latest Orders Object:", latestOrders);

    return Object.values(latestOrders);
  };

  const ordersArray = Array.isArray(data.repairOrders) ? data.repairOrders : [];
  const latestOrders = getLatestRepairOrders(ordersArray);

  const filterActiveOrders = latestOrders && latestOrders.filter((order) => order.status !== "delivered" && order.status !== "cancel");


  const filterOrderHistory = latestOrders && latestOrders.filter((order) => order.status === "delivered" || order.status === "cancel");

  console.log("Latest Orders Object>>>>>>>>>:", filterActiveOrders);

const showDetails = (item)=> {
  setOrderData(item)
  setShowResult(true)
}

const handleCloseResult = ()=> setShowResult(false)

  

  return (



    <>

      <Header />
      <div className="tec-main-Hide">
        <UserDashBoard />
      </div>

      <div className="main-content">
        <div onClick={() => navigate(-1)}> <MdKeyboardBackspace size={35} /> </div>
        {/* <h4>Orders</h4> */}


        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="Repair Order">
            <div className="panel-wrapper">
              <div className="panel-head">
                Repair Order
              </div>


              <table>
                <thead>
                  <tr className="table-headers">
                    <th>Repair Order Code</th>
                    <th>Device name</th>
                    <th>Device model</th>
                    <th>Device fault</th>
                    <th>Order type</th>
                    <th>Order due date</th>
                    <th>Created date</th>
                    <th>Phone number</th>
                    <th>Pickup Address</th>
                    <th>Status</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filterActiveOrders &&
                   filterActiveOrders.map((item) => (
                      <tr key={item.repairOrderCode}>
                        <td data-label="Repair Order Code"> {item.repairOrderCode} </td>
                        <td data-label="Device name">{item.deviceType} </td>
                        <td data-label="Device model"> {item.deviceModel} </td>
                        <td data-label=" Device fault"> {item?.details.slice(0, 50)} </td>
                        <td data-label="Order type"> {item.repairOrderType} </td>
                        <td data-label="Order due date">  {moment(item.reserveDate).format("lll")}</td>
                        <td data-label="Created date"> {moment(item.createdDateTime).format("lll")}</td>
                        <td data-label="Phone number"> {item.phone} </td>
                        <td data-label="Pickup Address"> {item.pickUpAddress} </td>
                        {/* <td data-label="Status" style={{ color: `${checkColor(item.status)}`, fontWeight:"bold", textTransform:"capitalize" }} className="tansDroP"> {item.status} </td> */}
                        <td>


                          <button class="button-15" role="button" onClick={()=> handleShowTrackOrder(item.repairOrderCode)}>Track Order</button>

                        </td>
                      </tr>
                    ))}
                </tbody>




              </table>
              {
                isPending && <div className="" style={{ width: "100%", justifyContent: "center", textAlign: "center" }}>
                  <span style={{ margin: "0 auto" }} className="loader-come"></span>

                </div>}



              {
                filterActiveOrders.length === 0  && !isPending && <h2 className="" style={{ textAlign: "center", padding: "10px" }}  >No Recent Order Placed</h2>
              }



            </div>





          </Tab>
          <Tab eventKey="profile" title="Repair Order History">
          <div className="panel-wrapper">
              <div className="panel-head">
                Repair Order History
              </div>


              <table>
                <thead>
                  <tr className="table-headers">
                    <th>Repair Order Code</th>
                    <th>Device name</th>
                    <th>Device model</th>
                    <th>Device fault</th>
                    <th>Order type</th>
                    <th>Order due date</th>
                    <th>Created date</th>
                    <th>Phone number</th>
                    <th>Pickup Address</th>
                    <th>Status</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filterOrderHistory &&
                    filterOrderHistory.map((item) => (
                      <tr key={item.repairOrderCode}>
                        <td data-label="Repair Order Code"> {item.repairOrderCode} </td>
                        <td data-label="Device name">{item.deviceType} </td>
                        <td data-label="Device model"> {item.deviceModel} </td>
                        <td data-label=" Device fault"> {item?.details.slice(0, 50)} </td>
                        <td data-label="Order type"> {item.repairOrderType} </td>
                        <td data-label="Order due date">  {moment(item.reserveDate).format("lll")}</td>
                        <td data-label="Created date"> {moment(item.createdDateTime).format("lll")}</td>
                        <td data-label="Phone number"> {item.phone} </td>
                        <td data-label="Pickup Address"> {item.pickUpAddress} </td>
                        {/* <td data-label="Status" style={{ color: `${checkColor(item.status)}`, fontWeight:"bold", textTransform:"capitalize" }} className="tansDroP"> {item.status} </td> */}
                        <td>


                          <button class="button-15" role="button" onClick={() => showDetails(item)} >View Details</button>

                        </td>
                      </tr>
                    ))}
                </tbody>




              </table>
              {
                isPending && <div className="" style={{ width: "100%", justifyContent: "center", textAlign: "center" }}>
                  <span style={{ margin: "0 auto" }} className="loader-come"></span>

                </div>}



              {
                filterOrderHistory.length === 0 && !isPending &&  <h2 className="" style={{ textAlign: "center", padding: "10px" }}  >No Order History Yet</h2>
              }



            </div>

          </Tab>

        </Tabs>

      </div>


      
   


      <Modal show={showResult} onHide={handleCloseResult} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Device Repair Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>


        <Receipt orderData={orderData} chukkyLogo={chukkyLogo}/>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResult}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>



      <Modal show={showTrackOrder} onHide={handleCloseTrackOrder} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Device Repair Tracking Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        {
                repairOrdersPending && <div className="" style={{ width: "100%", justifyContent: "center", textAlign: "center" }}>
                  <span style={{ margin: "0 auto" }} className="loader-come"></span>

                </div>}

          {

            repairOrders?.length === 0 ?
              <div>  No repair Order associated with this code, please enter the correct code and try again </div> :

              <div>
                <h3> Tracking for {getRepairData?.deviceType} {getRepairData?.deviceModel} repair</h3>
                <p>Repair Order Code: {getRepairData?.repairOrderCode}</p>
                <div>

                  <div style={{ gap: "20px" }}>
                    {updatedStages.map((stage, index) => (
                      <div key={index} style={{ color: stage.isActive ? "green" : "gray", fontWeight: stage.isActive ? "bold" : "revert" }}>
                        <span className="icon-container">{stage.icon}</span>
                        <p>{stage.name}</p>
                        <p>{stage.date ? moment(stage.date).format("lll") : "Pending"}</p>
                        <hr />
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




    </>
  )
})

export default RepairOrders