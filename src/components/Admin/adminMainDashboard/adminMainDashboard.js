import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header"
import useGetData from "../../Utility/getFunction";
import AdminDashboard from "../adminDashboard"
import "./adminMainDashboard.css"
import { useEffect } from "react";


const AdminMainDashboard = (()=>{


  const { data, isPending, error } = useGetData("adminRepair/getAllRepairOrder");


  const getLatestRepairOrders = (orders) => {
    if (!Array.isArray(orders)) {
      console.error("Expected an array, but got:", orders);
      return [];
    }
  
    console.log("Processing Orders:", orders);
  
    const latestOrders = data.reduce((acc, order) => {
      console.log("Checking Order:", order);
  
      if (
        !acc[order.repairOrderCode] || 
        new Date(order.createdDateTime) > new Date(acc[order.repairOrderCode].createdDateTime)
      ) {
        acc[order.repairOrderCode] = order;
      }
      return acc;
    }, {}); // Store latest orders in an object
  
    console.log("Latest Orders Object:", latestOrders);
  
    return Object.values(latestOrders); // Convert the object to an array
  };
  
  // Example usage:
  const ordersArray = Array.isArray(data.repairOrders) ? data.repairOrders : [];
  const latestOrders = getLatestRepairOrders(ordersArray);
  
  console.log("Lateseeeee:", latestOrders);
  
const filterOrderProcessing = latestOrders.filter((data)=>(
    data.status == "Processing"
));
const filterOrderFixing = latestOrders.filter((data)=>(
  data.status == "fixing"
));
const filterOrderpickedUp = latestOrders.filter((data)=>(
  data.status == "pickedUp"
));

const filterOrderFixed = latestOrders.filter((data)=>(
  data.status == "fixed"
));
const filterOrderCancel = latestOrders.filter((data)=>(
  data.status == "cancel"
));

const filterOrderDelivered = latestOrders.filter((data)=>(
  data.status == "delivered"
));
const filterOrderIrreparable = latestOrders.filter((data)=>(
  data.status == "irreparable"
));
const filterOrderSettled = latestOrders.filter((data)=>(
  data.status == "settled"
))

// console.log("filterOrderProcessing", filterOrderProcessing?.length)

 const navigate = useNavigate();

    useEffect(() => {
        const adminsInfo = localStorage.getItem('adminsInfo');
        // console.log('UserInfo:', userInfo);
      
        if (!adminsInfo) {
          navigate('/admin-login');
        }
      }, [navigate]);






    return(
<>
        
     

<AdminDashboard/>

<div className="header-bar">

<ul className="action-bar">

  <li>Home /<span className="addash">Dashboard</span></li>
</ul>
</div>

        <div id="root">
  <div className="container pt-5">
    <div className="row align-items-stretch">
      <div className="c-dashboardInfo col-lg-3 col-md-6" onClick={() => navigate("/user-repair-orders")} style={{cursor:"pointer"}}>

        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Pending Repair Orders<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">  {filterOrderProcessing?.length} </span>
        </div>
      </div>
      <div className="c-dashboardInfo col-lg-3 col-md-6"  onClick={() => navigate("/user-repair-orders")} style={{cursor:"pointer"}}>
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Repair Order PickedUp<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">{filterOrderpickedUp?.length}</span>
        </div>
      </div>
      <div className="c-dashboardInfo col-lg-3 col-md-6"  onClick={() => navigate("/user-repair-orders")} style={{cursor:"pointer"}}>
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> Fixing Repair Orders <svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count"> {filterOrderFixing?.length} </span><span
            className="hind-font caption-12 c-dashboardInfo__subInfo"></span>
        </div>
      </div>
      <div className="c-dashboardInfo col-lg-3 col-md-6"  onClick={() => navigate("/user-repair-orders")} style={{cursor:"pointer"}}>
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Fixed<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">{filterOrderFixed?.length}</span>
        </div>
      </div>
     
      <div className="c-dashboardInfo col-lg-3 col-md-6"  onClick={() => navigate("/user-repair-orders")} style={{cursor:"pointer"}}>
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Repair Order Delivered<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">{filterOrderDelivered?.length}</span>
        </div>
      </div>
      <div className="c-dashboardInfo col-lg-3 col-md-6"  onClick={() => navigate("/user-repair-orders")} style={{cursor:"pointer"}}>
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Cancel Repair Orders<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">{filterOrderCancel?.length}</span>
        </div>
      </div>
      <div className="c-dashboardInfo col-lg-3 col-md-6"  onClick={() => navigate("/user-repair-orders")} style={{cursor:"pointer"}}>
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Unable to Repair<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count"> {filterOrderIrreparable?.length} </span>
        </div>
      </div>

      <div className="c-dashboardInfo col-lg-3 col-md-6"  onClick={() => navigate("/user-repair-orders")} style={{cursor:"pointer"}}>
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> Repair Settled<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path>
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">{filterOrderSettled?.length} </span>
        </div>
      </div>
    </div>
  </div>
</div>
        
        
        
        </>
    )
})

export default AdminMainDashboard