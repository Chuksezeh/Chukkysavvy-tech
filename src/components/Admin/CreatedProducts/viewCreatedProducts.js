

import { useEffect, useState } from "react";
// import AdminDashboard from "./adminDashboard";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { chukkytechAxios } from "../Utility/axios";
import { useForm } from "react-hook-form";
import { ButtonGroup, DropdownButton,Dropdown} from "react-bootstrap";
import moment from "moment";
import AdminDashboard from "../adminDashboard";
import { chukkytechAxios } from "../../Utility/axios";
import { Link } from "react-router-dom";
// import AdminDashboard from "../adminDashboard";
// import "./userRepairOrder.css"


const ViewCreatedProducts = (() => {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isDirty, isValid },
    } = useForm();
    const [showDropDown, setShowDropDown] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [successText, setSuccessText] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [pendingLocation, setPendingLocation] = useState(true);
    const [allLocations, setAllLocations] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false)
    const [locationData, setLocationData] = useState({})
    const [showDelete, setShowDelete] = useState(false);
    const [showDetails, setShowDetails]= useState(false)

    
    const fetchLocation = async () => {

        try {
            const response = await chukkytechAxios.get("/product/getAllProducts");
            setAllLocations(response.data);
            setPendingLocation(false);
        } catch (error) {
            setPendingLocation(false);
            console.error('Error fetching locations:', error);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);


// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
   
//       const response = await chukkytechAxios.get("/product/getAllProducts");
//       console.log("Products:", response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       console.error("Full error details:", error.response?.data);
//     }
//   };

//   fetchProducts();
// }, []);


    // console.log('fetchLocation', allLocations);


    const handleSubmitData = async data => {
        setLoading(true);

        const userData = {
            ...data,
            status: "Active"
        }


        await chukkytechAxios
            .post('location/registerLocation', userData)
            .then(res => {
                // console.log('res', res);
                setLoading(false);
                setSuccessMessage(true);
                setSuccessText(res.data.message)
                setShowModal(false)
                fetchLocation();

            })
            .catch(err => {
                console.log('err', err);
                setLoading(false);
                setErrorMessage(true);
                setErrMessage(err.response?.data)


            });
    };

    const handleShowModal = (() => {
        setShowModal(true)
    })

const handleShowDropDown = ((data)=>{
    setLocationData(data)

})

const handleSubmitEdit = async (data) => {
    setLoading(true);
    setErrorMessage(false);

    try {
       
        const payload = {
            locationId: locationData.locationId 
        };

        // Compare each field with original data and include only if changed
        if (data.locationName !== locationData.locationName) {
            payload.locationName = data.locationName;
        }
        if (data.locationAddress !== locationData.locationAddress) {
            payload.locationAddress = data.locationAddress;
        }
        if (data.phone !== locationData.phone) {
            payload.phone = data.phone;
        }
        if (data.shopName !== locationData.shopName) {
            payload.shopName = data.shopName;
        }
        if (data.longitude !== locationData.longitude) {
            payload.longitude = data.longitude;
        }
        if (data.latitude !== locationData.latitude) {
            payload.latitude = data.latitude;
        }

        // Only send the request if at least one field was changed
        if (Object.keys(payload).length > 1) { // More than just the ID
            const response = await chukkytechAxios.put(`location/updateLocation/${locationData.locationId}`, payload);
            
            // console.log('Update successful', response);
            setLoading(false);
            setSuccessMessage(true);
            setSuccessText(response?.data?.message)
            setShowEditModal(false);
            fetchLocation(); // Refresh the locations list
        } else {
            setLoading(false);
            setShowEditModal(false); // Close modal if no changes were made
        }
        
    } catch (err) {
        console.error('Update error', err);
        setLoading(false);
        setErrorMessage(true);
        setErrMessage(err.response?.data || { message: "Failed to update location" });
    }
};

    const handleShowModalEdit = (() => {
        showEditModal(true)
    })



    const handleSubmitDelete = async () => {
        if (!locationData?.productId) {
            setErrorMessage(true);
            setErrMessage("No product selected for deletion");
            return;
        }
    
        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);
    
        try {
            const response = await chukkytechAxios.delete(
                `/product/deleteProduct/${locationData.productId}`
            );
    
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Product deleted successfully");
            setShowDelete(false)
          
            await fetchLocation();
         
            setShowDelete(false);
            
            
        } catch (err) {
            console.error('Deletion failed:', err);
            
            const errorMsg = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to delete product";
            
            setErrorMessage(true);
            setErrMessage(errorMsg);
            
        } finally {
            setLoading(false);
        }
    };
    
   
console.log("viewall products", allLocations)



    return (

        <>


            <AdminDashboard />
            <div className="header-bar">

                <ul className="action-bar">

                    <li>Home /Products / <span className="addash"> View Created Products </span></li>
                </ul>
            </div>


            <div className="container">


                <h5>Search Locations</h5>
                <div className="row">
                    <div className="col-12">
                        <form className="input-group">
                            <input
                                className="form-control border-secondary py-2"
                                type="search"
                                placeholder="Search by name or email"


                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary h-100 w-100" type="submit">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <div className="p-2">   <button className="btn btn-primary p-2" onClick={handleShowModal}>Create location</button> </div> */}

            </div>
            {successMessage &&
                <div className="container mt-2">
                    <div className="row">

                        <div className="col-sm-12">
                            <div className="alert fade  alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">

                                <i className="start-icon far fa-check-circle faa-tada animated"></i>
                                <strong className="font__weight-semibold" style={{ color: "white" }}>Well done!</strong>

                                <span>  {successText}  </span>
                            </div>
                        </div>



                    </div>
                </div>
               }





            <div className="controlADMinorder_tb">
                <table>
                    <thead>
                        <tr className="table-headers ">
                            <th>SN</th>
                            <th>Product name</th>
                            <th>Company name</th>
                            <th>Product price</th>
                            <th>status</th>
                            <th>Created date</th>
                           
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allLocations && allLocations.map((data, i) => (

                                <tr key={data.locationId}>
                                    <td data-label="SN"> {i+1} </td>
                                    <td data-label="Product name">{data.productName} </td>
                                    <td data-label="Company name"> {data.companyName} </td>
                                    <td data-label="Product price"> {data.productPrice} </td>
                                    <td data-label="status"> {data.status} </td>
                                    <td data-label="Created date">  {moment(data.createdDateTime).format("lll")}  </td>
                                    
                                    <td>
                                    {[DropdownButton].map((DropdownType, idx) => (
                                        <DropdownType
                                            as={ButtonGroup}
                                            key={idx}
                                            id={`dropdown-button-drop-${idx}`}
                                            size="lg"
                                            title="Action"
                                            onClick={() => handleShowDropDown(data)}
                                        >
                                            <Dropdown.Item eventKey="3" as={Link} to={`/product/${data.productId}`}>
                                                Product Details
                                            </Dropdown.Item>
                                           
                                         
                                            <Dropdown.Divider />
                                            <Dropdown.Item eventKey="4" style={{ color: "red" }} onClick={() => setShowDelete(true)}>
                                                Delete Product
                                            </Dropdown.Item>
                                        </DropdownType>
                                    ))}
                                    </td>
                                </tr>


                            ))
                        }


                    </tbody>
                </table>

                {
      pendingLocation && <div style={{justifyContent:"center", textAlign:"center", padding:"10px"}}> <span className="loader-circle"></span></div>
           }
 
              {
      allLocations.length === 0  && !pendingLocation  &&  <div style={{justifyContent:"center", textAlign:"center", padding:"10px"}}> <span > No product available  </span></div>
         }


            </div>

          
          <Modal show={showDelete} onHide={() => setShowDelete(false)} size="">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <div>Are you sure you want to delete this product?</div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>
                        Close
                    </Button>

                    {
                        loading ? <Button className="btn btn-primary" variant="primary" >
                            <span className="loader"></span>
                        </Button> : <Button style={{ background: "red" }}  onClick={handleSubmitDelete}>
                        Delete
                        </Button>
                    }

                </Modal.Footer>
            </Modal>





               <Modal show={showDetails} onHide={() => setShowDetails(false)} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Product Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
<div>
    <div>
     <div style={{fontWeight: "bold"}}> Product name </div>
      <div>{locationData.productName} </div>

    </div>
</div>

                   


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetails(false)}>
                        Close
                    </Button>

                   

                </Modal.Footer>
            </Modal>

        </>

    )
})

export default ViewCreatedProducts;


