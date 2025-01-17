import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import "./adminLogin.css";


const AdminLoginPage  = ()=>{

const navigate = useNavigate();


const navigateAdminDashboard = (()=>{
  navigate("/admin-dashboard-card")
})


 return(
<>

<Header/>

     <div className="login-page">
        
  <div className="form">
    <p className="titleAdLogin">Admin Login</p>
    
    <form className="login-form">
      <label>Email Address</label>
      <input type="email" placeholder="Enter email address"/>
       <label>Password</label>
      <input type="password" placeholder="Enter password"/>
      <button onClick={navigateAdminDashboard}>login</button>
      {/* <p className="message">Not registered? <a href="#">Create an account</a></p> */}
    </form>
  </div>
</div>   
        
        
        </>
    )
}

export default AdminLoginPage