import { useNavigate } from "react-router-dom";
// import "./userlogin.css"
import Header from "../Header";
import { FcGoogle } from "react-icons/fc";



const UserLogin = (()=>{

const navigate = useNavigate();



const navigateSignUp = (()=>{
  navigate("/user-signup")
})

const navigateUserProfile = (()=>{
  navigate("/user-profile")
})





    return(

        <>
<Header/>


<div className="login-page">
        
        <div className="form">
          <p className="titleAdLogin">User login</p>
          
          <form className="login-form">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <div>Forgot your password?</div>
            <div className="message">Not registered? <a href="#"> <span onClick={navigateSignUp}> Create 
            an account</span></a></div>
            <br/>
            <button onClick={navigateUserProfile}>login</button>
            
          </form>

          <p style={{"fontWeight":"bold", fontSize:"20px"}}>Or</p>

           <button className="google-btn" type="button"> <span><FcGoogle size={30}/></span>  Continue with Google</button>

        </div>
      </div>   
        
        </>
    )
})

export default UserLogin