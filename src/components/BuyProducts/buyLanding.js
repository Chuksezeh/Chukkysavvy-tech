import "./productBuy.css";
import commingImage from "../../components/images/coming-img-removebg-preview.png";
import { useEffect, useState } from "react";

import Header from "../layouts/Header";
import { useNavigate } from "react-router-dom";
import SearchBar from "../ProductComponents/searchField/searchfield";
import useGetData from "../Utility/getFunction";
import { chukkytechAxios } from "../Utility/axios";
import { addToCartProduct } from "../redux/productCounter";
import { useDispatch } from "react-redux";




const BuyProducts = (()=>{

const [productData, setProductData] = useState([]);
const [loading, setLoading] = useState(true);
const [item, setItem] = useState("");
const [showAdded, setShowAdded] = useState(false);



//  const { data, isPending, error } = useGetData("/product/getAllProducts");
//  console.log("see products>>", data)

  const navigate = useNavigate();

const navigateProductCart = (()=>{
      navigate("/product-cart")
})

 const dispatch = useDispatch();

// const navigateProductDetails = (()=>{
//   navigate("/product-details")
// })


useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // ✅ No space at the end
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

// Add to cart function
// const addToCart = (product) => {
//   // Your add to cart logic here
//   console.log('Adding to cart:', product);
//   // Example:
//   // dispatch(addToCartAction(product));
//   alert(`${product.productName} added to cart!`);
// };


 const handleDataProduct = product => {
setShowAdded(true);
dispatch(addToCartProduct(product));
   
    setItem(product);
   
    setTimeout(() => {
      setShowAdded(false);
    }, 3000);
  };



  console.log("item added", item)

    return(


        <>

        <Header/>
   <SearchBar/>

            {showAdded && 
            
                 <div className="container mt-2 cart-alert">
                    <div className="row">

                        <div className="col-sm-6">
                            <div className="alert fade  alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">

                                <i className="start-icon far fa-check-circle faa-tada animated"></i>
                                <strong className="font__weight-semibold" style={{ color: "white" }}> Well done! </strong>

                                <span>  <span style={{fontWeight:"bold"}}> {item.productName}  </span>  added to cart </span> <span className="closebtn" onClick={() => setShowAdded(false)} style={{ cursor: "pointer", fontWeight: "bold", color: "red", marginLeft: "30px"}}>    X</span>
                            </div>
                        </div>
                    </div>
                  </div>
         }
               
        





<div className="centSoon">

<div className="container-fluid bg-trasparent my-4 p-3" style={{position:"relative"}}>
  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">

   {
    productData.length === 0 && !loading &&

    
    <div className="comingSoon">
     
      <h3 style={{textAlign:"center"}}>Products are coming soon</h3>
    </div>

   }

   {
  productData && productData.map((product) => (
    <div className="col hp" key={product.productId}>
      <div className="cardo shadow-sm p-2">
        <a onClick={() => navigateProductDetails(product.productId)} style={{ cursor: 'pointer' }}>
          {product.productImages && product.productImages.length > 0 ? (
            <img 
              src={product.productImages[0].imageUrl} 
              className="card-img-top" 
              alt={product.productName}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />
          ) : (
            <img 
              src="https://via.placeholder.com/300x200?text=No+Image" 
              className="card-img-top" 
              alt="No product image"
            />
          )}
        </a>

        <div className="card-bod">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">
              N{parseFloat(product.productPrice).toFixed(2)}
            </span>

           
          </div>

          <div className="titleText">
            <a onClick={() => navigateProductDetails(product.productId)} style={{ cursor: 'pointer', textDecoration: 'none' }}>
              {product.productName}
            </a>
          </div>
       <div className="titleText"   dangerouslySetInnerHTML={{ __html: product.shortDiscription }}>
      
          </div>
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
              className="btn btn-secondary bold-btn p-2" 
              disabled
              style={{ fontSize: "15px", padding: "5px" }}
            >
              Out of Stock
            </button>
          ) : product.status === 'suspended' ? (
            <button 
              className="btn btn-warning bold-btn p-2" 
              disabled
              style={{ fontSize: "15px", padding: "5px" }}
            >
              Temporarily Unavailable
            </button>
          ) : (
            <button 
              className="btn btn-warning bold-btn p-2" 
              style={{ color: "white", fontSize: "15px", padding: "5px" }} 
              onClick={() => handleDataProduct(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  ))
}
      
   

  </div>
</div> 

        </div>
        
      
 
        
        </>
    )
})

export default BuyProducts