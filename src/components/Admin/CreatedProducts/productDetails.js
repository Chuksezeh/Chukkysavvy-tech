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
  const [showEditModal, setShowEditModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(null);

  // Modal states
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showImageSuccessModal, setShowImageSuccessModal] = useState(false);
  const [showImageErrorModal, setShowImageErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [pendingAction, setPendingAction] = useState({ type: '', status: '' });

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

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
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
      await chukkytechAxios.delete(`/product/deleteImage/${imageToRemove.productImageId}`);
      setExistingImages(prev => prev.filter((_, i) => i !== imageIndex));
      setModalMessage('Image deleted successfully');
      setShowImageSuccessModal(true);
    } catch (error) {
      console.error("Error deleting image:", error);
      setModalMessage('Failed to delete image');
      setShowImageErrorModal(true);
    }
  };

 // Update the handleSubmitEdit function to handle sold status
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
    
    // If status is sold, set quantity to 0 in the form data as well
    if (formData.status === 'sold') {
      formDataToSend.append("productQuantity", 0);
    } else {
      formDataToSend.append("productQuantity", formData.productQuantity);
    }
    
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
    
    // Set appropriate success message
    setModalMessage(response.data.message || 'Product updated successfully');
    setShowSuccessModal(true);
    
    // Refresh product data
    fetchProductDetail();
    
    setTimeout(() => {
      setShowEditModal(false);
      reset();
      setPreviews([]);
    }, 2000);

  } catch (error) {
    console.error("Error updating product:", error);
    setLoading(false);
    setErrorMessage(true);
    setErrMessage(error.response?.data?.error || "Failed to update product");
    setModalMessage(error.response?.data?.error || "Failed to update product");
    setShowErrorModal(true);
  }
};
// Add a function to update only quantity
const updateProductQuantity = async (newQuantity) => {
  setLoadingStatus(product.productId);

  try {
    const response = await chukkytechAxios.patch(
      `/product/updateQuantity/${product.productId}`,
      { productQuantity: newQuantity }
    );

    if (response.data.success) {
      let message = `Product quantity updated to ${newQuantity}`;
      if (response.data.newStatus === 'sold') {
        message += ' and automatically marked as sold (quantity is zero)';
      }
      
      setModalMessage(message);
      setShowSuccessModal(true);
      
      // Refresh product data
      fetchProductDetail();
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
    setModalMessage(error.response?.data?.error || "Failed to update quantity");
    setShowErrorModal(true);
  } finally {
    setLoadingStatus(null);
  }
};

// Update your status change handler to consider quantity
const handleStatusAction = (actionType, newStatus) => {
  let message = '';
  
  switch (actionType) {
    case 'suspend':
      message = 'Are you sure you want to suspend this product?';
      break;
    case 'sold':
      // If quantity is > 0, warn the user
      if (product.productQuantity > 0) {
        message = `This product still has ${product.productQuantity} units in stock. Are you sure you want to mark it as sold?`;
      } else {
        message = 'Are you sure you want to mark this product as sold?';
      }
      break;
    case 'reactivate':
      message = 'Are you sure you want to reactivate this product?';
      break;
    default:
      return;
  }

  setPendingAction({ type: actionType, status: newStatus });
  setModalMessage(message);
  setShowWarningModal(true);
};

//   const handleStatusAction = (actionType, newStatus) => {
//     let message = '';
    
//     switch (actionType) {
//       case 'suspend':
//         message = 'Are you sure you want to suspend this product?';
//         break;
//       case 'sold':
//         message = 'Are you sure you want to mark this product as sold?';
//         break;
//       case 'reactivate':
//         message = 'Are you sure you want to reactivate this product?';
//         break;
//       default:
//         return;
//     }

//     setPendingAction({ type: actionType, status: newStatus });
//     setModalMessage(message);
//     setShowWarningModal(true);
//   };

  const confirmStatusChange = async () => {
    setLoadingStatus(product.productId);
    setShowWarningModal(false);

    try {
      const response = await chukkytechAxios.patch(`/product/updateStatus/${product.productId}`, {
        status: pendingAction.status
      });

      if (response.data.success) {
        setModalMessage(`Product status updated to ${pendingAction.status} successfully!`);
        setShowSuccessModal(true);
        
        // Refresh product data
        fetchProductDetail();
      }
    } catch (error) {
      console.error(`Error updating product status:`, error);
      setModalMessage(error.response?.data?.error || `Failed to update product status`);
      setShowErrorModal(true);
    } finally {
      setLoadingStatus(null);
    }
  };

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
          <button className="btn btn-back" onClick={() => navigate('/view-created-products')}>
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
          <button className="btn btn-back" onClick={() => navigate('/view-created-products')}>
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
        <div className="product-detail-co">
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
    <span className={`detail-value ${product.productQuantity <= 0 ? 'text-danger' : ''}`}>
      {product.productQuantity} units
      {product.productQuantity <= 0 && (
        <span className="warning-badge">Out of Stock</span>
      )}
    </span>
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
    <span className={`status-badge status-${product.status} ${product.productQuantity <= 0 && product.status !== 'sold' ? 'status-warning' : ''}`}>
      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
      {product.productQuantity <= 0 && product.status !== 'sold' && ' (Low Stock)'}
    </span>
  </div>
</div>

{/* Add quick quantity update section */}
<div className="quantity-update-section">
  <h4>Quick Quantity Update</h4>
  <div className="quantity-controls">
    <input
      type="number"
      className="form-control"
      placeholder="New quantity"
      id="quickQuantityInput"
    />
    <button 
      className="btn btn-primary"
      onClick={() => {
        const input = document.getElementById('quickQuantityInput');
        const newQuantity = parseInt(input.value);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
          updateProductQuantity(newQuantity);
          input.value = '';
        }
      }}
      disabled={loadingStatus === product.productId}
    >
      {loadingStatus === product.productId ? 'Updating...' : 'Update Quantity'}
    </button>
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

              {/* Conditional rendering based on status */}
              {product.status === 'suspended' ? (
                <button 
                  className="btn btn-info" 
                  onClick={() => handleStatusAction('reactivate', 'active')}
                  disabled={loadingStatus === product.productId}
                >
                  {loadingStatus === product.productId ? 'Reactivating...' : 'Reactivate Product'}
                </button>
              ) : product.status === 'sold' ? (
                <span className="status-badge status-sold">
                  Product Sold
                </span>
              ) : (
                <>
                  <button 
                    className="btn btn-warning" 
                    onClick={() => handleStatusAction('suspend', 'suspended')}
                    disabled={loadingStatus === product.productId}
                  >
                    <MdBabyChangingStation /> 
                    {loadingStatus === product.productId ? 'Updating...' : 'Suspend Product'}
                  </button>
                  
                  <button 
                    className="btn btn-success" 
                    onClick={() => handleStatusAction('sold', 'sold')}
                    disabled={loadingStatus === product.productId}
                  >
                    <AiOutlineClose /> 
                    {loadingStatus === product.productId ? 'Updating...' : 'Mark as Sold'}
                  </button>
                </>
              )}
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

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        
        <form onSubmit={handleSubmit(handleSubmitEdit)}>
          <Modal.Body>
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
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
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

      {/* Status Confirmation Modal */}
      <Modal show={showWarningModal} onHide={() => setShowWarningModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWarningModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={confirmStatusChange}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowErrorModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Success Modal */}
      <Modal show={showImageSuccessModal} onHide={() => setShowImageSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowImageSuccessModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Error Modal */}
      <Modal show={showImageErrorModal} onHide={() => setShowImageErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowImageErrorModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDetail;