import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { chukkytechAxios } from '../../Utility/axios';
import AdminDashboard from '../adminDashboard';
import moment from 'moment/moment';
import { IoCheckmarkDone, IoCart, IoPerson, IoLocation, IoCall, IoMail, IoCard, IoCube, IoPricetag, IoChevronForward, IoClose, IoCheckmarkCircle, IoTime, IoStorefront, IoBagCheck } from 'react-icons/io5';
import { FaShippingFast, FaEdit, FaBoxOpen, FaMoneyCheckAlt } from 'react-icons/fa';
import './ProductManagementPage.css';
import Footer from '../../layouts/Footer';

const ProductManagementPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionDialog, setActionDialog] = useState({ open: false, action: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [statusData, setStatusData] = useState("");
    const [statusPending, setStatusPending] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successText, setSuccessText] = useState("");

    const { orderId } = useParams();

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN'
        }).format(amount);
    };

    // Status color mapping
    const getStatusColor = (status) => {
        const colors = {
            pending: 'status-pending',
            confirmed: 'status-confirmed',
            processing: 'status-processing',
            shipped: 'status-shipped',
            delivered: 'status-delivered',
            cancelled: 'status-cancelled'
        };
        return colors[status] || 'status-pending';
    };

    // Status icons
    const getStatusIcon = (status) => {
        const icons = {
            pending: <IoTime />,
            confirmed: <IoCheckmarkCircle />,
            processing: <IoBagCheck />,
            shipped: <FaShippingFast />,
            delivered: <IoCheckmarkDone />,
            cancelled: <IoClose />
        };
        return icons[status] || <IoTime />;
    };

    // Fetch order data
    const fetchOrderData = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("Fetching order data for ID:", orderId);
            const response = await chukkytechAxios.get(`/order/orders/${orderId}`);
            console.log("API Response:", response.data);

            if (response.data.success) {
                setOrderData(response.data.data);
            } else {
                setError(response.data.error || 'Failed to fetch order data');
            }
        } catch (error) {
            console.error('Error fetching order:', error);
            setError(error.response?.data?.error || error.message || 'Failed to fetch order data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchOrderData();
        }
    }, [orderId]);

    const handleChangeStatus = async () => {
        setStatusPending(true);
        const status = actionDialog.action.charAt(0) + actionDialog.action.slice(1);

        await chukkytechAxios
            .put(`/order/orders/${orderId}/${status}`)
            .then(res => {
                console.log('res', res);
                setStatusPending(false);
                setSuccessMessage(true);
                setStatusData(res.data);
                handleCloseDialog();
                fetchOrderData();
            })
            .catch(err => {
                console.log('err', err);
                setStatusPending(false);
                setErrorMessage(true);
                setError(err.response?.data?.error || 'Failed to update order status');
            });
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleAction = (action) => {
        setActionDialog({ open: true, action });
    };

    const handleCloseDialog = () => {
        setActionDialog({ open: false, action: '' });
        setSelectedItem(null);
    };

    // Order status steps
    const orderSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentStep = orderSteps.indexOf(orderData?.orderStatus) || 0;

    // Loading state
    if (loading) {
        return (
            <>
                <AdminDashboard />
                <div className="header-bar">
                    <ul className="action-bar">
                        <li><a href="/">Home</a> / Orders / <span className="addash">Product Orders Management</span></li>
                    </ul>
                </div>
                <div className="container-fluid py-4">
                    <div className="loading-container text-center">
                        <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h4 className="mt-3 text-muted">Loading Order Details...</h4>
                    </div>
                </div>
            </>
        );
    }

    // Error state
    if (error) {
        return (
            <>
                <AdminDashboard />
                <div className="header-bar">
                    <ul className="action-bar">
                        <li><a href="/">Home</a> / Orders / <span className="addash">Product Orders Management</span></li>
                    </ul>
                </div>
                <div className="container-fluid py-4">
                    <div className="alert alert-danger">
                        <h5>Error Loading Order</h5>
                        <p className="mb-3">{error}</p>
                        <button className="btn btn-primary" onClick={fetchOrderData}>
                            Retry Loading
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // No data state
    if (!orderData) {
        return (
            <>
                <AdminDashboard />
                <div className="header-bar">
                    <ul className="action-bar">
                        <li><a href="/">Home</a> / Orders / <span className="addash">Product Orders Management</span></li>
                    </ul>
                </div>
                <div className="container-fluid py-4">
                    <div className="text-center">
                        <h4 className="text-muted">No order data available</h4>
                        <button className="btn btn-primary mt-2" onClick={fetchOrderData}>
                            Retry Loading
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const {
        paymentMethod,
        totalAmount,
        customerEmail,
        customerName,
        userId,
        subtotal,
        deliveryFee,
        orderStatus,
        createdDate,
        updatedDate,
        deliveryAddress,
        selectedProduct = [],
        paymentReference
    } = orderData;
    const items = selectedProduct || [];

    return (
        <>
            <AdminDashboard />
            <div className="header-bar">
                <ul className="action-bar">
                    <li><a href="/">Home</a> / Orders / <span className="addash">Product Orders Management</span></li>
                </ul>
            </div>

            {successMessage && (
                <div className="container mt-3">
                    <div className="alert alert-success alert-dismissible fade show">
                        <IoCheckmarkCircle className="me-2" />
                        Order status updated successfully!
                        <button type="button" className="btn-close" onClick={() => setSuccessMessage(false)}></button>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="container mt-3">
                    <div className="alert alert-danger alert-dismissible fade show">
                        <IoClose className="me-2" />
                        Failed to update order status. Please try again.
                        <button type="button" className="btn-close" onClick={() => setErrorMessage(false)}></button>
                    </div>
                </div>
            )}

            <div className="container-fluid py-4 product-order-management">
                {/* Header Section */}
                <div className="row mb-4">
                    <div className="col-md-8">
                        <h1 className="page-title">Order Management</h1>
                        <div className="order-meta">
                            <p className="order-id">Order ID: <span className="text-primary">{orderId}</span></p>
                            <p className="payment-ref">Payment Reference: <span className="text-primary">{paymentReference}</span></p>
                        </div>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <div className={`status-badge ${getStatusColor(orderStatus)}`}>
                            {getStatusIcon(orderStatus)}
                            <span>{orderStatus?.toUpperCase()}</span>
                        </div>
                        <p className="text-muted mt-2">
                            Last updated: <strong>{moment(updatedDate).format('lll')}</strong>
                        </p>
                    </div>
                </div>

                {/* Order Progress */}
                <div className=" mb-4">
                    <div className="card-body">
                        <div className="order-stepper">
                            {orderSteps.map((step, index) => (
                                <div key={step} className={`step ${index <= currentStep ? 'active' : ''} ${index === currentStep ? 'current' : ''}`}>
                                    <div className="step-icon">
                                        {getStatusIcon(step)}
                                    </div>
                                    <div className="step-label">{step}</div>
                                    {index < orderSteps.length - 1 && (
                                        <div className="step-connector"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Left Column - Order Details */}
                    <div className="col-lg-8">
                        {/* Products Table */}
                        <div className=" mb-4">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <IoCart className="me-2 text-primary" />
                                    <h5 className="mb-0">Order Items</h5>
                                    <span className="badge bg-primary ms-2">{items.length} items</span>
                                </div>
                            </div>
                            <div className="card-body">
                                {items.length === 0 ? (
                                    <div className="text-center py-4 text-muted">
                                        No items found in this order
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th className="text-center">Type</th>
                                                    <th className="text-center">Quantity</th>
                                                    <th className="text-end">Price</th>
                                                    <th className="text-end">Total</th>
                                                    {/* <th className="text-center">Stock</th> */}
                                                    <th className="text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item) => (
                                                    <tr 
                                                        key={item.orderItemId}
                                                        className="product-row"
                                                        onClick={() => handleItemClick(item)}
                                                    >
                                                        <td >
                                                            <div className="d-flex align-items-center">
                                                                <div className="product-avatar">
                                                                    {item.productName?.charAt(0) || 'P'}
                                                                </div>
                                                                <div className="ms-3">
                                                                    <div className="product-name">{item.productName || 'Unknown Product'}</div>
                                                                    <div className="product-meta">
                                                                        {item.categoryName} • {item.companyName}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <span className="product-type">{item.productType || 'N/A'}</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <span className="quantity-badge">{item.quantity || 0}</span>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="price-amount">{formatCurrency(item.productPrice || 0)}</div>
                                                            <div className="cost-price">Cost: {formatCurrency(item.purchasePrice || 0)}</div>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="total-amount">
                                                                {formatCurrency((item.productPrice || 0) * (item.quantity || 0))}
                                                            </div>
                                                            {(item.discount || 0) > 0 && (
                                                                <div className="discount-amount text-success">
                                                                    Discount: -{formatCurrency(item.discount)}
                                                                </div>
                                                            )}
                                                        </td>
                                                        {/* <td className="text-center">
                                                            <span className={`stock-badge ${parseInt(item.currentStock) < 5 ? 'low-stock' : 'in-stock'}`}>
                                                                {item.currentStock || '0'}
                                                            </span>
                                                        </td> */}
                                                        <td className="text-center">
                                                            <button 
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleItemClick(item);
                                                                }}
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* Order Summary */}
                                <div className="order-summary">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="summary-item">Subtotal:</div>
                                        </div>
                                        <div className="col-6 text-end">
                                            <div className="summary-value">{formatCurrency(subtotal || 0)}</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="summary-item">Delivery Fee:</div>
                                        </div>
                                        <div className="col-6 text-end">
                                            <div className="summary-value">{formatCurrency(deliveryFee || 0)}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="summary-total">Total Amount:</div>
                                        </div>
                                        <div className="col-6 text-end">
                                            <div className="total-amount-final">{formatCurrency(totalAmount || 0)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="">
                            <div className="card-header">
                                <h5 className="mb-0">Order Actions</h5>
                            </div>
                            <div className="card-body">
                                <div className="action-buttons">
                                    <button
                                        className={`btn btn-success ${orderStatus === 'confirmed' ? 'disabled' : ''}`}
                                        onClick={() => handleAction('confirmed')}
                                        disabled={orderStatus === 'confirmed'}
                                    >
                                        <IoCheckmarkCircle className="me-2" />
                                        Confirm Order
                                    </button>
                                    <button
                                        className={`btn btn-primary ${orderStatus === 'processing' ? 'disabled' : ''}`}
                                        onClick={() => handleAction('processing')}
                                        disabled={orderStatus === 'processing'}
                                    >
                                        <IoBagCheck className="me-2" />
                                        Process Order
                                    </button>
                                    <button
                                        className={`btn btn-info ${orderStatus === 'shipped' ? 'disabled' : ''}`}
                                        onClick={() => handleAction('shipped')}
                                        disabled={orderStatus === 'shipped'}
                                    >
                                        <FaShippingFast className="me-2" />
                                        Mark as Shipped
                                    </button>
                                    <button
                                        className={`btn btn-secondary ${orderStatus === 'delivered' ? 'disabled' : ''}`}
                                        onClick={() => handleAction('delivered')}
                                        disabled={orderStatus === 'delivered'}
                                    >
                                        <IoCheckmarkDone className="me-2" />
                                        Mark as Delivered
                                    </button>
                                    <button
                                        className={`btn btn-danger ${orderStatus === 'cancelled' ? 'disabled' : ''}`}
                                        onClick={() => handleAction('cancelled')}
                                        disabled={orderStatus === 'cancelled'}
                                    >
                                        <IoClose className="me-2" />
                                        Cancel Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Customer & Delivery Info */}
                    <div className="col-lg-4">
                        {/* Customer Information */}
                        <div className=" mb-4">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <IoPerson className="me-2 text-primary" />
                                    <h5 className="mb-0">Customer Information</h5>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="info-list">
                                    <div className="info-item">
                                        <IoPerson className="info-icon" />
                                        <div className="info-content">
                                            <div className="info-label">Customer Name</div>
                                            <div className="info-value">{customerName || 'N/A'}</div>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <IoMail className="info-icon" />
                                        <div className="info-content">
                                            <div className="info-label">Email</div>
                                            <div className="info-value">{customerEmail || 'N/A'}</div>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <IoCard className="info-icon" />
                                        <div className="info-content">
                                            <div className="info-label">Payment Method</div>
                                            <div className="info-value">{paymentMethod || 'Not specified'}</div>
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <IoPerson className="info-icon" />
                                        <div className="info-content">
                                            <div className="info-label">User ID</div>
                                            <div className="info-value">{userId || 'N/A'}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Delivery Information */}
                        <div className="">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <IoLocation className="me-2 text-primary" />
                                    <h5 className="mb-0">Delivery Information</h5>
                                </div>
                            </div>
                            <div className="card-body">
                                {deliveryAddress ? (
                                    <div className="info-list">
                                        <div className="info-item">
                                            <IoLocation className="info-icon" />
                                            <div className="info-content">
                                                <div className="info-label">Delivery Address</div>
                                                <div className="info-value">
                                                    {deliveryAddress.deliveryAddress}
                                                    <div className="text-muted small">
                                                        {deliveryAddress.lgaName}, {deliveryAddress.stateName}
                                                    </div>
                                                    {deliveryAddress.additionalInfo && (
                                                        <div className="text-muted small">
                                                            Additional: {deliveryAddress.additionalInfo}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <IoCall className="info-icon" />
                                            <div className="info-content">
                                                <div className="info-label">Phone Number</div>
                                                <div className="info-value">{deliveryAddress.phoneNumber}</div>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <IoMail className="info-icon" />
                                            <div className="info-content">
                                                <div className="info-label">Contact Email</div>
                                                <div className="info-value">{deliveryAddress.emailAddress}</div>
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <IoPerson className="info-icon" />
                                            <div className="info-content">
                                                <div className="info-label">Recipient</div>
                                                <div className="info-value">
                                                    {deliveryAddress.firstName} {deliveryAddress.lastName}
                                                </div>
                                            </div>
                                        </div>
                                        {deliveryAddress.defaultAddress && (
                                            <div className="info-item">
                                                <IoCheckmarkCircle className="info-icon text-success" />
                                                <div className="info-content">
                                                    <div className="info-label">Default Address</div>
                                                    <div className="info-value text-success">
                                                        This is the customer's default delivery address
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center text-muted py-3">
                                        No delivery address information available
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Detail Modal */}
                {selectedItem && (
                    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Product Details - {selectedItem.productName}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => setSelectedItem(null)}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6 className="section-title">Product Information</h6>
                                            <div className="info-grid">
                                                <div className="info-item">
                                                    <span className="info-label">Product Name:</span>
                                                    <span className="info-value">{selectedItem.productName}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Category:</span>
                                                    <span className="info-value">{selectedItem.categoryName}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Product Type:</span>
                                                    <span className="info-value">{selectedItem.productType}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Company:</span>
                                                    <span className="info-value">{selectedItem.companyName}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <h6 className="section-title">Pricing & Stock</h6>
                                            <div className="info-grid">
                                                <div className="info-item">
                                                    <span className="info-label">Selling Price:</span>
                                                    <span className="info-value">{formatCurrency(selectedItem.productPrice)}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Purchase Price:</span>
                                                    <span className="info-value">{formatCurrency(selectedItem.purchasePrice)}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Quantity Ordered:</span>
                                                    <span className="info-value">{selectedItem.quantity}</span>
                                                </div>
                                                <div className="info-item">
                                                    <span className="info-label">Current Stock:</span>
                                                    <span className="info-value">{selectedItem.currentStock}</span>
                                                </div>
                                                {(selectedItem.discount || 0) > 0 && (
                                                    <div className="info-item">
                                                        <span className="info-label">Discount Applied:</span>
                                                        <span className="info-value text-success">-{formatCurrency(selectedItem.discount)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                                        Close
                                    </button>
                                    {/* <button type="button" className="btn btn-primary">
                                        Edit Product
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Confirmation Modal */}
                {actionDialog.open && (
                    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Confirm {actionDialog.action.charAt(0).toUpperCase() + actionDialog.action.slice(1)} Order
                                    </h5>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Are you sure you want to {actionDialog.action} this order? This action cannot be undone.
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary" 
                                        onClick={handleCloseDialog}
                                        disabled={statusPending}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`btn ${actionDialog.action === 'cancelled' ? 'btn-danger' : 'btn-primary'}`}
                                        onClick={handleChangeStatus}
                                        disabled={statusPending}
                                    >
                                        {statusPending ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            `Confirm ${actionDialog.action.charAt(0).toUpperCase() + actionDialog.action.slice(1)}`
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <section style={{marginTop: "5%" }}>
  <Footer/>
      </section>

        </>
    );
};

export default ProductManagementPage;