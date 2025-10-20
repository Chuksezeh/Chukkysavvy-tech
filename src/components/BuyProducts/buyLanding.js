import "./productBuy.css";
import commingImage from "../../components/images/coming-img-removebg-preview.png";
import { useEffect, useState } from "react";
import Header from "../layouts/Header";
import { useNavigate } from "react-router-dom";
import SearchBar from "../ProductComponents/searchField/searchfield";
import useGetData from "../Utility/getFunction";
import noproductimage from "../images/notinfound.jpeg"
import { chukkytechAxios } from "../Utility/axios";
import { addToCartProduct } from "../redux/productCounter";
import { useDispatch } from "react-redux";
import Footer from "../layouts/Footer";
import { IoCartOutline } from "react-icons/io5";

// Skeleton Loader Component
const ProductsGridSkeleton = () => {
  return (
    <>
      <Header />
      <SearchBar />
      
      <div className="centSoon">
        <div className="container-fluid bg-transparent my-4 p-3" style={{position:"relative"}}>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {/* Generate 8 skeleton cards */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="col hp" key={index}>
                <div className="cardo-skeleton shadow-sm p-2">
                  {/* Image Skeleton */}
                  <div className="skeleton-card-image skeleton"></div>
                  
                  <div className="card-bod-skeleton">
                    {/* Price Badge Skeleton */}
                    <div className="clearfix mb-3">
                      <div className="skeleton-price-badge skeleton"></div>
                      <div className="skeleton-discount-badge skeleton"></div>
                    </div>
                    
                    {/* Product Title Skeleton */}
                    <div className="skeleton-product-title skeleton"></div>
                    
                    {/* Product Description Skeleton */}
                    <div className="skeleton-product-desc">
                      <div className="skeleton-line skeleton"></div>
                      <div className="skeleton-line skeleton short"></div>
                    </div>
                    
                    {/* Stock Badge Skeleton */}
                    <div className="skeleton-stock-badge skeleton"></div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="d-grid gap-2 my-3">
                    <div className="skeleton-card-button skeleton"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

const BuyProducts = (() => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState("");
  const [showAdded, setShowAdded] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateProductCart = (() => {
    navigate("/product-cart")
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await chukkytechAxios.get("/product/getAllActiveProducts");
        setProductData(response.data);
        console.log("Products:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        console.error("Full error details:", error.response?.data);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function for status badge classes
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success';
      case 'sold':
        return 'bg-danger';
      case 'suspended':
        return 'bg-warning text-dark';
      case 'inactive':
        return 'bg-secondary';
      default:
        return 'bg-info';
    }
  };

  // Navigation function
  const navigateProductDetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const handleDataProduct = product => {
    setShowAdded(true);
    dispatch(addToCartProduct(product));
    setItem(product);
   
    setTimeout(() => {
      setShowAdded(false);
    }, 3000);
  };

  console.log("item added", item);

  // Show skeleton loader while loading
  if (loading) {
    return <ProductsGridSkeleton />;
  }

  return (
    <>
      <Header />
      <SearchBar />

      {showAdded && 
        <div className="container mt-2 cart-alert">
          <div className="row">
            <div className="col-sm-6">
              <div className="alert fade  alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
                <i className="start-icon far fa-check-circle faa-tada animated"></i>
                <strong className="font__weight-semibold" style={{ color: "white" }}> Well done! </strong>
                <span>  <span style={{fontWeight:"bold"}}> {item.productName}  </span>  added to cart </span> 
                <span className="closebtn" onClick={() => setShowAdded(false)} style={{ cursor: "pointer", fontWeight: "bold", color: "red", marginLeft: "30px"}}> X</span>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="centSoon">
        <div className="container-fluid bg-transparent my-4 p-3" style={{position:"relative"}}>
          
          {/* Page Header */}
          {/* <div className="page-header mb-4">
            
            <p className="page-subtitle">Discover amazing deals on quality products</p>
          </div> */}

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {productData.length === 0 && !loading ? (
              <div className="col-12">
                <div className="comingSoon-Prono text-center py-5">
                  <img 
                    src={noproductimage} 
                    alt="No products available" 
                    className="no-product-image mb-3"
                  />
                  <h3 className="no-product-Text">Products are not available for the moment, check back later</h3>
                </div>
              </div>
            ) : (
              productData.map((product) => (
                <div className="col hp" key={product.productId}>
                  <div className="cardo shadow-sm p-2 product-card">
                    <a 
                      onClick={() => navigateProductDetails(product.productId)} 
                      style={{ cursor: 'pointer' }}
                      className="product-image-link"
                    >
                      {product.productImages && product.productImages.length > 0 ? (
                        <img 
                          src={product.productImages[0].imageUrl} 
                          className="card-img-top product-image" 
                          alt={product.productName}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                          }}
                        />
                      ) : (
                        <img 
                          src="https://via.placeholder.com/300x200?text=No+Image" 
                          className="card-img-top product-image" 
                          alt="No product image"
                        />
                      )}
                    </a>

                    <div className="">
                      <div className="clearfix ">
                        <span className="float-start badge rounded-pill bg-success price-badge">
                          ₦{parseFloat(product.productPrice).toFixed(2)}
                        </span>
                      </div>

                      <div className="titleText product-name">
                        <a 
                          onClick={() => navigateProductDetails(product.productId)} 
                          style={{ cursor: 'pointer', textDecoration: 'none' }}
                        >
                          {product?.productName?.slice(0,25)} 
                        </a>
                      </div>
                      
                      {/* <div 
                        className="titleText product-description"   
                        dangerouslySetInnerHTML={{ __html: product.shortDiscription }}
                      /> */}
                      
                      {/* Product Details */}
                      <div className="product-meta mt-2">
                        {/* Quantity Info */}
                        {product.productQuantity <= 0 && product.status !== 'sold' && (
                          <div className="mt-1">
                            <span className="badge bg-warning text-dark">
                              Low Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-grid gap-2 my-3 buttonAddCart">
                      {/* Conditional Button Rendering */}
                      {product.status === 'sold' || product.productQuantity <= 0 ? (
                        <button 
                          className="btn btn-secondary bold-btn " 
                          disabled
                          style={{ fontSize: "15px", padding: "8px" }}
                        >
                          Out of Stock
                        </button>
                      ) : product.status === 'suspended' ? (
                        <button 
                          className="btn btn-warning bold-btn " 
                          disabled
                          style={{ fontSize: "15px", padding: "8px" }}
                        >
                          Temporarily Unavailable
                        </button>
                      ) : (
                        <button 
                          className="btn btn-warning bold-btn  add-to-cart-btn" 
                          style={{ color: "white", fontSize: "15px", padding: "8px" }} 
                          onClick={() => handleDataProduct(product)}
                        >
                        <IoCartOutline color="white"/>  Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
});

export default BuyProducts;