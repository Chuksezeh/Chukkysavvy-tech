import { useEffect, useState } from "react";
import AdminDashboard from "./adminDashboard";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { chukkytechAxios } from "../Utility/axios";
import { useForm } from "react-hook-form";
import { ButtonGroup, DropdownButton,Dropdown} from "react-bootstrap";
import moment from "moment";
// import AdminDashboard from "../adminDashboard";
// import "./userRepairOrder.css"


const AdminLocations = (() => {

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

    const fetchLocation = async () => {

        try {
            const response = await chukkytechAxios.get("location/getAllLocations");
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
        if (!locationData?.locationId) {
            setErrorMessage(true);
            setErrMessage("No location selected for deletion");
            return;
        }
    
        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);
    
        try {
            const response = await chukkytechAxios.delete(
                `location/deleteLocation/${locationData.locationId}`
            );
    
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Location deleted successfully");
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

                    <li>Home /Locations / <span className="addash"> Admin locations </span></li>
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
                <div className="p-2">   <button className="btn btn-primary p-2" onClick={handleShowModal}>Create location</button> </div>

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
                            <th>Location name</th>
                            <th>Location address</th>
                            <th>Shop name</th>
                            <th>status</th>
                            <th>Created date</th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allLocations && allLocations.map((data, i) => (

                                <tr key={data.locationId}>
                                    <td data-label="SN"> {i+1} </td>
                                    <td data-label="Location name">{data.locationName} </td>
                                    <td data-label="Location address"> {data.locationAddress} </td>
                                    <td data-label="Shop name"> {data.shopName} </td>
                                    <td data-label="status"> {data.status} </td>
                                    <td data-label="Created date">  {moment(data.createdDateTime).format("lll")}  </td>
                                    <td data-label="Longitude">{data.longitude} </td>
                                    <td data-label="Latitude"> {data.latitude} </td>
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
      allLocations.length === 0  && !pendingLocation  &&  <div style={{justifyContent:"center", textAlign:"center", padding:"10px"}}> <span > No location available  </span></div>
    }


            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form id="survey-form" onSubmit={handleSubmit((data, event) => {
                        event.target.reset()
                        // console.log('seedataNow', data);
                        handleSubmitData(data);
                    })}>

                        <div className="row">

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Location Name</label>
                                    <input id="name" placeholder="Enter location name, eg. Wuse, Kubwa" className="form-control"

                                        {...register("locationName", {
                                            required: 'First name is required',
                                            maxLength: {},
                                        })} />
                                    <span className="cum-error">{errors.locationName?.message}</span>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label id="name-label" for="name">Location Address</label>
                                    <input id="name" placeholder="Enter location address" className="form-control"

                                        {...register("locationAddress", {
                                            required: 'Location address is required',
                                            maxLength: {},
                                        })} />
                                    <span className="cum-error">{errors.locationAddress?.message}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="number-label" for="number">Center Phone Number</label>
                                        <input placeholder="Enter  phone number" className="form-control"

                                            {...register("phone", {
                                                required: 'Phone number is required',
                                                maxLength: {},
                                            })} />
                                        <span className="cum-error">{errors.phone?.message}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="number-label" for="number">Shop / plaza name, no.</label>
                                        <input type="text" placeholder="Enter email" className="form-control"{...register("shopName")} />
                                        <span className="cum-error">{errors.shopName?.message}</span>
                                    </div>
                                </div>

                            </div>
                            <hr />
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="number-label" for="number">Longitude</label>
                                        <input placeholder="Enter  Logitude" className="form-control"

                                            {...register("longitude")} />
                                        <span className="cum-error">{errors.logitude?.message}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label id="number-label" for="number">Latitude</label>
                                        <input type="text" placeholder="Enter latitude" className="form-control"{...register("latitude")} />
                                        <span className="cum-error">{errors.latitude?.message}</span>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-4">


                                {
                                    loading ? <button > <span class="loader"></span></button> : <button className="btn btn-primary p-2" type="submit" >Create Location</button>
                                }

                            </div>
                        </div>

                        {

                            errorMessage &&
                            <div className="container mt-2">
                                <div className="row">

                                    <div class="col-sm-12">
                                        <div className="alert   alert-danger  " role="alert" >

                                            <span> {errMessage.message || "Something went wrong, please try again"}   </span>

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
                        <label>Location Name</label>
                        <input 
                             
                            placeholder="Enter location name, eg. Wuse, Kubwa" 
                            className="form-control"
                            defaultValue={locationData?.locationName}
                            {...register("locationName")} 
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
                    <Modal.Title>Delete location</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <div>Are you sure you want to delete this location?</div>


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

export default AdminLocations;