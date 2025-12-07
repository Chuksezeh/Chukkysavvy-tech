import { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard";
import "./userTable.css";
import { chukkytechAxios } from "../../Utility/axios";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import Footer from "../../layouts/Footer";
import { all } from "axios";

const AdminUserPage = () => {
  const [pendingUser, setPendingUser] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [userItem, setUserItem] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [deleteUser, setDeleteUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const adminsInfo = localStorage.getItem('adminsInfo');
    if (!adminsInfo) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const fetchUsers = async () => {
    setPendingUser(true);
    try {
      const response = await chukkytechAxios.get("auth/getAllAdminUsers");
      setAllUsers(response.data);
      setPendingUser(false);
    } catch (error) {
      setPendingUser(false);
      console.error('Error fetching admin users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



  // console.log("admin user data>>>", allUsers)

  // Filter users based on search term
  const filteredUsers = allUsers.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName?.toLowerCase().includes(searchLower) ||
      user.lastName?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower)
    );
  });

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages based on filtered users
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleChangeAction = (e, user) => {
    setStatusValue(e.target.value);
    setUserItem(user);
    
    if (e.target.value === "suspended" || e.target.value === "Active") {
      setShowModal(true);
    } else if (e.target.value === "delete") {
      setDeleteUser(true);
    }
  };

  const handleUpdateStatus = async () => {
    setLoadingStatus(true);
    const sendData = {
      status: statusValue
    };

    try {
      await chukkytechAxios.put(`auth/updateAdminStatus/${userItem.userId}`, sendData);
      setLoadingStatus(false);
      setSuccessMessage(true);
      fetchUsers();
      setShowModal(false);
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (err) {
      setLoadingStatus(false);
      setErrorMessage(true);
      setErrMessage(err.response?.data || "An error occurred");
      setTimeout(() => setErrorMessage(false), 3000);
    }
  };

  const handleDeleteUser = async () => {
    setLoadingStatus(true);
    try {
      await chukkytechAxios.delete(`auth/deleteAdminUser/${userItem.userId}`);
      setLoadingStatus(false);
      setSuccessMessage(true);
      fetchUsers();
      setDeleteUser(false);
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (err) {
      setLoadingStatus(false);
      setErrorMessage(true);
      setErrMessage(err.response?.data || "An error occurred");
      setTimeout(() => setErrorMessage(false), 3000);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: "badge bg-success", label: "Active" },
      suspended: { class: "badge bg-warning text-dark", label: "Suspended" },
      pending: { class: "badge bg-secondary", label: "Pending" }
    };

    const config = statusConfig[status?.toLowerCase()] || { class: "badge bg-secondary", label: status };
    return <span className={config.class}>{config.label}</span>;
  };

  const handleRefresh = () => {
    fetchUsers();
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
                <li className="breadcrumb-item"><a href="/admin-dashboard-card" className="text-decoration-none">Dashboard</a></li>
                <li className="breadcrumb-item"><a className="text-decoration-none">Users</a></li>
                <li className="breadcrumb-item active text-dark">Admin Users</li>
              </ol>
            </nav>
            <h1 className="h3 mb-0 mt-2 text-dark">Admin Users Management</h1>
            <p className="text-muted mb-0">Manage system administrators and their permissions</p>
          </div>
          <div className="col-auto">
            <button 
              className="btn btn-outline-primary d-flex align-items-center"
              onClick={handleRefresh}
              disabled={pendingUser}
            >
              <span className={`spinner-border spinner-border-sm me-2 ${pendingUser ? '' : 'd-none'}`}></span>
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
                    <h6 className="card-title text-muted mb-2">Total Admins</h6>
                    <h3 className="mb-0">{allUsers.length}</h3>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <i className="fas fa-users-cog text-primary"></i>
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
                    <h6 className="card-title text-muted mb-2">Active Admins</h6>
                    <h3 className="mb-0">
                     {allUsers.filter(user => user.status?.toLowerCase() === 'active').length}

                    </h3>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <i className="fas fa-user-check text-success"></i>
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
                    <h6 className="card-title text-muted mb-2">Suspended</h6>
                    <h3 className="mb-0">
                      {allUsers.filter(user => user.status === 'suspended').length}
                    </h3>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-3 rounded">
                    <i className="fas fa-user-slash text-warning"></i>
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
                    <h6 className="card-title text-muted mb-2">New This Month</h6>
                    <h3 className="mb-0">
                      {allUsers.filter(user => 
                        moment(user.createdDateTime).isSame(moment(), 'month')
                      ).length}
                    </h3>
                  </div>
                  <div className="bg-info bg-opacity-10 p-3 rounded">
                    <i className="fas fa-user-plus text-info"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className=" border-0 shadow-sm">
          <div className="card-header bg-white py-3">
            <h5 className="card-title mb-0">Search Admin Users</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-12">
                <label className="form-label fw-semibold">Search Users</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className=" border-0 shadow-sm mt-4">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="card-title mb-0">Admin Users</h5>
            <div className="text-muted small">
              Showing {currentUsers.length} of {filteredUsers.length} users
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4 py-3 fw-semibold">#</th>
                    <th className="py-3 fw-semibold">Admin User</th>
                    <th className="py-3 fw-semibold">Email</th>
                    <th className="py-3 fw-semibold">Access Role</th>
                    <th className="py-3 fw-semibold">Status</th>
                    <th className="py-3 fw-semibold">Registered</th>
                    <th className="pe-4 py-3 fw-semibold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUser ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2 text-muted">Loading admin users...</p>
                      </td>
                    </tr>
                  ) : currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-5">
                        <div className="text-muted">
                          <i className="fas fa-users-cog fa-3x mb-3"></i>
                          <p>{searchTerm ? "No admin users match your search" : "No admin users found"}</p>
                          {searchTerm && (
                            <button 
                              className="btn btn-outline-primary mt-2"
                              onClick={() => setSearchTerm("")}
                            >
                              Clear Search
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentUsers.map((user, index) => (
                      <tr key={user.userId} className="align-middle">
                        <td className="ps-4" data-label="SN">{(currentPage - 1) * usersPerPage + index + 1}</td>
                        <td data-label="Admin User">
                          <div className="d-flex align-items-center p-2">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" 
                                 style={{ width: '40px', height: '40px' }}>
                              <i className="fas fa-user-shield text-primary"></i>
                            </div>
                            <div>
                              <div className="fw-semibold">{user.firstName} {user.lastName}</div>
                              <small className="text-muted">ID: {user.userId}</small>
                            </div>
                          </div>
                        </td>
                        <td data-label="Email">
                          <span className="text-muted">{user.email}</span>
                        </td>
                         <td data-label="Access Role">
                          <span className="text-muted">{user.role}</span>
                        </td>
                        <td data-label ="Status">
                          {getStatusBadge(user.status)}
                        </td>
                        <td data-label ="Registered">
                          <span className="text-muted">
                            { user.createdDateTime}
                           
                            {/* {moment(user.createdDateTime).format("MMM DD, YYYY")} */}
                          </span>
                          {/* <br /> */}
                          {/* <small className="text-muted">
                            {moment(user.createdDateTime).format("h:mm A")}
                          </small> */}
                        </td>
                        <td className="pe-4 text-center" >
                          <select 
                            className="form-select form-select-sm"
                            onChange={(e) => handleChangeAction(e, user)}
                            style={{ minWidth: '140px' }}
                          >
                            <option value="">Actions</option>
                            {user.status === "suspended" ? (
                              <option value="Active">Activate User</option>
                            ) : (
                              <option value="suspended">Suspend User</option>
                            )}
                            <option value="delete">Delete User</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {!pendingUser && currentUsers.length > 0 && (
            <div className="card-footer bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="text-muted">
                  Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} entries
                </div>
                <nav>
                  <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
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
            <strong>Success!</strong> {statusValue === "delete" ? "Admin user deleted successfully." : "Admin user status updated successfully."}
            <button type="button" className="btn-close" onClick={() => setSuccessMessage(false)}></button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <i className="fas fa-exclamation-circle me-2"></i>
            <strong>Error!</strong> {errMessage}
            <button type="button" className="btn-close" onClick={() => setErrorMessage(false)}></button>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Admin User Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {statusValue === "suspended" && (
            <div className="text-center">
              <div className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '60px', height: '60px' }}>
                <i className="fas fa-user-slash text-warning fa-lg"></i>
              </div>
              <h5>Suspend Admin User</h5>
              <p className="text-muted">
                Are you sure you want to suspend <strong>{userItem.firstName} {userItem.lastName}</strong>?
                This admin will not be able to access the system until reactivated.
              </p>
            </div>
          )}
          {statusValue === "Active" && (
            <div className="text-center">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '60px', height: '60px' }}>
                <i className="fas fa-user-check text-success fa-lg"></i>
              </div>
              <h5>Activate Admin User</h5>
              <p className="text-muted">
                Are you sure you want to activate <strong>{userItem.firstName} {userItem.lastName}</strong>?
                This admin will regain full access to the system.
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant={statusValue === "suspended" ? "warning" : "success"} 
            onClick={handleUpdateStatus}
            disabled={loadingStatus}
          >
            {loadingStatus ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Processing...
              </>
            ) : (
              `Yes, ${statusValue === "suspended" ? "Suspend" : "Activate"} User`
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete User Modal */}
      <Modal show={deleteUser} onHide={() => setDeleteUser(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Delete Admin User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                 style={{ width: '60px', height: '60px' }}>
              <i className="fas fa-trash text-danger fa-lg"></i>
            </div>
            <h5>Delete Admin User</h5>
            <p className="text-muted">
              Are you sure you want to permanently delete <strong>{userItem.firstName} {userItem.lastName}</strong>?
              This action cannot be undone and all user data will be lost.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setDeleteUser(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteUser}
            disabled={loadingStatus}
          >
            {loadingStatus ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Deleting...
              </>
            ) : (
              "Yes, Delete User"
            )}
          </Button>
        </Modal.Footer>
      </Modal>


      <section style={{marginTop: "5%" }}>
        <Footer/>
            </section>
      
    </>
  );
};

export default AdminUserPage;