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
      <input type="text" placeholder="username"/>
      <input type="password" placeholder="password"/>
      <button onClick={navigateAdminDashboard}>login</button>
      {/* <p className="message">Not registered? <a href="#">Create an account</a></p> */}
    </form>
  </div>
</div>   
        
        
        </>
    )
}

export default AdminLoginPage