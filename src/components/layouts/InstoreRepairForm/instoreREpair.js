import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { chukkytechAxios } from "../../Utility/axios";
import Modal from 'react-bootstrap/Modal';
import chukkyLogo from "../../images/CHUKKY-BRAND-BACKGROUND-removebg-preview.png"
import moment from "moment/moment";
import { GiSaveArrow } from "react-icons/gi";
import { IoMdShare } from "react-icons/io";
import { html2pdf } from "html2pdf.js";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Receipt from "../Receipt/repairOrderReceipt";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useGetData from "../../Utility/getFunction";






let renderCount = 0;

const InstoreRepairFormForm = (() => {



    const { register, handleSubmit, setValue, reset,
        watch, formState: { errors, isDirty, isValid  } } = useForm({
        defaultValues: {
          reserveDate: null,
        }
      });
      const [reserveDate, setReserveDate] = useState(null);
    renderCount++;
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [successTex, setSuccessText] = useState("");
    const [errMessage, setErrMessage] = useState("");
    const [show, setShow] = useState(false);
    const [orderData, setOrderData] = useState("");
    const [showMainModal, setShowMainModal] = useState(true);
    const [showResult, setShowResult] = useState(false);

    const [showNoLogin, setShowNoLogin] = useState(false);
    const navigate = useNavigate();
    
    const handleShowNoLogin = (()=>setShowNoLogin(true));
    const handleHideNoLogin = (()=>setShowNoLogin(false))



    const navigateLogin = () =>  navigate("/user-login");


    const handleClose = () => setShow(false);

    const handleOpen = () =>{
          setShow(true);

}

  const userData = JSON.parse(localStorage.getItem('userInfo') || "null");
   const encodedEmail = encodeURIComponent(userData.email);

   const {data: users, isPending: ispendingUsers, error: errorUsers} = useGetData(`/auth/getUser/${encodedEmail}`)

   
 


     const handleSubmitDeviceData = async (data) => {
        try {
            setLoading(true);
            setShowResult(false);
            setShowMainModal(true);
    
            if (!userData || !users.userId) {
                console.error("No user data found. Redirecting to login.");
                setShowNoLogin(true);
                setLoading(false);
                return;
            }
    
            const deviceData = {
                ...data,
                repairOrderType: "Instore Apointment",
                userId: users?.userId, 
                status: "Processing"
            };
    
            console.log("Sending data:", deviceData);
    
            const res = await chukkytechAxios.post('repair/repairorder', deviceData);
            const result = res.data;
    
            console.log("API response:", result);
    
            setLoading(false);
            setShowMainModal(false);
            setShowResult(true);
            setOrderData(result?.repairOrder);
            setSuccessText(res?.data?.message);
            setSuccessMessage(true);
            handleOpen();
        } catch (err) {
            console.error("API error:", err);
            setLoading(false);
            setErrorMessage(true);
            setErrMessage(err.response?.data || "An error occurred");
        }
    };


const { data, isPendinge, error } = useGetData('location/getAllLocations')
    
return (
        <>
     {

showMainModal && 

<div className="container">

<div className="form-wra">
    <p id="description" className="text-center">
Reserve a date and visit our service center at your convenience — we’ll be ready to assist you.


    </p>
    <form id="survey-form" onSubmit={handleSubmit((data, event) => {

        console.log('seedataNow', data);
        handleSubmitDeviceData(data);
    })}>

        <div className="row">

            <div className="col-md-6">
                <div className="form-group">
                    <label id="number-label" for="number">Device name</label>
                    <input type="text"  className="form-control" placeholder=" e.g Samsung..."
                        {...register("deviceType", {
                            required: 'Pickup address is required',
                            maxLength: {},
                        })}
                    />
                    <span className="cum-error">{errors.deviceType?.message}</span>
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label>Device model</label>
                    <input type="text"  className="form-control" placeholder=" e.g A20 S"
                        
                        {...register("deviceModel", {
                            required: 'Pickup address is required',
                            maxLength: {},
                        })}
                    />
                    <span className="cum-error">{errors.deviceModel?.message}</span>

                </div>
            </div>



    <div className="col-md-6">
  <div className="form-group">
    <label htmlFor="reserveDate">Reservation date and time</label>
    <DatePicker
      selected={reserveDate}
      onChange={(date) => {
        setReserveDate(date);
        setValue("reserveDate", date); // set value for react-hook-form
      }}
      showTimeSelect
      timeFormat="hh:mm aa"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      minDate={new Date()}
      className="form-control"
      placeholderText="Select date and time"
    />
    <span className="cum-error">{errors.reserveDate?.message}</span>
  </div>
</div>
            <div className="col-md-6">
                <div className="form-group">
                    <label id="number-label" for="number">Phone number</label>
                    <input type="text" placeholder="Enter phone number" className="form-control"

                        {...register("phone", {
                            required: 'Phone number is required',
                            maxLength: {},
                        })}
                    />
                    <span className="cum-error">{errors.phone?.message}</span>
                </div>
            </div>


            <div className="col-md-12">
                                    <div className="form-group">
                                        <label id="number-label" for="number">Select service center</label>
                                        <select placeholder="Enter detailed address" className="form-control"  {...register("pickUpAddress", {
                                            required: 'Pickup address is required',
                                            maxLength: {},
                                        })}>
                                            <option disabled>Choose</option>
                                            {
                                                data.map((loc) => (
                                                    <option> {loc.locationName} - {loc.locationAddress} </option>
                                                ))
                                            }


                                        </select>

                                        <span className="cum-error">{errors.pickUpAddress?.message}</span>
                                    </div>
                                </div>




        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <label>Details</label>
                    <textarea id="comments" className="form-control" name="comment" placeholder="Please describe your requirement in details, for direct diagnosis and immediate fix"
                        {...register("details", {
                            required: 'Details is required',
                            maxLength: {},
                        })}  >

                    </textarea>
                    <span className="cum-error">{errors.details?.message}</span>
                </div>
            </div>
        </div>


        {

            successMessage &&
            <div className="container mt-2">
                <div className="row">

                    <div className="col-sm-12">
                        <div className="alert fade  alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">

                            <i className="start-icon far fa-check-circle faa-tada animated"></i>
                            <strong className="font__weight-semibold" style={{ color: "white" }}>Well done!</strong> {successTex}
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

                            <span> {errMessage}   </span>

                        </div>
                    </div>



                </div>
            </div>


        }


        <div className="row">
            <div className="col-md-4 setbtnDiv">
                {
                    loading ? <button className="picckBtnDiv"  disabled> <span class="loader"></span></button> : <button className="picckBtnDiv" type="submit">Submit</button>
                }

            </div>
        </div>

    </form>
</div>
</div>

}

{
    showResult && 

    
    <Receipt orderData={orderData} chukkyLogo={chukkyLogo} />
         




}
            

<Modal
        show={showNoLogin}
        onHide={handleHideNoLogin}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 'bold' }} className="text-info">
            {' '}
            LOGIN REQUEST{' '}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
          Hey, looks like you're not logged in yet! login for a smoother ride, or register to unlock the full experience, let's get you started!
    
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideNoLogin}>
            Cancel
          </Button>
          <Button className="WProceedBtn" onClick={navigateLogin}>
            Proceed Login
          </Button>
        </Modal.Footer>
      </Modal>
            
            



        </>
    )
})
export default InstoreRepairFormForm