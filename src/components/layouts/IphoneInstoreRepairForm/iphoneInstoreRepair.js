import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

let renderCount = 0;

const IphoneInstoreRepair = (()=>{


    
        const {
            register,
            handleSubmit,
            reset,
            watch,
            formState: { errors, isDirty, isValid },
        } = useForm();
        renderCount++;

        const navigate = useNavigate();

const handleSubmitData = ((data)=>{

    console.log("data>>", data)
})



    return(

        <>
        
        <div className="container">

<div className="form-wra">
<p id="description" className="text-center">
Please provide required details for pickup/delivery

    </p>	
    <form id="survey-form"  onSubmit={handleSubmit((data, event) => {

console.log('seedataNow', data);
handleSubmitData(data);
})}>
 
        <div className="row">

     <div className="col-md-6">
                <div className="form-group">
                    <label>Choose iphone model</label>
        <select id="dropdown" name="role" className="form-control"  {...register("iPhoneType", {
											required: 'iPhone  name is required',
											maxLength: {},
										})}  >
               <option >Choose...</option>
             <option>Iphone 4</option>
             <option>Iphone 4S</option>
             <option>Iphone 5</option>
             <option>Iphone 5S</option>
             <option>Iphone 5C</option>
             <option>Iphone 6</option>
             <option>Iphone 6Plus</option>
             <option>Iphone 6S</option>
             <option>Iphone 6S Plus</option>
             <option>SE(1st generation)</option>
             <option>Iphone 7 </option>
             <option>Iphone 7 Plus</option>
             <option>Iphone 8</option>
             <option>Iphone 8 Plus</option>
             <option>Iphone X</option>
             <option>Iphone XS</option>
             <option>Iphone XR</option>
             <option>Iphone XS Max</option>
             <option>Iphone 11</option>
             <option>Iphone 11 Pro</option>
             <option>Iphone 11 Pro Max</option>
             <option>Iphone SE(2nd generation)</option>
             <option>Iphone 12 </option>
             <option>Iphone 12 mini</option>
             <option>Iphone 12 Pro </option>
             <option>Iphone 12 Pro Max</option>
             <option>Iphone 13 </option>
             <option>Iphone 13 mini</option>
             <option>Iphone 13 Pro</option>
             <option>Iphone 13 Pro Max</option>
             <option>Iphone SE(3rd generation)</option>
             <option>Iphone 14</option>
             <option>Iphone 14 Pro</option>
             <option>Iphone 14 Plus</option>
             <option>Iphone 14 Pro Max</option>
             <option>Iphone 15</option>
             <option>Iphone 15 Pro</option>
             <option>Iphone 15 Plus</option>
             <option>Iphone 15 Pro Max</option>
             <option>Iphone 16</option>
             <option>Iphone 16 Pro</option>
             <option>Iphone 16 Plus</option>
             <option>Iphone 16 Pro Max</option>
           </select>
                
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label id="name-label" for="name">Reservation date and time</label>
                    <input type="datetime-local"   id="name" placeholder="Enter your name" className="form-control"
                    {...register("reservationDate", {
                        required: 'Reservation date is required',
                        maxLength: {},
                    })} 
                    />
                    <span className="cum-error">{errors.reservationDate?.message}</span>
                </div>
            </div>
            <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label id="number-label" for="number">Pick up address</label>
                    <input type="text"   placeholder="Enter detailed address" className="form-control"
                    {...register("pickUpAddress", {
                        required: 'Pickup address is required',
                        maxLength: {},
                    })} 
                    />
                      <span className="cum-error">{errors.pickUpAddress?.message}</span>
                </div>
            </div>
        <div className="col-md-6">
                <div className="form-group">
                    <label id="number-label" for="number">Phone number</label>
                    <input type="text"  placeholder="Enter phone number" className="form-control"
                    
                    {...register("phone", {
                        required: 'Phone number is required',
                        maxLength: {},
                    })} 
                    />
                     <span className="cum-error">{errors.phone?.message}</span>
                </div>
            </div>
            
        </div>
   </div>
        <div className="row">
            <div className="col-md-12">
                <div className="form-group">
                    <label>Details</label>
                    <textarea  id="comments" className="form-control" name="comment" placeholder="Please describe your requirement in details, for direct diagnosis and immediate fix"                    
                     {...register("details", {
                        required: 'Details is required',
                        maxLength: {},
                    })}  >

                    </textarea>
                    <span className="cum-error">{errors.details?.message}</span>
                </div>
            </div>
        </div>
        
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
export default IphoneInstoreRepair