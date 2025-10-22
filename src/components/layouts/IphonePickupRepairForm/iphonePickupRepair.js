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
import { IoPhonePortrait, IoCalendar, IoLocation, IoDocumentText } from "react-icons/io5";
import Receipt from "../Receipt/repairOrderReceipt";
import "./iphonePickupRepair.css";

const IphoneRepairForm = () => {
    const { 
        register, 
        handleSubmit, 
        setValue,
        watch,
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
    const [selectedModel, setSelectedModel] = useState("");
    
    const navigate = useNavigate();
    
    const userData = JSON.parse(localStorage.getItem('userInfo') || "null");
    const encodedEmail = encodeURIComponent(userData?.email);
    const { data: users, isPending: isPendingUsers } = useGetData(`/auth/getUser/${encodedEmail}`);
    const { data: locations, isPending: isPendingLocations } = useGetData('location/getAllLocations');

    // iPhone models organized by generation
  const iphoneModels = [
        "iPhone 4", "iPhone 4S", "iPhone 5", "iPhone 5S", "iPhone 5C",
        "iPhone 6", "iPhone 6 Plus", "iPhone 6S", "iPhone 6S Plus", 
        "iPhone SE (1st gen)", "iPhone 7", "iPhone 7 Plus", "iPhone 8", 
        "iPhone 8 Plus", "iPhone X", "iPhone XS", "iPhone XR", "iPhone XS Max",
        "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max", "iPhone SE (2nd gen)",
        "iPhone 12", "iPhone 12 mini", "iPhone 12 Pro", "iPhone 12 Pro Max",
        "iPhone 13", "iPhone 13 mini", "iPhone 13 Pro", "iPhone 13 Pro Max",
        "iPhone SE (3rd gen)", "iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", 
        "iPhone 14 Pro Max", "iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", 
        "iPhone 15 Pro Max", "iPhone 16", "iPhone 16 Pro", "iPhone 16 Plus", 
        "iPhone 16 Pro Max", "iPhone 17", "iPhone 17 Air", "iPhone 17 Pro", "iPhone 17 Pro Max"
    ];

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
                deviceType: "iPhone",
                deviceModel: selectedModel,
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
            setErrMessage(err.response?.data?.message || "An error occurred while booking your appointment");
        } finally {
            setLoading(false);
        }
    };

    const navigateLogin = () => navigate("/user-login");

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setValue("deviceModel", model);
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
                    <div className="iphone-header">
                        <h2>
                            <IoPhonePortrait />
                            iPhone Repair Booking
                        </h2>
                        <p>
                            Reserve a date and visit our Apple-certified service center — 
                            we'll be ready to assist you with expert iPhone repairs.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleSubmitDeviceData)}>
                        {/* Device Type (Fixed as iPhone) */}
                        <div className="form-group">
                            <label className="form-label">Device Type</label>
                            <input 
                                type="text"
                                className="form-input"
                                value="iPhone"
                                readOnly
                                {...register("deviceType")}
                                style={{background: '#e9ecef', color: '#6c757d'}}
                            />
                        </div>

                        {/* iPhone Model Selection */}
                        <div className="form-group">
                            <label className="form-label">Select Your iPhone Model</label>
                            <div className="iphone-models-section">
                                <div className="models-scroll-container">
                                    <div className="iphone-model-grid">
                                        {iphoneModels.map((model) => (
                                            <div
                                                key={model}
                                                className={`model-option ${selectedModel === model ? 'selected' : ''}`}
                                                onClick={() => handleModelSelect(model)}
                                            >
                                                {model}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <input
                                type="hidden"
                                {...register("deviceModel", {
                                    required: 'Please select your iPhone model'
                                })}
                            />
                            {errors.deviceModel && (
                                <span className="text-danger small mt-1 d-block">
                                    {errors.deviceModel.message}
                                </span>
                            )}
                        </div>

                        {/* Reservation Date & Time */}
                        <div className="form-group">
                            <label className="form-label">
                                <IoCalendar className="me-2" />
                                Preferred Date & Time
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
                                placeholderText="Choose your preferred date and time"
                            />
                            {errors.reserveDate && (
                                <span className="text-danger small mt-1 d-block">
                                    {errors.reserveDate.message}
                                </span>
                            )}
                        </div>

                        {/* Contact Information */}
                        <div className="form-group">
                            <label className="form-label">
                                <IoPhonePortrait className="me-2" />
                                Contact Number
                            </label>
                            <input 
                                type="tel"
                                className="form-input"
                                placeholder="Your phone number"
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

                        {/* Service Center Selection */}
                        <div className="form-group">
                            <label className="form-label">
                                <IoLocation className="me-2" />
                                Select Service Center
                            </label>
                            <select 
                                className="form-input"
                                {...register("pickUpAddress", {
                                    required: 'Please select a service center'
                                })}
                            >
                                <option value="">Choose a service center near you</option>
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

                        {/* Problem Description */}
                        <div className="form-group">
                            <label className="form-label">
                                <IoDocumentText className="me-2" />
                                What's the issue?
                            </label>
                            <textarea 
                                className="form-input form-textarea"
                                placeholder="Please describe the issue you're experiencing with your iPhone (e.g., cracked screen, battery replacement, water damage, etc.)"
                                {...register("details", {
                                    required: 'Please describe the issue with your iPhone'
                                })}
                            />
                            {errors.details && (
                                <span className="text-danger small mt-1 d-block">
                                    {errors.details.message}
                                </span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="iphone-submit-btn"
                            disabled={loading || !selectedModel}
                        >
                            {loading ? (
                                <>
                                    <span className="loader"></span>
                                  
                                </>
                            ) : (
                                "Book iPhone Repair"
                            )}
                        </button>
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
                        Please log in to book your iPhone repair appointment. 
                        This helps us track your repair history and provide the best Apple-certified service.
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

export default IphoneRepairForm;