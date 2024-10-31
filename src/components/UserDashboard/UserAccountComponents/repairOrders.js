import { useState } from "react";
import UserDashBoard from "../userDashboard"
import "../userDashboard.css"



const RepairOrders = (()=>{
    const [showDropDown, setShowDropDown] = useState("");


    const handleShowDropDown = () => {
  
      setShowDropDown(!showDropDown)
    }


    return(



        <>
        <UserDashBoard/>
        <div className="main-content">
			<h4>Orders</h4>
			
			<div className="panel-wrapper">
				<div className="panel-head">
					Repair Order
				</div>
                <hr/>
				<div className="panel-body">
                <p className="showINfoP">Click the names to see more data.</p>
      <table>
        <thead>
          <tr className="table-headers">
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PlayCo Group Universal Flex</td>
            <th className="mobile-header">Number</th><td>2489</td>
            <th className="mobile-header">Market rate</th><td>€12.35</td>
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
          <tr>
            <td>House of Dedgeny EUR Flex</td>
            <th className="mobile-header">Number</th><td>5478</td>
            <th className="mobile-header">Market rate</th><td>€42.68	</td>
            <th className="mobile-header">Weight</th><td>2%</td>
            <th className="mobile-header">Value</th><td>€4,676.02</td>
          </tr>
          <tr>
            <td>PlayCo Group Local</td>
            <th className="mobile-header">Number</th><td>123</td>
            <th className="mobile-header">Market rate</th><td>€147.36</td>
            <th className="mobile-header">Weight</th><td>3%</td>
            <th className="mobile-header">Value</th><td>€543.76</td>
          </tr>
         
          <tr>
            <td>PlayCo Group Universal Med</td>
            <th className="mobile-header">Number</th><td>7812</td>
            <th className="mobile-header">Market rate</th><td>€54.86</td>
            <th className="mobile-header">Weight</th><td>8%</td>
            <th className="mobile-header">Value</th><td>€34,285.31</td>
          </tr>
          {/* <tr className='total'>
      <th>Total</th>
      <td className="total-val" colspan="4">€1,134,860.04</td>
    </tr> */}
        </tbody>
      </table>

				</div>
			</div>
			
		</div>     
		     
        
        
        </>
    )
})

export default RepairOrders