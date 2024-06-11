import Header from "../layouts/Header"
import ProfilePage from "./profilepage"


const UserMainProfile = (()=>{







    return(

        <>
    <Header/>
      
         
    <div className="container">
    <div className="main-body">
    
        
          {/* <nav aria-label="breadcrumb" className="main-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.html">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
              <li className="breadcrumb-item active" aria-current="page">User Profile</li>
            </ol>
          </nav> */}
              
    
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
             

              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column  ">
                    {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/> */}
                   <div>Book Service</div>
                   <div>Orders</div>
                   <div>Rating & Reviews</div>
                  </div>
                </div>
              </div>
            
            </div>
            <div className="col-md-8">
              

             <div className="row gutters-sm side-all-cover">
                <div className="col-sm-6 mb-3 p-3 side-all">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" ></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" ></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" ></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" ></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 p-3 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" ></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" ></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" role="progressbar" ></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" >
                        <div className="progress-bar bg-primary" role="progressbar"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3">
                        <div className="progress-bar bg-primary" role="progressbar"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
 


            </div>
          </div>

        </div>
    </div>

        
        </>
    )
}
)
export default UserMainProfile