import React from "react";
import logoImage from "../images/CHUKKY-BRAND-BACKGROUND.png"

const TopTextComponent = ()=>{
    return(
        <>

            <div className="second">
                <div className="text-about-sec">
                    <h4 className="chukName">Your Solution Hub</h4>
                    <p>We Provide Hardware and Software Solutions to Most of Your  Tech Related Issues</p>
                </div>
                <div className="border-line"></div>
                <div className="text-about-sec">

                    <div>
                        <img src={logoImage} className="logo-img-setText"/> 
                        </div>
                You don’t have to spend a fortune or be there in person 
                to restore your device’s original quality. With our 
                convenient home and office pickup and delivery options, we’ve got you covered!
                </div>
               
                {/* <div>

                    <button className="button-47" role="button">About us</button>

                </div> */}


            </div>
        </>
    )
}

export default TopTextComponent