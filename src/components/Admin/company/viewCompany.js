import React, { useRef, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import moment from "moment";
import AdminDashboard from "../adminDashboard";
import { chukkytechAxios } from "../../Utility/axios";
import "./viewCompany.css";
import Footer from "../../layouts/Footer";

const ViewCompanies = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    const [showDropDown, setShowDropDown] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [successText, setSuccessText] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [pendingLocation, setPendingLocation] = useState(true);
    const [allCompanies, setAllCompanies] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [companyData, setCompanyData] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 10;

    const userInfo = localStorage.getItem("adminsInfo");
    const userData = JSON.parse(userInfo);
    const createdUserId = useRef(userData?.userId);

    const fetchCompanies = async () => {
        setPendingLocation(true);
        try {
            const response = await chukkytechAxios.get("company/getAllCompanies");
            setAllCompanies(response.data);
            setPendingLocation(false);
        } catch (error) {
            setPendingLocation(false);
            console.error('Error fetching companies:', error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Filter companies based on search term and status
    const filteredCompanies = allCompanies.filter(company => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            company.companyName?.toLowerCase().includes(searchLower) ||
            company.companyCode?.toLowerCase().includes(searchLower) ||
            company.location?.toLowerCase().includes(searchLower) ||
            `${company.firstName} ${company.lastName}`.toLowerCase().includes(searchLower);

        const matchesStatus = selectedStatus === "all" ? true : company.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
    const currentCompanies = filteredCompanies.slice(
        (currentPage - 1) * companiesPerPage,
        currentPage * companiesPerPage
    );

    const handleSubmitData = async (data) => {
        setLoading(true);
        setErrorMessage(false);

        const payLoad = {
            ...data,
            status: "Active",
            createdBy: createdUserId.current
        };

        try {
            const response = await chukkytechAxios.post('company/registerCompany', payLoad);
            setLoading(false);
            setSuccessMessage(true);
            setSuccessText(response.data.message);
            setShowModal(false);
            reset();
            fetchCompanies();
        } catch (err) {
            setLoading(false);
            setErrorMessage(true);
            setErrMessage(err.response?.data?.error || "Failed to create company");
        }
    };

    const handleSubmitDelete = async () => {
        if (!companyData?.companyId) {
            setErrorMessage(true);
            setErrMessage("No company selected for deletion");
            return;
        }

        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);

        try {
            const response = await chukkytechAxios.delete(
                `company/deleteCompany/${companyData.companyId}`
            );
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Company deleted successfully");
            setShowDelete(false);
            await fetchCompanies();
        } catch (err) {
            console.error('Deletion failed:', err);
            const errorMsg = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to delete company";
            setErrorMessage(true);
            setErrMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { class: "badge bg-success", label: "Active" },
            inactive: { class: "badge bg-secondary", label: "Inactive" },
            suspended: { class: "badge bg-warning text-dark", label: "Suspended" },
            pending: { class: "badge bg-info", label: "Pending" }
        };

        const config = statusConfig[status?.toLowerCase()] || { class: "badge bg-secondary", label: status };
        return <span className={config.class}>{config.label}</span>;
    };

    const handleRefresh = () => {
        fetchCompanies();
    };

    const handleShowDropDown = (data) => {
        setCompanyData(data);
    };

    const isMobile = window.innerWidth < 768;


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
                                <li className="breadcrumb-item"><a  className="text-decoration-none">Companies</a></li>
                                <li className="breadcrumb-item active text-dark">Company Management</li>
                            </ol>
                        </nav>
                        <h1 className="h3 mb-0 mt-2 text-dark">Company Management</h1>
                        <p className="text-muted mb-0">Manage all registered companies in the system</p>
                    </div>
                    <div className="col-auto">
                        <div className="d-flex gap-2">
                            <button 
                                className="btn btn-outline-primary d-flex align-items-center"
                                onClick={handleRefresh}
                                disabled={pendingLocation}
                            >
                                <span className={`spinner-border spinner-border-sm me-2 ${pendingLocation ? '' : 'd-none'}`}></span>
                                Refresh
                            </button>
                            <button className="btn btn-primary d-flex align-items-center" onClick={() => setShowModal(true)}>
                                <i className="fas fa-plus me-2"></i>
                                Create Company
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
                                        <h6 className="card-title text-muted mb-2">Total Companies</h6>
                                        <h3 className="mb-0">{allCompanies.length}</h3>
                                    </div>
                                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                                        <i className="fas fa-building text-primary"></i>
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
                                        <h6 className="card-title text-muted mb-2">Active Companies</h6>
                                        <h3 className="mb-0">
                                            {allCompanies.filter(company => company.status === 'active').length}
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
                                        <h6 className="card-title text-muted mb-2">Inactive</h6>
                                        <h3 className="mb-0">
                                            {allCompanies.filter(company => company.status === 'inactive').length}
                                        </h3>
                                    </div>
                                    <div className="bg-secondary bg-opacity-10 p-3 rounded">
                                        <i className="fas fa-pause-circle text-secondary"></i>
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
                                            {allCompanies.filter(company => 
                                                moment(company.createdDateTime).isSame(moment(), 'month')
                                            ).length}
                                        </h3>
                                    </div>
                                    <div className="bg-info bg-opacity-10 p-3 rounded">
                                        <i className="fas fa-chart-line text-info"></i>
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
                            <div className="col-lg-6">
                                <label className="form-label fw-semibold">Search Companies</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="fas fa-search text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        placeholder="Search by company name, code, location, or owner..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <label className="form-label fw-semibold">Company Status</label>
                                <select 
                                    className="form-select"
                                    value={selectedStatus}
                                    onChange={(e) => {
                                        setSelectedStatus(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Companies Table */}
                <div className=" border-0 shadow-sm mt-4">
                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">All Companies</h5>
                        <div className="text-muted small">
                            Showing {currentCompanies.length} of {filteredCompanies.length} companies
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4 py-3 fw-semibold">#</th>
                                        <th className="py-3 fw-semibold">Company Code</th>
                                        <th className="py-3 fw-semibold">Company Name</th>
                                        <th className="py-3 fw-semibold">Location</th>
                                        <th className="py-3 fw-semibold">Owner</th>
                                        <th className="py-3 fw-semibold">Contact</th>
                                        <th className="py-3 fw-semibold">Status</th>
                                        <th className="py-3 fw-semibold">Created Date</th>
                                        <th className="pe-4 py-3 fw-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingLocation ? (
                                        <tr>
                                            <td colSpan="9" className="text-center py-5">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <p className="mt-2 text-muted">Loading companies...</p>
                                            </td>
                                        </tr>
                                    ) : currentCompanies.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="text-center py-5">
                                                <div className="text-muted">
                                                    <i className="fas fa-building fa-3x mb-3"></i>
                                                    <p>{searchTerm || selectedStatus !== "all" ? "No companies match your filters" : "No companies found"}</p>
                                                    {(searchTerm || selectedStatus !== "all") && (
                                                        <button 
                                                            className="btn btn-outline-primary mt-2"
                                                            onClick={() => {
                                                                setSearchTerm("");
                                                                setSelectedStatus("all");
                                                            }}
                                                        >
                                                            Clear Filters
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        currentCompanies.map((company, index) => (
                                            <tr key={company.companyId} className="align-middle">
                                                <td className="ps-4" data-label = "SN">{(currentPage - 1) * companiesPerPage + index + 1}</td>
                                                <td data-label = "Company code">
                                                    <span className="fw-semibold text-primary">{company.companyCode}</span>
                                                </td>
                                                <td data-label = "Company name">
                                                    <div className="fw-semibold">{company.companyName}</div>
                                                    <small className="text-muted">{company.companyAddress}</small>
                                                </td>
                                                <td data-label = "Location">
                                                    <span className="text-muted">{company.location}</span>
                                                </td>
                                                <td data-label = "Owner">
                                                    <div>
                                                        <div className="fw-semibold">{company.firstName} {company.lastName}</div>
                                                        <small className="text-muted">Owner</small>
                                                    </div>
                                                </td>
                                                <td data-label = "Contact">
                                                    <div>
                                                        <div>{company.phoneNumber}</div>
                                                        <small className="text-muted">{company.emailAddress}</small>
                                                    </div>
                                                </td>
                                                <td data-label = "Status">
                                                    {getStatusBadge(company.status)}
                                                </td>
                                                <td data-label = "Created date">
                                                    <span className="text-muted">
                                                        {moment(company.createdDateTime).format("MMM DD, YYYY")}
                                                    </span>
                                                    <br />
                                                    <small className="text-muted">
                                                        {moment(company.createdDateTime).format("h:mm A")}
                                                    </small>
                                                </td>
                                            <td className="pe-4 text-center">
    {isMobile ? (
        <div className="d-flex gap-2 justify-content-center">
            <Button
                size="sm"
                variant="outline-primary"
                onClick={() => {
                    handleShowDropDown(company);
                    setShowEditModal(true);
                }}
            >
                <i className="fas fa-edit"></i>
            </Button>

            <Button
                size="sm"
                variant="outline-danger"
                onClick={() => {
                    handleShowDropDown(company);
                    setShowDelete(true);
                }}
            >
                <i className="fas fa-trash"></i>
            </Button>
        </div>
    ) : (
        <DropdownButton
            as={ButtonGroup}
            size="sm"
            title="Actions"
            variant="outline-primary"
            onClick={() => handleShowDropDown(company)}
        >
            <Dropdown.Item
                onClick={() => setShowEditModal(true)}
                className="d-flex align-items-center"
            >
                <i className="fas fa-edit me-2"></i>
                Edit Company
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item
                className="d-flex align-items-center text-danger"
                onClick={() => setShowDelete(true)}
            >
                <i className="fas fa-trash me-2"></i>
                Delete Company
            </Dropdown.Item>
        </DropdownButton>
    )}
</td>


                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {!pendingLocation && currentCompanies.length > 0 && (
                        <div className="card-footer bg-white py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-muted">
                                    Showing {((currentPage - 1) * companiesPerPage) + 1} to {Math.min(currentPage * companiesPerPage, filteredCompanies.length)} of {filteredCompanies.length} entries
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
                        <strong>Success!</strong> {successText}
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

            {/* Create Company Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleSubmitData)}>
                        <div className="text-muted mb-3">
                            <i className="fas fa-info-circle me-2"></i>
                            <span style={{color:"red"}}>*</span> Indicates required fields
                        </div>

                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Company Name <span className="text-danger">*</span></label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter company name"
                                    {...register("companyName", { required: 'Company name is required' })}
                                />
                                {errors.companyName && <div className="text-danger small mt-1">{errors.companyName.message}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Owner First Name <span className="text-danger">*</span></label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter owner first name"
                                    {...register("firstName", { required: 'First name is required' })}
                                />
                                {errors.firstName && <div className="text-danger small mt-1">{errors.firstName.message}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Owner Last Name <span className="text-danger">*</span></label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter owner last name"
                                    {...register("lastName", { required: 'Last name is required' })}
                                />
                                {errors.lastName && <div className="text-danger small mt-1">{errors.lastName.message}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Company Location <span className="text-danger">*</span></label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter company location"
                                    {...register("location", { required: 'Company location is required' })}
                                />
                                {errors.location && <div className="text-danger small mt-1">{errors.location.message}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">RC Number</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter RC number (optional)"
                                    {...register("rcNumber")}
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Company Address <span className="text-danger">*</span></label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter company address"
                                    {...register("companyAddress", { required: 'Company address is required' })}
                                />
                                {errors.companyAddress && <div className="text-danger small mt-1">{errors.companyAddress.message}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Phone Number <span className="text-danger">*</span></label>
                                <input 
                                    type="tel"
                                    className="form-control"
                                    placeholder="Enter phone number"
                                    {...register("phoneNumber", { required: 'Phone number is required' })}
                                />
                                {errors.phoneNumber && <div className="text-danger small mt-1">{errors.phoneNumber.message}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Email Address <span className="text-danger">*</span></label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email address"
                                    {...register("emailAddress", { required: 'Email address is required' })}
                                />
                                {errors.emailAddress && <div className="text-danger small mt-1">{errors.emailAddress.message}</div>}
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                {loading ? (
                                    <button className="btn btn-primary w-100" disabled>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Creating Company...
                                    </button>
                                ) : (
                                    <button className="btn btn-primary w-100" type="submit">
                                        Create Company
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Delete Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                             style={{ width: '60px', height: '60px' }}>
                            <i className="fas fa-trash text-danger fa-lg"></i>
                        </div>
                        <h5>Delete Company</h5>
                        <p className="text-muted">
                            Are you sure you want to delete <strong>{companyData.companyName}</strong>?
                            This action cannot be undone and all company data will be permanently removed.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowDelete(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={handleSubmitDelete}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Deleting...
                            </>
                        ) : (
                            "Yes, Delete Company"
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

export default ViewCompanies;