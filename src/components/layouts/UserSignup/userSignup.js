import { FcGoogle } from "react-icons/fc"
import Header from "../Header";
import "./userSignup.css";
import "./userlogin.scss";
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
	const [terms, setTerms] = useState("");
	// const [passwordVisible, setPasswordVisible] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

	const [termsAccepted, setTermsAccepted] = useState(true);

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

	console.log("terms", terms)

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
			<div>
				<Header />
			</div>
			<br />
			<br />



			{/* <div className="container ">

				<div className="form-wr ">
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








						<div className="row">
							<div className="col-md-4 setbtnDiv">
								{
									loading ? <button className="picckBtnDiv" > <span class="loader"></span></button> : <button className="picckBtnDiv" type="submit">Submit</button>
								}

							</div>
						</div>




					</form>
				</div>
			</div> */}






			<div className="form_wrapper">
				<div className="form_container">
					<div className="title_container">
						<h2>Sign Up</h2>
					</div>
					<div className="row clearfix">
						<div className="">
							<form onSubmit={handleSubmit((data, event) => {
								event.target.reset()
								console.log('seedataNow', data);
								handleSubmitData(data);
							})}>
								<div className="row clearfix">
									<div className="col_half">
										<label style={{ fontSize: "15px" }}>First name</label>
										<div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
											<input type="text" name="name" placeholder="First Name" {...register("firstName", {
												required: 'First name is required',
												maxLength: {},
											})} />
										</div>
										<p className="cum-error">{errors.firstName?.message}</p>
									</div>
									<div className="col_half">
										<label style={{ fontSize: "15px" }}>Last name</label>
										<div className="input_field"> <span><i aria-hidden="true" className="fa fa-user"></i></span>
											<input type="text" name="name" placeholder="Last Name" {...register("lastName", {
												required: 'Last name is required',
												maxLength: {},
											})} />
										</div>
										<p className="cum-error">{errors.lastName?.message}</p>
									</div>
								</div>
								<label style={{ fontSize: "15px" }}>Email</label>
								<div className="input_field"> <span><i aria-hidden="true" className="fa fa-envelope"></i></span>
									<input type="email" name="email" placeholder="Email" {...register("email", {
										required: 'Email address is required',
										validate: (value) => value.includes('@' && '.') || "Email must contain '@' and '.",
										pattern: {
											value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
											message: "Invalid email address",
										},
									})} />
								</div>
								<p className="cum-error">{errors.email?.message}</p>

								<label style={{ fontSize: "15px" }}>Password</label>
								<div className="input_field" style={{ position: 'relative' }}>
									<span><i aria-hidden="true" className="fa fa-lock"></i></span>
									<input
										type={passwordVisible ? "text" : "password"}
										name="password"
										placeholder="Password"
										{...register("password", {
											required: "Password is required",
											minLength: {
												value: 6,
												message: "Password must be at least 6 characters long"
											}
										})}
									/>
									<i
										style={{
											position: 'absolute',
											right: '10px',
											top: '50%',
											transform: 'translateY(-50%)',
											cursor: 'pointer',
											zIndex: 2
										}}
										onClick={() => setPasswordVisible(!passwordVisible)}
									    >
										{passwordVisible ? '👁️' : '👁️‍🗨️'}
									</i>
								</div>
								<p className="cum-error">{errors.password?.message}</p>

								<label style={{ fontSize: "15px" }}>Confirm password</label>
								<div className="input_field" style={{ position: 'relative' }}>
									<span><i aria-hidden="true" className="fa fa-lock"></i></span>
									<input
										type={confirmPasswordVisible ? "text" : "password"}
										name="password"
										placeholder="Re-type Password"
										{...register("password_repeat", {
											required: 'Confirm password',
											validate: value => value === password.current || "The password does not match"
										})}
									/>
									<i
										style={{
											position: 'absolute',
											right: '10px',
											top: '50%',
											transform: 'translateY(-50%)',
											cursor: 'pointer',
											zIndex: 2
										}}
										onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
									>
										{confirmPasswordVisible ? '👁️' : '👁️‍🗨️'}
									</i>
								</div>
								<p className="cum-error">{errors.password_repeat?.message}</p>

								<div style={{ fontSize: "20px" }}>Already have an account? <span style={{ color: "blue", cursor: "pointer" }} onClick={navigateLogin}>Login</span> </div>
								<hr />

								{successMessage &&
									<div className="container mt-2">
										<div className="row">
											<div className="col-sm-12">
												<div className="alert fade alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
													<i className="start-icon far fa-check-circle faa-tada animated"></i>
													<strong className="font__weight-semibold" style={{ color: "white" }}>Well done!</strong> Registration successfull. <span style={{ color: "blue", cursor: "pointer" }} onClick={navigateLogin}>Login</span>
												</div>
											</div>
										</div>
									</div>
								}

								{errorMessage &&
									<div className="container mt-2">
										<div className="row">
											<div class="col-sm-12">
												<div className="alert alert-danger" role="alert">
													<span>{errMessage.message}</span>
												</div>
											</div>
										</div>
									</div>
								}

								<div className="input_field checkbox_option">
									<input
										style={{ width: "15px" }}
										type="checkbox"
										id="cb1"
										checked={termsAccepted}
										onChange={(e) => setTermsAccepted(e.target.checked)}
									/>
									<label htmlFor="cb1" style={{ fontSize: "15px" }}>
										I agree with <a href="/terms-conditions">terms and conditions</a>
									</label>
								</div>

								<div className="row">
									<div className="col-md-4 setbtnDiv">
										{loading ? (
											<button className="picckBtnDiv"><span className="loader"></span> </button>
										) : (
											<button className="picckBtnDiv" type="submit" disabled={!termsAccepted}>
												Submit
											</button>
										)}
									</div>
								</div>
							</form>
						</div>
					</div>
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