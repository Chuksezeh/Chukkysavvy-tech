import { FcGoogle } from "react-icons/fc"
import Header from "../Header";
import "./userSignup.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { chukkytechAxios } from "../../Utility/axios";
import Footer from "../Footer";
import { Alert } from "bootstrap";


let renderCount = 0;



const UserSignUp = (() => {

	const [show, setShow] = useState(true);
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [errMessage, setErrMessage] = useState("");

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

	const scrolltop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		scrolltop();
	}, []);

	const handleSubmitData = async data => {
		setLoading(true);
           const userData = {
			...data,
			userType: "User",
			status: "Active"
		   }
		console.log('data', data);

		await chukkytechAxios
			.post('/auth/registeration', userData)
			.then(res => {
				console.log('res', res);
				setLoading(false);
				setSuccessMessage(true);
				setTimeout(() => {
					navigate("/user-login");
				}, 4000);
			})
			.catch(err => {
				console.log('err', err);
				setLoading(false);
				setErrorMessage(true);
				setErrMessage(err.response?.data)

			});
	};





	return (
		<>
			<Header />
			<div className="container">

				<div className="form-wr mt-5">
					<p id="description" className="text-center">
						Sign Up

					</p>
					<form id="survey-form " onSubmit={handleSubmit((data, event) => {
						event.target.reset()
						console.log('seedataNow', data);
						handleSubmitData(data);
					})}>

						<div className="row">

							<div className="col-md-12">
								<div className="form-group">
									<label>First Name</label>
									<input id="name" placeholder="Enter first full name" type="text" className="form-control"
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
									<input id="name" placeholder="Enter your last name" type="text" className="form-control"
										{...register("lastName", {
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
										})} 
										/>
									<span className="cum-error">{errors.password_repeat?.message}</span>

								</div>
							</div>






						</div>
						<div style={{ fontSize: "20px" }}>Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={navigateLogin}>Login</span> </div>

						{

							successMessage &&
							<div className="container mt-2">
								<div className="row">

									<div className="col-sm-12">
										<div className="alert fade  alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">

											<i className="start-icon far fa-check-circle faa-tada animated"></i>
											<strong className="font__weight-semibold" style={{ color: "white" }}>Well done!</strong> Registration successfull. <span style={{ color: "blue", cursor: "pointer" }} onClick={navigateLogin}>Login</span>
										</div>
									</div>



								</div>
							</div>


						}

						{

							errorMessage &&
							<div className="container mt-2">
								<div className="row">

									<div class="col-sm-12">
										<div className="alert   alert-danger  " role="alert" >

											<span> {errMessage.message}   </span>

										</div>
									</div>



								</div>
							</div>
                          }





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
								{
									loading ? <button className="picckBtnDiv" > <span class="loader"></span></button> : <button className="picckBtnDiv" type="submit">Submit</button>
								}

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
			<br />
			<br />
			<br />
			<Footer />


		</>
	)
})

export default UserSignUp