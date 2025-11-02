import { useEffect, useState } from "react";
import AdminDashboard from "./adminDashboard";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { chukkytechAxios } from "../Utility/axios";
import { useForm } from "react-hook-form";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import moment from "moment";
import Footer from "../layouts/Footer";

const AdminLocations = () => {
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
    const [allLocations, setAllLocations] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [locationData, setLocationData] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const locationsPerPage = 10;

    const fetchLocation = async () => {
        setPendingLocation(true);
        try {
            const response = await chukkytechAxios.get("location/getAllLocations");
            setAllLocations(response.data);
            setPendingLocation(false);
        } catch (error) {
            setPendingLocation(false);
            console.error('Error fetching locations:', error);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    // Filter locations based on search term and status
    const filteredLocations = allLocations.filter(location => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            location.locationName?.toLowerCase().includes(searchLower) ||
            location.locationAddress?.toLowerCase().includes(searchLower) ||
            location.shopName?.toLowerCase().includes(searchLower);

        const matchesStatus = selectedStatus === "all" ? true : location.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);
    const currentLocations = filteredLocations.slice(
        (currentPage - 1) * locationsPerPage,
        currentPage * locationsPerPage
    );

    const handleSubmitData = async (data) => {
        setLoading(true);
        setErrorMessage(false);

        const userData = {
            ...data,
            status: "Active"
        };

        try {
            const response = await chukkytechAxios.post('location/registerLocation', userData);
            setLoading(false);
            setSuccessMessage(true);
            setSuccessText(response.data.message);
            setShowModal(false);
            reset();
            fetchLocation();
        } catch (err) {
            setLoading(false);
            setErrorMessage(true);
            setErrMessage(err.response?.data || "Failed to create location");
        }
    };

    const handleSubmitEdit = async (data) => {
        setLoading(true);
        setErrorMessage(false);

        try {
            const payload = {
                locationId: locationData.locationId 
            };

            // Compare each field with original data and include only if changed
            if (data.locationName !== locationData.locationName) {
                payload.locationName = data.locationName;
            }
            if (data.locationAddress !== locationData.locationAddress) {
                payload.locationAddress = data.locationAddress;
            }
            if (data.phone !== locationData.phone) {
                payload.phone = data.phone;
            }
            if (data.shopName !== locationData.shopName) {
                payload.shopName = data.shopName;
            }
            if (data.longitude !== locationData.longitude) {
                payload.longitude = data.longitude;
            }
            if (data.latitude !== locationData.latitude) {
                payload.latitude = data.latitude;
            }

            // Only send the request if at least one field was changed
            if (Object.keys(payload).length > 1) {
                const response = await chukkytechAxios.put(`location/updateLocation/${locationData.locationId}`, payload);
                setLoading(false);
                setSuccessMessage(true);
                setSuccessText(response?.data?.message);
                setShowEditModal(false);
                fetchLocation();
            } else {
                setLoading(false);
                setShowEditModal(false);
            }
        } catch (err) {
            console.error('Update error', err);
            setLoading(false);
            setErrorMessage(true);
            setErrMessage(err.response?.data || { message: "Failed to update location" });
        }
    };

    const handleSubmitDelete = async () => {
        if (!locationData?.locationId) {
            setErrorMessage(true);
            setErrMessage("No location selected for deletion");
            return;
        }

        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);

        try {
            const response = await chukkytechAxios.delete(
                `location/deleteLocation/${locationData.locationId}`
            );
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Location deleted successfully");
            setShowDelete(false);
            await fetchLocation();
        } catch (err) {
            console.error('Deletion failed:', err);
            const errorMsg = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to delete location";
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
            suspended: { class: "badge bg-warning text-dark", label: "Suspended" }
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
                                <li className="breadcrumb-item"><a  className="text-decoration-none">Locations</a></li>
                                <li className="breadcrumb-item active text-dark">Location Management</li>
                            </ol>
                        </nav>
                        <h1 className="h3 mb-0 mt-2 text-dark">Location Management</h1>
                        <p className="text-muted mb-0">Manage all service locations and centers</p>
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
                                Create Location
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
                                        <h6 className="card-title text-muted mb-2">Total Locations</h6>
                                        <h3 className="mb-0">{allLocations.length}</h3>
                                    </div>
                                    <div className="bg-primary bg-opacity-10 p-3 rounded">
                                        <i className="fas fa-map-marker-alt text-primary"></i>
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
                                        <h6 className="card-title text-muted mb-2">Active Locations</h6>
                                        <h3 className="mb-0">
                                            {allLocations.filter(location => location.status === 'active').length}
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
                                            {allLocations.filter(location => location.status === 'inactive').length}
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
                                            {allLocations.filter(location => 
                                                moment(location.createdDateTime).isSame(moment(), 'month')
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
                                <label className="form-label fw-semibold">Search Locations</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="fas fa-search text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-start-0"
                                        placeholder="Search by location name, address, or shop name..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <label className="form-label fw-semibold">Location Status</label>
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
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Locations Table */}
                <div className=" border-0 shadow-sm mt-4">
                    <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">All Locations</h5>
                        <div className="text-muted small">
                            Showing {currentLocations.length} of {filteredLocations.length} locations
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4 py-3 fw-semibold">#</th>
                                        <th className="py-3 fw-semibold">Location Name</th>
                                        <th className="py-3 fw-semibold">Address</th>
                                        <th className="py-3 fw-semibold">Shop Name</th>
                                        <th className="py-3 fw-semibold">Contact</th>
                                        <th className="py-3 fw-semibold">Status</th>
                                        <th className="py-3 fw-semibold">Coordinates</th>
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
                                                <p className="mt-2 text-muted">Loading locations...</p>
                                            </td>
                                        </tr>
                                    ) : currentLocations.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="text-center py-5">
                                                <div className="text-muted">
                                                    <i className="fas fa-map-marker-alt fa-3x mb-3"></i>
                                                    <p>{searchTerm || selectedStatus !== "all" ? "No locations match your filters" : "No locations found"}</p>
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
                                        currentLocations.map((location, index) => (
                                            <tr key={location.locationId} className="align-middle">
                                                <td className="ps-4" data-label = "SN">{(currentPage - 1) * locationsPerPage + index + 1}</td>
                                                <td data-label = "Location name">
                                                    <div className="fw-semibold">{location.locationName}</div>
                                                </td>
                                                <td data-label = "Address">
                                                    <span className="text-muted">{location.locationAddress}</span>
                                                </td>
                                                <td data-label = "Shop name">
                                                    <span className="text-muted">{location.shopName}</span>
                                                </td>
                                                <td data-label = "Contact">
                                                    <span className="text-muted">{location.phone}</span>
                                                </td>
                                                <td data-label = "Status">
                                                    {getStatusBadge(location.status)}
                                                </td>
                                                <td data-label = "Coordinates">
                                                    <small className="text-muted">
                                                        {location.longitude && location.latitude ? 
                                                            `${location.longitude}, ${location.latitude}` : 
                                                            'Not set'
                                                        }
                                                    </small>
                                                </td>
                                                <td data-label = "Created date">
                                                    <span className="text-muted">
                                                        {moment(location.createdDateTime).format("MMM DD, YYYY")}
                                                    </span>
                                                    <br />
                                                    <small className="text-muted">
                                                        {moment(location.createdDateTime).format("h:mm A")}
                                                    </small>
                                                </td>
                                                <td className="pe-4 text-center">
                                                    <DropdownButton
                                                        as={ButtonGroup}
                                                        size="sm"
                                                        title="Actions"
                                                        variant="outline-primary"
                                                        onClick={() => handleShowDropDown(location)}
                                                    >
                                                        <Dropdown.Item 
                                                            onClick={() => setShowEditModal(true)}
                                                            className="d-flex align-items-center"
                                                        >
                                                            <i className="fas fa-edit me-2"></i>
                                                            Edit Location
                                                        </Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item 
                                                            style={{ color: "red" }} 
                                                            onClick={() => setShowDelete(true)}
                                                            className="d-flex align-items-center"
                                                        >
                                                            <i className="fas fa-trash me-2"></i>
                                                            Delete Location
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
                    {!pendingLocation && currentLocations.length > 0 && (
                        <div className="card-footer bg-white py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-muted">
                                    Showing {((currentPage - 1) * locationsPerPage) + 1} to {Math.min(currentPage * locationsPerPage, filteredLocations.length)} of {filteredLocations.length} entries
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

            {/* Create Location Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleSubmitData)}>
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Location Name <span className="text-danger">*</span></label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter location name, e.g., Wuse, Kubwa"
                                    {...register("locationName", { required: 'Location name is required' })}
                                />
                                {errors.locationName && <div className="text-danger small mt-1">{errors.locationName.message}</div>}
                            </div>

                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Location Address <span className="text-danger">*</span></label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter complete location address"
                                    {...register("locationAddress", { required: 'Location address is required' })}
                                />
                                {errors.locationAddress && <div className="text-danger small mt-1">{errors.locationAddress.message}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Phone Number <span className="text-danger">*</span></label>
                                <input 
                                    type="tel"
                                    className="form-control"
                                    placeholder="Enter contact phone number"
                                    {...register("phone", { required: 'Phone number is required' })}
                                />
                                {errors.phone && <div className="text-danger small mt-1">{errors.phone.message}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Shop/Plaza Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter shop or plaza name"
                                    {...register("shopName")}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Longitude</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter longitude coordinates"
                                    {...register("longitude")}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Latitude</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter latitude coordinates"
                                    {...register("latitude")}
                                />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                {loading ? (
                                    <button className="btn btn-primary w-100" disabled>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Creating Location...
                                    </button>
                                ) : (
                                    <button className="btn btn-primary w-100" type="submit">
                                        Create Location
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Edit Location Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleSubmitEdit)}>
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Location Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter location name"
                                    defaultValue={locationData?.locationName}
                                    {...register("locationName")} 
                                />
                            </div>

                            <div className="col-md-12">
                                <label className="form-label fw-semibold">Location Address</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter location address"
                                    defaultValue={locationData?.locationAddress}
                                    {...register("locationAddress")} 
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Phone Number</label>
                                <input 
                                    type="tel"
                                    className="form-control"
                                    placeholder="Enter phone number"
                                    defaultValue={locationData?.phone}
                                    {...register("phone")} 
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Shop/Plaza Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter shop name"
                                    defaultValue={locationData?.shopName}
                                    {...register("shopName")} 
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Longitude</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter longitude"
                                    defaultValue={locationData?.longitude}
                                    {...register("longitude")} 
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Latitude</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter latitude"
                                    defaultValue={locationData?.latitude}
                                    {...register("latitude")} 
                                />
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                {loading ? (
                                    <button className="btn btn-primary w-100" disabled>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Updating Location...
                                    </button>
                                ) : (
                                    <button className="btn btn-primary w-100" type="submit">
                                        Update Location
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
                    <Modal.Title className="text-danger">Delete Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                             style={{ width: '60px', height: '60px' }}>
                            <i className="fas fa-trash text-danger fa-lg"></i>
                        </div>
                        <h5>Delete Location</h5>
                        <p className="text-muted">
                            Are you sure you want to delete <strong>{locationData.locationName}</strong>?
                            This action cannot be undone and all location data will be permanently removed.
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
                            "Yes, Delete Location"
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

export default AdminLocations;