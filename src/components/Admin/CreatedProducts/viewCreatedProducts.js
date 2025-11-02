import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import moment from "moment";
import AdminDashboard from "../adminDashboard";
import { chukkytechAxios } from "../../Utility/axios";
import { Link } from "react-router-dom";
import Footer from "../../layouts/Footer";

const ViewCreatedProducts = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm();
    
    const [showDropDown, setShowDropDown] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [successText, setSuccessText] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [pendingLocation, setPendingLocation] = useState(true);
    const [allLocations, setAllLocations] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [locationData, setLocationData] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    const fetchLocation = async () => {
        setPendingLocation(true);
        try {
            const response = await chukkytechAxios.get("/product/getAllProducts");
            setAllLocations(response.data);
            setPendingLocation(false);
        } catch (error) {
            setPendingLocation(false);
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    // Filter products based on search term and status
    const filteredProducts = allLocations.filter(product => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            product.productName?.toLowerCase().includes(searchLower) ||
            product.companyName?.toLowerCase().includes(searchLower);

        const matchesStatus = selectedStatus === "all" ? true : product.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handleSubmitDelete = async () => {
        if (!locationData?.productId) {
            setErrorMessage(true);
            setErrMessage("No product selected for deletion");
            return;
        }

        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);

        try {
            const response = await chukkytechAxios.delete(
                `/product/deleteProduct/${locationData.productId}`
            );

            setSuccessMessage(true);
            setSuccessText(response.data.message || "Product deleted successfully");
            setShowDelete(false);
            await fetchLocation();
            
        } catch (err) {
            console.error('Deletion failed:', err);
            const errorMsg = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to delete product";
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
            draft: { class: "badge bg-info", label: "Draft" }
        };

        const config = statusConfig[status?.toLowerCase()] || { class: "badge bg-secondary", label: status };
        return <span className={config.class}>{config.label}</span>;
    };

    const handleRefresh = () => {
        fetchLocation();
    };

    const handleShowDropDown = (data) => {
        setLocationData(data);
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
                                <li className="breadcrumb-item"><a className="text-decoration-none">Products</a></li>
                                <li className="breadcrumb-item active text-dark">Product Management</li>
                            </ol>
                        </nav>
                        <h1 className="h3 mb-0 mt-2 text-dark">Product Management</h1>
                        <p className="text-muted mb-0">View and manage all products in the system</p>
                    </div>
                    <div className="col-auto">
                        <button 
                            className="btn btn-outline-primary d-flex align-items-center"
                            onClick={handleRefresh}
                            disabled={pendingLocation}
                        >
                            <span className={`spinner-border spinner-border-sm me-2 ${pendingLocation ? '' : 'd-none'}`}></span>
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
                                        <h6 className="card-title text-muted mb-2">Total Products</h6>
                                        <h3 className="mb-0">{allLocations.length}</h3>
                                    </div>
                                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                                        <i className="fas fa-cube text-primary"></i>
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
                                        <h6 className="card-title text-muted mb-2">Active Products</h6>
                                        <h3 className="mb-0">
                                            {allLocations.filter(product => product.status === 'active').length}
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
                                        <h6 className="card-title text-muted mb-2">Low Stock</h6>
                                        <h3 className="mb-0">
                                            {allLocations.filter(product => 
                                                parseInt(product.productQuantity) <= 5
                                            ).length}
                                        </h3>
                                    </div>
                                    <div className="bg-warning bg-opacity-10 p-3 rounded">
                                        <i className="fas fa-exclamation-triangle text-warning"></i>
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
                                        <h6 className="card-title text-muted mb-2">Out of Stock</h6>
                                        <h3 className="mb-0">
                                            {allLocations.filter(product => 
                                                parseInt(product.productQuantity) === 0
                                            ).length}
                                        </h3>
                                    </div>
                                    <div className="bg-danger bg-opacity-10 p-3 rounded">
                                        <i className="fas fa-times-circle text-danger"></i>
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
                                <label className="form-label fw-semibold">Search Products</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="fas fa-search text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        placeholder="Search by product name or company..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <label className="form-label fw-semibold">Product Status</label>
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
                                    <option value="draft">Draft</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className=" border-0 shadow-sm mt-4">
                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">All Products</h5>
                        <div className="text-muted small">
                            Showing {currentProducts.length} of {filteredProducts.length} products
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4 py-3 fw-semibold">#</th>
                                        <th className="py-3 fw-semibold">Product Name</th>
                                        <th className="py-3 fw-semibold">Company</th>
                                        <th className="py-3 fw-semibold">Price</th>
                                        <th className="py-3 fw-semibold">Quantity</th>
                                        <th className="py-3 fw-semibold">Status</th>
                                        <th className="py-3 fw-semibold">Created Date</th>
                                        <th className="pe-4 py-3 fw-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingLocation ? (
                                        <tr>
                                            <td colSpan="8" className="text-center py-5">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <p className="mt-2 text-muted">Loading products...</p>
                                            </td>
                                        </tr>
                                    ) : currentProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="text-center py-5">
                                                <div className="text-muted">
                                                    <i className="fas fa-cube fa-3x mb-3"></i>
                                                    <p>{searchTerm || selectedStatus !== "all" ? "No products match your filters" : "No products found"}</p>
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
                                        currentProducts.map((product, index) => (
                                            <tr key={product.productId} className="align-middle">
                                                <td className="ps-4" data-label = "SN">{(currentPage - 1) * productsPerPage + index + 1}</td>
                                                <td data-label = "Product Name:">
                                                    <div className="fw-semibold">{product.productName}</div>
                                                    <small className="text-muted">{product.categoryName}</small>
                                                </td>
                                                <td data-label = "Company">
                                                    <span className="text-muted">{product.companyName}</span>
                                                </td>
                                                <td data-label = "Price">
                                                    <span className="fw-semibold text-success">
                                                        ₦{parseFloat(product.productPrice).toLocaleString()}
                                                    </span>
                                                </td>
                                                <td data-label = "Quantity">
                                                    <span className={`fw-semibold ${
                                                        parseInt(product.productQuantity) === 0 ? 'text-danger' :
                                                        parseInt(product.productQuantity) <= 5 ? 'text-warning' : 'text-success'
                                                    }`}>
                                                        {product.productQuantity}
                                                    </span>
                                                    {parseInt(product.productQuantity) <= 5 && parseInt(product.productQuantity) > 0 && (
                                                        <small className="text-warning d-block">Low Stock</small>
                                                    )}
                                                    {parseInt(product.productQuantity) === 0 && (
                                                        <small className="text-danger d-block">Out of Stock</small>
                                                    )}
                                                </td>
                                                <td data-label = "Status">
                                                    {getStatusBadge(product.status)}
                                                </td>
                                                <td data-label = "Created date">
                                                    <span className="text-muted">
                                                        {moment(product.createdDateTime).format("MMM DD, YYYY")}
                                                    </span>
                                                    <br />
                                                    <small className="text-muted">
                                                        {moment(product.createdDateTime).format("h:mm A")}
                                                    </small>
                                                </td>
                                                <td className="pe-4 text-center">
                                                    <DropdownButton
                                                        as={ButtonGroup}
                                                        size="sm"
                                                        title="Actions"
                                                        variant="outline-primary"
                                                        onClick={() => handleShowDropDown(product)}
                                                    >
                                                        <Dropdown.Item 
                                                            as={Link} 
                                                            to={`/product/${product.productId}`}
                                                            className="d-flex align-items-center"
                                                        >
                                                            <i className="fas fa-eye me-2"></i>
                                                            View Details
                                                        </Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item 
                                                            style={{ color: "red" }} 
                                                            onClick={() => {
                                                                setLocationData(product);
                                                                setShowDelete(true);
                                                            }}
                                                            className="d-flex align-items-center"
                                                        >
                                                            <i className="fas fa-trash me-2"></i>
                                                            Delete Product
                                                        </Dropdown.Item>
                                                    </DropdownButton>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {!pendingLocation && currentProducts.length > 0 && (
                        <div className="card-footer bg-white py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-muted">
                                    Showing {((currentPage - 1) * productsPerPage) + 1} to {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} entries
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

            {/* Delete Confirmation Modal */}
            <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                             style={{ width: '60px', height: '60px' }}>
                            <i className="fas fa-trash text-danger fa-lg"></i>
                        </div>
                        <h5>Delete Product</h5>
                        <p className="text-muted">
                            Are you sure you want to delete <strong>{locationData.productName}</strong>?
                            This action cannot be undone and all product data will be permanently removed.
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
                            "Yes, Delete Product"
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

export default ViewCreatedProducts;