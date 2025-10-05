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
// import AdminDashboard from "../adminDashboard";
// import "./userRepairOrder.css"


const ViewCategories = (() => {

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


    const userInfo = localStorage.getItem("adminsInfo");
      const user = JSON.parse(userInfo);

    const fetchLocation = async () => {

        try {
            const response = await chukkytechAxios.get("category/getAllCategories");
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
            createdBy: user?.userId
        }


        await chukkytechAxios
            .post('category/createCategories', userData)
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



    const handleShowModalEdit = (() => {
        showEditModal(true)
    })



    const handleSubmitDelete = async () => {
        if (!locationData?.categoryId) {
            setErrorMessage(true);
            setErrMessage("No category selected for deletion");
            return;
        }
    
        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);
    
        try {
            const response = await chukkytechAxios.delete(
                `category/deleteCategories/${locationData.categoryId}`
            );
    
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Category deleted successfully");
            setShowDelete(false)
          
            await fetchLocation();
         
            setShowDelete(false);
            
            
        } catch (err) {
            console.error('Deletion failed:', err);
            
            const errorMsg = err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to delete category";
            
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

                    <li>Home /Category / <span className="addash"> View Categories </span></li>
                </ul>
            </div>


            <div className="container">
 

                <h5>Search Category</h5>
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
                <div className="p-2">   <button className="btn btn-primary p-2" onClick={handleShowModal}>Create Category</button> </div>

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
                            <th>Category name</th>
                            
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
                                    <td data-label="Category name">{data.categoryName} </td>
                                    
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
                    <Modal.Title>Create Category</Modal.Title>
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
                                    <label>Category Name</label>
                                    <input id="name" placeholder="Enter category name" className="form-control"

                                        {...register("categoryName", {
                                            required: 'category name is required',
                                            maxLength: {},
                                        })} />
                                    <span className="cum-error">{errors.categoryName?.message}</span>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label id="name-label" for="name">Status</label>

                                    <select className="form-control" {...register("status")}>
                                        <option value="active"> Active  </option>
                                        <option value="inActive"> Inactive  </option>
                                        <option value="disable"> Disable  </option>
                                    </select>
                                    
                                </div>
                            </div>
                           

                          
                        </div>


                        <div className="row">
                            <div className="col-md-12">


                                {
                                    loading ? <button className="btn btn-primary p-2 submitbtn-Control"> <span class="loader"></span></button> : <button className="btn btn-primary p-2 submitbtn-Control" type="submit" >Create Category</button>
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

export default ViewCategories;