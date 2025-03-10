import { useLocation, useNavigate } from "react-router-dom";

import Header from "../Header";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../../Configfile/firebaseConfig";
import { useState } from "react";
// import { useUser } from "../../UserDashboard/userConytext";
import "./userLogin.css";
import { useForm, SubmitHandler } from "react-hook-form"
import useGetData from "../../Utility/getFunction";
import { chukkytechAxios } from "../../Utility/axios";
import Footer from "../Footer";


const UserLogin = (()=>{

  const [user, setUser] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);

const navigate = useNavigate();
// const { setUser } = useUser();
// const history = useLocation();
const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
  const [errMessage, setErrMessage] = useState("");
const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm();

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


  const handleSubmitLoginData = async data => {
		setLoading(true);

		console.log('data', data);

		await chukkytechAxios
			.post('auth/userLogin', data)
			.then(res => {
				console.log('res', res);
				setLoading(false);
				setSuccessMessage(true);
        if(res.statusText === "OK"){
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userInfo', JSON.stringify(res.data));
          navigate("/user-profile")
           }
       
				
			})
			.catch(err => {
				console.log('err', err);
				setLoading(false);
				setErrorMessage(true);
        setErrMessage(err.response?.data)

			});
	};

  // const { data: registerData, isPending: registerDataIsPending, error } = useGetData('/registration');

  


 return(

        <>
<Header/>


<div className="login-page-LOGi">
        
        <div className="form">
          <p className="titleAdLogin">User login</p>
          
          <form className="login-form" onSubmit={handleSubmit((data, event) => {
                          
						console.log('seedataNow', data);
            handleSubmitLoginData(data);
					})}>
            <p >Email Address</p>
            <input type="email"  placeholder="Enter your email address" {...register("email", {
											required: 'Email is required',
											maxLength: {},
										})} />
                    <span className="cum-error">{errors.email?.message}</span>
            <p >Password</p>
            <input type="password" placeholder="Enter your password" {...register("password", {
											required: 'password is required',
											maxLength: {},
										})} />
                    <span className="cum-error">{errors.email?.message}</span>
            <div style={{cursor:"pointer"}}>Forgot your password?</div>
            <div className="message">Not registered? <a href="#"> <span onClick={navigateSignUp}> Create 
            an account</span></a></div>
            <br/>

            {

errorMessage &&
<div className="container mt-2">
  <div className="row">

  <div class="col-sm-12">
        <div className="alert   alert-danger  " role="alert" >
          
                <span> {errMessage.message}   </span>
         
        </div>
      </div>



  </div>
</div>


}


            {
									loading ? <button > <span class="loader"></span></button> : <button  type="submit">Login</button>
								}
            {/* <button type="submit" >login</button> */}
            
          </form>

          {/* <p style={{"fontWeight":"bold", fontSize:"20px"}}>Or</p>

           <button className="google-btn" type="button" onClick={handleGoogleSignIn}> <span><FcGoogle size={30}/></span>  Continue with Google</button> */}

        </div>
      </div>  


      <Footer/> 
        
        </>
    )
})

export default UserLogin