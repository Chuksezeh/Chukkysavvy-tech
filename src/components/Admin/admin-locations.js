import { useEffect, useState } from "react";
import AdminDashboard from "./adminDashboard";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { chukkytechAxios } from "../Utility/axios";
import { useForm } from "react-hook-form";
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
    const [errorMessage, setErrorMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [pendingLocation, setPendingLocation] = useState(true);
    const [allLocations, setAllLocations] = useState([]);

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

    console.log('fetchLocation', allLocations);



    const handleSubmitData = async data => {
        setLoading(true);

        const userData = {
            ...data,
            status: "Active"
        }


        await chukkytechAxios
            .post('location/registerLocation', userData)
            .then(res => {
                console.log('res', res);
                setLoading(false);
                setSuccessMessage(true);
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


    return (

        <>


            <AdminDashboard />
            <div className="header-bar">

                <ul className="action-bar">

                    <li>Home /Locations / <span className="addash"> Admin locations </span></li>
                </ul>
            </div>


            <div className="container">


                <h5>Search User</h5>
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

                                <span>  Location created succesfully  </span>
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
                                    <td data-label="Created date">  {data.createdDateTime} </td>
                                    <td data-label="Longitude">{data.longitude} </td>
                                    <td data-label="Latitude"> {data.latitude} </td>
                                    <td>
                                        <select className="form-control border-secondary">
                                            <option>Action</option>

                                            <option value="delete">Update location</option>
                                            <option value="delete">Delete location</option>
                                        </select>
                                    </td>
                                </tr>


                            ))
                        }


                    </tbody>
                </table>



            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form id="survey-form" onSubmit={handleSubmit((data, event) => {
                        event.target.reset()
                        console.log('seedataNow', data);
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

        </>

    )
})

export default AdminLocations;