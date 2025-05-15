import { useNavigate } from "react-router-dom"
import Header from "../layouts/Header"

import "./404page.css"
import Footer from "../layouts/Footer";


const NoFoundPage = (()=>{


    const navigate = useNavigate();

    const handleNavigateHome = (()=>{
        navigate("/")
    })



    return(


        <>

        <Header/>


<br/>
<br/>
<br/>

        <div className="container">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content404">
        <h1 className="main-heading">This page is gone.</h1>
        <p className="pp-404">
          ...maybe the page you're looking for is not found or never existed.
        </p>

        <a>
          <button className="bTN-404"  onClick={handleNavigateHome}>Back to home <i className="far fa-hand-point-left"></i></button>
        </a>
      </div>
    </div>

        
    <Footer/>    
        
        </>
    )
})

export default NoFoundPage