import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header"
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"
import { chukkytechAxios } from "../../Utility/axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



const ForgotPassword = (()=>{

const navigate = useNavigate();
  // const { setUser } = useUser();
  // const history = useLocation();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [enterResetCode, setEnterResetCode] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(true);
  const [showEnterNewPassword, setShowEnterNewPassword] = useState(false);

  const [getEmail, setGetEmail] = useState("");
  const [passwordData, setPasswordData] =useState({});

  const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({})
  password.current = watch('password', '')


  

    const handleSubmitLoginData = async data => {
      setLoading(true);
      setShowEnterNewPassword(false);
      console.log('data', data);
      setGetEmail(data)
      await chukkytechAxios
        .post('password/forgotUserPassword', data)
        .then(res => {
          console.log('res', res);
          setPasswordData(res.data)
          setLoading(false);
          setSuccessMessage(true);
          setEnterResetCode(true)
          setShowForgotPassword(false)
          setShowEnterNewPassword(false)
         
  
        })
        .catch(err => {
          console.log('err', err);
          setLoading(false);
          setErrorMessage(true);
          setErrMessage(err.response?.data?.error)
  
        });
    };



    console.log("getEmail", getEmail)
  
    const handleSubmitResetCode = async data => {
        setLoading(true);
        setShowEnterNewPassword(false)
        console.log('data', data);
    
        await chukkytechAxios
          .post('password/verifyResetCode', data)
          .then(res => {
            console.log('res', res);
            
            setLoading(false);
            setSuccessMessage(true);
            setEnterResetCode(false)
            setShowForgotPassword(false);
            setShowEnterNewPassword(true)
           
    
          })
          .catch(err => {
            console.log('err', err);
            setLoading(false);
            setErrorMessage(true);
            setErrMessage(err.response?.data?.error)
    
          });
      };


      const handleSubmitNewPassword = async data => {
        setLoading(true);
       
      
        const newPasswordData = {
            newPassword: data.password,
             resetCode: passwordData.resetCode,
             ...getEmail
        }

        console.log('data>>>>>>>', newPasswordData);
        await chukkytechAxios
          .post('password/resetUserPassword', newPasswordData)
          .then(res => {
            console.log('res', res);
            setLoading(false);
            setSuccessMessage(true);
            setEnterResetCode(false)
            setShowForgotPassword(false);
            handleShow(true)
            
           })
          .catch(err => {
            console.log('err', err);
            setLoading(false);
            setErrorMessage(true);
            setErrMessage(err.response?.data?.error)
    
          });
      };
    
const handleGoHome = (()=>{
    navigate("/")
})

const handleNavigateLogin = (()=>{
    navigate("/user-login")
})



    return(

    <>
     <Header />   

     <div className="login-page-LOGi">

{
    showForgotPassword &&
   

<div className="form">
<img className="log-log-inimage" src={logo}/>

<p className="titleAdLogin"> Enter Email</p>

<form className="login-form" onSubmit={handleSubmit((data, event) => {

console.log('seedataNow', data);
handleSubmitLoginData(data);
})}>
<p >Email Address</p>
<input type="email" placeholder="Enter your email address" {...register("email", {
 required: 'Email is required',
 maxLength: {},
})} />
<span className="cum-error">{errors.email?.message}</span>

<p >Whatsapp phone number</p>
<input type="phone" placeholder="Ente your WhatsApp phone number" {...register("phone", {
 required: 'Phone number is required',
 maxLength: {},
})} />
<span className="cum-error">{errors.phone?.message}</span>

{

 errorMessage &&
 <div className="container mt-2">
   <div className="row">

     <div class="col-sm-12">
       <div className="alert   alert-danger  " role="alert" >

         <span> {errMessage?.message || errMessage}   </span>

       </div>
     </div>



   </div>
 </div>


}


{
 loading ? <button > <span class="loader"></span></button> : <button type="submit">Submit</button>
}


</form>

</div>

       }

       {
        enterResetCode && 
        <div className="form">
        <img className="log-log-inimage" src={logo}/>
      
     <p className="titleAdLogin">  Enter Reset Code </p>

     <form className="login-form" onSubmit={handleSubmit((data, event) => {

       console.log('seedataNow', data);
       handleSubmitResetCode(data);
     })}>
       <p >Reset Code</p>
       <input type="code" placeholder="Enter reset code" {...register("resetCode", {
         required: 'Reset code is required',
         maxLength: {},
       })} />
       <span className="cum-error">{errors.resetCode?.message}</span>
      
    {

         errorMessage &&
         <div className="container mt-2">
           <div className="row">

             <div class="col-sm-12">
               <div className="alert   alert-danger  " role="alert" >

                 <span> {errMessage?.message || errMessage}   </span>

               </div>
             </div>



           </div>
         </div>


       }


       {
         loading ? <button > <span class="loader"></span></button> : <button type="submit">Submit</button>
       }
  

     </form>

   </div>
       }

{
    showEnterNewPassword &&
    <div className="form">
    <img className="log-log-inimage" src={logo}/>
  
 <p className="titleAdLogin"> Enter New Password </p>

 <form className="login-form" onSubmit={handleSubmit((data, event) => {

   console.log('seedataNow', data);
   handleSubmitNewPassword(data);
 })}>
   <p >Enter new password</p>
   <input type="password" placeholder="Enter reset code" {...register("password", {
     required: 'Password is required',
     maxLength: {},
   })} />
   <span className="cum-error">{errors.password?.message}</span>

   <p >Confirm password</p>
   <input type="password"
    placeholder="Confirm password"
    {...register('password_repeat', {
      required: 'Confirm password',
      validate: (value) =>
        value === password.current || 'The password does not match',
    })} />
   <span className="cum-error">{errors.password_repeat?.message}</span>
  
{

     errorMessage &&
     <div className="container mt-2">
       <div className="row">

         <div class="col-sm-12">
           <div className="alert   alert-danger  " role="alert" >

             <span> {errMessage?.message || errMessage}   </span>

           </div>
         </div>



       </div>
     </div>


   }


   {
     loading ? <button > <span class="loader"></span></button> : <button type="submit">Submit</button>
   }


 </form>

</div>
}

        
      </div>


      <Modal show={show} onHide={handleClose} animation={false}   centered>
        <Modal.Header closeButton>
          <Modal.Title>Proceed Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your password has been changed succesfully, click login to use your new password</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleGoHome}>
            Home
          </Button>
          <Button variant="" style={{backgroundColor:"#2F80ED", color:"white"}} onClick={handleNavigateLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>     


       <Footer />
      
    </>



    )
})

export default ForgotPassword