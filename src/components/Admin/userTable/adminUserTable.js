import { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard";
import "./userTable.css";
import { chukkytechAxios } from "../../Utility/axios";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

const AdminUserPage = () => {
  const [showDropDown, setShowDropDown] = useState("");
  const [pendingUser, setPendingUser] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusValue, setStatusValue] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [userItem, setUserItem] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [deleteUser, setDeleteUser]=useState(false);

  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const handleShowDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const fetchUsers = async () => {
    setPendingUser(true);
    try {
      const response = await chukkytechAxios.get("auth/getAllAdminUsers");
      setAllUsers(response.data);
      setPendingUser(false);
    } catch (error) {
      setPendingUser(false);
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  console.log("adminUssr<>>>>", allUsers)

  // Filter users based on search term
  const filteredUsers = allUsers.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages based on filtered users
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Additional search logic if needed
  };



  const handleChangeAction = ((e)=>{
      console.log("target", e.target.value)
      setStatusValue(e.target.value)
      if(e.target.value === "suspended"){
        setShowModal(true)
       }else if (e.target.value === "Active"){
        setShowModal(true)
       }else if (e.target.value === "delete"){
        setDeleteUser(true)
       }else{
        return
       }
  })

  const handleGetData = (data)=> setUserItem(data)

  const handleUpdateStatus = async data => {
    setLoadingStatus(true);
     const sendData = {
       status: statusValue
     }
    console.log('data', sendData);
  
    await chukkytechAxios
      .put(`auth/updateAdminStatus/${userItem.userId}`, sendData)
      .then(res => {
        console.log('res', res);
        setLoadingStatus(false);
        setSuccessMessage(true);
        fetchUsers()
        setShowModal(false);
        
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
        setErrorMessage(true);
        setErrMessage(err.response?.data)
  
      });
  };
  console.log('duserItem.userId', userItem.userId);


  const handleDeleteUser = async data => {
    setLoadingStatus(true);
     await chukkytechAxios
      .delete(`auth/deleteAdminUser/${userItem.userId}`)
      .then(res => {
        console.log('res', res);
        setLoadingStatus(false);
        setSuccessMessage(true);
        fetchUsers()
        setDeleteUser(false);
        
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
        setErrorMessage(true);
        setErrMessage(err.response?.data)
  
      });
  };


  const navigate = useNavigate();
  
      useEffect(() => {
          const adminsInfo = localStorage.getItem('adminsInfo');
          // console.log('UserInfo:', userInfo);
        
          if (!adminsInfo) {
            navigate('/admin-login');
          }
        }, [navigate]);
  
  


  return (
    <>
      <AdminDashboard />
      <div className="header-bar">
        <ul className="action-bar">
          <li>Home / Users / <span className="addash"> View Admin Users </span></li>
        </ul>
      </div>
      


      <div className="container">
        <h5>Search User</h5>
        <div className="row">
          <div className="col-12">
            <form onSubmit={handleSearchSubmit} className="input-group">
              <input 
                className="form-control border-secondary py-2" 
                type="search" 
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={handleSearchChange}
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
        <strong className="font__weight-semibold" style={{ color: "white" }}>Well done!</strong> <span> {statusValue === "delete" ?
          
          <span>User deleted succesfully.</span> : <span>User status updated succesfully.</span>  } </span>   
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

        <span> {errMessage.message || "Something went wrong, please try again"}   </span>

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
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Date registered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((data, i) => (
                <tr key={data.userId}>
                  <td data-label="SN">{(currentPage - 1) * usersPerPage + i + 1}</td>
                  <td data-label="First name">{data.firstName}</td>
                  <td data-label="Last name">{data.lastName}</td>
                  <td data-label="Email">{data.email}</td>
                  <td data-label="Status">{data.status}</td>
                  <td data-label="Date registered">
                    {/* {moment(data.createdDateTime).format("lll")} */}
                       {data.createdDateTime
                       }

                  </td>
                  <td>
                    <select className="form-control border-secondary" onChange={handleChangeAction} onClick={()=>handleGetData(data)}>
                      <option>Action</option>
                      {
                       data.status === "suspended" ?  <option value="Active">Activate user</option>:  <option value="suspended">Suspend user</option>
                      }
                     
                      <option value="delete">Delete user</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  {searchTerm ? "No users match your search" : "No users found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination controls - only show if there are filtered users */}
        {filteredUsers.length > 0 && (
          <div className="pagination-container">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Action</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {
            statusValue === "suspended" && <div>
              <p>  Are you sure you want to  <span style={{ fontWeight: "bold" }}>suspend</span> this user? </p>
            </div>
          }

{
            statusValue === "Active" && <div>
              <p>  Are you sure you want to  <span style={{ fontWeight: "bold" }}>Activate</span> this user? </p>
            </div>
          }


         

         
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>
            Close
          </Button>

          {
            loading ?<Button variant="primary">
            <span class="loader">
            </span>
          </Button> : <Button variant="primary" onClick={()=>handleUpdateStatus()}>
            Proceed
          </Button>
          }
          
        </Modal.Footer>
      </Modal>

      <Modal show={deleteUser} onHide={()=>setDeleteUser(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

         
          {
            statusValue === "delete" && <div>
              <p>  Are you sure you want to  <span style={{ fontWeight: "bold", color:"red" }}> delete  </span>this user? </p>
            </div>
          }

         
    </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setDeleteUser(false)}>
            Close
          </Button>

          {
            loading ?<Button variant="primary">
            <span class="loader">
            </span>
          </Button> : <Button variant="primary" onClick={()=>handleDeleteUser
            ()}>
            Proceed
          </Button>
          }
          
        </Modal.Footer>
      </Modal>
      
    </>
  );
};

export default AdminUserPage;