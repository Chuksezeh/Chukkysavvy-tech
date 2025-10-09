import React, { useEffect, useState } from "react";
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

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [payment, setPayment] = useState("credit");
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
    // New states for edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [deliverAddress, setDeliverAddress] = useState(null);
    // const [addressId, setAddressId] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const userInfo = localStorage.getItem("userInfo");
    const user = JSON.parse(userInfo);
    const encodedEmail = encodeURIComponent(user.email);

    


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

    // ... rest of your existing code ...

    // You can use the 'source' variable to show different messaging if needed
    useEffect(() => {
        if (source === 'buy-now') {
            console.log('Buy Now flow - single product checkout');
        } else {
            console.log('Cart flow - multiple products checkout');
        }
    }, [source]);


   console.log('Cart Items> check paying data>>:', source, cartItems, subtotal, shipping, total); 


    // Get cart items from navigation state
    

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
        } catch (error) {
            console.error('Error fetching user data:', error);
            setErrorMessage("Failed to load user data");
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
        // if (!window.confirm("Are you sure you want to delete this address?")) {
        //     return;
        // }

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

    const handleShowWarningModal = (id) =>{
    setAddressId(id);

    setModalMessage('Are you sure you want to delete this address?');
    setShowWarningModal(true);
    }  


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
    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!selectedAddress) {
            setErrorMessage("Please select a delivery address");
            return;
        }

        setLoading(true);

         const paymentData = {
            paymentMethod: payment,
            totalAmount: total,
            customerEmail: userDetails?.email,
            customerName: `${userDetails?.firstName} ${userDetails?.lastName}`,
            selectedProduct: cartItems,
            deliveryAddress: mainDefaultAddress || deliverAddress ,
            userId: userDetails?.userId, 
            subtotal: subtotal,
            deliveryFee: shipping,

     }

 console.log("Processing check:", paymentData);
        try {

   const response =   await chukkytechAxios.post("/order/orders/create", paymentData);

    console.log("Checkout response:", response.data);
      
            // Here you would typically process the payment and create the order
            console.log("Processing checkout with address:", selectedAddress);
            console.log("Payment method:", payment);
            console.log("Cart items:", cartItems);

            // Simulate API call
            setTimeout(() => {
                setLoading(false);
                alert("Order placed successfully!");
                // Navigate to order confirmation page
                // navigate("/order-confirmation", { state: { orderDetails: ... } });
            }, 2000);

        } catch (error) {
            setLoading(false);
            console.log("error", error)
            setErrorMessage("Failed to process order. Please try again.");
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

    // If no cart items, show empty state
    if (!cartItems || cartItems.length === 0) {
        return (
            <>
                <Header />
                <SearchBar />
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





    return (
        <>
           <Header />
            <SearchBar />
           

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
                                                        // e.stopPropagation();
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
                                                        // handleDeleteAddress(mainDefaultAddress.deliveryAddressId);
                                                    }}
                                                    disabled={pendingDeleteAddress}
                                                >
                                                    {pendingDeleteAddress ? "Deleting..." : <MdDelete color="red"/>}
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
                                                    {pendingDeleteAddress ? "Deleting..." : <MdDelete color="red"/>}
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
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className="d-flex align-items-center text-primary mb-3"
                            >
                                <FaPlus />
                                <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                                    {showAddressForm ? "Cancel Adding Address" : "Add New Address"}
                                </span>
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
                                        value="credit"
                                        checked={payment === "credit"}
                                        onChange={(e) => setPayment(e.target.value)}
                                    />
                                    <label className="form-check-label">Credit / Debit Card</label>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                type="button"
                                className="btn btn-warning w-100 mt-4 p-3 fw-bold"
                                onClick={handleCheckout}
                                disabled={loading || !selectedAddress}
                            >
                                {loading ? (
                                    <>
                                        <span className="btn-loader"></span> Processing Order...
                                    </>
                                ) : (
                                    `Place Order - N${total.toFixed(2)}`
                                )}
                            </button>
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
                                    <span>Shipping</span>
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

  
         {/* <PurchaseReceipt/> */}

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

 
                                                
                        {
                        pendingDeleteAddress ? <Button 
                        variant="primary" 
                       disabled={pendingDeleteAddress}
                       
                      >
                        <span className="btn-loader"></span> Deleting...
                      </Button>:  <Button 
                        variant="primary" 
                        onClick={ ()=>  handleDeleteAddress(addressId)}
                        
                      >
                        Confirm
                      </Button>
                        }                           

                     
                    </Modal.Footer>
                  </Modal>

            <Footer />
        </>
    );
};

export default CheckoutPage;