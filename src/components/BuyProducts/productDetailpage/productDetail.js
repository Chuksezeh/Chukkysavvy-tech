

import "./productDetail.css";
import img1 from "../../images/laptop.jpeg";


import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { useState } from "react";
import SearchBar from "../../ProductComponents/searchField/searchfield";


const ProductDetailPage = (()=>{

  const images = [
    "https://m.media-amazon.com/images/I/81gK08T6tYL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81w+3k4U8PL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61Ze2wc9nyS._AC_SL1500_.jpg",
  ];

  const [mainImage, setMainImage] = useState(images[0]); 


    return(
       <>
   <Header/>
   <SearchBar/>

    <div className="container product-details py-5 ">
      <div className="row pt-5">
        {/* Left side - Images */}
        <div className="col-md-6 text-center">
          <div className="main-image">
            <img src={mainImage} alt="Product" className="img-fluid" />
          </div>
          <div className="thumbs d-flex justify-content-center mt-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`thumb-img ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right side - Details */}
        <div className="col-md-6 product-info">
          <h2 className="product-title">ASUS TUF Gaming Laptop</h2>
          <p className="text-muted">Category: Electronics</p>

          {/* Ratings */}
          <div className="rating mb-3">
            ⭐⭐⭐⭐☆ <span className="text-muted">(120 reviews)</span>
          </div>

          {/* Price */}
          <h3 className="product-price">$1,245</h3>
          <p className="product-desc">
            ASUS TUF FX505DT Gaming Laptop – 15.6", 120Hz Full HD, AMD Ryzen 5,
            GeForce GTX 1650, 8GB DDR4, 256GB SSD, RGB Keyboard.
          </p>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-warning btn-lg">Add to Cart</button>
            <button className="btn btn-primary btn-lg" style={{borderRadius:"100px"}}>Buy Now</button>
          </div>

          {/* Additional Info */}
          <div className="mt-4">
            <h5>Product Details</h5>
            <ul>
              <li>15.6” Full HD Display (120Hz)</li>
              <li>AMD Ryzen 5 R5-3550H Processor</li>
              <li>8GB DDR4 RAM, 256GB SSD</li>
              <li>RGB Backlit Keyboard</li>
              <li>Windows 10 (64-bit)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <section> 

<div className="centSoon">

 <div className="container-fluid bg-trasparent my-4 p-3" style={{position:"relative"}}>
  <h2>You may also like</h2>
  <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
    <div className="col hp">
      <div className="cardo  shadow-sm p-2">
        <a target="_blank">
          <img src="https://m.media-amazon.com/images/I/81gK08T6tYL._AC_SL1500_.jpg" className="card-img-top" alt="product.title" />
        </a>

        
        <div className="card-bod">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">1.245$</span>

            <span className="float-end"><a href="#" className="small text-muted text-uppercase aff-link">reviews</a></span>
          </div>
          <div className="titleText">
            <a target="_blank" href="#">ASUS TUF FX505DT Gaming Laptop- 15.6", 120Hz Full HD, AMD Ryzen 5 R5-3550H Processor, GeForce GTX 1650 Graphics, 8GB DDR4, 256GB PCIe SSD, RGB Keyboard, Windows 10 64-bit - FX505DT-AH51</a>
          </div>

          
         
        </div>
        <div className="d-grid gap-2 my-6 buttonAddCart">

            <a  className="btn btn-warning bold-btn p-2" style={{color:"white", fontSize:"15px", padding:"5px"}} >add to cart</a>

          </div>
      </div>

    </div>
    <div className="col hp">
      <div className="cardo  shadow-sm p-2">
        <a href="https://amzn.to/42dsdGC" target="_blank">
          <img src="https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_SL1500_.jpg" className="card-img-top" alt="product.title" />
        </a>

        
        <div className="card-bod">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">2.345$</span>

            <span className="float-end"><a href="#" className="small text-muted text-uppercase aff-link">reviews</a></span>
          </div>
          <div className="titleText">
            <a target="_blank" href="#">Razer Blade 15 Base Gaming Laptop 2020: Intel Core i7-10750H 6-Core, NVIDIA GeForce GTX 1660 Ti, 15.6" FHD 1080p 120Hz, 16GB RAM, 256GB SSD, CNC Aluminum, Chroma RGB Lighting, Black</a>
          </div>

          <div className="d-grid gap-2 my-6">

            <a  className="btn btn-warning bold-btn p-2" style={{color:"white", fontSize:"15px", padding:"5px"}}>add to cart</a>

          </div>
        
        </div>
      </div>
    </div>
    <div className="col hp">
      <div className="cardo  shadow-sm p-2">
        <a href="https://amzn.to/3os2Nrc" target="_blank">
          <img src="https://m.media-amazon.com/images/I/81w+3k4U8PL._AC_SL1500_.jpg" className="card-img-top" alt="product.title" />
        </a>

      
        <div className="card-bod">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">1.020$</span>

            <span className="float-end"><a href="#" className="small text-muted text-uppercase aff-link">reviews</a></span>
          </div>
          <div className="titleText">
            <a target="_blank" href="#">Lenovo Legion 5 Gaming Laptop, 15.6" FHD (1920x1080) IPS Screen, AMD Ryzen 7 4800H Processor, 16GB DDR4, 512GB SSD, NVIDIA GTX 1660Ti, Windows 10, 82B1000AUS, Phantom Black</a>
          </div>

          <div className="d-grid gap-2 my-6">

               <a href="#" className="btn btn-warning bold-btn p-2" >add to cart</a>

              </div>
         
        </div>
      </div>
    </div>
    <div className="col hp">
      <div className="cardo  shadow-sm p-2">
        <a href="https://amzn.to/43tMNDW" target="_blank">
          <img src="https://m.media-amazon.com/images/I/61Ze2wc9nyS._AC_SL1500_.jpg" className="card-img-top" alt="product.title" />
        </a>
         
        
        <div className="card-bod">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">2.245$</span>

            <span className="float-end"><a  className="small text-muted text-uppercase aff-link">reviews</a></span>
          </div>
          <div className="titleText">
            <a target="_blank" href="#">MSI GL66 Gaming Laptop: 15.6" 144Hz FHD 1080p Display, Intel Core i7-11800H, NVIDIA GeForce RTX 3070, 16GB, 512GB SSD, Win10, Black (11UGK-001)</a>
          </div>

          <div className="d-grid gap-2 my-6">

            <a className="btn btn-warning bold-btn p-2" style={{color:"white", fontSize:"15px", padding:"5px"}}>add to cart</a>

          </div>
          
        </div>
      </div>
    </div>
  </div>
</div> 

        </div>


    </section>

<Footer/>
        
        </>
    )
})

export default ProductDetailPage