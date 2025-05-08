import { CiLocationOn } from "react-icons/ci";
import repairoffice  from "../../images/repairOffice.jpg";
import repairPhone  from "../../images/repair-p.jpg";
import repairPhoneTrac  from "../../images/tracc.jpg";
import logos  from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { GiAutoRepair, GiProgression } from "react-icons/gi";
import { BsFillInfoSquareFill } from "react-icons/bs";

const UserDashBoardComponent =  (()=>{

	const userInfo = localStorage.getItem('userInfo');
	const userData = JSON.parse(userInfo);

    const navigate = useNavigate();

    const handleFindOffice = (()=>{
        navigate("/find-location")
    });

    const handleNavigateBookingPage = (()=>{
        navigate("/bookingpage")
    })

    const handleNavigateBookingTracking = (()=>{
        navigate("/track-repair")
    })


    

    return(


        <>
           <div id="root">
  <div className="container pt-5">
    <div className="row align-items-stretch">
      <div className="c-dashboardInfo col-lg-12 col-md-12">
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"><svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              {/* <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
              </path> */}
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count"> 
                
            <p> {userData.firstName} {userData.lastName} </p>
            <p> {userData.email}  </p> 
                
                </span>
        </div>
      </div>
      <div className="c-dashboardInfo col-lg-3 col-md-6">
        <div className="wrap" onClick={handleFindOffice } style={{cursor:"pointer"}}>
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Find Service Stores<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <CiLocationOn />
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">

                <img style={{width:"150px"}} src={repairoffice}/>
            </span>
        </div>
      </div>
      <div className="c-dashboardInfo col-lg-3 col-md-6">
        <div className="wrap" style={{cursor:"pointer"}} onClick={handleNavigateBookingPage}>
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> Book for instant repair <svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <GiAutoRepair />
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">
                
            <img style={{width:"150px"}} src={repairPhone}/>
            
                 </span><span
            className="hind-font caption-12 c-dashboardInfo__subInfo"></span>
        </div>
      </div>
      <div className="c-dashboardInfo col-lg-3 col-md-6">
        <div className="wrap" style={{cursor:"pointer"}} onClick={handleNavigateBookingTracking} >
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Track Repair Progress<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              
              <GiProgression />
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">
            <img style={{width:"150px"}} src={repairPhoneTrac}/>
                
                </span>
        </div>
      </div>
      
     
      <div className="c-dashboardInfo col-lg-3 col-md-6">
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">About us<svg
              className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <BsFillInfoSquareFill />
            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">
            
            <img style={{width:"150px"}} src={   logos }/>
                
                </span>
        </div>
      </div>
     
     
    </div>
  </div>
</div> 
        
        </>
    )
})

export default UserDashBoardComponent