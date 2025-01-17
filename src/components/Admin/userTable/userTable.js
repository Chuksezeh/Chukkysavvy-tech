import { useState } from "react";
import AdminDashboard from "../adminDashboard";
import "./userTable.css";



const UserTable = (() => {


  const [showDropDown, setShowDropDown] = useState("");


  const handleShowDropDown = () => {

    setShowDropDown(!showDropDown)
  }




  return (

    <>



      <AdminDashboard />
      <div className="header-bar">

        <ul className="action-bar">

          <li>Home / Users / <span className="addash"> View Users </span></li>
        </ul>
      </div>


      <div className="container">
    <h5>Search order</h5>
    <div className="row">
        <div className="col-6">
            <div className="input-group">
                <input className="form-control border-secondary py-2" type="search" defaultValue="Search by order number, device name"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary h-100 w-100" type="button">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        <div className="col-6">
            <div className="input-group">
              

               <select className="form-control border-secondary py-2" type="search" defaultValue="Serach by order number, device name">
                  <option>Select Status</option> 
                  <option>Picked up</option> 
                  <option>delivering</option> 
                  <option>Fixing</option> 
                  <option>delivered</option> 
                  <option>Cancelled</option> 
               </select>

                {/* <div className="input-group-append">
                    <button className="btn btn-outline-secondary h-100 w-100" type="button">
                        <i className="fa fa-search"></i>
                    </button>
                </div> */}
            </div>
        </div>
    </div>
</div>
      
      <div className="controlADMinorder_tb">
       
       <table>
        <thead>
          <tr className="table-headers">
            <th>Device name/ model no</th>
            <th>Order number</th>
            <th>Device fault</th>
            <th>Status</th>
            <th>User name</th>
            <th>Address</th>
            <th>Action</th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Device name/ Brand">PlayCo </td>
            <td data-label="Order number">2489</td>
            <td data-label="Device fault">All fault, the screen is</td>
            <td data-label="Status">Picked</td>
             <td data-label="User name">8774uju</td>
            <td data-label="Address">5%</td>
              <button className="btn btn-primary sm-w-100" onClick={handleShowDropDown}> Action
            </button>
              {
                showDropDown &&

                <ul className="dropSetSHow">
                  <li>View order</li>
                  <li>Picked up</li>
                  <li>Fixing</li>
                  <li>Delivering</li>
                  <li>Delivered</li>
                  <li>Cancel Order</li>
                  <li style={{ color: "red" }}>Remove Order</li>
                </ul>
              }


          

          </tr>
          
          {/* <tr className='total'>
      <th>Total</th>
      <td className="total-val" colspan="4">€1,134,860.04</td>
    </tr> */}
        </tbody>
      </table>

      </div>



    </>
  )


})

export default UserTable