import { useEffect, useRef, useState } from "react";
import Header from "../../layouts/Header";
import UserDashBoard from "../userDashboard";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import brandLogo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"
import { 
  MdKeyboardBackspace, 
  MdOutlineShoppingBag,
  MdOutlinePendingActions,
  MdOutlineLocalShipping,
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlineRemoveRedEye,
  MdOutlineSearch
} from "react-icons/md";
import { 
  FaBox, 
  FaMoneyBillWave, 
  FaMapMarkerAlt,
  FaClock,
  FaFilter,
  FaCheck,
  FaUserCheck,
  FaTruckLoading
} from "react-icons/fa";
import { chukkytechAxios } from "../../Utility/axios";
import { Badge, Card, Button, Modal, Table, Row, Col } from "react-bootstrap";
import moment from "moment";
import "./productOrders.css";


const ProductOrders = (() => {
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [pendingUserProductOrder, setPendingUserProductOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
   const [actionDialog, setActionDialog] = useState(false);
   const [statusPending, setStatusPending] = useState(false);
    const receiptRef = useRef(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/user-login');
    }
  }, [navigate]);

  const userInfo = localStorage.getItem("userInfo");
  const user = JSON.parse(userInfo);
  const encodedEmail = encodeURIComponent(user.email);

  const fetchUserData = async () => {
    try {
      const userResponse = await chukkytechAxios.get(`/auth/getUser/${encodedEmail}`);
      const userData = userResponse.data;
      
      if (userData.userId) {
        await fetchUserProductOrders(userData.userId);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage("Failed to load user data");
    }
  };

  const fetchUserProductOrders = async (userId) => {
    setPendingUserProductOrder(true);
    try {
      const response = await chukkytechAxios.get(`/order/orders/user/${userId}`);
      console.log('User Products Response:', response.data);
      
      if (response.data && response.data.data) {
        setUserProducts(response.data.data);
      } else {
        setUserProducts([]);
      }
      setPendingUserProductOrder(false);
    } catch (error) {
      setPendingUserProductOrder(false);
      console.error('Error fetching orders:', error);
      setErrorMessage("Failed to load orders");
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await chukkytechAxios.get(`/order/orders/${orderId}`);
      console.log('Order Details Response:', response.data);

      setOrderItems(response.data.data);
       
    } catch (error) {
      console.error('Error fetching order details:', error);
      return null;
    }
  };

  const getStatusVariant = (status) => {
    const variants = {
      pending: "warning",
      confirmed: "info",
      processing: "primary",
      shipped: "info",
      delivered: "success",
      cancelled: "danger",
      completed: "success"
    };
    return variants[status?.toLowerCase()] || "secondary";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <MdOutlinePendingActions />,
      confirmed: <FaUserCheck />,
      processing: <FaBox />,
      shipped: <MdOutlineLocalShipping />,
      delivered: <MdOutlineCheckCircle />,
      cancelled: <MdOutlineCancel />,
      completed: <MdOutlineCheckCircle />
    };
    return icons[status?.toLowerCase()] || <MdOutlinePendingActions />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return moment(dateString).format('MMM D, YYYY [at] h:mm A');
  };

  const handleViewOrder = async (order) => {
    setSelectedOrder(order);

        
    await fetchOrderDetails(order.order_id);
    
    setShowOrderModal(true);
  };



  // Order Tracking Status Configuration
  const getOrderTrackingSteps = (orderStatus) => {
    const status = orderStatus?.toLowerCase() || 'pending';
    
    const allSteps = [
      {
        key: 'pending',
        title: 'Order Placed',
        description: 'Your order has been received and payment is being processed',
        icon: <MdOutlinePendingActions />,
        completed: true, // Always completed once order exists
        active: status === 'pending'
      },
      {
        key: 'confirmed',
        title: 'Order Confirmed',
        description: 'Payment confirmed and order is being processed',
        icon: <FaUserCheck />,
        completed: ['confirmed', 'processing', 'shipped', 'delivered', 'completed'].includes(status),
        active: status === 'confirmed'
      },
      {
        key: 'processing',
        title: 'Processing',
        description: 'Your items are being prepared for shipment',
        icon: <FaTruckLoading />,
        completed: ['processing', 'shipped', 'delivered', 'completed'].includes(status),
        active: status === 'processing'
      },
      {
        key: 'shipped',
        title: 'Shipped',
        description: 'Your order has been dispatched and is on the way',
        icon: <MdOutlineLocalShipping />,
        completed: ['shipped', 'delivered', 'completed'].includes(status),
        active: status === 'shipped'
      },
      {
        key: 'delivered',
        title: 'Delivered',
        description: 'Your order has been successfully delivered',
        icon: <MdOutlineCheckCircle />,
        completed: ['delivered', 'completed'].includes(status),
        active: status === 'delivered'
      },
      // {
      //   key: 'completed',
      //   title: 'Completed',
      //   description: 'Order process finished successfully',
      //   icon: <FaCheck />,
      //   completed: status === 'completed',
      //   active: status === 'completed'
      // }
    ];

    // For cancelled orders, show only up to pending and mark as cancelled
    if (status === 'cancelled') {
      return allSteps.map(step => ({
        ...step,
        completed: step.key === 'pending',
        active: false,
        cancelled: true
      }));
    }

    return allSteps;
  };

  // Get estimated delivery date based on status
  const getEstimatedDelivery = (orderDate, status) => {
    if (!orderDate) return 'N/A';
    
    const orderMoment = moment(orderDate);
    const statusLower = status?.toLowerCase();
    
    switch (statusLower) {
      case 'pending':
        return orderMoment.add(2, 'days').format('MMM D, YYYY');
      case 'confirmed':
        return orderMoment.add(3, 'days').format('MMM D, YYYY');
      case 'processing':
        return orderMoment.add(4, 'days').format('MMM D, YYYY');
      case 'shipped':
        return orderMoment.add(1, 'days').format('MMM D, YYYY');
      case 'delivered':
      case 'completed':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return orderMoment.add(3, 'days').format('MMM D, YYYY');
    }
  };

  // Get status description message
  const getStatusDescription = (status) => {
    const statusLower = status?.toLowerCase();
    
    const messages = {
      pending: "Your order is being processed. You will receive a confirmation soon.",
      confirmed: "Your order has been confirmed and is being prepared for processing.",
      processing: "We are preparing your items for shipment. This usually takes 1-2 business days.",
      shipped: "Your order has been shipped and is on its way to you. Track your package for real-time updates.",
      delivered: "Your order has been successfully delivered. Thank you for your purchase!",
      completed: "Your order has been completed. We hope you enjoy your products!",
      cancelled: "This order has been cancelled. Please contact support if you have any questions."
    };
    
    return messages[statusLower] || "Your order is being processed.";
  };

  const filteredOrders = userProducts.filter(order => {
    const matchesSearch = 
      order.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.order_status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAction = (action) => {
        setActionDialog(true);
     };

    const handleCloseDialog = () => {
        setActionDialog(false);
        // setSelectedItem(null);
    };


         const handleChangeStatus = async data => {
           setStatusPending(true);
             const status = "cancelled"
             console.log("...selectedOrder?.order_id", selectedOrder?.order_id)
           
        await chukkytechAxios
            .put(`/order/orders/${selectedOrder?.order_id}/${status}`)
            .then(res => {
                console.log('res', res);
                  setStatusPending(false);
                   fetchUserData();
                  handleCloseDialog();
                  setShowOrderModal(false);
              })
            .catch(err => {
                console.log('err', err);
                setStatusPending(false);
               });
              };



const downloadReceipt = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "receipt.png";
      link.click();
    }
  };



  return (
    <>
      <Header />
      <div className="tec-main-Hide">
        <UserDashBoard />
      </div>
      
      <div className="main-content">
        <div className="product-orders-container">
          <div className="orders-header">
            <div className="back-nav" onClick={() => navigate(-1)}>
              <MdKeyboardBackspace size={24} />
              <span>Back to Dashboard</span>
            </div>
            <div className="header-content">
              <div className="header-main">
                <MdOutlineShoppingBag size={32} className="header-icon" />
                <div>
                  <div>Product Orders</div>
                  <p style={{fontSize:"12px"}}>Manage and track your orders</p>
                </div>
              </div>
              <div className="order-stats">
                <div className="stat-card">
                  <span className="stat-number">{userProducts.length}</span>
                  <span className="stat-label">Total Orders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="search-filter-card">
            <Card.Body>
              <Row className="g-3 align-items-center">
                <Col md={6}>
                  <div className="search-box">
                    {/* <MdOutlineSearch className="search-icon" /> */}
                    <input
                      type="text"
                      placeholder="Search orders by ID, customer name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="filter-group">
                    <FaFilter className="filter-icon" />
                    <select 
                      className="filter-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </div>

          {/* Orders List */}
          <div className="orders-section">
            {pendingUserProductOrder ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your orders...</p>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="orders-grid">
                {filteredOrders.map((order) => (
                  <div key={order.order_id} className="order-card">
                    <Card.Body>
                      {/* Order Header */}
                      <div className="order-header">
                        <div className="order-info">
                          <div className="order-id">Order #{order.order_id}</div>
                          <div className="order-date">
                            <FaClock />
                            {formatDate(order.created_date)}
                          </div>
                        </div>
                        <Badge 
                          bg={getStatusVariant(order.order_status)} 
                          className="status-badge"
                        >
                          {getStatusIcon(order.order_status)}
                          {order.order_status}
                        </Badge>
                      </div>

                      {/* Customer Info */}
                      <div className="customer-info">
                        <div className="customer-name">
                          <strong>{order.customer_name}</strong>
                        </div>
                        <div className="customer-contact">
                          {order.customer_email}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="order-summary">
                        <Row className="g-2">
                          {/* <Col xs={6}>
                            <div className="summary-item">
                              <span className="summary-label">Items</span>
                              <span className="summary-value">
                                {order.items_count || 'N/A'}
                               </span>
                            </div>
                          </Col> */}
                          <Col xs={12}>
                            <div className="summary-item">
                              <span className="summary-label">Total</span>
                              <span className="summary-value">
                                {formatCurrency(order.total_amount)}
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      {/* Action Buttons */}
                      <div className="order-actions">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                          className="action-btn"
                        >
                          <MdOutlineRemoveRedEye />
                          View Details & Tracking
                        </Button>
                      </div>
                    </Card.Body>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <MdOutlineShoppingBag size={64} className="empty-icon" />
                <h4>No Orders Found</h4>
                <p>
                  {searchTerm || statusFilter !== "all" 
                    ? "No orders match your search criteria. Try adjusting your filters."
                    : "You haven't placed any orders yet. Start shopping to see your orders here."
                  }
                </p>
                {!searchTerm && statusFilter === "all" && (
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/buy-products')}
                  >
                    Start Shopping
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Order Details Modal with Tracking */}
        <Modal 
          show={showOrderModal} 
          onHide={() => setShowOrderModal(false)} 
          size="lg"
          centered
          className="order-tracking-modal"
         
        >
          <Modal.Header closeButton className="border-bottom-0 bg-light">
            <Modal.Title className="w-100">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-1">Order #{selectedOrder?.order_id}</h4>
                  <small className="text-muted">
                    Placed on {selectedOrder && formatDate(selectedOrder.created_date)}
                  </small>
                </div>
               
              </div>
               <div>
                {selectedOrder && (
                  <Badge 
                    bg={getStatusVariant(selectedOrder.order_status)} 
                    className="fs-6 px-3 py-2"
                  >
                    {getStatusIcon(selectedOrder.order_status)}
                    <span className="ms-2 text-capitalize">{selectedOrder.order_status}</span>
                  </Badge>
                )}
                </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            {selectedOrder && (
              <div className="order-details-modal"  id="download-receipt" ref={receiptRef} >
            <div style={{justifyContent:"center", textAlign:"center", padding:"5px"}}>    <img src={brandLogo} className="loGO-ReceIpt"/> <span className="nameBrand-Receipt"> Chukkytech</span></div>
                {/* Order Tracking Timeline */}
                <div className="border-0 shadow-sm mb-4">
                  <Card.Body className="p-4">
                    <h5 className="mb-4 d-flex align-items-center">
                      <FaClock className="me-2 text-primary" />
                      Order Tracking
                    </h5>
                    
                    <div className="order-tracking-timeline">
                      {getOrderTrackingSteps(selectedOrder.order_status).map((step, index, array) => (
                        <div 
                          key={step.key}
                          className={`tracking-step ${step.completed ? 'completed' : ''} ${
                            step.active ? 'active' : ''
                          } ${step.cancelled ? 'cancelled' : ''}`}
                        >
                          <div className="step-indicator">
                            <div className={`step-icon ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}`}>
                              {step.completed ? (
                                <div className="completed-icon">
                                  <FaCheck />
                                </div>
                              ) : (
                                <div className="default-icon">
                                  {step.icon}
                                </div>
                              )}
                            </div>
                            {index < array.length - 1 && (
                              <div className={`step-connector ${step.completed ? 'completed' : ''}`}></div>
                            )}
                          </div>
                          <div className="step-content">
                            <div className="step-title">
                              {step.title}
                              {step.completed && !step.cancelled && (
                                <span className="step-badge completed-badge">
                                  Completed
                                </span>
                              )}
                              {step.active && (
                                <span className="step-badge active-badge">
                                  Current
                                </span>
                              )}
                              {step.cancelled && (
                                <span className="step-badge cancelled-badge">
                                  Cancelled
                                </span>
                              )}
                            </div>
                            <div className="step-description">
                              {step.description}
                            </div>
                            {step.key === 'pending' && selectedOrder.created_date && (
                              <div className="step-time">
                                {formatDate(selectedOrder.created_date)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Current Status Summary */}
                    <div className="current-status-summary mt-4 p-3 bg-light rounded">
                      <Row className="align-items-center">
                        <Col md={8}>
                          <h6 className="mb-1">Current Status</h6>
                          <p className="mb-0 text-muted">
                            {getStatusDescription(selectedOrder.order_status)}
                          </p>
                        </Col>
                        <Col md={4} className="text-md-end">
                          <div className="estimated-delivery">
                            <strong>Estimated Delivery:</strong>
                            <div className="text-primary fw-bold">
                              {getEstimatedDelivery(selectedOrder.created_date, selectedOrder.order_status)}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card.Body>
                </div>

                {/* Order Information */}
                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <Card className="border-0 shadow-sm h-100">
                      <Card.Body>
                        <h6 className="section-title d-flex align-items-center">
                          <FaMoneyBillWave className="me-2 text-success" />
                          Payment Information
                        </h6>
                        <div className="info-grid">
                          <div className="info-item">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(selectedOrder.subtotal)}</span>
                          </div>
                          <div className="info-item">
                            <span>Delivery Fee:</span>
                            <span>{formatCurrency(selectedOrder.delivery_fee)}</span>
                          </div>
                          <div className="info-item total">
                            <span>Total Amount:</span>
                            <span>{formatCurrency(selectedOrder.total_amount)}</span>
                          </div>
                          <div className="info-item">
                            <span>Payment Method:</span>
                            <span className="text-capitalize">
                              {selectedOrder.payment_method || "Not specified"}
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={6}>
                    <div className="border-0 shadow-sm h-100">
                      <Card.Body>
                        <h6 className="section-title d-flex align-items-center">
                          <FaMapMarkerAlt className="me-2 text-danger" />
                          Delivery Address
                        </h6>
                        {orderItems.deliveryAddress ? (
                          <div className="delivery-address">
                            <strong>{orderItems.deliveryAddress.firstName} {orderItems.deliveryAddress.lastName}</strong>
                            <p className="mb-1">{orderItems.deliveryAddress.deliveryAddress}</p>
                            <p className="mb-1">
                              {orderItems.deliveryAddress.lgaName}, {orderItems.deliveryAddress.stateName}
                            </p>
                            <p className="mb-1">{orderItems.deliveryAddress.phoneNumber}</p>
                            <p className="mb-0">{orderItems.deliveryAddress.emailAddress}</p>
                          </div>
                        ) : (
                          <p className="text-muted">No delivery address provided</p>
                        )}
                      </Card.Body>
                    </div>
                  </Col>
                </Row>

                {/* Order Items */}
                <div className="border-0 shadow-sm">
                  <Card.Body>
                    <h6 className="section-title mb-3">Order Items ({orderItems?.selectedProduct?.length})</h6>
                    {orderItems?.selectedProduct?.length > 0 ? (
                      <div className="order-items-table">
                        <Table borderless responsive className="mb-0">
                          <thead className="bg-light">
                            <tr>
                              <th>Product</th>
                              <th className="text-center">Price</th>
                              <th className="text-center">Quantity</th>
                              <th className="text-end">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderItems?.selectedProduct?.map((item, index) => (
                              <tr key={index} className="border-bottom">
                                <td data-label ="Product">
                                  <div className="product-info">
                                    <strong>{item.productName}</strong>
                                    {item.categoryName && (
                                      <small className="text-muted d-block">{item.categoryName}</small>
                                    )}
                                  </div>
                                </td>
                                <td className="text-center" data-label ="Price">{formatCurrency(item.productPrice)}</td>
                                <td className="text-center" data-label="Quantity">{item.quantity}</td>
                                <td className="text-end fw-bold" data-label="Total">
                                  {formatCurrency(item.productPrice * item.quantity)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted">No items found for this order.</p>
                      </div>
                    )}
                  </Card.Body>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="border-top-0">
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowOrderModal(false)}
            >
              Close
            </Button>
            {selectedOrder?.order_status === 'pending' && (
              <Button variant="outline-danger" color="error"
                                        onClick={() => handleAction('cancelled')}>
                Cancel Order
              </Button>
            )}
            {(selectedOrder?.order_status === 'delivered' || selectedOrder?.order_status === 'completed') && (
              <Button variant="primary" onClick={downloadReceipt }>
                Download Invoice
              </Button>
            )}
          </Modal.Footer>
        </Modal>


        <Modal show={actionDialog} onHide={()=>setActionDialog(false)} animation={false}   centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm elete Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>  Are you sure you want to cancel this order? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setActionDialog(false)}>
            Close
          </Button>
          {
           statusPending ? <Button variant="" style={{backgroundColor:"red", color:"white"}}  disabled>
            <span className="loader"></span>
          </Button>:<Button variant="" style={{backgroundColor:"red", color:"white"}}  onClick={handleChangeStatus}>
            Proceed to Cancel
          </Button>
          }
         
        </Modal.Footer>
      </Modal>

                {/* <Dialog open={actionDialog.open} onClose={handleCloseDialog}>
                    <DialogTitle>
                        Confirm {actionDialog.action.charAt(0).toUpperCase() + actionDialog.action.slice(1)} Order
                    </DialogTitle>
                    <DialogContent>
                        <Typography>
                            Are you sure you want to cancel this order? This action cannot be undone.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button
                            onClick={handleChangeStatus}
                            variant="contained"
                            color={actionDialog.action === 'cancel' ? 'error' : 'primary'}
                        >
                            Confirm {actionDialog.action.charAt(0).toUpperCase() + actionDialog.action.slice(1)}
                        </Button>
                    </DialogActions>
                </Dialog> */}





      </div>
    </>
  );
});

export default ProductOrders;