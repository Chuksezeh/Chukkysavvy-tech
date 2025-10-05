// import React, { useState } from "react"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./searchfield.css";
import "./searchField.css";
import { GiShoppingCart } from "react-icons/gi";

const SearchBar = () =>{
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Electronics", "Fashion", "Books", "Home"];

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for "${search}" in "${category}"`);
  };

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
          
        </form>
         

        {/* Right - Cart */}
        {/* <div className="navbar-cart">
        <FaShoppingCart size={24} />
        <span className="cart-badge">3</span>
      </div> */}

        <div className="cart-Mycart-div">
          <spa className="cart-Mycart-span" >

            <i className="cartIicon"><GiShoppingCart size={22} />  </i> <span className="cart-Mycart">My Cart</span>
            <span className="num-Cart"> 4</span>
          </spa>
        </div>
      </nav>

   
   </>
  );
}

export default SearchBar;
