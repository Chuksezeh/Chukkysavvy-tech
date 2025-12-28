import React, { useEffect, useRef, useState } from "react";

import Header from "../../../layouts/Header";
import UserDashBoard from "../../userDashboard";
import { MdKeyboardBackspace } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import "./repairCostPayment.css";
import useGetData from "../../../Utility/getFunction";
import { chukkytechAxios } from "../../../Utility/axios";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import chukkylogo from "../../../images/CHUKKY-BRAND-NOBACKGROUND.png"

const RepairCostPayment = () => {
    const navigate = useNavigate();

    const [pendingPaymentData, setPendingPaymentData] = useState(false);
    const [paymentData, setPaymentData] = useState("");
    const [isPendingPayment, setIsPendingPayment] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [successText, setSuccessText] = useState("");

    const location = useLocation();
    const { orderData } = location.state || {};

    const userInfo = localStorage.getItem("userInfo" || null);
    const user = JSON.parse(userInfo);

    const encodedEmail = encodeURIComponent(user?.email);

    const { data: paymentGetData, isPending, error } = useGetData(`/repairPayment/getPayment/${orderData?.repairOrderId}`);

    const { data: userDetails, isPending: userPending, error: userError } = useGetData(`/auth/getUser/${encodedEmail}`);


    const transactionIdRef = useRef(null);
    const orderPaymentIdRef = useRef(null);

    // console.log("userDetails", userDetails.userId)


    const handleFirstPaymentLog = async () => {
        setPendingPaymentData(true);

        const payload = {
            repairOrderCode: orderData?.repairOrderCode,
            paymentStatus: "pending",
            repairOrderId: orderData?.repairOrderId,
            userId: userDetails?.userId,
            amount: paymentGetData?.data?.totalAmount,
            transactionId: "null",
            transactionType: "repair-order-payment",
            paymentStatus: "attempted",

        };


        // console.log("review data>>>>>", payload)

        await chukkytechAxios
            .post("/payments/paymentLog", payload)
            .then(res => {
                // console.log("response>>>>", res)
                transactionIdRef.current = res.data?.transactionId || null;
                orderPaymentIdRef.current = res.data?.repairOrderPaymentId || null;
                setPendingPaymentData(false);
            })
            .catch(error => {
                console.log("error>>>>", error)
                setPendingPaymentData(false);

            })

    };



    const handleLastPaymentLog = async () => {
        setPendingPaymentData(true);

        const payload = {
            repairOrderCode: orderData?.repairOrderCode,
            paymentStatus: "Paid",
            repairOrderId: orderData?.repairOrderId,
            userId: user?.userId,
            amount: paymentGetData?.data?.totalAmount,
            transactionId: transactionIdRef.current,
            transactionType: "repair-order-payment",
            paymentStatus: "completed",

        };


        // console.log("review data>>>>>", payload)

        await chukkytechAxios
            .put(`/payments/paymentLog/update/${transactionIdRef.current}`, payload)
            .then(res => {
                // console.log("response>>>>", res)
                setPendingPaymentData(false);
            })
            .catch(error => {
                console.log("error>>>>", error)
                setPendingPaymentData(false);

            })

    };


    const payWithPaystack = async () => {

        await handleFirstPaymentLog();
        setPendingPaymentData(true);
        const handler = window.PaystackPop.setup({
            key: process.env.REACT_APP_PAYSTACK_KEY,
            email: user?.email,
            amount: paymentGetData?.data?.totalAmount * 100,
            fullName: user?.firstName + " " + user?.lastName,
            ref: transactionIdRef.current,
            // userId: user?.userId,
            currency: 'NGN',
            callback: function (response) {
                // console.log("paystack", response)
                handleLastPaymentLog();
                handleUpdatePaymentStatus(response.reference);

            },
            onClose: function () {
                // setErrorMessage("Payment window closed");
                setPendingPaymentData(false);
            },
        });
        handler.openIframe();
    };


    const handleUpdatePaymentStatus = async () => {
        setPendingPaymentData(true);

        const payload = {
            paymentStatus: "Paid",
            paymentReference: transactionIdRef.current,
        };


        await chukkytechAxios
            .put(`/repair/repair-order/payment-status/${orderData?.repairOrderId}`, payload)
            .then(res => {
                setPendingPaymentData(false);
                setSuccessMessage(true);
                setSuccessText("Congratulations! Payment completed succesfully")
                fetchPaymentData();

                setTimeout(() => {
                    setSuccessMessage(false);
                }, 3000);

            })
            .catch(error => {
                // console.log("error>>>>", error)
                const errorMsg = error.response?.data?.message || error.response?.data?.error || "Failed to update payment";
                setErrorMessage(true);
                setErrMessage(errorMsg);
                setPendingPaymentData(false);

            })

    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };



    const fetchPaymentData = async () => {
        setIsPendingPayment(true);
        try {
            const response = await chukkytechAxios.get(`/repair/getRepairOrderCode/${orderData?.repairOrderCode}`);
            setPaymentData(response?.data || {});
        } catch (error) {
            console.error('Error fetching payment data:', error);
            setPaymentData({});
        } finally {
            setIsPendingPayment(false);
        }
    };

    useEffect(() => {
        fetchPaymentData();
    }, [orderData?.repairOrderCode]);

    const PaymentSkeleton = () => (
        <div className="panel-body">
            {/* Device Summary */}
            <div className="device-summary mb-4">
                <div className="skeleton skeleton-text w-50"></div>
                <div className="skeleton skeleton-text w-75"></div>
                <div className="skeleton skeleton-text w-25"></div>
            </div>

            {/* Cost Breakdown */}
            <div className="cost-breakdown">
                <div className="skeleton skeleton-title"></div>

                {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton skeleton-row"></div>
                ))}

                <hr />
                <div className="skeleton skeleton-row w-50"></div>
            </div>

            {/* Payment Button */}
            <div className="mt-4">
                <div className="skeleton skeleton-button"></div>
            </div>
        </div>
    );




    return (

        <>
            <Header />
            <div className="tec-main-Hide">
                <UserDashBoard />
            </div>


            <div className="main-content">
                <div className="back-btn" onClick={() => navigate(-1)}>
                    <MdKeyboardBackspace size={30} />
                    <span>Back</span>
                </div>

                <div className="panel-wrapper">
                    <div className="panel-head">
                        <h2>Repair Cost & Payment Details</h2>
                        <p>Review the repair charges and proceed with payment</p>
                    </div>

                    <hr />

                    {successMessage && (
                        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <i className="fas fa-check-circle me-2"></i>
                                <strong>Success!</strong> {successText || "Payment created successfully."}
                                <button type="button" className="btn-close" onClick={() => setSuccessMessage(false)}></button>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <i className="fas fa-exclamation-circle me-2"></i>
                                <strong>Error!</strong> {errMessage.message || "Something went wrong, please try again."}
                                <button type="button" className="btn-close" onClick={() => setErrorMessage(false)}></button>
                            </div>
                        </div>
                    )}

                    {isPendingPayment || isPending ? (
                        <PaymentSkeleton />
                    ) : paymentGetData?.length === 0 ? (
                        <div className="no-payment-data text-center">
                            <p>
                                The repair cost for this device is currently being estimated.
                                Please check back shortly for an update.
                            </p>
                        </div>
                    ) : (
                        <div className="panel-body">
                            {/* Device Summary */}
                            <div className="device-summary">
                                <div>
                                    <strong>Order Number:</strong> {orderData?.repairOrderCode}
                                </div>
                                <div>
                                    <strong>Device:</strong> {orderData?.deviceType},{" "}
                                    {orderData?.deviceModel}
                                </div>
                                <div>
                                    <strong>Status:</strong> {orderData?.status || "Pending"}
                                </div>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="cost-breakdown">
                                <h3>Cost Breakdown</h3>

                                <div className="cost-row">
                                    <span>Diagnosis / Inspection</span>
                                    <span>{formatCurrency(paymentGetData?.data?.inspectionFee || 0)}</span>
                                </div>

                                <div className="cost-row">
                                    <span>Repair Labour</span>
                                    <span>{formatCurrency(paymentGetData?.data?.repairFee || 0)}</span>
                                </div>

                                <div className="cost-row">
                                    <span>Replacement Parts</span>
                                    <span>
                                        {formatCurrency(paymentGetData?.data?.replacementPartsFee || 0)}
                                    </span>
                                </div>

                                <div className="cost-row">
                                    <span>Pickup Fee</span>
                                    <span>{formatCurrency(paymentGetData?.data?.pickupFee || 0)}</span>
                                </div>

                                <div className="cost-row">
                                    <span>Delivery Fee</span>
                                    <span>{formatCurrency(paymentGetData?.data?.deliveryFee || 0)}</span>
                                </div>

                                <hr />

                                <div className="cost-row total">
                                    <span>Total Amount</span>
                                    <span>{formatCurrency(paymentGetData?.data?.totalAmount || 0)}</span>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="mt-4">
                                {paymentData?.repairOrders?.[0]?.paymentStatus === "Paid" ? (
                                    <button className="btn btn-success proceed-payment-btn" disabled>
                                        <IoCheckmarkDoneSharp /> Paid
                                    </button>
                                ) : pendingPaymentData ? (
                                    <button className="btn btn-primary proceed-payment-btn" disabled>
                                        <span className="spinner-border spinner-border-sm"></span>
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary proceed-payment-btn"
                                        onClick={payWithPaystack}
                                    >
                                        Proceed to Payment
                                    </button>
                                )}
                            </div>

                            <br />
                            <p>
                                <strong> <img className="myLOglist" src={chukkylogo}/>  </strong>{" "}
                                <span
                                    style={{
                                        color: "gray",
                                        fontStyle: "italic",
                                        fontSize: "14px",
                                    }}
                                >
                                    {paymentGetData?.data?.adminNote || "Thanks for your patronage"}
                                </span>
                            </p>
                        </div>
                    )}







                </div>
            </div>

        </>
    );
};

export default RepairCostPayment;
