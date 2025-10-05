
import React, { useRef } from "react";
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
import "./viewCompany.css"
// import AdminDashboard from "../adminDashboard";
// import "./userRepairOrder.css"


const  ViewCompanies = (() => {



    

      
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
    const [allCompanies, setAllCompanies] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false)
    const [locationData, setLocationData] = useState({})
    const [showDelete, setShowDelete] = useState(false);

     const userInfo = localStorage.getItem("adminsInfo");
      const userData = JSON.parse(userInfo);

      const createdUserId = useRef(); 

      createdUserId.current = userData.userId


    //  console.log("adminsInfo>>>", userData?.userId)

    const fetchLocation = async () => {

        try {
            const response = await chukkytechAxios.get("company/getAllCompanies");
            setAllCompanies(response.data);
            setPendingLocation(false);
        } catch (error) {
            setPendingLocation(false);
            console.error('Error fetching locations:', error);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    console.log('fetchcompanies>>>>', allCompanies);


    const handleSubmitData = async data => {
        setLoading(true);

        const payLoad = {
            ...data,
            status: "Active",
            createdBy: createdUserId.current
        }

          console.log('res companyata>>>>', payLoad);
        await chukkytechAxios
            .post('company/registerCompany', payLoad)
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
                setErrMessage(err.response?.data?.error)


            });
    };

    const handleShowModal = (() => {
        setShowModal(true)
    })

    const companyDataRef = useRef();

const handleShowDropDown = ((data)=>{
     
    // companyDataRef.current = data
    setLocationData(data)

})

const handleSubmitEdit = async (data) => {
    setLoading(true);
    setErrorMessage(false);

    try {
       
        const payload = {
            companyId: locationData.companyId 
        };

        // Compare each field with original data and include only if changed
        if (data.companyName !== locationData.companyName) {
            payload.companyName = data.companyName;
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
        if (!locationData?.companyId) {
            setErrorMessage(true);
            setErrMessage("No company selected for deletion");
            return;
        }
    
        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);
    
        try {
            const response = await chukkytechAxios.delete(
                `company/deleteCompany/${locationData.companyId}`
            );
    
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Company deleted successfully");
            setShowDelete(false)
          
            await fetchLocation();
         
            setShowDelete(false);
            
            
        } catch (err) {
            console.error('Deletion failed:', err);
            
            const errorMsg = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to delete comment";
            
            setErrorMessage(true);
            setErrMessage(errorMsg);
            
        } finally {
            setLoading(false);
        }
    };
    
   




    return (

        <>


            <AdminDashboard />
            <div className="header-bar">

                <ul className="action-bar">

                    <li>Home /Company / <span className="addash"> View Companies </span></li>
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
                <div className="p-2">   <button className="btn btn-primary p-2" onClick={handleShowModal}>Create Company</button> </div>

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
                        <tr className="table-headers">
                            <th>SN</th>
                             <th>Company Code</th>
                            <th>Company name</th>
                            <th>Location </th>
                            <th>Full name</th>
                            <th>Phone number</th>
                             <th>Email address</th>
                            <th>status</th>
                            <th>Created date</th>
                           
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allCompanies && allCompanies.map((data, i) => (

                                <tr key={data.locationId}>
                                    <td data-label="SN"> {i+1} </td>
                                    <td data-label="Company code"> {data.companyCode} </td>
                                    <td data-label="Company name">{data.companyName} </td>
                                    <td data-label="Location "> {data.location} </td>
                                    <td data-label="Full name"> {data.firstName} {data.lastName}</td>
                                      <td data-label="Phone number"> {data.phoneNumber} </td>
                                      <td data-label="Email"> {data.emailAddress} </td>
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
                                                onClick={()=>handleShowDropDown(data)}

                                            >
                                                {/* <Dropdown.Item eventKey="1">View user</Dropdown.Item> */}

                                                <Dropdown.Item eventKey="3" onClick={()=>setShowEditModal(true)}>
                                                 Edit location

                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item eventKey="4" style={{ color: "red" }} onClick={()=>setShowDelete(true)}>Delete location</Dropdown.Item>
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
      allCompanies.length === 0  && !pendingLocation  &&  <div style={{justifyContent:"center", textAlign:"center", padding:"10px"}}> <span > No location available  </span></div>
    }


            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form id="survey-form" onSubmit={handleSubmit((data, event) => {
                        event.target.reset()
                        // console.log('seedataNow', data);
                        handleSubmitData(data);
                    })}>

                        <span style={{color:"red"}}>*</span> Indicates required fields
                        <br/>

                        <div className="row">

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Company Name <span style={{color:"red"}}>*</span> </label>
                                    <input id="name" placeholder="Enter company name..." className="form-control"

                                        {...register("companyName", {
                                            required: 'Company name is required',
                                            maxLength: {},
                                        })} />
                                    <span className="cum-error">{errors.companyName?.message}</span>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label id="name-label" for="name">Owner firstName <span style={{color:"red"}}>*</span></label>
                                    <input id="name" placeholder="Enter owner first name" className="form-control"

                                        {...register("firstName", {
                                            required: 'First name is required',
                                            maxLength: {},
                                        })} />
                                    <span className="cum-error">{errors.firstName?.message}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="number-label" for="number">LastName <span style={{color:"red"}}>*</span></label>
                                        <input placeholder="Enter last name" className="form-control"

                                            {...register("lastName", {
                                                required: 'Last name is required',
                                                maxLength: {},
                                            })} />
                                        <span className="cum-error">{errors.lastName?.message}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="number-label" for="number">Company Location <span style={{color:"red"}}>*</span></label>
                                        <input type="text" placeholder="Enter company location" className="form-control"{...register("location",{
                                            required: "Company location is required"
                                        })} />
                                        <span className="cum-error">{errors.location?.message}</span>
                                    </div>
                                </div>

                            </div>

                             <div className="col-md-12">
                                <div className="form-group">
                                    <label id="name-label" for="name">Company Address <span style={{color:"red"}}>*</span></label>
                                    <input id="name" placeholder="Enter company address" className="form-control"

                                        {...register("companyAddress", {
                                            required: 'Company address is required',
                                            maxLength: {},
                                        })} />
                                    <span className="cum-error">{errors.companyAddress?.message}</span>
                                </div>
                            </div>
                            <hr />
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="number-label" for="number">Phone Number <span style={{color:"red"}}>*</span></label>
                                        <input placeholder="Enter  phone number" className="form-control"

                                            {...register("phoneNumber",{
                                                required:"Phone number is required"
                                            }
                                                
                                            )} />
                                        <span className="cum-error">{errors.phoneNumber?.message}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="number-label" for="number">Email Address <span style={{color:"red"}}>*</span></label>
                                        <input type="text" placeholder="Enter email address" className="form-control"{...register("emailAddress",{
                                            required:"Email address is required"
                                        })} />
                                        <span className="cum-error">{errors.emailAddress?.message}</span>
                                    </div>
                                </div>

                            </div>
                            

                             <hr />
                            <div className="row">

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label id="number-label" for="number">RC Number</label>
                                        <input placeholder="Enter  Logitude" className="form-control"

                                            {...register("rcNumber")} />
                                        <span className="cum-error">{errors.rcNumber?.message}</span>
                                    </div>
                                </div>
                                {/* <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="number-label" for="number">Email Address</label>
                                        <input type="text" placeholder="Enter latitude" className="form-control"{...register("emailAddress")} />
                                        <span className="cum-error">{errors.emailAddress?.message}</span>
                                    </div>
                                </div> */}

                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-12">


                                {
                                    loading ? <button className="submitbtn-Control"> <span class="loader"></span></button> : <button className="btn btn-primary p-2 submitbtn-Control" type="submit" >Create Company</button>
                                }

                            </div>
                        </div>

                        {

                            errorMessage &&
                            <div className="container mt-2">
                                <div className="row">

                                    <div class="col-sm-12">
                                        <div className="alert   alert-danger  " role="alert" >

                                            <span> {errMessage.message || errMessage}   </span>

                                        </div>
                                    </div>



                                </div>
                            </div>
                        }

                    </form>



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>


                </Modal.Footer>
            </Modal>


            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
    <Modal.Header closeButton>
        <Modal.Title>Edit Location</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <form id="edit-location-form" onSubmit={handleSubmit(handleSubmitEdit)}>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label>Company Name</label>
                        <input 
                             
                            placeholder="Enter company name, eg. Wuse, Kubwa" 
                            className="form-control"
                            defaultValue={locationData?.companyName}
                            {...register("companyName")} 
                        />
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="locationAddress">Location Address</label>
                        <input 
                            id="locationAddress" 
                            placeholder="Enter location address" 
                            className="form-control"
                            defaultValue={locationData?.locationAddress}
                            {...register("locationAddress")} 
                        />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="phone">Center Phone Number</label>
                            <input 
                                id="phone"
                                placeholder="Enter phone number" 
                                className="form-control"
                                defaultValue={locationData?.phone}
                                {...register("phone")} 
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="shopName">Shop / plaza name, no.</label>
                            <input 
                                id="shopName"
                                type="text" 
                                placeholder="Enter shop name"  
                                defaultValue={locationData?.shopName}   
                                className="form-control"
                                {...register("shopName")} 
                            />
                        </div>
                    </div>
                </div>
                
                <hr />
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="longitude">Longitude</label>
                            <input 
                                id="longitude"
                                placeholder="Enter Longitude" 
                                className="form-control"
                                defaultValue={locationData?.longitude} 
                                {...register("longitude")} 
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="latitude">Latitude</label>
                            <input 
                                id="latitude"
                                type="text" 
                                placeholder="Enter latitude" 
                                defaultValue={locationData?.latitude} 
                                className="form-control"
                                {...register("latitude")} 
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    {loading ? (
                        <button className="btn btn-primary p-2" disabled>
                            <span className="loader"></span> Updating...
                        </button>
                    ) : (
                        <button className="btn btn-primary p-2" type="submit">
                            Update Location
                        </button>
                    )}
                </div>
            </div>

            {errorMessage && (
                <div className="container mt-2">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="alert alert-danger" role="alert">
                                <span>{errMessage?.message || "Something went wrong, please try again"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
        </Button>
    </Modal.Footer>
</Modal>


           <Modal show={showDelete} onHide={() => setShowDelete(false)} size="">
                <Modal.Header closeButton>
                    <Modal.Title>Delete company</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <div>Are you sure you want to delete this company?</div>


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

        </>

    )
})

export default ViewCompanies;