import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./productCart.css";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import SearchBar from "../../ProductComponents/searchField/searchfield";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCart = () => {

  const navigate = useNavigate();
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 120,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/81gK08T6tYL._AC_SL1500_.jpg",
    },
    {
      id: 2,
      name: "Classic Sneakers",
      category: "Fashion",
      price: 80,
      quantity: 2,
      image: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_SL1500_.jpg",
    },
  ]);

  // Handle Increase Quantity
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle Decrease Quantity
  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate Total
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

const handleCheckout = () => {
  navigate("/checkout-payment");
}
  

  return (

    <>

    <Header/>
    <SearchBar/>
    <div className="container cart-page my-5">
     
      <div className="row mt-4">
        <h2 className="mt-4">Your Shopping Cart</h2>
        <hr/>
        <div className="col-lg-8">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item d-flex align-items-center mb-4 p-3 shadow-sm rounded" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-details ms-3 flex-grow-1">
                  <h5>{item.name}</h5>
                  <p className="text-muted">{item.category}</p>
                  <p className="fw-bold">${item.price}</p>

                  <div className="d-flex align-items-center quantity-control">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-subtotal ">
                  <p className="fw-bold">${item.price * item.quantity}</p>
                <i onClick={() => removeItem(item.id)} style={{cursor:"pointer"}} title="Remove item">  <FaRegTrashAlt size={20} color="red"  /></i> 
                  {/* <button
                    className="btn btn-sm btn-danger mt-2"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button> */}
                </div>
              </div>
            ))
          )}
        </div>

      
        <div className="col-lg-4">
          <div className="cart-summary p-4 shadow-sm rounded">
            <h5>Order Summary</h5>
            <hr />
            <p className="d-flex justify-content-between">
              <span>Subtotal</span> <span>${subtotal}</span>
            </p>
            <p className="d-flex justify-content-between">
              <span>Shipping</span> <span>${shipping}</span>
            </p>
            <hr />
            <p className="d-flex justify-content-between fw-bold">
              <span>Total</span> <span>${total}</span>
            </p>
            <button className="btn btn-warning w-100 mt-3 p-3" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>

  <section> 

<div className="centSoon">

 <div className="container-fluid bg-trasparent my-4 p-3" style={{position:"relative"}}>
  <h2>Recently Viewed</h2>
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

         
          
        </div>
      </div>
    </div>
  </div>
</div> 

        </div>


    </section>



    <Footer/>
    </>
  );
};

export default  ProductCart;
