import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./productCart.css";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import SearchBar from "../../ProductComponents/searchField/searchfield";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { chukkytechAxios } from "../../Utility/axios";
import { decrease, increase, removeProduct } from "../../redux/productCounter";

const ProductCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart items from Redux store
  const { productItems } = useSelector(state => state.cartProduct);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Calculate cart totals
  const subtotal = productItems?.reduce(
    (acc, item) => acc + (parseFloat(item.productPrice) * (item.quantity || 1)),
    0
  ) || 0;
  
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    fetchRecentlyViewed();
  }, []);

  const fetchRecentlyViewed = async () => {
    try {
      const response = await chukkytechAxios.get('/product/getAllProducts');
      // Get 4 random products for recently viewed
      const shuffled = response.data.sort(() => 0.5 - Math.random());
      setRecentlyViewed(shuffled.slice(0, 4));
    } catch (error) {
      console.error('Error fetching recently viewed:', error);
    }
  };

  // Handle Increase Quantity
  const increaseQty = (productId) => {
   dispatch(increase(productId)); 
    console.log('Increase quantity for:', productId);
  };

  // Handle Decrease Quantity
  const decreaseQty = (productId) => {
    dispatch(decrease(productId));  
    console.log('Decrease quantity for:', productId);
  };

  // Remove Item
  const removeItem = (productId) => {
  dispatch(removeProduct(productId));

    console.log('Remove item:', productId);
  };

  const handleCheckout = () => {
  if (productItems?.length > 0) {
    navigate("/checkout-payment", { 
      state: { 
        cartItems: productItems,
        subtotal: subtotal,
        shipping: shipping,
        total: total
      } 
    });
  }
};

  const navigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Get first image URL from product images array
  const getProductImage = (product) => {
    if (product.productImages && product.productImages.length > 0) {
      return product.productImages[0].imageUrl;
    }
    return "https://via.placeholder.com/300x200?text=No+Image";
  };



  return (
    <>
      <Header />
      <SearchBar />
      
      <div className="container cart-page my-5">
        <div className="row mt-4">
          <h2 className="mt-4">Your Shopping Cart</h2>
          <hr />
          
          <div className="col-lg-8">
            {!productItems || productItems.length === 0 ? (
              <div className="empty-cart text-center py-5">
                <div className="empty-cart-icon mb-3">
                  <i className="fas fa-shopping-cart fa-3x text-muted"></i>
                </div>
                <h4 className="text-muted">Your cart is empty</h4>
                <p className="text-muted mb-4 " style={{ textAlign: "center" }}>Add some products to get started</p>
                <button 
                  className="btn btn-warning btn-lg"
                  onClick={() => navigate('/buy-products')}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              productItems.map((item) => (
                <div 
                  className="cart-item d-flex align-items-center mb-4 p-3 shadow-sm rounded" 
                  key={item.productId}
                >
                  <img 
                    src={getProductImage(item)} 
                    alt={item.productName} 
                    className="cart-img rounded"
                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  />
                  
                  <div className="cart-details ms-3 flex-grow-1">
                    <h5 className="mb-2">{item.productName}</h5>
                    <p className="text-muted mb-1">{item.categoryName}</p>
                    <p className="fw-bold text-primary mb-2">
                      N{parseFloat(item.productPrice).toFixed(2)}
                    </p>

                    <div className="d-flex align-items-center quantity-control">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQty(item.productId)}
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <span className="mx-3 fw-bold">{item.quantity || 1}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQty(item.productId)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="cart-subtotal text-end">
                    <p className="fw-bold h5 text-primary">
                      N{((parseFloat(item.productPrice) * (item.quantity || 1))).toFixed(2)}
                    </p>
                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={() => removeItem(item.productId)}
                      title="Remove item"
                    >
                      <FaRegTrashAlt size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="cart-summary p-4 shadow-sm rounded sticky-top">
              <h5 className="mb-3">Order Summary</h5>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({productItems?.length || 0} items)</span>
                <span className="fw-bold">N{subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="fw-bold">N{shipping.toFixed(2)}</span>
              </div>
              {subtotal > 0 && (
                <div className="d-flex justify-content-between mb-2 text-muted small">
                  <span>Estimated Delivery</span>
                  <span>2-3 business days</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span className="text-primary">N{total.toFixed(2)}</span>
              </div>
              
              <button 
                className="btn btn-warning w-100 py-3 fw-bold"
                onClick={handleCheckout}
                disabled={!productItems || productItems.length === 0}
              >
                {productItems?.length > 0 ? 'Proceed to Checkout' : 'Cart is Empty'}
              </button>
              
              {productItems?.length > 0 && (
                <button 
                  className="btn btn-outline-primary w-100 mt-2"
                  onClick={() => navigate('/buy-products')}
                >
                  Continue Shopping
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <section>
          <div className="centSoon">
            <div className="container-fluid bg-transparent my-4 p-3">
              <h2>Recently Viewed</h2>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                {recentlyViewed.map((product) => (
                  <div className="col hp" key={product.productId}>
                    <div className="cardo shadow-sm p-2 h-100">
                      <a 
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigateToProduct(product.productId)}
                      >
                        <img 
                          src={getProductImage(product)} 
                          className="card-img-top" 
                          alt={product.productName}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                      </a>

                      <div className="card-bod d-flex flex-column">
                        <div className="clearfix mb-2">
                          <span className="float-start badge rounded-pill bg-success">
                            N{parseFloat(product.productPrice).toFixed(2)}
                          </span>
                          {product.discount && product.discount > 0 && (
                            <span className="float-end badge rounded-pill bg-danger">
                              {product.discount}% OFF
                            </span>
                          )}
                        </div>
                        
                        <div className="titleText flex-grow-1">
                          <a 
                            style={{ cursor: 'pointer', textDecoration: 'none' }}
                            onClick={() => navigateToProduct(product.productId)}
                            className="text-dark"
                          >
                            {product.productName.length > 80 
                              ? `${product.productName.substring(0, 80)}...` 
                              : product.productName
                            }
                          </a>
                        </div>

                        <div className="product-meta mt-2">
                          <small className="text-muted d-block mb-1">
                            {product.categoryName}
                          </small>
                          <span className={`badge ${
                            product.status === 'active' ? 'bg-success' : 
                            product.status === 'sold' ? 'bg-danger' : 'bg-warning'
                          }`}>
                            {product.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="d-grid gap-2 mt-3">
                        {(product.status === 'sold' || product.productQuantity <= 0) ? (
                          <button className="btn btn-secondary btn-sm" disabled>
                            Out of Stock
                          </button>
                        ) : product.status === 'suspended' ? (
                          <button className="btn btn-warning btn-sm" disabled>
                            Unavailable
                          </button>
                        ) : (
                          <button 
                            className="btn btn-warning btn-sm"
                            onClick={() => navigateToProduct(product.productId)}
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
};

export default ProductCart;