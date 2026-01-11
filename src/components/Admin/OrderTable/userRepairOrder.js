import { useEffect, useState, useMemo } from "react";
import AdminDashboard from "../adminDashboard";
import { chukkytechAxios } from "../../Utility/axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../layouts/Footer";
import { FaPlus } from "react-icons/fa";
import useGetData from "../../Utility/getFunction";

const RepairOrderTable = () => {
  const [showDropDown, setShowDropDown] = useState(null);
  const [orderData, setOrderData] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successText, setSuccessText] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [itemData, setItemData] = useState({});
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrderType, setSelectedOrderType] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progressStatus, setProgressStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20;

  const navigate = useNavigate();

 const adminsInfo = localStorage.getItem('adminsInfo');

 const parsedAdminsInfo = JSON.parse(adminsInfo);
  useEffect(() => {

    if (!parsedAdminsInfo) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const fetchAdminRepairOrder = async () => {
    setIsPending(true);
    try {
      const response = await chukkytechAxios.get("adminRepair/getAllRepairOrder");
      setData(response.data);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      console.error('Error fetching repair orders:', error);
    }
  };

  useEffect(() => {
    fetchAdminRepairOrder();
  }, []);

  const getLatestRepairOrders = (orders) => {
    if (!Array.isArray(orders)) {
      return [];
    }

    const latestOrders = orders.reduce((acc, order) => {
      if (
        !acc[order.repairOrderCode] ||
        new Date(order.createdDateTime) > new Date(acc[order.repairOrderCode].createdDateTime)
      ) {
        acc[order.repairOrderCode] = order;
      }
      return acc;
    }, {});

    return Object.values(latestOrders);
  };

  const ordersArray = Array.isArray(data)
    ? data
    : Array.isArray(data.repairOrders)
      ? data.repairOrders
      : [];
  const latestOrders = getLatestRepairOrders(ordersArray);

  const filterOrders = () => {
    const lowerSearch = searchTerm.toLowerCase();

    return latestOrders.filter((order) => {
      const matchesSearch =
        order.repairOrderCode?.toLowerCase().includes(lowerSearch) ||
        order.deviceType?.toLowerCase().includes(lowerSearch) ||
        order.deviceModel?.toLowerCase().includes(lowerSearch);

      const matchesStatus =
        selectedStatus === "all" ? true : order.status?.toLowerCase() === selectedStatus.toLowerCase();
      const matchesOrderType =
        selectedOrderType === "all" ? true : order.repairOrderType === selectedOrderType;

      return matchesSearch && matchesStatus && matchesOrderType;
    });
  };

  // ✅ FIXED: Prevent pagination reset when only navigating pages
  useEffect(() => {
    const filtered = filterOrders();
    setFilteredOrders(filtered);
    // Reset only when filters or search term change — not when currentPage changes
  }, [searchTerm, selectedStatus, selectedOrderType, data]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    return filteredOrders.slice(startIndex, startIndex + ordersPerPage);
  }, [filteredOrders, currentPage]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 20;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  const handleGetDetails = (item) => {
    setItemData(item);
  };

  const handleUpdateKeys = (e, item) => {
    handleGetDetails(item);
    const action = e.target.value;

    if (action === "viewDetail") {
      setShowDetails(true);
    } else if (action !== "action") {
      setProgressStatus(action);
      setShowModal(true);
    }
  };

  const handleUpdateDeviceData = async () => {
    try {
      setLoading(true);
      const deviceData = {
        details: itemData?.details,
        deviceModel: itemData?.deviceModel,
        deviceType: itemData?.deviceType,
        phone: itemData?.phone,
        pickUpAddress: itemData?.pickUpAddress,
        reserveDate: itemData?.reserveDate,
        userId: itemData?.userId,
        repairOrderId: itemData?.repairOrderId,
        repairOrderType: itemData?.repairOrderType,
        status: progressStatus,
        repairOrderCode: itemData?.repairOrderCode,
      };

      const res = await chukkytechAxios.post("repair/repairorder", deviceData);
      setLoading(false);
      setSuccessText(res?.data?.message);
      setSuccessMessage(true);
      setShowModal(false);
      setTimeout(() => setSuccessMessage(false), 4000);
      fetchAdminRepairOrder();
    } catch (err) {
      console.error("API error:", err);
      setLoading(false);
      setShowModal(false);
      setErrorMessage(true);
      setErrMessage(err.response?.data || "An error occurred");
      setTimeout(() => setErrorMessage(false), 4000);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      processing: { class: "badge bg-primary", label: "Processing" },
      pickedup: { class: "badge bg-info", label: "Picked Up" },
      fixing: { class: "badge bg-warning text-dark", label: "Fixing" },
      fixed: { class: "badge bg-success", label: "Fixed" },
      delivered: { class: "badge bg-success", label: "Delivered" },
      irreparable: { class: "badge bg-danger", label: "Cannot Fix" },
      cancel: { class: "badge bg-secondary", label: "Cancelled" },
      settled: { class: "badge bg-dark", label: "Settled" },
      paid: { class: "badge bg-success", label: "Paid" },
    };

    const config =
      statusConfig[status?.toLowerCase()] || { class: "badge bg-secondary", label: status };
    return <span className={config.class}>{config.label}</span>;
  };

  const getActionLabel = (action) => {
    const actionLabels = {
      pickedUp: "Picked Up",
      fixing: "Fixing",
      fixed: "Fixed",
      delivered: "Delivered",
      irreparable: "Unable to Repair",
      settled: "Settled",
      cancel: "Cancel",
    };
    return actionLabels[action] || action;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRefresh = () => {
    fetchAdminRepairOrder();
    setCurrentPage(1);
  };


  const navigatePaymentData = (item) => {
    navigate("/add-view-payment", { state: { item } });
  };

   const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

  const { data: paymentGetAllData, isPending: orderPendingPayment, error } = useGetData('/repairPayment/getAllPayments');


 

  return (
    <>
      <AdminDashboard />

      {/* Header Section */}
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', marginTop: '-20px' }}>
        <div className="row align-items-center">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/admin-dashboard-card" className="text-decoration-none">Dashboard</a></li>
                <li className="breadcrumb-item"><a className="text-decoration-none">Orders</a></li>
                <li className="breadcrumb-item active text-dark">Repair Orders</li>
              </ol>
            </nav>
            <h1 className="h3 mb-0 mt-2 text-dark">Repair Orders Management</h1>
            <p className="text-muted mb-0">Manage and track all device repair orders</p>
          </div>
          <div className="col-auto">
            <button
              className="btn btn-outline-primary d-flex align-items-center"
              onClick={handleRefresh}
              disabled={isPending}
            >
              <span className={`spinner-border spinner-border-sm me-2 ${isPending ? '' : 'd-none'}`}></span>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container-fluid mt-4">
        <div className="row g-3 mb-4">
          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-2">Total Orders</h6>
                    <h3 className="mb-0">{latestOrders.length}</h3>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <i className="fas fa-tools text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-2">In Progress</h6>
                    <h3 className="mb-0">
                      {latestOrders.filter(order =>
                        ['processing', 'pickedup', 'fixing'].includes(order.status?.toLowerCase())
                      ).length}
                    </h3>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <i className="fas fa-cog text-warning"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-2">Completed</h6>
                    <h3 className="mb-0">
                      {latestOrders.filter(order =>
                        ['fixed', 'delivered', 'settled'].includes(order.status?.toLowerCase())
                      ).length}
                    </h3>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <i className="fas fa-check-circle text-success"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title text-muted mb-2">Issues</h6>
                    <h3 className="mb-0">
                      {latestOrders.filter(order =>
                        ['irreparable', 'cancel'].includes(order.status?.toLowerCase())
                      ).length}
                    </h3>
                  </div>
                  <div className="bg-danger bg-opacity-10 p-3 rounded">
                    <i className="fas fa-exclamation-triangle text-danger"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className=" border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h5 className="card-title mb-0">Search & Filters</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4">
                <label className="form-label fw-semibold">Search Orders</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by order code, device name or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <label className="form-label fw-semibold">Order Status</label>
                <select
                  className="form-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pickedUp">Picked Up</option>
                  <option value="fixing">Fixing</option>
                  <option value="fixed">Fixed</option>
                  <option value="delivered">Delivered</option>
                  <option value="irreparable">Cannot Fix</option>
                  <option value="cancel">Cancelled</option>
                  <option value="settled">Settled</option>
                </select>
              </div>
              <div className="col-lg-4">
                <label className="form-label fw-semibold">Order Type</label>
                <select
                  className="form-select"
                  value={selectedOrderType}
                  onChange={(e) => setSelectedOrderType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Instore Appointment">Instore Appointment</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className=" border-0 shadow-sm mt-4">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Repair Orders</h5>
            <div className="text-muted small">
              Showing {paginatedOrders.length} of {filteredOrders.length} orders
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 py-3 fw-semibold">SN</th>
                    <th className="py-3 fw-semibold">Order Code</th>
                    <th className="py-3 fw-semibold">Device</th>
                    <th className="py-3 fw-semibold">Fault</th>
                    <th className="py-3 fw-semibold">Type</th>
                     
                    <th className="py-3 fw-semibold">Scheduled Date</th>
                    <th className="py-3 fw-semibold">Total Amount</th>
                    <th className="py-3 fw-semibold">Payment Status</th>
                    <th className="py-3 fw-semibold">Status</th>
                     <th className="py-3 fw-semibold">Last updated</th>

                    <th className="pe-4 py-3 fw-semibold text-center">Actions</th>
                    {
                       parsedAdminsInfo?.role === 'super-admin' && <th className="py-3 fw-semibold">Add/view payment</th>
                    }
                    
                  </tr>
                </thead>
                <tbody>
                  {isPending ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2 text-muted">Loading repair orders...</p>
                      </td>
                    </tr>
                  ) : paginatedOrders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <div className="text-muted">
                          <i className="fas fa-tools fa-3x mb-3"></i>
                          <p>{searchTerm || selectedStatus !== "all" || selectedOrderType !== "all" ? "No orders match your filters" : "No repair orders found"}</p>
                          {(searchTerm || selectedStatus !== "all" || selectedOrderType !== "all") && (
                            <button
                              className="btn btn-outline-primary mt-2"
                              onClick={() => {
                                setSearchTerm("");
                                setSelectedStatus("all");
                                setSelectedOrderType("all");
                              }}
                            >
                              Clear Filters
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedOrders.map((item, index) => (
                      <tr key={item.repairOrderCode} className="align-middle">
                        <td className="ps-4" data-label="SN">{(currentPage - 1) * ordersPerPage + index + 1}</td>
                        <td data-label="Order Code">
                          <span className="fw-semibold text-primary">{item.repairOrderCode}</span>
                        </td>
                        <td data-label="Device">
                          <div>
                            <div className="fw-semibold">{item.deviceType}</div>
                            <small className="text-muted">{item.deviceModel}</small>
                          </div>
                        </td>
                        <td data-label="Fault">
                          <span className="text-muted" title={item.details}>
                            {item.details?.length > 50 ? `${item.details.substring(0, 50)}...` : item.details}
                          </span>
                        </td>
                        <td data-label="Type">
                          <span className="badge bg-light text-dark">{item.repairOrderType}</span>
                        </td>
                      
                        <td data-label="Scheduled Date">
                          <span className="text-muted">
                            {moment(item.reserveDate).format("lll")}
                          </span>
                         
                        </td>
                        <td data-label="Total Amount">
                          <strong>
                            {
                              paymentGetAllData?.data?.some(
                                payment => payment.repairOrderId === item.repairOrderId
                              )
                                ? `₦${paymentGetAllData.data.find(
                                  payment => payment.repairOrderId === item.repairOrderId
                                ).totalAmount}`
                                : "Pending"
                            }
                          </strong>

                        </td>
                        <td data-label="Payment Status">
                          {getStatusBadge(item.paymentStatus || "Pending")} 
                        </td>
                        <td data-label="Status">
                          {getStatusBadge(item.status)}
                        </td>

                           <td data-label="Last updated">
                          <span className="text-muted">
                            {moment(item.createdDateTime).format("lll")}
                          </span>
                         
                        </td>

                        <td className="pe-4 text-center">
                          <select
                            className="form-select form-select-sm"
                            onChange={(e) => handleUpdateKeys(e, item)}
                            style={{ minWidth: '150px' }}
                          >
                            <option value="action">Actions</option>
                            <option value="viewDetail">View Details</option>
                            <option value="pickedUp">Mark as Picked Up</option>
                            <option value="fixing">Mark as Fixing</option>
                            <option value="fixed">Mark as Fixed</option>
                            <option value="delivered">Mark as Delivered</option>
                            <option value="irreparable">Mark as Unable to Repair</option>
                            <option value="settled">Mark as Settled</option>
                            <option value="cancel">Cancel Order</option>
                          </select>
                        </td>

                        {
                          parsedAdminsInfo?.role === 'super-admin' && (
                        <td data-label="Add/view payment" onClick={() => navigatePaymentData(item)} style={{ cursor: 'pointer' }}>
                          <FaPlus />
                        </td>
                      )}

                        {/* <td data-label="Add/view payment" onClick={() => navigatePaymentData(item)} style={{ cursor: 'pointer' }}>
                          <FaPlus />

                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fixed Pagination */}
          {!isPending && filteredOrders.length > 0 && (
            <div className="card-footer bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted">
                  Showing {((currentPage - 1) * ordersPerPage) + 1} to {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of {filteredOrders.length} entries
                </div>
                <nav>
                  <ul className="pagination mb-0">
                    {/* Previous Button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        &laquo; Previous
                      </button>
                    </li>

                    {/* Page Numbers - FIXED: Use the memoized pageNumbers */}
                    {pageNumbers.map((page, index) => (
                      <li key={index} className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}>
                        {page === '...' ? (
                          <span className="page-link">...</span>
                        ) : (
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        )}
                      </li>
                    ))}

                    {/* Next Button */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> {successText || "Order updated successfully."}
            <button type="button" className="btn-close" onClick={() => setSuccessMessage(false)}></button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i>
            <strong>Error!</strong> {errMessage.message || "Something went wrong, please try again."}
            <button type="button" className="btn-close" onClick={() => setErrorMessage(false)}></button>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className={`bg-${progressStatus === 'cancel' || progressStatus === 'irreparable' ? 'danger' : 'primary'} bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3`}
              style={{ width: '60px', height: '60px' }}>
              <i className={`fas fa-${progressStatus === 'cancel' ? 'times' : 'cog'} text-${progressStatus === 'cancel' || progressStatus === 'irreparable' ? 'danger' : 'primary'} fa-lg`}></i>
            </div>
            <h5>Update to {getActionLabel(progressStatus)}</h5>
            <p className="text-muted">
              Are you sure you want to update the status of order <strong>{itemData.repairOrderCode}</strong> to <strong>{getActionLabel(progressStatus)}</strong>?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant={progressStatus === 'cancel' || progressStatus === 'irreparable' ? 'danger' : 'primary'}
            onClick={handleUpdateDeviceData}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Updating...
              </>
            ) : (
              `Yes, Update to ${getActionLabel(progressStatus)}`
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Order Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Repair Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Order Code</label>
                <p className="mb-0">{itemData.repairOrderCode}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Device Type</label>
                <p className="mb-0">{itemData.deviceType}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Device Model</label>
                <p className="mb-0">{itemData.deviceModel}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Order Type</label>
                <p className="mb-0">{itemData.repairOrderType}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Scheduled Date</label>
                <p className="mb-0">{moment(itemData.reserveDate).format("MMM DD, YYYY h:mm A")}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Phone Number</label>
                <p className="mb-0">{itemData.phone}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Pickup Address</label>
                <p className="mb-0">{itemData.pickUpAddress}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold text-muted">Status</label>
                <p className="mb-0">{getStatusBadge(itemData.status)}</p>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <label className="form-label fw-semibold text-muted">Issue Description</label>
            <div className="border rounded p-3 bg-light">
              {itemData.details}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <section style={{ marginTop: "5%" }}>
        <Footer />
      </section>

    </>
  );
};

export default RepairOrderTable;