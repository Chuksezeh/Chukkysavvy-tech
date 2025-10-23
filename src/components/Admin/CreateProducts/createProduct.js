import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../adminDashboard";
import { chukkytechAxios } from "../../Utility/axios";
import { useForm, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import useGetData from "../../Utility/getFunction";
import "./createProduct.css";
import Footer from "../../layouts/Footer";

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [previews, setPreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileSizeError, setFileSizeError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { data, isPending, error } = useGetData("/company/getAllCompanies");
  const { data: categoryData, isPending: categoryPending, error: categoryError } = useGetData("category/getAllCategories");

  const adminsInfo = JSON.parse(localStorage.getItem("adminsInfo"));

  useEffect(() => {
    if (!adminsInfo) {
      navigate("/admin-login");
    }
  }, [navigate, adminsInfo]);

  const handleSubmitData = async (formDataValues) => {
    setLoading(true);
    setSuccessMessage(false);
    setErrorMessage(false);
    
    const selectedCategory = categoryData.find(
      (c) => String(c.categoryId) === String(formDataValues.categoryId)
    );

    const selectedCompany = data.find(
      (c) => String(c.companyId) === String(formDataValues.companyId)
    );

    console.log("✔ Raw formDataValues:", formDataValues);

    try {
      const formData = new FormData();
      formData.append("productName", formDataValues.productName);
      formData.append("productPrice", formDataValues.productPrice);
      formData.append("purchasePrice", formDataValues.purchasePrice);
      formData.append("productQuantity", formDataValues.productQuantity);
      formData.append("discount", formDataValues.discount || "");
      formData.append("productType", formDataValues.productType);
      formData.append("companyName", selectedCompany?.companyName || "");
      formData.append("companyId", selectedCompany?.companyId || "");
      formData.append("shortDiscription", formDataValues.shortDiscription || "");
      formData.append("fullDiscription", formDataValues.fullDiscription || "");
      formData.append("categoryName", selectedCategory?.categoryName || "");
      formData.append("categoryId", selectedCategory?.categoryId || "");
      formData.append("status", "active");
      formData.append("createdBy", adminsInfo.userId);

      // Append multiple images from selectedFiles state
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append("productImages", file);
          console.log(`✔ Image ->`, file.name, file.size, file.type);
        });
      }

      // Debug: log formData entries
      console.log("✔ FormData sending to backend:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]} :`, pair[1]);
      }

      const res = await chukkytechAxios.post("product/createProducts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✔ Response from backend:", res.data);

      setLoading(false);
      setSuccessMessage(true);
      reset();
      setPreviews([]);
      setSelectedFiles([]);
      setFileSizeError("");
    } catch (err) {
      console.error("❌ Error from backend:", err.response?.data || err.message);
      setLoading(false);
      setErrorMessage(true);
      setErrMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setFileSizeError(""); // Clear previous errors

    if (files.length === 0) return;

    // Validate file sizes (2MB = 2 * 1024 * 1024 bytes)
    const maxSize = 2 * 1024 * 1024;
    const validFiles = [];
    const oversizedFiles = [];

    files.forEach(file => {
      if (file.size > maxSize) {
        oversizedFiles.push({
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2)
        });
      } else {
        validFiles.push(file);
      }
    });

    // Show error if any files are oversized
    if (oversizedFiles.length > 0) {
      const oversizedNames = oversizedFiles.map(f => `${f.name} (${f.size} MB)`).join(', ');
      setFileSizeError(`The following files exceed 2MB limit: ${oversizedNames}`);
      
      // If all files are invalid, clear the input and return
      if (validFiles.length === 0) {
        event.target.value = "";
        return;
      }
    }

    // Create preview URLs only for valid files
    const newPreviews = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      sizeMB: (file.size / (1024 * 1024)).toFixed(2)
    }));

    // Update states with valid files only
    setSelectedFiles(prev => [...prev, ...validFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    
    // Update react-hook-form value
    setValue("productImages", [...selectedFiles, ...validFiles]);
  };

  const removePreview = (index) => {
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index].url);
    
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    
    // Update react-hook-form value after removal
    setValue("productImages", selectedFiles.filter((_, i) => i !== index));
    
    // Clear file size error if no files left
    if (selectedFiles.length === 1) {
      setFileSizeError("");
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      previews.forEach(preview => {
        URL.revokeObjectURL(preview.url);
      });
    };
  }, [previews]);

  return (
    <>
      <AdminDashboard />

      <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', marginTop: '-20px' }}>
        <div className="row align-items-center">
          <div className="col">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item"><a href="/admin-dashboard-card" className="text-decoration-none">Dashboard</a></li>
                <li className="breadcrumb-item"><a  className="text-decoration-none">Products</a></li>
                <li className="breadcrumb-item active text-dark">Create Product </li>
              </ol>
            </nav>
            <h1 className="h3 mb-0 mt-2 text-dark">Create Products</h1>
            <p className="text-muted mb-0">Create all the Products</p>
          </div>
          <div className="col-auto">
          </div>
        </div>
      </div>
      <br/>

      <div className="container">
        <div className="form-wr">
          <p id="description" className="text-center">
            Create Product
          </p>

          <form
            id="survey-form"
            onSubmit={handleSubmit((data, event) => {
              event.preventDefault();
              console.log("Form data on submit:", data);
              handleSubmitData(data);
            })}
          >
            <div className="row">
              {/* Product Name */}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    className="form-control"
                    {...register("productName", { required: "Product name is required" })}
                  />
                  <span className="cum-error">{errors.productName?.message}</span>
                </div>
              </div>

              {/* Category */}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Category Name</label>
                  <select className="form-control" {...register("categoryId")}>
                    {categoryData &&
                      categoryData.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>
                          {category.categoryName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Price & Purchase Price */}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Product Price</label>
                  <input
                    className="form-control"
                    {...register("productPrice", { required: "Product price is required" })}
                  />
                  <span className="cum-error">{errors.productPrice?.message}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Purchase Price</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("purchasePrice", { required: "Purchase price is required" })}
                  />
                  <span className="cum-error">{errors.purchasePrice?.message}</span>
                </div>
              </div>

              {/* Quantity & Discount */}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Product Quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("productQuantity", { required: "Product quantity is required" })}
                  />
                  <span className="cum-error">{errors.productQuantity?.message}</span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Discount</label>
                  <input type="text" className="form-control" {...register("discount")} />
                </div>
              </div>

              {/* Product type */}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Select product type</label>
                  <select
                    className="form-control"
                    {...register("productType", { required: "Product type is required" })}
                  >
                    <option>Brand new</option>
                    <option>Second hand</option>
                    <option>Refurbished</option>
                    <option>Non-tested</option>
                  </select>
                  <span className="cum-error">{errors.productType?.message}</span>
                </div>
              </div>

              {/* Company */}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Select company</label>
                  <select
                    className="form-control"
                    {...register("companyId", { required: "Company name is required" })}
                  >
                    <option>All</option>
                    {data &&
                      data.map((company) => (
                        <option key={company.companyId} value={company.companyId}>
                          {company.companyName}
                        </option>
                      ))}
                  </select>
                  <span className="cum-error">{errors.companyId?.message}</span>
                </div>
              </div>

              {/* Short & Full Description */}
              <div className="col-md-12">
                <div className="form-group">
                  <label>Short description</label>
                  <Controller
                    name="shortDiscription"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Write short product description..."
                        style={{ height: "100px", marginBottom: "50px" }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label>Full description</label>
                  <Controller
                    name="fullDiscription"
                    control={control}
                    defaultValue=""
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

              {/* File Upload with 2MB Validation */}
              <div className="col-md-12">
                <div className="form-group">
                  <label>Upload product images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileSelect}
                  />
                  
                  {/* Error Messages */}
                  {selectedFiles.length === 0 && !fileSizeError && (
                    <span className="cum-error">Product images are required</span>
                  )}
                  {fileSizeError && (
                    <div className="cum-error">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {fileSizeError}
                    </div>
                  )}
                  
                  {/* File Info */}
                  <div className="mt-2">
                    <small className="text-muted d-block">
                      Selected files: {selectedFiles.length} | Maximum file size: 2MB per image
                    </small>
                    {selectedFiles.length > 0 && !fileSizeError && (
                      <small className="text-success d-block">
                        <i className="fas fa-check-circle me-1"></i>
                        All files are within size limit
                      </small>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              {previews.length > 0 && (
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Image Previews ({previews.length} images)</label>
                    <div
                      className="image-preview-container"
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px",
                        flexWrap: "wrap",
                      }}
                    >
                      {previews.map((preview, index) => (
                        <div key={index} style={{ position: "relative" }} className="image-preview-item">
                          <img
                            src={preview.url}
                            alt={`preview-${index}`}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ccc",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removePreview(index)}
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-8px",
                              background: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              cursor: "pointer",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            ×
                          </button>
                          <div style={{ fontSize: "10px", textAlign: "center", marginTop: "5px" }}>
                            <div>{preview.name}</div>
                            <div className="text-muted">{preview.sizeMB} MB</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <br />

            {/* Success & Error Messages */}
            {successMessage && (
              <div className="alert alert-success mt-2">
                <strong>Well done!</strong> Product created successfully.
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger mt-2">
                <span>{errMessage}</span>
              </div>
            )}

            {/* Submit */}
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <button disabled className="picckBtn-create-product">
                    <span className="loader"></span> Creating Product...
                  </button>
                ) : (
                  <button 
                    className="picckBtn-create-product" 
                    type="submit"
                    disabled={selectedFiles.length === 0 || fileSizeError}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>


       <section style={{marginTop: "5%" }}>
                    <Footer/>
                  </section>
    </>
  );
};

export default CreateProduct;