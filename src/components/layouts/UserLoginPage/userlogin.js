import { useLocation, useNavigate } from "react-router-dom";

import Header from "../Header";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../../Configfile/firebaseConfig";
import { useState } from "react";
// import { useUser } from "../../UserDashboard/userConytext";
import "./userLogin.css";


const UserLogin = (()=>{

  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);

const navigate = useNavigate();
// const { setUser } = useUser();
// const history = useLocation();


const navigateSignUp = (()=>{
  navigate("/user-signup")
})

const navigateUserProfile = (()=>{
  navigate("/user-profile")
})




const handleGoogleSignIn = async () => {
  try {
    const result = await  auth.signInWithRedirect(googleProvider);
    setUser(result.user);
    navigateUserProfile()
    // navigate('/user-profile', { state: { user } });
    console.log("User signed in with Google:", result.user);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


 return(

        <>
<Header/>


<div className="login-page-LOGi">
        
        <div className="form">
          <p className="titleAdLogin">User login</p>
          
          <form className="login-form">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <div>Forgot your password?</div>
            <div className="message">Not registered? <a href="#"> <span onClick={navigateSignUp}> Create 
            an account</span></a></div>
            <br/>
            <button onClick={navigateUserProfile} >login</button>
            
          </form>

          <p style={{"fontWeight":"bold", fontSize:"20px"}}>Or</p>

           <button className="google-btn" type="button" onClick={handleGoogleSignIn}> <span><FcGoogle size={30}/></span>  Continue with Google</button>

        </div>
      </div>   
        
        </>
    )
})

export default UserLogin