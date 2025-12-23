import "./productDetail.css";
import img1 from "../../images/laptop.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useEffect, useState } from "react";
import SearchBar from "../../ProductComponents/searchField/searchfield";
import { chukkytechAxios } from "../../Utility/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartProduct } from "../../redux/productCounter";

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useGetData from "../../Utility/getFunction";
import moment from "moment";

// Skeleton Loader Components
const ProductDetailSkeleton = () => {
  return (
    <>
      <Header />
      <SearchBar />
      
      <div className="container product-details py-5">
        <div className="row pt-5">
          {/* Image Gallery Skeleton */}
          <div className="col-md-6 text-center">
            <div className="main-image-skeleton skeleton">
              <div className="skeleton-image"></div>
            </div>
            <div className="thumbs-skeleton d-flex justify-content-center mt-3 flex-wrap">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="thumb-skeleton skeleton"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="col-md-6 product-info-skeleton">
            <div className="skeleton-title skeleton"></div>
            <div className="skeleton-text skeleton"></div>
            <div className="skeleton-text skeleton"></div>
            
            <div className="skeleton-badge skeleton"></div>
            
            <div className="skeleton-rating skeleton"></div>
            
            <div className="skeleton-price skeleton"></div>
            
            <div className="skeleton-quantity skeleton"></div>
            <div className="skeleton-type skeleton"></div>
            
            <div className="skeleton-desc">
              <div className="skeleton-line skeleton"></div>
              <div className="skeleton-line skeleton"></div>
              <div className="skeleton-line skeleton"></div>
              <div className="skeleton-line skeleton short"></div>
            </div>
            
            <div className="skeleton-buttons d-flex gap-3 mt-4 flex-wrap">
              <div className="skeleton-button skeleton"></div>
              <div className="skeleton-button skeleton"></div>
            </div>
            
            <div className="skeleton-full-desc mt-4">
              <div className="skeleton-heading skeleton"></div>
              <div className="skeleton-line skeleton"></div>
              <div className="skeleton-line skeleton"></div>
              <div className="skeleton-line skeleton"></div>
              <div className="skeleton-line skeleton short"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <section>
        <div className="centSoon">
          <div className="container-fluid bg-transparent my-4 p-3" style={{position:"relative"}}>
            <div className="skeleton-section-title skeleton"></div>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
              {[1, 2, 3, 4].map((item) => (
                <div className="col hp" key={item}>
                  <div className="cardo-skeleton shadow-sm p-2">
                    <div className="skeleton-card-image skeleton"></div>
                    <div className="card-bod-skeleton">
                      <div className="clearfix mb-3">
                        <div className="skeleton-price-badge skeleton"></div>
                        <div className="skeleton-discount-badge skeleton"></div>
                      </div>
                      <div className="skeleton-product-title skeleton"></div>
                    </div>
                    <div className="d-grid gap-2 my-3">
                      <div className="skeleton-card-button skeleton"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [showAdded, setShowAdded] = useState(false);
  const [item, setItem] = useState("");

  const [allProducts, setAllProducts] = useState("");

  useEffect(() => {
    fetchProductDetail();
    fetchRelatedProducts();
   
  }, [productId]);


  useEffect(()=>{
     window.scrollTo(0, 0);
    },[])



  const [showReview, setShowReview] = useState(false);

  const handleCloseReview = () => setShowReview(false);
  const handleShowReview = () => setShowReview(true);


     // Format currency
   const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};


  const dispatch = useDispatch();

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await chukkytechAxios.get(`/product/getProductById/${productId}`);
      const productData = response.data;
      setProduct(productData);
      
      // Set main image
      if (productData.productImages && productData.productImages.length > 0) {
        setMainImage(productData.productImages[0].imageUrl);
      }
      // await fetchRelatedProducts();
      
      setError(null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const {data: productReviewData, isPending: isPendingReview, error: errorReview} = useGetData(`/review/getProductReviews/${productId}` )
  

   console.log("...productReviewData", productReviewData)

  const fetchRelatedProducts = async () => {
    try {
      const response = await chukkytechAxios.get('/product/getAllProducts');
           setAllProducts(response.data)

      // Filter to show products from same category (optional)
    
    console.log("...product", allProducts)
    } catch (err) {
      console.error('Error fetching related products:', err);
    }
  };


  const related = allProducts && allProducts.filter(p => {
  // Exclude current product
  if (p.productId === productId) return false;
  
  // Check if product is active and in stock
  if (p.status !== 'active' || p.productQuantity <= 0) return false;
  
  // Multiple matching criteria
  const sameCategory = p.categoryId === product?.categoryId;
  const sameCategoryName = p.categoryName === product?.categoryName;
  const sameCompany = p.companyName === product?.companyName;
  const similarPrice = 
    Math.abs(parseFloat(p.productPrice) - parseFloat(product?.productPrice)) < 
    (parseFloat(product?.productPrice) * 0.5); // Within 50% price range
  
  // Return products that match at least one criteria
  return sameCategory || sameCategoryName || sameCompany || similarPrice;
}).slice(0, 8);





  const allImages = product?.productImages || [];
  const mainImageUrl = mainImage || (allImages.length > 0 ? allImages[0].imageUrl : img1);

  const handleAddToCart = () => {
    if (product) {
      // Add your cart logic here
      console.log('Adding to cart:', product);
      alert(`${product.productName} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Create a single item array for the checkout page
      const singleItem = {
        ...product,
        quantity: 1 // Default quantity for buy now
      };
      
      const subtotal = parseFloat(product.productPrice);
      const shipping = subtotal > 0 ? 0 : 0;
      const total = subtotal + shipping;
      
      navigate("/checkout-payment", { 
        state: { 
          cartItems: [singleItem], // Pass as array for consistency
          subtotal: subtotal,
          shipping: shipping,
          total: total,
          source: 'buy-now' // Identify this as a buy-now flow
        } 
      });
    }
  };

  const handleDataProduct = product => {
    setShowAdded(true);
    dispatch(addToCartProduct(product));
    setItem(product);
     
    setTimeout(() => {
      setShowAdded(false);
    }, 3000);
  };

  const navigateToProduct = (id) => {
    navigate(`/product-details/${id}`);
    window.scrollTo(0, 0);
  };

  const handleChangeImage = (image) => {
    setMainImage(image);
    window.scrollTo(0, 0);
  };

  // Show skeleton loader while loading
  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <SearchBar />
        <div className="container py-5 text-center">
          <div className="alert alert-danger">
            <h4>Error</h4>
            <p>{error || 'Product not found'}</p>
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }





  const reviews = [
  {
    customerName: "John Doe",
    rating: 4,
    message: "Product works perfectly. Delivery was fast!",
    date: "2025-01-22",
  },
  {
    customerName: "Sarah Adams",
    rating: 5,
    message: "Amazing quality. I will definitely buy again.",
    date: "2025-01-20",
  },
  {
    customerName: "Michael Brown",
    rating: 3,
    message: "Good but could be improved in packaging.",
    date: "2025-01-18",
  },
];


  return (
    <>
      <Header />
      <SearchBar />

      {showAdded && 
        <div className="container mt-2 cart-alert">
          <div className="row">
            <div className="col-sm-6">
              <div className="alert fade alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
                <i className="start-icon far fa-check-circle faa-tada animated"></i>
                
                <span>  <span style={{fontWeight:"bold"}}> {product.productName?.slice(0,10)}...  </span>  added to cart </span> 
                <span className="closebtn" onClick={() => setShowAdded(false)} style={{ cursor: "pointer", fontWeight: "bold", color: "red", marginLeft: "30px"}}> X</span>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="container product-details py-5">
        <div className="row pt-5">
          {/* Left side - Images */}
          <div className="col-md-6 text-center">
            <div className="main-image">
              <img 
                src={mainImageUrl} 
                alt={product.productName} 
                className="img-fluid rounded shadow" 
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>
            <div className="thumbs d-flex justify-content-center mt-3 flex-wrap">
              {allImages.map((img, i) => (
                <img
                  key={i}
                  src={img.imageUrl}
                  alt={`${product.productName} - view ${i + 1}`}
                  className={`thumb-img ${mainImage === img.imageUrl ? "active" : ""}`}
                  onClick={() => handleChangeImage(img.imageUrl)}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    cursor: "pointer",
                    margin: "5px",
                    border: mainImage === img.imageUrl ? "3px solid #007bff" : "1px solid #ddd",
                    borderRadius: "8px"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right side - Details */}
          <div className="col-md-6 product-info">
            <h2 className="product-title">{product.productName}</h2>
            <p className="text-muted">Category: {product.categoryName}</p>
            <p className="text-muted"> {product.companyName}</p>

            {/* Status Badge */}
            <div className="mb-3">
              <span className={`badge ${
                product.status === 'active' ? 'bg-success' : 
                product.status === 'sold' ? 'bg-danger' : 
                product.status === 'suspended' ? 'bg-warning' : 'bg-secondary'
              }`}>
                {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                {product.status === 'sold' && ' - Out of Stock'}
              </span>
            </div>
            

            {/* Ratings */}
            <div className="rating mb-3" style={{fontSize: "18px", color: "#ffc107", cursor: "pointer"}} onClick={handleShowReview}>
              See customer reviews &nbsp;
             
               
              <span className="text-muted">({productReviewData?.count} reviews)</span>
            </div>

            {/* Price */}
            <div className="price-section mb-3">
              <h3 className="product-price text-primary">
                {formatCurrency(product.productPrice) }
                {/* ₦{parseFloat(product.productPrice).toFixed(2)} */}
              </h3>
              {product.discount && product.discount > 0 && (
                <div className="discount-info">
                  <span className="text-muted text-decoration-line-through me-2">
                    {formatCurrency(product.purchasePrice)  }
                    {/* N{parseFloat(product.purchasePrice).toFixed(2)} */}
                  </span>
                  <span className="badge bg-danger">
                    Save {product.discount}%
                  </span>
                </div>
              )}
            </div>

             

            {/* Quantity Info */}
            <div className="quantity-info mb-3">
              <strong>Available Quantity: </strong>
              <span className={product.productQuantity <= 0 ? "text-danger fw-bold" : "text-success fw-bold"}>
                {product.productQuantity} units
              </span>
            </div>

            {/* Product Type */}
            <div className="product-type mb-3">
              <strong>Product Type: </strong>
              <span className="text-muted">{product.productType}</span>
            </div>


           <div className="d-flex gap-3 mt-4 flex-wrap button-group-detail">
              {(product.status === 'sold' || product.productQuantity <= 0) ? (
                <button className="btn btn-secondary btn-lg" disabled>
                  Out of Stock
                </button>
              ) : product.status === 'suspended' ? (
                <button className="btn btn-warning btn-lg" disabled>
                  Temporarily Unavailable
                </button>
              ) : (
                <>
                  <button 
                    className="btn btn-warning btn-lg" 
                    onClick={() => handleDataProduct(product)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="btn btn-primary btn-lg but-buyNow" 
                    style={{borderRadius:"10px"}}
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>


         
          </div>
        </div>
         <br/>
          <h4>Product Details</h4>
        <hr/>
      


           {/* Short Description */}
            {product.shortDiscription && (
              <div 
                className="product-desc mb-4"
                dangerouslySetInnerHTML={{ __html: product.shortDiscription }}
              />
            )}

            {/* Buttons */}
           

            {/* Full Description */}
            {product.fullDiscription && (
              <div className="mt-4">
                <h5>Product Details</h5>
                <div 
                  className="full-description"
                  dangerouslySetInnerHTML={{ __html: product.fullDiscription }}
                />
              </div>
            )}
      </div>

      {/* Related Products Section */}
      <section> 
        <div className="centSoon">
          <div className="container-fluid bg-transparent my-4 p-3" style={{position:"relative"}}>
            <h4 className="relatedHEader">You may also like</h4>
            <hr/>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
              {related && related.map((relatedProduct) => (
                <div className="col hp" key={relatedProduct.productId}>
                  <div className="cardo shadow-sm p-2">
                    <a onClick={() => navigateToProduct(relatedProduct.productId)} style={{cursor: 'pointer'}}>
                      <img 
                        src={
                          relatedProduct.productImages && relatedProduct.productImages.length > 0 
                            ? relatedProduct.productImages[0].imageUrl 
                            : "https://via.placeholder.com/300x200?text=No+Image"
                        } 
                        className="card-img-top" 
                        alt={relatedProduct.productName}
                        style={{height: "200px", objectFit: "cover"}}
                      />
                    </a>

                    <div className="card-bod">
                      <div className="clearfix mb-3">
                        <span className="float-start badge rounded-pill bg-success">
                          {formatCurrency(relatedProduct.productPrice)  }
                          {/* ₦{parseFloat(relatedProduct.productPrice).toFixed(2)} */}
                        </span>
                        {/* {relatedProduct.discount && relatedProduct.discount > 0 && (
                          <span className="float-end badge rounded-pill bg-danger">
                            {relatedProduct.discount}% OFF
                          </span>
                        )} */}
                      </div>
                      <div className="titleText">
                        <a onClick={() => navigateToProduct(relatedProduct.productId)} style={{cursor: 'pointer', textDecoration: 'none'}}>
                          {relatedProduct.productName}
                        </a>
                      </div>
                    </div>
                    <div className="d-grid gap-2 my-3 buttonAddCart">
                      {(relatedProduct.status === 'sold' || relatedProduct.productQuantity <= 0) ? (
                        <button className="btn btn-secondary btn-sm" disabled>
                          Out of Stock
                        </button>
                      ) : relatedProduct.status === 'suspended' ? (
                        <button className="btn btn-warning btn-sm" disabled>
                          Unavailable
                        </button>
                      ) : (
                        <button 
                          className="btn btn-warning bold-btn p-2" 
                          style={{color:"white", fontSize:"15px", padding:"5px"}}
                          onClick={() => navigateToProduct(relatedProduct.productId)}
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


    

        <Offcanvas show={showReview} onHide={handleCloseReview} 
        // backdrop="static"  
        placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Customer Feedback</Offcanvas.Title>
        </Offcanvas.Header>
       <Offcanvas.Body>

  <h5 className="mb-3">What customers are saying</h5>

  <div className="reviews-container">

    {productReviewData?.reviews && productReviewData?.reviews?.length > 0 ? (
      productReviewData?.reviews.map((review, index) => (
        <div 
          key={index} 
          className="review-card shadow-sm p-3 mb-3 rounded"
          style={{ background: "#f8f9fa" }}
        >
          {/* Customer name and date */}
          <div className="d-flex justify-content-between mb-2">
            <strong>{review.customerName}</strong>
            <small className="text-muted"> {moment(review.createdDateTime).format("lll")} </small>
          </div>
            
          {/* Rating stars */}
          <div className="mb-2">
            {Array.from({ length: review.rating }, (_, i) => (
              <span key={i} style={{ color: "#ffc107", fontSize: "18px" }}>
                ★
              </span>
              ))}
             {Array.from({ length: 5 - review.rating }, (_, i) => (
              <span key={i} style={{ color: "#e4e5e9", fontSize: "18px" }}>
                ★
              </span>
            ))}
            </div>

          {/* Feedback text */}
          <p className="mb-1" style={{ fontSize: "14px", lineHeight: "1.5" }}>
            {review.message}
          </p>
        </div>
      ))
    ) : (
      <p className="text-muted">No customer feedback available yet.</p>
    )}

  </div>
</Offcanvas.Body>

        </Offcanvas>



      <Footer />
    </>
  );
};

export default ProductDetailPage;