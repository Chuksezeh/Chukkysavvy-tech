import { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard";
import useGetData from "../../Utility/getFunction";
import { chukkytechAxios } from "../../Utility/axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from "moment";

const RepairOrderTable = () => {
  const [showDropDown, setShowDropDown] = useState(null);
  const [orderData, setOrderData] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successTex, setSuccessText] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [itemData, setItemData] = useState({});
  const [data, setData] = useState([]);

  const [isPending, setIsPending] = useState(true);


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrderType, setSelectedOrderType] = useState("");

  // Add a filteredOrders state to manage what is displayed
  const [filteredOrders, setFilteredOrders] = useState([]);


  const handleShowDropDown = (orderId) => {
    setShowDropDown((prev) => (prev === orderId ? null : orderId));
  };


  const fetchAdminRepairOrder = async () => {
    setIsPending(true);
    try {
      const response = await chukkytechAxios.get("adminRepair/getAllRepairOrder");
      setData(response.data);
      setIsPending(false);
    } catch (error) {
      setIsPending(false);
      console.error('Error fetching tracking:', error);
    }
  };

  useEffect(() => {
    fetchAdminRepairOrder()
  }, []);

  // const { data, isPending, error } = useGetData("adminRepair/getAllRepairOrder");
  const [loading, setLoading] = useState(false);

  const [progressStatus, setProgressStatus] = useState("");

  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);

  const userInfo = localStorage.getItem('adminsInfo');
  const userData = JSON.parse(userInfo);

  const handleGetDetails = ((item) => {
    setItemData(item);

  })


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

  console.log("Latest Orders:", latestOrders);


  const handleUpdateKeys = ((e, item) => {

    if (e.target.value === "viewDetail") {
      handleShowDetails()
    } else if (e.target.value === "action")
      return
    else {
      handleShow();
    }


    if (e.target.value === "pickedUp") {
      setProgressStatus("pickedUp")
    } else if (e.target.value === "fixing") {
      setProgressStatus("fixing")
    } else if (e.target.value === "fixed") {
      setProgressStatus("fixed")
    } else if (e.target.value === "delivered") {
      setProgressStatus("delivered")
    } else if (e.target.value === "cancel") {
      setProgressStatus("cancel")
    } else if (e.target.value === "irreparable") {
      setProgressStatus("irreparable")
    } else if (e.target.value === "settled") {
      setProgressStatus("settled")
    }


  })




  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
  
    const results = latestOrders.filter((order) => {
      const matchesSearch =
        order.repairOrderCode?.toLowerCase().includes(lowerSearch) ||
        order.deviceType?.toLowerCase().includes(lowerSearch);
  
      const matchesStatus = selectedStatus === "all" || !selectedStatus
        ? true
        : order.status === selectedStatus;
  
      const matchesOrderType = selectedOrderType === "all" || !selectedOrderType
        ? true
        : order.repairOrderType === selectedOrderType;
  
      return matchesSearch && matchesStatus && matchesOrderType;
    });
  
    setFilteredOrders(results);
  }, [searchTerm, selectedStatus, selectedOrderType, latestOrders]);
  
  
  


console.log("repairOrderType>>>>", filteredOrders)






  // console.log("checkvalue", progressStatus)

  const handleUpdateDeviceData = async (data) => {
    try {
      setLoading(true);


      // if (!userData || !userData.userId) {
      //     console.error("No user data found. Redirecting to login.");
      //     setShowNoLogin(true);
      //     setLoading(false);
      //     return;
      // }

      const deviceData = {
        details: itemData?.details,
        deviceModel: itemData?.deviceModel,
        deviceType: itemData?.deviceType,
        phone: itemData?.phone,
        pickUpAddress: itemData?.pickUpAddress,
        reserveDate: itemData?.reserveDate,
        userId: itemData?.userId,
        repairOrderId: itemData?.repairOrderId,
        repairOrderType: itemData?.repairOrderType,
        userId: itemData?.userId,
        status: progressStatus,
        repairOrderCode: itemData?.repairOrderCode
      };

      console.log("Sending data:", deviceData);

      const res = await chukkytechAxios.post('repair/repairorder', deviceData);
      const result = res.data;

      setLoading(false);
      setOrderData(result?.repairOrder);
      setSuccessText(res?.data?.message);
      setSuccessMessage(true);
      handleClose();
      setTimeout(() => {
        setSuccessMessage(false);
      }, 4000);
      fetchAdminRepairOrder()

    } catch (err) {
      console.error("API error:", err);
      setLoading(false);
      handleClose();
      setErrorMessage(true);
      setErrMessage(err.response?.data || "An error occurred");
    }
  };


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

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );


  // const itemsPerPage = 10;


  // const totalPages = Math.ceil(latestOrders.length / itemsPerPage);


  // const paginatedOrders = latestOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <>
      <AdminDashboard />
      <div className="header-bar">
        <ul className="action-bar">
          <li>
          <a href="/"> Home</a>   / Orders / <span className="addash"> Repair Orders </span>
          </li>
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

       {

        successMessage &&
        <div className="container mt-2">
          <div className="row">

            <div className="col-sm-12">
              <div className="alert fade  alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">

                <i className="start-icon far fa-check-circle faa-tada animated"></i>
                <strong className="font__weight-semibold" style={{ color: "white" }}>Well done!</strong> Order updated succesfully.
              </div>
            </div>



          </div>
        </div>
      }

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


      <div className="controlADMinorder_tb">
        <table>
          <thead>
            <tr className="table-headers">
              <th>SN</th>
              <th>Repair Order Code</th>
              <th>Device name</th>
              <th>Device model</th>
              <th>Device fault</th>
              <th>Order type</th>
              <th>Order due date</th>
              <th>Created date</th>
              <th>Phone number</th>
              <th>Pickup Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((item, i) => (
              <tr key={item.repairOrderCode}>
                <td data-label="Repair Order Code"> {i + 1} </td>
                <td data-label="Repair Order Code"> {item.repairOrderCode} </td>
                <td data-label="Device name">{item.deviceType} </td>
                <td data-label="Device model"> {item.deviceModel} </td>
                <td data-label="Device fault"> {item?.details.slice(0, 50)} </td>
                <td data-label="Order type"> {item.repairOrderType} </td>
                <td data-label="Order due date"> {moment(item.reserveDate).format("lll")}</td>
                <td data-label="Created date"> {moment(item.createdDateTime).format("lll")}</td>
                <td data-label="Phone number"> {item.phone} </td>
                <td data-label="Pickup Address"> {item.pickUpAddress} </td>
                <td data-label="Status" style={{ color: checkColor(item.status), fontWeight: "bold", textTransform: "capitalize" }} className="tansDroP"> {item.status} </td>
                <td>
                  <select className="form-control border-secondary" onChange={handleUpdateKeys} onClick={() => handleGetDetails(item)}>
                    <option value="action">Action</option>
                    <option value="viewDetail">View details</option>
                    <option value="pickedUp">Picked up</option>
                    <option value="fixing">Fixing</option>
                    <option value="fixed">Fixed</option>
                    <option value="delivered">Delivered</option>
                    <option value="irreparable">Unable to Repair</option>
                    <option value="settled">Settled</option>
                    <option value="cancel">Cancel</option>
                  </select>
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
      <br />



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {
            progressStatus === "pickedUp" && <div>
              <p>  Are you sure you want to update the status of this order as <span style={{ fontWeight: "bold" }}>Picked Up</span>? </p>
            </div>
          }

          {
            progressStatus === "fixing" && <div>
              <p>  Are you sure you want to update the status of this order as <span style={{ fontWeight: "bold" }}>Fixing</span>? </p>
            </div>
          }

          {
            progressStatus === "fixed" && <div>
              <p>  Are you sure you want to update the status of this order as <span style={{ fontWeight: "bold" }}>Fixed</span>? </p>
            </div>
          }
          {
            progressStatus === "delivered" && <div>
              <p> Are you sure you want to update the status of this order as <span style={{ fontWeight: "bold" }}>Delivered</span>? </p>
            </div>
          }
          {
            progressStatus === "cancel" && <div>
              <p> Are you sure you want to <span style={{ fontWeight: "bold" }}>Cancel</span> this order? </p>
            </div>
          }
          {
            progressStatus === "irreparable" && <div>
              <p> Are you sure you want to <span style={{ fontWeight: "bold" }}>Mark this order as "Unable to Repair"?</span>  </p>
            </div>
          }
          {
            progressStatus === "settled" && <div>
              <p> Are you sure you want to <span style={{ fontWeight: "bold" }}>settle </span> this order </p>
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          {
            loading ? <Button variant="primary">
              <span class="loader">
              </span>
            </Button> : <Button variant="primary" onClick={() => handleUpdateDeviceData()}>
              Proceed
            </Button>
          }

        </Modal.Footer>
      </Modal>


      <Modal show={showDetails} onHide={handleCloseDetails} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Device Repair Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div id="bot">
            <div id="table">
              <table>
                <tbody>
                  <tr className="service">
                    <td className="tableitem"><p className="itemtext">Repair Order Code</p></td>
                    <td className="tableitem"><p className="itemtext">{itemData.repairOrderCode}</p></td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem"><p className="itemtext">Device Type</p></td>
                    <td className="tableitem"><p className="itemtext">{itemData.deviceType}</p></td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem"><p className="itemtext">Device Model</p></td>
                    <td className="tableitem"><p className="itemtext">{itemData.deviceModel}</p></td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem"><p className="itemtext">Order Type</p></td>
                    <td className="tableitem"><p className="itemtext">{itemData.repairOrderType}</p></td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem"><p className="itemtext">Due Reserved Date Time</p></td>
                    <td className="tableitem"><p className="itemtext">{moment(itemData.reserveDate).format("lll")}</p></td>
                  </tr>
                  <tr className="service">
                    <td className="tableitem"><p className="itemtext">Booked On</p></td>
                    <td className="tableitem"><p className="itemtext">{moment(itemData.reserveDate).format("lll")}</p></td>
                  </tr>
                </tbody>
              </table>

              {/* Issue Description */}
              <div>
                <h5>Device Issue Description</h5>
                <span>{itemData.details}</span>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>





    </>
  );
};

export default RepairOrderTable;
