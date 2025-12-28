import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header";
import useGetData from "../../Utility/getFunction";
import AdminDashboard from "../adminDashboard";
import "./adminMainDashboard.css";
import { useEffect, useMemo } from "react";
import Footer from "../../layouts/Footer";

const AdminMainDashboard = () => {
  const { data, isPending, error } = useGetData("adminRepair/getAllRepairOrder");
  const navigate = useNavigate();


   const { data:products, isPending: isPendingProduct, error: isPendingError } = useGetData("/order/all-orders");


  //  console.log("all products", products.data)

const filterPendingOrders = products.data && products.data?.filter((product)=>(
             product.orderStatus === "pending"  

))

const filterConfirmedOders = products.data && products.data?.filter((product)=>(
             product.orderStatus === "confirmed"  

))

const filterProccessingOders = products.data && products.data?.filter((product)=>(
             product.orderStatus === "processing"  

))

const filterCompletedOders = products.data && products.data?.filter((product)=>(
             product.orderStatus === "delivered"

))

const filterCanceledOders = products.data && products.data?.filter((product)=>(
             product.orderStatus === "cancelled"

))



// console.log("filterPendingOrders", filterPendingOrders)
 

  // Memoized data processing for better performance
  // const dashboardData = useMemo(() => {
  //   if (!data || !Array.isArray(data.repairOrders)) {
  //     return {
  //       latestOrders: [],
  //       statusCounts: {
  //         processing: 0,
  //         fixing: 0,
  //         pickedUp: 0,
  //         fixed: 0,
  //         delivered: 0,
  //         cancel: 0,
  //         irreparable: 0,
  //         settled: 0
  //       }
  //     };
  //   }

  //   const ordersArray = data.repairOrders;
    
  //   // Get latest orders by repairOrderCode
  //   const latestOrders = ordersArray.reduce((acc, order) => {
  //     if (!acc[order.repairOrderCode] || 
  //         new Date(order.createdDateTime) > new Date(acc[order.repairOrderCode].createdDateTime)) {
  //       acc[order.repairOrderCode] = order;
  //     }
  //     return acc;
  //   }, {});

  //   const latestOrdersArray = Object.values(latestOrders);

  //    console.log("latestOrdersArray ", latestOrdersArray )

  //   // Count orders by status
  //   const statusCount = latestOrdersArray.reduce((acc, order) => {
  //     const status = order.status?.toLowerCase();
  //     if (status && acc.hasOwnProperty(status)) {
  //       acc[status]++;
  //     }
  //     return acc;
  //   }, {
  //     processing: 0,
  //     fixing: 0,
  //     pickedup: 0,
  //     fixed: 0,
  //     delivered: 0,
  //     cancel: 0,
  //     irreparable: 0,
  //     settled: 0
  //   });

  //   return { latestOrders: latestOrdersArray, statusCount };
  // }, [data]);

 
  const getLatestRepairOrders = (orders) => {
    if (!Array.isArray(orders)) {
      console.error("Expected an array, but got:", orders);
      return [];
    }
  
    // console.log("Processing Orders:", orders);
  
    const latestOrders = data.reduce((acc, order) => {
      // console.log("Checking Order:", order);
  
      if (
        !acc[order.repairOrderCode] || 
        new Date(order.createdDateTime) > new Date(acc[order.repairOrderCode].createdDateTime)
      ) {
        acc[order.repairOrderCode] = order;
      }
      return acc;
    }, {}); // Store latest orders in an object
  
    // console.log("Latest Orders Object:", latestOrders);
  
    return Object.values(latestOrders); // Convert the object to an array
  };
  
  // Example usage:
  const ordersArray = Array.isArray(data.repairOrders) ? data.repairOrders : [];
  const latestOrders = getLatestRepairOrders(ordersArray);
  
  // console.log("Lateseeeee:", latestOrders);
  
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


    useEffect(() => {
        const adminsInfo = localStorage.getItem('adminsInfo');
        // console.log('UserInfo:', userInfo);
      
        if (!adminsInfo) {
          navigate('/admin-login');
        }
      }, [navigate]);


  // Dashboard cards configuration
  const repairOrderCards = [
    {
      title: "Pending Repair Orders",
      count: filterOrderProcessing?.length,
      status: "processing",
      color: "warning",
      icon: "⏳",
      description: "Awaiting technician assignment"
    },
    {
      title: "Repair Order Picked Up",
      count: filterOrderpickedUp?.length,
      status: "pickedUp",
      color: "info",
      icon: "📦",
      description: "Devices collected from customers"
    },
    {
      title: "Fixing Repair Orders",
      count: filterOrderFixing?.length,
      status: "fixing",
      color: "primary",
      icon: "🔧",
      description: "Currently being repaired"
    },
    {
      title: "Fixed Orders",
      count: filterOrderFixed?.length,
      status: "fixed",
      color: "success",
      icon: "✅",
      description: "Repairs completed successfully"
    },
    {
      title: "Delivered Orders",
      count: filterOrderDelivered?.length,
      status: "delivered",
      color: "secondary",
      icon: "🚚",
      description: "Returned to customers"
    },
    {
      title: "Cancelled Orders",
      count: filterOrderCancel?.length,
      status: "cancel",
      color: "danger",
      icon: "❌",
      description: "Cancelled repair requests"
    },
    {
      title: "Unable to Repair",
      count: filterOrderIrreparable?.length,
      status: "irreparable",
      color: "dark",
      icon: "⚠️",
      description: "Devices beyond repair"
    },
    {
      title: "Repair Settled",
      count: filterOrderSettled?.length,
      status: "settled",
      color: "light",
      icon: "💰",
      description: "Financial settlements completed"
    }
  ];

  const productOrderCards = [
    {
      title: "Pending Product Orders",
      count: filterPendingOrders?.length,
      status: "pending",
      color: "warning",
      icon: "🛒",
      description: "Awaiting processing"
    },
    {
      title: "Confirmed Product Orders",
      count: filterConfirmedOders?.length,
      status: "confirmed",
      color: "info",
      icon: "✓",
      description: "Orders confirmed"
    },
    {
      title: "Processing Product Orders",
      count: filterProccessingOders?.length,
      status: "processing",
      color: "primary",
      icon: "⚙️",
      description: "Being prepared for shipment"
    },
    {
      title: "Completed Product Orders",
      count: filterCompletedOders?.length,
      status: "completed",
      color: "success",
      icon: "🎉",
      description: "Successfully delivered"
    },
    {
      title: "Cancelled Product Orders",
      count: filterCanceledOders?.length,
      status: "cancelled",
      color: "danger",
      icon: "🚫",
      description: "Cancelled orders"
    }
  ];

  useEffect(() => {
    const adminsInfo = localStorage.getItem('adminsInfo');
    if (!adminsInfo) {
      navigate('/admin-login');
    }
  }, [navigate]);

  // Skeleton loader component
  const CardSkeleton = () => (
    <div className="dashboard-card skeleton">
      <div className="card-header-skeleton">
        <div className="skeleton-icon"></div>
        <div className="skeleton-title"></div>
      </div>
      <div className="card-content-skeleton">
        <div className="skeleton-count"></div>
        <div className="skeleton-description"></div>
      </div>
    </div>
  );

  // Dashboard Card Component
  const DashboardCard = ({ title, count, icon, color, description, onClick }) => (
    <div 
      className={`dashboard-card card-${color}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-content">
        <div className="card-count">{count}</div>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-footer">
        <span className="view-link">View Details →</span>
      </div>
    </div>
  );

const storedUser = JSON.parse(localStorage.getItem("adminsInfo")); 

  return (
    <>
      <AdminDashboard />
      
      <div className="admin-dashboard-container container ">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title"> Hello! {storedUser?.firstName}  <span style={{fontStyle:"italic", fontSize:"22px"}}>( {storedUser?.role} )</span>  </h1>
            <p className="dashboard-subtitle">Monitor and manage repair orders and product sales</p>
          </div>
          <div className="header-actions">
            <div className="quick-stats">
              <div className="quick-stat">
                <span className="stat-label">Total Repair Orders</span>
                <span className="stat-value">{latestOrders?.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Repair Orders Section */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🔧</span>
                Device Repair Orders
              </h2>
              <button 
                className="view-all-btn"
                onClick={() => navigate("/user-repair-orders")}
              >
                View All Orders
              </button>
            </div>
            
            <div className="cards-grid">
              {isPending ? (
                Array.from({ length: 8 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              ) : error ? (
                <div className="error-state">
                  <div className="error-icon">⚠️</div>
                  <h3 >Unable to load data</h3>
                  <p>Please try refreshing the page</p>
                </div>
              ) : (
                repairOrderCards.map((card, index) => (
                  <DashboardCard
                    key={index}
                    title={card.title}
                    count={card.count}
                    icon={card.icon}
                    color={card.color}
                    description={card.description}
                    onClick={() => navigate("/user-repair-orders")}
                  />
                ))
              )}
            </div>
          </section>

          {/* Product Orders Section */}
          <section className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">📦</span>
                Product Orders
              </h2>
              <button 
                className="view-all-btn"
                onClick={() => navigate("/product-orders")}
              >
                View All Orders
              </button>
            </div>
            
            <div className="cards-grid">
              {productOrderCards.map((card, index) => (
                <DashboardCard
                  key={index}
                  title={card.title}
                  count={card.count}
                  icon={card.icon}
                  color={card.color}
                  description={card.description}
                  onClick={() => navigate("/product-orders")}
                />
              ))}
            </div>
          </section>
        </div>
      </div>


      <section style={{marginTop: "5%" }}>
  <Footer/>
      </section>

    </>
  );
};

export default AdminMainDashboard;