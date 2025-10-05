import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./checkout.css";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import CheckoutNavbar from "./checkoutNavBar";
import SearchBar from "../../ProductComponents/searchField/searchfield";
import { FaPlus } from "react-icons/fa";
import PurchaseReceipt from "../../layouts/PurchaseReceipt/purchaseReceipt";

const CheckoutPage = () => {
    const [payment, setPayment] = useState("credit");

    const cart = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 120,
            quantity: 1,
            image: "https://m.media-amazon.com/images/I/81gK08T6tYL._AC_SL1500_.jpg",
        },
        {
            id: 2,
            name: "Classic Sneakers",
            price: 80,
            quantity: 2,
            image: "https://m.media-amazon.com/images/I/81gK08T6tYL._AC_SL1500_.jpg",
        },
    ];

    const subtotal = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 0 ? 15 : 0;
    const total = subtotal + shipping;

    const handleCheckout = (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
    };

    return (

        <>
            {/* <CheckoutNavbar/> */}
            <Header />
            <SearchBar />
            <div className="container checkout-page my-5">

                <div className="row pt-4">
                    {/* Checkout Form */}
                    <div className="col-lg-8">
                        <form className="checkout-form shadow-sm p-4 rounded" onSubmit={handleCheckout}>
                            <h5 className="mb-3">Delivery Information</h5>



                            <div className="cover-address">

                                <div className="second-cover-address">
                                    <div className="address-default-radio"> <input className="input-dash" type="radio" name="address"  /> </div>
                                    <div className="cover-innerAddress">

                                        <h3> Chuks Arinze </h3>
                                        <p> Opposite Nysc and other address</p>
                                        <p> 07035910938 </p>

                                         <div className="address-btn-holder p-2"> <span className="addres-badge"> Default Address</span>  </div>

                                  </div>


                                </div>
                               
                            </div>
                            <br/>
                            <div style={{cursor:"pointer"}}>  <FaPlus />   <span style={{fontSize:"20px"}}> Add Address </span>   </div>
                            <button type="submit" className="btn btn-warning w-100 mt-4 p-3">
                                Place Order
                            </button>
                           
                            <br/>
                             <br/>
                             <div>
                            

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Last Name</label>
                                    <input className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Email Address</label>
                                    <input type="email" className="form-control" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone Number</label>
                                    <input className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>State</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>City</label>
                                    <input type="text" className="form-control" required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label> Delivery Address</label>
                                <input type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label> Additional Information</label>
                                <input type="text" className="form-control" required />
                            </div>

                            <div className="mb-3">
                                <input type="checkbox" className="form-check-input" />
                                <label className="px-2"> Set as Default </label>

                            </div>
                          </div>
                            <button type="submit" className="btn btn-warning w-100 mt-4 p-3">
                                Save Address
                            </button>

                            <h5 className="mt-4 mb-3">Payment Method</h5>
                            <div className="payment-methods">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"  
                                        value="credit"
                                        checked={payment === "credit"}
                                        onChange={(e) => setPayment(e.target.value)}
                                    />
                                    <label className="form-check-label">Credit / Debit Card</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="paypal"
                                        checked={payment === "paypal"}
                                        onChange={(e) => setPayment(e.target.value)}
                                    />
                                    <label className="form-check-label">PayPal</label>
                                </div>
                                <div className="form-check">
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

                           
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="col-lg-4">
                        <div className="order-summary shadow-sm p-4 rounded mt-4 mt-lg-0">
                            <h5>Order Summary</h5>
                            <hr />
                            {cart.map((item) => (
                                <div className="d-flex align-items-center mb-3" key={item.id}>
                                    <img src={item.image} alt={item.name} className="summary-img me-3" />
                                    <div className="flex-grow-1">
                                        <p className="mb-1">{item.name}</p>
                                        <small className="text-muted">
                                            {item.quantity} × ${item.price}
                                        </small>
                                    </div>
                                    <p className="fw-bold mb-0">${item.price * item.quantity}</p>
                                </div>
                            ))}
                            <hr />
                            <p className="d-flex justify-content-between">
                                <span>Subtotal</span> <span>${subtotal}</span>
                            </p>
                            <p className="d-flex justify-content-between">
                                <span>Shipping</span> <span>${shipping}</span>
                            </p>
                            <hr />
                            <p className="d-flex justify-content-between fw-bold">
                                <span>Total</span> <span>${total}</span>
                            </p>

                            
                        </div>
                    </div>
                </div>
            </div>

<PurchaseReceipt/>



            <Footer />
        </>
    );
};

export default CheckoutPage;
