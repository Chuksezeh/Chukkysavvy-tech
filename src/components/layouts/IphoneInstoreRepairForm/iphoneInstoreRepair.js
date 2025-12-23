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
import "./iphoneInstoreRepair.css"
import {
    IoPhonePortrait,
    IoCalendar,
    IoLocation,
    IoDocumentText,
    IoTimer,
    IoCar,
    IoHome
} from "react-icons/io5";
import Receipt from "../Receipt/repairOrderReceipt";

const IphonePickupRepair = () => {
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
    const [selectedModel, setSelectedModel] = useState("");

    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem('userInfo') || "null");
    const encodedEmail = encodeURIComponent(userData?.email);
    const { data: users, isPending: isPendingUsers } = useGetData(`/auth/getUser/${encodedEmail}`);

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
                // Save form data to localStorage for after login
                const deviceData = {
                    ...formData,
                    deviceType: "iPhone",
                    deviceModel: selectedModel,
                    repairOrderType: "Pickup",
                    status: "Processing",
                    paymentStatus: "Pending"
                };
                localStorage.setItem('pendingRepairOrder', JSON.stringify(deviceData));
                setShowNoLogin(true);
                setLoading(false);
                return;
            }

            const deviceData = {
                ...formData,
                deviceType: "iPhone",
                deviceModel: selectedModel,
                repairOrderType: "Pickup",
                userId: users?.userId,
                status: "Processing"
            };

            const response = await chukkytechAxios.post('repair/repairorder', deviceData);

            setOrderData(response.data?.repairOrder);
            setSuccessText(response.data?.message);
            setSuccessMessage(true);
            setShowForm(false);

            // Clear pending order from storage
            localStorage.removeItem('pendingRepairOrder');

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
                    <div className="pickup-header">
                        <h2>
                            <IoPhonePortrait />
                            iPhone Pickup Service
                        </h2>
                        <p>
                            Schedule a convenient pickup for your iPhone repair.
                            We'll come to you, diagnose the issue, and provide expert repair service.
                        </p>
                    </div>
                    <div className="container mt-3">
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            Delivery and pickup are currently available in Abuja only. We’re working to bring our services to more cities soon — stay tuned!

                        </div>
                    </div>

                    {/* Service Features */}
                    {/* <div className="pickup-features">
                        <div className="feature-item">
                            <IoTimer className="feature-icon" />
                            <div className="feature-text">Flexible Scheduling</div>
                        </div>
                        <div className="feature-item">
                            <IoCar className="feature-icon" />
                            <div className="feature-text">Free Pickup</div>
                        </div>
                        <div className="feature-item">
                            <IoHome className="feature-icon" />
                            <div className="feature-text">At Your Location</div>
                        </div>
                    </div> */}

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
                                style={{ background: '#e9ecef', color: '#6c757d', fontWeight: '600' }}
                            />
                        </div>

                        {/* iPhone Model Selection */}
                        <div className="form-group">
                            <label className="form-label">Select Your iPhone Model</label>
                            <div className="model-selection">
                                <div className="model-grid">
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
                                Preferred Pickup / Repair Date & Time
                            </label>

                            <DatePicker
                                selected={reserveDate}
                                onChange={(date) => {
                                    setReserveDate(date);
                                    setValue("reserveDate", date);
                                }}
                                showTimeSelect
                                timeFormat="hh:mm aa"           // AM / PM
                                timeIntervals={30}              // Easier selection
                                dateFormat="MMMM d, yyyy  •  h:mm aa"
                                minDate={new Date()}
                                className="form-input"
                                placeholderText="Select date, then choose time (AM / PM)"
                                popperPlacement="bottom-start"
                            />

                            <small className="text-muted d-block mt-1">
                                Example: <strong>June 20, 2025 • 10:30 AM</strong>
                            </small>

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
                        <div className="form-group">
                            <label className="form-label">
                                <IoLocation className="me-2" />
                                Pickup Address
                            </label>
                            <textarea
                                className="form-input address-input"
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
                        <div className="form-group">
                            <label className="form-label">
                                <IoDocumentText className="me-2" />
                                Repair Details
                            </label>
                            <textarea
                                className="form-input form-textarea"
                                placeholder="Describe the issue with your iPhone (e.g., screen damage, battery issues, water damage, etc.)"
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="pickup-submit-btn"
                            disabled={loading || !selectedModel}
                        >
                            {loading ? (
                                <>
                                    <span className="loader"></span>

                                </>
                            ) : (
                                "Schedule  Pickup"
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
                        Please log in to schedule your iPhone pickup service.
                        We'll save your repair details so you can continue right where you left off after logging in.
                    </p>
                    <div className="text-center mt-3">
                        <small className="text-muted">
                            Your repair information has been saved and will be automatically loaded after login.
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

export default IphonePickupRepair;