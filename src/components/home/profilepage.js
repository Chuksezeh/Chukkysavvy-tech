
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";


const ProfilePage=(()=>{

  

  // const scrollRef = useRef(); 
  // const scrollTesmony = useRef();
  // const contactScroll = useRef();

  // const scrollBottom = (e) => {
  //   e.current.scrollIntoView({
  //     behavior: "smooth"
  //   });
  // };
  // const scrollTes = (e) => {
  //   e.current.scrollIntoView({
  //     behavior: "smooth"
  //   });
  // };
  // const scrollContact = (e) => {
  //   e.current.scrollIntoView({
  //     behavior: "smooth"
  //   });
  // };


    return(
        <>
        <Header/>
  

        <div className="container profile_page_Cover" >
        <div className="forwardCover">
          <div className="profileIConsCover">
            <div className="profile1DIV" >
              <div>
                {/* < IoMdNotifications  size={25}  className="profile1DIVicon"/>  */}

                 </div>
              <div>Notification</div>
            </div>
            <div className="profile1DIV" >
              <div>
                {/* <TbTableFilled size={25}  className="profile1DIVicon"/> */}
                </div>
              <div>EMS</div>
            </div>
            <div className="profile1DIV" >
              <div>
                {/* <PiLockKeyOpenLight size={25}  className="profile1DIVicon"/> */}
                </div>
              <div >Clock-in Report</div>
            </div>
            <div className="profile1DIV" >
              <div>
                {/* <TbShoppingBagSearch size={25}  className="profile1DIVicon"/> */}
                </div>
              <div>Find-jobs</div>
            </div>
          </div>
       </div>


<div className="main-body">


<nav aria-label="breadcrumb" className="main-breadcrumb">
  <ol className="breadcrumb">

  </ol>
</nav>


<div className="row gutters-sm">
  <div className="col-md-4 mb-3">
   
    <div className="card_car card_car_ProfilePad">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          {/* <img src={image.imageUrl || image2} alt="Admin" className="rounded-circle" style={{ width: "150px" }} /> */}
          <div className="mt-3">
           

            <h4 className="user_nameS">
              {/* {VerifiedUser.firstName} {VerifiedUser.lastName} */}
            </h4>
            <p className="text-secondary mb-1 user_nameS">
               {/* {VerifiedUser.occupation}  */}
            </p>
            <p className="text-muted font-size-sm " id="locationName">
              {/* {VerifiedUser.stateOfResidence} */}
            </p>
           
            <div className="box">
              <div className="percent">
              {/* <ProgressBar bgColor= "#117964"/> */}
               </div>
              <div className="text">Complete your profile</div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="card_car mt-3 containerSideProf_S">
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap"  >
          <h6 className="mb-0"> 
          {/* <i><BsPersonFill /></i>  */}
           <line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 
          1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>Profile</h6>
          {/* <span className="text-secondary"> {
            showProfiles ?
              <i> <FaChevronRight /> </i> : <i><FaChevronLeft /></i>

          }   </span> */}
        </li>
     
         <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
          <h6 className="mb-0"> 
          {/* <i><RiFileList2Line /> </i>  */}
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>My Cv</h6>
          {/* <span className="text-secondary"> {
            showCv ?
              <i> <FaChevronRight /> </i> : <i><FaChevronLeft /></i>

          }   </span> */}
        </li>


        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
          <h6 className="mb-0"> 
          {/* <i><FaShoppingBag /></i> */}
           <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>My Jobs</h6>
          {/* <span className="text-secondary"> {
            showWorkExperience ?
              <i> <FaChevronRight /> </i> : <i><FaChevronLeft /></i>

          }   </span> */}
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
          <h6 className="mb-0"> 
          {/* <i><TbShoppingBagSearch /> </i>  */}
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>Find Jobs</h6>
          {/* <span className="text-secondary"> {
            showFindJobsLeft ?
              <i> <FaChevronRight /> </i> : <i><FaChevronLeft /></i>

          }   </span> */}
        </li>


       

     <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
          <h6 className="mb-0"> <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect> 
          {/* <i><FaEnvelope /> </i>  */}
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>Messages</h6>
          {/* <span className="text-secondary"> {
            showNotification ?
              <i> <FaChevronRight /> </i> : <i><FaChevronLeft /></i>

          }   </span> */}
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
          <h6 className="mb-0"> <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect> <i>
            {/* <TbReport />   */}
            </i> <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>Report</h6>
          {/* <span className="text-secondary"> {
            showReport ?
              <i> <FaChevronRight /> </i> : <i><FaChevronLeft /></i>

          }   </span> */}
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap"  >
          <h6 className="mb-0"> <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect> 
          {/* <i><PiLockKeyDuotone /> </i> */}
           <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>Change Password</h6>
          {/* <span className="text-secondary"> {
            password ?
              <i> <FaChevronRight /> </i> : <i><FaChevronLeft /></i>

          }   </span> */}
        </li>

        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
          <h6 className="mb-0"> <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect> 
          {/* <i><IoSettingsOutline />  </i>  */}
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>Settings</h6>
          {/* <span className="text-secondary"> {
            settings ?
              <i> <FaChevronRight /> </i> : <i><FaChevronLeft /></i>

          }   </span> */}
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap" >
          <h6 className="mb-0"> <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
           {/* <i> <RiLogoutBoxRLine /> </i>  */}
           <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>Sign Out</h6>
         
        </li>
      </ul>
    </div>
  </div>


  <div className="col-md-8">


    <div>



      <div className="container containerJob_CardS">

      
        <div className="row">
          <div className="col-lg-12 cardPads" >
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-titleed" > <i className="iconStar_star"> </i> Work History</h5>
              </div>
              <div className="card-body pt-0">
               
                <div>
                  <div className="meeting-action">

                    <div className="dateJob_dis"> Job Status: </div>
                    <div className="jobCode_Txt">  </div>
                  
                  </div>
                  <div className="meeting-action">

                    <div className="dateJob_dis"> Total No. Jobs Done: </div>
                    <div className="jobCode_Txt">  </div>
                   
                  </div>
                  <div className="meeting-action">

                    <div className="dateJob_dis"> Active EMS Jobs: </div>
                    <div className="jobCode_Txt"> </div>
               
                  </div>

                </div>

              </div>

            </div>

      </div>
          <div className="col-lg-12 cardPads" >
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-titleed"> <i className="iconStar_star"> </i> Education</h5>
              </div>
              <div className="card-body pt-0">
              



                <div>

                  <div className="meeting-action">

                    <div className="dateJob_dis"> Total No. Educational Qualification: </div>
                    <div className="jobCode_Txt">  </div>
                  
                  </div>
                  <div className="meeting-action">

                    <div className="dateJob_dis"> Qualification verified: </div>
                    <div className="jobCode_Txt"> 0 </div>
                  
                  </div>

                </div>
              </div>

            </div>

          </div>
          <div className="col-lg-12 cardPads" >
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-titleed"> <i className="iconStar_star"> </i> Certification</h5>
              </div>
              <div className="card-body pt-0">
               
                 <div>

                  <div className="meeting-action">

                    <div className="dateJob_dis"> Total Certification: </div>
                    <div className="jobCode_Txt">  </div>
                   
                  </div>
                  <div className="meeting-action">

                    <div className="dateJob_dis"> Certification verified: </div>
                    <div className="jobCode_Txt"> 0 </div>
                   
                  </div>

                </div>
              </div>

            </div>

          </div>
          <div className="col-lg-12 cardPads" >
            <div className="card card-margin">
              <div className="card-header no-border">
                <h5 className="card-titleed"> <i className="iconStar_star"> </i> Addresses</h5>
              </div>
              <div className="card-body pt-0">
               

                <div>
                  <div className="meeting-action">

                    <div className="dateJob_dis"> GPS Checked: </div>
                    <div className="jobCode_Txt">------</div>
                   
                  </div>
                  <div className="meeting-action">

                    <div className="dateJob_dis"> Verified Address: </div>
                    <div className="jobCode_Txt"> ------ </div>
                   
                  </div>
                

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>



  </div>
</div>
</div>
       


      </div>


<Footer/>
        </>
    )
})
export default ProfilePage