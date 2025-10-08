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

  useEffect(() => {
    fetchProductDetail();
    fetchRelatedProducts();
  }, [productId]);

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
      
      setError(null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await chukkytechAxios.get('/product/getAllProducts');
      // Filter to show products from same category (optional)
      const related = response.data.filter(p => p.productId !== productId).slice(0, 4);
      setRelatedProducts(related);
    } catch (err) {
      console.error('Error fetching related products:', err);
    }
  };

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
      const shipping = subtotal > 0 ? 15 : 0;
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

  if (loading) {
    return (
      <>
        <Header />
        <SearchBar />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading product details...</p>
        </div>
        <Footer />
      </>
    );
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
                <strong className="font__weight-semibold" style={{ color: "white" }}> Well done! </strong>
                <span>  <span style={{fontWeight:"bold"}}> {product.productName}  </span>  added to cart </span> 
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
                  onClick={() => setMainImage(img.imageUrl)}
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
            <p className="text-muted">Brand: {product.companyName}</p>

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
            <div className="rating mb-3">
              ⭐⭐⭐⭐☆ <span className="text-muted">(120 reviews)</span>
            </div>

            {/* Price */}
            <div className="price-section mb-3">
              <h3 className="product-price text-primary">
                N{parseFloat(product.productPrice).toFixed(2)}
              </h3>
              {product.discount && product.discount > 0 && (
                <div className="discount-info">
                  <span className="text-muted text-decoration-line-through me-2">
                    N{parseFloat(product.purchasePrice).toFixed(2)}
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

            {/* Short Description */}
            {product.shortDiscription && (
              <div 
                className="product-desc mb-4"
                dangerouslySetInnerHTML={{ __html: product.shortDiscription }}
              />
            )}

            {/* Buttons */}
            <div className="d-flex gap-3 mt-4 flex-wrap">
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
                    className="btn btn-primary btn-lg" 
                    style={{borderRadius:"10px"}}
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>

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
        </div>
      </div>

      {/* Related Products Section */}
      <section> 
        <div className="centSoon">
          <div className="container-fluid bg-transparent my-4 p-3" style={{position:"relative"}}>
            <h2>You may also like</h2>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
              {relatedProducts.map((relatedProduct) => (
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
                          N{parseFloat(relatedProduct.productPrice).toFixed(2)}
                        </span>
                        {relatedProduct.discount && relatedProduct.discount > 0 && (
                          <span className="float-end badge rounded-pill bg-danger">
                            {relatedProduct.discount}% OFF
                          </span>
                        )}
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

      <Footer />
    </>
  );
};

export default ProductDetailPage;