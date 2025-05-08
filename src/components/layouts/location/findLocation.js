import React from "react";
import Header from "../Header"
import "./findLocation.css"
import { GiPhone, GiSmartphone } from "react-icons/gi";
import { IoPhoneLandscape, IoPhonePortraitSharp } from "react-icons/io5";
import useGetData from "../../Utility/getFunction";
import Footer from "../Footer";


const FindLocation = (()=>{
    const items = [
        {
          title: "Discovery and assessment",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.",
          phone: "0807876e76766"
        },
        {
          title: "Information gathering and analysis",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus."
        },
        {
          title: "Creating your claim",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus."
        },
        {
          title: "Approvals and submission",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus."
        },
        {
          title: "Receiving your benefit",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus."
        },
        {
            title: "Receiving your benefit",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus."
          }
      ];

const {data, isPending, error} = useGetData("location/getAllLocations");


console.log("loglocation", data)

    return(



        <>

        <Header/>
        
        <ol className="styled-list" style={{ '--length': items.length } } role="list">
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