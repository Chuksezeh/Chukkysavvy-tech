import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchField.css";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartUpdate, setCartUpdate] = useState(0); // Force re-render
  const navigate = useNavigate();

  const totalCount = useSelector((state) => {
    return state.cartProduct.productItems.length;
  });

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartUpdate(prev => prev + 1); // Force re-render
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleNavigateProductCart = () => {
    navigate("/product-cart");
  };

  return (
    <>
      <nav className="nav-bar">
        <form className="navbar-2search">
          <select className="search-select">
            <option value="all">All Categories</option>
          </select>
          <input
            type="text"
            placeholder="Search products..."
            className="search-2input"
          />
          <button type="submit" className="search-button">Search</button>
          <div 
            className="cart-Mycart-div" 
            onClick={handleNavigateProductCart} 
            style={{cursor: "pointer"}}
          >
            <span className="cart-Mycart-span">
              <i className="cartIicon" style={{color: "white"}}>
                <GiShoppingCart size={22} />  
              </i> 
              <span className="cart-Mycart" style={{color: "white"}}> Cart</span>
              <span className="num-Cart"> {totalCount} </span>
            </span>
          </div>
        </form>
      </nav>
    </>
  );
}

export default SearchBar; 