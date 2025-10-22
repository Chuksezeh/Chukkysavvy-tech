import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import "./adminLogin.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { chukkytechAxios } from "../../Utility/axios";
import { GrUserAdmin } from "react-icons/gr";
import logo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"


const AdminLoginPage  = ()=>{

const navigate = useNavigate();


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


const navigateAdminDashboard = (()=>{
  navigate("/admin-dashboard-card")
})

const userInfo = localStorage.getItem("adminsInfo");
const userData = JSON.parse(userInfo);

console.log("checkadmin", userData)


const handleSubmitLoginData = async data => {
  setLoading(true);

  console.log('data', data);

  await chukkytechAxios
    .post('auth/loginAdminUser', data)
    .then(res => {
      console.log('res', res);
      setLoading(false);
      setSuccessMessage(true);
      if(res.data.message === "Login successful"){
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminsInfo', JSON.stringify(res.data));

        // window.dispatchEvent(new Event("authChanged"));

       
        navigate("/admin-dashboard-card")
         }
     
      
    })
    .catch(err => {
      console.log('err', err);
      setLoading(false);
      setErrorMessage(true);
      setErrMessage(err.response?.data)

    });
};



const navigateAdmin = (()=>{
  navigate("/admin-dashboard-card")
})



 return(
<>

<Header/>

 




<div className="login-page-LOGi">
<br/>
<br/>
{
  userData && userData && <div className="adminin-div"> <button className="btn btn-primary admin-pushinbtn" onClick={navigateAdmin}> <GrUserAdmin /> Admin Dashboard </button>  </div>

}



        <div className="form">
             <img className="log-log-inimage" src={logo}/>
           
          <p className="titleAdLogin">Admin login</p>
          <form className="login-form"  onSubmit={handleSubmit((data, event) => {
                          
                          console.log('seedataNow', data);
                          handleSubmitLoginData(data);
                        })}>
      <label>Email Address</label>
      <input type="email" placeholder="Enter email address"
      
      {...register("email", {
        required: 'Email is required',
        maxLength: {},
      })} />
      <span className="cum-error">{errors.email?.message}</span>
       <label>Password</label>
      <input type="password" placeholder="Enter password"
      
      {...register("password", {
        required: 'password is required',
        maxLength: {},
      })} />
      <span className="cum-error">{errors.email?.message}</span>
     
      {
									loading ? <button > <span class="loader"></span></button> : <button  type="submit">Login</button>
								}
    {errorMessage &&
<div className="container mt-2">
  <div className="row">

  <div class="col-sm-12">
        <div className="alert   alert-danger  " role="alert" >
          
                <span> {errMessage?.message || "Something went wrong, Please try again later"}   </span>
         
        </div>
      </div>



  </div>
</div>


}

    </form>

        </div>
      </div>

        
        
        </>
    )
}

export default AdminLoginPage