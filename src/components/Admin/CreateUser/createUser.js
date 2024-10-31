import { useState } from "react";
import AdminDashboard from "../adminDashboard";
import "./createUser.css";



const CreateUser = (() => {


	const [hideAdminAccess, setHideAdminAccess] = useState("");

	const handleHideAdminAccess = () => {
		setHideAdminAccess(!hideAdminAccess)
	}




	return (


		<>
			<AdminDashboard />

			<div className="header-bar">

				<ul className="action-bar">

					<li>Home / Users / <span className="addash"> Create User </span></li>
				</ul>
			</div>


			<div className="container">
				<header className="header">

				</header>
				<div className="form-wr">
					<p id="description" className="text-center">
						Create User

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


							
							<div> <input type="checkbox" className="" onClick={handleHideAdminAccess} />  Admin Access </div>
							<p></p>
							{
								hideAdminAccess &&
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label id="number-label" for="number">Employee role</label>
											<select className="form-control">
												<option>Admin</option>
												<option>ICT</option>
												<option>Manager</option>
												<option>Others</option>
											</select>
											{/* <input type="text" required   placeholder="Enter detailed address" className="form-control" /> */}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label id="number-label" for="number">Admin Login Password</label>
											<input type="text" required placeholder="Create password" className="form-control" />
										</div>
									</div>

								</div>
							}


						</div>
						{/* <div className="row">
				<div className="col-md-12">
					<div className="form-group">
						<label>Details</label>
						<textarea  id="comments" className="form-control" name="comment" placeholder="Please describe your requirement in details, for direct diagnosis and immediate fix" ></textarea>
					</div>
				</div>
			</div> */}

						<div className="row">
							<div className="col-md-4">
								<button className="picckBtn">Submit</button>
							</div>
						</div>

					</form>
				</div>
			</div>


		</>
	)
})

export default CreateUser