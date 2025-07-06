import "./productBuy.css";
import commingImage from "../../components/images/coming-img-removebg-preview.png";
import { useState } from "react";

import Header from "../layouts/Header";
import { useNavigate } from "react-router-dom";




const BuyProducts = (()=>{

  const navigate = useNavigate();

const navigateProductCart = (()=>{
      navigate("/product-cart")
})

const navigateProductDetails = (()=>{
  navigate("/product-details")
})


    return(


        <>

        <Header/>


        <div className="centSoon">
{/* <h3 className="" style={{textAlign: "center", marginTop:"5%"}}>COMING SOON...</h3> */}
<div className="centSoonImage">    

  <img src={commingImage} className="img-soon"/>
</div>

<p  className="centSoon"> While we’re working hard to bring you durable, affordable, and trusted tech products, feel free to take advantage of our <a href="/bookingpage">Book a Repair</a>  service!
</p>
<p  className="centSoon">Let us give your device a new lease on life — quick, reliable, and hassle-free.</p>

<p  className="centSoon">Thank you for choosing <span  style={{fontWeight:"bold"}}>CHUKKYTECH</span>  — your trusted tech partner.</p>

{/* <div className="container-fluid bg-trasparent my-4 p-3" style={{position:"relative"}}>
  <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
    <div className="col hp">
      <div className="card  shadow-sm">
        <a target="_blank" onClick={navigateProductDetails}>
          <img src="https://m.media-amazon.com/images/I/81gK08T6tYL._AC_SL1500_.jpg" className="card-img-top" alt="product.title" />
        </a>

        <div className="label-top shadow-sm">
          <a className="text-white" target="_blank" href="https://amzn.to/3qeS1Fe">asus</a>
        </div>
        <div className="card-body">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">1.245$</span>

            <span className="float-end"><a href="#" className="small text-muted text-uppercase aff-link">reviews</a></span>
          </div>
          <h5 className="card-title">
            <a target="_blank" href="#">ASUS TUF FX505DT Gaming Laptop- 15.6", 120Hz Full HD, AMD Ryzen 5 R5-3550H Processor, GeForce GTX 1650 Graphics, 8GB DDR4, 256GB PCIe SSD, RGB Keyboard, Windows 10 64-bit - FX505DT-AH51</a>
          </h5>

          <div className="d-grid gap-2 my-4">

            <a href="#" className="btn btn-warning bold-btn" style={{color:"white", fontSize:"15px", padding:"5px"}} onClick={navigateProductCart}>add to cart</a>

          </div>
          <div className="clearfix mb-1">

            <span className="float-start"><a href="#"><i className="fas fa-question-circle"></i></a></span>

            <span className="float-end">
              <i className="far fa-heart" style={{cursor:"pointer"}}></i>

            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="col hp">
      <div className="card  shadow-sm">
        <a href="https://amzn.to/42dsdGC" target="_blank">
          <img src="https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_SL1500_.jpg" className="card-img-top" alt="product.title" />
        </a>

        <div className="label-top shadow-sm">
          <a className="text-white" href="https://amzn.to/42dsdGC" target="_blank">razer</a>
        </div>
        <div className="card-body">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">2.345$</span>

            <span className="float-end"><a href="#" className="small text-muted text-uppercase aff-link">reviews</a></span>
          </div>
          <h5 className="card-title">
            <a target="_blank" href="#">Razer Blade 15 Base Gaming Laptop 2020: Intel Core i7-10750H 6-Core, NVIDIA GeForce GTX 1660 Ti, 15.6" FHD 1080p 120Hz, 16GB RAM, 256GB SSD, CNC Aluminum, Chroma RGB Lighting, Black</a>
          </h5>

          <div className="d-grid gap-2 my-4">

            <a href="#" className="btn btn-warning bold-btn" style={{color:"white", fontSize:"15px", padding:"5px"}}>add to cart</a>

          </div>
          <div className="clearfix mb-1">

            <span className="float-start"><a href="#"><i className="fas fa-question-circle"></i></a></span>

            <span className="float-end">
              <i className="far fa-heart" style={{cursor:"pointer"}}></i>


            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="col hp">
      <div className="card  shadow-sm">
        <a href="https://amzn.to/3os2Nrc" target="_blank">
          <img src="https://m.media-amazon.com/images/I/81w+3k4U8PL._AC_SL1500_.jpg" className="card-img-top" alt="product.title" />
        </a>

        <div className="label-top shadow-sm">
          <a className="text-white" href="https://amzn.to/3os2Nrc" target="_blank">lenovo</a>
        </div>
        <div className="card-body">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">1.020$</span>

            <span className="float-end"><a href="#" className="small text-muted text-uppercase aff-link">reviews</a></span>
          </div>
          <h5 className="card-title">
            <a target="_blank" href="#">Lenovo Legion 5 Gaming Laptop, 15.6" FHD (1920x1080) IPS Screen, AMD Ryzen 7 4800H Processor, 16GB DDR4, 512GB SSD, NVIDIA GTX 1660Ti, Windows 10, 82B1000AUS, Phantom Black</a>
          </h5>

          <div className="d-grid gap-2 my-4">

<a href="#" className="btn btn-warning bold-btn" style={{color:"white", fontSize:"15px", padding:"5px"}}>add to cart</a>

</div>
          <div className="clearfix mb-1">

            <span className="float-start"><a href="#"><i className="fas fa-question-circle"></i></a></span>

            <span className="float-end">
              <i className="far fa-heart" style={{cursor:"pointer"}}></i>

            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="col hp">
      <div className="card  shadow-sm">
        <a href="https://amzn.to/43tMNDW" target="_blank">
          <img src="https://m.media-amazon.com/images/I/61Ze2wc9nyS._AC_SL1500_.jpg" className="card-img-top" alt="product.title" />
        </a>
         <div className="label-top shadow-sm">Asus Rog</div>  
        <div className="label-top shadow-sm">
          <a className="text-white" href="https://amzn.to/43tMNDW" target="_blank">msi</a>
        </div>
        <div className="card-body">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">2.245$</span>

            <span className="float-end"><a href="#" className="small text-muted text-uppercase aff-link">reviews</a></span>
          </div>
          <h5 className="card-title">
            <a target="_blank" href="#">MSI GL66 Gaming Laptop: 15.6" 144Hz FHD 1080p Display, Intel Core i7-11800H, NVIDIA GeForce RTX 3070, 16GB, 512GB SSD, Win10, Black (11UGK-001)</a>
          </h5>

          <div className="d-grid gap-2 my-4">

            <a href="#" className="btn btn-warning bold-btn" style={{color:"white", fontSize:"15px", padding:"5px"}}>add to cart</a>

          </div>
          <div className="clearfix mb-1">

            <span className="float-start"><a href="#"><i className="fas fa-question-circle"></i></a></span>

            <span className="float-end">
              
            <i className="far fa-heart" style={{cursor:"pointer"}}></i>

            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}

        </div>
        
        
        
        </>
    )
})

export default BuyProducts