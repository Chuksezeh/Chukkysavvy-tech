import { useLocation, useNavigate } from "react-router-dom";

import Header from "../Header";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../../Configfile/firebaseConfig";
import { useEffect, useState } from "react";
// import { useUser } from "../../UserDashboard/userConytext";
import "./userLogin.css";
import { useForm, SubmitHandler } from "react-hook-form"
import useGetData from "../../Utility/getFunction";
import { chukkytechAxios } from "../../Utility/axios";
import Footer from "../Footer";

import logo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"


const DirectLogin = (({ onLoginSuccess }) => {

    const [user, setUser] = useState(null);
    const [googleUser, setGoogleUser] = useState(null);

    const navigate = useNavigate();
    // const { setUser } = useUser();
    // const history = useLocation();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [error, setError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigateSignUp = (() => {
        navigate("/user-signup")
    })

    const navigateUserProfile = (() => {
        navigate("/user-profile")
    })
    const navigateForgotPassword = (() => {
        navigate("/forgot-password")

    })








    // Navigation handlers
    const navigateTo = (path) => () => navigate(path);

    const handleGoogleSignIn = async () => {

        setLoadingGoogle(true);
        try {
            const result = await auth.signInWithPopup(googleProvider);

            const nameResult = result?.additionalUserInfo?.profile



            const handleCreateUser = async () => {
                // const formattedPhoneNumber = userMSISDN?.startsWith('0') ? `234${userMSISDN?.slice(1)}` : userMSISDN;
                try {
                    const userData = {
                        firstName: nameResult.given_name,
                        lastName: nameResult.family_name,
                        email: nameResult.email,
                        userType: "Google User",
                        status: "Active",
                        password: ""

                    };

                    const createUserData = await chukkytechAxios.post('/auth/registeration', userData);
                    console.log('createUserData>>>>', createUserData);
                    setLoadingGoogle(false);

                } catch (err) {
                    console.error('Error in handleCreate:', err);
                    setLoadingGoogle(false);

                }
            };

            handleCreateUser();


            // Store user info and redirect
            localStorage.setItem('userInfo', JSON.stringify({
                email: nameResult.email,
                firstName: nameResult.given_name,
                lastName: nameResult.family_name,
                image: nameResult.picture
            }))
            if (onLoginSuccess) onLoginSuccess();

            // navigateTo("/user-profile")();
        } catch (error) {
            setLoadingGoogle(false);
            setError({
                message: "Google sign-in failed",
                details: error.message

            });
        }
    };


    const handleSubmitLoginData = async data => {
        setLoading(true);

        // console.log('data', data);

        await chukkytechAxios
            .post('auth/userLogin', data)
            .then(res => {
                // console.log('res', res);
                setLoading(false);
                setSuccessMessage(true);
                if (res.data.message === "Login successful") {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                    window.dispatchEvent(new Event("authChanged"));

                    // Notify parent to close modal
                    if (onLoginSuccess) onLoginSuccess();
                }
            })
            .catch(err => {
                // console.log('err', err);
                setLoading(false);
                setErrorMessage(true);
                setErrMessage(err.response?.data)

            });
    };

    // const { data: registerData, isPending: registerDataIsPending, error } = useGetData('/registration');

    const scrolltop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        scrolltop();
    }, []);


    return (

        <>
            {/* <Header /> */}


            <div className="login-page-LOGi">
                <br />
                <br />


                <div className="form">
                    <img className="log-log-inimage" src={logo} />

                    <p className="titleAdLogin">Login to save your order</p>

                    <form className="login-form" onSubmit={handleSubmit((data, event) => {
                        // console.log('seedataNow', data);
                        handleSubmitLoginData(data);
                    })}>
                        <p>Email Address</p>
                        <input type="email" placeholder="Enter your email address" {...register("email", {
                            required: 'Email is required',
                            maxLength: {},
                        })} />
                        <span className="cum-error">{errors.email?.message}</span>

                        <p>Password</p>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: 'password is required',
                                    maxLength: {},
                                })}
                            />
                            <span
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '40%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? '👁️' : '👁️‍🗨️'}
                            </span>
                        </div>
                        <span className="cum-error">{errors.password?.message}</span>

                        <div style={{ cursor: "pointer" }} onClick={navigateForgotPassword}>Forgot your password?</div>
                        <div className="message" style={{ fontSize: "15px" }}>
                            Not registered? <a href="#"><span onClick={navigateSignUp} style={{ color: "#011B58", fontWeight: "bold" }}>Create an account</span></a>
                        </div>
                        <br />

                        {errorMessage &&
                            <div className="container mt-2">
                                <div className="row">
                                    <div class="col-sm-12">
                                        <div className="alert alert-danger" role="alert">
                                            <span>{errMessage?.message || "Something went wrong, Please try again later"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {loading ?
                            <button disabled><span class="loader" ></span></button> :
                            <button type="submit">Login</button>
                        }

                        <div className="social-login">
                            <p className="divider"> <hr /> </p>

                            {
                                loadingGoogle ? <button disabled className="google-button"><span className="loader"></span></button> :
                                    <button type="button" className="google-button" onClick={handleGoogleSignIn} disabled={loadingGoogle}>
                                        <FcGoogle className="google-icon" size={30} style={{ padding: "5px" }} />
                                        Sign in with Google
                                    </button>
                            }
                            {/* <button
                type="button"
                className="google-button"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <FcGoogle className="google-icon" size={30} style={{padding:"5px"}} />
                Sign in with Google
              </button> */}
                        </div>

                    </form>

                </div>
            </div>


            {/* <Footer /> */}

        </>
    )
})

export default DirectLogin;