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
import { FaClipboardList, FaTruckPickup, FaTools, FaTruckMoving, FaCheckCircle, FaRegCommentDots } from 'react-icons/fa';
import Receipt from "../../layouts/Receipt/repairOrderReceipt";
import chukkyLogo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"
import Footer from "../../layouts/Footer";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { chukkytechAxios } from "../../Utility/axios";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { ButtonGroup, DropdownButton,Dropdown} from "react-bootstrap";





const RepairOrders = (() => {
  const [showDropDown, setShowDropDown] = useState("");
  const [commentPhone, setCommentPhone] = useState("");
  const [noOrderHistory, setNoOrderHistory] = useState(false)
  const [itemData, setItemData] = useState({});
  const [progressStatus, setProgressStatus] = useState(false);
  const [historyData, setHistoryData] = useState({});
const [showHistoryModal, setShowHistoryModal] = useState(false);
const [loading, setLoading] = useState(false);
const [errMessage, setErrMessage] = useState("");



const [showComment, setShowComment] = useState(false);

const { register, handleSubmit, setValue, reset,
        watch, formState: { errors, isDirty, isValid  } } = useForm({
       
      });

  const [orderData, setOrderData] = useState("");
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const [showTrackOrder, setShowTrackOrder] = useState("");

  const [orderCode, setOrderCode] = useState("");
  const [successTex, setSuccessText] = useState("");
  const [commentOrderCode, setCommentOrderCode] = useState("");

  const [repairOrdersPending, setRepairOrdersPending] = useState(false);
  const [repairOrdersTracking, setRepairOrdersTracking] = useState([]);

  const userInfo = localStorage.getItem('userInfo');
  const userData = JSON.parse(userInfo);

  const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

  // const { data: repairOrdersTracking, isPending: repairOrdersPending, error: repairOrdersError } = useGetData(`repair/getRepairOrderCode/${itemData?.orderCode}`);

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

  console.log("data>>>>>jjfj", orderCode)


  // Sort repairOrders by createdDateTime to get the latest status
  const sortedOrders = [...repairOrders].sort((a, b) => new Date(a.createdDateTime) - new Date(b.createdDateTime));

  // Get the latest status update
  const latestOrder = sortedOrders[sortedOrders.length - 1];

  // Define the stages and their corresponding statuses
  const stages = [
       { name: "Ordered", status: "Processing", icon: <FaClipboardList />, date: null },
       { name: "Picked", status: "pickedUp", icon: <FaTruckPickup />, date: null },
       { name: "Fixing", status: "fixing", icon: <FaTools />, date: null },
       { name: "Fixed", status: "fixed", icon: <FaTruckMoving />, date: null },
       { name: "Delivered", status: "delivered", icon: <FaCheckCircle />, date: null },
       { name: "Settled", status: "settled", icon: <IoCheckmarkDoneOutline />, date: null },
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

  const filterActiveOrders = latestOrders && latestOrders.filter((order) =>
    order.status !== "delivered" && order.status !== "cancel" &&
    order.status !== "irreparable" &&   order.status !== "settled"  
    );


  const filterOrderHistory = latestOrders && latestOrders.filter((order) =>
     order.status === "delivered" || order.status === "cancel" ||
    order.status === "irreparable" ||   order.status === "settled"  
);



  const showDetails = (item) => {
     setOrderData(itemData)
     setShowResult(true)
     
    
  }

  const handleShowDetails = ((item)=>{
     setHistoryData(item)
       setShowHistoryModal(true)
  })

  const handleCloseResult = () => setShowResult(false)

 


  const handleUpdateKeys = ((e, item) => {
    console.log("Latest>>>>>>>>>mm:",  e.target.value);
    if(e.target.value === "view"){
        showDetails()
        setShowHistoryModal(false)
      }else if(e.target.value === "track"){
        setShowTrackOrder(true)
        
        handleShowTrackOrder(itemData?.orderCode);
      }else{
        setShowHistoryModal(true)
      }
    if (e.target.value === "pickedUp") {
      setProgressStatus("pickedUp")
    } else if (e.target.value === "fixing") {
      setProgressStatus("fixing")
    } else if (e.target.value === "fixed") {
      setProgressStatus("fixed")
    } else if (e.target.value === "delivered") {
      setProgressStatus("delivered")
    } else if (e.target.value === "cancel") {
      setProgressStatus("cancel")
    }

  })


  const fetchTrackingDetails = async (code) => {
    setRepairOrdersPending(true);
      try {
        const response = await chukkytechAxios.get(`repair/getRepairOrderCode/${code}`);
        setRepairOrdersTracking(response.data);
        setRepairOrdersPending(false);
      } catch (error) {
        setRepairOrdersPending(false);
        console.error('Error fetching tracking:', error);
      }
    };



  const handleShowDropDownData = ((data)=>{
    setOrderData(data)
   
  })

  const handleShowTrackOrder = ((code) => {
    console.log("check-oreder-code>>>",code)
    setOrderCode(code)
    setShowTrackOrder(true)
    fetchTrackingDetails(code); 
  })

  // const handleTrackOrder = (()=>{
  //   setShowTrackOrder(true)
  //   handleShowTrackOrder(data?.orderCode);

  // })


const handleViewOrder = (()=>{
  // showDetails()
  setShowResult(true)
})



  const handleGetDetails = ((item)=>{
    setItemData(item);
    console.log("mggg>>>>>", itemData)
})

const truncateText = (text, maxWords) => {
  const words = text?.split(' ');
  return words?.length > maxWords 
    ? `${words?.slice(0, maxWords).join(' ')}...` 
    : text;
};



const handleShowComment = ((item)=>{
  setCommentOrderCode(item?.repairOrderCode);
  setCommentPhone(item.phone);
  setShowComment(true);
})


const handleSubmitComment = async (data) => {
  try {
      setLoading(true);
     
  const commentData = {
          ...data,
          phone: commentPhone,
          repairOrderCode: commentOrderCode,
          email: userData?.email,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          userId: userData?.userId,
          status: "active"

      };

      console.log("Sending data:", commentData);

      const res = await chukkytechAxios.post('comment/createUserComment', commentData);
      const result = res.data;

      console.log("API response:", result);
     setSuccessText(res.data.message)
      setLoading(false);
      setSuccessMessage(true);
      setShowComment(false);
      
  } catch (err) {
      console.error("API error:", err);
      setLoading(false);
      setErrorMessage(true);
      setErrMessage(err.response?.data || "An error occurred");
  }
};


  return (



    <>

      <Header />
      <div className="tec-main-Hide">
        <UserDashBoard />
      </div>

      <div className="main-content">
        <div onClick={() => navigate(-1)}> <MdKeyboardBackspace size={35} /> </div>
        {/* <h4>Orders</h4> */}
        {
    successMessage &&
    <div className="container mt-2">
        <div className="row">

            <div className="col-sm-12">
                <div className="alert fade  alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">

                    <i className="start-icon far fa-check-circle faa-tada animated"></i>
                    <strong className="font__weight-semibold" style={{ color: "white" }}>Well done!</strong> {successTex}
                </div>
            </div>



        </div>
    </div>


}

        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="home" title="Repair Order">
            <div className="panel-wrapper">
              <h3 className="panel-head">
                Repair Order
              </h3>


              <table >
                <thead>
                  <tr className="table-headers" >
                    <th>Repair Order Code</th>
                    <th>Device name</th>
                    <th>Device model</th>
                    <th>Device fault</th>
                    <th>Order type</th>
                    <th>Order due date</th>
                    <th>Created date</th>
                    {/* <th>Phone number</th> */}
                    {/* <th>Address pickup/center</th> */}
                    <th>Action</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filterActiveOrders &&
                    filterActiveOrders.map((item) => (
                      <tr key={item.repairOrderCode}>
                        <td data-label="Repair Order Code" style={{fontWeight:"bold"}}> {item.repairOrderCode} </td>
                        <td data-label="Device name">{item.deviceType} </td>
                        <td data-label="Device model"> {item.deviceModel} </td>
                        
                        <td data-label=" Device fault">{truncateText(item.details, 8)}</td>
                        <td data-label="Order type"> {item.repairOrderType} </td>
                        <td data-label="Order due date">  {moment(item.reserveDate).format("lll")}</td>
                        <td data-label="Created date"> {moment(item.createdDateTime).format("lll")}</td>
                        {/* <td data-label="Phone number"> {item.phone} </td> */}
                        {/* <td data-label="Address pickup/center"> {item.pickUpAddress} </td> */}
                        {/* <td data-label="Status" style={{ color: `${checkColor(item.status)}`, fontWeight:"bold", textTransform:"capitalize" }} className="tansDroP"> {item.status} </td> */}
                        <td>


                          {/* <button class="button-15" role="button" onClick={()=> handleShowTrackOrder(item.repairOrderCode)}>
                             */}

                          {/* <select className="form-control border-secondary" onChange={handleUpdateKeys} onClick={() => handleGetDetails(item)} >

                            <option value="">Action</option>
                            <option value="view">View order </option>
                            <option value="track">Track order</option>
                           
                            

                          </select> */}

                          {[DropdownButton].map((DropdownType, idx) => (
                                            <DropdownType
                                                as={ButtonGroup}
                                                key={idx}
                                                id={`dropdown-button-drop-${idx}`}
                                                size="lg"
                                                title="Action"
                                                onClick={()=>handleShowDropDownData(item)}

                                            >
                                                {/* <Dropdown.Item eventKey="1">View user</Dropdown.Item> */}

                                                <Dropdown.Item eventKey="3"  onClick={handleViewOrder}>
                                                 View order

                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item eventKey="4" onClick={()=>handleShowTrackOrder(item.repairOrderCode)} >Track order</Dropdown.Item>
                                            </DropdownType>
                                        ))}



                          {/* </button> */}

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
                filterActiveOrders.length === 0 && !isPending && <h2 className="" style={{ textAlign: "center", padding: "10px" }}  >No Recent Order Placed</h2>
              }



            </div>





          </Tab>
          <Tab eventKey="profile" title="Repair Order History">
            <div className="panel-wrapper">
              <h3 className="panel-head">
                Repair Order History
              </h3>


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
                    {/* <th>Phone number</th> */}
                    {/* <th>Address pickup/center</th> */}
                    <th>Status</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {filterOrderHistory &&
                    filterOrderHistory.map((item) => (
                      <tr key={item.repairOrderCode}>
                        <td data-label="Repair Order Code"  style={{fontWeight:"bold"}}> {item.repairOrderCode} </td>
                        <td data-label="Device name">{item.deviceType} </td>
                        <td data-label="Device model"> {item.deviceModel} </td>
                        <td data-label=" Device fault">{truncateText(orderData.details, 8)}</td>
                        <td data-label="Order type"> {item.repairOrderType} </td>
                        <td data-label="Order due date">  {moment(item.reserveDate).format("lll")}</td>
                        <td data-label="Created date"> {moment(item.createdDateTime).format("lll")}</td>
                        {/* <td data-label="Phone number"> {item.phone} </td> */}
                        {/* <td data-label="Address pickup/center"> {item.pickUpAddress} </td> */}
                        {/* <td data-label="Status" style={{ color: `${checkColor(item.status)}`, fontWeight:"bold", textTransform:"capitalize" }} className="tansDroP"> {item.status} </td> */}
                        <td style={{display:"flex", gap:"20px", padding:"5px"}}>

                   
                          <button class="button-15" role="button" onClick={() =>handleShowDetails(item)} >View Details</button>
                          <i onClick={()=> handleShowComment(item)}><FaRegCommentDots size={30} style={{cursor:"pointer"}}/></i>

                        </td>
                      </tr>
                    ))}
                </tbody>




              </table>
              {               isPending && <div className="" style={{ width: "100%", justifyContent: "center", textAlign: "center" }}>
                  <span style={{ margin: "0 auto" }} className="loader-come"></span>

                </div>}



              {
                filterOrderHistory.length === 0 && !isPending && <h2 className="" style={{ textAlign: "center", padding: "10px" }}  >No Order History Yet</h2>
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


          <Receipt orderData={orderData } chukkyLogo={chukkyLogo} />


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseResult}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>

      <Modal show={showHistoryModal} onHide={()=>setShowHistoryModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Device History Repair Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <Receipt orderData={historyData } chukkyLogo={chukkyLogo} />


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowHistoryModal(false)}>
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
                        <p>{stage.date ? moment(stage.date).format("lll") : "Pending..."}</p>
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



      <Modal show={showComment} onHide={()=>setShowComment(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Device Repair Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:"center"}}> Thank you for choosing <span style={{fontWeight:"bold"}}>CHUKKYTECH</span> . We value your feedback and recommendations to help us improve our services. Your input is greatly appreciated.</div>

<form id="survey-form" onSubmit={handleSubmit((data, event) => {

console.log('seedataNow', data);
handleSubmitComment(data);
})}>

<div className="row">

<div className="col-md-12">
  <div className="form-group">
    <label id="number-label" htmlFor="number">Title</label>
    <input 
      type="text"  
      className="form-control"
      placeholder="How do you feel?..."
      maxLength={50}  
      {...register("title", {
        required: 'Short title is required',
        maxLength: {
          value: 50,
          message: 'Title cannot exceed 50 characters'
        }
      })}
    />
    <span className="cum-error">
      {errors.title?.message}
    </span>
  </div>
</div>

  </div>
<div className="row">
    <div className="col-md-12">
        <div className="form-group">
            <label>Comment</label>
            <textarea id="comments" className="form-control" name="comment" placeholder="Please provide your feedback..."
                {...register("comment", {
                    required: 'Comment is required',
                    maxLength: {},
                })}  >

            </textarea>
            <span className="cum-error">{errors.comment?.message}</span>
        </div>
    </div>
</div>





{

    errorMessage &&
    <div className="container mt-2">
        <div className="row">

            <div class="col-sm-12">
                <div className="alert   alert-danger  " role="alert" >

                    <span> {errMessage}   </span>

                </div>
            </div>



        </div>
    </div>


} 


<div className="row">
    <div className="col-md-4 setbtnDiv">
        {
            loading ? <button className="picckBtnDiv" > <span className="loader"></span></button> : <button className="picckBtnDiv" type="submit">Submit</button>
        }

    </div>
</div>

</form>
         


        </Modal.Body>
        <Modal.Footer>
       
        

        </Modal.Footer>
      </Modal>




    </>
  )
})

export default RepairOrders