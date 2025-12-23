import React, { useState, useMemo, useEffect } from "react";
import AdminDashboard from "../adminDashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { chukkytechAxios } from "../../Utility/axios";
import useGetData from "../../Utility/getFunction";
import { Button, Modal } from "react-bootstrap";
import { MdKeyboardBackspace } from "react-icons/md";

const AddViewPayment = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [successText, setSuccessText] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [pendingUpdate, setPendingUpdate] = useState(false);
    const [paymentGetData, setPaymentGetData] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [errorMessageDisplay, setErrorMessageDisplay] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [pendingPaymentData, setPendingPaymentData] = useState(false);
    const [showGoBack, setShowGoBack] = useState(false);

    const [paymentData, setPaymentData] = useState({
        inspectionFee: "",
        repairFee: "",
        replacementPartsFee: "",
        pickupFee: "",
        deliveryFee: "",
        adminNote: "",
    });

    const [inspectionFee, setInspectionFee] = useState("");
    const [repairFee, setRepairFee] = useState("");
    const [replacementPartsFee, setReplacementPartsFee] = useState("");
    const [pickupFee, setPickupFee] = useState("");
    const [deliveryFee, setDeliveryFee] = useState("");
    const [adminNote, setAdminNote] = useState("");
    //  const [paymentData, setPaymentData] = useState("");
    const [isPendingPayment, setIsPendingPayment] = useState(false);

    const { state } = location;

    const item = state?.item || {};

    console.log("Location state:", state);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const totalAmount = useMemo(() => {
        return (
            Number(+paymentData.inspectionFee || 0) +
            Number(+paymentData.repairFee || 0) +
            Number(+paymentData.replacementPartsFee || 0) +
            Number(+paymentData.pickupFee || 0) +
            Number(+paymentData.deliveryFee || 0)
        );
    }, [paymentData]);

    const handleSendPayment = async () => {
        setLoading(true);

        const paymentDataToSend = {
            ...paymentData,
            repairOrderId: item.repairOrderId,
            repairOrderCode: item.repairOrderCode,
            customerId: item.userId,
            totalAmount: totalAmount,
            status: "active",

        };

        console.log("Payment Data to Send:", paymentDataToSend);

        try {
            const response = await chukkytechAxios.post(
                'repairPayment/sendPayment',
                paymentDataToSend
            );
            setLoading(false);
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Payment sent successfully");

            // await fetchCategories();
        } catch (err) {
            console.error('Payment failed:', err);
            const errorMsg = err.response?.data?.message || err.response?.data?.error || "Failed to send payment";
            setErrorMessage(true);
            setErrMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };


    const fetchPaymentData = async () => {
        setIsPending(true);
        try {
            const response = await chukkytechAxios.get(`/repairPayment/getPayment/${item?.repairOrderId}`);
            setPaymentGetData(response?.data || {});
        } catch (error) {
            console.error('Error fetching payment data:', error);
            setErrorMessageDisplay(true)
            setPaymentGetData({});
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        fetchPaymentData();
    }, [item?.repairOrderId]);

    // const { data: paymentGetData, isPending, error } = useGetData(`/repairPayment/getPayment/${item?.repairOrderId}`);



    const handleUpdatePayment = async () => {
        setPendingUpdate(true);

        const paymentDataUpdate = {
            inspectionFee: inspectionFee || paymentGetData?.data?.inspectionFee,
            repairFee: repairFee || paymentGetData?.data?.repairFee,
            replacementPartsFee: replacementPartsFee || paymentGetData?.data?.replacementPartsFee,
            pickupFee: pickupFee || paymentGetData?.data?.pickupFee,
            deliveryFee: deliveryFee || paymentGetData?.data?.deliveryFee,
            adminNote: adminNote || paymentGetData?.data?.adminNote,
            repairOrderId: item.repairOrderId,
            repairOrderCode: item.repairOrderCode,
            customerId: item.userId,
            totalAmount: Number(+inspectionFee || paymentGetData?.data?.inspectionFee || 0) +
                Number(+repairFee || paymentGetData?.data?.repairFee || 0) +
                Number(+replacementPartsFee || paymentGetData?.data?.replacementPartsFee || 0) +
                Number(+pickupFee || paymentGetData?.data?.pickupFee || 0) +
                Number(+deliveryFee || paymentGetData?.data?.deliveryFee || 0),
            status: "active",

        };

        console.log("Payment Data to Send:", paymentDataUpdate);

        try {
            const response = await chukkytechAxios.put(
                `repairPayment/updatePayment/${paymentGetData?.data?.repairPaymentId}`,
                paymentDataUpdate
            );
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Payment updated successfully");
        
            setShowEditModal(false);
            fetchPaymentData();

            // await fetchCategories();
        } catch (err) {
            console.error('Payment failed:', err);
            const errorMsg = err.response?.data?.message || err.response?.data?.error || "Failed to update payment";
            setErrorMessage(true);
            setErrMessage(errorMsg);
        } finally {
            setPendingUpdate(false);
        }
    };


    const handleMarkAsPaid = async (payment) => {
        setPendingPaymentData(true);

        const payload = {
            paymentStatus: payment
        };


        // console.log("review data>>>>>", payload);

        await chukkytechAxios
            .put(`/repair/repair-order/payment-status/${state?.item?.repairOrderId}`, payload)
            .then(response => {
                //  console.log("response>>>>", res)
                setPendingPaymentData(false);
                setSuccessMessage(true);
                 setShowUpdateModal(false);
                setShowGoBack(true);
                setSuccessText(response.data.message || "Payment status updated successfully");

            })
            .catch(error => {
                console.log("error>>>>", error)
                 const errorMsg = error.response?.data?.message || error.response?.data?.error || "Failed to update payment";
                setPendingPaymentData(false);
                setErrorMessage(true);
                setErrMessage(errorMsg);

            })

    };

console.log("paymentGetData>>>  state?.item?.paymentStatus", state?.item?.paymentStatus);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };



    return (
        <>
            <AdminDashboard />

            {/* Page Header */}
            <div className="container-fluid py-4 bg-light mt-n3">
                <h1 className="h3 text-dark">Repair Order Payment Management</h1>
                <p className="text-muted">
                    Create, preview, and send repair payment breakdown
                </p>
            </div>

            {/* Main Content */}
            <div className=" container-fluid mt-4">
                <div className="row g-4">
                    {/* Payment Form */}
                    <div className="col-lg-6">
                        <div className=" shadow-sm">
                            <div className="card-header fw-bold">
                                Create Payment Breakdown
                            </div>

                            <div className="card-body">
                                {[
                                    { label: "Diagnosis / Inspection Fee", name: "inspectionFee" },
                                    { label: "Repair Labour", name: "repairFee" },
                                    { label: "Replacement Parts", name: "replacementPartsFee" },
                                    { label: "Pickup Fee", name: "pickupFee" },
                                    { label: "Delivery Fee", name: "deliveryFee" },
                                ].map((item) => (
                                    <div className="mb-3" key={item.name}>
                                        <label className="form-label">{item.label} (₦)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name={item.name}
                                            value={paymentData[item.name]}
                                            onChange={handleChange}
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                ))}

                                <div className="mb-3">
                                    <label className="form-label">Admin Note</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        name="adminNote"
                                        value={paymentData.adminNote}
                                        onChange={handleChange}
                                        placeholder="Optional note to customer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Preview */}


                    {
                        paymentGetData.length === 0 || errorMessageDisplay ?


                            <div className="col-lg-6">
                                <div className=" shadow-sm">
                                    <div className="card-header fw-bold">
                                        Payment Preview
                                    </div>

                                    <div className="card-body">
                                        <ul className="list-group mb-3">
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Diagnosis / Inspection Fee</span>
                                                <strong>{ formatCurrency(paymentData.inspectionFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Repair Labour</span>
                                                <strong>{ formatCurrency(paymentData.repairFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Replacement Parts</span>
                                                <strong>{ formatCurrency(paymentData.replacementPartsFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Pickup</span>
                                                <strong>{ formatCurrency(paymentData.pickupFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Delivery</span>
                                                <strong>{ formatCurrency(paymentData.deliveryFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between bg-light fw-bold">
                                                <span>Total</span>
                                                <span>{ formatCurrency(totalAmount) || 0}</span>
                                            </li>
                                        </ul>

                                        {paymentData.adminNote && (
                                            <div className="alert alert-secondary small">
                                                <strong>Note:</strong> {paymentData.adminNote}
                                            </div>
                                        )}

                                        {
                                            loading ? <button
                                                className="btn btn-dark w-100"
                                                disabled
                                            >
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Sending...
                                            </button> : <button
                                                className="btn btn-dark w-100"
                                                onClick={handleSendPayment}
                                                disabled={totalAmount === 0}
                                            >
                                                Send Payment Request to Customer
                                            </button>
                                        }


                                    </div>

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


                                </div>
                            </div> :
                            <div className="col-lg-6">
                                <div className=" shadow-sm">
                                    <div className="card-header fw-bold">
                                        Payment Breakdown Already Stated
                                    </div>

                                    <div className="card-body">
                                        <ul className="list-group mb-3">
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Diagnosis / Inspection Fee</span>
                                                <strong>{ formatCurrency(paymentGetData?.data?.inspectionFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Repair Labour</span>
                                                <strong>{ formatCurrency(paymentGetData?.data?.repairFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Replacement Parts</span>
                                                <strong>{ formatCurrency(paymentGetData?.data?.replacementPartsFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Pickup</span>
                                                <strong>{ formatCurrency(paymentGetData?.data?.pickupFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between">
                                                <span>Delivery</span>
                                                <strong>{ formatCurrency(paymentGetData?.data?.deliveryFee) || 0}</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between bg-light fw-bold">
                                                <span>Total</span>
                                                <span>{ formatCurrency(paymentGetData?.data?.totalAmount) || 0}</span>
                                            </li>
                                        </ul>

                                        {paymentGetData?.data?.adminNote && (
                                            <div className="alert alert-secondary small">
                                                <strong>Note:</strong> {paymentGetData?.data?.adminNote}
                                            </div>
                                        )}





                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={() => setShowEditModal(true)}
                                        >
                                            Edit and Resend Payment Request to Customer
                                        </button>
                                        <br />

                                        {state?.item?.paymentStatus === "Paid" ?
                                            <button
                                                className="btn btn-success w-100 mt-2"
                                                onClick={() => setShowUpdateModal(true)}
                                            >
                                               <span style={{ fontWeight: 'bold' }}>(Paid)</span>  Reset to Pending
                                               
                                            </button> :
                                            
                                                <button  className="btn btn-dark w-100 mt-2"
                                                    onClick={() => setShowUpdateModal(true)}
                                                >
                                                   Mark as Paid
                                                </button> 
                                                
                                        }

                                    </div>

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


                                </div>
                            </div>
                    }



                </div>
            </div>



            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" backdrop="static" >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card-body">
                        {/* {[
                                    { label: "Diagnosis / Inspection Fee", name: "inspectionFee" },
                                    { label: "Repair Labour", name: "repairFee" },
                                    { label: "Replacement Parts", name: "replacementPartsFee" },
                                    { label: "Pickup Fee", name: "pickupFee" },
                                    { label: "Delivery Fee", name: "deliveryFee" },
                                ].map((item) => (
                                    <div className="mb-3" key={item.name}>
                                        <label className="form-label">{item.label} (₦)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name={item.name}
                                            value={paymentData[item.name]}
                                            onChange={handleChange}
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                ))} */}

                        <div className="mb-3" >
                            <label className="form-label">Diagnosis / Inspection Fee (₦)</label>
                            <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setInspectionFee(e.target.value)}
                                defaultValue={paymentGetData?.data?.inspectionFee || 0}
                                placeholder="Enter amount"
                            />
                        </div>
                        <div className="mb-3" >
                            <label className="form-label">Repair Labour (₦)</label>
                            <input
                                type="number"
                                className="form-control"
                                onChange={(e) => setRepairFee(e.target.value)}
                                defaultValue={paymentGetData?.data?.repairFee || 0}
                                placeholder="Enter amount"
                            />
                        </div>
                        <div className="mb-3" >
                            <label className="form-label">Replacement Parts (₦)</label>
                            <input
                                type="number"
                                className="form-control"
                                defaultValue={paymentGetData?.data?.replacementPartsFee || 0}
                                placeholder="Enter amount"
                                onChange={(e) => setReplacementPartsFee(e.target.value)}
                            />
                        </div>
                        <div className="mb-3" >
                            <label className="form-label">Pickup Fee (₦)</label>
                            <input
                                type="number"
                                className="form-control"
                                defaultValue={paymentGetData?.data?.pickupFee || 0}
                                placeholder="Enter amount"
                                onChange={(e) => setPickupFee(e.target.value)}
                            />
                        </div>
                        <div className="mb-3" >
                            <label className="form-label">Delivery Fee (₦)</label>
                            <input
                                type="number"
                                className="form-control"
                                defaultValue={paymentGetData?.data?.deliveryFee || 0}
                                placeholder="Enter amount"
                                onChange={(e) => setDeliveryFee(e.target.value)}

                            />
                        </div>

                        <div className="mb-3" >
                            <label className="form-label">Total (₦)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={
                                    Number(+inspectionFee || paymentGetData?.data?.inspectionFee || 0) +
                                    Number(+repairFee || paymentGetData?.data?.repairFee || 0) +
                                    Number(+replacementPartsFee || paymentGetData?.data?.replacementPartsFee || 0) +
                                    Number(+pickupFee || paymentGetData?.data?.pickupFee || 0) +
                                    Number(+deliveryFee || paymentGetData?.data?.deliveryFee || 0)
                                }
                                placeholder="Enter amount"
                                readOnly

                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Admin Note</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                name="adminNote"
                                defaultValue={paymentGetData?.data?.adminNote || ""}
                                placeholder="Optional note to customer"
                                onChange={(e) => setAdminNote(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    {pendingUpdate ? <Button variant="primary" disabled >
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Updating...
                    </Button> : (
                        <>
                            <Button variant="primary" onClick={handleUpdatePayment}>
                                Save Changes
                            </Button>
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                Close
                            </Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>

            <Modal
                show={showUpdateModal}
                onHide={() => setShowUpdateModal(false)}
                //    backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>

                    {

                       state?.item?.paymentStatus === "Paid" ?
                            <h5>Are you want to reset this payment as pending?</h5> :
                            <h5> Are you sure you want to mark this payment as paid?</h5>
                    }
   

                   
                </Modal.Body>
                <Modal.Footer>

                    {
                        pendingPaymentData ? <Button variant="primary" disabled >
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Updating...
                        </Button> :

                               <>
                         {
                            state?.item?.paymentStatus === "Paid" ?
                            <Button variant="primary"
                                onClick={() => handleMarkAsPaid("Pending")}
                            >
                                Yes, Reset to Pending
                            </Button> :
                              <Button variant="primary"
                                    onClick={() => handleMarkAsPaid("Paid")}
                                >
                                    Yes, Mark as Paid
                                </Button>
                         }

                              

                                <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                                    Cancel
                                </Button>
                               </>


                    }

                </Modal.Footer>
            </Modal>



             <Modal
                show={showGoBack}
                centered
                 onHide={() => setShowGoBack(false)}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header >

                </Modal.Header>
                <Modal.Body>

                    
                            <h5> Payment Status Succesfully Changed</h5> 
                            
                    
   

                   
                </Modal.Body>
                <Modal.Footer>

                <Button variant="primary" onClick={() => navigate(-1)}>
                                  <MdKeyboardBackspace /> Go back
                                </Button>
                               


                    

                </Modal.Footer>
            </Modal>


        </>
    );
};

export default AddViewPayment;
