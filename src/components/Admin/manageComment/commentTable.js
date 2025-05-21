import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import AdminDashboard from "../adminDashboard";
import { chukkytechAxios } from "../../Utility/axios";
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import AdminDashboard from "../adminDashboard";
// import "./userRepairOrder.css"


const ManageComments = (() => {

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
    const [pendingComment, setPendingComment] = useState(true);
    const [allComments, setAllComments] = useState([]);
    const [successText, setSuccessText] = useState("");
    const [showCommentDeletModal, setShowCommentDeletModal] = useState(false);
    const [showSuppressModal, setShowSuppressModal] = useState(false);
    const [commentId, setCommentId] = useState('');
    const [supData, setSupData] = useState("");
    const [holdCommentData, setHoldCommentData] = useState({});

    const [lineValue, setLineValue] = useState("");

    const fetchComments = async () => {

        try {
            const response = await chukkytechAxios.get("comment/getAllComments");
            setAllComments(response.data);
            setPendingComment(false);
        } catch (error) {
            setPendingComment(false);
            console.error('Error fetching locations:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    console.log('setPendingComment', allComments);


    const handleChangeValue = ((e) => {

    })

    const handleShowModal = ((data) => {
        setShowCommentDeletModal(true)
        setHoldCommentData(data)
    })

    const handleSuppressModal = (data) => {
        setShowSuppressModal(true);
        setHoldCommentData(data);
        setErrorMessage(false);
        setSuccessMessage(false);
    };


    const handleSubmitDelete = async () => {
        if (!holdCommentData?.commentId) {
            setErrorMessage(true);
            setErrMessage("No comment selected for deletion");
            return;
        }
    
        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);
    
        try {
            const response = await chukkytechAxios.delete(
                `comment/deleteComment/${holdCommentData.commentId}`
            );
    
            setSuccessMessage(true);
            setSuccessText(response.data.message || "Comment deleted successfully");
            setShowCommentDeletModal(false)
          
            await fetchComments();
         
            setShowSuppressModal(false);
            
            
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
    
   




    // const handleSubmitDelete = async data => {
    //     setLoading(true);
    //     console.log('setPendingppppp', holdCommentData);
    //     await chukkytechAxios
    //         .delete(`comment/deleteComment/${holdCommentData?.commentId}`)
    //         .then(res => {
    //             console.log('res', res);
    //             setLoading(false);
    //             setSuccessMessage(true);
    //             setSuccessText(res.data.message)
    //             fetchComments()

    //            })
    //         .catch(err => {
    //             console.log('err', err);
    //             setLoading(false);
    //             setErrorMessage(true);
    //             setErrMessage(err.response?.data)
    //       });
    // };

   

    // const handleSuppressModal = ((data) => {
    //     setShowSuppressModal(true)
    //     setHoldCommentData(data)
    // })



    // const handleSubmitUpdateComment = async data => {
    //     setLoading(true);

    //     const upDateData = {
    //         status: supData,
    //          commentId: holdCommentData?.commentId
    //     }

    //     console.log("comment>>>>>", upDateData)

    //       await chukkytechAxios
    //         .post('comment/updateCommentStatus', upDateData)
    //         .then(res => {
    //             console.log('res', res);
    //             setLoading(false);
    //             setSuccessMessage(true);
    //             setShowSuppressModal(false)
    //             fetchComments()


    //         })
    //         .catch(err => {
    //             console.log('err', err);
    //             setLoading(false);
    //             setErrorMessage(true);
    //             setErrMessage(err.response?.data)


    //         });
    // };




const navigate = useNavigate();

    useEffect(() => {
        const adminsInfo = localStorage.getItem('adminsInfo');
        // console.log('UserInfo:', userInfo);
      
        if (!adminsInfo) {
          navigate('/admin-login');
        }
      }, [navigate]);









    
    const handleSubmitUpdateComment = async (data) => {
        setLoading(true);
        setErrorMessage(false);
        setSuccessMessage(false);

        const updateData = {
            status: supData,
            commentId: holdCommentData?.commentId
        };

        try {
            console.log("Updating comment with data:", updateData);

            const response = await chukkytechAxios.put('comment/updateCommentStatus', updateData);

            console.log('Update successful:', response.data);

            setSuccessMessage(true);
            setShowSuppressModal(false);
            setSuccessText(response.data.message)

            await fetchComments();



        } catch (err) {
            console.error('Update failed:', err);

            const errorMsg = err.response?.data?.error ||
                err.response?.data?.message ||
                'Failed to update comment status';

            setErrorMessage(true);
            setErrMessage(errorMsg);

        } finally {
            setLoading(false);
        }
    };


    

    // const handleCommentAction = ((data)=>{
    //     setCommentId(data.commentId)
    //     if(lineValue === "delete"){
    //         handleShowModal(); 
    //     }else if(lineValue === "suppress"){
    //         handleSuppressModal();
    //     }else{

    //     }


    // })



    return (

        <>


            <AdminDashboard />
            <div className="header-bar">

                <ul className="action-bar">

                    <li>Home /Locations / <span className="addash"> Manage comments </span></li>
                </ul>
            </div>


            <div className="container">


                <h5>Search Comments</h5>
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


            </div>
            {successMessage &&
                <div className="container mt-2">
                    <div className="row">

                        <div className="col-sm-12">
                            <div className="alert fade  alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">

                                <i className="start-icon far fa-check-circle faa-tada animated"></i>
                                <strong className="font__weight-semibold" style={{ color: "white" }}>Well done!</strong>

                                <span> {successText}  </span>
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
                            <th>Title</th>
                            <th>Comment</th>
                            <th>Created date</th>
                            <th>status</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            {/* <th>Phone</th> */}
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allComments && allComments.map((data, i) => (

                                <tr key={data.locationId}>
                                    <td data-label="SN"> {i + 1} </td>
                                    <td data-label="Title">{data.title} </td>
                                    <td data-label="Comment"> {data.comment} </td>
                                    <td data-label="Created date"> {data.createdDateTime} </td>
                                    <td data-label="status"> {data.status} </td>
                                    <td data-label="First name">  {data.firstName} </td>
                                    <td data-label="Last name">{data.lastName} </td>
                                    <td data-label="Email"> {data.email} </td>
                                    {/* <td data-label="Phone"> {data.phone} </td> */}
                                    <td>
                                        {/* <select className="form-control border-secondary" onChange={(e)=>setLineValue(e.target.value)} onClick={()=>handleCommentAction(data)}>
                                            <option>Action</option>

                                            <option value="suppress"> Suppress</option>
                                            <option value="delete">Delete comment</option>
                                        </select> */}

                                        {[DropdownButton].map((DropdownType, idx) => (
                                            <DropdownType
                                                as={ButtonGroup}
                                                key={idx}
                                                id={`dropdown-button-drop-${idx}`}
                                                size="lg"
                                                title="Action"

                                            >
                                                {/* <Dropdown.Item eventKey="1">View user</Dropdown.Item> */}

                                                <Dropdown.Item eventKey="3" onClick={() => handleSuppressModal(data)}>
                                                    {
                                                        data.status === "active" ? <span onClick={() => setSupData("suppress")}> Suppress comment</span> : <span onClick={() => setSupData("active")}> Activate comment</span>
                                                    }


                                                </Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item eventKey="4" style={{ color: "red" }} onClick={() => handleShowModal(data)} >Delete comment</Dropdown.Item>
                                            </DropdownType>
                                        ))}


                                    </td>
                                </tr>


                            ))
                        }


                    </tbody>
                </table>



            </div>


            <Modal show={showCommentDeletModal} onHide={() => setShowCommentDeletModal(false)} size="">
                <Modal.Header closeButton>
                    <Modal.Title>Delete comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    <div>Are you sure you want to delete this comment?</div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCommentDeletModal(false)}>
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


            <Modal show={showSuppressModal} onHide={() => setShowSuppressModal(false)} size="">
                <Modal.Header closeButton>
                    <Modal.Title>Delete comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {
                        holdCommentData.status === "active" ? <div>Are you sure you want to <span style={{ fontWeight: "bold" }}>suppress </span> this comment?</div> :
                            <div>Are you sure you want to <span style={{ fontWeight: "bold" }}>activate </span> this comment?</div>
                    }



                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuppressModal(false)}>
                        Close
                    </Button>
                    {
                        loading ? <Button className="btn btn-primary" variant="primary" >
                            <span className="loader"></span>
                        </Button> : <Button className="btn btn-primary" variant="primary" onClick={handleSubmitUpdateComment}>
                            Update
                        </Button>
                    }


                </Modal.Footer>
            </Modal>




        </>

    )
})

export default ManageComments;