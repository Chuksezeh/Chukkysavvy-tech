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
import Goback from "../../layouts/goBack";

// Skeleton Loader Components
const CartSkeletonLoader = () => {
  return (
    <>
      <Header />
      <SearchBar />
      
      <div className="container cart-page my-5">
        <div className="row mt-4">
          <div className="skeleton-page-title skeleton"></div>
          <div className="skeleton-divider skeleton"></div>
          
          <div className="col-lg-8">
            {/* Cart Items Skeleton */}
            {[1, 2, 3].map((item) => (
              <div className="cart-item-skeleton d-flex align-items-center mb-4 p-3 shadow-sm rounded" key={item}>
                <div className="skeleton-cart-image skeleton"></div>
                
                <div className="cart-details-skeleton ms-3 flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="skeleton-product-title skeleton"></div>
                    <div className="skeleton-badge skeleton"></div>
                  </div>
                  <div className="skeleton-category skeleton"></div>
                  <div className="skeleton-price skeleton"></div>
                  <div className="skeleton-quantity-controls d-flex align-items-center">
                    <div className="skeleton-quantity-btn skeleton"></div>
                    <div className="skeleton-quantity-value skeleton"></div>
                    <div className="skeleton-quantity-btn skeleton"></div>
                    <div className="skeleton-stock-info skeleton"></div>
                  </div>
                </div>
                
                <div className="cart-subtotal-skeleton text-end">
                  <div className="skeleton-subtotal skeleton"></div>
                  <div className="skeleton-remove-btn skeleton"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Skeleton */}
          <div className="col-lg-4">
            <div className="cart-summary-skeleton p-4 shadow-sm rounded">
              <div className="skeleton-summary-title skeleton"></div>
              <div className="skeleton-divider-small skeleton"></div>
              
              <div className="skeleton-summary-item d-flex justify-content-between mb-2">
                <div className="skeleton-summary-label skeleton"></div>
                <div className="skeleton-summary-value skeleton"></div>
              </div>
              <div className="skeleton-summary-item d-flex justify-content-between mb-2">
                <div className="skeleton-summary-label skeleton"></div>
                <div className="skeleton-summary-value skeleton"></div>
              </div>
              <div className="skeleton-summary-item d-flex justify-content-between mb-2">
                <div className="skeleton-summary-label skeleton"></div>
                <div className="skeleton-summary-value skeleton"></div>
              </div>
              
              <div className="skeleton-divider-small skeleton"></div>
              
              <div className="skeleton-total d-flex justify-content-between mb-4">
                <div className="skeleton-total-label skeleton"></div>
                <div className="skeleton-total-value skeleton"></div>
              </div>
              
              <div className="skeleton-checkout-btn skeleton"></div>
              <div className="skeleton-continue-btn skeleton mt-2"></div>
            </div>
          </div>
        </div>

        {/* Recently Viewed Skeleton */}
        <section>
          <div className="centSoon">
            <div className="container-fluid bg-transparent my-4 p-3">
              <div className="skeleton-section-title skeleton"></div>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
                {[1, 2, 3, 4].map((item) => (
                  <div className="col hp" key={item}>
                    <div className="cardo-skeleton shadow-sm p-2 h-100">
                      <div className="skeleton-card-image skeleton"></div>
                      <div className="card-bod-skeleton d-flex flex-column">
                        <div className="clearfix mb-2">
                          <div className="skeleton-price-badge skeleton"></div>
                          <div className="skeleton-discount-badge skeleton"></div>
                        </div>
                        <div className="skeleton-product-card-title skeleton"></div>
                        <div className="skeleton-product-meta mt-2">
                          <div className="skeleton-category-small skeleton"></div>
                          <div className="skeleton-stock-badge skeleton"></div>
                        </div>
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <div className="skeleton-card-button skeleton"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

const ProductCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart items from Redux store
  const { productItems } = useSelector(state => state.cartProduct);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cartAvailability, setCartAvailability] = useState({});
  const [loading, setLoading] = useState(true);

  // Calculate cart totals
  const subtotal = productItems?.reduce(
    (acc, item) => acc + (parseFloat(item.productPrice) * (item.quantity || 1)),
    0
  ) || 0;

// Format currency
   const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};


  useEffect(()=>{
   window.scrollTo(0, 0);
  },[])
  
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    fetchAllProducts();
    fetchRecentlyViewed();
  }, []);

  // Update cart availability when products or cart items change
  useEffect(() => {
    if (allProducts.length > 0 && productItems) {
      checkCartAvailability();
    }
  }, [allProducts, productItems]);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await chukkytechAxios.get('/product/getAllProducts');
      setAllProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Check availability of products in cart
  const checkCartAvailability = () => {
    const availability = {};
    
    productItems?.forEach(item => {
      const product = allProducts.find(p => p.productId === item.productId);
      
      if (product) {
        availability[item.productId] = {
          isAvailable: product.status === 'active' && product.productQuantity > 0,
          maxQuantity: product.productQuantity,
          status: product.status,
          currentStock: product.productQuantity
        };
      } else {
        // Product not found in all products (might be deleted)
        availability[item.productId] = {
          isAvailable: false,
          maxQuantity: 0,
          status: 'not_found',
          currentStock: 0
        };
      }
    });
    
    setCartAvailability(availability);
  };

  // Handle Increase Quantity with stock check
  const increaseQty = (productId) => {
    const availability = cartAvailability[productId];
    const cartItem = productItems.find(item => item.productId === productId);
    const currentQuantity = cartItem?.quantity || 1;

    if (!availability?.isAvailable) {
      alert("This product is currently unavailable");
      return;
    }

    if (currentQuantity >= availability.maxQuantity) {
      alert(`Only ${availability.maxQuantity} items available in stock`);
      return;
    }

    dispatch(increase(productId)); 
    // console.log('Increase quantity for:', productId);
  };

  // Handle Decrease Quantity
  const decreaseQty = (productId) => {
    dispatch(decrease(productId));  
    // console.log('Decrease quantity for:', productId);
  };

  // Remove Item
  const removeItem = (productId) => {
    dispatch(removeProduct(productId));
    // console.log('Remove item:', productId);
  };

  const handleCheckout = () => {
    // Check if any items are unavailable before proceeding to checkout
    const unavailableItems = productItems?.filter(item => {
      const availability = cartAvailability[item.productId];
      return !availability?.isAvailable;
    });

    if (unavailableItems && unavailableItems.length > 0) {
      alert("Some items in your cart are unavailable. Please remove them before proceeding to checkout.");
      return;
    }

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
    navigate(`/product-details/${productId}`);
  };

  // Get first image URL from product images array
  const getProductImage = (product) => {
    if (product.productImages && product.productImages.length > 0) {
      return product.productImages[0].imageUrl;
    }
    return "https://via.placeholder.com/300x200?text=No+Image";
  };

  // Get availability status for a product
  const getProductStatus = (productId) => {
    return cartAvailability[productId] || {
      isAvailable: false,
      maxQuantity: 0,
      status: 'unknown',
      currentStock: 0
    };
  };

  // Render availability badge
  const renderAvailabilityBadge = (productId) => {
    const status = getProductStatus(productId);
    
    if (!status.isAvailable) {
      return <span className="badge bg-danger">Out of Stock</span>;
    }
    
    if (status.currentStock <= 5) {
      return <span className="badge bg-warning">Low Stock ({status.currentStock} left)</span>;
    }
    
    return <span className="badge bg-success">In Stock</span>;
  };

  // Show skeleton loader while loading
  if (loading) {
    return <CartSkeletonLoader />;
  }



  const navigateToProductDetails = (productId) => { 
    navigate(`/product-details/${productId}`);
  };

  return (
    <>
      <Header />
      <SearchBar />
        {/* <Goback/> */}
      
      <div className="container cart-page my-5">
        <div className="row ">
          <h2 className="">Your Shopping Cart</h2>
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
              productItems.map((item) => {
                const availability = getProductStatus(item.productId);
                const isAvailable = availability.isAvailable;
                const currentQuantity = item.quantity || 1;
                const canIncrease = currentQuantity < availability.maxQuantity;

                return (
                  <div 
                    className={`cart-item d-flex align-items-center mb-4 p-3 shadow-sm rounded ${!isAvailable ? 'unavailable-item' : ''}`} 
                    key={item.productId}
                  >
                    <img 
                      src={getProductImage(item)} 
                      alt={item.productName}
                      onClick={() => navigateToProductDetails(item.productId)} 
                      className="cart-img rounded"
                      style={{ 
                        width: "120px", 
                        height: "120px", 
                        objectFit: "cover",
                        cursor: "pointer",
                        opacity: !isAvailable ? 0.5 : 1 
                      }}
                    />
                    
                    <div className="cart-details ms-3 flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <h5 className="mb-2">{<p className="mb-1 fw-semibold">
                                            {item.productName?.length > 25
                                                ? `${item.productName.slice(0, 30)}...`
                                                : item.productName}
                                        </p>}</h5>
                       <span style={{marginLeft:"10px"}}> {renderAvailabilityBadge(item.productId)}  </span> 
                      </div>
                      {/* <p className="text-mute mb-1">{item.categoryName}</p> */}
                      <p className="fw-bold text-primary mb-2">
                         <span className="item-major_price">Item price: </span>
                        {formatCurrency(item.productPrice)}
                        {/* N{parseFloat(item.productPrice).toFixed(2)} */}
                      </p>

                      {!isAvailable ? (
                        <div className="alert alert-warning py-2 mb-2">
                          <small>This product is no longer available</small>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center quantity-control">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => decreaseQty(item.productId)}
                            disabled={currentQuantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-3 fw-bold">{currentQuantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => increaseQty(item.productId)}
                            disabled={!canIncrease}
                            title={!canIncrease ? `Only ${availability.maxQuantity} available` : 'Increase quantity'}
                          >
                            +
                          </button>
                          {availability.maxQuantity > 0 && (
                            <small className="text-muted ms-3">
                              Max: {availability.maxQuantity}
                            </small>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="cart-subtotal text-end">
                      <p className={`fw-bold h5 ${!isAvailable ? 'text-muted' : 'text-primary'}`}>
                         <span className="item-major_price"> Item total: </span>
                         {formatCurrency(item.productPrice * currentQuantity)}
                        {/* N{((parseFloat(item.productPrice) * currentQuantity)).toFixed(2)} */}
                        {!isAvailable && <small className="d-block text-danger" style={{fontSize:"10px"}}>Unavailable</small>}
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
                );
              })
            )}
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="cart-summary p-4 shadow-sm rounded sticky-top">
              <h5 className="mb-3">Order Summary</h5>
              <hr />
              
              {/* Show warning if any items are unavailable */}
              {productItems?.some(item => !getProductStatus(item.productId).isAvailable) && (
                <div className="alert alert-warning mb-3">
                  <small>
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Some items in your cart are unavailable
                  </small>
                </div>
              )}
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({productItems?.length || 0} items)</span>
                <span className="fw-bold"> {formatCurrency(subtotal)} </span>
              </div>
              {/* <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="fw-bold">N{shipping.toFixed(2)}</span>
              </div> */}
              {subtotal > 0 && (
                <div className="d-flex justify-content-between mb-2 text-muted small">
                  <span>Estimated Delivery</span>
                  <span>2-3 business days</span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span className="text-primary">  {formatCurrency(total)}</span>
              </div>
              
              <button 
                className="btn btn-primary w-100 py-3 fw-bold"
                onClick={handleCheckout}
                disabled={!productItems || productItems.length === 0 || 
                  productItems.some(item => !getProductStatus(item.productId).isAvailable)}
                title={
                  productItems?.some(item => !getProductStatus(item.productId).isAvailable) 
                    ? "Remove unavailable items to checkout" 
                    : ""
                }
              >
                {productItems?.some(item => !getProductStatus(item.productId).isAvailable) 
                  ? 'Remove Unavailable Items' 
                  : productItems?.length > 0 ? 'Proceed to Checkout' : 'Cart is Empty'
                }
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
               <h4 className="relatedHEader">More Products</h4>
            <hr/>
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
                            {formatCurrency(product.productPrice)}
                            {/* N{parseFloat(product.productPrice).toFixed(2)} */}
                          </span>
                          {/* {product.discount && product.discount > 0 && (
                            <span className="float-end badge rounded-pill bg-danger">
                              {product.discount}% OFF
                            </span>
                          )} */}
                        </div>
                        
                        {/* <div className="titleText flex-grow-1">
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
                        </div> */}

                        <div className="product-meta mt-2">
                          <small className="text-muted d-block mb-1">
                            {product.categoryName}
                          </small>
                          {/* <span className={`badge ${
                            product.status === 'active' && product.productQuantity > 0 ? 'bg-success' : 
                            product.status === 'sold' || product.productQuantity === 0 ? 'bg-danger' : 'bg-warning'
                          }`}>
                            {product.status === 'active' && product.productQuantity > 0 ? 'In Stock' : 
                             product.productQuantity === 0 ? 'Out of Stock' : product.status}
                          </span> */}
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
                            className="btn btn-primary btn-sm"
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