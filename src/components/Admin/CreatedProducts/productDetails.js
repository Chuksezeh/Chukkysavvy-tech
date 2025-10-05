import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chukkytechAxios } from '../../Utility/axios';
import './productDetails.css';
import AdminDashboard from '../adminDashboard';
import { MdBabyChangingStation } from 'react-icons/md';
import { AiOutlineClose } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from 'react-hook-form';
import "./EditProductModal.css";
import { Alert } from 'react-bootstrap';


const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [showEditModal, setShowEditModal]= useState(false)
   const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await chukkytechAxios.get(`/product/getProductById/${productId}`);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };



//   const [loading, setLoading] = useState(false);
  

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch companies and categories
  useEffect(() => {
    if (showEditModal) {
      fetchCompanies();
      fetchCategories();
    }
  }, [showEditModal]);

  // Populate form when product data changes
  useEffect(() => {
    if (product && showEditModal) {
      populateForm();
      setExistingImages(product.productImages || []);
    }
  }, [product, showEditModal]);

  const fetchCompanies = async () => {
    try {
      const response = await chukkytechAxios.get("/company/getAllCompanies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await chukkytechAxios.get("category/getAllCategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const populateForm = () => {
    if (product) {
      setValue("productName", product.productName);
      setValue("productPrice", product.productPrice);
      setValue("purchasePrice", product.purchasePrice);
      setValue("productQuantity", product.productQuantity);
      setValue("discount", product.discount || "");
      setValue("productType", product.productType);
      setValue("companyId", product.companyId);
      setValue("categoryId", product.categoryId);
      setValue("shortDiscription", product.shortDiscription || "");
      setValue("fullDiscription", product.fullDiscription || "");
      setValue("status", product.status);
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;

    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      isNew: true
    }));

    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removePreview = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (imageIndex) => {
    const imageToRemove = existingImages[imageIndex];
    
    try {
      // Delete from Cloudinary and database
      await chukkytechAxios.delete(`/product/deleteImage/${imageToRemove.productImageId}`);
      
      // Remove from local state
      setExistingImages(prev => prev.filter((_, i) => i !== imageIndex));
      
      alert("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
  };

  const handleSubmitEdit = async (formData) => {
    setLoading(true);
    setSuccessMessage(false);
    setErrorMessage(false);

    try {
      const formDataToSend = new FormData();
      
      // Append basic product data
      formDataToSend.append("productId", product.productId);
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productPrice", formData.productPrice);
      formDataToSend.append("purchasePrice", formData.purchasePrice);
      formDataToSend.append("productQuantity", formData.productQuantity);
      formDataToSend.append("discount", formData.discount || "");
      formDataToSend.append("productType", formData.productType);
      formDataToSend.append("companyId", formData.companyId);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("shortDiscription", formData.shortDiscription || "");
      formDataToSend.append("fullDiscription", formData.fullDiscription || "");
      formDataToSend.append("status", formData.status);

      // Append new images
      previews.forEach((preview) => {
        if (preview.isNew) {
          formDataToSend.append("newImages", preview.file);
        }
      });

      const response = await chukkytechAxios.put(
        "/product/updateProduct",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setLoading(false);
      setSuccessMessage(true);
      
      // Callback to refresh parent component
    //   if (onProductUpdated) {
    //     onProductUpdated();
    //   }
      
      // Close modal after success
      setTimeout(() => {
        // onHide();
        reset();
        setPreviews([]);
      }, 2000);

    } catch (error) {
      console.error("Error updating product:", error);
      setLoading(false);
      setErrorMessage(true);
      setErrMessage(error.response?.data?.error || "Failed to update product");
    }
  };

//   const handleClose = () => {
//     reset();
//     setPreviews([]);
//     setSuccessMessage(false);
//     setErrorMessage(false);
//     onHide();
//   };

  const [loadingStatus, setLoadingStatus] = useState(null);

  const handleStatusChange = async (productId, newStatus) => {
    // Confirmation dialog
    const confirmMessage = newStatus === 'suspended' 
      ? 'Are you sure you want to suspend this product?'
      : 'Are you sure you want to mark this product as sold?';
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setLoadingStatus(productId);

    try {
      const response = await chukkytechAxios.patch(`/product/updateStatus/${productId}`, {
        status: newStatus
      });

      if (response.data.success) {
        alert(`Product status updated to ${newStatus} successfully!`);
        
        // Callback to refresh parent component
        // if (onStatusUpdate) {
        //   onStatusUpdate(productId, newStatus);
        // }
      }
    } catch (error) {
      console.error(`Error updating product status to ${newStatus}:`, error);
      alert(error.response?.data?.error || `Failed to update product status`);
    } finally {
      setLoadingStatus(null);
    }
  };

  // Don't show buttons if product is already suspended or sold
  if (product?.status === 'suspended' || product?.status === 'sold') {
    return (
      <div className="action-buttons">
        <span className={`status-badge status-${product?.status}`}>
          {product?.status.charAt(0).toUpperCase() + product?.status.slice(1)}
        </span>
        
        {/* Option to reactivate suspended product */}
        {product?.status === 'suspended' && 
          <button 
            className="btn btn-info btn-sm"
            onClick={() => handleStatusChange(product?.productId, 'active')}
            disabled={loadingStatus === product?.productId}
          >
            {loadingStatus === product?.productId ? 'Reactivating...' : 'Reactivate'}
          </button>
        }
      </div>
    );
  }




 

  const handleEdit = () => {
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading-container">
          <div>Loading product details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <h3>Error</h3>
          <p>{error}</p>
          <button className="btn btn-back" onClick={() => navigate('/products')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error-container">
          <h3>Product Not Found</h3>
          <p>The product you're looking for doesn't exist.</p>
          <button className="btn btn-back" onClick={() => navigate('/products')}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
<>
     <AdminDashboard />
      <div className="header-bar">

                <ul className="action-bar">

                    <li>Home / Products / View Products  /<span className="addash"> Product Details </span></li>
                </ul>
            </div>

    <div className="product-detail-container">
      {/* Header */}
      <div className="product-detail-header">
        <h1>Product Details</h1>
        <button className="back-button" onClick={() => navigate('/view-created-products')}>
          ← Back to Products
        </button>
      </div>

      {/* Main Content */}
      <div className="product-detail-conten">
        {/* Left Column - Product Information */}
        <div className="product-info-section">
          {/* Basic Info */}
          <div className="product-basic-info">
            <h2>{product.productName}</h2>
            <span className="product-category">{product.categoryName}</span>
          </div>

          {/* Pricing */}
          <div className="pricing-section">
            <div className="price-row">
              <span className="price-label">Selling Price:</span>
              <span className="price-value product-price">
                N{parseFloat(product.productPrice).toFixed(2)}
              </span>
            </div>
            <div className="price-row">
              <span className="price-label">Purchase Price:</span>
              <span className="price-value purchase-price">
                N{parseFloat(product.purchasePrice).toFixed(2)}
              </span>
            </div>
            {product.discount && (
              <div className="price-row">
                <span className="price-label">Discount:</span>
                <span className="discount-badge">{product.discount}% OFF</span>
              </div>
            )}
          </div>

          {/* Details Grid */}
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Quantity</span>
              <span className="detail-value">{product.productQuantity} units</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Product Type</span>
              <span className="detail-value">{product.productType}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Company</span>
              <span className="detail-value">{product.companyName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className={`status-badge status-${product.status === 'active' ? 'active' : 'inactive'}`}>
                {product.status}
              </span>
            </div>
          </div>

          {/* Descriptions */}
          {product.shortDiscription && (
            <div className="description-section">
              <h3>Short Description</h3>
              <div 
                className="description-content"
                dangerouslySetInnerHTML={{ __html: product.shortDiscription }}
              />
            </div>
          )}

          {product.fullDiscription && (
            <div className="description-section">
              <h3>Full Description</h3>
              <div 
                className="description-content"
                dangerouslySetInnerHTML={{ __html: product.fullDiscription }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn btn-edit" onClick={handleEdit}>
              ✏️ Edit Product
            </button>
            <button 
        className="btn btn-warning" 
        onClick={() => handleStatusChange(product.productId, 'suspended')}
        disabled={loadingStatus === product.productId}
        title="Temporarily suspend this product"
      >
        <MdBabyChangingStation /> 
        {loadingStatus === product.productId ? 'Updating...' : 'Suspend Product'}
      </button>
      
      <button 
        className="btn btn-success" 
        onClick={() => handleStatusChange(product.productId, 'sold')}
        disabled={loadingStatus === product.productId}
        title="Mark this product as sold"
      >
        <AiOutlineClose /> 
        {loadingStatus === product.productId ? 'Updating...' : 'Mark as Sold'}
      </button>
          </div>
        </div>
      </div>

      {/* Product Images Section */}
      <div className="product-images-section">
        <h3>Product Images ({product.productImages?.length || 0})</h3>
        {product.productImages && product.productImages.length > 0 ? (
          <div className="images-grid">
            {product.productImages.map((image, index) => (
              <div key={image.productImageId || index} className="image-item">
                <img 
                  src={image.imageUrl} 
                  alt={image.imageName || `Product image ${index + 1}`}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-image.jpg';
                  }}
                />
                <div className="image-name">
                  {image.imageName || `Image ${index + 1}`}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-images">
            <p>No images available for this product</p>
          </div>
        )}
      </div>
    </div>



{/*     
                   <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> */}
     <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      
      <form onSubmit={handleSubmit(handleSubmitEdit)}>
        <Modal.Body>
          {/* Success & Error Messages */}
          {successMessage && (
            <Alert variant="success" className="mb-3">
              <strong>Success!</strong> Product updated successfully.
            </Alert>
          )}
          
          {errorMessage && (
            <Alert variant="danger" className="mb-3">
              <strong>Error!</strong> {errMessage}
            </Alert>
          )}

          <div className="row">
            {/* Product Name */}
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("productName", { 
                    required: "Product name is required" 
                  })}
                />
                {errors.productName && (
                  <span className="text-danger small">{errors.productName.message}</span>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="col-md-6">
              <div className="form-group">
                <label>Category *</label>
                <select
                  className="form-control"
                  {...register("categoryId", { 
                    required: "Category is required" 
                  })}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <span className="text-danger small">{errors.categoryId.message}</span>
                )}
              </div>
            </div>

            {/* Product Price */}
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Price *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("productPrice", { 
                    required: "Product price is required",
                    min: { value: 0, message: "Price must be positive" }
                  })}
                />
                {errors.productPrice && (
                  <span className="text-danger small">{errors.productPrice.message}</span>
                )}
              </div>
            </div>

            {/* Purchase Price */}
            <div className="col-md-6">
              <div className="form-group">
                <label>Purchase Price *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("purchasePrice", { 
                    required: "Purchase price is required",
                    min: { value: 0, message: "Price must be positive" }
                  })}
                />
                {errors.purchasePrice && (
                  <span className="text-danger small">{errors.purchasePrice.message}</span>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Quantity *</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("productQuantity", { 
                    required: "Quantity is required",
                    min: { value: 0, message: "Quantity must be positive" }
                  })}
                />
                {errors.productQuantity && (
                  <span className="text-danger small">{errors.productQuantity.message}</span>
                )}
              </div>
            </div>

            {/* Discount */}
            <div className="col-md-6">
              <div className="form-group">
                <label>Discount (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  {...register("discount", {
                    min: { value: 0, message: "Discount cannot be negative" },
                    max: { value: 100, message: "Discount cannot exceed 100%" }
                  })}
                />
                {errors.discount && (
                  <span className="text-danger small">{errors.discount.message}</span>
                )}
              </div>
            </div>

            {/* Product Type */}
            <div className="col-md-6">
              <div className="form-group">
                <label>Product Type *</label>
                <select
                  className="form-control"
                  {...register("productType", { 
                    required: "Product type is required" 
                  })}
                >
                  <option value="">Select Type</option>
                  <option value="Brand new">Brand new</option>
                  <option value="Second hand">Second hand</option>
                  <option value="Refurbished">Refurbished</option>
                  <option value="Non-tested">Non-tested</option>
                </select>
                {errors.productType && (
                  <span className="text-danger small">{errors.productType.message}</span>
                )}
              </div>
            </div>

            {/* Company */}
            <div className="col-md-6">
              <div className="form-group">
                <label>Company *</label>
                <select
                  className="form-control"
                  {...register("companyId", { 
                    required: "Company is required" 
                  })}
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.companyId} value={company.companyId}>
                      {company.companyName}
                    </option>
                  ))}
                </select>
                {errors.companyId && (
                  <span className="text-danger small">{errors.companyId.message}</span>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="col-md-6">
              <div className="form-group">
                <label>Status *</label>
                <select
                  className="form-control"
                  {...register("status", { 
                    required: "Status is required" 
                  })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && (
                  <span className="text-danger small">{errors.status.message}</span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <div className="col-md-12">
              <div className="form-group">
                <label>Short Description</label>
                <Controller
                  name="shortDiscription"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write short product description..."
                      style={{ height: "120px", marginBottom: "50px" }}
                    />
                  )}
                />
              </div>
            </div>

            {/* Full Description */}
            <div className="col-md-12">
              <div className="form-group">
                <label>Full Description</label>
                <Controller
                  name="fullDiscription"
                  control={control}
                  render={({ field }) => (
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write full product description..."
                      style={{ height: "200px", marginBottom: "50px" }}
                    />
                  )}
                />
              </div>
            </div>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="col-md-12">
                <div className="form-group">
                  <label>Existing Images</label>
                  <div className="existing-images-grid">
                    {existingImages.map((image, index) => (
                      <div key={image.productImageId} className="image-item-existing">
                        <img
                          src={image.imageUrl}
                          alt={image.imageName}
                          className="existing-image"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="btn-remove-image"
                          title="Delete image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div className="col-md-12">
              <div className="form-group">
                <label>Add New Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileSelect}
                />
                <small className="text-muted">
                  You can select multiple images to add to the product
                </small>
              </div>
            </div>

            {/* New Images Preview */}
            {previews.length > 0 && (
              <div className="col-md-12">
                <div className="form-group">
                  <label>New Images Preview ({previews.length})</label>
                  <div className="preview-images-grid">
                    {previews.map((preview, index) => (
                      <div key={index} className="image-item-preview">
                        <img
                          src={preview.url}
                          alt="Preview"
                          className="preview-image"
                        />
                        <button
                          type="button"
                          onClick={() => removePreview(index)}
                          className="btn-remove-preview"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onHide={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
    
                       
    
    
                 
    
    </>
  );
};

export default ProductDetail;