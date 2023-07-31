import { NavLink } from "react-router-dom";
import SignUpContent from "./signupcontent";
import { BsList } from "react-icons/bs";
import brandlogo from "../images/mybrand.JPEG";



const SignUpPage= (()=>{

    return(
        <>
        <nav className="nav-container-c">
      <input type="checkbox" id="check"/>
      <label for="check" className="checkbtn">
      <i className="checkbtn"><BsList size={35} /></i>
      </label>
      <label className="logo"><img className="logo-img" src={brandlogo}/> </label>
      <ul className="navlist-li">
      <NavLink to="/"className="navlink-style" > <li><a className="active" href="#">Home</a></li></NavLink>
        <li><a >About</a></li>
        <li><a >Services</a></li>
        <li><a >Contact</a></li>
        <li><a >Feedback</a></li>
      <NavLink to='/signinpage' className="navlink-style"> <li><a >Sign in</a></li></NavLink>
        
        
      </ul>
    </nav>

   
        <SignUpContent/>
   
        
        </>
    )
})
export default SignUpPage

