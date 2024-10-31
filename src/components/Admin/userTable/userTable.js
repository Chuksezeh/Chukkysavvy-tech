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
            <td>PlayCo Group Low</td>
            <th className="mobile-header">Number</th><td>5477</td>
            <th className="mobile-header">Market rate</th><td>€147.00</td>
            <th className="mobile-header">Weight</th><td>10%</td>
            <th className="mobile-header">Value</th><td>€80,511.90</td>
          </tr>
          <tr>
            <td>House of Dedgeny High</td>
            <th className="mobile-header">Number</th><td>5899</td>
            <th className="mobile-header">Market rate</th><td>€ 288.00</td>
            <th className="mobile-header">Weight</th><td>4%</td>
            <th className="mobile-header">Value</th><td>€67,956.48</td>
          </tr>
          <tr>
            <td>House of Dedgeny USD Med</td>
            <th className="mobile-header">Number</th><td>11477</td>
            <th className="mobile-header">Market rate</th><td>€18.00</td>
            <th className="mobile-header">Weight</th><td>5%</td>
            <th className="mobile-header">Value</th><td>€10,329.30</td>
          </tr>
          <tr>
            <td>Sterck Inc. Med</td>
            <th className="mobile-header">Number</th><td>1476</td>
            <th className="mobile-header">Market rate</th><td>€187.00</td>
            <th className="mobile-header">Weight</th><td>10%</td>
            <th className="mobile-header">Value</th><td>€27,601.20</td>
          </tr>
          <tr>
            <td>PlayCo Group Universal High</td>
            <th className="mobile-header">Number</th><td>6547</td>
            <th className="mobile-header">Market rate</th><td>€782.00</td>
            <th className="mobile-header">Weight</th><td>12%</td>
            <th className="mobile-header">Value</th><td>€614,370.48</td>
          </tr>
          <tr>
            <td>PlayCo Group Universal Low</td>
            <th className="mobile-header">Number</th><td>1476</td>
            <th className="mobile-header">Market rate</th><td>€187.00</td>
            <th className="mobile-header">Weight</th><td>10%</td>
            <th className="mobile-header">Value</th><td>€27,601.20</td>
          </tr>
          <tr>
            <td>PlayCo Group Universal High</td>
            <th className="mobile-header">Number</th><td>1471</td>
            <th className="mobile-header">Market rate</th><td>€148.00</td>
            <th className="mobile-header">Weight</th><td>18%</td>
            <th className="mobile-header">Value</th><td>€39,187.44</td>
          </tr>
          <tr>
            <td>Sterck Inc. Low</td>
            <th className="mobile-header">Number</th><td>1978</td>
            <th className="mobile-header">Market rate</th><td>€68.23</td>
            <th className="mobile-header">Weight</th><td>11%</td>
            <th className="mobile-header">Value</th><td>€14,845.48</td>
          </tr>
          <tr>
            <td>Sterck Inc. Universal High</td>
            <th className="mobile-header">Number</th><td>6512</td>
            <th className="mobile-header">Market rate</th><td>€642.02</td>
            <th className="mobile-header">Weight</th><td>5%</td>
            <th className="mobile-header">Value</th><td>€209,041.71</td>
          </tr>
          <tr>
            <td>Sterck Inc. Flex</td>
            <th className="mobile-header">Number</th><td>5423</td>
            <th className="mobile-header">Market rate</th><td>€78.96</td>
            <th className="mobile-header">Weight</th><td>7%</td>
            <th className="mobile-header">Value</th><td>€29,974.01</td>
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





    </>
  )


})

export default UserTable