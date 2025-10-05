import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./checkoutNavbar.css";

const CheckoutNavbar = () => {
  return (
    <nav className="navbar checkout-navbar shadow-sm px-3">
      <div className="">
        {/* Logo */}
        <a className="navbar-brand fw-bold" href="/">
          Shop<span className="brand-accent">Mate</span>
        </a>

        {/* Progress Steps */}
        <div className="checkout-steps mx-auto">
          <ul className="nav justify-content-center">
            <li className="nav-item step active">Cart</li>
            <li className="nav-item step">Shipping</li>
            <li className="nav-item step">Payment</li>
            <li className="nav-item step">Review</li>
          </ul>
        </div>

        {/* Right-side (Help / Login) */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          <a href="/help" className="nav-link">
            Help
          </a>
          <a href="/login" className="btn btn-outline-primary btn-sm">
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default CheckoutNavbar;
