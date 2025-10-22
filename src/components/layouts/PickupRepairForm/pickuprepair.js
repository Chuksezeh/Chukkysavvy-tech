import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { chukkytechAxios } from "../../Utility/axios";
import Modal from 'react-bootstrap/Modal';
import chukkyLogo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useGetData from "../../Utility/getFunction";
import { Button } from "react-bootstrap";
import "./pickupRepair.css";
import { 
  IoPhonePortrait, 
  IoCalendar, 
  IoLocation, 
  IoDocumentText,
  IoCar,
  IoTime,
  IoCheckmarkCircle
} from "react-icons/io5";
import Receipt from "../Receipt/repairOrderReceipt";

const PickupRepairForm = () => {
    const { 
        register, 
        handleSubmit, 
        setValue,
        formState: { errors } 
    } = useForm();
    
    const [reserveDate, setReserveDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successText, setSuccessText] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [showNoLogin, setShowNoLogin] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [showForm, setShowForm] = useState(true);
    
    const navigate = useNavigate();
    
    const userData = JSON.parse(localStorage.getItem('userInfo') || "null");
    const encodedEmail = encodeURIComponent(userData?.email);
    const { data: users, isPending: isPendingUsers } = useGetData(`/auth/getUser/${encodedEmail}`);

    const handleSubmitDeviceData = async (formData) => {
        try {
            setLoading(true);
            setErrorMessage(false);

            if (!userData || !users?.userId) {
                // Save form data for after login
                const deviceData = {
                    ...formData,
                    repairOrderType: "Pickup",
                    status: "Processing"
                };
                localStorage.setItem('pendingPickupOrder', JSON.stringify(deviceData));
                setShowNoLogin(true);
                setLoading(false);
                return;
            }

            const deviceData = {
                ...formData,
                repairOrderType: "Pickup",
                userId: users?.userId,
                status: "Processing"
            };

            const response = await chukkytechAxios.post('repair/repairorder', deviceData);
            
            setOrderData(response.data?.repairOrder);
            setSuccessText(response.data?.message);
            setSuccessMessage(true);
            setShowForm(false);
            
            // Clear pending order
            localStorage.removeItem('pendingPickupOrder');
            
        } catch (err) {
            console.error("API error:", err);
            setErrorMessage(true);
            setErrMessage(err.response?.data?.message || "An error occurred while scheduling your pickup");
        } finally {
            setLoading(false);
        }
    };

    const navigateLogin = () => {
        navigate("/user-login");
    };

    if (!showForm && orderData) {
        return <Receipt orderData={orderData} chukkyLogo={chukkyLogo} />;
    }

    return (
        <div className="">
            {/* Success Message */}
            {successMessage && (
                <div className="alert alert-success alert-improved">
                    <strong>Success!</strong> {successText}
                </div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <div className="alert alert-error alert-improved">
                    <strong>Error!</strong> {errMessage}
                </div>
            )}

            {/* Main Form */}
            {showForm && (
                <div className="">
                    <div className="pickup-header">
                        <h2>
                            <IoCar />
                            Schedule Device Pickup
                        </h2>
                        <p>
                            Provide your device details and we'll pick it up from your location. 
                            Our team will contact you to arrange a convenient pickup time.
                        </p>
                    </div>

                    {/* Pickup Benefits */}
                    <div className="pickup-benefits">
                        <div className="benefit-item">
                            <IoCar className="benefit-icon" />
                            <div className="benefit-text">Free Pickup Service</div>
                        </div>
                        <div className="benefit-item">
                            <IoTime className="benefit-icon" />
                            <div className="benefit-text">Flexible Timing</div>
                        </div>
                        <div className="benefit-item">
                            <IoCheckmarkCircle className="benefit-icon" />
                            <div className="benefit-text">Quick Diagnosis</div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(handleSubmitDeviceData)}>
                        <div className="form-grid">
                            {/* Device Information */}
                            <div className="form-group">
                                <label className="form-label">
                                    <IoPhonePortrait className="me-2" />
                                    Device Type
                                </label>
                                <input 
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g., Samsung,Tecno, Laptop"
                                    {...register("deviceType", {
                                        required: 'Device type is required'
                                    })}
                                />
                                {errors.deviceType && (
                                    <span className="text-danger small mt-1 d-block">
                                        {errors.deviceType.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Device Model</label>
                                <input 
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g., Galaxy S21, Tecno cc6"
                                    {...register("deviceModel", {
                                        required: 'Device model is required'
                                    })}
                                />
                                {errors.deviceModel && (
                                    <span className="text-danger small mt-1 d-block">
                                        {errors.deviceModel.message}
                                    </span>
                                )}
                            </div>

                            {/* Contact Information */}
                            <div className="form-group">
                                <label className="form-label">
                                    <IoCalendar className="me-2" />
                                    Preferred Pickup Time
                                </label>
                                <DatePicker
                                    selected={reserveDate}
                                    onChange={(date) => {
                                        setReserveDate(date);
                                        setValue("reserveDate", date);
                                    }}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    minDate={new Date()}
                                    className="form-input"
                                    placeholderText="Choose preferred pickup time"
                                />
                                {errors.reserveDate && (
                                    <span className="text-danger small mt-1 d-block">
                                        {errors.reserveDate.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <IoPhonePortrait className="me-2" />
                                    Contact Number
                                </label>
                                <input 
                                    type="tel"
                                    className="form-input"
                                    placeholder="Your phone number for updates"
                                    {...register("phone", {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[0-9+\-\s()]+$/,
                                            message: 'Please enter a valid phone number'
                                        }
                                    })}
                                />
                                {errors.phone && (
                                    <span className="text-danger small mt-1 d-block">
                                        {errors.phone.message}
                                    </span>
                                )}
                            </div>

                            {/* Pickup Address */}
                            <div className="form-group full-width">
                                <label className="form-label">
                                    <IoLocation className="me-2" />
                                    Pickup Address
                                </label>
                                <textarea 
                                    className="form-input address-textarea"
                                    placeholder="Enter your complete address for pickup (include apartment/unit number, landmarks, etc.)"
                                    {...register("pickUpAddress", {
                                        required: 'Pickup address is required',
                                        minLength: {
                                            value: 10,
                                            message: 'Please provide a detailed address'
                                        }
                                    })}
                                />
                                {errors.pickUpAddress && (
                                    <span className="text-danger small mt-1 d-block">
                                        {errors.pickUpAddress.message}
                                    </span>
                                )}
                            </div>

                            {/* Problem Description */}
                            <div className="form-group full-width">
                                <label className="form-label">
                                    <IoDocumentText className="me-2" />
                                    Repair Details
                                </label>
                                <textarea 
                                    className="form-input form-textarea"
                                    placeholder="Please describe the issue with your device in detail (e.g., screen not working, battery draining fast, water damage, etc.)"
                                    {...register("details", {
                                        required: 'Please describe the repair needed',
                                        minLength: {
                                            value: 10,
                                            message: 'Please provide more details about the issue'
                                        }
                                    })}
                                />
                                {errors.details && (
                                    <span className="text-danger small mt-1 d-block">
                                        {errors.details.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                         <div className="submit-section">
                        <button 
                            type="submit" 
                            className="pickup-submit-btn"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loader"></span>
                                    
                                </>
                            ) : (
                                "Schedule Free Pickup"
                            )}
                        </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Login Required Modal */}
            <Modal
                show={showNoLogin}
                onHide={() => setShowNoLogin(false)}
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">
                        Login Required
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Please log in to schedule your device pickup. 
                        We'll save your repair details so you can continue right where you left off after logging in.
                    </p>
                    <div className="text-center mt-3">
                        <small className="text-muted">
                            Your pickup information has been saved and will be automatically loaded after login.
                        </small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowNoLogin(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={navigateLogin}>
                        Continue to Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PickupRepairForm;