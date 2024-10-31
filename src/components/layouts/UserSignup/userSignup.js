import { FcGoogle } from "react-icons/fc"
import Header from "../Header";
import "./userSignup.css";
import { useNavigate } from "react-router-dom";




const UserSignUp = (()=>{

    const navigate = useNavigate();



    const navigateLogin = ()=>{
        navigate("/user-login")
    }





    return(



        <>

<Header/>

        
    <div className="container">
				<header className="header">

				</header>
				<div className="form-wr">
					<p id="description" className="text-center">
						Sign Up

					</p>
					<form id="survey-form">

						<div className="row">

							<div className="col-md-6">
								<div className="form-group">
									<label>First Name</label>
									<input required id="name" placeholder="E.g Ipad 1" className="form-control" />
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label id="name-label" for="name">Last Name</label>
									<input required id="name" placeholder="Enter your name" className="form-control" />
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label id="number-label" for="number">Phone Number</label>
										<input type="text" required placeholder="Enter detailed address" className="form-control" />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label id="number-label" for="number">Email</label>
										<input type="text" required placeholder="Enter phone number" className="form-control" />
									</div>
								</div>

							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label id="number-label" for="number">Password</label>
										<input type="text" required placeholder="Enter detailed address" className="form-control" />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label id="number-label" for="number">Confirm Password</label>
										<input type="text" required placeholder="Enter phone number" className="form-control" />
									</div>
								</div>

							</div>


							

						</div>
                        <div style={{ fontSize:"20px" }}>Already have an account? <span style={{color:"blue", cursor:"pointer"}} onClick={navigateLogin}>Login</span> </div>

                       

                        
						{/* <div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<label>Details</label>
						<textarea  id="comments" className="form-control" name="comment" placeholder="Please describe your requirement in details, for direct diagnosis and immediate fix" ></textarea>
					</div>
				</div>
			</div> */}

						<div className="row">
							<div className="col-md-4 setbtnDiv">
								<button className="picckBtnDiv">Submit</button>
							</div>
						</div>


                        <div className="row">
							<div className="col-md-4 setbtnDiv">
                            <p style={{"fontWeight":"bold", fontSize:"20px"}}>Or</p>
                                <button className="picckBtnDiv changetxtBACk" type="button"> <span><FcGoogle size={30}/></span>  Continue with Google</button>
							</div>
						</div>

                        




					</form>
				</div>
			</div>
    
        
        
        </>
    )
})

export default UserSignUp