import { useEffect } from "react";
import Header from "../../layouts/Header"
import UserDashBoard from "../userDashboard"
import { useNavigate } from "react-router-dom";



const ProductOrders = (()=>{

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        console.log('UserInfo:', userInfo);
      
        if (!userInfo) {
          navigate('/user-login');
        }
      }, [navigate]);
    

    return(



        <>
       <Header />
       <UserDashBoard /> 

       <div style={{ marginTop:"5%", justifyContent:"center", textAlign:"center"}}>

        <h4>  Comming soon!</h4>
       </div>
        
        
        </>
    )
})

export default ProductOrders