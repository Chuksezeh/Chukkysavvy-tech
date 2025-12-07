import { useEffect, useRef, useState } from "react";
import AdminDashboard from "../adminDashboard";
import "./createUser.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { chukkytechAxios } from "../../Utility/axios";
import Footer from "../../layouts/Footer";



const CreateUser = (() => {

	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [errMessage, setErrMessage] = useState("");
	const [hideAdminAccess, setHideAdminAccess] = useState("");

	// const handleHideAdminAccess = () => {
	// 	setHideAdminAccess(!hideAdminAccess)
	// }

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors, isDirty, isValid },
	} = useForm();
	const password = useRef({});
	password.current = watch("password", "");

	const navigate = useNavigate();

	const navigateAdminLogin = (() => {
		navigate("/admin-login")
	})

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
			userType: "Admin",
			status: "active"
		}

		console.log('datauserData', userData);

		await chukkytechAxios
			.post('auth/registerAdminUser', userData)
			.then(res => {
				console.log('res', res);
				setLoading(false);
				setSuccessMessage(true);
				// setTimeout(() => {
				// 	navigate("/user-login");
				// }, 4000);
			})
			.catch(err => {
				console.log('err', err);
				setLoading(false);
				setErrorMessage(true);
				setErrMessage(err.response?.data)

			});
	};


	// const navigate = useNavigate();

    useEffect(() => {
        const adminsInfo = localStorage.getItem('adminsInfo');
        // console.log('UserInfo:', userInfo);
      
        if (!adminsInfo) {
          navigate('/admin-login');
        }
      }, [navigate]);





	return (


		<>
			<AdminDashboard />

			<div className="header-bar">

				<ul className="action-bar">

					<li> <a href="/admin-dashboard-card">Dashboard</a>   / Users / <span className="addash"> Create User </span></li>
				</ul>
			</div>


			<div className="container">
				<header className="header">

				</header>
				<div className="form-wr">
					<p id="description" className="text-center">
						Create Adnim User

					</p>
					<form id="survey-form" onSubmit={handleSubmit((data, event) => {
						event.target.reset()
						console.log('seedataNow', data);
						handleSubmitData(data);
					})}>

						<div className="row">

							<div className="col-md-6">
								<div className="form-group">
									<label>First Name</label>
									<input id="name" placeholder="Enter first name" className="form-control"

										{...register("firstName", {
											required: 'First name is required',
											maxLength: {},
										})} />
									<span className="cum-error">{errors.firstName?.message}</span>
								</div>
							</div>

							<div className="col-md-6">
								<div className="form-group">
									<label id="name-label" for="name">Last Name</label>
									<input id="name" placeholder="Enter last name" className="form-control"

										{...register("lastName", {
											required: 'Last name is required',
											maxLength: {},
										})} />
									<span className="cum-error">{errors.lastName?.message}</span>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label id="number-label" for="number">Phone Number</label>
										<input placeholder="Enter  phone number" className="form-control"

											{...register("phone", {
												required: 'Phone number is required',
												maxLength: {},
											})} />
										<span className="cum-error">{errors.phone?.message}</span>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label id="number-label" for="number">Email</label>
										<input type="text" placeholder="Enter email" className="form-control"
											{...register("email", {
												required: 'Email address is required',
												maxLength: {},
											})} />
										<span className="cum-error">{errors.email?.message}</span>
									</div>
								</div>

							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label id="number-label" for="number">Password</label>
										<input type="text" placeholder="Enter password" className="form-control"

											{...register("password", {
												required: 'Password is required',
												minLength: {
													Value: 6,
													message: "Password must be six characters and above"
												},
											})} />
										<span className="cum-error">{errors.password?.message}</span>									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label id="number-label" for="number">Confirm Password</label>
										<input type="text" placeholder="Confirm password" className="form-control"

											{...register("password_repeat", {
												required: 'Confirm password',
												validate: value => value === password.current || "The password does not match"
											})}
										/>
										<span className="cum-error">{errors.password_repeat?.message}</span>

									</div>
								</div>

							</div>



							{/* <div> <input type="checkbox" className="" onClick={handleHideAdminAccess} />  Admin Access </div>
							<p></p>
							{
								hideAdminAccess && */}
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<label id="number-label" for="number">Employee role</label>
											<select className="form-control"{...register('role')} >
												<option value="admin">Admin</option>
												<option value="super-admin">Super Admin</option>
												
											</select>
											{/* <input type="text" required   placeholder="Enter detailed address" className="form-control" /> */}
										</div>
									</div>

								</div>
							{/* } */}


						</div>
						{

							successMessage &&
							<div className="container mt-2">
								<div className="row">

									<div className="col-sm-12">
										<div className="alert fade  alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">

											<i className="start-icon far fa-check-circle faa-tada animated"></i>
											<strong className="font__weight-semibold" style={{ color: "white" }}>Well done!</strong> Registration successfull. <span style={{ color: "blue", cursor: "pointer" }} onClick={navigateAdminLogin}>Login</span>
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

											<span> {errMessage?.error}   </span>

										</div>
									</div>



								</div>
							</div>
						}

						<div className="row">
							<div className="col-md-4">


								{
									loading ? <button > <span class="loader"></span></button> : <button className="picckBtn" type="submit">Submit</button>
								}

							</div>
						</div>

					</form>
				</div>
			</div>


 <section style={{marginTop: "5%" }}>
			  <Footer/>
			</section>

		</>
	)
})

export default CreateUser