import { useEffect, useState } from "react";
import UserDashBoard from "../userDashboard";
import "../userDashboard.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PiPhoneIncomingDuotone } from "react-icons/pi";
import { MdKeyboardBackspace, MdOutlineHistory, MdOutlineShoppingBag } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useGetData from "../../Utility/getFunction";
import moment from "moment/moment";
import { 
  FaClipboardList, 
  FaTruckPickup, 
  FaTools, 
  FaTruckMoving, 
  FaCheckCircle, 
  FaRegCommentDots,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import Receipt from "../../layouts/Receipt/repairOrderReceipt";
import chukkyLogo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png";
import Footer from "../../layouts/Footer";
import { chukkytechAxios } from "../../Utility/axios";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { ButtonGroup, DropdownButton, Dropdown, Badge, Card, Row, Col } from "react-bootstrap";
import "./RepairOrders.css";





const RepairOrders = (() => {

 const [showDropDown, setShowDropDown] = useState("");
  const [commentPhone, setCommentPhone] = useState("");
  const [noOrderHistory, setNoOrderHistory] = useState(false);
  const [itemData, setItemData] = useState({});
  const [progressStatus, setProgressStatus] = useState(false);
  const [historyData, setHistoryData] = useState({});
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [orderData, setOrderData] = useState("");
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const [showTrackOrder, setShowTrackOrder] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [successTex, setSuccessText] = useState("");
  const [commentOrderCode, setCommentOrderCode] = useState("");
  const [repairOrdersPending, setRepairOrdersPending] = useState(false);
  const [repairOrdersTracking, setRepairOrdersTracking] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);


  const userInfo = localStorage.getItem('userInfo');
  const userData = JSON.parse(userInfo);

  const { register, handleSubmit, setValue, reset, watch, formState: { errors, isDirty, isValid } } = useForm({});
  
  const encodedEmail = encodeURIComponent(userData.email);
  const { data: users, isPending: userIsPending, error: userError } = useGetData(`/auth/getUser/${encodedEmail}`);
  const { data, isPending, error } = useGetData(`repair/getUserRepairOrders/${users?.userId}`);

  // Status color mapping
  // const getStatusColor = (status) => {
  //   const statusColors = {
  //     Processing: "var(--primary)",
  //     pickedUp: "var(--warning)",
  //     fixing: "var(--info)",
  //     fixed: "var(--success)",
  //     delivered: "var(--success)",
  //     settled: "var(--dark)",
  //     cancel: "var(--danger)",
  //     irreparable: "var(--danger)"
  //   };
  //   return statusColors[status] || "var(--secondary)";
  // };

  const getStatusVariant = (status) => {
    const variants = {
      Processing: "primary",
      pickedUp: "warning",
      fixing: "info",
      fixed: "success",
      delivered: "success",
      settled: "dark",
      cancel: "danger",
      irreparable: "danger"
    };
    return variants[status] || "secondary";
  };

  const getLatestRepairOrders = (orders) => {
    if (!Array.isArray(orders)) return [];
    
    const latestOrders = orders.reduce((acc, order) => {
      if (!acc[order.repairOrderCode] || new Date(order.createdDateTime) > new Date(acc[order.repairOrderCode].createdDateTime)) {
        acc[order.repairOrderCode] = order;
      }
      return acc;
    }, {});

    return Object.values(latestOrders);
  };

  const ordersArray = Array.isArray(data?.repairOrders) ? data.repairOrders : [];
  const latestOrders = getLatestRepairOrders(ordersArray);

  const filterActiveOrders = latestOrders && latestOrders.filter((order) =>
    order.status !== "delivered" && order.status !== "cancel" &&
    order.status !== "irreparable" && order.status !== "settled"  
  );

  const filterOrderHistory = latestOrders && latestOrders.filter((order) =>
    order.status === "delivered" || order.status === "cancel" ||
    order.status === "irreparable" || order.status === "settled"  
  );

  // Filter orders based on search and status
  const filteredActiveOrders = filterActiveOrders?.filter(order => 
    order.repairOrderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deviceModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHistoryOrders = filterOrderHistory?.filter(order => 
    order.repairOrderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.deviceModel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowTrackOrder = (code) => {
    setOrderCode(code);
    setShowTrackOrder(true);
    fetchTrackingDetails(code); 
  };

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

  const repairOrders = repairOrdersTracking?.repairOrders || [];
  const getRepairData = repairOrders[0];
  const sortedOrders = [...repairOrders].sort((a, b) => new Date(a.createdDateTime) - new Date(b.createdDateTime));
  const latestOrder = sortedOrders[sortedOrders.length - 1];

  const stages = [
    { name: "Ordered",  message: "Your repair request has been received and is now being processed.",  status: "Processing", icon: <FaClipboardList />, date: null },
    { name: "Picked",   message: "Your device has been collected and is awaiting technical diagnosis.",  status: "pickedUp", icon: <FaTruckPickup />, date: null },
    { name: "Fixing",    message: "Our technicians are currently diagnosing and repairing your device.",  status: "fixing", icon: <FaTools />, date: null },
    { name: "Fixed",  message: "Your device has been successfully repaired and is undergoing final quality checks.",  status: "fixed", icon: <FaTruckMoving />, date: null },
    { name: "Delivered", message: "Your device has been delivered back to you. We hope you’re satisfied with our service!", 
    status: "delivered",  status: "delivered", icon: <FaCheckCircle />, date: null },
    { name: "Settled",   message: "Your repair order has been successfully completed. Thank you for choosing our service!",  status: "settled", icon: <IoCheckmarkDoneOutline />, date: null },
  ];

  const updatedStages = stages.map((stage) => {
    const matchingOrder = sortedOrders.find((order) => order.status === stage.status);
    return {
      ...stage,
      date: matchingOrder ? matchingOrder.createdDateTime : null,
      isActive: latestOrder?.status === stage.status,
      isCompleted: matchingOrder ? true : false,
    };
  });

  const truncateText = (text, maxWords) => {
    if (!text) return "";
    const words = text.split(' ');
    return words.length > maxWords ? `${words.slice(0, maxWords).join(' ')}...` : text;
  };

  const handleShowComment = (item) => {
    setCommentOrderCode(item?.repairOrderCode);
    setCommentPhone(item.phone);
    setShowComment(true);
  };

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
        userId: users?.userId,
        status: "active"
      };

      const res = await chukkytechAxios.post('comment/createUserComment', commentData);
      setSuccessText(res.data.message);
      setLoading(false);
      setSuccessMessage(true);
      setShowComment(false);
      reset();
    } catch (err) {
      console.error("API error:", err);
      setLoading(false);
      setErrorMessage(true);
      setErrMessage(err.response?.data || "An error occurred");
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/user-login');
    }
  }, [navigate]);

  return (



    <>

      <Header />
      <div className="tec-main-Hide">
        <UserDashBoard />
      </div>

      <div className="main-content">
        {/* <div onClick={() => navigate(-1)}> <MdKeyboardBackspace size={35} /> </div> */}
        <div className="orders-header">
                 <div className="back-nav" onClick={() => navigate(-1)}>
                   <MdKeyboardBackspace size={24} />
                   <span>Back to Dashboard</span>
                 </div>
                 <div className="header-content">
                   <div className="header-main">
                     <MdOutlineShoppingBag size={32} className="header-icon" />
                     <div>
                       <div>Repair Orders</div>
                       <p style={{fontSize:"12px"}}>Manage and track your repair orders</p>
                     </div>
                   </div>
                   <div className="order-stats">
                     <div className="stat-card">
                       <span className="stat-number">{latestOrders?.length}</span>
                       <span className="stat-label">Total Orders</span>
                     </div>
                   </div>
                 </div>
               </div>
       
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

       <div className="orders-content">
          <Tabs defaultActiveKey="active" className="custom-tabs" fill>
            {/* Active Orders Tab */}
            <Tab eventKey="active" title={
              <div className="tab-title">
                <FaClipboardList />
                <span>Active Repair Orders</span>
                {filteredActiveOrders?.length > 0 && (
                  <Badge bg="primary" className="tab-badge">{filteredActiveOrders.length}</Badge>
                )}
              </div>
            }>
              <div className="tab-panel">
                {/* Search and Filter Bar */}
                <div className="search-filter-bar">
                  <div className="search-box">
                    {/* <FaSearch className="search-icon" /> */}
                    <input
                      type="text"
                      placeholder="Search by order code, device name or model..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>

                {/* Orders Grid */}
                {isPending ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading your orders...</p>
                  </div>
                ) : filteredActiveOrders?.length > 0 ? (
                  <div className="orders-grid">
                    {filteredActiveOrders.map((item) => (
                      <div key={item.repairOrderCode} className="order-card">
                        <Card.Body>
                          <div className="order-header">
                            <div className="order-code">
                              <strong>{item.repairOrderCode}</strong>
                            </div>
                            <Badge bg={getStatusVariant(item.status)} className="status-badge">
                              {item.status}
                            </Badge>
                          </div>
                          
                          <div className="order-details">
                            <div className="device-info">
                              <h6>{item.deviceType} {item.deviceModel}</h6>
                              <p className="fault-text">{truncateText(item.details, 12)}</p>
                            </div>
                            
                            <div className="order-meta">
                              <div className="meta-item">
                                <span className="meta-label">Order Type</span>
                                <span className="meta-value">{item.repairOrderType}</span>
                              </div>
                              <div className="meta-item">
                                <span className="meta-label">Scheduled Date</span>
                                <span className="meta-value">{moment(item.reserveDate).format("MMM D, YYYY")}</span>
                              </div>
                              <div className="meta-item">
                                <span className="meta-label">Created</span>
                                <span className="meta-value">{moment(item.createdDateTime).format("MMM D, YYYY")}</span>
                              </div>
                            </div>
                          </div>

                          <div className="order-actions">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => {
                                setOrderData(item);
                                setShowResult(true);
                              }}
                            >
                              View Details
                            </Button>
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleShowTrackOrder(item.repairOrderCode)}
                            >
                              Track Order
                            </Button>
                          </div>
                        </Card.Body>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <FaClipboardList size={48} className="empty-icon" />
                    <h4>No Active Orders</h4>
                    <p>You don't have any active repair orders at the moment.</p>
                  </div>
                )}
              </div>
            </Tab>

            {/* Order History Tab */}
            <Tab eventKey="history" title={
              <div className="tab-title">
                <MdOutlineHistory />
                <span> Repair Order History</span>
                {filteredHistoryOrders?.length > 0 && (
                  <Badge bg="secondary" className="tab-badge">{filteredHistoryOrders.length}</Badge>
                )}
              </div>
            }>
              <div className="tab-panel">
                {/* Search Bar */}
                <div className="search-filter-bar">
                  <div className="search-box">
                    {/* <FaSearch className="search-icon" /> */}
                    <input
                      type="text"
                      placeholder="Search order history..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>

                {isPending ? (
                  <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading order history...</p>
                  </div>
                ) : filteredHistoryOrders?.length > 0 ? (
                  <div className="orders-table-container">
                    <div className="table-responsive">
                      <table className="orders-table">
                        <thead>
                          <tr>
                            <th>Order Code</th>
                            <th>Device</th>
                            <th>Fault</th>
                            <th>Type</th>
                            <th> Scheduled Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredHistoryOrders.map((item) => (
                            <tr key={item.repairOrderCode}>
                              <td  className="order-code-cell" data-label="Order Code">
                                <strong>{item.repairOrderCode}</strong>
                              </td>
                              <td className="device-cell" data-label="Device">
                                <div className="device-cell">
                                  <div className="device-name">{item.deviceType}</div>
                                  <div className="device-model">{item.deviceModel}</div>
                                </div>
                              </td>
                              <td className="fault-cell" data-label="Fault">
                                {truncateText(item.details, 8)}
                              </td>
                              <td data-label="Type">{item.repairOrderType}</td>
                              <td data-label="Scheduled Date">{moment(item.reserveDate).format("MMM D, YYYY")}</td>
                              <td data-label="Status">
                                <Badge bg={getStatusVariant(item.status)}>
                                  {item.status}
                                </Badge>
                              </td>
                              
                                <div className="action-buttons">
                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => {
                                      setHistoryData(item);
                                      setShowHistoryModal(true);
                                    }}
                                  >
                                    View
                                  </Button>
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => handleShowComment(item)}
                                    className="comment-btn"
                                  >
                                    <FaRegCommentDots /> <span className="ms-1">Leave comment</span>
                                  </Button>
                                </div>
                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <MdOutlineHistory size={48} className="empty-icon" />
                    <h4>No Order History</h4>
                    <p>Your completed repair orders will appear here.</p>
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>


      </div>


 {/* Modals */}
      {/* Order Details Modal */}
      <Modal show={showResult} onHide={() => setShowResult(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Repair Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Receipt orderData={orderData} chukkyLogo={chukkyLogo} />
        </Modal.Body>
      </Modal>

      {/* History Details Modal */}
      <Modal show={showHistoryModal} onHide={() => setShowHistoryModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order History Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Receipt orderData={historyData} chukkyLogo={chukkyLogo} />
        </Modal.Body>
      </Modal>

      {/* Tracking Modal */}
      <Modal show={showTrackOrder} onHide={() => setShowTrackOrder(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Track Repair Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {repairOrdersPending ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading tracking information...</p>
            </div>
          ) : repairOrders?.length === 0 ? (
            <div className="empty-state">
              <p>No tracking information available for this order.</p>
            </div>
          ) : (
            <div className="tracking-container">
              <div className="tracking-header">
                <h5>{getRepairData?.deviceType} {getRepairData?.deviceModel}</h5>
                <p className="text-muted">Order: {getRepairData?.repairOrderCode}</p>
              </div>
              
              <div className="tracking-timeline">
                {updatedStages.map((stage, index) => (
                  <div key={index} className={`timeline-item ${stage.isCompleted ? 'completed' : ''} ${stage.isActive ? 'active' : ''}`}>
                    <div className="timeline-marker-repair">
                      <div className="marker-icon">
                       
                        {stage.isCompleted ? <IoCheckmarkDoneOutline /> : stage.icon}    
                     
                      </div>
                      
                    </div>
                 
                    <div className="timeline-content-repair">
                      <h6 className="stage-name">{stage.name}</h6>
                     { stage.date &&  <div>  {stage.message} </div>   } 
                      <p className="stage-date">
                        {stage.date ? moment(stage.date).format("MMM D, YYYY h:mm A") : "Pending"}
                      </p>
                    </div>
                    {index < updatedStages.length - 1 && <div className="timeline-connector"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* Comment Modal */}
      <Modal show={showComment} onHide={() => setShowComment(false)} size="md" centered>
        <Modal.Header closeButton>
          <Modal.Title>Provide Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="feedback-intro">
            <p>Thank you for choosing <strong>CHUKKYTECH</strong>. We value your feedback to help us improve our services.</p>
          </div>
          
          <form onSubmit={handleSubmit(handleSubmitComment)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Brief summary of your feedback..."
                {...register("title", {
                  required: 'Title is required',
                  maxLength: {
                    value: 50,
                    message: 'Title cannot exceed 50 characters'
                  }
                })}
              />
              {errors.title && <div className="text-danger small">{errors.title.message}</div>}
            </div>
            
            <div className="mb-4">
              <label className="form-label">Comment</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Please share your experience and suggestions..."
                {...register("comment", {
                  required: 'Comment is required'
                })}
              />
              {errors.comment && <div className="text-danger small">{errors.comment.message}</div>}
            </div>

            {/* {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errMessage}
              </div>
            )} */}

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="outline-secondary" onClick={() => setShowComment(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>





    </>
  )
})

export default RepairOrders