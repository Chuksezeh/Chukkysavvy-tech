import { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import UserDashBoard from "../userDashboard";
import { useNavigate } from "react-router-dom";
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
  FaFilter
} from "react-icons/fa";
import { chukkytechAxios } from "../../Utility/axios";
import { Badge, Card, Button, Modal, Table, Row, Col } from "react-bootstrap";
import moment from "moment";
import "./productOrders.css";

const ProductOrders = (() => {
  const navigate = useNavigate();
  const [userProducts, setUserProducts] = useState([]);
  const [orderItems, setOrderItems] = useState({});
  const [pendingUserProductOrder, setPendingUserProductOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
        await Promise.all([
          fetchUserProductOrders(userData.userId),
        ]);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage("Failed to load user data");
    }
  };

  const fetchUserProductOrders = async (userId) => {
    setPendingUserProductOrder(true);
    try {
      const response = await chukkytechAxios.get(`order/orders/user/${userId}`);
      console.log('User Products:', response.data.data);
      setUserProducts(response.data.data || []);
      
      // Fetch order items for each order
      if (response.data.data && response.data.data.length > 0) {
        response.data.data.forEach(order => {
          fetchOrderItems(order.order_id);
        });
      }
      setPendingUserProductOrder(false);
    } catch (error) {
      setPendingUserProductOrder(false);
      console.error('Error fetching orders:', error);
    }
  };

  const fetchOrderItems = async (orderId) => {
    try {
      const response = await chukkytechAxios.get(`order/orders/${orderId}/items`);
      setOrderItems(prev => ({
        ...prev,
        [orderId]: response.data.data || []
      }));
    } catch (error) {
      console.error('Error fetching order items:', error);
      setOrderItems(prev => ({
        ...prev,
        [orderId]: []
      }));
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
    return variants[status.toLowerCase()] || "secondary";
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <MdOutlinePendingActions />,
      confirmed: <MdOutlineCheckCircle />,
      processing: <FaBox />,
      shipped: <MdOutlineLocalShipping />,
      delivered: <MdOutlineCheckCircle />,
      cancelled: <MdOutlineCancel />,
      completed: <MdOutlineCheckCircle />
    };
    return icons[status.toLowerCase()] || <MdOutlinePendingActions />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('MMM D, YYYY [at] h:mm A');
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const filteredOrders = userProducts.filter(order => {
    const matchesSearch = 
      order.order_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product_order_code?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.order_status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = userProducts.reduce((acc, order) => {
    acc[order.order_status] = (acc[order.order_status] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Header />
      <div className="tec-main-Hide">
              <UserDashBoard />
            </div>
      
            <div className="main-content">
              {/* <div onClick={() => navigate(-1)}> <MdKeyboardBackspace size={35} /> </div> */}
              {/* <h4>Orders</h4> */}
            
      
      <div className="product-orders-container " >
      
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
                <p style={{fontSize:"12px"}}>Manage and track your product purchases</p>
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

        {/* Stats Overview */}
        {/* <div className="stats-overview">
          <div className="stat-item">
            <Card.Body>
              <div className="stat-icon pending">
                <MdOutlinePendingActions />
              </div>
              <div className="stat-content">
                <span className="stat-count">{statusCounts.pending || 0}</span>
                <span className="stat-title">Pending</span>
              </div>
            </Card.Body>
          </div>
          
          <div className="stat-item">
            <Card.Body>
              <div className="stat-icon processing">
                <FaBox />
              </div>
              <div className="stat-content">
                <span className="stat-count">{statusCounts.processing || 0}</span>
                <span className="stat-title">Processing</span>
              </div>
            </Card.Body>
          </div>
          
          <div className="stat-item">
            <Card.Body>
              <div className="stat-icon shipped">
                <MdOutlineLocalShipping />
              </div>
              <div className="stat-content">
                <span className="stat-count">{statusCounts.shipped || 0}</span>
                <span className="stat-title">Shipped</span>
              </div>
            </Card.Body>
          </div>
          
          <div className="stat-item">
            <Card.Body>
              <div className="stat-icon delivered">
                <MdOutlineCheckCircle />
              </div>
              <div className="stat-content">
                <span className="stat-count">{statusCounts.delivered || 0}</span>
                <span className="stat-title">Delivered</span>
              </div>
            </Card.Body>
          </div>
        </div> */}

        {/* Search and Filter Bar */}
        <div className="search-filter-card">
          <Card.Body>
            <Row className="g-3 align-items-center">
              <Col md={6}>
                <div className="search-box">
                  <MdOutlineSearch className="search-icon" />
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
                        {order.phone_number} • {order.customer_email}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                      <Row className="g-2">
                        <Col xs={6}>
                          <div className="summary-item">
                            <span className="summary-label">Subtotal</span>
                            <span className="summary-value">
                              {formatCurrency(order.subtotal)}
                            </span>
                          </div>
                        </Col>
                        {/* <Col xs={6}>
                          <div className="summary-item">
                            <span className="summary-label">Delivery</span>
                            <span className="summary-value">
                              {formatCurrency(order.delivery_fee)}
                            </span>
                          </div>
                        </Col> */}
                        <Col xs={12}>
                          <div className="summary-total">
                            <span className="total-label">Total Amount</span>
                            <span className="total-value">
                              {formatCurrency(order.total_amount)}
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {/* Order Items Preview */}
                    <div className="items-preview">
                      <div className="items-header">
                        <span>Items ({orderItems[order.order_id]?.length || 0})</span>
                      </div>
                      {orderItems[order.order_id]?.slice(0, 2).map((item, index) => (
                        <div key={index} className="preview-item">
                          <span className="item-name">{item.product_name}</span>
                          <span className="item-quantity">Qty: {item.quantity}</span>
                        </div>
                      ))}
                      {orderItems[order.order_id]?.length > 2 && (
                        <div className="more-items">
                          +{orderItems[order.order_id].length - 2} more items
                        </div>
                      )}
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
                        View Details
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

      {/* Order Details Modal */}
      <Modal 
        show={showOrderModal} 
        onHide={() => setShowOrderModal(false)} 
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Order Details - #{selectedOrder?.order_id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div className="order-details-modal">
              {/* Order Status and Timeline */}
              <dic className="mb-4">
                <Card.Body>
                  <div className="order-status-section">
                    <div className="status-header">
                      <h6>Order Status</h6>
                      <Badge bg={getStatusVariant(selectedOrder.order_status)}>
                        {selectedOrder.order_status}
                      </Badge>
                    </div>
                    <div className="order-timeline">
                      <div className="timeline-item active">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <span>Order Placed</span>
                          <small>{formatDate(selectedOrder.created_date)}</small>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <span>Processing</span>
                          <small>In progress</small>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <span>Shipped</span>
                          <small>Pending</small>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <span>Delivered</span>
                          <small>Pending</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </dic>

              {/* Customer Information */}
              <Row className="g-3 mb-4">
                <Col md={12}>
                  <div>
                    <Card.Body>
                      <h6 className="section-title">
                        <FaMoneyBillWave />
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
                          <span>{selectedOrder.payment_method || "Not specified"}</span>
                        </div>
                      </div>
                    </Card.Body>
                  </div>
                </Col>
                {/* <Col md={6}>
                  <div>
                    <Card.Body>
                      <h6 className="section-title">
                        <FaMapMarkerAlt />
                        Customer Details
                      </h6>
                      <div className="customer-details">
                        <p><strong>Name:</strong> {selectedOrder.customer_name}</p>
                        <p><strong>Email:</strong> {selectedOrder.customer_email}</p>
                        <p><strong>Phone:</strong> {selectedOrder.phone_number}</p>
                        <p><strong>Order Date:</strong> {formatDate(selectedOrder.created_date)}</p>
                      </div>
                    </Card.Body>
                  </div>
                </Col> */}
              </Row>

              {/* Order Items */}
              <div>
                <Card.Body>
                  <h6 className="section-title">Order Items</h6>
                  {orderItems[selectedOrder.order_id]?.length > 0 ? (
                    <div className="order-items-table">
                      <Table borderless responsive>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems[selectedOrder.order_id].map((item, index) => (
                            <tr key={index}>
                              <td>
                                <div className="product-info">
                                  <strong>{item.product_name}</strong>
                                  {item.product_variant && (
                                    <small>Variant: {item.product_variant}</small>
                                  )}
                                </div>
                              </td>
                              <td>{formatCurrency(item.unit_price)}</td>
                              <td>{item.quantity}</td>
                              <td>{formatCurrency(item.unit_price * item.quantity)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <p className="text-muted">No items found for this order.</p>
                    </div>
                  )}
                </Card.Body>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowOrderModal(false)}
          >
            Close
          </Button>
          {selectedOrder?.order_status === 'pending' && (
            <Button variant="outline-danger">
              Cancel Order
            </Button>
          )}
        </Modal.Footer>
      </Modal>
        </div>
    </>
  );
});

export default ProductOrders;