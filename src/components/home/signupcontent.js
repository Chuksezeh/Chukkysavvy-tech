import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
import brandlogo from "../images/mybrand.JPEG"
import Footer from '../layouts/Footer';

const SignUpContent =(()=>{

    return(

        <>
  <div className='signins-container'>
  <MDBContainer className="my-5 ">

<MDBCard>
  <MDBRow className='g-0'>

    <MDBCol md='6'>
      <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
         
          <span className="h1 fw-bold mb-0"><img className="logo-img2" src={brandlogo}/> </span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign up to get started</h5>

          <MDBInput wrapperClass='mb-4' label='First name' id='formControlLg' type='text' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Last name' id='formControlLg' type='text' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Phone' id='formControlLg' type='number' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='text' size="lg"/>
          <MDBInput wrapperClass='mb-4' label=' Address' id='formControlLg' type='' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Pick up Address' id='formControlLg' type='text' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Create password' id='formControlLg' type='' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Upload profile image' id='formControlLg' type='file' size="lg"/>


       <NavLink to="/profilepage" className="navlink-style"> <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Sign up</MDBBtn></NavLink>
        {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
        <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already have an account? <NavLink  to='/signinpage'className="navlink-style" ><a  style={{color: '#393f81'}}>Login here</a></NavLink></p>

        <div className='d-flex flex-row justify-content-start'>
          <a href="#!" className="small text-muted me-1">Terms of use.</a>
          <a href="#!" className="small text-muted">Privacy policy</a>
        </div>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
</MDBCard>

</MDBContainer>
</div>
<Footer/>
        
        </>
    )
})
export default SignUpContent