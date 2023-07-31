import { NavLink } from "react-router-dom";
import SignInContentent from "./signincontent";
import { BsList } from "react-icons/bs";
import brandlogo from "../images/mybrand.JPEG";


const SignInPage= (()=>{

    return(
        <>
        <nav className="nav-container-c">
      <input type="checkbox" id="check"/>
      <label for="check" className="checkbtn">
      <i className="checkbtn"><BsList size={35} /></i>
      </label>
      <label className="logo"> <img className="logo-img" src={brandlogo}/> </label>
      <ul className="navlist-li">
       <NavLink to="/" className="navlink-style"> <li><a className="active" >Home</a></li></NavLink>
        <li><a >About</a></li>
        <li><a >Services</a></li>
        <li><a >Contact</a></li>
        <li><a >Feedback</a></li>
        <NavLink to="/signuppage"className="navlink-style"> <li><a >Sign Up</a></li></NavLink>
        
        
      </ul>
    </nav>
   
        <SignInContentent/>
    
        
        </>
    )
})
export default SignInPage

