import { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard";
import "./userRepairOrder.css"
import { useNavigate } from "react-router-dom";
import { chukkytechAxios } from "../../Utility/axios";
import moment from "moment";
import Footer from "../../layouts/Footer";

const ProductOrderTable = () => {
  const [showDropDown, setShowDropDown] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [itemData, setItemData] = useState({});
  const [data, setData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrderType, setSelectedOrderType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const ordersPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const adminsInfo = localStorage.getItem('adminsInfo');
    if (!adminsInfo) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const fetchAllProductOrders = async (page = 1, status = "all", search = "") => {
    setIsPending(true);
    try {
      const params = {
        page: page,
        limit: ordersPerPage,
        ...(status !== "all" && { status }),
        ...(search && { search })
      };

      console.log("Fetching orders with params:", params);

      const response = await chukkytechAxios.get('/order/all-orders', { params });
      console.log("API Response:", response.data);
      
      setData(response.data);
      setFilteredOrders(response.data?.data || []);
      setTotalPages(response.data?.pagination?.totalPages || 1);
      setTotalOrders(response.data?.pagination?.total || 0);
      setCurrentPage(page);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      console.error('Error fetching orders:', error);
      setErrMessage("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchAllProductOrders(1, selectedStatus, searchTerm);
  }, []);

  // Handle filter changes - reset to page 1
  useEffect(() => {
    setCurrentPage(1);
    fetchAllProductOrders(1, selectedStatus, searchTerm);
  }, [searchTerm, selectedStatus, selectedOrderType]);

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      fetchAllProductOrders(nextPage, selectedStatus, searchTerm);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      fetchAllProductOrders(prevPage, selectedStatus, searchTerm);
    }
  };

  const handlePageClick = (pageNumber) => {
    fetchAllProductOrders(pageNumber, selectedStatus, searchTerm);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "bg-warning text-dark", label: "Pending" },
      confirmed: { class: "bg-info text-white", label: "Confirmed" },
      processing: { class: "bg-primary text-white", label: "Processing" },
      shipped: { class: "bg-success text-white", label: "Shipped" },
      delivered: { class: "bg-success text-white", label: "Delivered" },
      cancelled: { class: "bg-danger text-white", label: "Cancelled" }
    };

    const config = statusConfig[status?.toLowerCase()] || { class: "bg-secondary text-white", label: status };
    
    return (
      <span className={`badge ${config.class} px-3 py-2`} style={{ fontSize: '0.75rem' }}>
        {config.label}
      </span>
    );
  };

  const handleRefresh = () => {
    fetchAllProductOrders(currentPage, selectedStatus, searchTerm);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setSelectedOrderType("all");
    setCurrentPage(1);
    fetchAllProductOrders(1, "all", "");
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <>
      <AdminDashboard />
      
      {/* Header Section */}
      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', marginTop: '-20px' }}>
        <div className="row align-items-center">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/admin-dashboard-card" className="text-decoration-none">Home</a></li>
                <li className="breadcrumb-item"><a  className="text-decoration-none">Orders</a></li>
                <li className="breadcrumb-item active text-dark">Product Orders</li>
              </ol>
            </nav>
            <h1 className="h3 mb-0 mt-2 text-dark">Product Orders Management</h1>
            <p className="text-muted mb-0">Manage and track all product orders</p>
          </div>
          <div className="col-auto">
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-primary d-flex align-items-center"
                onClick={handleRefresh}
                disabled={isPending}
              >
                <span className={`spinner-border spinner-border-sm me-2 ${isPending ? '' : 'd-none'}`}></span>
                Refresh
              </button>
              <button className="btn btn-primary d-flex align-items-center">
                Export
              </button>
            </div>
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
                    <h3 className="mb-0">{totalOrders}</h3>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <i className="fas fa-shopping-cart text-primary"></i>
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
                    <h6 className="card-title text-muted mb-2">Pending</h6>
                    <h3 className="mb-0">
                      {data?.data?.filter(order => order.orderStatus === 'pending').length || 0}
                    </h3>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <i className="fas fa-clock text-warning"></i>
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
                    <h6 className="card-title text-muted mb-2">Processing</h6>
                    <h3 className="mb-0">
                      {data?.data?.filter(order => order.orderStatus === 'processing').length || 0}
                    </h3>
                  </div>
                  <div className="bg-info bg-opacity-10 p-3 rounded">
                    <i className="fas fa-cog text-info"></i>
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
                      {data?.data?.filter(order => order.orderStatus === 'delivered').length || 0}
                    </h3>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <i className="fas fa-check-circle text-success"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className=" border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h5 className="card-title mb-0">Filters & Search</h5>
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
                    placeholder="Search by order code, customer name or email..."
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
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
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
                </select>
              </div>
            </div>
            {(searchTerm || selectedStatus !== "all") && (
              <div className="mt-3">
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleClearFilters}
                >
                  <i className="fas fa-times me-1"></i>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="car border-0 shadow-sm mt-4">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Product Orders</h5>
            <div className="text-muted small">
              Showing {filteredOrders.length} of {totalOrders} orders
              {searchTerm || selectedStatus !== "all" ? " (filtered)" : ""}
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 py-3 fw-semibold">#</th>
                    <th className="py-3 fw-semibold">Order ID</th>
                    <th className="py-3 fw-semibold">Payment Method</th>
                    <th className="py-3 fw-semibold">Customer</th>
                    <th className="py-3 fw-semibold">Email</th>
                    <th className="py-3 fw-semibold">Status</th>
                    <th className="py-3 fw-semibold">Created Date</th>
                    <th className="pe-4 py-3 fw-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isPending ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2 text-muted">Loading orders...</p>
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <div className="text-muted">
                          <i className="fas fa-inbox fa-3x mb-3"></i>
                          <p>No orders found</p>
                          {(searchTerm || selectedStatus !== "all") && (
                            <button 
                              className="btn btn-outline-primary mt-2"
                              onClick={handleClearFilters}
                            >
                              Clear Filters
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((item, i) => (
                      <tr key={item.orderId} className="align-middle">
                        <td className="ps-4" data-label = "SN">{(currentPage - 1) * ordersPerPage + i + 1}</td>
                        <td data-label = "Order ID">
                          <code className="text-primary">{item.orderId}</code>
                        </td>
                        <td data-label = "Payment method">
                          <span className="fw-semibold text-primary" style={{textTransform:"capitalize"}}>
                            {item.paymentMethod}
                          </span>
                        </td>
                        <td data-label = "Customer">
                          <div>
                            <div className="fw-semibold">{item.customerName}</div>
                          </div>
                        </td>
                        <td data-label = "Email">
                          <span className="text-muted">{item.customerEmail}</span>
                        </td>
                        <td data-label = "Status">
                          {getStatusBadge(item.orderStatus)}
                        </td>
                        <td data-label = "Created date">
                          <span className="text-muted">
                            {moment(item.createdDate).format("MMM DD, YYYY")}
                          </span>
                          <br />
                          <small className="text-muted">
                            {moment(item.createdDate).format("h:mm A")}
                          </small>
                        </td>
                        <td className="pe-4 text-center">
                          <button 
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => navigate(`/admin-product-order-management/${item.orderId}`)}
                            title="View and manage order"
                          >
                            <i className="fas fa-eye me-1"></i>
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {!isPending && filteredOrders.length > 0 && totalPages > 1 && (
            <div className="card-footer bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted">
                  Showing {((currentPage - 1) * ordersPerPage) + 1} to {Math.min(currentPage * ordersPerPage, totalOrders)} of {totalOrders} entries
                  {searchTerm || selectedStatus !== "all" ? " (filtered)" : ""}
                </div>
                <nav>
                  <ul className="pagination mb-0">
                    {/* Previous Button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        <i className="fas fa-chevron-left me-1"></i>
                        Previous
                      </button>
                    </li>

                    {/* Page Numbers */}
                    {getPageNumbers().map(pageNumber => (
                      <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => handlePageClick(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    ))}

                    {/* Next Button */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <i className="fas fa-chevron-right ms-1"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>

      <section style={{marginTop: "5%" }}>
  <Footer/>
      </section>


    
    </>
  );
};

export default ProductOrderTable;