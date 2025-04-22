import { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard";
import "./userTable.css";
import { chukkytechAxios } from "../../Utility/axios";
import moment from "moment";

const UserTable = () => {
  const [showDropDown, setShowDropDown] = useState("");
  const [pendingUser, setPendingUser] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const handleShowDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const fetchUsers = async () => {
    setPendingUser(true);
    try {
      const response = await chukkytechAxios.get("auth/getAllUsers");
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

  return (
    <>
      <AdminDashboard />
      <div className="header-bar">
        <ul className="action-bar">
          <li>Home / Users / <span className="addash"> View Users </span></li>
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
                  <td data-label="Email">{data.status}</td>
                  <td data-label="Date registered">{moment(data.createdDateTime).format("lll")}</td>
                  <td>
                    <select className="form-control border-secondary">
                      <option value="suspend">Suspend user</option>
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
    </>
  );
};

export default UserTable;