import React from "react";
import Header from "../Header"
import "./findLocation.css"


const FindLocation = (()=>{
    const items = [
        {
          title: "Discovery and assessment",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus."
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



    return(



        <>

        <Header/>
        
        <ol className="styled-list" style={{ '--length': items.length } } role="list">
      {items.map((item, index) => (
        <li key={index} style={{ '--i': index + 1 }}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </li>
      ))}
    </ol>
        
        
        </>
    )
})

export default FindLocation