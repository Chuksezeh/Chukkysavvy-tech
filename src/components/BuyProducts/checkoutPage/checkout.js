import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./checkout.css";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import SearchBar from "../../ProductComponents/searchField/searchfield";
import { FaPlus } from "react-icons/fa";
import PurchaseReceipt from "../../layouts/PurchaseReceipt/purchaseReceipt";
import { useForm } from "react-hook-form";
import { chukkytechAxios } from "../../Utility/axios";
import { ButtonGroup, DropdownButton, Dropdown, Modal, Button } from "react-bootstrap";
import { MdDelete, MdOutlineMoreVert } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import html2canvas from "html2canvas";
import { useDispatch } from "react-redux";
import { clearCartProduct } from "../../redux/productCounter";
import Goback from "../../layouts/goBack";
import myLogo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [payment, setPayment] = useState("credit-paid");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [filterState, setFilterState] = useState("")
    const [allStateLocalGov, setAllStateLocalGov] = useState(null);
    const [selectedStateLGA, setSelectedStateLGA] = useState([]);
    const [addressForm, setAddressForm] = useState({
        setAsDefault: false
    });
    const [modalMessage, setModalMessage] = useState('');
    const [mainDefaultAddress, setMainDefaultAddress] = useState(null);
    const [allAddress, setAllAddress] = useState([]);
    const [filterLGA, setFilterLGA] = useState("");
    const [pendingMainDefaultAddress, setPendingMainDefaultAddress] = useState(false);
    const [pendingAllAddress, setPendingAllAddress] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [pendingDeleteAddress, setPendingDeleteAddress] = useState(false);
    const [addressId, setAddressId] = useState(null);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [deliverAddress, setDeliverAddress] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [checkingStock, setCheckingStock] = useState(false);
    const [productStock, setProductStock] = useState({});
    const [showLogin, setShowLogin] = useState(false);
    const receiptRef = useRef(null);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const userInfo = localStorage.getItem("userInfo" || null);
    const user = JSON.parse(userInfo);
    const encodedEmail = encodeURIComponent(user?.email);
    const dispatch = useDispatch();
    const [showNoLogin, setShowNoLogin] = useState(false);
    const handleShowNoLogin = (() => setShowNoLogin(true));
    const handleHideNoLogin = (() => setShowNoLogin(false))


    const navigateLogin = () => navigate("/user-login");
    // Get cart items from navigation state - handle both cart and buy-now flows
    const {
        cartItems = [],
        subtotal: passedSubtotal = 0,
        shipping: passedShipping = 0,
        total: passedTotal = 0,
        source = 'cart' // 'cart' or 'buy-now'
    } = location.state || {};

    // Calculate totals - handle both single item and multiple items
    const subtotal = passedSubtotal || cartItems.reduce(
        (acc, item) => acc + (parseFloat(item.productPrice) * (item.quantity || 1)),
        0
    );
    const shipping = passedShipping || (subtotal > 0 ? 15 : 0);
    const total = passedTotal || (subtotal + shipping);

    // Function to check product stock availability
    const checkProductStock = async () => {
        setCheckingStock(true);
        try {
            const stockChecks = cartItems.map(async (item) => {
                try {
                    // Fetch current product details to get the latest quantity
                    const response = await chukkytechAxios.get(`/product/getProductById/${item.productId}`);
                    const currentProduct = response.data;

                    const availableQuantity = currentProduct.productQuantity || 0;
                    const requestedQuantity = item.quantity || 1;

                    console.log(`Product ${item.productName}: Available=${availableQuantity}, Requested=${requestedQuantity}`);

                    return {
                        productId: item.productId,
                        productName: item.productName,
                        availableQuantity,
                        requestedQuantity,
                        isAvailable: availableQuantity >= requestedQuantity,
                        currentProductData: currentProduct
                    };
                } catch (error) {
                    console.error(`Error checking stock for product ${item.productId}:`, error);
                    return {
                        productId: item.productId,
                        productName: item.productName,
                        availableQuantity: 0,
                        requestedQuantity: item.quantity || 1,
                        isAvailable: false,
                        error: true
                    };
                }
            });

            const stockResults = await Promise.all(stockChecks);
            const unavailableProducts = stockResults.filter(result => !result.isAvailable);

            // Update product stock state for UI display
            const stockMap = {};
            stockResults.forEach(result => {
                stockMap[result.productId] = {
                    available: result.availableQuantity,
                    requested: result.requestedQuantity,
                    isSufficient: result.isAvailable
                };
            });
            setProductStock(stockMap);

            return {
                allAvailable: unavailableProducts.length === 0,
                unavailableProducts,
                stockResults
            };

        } catch (error) {
            console.error('Error checking product stock:', error);
            return {
                allAvailable: false,
                unavailableProducts: [],
                stockResults: [],
                error: true
            };
        } finally {
            setCheckingStock(false);
        }
    };

    // Check stock on component mount and when cart items change
    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            checkProductStock();
        }
    }, [cartItems]);

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setAddressForm(prev => ({
            ...prev,
            setAsDefault: checked
        }));
    };

    // Handle address selection
    const handleAddressSelect = (address) => {
        setSelectedAddress(address.deliveryAddressId);
        setDeliverAddress(address);
    };

    // Combined data fetching function
    const fetchUserData = async () => {
        try {
            // Fetch user details first
            const userResponse = await chukkytechAxios.get(`/auth/getUser/${encodedEmail}`);
            const userData = userResponse.data;
            setUserDetails(userData);

            // Then fetch addresses using the userId
            if (userData.userId) {
                await Promise.all([
                    fetchDefaultAddress(userData.userId),
                    fetchAllAddress(userData.userId)
                ]);
            }
            setShowLogin(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setShowLogin(true);
            setErrorMessage("Failed to load user data /  please login or register to continue");
        }
    };

    // Fetch default address
    const fetchDefaultAddress = async (userId) => {
        setPendingMainDefaultAddress(true);
        try {
            const response = await chukkytechAxios.get(`/general/getDefaultAddressByUserId/${userId}`);
            if (response.data.address) {
                setMainDefaultAddress(response.data.address);
                setSelectedAddress(response.data.address.deliveryAddressId); // Auto-select default address
            } else {
                setMainDefaultAddress(null);
            }
        } catch (error) {
            console.error('Error fetching default address:', error);
            setMainDefaultAddress(null);
        } finally {
            setPendingMainDefaultAddress(false);
        }
    };

    // Fetch all non-default addresses
    const fetchAllAddress = async (userId) => {
        setPendingAllAddress(true);
        try {
            const response = await chukkytechAxios.get(`/general/getNonDefaultAddressesByUserId/${userId}`);
            setAllAddress(response?.data?.addresses || []);
        } catch (error) {
            console.error('Error fetching all addresses:', error);
            setAllAddress([]);
        } finally {
            setPendingAllAddress(false);
        }
    };

    // Handle address creation
    const handleCheckoutAddress = async (data) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // Ensure we have userDetails
            if (!userDetails) {
                await fetchUserData();
            }

            const userData = {
                ...data,
                userId: userDetails?.userId,
                lgaName: filterLGA?.name || '',
                lgaId: filterLGA?.lgaId || '',
                stateId: filterState,
                stateName: allStateLocalGov?.allState?.find(state => state.stateId === filterState)?.name || '',
                paymentMethod: payment,
                defaultAddress: addressForm.setAsDefault || false
            };

            console.log("Submitting address data:", userData);

            const response = await chukkytechAxios.post('/general/createDeliveryAddress', userData);

            setLoading(false);
            setSuccessMessage("Address saved successfully!");

            // Refresh addresses
            if (userDetails?.userId) {
                await fetchUserData();
            }

            // Reset form
            reset();
            setShowAddressForm(false);
            setAddressForm({ setAsDefault: false });
            setFilterState("");
            setFilterLGA("");
            setSelectedStateLGA([]);

        } catch (err) {
            console.log('Error creating address:', err);
            setLoading(false);
            setErrorMessage(err.response?.data?.error || "Failed to save address. Please try again.");
        }
    };

    // Handle delete address
    const handleDeleteAddress = async (addressId) => {
        setPendingDeleteAddress(true);
        try {
            await chukkytechAxios.delete(`/general/deleteAddress/${addressId}/${userDetails.userId}`);

            setSuccessMessage("Address deleted successfully!");

            // Refresh addresses
            await fetchUserData();
            setShowWarningModal(false);
        } catch (err) {
            console.log('Error deleting address:', err);
            setShowWarningModal(false);
            setErrorMessage(err.response?.data?.error || "Failed to delete address. Please try again.");
        } finally {
            setPendingDeleteAddress(false);
        }
    };

    // Handle edit address - open modal
    const handleEditAddress = (address) => {
        setEditingAddress(address);
        setShowEditModal(true);

        // Pre-fill form with address data
        setValue("firstName", address.firstName);
        setValue("lastName", address.lastName);
        setValue("emailAddress", address.emailAddress);
        setValue("phoneNumber", address.phoneNumber);
        setValue("deliveryAddress", address.deliveryAddress);
        setValue("additionalInfo", address.additionalInfo || "");

        // Set state and LGA
        setFilterState(address.stateId);
        setAddressId(address.deliveryAddressId);
        // Find and set the corresponding LGAs for the state
        if (allStateLocalGov?.allLocalGovt) {
            const stateLocalGovt = allStateLocalGov.allLocalGovt.filter(LGA => LGA.stateId === address.stateId);
            setSelectedStateLGA(stateLocalGovt);

            // Find and set the LGA
            const selectedLga = stateLocalGovt.find(lga => lga.lgaId === address.lgaId);
            setFilterLGA(selectedLga);
        }

        setAddressForm({ setAsDefault: address.defaultAddress || false });
    };

    const handleShowWarningModal = (id) => {
        setAddressId(id);
        setModalMessage('Are you sure you want to delete this address?');
        setShowWarningModal(true);
    }

    const handleClearCart = () => {
        try {
            // Clear Redux store
            dispatch(clearCartProduct());
            console.log('Cart cleared from Redux');
        } catch (error) {
            console.error('Error clearing cart from Redux:', error);
        }
    };

    // Handle update address
    const handleUpdateAddress = async (data) => {
        setEditLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const updateData = {
                ...data,
                deliveryAddressId: editingAddress.deliveryAddressId,
                userId: userDetails?.userId,
                lgaName: filterLGA?.name || '',
                lgaId: filterLGA?.lgaId || '',
                stateId: filterState,
                stateName: allStateLocalGov?.allState?.find(state => state.stateId === filterState)?.name || '',
                defaultAddress: addressForm.setAsDefault || false
            };

            console.log("Updating address data:", updateData);

            const response = await chukkytechAxios.put(`/general/updateAddress/${addressId}/${userDetails.userId}`, updateData);

            setEditLoading(false);
            setSuccessMessage("Address updated successfully!");

            console.log("Response from update:", response.data);
            // Refresh addresses
            await fetchUserData();

            // Close modal and reset
            setShowEditModal(false);
            setEditingAddress(null);
            reset();

        } catch (err) {
            console.log('Error updating address:', err);
            setEditLoading(false);
            setErrorMessage(err.response?.data?.error || "Failed to update address. Please try again.");
        }
    };

    // Handle checkout submission
    const handleCheckout = async (reference) => {


        // e.preventDefault();

        if (!selectedAddress) {
            setErrorMessage("Please select a delivery address");
            return;
        }

        setLoading(true);
        setErrorMessage("");

        // First check product stock availability
        const stockCheck = await checkProductStock();

        console.log("Stock check result:>>>>>", stockCheck);


        if (!stockCheck.allAvailable) {
            setLoading(false);

            if (stockCheck.unavailableProducts.length > 0) {
                const productNames = stockCheck.unavailableProducts.map(p =>
                    `${p.productName} (Available: ${p.availableQuantity}, Requested: ${p.requestedQuantity})`
                ).join(', ');

                setErrorMessage(`Insufficient stock for: ${productNames}. Please adjust your quantities and try again.`);
            } else {
                setErrorMessage("Unable to verify product availability. Please try again.");
            }
            return;
        }

        // if (stockCheck.allAvailable === false){
        //        return
        // }
        let selectedPaymentReference
        if (payment === "credit-paid") {
            selectedPaymentReference = reference
        } else {
            selectedPaymentReference = "POD"
        }

        const paymentData = {
            paymentMethod: payment || "credit-paid",
            totalAmount: total,
            customerEmail: userDetails?.email,
            customerName: `${userDetails?.firstName} ${userDetails?.lastName}`,
            selectedProduct: cartItems,
            deliveryAddress: mainDefaultAddress || deliverAddress,
            userId: userDetails?.userId,
            subtotal: subtotal,
            deliveryFee: shipping,
            paymentReference: selectedPaymentReference
        };

        // console.log("Processing checkout:", paymentData);

        try {
            const response = await chukkytechAxios.post("/order/orders/create", paymentData);

            console.log("Checkout response:", response);

            if (response.data && response.data.success) {
                // Order created successfully
                setShowReceipt(true);

                // Clear cart data comprehensively
                await handleClearCart();

                // Clear all localStorage cart data
                localStorage.removeItem('cartItems');
                localStorage.removeItem('cartTotal');
                localStorage.removeItem('cartSubtotal');
                localStorage.removeItem('cartCount');

                // Force refresh of cart-related components
                setTimeout(() => {
                    window.dispatchEvent(new Event('cartUpdated'));
                }, 100);

            } else {
                throw new Error(response.data?.message || "Order creation failed");
            }

        } catch (error) {
            console.log("Checkout error:", error);
            setErrorMessage(error.response?.data?.message || "Failed to process order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // State and LGA handlers
    const handleStateChange = (event) => {
        setFilterState(event.target.value);
        if (allStateLocalGov?.allLocalGovt) {
            const stateLocalGovt = allStateLocalGov.allLocalGovt.filter(LGA => LGA.stateId === event.target.value);
            setSelectedStateLGA(stateLocalGovt);
        }
        setFilterLGA(""); // Reset LGA when state changes
    };

    const handleLGAChange = (event) => {
        const selectedLga = selectedStateLGA?.find(lga => lga.lgaId === event.target.value);
        setFilterLGA(selectedLga);
    };

    // Load initial data
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Load states and LGAs
                const [allState, allLocalGovt] = await Promise.all([
                    chukkytechAxios.get('/general/getAllStates'),
                    chukkytechAxios.get('/general/getAllLocalGovernments'),
                ]);

                setAllStateLocalGov({
                    allState: allState.data,
                    allLocalGovt: allLocalGovt.data,
                });

                // Load user data and addresses
                await fetchUserData();

            } catch (error) {
                console.error('Error loading initial data:', error);
                setErrorMessage("Failed to load initial data");
            }
        };

        loadInitialData();
    }, []);

    // Get product image
    const getProductImage = (product) => {
        if (product.productImages && product.productImages.length > 0) {
            return product.productImages[0].imageUrl;
        }
        return "https://via.placeholder.com/300x200?text=No+Image";
    };

    // Get stock status for a product
    const getStockStatus = (item) => {
        const stockInfo = productStock[item.productId];
        if (!stockInfo) return null;

        const isSufficient = stockInfo.available >= (item.quantity || 1);

        return (
            <small
                className={`d-block ${isSufficient ? 'text-success' : 'text-danger fw-bold'}`}
            >
                <i className={`fas ${isSufficient ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-1`}></i>
                Stock: {stockInfo.available} units
                {!isSufficient && (
                    <span className="ms-1">- Insufficient</span>
                )}
            </small>
        );
    };

    // If no cart items, show empty state
    if (!cartItems || cartItems.length === 0) {
        return (
            <>
                <Header />
                <SearchBar />
                <Goback />
                <div className="container checkout-page my-5">
                    <div className="row pt-4">
                        <div className="col-12 text-center py-5">
                            <div className="empty-cart-icon mb-3">
                                <i className="fas fa-shopping-cart fa-3x text-muted"></i>
                            </div>
                            <h3 className="text-muted">No Items in Cart</h3>
                            <p className="text-muted mb-4">Please add some items to your cart before checkout.</p>
                            <button
                                className="btn btn-warning btn-lg"
                                onClick={() => navigate('/cart')}
                            >
                                Return to Cart
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const downloadReceipt = async () => {
        if (receiptRef.current) {
            const canvas = await html2canvas(receiptRef.current);
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "receipt.png";
            link.click();
        }
    };

    const shareReceipt = async () => {
        if (navigator.share) {
            try {
                const canvas = await html2canvas(receiptRef.current);
                canvas.toBlob(blob => {
                    const file = new File([blob], "receipt.png", { type: "image/png" });
                    navigator.share({
                        files: [file],
                        title: "Receipt",
                        text: "Here is your repair receipt",
                    });
                }, "image/png");
            } catch (error) {
                console.error("Error sharing receipt:", error);
            }
        } else {
            alert("Sharing not supported on this device");
        }
    };



    const handleAddAddress = (() => {
        if (!user) {
            setShowAddressForm(false)

        } else {
            setShowAddressForm(!showAddressForm)
        }

    })

    const handleNavigateLogin = (() => {
        navigate("/user-login")
    })


    //   const handlePayNow = async () => {
    //     try {
    //       setLoading(true);

    //       const response = await chukkytechAxios.post("payments/initialize", {
    //         email: userDetails?.email,
    //         amount: total, // in Naira
    //         userId: userDetails?.userId

    //       });

    //       if (response.data.success) {

    //         window.location.href = response.data.authorization_url;
    //       }
    //     } catch (error) {
    //       console.error("Payment initialization failed:", error);
    //       alert("Something went wrong while initializing payment.");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };


    const payWithPaystack = () => {
        setLoading(true);

        const handler = window.PaystackPop.setup({
            key: process.env.REACT_APP_PAYSTACK_KEY,
            email: userDetails?.email,
            amount: total,
            userId: userDetails?.userId,
            currency: 'NGN',
            callback: function (response) {
                console.log("paystack", response)
                handleCheckout(response.reference);
            },
            onClose: function () {
                setErrorMessage("Payment window closed");
                setLoading(false);
            },
        });
        handler.openIframe();
    };

    return (
        <>
            <Header />
            {/* <SearchBar /> */}

            <Goback />

            {/* Success/Error Messages */}
            {successMessage && (
                <div className="container mt-3">
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {successMessage}
                        <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div className="container mt-3">
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {errorMessage}
                        {showLogin && <button className="loginSetStle btn btn-primary" onClick={handleNavigateLogin}>login</button>}

                        <button type="button" className="btn-close" onClick={() => setErrorMessage("")}></button>
                    </div>
                </div>
            )}

            <div className="container checkout-page my-5">
                <div className="row pt-4">
                    {/* Checkout Form */}
                    <div className="col-lg-8">
                        <form className="checkout-form shadow-sm p-4 rounded">
                            <h5 className="mb-3">Delivery Information</h5>

                            {/* Address Selection */}
                            <div className="cover-address">
                                <h6 className="mb-3 p-1">Select Delivery Address</h6>

                                {/* Default Address */}
                                {pendingMainDefaultAddress ? (
                                    <div className="mzC mz1 mshimmer">Loading default address...</div>
                                ) : mainDefaultAddress ? (
                                    <div
                                        className={`second-cover-address ${selectedAddress === mainDefaultAddress.deliveryAddressId ? 'selected-address' : ''}`}
                                        onClick={() => handleAddressSelect(mainDefaultAddress)}>
                                        <div className="address-default-radio">
                                            <input
                                                className="input-dash"
                                                type="radio"
                                                name="address"
                                                checked={selectedAddress === mainDefaultAddress.deliveryAddressId}
                                                onChange={() => handleAddressSelect(mainDefaultAddress)}
                                            />
                                        </div>

                                        <div className="cover-innerAddress">
                                            <h3>{mainDefaultAddress.firstName} {mainDefaultAddress.lastName}</h3>
                                            <p>{mainDefaultAddress.deliveryAddress}</p>
                                            <p>{mainDefaultAddress.phoneNumber}</p>
                                            <div className="address-btn-holder p-2">
                                                <span className="addres-badge">Default Address</span>
                                            </div>
                                        </div>

                                        <div style={{ top: "10px", right: "10px" }} className="positionAddressDropDiv">
                                            <div>
                                                <button
                                                    className="btn btn-light btn-sm me-2"
                                                    type="button"
                                                    onClick={(e) => {
                                                        handleEditAddress(mainDefaultAddress);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <span
                                                    className="btn btn-light btn-sm"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleShowWarningModal(mainDefaultAddress.deliveryAddressId);
                                                    }}
                                                    disabled={pendingDeleteAddress}
                                                >
                                                    {pendingDeleteAddress ? "Deleting..." : <MdDelete color="red" />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-muted">No default address found. Please add one.</p>
                                )}

                                <hr />

                                {/* Additional Addresses */}
                                {pendingAllAddress ? (
                                    <div className="mzC mz1 mshimmer">Loading additional addresses...</div>
                                ) : allAddress.length > 0 ? (
                                    allAddress.map((address, index) => (
                                        <div
                                            key={address.deliveryAddressId}
                                            className={`second-cover-address ${selectedAddress === address.deliveryAddressId ? 'selected-address' : ''}`}
                                            onClick={() => handleAddressSelect(address)}
                                        >
                                            <div className="address-default-radio">
                                                <input
                                                    className="input-dash"
                                                    type="radio"
                                                    name="address"
                                                    checked={selectedAddress === address.deliveryAddressId}
                                                    onChange={() => handleAddressSelect(address)}
                                                />
                                            </div>
                                            <div className="cover-innerAddress">
                                                <h3>{address.firstName} {address.lastName}</h3>
                                                <p>{address.deliveryAddress}</p>
                                                <p>{address.phoneNumber}</p>
                                            </div>

                                            <div style={{ top: "10px", right: "10px" }} className="positionAddressDropDiv">
                                                <button
                                                    className="btn btn-light btn-sm me-2"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditAddress(address);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <span
                                                    className="btn btn-light btn-sm"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleShowWarningModal(address.deliveryAddressId);
                                                    }}
                                                    disabled={pendingDeleteAddress}
                                                >
                                                    {pendingDeleteAddress ? "Deleting..." : <MdDelete color="red" />}
                                                </span>
                                            </div>

                                            <hr />
                                        </div>
                                    ))
                                ) : (
                                    !pendingAllAddress && null
                                )}
                            </div>

                            <br />

                            {/* Add New Address Toggle */}
                            <div
                                style={{ cursor: "pointer" }}
                                onClick={() => handleAddAddress()}
                                className="d-flex align-items-center text-primary mb-3"
                            >
                                <FaPlus />
                                <s style={{ fontSize: "16px", marginLeft: "8px", textDecoration: "none" }} >
                                    {showAddressForm ? "Cancel Adding Address" : "Add New Address"}
                                </s>
                            </div>

                            {/* New Address Form */}
                            {showAddressForm && (
                                <div className="new-address-form mt-3 p-3 border rounded">
                                    <h6>Add New Delivery Address</h6>
                                    <form >
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">First Name <span style={{ color: "red" }}>*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("firstName", { required: "First name is required" })}
                                                />
                                                <span className="cum-error">{errors.firstName?.message}</span>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Last Name <span style={{ color: "red" }}>*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    {...register("lastName", { required: "Last name is required" })}
                                                />
                                                <span className="cum-error">{errors.lastName?.message}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Email Address <span style={{ color: "red" }}>*</span></label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    {...register("emailAddress", { required: "Email address is required" })}
                                                />
                                                <span className="cum-error">{errors.emailAddress?.message}</span>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">Phone Number <span style={{ color: "red" }}>*</span></label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    {...register("phoneNumber", { required: "Phone number is required" })}
                                                />
                                                <span className="cum-error">{errors.phoneNumber?.message}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">State <span style={{ color: "red" }}>*</span></label>
                                                <select
                                                    className="form-control"
                                                    value={filterState}
                                                    onChange={handleStateChange}
                                                    required
                                                >
                                                    <option value="">Select State</option>
                                                    {allStateLocalGov?.allState?.map((state, index) => (
                                                        <option value={state.stateId} key={index}>
                                                            {state.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label">LGA <span style={{ color: "red" }}>*</span></label>
                                                <select
                                                    className="form-control"
                                                    value={filterLGA?.lgaId || ""}
                                                    onChange={handleLGAChange}
                                                    required
                                                    disabled={!filterState}
                                                >
                                                    <option value="">Select LGA</option>
                                                    {selectedStateLGA?.map((LGA, index) => (
                                                        <option value={LGA.lgaId} key={index}>
                                                            {LGA.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Delivery Address <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("deliveryAddress", { required: "Delivery address is required" })}
                                            />
                                            <span className="cum-error">{errors.deliveryAddress?.message}</span>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Additional Information</label>
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Any additional delivery instructions..."
                                                {...register("additionalInfo")}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="setDefault"
                                                name="setAsDefault"
                                                checked={addressForm.setAsDefault}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label className="form-check-label px-2" htmlFor="setDefault">
                                                Set as Default Address
                                            </label>
                                        </div>

                                        {loading ? (
                                            <button className="btn btn-primary w-100" disabled>
                                                <span className="btn-loader"></span> Saving Address...
                                            </button>
                                        ) : (
                                            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit(handleCheckoutAddress)}>
                                                Save Address
                                            </button>
                                        )}
                                    </form>
                                </div>
                            )}

                            {/* Payment Method */}
                            <h5 className="mt-4 mb-3">Payment Method</h5>
                            <div className="payment-methods">
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="credit-paid"
                                        checked={payment === "credit-paid"}
                                        onChange={(e) => setPayment(e.target.value)}
                                    />
                                    <label className="form-check-label">Credit / Debit Card</label>
                                </div>

                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="pay-on-delivery"
                                        checked={payment === "pay-on-delivery"}
                                        onChange={(e) => setPayment(e.target.value)}
                                    />
                                    <label className="form-check-label">Pay on Delivery</label>
                                </div>
                            </div>

                            {/* Place Order Button */}

                            {
                                payment === "credit-paid" ? <button
                                    type="button"
                                    className="btn btn-warning w-100 mt-4 p-3 fw-bold"
                                    // onClick={handleCheckout}
                                    onClick={payWithPaystack}

                                    disabled={loading || !selectedAddress || checkingStock}
                                >
                                    {checkingStock ? (
                                        <>
                                            <span className="btn-loader"></span> Checking Stock Availability...
                                        </>
                                    ) : loading ? (
                                        <>
                                            <span className="btn-loader"></span> Processing Order...
                                        </>
                                    ) : (
                                        `Pay Now - N${total.toFixed(2)}`
                                    )}
                                </button> : <button
                                    type="button"
                                    className="btn btn-warning w-100 mt-4 p-3 fw-bold"
                                    onClick={handleCheckout}


                                    disabled={loading || !selectedAddress || checkingStock}
                                >
                                    {checkingStock ? (
                                        <>
                                            <span className="btn-loader"></span> Checking Stock Availability...
                                        </>
                                    ) : loading ? (
                                        <>
                                            <span className="btn-loader"></span> Processing Order...
                                        </>
                                    ) : (
                                        `Place Order - N${total.toFixed(2)}`
                                    )}
                                </button>
                            }

                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div className="order-summary shadow-sm p-4 rounded mt-4 mt-lg-0">
                            <h5>Order Summary ({cartItems.length} items)</h5>
                            <hr />

                            {/* Cart Items */}
                            {cartItems.map((item) => (
                                <div className="d-flex align-items-center mb-3" key={item.productId}>
                                    <img
                                        src={getProductImage(item)}
                                        alt={item.productName}
                                        className="summary-img me-3 rounded"
                                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                    />
                                    <div className="flex-grow-1">
                                        <p className="mb-1 fw-semibold">{item.productName}</p>
                                        <small className="text-muted">
                                            {item.quantity || 1} × N{parseFloat(item.productPrice).toFixed(2)}
                                        </small>
                                        <br />
                                        <small className="text-muted">
                                            {item.categoryName}
                                        </small>
                                        {/* Stock Status */}
                                        {getStockStatus(item)}
                                    </div>
                                    <p className="fw-bold mb-0 text-primary">
                                        N{((parseFloat(item.productPrice) * (item.quantity || 1))).toFixed(2)}
                                    </p>
                                </div>
                            ))}

                            <hr />

                            {/* Order Totals */}
                            <div className="order-totals">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal</span>
                                    <span>N{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Delivery</span>
                                    <span>N{shipping.toFixed(2)}</span>
                                </div>
                                {subtotal > 0 && (
                                    <div className="d-flex justify-content-between mb-2 text-muted small">
                                        <span>Estimated Delivery</span>
                                        <span>2-3 business days</span>
                                    </div>
                                )}
                                <hr />
                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total</span>
                                    <span className="text-primary">N{total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Stock Check Notice */}
                            {checkingStock && (
                                <div className="alert alert-info mt-3 p-2 small">
                                    <i className="fas fa-sync-alt fa-spin me-2"></i>
                                    Verifying product availability...
                                </div>
                            )}

                            {/* Order Security Badge */}
                            <div className="security-badge mt-3 p-2 text-center bg-light rounded">
                                <small className="text-muted">
                                    <i className="fas fa-lock me-1"></i>
                                    Your payment information is secure and encrypted
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Address Modal */}
            {showEditModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Address</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditingAddress(null);
                                        reset();
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">First Name <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("firstName", { required: "First name is required" })}
                                            />
                                            <span className="cum-error">{errors.firstName?.message}</span>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Last Name <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register("lastName", { required: "Last name is required" })}
                                            />
                                            <span className="cum-error">{errors.lastName?.message}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Email Address <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                {...register("emailAddress", { required: "Email address is required" })}
                                            />
                                            <span className="cum-error">{errors.emailAddress?.message}</span>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Phone Number <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                {...register("phoneNumber", { required: "Phone number is required" })}
                                            />
                                            <span className="cum-error">{errors.phoneNumber?.message}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">State <span style={{ color: "red" }}>*</span></label>
                                            <select
                                                className="form-control"
                                                value={filterState}
                                                onChange={handleStateChange}
                                                required
                                            >
                                                <option value="">Select State</option>
                                                {allStateLocalGov?.allState?.map((state, index) => (
                                                    <option value={state.stateId} key={index}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">LGA <span style={{ color: "red" }}>*</span></label>
                                            <select
                                                className="form-control"
                                                value={filterLGA?.lgaId || ""}
                                                onChange={handleLGAChange}
                                                required
                                                disabled={!filterState}
                                            >
                                                <option value="">Select LGA</option>
                                                {selectedStateLGA?.map((LGA, index) => (
                                                    <option value={LGA.lgaId} key={index}>
                                                        {LGA.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Delivery Address <span style={{ color: "red" }}>*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            {...register("deliveryAddress", { required: "Delivery address is required" })}
                                        />
                                        <span className="cum-error">{errors.deliveryAddress?.message}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Additional Information</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            placeholder="Any additional delivery instructions..."
                                            {...register("additionalInfo")}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="editSetDefault"
                                            name="setAsDefault"
                                            checked={addressForm.setAsDefault}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label px-2" htmlFor="editSetDefault">
                                            Set as Default Address
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditingAddress(null);
                                        reset();
                                    }}
                                >
                                    Cancel
                                </button>
                                {editLoading ? (
                                    <button className="btn btn-primary" disabled>
                                        <span className="btn-loader"></span> Updating Address...
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleSubmit(handleUpdateAddress)}
                                    >
                                        Update Address
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={showWarningModal} onHide={() => setShowWarningModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowWarningModal(false)}>
                        Cancel
                    </Button>
                    {pendingDeleteAddress ? (
                        <Button variant="primary" disabled={pendingDeleteAddress}>
                            <span className="btn-loader"></span> Deleting...
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={() => handleDeleteAddress(addressId)}>
                            Confirm
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {/* Receipt Modal */}
            <Modal show={showReceipt} onHide={() => setShowReceipt(false)} size="lg" centered>
                <Modal.Header closeButton className="border-0 bg-light">
                    <Modal.Title className="w-100 text-center">
                        <div className="d-flex align-items-center justify-content-center">
                            <i className="fas fa-receipt text-primary me-2 fs-4"></i>
                            <h4 className="m-0 text-dark">Order Confirmation</h4>
                        </div>
                        <small className="text-muted fw-normal">Thank you for your purchase!</small>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4" id="download-receipt" ref={receiptRef}>
                    {/* Header Section */}
                    <div className="row align-items-center mb-4">
                        <div className="col-6">
                            <div className="d-flex align-items-center">

                                <i className="">    <img src={myLogo} style={{ width: "80px" }} /> </i>

                                <div>
                                    <h5 className="mb-0 fw-bold">ChukkyTech</h5>
                                    <small className="text-muted">Premium Tech Solutions</small>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 text-end">
                            {
                                payment === "credit-paid" ? <div className="badge bg-success fs-6 p-2">
                                    <i className="fas fa-check-circle me-1"></i>
                                    Payment Successful
                                </div> : <div className="badge bg-success fs-6 p-2">
                                    <i className="fas fa-check-circle me-1"></i>
                                    Order Booked Successfully
                                </div>
                            }

                            <p className="text-muted small mb-0 mt-1">Order Date: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0">
                            <h6 className="mb-0 fw-bold">
                                <i className="fas fa-boxes me-2 text-primary"></i>
                                Order Items ({cartItems.length})
                            </h6>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="ps-4">Product</th>
                                            <th className="text-center">Qty</th>
                                            <th className="text-end pe-4">Price</th>
                                            <th className="text-end pe-4">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={item.productId}>
                                                <td className="ps-4">
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={getProductImage(item)}
                                                            alt={item.productName}
                                                            className="rounded me-3"
                                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                        />
                                                        <div>
                                                            <div className="fw-semibold">{item.productName}</div>
                                                            <small className="text-muted">{item.categoryName}</small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center">
                                                    <span className="badge bg-secondary">{item.quantity || 1}</span>
                                                </td>
                                                <td className="text-end">
                                                    N{parseFloat(item.productPrice).toFixed(2)}
                                                </td>
                                                <td className="text-end pe-4 fw-semibold">
                                                    N{((parseFloat(item.productPrice) * (item.quantity || 1))).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="row justify-content-end">
                        <div className="col-md-6">
                            <div className="border-0 bg-light">
                                <div className="card-body">
                                    <h6 className="card-title fw-bold mb-3">Order Summary</h6>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">Subtotal:</span>
                                        <span className="fw-semibold">N{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">Delivery Fee:</span>
                                        <span className="fw-semibold">N{shipping.toFixed(2)}</span>
                                    </div>
                                    {payment === 'credit-paid' ? (
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted">Payment Method:</span>
                                            <span className="badge bg-info">
                                                <i className="fas fa-credit-card me-1"></i>
                                                Online/Paid
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="text-muted">Payment Method:</span>
                                            <span className="badge bg-info">
                                                <i className=""></i>
                                                Pay on Delivery
                                                /
                                                Not Paid
                                            </span>
                                        </div>
                                    )

                                    }

                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">Payment Reference:</span>
                                        <span className="fw-semibold">  {""} </span>
                                    </div>
                                    <hr />
                                    {
                                        payment === "credit-paid" ? <div className="d-flex justify-content-between mb-3">
                                            <span className="fw-bold fs-5">Total Amount Paid:</span>
                                            <span className="fw-bold fs-5 text-primary">N{total.toFixed(2)}</span>
                                        </div> : <div className="d-flex justify-content-between mb-3">
                                            <span className="fw-bold fs-5">Total Amount to be Paid on Delivery:</span>
                                            <span className="fw-bold fs-5 text-primary">N{total.toFixed(2)}</span>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Information */}
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="text-center p-3 bg-light rounded">
                                <div className="row align-items-center">
                                    <div className="col-md-4 text-md-start">
                                        <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                                            <i className="fas fa-headset text-primary me-2 fs-5"></i>
                                            <div>
                                                <small className="fw-bold d-block">Need Help?</small>
                                                <small className="text-muted">Contact Support</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 my-2 my-md-0">
                                        <small className="text-muted">
                                            <i className="fas fa-envelope me-1"></i>
                                            support@chukkytech.com
                                        </small>
                                    </div>
                                    <div className="col-md-4 text-md-end">
                                        <small className="text-muted">
                                            <i className="fas fa-phone me-1"></i>
                                            08020653456
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0 bg-light">
                    <div className="d-flex justify-content-between w-100">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setShowReceipt(false)}
                        >
                            <i className="fas fa-times me-2"></i>
                            Close
                        </button>
                        <div>
                            <button className="btn btn-outline-primary me-2" onClick={shareReceipt}>
                                <i className="fas fa-print me-2"></i>
                                Share Receipt
                            </button>
                            <button className="btn btn-primary" onClick={downloadReceipt}>
                                <i className="fas fa-download me-2"></i>
                                Download PDF
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showNoLogin}
                onHide={handleHideNoLogin}
                backdrop="static"
                keyboard={false}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontWeight: 'bold' }} className="text-info">
                        {' '}
                        LOGIN REQUEST{' '}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>
                        Hey, looks like you're not logged in yet! login for a smoother ride, or register to unlock the full experience, let's get you started!

                    </p>
                </Modal.Body>
                <Modal.Footer>

                    <Button className="WProceedBtn" onClick={navigateLogin}>
                        Proceed Login
                    </Button>

                    <Button variant="secondary" onClick={handleHideNoLogin}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </>
    );
};

export default CheckoutPage;