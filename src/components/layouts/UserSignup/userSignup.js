import { FcGoogle } from "react-icons/fc"
import Header from "../Header";
import "./userSignup.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRef } from "react";


let renderCount = 0;



const UserSignUp = (() => {

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty, isValid },
	} = useForm();
	renderCount++;

	const password = useRef({});
	password.current = watch("password", "");


	const navigate = useNavigate();



	const navigateLogin = () => {
		navigate("/user-login")
	}

	const handleSubmitRegistration = ((data) => {

		console.log("testingname", data)


	})





	return (
		<>
			<Header />
			<div className="container">

				<div className="form-wr mt-5">
					<p id="description" className="text-center">
						Sign Up

					</p>
					<form id="survey-form " onSubmit={handleSubmit((data, event) => {

						console.log('seedataNow', data);
						handleSubmitRegistration(data);
					})}>

						<div className="row">

							<div className="col-md-12">
								<div className="form-group">
									<label>First Name</label>
									<input id="name" placeholder="Enter your full name" type="text" className="form-control"
										{...register("firstName", {
											required: 'First name is required',
											maxLength: {},
										})} />
									<span className="cum-error">{errors.firstName?.message}</span>
								</div>

							</div>
							<div className="col-md-12">
								<div className="form-group">
									<label>Last Name</label>
									<input id="name" placeholder="Enter your full name" type="text" className="form-control"
										{...register("lastn  Name", {
											required: 'Last name is required',
											maxLength: {},
										})} />
									<span className="cum-error">{errors.lastName?.message}</span>
								</div>
							</div>

							<div className="col-md-12">
								<div className="form-group">
									<label id="name-label" for="name">Email Address</label>
									<input id="name" placeholder="Enter your email address" type="email" className="form-control"
										{...register("email", {
											required: 'Email address is required',
											maxLength: {},
										})} />
									<span className="cum-error">{errors.email?.message}</span>
								</div>
							</div>


							{/* <div className="col-md-6">
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
								</div> */}


							<div className="col-md-12">
								<div className="form-group">
									<label id="number-label" for="number">Password</label>
									<input type="password" placeholder="Create password" name="password" className="form-control"
										{...register("password", {
											required: ' Password is required',
											maxLength: {},
										})} />
									<span className="cum-error">{errors.password?.message}</span>
								</div>

							</div>
							<div className="col-md-12">
								<div className="form-group">
									<label id="number-label" for="number">Confirm Password</label>
									<input type="password" placeholder="Confirm password" name="password_repeat" className="form-control"
										{...register("password_repeat", {
											required: 'Confirm password',
											validate: value => value === password.current || "The password does not match"
										})} />
									<span className="cum-error">{errors.password_repeat?.message}</span>

								</div>
							</div>






						</div>
						<div style={{ fontSize: "20px" }}>Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={navigateLogin}>Login</span> </div>




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
								<button className="picckBtnDiv" type="submit">Submit</button>
							</div>
						</div>


						{/* <div className="row">
							<div className="col-md-4 setbtnDiv">
                            <p style={{"fontWeight":"bold", fontSize:"20px"}}>Or</p>
                                <button className="picckBtnDiv changetxtBACk" type="button"> <span><FcGoogle size={30}/></span>  Continue with Google</button>
							</div>
						</div> */}






					</form>
				</div>
			</div>



		</>
	)
})

export default UserSignUp