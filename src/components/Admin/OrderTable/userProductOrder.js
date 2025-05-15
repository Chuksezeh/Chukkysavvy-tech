import { useState } from "react";
import AdminDashboard from "../adminDashboard";
import "./userRepairOrder.css"


const ProductOrderTable = (()=>{


    const [showDropDown, setShowDropDown] = useState("");


    const handleShowDropDown = () => {
  
      setShowDropDown(!showDropDown)
    }
  


   return(

<>


<AdminDashboard />
      <div className="header-bar">

        <ul className="action-bar">

          <li><a href="/"> Home</a> / Orders / <span className="addash"> Product Orders </span></li>
        </ul>
      </div>


     <div className="controlADMinorder_tb">

   
      <table >
        <thead>
          <tr className="table-headers">
            <th>Device name/ model no</th>
            <th>Order number</th>
            <th>Phone number</th>
            <th>Status</th>
            <th>User name</th>
            <th>Order Type</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PlayCo Group Universal Flex</td>
            <th className="mobile-header">Number</th><td>2489</td>
            <th className="mobile-header">Market rate</th><td>€12.35</td>
            <th className="mobile-header">Number</th><td>2489</td>
            <th className="mobile-header">Market rate</th><td>€12.35</td>
            <th className="mobile-header">Delivery</th><td>5%</td>
            <th className="mobile-header">Weight</th><td>5%</td>
            <th className="mobile-header-action">  <button className="btn btn-primary" onClick={handleShowDropDown}> Action
            </button>
              {
                showDropDown &&

                <ul className="dropSetSHow">
                  <li>View user</li>
                  <li>Suspend user</li>
                  <li style={{ color: "red" }}>Delete user</li>
                </ul>
              }


            </th><td>   </td>

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

export default ProductOrderTable;