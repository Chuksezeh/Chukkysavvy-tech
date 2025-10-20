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
import "./instoreRepair.css";
import { IoCalendar, IoPhonePortrait, IoLocation, IoDocumentText } from "react-icons/io5";
import Receipt from "../Receipt/repairOrderReceipt";

const InstoreRepairForm = () => {
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
    const { data: locations, isPending: isPendingLocations } = useGetData('location/getAllLocations');

    const handleSubmitDeviceData = async (formData) => {
        try {
            setLoading(true);
            setErrorMessage(false);

            if (!userData || !users?.userId) {
                setShowNoLogin(true);
                setLoading(false);
                return;
            }

            const deviceData = {
                ...formData,
                repairOrderType: "Instore Appointment",
                userId: users?.userId,
                status: "Processing"
            };

            const response = await chukkytechAxios.post('repair/repairorder', deviceData);
            
            setOrderData(response.data?.repairOrder);
            setSuccessText(response.data?.message);
            setSuccessMessage(true);
            setShowForm(false);
            
        } catch (err) {
            console.error("API error:", err);
            setErrorMessage(true);
            setErrMessage(err.response?.data?.message || "An error occurred while submitting your request");
        } finally {
            setLoading(false);
        }
    };

    const navigateLogin = () => navigate("/user-login");

    if (!showForm && orderData) {
        return <Receipt orderData={orderData} chukkyLogo={chukkyLogo} />;
    }

    return (
        <div className="instore-repair-containe">
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
                <div className="repair-form-card">
                    <div className="form-header">
                        <h2>Book In-Store Repair</h2>
                        <p>
                            Reserve a date and visit our service center at your convenience — 
                            we'll be ready to assist you.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleSubmitDeviceData)}>
                        <div className="form-grid">
                            {/* Device Information */}
                            <div className="form-group">
                                <label className="form-label">
                                    <IoPhonePortrait className="me-2" />
                                    Device Name
                                </label>
                                <input 
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g., Samsung Galaxy S21"
                                    {...register("deviceType", {
                                        required: 'Device name is required'
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
                                    placeholder="e.g., SM-G991B"
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
                                    Reservation Date & Time
                                </label>
                                <DatePicker
                                    selected={reserveDate}
                                    onChange={(date) => {
                                        setReserveDate(date);
                                        setValue("reserveDate", date);
                                    }}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    minDate={new Date()}
                                    className="form-input"
                                    placeholderText="Select date and time"
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
                                    Phone Number
                                </label>
                                <input 
                                    type="tel"
                                    className="form-input"
                                    placeholder="Your phone number"
                                    {...register("phone", {
                                        required: 'Phone number is required'
                                    })}
                                />
                                {errors.phone && (
                                    <span className="text-danger small mt-1 d-block">
                                        {errors.phone.message}
                                    </span>
                                )}
                            </div>

                            {/* Service Center */}
                            <div className="form-group full-width">
                                <label className="form-label">
                                    <IoLocation className="me-2" />
                                    Service Center
                                </label>
                                <select 
                                    className="form-input"
                                    {...register("pickUpAddress", {
                                        required: 'Please select a service center'
                                    })}
                                >
                                    <option value="">Choose a service center</option>
                                    {locations?.map((location) => (
                                        <option key={location.locationId} value={location.locationAddress}>
                                            {location.locationName} - {location.locationAddress}
                                        </option>
                                    ))}
                                </select>
                                {errors.pickUpAddress && (
                                    <span className="text-danger small mt-1 d-block">
                                        {errors.pickUpAddress.message}
                                    </span>
                                )}
                            </div>

                            {/* Problem Details */}
                            <div className="form-group full-width">
                                <label className="form-label">
                                    <IoDocumentText className="me-2" />
                                    Problem Description
                                </label>
                                <textarea 
                                    className="form-input form-textarea"
                                    placeholder="Please describe the issue in detail for direct diagnosis and immediate fix..."
                                    {...register("details", {
                                        required: 'Problem description is required'
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
                                className="submit-btn"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loader"></span>
                                    
                                    </>
                                ) : (
                                    "Book Appointment"
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
                        Please log in to book your repair appointment. 
                        This helps us keep track of your service history and provide better support.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowNoLogin(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={navigateLogin}>
                        Proceed to Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InstoreRepairForm;