import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


let renderCount = 0;

const PickupRepairForm = (()=>{

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


    return (


        <>
        
        <div className="container">
	
	<div className="form-wra">
   <p id="description" className="text-center">
   Please provide required details for pickup/delivery
   
		</p>	
		<form id="survey-form" onSubmit={handleSubmit((data, event) => {

console.log('seedataNow', data);
handleSubmitData(data);
})}>
     
			<div className="row">

         <div className="col-md-6">
					<div className="form-group">
               <label>Ipad model</label>
               <input    id="name" placeholder="E.g Ipad 1" 
			   className="form-control"  {...register("deviceType", {
				required: 'iPhone  name is required',
				maxLength: {},
			})}/>
			 <span className="cum-error">{errors.deviceType?.message}</span>
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

export default PickupRepairForm