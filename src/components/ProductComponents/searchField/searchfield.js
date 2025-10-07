// import React, { useState } from "react"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./searchfield.css";
import "./searchField.css";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = () =>{
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

   const navigate = useNavigate();

  const categories = ["All", "Electronics", "Fashion", "Books", "Home"];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for "${search}" in "${category}"`);
  };

  const totalCount = useSelector((state) => {

    return state.cartProduct.productItems.length

  })


 

  const handleNavigateProductCart = (()=>{
      navigate("/product-cart")
  })

  return (
   <>

  
   
   <nav className="nav-bar">
        {/* Left - Logo */}
        {/* <div className="navbar-logo">ChukkyTech</div> */}

        {/* Center - Search */}
        <form className="navbar-2search" >
          <select
            // value={searchCategory}
            
            className="search-select">
            <option value="all">All Categories</option>

           
          </select>
          <input
            type="text"
            placeholder="Search products..."
            className="search-2input"
          // value={searchKeyword}
       
          />
          <button type="submit" className="search-button" >Search</button>
          <div className="cart-Mycart-div" onClick={handleNavigateProductCart } style={{cursor:"pointer"}}>
          <spa className="cart-Mycart-span" >

            <i className="cartIicon" style={{color:"white"}}><GiShoppingCart size={22} />  </i> <span className="cart-Mycart" style={{color:"white"}}> Cart</span>
            <span className="num-Cart"> {totalCount } </span>
          </spa>
        </div>
        </form>
        

        {/* Right - Cart */}
        {/* <div className="navbar-cart">
        <FaShoppingCart size={24} />
        <span className="cart-badge">3</span>
      </div> */}

       
      </nav>

   
   </>
  );
}

export default SearchBar;
