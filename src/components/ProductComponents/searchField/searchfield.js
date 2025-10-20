import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchField.css";
import { GiShoppingCart } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { chukkytechAxios } from "../../Utility/axios";

const SearchBar = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartUpdate, setCartUpdate] = useState(0);
  const navigate = useNavigate();
  const [pendingLocation, setPendingLocation] = useState(true);

      const [allCategories, setAllCategories] = useState([]);

  const totalCount = useSelector((state) => {
    return state.cartProduct.productItems.length;
  });

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartUpdate(prev => prev + 1);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleNavigateProductCart = () => {
    navigate("/product-cart");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (search.trim() || category !== "All") {
      // Navigate to search results page with query parameters
      navigate(`/search-results?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`);
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

const fetchCategories = async () => {
        setPendingLocation(true);
        try {
            const response = await chukkytechAxios.get("category/getAllCategories");
            setAllCategories(response.data);
            setPendingLocation(false);
        } catch (error) {
            setPendingLocation(false);
            console.error('Error fetching categories:', error);
        }
    };

useEffect(() => {
        fetchCategories();
    }, []);

console.log("..prod", allCategories)


  return (
    <>
      <nav className="nav-bar">
        <form className="navbar-2search" onSubmit={handleSearch}>
          <select 
            className="search-select" 
            value={category} 
            onChange={handleCategoryChange}
          >
          
            <option value="All">All Categories</option>
            
            {
              allCategories && allCategories.map((category)=>(
                   <option > {category.categoryName} </option>
              ))
            }
            
           
            {/* Add more categories as needed */}
          </select>
          <input
            type="text"
            placeholder="Search products..."
            className="search-2input"
            value={search}
            onChange={handleInputChange}
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