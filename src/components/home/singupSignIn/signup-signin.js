import { useState } from "react";
import { Button, Row } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

const SignUpSignIn = (()=>{


    const [show, setShow] = useState(false);
    const [showSignUp, setSignUp] = useState(false);
    const [showBookForm, setShowBookForm] = useState(false);
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    const handleCloseshowSignUp = () => setSignUp(false);
    const handleShowshowSignUp = () => setSignUp(true);
 
 const navigate = useNavigate();

 const navigateUserDashboard = ()=>{
   navigate("/user-Dashboard")


 }


 const navigateLogin = ()=>{
   navigate("/user-login")
 }

 const navigateSignUp = ()=>{
   navigate("/user-signup")
 }




    return(

        <>
         <div className="headSignin">
               <div>
                  <Button style={{ background: "#011B58" }} onClick={navigateSignUp}>
                     Sign up
                  </Button>
               </div>
               <div>
                  <Button variant="secondary" onClick={navigateLogin}>
                     Sign in
                  </Button>
               </div>

            </div>


         
        
        </>
    )
})

export default SignUpSignIn