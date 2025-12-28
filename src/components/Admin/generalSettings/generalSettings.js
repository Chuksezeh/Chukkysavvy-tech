import React from "react";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import AdminDashboard from "../adminDashboard";
import { chukkytechAxios } from "../../Utility/axios";
import { useNavigate } from "react-router-dom";
import "./generalSettings.css"
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaTruck, 
  FaMoneyBillWave, 
  FaBell,
  FaCog,
  FaPlus,
  FaEdit,
  FaTrash,
  FaExclamationTriangle
} from "react-icons/fa";

const GeneralSettings = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isValid },
    } = useForm();
    
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [pendingSettings, setPendingSettings] = useState(true);
    const [allSettings, setAllSettings] = useState(null);
    const [successText, setSuccessText] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchGeneralSettings = async () => {
        try {
            const response = await chukkytechAxios.get('general/getGeneralSettings');
            setAllSettings(response.data.data);
            setPendingSettings(false);
        } catch (error) {
            console.error('Error fetching settings:', error);
            setPendingSettings(false);
        }
    };

    useEffect(() => {
        fetchGeneralSettings();
    }, []);

    const handleSubmitData = async (data) => {
        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);

        try {
            const response = await chukkytechAxios.post(
               "/general/createGeneralSettings", 
               {
                   ...data,
                   repairDeliveryFee: parseFloat(data.repairDeliveryFee),
                   returnRepairDeliveryFee: parseFloat(data.returnRepairDeliveryFee),
                   productDeliveryFeeAbuja: parseFloat(data.productDeliveryFeeAbuja),
                   productDeliveryFeeOutsideAbuja: parseFloat(data.productDeliveryFeeOutsideAbuja)
               }
            );

            setSuccessMessage(true);
            setSuccessText(response.data.message || "General settings created successfully");
            setShowCreateModal(false);
            reset();
            await fetchGeneralSettings();
            
        } catch (err) {
            console.error('Creation failed:', err);
            const errorMsg = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to create settings";
            setErrorMessage(true);
            setErrMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const adminsInfo = localStorage.getItem('adminsInfo');
        if (!adminsInfo) {
            navigate('/admin-login');
        }
    }, [navigate]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Not updated';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        if (!amount && amount !== 0) return 'Not set';
        return `₦${parseFloat(amount).toLocaleString()}`;
    };

    return (
        <>
            <AdminDashboard />
            
            {/* Header Section */}
            <div className="general-settings-container">
                <div className="settings-header">
                    <div className="header-content">
                        <h1>General Settings</h1>
                        <p>Manage your application's general configuration and preferences</p>
                    </div>
                    <button 
                        className="btn btn-primary create-settings-btn"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <FaPlus className="me-2" />
                        Create Settings
                    </button>
                </div>

                {/* Success/Error Messages */}
                {successMessage && (
                    <div className="alert alert-success alert-improved">
                        <FaCog className="me-2" />
                        <strong>Success!</strong> {successText}
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger alert-improved">
                        <FaExclamationTriangle className="me-2" />
                        <strong>Error!</strong> {errMessage}
                    </div>
                )}

                {/* Loading State */}
                {pendingSettings && (
                    <div className="loading-state">
                        <div className="loader-circle"></div>
                    </div>
                )}

                {/* Empty State */}
                {!allSettings && !pendingSettings && (
                    <div className="empty-state">
                        <FaCog className="empty-icon" />
                        <h3>No Settings Found</h3>
                        <p>Get started by creating your general settings configuration</p>
                        <button 
                            className="btn btn-primary create-settings-btn"
                            onClick={() => setShowCreateModal(true)}
                        >
                            <FaPlus className="me-2" />
                            Create Initial Settings
                        </button>
                    </div>
                )}

                {/* Settings Cards Grid */}
                {allSettings && (
                    <div className="settings-grid">
                        {/* Contact Information Card */}
                        <div className="settings-card">
                            <div className="card-header">
                                <div className="card-icon icon-primary">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 className="card-title">Contact Information</h3>
                                    <p className="card-subtitle">Customer support details</p>
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Support Email</span>
                                <div className="item-value">
                                    {allSettings.customerSupportEmail || 
                                     <span className="empty">Not set</span>}
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Support Phone</span>
                                <div className="item-value">
                                    {allSettings.customerSupportPhoneNumber || 
                                     <span className="empty">Not set</span>}
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Main Address</span>
                                <div className="item-value">
                                    {allSettings.locationMainAddress || 
                                     <span className="empty">Not set</span>}
                                </div>
                            </div>
                        </div>

                        {/* Delivery Fees Card */}
                        <div className="settings-card">
                            <div className="card-header">
                                <div className="card-icon icon-success">
                                    <FaTruck />
                                </div>
                                <div>
                                    <h3 className="card-title">Delivery Fees</h3>
                                    <p className="card-subtitle">Shipping and delivery charges</p>
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Repair Delivery</span>
                                <div className="item-value">
                                    {formatCurrency(allSettings.repairDeliveryFee)}
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Return Repair Delivery</span>
                                <div className="item-value">
                                    {formatCurrency(allSettings.returnRepairDeliveryFee)}
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Abuja Product Delivery</span>
                                <div className="item-value">
                                    {formatCurrency(allSettings.productDeliveryFeeAbuja)}
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Outside Abuja Delivery</span>
                                <div className="item-value">
                                    {formatCurrency(allSettings.productDeliveryFeeOutsideAbuja)}
                                </div>
                            </div>
                        </div>

                        {/* System Information Card */}
                        <div className="settings-card">
                            <div className="card-header">
                                <div className="card-icon icon-warning">
                                    <FaBell />
                                </div>
                                <div>
                                    <h3 className="card-title">System Information</h3>
                                    <p className="card-subtitle">Notifications and updates</p>
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Official Notice</span>
                                <div className="item-value">
                                    {allSettings.officialNotice || 
                                     <span className="empty">No notice set</span>}
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Created Date</span>
                                <div className="item-value">
                                    {formatDate(allSettings.createdDateTime)}
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Last Updated</span>
                                <div className="item-value">
                                    {formatDate(allSettings.updatedTime)}
                                </div>
                            </div>
                            
                            <div className="settings-item">
                                <span className="item-label">Settings ID</span>
                                <div className="item-value" style={{fontSize: '0.875rem'}}>
                                    {allSettings.generalSettingsId}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons for Existing Settings */}
                {allSettings && (
                    <div className="action-buttons">
                        <button 
                            className="btn-edit"
                            onClick={() => setShowCreateModal(true)}
                        >
                            <FaEdit className="me-2" />
                            Edit Settings
                        </button>
                        <button 
                            className="btn-delete"
                            onClick={() => {
                                // Add delete functionality here
                                // console.log('Delete settings');
                            }}
                        >
                            <FaTrash className="me-2" />
                            Reset Settings
                        </button>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            <Modal 
                show={showCreateModal} 
                onHide={() => setShowCreateModal(false)} 
                size="lg"
                className="modal-improved"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {allSettings ? 'Update General Settings' : 'Create General Settings'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(handleSubmitData)}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    <FaEnvelope className="me-2" />
                                    Customer Support Email
                                </label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    placeholder="support@company.com"
                                    defaultValue={allSettings?.customerSupportEmail}
                                    {...register("customerSupportEmail", { 
                                        required: 'Customer support email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                                {errors.customerSupportEmail && (
                                    <div className="text-danger small mt-1">
                                        {errors.customerSupportEmail.message}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    <FaPhone className="me-2" />
                                    Customer Support Phone
                                </label>
                                <input 
                                    type="tel"
                                    className="form-control"
                                    placeholder="+2348000000000"
                                    defaultValue={allSettings?.customerSupportPhoneNumber}
                                    {...register("customerSupportPhoneNumber", { 
                                        required: 'Customer support phone number is required'
                                    })}
                                />
                                {errors.customerSupportPhoneNumber && (
                                    <div className="text-danger small mt-1">
                                        {errors.customerSupportPhoneNumber.message}
                                    </div>
                                )}
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">
                                    <FaMapMarkerAlt className="me-2" />
                                    Main Address
                                </label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your main business address"
                                    defaultValue={allSettings?.locationMainAddress}
                                    {...register("locationMainAddress", { 
                                        required: 'Location main address is required'
                                    })}
                                />
                                {errors.locationMainAddress && (
                                    <div className="text-danger small mt-1">
                                        {errors.locationMainAddress.message}
                                    </div>
                                )}
                            </div>

                            {/* Delivery Fees Section */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    <FaMoneyBillWave className="me-2" />
                                    Repair Delivery Fee (₦)
                                </label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="0.00"
                                    defaultValue={allSettings?.repairDeliveryFee}
                                    {...register("repairDeliveryFee", { 
                                        required: 'Repair delivery fee is required',
                                        min: { value: 0, message: 'Fee cannot be negative' }
                                    })}
                                />
                                {errors.repairDeliveryFee && (
                                    <div className="text-danger small mt-1">
                                        {errors.repairDeliveryFee.message}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    <FaTruck className="me-2" />
                                    Return Repair Fee (₦)
                                </label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="0.00"
                                    defaultValue={allSettings?.returnRepairDeliveryFee}
                                    {...register("returnRepairDeliveryFee", { 
                                        required: 'Return repair delivery fee is required',
                                        min: { value: 0, message: 'Fee cannot be negative' }
                                    })}
                                />
                                {errors.returnRepairDeliveryFee && (
                                    <div className="text-danger small mt-1">
                                        {errors.returnRepairDeliveryFee.message}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Abuja Product Delivery (₦)
                                </label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="0.00"
                                    defaultValue={allSettings?.productDeliveryFeeAbuja}
                                    {...register("productDeliveryFeeAbuja", { 
                                        required: 'Product delivery fee within Abuja is required',
                                        min: { value: 0, message: 'Fee cannot be negative' }
                                    })}
                                />
                                {errors.productDeliveryFeeAbuja && (
                                    <div className="text-danger small mt-1">
                                        {errors.productDeliveryFeeAbuja.message}
                                    </div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">
                                    Outside Abuja Delivery (₦)
                                </label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    placeholder="0.00"
                                    defaultValue={allSettings?.productDeliveryFeeOutsideAbuja}
                                    {...register("productDeliveryFeeOutsideAbuja", { 
                                        required: 'Product delivery fee outside Abuja is required',
                                        min: { value: 0, message: 'Fee cannot be negative' }
                                    })}
                                />
                                {errors.productDeliveryFeeOutsideAbuja && (
                                    <div className="text-danger small mt-1">
                                        {errors.productDeliveryFeeOutsideAbuja.message}
                                    </div>
                                )}
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-semibold">
                                    <FaBell className="me-2" />
                                    Official Notice
                                </label>
                                <textarea 
                                    className="form-control"
                                    placeholder="Enter official notice or announcement..."
                                    rows="3"
                                    defaultValue={allSettings?.officialNotice}
                                    {...register("officialNotice", { 
                                        required: 'Official notice is required'
                                    })}
                                />
                                {errors.officialNotice && (
                                    <div className="text-danger small mt-1">
                                        {errors.officialNotice.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                {loading ? (
                                    <button className="btn btn-primary w-100" disabled>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        {allSettings ? 'Updating...' : 'Creating...'}
                                    </button>
                                ) : (
                                    <button className="btn btn-primary w-100" type="submit">
                                        {allSettings ? 'Update Settings' : 'Create Settings'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default GeneralSettings;