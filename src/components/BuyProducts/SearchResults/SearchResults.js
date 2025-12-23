import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { chukkytechAxios } from "../../Utility/axios";
import Header from "../../layouts/Header";
import { useDispatch } from "react-redux";
import { addToCartProduct } from "../../redux/productCounter";
import SearchBar from "../../ProductComponents/searchField/searchfield";
import noproductimage from "../../images/notinfound.jpeg";
import { IoCartOutline } from "react-icons/io5";
import "./SearchResults.css"; // Create this CSS file for custom styles

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [showAdded, setShowAdded] = useState(false);
  const [productData, setProductData] = useState([]);
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  // Get query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";
  const category = queryParams.get("category") || "All";

  console.log("...2", searchTerm);
  console.log("...3", category);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await chukkytechAxios.get(
          `/product/search?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`
        );

        setProductData(response?.data);
        console.log("responseCheck", response);

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm || category !== "All") {
      fetchSearchResults();
    }
  }, [searchTerm, category]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleDataProduct = (product) => {
    setShowAdded(true);
    dispatch(addToCartProduct(product));
    setItem(product);

    setTimeout(() => {
      setShowAdded(false);
    }, 3000);
  };

  const navigateProductDetails = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};


  // Skeleton Loader Component
  const ProductSkeleton = () => (
    <div className="col hp">
      <div className="cardo shadow-sm p-2 product-card skeleton-card">
        {/* Image Skeleton */}
        <div className="skeleton-image"></div>

        <div className="card-body-skeleton">
          {/* Price Skeleton */}
          <div className="skeleton-price"></div>

          {/* Title Skeleton */}
          <div className="skeleton-title"></div>
          <div className="skeleton-title-short"></div>

          {/* Meta Info Skeleton */}
          <div className="skeleton-meta"></div>
        </div>

        {/* Button Skeleton */}
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  // Header Skeleton
  const HeaderSkeleton = () => (
    <div className="page-header mb-4 skeleton-header">
      <div className="skeleton-page-title"></div>
      <div className="skeleton-page-subtitle"></div>
    </div>
  );

  return (
    <>
      <Header />
      <SearchBar />

      {showAdded && (
        <div className="container mt-2 cart-alert">
          <div className="row">
            <div className="col-sm-6">
              <div className="alert fade alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
                <i className="start-icon far fa-check-circle faa-tada animated"></i>
              
                <span>
                  {" "}
                  <span style={{ fontWeight: "bold" }}> {item.productName?.slice(0,10)}... </span> added to cart{" "}
                </span>
                <span
                  className="closebtn"
                  onClick={() => setShowAdded(false)}
                  style={{ cursor: "pointer", fontWeight: "bold", color: "red", marginLeft: "30px" }}
                >
                  {" "}
                  X
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="centSoon">
        <div className="container-fluid bg-transparent my-4 p-3" style={{ position: "relative" }}>
          {/* Search Info Header */}
          {/* {!loading && (searchTerm || category !== "All") && (
            <div className="page-header mb-4">
              <h2 className="page-title">Search Results</h2>
              <p className="page-subtitle text-muted">
                {searchTerm && `Search: "${searchTerm}"`}
                {searchTerm && category !== "All" && " • "}
                {category !== "All" && `Category: ${category}`}
                {productData.length > 0 && ` • Found ${productData.length} product(s)`}
              </p>
            </div>
          )} */}

          {/* Skeleton Header when loading */}
          {loading && <HeaderSkeleton />}

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
            {loading ? (
              // Show skeleton loaders while loading
              Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
            ) : productData.length === 0 ? (
              <div className="col-12">
                <div className="comingSoon-Prono text-center py-5">
                  <img
                    src={noproductimage}
                    alt="No products available"
                    className="no-product-image mb-3"
                  />
                  <h3 className="no-product-Text">
                    {searchTerm || category !== "All"
                      ? "No products found matching your search criteria"
                      : "Products are not available for the moment, check back later"}
                  </h3>
                  {(searchTerm || category !== "All") && (
                    <p className="text-muted mt-2">
                      Try adjusting your search terms or browse different categories
                    </p>
                  )}
                </div>
              </div>
            ) : (
              productData.map((product) => (
                <div className="col hp" key={product.productId}>
                  <div className="cardo shadow-sm p-2 product-card">
                    <a
                      onClick={() => navigateProductDetails(product.productId)}
                      style={{ cursor: "pointer" }}
                      className="product-image-link"
                    >
                      {product.productImages && product.productImages.length > 0 ? (
                        <img
                          src={product.productImages[0].imageUrl}
                          className="card-img-top product-image"
                          alt={product.productName}
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
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
                        <span className="float-start badge  price-badge">
                          {formatCurrency(product.productPrice)}
                        </span>
                      </div>

                      <div className="titleText product-name">
                        <a
                          onClick={() => navigateProductDetails(product.productId)}
                          style={{ cursor: "pointer", textDecoration: "none" }}
                        >
                          {product?.productName?.slice(0, 25)}
                        </a>
                      </div>

                      <div className="product-meta mt-2">
                        {product.productQuantity <= 0 && product.status !== "sold" && (
                          <div className="mt-1">
                            <span className="badge bg-warning text-dark">Low Stock</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="d-grid gap-2 my-3 buttonAddCart">
                      {product.status === "sold" || product.productQuantity <= 0 ? (
                        <button
                          className="btn btn-secondary bold-btn "
                          disabled
                          style={{ fontSize: "15px", padding: "8px" }}
                        >
                          Out of Stock
                        </button>
                      ) : product.status === "suspended" ? (
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
                          <IoCartOutline color="white" /> Add to Cart
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
    </>
  );
};

export default SearchResults;