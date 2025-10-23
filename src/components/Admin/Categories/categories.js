import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import moment from "moment";
import AdminDashboard from "../adminDashboard";
import { chukkytechAxios } from "../../Utility/axios";
import Footer from "../../layouts/Footer";

const ViewCategories = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [successText, setSuccessText] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [pendingLocation, setPendingLocation] = useState(true);
    const [allCategories, setAllCategories] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [categoryData, setCategoryData] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 10;

    const userInfo = localStorage.getItem("adminsInfo");
    const user = JSON.parse(userInfo);

    const fetchCategories = async () => {
        setPendingLocation(true);
        try {
            const response = await chukkytechAxios.get("category/getAllCategories");
            setAllCategories(response.data);
            setPendingLocation(false);
        } catch (error) {
            setPendingLocation(false);
            console.error('Error fetching categories:', error);
        }
    };




   

    useEffect(() => {
        fetchCategories();
    }, []);

    // Filter categories based on search term and status
    const filteredCategories = allCategories.filter(category => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = category.categoryName?.toLowerCase().includes(searchLower);

        const matchesStatus = selectedStatus === "all" ? true : category.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
    const currentCategories = filteredCategories.slice(
        (currentPage - 1) * categoriesPerPage,
        currentPage * categoriesPerPage
    );

    const handleSubmitData = async (data) => {
        setLoading(true);
        setErrorMessage(false);

        const userData = {
            ...data,
            createdBy: user?.userId
        };

        try {
            const response = await chukkytechAxios.post('category/createCategories', userData);
            setLoading(false);
            setSuccessMessage(true);
            setSuccessText(response.data.message);
            setShowModal(false);
            reset();
            fetchCategories();
        } catch (err) {
            setLoading(false);
            setErrorMessage(true);
            setErrMessage(err.response?.data || "Failed to create category");
        }
    };

    const handleSubmitDelete = async () => {
        if (!categoryData?.categoryId) {
            setErrorMessage(true);
            setErrMessage("No category selected for deletion");
            return;
        }

        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);

        try {
            const response = await chukkytechAxios.delete(
                `category/deleteCategories/${categoryData.categoryId}`
            );
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Category deleted successfully");
            setShowDelete(false);
            await fetchCategories();
        } catch (err) {
            console.error('Deletion failed:', err);
            const errorMsg = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to delete category";
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
            disable: { class: "badge bg-danger", label: "Disabled" },
            pending: { class: "badge bg-warning text-dark", label: "Pending" }
        };

        const config = statusConfig[status?.toLowerCase()] || { class: "badge bg-secondary", label: status };
        return <span className={config.class}>{config.label}</span>;
    };

    const handleRefresh = () => {
        fetchCategories();
    };

    const handleShowDropDown = (data) => {
        setCategoryData(data);
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
                                <li className="breadcrumb-item"><a  className="text-decoration-none">Categories</a></li>
                                <li className="breadcrumb-item active text-dark">Category Management</li>
                            </ol>
                        </nav>
                        <h1 className="h3 mb-0 mt-2 text-dark">Category Management</h1>
                        <p className="text-muted mb-0">Organize and manage product categories</p>
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
                                Create Category
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
                                        <h6 className="card-title text-muted mb-2">Total Categories</h6>
                                        <h3 className="mb-0">{allCategories.length}</h3>
                                    </div>
                                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                                        <i className="fas fa-tags text-primary"></i>
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
                                        <h6 className="card-title text-muted mb-2">Active Categories</h6>
                                        <h3 className="mb-0">
                                            {allCategories.filter(category => category.status === 'active').length}
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
                                            {allCategories.filter(category => category.status === 'inactive').length}
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
                                        <h6 className="card-title text-muted mb-2">Disabled</h6>
                                        <h3 className="mb-0">
                                            {allCategories.filter(category => category.status === 'disable').length}
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
                                <label className="form-label fw-semibold">Search Categories</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="fas fa-search text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        placeholder="Search by category name..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <label className="form-label fw-semibold">Category Status</label>
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
                                    <option value="disable">Disabled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Table */}
                <div className=" border-0 shadow-sm mt-4">
                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">All Categories</h5>
                        <div className="text-muted small">
                            Showing {currentCategories.length} of {filteredCategories.length} categories
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4 py-3 fw-semibold">#</th>
                                        <th className="py-3 fw-semibold">Category Name</th>
                                        <th className="py-3 fw-semibold">Status</th>
                                        <th className="py-3 fw-semibold">Created Date</th>
                                        <th className="pe-4 py-3 fw-semibold text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingLocation ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <p className="mt-2 text-muted">Loading categories...</p>
                                            </td>
                                        </tr>
                                    ) : currentCategories.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5">
                                                <div className="text-muted">
                                                    <i className="fas fa-tags fa-3x mb-3"></i>
                                                    <p>{searchTerm || selectedStatus !== "all" ? "No categories match your filters" : "No categories found"}</p>
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
                                        currentCategories.map((category, index) => (
                                            <tr key={category.categoryId} className="align-middle">
                                                <td className="ps-4">{(currentPage - 1) * categoriesPerPage + index + 1}</td>
                                                <td>
                                                    <div className="fw-semibold">{category.categoryName}</div>
                                                    <small className="text-muted">ID: {category.categoryId}</small>
                                                </td>
                                                <td>
                                                    {getStatusBadge(category.status)}
                                                </td>
                                                <td>
                                                    <span className="text-muted">
                                                        {moment(category.createdDateTime).format("MMM DD, YYYY")}
                                                    </span>
                                                    <br />
                                                    <small className="text-muted">
                                                        {moment(category.createdDateTime).format("h:mm A")}
                                                    </small>
                                                </td>
                                                <td className="pe-4 text-center">
                                                    <DropdownButton
                                                        as={ButtonGroup}
                                                        size="sm"
                                                        title="Actions"
                                                        variant="outline-primary"
                                                        onClick={() => handleShowDropDown(category)}
                                                    >
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item 
                                                            style={{ color: "red" }} 
                                                            onClick={() => setShowDelete(true)}
                                                            className="d-flex align-items-center"
                                                        >
                                                            <i className="fas fa-trash me-2"></i>
                                                            Delete Category
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
                    {!pendingLocation && currentCategories.length > 0 && (
                        <div className="card-footer bg-white py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-muted">
                                    Showing {((currentPage - 1) * categoriesPerPage) + 1} to {Math.min(currentPage * categoriesPerPage, filteredCategories.length)} of {filteredCategories.length} entries
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

            {/* Create Category Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleSubmitData)}>
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Category Name <span className="text-danger">*</span></label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter category name"
                                    {...register("categoryName", { required: 'Category name is required' })}
                                />
                                {errors.categoryName && <div className="text-danger small mt-1">{errors.categoryName.message}</div>}
                            </div>

                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Status <span className="text-danger">*</span></label>
                                <select 
                                    className="form-select"
                                    {...register("status", { required: 'Status is required' })}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="disable">Disabled</option>
                                </select>
                                {errors.status && <div className="text-danger small mt-1">{errors.status.message}</div>}
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                {loading ? (
                                    <button className="btn btn-primary w-100" disabled>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Creating Category...
                                    </button>
                                ) : (
                                    <button className="btn btn-primary w-100" type="submit">
                                        Create Category
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
                    <Modal.Title className="text-danger">Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                             style={{ width: '60px', height: '60px' }}>
                            <i className="fas fa-trash text-danger fa-lg"></i>
                        </div>
                        <h5>Delete Category</h5>
                        <p className="text-muted">
                            Are you sure you want to delete <strong>{categoryData.categoryName}</strong>?
                            This action cannot be undone and all category data will be permanently removed.
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
                            "Yes, Delete Category"
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

export default ViewCategories;