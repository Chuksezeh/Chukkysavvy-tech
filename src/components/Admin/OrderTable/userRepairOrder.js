import { useState } from "react";
import AdminDashboard from "../adminDashboard";



const RepairOrderTable = (()=>{
    const [showDropDown, setShowDropDown] = useState("");


    const handleShowDropDown = () => {
  
      setShowDropDown(!showDropDown)
    }
  
  


   return(

<>

<AdminDashboard />
      <div className="header-bar">

        <ul className="action-bar">

          <li>Home / Orders / <span className="addash"> Repair Orders </span></li>
        </ul>
      </div>


      <p className="showINfoP">Click the names to see more data.</p>
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
            <td>PlayCo Group Universal Flex</td>
            <th className="mobile-header">Number</th><td>2489</td>
            <th className="mobile-header">Market rate</th><td>€12.35</td>
            <th className="mobile-header">Number</th><td>Picked</td>
            <th className="mobile-header">Picked</th><td>8774uju</td>
            <th className="mobile-header">Weight</th><td>5%</td>
            <th className="mobile-header-action">  <button className="btn btn-primary" onClick={handleShowDropDown}> Action
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


            </th><td>   </td>

          </tr>
          
          {/* <tr className='total'>
      <th>Total</th>
      <td className="total-val" colspan="4">€1,134,860.04</td>
    </tr> */}
        </tbody>
      </table>





</>

   )
})

export default RepairOrderTable;