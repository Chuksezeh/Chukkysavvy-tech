import { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard";
import "./userRepairOrder.css"
import { useNavigate } from "react-router-dom";
import { chukkytechAxios } from "../../Utility/axios";
import moment from "moment";


const ProductOrderTable = (()=>{


    const [showDropDown, setShowDropDown] = useState("");
    const [isPending, setIsPending] = useState(true);

const [errMessage, setErrMessage] = useState("");
  const [itemData, setItemData] = useState({});
  const [data, setData] = useState([]);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState("");



    const handleShowDropDown = () => {
  
      setShowDropDown(!showDropDown)
    }
  

    const navigate = useNavigate();
    
        useEffect(() => {
            const adminsInfo = localStorage.getItem('adminsInfo');
            // console.log('UserInfo:', userInfo);
          
            if (!adminsInfo) {
              navigate('/admin-login');
            }
          }, [navigate]);
    
    const fetchAllProductOrders = async () => {
    // setIsPending(true);
    try {


      const response = await chukkytechAxios.get('/order/all-orders');
      // const response = await chukkytechAxios.get("/order/orders/getAllProductOrders ");
      setData(response.data);

      console.log("All product orders:", response.data);
      setFilteredOrders(response?.data?.data);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      console.error('Error fetching tracking:', error);
    }
  };

  useEffect(() => {
    fetchAllProductOrders()
  }, []);


const checkColor = (item) => {
    switch (item) {
      case "Processing":
        return "green";
      case "pickedUp":
        return "blue";
      case "fixing":
        return "purple";
      case "fixed":
        return "brown";
      case "delivered":
        return "darkgreen";
      case "cancel":
        return "red";
      default:
    }
  };


  console.log("Data:", data);

const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const totalPages = Math.ceil(filteredOrders?.length / ordersPerPage);
  const paginatedOrders = filteredOrders?.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

   return(

<>


<AdminDashboard />
      <div className="header-bar">

        <ul className="action-bar">

          <li><a href="/"> Home</a> / Orders / <span className="addash"> Product Orders </span></li>
        </ul>
      </div>


     <div className="container">
        <h4 style={{ textAlign: "center" }}>Search order</h4>
        <span>Search by orderCode</span>
        <div className="row">

          <div className="col-6">

            <div className="input-group">
              <input
                className="form-control border-secondary py-2"
                type="search"
                placeholder="Search by order number, device name"
                onChange={(e) => setSearchTerm(e.target.value)}
              />

            </div>
          </div>
          <div className="col-6">
            <div className="input-group">
              {/* <span>Search by status</span> */}
              <select className="form-control border-secondary py-2" value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="all">Select status</option>
                <option value="pickedUp">Picked up</option>
                <option value="fixing">Fixing</option>
                <option value="fixed">Fixed</option>
                <option value="delivered"> Delivered</option>
                <option value="irreparable"> Cannot fix</option>
                <option value="cancel"> Cancelled</option>
                <option value="settled">Settled</option>
              </select>
            </div>
          </div>
        </div>
        <p></p>
        <span>Select order type</span>
        <div className="col-12">
          <div className="input-group">
            <select className="form-control border-secondary py-2" value={selectedOrderType}
              onChange={(e) => setSelectedOrderType(e.target.value)}>
              <option value="all">Select order type</option>
              <option value="Pickup"> Pickup</option>
              <option value="Instore Appointment">Instore Apointment</option>

            </select>
          </div>
        </div>
      </div>
 <div className="controlADMinorder_tb">
        <table>
          <thead>
            <tr className="table-headers">
              <th>SN</th>
              <th> Order Code</th>
              <th>Customer name</th>
              <th>Customer email</th>
              <th>Order status</th>
              {/* <th>Order type</th> */}
              <th>Created date</th>
             
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((item, i) => (
              <tr key={item.repairOrderCode}>
                <td data-label=""> {i + 1} </td>
                <td data-label="Order Code"> {item.repairOrderCode} </td>
                <td data-label="Customer name">{item.customerName} </td>
                <td data-label="Customer email"> {item.customerEmail} </td>
               

                <td data-label="Order status" style={{ color: checkColor(item.status),
                   fontWeight: "bold", textTransform: "capitalize" }} className="tansDroP"> {item?.orderStatus} </td>
                {/* <td data-label="Order type"> {item.repairOrderType} </td> */}
                <td data-label="Order due date"> {moment(item.createdDate).format("lll")}</td>
                
                
                <td>
                  <button className="btn btn-primary" onClick={() => navigate(`/single-product-order/${item.orderId}`)}>View/manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Loader for pending state */}
        {isPending && (
          <div style={{ width: "100%", justifyContent: "center", textAlign: "center" }}>
            <span style={{ margin: "0 auto" }} className="loader-come"></span>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="pagination">
          <button disabled={currentPage === 1} className="btn btn-primary" onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button disabled={currentPage === totalPages} className="btn btn-primary" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
      <br />



</>

   )
})

export default ProductOrderTable;