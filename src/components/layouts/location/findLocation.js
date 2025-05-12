import React from "react";
import Header from "../Header"
import "./findLocation.css"
import { GiPhone, GiSmartphone } from "react-icons/gi";
import { IoPhoneLandscape, IoPhonePortraitSharp } from "react-icons/io5";
import useGetData from "../../Utility/getFunction";
import Footer from "../Footer";


const FindLocation = (()=>{
  
const {data, isPending, error} = useGetData("location/getAllLocations");


console.log("loglocation", data)

    return(



        <>

        <Header/>
        
        <div className="containLocation">
            
            <p className="conLocFirst">Here are our active service centers, in case you'd like to visit us in person.
            But if you're too busy or can't make it, no worries — we're just one click away!</p>

Book a repair online, and we'll pick up your device, diagnose the issue, fix it promptly, and deliver it back to you — all without you leaving your home or office.

With our tracking system, you can monitor the repair progress every step of the way, right up until we deliver your device.

<p className="conLocLast">Try us today and experience fast, reliable, and convenient repair service! </p>  </div>
        <ol className="   styled-list" style={{ '--length': data.length } } role="list">
      {data.map((item, index) => (
        <li key={index} style={{ '--i': index + 1 }}>
          <h3>{item.locationName}</h3>
          <p>{item.locationAddress } : {item.shopName} </p>
          <p className="liNum-cloc"><i><GiSmartphone size={25}/>  </i>  {item.phone}</p>
        </li>
      ))}
    </ol>
        
     <div>
        <Footer/>
        </div>   
        </>
    )
})

export default FindLocation