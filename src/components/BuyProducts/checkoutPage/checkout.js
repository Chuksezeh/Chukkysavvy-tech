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

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [payment, setPayment] = useState("credit");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
     const [filterState, setFilterState] = useState()
    const [allStateLocalGov, setAllStateLocalGov] = useState();
    const [selectedStateLGA, setSelectedStateLGA] = useState();
    const [addressForm, setAddressForm] = useState(false)
       
     

     const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isDirty, isValid },
    } = useForm();


  const userInfo = localStorage.getItem("userInfo");
      const user = JSON.parse(userInfo);

    // Get cart items from navigation state or use empty array as fallback
    const { 
        cartItems = [], 
        subtotal: passedSubtotal = 0, 
        shipping: passedShipping = 0, 
        total: passedTotal = 0 
    } = location.state || {};

    // Calculate totals if not passed from cart
    const subtotal = passedSubtotal || cartItems.reduce(
        (acc, item) => acc + (parseFloat(item.productPrice) * (item.quantity || 1)),
        0
    );
    const shipping = passedShipping || (subtotal > 0 ? 15 : 0);
    const total = passedTotal || (subtotal + shipping);

   const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        setAddressForm(prev => ({
            ...prev,
            setAsDefault: checked
        }));
    };
  console.log("addressForm", addressForm)


       const handleCheckoutAddress = async data => {
        setLoading(true);

        const userData = {
            ...data,
            userId: user?.userId,
            stateId: filterState,
            stateName: allStateLocalGov?.allState?.find(state => state.stateId === filterState)?.name || '',
            lgaName: selectedStateLGA?.find(lga => lga.lgaId === data.lga)?.name || '',
            paymentMethod: payment,
            defaultAddress: addressForm.setAsDefault || false 
        }

        console.log("userData>>>>>>>>>", userData);


        await chukkytechAxios
            .post('/general/createDeliveryAddress', userData)
            .then(res => {
                 console.log('res', res);
                setLoading(false);
                setSuccessMessage(true);
                // setSuccessText(res.data.message)
                // setShowModal(false)
                // fetchLocation();

            })
            .catch(err => {
                console.log('err', err);
                setLoading(false);
                setErrorMessage(true);
                // setErrMessage(err.response?.data)


               });
         };

   

    // Handle address form submission
    const handleSaveAddress = (e) => {
        e.preventDefault();
        // Save address logic here
        alert("Address saved successfully!");
        setShowAddressForm(false);
    };

    // Get product image
    const getProductImage = (product) => {
        if (product.productImages && product.productImages.length > 0) {
            return product.productImages[0].imageUrl;
        }
        return "https://via.placeholder.com/300x200?text=No+Image";
    };


   useEffect(() => {
        const getAllState = async () => {
            const [allState, allLocalGovt] = await Promise.all([
                chukkytechAxios.get(`general/getAllStates`),
                chukkytechAxios.get(`general/getAllLocalGovernments`),
            ]);

            const combinestateLocal = {
                allState: allState.data,
                allLocalGovt: allLocalGovt.data,
            };

            setAllStateLocalGov(combinestateLocal);
        };
        getAllState();
    }, []);


    console.log("allStateLocalGov>>>>>", allStateLocalGov);

    const handleStateChange = event => {
        setFilterState(event.target.value)
        const stateLocalGovt =
            allStateLocalGov.allLocalGovt && allStateLocalGov.allLocalGovt?.filter(LGA => LGA.stateId === event.target.value);
        setSelectedStateLGA(stateLocalGovt);
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
            <div className="container checkout-page my-5">
                <div className="row pt-4">
                    {/* Checkout Form */}
                    <div className="col-lg-8">
                        <form className="checkout-form shadow-sm p-4 rounded"   onSubmit={handleSubmit(handleCheckoutAddress)}>
                            <h5 className="mb-3">Delivery Information</h5>

                            {/* Address Selection */}
                            <div className="cover-address">
                                <div className="second-cover-address">
                                    <div className="address-default-radio"> 
                                        <input className="input-dash" type="radio" name="address" defaultChecked /> 
                                    </div>
                                    <div className="cover-innerAddress">
                                        <h3>Chuks Arinze</h3>
                                        <p>Opposite Nysc and other address</p>
                                        <p>07035910938</p>
                                        <div className="address-btn-holder p-2"> 
                                            <span className="addres-badge">Default Address</span>  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <br/>
                            
                            {/* Add New Address Toggle */}
                            <div 
                                style={{cursor: "pointer"}} 
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className="d-flex align-items-center text-primary mb-3"
                            >
                                <FaPlus />   
                                <span style={{fontSize: "16px", marginLeft: "8px"}}> 
                                    {showAddressForm ? "Cancel Adding Address" : "Add New Address"} 
                                </span>   
                            </div>

                            {/* New Address Form */}
                            {showAddressForm && (
                                <div className="new-address-form mt-3 p-3 border rounded">
                                    <h6>Add New Delivery Address</h6>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">First Name</label>
                                            <input type="text" className="form-control" 
                                             {...register("firstName", { required: "First name is required" })}
                                                />
                                             <span className="cum-error">{errors.firstName?.message}</span>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Last Name</label>
                                            <input type="text" className="form-control" 
                                             {...register("lastName", { required: "Last name is required" })}
                                                />
                                             <span className="cum-error">{errors.lastName?.message}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Email Address</label>
                                            <input type="email" className="form-control"
                                             {...register("emailAddress", { required: "Email address is required" })}
                                                 />
                                             <span className="cum-error">{errors.emailAddress?.message}</span>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Phone Number</label>
                                            <input type="tel" className="form-control"
                                             {...register("phoneNumber", { required: "PhoneNumber is required" })}
                                                />
                                             <span className="cum-error">{errors.phoneNumber?.message}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">State</label>
                                            <select onChange={e => { handleStateChange(e); }} className="form-control">
                                                <option value="">Select State</option>
                                                {allStateLocalGov &&
                                              allStateLocalGov.allState.map((state, index) => (
                                              <option value={state.stateId} key={index}>
                                                {state.name}
                                                  </option>
                                        ))}
                                            </select>
                                           
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">LGA</label>
                                           <select
                                    name="partnerType"
                                    id="partnerType"
                                    className="form-control"
                                    {...register('lga', {
                                        required: 'LGA  is required',
                                        maxLength: {},
                                    })}
                                >
                                    <option value="">select LGA</option>
                                    {selectedStateLGA &&
                                        selectedStateLGA.map((LGA, index) => (
                                            <option value={LGA.lgaId} key={index}>
                                                {LGA.name}
                                            </option>
                                        ))}
                                </select>


                                <span className="cum-error">{errors.lga?.message}</span>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Delivery Address</label>
                                        <input type="text" className="form-control" 
                                         {...register("deliveryAddress", { required: "Delivery address is required" })}
                                                />
                                             <span className="cum-error">{errors.deliveryAddress?.message}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Additional Information</label>
                                        <textarea className="form-control" rows="3" placeholder="Any additional delivery instructions..."
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
                                        {/* Display checkbox status for debugging */}
                                        <small className="d-block text-muted mt-1">
                                            Current value: {addressForm.setAsDefault ? 'true' : 'false'}
                                        </small>
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100"
                                        // onClick={handleSaveAddress}
                                    >
                                        Save Address
                                    </button>
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
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="paypal"
                                        checked={payment === "paypal"}
                                        onChange={(e) => setPayment(e.target.value)}
                                    />
                                    <label className="form-check-label">PayPal</label>
                                </div>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="cash"
                                        checked={payment === "cash"}
                                        onChange={(e) => setPayment(e.target.value)}
                                    />
                                    <label className="form-check-label">Cash on Delivery</label>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button type="submit" className="btn btn-warning w-100 mt-4 p-3 fw-bold">
                                Place Order - N{total.toFixed(2)}
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
                                        <br/>
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

            <PurchaseReceipt />
            <Footer />
        </>
    );
};

export default CheckoutPage;